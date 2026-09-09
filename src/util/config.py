"""Activation gate and add-on config access."""

import os
import sys

from aqt import mw


def log(msg: str) -> None:
    """Janki's internal notice channel. Quiet by default so a fresh install (or a
    machine whose Qt/ObjC bridge rejects some calls) doesn't spew warnings into
    Anki's console. Set the env var JANKI_DEBUG=1 to see them."""
    if os.environ.get("JANKI_DEBUG"):
        sys.stderr.write("[janki] %s\n" % msg)


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


# There is no longer a separate "safe (no-glass)" edition of Janki — the
# features-only role is now the standalone "Load today's lectures" add-on. Janki
# is glass-only, so both switches simply track _is_active():
#   ACTIVE — run janki's features (timers, focus, pomodoro, hotkeys, …)
#   GLASS  — window transparency + OLED + the stock-Anki self-heal patch
# SAFE is kept as a False constant for any legacy reference.
SAFE = False
ACTIVE = _is_active()
GLASS = _is_active()


# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

def _cfg() -> dict:
    c = mw.addonManager.getConfig(__name__)
    return c if c else {}
