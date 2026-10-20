"""Reorder and re-nest decks in the deck list by dragging, like an outliner.

Up/down picks the spot (the list slides open there); left/right picks the level (the
dragged deck's name slides with it, and the deck it would go into is highlighted). Sliding
a subdeck up out of its parent drops it to the outer level by itself; nudge right to put
it inside the deck above, left to bring it out a level. Open subdecks travel along.
Holding it over the middle of another deck's row for a moment drops it INTO that deck.

Only the deck list's order changes — names, cards and scheduling are untouched. The order
lives in the collection config (`janki_deck_order`: parent id → child ids), so it syncs,
and each move is one undo step ("Reorder Decks"). Decks with no stored place keep Anki's
alphabetical order after the placed ones.
"""
from aqt import gui_hooks, mw

from ..util.config import log

_KEY = "janki_deck_order"
QUIET = object()          # initiator of a drop's save: config-change redraws skip it


def _order() -> dict:
    try:
        v = mw.col.get_config(_KEY, {}) or {}
        return v if isinstance(v, dict) else {}
    except Exception:
        return {}


# --------------------------------------------------------------------------- render
def _sort_tree(node, order: dict) -> None:
    """Reorder every level of the due tree in place by the stored order."""
    kids = list(node.children)
    for k in kids:
        _sort_tree(k, order)
    want = order.get(str(int(node.deck_id)))
    if not want or len(kids) < 2:
        return
    rank = {int(d): i for i, d in enumerate(want)}
    big = len(rank)
    srt = sorted(enumerate(kids), key=lambda p: (rank.get(int(p[1].deck_id), big), p[0]))
    if [p[0] for p in srt] == list(range(len(kids))):
        return
    copies = []
    for _i, k in srt:
        c = type(k)()
        c.CopyFrom(k)
        copies.append(c)
    del node.children[:]
    node.children.extend(copies)


def _wrap_render() -> None:
    from aqt.deckbrowser import DeckBrowser
    orig = DeckBrowser._renderDeckTree
    if getattr(orig, "_jk_order", False):
        return

    def _renderDeckTree(self, top, *a, **kw):
        try:
            order = _order()
            if order:
                _sort_tree(top, order)
        except Exception as e:
            log("deck order: %s" % e)
        return orig(self, top, *a, **kw)

    _renderDeckTree._jk_order = True
    DeckBrowser._renderDeckTree = _renderDeckTree


# --------------------------------------------------------------------------- drop handling
def _parent_of(did: int) -> int:
    """Parent deck id (0 = top level)."""
    try:
        name = mw.col.decks.name(did)
        if "::" not in name:
            return 0
        p = mw.col.decks.by_name(name.rsplit("::", 1)[0])
        return int(p["id"]) if p else 0
    except Exception:
        return 0


def _siblings(parent: int) -> list:
    """The parent's children in the order the deck list shows them."""
    try:
        if parent:
            pname = mw.col.decks.name(parent)
            names = [(n, int(d)) for n, d in mw.col.decks.children(parent)
                     if n.count("::") == pname.count("::") + 1]
        else:
            names = [(d.name, int(d.id)) for d in mw.col.decks.all_names_and_ids()
                     if "::" not in d.name]
    except Exception:
        return []
    names.sort(key=lambda p: p[0].lower())
    ids = [d for _n, d in names]
    want = _order().get(str(parent)) or []
    rank = {int(d): i for i, d in enumerate(want)}
    big = len(rank)
    return [d for _i, d in sorted(enumerate(ids), key=lambda p: (rank.get(p[1], big), p[0]))]


def _refresh() -> None:
    try:
        if getattr(mw, "state", None) == "deckBrowser":
            mw.deckBrowser.refresh()
    except Exception:
        pass


def _place(src: int, tgt: int, after: bool) -> None:
    """Background-thread part of a drop: work out the parent's new child order and save
    it. Reads happen here too, not on the main thread (see move())."""
    if src == tgt:
        return
    col = mw.col
    sname, tname = col.decks.name(src), col.decks.name(tgt)
    if tname.startswith(sname + "::"):
        return                                  # can't go beside its own subdeck
    parent = _parent_of(tgt)
    if _parent_of(src) != parent:
        return                                  # the page only drags among siblings
    sib = [d for d in _siblings(parent) if d != src]
    if tgt not in sib:
        return
    sib.insert(sib.index(tgt) + (1 if after else 0), src)
    order = dict(_order())
    order[str(parent)] = sib
    pos = col.add_custom_undo_entry("Reorder Decks")
    col.set_config(_KEY, order, undoable=True)
    col.merge_undo_entries(pos)


