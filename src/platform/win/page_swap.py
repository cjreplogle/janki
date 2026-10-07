"""Switch between deck-browser pages (Decks ↔ Calendar ↔ Practice) without a page load.
Windows: every such switch. macOS: only into Practice (see _swappable).

Anki's setHtml navigates the main web view to a fresh document every time, and on
Windows that navigation is 300-1000ms of blank-ish waiting in the middle of the switch
animation. When the page already showing is a deck-browser page and the next one is too,
this rewrites the live document in place (document.open/write/close): every script runs
again as on a real load, document/window listeners are dropped, but there is no
navigation and the scripts/styles/fonts come from memory.

loadFinished is still emitted afterwards so everything that waits for a new page keeps
working. Turn off with config `win_page_swap: false`.
"""
import json

from aqt import mw

from ...util.config import _cfg, log

_last_state = None      # mw.state when the page currently showing was set


def _note(msg):
    log(msg)
    try:
        from ...util import perf_probe
        perf_probe._w(msg)
    except Exception:
        pass


_errors_js = ("(function(){var e=window.__jkSwapErr||[];window.__jkSwapErr=[];"
              "return e.slice(0,5);})()")


def _swappable(view) -> bool:
    if view is not getattr(mw, "web", None):
        return False
    import sys
    if sys.platform.startswith("win"):
        if not _cfg().get("win_page_swap", True):
            return False
    else:
        # macOS: only the switch INTO Practice (its reload flickered); every other page
        # still loads normally. Off with config `mac_practice_swap: false`.
        if not _cfg().get("mac_practice_swap", True):
            return False
        try:
            from ...features import practice
            if not practice._practice_view:
                return False
        except Exception:
            return False
    if getattr(mw, "state", None) != "deckBrowser" or _last_state != "deckBrowser":
        return False
    try:
        if "legacyPageData" not in view.url().toString():
            return False
        from ...features import stats_embed
        if stats_embed.is_open():
            return False
    except Exception:
        return False
    return True


def _swap(view, html, context) -> None:
    from aqt.qt import QTimer
    webview_id = id(view)
    try:                       # keep Anki's copy current (a real reload serves it)
        mw.mediaServer.set_page_html(webview_id, html, context)
    except Exception:
        pass
    # Collect script errors from the very first script of the rewritten page.
    grab = ("<script>window.__jkSwapErr=[];window.addEventListener('error',function(e){"
            "window.__jkSwapErr.push(String(e.message)+' @'+"
            "(e.filename||'').split('/').pop()+':'+e.lineno);});</script>")
    i = html.find("<head>")
    doc = html[:i + 6] + grab + html[i + 6:] if i >= 0 else grab + html
    js = ("(function(){document.open();document.write(%s);document.close();})();"
          % json.dumps(doc))

    def _done(_r=None):
        try:
            view.loadFinished.emit(True)
        except Exception as e:
            log("page swap: loadFinished emit: %s" % e)
        # Report script errors from the rewrite (a top-level let/const re-declared, …)
        # so a problem shows up in the log instead of a silently broken page.
        QTimer.singleShot(400, lambda: view.page().runJavaScript(
            _errors_js, lambda errs: _note("page swap: %s" % (errs or "ok, no js errors"))))
    try:
        view.page().runJavaScript(js, _done)
    except Exception as e:
        log("page swap failed, loading normally: %s" % e)
        raise


def install() -> None:
    from aqt.webview import AnkiWebView
    if getattr(AnkiWebView, "_jk_page_swap", False):
        return
    orig = AnkiWebView._setHtml

    def _setHtml(self, html, *args, **kwargs):
        global _last_state
        if self is getattr(mw, "web", None):
            swap = _swappable(self)
            _last_state = getattr(mw, "state", None)
            if swap:
                try:
                    ctx = args[0] if args else kwargs.get("context")
                    _swap(self, html, ctx)
                    return
                except Exception:
                    pass
        return orig(self, html, *args, **kwargs)

    AnkiWebView._setHtml = _setHtml
    AnkiWebView._jk_page_swap = True
