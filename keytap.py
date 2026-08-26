"""CGEventTap keyboard capture, key forwarding, and global-key shortcuts."""

import os
import sys
from ctypes import c_void_p, c_char_p, c_bool
from aqt import mw
from aqt.qt import QObject, QTimer

from .bridge import _bridge
from .config import log, _cfg
from . import state
from . import focus, hud

# ---------------------------------------------------------------------------
# Global hotkeys (Tab+Z/X/C/V/Space → Anki reviewer when not focused)
# Tab acts as the held modifier: press and hold Tab, then Z/X/C/V/Space.
# Tab alone (no combo) is passed through normally.
# Uses CGEventTap via ctypes; requires macOS Accessibility permission.
# ---------------------------------------------------------------------------
_key_tap_running = False
_key_tap_enabled = False
_tab_held = False        # True while Tab is physically held down
_tab_used_combo = False  # True if Tab was used as a modifier this press
_swallow_space_until_up = False  # after a hold-Space break skip, eat Space until released

# macOS virtual key codes to intercept when Tab is held
_GLOBAL_KC = {6, 7, 8, 9, 49, 53, 42, 3, 31, 126, 125, 124, 123}  # Z X C V Space Escape Backslash F O ↑ ↓ → ←
# Shift+Tab + '='/'-' → grow/shrink the caption font (only while the caption HUD
# is up). Shift-gated so plain Tab+= / Tab+- stay free for anything else.
_CAP_FONT_KC = {24, 27}  # 24 = '='(+), 27 = '-'
_KC_TAB = 48

# NOTE: the 8bitdo Zero 2 is a GAMEPAD (handled by the GameController poller, not
# this tap). It emits no keyboard/media events, so there is deliberately NO
# keyboard interception of 1/2/3/4 here — doing so would swallow those keys while
# reviewing. kc 18-21 remain in the maps above only so the poller can drive
# ratings via _send_key_to_anki.

_GTAP_LOG = os.path.expanduser("~/Library/Logs/anki-glass-keytap.log")

# Thread-safe bridge: CGEventTap callback runs in a CFRunLoop thread, not the Qt
# main thread. QTimer.singleShot from that thread silently drops. Emitting a
# Qt signal is thread-safe and guaranteed to deliver on the main thread via
# Qt's queued-connection mechanism.
from PyQt6.QtCore import QObject, pyqtSignal as _pyqtSignal

class _KeyBridge(QObject):
    send_key    = _pyqtSignal(int)  # macOS keycode
    send_key_rf = _pyqtSignal(int)  # keycode, reveal-first (two-press gamepad flow)
    pomo_space = _pyqtSignal(bool)  # True=press, False=release (Pomodoro bypass)

_key_bridge = _KeyBridge()
_key_bridge.send_key.connect(lambda kc: _send_key_to_anki(kc))
_key_bridge.send_key_rf.connect(lambda kc: _send_key_to_anki(kc, reveal_first=True))

def _gtap_log(msg: str) -> None:
    try:
        with open(_GTAP_LOG, "a") as f:
            import datetime
            f.write(f"{datetime.datetime.now().isoformat()} {msg}\n")
    except Exception:
        pass


# macOS keycode → key char (for pycmd/DOM fallback)
_KC_TO_KEY = {6: 'z', 7: 'x', 8: 'c', 9: 'v', 49: ' ', 53: 'Escape', 42: '\\',
              18: '1', 19: '2', 20: '3', 21: '4'}  # 1-4: 8bitdo rating keys
# ease: 1=Again 2=Hard 3=Good 4=Easy; None=not a rating key
_KC_TO_EASE = {6: 1, 7: 2, 8: 3, 9: 4, 49: None, 53: None, 42: None,
               18: 1, 19: 2, 20: 3, 21: 4}

