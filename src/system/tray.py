"""System-tray minimize, profile autosave, and glass-window teardown."""

import sys
from aqt import mw
from aqt.qt import QAction, QEvent, QMenu, QObject, Qt, QTimer, QSystemTrayIcon

from ..util.config import log, _cfg
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
            _tray_icon = QSystemTrayIcon(mw.windowIcon(), mw)
            menu = QMenu()
            # Mode toggles, mirrored from the Tab+\ / Tab+F hotkeys, so caption and
            # focus can be driven from the menu-bar icon even when Anki is unfocused.
            # Caption/Focus mode are macOS-native, so only offer them there — the
            # rest of the tray (open/quit, close-to-tray) is cross-platform.
            if sys.platform == "darwin":
                _tray_caption_action = QAction("Caption mode", mw)
                _tray_caption_action.setCheckable(True)
                _tray_caption_action.triggered.connect(lambda _c=False: hud._toggle_coherence())
                _tray_focus_action = QAction("Focus mode", mw)
                _tray_focus_action.setCheckable(True)
                _tray_focus_action.triggered.connect(lambda _c=False: focus._toggle_focus_mode())
                _tray_lockdown_action = QAction("Lockdown mode", mw)
                _tray_lockdown_action.setCheckable(True)
                _tray_lockdown_action.triggered.connect(lambda _c=False: lockdown.toggle())
                menu.addAction(_tray_caption_action)
                menu.addAction(_tray_focus_action)
                menu.addAction(_tray_lockdown_action)
            last_deck_action = QAction("Open last studied deck", mw)
            last_deck_action.triggered.connect(lambda _c=False: focus._open_last_deck())
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
        # Only ever RESTORE on click — never hide. Hiding here fought the context
        # menu (every other click hid the app), and a re-shown glass window can
        # come back blank, so it looked un-unhideable. The menu's "Open Anki" /
        # close-to-tray handle hiding.
        if not mw.isVisible() or mw.isMinimized():
            mw.showNormal()
            mw.raise_()
            mw.activateWindow()
            try:
                from ..user import glass
                glass._wake_main_webviews()   # repaint the transparent window
            except Exception:
                pass


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
