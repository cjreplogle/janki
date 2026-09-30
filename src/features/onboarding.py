"""First-launch "Welcome to Janki" setup: one guided window, shown once the glass has
loaded, that walks through the things that would otherwise pop up on their own —
background hotkeys (macOS Accessibility), the optional controller (Input Monitoring),
and the optional lecture map — each with the reason, a button, and a live status.
Every step can be skipped; Janki marks the install onboarded when the window closes.
"""
import sys

from aqt import mw
from aqt.qt import (QDialog, QVBoxLayout, QHBoxLayout, QLabel, QPushButton, QWidget,
                    QStackedWidget, QTimer, Qt, QCheckBox, QFileDialog)

from ..util.config import _cfg, log

_MAC = sys.platform == "darwin"
_dlg = None


def _mark_done():
    try:
        c = _cfg()
        c["onboarded"] = True
        mw.addonManager.writeConfig(__name__, c)
    except Exception:
        pass


def _title(text):
    t = QLabel(text)
    f = t.font()
    f.setPointSize(f.pointSize() + 5)
    f.setBold(True)
    t.setFont(f)
    t.setWordWrap(True)
    return t


def _body(text):
    b = QLabel(text)
    b.setWordWrap(True)
    b.setTextFormat(Qt.TextFormat.RichText)
    b.setOpenExternalLinks(True)
    return b


def _status():
    s = QLabel("")
    s.setStyleSheet("color:#8fd18f;font-weight:600;")
    return s


def _page(*widgets):
    w = QWidget()
    lay = QVBoxLayout(w)
    lay.setContentsMargins(4, 4, 4, 4)
    lay.setSpacing(12)
    for x in widgets:
        if isinstance(x, QHBoxLayout):
            lay.addLayout(x)
        else:
            lay.addWidget(x)
    lay.addStretch()
    return w


def _welcome_page():
    return _page(
        _title("Welcome to Janki"),
        _body("Janki gives Anki its frosted-glass look and adds study tools — focus "
              "mode, card timers, practice questions, lecture loading and more.<br><br>"
              "This quick setup takes about a minute. You can skip anything and change "
              "it later in Janki Settings (the gear on the main screen)."))


def _hotkeys_page():
    status = _status()
    if not _MAC:
        status.setText("✓ Ready — nothing to allow on Windows.")
        return _page(
            _title("Hotkeys that work in the background"),
            _body("Hold <b>Tab</b> and press <b>Z / X / C / V</b> to rate cards, "
                  "<b>Tab+\\</b> for the caption, <b>Ctrl+Alt+A</b> to show or hide Anki "
                  "— even while you're in another app."),
            status), None
    from ..util import keytap
    btn = QPushButton("Allow background hotkeys…")

    def _refresh():
        if keytap.ax_trusted():
            status.setText("✓ Allowed — the hotkeys are on.")
            btn.setEnabled(False)
    t = QTimer(mw)
    t.setInterval(1000)
    t.timeout.connect(_refresh)

    def _allow():
        keytap._start_key_tap._explained = True     # this page is the explanation
        keytap._start_key_tap()                      # macOS prompt + starts when granted
        status.setText("Waiting for you to allow Anki in System Settings…")
        status.setStyleSheet("color:#c9c9c9;")
        t.start()
    btn.clicked.connect(_allow)
    row = QHBoxLayout()
    row.addWidget(btn)
    row.addStretch()
    _refresh()
    page = _page(
        _title("Hotkeys that work in the background"),
        _body("Hold <b>Tab</b> and press <b>Z / X / C / V</b> to rate cards, "
              "<b>Tab+\\</b> for the caption, <b>⌥⌘A</b> to show or hide Anki — even while "
              "you're in another app. Lockdown's hold-Space exit uses this too.<br><br>"
              "macOS needs you to give Anki <b>Accessibility</b> access for that. Janki only "
              "reacts to its own shortcut keys — nothing you type is recorded, stored or "
              "sent anywhere. After you allow it, the hotkeys turn on by themselves."),
        row, status)
    return page, t


def _controller_page():
    cb = QCheckBox("Use a game controller to rate cards")
    cb.setChecked(bool(_cfg().get("hid_controller", False)))
    status = _status()

    def _on(_s):
        c = _cfg()
        c["hid_controller"] = cb.isChecked()
        mw.addonManager.writeConfig(__name__, c)
        if cb.isChecked():
            try:
                from ..integrations import gamepad
                gamepad._start_hid_monitor()
                status.setText("✓ On" + (" — allow Anki under Input Monitoring if macOS "
                                         "asks." if _MAC else ""))
            except Exception as e:
                log("onboarding controller: %s" % e)
        else:
            status.setText("")
    cb.stateChanged.connect(_on)
    why = ("macOS will ask for <b>Input Monitoring</b> access. Janki uses it only to read "
           "your controller's buttons — not your keyboard or mouse — and nothing is "
           "recorded or sent." if _MAC else "No permission needed on Windows.")
    return _page(
        _title("Controller (optional)"),
        _body("Rate cards with a game controller, even when Anki isn't the front window "
              "— handy in Caption mode over a video.<br><br>" + why),
        cb, status)


