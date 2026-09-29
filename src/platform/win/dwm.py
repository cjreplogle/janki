"""Windows glass: the DWM system backdrop — Windows' counterpart to macOS's
NSVisualEffectView.

Windows 11 22H2+ (build 22621): DWMWA_SYSTEMBACKDROP_TYPE → Acrylic (closest to the
Mac "HUD" frost), Mica or Mica Alt, with the frame extended into the whole client
area so the backdrop shows behind Qt's translucent widgets.
Windows 10 / early 11: the undocumented SetWindowCompositionAttribute acrylic
blur-behind, which also takes a tint colour + alpha.

Janki's tint stays a Qt-painted translucent fill on top (as on the Mac), so the
tint / opacity / OLED sliders behave the same on both systems.
"""
import ctypes
import sys
from ctypes import wintypes

dwmapi = ctypes.WinDLL("dwmapi")
user32 = ctypes.WinDLL("user32")

DWMWA_USE_IMMERSIVE_DARK_MODE = 20
DWMWA_WINDOW_CORNER_PREFERENCE = 33
DWMWA_BORDER_COLOR = 34
DWMWA_CAPTION_COLOR = 35
DWMWA_SYSTEMBACKDROP_TYPE = 38
DWMWA_COLOR_NONE = 0xFFFFFFFE

BACKDROP_NONE, BACKDROP_MICA, BACKDROP_ACRYLIC, BACKDROP_MICA_ALT = 1, 2, 3, 4
CORNER_ROUND, CORNER_ROUND_SMALL = 2, 3


class MARGINS(ctypes.Structure):
    _fields_ = [("l", ctypes.c_int), ("r", ctypes.c_int), ("t", ctypes.c_int), ("b", ctypes.c_int)]


class ACCENT_POLICY(ctypes.Structure):
    _fields_ = [("AccentState", ctypes.c_int), ("AccentFlags", ctypes.c_int),
                ("GradientColor", ctypes.c_uint), ("AnimationId", ctypes.c_int)]


class WINCOMPATTRDATA(ctypes.Structure):
    _fields_ = [("Attribute", ctypes.c_int), ("Data", ctypes.c_void_p),
                ("SizeOfData", ctypes.c_size_t)]


_BUILD = sys.getwindowsversion().build if hasattr(sys, "getwindowsversion") else 0
HAS_SYSTEM_BACKDROP = _BUILD >= 22621
IS_WIN11 = _BUILD >= 22000

# Janki's material menu holds macOS NSVisualEffectMaterial numbers; map each to the
# nearest Windows backdrop (lighter materials → Mica, frosty/HUD ones → Acrylic).
_MATERIAL_TO_BACKDROP = {21: BACKDROP_ACRYLIC, 18: BACKDROP_ACRYLIC, 13: BACKDROP_ACRYLIC,
                         12: BACKDROP_MICA, 3: BACKDROP_MICA, 7: BACKDROP_MICA_ALT}


def _hwnd(h):
    return wintypes.HWND(int(h))


def _set_int(hwnd, attr, value):
    v = ctypes.c_int(value)
    return dwmapi.DwmSetWindowAttribute(_hwnd(hwnd), attr, ctypes.byref(v), ctypes.sizeof(v))


def set_dark(hwnd, on=True):
    _set_int(hwnd, DWMWA_USE_IMMERSIVE_DARK_MODE, 1 if on else 0)


def set_corners(hwnd, small=False):
    if IS_WIN11:
        _set_int(hwnd, DWMWA_WINDOW_CORNER_PREFERENCE, CORNER_ROUND_SMALL if small else CORNER_ROUND)


def extend_frame(hwnd):
    m = MARGINS(-1, -1, -1, -1)
    dwmapi.DwmExtendFrameIntoClientArea(_hwnd(hwnd), ctypes.byref(m))


def _win10_accent(hwnd, rgba):
    """Windows 10 acrylic blur-behind. rgba=None turns it off."""
    try:
        if rgba is None:
            acc = ACCENT_POLICY(0, 0, 0, 0)
        else:
            r, g, b, a = rgba
            acc = ACCENT_POLICY(4, 2, (a << 24) | (b << 16) | (g << 8) | r, 0)
        data = WINCOMPATTRDATA(19, ctypes.cast(ctypes.pointer(acc), ctypes.c_void_p),
                               ctypes.sizeof(acc))
        user32.SetWindowCompositionAttribute(_hwnd(hwnd), ctypes.byref(data))
    except Exception:
        pass


def apply(hwnd, material=21, blur=True, tint=(18, 20, 30), dark=True, small_corners=False):
    """Give a top-level window the glass backdrop. blur=False = no backdrop (the
    Janki tint alone, e.g. blur slider at 0 or OLED)."""
    set_dark(hwnd, dark)
    set_corners(hwnd, small_corners)
    extend_frame(hwnd)
    if HAS_SYSTEM_BACKDROP:
        kind = _MATERIAL_TO_BACKDROP.get(int(material), BACKDROP_ACRYLIC) if blur else BACKDROP_NONE
        _set_int(hwnd, DWMWA_SYSTEMBACKDROP_TYPE, kind)
    else:
        _win10_accent(hwnd, (tint[0], tint[1], tint[2], 0x30) if blur else None)


def clear(hwnd):
    if HAS_SYSTEM_BACKDROP:
        _set_int(hwnd, DWMWA_SYSTEMBACKDROP_TYPE, BACKDROP_NONE)
    else:
        _win10_accent(hwnd, None)
