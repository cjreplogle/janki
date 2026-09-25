"""Native window styling (vibrancy, blur, OLED, tint) + window/webview lifecycle."""

import os
import shutil
import sys
from ctypes import c_void_p, c_char_p, c_bool, c_long, c_ulong, c_double
from aqt import mw
from aqt.webview import AnkiWebView
from aqt.qt import QColor, QEvent, QObject, Qt, QTimer

from ..util.bridge import NSRect, _bridge, _cgs
from ..util.config import log, GLASS, _cfg
from ..features import card_timer, pomodoro
from . import css
from ..system import tray
from ..util import keytap
from ..integrations import amboss

# ---------------------------------------------------------------------------
# Native transparency + vibrancy
# ---------------------------------------------------------------------------

_vibrancy_installed = False
_vibrancy_view = None
_desat_view = None
# Custom background photo: two native views inserted directly behind Qt's QNSView
# (so they show through the transparent webviews) — a layer-backed image view and,
# on top of it, a tint overlay driven by the same Opacity/tint config as the glass,
# so the photo reads as frosted glass over the image. Recreated if None (freed on
# window recreate).
_bg_image_view = None
_bg_tint_view = None
_bg_loaded_path = None   # path of the image currently decoded into the layer
_bg_chosen = None        # session-picked image from the pool (stable until restart)
_bg_blur_installed = False  # whether the named CIGaussianBlur filter is on the layer
_bg_blur_cur = 0.0          # current effective blur radius (animate-from value)


def _apply_native_glass():
    global _vibrancy_installed
    if not GLASS or sys.platform != "darwin":
        return
    try:
        msg, cls = _bridge()
    except Exception as exc:
        log(f"ObjC bridge failed: {exc}")
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
            log(f"Qt attrs: {exc}")

        nsview = c_void_p(int(mw.winId()))
        window = msg(c_void_p, nsview, b"window")
        if not window:
            log("no NSWindow")
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
        log(f"native glass failed: {exc}")


def _install_vibrancy():
    """Insert a native NSVisualEffectView as a sibling directly behind Anki's Qt
    view (no reparent → no offset), giving real live desktop blur."""
    if not GLASS or sys.platform != "darwin":
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
        log(f"vibrancy install: {exc}")


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
        log(f"desat: {exc}")


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
        log(f"frost alpha: {exc}")


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
        log(f"blur: {exc}")


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
            log("CGS blur API unavailable")
            return
        msg, _cls = _bridge()
        win = msg(c_void_p, c_void_p(int(mw.winId())), b"window")
        if not win:
            return
        wid = msg(c_long, win, b"windowNumber")
        cid = lib.CGSMainConnectionID()
        lib.CGSSetWindowBackgroundBlurRadius(cid, int(wid), max(0, int(radius)))
    except Exception as exc:
        log(f"window blur: {exc}")
    _restyle_glass_dialogs()


# Common NSVisualEffectMaterial values, roughly light→neutral→dark/opaque.
MATERIALS = [
    ("Under", 21), ("Content", 18), ("Window", 12),
    ("Sidebar", 7), ("HUD (grey)", 13), ("Titlebar", 3),
]


def _set_material(m: int):
    """Change the vibrancy material live (controls how grey/opaque the frost is)."""
    if not GLASS:
        return
    cfg = _cfg()
    cfg["material"] = int(m)
    mw.addonManager.writeConfig(__name__, cfg)
    if sys.platform == "darwin" and _vibrancy_view:
        try:
            msg, _cls = _bridge()
            msg(None, _vibrancy_view, b"setMaterial:", (c_long,), (int(m),))
        except Exception as exc:
            log(f"set material: {exc}")


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
        log(f"oled window: {exc}")


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
    if not GLASS:
        return                         # OLED is a glass-edition feature only
    cfg = _cfg()
    want = bool(cfg.get("oled_fullscreen", False)) and mw.isFullScreen()
    if want != _oled_active:
        _set_oled(want)


def _apply_always_on_top(on: bool) -> None:
    """Keep the main window in front. Uses the NATIVE NSWindow level rather than Qt's
    WindowStaysOnTopHint: mw.setWindowFlag() RECREATES the platform window, which on
    macOS drops fullscreen and blanks the window (the intermittent 'kicked out of
    fullscreen to a blank window' glitch). setLevel does the same job with no recreate.
    Falls back to the Qt flag only off macOS / if the native bridge is unavailable."""
    if sys.platform == "darwin":
        try:
            msg, _cls = _bridge()
            ns = msg(c_void_p, c_void_p(int(mw.winId())), b"window")
            if ns:
                # 3 = NSFloatingWindowLevel, 0 = NSNormalWindowLevel.
                msg(None, ns, b"setLevel:", (c_long,), (3 if on else 0,))
                return
        except Exception as exc:
            log("always-on-top (native): %s" % exc)
    try:
        from PyQt6.QtCore import Qt
        mw.setWindowFlag(Qt.WindowType.WindowStaysOnTopHint, on)
        mw.show()
    except Exception as exc:
        log("always-on-top (qt): %s" % exc)


# While a Janki-owned dialog is open, keep the "Always in front" main window from
# floating over it. Both windows share the same StaysOnTop level, so their order
# is by whoever was fronted last — which lets the main window intermittently jump
# ahead of a freshly-opened dialog. We fix this by *natively* lowering the MAIN
# window's NSWindow level while the dialog lives (no Qt flag toggling, so the
# vibrancy/glass is untouched), then restoring it when the last dialog closes.
_aot_suspend_depth = 0
_aot_saved_level = None


def hold_dialog_above(dialog) -> None:
    """Ensure `dialog` isn't covered by the always-in-front main window. No-op
    unless Always-in-front is on (and on macOS). Reference-counted so nested/
    multiple dialogs restore correctly."""
    global _aot_suspend_depth, _aot_saved_level
    if sys.platform != "darwin" or not _cfg().get("always_on_top", False):
        return
    try:
        msg, _cls = _bridge()
        ns = msg(c_void_p, c_void_p(int(mw.winId())), b"window")
        if not ns:
            return
        if _aot_suspend_depth == 0:
            _aot_saved_level = int(msg(c_long, ns, b"level"))
            msg(None, ns, b"setLevel:", (c_long,), (0,))     # NSNormalWindowLevel
        _aot_suspend_depth += 1
    except Exception as exc:
        log("hold_dialog_above: %s" % exc)
        return

    def _release(*_a):
        global _aot_suspend_depth, _aot_saved_level
        if _aot_suspend_depth <= 0:
            return
        _aot_suspend_depth -= 1
        if _aot_suspend_depth == 0:
            try:
                msg, _cls = _bridge()
                ns = msg(c_void_p, c_void_p(int(mw.winId())), b"window")
                if ns and _aot_saved_level is not None:
                    msg(None, ns, b"setLevel:", (c_long,), (_aot_saved_level,))
            except Exception:
                pass
            _aot_saved_level = None

    try:
        dialog.finished.connect(_release)        # QDialog: fires once, on close
    except Exception:
        try:
            dialog.destroyed.connect(_release)
        except Exception:
            pass


def float_dialog_above(dialog) -> None:
    """Raise `dialog`'s own NSWindow to the floating level so it stays above the main
    window regardless of always-on-top state or a later restore of the main window.
    Used when a dialog is opened from the tray while the main window is hidden — the
    main window could otherwise be brought back (Dock click) and cover it. Restores
    the dialog's normal level when it closes. No-op off macOS."""
    if sys.platform != "darwin":
        return
    try:
        msg, _cls = _bridge()
        ns = msg(c_void_p, c_void_p(int(dialog.winId())), b"window")
        if not ns:
            return
        # 3 = NSFloatingWindowLevel; sits above the normal main window (level 0). Only
        # relative to Janki's own windows in practice, since it drops back on close.
        msg(None, ns, b"setLevel:", (c_long,), (3,))
    except Exception as exc:
        log("float_dialog_above: %s" % exc)
        return

    def _restore(*_a):
        try:
            msg, _cls = _bridge()
            ns = msg(c_void_p, c_void_p(int(dialog.winId())), b"window")
            if ns:
                msg(None, ns, b"setLevel:", (c_long,), (0,))
        except Exception:
            pass
    try:
        dialog.finished.connect(_restore)
    except Exception:
        try:
            dialog.destroyed.connect(_restore)
        except Exception:
            pass


