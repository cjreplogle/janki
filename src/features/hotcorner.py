"""Hot corner (Settings → General): rest the pointer in the chosen screen corner and
Anki comes forward, like the Metabolic Map / WorkMode hot corner.

  • rest in the corner ~¼ s → Anki fades in (same path as ⌥⌘A / Ctrl+Alt+A)
  • click anywhere in Anki → it stays
  • didn't click? leave the window (and the corner) → it slips away again

Works on macOS and Windows: the pointer is polled with QCursor (no global event
monitor or extra permission needed)."""
import time

from aqt import mw
from aqt.qt import QCursor, QEvent, QGuiApplication, QObject, QTimer

from ..util.config import _cfg, log
from ..util import state

_ZONE = 6            # px from the exact corner that counts as "in the corner"
_DWELL = 0.25        # s resting in the corner before it fires
_GRACE = 0.45        # s outside window + corner before an uncommitted open hides

_timer = None
_since = None        # when the pointer entered the corner
_armed = True        # re-arms once the pointer leaves the corner
_opened = False      # Anki was brought forward by the corner…
_committed = False   # …and then clicked (so it stays)
_away_since = None


def _corner():
    c = str(_cfg().get("hot_corner", "off")).lower()
    return c if c in ("top-left", "top-right", "bottom-left", "bottom-right") else None


def _in_corner(pos, corner):
    scr = QGuiApplication.screenAt(pos)
    if scr is None:
        return False
    g = scr.geometry()
    left = pos.x() <= g.left() + _ZONE
    right = pos.x() >= g.right() - _ZONE
    top = pos.y() <= g.top() + _ZONE
    bottom = pos.y() >= g.bottom() - _ZONE
    return {"top-left": top and left, "top-right": top and right,
            "bottom-left": bottom and left, "bottom-right": bottom and right}[corner]


def _anki_front():
    try:
        return bool(mw.isVisible() and not mw.isMinimized()
                    and getattr(state, "_anki_focused", False))
    except Exception:
        return False


def _toggle():
    from ..util import keytap
    keytap._toggle_main_window()


def _tick():
    global _since, _armed, _opened, _committed, _away_since
    corner = _corner()
    if corner is None or getattr(state, "_lockdown_on", False):
        return
    pos = QCursor.pos()
    inside = _in_corner(pos, corner)
    now = time.monotonic()

    if inside:
        _away_since = None
        if _since is None:
            _since = now
        if _armed and now - _since >= _DWELL:
            _armed = False
            if not _anki_front():
                _opened, _committed = True, False
                try:
                    from . import sfx
                    sfx.play("tray")
                except Exception:
                    pass
                _toggle()
        return
    _since = None
    _armed = True

    # An open the user never clicked into slips away once the pointer leaves.
    if _opened and not _committed:
        if not mw.isVisible() or mw.isMinimized():
            _opened = False
            return
        if mw.frameGeometry().contains(pos):
            _away_since = None
            return
        if _away_since is None:
            _away_since = now
        elif now - _away_since >= _GRACE:
            _opened, _away_since = False, None
            if _anki_front():
                _toggle()


class _ClickCommits(QObject):
    def eventFilter(self, obj, ev):
        global _committed
        if _opened and ev.type() == QEvent.Type.MouseButtonPress:
            _committed = True
        return False


_filter = None


def reload():
    """Start/stop polling to match the setting."""
    global _timer, _filter
    try:
        if _corner() is None:
            if _timer is not None:
                _timer.stop()
            return
        if _timer is None:
            _timer = QTimer(mw)
            _timer.setInterval(60)
            _timer.timeout.connect(_tick)
            _filter = _ClickCommits(mw)
            from aqt.qt import QApplication
            QApplication.instance().installEventFilter(_filter)
        _timer.start()
    except Exception as e:
        log("hot corner: %s" % e)