def _send_key_to_anki(kc: int, reveal_first: bool = False) -> None:
    """Drive Anki's reviewer directly via Python API — no OS event needed.

    reveal_first: on the question side, only reveal the answer (don't auto-rate).
    Used by the gamepad so a press flips the card and you can read it before the
    next press rates — a natural two-press flow. Tab-combos leave it False (their
    single press shows-and-rates)."""
    # Arrow keys — nudge the caption HUD around a 3x3 screen grid (up→top row,
    # down→bottom row, left→left column, right→right column).
    _arrow_delta = {126: (-1, 0), 125: (1, 0), 123: (0, -1), 124: (0, 1)}
    if kc in _arrow_delta:
        hud._nudge_coherence(*_arrow_delta[kc])
        return

    if kc in _CAP_FONT_KC:  # Shift+Tab + '='/'-' — resize the caption font
        _adjust_caption_font(2 if kc == 24 else -2)
        return

    if kc == 3:  # F — toggle Focus Mode
        _gtap_log("F hit → _toggle_focus_mode")
        focus._toggle_focus_mode()
        return

    if kc == 31:  # O — open the last-studied deck
        _gtap_log("O hit → _open_last_deck")
        focus._open_last_deck()
        return

    key  = _KC_TO_KEY.get(kc)
    ease = _KC_TO_EASE.get(kc)
    if key is None:
        return
    _gtap_log(f"_send_key_to_anki kc={kc} key={key!r} ease={ease}")
    try:
        r   = getattr(mw, 'reviewer', None)
        web = getattr(r, 'web', None) or mw.web
        state = getattr(r, 'state', None) if r else None

        if kc == 42:  # Backslash — toggle coherence HUD
            _gtap_log("backslash hit → _toggle_coherence")
            hud._toggle_coherence()
            return

        elif kc == 53:  # Escape — undo last rating
            for m in ('undo', '_undo'):
                fn = getattr(mw, m, None)
                if fn:
                    fn()
                    _gtap_log(f"called mw.{m}()")
                    return

        elif kc == 49:  # Space — show answer or rate Good on answer side
            if r and getattr(r, 'card', None):
                if state == 'question':
                    for m in ('_showAnswer', 'show_answer', 'onEnterKey'):
                        fn = getattr(r, m, None)
                        if fn:
                            fn(); _gtap_log(f"called r.{m}()"); return
                elif state == 'answer':
                    for m in ('_answerCard', 'answer_card'):
                        fn = getattr(r, m, None)
                        if fn:
                            ease_val = getattr(r, '_defaultEase', lambda: 3)()
                            fn(ease_val); _gtap_log(f"called r.{m}({ease_val})"); return
            web.eval("if(typeof pycmd!=='undefined')pycmd('key: ');")

        elif ease is not None:  # Z/X/C/V — rate Again/Hard/Good/Easy
            if r and getattr(r, 'card', None) and state == 'answer':
                for m in ('_answerCard', 'answer_card'):
                    fn = getattr(r, m, None)
                    if fn:
                        fn(ease); _gtap_log(f"called r.{m}({ease})"); return
            # Card not yet revealed.
            elif r and getattr(r, 'card', None) and state == 'question':
                for m in ('_showAnswer', 'show_answer'):
                    fn = getattr(r, m, None)
                    if fn:
                        fn()
                        if reveal_first:
                            # Just flip the card; the next press rates.
                            _gtap_log("showed answer (reveal-first)"); return
                        QTimer.singleShot(50, lambda e=ease: _send_key_to_anki(
                            next(k for k, v in _KC_TO_EASE.items() if v == e)))
                        _gtap_log(f"showed answer, queued ease={ease}"); return

    except Exception as e:
        _gtap_log(f"_send_key_to_anki error: {e}")


def _adjust_caption_font(delta: int) -> None:
    """Shift+Tab + '='/'-' : grow/shrink the caption HUD font live, and persist
    it (matches the Caption tab's Font size slider, bounds 10–48). No-op unless
    the caption HUD is on screen."""
    if not hud._caption_visible():
        return
    cfg = _cfg() or {}
    cur = max(8, int(cfg.get('caption_font_size', 20)))
    new = max(10, min(48, cur + delta))
    if new == cur:
        return
    cfg['caption_font_size'] = new
    mw.addonManager.writeConfig(__name__, cfg)
    _gtap_log(f"caption_font_size → {new}")
    if hud._coherence_hud and hud._coherence_hud.isVisible():
        # Live, animated resize (no full re-render → no typewriter replay, no
        # blank flash). Pass the old size so the window glide is predicted, not
        # measured mid-transition (which wobbled). Saved config keeps the next
        # card's render in sync.
        hud._coherence_hud.set_font_size(new, cur)


