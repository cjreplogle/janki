"""Frameless glass window chrome for Windows.

Windows only lets Qt draw a translucent top-level window when it's frameless, so for
glass the main window drops the native frame and Janki draws the Mac-style chrome
itself: Windows-style caption buttons (minimise / maximise / close) at the top-right, drag to
move from the toolbar's empty space (with Aero Snap, via startSystemMove), double-click
to maximise, and resizing from any edge (startSystemResize).
"""
from aqt import mw
from aqt.qt import (QWidget, QHBoxLayout, QPainter, QColor, QEvent, QObject, Qt,
                    QApplication, QRectF, QPointF, QPen, QCursor)

EDGE = 6          # px band along the window edge that resizes
TOP_GAP = 6       # px breathing room above the caption buttons/toolbar pill (matches
                  # the #header padding-top in css.py so both sit at the same offset)
_lights = None
_resizer = None


class _CapButton(QWidget):
    """One Windows caption button (minimise / maximise / close): flat on the glass,
    soft highlight on hover, red for close — drawn with Windows' own icon font."""
    GLYPHS = {"min": "\uE921", "max": "\uE922", "restore": "\uE923", "close": "\uE8BB"}

    def __init__(self, kind, action, parent):
        super().__init__(parent)
        self._kind, self._action = kind, action
        self._hover = self._down = False
        self.setFixedSize(46, 32)
        self.setCursor(Qt.CursorShape.ArrowCursor)

    def paintEvent(self, _ev):
        from aqt.qt import QFont, QFontDatabase
        p = QPainter(self)
        p.setRenderHint(QPainter.RenderHint.Antialiasing)
        close = self._kind == "close"
        if self._hover or self._down:
            if close:
                p.fillRect(self.rect(), QColor(196, 43, 28, 230 if self._down else 255))
            else:
                p.fillRect(self.rect(), QColor(255, 255, 255, 18 if self._down else 28))
        kind = self._kind
        if kind == "max" and mw.isMaximized():
            kind = "restore"
        fam = next((f for f in ("Segoe Fluent Icons", "Segoe MDL2 Assets")
                    if f in QFontDatabase.families()), None)
        p.setPen(QColor(255, 255, 255) if (close and self._hover) else QColor(235, 235, 235, 220))
        if fam:
            f = QFont(fam)
            f.setPixelSize(10)
            p.setFont(f)
            p.drawText(self.rect(), Qt.AlignmentFlag.AlignCenter, self.GLYPHS[kind])
        else:                                  # fallback: draw the glyph with lines
            c = QPointF(23, 16)
            if kind == "min":
                p.drawLine(c + QPointF(-5, 0), c + QPointF(5, 0))
            elif kind == "close":
                p.drawLine(c + QPointF(-5, -5), c + QPointF(5, 5))
                p.drawLine(c + QPointF(-5, 5), c + QPointF(5, -5))
            else:
                p.drawRect(QRectF(c.x() - 5, c.y() - 5, 10, 10))
        p.end()

    def enterEvent(self, _ev):
        self._hover = True
        self.update()

    def leaveEvent(self, _ev):
        self._hover = self._down = False
        self.update()

    def mousePressEvent(self, ev):
        if ev.button() == Qt.MouseButton.LeftButton:
            self._down = True
            self.update()

    def mouseReleaseEvent(self, ev):
        was = self._down
        self._down = False
        self.update()
        if was and ev.button() == Qt.MouseButton.LeftButton and \
                self.rect().contains(ev.position().toPoint()):
            self._action()


def _on_close_clicked():
    """Red-X: minimize to the tray when that's on, exactly like the mac/other-
    platform close paths — called directly rather than routed through mw.close()
    so the frameless caption button's behaviour doesn't depend on Qt's close-event
    dispatch order (event filter vs. the closeEvent override in tray.py) ever
    landing before Qt tears the window down."""
    try:
        from ..util.config import _cfg
        if _cfg().get("tray_minimize", False):
            from ..system import tray
            tray._minimize_to_tray()
            return
    except Exception:
        pass
    mw.close()


class CaptionButtons(QWidget):
    """Windows-style caption buttons pinned to the top-right corner."""

    def __init__(self, parent):
        super().__init__(parent)
        lay = QHBoxLayout(self)
        lay.setContentsMargins(0, 0, 0, 0)
        lay.setSpacing(0)
        for kind, act in (("min", mw.showMinimized), ("max", toggle_maximize),
                          ("close", _on_close_clicked)):
            lay.addWidget(_CapButton(kind, act, self))
        self.adjustSize()
        self.place()

    def place(self):
        self.move(self.parent().width() - self.width(), TOP_GAP)
        self.raise_()


class _PlaceOnResize(QObject):
    def eventFilter(self, obj, ev):
        if ev.type() in (QEvent.Type.Resize, QEvent.Type.WindowStateChange) and _lights:
            _lights.place()
            for b in _lights.findChildren(_CapButton):
                b.update()
        return False


def toggle_maximize():
    if mw.isMaximized():
        mw.showNormal()
    else:
        mw.showMaximized()


