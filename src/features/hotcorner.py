"""Hot corner (Settings → Focus → Hot corner), modelled on WorkMode's hot corners.

  • Anki out of sight (hidden / minimised / closed to the tray) + the pointer rests in
    the chosen corner ~0.3 s → a frosted preview of the window slides partway in.
    Already on screen (even behind other windows) → nothing: the corner only fetches
    a window that's out of sight.
  • Move away from the corner and the preview → it slides back out (0.45 s grace).
  • Click the preview → it grows into the window, which comes forward.
  • That window is PROVISIONAL: clicking, typing or scrolling in Anki keeps it; switching
    to another app first slides it back into the corner.

The preview is a frosted card with Anki's icon — nothing is ever captured from the
screen or the window. The pointer is polled with QCursor (no global
event monitor), and macOS App Nap is held off so polling keeps running in the
background."""
import sys
import time

from aqt import mw
from aqt.qt import (QCursor, QEvent, QGuiApplication, QObject, QRect, QTimer, QWidget, Qt,
                    QPropertyAnimation, QParallelAnimationGroup, QEasingCurve)

from ..util.config import _cfg, log
from ..util import state

_HOT = 44            # px corner zone (WorkMode: hotSize)
_POKE = 64           # px of the preview that slides onto the screen
_DWELL = 0.3         # s resting in the corner before it fires
_GRACE = 0.45        # s away from corner + preview before the preview slides back

IDLE, PEEKING, OPEN, ANIM = "idle", "peeking", "open", "anim"
_st = IDLE
_timer = None
_since = None        # pointer entered the corner
_armed = True        # one fire per visit; re-arms once the pointer leaves the corner
_away = None         # when the pointer left corner + preview (peeking)
_panel = None
_anim = None
_anim_t = None       # watchdog: animations must finish


# ------------------------------------------------------------------ geometry --
def _corner():
    c = str(_cfg().get("hot_corner", "off")).lower()
    return c if c in ("top-left", "top-right", "bottom-left", "bottom-right") else None


def _screen():
    s = QGuiApplication.primaryScreen()
    return s.geometry() if s else QRect(0, 0, 1440, 900)


def _in_zone(pos, corner):
    g = _screen()
    left = pos.x() - g.left() <= _HOT
    right = g.right() - pos.x() <= _HOT
    top = pos.y() - g.top() <= _HOT
    bottom = g.bottom() - pos.y() <= _HOT
    return {"top-left": top and left, "top-right": top and right,
            "bottom-left": bottom and left, "bottom-right": bottom and right}[corner]


def _peek_rect(w, h, corner, extra=0):
    """Where the preview sits with _POKE px showing (extra: further off-screen)."""
    g, p = _screen(), _POKE - extra
    x = g.left() - w + p if "left" in corner else g.right() + 1 - p
    y = g.top() - h + p if "top" in corner else g.bottom() + 1 - p
    return QRect(x, y, w, h)


# ------------------------------------------------------------------- macOS ----
def _nsapp():
    if sys.platform != "darwin":
        return None, None
    try:
        import ctypes
        from ..util.bridge import _bridge
        msg, cls = _bridge()
        return msg, msg(ctypes.c_void_p, cls("NSApplication"), b"sharedApplication")
    except Exception:
        return None, None


def _app_hidden():
    import ctypes
    msg, app = _nsapp()
    return bool(app and msg(ctypes.c_bool, app, b"isHidden"))


def _on_screen():
    """Anki's window is showing in this Space (even if other windows cover it)."""
    try:
        return mw.isVisible() and not mw.isMinimized() and not _app_hidden()
    except Exception:
        return True


def _panel_style(w):
    """Non-activating, stays up while Anki is in the background, every Space."""
    if sys.platform.startswith("win"):
        try:
            from ..platform.win import shell as _wsh
            _wsh.make_overlay(int(w.winId()))
        except Exception:
            pass
        return
    try:
        import ctypes
        from ctypes import c_void_p, c_bool, c_ulong, c_int
        from ..util.bridge import _bridge
        msg, cls = _bridge()
        ns = msg(c_void_p, c_void_p(int(w.winId())), b"window")
        if not ns:
            return
        if msg(c_bool, ns, b"isKindOfClass:", (c_void_p,), (cls("NSPanel"),)):
            m = int(msg(c_ulong, ns, b"styleMask"))
            if not (m & 128):
                msg(None, ns, b"setStyleMask:", (c_ulong,), (m | 128,))
            msg(None, ns, b"setHidesOnDeactivate:", (c_bool,), (False,))
        msg(None, ns, b"setLevel:", (c_int,), (101,))          # pop-up menu level
        msg(None, ns, b"setCollectionBehavior:", (c_ulong,), (1 | 16,))
        msg(None, ns, b"setHasShadow:", (c_bool,), (True,))
        msg(None, ns, b"setOpaque:", (c_bool,), (False,))
    except Exception as e:
        log("hot corner panel: %s" % e)