def move(src: int, tgt: int, after: bool) -> None:
    """Save a drop. The page already shows the new order (it rearranged its rows), so
    this saves quietly: a tiny undoable config write — no CollectionOp, whose busy cursor
    and operation_did_execute listeners (tray rebuild, deck-list redraws) were a
    second-long "loading" after each drop — and off the main thread, because right after
    launch the collection is busy with startup work (indexing, sync…) and a main-thread
    call waited for it: the spinning cursor on the first drop of a session."""
    def done(fut):
        try:
            fut.result()
            mw.update_undo_actions()
        except Exception as e:
            log("deck order save: %s" % e)

    mw.taskman.run_in_background(lambda: _place(src, tgt, after), done)


def _reveal(did: int) -> None:
    """Expand every collapsed ancestor of a just-moved deck, so a drop into a collapsed
    deck doesn't make it vanish from the list (it looked like the deck disappeared)."""
    try:
        decks = mw.col.decks
        name = decks.name(did)
        parts = name.split("::")
        for i in range(1, len(parts)):
            d = decks.by_name("::".join(parts[:i]))
            if d and d.get("collapsed"):
                d["collapsed"] = False
                decks.save(d)
    except Exception as e:
        log("deck reveal: %s" % e)


def _nest(src: int, parent: int) -> None:
    """Middle-third drop: make `src` a subdeck of `parent` (0 = top level) with Anki's own
    reparent op, then redraw. Anki's plain "drag:" link did reparent but the list never
    redrew here, so the deck looked like it hadn't moved."""
    from aqt.operations.deck import reparent_decks
    def done(_c):
        _reveal(src)
        _refresh()

    reparent_decks(parent=mw, deck_ids=[src], new_parent=parent).success(
        done).run_in_background()


def _move_out(src: int, tgt: int, after: bool) -> None:
    """Edge drop on a deck outside the dragged deck's parent: make it a sibling of `tgt`
    (Anki's reparent op), place it before/after `tgt`, then redraw."""
    try:
        if mw.col.decks.name(tgt).startswith(mw.col.decks.name(src) + "::"):
            return                              # can't go beside its own subdeck
    except Exception:
        return
    from aqt.operations.deck import reparent_decks

    def placed(_c):
        def done(fut):
            try:
                fut.result()
            except Exception as e:
                log("deck move place: %s" % e)
            _reveal(src)
            _refresh()
        mw.taskman.run_in_background(lambda: _place(src, tgt, after), done)

    reparent_decks(parent=mw, deck_ids=[src], new_parent=_parent_of(tgt)).success(
        placed).run_in_background()


def _on_js(handled, message, context):
    if isinstance(message, str) and message.startswith("janki:deckmove:"):
        try:
            src, tgt, where = message.split(":", 2)[2].split(",")
            _move_out(int(src), int(tgt), where == "after")
        except Exception as e:
            log("deck move: %s" % e)
        return (True, None)
    if isinstance(message, str) and message.startswith("janki:decknest:"):
        try:
            src, tgt = message.split(":", 2)[2].split(",")
            _nest(int(src), int(tgt or 0))
        except Exception as e:
            log("deck nest: %s" % e)
        return (True, None)
    if not isinstance(message, str) or not message.startswith("janki:deckorder:"):
        return handled
    try:
        src, tgt, where = message.split(":", 2)[2].split(",")
        move(int(src), int(tgt), where == "after")
    except Exception as e:
        log("deck order: %s" % e)
    return (True, None)


def _after_op(changes, handler) -> None:
    """Undo/redo of a Reorder Decks step changes only config — redraw the list then."""
    if handler is QUIET:
        return
    try:
        if getattr(changes, "config", False) and not getattr(changes, "study_queues", False):
            _refresh()
    except Exception:
        pass


