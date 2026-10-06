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

import os
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
from .src.util.config import log, ACTIVE, GLASS, _cfg, _cfg_raw
from .src.util import state
_bt.mark("imported util")
from .src.features import card_timer, focus, lockdown, pomodoro, intersperse, reword
try:
    from .src.features import coach as _coach   # registers the tour-deck leftover sweep
except Exception:
    pass
_bt.mark("imported features")
from .src.user import css, glass, hud
_bt.mark("imported css/glass/hud")
from .src.system import settings_dialog, tray
_bt.mark("imported settings/tray")
from .src.util import diagnostics, keytap
from .src.integrations import gamepad
from .src.integrations import amboss, mobilecards
from .src.system import stock_selfheal, updater

# macOS glass: patch now, while Anki's window and collection don't exist yet, so a fresh
# patch is picked up by re-running Anki in place — installing needs only the one restart
# Anki itself asks for. (_startup calls it again as the usual self-heal fallback.)
if sys.platform == "darwin" and not os.environ.get("ANKI_GLASS"):
    try:
        stock_selfheal.maybe_self_heal(early=True)
    except Exception as _early_sh_exc:
        log("early self-heal: %s" % _early_sh_exc)
_bt.mark("imported integrations/updater")

# Catch Anki's own progress window + hover tooltips from the very start — the launch
# sync's "Syncing…" window appears before main_window_did_init (_startup) runs.
try:
    glass.install_anki_dialog_glass()
    glass.install_glass_tooltips()
except Exception as _gl_exc:
    log("early glass hooks: %s" % _gl_exc)

# .jank / .qb / .rp opened from Finder (Open With → Anki) go to Janki's importers.
try:
    from .src.features import file_open as _file_open
    _file_open.install()
except Exception as _fo_exc:
    log("file open: %s" % _fo_exc)

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
    # on Windows the pill gets a DWM backdrop; elsewhere keep Anki's stock tooltip.
    if sys.platform != "darwin" and not sys.platform.startswith("win"):
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


def _force_dark_mode():
    """Janki's glass is built for Dark mode (light pages over the dark tint look
    wrong), so switch Anki's Theme to Dark at startup — the same setting as
    Preferences ▸ Appearance ▸ Theme. Picking Light later in a session isn't fought
    (the light-mode tooltip still explains why); it's re-applied next launch. Opt out
    with config "force_dark_mode": false."""
    try:
        if not _cfg().get("force_dark_mode", True):
            return
        from aqt.theme import theme_manager, Theme
        if getattr(theme_manager, "night_mode", True):
            return
        mw.set_theme(Theme.DARK)
        glass.on_theme_changed()          # keep the toolbar strip glass (no black bar)
        if state.first_run():
            return                        # first launch: switch silently, no extra note
        from aqt.utils import tooltip
        QTimer.singleShot(1200, lambda: tooltip(
            "Janki switched Anki to Dark mode — its glass theme is built for it.",
            period=4000))
    except Exception as exc:
        log("force dark mode: %s" % exc)


def _mark_onboarded():
    try:
        c = _cfg_raw()
        if not c.get("onboarded", False):
            c["onboarded"] = True
            mw.addonManager.writeConfig(__name__, c)
    except Exception:
        pass


