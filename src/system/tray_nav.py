"""Glass tray navigator — a frameless, blurred mini-window popped from the menu-bar
tray icon. It's a miniature navigator of the main Janki window: jump straight into
any deck (with due counts), flip the mode toggles (Caption / Focus / Lockdown), and
reach Open Anki / Quit — all styled to match the main window's glass.

macOS only (needs the native blur/vibrancy). On other platforms the tray keeps its
plain QMenu (see tray.py)."""

import sys
import time
import ctypes
from ctypes import (
    c_void_p, c_bool, c_long, c_int, c_double, c_ulong, c_ulonglong,
    CFUNCTYPE, Structure, byref, cast, sizeof,
)

from aqt import mw
from aqt.qt import (
    Qt, QWidget, QFrame, QVBoxLayout, QHBoxLayout, QGridLayout, QLabel,
    QPushButton, QScrollArea, QCursor, QPoint, QTimer,
    QPropertyAnimation, QEasingCurve,
)

from ..util.config import log
from ..util.bridge import _bridge, _cgs, NSPoint, NSRect

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
QPushButton#expander {
    padding:0 0 2px 0; margin:0; font-size:13px; font-weight:700; text-align:center;
    color:#aebbd2; background: transparent; border: none;
    min-width:20px; max-width:20px; min-height:20px; max-height:20px;
    qproperty-flat:true;
}
QPushButton#expander:hover  { color:#ffffff; }
QPushButton#expander:pressed{ color:#dfe7f5; }
QPushButton#posCell {
    padding:0; margin:0; text-align:center; font-size:14px;
    color:#c9d4e8; background: rgba(255,255,255,0.06);
    border:1px solid rgba(255,255,255,0.10); border-radius:7px;
}
QPushButton#posCell:hover { background: rgba(255,255,255,0.15); color:#ffffff; }
QPushButton#posCellOn {
    padding:0; margin:0; text-align:center; font-size:14px; color:#ffffff;
    background: rgba(96,156,246,0.38); border:1px solid rgba(130,178,252,0.65);
    border-radius:7px;
}
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
_glass_keeper = None


def _start_glass_keeper(w) -> None:
    """Re-assert the glass every ~120ms for ~1.2s after show so a late Qt window
    reconfigure (which turns the panel opaque with square corners) is corrected
    whenever it lands — including after a fullscreen Space animation."""
    global _glass_keeper
    if sys.platform != "darwin":
        return
    try:
        if _glass_keeper is not None:
            _glass_keeper.stop()
    except Exception:
        pass
    t = QTimer(w)
    t.setInterval(120)
    state = {"n": 0}

    def _tick():
        state["n"] += 1
        if _nav is not w or not w.isVisible() or state["n"] > 10:
            t.stop()
            return
        _apply_glass_panel(w)
    t.timeout.connect(_tick)
    t.start()
    _glass_keeper = t


