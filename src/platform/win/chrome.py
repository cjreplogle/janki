"""Frameless glass window chrome for Windows.

Windows only lets Qt draw a translucent top-level window when it's frameless, so for
glass the main window drops the native frame and Janki draws the Mac-style chrome
itself: traffic-light buttons (close / minimise / maximise) at the top-left, drag to
move from the toolbar's empty space (with Aero Snap, via startSystemMove), double-click
to maximise, and resizing from any edge (startSystemResize).
"""
from aqt import mw
from aqt.qt import (QWidget, QHBoxLayout, QPainter, QColor, QEvent, QObject, Qt,
                    QApplication, QRectF, QPointF, QPen, QCursor)

EDGE = 6          # px band along the window edge that resizes
_lights = None
_resizer = None


class _Light(QWidget):
    def __init__(self, color, glyph, action, parent):
        super().__init__(parent)
        self._color, self._glyph, self._action = QColor(color), glyph, action
        self._hover = False
        self.setFixedSize(14, 14)
        self.setCursor(Qt.CursorShape.ArrowCursor)

    def paintEvent(self, _ev):
        p = QPainter(self)
        p.setRenderHint(QPainter.RenderHint.Antialiasing)
        p.setPen(QPen(self._color.darker(130), 0.6))
        p.setBrush(self._color)
        p.drawEllipse(QRectF(1, 1, 12, 12))
        if self.parent()._hover:
            p.setPen(QPen(QColor(0, 0, 0, 150), 1.2))
            c = QPointF(7, 7)
            if self._glyph == "x":
                p.drawLine(c + QPointF(-2.5, -2.5), c + QPointF(2.5, 2.5))
                p.drawLine(c + QPointF(-2.5, 2.5), c + QPointF(2.5, -2.5))
            elif self._glyph == "-":
                p.drawLine(c + QPointF(-3, 0), c + QPointF(3, 0))
            else:
                p.drawLine(c + QPointF(-3, 0), c + QPointF(3, 0))
                p.drawLine(c + QPointF(0, -3), c + QPointF(0, 3))
        p.end()

    def mouseReleaseEvent(self, ev):
        if ev.button() == Qt.MouseButton.LeftButton and self.rect().contains(ev.position().toPoint()):
            self._action()


class TrafficLights(QWidget):
    def __init__(self, parent):
        super().__init__(parent)
        self._hover = False
        lay = QHBoxLayout(self)
        lay.setContentsMargins(0, 0, 0, 0)
        lay.setSpacing(8)
        for color, glyph, act in (("#ff5f57", "x", mw.close),
                                  ("#febc2e", "-", mw.showMinimized),
                                  ("#28c840", "+", toggle_maximize)):
            lay.addWidget(_Light(color, glyph, act, self))
        self.adjustSize()
        self.move(13, 12)

    def enterEvent(self, _ev):
        self._hover = True
        self.update()
        for c in self.findChildren(_Light):
            c.update()

    def leaveEvent(self, _ev):
        self._hover = False
        for c in self.findChildren(_Light):
            c.update()


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
    _lights = TrafficLights(mw)
    _lights.show()
    _lights.raise_()
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
        _lights.raise_()
