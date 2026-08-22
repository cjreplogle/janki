"""
Janki (deep / launcher edition)
====================================

True native transparency, only active when Anki is started via the
`AnkiGlass.command` wrapper (which sets QTWEBENGINE_CHROMIUM_FLAGS=--disable-gpu
so QtWebEngine composites through Qt's raster path instead of an opaque Metal
surface, and sets ANKI_GLASS=1). Launched normally from the app icon, this
add-on does nothing — that's the built-in undo.

Stack (back to front):
  1. NSWindow  -> non-opaque, clear background (ctypes/ObjC).
  2. NSVisualEffectView (blendingMode=behindWindow, state=active) inserted as the
     window's contentView, with Anki's original Qt view reparented on top of it.
     This is the OS's own live frosted-glass-of-the-desktop effect — GPU-cheap,
     no capture, no permission.
  3. QtWebEngine webviews -> transparent page background (works because software
     compositing honors it), html/body backgrounds stripped via CSS.
  4. Panels -> translucent tint + backdrop-filter, so they read as frosted glass
     over the native vibrancy behind them.

Everything native is wrapped so a failure can never crash Anki.
"""

import os
import sys
import time as _time
import ctypes
from ctypes import (
    c_void_p, c_char_p, c_bool, c_int, c_long, c_ulong, c_double, Structure,
)
from typing import Any, Optional

try:
    from aqt import mw, gui_hooks
    from aqt.webview import AnkiWebView, WebContent
    from aqt.qt import (
        QAction, QCheckBox, QColor, QColorDialog, QDialog, QEvent, QHBoxLayout,
        QLabel, QMenu, QObject, QPushButton, QSlider, QSpinBox, Qt, QTimer,
        QVBoxLayout, QSystemTrayIcon,
    )
    from aqt.deckbrowser import DeckBrowser, DeckBrowserBottomBar
    from aqt.overview import Overview, OverviewBottomBar
    from aqt.reviewer import Reviewer, ReviewerBottomBar
    from aqt.toolbar import TopToolbar
except Exception as _e:
    print(f"[janki] import error: {_e}", file=sys.stderr)
    raise


def _is_active() -> bool:
    """Active only when started via AnkiGlass.command. Checks the env flag and,
    as a fallback (in case the environment was stripped), a fresh marker file the
    wrapper writes right before launch."""
    if os.environ.get("ANKI_GLASS") == "1":
        return True
    try:
        import time
        mark = os.path.expanduser("~/.anki_glass_launch")
        if os.path.exists(mark) and (time.time() - os.path.getmtime(mark)) < 120:
            return True
    except Exception:
        pass
    return False


ACTIVE = _is_active()


# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

def _cfg() -> dict:
    c = mw.addonManager.getConfig(__name__)
    return c if c else {}


# ---------------------------------------------------------------------------
# ObjC runtime bridge (ctypes; no PyObjC)
# ---------------------------------------------------------------------------

class NSPoint(Structure):
    _fields_ = [("x", c_double), ("y", c_double)]


class NSSize(Structure):
    _fields_ = [("width", c_double), ("height", c_double)]


class NSRect(Structure):
    _fields_ = [("origin", NSPoint), ("size", NSSize)]


def _bridge():
    libobjc = ctypes.cdll.LoadLibrary("/usr/lib/libobjc.dylib")
    libobjc.objc_getClass.restype = c_void_p
    libobjc.objc_getClass.argtypes = [c_char_p]
    libobjc.sel_registerName.restype = c_void_p
    libobjc.sel_registerName.argtypes = [c_char_p]

    def msg(restype, receiver, selector, argtypes=(), args=()):
        fn = libobjc.objc_msgSend
        fn.restype = restype
        fn.argtypes = [c_void_p, c_void_p, *argtypes]
        sel = libobjc.sel_registerName(
            selector if isinstance(selector, bytes) else selector.encode()
        )
        return fn(receiver, sel, *args)

    def cls(name):
        return libobjc.objc_getClass(name if isinstance(name, bytes) else name.encode())

    return msg, cls


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


# --- Terminal-style window background blur (private CGS/SkyLight API) ---------
# This is the same mechanism macOS Terminal/iTerm use: blur the desktop behind
# the window at an arbitrary radius. Works with our transparent window.

_skylight = None


def _cgs():
    global _skylight
    if _skylight is not None:
        return _skylight
    for path in (
        "/System/Library/PrivateFrameworks/SkyLight.framework/SkyLight",
        "/System/Library/Frameworks/CoreGraphics.framework/CoreGraphics",
    ):
        try:
            lib = ctypes.cdll.LoadLibrary(path)
            if hasattr(lib, "CGSSetWindowBackgroundBlurRadius"):
                lib.CGSMainConnectionID.restype = c_int
                lib.CGSSetWindowBackgroundBlurRadius.argtypes = [c_int, c_int, c_int]
                lib.CGSSetWindowBackgroundBlurRadius.restype = c_int
                _skylight = lib
                return lib
        except OSError:
            continue
    return None


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


_tray_icon: "QSystemTrayIcon | None" = None
_tray_caption_action: "QAction | None" = None
_tray_focus_action: "QAction | None" = None


def _sync_tray_actions() -> None:
    """Reflect live Caption/Focus state in the menu-bar checkboxes. Called just
    before the menu opens so the ticks are always accurate (the modes can also be
    toggled by hotkey)."""
    try:
        if _tray_caption_action is not None:
            _tray_caption_action.setChecked(_caption_visible())
        if _tray_focus_action is not None:
            _tray_focus_action.setChecked(bool(_focus_mode_on))
    except Exception:
        pass


def _apply_tray(on: bool) -> None:
    global _tray_icon, _tray_caption_action, _tray_focus_action
    if on:
        if _tray_icon is None:
            _tray_icon = QSystemTrayIcon(mw.windowIcon(), mw)
            menu = QMenu()
            # Mode toggles, mirrored from the Tab+\ / Tab+F hotkeys, so caption and
            # focus can be driven from the menu-bar icon even when Anki is unfocused.
            _tray_caption_action = QAction("Caption mode", mw)
            _tray_caption_action.setCheckable(True)
            _tray_caption_action.triggered.connect(lambda _c=False: _toggle_coherence())
            _tray_focus_action = QAction("Focus mode", mw)
            _tray_focus_action.setCheckable(True)
            _tray_focus_action.triggered.connect(lambda _c=False: _toggle_focus_mode())
            menu.addAction(_tray_caption_action)
            menu.addAction(_tray_focus_action)
            last_deck_action = QAction("Open last studied deck", mw)
            last_deck_action.triggered.connect(lambda _c=False: _open_last_deck())
            menu.addAction(last_deck_action)
            menu.addSeparator()
            restore_action = QAction("Open Anki", mw)
            restore_action.triggered.connect(lambda: (mw.showNormal(), mw.activateWindow()))
            quit_action = QAction("Quit", mw)
            quit_action.triggered.connect(mw.close)
            menu.addAction(restore_action)
            menu.addSeparator()
            menu.addAction(quit_action)
            menu.aboutToShow.connect(_sync_tray_actions)
            _tray_icon.setContextMenu(menu)
            _tray_icon.activated.connect(_on_tray_activated)
        _tray_icon.show()
        # intercept close-to-minimize (the filter itself is gated on tray_minimize,
        # so showing the icon for the mode controls doesn't hijack the close button)
        mw.installEventFilter(_tray_filter)
    else:
        if _tray_icon is not None:
            _tray_icon.hide()
        mw.removeEventFilter(_tray_filter)


def _tray_should_show() -> bool:
    """The menu-bar icon appears if either it's wanted for its mode controls or
    tray-minimize needs it as a minimize target."""
    c = _cfg()
    return bool(c.get("menubar_controls", True) or c.get("tray_minimize", False))


def _on_tray_activated(reason: "QSystemTrayIcon.ActivationReason") -> None:
    if reason == QSystemTrayIcon.ActivationReason.Trigger:
        if mw.isVisible():
            mw.hide()
        else:
            mw.showNormal()
            mw.activateWindow()


class _TrayFilter(QObject):
    def eventFilter(self, obj: QObject, event: QEvent) -> bool:
        if obj is mw and _cfg().get("tray_minimize", False) and _tray_icon and _tray_icon.isVisible():
            if event.type() == QEvent.Type.Close:
                mw.hide()
                return True
            if event.type() == QEvent.Type.WindowStateChange:
                if mw.windowState() & Qt.WindowState.WindowMinimized:
                    QTimer.singleShot(0, mw.hide)
        return False


_profile_autosave_timer = None


def _flush_profile():
    """Persist the in-memory Anki profile meta (mw.pm.profile) to disk.

    Some add-ons (e.g. AMBOSS) store their auth token in the profile dict and
    rely on Anki's clean-shutdown save (mw.pm.save()). Launched via the `just
    run` app wrapper, Janki can terminate without that save running, so the
    token is lost and you're logged out every launch. Flushing periodically and
    on quit lands it on disk within seconds of login, regardless of how the app
    exits."""
    try:
        mw.pm.save()
    except Exception as exc:
        print(f"[janki] profile flush: {exc}", file=sys.stderr)


def _start_profile_autosave():
    global _profile_autosave_timer
    if _profile_autosave_timer is not None:
        return
    t = QTimer(mw)                     # parented → lives with the main window
    t.setInterval(45000)              # every 45s: cheap meta.db write
    t.timeout.connect(_flush_profile)
    t.start()
    _profile_autosave_timer = t
    mw.app.aboutToQuit.connect(_flush_profile)   # also flush on clean quit


def _teardown_glass_windows():
    """Close the floating coherence HUD, XP bar and break screen so the app can
    fully quit when the main Anki window is closed (they're separate top-level
    windows that would otherwise keep the Qt app alive)."""
    global _coherence_hud
    _stop_gamepad_poll()  # stop polling first — it bus-errors mid-teardown
    try:
        if _coherence_hud is not None:
            _coherence_hud.close()
            _coherence_hud.deleteLater()
            _coherence_hud = None
    except Exception:
        pass
    try:
        if _pomo_instance is not None:
            _pomo_instance.stop()
    except Exception:
        pass
    try:
        if _tray_icon is not None:
            _tray_icon.hide()
    except Exception:
        pass


_tray_filter = _TrayFilter()


# ---------------------------------------------------------------------------
# Global hotkeys (Tab+Z/X/C/V/Space → Anki reviewer when not focused)
# Tab acts as the held modifier: press and hold Tab, then Z/X/C/V/Space.
# Tab alone (no combo) is passed through normally.
# Uses CGEventTap via ctypes; requires macOS Accessibility permission.
# ---------------------------------------------------------------------------
_key_tap_running = False
_key_tap_enabled = False
_tab_held = False        # True while Tab is physically held down
_tab_used_combo = False  # True if Tab was used as a modifier this press
_pomo_on_break = False   # True while Pomodoro break screen is active (read by CGEventTap thread)
_break_tint_active = False  # True while the blue "break due" tint is shown; suppresses the red card pulse
_flare_origin = 0.0  # monotonic() anchor for the red flare/bar pulse phase, set at expiry so the first pulse starts from the trough and bar+overlay stay in sync
_anki_focused = True     # True while Anki is the frontmost app (read by CGEventTap thread)
_swallow_space_until_up = False  # after a hold-Space break skip, eat Space until released
_remote_active = False   # True while the reviewer has a card up (gamepad gate)

# macOS virtual key codes to intercept when Tab is held
_GLOBAL_KC = {6, 7, 8, 9, 49, 53, 42, 3, 31, 126, 125, 124, 123}  # Z X C V Space Escape Backslash F O ↑ ↓ → ←
# Shift+Tab + '='/'-' → grow/shrink the caption font (only while the caption HUD
# is up). Shift-gated so plain Tab+= / Tab+- stay free for anything else.
_CAP_FONT_KC = {24, 27}  # 24 = '='(+), 27 = '-'
_KC_TAB = 48

# NOTE: the 8bitdo Zero 2 is a GAMEPAD (handled by the GameController poller, not
# this tap). It emits no keyboard/media events, so there is deliberately NO
# keyboard interception of 1/2/3/4 here — doing so would swallow those keys while
# reviewing. kc 18-21 remain in the maps above only so the poller can drive
# ratings via _send_key_to_anki.

_GTAP_LOG = os.path.expanduser("~/Library/Logs/anki-glass-keytap.log")

# Thread-safe bridge: CGEventTap callback runs in a CFRunLoop thread, not the Qt
# main thread. QTimer.singleShot from that thread silently drops. Emitting a
# Qt signal is thread-safe and guaranteed to deliver on the main thread via
# Qt's queued-connection mechanism.
from PyQt6.QtCore import QObject, pyqtSignal as _pyqtSignal

class _KeyBridge(QObject):
    send_key    = _pyqtSignal(int)  # macOS keycode
    send_key_rf = _pyqtSignal(int)  # keycode, reveal-first (two-press gamepad flow)
    pomo_space = _pyqtSignal(bool)  # True=press, False=release (Pomodoro bypass)

_key_bridge = _KeyBridge()
_key_bridge.send_key.connect(lambda kc: _send_key_to_anki(kc))
_key_bridge.send_key_rf.connect(lambda kc: _send_key_to_anki(kc, reveal_first=True))

def _gtap_log(msg: str) -> None:
    try:
        with open(_GTAP_LOG, "a") as f:
            import datetime
            f.write(f"{datetime.datetime.now().isoformat()} {msg}\n")
    except Exception:
        pass


# macOS keycode → key char (for pycmd/DOM fallback)
_KC_TO_KEY = {6: 'z', 7: 'x', 8: 'c', 9: 'v', 49: ' ', 53: 'Escape', 42: '\\',
              18: '1', 19: '2', 20: '3', 21: '4'}  # 1-4: 8bitdo rating keys
# ease: 1=Again 2=Hard 3=Good 4=Easy; None=not a rating key
_KC_TO_EASE = {6: 1, 7: 2, 8: 3, 9: 4, 49: None, 53: None, 42: None,
               18: 1, 19: 2, 20: 3, 21: 4}

def _send_key_to_anki(kc: int, reveal_first: bool = False) -> None:
    """Drive Anki's reviewer directly via Python API — no OS event needed.

    reveal_first: on the question side, only reveal the answer (don't auto-rate).
    Used by the gamepad so a press flips the card and you can read it before the
    next press rates — a natural two-press flow. Tab-combos leave it False (their
    single press shows-and-rates)."""
    # Arrow keys — nudge the caption HUD around a 3x3 screen grid (up→top row,
    # down→bottom row, left→left column, right→right column).
    _arrow_delta = {126: (-1, 0), 125: (1, 0), 123: (0, -1), 124: (0, 1)}
    if kc in _arrow_delta:
        _nudge_coherence(*_arrow_delta[kc])
        return

    if kc in _CAP_FONT_KC:  # Shift+Tab + '='/'-' — resize the caption font
        _adjust_caption_font(2 if kc == 24 else -2)
        return

    if kc == 3:  # F — toggle Focus Mode
        _gtap_log("F hit → _toggle_focus_mode")
        _toggle_focus_mode()
        return

    if kc == 31:  # O — open the last-studied deck
        _gtap_log("O hit → _open_last_deck")
        _open_last_deck()
        return

    key  = _KC_TO_KEY.get(kc)
    ease = _KC_TO_EASE.get(kc)
    if key is None:
        return
    _gtap_log(f"_send_key_to_anki kc={kc} key={key!r} ease={ease}")
    try:
        r   = getattr(mw, 'reviewer', None)
        web = getattr(r, 'web', None) or mw.web
        state = getattr(r, 'state', None) if r else None

        if kc == 42:  # Backslash — toggle coherence HUD
            _gtap_log("backslash hit → _toggle_coherence")
            _toggle_coherence()
            return

        elif kc == 53:  # Escape — undo last rating
            for m in ('undo', '_undo'):
                fn = getattr(mw, m, None)
                if fn:
                    fn()
                    _gtap_log(f"called mw.{m}()")
                    return

        elif kc == 49:  # Space — show answer or rate Good on answer side
            if r and getattr(r, 'card', None):
                if state == 'question':
                    for m in ('_showAnswer', 'show_answer', 'onEnterKey'):
                        fn = getattr(r, m, None)
                        if fn:
                            fn(); _gtap_log(f"called r.{m}()"); return
                elif state == 'answer':
                    for m in ('_answerCard', 'answer_card'):
                        fn = getattr(r, m, None)
                        if fn:
                            ease_val = getattr(r, '_defaultEase', lambda: 3)()
                            fn(ease_val); _gtap_log(f"called r.{m}({ease_val})"); return
            web.eval("if(typeof pycmd!=='undefined')pycmd('key: ');")

        elif ease is not None:  # Z/X/C/V — rate Again/Hard/Good/Easy
            if r and getattr(r, 'card', None) and state == 'answer':
                for m in ('_answerCard', 'answer_card'):
                    fn = getattr(r, m, None)
                    if fn:
                        fn(ease); _gtap_log(f"called r.{m}({ease})"); return
            # Card not yet revealed.
            elif r and getattr(r, 'card', None) and state == 'question':
                for m in ('_showAnswer', 'show_answer'):
                    fn = getattr(r, m, None)
                    if fn:
                        fn()
                        if reveal_first:
                            # Just flip the card; the next press rates.
                            _gtap_log("showed answer (reveal-first)"); return
                        QTimer.singleShot(50, lambda e=ease: _send_key_to_anki(
                            next(k for k, v in _KC_TO_EASE.items() if v == e)))
                        _gtap_log(f"showed answer, queued ease={ease}"); return

    except Exception as e:
        _gtap_log(f"_send_key_to_anki error: {e}")


def _adjust_caption_font(delta: int) -> None:
    """Shift+Tab + '='/'-' : grow/shrink the caption HUD font live, and persist
    it (matches the Caption tab's Font size slider, bounds 10–48). No-op unless
    the caption HUD is on screen."""
    if not _caption_visible():
        return
    cfg = _cfg() or {}
    cur = max(8, int(cfg.get('caption_font_size', 20)))
    new = max(10, min(48, cur + delta))
    if new == cur:
        return
    cfg['caption_font_size'] = new
    mw.addonManager.writeConfig(__name__, cfg)
    _gtap_log(f"caption_font_size → {new}")
    if _coherence_hud and _coherence_hud.isVisible():
        # Live, animated resize (no full re-render → no typewriter replay, no
        # blank flash). Pass the old size so the window glide is predicted, not
        # measured mid-transition (which wobbled). Saved config keeps the next
        # card's render in sync.
        _coherence_hud.set_font_size(new, cur)


def _start_key_tap() -> None:
    global _key_tap_running
    if _key_tap_running or sys.platform != 'darwin':
        return
    import ctypes, threading

    try:
        open(_GTAP_LOG, 'w').close()  # clear log on each start
        _gtap_log("_start_key_tap() called")
        CG = ctypes.CDLL('/System/Library/Frameworks/CoreGraphics.framework/CoreGraphics')
        CF = ctypes.CDLL('/System/Library/Frameworks/CoreFoundation.framework/CoreFoundation')
        AX = ctypes.CDLL('/System/Library/Frameworks/ApplicationServices.framework/ApplicationServices')

        trusted = bool(AX.AXIsProcessTrusted())
        _gtap_log(f"AXTrusted={trusted}")

        if not trusted:
            # Trigger the system prompt — this adds Anki to the Accessibility list
            # and shows the "allow access" dialog automatically.
            try:
                msg, cls = _bridge()
                key = msg(c_void_p, cls("NSString"), b"stringWithUTF8String:",
                          (c_char_p,), (b"AXTrustedCheckOptionPrompt",))
                val = msg(c_void_p, cls("NSNumber"), b"numberWithBool:",
                          (c_bool,), (True,))
                opts = msg(c_void_p, cls("NSDictionary"),
                           b"dictionaryWithObject:forKey:",
                           (c_void_p, c_void_p), (val, key))
                AX.AXIsProcessTrustedWithOptions.restype = c_bool
                AX.AXIsProcessTrustedWithOptions.argtypes = [c_void_p]
                AX.AXIsProcessTrustedWithOptions(opts)
            except Exception as _pe:
                print(f"[janki] accessibility prompt failed: {_pe}", file=sys.stderr)
                from aqt.utils import showInfo
                QTimer.singleShot(0, lambda: showInfo(
                    "Janki: global hotkeys require Accessibility permission.\n\n"
                    "Grant access in:\n"
                    "System Settings → Privacy & Security → Accessibility → Anki"
                ))
            return

        # All CF/CG functions that return opaque pointers must have restype=c_void_p
        # or ctypes will truncate the 64-bit return value to a 32-bit signed int,
        # producing an invalid 0xffffffff... address that crashes CoreFoundation's
        # PAC signature check (__CFCheckCFInfoPACSignature).
        CG.CGEventTapCreate.restype = ctypes.c_void_p
        CG.CGEventTapEnable.argtypes = [ctypes.c_void_p, ctypes.c_bool]
        CG.CGEventGetIntegerValueField.restype = ctypes.c_int64
        CG.CGEventGetIntegerValueField.argtypes = [ctypes.c_void_p, ctypes.c_uint32]
        CG.CGEventGetFlags.restype = ctypes.c_uint64
        CG.CGEventGetFlags.argtypes = [ctypes.c_void_p]
        CF.CFMachPortCreateRunLoopSource.restype = ctypes.c_void_p
        CF.CFMachPortCreateRunLoopSource.argtypes = [ctypes.c_void_p, ctypes.c_void_p, ctypes.c_long]
        CF.CFRunLoopGetCurrent.restype = ctypes.c_void_p
        CF.CFRunLoopAddSource.argtypes = [ctypes.c_void_p, ctypes.c_void_p, ctypes.c_void_p]
        CG.CGEventCreateKeyboardEvent.restype = ctypes.c_void_p
        CG.CGEventCreateKeyboardEvent.argtypes = [ctypes.c_void_p, ctypes.c_uint16, ctypes.c_bool]
        # kCFRunLoopDefaultMode is a CFStringRef global exported from CF.
        # We need its value (the pointer it holds), not its address.
        kCFRunLoopDefaultMode = ctypes.c_void_p.in_dll(CF, 'kCFRunLoopDefaultMode').value

        CBACK = ctypes.CFUNCTYPE(
            ctypes.c_void_p, ctypes.c_void_p, ctypes.c_uint32,
            ctypes.c_void_p, ctypes.c_void_p,
        )

        def _cb(proxy, etype, event, refcon):
            global _tab_held, _tab_used_combo, _swallow_space_until_up
            if not _key_tap_enabled:
                return event
            # etype: 10 = kCGEventKeyDown, 11 = kCGEventKeyUp
            kc = CG.CGEventGetIntegerValueField(event, 9)  # kCGKeyboardEventKeycode
            # After a hold-Space break skip, the Space is often still held when the
            # break ends — eat every Space event until it's released so it doesn't
            # leak to the reviewer (which would flip the just-revealed card).
            if kc == 49 and _swallow_space_until_up:
                if etype == 11:  # keyup — the hold is over
                    _swallow_space_until_up = False
                return None  # consumed
            # Pomodoro break: Space drives the hold-to-skip bypass. But only read a
            # PLAIN Space when Anki is the focused app — otherwise Space typed in
            # another app must pass through. Tab+Space is the explicit override that
            # works even when Anki is unfocused.
            if _pomo_on_break and kc == 49:
                if _tab_held:
                    _tab_used_combo = True   # so releasing Tab doesn't re-post a lone Tab
                    _key_bridge.pomo_space.emit(etype == 10)
                    return None  # consumed (override)
                if _anki_focused:
                    _key_bridge.pomo_space.emit(etype == 10)
                    return None  # consumed (focused)
                return event     # unfocused plain Space → let the focused app have it
            if etype == 10:  # keydown
                if kc == _KC_TAB:
                    _tab_held = True
                    _tab_used_combo = False
                    return None  # suppress Tab keydown while tracking
                if _tab_held and kc in _CAP_FONT_KC:
                    # Only claim '='/'-' when Shift is also held, so it's an
                    # explicit Shift+Tab combo and doesn't eat plain Tab+=/-.
                    if CG.CGEventGetFlags(event) & 0x20000:  # kCGEventFlagMaskShift
                        _tab_used_combo = True
                        _key_bridge.send_key.emit(kc)
                        return None  # consume Shift+Tab+=/-
                if _tab_held and kc in _GLOBAL_KC:
                    _tab_used_combo = True
                    _key_bridge.send_key.emit(kc)
                    return None  # consume combo key
            elif etype == 11:  # keyup
                if kc == _KC_TAB:
                    was_combo = _tab_used_combo
                    _tab_held = False
                    _tab_used_combo = False
                    if not was_combo:
                        # Tab pressed alone — re-inject at kCGAnnotatedSessionEventTap (2)
                        # so our own session-level tap does NOT see it again (no loop).
                        CG.CGEventPost.argtypes = [ctypes.c_uint32, ctypes.c_void_p]
                        down = CG.CGEventCreateKeyboardEvent(None, ctypes.c_uint16(_KC_TAB), True)
                        up = CG.CGEventCreateKeyboardEvent(None, ctypes.c_uint16(_KC_TAB), False)
                        if down:
                            CG.CGEventPost(2, down)  # kCGAnnotatedSessionEventTap
                        if up:
                            CG.CGEventPost(2, up)
                    return None  # always suppress Tab keyup (we re-posted if needed)
            return event

        cb_ref = CBACK(_cb)
        _start_key_tap._cb = cb_ref   # keep alive

        def _run():
            # kCGEventKeyDown(10) | kCGEventKeyUp(11). The 8bitdo remote is a
            # gamepad (read by Contanki via the Gamepad API), not a keyboard, so it
            # never reaches this tap — its focus-independent handling lives in the
            # GameController poller below. This tap still serves the Tab+combos.
            mask = ctypes.c_uint64((1 << 10) | (1 << 11))
            port = CG.CGEventTapCreate(1, 0, 0, mask, cb_ref, None)
            _gtap_log(f"tap port={'OK' if port else 'NULL'}")
            if not port:
                return
            src = CF.CFMachPortCreateRunLoopSource(None, port, 0)
            if not src:
                return
            CG.CGEventTapEnable(port, True)
            CF.CFRunLoopAddSource(CF.CFRunLoopGetCurrent(), src, kCFRunLoopDefaultMode)
            CF.CFRunLoopRun()

        threading.Thread(target=_run, daemon=True).start()
        _key_tap_running = True
    except Exception as exc:
        _gtap_log(f"EXCEPTION: {exc}")
        print(f"[janki] key tap: {exc}", file=sys.stderr)


# ---------------------------------------------------------------------------
# Coherence mode — bottom-of-screen card HUD, toggled by Tab+\
# ---------------------------------------------------------------------------

# Caption HUD screen anchor: a 3x3 grid. row ∈ top/middle/bottom, col ∈
# left/center/right, stored as "<row>-<col>" in config (coherence_position).
# Tab+arrows nudge it a cell at a time; the settings grid picks a cell directly.
_COH_ROWS = ("top", "middle", "bottom")
_COH_COLS = ("left", "center", "right")
# Glyphs for the settings grid selector, indexed [row][col].
_COH_GLYPHS = (("↖", "↑", "↗"), ("←", "•", "→"), ("↙", "↓", "↘"))


def _coherence_rc():
    """(row, col) for the caption anchor, migrating the legacy single-word values
    (bottom / top / topright) onto the 3x3 grid."""
    raw = str(_cfg().get("coherence_position", "bottom-center") or "").lower()
    raw = {"bottom": "bottom-center", "top": "top-center",
           "topright": "top-right", "center": "middle-center"}.get(raw, raw)
    row, _, col = raw.partition("-")
    if row not in _COH_ROWS:
        row = "bottom"
    if col not in _COH_COLS:
        col = "center"
    return row, col


def _coherence_narrow():
    """Side columns (left/right) constrain width + word-wrap so the box hugs that
    edge instead of spanning the screen like the centered column does."""
    return _coherence_rc()[1] != "center"


_fs_cache = {"t": 0.0, "v": False}  # short-TTL cache for _frontmost_fullscreen


def _frontmost_fullscreen() -> bool:
    """True when the FRONTMOST app's focused window is in macOS native fullscreen.

    This is the ONLY reliable signal available from Anki's own process/Space:
    every screen-geometry API (Qt availableGeometry, CGWindowList, NSScreen
    visibleFrame) reports Anki's own desktop Space and never sees another app's
    fullscreen. So we ask the Accessibility API (permission already granted for
    the global hotkeys) for the frontmost window's AXFullScreen attribute.

    When True → a bottom caption drops to the physical screen bottom (no Dock in
    that Space); when False (desktop) → it clears the Dock. Cached ~0.4s. Any
    failure degrades to False (Dock-clearing behavior)."""
    now = _time.monotonic()
    if now - _fs_cache["t"] < 0.4:
        return _fs_cache["v"]
    val = False
    try:
        if mw.isFullScreen():
            val = True
    except Exception:
        pass
    if not val:
        try:
            AX = ctypes.CDLL('/System/Library/Frameworks/ApplicationServices.framework/ApplicationServices')
            CF = ctypes.CDLL('/System/Library/Frameworks/CoreFoundation.framework/CoreFoundation')
            AX.AXUIElementCreateSystemWide.restype = c_void_p
            AX.AXUIElementCopyAttributeValue.restype = c_int
            AX.AXUIElementCopyAttributeValue.argtypes = [
                c_void_p, c_void_p, ctypes.POINTER(c_void_p)]
            CF.CFStringCreateWithCString.restype = c_void_p
            CF.CFStringCreateWithCString.argtypes = [c_void_p, c_char_p, ctypes.c_uint32]
            CF.CFBooleanGetValue.restype = c_bool
            CF.CFBooleanGetValue.argtypes = [c_void_p]
            CF.CFRelease.argtypes = [c_void_p]

            def _cfstr(s):
                return CF.CFStringCreateWithCString(None, s.encode(), 0x08000100)

            def _attr(el, name):
                out = c_void_p()
                k = _cfstr(name)
                err = AX.AXUIElementCopyAttributeValue(el, k, ctypes.byref(out))
                CF.CFRelease(k)
                return out.value if err == 0 else None

            sysw = AX.AXUIElementCreateSystemWide()
            if sysw:
                app = _attr(sysw, "AXFocusedApplication")
                if app:
                    win = _attr(app, "AXFocusedWindow") or _attr(app, "AXMainWindow")
                    if win:
                        fsv = _attr(win, "AXFullScreen")
                        if fsv:
                            val = bool(CF.CFBooleanGetValue(fsv))
                            CF.CFRelease(fsv)
                        CF.CFRelease(win)
                    CF.CFRelease(app)
                CF.CFRelease(sysw)
        except Exception as _e:
            _gtap_log(f"_frontmost_fullscreen err: {_e}")
            val = False
    _fs_cache["t"] = now
    _fs_cache["v"] = val
    return val


