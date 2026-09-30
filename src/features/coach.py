"""In-app guided tour ("coach marks"): the main window dims, the real control being
explained stays lit with a soft outline, and a small glass bubble beside it says what
it does — Back / Next / Skip (←/→/Esc). Steps with a visible effect play it for real
(the card-timer step flashes the actual green flare).

Most controls live inside Anki's web views (toolbar, bottom bar), so each step asks
that page for the element's box via JS and maps it into window coordinates.
"""
import sys

from aqt import mw
from aqt.qt import (QSize, QWidget, QPainter, QPainterPath, QColor, QPen, QRectF, QRect,
                    QPoint, QEvent, QObject, Qt, QTimer, QLabel, QPushButton, QFrame,
                    QVBoxLayout, QHBoxLayout)

from ..util.config import log

_MAC = sys.platform == "darwin"
_tour = None


def _el_js(selector_text):
    """JS returning [x, y, w, h] of the first link/button whose text matches."""
    return ("(function(){var want=%r;var els=document.querySelectorAll("
            "'a,button,.hitem');for(var i=0;i<els.length;i++){var e=els[i];"
            "if((e.textContent||'').trim()===want){var r=e.getBoundingClientRect();"
            "return [r.left,r.top,r.width,r.height];}}return null;})()" % selector_text)


def _click_js(text):
    return ("(function(){var want=%r;var els=document.querySelectorAll('a,button,.hitem');"
            "for(var i=0;i<els.length;i++){if((els[i].textContent||'').trim()===want)"
            "{els[i].click();return true;}}return false;})()" % text)


def _click(where, text):
    try:
        web = mw.toolbar.web if where == "toolbar" else mw.bottomWeb
        web.eval(_click_js(text))
    except Exception as e:
        log("coach click: %s" % e)


def _open_settings():
    try:
        from ..system import settings_dialog
        settings_dialog._open_settings()
    except Exception as e:
        log("coach settings: %s" % e)


def _back_to_decks():
    """Leave the Practice view so later steps point at the normal deck list."""
    try:
        from . import practice
        if getattr(practice, "_practice_view", False):
            practice._practice_view = False
        mw.moveToState("deckBrowser")
        mw.deckBrowser.refresh()
    except Exception:
        pass


# --- Sample card (created for the hands-on step, removed when the tour ends) --------
_SAMPLE_DECK = "Janki Tour (sample)"
_MOCK_DECK = "Janki Tour (practice)"      # own deck, so reviewing it shows the question
_sample = {"did": None, "cids": [], "card": False, "mock": False}


def _open_sample():
    """Create a one-card sample deck (Janki-written content) and start reviewing it."""
    try:
        col = mw.col
        if not _sample.get("card"):
            did = _sample["did"] or col.decks.id(_SAMPLE_DECK)
            model = col.models.by_name("Basic") or col.models.current()
            note = col.new_note(model)
            note.fields[0] = ("<b>Janki sample card</b><br><br>Which shortcut hides "
                              "everything except this card?")
            if len(note.fields) > 1:
                note.fields[1] = ("<b>Tab+F</b> — Focus mode. Tab+\\ turns the card "
                                  "into a caption over other apps.")
            col.add_note(note, did)
            _sample["did"] = did
            _sample["cids"] = list(_sample["cids"]) + list(note.card_ids())
            _sample["card"] = True
        col.decks.select(_sample["did"])
        mw.moveToState("overview")
        QTimer.singleShot(200, lambda: mw.moveToState("review"))
    except Exception as e:
        log("coach sample: %s" % e)


