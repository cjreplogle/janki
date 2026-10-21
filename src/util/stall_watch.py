"""Opt-in main-thread stall watchdog (diagnostics). Active only while ~/.janki_stallwatch
exists: a background thread watches a heartbeat the main thread updates every 50 ms and,
when it stops for >300 ms, writes the main thread's Python stack to ~/.janki_stalls.log."""
import os
import sys
import threading
import time
import traceback

_FLAG = os.path.expanduser("~/.janki_stallwatch")
_LOG = os.path.expanduser("~/.janki_stalls.log")


def install() -> None:
    if not os.path.exists(_FLAG):
        return
    from aqt.qt import QTimer
    from aqt import mw
    beat = [time.monotonic()]
    main_id = threading.main_thread().ident

    def tick():
        beat[0] = time.monotonic()

    t = QTimer(mw)
    t.timeout.connect(tick)
    # the flag file may hold a threshold in ms (default 300) for finding short hitches
    try:
        lim = max(20, int(open(_FLAG).read().strip() or 300)) / 1000.0
    except Exception:
        lim = 0.3
    t.start(10 if lim < 0.15 else 50)
    mw._jk_stall_timer = t

    def watch():
        last_dump = 0.0
        while True:
            time.sleep(0.01 if lim < 0.15 else 0.1)
            gap = time.monotonic() - beat[0]
            if gap > lim and time.monotonic() - last_dump > max(lim, 0.05):
                last_dump = time.monotonic()
                fr = sys._current_frames().get(main_id)
                try:
                    with open(_LOG, "a") as f:
                        f.write("=== %s stalled %.0f ms\n" % (time.strftime("%H:%M:%S"), gap * 1000))
                        f.write("".join(traceback.format_stack(fr)[-25:]) if fr else "(no frame)\n")
                except Exception:
                    pass

    threading.Thread(target=watch, daemon=True, name="janki-stallwatch").start()
