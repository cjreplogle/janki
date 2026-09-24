"""Startup timing log — where does launch time go?

Records timestamped marks from the moment Janki is imported until Anki is idle after
drawing the first deck list, and appends one block per launch to
~/Library/Logs/janki-startup-timing.log (last ~20 launches kept). Only step names and
milliseconds are written — never card, deck or collection content.

Each line shows:  +<ms since the Anki process started>  (+<ms since previous mark>)  label
"""

import os
import sys
import time

LOG_PATH = os.path.expanduser("~/Library/Logs/janki-startup-timing.log")
_KEEP_LAUNCHES = 20

_T0 = time.perf_counter()
_marks = []          # [(label, perf_counter)]
_done = False
_gate = {"render": False, "startup": False}


def _process_age_s() -> "float | None":
    """Seconds since this process started (macOS sysctl KERN_PROC_PID → p_starttime)."""
    if sys.platform != "darwin":
        return None
    try:
        import ctypes
        libc = ctypes.CDLL(None)
        mib = (ctypes.c_int * 4)(1, 14, 1, os.getpid())     # CTL_KERN, KERN_PROC, PID
        buf = ctypes.create_string_buffer(1024)
        size = ctypes.c_size_t(len(buf))
        if libc.sysctl(mib, 4, buf, ctypes.byref(size), None, 0) != 0:
            return None
        # kinfo_proc.kp_proc.p_un.__p_starttime is a struct timeval at offset 0.
        sec = ctypes.c_long.from_buffer(buf, 0).value
        usec = ctypes.c_int32.from_buffer(buf, 8).value
        return time.time() - (sec + usec / 1e6)
    except Exception:
        return None


# Offset so marks can be reported relative to PROCESS start (covers Anki's own init and
# any add-ons loaded before Janki), not just relative to Janki's import.
_age_at_t0 = _process_age_s()


def mark(label: str) -> None:
    if not _done:
        _marks.append((label, time.perf_counter()))


def _fmt() -> str:
    import datetime
    base = (_age_at_t0 or 0.0)
    lines = ["=== %s ===" % datetime.datetime.now().isoformat(timespec="seconds")]
    try:
        from aqt import appVersion
        lines.append("Anki %s" % appVersion)
    except Exception:
        pass
    if _age_at_t0 is not None:
        lines.append("%8d ms            Anki process start → Janki import" % (base * 1000))
    prev = _T0
    for label, t in _marks:
        since_start = (base + (t - _T0)) * 1000
        lines.append("%8d ms  (+%5d)  %s" % (since_start, (t - prev) * 1000, label))
        prev = t
    return "\n".join(lines) + "\n"


def finish(label: str = "idle after first deck list") -> None:
    """Final mark + write the block (once per launch)."""
    global _done
    if _done:
        return
    mark(label)
    _done = True
    try:
        old = ""
        if os.path.exists(LOG_PATH):
            with open(LOG_PATH, "r", encoding="utf-8") as f:
                old = f.read()
        blocks = [b for b in old.split("\n=== ") if b.strip()]
        blocks = blocks[-(_KEEP_LAUNCHES - 1):]
        text = "\n=== ".join(blocks)
        if text and not text.startswith("=== "):
            text = "=== " + text if not text.startswith("===") else text
        with open(LOG_PATH, "w", encoding="utf-8") as f:
            f.write((text.rstrip() + "\n\n" if text.strip() else "") + _fmt())
    except Exception:
        pass


def _maybe_finish() -> None:
    # Write only once BOTH Janki's _startup ran and the first deck list rendered (their
    # order isn't guaranteed), after the event loop settles.
    if _gate["render"] and _gate["startup"]:
        try:
            from aqt.qt import QTimer
            QTimer.singleShot(0, finish)
        except Exception:
            finish()


def startup_done() -> None:
    _gate["startup"] = True
    _maybe_finish()


def arm_first_render() -> None:
    """Mark the first deck-list render, then finish once the event loop goes idle."""
    try:
        from aqt import gui_hooks
        from aqt.qt import QTimer
    except Exception:
        return
    state = {"hit": False}

    def _on_render(*_a):
        if state["hit"]:
            return
        state["hit"] = True
        mark("first deck list rendered")
        _gate["render"] = True
        _maybe_finish()
        try:
            gui_hooks.deck_browser_did_render.remove(_on_render)
        except Exception:
            pass
    try:
        gui_hooks.deck_browser_did_render.append(_on_render)
    except Exception:
        pass
    # Safety net: if the deck list never renders (e.g. start-to-tray), still write.
    QTimer.singleShot(20000, lambda: finish("timeout (no deck list render within 20s)"))
