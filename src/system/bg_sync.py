"""The automatic syncs run in the background: when a profile opens, Anki's "Syncing…"
progress window (and busy cursor) is skipped; when Anki quits, the main window hides at
once and the sync + backup finish with no progress windows. The sync itself is unchanged;
Anki's own "synced" tooltip still reports the result, and any question it needs to ask
(e.g. a full sync) still appears. Clicking Sync shows the window as usual.
Settings: `sync_in_background` (default on)."""
from aqt import gui_hooks, mw

from ..util.config import _cfg, log

_pending = False     # profile just opened → the next sync is the automatic one
_quiet = False       # that sync is running now
_exit_at = 0.0       # when Quit was asked for (a cancelled quit expires)
_exiting = False     # the close sync has started: everything until exit stays unseen


def _on_profile_open():
    global _pending
    _pending = bool(_cfg().get("sync_in_background", True))


def _on_sync_start():
    global _pending, _quiet, _exiting
    import time
    _quiet, _pending = _pending, False
    # the quit's own sync starts right after its windows close; a quit cancelled by a
    # window (unsaved Add, …) never gets here, and a later manual Sync is past this
    if _exit_at and time.monotonic() - _exit_at < 8:
        _exiting = True
    if _exiting:
        # quitting and every window has agreed to close: hide now, sync unseen
        try:
            mw.hide()
        except Exception:
            pass


def _on_sync_done():
    global _quiet
    _quiet = _exiting


def _hidden():
    return _quiet or _exiting


def install():
    try:
        from aqt import progress as _prog
        PM = _prog.ProgressManager
        if getattr(PM._showWin, "_jk_bg", False):
            return
        orig_show, orig_busy = PM._showWin, PM._set_busy_cursor

        def _showWin(self, *a, **k):
            if _hidden():
                self._shown = 1          # treated as shown (no later re-attempts)
                return None
            return orig_show(self, *a, **k)

        def _set_busy_cursor(self, *a, **k):
            if _hidden():
                return None
            return orig_busy(self, *a, **k)

        # Quitting: the window hides as the close sync starts; the sync and backup then
        # run unseen and the app exits when they're done (same as before, just hidden).
        from aqt.main import AnkiQt
        orig_exit = AnkiQt.unloadProfileAndExit

        def unloadProfileAndExit(self, *a, **k):
            global _exit_at
            import time
            # (not hidden yet: a window that refuses to close cancels the quit — the
            # window hides when the close sync starts, past that point)
            if _cfg().get("sync_in_background", True):
                _exit_at = time.monotonic()
            return orig_exit(self, *a, **k)
        AnkiQt.unloadProfileAndExit = unloadProfileAndExit

        _showWin._jk_bg = True
        PM._showWin, PM._set_busy_cursor = _showWin, _set_busy_cursor
        # profile_did_open fires immediately before Anki's open-sync starts
        gui_hooks.profile_did_open.append(_on_profile_open)
        gui_hooks.sync_will_start.append(_on_sync_start)
        gui_hooks.sync_did_finish.append(_on_sync_done)
    except Exception as e:
        log("background sync: %s" % e)