def _prepare_over_fullscreen(widget) -> None:
    """Let the popup appear on whatever Space is active — including over ANOTHER app's
    native fullscreen — instead of being trapped on Anki's Space. Must run BEFORE the
    window is ordered on-screen so showing it doesn't yank you out of the fullscreen
    Space. Sets the menu-bar collection behavior (join all Spaces + fullscreen-aux) and
    a pop-up-menu window level so it draws above the fullscreen window."""
    if sys.platform != "darwin":
        return
    try:
        msg, _cls = _bridge()
        win = msg(c_void_p, c_void_p(int(widget.winId())), b"window")
        if not win:
            return
        # Qt uses an NSPanel for Tool windows — make it a NON-ACTIVATING panel so it
        # can become key WITHOUT activating Anki (activation is what switches macOS off
        # the fullscreen Space and steals focus). This is the crucial bit: the collection
        # behavior/level alone don't stop the app from coming forward on click.
        try:
            # Borderless(0) | NonactivatingPanel(1<<7). Set EXACTLY this — OR-ing onto
            # Qt's existing mask kept the titled/utility bits, which drew a square-
            # cornered titlebar at the top (rounded bottom, square top). A pure
            # borderless nonactivating panel has no frame, so the rounded content shows
            # on all four corners.
            msg(None, win, b"setStyleMask:", (c_ulong,), (1 << 7,))
            msg(None, win, b"setBecomesKeyOnlyIfNeeded:", (c_bool,), (True,))
            msg(None, win, b"setFloatingPanel:", (c_bool,), (True,))
        except Exception:
            pass
        # CanJoinAllSpaces(1) | Transient(8) | FullScreenAuxiliary(256) = 265.
        msg(None, win, b"setCollectionBehavior:", (c_ulong,), (265,))
        # 101 = NSPopUpMenuWindowLevel — above a fullscreen app's window.
        msg(c_void_p, win, b"setLevel:", (c_int,), (101,))
        # Qt.Tool windows hide when their app isn't frontmost; since we deliberately
        # never activate Anki, that would hide the popup instantly. Keep it visible.
        msg(None, win, b"setHidesOnDeactivate:", (c_bool,), (False,))
    except Exception as exc:
        log(f"tray-nav over-fullscreen: {exc}")


# --- Outside-click dismissal via a native NSEvent global monitor -------------
# Qt.Tool doesn't auto-close on an outside click the way Qt.Popup does, and a click
# inside a fullscreen app never reaches Qt's event system. A GLOBAL NSEvent monitor
# sees mouse-downs in OTHER apps (never our own), so any hit it reports means the user
# clicked outside our popup → dismiss it. This keeps the popup non-activating.
class _ObjCBlock(Structure):
    _fields_ = [("isa", c_void_p), ("flags", c_int), ("reserved", c_int),
                ("invoke", c_void_p), ("descriptor", c_void_p)]


class _ObjCBlockDescriptor(Structure):
    _fields_ = [("reserved", c_ulonglong), ("size", c_ulonglong)]


_HANDLER_T = CFUNCTYPE(None, c_void_p, c_void_p)   # void (^)(NSEvent *)
_gm_monitor = None
_gm_refs = []          # keep block/handler/descriptor alive for the monitor's life


def _install_global_dismiss() -> None:
    global _gm_monitor, _gm_refs
    if sys.platform != "darwin" or _gm_monitor is not None:
        return
    try:
        msg, cls = _bridge()

        def _on_global_click(_block_p, _event_p):
            # Ignore clicks in the top menu-bar strip (where our tray icon lives) so the
            # icon click is handled ONLY by the deterministic toggle in show_navigator —
            # otherwise the monitor races it (hides just before we check visibility),
            # which made icon clicks intermittently do nothing. Any click lower down is
            # a genuine outside click → dismiss.
            try:
                mmsg, mcls = _bridge()
                loc = mmsg(NSPoint, mcls("NSEvent"), b"mouseLocation")
                scr = mmsg(c_void_p, mcls("NSScreen"), b"mainScreen")
                if scr:
                    fr = mmsg(NSRect, scr, b"frame")
                    if loc.y >= fr.origin.y + fr.size.height - 30:
                        return
            except Exception:
                pass
            QTimer.singleShot(0, _hide)
        handler = _HANDLER_T(_on_global_click)

        desc = _ObjCBlockDescriptor(0, sizeof(_ObjCBlock))
        block = _ObjCBlock()
        block.isa = c_void_p.in_dll(ctypes.CDLL(None), "_NSConcreteGlobalBlock")
        block.flags = 1 << 28          # BLOCK_IS_GLOBAL
        block.reserved = 0
        block.invoke = cast(handler, c_void_p)
        block.descriptor = cast(byref(desc), c_void_p)

        # LeftMouseDown(1<<1) | RightMouseDown(1<<3) | OtherMouseDown(1<<25).
        mask = (1 << 1) | (1 << 3) | (1 << 25)
        _gm_monitor = msg(
            c_void_p, cls("NSEvent"),
            b"addGlobalMonitorForEventsMatchingMask:handler:",
            (c_ulonglong, c_void_p), (mask, cast(byref(block), c_void_p)))
        _gm_refs = [handler, block, desc]   # MUST outlive the monitor
    except Exception as exc:
        log(f"tray-nav dismiss monitor: {exc}")