def _make_coherence_hud():
    from PyQt6.QtWidgets import QWidget, QVBoxLayout
    from PyQt6.QtWebEngineWidgets import QWebEngineView
    from PyQt6.QtGui import QColor
    from PyQt6.QtCore import (QPropertyAnimation, QRect, QEasingCurve,
                              QAbstractAnimation)
    from ctypes import c_double
    import json as _json

    _RADIUS = 16
    _PAD_V  = 10   # vertical padding (px) — ~half font-size
    _PAD_H  = 32   # horizontal padding (px)

    class HUD(QWidget):

        def __init__(self):
            super().__init__(
                None,
                Qt.WindowType.FramelessWindowHint
                | Qt.WindowType.WindowStaysOnTopHint
                # Tool → Qt backs it with an NSPanel, which (as a non-activating
                # panel) is the only reliable way to float over ANOTHER app's
                # native-fullscreen Space; a plain NSWindow can't. See _apply_glass.
                | Qt.WindowType.Tool,
            )
            self.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground)
            self.setAttribute(Qt.WidgetAttribute.WA_ShowWithoutActivating)
            # Passive caption → click-through. The Qt attr covers the widget; the
            # authoritative pass-through is setIgnoresMouseEvents in _apply_glass.
            self.setAttribute(Qt.WidgetAttribute.WA_TransparentForMouseEvents)
            self.setStyleSheet("background: transparent;")
            self._view = QWebEngineView(self)
            self._view.page().setBackgroundColor(QColor(0, 0, 0, 0))
            self._view.setStyleSheet("background: transparent;")
            # Keep the page LIFECYCLE ACTIVE so the renderer paints even while Anki
            # is a background app (the caption floats over another app / fullscreen).
            # Otherwise Chromium suspends the background window's renderer and the
            # caption shows blank — the old code masked this by activating Anki,
            # which stole focus. Re-asserted in refresh() (Qt can drift it).
            self._force_active()
            # Allow the setHtml page (file:// base = the media folder) to actually
            # load card images from disk; QtWebEngine can otherwise block file://
            # subresources of setHtml content.
            try:
                from PyQt6.QtWebEngineCore import QWebEngineSettings as _QS
                _s = self._view.settings()
                _s.setAttribute(_QS.WebAttribute.LocalContentCanAccessFileUrls, True)
                _s.setAttribute(_QS.WebAttribute.LocalContentCanAccessRemoteUrls, True)
            except Exception:
                pass
            self._view.loadFinished.connect(self._on_loaded)
            # NO layout: the web view is kept at a FIXED generous viewport pinned to
            # the top-left, and the WINDOW is sized to the measured box (clipping the
            # view). Decoupling the render viewport from the window keeps narrow-
            # column word-wrap — and therefore the measured height — STABLE across
            # the re-fit passes. (A layout would force view==window, so measuring at a
            # stale narrower window over-estimated height → the window jumped up then
            # settled back down when moving bottom-center → a corner.)
            self._view.move(0, 0)
            self._view.resize(*self._vp())
            self._session_max = [0, 0, 0]  # depletion tracking for deck pills
            # (left, top, w, h) of the visible .hud-bg box relative to the window
            # top-left, measured after each render. The window can be taller than
            # the box (inline layout leaves slack), so the red flare shapes itself
            # to this inset, not the whole window — otherwise it spills past the box.
            self._box_inset = None
            self._target_geom = None   # settled target rect, for the caption flare
            self._box_origin = (0, 0)  # measured (bx,by) of the box in the viewport
            self._last_fs = None       # last frontmost-fullscreen state, _watch_space
            # While the caption is up, re-anchor when the frontmost app enters/exits
            # fullscreen (e.g. leaving the fullscreen app back to the desktop — the
            # Dock reappears, so a bottom caption must lift above it).
            from PyQt6.QtCore import QTimer as _QTimer
            self._space_timer = _QTimer(self)
            self._space_timer.setInterval(500)
            self._space_timer.timeout.connect(self._watch_space)

        def _watch_space(self):
            if not self.isVisible():
                return
            fs = _frontmost_fullscreen()
            if fs != self._last_fs:
                self._last_fs = fs
                # Re-anchor for the current box size. A no-op glide (start ==
                # target) if the anchor didn't actually move.
                self._reposition(self.width(), self.height())

        def _vp(self):
            """Fixed, generous render viewport for the web view. Width must exceed
            any box (incl. the narrow-column max-width) so wrapping is viewport-
            independent → stable measured height. Height only needs to be roomy;
            getBoundingClientRect reports true layout height even past the viewport."""
            avail = mw.app.primaryScreen().availableGeometry()
            return max(2200, avail.width()), max(600, avail.height() // 2)

        def _target_rect(self, w: int, h: int):
            """The final on-screen rect for a measured box (w,h): width clamp per
            column, x per column, y per row (bottom drops to the physical screen
            bottom in a fullscreen Space, else clears the Dock)."""
            avail = mw.app.primaryScreen().availableGeometry()
            row, col = _coherence_rc()
            # Side columns wrap to a narrower box so "left"/"right" actually hug the
            # edge; the centered column grows to fit its content.
            if col != 'center':
                max_w = max(440, avail.width() * 3 // 8)
                w = max(320, min(max_w, w))
            else:
                w = max(200, min(avail.width() - 80, w))
            h = max(40, min(avail.height() // 3, h))
            _M = 16   # screen-edge margin
            if col == 'left':
                x = avail.x() + _M
            elif col == 'right':
                x = avail.x() + avail.width() - w - _M
            else:
                x = avail.x() + (avail.width() - w) // 2
            if row == 'top':
                y = avail.y() + 24
            elif row == 'bottom':
                if _frontmost_fullscreen():
                    # No Dock in a fullscreen Space → drop to the physical bottom.
                    full = mw.app.primaryScreen().geometry()
                    y = full.y() + full.height() - h - 8
                else:
                    # Desktop → clear the Dock via the available-area bottom.
                    y = avail.y() + avail.height() - h - 24
            else:  # middle
                y = avail.y() + (avail.height() - h) // 2
            return QRect(x, y, w, h)

        def _reposition(self, w: int, h: int = 60, animate: bool = True,
                        move: bool = False):
            avail  = mw.app.primaryScreen().availableGeometry()
            row = _coherence_rc()[0]
            target = self._target_rect(w, h)
            x, w, h = target.x(), target.width(), target.height()
            # Publish the SETTLED target so the caption flare can shape to where the
            # box is going, not its mid-animation rect. Read by PulseOverlay.
            self._target_geom = target
            # Keep the view at the fixed generous viewport, shifted so the measured
            # box top-left lands at the window origin (0,0) — window shows EXACTLY
            # the box, no empty strip above it.
            ox, oy = getattr(self, '_box_origin', (0, 0))
            self._view.move(-ox, -oy)
            self._view.resize(*self._vp())
            cur = self.geometry()
            # "Off-screen" = outside the PHYSICAL screen, not the available area.
            # In a fullscreen Space the caption legitimately sits below avail.bottom
            # (there's no Dock there) — testing against avail.bottom() wrongly flagged
            # the on-screen caption as off-screen, so every re-fit replayed the entry
            # slide and moving to middle jumped to the top first.
            _full = mw.app.primaryScreen().geometry()
            off_screen = (cur.y() > _full.y() + _full.height()
                          or cur.y() + cur.height() < _full.y())
            # Cancel any in-flight geometry animation so rapid re-measures (image
            # loads) and moves don't stack / fight.
            prev = getattr(self, '_anim', None)
            if prev is not None:
                try:
                    if (prev.state() == QAbstractAnimation.State.Running
                            and prev.endValue() == target):
                        return
                except Exception:
                    pass
                try:
                    prev.stop()
                except Exception:
                    pass
                self._anim = None
            if not (animate and self.isVisible() and self.width() > 0):
                self.setGeometry(target)
                return
            if off_screen:
                # Entry slide-in: the window was shown off-screen (below the
                # physical bottom for a bottom anchor, above the top otherwise);
                # start there at the measured width/x and slide vertically to target.
                if row == 'bottom':
                    full = mw.app.primaryScreen().geometry()
                    self.setGeometry(QRect(x, full.y() + full.height() + 10, w, h))
                else:
                    self.setGeometry(QRect(x, avail.top() - h - 10, w, h))
                start, dur = self.geometry(), 240
            else:
                # Already on-screen: smoothly glide/resize from current geometry to
                # target (Tab+arrow moves, card flip, late image, font-size change).
                start, dur = cur, (200 if move else 170)
            if start == target:
                self.setGeometry(target)   # nothing changed → no needless animation
                return
            anim = QPropertyAnimation(self, b"geometry", self)
            anim.setDuration(dur)
            anim.setEasingCurve(QEasingCurve.Type.OutCubic)
            anim.setStartValue(start)
            anim.setEndValue(target)
            anim.start()
            self._anim = anim

        # Before measuring, strip TRAILING empty content from the card (the answer
        # side of AnKing cards ends with empty extra-field wrappers / <br>s / a
        # dangling Q-A separator that reserve big blank space at the bottom of the
        # box). meaningful() = has text or real media; everything trailing that
        # isn't gets removed, recursing into the last meaningful element to trim its
        # own trailing <br>s. Then report the .hud-bg box rect.
        _MEASURE_JS = (
            "(function(){"
            "function meaningful(n){"
            "if(n.nodeType===3)return n.textContent.replace(/\\s+/g,'').length>0;"
            "if(n.nodeType!==1)return false;"
            "var t=n.tagName;"
            "if(t==='IMG'||t==='SVG'||t==='CANVAS'||t==='VIDEO'||t==='AUDIO'||t==='TABLE')return true;"
            "if(n.querySelector&&n.querySelector('img,svg,canvas,video,audio,table'))return true;"
            "return n.textContent.replace(/\\s+/g,'').length>0;}"
            "function trim(el){var n,g=0;while((n=el.lastChild)&&g++<800){"
            "if(n.nodeType===3&&n.textContent.replace(/\\s+/g,'')===''){el.removeChild(n);continue;}"
            "if(n.nodeType===1&&(n.tagName==='BR'||n.tagName==='HR')){el.removeChild(n);continue;}"
            "if(n.nodeType===1&&!meaningful(n)){el.removeChild(n);continue;}"
            "if(n.nodeType===1){trim(n);}break;}}"
            "try{trim(document.getElementById('qa')||document.querySelector('.card-area')||document.body);}catch(e){}"
            "var b=document.querySelector('.hud-bg');"
            "var r=b?b.getBoundingClientRect():null;"
            "var bh=r?Math.round(r.height):document.body.offsetHeight,ch=-1;"
            # Recompute height from the DEEPEST real content (text/media) plus the
            # card-area bottom padding — trailing empty / over-tall wrappers on the
            # answer side otherwise reserve blank space the raw box rect includes.
            # Only ever SHRINK (never grow past the real box).
            "try{var qa=document.getElementById('qa')||document.querySelector('.card-area');"
            "if(qa&&r){var top=r.top,maxB=top;"
            # Skip out-of-flow (absolute/fixed) subtrees: they don't set the box's
            # real height but can render far below it (e.g. an off-box helper element
            # near the viewport bottom), which otherwise inflated the content height.
            "function oof(el){var p=el;while(p&&p!==qa){var ps=getComputedStyle(p).position;"
            "if(ps==='absolute'||ps==='fixed')return true;p=p.parentElement;}return false;}"
            # media elements: use their own box bottom
            "var md=qa.querySelectorAll('img,svg,canvas,video,audio,table,hr');"
            "for(var i=0;i<md.length;i++){if(oof(md[i]))continue;var cr=md[i].getBoundingClientRect();"
            "var mb=parseFloat(getComputedStyle(md[i]).marginBottom)||0;"
            "if(cr.bottom+mb>maxB)maxB=cr.bottom+mb;}"
            # text: measure the glyph bottom via a Range so a container's min-height
            # / padding below the text doesn't count as content.
            "var tw=document.createTreeWalker(qa,NodeFilter.SHOW_TEXT,null),tn,rng=document.createRange();"
            "while((tn=tw.nextNode())){if(tn.textContent.replace(/\\s+/g,'').length===0)continue;"
            "if(oof(tn.parentElement))continue;"
            "rng.selectNodeContents(tn);var tr=rng.getBoundingClientRect();if(tr.bottom>maxB)maxB=tr.bottom;}"
            "var ca=document.querySelector('.card-area');"
            "var padB=ca?(parseFloat(getComputedStyle(ca).paddingBottom)||0):0;"
            "ch=Math.ceil(maxB-top+padB);"
            "if(ch>0&&ch<bh)bh=ch;}}catch(e){}"
            "return JSON.stringify({w:document.body.offsetWidth,"
            "h:document.body.offsetHeight,"
            "bx:r?Math.round(r.left):0,by:r?Math.round(r.top):0,"
            "bw:r?Math.round(r.width):document.body.offsetWidth,"
            "bh:bh});})()")

        def _fit(self):
            """Measure the rendered box and size the window to it."""
            if not self.isVisible():
                return
            self._view.page().runJavaScript(self._MEASURE_JS, self._apply_fit)

        def _apply_fit(self, result):
            if not self.isVisible():
                return
            # Size the window to the VISIBLE .hud-bg box (bw/bh), not the full
            # <body> (w/h): body is display:inline-block wrapping an inline-flex
            # box, so it carries a baseline gap BELOW the box that grows with
            # font-size — that phantom strip looked like reserved room for a
            # non-existent bottom section.
            try:
                d = _json.loads(result)
                bw = int(d.get('bw') or 0)
                bh = int(d.get('bh') or 0)
                bx = int(d.get('bx') or 0)
                by = int(d.get('by') or 0)
                if bw > 0 and bh > 0:
                    w, h = bw, bh
                else:
                    w, h, bx, by = int(d['w']), int(d['h']), 0, 0
            except Exception:
                w, h, bx, by = 500, 60, 0, 0
            # The box may not sit flush at the viewport top-left (by>0). Pin it to
            # the window origin by offsetting the view, so the window shows EXACTLY
            # the box — otherwise there's `by` px of empty space above the box (and
            # the flare, filling the window, glowed that far above the box top).
            self._box_origin = (bx, by)
            self._reposition(w, h)   # slides in off-screen→target, or glides on resize
            # Window wraps the box exactly, so the flare inset is the whole window.
            self._box_inset = (0, 0, w, h)
            self._apply_glass()
            # Re-shape a live flare (red / one-shot green) to the new box so it
            # doesn't stay stuck at the previous size. No-ops for hidden overlays.
            try:
                if _card_timer_instance is not None:
                    _card_timer_instance.reposition()
            except Exception:
                pass

        def set_font_size(self, px: int, prev_px: int = 0):
            """Live font-size change WITHOUT a full re-render: swap an injected
            <style> so the glyphs ease to the new size (CSS transition above)
            while the window glides to fit. Used by the Shift+Tab +/- caption
            resize so it glides instead of snapping.

            We must NOT measure the box mid-transition — getBoundingClientRect
            returns the animating size, so re-fitting then chases a moving target
            and the window wobbles back and forth. Instead PREDICT the settled
            box (only the text scales; the chrome is fixed) and glide there once,
            in step with the glyph transition; then reconcile with a single _fit
            AFTER the transition has fully settled."""
            if not self.isVisible():
                return
            css = (
                ".hud-bg{{font-size:{px}px!important;}}"
                "#qa,.card,.card-area,"
                "#qa *:not(kbd):not(sub):not(sup),"
                ".card *:not(kbd):not(sub):not(sup)"
                "{{font-size:{px}px!important;}}"
            ).format(px=int(px))
            js = ("(function(){var s=document.getElementById('cap-fs-live');"
                  "if(!s){s=document.createElement('style');s.id='cap-fs-live';"
                  "document.head.appendChild(s);}s.textContent="
                  + _json.dumps(css) + ";})()")
            self._view.page().runJavaScript(js)
            # Predicted glide: scale only the text portion of the box, leaving the
            # fixed chrome (card-area padding + the deck-bars pill row) constant.
            if prev_px and prev_px > 0:
                ratio = px / float(prev_px)
                cur = self.geometry()
                _fixed_h = 2 * _PAD_H          # card-area L/R padding
                _fixed_v = 2 * _PAD_V + 11     # card padding + deck-bars row (~11px)
                w = round((cur.width()  - _fixed_h) * ratio) + _fixed_h
                h = round((cur.height() - _fixed_v) * ratio) + _fixed_v
                self._reposition(int(w), int(h))  # single OutCubic glide (~170ms)
            # Reconcile exactly once, after the 170ms font transition settles, so
            # this measures the STATIC box — a single small correction, no wobble.
            QTimer.singleShot(210, self._fit)

        def _on_loaded(self, _ok):
            if not self.isVisible():
                return
            # Fit now, then re-fit as async images/fonts settle — a late-loading
            # image would otherwise be clipped by an under-measured box (looked like
            # the bottom of the card was cut off). Re-fits that find no size change
            # are no-ops; genuine growth animates smoothly (see _reposition).
            self._fit()
            QTimer.singleShot(160, self._fit)
            QTimer.singleShot(480, self._fit)

        def _force_active(self):
            """Force the WebEngine page lifecycle to Active so it keeps rendering
            while Anki is a background app (else the caption paints blank over
            another window/fullscreen). Best-effort across Qt versions."""
            try:
                from PyQt6.QtWebEngineCore import QWebEnginePage as _QP
                self._view.page().setLifecycleState(_QP.LifecycleState.Active)
            except Exception as _e:
                _gtap_log(f"force_active err: {_e}")

        def refresh(self, animate_text=True):
            self._force_active()
            # animate_text=False for re-renders that aren't a new card/side (moving
            # the HUD, settings tweaks) so the typewriter reveal doesn't replay.
            r    = getattr(mw, 'reviewer', None)
            card = getattr(r, 'card', None)
            if not card:
                body, card_css = "<p>No card open</p>", ""
            else:
                state = getattr(r, 'state', 'question')
                try:
                    body = card.question() if state == 'question' else card.answer()
                except Exception:
                    body = "<p>Could not render card</p>"
                try:
                    nt = card.note_type()
                    card_css = (nt or {}).get('css', '')
                except Exception:
                    card_css = ''

            tw_js = (_typewriter_head(_cfg())
                     if (animate_text and _cfg().get("typewriter", True)) else "")

            # Deck counts — fixed-width depletion pills
            try:
                _nc, _lc, _rc = (mw.col.sched.counts()
                                  if mw.col else (0, 0, 0))
            except Exception:
                _nc, _lc, _rc = 0, 0, 0
            sm = self._session_max
            sm[0] = max(sm[0], _nc)
            sm[1] = max(sm[1], _lc)
            sm[2] = max(sm[2], _rc)
            _PILL_W   = 48  # max pill width px (~2× font-size)
            _denom    = max(sm) or 1  # shared baseline — highest count sets full width
            _fw_new   = int(_PILL_W * _nc / _denom)
            _fw_lrn   = int(_PILL_W * _lc / _denom)
            _fw_rev   = int(_PILL_W * _rc / _denom)

            # Position-aware content constraint (side columns need word-wrap)
            _narrow = _coherence_narrow()
            _avail = mw.app.primaryScreen().availableGeometry()
            # Caption text alignment (settings: left / center / right).
            _align = (_cfg().get('caption_align', 'center') or 'center').lower()
            _ja = {'left': 'flex-start', 'right': 'flex-end'}.get(_align, 'center')
            _ta = _align if _align in ('left', 'right') else 'center'
            # Match the reviewer's card font so caption text uses the app serif
            # (the HUD is a separate webview and otherwise falls back to the
            # note-type / system sans font — "fonts not working" in caption mode).
            _cap_font = _cfg().get('card_font', 'Anthropic Serif Text')
            # Caption text + image size (settings sliders).
            _cap_fs = max(8, int(_cfg().get('caption_font_size', 20)))
            _cap_img = max(80, int(_cfg().get('caption_image_max', 480)))
            _cap_img_h = max(40, int(_cap_img / 3))   # keep the ~3:1 height cap
            if _narrow:
                _max_content_w = max(440, _avail.width() * 3 // 8) - _PAD_H * 2
                _body_w_css = f"max-width:{_max_content_w}px; word-wrap:break-word;"
                _hud_max_w  = max(440, _avail.width() * 3 // 8)
            else:
                # Centered column may span nearly the full screen width — short
                # captions still shrink-to-fit (max-content), long ones can now grow
                # well past the old 1400px cap before wrapping.
                _body_w_css = "width:max-content;"
                _hud_max_w  = max(1400, _avail.width() - 80)

            # Resolve relative <img src="foo.jpg"> against the collection media
            # folder, exactly like the reviewer. Without a base URL, setHtml has an
            # empty origin and card images never load (caption showed no photos).
            from PyQt6.QtCore import QUrl
            try:
                _mdir = mw.col.media.dir() if mw.col else None
                _base = QUrl.fromLocalFile(_mdir + os.sep) if _mdir else QUrl()
            except Exception:
                _base = QUrl()

            self._view.stop()
            # Render into the fixed generous viewport so the FIRST measure already
            # sees final wrapping (no measure-at-stale-width → up-then-down jump).
            self._view.move(0, 0)
            self._view.resize(*self._vp())
            self._view.setHtml(f"""<!DOCTYPE html>
<html><head><meta charset="utf-8">
{tw_js}
<style>
* {{ box-sizing:border-box; margin:0; padding:0; }}
html, body {{ background: transparent !important; }}
body {{
  display: inline-block;
  {_body_w_css}
  margin: 0; padding: 0;
  /* Collapse the inline-block baseline/descender gap below the box (.hud-bg sets
     its own line-height) so body height == box height — no phantom bottom strip. */
  line-height: 0;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}}
.hud-bg {{
  display: inline-flex;
  flex-direction: column;
  align-items: stretch;
  background: rgba(16,16,22,0.72);
  border-radius: {_RADIUS}px;
  overflow: hidden;
  max-width: {_hud_max_w}px;
}}
.deck-bars {{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 5px 0 3px 0;
  flex-shrink: 0;
}}
.pill {{
  width: {_PILL_W}px;
  height: 3px;
  border-radius: 2px;
  background: rgba(255,255,255,0.08);
  overflow: hidden;
  flex-shrink: 0;
}}
.card-area {{
  display: flex; align-items: center; justify-content: {_ja};
  text-align: {_ta};
  padding: {_PAD_V}px {_PAD_H}px;
}}
{card_css}
*, *::before, *::after {{
  color: rgba(255,255,255,0.92) !important;
  background: transparent !important;
  -webkit-text-fill-color: rgba(255,255,255,0.92) !important;
  text-shadow: none !important;
  margin: 0 !important;
  padding: 0 !important;
}}
.hud-bg {{
  background: rgba(16,16,22,0.72) !important;
  font-size: {_cap_fs}px !important;
  line-height: 1.4 !important;
  padding: 0 !important;
}}
.card-area {{ padding: {_PAD_V}px {_PAD_H}px !important;
  justify-content: {_ja} !important; text-align: {_ta} !important; }}
/* App card serif in the HUD (note-type CSS is injected above and would
   otherwise set its own font). kbd/shortcut keys left alone. */
#qa, .card, .card-area, #qa *:not(kbd), .card *:not(kbd) {{
  font-family: "{_cap_font}", -apple-system, Georgia, serif !important;
}}
/* Caption font-size slider. Force ALL card text to the chosen size (the AnKing
   "Extra" field etc. set their own larger font-size, which the container-only
   rule didn't override). Exclude kbd (shortcut keys) and sub/sup so those keep
   their relative sizing (e.g. chemistry subscripts). */
#qa, .card, .card-area,
#qa *:not(kbd):not(sub):not(sup), .card *:not(kbd):not(sub):not(sup) {{
  font-size: {_cap_fs}px !important;
}}
/* Smooth glyph scaling when the font size is nudged live (Shift+Tab +/-). The
   size itself is swapped by an injected <style id="cap-fs-live"> (see
   HUD.set_font_size); this transition eases the change instead of snapping. */
.hud-bg,
#qa, .card, .card-area,
#qa *:not(kbd):not(sub):not(sup), .card *:not(kbd):not(sub):not(sup) {{
  transition: font-size 170ms ease !important;
}}
.deck-bars {{ padding: 5px 0 3px 0 !important; gap: 8px !important; }}
.pill {{ background: rgba(255,255,255,0.08) !important; padding: 0 !important; margin: 0 !important; }}
.fill-new {{ display:block; height:100%; width:{_fw_new}px; background:rgba(91,158,248,0.7) !important; border-radius:2px; }}
.fill-lrn {{ display:block; height:100%; width:{_fw_lrn}px; background:rgba(248,113,113,0.7) !important; border-radius:2px; }}
.fill-rev {{ display:block; height:100%; width:{_fw_rev}px; background:rgba(74,222,128,0.7) !important; border-radius:2px; }}
#qa {{ display: block; }}
img {{ max-width: min({_cap_img}px, 100%) !important; max-height: {_cap_img_h}px !important;
       object-fit: contain !important;
       /* block (not inline) so the bottom margin actually adds layout height —
          inline images ignore vertical margins. Centered; the height measure adds
          this margin back in so it isn't trimmed away. margin-TOP stays 0: image-
          occlusion masks are absolutely positioned, and a top margin would shift
          them down and expose the top of the answer. No opacity, for the same
          reason (translucent masks would reveal what's under them). */
       display: block !important; margin: 0 auto 14px auto !important; }}
/* Lists: keep items left-aligned (bullets + wrapped lines line up), but let
   the list box shrink-to-fit and center as a block, so a left-aligned list
   reads centered on the fullscreen HUD instead of hugging the left edge. */
.card-area ul, .card-area ol {{
  display: inline-block !important;
  text-align: left !important;
  padding-left: 1.5em !important;
  margin: 0 auto !important;
}}
.card-area li {{ text-align: left !important; }}
/* Caption mode owns the timing feedback via the pulse, so hide the AnKing
   card's own countdown (.timer) — and its tags — in the HUD. */
.timer, #timer,
#tags-container, .tags-container, .tags {{ display: none !important; }}
/* Hide Anki's Q/A separator (<hr id=answer>) in the caption — it read as a
   stray underline and isn't needed here. */
hr, #answer {{ display: none !important; }}
</style></head>
<body><div class="hud-bg">
  <div class="deck-bars">
    <div class="pill"><div class="fill-new"></div></div>
    <div class="pill"><div class="fill-lrn"></div></div>
    <div class="pill"><div class="fill-rev"></div></div>
  </div>
  <div class="card-area"><div id="qa" class="card">{body}</div></div>
</div></body></html>""", _base)

        def _apply_glass(self):
            try:
                msg, cls = _bridge()
                ns_win = msg(c_void_p, c_void_p(int(self.winId())), b"window")
                if not ns_win:
                    return
                # To float over ANOTHER app's native-fullscreen Space the window
                # must be a NON-ACTIVATING NSPanel (plain NSWindows can't cross a
                # fullscreen Space's isolation layer). The Tool flag makes Qt back
                # this widget with an NSPanel; here we add the nonactivating-panel
                # style bit and lift the level above the menu bar.
                #   collectionBehavior: 1 = CanJoinAllSpaces (appear on every
                #   Space, incl. other apps' fullscreen + Anki's own), 16 =
                #   Stationary (don't get swept by Space switches). NOTE: 256
                #   (FullScreenAuxiliary) is the OPPOSITE of what we want here —
                #   it ties the window to its OWN app's fullscreen — so it's gone.
                is_panel = msg(c_bool, ns_win, b"isKindOfClass:",
                               (c_void_p,), (cls("NSPanel"),))
                # The NON-ACTIVATING style bit (128) is REQUIRED to cross into
                # another app's fullscreen Space. Re-assert it, but ONLY when it's
                # actually missing — calling setStyleMask rebuilds the window frame
                # and cycles resignKey/becomeKey (the focus churn), so we must not
                # do it redundantly. Checking the current mask makes this idempotent
                # by value: set once when Qt hasn't applied it (or reset it), skip
                # otherwise. The cheaper flags below don't rebuild the frame.
                if is_panel:
                    cur_mask = int(msg(c_ulong, ns_win, b"styleMask"))
                    if not (cur_mask & 128):  # NSWindowStyleMaskNonactivatingPanel
                        msg(None, ns_win, b"setStyleMask:", (c_ulong,),
                            (cur_mask | 128,))
                    msg(None, ns_win, b"setFloatingPanel:", (c_bool,), (True,))
                    msg(None, ns_win, b"setBecomesKeyOnlyIfNeeded:",
                        (c_bool,), (True,))
                    # CRITICAL: a default NSPanel HIDES when its app deactivates —
                    # i.e. the moment you switch away from Anki. That made the
                    # caption vanish whenever Anki lost focus. Keep it visible.
                    msg(None, ns_win, b"setHidesOnDeactivate:", (c_bool,),
                        (False,))
                # NSStatusWindowLevel = 25 (above the menu bar, below the
                # screensaver) — high enough to composite over a fullscreen app.
                msg(c_void_p, ns_win, b"setLevel:", (c_int,), (25,))
                msg(c_void_p, ns_win, b"setCollectionBehavior:", (c_ulong,),
                    (1 | 16,))
                msg(c_void_p, ns_win, b"setOpaque:", (c_bool,), (False,))
                msg(c_void_p, ns_win, b"setHasShadow:", (c_bool,), (False,))
                # Click-through: the caption is a passive read-out, so let every
                # mouse event fall through to the app underneath. Done at the
                # NSWindow level because Qt's WA_TransparentForMouseEvents doesn't
                # reliably cover the QWebEngineView's own native surface.
                msg(None, ns_win, b"setIgnoresMouseEvents:", (c_bool,), (True,))
                msg(c_void_p, ns_win, b"setBackgroundColor:", (c_void_p,),
                    (msg(c_void_p, cls("NSColor"), b"clearColor"),))
                # Clip the composited content to a rounded rect at the CALayer level.
                # SkyLight blur is intentionally NOT used here — it applies to the full
                # rectangular window bounding box, which makes transparent corners
                # appear tinted and the window look square. The CSS background is the tint.
                cv = msg(c_void_p, ns_win, b"contentView")
                if cv:
                    msg(c_void_p, cv, b"setWantsLayer:", (c_bool,), (True,))
                    layer = msg(c_void_p, cv, b"layer")
                    if layer:
                        msg(c_void_p, layer, b"setCornerRadius:",
                            (c_double,), (c_double(float(_RADIUS)),))
                        msg(c_void_p, layer, b"setMasksToBounds:",
                            (c_bool,), (True,))
            except Exception as e:
                _gtap_log(f"coherence glass: {e}")

        def toggle(self):
            if self.isVisible():
                if getattr(self, '_anim', None) is not None:
                    self._anim.stop()
                    self._anim = None
                self._space_timer.stop()
                self.hide()
                # Only pull Anki back to the front if it was already the focused
                # app. If the user is working in another app, closing the caption
                # (Tab+\) must NOT steal focus back to Anki.
                if _anki_focused and not mw.isMinimized() and mw.isVisible():
                    mw.activateWindow()
            else:
                # Start off-screen in the slide-in direction.
                # The window uses a placeholder width centered on screen so the
                # animation slides in vertically without any horizontal jump.
                # The view's geometry is set wider than the window so the
                # viewport is spacious enough to measure natural content width.
                avail  = mw.app.primaryScreen().availableGeometry()
                row, col = _coherence_rc()
                narrow = col != 'center'
                vp_w   = max(440, avail.width() * 3 // 8) if narrow else 2000
                init_w = vp_w if narrow else min(400, avail.width() - 80)
                # Start off-screen at the TARGET column's x (not centered) so the
                # slide-in is purely vertical — otherwise a corner anchor first
                # flashed centered, then jumped sideways to the corner.
                _M = 16
                if col == 'left':
                    ix = avail.x() + _M
                elif col == 'right':
                    ix = avail.x() + avail.width() - init_w - _M
                else:
                    ix = avail.x() + (avail.width() - init_w) // 2
                # Slide in from the bottom edge for a bottom anchor, else the top.
                # Start BELOW the physical screen bottom (not avail.bottom(), which
                # sits above the Dock and left the placeholder — sized with a GUESS
                # width — briefly visible; for center/right its x depends on width,
                # so it flashed at the wrong x then jumped to the real-width x).
                _full = mw.app.primaryScreen().geometry()
                if row == 'bottom':
                    self.setGeometry(ix, _full.y() + _full.height() + 10, init_w, 60)
                else:
                    self.setGeometry(ix, avail.y() - 300, init_w, 200)
                self._view.move(0, 0)
                self._view.resize(*self._vp())
                # Apply the non-activating NSPanel style (style bit 128,
                # becomesKeyOnlyIfNeeded, level, CanJoinAllSpaces) BEFORE the first
                # show(). _apply_glass otherwise runs only after the first render,
                # so the very first show ordered a not-yet-nonactivating panel to
                # the front and stole focus from a fullscreen app. winId() forces
                # native-window creation, so the NSPanel exists to configure here.
                try:
                    self._apply_glass()
                except Exception:
                    pass
                self.show()  # Tool/NSPanel + WA_ShowWithoutActivating → no focus steal
                self._last_fs = None       # re-evaluate the anchor fresh this open
                self._space_timer.start()  # re-anchor on fullscreen↔desktop changes
                # Wake the WebEngine renderer before handing it HTML (avoids
                # blank-on-reopen). Activating NSApp is the surest wake, but it
                # steals focus — so ONLY do it when Anki is already frontmost. When
                # another app is focused we must NOT activate; we rely on the launch
                # wrapper's --disable-renderer-backgrounding flags keeping the
                # renderer awake, and add a defensive second refresh.
                if _anki_focused:
                    try:
                        _msg, _cls = _bridge()
                        _ns_app = _msg(c_void_p, _cls(b"NSApplication"),
                                       b"sharedApplication")
                        _msg(c_void_p, _ns_app,
                             b"activateIgnoringOtherApps:", (c_bool,), (True,))
                    except Exception:
                        pass
                    QTimer.singleShot(80, self.refresh)
                else:
                    QTimer.singleShot(80, self.refresh)
                    QTimer.singleShot(260, lambda: self.refresh(animate_text=False))

    return HUD()


_coherence_hud: Optional[object] = None

# Menu fade-in token. The fade fires once per token: the injected script fades
# only when sessionStorage's stored token differs from the current one, then
# stores it. Anki's 2–3 re-render burst shares one token → a single fade; each
# armed navigation (startup, opening a deck → overview, returning from study)
# bumps the token → fades again, even within the same session/webview. Using a
# token instead of a time window means opening a deck right after the deck
# browser faded still fades (they'd share sessionStorage otherwise).
_menu_fade_token = 1


def _arm_menu_fade():
    global _menu_fade_token
    _menu_fade_token += 1


def _nudge_coherence(dr, dc):
    """Tab+arrow: move the caption HUD one cell across the 3x3 screen grid, clamped
    at the edges. A pure move (same width class) glides; crossing into/out of the
    centered column re-renders because the wrap width changes."""
    row, col = _coherence_rc()
    ri = max(0, min(2, _COH_ROWS.index(row) + dr))
    ci = max(0, min(2, _COH_COLS.index(col) + dc))
    new_pos = f"{_COH_ROWS[ri]}-{_COH_COLS[ci]}"
    old_narrow = (col != 'center')
    cfg = _cfg() or {}
    cfg['coherence_position'] = new_pos
    mw.addonManager.writeConfig(__name__, cfg)
    _gtap_log(f"coherence_position → {new_pos}")
    if _coherence_hud and _coherence_hud.isVisible():
        if (_COH_COLS[ci] != 'center') != old_narrow:
            # wrap width changed → re-render + reposition (no typewriter replay:
            # it's the same card, just a new position)
            _coherence_hud.refresh(animate_text=False)
        else:
            _coherence_hud._reposition(_coherence_hud.width(),
                                       _coherence_hud.height(),
                                       animate=True, move=True)


def _toggle_coherence():
    global _coherence_hud
    _gtap_log("_toggle_coherence called")
    if _coherence_hud is None:
        try:
            _gtap_log("creating HUD...")
            _coherence_hud = _make_coherence_hud()
            _gtap_log(f"HUD created: {type(_coherence_hud).__name__}")
        except Exception as e:
            import traceback
            _gtap_log(f"coherence init error: {e}\n{traceback.format_exc()}")
            return
    _gtap_log(f"toggling HUD visible={_coherence_hud.isVisible()}")
    _coherence_hud.toggle()
    # Caption ownership of the timing feedback flips with the HUD: re-evaluate
    # the countdown bar (hide when entering, restore on exit) and re-target any
    # live pulse to the new owner window (main window ↔ HUD).
    try:
        if _card_timer_instance is not None:
            _card_timer_instance.sync_bar_pref()
            ov = getattr(_card_timer_instance, "_overlay", None)
            if ov is not None and ov.isVisible():
                ov.set_active(False)
                # Re-show on the new host only if it's on screen: entering caption
                # → the HUD (always visible); exiting → the main window (skip when
                # it's minimized, else the flare lingers at its stale location).
                if _caption_visible() or _main_on_screen():
                    ov.set_active(True)
                    # The HUD slides/measures over ~120ms after toggle-on, so its
                    # frame isn't final yet — reshape the glow once it settles.
                    QTimer.singleShot(180, lambda o=ov: o.reposition()
                                      if o.isVisible() else None)
    except Exception:
        pass


def _coherence_refresh(animate_text=True):
    if _coherence_hud and _coherence_hud.isVisible():
        _coherence_hud.refresh(animate_text=animate_text)


def _caption_visible():
    """True while the coherence/caption HUD (Tab+\\) is on screen. In caption
    mode the HUD owns the timing feedback: the countdown bar is suppressed and
    the red/green pulse reshapes itself to the HUD frame instead of the main
    window."""
    try:
        return bool(_coherence_hud is not None and _coherence_hud.isVisible())
    except Exception:
        return False


def _main_on_screen():
    """True when the main Anki window is actually visible (not minimized/hidden).
    The card-timer bar and red flare ride the main window, so they must never be
    shown against it while it's minimized — otherwise they linger at the stale
    window location (e.g. after exiting caption mode with Anki minimized)."""
    try:
        return bool(mw.isVisible() and not mw.isMinimized())
    except Exception:
        return True


# ---------------------------------------------------------------------------
# Pomodoro timer — XP bar + break screen with hold-Space bypass
# ---------------------------------------------------------------------------

def _make_pomodoro():
    """Build and return a started Pomodoro manager."""
    from PyQt6.QtWidgets import QWidget, QVBoxLayout
    from PyQt6.QtWebEngineWidgets import QWebEngineView
    from PyQt6.QtGui import QColor, QPainter, QBrush, QPainterPath, QCursor
    from PyQt6.QtCore import QRectF, QPropertyAnimation, QEasingCurve
    from ctypes import c_double

    _pcfg          = _cfg()
    WORK_SECS      = max(1, int(_pcfg.get('pomodoro_work_mins', 25))) * 60
    SHORT_SECS     = max(1, int(_pcfg.get('pomodoro_short_break_mins', 5))) * 60
    LONG_SECS      = max(1, int(_pcfg.get('pomodoro_long_break_mins', 15))) * 60
    # every Nth break is a long one; 0 disables long breaks entirely
    LONG_AFTER     = max(0, int(_pcfg.get('pomodoro_long_break_every', 4)))
    BYPASS_SECS    = 3.0      # hold duration to skip break
    BYPASS_TICK_MS = 50       # bypass animation update interval
    TINT_A         = int(float(_pcfg.get('pomodoro_break_tint_alpha', 0.11)) * 255)  # peak blue edge alpha 0–255
    TINT_REACH     = max(0.05, min(0.5, float(_pcfg.get('pomodoro_break_tint_reach', 0.45))))  # reach toward centre
    TINT_RADIUS    = int(_pcfg.get('win_corner_radius', 11))  # match the window's rounded corners
    TINT_FADE_MS   = int(_pcfg.get('pomodoro_break_tint_fade_ms', 600))  # fade-in duration (stays static after)
    BAR_H          = 3        # xp bar pixel height

    # ── XP bar ──────────────────────────────────────────────────────────────
    _XP_DIM       = 0.22   # opacity when idle
    _XP_FULL      = 1.0    # opacity when nearby
    _XP_PROXIMITY = 60     # px from bar edge to count as "nearby"

    class XPBar(QWidget):
        def __init__(self):
            super().__init__(None,
                Qt.WindowType.FramelessWindowHint |
                Qt.WindowType.WindowStaysOnTopHint |
                Qt.WindowType.Tool)
            self.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground)
            self.setAttribute(Qt.WidgetAttribute.WA_ShowWithoutActivating)
            self.setFixedHeight(BAR_H)
            self._p = 0.0
            self._native_done = False
            self._opacity_anim = None
            self.setWindowOpacity(_XP_DIM)
            self._hover_timer = QTimer(self)
            self._hover_timer.setInterval(120)
            self._hover_timer.timeout.connect(self._check_proximity)

        def _check_proximity(self):
            cur = QCursor.pos()
            geo = self.geometry()
            px = _XP_PROXIMITY
            nearby = (geo.x() - px <= cur.x() <= geo.right() + px and
                      geo.y() - px <= cur.y() <= geo.bottom() + px)
            target = _XP_FULL if nearby else _XP_DIM
            if abs(self.windowOpacity() - target) > 0.01:
                if self._opacity_anim:
                    self._opacity_anim.stop()
                anim = QPropertyAnimation(self, b"windowOpacity", self)
                anim.setDuration(200)
                anim.setEasingCurve(QEasingCurve.Type.OutCubic)
                anim.setStartValue(self.windowOpacity())
                anim.setEndValue(target)
                anim.start()
                self._opacity_anim = anim

        def reposition(self):
            geo = mw.geometry()
            self.setGeometry(geo.x(), geo.y() + geo.height() - BAR_H,
                             geo.width(), BAR_H)

        def set_progress(self, p):
            self._p = max(0.0, min(1.0, p))
            self.update()

        def showEvent(self, ev):
            super().showEvent(ev)
            if not self._native_done:
                QTimer.singleShot(0, self._apply_native)
            self.setWindowOpacity(_XP_DIM)
            self._hover_timer.start()

        def hideEvent(self, ev):
            super().hideEvent(ev)
            self._hover_timer.stop()
            self._detach_native()      # remove child-window link so the parent
            self._native_done = False  # can fully occlude; re-assert on next show

        def _detach_native(self):
            # Detach from the parent NSWindow and order out. Leaving the child
            # window attached keeps the main window's surfaces from being treated
            # as occluded on minimize — which leaves them blank on restore and
            # keeps this bar visible. Detaching lets minimize behave normally.
            try:
                msg, cls = _bridge()
                ns = msg(c_void_p, c_void_p(int(self.winId())), b"window")
                if not ns:
                    return
                parent = msg(c_void_p, ns, b"parentWindow")
                if parent:
                    msg(None, parent, b"removeChildWindow:", (c_void_p,), (ns,))
                msg(None, ns, b"orderOut:", (c_void_p,), (None,))
            except Exception:
                pass

        def _apply_native(self):
            try:
                msg, cls = _bridge()
                ns = msg(c_void_p, c_void_p(int(self.winId())), b"window")
                if not ns:
                    return
                msg(c_void_p, ns, b"setOpaque:", (c_bool,), (False,))
                msg(c_void_p, ns, b"setHasShadow:", (c_bool,), (False,))
                msg(c_void_p, ns, b"setBackgroundColor:", (c_void_p,),
                    (msg(c_void_p, cls("NSColor"), b"clearColor"),))
                # Attach as child window of the main Anki NSWindow.
                # Child windows always composite above their parent regardless
                # of window level, so no z-order fighting needed.
                existing_parent = msg(c_void_p, ns, b"parentWindow")
                if not existing_parent:
                    main_win = msg(c_void_p, c_void_p(int(mw.winId())), b"window")
                    if main_win:
                        msg(c_void_p, main_win, b"addChildWindow:ordered:",
                            (c_void_p, c_long), (ns, 1))  # NSWindowAbove = 1
                self._native_done = True
            except Exception:
                pass

        def paintEvent(self, ev):
            if self._p <= 0:
                return
            r   = float(_cfg().get('win_corner_radius', 11))
            w   = float(self.width())
            h   = float(BAR_H)
            # Clip to the bottom portion of a rounded rect matching the window
            # corner radius. The rect extends well above the bar so only the
            # bottom-left and bottom-right corners curve — the top doesn't.
            clip = QPainterPath()
            clip.addRoundedRect(QRectF(0.0, -(r * 2), w, r * 2 + h), r, r)
            p = QPainter(self)
            p.setRenderHint(QPainter.RenderHint.Antialiasing)
            p.setClipPath(clip)
            p.setPen(Qt.PenStyle.NoPen)
            p.setBrush(QBrush(QColor(100, 210, 255, 200)))
            p.drawRect(QRectF(0.0, 0.0, w * self._p, h))
            p.end()

    # ── Break screen ─────────────────────────────────────────────────────────
    class BreakScreen:
        """Break overlay rendered *inside* the main reviewer webview (mw.web) as a
        DOM layer — so it appears like a card within the main window and shows even
        while Anki is in native fullscreen (unlike a separate NSWindow, which opens
        on the default Space). Self-heals each second in case the card re-renders."""
        _STYLE = (
            "<style>"
            "#__janki_break,#__janki_break *{outline:none!important;border:none!important;}"
            # Hide the card with display:none on <body> — a descendant CANNOT
            # un-hide a display:none ancestor (unlike visibility, which a note type
            # could beat with visibility:visible). The overlay lives under <html>
            # (sibling of <body>), so it still renders. Card fully gone; the window's
            # glass/vibrancy shows through. Reverts when the overlay is removed.
            "html{background:transparent!important;}"
            "body{display:none!important;}"
            "#__janki_break{position:fixed;inset:0;z-index:2147483600;"
            "display:flex;align-items:center;justify-content:center;"
            "background:transparent;"   # no slab — just the glass window behind
            # match the app's card serif (loaded in the reviewer webview already)
            "font-family:\"Anthropic Serif Text\",-apple-system,Georgia,serif;}"
            "#__janki_break .jb-panel{background:transparent;"   # fully transparent panel
            "padding:34px 52px;text-align:center;"
            "color:rgba(255,255,255,0.94);min-width:340px;"
            "text-shadow:0 1px 4px rgba(0,0,0,0.55);}"   # legibility over glass
            "#__janki_break .jb-title{font-size:24px;font-weight:600;"
            "color:rgba(80,190,255,0.95);margin-bottom:4px;}"
            "#__janki_break .jb-session{font-size:12px;color:rgba(255,255,255,0.3);"
            "margin-bottom:22px;letter-spacing:.05em;}"
            "#__janki_break .jb-timer{font-size:58px;font-weight:200;"
            "font-variant-numeric:tabular-nums;letter-spacing:4px;margin-bottom:26px;}"
            "#__janki_break .jb-hint{font-size:12px;color:rgba(255,255,255,0.28);"
            "margin-bottom:10px;}"
            "#__jbreak_bt{height:5px;background:rgba(255,255,255,0.14);"
            "border-radius:3px;overflow:hidden;display:none;width:100%;margin:0 auto;}"
            "#__jbreak_bf{height:100%;width:0%;background:rgba(90,200,255,0.95);"
            "border-radius:3px;transition:width .05s linear;}"
            "</style>"
        )
        # JS to (re)create the fixed overlay container from the stored HTML.
        _ENSURE = (
            "var o=document.getElementById('__janki_break');"
            "if(!o&&window.__jbreakHtml){o=document.createElement('div');"
            "o.id='__janki_break';"
            "o.style.cssText='position:fixed;inset:0;z-index:2147483600;';"
            "document.documentElement.appendChild(o);"  # <html>, not body — survives card re-renders
            "o.innerHTML=window.__jbreakHtml;}"
        )

        def _web(self):
            return getattr(mw, "web", None)

        def _eval(self, js: str):
            web = self._web()
            if web is None:
                return
            try:
                web.eval(js)
            except Exception:
                pass

        # No-ops kept so the manager's call sites stay unchanged.
        def reposition(self):
            pass

        def show(self):
            pass

        def _center_offset_px(self):
            """Pixels to nudge the break panel so it centres on the WINDOW rather
            than on mw.web. In Focus Mode the toolbar/answer bar are hidden and
            mw.web's centre no longer coincides with the window centre, so the
            flex-centred panel drifts (looked low). We know mw.web's on-screen
            position and the window rect, so compute the delta directly. Positive
            shifts the panel downward."""
            try:
                from aqt.qt import QPoint
                web = mw.web
                web_top = web.mapToGlobal(QPoint(0, 0)).y()
                web_h = web.height()
                win = mw.geometry()
                win_center = win.y() + win.height() / 2.0
                return int(round((win_center - web_top) - web_h / 2.0))
            except Exception:
                return 0

        def render_static(self, remaining: int, session: int, is_long: bool):
            """Inject the break overlay into mw.web — called ONCE per break."""
            import json
            mins, secs = divmod(remaining, 60)
            title = "Long Break" if is_long else "Break"
            _sess_txt = f"Session {session} of {LONG_AFTER}" if LONG_AFTER > 0 else f"Session {session}"
            _off = self._center_offset_px()
            _panel_open = ("<div class='jb-panel' style='transform:translateY(%dpx)'>"
                           % _off) if _off else "<div class='jb-panel'>"
            inner = self._STYLE + _panel_open + (
                f"<div class='jb-title'>{title}</div>"
                f"<div class='jb-session'>{_sess_txt}</div>"
                f"<div class='jb-timer' id='__jbreak_timer'>{mins}:{secs:02d}</div>"
                "<div class='jb-hint'>Hold Space to skip</div>"
                "<div id='__jbreak_bt'><div id='__jbreak_bf'></div></div>"
                "</div>"
            )
            self._eval(
                "(function(){window.__jbreakHtml=" + json.dumps(inner) + ";"
                + self._ENSURE +
                "o=document.getElementById('__janki_break');"
                "if(o)o.innerHTML=window.__jbreakHtml;})()"
            )

        def update_time(self, remaining: int):
            """Update the countdown text via JS; re-create the overlay if a card
            render wiped it (self-healing)."""
            import json
            mins, secs = divmod(remaining, 60)
            self._eval(
                "(function(){" + self._ENSURE +
                "var e=document.getElementById('__jbreak_timer');"
                "if(e)e.textContent=" + json.dumps(f"{mins}:{secs:02d}") + ";})()"
            )

        def set_bypass(self, frac: float):
            vis = "block" if frac > 0 else "none"
            w   = f"{frac * 100:.1f}%"
            self._eval(
                "(function(){var t=document.getElementById('__jbreak_bt');"
                "var f=document.getElementById('__jbreak_bf');"
                f"if(t)t.style.display='{vis}';"
                f"if(f)f.style.width='{w}';}})()"
            )

        def hide(self):
            self._eval(
                "(function(){var o=document.getElementById('__janki_break');"
                "if(o)o.remove();window.__jbreakHtml=null;})()"
            )

    class BreakTint(QWidget):
        """Static (non-pulsing) pale-blue full-screen edge tint — a calm 'break due'
        cue. Same full-screen edge-gradient shape as the red card pulse (reaching
        ~TINT_REACH toward the centre, rounded corners), but steady and blue."""
        def __init__(self):
            super().__init__(None,
                Qt.WindowType.FramelessWindowHint |
                Qt.WindowType.WindowStaysOnTopHint |
                Qt.WindowType.Tool)
            self.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground)
            self.setAttribute(Qt.WidgetAttribute.WA_ShowWithoutActivating)
            self.setAttribute(Qt.WidgetAttribute.WA_TransparentForMouseEvents)
            self._native_done = False
            self._fade = None

        def reposition(self):
            try:
                # In native fullscreen frameGeometry can under-report (the glow then
                # stops short of the screen bottom). The window's screen rect is the
                # authoritative full-screen size, so use it while fullscreen.
                if mw.isFullScreen():
                    scr = mw.screen()
                    if scr is None and mw.windowHandle() is not None:
                        scr = mw.windowHandle().screen()
                    if scr is not None:
                        g = scr.geometry()
                        if g.width() > 0 and g.height() > 0:
                            self.setGeometry(g.x(), g.y(), g.width(), g.height())
                            return
                fg = mw.frameGeometry()
                if fg.width() > 0 and fg.height() > 0:
                    self.setGeometry(fg.x(), fg.y(), fg.width(), fg.height())
            except Exception:
                pass

        def show(self):
            global _break_tint_active
            _break_tint_active = True
            # Blue break cue overrides the red card pulse — kill any active red now.
            if _card_timer_instance is not None and getattr(_card_timer_instance, "_overlay", None):
                _card_timer_instance._overlay.set_active(False)
            self.reposition()
            self.setWindowOpacity(0.0)   # fade in from transparent, then hold static
            super().show()
            self.update()
            self._start_fade()

        def _start_fade(self):
            try:
                if self._fade:
                    self._fade.stop()
                anim = QPropertyAnimation(self, b"windowOpacity", self)
                anim.setDuration(TINT_FADE_MS)
                anim.setStartValue(0.0)
                anim.setEndValue(1.0)
                anim.setEasingCurve(QEasingCurve.Type.OutCubic)
                anim.start()
                self._fade = anim
            except Exception:
                self.setWindowOpacity(1.0)

        def showEvent(self, ev):
            super().showEvent(ev)
            if not self._native_done:
                QTimer.singleShot(0, self._apply_native)

        def hide(self):
            global _break_tint_active
            _break_tint_active = False
            if self._fade:
                try:
                    self._fade.stop()
                except Exception:
                    pass
            super().hide()

        def hideEvent(self, ev):
            super().hideEvent(ev)
            self._detach_native()
            self._native_done = False

        def _detach_native(self):
            try:
                msg, cls = _bridge()
                ns = msg(c_void_p, c_void_p(int(self.winId())), b"window")
                if not ns:
                    return
                parent = msg(c_void_p, ns, b"parentWindow")
                if parent:
                    msg(None, parent, b"removeChildWindow:", (c_void_p,), (ns,))
                msg(None, ns, b"orderOut:", (c_void_p,), (None,))
            except Exception:
                pass

        def _apply_native(self):
            try:
                msg, cls = _bridge()
                ns = msg(c_void_p, c_void_p(int(self.winId())), b"window")
                if not ns:
                    return
                msg(c_void_p, ns, b"setOpaque:", (c_bool,), (False,))
                msg(c_void_p, ns, b"setHasShadow:", (c_bool,), (False,))
                msg(c_void_p, ns, b"setIgnoresMouseEvents:", (c_bool,), (True,))
                msg(c_void_p, ns, b"setBackgroundColor:", (c_void_p,),
                    (msg(c_void_p, cls("NSColor"), b"clearColor"),))
                msg(c_void_p, ns, b"setCollectionBehavior:", (c_ulong,), (1 | 256,))
                if not msg(c_void_p, ns, b"parentWindow"):
                    main = msg(c_void_p, c_void_p(int(mw.winId())), b"window")
                    if main:
                        msg(c_void_p, main, b"addChildWindow:ordered:",
                            (c_void_p, c_long), (ns, 1))
                self._native_done = True
            except Exception:
                pass

        def paintEvent(self, ev):
            from PyQt6.QtGui import QLinearGradient, QPainterPath
            a = int(TINT_A)
            if a <= 0:
                return
            w = float(self.width()); h = float(self.height())
            if w <= 0 or h <= 0:
                return
            pt = QPainter(self)
            pt.setRenderHint(QPainter.RenderHint.Antialiasing)
            pt.setPen(Qt.PenStyle.NoPen)
            clip = QPainterPath()
            clip.addRoundedRect(QRectF(0, 0, w, h), float(TINT_RADIUS), float(TINT_RADIUS))
            pt.setClipPath(clip)
            # Lighten (max) compositing so overlapping edge bands don't ADD in the
            # corners — removes the visible colour seam.
            pt.setCompositionMode(QPainter.CompositionMode.CompositionMode_Lighten)
            bv = h * TINT_REACH
            bh = w * TINT_REACH
            edge = QColor(120, 175, 255, a)
            clear = QColor(120, 175, 255, 0)
            gt = QLinearGradient(0, 0, 0, bv)
            gt.setColorAt(0.0, edge); gt.setColorAt(1.0, clear)
            pt.fillRect(QRectF(0, 0, w, bv), QBrush(gt))
            gb = QLinearGradient(0, h, 0, h - bv)
            gb.setColorAt(0.0, edge); gb.setColorAt(1.0, clear)
            pt.fillRect(QRectF(0, h - bv, w, bv), QBrush(gb))
            gl = QLinearGradient(0, 0, bh, 0)
            gl.setColorAt(0.0, edge); gl.setColorAt(1.0, clear)
            pt.fillRect(QRectF(0, 0, bh, h), QBrush(gl))
            gr = QLinearGradient(w, 0, w - bh, 0)
            gr.setColorAt(0.0, edge); gr.setColorAt(1.0, clear)
            pt.fillRect(QRectF(w - bh, 0, bh, h), QBrush(gr))
            pt.end()

    # ── Manager ──────────────────────────────────────────────────────────────
    class Pomodoro:
        def __init__(self):
            self._elapsed_ms    = 0      # ms spent in current work period
            self._break_rem_ms  = 0      # ms remaining in current break
            self._break_disp_s  = -1     # last second value rendered (avoid full reloads every 50 ms)
            self._sessions      = 0
            self._on_break      = False
            self._break_pending = False  # work timer expired; break waits for the next card
            self._is_long       = False
            self._bypass_t      = 0.0
            self._xp = XPBar()
            self._bs = BreakScreen()
            self._tint = BreakTint()

            self._ticker = QTimer()
            self._ticker.setInterval(50)   # 20 fps — smooth XP bar
            self._ticker.timeout.connect(self._tick)

            self._bypass_ticker = QTimer()
            self._bypass_ticker.setInterval(BYPASS_TICK_MS)
            self._bypass_ticker.timeout.connect(self._bypass_tick)

            self._in_review = False   # XP only ticks + shows during active review

            _key_bridge.pomo_space.connect(self._on_space)

        def start(self):
            self._xp.reposition()
            # XP bar stays hidden until reviewer is entered
            self._ticker.start()

        def enter_review(self):
            """Called when the reviewer shows a card (question or answer)."""
            if not self._ticker.isActive() or self._on_break:
                return
            # A break is due: show it in place of this (next) card. Skipping the
            # break hides the overlay and reveals the card already loaded beneath.
            if self._break_pending:
                self._break_pending = False
                self._begin_break()
                return
            self._in_review = True
            self._xp.reposition()
            self._xp.show()

        def leave_review(self):
            """Called when leaving the reviewer (deck browser, overview, etc.)."""
            self._in_review = False
            self._xp.hide()
            self._tint.hide()   # keep state clean (if still pending, the break screen shows on return)

        def stop(self):
            global _pomo_on_break
            self._ticker.stop()
            self._bypass_ticker.stop()
            self._xp.hide()
            self._bs.hide()
            self._tint.hide()
            _pomo_on_break = False
            try:
                _key_bridge.pomo_space.disconnect(self._on_space)
            except Exception:
                pass

        def _tick(self):
            global _pomo_on_break
            # Invariant: the XP bar rides the main Anki window. If that window is
            # minimized or hidden, the bar must be too. The usual WindowStateChange
            # hide misses the case where the caption HUD (a separate top-level
            # window) absorbed the minimize, so main never emitted the event —
            # enforce it here every tick as a backstop.
            try:
                if self._xp.isVisible() and (mw.isMinimized() or not mw.isVisible()):
                    self._xp.hide()
            except Exception:
                pass
            if self._on_break:
                self._break_rem_ms -= 50
                if self._break_rem_ms <= 0:
                    self._end_break()
                else:
                    # Recalculate displayed seconds; only reload HTML when the
                    # second value changes (avoids a WebEngine reload every 50 ms).
                    disp_s = max(1, (self._break_rem_ms + 999) // 1000)
                    if disp_s != self._break_disp_s:
                        self._break_disp_s = disp_s
                        self._bs.update_time(disp_s)  # JS only — no reload, no flicker
            else:
                if self._in_review and not self._break_pending:
                    self._elapsed_ms += 50
                self._xp.set_progress(
                    min(1.0, self._elapsed_ms / (WORK_SECS * 1000)))
                # Work timer up: don't interrupt the current card — arm the break
                # so it takes over in place of the NEXT card (see enter_review).
                # Show a static pale-blue "break due" tint on the current card.
                if self._elapsed_ms >= WORK_SECS * 1000 and not self._break_pending:
                    self._break_pending = True
                    self._tint.show()

        def _begin_break(self):
            global _pomo_on_break
            self._tint.hide()          # the break screen now takes over the cue
            # Stop any running card timer — it must not tick behind the break screen
            # (starts fresh in _end_break). Belt-and-suspenders vs. hook order.
            if _card_timer_instance is not None:
                _card_timer_instance.stop_card()
            self._on_break     = True
            self._elapsed_ms   = 0
            self._sessions    += 1
            self._is_long      = (LONG_AFTER > 0 and self._sessions % LONG_AFTER == 0)
            self._break_rem_ms = (LONG_SECS if self._is_long else SHORT_SECS) * 1000
            self._break_disp_s = -1
            self._xp.set_progress(0.0)
            _pomo_on_break = True
            # Wake the app so the WebEngine renderer is active
            try:
                _msg, _cls = _bridge()
                _ns = _msg(c_void_p, _cls(b"NSApplication"), b"sharedApplication")
                _msg(c_void_p, _ns, b"activateIgnoringOtherApps:",
                     (c_bool,), (True,))
            except Exception:
                pass
            self._bs.reposition()
            self._bs.show()
            _break_secs = LONG_SECS if self._is_long else SHORT_SECS
            self._bs.render_static(_break_secs, self._session_display(), self._is_long)

        def _end_break(self):
            global _pomo_on_break
            self._on_break    = False
            self._elapsed_ms  = 0
            _pomo_on_break    = False
            self._bypass_t    = 0.0
            self._bypass_ticker.stop()
            self._bs.hide()
            # The card that was hidden beneath the break is now revealed — resume
            # the work timer against it (enter_review skipped this to run the break).
            if getattr(mw, "state", None) == "review":
                self._in_review = True
                self._xp.reposition()
                self._xp.show()
                # Now that the break is deactivated, start the card timer fresh for
                # the revealed card (its start was suppressed during the break).
                if _card_timer_instance is not None:
                    r = getattr(mw, "reviewer", None)
                    card = getattr(r, "card", None) if r else None
                    if card is not None and getattr(r, "state", None) == "question":
                        _card_timer_instance._on_q(card)
                # Apply any Focus Mode chrome change that was deferred during the
                # break (kept deferred so the break panel wouldn't drift).
                if _focus_mode_on:
                    _focus_set_hidden(True)
            else:
                self._in_review = False

        def _session_display(self):
            if LONG_AFTER <= 0:
                return self._sessions
            return ((self._sessions - 1) % LONG_AFTER) + 1

        def _on_space(self, pressed: bool):
            if not self._on_break:
                return
            if pressed:
                # Holding Space fires autorepeat keydowns (many per second). Only
                # arm the hold on the FIRST press — if the bypass ticker is already
                # running, ignore the repeats so they don't keep resetting progress
                # to 0 (which made the break impossible to skip).
                if not self._bypass_ticker.isActive():
                    self._bypass_t = 0.0
                    self._bypass_ticker.start()
            else:
                self._bypass_ticker.stop()
                self._bypass_t = 0.0
                self._bs.set_bypass(0.0)

        def _bypass_tick(self):
            self._bypass_t += BYPASS_TICK_MS / 1000.0
            frac = min(1.0, self._bypass_t / BYPASS_SECS)
            self._bs.set_bypass(frac)
            if self._bypass_t >= BYPASS_SECS:
                self._bypass_ticker.stop()
                # Space is still held now — eat it (and its release) so it doesn't
                # reach the reviewer and flip the revealed card.
                global _swallow_space_until_up
                _swallow_space_until_up = True
                self._end_break()

    p = Pomodoro()
    p.start()
    return p


_pomo_instance = None


def _apply_pomodoro(on: bool) -> None:
    global _pomo_instance
    if on:
        if _pomo_instance is None:
            _pomo_instance = _make_pomodoro()
    else:
        if _pomo_instance is not None:
            _pomo_instance.stop()
            _pomo_instance = None


def _rebuild_pomodoro() -> None:
    """Re-read config and restart the Pomodoro timer so break-spacing changes
    apply live. Resets the current work/session progress (fine for a settings
    change). No-op if Pomodoro is disabled."""
    if _cfg().get("pomodoro", False):
        _apply_pomodoro(False)
        _apply_pomodoro(True)


# ---------------------------------------------------------------------------
# Per-card "lingering" warning bar (under the top toolbar)
# ---------------------------------------------------------------------------
_card_timer_instance = None


def _make_card_timer():
    """A thin progress bar just under the toolbar that fills over 10–30s (scaled
    by card length). When it fills it turns red — a 'you've lingered' nudge,
    replacing the AnKing note-type timer. Mirrors the bottom XP bar."""
    from PyQt6.QtWidgets import QWidget
    from PyQt6.QtGui import QColor, QPainter, QBrush
    from PyQt6.QtCore import QRectF, QPoint

    cfg = _cfg()
    MIN_S = float(cfg.get("card_timer_min_s", 1.75))
    MAX_S = float(cfg.get("card_timer_max_s", 30))
    CHARS_MAX = max(1, int(cfg.get("card_timer_chars_for_max", 900)))
    # >1 makes short/medium cards stay near MIN_S (fill quicker); only long cards approach MAX_S
    CURVE = float(cfg.get("card_timer_curve", 2.6))
    BAR_H = 3
    TICK_MS = 50
    OPACITY = float(cfg.get("card_timer_opacity", 0.45))   # more transparent
    OFFSET_Y = int(cfg.get("card_timer_offset_y", -4))     # negative = nudge DOWN, clear of the toolbar buttons
    NARROW_PX = int(cfg.get("card_timer_narrow_px", 16))   # trim total width (split evenly both sides)
    BG_PULSE = bool(cfg.get("card_timer_bg_pulse", True))  # pulse the window edges when the timer fills
    PULSE_BAND = int(cfg.get("card_timer_pulse_band", 120))  # (legacy; kept for config compat)
    PULSE_MAX_A = int(cfg.get("card_timer_pulse_alpha", 14))  # peak edge alpha 0–255 (lower = more transparent)
    PULSE_MS = int(cfg.get("card_timer_pulse_ms", 2200))      # one in/out pulse cycle (higher = slower)
    PULSE_RADIUS = int(cfg.get("card_timer_pulse_radius",     # match the window's rounded corners
                               int(cfg.get("win_corner_radius", 11))))
    # fraction of the way each edge gradient reaches toward the centre (0.5 = centre)
    PULSE_REACH = max(0.05, min(0.5, float(cfg.get("card_timer_pulse_reach", 0.45))))

    class TimerBar(QWidget):
        def __init__(self):
            super().__init__(None,
                Qt.WindowType.FramelessWindowHint |
                Qt.WindowType.WindowStaysOnTopHint |
                Qt.WindowType.Tool)
            self.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground)
            self.setAttribute(Qt.WidgetAttribute.WA_ShowWithoutActivating)
            self.setFixedHeight(BAR_H)
            self._p = 0.0
            self._warn = False
            self._native_done = False
            self._pulse = 0.0            # 0..2pi phase for the overtime pulse
            self._pulse_t = QTimer(self)
            self._pulse_t.setInterval(33)   # ~30 fps
            self._pulse_t.timeout.connect(self._pulse_tick)
            self.setWindowOpacity(OPACITY)

        def _pulse_tick(self):
            import math
            self._pulse = (self._pulse + 0.18) % (2 * math.pi)
            self.update()

        def _fallback_full(self):
            try:
                tl = mw.web.mapToGlobal(QPoint(0, 0))
                self.setGeometry(tl.x() + NARROW_PX // 2, tl.y() - OFFSET_Y,
                                 max(1, mw.web.width() - NARROW_PX), BAR_H)
            except Exception:
                pass

        def reposition(self):
            # Focus Mode: hide the progress bar entirely (distracting in focus).
            # Gate on Focus being ARMED (_focus_mode_on), not just chrome currently
            # hidden — after returning to the reviewer the chrome is briefly back
            # (_focus_hidden False) before the idle re-hide, and the bar must not
            # reappear in that window.
            if _focus_hidden or _focus_mode_on:
                self.hide()
                return
            # Caption mode replaces the countdown bar with the caption pulse.
            if _caption_visible():
                self.hide()
                return
            # Match the width/position of the nav button island (Decks/Add/Browse/
            # Stats/Sync), which lives inside the toolbar webview's DOM — measure it
            # in JS, then map to window coords. Falls back to full content width.
            tw = getattr(mw, "toolbarWeb", None) or getattr(getattr(mw, "toolbar", None), "web", None)
            if tw is None:
                self._fallback_full()
                return
            js = ("(function(){var t=document.querySelector('.toolbar');"
                  "if(t){var r=t.getBoundingClientRect();if(r.width>0)return [r.left,r.bottom,r.width];}"
                  "var it=document.querySelectorAll('.hitem, a.hitem');"
                  "var l=1e9,rt=-1e9,b=-1e9,n=0;"
                  "for(var i=0;i<it.length;i++){var q=it[i].getBoundingClientRect();"
                  "if(!q.width)continue;l=Math.min(l,q.left);rt=Math.max(rt,q.right);b=Math.max(b,q.bottom);n++;}"
                  "return n?[l,b,rt-l]:null;})()")

            def _cb(rect):
                try:
                    if not rect:
                        self._fallback_full()
                        return
                    base = tw.mapToGlobal(QPoint(0, 0))
                    left = base.x() + int(round(rect[0])) + NARROW_PX // 2
                    y = base.y() + int(round(rect[1])) - OFFSET_Y
                    w = max(1, int(round(rect[2])) - NARROW_PX)
                    self.setGeometry(left, y, w, BAR_H)
                except Exception:
                    pass

            try:
                tw.evalWithCallback(js, _cb)
            except Exception:
                try:
                    tw.page().runJavaScript(js, _cb)
                except Exception:
                    self._fallback_full()

        def set_state(self, p, warn):
            self._p = max(0.0, min(1.0, p))
            self._warn = warn
            try:
                if warn:
                    if not self._pulse_t.isActive():
                        self._pulse = 0.0
                        self._pulse_t.start()
                else:
                    self._pulse_t.stop()
            except RuntimeError:
                pass   # C++ QTimer already gone (bar being torn down)
            self.update()

        def showEvent(self, ev):
            super().showEvent(ev)
            if not self._native_done:
                QTimer.singleShot(0, self._apply_native)

        def hideEvent(self, ev):
            super().hideEvent(ev)
            self._pulse_t.stop()
            self._detach_native()
            self._native_done = False

        def _detach_native(self):
            try:
                msg, cls = _bridge()
                ns = msg(c_void_p, c_void_p(int(self.winId())), b"window")
                if not ns:
                    return
                parent = msg(c_void_p, ns, b"parentWindow")
                if parent:
                    msg(None, parent, b"removeChildWindow:", (c_void_p,), (ns,))
                msg(None, ns, b"orderOut:", (c_void_p,), (None,))
            except Exception:
                pass

        def _apply_native(self):
            try:
                msg, cls = _bridge()
                ns = msg(c_void_p, c_void_p(int(self.winId())), b"window")
                if not ns:
                    return
                msg(c_void_p, ns, b"setOpaque:", (c_bool,), (False,))
                msg(c_void_p, ns, b"setHasShadow:", (c_bool,), (False,))
                msg(c_void_p, ns, b"setBackgroundColor:", (c_void_p,),
                    (msg(c_void_p, cls("NSColor"), b"clearColor"),))
                if not msg(c_void_p, ns, b"parentWindow"):
                    main = msg(c_void_p, c_void_p(int(mw.winId())), b"window")
                    if main:
                        msg(c_void_p, main, b"addChildWindow:ordered:",
                            (c_void_p, c_long), (ns, 1))
                self._native_done = True
            except Exception:
                pass

        def paintEvent(self, ev):
            if self._p <= 0:
                return
            import math
            pt = QPainter(self)
            pt.setRenderHint(QPainter.RenderHint.Antialiasing)
            pt.setPen(Qt.PenStyle.NoPen)
            fullw = float(self.width())
            hrad = min(float(BAR_H) / 2.0, fullw / 2.0)
            if self._warn:
                # overtime: pulse a full-width red glow behind the bar to alert.
                # Phase from a shared clock anchored at expiry (_flare_origin) so the
                # bar pulses IN SYNC with the PulseOverlay flare AND the first cycle
                # starts from the trough.
                import time
                phase = ((time.monotonic() - _flare_origin) * 1000.0 % PULSE_MS) / PULSE_MS
                s = 0.5 - 0.5 * math.cos(2 * math.pi * phase)   # 0..1, synced
                glow = QColor(255, 60, 60, int(40 + 150 * s))
                pt.setBrush(QBrush(glow))
                pt.drawRoundedRect(QRectF(0.0, 0.0, fullw, float(BAR_H)), hrad, hrad)
                col = QColor(255, 70, 70, int(180 + 60 * s))
            else:
                # cyan (calm) → amber as it fills toward the warning
                r = int(90 + 165 * self._p)
                g = max(0, int(210 - 120 * self._p))
                b = max(0, int(255 - 200 * self._p))
                col = QColor(r, g, b, 205)
            pt.setBrush(QBrush(col))
            w = fullw * self._p
            rad = min(float(BAR_H) / 2.0, w / 2.0)
            pt.drawRoundedRect(QRectF(0.0, 0.0, w, float(BAR_H)), rad, rad)
            pt.end()

    class PulseOverlay(QWidget):
        """Full-screen, mouse-transparent child window that pulses a red edge-glow
        when the card timer fills. The four edge gradients reach ~PULSE_REACH of the
        way to the centre; corners are rounded to PULSE_RADIUS. Covers the whole
        window frame (incl. the top drag bar) — sits above the toolbar buttons.

        color/max_a/pulse_ms/cycles are per-instance so the same widget serves both
        the red "time's up" flare (loops forever until the card flips: cycles=None)
        and the green "done for today" flare (a short one-shot burst: cycles=N)."""
        def __init__(self, color=(255, 45, 45), max_a=None, pulse_ms=None,
                     cycles=None):
            # NOTE: no WindowStaysOnTopHint — addChildWindow(ordered:Above) already
            # keeps this above the main window, and the StaysOnTop/Tool "floating
            # panel" promotion made the main window resign key when the flare showed,
            # firing window.blur in the AMBOSS webview (dismissed its preview/tooltip).
            super().__init__(None,
                Qt.WindowType.FramelessWindowHint |
                Qt.WindowType.Tool)
            self.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground)
            self.setAttribute(Qt.WidgetAttribute.WA_ShowWithoutActivating)
            self.setAttribute(Qt.WidgetAttribute.WA_TransparentForMouseEvents)
            self._prog = 0.0
            self._native_done = False
            self._color = color
            self._max_a = PULSE_MAX_A if max_a is None else max_a
            self._pulse_ms = PULSE_MS if pulse_ms is None else pulse_ms
            self._radius = float(PULSE_RADIUS)   # outer corner radius; matches
            #                                      the HUD's when in caption mode
            self._cycles = cycles          # None = loop forever; N = flash N times
            self._cycles_done = 0
            self._pulse_t = QTimer(self)
            self._pulse_t.setInterval(33)   # ~30 fps
            self._pulse_t.timeout.connect(self._tick)

        def _tick(self):
            import math
            self._prog += 33.0 / max(1, self._pulse_ms)
            if self._prog >= 1.0:
                self._prog = 0.0            # completed one in/out cycle
                if self._cycles is not None:
                    self._cycles_done += 1
                    if self._cycles_done >= self._cycles:
                        self.set_active(False)   # one-shot burst finished
                        return
            # Drive the in/out pulse via WINDOW OPACITY over a static paint (cheap,
            # and freezes the dither). Red (loop) locks phase to the shared wall clock
            # to stay synced with the timer bar; green (one-shot) uses _prog.
            if self._cycles is None:
                import time
                phase = ((time.monotonic() - _flare_origin) * 1000.0 % self._pulse_ms) / self._pulse_ms
            else:
                phase = self._prog
            env = 0.12 + 0.88 * (0.5 - 0.5 * math.cos(2 * math.pi * phase))
            try:
                self.setWindowOpacity(env)
            except Exception:
                pass

        def reposition(self):
            # Caption mode: the pulse belongs to the coherence HUD, not the main
            # window — shape the glow to the HUD's frame (matching its 16px
            # corner) so it reads as the caption itself pulsing. Use geometry()
            # (the client rect = the visible box), NOT frameGeometry(): the HUD is
            # frameless, so on macOS frameGeometry reports a top edge a few px
            # above the box and the glow spills above it.
            try:
                if _caption_visible():
                    # The HUD window is sized exactly to the visible box (see
                    # _vp / _apply_fit), so the flare is simply the whole HUD window.
                    # Prefer the HUD's SETTLED target rect over its live geometry:
                    # while the box is mid-resize (bottom-anchored), the live rect's
                    # top hasn't moved yet, which left the flare a few px above the
                    # top once the box settled.
                    hg = getattr(_coherence_hud, '_target_geom', None) \
                        or _coherence_hud.geometry()
                    if hg.width() > 0 and hg.height() > 0:
                        self._radius = 16.0   # matches HUD _RADIUS
                        self.setGeometry(hg.x(), hg.y(), hg.width(), hg.height())
                        return
            except Exception:
                pass
            self._radius = float(PULSE_RADIUS)
            # Cover the whole window FRAME (frameGeometry includes the native
            # titlebar/drag strip) so the glow reaches every screen edge. In native
            # fullscreen frameGeometry can under-report (glow stops short of the
            # bottom), so use the window's authoritative screen rect there.
            try:
                if mw.isFullScreen():
                    scr = mw.screen()
                    if scr is None and mw.windowHandle() is not None:
                        scr = mw.windowHandle().screen()
                    if scr is not None:
                        g = scr.geometry()
                        if g.width() > 0 and g.height() > 0:
                            self.setGeometry(g.x(), g.y(), g.width(), g.height())
                            return
                fg = mw.frameGeometry()
                if fg.width() > 0 and fg.height() > 0:
                    self.setGeometry(fg.x(), fg.y(), fg.width(), fg.height())
                    return
                tl = mw.mapToGlobal(QPoint(0, 0))
                self.setGeometry(tl.x(), tl.y(), mw.width(), mw.height())
            except Exception:
                pass

        def set_active(self, on):
            if on:
                self.reposition()
                self._prog = 0.0
                self._cycles_done = 0
                # Seed at the trough so opacity-driven pulse doesn't flash full-bright
                # before the first tick.
                self.setWindowOpacity(0.12)
                if not self.isVisible():
                    self.show()
                if not self._pulse_t.isActive():
                    self._pulse_t.start()
                self.update()
            else:
                try:
                    self._pulse_t.stop()
                except RuntimeError:
                    pass
                self.hide()

        def showEvent(self, ev):
            super().showEvent(ev)
            if not self._native_done:
                QTimer.singleShot(0, self._apply_native)

        def hideEvent(self, ev):
            super().hideEvent(ev)
            self._detach_native()
            self._native_done = False

        def _detach_native(self):
            try:
                msg, cls = _bridge()
                ns = msg(c_void_p, c_void_p(int(self.winId())), b"window")
                if not ns:
                    return
                parent = msg(c_void_p, ns, b"parentWindow")
                if parent:
                    msg(None, parent, b"removeChildWindow:", (c_void_p,), (ns,))
                msg(None, ns, b"orderOut:", (c_void_p,), (None,))
            except Exception:
                pass

        def _apply_native(self):
            try:
                msg, cls = _bridge()
                ns = msg(c_void_p, c_void_p(int(self.winId())), b"window")
                if not ns:
                    return
                msg(c_void_p, ns, b"setOpaque:", (c_bool,), (False,))
                msg(c_void_p, ns, b"setHasShadow:", (c_bool,), (False,))
                msg(c_void_p, ns, b"setIgnoresMouseEvents:", (c_bool,), (True,))
                msg(c_void_p, ns, b"setBackgroundColor:", (c_void_p,),
                    (msg(c_void_p, cls("NSColor"), b"clearColor"),))
                # 1 = CanJoinAllSpaces, 256 = FullScreenAuxiliary — shows in native fullscreen.
                msg(c_void_p, ns, b"setCollectionBehavior:", (c_ulong,), (1 | 256,))
                main = msg(c_void_p, c_void_p(int(mw.winId())), b"window")
                # In caption mode the HUD floats above the main window (level 3),
                # so a glow parented to the main window would hide behind the
                # HUD's tinted background. Parent it to the HUD instead — ordered
                # above — so it wraps the caption.
                host = main
                if _caption_visible():
                    try:
                        hw = msg(c_void_p, c_void_p(int(_coherence_hud.winId())),
                                 b"window")
                        if hw:
                            host = hw
                    except Exception:
                        pass
                if not msg(c_void_p, ns, b"parentWindow"):
                    if host:
                        msg(c_void_p, host, b"addChildWindow:ordered:",
                            (c_void_p, c_long), (ns, 1))
                # Reassert the main window as key so any transient resign-key from
                # showing this overlay is undone — keeps DOM focus in the AMBOSS /
                # reviewer webview (no window.blur). Only when Anki is frontmost, so
                # we never steal focus from another app.
                if main and _anki_focused:
                    msg(None, main, b"makeKeyWindow")
                self._native_done = True
            except Exception:
                pass

        def paintEvent(self, ev):
            from PyQt6.QtGui import QLinearGradient, QPainterPath
            # Paint ONCE at PEAK alpha; the in/out pulse is driven by window opacity
            # in _tick. Painting per-frame re-rastered the low-alpha gradient every
            # tick, so its 8-bit banding × the vibrancy dither "crawled" as scattered
            # pixels over the transparent card background. A static paint + opacity
            # animation freezes that pattern → smooth glow.
            a = int(self._max_a)
            if a <= 0:
                return
            cr, cg, cb = self._color
            w = float(self.width()); h = float(self.height())
            if w <= 0 or h <= 0:
                return
            pt = QPainter(self)
            pt.setRenderHint(QPainter.RenderHint.Antialiasing)
            pt.setPen(Qt.PenStyle.NoPen)
            # round the outer corners of the glow frame
            clip = QPainterPath()
            clip.addRoundedRect(QRectF(0, 0, w, h), float(self._radius), float(self._radius))
            pt.setClipPath(clip)
            # Lighten (max) compositing so overlapping edge bands don't ADD in the
            # corners — that additive brightening was the visible colour seam.
            pt.setCompositionMode(QPainter.CompositionMode.CompositionMode_Lighten)
            # each edge gradient reaches PULSE_REACH of the way to the centre
            bv = h * PULSE_REACH   # top/bottom band height
            bh = w * PULSE_REACH   # left/right band width
            edge = QColor(cr, cg, cb, a)
            clear = QColor(cr, cg, cb, 0)
            gt = QLinearGradient(0, 0, 0, bv)
            gt.setColorAt(0.0, edge); gt.setColorAt(1.0, clear)
            pt.fillRect(QRectF(0, 0, w, bv), QBrush(gt))
            gb = QLinearGradient(0, h, 0, h - bv)
            gb.setColorAt(0.0, edge); gb.setColorAt(1.0, clear)
            pt.fillRect(QRectF(0, h - bv, w, bv), QBrush(gb))
            gl = QLinearGradient(0, 0, bh, 0)
            gl.setColorAt(0.0, edge); gl.setColorAt(1.0, clear)
            pt.fillRect(QRectF(0, 0, bh, h), QBrush(gl))
            gr = QLinearGradient(w, 0, w - bh, 0)
            gr.setColorAt(0.0, edge); gr.setColorAt(1.0, clear)
            pt.fillRect(QRectF(w - bh, 0, bh, h), QBrush(gr))
            pt.end()

    class Manager:
        def __init__(self):
            self._bar = TimerBar()
            self._overlay = PulseOverlay() if BG_PULSE else None
            # Green "done for today" flash — a short one-shot burst (per-instance
            # colour/cycles). Params are refreshed live from config in card_done_flash.
            self._green = PulseOverlay(color=(70, 220, 110), cycles=1) if BG_PULSE else None
            self._elapsed = 0.0
            self._dur = MIN_S * 1000.0
            self._active = False
            self._t = QTimer(mw)
            self._t.setInterval(TICK_MS)
            self._t.timeout.connect(self._tick)
            # Red flare is suppressed while an AMBOSS hover tip is on screen (the
            # native overlay window sitting over the reviewer webview makes tippy
            # flicker). _red_wanted = "the timer has filled, red SHOULD show unless
            # suppressed"; a ~150ms poll of mw.web toggles actual visibility.
            self._red_wanted = False
            self._tip_open = False
            self._cooldown_until = 0.0   # monotonic time before which red stays hidden
            self._bar_gen = 0            # invalidates a pending delayed bar fade-in
            self._bar_fade = None        # keep a ref to the opacity animation
            self._amboss_poll = QTimer(mw)
            self._amboss_poll.setInterval(150)
            self._amboss_poll.timeout.connect(self._poll_amboss_tip)

        def _tick(self):
            if not self._active:
                return
            self._elapsed += TICK_MS
            p = self._elapsed / self._dur
            self._bar.set_state(min(1.0, p), p >= 1.0)
            if p >= 1.0:
                self._t.stop()   # hold the warning; nothing left to animate
                # Anchor the pulse phase to NOW so the first cycle starts from the
                # trough (not mid-clock) — bar + overlay share this origin, stay synced.
                global _flare_origin
                import time
                _flare_origin = time.monotonic()
                # The blue break cue overrides the red pulse — don't show red while a
                # break is due (tint) or in progress; also honour the on/off setting.
                if (self._overlay and not _break_tint_active and not _pomo_on_break
                        and bool(_cfg().get("card_timer_red_flare", True))):
                    self._red_wanted = True
                    if not self._amboss_poll.isActive():
                        self._amboss_poll.start()
                    self._poll_amboss_tip()   # decide visibility after checking for a tip

        def _poll_amboss_tip(self):
            # While the red flare should be up, check whether an AMBOSS hover tip is
            # on screen; if so, hide the flare (it flickers the tippy tooltip).
            if not self._red_wanted:
                self._amboss_poll.stop()
                return
            w = getattr(mw, "web", None)
            if w is None:
                return
            js = ("(function(){var els=document.querySelectorAll("
                  "'.tippy-popper,.tippy-box,.tippy-tooltip,amboss-tooltip-content');"
                  "for(var i=0;i<els.length;i++){var e=els[i];"
                  "if(e.getAttribute&&e.getAttribute('data-state')==='hidden')continue;"
                  "var r=e.getBoundingClientRect();"
                  "if(r.width>2&&r.height>2)return true;}return false;})()")

            def _cb(res):
                self._tip_open = bool(res)
                self._update_red()
            try:
                w.evalWithCallback(js, _cb)
            except Exception:
                try:
                    w.page().runJavaScript(js, _cb)
                except Exception:
                    pass

        def _update_red(self):
            """Apply the desired red-flare visibility given wanted/suppressed state.
            After an AMBOSS tip closes we wait card_timer_flare_cooldown_s before the
            flare returns, so it doesn't snap back the instant you move off a term."""
            if self._overlay is None:
                return
            import time
            now = time.monotonic()
            if self._tip_open:
                # Keep pushing the cooldown out while the tip is up; it starts
                # counting down from the moment the tip actually closes.
                self._cooldown_until = now + float(
                    _cfg().get("card_timer_flare_cooldown_s", 2.0))
            # Caption mode can suppress the flare entirely (setting) — the HUD is a
            # small reading surface and the edge glow is often unwanted there.
            caption_up = _caption_visible()
            if caption_up and not bool(_cfg().get("caption_flare", True)):
                if self._overlay.isVisible():
                    self._overlay.set_active(False)
                return
            # The flare lives on the caption HUD when it's up, otherwise on the
            # main window — so only show it when its host is actually on screen
            # (never against a minimized main window).
            host_on_screen = caption_up or _main_on_screen()
            show = (self._red_wanted and not self._tip_open and now >= self._cooldown_until
                    and not _break_tint_active and not _pomo_on_break
                    and host_on_screen)
            if show and not self._overlay.isVisible():
                self._overlay.set_active(True)
            elif not show and self._overlay.isVisible():
                self._overlay.set_active(False)

        def start_card(self, text_len):
            # Read the shape params LIVE so settings changes apply to the very next
            # card with no rebuild (the closure values are just fallbacks).
            _c = _cfg()
            # Direct model: "Seconds until flare" is the base time for a ~1-sentence
            # card. Card length still nudges it, but the multiplier is CLAMPED so a
            # long AnKing cloze can't balloon the timer (was: unbounded len/80, which
            # pushed long cards to 60s+). len_min/max_mult default 0.5..1.5.
            base_secs = float(_c.get("card_timer_seconds", 8.0))
            sentence_chars = max(1, int(_c.get("card_timer_sentence_chars", 80)))
            len_lo = float(_c.get("card_timer_len_min_mult", 0.5))
            len_hi = float(_c.get("card_timer_len_max_mult", 1.5))
            cap_s = float(_c.get("card_timer_cap_s", 600.0))
            floor_s = float(_c.get("card_timer_min_s", MIN_S))
            len_mult = max(len_lo, min(len_hi, max(0, text_len) / sentence_chars))
            dur_s = base_secs * len_mult
            dur_s = min(cap_s, max(floor_s, dur_s))
            self._dur = dur_s * 1000.0
            self._elapsed = 0.0
            self._active = True
            self._red_wanted = False
            self._tip_open = False
            self._cooldown_until = 0.0
            self._amboss_poll.stop()
            if self._overlay:
                self._overlay.set_active(False)   # new card → clear any lingering pulse
            self._bar.reposition()
            self._bar.set_state(0.0, False)
            # Focus Mode keeps the bar hidden; the "Show timer bar" setting can also
            # hide it (independent of the red flare, which still fires either way).
            # Don't pop the bar in immediately — wait a beat, then fade it in, so it
            # doesn't flash on every card flip. _bar_gen invalidates the pending fade
            # if the card changes first.
            self._bar_gen += 1
            self._bar.hide()
            if not (_focus_hidden or _focus_mode_on) and self._bar_pref_on():
                delay = int(_c.get("card_timer_bar_delay_ms", 500))
                gen = self._bar_gen
                QTimer.singleShot(delay, lambda g=gen: self._fade_in_bar(g))
            if not self._t.isActive():
                self._t.start()

        def card_done_flash(self):
            """Green edge-flare celebrating a card that's finished for the day."""
            if self._green is None:
                return
            _c = _cfg()
            if not bool(_c.get("card_timer_green_flare", True)):
                return
            if _caption_visible() and not bool(_c.get("caption_flare", True)):
                return
            if _break_tint_active or _pomo_on_break:
                return
            # Refresh look/length live so settings changes apply with no rebuild.
            self._green._max_a = int(_c.get("card_timer_green_alpha", 16))
            self._green._cycles = max(1, int(_c.get("card_timer_green_cycles", 1)))
            self._green._pulse_ms = int(_c.get("card_timer_green_ms", 900))
            self._green.set_active(True)

        def _fade_in_bar(self, gen):
            # Fired ~card_timer_bar_delay_ms after the card started; skip if the card
            # already changed, was answered, or the bar is otherwise not wanted.
            if gen != self._bar_gen or not self._active:
                return
            if _focus_hidden or _focus_mode_on or not self._bar_pref_on():
                return
            self._bar.reposition()
            self._bar.setWindowOpacity(0.0)
            self._bar.show()
            from aqt.qt import QPropertyAnimation, QEasingCurve
            anim = QPropertyAnimation(self._bar, b"windowOpacity")
            anim.setDuration(int(_cfg().get("card_timer_bar_fade_ms", 260)))
            anim.setStartValue(0.0)
            anim.setEndValue(OPACITY)
            anim.setEasingCurve(QEasingCurve.Type.InOutQuad)
            anim.start()
            self._bar_fade = anim

        def _bar_pref_on(self):
            # Caption mode owns the timing feedback via the pulse, so the
            # countdown bar is suppressed while the coherence HUD is up. It also
            # rides the main window, so never show it while that's minimized.
            return (bool(_cfg().get("card_timer_show_bar", True))
                    and not _caption_visible()
                    and _main_on_screen())

        def sync_bar_pref(self):
            """Show/hide the bar immediately when the setting is toggled mid-card."""
            if self._active and not (_focus_hidden or _focus_mode_on) and self._bar_pref_on():
                self._bar.reposition()
                self._bar.setWindowOpacity(OPACITY)
                self._bar.show()
            else:
                self._bar.hide()

        def apply_focus(self):
            """Hide the progress bar in Focus Mode; restore it (if a card is active)
            when Focus Mode turns off. Also make the red flare LESS transparent in
            Focus Mode (the chrome is gone, so a stronger edge glow reads better)."""
            if self._overlay is not None:
                _c = _cfg()
                base = int(_c.get("card_timer_pulse_alpha", PULSE_MAX_A))
                foc = int(_c.get("card_timer_pulse_alpha_focus", 24))
                self._overlay._max_a = foc if _focus_hidden else base
                if self._overlay.isVisible():
                    self._overlay.update()   # repaint at the new alpha immediately
            if _focus_hidden or _focus_mode_on or not self._bar_pref_on():
                self._bar.hide()
            elif self._active:
                self._bar.setWindowOpacity(OPACITY)
                self._bar.show()
                # The toolbar webview was just re-shown and needs a beat to re-lay
                # out before we can measure the button island — reposition now and
                # again as it settles (otherwise the bar lands at a stale spot).
                for d in (0, 130, 320):
                    QTimer.singleShot(d, self._bar.reposition)

        def stop_card(self):
            self._active = False
            self._t.stop()
            self._red_wanted = False
            self._tip_open = False
            self._cooldown_until = 0.0
            self._amboss_poll.stop()
            self._bar.set_state(0.0, False)
            self._bar.hide()
            if self._overlay:
                self._overlay.set_active(False)

        def hide_bar(self):
            self._bar.hide()
            if self._overlay:
                self._overlay.set_active(False)

        def reposition(self):
            if self._active:
                self._bar.reposition()
                if self._overlay and self._overlay.isVisible():
                    self._overlay.reposition()
            if self._green and self._green.isVisible():
                self._green.reposition()

        def stop(self):
            # unregister hooks FIRST so a queued reviewer callback can't fire
            # against the about-to-be-destroyed bar (RuntimeError: C++ deleted)
            try:
                if self._on_q and hasattr(gui_hooks, "reviewer_did_show_question"):
                    gui_hooks.reviewer_did_show_question.remove(self._on_q)
            except Exception:
                pass
            try:
                if self._on_answer and hasattr(gui_hooks, "reviewer_did_show_answer"):
                    gui_hooks.reviewer_did_show_answer.remove(self._on_answer)
            except Exception:
                pass
            try:
                if self._on_state and hasattr(gui_hooks, "state_did_change"):
                    gui_hooks.state_did_change.remove(self._on_state)
            except Exception:
                pass
            try:
                if self._on_answered and hasattr(gui_hooks, "reviewer_did_answer_card"):
                    gui_hooks.reviewer_did_answer_card.remove(self._on_answered)
            except Exception:
                pass
            self._on_q = self._on_state = self._on_answer = self._on_answered = None
            self.stop_card()
            try:
                self._bar.close()
                self._bar.deleteLater()
            except Exception:
                pass
            try:
                if self._overlay:
                    self._overlay.close()
                    self._overlay.deleteLater()
                    self._overlay = None
            except Exception:
                pass
            try:
                if self._green:
                    self._green.close()
                    self._green.deleteLater()
                    self._green = None
            except Exception:
                pass

    mgr = Manager()
    mgr._on_q = mgr._on_state = mgr._on_answer = mgr._on_answered = None

    def _done_for_today(card):
        # After answering, the card is rescheduled. It won't be seen again today if
        # it's a review card (queue 2) or an inter-day (re)learning card (queue 3)
        # whose next due day is past today. Queue 1 = intraday learning steps → it
        # WILL come back today, so no green flare.
        try:
            q = int(card.queue)
            if q == 2:                                   # QUEUE_TYPE_REV
                return True
            if q == 3:                                   # DAY_LEARN_RELEARN
                return int(card.due) > int(mw.col.sched.today)
        except Exception:
            pass
        return False

    def _on_answered(reviewer, card, ease):
        try:
            if _done_for_today(card):
                mgr.card_done_flash()
        except Exception:
            pass

    def _on_q(card):
        # Don't run the card timer during a break — it starts fresh when the break
        # is deactivated (_end_break calls this for the revealed card).
        if _pomo_on_break:
            return
        try:
            import re as _re
            txt = _re.sub(r"<[^>]+>", "", card.question() or "")
            mgr.start_card(len(txt.strip()))
        except Exception:
            try:
                mgr.start_card(0)
            except Exception:
                pass

    def _on_answer(card):
        # Flipping the card in time is the goal — clear the linger bar + pulse.
        mgr.stop_card()

    def _on_state(new_state, old_state):
        if new_state != "review":
            mgr.stop_card()

    if hasattr(gui_hooks, "reviewer_did_show_question"):
        gui_hooks.reviewer_did_show_question.append(_on_q)
    if hasattr(gui_hooks, "reviewer_did_show_answer"):
        gui_hooks.reviewer_did_show_answer.append(_on_answer)
    if hasattr(gui_hooks, "state_did_change"):
        gui_hooks.state_did_change.append(_on_state)
    if hasattr(gui_hooks, "reviewer_did_answer_card"):
        gui_hooks.reviewer_did_answer_card.append(_on_answered)
    mgr._on_q = _on_q
    mgr._on_answer = _on_answer
    mgr._on_state = _on_state
    mgr._on_answered = _on_answered

    return mgr


def _apply_card_timer(on: bool) -> None:
    global _card_timer_instance
    if on:
        if _card_timer_instance is None:
            _card_timer_instance = _make_card_timer()
    else:
        if _card_timer_instance is not None:
            _card_timer_instance.stop()
            _card_timer_instance = None


# ---------------------------------------------------------------------------
# AMBOSS side-panel frost — the AMBOSS add-on (1044112126) embeds a WebView
# (AnkiWebView subclass) whose page background is painted the opaque Anki
# CANVAS colour → a solid white/dark slab that clashes with Janki's glass.
# We make that page transparent and inject a frost CSS that survives the
# AMBOSS SPA's re-renders, so the main window's vibrancy shows through.
# ---------------------------------------------------------------------------
_amboss_frost_timer = None
# Self-adapting frost: we can't know AMBOSS's SPA class names (and they change),
# so instead of a fixed selector list we walk the DOM and clear any element whose
# *computed* background colour is a near-white/near-canvas opaque slab. Runs on a
# rAF-debounced MutationObserver so it survives re-renders. Inspects only computed
# background colours — no page text is read or sent anywhere.
_AMBOSS_FROST_JS = (
    "(function(){var ID='__janki_amboss_frost';"
    "function base(){if(!document.documentElement)return;"
    "var s=document.getElementById(ID);"
    "if(!s){s=document.createElement('style');s.id=ID;"
    "(document.head||document.documentElement).appendChild(s);}"
    "s.textContent='html,body,#root,#app,#__next,main{background:transparent!important;"
    "background-color:transparent!important;}';}"
    "function light(bg){var m=bg&&bg.match(/rgba?\\(([^)]+)\\)/);if(!m)return false;"
    "var p=m[1].split(',');var r=parseFloat(p[0]),g=parseFloat(p[1]),b=parseFloat(p[2]),"
    "a=(p.length>3?parseFloat(p[3]):1);"
    "if(a<0.05)return false;"                 # already transparent
    "return (r>228&&g>228&&b>228);}"          # near-white opaque slab
    "function scan(){var els=document.querySelectorAll('body *');"
    "for(var i=0;i<els.length;i++){var el=els[i];if(el.id===ID)continue;"
    "if(el.getAttribute('data-jkf')==='1')continue;"
    "try{var bg=getComputedStyle(el).backgroundColor;"
    "if(light(bg)){el.style.setProperty('background-color','transparent','important');"
    "el.setAttribute('data-jkf','1');}}catch(e){}}}"
    "base();scan();"
    # Trailing 250ms debounce (was rAF = every frame) so a burst of inserts during
    # an AMBOSS preview coalesces into ONE scan instead of re-scanning the whole DOM
    # per animation frame. Observe childList only (NOT style/class) — attribute
    # mutations fire on every transition/hover/scroll tick, which was the lag; new
    # opaque slabs arrive as inserted nodes, and the 2s Python sweep is the backstop.
    "var pend=false;function sched(){if(pend)return;pend=true;"
    "setTimeout(function(){pend=false;if(!document.getElementById(ID))base();scan();},250);}"
    "try{if(window.__janki_amboss_obs)window.__janki_amboss_obs.disconnect();"
    "window.__janki_amboss_obs=new MutationObserver(sched);"
    "window.__janki_amboss_obs.observe(document.documentElement,"
    "{childList:true,subtree:true});"
    "}catch(e){}})();"
)


def _amboss_webviews():
    out = []
    try:
        from aqt.webview import AnkiWebView
    except Exception:
        return out
    try:
        children = mw.findChildren(AnkiWebView)
    except Exception:
        return out
    for w in children:
        try:
            mod = (type(w).__module__ or "")
            host = ""
            try:
                host = (w.url().host() or "").lower()
            except Exception:
                pass
            if mod.split(".")[0] == "1044112126" or "amboss" in host:
                out.append(w)
        except Exception:
            pass
    return out


def _frost_one_amboss(wv):
    # transparent Qt page background (kills the opaque CANVAS slab)
    try:
        wv.page().setBackgroundColor(QColor(0, 0, 0, 0))
    except Exception:
        pass
    # inject the frost CSS now
    def _inject():
        try:
            wv.eval(_AMBOSS_FROST_JS)
        except Exception:
            try:
                wv.page().runJavaScript(_AMBOSS_FROST_JS)
            except Exception:
                pass
    _inject()
    # re-inject on every navigation (SPA route change / reload) — connect once
    if not getattr(wv, "_janki_frost_hooked", False):
        try:
            wv.loadFinished.connect(lambda ok: _inject())
            wv._janki_frost_hooked = True
        except Exception:
            pass
    # the transparent web page reveals the Qt container widgets behind it — those
    # are the opaque white slabs. Make the webview widget + its parent chain
    # translucent so the main window's glass shows through.
    _frost_widget_chain(wv)


def _frost_widget_chain(wv):
    try:
        from PyQt6.QtWidgets import QWidget
    except Exception:
        return
    # the webview widget itself + up to ~6 ancestors (pane → splitter → central)
    w = wv
    hops = 0
    while w is not None and hops < 7:
        try:
            w.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground, True)
            w.setAutoFillBackground(False)
            cur = w.styleSheet() or ""
            if "/*janki-frost*/" not in cur:
                # scope the rule to THIS widget only (objectName or class) so we
                # don't blanket child buttons/labels into invisibility
                nm = w.objectName()
                sel = ("#" + nm) if nm else type(w).__name__
                w.setStyleSheet(cur + "\n/*janki-frost*/ " + sel +
                                "{ background: transparent; background-color: transparent; }")
                w.update()
        except Exception:
            pass
        # stop once we reach one of Anki's own containers (already glassed)
        try:
            if w is mw or w is getattr(mw, "centralWidget", lambda: None)():
                break
        except Exception:
            pass
        w = w.parentWidget()
        hops += 1


def _frost_amboss_navbar():
    # the AMBOSS side-panel nav bar is a themed QWidget painted a solid colour;
    # frost it by object name so its buttons/labels keep their own styling.
    try:
        from PyQt6.QtWidgets import QWidget
    except Exception:
        return
    for w in mw.findChildren(QWidget):
        try:
            nm = w.objectName() or ""
            if not nm.startswith("amboss"):
                continue
            if nm.endswith("webview"):
                continue   # webviews handled separately
            w.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground, True)
            w.setAutoFillBackground(False)
            cur = w.styleSheet() or ""
            if "/*janki-frost*/" not in cur:
                w.setStyleSheet(cur + "\n/*janki-frost*/ #" + nm +
                                "{ background: transparent; background-color: transparent; }")
                w.update()
        except Exception:
            pass


# The AMBOSS pop-up dictionary is a tippy.js tooltip injected into the REVIEWER
# webview (mw.web), not a Qt widget. Its white comes from tippy.css
# (.tippy-tooltip{background:#fff!important}) AND from <amboss-tooltip-content>,
# a web component with an OPEN shadow root. We beat the tippy !important via
# higher specificity, and inject a <style> into the shadow root (open → reachable)
# to turn the card into a translucent frosted panel. Text stays dark (#26323d) so
# we keep the panel light+blurred rather than transparent (dark-on-glass = unreadable).
_AMBOSS_TOOLTIP_JS = (
    "(function(){var SID='__janki_tippy_frost';"
    "function css(){if(document.getElementById(SID))return;"
    "var s=document.createElement('style');s.id=SID;"
    # single frosted surface lives on .tippy-content; the container above it and
    # everything inside the shadow root are fully transparent → no nested frame.
    "s.textContent='.tippy-popper .tippy-tooltip,.tippy-tooltip{background:transparent!important;"
    "background-color:transparent!important;box-shadow:none!important;border:none!important;}'+"
    "'.tippy-popper .tippy-content,.tippy-tooltip .tippy-content{"
    "background:rgba(34,34,36,.55)!important;color:#ededed!important;"
    "-webkit-backdrop-filter:blur(22px) saturate(140%);"
    "backdrop-filter:blur(22px) saturate(140%);"
    "border:none!important;border-radius:12px!important;"
    "box-shadow:0 8px 28px rgba(0,0,0,.35)!important;padding:10px 12px!important;}';"
    "(document.head||document.documentElement).appendChild(s);}"
    "function shadow(el){try{var r=el.shadowRoot;if(!r)return;"
    "if(r.querySelector('#__janki_shadow_frost'))return;"
    "var st=document.createElement('style');st.id='__janki_shadow_frost';"
    "st.textContent='*{background-color:transparent!important;color:#ededed!important;'+"
    "'border-color:transparent!important;outline:none!important;box-shadow:none!important;}'+"
    "':host{display:block!important;background:transparent!important;"
    "color:#ededed!important;border:none!important;box-shadow:none!important;}';"
    "r.appendChild(st);}catch(e){}}"
    "function all(){css();var e=document.querySelectorAll('amboss-tooltip-content');"
    "for(var i=0;i<e.length;i++)shadow(e[i]);}"
    "all();try{if(!window.__janki_tippy_obs){window.__janki_tippy_obs="
    "new MutationObserver(all);window.__janki_tippy_obs.observe("
    "document.documentElement,{childList:true,subtree:true});}}catch(e){}})();"
)


# Undo the tooltip frost: drop the injected <style>, disconnect the observer, and
# strip the shadow-root styles so AMBOSS's native tippy tooltip is fully restored
# (used when amboss_tooltip_frost is off — some tippy configs flicker on/off when
# we alter the tooltip geometry/stacking, so this lets the frost be turned off).
_AMBOSS_TOOLTIP_OFF_JS = (
    "(function(){var s=document.getElementById('__janki_tippy_frost');if(s)s.remove();"
    "try{if(window.__janki_tippy_obs){window.__janki_tippy_obs.disconnect();"
    "window.__janki_tippy_obs=null;}}catch(e){}"
    "try{var e=document.querySelectorAll('amboss-tooltip-content');"
    "for(var i=0;i<e.length;i++){var r=e[i].shadowRoot;if(r){"
    "var st=r.querySelector('#__janki_shadow_frost');if(st)st.remove();}}}catch(e){}})();"
)


def _frost_amboss_tooltip():
    w = getattr(mw, "web", None)
    if w is None:
        return
    js = (_AMBOSS_TOOLTIP_JS if bool(_cfg().get("amboss_tooltip_frost", True))
          else _AMBOSS_TOOLTIP_OFF_JS)
    try:
        w.eval(js)
    except Exception:
        try:
            w.page().runJavaScript(js)
        except Exception:
            pass


# ---------------------------------------------------------------------------
# A narrow window clips AMBOSS hover previews. Rather than resize the window
# (the user doesn't want it physically popping out), just SUPPRESS the preview
# while the reviewer is too narrow to show it properly: inject a CSS media query
# that hides the tooltip below preview_min_window_width. It's purely reactive —
# no polling, no window changes — so when the window is wide enough previews come
# back on their own.
# ---------------------------------------------------------------------------
def _amboss_narrow_hide_js(min_w):
    return (
        "(function(){var SID='__janki_tip_narrow';var s=document.getElementById(SID);"
        "if(!s){s=document.createElement('style');s.id=SID;"
        "(document.head||document.documentElement).appendChild(s);}"
        "s.textContent='@media (max-width:" + str(int(min_w) - 1) + "px){"
        ".tippy-popper,.tippy-box,.tippy-tooltip,amboss-tooltip-content{"
        "display:none!important;visibility:hidden!important;opacity:0!important;"
        "pointer-events:none!important;}}';})()"
    )


def _apply_amboss_narrow_hide():
    web = getattr(mw, "web", None)
    if web is None:
        return
    try:
        min_w = int(_cfg().get("preview_min_window_width", 900))
    except Exception:
        min_w = 900
    try:
        web.eval(_amboss_narrow_hide_js(min_w))
    except Exception:
        try:
            web.page().runJavaScript(_amboss_narrow_hide_js(min_w))
        except Exception:
            pass


# ---------------------------------------------------------------------------
# Hide AMBOSS term underlines unless in fullscreen. AMBOSS underlines matched
# terms with a border-bottom on `span.amboss-marker` (see the AMBOSS add-on's
# reviewer.py). We keep them out of the way in windowed review and only reveal
# them in native fullscreen (the immersive read).
# ---------------------------------------------------------------------------
_AMBOSS_UL_HIDE_JS = (
    "(function(){var ID='__janki_amboss_ul';var s=document.getElementById(ID);"
    "if(!s){s=document.createElement('style');s.id=ID;"
    "(document.head||document.documentElement).appendChild(s);}"
    "s.textContent='span.amboss-marker{border-bottom:0 !important;}';})()"
)
_AMBOSS_UL_SHOW_JS = (
    "(function(){var s=document.getElementById('__janki_amboss_ul');"
    "if(s)s.remove();})()"
)


def _apply_amboss_underlines():
    """Show AMBOSS term underlines only in fullscreen; hide them windowed."""
    web = getattr(mw, "web", None)
    if web is None:
        return
    try:
        js = _AMBOSS_UL_SHOW_JS if mw.isFullScreen() else _AMBOSS_UL_HIDE_JS
        web.eval(js)
    except Exception:
        pass


def _start_amboss_size_watch():
    if not _cfg().get("amboss_frost", True):
        return
    _apply_amboss_narrow_hide()


def _stop_amboss_size_watch():
    return


_AMBOSS_DIAG_JS = (
    "(function(){var host=location.host;"
    "var ifr=document.querySelectorAll('iframe').length;"
    "var all=document.querySelectorAll('body *').length;"
    "var sh=0,e=document.querySelectorAll('*');"
    "for(var i=0;i<e.length;i++){if(e[i].shadowRoot)sh++;}"
    "var white=0,els=document.querySelectorAll('body *');"
    "for(var i=0;i<els.length;i++){var bg=getComputedStyle(els[i]).backgroundColor;"
    "var m=bg&&bg.match(/rgba?\\(([^)]+)\\)/);if(m){var p=m[1].split(',');"
    "if(parseFloat(p[0])>228&&parseFloat(p[1])>228&&parseFloat(p[2])>228&&"
    "(p.length<4||parseFloat(p[3])>0.05))white++;}}"
    "var inj=document.getElementById('__janki_amboss_frost')?1:0;"
    "return host+' | iframes='+ifr+' | bodyEls='+all+' | shadowRoots='+sh+"
    "' | whiteSlabs='+white+' | styleInjected='+inj;})()"
)


def _amboss_diagnose() -> None:
    from aqt.utils import showInfo
    wvs = _amboss_webviews()
    if not wvs:
        showInfo("AMBOSS frost: 0 matching webviews found.\n"
                 "Open the AMBOSS panel first (so its webview exists), then run this again.")
        return
    results = [None] * len(wvs)
    remaining = {"n": len(wvs)}

    def _finish():
        lines = [f"AMBOSS frost diagnose — {len(wvs)} matching webviews:\n"]
        for i, wv in enumerate(wvs):
            try:
                pgbg = wv.page().backgroundColor().name(QColor.NameFormat.HexArgb)
            except Exception:
                pgbg = "?"
            try:
                on = wv.objectName() or "(no name)"
            except Exception:
                on = "?"
            try:
                vis = wv.isVisible()
                sz = f"{wv.width()}x{wv.height()}"
            except Exception:
                vis, sz = "?", "?"
            lines.append(f"[{i}] name={on} vis={vis} size={sz} qtbg={pgbg}\n"
                         f"     {results[i]}")
        showInfo("\n".join(lines))

    def _mk(i, wv):
        def _cb(res):
            results[i] = res
            remaining["n"] -= 1
            if remaining["n"] == 0:
                _finish()
        try:
            wv.page().runJavaScript(_AMBOSS_DIAG_JS, _cb)
        except Exception as exc:
            results[i] = f"JS eval failed: {exc}"
            remaining["n"] -= 1
            if remaining["n"] == 0:
                _finish()
    for i, wv in enumerate(wvs):
        _mk(i, wv)


def _apply_amboss_frost(on: bool) -> None:
    global _amboss_frost_timer
    if on:
        # scan periodically: the AMBOSS panel is created lazily when first opened,
        # so it may not exist at startup. Cheap findChildren sweep every ~2s.
        def _sweep():
            for w in _amboss_webviews():
                _frost_one_amboss(w)
            _frost_amboss_navbar()
            _frost_amboss_tooltip()   # the hover pop-up dictionary (reviewer webview)
        if _amboss_frost_timer is None:
            _amboss_frost_timer = QTimer(mw)
            _amboss_frost_timer.setInterval(2000)
            _amboss_frost_timer.timeout.connect(_sweep)
            _amboss_frost_timer.start()
            # also re-assert the tooltip patch each time a card renders (mw.web
            # re-documents), so the shadow-root style is present before first hover
            if hasattr(gui_hooks, "reviewer_did_show_question"):
                gui_hooks.reviewer_did_show_question.append(
                    lambda card: _frost_amboss_tooltip())
        _sweep()
    else:
        if _amboss_frost_timer is not None:
            _amboss_frost_timer.stop()
            _amboss_frost_timer = None


def _amboss_widget_trace() -> None:
    """Walk each AMBOSS webview's ancestor chain and report which widget paints
    opaque (palette Window colour + autoFillBackground + stylesheet bg). Reports
    only widget geometry/colour/class metadata — no page content."""
    from aqt.utils import showInfo
    try:
        from PyQt6.QtGui import QPalette
    except Exception:
        QPalette = None
    wvs = _amboss_webviews()
    if not wvs:
        showInfo("AMBOSS: 0 webviews. Open the panel first.")
        return
    lines = []
    for i, wv in enumerate(wvs):
        try:
            nm = wv.objectName() or "?"
        except Exception:
            nm = "?"
        lines.append(f"=== webview[{i}] {nm} ===")
        w = wv
        hops = 0
        while w is not None and hops < 9:
            try:
                cn = type(w).__name__
                on = w.objectName() or "-"
                aff = w.autoFillBackground()
                vis = w.isVisible()
                sz = f"{w.width()}x{w.height()}"
                win = "?"
                if QPalette is not None:
                    try:
                        win = w.palette().color(
                            QPalette.ColorRole.Window).name(QColor.NameFormat.HexArgb)
                    except Exception:
                        pass
                ss = (w.styleSheet() or "").replace("\n", " ")
                hasbg = "background" in ss.lower()
                mine = "janki-frost" in ss
                lines.append(f"  [{hops}] {cn}#{on} aff={aff} vis={vis} "
                             f"{sz} win={win} ss-bg={hasbg} frosted={mine}")
            except Exception as e:
                lines.append(f"  [{hops}] err {e}")
            try:
                if w is mw:
                    break
            except Exception:
                pass
            w = w.parentWidget()
            hops += 1
        lines.append("")

    # --- full inventory: every webview + every top-level window, VISIBLE ones
    #     first, so the actual on-screen white surface is easy to spot ---------
    try:
        from aqt.webview import AnkiWebView
        from PyQt6.QtWidgets import QApplication
        from PyQt6.QtWebEngineWidgets import QWebEngineView
    except Exception:
        AnkiWebView = QApplication = QWebEngineView = None
    if AnkiWebView is not None:
        lines.append("=== ALL webviews (visible first) ===")
        allwv = []
        try:
            allwv = mw.findChildren(QWebEngineView)
        except Exception:
            try:
                allwv = mw.findChildren(AnkiWebView)
            except Exception:
                allwv = []
        rows = []
        for w in allwv:
            try:
                rows.append((w.isVisible(), type(w).__name__, w.objectName() or "-",
                             w.width(), w.height()))
            except Exception:
                pass
        for vis, cn, on, ww, hh in sorted(rows, key=lambda r: (not r[0])):
            lines.append(f"  vis={vis} {cn}#{on} {ww}x{hh}")
        lines.append("")
        lines.append("=== top-level windows ===")
        try:
            for tw in QApplication.topLevelWidgets():
                try:
                    if not tw.isVisible():
                        continue
                    lines.append(f"  {type(tw).__name__}#{tw.objectName() or '-'} "
                                 f"{tw.width()}x{tw.height()} "
                                 f"title={tw.windowTitle()!r}")
                except Exception:
                    pass
        except Exception:
            pass
    showInfo("\n".join(lines))


def _apply_global_keys(on: bool) -> None:
    global _key_tap_enabled
    _key_tap_enabled = on
    _gtap_log(f"_apply_global_keys(on={on})")
    if on:
        _start_key_tap()


# ---------------------------------------------------------------------------
# Focus-independent gamepad (GameController framework)
# ---------------------------------------------------------------------------
# Contanki reads the controller via the browser Gamepad API, which only delivers
# input while Anki is focused. In coherence mode Anki is unfocused, so we poll the
# controller directly via GCController (OS-level, focus-independent) and forward
# button presses to the reviewer — but only while a card is up (_remote_active)
# AND Anki is NOT the active app, so we never double-fire with Contanki.
_gc_timer = None
_gc_msg = None
_gc_cls = None
_gc_last = {}          # button selector -> last isPressed
_gc_logged_count = -1  # log controller count when it changes (probe)

# GCExtendedGamepad button -> target macOS keycode (via _send_key_to_anki).
# The 8bitdo Zero 2 (Nintendo layout) maps to the framework's logical buttons
# with the A<->B / X<->Y swap (confirmed empirically):
#   physical Y (Again) -> buttonX -> kc18
#   physical B (Hard)  -> buttonA -> kc19  (also shows the answer on the Q side)
#   physical X (Good)  -> buttonY -> kc20
#   physical A (Easy)  -> buttonB -> kc21
_GC_BUTTON_KC = {b"buttonX": 18, b"buttonA": 19, b"buttonY": 20, b"buttonB": 21}
_gc_shutting_down = False  # set on teardown so the poll can't touch a dying app
_gc_last_hb = 0.0          # throttle for the backgrounded diagnostic heartbeat


def _gc_poll():
    global _gc_logged_count
    if _gc_msg is None or _gc_shutting_down:
        return
    try:
        msg = _gc_msg
        GC = _gc_cls(b"GCController")
        arr = msg(c_void_p, GC, b"controllers") if GC else None
        n = int(msg(ctypes.c_long, arr, b"count")) if arr else 0
        if n != _gc_logged_count:
            _gc_logged_count = n
            _gtap_log(f"[gamepad] GCController count={n}")
        if not n:
            return
        NSApp = msg(c_void_p, _gc_cls(b"NSApplication"), b"sharedApplication")
        app_active = bool(msg(ctypes.c_bool, NSApp, b"isActive"))
        try:
            coherence_visible = bool(_coherence_hud is not None
                                     and _coherence_hud.isVisible())
        except Exception:
            coherence_visible = False
        # Forward when the coherence HUD is up OR Anki is in the background —
        # exactly the cases where Contanki is silent (the HUD on top blurs the
        # reviewer's document so its Gamepad API stops delivering; a backgrounded
        # app gets no gamepad input either). In plain focused review Contanki
        # handles the pad, so we stay out to avoid double-rating.
        # Only forward when Anki is NOT the active app, to avoid double-firing with
        # Contanki (which stays active with the HUD up — it shows without taking
        # focus, so the reviewer keeps focus). NOTE: GameController does not deliver
        # input to a backgrounded app, so in practice this reads nothing there —
        # the poller is currently inert. Truly reading the pad while Anki is
        # backgrounded needs an IOKit HID monitor (not yet implemented).
        forward = _remote_active and not app_active
        _ = coherence_visible  # (retained for clarity; not used in the gate)
        for i in range(n):
            ctrl = msg(c_void_p, arr, b"objectAtIndex:", (ctypes.c_long,), (i,))
            gp = msg(c_void_p, ctrl, b"extendedGamepad") if ctrl else None
            if not gp:
                continue
            for sel, kc in _GC_BUTTON_KC.items():
                btn = msg(c_void_p, gp, sel)
                if not btn:
                    continue
                pressed = bool(msg(ctypes.c_bool, btn, b"isPressed"))
                if pressed and not _gc_last.get(sel, False):  # rising edge
                    _rstate = getattr(getattr(mw, 'reviewer', None), 'state', None)
                    _gtap_log(f"[gamepad] {sel.decode()} active={app_active} "
                              f"hud={coherence_visible} fwd={forward} rstate={_rstate}")
                    if forward:
                        _send_key_to_anki(kc, reveal_first=True)
                _gc_last[sel] = pressed
    except Exception as e:
        _gtap_log(f"gc poll: {e}")


_app_nap_token = None


def _prevent_app_nap():
    """Assert a background activity so macOS App Nap doesn't throttle/suspend our
    timers when Anki is in the background — which is exactly coherence mode. Without
    this the gamepad poll stops the moment you switch to another app, so controller
    presses stop registering. NSActivityBackground (0xFF) = background work that
    must not be napped."""
    global _app_nap_token
    if _app_nap_token is not None:
        return
    try:
        msg, cls = _bridge()
        pi = msg(c_void_p, cls(b"NSProcessInfo"), b"processInfo")
        reason = msg(c_void_p, cls(b"NSString"), b"stringWithUTF8String:",
                     (c_char_p,), (b"janki gamepad polling",))
        token = msg(c_void_p, pi, b"beginActivityWithOptions:reason:",
                    (ctypes.c_ulonglong, c_void_p), (0x000000FF, reason))
        if token:
            msg(c_void_p, token, b"retain")  # hold it or the activity ends
            _app_nap_token = token
            _gtap_log("app nap prevention active")
    except Exception as e:
        _gtap_log(f"app nap: {e}")


def _start_gamepad_poll():
    global _gc_timer, _gc_msg, _gc_cls
    if sys.platform != 'darwin' or _gc_timer is not None:
        return
    try:
        ctypes.CDLL('/System/Library/Frameworks/GameController.framework/GameController')
        _gc_msg, _gc_cls = _bridge()
    except Exception as e:
        _gtap_log(f"gamepad framework load: {e}")
        return
    _prevent_app_nap()  # keep polling alive when Anki is backgrounded (coherence)
    _gc_timer = QTimer(mw)  # parented so Qt manages its lifetime
    _gc_timer.setInterval(40)  # ~25 Hz
    _gc_timer.timeout.connect(_gc_poll)
    _gc_timer.start()
    # Stop the poll as early as possible on shutdown (before the ObjC/framework
    # teardown that bus-errors if a poll fires mid-exit).
    try:
        mw.app.aboutToQuit.connect(_stop_gamepad_poll)
    except Exception:
        pass
    _gtap_log("gamepad poll started")


def _stop_gamepad_poll():
    """Stop the poll timer before shutdown — polling into the GameController /
    ObjC bridge while the app tears down bus-errors (crash on exit)."""
    global _gc_timer, _gc_shutting_down
    _gc_shutting_down = True
    try:
        if _gc_timer is not None:
            _gc_timer.stop()
            _gc_timer.timeout.disconnect(_gc_poll)
            _gc_timer = None
    except Exception:
        pass


# ---------------------------------------------------------------------------
# Focus-INDEPENDENT controller via IOKit HID  (the real path for caption mode)
# ---------------------------------------------------------------------------
# GameController (above) is focus-gated on macOS: it won't deliver input to a
# backgrounded app, so it can't drive Anki while another app is focused/full-
# screen (see feedback-ankiglass-gamepad). IOHIDManager reads raw device reports
# off a dedicated CFRunLoop thread, independent of focus — like Karabiner. This
# is the infrastructure for controller-in-caption-mode.
#
# Requires the INPUT MONITORING permission (System Settings > Privacy & Security
# > Input Monitoring > Anki); macOS prompts on the first IOHIDManagerOpen.
#
# Button numbers here are RAW HID usages (Button usage page 0x09, usage = button
# index), which differ from GameController's logical buttons AND are device-
# specific. So this LOGS every button ("[hid] button N ...") to discover the
# mapping, and reads the number->keycode map from config `hid_button_kc`, e.g.
#   "hid_button_kc": {"1": 18, "2": 19, "3": 20, "4": 21}
# (kc 18-21 = reviewer keys 1-4 = Again/Hard/Good/Easy). Forwarding is gated the
# same way as the GC poller: a card is up (_remote_active) AND Anki is not the
# focused app (_anki_focused) — i.e. exactly caption/background mode, so we never
# double-fire with Contanki.
_hid_manager = None
_hid_cb_ref = None            # keep the CFUNCTYPE callback object alive
_hid_thread = None
_hid_shutting_down = False
_hid_last = {}                # button usage -> last integer value (edge detect)
_hid_axis_last = {}           # d-pad axis usage -> last quantized pos (0/127/255)
_hid_runloop = None           # bg thread's CFRunLoop (so teardown can stop it)
_hid_cf = None                # CoreFoundation handle (for CFRunLoopStop at exit)
_HID_USAGE_PAGE_BUTTON = 0x09


def _hid_button_map():
    """config hid_button_kc (JSON keys are strings) -> {int button: int keycode}."""
    raw = _cfg().get("hid_button_kc", {}) or {}
    out = {}
    for k, v in raw.items():
        try:
            out[int(k)] = int(v)
        except Exception:
            pass
    return out


def _start_hid_monitor():
    """Open an IOHIDManager matching gamepads/joysticks and forward their button
    presses to the reviewer from a background CFRunLoop thread. No-op unless the
    `hid_controller` config flag is on."""
    global _hid_manager, _hid_cb_ref, _hid_thread, _hid_shutting_down, _hid_cf
    if sys.platform != 'darwin' or _hid_thread is not None:
        return
    if not _cfg().get("hid_controller", False):
        return
    import threading
    try:
        IOKit = ctypes.CDLL('/System/Library/Frameworks/IOKit.framework/IOKit')
        CF = ctypes.CDLL('/System/Library/Frameworks/CoreFoundation.framework/CoreFoundation')
    except Exception as e:
        _gtap_log(f"[hid] framework load: {e}")
        return
    try:
        # --- ctypes signatures. Pointer returns MUST be c_void_p or ctypes
        #     truncates the 64-bit pointer and CoreFoundation PAC-checks crash. ---
        IOKit.IOHIDManagerCreate.restype = c_void_p
        IOKit.IOHIDManagerCreate.argtypes = [c_void_p, ctypes.c_uint32]
        IOKit.IOHIDManagerSetDeviceMatchingMultiple.argtypes = [c_void_p, c_void_p]
        IOKit.IOHIDManagerRegisterInputValueCallback.argtypes = [c_void_p, c_void_p, c_void_p]
        IOKit.IOHIDManagerScheduleWithRunLoop.argtypes = [c_void_p, c_void_p, c_void_p]
        IOKit.IOHIDManagerOpen.restype = ctypes.c_uint32
        IOKit.IOHIDManagerOpen.argtypes = [c_void_p, ctypes.c_uint32]
        IOKit.IOHIDValueGetElement.restype = c_void_p
        IOKit.IOHIDValueGetElement.argtypes = [c_void_p]
        IOKit.IOHIDValueGetIntegerValue.restype = c_long
        IOKit.IOHIDValueGetIntegerValue.argtypes = [c_void_p]
        IOKit.IOHIDElementGetUsagePage.restype = ctypes.c_uint32
        IOKit.IOHIDElementGetUsagePage.argtypes = [c_void_p]
        IOKit.IOHIDElementGetUsage.restype = ctypes.c_uint32
        IOKit.IOHIDElementGetUsage.argtypes = [c_void_p]

        CF.CFNumberCreate.restype = c_void_p
        CF.CFNumberCreate.argtypes = [c_void_p, c_int, c_void_p]
        CF.CFStringCreateWithCString.restype = c_void_p
        CF.CFStringCreateWithCString.argtypes = [c_void_p, c_char_p, ctypes.c_uint32]
        CF.CFDictionaryCreate.restype = c_void_p
        CF.CFDictionaryCreate.argtypes = [c_void_p, ctypes.POINTER(c_void_p),
                                          ctypes.POINTER(c_void_p), c_long,
                                          c_void_p, c_void_p]
        CF.CFArrayCreate.restype = c_void_p
        CF.CFArrayCreate.argtypes = [c_void_p, ctypes.POINTER(c_void_p), c_long, c_void_p]
        CF.CFRunLoopGetCurrent.restype = c_void_p
        CF.CFRunLoopStop.argtypes = [c_void_p]
        IOKit.IOHIDManagerUnscheduleFromRunLoop.argtypes = [c_void_p, c_void_p, c_void_p]
        IOKit.IOHIDManagerClose.restype = ctypes.c_uint32
        IOKit.IOHIDManagerClose.argtypes = [c_void_p, ctypes.c_uint32]

        kCFStringEncodingUTF8 = 0x08000100
        kCFNumberIntType = 9
        # Addresses of CF's global callback structs (needed to build typed
        # CFDictionary / CFArray). c_char.in_dll gives the first byte of the
        # struct; addressof → the struct's address.
        kKeyCB = ctypes.addressof(ctypes.c_char.in_dll(CF, 'kCFTypeDictionaryKeyCallBacks'))
        kValCB = ctypes.addressof(ctypes.c_char.in_dll(CF, 'kCFTypeDictionaryValueCallBacks'))
        kArrCB = ctypes.addressof(ctypes.c_char.in_dll(CF, 'kCFTypeArrayCallBacks'))
        kMode = c_void_p.in_dll(CF, 'kCFRunLoopDefaultMode').value

        def _cfstr(s):
            return CF.CFStringCreateWithCString(None, s, kCFStringEncodingUTF8)

        def _cfnum(n):
            v = c_int(n)
            return CF.CFNumberCreate(None, kCFNumberIntType, ctypes.byref(v))

        def _match_dict(usage_page, usage):
            keys = (c_void_p * 2)(_cfstr(b"DeviceUsagePage"), _cfstr(b"DeviceUsage"))
            vals = (c_void_p * 2)(_cfnum(usage_page), _cfnum(usage))
            return CF.CFDictionaryCreate(None, keys, vals, 2,
                                         c_void_p(kKeyCB), c_void_p(kValCB))

        # Match gamepads (Generic Desktop usage 5) and joysticks (usage 4).
        items = (c_void_p * 2)(_match_dict(1, 5), _match_dict(1, 4))
        matches = CF.CFArrayCreate(None, items, 2, c_void_p(kArrCB))

        mgr = IOKit.IOHIDManagerCreate(None, 0)
        if not mgr:
            _gtap_log("[hid] IOHIDManagerCreate returned NULL")
            return
        IOKit.IOHIDManagerSetDeviceMatchingMultiple(mgr, matches)

        HIDCB = ctypes.CFUNCTYPE(None, c_void_p, ctypes.c_uint32, c_void_p, c_void_p)

        def _on_value(context, result, sender, value):
            # Runs on the background CFRunLoop thread. Only touch plain Python
            # globals + the thread-safe Qt signal here — NO AppKit (not thread
            # safe); the focus gate uses the _anki_focused bool tracked on the
            # main thread.
            if _hid_shutting_down or not value:
                return
            try:
                elem = IOKit.IOHIDValueGetElement(value)
                if not elem:
                    return
                page = int(IOKit.IOHIDElementGetUsagePage(elem))
                if page != _HID_USAGE_PAGE_BUTTON:
                    u = int(IOKit.IOHIDElementGetUsage(elem))
                    iv = int(IOKit.IOHIDValueGetIntegerValue(value))
                    # DISCOVERY: log non-button elements (hat switch / d-pad axes
                    # live on the Generic Desktop page 0x01) on value change so we
                    # can map the D-pad. Deduped to avoid axis spam. Temporary.
                    if _cfg().get("hid_discover", False):
                        k = (page, u)
                        if _hid_last.get(k) != iv:
                            _hid_last[k] = iv
                            _gtap_log(f"[hid] discover page=0x{page:x} "
                                      f"usage=0x{u:x} value={iv}")
                    # D-pad → move the caption around the 3x3 grid. The Zero 2
                    # reports its D-pad as Generic Desktop (0x01) X/Y axes: 0 and
                    # 255 at the extremes, 127 at rest. Fire the matching arrow
                    # keycode on the EDGE into an extreme (not on release, not
                    # repeatedly). Arrows are handled by _send_key_to_anki →
                    # _nudge_coherence (126=up 125=down 123=left 124=right).
                    if page == 0x01 and u in (0x30, 0x31):
                        cur = 0 if iv < 64 else (255 if iv > 191 else 127)
                        if _hid_axis_last.get(u) != cur:
                            _hid_axis_last[u] = cur
                            if cur != 127:
                                if u == 0x31:
                                    kc = 126 if cur == 0 else 125
                                else:
                                    kc = 123 if cur == 0 else 124
                                fwd = bool(_remote_active and not _anki_focused)
                                _gtap_log(f"[hid] dpad kc={kc} fwd={fwd}")
                                if fwd:
                                    _key_bridge.send_key.emit(kc)
                    return
                usage = int(IOKit.IOHIDElementGetUsage(elem))
                ival = int(IOKit.IOHIDValueGetIntegerValue(value))
                last = _hid_last.get(usage)
                _hid_last[usage] = ival
                if ival == 1 and last != 1:   # rising edge = button down
                    fwd = bool(_remote_active and not _anki_focused)
                    _gtap_log(f"[hid] button {usage} press fwd={fwd} "
                              f"remote={_remote_active} focused={_anki_focused}")
                    if fwd:
                        kc = _hid_button_map().get(usage)
                        if kc is not None:
                            # Rating keys use the reveal-first two-press flow (a
                            # question-side press flips the card, the next rates);
                            # everything else (e.g. caption toggle) sends plain.
                            sig = (_key_bridge.send_key_rf if kc in (18, 19, 20, 21)
                                   else _key_bridge.send_key)
                            sig.emit(kc)   # -> main thread
            except Exception as e:
                _gtap_log(f"[hid] cb: {e}")

        _hid_cb_ref = HIDCB(_on_value)
        IOKit.IOHIDManagerRegisterInputValueCallback(mgr, _hid_cb_ref, None)
        _prevent_app_nap()   # keep the bg runloop alive while Anki is backgrounded

        def _run():
            global _hid_runloop
            try:
                _hid_runloop = CF.CFRunLoopGetCurrent()
                IOKit.IOHIDManagerScheduleWithRunLoop(mgr, _hid_runloop, kMode)
                ret = int(IOKit.IOHIDManagerOpen(mgr, 0))
                if ret != 0:
                    _gtap_log(f"[hid] IOHIDManagerOpen failed 0x{ret:x} — grant "
                              "Anki 'Input Monitoring' in Privacy & Security")
                    return
                _gtap_log("[hid] monitor running (focus-independent)")
                CF.CFRunLoopRun()   # returns when _stop_hid_monitor stops the loop
                # Clean teardown ON THIS THREAD (the one that opened/scheduled the
                # manager) so IOKit isn't torn down under a live callback = the
                # bus error seen on quit.
                try:
                    IOKit.IOHIDManagerUnscheduleFromRunLoop(mgr, _hid_runloop, kMode)
                    IOKit.IOHIDManagerClose(mgr, 0)
                except Exception:
                    pass
            except Exception as e:
                _gtap_log(f"[hid] run: {e}")

        _hid_manager = mgr
        _hid_cf = CF
        _hid_shutting_down = False
        _hid_thread = threading.Thread(target=_run, daemon=True)
        _hid_thread.start()
        try:
            mw.app.aboutToQuit.connect(_stop_hid_monitor)
        except Exception:
            pass
        _gtap_log("[hid] monitor started")
    except Exception as e:
        _gtap_log(f"[hid] start: {e}")


def _stop_hid_monitor():
    """Stop dispatching HID input and tear the monitor down cleanly BEFORE the
    process exits. Setting the guard alone isn't enough: the daemon CFRunLoop
    thread stays inside CFRunLoopRun with the manager open+scheduled, so on quit
    IOKit can fire the callback (or get torn down under one) mid-shutdown = the
    bus error. So we also stop the bg runloop and join it; _run then unschedules
    and closes the manager on its own thread before returning."""
    global _hid_shutting_down
    _hid_shutting_down = True
    rl, cf, th = _hid_runloop, _hid_cf, _hid_thread
    if cf is not None and rl is not None:
        try:
            cf.CFRunLoopStop(rl)   # thread-safe; wakes CFRunLoopRun so _run exits
        except Exception:
            pass
    if th is not None:
        try:
            th.join(timeout=1.0)
        except Exception:
            pass


# ---------------------------------------------------------------------------
# Auto-hide cursor after idle in fullscreen
# ---------------------------------------------------------------------------
_cursor_timer = None
_cursor_last_pos = None
_cursor_idle_s = 0.0
_cursor_hidden = False
_CURSOR_HIDE_S = 10.0     # idle seconds before hiding
_CURSOR_TICK_MS = 500


def _cursor_tick():
    global _cursor_last_pos, _cursor_idle_s, _cursor_hidden
    try:
        from PyQt6.QtGui import QCursor
        pos = QCursor.pos()
    except Exception:
        return
    if pos != _cursor_last_pos:
        _cursor_last_pos = pos
        _cursor_idle_s = 0.0
        _cursor_hidden = False  # the OS auto-unhides on the move
        # NOTE: focus-mode chrome is deliberately NOT restored on move — it
        # "stays hidden" until Focus Mode is toggled off (Tab+F).
        return
    # Idle: accumulate regardless of window state (Focus Mode works windowed too).
    _cursor_idle_s += _CURSOR_TICK_MS / 1000.0
    try:
        fs = mw.isFullScreen()
    except Exception:
        fs = False
    # Cursor auto-hide stays fullscreen-only (hiding the cursor in a window is odd).
    if fs and _cursor_idle_s >= _CURSOR_HIDE_S and not _cursor_hidden:
        try:
            msg, cls = _bridge()
            # Hide until the next mouse move (AppKit restores it automatically).
            msg(None, cls(b"NSCursor"), b"setHiddenUntilMouseMoves:",
                (c_bool,), (True,))
            _cursor_hidden = True
        except Exception:
            pass
    # Focus Mode: after the same idle delay, hide the toolbar + bottom bar so only
    # the note-card text remains — works in ANY window state. Stays hidden until
    # Tab+F toggles it off.
    if (_focus_mode_on and not _focus_hidden
            and _cursor_idle_s >= _CURSOR_HIDE_S
            and getattr(mw, "state", None) == "review"):
        _focus_set_hidden(True)


def _start_cursor_hide():
    global _cursor_timer
    if sys.platform != 'darwin' or _cursor_timer is not None:
        return
    _cursor_timer = QTimer(mw)  # parented so Qt manages its lifetime
    _cursor_timer.setInterval(_CURSOR_TICK_MS)
    _cursor_timer.timeout.connect(_cursor_tick)
    _cursor_timer.start()


def _track_app_focus():
    """Keep _anki_focused in sync with whether Anki is the frontmost app, so the
    global key tap only reads a plain Space while Anki is focused (Tab+Space still
    overrides when unfocused)."""
    global _anki_focused
    try:
        def _on_state(state):
            global _anki_focused
            _anki_focused = (state == Qt.ApplicationState.ApplicationActive)
        mw.app.applicationStateChanged.connect(_on_state)
        _track_app_focus._ref = _on_state   # keep the slot alive
        _anki_focused = (mw.app.applicationState() == Qt.ApplicationState.ApplicationActive)
    except Exception:
        pass


# ---------------------------------------------------------------------------
# Focus Mode — hide toolbar + bottom bar so only the note-card text remains.
# Engages like the cursor auto-hide (after _CURSOR_HIDE_S of mouse idle while
# reviewing in fullscreen) and stays hidden until toggled off with Tab+F.
# ---------------------------------------------------------------------------
_focus_mode_on = False
_focus_hidden = False   # whether the chrome is currently hidden

# CSS applied to the reviewer webview while Focus Mode is engaged: hide the card
# tags and vertically centre the card text in the window (the chrome is hidden so
# the card owns the full height). Uses height:100% (not 100vh — QtWebEngine
# mis-resolves vh).
_FOCUS_CSS = (
    "#tags-container{display:none!important;}"
    "html,body{height:100%!important;}"
    "body{min-height:100%!important;box-sizing:border-box!important;"
    "display:flex!important;flex-direction:column!important;"
    # `safe center`: centre short cards, but fall back to top-alignment the moment
    # the content is taller than the viewport (revealed back / small window) so the
    # top never gets clipped or pushed off-screen.
    "justify-content:safe center!important;}"
)


def _focus_chrome():
    """The webviews Focus Mode hides: top toolbar and bottom answer bar."""
    return [getattr(mw, "toolbarWeb", None), getattr(mw, "bottomWeb", None)]


_FOCUS_ANIM_MS = 220        # card slide duration
_FOCUS_FADE_MS = 160        # chrome opacity fade duration


def _fade_chrome(wv, visible: bool) -> None:
    """Cross-fade a chrome webview's content by animating its <body> opacity in the
    page (QGraphicsOpacityEffect renders black on QWebEngineView/macOS, so we fade
    CSS opacity inside the page instead). Height is toggled instantly by the caller
    — fading opacity is GPU-cheap and avoids the per-frame relayout that animating
    the webview's height caused (the jitter)."""
    try:
        if visible:
            wv.eval("(function(){var b=document.body;if(!b)return;"
                    "b.style.transition='none';b.style.opacity='0';"
                    "requestAnimationFrame(function(){"
                    "b.style.transition='opacity " + str(_FOCUS_FADE_MS) + "ms ease';"
                    "b.style.opacity='1';"
                    "setTimeout(function(){b.style.transition='';},"
                    + str(_FOCUS_FADE_MS + 60) + ");});})()")
        else:
            wv.eval("(function(){var b=document.body;if(!b)return;"
                    "b.style.transition='opacity " + str(_FOCUS_FADE_MS) + "ms ease';"
                    "b.style.opacity='0';})()")
    except Exception:
        pass


def _focus_apply_card(hidden: bool, offset_px: int = 0) -> None:
    """Toggle the centre/tags CSS on the current card, wrapped in a FLIP so the card
    GLIDES between top-aligned and centred (measure top before+after, animate the
    delta via the Web Animations API — GPU transform, no reflow). offset_px folds in
    the instant vertical jump from the toolbar's height being toggled, so the card
    appears to start where it was and slides to its new home in one motion."""
    web = getattr(mw, "web", None)
    if web is None:
        return
    import json as _json
    mutate = (
        "var s=document.getElementById('__janki_focus');"
        "if(!s){s=document.createElement('style');s.id='__janki_focus';"
        "(document.head||document.documentElement).appendChild(s);}"
        "s.textContent=" + _json.dumps(_FOCUS_CSS) + ";"
    ) if hidden else (
        "var s=document.getElementById('__janki_focus');if(s)s.remove();"
    )
    js = (
        "(function(){var el=document.getElementById('qa')"
        "||document.body.firstElementChild;if(!el){" + mutate + "return;}"
        "var first=el.getBoundingClientRect().top;"
        + mutate +
        "var last=el.getBoundingClientRect().top;"
        "var dy=(first-last)+(" + str(int(offset_px)) + ");"
        "if(!dy)return;"
        "try{el.animate([{transform:'translateY('+dy+'px)'},"
        "{transform:'translateY(0)'}],"
        "{duration:" + str(_FOCUS_ANIM_MS) + ",easing:'cubic-bezier(0.645,0.045,0.355,1)'});}"
        "catch(e){}})()"
    )
    try:
        web.eval(js)
    except Exception:
        pass


def _focus_set_hidden(hidden: bool) -> None:
    global _focus_hidden
    # Set state FIRST so it can never get stuck (a stuck _focus_hidden=True leaves
    # the card permanently centred with the chrome back). Per-render CSS keys off it.
    _focus_hidden = hidden
    # During a Pomodoro break the card is hidden and the break overlay is centred
    # in mw.web. Hiding/showing the chrome resizes mw.web (the bottom answer bar is
    # taller than the top toolbar), which drifts the fixed break panel downward.
    # Defer the chrome change: record the intent now, apply it when the break ends
    # (_end_break re-asserts Focus Mode). The break panel stays put meanwhile.
    if _pomo_on_break:
        return
    chrome = [w for w in _focus_chrome() if w is not None]
    tb = getattr(mw, "toolbarWeb", None)
    # Remember the toolbar height while it's visible — hiding it shifts mw.web (and
    # the card) up by that much instantly, which _focus_apply_card compensates for.
    if tb is not None and tb.height() > 0:
        tb._janki_full_h = tb.height()
    toolbar_h = int(getattr(tb, "_janki_full_h", 0) or 0) if tb is not None else 0

    if hidden:
        # Fade the chrome out first (still occupying layout, so nothing reflows),
        # THEN collapse its height and slide the card to centre.
        for wv in chrome:
            _fade_chrome(wv, False)

        def _after_fade(off=toolbar_h):
            if not _focus_hidden:      # toggled back during the fade — abort
                return
            for wv in chrome:
                try:
                    wv.hide()
                except Exception:
                    pass
            _focus_apply_card(True, off)     # +toolbar_h: card jumped up, slide down
        QTimer.singleShot(_FOCUS_FADE_MS + 20, _after_fade)
    else:
        # Restore chrome height instantly (one reflow), slide the card to the top,
        # and fade the chrome back in over the top.
        for wv in chrome:
            try:
                wv.show()
            except Exception:
                pass
        _focus_apply_card(False, -toolbar_h)  # -toolbar_h: card jumped down, slide up
        for wv in chrome:
            _fade_chrome(wv, True)

    # Hide the card-timer progress bar in Focus Mode (restore it when off).
    if _card_timer_instance is not None:
        try:
            _card_timer_instance.apply_focus()
        except Exception:
            pass


# ---------------------------------------------------------------------------
# Card zoom — Ctrl+Plus / Ctrl+Minus scale the reviewer card text. Persisted in
# card_zoom and re-applied per card (a <style id=__janki_zoom> in the head using
# the CSS `zoom` property, which scales the card + nested sizes proportionally).
# ---------------------------------------------------------------------------
def _apply_card_zoom() -> None:
    web = getattr(mw, "web", None)
    if web is None:
        return
    z = float(_cfg().get("card_zoom", 1.0))
    js = ("(function(){var s=document.getElementById('__janki_zoom');"
          "if(!s){s=document.createElement('style');s.id='__janki_zoom';"
          "(document.head||document.documentElement).appendChild(s);}"
          "s.textContent='#qa,.card{zoom:" + ("%g" % z) + ";}';})()")
    try:
        web.eval(js)
    except Exception:
        pass


def _change_card_zoom(delta: float) -> None:
    cfg = _cfg()
    z = max(0.5, min(3.0, round(float(cfg.get("card_zoom", 1.0)) + delta, 2)))
    cfg["card_zoom"] = z
    try:
        mw.addonManager.writeConfig(__name__, cfg)
    except Exception:
        pass
    _apply_card_zoom()
    try:
        from aqt.utils import tooltip
        tooltip("Card zoom %d%%" % round(z * 100), period=700)
    except Exception:
        pass


def _toggle_focus_mode() -> None:
    """Tab+F: turn Focus Mode on/off. On → chrome hides after the idle delay;
    off → chrome restored immediately."""
    global _focus_mode_on, _cursor_idle_s
    _focus_mode_on = not _focus_mode_on
    if _focus_mode_on:
        _cursor_idle_s = 0.0        # (idle path is now just a fallback)
        # Engage immediately — no need to wait for the idle delay.
        if getattr(mw, "state", None) == "review":
            _focus_set_hidden(True)
    else:
        _focus_set_hidden(False)    # bring the chrome back right away
    try:
        from aqt.utils import tooltip
        tooltip("Focus Mode " + ("ON" if _focus_mode_on else "OFF"), period=1200)
    except Exception:
        pass


def _open_last_deck() -> None:
    """Tab+O / menu-bar: start studying the last-studied deck straight away —
    select it and drop into the reviewer (Anki bounces to the overview/congrats
    screen if nothing is due). The 'current' deck is Anki's persisted
    last-selected deck, so this survives quitting/reopening."""
    try:
        if mw.col is None:
            return
        did = None
        for getter in (
            lambda: mw.col.decks.get_current_id(),   # modern Anki
            lambda: mw.col.decks.selected(),          # older fallback
            lambda: (mw.col.decks.current() or {}).get("id"),
        ):
            try:
                did = getter()
                if did:
                    break
            except Exception:
                continue
        if not did:
            return
        try:
            mw.col.decks.select(did)
        except Exception:
            pass
        # Tab+O can fire while Anki is unfocused/minimized — bring it forward first.
        if mw.isMinimized() or not mw.isVisible():
            mw.showNormal()
        mw.activateWindow()
        # Start the timebox like the "Study Now" button, then enter review. If the
        # deck has no due cards, moveToState("review") falls through to overview.
        try:
            mw.col.startTimebox()
        except Exception:
            pass
        mw.moveToState("review")
    except Exception as e:
        _gtap_log(f"open last deck failed: {e}")


def _focus_restore_for_nav() -> None:
    """Leaving the reviewer must not leave the app headless — show the chrome
    again (Focus Mode stays armed and re-hides after idle back in review)."""
    if _focus_hidden:
        _focus_set_hidden(False)


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
        _gtap_log(f"[restore] _wake: was_vis={was_vis} now_vis={mw.isVisible()} "
                  f"views={len(views)} vis={[v.isVisible() for v in views]}")
    except Exception as e:
        _gtap_log(f"[restore] _wake error: {e}")


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
                        and _tray_icon and _tray_icon.isVisible()):
                    _teardown_glass_windows()
            elif t == QEvent.Type.WindowStateChange:
                # Apply OLED synchronously & instantly (no grey-before-black flash).
                _sync_oled()
                # fullscreen enter/exit animates (~1s) and rebuilds the frame —
                # re-assert at several points as it settles (respects OLED).
                for d in (80, 400, 900, 1400):
                    QTimer.singleShot(d, _reapply_native)
                if _card_timer_instance:          # realign the top timer bar after the frame settles
                    for d in (0, 450, 1000):
                        QTimer.singleShot(d, _card_timer_instance.reposition)
                # Reveal/hide AMBOSS term underlines as fullscreen settles.
                for d in (0, 450, 1000):
                    QTimer.singleShot(d, _apply_amboss_underlines)
                # Detect restore from minimised: old state had WindowMinimized,
                # current state does not.  Reload webviews the same way the
                # tray-open path does so glass CSS is re-injected.
                was_min = bool(ev.oldState() & Qt.WindowState.WindowMinimized)
                is_min  = bool(mw.windowState() & Qt.WindowState.WindowMinimized)
                if is_min and not was_min:
                    self._restore_pending = True
                    if _pomo_instance:
                        _pomo_instance._xp.hide()
                    if _card_timer_instance:
                        _card_timer_instance.hide_bar()
                elif was_min and not is_min:
                    self._restore_pending = True
                    # Wake the MAIN window's suspended webviews — the real
                    # blank-on-restore fix when the coherence HUD is open.
                    QTimer.singleShot(100, _wake_main_webviews)
                    QTimer.singleShot(400, _wake_main_webviews)
                    if _pomo_instance and _pomo_instance._ticker.isActive() and _pomo_instance._in_review:
                        def _restore_xp():
                            _pomo_instance._xp.reposition()
                            _pomo_instance._xp.show()
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
                if _pomo_instance and _pomo_instance._xp.isVisible():
                    _pomo_instance._xp.reposition()
                # Keep the full-screen break-due tint aligned with the window
                if _pomo_instance and _pomo_instance._tint.isVisible():
                    _pomo_instance._tint.reposition()
                # Keep the card-timer bar aligned with the top toolbar button
                # island. Reposition now and again after the toolbar DOM has
                # re-laid-out (its width follows the window a beat later).
                if _card_timer_instance:
                    _card_timer_instance.reposition()
                    QTimer.singleShot(120, _card_timer_instance.reposition)
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
                r, g, b = _hex_to_rgb(cfg.get("tint_color", "#1e1e1e"))
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


# ---------------------------------------------------------------------------
# CSS
# ---------------------------------------------------------------------------

def _hex_to_rgb(h):
    h = h.lstrip("#")
    if len(h) == 3:
        h = "".join(x * 2 for x in h)
    return int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)


