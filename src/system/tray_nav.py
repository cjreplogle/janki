"""Glass tray navigator — a frameless, blurred mini-window popped from the menu-bar
tray icon. It's a miniature navigator of the main Janki window: jump straight into
any deck (with due counts), flip the mode toggles (Caption / Focus / Lockdown), and
reach Open Anki / Quit — all styled to match the main window's glass.

macOS only (needs the native blur/vibrancy). On other platforms the tray keeps its
plain QMenu (see tray.py)."""

import sys
import time
from ctypes import c_void_p, c_bool, c_long, c_int, c_double

from aqt import mw
from aqt.qt import (
    Qt, QWidget, QFrame, QVBoxLayout, QHBoxLayout, QLabel, QPushButton,
    QScrollArea, QCursor, QPoint, QTimer,
)

from ..util.config import log
from ..util.bridge import _bridge, _cgs

_nav: "QWidget | None" = None

_QSS = """
#navRoot { background: rgba(26,28,34,0.60); border-radius: 16px; }
#navHdr  { color:#eef2fa; font-size:13px; font-weight:700; padding:2px 2px 0 2px; }
#navSub  { color:#93a6c8; font-size:10px; padding:0 2px 4px 2px; }
QPushButton {
    color:#e9eef7; background: rgba(255,255,255,0.06);
    border:1px solid rgba(255,255,255,0.10); border-radius:9px;
    padding:8px 11px; text-align:left; font-size:12px;
}
QPushButton:hover  { background: rgba(255,255,255,0.15); }
QPushButton:pressed{ background: rgba(255,255,255,0.22); }
QPushButton#tgl        { padding:7px 10px; }
QPushButton#tglOn      { background: rgba(96,156,246,0.38); border-color: rgba(130,178,252,0.65); color:#ffffff; }
QPushButton#foot       { color:#cdd7ea; }
QPushButton#quit:hover { background: rgba(230,90,90,0.30); border-color: rgba(240,120,120,0.6); }
QPushButton#practice {
    background: rgba(74,200,130,0.11); border-color: rgba(108,222,160,0.30);
    color:#eafff2; font-weight:700; padding:9px 12px;
}
QPushButton#practice:hover  { background: rgba(74,200,130,0.20); }
QPushButton#practice:pressed{ background: rgba(74,200,130,0.30); }
QLabel#cnt { color:#9fb4d8; font-size:11px; }
QPushButton#icon {
    background: transparent; border: none; border-radius:8px;
    padding:0; margin:0; font-size:16px; color:#c9d4e8;
    min-width:28px; max-width:28px; min-height:28px; max-height:28px;
    text-align:center; qproperty-flat:true;
}
QPushButton#icon:hover  { background: rgba(255,255,255,0.14); color:#ffffff; }
QPushButton#icon:pressed{ background: rgba(255,255,255,0.22); }
QFrame#sep { background: rgba(255,255,255,0.10); max-height:1px; min-height:1px; border:none; }
QScrollArea { background: transparent; border: none; }
QScrollArea > QWidget > QWidget { background: transparent; }
QScrollBar:vertical { width:6px; background:transparent; margin:2px; }
QScrollBar::handle:vertical { background: rgba(255,255,255,0.22); border-radius:3px; min-height:24px; }
QScrollBar::add-line, QScrollBar::sub-line { height:0; }
"""


