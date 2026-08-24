"""Native window styling (vibrancy, blur, OLED, tint) + window/webview lifecycle."""

import sys
from ctypes import c_void_p, c_char_p, c_bool, c_long, c_ulong, c_double
from aqt import mw
from aqt.webview import AnkiWebView
from aqt.qt import QColor, QEvent, QObject, Qt, QTimer

from .bridge import NSRect, _bridge, _cgs
from .config import ACTIVE, _cfg
from . import amboss, card_timer, css, keytap, pomodoro, tray

# ---------------------------------------------------------------------------
# Native transparency + vibrancy
# ---------------------------------------------------------------------------

_vibrancy_installed = False
_vibrancy_view = None
_desat_view = None


def _apply_native_glass():
    global _vibrancy_installed
    if not ACTIVE or sys.platform != "darwin":
        return
    try:
        msg, cls = _bridge()
    except Exception as exc:
        print(f"[janki] ObjC bridge failed: {exc}", file=sys.stderr)
        return

    try:
        # 0. Let QT own the opacity. Without WA_TranslucentBackground, QCocoaWindow
        #    forces the NSWindow back to opaque=YES and undoes our native setOpaque:NO.
        try:
            mw.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground, True)
            mw.setAttribute(Qt.WidgetAttribute.WA_NoSystemBackground, True)
            central = mw.centralWidget()
            if central:
                central.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground, True)
                central.setAutoFillBackground(False)
        except Exception as exc:
            print(f"[janki] Qt attrs: {exc}", file=sys.stderr)

        nsview = c_void_p(int(mw.winId()))
        window = msg(c_void_p, nsview, b"window")
        if not window:
            print("[janki] no NSWindow", file=sys.stderr)
            return

        # 1. Window transparent (reinforce at the native layer).
        msg(None, window, b"setOpaque:", (c_bool,), (False,))
        clear = msg(c_void_p, cls("NSColor"), b"clearColor")
        if clear:
            msg(None, window, b"setBackgroundColor:", (c_void_p,), (clear,))

        # 2. Insert NSVisualEffectView as a SIBLING directly behind Anki's Qt view
        #    (same superview, ordered below). We do NOT reparent or swap the
        #    contentView, so Qt's view never moves — no offset. The Qt view is
        #    transparent (WA_TranslucentBackground + transparent page), so the
        #    vibrancy blurs the live desktop through it.
        if not _vibrancy_installed:
            old = msg(c_void_p, window, b"contentView")       # Qt's QNSView
            superview = msg(c_void_p, old, b"superview") if old else None
            if old and superview:
                frame = msg(NSRect, old, b"frame")            # matches Qt view exactly
                NSVEV = cls("NSVisualEffectView")
                ev = msg(c_void_p, NSVEV, b"alloc")
                ev = msg(c_void_p, ev, b"initWithFrame:", (NSRect,), (frame,))
                if ev:
                    material = int(_cfg().get("material", 21))  # underWindowBackground
                    msg(None, ev, b"setBlendingMode:", (c_long,), (0,))   # behindWindow
                    msg(None, ev, b"setMaterial:", (c_long,), (material,))
                    msg(None, ev, b"setState:", (c_long,), (1,))          # active
                    msg(None, ev, b"setAutoresizingMask:", (c_ulong,), (18,))  # w|h
                    # addSubview:positioned:relativeTo:  NSWindowBelow(-1) old
                    msg(None, superview, b"addSubview:positioned:relativeTo:",
                        (c_void_p, c_long, c_void_p), (ev, -1, old))
                    _vibrancy_installed = True

        msg(None, window, b"invalidateShadow")
        msg(None, window, b"displayIfNeeded")

        # Qt may only apply the opacity change when it reconfigures the native
        # surface. Nudge it (1px resize — safe, unlike hide/show), then re-assert.
        QTimer.singleShot(60, _reassert_transparent)
    except Exception as exc:
        print(f"[janki] native glass failed: {exc}", file=sys.stderr)


