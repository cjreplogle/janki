"""Remote navigation on the review screen (Onigiri): the d-pad reaches the top pills
(Decks, Sync…) and the answer bar (Show Answer / the grades).

Contanki reads the pad in the page and sends `contanki::poll::<buttons>::<axes>` to
Python. Janki sits in front of its poll: on the review and deck-preview screens the
d-pad is taken out before Contanki sees it (its Flag / Bury / Replay and Back / Forward
d-pad bindings stand down there), and on the review screen Janki drives it:

  ↑ at the top of the card  → the top pills; ←/→ move, ↓ goes back to the card
  ↓ at the bottom of the card → the answer bar; ←/→ move, ↑ goes back to the card
  ↑/↓ elsewhere scroll the card; A (any face button) presses the selected item

While a pill or bar button is selected Contanki gets no input at all (A would also flip
or grade the card), and after a press it waits until the buttons are let go, so the
press can't carry over into the next screen. The deck preview drives its own nav in
the page (integrations/onigiri.py)."""
from aqt import gui_hooks, mw
from aqt.qt import QTimer

from ..util.config import log

_mode = None            # None | "top" | "bot"
_last = {}              # d-pad direction / face → was held on the last poll
_hold = False           # after a press: give Contanki nothing until every button is up

# The answer bar is a separate web view: select / move / press its buttons there.
_BOT_JS = r"""(function(op){
 var bs=[].filter.call(document.querySelectorAll('#outer button'),function(b){
   var r=b.getBoundingClientRect();return r.width>4&&r.height>4&&getComputedStyle(b).visibility!=='hidden';})
   .sort(function(a,b){return a.getBoundingClientRect().left-b.getBoundingClientRect().left;});
 var c=document.querySelector('.jk-rn-sel');
 function sel(b){if(c){c.classList.remove('jk-rn-sel');c.style.removeProperty('box-shadow');}
   c=b;if(!b)return;b.classList.add('jk-rn-sel');
   b.style.setProperty('box-shadow','0 0 0 2px rgba(176,203,246,.9)','important');}
 if(op==='off'){sel(null);return;}
 if(op==='enter'){sel(document.getElementById('ansbut')||document.querySelector('#outer button[data-ease="3"]')
   ||bs[Math.floor(bs.length/2)]||null);return;}
 if(op==='click'){var x=c;sel(null);if(x)x.click();return;}
 var i=bs.indexOf(c);if(i<0){sel(bs[0]||null);return;}
 sel(bs[Math.max(0,Math.min(bs.length-1,i+(op==='right'?1:-1)))]);
})(%s)"""