# --------------------------------------------------------------------------- glass
def _apply_glass_panel(widget, radius: int = 30, corner: int = 16) -> None:
    """Give the popup real glass: blur the desktop behind it (CGS window-server
    blur), non-opaque with a clear background, rounded corners clipped at the layer,
    a soft shadow, and float it above normal windows. Mirrors the main window's look
    without the NSVisualEffectView sibling dance (this is a small transient panel)."""
    if sys.platform != "darwin":
        return
    try:
        msg, cls = _bridge()
        win = msg(c_void_p, c_void_p(int(widget.winId())), b"window")
        if not win:
            return
        msg(c_void_p, win, b"setOpaque:", (c_bool,), (False,))
        msg(c_void_p, win, b"setHasShadow:", (c_bool,), (True,))
        msg(c_void_p, win, b"setBackgroundColor:", (c_void_p,),
            (msg(c_void_p, cls("NSColor"), b"clearColor"),))
        # Float above ordinary windows so it isn't hidden behind Anki.
        try:
            msg(c_void_p, win, b"setLevel:", (c_int,), (3,))  # NSFloatingWindowLevel
        except Exception:
            pass
        # Rounded-rect clip on the content layer.
        cv = msg(c_void_p, win, b"contentView")
        if cv:
            msg(c_void_p, cv, b"setWantsLayer:", (c_bool,), (True,))
            layer = msg(c_void_p, cv, b"layer")
            if layer:
                msg(None, layer, b"setCornerRadius:", (c_double,), (float(corner),))
                msg(None, layer, b"setMasksToBounds:", (c_bool,), (True,))
        # Desktop blur behind the panel.
        libcgs = _cgs()
        if libcgs:
            wid = msg(c_long, win, b"windowNumber")
            cid = libcgs.CGSMainConnectionID()
            libcgs.CGSSetWindowBackgroundBlurRadius(cid, int(wid), int(radius))
    except Exception as exc:
        log(f"tray-nav glass: {exc}")


# --------------------------------------------------------------------------- decks
def _deck_rows():
    """[(name, did, due_total)] for the top-level decks, best-first by due count.
    Uses the scheduler due tree for counts; falls back to a plain name list."""
    rows = []
    try:
        tree = mw.col.sched.deck_due_tree()
        for n in getattr(tree, "children", []) or []:
            try:
                due = int(getattr(n, "new_count", 0)) + int(getattr(n, "learn_count", 0)) \
                    + int(getattr(n, "review_count", 0))
                rows.append((n.name, int(n.deck_id), due))
            except Exception:
                continue
    except Exception:
        pass
    if not rows:
        try:
            for nid in mw.col.decks.all_names_and_ids(skip_empty_default=True):
                rows.append((nid.name, int(nid.id), 0))
        except Exception as exc:
            log(f"tray-nav decks: {exc}")
    # Due decks first (desc), then the rest alphabetically.
    rows.sort(key=lambda r: (-(r[2]), r[0].lower()))
    return rows


_keep_hidden = False


def _restore_main():
    """Bring the main window back (it may be hidden in the tray) and focus it."""
    global _keep_hidden
    _keep_hidden = False          # user chose to open something → cancel re-hide guard
    try:
        from . import tray
        if not mw.isVisible() or mw.isMinimized():
            tray._restore_window()
    except Exception:
        try:
            mw.showNormal(); mw.activateWindow()
        except Exception:
            pass


def _practice_did():
    """The 'Practice' parent deck id (the Janki question-bank deck), or None."""
    try:
        d = mw.col.decks.by_name("Practice")
        return int(d["id"]) if d else None
    except Exception:
        return None


def _study_deck(did: int) -> None:
    _hide()
    _restore_main()
    try:
        mw.col.decks.select(did)
        try:
            mw.col.startTimebox()
        except Exception:
            pass
        mw.moveToState("review")
    except Exception as exc:
        log(f"tray-nav study: {exc}")


def _open_deck_browser() -> None:
    _hide()
    _restore_main()
    try:
        mw.moveToState("deckBrowser")
    except Exception as exc:
        log(f"tray-nav deckbrowser: {exc}")


def _open_settings() -> None:
    _hide()
    _restore_main()
    try:
        from . import settings_dialog
        settings_dialog._open_settings()
    except Exception as exc:
        log(f"tray-nav settings: {exc}")


# --------------------------------------------------------------------------- toggles
def _toggle(which: str) -> None:
    try:
        if which == "caption":
            from ..user import hud
            hud._toggle_coherence()
        elif which == "focus":
            from ..features import focus
            focus._toggle_focus_mode()
        elif which == "lockdown":
            from ..features import lockdown
            lockdown.toggle()
    except Exception as exc:
        log(f"tray-nav toggle {which}: {exc}")
    # Reflect the new state without closing the popup.
    QTimer.singleShot(0, _refresh_toggles)