def _reload_all_webviews():
    if not GLASS:
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
    # In the reviewer, the card HTML is set via JS AFTER the page loads (not from a
    # reloadable URL), so mw.web.reload() unloads the card and nothing re-renders it.
    # Re-show the current side instead — that re-sets content and re-fires our CSS
    # hook, applying the new font without losing the card. Skip mw.web from the plain
    # reload list in this case.
    in_review = False
    try:
        rv = getattr(mw, 'reviewer', None)
        if getattr(mw, 'state', None) == 'review' and rv and getattr(rv, 'card', None):
            in_review = True
    except Exception:
        pass
    # Reload every known webview: mw.web (main content), toolbar, and any
    # AnkiWebView found as a child of centralWidget.
    views_to_reload = []
    try:
        if getattr(mw, 'web', None) and not in_review:
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
    # The toolbar injects our CSS via the webview_will_set_content hook, which only
    # fires when content is SET — a plain .reload() re-renders the existing HTML
    # without re-running injection, so a font/theme change wouldn't reach the nav
    # items until restart. Redraw it to re-set content and re-fire the hook.
    try:
        tb = getattr(mw, 'toolbar', None)
        if tb:
            tb.draw()
    except Exception:
        pass
    # Re-render the open card (question or answer, whichever is showing) so the
    # reviewer picks up the new CSS without unloading the card.
    if in_review:
        try:
            rv = mw.reviewer
            if getattr(rv, 'state', None) == 'answer':
                rv._showAnswer()
            else:
                rv._showQuestion()
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
    if not GLASS:
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


def _reclaim_app_focus():
    """Pull Anki to the front right after launch. Janki.app starts Anki via `just run`
    from a shell, so Terminal grabs focus back a beat later — which deactivates Anki
    and knocks an OLED native-fullscreen Space out to the desktop (the 'loaded then
    lost focus/fullscreen' glitch). Re-activating ourselves a few times beats that."""
    if sys.platform != "darwin":
        return
    try:
        msg, cls = _bridge()
        nsapp = msg(c_void_p, cls("NSApplication"), b"sharedApplication")
        if nsapp:
            msg(None, nsapp, b"activateIgnoringOtherApps:", (c_bool,), (True,))
    except Exception as exc:
        log(f"reclaim focus: {exc}")
    try:
        mw.raise_()
        mw.activateWindow()
    except Exception:
        pass


def _frontmost_app_name() -> str:
    try:
        from ctypes import c_char_p
        msg, cls = _bridge()
        ws = msg(c_void_p, cls("NSWorkspace"), b"sharedWorkspace")
        app = msg(c_void_p, ws, b"frontmostApplication") if ws else None
        nm = msg(c_void_p, app, b"localizedName") if app else None
        b = msg(c_char_p, nm, b"UTF8String") if nm else None
        return b.decode("utf-8", "replace") if b else ""
    except Exception:
        return ""


_focus_guard_until = 0.0
_focus_guard_hooked = False
# Terminal-family launcher apps that host `just run` / the AnkiGlass script.
_LAUNCHER_APPS = ("Terminal", "iTerm2", "iTerm", "kitty", "Alacritty", "WezTerm")


def install_launch_focus_guard(seconds: float = 25.0) -> None:
    """For the first `seconds` after launch, if the LAUNCHER terminal steals focus
    (Janki.app runs Anki from a shell, so Terminal grabs it back and knocks an OLED
    native-fullscreen Space to the desktop), grab focus straight back. Scoped to the
    launcher apps + a short window so it never fights the user switching apps later."""
    global _focus_guard_until, _focus_guard_hooked
    if sys.platform != "darwin":
        return
    import time
    _focus_guard_until = time.time() + seconds
    if _focus_guard_hooked:
        return
    _focus_guard_hooked = True
    try:
        def _on_state(st):
            try:
                import time as _t
                if _t.time() > _focus_guard_until:
                    return
                if st != Qt.ApplicationState.ApplicationInactive:
                    return
                if _frontmost_app_name() in _LAUNCHER_APPS:
                    QTimer.singleShot(0, _reclaim_app_focus)
                    QTimer.singleShot(120, _reclaim_app_focus)
            except Exception:
                pass
        mw.app.applicationStateChanged.connect(_on_state)
    except Exception as exc:
        log(f"launch focus guard: {exc}")


def _reapply_native():
    """Re-assert the full native glass stack (transparency + tint + corners +
    blur). Idempotent and cheap; called with retries at startup and whenever the
    window is activated, so a cold Launch-Services start can't leave it opaque."""
    if not GLASS or sys.platform != "darwin":
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
        log(f"reapply: {exc}")


class _FullscreenWatcher(QObject):
    def __init__(self):
        super().__init__()
        self._restore_pending = False  # True between minimize and first WindowActivate
        self._reclear_pending = False  # debounce for re-clearing webview bg on resize

    def eventFilter(self, obj, ev):
        try:
            t = ev.type()
            if t == QEvent.Type.Close and obj is mw:
                # Red-button close should quit everything: tear down the floating
                # coherence HUD / XP bar so no stray window keeps the app alive.
                # (Skipped when tray-minimize is intercepting the close — gate on the
                # SETTING only; isVisible() is unreliable on newer macOS.)
                if not _cfg().get("tray_minimize", False):
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
                # Show/hide the reviewer Edit/More (only in fullscreen) as it settles.
                from . import css as _css
                for d in (0, 450, 1000):
                    QTimer.singleShot(d, _css._sync_reviewer_fs)
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
                # A fullscreen slide (or any resize) can leave the top toolbar / bottom
                # bar webviews with their opaque theme background instead of transparent
                # — they then show as grey bars along the top/bottom. The WindowStateChange
                # re-assert runs at fixed delays that can fire BEFORE the macOS transition
                # settles; keying off the actual geometry change catches the final frame
                # regardless of timing. Debounced so the animation's resize storm coalesces.
                if t == QEvent.Type.Resize and not self._reclear_pending:
                    self._reclear_pending = True
                    def _reclear():
                        self._reclear_pending = False
                        _clear_existing_webviews()
                    QTimer.singleShot(200, _reclear)
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
    if not GLASS or sys.platform != "darwin":
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
        log(f"titlebar: {exc}")


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
        log(f"round corners: {exc}")


def _assert_window_transparent():
    """Safe: just force the NSWindow non-opaque with a clear background. No
    reparenting / vibrancy (so no misalignment). Belt-and-suspenders in case Qt
    resets the opacity that the source patch set at creation."""
    if not GLASS or sys.platform != "darwin":
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
        log(f"assert transparent: {exc}")
    _apply_window_tint()
    _apply_bg_image()


def _tint_rgb(cfg=None):
    """The (r,g,b) of the current glass tint, honouring tint_mode/tint_color."""
    cfg = cfg or _cfg()
    mode = cfg.get("tint_mode", "custom")
    if mode == "light":
        return 255, 255, 255
    if mode == "dark":
        return 18, 20, 30
    try:
        return css._hex_to_rgb(cfg.get("tint_color", "#1e1e1e"))
    except Exception:
        return 30, 30, 30


def _apply_window_tint():
    """Set the window's background to the tint colour + opacity. This is the ONE
    uniform tint, sitting behind every (transparent) webview, so the colour
    applies equally across the whole window. A minimum alpha is kept so the
    window still has a rounded structural shape for the CGS blur to clip to."""
    if sys.platform != "darwin":
        return
    try:
        cfg = _cfg()
        r, g, b = _tint_rgb(cfg)
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
        log(f"window tint: {exc}")
    _restyle_glass_dialogs()


# ---------------------------------------------------------------------------
# Glass dialogs (Settings etc.) — same tint/opacity/blur as the main window
# ---------------------------------------------------------------------------

_glass_dialogs = []      # live dialogs that follow the main window's glass settings

