"""Arrow keys on a practice question: ↑/↓ (or ←/→) highlight an answer choice,
Enter/Space picks it — the same pick() a click runs (tint, explanation, grade).
With nothing highlighted, Enter/Space keep Anki's normal behaviour."""
from aqt import gui_hooks, mw

from ..util.config import log

_JS = r"""<script>(function(){
 // right/wrong chime on any pick (click, key or remote) — per card: each card
 // brings new answer boxes, so this part runs every time
 var box=document.getElementById('jp-choices');
 if(box&&!box.__jkObs&&window.MutationObserver){box.__jkObs=true;var played=false;
   new MutationObserver(function(){if(played)return;
     var f=function(n){try{pycmd('janki:sfx:'+n);}catch(x){}};
     if(box.querySelector('.jp-right')){played=true;f('right');}
     else if(box.querySelector('.jp-wrong')){played=true;f('wrong');}})
   .observe(box,{subtree:true,attributes:true,attributeFilter:['class']});}
})();
// Show Answer keeps your place: Anki only scrolls on the answer side to an #answer
// marker, which Practice cards don't have, so swapping in the answer jumped to the top.
(function(){
 if(window.__jkPqKeep||typeof window._showAnswer!=='function')return; window.__jkPqKeep=true;
 var orig=window._showAnswer;
 window._showAnswer=function(){
   var y=window.pageYOffset||0, qa=document.getElementById('qa');
   // the answer side glides the question from where it was on the question side
   // (qbank's jp_stem_top): record that NOW — the value saved 0.35 s / 0.9 s after the
   // card appeared could predate its settling, so the answer started lower and slid up
   try{var st=document.querySelector('.jp-stem');
     if(st&&!document.querySelector('.jp-answered'))
       sessionStorage.setItem('jp_stem_top',st.getBoundingClientRect().top);}catch(x){}
   if(!document.getElementById('jp-choices')||!qa||y<2)return orig.apply(this,arguments);
   var done=false, moved=false, set=function(){if(!moved)window.scrollTo(0,y);};
   var onWheel=function(){moved=true;};
   addEventListener('wheel',onWheel,{passive:true,once:true});
   var mo=new MutationObserver(function(){if(done)return;done=true;mo.disconnect();
     set();requestAnimationFrame(set);setTimeout(set,120);setTimeout(set,400);
     setTimeout(function(){removeEventListener('wheel',onWheel);},500);});
   mo.observe(qa,{childList:true,subtree:true});
   setTimeout(function(){mo.disconnect();},2000);
   return orig.apply(this,arguments);};
})();
(function(){
 if(window.__jkPqKeys)return; window.__jkPqKeys=true;
 function vis(){var box=document.getElementById('jp-choices')||document.body;
   if(box.classList&&box.classList.contains('jp-locked'))return [];
   return Array.prototype.filter.call(document.querySelectorAll('.jp-choice'),
     function(e){return !e.classList.contains('jp-dropped')&&e.offsetParent!==null;});}
 function cur(){return document.querySelector('.jp-choice.jp-kb');}
 // in-page sound first (see sfx.web_player): a pycmd round trip to QSoundEffect
 // holds up the outline's redraw, which made arrowing through answers lag
 function sfx(n){try{if(window.__jkPlay&&window.__jkPlay(n))return;pycmd('janki:sfx:'+n);}catch(x){}}
 // One floating outline that glides between choices (transform/size only — the
 // card's layout never moves).
 function ring(){var g=document.getElementById('jk-pq-sel');if(g)return g;
   g=document.createElement('div');g.id='jk-pq-sel';document.body.appendChild(g);return g;}
 function place(e,animate){var g=ring(),r=e.getBoundingClientRect(),p=4;
   g.style.transition=animate?'':'none';
   g.style.width=(r.width+2*p)+'px';g.style.height=(r.height+2*p)+'px';
   // fixed + viewport coordinates: cards scroll in Janki's frame (#jk-sc), whose scroll
   // window.scrollY reports — added to an absolute ring it pushed the ring below the
   // answers by however far the card was scrolled
   g.style.transform='translate('+(r.left-p)+'px,'+(r.top-p)+'px)';
   if(!animate){void g.offsetWidth;g.style.transition='';}}
 function sel(e){var c=cur();if(c)c.classList.remove('jp-kb');var g=ring();
   if(!e){g.style.opacity='0';return;}
   var first=!c; e.classList.add('jp-kb');
   var r=e.getBoundingClientRect();if(r.top<0||r.bottom>innerHeight)e.scrollIntoView({block:'nearest'});
   place(e,!first); g.style.opacity='1';}
 addEventListener('resize',function(){var c=cur();if(c)place(c,false);
   if(window.__jkPqFollow)window.__jkPqFollow(600);});
 // keep the outline on its answer if the layout shifts (images loading, the choices
 // re-sizing) — re-place without animating
 var ro=window.ResizeObserver?new ResizeObserver(function(){var c=cur();if(c)place(c,false);}):null;
 if(ro){ro.observe(document.body);}
 addEventListener('scroll',function(){var c=cur();if(c)place(c,false);},{passive:true});
 // Focus Mode on/off slides the card with transforms (no resize, no scroll), so
 // while anything on the page is transitioning/animating, re-place every frame
 var until=0,raf=0;
 function follow(){var c=cur();if(c)place(c,false);
   raf=performance.now()<until?requestAnimationFrame(follow):0;}
 function moving(ev){if(ev.target&&ev.target.id==='jk-pq-sel')return;if(!cur())return;
   until=Math.max(until,performance.now()+900);if(!raf)raf=requestAnimationFrame(follow);}
 ['transitionrun','transitionend','animationstart','animationend'].forEach(function(n){
   document.addEventListener(n,moving,true);});
 // el.animate() (Focus Mode's slide) fires none of those: focus.py calls this instead
 window.__jkPqFollow=function(ms){if(!cur())return;
   until=Math.max(until,performance.now()+(ms||900));if(!raf)raf=requestAnimationFrame(follow);};
 // While keys/remote drive the selection, the mouse's own hover highlight is paused so
 // only one answer ever looks selected; real mouse movement hands control back.
 var lastM=null;
 document.addEventListener('mousemove',function(e){var p=[e.screenX,e.screenY];
   if(!lastM){lastM=p;return;} var mv=Math.abs(p[0]-lastM[0])+Math.abs(p[1]-lastM[1]); lastM=p;
   if(mv<3||!document.documentElement.classList.contains('jk-kbnav'))return;
   document.documentElement.classList.remove('jk-kbnav'); sel(null);},{passive:true});
 // window-capture runs before any document listener, so the card's older A–D picker
 // (which mistook "ArrowDown" for "a") never sees the arrows
 window.addEventListener('keydown',function(ev){
   if(ev.metaKey||ev.ctrlKey||ev.altKey)return;
   var k=ev.key; if(!/^Arrow(Up|Down|Left|Right)$/.test(k))return;
   ev.stopImmediatePropagation();
   // the remote is on the top pills (review_nav): its d-pad is driven from Python
   if(window.jkRNavOn&&window.jkRNavOn())return;
   if(!window.__jkRNavSynth&&Date.now()-(window.__jkRNavOffAt||0)<200)return;
   if(document.querySelector('.jp-answered'))return;
   var v=vis(); if(!v.length)return;
   ev.preventDefault(); ev.stopPropagation();
   document.documentElement.classList.add('jk-kbnav');
   var c=cur(), i=c?v.indexOf(c):-1, d=(k==='ArrowDown'||k==='ArrowRight')?1:-1;
   // ↑ above the first answer leaves the choices for the toolbar, on Practice — the
   // way ↑ on a normal card goes up to the toolbar
   // ↓ below the last answer: on to Show Answer / the answer bar (Onigiri, review_nav)
   if(k==='ArrowDown'&&i===v.length-1&&window.jkRNav){sel(null);
     document.documentElement.classList.remove('jk-kbnav');window.jkRNav('bar');return;}
   if(k==='ArrowUp'&&i===0){sel(null);document.documentElement.classList.remove('jk-kbnav');
     // Onigiri: on to its top pills (Decks, Sync…) — Janki's toolbar is hidden there
     if(window.jkRNav){window.jkRNav('pills');return;}
     sfx('move');try{pycmd('janki:toolbar:practice');}catch(x){}return;}
   sfx('move'); sel(v[i<0?(d>0?0:v.length-1):Math.max(0,Math.min(v.length-1,i+d))]);
 },true);
 // Python asks this on Enter/Space: pick the highlighted choice if there is one.
 window.jankiPickHighlighted=function(){var c=cur();if(!c||!vis().length)return false;
   sel(null);document.documentElement.classList.remove('jk-kbnav');
   if(c.__jpPick)c.__jpPick();else c.click();return true;};
 // the d-pad script's Enter (a synthetic key — it never reaches Anki's own Enter
 // handling): press the highlighted choice
 window.addEventListener('keydown',function(ev){if(ev.isTrusted||ev.key!=='Enter')return;
   if(window.jankiPickHighlighted()){ev.preventDefault();ev.stopImmediatePropagation();}},true);
})();</script>
<style>html.jk-kbnav .jp-choice{pointer-events:none;}
#jk-pq-sel{position:fixed;left:0;top:0;pointer-events:none;z-index:50;
 border:2px solid rgba(156,188,243,.85);border-radius:10px;box-sizing:border-box;opacity:0;
 transition:transform .18s cubic-bezier(.2,.8,.2,1),width .18s cubic-bezier(.2,.8,.2,1),
 height .18s cubic-bezier(.2,.8,.2,1),opacity .15s ease;}</style>"""


