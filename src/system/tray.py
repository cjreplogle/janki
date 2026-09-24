"""System-tray minimize, profile autosave, and glass-window teardown."""

import sys
from aqt import mw
from aqt.qt import QAction, QEvent, QMenu, QObject, Qt, QTimer, QSystemTrayIcon, QIcon

from ..util.config import log, _cfg


def _silhouette_icon():
    """A monochrome white silhouette of the Anki star for the menu-bar instead of
    the full-colour icon. Uses a bundled star-shaped PNG (anki-tray.png) — the macOS
    app icon is a rounded-SQUARE tile, so masking it gave a blob; the bundled star
    has a transparent background so its alpha is the real star shape. Marked as a
    mask so macOS renders it as a template image (adapts: white on the dark menu
    bar). Falls back to the app icon if the asset is missing / off macOS."""
    try:
        import os
        png = os.path.join(os.path.dirname(__file__), "anki-tray.png")
        if sys.platform == "darwin" and os.path.isfile(png):
            ic = QIcon(png)
            ic.setIsMask(True)     # NSImage template → adaptive silhouette
            return ic
    except Exception as e:
        log(f"tray silhouette: {e}")
    return mw.windowIcon()


def _remember_state(prev_state=None) -> None:
    """Record whether the window is fullscreen/maximized right now (or was, per
    `prev_state` from a WindowStateChange) so restoring from the tray can bring it
    back the SAME way. Without this, restore uses showNormal() and a fullscreen
    window comes back as a default-sized window — looking like it 'forgot' its
    position/state."""
    try:
        st = prev_state if prev_state is not None else mw.windowState()
        mw._janki_win_fs = bool(st & Qt.WindowState.WindowFullScreen)
        mw._janki_win_max = bool(st & Qt.WindowState.WindowMaximized)
    except Exception:
        pass


def _persist_geom() -> None:
    """Save geometry + fullscreen/maximized to Janki's own last_win_* config keys
    (the ones __init__._restore_size reads on launch — the SINGLE source of truth,
    since it overrides Anki's native restore). Called while the window is still
    VISIBLE, right before a tray hide, so it captures the true state — a hidden or
    minimized window reports neither fullscreen nor a useful size."""
    try:
        if not mw.isVisible() or mw.isMinimized():
            return
        fs = bool(mw.isFullScreen())
        mx = bool(mw.isMaximized())
        cur = mw.addonManager.getConfig(__name__) or {}
        cur["last_win_fs"] = fs
        cur["last_win_max"] = mx
        if not (fs or mx):
            cur["last_win_w"] = int(mw.width())
            cur["last_win_h"] = int(mw.height())
            p = mw.pos()
            cur["last_win_x"] = int(p.x())
            cur["last_win_y"] = int(p.y())
        mw.addonManager.writeConfig(__name__, cur)
    except Exception as exc:
        log(f"persist geom: {exc}")


def _restore_window() -> None:
    """Bring mw back from the tray in the state it was hidden in (fullscreen /
    maximized / normal), then raise + focus it."""
    try:
        if getattr(mw, "_janki_win_fs", False):
            mw.showFullScreen()
        elif getattr(mw, "_janki_win_max", False):
            mw.showMaximized()
        else:
            mw.showNormal()
        mw.raise_()
        mw.activateWindow()
    except Exception as exc:
        log(f"restore window: {exc}")


_quitting = False


def _quit_from_tray() -> None:
    """Fully exit Anki from the tray. The shutdown fires mw.closeEvent, which the tray
    close-hook/filter would otherwise swallow and turn into a hide (so quitting took two
    clicks). Set _quitting so those interceptors let the real close through this once.
    Geometry was already persisted before any hide (_persist_geom), and _save_size skips
    while hidden, so the saved state isn't clobbered."""
    global _quitting
    _quitting = True
    try:
        mw.app.setQuitOnLastWindowClosed(True)
    except Exception:
        pass
    try:
        mw.unloadProfileAndExit()
    except Exception as exc:
        log(f"tray quit: {exc}")
        _quitting = False
from ..features import focus, lockdown, pomodoro
from ..user import hud
from ..integrations import gamepad

_tray_icon: "QSystemTrayIcon | None" = None
_tray_caption_action: "QAction | None" = None
_tray_focus_action: "QAction | None" = None
_tray_lockdown_action: "QAction | None" = None


