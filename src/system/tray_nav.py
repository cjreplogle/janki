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
    QEvent, QObject,
    Qt, QWidget, QFrame, QVBoxLayout, QHBoxLayout, QGridLayout, QLabel,
    QPushButton, QScrollArea, QCursor, QPoint, QTimer, QSize,
    QPropertyAnimation, QEasingCurve,
)

from ..util.config import log, _cfg
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
QPushButton#tgl        { text-align:center; padding:7px 10px; }
QPushButton#tglOn       { text-align:center; background: rgba(96,156,246,0.38); border-color: rgba(130,178,252,0.65); color:#ffffff; }
QPushButton#tglOnBlue   { text-align:center; background: rgba(96,156,246,0.22); border-color: rgba(130,178,252,0.48); color:#ffffff; }
QPushButton#tglOnGreen  { text-align:center; background: rgba(52,199,89,0.20); border-color: rgba(90,214,124,0.45); color:#ffffff; }
QPushButton#tglOnRed    { text-align:center; background: rgba(235,87,87,0.22); border-color: rgba(245,125,125,0.48); color:#ffffff; }
QPushButton#tglOnOrange { text-align:center; background: rgba(255,159,10,0.20); border-color: rgba(255,186,90,0.46); color:#ffffff; }
QPushButton#tglOnPale   { text-align:center; background: rgba(255,150,150,0.16); border-color: rgba(255,175,175,0.42); color:#ffffff; }
QPushButton#foot       { color:#cdd7ea; }
QPushButton#quit:hover { background: rgba(230,90,90,0.30); border-color: rgba(240,120,120,0.6); }
QPushButton#practice {
    background: rgba(74,200,130,0.11); border-color: rgba(108,222,160,0.30);
    color:#eafff2; font-weight:700; padding:9px 12px;
}
QPushButton#practice:hover  { background: rgba(74,200,130,0.20); }
QPushButton#practice:pressed{ background: rgba(74,200,130,0.30); }
QLabel#cnt { color:#9fb4d8; font-size:11px; }
QPushButton#tgl[jkIco="true"], QPushButton[jkIco="true"] { padding:3px 4px 11px 4px; }
QLabel#hint, QLabel#hintSm { color: rgba(233,238,247,0.34); font-size:7.5px; background: transparent; }
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
QPushButton#gear {
    background: transparent; border: none; border-radius:9px;
    padding:0; margin:0; font-size:21px; color:#c9d4e8;
    min-width:32px; max-width:32px; min-height:32px; max-height:32px;
    text-align:center; qproperty-flat:true;
}
QPushButton#gear:hover  { background: rgba(255,255,255,0.14); color:#ffffff; }
QPushButton#gear:pressed{ background: rgba(255,255,255,0.22); }
QPushButton#icon:pressed{ background: rgba(255,255,255,0.22); }
QFrame#sep { background: rgba(255,255,255,0.10); max-height:1px; min-height:1px; border:none; }
QScrollArea { background: transparent; border: none; }
QScrollArea > QWidget > QWidget { background: transparent; }
QScrollBar:vertical { width:6px; background:transparent; margin:2px; }
QScrollBar::handle:vertical { background: rgba(255,255,255,0.22); border-radius:3px; min-height:24px; }
QScrollBar::add-line, QScrollBar::sub-line { height:0; }
"""


# --------------------------------------------------------------------------- smooth fills
# Qt stylesheets clip a rounded widget's BACKGROUND to its border-radius WITHOUT
# anti-aliasing, so filled buttons (Rephrase, Practice, toggles) and the panel itself
# showed stair-stepped corners. We paint those rounded fills + outlines ourselves with
# anti-aliasing and let the stylesheet do only text/padding (its fills are made
# transparent below). (bg rgba, hover-bg alpha|None, pressed-bg alpha|None,
# border rgba|None, radius) keyed by objectName; "" = a plain button.
_W = (255, 255, 255)
_PAINT = {
    "":           ((*_W, .06), .15, .22, (*_W, .10), 9),
    "tgl":        ((*_W, .06), .15, .22, (*_W, .10), 9),
    "foot":       ((*_W, .06), .15, .22, (*_W, .10), 9),
    "quit":       ((*_W, .06), None, .22, (*_W, .10), 9),     # hover handled below
    "tglOn":      ((96, 156, 246, .38), None, None, (130, 178, 252, .65), 9),
    "tglOnBlue":   ((96, 156, 246, .22), None, None, (130, 178, 252, .48), 9),
    "tglOnGreen":  ((52, 199, 89, .20), None, None, (90, 214, 124, .45), 9),
    "tglOnRed":    ((235, 87, 87, .22), None, None, (245, 125, 125, .48), 9),
    "tglOnOrange": ((255, 159, 10, .20), None, None, (255, 186, 90, .46), 9),
    "tglOnPale":   ((255, 150, 150, .16), None, None, (255, 175, 175, .42), 9),   # rephrase
    "practice":   ((74, 200, 130, .11), .20, .30, (108, 222, 160, .30), 9),
    "posCell":    ((*_W, .06), .15, None, (*_W, .10), 7),
    "posCellOn":  ((96, 156, 246, .38), None, None, (130, 178, 252, .65), 7),
    "icon":       ((*_W, 0.0), .14, .22, None, 8),
    "gear":       ((*_W, 0.0), .14, .22, None, 9),
}
_ROOT_BG = (26, 28, 34, .60)
_ROOT_RADIUS = 16


def _painted_qss(qss: str) -> str:
    """Blank the fills/outline colours of the rules we paint ourselves (keeps widths,
    padding and the :hover rules, so Qt still tracks hover and repaints)."""
    import re
    out = []
    for rule in re.findall(r"[^{}]+\{[^}]*\}", qss):
        sel = rule.split("{", 1)[0]
        if "QPushButton" in sel and "expander" not in sel or "#navRoot" in sel:
            rule = re.sub(r"background:\s*[^;]+;", "background: transparent;", rule)
            rule = re.sub(r"border-color:\s*[^;]+;", "border-color: transparent;", rule)
            rule = re.sub(r"border:\s*1px solid [^;]+;", "border:1px solid transparent;", rule)
        out.append(rule.strip())
    return "\n".join(out)


class _SmoothPainter(QObject):
    """Paints anti-aliased rounded fills/outlines under buttons + the panel root, then
    lets the widget's normal (now fill-less) stylesheet painting draw text on top."""

    def eventFilter(self, obj, ev):
        if ev.type() != QEvent.Type.Paint:
            return False
        try:
            from aqt.qt import QPainter, QColor, QPen, QRectF
            name = obj.objectName()
            if name == "navRoot":
                bg, bd, r = _ROOT_BG, None, _ROOT_RADIUS
            else:
                spec = getattr(obj, "_jk_paint", None) or \
                    _PAINT.get(name, _PAINT[""] if name not in ("expander",) else None)
                if spec is None:
                    return False
                base, hov, prs, bd, r = spec
                a = base[3]
                if obj.isDown() and prs is not None:
                    a = prs
                elif obj.underMouse() and hov is not None:
                    a = hov
                bg = (*base[:3], a)
                # An OFF mode toggle previews its own colour on hover: a pale version of
                # its lit (on) fill + border.
                on_name = getattr(obj, "_jk_on_name", None)
                if name == "tgl" and on_name and obj.underMouse() and not obj.isDown():
                    ob, _h, _p, obd, _r = _PAINT[on_name]
                    bg = (*ob[:3], ob[3] * 0.5)
                    bd = (*obd[:3], obd[3] * 0.6)
                if name == "quit" and obj.underMouse():
                    bg, bd = (230, 90, 90, .30), (240, 120, 120, .6)
            p = QPainter(obj)
            p.setRenderHint(QPainter.RenderHint.Antialiasing, True)
            rect = QRectF(obj.rect()).adjusted(0.5, 0.5, -0.5, -0.5)
            p.setPen(QPen(QColor(bd[0], bd[1], bd[2], int(bd[3] * 255)), 1.0)
                     if bd else QPen(Qt.PenStyle.NoPen))
            p.setBrush(QColor(bg[0], bg[1], bg[2], int(bg[3] * 255)))
            p.drawRoundedRect(rect, r, r)
            p.end()
        except Exception:
            pass
        return False                           # widget still paints its text/icon


_smooth = None


def _install_smooth_painting(win) -> None:
    global _smooth
    try:
        from aqt.qt import QPushButton
        if _smooth is None:
            _smooth = _SmoothPainter()
        root = win.findChild(QFrame, "navRoot")
        if root is not None:
            root.installEventFilter(_smooth)
        for b in win.findChildren(QPushButton):
            b.setAttribute(Qt.WidgetAttribute.WA_Hover, True)
            b.installEventFilter(_smooth)
    except Exception as exc:
        log(f"tray-nav smooth paint: {exc}")


# --------------------------------------------------------------------------- glass
_glass_keeper = None


def _glass_lost(w) -> bool:
    """True if Qt has reset the panel to opaque or dropped its rounded content clip."""
    try:
        msg, _cls = _bridge()
        win = msg(c_void_p, c_void_p(int(w.winId())), b"window")
        if not win:
            return False
        if msg(c_bool, win, b"isOpaque"):
            return True
        ev = getattr(w, "_jk_blur_view", None)
        if ev:
            cv = msg(c_void_p, win, b"contentView")
            sup = msg(c_void_p, cv, b"superview") if cv else None
            return msg(c_void_p, ev, b"superview") != sup    # dropped by a reconfigure
        cv = msg(c_void_p, win, b"contentView")
        layer = msg(c_void_p, cv, b"layer") if cv else None
        if not layer:
            return True
        return msg(c_double, layer, b"cornerRadius") < 1.0
    except Exception:
        return False