def _tint_rgba(cfg):
    mode = cfg.get("tint_mode", "dark")
    if mode == "light":
        r, g, b = 255, 255, 255
    elif mode == "custom":
        try:
            r, g, b = _hex_to_rgb(cfg.get("tint_color", "#12141e"))
        except Exception:
            r, g, b = 18, 20, 30
    else:
        r, g, b = 18, 20, 30
    return f"rgba({r},{g},{b},{cfg.get('opacity', 0.5):.2f})"


def _props(cfg):
    blur = cfg.get("blur_radius", 12)
    sat = cfg.get("saturation", 140)
    corner = cfg.get("corner_radius", 12)
    # Panels are transparent with no outline — one consistent sheet of glass.
    return (
        f"  background-color: transparent !important;\n"
        f"  border: none !important;\n"
        f"  box-shadow: none !important;\n"
        f"  border-radius: {corner}px !important;\n"
    )


def _body_rgba(cfg):
    """Frosted tint for the whole content area, so text reads as solid on top
    while the desktop still shows through the tint."""
    mode = cfg.get("tint_mode", "dark")
    if mode == "light":
        r, g, b = 255, 255, 255
    elif mode == "custom":
        try:
            r, g, b = _hex_to_rgb(cfg.get("tint_color", "#12141e"))
        except Exception:
            r, g, b = 18, 20, 30
    else:
        r, g, b = 18, 20, 30
    return f"rgba({r},{g},{b},{cfg.get('body_opacity', 0.55):.2f})"