def _startup():
    _bt.mark("main window ready → _startup begins")
    _force_dark_mode()
    if state.first_run():
        # One guided "Welcome to Janki" setup instead of scattered prompts — after the
        # glass has loaded; if a glass restart is pending it waits for the next launch.
        def _welcome():
            try:
                if stock_selfheal.restart_pending:
                    return
                if state.claim_prompt("onboarding"):
                    from .src.features import onboarding
                    onboarding.show()
            except Exception as _ob_exc:
                log("onboarding: %s" % _ob_exc)
                _mark_onboarded()
        QTimer.singleShot(5500, _welcome)
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
        # Optional top-right gear → Settings (Appearance → Window). Deferred so the
        # toolbar webview has its final size.
        def _gear():
            try:
                from .src.features import settings_button
                settings_button.apply()
            except Exception as _gb_exc:
                log("settings button: %s" % _gb_exc)
        QTimer.singleShot(800, _gear)


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
            try:
                qbank.clean_stored_tags()   # repair quote/bracket-damaged bank tags (no-op once clean)
            except Exception as _ct_exc:
                log("bank tag repair: %s" % _ct_exc)
            try:
                if qbank.content_tags_missing():   # first run / banks from an older Janki
                    qbank.assign_content_tags()
            except Exception as _cn_exc:
                log("content tags: %s" % _cn_exc)
            # (The similar-card "borrow" index is built on first need during reviews —
            # qbank._ensure_borrow_index — not here: it held ~180 MB from launch.)
            try:
                mobilecards.refresh_if_stale()   # push card-script fixes to mobile themes
            except Exception as _mc_exc:
                log("mobile theme refresh: %s" % _mc_exc)
            try:
                qbank.install_bank_sync()   # deleting a bank's cards removes the bank
            except Exception as _bs_exc:
                log("bank sync install: %s" % _bs_exc)
        QTimer.singleShot(3000, _deferred_practice_sync)
        # after launch's background work (calendar matching, tray, sounds) settles,
        # give the freed memory back to macOS
        from .src.util import memory as _mem
        QTimer.singleShot(10000, lambda: _mem.relieve("launch"))

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
            gui_hooks.webview_did_receive_js_message.append(intersperse.on_js_message)
        except Exception as _pq_js_exc:
            log("practice button js hook: %s" % _pq_js_exc)
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

        # Open Janki Settings: ⌘⌥S (Mac) / Ctrl+Alt+S (Windows); rebindable in Hotkeys.
        _set_sc = QShortcut(QKeySequence("Ctrl+Alt+S"), mw)
        _set_sc.setContext(Qt.ShortcutContext.ApplicationShortcut)
        _set_sc.activated.connect(lambda: settings_dialog._open_settings())
        mw._janki_settings_sc = _set_sc
        # ⌘S / Ctrl+S also opens Janki Settings (main window only; Anki has no ⌘S there).
        _set_sc2 = QShortcut(QKeySequence("Ctrl+S"), mw)
        _set_sc2.setContext(Qt.ShortcutContext.WindowShortcut)
        _set_sc2.activated.connect(lambda: settings_dialog._open_settings())
        mw._janki_settings_sc2 = _set_sc2
        # ⌘O / Ctrl+O: study the last deck straight away (same as Tab+O).
        _open_sc = QShortcut(QKeySequence("Ctrl+O"), mw)
        _open_sc.setContext(Qt.ShortcutContext.WindowShortcut)
        _open_sc.activated.connect(lambda: focus._open_last_deck())
        mw._janki_open_last_sc = _open_sc

        # ⌘B / Ctrl+B: back one step — Stats → close; review/overview → the deck list,
        # or the Practice view when studying a question bank; Practice view → Decks.
        _back_sc = QShortcut(QKeySequence("Ctrl+B"), mw)
        _back_sc.setContext(Qt.ShortcutContext.WindowShortcut)
        _back_sc.activated.connect(lambda: _go_back())
        mw._janki_back_sc = _back_sc
        # ⌘D / Ctrl+D: straight to the Decks list from anywhere in the main window
        # (Anki only uses ⌘D in the Add window / Browser).
        _decks_sc = QShortcut(QKeySequence("Ctrl+D"), mw)
        _decks_sc.setContext(Qt.ShortcutContext.WindowShortcut)
        _decks_sc.activated.connect(lambda: _go_decks())
        mw._janki_decks_sc = _decks_sc
        # ⌘G / Ctrl+G: open the Practice view.
        _prac_sc = QShortcut(QKeySequence("Ctrl+G"), mw)
        _prac_sc.setContext(Qt.ShortcutContext.WindowShortcut)
        _prac_sc.activated.connect(lambda: _go_practice())
        mw._janki_practice_sc = _prac_sc
        # ⌘L / Ctrl+L: the Load today's lectures wizard.
        _lec_sc = QShortcut(QKeySequence("Ctrl+L"), mw)
        _lec_sc.setContext(Qt.ShortcutContext.WindowShortcut)

        def _open_lectures():
            try:
                from .src.integrations import lectures as _lec
                _lec.run_today(interactive=True)
            except Exception as e:
                log("lectures shortcut: %s" % e)
        _lec_sc.activated.connect(_open_lectures)
        mw._janki_lectures_sc = _lec_sc

        # Lockdown toggle hotkey: Cmd+Ctrl+L (exit by holding Space). Also
        # create the manager now so its CGEventTap signal handlers are live —
        # the backtick+Delete chord can then engage lockdown before any manual
        # toggle (requires global keys / the key tap to be running).
        if sys.platform == "darwin" or sys.platform.startswith("win"):
            lockdown._get()
            _lock_sc = QShortcut(QKeySequence("Ctrl+Meta+L"), mw)
            _lock_sc.setContext(Qt.ShortcutContext.ApplicationShortcut)
            _lock_sc.activated.connect(lambda: lockdown.toggle())
            mw._janki_lock_sc = _lock_sc   # keep ref alive

        # Apply the user's hotkey choices (Settings → Hotkeys) to the key tap tables
        # and the Qt shortcuts just created.
        try:
            from .src.util import hotkeys as _hotkeys
            _hotkeys.apply()
        except Exception as _hk_exc:
            log("hotkeys apply: %s" % _hk_exc)

        # Window size: restore whatever it was last closed at (saved on quit by
        # _save_size). On the FIRST launch (nothing saved yet) fall back to the
        # configured default (open_win_width/height, 600x400). Clamped to screen.
        def _restore_size():
            # Anki's own restoreGeometry brings the saved FULLSCREEN state back too —
            # open windowed instead (then apply the saved normal size below).
            try:
                if mw.isFullScreen():
                    mw.showNormal()
            except Exception:
                pass
            try:
                c = _cfg()
                w = int(c.get("last_win_w", 0) or 0)
                h = int(c.get("last_win_h", 0) or 0)
                saved = (w > 0 and h > 0)
                scr = mw.screen() if hasattr(mw, "screen") else None
                avail = scr.availableGeometry() if scr else None
                resized_up = False
                # Closed in fullscreen: don't trust any saved/restored geometry —
                # coming back out of a restored fullscreen left the (frameless)
                # Windows window confused. Open at a sane default, centred.
                closed_fs = bool(c.get("last_win_fs")) and avail is not None
                if closed_fs:
                    w = int(avail.width() * 0.78)
                    h = int(avail.height() * 0.82)
                    resized_up = True
                elif sys.platform.startswith("win") and avail is not None:
                    # Windows' frameless glass chrome (caption buttons, toolbar pill)
                    # needs real room. Treat a saved size that's too small a FRACTION
                    # of the actual screen the same as "nothing saved" and re-default
                    # it — a size chosen on a smaller display (or a stale pre-2.1.6
                    # 600x400) shouldn't leave the chrome cramped forever just because
                    # it was saved once.
                    min_w, min_h = avail.width() * 0.55, avail.height() * 0.55
                    if not saved or w < min_w or h < min_h:
                        w = int(avail.width() * 0.78)
                        h = int(avail.height() * 0.82)
                        resized_up = True
                elif not saved:                             # first launch → default
                    w = int(c.get("open_win_width", 600) or 600)
                    h = int(c.get("open_win_height", 400) or 400)
                if avail is not None:
                    w = max(480, min(w, avail.width()))
                    h = max(300, min(h, avail.height()))
                mw.resize(w, h)
                # Restore the last position too (clamped so it can't land off-screen
                # if the display setup changed). Only when we have a saved geometry
                # AND we didn't just override the size — a position chosen for the
                # old, smaller window could leave most of a bigger one off-screen, so
                # that case centers instead (below).
                if saved and not resized_up and c.get("last_win_x") is not None \
                        and c.get("last_win_y") is not None:
                    x = int(c.get("last_win_x")); y = int(c.get("last_win_y"))
                    if avail is not None:
                        x = max(avail.x(), min(x, avail.x() + avail.width() - 120))
                        y = max(avail.y(), min(y, avail.y() + avail.height() - 80))
                    mw.move(x, y)
                elif resized_up and avail is not None:
                    mw.move(avail.x() + (avail.width() - w) // 2,
                             avail.y() + (avail.height() - h) // 2)
                # Re-apply fullscreen/maximized LAST, on top of the normal geometry
                # above (so exiting fullscreen returns to the saved windowed size).
                # Without this the window always reopened windowed even if it was
                # closed fullscreen/maximized.
                # Never reopen straight into fullscreen (it's easy to have quit from
                # fullscreen / lockdown); open windowed at the saved size instead.
                if c.get("last_win_max") and not c.get("last_win_fs"):
                    mw.showMaximized()
                if closed_fs:                       # forget it: next launch is normal
                    cur = mw.addonManager.getConfig(__name__) or {}
                    cur["last_win_fs"] = False
                    mw.addonManager.writeConfig(__name__, cur)
                if sys.platform.startswith("win"):
                    try:                            # caption buttons / chrome follow
                        from .src.platform.win import chrome as _wch
                        _wch.sync_fullscreen()
                        if _wch._lights is not None:
                            _wch._lights.place()
                    except Exception:
                        pass
            except Exception as _e:
                log("win geom restore: %s" % _e)
        QTimer.singleShot(300, _restore_size)

        def _unfullscreen_late():
            # macOS may finish entering the restored fullscreen after _restore_size.
            try:
                if mw.isFullScreen() and not getattr(mw, "_janki_user_fs", False):
                    mw.showNormal()
            except Exception:
                pass
        if sys.platform == "darwin":            # (a macOS restore quirk only)
            for _d in (1500, 3000):
                QTimer.singleShot(_d, _unfullscreen_late)

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
        # Z/X/C/V as extra Again/Hard/Good/Easy keys in the reviewer (beside 1–4).
        try:
            from .src.features import zxcv
            zxcv.install()
        except Exception as _zx_exc:
            log("zxcv: %s" % _zx_exc)
        # Windows: register .jank / .qb / .rp with Anki once (per-user, no admin), so
        # double-clicking one in Explorer imports it — like Open With on the Mac.
        if sys.platform.startswith("win") and not _cfg().get("win_assoc_done", False):
            try:
                from .src.platform.win import shell as _wsh
                if _wsh.register_file_types():
                    _c = _cfg_raw(); _c["win_assoc_done"] = True
                    mw.addonManager.writeConfig(__name__, _c)
            except Exception as _fa_exc:
                log("file associations: %s" % _fa_exc)

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
            gui_hooks.theme_did_change.append(glass.on_theme_changed)

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
                "font-size:14.5px !important;"
                "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif !important;}"
                "</style>")

            # The reword control bar (#jk-rw-bar) arrives inside #qa, but Focus Mode moves
            # #qa with a CSS transform — and a position:fixed element inside a transformed
            # parent is pinned to THAT parent, so the bar rode up with the card and then
            # dropped to the bottom. Hoist it onto <body> (keeping #qa's zoom so its size is
            # unchanged) and drop any bar left over from the previous card — this runs for
            # every reviewer card, so cards without rephrasings clean up too.
            _RW_BAR_HOIST = (
                "<script>(function(){try{var qa=document.getElementById('qa');"
                "['jk-rw-bar','jk-pq-bar'].forEach(function(id){"
                "var bars=document.querySelectorAll('#'+id),fresh=null;"
                "for(var i=0;i<bars.length;i++){var b=bars[i];"
                "if(qa&&qa.contains(b))fresh=b;else b.remove();}"
                "if(fresh){var z=qa?(parseFloat(getComputedStyle(qa).zoom)||1):1;"
                "fresh.style.zoom=z;document.body.appendChild(fresh);}});"
                "}catch(e){}})();</script>")

            def _card_will_show(text, card, kind):
                try:
                    if isinstance(kind, str) and "review" in kind.lower():
                        # Reword is a DISPLAY-ONLY swap (same card data-space, no
                        # scheduler impact); no-op unless enabled + a variant exists.
                        text = reword.apply(text, card, kind)
                        try:
                            pq = intersperse.practice_button_html(card)
                        except Exception:
                            pq = ""
                        return (text + focus.FOCUS_TRIM_SCRIPT + _SLIDE_BTN_STYLE
                                + pq + _RW_BAR_HOIST)
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
            # (also registered at import — see _early_practice_hooks — so the FIRST
            # deck list, drawn before _startup, already hides the banks; no double add)
            if hasattr(gui_hooks, "top_toolbar_did_init_links") and \
                    _practice.install_practice_toolbar not in gui_hooks.top_toolbar_did_init_links._hooks:
                gui_hooks.top_toolbar_did_init_links.append(_practice.install_practice_toolbar)
            if hasattr(gui_hooks, "deck_browser_will_render_content") and \
                    _practice.hide_practice_rows not in gui_hooks.deck_browser_will_render_content._hooks:
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
            mw.web.loadFinished.connect(css._congrats_keys)
        except Exception:
            pass

        # XP bar: pause when leaving the reviewer.
        # Menu fade: fade when opening a deck (→ overview) or returning from study.
        if hasattr(gui_hooks, 'state_did_change'):
            def _on_state_change(new_state: str, old_state: str) -> None:
                state._remote_active = (new_state == 'review')
                if new_state == 'review':
                    focus.engage_on_review()        # Focus Mode armed elsewhere → on now
                    try:
                        from .src.integrations import qbank as _qbk
                        _qbk.contanki_for_state('review')   # Contanki back for studying
                    except Exception:
                        pass
                if new_state != 'review':
                    focus._focus_restore_for_nav()
                    amboss._stop_amboss_size_watch()
                    try:
                        from .src.integrations import qbank
                        qbank.resume_contanki()  # never leave Contanki suspended off-reviewer
                        qbank.contanki_for_state(new_state)   # …except for Janki's nav
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
        # Canki: serve this collection to the web reviewer (cjre.pl/ogle/canki).
        # Local-only HTTP API; never uploads anything. Tools → Canki to pair a phone.
        try:
            from .src.integrations import canki_server
            canki_server.install()
        except Exception as _ck_exc:
            log("canki: %s" % _ck_exc)
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
            if sys.platform.startswith("win"):
                from .src.util.config import confirm_win_glass
                from .src.platform.win import preboot as _pb
                def _diag():
                    try:
                        import os as _o, time as _t
                        from aqt.qt import QSurfaceFormat as _Q
                        d = _o.path.join(_o.environ.get("LOCALAPPDATA", ""), "Janki", "Logs")
                        _o.makedirs(d, exist_ok=True)
                        with open(_o.path.join(d, "janki-preboot.log"), "a", encoding="utf-8") as f:
                            f.write("%s add-on: hook_active=%s site=%s no_site=%s exe=%s "
                                    "alpha=%s translucent=%s frameless=%s flags=%r\n" % (
                                _t.strftime("%Y-%m-%d %H:%M:%S"), _pb.active(),
                                "site" in sys.modules, sys.flags.no_site, sys.executable,
                                _Q.defaultFormat().alphaBufferSize(),
                                mw.testAttribute(Qt.WidgetAttribute.WA_TranslucentBackground),
                                bool(mw.windowFlags() & Qt.WindowType.FramelessWindowHint),
                                _o.environ.get("QTWEBENGINE_CHROMIUM_FLAGS")))
                    except Exception as _e:
                        log("preboot diag: %s" % _e)
                QTimer.singleShot(1500, _diag)
                QTimer.singleShot(0, glass._apply_native_glass)
                QTimer.singleShot(4000, confirm_win_glass)
                mw.app.aboutToQuit.connect(confirm_win_glass)   # a clean quit isn't a crash
                # First run: install the pre-launch hook, then one restart turns the
                # see-through glass on (like the Mac self-heal's restart prompt).
                # (Re)install every launch: a new Janki may ship an updated hook, which
                # needs one restart to take effect.
                # Fast (GPU) mode needs no start-up hook — no extra restart after
                # installing. Only See-through needs it (installed here, one restart).
                _need_restart = False
                if _pb.render_mode() == "software":
                    _need_restart = _pb.install() and (
                        not _pb.active() or _pb.changed or _pb.running_mode() != "software")
                else:
                    if _pb.installed():
                        _pb.uninstall()            # leftover See-through hook
                    _need_restart = _pb.running_mode() == "software"   # leave software mode
                if _need_restart and state.claim_prompt("win-render"):
                    def _ask_restart():
                        from aqt.utils import askUser
                        if askUser("Restart Anki now to switch Janki's Windows rendering "
                                   "mode (see-through glass ↔ fast)?", title="Janki"):
                            from .src.platform.win import shell as _wsh
                            # The relaunched Anki inherits OUR environment, which predates
                            # the new user variables — hand them over explicitly.
                            import os as _os   # _startup has a later local `import os`
                            _os.environ.update(_pb._ENV)
                            _wsh.relaunch_after_exit()
                            mw.unloadProfileAndExit()
                    QTimer.singleShot(5000, _ask_restart)
            else:
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