def _sync_tray_actions() -> None:
    """Reflect live Caption/Focus state in the menu-bar checkboxes. Called just
    before the menu opens so the ticks are always accurate (the modes can also be
    toggled by hotkey)."""
    try:
        if _tray_caption_action is not None:
            _tray_caption_action.setChecked(hud._caption_visible())
        if _tray_focus_action is not None:
            _tray_focus_action.setChecked(bool(focus._focus_mode_on))
        if _tray_lockdown_action is not None:
            _tray_lockdown_action.setChecked(lockdown.is_locked())
    except Exception:
        pass


def _apply_tray(on: bool) -> None:
    global _tray_icon, _tray_caption_action, _tray_focus_action, _tray_lockdown_action
    if on:
        if _tray_icon is None:
            _tray_icon = QSystemTrayIcon(_silhouette_icon(), mw)
            # macOS: clicking the icon opens the GLASS NAVIGATOR (decks + toggles +
            # open/quit) instead of a native menu — richer, and themed like the main
            # window. No context menu is set, so the click reaches us as a Trigger.
            # Other platforms keep the plain cross-platform QMenu.
            if sys.platform == "darwin":
                _tray_icon.activated.connect(_on_tray_activated)
            else:
                menu = QMenu()
                last_deck_action = QAction("Open last studied deck", mw)
                last_deck_action.triggered.connect(lambda _c=False: focus._open_last_deck())
                menu.addAction(last_deck_action)
                menu.addSeparator()
                restore_action = QAction("Open Anki", mw)
                restore_action.triggered.connect(lambda: _restore_window())
                quit_action = QAction("Quit", mw)
                quit_action.triggered.connect(lambda: _quit_from_tray())
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
        _install_close_hook()   # reliable primary path (event filter is the backup)
        _install_reopen_hook()  # Dock-icon click / ⌘-Tab reopens the hidden window
        # Keep the app alive when the window is hidden/closed ONLY when tray-minimize
        # is on. The tray icon can also be up purely for the mode controls
        # (menubar_controls) — in that case the red-X should behave NATIVELY (close the
        # window and, being the last window, quit the app), so quitOnLastWindowClosed
        # must stay True. Tying it to tray_minimize (not icon presence) is what makes
        # the "show in tray" toggle actually switch between tray and native behaviour.
        # Quitting is always available via ⌘Q / the tray "Quit".
        try:
            mw.app.setQuitOnLastWindowClosed(
                not bool(_cfg().get("tray_minimize", False)))
        except Exception as e:
            log(f"quitOnLastWindowClosed: {e}")
    else:
        if _tray_icon is not None:
            _tray_icon.hide()
        mw.removeEventFilter(_tray_filter)
        try:
            mw.app.setQuitOnLastWindowClosed(True)
        except Exception:
            pass


def _tray_should_show() -> bool:
    """The menu-bar icon (tray menu) appears whenever "Keep running in the tray when the
    window is closed" is on. (The separate "Show menu-bar icon" setting was removed.)"""
    return bool(_cfg().get("tray_minimize", False))


def _on_tray_activated(reason: "QSystemTrayIcon.ActivationReason") -> None:
    if reason in (QSystemTrayIcon.ActivationReason.Trigger,
                  QSystemTrayIcon.ActivationReason.Context):
        # Arm the reopen-suppression FIRST: the click activates the app, which would
        # otherwise trigger the activate→reopen hook and yank the window back. Set it
        # before anything else so it lands no matter the event order.
        suppress_reopen()
        # macOS: open the glass navigator (decks + toggles + open/quit).
        if sys.platform == "darwin":
            try:
                from . import tray_nav
                tray_nav.show_navigator()
                return
            except Exception as e:
                log(f"tray navigator: {e}")
        # Other platforms (or if the navigator failed): just RESTORE on click —
        # never hide. The menu's "Open Anki" / close-to-tray handle hiding.
        if not mw.isVisible() or mw.isMinimized():
            _restore_window()
            try:
                from ..user import glass
                glass._wake_main_webviews()   # repaint the transparent window
            except Exception:
                pass


def _ensure_tray_target() -> None:
    """Guarantee a menu-bar icon exists to restore from before we hide the window.
    Don't rely on QSystemTrayIcon.isVisible() — it reports False on some macOS
    versions even when the item is shown, which used to let the red-X close fall
    through and QUIT Anki instead of minimizing."""
    try:
        if _tray_icon is None:
            _apply_tray(True)
        else:
            _tray_icon.show()
    except Exception as e:
        log(f"ensure tray target: {e}")