def _build_css(cfg, context):
    if not ACTIVE or not cfg.get("enabled", True):
        return ""
    props = _props(cfg)
    blur = cfg.get("blur_radius", 12)
    sat = cfg.get("saturation", 140)
    base = (
        "<style>\n"
        "/* anki-glass: strip theme backgrounds (incl. Redesign+ Graphite's blue-grey)\n"
        "   so the desktop shows through, then apply a neutral tint on body only. */\n"
        ":root, html { --canvas: transparent !important; --window-bg: transparent !important;\n"
        "  --canvas-elevated: transparent !important; --canvas-inset: transparent !important;\n"
        "  --canvas-overlay: transparent !important; --frame-bg: transparent !important;\n"
        "  --bs-body-bg: transparent !important; --current-deck: transparent !important;\n"
        "  --window-bg: transparent !important; }\n"
        # Nuke EVERY element background (keep form controls) so no theme color —\n"
        # navy or otherwise — can paint over the glass.
        "html body *:not(button):not(input):not(select):not(textarea):not(a.deck) {\n"
        "  background: transparent !important; background-color: transparent !important;\n"
        "  background-image: none !important; }\n"
        # id-specificity strip for the toolbar / bottom-bar containers, which
        # otherwise keep their opaque theme background and read darker than the
        # center card area.
        "html body #header, html body .toolbar, html body #outer,\n"
        "html body #middle, html body #bottom, html body .bottom,\n"
        "html body #innertable, html body #outer table {\n"
        "  background: transparent !important; background-color: transparent !important;\n"
        "  box-shadow: none !important; }\n"
        # The tint now lives on the WINDOW background (uniform, behind every
        # webview) so it applies equally everywhere — webview bodies stay clear.
        "html body { background: transparent !important; background-color: transparent !important; }\n"
        "/* readable text over the desktop without an opaque backing */\n"
        "body, body * {\n"
        "  text-shadow: 0 0 3px rgba(0,0,0,.95), 0 1px 2px rgba(0,0,0,.85) !important; }\n"
        "</style>\n"
    )
    parts = [base]
    screens = cfg.get("screens", {})
    r = int(cfg.get("win_corner_radius", 11))

    # QtWebEngine surfaces ignore native layer masks, so round the WINDOW's outer
    # corners here in CSS: the top webview gets rounded top corners, the bottom
    # webview rounded bottom corners. Outside the radius is transparent → desktop.
    top_round = (
        "<style>\nhtml{overflow:hidden !important;"
        f"border-top-left-radius:{r}px !important;border-top-right-radius:{r}px !important;}}\n</style>\n"
    )
    bottom_round = (
        "<style>\nhtml{overflow:hidden !important;"
        f"border-bottom-left-radius:{r}px !important;border-bottom-right-radius:{r}px !important;}}\n</style>\n"
    )

    # Gentle fade on screen loads. Anki re-renders a screen 2–3× in quick
    # succession, spaced further apart than the fade, so a per-render animation
    # plays multiple times. A per-navigation TOKEN (survives <body> swaps via
    # sessionStorage) guards it to one fade per armed navigation: the burst
    # shares the current token → first render fades and stores it, the rest skip;
    # each new armed navigation bumps _menu_fade_token → fades again.
    #   * The marker is set SYNCHRONOUSLY in <head> as a class on <html>, before
    #     the body is parsed/painted — combined with the head-CSS `both` fill the
    #     body is at opacity:0 from its very first frame, so there's no flash.
    #   * Skipped renders add no class → body shows at normal opacity 1 (no hide,
    #     so it can never get stuck invisible and there's no blink).
    fade_in = (
        "<style>@keyframes glassFadeIn{from{opacity:0}to{opacity:1}}\n"
        "html.glass-fading body{animation:glassFadeIn .25s ease-out both;}</style>\n"
        "<script>(function(){\n"
        f"  var TOKEN='{_menu_fade_token}';\n"
        "  if(sessionStorage.getItem('glassFadeToken')===TOKEN) return;  // already faded\n"
        "  sessionStorage.setItem('glassFadeToken', TOKEN);\n"
        "  document.documentElement.className+=' glass-fading';  // sync, pre-paint\n"
        "})();</script>\n"
    )

    if isinstance(context, DeckBrowser) and screens.get("deck_browser", True):
        parts.append("<style>\nbody center > table:first-of-type {\n" + props
                     + "  overflow:hidden;\n}\n</style>\n")
        parts.append("<style>#studiedToday,#sts-table{display:none!important;}</style>\n")
        # Hide the scrollbar: when the stats block sizing lands at the viewport
        # boundary the scrollbar would toggle on/off (a few-px flicker, bottom
        # right). A zero-width scrollbar can't flicker and no longer steals
        # horizontal space, which also breaks the reflow feedback loop. Content
        # is still scrollable via wheel/trackpad if it overflows.
        parts.append("<style>::-webkit-scrollbar{width:0!important;height:0!important;"
                     "background:transparent!important;}"
                     "html{scrollbar-width:none!important;}</style>\n")
        parts.append(fade_in)
    elif isinstance(context, (DeckBrowserBottomBar, OverviewBottomBar, ReviewerBottomBar)) \
            and screens.get("bottom_bar", True):
        parts.append("<style>\nbody #outer {\n" + props + "  margin:4px 0;\n}\n</style>\n")
        # Bottom buttons: subtle dark fill (slightly darker than the tint) + dark
        # shadow so they read as distinct, visible buttons.
        parts.append(
            "<style>\n"
            "body #outer button, body button {\n"
            "  background: rgba(0,0,0,0.28) !important;\n"
            "  border: none !important;\n"
            "  box-shadow: 0 1px 3px rgba(0,0,0,0.45) !important; }\n"
            "body #outer button:hover, body button:hover {\n"
            "  background: rgba(0,0,0,0.40) !important; }\n"
            # Again/Hard/Good/Easy: tinted background + text color (data-ease 1/2/3/4)
            # Background tint is visible on pure black (OLED) and subtle on glass.
            "body #outer button[data-ease='1']{\n"
            "  color:#ff8080 !important;font-weight:500 !important;\n"
            "  background:rgba(220,60,60,0.18) !important; }\n"
            "body #outer button[data-ease='2']{\n"
            "  color:#ffb560 !important;font-weight:500 !important;\n"
            "  background:rgba(220,140,40,0.16) !important; }\n"
            "body #outer button[data-ease='3']{\n"
            "  color:#6ddd80 !important;font-weight:500 !important;\n"
            "  background:rgba(60,200,90,0.16) !important; }\n"
            "body #outer button[data-ease='4']{\n"
            "  color:#78c4ff !important;font-weight:500 !important;\n"
            "  background:rgba(60,140,240,0.18) !important; }\n"
            "body #outer button[data-ease]:hover{\n"
            "  filter:brightness(1.15) !important; }\n"
            "</style>\n"
        )
        # Responsive bottom bar layout.
        if isinstance(context, DeckBrowserBottomBar):
            # Deck browser uses <center id=outer><table id=header>…</table></center>.
            # toolbar-bottom.css adds padding:9px to #header which overflows width:100%
            # and clips on the right, shifting the visual centre rightward.
            # Nuclear fix: convert the whole thing to a simple flex row.
            parts.append(
                "<style>\n"
                "html, body { overflow:hidden !important; margin:0 !important; padding:0 !important; }\n"
                "body { display:flex !important; justify-content:center !important;"
                " align-items:center !important; height:100% !important;"
                " padding-bottom:18px !important; box-sizing:border-box !important; }\n"
                "#outer, #header, #header tbody, #header tr, #header td {\n"
                "  display:contents !important; }\n"
                "body button { padding:6px 14px !important; min-width:0 !important;"
                " white-space:nowrap !important; }\n"
                "</style>\n"
            )
        elif isinstance(context, OverviewBottomBar):
            # Overview bottom bar (Options / Custom Study / Unbury / Description) is
            # just a row of buttons. The innertable layout centres them within the
            # middle cell, so asymmetric side cells shift them right. Flatten the
            # whole table to display:contents so the buttons become direct flex
            # children of body and centre as one group.
            parts.append(
                "<style>\n"
                "html, body { overflow:hidden !important; margin:0 !important; padding:0 !important; }\n"
                "body { display:flex !important; justify-content:center !important;"
                " align-items:center !important; gap:6px !important; height:100% !important;"
                " padding-bottom:18px !important; box-sizing:border-box !important; }\n"
                "#outer, #innertable, #innertable tbody, #innertable tr, #innertable td,\n"
                "#middle, #middle center, #middle table, #middle tbody, #middle tr, #middle td {\n"
                "  display:contents !important; }\n"
                "body button { padding:6px 14px !important; min-width:0 !important;"
                " white-space:nowrap !important; }\n"
                "</style>\n"
            )
        else:
            # Reviewer: keep the innertable flex layout (edit/more on the sides).
            parts.append(
                "<style>\n"
                "html, body { overflow-x: hidden !important; }\n"
                "#outer { width:100% !important; box-sizing:border-box !important;"
                " padding:2px 6px !important; }\n"
                "#innertable { width:100% !important; }\n"
                "#innertable > tbody > tr { display:flex !important; flex-wrap:wrap !important;\n"
                "  align-items:center !important; justify-content:center !important; gap:6px !important; }\n"
                "#innertable > tbody > tr > td { padding:2px !important; }\n"
                "#middle { flex:1 1 auto !important; display:flex !important; flex-wrap:wrap !important;\n"
                "  justify-content:center !important; align-items:center !important; gap:6px !important; }\n"
                "#middle center, #middle table, #middle tbody, #middle tr, #middle td {\n"
                "  display:contents !important; }\n"
                "#middle button { flex:1 1 0 !important; }\n"
                "#innertable > tbody > tr > td.stat { min-width:0 !important; flex:0 0 auto !important; }\n"
                "#outer button { padding:6px 12px !important; min-width:0 !important;"
                " white-space:nowrap !important; }\n"
                "</style>\n"
            )
        parts.append(bottom_round)
    elif isinstance(context, Overview) and screens.get("overview", True):
        # flex-start + clamp() top-padding: gap from toolbar is proportional to
        # available height so it never crops in short windows and never wastes
        # excessive space in tall ones. Table capped at min(400px,100%) for narrow
        # windows.
        parts.append(
            "<style>\n"
            # Strip every default margin/padding from html and body first so
            # Anki's own stylesheet can't add unexpected space.
            "html, html body { margin:0 !important; padding:0 !important; }\n"
            "html { height:100%; overflow-y:auto !important; }\n"
            # flex column on body; ::before spacer absorbs top space up to 60px
            # so content centers in tall windows but stays near the top in short ones.
            "html body {\n"
            "  min-height:100% !important; display:flex !important;\n"
            "  flex-direction:column !important; align-items:center !important;\n"
            "  justify-content:flex-start !important; text-align:center !important;\n"
            "  padding:0 12px 16px !important; box-sizing:border-box !important; }\n"
            "html body::before {\n"
            "  content:'' !important; display:block !important;\n"
            "  flex:1 1 0 !important; max-height:60px !important; min-height:2px !important; }\n"
            "html body center h1, html body h1 {\n"
            "  margin:0 0 10px !important; padding:0 !important; }\n"
            "html body > center {\n"
            "  width:100% !important; max-width:100% !important;\n"
            "  text-align:center !important; padding:0 !important; margin:0 !important; }\n"
            "html body center > table {\n"
            "  width:min(400px,100%) !important; max-width:100% !important;\n"
            "  margin:0 auto !important; table-layout:fixed !important; }\n"
            "html body center > table > tbody > tr > td {\n"
            "  width:50% !important; text-align:center !important;\n"
            "  vertical-align:middle !important; word-wrap:break-word !important; }\n"
            "</style>\n"
        )
        # "Study Time Stats" addon injects #sts-table (the deck's Total / Past
        # Week times) into the overview via innerHTML. Show it only when it fully
        # fits above the viewport bottom; otherwise hide entirely — never cropped.
        # Start hidden (no flash); the addon injects async, so watch for it with a
        # MutationObserver and re-check on resize. display:none (not removal) keeps
        # it in the DOM so the addon doesn't re-inject a duplicate.
        parts.append(
            "<style>#sts-table{visibility:hidden;}</style>\n"
            "<script>(function(){\n"
            "  function fit(){ var t=document.getElementById('sts-table'); if(!t) return;\n"
            "    t.style.display=''; t.style.visibility='hidden';\n"
            "    var vh=document.documentElement.clientHeight;\n"
            "    if(t.getBoundingClientRect().bottom<=vh-2){ t.style.visibility='visible'; }\n"
            "    else { t.style.display='none'; } }\n"
            "  var s=false; function sched(){ if(s) return; s=true;\n"
            "    requestAnimationFrame(function(){ s=false; fit(); }); }\n"
            "  if(window.MutationObserver) new MutationObserver(sched)\n"
            "    .observe(document.documentElement,{childList:true,subtree:true});\n"
            "  window.addEventListener('resize',sched); sched();\n"
            "})();</script>\n"
        )
        parts.append(fade_in)
    elif isinstance(context, Reviewer) and screens.get("reviewer", True):
        # Keep the card fully transparent (its note background is opaque otherwise).
        # The AnKing note types set `.card{background:#D1CFCE}` and, worse,
        # `.night_mode .card{background:#272828!important}` — the night-mode rule
        # has two classes + !important, so it outranks a plain `.card` override.
        # Match/beat that specificity (html-prefixed, both night-mode class spellings)
        # plus html/body so the whole page stays clear.
        parts.append(
            "<style>\n"
            "html, body,\n"
            "#qa, .card, #qa *,\n"
            "html .night_mode .card, html .nightMode.card,\n"
            "html .night_mode #qa, html .nightMode #qa,\n"
            "html .night_mode .card *, html .nightMode.card * {\n"
            "  background: transparent !important;\n"
            "  background-color: transparent !important;\n}\n</style>\n")
        # Lists: keep items left-aligned (bullets + wrapped lines line up), but let
        # the list box shrink-to-fit so the centered card centers it as a block —
        # a left-aligned list then reads centered instead of hugging the left edge.
        parts.append("<style>\n"
                     "#qa ul, #qa ol, .card ul, .card ol {\n"
                     "  display: inline-block !important; text-align: left !important; }\n"
                     "#qa li, .card li { text-align: left !important; }\n"
                     "</style>\n")
        # Default card font = the Anthropic serif we use elsewhere. Applied to the
        # card text (kbd/shortcut keys left alone).
        _rc = _cfg()
        _font = _rc.get("card_font", "Anthropic Serif Text")
        parts.append("<style>\n"
                     "#qa, .card, #qa *:not(kbd) {\n"
                     "  font-family: \"%s\", -apple-system, Georgia, serif !important;\n}\n"
                     "</style>\n" % _font)
        # Hide the AnKing note-type countdown timer (#s2/.timer). Its text renders
        # black (unreadable on glass) and isn't wanted — timing is handled at the
        # system level. Scoped to the reviewer, so the pomodoro HUD .timer is safe.
        parts.append("<style>\n"
                     "#s2, .timer, .timeOverMsg { display: none !important; }\n"
                     "</style>\n")
        # Card tags (AnKing #tags-container): its line-height is .45rem, so long
        # tags that wrap onto multiple lines overlap. Give it a real line-height,
        # let items wrap with spacing, and dim it.
        parts.append("<style>\n"
                     "#tags-container {\n"
                     "  opacity: 0.4 !important;\n"
                     "  line-height: 1.5 !important;\n"
                     "  display: flex !important; flex-wrap: wrap !important;\n"
                     "  justify-content: center !important; gap: 2px 6px !important;\n"
                     "  align-items: flex-start !important;\n}\n"
                     "#tags-container > * {\n"
                     "  line-height: 1.4 !important; white-space: nowrap !important;\n"
                     "  margin: 0 !important; float: none !important; }\n"
                     "</style>\n")
        # Focus Mode: while chrome is hidden, hide the card tags AND vertically
        # centre the card in the window. Re-applied on every render so it survives
        # card changes (paired with an immediate eval in _focus_set_hidden for the
        # card already on screen).
        if _focus_hidden:
            parts.append("<style>\n" + _FOCUS_CSS + "\n</style>\n")
    elif isinstance(context, TopToolbar) and screens.get("toolbar", True):
        parts.append("<style>\nbody #header {\n" + props + "}\n</style>\n")
        # The nav items (a.hitem) live inside one island (div.toolbar). Give the
        # ISLAND the dark fill (matching the bottom buttons), keep items clear, and
        # only highlight the item you're hovering.
        parts.append(
            "<style>\n"
            "html body .header .toolbar, html body div.toolbar {\n"
            "  background: rgba(0,0,0,0.52) !important;\n"
            "  border: none !important; border-radius: 14px !important;\n"
            "  box-shadow: 0 1px 3px rgba(0,0,0,0.45) !important;\n"
            "  padding: 4px 6px !important; }\n"
            "html body .header .hitem, html body a.hitem {\n"
            "  background: transparent !important; box-shadow: none !important;\n"
            "  border: none !important; border-radius: 9px !important; }\n"
            "html body .header .hitem:hover, html body a.hitem:hover {\n"
            "  background: rgba(255,255,255,0.12) !important; }\n"
            "</style>\n"
        )
        parts.append(top_round)

    return "\n".join(parts)