def _is_practice(card):
    try:
        from ..integrations import qbank
        return card.note().note_type()["name"] == qbank._MODEL_NAME
    except Exception:
        return False


def _dpad_js():
    try:
        from ..user import css as _css
        # Face buttons don't send Enter here (with remote mode they pick A/B/C/D) —
        # EXCEPT while a choice is highlighted with the d-pad: then they press it.
        # Remote mode handles that natively (keytap._practice_remote_pick), so only
        # add it here when remote mode is off (no double press).
        from ..util.config import _cfg
        face = ("" if _cfg().get("practice_remote_mode", False) else
                "edge(i+'a',(b(0)||b(1)||b(2)||b(3))&&!!document.querySelector"
                "('.jp-choice.jp-kb'),'Enter');")
        js = _css._PAD_NAV_JS.replace("edge(i+'a',b(0)||b(1)||b(2)||b(3),'Enter');", face)
        return "<script>" + js + "</script>"
    except Exception:
        return ""


def _web_sfx():
    try:
        from . import sfx as _sfx
        # the reviewer page outlives each card: load the player once, not per card
        return _sfx.web_player(("move",)).replace(
            "<script>(function(){", "<script>(function(){if(window.__jkPlay)return;", 1)
    except Exception as e:
        log("practice keys sfx: %s" % e)
        return ""


def _on_card_will_show(text, card, kind):
    if isinstance(kind, str) and kind == "reviewQuestion" and _is_practice(card):
        return text + _web_sfx() + _JS + _dpad_js()
    return text


def _wrap_enter():
    from aqt.reviewer import Reviewer
    orig = Reviewer.onEnterKey
    if getattr(orig, "_jk_pq", False):
        return

    def onEnterKey(self, *a, **k):
        try:
            if self.state == "question" and self.card is not None and _is_practice(self.card):
                def _cb(picked, _self=self):
                    if not picked:
                        orig(_self, *a, **k)
                self.web.evalWithCallback(
                    "window.jankiPickHighlighted?window.jankiPickHighlighted():false", _cb)
                return None
        except Exception as e:
            log("practice keys: %s" % e)
        return orig(self, *a, **k)
    onEnterKey._jk_pq = True
    Reviewer.onEnterKey = onEnterKey


def install():
    gui_hooks.card_will_show.append(_on_card_will_show)
    try:
        _wrap_enter()
    except Exception as e:
        log("practice keys wrap: %s" % e)
