"""Optional gear button in the top-right corner of the main window's toolbar strip that
opens Janki Settings (Settings → Appearance → Window). It's a child of the top toolbar,
so it hides whenever the toolbar does (Focus Mode, fullscreen chrome-hiding)."""
from aqt import mw
from aqt.qt import QEvent, QObject, Qt, QToolButton, QTimer

from ..util.config import _cfg, log

_btn = None
_filter = None
_last = None          # last measured (top, size) of the toolbar pill, in widget px
_pending = None       # a differing measurement awaiting confirmation


class _GearButton(QToolButton):
    """Self-painted circular button in the toolbar pill's look. Painted by hand (not a
    stylesheet + QGraphicsDropShadowEffect): the effect renders into an offscreen SQUARE
    that showed as a dark box over the toolbar webview, and stylesheet circles aren't
    antialiased. Nothing is drawn outside the circle + its soft shadow."""

    def __init__(self, parent):
        super().__init__(parent)
        self._hover = False
        self._down = False
        self.setAttribute(Qt.WidgetAttribute.WA_NoSystemBackground, True)
        self.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground, True)
        self.setAutoFillBackground(False)
        self.setMouseTracking(True)

    def enterEvent(self, ev):
        self._hover = True; self.update(); super().enterEvent(ev)

    def leaveEvent(self, ev):
        self._hover = False; self._down = False; self.update(); super().leaveEvent(ev)

    def mousePressEvent(self, ev):
        self._down = True; self.update(); super().mousePressEvent(ev)

    def mouseReleaseEvent(self, ev):
        self._down = False; self.update(); super().mouseReleaseEvent(ev)

    def paintEvent(self, _ev):
        from aqt.qt import (QPainter, QColor, QRectF, QFont, QFontMetricsF, QPainterPath,
                            QPointF)
        p = QPainter(self)
        p.setRenderHint(QPainter.RenderHint.Antialiasing, True)
        p.setRenderHint(QPainter.RenderHint.TextAntialiasing, True)
        p.setPen(Qt.PenStyle.NoPen)
        w, h = self.width(), self.height()
        pad = 2                                   # room for the shadow
        d = min(w, h) - 2 * pad
        x, y = (w - d) / 2.0, (h - d) / 2.0 - 0.5
        y = max(0.5, y)                            # never clip the top edge
        body = QPainterPath()
        body.addEllipse(QRectF(x, y, d, d))
        # soft shadow (like the pill's 0 1px 3px) drawn OUTSIDE the circle only: a filled
        # shadow under a translucent fill darkened the button below the bar's shade.
        for grow, a in ((2.0, 18), (1.0, 34)):
            sh = QPainterPath()
            sh.addEllipse(QRectF(x - grow / 2, y - grow / 2 + 1, d + grow, d + grow))
            p.setBrush(QColor(0, 0, 0, a))
            p.drawPath(sh.subtracted(body))
        # dark island — the bar's exact fill, rgba(0,0,0,0.52)
        p.setBrush(QColor(0, 0, 0, 133))
        p.drawPath(body)
        # hover / pressed: lighter inner circle inset inside a dark ring
        if self._hover or self._down:
            ring = max(3.0, d * 0.1)
            p.setBrush(QColor(255, 255, 255, 46 if self._down else 31))
            p.drawEllipse(QRectF(x + ring, y + ring, d - 2 * ring, d - 2 * ring))
        # gear glyph, centred on its INK (tight bounds), not the font's line box
        # Size by the glyph's INK: "⚙" draws much smaller than its font size, so scale
        # the font until the gear itself spans ~50% of the circle.
        f = QFont(self.font())
        f.setPixelSize(100)
        probe = QFontMetricsF(f).tightBoundingRect("⚙")
        span = max(probe.width(), probe.height()) or 50.0
        f.setPixelSize(max(12, int(100 * (d * 0.50) / span)))
        fm = QFontMetricsF(f)
        ink = fm.tightBoundingRect("⚙")
        cx, cy = x + d / 2.0, y + d / 2.0
        base = QPointF(cx - (ink.x() + ink.width() / 2.0), cy - (ink.y() + ink.height() / 2.0))
        path = QPainterPath()
        path.addText(base, f, "⚙")
        p.setBrush(QColor(255, 255, 255, 245 if self._hover else 225))
        p.drawPath(path)
        p.end()