def _typewriter_head(cfg) -> str:
    """Rapid 'typing out' reveal of card text (anti shape-memory). Reveals text
    nodes char-by-char over a fixed duration, leaving images/formatting/MathJax
    intact, and re-fires on every card and on Show Answer."""
    wpm = int(cfg.get("typewriter_wpm", 550))       # reading speed (200–800 typical)
    min_ms = int(cfg.get("typewriter_min_ms", 300))  # floor for short cards
    max_ms = int(cfg.get("typewriter_max_ms", 2600))  # cap for very long cards
    static = "true" if cfg.get("typewriter_static", True) else "false"
    return (
        # Hide the card until the script reveals it, so the full text never flashes
        # before the animation. A safety timer reveals it even if the script fails.
        "<style>#qa{visibility:hidden;}</style>\n"
        "<script>\n"
        "(function(){\n"
        f"  var WPM={wpm}, MIN_MS={min_ms}, MAX_MS={max_ms}, STATIC={static};\n"
        "  function ready(fn){ if(document.readyState!='loading') fn();\n"
        "    else document.addEventListener('DOMContentLoaded', fn); }\n"
        "  ready(function(){\n"
        "    var qa = document.getElementById('qa'); if(!qa) return;\n"
        "    var reveal=function(){ try{ qa.style.visibility='visible'; }catch(e){} };\n"
        "    setTimeout(reveal, 600);\n"   # safety: never leave the card hidden
        "    var observer, animating=false;\n"
        "    function skip(node){ var p=node.parentNode;\n"
        "      while(p && p!==qa){ var t=(p.tagName||'').toUpperCase();\n"
        "        if(t==='SCRIPT'||t==='STYLE') return true;\n"
        "        if(p.classList && (p.classList.contains('MathJax')||\n"
        "            p.classList.contains('MathJax_Preview')||p.classList.contains('mjx-chtml'))) return true;\n"
        "        p=p.parentNode; } return false; }\n"
        "    function collect(clozeOnly){\n"
        "      if(clozeOnly){ var out=[], cs=qa.querySelectorAll('.cloze');\n"
        "        for(var k=0;k<cs.length;k++){ var w2=document.createTreeWalker(cs[k],NodeFilter.SHOW_TEXT,null),m;\n"
        "          while(m=w2.nextNode()){ if(m.nodeValue && m.nodeValue.length && !skip(m)) out.push([m,m.nodeValue]); } }\n"
        "        return out; }\n"
        "      var marker=document.getElementById('answer');\n"
        "      var w=document.createTreeWalker(qa,NodeFilter.SHOW_TEXT,null),o=[],n;\n"
        "      while(n=w.nextNode()){ if(!n.nodeValue || !n.nodeValue.length || skip(n)) continue;\n"
        "        // on the answer side, only type nodes AFTER <hr id=answer> (the back);\n"
        "        // leave the already-seen front instantly visible.\n"
        "        if(marker && !(marker.compareDocumentPosition(n) & 4)) continue;\n"
        "        o.push([n,n.nodeValue]); }\n"
        "      return o; }\n"
        "    function outerSig(){ var c=qa.cloneNode(true), cs=c.querySelectorAll('.cloze');\n"
        "      for(var i=0;i<cs.length;i++){ cs[i].textContent=''; }\n"
        "      return (c.textContent||'').replace(/\\s+/g,' ').trim(); }\n"
        "    function timing(total){ var MS=Math.max(MIN_MS,Math.min(MAX_MS,(total/5)/WPM*60000));\n"
        "      return Math.max(1, Math.ceil(total/Math.max(1,(MS/12)))); }\n"
        "    function typeOutStatic(clozeOnly, done){ var nodes=collect(clozeOnly), spans=[];\n"
        "      nodes.forEach(function(e){ var tn=e[0], text=e[1];\n"
        "        var frag=document.createDocumentFragment();\n"
        "        for(var i=0;i<text.length;i++){ var sp=document.createElement('span');\n"
        "          sp.textContent=text[i]; sp.style.visibility='hidden'; frag.appendChild(sp); spans.push(sp); }\n"
        "        if(tn.parentNode) tn.parentNode.replaceChild(frag, tn); });\n"
        "      reveal();\n"   # full layout is present (all chars sized) → nothing moves
        "      var total=spans.length; if(!total){ done(); return; }\n"
        "      var perTick=timing(total), i=0;\n"
        "      function step(){ var b=perTick;\n"
        "        while(b>0 && i<total){ spans[i].style.visibility='visible'; i++; b--; }\n"
        "        if(i<total) requestAnimationFrame(step); else done(); }\n"
        "      requestAnimationFrame(step); }\n"
        "    function typeOut(clozeOnly, done){ if(STATIC){ return typeOutStatic(clozeOnly, done); }\n"
        "      var nodes=collect(clozeOnly);\n"
        "      var total=nodes.reduce(function(a,x){return a+x[1].length;},0);\n"
        "      if(!total){ reveal(); done(); return; }\n"
        "      // duration scales with length at WPM (5 chars/word), clamped.\n"
        "      var MS=Math.max(MIN_MS, Math.min(MAX_MS, (total/5)/WPM*60000));\n"
        "      nodes.forEach(function(x){ x[0].nodeValue=''; });\n"
        "      reveal();   // reveal the now-emptied card (no flash of full text)\n"
        "      var perTick=Math.max(1, Math.ceil(total/Math.max(1,(MS/12))));\n"
        "      var ni=0,ci=0;\n"
        "      function step(){ var b=perTick;\n"
        "        while(b>0 && ni<nodes.length){ var c=nodes[ni], rem=c[1].length-ci, take=Math.min(b,rem);\n"
        "          c[0].nodeValue=c[1].slice(0,ci+take); ci+=take; b-=take;\n"
        "          if(ci>=c[1].length){ ni++; ci=0; } }\n"
        "        if(ni<nodes.length) requestAnimationFrame(step); else done(); }\n"
        "      requestAnimationFrame(step); }\n"
        "    var lastSig=null;\n"
        "    // Is this the ANSWER side of a cloze card? Per-render, no cross-render state:\n"
        "    // Anki renders each active .cloze as '[...]' / '[hint]' on the FRONT and the\n"
        "    // real answer text on the BACK. So an active .cloze whose text is NOT bracketed\n"
        "    // means we're viewing the reveal.\n"
        "    function isClozeBack(){ var cz=qa.querySelectorAll('.cloze');\n"
        "      for(var i=0;i<cz.length;i++){ var t=(cz[i].textContent||'').trim();\n"
        "        if(t && !/^\\[[\\s\\S]*\\]$/.test(t)) return true; } return false; }\n"
        "    function run(){ if(animating) return;\n"
        "      var s=qa.textContent||'';\n"
        "      if(!s || !s.trim()){ return; }        // ignore transient empty states\n"
        "      if(s===lastSig){ reveal(); return; }  // already showing this card\n"
        "      lastSig=s;\n"
        "      // Cloze reveal → show instantly, no animation. Front of cloze (and basic\n"
        "      // cards) fall through and animate normally.\n"
        "      if(qa.querySelector('.cloze') && isClozeBack()){ reveal(); return; }\n"
        "      animating=true;\n"
        "      if(observer) observer.disconnect();\n"
        "      typeOut(false, function(){ animating=false;\n"
        "        if(observer) observer.observe(qa,{childList:true}); }); }\n"
        "    // childList-only + SYNCHRONOUS run: the observer microtask fires before\n"
        "    // the browser paints, so emptying the text here means the full text is\n"
        "    // never shown. Fires only on real card/answer swaps, not image/MathJax.\n"
        "    observer=new MutationObserver(run);\n"
        "    observer.observe(qa,{childList:true});\n"
        "    run();\n"
        "  });\n"
        "})();\n"
        "</script>\n"
    )