# --------------------------------------------------------------------------- page script
# Janki's own drag (Anki's jQuery-UI drag is switched off: it fought the deck list's
# styling/animations). Press a deck and move it a few px (a plain click still opens it):
# the deck — with its open subdecks — follows the pointer, and its sibling decks slide up
# or down to make room; release to drop it there. Transforms only (motion rule): nothing
# in the layout moves, and row boxes are measured once when the drag starts.
_JS = r"""
(function(P){window.__jkDeckParents=P;if(window.__jkDeckOrder)return;window.__jkDeckOrder=1;
function off(){try{if(window.jQuery&&jQuery.fn.draggable){jQuery('tr.deck,tr.top-level-drag-row').each(function(){
 try{jQuery(this).draggable('destroy');}catch(e){}try{jQuery(this).droppable('destroy');}catch(e){}});}}catch(e){}}
// Anki's init runs on DOM ready, possibly after this script: switch it off then too
off();if(window.jQuery)jQuery(function(){setTimeout(off,0);});setTimeout(off,300);
var st=document.createElement('style');
st.textContent='tr.deck.jk-do-sib{transition:transform .16s cubic-bezier(.2,.7,.3,1)}'
 +'tr.deck.jk-do-src{position:relative;z-index:5;opacity:.85;pointer-events:none}'
 +'tr.jk-do-in>td,tr.jk-do-in>th{background:rgba(159,180,216,.18)!important;transition:background .12s}'
 +'tr.jk-do-in>td:first-child,tr.jk-do-in>th:first-child{border-radius:8px 0 0 8px}'
 +'tr.jk-do-in>td:last-child,tr.jk-do-in>th:last-child{border-radius:0 8px 8px 0}'
 +'html.jk-do-drag{cursor:grabbing!important;user-select:none!important}'
 +'tr.deck a,tr.deck img{-webkit-user-drag:none}'
 +'tr.jk-hov-instant a.deck,tr.jk-hov-instant a.deck::before,tr.jk-hov-instant a.deck .jk-dn{transition:none!important}'
 // no hover pill / name nudge on the rows passed over: only the dragged deck moves
 +'html.jk-do-drag a.deck::before{opacity:0!important}'
 // the deck table clips to its own box (css.py's pinned header): let a deck dragged
 // past the last row stay visible instead of vanishing at the table's edge
 +'html.jk-do-drag body center>table:first-of-type{overflow:visible!important}'
 +'html.jk-do-drag a.deck .jk-dn{transform:none!important}'
+'';
document.head.appendChild(st);
function par(id){return (window.__jkDeckParents||{})[id];}
function under(id,anc){for(var p=par(id),n=0;p&&n<50;p=par(p),n++)if(String(p)===String(anc))return true;return false;}
var t0=0,far=0,src=null,sx=0,sy=0,drag=false,me=null,others=[],mpos=0,ipos=0,tgt=null,pid=null,step=0,dx0=0,srcD=0,rowH=0,hl=null,into=null,dwell=null,dwellR=null;
function depth(id){var n=0;for(var p=par(id);p&&p!=='0'&&n<50;p=par(p))n++;return n;}
// Tree drag, like an outliner: UP/DOWN picks the gap between two rows (the list slides
// open there; worked out on the list as if the dragged deck were already lifted out, so
// rows sliding never feed back into the choice), LEFT/RIGHT picks the level (the deck's
// name slides with it). Sliding up out of a parent drops it to the outer level by
// itself; nudge right to go inside the deck above, left to come out a level.
function start(){
 pid=par(src.id);if(pid===undefined)return false;
 var all=[].filter.call(document.querySelectorAll('tr.deck'),function(r){return r.id&&r.offsetParent;});
 var i0=all.indexOf(src);if(i0<0)return false;
 var mr=[src];for(var j=i0+1;j<all.length&&under(all[j].id,src.id);j++)mr.push(all[j]);
 var t0=mr[0].getBoundingClientRect().top;rowH=src.getBoundingClientRect().height;
 me={rows:mr,top:t0,h:mr[mr.length-1].getBoundingClientRect().bottom-t0};
 others=[];mpos=-1;
 all.forEach(function(r){if(mr.indexOf(r)>=0){if(mpos<0)mpos=others.length;return;}
  var b=r.getBoundingClientRect();others.push({r:r,top:b.top,h:b.height,d:depth(r.id)});});
 ipos=mpos;tgt=null;dx0=0;srcD=depth(src.id);
 function nl(r){var a=r&&r.querySelector('a.deck');return a?a.getBoundingClientRect().left:0;}
 step=0;var pr=pid!=='0'&&document.getElementById(pid);if(pr)step=nl(src)-nl(pr);
 if(!step)all.some(function(r){var q=par(r.id),c=q&&q!=='0'&&document.getElementById(q);if(c){step=nl(r)-nl(c);return true;}});
 if(!step||step<8)step=24;
 drag=true;downA=null;document.documentElement.classList.add('jk-do-drag');   // a drag: no click-open
 mr.forEach(function(r){r.classList.add('jk-do-src');});
 others.forEach(function(o){o.r.classList.add('jk-do-sib');});
 return true;}
function tf(r,y){r.style.transform=y?'translateY('+y+'px)':'';}
function shift(i){return (ipos<=i&&i<mpos)?me.h:((mpos<=i&&i<ipos)?-me.h:0);}
function setDX(dx){if(Math.abs(dx-dx0)<1)return;dx0=dx;
 me.rows.forEach(function(r){var td=r.querySelector('td.decktd');if(!td)return;
  td.style.transition='transform .14s cubic-bezier(.2,.7,.3,1)';
  td.style.transform=dx?'translateX('+dx+'px)':'';});}
function setHL(r){if(hl===r)return;if(hl)hl.classList.remove('jk-do-in');hl=r;if(r)r.classList.add('jk-do-in');}
// Drop INTO a deck: hold the pointer over the middle of its row for a moment (passing
// over rows does nothing); that deck highlights and the list holds still until you move off.
function overRow(y){for(var i=0;i<others.length;i++){var o=others[i],t=o.top+shift(i);
  if(y>=t+o.h*.25&&y<t+o.h*.75)return o;}return null;}
function move(x,y){
 var dy=y-sy;me.rows.forEach(function(r){tf(r,dy);});
 var ov=overRow(y);
 if(into){if(ov===into)return;into=null;}                  // moved off: back to the list
 if(ov&&ov.r.id!==pid){if(dwellR!==ov){clearTimeout(dwell);dwellR=ov;
   dwell=setTimeout(function(){if(!drag||dwellR!==ov)return;into=ov;
    tgt={kind:'nest',id:ov.r.id};setHL(ov.r);setDX((ov.d+1-srcD)*step);},300);}}
 else{clearTimeout(dwell);dwellR=null;}
 // the gap: with the dragged deck lifted out, the slot whose top is nearest to where the
 // deck is now (comparing row middles flipped to the next slot after a 2-3 px nudge)
 var top=me.top+dy,g=0,best=1e9;
 for(var i=0;i<=others.length;i++){
  var st=i===0?(others.length?others[0].top-(0>=mpos?me.h:0):me.top)
              :others[i-1].top-(i-1>=mpos?me.h:0)+others[i-1].h;
  var dd=Math.abs(st-top);if(dd<best){best=dd;g=i;}}
 var A=g>0?others[g-1]:null,B=g<others.length?others[g]:null;
 // the level: inside A at most, B's level at least; by default stay inside the same parent
 // while still within it, else the outer level — then shifted by how far you've moved sideways
 var maxD=A?A.d+1:0,minD=B?B.d:0;if(minD>maxD)minD=maxD;
 var def=A?(A.r.id===pid?A.d+1:Math.min(srcD,A.d)):0;
 // past the end of the list (more than half a row below the last one): the top level
 if(!B&&A){var lb=A.top-(g-1>=mpos?me.h:0)+A.h;if(top>lb+rowH/2)def=0;}
 // sideways: going IN a level takes a deliberate push right (1.2 indents — a drag down
 // that drifts right used to nest into the deck above); coming OUT takes 0.8 to the left
 var sd=(x-sx)/step,lv=sd>0?Math.max(0,Math.floor(sd-0.2)):-Math.max(0,Math.floor(-sd+0.2));
 var d=Math.max(minD,Math.min(maxD,def+lv));
 // new parent = A's ancestor-or-self one level above d
 var P='0';if(d>0&&A){var cid=A.r.id;while(cid&&cid!=='0'&&depth(cid)>=d)cid=par(cid);P=cid||'0';}
 var ref=null;
 if(B&&par(B.r.id)===P)ref={id:B.r.id,where:'before'};
 else if(A){var cid2=A.r.id;while(cid2&&cid2!=='0'&&depth(cid2)>d)cid2=par(cid2);
  if(cid2&&cid2!=='0'&&par(cid2)===P&&depth(cid2)===d)ref={id:cid2,where:'after'};}
 tgt=(P===pid)?(g===mpos?null:{kind:'order',id:ref&&ref.id,where:ref&&ref.where})
     :(ref?{kind:'move',id:ref.id,where:ref.where}:{kind:'nest',id:P});
 setDX((d-srcD)*step);
 setHL(P!==pid&&P!=='0'?document.getElementById(P):null);      // the deck it would go into
 if(g!==ipos){ipos=g;for(var m=0;m<others.length;m++)tf(others[m].r,shift(m));}}
function clean(){me.rows.forEach(function(r){r.classList.remove('jk-do-src');});
 others.forEach(function(o){o.r.classList.remove('jk-do-sib');});setHL(null);
 document.documentElement.classList.remove('jk-do-drag');}
function resetAll(){setDX(0);me.rows.forEach(function(r){tf(r,0);});others.forEach(function(o){tf(o.r,0);});}
function end(){
 if(drag){drag=false;clearTimeout(dwell);dwellR=null;into=null;
  // the mouseup would otherwise click the deck under it. Caught on WINDOW (capture runs
  // before any document listener): Janki's own deck-click handler on document dims the
  // list to 35% as an "opening" cue and only undoes it after 1.5 s — the grey after a drag.
  var T=tgt,ip=ipos,mv=me;
  // ...unless nothing moved and the pointer barely went anywhere: a slow, wobbly trackpad
  // click (held >0.2 s, drifting ~10 px) must still open the deck
  if(T||far>=16){
  var k=function(e){e.preventDefault();e.stopImmediatePropagation();
   window.removeEventListener('click',k,true);};
  window.addEventListener('click',k,true);
  setTimeout(function(){window.removeEventListener('click',k,true);},400);}   // no click came
  if(!T||(T.kind==='order'&&!T.id)){resetAll();setTimeout(clean,170);
   if(far<16){var a0=src.querySelector('a.deck');     // went nowhere: it was a click — open it
    // (the dragged row ignored the pointer, so the click lands on the table, not the row)
    setTimeout(function(){if(a0)a0.click();},0);}}
  else{
   // slide exactly into the gap
   var nt=ip<mpos?others[ip].top:(ip>mpos?others[ip-1].top+others[ip-1].h-me.h:me.top);
   if(T.kind!=='nest')me.rows.forEach(function(r){r.style.transition='transform .16s cubic-bezier(.2,.7,.3,1)';tf(r,nt-me.top);});
   if(T.kind==='order'){
    // then move its rows there for real and drop the transforms (no redraw needed)
    setTimeout(function(){var ref=ip<others.length?others[ip].r:others[others.length-1].r.nextSibling;
     var pa=others[0].r.parentNode;mv.rows.forEach(function(r){pa.insertBefore(r,ref);});
     var rs=mv.rows.concat(others.map(function(o){return o.r;}));
     rs.forEach(function(r){r.style.transition='none';tf(r,0);});
     mv.rows.forEach(function(r){var td=r.querySelector('td.decktd');if(td){td.style.transition='none';td.style.transform='';}});dx0=0;
     clean();void document.body.offsetHeight;rs.forEach(function(r){r.style.transition='';});},170);
    pycmd('janki:deckorder:'+src.id+','+T.id+','+T.where);}
   else{
    if(T.kind==='move')pycmd('janki:deckmove:'+src.id+','+T.id+','+T.where);   // reparent + place
    else pycmd('janki:decknest:'+src.id+','+(T.id==='0'?'':T.id));            // into an empty deck
    setTimeout(function(){resetAll();clean();},4000);}}}   // backstop if no redraw comes
 src=null;}
document.addEventListener('mousedown',function(e){if(e.button!==0)return;
 var row=e.target.closest&&e.target.closest('tr.deck');if(!row||!row.id)return;
 if(e.target.closest('a.collapse,td.opts,.gears'))return;
 src=row;sx=e.clientX;sy=e.clientY;t0=Date.now();far=0;},true);
document.addEventListener('mousemove',function(e){if(!src)return;
 // a drag needs the press HELD ~0.2 s first: trackpad clicks wobble a few px, and that
 // turned plain clicks into tiny drags (the deck didn't open). Before that it's a click.
 var dd=Math.abs(e.clientX-sx)+Math.abs(e.clientY-sy);if(dd>far)far=dd;
 if(!drag){if(Date.now()-t0<200||dd<10)return;
  if(!start()){src=null;return;}}
 e.preventDefault();move(e.clientX,e.clientY);},true);
document.addEventListener('mouseup',function(){if(src)end();},true);
// A press on a deck's name that's released a few px off it (the name was still sliding
// from a hover/selection animation, or the click wobbled) used to land the click on the
// row's empty cell, so the deck didn't open. If the press started on the name and the
// click lands elsewhere in that same row (not a drag), open the deck anyway.
var downA=null;
document.addEventListener('mousedown',function(e){downA=e.button===0&&e.target.closest?e.target.closest('a.deck'):null;},true);
window.addEventListener('click',function(e){var a=downA;downA=null;
 if(!a||e.defaultPrevented||!e.target.closest||e.target.closest('a'))return;
 if(e.target.closest('tr.deck')!==a.closest('tr.deck'))return;
 e.stopPropagation();a.click();},true);
// Deck names are links: pressing one and moving started Chromium's own link drag (its
// drag image slid back on release, greying the list). Cancelling it in dragstart also
// cost the CLICK — a trackpad click wobbles past the link-drag threshold and then never
// opens the deck — so the links are made non-draggable instead (no drag starts at all).
function nodrag(){[].forEach.call(document.querySelectorAll('tr.deck a, tr.deck img'),function(a){
 a.setAttribute('draggable','false');});}
nodrag();document.addEventListener('DOMContentLoaded',nodrag);
window.addEventListener('blur',function(){if(src)end();});
// After a redraw (right-click / +/− collapse, a drop…) the deck under a resting pointer
// counted as newly hovered, so its hover pill replayed its grow animation. Until the
// pointer moves on to another row, hover styles apply instantly.
// Only THAT row: arrow-key selection uses the same transitions and must keep animating.
(function(){var first;
 function mm(e){var r=e.target&&e.target.closest?e.target.closest('tr.deck'):null;
  if(first===undefined){first=r;if(r)r.classList.add('jk-hov-instant');return;}
  if(r!==first){if(first)first.classList.remove('jk-hov-instant');
   document.removeEventListener('mousemove',mm,true);}}
 document.addEventListener('mousemove',mm,true);
 // the keyboard takes over: that row animates normally again too
 document.addEventListener('keydown',function(){if(first)first.classList.remove('jk-hov-instant');},true);})();
})(__PARENTS__);
"""


def _parents_json() -> str:
    """{deck id: parent id (0 = top level)} for the page script."""
    import json
    try:
        pairs = [(d.name, int(d.id)) for d in mw.col.decks.all_names_and_ids()]
    except Exception:
        return "{}"
    by_name = {n: i for n, i in pairs}
    out = {}
    for n, i in pairs:
        out[str(i)] = str(by_name.get(n.rsplit("::", 1)[0], 0)) if "::" in n else "0"
    return json.dumps(out)


def _will_render(deck_browser, content) -> None:
    """Ship the page script inside the deck list's own HTML (an eval after render could
    land on a page that was replaced right after, leaving the list without it)."""
    try:
        content.stats = (content.stats or "") + "<script>" + _JS.replace(
            "__PARENTS__", _parents_json()) + "</script>"
    except Exception as e:
        log("deck order js: %s" % e)


def install() -> None:
    _wrap_render()
    gui_hooks.webview_did_receive_js_message.append(_on_js)
    gui_hooks.deck_browser_will_render_content.append(_will_render)
    if hasattr(gui_hooks, "operation_did_execute"):
        gui_hooks.operation_did_execute.append(_after_op)
