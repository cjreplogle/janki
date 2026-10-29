"""Quit guard: don't let a stuck background job keep a quit Anki alive forever.

Anki's quit runs: close windows → sync (collection, then media) → back up + close the
collection → save the profile → exit. Only THEN does Qt wait — with no timeout — for every
job on its global thread pool. One add-on's job stuck on a lock (seen 2026-10-29: the
AMBOSS add-on's network check, caught by a quit) left a windowless Anki process that
never exited, so an update restart never reopened Anki.

At that last step this waits up to a few seconds for the pool and then ends the process.
It never acts while a sync could still be running: the collection's database must already
be closed (sync and backup happen before that) and media sync stopped, else Qt's normal
(unbounded) wait is left alone. (An AppleScript "quit" exits WITHOUT closing the
collection — that path is left alone too.)"""
import atexit
import os
import time

_WAIT_MS = 5000
_LOG = os.path.expanduser("~/.janki_quit_guard.txt")


def _guard() -> None:
    try:
        from aqt import mw
        from aqt.qt import QThreadPool
        col = getattr(mw, "col", None) if mw is not None else None
        if mw is None or (col is not None and getattr(col, "db", None) is not None):
            return                      # collection still open: not a finished quit
        ms = getattr(mw, "media_syncer", None)
        if ms is not None and ms.is_syncing():
            return                      # never cut a sync short
        if QThreadPool.globalInstance().waitForDone(_WAIT_MS):
            return                      # every job finished: normal exit
        try:
            with open(_LOG, "a") as f:
                f.write("%s stuck background job after quit — ended Anki\n"
                        % time.strftime("%Y-%m-%d %H:%M:%S"))
        except Exception:
            pass
        os._exit(0)
    except Exception:
        pass


def install() -> None:
    # atexit runs last-registered first, so this goes before PyQt's own cleanup —
    # the step whose thread-pool wait is the one that hangs
    atexit.register(_guard)
