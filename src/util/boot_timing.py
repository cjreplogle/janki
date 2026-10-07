"""Startup timing log — where does launch time go?

Records timestamped marks from the moment Janki is imported until Anki is idle after
drawing the first deck list, and appends one block per launch to
~/Library/Logs/janki-startup-timing.log (last ~20 launches kept). Only step names and
milliseconds are written — never card, deck or collection content.

Each line shows:  +<ms since the Anki process started>  (+<ms since previous mark>)  label
"""

import os
from .. import platform as _plat
import sys
import time

LOG_PATH = _plat.log_path("janki-startup-timing.log")
_KEEP_LAUNCHES = 20

_T0 = time.perf_counter()
_marks = []          # [(label, perf_counter)]
_done = False
_gate = {"render": False, "startup": False}


def _win_ancestry():
    """Windows: [(exe name, seconds since start)] for this process and its parents (the
    Anki launcher starts a separate Python process — the click is the OLDEST)."""
    import ctypes
    from ctypes import wintypes as wt
    k32 = ctypes.WinDLL("kernel32", use_last_error=True)

    class PE(ctypes.Structure):
        _fields_ = [("dwSize", wt.DWORD), ("cntUsage", wt.DWORD), ("pid", wt.DWORD),
                    ("heap", ctypes.c_size_t), ("mod", wt.DWORD), ("threads", wt.DWORD),
                    ("ppid", wt.DWORD), ("pri", ctypes.c_long), ("flags", wt.DWORD),
                    ("exe", ctypes.c_wchar * 260)]
    k32.CreateToolhelp32Snapshot.restype = wt.HANDLE
    snap = k32.CreateToolhelp32Snapshot(2, 0)
    procs = {}
    try:
        e = PE(); e.dwSize = ctypes.sizeof(PE)
        ok = k32.Process32FirstW(snap, ctypes.byref(e))
        while ok:
            procs[e.pid] = (e.ppid, e.exe)
            ok = k32.Process32NextW(snap, ctypes.byref(e))
    finally:
        k32.CloseHandle(snap)
    now = wt.FILETIME()
    k32.GetSystemTimeAsFileTime(ctypes.byref(now))
    now_v = (now.dwHighDateTime << 32) | now.dwLowDateTime
    k32.OpenProcess.restype = wt.HANDLE
    out, pid = [], os.getpid()
    for _ in range(4):
        if pid not in procs:
            break
        h = k32.OpenProcess(0x1000, False, pid)        # QUERY_LIMITED_INFORMATION
        if not h:
            break
        c, x, kt, ut = wt.FILETIME(), wt.FILETIME(), wt.FILETIME(), wt.FILETIME()
        try:
            if not k32.GetProcessTimes(h, ctypes.byref(c), ctypes.byref(x),
                                       ctypes.byref(kt), ctypes.byref(ut)):
                break
        finally:
            k32.CloseHandle(h)
        cv = (c.dwHighDateTime << 32) | c.dwLowDateTime
        out.append((procs[pid][1], (now_v - cv) / 1e7))
        pid = procs[pid][0]
    return out


_win_chain = None


def _process_age_s() -> "float | None":
    """Seconds since this process started (macOS sysctl KERN_PROC_PID → p_starttime;
    Windows GetProcessTimes)."""
    global _win_chain
    if sys.platform.startswith("win"):
        try:
            _win_chain = _win_ancestry()
            return _win_chain[0][1] if _win_chain else None
        except Exception:
            return None
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
_wall_t0 = time.time()
last_total_ms = None     # this launch, click → settled (paces next launch's loading bar)


def footprint_mb() -> "float | None":
    """This process's physical footprint (what Activity Monitor shows), in MB."""
    if sys.platform != "darwin":
        return None
    try:
        import ctypes
        libc = ctypes.CDLL(None)
        buf = ctypes.create_string_buffer(512)
        if libc.proc_pid_rusage(os.getpid(), 2, buf) != 0:      # RUSAGE_INFO_V2
            return None
        return ctypes.c_uint64.from_buffer(buf, 72).value / 1048576.0   # ri_phys_footprint
    except Exception:
        return None


def mark(label: str) -> None:
    if not _done:
        _marks.append((label, time.perf_counter(), footprint_mb()))


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
    # Pre-add-on steps recorded by the Windows pre-launch hook (wall-clock marks).
    if _age_at_t0 is not None and getattr(sys, "_janki_boot", None):
        start = _wall_t0 - _age_at_t0
        prev = start
        for label, t in sys._janki_boot:
            lines.append("%8d ms  (+%5d)  [before Janki] %s" % ((t - start) * 1000,
                                                             (t - prev) * 1000, label))
            prev = t
    for name, age in (_win_chain or [])[1:]:
        # Older processes in the launch chain (Anki's launcher): when each started,
        # relative to Janki's import. The oldest Anki one ≈ the click.
        lines.append("%8d ms            started %s (before Janki import)" % (age * 1000, name))
    prev = _T0
    prev_mb = None
    for label, t, mb in _marks:
        since_start = (base + (t - _T0)) * 1000
        mem = ""
        if mb is not None:
            mem = "%5.0f MB (%+4.0f)  " % (mb, mb - prev_mb if prev_mb is not None else 0)
            prev_mb = mb
        lines.append("%8d ms  (+%5d)  %s%s" % (since_start, (t - prev) * 1000, mem, label))
        prev = t
    return "\n".join(lines) + "\n"


def close_splash() -> None:
    """Windows: close the pre-launch hook's stand-in window — the real one has drawn."""
    hwnd = getattr(sys, "_janki_splash_hwnd", None)
    if not hwnd:
        return
    try:
        import ctypes
        ctypes.windll.user32.PostMessageW(ctypes.c_void_p(hwnd), 0x8001, 0, 0)   # fade out + close
    except Exception:
        pass


def finish(label: str = "idle after first deck list") -> None:
    """Final mark + write the block (once per launch)."""
    global _done
    if _done:
        return
    mark(label)
    _done = True
    close_splash()
    global last_total_ms
    try:
        last_total_ms = int(((_age_at_t0 or 0.0) + (_marks[-1][1] - _T0)) * 1000)
    except Exception:
        pass
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