# Card page: scrolling, and the top pills (inside Onigiri's header shadow root).
PAGE_JS = r"""<script>(function(){if(window.jkRNav)return;
 var m=null,i=0;
 function F(){return document.getElementById('jk-sc')||document.scrollingElement||document.documentElement;}
 function pills(){var h=document.getElementById('onigiri-reviewer-ui-host'),r=h&&h.shadowRoot;
   if(!r)return [];return [].filter.call(r.querySelectorAll('.onigiri-reviewer-button'),function(e){
     var b=e.getBoundingClientRect();return b.width>4&&b.height>4;});}
 function mark(){pills().forEach(function(e,j){if(m==='top'&&j===i){
     e.style.setProperty('outline','2px solid rgba(176,203,246,.9)','important');
     e.style.setProperty('outline-offset','2px','important');}
   else{e.style.removeProperty('outline');e.style.removeProperty('outline-offset');}});}
 function sfx(){try{if(window.__jkPlay&&__jkPlay('move'))return;pycmd('janki:sfx:move');}catch(x){}}
 function off(){m=null;mark();try{pycmd('janki:rnav:off');}catch(x){}}
 // a Practice question's own pad / arrow handling picks choices with ↑/↓
 function choosing(){var b=document.getElementById('jp-choices');
   return !!(b&&!b.classList.contains('jp-locked')&&document.querySelector('.jp-choice'));}
 window.jkRNavOn=function(){return !!m;};
 var lastT={};
 window.jkRNav=function(k){var f=F(),ps;
   // one press can arrive twice (Python's pad poll and the page's own pad reader)
   if(m==='top'&&k!=='off'){var t=Date.now();if(t-(lastT[k]||0)<150)return;lastT[k]=t;}
   if(k==='off'){if(m){m=null;mark();}return;}
   // ↑ above a Practice question's first choice (practice_keys) lands here
   // ↓ below a Practice question's last choice: on to the answer bar (Python drives it)
   if(k==='bar'){m='bot';sfx();pycmd('janki:rnav:bot');return;}
   // back up from the answer bar: a Practice question lands on its last choice
   if(k==='frombar'){m=null;window.__jkRNavOffAt=Date.now();
     if(choosing()){window.__jkRNavSynth=true;
       try{window.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowUp',bubbles:true,cancelable:true}));}
       finally{window.__jkRNavSynth=false;}}return;}
   if(k==='pills'){if(!pills().length)return;m='top';i=0;sfx();mark();pycmd('janki:rnav:top');return;}
   if(m==='top'){ps=pills();
     if(k==='left'||k==='right'){var n=Math.max(0,Math.min(ps.length-1,i+(k==='right'?1:-1)));
       if(n!==i){i=n;sfx();mark();}return;}
     if(k==='down'){sfx();off();
       // Practice question: back onto the first choice (its picker starts there on ↓)
       // (the page's own pad reader turns this same press into a ↓ too: practice_keys
       // drops arrows for 0.2 s after leaving the pills, except this one)
       window.__jkRNavOffAt=Date.now();
       if(choosing()){window.__jkRNavSynth=true;
         try{window.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowDown',bubbles:true,cancelable:true}));}
         finally{window.__jkRNavSynth=false;}}
       return;}
     if(k==='enter'){var e=ps[i];off();if(e)e.click();return;}
     return;}
   if(k==='up'){
     if(f.scrollTop<=1&&!(choosing()&&document.querySelector('.jp-choice.jp-kb'))){
       if(!pills().length)return;m='top';i=0;sfx();mark();pycmd('janki:rnav:top');return;}
     if(!choosing())f.scrollBy({top:-160,behavior:'smooth'});return;}
   if(k==='down'){if(choosing())return;
     if(f.scrollTop+f.clientHeight>=f.scrollHeight-2){m='bot';sfx();pycmd('janki:rnav:bot');return;}
     f.scrollBy({top:160,behavior:'smooth'});return;}
 };
 // While a pill or the bar is selected, arrow keys / Enter drive it whatever sent them:
 // on a Practice question the d-pad arrives as keys from the page's own pad reader
 // (it never reaches Python's Contanki poll). Window capture, registered before the
 // Practice picker's, so it never sees them.
 var OP={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',Enter:'enter',' ':'enter'};
 window.addEventListener('keydown',function(e){if(e.metaKey||e.ctrlKey||e.altKey)return;
   // keyboard: ↑ at the top of the card → the Decks pill; ↓ at the bottom → the answer bar
   // (the same moves the d-pad makes; a Practice question's choices keep their arrows)
   if(!m){var f0=F(),t=e.target;
     if(t&&(t.isContentEditable||/INPUT|TEXTAREA|SELECT/.test(t.tagName))||choosing())return;
     if(e.key==='ArrowUp'&&f0.scrollTop<=1&&pills().length){e.preventDefault();e.stopImmediatePropagation();
       window.jkRNav('up');}
     else if(e.key==='ArrowDown'&&f0.scrollTop+f0.clientHeight>=f0.scrollHeight-2){
       e.preventDefault();e.stopImmediatePropagation();window.jkRNav('down');}
     return;}
   var op=OP[e.key];if(!op)return;e.preventDefault();e.stopImmediatePropagation();
   if(m==='top')window.jkRNav(op);else pycmd('janki:rnav:key:'+op);},true);
 document.addEventListener('mousemove',function(e){
   if(m&&Math.abs(e.movementX)+Math.abs(e.movementY)>3)off();},true);
})();</script>"""


def _dirs(b, a):
    def btn(n):
        return n < len(b) and b[n]
    x = a[0] if len(a) > 0 else 0.0
    y = a[1] if len(a) > 1 else 0.0
    return {"up": btn(12) or y < -0.5, "down": btn(13) or y > 0.5,
            "left": btn(14) or x < -0.5, "right": btn(15) or x > 0.5,
            "face": any(btn(n) for n in range(5))}


def _strip_dpad(b, a):
    b = list(b)
    for n in (12, 13, 14, 15):
        if n < len(b):
            b[n] = False
    a = list(a)
    for n in (0, 1):
        if n < len(a):
            a[n] = 0.0
    return b, a


def _fmt(b, a):
    return ",".join("true" if x else "false" for x in b), ",".join(repr(float(x)) for x in a)


def set_mode(m):
    global _mode
    if _mode == "bot" and m != "bot":
        _bot("off")
    _mode = m
    if m == "bot":
        _bot("enter")


def _bot(op):
    import json
    try:
        bw = getattr(mw, "bottomWeb", None)
        if bw is not None:
            bw.eval(_BOT_JS % json.dumps(op))
    except Exception as e:
        log("review nav bar: %s" % e)


def _page(op):
    try:
        mw.web.eval("window.jkRNav&&jkRNav(%r)" % op)
    except Exception:
        pass


_lastop = {}


