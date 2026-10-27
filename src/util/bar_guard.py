"""Answer bar that never reaches the screen (macOS).

On some launches the bottom answer bar's web view comes up "dead": Qt shows it, its page
is loaded and visible (Show Answer laid out, clickable in the page), yet nothing it
draws reaches the screen and no click reaches the page. Traced 2026-10-27: it is decided
at launch — every episode began as Anki started — and nothing later revives it (hide /
show, a 6 s hide, a 1 px resize, a redraw, a page reload, focus levels, full screen).
The view's inner QQuickWidget framebuffer then reads completely empty.

So: the first time the bar shows buttons, read back what it drew. Empty three checks
running → give the bar a brand-new page (new renderer + surface, same widget) and draw
the current screen's bar into it again — no restart. Still dead after that → logged
only (a quit-and-reopen remains as an opt-in: config `bar_guard_relaunch: true`)."""
import os
import time

from aqt import mw
from aqt.qt import QTimer

from .config import log

_MARK = os.path.expanduser("~/.janki_bar_relaunch")
_COOLDOWN_S = 180
_WINDOW_S = 1200          # judge the bar the first time it shows buttons (deck list: hidden)
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
    # say so first: a silent quit mid-review looked like a crash
    try:
        from aqt.utils import tooltip
        tooltip("Janki: the answer bar didn't start — restarting Anki…", period=2500)
    except Exception:
        pass

    def go():
        try:
            from ..system import stock_selfheal
            stock_selfheal._relaunch_after_quit()
            mw.unloadProfileAndExit()       # (mw.close() is turned into a hide by the tray)
        except Exception as e:
            log("bar guard relaunch: %s" % e)
    QTimer.singleShot(2000, go)


_rebuilt = 0


def _rebuild_bar():
    """Give the answer bar a brand-new page — a new renderer and compositor surface in
    the same widget (hide/show, resize, reload and redraw all reuse the dead surface and
    never helped) — then draw the current screen's bar into it again. No restart."""
    global _rebuilt, _t0
    _rebuilt += 1
    _t0 = time.monotonic()          # a fresh window to see whether it came back
    bw = getattr(mw, "bottomWeb", None)
    if bw is None:
        return
    _note("dead bar → new page for the bar (rebuild %d)" % _rebuilt)
    try:
        from aqt.webview import AnkiWebPage
        from aqt.qt import QColor, Qt
        old = bw.page()
        page = AnkiWebPage(bw._onBridgeCmd, getattr(bw, "_kind", None) or old._kind, bw)
        bw.setPage(page)
        page.setBackgroundColor(QColor(Qt.GlobalColor.transparent))
        bw._domDone = True
        bw._pendingActions = []
        # Janki's same-strip shortcut swaps buttons into the page it drew before — this
        # page is empty, so the next draw must be a full one
        for a in ("_jk_bar_ctx", "_jk_rev_page"):
            try:
                setattr(bw, a, None if a == "_jk_bar_ctx" else False)
            except Exception:
                pass
        try:
            old.deleteLater()
        except Exception:
            pass
    except Exception as e:
        _note("rebuild: new page failed: %s" % e)
        return
    try:
        st = getattr(mw, "state", None)
        if st == "review":
            from aqt.reviewer import ReviewerBottomBar
            r = mw.reviewer
            r.bottom.web.stdHtml(
                r._bottomHTML(),
                css=["css/toolbar-bottom.css", "css/reviewer-bottom.css"],
                js=["js/vendor/jquery.min.js", "js/reviewer-bottom.js"],
                context=ReviewerBottomBar(r))
            r.bottom.web.set_bridge_command(r._linkHandler, ReviewerBottomBar(r))
            if r.state == "answer":
                r._showEaseButtons()
            else:
                r._showAnswerButton()
        elif st == "overview":
            mw.overview.refresh()
        elif st == "deckBrowser":
            mw.deckBrowser.refresh()
    except Exception as e:
        _note("rebuild: redraw failed: %s" % e)


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
                _stop(("recovered after a new page (lit=%d)" if _rebuilt else "healthy (lit=%d)") % lit)
                return
            _empty += 1
            _note("bar empty with %d buttons (%d/3)" % (n, _empty))
            if _empty >= 3:
                _empty = 0
                if _rebuilt < 1:
                    _rebuild_bar()           # then keep watching: did it come back?
                    return
                _stop("dead even after a new page")
                # (healthy launches read in the thousands — 6937 on 2026-10-27 — a
                # dead bar reads 0; config `bar_guard_relaunch: false` = log only)
                from .config import _cfg
                if _cfg().get("bar_guard_relaunch", False):
                    _relaunch()
                else:
                    _note("would relaunch (bar_guard_relaunch off)")
        except Exception as e:
            log("bar guard check: %s" % e)
    try:
        bw.page().runJavaScript(
            # only buttons that are really drawn: the review-start hold hides the bar's
            # page with visibility:hidden (buttons laid out, nothing drawn on purpose),
            # and a fade passes through opacity 0 — both read as a dead bar and
            # relaunched Anki (2026-10-27, 16:27)
            "[].filter.call(document.querySelectorAll('button'),function(b){"
            "var r=b.getBoundingClientRect();if(r.width<=20||r.height<=10)return false;"
            "try{if(b.checkVisibility&&!b.checkVisibility({checkVisibilityCSS:true,checkOpacity:true}))return false;}catch(e){}"
            "for(var n=b;n;n=n.parentElement){var c=getComputedStyle(n);"
            "if(c.visibility==='hidden'||parseFloat(c.opacity)<0.5)return false;}"
            "return true;}).length", got)
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
