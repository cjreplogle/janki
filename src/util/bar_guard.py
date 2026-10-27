"""Answer bar that never reaches the screen (macOS).

On some launches the bottom answer bar's web view comes up "dead": Qt shows it, its page
is loaded and visible (Show Answer laid out, clickable in the page), yet nothing it
draws reaches the screen and no click reaches the page. Traced 2026-10-27: it is decided
at launch — every episode began as Anki started — and nothing later revives it (hide /
show, a 6 s hide, a 1 px resize, a redraw, a page reload, focus levels, full screen).
The view's inner QQuickWidget framebuffer then reads completely empty.

So: right after start, read back what the bar drew while it is showing buttons. Empty
three checks running → quit (collection saved) and reopen Anki once. A marker file keeps
it from relaunching again within a few minutes, so it can never loop."""
import os
import time

from aqt import mw
from aqt.qt import QTimer

from .config import log

_MARK = os.path.expanduser("~/.janki_bar_relaunch")
_COOLDOWN_S = 180
_WINDOW_S = 60            # only judge the bar during the first minute after start
_LOG = os.path.expanduser("~/.janki_bar_guard.txt")

_t0 = 0.0
_empty = 0
_timer = None


def _note(msg):
    try:
        with open(_LOG, "a") as f:
            f.write("%s %s\n" % (time.strftime("%H:%M:%S"), msg))
    except Exception:
        pass


def _lit(bw) -> int:
    """Sampled pixels with any opacity in what the bar's view last drew (-1: unknown)."""
    try:
        from PyQt6.QtQuickWidgets import QQuickWidget
    except Exception:
        return -1
    for c in bw.findChildren(QQuickWidget):
        try:
            img = c.grabFramebuffer()
            w, h = img.width(), img.height()
            if w < 8 or h < 8:
                return -1
            lit = 0
            for y in range(0, h, 4):
                for x in range(0, w, 8):
                    if (img.pixel(x, y) >> 24) & 0xFF > 16:
                        lit += 1
            return lit
        except Exception:
            return -1
    return -1


def _relaunch():
    try:
        if os.path.exists(_MARK) and time.time() - os.path.getmtime(_MARK) < _COOLDOWN_S:
            _note("dead bar again, but relaunched recently — leaving it")
            return
        with open(_MARK, "w") as f:
            f.write(str(time.time()))
    except Exception:
        return
    _note("dead bar → relaunching Anki")
    log("bar guard: answer bar not drawing — relaunching Anki")
    try:
        from ..system import stock_selfheal
        stock_selfheal._relaunch_after_quit()
        mw.unloadProfileAndExit()       # (mw.close() is turned into a hide by the tray)
    except Exception as e:
        log("bar guard relaunch: %s" % e)


def _check():
    global _empty, _timer
    if time.monotonic() - _t0 > _WINDOW_S:
        _stop("window over")
        return
    bw = getattr(mw, "bottomWeb", None)
    if bw is None or not bw.isVisible() or bw.height() < 20:
        return

    def got(n):
        global _empty
        try:
            if not n:                       # the page shows no buttons: nothing to judge
                return
            lit = _lit(bw)
            if lit < 0:
                return
            if lit > 0:
                _stop("healthy (lit=%d)" % lit)
                return
            _empty += 1
            _note("bar empty with %d buttons (%d/3)" % (n, _empty))
            if _empty >= 3:
                _stop("dead")
                # (healthy launches read in the thousands — 6937 on 2026-10-27 — a
                # dead bar reads 0; config `bar_guard_relaunch: false` = log only)
                from .config import _cfg
                if _cfg().get("bar_guard_relaunch", True):
                    _relaunch()
                else:
                    _note("would relaunch (bar_guard_relaunch off)")
        except Exception as e:
            log("bar guard check: %s" % e)
    try:
        bw.page().runJavaScript(
            "[].filter.call(document.querySelectorAll('button'),function(b){"
            "var r=b.getBoundingClientRect();return r.width>20&&r.height>10;}).length", got)
    except Exception:
        pass


def _stop(why):
    global _timer
    if _timer is not None:
        _timer.stop()
        _timer = None
        _note("guard off: %s" % why)


def install():
    global _t0, _timer
    from ..platform import IS_MAC
    if not IS_MAC or _timer is not None:
        return
    _t0 = time.monotonic()
    _timer = QTimer(mw)
    _timer.timeout.connect(_check)
    _timer.start(1500)