def _remove_global_dismiss() -> None:
    global _gm_monitor, _gm_refs
    if _gm_monitor is None:
        return
    try:
        msg, cls = _bridge()
        msg(None, cls("NSEvent"), b"removeMonitor:", (c_void_p,), (_gm_monitor,))
    except Exception:
        pass
    _gm_monitor = None
    _gm_refs = []


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
        # Float above ordinary windows (and over another app's fullscreen, paired with
        # the collection behavior set in _prepare_over_fullscreen). 101 = pop-up level.
        try:
            msg(c_void_p, win, b"setLevel:", (c_int,), (101,))
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
        # Recompute the drop shadow to match the NOW-rounded, non-opaque shape.
        # Without this the shadow keeps the earlier square shape — the "box" seen
        # around the panel (most visible over a fullscreen Space).
        try:
            msg(None, win, b"invalidateShadow")
        except Exception:
            pass
    except Exception as exc:
        log(f"tray-nav glass: {exc}")


# --------------------------------------------------------------------------- decks
def _deck_rows():
    """Flattened deck tree as [(name, did, due_total, depth, parent_did, has_kids)] —
    each deck followed by its subdecks, so subdecks can be shown/hidden per-parent.
    Siblings at each level are ordered most-due first. Falls back to a flat name list."""
    rows = []

    def _due(n):
        return int(getattr(n, "new_count", 0)) + int(getattr(n, "learn_count", 0)) \
            + int(getattr(n, "review_count", 0))

    def _walk(node, depth, parent_did):
        kids = list(getattr(node, "children", []) or [])
        kids.sort(key=lambda c: (-_due(c), str(getattr(c, "name", "")).lower()))
        for c in kids:
            try:
                cid = int(c.deck_id)
                has_kids = bool(getattr(c, "children", []) or [])
                rows.append((c.name, cid, _due(c), depth, parent_did, has_kids))
            except Exception:
                continue
            _walk(c, depth + 1, cid)

    try:
        _walk(mw.col.sched.deck_due_tree(), 0, None)
    except Exception:
        pass
    if not rows:
        try:
            for nid in mw.col.decks.all_names_and_ids(skip_empty_default=True):
                rows.append((nid.name, int(nid.id), 0, 0, None, False))
        except Exception as exc:
            log(f"tray-nav decks: {exc}")
    return rows


_keep_hidden = False

# Subdecks are collapsed by default; _expanded holds the deck ids whose children are
# currently revealed (persists across popup opens). _deck_rows_widgets/_deck_scroll are
# rebuilt each _build() and drive the live show/hide.
_expanded = set()
_deck_rows_widgets = []
_deck_scroll = None


def _toggle_deck(did: int) -> None:
    if did in _expanded:
        _expanded.discard(did)
    else:
        _expanded.add(did)
    _apply_deck_visibility(animate=True)


def _animate_row(info, show: bool) -> None:
    """Slide a single deck row open/closed by animating its height."""
    w = info["widget"]
    old = info.get("anim")
    if old is not None:
        try:
            old.stop()
        except Exception:
            pass
    try:
        full = max(1, w.sizeHint().height())
        if show:
            w.setMaximumHeight(0)
            w.setVisible(True)
            start, end = 0, full
        else:
            start, end = max(w.height(), 1), 0
        a = QPropertyAnimation(w, b"maximumHeight")
        a.setDuration(160)
        a.setStartValue(start)
        a.setEndValue(end)
        a.setEasingCurve(QEasingCurve.Type.OutCubic)
        a.valueChanged.connect(lambda _v: _resize_nav())

        def _fin():
            try:
                if show:
                    w.setMaximumHeight(16777215)
                else:
                    w.setVisible(False)
            except Exception:
                pass
            _resize_nav()
        a.finished.connect(_fin)
        info["anim"] = a
        a.start()
    except Exception:
        try:
            w.setVisible(show)
            w.setMaximumHeight(16777215 if show else 0)
        except Exception:
            pass