def _tint_is_light(cfg=None) -> bool:
    r, g, b = _tint_rgb(cfg)
    return (0.299 * r + 0.587 * g + 0.114 * b) > 150


def _glass_dialog_qss(light: bool) -> str:
    """Qt paints opaque fills on container widgets (tab panes, lists, text boxes). Replace
    them with faint translucent panels so the native tint + blur shows through every
    panel, matching the main window. Small controls (buttons, fields) keep native style."""
    ink = "0,0,0" if light else "255,255,255"       # overlay/border tone vs. the tint
    fg = "#1c1c1e" if light else "#f2f2f7"
    # Styling an indicator drops Qt's native tick, so reuse Anki's own themed checkmark
    # (the same image its checkboxes use) for checked table/list cells.
    try:
        from aqt.theme import theme_manager
        check = theme_manager.themed_icon("mdi:check")
        tick = " QAbstractItemView::indicator:checked { image: url(%s); }" % check
    except Exception:
        tick = ""
    return tick + (
        "QDialog { background: transparent; }"
        "QScrollArea, QScrollArea > QWidget, QScrollArea > QWidget > QWidget,"
        " QStackedWidget, QStackedWidget > QWidget { background: transparent; border: none; }"
        # Tab panes (top-level + nested subtabs) → translucent rounded panels.
        "QTabWidget::pane { background: rgba(%(ink)s,0.05);"
        " border: 1px solid rgba(%(ink)s,0.10); border-radius: 10px; top: -1px;"
        # Anki's app stylesheet adds `padding-top: 1em` to every pane — override it, or
        # each panel keeps a line of dead space above its contents / subtabs.
        " padding: 0; }"
        "QTabWidget::tab-bar { alignment: center; }"
        "QTabBar { background: transparent; }"
        "QTabBar::tab { background: transparent; color: rgba(%(ink)s,0.70);"
        " padding: 4px 12px; margin: 0 2px 6px 2px; border-radius: 6px; border: none; }"
        # Tab pill fills are painted smoothly by _SmoothControls (QSS fills alias).
        "QTabBar::tab:hover { background: transparent; }"
        "QTabBar::tab:selected { background: transparent; color: %(fg)s; }"
        # List / tree / text panels.
        "QTreeWidget, QTreeView, QListWidget, QListView, QTextEdit, QPlainTextEdit,"
        " QTableWidget, QTableView { background: rgba(%(ink)s,0.05); color: %(fg)s;"
        " border: 1px solid rgba(%(ink)s,0.10); border-radius: 6px; }"
        "QHeaderView, QHeaderView::section { background: transparent; color: rgba(%(ink)s,0.65);"
        " border: none; }"
        "QGroupBox { background: rgba(%(ink)s,0.04); border: 1px solid rgba(%(ink)s,0.10);"
        " border-radius: 8px; margin-top: 14px; }"
        "QGroupBox::title { subcontrol-origin: margin; left: 8px; }"
        # Controls: replace Anki's navy fills / faint edges with glass-tone fills and a
        # clear, consistent outline.
        # Fills + outlines of these controls are PAINTED (anti-aliased) by
        # _SmoothControls — Qt clips stylesheet rounded fills/borders without AA, which
        # left jagged corners. The QSS keeps sizing/text and transparent paint so the
        # :hover rules still make Qt repaint on hover.
        "QPushButton { background: transparent; color: %(fg)s;"
        " border: 1px solid transparent; border-radius: 6px; padding: 4px 12px; }"
        "QPushButton:hover, QPushButton:pressed, QPushButton:default {"
        " background: transparent; border: 1px solid transparent; }"
        "QPushButton:disabled { color: rgba(%(ink)s,0.35); background: transparent;"
        " border: 1px solid transparent; }"
        "QComboBox { background: transparent; color: %(fg)s;"
        " border: 1px solid transparent; border-radius: 6px; padding: 3px 8px; }"
        "QComboBox:hover { background: transparent; }"
        "QComboBox::drop-down { border: none; background: transparent; }"
        # List-style popup (not the full-height macOS menu) so maxVisibleItems applies
        # and long lists scroll instead of filling the screen.
        "QComboBox { combobox-popup: 0; }"
        "QComboBox QAbstractItemView { background: %(popa)s; color: %(fg)s; outline: 0;"
        " border: 1px solid rgba(%(ink)s,0.14); border-radius: 10px; padding: 4px; }"
        "QComboBox QAbstractItemView::item { padding: 4px 10px; min-height: 22px;"
        " border-radius: 6px; }"
        "QComboBox QAbstractItemView::item:hover,"
        " QComboBox QAbstractItemView::item:selected { background: rgba(%(ink)s,0.12);"
        " color: %(fg)s; }"
        "QComboBox QAbstractItemView QScrollBar:vertical { width: 6px; background: transparent;"
        " margin: 4px 2px; }"
        "QComboBox QAbstractItemView QScrollBar::handle:vertical {"
        " background: rgba(%(ink)s,0.22); border-radius: 3px; min-height: 24px; }"
        "QComboBox QAbstractItemView QScrollBar::add-line,"
        " QComboBox QAbstractItemView QScrollBar::sub-line { height: 0; }"
        "QLineEdit, QSpinBox, QDoubleSpinBox { background: transparent; color: %(fg)s;"
        " border: 1px solid transparent; border-radius: 6px; padding: 2px 6px; }"
        # Checkboxes (standalone + table/list cells): the box is painted smoothly; the
        # QSS keeps only its size and the checkmark image. Hover/focus rules from Anki's
        # stylesheet (2px ring) are neutralised so they can't draw an aliased ring.
        "QCheckBox::indicator, QAbstractItemView::indicator { width: 14px; height: 14px;"
        " border: 1px solid transparent; border-radius: 4px; background: transparent; }"
        "QCheckBox::indicator:hover, QCheckBox::indicator:focus,"
        " QCheckBox::indicator:checked, QCheckBox::indicator:checked:hover,"
        " QAbstractItemView::indicator:checked {"
        " width: 14px; height: 14px; border: 1px solid transparent; background: transparent; }"
        "QTableView, QTableWidget { gridline-color: rgba(%(ink)s,0.08); }"
        "QProgressBar { background: rgba(%(ink)s,0.06); color: %(fg)s; text-align: center;"
        " border: 1px solid rgba(%(ink)s,0.14); border-radius: 4px; min-height: 8px; }"
        "QProgressBar::chunk { background: rgba(%(ink)s,0.38); border-radius: 3px; }"
        "QHeaderView::section { border: none; border-bottom: 1px solid rgba(%(ink)s,0.10);"
        " padding: 2px 4px; }"
    ) % {"ink": ink, "fg": fg,
         "popa": "rgba(246,246,248,0.72)" if light else "rgba(30,31,36,0.62)"}


# ---------------------------------------------------------------------------
# Anti-aliased control painting for glass dialogs
# ---------------------------------------------------------------------------

def _ink_rgb():
    return (0, 0, 0) if _tint_is_light() else (255, 255, 255)


def _rr(p, rect, radius, fill_a, border_a, ink):
    from aqt.qt import QColor, QPen, Qt as _Qt
    if border_a > 0:
        p.setPen(QPen(QColor(ink[0], ink[1], ink[2], int(border_a * 255)), 1.0))
    else:
        p.setPen(QPen(_Qt.PenStyle.NoPen))
    p.setBrush(QColor(ink[0], ink[1], ink[2], int(fill_a * 255)))
    p.drawRoundedRect(rect, radius, radius)