def _install_vibrancy():
    """Insert a native NSVisualEffectView as a sibling directly behind Anki's Qt
    view (no reparent → no offset), giving real live desktop blur."""
    if not ACTIVE or sys.platform != "darwin":
        return
    global _vibrancy_installed
    if _vibrancy_installed:
        return
    try:
        msg, cls = _bridge()
        window = msg(c_void_p, c_void_p(int(mw.winId())), b"window")
        if not window:
            return
        old = msg(c_void_p, window, b"contentView")            # Qt's QNSView
        superview = msg(c_void_p, old, b"superview") if old else None
        if not (old and superview):
            return
        # Size to the whole window frame (superview bounds) so the glass also
        # covers the titlebar strip, not just the content area.
        frame = msg(NSRect, superview, b"bounds")
        NSVEV = cls("NSVisualEffectView")
        ev = msg(c_void_p, NSVEV, b"alloc")
        ev = msg(c_void_p, ev, b"initWithFrame:", (NSRect,), (frame,))
        if not ev:
            return
        material = int(_cfg().get("material", 21))
        msg(None, ev, b"setBlendingMode:", (c_long,), (0,))    # behindWindow
        msg(None, ev, b"setMaterial:", (c_long,), (material,))
        msg(None, ev, b"setState:", (c_long,), (1,))           # active
        msg(None, ev, b"setAutoresizingMask:", (c_ulong,), (18,))  # w|h
        msg(None, superview, b"addSubview:positioned:relativeTo:",
            (c_void_p, c_long, c_void_p), (ev, -1, old))        # -1 = NSWindowBelow
        global _vibrancy_view, _desat_view
        _vibrancy_view = ev

        # Neutralizing grey overlay on top of the blur (subview of the effect
        # view, so it sits behind Anki's content) to desaturate blue → grey.
        NSView = cls("NSView")
        ov = msg(c_void_p, NSView, b"alloc")
        ov = msg(c_void_p, ov, b"initWithFrame:", (NSRect,), (frame,))
        msg(None, ov, b"setWantsLayer:", (c_bool,), (True,))
        msg(None, ov, b"setAutoresizingMask:", (c_ulong,), (18,))
        _desat_view = ov
        _apply_desat(float(_cfg().get("neutralize", 0.35)))
        msg(None, ev, b"addSubview:", (c_void_p,), (ov,))

        _apply_frost_alpha(float(_cfg().get("frost_alpha", 1.0)))
        _apply_blur(float(_cfg().get("blur_radius", 0)))
        _vibrancy_installed = True
    except Exception as exc:
        print(f"[janki] vibrancy install: {exc}", file=sys.stderr)


def _apply_desat(alpha: float):
    """Set the grey overlay's colour (white 0.5 at `alpha`) to desaturate the
    frost toward neutral grey."""
    if sys.platform != "darwin" or not _desat_view:
        return
    try:
        msg, cls = _bridge()
        white = float(_cfg().get("desat_gray", 0.30))  # lower = darker neutral
        col = msg(c_void_p, cls("NSColor"), b"colorWithWhite:alpha:",
                  (c_double, c_double), (white, max(0.0, min(1.0, alpha))))
        cg = msg(c_void_p, col, b"CGColor")
        layer = msg(c_void_p, _desat_view, b"layer")
        if layer and cg:
            msg(None, layer, b"setBackgroundColor:", (c_void_p,), (cg,))
    except Exception as exc:
        print(f"[janki] desat: {exc}", file=sys.stderr)


def _set_neutralize(alpha: float):
    cfg = _cfg()
    cfg["neutralize"] = round(float(alpha), 2)
    mw.addonManager.writeConfig(__name__, cfg)
    _apply_desat(alpha)


