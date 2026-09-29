"""Platform facade: which OS we're on, what it can do, and where files go.

Features check CAPS.<x>, not sys.platform. Windows backends live in platform/win/ and
are imported lazily, so ctypes.windll is never touched on macOS (and libobjc never on
Windows).
"""
import os
import sys

IS_MAC = sys.platform == "darwin"
IS_WIN = sys.platform.startswith("win")


class _Caps:
    glass = IS_MAC or IS_WIN          # Windows: DWM backdrop (Acrylic/Mica)
    global_keys = IS_MAC or IS_WIN    # Mac: CGEventTap; Windows: WH_KEYBOARD_LL
    gamepad_bg = IS_MAC or IS_WIN     # Mac: IOKit HID; Windows: XInput / winmm
    caption_over_fullscreen = IS_MAC or IS_WIN
    kiosk = IS_MAC or IS_WIN
    tray = True
    notch = IS_MAC
    ocr = IS_MAC                      # Swift + Vision helper
    reword_gen = IS_MAC               # Swift + FoundationModels helper


CAPS = _Caps()


def logs_dir() -> str:
    if IS_WIN:
        d = os.path.join(os.environ.get("LOCALAPPDATA") or os.path.expanduser("~"),
                         "Janki", "Logs")
    elif IS_MAC:
        d = os.path.expanduser("~/Library/Logs")
    else:
        d = os.path.join(os.path.expanduser("~"), ".local", "state", "janki")
    try:
        os.makedirs(d, exist_ok=True)
    except Exception:
        pass
    return d


def log_path(name: str) -> str:
    return os.path.join(logs_dir(), name)


def ui_font_family() -> str:
    """The OS UI font as a Qt family name."""
    if IS_MAC:
        return ".AppleSystemUIFont"
    if IS_WIN:
        return "Segoe UI Variable Text"
    return "sans-serif"