_stats_last_render: float = 0.0


def _stats_head() -> str:
    """Review history charts for the deck browser."""
    import json as _json, time as _time
    global _stats_last_render
    try:
        today_day = int(_time.time()) // 86400
        year_ago_ms = (int(_time.time()) - 367 * 86400) * 1000
        rows = mw.col.db.all(
            "SELECT CAST(id/1000/86400 AS INTEGER) AS d, COUNT(*) "
            "FROM revlog WHERE id>=? GROUP BY d ORDER BY d",
            year_ago_ms,
        )
        day_counts = {int(r[0]): int(r[1]) for r in rows}
        week_total = sum(day_counts.get(today_day - i, 0) for i in range(7))
        total_reviews = sum(day_counts.values())
        today_cutoff_ms = (mw.col.sched.day_cutoff - 86400) * 1000
        cards_today = mw.col.db.scalar(
            "SELECT count(*) FROM revlog WHERE id>=?", today_cutoff_ms) or 0
        time_today_ms = mw.col.db.scalar(
            "SELECT sum(time) FROM revlog WHERE id>=?", today_cutoff_ms) or 0
        mins_today = round(time_today_ms / 60000, 1)
        spc = round(time_today_ms / 1000 / cards_today, 2) if cards_today else 0
        studied_str = (f"Studied {cards_today} cards in {mins_today} minutes today ({spc}s/card)"
                       if cards_today else "No cards studied today")
    except Exception:
        day_counts, today_day, week_total, total_reviews = {}, 0, 0, 0
        studied_str = ""

    now = _time.time()
    animate_line = (now - _stats_last_render) > 30
    _stats_last_render = now

    js_data = (
        f"var _GD={_json.dumps(day_counts)};\n"
        f"var _GT={today_day};\n"
        f"var _GW={week_total};\n"
        f"var _GS={_json.dumps(studied_str)};\n"
        f"var _GR={total_reviews};\n"
        f"var _GA={'true' if animate_line else 'false'};\n"
    )

    js_body = (
        "(function(){\n"
        "var DAY=_GD,TODAY=_GT,WEEK=_GW,STUDIED=_GS,TOTAL=_GR;\n"
        "var DPR=Math.min(window.devicePixelRatio||1,2);\n"
        "function setup(c,w,h){\n"
        "  c.width=w*DPR;c.height=h*DPR;\n"
        "  c.style.width=w+'px';c.style.height=h+'px';\n"
        "  var ctx=c.getContext('2d');ctx.scale(DPR,DPR);return ctx;\n"
        "}\n"
        "function rRect(ctx,x,y,w,h,r){\n"
        "  ctx.beginPath();\n"
        "  ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.arcTo(x+w,y,x+w,y+r,r);\n"
        "  ctx.lineTo(x+w,y+h-r);ctx.arcTo(x+w,y+h,x+w-r,y+h,r);\n"
        "  ctx.lineTo(x+r,y+h);ctx.arcTo(x,y+h,x,y+h-r,r);\n"
        "  ctx.lineTo(x,y+r);ctx.arcTo(x,y,x+r,y,r);ctx.closePath();\n"
        "}\n"
        "function fmt(n){return n.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g,',');}\n"
        # heatmap geometry shared with tooltip handler
        "var WEEKS=17,CELL=13,GAP=3,LBL=14,ROWS=5;\n"
        "var HM_W=LBL+WEEKS*(CELL+GAP)-GAP;\n"
        "var HM_H=ROWS*(CELL+GAP)-GAP+14;\n"
        "var hmStart=0;\n"
        "function drawHeatmap(c){\n"
        "  var ctx=setup(c,HM_W,HM_H);\n"
        "  ctx.font='9px -apple-system,ui-sans-serif,sans-serif';\n"
        "  var dl=['','M','T','W','T','F',''];\n"
        "  ctx.fillStyle='rgba(255,255,255,0.28)';\n"
        "  for(var r=1;r<=5;r++) ctx.fillText(dl[r],0,(r-1)*(CELL+GAP)+CELL-2);\n"
        "  var todayDow=new Date().getDay();\n"
        "  hmStart=(TODAY-todayDow)-(WEEKS-1)*7;\n"
        "  var maxV=1;\n"
        "  for(var col=0;col<WEEKS;col++)\n"
        "    for(var row=1;row<=5;row++){var v=DAY[hmStart+col*7+row]||0;if(v>maxV)maxV=v;}\n"
        "  var months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];\n"
        "  var lastM=-1;\n"
        "  for(var col=0;col<WEEKS;col++){\n"
        "    var colDay=hmStart+col*7;\n"
        "    var m=new Date(colDay*86400000).getMonth();\n"
        "    if(m!==lastM){\n"
        "      if(col>0){ctx.fillStyle='rgba(255,255,255,0.32)';\n"
        "        ctx.fillText(months[m],LBL+col*(CELL+GAP),HM_H-1);}\n"
        "      lastM=m;\n"
        "    }\n"
        "    for(var row=1;row<=5;row++){\n"
        "      var day=colDay+row;\n"
        "      if(day>TODAY) continue;\n"
        "      var v=DAY[day]||0,t=v/maxV;\n"
        "      var x=LBL+col*(CELL+GAP),y=(row-1)*(CELL+GAP);\n"
        "      if(v===0){ctx.fillStyle='rgba(255,255,255,0.06)';}\n"
        "      else{var g=Math.round(90+t*130);\n"
        "        ctx.fillStyle='rgba(40,'+g+',65,'+(0.2+t*0.8).toFixed(2)+')';}\n"
        "      rRect(ctx,x,y,CELL,CELL,2);ctx.fill();\n"
        "    }\n"
        "  }\n"
        "}\n"
        "function drawLine(c){\n"
        "  var YLBL=22,H=80;\n"
        "  var W=HM_W;\n"
        "  var ctx=setup(c,W,H);\n"
        "  var raw=[],i;\n"
        "  for(i=364;i>=0;i--) raw.push(DAY[TODAY-i]||0);\n"
        "  var sm=raw.map(function(v,idx){\n"
        "    var s=0,n=0;\n"
        "    for(var j=Math.max(0,idx-3);j<=Math.min(raw.length-1,idx+3);j++){s+=raw[j];n++;}\n"
        "    return s/n;\n"
        "  });\n"
        "  var mx=Math.max.apply(null,sm)||1;\n"
        "  var N=sm.length,PAD=2,PH=H-PAD*2-6;\n"
        "  var PLOT_X=YLBL;\n"
        "  var PLOT_W=W-YLBL-PAD;\n"
        "  function px(i){return PLOT_X+(i/(N-1))*PLOT_W;}\n"
        "  function py(v){return PAD+PH-(v/mx)*PH;}\n"
        "  var animate=_GA;\n"
        # draw static y-axis ticks and labels before animation
        "  ctx.font='8px -apple-system,ui-sans-serif,sans-serif';\n"
        "  ctx.textAlign='right';\n"
        "  var ticks=[0,0.5,1];\n"
        "  for(var ti=0;ti<ticks.length;ti++){\n"
        "    var tv=ticks[ti],ty=py(tv*mx);\n"
        "    var lv=Math.round(tv*mx);\n"
        "    ctx.fillStyle='rgba(255,255,255,0.30)';\n"
        "    ctx.fillText(lv,YLBL-3,ty+3);\n"
        "    ctx.beginPath();\n"
        "    ctx.moveTo(YLBL,ty);ctx.lineTo(W-PAD,ty);\n"
        "    ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.lineWidth=1;ctx.stroke();\n"
        "  }\n"
        "  var t0=null,DUR=animate?2000:0;\n"
        "  function frame(ts){\n"
        "    if(!t0)t0=ts;\n"
        "    var p=DUR>0?Math.min(1,(ts-t0)/DUR):1;\n"
        "    var e=p<0.5?2*p*p:1-Math.pow(-2*p+2,2)/2;\n"
        "    var n=Math.max(2,Math.round(e*(N-1)));\n"
        # clear only the plot area, preserving y-axis labels
        "    ctx.clearRect(YLBL,0,W-YLBL,H);\n"
        # redraw grid lines over cleared area
        "    for(var ti=0;ti<ticks.length;ti++){\n"
        "      var tv=ticks[ti],ty=py(tv*mx);\n"
        "      ctx.beginPath();\n"
        "      ctx.moveTo(YLBL,ty);ctx.lineTo(W-PAD,ty);\n"
        "      ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.lineWidth=1;ctx.stroke();\n"
        "    }\n"
        "    ctx.beginPath();\n"
        "    ctx.moveTo(px(0),PAD+PH);ctx.lineTo(px(0),py(sm[0]));\n"
        "    for(i=1;i<=n;i++) ctx.lineTo(px(i),py(sm[i]));\n"
        "    ctx.lineTo(px(n),PAD+PH);ctx.closePath();\n"
        "    var g=ctx.createLinearGradient(0,PAD,0,PAD+PH);\n"
        "    g.addColorStop(0,'rgba(80,200,120,0.22)');\n"
        "    g.addColorStop(1,'rgba(80,200,120,0.01)');\n"
        "    ctx.fillStyle=g;ctx.fill();\n"
        "    ctx.beginPath();\n"
        "    ctx.moveTo(px(0),py(sm[0]));\n"
        "    for(i=1;i<=n;i++) ctx.lineTo(px(i),py(sm[i]));\n"
        "    ctx.strokeStyle='rgba(100,220,140,0.85)';ctx.lineWidth=1.5;\n"
        "    ctx.lineJoin='round';ctx.stroke();\n"
        "    ctx.beginPath();\n"
        "    ctx.moveTo(YLBL,PAD+PH+1);ctx.lineTo(W-PAD,PAD+PH+1);\n"
        "    ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.lineWidth=1;ctx.stroke();\n"
        "    if(p<1) requestAnimationFrame(frame);\n"
        "  }\n"
        "  requestAnimationFrame(frame);\n"
        "}\n"
        "function ready(fn){\n"
        "  if(document.readyState!=='loading') fn();\n"
        "  else document.addEventListener('DOMContentLoaded',fn);\n"
        "}\n"
        # Anki re-renders the deck browser 2–3× on launch (and again after an
        # auto-sync), each a fresh document. Building the graphs immediately makes
        # them flash on every throwaway render. Defer via setTimeout: an
        # intermediate render is replaced before its timer fires (timers die with
        # the document), so ONLY the final, settled document actually draws the
        # graphs — once. build() also fades the block in so its appearance is
        # gentle rather than a pop.
        "function build(){\n"
        "  if(document.getElementById('glass-stats')) return;\n"
        # root wrapper — starts transparent, fades in after layout settles
        "  var wrap=document.createElement('div');wrap.id='glass-stats';\n"
        "  wrap.style.opacity='0';\n"
        # big stats header row: CUMULATIVE | DAILY
        "  var hdr=document.createElement('div');hdr.id='gs-hdr';\n"
        "  function makeStatBox(num,lbl){\n"
        "    var box=document.createElement('div');box.className='gs-statbox';\n"
        "    var nb=document.createElement('div');nb.className='gs-bignum';\n"
        "    nb.textContent=fmt(num);\n"
        "    nb.style.setProperty('font-weight','100','important');\n"
        "    var lb=document.createElement('div');lb.className='gs-lbl';\n"
        "    lb.textContent=lbl;\n"
        "    box.appendChild(nb);box.appendChild(lb);return box;\n"
        "  }\n"
        "  hdr.appendChild(makeStatBox(TOTAL,'CUMULATIVE'));\n"
        "  hdr.appendChild(makeStatBox(DAY[TODAY]||0,'DAILY'));\n"
        "  wrap.appendChild(hdr);\n"
        # heatmap
        "  var hc=document.createElement('canvas');hc.id='gs-hmap';\n"
        "  wrap.appendChild(hc);\n"
        # line chart (always visible, below heatmap)
        "  var lc=document.createElement('canvas');lc.id='gs-line';\n"
        "  wrap.appendChild(lc);\n"
        # studied text — declared outside if so ref is always in scope.
        # NOTE: transitions are intentionally NOT set yet — the FIRST layout must
        # collapse over-tall layers instantly (no visible shrink-from-200px
        # flicker on load). Transitions are enabled after the first update().
        "  var TRANS='opacity 0.12s,max-height 0.15s,margin 0.15s';\n"
        "  var st=null;\n"
        "  if(STUDIED){\n"
        "    st=document.createElement('div');st.id='gs-studied';\n"
        "    st.textContent=STUDIED;\n"
        "    st.style.maxHeight='200px';\n"
        "    wrap.appendChild(st);\n"
        "  }\n"
        "  lc.style.maxHeight='200px';\n"
        "  hc.style.maxHeight='200px';\n"
        "  hdr.style.maxHeight='200px';\n"
        # tooltip element (appended to body for fixed positioning)
        "  var tip=document.createElement('div');tip.id='gs-tip';\n"
        "  document.body.appendChild(tip);\n"
        # insert inside <center> so native centering applies
        "  var center=document.querySelector('center');\n"
        "  (center||document.body).appendChild(wrap);\n"
        "  drawHeatmap(hc);\n"
        "  drawLine(lc);\n"
        # hover tooltip on heatmap
        "  hc.addEventListener('mousemove',function(e){\n"
        "    var rect=hc.getBoundingClientRect();\n"
        "    var mx=e.clientX-rect.left,my=e.clientY-rect.top;\n"
        "    var col=Math.floor((mx-LBL)/(CELL+GAP));\n"
        "    var row=Math.floor(my/(CELL+GAP))+1;\n"
        "    if(col>=0&&col<WEEKS&&row>=1&&row<=5){\n"
        "      var day=hmStart+col*7+row;\n"
        "      if(day<=TODAY){\n"
        "        var v=DAY[day]||0;\n"
        "        var d=new Date(day*86400000);\n"
        "        var ds=d.toLocaleDateString(undefined,{month:'short',day:'numeric'});\n"
        "        tip.textContent=v+' review'+(v===1?'':'s')+' · '+ds;\n"
        "        tip.style.display='block';\n"
        "        tip.style.left=(e.clientX+6)+'px';\n"
        "        tip.style.top=(e.clientY+10)+'px';\n"
        "        return;\n"
        "      }\n"
        "    }\n"
        "    tip.style.display='none';\n"
        "  });\n"
        "  hc.addEventListener('mouseleave',function(){tip.style.display='none';});\n"
        # fill available height with even spacing; cascade-fade + collapse layers as space shrinks
        "  function clamp(v){return Math.max(0,Math.min(1,v));}\n"
        "  var CONTENT_MIN=HM_H+80+55+(STUDIED?20:0);\n"
        "  function layer(el,shortage,start){\n"
        "    if(!el) return;\n"
        "    var t=clamp(1-(shortage-start)/18);\n"
        "    el.style.opacity=String(t);\n"
        "    if(t<=0.01){\n"
        "      el.style.maxHeight='0';el.style.overflow='hidden';el.style.margin='0';\n"
        "    } else {\n"
        "      el.style.maxHeight='200px';el.style.overflow='';el.style.margin='';\n"
        "    }\n"
        "  }\n"
        "  var _lastAvail=-1;\n"
        "  function update(){\n"
        "    var tbl=document.querySelector('center > table');\n"
        "    var topBound=tbl?tbl.getBoundingClientRect().bottom:0;\n"
        "    var viewH=document.documentElement.clientHeight;\n"
        "    var avail=Math.min(Math.max(viewH-topBound-16,20),CONTENT_MIN+220);\n"
        # Break the ResizeObserver feedback loop: setting wrap.height changes body
        # height → re-fires the observer → tiny 1–2px oscillation. Ignore updates
        # whose available height barely changed.
        "    if(Math.abs(avail-_lastAvail)<2) return;\n"
        "    _lastAvail=avail;\n"
        "    wrap.style.height=avail+'px';\n"
        "    var shortage=(CONTENT_MIN+160)-avail;\n"
        "    layer(st,shortage,0);\n"
        "    layer(lc,shortage,80);\n"
        "    layer(hc,shortage,160);\n"
        "    layer(hdr,shortage,240);\n"
        "  }\n"
        "  update();\n"
        # First layout collapsed over-tall layers instantly (no transition set
        # yet → no shrink-from-200px flash). Enable transitions now, then fade the
        # whole block in, so only subsequent (resize) changes animate.
        "  requestAnimationFrame(function(){\n"
        "    [st,lc,hc,hdr].forEach(function(el){ if(el) el.style.transition=TRANS; });\n"
        "    wrap.style.transition='opacity 0.2s ease-out';\n"
        "    wrap.style.opacity='1';\n"
        "  });\n"
        # Only re-layout on real window resizes. A ResizeObserver on document.body
        # self-triggered (update writes wrap.height → body mutates → observer fires
        # → update → …), causing a 1–2px down-flicker of the block below the deck
        # list. window.resize covers genuine viewport changes without the loop.
        "  window.addEventListener('resize',update);\n"
        "}\n"
        # Defer past the launch re-render burst so throwaway renders don't draw.
        "ready(function(){ setTimeout(build, 450); });\n"
        "})();\n"
    )

    css = (
        "<style>\n"
        "#glass-stats{display:inline-flex;flex-direction:column;align-items:center;"
        "justify-content:space-evenly;padding:0 20px;margin:0 auto;"
        "box-sizing:border-box;}\n"
        "#gs-hdr{display:flex;flex-direction:row;gap:36px;align-items:flex-end;"
        "justify-content:center;}\n"
        ".gs-statbox{display:flex;flex-direction:column;align-items:center;gap:3px;}\n"
        ".gs-bignum{font-size:34px;line-height:1;color:rgba(255,255,255,0.88);}\n"
        ".gs-bignum,.gs-lbl{font-family:inherit;}\n"
        ".gs-lbl{font-size:9px;color:rgba(255,255,255,0.32);letter-spacing:0.14em;}\n"
        "#gs-studied{font-size:11px;color:rgba(255,255,255,0.35);text-align:center;"
        "margin-top:2px;}\n"
        "#gs-tip{position:fixed;display:none;pointer-events:none;z-index:9999;"
        "background:rgba(255,255,255,0.08);color:rgba(255,255,255,0.88);"
        "font-size:11px;padding:5px 10px;border-radius:8px;white-space:nowrap;"
        "backdrop-filter:blur(20px) saturate(180%);"
        "border:1px solid rgba(255,255,255,0.18);"
        "box-shadow:0 4px 18px rgba(0,0,0,0.45);}\n"
        "</style>\n"
    )

    return css + "<script>\n" + js_data + "</script>\n" + "<script>\n" + js_body + "</script>\n"