def _apply_frost_alpha(a: float):
    """Fade the whole vibrancy layer. Lower = more see-through to the real
    (sharp) desktop; 1.0 = full frost."""
    if sys.platform != "darwin" or not _vibrancy_view:
        return
    try:
        msg, _cls = _bridge()
        msg(None, _vibrancy_view, b"setAlphaValue:", (c_double,),
            (max(0.0, min(1.0, float(a))),))
    except Exception as exc:
        print(f"[janki] frost alpha: {exc}", file=sys.stderr)


def _set_frost_alpha(a: float):
    cfg = _cfg()
    cfg["frost_alpha"] = round(float(a), 2)
    mw.addonManager.writeConfig(__name__, cfg)
    _apply_frost_alpha(a)


def _apply_blur(radius: float):
    """Add an adjustable Core Image Gaussian blur to the frost layer (the native
    material's own blur is fixed, so we layer an extra CIGaussianBlur we can
    control). radius<=0 clears it."""
    if sys.platform != "darwin" or not _desat_view:
        return
    try:
        msg, cls = _bridge()

        def nsstr(s):
            return msg(c_void_p, cls("NSString"), b"stringWithUTF8String:",
                       (c_char_p,), (s.encode(),))

        layer = msg(c_void_p, _desat_view, b"layer")
        if not layer:
            return
        if radius <= 0:
            empty = msg(c_void_p, cls("NSArray"), b"array")
            msg(None, layer, b"setBackgroundFilters:", (c_void_p,), (empty,))
            return
        filt = msg(c_void_p, cls("CIFilter"), b"filterWithName:",
                   (c_void_p,), (nsstr("CIGaussianBlur"),))
        if not filt:
            return
        msg(None, filt, b"setDefaults")
        num = msg(c_void_p, cls("NSNumber"), b"numberWithDouble:",
                  (c_double,), (float(radius),))
        msg(None, filt, b"setValue:forKey:", (c_void_p, c_void_p),
            (num, nsstr("inputRadius")))
        arr = msg(c_void_p, cls("NSArray"), b"arrayWithObject:", (c_void_p,), (filt,))
        msg(None, layer, b"setMasksToBounds:", (c_bool,), (True,))
        msg(None, layer, b"setBackgroundFilters:", (c_void_p,), (arr,))
    except Exception as exc:
        print(f"[janki] blur: {exc}", file=sys.stderr)


def _set_blur(radius: float):
    cfg = _cfg()
    cfg["blur_radius"] = int(radius)
    mw.addonManager.writeConfig(__name__, cfg)
    _apply_window_blur(radius)


def _apply_window_blur(radius: float):
    """Set the window's background blur radius via the CGS window server."""
    if sys.platform != "darwin":
        return
    try:
        lib = _cgs()
        if not lib:
            print("[janki] CGS blur API unavailable", file=sys.stderr)
            return
        msg, _cls = _bridge()
        win = msg(c_void_p, c_void_p(int(mw.winId())), b"window")
        if not win:
            return
        wid = msg(c_long, win, b"windowNumber")
        cid = lib.CGSMainConnectionID()
        lib.CGSSetWindowBackgroundBlurRadius(cid, int(wid), max(0, int(radius)))
    except Exception as exc:
        print(f"[janki] window blur: {exc}", file=sys.stderr)


# Common NSVisualEffectMaterial values, roughly light→neutral→dark/opaque.
MATERIALS = [
    ("Under", 21), ("Content", 18), ("Window", 12),
    ("Sidebar", 7), ("HUD (grey)", 13), ("Titlebar", 3),
]


def _set_material(m: int):
    """Change the vibrancy material live (controls how grey/opaque the frost is)."""
    if not ACTIVE:
        return
    cfg = _cfg()
    cfg["material"] = int(m)
    mw.addonManager.writeConfig(__name__, cfg)
    if sys.platform == "darwin" and _vibrancy_view:
        try:
            msg, _cls = _bridge()
            msg(None, _vibrancy_view, b"setMaterial:", (c_long,), (int(m),))
        except Exception as exc:
            print(f"[janki] set material: {exc}", file=sys.stderr)