def _minimize_to_tray() -> None:
    try:
        _ensure_tray_target()
        _remember_state()
        _persist_geom()
    except Exception as e:
        log(f"tray minimize: {e}")
    try:
        mw.hide()
    except Exception:
        pass


_close_hooked = False
_reopen_hooked = False
_suppress_reopen_until = 0.0


_APP_PATH = "/Applications/Janki.app"
_LAUNCH_BIN = "/Applications/Janki.app/Contents/MacOS/AnkiGlass"
_LOGIN_LABEL = "com.cjreplogle.janki.login"
# The env var the login-launch LaunchAgent sets. Manual double-clicks of Janki.app
# never carry it, so start_to_tray_if_wanted() can tell an auto login launch apart
# from a user opening the app — the latter must ALWAYS show the window.
_LOGIN_ENV = "JANKI_LOGIN_LAUNCH"


def _login_plist_path() -> str:
    import os
    return os.path.expanduser("~/Library/LaunchAgents/%s.plist" % _LOGIN_LABEL)


def set_login_item(enable: bool) -> None:
    """Add/remove Janki as a macOS login item so it comes up (hidden, into the tray)
    at login. Implemented as a per-user LaunchAgent rather than a System Events login
    item so the launch can be TAGGED with an env var (JANKI_LOGIN_LAUNCH=1): that's
    what lets start_to_tray_if_wanted() hide only on a real login launch and never on
    a manual open. No-op off macOS."""
    if sys.platform != "darwin":
        return
    try:
        import os
        import subprocess
        # Migration/cleanup: drop any legacy System Events login item we used before.
        subprocess.run(
            ["osascript", "-e",
             'tell application "System Events" to delete login item "Janki"'],
            capture_output=True)
        plist = _login_plist_path()
        if enable and os.path.isfile(_LAUNCH_BIN):
            os.makedirs(os.path.dirname(plist), exist_ok=True)
            content = (
                '<?xml version="1.0" encoding="UTF-8"?>\n'
                '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" '
                '"http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n'
                '<plist version="1.0">\n<dict>\n'
                '  <key>Label</key><string>%s</string>\n'
                '  <key>ProgramArguments</key>\n  <array><string>%s</string></array>\n'
                '  <key>EnvironmentVariables</key>\n'
                '  <dict><key>%s</key><string>1</string></dict>\n'
                '  <key>RunAtLoad</key><true/>\n'
                '</dict>\n</plist>\n'
                % (_LOGIN_LABEL, _LAUNCH_BIN, _LOGIN_ENV))
            with open(plist, "w", encoding="utf-8") as f:
                f.write(content)
            # Don't `launchctl load` now — that would immediately launch a 2nd copy.
            # launchd auto-loads ~/Library/LaunchAgents at the next login (RunAtLoad).
        else:
            try:
                subprocess.run(["launchctl", "unload", plist], capture_output=True)
            except Exception:
                pass
            try:
                if os.path.isfile(plist):
                    os.remove(plist)
            except Exception:
                pass
    except Exception as e:
        log(f"login item: {e}")


def start_to_tray_if_wanted() -> None:
    """If 'open to tray on login' is set AND this launch was the auto login launch
    (tagged JANKI_LOGIN_LAUNCH=1 by the LaunchAgent), bring Janki up minimized to the
    tray: ensure the icon exists, then hide the window a beat after init. A manual
    double-click of Janki.app carries no such tag, so the window shows normally."""
    if sys.platform != "darwin":
        return
    import os
    if not _cfg().get("open_to_tray_on_login", False):
        return
    if os.environ.get(_LOGIN_ENV) != "1":
        return
    try:
        _ensure_tray_target()
        # Keep the app alive when we hide the only window on launch (even if plain
        # tray-minimize is off) — otherwise quitOnLastWindowClosed would quit it.
        try:
            mw.app.setQuitOnLastWindowClosed(False)
        except Exception:
            pass

        def _go():
            try:
                if mw.isVisible():
                    _minimize_to_tray()
            except Exception as e:
                log(f"start-to-tray: {e}")
        QTimer.singleShot(600, _go)
        QTimer.singleShot(1500, _go)   # again, after any late show
    except Exception as e:
        log(f"start-to-tray init: {e}")


def suppress_reopen(secs: float = 1.2) -> None:
    """Briefly stop the activate → reopen-window hook. Clicking the menu-bar icon
    activates the app, which would otherwise yank the hidden window back onto the
    screen — but the icon click should only open the tray navigator, not the window."""
    global _suppress_reopen_until
    import time
    _suppress_reopen_until = time.time() + secs


