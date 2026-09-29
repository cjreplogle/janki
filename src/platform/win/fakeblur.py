"""Janki's own frosted backdrop for Windows machines where DWM can't draw Acrylic/Mica
(virtual machines, transparency effects off — there DWM paints a solid grey instead).

Mica itself is a blurred, tinted copy of the desktop wallpaper, so this does the same:
read the wallpaper, blur it once (cheap: repeated smooth down/up-scaling), and paint the
slice that lies behind the main window, re-drawn as the window moves. No screen capture,
so nothing is hidden from screenshots and it costs almost nothing per frame. Like Mica,
other windows behind Anki aren't shown — only the wallpaper.
"""
import os

from aqt import mw
from aqt.qt import (QWidget, QPainter, QImage, QColor, QEvent, QObject, Qt, QRect,
                    QGuiApplication)

_layer = None
_blurred = None          # (wallpaper path, mtime, screen rect, QImage)


def _wallpaper_path():
    try:
        import winreg
        with winreg.OpenKey(winreg.HKEY_CURRENT_USER, r"Control Panel\Desktop") as k:
            p = winreg.QueryValueEx(k, "WallPaper")[0]
        if p and os.path.isfile(p):
            return p
    except Exception:
        pass
    # Windows keeps a copy of the current wallpaper here even for slideshow/themes.
    p = os.path.join(os.environ.get("APPDATA", ""), "Microsoft", "Windows", "Themes",
                     "TranscodedWallpaper")
    return p if os.path.isfile(p) else None


def _blur(img: QImage, strength: int = 5) -> QImage:
    """Approximate a wide Gaussian: shrink hard, then grow back smoothly (twice)."""
    w, h = img.width(), img.height()
    s = max(1, 2 ** strength)
    for _ in range(2):
        small = img.scaled(max(1, w // s), max(1, h // s),
                           Qt.AspectRatioMode.IgnoreAspectRatio,
                           Qt.TransformationMode.SmoothTransformation)
        img = small.scaled(w, h, Qt.AspectRatioMode.IgnoreAspectRatio,
                           Qt.TransformationMode.SmoothTransformation)
    return img


def _screen_rect():
    scr = mw.screen() if hasattr(mw, "screen") else QGuiApplication.primaryScreen()
    return scr.geometry() if scr else QRect(0, 0, 1920, 1080)


def _backdrop():
    """The blurred wallpaper sized to the window's screen ('fill' fit), cached."""
    global _blurred
    path = _wallpaper_path()
    if not path:
        return None, None
    sr = _screen_rect()
    try:
        mt = os.path.getmtime(path)
    except Exception:
        mt = 0
    if _blurred and _blurred[:3] == (path, mt, (sr.x(), sr.y(), sr.width(), sr.height())):
        return _blurred[3], sr
    img = QImage(path)
    if img.isNull():
        return None, None
    img = img.scaled(sr.width(), sr.height(), Qt.AspectRatioMode.KeepAspectRatioByExpanding,
                     Qt.TransformationMode.SmoothTransformation)
    x, y = (img.width() - sr.width()) // 2, (img.height() - sr.height()) // 2
    img = _blur(img.copy(x, y, sr.width(), sr.height()))
    _blurred = (path, mt, (sr.x(), sr.y(), sr.width(), sr.height()), img)
    return img, sr


class _Layer(QWidget):
    """Sits behind the central widget and paints the wallpaper slice + the glass tint."""

    def __init__(self):
        super().__init__(mw)
        self.setAttribute(Qt.WidgetAttribute.WA_TransparentForMouseEvents, True)
        self.tint = QColor(18, 20, 30, 64)

    def paintEvent(self, _ev):
        img, sr = _backdrop()
        p = QPainter(self)
        if img is not None:
            top_left = self.mapToGlobal(self.rect().topLeft())
            src = QRect(top_left.x() - sr.x(), top_left.y() - sr.y(), self.width(), self.height())
            p.drawImage(self.rect(), img, src)
        p.fillRect(self.rect(), self.tint)
        p.end()


class _Follow(QObject):
    def eventFilter(self, obj, ev):
        if _layer is not None and ev.type() in (QEvent.Type.Move, QEvent.Type.Resize,
                                                QEvent.Type.WindowStateChange):
            _layer.setGeometry(0, 0, mw.width(), mw.height())
            _layer.lower()
            _layer.update()
        return False


_follow = None


def enable(tint_rgba):
    """Show the wallpaper blur behind the main window with the given (r, g, b, a) tint."""
    global _layer, _follow
    if _layer is None:
        _layer = _Layer()
        _follow = _Follow(mw)
        mw.installEventFilter(_follow)
    _layer.tint = QColor(*[int(v) for v in tint_rgba])
    _layer.setGeometry(0, 0, mw.width(), mw.height())
    _layer.lower()
    _layer.show()
    _layer.update()


def disable():
    if _layer is not None:
        _layer.hide()


def active() -> bool:
    return _layer is not None and _layer.isVisible()