def _paint_control(w) -> None:
    from aqt.qt import (QPainter, QRectF, QPushButton, QComboBox, QLineEdit,
                        QAbstractSpinBox, QCheckBox, QTabBar, QStyle, QStyleOptionButton,
                        QCursor)
    ink = _ink_rgb()
    p = QPainter(w)
    p.setRenderHint(QPainter.RenderHint.Antialiasing, True)
    try:
        full = QRectF(w.rect()).adjusted(0.5, 0.5, -0.5, -0.5)
        hover = w.underMouse()
        if isinstance(w, QPushButton):
            if w.isFlat():
                return
            if not w.isEnabled():
                _rr(p, full, 6, 0.04, 0.10, ink)
            else:
                fill = 0.05 if w.isDown() else (0.13 if hover else 0.08)
                border = 0.45 if (w.isDefault() or w.autoDefault() and w.hasFocus()) else 0.20
                _rr(p, full, 6, fill, border, ink)
        elif isinstance(w, QComboBox):
            _rr(p, full, 6, 0.10 if hover else 0.06, 0.18, ink)
        elif isinstance(w, QAbstractSpinBox):
            _rr(p, full, 6, 0.06, 0.18, ink)
        elif isinstance(w, QLineEdit):
            par = w.parentWidget()
            if isinstance(par, (QAbstractSpinBox, QComboBox)):
                return                                  # the parent paints the frame
            _rr(p, full, 6, 0.06, 0.18, ink)
        elif isinstance(w, QCheckBox):
            opt = QStyleOptionButton()
            w.initStyleOption(opt)
            r = w.style().subElementRect(QStyle.SubElement.SE_CheckBoxIndicator, opt, w)
            box = QRectF(r).adjusted(0.5, 0.5, -0.5, -0.5)
            on = w.isChecked()
            _rr(p, box, 4, 0.16 if on else (0.10 if hover else 0.06),
                0.55 if on else 0.40, ink)
        elif isinstance(w, QTabBar):
            pos = w.mapFromGlobal(QCursor.pos())
            for i in range(w.count()):
                tr = w.tabRect(i)
                r = QRectF(tr).adjusted(2.5, 0.5, -2.5, -6.5)   # QSS tab margins
                if i == w.currentIndex():
                    _rr(p, r, 6, 0.16, 0, ink)
                elif tr.contains(pos):
                    _rr(p, r, 6, 0.08, 0, ink)
    finally:
        p.end()


def _make_check_delegate(parent):
    """A QStyledItemDelegate that paints the item checkbox's box anti-aliased, then lets
    the default painting draw the text + checkmark image on top."""
    from aqt.qt import QStyledItemDelegate, QStyleOptionViewItem, QStyle, QPainter, QRectF
    from aqt.qt import Qt as _Qt

    class _SmoothCheckDelegate(QStyledItemDelegate):
        def paint(self, painter, option, index):
            try:
                if index.data(_Qt.ItemDataRole.CheckStateRole) is not None:
                    opt = QStyleOptionViewItem(option)
                    self.initStyleOption(opt, index)
                    wdg = opt.widget
                    st = wdg.style() if wdg is not None else None
                    if st is not None:
                        r = st.subElementRect(
                            QStyle.SubElement.SE_ItemViewItemCheckIndicator, opt, wdg)
                        on = opt.checkState == _Qt.CheckState.Checked
                        painter.save()
                        painter.setRenderHint(QPainter.RenderHint.Antialiasing, True)
                        _rr(painter, QRectF(r).adjusted(0.5, 0.5, -0.5, -0.5), 4,
                            0.16 if on else 0.06, 0.55 if on else 0.40, _ink_rgb())
                        painter.restore()
            except Exception:
                pass
            super().paint(painter, option, index)

    return _SmoothCheckDelegate(parent)


class _SmoothControls(QObject):
    """App-wide filter, active ONLY for widgets inside registered glass dialogs: paints
    anti-aliased rounded fills/outlines under buttons, combos, fields, checkboxes and tab
    pills before they draw their own text (whose QSS fills are transparent)."""

    def eventFilter(self, obj, ev):
        t = ev.type()
        if t != QEvent.Type.Paint and t != QEvent.Type.Polish:
            return False
        try:
            if not hasattr(obj, "window"):
                return False
            if obj.window() not in _glass_dialogs and not _in_glass_host(obj):
                return False
            from aqt.qt import (QPushButton, QComboBox, QLineEdit, QAbstractSpinBox,
                                QCheckBox, QTabBar, QAbstractItemView, QStyledItemDelegate)
            if t == QEvent.Type.Polish:
                if isinstance(obj, QAbstractItemView) and \
                        type(obj.itemDelegate()) is QStyledItemDelegate:
                    obj.setItemDelegate(_make_check_delegate(obj))
                elif isinstance(obj, (QComboBox, QPushButton, QCheckBox, QTabBar)):
                    obj.setAttribute(Qt.WidgetAttribute.WA_Hover, True)
                return False
            if isinstance(obj, (QPushButton, QComboBox, QLineEdit, QAbstractSpinBox,
                                QCheckBox, QTabBar)):
                _paint_control(obj)
        except Exception:
            pass
        return False


_glass_hosts = []        # embedded glass panels inside the main window (e.g. Statistics)


def register_glass_host(widget) -> None:
    """Paint the controls inside `widget` smoothly (like a glass dialog's) even though it
    lives inside the main window rather than its own glass dialog."""
    if widget not in _glass_hosts:
        _glass_hosts.append(widget)
        try:
            widget.destroyed.connect(lambda *_a, w=widget: _glass_hosts.remove(w)
                                     if w in _glass_hosts else None)
        except Exception:
            pass
    _install_smooth_controls()


def _in_glass_host(obj) -> bool:
    for h in _glass_hosts:
        try:
            if h is obj or h.isAncestorOf(obj):
                return h.isVisible()
        except Exception:
            continue
    return False


_smooth_controls = None


def _install_smooth_controls() -> None:
    global _smooth_controls
    if _smooth_controls is None:
        try:
            from aqt.qt import QApplication
            _smooth_controls = _SmoothControls()
            QApplication.instance().installEventFilter(_smooth_controls)
        except Exception as exc:
            log(f"smooth controls: {exc}")


class _DragByBackground(QObject):
    """With the content extended under the titlebar there's no titlebar to grab, so a
    left-press on the dialog's own empty background starts a native window drag.
    (Presses on controls are consumed by them and never reach the dialog.)"""

    def eventFilter(self, obj, ev):
        try:
            if ev.type() == QEvent.Type.MouseButtonPress \
                    and ev.button() == Qt.MouseButton.LeftButton:
                wh = obj.windowHandle()
                if wh is not None and wh.startSystemMove():
                    return True
        except Exception:
            pass
        return False


def glass_dialog(dialog) -> None:
    """Frost `dialog` like the main window. Call BEFORE the dialog is first shown (the
    translucent-background attribute has to be set before its native window exists);
    the native half is applied on show and re-applied whenever tint/blur change."""
    if not GLASS or sys.platform != "darwin":
        return
    try:
        dialog.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground, True)
        # Extend the content up under the (transparent) titlebar so there's no empty
        # strip above it — the close button floats over the top-left (Qt 6.9+).
        wt = Qt.WindowType
        if hasattr(wt, "ExpandedClientAreaHint"):
            dialog.setWindowFlag(wt.ExpandedClientAreaHint, True)
            if hasattr(wt, "NoTitleBarBackgroundHint"):
                dialog.setWindowFlag(wt.NoTitleBarBackgroundHint, True)
            wa = Qt.WidgetAttribute
            if hasattr(wa, "WA_ContentsMarginsRespectsSafeArea"):
                dialog.setAttribute(wa.WA_ContentsMarginsRespectsSafeArea, False)
            dialog._jk_expanded = True
            dialog._jk_drag = _DragByBackground(dialog)
            dialog.installEventFilter(dialog._jk_drag)
        dialog._jk_base_qss = dialog.styleSheet() or ""
        dialog._jk_light = _tint_is_light()
        dialog.setStyleSheet(_glass_dialog_qss(dialog._jk_light) + dialog._jk_base_qss)
    except Exception as exc:
        log(f"glass dialog qt: {exc}")
        return
    _glass_dialogs.append(dialog)
    _install_smooth_controls()

    def _forget(*_a):
        try:
            _glass_dialogs.remove(dialog)
        except ValueError:
            pass
    try:
        dialog.finished.connect(_forget)
        dialog.destroyed.connect(_forget)
    except Exception:
        pass


