"""Global keyboard hook for Windows (WH_KEYBOARD_LL) — the Windows twin of the macOS
CGEventTap in util/keytap.py.

It runs the SAME state machine as the Mac tap (Tab as a held chord key, Tab+Space to
skip a break, Space-hold to exit lockdown, the backtick+Backspace lockdown chord, the
show/hide combo) and hands work to the Qt thread through keytap's `_key_bridge`
signals, so no action logic is duplicated. Keys are translated to Mac keycodes first
(platform/win/keymap.py) because every handler and hotkey table speaks those.

Rules that keep a low-level hook alive and safe:
  * it lives on its own thread with its own message loop;
  * the callback never touches Qt and returns fast (Windows silently drops hooks that
    exceed LowLevelHooksTimeout) — it only emits thread-safe signals;
  * the HOOKPROC object is kept referenced (GC'ing it = instant crash);
  * our own re-injected Tab is marked via dwExtraInfo and ignored;
  * the hook is removed on aboutToQuit, before interpreter teardown.
"""
import ctypes
import time
import threading
from ctypes import wintypes

from ...util import keytap, state
from ...util import hotkeys as _hk
from .keymap import vk_to_kc

user32 = ctypes.WinDLL("user32", use_last_error=True)
kernel32 = ctypes.WinDLL("kernel32", use_last_error=True)

WH_KEYBOARD_LL = 13
WM_KEYDOWN, WM_KEYUP, WM_SYSKEYDOWN, WM_SYSKEYUP = 0x100, 0x101, 0x104, 0x105
WM_QUIT = 0x12
KEYEVENTF_KEYUP = 0x2
LLKHF_INJECTED = 0x10
_MAGIC = 0x4A4E4B49            # "JNKI": marks our own injected keystrokes

VK_SHIFT, VK_CONTROL, VK_MENU, VK_LWIN, VK_RWIN = 0x10, 0x11, 0x12, 0x5B, 0x5C

LRESULT = ctypes.c_ssize_t


class KBDLLHOOKSTRUCT(ctypes.Structure):
    _fields_ = [("vkCode", wintypes.DWORD), ("scanCode", wintypes.DWORD),
                ("flags", wintypes.DWORD), ("time", wintypes.DWORD),
                ("dwExtraInfo", ctypes.c_size_t)]


HOOKPROC = ctypes.WINFUNCTYPE(LRESULT, ctypes.c_int, wintypes.WPARAM, wintypes.LPARAM)
user32.SetWindowsHookExW.argtypes = [ctypes.c_int, HOOKPROC, wintypes.HINSTANCE, wintypes.DWORD]
user32.SetWindowsHookExW.restype = wintypes.HHOOK
user32.CallNextHookEx.argtypes = [wintypes.HHOOK, ctypes.c_int, wintypes.WPARAM, wintypes.LPARAM]
user32.CallNextHookEx.restype = LRESULT
user32.UnhookWindowsHookEx.argtypes = [wintypes.HHOOK]
user32.GetMessageW.argtypes = [ctypes.POINTER(wintypes.MSG), wintypes.HWND, wintypes.UINT, wintypes.UINT]
user32.PostThreadMessageW.argtypes = [wintypes.DWORD, wintypes.UINT, wintypes.WPARAM, wintypes.LPARAM]
user32.GetAsyncKeyState.argtypes = [ctypes.c_int]
user32.GetAsyncKeyState.restype = ctypes.c_short
user32.keybd_event.argtypes = [wintypes.BYTE, wintypes.BYTE, wintypes.DWORD, ctypes.c_size_t]
kernel32.GetModuleHandleW.restype = wintypes.HMODULE

_hook = None
_proc = None           # keep the HOOKPROC alive
_thread = None
_thread_id = None


# Tab counts as released after this long with no Tab repeat and no chord key press
# (a missed Tab release can't leave chords stuck on for longer).
TAB_HOLD_S = 3.0

def _down(vk):
    return bool(user32.GetAsyncKeyState(vk) & 0x8000)


def _mods_flags():
    """Current modifiers in the Mac-flag vocabulary hotkeys.py uses. The recorder
    stores Ctrl as "cmd", Alt as "opt" and the Windows key as "ctrl" (Qt's own
    Windows mapping), so read them back the same way."""
    f = 0
    if _down(VK_CONTROL):
        f |= _hk.MOD_FLAGS["cmd"]
    if _down(VK_MENU):
        f |= _hk.MOD_FLAGS["opt"]
    if _down(VK_LWIN) or _down(VK_RWIN):
        f |= _hk.MOD_FLAGS["ctrl"]
    if _down(VK_SHIFT):
        f |= _hk.MOD_FLAGS["shift"]
    return f


