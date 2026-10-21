"""Opt-in frame-rate meter (diagnostics). Active only while ~/.janki_fps exists.

Every second, each web view (main page, toolbar, bottom strip) reports the frames it
drew, its slowest frame and how many frames took over 50 ms; the main thread reports
how late a 16 ms timer fired (Qt event-loop lag — on the glass, frames reach the
screen through it). One line per second goes to ~/.janki_fps.log, tagged with the
screen (mw.state) and what was happening (scrolling, animations running)."""
import json
import os
import time

_FLAG = os.path.expanduser("~/.janki_fps")
_LOG = os.path.expanduser("~/.janki_fps.log")

# rAF counter in the page; reports once a second. Uses rAF only while measuring (the
# probe is a diagnostic: with --disable-frame-rate-limit rAF may run past 60).
_JS = r"""(function(tag){if(window.__jkFps)return;window.__jkFps=1;
 var n=0,worst=0,slow=0,last=performance.now(),t0=last,scr=0;
 addEventListener('scroll',function(){scr++;},{passive:true,capture:true});
 function f(now){var d=now-last;last=now;n++;if(d>worst)worst=d;if(d>50)slow++;
  if(now-t0>=1000){var a=0;try{a=document.getAnimations().length;}catch(e){}
   try{pycmd('janki:fps:'+JSON.stringify({v:tag,fps:Math.round(n*1000/(now-t0)),
    worst:Math.round(worst),slow:slow,scroll:scr,anims:a}));}catch(e){}
   n=0;worst=0;slow=0;scr=0;t0=now;}
  requestAnimationFrame(f);}
 requestAnimationFrame(f);})(%s);"""

_lag = {"max": 0.0, "sum": 0.0, "n": 0, "last": 0.0}
_pending = {}


def _views():
    from aqt import mw
    return (("main", getattr(mw, "web", None)), ("top", getattr(mw, "toolbarWeb", None)),
            ("bottom", getattr(mw, "bottomWeb", None)))


def _arm(*_a):
    for tag, web in _views():
        try:
            if web is not None:
                web.eval(_JS % json.dumps(tag))
        except Exception:
            pass


def _write(line):
    try:
        with open(_LOG, "a", encoding="utf-8") as f:
            f.write(line + "\n")
    except Exception:
        pass


def _on_msg(handled, message, context):
    if not isinstance(message, str) or not message.startswith("janki:fps:"):
        return handled
    try:
        d = json.loads(message[10:])
        from aqt import mw
        _pending[d["v"]] = d
        if d["v"] == "main":           # one line per second, keyed on the main page
            lag = _lag
            avg = lag["sum"] / lag["n"] if lag["n"] else 0
            parts = ["%s %-11s" % (time.strftime("%H:%M:%S"), getattr(mw, "state", "?"))]
            for tag in ("main", "top", "bottom"):
                v = _pending.pop(tag, None)
                if v:
                    parts.append("%s %3dfps worst %4dms slow %d%s%s" % (
                        tag, v["fps"], v["worst"], v["slow"],
                        " scroll" if v.get("scroll") else "",
                        " anim%d" % v["anims"] if v.get("anims") else ""))
            parts.append("qt lag avg %.0fms max %.0fms" % (avg, lag["max"]))
            lag.update(max=0.0, sum=0.0, n=0)
            _write(" | ".join(parts))
    except Exception:
        pass
    return (True, None)


def install():
    if not os.path.exists(_FLAG):
        return
    from aqt import mw, gui_hooks
    from aqt.qt import QTimer
    _write("=== fps probe on (%s) ===" % time.strftime("%Y-%m-%d %H:%M:%S"))
    gui_hooks.webview_did_receive_js_message.append(_on_msg)
    for _tag, web in _views():
        try:
            web.loadFinished.connect(_arm)          # a new page: re-arm its counter
        except Exception:
            pass
    gui_hooks.state_did_change.append(lambda *_a: QTimer.singleShot(300, _arm))
    _arm()
    # event-loop lag: a 16 ms timer's lateness (frames reach the screen through it)
    t = QTimer(mw)
    t.setInterval(16)
    _lag["last"] = time.perf_counter()

    def tick():
        now = time.perf_counter()
        late = max(0.0, (now - _lag["last"]) * 1000 - 16)
        _lag["last"] = now
        _lag["sum"] += late
        _lag["n"] += 1
        _lag["max"] = max(_lag["max"], late)
    t.timeout.connect(tick)
    t.start()
    mw._jk_fps_timer = t
