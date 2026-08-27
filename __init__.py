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

import sys
from ctypes import c_void_p, c_bool

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
    log(f"import error: {_e}")
    raise

from .src.util.bridge import _bridge
from .src.util.config import log, ACTIVE, GLASS, _cfg
from .src.util import state
from .src.features import card_timer, focus, pomodoro
from .src.user import css, glass, hud
from .src.system import settings_dialog, tray
from .src.util import diagnostics, keytap
from .src.integrations import gamepad
from .src.integrations import amboss, mobilecards
from .src.system import stock_selfheal, updater


# ---------------------------------------------------------------------------
# Startup
# ---------------------------------------------------------------------------

def _patch_tooltip():
    # The glass tooltip strips its shadow/background via the native Cocoa bridge;
    # on other platforms keep Anki's stock tooltip.
    if sys.platform != "darwin":
        return
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
        # Self-heal FIRST (runs even when the add-on is otherwise dormant): if an
        # Anki update reverted our stock .pyc glass patch, re-apply it + prompt a
        # restart. No-op on a source build, when already patched, or on an
        # unvalidated Anki version. See stock_selfheal.py.
        stock_selfheal.maybe_self_heal()

        settings = QAction("Janki: Settings…", mw)
        settings.triggered.connect(lambda: settings_dialog._open_settings())
        mw.form.menuTools.addAction(settings)

        # Diagnostic helpers kept available programmatically, but off the menu.
        mw._glass_diagnose = diagnostics.glass_diagnose_live
        mw._amboss_diagnose = amboss._amboss_diagnose

        # In-app updater: throttled once-a-day background check on launch (Janki
        # isn't on AnkiWeb, so this replaces manual GitHub reinstalls). The manual
        # "Check for updates now" trigger lives in Janki: Settings… → General.
        try:
            updater.maybe_auto_check()
        except Exception as _up_exc:
            log("updater: %s" % _up_exc)

        # Tools ▸ "Janki: Mobile cards" — stamp OLED + animation + font into every
        # note type so it syncs to AnkiMobile (which can't run add-ons). EXPERIMENTAL
        # and off by default: it rewrites every note type's templates, so it only
        # appears once you deliberately set config "mobile_cards": true.
        try:
            if _cfg().get("mobile_cards", False):
                mobilecards.install_menu()
        except Exception as _mc_exc:
            log("mobilecards menu: %s" % _mc_exc)

        # Card zoom: Cmd+Plus / Cmd+Minus (Qt maps Ctrl→Cmd on macOS). Bind both
        # Cmd+= and Cmd+Shift+= for zoom-in (the '+' key needs Shift on most layouts)
        # and Cmd+- for zoom-out. ApplicationShortcut so it fires while the reviewer
        # webview has focus.
        from aqt.qt import QShortcut, QKeySequence
        _zscs = []
        for _seq, _d in (("Ctrl+=", 0.05), ("Ctrl++", 0.05), ("Ctrl+-", -0.05)):
            _sc = QShortcut(QKeySequence(_seq), mw)
            _sc.setContext(Qt.ShortcutContext.ApplicationShortcut)
            _sc.activated.connect(lambda d=_d: focus._change_card_zoom(d))
            _zscs.append(_sc)
        mw._janki_zoom_scs = _zscs   # keep refs alive

        # Close the AMBOSS side panel (it has no obvious in-app close): Cmd+Shift+A.
        _amboss_close_sc = QShortcut(QKeySequence("Ctrl+Shift+A"), mw)
        _amboss_close_sc.setContext(Qt.ShortcutContext.ApplicationShortcut)
        _amboss_close_sc.activated.connect(lambda: amboss.close_amboss())
        mw._janki_amboss_close_sc = _amboss_close_sc
        mw._close_amboss = amboss.close_amboss   # also callable for testing

        if tray._tray_should_show():
            tray._apply_tray(True)

        if _cfg().get("global_keys", False):
            keytap._apply_global_keys(True)

        # Gamepad poller DISABLED (GameController is focus-gated — can't read the
        # pad while Anki is backgrounded, so it only double-fires with Contanki).
        # _start_gamepad_poll()
        # Focus-INDEPENDENT controller via IOKit HID — the real path for driving
        # Anki from a controller in caption mode while another app is focused.
        # Opt-in (config hid_controller) + needs Input Monitoring permission.
        gamepad._start_hid_monitor()

        # Auto-hide the cursor after 10s idle while fullscreen.
        focus._start_cursor_hide()

        # Track frontmost-app focus so the key tap only reads a plain Space while
        # Anki is focused (Tab+Space overrides when unfocused).
        focus._track_app_focus()

        # Pre-warm the caption HUD (hidden) so its one-time non-activating-NSPanel
        # setup happens now, at launch while Anki is focused, instead of on the
        # first Tab+\ over a fullscreen app — where the setStyleMask frame-rebuild
        # stole that window's focus. Delayed slightly so it doesn't contend with
        # the startup webview reloads above.
        QTimer.singleShot(1500, hud._prewarm_coherence_hud)

        if _cfg().get("pomodoro", False):
            pomodoro._apply_pomodoro(True)

        _patch_tooltip()

        # Quit cleanly: tear down the floating coherence HUD / XP bar when the
        # main window closes, so closing Anki (red button) quits everything
        # instead of leaving those windows keeping the app alive.
        try:
            mw.app.aboutToQuit.connect(tray._teardown_glass_windows)
        except Exception:
            pass

        # Keep coherence HUD in sync with reviewer state changes.
        # _remote_active gates the 8bitdo focus-bypass: on while a card is up.
        if hasattr(gui_hooks, 'reviewer_did_show_question'):
            def _on_show_question(_r):
                state._remote_active = True
                hud._coherence_refresh()
                css._apply_text_contrast()    # rescue near-black text on dark/OLED bg
                focus._apply_card_zoom()      # re-assert card zoom on the new card
                amboss._start_amboss_size_watch()   # widen window while previews are up
                amboss._apply_amboss_underlines()   # hide term underlines unless fullscreen
                if pomodoro._pomo_instance:
                    pomodoro._pomo_instance.enter_review()
            gui_hooks.reviewer_did_show_question.append(_on_show_question)
        if hasattr(gui_hooks, 'reviewer_did_show_answer'):
            def _on_show_answer(_r):
                state._remote_active = True
                hud._coherence_refresh()
                css._apply_text_contrast()    # rescue near-black text on dark/OLED bg
            gui_hooks.reviewer_did_show_answer.append(_on_show_answer)

        # Re-glass any mw.web page that skipped webview_will_set_content — notably
        # the deck-finished "Congratulations" page (loaded via load_sveltekit_page).
        try:
            mw.web.loadFinished.connect(css._ensure_congrats_glass)
        except Exception:
            pass

        # XP bar: pause when leaving the reviewer.
        # Menu fade: fade when opening a deck (→ overview) or returning from study.
        if hasattr(gui_hooks, 'state_did_change'):
            def _on_state_change(new_state: str, old_state: str) -> None:
                state._remote_active = (new_state == 'review')
                if new_state != 'review':
                    focus._focus_restore_for_nav()
                    amboss._stop_amboss_size_watch()
                if pomodoro._pomo_instance and new_state != 'review':
                    pomodoro._pomo_instance.leave_review()
                if new_state == 'overview' or (
                        old_state == 'review' and new_state == 'deckBrowser'):
                    hud._arm_menu_fade()
            gui_hooks.state_did_change.append(_on_state_change)

        # NOTE: do NOT arm the fade at startup. The initial token (1) already
        # differs from the empty sessionStorage, so the first menu fades once on
        # its own. Bumping the token here would fire a *second* fade on the next
        # re-render of that same screen.

        # GLASS = window transparency (glass edition only). In the safe edition
        # GLASS is False, so none of this runs and Anki is never touched.
        if GLASS:
            glass._unify_titlebar()
            glass._clear_existing_webviews()
            # Re-assert the native glass a few times — a cold Launch-Services start
            # can bring the window up opaque before our calls land, so we retry.
            for delay in (200, 500, 900, 1500, 2500, 4000):
                QTimer.singleShot(delay, glass._reapply_native)
            # reload ALL webviews (toolbar/main/bottom) so each re-injects the
            # transparency CSS — the cold launch can leave some opaque. Kept out of
            # the first ~1s so it doesn't read as a flicker.
            QTimer.singleShot(2600, glass._reload_all_webviews)
            QTimer.singleShot(1000, glass._sync_oled)  # in case we start full-screen
            # Crash-guard: we've reached the add-on, so aqt init + window creation
            # (where the injected glass setup runs) survived. Give the first paint
            # a moment, then clear the "pending" sentinel so the guard leaves glass
            # on. If a launch dies before this, the next start rolls glass back.
            QTimer.singleShot(4000, stock_selfheal.confirm_glass_ok)

        # ACTIVE = features (run in BOTH editions — safe edition has these without
        # any glass/patch). None of these require window transparency.
        if ACTIVE:
            # Fullscreen watcher keeps the overlays aligned (its glass re-assert +
            # OLED calls no-op when not GLASS).
            glass._install_fullscreen_watcher()
            tray._start_profile_autosave()
            # Per-card lingering-warning bar + red/green flares.
            if _cfg().get("card_timer", True):
                card_timer._apply_card_timer(True)
            if _cfg().get("amboss_frost", True):
                amboss._apply_amboss_frost(True)
            if _cfg().get("always_on_top", False):
                glass._apply_always_on_top(True)
        else:
            log("inactive (no ANKI_GLASS and not the safe edition).")
    except Exception as exc:
        log(f"startup error: {exc}")


if hasattr(gui_hooks, "main_window_did_init"):
    gui_hooks.main_window_did_init.append(_startup)
elif hasattr(gui_hooks, "profile_did_open"):
    gui_hooks.profile_did_open.append(_startup)


# Lectures feature (formerly the separate "janki_lectures" add-on) is now bundled
# as a submodule. Importing it registers its own Tools menu entry ("Load today's
# lectures") and the once-a-day auto-prompt; its settings panes are hosted inside
# GlassSettings above.
try:
    from .src.integrations import lectures
except Exception as _lec_exc:
    log("lectures submodule failed to load: %s" % _lec_exc)