class _Follow(QObject):
    """Keep the button pinned to the toolbar's top-right corner as it resizes."""

    def eventFilter(self, obj, ev):
        if ev.type() in (QEvent.Type.Resize, QEvent.Type.Show):
            QTimer.singleShot(0, _place)
            QTimer.singleShot(400, _place)      # after the page re-lays out
        return False


def _host():
    tb = getattr(mw, "toolbar", None)
    return getattr(tb, "web", None)


_PILL_JS = ("(function(){var t=document.querySelector('div.toolbar');if(!t)return null;"
            "var r=t.getBoundingClientRect();return [r.top,r.height];})()")


def _set_geom(top, size):
    host = _host()
    if _btn is None or host is None:
        return
    global _last
    _last = (top, size)
    size = int(max(22, min(size, 48)))
    # Widget = circle + 2px each side for the painted shadow, centred on the bar's
    # centre. Never let it poke above the toolbar strip (that clipped the circle's top
    # flat): if there isn't room, shrink it slightly rather than move it off-centre.
    centre = top + size / 2.0
    side = int(min(size + 4, 2 * centre, host.height()))
    side = max(side, 20)
    x = host.width() - side - 14
    y = int(round(max(0.0, centre - side / 2.0)))
    if _btn.size().width() != side or _btn.size().height() != side:
        _btn.setFixedSize(side, side)
    if (_btn.x(), _btn.y()) != (x, y):          # move only on a real change (no jitter)
        _btn.move(x, y)
    if not _btn.isVisible() and bool(_cfg().get("main_settings_button", False)):
        _btn.show()
    _btn.raise_()


def _place():
    """Match the toolbar pill: same height, same vertical position (read from the page,
    so it follows zoom and relayouts). Falls back to a centred 30px circle."""
    host = _host()
    if _btn is None or host is None:
        return
    # Keep the last measured spot (just re-anchor x for a width change) until the page
    # answers — jumping to a fallback first made the gear jitter right after opening.
    if _last is not None:
        _set_geom(*_last)

    def _got(res):
        global _pending
        try:
            if not (res and len(res) == 2 and res[1] > 0):
                return
            z = float(host.zoomFactor() or 1.0)
            new = (round(res[0] * z, 1), round(res[1] * z, 1))
            if _last is None or new != (round(_last[0], 1), round(_last[1], 1)):
                # The page reports interim positions while it settles after launch;
                # only move once two readings ~200 ms apart agree.
                if _pending == new:
                    _pending = None
                    _set_geom(*new)
                else:
                    _pending = new
                    QTimer.singleShot(200, _place)
        except Exception:
            pass
    try:
        if hasattr(host, "evalWithCallback"):
            host.evalWithCallback(_PILL_JS, _got)
        else:
            host.page().runJavaScript(_PILL_JS, _got)
    except Exception:
        pass
    if _last is None:
        # Page never answered (no pill yet)? Show a centred fallback after a moment.
        QTimer.singleShot(1500, lambda: _last is None and _set_geom(
            (host.height() - 30) / 2, 30))


def _open():
    try:
        from ..system import settings_dialog
        settings_dialog._open_settings()
    except Exception as exc:
        log("settings button: %s" % exc)


def apply(on=None) -> None:
    """Show/hide the button per config main_settings_button (or `on`)."""
    global _btn, _filter
    if on is None:
        on = bool(_cfg().get("main_settings_button", False))
    host = _host()
    if not on or host is None:
        if _btn is not None:
            _btn.hide()
        return
    if _btn is None or _btn.parent() is not host:
        _btn = _GearButton(host)
        _btn.setToolTip("Janki Settings")
        _btn.setCursor(Qt.CursorShape.PointingHandCursor)
        _btn.clicked.connect(_open)
        _filter = _Follow(host)
        host.installEventFilter(_filter)
        try:                                      # toolbar redraws re-lay out the pill
            host.loadFinished.connect(lambda *_a: QTimer.singleShot(60, _place))
        except Exception:
            pass
    if _last is not None:
        _btn.show()                     # first show waits for the pill measurement
    _place()