def _start_glass_keeper(w) -> None:
    """Re-assert the glass every ~120ms for ~2s after show so a late Qt window
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
        if _nav is not w or not w.isVisible():
            t.stop()
            return
        if state["n"] <= 16:                  # burst: re-assert only if it was lost
            if state["n"] <= 2 or _glass_lost(w):  # (unconditional re-applies made the
                _apply_glass_panel(w)              #  first tab switches hitch)
            return
        # After the burst, keep WATCHING while the popup is open: over another app's
        # fullscreen Space the opaque/square reconfigure can land much later (or more
        # than once). Re-apply only when it has actually happened — cheap check.
        if state["n"] == 17:
            t.setInterval(300)
        if _glass_lost(w):
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
            # A click ON the panel can reach us as an "other app" click (the glass panel
            # lets some through) — that closed the tray the moment you clicked Decks /
            # Today. Only a click outside the panel's frame dismisses.
            try:
                if _nav is not None and _nav.isVisible() and \
                        _nav.frameGeometry().adjusted(-4, -4, 4, 4).contains(QCursor.pos()):
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


class _LocalDismiss(QObject):
    """Clicks in Anki's OWN windows (the main window, dialogs) don't reach the global
    monitor — this closes the tray on those too."""

    def eventFilter(self, obj, ev):
        try:
            if ev.type() == QEvent.Type.MouseButtonPress and _nav is not None \
                    and _nav.isVisible():
                w = obj.window() if hasattr(obj, "window") else None
                if w is not None and w is not _nav and not getattr(w, "_jk_tray_child", False):
                    QTimer.singleShot(0, _hide)
        except Exception:
            pass
        return False


_local_dismiss = None


def _install_local_dismiss():
    global _local_dismiss
    try:
        from aqt.qt import QApplication
        if _local_dismiss is None:
            _local_dismiss = _LocalDismiss(mw)
            QApplication.instance().installEventFilter(_local_dismiss)
    except Exception:
        pass


def _remove_local_dismiss():
    global _local_dismiss
    try:
        from aqt.qt import QApplication
        if _local_dismiss is not None:
            QApplication.instance().removeEventFilter(_local_dismiss)
            _local_dismiss = None
    except Exception:
        pass


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


def _install_rounded_blur(widget, win, cv, corner) -> bool:
    """Install (once per popup) / re-assert a rounded NSVisualEffectView directly below
    Qt's content view. Returns True when the rounded blur is in place."""
    try:
        msg, cls = _bridge()
        if not cv:
            return False
        sup = msg(c_void_p, cv, b"superview")
        if not sup:
            return False
        frame = msg(NSRect, sup, b"bounds")
        ev = getattr(widget, "_jk_blur_view", None)
        if ev:
            # Qt can rebuild the frame view on a reconfigure — re-add if it was dropped.
            if msg(c_void_p, ev, b"superview") != sup:
                msg(None, sup, b"addSubview:positioned:relativeTo:",
                    (c_void_p, c_long, c_void_p), (ev, -1, cv))
            msg(None, ev, b"setFrame:", (NSRect,), (frame,))
        else:
            ev = msg(c_void_p, cls("NSVisualEffectView"), b"alloc")
            ev = msg(c_void_p, ev, b"initWithFrame:", (NSRect,), (frame,))
            if not ev:
                return False
            msg(None, ev, b"setBlendingMode:", (c_long,), (0,))    # behindWindow
            msg(None, ev, b"setMaterial:", (c_long,), (21,))       # under-window bg
            msg(None, ev, b"setState:", (c_long,), (1,))           # always active
            msg(None, ev, b"setAutoresizingMask:", (c_ulong,), (18,))
            msg(None, sup, b"addSubview:positioned:relativeTo:",
                (c_void_p, c_long, c_void_p), (ev, -1, cv))        # -1 = below Qt view
            widget._jk_blur_view = ev
        msg(None, ev, b"setWantsLayer:", (c_bool,), (True,))
        layer = msg(c_void_p, ev, b"layer")
        if layer:
            msg(None, layer, b"setCornerRadius:", (c_double,), (float(corner),))
            msg(None, layer, b"setMasksToBounds:", (c_bool,), (True,))
        # Make sure no square window-server blur is left behind from before.
        libcgs = _cgs()
        if libcgs:
            wid = msg(c_long, win, b"windowNumber")
            libcgs.CGSSetWindowBackgroundBlurRadius(libcgs.CGSMainConnectionID(), int(wid), 0)
        return True
    except Exception as exc:
        log(f"tray-nav rounded blur: {exc}")
        return False


def _apply_glass_panel(widget, radius: int = 30, corner: int = 16) -> None:
    """Give the popup real glass: blur the desktop behind it (CGS window-server
    blur), non-opaque with a clear background, rounded corners clipped at the layer,
    a soft shadow, and float it above normal windows. Mirrors the main window's look
    without the NSVisualEffectView sibling dance (this is a small transient panel)."""
    if sys.platform.startswith("win"):
        try:
            from ..platform.win import shell as _wsh, dwm as _dwm
            hwnd = int(widget.winId())
            _wsh.make_overlay(hwnd)                  # topmost, never takes focus
            _dwm.apply(hwnd, material=int(_cfg().get("material", 21)))
            _install_win_dismiss(widget)
        except Exception as e:
            log(f"win nav glass: {e}")
        return
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
        # Desktop blur behind the panel — a ROUNDED native NSVisualEffectView behind Qt's
        # view. (The old CGS window-server blur always covers the full window RECT, so
        # the panel read as a blurred square with a square outline — most visible over
        # another app's fullscreen. The effect view's layer clips to the corner radius,
        # so the blur, the alpha shape and hence the shadow are all rounded.)
        cv = msg(c_void_p, win, b"contentView")
        rounded = _install_rounded_blur(widget, win, cv, corner)
        if not rounded:
            libcgs = _cgs()                    # fallback: the old square blur
            if libcgs:
                wid = msg(c_long, win, b"windowNumber")
                cid = libcgs.CGSMainConnectionID()
                libcgs.CGSSetWindowBackgroundBlurRadius(cid, int(wid), int(radius))
        # Content-layer clip. With the rounded blur in place Qt's own ANTI-ALIASED rounded
        # #navRoot already defines the shape, so DON'T hard-clip it again — a second mask
        # at the same radius cuts through those soft edge pixels and leaves jaggies.
        # Only clip in the square-blur fallback.
        if cv:
            msg(c_void_p, cv, b"setWantsLayer:", (c_bool,), (True,))
            layer = msg(c_void_p, cv, b"layer")
            if layer:
                msg(None, layer, b"setCornerRadius:", (c_double,),
                    (0.0 if rounded else float(corner),))
                msg(None, layer, b"setMasksToBounds:", (c_bool,), (not rounded,))
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
# Tray data (deck tree, Practice deck, its banks) cached: the tray draws from this at
# once and refreshes it in the background (after reviews / edits, on open), so opening
# it never waits on the collection — that wait (behind any background job) was the lag.
_DATA = {"rows": None, "pdid": None, "prac": None}
_data_busy = [False]


def _deck_rows():
    if _DATA["rows"] is None:              # first ever open: read it now (once)
        _DATA["rows"] = _deck_rows_live(mw.col)
    return _DATA["rows"]


def _practice_did():
    if _DATA["pdid"] is None:
        _DATA["pdid"] = _practice_did_live(mw.col) or 0
    return _DATA["pdid"] or None


def _practice_banks():
    if _DATA["prac"] is None:
        _DATA["prac"] = _practice_banks_live(mw.col)
    return _DATA["prac"]


_prebuilt = None
_prebuild_timer = None


def _prebuild():
    """Build the next tray while nobody's looking, so opening it is just a show()."""
    global _prebuilt
    try:
        if getattr(mw, "col", None) is None:
            schedule_prebuild(2000)               # profile still loading: try again
            return
        if _nav is not None and _nav.isVisible():
            schedule_prebuild(600)                # still fading out / open: retry
            return
        new = _build()
        try:
            new.winId()                           # make the native window now, not on
            _prepare_over_fullscreen(new)          # first show (that was the slow part)
        except Exception:
            pass
        old, _prebuilt = _prebuilt, new
        if old is not None:
            old.deleteLater()
    except Exception as exc:
        log(f"tray prebuild: {exc}")


def schedule_prebuild(ms=400):
    global _prebuild_timer
    try:
        if _prebuild_timer is None:
            _prebuild_timer = QTimer(mw)
            _prebuild_timer.setSingleShot(True)
            _prebuild_timer.timeout.connect(_prebuild)
        _prebuild_timer.start(ms)
    except Exception:
        pass


