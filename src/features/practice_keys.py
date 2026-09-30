"""Arrow keys on a practice question: ↑/↓ (or ←/→) highlight an answer choice,
Enter/Space picks it — the same pick() a click runs (tint, explanation, grade).
With nothing highlighted, Enter/Space keep Anki's normal behaviour."""
from aqt import gui_hooks, mw

from ..util.config import log

_JS = r"""<script>(function(){
 if(window.__jkPqKeys)return; window.__jkPqKeys=true;
 function vis(){var box=document.getElementById('jp-choices')||document.body;
   if(box.classList&&box.classList.contains('jp-locked'))return [];
   return Array.prototype.filter.call(document.querySelectorAll('.jp-choice'),
     function(e){return !e.classList.contains('jp-dropped')&&e.offsetParent!==null;});}
 function cur(){return document.querySelector('.jp-choice.jp-kb');}
 // One floating outline that glides between choices (transform/size only — the
 // card's layout never moves).
 function ring(){var g=document.getElementById('jk-pq-sel');if(g)return g;
   g=document.createElement('div');g.id='jk-pq-sel';document.body.appendChild(g);return g;}
 function place(e,animate){var g=ring(),r=e.getBoundingClientRect(),p=4;
   g.style.transition=animate?'':'none';
   g.style.width=(r.width+2*p)+'px';g.style.height=(r.height+2*p)+'px';
   g.style.transform='translate('+(r.left+scrollX-p)+'px,'+(r.top+scrollY-p)+'px)';
   if(!animate){void g.offsetWidth;g.style.transition='';}}
 function sel(e){var c=cur();if(c)c.classList.remove('jp-kb');var g=ring();
   if(!e){g.style.opacity='0';return;}
   var first=!c; e.classList.add('jp-kb');
   var r=e.getBoundingClientRect();if(r.top<0||r.bottom>innerHeight)e.scrollIntoView({block:'nearest'});
   place(e,!first); g.style.opacity='1';}
 addEventListener('resize',function(){var c=cur();if(c)place(c,false);});
 // keep the outline on its answer if the layout shifts (images loading, the choices
 // re-sizing) — re-place without animating
 var ro=window.ResizeObserver?new ResizeObserver(function(){var c=cur();if(c)place(c,false);}):null;
 if(ro){ro.observe(document.body);}
 addEventListener('scroll',function(){var c=cur();if(c)place(c,false);},{passive:true});
 // While keys/remote drive the selection, the mouse's own hover highlight is paused so
 // only one answer ever looks selected; real mouse movement hands control back.
 var lastM=null;
 document.addEventListener('mousemove',function(e){var p=[e.screenX,e.screenY];
   if(!lastM){lastM=p;return;} var mv=Math.abs(p[0]-lastM[0])+Math.abs(p[1]-lastM[1]); lastM=p;
   if(mv<3||!document.documentElement.classList.contains('jk-kbnav'))return;
   document.documentElement.classList.remove('jk-kbnav'); sel(null);},{passive:true});
 document.addEventListener('keydown',function(ev){
   if(ev.metaKey||ev.ctrlKey||ev.altKey)return;
   var k=ev.key; if(!/^Arrow(Up|Down|Left|Right)$/.test(k))return;
   if(document.querySelector('.jp-answered'))return;
   var v=vis(); if(!v.length)return;
   ev.preventDefault(); ev.stopPropagation();
   document.documentElement.classList.add('jk-kbnav');
   var c=cur(), i=c?v.indexOf(c):-1, d=(k==='ArrowDown'||k==='ArrowRight')?1:-1;
   sel(v[i<0?(d>0?0:v.length-1):Math.max(0,Math.min(v.length-1,i+d))]);
 },true);
 // Python asks this on Enter/Space: pick the highlighted choice if there is one.
 window.jankiPickHighlighted=function(){var c=cur();if(!c||!vis().length)return false;
   sel(null);document.documentElement.classList.remove('jk-kbnav');
   if(c.__jpPick)c.__jpPick();else c.click();return true;};
})();</script>
<style>html.jk-kbnav .jp-choice{pointer-events:none;}
#jk-pq-sel{position:absolute;left:0;top:0;pointer-events:none;z-index:50;
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
        js = _css._PAD_NAV_JS.replace("edge(i+'a',b(0)||b(1)||b(2)||b(3),'Enter');", "")
        return "<script>" + js + "</script>"
    except Exception:
        return ""


def _on_card_will_show(text, card, kind):
    if isinstance(kind, str) and kind == "reviewQuestion" and _is_practice(card):
        return text + _JS + _dpad_js()
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
