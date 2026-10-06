"""Z / X / C / V as extra Again / Hard / Good / Easy keys in the reviewer (next to Anki's
1–4). Like 1–4 they only rate once the answer is showing, and they go through the normal
_answerCard path, so Janki's practice-card grading applies unchanged. Anki's review
shortcuts are only live while Anki is focused, so the global Tab+Z/X/C/V chords are
unaffected. They take priority: an Anki action on the same plain key moves to Alt+key
(V = replay your recorded voice → Alt+V). Config: zxcv_rating (default on).

The keys are caught by an app-wide key filter rather than QShortcuts: a QShortcut goes
silent when anything else (another add-on, a rebinding) registers the same plain key —
Qt treats that as ambiguous and fires neither — so rating only worked some of the time.
Ctrl/Alt/Win+Z etc. are never touched (Ctrl+Z stays Anki's undo)."""
from aqt import mw, gui_hooks
from aqt.qt import QApplication, QEvent, QObject, Qt

from ..util.config import _cfg, log

import time as _time

_LOG = None
_t_press = 0.0


def _diag(msg: str) -> None:
    """Per-press trace → ~/Library/Logs/janki-zxcv.log (why a press was ignored / how long
    the next card took), to pin down intermittent 'Z does nothing' moments."""
    global _LOG
    try:
        if _LOG is None:
            from ..platform import log_path
            _LOG = log_path("janki-zxcv.log")
        with open(_LOG, "a") as f:
            f.write("%s.%03d %s\n" % (_time.strftime("%H:%M:%S"), int(_time.time() * 1000) % 1000, msg))
    except Exception:
        pass


_KEYS = {Qt.Key.Key_Z: 1, Qt.Key.Key_X: 2, Qt.Key.Key_C: 3, Qt.Key.Key_V: 4}
_MODS = (Qt.KeyboardModifier.ControlModifier | Qt.KeyboardModifier.AltModifier
         | Qt.KeyboardModifier.MetaModifier | Qt.KeyboardModifier.ShiftModifier)


def _rate(ease: int) -> None:
    r = getattr(mw, "reviewer", None)
    if r is None or getattr(r, "state", None) != "answer" or not getattr(r, "card", None):
        return
    try:
        # Respect the deck's button count (e.g. 3-button cards on old schedulers).
        n = r._answerButtonList() and len(r._answerButtonList())
        if n and ease > n:
            return
    except Exception:
        pass
    global _t_press
    _t_press = _time.monotonic()
    _diag("rate ease=%d card=%s" % (ease, getattr(r.card, "id", None)))
    try:
        r._answerCard(ease)
    except Exception as e:
        log("zxcv: %s" % e)
        _diag("answerCard error: %s" % e)
    _diag("  _answerCard returned +%dms" % ((_time.monotonic() - _t_press) * 1000))


def _shown(card) -> None:
    global _t_press
    if _t_press:
        _diag("  next question shown +%dms" % ((_time.monotonic() - _t_press) * 1000))
        _t_press = 0.0


def _typing_into(w) -> bool:
    """A native text field has focus (e.g. a dialog's search box): let it type."""
    try:
        from aqt.qt import QLineEdit, QTextEdit, QPlainTextEdit, QAbstractSpinBox
        return isinstance(w, (QLineEdit, QTextEdit, QPlainTextEdit, QAbstractSpinBox))
    except Exception:
        return False


def _main_is_front() -> bool:
    """Anki is the active app and no real dialog is in front of the reviewer. Not just
    mw.isActiveWindow(): right after launch / tray-open, Qt's active window can briefly be
    one of Janki's own frameless panels (HUD, caption, glass overlay) or still be None
    while the window activates, which used to swallow the first Z/X/C/V presses."""
    if mw.isActiveWindow():
        return True
    app = QApplication.instance()
    if app.applicationState() != Qt.ApplicationState.ApplicationActive:
        return False
    aw = QApplication.activeWindow()
    if aw is None:
        return mw.isVisible()
    from aqt.qt import QDialog
    return not isinstance(aw, QDialog) and not aw.isModal() and aw.window() is not mw.window() \
        and bool(aw.windowFlags() & (Qt.WindowType.FramelessWindowHint | Qt.WindowType.Tool))


class _KeyFilter(QObject):
    def eventFilter(self, obj, ev):
        t = ev.type()
        if t not in (QEvent.Type.KeyPress, QEvent.Type.ShortcutOverride):
            return False
        try:
            ease = _KEYS.get(ev.key())
            if ease is None or ev.modifiers() & _MODS:
                return False
            press = t == QEvent.Type.KeyPress and not ev.isAutoRepeat()
            if mw.state != "review" or not _cfg().get("zxcv_rating", True):
                if press and mw.state == "review":
                    _diag("ignored ease=%d: zxcv_rating off" % ease)
                return False
            if not _main_is_front() or _typing_into(QApplication.focusWidget()):
                if press:
                    _diag("ignored ease=%d: not front (active=%s focus=%s appstate=%s)" % (
                        ease, type(QApplication.activeWindow()).__name__,
                        type(QApplication.focusWidget()).__name__,
                        QApplication.instance().applicationState()))
                return False
            r = getattr(mw, "reviewer", None)
            if r is None or getattr(r, "state", None) != "answer":
                if press:
                    _diag("ignored ease=%d: reviewer state=%s" % (ease, getattr(r, "state", None)))
                return False                   # question side: like 1–4, nothing
            if t == QEvent.Type.ShortcutOverride:
                ev.accept()                    # claim the key before any QShortcut
                return True
            if not ev.isAutoRepeat():          # holding Z must not rate a run of cards
                _rate(ease)
            return True
        except Exception:
            return False


_filter = None


def _add(state: str, shortcuts: list) -> None:
    if state != "review" or not _cfg().get("zxcv_rating", True):
        return
    # Z/X/C/V win: whatever Anki had on the plain key (V = replay your recorded voice)
    # moves to Alt+<key>, so it's still there
    keys = {"z", "x", "c", "v"}
    for i, (k, fn) in enumerate(list(shortcuts)):
        kl = str(k).lower()
        if kl in keys:
            shortcuts[i] = ("Alt+" + kl.upper(), fn)


def install() -> None:
    global _filter
    if not getattr(mw, "_janki_zxcv", False):
        gui_hooks.state_shortcuts_will_change.append(_add)
        gui_hooks.reviewer_did_show_question.append(_shown)
        _filter = _KeyFilter(mw)
        QApplication.instance().installEventFilter(_filter)
        mw._janki_zxcv = True