def hide_titlebar_extras(dialog) -> None:
    """Close-only titlebar: hide the minimize + zoom (green) buttons and the title text
    (the title string stays set, so Mission Control / the Window menu still name it)."""
    if sys.platform != "darwin":
        return
    try:
        msg, _cls = _bridge()
        win = msg(c_void_p, c_void_p(int(dialog.winId())), b"window")
        if not win:
            return
        msg(None, win, b"setTitleVisibility:", (c_long,), (1,))     # NSWindowTitleHidden
        for which in (1, 2):             # NSWindowMiniaturizeButton, NSWindowZoomButton
            btn = msg(c_void_p, win, b"standardWindowButton:", (c_long,), (which,))
            if btn:
                msg(None, btn, b"setHidden:", (c_bool,), (True,))
    except Exception as exc:
        log(f"titlebar extras: {exc}")


def _style_glass_window(dialog) -> None:
    try:
        cfg = _cfg()
        r, g, b = _tint_rgb(cfg)
        # A touch more tint than the main window so form controls stay readable.
        a = min(1.0, max(0.35, float(cfg.get("body_opacity", 0.25)) + 0.1))
        msg, cls = _bridge()
        win = msg(c_void_p, c_void_p(int(dialog.winId())), b"window")
        if not win:
            return
        col = msg(c_void_p, cls("NSColor"), b"colorWithRed:green:blue:alpha:",
                  (c_double, c_double, c_double, c_double),
                  (r / 255.0, g / 255.0, b / 255.0, a))
        msg(None, win, b"setOpaque:", (c_bool,), (False,))
        if col:
            msg(None, win, b"setBackgroundColor:", (c_void_p,), (col,))
        msg(None, win, b"setTitlebarAppearsTransparent:", (c_bool,), (True,))
        hide_titlebar_extras(dialog)
        lib = _cgs()
        if lib:
            wid = msg(c_long, win, b"windowNumber")
            lib.CGSSetWindowBackgroundBlurRadius(
                lib.CGSMainConnectionID(), int(wid),
                max(0, int(cfg.get("blur_radius", 50))))
        msg(None, win, b"invalidateShadow")
    except Exception as exc:
        log(f"glass dialog native: {exc}")


def restyle_glass_dialog_now(dialog) -> None:
    """Synchronous variant — call right after each resize step of an animated resize so
    the titlebar never shows a frame without its glass."""
    if dialog in _glass_dialogs:
        try:
            _style_glass_window(dialog)
        except Exception:
            pass


def restyle_glass_dialog(dialog) -> None:
    """Re-assert one glass dialog's native styling (after a resize / repaint that Qt may
    have reset). Deferred a tick so it lands after Qt finishes its own window update."""
    if dialog not in _glass_dialogs:
        return
    def _go():
        try:
            if dialog.isVisible():
                _style_glass_window(dialog)
        except Exception:
            pass
    QTimer.singleShot(0, _go)


def _restyle_glass_dialogs() -> None:
    light = _tint_is_light()
    for d in list(_glass_dialogs):
        try:
            if not d.isVisible():
                continue
            _style_glass_window(d)
            # Only re-polish the (large) stylesheet when the tint flips light↔dark, not on
            # every opacity/blur slider tick.
            if getattr(d, "_jk_light", None) != light:
                d._jk_light = light
                import re
                font = re.findall(r"/\*janki-widget-font\*/[^\n]*\n?", d.styleSheet() or "")
                d.setStyleSheet(_glass_dialog_qss(light) + getattr(d, "_jk_base_qss", "")
                                + "\n" + "".join(font))
        except Exception:
            pass


class _GlassPopupShow(QObject):
    """On each show of a combo's popup window, give it the tray menu's rounded native
    glass (blur behind, clear corners, soft shadow)."""

    def eventFilter(self, obj, ev):
        if ev.type() == QEvent.Type.Show:
            def _go(w=obj):
                try:
                    from ..system import tray_nav
                    tray_nav._apply_glass_panel(w, corner=10)
                except Exception as exc:
                    log(f"glass popup: {exc}")
            QTimer.singleShot(0, _go)
        return False


_popup_filter = None


def glass_combo_popup(combo, max_rows: int = 10) -> None:
    """Calmer dropdown for long lists: at most `max_rows` visible (the rest scroll) and
    a translucent, blurred, rounded popup matching the glass theme."""
    global _popup_filter
    try:
        combo.setMaxVisibleItems(max_rows)
        # Force the scrolling list popup (not the full-height macOS menu, which ignores
        # maxVisibleItems) on the combo itself so no app-level rule can undo it.
        combo.setStyleSheet((combo.styleSheet() or "") + "QComboBox { combobox-popup: 0; }")
    except Exception:
        pass
    if not GLASS or sys.platform != "darwin":
        return
    try:
        view = combo.view()
        cont = view.window() if view is not None else None      # the popup container
        if cont is None or cont is combo.window():
            return
        # Style the list view DIRECTLY: Anki's app stylesheet (navy popup) otherwise
        # wins over the dialog-level rule for this separate popup window.
        light = _tint_is_light()
        ink = "0,0,0" if light else "255,255,255"
        fg = "#1c1c1e" if light else "#f2f2f7"
        bg = "rgba(246,246,248,0.72)" if light else "rgba(30,31,36,0.62)"
        view.setStyleSheet(
            ("QAbstractItemView { background: %(bg)s; color: %(fg)s; outline: 0;"
             " border: 1px solid rgba(%(ink)s,0.14); border-radius: 10px; padding: 4px;"
             " selection-background-color: rgba(%(ink)s,0.12); selection-color: %(fg)s; }"
             "QAbstractItemView::item { padding: 4px 10px; min-height: 22px;"
             " border-radius: 6px; background: transparent; }"
             "QAbstractItemView::item:hover, QAbstractItemView::item:selected {"
             " background: rgba(%(ink)s,0.12); color: %(fg)s; }"
             "QScrollBar:vertical { width: 6px; background: transparent; margin: 4px 2px; }"
             "QScrollBar::handle:vertical { background: rgba(%(ink)s,0.22);"
             " border-radius: 3px; min-height: 24px; }"
             "QScrollBar::add-line, QScrollBar::sub-line { height: 0; }")
            % {"bg": bg, "fg": fg, "ink": ink})
        try:
            view.viewport().setAutoFillBackground(False)
        except Exception:
            pass
        if _popup_filter is None:
            _popup_filter = _GlassPopupShow()
        cont.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground, True)
        cont.setWindowFlag(Qt.WindowType.FramelessWindowHint, True)
        # Scoped to the container only — the list view inside keeps its translucent tint.
        cont.setStyleSheet("QComboBoxPrivateContainer { background: transparent;"
                           " border: none; }")
        cont.installEventFilter(_popup_filter)
    except Exception as exc:
        log(f"glass combo popup: {exc}")


# ---------------------------------------------------------------------------
# Glass tooltips — hover tooltips (Qt's QTipLabel) + Janki's notification tooltip
# ---------------------------------------------------------------------------

def _tip_colors():
    light = _tint_is_light()
    r, g, b = _tint_rgb()
    ink = (0, 0, 0) if light else (255, 255, 255)
    return (r, g, b, 0.55), (*ink, 0.14), ("#1c1c1e" if light else "#f2f2f7")


def paint_glass_pill(widget, radius: float = 8.0) -> None:
    """Anti-aliased rounded tint + hairline border across `widget` (call from a paint
    event filter, before the widget draws its own text)."""
    try:
        from aqt.qt import QPainter, QColor, QPen, QRectF
        (br, bg_, bb, ba), (ir, ig, ib, ia), _fg = _tip_colors()
        p = QPainter(widget)
        p.setRenderHint(QPainter.RenderHint.Antialiasing, True)
        p.setPen(QPen(QColor(ir, ig, ib, int(ia * 255)), 1.0))
        p.setBrush(QColor(br, bg_, bb, int(ba * 255)))
        p.drawRoundedRect(QRectF(widget.rect()).adjusted(0.5, 0.5, -0.5, -0.5), radius, radius)
        p.end()
    except Exception:
        pass


