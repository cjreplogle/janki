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

from .src.util import boot_timing as _bt   # startup timing log (first, to time imports)
_bt.mark("janki import start")

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

_bt.mark("imported aqt")
from .src.util.bridge import _bridge
from .src.util.config import log, ACTIVE, GLASS, _cfg
from .src.util import state
_bt.mark("imported util")
from .src.features import card_timer, focus, lockdown, pomodoro, intersperse, reword
_bt.mark("imported features")
from .src.user import css, glass, hud
_bt.mark("imported css/glass/hud")
from .src.system import settings_dialog, tray
_bt.mark("imported settings/tray")
from .src.util import diagnostics, keytap
from .src.integrations import gamepad
from .src.integrations import amboss, mobilecards
from .src.system import stock_selfheal, updater
_bt.mark("imported integrations/updater")

# Catch Anki's own progress window + hover tooltips from the very start — the launch
# sync's "Syncing…" window appears before main_window_did_init (_startup) runs.
try:
    glass.install_anki_dialog_glass()
    glass.install_glass_tooltips()
except Exception as _gl_exc:
    log("early glass hooks: %s" % _gl_exc)

# Statistics opens inside the main window (glassed) instead of its own window.
try:
    from .src.features import stats_embed as _stats_embed
    _stats_embed.install()
except Exception as _se_exc:
    log("stats embed: %s" % _se_exc)


# ---------------------------------------------------------------------------
# Startup
# ---------------------------------------------------------------------------

def _patch_tooltip():
    # The glass tooltip strips its shadow/background via the native Cocoa bridge;
    # on other platforms keep Anki's stock tooltip.
    if sys.platform != "darwin":
        return
    import aqt.utils as _aqtu

    def _glass_tooltip(msg="", period=3000, parent=None, x_offset=0, y_offset=100, **_kw):
        # Same parameter names as aqt.utils.tooltip (Anki calls it with keywords, e.g.
        # tooltip(msg=..., parent=...)); unknown extras are ignored. Any failure falls
        # back to Anki's own tooltip so a toast can never raise into Anki.
        try:
            return _glass_tooltip_impl(msg, period, parent, y_offset, x_offset)
        except Exception:
            try:
                return _aqtu._janki_orig_tooltip(msg, period=period, parent=parent,
                                                 x_offset=x_offset, y_offset=y_offset)
            except Exception:
                return None

    def _glass_tooltip_impl(msg_text, period=3000, parent=None, y_offset=100, x_offset=0):
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

        # Rounded glass pill behind the text (smooth, anti-aliased) — same look as
        # the hover tooltips and tray menu.
        class _Pill(QObject):
            def eventFilter(self, obj, ev):
                if ev.type() == QEvent.Type.Paint:
                    glass.paint_glass_pill(obj, 10.0)
                return False
        win._jk_pill = _Pill(win)
        win.installEventFilter(win._jk_pill)

        label = QLabel(msg_text, win)
        label.setWordWrap(True)
        # Match Anki's UI font (SF Pro / system font, same weight as the glass HUD)
        label.setFont(QFont(".AppleSystemUIFont", 13))
        label.setStyleSheet(
            "QLabel { color: rgba(255,255,255,0.92); background: transparent; "
            "padding: 7px 12px; }"
        )

        # A word-wrapped QLabel picks a narrow width and wraps early. Size it to the
        # text's natural one-line width (plus padding), capped at 560px — so most
        # messages fit on one line and only long ones wrap.
        try:
            import re as _re
            _plain = _re.sub(r"(?i)<br\s*/?>|</p>|</div>", "\n", str(msg_text))
            _plain = _re.sub(r"<[^>]+>", "", _plain).replace("&nbsp;", " ")
            _fm = label.fontMetrics()
            _one_line = max((_fm.horizontalAdvance(ln) for ln in _plain.splitlines() or [""]),
                            default=0)
            label.setFixedWidth(min(_one_line + 24 + 6, 560))
        except Exception:
            label.setMinimumWidth(360)

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
            if GLASS:
                glass.frost_popup_window(win, corner=10)   # rounded blur behind the pill
        QTimer.singleShot(0, _native_clear)
        QTimer.singleShot(period, win.hide)

    _orig = getattr(_aqtu, "_janki_orig_tooltip", None) or _aqtu.tooltip
    _aqtu._janki_orig_tooltip = _orig
    _aqtu.tooltip = _glass_tooltip

    # Modules that did `from aqt.utils import tooltip` (sync, browser, …) hold their own
    # reference to the ORIGINAL function, so patching aqt.utils alone missed e.g. the
    # "Collection sync complete." toast. Re-point every such reference — now and again
    # shortly after, for modules Anki imports lazily.
    def _repoint():
        for _name, _mod in list(sys.modules.items()):
            try:
                if _mod is None or _mod is _aqtu:
                    continue
                if getattr(_mod, "tooltip", None) is _orig:
                    setattr(_mod, "tooltip", _glass_tooltip)
            except Exception:
                pass
    _repoint()
    for _d in (2000, 8000, 30000):
        QTimer.singleShot(_d, _repoint)