# ------------------------------------------------------------------- preview --
class _Preview(QWidget):
    """The stand-in: a frosted dark card with Anki's icon where it pokes in (no
    screen/window capture — by design)."""

    def __init__(self):
        super().__init__(None, Qt.WindowType.Tool | Qt.WindowType.FramelessWindowHint
                         | Qt.WindowType.WindowStaysOnTopHint
                         | Qt.WindowType.WindowDoesNotAcceptFocus)
        self.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground, True)
        self.setAttribute(Qt.WidgetAttribute.WA_ShowWithoutActivating, True)
        self.setCursor(Qt.CursorShape.PointingHandCursor)
        self.corner = "bottom-left"

    def paintEvent(self, _e):
        from aqt.qt import QPainter, QPainterPath, QColor, QRectF
        p = QPainter(self)
        p.setRenderHint(QPainter.RenderHint.Antialiasing, True)
        p.setRenderHint(QPainter.RenderHint.SmoothPixmapTransform, True)
        r = QRectF(self.rect()).adjusted(0.5, 0.5, -0.5, -0.5)
        path = QPainterPath()
        path.addRoundedRect(r, 12, 12)
        p.setClipPath(path)
        p.fillPath(path, QColor(22, 24, 32, 236))
        # a faint toolbar strip so it reads as "the Anki window"
        p.fillRect(QRectF(0, 0, self.width(), 46), QColor(255, 255, 255, 14))
        ic = mw.windowIcon().pixmap(88, 88)
        s, m = 44, (_POKE - 44) // 2             # icon centred in the part that pokes in
        x = self.width() - _POKE + m if "left" in self.corner else m
        y = self.height() - _POKE + m if "top" in self.corner else m
        if self.width() > 3 * _POKE and self.height() > 3 * _POKE and _st != PEEKING:
            x, y = (self.width() - s) // 2, (self.height() - s) // 2   # growing: centred
        p.drawPixmap(x, y, s, s, ic)
        p.setClipping(False)
        p.setPen(QColor(255, 255, 255, 40))
        p.drawPath(path)
        p.end()

    def mousePressEvent(self, _e):
        _commit()


def _ensure_panel():
    global _panel
    if _panel is None:
        _panel = _Preview()
        _panel.winId()
        _panel_style(_panel)
    return _panel


def _animate(rect, opacity, ms, curve, done):
    """Move + fade the preview; `done` runs when it lands."""
    global _anim, _anim_t
    w = _ensure_panel()
    g = QParallelAnimationGroup(w)
    a = QPropertyAnimation(w, b"geometry", g)
    a.setDuration(ms); a.setEndValue(rect); a.setEasingCurve(curve)
    b = QPropertyAnimation(w, b"windowOpacity", g)
    b.setDuration(ms); b.setEndValue(float(opacity)); b.setEasingCurve(curve)
    g.addAnimation(a); g.addAnimation(b)
    g.finished.connect(done)
    _anim, _anim_t = g, time.monotonic()
    g.start()


def _home():
    try:
        return mw.normalGeometry() if mw.isMaximized() else mw.frameGeometry()
    except Exception:
        g = _screen()
        return QRect(g.left() + 80, g.top() + 60, 1000, 720)


# -------------------------------------------------------------- state machine --
def _peek(corner):
    global _st
    w = _ensure_panel()
    w.corner = corner
    h = _home()
    size = h.size()
    # macOS: a hidden app hides ALL its windows, the preview too. Take the main window
    # down on Qt's side first, then unhide the app without activating it, so only the
    # preview shows.
    msg, app = _nsapp()
    if app and _app_hidden():
        if mw.isVisible():
            mw.hide()
        msg(None, app, b"unhideWithoutActivation")
    try:
        from . import sfx
        sfx.play("tray")
    except Exception:
        pass
    _st = ANIM
    w.setGeometry(_peek_rect(size.width(), size.height(), corner, extra=_POKE + 12))
    w.setWindowOpacity(0.0)
    w.show()
    w.raise_()
    _animate(_peek_rect(size.width(), size.height(), corner), 1.0, 160,
             QEasingCurve.Type.OutCubic, lambda: _set(PEEKING) if _st == ANIM else None)


def _retract():
    global _st
    if _st != PEEKING:
        return
    _st = ANIM
    w = _ensure_panel()
    r = w.geometry()
    _animate(_peek_rect(r.width(), r.height(), w.corner, extra=_POKE + 12), 0.0, 160,
             QEasingCurve.Type.InCubic, lambda: (w.hide(), _set(IDLE)))