def start_move():
    """Begin a native window drag (Aero Snap works). Called on toolbar mouse-down."""
    try:
        h = mw.windowHandle()
        if h is not None:
            h.startSystemMove()
    except Exception:
        pass


class _EdgeResizer(QObject):
    """App-wide: near the main window's edges, show a resize cursor and start a native
    resize on press. Watches all of mw's widgets (the web views eat mouse events)."""

    def _edges(self, gpos):
        if mw.isMaximized() or mw.isFullScreen():
            return None
        g = mw.frameGeometry()
        e = Qt.Edge(0)
        if gpos.x() - g.left() < EDGE:
            e |= Qt.Edge.LeftEdge
        elif g.right() - gpos.x() < EDGE:
            e |= Qt.Edge.RightEdge
        if gpos.y() - g.top() < EDGE:
            e |= Qt.Edge.TopEdge
        elif g.bottom() - gpos.y() < EDGE:
            e |= Qt.Edge.BottomEdge
        return e if e != Qt.Edge(0) else None

    def eventFilter(self, obj, ev):
        t = ev.type()
        if t not in (QEvent.Type.MouseMove, QEvent.Type.MouseButtonPress, QEvent.Type.HoverMove):
            return False
        try:
            if not isinstance(obj, QWidget) or obj.window() is not mw:
                return False
        except Exception:
            return False
        edges = self._edges(QCursor.pos())
        if edges is None:
            if getattr(mw, "_jk_edge_cursor", False):
                mw._jk_edge_cursor = False
                QApplication.restoreOverrideCursor()
            return False
        if t == QEvent.Type.MouseButtonPress and ev.button() == Qt.MouseButton.LeftButton:
            if getattr(mw, "_jk_edge_cursor", False):
                mw._jk_edge_cursor = False
                QApplication.restoreOverrideCursor()
            mw.windowHandle().startSystemResize(edges)
            return True
        horiz = bool(edges & (Qt.Edge.LeftEdge | Qt.Edge.RightEdge))
        vert = bool(edges & (Qt.Edge.TopEdge | Qt.Edge.BottomEdge))
        if horiz and vert:
            tl_br = (edges & Qt.Edge.LeftEdge and edges & Qt.Edge.TopEdge) or \
                    (edges & Qt.Edge.RightEdge and edges & Qt.Edge.BottomEdge)
            shape = Qt.CursorShape.SizeFDiagCursor if tl_br else Qt.CursorShape.SizeBDiagCursor
        else:
            shape = Qt.CursorShape.SizeHorCursor if horiz else Qt.CursorShape.SizeVerCursor
        if getattr(mw, "_jk_edge_cursor", False):
            QApplication.changeOverrideCursor(shape)
        else:
            mw._jk_edge_cursor = True
            QApplication.setOverrideCursor(shape)
        return False


def install():
    """Make the main window frameless + translucent and add the chrome. Idempotent."""
    global _lights, _resizer
    if getattr(mw, "_jk_frameless", False):
        return
    mw._jk_frameless = True
    was_visible = mw.isVisible()
    geo = mw.geometry()
    mw.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground, True)
    mw.setWindowFlags(mw.windowFlags() | Qt.WindowType.FramelessWindowHint)
    if was_visible:                       # setWindowFlags hides the window; bring it back
        mw.setGeometry(geo)
        mw.show()
    _lights = CaptionButtons(mw)
    _lights.show()
    _lights.raise_()
    mw._jk_cap_place = _PlaceOnResize(mw)
    mw.installEventFilter(mw._jk_cap_place)
    _resizer = _EdgeResizer(mw)
    QApplication.instance().installEventFilter(_resizer)
    # Anki's in-window menu bar (File/Edit/Tools…) would sit above the toolbar and
    # under the traffic lights. Hide it; a lone Alt tap shows it (the Windows
    # convention for custom title bars), and it hides again once a menu closes.
    try:
        mb = mw.menuBar()
        mb.hide()
        global _alt
        _alt = _AltMenu(mb)
        QApplication.instance().installEventFilter(_alt)
    except Exception:
        pass


_alt = None


class _AltMenu(QObject):
    def __init__(self, mb):
        super().__init__(mw)
        self._mb, self._armed = mb, False

    def eventFilter(self, obj, ev):
        t = ev.type()
        if t == QEvent.Type.KeyPress:
            self._armed = ev.key() == Qt.Key.Key_Alt and not ev.isAutoRepeat()
        elif t == QEvent.Type.KeyRelease and ev.key() == Qt.Key.Key_Alt and self._armed:
            self._armed = False
            if self._mb.isVisible():
                self._mb.hide()
            else:
                self._mb.show()
                acts = self._mb.actions()
                if acts:
                    self._mb.setActiveAction(acts[0])
        elif t == QEvent.Type.MouseButtonPress:
            self._armed = False
            if self._mb.isVisible() and not self._mb.activeAction():
                try:
                    if not (isinstance(obj, QWidget) and self._mb.isAncestorOf(obj)) and obj is not self._mb:
                        self._mb.hide()
                except Exception:
                    pass
        return False


def raise_lights():
    if _lights is not None:
        _lights.place()