def _open_mock_question():
    """A Janki-written multiple-choice question as a real Janki Practice card (same
    picking, colouring, explanation and Continue as a bank question), in the sample
    deck — removed with it when the tour ends."""
    try:
        from ..integrations import qbank
        col = mw.col
        did = col.decks.id(_MOCK_DECK)
        _sample["mock_did"] = did
        if not _sample.get("mock"):
            # Short, Janki-written question (shows the practice-card layout quickly).
            q = {"stem": "Which organ produces insulin?",
                 "choices": ["Liver", "Pancreas", "Kidney", "Spleen", "Stomach"],
                 "answer": 1,
                 "explanation": "Insulin is made by the beta cells of the pancreatic "
                                "islets (of Langerhans)."}
            model = qbank._ensure_model()
            note = col.new_note(model)
            vals = {"Question": qbank._stem_html(q, ""), "Choices": qbank._choices_html(q),
                    "Answer": qbank._answer_letter(q), "Explanation": q["explanation"],
                    "QID": "jankitour_1"}
            for k, v in vals.items():
                if k in note:
                    note[k] = v
            col.add_note(note, did)
            _sample["cids"] = list(_sample["cids"]) + list(note.card_ids())
            _sample["mock"] = True
        col.decks.select(did)
        mw.moveToState("overview")
        QTimer.singleShot(200, lambda: mw.moveToState("review"))
    except Exception as e:
        log("coach mock question: %s" % e)


def _cleanup_sample(leave=True):
    """Delete the tour decks + their cards, and any review logged on them (stats
    untouched). By NAME too, so leftovers from an interrupted tour go as well."""
    try:
        col = mw.col
        dids = [d for d in (col.decks.id_for_name(n) for n in (_SAMPLE_DECK, _MOCK_DECK)) if d]
        if not dids:
            _sample.update(did=None, mock_did=None, cids=[], card=False, mock=False)
            return
        cids = list(_sample.get("cids") or [])
        for d in dids:
            cids += list(col.decks.cids(d, children=True))
        if cids:
            col.db.execute("delete from revlog where cid in (%s)"
                           % ",".join(str(int(c)) for c in set(cids)))
        col.decks.remove(dids)
    except Exception as e:
        log("coach sample cleanup: %s" % e)
    _sample.update(did=None, mock_did=None, cids=[], card=False, mock=False)
    if not leave:
        return
    try:
        mw.moveToState("deckBrowser")
    except Exception:
        pass


# --- Detecting that the user did the step's action -----------------------------------
_sig = {"import_open": False, "import_done": False, "answered": False}


def _practice_open():
    from . import practice
    return bool(getattr(practice, "_practice_view", False))


def _stats_open():
    from . import stats_embed
    return stats_embed.is_open()


def _settings_open():
    from ..system import settings_dialog
    d = settings_dialog._settings_instance
    return d is not None and d.isVisible()


def _lectures_open():
    from ..integrations import lectures
    d = lectures._lectures_dlg
    return d is not None and d.isVisible()


def _focus_or_caption():
    try:
        from . import focus
        from ..user import hud
        return bool(focus._focus_mode_on or hud._caption_visible())
    except Exception:
        return False


def _leave_review():
    """Leaving the Focus & Caption step: switch both off if left on, back to decks."""
    try:
        from . import focus
        from ..user import hud
        if hud._caption_visible():
            hud._toggle_coherence()
        if focus._focus_mode_on:
            focus._toggle_focus_mode()
    except Exception as e:
        log("coach leave review: %s" % e)
    _back_to_decks()


def _import_used():
    return _sig["import_open"] or _sig["import_done"]


def _sample_answered():
    return _sig["answered"]


def _install_signals():
    """Import File's picker is native (not a Qt window), so wrap Anki's onImport for
    the tour; the answer hook tells us a sample card / mock question was answered."""
    from aqt import gui_hooks
    if not getattr(mw, "_jk_coach_import_wrapped", False):
        orig = mw.onImport

        def _wrapped(*a, **k):
            _sig["import_open"] = True
            try:
                return orig(*a, **k)
            finally:
                _sig["import_open"] = False
                _sig["import_done"] = True
        mw.onImport = _wrapped
        mw._jk_coach_import_orig = orig
        mw._jk_coach_import_wrapped = True
    gui_hooks.reviewer_did_answer_card.append(_on_answer)