def refresh_data_bg(*_a):
    """Re-read the tray's data off the main thread (debounced by the busy flag)."""
    if _data_busy[0] or getattr(mw, "col", None) is None:
        return
    _data_busy[0] = True
    try:
        from aqt.operations import QueryOp

        def op(col):
            return (_deck_rows_live(col), _practice_did_live(col) or 0,
                    _practice_banks_live(col))

        def done(r):
            _data_busy[0] = False
            changed = r != (_DATA["rows"], _DATA["pdid"], _DATA["prac"])
            _DATA["rows"], _DATA["pdid"], _DATA["prac"] = r
            if changed or _prebuilt is None:
                schedule_prebuild(200)          # next open uses the fresh data

        def failed(_e):
            _data_busy[0] = False
        QueryOp(parent=mw, op=op, success=done).failure(failed).run_in_background()
    except Exception:
        _data_busy[0] = False


_refresh_timer = None


def _schedule_refresh(*_a):
    global _refresh_timer
    try:
        if _refresh_timer is None:
            _refresh_timer = QTimer(mw)
            _refresh_timer.setSingleShot(True)
            _refresh_timer.timeout.connect(refresh_data_bg)
        _refresh_timer.start(1500)
    except Exception:
        pass


def install_data_cache():
    try:
        from aqt import gui_hooks
        gui_hooks.profile_did_open.append(lambda: QTimer.singleShot(2500, refresh_data_bg))
        gui_hooks.profile_did_open.append(lambda: schedule_prebuild(4000))   # ready early
        QTimer.singleShot(5000, lambda: _prebuilt is None and schedule_prebuild(0))
        QTimer.singleShot(3000, refresh_data_bg)       # (the hook may already have fired)
        gui_hooks.operation_did_execute.append(_schedule_refresh)
    except Exception:
        pass


def _deck_rows_live(col):
    """Deck names + nesting as [(name, did, 0, depth, parent_did, has_kids)] — no due
    counts: the tray doesn't need card data, and the scheduler's due tree was the
    heaviest thing it read."""
    rows = []
    try:
        decks = sorted((d.name, int(d.id)) for d in col.decks.all_names_and_ids(
            skip_empty_default=True) if not d.name.startswith("Janki Calendar"))
        ids = {n: i for n, i in decks}
        kids = {n.rsplit("::", 1)[0] for n, _i in decks if "::" in n}
        for name, did in decks:
            parent = ids.get(name.rsplit("::", 1)[0]) if "::" in name else None
            rows.append((name, did, 0, name.count("::"), parent, name in kids))
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
            # Measure a real row (font-dependent — Lora rows are taller than the old
            # hard-coded 38px, which clipped the 4th tile) + the list's spacing.
            row_h, gap = 38, 0
            for info in _deck_rows_widgets:
                w = info.get("widget")
                if w is not None and w.maximumHeight() > 0:
                    row_h = max(row_h, w.sizeHint().height())
                    lay_ = w.parentWidget().layout() if w.parentWidget() else None
                    gap = max(0, lay_.spacing()) if lay_ is not None else 0
                    break
            _deck_scroll.setFixedHeight(_PAGE_H)   # five decks, then it scrolls
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


def _practice_did_live(col):
    """The 'Practice' parent deck id (the Janki question-bank deck), or None."""
    try:
        d = col.decks.by_name("Practice")
        return int(d["id"]) if d else None
    except Exception:
        return None


_tray_mode_widgets = {}


# One size for every tray tab page: five 28px rows (Decks / Practice), the day view
# scaled to the same height — switching tabs never changes the tray's size.
_ROW_H, _ROW_GAP = 28, 4
_PAGE_H = 5 * _ROW_H + 4 * _ROW_GAP + 4


class _SegTabs(QWidget):
    """Decks | Practice | Today as one segmented control (like the Calendar's
    Day / 3-day / Week): a rounded track with a blue pill gliding to the selection."""

    def __init__(self, parent, labels):
        super().__init__(parent)
        self.labels = labels
        self.cur = 0
        self.pill_x = 0.0                      # animated (in segment units)
        self.on_pick = None
        self._anim = None
        self.setFixedHeight(30)
        self.setCursor(Qt.CursorShape.PointingHandCursor)

    def select(self, i, animate=True):
        from aqt.qt import QVariantAnimation, QEasingCurve
        self.cur = i
        if not animate or not self.isVisible():
            self.pill_x = float(i)
            self.update()
            return
        if self._anim is not None:
            self._anim.stop()
        a = QVariantAnimation(self)
        a.setStartValue(float(self.pill_x))
        a.setEndValue(float(i))
        a.setDuration(220)
        a.setEasingCurve(QEasingCurve.Type.OutCubic)
        a.valueChanged.connect(lambda v: (setattr(self, "pill_x", float(v)), self.update()))
        a.start()
        self._anim = a

    def paintEvent(self, _ev):
        from aqt.qt import QPainter, QColor, QRectF, QPen
        p = QPainter(self)
        p.setRenderHint(QPainter.RenderHint.Antialiasing, True)
        r = QRectF(self.rect()).adjusted(0.5, 0.5, -0.5, -0.5)
        p.setPen(Qt.PenStyle.NoPen)
        p.setBrush(QColor(255, 255, 255, 18))            # the track
        p.drawRoundedRect(r, 9, 9)
        n = max(1, len(self.labels))
        w = (r.width() - 4) / n
        pill = QRectF(r.x() + 2 + self.pill_x * w, r.y() + 2, w, r.height() - 4)
        p.setBrush(QColor(156, 188, 243, 72))            # the gliding pill
        p.drawRoundedRect(pill, 7, 7)
        for i, lab in enumerate(self.labels):
            on = i == self.cur
            p.setPen(QColor(207, 224, 255) if on else QColor(255, 255, 255, 190))
            p.drawText(QRectF(r.x() + 2 + i * w, r.y(), w, r.height()),
                       int(Qt.AlignmentFlag.AlignCenter), lab)
        p.end()

    def mousePressEvent(self, ev):
        n = max(1, len(self.labels))
        i = min(n - 1, max(0, int(ev.position().x() / (self.width() / n))))
        if i != self.cur and self.on_pick:
            self.on_pick(i)


