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
    """Approximate a wide Gaussian: shrink, then grow back — in HALVING steps. One
    big 1/32 jump each way (as before) left blocky, diamond-patterned artefacts; a
    pyramid of 2× bilinear steps averages smoothly."""
    w, h = img.width(), img.height()
    sizes = [(w, h)]
    for _ in range(max(1, strength)):
        cw, ch = sizes[-1]
        if cw < 4 or ch < 4:
            break
        sizes.append((max(1, cw // 2), max(1, ch // 2)))
    for (cw, ch) in sizes[1:]:                       # down
        img = img.scaled(cw, ch, Qt.AspectRatioMode.IgnoreAspectRatio,
                         Qt.TransformationMode.SmoothTransformation)
    for (cw, ch) in reversed(sizes[:-1]):            # and back up
        img = img.scaled(cw, ch, Qt.AspectRatioMode.IgnoreAspectRatio,
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
    # work in PHYSICAL pixels (the screen's devicePixelRatio) so it isn't upscaled
    # soft on a high-DPI display
    try:
        scr = mw.screen() if hasattr(mw, "screen") else QGuiApplication.primaryScreen()
        dpr = float(scr.devicePixelRatio()) if scr else 1.0
    except Exception:
        dpr = 1.0
    pw, ph = int(sr.width() * dpr), int(sr.height() * dpr)
    img = img.scaled(pw, ph, Qt.AspectRatioMode.KeepAspectRatioByExpanding,
                     Qt.TransformationMode.SmoothTransformation)
    x, y = (img.width() - pw) // 2, (img.height() - ph) // 2
    img = _blur(img.copy(x, y, pw, ph), strength=6 if dpr > 1.25 else 5)
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
            from aqt.qt import QRectF, QTimer
            import time
            tl = self.mapToGlobal(self.rect().topLeft())

            p.setRenderHint(QPainter.RenderHint.SmoothPixmapTransform, True)
            now = time.monotonic()
            moving = now < _live.get("moving_until", 0)
            # While dragging, don't re-map the frost to the window's live position
            # (Windows shows the old frame at the new spot for a moment, so re-mapping
            # wobbles). Freeze it at the drag-start mapping — it rides along with the
            # window — and cross-fade to a fresh capture once the window settles.
            # Windows presents each new window position one frame before our repaint for
            # it lands, so painting for the CURRENT position alternates right/off-by-one
            # (the wobble). Painting for the PREVIOUS move's position keeps it a steady
            # one step behind instead — a slight trail, no back-and-forth.
            use_tl = (_live.get("lag_tl") or tl) if moving else tl

            def _draw_at(img, cap, at):
                kx = img.width() / max(1, cap.width())
                ky = img.height() / max(1, cap.height())
                src = QRectF((at.x() - cap.x()) * kx, (at.y() - cap.y()) * ky,
                             self.width() * kx, self.height() * ky)
                p.drawImage(QRectF(self.rect()), img, src)
            fade = min(1.0, (now - _live.get("t_swap", 0)) / 0.18)
            prev = _live.get("prev")
            if prev is not None and fade < 1.0 and not moving:
                _draw_at(prev, _live["prev_rect"], _live.get("prev_tl") or use_tl)
                p.setOpacity(fade)
                QTimer.singleShot(16, self.update)        # keep the cross-fade going
            _draw_at(_live["img"], _live["rect"], use_tl)
            p.setOpacity(1.0)
            p.fillRect(self.rect(), self.tint)
            p.end()
            return
        img, sr = _backdrop()
        if img is not None:
            from aqt.qt import QRectF
            p.setRenderHint(QPainter.RenderHint.SmoothPixmapTransform, True)
            top_left = self.mapToGlobal(self.rect().topLeft())
            k = img.width() / max(1, sr.width())       # image is in physical pixels
            src = QRectF((top_left.x() - sr.x()) * k, (top_left.y() - sr.y()) * k,
                         self.width() * k, self.height() * k)
            p.drawImage(QRectF(self.rect()), img, src)
        p.fillRect(self.rect(), self.tint)
        p.end()


class _Follow(QObject):
    def eventFilter(self, obj, ev):
        if _layer is not None and ev.type() in (QEvent.Type.Move, QEvent.Type.Resize,
                                                QEvent.Type.WindowStateChange):
            _layer.setGeometry(0, 0, mw.width(), mw.height())
            _layer.lower()
            if _live["on"] and ev.type() == QEvent.Type.Move:
                _live["lag_tl"] = _live.get("cur_tl")
                _live["cur_tl"] = mw.mapToGlobal(mw.rect().topLeft())
                # While the window moves, DON'T capture: mid-move captures can be a frame
                # stale vs where we paint, so edges behind jitter back and forth. Keep the
                # current capture (re-mapped each paint, like the wallpaper blur) and take
                # a fresh one once the window has been still for a moment.
                import time
                _live["moving_until"] = time.monotonic() + 0.15
                if _live.get("settle") is None:
                    from aqt.qt import QTimer
                    st = QTimer(mw)
                    st.setSingleShot(True)
                    st.timeout.connect(_grab)
                    _live["settle"] = st
                _live["settle"].start(160)
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


_MARGIN = 300        # px captured around the window, so drags stay covered
_SCALE = 8           # blur works on a 1/8-size copy; smooth up-scaling spreads it out


def _grab():
    """Capture the screen area around + behind the main window at 1/8 size, lightly
    blurred. Paint maps the window's CURRENT position into it, so the frosted
    background stays put while the window moves (no waiting for a new capture)."""
    if not _live["on"] or _layer is None or mw.isMinimized() or not mw.isVisible():
        return
    import time as _t
    if _t.monotonic() < _live.get("moving_until", 0):
        return                                 # mid-drag: wait for the window to settle
    try:
        scr = mw.screen()
        sg = scr.geometry()
        g = mw.frameGeometry().adjusted(-_MARGIN, -_MARGIN, _MARGIN, _MARGIN) & sg
        # Snap the capture to an 8-px screen grid so every capture down-samples the same
        # pixels into the same small pixels — otherwise the blur "swims" between frames.
        x0 = g.x() - ((g.x() - sg.x()) % _SCALE)
        y0 = g.y() - ((g.y() - sg.y()) % _SCALE)
        w = ((g.right() + 1 - x0) // _SCALE) * _SCALE
        h = ((g.bottom() + 1 - y0) // _SCALE) * _SCALE
        if w <= 0 or h <= 0:
            return
        pm = scr.grabWindow(0, x0 - sg.x(), y0 - sg.y(), w, h)
        if pm.isNull():
            return
        small = pm.toImage().scaled(w // _SCALE, h // _SCALE,
                                    Qt.AspectRatioMode.IgnoreAspectRatio,
                                    Qt.TransformationMode.SmoothTransformation)
        img = _blur(small, strength=1)
        from aqt.qt import QRect
        rect = QRect(x0, y0, w, h)
        old = _live.get("img")
        if old is not None and _live.get("rect") == rect and old == img:
            return                             # nothing behind changed: no repaint
        # Cross-fade from the previous capture so changes blend in instead of snapping.
        _live["prev"], _live["prev_rect"] = old, _live.get("rect")
        _live["img"], _live["rect"] = img, rect
        _live["prev_tl"] = None
        import time
        _live["t_swap"] = time.monotonic()
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
