"""Windows lockdown (kiosk) backend — counterpart of the macOS presentation-options
lockdown in features/lockdown.py.

  * Kiosk: the main window goes fullscreen + topmost (covers the taskbar), and the
    keyboard hook (hooks.py) swallows the system shortcuts that would escape it:
    standard = Win key, Alt+Tab, Alt+Esc, Ctrl+Esc; strict adds Alt+F4 and
    Ctrl+Shift+Esc (Task Manager). Ctrl+Alt+Del can never be blocked — it's the
    Secure Attention Sequence, handled by Windows itself.
  * Wi-Fi: `netsh wlan disconnect` / `connect name=<profile>` (no admin needed).
  * Close other apps: WM_CLOSE to other visible top-level windows (a polite close,
    like -[NSRunningApplication terminate]; apps can still prompt to save).
"""
import ctypes
import os
import re
import subprocess
from ctypes import wintypes

user32 = ctypes.WinDLL("user32")
kernel32 = ctypes.WinDLL("kernel32")

LEVEL_OFF, LEVEL_STANDARD, LEVEL_STRICT = 0, 1, 2
block_level = LEVEL_OFF            # read by hooks.py on every key

_NO_WINDOW = 0x08000000            # CREATE_NO_WINDOW: no console flash for netsh


def set_kiosk(level: int, hwnd: int = 0) -> bool:
    global block_level
    block_level = int(level)
    if hwnd:
        HWND_TOPMOST, HWND_NOTOPMOST = -1, -2
        user32.SetWindowPos(wintypes.HWND(hwnd),
                            wintypes.HWND(HWND_TOPMOST if level else HWND_NOTOPMOST),
                            0, 0, 0, 0, 0x1 | 0x2 | 0x10)
    return True


def should_block(vk: int, down: bool) -> bool:
    """Called from the keyboard hook: swallow keys that would leave the kiosk."""
    if block_level == LEVEL_OFF:
        return False
    alt = bool(user32.GetAsyncKeyState(0x12) & 0x8000)
    ctrl = bool(user32.GetAsyncKeyState(0x11) & 0x8000)
    shift = bool(user32.GetAsyncKeyState(0x10) & 0x8000)
    if vk in (0x5B, 0x5C):                        # Win keys
        return True
    if vk == 0x09 and alt:                        # Alt+Tab
        return True
    if vk == 0x1B and (alt or ctrl):              # Alt+Esc, Ctrl+Esc (Start)
        return True
    if block_level >= LEVEL_STRICT:
        if vk == 0x73 and alt:                    # Alt+F4
            return True
        if vk == 0x1B and ctrl and shift:         # Ctrl+Shift+Esc (Task Manager)
            return True
    return False


# --- Wi-Fi ----------------------------------------------------------------------------
def _netsh(*args) -> str:
    try:
        return subprocess.run(["netsh", "wlan", *args], capture_output=True, text=True,
                              timeout=8, creationflags=_NO_WINDOW).stdout
    except Exception:
        return ""


def wifi_profile():
    """The connected Wi-Fi profile name, or None when Wi-Fi isn't connected."""
    out = _netsh("show", "interfaces")
    if not re.search(r"^\s*State\s*:\s*connected", out, re.M | re.I):
        return None
    m = re.search(r"^\s*Profile\s*:\s*(.+)$", out, re.M)
    return m.group(1).strip() if m else None


def wifi_off():
    _netsh("disconnect")


def wifi_on(profile):
    if profile:
        _netsh("connect", "name=%s" % profile)


# --- close other apps -----------------------------------------------------------------
WM_CLOSE = 0x10
EnumWindowsProc = ctypes.WINFUNCTYPE(wintypes.BOOL, wintypes.HWND, wintypes.LPARAM)
_SKIP_EXE = {"explorer.exe", "searchhost.exe", "shellexperiencehost.exe",
             "startmenuexperiencehost.exe", "textinputhost.exe", "applicationframehost.exe"}


def _exe_name(pid) -> str:
    try:
        h = kernel32.OpenProcess(0x1000, False, pid)       # QUERY_LIMITED_INFORMATION
        if not h:
            return ""
        buf = ctypes.create_unicode_buffer(520)
        size = wintypes.DWORD(520)
        kernel32.QueryFullProcessImageNameW(h, 0, buf, ctypes.byref(size))
        kernel32.CloseHandle(h)
        return os.path.basename(buf.value).lower()
    except Exception:
        return ""


def close_other_apps():
    """Ask every other app with a visible window to close. Returns their pids."""
    me = os.getpid()
    pids = set()

    def _each(hwnd, _lp):
        if not user32.IsWindowVisible(hwnd) or user32.GetWindowTextLengthW(hwnd) == 0:
            return True
        if user32.GetWindow(hwnd, 4):                     # GW_OWNER: skip owned popups
            return True
        pid = wintypes.DWORD()
        user32.GetWindowThreadProcessId(hwnd, ctypes.byref(pid))
        if pid.value in (0, me) or _exe_name(pid.value) in _SKIP_EXE:
            return True
        user32.PostMessageW(hwnd, WM_CLOSE, 0, 0)
        pids.add(pid.value)
        return True
    user32.EnumWindows(EnumWindowsProc(_each), 0)
    return list(pids)


def apps_still_running(pids) -> bool:
    for pid in pids or ():
        h = kernel32.OpenProcess(0x1000, False, pid)
        if h:
            code = wintypes.DWORD()
            ok = kernel32.GetExitCodeProcess(h, ctypes.byref(code))
            kernel32.CloseHandle(h)
            if ok and code.value == 259:                   # STILL_ACTIVE
                return True
    return False