# ---------------------------------------------------------------------------
# OLED mode: solid black background while in full-screen
# ---------------------------------------------------------------------------

_oled_active = False


def _set_window_black(on: bool):
    """Native: make the window opaque black (OLED) instantly. The off-state is
    handled by _reapply_native, which restores the translucent tint."""
    if sys.platform != "darwin" or not on:
        return
    try:
        msg, cls = _bridge()
        win = msg(c_void_p, c_void_p(int(mw.winId())), b"window")
        if not win:
            return
        black = msg(c_void_p, cls("NSColor"), b"blackColor")
        msg(None, win, b"setOpaque:", (c_bool,), (True,))
        if black:
            msg(None, win, b"setBackgroundColor:", (c_void_p,), (black,))
    except Exception as exc:
        print(f"[janki] oled window: {exc}", file=sys.stderr)


def _set_oled(on: bool):
    """Toggle OLED (solid-black in full-screen). ON: instant black window + black
    webviews, no blur. OFF: fully restore the glass (transparency/tint/blur/corners)."""
    global _oled_active
    _oled_active = on
    if on:
        _set_window_black(True)   # native + instant → no grey flash during transition
        _apply_window_blur(0)
    js = (
        "(function(){var h=document.documentElement,b=document.body;if(!b)return;"
        + ("h.style.setProperty('background','#000','important');"
           "b.style.setProperty('background-color','#000','important');" if on else
           "h.style.setProperty('background','transparent','important');"
           "b.style.setProperty('background-color','transparent','important');")
        + "})();"
    )
    try:
        central = mw.centralWidget()
        for v in ([c for c in central.children() if isinstance(c, AnkiWebView)] if central else []):
            try:
                v.eval(js)
                v.page().setBackgroundColor(
                    QColor(Qt.GlobalColor.black) if on else QColor(Qt.GlobalColor.transparent)
                )
            except Exception:
                pass
    except Exception:
        pass
    if not on:
        _reapply_native()   # restore the full glass exactly as it was


def _sync_oled():
    """Apply OLED state based on config + current full-screen status."""
    cfg = _cfg()
    want = bool(cfg.get("oled_fullscreen", False)) and mw.isFullScreen()
    if want != _oled_active:
        _set_oled(want)


def _apply_always_on_top(on: bool) -> None:
    from PyQt6.QtCore import Qt
    mw.setWindowFlag(Qt.WindowType.WindowStaysOnTopHint, on)
    mw.show()


def _reload_all_webviews():
    if not ACTIVE:
        return
    # Wake the WebEngine renderer before reloading — it stays suspended while
    # the NSApp is inactive (e.g. after minimize or when a floating window like
    # the coherence HUD holds focus). Without this the views reload blank.
    try:
        _msg, _cls = _bridge()
        _ns_app = _msg(c_void_p, _cls(b"NSApplication"), b"sharedApplication")
        _msg(c_void_p, _ns_app, b"activateIgnoringOtherApps:", (c_bool,), (True,))
        # Also bring the main Anki NSWindow to front explicitly so the HUD
        # floating window doesn't retain key-window status.
        main_ns = _msg(c_void_p, c_void_p(int(mw.winId())), b"window")
        if main_ns:
            _msg(c_void_p, main_ns, b"makeKeyAndOrderFront:", (c_void_p,), (None,))
    except Exception:
        pass
    # Reload every known webview: mw.web (main content), toolbar, and any
    # AnkiWebView found as a child of centralWidget.
    views_to_reload = []
    try:
        if getattr(mw, 'web', None):
            views_to_reload.append(mw.web)
        tb = getattr(mw, 'toolbar', None)
        tb_web = getattr(tb, 'web', None) if tb else None
        if tb_web and tb_web not in views_to_reload:
            views_to_reload.append(tb_web)
        central = mw.centralWidget()
        for v in ([c for c in central.children() if isinstance(c, AnkiWebView)] if central else []):
            if v not in views_to_reload:
                views_to_reload.append(v)
    except Exception:
        pass
    for v in views_to_reload:
        try:
            v.reload()
        except Exception:
            pass


