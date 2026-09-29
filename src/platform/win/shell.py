"""Windows shell integration: foregrounding, open-on-login, file associations, theme."""
import ctypes
import os
import sys
from ctypes import wintypes

user32 = ctypes.WinDLL("user32", use_last_error=True)
kernel32 = ctypes.WinDLL("kernel32", use_last_error=True)

SW_RESTORE = 9


def force_foreground(hwnd: int) -> None:
    """Bring a window to the front even when another app owns the foreground.
    Windows only lets the foreground thread hand over focus, so briefly attach our
    input queue to the foreground window's thread, then raise and focus."""
    hwnd = wintypes.HWND(hwnd)
    try:
        if user32.IsIconic(hwnd):
            user32.ShowWindow(hwnd, SW_RESTORE)
        fg = user32.GetForegroundWindow()
        fg_tid = user32.GetWindowThreadProcessId(fg, None)
        me = kernel32.GetCurrentThreadId()
        attached = fg_tid and fg_tid != me and user32.AttachThreadInput(fg_tid, me, True)
        user32.BringWindowToTop(hwnd)
        user32.SetForegroundWindow(hwnd)
        user32.SetActiveWindow(hwnd)
        if attached:
            user32.AttachThreadInput(fg_tid, me, False)
    except Exception:
        pass


# --- open on login (HKCU Run key; no admin) ------------------------------------------
_RUN_KEY = r"Software\Microsoft\Windows\CurrentVersion\Run"
_RUN_NAME = "Janki"


def _anki_command() -> str:
    exe = sys.executable
    # Anki's launcher runs aqt from a venv python; prefer the real Anki.exe if we can find it.
    for cand in (os.path.join(os.path.dirname(os.path.dirname(exe)), "anki.exe"),
                 os.path.join(os.environ.get("LOCALAPPDATA", ""), "Programs", "Anki", "anki.exe"),
                 os.path.join(os.environ.get("ProgramFiles", ""), "Anki", "anki.exe")):
        if cand and os.path.isfile(cand):
            return '"%s"' % cand
    return '"%s" -m aqt' % exe


def set_open_on_login(on: bool) -> bool:
    try:
        import winreg
        with winreg.OpenKey(winreg.HKEY_CURRENT_USER, _RUN_KEY, 0, winreg.KEY_SET_VALUE) as k:
            if on:
                winreg.SetValueEx(k, _RUN_NAME, 0, winreg.REG_SZ, _anki_command())
            else:
                try:
                    winreg.DeleteValue(k, _RUN_NAME)
                except FileNotFoundError:
                    pass
        return True
    except Exception:
        return False


def open_on_login() -> bool:
    try:
        import winreg
        with winreg.OpenKey(winreg.HKEY_CURRENT_USER, _RUN_KEY) as k:
            winreg.QueryValueEx(k, _RUN_NAME)
        return True
    except Exception:
        return False


# --- file associations (.jank / .qb / .rp → Anki; HKCU, no admin) --------------------
def register_file_types(exts=(".jank", ".qb", ".rp")) -> bool:
    try:
        import winreg
        cmd = _anki_command() + ' "%1"'
        for ext in exts:
            progid = "Janki" + ext.replace(".", "_")
            with winreg.CreateKey(winreg.HKEY_CURRENT_USER, r"Software\Classes\%s" % ext) as k:
                winreg.SetValueEx(k, "", 0, winreg.REG_SZ, progid)
            with winreg.CreateKey(winreg.HKEY_CURRENT_USER,
                                  r"Software\Classes\%s\shell\open\command" % progid) as k:
                winreg.SetValueEx(k, "", 0, winreg.REG_SZ, cmd)
        ctypes.windll.shell32.SHChangeNotify(0x08000000, 0, None, None)  # SHCNE_ASSOCCHANGED
        return True
    except Exception:
        return False


def system_uses_light_theme() -> bool:
    try:
        import winreg
        with winreg.OpenKey(winreg.HKEY_CURRENT_USER,
                            r"Software\Microsoft\Windows\CurrentVersion\Themes\Personalize") as k:
            return bool(winreg.QueryValueEx(k, "SystemUsesLightTheme")[0])
    except Exception:
        return False