def _apply_deck_visibility(animate: bool = False) -> None:
    """Show a deck row only when every ancestor is expanded; update the +/- glyphs and
    resize the list to the visible rows. Rows are in tree order (parent before child),
    so a single pass suffices. When `animate`, rows whose visibility changed slide."""
    vis = {}
    n_visible = 0
    for info in _deck_rows_widgets:
        parent = info["parent"]
        show = True if parent is None else (vis.get(parent, False) and parent in _expanded)
        vis[info["did"]] = show
        prev = info.get("shown")
        if show:
            n_visible += 1
        if animate and prev is not None and prev != show:
            _animate_row(info, show)
        else:
            try:
                info["widget"].setVisible(show)
                if show:
                    info["widget"].setMaximumHeight(16777215)
            except Exception:
                pass
        info["shown"] = show
        tb = info.get("toggle")
        if tb is not None:
            try:
                tb.setText("−" if info["did"] in _expanded else "+")
            except Exception:
                pass
    if _deck_scroll is not None:
        try:
            _deck_scroll.setMaximumHeight(min(4, max(1, n_visible)) * 38 + 4)
        except Exception:
            pass
    QTimer.singleShot(0, _resize_nav)


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
    # Just close the navigator and open the settings dialog — DON'T restore the main
    # window. The dialog is parented to mw but is its own top-level window, so it shows
    # fine while mw stays hidden in the tray. Keep reopen suppressed so activating the
    # app for the dialog doesn't yank the main window back.
    _hide()
    try:
        from . import tray
        tray.suppress_reopen(2.0)
    except Exception:
        pass
    try:
        from . import settings_dialog
        settings_dialog._open_settings(float_above=True)
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
_pos_section: "QWidget | None" = None
_pos_btns = []


def _on_pos_pick(val: str) -> None:
    """Set the caption anchor (same "<row>-<col>" grid the settings dialog uses) and
    live-reposition the caption HUD if it's showing."""
    from ..user import hud
    try:
        cfg = mw.addonManager.getConfig(__name__) or {}
        cfg["coherence_position"] = val
        mw.addonManager.writeConfig(__name__, cfg)
    except Exception as exc:
        log(f"tray-nav pos: {exc}")
    for b in _pos_btns:
        try:
            on = (b.property("pos_val") == val)
            b.setObjectName("posCellOn" if on else "posCell")
            b.style().unpolish(b); b.style().polish(b)
        except Exception:
            pass
    try:
        if hud._coherence_hud and hud._coherence_hud.isVisible():
            hud._coherence_hud.refresh(animate_text=False)
    except Exception:
        pass


def _build_pos_section() -> "QWidget":
    """A 3x3 anchor grid for the caption position (mirrors the settings grid). Shown
    only while caption mode is on."""
    from ..user import hud
    _pos_btns.clear()
    sect = QWidget()
    sv = QVBoxLayout(sect)
    sv.setContentsMargins(0, 0, 0, 0)
    sv.setSpacing(4)
    lbl = QLabel("Caption position")
    lbl.setObjectName("navSub")
    sv.addWidget(lbl)

    grid_w = QWidget()
    g = QGridLayout(grid_w)
    g.setContentsMargins(0, 0, 0, 0)
    g.setSpacing(5)
    cur_row, cur_col = hud._coherence_rc()
    for ri, rn in enumerate(hud._COH_ROWS):
        for ci, cn in enumerate(hud._COH_COLS):
            b = QPushButton(hud._COH_GLYPHS[ri][ci])
            val = f"{rn}-{cn}"
            b.setProperty("pos_val", val)
            b.setObjectName("posCellOn" if (rn == cur_row and cn == cur_col)
                            else "posCell")
            b.setFixedSize(46, 28)
            b.setToolTip(val.replace("-", " "))
            b.clicked.connect(lambda _c=False, v=val: _on_pos_pick(v))
            _pos_btns.append(b)
            g.addWidget(b, ri, ci)

    holder = QHBoxLayout()
    holder.setContentsMargins(0, 0, 0, 0)
    holder.addStretch(1)
    holder.addWidget(grid_w)
    holder.addStretch(1)
    sv.addLayout(holder)
    return sect