def _wake_main_webviews():
    """Un-blank the MAIN window after restore-from-minimize.

    Root cause (confirmed via logging): after de-miniaturizing, the native
    NSWindow is on screen but Qt still believes the QMainWindow is hidden
    (mw.isVisible() == False) — so every child webview reports itself invisible
    and QtWebEngine never paints it. The fix is to re-sync Qt's visibility state
    by calling mw.show() (which re-shows the whole widget tree), then explicitly
    show each webview so its surface repaints."""
    if not ACTIVE:
        return
    try:
        was_vis = mw.isVisible()
    except Exception:
        was_vis = None
    # Re-sync Qt's visibility state with the actual on-screen native window.
    try:
        if not mw.isVisible():
            mw.show()
        mw.raise_()
        mw.activateWindow()
    except Exception:
        pass
    # Bring the native window forward + activate the app.
    try:
        _msg, _cls = _bridge()
        _ns_app = _msg(c_void_p, _cls(b"NSApplication"), b"sharedApplication")
        _msg(c_void_p, _ns_app, b"activateIgnoringOtherApps:", (c_bool,), (True,))
        main_ns = _msg(c_void_p, c_void_p(int(mw.winId())), b"window")
        if main_ns:
            _msg(None, main_ns, b"makeKeyAndOrderFront:", (c_void_p,), (None,))
    except Exception:
        pass
    # Explicitly show each webview so its surface is re-created and repaints.
    try:
        views = []
        if getattr(mw, 'web', None):
            views.append(mw.web)
        r = getattr(mw, 'reviewer', None)
        rweb = getattr(r, 'web', None) if r else None
        if rweb and rweb not in views:
            views.append(rweb)
        central = mw.centralWidget()
        for v in ([c for c in central.children() if isinstance(c, AnkiWebView)] if central else []):
            if v not in views:
                views.append(v)
        for v in views:
            try:
                v.show()
                v.update()
            except Exception:
                pass
        keytap._gtap_log(f"[restore] _wake: was_vis={was_vis} now_vis={mw.isVisible()} "
                  f"views={len(views)} vis={[v.isVisible() for v in views]}")
    except Exception as e:
        keytap._gtap_log(f"[restore] _wake error: {e}")


def _reapply_native():
    """Re-assert the full native glass stack (transparency + tint + corners +
    blur). Idempotent and cheap; called with retries at startup and whenever the
    window is activated, so a cold Launch-Services start can't leave it opaque."""
    if not ACTIVE or sys.platform != "darwin":
        return
    try:
        if _oled_active:
            # OLED is on — keep it black; do NOT re-apply glass over it.
            _set_window_black(True)
            _apply_window_blur(0)
            return
        _clear_existing_webviews()     # transparent page bg on ALL webviews
        _assert_window_transparent()   # setOpaque:NO (+ _apply_window_tint at end)
        _unify_titlebar()              # re-assert transparent titlebar (breaks on fullscreen)
        _round_corners(_cfg().get("win_corner_radius", 11))
        _apply_window_blur(_cfg().get("blur_radius", 20))
    except Exception as exc:
        print(f"[janki] reapply: {exc}", file=sys.stderr)