def _remove_signals():
    from aqt import gui_hooks
    if getattr(mw, "_jk_coach_import_wrapped", False):
        mw.onImport = mw._jk_coach_import_orig
        mw._jk_coach_import_wrapped = False
    try:
        gui_hooks.reviewer_did_answer_card.remove(_on_answer)
    except Exception:
        pass


def _on_answer(_reviewer, card, _ease):
    if card is not None and card.id in (_sample.get("cids") or []):
        _sig["answered"] = True


def _steps():
    key = "⌥⌘A" if _MAC else "Ctrl+Alt+A"
    return [
        dict(target=("toolbar", "Practice"), title="Practice question banks",
             try_=("Open Practice", lambda: _click("toolbar", "Practice")),
             detect=_practice_open, done_msg="That's your Practice view.",
             leave=_back_to_decks,
             text="Your question banks live here, where the deck list usually is. Drop "
                  "<b>.qb</b> or <b>.jank</b> files on the window to add banks, or a "
                  "question <b>.docx</b> to build one. While reviewing, <b>Tab+Q</b> pulls "
                  "up questions related to the card."),
        dict(target=None, title="Try a practice question", hands_on=True,
             try_=("Open a mock question", _open_mock_question),
             detect=_sample_answered, done_msg="That's how every bank question works.",
             leave=_back_to_decks,
             text="Here's how a bank question works: click an answer, see it turn "
                  "green or red with the explanation, then Continue. Getting it right retires the question "
                  "and counts toward the bank's Completion."),
        dict(target=("toolbar", "Stats"), title="Stats",
             try_=("Open Stats", lambda: _click("toolbar", "Stats")),
             detect=_stats_open, done_msg="Your stats, right in the window.",
             leave=_back_to_decks,
             text="A cleaner stats view, right inside the window."),
        dict(target=("gear",), title="Janki Settings",
             try_=("Open Settings", _open_settings),
             detect=_settings_open, wait=_settings_open,
             done_msg="Close Settings when you're done — the tour continues.",
             text="Everything Janki does is adjustable here — look, timers, Pomodoro, "
                  "lectures, and every hotkey (under <b>Hotkeys</b>)."),
        dict(target=None, title="Focus & Caption", hands_on=True, enter=_open_sample,
             leave=_leave_review,
             try_=("Reopen the sample card", _open_sample),
             detect=_focus_or_caption, done_msg="That's it — press it again to switch back.",
             text="A sample card is open. Try:<br>• <b>Tab+F</b> — Focus mode hides "
                  "everything but the card<br>• <b>Tab+\\</b> — Caption mode floats "
                  "the card over other apps (move it with Tab+arrows)<br>Press the same "
                  "keys again to switch back."),
        dict(target=("bottom", "Import File"), title="Import File",
             try_=("Try Import File", lambda: _click("bottom", "Import File")),
             detect=_import_used, wait=lambda: _sig["import_open"],
             done_msg="Pick a file or cancel — the tour continues.",
             text="Brings in Anki decks and Janki files alike — <b>.jank</b> bundles, "
                  "<b>.qb</b> banks, question <b>.docx</b> files, lecture spreadsheets. "
                  "Dragging them onto the window works too."),
        dict(target=("bottom", "Load Lectures"), title="Today's lectures",
             try_=("Open the lecture loader", lambda: _click("bottom", "Load Lectures")),
             detect=_lectures_open, wait=_lectures_open,
             done_msg="Close the loader when you're done — the tour continues.",
             text="With a lecture → tag spreadsheet set up, this unsuspends exactly "
                  "today's cards."),
        dict(target=None, title="Reviewing", hands_on=True, enter=_open_sample,
             try_=("Reopen the sample card", _open_sample),
             detect=_sample_answered, done_msg="Nice — you rated it.",
             text="On the sample card:<br>• <b>Space</b> — show the answer<br>"
                  "• <b>Z / X / C / V</b> — rate it (like 1–4), even from another app "
                  "with Tab held<br>The sample deck is removed when the tour ends."),
        dict(target=None, title="Card timer & flares", effect="flare",
             try_=("Show again", lambda: _demo_flare()),
             text="While you review, a small ring fills; linger too long and the window "
                  "edge glows red. A green flash like this one celebrates a card you've "
                  "finished for the day."),
        dict(target=None, title="You're all set",
             text="Show or hide Anki from anywhere with <b>%s</b>. Full guides at "
                  "<a href='https://cjre.pl/ogle/janki' style='color:#9cbcf3'>"
                  "cjre.pl/ogle/janki</a>." % key),
    ]


