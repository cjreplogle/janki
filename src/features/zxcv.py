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


_last_ev = None


def _first(ev) -> bool:
    """The app filter sees one KeyPress per widget it propagates through (web view's
    internal child → view → window), so act only on its first delivery."""
    global _last_ev
    sig = (ev.timestamp(), ev.key())
    if sig == _last_ev:
        return False
    _last_ev = sig
    return True


class _KeyFilter(QObject):
    def eventFilter(self, obj, ev):
        t = ev.type()
        if t not in (QEvent.Type.KeyPress, QEvent.Type.ShortcutOverride):
            return False
        try:
            if (t == QEvent.Type.KeyPress and ev.key() in (Qt.Key.Key_Space, Qt.Key.Key_Return)
                    and not ev.isAutoRepeat() and mw.state == "review"):
                r0 = getattr(mw, "reviewer", None)
                _diag("key %s state=%s obj=%s active=%s" % (
                    "Space" if ev.key() == Qt.Key.Key_Space else "Enter",
                    getattr(r0, "state", None), type(obj).__name__,
                    type(QApplication.activeWindow()).__name__))
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
                if press and _first(ev):
                    _diag("ignored ease=%d: reviewer state=%s" % (ease, getattr(r, "state", None)))
                return False                   # question side: like 1–4, nothing
            if t == QEvent.Type.ShortcutOverride:
                ev.accept()                    # claim the key before any QShortcut
                return True
            if not ev.isAutoRepeat() and _first(ev):
                # (the app filter sees the event once per widget it propagates to)
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
        gui_hooks.state_did_change.append(lambda new, old: new == "review" and _trace_once())
        gui_hooks.reviewer_did_show_question.append(lambda c: _diag("question shown card=%s" % c.id))
        gui_hooks.reviewer_did_show_answer.append(lambda c: _diag("answer shown card=%s" % c.id))
        _filter = _KeyFilter(mw)
        QApplication.instance().installEventFilter(_filter)
        mw._janki_zxcv = True


# --------------------------------------------------------------------------- stall tracing
_traced = False


def _trace_once(*_a) -> None:
    """On first review, time every reviewer hook callback / step and watch the main thread
    for stalls (>100ms), logging slow ones to janki-zxcv.log. Wrapped lazily so every
    add-on's hooks are already registered."""
    global _traced
    if _traced:
        return
    _traced = True
    try:
        from aqt.reviewer import Reviewer
        from aqt.qt import QTimer

        def _wrap_hook(hook, name):
            for i, cb in enumerate(list(getattr(hook, "_hooks", []))):
                def timed(*a, _cb=cb):
                    t0 = _time.monotonic()
                    try:
                        return _cb(*a)
                    finally:
                        ms = (_time.monotonic() - t0) * 1000
                        if ms > 15:
                            _diag("  slow %s %s.%s %dms" % (name, getattr(_cb, "__module__", "?"),
                                  getattr(_cb, "__name__", "?"), ms))
                hook._hooks[i] = timed
        for nm in ("reviewer_did_answer_card", "card_will_show", "reviewer_did_show_question",
                   "reviewer_will_show_context_menu", "reviewer_did_show_answer",
                   "operation_did_execute", "state_did_change", "webview_will_set_content"):
            h = getattr(gui_hooks, nm, None)
            if h is not None:
                _wrap_hook(h, nm)

        for meth in ("nextCard", "_showQuestion", "_showAnswer", "_after_answering", "refresh_if_needed"):
            orig = getattr(Reviewer, meth, None)
            if orig is None:
                continue
            def w(self, *a, _o=orig, _n=meth, **k):
                t0 = _time.monotonic()
                try:
                    return _o(self, *a, **k)
                finally:
                    ms = (_time.monotonic() - t0) * 1000
                    if ms > 15:
                        _diag("  slow Reviewer.%s %dms" % (_n, ms))
            setattr(Reviewer, meth, w)

        import sys, threading, traceback
        beat = [_time.monotonic()]
        main_id = threading.main_thread().ident
        tm = QTimer(mw)
        def tick():
            beat[0] = _time.monotonic()
        tm.timeout.connect(tick)
        tm.start(30)

        def watchdog():
            dumped = 0.0
            while True:
                _time.sleep(0.05)
                lag = _time.monotonic() - beat[0]
                if lag < 0.15 or beat[0] == dumped:
                    continue
                dumped = beat[0]
                try:
                    frames = sys._current_frames()
                    names = {t.ident: t.name for t in threading.enumerate()}
                    out = ["STALL %dms state=%s — main thread:" % (lag * 1000, mw.state)]
                    f = frames.get(main_id)
                    if f is not None:
                        out += ["    " + ln.strip().replace("\n", " | ")
                                for ln in traceback.format_stack(f)[-14:]]
                    for tid, fr in frames.items():
                        if tid in (main_id, threading.get_ident()):
                            continue
                        top = traceback.extract_stack(fr)[-1]
                        out.append("  thread %s: %s:%d %s" % (names.get(tid, tid),
                                   top.filename.split("/")[-1], top.lineno, top.name))
                    _diag("\n".join(out))
                except Exception as e:
                    _diag("watchdog: %s" % e)
        threading.Thread(target=watchdog, name="janki-stall-watchdog", daemon=True).start()
        mw._janki_zxcv_stall = tm
        _diag("trace installed")
    except Exception as e:
        _diag("trace install failed: %s" % e)