def _toggle_states():
    st = {"caption": False, "focus": False, "lockdown": False}
    try:
        from ..user import hud
        st["caption"] = bool(hud._caption_visible())
    except Exception:
        pass
    try:
        from ..features import focus
        st["focus"] = bool(focus._focus_mode_on)
    except Exception:
        pass
    try:
        from ..features import lockdown
        st["lockdown"] = bool(lockdown.is_locked())
    except Exception:
        pass
    return st


_toggle_btns = {}


def _refresh_toggles():
    st = _toggle_states()
    for key, btn in _toggle_btns.items():
        try:
            on = st.get(key, False)
            btn.setObjectName("tglOn" if on else "tgl")
            btn.style().unpolish(btn); btn.style().polish(btn)
        except Exception:
            pass


# --------------------------------------------------------------------------- build
_last_hidden = 0.0


class _NavPopup(QWidget):
    """Records when it hides so a tray-icon reclick TOGGLES it off instead of
    reopening: clicking the icon while the popup is open dismisses it (outside click)
    AND re-fires the tray activation — the debounce in show_navigator() uses this
    timestamp to skip the reopen."""
    def hideEvent(self, ev):
        global _last_hidden
        _last_hidden = time.time()
        try:
            super().hideEvent(ev)
        except Exception:
            pass


def _build() -> "QWidget":
    global _toggle_btns
    win = _NavPopup(None, Qt.WindowType.Popup | Qt.WindowType.FramelessWindowHint)
    win.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground)
    win.setFixedWidth(300)

    outer = QVBoxLayout(win)
    outer.setContentsMargins(0, 0, 0, 0)

    root = QFrame(win)
    root.setObjectName("navRoot")
    win.setStyleSheet(_QSS)
    outer.addWidget(root)

    lay = QVBoxLayout(root)
    lay.setContentsMargins(12, 10, 12, 10)
    lay.setSpacing(6)

    # Header row: title on the left, analytics + options icons on the right.
    hrow = QHBoxLayout()
    hrow.setContentsMargins(0, 0, 0, 0)
    hrow.setSpacing(4)
    hdr = QLabel("Janki")
    hdr.setObjectName("navHdr")
    hrow.addWidget(hdr)
    hrow.addStretch(1)
    # Gear: U+FE0E forces the monochrome (text) glyph instead of a colour emoji.
    opts_btn = QPushButton("⚙︎")
    opts_btn.setObjectName("icon")
    opts_btn.setToolTip("Janki settings")
    opts_btn.clicked.connect(_open_settings)
    hrow.addWidget(opts_btn)
    lay.addLayout(hrow)

    # Practice pinned at the very top with a green tint (the Janki question banks).
    pdid = _practice_did()
    if pdid is not None:
        pb = QPushButton("Practice")
        pb.setObjectName("practice")
        pb.clicked.connect(lambda _c=False, d=pdid: _study_deck(d))
        lay.addWidget(pb)

    sub = QLabel("Study a deck")
    sub.setObjectName("navSub")
    lay.addWidget(sub)

    # Deck list (scrollable).
    scroll = QScrollArea(root)
    scroll.setWidgetResizable(True)
    scroll.setHorizontalScrollBarPolicy(Qt.ScrollBarPolicy.ScrollBarAlwaysOff)
    inner = QWidget()
    dlay = QVBoxLayout(inner)
    dlay.setContentsMargins(0, 0, 0, 0)
    dlay.setSpacing(5)
    rows = _deck_rows()
    if not rows:
        empty = QLabel("No decks")
        empty.setObjectName("cnt")
        dlay.addWidget(empty)
    for name, did, due in rows:
        if name == "Practice":
            continue                 # pinned separately at the top
        b = QPushButton()
        row = QHBoxLayout(b)
        row.setContentsMargins(11, 0, 11, 0)
        nm = QLabel(name.split("::")[-1] if "::" in name else name)
        nm.setStyleSheet("background:transparent;color:#e9eef7;font-size:12px;")
        row.addWidget(nm)
        row.addStretch(1)
        if due > 0:
            cl = QLabel(str(due))
            cl.setObjectName("cnt")
            cl.setStyleSheet("background:transparent;")
            row.addWidget(cl)
        b.setToolTip(name)
        b.clicked.connect(lambda _c=False, d=did: _study_deck(d))
        dlay.addWidget(b)
    dlay.addStretch(1)
    scroll.setWidget(inner)
    # Cap the deck list to ~4 rows worth (keeps the popup short); scroll beyond.
    n_rows = max(1, sum(1 for r in rows if r[0] != "Practice") or 1)
    scroll.setMaximumHeight(min(4, n_rows) * 38 + 4)
    lay.addWidget(scroll)

    sep1 = QFrame(); sep1.setObjectName("sep"); lay.addWidget(sep1)

    # Mode toggles (macOS features).
    _toggle_btns = {}
    trow = QHBoxLayout()
    trow.setSpacing(6)
    for key, label in (("caption", "Caption"), ("focus", "Focus"), ("lockdown", "Lockdown")):
        tb = QPushButton(label)
        tb.setObjectName("tgl")
        tb.clicked.connect(lambda _c=False, k=key: _toggle(k))
        _toggle_btns[key] = tb
        trow.addWidget(tb)
    lay.addLayout(trow)

    sep2 = QFrame(); sep2.setObjectName("sep"); lay.addWidget(sep2)

    # Footer: open deck browser + quit.
    frow = QHBoxLayout()
    frow.setSpacing(6)
    openb = QPushButton("Open Anki")
    openb.setObjectName("foot")
    openb.clicked.connect(_open_deck_browser)
    frow.addWidget(openb)
    quitb = QPushButton("Quit")
    quitb.setObjectName("quit")

    def _do_quit():
        _hide()
        try:
            from . import tray
            tray._quit_from_tray()
        except Exception as exc:
            log(f"tray-nav quit: {exc}")
    quitb.clicked.connect(_do_quit)
    frow.addWidget(quitb)
    lay.addLayout(frow)

    _refresh_toggles()
    return win