def _lectures_page():
    status = _status()
    btn = QPushButton("Choose lecture map…")

    def _pick():
        fn, _f = QFileDialog.getOpenFileName(
            _dlg, "Choose your lecture → tag map", "",
            "Tag maps (*.xlsx *.xlsm *.txt *.json);;All files (*)")
        if not fn:
            return
        try:
            from ..integrations import lectures
            if lectures.use_tag_map_file(fn, open_after=False):
                status.setText("✓ Lecture map set — use “Load Lectures” on the main screen.")
            else:
                status.setText("Couldn't read lectures from that file.")
        except Exception as e:
            status.setText("Couldn't use that file.")
            log("onboarding lectures: %s" % e)
    btn.clicked.connect(_pick)
    row = QHBoxLayout()
    row.addWidget(btn)
    row.addStretch()
    return _page(
        _title("Today's lectures (optional)"),
        _body("If your course has a spreadsheet matching lectures to Anki tags, Janki can "
              "unsuspend each day's cards for you. Choose it now, drop it on the main "
              "window later, or skip this."),
        row, status)


def _done_page():
    key = "⌥⌘A" if _MAC else "Ctrl+Alt+A"
    tour = QPushButton("Take the tour (optional)…")
    tour.clicked.connect(lambda: QTimer.singleShot(0, show_tour))
    row = QHBoxLayout()
    row.addWidget(tour)
    row.addStretch()
    return _page(
        _title("You're set"),
        _body("A few things to try:<br>"
              "• <b>Tab+F</b> — Focus mode (hides everything but the card)<br>"
              "• <b>Tab+\\</b> — Caption mode, to study over other apps<br>"
              "• <b>Z / X / C / V</b> — rate cards, like 1–4<br>"
              "• <b>%s</b> — show or hide Anki from anywhere<br><br>"
              "Everything is adjustable in <b>Janki Settings</b> — the gear on the main "
              "screen. The tour shows where each feature lives." % key), row)


def _appear(d) -> None:
    """Fade in + drop into place (starts transparent so there's no flash)."""
    from ..user import glass
    d.setWindowOpacity(0.0)
    try:
        glass.bring_dialog_to_front(d)
    except Exception:
        d.show()
    try:
        glass._fade_window(d, 0.0, 1.0, 260, drop=12)
    except Exception:
        d.setWindowOpacity(1.0)


def show() -> None:
    """Open the setup window (once; marks the install onboarded when it closes)."""
    global _dlg
    if _dlg is not None:
        return
    try:
        from ..user import glass
        d = QDialog(mw)
        d.setWindowTitle("Welcome to Janki")
        try:
            glass.glass_dialog(d)
        except Exception:
            pass
        d.resize(560, 420)
        outer = QVBoxLayout(d)
        if getattr(d, "_jk_expanded", False):
            m = outer.contentsMargins()
            outer.setContentsMargins(m.left() + 6, 34, m.right() + 6, m.bottom())
        stack = QStackedWidget()
        hk_page, hk_timer = _hotkeys_page()
        pages = [_welcome_page(), hk_page, _controller_page(), _lectures_page(), _done_page()]
        for p in pages:
            stack.addWidget(p)
        outer.addWidget(stack, 1)
        nav = QHBoxLayout()
        step = QLabel("")
        step.setStyleSheet("color:#9aa0aa;")
        back = QPushButton("Back")
        nxt = QPushButton("Next")
        nxt.setDefault(True)
        nav.addWidget(step)
        nav.addStretch()
        nav.addWidget(back)
        nav.addWidget(nxt)
        outer.addLayout(nav)

        def _sync():
            i = stack.currentIndex()
            step.setText("Step %d of %d" % (i + 1, len(pages)))
            back.setEnabled(i > 0)
            nxt.setText("Done" if i == len(pages) - 1 else ("Get started" if i == 0 else "Next"))

        def _next():
            i = stack.currentIndex()
            if i >= len(pages) - 1:
                d.accept()
            else:
                stack.setCurrentIndex(i + 1)
                _sync()

        def _back():
            stack.setCurrentIndex(max(0, stack.currentIndex() - 1))
            _sync()
        nxt.clicked.connect(_next)
        back.clicked.connect(_back)

        def _closed(*_a):
            global _dlg
            if hk_timer is not None:
                hk_timer.stop()
            try:                                   # skipped the hotkeys step → don't
                from ..util import keytap          # re-ask on its own later
                if _MAC and not keytap.ax_trusted():
                    c = _cfg()
                    c["ax_prompt_declined"] = True
                    mw.addonManager.writeConfig(__name__, c)
            except Exception:
                pass
            _mark_done()
            _dlg = None
        d.finished.connect(_closed)
        _sync()
        _dlg = d
        _appear(d)
    except Exception as exc:
        log("onboarding: %s" % exc)
        _mark_done()