def _commit():
    """Preview clicked → grow into the window's frame, then bring Anki forward."""
    global _st
    if _st != PEEKING:
        return
    _st = ANIM
    target = _home()

    def landed():
        global _st
        try:
            from ..system import tray
            tray.suppress_reopen(0.3)
            if not mw.isVisible() or mw.isMinimized():
                tray._restore_window()
        except Exception:
            if not mw.isVisible() or mw.isMinimized():
                mw.showNormal()
        mw.setWindowOpacity(1.0)
        mw.raise_()
        mw.activateWindow()
        try:
            from ..user import glass
            glass._wake_main_webviews()
        except Exception:
            pass
        msg, app = _nsapp()
        if app:
            import ctypes
            msg(None, app, b"activateIgnoringOtherApps:", (ctypes.c_bool,), (True,))
        if sys.platform.startswith("win"):
            try:
                from ..platform.win import shell
                shell.force_foreground(int(mw.winId()))
            except Exception:
                pass
        # the window is up under the stand-in; fade the stand-in away
        QTimer.singleShot(120, lambda: _animate(target, 0.0, 120, QEasingCurve.Type.Linear,
                                                lambda: (_ensure_panel().hide(),
                                                         _set(OPEN))))
    try:
        from . import sfx
        sfx.play("open")
    except Exception:
        pass
    _animate(target, 1.0, 220, QEasingCurve.Type.OutCubic, landed)


def _put_away():
    """Provisional window left for another app → slide it back into the corner."""
    global _st
    if _st != OPEN or not _on_screen():
        _set(IDLE)
        return
    corner = _corner()
    if corner is None:
        _set(IDLE)
        return
    _st = ANIM
    frame = _home()
    w = _ensure_panel()
    w.corner = corner
    w.setGeometry(frame)
    w.setWindowOpacity(1.0)
    w.show()
    w.raise_()
    mw.hide()                         # the stand-in covers the swap
    _animate(_peek_rect(frame.width(), frame.height(), corner, extra=_POKE + 12), 0.0, 180,
             QEasingCurve.Type.InCubic, lambda: (w.hide(), _set(IDLE)))


def _set(s):
    global _st
    _st = s


def _tick():
    global _since, _armed, _away, _st
    if _quitting:
        return
    corner = _corner()
    if corner is None or getattr(state, "_lockdown_on", False):
        return
    if _st == ANIM:                   # safety net: a stuck animation resets
        if _anim_t and time.monotonic() - _anim_t > 2:
            try:
                _ensure_panel().hide()
            except Exception:
                pass
            _st = IDLE
        return
    pos = QCursor.pos()
    hot = _in_zone(pos, corner)
    now = time.monotonic()
    if not hot:
        _armed = True
    _since = (_since or now) if hot else None
    dwelled = _since is not None and now - _since >= _DWELL

    if _st == IDLE:
        if hot and dwelled and _armed and not _on_screen():
            _armed = False
            _peek(corner)
    elif _st == PEEKING:
        if hot or _ensure_panel().geometry().contains(pos):
            _away = None
        elif _away is None:
            _away = now
        elif now - _away >= _GRACE:
            _away = None
            _retract()
    elif _st == OPEN:
        if not _on_screen():
            _st = IDLE


class _Watch(QObject):
    """Clicking / typing / scrolling in Anki keeps a provisional window."""

    def eventFilter(self, obj, ev):
        global _st
        if _st == OPEN and ev.type() in (QEvent.Type.MouseButtonPress, QEvent.Type.KeyPress,
                                         QEvent.Type.Wheel):
            if _panel is None or obj is not _panel:
                _st = IDLE
        return False


def _app_state(s):
    # leaving Anki while the window is still provisional → back into the corner
    if _quitting:
        return
    if s != Qt.ApplicationState.ApplicationActive:
        if _st == OPEN:
            QTimer.singleShot(0, _put_away)


_watch = None
_quitting = False


def shutdown():
    """Anki is closing: stop polling, drop the preview, ignore app-state changes."""
    global _quitting, _st
    _quitting = True
    _st = IDLE
    try:
        if _timer is not None:
            _timer.stop()
        if _panel is not None:
            _panel.hide()
            _panel.deleteLater()
    except Exception:
        pass


def reload():
    """Start/stop polling to match the setting."""
    global _timer, _watch, _quitting
    _quitting = False
    try:
        if _corner() is None:
            if _timer is not None:
                _timer.stop()
            return
        if sys.platform == "darwin":
            # App Nap throttles a backgrounded app's timers to a crawl — exactly when
            # the corner needs polling. Same exemption the gamepad uses.
            try:
                from ..integrations import gamepad
                gamepad._prevent_app_nap()
            except Exception as e:
                log("hot corner app nap: %s" % e)
        if _timer is None:
            _timer = QTimer(mw)
            _timer.setInterval(50)
            _timer.timeout.connect(_tick)
            from aqt.qt import QApplication
            _watch = _Watch(mw)
            QApplication.instance().installEventFilter(_watch)
            QApplication.instance().applicationStateChanged.connect(_app_state)
        _timer.start()
    except Exception as e:
        log("hot corner: %s" % e)