def _on_will_set_content(web_content: WebContent, context: Optional[Any]) -> None:
    try:
        css = _build_css(_cfg(), context)
        if css:
            web_content.head += "\n" + css
        # Typewriter reveal on the reviewer card (independent of the glass theme).
        if isinstance(context, Reviewer) and _cfg().get("typewriter", True):
            web_content.head += "\n" + _typewriter_head(_cfg())
        # Review history charts on the deck browser.
        if isinstance(context, DeckBrowser):
            web_content.head += "\n" + _stats_head()
        if ACTIVE:
            QTimer.singleShot(150, _clear_existing_webviews)
    except Exception as exc:
        print(f"[janki] css hook: {exc}", file=sys.stderr)


if hasattr(gui_hooks, "webview_will_set_content"):
    gui_hooks.webview_will_set_content.append(_on_will_set_content)


# The "Congratulations! You have finished this deck for now." page is loaded via
# load_sveltekit_page, which does NOT fire webview_will_set_content — so it never
# received the glass CSS and rendered opaque. Re-inject the core transparency
# rules into mw.web on every load (self-healing, idempotent via the style id).
_CONGRATS_GLASS_CSS = (
    ":root,html{--canvas:transparent!important;--window-bg:transparent!important;"
    "--canvas-elevated:transparent!important;--canvas-inset:transparent!important;"
    "--canvas-overlay:transparent!important;--frame-bg:transparent!important;"
    "--bs-body-bg:transparent!important;--current-deck:transparent!important;}"
    "html body *:not(button):not(input):not(select):not(textarea):not(a.deck)"
    "{background:transparent!important;background-color:transparent!important;"
    "background-image:none!important;}"
    "html,body{background:transparent!important;background-color:transparent!important;}"
    "body,body *{text-shadow:0 0 3px rgba(0,0,0,.95),0 1px 2px rgba(0,0,0,.85)!important;}"
)
_CONGRATS_GLASS_JS = (
    "(function(){if(document.getElementById('__janki_congrats_glass'))return;"
    "var s=document.createElement('style');s.id='__janki_congrats_glass';"
    "s.textContent='" + _CONGRATS_GLASS_CSS + "';"
    "if(document.head)document.head.appendChild(s);})();"
)


def _ensure_congrats_glass(*_):
    if not ACTIVE or not _cfg().get("enabled", True):
        return
    try:
        mw.web.eval(_CONGRATS_GLASS_JS)
    except Exception:
        pass


# ---------------------------------------------------------------------------
# Diagnostics
# ---------------------------------------------------------------------------

def glass_diagnose():
    lines = ["=== janki (deep) diagnostics ==="]
    lines.append(f"launched via wrapper (ANKI_GLASS): {ACTIVE}")
    lines.append(f"QTWEBENGINE_CHROMIUM_FLAGS: {os.environ.get('QTWEBENGINE_CHROMIUM_FLAGS')}")
    lines.append(f"vibrancy installed: {_vibrancy_installed}")
    try:
        msg, cls = _bridge()
        window = msg(c_void_p, c_void_p(int(mw.winId())), b"window")
        if window:
            lines.append(f"NSWindow.isOpaque(): {bool(msg(c_bool, window, b'isOpaque'))}")
            cv = msg(c_void_p, window, b"contentView")
            # class name of contentView
            name_ptr = msg(c_void_p, msg(c_void_p, cv, b"class"), b"description")
            lines.append(f"contentView present: {bool(cv)}")
    except Exception as exc:
        lines.append(f"native probe error: {exc}")
    try:
        central = mw.centralWidget()
        for v in ([c for c in central.children() if isinstance(c, AnkiWebView)] if central else []):
            bg = v.page().backgroundColor()
            lines.append(f"  {type(v).__name__}: page alpha={bg.alpha()}")
    except Exception as exc:
        lines.append(f"webview probe error: {exc}")
    lines.append("")
    lines.append("=== key tap ===")
    lines.append(f"global_keys config: {_cfg().get('global_keys', False)}")
    lines.append(f"_key_tap_running: {_key_tap_running}")
    lines.append(f"_key_tap_enabled: {_key_tap_enabled}")
    lines.append(f"_tab_held: {_tab_held}")
    try:
        import ctypes
        AX = ctypes.CDLL('/System/Library/Frameworks/ApplicationServices.framework/ApplicationServices')
        lines.append(f"AXIsProcessTrusted: {bool(AX.AXIsProcessTrusted())}")
    except Exception as exc:
        lines.append(f"AXIsProcessTrusted error: {exc}")
    lines.append("")
    lines.append("--- key tap log (most recent 30 lines) ---")
    try:
        if os.path.exists(_GTAP_LOG):
            with open(_GTAP_LOG) as f:
                log_lines = f.read().splitlines()
            lines.extend(log_lines[-30:])
        else:
            lines.append("(log file not yet created)")
    except Exception as exc:
        lines.append(f"log read error: {exc}")

    out = "\n".join(lines)
    print(out)
    return out