class _FullscreenWatcher(QObject):
    def __init__(self):
        super().__init__()
        self._restore_pending = False  # True between minimize and first WindowActivate

    def eventFilter(self, obj, ev):
        try:
            t = ev.type()
            if t == QEvent.Type.Close and obj is mw:
                # Red-button close should quit everything: tear down the floating
                # coherence HUD / XP bar so no stray window keeps the app alive.
                # (Skipped when tray-minimize is intercepting the close.)
                if not (_cfg().get("tray_minimize", False)
                        and tray._tray_icon and tray._tray_icon.isVisible()):
                    tray._teardown_glass_windows()
            elif t == QEvent.Type.WindowStateChange:
                # Apply OLED synchronously & instantly (no grey-before-black flash).
                _sync_oled()
                # fullscreen enter/exit animates (~1s) and rebuilds the frame —
                # re-assert at several points as it settles (respects OLED).
                for d in (80, 400, 900, 1400):
                    QTimer.singleShot(d, _reapply_native)
                if card_timer._card_timer_instance:          # realign the top timer bar after the frame settles
                    for d in (0, 450, 1000):
                        QTimer.singleShot(d, card_timer._card_timer_instance.reposition)
                # Reveal/hide AMBOSS term underlines as fullscreen settles.
                for d in (0, 450, 1000):
                    QTimer.singleShot(d, amboss._apply_amboss_underlines)
                # Detect restore from minimised: old state had WindowMinimized,
                # current state does not.  Reload webviews the same way the
                # tray-open path does so glass CSS is re-injected.
                was_min = bool(ev.oldState() & Qt.WindowState.WindowMinimized)
                is_min  = bool(mw.windowState() & Qt.WindowState.WindowMinimized)
                if is_min and not was_min:
                    self._restore_pending = True
                    if pomodoro._pomo_instance:
                        pomodoro._pomo_instance._xp.hide()
                    if card_timer._card_timer_instance:
                        card_timer._card_timer_instance.hide_bar()
                elif was_min and not is_min:
                    self._restore_pending = True
                    # Wake the MAIN window's suspended webviews — the real
                    # blank-on-restore fix when the coherence HUD is open.
                    QTimer.singleShot(100, _wake_main_webviews)
                    QTimer.singleShot(400, _wake_main_webviews)
                    if pomodoro._pomo_instance and pomodoro._pomo_instance._ticker.isActive() and pomodoro._pomo_instance._in_review:
                        def _restore_xp():
                            pomodoro._pomo_instance._xp.reposition()
                            pomodoro._pomo_instance._xp.show()
                        QTimer.singleShot(420, _restore_xp)
            elif t == QEvent.Type.WindowActivate:
                # self-heal: re-assert glass when the window becomes active
                QTimer.singleShot(30, _reapply_native)
                # If we're returning from minimized, wake the main webviews now
                # that the window is actually active.
                if self._restore_pending:
                    self._restore_pending = False
                    QTimer.singleShot(60, _wake_main_webviews)
            elif t in (QEvent.Type.Move, QEvent.Type.Resize):
                # Keep the XP bar aligned with the Anki window
                if pomodoro._pomo_instance and pomodoro._pomo_instance._xp.isVisible():
                    pomodoro._pomo_instance._xp.reposition()
                # Keep the full-screen break-due tint aligned with the window
                if pomodoro._pomo_instance and pomodoro._pomo_instance._tint.isVisible():
                    pomodoro._pomo_instance._tint.reposition()
                # Keep the card-timer bar aligned with the top toolbar button
                # island. Reposition now and again after the toolbar DOM has
                # re-laid-out (its width follows the window a beat later).
                if card_timer._card_timer_instance:
                    card_timer._card_timer_instance.reposition()
                    QTimer.singleShot(120, card_timer._card_timer_instance.reposition)
        except Exception:
            pass
        return False


_fs_watcher = None


def _install_fullscreen_watcher():
    global _fs_watcher
    if _fs_watcher is None:
        _fs_watcher = _FullscreenWatcher()
        mw.installEventFilter(_fs_watcher)


def _unify_titlebar():
    """Merge the macOS title bar into the window: transparent titlebar, hidden
    title text, and full-size content view so the glass extends to the very top.
    Traffic-light buttons remain (they float over the content)."""
    if not ACTIVE or sys.platform != "darwin":
        return
    try:
        msg, cls = _bridge()
        win = msg(c_void_p, c_void_p(int(mw.winId())), b"window")
        if not win:
            return
        # Transparent titlebar + hidden title. We deliberately do NOT touch
        # styleMask (FullSizeContentView) — changing it out from under Qt aborts
        # the process. Instead the vibrancy view spans the full window (below),
        # so the glass shows continuously through the transparent titlebar.
        msg(None, win, b"setTitlebarAppearsTransparent:", (c_bool,), (True,))
        msg(None, win, b"setTitleVisibility:", (c_long,), (1,))     # NSWindowTitleHidden
    except Exception as exc:
        print(f"[janki] titlebar: {exc}", file=sys.stderr)


