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


def transparency_effects_on() -> bool:
    """Windows' Settings → Personalization → Colors → Transparency effects. When it's off
    (often forced on non-activated Windows or in VMs) the Acrylic/Mica backdrop draws as
    an opaque grey fallback, hiding the see-through window — so skip the backdrop."""
    try:
        import winreg
        with winreg.OpenKey(winreg.HKEY_CURRENT_USER,
                            r"Software\Microsoft\Windows\CurrentVersion\Themes\Personalize") as k:
            return bool(winreg.QueryValueEx(k, "EnableTransparency")[0])
    except Exception:
        return True


_VM_CACHE = None


def is_virtual_machine() -> bool:
    """Parallels / VMware / VirtualBox / QEMU / Hyper-V guests: Windows often claims
    transparency effects work there but draws the backdrop as solid grey."""
    global _VM_CACHE
    if _VM_CACHE is None:
        _VM_CACHE = False
        try:
            import winreg
            with winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE,
                                r"HARDWARE\DESCRIPTION\System\BIOS") as k:
                info = " ".join(str(winreg.QueryValueEx(k, n)[0]) for n in
                                ("SystemManufacturer", "SystemProductName")
                                if _safe_q(k, n))
            _VM_CACHE = any(v in info.lower() for v in
                            ("parallels", "vmware", "virtualbox", "qemu", "kvm",
                             "virtual machine", "hyper-v"))
        except Exception:
            pass
    return _VM_CACHE


def _safe_q(k, name):
    try:
        import winreg
        winreg.QueryValueEx(k, name)
        return True
    except Exception:
        return False


def backdrop_mode() -> str:
    try:
        from aqt import mw
        m = str((mw.addonManager.getConfig(__name__) or {}).get("win_backdrop", "auto")).lower()
    except Exception:
        m = "auto"
    return m if m in ("auto", "on", "off", "live", "wallpaper") else "auto"


def dwm_blur_works() -> bool:
    return transparency_effects_on() and not is_virtual_machine()


def janki_blur_wanted() -> bool:
    """Auto mode on a machine where DWM can't blur: Janki draws its wallpaper blur."""
    m = backdrop_mode()
    return m == "wallpaper" or (m == "auto" and not dwm_blur_works())


def backdrop_wanted() -> bool:
    """Config win_backdrop: "on" / "off" / "auto" (default: on unless transparency effects
    are off or this is a virtual machine)."""
    try:
        from aqt import mw
        mode = str((mw.addonManager.getConfig(__name__) or {}).get("win_backdrop", "auto")).lower()
    except Exception:
        mode = "auto"
    if mode == "on":
        return True
    if mode in ("off", "live", "wallpaper"):
        return False
    return transparency_effects_on() and not is_virtual_machine()


def apply(hwnd, material=21, blur=True, tint=(18, 20, 30), dark=True, small_corners=False):
    """Give a top-level window the glass backdrop. blur=False = no backdrop (the
    Janki tint alone, e.g. blur slider at 0 or OLED)."""
    blur = blur and backdrop_wanted()
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