def _tap(vk):
    """Re-inject a key press+release, marked so our own hook lets it through."""
    user32.keybd_event(vk, 0, 0, _MAGIC)
    user32.keybd_event(vk, 0, KEYEVENTF_KEYUP, _MAGIC)


def _leader_vk():
    from .keymap import KC_TO_VK
    return KC_TO_VK.get(_hk.leader_kc, 0x09)      # Tab by default


def _handle(down, kc):
    """Mirror of keytap's CGEventTap callback. Returns True to swallow the key."""
    kb = keytap._key_bridge
    if down and kc == _hk.toggle_kc and (_mods_flags() & _hk.MOD_MASK) == _hk.toggle_flags:
        kb.toggle_window.emit()
        return True
    if state._lockdown_on and kc == 49:
        kb.lockdown_space.emit(down)
        return bool(state._lockdown_hold_committed)
    if state._lockdown_warn and kc in (49, 36, 76, 53):
        if down:
            kb.lockdown_warn.emit(kc != 53)
        return True
    if kc == _hk.chord_kc1:
        keytap._lk_bt_held = down
        keytap._lk_eval_chord()
        return bool(keytap._lk_del_held)
    if kc == _hk.chord_kc2:
        if down:
            if keytap._lk_bt_held:
                keytap._lk_del_held = True
                keytap._lk_eval_chord()
                return True
        elif keytap._lk_del_held:
            keytap._lk_del_held = False
            keytap._lk_eval_chord()
            return True
        return False
    if not keytap._key_tap_enabled:
        if not down and kc == _hk.leader_kc:     # a Tab release still clears the state
            keytap._tab_held = False
            keytap._tab_used_combo = False
        return False
    if kc == 49 and keytap._swallowing_space():
        if not down:
            keytap._swallow_space_until_up = False
        return True
    if state._pomo_on_break and kc == 49:
        if keytap._tab_held:
            keytap._tab_used_combo = True
            kb.pomo_space.emit(down)
            return True
        if state._anki_focused and state._mw_active:
            kb.pomo_space.emit(down)
            return True
        return False
    if down:
        if kc == _hk.leader_kc:
            if not keytap._tab_held:
                keytap._tab_used_combo = False
            keytap._tab_held = True
            keytap._tab_last = time.monotonic()   # the first press AND each auto-repeat
            return True
        # A missed Tab release (e.g. the tap was paused when it came) left _tab_held
        # stuck — then every arrow press was swallowed as a Tab+arrow chord and arrow
        # navigation stopped working everywhere. Trust only the physical key state.
        # (Not GetAsyncKeyState: this hook swallows the Tab press, so Windows' key
        # state never sees Tab down and every Tab chord was cancelled. Held Tab keeps
        # sending auto-repeat downs through the hook — none for 1.5 s = released.)
        # Windows stops Tab's auto-repeat as soon as another key goes down, so while
        # chording (Tab+F, F, F…) no repeats arrive: each chord key press counts as Tab
        # still held, or the third F slipped through as a plain F (filtered deck).
        now = time.monotonic()
        if keytap._tab_held and now - getattr(keytap, "_tab_last", 0) > TAB_HOLD_S:
            keytap._tab_held = False
            keytap._tab_used_combo = False
        if keytap._tab_held:
            keytap._tab_last = now
        canon = _hk.tab_map.get(kc) if keytap._tab_held else None
        if canon in _hk.shift_kcs:
            if _down(VK_SHIFT):
                keytap._tab_used_combo = True
                kb.send_key.emit(canon)
                return True
        elif canon == 15:
            keytap._tab_used_combo = True
            kb.reword_toggle.emit()
            return True
        elif canon in keytap._GLOBAL_KC:
            keytap._tab_used_combo = True
            kb.send_key.emit(canon)
            return True
    else:
        if kc == _hk.leader_kc:
            was_combo = keytap._tab_used_combo
            keytap._tab_held = False
            keytap._tab_used_combo = False
            if not was_combo:
                from .keymap import KC_TO_VK
                vk = KC_TO_VK.get(_hk.leader_kc)
                if vk is not None:
                    _tap(vk)           # a lone Tab still types a Tab
            return True
    return False