def _round_layer(msg, view, radius):
    """Round one native view's layer."""
    try:
        msg(None, view, b"setWantsLayer:", (c_bool,), (True,))
        layer = msg(c_void_p, view, b"layer")
        if layer:
            msg(None, layer, b"setCornerRadius:", (c_double,), (float(radius),))
            msg(None, layer, b"setMasksToBounds:", (c_bool,), (True,))
            return layer
    except Exception:
        pass
    return None


def _round_corners(radius: float):
    """Round the window's outer corners. QtWebEngine surfaces ignore the parent
    content-view mask, so we round each webview's own layer, only on the corners
    that face the window edge (top webview → top corners, bottom → bottom), so no
    notches appear between the stacked webviews."""
    if sys.platform != "darwin":
        return
    # CACornerMask bits (non-flipped coords: MaxY = visual top)
    BL, BR, TL, TR = 1, 2, 4, 8
    try:
        msg, _cls = _bridge()
        win = msg(c_void_p, c_void_p(int(mw.winId())), b"window")
        if not win:
            return
        cv = msg(c_void_p, win, b"contentView")
        if not cv:
            return
        _round_layer(msg, cv, radius)  # harmless; clips Qt's own drawing
        # Round the frame views ABOVE the content view too — the CGS background
        # blur follows the window's frame-view shape, not the content layer.
        parent = msg(c_void_p, cv, b"superview")
        for _ in range(2):
            if not parent:
                break
            _round_layer(msg, parent, radius)
            parent = msg(c_void_p, parent, b"superview")

        subs = msg(c_void_p, cv, b"subviews")
        if not subs:
            return
        n = int(msg(c_ulong, subs, b"count"))
        views = []
        for i in range(n):
            sv = msg(c_void_p, subs, b"objectAtIndex:", (c_ulong,), (i,))
            if not sv:
                continue
            f = msg(NSRect, sv, b"frame")
            views.append((sv, f.origin.y, f.origin.y + f.size.height))
        if not views:
            return
        top_edge = max(v[2] for v in views)
        bot_edge = min(v[1] for v in views)
        for sv, miny, maxy in views:
            mask = 0
            if maxy >= top_edge - 1:
                mask |= TL | TR
            if miny <= bot_edge + 1:
                mask |= BL | BR
            if mask:
                layer = _round_layer(msg, sv, radius)
                if layer:
                    msg(None, layer, b"setMaskedCorners:", (c_ulong,), (mask,))
    except Exception as exc:
        print(f"[janki] round corners: {exc}", file=sys.stderr)


def _assert_window_transparent():
    """Safe: just force the NSWindow non-opaque with a clear background. No
    reparenting / vibrancy (so no misalignment). Belt-and-suspenders in case Qt
    resets the opacity that the source patch set at creation."""
    if not ACTIVE or sys.platform != "darwin":
        return
    try:
        msg, cls = _bridge()
        win = msg(c_void_p, c_void_p(int(mw.winId())), b"window")
        if not win:
            return
        msg(None, win, b"setOpaque:", (c_bool,), (False,))
        msg(None, win, b"invalidateShadow")
        msg(None, win, b"displayIfNeeded")
    except Exception as exc:
        print(f"[janki] assert transparent: {exc}", file=sys.stderr)
    _apply_window_tint()