def _refresh_toggles():
    st = _toggle_states()
    for key, btn in _toggle_btns.items():
        try:
            on = st.get(key, False)
            btn.setObjectName("tglOn" if on else "tgl")
            btn.style().unpolish(btn); btn.style().polish(btn)
        except Exception:
            pass
    # Caption-position grid follows the Caption toggle live — animated on change.
    global _pos_shown
    if _pos_section is not None:
        try:
            desired = bool(st.get("caption", False))
            if desired != _pos_shown:
                _pos_shown = desired
                _animate_pos_section(desired)
        except Exception:
            pass


_pos_shown = False
_pos_anim = None


def _animate_pos_section(show: bool) -> None:
    """Slide the caption-position grid open/closed by animating its height, growing the
    popup along with it for a smooth reveal."""
    global _pos_anim
    sect = _pos_section
    if sect is None:
        return
    try:
        full = max(1, sect.sizeHint().height())
        if show:
            sect.setMaximumHeight(0)
            sect.setVisible(True)
            start, end = 0, full
        else:
            start, end = max(sect.height(), full), 0
        anim = QPropertyAnimation(sect, b"maximumHeight")
        anim.setDuration(190)
        anim.setStartValue(start)
        anim.setEndValue(end)
        anim.setEasingCurve(QEasingCurve.Type.OutCubic)
        anim.valueChanged.connect(lambda _v: _resize_nav())

        def _fin():
            try:
                if show:
                    sect.setMaximumHeight(16777215)   # release the clamp when open
                else:
                    sect.setVisible(False)
            except Exception:
                pass
            _resize_nav()
        anim.finished.connect(_fin)
        _pos_anim = anim       # keep a ref so it isn't garbage-collected mid-flight
        anim.start()
    except Exception as exc:
        log(f"tray-nav pos anim: {exc}")
        try:
            sect.setVisible(show)
            sect.setMaximumHeight(16777215 if show else 0)
            _resize_nav()
        except Exception:
            pass


