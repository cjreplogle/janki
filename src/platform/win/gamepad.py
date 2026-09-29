"""Focus-independent controller input on Windows — twin of the macOS IOKit HID monitor.

Uses winmm's joyGetPosEx, which reads DirectInput pads (the 8BitDo Zero 2 in most
modes) and XInput pads alike, and keeps working while Anki is in the background.
Buttons are numbered like HID usages (bit i = button i+1), so the existing
`hid_button_kc` map and `hid_break_skip_usage` apply unchanged. Presses go through
the same keytap signals and focus gates as on the Mac.
"""
import ctypes
from ctypes import wintypes

from aqt import mw
from aqt.qt import QTimer

from ...util import keytap, state
from ...util.config import _cfg

winmm = ctypes.WinDLL("winmm")

JOY_RETURNALL = 0xFF
JOYERR_NOERROR = 0


class JOYINFOEX(ctypes.Structure):
    _fields_ = [("dwSize", wintypes.DWORD), ("dwFlags", wintypes.DWORD),
                ("dwXpos", wintypes.DWORD), ("dwYpos", wintypes.DWORD),
                ("dwZpos", wintypes.DWORD), ("dwRpos", wintypes.DWORD),
                ("dwUpos", wintypes.DWORD), ("dwVpos", wintypes.DWORD),
                ("dwButtons", wintypes.DWORD), ("dwButtonNumber", wintypes.DWORD),
                ("dwPOV", wintypes.DWORD), ("dwReserved1", wintypes.DWORD),
                ("dwReserved2", wintypes.DWORD)]


winmm.joyGetPosEx.argtypes = [wintypes.UINT, ctypes.POINTER(JOYINFOEX)]
winmm.joyGetPosEx.restype = wintypes.UINT

_timer = None
_live = []             # joystick ids that answered on the last scan
_last_buttons = {}     # id -> bitmask
_last_axis = {}        # (id, 'x'|'y') -> 0 / 127 / 255
_scan_tick = 0


def _button_map():
    out = {}
    for k, v in (_cfg().get("hid_button_kc", {}) or {}).items():
        try:
            out[int(k)] = int(v)
        except Exception:
            pass
    return out


def _read(jid):
    info = JOYINFOEX()
    info.dwSize = ctypes.sizeof(JOYINFOEX)
    info.dwFlags = JOY_RETURNALL
    return info if winmm.joyGetPosEx(jid, ctypes.byref(info)) == JOYERR_NOERROR else None


def is_controller_connected():
    return bool(_live)


def _poll():
    global _live, _scan_tick
    _scan_tick += 1
    if _scan_tick % 120 == 1:                 # rescan every ~2s for hot-plugged pads
        _live = [j for j in range(16) if _read(j) is not None]
    kb = keytap._key_bridge
    skip = int(_cfg().get("hid_break_skip_usage", 2) or 2)
    for jid in list(_live):
        info = _read(jid)
        if info is None:
            continue
        # D-pad on X/Y axes (0..65535) → caption nudges, on the edge into an extreme.
        for axis, val in (("x", info.dwXpos), ("y", info.dwYpos)):
            cur = 0 if val < 16384 else (255 if val > 49151 else 127)
            if _last_axis.get((jid, axis)) != cur:
                _last_axis[(jid, axis)] = cur
                if cur != 127 and state._remote_active and not state._anki_focused:
                    kc = (126 if cur == 0 else 125) if axis == "y" else (123 if cur == 0 else 124)
                    kb.send_key.emit(kc)
        now, prev = info.dwButtons, _last_buttons.get(jid, 0)
        _last_buttons[jid] = now
        changed = now ^ prev
        if not changed:
            continue
        for bit in range(32):
            if not changed & (1 << bit):
                continue
            usage, pressed = bit + 1, bool(now & (1 << bit))
            if state._pomo_on_break and usage == skip:
                kb.pomo_space.emit(pressed)      # hold to skip a break
                continue
            if not pressed:
                continue
            fwd = bool(state._remote_active and not state._anki_focused)
            kc = _button_map().get(usage)
            if kc in (18, 19, 20, 21):
                kb.practice_or_rate.emit(kc, fwd)
            elif fwd and kc is not None:
                kb.send_key.emit(kc)


def start():
    global _timer
    if _timer is not None or not _cfg().get("hid_controller", False):
        return
    _timer = QTimer(mw)
    _timer.setInterval(16)                    # ~60 Hz
    _timer.timeout.connect(_poll)
    _timer.start()
    try:
        mw.app.aboutToQuit.connect(stop)     # stop before teardown (quit-crash lesson)
    except Exception:
        pass


def stop():
    global _timer
    if _timer is not None:
        try:
            _timer.stop()
        except Exception:
            pass
        _timer = None