def _start_key_tap() -> None:
    global _key_tap_running
    if _key_tap_running or sys.platform != 'darwin':
        return
    import ctypes, threading

    try:
        open(_GTAP_LOG, 'w').close()  # clear log on each start
        _gtap_log("_start_key_tap() called")
        CG = ctypes.CDLL('/System/Library/Frameworks/CoreGraphics.framework/CoreGraphics')
        CF = ctypes.CDLL('/System/Library/Frameworks/CoreFoundation.framework/CoreFoundation')
        AX = ctypes.CDLL('/System/Library/Frameworks/ApplicationServices.framework/ApplicationServices')

        trusted = bool(AX.AXIsProcessTrusted())
        _gtap_log(f"AXTrusted={trusted}")

        if not trusted:
            # Trigger the system prompt — this adds Anki to the Accessibility list
            # and shows the "allow access" dialog automatically.
            try:
                msg, cls = _bridge()
                key = msg(c_void_p, cls("NSString"), b"stringWithUTF8String:",
                          (c_char_p,), (b"AXTrustedCheckOptionPrompt",))
                val = msg(c_void_p, cls("NSNumber"), b"numberWithBool:",
                          (c_bool,), (True,))
                opts = msg(c_void_p, cls("NSDictionary"),
                           b"dictionaryWithObject:forKey:",
                           (c_void_p, c_void_p), (val, key))
                AX.AXIsProcessTrustedWithOptions.restype = c_bool
                AX.AXIsProcessTrustedWithOptions.argtypes = [c_void_p]
                AX.AXIsProcessTrustedWithOptions(opts)
            except Exception as _pe:
                log(f"accessibility prompt failed: {_pe}")
                from aqt.utils import showInfo
                QTimer.singleShot(0, lambda: showInfo(
                    "Janki: global hotkeys require Accessibility permission.\n\n"
                    "Grant access in:\n"
                    "System Settings → Privacy & Security → Accessibility → Anki"
                ))
            return

        # All CF/CG functions that return opaque pointers must have restype=c_void_p
        # or ctypes will truncate the 64-bit return value to a 32-bit signed int,
        # producing an invalid 0xffffffff... address that crashes CoreFoundation's
        # PAC signature check (__CFCheckCFInfoPACSignature).
        CG.CGEventTapCreate.restype = ctypes.c_void_p
        CG.CGEventTapEnable.argtypes = [ctypes.c_void_p, ctypes.c_bool]
        CG.CGEventGetIntegerValueField.restype = ctypes.c_int64
        CG.CGEventGetIntegerValueField.argtypes = [ctypes.c_void_p, ctypes.c_uint32]
        CG.CGEventGetFlags.restype = ctypes.c_uint64
        CG.CGEventGetFlags.argtypes = [ctypes.c_void_p]
        CF.CFMachPortCreateRunLoopSource.restype = ctypes.c_void_p
        CF.CFMachPortCreateRunLoopSource.argtypes = [ctypes.c_void_p, ctypes.c_void_p, ctypes.c_long]
        CF.CFRunLoopGetCurrent.restype = ctypes.c_void_p
        CF.CFRunLoopAddSource.argtypes = [ctypes.c_void_p, ctypes.c_void_p, ctypes.c_void_p]
        CG.CGEventCreateKeyboardEvent.restype = ctypes.c_void_p
        CG.CGEventCreateKeyboardEvent.argtypes = [ctypes.c_void_p, ctypes.c_uint16, ctypes.c_bool]
        # kCFRunLoopDefaultMode is a CFStringRef global exported from CF.
        # We need its value (the pointer it holds), not its address.
        kCFRunLoopDefaultMode = ctypes.c_void_p.in_dll(CF, 'kCFRunLoopDefaultMode').value

        CBACK = ctypes.CFUNCTYPE(
            ctypes.c_void_p, ctypes.c_void_p, ctypes.c_uint32,
            ctypes.c_void_p, ctypes.c_void_p,
        )

        def _cb(proxy, etype, event, refcon):
            global _tab_held, _tab_used_combo, _swallow_space_until_up
            if not _key_tap_enabled:
                return event
            # etype: 10 = kCGEventKeyDown, 11 = kCGEventKeyUp
            kc = CG.CGEventGetIntegerValueField(event, 9)  # kCGKeyboardEventKeycode
            # After a hold-Space break skip, the Space is often still held when the
            # break ends — eat every Space event until it's released so it doesn't
            # leak to the reviewer (which would flip the just-revealed card).
            if kc == 49 and _swallow_space_until_up:
                if etype == 11:  # keyup — the hold is over
                    _swallow_space_until_up = False
                return None  # consumed
            # Pomodoro break: Space drives the hold-to-skip bypass. But only read a
            # PLAIN Space when Anki is the focused app — otherwise Space typed in
            # another app must pass through. Tab+Space is the explicit override that
            # works even when Anki is unfocused.
            if state._pomo_on_break and kc == 49:
                if _tab_held:
                    _tab_used_combo = True   # so releasing Tab doesn't re-post a lone Tab
                    _key_bridge.pomo_space.emit(etype == 10)
                    return None  # consumed (override)
                if state._anki_focused:
                    _key_bridge.pomo_space.emit(etype == 10)
                    return None  # consumed (focused)
                return event     # unfocused plain Space → let the focused app have it
            if etype == 10:  # keydown
                if kc == _KC_TAB:
                    _tab_held = True
                    _tab_used_combo = False
                    return None  # suppress Tab keydown while tracking
                if _tab_held and kc in _CAP_FONT_KC:
                    # Only claim '='/'-' when Shift is also held, so it's an
                    # explicit Shift+Tab combo and doesn't eat plain Tab+=/-.
                    if CG.CGEventGetFlags(event) & 0x20000:  # kCGEventFlagMaskShift
                        _tab_used_combo = True
                        _key_bridge.send_key.emit(kc)
                        return None  # consume Shift+Tab+=/-
                if _tab_held and kc in _GLOBAL_KC:
                    _tab_used_combo = True
                    _key_bridge.send_key.emit(kc)
                    return None  # consume combo key
            elif etype == 11:  # keyup
                if kc == _KC_TAB:
                    was_combo = _tab_used_combo
                    _tab_held = False
                    _tab_used_combo = False
                    if not was_combo:
                        # Tab pressed alone — re-inject at kCGAnnotatedSessionEventTap (2)
                        # so our own session-level tap does NOT see it again (no loop).
                        CG.CGEventPost.argtypes = [ctypes.c_uint32, ctypes.c_void_p]
                        down = CG.CGEventCreateKeyboardEvent(None, ctypes.c_uint16(_KC_TAB), True)
                        up = CG.CGEventCreateKeyboardEvent(None, ctypes.c_uint16(_KC_TAB), False)
                        if down:
                            CG.CGEventPost(2, down)  # kCGAnnotatedSessionEventTap
                        if up:
                            CG.CGEventPost(2, up)
                    return None  # always suppress Tab keyup (we re-posted if needed)
            return event

        cb_ref = CBACK(_cb)
        _start_key_tap._cb = cb_ref   # keep alive

        def _run():
            # kCGEventKeyDown(10) | kCGEventKeyUp(11). The 8bitdo remote is a
            # gamepad (read by Contanki via the Gamepad API), not a keyboard, so it
            # never reaches this tap — its focus-independent handling lives in the
            # GameController poller below. This tap still serves the Tab+combos.
            mask = ctypes.c_uint64((1 << 10) | (1 << 11))
            port = CG.CGEventTapCreate(1, 0, 0, mask, cb_ref, None)
            _gtap_log(f"tap port={'OK' if port else 'NULL'}")
            if not port:
                return
            src = CF.CFMachPortCreateRunLoopSource(None, port, 0)
            if not src:
                return
            CG.CGEventTapEnable(port, True)
            CF.CFRunLoopAddSource(CF.CFRunLoopGetCurrent(), src, kCFRunLoopDefaultMode)
            CF.CFRunLoopRun()

        threading.Thread(target=_run, daemon=True).start()
        _key_tap_running = True
    except Exception as exc:
        _gtap_log(f"EXCEPTION: {exc}")
        log(f"key tap: {exc}")


def _apply_global_keys(on: bool) -> None:
    global _key_tap_enabled
    _key_tap_enabled = on
    _gtap_log(f"_apply_global_keys(on={on})")
    if on:
        _start_key_tap()