def _dup(op):
    """The same press can come twice (Contanki's poll and the page's own pad reader)."""
    import time
    t = time.monotonic()
    if t - _lastop.get(op, 0) < 0.15:
        return True
    _lastop[op] = t
    return False


def _bar_key(op):
    if _dup("bar:" + op):
        return
    if op in ("left", "right"):
        _bot(op)
    elif op == "up":
        set_mode(None)
        _page("frombar")
    elif op == "enter":
        _press()


def remote_press() -> bool:
    """A face button from Janki's own controller path (keytap, Practice cards): press
    the selected pill / bar button. True = handled (also while that press is held)."""
    if _mode:
        if not _dup("press"):
            _press()
        return True
    return bool(_hold)


def _dir(k):
    if _mode == "bot":
        if k != "down":
            _bar_key(k)
        return
    _page(k)          # the page decides: scroll, enter the pills / the bar, move


def _clear_hold():
    global _hold
    _hold = False


def _press():
    global _hold, _mode
    _hold = True
    # Contanki's poll clears this once every button is up — but on a Practice card the
    # pad comes through the page / keytap instead, so it would never clear and every
    # later A would be swallowed: a timeout backs it up
    QTimer.singleShot(600, _clear_hold)
    if _mode == "bot":
        _mode = None                # (the click clears the bar's selection itself)
        _page("off")                # …and the card page's "bar selected" mark
        _bot("click")
    elif _mode == "top":
        _page("enter")


def _wrap(inst):
    orig = inst.poll
    if getattr(orig, "_jk_rnav", False):
        return

    def poll(input_buttons, input_axes, *rest):
        global _hold
        st = getattr(mw, "state", None)
        # deckBrowser = Decks, Calendar and Practice: Janki's in-page nav drives the
        # d-pad there, and Contanki's ← Back / → Forward reloaded the page or jumped
        # to the deck preview underneath it
        if st not in ("review", "overview", "deckBrowser"):
            if _mode:
                set_mode(None)
            if _hold:
                return None if _held(input_buttons, input_axes) else _release(orig, input_buttons, input_axes, rest)
            return orig(input_buttons, input_axes, *rest)
        try:
            b = [x == "true" for x in input_buttons.split(",")]
            a = [float(x) for x in input_axes.split(",")] if input_axes else []
        except Exception:
            return orig(input_buttons, input_axes, *rest)
        d = _dirs(b, a)
        if st == "review":
            for k in ("up", "down", "left", "right"):
                if d[k] and not _last.get(k):
                    _dir(k)
            if d["face"] and not _last.get("face") and _mode and not _dup("press"):
                _press()
        _last.update(d)
        if _hold:
            if any(d.values()):
                return None
            _hold = False
        if _mode:
            return None                      # a pill / bar button is selected
        sb, sa = _strip_dpad(b, a)
        return orig(*_fmt(sb, sa), *rest)

    def _held(bs, ax):
        try:
            b = [x == "true" for x in bs.split(",")]
            a = [float(x) for x in ax.split(",")] if ax else []
            return any(_dirs(b, a).values())
        except Exception:
            return False

    def _release(o, bs, ax, rest):
        global _hold
        _hold = False
        return o(bs, ax, *rest)

    poll._jk_rnav = True
    inst.poll = poll


def _find_contanki():
    try:
        for h in list(getattr(gui_hooks.webview_did_receive_js_message, "_hooks", [])):
            inst = getattr(h, "__self__", None)
            if inst is not None and hasattr(inst, "poll") and hasattr(inst, "profile") \
                    and type(inst).__module__.split(".")[0].isdigit():
                return inst
    except Exception as e:
        log("review nav: %s" % e)
    return None


def _hook():
    inst = _find_contanki()
    if inst is not None:
        _wrap(inst)
    return inst is not None


def _on_js(handled, message, context):
    if not (isinstance(message, str) and message.startswith("janki:rnav:")):
        return handled
    m = message[len("janki:rnav:"):]
    if m.startswith("key:"):
        if _mode == "bot":
            _bar_key(m[4:])
        return (True, None)
    set_mode({"top": "top", "bot": "bot"}.get(m))
    return (True, None)


def _reset(*_a):
    _page("off")
    if _mode:
        set_mode(None)


def install():
    gui_hooks.webview_did_receive_js_message.append(_on_js)
    gui_hooks.state_did_change.append(_reset)
    gui_hooks.reviewer_did_show_question.append(_reset)
    gui_hooks.reviewer_did_show_answer.append(_reset)

    def tries(n=0):
        if not _hook() and n < 10:
            QTimer.singleShot(1000, lambda: tries(n + 1))
    gui_hooks.profile_did_open.append(lambda: QTimer.singleShot(500, tries))