def frost_popup_window(widget, corner: int = 8) -> None:
    """Rounded native blur + clear corners + soft shadow on a small popup window (same
    treatment as the tray menu)."""
    def _go():
        try:
            from ..system import tray_nav
            if widget.isVisible():
                tray_nav._apply_glass_panel(widget, corner=corner)
        except Exception as exc:
            log(f"frost popup: {exc}")
    QTimer.singleShot(0, _go)


class _GlassTooltipFilter(QObject):
    """App-wide: catches Qt's hover-tooltip window (QTipLabel) as it's created, makes it
    translucent before its native window exists, paints a smooth rounded glass pill under
    its text and frosts the window natively on show."""

    def eventFilter(self, obj, ev):
        try:
            t = ev.type()
            if t not in (QEvent.Type.Polish, QEvent.Type.Show, QEvent.Type.Paint):
                return False
            mo = obj.metaObject() if hasattr(obj, "metaObject") else None
            if mo is None or mo.className() != "QTipLabel":
                return False
            if t == QEvent.Type.Polish and not getattr(obj, "_jk_glass_tip", False):
                obj._jk_glass_tip = True
                obj.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground, True)
                _bg, _bd, fg = _tip_colors()
                obj.setStyleSheet("QLabel { background: transparent; border: none;"
                                  " color: %s; padding: 5px 9px; }" % fg)
            elif t == QEvent.Type.Show:
                frost_popup_window(obj, corner=8)
            elif t == QEvent.Type.Paint:
                paint_glass_pill(obj, 8.0)
        except Exception:
            pass
        return False


class _GlassOnShow(QObject):
    """Re-asserts a glass dialog's native styling each time it's shown, and fades /
    drops it in (it starts at opacity 0 — see _smooth_progress_dialog)."""

    def eventFilter(self, obj, ev):
        if ev.type() == QEvent.Type.Show:
            def _go(w=obj):
                try:
                    if w.isVisible():
                        _style_glass_window(w)
                        hide_titlebar_extras(w)
                except Exception:
                    pass
            QTimer.singleShot(0, _go)
            _fade_window(obj, 0.0, 1.0, 200, drop=8)
        return False


def _fade_window(w, frm, to, ms, drop=0, then=None):
    """Animate a top-level window's opacity (and optionally a small vertical drop-in)."""
    try:
        from aqt.qt import (QPropertyAnimation, QEasingCurve, QParallelAnimationGroup,
                            QPoint)
        grp = QParallelAnimationGroup(w)
        fade = QPropertyAnimation(w, b"windowOpacity", w)
        fade.setDuration(ms)
        fade.setStartValue(float(frm))
        fade.setEndValue(float(to))
        fade.setEasingCurve(QEasingCurve.Type.OutCubic if to > frm
                            else QEasingCurve.Type.InCubic)
        grp.addAnimation(fade)
        if drop:
            end = w.pos()
            mv = QPropertyAnimation(w, b"pos", w)
            mv.setDuration(ms + 40)
            mv.setStartValue(QPoint(end.x(), end.y() - drop))
            mv.setEndValue(end)
            mv.setEasingCurve(QEasingCurve.Type.OutCubic)
            grp.addAnimation(mv)
        if then is not None:
            grp.finished.connect(then)
        w._jk_fade_anim = grp                      # keep a ref while running
        grp.start()
    except Exception:
        try:
            w.setWindowOpacity(to)
        except Exception:
            pass
        if then is not None:
            then()


_PB_SCALE = 1000   # progress bars run on a finer internal scale so steps can glide


def _smooth_progress_dialog(dlg) -> None:
    """Make Anki's progress window feel smooth: start transparent (faded in on show),
    fade out on close instead of vanishing, glide the bar between values, and drop
    Anki's navy striped bar style so the glass progress-bar style applies."""
    try:
        dlg.setWindowOpacity(0.0)
    except Exception:
        pass
    bar = getattr(getattr(dlg, "form", None), "progressBar", None)
    if bar is None:
        return
    try:
        from aqt.qt import QPropertyAnimation, QEasingCurve
        bar.setStyleSheet("")                   # Anki's per-bar navy stripes → glass QSS
        o_min, o_max, o_val = bar.setMinimum, bar.setMaximum, bar.setValue
        anim = QPropertyAnimation(bar, b"value", bar)
        anim.setDuration(240)
        anim.setEasingCurve(QEasingCurve.Type.OutCubic)

        def setMinimum(v):
            o_min(int(v) * _PB_SCALE)

        def setMaximum(v):
            v = int(v)
            if v <= 0:                           # busy / indeterminate
                anim.stop()
                o_min(0); o_max(0)
            else:
                o_max(v * _PB_SCALE)

        def setValue(v):
            if bar.maximum() <= 0:
                return                           # indeterminate: nothing to glide
            target = int(v) * _PB_SCALE
            anim.stop()
            anim.setStartValue(bar.value())
            anim.setEndValue(target)
            anim.start()

        bar.setMinimum, bar.setMaximum, bar.setValue = setMinimum, setMaximum, setValue
        # Anki's start() already set the range before we wrapped — rescale it now.
        mx = bar.maximum()
        if mx > 0:
            o_max(mx * _PB_SCALE)
    except Exception as exc:
        log(f"progress smooth: {exc}")


def _wrap_progress_cancel(cls) -> None:
    """ProgressDialog.cancel() = hide + deleteLater (an abrupt vanish). Fade out first."""
    if getattr(cls, "_jk_cancel_wrapped", False):
        return
    orig = cls.cancel

    def cancel(self):
        if getattr(self, "_jk_fading_out", False):
            return
        self._jk_fading_out = True
        try:
            self._closingDown = True             # what orig sets — lets it close now
            if not self.isVisible():
                return orig(self)
            _fade_window(self, self.windowOpacity(), 0.0, 160,
                         then=lambda s=self: orig(s))
        except Exception:
            orig(self)
    cls.cancel = cancel
    cls._jk_cancel_wrapped = True


_glass_on_show = None


def install_anki_dialog_glass() -> None:
    """Give Anki's own progress window ("Syncing…", "Processing…") the same glass as
    Janki's windows by wrapping ProgressDialog.__init__ — its layout exists by then but
    its native window doesn't, so translucency can still be set. Installed at add-on
    import so the launch sync's window is caught too."""
    if not GLASS or sys.platform != "darwin":
        return
    try:
        from aqt import progress as _prog
        cls = getattr(_prog, "ProgressDialog", None)
        if cls is None or getattr(cls, "_jk_glass_wrapped", False):
            return
        orig = cls.__init__

        def __init__(self, *a, **k):
            orig(self, *a, **k)
            global _glass_on_show
            try:
                glass_dialog(self)
                from . import css as _css
                _css.apply_widget_ui_font(self)
                lay = self.layout()
                if lay is not None and getattr(self, "_jk_expanded", False):
                    m = lay.contentsMargins()      # clear the close button / titlebar
                    lay.setContentsMargins(m.left(), m.top() + 22, m.right(), m.bottom())
                # Fade-in handler FIRST: _smooth_progress_dialog starts the window at
                # opacity 0, so it must never be left without the handler that shows it.
                if _glass_on_show is None:
                    _glass_on_show = _GlassOnShow()
                self.installEventFilter(_glass_on_show)
                _smooth_progress_dialog(self)
            except Exception as exc:
                log(f"progress glass: {exc}")

        cls.__init__ = __init__
        cls._jk_glass_wrapped = True
        _wrap_progress_cancel(cls)
    except Exception as exc:
        log(f"anki dialog glass: {exc}")


_tip_filter = None


def install_glass_tooltips() -> None:
    global _tip_filter
    if not GLASS or sys.platform != "darwin" or _tip_filter is not None:
        return
    try:
        from aqt.qt import QApplication
        app = QApplication.instance()
        if app is None:
            return
        _tip_filter = _GlassTooltipFilter()
        app.installEventFilter(_tip_filter)
    except Exception as exc:
        log(f"glass tooltips: {exc}")