def _warn_if_light_mode():
    """Janki's glass tint + text-contrast rescues assume a DARK background; in
    Light appearance mode some card/UI text renders poorly (near-invisible or
    washed out). Nudge the user to switch to Dark. One tooltip, silenceable via
    config "light_mode_warning". Also fires on live theme changes to Light."""
    try:
        if not _cfg().get("light_mode_warning", True):
            return
        from aqt.theme import theme_manager
        if getattr(theme_manager, "night_mode", True):
            return  # dark mode → glass looks correct
        from aqt.utils import tooltip
        tooltip(
            "Janki: Anki is in Light mode. The glass theme is built for Dark "
            "mode — some text may be hard to read. Switch appearance to Dark "
            "(Preferences ▸ Appearance) for correct contrast.",
            period=7000,
        )
    except Exception as exc:
        log("light-mode warn: %s" % exc)


def _startup():
    _bt.mark("main window ready → _startup begins")
    try:
        # Self-heal FIRST (runs even when the add-on is otherwise dormant): if an
        # Anki update reverted our stock .pyc glass patch, re-apply it + prompt a
        # restart. No-op on a source build, when already patched, or on an
        # unvalidated Anki version. See stock_selfheal.py. Wrapped so a self-heal
        # failure on a new Anki version can NEVER abort the rest of startup (which
        # would silently drop the tray/close-to-tray + every feature below).
        try:
            stock_selfheal.maybe_self_heal()
        except Exception as _sh_exc:
            log(f"self-heal: {_sh_exc}")

        _bt.mark("self-heal check")
        # Expose the bundled web assets (Lora font files) via Anki's media server
        # so the desktop webviews' @font-face can load them at
        # /_addons/janki/assets/fonts/… (see css.lora_face_css). Safe/no-op if the
        # API is missing.
        try:
            mw.addonManager.setWebExports(__name__, r"assets/fonts/.*\.(ttf|otf)$")
        except Exception as _we_exc:
            log("web exports: %s" % _we_exc)

        # Native Qt menus (menu bar dropdowns, context menus) aren't webviews, so
        # the webview @font-face never reached them — on Windows/Linux they kept the
        # default UI font. Register the bundled Lora with Qt and apply the chosen UI
        # font to native menus so they match the rest of the chrome.
        try:
            css.apply_native_ui_font()
        except Exception as _nf_exc:
            log("native ui font: %s" % _nf_exc)

        _bt.mark("web exports + native UI font")
        settings = QAction("Janki: Settings…", mw)
        settings.triggered.connect(lambda: settings_dialog._open_settings())
        mw.form.menuTools.addAction(settings)


        # Practice questions are bound to Tab+Q, handled by the global key tap
        # (src/util/keytap.py, keycode 12) so it rides the Tab modifier like the
        # other reviewer binds — each press asks the next related question for the
        # current card. Import + bank management live in Settings → Practice.
        # (Requires global keys / Accessibility permission to be enabled.)

        # Lockdown / kiosk focus mode (macOS) is a manual toggle reachable from the
        # menu-bar (tray) icon and Cmd+Ctrl+L — kept off the Tools menu so it isn't
        # a second "Janki:" entry next to Settings. Exit by holding Space.

        # Diagnostic helpers kept available programmatically, but off the menu.
        mw._glass_diagnose = diagnostics.glass_diagnose_live
        mw._amboss_diagnose = amboss._amboss_diagnose

        # TEMP: breadcrumb for the intermittent "lost focus" — logs window/app focus
        # changes + Focus-Mode toggles (with trigger) to ~/Library/Logs/janki-focus.log.
        try:
            diagnostics.install_focus_watch()
        except Exception as _fw:
            log("focus-watch install: %s" % _fw)

        _bt.mark("menu + focus watch")
        # Keep the Janki Practice note type's CSS/template current so styling fixes
        # reach already-converted decks on launch (no manual re-convert needed).
        # Deferred off the launch path (it can cost ~0.5s when the note type needs a
        # rewrite) — nothing needs the Practice template in the first seconds.
        def _deferred_practice_sync():
            try:
                from .src.integrations import qbank
                qbank.sync_practice_model_if_present()
            except Exception as _qb_exc:
                log("practice model sync: %s" % _qb_exc)
        QTimer.singleShot(3000, _deferred_practice_sync)

        _bt.mark("practice note type sync")
        # Intersperse practice questions into normal review sessions (wraps the
        # reviewer + registers its hooks; all behaviour gated behind the
        # intersperse_enabled config). Reset per-session tracking on each open.
        try:
            intersperse.install()
            intersperse.reset_session()
        except Exception as _int_exc:
            log("intersperse install: %s" % _int_exc)

        # Undo (Ctrl+Z) steps back through the Tab+R reword cycle; installed AFTER
        # intersperse so it wraps outermost and chains to the real undo.
        try:
            reword.install_undo_hook()
        except Exception as _rw_undo_exc:
            log("reword undo hook: %s" % _rw_undo_exc)

        # Bottom-left "Original/Reworded" toggle button posts a pycmd we handle here.
        try:
            gui_hooks.webview_did_receive_js_message.append(reword.on_js_message)
        except Exception as _rw_js_exc:
            log("reword js hook: %s" % _rw_js_exc)

        # Keep bank names in sync when a Practice deck is renamed in the main window.
        # Only reconcile on deck-affecting operations (not every card answer).
        try:
            if hasattr(gui_hooks, "operation_did_execute") and not getattr(
                    mw, "_janki_bank_reconcile_hooked", False):
                from .src.integrations import qbank as _qb_rec

                def _janki_reconcile_banks(changes, handler):
                    try:
                        if getattr(changes, "deck", False):
                            _qb_rec.reconcile_names()
                    except Exception:
                        pass

                gui_hooks.operation_did_execute.append(_janki_reconcile_banks)
                mw._janki_bank_reconcile_hooked = True
        except Exception as _rec_exc:
            log("bank reconcile hook: %s" % _rec_exc)

        _bt.mark("intersperse + reword hooks + bank reconcile")
        # In-app updater: throttled once-a-day background check on launch (Janki
        # isn't on AnkiWeb, so this replaces manual GitHub reinstalls). The manual
        # "Check for updates now" trigger lives in Janki: Settings… → General.
        try:
            updater.maybe_auto_check()
        except Exception as _up_exc:
            log("updater: %s" % _up_exc)

        _bt.mark("updater check")
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

        # Lockdown toggle hotkey: Cmd+Ctrl+L (exit by holding Space). Also
        # create the manager now so its CGEventTap signal handlers are live —
        # the backtick+Delete chord can then engage lockdown before any manual
        # toggle (requires global keys / the key tap to be running).
        if sys.platform == "darwin":
            lockdown._get()
            _lock_sc = QShortcut(QKeySequence("Ctrl+Meta+L"), mw)
            _lock_sc.setContext(Qt.ShortcutContext.ApplicationShortcut)
            _lock_sc.activated.connect(lambda: lockdown.toggle())
            mw._janki_lock_sc = _lock_sc   # keep ref alive

        # Window size: restore whatever it was last closed at (saved on quit by
        # _save_size). On the FIRST launch (nothing saved yet) fall back to the
        # configured default (open_win_width/height, 600x400). Clamped to screen.
        def _restore_size():
            try:
                c = _cfg()
                w = int(c.get("last_win_w", 0) or 0)
                h = int(c.get("last_win_h", 0) or 0)
                saved = (w > 0 and h > 0)
                if not saved:                              # first launch → default
                    w = int(c.get("open_win_width", 600) or 600)
                    h = int(c.get("open_win_height", 400) or 400)
                scr = mw.screen() if hasattr(mw, "screen") else None
                avail = scr.availableGeometry() if scr else None
                if avail is not None:
                    w = max(480, min(w, avail.width()))
                    h = max(300, min(h, avail.height()))
                mw.resize(w, h)
                # Restore the last position too (clamped so it can't land off-screen
                # if the display setup changed). Only when we have a saved geometry.
                if saved and c.get("last_win_x") is not None and c.get("last_win_y") is not None:
                    x = int(c.get("last_win_x")); y = int(c.get("last_win_y"))
                    if avail is not None:
                        x = max(avail.x(), min(x, avail.x() + avail.width() - 120))
                        y = max(avail.y(), min(y, avail.y() + avail.height() - 80))
                    mw.move(x, y)
                # Re-apply fullscreen/maximized LAST, on top of the normal geometry
                # above (so exiting fullscreen returns to the saved windowed size).
                # Without this the window always reopened windowed even if it was
                # closed fullscreen/maximized.
                if c.get("last_win_fs"):
                    mw.showFullScreen()
                elif c.get("last_win_max"):
                    mw.showMaximized()
            except Exception as _e:
                log("win geom restore: %s" % _e)
        QTimer.singleShot(300, _restore_size)

        def _save_size():
            # Remember the current window geometry + fullscreen/maximized state so
            # the next launch reopens exactly as left. Skipped while hidden (closed
            # to the tray) — the tray persists the true state before hiding, and a
            # hidden window reports neither fullscreen nor a useful size.
            try:
                if not mw.isVisible():
                    return
                fs = bool(mw.isFullScreen())
                mx = bool(mw.isMaximized())
                cur = mw.addonManager.getConfig(__name__) or {}
                cur["last_win_fs"] = fs
                cur["last_win_max"] = mx
                if not (fs or mx or mw.isMinimized()):     # keep last NORMAL geometry
                    cur["last_win_w"] = int(mw.width())
                    cur["last_win_h"] = int(mw.height())
                    p = mw.pos()
                    cur["last_win_x"] = int(p.x())
                    cur["last_win_y"] = int(p.y())
                mw.addonManager.writeConfig(__name__, cur)
            except Exception as _e:
                log("win geom save: %s" % _e)
        try:
            mw.app.aboutToQuit.connect(_save_size)
        except Exception:
            pass

        _bt.mark("shortcuts, lockdown, window geometry")
        try:
            if tray._tray_should_show():
                tray._apply_tray(True)
            tray.start_to_tray_if_wanted()   # "open to tray on login" → start hidden
        except Exception as _tray_exc:
            log("tray apply: %s" % _tray_exc)

        _bt.mark("tray")
        # Global Tab+Z/X/C/V/Space passthrough is always on (no longer a setting). The
        # key tap is macOS-only and needs Accessibility permission.
        keytap._apply_global_keys(True)
        _bt.mark("global keys")

        # Gamepad poller DISABLED (GameController is focus-gated — can't read the
        # pad while Anki is backgrounded, so it only double-fires with Contanki).
        # _start_gamepad_poll()
        # Focus-INDEPENDENT controller via IOKit HID — the real path for driving
        # Anki from a controller in caption mode while another app is focused.
        # Opt-in (config hid_controller) + needs Input Monitoring permission.
        gamepad._start_hid_monitor()
        _bt.mark("gamepad HID monitor")

        # Pre-compile the reword helper + warm the on-device model in the background so the
        # first rephrase isn't slowed by the build + cold-start.
        try:
            reword.warm_up()
        except Exception:
            pass
        _bt.mark("reword warm-up")

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
        glass.install_glass_tooltips()     # hover tooltips get the rounded glass too

        # Warn once at launch (and on live theme changes) if Anki is in Light
        # appearance mode — the glass theme expects Dark. Delayed so it lands
        # after the window/tooltip machinery is ready.
        QTimer.singleShot(2500, _warn_if_light_mode)
        if hasattr(gui_hooks, "theme_did_change"):
            gui_hooks.theme_did_change.append(_warn_if_light_mode)

        # Quit cleanly: tear down the floating coherence HUD / XP bar when the
        # main window closes, so closing Anki (red button) quits everything
        # instead of leaving those windows keeping the app alive.
        try:
            mw.app.aboutToQuit.connect(tray._teardown_glass_windows)
        except Exception:
            pass

        # Safety: never leave the Dock/menu bar hidden if Anki quits while locked.
        try:
            mw.app.aboutToQuit.connect(lockdown.unlock_if_locked)
        except Exception:
            pass

        _bt.mark("cursor/focus tracking, pomodoro, tooltip")
        # Keep coherence HUD in sync with reviewer state changes.
        # _remote_active gates the 8bitdo focus-bypass: on while a card is up.
        # Last question content hash we FADED underlines for — so a re-render of the
        # same card shows them instantly instead of re-fading (flicker).
        _QA_FADE_LAST = {"qh": None}
        # Inject the Focus-Mode trailing-trim INTO the card HTML (runs before first
        # paint) so trimming dead space doesn't visibly reflow the card after it shows.
        if hasattr(gui_hooks, 'card_will_show'):
            # Force the practice "Show original slide" button to the minimal reword-toggle look
            # LIVE (its JS/CSS lives in the note-type template, which can lag behind the add-on;
            # injecting here reaches every card render regardless). Harmless when no such button.
            _SLIDE_BTN_STYLE = (
                "<style>body .jp-slide-btn,button.jp-slide-btn{"
                "font-size:11px !important;"
                "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif !important;}"
                "</style>")

            def _card_will_show(text, card, kind):
                try:
                    if isinstance(kind, str) and "review" in kind.lower():
                        # Reword is a DISPLAY-ONLY swap (same card data-space, no
                        # scheduler impact); no-op unless enabled + a variant exists.
                        text = reword.apply(text, card, kind)
                        return text + focus.FOCUS_TRIM_SCRIPT + _SLIDE_BTN_STYLE
                except Exception:
                    pass
                return text
            gui_hooks.card_will_show.append(_card_will_show)
        if hasattr(gui_hooks, 'reviewer_did_show_question'):
            def _on_show_question(_r):
                state._remote_active = True
                hud.caption_practice_gate()   # disable caption on practice cards
                hud._coherence_refresh()
                css._apply_text_contrast()    # rescue near-black text on dark/OLED bg
                css._sync_reviewer_fs()       # Edit/More only in fullscreen
                focus._apply_card_zoom()      # re-assert card zoom on the new card
                focus.reassert_chrome_hidden()  # Anki re-shows the toolbar per card
                focus._focus_position_card()  # centre the question (Focus Mode)
                amboss._start_amboss_size_watch()   # widen window while previews are up
                # Show term underlines (all modes). Fade them in on a genuinely new
                # question, but INSTANTLY when this is a re-render of the same card
                # (e.g. AMBOSS re-set the content to mark terms) so the underlined
                # words don't fade a second time (flicker). Dedup on the question's
                # content hash — a real new card differs; intervening cards reset it.
                _dup = False
                try:
                    _qh = hash(_r.card.question())
                    _dup = (_qh == _QA_FADE_LAST.get("qh"))
                    _QA_FADE_LAST["qh"] = _qh
                except Exception:
                    pass
                amboss._apply_amboss_underlines(front=not _dup)
                try:
                    from .src.integrations import qbank
                    qbank.apply_practice_prefs()   # click-to-flip + back show/hide defaults
                    qbank.sync_contanki_for_card() # suspend Contanki on remote practice cards
                    qbank.sync_practice_bottom()   # question side: restore native buttons
                    qbank.cleanup_slide_button_if_not_practice()  # drop stale slide btn
                    qbank.enforce_slide_btn_style()  # minimal reword-toggle look, live
                except Exception:
                    pass
                if pomodoro._pomo_instance:
                    pomodoro._pomo_instance.enter_review()
                try:
                    reword.prefetch_upcoming()   # background-generate rewords ahead of time
                except Exception:
                    pass
            gui_hooks.reviewer_did_show_question.append(_on_show_question)
        if hasattr(gui_hooks, 'reviewer_did_show_answer'):
            def _on_show_answer(_r):
                state._remote_active = True
                hud.caption_practice_gate()   # keep caption off on the practice back
                hud._coherence_refresh()
                css._apply_text_contrast()    # rescue near-black text on dark/OLED bg
                css._sync_reviewer_fs()       # Edit/More only in fullscreen
                focus.reassert_chrome_hidden()  # Anki re-shows the toolbar per card
                focus._focus_position_card()  # anchor back to question top (Focus Mode)
                amboss._apply_amboss_underlines(front=False)  # back: no fade, instant
                try:
                    from .src.integrations import qbank
                    qbank.sync_contanki_for_card()  # keep Contanki suspended on the back
                    qbank.sync_practice_bottom()    # hide native ease buttons (binary grade)
                    qbank.cleanup_slide_button_if_not_practice()  # drop stale slide btn
                    qbank.enforce_slide_btn_style()  # minimal reword-toggle look, live
                except Exception:
                    pass
            gui_hooks.reviewer_did_show_answer.append(_on_show_answer)

        # Practice hub: a light-green "Practice" toolbar link (next to Sync) that opens
        # the question-bank deck list, and a filter that keeps those banks OUT of the
        # main deck list (they live under the Practice button instead).
        try:
            from .src.features import practice as _practice
            if hasattr(gui_hooks, "top_toolbar_did_init_links"):
                gui_hooks.top_toolbar_did_init_links.append(_practice.install_practice_toolbar)
            if hasattr(gui_hooks, "deck_browser_will_render_content"):
                gui_hooks.deck_browser_will_render_content.append(_practice.hide_practice_rows)
            # The toolbar already drew during main-window init (before this hook
            # registered), so redraw it now to pick up the Practice link. Same for the
            # deck browser if it's the current screen.
            try:
                if getattr(mw, "toolbar", None):
                    mw.toolbar.draw()
            except Exception:
                pass
            try:
                if getattr(mw, "deckBrowser", None) and getattr(mw, "state", None) == "deckBrowser":
                    mw.deckBrowser.refresh()
            except Exception:
                pass
        except Exception:
            pass

        _bt.mark("reviewer hooks + practice toolbar/deck redraw")
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
                    try:
                        from .src.integrations import qbank
                        qbank.resume_contanki()  # never leave Contanki suspended off-reviewer
                    except Exception:
                        pass
                    hud.caption_practice_gate()  # restore caption when leaving practice
                if pomodoro._pomo_instance and new_state != 'review':
                    pomodoro._pomo_instance.leave_review()
                if new_state == 'overview' or (
                        old_state == 'review' and new_state == 'deckBrowser'):
                    hud._arm_menu_fade()
                try:
                    glass.refresh_bg_blur()  # toggle text-only photo blur on/off review
                except Exception:
                    pass
            gui_hooks.state_did_change.append(_on_state_change)

        # NOTE: do NOT arm the fade at startup. The initial token (1) already
        # differs from the empty sessionStorage, so the first menu fades once on
        # its own. Bumping the token here would fire a *second* fade on the next
        # re-render of that same screen.

        _bt.mark("state hooks")
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
            # the first ~1s so it doesn't read as a flicker. SKIP it if the user is
            # already reviewing by then: reloading mw.web re-renders the current card
            # and replays its typewriter reveal (a "double-load" of the first card).
            # The reviewer already injected its glass CSS on render, so it's not
            # needed there anyway.
            def _delayed_glass_reload():
                try:
                    if getattr(mw, "state", None) == "review":
                        return
                except Exception:
                    pass
                glass._reload_all_webviews()
            QTimer.singleShot(2600, _delayed_glass_reload)
            QTimer.singleShot(1000, glass._sync_oled)  # in case we start full-screen
            # Crash-guard: we've reached the add-on, so aqt init + window creation
            # (where the injected glass setup runs) survived. Give the first paint
            # a moment, then clear the "pending" sentinel so the guard leaves glass
            # on. If a launch dies before this, the next start rolls glass back.
            QTimer.singleShot(4000, stock_selfheal.confirm_glass_ok)

        _bt.mark("glass setup")
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
            log("inactive (not started via AnkiGlass; no ANKI_GLASS).")
        _bt.mark("fullscreen watcher, card timer, AMBOSS frost → _startup done")
        _bt.startup_done()
    except Exception as exc:
        _bt.mark("startup error")
        _bt.startup_done()
        log(f"startup error: {exc}")
        # Always persist the full traceback (independent of JANKI_DEBUG) so a
        # startup abort — which also silently skips the glass/tray setup below the
        # failure point — can actually be diagnosed.
        try:
            import os, traceback, datetime
            p = os.path.expanduser("~/Library/Logs/janki-startup.log")
            with open(p, "a", encoding="utf-8") as f:
                f.write("\n=== %s ===\n%s\n"
                        % (datetime.datetime.now().isoformat(),
                           traceback.format_exc()))
        except Exception:
            pass


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
_bt.mark("imported lectures → janki import done")
_bt.arm_first_render()
