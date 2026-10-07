"""Opt-in timing probe for deck-list / Practice switches. Active only while
user_files/perf_probe exists; writes user_files/perf.log. Records how long each
stage of a switch takes so slow spots can be fixed with real numbers."""
import os
import time

_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "user_files")
_ON = os.path.exists(os.path.join(_DIR, "perf_probe"))
_t = {"start": None, "what": ""}


def _w(msg):
    if not _ON:          # diagnostics only while user_files/perf_probe exists
        return
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


# --- idle frame hunt: what keeps a page animating while Anki sits idle ---------------
# Every 15 s, per webview: running animations (with their element) and how many
# requestAnimationFrame calls it makes per second. With the 120 Hz flag, anything
# animating while idle renders flat out (the main process sat at 100 % CPU).
_ANIM_PROBE_JS = (
    "(function(){try{if(!window.__jkRafN){window.__jkRafN=0;var o=window.requestAnimationFrame;"
    "window.requestAnimationFrame=function(f){window.__jkRafN++;return o.call(window,f);};}"
    "window.__jkRaf0=window.__jkRafN;window.__jkRafT=performance.now();"
    "var a=(document.getAnimations?document.getAnimations():[]).filter(function(x){"
    "return x.playState==='running';}).slice(0,6).map(function(x){var t=x.effect&&x.effect.target;"
    "var d=t?(t.tagName.toLowerCase()+(t.id?'#'+t.id:'')+(t.className&&t.className.baseVal===undefined"
    "?'.'+String(t.className).trim().split(/\\s+/).join('.'):'')):'?';"
    "return (x.animationName||x.transitionProperty||x.constructor.name)+'@'+d+"
    "(x.effect&&x.effect.getTiming?' x'+x.effect.getTiming().iterations:'');});"
    "return a.join(' , ')||'none';}catch(e){return 'err '+e;}})()")
_RAF_READ_JS = ("(function(){var n=(window.__jkRafN||0)-(window.__jkRaf0||0);"
                "var s=(performance.now()-(window.__jkRafT||performance.now()))/1000;"
                "return s>0?Math.round(n/s):0;})()")


def _idle_frame_hunt():
    from aqt import mw
    from aqt.qt import QTimer
    views = [("main", getattr(mw, "web", None)),
             ("toolbar", getattr(getattr(mw, "toolbar", None), "web", None)),
             ("bottom", getattr(mw, "bottomWeb", None))]
    try:
        from ..features import stats_embed
        views.append(("stats", stats_embed._web))
    except Exception:
        pass
    for name, v in views:
        if v is None:
            continue
        try:
            def got_anims(res, name=name, v=v):
                def got_raf(n):
                    _w("idle-hunt %-7s visible=%s rAF/s=%s anims: %s"
                       % (name, v.isVisible() and v.height() > 0, n, res))
                QTimer.singleShot(1000, lambda: v.page().runJavaScript(_RAF_READ_JS, got_raf))
            v.page().runJavaScript(_ANIM_PROBE_JS, got_anims)
        except Exception as e:
            _w("idle-hunt %s failed %r" % (name, e))


def install():
    if not _ON:
        return
    from aqt import mw, gui_hooks
    from aqt.deckbrowser import DeckBrowser
    try:
        from aqt.qt import QTimer
        t = QTimer(mw)
        t.setInterval(15000)
        t.timeout.connect(_idle_frame_hunt)
        t.start()
        mw._jk_idle_hunt = t
    except Exception as e:
        _w("idle hunt install failed %r" % e)

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
    mw.web.loadFinished.connect(_loaded)

    lh = getattr(mw.toolbar, "link_handlers", {}) or {}
    for key, fn in list(lh.items()):
        def clicked(*a, _fn=fn, _k=key, **k):
            begin("toolbar click: %s" % _k)
            return _fn(*a, **k)
        lh[key] = clicked
    _w("probe installed; toolbar links: %s" % ",".join(lh))
    install_review()


def install_review():
    """Stages of opening a deck → first card on screen."""
    if not _ON:
        return
    from aqt import gui_hooks
    from aqt.reviewer import Reviewer
    from aqt import mw

    o_show, o_next, o_sq = Reviewer.show, Reviewer.nextCard, Reviewer._showQuestion

    def show(self, *a, **k):
        begin("open deck → review")
        mark("Reviewer.show (page reload starts)")
        r = o_show(self, *a, **k)
        mark("Reviewer.show returned")
        return r

    def nxt(self, *a, **k):
        mark("nextCard (queue fetch)")
        r = o_next(self, *a, **k)
        mark("nextCard returned")
        return r

    def sq(self, *a, **k):
        mark("_showQuestion start")
        r = o_sq(self, *a, **k)
        mark("_showQuestion done (card sent to page)")
        return r
    Reviewer.show, Reviewer.nextCard, Reviewer._showQuestion = show, nxt, sq

    try:
        h = gui_hooks.card_will_show
        for i, cb in enumerate(list(h._hooks)):
            def timed(text, card, kind, _cb=cb):
                a = time.perf_counter()
                out = _cb(text, card, kind)
                d = (time.perf_counter() - a) * 1000
                if d > 2:
                    _w("    card_will_show %s.%s %.0fms" % (getattr(_cb, "__module__", "?"),
                                                            getattr(_cb, "__name__", "?"), d))
                return out
            h._hooks[i] = timed
    except Exception as e:
        _w("cws wrap failed %r" % e)
    try:
        gui_hooks.reviewer_did_show_question.append(lambda c: mark("reviewer_did_show_question"))
    except Exception:
        pass
    _w("review probe installed")
