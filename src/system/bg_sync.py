"""The automatic sync when a profile opens runs in the background: Anki's "Syncing…"
progress window (and busy cursor) is skipped for it. The sync itself is unchanged;
Anki's own "synced" tooltip still reports the result, and any question it needs to ask
(e.g. a full sync) still appears. Clicking Sync shows the window as usual.
Settings: `sync_in_background` (default on)."""
from aqt import gui_hooks, mw

from ..util.config import _cfg, log

_pending = False     # profile just opened → the next sync is the automatic one
_quiet = False       # that sync is running now


def _on_profile_open():
    global _pending
    _pending = bool(_cfg().get("sync_in_background", True))


def _on_sync_start():
    global _pending, _quiet
    _quiet, _pending = _pending, False


def _on_sync_done():
    global _quiet
    _quiet = False


def install():
    try:
        from aqt import progress as _prog
        PM = _prog.ProgressManager
        if getattr(PM._showWin, "_jk_bg", False):
            return
        orig_show, orig_busy = PM._showWin, PM._set_busy_cursor

        def _showWin(self, *a, **k):
            if _quiet:
                self._shown = 1          # treated as shown (no later re-attempts)
                return None
            return orig_show(self, *a, **k)

        def _set_busy_cursor(self, *a, **k):
            if _quiet:
                return None
            return orig_busy(self, *a, **k)

        _showWin._jk_bg = True
        PM._showWin, PM._set_busy_cursor = _showWin, _set_busy_cursor
        # profile_did_open fires immediately before Anki's open-sync starts
        gui_hooks.profile_did_open.append(_on_profile_open)
        gui_hooks.sync_will_start.append(_on_sync_start)
        gui_hooks.sync_did_finish.append(_on_sync_done)
    except Exception as e:
        log("background sync: %s" % e)
