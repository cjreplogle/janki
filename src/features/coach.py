"""In-app guided tour ("coach marks"): the main window dims, the real control being
explained stays lit with a soft outline, and a small glass bubble beside it says what
it does — Back / Next / Skip (←/→/Esc). Steps with a visible effect play it for real
(the card-timer step flashes the actual green flare).

Most controls live inside Anki's web views (toolbar, bottom bar), so each step asks
that page for the element's box via JS and maps it into window coordinates.
"""
import sys

from aqt import mw
from aqt.qt import (QWidget, QPainter, QPainterPath, QColor, QPen, QRectF, QRect,
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
_sample = {"did": None, "cids": []}


def _open_sample():
    """Create a one-card sample deck (Janki-written content) and start reviewing it."""
    try:
        col = mw.col
        if _sample["did"] is None:
            did = col.decks.id(_SAMPLE_DECK)
            model = col.models.by_name("Basic") or col.models.current()
            note = col.new_note(model)
            note.fields[0] = ("<b>Janki sample card</b><br><br>Which shortcut hides "
                              "everything except this card?")
            if len(note.fields) > 1:
                note.fields[1] = ("<b>Tab+F</b> — Focus mode. Tab+\\ turns the card "
                                  "into a caption over other apps.")
            col.add_note(note, did)
            _sample["did"] = did
            _sample["cids"] = list(note.card_ids())
        col.decks.select(_sample["did"])
        mw.moveToState("overview")
        QTimer.singleShot(200, lambda: mw.moveToState("review"))
    except Exception as e:
        log("coach sample: %s" % e)


def _cleanup_sample():
    """Delete the sample deck + card, and any review logged on it (stats untouched)."""
    did, cids = _sample["did"], _sample["cids"]
    if did is None:
        return
    try:
        if cids:
            mw.col.db.execute("delete from revlog where cid in (%s)"
                              % ",".join(str(int(c)) for c in cids))
        mw.col.decks.remove([did])
    except Exception as e:
        log("coach sample cleanup: %s" % e)
    _sample["did"], _sample["cids"] = None, []
    try:
        mw.moveToState("deckBrowser")
    except Exception:
        pass


def _steps():
    key = "⌥⌘A" if _MAC else "Ctrl+Alt+A"
    return [
        dict(target=("toolbar", "Practice"), title="Practice question banks",
             try_=("Open Practice", lambda: _click("toolbar", "Practice")),
             leave=_back_to_decks,
             text="Your question banks live here, where the deck list usually is. Drop "
                  "<b>.qb</b> or <b>.jank</b> files on the window to add banks, or a "
                  "question <b>.docx</b> to build one. While reviewing, <b>Tab+Q</b> pulls "
                  "up questions related to the card."),
        dict(target=("toolbar", "Stats"), title="Stats",
             try_=("Open Stats", lambda: _click("toolbar", "Stats")),
             leave=_back_to_decks,
             text="A cleaner stats view, right inside the window."),
        dict(target=("gear",), title="Janki Settings",
             try_=("Open Settings", _open_settings),
             text="Everything Janki does is adjustable here — look, timers, Pomodoro, "
                  "lectures, and every hotkey (under <b>Hotkeys</b>)."),
        dict(target=("main",), title="Focus & Caption",
             text="While studying: <b>Tab+F</b> hides everything but the card; "
                  "<b>Tab+\\</b> floats the card as a caption over other apps. "
                  "<b>Z / X / C / V</b> rate cards like 1–4, even from another app "
                  "with Tab held."),
        dict(target=("bottom", "Import File"), title="Import File",
             try_=("Try Import File", lambda: _click("bottom", "Import File")),
             text="Brings in Anki decks and Janki files alike — <b>.jank</b> bundles, "
                  "<b>.qb</b> banks, question <b>.docx</b> files, lecture spreadsheets. "
                  "Dragging them onto the window works too."),
        dict(target=("bottom", "Load Lectures"), title="Today's lectures",
             try_=("Open the lecture loader", lambda: _click("bottom", "Load Lectures")),
             text="With a lecture → tag spreadsheet set up, this unsuspends exactly "
                  "today's cards."),
        dict(target=None, title="Try it on a sample card", hands_on=True,
             try_=("Open sample card", _open_sample),
             text="Open a sample card and try things for real (the tour steps aside):"
                  "<br>• <b>Space</b> — show the answer<br>• <b>Z / X / C / V</b> — rate "
                  "it<br>• <b>Tab+F</b> — Focus mode<br>• <b>Tab+\\</b> — Caption mode "
                  "(press again to return)<br>The sample deck is removed when the tour "
                  "ends."),
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
        row.addWidget(self.b_try)
        row.addStretch()
        row.addWidget(self.b_skip)
        row.addWidget(self.b_back)
        row.addWidget(self.b_next)
        lay.addWidget(self.t_title)
        lay.addWidget(self.t_body)
        lay.addLayout(row)
        b.setFixedWidth(340)
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
        self.bubble.adjustSize()
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
        self.hole = rect.adjusted(-8, -6, 8, 6) if rect is not None else None
        self._place_bubble()
        self._apply_mask()
        self.update()
        if st.get("effect") == "flare":
            QTimer.singleShot(350, _demo_flare)

    def _apply_mask(self):
        """The lit hole is a real hole: clicks there reach Anki, so the highlighted
        control can actually be used while the tour stays up. Hands-on steps: only the
        bubble takes input, and keys go to Anki."""
        from aqt.qt import QRegion
        if self.steps[self.i].get("hands_on"):
            self.setMask(QRegion(self.bubble.geometry()))
            QTimer.singleShot(0, lambda: (mw.activateWindow(), mw.setFocus()))
            return
        reg = QRegion(self.rect())
        if self.hole is not None and self.hole.height() < self.height() * 0.5:
            reg = reg.subtracted(QRegion(self.hole.adjusted(2, 2, -2, -2)))
        self.setMask(reg)

    def _place_bubble(self):
        b, W, H = self.bubble, self.width(), self.height()
        bw, bh = b.width(), b.sizeHint().height()
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
        b.move(x, max(12, y))
        b.raise_()

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
        dim = 0 if self.steps[self.i].get("hands_on") else 150
        p.fillPath(path, QColor(0, 0, 0, int(dim * self.opacity)))
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
        if getattr(mw, "state", None) != "deckBrowser":
            mw.moveToState("deckBrowser")
        t = _Tour()
        _tour = t
        t.attach()
        t.show()
        t.raise_()
        t.activateWindow()
        t.setFocus()
        QTimer.singleShot(250, lambda: (t.go(0), t.fade(1.0)))   # after the deck list draws
    except Exception as exc:
        log("coach tour: %s" % exc)
        _tour = None