# Overlays sliding over Anki (e.g. WorkMode hot corners) must not reveal the hidden bars.
try:
    from .src.integrations import overlay_leave
    overlay_leave.install()
except Exception as _ol_exc:
    log("overlay_leave failed to install: %s" % _ol_exc)
_bt.mark("imported lectures → janki import done")


def _early_practice_hooks():
    """Keep the Practice banks / AMBOSS tile out of the deck list from the very first
    render. Anki draws the deck list BEFORE main_window_did_init (where _startup used
    to register this), so the first frame showed every bank, then hid them."""
    try:
        from .src.features import practice as _practice
        if hasattr(gui_hooks, "deck_browser_will_render_content"):
            gui_hooks.deck_browser_will_render_content.append(_practice.hide_practice_rows)
        if hasattr(gui_hooks, "top_toolbar_did_init_links"):
            gui_hooks.top_toolbar_did_init_links.append(_practice.install_practice_toolbar)
    except Exception as _e:
        log(f"early practice hooks: {_e}")


_early_practice_hooks()
_bt.arm_first_render()


# Opt-in switch-timing probe (only when user_files/perf_probe exists).
try:
    from .src.util import perf_probe as _perf_probe
    if _perf_probe._ON and hasattr(gui_hooks, "profile_did_open"):
        from aqt.qt import QTimer as _PQT
        gui_hooks.profile_did_open.append(lambda: _PQT.singleShot(4000, _perf_probe.install))