class _DayView(QWidget):
    """Today's classes drawn on an hour grid (painted, so it's light in the glass tray)."""
    RGB = [(120, 165, 245), (80, 195, 185), (125, 200, 120), (235, 185, 90),
           (240, 130, 115), (170, 135, 240), (235, 120, 175), (150, 170, 195)]
    PX_H = 30            # pixels per hour
    GUTTER = 44          # time labels on the left

    def __init__(self, parent, evs, lectures, cv, is_today=True):
        super().__init__(parent)
        self.is_today = is_today
        self.setMouseTracking(True)
        self.setCursor(Qt.CursorShape.PointingHandCursor)
        timed = [e for e in evs if e["start"] is not None]
        lo = min([e["start"] for e in timed] + [8 * 60]) // 60 * 60
        # to 1pm by default (mornings are what matter here); later classes still extend it
        hi = -(-max([e["end"] or e["start"] + 60 for e in timed] + [13 * 60]) // 60) * 60
        self.lo, self.hi = lo, hi
        lanes = cv._lanes([(i, e) for i, e in enumerate(timed)])
        self.items = []
        for i, e in enumerate(timed):
            m = lectures.peek_match(e["summary"])
            known = bool(m and m is not lectures._PENDING)
            col = self.RGB[cv._course_colour(e["summary"])] if known else (154, 160, 170)
            ln, nl = lanes.get(i, (0, 1))
            self.items.append({"e": e, "col": col, "lane": ln, "lanes": nl})
        self.hover = None
        # 8am–1pm fills the page exactly; a longer day scrolls at the same scale
        self.PX_H = (_PAGE_H - 12) / 5.0
        self.setFixedHeight(int((hi - lo) / 60 * self.PX_H) + 12)

    def _rect(self, it):
        from aqt.qt import QRectF
        e = it["e"]
        w = self.width() - self.GUTTER - 4
        y0 = 6 + (e["start"] - self.lo) / 60 * self.PX_H
        y1 = 6 + ((e["end"] or e["start"] + 50) - self.lo) / 60 * self.PX_H
        lw = w / it["lanes"]
        return QRectF(self.GUTTER + it["lane"] * lw + 1, y0 + 1, lw - 3, max(16, y1 - y0 - 2))

    def paintEvent(self, _ev):
        from aqt.qt import QPainter, QColor, QPen, QFont, QRectF
        import datetime
        p = QPainter(self)
        p.setRenderHint(QPainter.RenderHint.Antialiasing, True)
        f = QFont(self.font())
        f.setPointSizeF(max(8.0, f.pointSizeF() - 2))
        p.setFont(f)
        for t in range(self.lo, self.hi + 1, 60):          # hour lines + labels
            y = 6 + (t - self.lo) / 60 * self.PX_H
            p.setPen(QPen(QColor(255, 255, 255, 22), 1))
            p.drawLine(self.GUTTER - 4, int(y), self.width() - 4, int(y))
            h = t // 60
            p.setPen(QColor(255, 255, 255, 120))
            p.drawText(QRectF(0, y - 7, self.GUTTER - 8, 14),
                       int(Qt.AlignmentFlag.AlignRight | Qt.AlignmentFlag.AlignVCenter),
                       "%d%s" % ((h + 11) % 12 + 1, "am" if h < 12 else "pm"))
        bold = QFont(f)
        bold.setBold(True)
        for n, it in enumerate(self.items):                 # class blocks
            r = self._rect(it)
            c = it["col"]
            p.setPen(QPen(QColor(c[0], c[1], c[2], 180), 1.2))
            p.setBrush(QColor(c[0], c[1], c[2], 40 if n == self.hover else 0))
            p.drawRoundedRect(r, 6, 6)
            p.setPen(QColor(240, 242, 248))
            p.setFont(bold)
            star = bool(it["e"].get("mandatory"))
            tr = r.adjusted(6, 2, -16 if star else -4, -2)
            p.drawText(tr, int(Qt.AlignmentFlag.AlignLeft | Qt.AlignmentFlag.AlignTop),
                       p.fontMetrics().elidedText(it["e"]["summary"], Qt.TextElideMode.ElideRight,
                                                  int(tr.width())))
            if star:                                        # red ★, top-right like the Calendar
                p.setPen(QColor(255, 157, 138))
                p.drawText(r.adjusted(0, 2, -5, 0),
                           int(Qt.AlignmentFlag.AlignRight | Qt.AlignmentFlag.AlignTop), "★")
        now = datetime.datetime.now()                       # the red now-line
        m = now.hour * 60 + now.minute
        if self.is_today and self.lo <= m <= self.hi:
            y = 6 + (m - self.lo) / 60 * self.PX_H
            p.setPen(QPen(QColor(255, 107, 107), 2))
            p.drawLine(self.GUTTER - 2, int(y), self.width() - 4, int(y))
            p.setBrush(QColor(255, 107, 107))
            p.setPen(Qt.PenStyle.NoPen)
            p.drawEllipse(QRectF(self.GUTTER - 6, y - 4, 8, 8))
        p.end()

    def _hit(self, pos):
        for n, it in enumerate(self.items):
            if self._rect(it).contains(pos.toPointF() if hasattr(pos, "toPointF") else pos):
                return n
        return None

    def mouseMoveEvent(self, ev):
        h = self._hit(ev.position())
        if h != self.hover:
            self.hover = h
            self.setToolTip("Study %s  (right-click for details)" % self.items[h]["e"]["summary"] if h is not None else "")
            self.update()

    def leaveEvent(self, _ev):
        self.hover = None
        self.update()

    def mousePressEvent(self, ev):
        h = self._hit(ev.position())
        if h is not None and ev.button() == Qt.MouseButton.RightButton:
            _class_info(self, self.items[h]["e"], self._rect(self.items[h]))
            return
        _class_info_close()
        if h is not None:
            _study_class(self.items[h]["e"])


_info_card = None


def _class_info_close():
    global _info_card
    c = _info_card
    _info_card = None
    try:
        if c is not None:
            c.hide()
            c.deleteLater()
    except Exception:
        pass


def _fmt_min(m):
    if m is None:
        return ""
    h, mm = divmod(int(m), 60)
    return "%d:%02d %s" % ((h % 12) or 12, mm, "AM" if h < 12 else "PM")


def _class_info(view, e, rect):
    """Right-click a class in the tray day view: a small card floating over the tray
    (not a popup window — those close at once from the non-activating panel) with its
    time, room, matched lecture and Study / Open in LMS."""
    global _info_card
    import html as _h
    from aqt.qt import QGraphicsOpacityEffect
    _class_info_close()
    root = view.window().findChild(QFrame, "navRoot") or view.window()
    card = QFrame(root)
    card.setObjectName("infoCard")
    card.setStyleSheet("#infoCard{background:rgba(34,36,44,250);border:1px solid rgba(255,255,255,40);"
                       "border-radius:10px;} QLabel{background:transparent;color:#e6e9f0;}")
    v = QVBoxLayout(card)
    v.setContentsMargins(12, 10, 12, 10)
    v.setSpacing(4)
    top = QHBoxLayout()
    title = QLabel("<b>%s</b>" % _h.escape(e.get("summary") or "Class"))
    title.setWordWrap(True)
    top.addWidget(title, 1)
    x = QPushButton("✕")
    x.setObjectName("icon")
    x.setFixedSize(20, 20)
    x.clicked.connect(lambda _c=False: _class_info_close())
    top.addWidget(x, 0, Qt.AlignmentFlag.AlignTop)
    v.addLayout(top)
    lines = []
    when = " – ".join(t for t in (_fmt_min(e.get("start")), _fmt_min(e.get("end"))) if t)
    d = e.get("date")
    if d is not None:
        try:
            when = d.strftime("%a %b ") + str(d.day) + (" · " + when if when else "")
        except Exception:
            pass
    if when:
        lines.append(when)
    if e.get("location"):
        lines.append(e["location"])
    try:
        from ..integrations import lectures
        m = lectures.peek_match(e.get("summary") or "")
        if m and m is not lectures._PENDING:
            lines.append("Lecture: " + m.get("display", ""))
    except Exception:
        pass
    if e.get("mandatory"):
        lines.append("<span style='color:#ff9d8a'>★ Attendance required</span>")
    for ln in lines:
        lb = QLabel(ln if ln.startswith("<") else _h.escape(ln))
        lb.setWordWrap(True)
        lb.setStyleSheet("color:#b8c3d8;font-size:11px;")
        v.addWidget(lb)
    btns = QHBoxLayout()
    btns.setSpacing(6)
    sb = QPushButton("Study")
    sb.setObjectName("tgl")
    sb.clicked.connect(lambda _c=False: (_class_info_close(), _study_class(e)))
    btns.addWidget(sb, 1)
    if e.get("url"):
        lb_ = QPushButton("Open in LMS")
        lb_.setObjectName("tgl")

        def _lms(_c=False, u=e["url"]):
            from aqt.qt import QDesktopServices, QUrl
            _class_info_close()
            _hide()
            QDesktopServices.openUrl(QUrl(u))
        lb_.clicked.connect(_lms)
        btns.addWidget(lb_, 1)
    v.addLayout(btns)
    card.setFixedWidth(root.width() - 24)
    card.adjustSize()
    # just under the class block, flipped above it when it would run off the bottom
    y = view.mapTo(root, rect.bottomLeft().toPoint()).y() + 4
    if y + card.height() > root.height() - 6:
        y = max(6, view.mapTo(root, rect.topLeft().toPoint()).y() - card.height() - 4)
    card.move(12, y)
    eff = QGraphicsOpacityEffect(card)
    eff.setOpacity(0.0)
    card.setGraphicsEffect(eff)
    card.raise_()
    card.show()
    anim = QPropertyAnimation(eff, b"opacity", card)
    anim.setDuration(160)
    anim.setStartValue(0.0)
    anim.setEndValue(1.0)
    anim.setEasingCurve(QEasingCurve.Type.OutCubic)
    card._jk_anim = anim
    anim.start()
    _info_card = card


def _practice_banks_live(col):
    """First-tier Practice banks, then 'all banks' — rows like _deck_rows."""
    try:
        due = {r[1]: r[2] for r in _deck_rows_live(col)}
    except Exception:
        due = {}
    rows = []
    try:
        names = sorted((d.name, d.id) for d in col.decks.all_names_and_ids()
                       if d.name.startswith("Practice::") and d.name.count("::") == 1)
        for name, did in names:
            rows.append((name, did, due.get(did, 0), 0, None, False))
        pid = col.decks.id_for_name("Practice")
        if pid:
            rows.append(("Practice (all banks)", pid, due.get(pid, 0), 0, None, False))
    except Exception:
        rows = []
    return rows


def _build_practice_list(parent):
    """Practice tab: the Practice deck and its banks; click one to study it."""
    box = QWidget(parent)
    v = QVBoxLayout(box)
    v.setContentsMargins(0, 0, 0, 0)
    v.setSpacing(5)
    rows = _practice_banks()
    if not rows:
        lbl = QLabel("No practice banks yet")
        lbl.setObjectName("cnt")
        v.addWidget(lbl)
    for name, did, due, depth, _parent, _kids in rows:
        b = QPushButton()
        b.setObjectName("practice")
        row = QHBoxLayout(b)
        row.setContentsMargins(11 + depth * 12, 0, 11, 0)
        nm = QLabel(name.split("::")[-1])
        nm.setAttribute(Qt.WidgetAttribute.WA_TransparentForMouseEvents, True)
        row.addWidget(nm, 1)
        if due:
            c = QLabel(str(due))
            c.setObjectName("cnt")
            c.setAttribute(Qt.WidgetAttribute.WA_TransparentForMouseEvents, True)
            row.addWidget(c)
        b.setFixedHeight(_ROW_H)
        b.clicked.connect(lambda _c=False, d=did: _study_deck(d))
        v.addWidget(b)
    v.setSpacing(_ROW_GAP)
    v.addStretch(1)
    box._jk_rows = len(rows)
    return box


def _white_icon(kind, size=16):
    """Plain white line icons drawn with QPainter (font glyphs can come out as colour
    emoji on macOS): caption, focus, lock, speaker, speaker_off, gear."""
    import math
    from aqt.qt import QPainter, QColor, QPen, QPixmap, QIcon, QRectF, QPointF, QPainterPath
    dpr = 3
    pm = QPixmap(size * dpr, size * dpr)
    pm.fill(Qt.GlobalColor.transparent)
    p = QPainter(pm)
    p.setRenderHint(QPainter.RenderHint.Antialiasing, True)
    p.scale(dpr * size / 16.0, dpr * size / 16.0)     # shapes are drawn on a 16-unit grid
    white = QColor(255, 255, 255)
    pen = QPen(white, 1.5)
    pen.setCapStyle(Qt.PenCapStyle.RoundCap)
    pen.setJoinStyle(Qt.PenJoinStyle.RoundJoin)
    p.setPen(pen)
    S = 16.0
    if kind == "caption":                          # closed captions: [CC]
        p.drawRoundedRect(QRectF(1, 3, 14, 10), 2.5, 2.5)
        p.setPen(QPen(white, 1.3, cap=Qt.PenCapStyle.RoundCap))
        for x in (3.6, 8.6):                       # two Cs (open on the right)
            p.drawArc(QRectF(x, 5.6, 3.8, 4.8), 45 * 16, 270 * 16)
    elif kind == "focus":                          # target: rings + crosshair ticks
        c = QPointF(8, 8)
        p.drawEllipse(c, 5.2, 5.2)
        p.drawEllipse(c, 2.4, 2.4)
        for (x0, y0, x1, y1) in ((8, 0.8, 8, 3.6), (8, 12.4, 8, 15.2),
                                 (0.8, 8, 3.6, 8), (12.4, 8, 15.2, 8)):
            p.drawLine(QPointF(x0, y0), QPointF(x1, y1))
        p.setBrush(white)
        p.drawEllipse(c, 0.9, 0.9)
    elif kind == "lock":                           # padlock
        p.drawArc(QRectF(S / 2 - 3.5, 1.5, 7, 9), 0, 180 * 16)
        p.drawLine(QPointF(S / 2 - 3.5, 6), QPointF(S / 2 - 3.5, 7.5))
        p.drawLine(QPointF(S / 2 + 3.5, 6), QPointF(S / 2 + 3.5, 7.5))
        p.setBrush(white)
        p.drawRoundedRect(QRectF(2.5, 7.5, S - 5, S - 9), 1.5, 1.5)
    elif kind in ("speaker", "speaker_off"):
        path = QPainterPath()
        path.moveTo(2, 6); path.lineTo(5, 6); path.lineTo(9, 2.5)
        path.lineTo(9, S - 2.5); path.lineTo(5, S - 6); path.lineTo(2, S - 6)
        path.closeSubpath()
        p.setBrush(white)
        p.drawPath(path)
        p.setBrush(Qt.BrushStyle.NoBrush)
        if kind == "speaker":
            p.drawArc(QRectF(7, 5, 5, 6), -60 * 16, 120 * 16)
            p.drawArc(QRectF(7, 2.5, 8, 11), -60 * 16, 120 * 16)
        else:
            p.drawLine(QPointF(11, 5.5), QPointF(15, 10.5))
            p.drawLine(QPointF(15, 5.5), QPointF(11, 10.5))
    elif kind == "gear":
        c = QPointF(S / 2, S / 2)
        p.setBrush(white)
        for i in range(8):                         # teeth
            a = i * math.pi / 4
            p.save()
            p.translate(c)
            p.rotate(math.degrees(a))
            p.drawRect(QRectF(-1.3, -S / 2 + 0.5, 2.6, 3))
            p.restore()
        p.drawEllipse(c, S / 2 - 3, S / 2 - 3)
        p.setBrush(QColor(0, 0, 0, 0))
        p.setCompositionMode(QPainter.CompositionMode.CompositionMode_Clear)
        p.drawEllipse(c, 2, 2)
    p.end()
    pm.setDevicePixelRatio(dpr)
    return QIcon(pm)


def _sound_types_panel(parent):
    """Levels floating over the tray under the header (right-click the speaker): Master, then one slider
    per type of sound (0–200 %). Inline, not a popup window — a Qt popup opened from the
    non-activating tray panel closes the instant it opens on macOS."""
    from aqt.qt import QSlider
    box = QFrame(parent)
    box.setObjectName("sndBox")
    box.setStyleSheet("#sndBox{background:rgba(34,36,44,248);border:1px solid rgba(255,255,255,40);"
                      "border-radius:10px;}"
                      "QLabel{background:transparent;}")
    v = QVBoxLayout(box)
    v.setContentsMargins(10, 6, 10, 6)
    v.setSpacing(2)
    from ..features import sfx
    c = _cfg()
    gains = dict(c.get("sfx_cat_gain") or {})
    rows = [("__master", "Master", int(c.get("sfx_volume", 0)), 100, "select")]
    rows += [(k, lab, int(gains.get(k, 100)), 200, snd) for k, lab, snd in sfx.CATS]
    for key, label, cur, hi, snd in rows:
        row = QHBoxLayout()
        lb = QLabel(label)
        lb.setFixedWidth(72)
        row.addWidget(lb)
        sl = QSlider(Qt.Orientation.Horizontal)
        sl.setRange(0, hi)
        sl.setValue(cur)
        val = QLabel()
        val.setFixedWidth(36)
        val.setAlignment(Qt.AlignmentFlag.AlignRight | Qt.AlignmentFlag.AlignVCenter)

        def changed(x, key=key, val=val, save=True):
            val.setText("off" if x == 0 else "%d%%" % x)
            if not save:
                return
            cc = mw.addonManager.getConfig(__name__) or {}
            if key == "__master":
                cc["sfx_volume"] = int(x)
                if x > 0:
                    cc["sfx_muted"] = False
            else:
                g = dict(cc.get("sfx_cat_gain") or {})
                g[key] = int(x)
                cc["sfx_cat_gain"] = g
            mw.addonManager.writeConfig(__name__, cc)
            if box._sync:
                box._sync()

        def preview(snd=snd):
            try:
                sfx.play(snd, force=True)
            except Exception:
                pass
        sl.valueChanged.connect(changed)
        sl.sliderReleased.connect(preview)
        changed(sl.value(), save=False)
        row.addWidget(sl, 1)
        row.addWidget(val)
        v.addLayout(row)
    box._sync = None
    box.hide()
    return box


def _build_today_list(parent):
    """A day's classes from the calendar (today by default; ‹ › seek through days, the
    date label jumps back to today): time + title in its course colour; click one to
    study it (every card, suspended ones restored afterwards)."""
    import datetime
    box = QWidget(parent)
    v = QVBoxLayout(box)
    v.setContentsMargins(0, 0, 0, 0)
    v.setSpacing(5)

    nav = QHBoxLayout()
    nav.setContentsMargins(0, 0, 0, 0)
    nav.setSpacing(4)
    prev_b = QPushButton("‹")
    next_b = QPushButton("›")
    for b in (prev_b, next_b):
        b.setObjectName("icon")
        b.setFixedSize(26, 22)
    day_lbl = QPushButton()
    day_lbl.setObjectName("icon")
    day_lbl.setFixedHeight(22)
    day_lbl.setStyleSheet("font-size:12px;font-weight:600;")
    nav.addWidget(prev_b)
    nav.addWidget(day_lbl, 1)
    nav.addWidget(next_b)
    v.addLayout(nav)

    holder = QWidget(box)
    hv = QVBoxLayout(holder)
    hv.setContentsMargins(0, 0, 0, 0)
    hv.setSpacing(5)
    v.addWidget(holder)
    v.addStretch(1)
    st = {"off": 0}

    def fill():
        while hv.count():
            w = hv.takeAt(0).widget()
            if w is not None:
                w.deleteLater()
        t = datetime.date.today()
        d = t + datetime.timedelta(days=st["off"])
        rel = {0: "Today", -1: "Yesterday", 1: "Tomorrow"}.get(st["off"])
        day_lbl.setText((rel + " · " if rel else "") + d.strftime("%a %b ") + str(d.day))
        day_lbl.setToolTip("" if st["off"] == 0 else "Back to today")
        evs = []
        try:
            from ..integrations import lectures
            from ..features import calendar_view as cv
            evs, fresh = lectures.events_cached_between(d, d)
            if not fresh:
                lectures.load_events_bg()
            evs = [e for e in evs if not cv._is_allday_kind(e["summary"])]
        except Exception as exc:
            log(f"tray today: {exc}")
        if not evs:
            lbl = QLabel("No classes today" if st["off"] == 0 else "No classes")
            lbl.setObjectName("cnt")
            hv.addWidget(lbl)
        else:
            # A mini day view like the Calendar: hour lines + labels, each class a block
            # at its time in its course colour (outline only); click one to study it.
            hv.addWidget(_DayView(holder, evs, lectures, cv, is_today=st["off"] == 0))

    def seek(n):
        _class_info_close()
        st["off"] = 0 if n is None else st["off"] + n
        fill()
        try:
            from ..features import sfx
            sfx.play("move")
        except Exception:
            pass
    prev_b.clicked.connect(lambda _c=False: seek(-1))
    next_b.clicked.connect(lambda _c=False: seek(1))
    day_lbl.clicked.connect(lambda _c=False: seek(None))
    fill()
    return box


def _study_class(e) -> None:
    _hide()
    _restore_main()
    try:
        from ..features import calendar_view
        calendar_view.study_event(e)
    except Exception as exc:
        log(f"tray-nav class study: {exc}")


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
    #
    # Open on the NEXT tick, after the panel has been ordered out, then CHECK the dialog
    # really reached the screen and re-front it if not. Opening in the same event as the
    # panel hide (plus the app activation and the tray's main-window re-hide timers) could
    # leave the dialog created but never ordered on screen, so the first press looked dead
    # and only the second (which found and fronted the existing dialog) worked.
    _hide()
    try:
        from . import tray
        tray.suppress_reopen(2.0)
    except Exception:
        pass

    def _verify(attempt=0):
        try:
            from . import settings_dialog
            from ..user import glass
            d = settings_dialog._settings_instance
            if d is None:
                return
            if not (d.isVisible() and _natively_on_screen(d)):
                log("tray-nav settings: dialog not on screen, re-fronting (%d)" % attempt)
                glass.bring_dialog_to_front(d)
                if attempt < 3:
                    QTimer.singleShot(250, lambda: _verify(attempt + 1))
        except Exception as exc:
            log(f"tray-nav settings verify: {exc}")

    def _go():
        try:
            from . import settings_dialog
            settings_dialog._open_settings(float_above=True)
        except Exception as exc:
            log(f"tray-nav settings: {exc}")
            return
        QTimer.singleShot(200, _verify)
        QTimer.singleShot(650, _verify)    # after the tray's last main-window re-hide (550ms)
    QTimer.singleShot(0, _go)


class _CornerHint(QObject):
    """Keeps a hint label pinned to its button's top-right corner on resize (top, not
    bottom: the label text is vertically centred, so the top strip is free — at the
    bottom, tall glyphs like the ` in `+⌫ ran into the label)."""

    def eventFilter(self, obj, ev):
        if ev.type() in (QEvent.Type.Resize, QEvent.Type.Show):
            lab = getattr(obj, "_jk_hint", None)
            if lab is not None:
                lab.adjustSize()
                if getattr(obj, "_jk_hint_bottom", False):     # icon buttons: bottom centre
                    lab.move((obj.width() - lab.width()) // 2, obj.height() - lab.height() - 1)
                else:
                    lab.move(obj.width() - lab.width() - 6, 1)
        return False


_corner_hint = None


def _add_corner_hint(btn, text: str, small: bool = False) -> None:
    """Faint keyboard-shortcut hint tucked into a button's top-right corner (a child
    label that ignores the mouse, so clicks still hit the button)."""
    global _corner_hint
    try:
        if _corner_hint is None:
            _corner_hint = _CornerHint()
        lab = QLabel(text, btn)
        lab.setObjectName("hintSm" if small else "hint")
        lab.setAttribute(Qt.WidgetAttribute.WA_TransparentForMouseEvents, True)
        btn._jk_hint = lab
        btn.installEventFilter(_corner_hint)
    except Exception as exc:
        log(f"tray-nav hint: {exc}")


def _open_lectures() -> None:
    # Like Settings: close the navigator and open the Load today's lectures wizard as its
    # own window, without yanking a tray-hidden main window back.
    _hide()
    try:
        from . import tray
        tray.suppress_reopen(2.0)
    except Exception:
        pass
    try:
        from ..integrations import lectures
        # Instant feedback — building the window (tag index + calendar) can take a
        # moment on a cold open, which read as "the click did nothing".
        try:
            from aqt.utils import tooltip
            tooltip("Loading lectures…", period=1200)
        except Exception:
            pass
        QTimer.singleShot(30, lambda: lectures.run_today(interactive=True))
    except Exception as exc:
        log(f"tray-nav lectures: {exc}")


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
        elif which == "reword":
            from ..features import reword
            cfg = mw.addonManager.getConfig(__name__) or {}
            new = not bool(cfg.get("reword_enabled", False))
            cfg["reword_enabled"] = new
            mw.addonManager.writeConfig(__name__, cfg)
            if new:                       # warm the on-device model so the first reword is quick
                try:
                    reword.warm_up()
                except Exception:
                    pass
    except Exception as exc:
        log(f"tray-nav toggle {which}: {exc}")
    # Reflect the new state without closing the popup.
    QTimer.singleShot(0, _refresh_toggles)


def _cycle_reword() -> None:
    """Cycle the CURRENT reviewer card to its next rephrasing — the same jump as Tab+R
    (original → reword 1 → reword 2 → … → original, generating a fresh one when past the
    last). Keeps the popup open so you can keep cycling. No-op outside review."""
    if getattr(mw, "state", None) != "review":
        try:
            from aqt.utils import tooltip
            tooltip("Cycle rephrasings while reviewing a card")
        except Exception:
            pass
        return
    try:
        from ..util import keytap
        keytap._reword_toggle()
    except Exception as exc:
        log(f"tray-nav reword cycle: {exc}")


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
    try:
        from ..features import reword
        st["reword"] = bool(reword._enabled())
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


# Each mode lights in its own colour when on.
_TOGGLE_ON_NAME = {"caption": "tglOnBlue", "focus": "tglOnGreen",
                   "lockdown": "tglOnRed", "reword": "tglOnPale"}


def _install_mode_watch(win) -> None:
    """Modes can change while the popup is open (Tab+` / Tab+F / Tab+R / `+⌫ keybinds work
    over it). Poll the mode state (cheap) and re-tint the toggles when it changes. Its own
    timer, parented to this popup (dies with it) and NOT gated on isVisible(), which is
    unreliable for this panel on newer macOS."""
    t = QTimer(win)
    t.setInterval(200)
    last = {"st": _toggle_states()}

    def _tick():
        if _nav is not win:
            t.stop()
            return
        try:
            cur = _toggle_states()
            if cur != last["st"]:
                last["st"] = cur
                _refresh_toggles()
        except Exception:
            pass
    t.timeout.connect(_tick)
    t.start()


def _refresh_toggles():
    st = _toggle_states()
    for key, btn in _toggle_btns.items():
        try:
            on = st.get(key, False)
            btn.setObjectName(_TOGGLE_ON_NAME.get(key, "tglOn") if on else "tgl")
            btn.style().unpolish(btn); btn.style().polish(btn)
            btn.update()
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
    win.setStyleSheet(_painted_qss(_QSS))       # fills are painted smoothly instead
    try:
        from ..user import css as _css
        _css.apply_widget_ui_font(win)          # inherit the chosen Interface font
    except Exception as exc:
        log(f"tray-nav font: {exc}")
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
    opts_btn = QPushButton()
    opts_btn.setIcon(_white_icon("gear", 18))
    opts_btn.setIconSize(QSize(18, 18))
    opts_btn.setObjectName("gear")            # 1.5× the header's other icon buttons
    opts_btn.setToolTip("Janki settings")
    opts_btn.clicked.connect(_open_settings)
    # Quick mute for Janki's sounds (keeps the volume setting; one tap to unmute).
    mute_btn = QPushButton()
    mute_btn.setObjectName("icon")

    def _sync_mute():
        try:
            c = _cfg()
            on = int(c.get("sfx_volume", 0)) > 0 and not c.get("sfx_muted", False)
        except Exception:
            on = False
        mute_btn.setIcon(_white_icon("speaker" if on else "speaker_off"))
        mute_btn.setToolTip("Mute Janki sounds" if on else
                            "Janki sounds are off — click to unmute" if _cfg().get("sfx_muted")
                            else "Janki sounds are off (turn them up in Settings ▸ Appearance ▸ Sounds)")

    def _toggle_mute():
        try:
            from aqt import mw as _mw
            c = _mw.addonManager.getConfig(__name__) or {}
            if int(c.get("sfx_volume", 0)) <= 0 and not c.get("sfx_muted"):
                _open_settings()                 # nothing to mute: take them to the slider
                return
            c["sfx_muted"] = not c.get("sfx_muted", False)
            _mw.addonManager.writeConfig(__name__, c)
            if not c["sfx_muted"]:
                from ..features import sfx
                sfx.play("select")
        except Exception as exc:
            log(f"tray mute: {exc}")
        _sync_mute()
    mute_btn.clicked.connect(_toggle_mute)
    # right-click: a level per type of sound (Navigation / Reviews)
    mute_btn.setContextMenuPolicy(Qt.ContextMenuPolicy.CustomContextMenu)
    snd_box = _sound_types_panel(root)
    snd_box._sync = _sync_mute

    def _toggle_levels():
        # floats OVER the tray (not in the layout), so nothing below it moves
        from aqt.qt import QGraphicsOpacityEffect
        eff = snd_box.graphicsEffect()
        if eff is None:
            eff = QGraphicsOpacityEffect(snd_box)
            snd_box.setGraphicsEffect(eff)
        old = getattr(snd_box, "_jk_anim", None)
        if old is not None:
            old.stop()
        closing = snd_box.isVisible() and not getattr(snd_box, "_jk_closing", False)
        snd_box._jk_closing = closing
        if not closing:
            snd_box.setFixedWidth(root.width() - 24)
            snd_box.adjustSize()
            y = mute_btn.mapTo(root, mute_btn.rect().bottomLeft()).y() + 6
            snd_box.move(12, y)
            snd_box.raise_()
            if not snd_box.isVisible():
                eff.setOpacity(0.0)
            snd_box.show()
        # a short fade in (and out again on close)
        anim = QPropertyAnimation(eff, b"opacity", snd_box)
        anim.setDuration(140 if closing else 180)
        anim.setStartValue(eff.opacity())
        anim.setEndValue(0.0 if closing else 1.0)
        anim.setEasingCurve(QEasingCurve.Type.OutCubic)
        if closing:
            anim.finished.connect(lambda: (snd_box.hide(), setattr(snd_box, "_jk_closing", False)))
        snd_box._jk_anim = anim
        anim.start()
    mute_btn.customContextMenuRequested.connect(lambda _p: _toggle_levels())
    _sync_mute()
    hrow.addWidget(mute_btn)
    hrow.addWidget(opts_btn)
    lay.addLayout(hrow)

    # Decks | Practice | Today — a segmented control like the Calendar's view switch.
    pdid = _practice_did()
    mode = str(_cfg().get("tray_mode", "decks"))
    if mode == "practice" and pdid is None:
        mode = "decks"
    seg_keys = ["decks"] + (["practice"] if pdid is not None else []) + ["today"]
    seg = _SegTabs(root, [k.capitalize() for k in seg_keys])
    seg.setFixedHeight(26)
    lay.addWidget(seg)
    today_box = _build_today_list(root)
    prac_box = _build_practice_list(root) if pdid is not None else None

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
    # Practice has its own tab; the temporary class decks are never listed.
    rows = [r for r in rows if r[0] != "Practice" and not r[0].startswith("Practice::")
            and not r[0].startswith("Janki Calendar")]
    _tray_mode_widgets["scroll"] = scroll
    _tray_mode_widgets["today"] = today_box

    def _show_mode(m, save=True):
        if m == "practice" and prac_box is None:
            m = "decks"
        seg.select(seg_keys.index(m), animate=save)
        page = {"today": today_page, "practice": prac_page}.get(m) or scroll
        st = _tray_mode_widgets.get("stack")
        if st is not None:
            st.setCurrentWidget(page)
        if save:
            def _save(m=m):
                try:
                    c = mw.addonManager.getConfig(__name__) or {}
                    c["tray_mode"] = m
                    mw.addonManager.writeConfig(__name__, c)
                except Exception:
                    pass
            QTimer.singleShot(250, _save)          # after the switch has drawn
            try:
                from ..features import sfx
                sfx.play("tab")
            except Exception:
                pass
    seg.on_pick = lambda i: _show_mode(seg_keys[i])
    QTimer.singleShot(0, lambda: _show_mode(mode, save=False))

    def _warm_hidden():
        # the hidden list's first show used to do its first polish / layout / font
        # setup on the click — do it now, offscreen, so the first switch is instant
        try:
            other = today_box if mode != "today" else scroll
            other.ensurePolished()
            for w in other.findChildren(QWidget):
                w.ensurePolished()
        except Exception:
            pass
    QTimer.singleShot(400, _warm_hidden)        # after the open has settled
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
        b.setFixedHeight(_ROW_H)
        if toggle_btn is not None:
            toggle_btn.setFixedHeight(_ROW_H)
        b.clicked.connect(lambda _c=False, d=did: _study_deck(d))
        crow.addWidget(b, 1)

        dlay.addWidget(cont)
        _deck_rows_widgets.append(
            {"did": did, "parent": parent, "widget": cont, "toggle": toggle_btn})
    dlay.addStretch(1)
    scroll.setWidget(inner)
    # Collapsed by default: apply visibility (hides all subdecks) + set the height cap.
    _apply_deck_visibility()
    # Decks and Today share ONE stacked slot sized to the larger list: switching just
    # flips which is shown — the panel never resizes (a resize made macOS order the
    # glass panel out and back in at a corner)
    from aqt.qt import QStackedLayout
    slot = QWidget(root)
    stack = QStackedLayout(slot)
    stack.setContentsMargins(0, 0, 0, 0)
    def _scrolled(w):
        sa = QScrollArea(root)
        sa.setWidgetResizable(True)
        sa.setFrameShape(QFrame.Shape.NoFrame)
        sa.setHorizontalScrollBarPolicy(Qt.ScrollBarPolicy.ScrollBarAlwaysOff)
        sa.setStyleSheet("QScrollArea{background:transparent;border:none;}")
        sa.viewport().setAutoFillBackground(False)
        sa.setWidget(w)
        w.setAutoFillBackground(False)
        return sa
    today_page = _scrolled(today_box)
    prac_page = _scrolled(prac_box) if prac_box is not None else None
    today_page.setFixedHeight(_PAGE_H)
    if prac_page is not None:
        prac_page.setFixedHeight(_PAGE_H)                 # five banks, then it scrolls
    stack.addWidget(scroll)
    stack.addWidget(today_page)
    if prac_page is not None:
        stack.addWidget(prac_page)
    slot.setFixedHeight(_PAGE_H)               # exactly one page: no slack to soak up
    _tray_mode_widgets["stack"] = stack
    lay.addWidget(slot)

    sep1 = QFrame(); sep1.setObjectName("sep"); lay.addWidget(sep1)

    # Mode toggles (macOS features).
    _toggle_btns = {}
    trow = QHBoxLayout()
    trow.setSpacing(6)
    # little monochrome glyphs (U+FE0E = text form, so they take the button's colour)
    for key, label, ico in (("caption", "Caption", "caption"), ("focus", "Focus", "focus"),
                            ("lockdown", "Lockdown", "lock")):
        tb = QPushButton()                         # icon only; the name is the tooltip
        tb.setIcon(_white_icon(ico))
        tb.setIconSize(QSize(16, 16))
        tb.setProperty("jkIco", True)             # icon sits high; the hint goes under it
        tb._jk_hint_bottom = True
        tb.setToolTip(label)
        tb.setObjectName("tgl")
        tb.clicked.connect(lambda _c=False, k=key: _toggle(k))
        _toggle_btns[key] = tb
        tb._jk_on_name = _TOGGLE_ON_NAME[key]
        _add_corner_hint(tb, {"caption": "Tab+\\", "focus": "Tab+F",
                              "lockdown": "`+⌫"}[key], small=True)   # narrow buttons
        trow.addWidget(tb, 1)

    # Rephrase on/off — the right half of the toggles row (display-only card rephrasing). Lit GREEN when
    # on (distinct from the blue mode toggles above).
    rwrow = QHBoxLayout()
    rwrow.setSpacing(6)
    rwb = QPushButton("Rephrase")
    rwb.setObjectName(_TOGGLE_ON_NAME["reword"] if _toggle_states().get("reword", False)
                      else "tgl")
    rwb.setToolTip("Show cards rephrased (display-only; never edits your notes)")
    def _rw_clicked(_c=False):
        was = bool(_toggle_states().get("reword", False))
        _toggle("reword")
        try:
            from ..features import sfx
            sfx.play("rephrase_off" if was else "rephrase_on")
        except Exception:
            pass
    rwb.clicked.connect(_rw_clicked)
    _toggle_btns["reword"] = rwb
    rwb._jk_on_name = _TOGGLE_ON_NAME["reword"]
    rwb.setProperty("jkIco", True)                # label raised, Tab+R centred under it
    rwb._jk_hint_bottom = True
    _add_corner_hint(rwb, "Tab+R")
    rwrow.addWidget(rwb, 1)
    cyc = QPushButton("⟳")
    cyc.setObjectName("icon")
    cyc.setToolTip("Cycle the current card through its rephrasings")
    cyc.clicked.connect(lambda _c=False: _cycle_reword())
    rwrow.addWidget(cyc)
    # one row: Caption / Focus / Lockdown in the left half, Rephrase + ⟳ in the right
    both = QHBoxLayout()
    both.setSpacing(6)
    both.addLayout(trow, 1)
    both.addLayout(rwrow, 1)
    lay.addLayout(both)

    # (no "Load from Lectures" here any more: the Today tab + the Calendar cover it)

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
    try:                                          # lockdown: no escape routes here
        from ..util import state as _st
        _locked = bool(getattr(_st, "_lockdown_on", False))
        _very = str(_cfg().get("lockdown_level", "standard")).lower() == "very_strict"
    except Exception:
        _locked, _very = False, False
    _add_corner_hint(openb, "⌘⌥A")
    frow.addWidget(openb)
    quitb = QPushButton("Quit")
    quitb.setObjectName("quit")
    if _locked:
        # Quit stays available (lockdown makes it wait out a countdown instead).
        for _b in (openb,):
            _b.setEnabled(False)
            _b.setToolTip("Unavailable during lockdown — hold Space to exit lockdown")

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
    _install_smooth_painting(win)          # anti-aliased rounded fills
    _install_mode_watch(win)
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
    if sys.platform.startswith("win") and scr is not None:
        # Windows: the tray lives in the taskbar (usually at the bottom). Open just
        # above/below it depending on which half of the screen was clicked.
        if c.y() > scr.y() + scr.height() / 2:
            y = scr.y() + scr.height() - w.height() - 6
    if scr is not None:
        x = max(scr.x() + 6, min(x, scr.x() + scr.width() - w.width() - 6))
    return QPoint(x, y)


_open_anim = None


def _make_unroll(win):
    """Height animation for the open 'unroll'. Returns a QVariantAnimation (or None);
    restores normal sizing when it finishes so later resizes (expanding subdecks) work."""
    try:
        from aqt.qt import QVariantAnimation, QEasingCurve, QLayout
        root = win.findChild(QFrame, "navRoot")
        lay = win.layout()
        full = win.height()
        if root is None or lay is None or full < 80:
            return None
        lay.setSizeConstraint(QLayout.SizeConstraint.SetNoConstraint)
        root.setFixedHeight(full)
        start = min(full, 44)
        win.setFixedHeight(start)

        anim = QVariantAnimation(win)
        anim.setDuration(240)
        anim.setStartValue(float(start))
        anim.setEndValue(float(full))
        anim.setEasingCurve(QEasingCurve.Type.OutCubic)

        def _step(v):
            try:
                win.setFixedHeight(int(v))
                _apply_glass_panel(win)       # keep the glass/rounding on every frame
            except Exception:
                pass

        def _end():
            try:
                root.setMinimumHeight(0)
                root.setMaximumHeight(16777215)
                win.setMinimumHeight(0)
                win.setMaximumHeight(16777215)
                lay.setSizeConstraint(QLayout.SizeConstraint.SetDefaultConstraint)
                # Avoid a needless final resize — every native resize invites Qt's late
                # reconfigure that turns the panel opaque/square (worst over fullscreen).
                if abs(win.sizeHint().height() - win.height()) > 1:
                    win.adjustSize()
                _apply_glass_panel(win)
                # The animation's resizes can post that reconfigure AFTER the show-time
                # keeper; run the keeper again from here so it's always corrected.
                _start_glass_keeper(win)
            except Exception:
                pass
        anim.valueChanged.connect(_step)
        anim.finished.connect(_end)
        return anim
    except Exception as exc:
        log(f"tray-nav unroll: {exc}")
        return None


def _make_focus_in(win):
    """'Focus' pull-in: the panel's contents start softly blurred and sharpen as it
    fades/unrolls in. The blur effect is removed at the end so the panel renders
    normally (and cheaply) at rest."""
    try:
        from aqt.qt import QGraphicsBlurEffect, QVariantAnimation, QEasingCurve
        root = win.findChild(QFrame, "navRoot")
        if root is None:
            return None
        eff = QGraphicsBlurEffect(root)
        eff.setBlurHints(QGraphicsBlurEffect.BlurHint.QualityHint)
        eff.setBlurRadius(9.0)
        root.setGraphicsEffect(eff)
        anim = QVariantAnimation(win)
        anim.setDuration(280)
        anim.setStartValue(9.0)
        anim.setEndValue(0.0)
        anim.setEasingCurve(QEasingCurve.Type.OutCubic)

        def _step(v):
            try:
                eff.setBlurRadius(float(v))
            except Exception:
                pass

        def _end():
            try:
                if root.graphicsEffect() is eff:
                    root.setGraphicsEffect(None)
            except Exception:
                pass
        anim.valueChanged.connect(_step)
        anim.finished.connect(_end)
        return anim
    except Exception as exc:
        log(f"tray-nav focus-in: {exc}")
        return None


def _animate_open(win, final_pos) -> None:
    """Fade in + drop down from ~14px above to the anchor when the tray popup opens."""
    global _open_anim
    try:
        from aqt.qt import (QPropertyAnimation, QEasingCurve, QPoint,
                            QParallelAnimationGroup)
        start = QPoint(final_pos.x(), final_pos.y() - 14)
        fade = QPropertyAnimation(win, b"windowOpacity", win)
        fade.setDuration(240)                # paced with the unroll + focus-in
        fade.setStartValue(0.0)
        fade.setEndValue(1.0)
        fade.setEasingCurve(QEasingCurve.Type.OutCubic)
        drop = QPropertyAnimation(win, b"pos", win)
        drop.setDuration(200)
        drop.setStartValue(start)
        drop.setEndValue(final_pos)
        drop.setEasingCurve(QEasingCurve.Type.OutCubic)
        grp = QParallelAnimationGroup(win)
        grp.addAnimation(fade)
        grp.addAnimation(drop)
        # Unroll: grow the window from a short strip to full height (like Settings'
        # tab resize). The content frame is pinned at full height and anchored top, so
        # the growing window reveals it instead of squashing the layout.
        # Windows draws this translucent popup in software: resizing it every frame
        # (unroll) and the blur "focus-in" made opening stutter. There it just fades
        # and drops in.
        if not sys.platform.startswith("win"):
            grow = _make_unroll(win)
            if grow is not None:
                grp.addAnimation(grow)
            sharpen = _make_focus_in(win)
            if sharpen is not None:
                grp.addAnimation(sharpen)
        _open_anim = grp                     # keep a ref so it isn't GC'd mid-flight
        grp.start()
    except Exception as exc:
        log(f"tray-nav open anim: {exc}")
        try:
            win.move(final_pos)
            win.setWindowOpacity(1.0)
        except Exception:
            pass


def _hide() -> None:
    global _nav
    _remove_global_dismiss()
    _remove_local_dismiss()
    schedule_prebuild(500)                     # the next open is built in the background
    if _nav is not None:
        try:
            _nav.hide()
        except Exception:
            pass


_win_dismiss_timer = None


def _install_win_dismiss(widget) -> None:
    """Windows: close the navigator on a click outside it. It never takes focus (so
    there's no focus-out to watch), so poll the mouse button while it's open."""
    global _win_dismiss_timer
    import ctypes
    u32 = ctypes.windll.user32
    if _win_dismiss_timer is None:
        _win_dismiss_timer = QTimer(mw)
        _win_dismiss_timer.setInterval(50)
        state = {"was": False}

        def _tick():
            w = _nav
            if w is None or not w.isVisible():
                _win_dismiss_timer.stop()
                return
            down = bool(u32.GetAsyncKeyState(0x01) & 0x8000 or u32.GetAsyncKeyState(0x02) & 0x8000)
            if down and not state["was"] and not w.frameGeometry().contains(QCursor.pos()):
                _hide()
            state["was"] = down
        _win_dismiss_timer.timeout.connect(_tick)
    QTimer.singleShot(250, _win_dismiss_timer.start)   # ignore the click that opened it


def _natively_on_screen(w) -> bool:
    """Qt's isVisible() can go stale: macOS may order the panel out natively (e.g. on
    app deactivation / a Space switch) without telling Qt. Then the icon click took the
    'visible → hide' branch and nothing opened. Ask the NSWindow itself."""
    if sys.platform.startswith("win"):
        return w.isVisible()
    try:
        msg, _cls = _bridge()
        win = msg(c_void_p, c_void_p(int(w.winId())), b"window")
        if not win:
            return False
        if not msg(c_bool, win, b"isVisible"):
            return False
        # On screen but fully transparent (mid-fade from a stale state) also counts as
        # closed for the toggle.
        return msg(c_double, win, b"alphaValue") > 0.05
    except Exception:
        return True                           # unknown → keep the old behaviour


def show_navigator() -> None:
    """Rebuild fresh (decks/counts change) and pop the glass navigator.

    macOS only: Windows' tray (see tray.py) uses a native QMenu instead — a
    ported glass popup relying on this many native-window tricks wasn't worth
    it there, and Explorer's own menu is the more native fit anyway. The
    Windows-specific helpers elsewhere in this module (_apply_glass_panel,
    _install_win_dismiss, _anchor_point's taskbar-aware branch) stay: they're
    shared by other Windows glass popups/dialogs, not just this navigator."""
    global _nav
    if sys.platform != "darwin":
        return
    # Deterministic toggle: visible → hide, hidden → show. The global dismiss monitor
    # ignores menu-bar-strip clicks (see _install_global_dismiss), so it no longer races
    # this check — a click on the icon is handled here alone.
    if _nav is not None and _nav.isVisible() and _natively_on_screen(_nav):
        _hide()
        return
    # The same icon click may have JUST closed it (an outside-click monitor saw it
    # first) — then it's a "close" click, not a reopen.
    if time.time() - _last_hidden < 0.35:
        return
    try:
        from ..features import sfx
        sfx.play("tray")                         # soft wipe as the menu opens
    except Exception:
        pass
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
        global _prebuilt
        fresh = _prebuilt                      # built in the background, hidden
        _prebuilt = None
        if _nav is not None and _nav is not fresh:
            try:
                _nav.close(); _nav.deleteLater()
            except Exception:
                pass
            _nav = None
        _nav = fresh if fresh is not None else _build()
        try:                                   # never taller than half the screen
            from aqt.qt import QGuiApplication
            scr = QGuiApplication.screenAt(QCursor.pos()) or QGuiApplication.primaryScreen()
            _nav.setMaximumHeight(int(scr.availableGeometry().height() / 2))
        except Exception:
            pass
        _nav.adjustSize()
        _final_pos = _anchor_point(_nav)
        # Start slightly ABOVE the anchor and transparent so it drops down + fades in.
        _nav.move(_final_pos.x(), _final_pos.y() - 14)
        _nav.setWindowOpacity(0.0)
        # Set Space/level behavior BEFORE showing so the popup lands on the active
        # Space (even another app's fullscreen) rather than switching to Anki's.
        _prepare_over_fullscreen(_nav)
        _nav.show()
        _animate_open(_nav, _final_pos)
        QTimer.singleShot(400, refresh_data_bg)   # fresh counts for next time
        # Re-assert AFTER show: Qt rewrites the NSPanel's style mask / collection
        # behavior during show(), which would clobber the non-activating + all-Spaces
        # flags and let a visible Anki window pull its Space forward. No raise_()/
        # activateWindow() — those can force activation and switch Spaces.
        _prepare_over_fullscreen(_nav)
        # Outside-click dismissal (Qt.Tool has none of its own): other apps' windows
        # (global monitor) and Anki's own (app event filter).
        _install_global_dismiss()
        QTimer.singleShot(150, _install_local_dismiss)   # not the click that opened it
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