# --- floating overlays (caption HUD, flares) ------------------------------------------
GWL_EXSTYLE = -20
WS_EX_TOPMOST, WS_EX_TOOLWINDOW, WS_EX_NOACTIVATE = 0x8, 0x80, 0x08000000
WS_EX_TRANSPARENT, WS_EX_LAYERED = 0x20, 0x80000
HWND_TOPMOST = -1
SWP_NOSIZE, SWP_NOMOVE, SWP_NOACTIVATE = 0x1, 0x2, 0x10

user32.GetWindowLongPtrW.restype = ctypes.c_ssize_t
user32.GetWindowLongPtrW.argtypes = [wintypes.HWND, ctypes.c_int]
user32.SetWindowLongPtrW.restype = ctypes.c_ssize_t
user32.SetWindowLongPtrW.argtypes = [wintypes.HWND, ctypes.c_int, ctypes.c_ssize_t]


def make_overlay(hwnd: int, click_through: bool = False) -> None:
    """Topmost, never-activating tool window (no taskbar button, never takes focus) —
    the Windows equivalent of the Mac non-activating NSPanel. Floats over other apps,
    including borderless-fullscreen ones (browsers, video players, most games)."""
    h = wintypes.HWND(hwnd)
    ex = user32.GetWindowLongPtrW(h, GWL_EXSTYLE)
    ex |= WS_EX_TOPMOST | WS_EX_TOOLWINDOW | WS_EX_NOACTIVATE
    if click_through:
        ex |= WS_EX_TRANSPARENT | WS_EX_LAYERED
    user32.SetWindowLongPtrW(h, GWL_EXSTYLE, ex)
    user32.SetWindowPos(h, wintypes.HWND(HWND_TOPMOST), 0, 0, 0, 0,
                        SWP_NOSIZE | SWP_NOMOVE | SWP_NOACTIVATE)


class _RECT(ctypes.Structure):
    _fields_ = [("l", ctypes.c_long), ("t", ctypes.c_long), ("r", ctypes.c_long), ("b", ctypes.c_long)]


class _MONITORINFO(ctypes.Structure):
    _fields_ = [("cbSize", wintypes.DWORD), ("rcMonitor", _RECT), ("rcWork", _RECT),
                ("dwFlags", wintypes.DWORD)]


def foreground_is_fullscreen() -> bool:
    """True when the foreground window covers its whole monitor (a fullscreen video,
    game, browser…). Mirrors the Mac AXFullScreen check used to anchor the caption."""
    try:
        fg = user32.GetForegroundWindow()
        if not fg or fg == user32.GetShellWindow() or fg == user32.GetDesktopWindow():
            return False
        r = _RECT()
        user32.GetWindowRect(fg, ctypes.byref(r))
        mon = user32.MonitorFromWindow(fg, 2)          # MONITOR_DEFAULTTONEAREST
        mi = _MONITORINFO()
        mi.cbSize = ctypes.sizeof(_MONITORINFO)
        user32.GetMonitorInfoW(mon, ctypes.byref(mi))
        m = mi.rcMonitor
        return r.l <= m.l and r.t <= m.t and r.r >= m.r and r.b >= m.b
    except Exception:
        return False


GWLP_HWNDPARENT = -8


def set_owner(hwnd: int, owner: int, click_through: bool = False) -> None:
    """Make `hwnd` an owned window of `owner`: Windows always keeps an owned window above
    its owner and minimises it with it — the counterpart of macOS addChildWindow. The
    overlay never activates, so it can't take focus from the reviewer."""
    h = wintypes.HWND(hwnd)
    user32.SetWindowLongPtrW(h, GWLP_HWNDPARENT, owner)
    ex = user32.GetWindowLongPtrW(h, GWL_EXSTYLE) | WS_EX_TOOLWINDOW | WS_EX_NOACTIVATE
    if click_through:
        ex |= WS_EX_TRANSPARENT | WS_EX_LAYERED
    user32.SetWindowLongPtrW(h, GWL_EXSTYLE, ex)