def _callback(nCode, wParam, lParam):
    try:
        if nCode == 0:
            k = ctypes.cast(lParam, ctypes.POINTER(KBDLLHOOKSTRUCT)).contents
            if not (k.flags & LLKHF_INJECTED and k.dwExtraInfo == _MAGIC):
                from . import kiosk
                if kiosk.block_level and kiosk.should_block(
                        k.vkCode, wParam in (WM_KEYDOWN, WM_SYSKEYDOWN)):
                    return 1                     # lockdown: swallow system escapes
                kc = vk_to_kc(k.vkCode)
                if kc is not None:
                    down = wParam in (WM_KEYDOWN, WM_SYSKEYDOWN)
                    if wParam in (WM_KEYDOWN, WM_SYSKEYDOWN, WM_KEYUP, WM_SYSKEYUP) \
                            and _handle(down, kc):
                        return 1
    except Exception:
        pass
    return user32.CallNextHookEx(_hook, nCode, wParam, lParam)


def _run():
    global _hook, _proc, _thread_id
    _thread_id = kernel32.GetCurrentThreadId()
    _proc = HOOKPROC(_callback)
    _hook = user32.SetWindowsHookExW(WH_KEYBOARD_LL, _proc, kernel32.GetModuleHandleW(None), 0)
    if not _hook:
        keytap._gtap_log("win hook: SetWindowsHookExW failed (%d)" % ctypes.get_last_error())
        return
    keytap._gtap_log("win hook: installed")
    msg = wintypes.MSG()
    while user32.GetMessageW(ctypes.byref(msg), None, 0, 0) > 0:
        pass
    user32.UnhookWindowsHookEx(_hook)
    _hook = None


class _QtFallback:
    """When the low-level hook misses its deadline (its Python callback waited on the
    interpreter lock), Windows skips it and the keys reach Anki as ordinary key
    events. Catch Tab+<chord key> there too, so the chord still works. When the hook
    DID run it swallowed the keys, so this never sees them — no double fire."""

    def __init__(self):
        from aqt.qt import QObject, QEvent

        class _F(QObject):
            def eventFilter(_s, obj, ev):
                try:
                    t = ev.type()
                    if t not in (QEvent.Type.KeyPress, QEvent.Type.KeyRelease):
                        return False
                    if not keytap._key_tap_enabled:
                        return False
                    kc = vk_to_kc(int(ev.nativeVirtualKey()))
                    if kc is None:
                        return False
                    if kc == _hk.leader_kc:
                        if t == QEvent.Type.KeyPress:
                            self.tab = True
                        else:
                            self.tab = False
                        return False            # a lone Tab still does its normal job
                    # Tab counts as held if either side saw it (the hook may have
                    # caught Tab but missed this key, or the other way round)
                    held = self.tab or (keytap._tab_held and
                                        time.monotonic() - getattr(keytap, "_tab_last", 0) < TAB_HOLD_S)
                    if t != QEvent.Type.KeyPress or not held or ev.isAutoRepeat():
                        return False
                    canon = _hk.tab_map.get(kc)
                    if canon == 15:
                        keytap._key_bridge.reword_toggle.emit()
                        return True
                    if canon in keytap._GLOBAL_KC:
                        keytap._tab_used_combo = True   # the Tab release won't type a Tab
                        keytap._gtap_log("Qt fallback chord kc=%s" % canon)
                        keytap._key_bridge.send_key.emit(canon)
                        return True
                except Exception:
                    pass
                return False
        self.tab = False
        self.f = _F()


_fallback = None


def start():
    global _thread, _fallback
    if _thread is not None:
        return
    _thread = threading.Thread(target=_run, name="janki-keyhook", daemon=True)
    _thread.start()
    try:
        from aqt.qt import QApplication
        if _fallback is None:
            _fallback = _QtFallback()
            QApplication.instance().installEventFilter(_fallback.f)
    except Exception:
        pass
    try:
        from aqt.qt import QApplication
        app = QApplication.instance()
        if app is not None:
            app.aboutToQuit.connect(stop)
    except Exception:
        pass


def stop():
    global _thread
    if _thread_id:
        user32.PostThreadMessageW(_thread_id, WM_QUIT, 0, 0)
    _thread = None