except Exception:
    pass


# Keyboard deck navigation needs the deck list focused; after a toolbar click the
# focus stays in the toolbar web view, so arrows/Space went nowhere.
def _focus_deck_list(*_a):
    try:
        from aqt.qt import QApplication, QTimer
        def _go():
            fw = QApplication.focusWidget()
            # only within the main window, and never away from a native text field
            if QApplication.activeWindow() is not mw or \
                    getattr(mw, "state", None) not in ("deckBrowser", "overview"):
                return
            if fw is not None and (fw.inherits("QLineEdit") or fw.inherits("QTextEdit")
                                   or fw.inherits("QPlainTextEdit")):
                return
            mw.web.setFocus()
        QTimer.singleShot(0, _go)
    except Exception:
        pass


try:
    gui_hooks.deck_browser_did_render.append(_focus_deck_list)
    gui_hooks.overview_did_refresh.append(_focus_deck_list)
except Exception:
    pass


def _refocus_after_load(*_a):
    # The render hooks fire before the new page exists; a focus set then can be lost
    # when the page swaps in (keys then "sometimes" did nothing). Re-take it on load —
    # unless the keyboard is deliberately on the toolbar.
    try:
        if mw.toolbar.web.hasFocus() or mw.toolbar.web.focusProxy() and \
                mw.toolbar.web.focusProxy().hasFocus():
            return
    except Exception:
        pass
    _focus_deck_list()


