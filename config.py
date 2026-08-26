"""Activation gate and add-on config access."""

import os
from pathlib import Path

from aqt import mw


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


def _safe_edition() -> bool:
    """Safe (no-glass) edition: marked by a `safe_edition.flag` file shipped ONLY
    in the safe build. It runs every feature but NEVER patches Anki or attempts
    window transparency / OLED / the self-heal."""
    try:
        return (Path(__file__).resolve().parent / "safe_edition.flag").exists()
    except Exception:
        return False


SAFE = _safe_edition()

# Two switches:
#   ACTIVE — run janki's features (timers, focus, pomodoro, hotkeys, …)
#   GLASS  — window transparency + OLED + the stock-Anki self-heal patch
# In the glass edition both track _is_active() (identical to the old single gate).
# The safe edition flips features ON while keeping every glass/patch path OFF.
ACTIVE = _is_active() or SAFE
GLASS = _is_active() and not SAFE


# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

def _cfg() -> dict:
    c = mw.addonManager.getConfig(__name__)
    return c if c else {}