def _apply_window_tint():
    """Set the window's background to the tint colour + opacity. This is the ONE
    uniform tint, sitting behind every (transparent) webview, so the colour
    applies equally across the whole window. A minimum alpha is kept so the
    window still has a rounded structural shape for the CGS blur to clip to."""
    if sys.platform != "darwin":
        return
    try:
        cfg = _cfg()
        mode = cfg.get("tint_mode", "custom")
        if mode == "light":
            r, g, b = 255, 255, 255
        elif mode == "dark":
            r, g, b = 18, 20, 30
        else:
            try:
                r, g, b = css._hex_to_rgb(cfg.get("tint_color", "#1e1e1e"))
            except Exception:
                r, g, b = 30, 30, 30
        a = max(0.06, float(cfg.get("body_opacity", 0.25)))  # keep shape for corners
        msg, cls = _bridge()
        win = msg(c_void_p, c_void_p(int(mw.winId())), b"window")
        if not win:
            return
        col = msg(c_void_p, cls("NSColor"), b"colorWithRed:green:blue:alpha:",
                  (c_double, c_double, c_double, c_double),
                  (r / 255.0, g / 255.0, b / 255.0, a))
        if col:
            msg(None, win, b"setOpaque:", (c_bool,), (False,))
            msg(None, win, b"setBackgroundColor:", (c_void_p,), (col,))
    except Exception as exc:
        print(f"[janki] window tint: {exc}", file=sys.stderr)


def _force_recreate_translucent():
    """Destroy + recreate the native window so its surface is rebuilt WITH an
    alpha channel (only way to get true translucency when WA_TranslucentBackground
    wasn't set at original creation time). setWindowFlags() forces the recreate."""
    if not ACTIVE:
        return
    try:
        mw.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground, True)
        mw.setAttribute(Qt.WidgetAttribute.WA_NoSystemBackground, True)
        central = mw.centralWidget()
        if central:
            central.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground, True)
            central.setAutoFillBackground(False)

        global _vibrancy_installed
        _vibrancy_installed = False  # native tree is rebuilt; allow re-insert

        # Force Qt to rebuild the platform window with the current attributes.
        flags = mw.windowFlags()
        mw.setWindowFlags(flags)
        mw.show()

        # Re-apply native glass (window transparency + vibrancy) on the new window.
        QTimer.singleShot(150, _apply_native_glass)
        QTimer.singleShot(300, _clear_existing_webviews)
        QTimer.singleShot(400, lambda: (mw.web.reload() if mw.web else None))
    except Exception as exc:
        print(f"[janki] recreate failed: {exc}", file=sys.stderr)


def _reassert_transparent():
    if not ACTIVE:
        return
    try:
        msg, cls = _bridge()
        window = msg(c_void_p, c_void_p(int(mw.winId())), b"window")
        if window:
            msg(None, window, b"setOpaque:", (c_bool,), (False,))
            clear = msg(c_void_p, cls("NSColor"), b"clearColor")
            if clear:
                msg(None, window, b"setBackgroundColor:", (c_void_p,), (clear,))
            msg(None, window, b"invalidateShadow")
        g = mw.geometry()
        mw.resize(g.width() + 1, g.height())
        mw.resize(g.width(), g.height())
    except Exception as exc:
        print(f"[janki] reassert failed: {exc}", file=sys.stderr)


# ---------------------------------------------------------------------------
# Webview transparency
# ---------------------------------------------------------------------------

_orig_webview_init = AnkiWebView.__init__


def _patched_webview_init(self, *a, **k):
    _orig_webview_init(self, *a, **k)
    if not ACTIVE:
        return
    try:
        self.page().setBackgroundColor(QColor(Qt.GlobalColor.transparent))
    except Exception:
        pass


if ACTIVE:
    AnkiWebView.__init__ = _patched_webview_init


def _clear_existing_webviews():
    if not ACTIVE:
        return
    try:
        central = mw.centralWidget()
        views = [c for c in central.children() if isinstance(c, AnkiWebView)] if central else []
        for v in views:
            try:
                v.page().setBackgroundColor(QColor(Qt.GlobalColor.transparent))
            except Exception:
                pass
    except Exception:
        pass