def bring_dialog_to_front(dialog) -> None:
    """Show `dialog` in front of the Janki window, even when Anki isn't the active app
    (opened via a global hotkey / tray) or the main window sits at a raised level
    (always-in-front, lockdown, caption). Also applies the glass styling if registered."""
    try:
        dialog.show()
        dialog.raise_()
        dialog.activateWindow()
    except Exception:
        pass
    if sys.platform != "darwin":
        return
    if dialog in _glass_dialogs:
        _style_glass_window(dialog)
    try:
        msg, cls = _bridge()
        nsapp = msg(c_void_p, cls("NSApplication"), b"sharedApplication")
        if nsapp:
            msg(None, nsapp, b"activateIgnoringOtherApps:", (c_bool,), (True,))
        win = msg(c_void_p, c_void_p(int(dialog.winId())), b"window")
        if not win:
            return
        # Match a raised main window's level so ordering-front actually lands above it.
        main = msg(c_void_p, c_void_p(int(mw.winId())), b"window")
        if main:
            lvl = int(msg(c_long, main, b"level"))
            if lvl > int(msg(c_long, win, b"level")):
                msg(None, win, b"setLevel:", (c_long,), (lvl,))
        msg(None, win, b"makeKeyAndOrderFront:", (c_void_p,), (None,))
        msg(None, win, b"orderFrontRegardless")
    except Exception as exc:
        log(f"bring dialog front: {exc}")


# ---------------------------------------------------------------------------
# Custom background photo
# ---------------------------------------------------------------------------

def _bg_dir():
    root = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))  # → addon root
    return os.path.join(root, "user_files", "background")


_BG_EXTS = (".png", ".jpg", ".jpeg", ".heic", ".gif", ".tiff", ".tif", ".bmp", ".webp")


def _bg_files():
    """All stored background images, sorted (a stable pool to pick from)."""
    d = _bg_dir()
    if not os.path.isdir(d):
        return []
    out = []
    for f in sorted(os.listdir(d)):
        if f.startswith("."):
            continue
        if os.path.splitext(f)[1].lower() in _BG_EXTS:
            out.append(os.path.join(d, f))
    return out


def _current_bg_path(repick=False):
    """The image to show this session. One is chosen at random from the pool and
    cached so it stays put until the app restarts (or the pool changes)."""
    global _bg_chosen
    files = _bg_files()
    if not files:
        _bg_chosen = None
        return None
    if repick or _bg_chosen not in files:
        import random
        _bg_chosen = random.choice(files)
    return _bg_chosen


def add_background_images(paths):
    """Copy one or more chosen images into the pool (does not replace existing),
    re-pick a random one, and apply live. Returns the new pool size."""
    try:
        d = _bg_dir()
        os.makedirs(d, exist_ok=True)
        import time
        for i, p in enumerate(paths or []):
            if p and os.path.isfile(p):
                ext = os.path.splitext(p)[1].lower() or ".png"
                base = "bg_%d_%d%s" % (int(time.time() * 1000), i, ext)
                shutil.copyfile(p, os.path.join(d, base))
    except Exception as exc:
        log(f"add background images: {exc}")
    _current_bg_path(repick=True)
    _apply_bg_image()
    return len(_bg_files())


def clear_background_images():
    """Remove every stored background image and hide the backdrop."""
    global _bg_chosen
    try:
        d = _bg_dir()
        if os.path.isdir(d):
            for f in os.listdir(d):
                try:
                    os.remove(os.path.join(d, f))
                except Exception:
                    pass
    except Exception as exc:
        log(f"clear background images: {exc}")
    _bg_chosen = None
    _apply_bg_image()


def background_count():
    return len(_bg_files())


def has_background_image():
    return bool(_bg_files())


def _bg_blur_target():
    """(max_radius, effective_radius) for the photo blur right now. max is the
    configured bg_blur; effective is 0 when bg_blur_text_only is set and no card
    text is on screen (not in the reviewer)."""
    cfg = _cfg()
    try:
        maxr = float(cfg.get("bg_blur", 0) or 0)
    except (TypeError, ValueError):
        maxr = 0.0
    if maxr <= 0:
        return 0.0, 0.0
    gated_off = False
    if cfg.get("bg_blur_text_only", False):
        try:
            gated_off = getattr(mw, "state", None) != "review"
        except Exception:
            gated_off = True
    return maxr, (0.0 if gated_off else maxr)


def _bg_set_blur(animate=False):
    """Apply the photo's Gaussian blur. The named CIGaussianBlur filter stays on
    the layer whenever bg_blur>0 and we only vary its inputRadius, so the text-only
    gate can smoothly animate the radius between 0 and bg_blur (fade in/out)."""
    global _bg_blur_installed, _bg_blur_cur
    if sys.platform != "darwin" or not _bg_image_view:
        return
    try:
        msg, cls = _bridge()
        layer = msg(c_void_p, _bg_image_view, b"layer")
        if not layer:
            return

        def nsstr(s):
            return msg(c_void_p, cls("NSString"), b"stringWithUTF8String:",
                       (c_char_p,), (s.encode(),))

        def num(x):
            return msg(c_void_p, cls("NSNumber"), b"numberWithDouble:",
                       (c_double,), (float(x),))

        maxr, target = _bg_blur_target()

        # Blur fully off → drop the filter entirely (no idle CI cost).
        if maxr <= 0:
            empty = msg(c_void_p, cls("NSArray"), b"array")
            msg(None, layer, b"setFilters:", (c_void_p,), (empty,))
            _bg_blur_installed = False
            _bg_blur_cur = 0.0
            return

        if not _bg_blur_installed:
            filt = msg(c_void_p, cls("CIFilter"), b"filterWithName:",
                       (c_void_p,), (nsstr("CIGaussianBlur"),))
            if not filt:
                return
            msg(None, filt, b"setDefaults")
            msg(None, filt, b"setValue:forKey:", (c_void_p, c_void_p),
                (num(target), nsstr("inputRadius")))
            # Name the filter so we can address it as filters.blur.inputRadius.
            msg(None, filt, b"setName:", (c_void_p,), (nsstr("blur"),))
            arr = msg(c_void_p, cls("NSArray"), b"arrayWithObject:",
                      (c_void_p,), (filt,))
            msg(None, layer, b"setMasksToBounds:", (c_bool,), (True,))
            msg(None, layer, b"setFilters:", (c_void_p,), (arr,))
            _bg_blur_installed = True
            _bg_blur_cur = target
            if animate and target > 0:
                _bg_animate_blur(msg, cls, layer, nsstr, num, 0.0, target)
            return

        # Already installed → just change the radius (optionally with a fade).
        if animate:
            _bg_animate_blur(msg, cls, layer, nsstr, num, _bg_blur_cur, target)
        msg(None, layer, b"setValue:forKeyPath:", (c_void_p, c_void_p),
            (num(target), nsstr("filters.blur.inputRadius")))
        _bg_blur_cur = target
    except Exception as exc:
        log(f"bg blur: {exc}")


def _bg_animate_blur(msg, cls, layer, nsstr, num, frm, to):
    """Fade the photo blur radius from `frm` to `to` (CABasicAnimation)."""
    try:
        anim = msg(c_void_p, cls("CABasicAnimation"), b"animationWithKeyPath:",
                   (c_void_p,), (nsstr("filters.blur.inputRadius"),))
        if not anim:
            return
        msg(None, anim, b"setFromValue:", (c_void_p,), (num(frm),))
        msg(None, anim, b"setToValue:", (c_void_p,), (num(to),))
        msg(None, anim, b"setDuration:", (c_double,), (0.18,))
        msg(None, layer, b"addAnimation:forKey:", (c_void_p, c_void_p),
            (anim, nsstr("blurfade")))
    except Exception as exc:
        log(f"bg blur anim: {exc}")


def refresh_bg_blur(animate=True):
    """Re-evaluate the text-only blur gate (call on state / card changes). Animated
    by default so the blur fades in/out as text appears/leaves."""
    if _bg_image_view:
        _bg_set_blur(animate=animate)


