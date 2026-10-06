"""Hand freed memory back to macOS.

Big one-off reads (calendar matching, Study Progress, indexes) free their Python objects
afterwards, but the allocator keeps the pages, so Activity Monitor still counts them.
relieve() runs a GC pass and asks malloc to return free pages to the system."""
import gc
import sys

from .config import log


def relieve(tag=""):
    try:
        gc.collect()
        if sys.platform == "darwin":
            import ctypes
            libc = ctypes.CDLL(None)
            fn = libc.malloc_zone_pressure_relief
            fn.restype = ctypes.c_size_t
            fn.argtypes = [ctypes.c_void_p, ctypes.c_size_t]
            freed = fn(None, 0)
            if freed > 32 * 1048576:
                log("memory relief%s: %d MB returned" % (" (" + tag + ")" if tag else "",
                                                          freed // 1048576))
    except Exception as e:
        log("memory relief: %s" % e)


def relieve_later(ms=1500, tag=""):
    try:
        from aqt.qt import QTimer
        QTimer.singleShot(ms, lambda: relieve(tag))
    except Exception:
        pass
