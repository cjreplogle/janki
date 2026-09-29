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
        p = QPainter(self)
        if _live["on"] and _live["img"] is not None:
            from aqt.qt import QRectF
            cap, img = _live["rect"], _live["img"]
            tl = self.mapToGlobal(self.rect().topLeft())
            k = img.width() / max(1, cap.width())
            src = QRectF((tl.x() - cap.x()) * k, (tl.y() - cap.y()) * k,
                         self.width() * k, self.height() * k)
            p.setRenderHint(QPainter.RenderHint.SmoothPixmapTransform, True)
            p.drawImage(QRectF(self.rect()), img, src)
            p.fillRect(self.rect(), self.tint)
            p.end()
            return
        img, sr = _backdrop()
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
            if _live["on"]:
                import time
                now = time.monotonic()
                if now - _live.get("last", 0) > 0.06:    # re-capture while dragging;
                    _live["last"] = now                  # paint re-maps instantly anyway
                    _grab()
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
    disable_live()
    if _layer is not None:
        _layer.hide()


def active() -> bool:
    return _layer is not None and _layer.isVisible()


# --- Live mode: frost the real windows behind Anki ------------------------------------
# Captures the screen area behind the main window, blurs it and paints it like the
# wallpaper slice. Anki excludes itself from screen capture (WDA_EXCLUDEFROMCAPTURE,
# Windows 10 2004+) so the capture shows what's BEHIND it — which also means Anki's
# window is hidden from screenshots and screen sharing while Live is on.
_live = {"on": False, "timer": None, "img": None, "rect": None}
WDA_NONE, WDA_EXCLUDEFROMCAPTURE = 0x0, 0x11


def _affinity(hwnd, on):
    try:
        import ctypes
        return bool(ctypes.windll.user32.SetWindowDisplayAffinity(
            ctypes.c_void_p(int(hwnd)), WDA_EXCLUDEFROMCAPTURE if on else WDA_NONE))
    except Exception:
        return False


_MARGIN = 120        # px captured around the window, so small moves show instantly
_SCALE = 8           # blur works on a 1/8-size copy; smooth up-scaling spreads it out


def _grab():
    """Capture the screen area around + behind the main window at 1/8 size, lightly
    blurred. Paint maps the window's CURRENT position into it, so the frosted
    background stays put while the window moves (no waiting for a new capture)."""
    if not _live["on"] or _layer is None or mw.isMinimized() or not mw.isVisible():
        return
    try:
        scr = mw.screen()
        sg = scr.geometry()
        g = mw.frameGeometry().adjusted(-_MARGIN, -_MARGIN, _MARGIN, _MARGIN) & sg
        pm = scr.grabWindow(0, g.x() - sg.x(), g.y() - sg.y(), g.width(), g.height())
        if pm.isNull():
            return
        small = pm.toImage().scaled(max(1, g.width() // _SCALE), max(1, g.height() // _SCALE),
                                    Qt.AspectRatioMode.IgnoreAspectRatio,
                                    Qt.TransformationMode.SmoothTransformation)
        _live["img"] = _blur(small, strength=1)
        _live["rect"] = g                      # global rect the capture covers
        _layer.update()
    except Exception:
        pass


def enable_live(tint_rgba) -> bool:
    """Returns False if Windows won't exclude Anki from capture (then use wallpaper)."""
    from aqt.qt import QTimer
    if not _affinity(mw.winId(), True):
        return False
    enable(tint_rgba)
    _live["on"] = True
    if _live["timer"] is None:
        t = QTimer(mw)
        t.setInterval(100)                     # ~10 refreshes/s of what's behind
        t.timeout.connect(_grab)
        _live["timer"] = t
    _live["timer"].start()
    _grab()
    return True


def disable_live():
    if _live["on"]:
        _live["on"] = False
        _affinity(mw.winId(), False)
        if _live["timer"] is not None:
            _live["timer"].stop()
        _live["img"] = None