def _hook_web_load():
    try:
        mw.web.loadFinished.connect(_refocus_after_load)
    except Exception:
        pass


try:
    gui_hooks.main_window_did_init.append(_hook_web_load)
except Exception:
    pass


try:
    gui_hooks.webview_did_receive_js_message.append(css.on_js_message)
    gui_hooks.webview_did_receive_js_message.append(focus.on_js_message)   # Focus thaw
except Exception:
    pass


def _sfx(name):
    try:
        from .src.features import sfx as _s
        _s.play(name)
    except Exception:
        pass


def _go_back():
    _sfx("back")
    try:
        from .src.features import practice as _pr, stats_embed as _se
        if _se.is_open():
            _se.fade_close()
            return
        st = getattr(mw, "state", None)
        if st in ("review", "overview"):
            try:
                did = int(mw.col.decks.get_current_id())
            except Exception:
                did = None
            in_bank = did is not None and (did in _pr._practice_dids()
                                           or did in _pr._amboss_dids())
            if st == "review":
                try:
                    focus._focus_restore_for_nav()
                except Exception:
                    pass
            mw.moveToState("deckBrowser")
            if in_bank:
                _pr.open_practice_hub()
            return
        if st == "deckBrowser" and _pr._practice_view:
            h = (getattr(mw.toolbar, "link_handlers", {}) or {}).get("decks")
            if h:
                h()
            else:
                _pr._practice_view = False
                mw.deckBrowser.refresh()
    except Exception as e:
        log("go back: %s" % e)