def _resize_nav() -> None:
    if _nav is None:
        return
    try:
        lay = _nav.layout()
        if lay is not None:
            lay.invalidate()
            lay.activate()
        _nav.resize(_nav.width(), _nav.sizeHint().height())
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
    global _toggle_btns, _pos_section
    # Qt.Tool (not Qt.Popup): a Popup does a window-server mouse grab that forces the
    # app active, which switches macOS away from a fullscreen app. Tool + the native
    # NSEvent global monitor (see _install_global_dismiss) gives outside-click dismissal
    # WITHOUT stealing focus.
    win = _NavPopup(None, Qt.WindowType.Tool | Qt.WindowType.FramelessWindowHint)
    win.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground)
    # Show the popup WITHOUT activating Anki — otherwise showing it makes Anki the
    # active app and macOS switches away from whatever is fullscreen. Paired with the
    # all-Spaces collection behavior in _prepare_over_fullscreen, this lets the popup
    # overlay a fullscreen app without stealing its focus/Space.
    win.setAttribute(Qt.WidgetAttribute.WA_ShowWithoutActivating)
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
    global _deck_rows_widgets, _deck_scroll
    _deck_rows_widgets = []
    _deck_scroll = scroll
    rows = _deck_rows()
    # The Practice deck (and its subdecks) is pinned separately at the top.
    rows = [r for r in rows if r[0] != "Practice" and not r[0].startswith("Practice::")]
    if not rows:
        empty = QLabel("No decks")
        empty.setObjectName("cnt")
        dlay.addWidget(empty)
    for name, did, due, depth, parent, has_kids in rows:
        cont = QWidget()
        crow = QHBoxLayout(cont)
        # Indent subdecks so the hierarchy reads at a glance (deeper = further right).
        crow.setContentsMargins(depth * 15, 0, 0, 0)
        crow.setSpacing(4)

        toggle_btn = None
        if has_kids:
            toggle_btn = QPushButton("+")
            toggle_btn.setObjectName("expander")
            toggle_btn.setToolTip("Show subdecks")
            toggle_btn.clicked.connect(lambda _c=False, d=did: _toggle_deck(d))
            crow.addWidget(toggle_btn)
        else:
            sp = QWidget(); sp.setFixedWidth(20)       # keep names aligned
            crow.addWidget(sp)

        b = QPushButton()
        row = QHBoxLayout(b)
        row.setContentsMargins(11, 0, 11, 0)
        leaf = name.split("::")[-1] if "::" in name else name
        nm = QLabel(leaf)
        nm.setStyleSheet(
            "background:transparent;font-size:12px;color:%s;"
            % ("#c2cee2" if depth > 0 else "#e9eef7"))
        row.addWidget(nm)
        row.addStretch(1)
        if due > 0:
            cl = QLabel(str(due))
            cl.setObjectName("cnt")
            cl.setStyleSheet("background:transparent;")
            row.addWidget(cl)
        b.setToolTip(name)
        b.clicked.connect(lambda _c=False, d=did: _study_deck(d))
        crow.addWidget(b, 1)

        dlay.addWidget(cont)
        _deck_rows_widgets.append(
            {"did": did, "parent": parent, "widget": cont, "toggle": toggle_btn})
    dlay.addStretch(1)
    scroll.setWidget(inner)
    # Collapsed by default: apply visibility (hides all subdecks) + set the height cap.
    _apply_deck_visibility()
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

    # Caption position grid — only relevant/visible while caption mode is on. Set the
    # initial state statically (no animation on first open); toggling animates it.
    global _pos_shown
    _pos_section = _build_pos_section()
    _pos_shown = bool(_toggle_states().get("caption", False))
    _pos_section.setVisible(_pos_shown)
    if not _pos_shown:
        _pos_section.setMaximumHeight(0)
    lay.addWidget(_pos_section)

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
    _remove_global_dismiss()
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
    # Deterministic toggle: visible → hide, hidden → show. The global dismiss monitor
    # ignores menu-bar-strip clicks (see _install_global_dismiss), so it no longer races
    # this check — a click on the icon is handled here alone.
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
        # Set Space/level behavior BEFORE showing so the popup lands on the active
        # Space (even another app's fullscreen) rather than switching to Anki's.
        _prepare_over_fullscreen(_nav)
        _nav.show()
        # Re-assert AFTER show: Qt rewrites the NSPanel's style mask / collection
        # behavior during show(), which would clobber the non-activating + all-Spaces
        # flags and let a visible Anki window pull its Space forward. No raise_()/
        # activateWindow() — those can force activation and switch Spaces.
        _prepare_over_fullscreen(_nav)
        # Outside-click dismissal (Qt.Tool has none of its own).
        _install_global_dismiss()
        # Glass must be applied AFTER the native window exists; re-assert the panel
        # flags once more on the next tick in case show() posted a late reconfigure.
        w = _nav

        def _post_show():
            if _nav is not w or not w.isVisible():
                return
            _prepare_over_fullscreen(w)
            _apply_glass_panel(w)
        QTimer.singleShot(0, _post_show)

        # Qt posts a LATE window reconfigure after our glass pass that resets the panel
        # to OPAQUE with square (unclipped) corners — it looks "selected". In fullscreen
        # that reconfigure lands at an unpredictable time (Space animation), so fixed
        # one-shots miss it. Run a short bounded keeper that re-asserts just the glass
        # (opaque=false, clear bg, rounded clip) for ~1.2s. No _prepare here, so we don't
        # re-clobber it ourselves.
        _start_glass_keeper(w)
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
