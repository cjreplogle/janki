"""Opt-in timing probe for deck-list / Practice switches. Active only while
user_files/perf_probe exists; writes user_files/perf.log. Records how long each
stage of a switch takes so slow spots can be fixed with real numbers."""
import os
import time

_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "user_files")
_ON = os.path.exists(os.path.join(_DIR, "perf_probe"))
_t = {"start": None, "what": ""}


def _w(msg):
    try:
        with open(os.path.join(_DIR, "perf.log"), "a", encoding="utf-8") as f:
            f.write("%s %s\n" % (time.strftime("%H:%M:%S"), msg))
    except Exception:
        pass


def _ms(a):
    return "%.0fms" % ((time.perf_counter() - a) * 1000)


def begin(what):
    if _ON:
        _t["start"] = time.perf_counter()
        _t["what"] = what
        _w("---- %s" % what)


def mark(stage):
    if _ON and _t["start"] is not None:
        _w("  %-34s +%s" % (stage, _ms(_t["start"])))


def install():
    if not _ON:
        return
    from aqt import mw, gui_hooks
    from aqt.deckbrowser import DeckBrowser

    # time every webview_will_set_content callback (ours and other add-ons')
    try:
        h = gui_hooks.webview_will_set_content
        for i, cb in enumerate(list(h._hooks)):
            def timed(wc, ctx, _cb=cb):
                a = time.perf_counter()
                _cb(wc, ctx)
                d = (time.perf_counter() - a) * 1000
                if d > 2 and isinstance(ctx, DeckBrowser):
                    _w("    hook %s.%s %.0fms" % (getattr(_cb, "__module__", "?"),
                                                  getattr(_cb, "__name__", "?"), d))
            h._hooks[i] = timed
    except Exception as e:
        _w("hook wrap failed %r" % e)
    try:
        h = gui_hooks.deck_browser_will_render_content
        for i, cb in enumerate(list(h._hooks)):
            def timed2(db, c, _cb=cb):
                a = time.perf_counter()
                _cb(db, c)
                _w("    render-hook %s.%s %.0fms" % (getattr(_cb, "__module__", "?"),
                                                     getattr(_cb, "__name__", "?"),
                                                     (time.perf_counter() - a) * 1000))
            h._hooks[i] = timed2
    except Exception as e:
        _w("render hook wrap failed %r" % e)

    orig_refresh = DeckBrowser.refresh
    orig_render = DeckBrowser._renderPage

    def refresh(self, *a, **k):
        if _t["start"] is None or time.perf_counter() - _t["start"] > 3:
            begin("deckBrowser.refresh")
        mark("refresh() (db query starts)")
        return orig_refresh(self, *a, **k)

    def render(self, *a, **k):
        if _t["start"] is None or time.perf_counter() - _t["start"] > 3:
            begin("deckBrowser._renderPage")
        mark("_renderPage start%s" % (" (reuse)" if k.get("reuse") else ""))
        r = orig_render(self, *a, **k)
        mark("_renderPage done (html handed to web)")
        return r
    DeckBrowser.refresh = refresh
    DeckBrowser._renderPage = render

    def _loaded(ok):
        mark("web loadFinished")
        _t["start"] = None
    mw.web.loadFinished.connect(_loaded)

    lh = getattr(mw.toolbar, "link_handlers", {}) or {}
    for key, fn in list(lh.items()):
        def clicked(*a, _fn=fn, _k=key, **k):
            begin("toolbar click: %s" % _k)
            return _fn(*a, **k)
        lh[key] = clicked
    _w("probe installed; toolbar links: %s" % ",".join(lh))