def _go_decks():
    _sfx("back")
    try:
        from .src.features import calendar_view as _cv
        _cv.close()
    except Exception:
        pass
    try:
        from .src.features import practice as _pr, stats_embed as _se
        if _se.is_open():
            _pr._practice_view = False
            _se.fade_close()
            return
        st = getattr(mw, "state", None)
        if st == "deckBrowser":
            if _pr._practice_view:
                h = (getattr(mw.toolbar, "link_handlers", {}) or {}).get("decks")
                if h:
                    h()
                else:
                    _pr._practice_view = False
                    mw.deckBrowser.refresh()
            return
        _pr._practice_view = False
        if st == "review":
            try:
                focus._focus_restore_for_nav()
            except Exception:
                pass
        # same dip as the toolbar switches: this page fades, the list rises in
        _se.animate_next_deck_render()
        _se.fade_then(lambda: mw.moveToState("deckBrowser"))
    except Exception as e:
        log("go decks: %s" % e)


def _go_practice():
    _sfx("select")
    try:
        from .src.features import practice as _pr
        st = getattr(mw, "state", None)
        if st == "deckBrowser" and _pr._practice_view:
            return
        if st == "review":
            try:
                focus._focus_restore_for_nav()
            except Exception:
                pass
        # open_practice_hub fades the current page and drops the Practice view in
        # (from Stats, the reviewer or the overview alike) — one render, no flash.
        _pr.open_practice_hub()
    except Exception as e:
        log("go practice: %s" % e)