def _apply_bg_image():
    """Show/update (or hide) the custom background photo. An image view + a tint
    overlay are inserted as siblings just behind Qt's QNSView, so they appear
    through the transparent webviews and cover the whole window (incl. the titlebar
    strip). The tint overlay uses the glass tint + Opacity; the photo has its own
    opacity (bg_opacity) and optional blur (bg_blur), so both layers are tunable."""
    if not GLASS or sys.platform != "darwin":
        return
    global _bg_image_view, _bg_tint_view, _bg_loaded_path
    try:
        msg, cls = _bridge()
        win = msg(c_void_p, c_void_p(int(mw.winId())), b"window")
        if not win:
            return
        old = msg(c_void_p, win, b"contentView")            # Qt's QNSView
        superview = msg(c_void_p, old, b"superview") if old else None
        if not (old and superview):
            return
        cfg = _cfg()
        path = _current_bg_path()
        show = bool(path) and os.path.isfile(path)
        # Size to the whole window frame (superview bounds), NOT Qt's content view —
        # so the photo also covers the titlebar strip and there's no dark top bar.
        frame = msg(NSRect, superview, b"bounds")

        def nsstr(s):
            return msg(c_void_p, cls("NSString"), b"stringWithUTF8String:",
                       (c_char_p,), (s.encode(),))

        def _mk_view():
            NSView = cls("NSView")
            v = msg(c_void_p, NSView, b"alloc")
            v = msg(c_void_p, v, b"initWithFrame:", (NSRect,), (frame,))
            msg(None, v, b"setWantsLayer:", (c_bool,), (True,))
            msg(None, v, b"setAutoresizingMask:", (c_ulong,), (18,))  # w|h
            # positioned NSWindowBelow(-1) relative to Qt's view → behind the
            # webviews but in front of the desktop-blur vibrancy view.
            msg(None, superview, b"addSubview:positioned:relativeTo:",
                (c_void_p, c_long, c_void_p), (v, -1, old))
            return v

        if not show:
            _bg_loaded_path = None
            for v in (_bg_image_view, _bg_tint_view):
                if v:
                    msg(None, v, b"setHidden:", (c_bool,), (True,))
            return

        # --- image layer ---
        if not _bg_image_view:
            _bg_image_view = _mk_view()
            _bg_loaded_path = None   # fresh view has no contents yet
        # Only decode the file when the path actually changed — this runs on every
        # reassert (startup retries + window activation), so re-loading each time
        # would repeatedly alloc a (possibly large) NSImage.
        if _bg_loaded_path != path:
            img = msg(c_void_p, cls("NSImage"), b"alloc")
            img = msg(c_void_p, img, b"initWithContentsOfFile:",
                      (c_void_p,), (nsstr(path),))
            if img:
                cg = msg(c_void_p, img, b"CGImageForProposedRect:context:hints:",
                         (c_void_p, c_void_p, c_void_p), (None, None, None))
                layer = msg(c_void_p, _bg_image_view, b"layer")
                if layer and cg:
                    msg(None, layer, b"setContents:", (c_void_p,), (cg,))
                    # cover-crop, centered
                    msg(None, layer, b"setContentsGravity:", (c_void_p,),
                        (nsstr("resizeAspectFill"),))
                    msg(None, layer, b"setMasksToBounds:", (c_bool,), (True,))
                    _bg_loaded_path = path
        # Photo's own opacity (independent of the glass tint).
        try:
            bo = max(0.0, min(1.0, float(cfg.get("bg_opacity", 1.0))))
        except (TypeError, ValueError):
            bo = 1.0
        msg(None, _bg_image_view, b"setAlphaValue:", (c_double,), (bo,))
        _bg_set_blur(animate=False)
        msg(None, _bg_image_view, b"setHidden:", (c_bool,), (False,))

        # --- tint overlay (integrates with the glass translucency) ---
        if not _bg_tint_view:
            _bg_tint_view = _mk_view()
        else:
            # keep it ordered directly in front of the image (below Qt's view)
            msg(None, superview, b"addSubview:positioned:relativeTo:",
                (c_void_p, c_long, c_void_p), (_bg_tint_view, -1, old))
        r, g, b = _tint_rgb(cfg)
        a = max(0.0, min(1.0, float(cfg.get("body_opacity", 0.25))))
        col = msg(c_void_p, cls("NSColor"), b"colorWithRed:green:blue:alpha:",
                  (c_double, c_double, c_double, c_double),
                  (r / 255.0, g / 255.0, b / 255.0, a))
        cgc = msg(c_void_p, col, b"CGColor") if col else None
        tlayer = msg(c_void_p, _bg_tint_view, b"layer")
        if tlayer and cgc:
            msg(None, tlayer, b"setBackgroundColor:", (c_void_p,), (cgc,))
        msg(None, _bg_tint_view, b"setHidden:", (c_bool,), (False,))
    except Exception as exc:
        log(f"bg image: {exc}")


def _force_recreate_translucent():
    """Destroy + recreate the native window so its surface is rebuilt WITH an
    alpha channel (only way to get true translucency when WA_TranslucentBackground
    wasn't set at original creation time). setWindowFlags() forces the recreate."""
    if not GLASS:
        return
    try:
        mw.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground, True)
        mw.setAttribute(Qt.WidgetAttribute.WA_NoSystemBackground, True)
        central = mw.centralWidget()
        if central:
            central.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground, True)
            central.setAutoFillBackground(False)

        global _vibrancy_installed, _bg_image_view, _bg_tint_view, _bg_loaded_path
        global _bg_blur_installed, _bg_blur_cur
        _vibrancy_installed = False  # native tree is rebuilt; allow re-insert
        _bg_image_view = None        # freed with the old window; recreate on next apply
        _bg_tint_view = None
        _bg_loaded_path = None
        _bg_blur_installed = False
        _bg_blur_cur = 0.0

        # Force Qt to rebuild the platform window with the current attributes.
        flags = mw.windowFlags()
        mw.setWindowFlags(flags)
        mw.show()

        # Re-apply native glass (window transparency + vibrancy) on the new window.
        QTimer.singleShot(150, _apply_native_glass)
        QTimer.singleShot(300, _clear_existing_webviews)
        QTimer.singleShot(400, lambda: (mw.web.reload() if mw.web else None))
    except Exception as exc:
        log(f"recreate failed: {exc}")


def _reassert_transparent():
    if not GLASS:
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
        log(f"reassert failed: {exc}")


# ---------------------------------------------------------------------------
# Webview transparency
# ---------------------------------------------------------------------------

_orig_webview_init = AnkiWebView.__init__
_orig_theme_did_change = getattr(AnkiWebView, "on_theme_did_change", None)


def _patched_webview_init(self, *a, **k):
    _orig_webview_init(self, *a, **k)
    if not GLASS:
        return
    try:
        self.page().setBackgroundColor(QColor(Qt.GlobalColor.transparent))
    except Exception:
        pass


def _patched_theme_did_change(self, *a, **k):
    # Anki re-sets the page background to the opaque CANVAS colour on every theme
    # change (and once at startup), repainting the webview opaque over the glass.
    # Let Anki run, then force it transparent again. Runtime equivalent of the
    # qt/aqt/webview.py source patch (which we deliberately do NOT ship via the
    # .pyc patcher, to avoid version drift).
    if _orig_theme_did_change is not None:
        _orig_theme_did_change(self, *a, **k)
    if not GLASS:
        return
    try:
        self.page().setBackgroundColor(QColor(Qt.GlobalColor.transparent))
    except Exception:
        pass


if GLASS:
    AnkiWebView.__init__ = _patched_webview_init
    if _orig_theme_did_change is not None:
        AnkiWebView.on_theme_did_change = _patched_theme_did_change


def _clear_existing_webviews():
    if not GLASS:
        return
    try:
        # findChildren is RECURSIVE — catches mw.web / toolbarWeb / bottomWeb /
        # reviewer.web wherever they're nested. (centralWidget().children() only
        # returned direct children, missing the main webviews, so their page
        # background — the opaque theme canvas — stayed opaque over the glass.)
        for v in mw.findChildren(AnkiWebView):
            try:
                v.page().setBackgroundColor(QColor(Qt.GlobalColor.transparent))
            except Exception:
                pass
    except Exception:
        pass
