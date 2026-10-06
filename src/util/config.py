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
def _win_render_cfg() -> str:
    """win_render straight from meta.json (this runs before Anki's config API is up)."""
    try:
        import json
        p = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
                         "meta.json")
        with open(p, encoding="utf-8") as f:
            v = str((json.load(f).get("config") or {}).get("win_render", "software")).lower()
        return "gpu" if v == "gpu" else "software"
    except Exception:
        return "software"


def _win_glass_gate() -> bool:
    """Windows glass (DWM backdrop) with a crash guard like the Mac self-heal: a
    'pending' marker is written as glass starts and cleared once the launch has run
    stably (confirm_win_glass). If a launch dies first, the next start finds the
    marker, records the failure and boots without glass until it's re-enabled."""
    d = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
                     "user_files")
    pending, failed = os.path.join(d, "win_glass_pending"), os.path.join(d, "win_glass_failed")
    try:
        os.makedirs(d, exist_ok=True)
        if os.path.exists(pending):
            os.replace(pending, failed)
        if os.path.exists(failed):
            # A glass launch crashed: drop the pre-launch hook so the next start is
            # plain; Settings can turn glass back on (reset_win_glass_failure).
            try:
                from ..platform.win import preboot
                preboot.uninstall()
            except Exception:
                pass
            # Only the See-through hook runs before Anki starts (and so can crash
            # it); the Fast looks are painted by Janki afterwards and can't — keep them.
            return _win_render_cfg() == "gpu"
        # win_glass only switches the see-through part (the pre-launch hook); Janki's
        # glass styling (tint, fonts, controls) stays on either way.
        open(pending, "w").close()
        return True
    except Exception:
        return False


def confirm_win_glass() -> None:
    try:
        os.remove(os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
                               "user_files", "win_glass_pending"))
    except Exception:
        pass


def reset_win_glass_failure() -> None:
    try:
        os.remove(os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
                               "user_files", "win_glass_failed"))
    except Exception:
        pass


if sys.platform.startswith("win"):
    # Windows has no launcher flag: features always run; glass is on unless turned off
    # (config win_glass) or the crash guard tripped.
    ACTIVE = True
    GLASS = _win_glass_gate()
else:
    ACTIVE = _is_active()
    GLASS = _is_active()


# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

# "Disable animations" (Settings → Appearance): turns off the heavy visual work at
# read time — the saved settings underneath are left alone, so switching it back
# restores them. Core features (timers, flares, practice, hotkeys…) are untouched.
_NO_ANIM = {"ui_animations": False, "typewriter": False, "first_card_fade": False,
            "blur_radius": 0, "bg_blur": 0, "win_backdrop": "off"}
# Glass switch off (Settings → Appearance → Window): no window blur.
_NO_GLASS = {"blur_radius": 0, "win_backdrop": "off"}


def _cfg_raw() -> dict:
    """The stored config, without overrides — use this when writing config back."""
    c = mw.addonManager.getConfig(__name__)
    return c if c else {}


def _cfg() -> dict:
    c = _cfg_raw()
    if c.get("disable_animations"):
        c = dict(c, **_NO_ANIM)
    if c.get("glass_enabled", True) is False:
        c = dict(c, **_NO_GLASS)
    return c