class _Tour(QWidget):
    def __init__(self):
        # Its own transparent window over Anki's, not a child widget: on macOS the web
        # views are native layers that always draw above sibling Qt widgets, so a child
        # overlay ended up behind the deck list. Kept attached to the main window.
        super().__init__(None, Qt.WindowType.FramelessWindowHint | Qt.WindowType.Tool)
        self.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground, True)
        self.setAttribute(Qt.WidgetAttribute.WA_NoSystemBackground, True)
        self.setFocusPolicy(Qt.FocusPolicy.StrongFocus)
        self.steps = _steps()
        self.i = 0
        self.hole = None                     # QRect in our coords, or None
        self.opacity = 0.0
        self._build_bubble()
        try:                                    # Janki's UI font (Lora by default)
            from ..user import css as _css
            _css.apply_widget_ui_font(self)
        except Exception:
            pass
        self._cover()
        mw.installEventFilter(self)
        self._det = {"done": False, "t": None}
        self._poll = QTimer(self)
        self._poll.setInterval(250)
        self._poll.timeout.connect(self._check)
        self._poll.start()

    def _check(self):
        """Did the user do this step's thing? Show a ✓; move on — right away for
        in-window features, after the window it opened is closed for dialogs."""
        if not (0 <= self.i < len(self.steps)):
            return
        st = self.steps[self.i]
        det = st.get("detect")
        if not det:
            return
        try:
            if not self._det["done"]:
                now = det()
                if self._det.get("base"):
                    if not now:
                        self._det["base"] = False    # reset; next "on" counts
                    return
                if now:
                    self._det["done"] = True
                    self.t_title.setText("✓  " + st["title"])
                    self.t_body.setText(st["text"] + "<br><br><span style='color:#8fd18f'>"
                                        + st.get("done_msg", "Nice!") + "</span>")
                    self._place_bubble(animate=True)
                    self._apply_mask()
                    if not st.get("wait"):
                        QTimer.singleShot(1400, lambda n=self.i: self.i == n and self.go(n + 1))
                return
            wait = st.get("wait")
            if wait and not self._det.get("closed") and not wait():
                self._det["closed"] = True           # closed → advance once
                QTimer.singleShot(400, lambda n=self.i: self.i == n and self.go(n + 1))
        except Exception as e:
            log("coach detect: %s" % e)

    def _cover(self):
        """Sit exactly over the main window (screen coords)."""
        tl = mw.mapToGlobal(QPoint(0, 0))
        self.setGeometry(tl.x(), tl.y(), mw.width(), mw.height())

    def attach(self):
        try:
            if sys.platform == "darwin":
                from ..user import glass
                glass.keep_dialog_in_front(self)      # child window of the main window
            elif sys.platform.startswith("win"):
                from ..platform.win import shell
                shell.set_owner(int(self.winId()), int(mw.winId()))
        except Exception as e:
            log("coach attach: %s" % e)

    # --- bubble -------------------------------------------------------------
    def _build_bubble(self):
        b = QFrame(self)
        b.setObjectName("jkCoach")
        b.setStyleSheet(
            "#jkCoach{background:rgba(28,31,40,0.96);border:1px solid rgba(255,255,255,0.14);"
            "border-radius:12px;} QLabel{color:#ececec;background:transparent;}"
            "QPushButton{background:rgba(255,255,255,0.08);color:#ececec;border:none;"
            "border-radius:7px;padding:5px 12px;}"
            "QPushButton:hover{background:rgba(255,255,255,0.16);}"
            "QPushButton#jkNext{background:#9cbcf3;color:#10213f;font-weight:600;}"
            "QPushButton#jkTry{background:rgba(156,188,243,0.18);color:#cfe0ff;}")
        lay = QVBoxLayout(b)
        lay.setContentsMargins(16, 14, 16, 12)
        lay.setSpacing(8)
        self.t_title = QLabel()
        f = self.t_title.font()
        f.setBold(True)
        f.setPointSize(f.pointSize() + 2)
        self.t_title.setFont(f)
        self.t_body = QLabel()
        self.t_body.setWordWrap(True)
        self.t_body.setTextFormat(Qt.TextFormat.RichText)
        self.t_body.setOpenExternalLinks(True)
        row = QHBoxLayout()
        self.t_step = QLabel()
        self.t_step.setStyleSheet("color:#9aa0aa;")
        self.b_try = QPushButton("Try it")
        self.b_try.setObjectName("jkTry")
        self.b_skip = QPushButton("Skip")
        self.b_back = QPushButton("Back")
        self.b_next = QPushButton("Next")
        self.b_next.setObjectName("jkNext")
        for w in (self.b_try, self.b_skip, self.b_back, self.b_next):
            w.setCursor(Qt.CursorShape.PointingHandCursor)
        row.addWidget(self.t_step)
        row.addStretch()
        row.addWidget(self.b_skip)
        row.addWidget(self.b_back)
        row.addWidget(self.b_next)
        lay.addWidget(self.t_title)
        lay.addWidget(self.t_body)
        try_row = QHBoxLayout()                # own row, so long labels never clip
        try_row.addWidget(self.b_try)
        try_row.addStretch()
        lay.addLayout(try_row)
        lay.addLayout(row)
        b.setFixedWidth(340)
        b.hide()                               # shown once it's placed (no jump)
        self.bubble = b
        self.b_skip.clicked.connect(self.finish)
        self.b_try.clicked.connect(self._try)
        self.b_back.clicked.connect(lambda: self.go(self.i - 1))
        self.b_next.clicked.connect(lambda: self.go(self.i + 1))

    # --- steps --------------------------------------------------------------
    def _try(self):
        t = self.steps[self.i].get("try_")
        if t:
            t[1]()

    def go(self, i):
        prev = self.steps[self.i] if 0 <= self.i < len(self.steps) else None
        if prev is not None and i != self.i and prev.get("leave"):
            prev["leave"]()
            QTimer.singleShot(300, lambda n=i: self._go(n))   # after the redraw
            return
        self._go(i)

    def _go(self, i):
        if i >= len(self.steps):
            return self.finish()
        self.i = max(0, i)
        st = self.steps[self.i]
        _sig.update(import_done=False, answered=False)
        base = False
        try:
            base = bool(st.get("detect") and st["detect"]())
        except Exception:
            pass
        # Already true when the step starts (e.g. Practice view left open) → wait for
        # the user to do it, not count the leftover state.
        self._det = {"done": False, "base": base, "closed": False}
        if st.get("enter"):
            try:
                st["enter"]()                      # e.g. open the sample card
            except Exception as e:
                log("coach enter: %s" % e)
        if self.bubble.isVisible():
            # Old words fade out, box slides + resizes, new words fade in with it.
            self._fade_text(0.0, 90, lambda: self._fill(st))
        else:
            self._fill(st)

    def _text_widgets(self):
        return (self.t_title, self.t_body, self.t_step, self.b_try)

    def _fade_text(self, to, ms, done=None):
        from aqt.qt import QGraphicsOpacityEffect, QVariantAnimation, QEasingCurve
        effs = []
        for w in self._text_widgets():
            e = w.graphicsEffect()
            if not isinstance(e, QGraphicsOpacityEffect):
                e = QGraphicsOpacityEffect(w)
                e.setOpacity(1.0)
                w.setGraphicsEffect(e)
            effs.append(e)
        old = getattr(self, "_text_anim", None)
        if old is not None:
            old.stop()
            old.deleteLater()            # don't pile up finished animations
        start = effs[0].opacity()
        an = QVariantAnimation(self)
        an.setDuration(ms)
        an.setStartValue(float(start))
        an.setEndValue(float(to))
        an.setEasingCurve(QEasingCurve.Type.OutCubic if to else QEasingCurve.Type.InCubic)
        an.valueChanged.connect(lambda v: [e.setOpacity(v) for e in effs])
        if done:
            an.finished.connect(done)
        self._text_anim = an
        an.start()

    def _fill(self, st):
        if self.steps[self.i] is not st:
            return                                # user already moved on
        t = st.get("try_")
        self.b_try.setVisible(bool(t))
        if t:
            self.b_try.setText(t[0])
        self.t_title.setText(st["title"])
        self.t_body.setText(st["text"] + (
            "<br><br><span style='color:#9aa0aa'>Click the highlighted button to try "
            "it — the tour waits.</span>" if st.get("target") and st.get("try_") else ""))
        self.t_step.setText("%d of %d" % (self.i + 1, len(self.steps)))
        self.b_back.setEnabled(self.i > 0)
        self.b_next.setText("Done" if self.i == len(self.steps) - 1 else "Next")
        self._locate(st, lambda rect: self._show_step(st, rect))

    def _locate(self, st, done):
        tgt = st.get("target")
        if not tgt:
            return done(None)
        kind = tgt[0]
        try:
            if kind == "gear":
                from . import settings_button
                btn = settings_button._btn
                if btn is not None and btn.isVisible():
                    tl = btn.mapTo(mw, QPoint(0, 0))
                    return done(QRect(tl, btn.size()))
                return done(None)
            if kind == "main":
                w = mw.web
                return done(QRect(w.mapTo(mw, QPoint(0, 0)), w.size()))
            web = mw.toolbar.web if kind == "toolbar" else mw.bottomWeb
        except Exception:
            return done(None)

        def _cb(r):
            try:
                if not r:
                    return done(None)
                z = web.zoomFactor() if hasattr(web, "zoomFactor") else 1.0
                tl = web.mapTo(mw, QPoint(int(r[0] * z), int(r[1] * z)))
                done(QRect(tl.x(), tl.y(), int(r[2] * z), int(r[3] * z)))
            except Exception:
                done(None)
        try:
            web.evalWithCallback(_el_js(tgt[1]), _cb)
        except Exception:
            done(None)

    def _show_step(self, st, rect):
        new = rect.adjusted(-8, -6, 8, 6) if rect is not None else None
        old = self.hole
        first = not self.isVisible() or not self.bubble.isVisible()
        self.hole = new
        self._place_bubble(animate=not first)
        self.bubble.show()
        if not first and old is not None and new is not None:
            self._morph_hole(old, new)           # spotlight glides to the next control
        else:
            self._apply_mask()
            self.update()
        if not self.isVisible():
            # First step is measured, placed and masked while hidden — now appear
            # in one fade (showing earlier made the bubble jump and the dim flicker).
            self.opacity = 0.0
            self.show()
            self.raise_()
            self.activateWindow()
            self.setFocus()
            self.fade(1.0)
        if st.get("effect") == "flare":
            QTimer.singleShot(350, _demo_flare)

    def _apply_mask(self):
        """The lit hole is a real hole: clicks there reach Anki, so the highlighted
        control can actually be used while the tour stays up. Hands-on steps: only the
        bubble takes input, and keys go to Anki."""
        from aqt.qt import QRegion
        if self.steps[self.i].get("hands_on"):
            reg = QRegion(self.bubble.geometry())
            an = getattr(self, "_bubble_anim", None)
            if an is not None and an.state() == an.State.Running:
                end = an.endValue()                 # cover start + destination while
                if isinstance(end, QPoint):          # sliding
                    end = QRect(end, self.bubble.size())
                reg = reg.united(QRegion(end))
            self.setMask(reg)
            QTimer.singleShot(0, lambda: (mw.activateWindow(), mw.setFocus()))
            return
        reg = QRegion(self.rect())
        if self.hole is not None and self.hole.height() < self.height() * 0.5:
            reg = reg.subtracted(QRegion(self.hole.adjusted(2, 2, -2, -2)))
        self.setMask(reg)

    _DUR = 240     # step transitions: quick, eased — smooth without feeling slow

    def _dim_now(self):
        """Dim level eased toward the step's target (150 normal, 0 hands-on), so
        switching between hands-on and normal steps fades instead of snapping."""
        import time
        target = 0.0 if self.steps[self.i].get("hands_on") else 150.0
        now = time.monotonic()
        cur = getattr(self, "_dim_cur", target)
        dt = now - getattr(self, "_dim_t", now)
        self._dim_t = now
        step = 150.0 * dt / (self._DUR / 1000.0)
        cur = min(target, cur + step) if target > cur else max(target, cur - step)
        self._dim_cur = cur
        if cur != target and not getattr(self, "_dim_tick", False):
            self._dim_tick = True
            def _t():
                self._dim_tick = False
                self.update()
            QTimer.singleShot(16, _t)
        return cur

    def _morph_hole(self, a, b):
        from aqt.qt import QVariantAnimation, QEasingCurve
        old = getattr(self, "_hole_anim", None)
        if old is not None:
            old.stop()
            old.deleteLater()            # don't pile up finished animations
        an = QVariantAnimation(self)
        an.setDuration(self._DUR)
        an.setStartValue(0.0)
        an.setEndValue(1.0)
        an.setEasingCurve(QEasingCurve.Type.OutCubic)

        def _v(t):
            lerp = lambda x, y: int(round(x + (y - x) * t))
            self.hole = QRect(lerp(a.x(), b.x()), lerp(a.y(), b.y()),
                              lerp(a.width(), b.width()), lerp(a.height(), b.height()))
            self.update()
        an.valueChanged.connect(_v)

        def _end():
            self.hole = b
            self._apply_mask()                   # click-through hole once it's arrived
            self.update()
        an.finished.connect(_end)
        self._hole_anim = an
        an.start()

    def _place_bubble(self, animate=False):
        b, W, H = self.bubble, self.width(), self.height()
        bw = b.width()
        cur = b.geometry()
        b.adjustSize()                 # measure the new text's height (no paint between)
        bh = b.height()
        b.setGeometry(cur)             # …then animate from where it was
        if self.steps[self.i].get("hands_on"):
            x, y = W - bw - 16, H - bh - 70          # out of the card's way
        elif self.hole is None:
            x, y = (W - bw) // 2, (H - bh) // 2
        else:
            h = self.hole
            x = min(max(12, h.center().x() - bw // 2), W - bw - 12)
            y = h.bottom() + 14 if h.bottom() + 14 + bh < H - 12 else h.top() - bh - 14
            if h.height() > H * 0.5:           # big target (deck list): inside it
                y = h.top() + 24
        target = QPoint(x, max(12, y))
        b.raise_()
        goal = QRect(target, QSize(bw, bh))
        if animate and b.isVisible() and b.geometry() != goal:
            from aqt.qt import QPropertyAnimation, QEasingCurve
            old = getattr(self, "_bubble_anim", None)
            if old is not None:
                old.stop()
                old.deleteLater()            # don't pile up finished animations
            an = QPropertyAnimation(b, b"geometry", self)
            an.setDuration(self._DUR)
            an.setStartValue(b.geometry())
            an.setEndValue(goal)
            an.setEasingCurve(QEasingCurve.Type.OutCubic)
            an.finished.connect(lambda: self._apply_mask())   # mask follows the bubble
            self._bubble_anim = an
            an.start()
            self._apply_mask()                     # travel-covering mask for the slide
        else:
            b.setGeometry(goal)
        if b.graphicsEffect() is not None or self.t_title.graphicsEffect() is not None:
            self._fade_text(1.0, self._DUR)        # new words arrive with the box

    # --- look ---------------------------------------------------------------
    def paintEvent(self, _ev):
        p = QPainter(self)
        p.setRenderHint(QPainter.RenderHint.Antialiasing)
        path = QPainterPath()
        path.addRect(QRectF(self.rect()))
        if self.hole is not None:
            cut = QPainterPath()
            cut.addRoundedRect(QRectF(self.hole), 10, 10)
            path = path.subtracted(cut)
        p.fillPath(path, QColor(0, 0, 0, int(self._dim_now() * self.opacity)))
        if self.hole is not None:
            p.setPen(QPen(QColor(156, 188, 243, int(200 * self.opacity)), 2))
            p.drawRoundedRect(QRectF(self.hole), 10, 10)
        p.end()

    def fade(self, to, then=None):
        from aqt.qt import QVariantAnimation, QEasingCurve
        a = QVariantAnimation(self)
        a.setDuration(220)
        a.setStartValue(float(self.opacity))
        a.setEndValue(float(to))
        a.setEasingCurve(QEasingCurve.Type.OutCubic)

        def _v(v):
            self.opacity = v
            self.bubble.setWindowOpacity(v)
            self.update()
        a.valueChanged.connect(_v)
        if then:
            a.finished.connect(then)
        self._anim = a
        a.start()

    # --- lifecycle ------------------------------------------------------------
    def eventFilter(self, obj, ev):
        if obj is mw and ev.type() == QEvent.Type.Resize:
            self._cover()
            QTimer.singleShot(0, lambda: self.go(self.i))   # re-measure targets
        elif obj is mw and ev.type() == QEvent.Type.Move:
            self._cover()
        return False

    def keyPressEvent(self, ev):
        k = ev.key()
        if k == Qt.Key.Key_Escape:
            self.finish()
        elif k in (Qt.Key.Key_Right, Qt.Key.Key_Return, Qt.Key.Key_Enter, Qt.Key.Key_Space):
            self.go(self.i + 1)
        elif k == Qt.Key.Key_Left:
            self.go(self.i - 1)

    def mousePressEvent(self, ev):
        ev.accept()                             # clicks on the dimmed area do nothing

    def finish(self):
        global _tour
        mw.removeEventFilter(self)
        try:
            self._poll.stop()
        except Exception:
            pass
        _remove_signals()
        _cleanup_sample()

        def _gone():
            global _tour
            self.hide()
            self.deleteLater()
            _tour = None
        self.fade(0.0, _gone)


def _demo_flare():
    try:
        from . import card_timer
        mgr = card_timer._card_timer_instance
        if mgr is not None:
            mgr.card_done_flash()
    except Exception as e:
        log("coach flare: %s" % e)


def start() -> None:
    """Run the in-app tour on the deck list."""
    global _tour
    if _tour is not None:
        return
    try:
        moved = getattr(mw, "state", None) != "deckBrowser"
        if moved:
            mw.moveToState("deckBrowser")
        _cleanup_sample()                      # leftovers from an interrupted tour
        t = _Tour()
        _tour = t
        _install_signals()
        t.attach()
        # Build the first step while hidden; _show_step reveals it with one fade.
        QTimer.singleShot(300 if moved else 0, lambda: t.go(0))
    except Exception as exc:
        log("coach tour: %s" % exc)
        _tour = None


# The tour decks only exist while the tour runs; each tour builds them fresh (new,
# unreviewed cards). If Anki quit mid-tour, sweep leftovers on profile open/close so
# they never show up in the collection.
def _purge_leftovers(*_a):
    if _tour is None:
        try:
            if mw.col is not None:
                _cleanup_sample(leave=False)
        except Exception as e:
            log("coach purge: %s" % e)


try:
    from aqt import gui_hooks as _gh
    _gh.profile_did_open.append(_purge_leftovers)
    _gh.profile_will_close.append(_purge_leftovers)
except Exception:
    pass