# --- Optional feature tour (from the setup's last page, or Settings → General) -------
def _tour_pages():
    mod = "⌘" if _MAC else "Ctrl"
    ocr = ("<br>• Or drop lecture <b>.pptx</b> slides with questions — Janki reads them "
           "on-device and builds the bank for you." if _MAC else "")
    return [
        ("Practice question banks",
         "Click <b>Practice</b> in the top bar to see your question banks where the deck "
         "list usually is.<br><br>"
         "• Get banks as <b>.qb</b> files (or inside a <b>.jank</b> bundle) — drop them on "
         "the window or use <b>Import File</b>.<br>"
         "• Drop a question <b>.docx</b> anywhere to build a bank from it." + ocr + "<br>"
         "• While reviewing, <b>Tab+Q</b> pulls up practice questions related to the card "
         "you're on.<br>"
         "• Right answers retire the question; <b>Completion</b> shows how much of a bank "
         "you've cleared."),
        ("Focus mode & Caption mode",
         "• <b>Tab+F</b> — Focus mode: hides the toolbar and buttons so only the card "
         "remains, and hides the cursor when idle.<br>"
         "• <b>Tab+\\</b> — Caption mode: the card floats as a small caption over other "
         "apps (videos, lectures). Move it with <b>Tab+arrows</b>, resize text with "
         "<b>Shift+Tab+= / −</b>.<br>"
         "• Rate with <b>Tab+Z / X / C / V</b> even while another app is in front."),
        ("Card timer & flares",
         "A small ring fills while you're on a card. If you linger too long, the window "
         "edge glows red; a green flash celebrates a card you've finished for the day.<br>"
         "Tune the timing, style and flares in Settings → Focus → Timer / Flare."),
        ("Pomodoro",
         "Work in timed intervals: after a stretch of reviewing, a calm blue tint says a "
         "break is due, then a break screen appears. Hold <b>Space</b> to skip a break.<br>"
         "Set the lengths in Settings → Focus → Pomodoro."),
        ("Today's lectures",
         "If your course has a spreadsheet matching lectures to Anki tags, <b>Load "
         "Lectures</b> (main screen) unsuspends exactly today's cards. Drop the "
         "spreadsheet on the window to set it up; add your calendar for automatic "
         "days. Details in Settings → Lectures."),
        ("Card rephrasing",
         "See the same card worded differently so you learn the idea, not the "
         "sentence. Press <b>Tab+R</b> while reviewing to switch versions. Import "
         "rephrasings (<b>.rp</b>) in Settings → Rephrase."),
        ("Stats, lockdown & more",
         "• <b>Stats</b> opens a cleaner stats view inside the window; the calendar / "
         "trend under the deck list is one click on its icon.<br>"
         "• <b>Lockdown</b> (%s+%s+L) keeps you in Anki until you hold Space to exit.<br>"
         "• <b>Z / X / C / V</b> rate cards like 1–4." % (mod, "Alt" if not _MAC else "⌃")),
        ("Settings & hotkeys",
         "Everything lives in <b>Janki Settings</b> — the gear on the main screen. Every "
         "shortcut can be changed under <b>Hotkeys</b>. Full guides: "
         "<a href='https://cjre.pl/ogle/janki'>cjre.pl/ogle/janki</a>."),
    ]


_tour = None


def show_tour() -> None:
    global _tour
    if _tour is not None:
        return
    try:
        from ..user import glass
        d = QDialog(mw)
        d.setWindowTitle("Janki tour")
        try:
            glass.glass_dialog(d)
        except Exception:
            pass
        d.resize(560, 400)
        outer = QVBoxLayout(d)
        if getattr(d, "_jk_expanded", False):
            m = outer.contentsMargins()
            outer.setContentsMargins(m.left() + 6, 34, m.right() + 6, m.bottom())
        stack = QStackedWidget()
        pages = _tour_pages()
        for t, b in pages:
            stack.addWidget(_page(_title(t), _body(b)))
        outer.addWidget(stack, 1)
        nav = QHBoxLayout()
        step = QLabel("")
        step.setStyleSheet("color:#9aa0aa;")
        back, nxt = QPushButton("Back"), QPushButton("Next")
        nxt.setDefault(True)
        nav.addWidget(step)
        nav.addStretch()
        nav.addWidget(back)
        nav.addWidget(nxt)
        outer.addLayout(nav)

        def _sync():
            i = stack.currentIndex()
            step.setText("%d of %d" % (i + 1, len(pages)))
            back.setEnabled(i > 0)
            nxt.setText("Done" if i == len(pages) - 1 else "Next")

        def _next():
            i = stack.currentIndex()
            if i >= len(pages) - 1:
                d.accept()
            else:
                stack.setCurrentIndex(i + 1)
                _sync()
        back.clicked.connect(lambda: (stack.setCurrentIndex(max(0, stack.currentIndex() - 1)), _sync()))
        nxt.clicked.connect(_next)

        def _closed(*_a):
            global _tour
            _tour = None
        d.finished.connect(_closed)
        _sync()
        _tour = d
        _appear(d)
    except Exception as exc:
        log("tour: %s" % exc)
