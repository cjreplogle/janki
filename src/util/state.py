"""Cross-feature mutable flags shared across modules and the CGEventTap thread.

Written by one feature and read by another (notably the background keyboard-tap
thread), so they live in one place and are accessed as ``state.<name>`` — importing
them by value would freeze a stale copy.
"""

_pomo_on_break = False      # True while Pomodoro break screen is active (read by CGEventTap thread)
_break_tint_active = False  # True while the blue "break due" tint is shown; suppresses the red card pulse
_flare_origin = 0.0         # monotonic() anchor for the red flare/bar pulse phase, set at expiry
_mw_active = True          # the MAIN window has focus (not Add/Edit/Browse) — Space typed
                           # in an editor must never be taken by the break
_anki_focused = True        # True while Anki is the frontmost app (read by CGEventTap thread)
_remote_active = False      # True while the reviewer has a card up (gamepad gate)
_lockdown_on = False        # True while kiosk lockdown is engaged (read by CGEventTap thread)
_lockdown_hold_committed = False  # True once the Space-hold-to-exit is underway (swallow Space)
_lockdown_warn = False      # True during the very-strict pre-close warning (Space/Enter skip, Esc cancel)


# --- Calm first launches: at most one Janki prompt per launch ------------------------
# Glass restart, Accessibility explanation, update offer, Windows rendering restart all
# claim this slot; whichever comes first wins, the rest wait for a later launch.
_prompt_this_launch = None


def claim_prompt(name: str) -> bool:
    global _prompt_this_launch
    if _prompt_this_launch not in (None, name):
        return False
    _prompt_this_launch = name
    return True


def first_run() -> bool:
    """True on the first launch after Janki was installed (config onboarded unset)."""
    try:
        from aqt import mw
        return not (mw.addonManager.getConfig(__name__) or {}).get("onboarded", False)
    except Exception:
        return False