def _do_reopen() -> None:
    """Restore + repaint the hidden main window."""
    try:
        if mw.isVisible():
            return
        _restore_window()
        try:
            from ..user import glass
            glass._wake_main_webviews()   # repaint the transparent window
        except Exception:
            pass
    except Exception as e:
        log(f"reopen: {e}")


def _install_reopen_hook() -> None:
    """Reopen the hidden window when the app is activated (Dock icon / ⌘-Tab).

    On macOS the menu-bar icon click ALSO activates the app, and we don't want that
    to restore the window (it should only open the tray navigator). Rather than
    disable reopen entirely (which broke the Dock-icon reopen), we DEFER the restore
    briefly and skip it if reopen-suppression got armed in the meantime. A menu-bar
    click arms suppress_reopen() in _on_tray_activated, so it's skipped; a Dock/⌘-Tab
    activation arms nothing, so it restores. The small delay also removes the ordering
    race between the tray `activated` signal and applicationStateChanged."""
    global _reopen_hooked
    if _reopen_hooked:
        return
    try:
        import time

        def _on_state(st):
            try:
                if st != Qt.ApplicationState.ApplicationActive or mw.isVisible():
                    return
                if sys.platform == "darwin":
                    # Let a possible menu-bar-icon click arm suppression first, then
                    # re-check before restoring.
                    def _maybe():
                        if mw.isVisible():
                            return
                        if time.time() < _suppress_reopen_until:
                            return
                        _do_reopen()
                    QTimer.singleShot(140, _maybe)
                else:
                    _do_reopen()
            except Exception as e:
                log(f"reopen on activate: {e}")
        mw.app.applicationStateChanged.connect(_on_state)
        _reopen_hooked = True
    except Exception as e:
        log(f"install reopen hook: {e}")


def _install_close_hook() -> None:
    """Override AnkiQt.closeEvent so the red-X just HIDES the window (keeping the
    tray icon to reopen from) instead of quitting. This is the reliable primary
    path — Qt always calls closeEvent, whereas an installed event filter can miss
    the Close on some macOS/Qt builds. Only hides; no heavy work (can't hang)."""
    global _close_hooked
    if _close_hooked:
        return
    try:
        from aqt.main import AnkiQt
        _orig = AnkiQt.closeEvent

        def _ce(self, event, _orig=_orig):
            if self is mw and _cfg().get("tray_minimize", False) and not _quitting:
                try:
                    event.ignore()
                except Exception:
                    pass
                _minimize_to_tray()
                return
            return _orig(self, event)

        AnkiQt.closeEvent = _ce
        _close_hooked = True
    except Exception as e:
        log(f"install close hook: {e}")


class _TrayFilter(QObject):
    def eventFilter(self, obj: QObject, event: QEvent) -> bool:
        # Gate on the SETTING only (not isVisible — see _ensure_tray_target).
        if obj is mw and _cfg().get("tray_minimize", False) and not _quitting:
            if event.type() == QEvent.Type.Close:
                # Red-X → minimize to the menu bar instead of quitting. Anki's
                # closeEvent (which saves geometry) never runs when we swallow the
                # Close, so remember the state + persist the size ourselves first,
                # and make sure the tray icon is present to restore from. Wrapped so
                # that if ANY helper throws we STILL swallow the close (an exception
                # here used to bubble out and let Anki quit anyway).
                _minimize_to_tray()
                return True
            if event.type() == QEvent.Type.WindowStateChange:
                if mw.windowState() & Qt.WindowState.WindowMinimized:
                    # Remember the state we're minimizing FROM (oldState), not the
                    # minimized state, so restore returns to fullscreen/maximized.
                    try:
                        _remember_state(event.oldState())
                    except Exception:
                        _remember_state()
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
        log(f"profile flush: {exc}")


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
    gamepad._stop_gamepad_poll()  # stop polling first — it bus-errors mid-teardown
    try:
        if hud._coherence_hud is not None:
            hud._coherence_hud.close()
            hud._coherence_hud.deleteLater()
            hud._coherence_hud = None
    except Exception:
        pass
    try:
        if pomodoro._pomo_instance is not None:
            pomodoro._pomo_instance.stop()
    except Exception:
        pass
    try:
        if _tray_icon is not None:
            _tray_icon.hide()
    except Exception:
        pass


_tray_filter = _TrayFilter()