def _build_diag_text() -> str:
    lines = ["=== janki diagnostics ==="]
    lines.append(f"launched via wrapper (ANKI_GLASS): {ACTIVE}")
    lines.append(f"QTWEBENGINE_CHROMIUM_FLAGS: {os.environ.get('QTWEBENGINE_CHROMIUM_FLAGS')}")
    lines.append(f"vibrancy installed: {_vibrancy_installed}")
    try:
        msg, cls = _bridge()
        window = msg(c_void_p, c_void_p(int(mw.winId())), b"window")
        if window:
            lines.append(f"NSWindow.isOpaque(): {bool(msg(c_bool, window, b'isOpaque'))}")
            cv = msg(c_void_p, window, b"contentView")
            lines.append(f"contentView present: {bool(cv)}")
    except Exception as exc:
        lines.append(f"native probe error: {exc}")
    try:
        central = mw.centralWidget()
        for v in ([c for c in central.children() if isinstance(c, AnkiWebView)] if central else []):
            bg = v.page().backgroundColor()
            lines.append(f"  {type(v).__name__}: page alpha={bg.alpha()}")
    except Exception as exc:
        lines.append(f"webview probe error: {exc}")
    lines.append("")
    lines.append("=== key tap ===")
    lines.append(f"global_keys config: {_cfg().get('global_keys', False)}")
    lines.append(f"_key_tap_running: {_key_tap_running}")
    lines.append(f"_key_tap_enabled: {_key_tap_enabled}")
    lines.append(f"_tab_held: {_tab_held}")
    try:
        import ctypes as _ct
        _AX = _ct.CDLL('/System/Library/Frameworks/ApplicationServices.framework/ApplicationServices')
        lines.append(f"AXIsProcessTrusted: {bool(_AX.AXIsProcessTrusted())}")
    except Exception as exc:
        lines.append(f"AXIsProcessTrusted error: {exc}")
    lines.append("")
    lines.append("--- key tap log ---")
    try:
        if os.path.exists(_GTAP_LOG):
            with open(_GTAP_LOG) as f:
                log_lines = f.read().splitlines()
            lines.extend(log_lines[-50:])
        else:
            lines.append("(log not yet created — key tap hasn't started)")
    except Exception as exc:
        lines.append(f"log read error: {exc}")
    return "\n".join(lines)


def glass_diagnose_live():
    from PyQt6.QtWidgets import QDialog, QVBoxLayout, QHBoxLayout, QPushButton, QTextEdit
    dlg = QDialog(mw)
    dlg.setWindowTitle("Janki Diagnostics")
    dlg.resize(700, 500)
    layout = QVBoxLayout(dlg)

    text = QTextEdit()
    text.setReadOnly(True)
    text.setFontFamily("Menlo")
    text.setFontPointSize(11)
    layout.addWidget(text)

    btn_row = QHBoxLayout()
    btn_clear = QPushButton("Clear Log")
    btn_close = QPushButton("Close")
    btn_row.addWidget(btn_clear)
    btn_row.addStretch()
    btn_row.addWidget(btn_close)
    layout.addLayout(btn_row)

    def refresh():
        pos = text.verticalScrollBar().value()
        at_bottom = pos == text.verticalScrollBar().maximum()
        text.setPlainText(_build_diag_text())
        if at_bottom:
            text.verticalScrollBar().setValue(text.verticalScrollBar().maximum())
        else:
            text.verticalScrollBar().setValue(pos)

    def clear_log():
        try:
            open(_GTAP_LOG, 'w').close()
        except Exception:
            pass
        refresh()

    timer = QTimer(dlg)
    timer.timeout.connect(refresh)
    timer.start(1000)

    btn_clear.clicked.connect(clear_log)
    btn_close.clicked.connect(dlg.accept)

    refresh()
    dlg.show()


# ---------------------------------------------------------------------------
# Live settings dialog
# ---------------------------------------------------------------------------

def _live_apply(cfg):
    """Colour + opacity now live on the WINDOW background (uniform, behind every
    webview). Persist config and re-apply the native window tint."""
    mw.addonManager.writeConfig(__name__, cfg)
    _apply_window_tint()


class GlassSettings(QDialog):
    """macOS-Terminal-style controls: background colour, opacity, blur radius."""

    def __init__(self):
        super().__init__(mw)
        self.setWindowTitle("Janki")
        self.cfg = _cfg()
        self.cfg.setdefault("tint_mode", "custom")
        lay = QVBoxLayout(self)

        # Three tabbed panels. Each page has its own vertical layout; the section
        # builders below append to app_lay / focus_lay / pomo_lay accordingly.
        from aqt.qt import (QTabWidget, QWidget, QComboBox, QGridLayout,
                            QPushButton, QButtonGroup)
        tabs = QTabWidget()
        app_page = QWidget();   app_lay = QVBoxLayout(app_page)
        focus_page = QWidget(); focus_lay = QVBoxLayout(focus_page)
        cap_page = QWidget();   cap_lay = QVBoxLayout(cap_page)
        pomo_page = QWidget();  pomo_lay = QVBoxLayout(pomo_page)
        gen_page = QWidget();   gen_lay = QVBoxLayout(gen_page)
        tabs.addTab(app_page, "Appearance")
        tabs.addTab(focus_page, "Focus")
        tabs.addTab(cap_page, "Caption")
        tabs.addTab(pomo_page, "Pomodoro")
        tabs.addTab(gen_page, "General")

        # Lecture panes (Sources / Behavior) hosted from the lectures submodule so
        # everything lives in ONE settings window. Their save fns run on Close.
        self._lecture_savers = []
        try:
            from . import lectures as _lectures
            _pages, _lsave = _lectures.build_settings_pages()
            for _title, _widget in _pages:
                tabs.addTab(_widget, _title)
            if _lsave:
                self._lecture_savers.append(_lsave)
        except Exception as _e:
            print("[janki] lecture settings tabs failed: %s" % _e, file=sys.stderr)

        lay.addWidget(tabs)

        # === Appearance ======================================================
        # --- Background colour picker (a colour well like Terminal) ----------
        col_row = QHBoxLayout()
        col_label = QLabel("Background colour")
        col_label.setMinimumWidth(140)
        col_row.addWidget(col_label)
        self._color_btn = QPushButton()
        self._color_btn.setMinimumWidth(80)
        self._update_color_swatch()
        self._color_btn.clicked.connect(self._pick_color)
        col_row.addWidget(self._color_btn)
        col_row.addStretch()
        app_lay.addLayout(col_row)

        # --- Opacity + Blur sliders -----------------------------------------
        for key, label, lo, hi, scale in [
            ("body_opacity", "Opacity", 0, 100, 100.0),
            ("blur_radius", "Blur radius", 0, 80, 1.0),
        ]:
            row = QHBoxLayout()
            name = QLabel(label)
            name.setMinimumWidth(140)
            val = QLabel()
            s = QSlider(Qt.Orientation.Horizontal)
            s.setMinimum(lo)
            s.setMaximum(hi)
            s.setValue(int(self.cfg.get(key, 0) * (scale if scale != 1.0 else 1)))

            def make_cb(k=key, sc=scale, lbl=val):
                def cb(v):
                    self.cfg[k] = (v / sc) if sc != 1.0 else v
                    lbl.setText(f"{self.cfg[k]:.2f}" if sc != 1.0 else str(v))
                    if k == "blur_radius":
                        _set_blur(self.cfg[k])
                    else:
                        _live_apply(self.cfg)
                return cb

            s.valueChanged.connect(make_cb())
            val.setText(f"{self.cfg.get(key,0):.2f}" if scale != 1.0 else str(self.cfg.get(key,0)))
            row.addWidget(name)
            row.addWidget(s)
            row.addWidget(val)
            app_lay.addLayout(row)

        # === Focus ===========================================================
        # --- Card timer curve ------------------------------------------------
        # Show/hide the thin progress bar under the toolbar. Independent of the red
        # flare — unchecking hides the bar but the timer + flare still run.
        self._ctbar = QCheckBox("Show timer bar under the toolbar")
        self._ctbar.setChecked(bool(self.cfg.get("card_timer_show_bar", True)))

        def on_ctbar(_state):
            self.cfg["card_timer_show_bar"] = self._ctbar.isChecked()
            mw.addonManager.writeConfig(__name__, self.cfg)
            if _card_timer_instance is not None:
                _card_timer_instance.sync_bar_pref()

        self._ctbar.stateChanged.connect(on_ctbar)
        focus_lay.addWidget(self._ctbar)

        # Real seconds until the red flare for a ~1-sentence card; card length then
        # nudges it within a clamped band (see start_card). Range 1.0–60.0s
        # (x10 on the int slider so we keep 0.1s resolution).
        ct_row = QHBoxLayout()
        ct_name = QLabel("Seconds until flare")
        ct_name.setMinimumWidth(140)
        ct_val = QLabel()
        ct_s = QSlider(Qt.Orientation.Horizontal)
        ct_s.setMinimum(10)    # 1.0s
        ct_s.setMaximum(600)   # 60.0s
        ct_s.setValue(int(round(float(self.cfg.get("card_timer_seconds", 8.0)) * 10)))

        def _ct_cb(v):
            self.cfg["card_timer_seconds"] = v / 10.0
            ct_val.setText(f"{v/10.0:.1f}s")
            mw.addonManager.writeConfig(__name__, self.cfg)
            # start_card reads this live, so just restart the CURRENT card's timer
            # to make the change visible immediately (no rebuild needed).
            r = getattr(mw, "reviewer", None)
            card = getattr(r, "card", None) if r else None
            if (card is not None and _card_timer_instance is not None
                    and getattr(r, "state", None) == "question"):
                _card_timer_instance._on_q(card)

        ct_s.valueChanged.connect(_ct_cb)
        ct_val.setText(f"{float(self.cfg.get('card_timer_seconds', 8.0)):.1f}s")
        ct_row.addWidget(ct_name)
        ct_row.addWidget(ct_s)
        ct_row.addWidget(ct_val)
        focus_lay.addLayout(ct_row)

        # Red edge-flare when the card timer fills (time to move on).
        self._red_flare = QCheckBox("Red flare when the card timer runs out")
        self._red_flare.setChecked(bool(self.cfg.get("card_timer_red_flare", True)))

        def on_red_flare(_state):
            self.cfg["card_timer_red_flare"] = self._red_flare.isChecked()
            mw.addonManager.writeConfig(__name__, self.cfg)
            # If turned off mid-card while the flare is up, clear it now.
            if (not self._red_flare.isChecked() and _card_timer_instance is not None
                    and getattr(_card_timer_instance, "_overlay", None)):
                _card_timer_instance._overlay.set_active(False)

        self._red_flare.stateChanged.connect(on_red_flare)
        focus_lay.addWidget(self._red_flare)

        # Red flare transparency: peak edge alpha (lower = more transparent). One
        # slider governs both windowed and Focus-Mode flares (Focus keeps a +10
        # boost so it still reads a touch stronger with the chrome gone).
        rf_row = QHBoxLayout()
        rf_name = QLabel("Red flare intensity")
        rf_name.setMinimumWidth(140)
        rf_val = QLabel()
        rf_s = QSlider(Qt.Orientation.Horizontal)
        rf_s.setMinimum(2)     # very transparent
        rf_s.setMaximum(40)    # bold
        rf_s.setValue(int(self.cfg.get("card_timer_pulse_alpha", 14)))

        def _rf_cb(v):
            self.cfg["card_timer_pulse_alpha"] = v
            self.cfg["card_timer_pulse_alpha_focus"] = min(255, v + 10)
            rf_val.setText(str(v))
            mw.addonManager.writeConfig(__name__, self.cfg)
            # Re-apply live so a currently-visible flare updates immediately.
            if _card_timer_instance is not None:
                ov = getattr(_card_timer_instance, "_overlay", None)
                if ov is not None:
                    ov._max_a = (v + 10) if _focus_hidden else v
                    if ov.isVisible():
                        ov.update()

        rf_s.valueChanged.connect(_rf_cb)
        rf_val.setText(str(int(self.cfg.get("card_timer_pulse_alpha", 14))))
        rf_row.addWidget(rf_name)
        rf_row.addWidget(rf_s)
        rf_row.addWidget(rf_val)
        focus_lay.addLayout(rf_row)

        # Green edge-flare when a card is answered such that it's finished for today
        # (review cards, or inter-day learning graduating past today).
        self._green_flare = QCheckBox("Green flare when a card is done for the day")
        self._green_flare.setChecked(bool(self.cfg.get("card_timer_green_flare", True)))

        def on_green_flare(_state):
            self.cfg["card_timer_green_flare"] = self._green_flare.isChecked()
            mw.addonManager.writeConfig(__name__, self.cfg)

        self._green_flare.stateChanged.connect(on_green_flare)
        focus_lay.addWidget(self._green_flare)

        # === Caption (coherence HUD) =========================================
        cap_note = QLabel("Caption mode (Tab+\\) shows the current card in a "
                          "floating bar that stays on top of other apps. "
                          "Tab+arrow keys move it around the screen.")
        cap_note.setWordWrap(True)
        cap_note.setStyleSheet("color: gray; margin-bottom: 4px;")
        cap_lay.addWidget(cap_note)

        # Screen position: a 3x3 grid of anchors (mirrors Tab+arrow movement).
        pos_row = QHBoxLayout()
        pos_name = QLabel("Screen position")
        pos_name.setMinimumWidth(140)
        pos_grid_w = QWidget()
        pos_grid = QGridLayout(pos_grid_w)
        pos_grid.setSpacing(4)
        pos_grid.setContentsMargins(0, 0, 0, 0)
        self._pos_group = QButtonGroup(self)
        self._pos_group.setExclusive(True)
        _cur_row, _cur_col = _coherence_rc()
        for _ri, _rn in enumerate(_COH_ROWS):
            for _ci, _cn in enumerate(_COH_COLS):
                _b = QPushButton(_COH_GLYPHS[_ri][_ci])
                _b.setCheckable(True)
                _b.setFixedSize(40, 34)
                _val = f"{_rn}-{_cn}"
                _b.setProperty("pos_val", _val)
                _b.setToolTip(_val.replace("-", " "))
                if _rn == _cur_row and _cn == _cur_col:
                    _b.setChecked(True)
                self._pos_group.addButton(_b)
                pos_grid.addWidget(_b, _ri, _ci)

        def on_pos_pick(btn):
            self.cfg["coherence_position"] = btn.property("pos_val")
            mw.addonManager.writeConfig(__name__, self.cfg)
            if _coherence_hud and _coherence_hud.isVisible():
                # re-render + reposition to the new anchor; same card → no replay
                _coherence_hud.refresh(animate_text=False)

        self._pos_group.buttonClicked.connect(on_pos_pick)
        pos_row.addWidget(pos_name)
        pos_row.addWidget(pos_grid_w)
        pos_row.addStretch()
        cap_lay.addLayout(pos_row)

        # Text alignment inside the caption bar.
        al_row = QHBoxLayout()
        al_name = QLabel("Text alignment")
        al_name.setMinimumWidth(140)
        self._cap_align = QComboBox()
        for _lbl, _val in (("Center", "center"), ("Left", "left"), ("Right", "right")):
            self._cap_align.addItem(_lbl, _val)
        _cur_align = (self.cfg.get("caption_align", "center") or "center").lower()
        _ai = self._cap_align.findData(_cur_align)
        self._cap_align.setCurrentIndex(_ai if _ai >= 0 else 0)

        def on_cap_align(_i):
            self.cfg["caption_align"] = self._cap_align.currentData()
            mw.addonManager.writeConfig(__name__, self.cfg)
            _coherence_refresh(animate_text=False)   # live re-render, no replay

        self._cap_align.currentIndexChanged.connect(on_cap_align)
        al_row.addWidget(al_name)
        al_row.addWidget(self._cap_align)
        al_row.addStretch()
        cap_lay.addLayout(al_row)

        # Font size + image size sliders. Each writes its config key and live-
        # refreshes the HUD (a no-op when caption mode isn't up).
        def _cap_size_slider(key, label, default, lo, hi, suffix="px"):
            row = QHBoxLayout()
            name = QLabel(label)
            name.setMinimumWidth(140)
            val = QLabel()
            s = QSlider(Qt.Orientation.Horizontal)
            s.setMinimum(lo)
            s.setMaximum(hi)
            s.setValue(int(self.cfg.get(key, default)))
            val.setText(f"{int(self.cfg.get(key, default))}{suffix}")

            def _cb(v, k=key, lbl=val, sfx=suffix):
                self.cfg[k] = v
                lbl.setText(f"{v}{sfx}")
                mw.addonManager.writeConfig(__name__, self.cfg)
                _coherence_refresh(animate_text=False)   # live re-render, no replay

            s.valueChanged.connect(_cb)
            row.addWidget(name)
            row.addWidget(s)
            row.addWidget(val)
            cap_lay.addLayout(row)

        _cap_size_slider("caption_font_size", "Font size", 20, 10, 48)
        _cap_size_slider("caption_image_max", "Image size", 480, 120, 1000)

        # Suppress the red/green edge flare while the caption HUD is up.
        self._cap_flare = QCheckBox("Show timer flare over the caption bar")
        self._cap_flare.setChecked(bool(self.cfg.get("caption_flare", True)))

        def on_cap_flare(_state):
            self.cfg["caption_flare"] = self._cap_flare.isChecked()
            mw.addonManager.writeConfig(__name__, self.cfg)
            # If turned off while a flare is live over the HUD, clear it now.
            if (not self._cap_flare.isChecked() and _caption_visible()
                    and _card_timer_instance is not None):
                ov = getattr(_card_timer_instance, "_overlay", None)
                if ov is not None and ov.isVisible():
                    ov.set_active(False)

        self._cap_flare.stateChanged.connect(on_cap_flare)
        cap_lay.addWidget(self._cap_flare)

        # === Pomodoro ========================================================
        # --- Pomodoro break spacing -----------------------------------------
        # Master on/off for the whole Pomodoro system (breaks, XP bar, break tint).
        self._pomo_on = QCheckBox("Enable Pomodoro breaks")
        self._pomo_on.setChecked(bool(self.cfg.get("pomodoro", False)))

        def on_pomo(_state):
            on = self._pomo_on.isChecked()
            self.cfg["pomodoro"] = on
            mw.addonManager.writeConfig(__name__, self.cfg)
            _apply_pomodoro(on)      # build/tear down live, no restart needed

        self._pomo_on.stateChanged.connect(on_pomo)
        pomo_lay.addWidget(self._pomo_on)

        # Note: the work interval counts REVIEW time only (it advances while a
        # card is up, not on the deck browser or during the break itself).
        pomo_note = QLabel("Work interval counts review time only.")
        pomo_note.setStyleSheet("color: gray; margin-bottom: 4px;")
        pomo_lay.addWidget(pomo_note)

        def _pomo_spin(key, label, default, lo, hi, suffix, special_zero=None):
            row = QHBoxLayout()
            name = QLabel(label)
            name.setMinimumWidth(140)
            sb = QSpinBox()
            sb.setRange(lo, hi)
            sb.setSuffix(suffix)
            if special_zero is not None:
                sb.setSpecialValueText(special_zero)   # shown when value == lo (0)
            sb.setValue(int(self.cfg.get(key, default)))

            def _cb(v, k=key):
                self.cfg[k] = v
                mw.addonManager.writeConfig(__name__, self.cfg)
                _rebuild_pomodoro()

            sb.valueChanged.connect(_cb)
            row.addWidget(name)
            row.addWidget(sb)
            row.addStretch()
            pomo_lay.addLayout(row)

        _pomo_spin("pomodoro_work_mins", "Work interval", 25, 1, 180, " min")
        _pomo_spin("pomodoro_short_break_mins", "Short break", 5, 1, 120, " min")
        _pomo_spin("pomodoro_long_break_mins", "Long break", 15, 1, 180, " min")
        _pomo_spin("pomodoro_long_break_every", "Long break every", 4, 0, 20,
                   " breaks", special_zero="Off (no long breaks)")

        # === Appearance (cont.) / General ===================================
        # --- OLED mode -------------------------------------------------------
        self._oled = QCheckBox("OLED mode in full-screen (solid black background)")
        self._oled.setChecked(bool(self.cfg.get("oled_fullscreen", False)))

        def on_oled(_state):
            self.cfg["oled_fullscreen"] = self._oled.isChecked()
            mw.addonManager.writeConfig(__name__, self.cfg)
            _sync_oled()

        self._oled.stateChanged.connect(on_oled)
        app_lay.addWidget(self._oled)

        self._aot = QCheckBox("Keep Anki window always on top")
        self._aot.setChecked(bool(self.cfg.get("always_on_top", False)))

        def on_aot(_state):
            self.cfg["always_on_top"] = self._aot.isChecked()
            mw.addonManager.writeConfig(__name__, self.cfg)
            _apply_always_on_top(self._aot.isChecked())

        self._aot.stateChanged.connect(on_aot)
        gen_lay.addWidget(self._aot)

        self._menubar = QCheckBox("Show menu-bar icon (Caption / Focus mode controls)")
        self._menubar.setChecked(bool(self.cfg.get("menubar_controls", True)))

        def on_menubar(_state):
            self.cfg["menubar_controls"] = self._menubar.isChecked()
            mw.addonManager.writeConfig(__name__, self.cfg)
            _apply_tray(_tray_should_show())

        self._menubar.stateChanged.connect(on_menubar)
        gen_lay.addWidget(self._menubar)

        self._tray = QCheckBox("Minimize to system tray instead of taskbar")
        self._tray.setChecked(bool(self.cfg.get("tray_minimize", False)))

        def on_tray(_state):
            self.cfg["tray_minimize"] = self._tray.isChecked()
            mw.addonManager.writeConfig(__name__, self.cfg)
            # Presence is the OR of both needs; unchecking minimize keeps the icon
            # when the mode controls still want it.
            _apply_tray(_tray_should_show())

        self._tray.stateChanged.connect(on_tray)
        gen_lay.addWidget(self._tray)

        self._gkeys = QCheckBox(
            "Pass Tab+Z/X/C/V/Space to Anki when not focused — hold Tab as modifier (requires Accessibility permission)"
        )
        self._gkeys.setChecked(bool(self.cfg.get("global_keys", False)))

        def on_gkeys(_state):
            self.cfg["global_keys"] = self._gkeys.isChecked()
            mw.addonManager.writeConfig(__name__, self.cfg)
            _apply_global_keys(self._gkeys.isChecked())

        self._gkeys.stateChanged.connect(on_gkeys)
        gen_lay.addWidget(self._gkeys)

        # Focus-independent controller (IOKit HID) — drives Anki from a gamepad in
        # caption mode even when another app is focused/fullscreen.
        self._hid = QCheckBox(
            "Controller input in caption mode via IOKit HID (requires Input "
            "Monitoring permission; takes effect on restart)"
        )
        self._hid.setChecked(bool(self.cfg.get("hid_controller", False)))

        def on_hid(_state):
            self.cfg["hid_controller"] = self._hid.isChecked()
            mw.addonManager.writeConfig(__name__, self.cfg)
            if self._hid.isChecked():
                _start_hid_monitor()   # prompts for Input Monitoring on first open
            # turning off takes effect next launch (the HID runloop thread is
            # daemon and torn down on quit)

        self._hid.stateChanged.connect(on_hid)
        gen_lay.addWidget(self._hid)

        # Frosting the AMBOSS hover tip alters its geometry/stacking, which makes
        # some tippy configs flicker on/off — this lets you turn just that off
        # (the side-panel frost stays on) and restore the native tooltip live.
        self._amtip = QCheckBox("Frost the AMBOSS hover tip (uncheck if it flickers)")
        self._amtip.setChecked(bool(self.cfg.get("amboss_tooltip_frost", True)))

        def on_amtip(_state):
            self.cfg["amboss_tooltip_frost"] = self._amtip.isChecked()
            mw.addonManager.writeConfig(__name__, self.cfg)
            _frost_amboss_tooltip()   # apply or fully remove immediately

        self._amtip.stateChanged.connect(on_amtip)
        gen_lay.addWidget(self._amtip)

        hint = QLabel("Colour + opacity set the tint; blur radius blurs the desktop "
                      "behind Anki (like Terminal). Changes apply live and save "
                      "automatically.")
        hint.setWordWrap(True)
        app_lay.addWidget(hint)

        # Push each page's controls to the top.
        for pl in (app_lay, focus_lay, pomo_lay, gen_lay):
            pl.addStretch()

        close = QPushButton("Close")

        def _close_settings():
            for _fn in getattr(self, "_lecture_savers", []):
                try:
                    _fn()
                except Exception as _e:
                    print("[janki] lecture save failed: %s" % _e, file=sys.stderr)
            self.accept()

        close.clicked.connect(_close_settings)
        lay.addWidget(close)

    def _update_color_swatch(self):
        c = self.cfg.get("tint_color", "#1e1e1e")
        self._color_btn.setText(c)
        self._color_btn.setStyleSheet(f"background-color: {c}; color: white;")

    def _pick_color(self):
        cur = QColor(self.cfg.get("tint_color", "#1e1e1e"))
        col = QColorDialog.getColor(cur, self, "Background colour")
        if col.isValid():
            self.cfg["tint_mode"] = "custom"
            self.cfg["tint_color"] = col.name()
            self._update_color_swatch()
            _live_apply(self.cfg)


def _open_settings():
    GlassSettings().show()


# ---------------------------------------------------------------------------
# Startup
# ---------------------------------------------------------------------------

def _patch_tooltip():
    import aqt.utils as _aqtu

    def _glass_tooltip(msg_text, period=3000, parent=None, y_offset=100, x_offset=0):
        from PyQt6.QtWidgets import QLabel, QWidget, QVBoxLayout
        from PyQt6.QtGui import QFont

        par = parent or (mw.app.activeWindow() if mw and mw.app else None) or mw

        # QWidget avoids the QDialog system-chrome border.
        win = QWidget(par,
                      Qt.WindowType.FramelessWindowHint |
                      Qt.WindowType.WindowStaysOnTopHint |
                      Qt.WindowType.Tool)
        win.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground)
        win.setAttribute(Qt.WidgetAttribute.WA_ShowWithoutActivating)
        win.setStyleSheet("background: transparent;")

        label = QLabel(msg_text, win)
        label.setWordWrap(True)
        # Match Anki's UI font (SF Pro / system font, same weight as the glass HUD)
        label.setFont(QFont(".AppleSystemUIFont", 13))
        label.setStyleSheet(
            "QLabel { color: rgba(255,255,255,0.92); background: transparent; "
            "padding: 4px 8px; }"
        )

        lay = QVBoxLayout(win)
        lay.setContentsMargins(0, 0, 0, 0)
        lay.addWidget(label)
        win.adjustSize()

        if par and hasattr(par, 'geometry'):
            geo = par.geometry()
            win.move(geo.x() + x_offset + 18,
                     geo.y() + geo.height() - win.height() - y_offset)

        win.show()

        # Strip the macOS window shadow and force full transparency natively.
        def _native_clear():
            try:
                _msg, _cls = _bridge()
                ns_win = _msg(c_void_p, c_void_p(int(win.winId())), b"window")
                if ns_win:
                    _msg(c_void_p, ns_win, b"setOpaque:", (c_bool,), (False,))
                    _msg(c_void_p, ns_win, b"setHasShadow:", (c_bool,), (False,))
                    clear = _msg(c_void_p, _cls("NSColor"), b"clearColor")
                    _msg(c_void_p, ns_win, b"setBackgroundColor:",
                         (c_void_p,), (clear,))
            except Exception:
                pass
        QTimer.singleShot(0, _native_clear)
        QTimer.singleShot(period, win.hide)

    _aqtu.tooltip = _glass_tooltip


def _startup():
    try:
        settings = QAction("Janki: Settings…", mw)
        settings.triggered.connect(lambda: _open_settings())
        mw.form.menuTools.addAction(settings)

        # Diagnostic helpers kept available programmatically, but off the menu.
        mw._glass_diagnose = glass_diagnose_live

        # Card zoom: Cmd+Plus / Cmd+Minus (Qt maps Ctrl→Cmd on macOS). Bind both
        # Cmd+= and Cmd+Shift+= for zoom-in (the '+' key needs Shift on most layouts)
        # and Cmd+- for zoom-out. ApplicationShortcut so it fires while the reviewer
        # webview has focus.
        from aqt.qt import QShortcut, QKeySequence
        _zscs = []
        for _seq, _d in (("Ctrl+=", 0.05), ("Ctrl++", 0.05), ("Ctrl+-", -0.05)):
            _sc = QShortcut(QKeySequence(_seq), mw)
            _sc.setContext(Qt.ShortcutContext.ApplicationShortcut)
            _sc.activated.connect(lambda d=_d: _change_card_zoom(d))
            _zscs.append(_sc)
        mw._janki_zoom_scs = _zscs   # keep refs alive

        if _tray_should_show():
            _apply_tray(True)

        if _cfg().get("global_keys", False):
            _apply_global_keys(True)

        # Gamepad poller DISABLED (GameController is focus-gated — can't read the
        # pad while Anki is backgrounded, so it only double-fires with Contanki).
        # _start_gamepad_poll()
        # Focus-INDEPENDENT controller via IOKit HID — the real path for driving
        # Anki from a controller in caption mode while another app is focused.
        # Opt-in (config hid_controller) + needs Input Monitoring permission.
        _start_hid_monitor()

        # Auto-hide the cursor after 10s idle while fullscreen.
        _start_cursor_hide()

        # Track frontmost-app focus so the key tap only reads a plain Space while
        # Anki is focused (Tab+Space overrides when unfocused).
        _track_app_focus()

        if _cfg().get("pomodoro", False):
            _apply_pomodoro(True)

        _patch_tooltip()

        # Quit cleanly: tear down the floating coherence HUD / XP bar when the
        # main window closes, so closing Anki (red button) quits everything
        # instead of leaving those windows keeping the app alive.
        try:
            mw.app.aboutToQuit.connect(_teardown_glass_windows)
        except Exception:
            pass

        # Keep coherence HUD in sync with reviewer state changes.
        # _remote_active gates the 8bitdo focus-bypass: on while a card is up.
        if hasattr(gui_hooks, 'reviewer_did_show_question'):
            def _on_show_question(_r):
                global _remote_active
                _remote_active = True
                _coherence_refresh()
                _apply_card_zoom()      # re-assert card zoom on the new card
                _start_amboss_size_watch()   # widen window while previews are up
                _apply_amboss_underlines()   # hide term underlines unless fullscreen
                if _pomo_instance:
                    _pomo_instance.enter_review()
            gui_hooks.reviewer_did_show_question.append(_on_show_question)
        if hasattr(gui_hooks, 'reviewer_did_show_answer'):
            def _on_show_answer(_r):
                global _remote_active
                _remote_active = True
                _coherence_refresh()
            gui_hooks.reviewer_did_show_answer.append(_on_show_answer)

        # Re-glass any mw.web page that skipped webview_will_set_content — notably
        # the deck-finished "Congratulations" page (loaded via load_sveltekit_page).
        try:
            mw.web.loadFinished.connect(_ensure_congrats_glass)
        except Exception:
            pass

        # XP bar: pause when leaving the reviewer.
        # Menu fade: fade when opening a deck (→ overview) or returning from study.
        if hasattr(gui_hooks, 'state_did_change'):
            def _on_state_change(new_state: str, old_state: str) -> None:
                global _remote_active
                _remote_active = (new_state == 'review')
                if new_state != 'review':
                    _focus_restore_for_nav()
                    _stop_amboss_size_watch()
                if _pomo_instance and new_state != 'review':
                    _pomo_instance.leave_review()
                if new_state == 'overview' or (
                        old_state == 'review' and new_state == 'deckBrowser'):
                    _arm_menu_fade()
            gui_hooks.state_did_change.append(_on_state_change)

        # NOTE: do NOT arm the fade at startup. The initial token (1) already
        # differs from the empty sessionStorage, so the first menu fades once on
        # its own. Bumping the token here would fire a *second* fade on the next
        # re-render of that same screen.

        if ACTIVE:
            _unify_titlebar()
            _clear_existing_webviews()
            # Apply the native glass repeatedly — when launched via the .app
            # (Launch Services) the window can come up opaque before our calls
            # land, so we retry over the first few seconds and self-heal.
            for delay in (200, 500, 900, 1500, 2500, 4000):
                QTimer.singleShot(delay, _reapply_native)
            # reload ALL webviews (toolbar/main/bottom) so each re-injects the
            # transparency CSS — the cold .app launch can leave some opaque.
            # NOTE: this is a visible content reload (blank frame → re-render), so
            # it's kept OUT of the first ~1s where it read as a flicker right after
            # the fade. Window transparency in that early window is already handled
            # by the _reapply_native retries + _clear_existing_webviews above; this
            # late pass only re-asserts CSS on a cold launch that came up opaque.
            QTimer.singleShot(2600, _reload_all_webviews)
            _install_fullscreen_watcher()
            QTimer.singleShot(1000, _sync_oled)  # in case we start full-screen
            # Flush profile meta periodically + on quit so profile-stored auth
            # tokens (e.g. AMBOSS) survive the `just run` wrapper's exit, which
            # can skip Anki's normal clean-shutdown save.
            _start_profile_autosave()
            # Per-card lingering-warning bar under the toolbar (replaces the AnKing timer).
            if _cfg().get("card_timer", True):
                _apply_card_timer(True)
            if _cfg().get("amboss_frost", True):
                _apply_amboss_frost(True)
            if _cfg().get("always_on_top", False):
                _apply_always_on_top(True)
        else:
            print("[janki] not launched via AnkiGlass.command — inactive.", file=sys.stderr)
    except Exception as exc:
        print(f"[janki] startup error: {exc}", file=sys.stderr)


if hasattr(gui_hooks, "main_window_did_init"):
    gui_hooks.main_window_did_init.append(_startup)
elif hasattr(gui_hooks, "profile_did_open"):
    gui_hooks.profile_did_open.append(_startup)


# Lectures feature (formerly the separate "janki_lectures" add-on) is now bundled
# as a submodule. Importing it registers its own Tools menu entry ("Load today's
# lectures") and the once-a-day auto-prompt; its settings panes are hosted inside
# GlassSettings above.
try:
    from . import lectures  # noqa: F401
except Exception as _lec_exc:
    print("[janki] lectures submodule failed to load: %s" % _lec_exc,
          file=sys.stderr)