# --------------------------------------------------------------------------- show/hide
def _anchor_point(w) -> "QPoint":
    """Top-right of the popup just under the menu bar, near the click point."""
    c = QCursor.pos()
    scr = None
    try:
        scr = mw.screen().availableGeometry() if hasattr(mw, "screen") else None
    except Exception:
        scr = None
    x = c.x() - w.width() + 12          # right edge near the cursor
    y = (scr.y() if scr else 24) + 6    # just below the menu bar
    if scr is not None:
        x = max(scr.x() + 6, min(x, scr.x() + scr.width() - w.width() - 6))
    return QPoint(x, y)


def _hide() -> None:
    global _nav
    if _nav is not None:
        try:
            _nav.hide()
        except Exception:
            pass


def show_navigator() -> None:
    """Rebuild fresh (decks/counts change) and pop the glass navigator."""
    global _nav
    if sys.platform != "darwin":
        return
    # Reclick-to-close: if the popup was just dismissed (the same icon click that
    # closed it also re-fires activation), don't reopen — that makes the tray icon a
    # toggle. Also toggle off if it's somehow still visible.
    if time.time() - _last_hidden < 0.35:
        return
    if _nav is not None and _nav.isVisible():
        _hide()
        return
    global _keep_hidden
    try:
        # Clicking the icon activates the app; stop that from yanking the hidden
        # main window back — the click should only open this navigator.
        try:
            from . import tray
            tray.suppress_reopen()
        except Exception:
            pass
        # If the main window was hidden (closed to tray), KEEP it hidden: activation
        # can re-show it natively or via the reopen hook. Re-hide it over the next few
        # frames unless the user clicks something that intentionally opens it (which
        # clears _keep_hidden via _restore_main).
        was_hidden = not mw.isVisible()
        _keep_hidden = was_hidden
        if _nav is not None:
            try:
                _nav.close(); _nav.deleteLater()
            except Exception:
                pass
            _nav = None
        _nav = _build()
        _nav.adjustSize()
        _nav.move(_anchor_point(_nav))
        _nav.show()
        _nav.raise_()
        # Glass must be applied AFTER the native window exists.
        QTimer.singleShot(0, lambda: _apply_glass_panel(_nav))
        if was_hidden:
            def _rehide():
                try:
                    if _keep_hidden and mw.isVisible():
                        mw.hide()
                except Exception:
                    pass
            for d in (40, 150, 320, 550):
                QTimer.singleShot(d, _rehide)
    except Exception as exc:
        log(f"tray-nav show: {exc}")