try:
    from .src.features import practice_keys as _practice_keys
    _practice_keys.install()
except Exception:
    pass



# Contanki re-enables itself on profile open and could come back on while a menu is
# up; re-assert the pause whenever a menu screen draws (and just after profile open).
def _contanki_nav_enforce(*_a):
    try:
        from .src.integrations import qbank as _qb
        st = getattr(mw, "state", None)
        if st in ("deckBrowser", "overview"):
            _qb.contanki_for_state(st)
    except Exception:
        pass


try:
    from aqt.qt import QTimer as _CQT
    gui_hooks.deck_browser_did_render.append(_contanki_nav_enforce)
    gui_hooks.overview_did_refresh.append(_contanki_nav_enforce)
    gui_hooks.profile_did_open.append(lambda: _CQT.singleShot(500, _contanki_nav_enforce))
except Exception:
    pass


try:
    from .src.features import sfx as _sfx_mod
    _sfx_mod.install()
except Exception:
    pass



def _native_fullscreen():
    """macOS: is the NSWindow actually fullscreen (styleMask bit 14)? None if unknown."""
    if sys.platform != "darwin":
        return None
    try:
        from ctypes import c_void_p, c_ulong
        from .src.util.bridge import _bridge
        msg, _cls = _bridge()
        ns = msg(c_void_p, c_void_p(int(mw.winId())), b"window")
        if not ns:
            return None
        return bool(msg(c_ulong, ns, b"styleMask") & (1 << 14))
    except Exception:
        return None


def _restore_fullscreen_when_ready(tries=0):
    from aqt.qt import QTimer
    try:
        if not mw.isVisible() or mw.isMinimized():
            if tries < 20:                       # wait (up to ~10 s) for the window
                QTimer.singleShot(500, lambda: _restore_fullscreen_when_ready(tries + 1))
            return
        QTimer.singleShot(400, mw.showFullScreen)   # let the first show settle
        QTimer.singleShot(1800, _resync_fullscreen)
        _reglass_later((2600, 4000))
    except Exception as e:
        log("fs restore: %s" % e)


def _resync_fullscreen():
    """If Qt believes the window is fullscreen but macOS doesn't (a refused
    transition), put Qt back in step so nothing acts as if fullscreen."""
    try:
        nat = _native_fullscreen()
        if nat is False and mw.isFullScreen():
            log("fullscreen out of sync (Qt yes, macOS no) → showNormal")
            mw.showNormal()
            _reglass_later((300, 1000, 2000))       # titlebar glass after the change
    except Exception as e:
        log("fs resync: %s" % e)



def _reglass_later(delays):
    """Re-assert the window glass (transparent titlebar etc.) after a state change —
    a late fullscreen restore could leave the macOS titlebar as a solid band."""
    from aqt.qt import QTimer
    try:
        from .src.user import glass as _g
        for d in delays:
            QTimer.singleShot(d, _g._reapply_native)
    except Exception:
        pass



# Backup for when the global key tap isn't intercepting (e.g. no Accessibility): while
# Tab is held, Anki's single-letter shortcuts (F = create filtered deck, …) must not
# fire underneath a Janki Tab+key chord.
def _install_tab_chord_guard():
    try:
        from aqt.qt import QObject, QEvent, QApplication, Qt as _Q

        class _TabGuard(QObject):
            held = False

            def eventFilter(self, obj, ev):
                t = ev.type()
                if t in (QEvent.Type.KeyPress, QEvent.Type.KeyRelease,
                         QEvent.Type.ShortcutOverride):
                    k = ev.key()
                    if k == _Q.Key.Key_Tab:
                        if t == QEvent.Type.KeyPress:
                            import time as _t
                            _TabGuard.held = _t.monotonic()
                        elif t == QEvent.Type.KeyRelease and not ev.isAutoRepeat():
                            _TabGuard.held = False
                        return False
                    import time as _t2
                    if _TabGuard.held and _t2.monotonic() - _TabGuard.held > 4.0:
                        _TabGuard.held = False       # a lost Tab release can't stick
                    if _TabGuard.held and _Q.Key.Key_A <= k <= _Q.Key.Key_Z \
                            and not (ev.modifiers() & (_Q.KeyboardModifier.ControlModifier
                                                       | _Q.KeyboardModifier.MetaModifier
                                                       | _Q.KeyboardModifier.AltModifier)):
                        if t == QEvent.Type.ShortcutOverride:
                            ev.accept()          # claim it → no Anki shortcut fires
                            return True
                        return True              # and don't type the letter
                return False
        g = _TabGuard(mw)
        QApplication.instance().installEventFilter(g)
        mw._janki_tab_guard = g
    except Exception as e:
        log("tab chord guard: %s" % e)


try:
    gui_hooks.main_window_did_init.append(_install_tab_chord_guard)
except Exception:
    pass



try:
    from .src.features import hotcorner as _hotcorner
    gui_hooks.profile_did_open.append(lambda: _hotcorner.reload())
    try:                                     # tray data cached + refreshed in background
        from .src.system import tray_nav as _tn
        _tn.install_data_cache()
    except Exception:
        pass
    gui_hooks.profile_will_close.append(_hotcorner.shutdown)
except Exception:
    pass



try:
    from .src.features import calendar_view as _calendar_view
    _calendar_view.install()
except Exception:
    pass


# Reopen the main page you were on (Decks / Practice / Calendar) at launch. The page is
# noted on every deck-list render; the first render after the profile opens restores it
# instead (and isn't recorded, so it can't overwrite the saved page with "decks").
_page_restore = {"pending": False}


def _current_main_page():
    try:
        from .src.features import calendar_view as _cv, practice as _pr
        if _cv._view:
            return "calendar"
        if _pr._practice_view:
            return "practice"
    except Exception:
        pass
    return "decks"


def _note_main_page(*_a):
    try:
        if _page_restore["pending"]:
            _page_restore["pending"] = False
            want = str(_cfg().get("last_main_page", "decks"))
            from aqt.qt import QTimer as _RT
            if want == "calendar":
                from .src.features import calendar_view as _cv
                # already in the Calendar (e.g. you went there while the launch sync
                # ran — profile_did_open only fires after it): leave it alone; calling
                # open_calendar from a class page would close that page
                if not _cv._view:
                    _RT.singleShot(0, lambda: _cv._view or _cv.open_calendar())
            elif want == "practice":
                from .src.features import practice as _pr
                _RT.singleShot(0, _pr.open_practice_hub)
            return
        page = _current_main_page()
        if page != _cfg().get("last_main_page", "decks"):
            c = _cfg_raw()
            c["last_main_page"] = page
            mw.addonManager.writeConfig(__name__, c)
    except Exception as e:
        log("main page memory: %s" % e)


def _arm_page_restore():
    _page_restore["pending"] = True


try:
    gui_hooks.profile_did_open.append(_arm_page_restore)
    gui_hooks.deck_browser_did_render.append(_note_main_page)
except Exception:
    pass

