"""Onigiri integration: Janki's main-screen buttons live in Onigiri's sidebar.

Onigiri hides Anki's top bar and the deck list's bottom bar, which is where Calendar,
Practice and Load Lectures normally sit. Through Onigiri's public Sidebar API they
come back as sidebar items (with Janki Settings). The first time this runs they are
placed in the sidebar's visible list, after Sync; from then on the user's own
arrangement in Onigiri's layout editor is left alone.
"""
import os

from aqt import gui_hooks, mw
from aqt.qt import Qt, QTimer

from ..util import compat
from ..util.config import log

_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
_SEEDED = os.path.join(_ROOT, "user_files", "onigiri_sidebar_seeded")

_SVG = ("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' "
        "stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>"
        "%s</svg>")
_ENTRIES = (
    # entry id, label, command, svg body
    ("janki.calendar", "Calendar", "janki_oni:calendar",
     "<rect x='3' y='5' width='18' height='16' rx='3'/><path d='M3 10h18M8 3v4M16 3v4'/>"),
    ("janki.practice", "Practice", "janki_oni:practice",
     "<circle cx='12' cy='12' r='9'/><path d='M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 "
     "1.6V14M12 17h.01'/>"),
    ("janki.lectures", "Load Lectures", "janki_oni:lectures",
     "<path d='M4 19V6a2 2 0 0 1 2-2h12v15H6a2 2 0 0 0-2 2zM8 8h6M8 12h6'/>"),
    ("janki.settings", "Janki Settings", "janki_oni:settings",
     "<path d='M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15.6 7.1 18.2l.9-5.5-4-3.9 5.5-.8z'/>"),
)


def _onigiri_api():
    """Onigiri's Sidebar API module (its package name is the AnkiWeb id)."""
    import importlib
    return importlib.import_module(compat.ONIGIRI_ID + ".api.sidebar")


def _run(message: str) -> None:
    if message == "janki_oni:calendar":
        from ..features import calendar_view
        calendar_view.open_calendar()
    elif message == "janki_oni:practice":
        from ..features import practice
        practice.open_practice_hub()
    elif message == "janki_oni:lectures":
        from ..integrations import lectures
        lectures.run_today(interactive=True)
    elif message.startswith("janki_oni:subdeck:"):
        _create_subdeck(int(message.rsplit(":", 1)[1]))
    elif message.startswith("janki_oni:susp:"):
        _toggle_deck_suspend(int(message.rsplit(":", 1)[1]))
    elif message.startswith("janki_oni:hide:"):
        from ..features import hidden_decks
        hidden_decks.set_hidden(int(message.rsplit(":", 1)[1]), True)
    elif message == "janki_oni:barsready":
        _fade_bars_in()
    elif message == "janki_oni:reload":
        mw.deckBrowser.refresh()
    elif message == "janki_oni:back":
        back_to_dashboard()
    elif message == "janki_oni:settings":
        from ..system import settings_dialog
        settings_dialog._open_settings()


def back_to_dashboard() -> None:
    """Leave the Calendar/Practice view for Onigiri's dashboard (the hidden top bar's
    Decks button normally does this)."""
    from ..features import calendar_view, practice, stats_embed
    stats_embed._page_sfx("page")         # the Decks button's sound
    calendar_view.close()
    practice._practice_view = False
    _arm_swap()
    mw.deckBrowser.refresh()


# While the Calendar or Practice is open, the deck-list screen is drawn by Anki's own
# renderer (Onigiri keeps it as `_anki_render_page`): those views fill that page's
# content, which Onigiri's dashboard doesn't show. A small back button replaces the
# hidden top bar's Decks.
_BACK_HTML = (
    "<style>#jk-oni-back{position:absolute;left:14px;z-index:2147483000;"
    "padding:5px 14px;border-radius:999px;cursor:pointer;font-size:14px;font-family:inherit;"
    "background:rgba(34,34,38,.94);color:#f2f2f4;border:1px solid rgba(255,255,255,.18);"
    "transition:background-color .2s ease,transform .2s ease;}"
    "#jk-oni-back:hover{background:rgba(70,70,76,.85);}"
    "#jk-oni-back:active{transform:scale(.96);}</style>"
    "<div id='jk-oni-back' onclick=\"pycmd('janki_oni:back')\">&#8249; Dashboard</div>"
    # Janki gives <html> a transform, which makes it the box for position:fixed, so
    # pin the button to the bottom-left of the view by hand.
    "<script>(function(){var b=document.getElementById('jk-oni-back');if(!b)return;"
    "document.documentElement.appendChild(b);"
    "function pin(){b.style.top=(window.scrollY+window.innerHeight-b.offsetHeight-14)+'px';}"
    "pin();window.addEventListener('scroll',pin,{passive:true});"
    "window.addEventListener('resize',pin);})();</script>")


_drop_cache = (0.0, frozenset(), ())


def _dropped_decks() -> frozenset:
    """Deck ids the normal deck list leaves out (same set as practice.hide_practice_rows
    strips from Anki's own list). Cached briefly: it's asked once per deck row."""
    global _drop_cache
    import time
    now = time.monotonic()
    try:                       # a Hide/Show (or its undo) must show on the next draw
        from ..features import hidden_decks
        key = tuple(sorted(hidden_decks.hidden_ids()))
    except Exception:
        key = ()
    if now - _drop_cache[0] < 1.0 and _drop_cache[2] == key:
        return _drop_cache[1]
    drop = set()
    try:
        from ..features import hidden_decks, practice
        drop |= set(practice._practice_dids()) | set(practice._amboss_dids())
        drop |= hidden_decks.hidden_with_children()
    except Exception as e:
        log("onigiri hidden decks: %s" % e)
    _drop_cache = (now, frozenset(int(x) for x in drop), key)
    return _drop_cache[1]


def _wrap_render_page() -> None:
    from aqt.deckbrowser import DeckBrowser
    if getattr(DeckBrowser._renderPage, "_jk_oni", False):
        return
    try:
        from importlib import import_module
        anki_render = import_module(compat.ONIGIRI_ID)._anki_render_page
    except Exception as e:
        log("onigiri render wrap: %s" % e)
        return
    onigiri_render = DeckBrowser._renderPage

    def _renderPage(self, *a, **k):
        # Decks / Calendar / Practice switches happen in the live page (every theme)
        if getattr(mw, "state", None) == "deckBrowser" and _take_swap():
            try:
                if compat.onigiri_theme() == "kome":
                    _kome_swap()
                else:
                    _oni_swap(self)
                return
            except Exception as e:
                log("onigiri swap: %s" % e)       # fall back to a normal load
        # Calendar / Practice draw inside Onigiri's own page in every theme
        return onigiri_render(self, *a, **k)
    _renderPage._jk_oni = True
    DeckBrowser._renderPage = _renderPage

    # Deck rows too (Practice lists its banks as deck rows): Onigiri's rows call its own
    # page scripts, which aren't on Anki's page.
    try:
        anki_node = import_module(compat.ONIGIRI_ID)._anki_render_deck_node
    except Exception as e:
        log("onigiri node wrap: %s" % e)
        return
    onigiri_node = DeckBrowser._render_deck_node

    def _render_deck_node(self, node, *a, **k):
        if compat.onigiri_theme() != "kome":
            from ..features import practice
            if getattr(practice, "_practice_view", False):   # banks only (_wrap_tree)
                return onigiri_node(self, node, *a, **k)
        # Janki's hidden decks (and the Practice/AMBOSS decks, which live under the
        # Practice button) stay out of Onigiri's deck list: skip the row and its subtree.
        try:
            if int(node.deck_id) in _dropped_decks():
                return ""
        except Exception:
            pass
        return onigiri_node(self, node, *a, **k)
    DeckBrowser._render_deck_node = _render_deck_node


# Onigiri's deck right-click/⋯ menu is its own page menu (not Anki's gear menu, where
# Janki adds "Hide from deck list"): add the item there, just above its colour markers.
_HIDE_MENU_JS = r"""<script>(function(){
function wrap(){var E=window.OnigiriEngine;if(!E||!E.showDeckContextMenu)return false;
if(E.__jkHide)return true;E.__jkHide=true;var orig=E.showDeckContextMenu;
E.showDeckContextMenu=function(x,y,did){var r=orig.apply(this,arguments);try{
var ms=[].slice.call(document.querySelectorAll('.onigiri-quick-menu')).filter(function(x){return x.querySelector(':scope > hr');}),m=ms[ms.length-1];if(!m)return r;
var ic=document.createElement('span');ic.className='quick-menu-icon';
var svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" '+
'stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l18 18M10.6 5.1A10 '+
'10 0 0 1 12 5c5 0 9 4.5 10 7a13 13 0 0 1-3.2 4.3M6.6 6.6C4.2 8 2.7 10.2 2 12c1 2.5 5 7 10 7 1.7 0 '+
'3.3-.5 4.6-1.3M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>';
var u='url("data:image/svg+xml,'+encodeURIComponent(svg)+'")';
/* same mask technique as Onigiri's own menu icons, so it takes the menu's colour */
ic.style.webkitMaskImage=u;ic.style.maskImage=u;
var hr=m.querySelector('hr');
var su=(window.__jkSuspDecks||[]).indexOf(String(did))>=0;
var ic2=document.createElement('span');ic2.className='quick-menu-icon';
var svg2='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" '+
'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+(su?
'<path d="M6 4l14 8-14 8z"/>':'<path d="M9 5v14M15 5v14"/>')+'</svg>';
var u2='url("data:image/svg+xml,'+encodeURIComponent(svg2)+'")';
ic2.style.webkitMaskImage=u2;ic2.style.maskImage=u2;
var b0=m.children.length;
this.appendMenuItem(m,{label:su?'Unsuspend deck':'Suspend deck',customNode:ic2,
 command:'janki_oni:susp:'+did});
var it2=m.children[b0];if(it2&&hr)m.insertBefore(it2,hr);
var before=m.children.length;
this.appendMenuItem(m,{label:'Hide from deck list',customNode:ic,command:'janki_oni:hide:'+did});
var item=m.children[before];if(item&&hr)m.insertBefore(item,hr);
}catch(e){}return r;};return true;}
if(!wrap()){var n=0,t=setInterval(function(){if(wrap()||++n>100)clearInterval(t);},50);}
/* Onigiri shows its sidebar edge pill on mouse-move near the edge and hides it on the
   next move away: leaving the window from there left it stuck on. Hide it on leave. */
if(!window.__jkEdgeLeave){window.__jkEdgeLeave=true;
var off=function(){var p=document.getElementById('onigiri-sidebar-edge-pill');
if(p&&!p.classList.contains('is-resizing'))p.classList.remove('is-edge-hover');};
document.documentElement.addEventListener('mouseleave',off);window.addEventListener('blur',off);}
})();</script>"""


# Kome shows/hides sub-decks by toggling .ad-list-row-hidden (instant): slide them open
# and closed instead, so the rows (and the charts below) move rather than jump.
_KOME_SLIDE_JS = r"""<script>(function(){if(window.__jkSlide)return;window.__jkSlide=1;
/* Only right after a click on a deck's chevron: Kome's own first render hides collapsed
   rows the same way, and animating that read as a flicker open-then-closed on launch. */
var armed=0,busy=new WeakSet(),E='cubic-bezier(.32,.72,0,1)',D=280;
document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('.ad-list-chev'))
 armed=Date.now();},true);
if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
function box(r){var cs=getComputedStyle(r);return {h:r.getBoundingClientRect().height,
 pt:cs.paddingTop,pb:cs.paddingBottom};}
/* height, padding and opacity together (padding left behind was the "jump" at the end) */
function run(r,from,to,done){r.style.overflow='hidden';r.style.boxSizing='border-box';
 var a=r.animate([from,to],{duration:D,easing:E});
 a.onfinish=a.oncancel=function(){r.style.overflow='';r.style.boxSizing='';if(done)done();};}
function zero(){return {height:'0px',paddingTop:'0px',paddingBottom:'0px',opacity:0,
 transform:'translateY(-4px)'};}
function full(b){return {height:b.h+'px',paddingTop:b.pt,paddingBottom:b.pb,opacity:1,
 transform:'none'};}
function grow(r){var b=box(r);if(!b.h)return;run(r,zero(),full(b));}
function shrink(r){busy.add(r);r.classList.remove('ad-list-row-hidden');var b=box(r);
 run(r,full(b),zero(),function(){r.classList.add('ad-list-row-hidden');
  setTimeout(function(){busy.delete(r);},0);});}
new MutationObserver(function(ms){if(Date.now()-armed>600)return;
 ms.forEach(function(m){var r=m.target;
 if(!r.classList||!r.classList.contains('ad-list-row')||busy.has(r))return;
 var was=(m.oldValue||'').indexOf('ad-list-row-hidden')>=0,now=r.classList.contains('ad-list-row-hidden');
 if(was&&!now)grow(r);else if(!was&&now)shrink(r);});})
 .observe(document.documentElement,{subtree:true,attributes:true,attributeFilter:['class'],
  attributeOldValue:true});})();</script>"""


# Kome's own deck menu (the ⋯ on every row, subdecks included): add Janki's Create
# subdeck / Suspend–Unsuspend / Hide, styled as its items, above "Delete deck".
_KOME_MENU_JS = r"""<script>(function(){
var SV=function(p){return '<svg class="ad-menu-icon" viewBox="0 0 24 24" fill="none" '+
 'stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" '+
 'aria-hidden="true">'+p+'</svg>';};
function wrap(){var o=window.__adDeckOpts;if(!o)return false;if(o.__jk)return true;
 var w=function(did,evt){var r=o.apply(this,arguments);try{
  var ms=document.querySelectorAll('.ad-menu'),m=ms[ms.length-1];
  if(!m||m.querySelector('[data-jk]'))return r;
  var su=(window.__jkSuspDecks||[]).indexOf(String(did))>=0;
  var items=[['janki_oni:subdeck:','Create subdeck…','<path d="M12 5v14M5 12h14"/>'],
   ['janki_oni:susp:',su?'Unsuspend deck':'Suspend deck',
    su?'<path d="M7 5l12 7-12 7z"/>':'<path d="M9 5v14M15 5v14"/>'],
   ['janki_oni:hide:','Hide from deck list','<path d="M3 3l18 18M10.6 5.1A10 10 0 0 1 12 5c5 0 9 4.5 10 7a13 13 0 0 1-3.2 4.3M6.6 6.6C4.2 8 2.7 10.2 2 12c1 2.5 5 7 10 7 1.7 0 3.3-.5 4.6-1.3M9.9 9.9a3 3 0 0 0 4.2 4.2"/>']];
  var sep=m.querySelector('.ad-menu-sep');
  items.forEach(function(it){var b=document.createElement('button');b.type='button';
   b.className='ad-menu-item';b.setAttribute('role','menuitem');b.setAttribute('data-jk','1');
   b.innerHTML=SV(it[2])+'<span class="ad-menu-l"></span>';
   b.querySelector('.ad-menu-l').textContent=it[1];
   b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();
    document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
    pycmd(it[0]+did);});
   if(sep)m.insertBefore(b,sep);else m.appendChild(b);});
 }catch(e){}return r;};w.__jk=1;window.__adDeckOpts=w;return true;}
if(!wrap()){var n=0,t=setInterval(function(){if(wrap()||++n>100)clearInterval(t);},50);}
})();</script>"""


def _create_subdeck(did: int) -> None:
    from aqt.utils import getOnlyText
    d = mw.col.decks.get(did, default=False)
    if not d:
        return
    sub = (getOnlyText("Name of the new subdeck under “%s”:" % d["name"], parent=mw)
           or "").strip().strip(":")
    if sub:
        mw.col.decks.id("%s::%s" % (d["name"], sub))
        mw.deckBrowser.refresh()


def _hidden_rows_css() -> str:
    """Themes that build their own deck list from data (Kome: div.ad-list-row) never go
    through the row renderer above, so also hide those rows by deck id."""
    ids = sorted(_dropped_decks())
    if not ids:
        return ""
    # not in Practice mode (Kome switches to it in place, and it lists those banks)
    sel = ",".join('body:not(.jk-prac) .ad-list-row[data-did="%d"],'
                   'body:not(.jk-prac) tr.deck[data-did="%d"]' % (d, d) for d in ids)
    return "<style>%s{display:none!important;}</style>" % sel


# Kome's sidebar is a full-height panel from the very top of the page; under Janki's
# glass title strip its square top edge looked cut off. Float it as a rounded card.
_KOME_CSS = (
    "<style>body.ba-with-side .ba-side{top:28px!important;left:8px!important;"
    "bottom:8px!important;height:auto!important;border-radius:14px!important;"
    "border:1px solid rgba(255,255,255,.08)!important;overflow:hidden auto;"
    "overscroll-behavior:contain;}"   # scrolling past its end doesn't move the list
    # Kome's never-ending idle animations (the Sync "pending" dot's breathing, the streak
    # flame's flicker) kept the page redrawing nonstop: with the frame cap lifted and
    # software drawing that was ~1 CPU core while idle (heat / battery). Hold them still.
    "body.ba-with-side .ba-side-dot,body.ba-with-side .ba-streak-fire{animation:none!important;}"
    # the card starts below the traffic lights: drop Onigiri's title-bar inset inside it
    "body.ba-with-side .ba-side{padding-top:18px!important;}"
    # Janki's page drop-in moves <html>; with a transform there Kome's fixed sidebar
    # scrolls with the page. Keep the fade, drop the slide.
    "body.ba-with-side{--jk-nodrop:1;}html:has(body.ba-with-side){transform:none!important;}"

    # Kome's count columns are 38px; the spaced-caps "LEARNING" header (64px) ran into
    # "DUE". Show it as "LEARN" (same style) so the headers sit apart.
    ".ad-list-header-cell--learn{font-size:0!important;}"
    ".ad-list-header-cell--learn::before{content:'Learn';font-size:10px;}"
    "</style>")


# ------------------------------------------------------------------ Kome theme ----
# Kome builds its deck list in the page from a deck-tree payload and keeps only its own
# blocks in the main area (homefilter.js). Janki's views live inside that:
#  * Practice: the payload is filtered to the Practice banks (shown as top-level decks),
#    so Kome's own list shows them; the review charts step aside.
#  * Calendar: its page goes in a Kome-allowed block (section.ba-practice) and Kome's
#    deck list / charts step aside.
#  * Normal list: hidden decks and the Practice/AMBOSS decks are left out of the payload.
def _practice_keep():
    from ..features import practice
    keep = set(practice._practice_dids()) | set(practice._amboss_dids())
    try:
        parent = mw.col.decks.by_name(practice._PRACTICE_PARENT)
        if parent and len(keep) > 1:
            keep.discard(int(parent["id"]))      # banks read as the top level
    except Exception:
        pass
    return keep


def _filter_rows(rows):
    try:
        from ..features import practice
        if getattr(practice, "_practice_view", False):
            keep = _practice_keep()
            rows = [r for r in rows if int(r.get("did", 0)) in keep]
            if rows:
                base = min(int(r.get("depth", 0)) for r in rows)
                for r in rows:
                    r["depth"] = int(r.get("depth", 0)) - base
            return rows
        drop = _dropped_decks()
        return [r for r in rows if int(r.get("did", 0)) not in drop]
    except Exception as e:
        log("kome rows: %s" % e)
        return rows


def _wrap_kome() -> None:
    try:
        from importlib import import_module
        tm = import_module(compat.ONIGIRI_ID + ".things_theme")
    except Exception as e:
        log("kome wrap: %s" % e)
        return
    for name in ("_full_deck_tree_payload", "_filtered_deck_tree"):
        orig = getattr(tm, name, None)
        if orig is None or getattr(orig, "_jk", False):
            continue

        def wrapped(*a, _orig=orig, **k):
            return _filter_rows(list(_orig(*a, **k) or []))
        wrapped._jk = True
        setattr(tm, name, wrapped)
    # the Calendar page inside a block Kome keeps
    from ..features import calendar_view
    page = calendar_view._page_html
    if not getattr(page, "_jk", False):
        def _page_html(*a, **k):
            html_ = page(*a, **k)
            if compat.onigiri_theme() == "kome":
                html_ = '<section class="ba-practice jk-kome-cal">' + html_ + "</section>"
            return html_
        _page_html._jk = True
        calendar_view._page_html = _page_html


def _kome_nav_js() -> str:
    """Janki's Calendar / Practice / Load Lectures / Settings as buttons in Kome's
    sidebar action grid, built like Kome's own (same classes, masked icon)."""
    import json
    from ..features import calendar_view, practice
    active = ("janki_oni:calendar" if calendar_view._view else
              "janki_oni:practice" if getattr(practice, "_practice_view", False) else "")
    items = []
    import urllib.parse as _up
    # Only Calendar and Practice go in the grid: the settings live in Kome's bottom rows
    # (foot script below) and Load Lectures is in the Calendar.
    entries = [e for e in _ENTRIES if e[0] in ("janki.calendar", "janki.practice")]
    for _eid, label, cmd, body in entries:
        svg = (_SVG % body).replace("black", "#000")
        items.append({"label": label, "cmd": cmd,
                      "icon": "data:image/svg+xml," + _up.quote(svg)})
    return ("<script>(function(){var ITEMS=%s,ACTIVE=%s;"
            "function add(){var g=document.querySelector('.ba-side-actions-grid');"
            "if(!g)return false;if(g.querySelector('[data-jk]'))return true;"
            "ITEMS.forEach(function(it){var b=document.createElement('button');b.type='button';"
            "b.className='ba-side-item';b.setAttribute('data-jk','1');"
            "b.setAttribute('data-cmd',it.cmd);"
            "b.innerHTML='<i class=\"ba-side-icon ba-side-icon--fa\" aria-hidden=\"true\"></i>'"
            "+'<span class=\"ba-side-l\"><span class=\"ba-side-l-text\"></span></span>';"
            "b.querySelector('i').style.setProperty('--ba-side-icon-url','url(\"'+it.icon+'\")');"
            "b.querySelector('.ba-side-l-text').textContent=it.label;"
            "b.addEventListener('click',function(e){e.preventDefault();pycmd(it.cmd);});"
            "g.appendChild(b);});"
            "if(ACTIVE){[].forEach.call(document.querySelectorAll('.ba-side-item[data-active]'),"
            "function(x){x.removeAttribute('data-active');});"
            "var a=g.querySelector('[data-cmd=\"'+ACTIVE+'\"]');if(a)a.setAttribute('data-active','true');}"
            "return true;}"
            # Kome's bottom rows: its Settings is Onigiri's ("Onigiri Settings"), with
            # "Janki Settings" always right below it (a copy of that row).
            "function foot(){var s=document.querySelector('.ba-side-foot .ba-side-settings');"
            "if(!s)return false;if(document.querySelector('.ba-side-foot [data-jk-set]'))return true;"
            "var lab=function(b,t){var l=b.querySelector('.ba-side-l-text')||b.querySelector('.ba-side-l');"
            "if(l)l.textContent=t;else{[].forEach.call(b.childNodes,function(n){"
            "if(n.nodeType===3&&n.textContent.trim())n.textContent=t;});}};"
            "var j=s.cloneNode(true);j.setAttribute('data-jk-set','1');"
            "j.setAttribute('data-cmd','janki_oni:settings');j.classList.remove('ba-side-settings');"
            "var k=j.querySelector('.ba-side-key');if(k)k.remove();"
            "lab(s,'Onigiri Settings');lab(j,'Janki Settings');"
            "j.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();"
            "pycmd('janki_oni:settings');});"
            "s.parentNode.insertBefore(j,s.nextSibling);return true;}"
            "if(!add()){var n=0,t=setInterval(function(){if(add()||++n>100)clearInterval(t);},50);}"
            "if(!foot()){var m=0,u=setInterval(function(){if(foot()||++m>100)clearInterval(u);},50);}"
            "})();</script>") % (json.dumps(items), json.dumps(active))


def _wrap_kome_fades() -> None:
    """Switching Decks ↔ Calendar ↔ Practice under Kome: no page fade or drop-in (they
    blinked Kome's sidebar and left the main area blank while the next page loaded). The
    old page stays on screen until the new one paints, so it's a clean swap."""
    from ..features import stats_embed
    if getattr(stats_embed.fade_then, "_jk_kome", False):
        return
    orig_fade, orig_anim = stats_embed.fade_then, stats_embed.animate_next_deck_render

    def fade_then(fn, web=None, *a, **k):
        if web is None and compat.onigiri_on() \
                and getattr(mw, "state", None) == "deckBrowser":
            try:
                stats_embed._page_sfx(k.get("sound", "page"))
            except Exception:
                pass
            _arm_swap()                  # the redraw `fn` triggers happens in place
            QTimer.singleShot(0, fn)
            return
        return orig_fade(fn, web, *a, **k)

    def animate_next_deck_render(*a, **k):
        if compat.onigiri_on():
            return
        return orig_anim(*a, **k)
    fade_then._jk_kome = True
    stats_embed.fade_then = fade_then
    stats_embed.animate_next_deck_render = animate_next_deck_render


# View rules for every Kome deck page, switched by a class on <body> (jk-cal / jk-prac)
# so a view can change in place, without a page load.
_KOME_VIEW_CSS = (
    "<style>"
    "body.jk-cal .ba-home > :not(.jk-kome-cal):not(script):not(style):not(link)"
    "{display:none!important;}"
    "body:not(.jk-cal) .jk-kome-cal{display:none!important;}"
    "body.jk-cal .ba-home .jk-kome-cal{display:block;width:100%;overflow:hidden;"
    "margin-top:0!important;}"
    # the Calendar sizes itself for the whole window: fit Kome's main area
    ".jk-kome-cal #jkc{width:100%!important;max-width:100%!important;"
    "min-width:0!important;height:calc(100vh - 32px)!important;}"
    # day columns share the full width (they were sized for the whole window)
    ".jk-kome-cal .jkc-grid{display:flex!important;gap:6px;}"
    ".jk-kome-cal .jkc-grid>.jkc-hours{flex:0 0 52px;}"
    ".jk-kome-cal .jkc-grid>.jkc-col{flex:1 1 0;min-width:0;width:auto!important;}"
    # no page scroll in the Calendar (it scrolls itself); room above/below
    "html:has(body.jk-cal),body.jk-cal{overflow:hidden!important;}"
    "body.jk-cal .ba-home{padding-top:8px!important;padding-bottom:0!important;}"
    # text in Kome's own font, like the rest of the screen
    ".jk-kome-cal{font-family:var(--rf-sans,inherit)!important;}"
    ".jk-kome-cal *:not(svg):not(path){font-family:inherit!important;}"
    # Class page + Calendar bar in Kome's look: its font, ink and accent colours (scoped
    # under #jkc to outrank the Calendar's own `#jkc .jkd-…` !important rules)
    ".jk-kome-cal #jkc .jkd,.jk-kome-cal #jkc .jkd *{font-family:var(--rf-sans)!important;}"
    ".jk-kome-cal #jkc .jkd{color:var(--rf-ink)!important;}"
    ".jk-kome-cal #jkc .jkd-when,.jk-kome-cal #jkc .jkd-note,.jk-kome-cal #jkc .jkd-links"
    "{color:var(--rf-ink-dim)!important;}"
    ".jk-kome-cal #jkc .jkd-study{background:var(--rf-accent)!important;color:#fff!important;"
    "border:0!important;border-radius:12px!important;font-weight:600!important;"
    "box-shadow:0 6px 20px color-mix(in srgb,var(--rf-accent) 22%,transparent)!important;"
    "transition:filter .12s ease,transform .09s ease!important;}"
    ".jk-kome-cal #jkc .jkd-study.jkd-prac{background:color-mix(in srgb,var(--rf-accent) 18%,"
    "var(--rf-panel))!important;color:var(--rf-accent)!important;"
    "border:1px solid color-mix(in srgb,var(--rf-accent) 45%,transparent)!important;"
    "box-shadow:none!important;}"
    ".jk-kome-cal #jkc .jkd-study:hover{filter:brightness(1.08);}"
    ".jk-kome-cal #jkc .jkd-study:active{transform:scale(.98);}"
    ".jk-kome-cal #jkc .jkd-sec{background:var(--rf-panel)!important;color:var(--rf-ink)!important;"
    "border:1px solid var(--rf-line-2)!important;}"
    ".jk-kome-cal #jkc .jkd-sec:hover{background:var(--rf-row-hover)!important;}"
    ".jk-kome-cal #jkc .jkc-bar button{font-family:var(--rf-sans)!important;}"
    ".jk-kome-cal #jkc .jkd-sw.on .jkd-knob{background:var(--rf-accent)!important;}"
    ".jk-kome-cal #jkc .jkd-study:hover{background:var(--rf-accent)!important;}"
    ".jk-kome-cal #jkc .jkd-study.jkd-prac:hover{background:color-mix(in srgb,var(--rf-accent) "
    "26%,var(--rf-panel))!important;}"
    # A class page (.jkc-grid.jkc-detail) centres vertically in the Calendar's area (the
    # week grid's column-flex rule above would otherwise pin it to the top)
    "body.jk-cal .jk-kome-cal #jkc:has(.jkc-detail){display:flex!important;"
    "flex-direction:column!important;}"
    "body.jk-cal .jk-kome-cal #jkc .jkc-grid.jkc-detail{display:flex!important;"
    "flex-direction:column!important;justify-content:center!important;"
    "align-items:stretch!important;flex:1 1 auto!important;min-height:0!important;"
    "margin-top:0!important;padding-top:0!important;gap:0!important;}"
    # the "‹ Calendar" pill floats over the class page (in the flow it pushed the page's
    # centre down by its height), and a bit more room under the class title
    "body.jk-cal .jk-kome-cal{position:relative!important;}"
    "body.jk-cal .jk-kome-cal > div:has(> #jk-cal-back){position:absolute!important;"
    "top:6px;left:0;z-index:5;}"   # pill near the top, level with the Calendar bar
    ".jk-kome-cal #jkc .jkd h2{margin-bottom:14px!important;}"
    # Practice: just the banks list, with bank columns: Bank · Progress · Questions
    # (Questions = the New count: questions not done yet; Learn / Due don't apply)
    "body.jk-prac .ba-home .ba-practice{display:none!important;}"
    "body.jk-prac .ad-list-header-cell--learn,body.jk-prac .ad-list-header-cell--due,"
    "body.jk-prac .ad-list-learn,body.jk-prac .ad-list-due{display:none!important;}"
    "body.jk-prac .ad-list-header{grid-template-columns:24px minmax(0,1fr) 112px 114px 28px"
    "!important;}"
    "body.jk-prac .ad-list-row{grid-template-columns:minmax(0,1fr) 112px 114px 28px!important;}"
    "body.jk-prac .ad-list-header-cell:not([class*='--']),"
    "body.jk-prac .ad-list-header-cell--new{font-size:0!important;}"
    "body.jk-prac .ad-list-header-cell:not([class*='--'])::before{content:'Bank';font-size:10px;}"
    "body.jk-prac .ad-list-header-cell--new::before{content:'Questions';font-size:10px;}"
    "</style>")


def _kome_mode() -> str:
    from ..features import calendar_view, practice
    if calendar_view._view:
        return "cal"
    if getattr(practice, "_practice_view", False):
        return "prac"
    return "decks"


def _kome_view_css() -> str:
    mode = _kome_mode()
    cls = {"cal": "jk-cal", "prac": "jk-prac"}.get(mode, "")
    return (_KOME_VIEW_CSS +
            "<script>(function(){var b=document.body;b.classList.remove('jk-cal','jk-prac');"
            + ("b.classList.add('%s');window.scrollTo(0,0);" % cls if cls else "")
            + "})();</script>")


# ---- in-place view switch (no page load) ----------------------------------------
# A full reload repainted Kome's script-built sidebar and list from scratch on every
# Decks / Calendar / Practice switch (a visible flicker). Instead the switch's redraw is
# caught and done in the live page: Kome's own list renderer gets the new deck rows,
# the Calendar block is swapped in or out, and the sidebar is left untouched.
_swap_until = 0.0


def _arm_swap() -> None:
    import time
    global _swap_until
    _swap_until = time.monotonic() + 2.0


def _take_swap() -> bool:
    import time
    global _swap_until
    if time.monotonic() < _swap_until:
        _swap_until = 0.0
        return True
    return False


_SWAP_JS = r"""(function(D){
var b=document.body,h=document.querySelector('.ba-home');if(!h||!b)return 'nohome';
b.classList.remove('jk-cal','jk-prac');
if(D.mode==='cal')b.classList.add('jk-cal');else if(D.mode==='prac')b.classList.add('jk-prac');
var old=h.querySelector('.jk-kome-cal');if(old)old.remove();
if(D.cal){var t=document.createElement('div');t.innerHTML=D.cal;var sec=t.firstElementChild;
 h.appendChild(sec);
 /* run its scripts; load / DOMContentLoaded have passed, so run those handlers now */
 var da=document.addEventListener,wa=window.addEventListener;
 var now=function(orig,tgt){return function(ty,fn,o){if(ty==='DOMContentLoaded'||ty==='load'){
   setTimeout(function(){try{fn.call(tgt,new Event(ty));}catch(e){}},0);return;}
   return orig.call(this,ty,fn,o);};};
 document.addEventListener=now(da,document);window.addEventListener=now(wa,window);
 try{[].slice.call(sec.querySelectorAll('script')).forEach(function(s){var n=document.createElement('script');
   n.textContent=s.textContent;s.parentNode.replaceChild(n,s);});}
 finally{document.addEventListener=da;window.addEventListener=wa;}}
window.__baDeckTree=D.rows;var c=document.querySelector('.ad-list--home');
if(c&&window.__adDeckList){window.__adDeckList.render(c,D.rows,{onStudy:function(d){pycmd('open:'+d);}});
 /* the same soft entrance the Calendar has: fade up the list (and Kome's charts) */
 if(D.mode!=='cal'&&!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)){
  [c].concat([].slice.call(h.querySelectorAll(':scope > .ba-practice'))).forEach(function(el,i){
   el.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],
    {duration:320,delay:i*50,easing:'cubic-bezier(.2,.8,.2,1)',fill:'backwards'});});}}
[].forEach.call(document.querySelectorAll('.ba-side-item[data-active]'),function(x){x.removeAttribute('data-active');});
var a=document.querySelector('.ba-side-item[data-cmd="'+D.active+'"]');if(a)a.setAttribute('data-active','true');
window.scrollTo(0,0);return 'ok';})(%s)"""


def _kome_swap() -> None:
    import json
    from importlib import import_module
    from ..features import calendar_view
    mode = _kome_mode()
    tm = import_module(compat.ONIGIRI_ID + ".things_theme")
    data = {
        "mode": mode,
        "rows": tm._full_deck_tree_payload(),           # filtered for the mode
        "cal": (calendar_view._page_html() if mode == "cal" else ""),
        "active": {"cal": "janki_oni:calendar", "prac": "janki_oni:practice"}.get(mode, "decks"),
    }
    if mode == "cal" and getattr(calendar_view, "_detail", None) is not None and data["cal"]:
        # a class page: its "‹ Calendar" pill goes inside the swapped-in block
        cal = data["cal"]
        i = cal.rfind("</section>")
        data["cal"] = (cal[:i] + _CAL_BACK_JS + cal[i:]) if i >= 0 else cal + _CAL_BACK_JS
    mw.web.eval(_SWAP_JS % json.dumps(data))


# ---- Calendar / Practice inside Onigiri's default dashboard and Shima ----------------
# Like Kome: the views are drawn in Onigiri's own page, not Anki's. The deck list's
# header becomes tabs (Decks · Calendar · Practice); Practice puts the banks in
# Onigiri's own deck list (its rows, drop-downs and animations), the Calendar takes
# the main area (default dashboard) or grows the island (Shima). Switching happens in
# the live page (OnigiriEngine.updateDeckTree), so nothing reloads or blinks.
def _practice_nodes(tree):
    """The Practice banks (and AMBOSS decks) as top-level nodes, levels shifted so they
    draw unindented."""
    keep = _practice_keep()
    out = []

    def walk(n):
        for c in n.children:
            if int(c.deck_id) in keep:
                out.append(c)
            else:
                walk(c)
    walk(tree)

    def shift(n, d):
        n.level -= d
        for c in n.children:
            shift(c, d)
    for n in out:
        if n.level > 1:
            shift(n, n.level - 1)
    return out


def _wrap_tree() -> None:
    try:
        from importlib import import_module
        tu = import_module(compat.ONIGIRI_ID + ".decks.tree_updater")
    except Exception as e:
        log("onigiri tree wrap: %s" % e)
        return
    orig = tu._render_deck_tree_html_only
    if getattr(orig, "_jk", False):
        return

    def _render_deck_tree_html_only(deck_browser):
        from ..features import practice
        if not getattr(practice, "_practice_view", False) or compat.onigiri_theme() == "kome":
            return orig(deck_browser)
        try:
            from aqt.deckbrowser import RenderDeckNodeContext
            rd = getattr(deck_browser, "_render_data", None)
            tree = getattr(rd, "tree", None) or deck_browser.mw.col.sched.deck_due_tree()
            try:
                tu._apply_tree_preferences(tree)
            except Exception:
                pass
            ctx = RenderDeckNodeContext(current_deck_id=deck_browser.mw.col.decks.get_current_id())
            return "".join(deck_browser._render_deck_node(n, ctx) for n in _practice_nodes(tree))
        except Exception as e:
            log("onigiri practice tree: %s" % e)
            return orig(deck_browser)
    _render_deck_tree_html_only._jk = True
    tu._render_deck_tree_html_only = _render_deck_tree_html_only


def _oni_cal_css() -> str:
    """The Calendar's look from the Kome rules, pointed at Onigiri's colours."""
    rules = [r + "}" for r in _KOME_VIEW_CSS.replace("<style>", "").replace("</style>", "")
             .split("}") if ".jk-kome-cal" in r and ".ba-home" not in r]
    css = "".join(rules).replace(".jk-kome-cal", ".jk-oni-cal")
    for a, b in (("var(--rf-sans)", "inherit"), ("var(--rf-sans,inherit)", "inherit"),
                 ("--rf-ink-dim", "--fg-subtle"), ("--rf-ink", "--fg"),
                 ("--rf-accent", "--accent-color"), ("--rf-panel", "--canvas-inset"),
                 ("--rf-line-2", "--border"), ("--rf-row-hover", "--canvas-inset")):
        css = css.replace(a, b)
    return css


_ONI_VIEW_CSS = (
    # header tabs: the header's own type, the others dimmed
    # a segmented switch: both options always readable, the current one on a pill
    ".jk-oni-tabs{display:inline-flex;gap:2px;align-items:center;padding:2px;"
    "border-radius:9px;background:rgba(127,127,127,.12);}"
    ".jk-oni-tab{cursor:pointer;padding:2px 10px;color:var(--fg,inherit);border-radius:7px;line-height:20px;"
    "opacity:.8;transition:opacity .15s ease,color .15s ease,background-color .2s ease;}"
    ".jk-oni-tab:hover{opacity:1;color:var(--accent-color);}"
    ".jk-oni-tab[data-on]{opacity:1;cursor:default;color:var(--fg,inherit);"
    "background:rgba(127,127,127,.22);}"
    ".jk-oni-tab[data-on]:hover{color:var(--fg,inherit);}"
    ".jk-oni-tabs.up .jk-oni-tab{text-transform:uppercase;}"
    # Onigiri Settings · Janki Settings, side by side
    ".jk-oni-foot{display:flex;gap:8px;margin-top:12px;flex:0 0 auto;}"
    ".jk-oni-foot button{flex:1 1 0;min-width:0;padding:7px 10px;border-radius:10px;"
    "background:transparent;border:1px solid var(--border,rgba(127,127,127,.22));"
    "color:var(--icon-color,var(--fg-subtle));font:inherit;font-size:12px;cursor:pointer;"
    "white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"
    "transition:color .15s ease,background-color .15s ease,transform .1s ease;}"
    ".jk-oni-foot button:hover{color:var(--accent-color);background:rgba(127,127,127,.08);}"
    ".jk-oni-foot button:active{transform:scale(.97);}"
    # Onigiri's stat cards in a narrow main area (wide sidebar): labels like
    # "RETENTION" were cut to "RETENTI…" — tighter label type and card padding there
    ".main-content .injected-stats-block{container-type:inline-size;}"
    "@container (max-width:720px){"
    ".injected-stats-block .stat-card.onigiri-stat-card{--onigiri-widget-pad:14px;}"
    ".injected-stats-block .stat-card.onigiri-stat-card h3{font-size:min(var(--swidget-label-size,"
    "14px),12px)!important;letter-spacing:.02em!important;}}"
    # Calendar
    "body:not(.jk-cal) .jk-oni-cal{display:none!important;}"
    ".jk-oni-cal{display:flex;flex-direction:column;min-height:0;min-width:0;"
    "position:relative;font-family:inherit;}"
    ".jk-oni-cal *:not(svg):not(path){font-family:inherit!important;}"
    ".jk-oni-cal #jkc{width:100%!important;max-width:100%!important;min-width:0!important;"
    "height:100%!important;flex:1 1 auto;}"
    # Shima: the island grows into the Calendar's panel
    # (no width / height transition: __jkOniSet masks the change instead)
    # (as specific as Shima's own sizing rule + body, or its small island won)
    "body.jk-cal .container.modern-main-menu.onigiri-shima>.sidebar-left.shima-island"
    "{width:calc(100vw - 56px)!important;"
    "height:calc(100vh - 56px)!important;max-width:none!important;max-height:none!important;}"
    "body.jk-cal .onigiri-shima #deck-list-container{display:none!important;}"
    "body.jk-cal .onigiri-shima #deck-list-header:not(:has(#jk-oni-calbtn)){display:none!important;}"
    # class page: the "‹ Calendar" pill floats (in the flow it pushed the page's centre
    # down by its height) and the page centres in the panel, as on Kome
    "body.jk-cal .jk-oni-cal > div:has(> #jk-cal-back){position:absolute!important;"
    "top:0;left:0;z-index:5;}"
    "body.jk-cal .jk-oni-cal #jkc:has(.jkc-detail){display:flex!important;"
    "flex-direction:column!important;}"
    "body.jk-cal .jk-oni-cal #jkc .jkc-grid.jkc-detail{display:flex!important;"
    "flex-direction:column!important;justify-content:center!important;"
    "flex:1 1 auto!important;min-height:0!important;margin-top:0!important;"
    "padding-top:0!important;}"
    ".jk-oni-cal .jkc-r #jk-oni-calbtn{align-self:center;margin-left:2px;}"
    "body.jk-cal #deck-list-header .deck-header-actions>:not(#jk-oni-calbtn){visibility:hidden;}"
    "#jk-oni-calbtn[data-on]{color:var(--accent-color)!important;opacity:1!important;}"
    ".jk-oni-calbtn-float{position:fixed;top:14px;right:18px;z-index:50;width:32px;height:32px;"
    "display:inline-flex;align-items:center;justify-content:center;padding:0;border-radius:9px;"
    "border:0;background:transparent;color:var(--icon-color,var(--fg-subtle));opacity:.72;"
    "cursor:pointer;transition:opacity .15s ease,color .15s ease,background-color .15s ease,"
    "transform .1s ease;}"
    ".jk-oni-calbtn-float:hover{opacity:1;color:var(--accent-color);background:rgba(127,127,127,.1);}"
    ".jk-oni-calbtn-float:active{transform:scale(.94);}"
    ".jk-oni-calbtn-float svg{width:18px;height:18px;pointer-events:none;}"
    # the Calendar's own bar keeps clear of the icon and wraps in a narrow area
    # no empty strip mirroring the hour column: the days use the whole width
    ".jk-oni-cal .jkc-grid:not(.jkc-detail){padding-right:0!important;"
    "clip-path:inset(-40px 0 -40px -40px)!important;}"   # its clip hid that strip
    # narrow (split view): views left, Today right, the week's dates centred below
    ".jk-oni-cal{container-type:inline-size;}"
    "@container (max-width:760px){.jk-oni-cal .jkc-bar{grid-template-columns:1fr auto!important;"
    "grid-template-areas:'l r' 'c c';row-gap:8px!important;}"
    ".jk-oni-cal .jkc-l{grid-area:l;}.jk-oni-cal .jkc-r{grid-area:r;}"
    ".jk-oni-cal .jkc-c{grid-area:c;justify-self:center;}"
    # smaller event titles in the narrow columns
    ".jk-oni-cal .jkc-ev{font-size:.66em!important;line-height:1.2!important;}}"
    ".onigiri-shima .jk-oni-cal{flex:1 1 auto;}"
    # sidebar-only layout: the Calendar takes the centre panel
    "body.jk-cal.jk-cal-panel .sidebar-left:not(.shima-island) .sidebar-expanded-content>"
    ":not(.onigiri-sidebar-decks-section){display:none!important;}"
    "body.jk-cal.jk-cal-panel .sidebar-left:not(.shima-island) .sidebar-expanded-content"
    "{display:flex!important;flex-direction:column!important;height:100%!important;}"
    "body.jk-cal.jk-cal-panel .onigiri-sidebar-decks-section{display:flex!important;"
    "flex-direction:column!important;flex:1 1 auto!important;min-height:0!important;}"
    "body.jk-cal.jk-cal-panel #deck-list-container{display:none!important;}"
    "body.jk-cal.jk-cal-panel .jk-oni-cal{width:100%;}"
    # no gap above the Calendar's bar beyond the panel's own padding
    "body.jk-cal.jk-cal-panel .jk-oni-cal,body.jk-cal.jk-cal-panel .jk-oni-cal #jkc,"
    "body.jk-cal.jk-cal-panel .onigiri-sidebar-decks-section{margin-top:0!important;"
    "padding-top:0!important;}"
    "body.jk-cal.jk-cal-panel .jk-oni-cal .jkc-bar{margin-top:0!important;}"
    "body.jk-cal.jk-cal-panel .sidebar-left:not(.shima-island){width:var(--jk-panel-w,auto)!important;"
    "min-width:var(--jk-panel-w,0)!important;}"
    # no Decks / Practice switch over the Calendar (its icon brings the decks back);
    # with the icon floating elsewhere, the empty header row goes too
    "body.jk-cal.jk-cal-panel .jk-oni-tabs{display:none!important;}"
    "body.jk-cal.jk-cal-panel #deck-list-header:not(:has(#jk-oni-calbtn)){display:none!important;}"
    "body.jk-cal.jk-cal-panel .jk-oni-cal{flex:1 1 auto;min-height:0;}"
    # default dashboard: the Calendar takes the main area
    "body.jk-cal .modern-main-menu:not(.onigiri-shima) .main-content>:not(.jk-oni-cal)"
    "{display:none!important;}"
    ".main-content>.jk-oni-cal{height:calc(100vh - 64px);overflow:hidden;}"
)

_ONI_VIEW_JS = r"""(function(){
if(window.__jkOniSet)return;
var TABS=[['','janki_oni:back'],['Practice','janki_oni:practice']];
var CAL_SVG='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" '+
 'stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="3"/>'+
 '<path d="M3 10h18M8 3v4M16 3v4"/></svg>';
/* Calendar: an icon at the top right (Shima: with the island's own header icons) */
function calBtn(){var b=document.getElementById('jk-oni-calbtn');
 if(!b){b=document.createElement('button');b.id='jk-oni-calbtn';b.type='button';b.title='Calendar';
  b.setAttribute('aria-label','Calendar');b.innerHTML=CAL_SVG;
  b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();
   pycmd(mode()==='cal'?'janki_oni:back':'janki_oni:calendar');});
  var acts=panelOnly()&&document.querySelector('#deck-list-header .deck-header-actions');
  if(acts){b.className='deck-header-btn';acts.insertBefore(b,acts.firstChild);}
  else{b.className='jk-oni-calbtn-float';document.body.appendChild(b);}}
 if(mode()==='cal')b.setAttribute('data-on','1');else b.removeAttribute('data-on');}
function mode(){var b=document.body;return b.classList.contains('jk-cal')?'cal':
 b.classList.contains('jk-prac')?'prac':'decks';}
function marks(){var m=mode(),i={decks:0,cal:-1,prac:1}[m];calBtn();
 [].forEach.call(document.querySelectorAll('.jk-oni-tab'),function(t,j){
  if(j===i)t.setAttribute('data-on','1');else t.removeAttribute('data-on');});}
function tabs(){var h=document.querySelector('#deck-list-header h2');if(!h)return false;
 if(h.querySelector('.jk-oni-tabs'))return true;
 var lab=(h.textContent||'').trim()||'Decks',w=document.createElement('span');
 w.className='jk-oni-tabs'+(lab===lab.toUpperCase()?' up':'');
 TABS.forEach(function(t,j){var s=document.createElement('span');s.className='jk-oni-tab';
  s.textContent=j?t[0]:lab;s.addEventListener('click',function(e){e.stopPropagation();
   if(s.hasAttribute('data-on'))return;pycmd(t[1]);});w.appendChild(s);});
 h.textContent='';h.appendChild(w);marks();return true;}
/* Onigiri's Home menu (Shima, or hidden sidebar actions): "Onigiri Settings" with
   "Janki Settings" right below it */
function homeMenu(){var E=window.OnigiriEngine;if(!E||!E.showHomeMenu||E.__jkHome)return;
 E.__jkHome=1;var orig=E.showHomeMenu;E.showHomeMenu=function(){var r=orig.apply(this,arguments);
  try{var ms=document.querySelectorAll('.onigiri-quick-menu'),m=ms[ms.length-1];if(!m)return r;
   var set=[].filter.call(m.children,function(x){return /^\s*Settings\s*$/.test(x.textContent||'');})[0];
   if(!set)return r;var lab=function(el,t){var w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT),n;
    while((n=w.nextNode()))if(n.nodeValue.trim()){n.nodeValue=t;return;}};
   lab(set,'Onigiri Settings');
   this.appendMenuItem(m,{label:'Janki Settings',icon:'settings',command:'janki_oni:settings'});
   m.insertBefore(m.lastElementChild,set.nextSibling);}catch(e){}return r;};}
function foot(){homeMenu();if(document.querySelector('.jk-oni-foot'))return true;
 /* both settings are already side by side in the sidebar or the Home menu */
 if(document.querySelector('.sidebar-left .menu-item.action-settings,#onigiri-home-toolbar-btn'))return true;
 var host=document.querySelector('.sidebar-left .sidebar-expanded-content');
 if(!host)return false;var f=document.createElement('div');f.className='jk-oni-foot';
 [['Onigiri Settings','openOnigiriSettings'],['Janki Settings','janki_oni:settings']].forEach(function(x){
  var b=document.createElement('button');b.type='button';b.textContent=x[0];
  b.addEventListener('click',function(e){e.preventDefault();pycmd(x[1]);});f.appendChild(b);});
 host.appendChild(f);return true;}
/* the Calendar's place: the main area, or — Shima, or a layout without one (Onigiri's
   sidebar-only cycle) — the deck panel itself */
function panelOnly(){var mc=document.querySelector('.main-content');
 return !!document.querySelector('.onigiri-shima')||!mc||!mc.offsetWidth;}
/* that panel sizes to its contents (the hidden deck list): keep the width it has
   without the Calendar (measured with the Calendar's rules briefly off; no paint) */
function lockPanel(){var sb=document.querySelector('.sidebar-left:not(.shima-island)');if(!sb)return;
 var b=document.body,had=b.classList.contains('jk-cal');b.classList.remove('jk-cal');
 sb.style.removeProperty('--jk-panel-w');var w=Math.round(sb.getBoundingClientRect().width);
 if(had)b.classList.add('jk-cal');if(w>200)sb.style.setProperty('--jk-panel-w',w+'px');}
function host(){var p=panelOnly();if(p&&mode()==='cal')lockPanel();
 document.body.classList.toggle('jk-cal-panel',p);
 return p?document.querySelector('.onigiri-sidebar-decks-section'):document.querySelector('.main-content');}
function runScripts(sec){var da=document.addEventListener,wa=window.addEventListener;
 var now=function(orig,tgt){return function(ty,fn,o){if(ty==='DOMContentLoaded'||ty==='load'){
  setTimeout(function(){try{fn.call(tgt,new Event(ty));}catch(e){}},0);return;}
  return orig.call(this,ty,fn,o);};};
 document.addEventListener=now(da,document);window.addEventListener=now(wa,window);
 try{[].slice.call(sec.querySelectorAll('script')).forEach(function(s){var n=document.createElement('script');
  n.textContent=s.textContent;s.parentNode.replaceChild(n,s);});}
 finally{document.addEventListener=da;window.addEventListener=wa;}}
function soft(el,d){if(!el||(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches))return;
 try{el.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],
  {duration:320,delay:d||0,easing:'cubic-bezier(.2,.8,.2,1)',fill:'backwards'});}catch(e){}}
/* D.mode: decks|cal|prac; D.cal: section html ('' = none, true = already in the page);
   D.tree: new deck-list rows (null = leave) */
/* the mask cuts the island's own border while it moves: a lone outline follows it */
function ring(isl,A,B,dur,ease){try{var c=getComputedStyle(isl),r=document.createElement('div');
 r.style.cssText='position:fixed;pointer-events:none;z-index:2147483000;box-sizing:border-box;'+
  'border-radius:20px;border:'+(c.borderTopWidth||'1px')+' solid '+c.borderTopColor+';';
 document.body.appendChild(r);
 var k=function(R){return {left:R.left+'px',top:R.top+'px',width:R.width+'px',height:R.height+'px'};};
 var a=r.animate([k(A),k(B)],{duration:dur,easing:ease,fill:'forwards'});
 a.onfinish=function(){r.remove();};setTimeout(function(){r.remove();},dur+200);}catch(e){}}
window.__jkOniSet=function(D){var b=document.body,was=mode();
 var isl=document.querySelector('.onigiri-shima>.sidebar-left.shima-island'),r0=isl&&isl.getBoundingClientRect();
 var RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
 /* Leaving the Calendar on Shima: the island can't mask itself bigger than it is, so
    shrinking it first showed a cropped deck list. Keep it big, fade the Calendar while
    the mask closes in on the small island's outline, then switch */
 if(isl&&r0&&was==='cal'&&D.mode!=='cal'&&!D.__jkNow&&!RM){
  b.classList.remove('jk-cal');var sm=isl.getBoundingClientRect();b.classList.add('jk-cal');
  var ins='inset('+Math.max(0,sm.top-r0.top)+'px '+Math.max(0,r0.right-sm.right)+'px '+
   Math.max(0,r0.bottom-sm.bottom)+'px '+Math.max(0,sm.left-r0.left)+'px round 20px)';
  var cs=document.querySelector('.jk-oni-cal'),fa=null,ma=null;
  try{if(cs)fa=cs.animate([{opacity:1},{opacity:0}],{duration:160,fill:'forwards'});}catch(e){}
  try{ma=isl.animate([{clipPath:'inset(0px round 20px)'},{clipPath:ins}],
   {duration:320,easing:'cubic-bezier(.4,0,.2,1)',fill:'forwards'});}catch(e){}
  ring(isl,r0,sm,320,'cubic-bezier(.4,0,.2,1)');
  D.__jkNow=1;setTimeout(function(){window.__jkOniSet(D);
   try{ma&&ma.cancel();}catch(e){}try{fa&&fa.cancel();}catch(e){}},320);return 'ok';}
 b.classList.remove('jk-cal','jk-prac');
 if(D.mode==='cal')b.classList.add('jk-cal');else if(D.mode==='prac')b.classList.add('jk-prac');
 /* Shima's island changes size in one step and a rounded mask grows / shrinks between
    the two boxes: animating width / height re-laid out the page on every frame (choppy,
    worst right after launch) */
 if(isl&&r0&&was!=='cal'&&D.mode==='cal'&&!RM){
  var r1=isl.getBoundingClientRect(),big=r1.width>r0.width,A=big?r0:r1,B=big?r1:r0;
  var ins='inset('+Math.max(0,A.top-B.top)+'px '+Math.max(0,B.right-A.right)+'px '+
   Math.max(0,B.bottom-A.bottom)+'px '+Math.max(0,A.left-B.left)+'px round 20px)',full='inset(0px round 20px)';
  try{isl.animate([{clipPath:big?ins:full},{clipPath:big?full:ins}],
   {duration:380,easing:'cubic-bezier(.2,.8,.2,1)'});}catch(e){}}
 tabs();foot();marks();
 var h=host(),sec;
 if(D.cal===true){sec=document.querySelector('.jk-oni-cal');if(sec&&h&&sec.parentNode!==h)h.appendChild(sec);}
 else{[].forEach.call(document.querySelectorAll('.jk-oni-cal'),function(x){x.remove();});
  if(D.cal&&h){var t=document.createElement('div');t.innerHTML=D.cal;sec=t.firstElementChild;
   h.appendChild(sec);runScripts(sec);
   /* Shima's island grows first, then the Calendar fades up into it */
   soft(sec,was!=='cal'&&document.querySelector('.onigiri-shima')?120:0);}}
 if(D.tree!=null&&window.OnigiriEngine&&OnigiriEngine.updateDeckTree){
  OnigiriEngine.updateDeckTree(D.tree);
  if(was!==D.mode&&D.mode!=='cal')soft(document.getElementById('deck-list-container'));}
 calBtnHome();fitCal();setTimeout(fitCal,420);return 'ok';};   /* again once Shima's island has grown */
/* The Calendar sizes its hours for the whole window: fit them to the panel instead, so
   the whole day (8–5 at least) shows without being cut off at the bottom */
/* Shima: while the Calendar is open its icon sits in the Calendar's own bar, after
   Today / the wand (its header row above was a strip of empty space); back on close */
function calBtnHome(){var b=document.getElementById('jk-oni-calbtn')||window.__jkCalBtn;if(!b||!b.__jkHome)return;
 /* (the bar redraws with the week: a dropped icon is kept in __jkCalBtn) */
 if(mode()==='cal'||!b.classList.contains('jk-calbtn-inbar'))return;var H=b.__jkHome;
 if(H.next&&H.next.parentNode===H.parent)H.parent.insertBefore(b,H.next);else H.parent.appendChild(b);
 b.classList.remove('jk-calbtn-inbar');}
function calBtnToBar(sec){if(!document.querySelector('.onigiri-shima'))return;
 var b=document.getElementById('jk-oni-calbtn')||window.__jkCalBtn,r=sec.querySelector('.jkc-bar .jkc-r');
 if(!b||!r||b.parentNode===r)return;window.__jkCalBtn=b;
 if(!b.__jkHome)b.__jkHome={parent:b.parentNode,next:b.nextSibling};
 r.appendChild(b);b.classList.add('jk-calbtn-inbar');}
function fitCal(){var sec=document.querySelector('.jk-oni-cal');if(!sec||mode()!=='cal')return;
 calBtnToBar(sec);
 var g=sec.querySelector('.jkc-grid:not(.jkc-detail)'),bd=g&&g.querySelector('.jkc-body');if(!bd)return;
 /* measure at the end of the fade-up (its 8px slide would skew the numbers, and the
    later refit then nudged the Calendar) */
 var an=[];try{an=sec.getAnimations();}catch(e){}
 var saved=an.map(function(a){var t=a.currentTime;try{var d=a.effect.getComputedTiming().endTime;
  a.currentTime=d;}catch(e){}return t;});
 var cur=bd.getBoundingClientRect().height,room=sec.getBoundingClientRect().bottom-bd.getBoundingClientRect().top-10;
 /* in a panel (Shima / sidebar-only): the same gap under the last hour as above the bar
    (the last hour's label hangs ~8px below the grid) */
 var pn=document.body.classList.contains('jk-cal-panel')&&sec.closest('.sidebar-left'),j=sec.querySelector('#jkc');
 if(pn&&j){var gap=j.getBoundingClientRect().top-pn.getBoundingClientRect().top;
  room=pn.getBoundingClientRect().bottom-gap-8-bd.getBoundingClientRect().top;}
 an.forEach(function(a,i){try{a.currentTime=saved[i];}catch(e){}});
 var h=Math.max(220,Math.floor(room));if(Math.abs(h-cur)>1)g.style.setProperty('--jkc-h',h+'px');
 /* refit as soon as the Calendar redraws (it swaps in its "Loading…" week first):
    observer callbacks run before the next paint, so the squeezed size is never seen */
 if(!sec.__jkFitObs){sec.__jkFitObs=1;
  new MutationObserver(function(){fitCal();}).observe(sec,{childList:true,subtree:true});}}
window.addEventListener('resize',function(){fitCal();});
/* Onigiri's layout cycle (split ↔ sidebar only) while the Calendar is open: move it */
function rehost(){if(mode()!=='cal')return;var sec=document.querySelector('.jk-oni-cal'),h=host();
 if(sec&&h&&sec.parentNode!==h){h.appendChild(sec);requestAnimationFrame(fitCal);}}
(function(){var m=document.querySelector('.modern-main-menu');
 if(m&&window.MutationObserver)new MutationObserver(rehost).observe(m,{attributes:true,attributeFilter:['class']});})();
/* Subdeck drop-down: Onigiri swaps the rows in one go (a 60 ms flicker). Rows that stay
   slide from where they were (FLIP, transforms only); new rows wipe down in turn. */
function dropAnim(){var E=window.OnigiriEngine;if(!E||!E.updateDeckTree)return false;
 if(E.__jkDrop)return true;E.__jkDrop=1;var orig=E.updateDeckTree;
 /* Collapse: the closing subdecks wipe up and fade while the rows under them slide up
    to meet them; then the list updates (already in place, so nothing jumps) */
 var upd=null;
 E.updateDeckTree=function(html){var self=this,args=arguments,c=document.getElementById('deck-list-container');
  if(c&&!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)){
   var t=document.createElement('table');t.innerHTML='<tbody>'+html+'</tbody>';var keep={};
   [].forEach.call(t.querySelectorAll('tr.deck[data-did]'),function(r){keep[r.dataset.did]=1;});
   var rows=[].slice.call(c.querySelectorAll('tr.deck[data-did]')),gone=rows.filter(function(r){return !keep[r.dataset.did];});
   var added=Object.keys(keep).some(function(d){return !c.querySelector('tr.deck[data-did="'+d+'"]');});
   if(gone.length&&!added&&gone.length<rows.length){
    var top=gone[0].getBoundingClientRect().top,h=0;
    gone.forEach(function(r){h+=r.getBoundingClientRect().height;});
    var below=rows.filter(function(r){return keep[r.dataset.did]&&r.getBoundingClientRect().top>top;});
    var D=200,ez='cubic-bezier(.4,0,.2,1)';
    try{gone.slice().reverse().forEach(function(r,i){r.animate([{opacity:1,transform:'none',clipPath:'inset(0 0 0 0)'},
      {opacity:0,transform:'translateY(-8px)',clipPath:'inset(0 0 100% 0)'}],
      {duration:D-40,delay:Math.min(i,8)*12,easing:ez,fill:'forwards'});});
     below.forEach(function(r){r.animate([{transform:'none'},{transform:'translateY('+(-h)+'px)'}],
      {duration:D,easing:ez,fill:'forwards'});});}catch(e){}
    clearTimeout(upd);upd=setTimeout(function(){upd=null;run.apply(self,args);},D);return;}}
  return run.apply(self,args);};
 function run(html){var c=document.getElementById('deck-list-container');
  var before={};if(c)[].forEach.call(c.querySelectorAll('tr.deck[data-did]'),function(r){
   before[r.dataset.did]=r.getBoundingClientRect().top;});
  var res;try{res=orig.apply(this,arguments);}catch(err){
   /* Onigiri's own update stops at processNewNodes(tbody.children) (an HTMLCollection
      has no forEach): finish its remaining steps here */
   try{var tb=c&&c.querySelector('table.deck-table tbody');
    if(tb&&this.processNewNodes)this.processNewNodes([].slice.call(tb.children));
    if(this.updateMultiSelectionVisuals)this.updateMultiSelectionVisuals();
    if(typeof window.updateDeckLayouts==='function')window.updateDeckLayouts();
    if(c)setTimeout(function(){c.classList.remove('scroll-restoring');},50);}catch(e2){}}
  if(!c||(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches))return res;
  var k=0,anyOld=Object.keys(before).length>0;
  [].forEach.call(c.querySelectorAll('tr.deck[data-did]'),function(r){
   var was=before[r.dataset.did];r.classList.remove('deck-row-appear');
   try{if(was!==undefined){var dy=was-r.getBoundingClientRect().top;
     if(Math.abs(dy)>1)r.animate([{transform:'translateY('+dy+'px)'},{transform:'none'}],
      {duration:260,easing:'cubic-bezier(.2,.8,.2,1)'});}
    else if(anyOld){r.animate([{opacity:0,transform:'translateY(-10px)',clipPath:'inset(0 0 100% 0)'},
      {opacity:1,transform:'none',clipPath:'inset(0 0 0 0)'}],
      {duration:280,delay:Math.min(k++,12)*22,easing:'cubic-bezier(.2,.8,.2,1)',fill:'backwards'});}
   }catch(e){}});
  return res;}return true;}
if(!dropAnim()){var dn=0,dt=setInterval(function(){if(dropAnim()||++dn>100)clearInterval(dt);},30);}
})();"""


def _oni_cal_section() -> str:
    from ..features import calendar_view
    html_ = calendar_view._page_html()
    if getattr(calendar_view, "_detail", None) is not None:
        html_ += _CAL_BACK_JS
    return '<section class="jk-oni-cal">' + html_ + "</section>"


def _oni_views_html() -> str:
    import json
    mode = _kome_mode()
    cal = _oni_cal_section() if mode == "cal" else ""
    return ("<style>%s%s</style>%s<script>%s;(function(){function go(){"
            "if(!document.querySelector('#deck-list-header h2'))return false;"
            "window.__jkOniSet({mode:%s,cal:%s,tree:null});return true;}"
            "if(!go()){var n=0,t=setInterval(function(){if(go()||++n>100)clearInterval(t);},30);}"
            "})();</script>" % (_ONI_VIEW_CSS, _oni_cal_css(), cal, _ONI_VIEW_JS,
                                json.dumps(mode), "true" if cal else "''"))


def _oni_swap(deck_browser) -> None:
    import json
    mode = _kome_mode()
    tree = None
    try:
        from importlib import import_module
        conf = import_module(compat.ONIGIRI_ID + ".core.config").get_config_readonly()
        tags = str(conf.get("sidebarContentMode", "decks")).lower() == "tags"
        tu = import_module(compat.ONIGIRI_ID + ".decks.tree_updater")
        if mode == "prac" or not tags:
            deck_browser._render_data = None
            tree = tu._render_deck_tree_html_only(deck_browser)
    except Exception as e:
        log("onigiri swap tree: %s" % e)
    data = {"mode": mode, "cal": _oni_cal_section() if mode == "cal" else "", "tree": tree}
    mw.web.eval("window.__jkOniSet?window.__jkOniSet(%s):pycmd('janki_oni:reload');"
                % json.dumps(data))


def _susp_decks_js() -> str:
    """Deck ids (as strings) with any suspended card in them or a subdeck, for the deck
    menu's Suspend / Unsuspend label."""
    import json
    try:
        col = mw.col
        dids = set(col.db.list("select distinct did from cards where queue = -1"))
        out = set()
        for did in dids:
            out.add(str(did))
            for p in col.decks.parents(int(did)):
                out.add(str(p["id"]))
        return "<script>window.__jkSuspDecks=%s;</script>" % json.dumps(sorted(out))
    except Exception:
        return ""


def _toggle_deck_suspend(did: int) -> None:
    """Unsuspend everything in the deck (+ subdecks) if anything is suspended, else
    suspend it all — one undoable step, like Janki's own deck gear menu."""
    from aqt.operations import CollectionOp
    from aqt.utils import tooltip
    col = mw.col
    d = col.decks.get(did, default=False)
    if not d:
        return
    dq = 'deck:"%s"' % d["name"].replace('"', '\\"')
    any_susp = bool(col.find_cards(dq + " is:suspended"))
    q = dq + (" is:suspended" if any_susp else " -is:suspended")

    def op(c):
        ids = c.find_cards(q)
        op.n = len(ids)
        return c.sched.unsuspend_cards(ids) if any_susp else c.sched.suspend_cards(ids)
    op.n = 0
    CollectionOp(parent=mw, op=op).success(
        lambda _c: (tooltip("%s %d card(s)." % ("Unsuspended" if any_susp else "Suspended", op.n)),
                    mw.deckBrowser.refresh())).run_in_background()


def _strip_onigiri(web_content) -> None:
    """Drop Onigiri's dashboard styles/scripts from a page Janki's view draws (its fonts
    and button rules otherwise restyle the Calendar/Practice)."""
    import re
    oid = compat.ONIGIRI_ID
    web_content.css = [c for c in web_content.css if oid not in c]
    web_content.js = [j for j in web_content.js if oid not in j]
    web_content.head = re.sub(
        r"<style[^>]*id=['\"](?:onigiri|modern-menu)[^'\"]*['\"][^>]*>.*?</style>", "",
        web_content.head, flags=re.S)
    web_content.head = re.sub(
        r"<(?:link|script)[^>]*/_addons/%s/[^>]*>(?:\s*</script>)?" % oid, "",
        web_content.head)


def _trace(msg: str) -> None:
    """Diagnostics: ~/.janki_oni_trace exists → append view-switch events to its .txt."""
    p = os.path.expanduser("~/.janki_oni_trace")
    if os.path.exists(p):
        try:
            import time
            with open(p + ".txt", "a") as f:
                f.write("%.3f %s\n" % (time.time(), msg))
        except Exception:
            pass


# A class page (opened from a Calendar event) is left with the top bar's Calendar
# button, which Onigiri hides: a "‹ Calendar" pill at the top of the page instead.
_CAL_BACK_JS = (
    "<style>#jk-cal-back{display:inline-flex;align-items:center;gap:4px;margin:4px 0 12px;"
    "padding:6px 14px;border-radius:999px;cursor:pointer;font:500 14px/1.2 "
    "var(--rf-sans,inherit);color:var(--rf-ink,#f2f2f4);"
    "background:var(--rf-panel,rgba(34,34,38,.94));"
    "border:1px solid var(--rf-line-2,rgba(255,255,255,.22));"
    "transition:background-color .15s ease,transform .1s ease;}"
    "#jk-cal-back:hover{background:var(--rf-row-hover,rgba(62,62,68,.96));}"
    "#jk-cal-back:active{transform:scale(.97);}"
"</style><script>(function(){function add(){if(document.getElementById('jk-cal-back'))return true;"
    "var h=document.querySelector('.jk-kome-cal')||document.querySelector('.jk-oni-cal')||document.querySelector('.ba-home')||document.body;"
    "if(!h)return false;"
    "var b=document.createElement('div');b.id='jk-cal-back';b.innerHTML='&#8249; Calendar';"
    "b.onclick=function(){pycmd('janki_oni:calendar');};"
    "var w=document.createElement('div');w.style.textAlign='left';w.appendChild(b);"
    "h.insertBefore(w,h.firstChild);return true;}"
    "if(!add())document.addEventListener('DOMContentLoaded',add);})();</script>")


def _wrap_cal_back() -> None:
    """The Calendar opens a class page in place (no page load) and shows its back arrow
    in Anki's top bar, which Onigiri hides. Mirror that arrow as the "‹ Calendar" pill
    on the page: shown with a class page, removed when back on the week."""
    from ..features import calendar_view
    if getattr(calendar_view._sync_back, "_jk_oni", False):
        return
    orig = calendar_view._sync_back

    def _sync_back(*a, **k):
        r = orig(*a, **k)
        try:
            on = bool(calendar_view._view and calendar_view._detail is not None
                      and getattr(mw, "state", None) == "deckBrowser")
            if on:
                mw.web.eval("(function(){var d=document.createElement('div');d.innerHTML=%s;"
                            "[].slice.call(d.childNodes).forEach(function(n){"
                            "if(n.tagName==='SCRIPT'){var s=document.createElement('script');"
                            "s.textContent=n.textContent;document.body.appendChild(s);}"
                            "else document.head.appendChild(n);});})()"
                            % __import__("json").dumps(_CAL_BACK_JS))
            else:
                mw.web.eval("(function(){var b=document.getElementById('jk-cal-back');"
                            "if(b&&b.parentNode)b.parentNode.remove();})()")
        except Exception as e:
            log("calendar back pill: %s" % e)
        return r
    _sync_back._jk_oni = True
    calendar_view._sync_back = _sync_back


_FADE_MS = 180
_FIRST_CARD_FADE_JS = (
    "<script>(function(){if(window.__jkFirstFade)return;window.__jkFirstFade=1;"
    "if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;"
    "function arm(){var qa=document.getElementById('qa');if(!qa)return;"
    "var mo=new MutationObserver(function(){if(!qa.childNodes.length)return;mo.disconnect();"
    "if(window.__jkNoFade)return;"
    "try{qa.animate([{opacity:0},{opacity:1}],{duration:%d,easing:'cubic-bezier(.2,.8,.2,1)'});"
    "}catch(e){}});mo.observe(qa,{childList:true,subtree:true});}"
    "if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',arm);"
    "else arm();})();</script>" % _FADE_MS)
# The deck preview fades in once it's actually on screen: Onigiri keeps the page hidden
# while it settles, so a CSS animation from first paint had already finished unseen.
# The deck preview brightens in from 40 % (dimmed, never hidden — no blank). It starts at
# the page's first real paint: with the frame-rate cap lifted, requestAnimationFrame
# fires straight away, so a frame-based start ran most of it before anything showed.
_OV_BRIGHTEN = ("(function(){var d=document.documentElement,b=document.body;if(!b)return;"
                "window.__jkOvAt=performance.now();d.classList.add('jk-ov-in');"
                "if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;"
                "try{b.animate([{opacity:.4},{opacity:1}],{duration:%d,"
                "easing:'cubic-bezier(.2,.8,.2,1)'});}catch(e){}})()" % (_FADE_MS + 60))
_OVERVIEW_FADE = (
    "<style>html:not(.jk-ov-in) body{opacity:.4!important}</style>"
    # a swapped-in page keeps the document's old paint entry (and the old .jk-ov-in):
    # then the fade ran before anything showed, or never dimmed. Drop the class, and
    # with an old paint entry wait for this content's own frames instead.
    "<script>(function(){var done=0;function go(){if(done)return;done=1;%s;}"
    "document.documentElement.classList.remove('jk-ov-in');"
    "try{if(performance.getEntriesByType('paint').some(function(e){"
    "return e.name==='first-contentful-paint';}))requestAnimationFrame(function(){"
    "requestAnimationFrame(function(){setTimeout(go,16);});});"
    "else new PerformanceObserver(function(l){if(l.getEntries().some(function(e){"
    "return e.name==='first-contentful-paint';}))go();}).observe({type:'paint',buffered:true});}"
    "catch(e){setTimeout(go,120);}setTimeout(go,600);})();</script>" % _OV_BRIGHTEN)


def _overview_refreshed(*_a) -> None:
    """The preview refreshed in place (no new page, so its script didn't run again):
    brighten it from here — unless the page just did so itself."""
    try:
        mw.web.eval("(function(){if(window.__jkOvAt&&performance.now()-window.__jkOvAt<700)"
                    "return;" + _OV_BRIGHTEN + ";})()")
    except Exception:
        pass


def _wrap_deck_open() -> None:
    """Opening a deck from the list: a quick fade-out of the list, then Anki's switch
    (into the deck preview, or straight into studying)."""
    from aqt.deckbrowser import DeckBrowser
    if getattr(DeckBrowser._linkHandler, "_jk_oni_fade", False):
        return
    orig = DeckBrowser._linkHandler

    def _linkHandler(self, url, *a, **k):
        if isinstance(url, str) and url.startswith("open:") and compat.onigiri_on() \
                and not getattr(self, "_jk_fading", False):
            try:
                self._jk_fading = True
                self.web.eval("(function(){var b=document.body;if(!b)return;"
                              "if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)')"
                              ".matches)return;b.animate([{opacity:1},{opacity:0}],{duration:110,"
                              "easing:'ease-out',fill:'forwards'});})()".replace("{opacity:0}", "{opacity:.4}"))

                # switch at once (the list keeps fading until the new page paints) —
                # waiting the fade out first added a visible hang
                self._jk_fading = False
                return orig(self, url, *a, **k)
            except Exception:
                self._jk_fading = False
        return orig(self, url, *a, **k)
    _linkHandler._jk_oni_fade = True
    DeckBrowser._linkHandler = _linkHandler


def _on_will_set_content(web_content, context):
    global _decks_side_in
    try:
        from aqt.deckbrowser import DeckBrowser
        if _decks_side_in and isinstance(context, DeckBrowser):
            _decks_side_in = False
            web_content.head += _SIDE_IN_CSS
        # Reviews: Janki's study screen (centred card, typewriter, timer, Focus Mode, its
        # bottom buttons). Onigiri / Kome styling is taken off the card and the bottom
        # bar; Onigiri's top bar (pills, progress) is a separate view and stays.
        from aqt.reviewer import Reviewer, ReviewerBottomBar
        if isinstance(context, (Reviewer, ReviewerBottomBar)):
            _strip_onigiri(web_content)
            if isinstance(context, Reviewer):
                # first card of a session fades in (Janki's own first-card fade keys off
                # Anki revealing #qa, which Onigiri's script has already done)
                web_content.body += _FIRST_CARD_FADE_JS
                # Reworded / Practice line up with the answer bar's edges below them
                web_content.head += ("<style>#jk-rw-bar{left:18px!important;}"
                                     "#jk-pq-bar{right:18px!important;}</style>")
            if isinstance(context, ReviewerBottomBar):
                QTimer.singleShot(60, _release_bottom)   # its buttons are in: show the bar
                # buttons in Onigiri's main font, like the card (Card font follows Onigiri)
                try:
                    from ..util.config import _cfg as _c
                    _of = compat.onigiri_card_font() if _c().get("onigiri_card_font", True) else None
                    if _of:
                        web_content.head += ("<style>%s#outer button,#outer button *"
                                             "{font-family:%s!important;}</style>" % _of)
                except Exception:
                    pass
                # Onigiri rewrites the bar's cells (its markup stays after its styles go):
                # let the answer cell fill the row so Show Answer / the ease buttons centre
                web_content.head += (
                    # the answer cell fills the bar, and its buttons share that width
                    # like Janki's own wide pills (Show Answer alone takes all of it)
                    "<style>#innertable td#middle{flex:1 1 auto!important;"
                    "justify-content:stretch!important;}"
                    "#innertable td#middle table{display:block!important;width:100%!important;}"
                    "#innertable td#middle tbody{display:block!important;width:100%!important;}"
                    "#innertable td#middle tr{display:flex!important;width:100%!important;"
                    "gap:14px!important;align-items:flex-end!important;"
                    "justify-content:stretch!important;}"
                    # bottom-aligned: a cell with an extra label (e.g. Good's interval)
                    # is taller, and centring lifted that button above the others
                    "#innertable td#middle td{flex:1 1 0!important;width:auto!important;"
                    "min-width:0!important;display:flex!important;"
                    "justify-content:stretch!important;align-items:flex-end!important;}"
                    "#innertable td#middle td button{width:100%!important;max-width:none!important;"
                    "min-width:0!important;margin:0!important;}"
                    # sit close under the card's Reworded / Practice buttons
                    "#innertable td#middle td{padding-top:2px!important;}"
                    # white labels on every grade (Good / Easy were dark on their colour)
                    "#innertable td#middle td button,#innertable td#middle td button *"
                    "{color:#fff!important;-webkit-text-fill-color:#fff!important;}"
                    # Edit (left) and More (right): the same width, a real target on
                    # each side, buttons filling their cell
                    "#innertable td:not(#middle):not(#middle td){flex:0 0 clamp(96px,9vw,150px)!important;"
                    "width:clamp(96px,9vw,150px)!important;min-width:0!important;"
                    "display:flex!important;align-items:flex-end!important;padding-top:2px!important;}"
                    # same height as Show Answer, bottoms level with it
                    "#innertable td:not(#middle):not(#middle td)>button{width:100%!important;"
                    "max-width:none!important;min-width:0!important;margin:0!important;"
                    "height:var(--jk-ans-h,auto)!important;box-sizing:border-box!important;}"
                    # only in full screen, and only beside Show Answer (not the grades)
                    "html:not(.jk-fs) #innertable td:not(#middle):not(#middle td),"
                    "#innertable:not(:has(#ansbut)) td:not(#middle):not(#middle td)"
                    "{display:none!important;}"
                    "</style><script>(function(){function sync(){var a=document.getElementById('ansbut');"
                    "if(a&&a.offsetHeight)document.documentElement.style.setProperty('--jk-ans-h',"
                    "a.offsetHeight+'px');}"
                    "function go(){sync();if(document.body)new MutationObserver(sync).observe("
                    "document.body,{childList:true,subtree:true});}"
                    "if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);"
                    "else go();window.addEventListener('resize',sync);})();</script><style>"
                    # Practice's Continue (binary grade): its cell takes the whole row,
                    # like Show Answer; the hidden grade buttons' cells step aside
                    "#innertable td#middle td:has(#jp-continue-bar){flex:1 1 100%!important;}"
                    "html:has(#jp-hide-ease) #innertable td#middle td:has(>button[data-ease])"
                    ":not(:has(#jp-continue-bar))"
                    "{display:none!important;}"
                    "#jp-continue-bar{width:100%!important;max-width:none!important;"
                    "min-width:0!important;margin:0!important;}"
                    "</style>")
            # Glass follows the "Janki glass behind Onigiri" switch, like the menus: off
            # → a solid background in Onigiri's page colour (the window strip matches).
            if not compat.onigiri_glass() and _strip is not None and _strip.rgb:
                r, g, b_ = (int(round(x * 255)) for x in _strip.rgb)
                web_content.head += (
                    "<style>html:root,html:root body{background:rgb(%d,%d,%d)!important;"
                    "background-color:rgb(%d,%d,%d)!important;}</style>" % (r, g, b_, r, g, b_))
            return
    except Exception as e:
        log("onigiri reviewer strip: %s" % e)
    try:
        from aqt.overview import Overview
        if isinstance(context, Overview):           # the deck preview fades in quickly
            web_content.head += _OVERVIEW_FADE
            if os.path.exists(os.path.expanduser("~/.janki_oni_trace")):
                web_content.head += (
                    "<script>(function(){var t0=performance.now(),last=t0,F=window.__jkOvFr=[];"
                    "function f(t){F.push(Math.round(t-last));last=t;if(t-t0<900)"
                    "requestAnimationFrame(f);}requestAnimationFrame(f);"
                    "window.__jkEv=[];new MutationObserver(function(){window.__jkEv.push("
                    "Math.round(performance.now()-t0)+':'+document.documentElement.className);})"
                    ".observe(document.documentElement,{attributes:true});})();</script>")
    except Exception:
        pass
    try:
        from aqt.deckbrowser import DeckBrowser
        if isinstance(context, DeckBrowser):
            from ..features import calendar_view, practice
            _trace("page cal=%s prac=%s" % (calendar_view._view, practice._practice_view))
        if isinstance(context, DeckBrowser) and compat.onigiri_on() \
                and compat.onigiri_theme() == "kome":
            from ..features import calendar_view as _cv
            if _cv._view and getattr(_cv, "_detail", None) is not None:
                web_content.body += _CAL_BACK_JS
        if isinstance(context, DeckBrowser) and compat.janki_view() \
                and compat.onigiri_theme() == "kome":
            web_content.body += (_HIDE_MENU_JS + _KOME_CSS + _kome_view_css() + _kome_nav_js()
                                 + _KOME_SLIDE_JS)
        elif isinstance(context, DeckBrowser) and compat.onigiri_on() \
                and compat.onigiri_theme() != "kome":
            web_content.body += (_susp_decks_js() + _HIDE_MENU_JS + _hidden_rows_css()
                                 + _oni_views_html())
        elif isinstance(context, DeckBrowser) and compat.onigiri_on():
            web_content.body += (_susp_decks_js() + _HIDE_MENU_JS + _hidden_rows_css()
                                 + _KOME_CSS)
            if compat.onigiri_theme() == "kome":
                web_content.body += (_kome_view_css() + _kome_nav_js() + _KOME_SLIDE_JS
                                     + _KOME_MENU_JS)
    except Exception as e:
        log("onigiri back button: %s" % e)


# The window's title-bar strip (beside the traffic lights) is native, outside Qt: it
# shows the window's glass tint, which Janki's toolbar normally sits on. Onigiri hides
# that toolbar, so the tint showed as a lighter band over Onigiri's solid page. While
# Onigiri's dashboard/overview is up (and "Glass behind Onigiri" is off) the window
# background takes Onigiri's own page colour; elsewhere the normal tint comes back.
_RGB_FILE = os.path.join(_ROOT, "user_files", "onigiri_strip_rgb.json")


def _load_rgb():
    try:
        import json
        with open(_RGB_FILE) as f:
            v = json.load(f)
        return tuple(float(x) for x in v)[:3] if len(v) >= 3 else None
    except Exception:
        return None


def _save_rgb(rgb):
    try:
        import json
        os.makedirs(os.path.dirname(_RGB_FILE), exist_ok=True)
        with open(_RGB_FILE, "w") as f:
            json.dump(list(rgb), f)
    except Exception:
        pass


class _TopStrip:
    def __init__(self):
        self.want = False
        self.rgb = _load_rgb()     # Onigiri's page colour, remembered across launches
        # Janki (re)sets the window background at launch and at times after (tint, focus,
        # settings, fullscreen): put the colour straight back in the same call, so no
        # frame shows the glass. Wrapped when Janki loads, before any of them first run.
        from ..user import glass
        strip = self
        self._orig_tint = glass._apply_window_tint
        for name in ("_apply_window_tint", "_apply_native_glass", "_reassert_transparent"):
            orig = getattr(glass, name, None)
            if orig is None:
                continue

            def wrapped(*a, _orig=orig, **k):
                r = _orig(*a, **k)
                if strip.want and strip.rgb:
                    strip._paint(strip.rgb)
                return r
            setattr(glass, name, wrapped)
        # Known colour + Onigiri look: paint from the first moment (the first dashboard
        # draw then just confirms it).
        try:
            from ..util.config import _cfg
            self.want = bool(self.rgb) and not compat.onigiri_glass()
        except Exception:
            pass

    def sync(self):
        try:
            from ..util.config import _cfg
            # "startup": profile open, just before the dashboard's first draw
            want = (getattr(mw, "state", None) in ("deckBrowser", "overview", "review",
                                                    "startup", "profileManager", None)
                    and not compat.janki_view()
                    and not compat.onigiri_glass())
            if not want:
                if self.want:
                    self.want = False
                    self._orig_tint()
                return
            self.want = True
            if self.rgb:
                self._paint(self.rgb)            # instantly, from the last read
            # re-read in case Onigiri's theme / light-dark mode changed
            mw.web.evalWithCallback(
                "(function(){var e=document.querySelector('.container.modern-main-menu')"
                "||document.body;return getComputedStyle(e).backgroundColor;})()",
                self._got_color)
        except Exception as e:
            log("onigiri strip: %s" % e)

    def _got_color(self, css_color):
        import re
        m = re.findall(r"[\d.]+", css_color or "")
        if not self.want:
            return
        if len(m) < 3 or (len(m) > 3 and float(m[3]) < 0.99):
            self.rgb = None                       # see-through page: keep the glass
            self._orig_tint()
            return
        rgb = tuple(float(x) / 255.0 for x in m[:3])
        if rgb != self.rgb:
            self.rgb = rgb
            self._paint(rgb)
            _save_rgb(rgb)

    def _paint(self, rgb):
        import sys
        if sys.platform != "darwin":
            return
        try:
            from ctypes import c_bool, c_double, c_void_p
            from ..user import glass
            msg, cls = glass._bridge()
            win = msg(c_void_p, c_void_p(int(mw.winId())), b"window")
            col = msg(c_void_p, cls("NSColor"), b"colorWithRed:green:blue:alpha:",
                      (c_double, c_double, c_double, c_double), rgb + (1.0,))
            if win and col:
                msg(None, win, b"setOpaque:", (c_bool,), (False,))
                msg(None, win, b"setBackgroundColor:", (c_void_p,), (col,))
        except Exception as e:
            log("onigiri strip colour: %s" % e)


_strip = None


def _sync_strip(*_a):
    global _strip
    try:
        if _strip is None:
            _strip = _TopStrip()
        _strip.sync()
    except Exception as e:
        log("onigiri strip: %s" % e)


# Onigiri's "Decks" pill (review / deck overview) switched pages in one cut: give it the
# Practice ↔ Decks switch instead (fade out, deck list drops in). Onigiri acts on the
# click even when an earlier handler claimed it, so the click goes through untouched and
# the page switch it makes (moveToState) is what gets the effect.
_decks_pending = False
_decks_side_in = False      # the next deck-list page fades its sidebar in (the drop
_SIDE_IN_CSS = ("<script>(function(){var d=document.documentElement;"   # page reused:
                "['opacity','transition'].forEach(function(p){d.style.removeProperty(p);});"
                "})();</script>"                                       # drop the fade-out
                "<style>@media (prefers-reduced-motion: no-preference){"   # misses it)
                "body.ba-with-side .ba-side{animation:jkSideIn .32s ease both;}}"
                "@keyframes jkSideIn{from{opacity:0;}to{opacity:1;}}</style>")


def _on_review_decks(handled, message, context):
    global _decks_pending
    if (message != "decks" or getattr(mw, "state", None) not in ("review", "overview")
            or _decks_pending):
        return handled
    _decks_pending = True
    QTimer.singleShot(600, _decks_fade_settle)
    return handled


def _decks_fade_settle():
    global _decks_pending
    _decks_pending = False        # nothing switched (Focus Dango kept you in review)


def _clear_toolbar_fade():
    """The toolbar's page is reused: undo the Decks fade-out once the switch is done
    (the deck list keeps the toolbar hidden by then)."""
    try:
        mw.toolbar.web.eval("(function(){var b=document.body;if(!b)return;"
                            "['visibility','opacity','transition'].forEach(function(p){"
                            "b.style.removeProperty(p);});})()")
    except Exception:
        pass


def _wrap_move_to_state():
    orig = mw.moveToState
    if getattr(orig, "_jk_decks_fade", False):
        return

    def move(state, *a, **k):
        global _decks_pending
        if (_decks_pending and state == "deckBrowser"
                and getattr(mw, "state", None) in ("review", "overview")):
            _decks_pending = False
            global _decks_side_in
            _decks_side_in = True
            # fade out fully FIRST, then switch: switching at once (as Practice ↔ Decks
            # does) showed the review page squeezed narrower for a frame or two — the
            # top buttons jumped left and the text was cut off. Then the list drops in.
            from ..features import stats_embed, sfx
            # the answer bar is its own view: fade it out with the page and keep it hidden,
            # or the deck list's own bottom buttons load into it before Onigiri hides it
            # (the top toolbar too: Decks / Sync re-laid out to the left before going)
            for v in (getattr(mw, "bottomWeb", None), getattr(getattr(mw, "toolbar", None), "web", None)):
                try:
                    v.eval("(function(){var b=document.body;if(!b)return;"
                           "b.style.transition='opacity .15s ease';b.style.opacity='0';"
                           "setTimeout(function(){b.style.visibility='hidden';},150);})()")
                except Exception:
                    pass
            QTimer.singleShot(700, _clear_toolbar_fade)
            try:
                sfx.play("page")
            except Exception:
                pass
            mw.web.eval("(function(){var d=document.documentElement;"
                        "d.style.setProperty('transition','opacity .16s ease','important');"
                        "d.style.setProperty('opacity','0','important');})()")

            def go():
                stats_embed.animate_next_deck_render()
                orig(state, *a, **k)
            QTimer.singleShot(170, go)
            return None
        return orig(state, *a, **k)
    move._jk_decks_fade = True
    mw.moveToState = move


def _on_js_message(handled, message, context):
    if isinstance(message, str) and message.startswith("janki_oni:barrect:"):
        global _bar_rect
        try:
            _bar_rect = tuple(float(v) for v in message.rsplit(":", 1)[1].split(","))
        except Exception:
            pass
        return (True, None)
    # Kome's own Decks button: Janki's page sound (as on the normal Decks button), and
    # leave Janki's Calendar/Practice for the deck list.
    if message == "ba:decks":
        try:
            from ..features import sfx
            sfx.play("page")
        except Exception:
            pass
        if compat.janki_view():
            QTimer.singleShot(0, lambda: _safe_run("janki_oni:back"))
        return handled
    if isinstance(message, str) and message.startswith("janki_oni:"):
        # after the click finishes, so a new window isn't sent behind the main one
        QTimer.singleShot(0, lambda m=message: _safe_run(m))
        return (True, None)
    return handled


def _safe_run(message: str) -> None:
    try:
        _run(message)
    except Exception as e:
        log("onigiri sidebar %s: %s" % (message, e))


def _pair_settings() -> None:
    """Always: Janki Settings sits right after Onigiri's Settings in the sidebar, and
    Onigiri's is labelled "Onigiri Settings" so the two are told apart."""
    try:
        from importlib import import_module
        cfg_mod = import_module(compat.ONIGIRI_ID + ".core.config")
        conf = cfg_mod.get_config()
        layout = conf.setdefault("sidebarButtonLayout", {"visible": [], "archived": []})
        vis = layout.setdefault("visible", [])
        arch = layout.setdefault("archived", [])
        labels = layout.setdefault("labels", {})
        before = (list(vis), list(arch), dict(labels))
        if "janki.settings" in arch:
            arch.remove("janki.settings")
        if "settings" in vis:
            if "janki.settings" in vis:
                vis.remove("janki.settings")
            vis.insert(vis.index("settings") + 1, "janki.settings")
        labels["settings"] = "Onigiri Settings"
        if (list(vis), list(arch), dict(labels)) != before:
            cfg_mod.write_config(conf)
    except Exception as e:
        log("onigiri settings pair: %s" % e)


def _seed_visible() -> None:
    """Once: show Janki's items in the sidebar (after Sync) instead of the archive."""
    if os.path.exists(_SEEDED):
        return
    try:
        from importlib import import_module
        cfg_mod = import_module(compat.ONIGIRI_ID + ".core.config")
        conf = cfg_mod.get_config()
        layout = conf.setdefault("sidebarButtonLayout", {"visible": [], "archived": []})
        visible = layout.setdefault("visible", [])
        archived = layout.setdefault("archived", [])
        ids = [e[0] for e in _ENTRIES]
        for i in ids:
            if i in archived:
                archived.remove(i)
        at = visible.index("sync") + 1 if "sync" in visible else len(visible)
        for i in reversed(ids):
            if i not in visible:
                visible.insert(at, i)
        cfg_mod.write_config(conf)
        os.makedirs(os.path.dirname(_SEEDED), exist_ok=True)
        open(_SEEDED, "w").close()
        if getattr(mw, "state", None) == "deckBrowser":
            mw.deckBrowser.refresh()
    except Exception as e:
        log("onigiri sidebar seed: %s" % e)


def _register() -> None:
    try:
        api = _onigiri_api()
        for entry_id, label, cmd, body in _ENTRIES:
            api.register_sidebar_action(entry_id=entry_id, label=label, command=cmd,
                                        icon_svg=_SVG % body)
    except Exception as e:
        log("onigiri sidebar register: %s" % e)
        return
    _seed_visible()
    _pair_settings()


def _wrap_stats() -> None:
    """Janki's in-window Stats is normally left with the top bar's Decks, which Onigiri
    hides: give it the same "‹ Dashboard" pill (a Qt button on the Stats panel)."""
    from ..features import stats_embed
    if getattr(stats_embed.open_stats, "_jk_oni", False):
        return
    orig = stats_embed.open_stats

    def open_stats(*a, **k):
        r = orig(*a, **k)
        try:
            panel = stats_embed._panel
            btn = getattr(panel, "_jk_oni_back", None)
            if btn is None:
                from aqt.qt import QPushButton, QCursor
                btn = QPushButton("\u2039 Dashboard", panel)
                btn.setCursor(QCursor(Qt.CursorShape.PointingHandCursor))
                # named, so the Stats panel's glass stylesheet can't make it see-through
                btn.setObjectName("jkOniBack")
                btn.setAttribute(Qt.WidgetAttribute.WA_StyledBackground, True)
                # one outline only: no macOS focus ring / native bezel around the border
                btn.setFocusPolicy(Qt.FocusPolicy.NoFocus)
                btn.setAttribute(Qt.WidgetAttribute.WA_MacShowFocusRect, False)
                btn.setFlat(True)
                btn.setStyleSheet(
                    "QPushButton#jkOniBack{padding:6px 16px;border-radius:15px;"
                    "font-size:14px;background-color:rgba(34,34,38,0.94);color:#f2f2f4;"
                    "border:1px solid rgba(255,255,255,0.22);outline:none;}"
                    "QPushButton#jkOniBack:hover{background-color:rgba(62,62,68,0.96);}")
                btn.clicked.connect(lambda: stats_embed.close())
                panel._jk_oni_back = btn
                from aqt.qt import QObject, QEvent

                class _Pin(QObject):          # stay bottom-left as the panel resizes
                    def eventFilter(self, obj, ev):
                        if ev.type() == QEvent.Type.Resize:
                            btn.move(14, obj.height() - btn.height() - 14)
                        return False
                panel._jk_oni_pin = _Pin(panel)
                panel.installEventFilter(panel._jk_oni_pin)
            btn.adjustSize()
            btn.move(14, panel.height() - btn.height() - 14)
            btn.raise_()
            btn.show()
        except Exception as e:
            log("onigiri stats back: %s" % e)
        return r
    open_stats._jk_oni = True
    stats_embed.open_stats = open_stats


def _keep_bottom_bar_hidden() -> None:
    """Onigiri hides Anki's bottom bar on the deck list (Get Shared / Create Deck /
    Import File, plus Janki's Load Lectures). Janki's Calendar/Practice code shows that
    bar again when leaving those views, which squeezed the page: keep it hidden there."""
    bw = getattr(mw, "bottomWeb", None)
    if bw is None or getattr(bw, "_jk_oni_hide", False):
        return
    orig = bw.setVisible

    def setVisible(visible, _orig=orig):
        if visible and (getattr(mw, "state", None) == "deckBrowser" or _bottom_hold[0]):
            visible = False
        return _orig(visible)
    bw.setVisible = setVisible
    bw._jk_oni_hide = True
    if getattr(mw, "state", None) == "deckBrowser":
        orig(False)


_TRAY_DEFAULTED = os.path.join(_ROOT, "user_files", "onigiri_tray_defaulted")


def _default_tray_off() -> None:
    """With Onigiri, Anki-in-tray (menu-bar icon + keep running when closed) defaults
    off: switched off once, the first time Onigiri is seen. Turning it back on in
    Settings → Appearance → Window sticks."""
    if os.path.exists(_TRAY_DEFAULTED):
        return
    try:
        from ..util.config import _cfg_raw
        cfg = _cfg_raw()                    # stored settings only (no runtime overrides)
        if cfg.get("tray_minimize", False):
            cfg["tray_minimize"] = False
            mw.addonManager.writeConfig(__name__, cfg)
            from ..system import tray
            tray._apply_tray(tray._tray_should_show())
        os.makedirs(os.path.dirname(_TRAY_DEFAULTED), exist_ok=True)
        open(_TRAY_DEFAULTED, "w").close()
    except Exception as e:
        log("onigiri tray default: %s" % e)


def _wrap_page_base_color() -> None:
    """Onigiri paints the main view's base colour solid before each page draws (to hide
    black gaps on its solid themes). With the glass on, that solid frame was itself the
    flash between screens: keep the base transparent then, like Janki's own pages."""
    try:
        from importlib import import_module
        patcher = import_module(compat.ONIGIRI_ID + ".rendering.patcher")
    except Exception as e:
        log("onigiri base colour: %s" % e)
        return
    orig = patcher.set_main_webview_background_color
    if getattr(orig, "_jk", False):
        return

    def set_main_webview_background_color(color, *a, **k):
        try:
            from ..util.config import GLASS
            if GLASS and compat.onigiri_glass():
                from aqt.qt import QColor, Qt
                web = getattr(mw, "web", None)
                if web is not None:
                    web.page().setBackgroundColor(QColor(Qt.GlobalColor.transparent))
                return
        except Exception:
            pass
        return orig(color, *a, **k)
    set_main_webview_background_color._jk = True
    patcher.set_main_webview_background_color = set_main_webview_background_color


# ---- Focus levels: Janki's Focus Mode shortcut (Tab+F, tray, lockdown) cycles
# Onigiri's own ladder instead — Focus → Flow → Zen → Focus. (Off, which brings back
# Anki's native bars, stays in Onigiri Settings → Modes; from Off, Tab+F goes to Focus.)
_LEVELS = (
    ("Focus", (True, False, False)),        # hide Anki's bars
    ("Flow", (True, True, False)),          # + Onigiri's top bar
    ("Zen", (True, True, True)),            # + the reviewer's bottom bar
)
_LEVEL_KEYS = ("hideNativeHeaderAndBottomBar", "flowMode", "maxHide")


_last_cycle = 0.0


def _wrap_header_always() -> None:
    """Onigiri leaves its reviewer header out of the page at Flow / Zen. Build it in at
    every level (rendered as for Focus) so a level change only shows / hides it live."""
    try:
        from importlib import import_module
        patcher = import_module(compat.ONIGIRI_ID + ".rendering.patcher")
        cfg_mod = import_module(compat.ONIGIRI_ID + ".core.config")
    except Exception as e:
        log("onigiri header wrap: %s" % e)
        return
    orig = patcher.generate_reviewer_top_bar_html_and_css
    if getattr(orig, "_jk", False):
        return

    def generate_reviewer_top_bar_html_and_css(*a, **k):
        get = cfg_mod.get_config_readonly
        conf = get()
        if not conf.get("flowMode", False) or not conf.get("hideNativeHeaderAndBottomBar", False):
            return orig(*a, **k)
        fake = dict(conf, flowMode=False)
        cfg_mod.get_config_readonly = lambda *_a, **_k: fake
        try:
            return orig(*a, **k)
        finally:
            cfg_mod.get_config_readonly = get
    generate_reviewer_top_bar_html_and_css._jk = True
    patcher.generate_reviewer_top_bar_html_and_css = generate_reviewer_top_bar_html_and_css


_HEADER_JS = (
    "(function(show,anim){var h=document.getElementById('onigiri-reviewer-ui-host');"
    "if(!h)return;var A=[{opacity:0},{opacity:1}],O={duration:200,easing:'cubic-bezier(.2,.8,.2,1)'};"
    "if(show){var was=h.style.display==='none';h.style.setProperty('display','block','important');"
    "if(anim&&was){try{h.animate(A,O);}catch(e){}}"
    "if(window.onigiriRefreshReviewerHeaderOffset)try{window.onigiriRefreshReviewerHeaderOffset();}catch(e){}}"
    "else if(h.style.display!=='none'){if(anim){try{var a=h.animate(A.slice().reverse(),O);"
    "a.onfinish=function(){h.style.setProperty('display','none','important');};return;}catch(e){}}"
    "h.style.setProperty('display','none','important');}})(%s,%s)")


def _apply_header_level(anim=False) -> None:
    if getattr(mw, "state", None) != "review":
        return
    try:
        show = "true" if _focus_level() == 1 else "false"
        mw.web.eval(_HEADER_JS % (show, "true" if anim else "false"))
    except Exception as e:
        log("onigiri header level: %s" % e)


def _switch_bars_live() -> None:
    """Fade the top bar and the answer bar together for the new level."""
    bw = getattr(mw, "bottomWeb", None)
    was_bar = bool(bw is not None and bw.isVisible() and bw.height() > 0)
    try:
        from importlib import import_module
        import_module(compat.ONIGIRI_ID + ".rendering.patcher")._update_toolbar_visibility(
            mw.state, mw.state)           # Onigiri's bars for the level (Zen: answer bar 0 h)
    except Exception:
        pass
    _apply_header_level(anim=True)
    try:
        now_bar = bool(bw is not None and bw.isVisible() and bw.height() > 0)
        if now_bar and not was_bar:
            bw.eval("(function(){var b=document.body;if(b)try{b.animate([{opacity:0},"
                    "{opacity:1}],{duration:%d,easing:'cubic-bezier(.2,.8,.2,1)'});}catch(e){}})()"
                    % _FADE_BARS_MS)
    except Exception:
        pass
_FADE_BARS_MS = 200
_BARS_READY_JS = (
    "(function(){var n=0;(function w(){var h=document.getElementById('onigiri-reviewer-ui-host');"
    "if(h&&h.shadowRoot&&h.shadowRoot.getElementById('onigiri-reviewer-header')){"
    "h.style.setProperty('opacity','0','important');pycmd('janki_oni:barsready');return;}"
    "if(++n>8){pycmd('janki_oni:barsready');return;}setTimeout(w,25);})();})()")


def _hide_bottom_for_fade() -> None:
    """Keep the whole answer bar off (not just its page, which reloads with the card)
    until the top bar is ready; _fade_bars_in brings both in together."""
    try:
        _bottom_hold[0] = True
        mw.bottomWeb.setVisible(False)
    except Exception:
        pass


def _fade_bars_in() -> None:
    """Start the top bar's and the answer bar's fade-in in the same tick (no-op once
    they're already showing)."""
    anim = ("[{opacity:0},{opacity:1}],{duration:%d,easing:'cubic-bezier(.2,.8,.2,1)'}"
            % _FADE_BARS_MS)
    try:
        mw.web.eval("(function(){var h=document.getElementById('onigiri-reviewer-ui-host');"
                    "if(!h||h.style.opacity!=='0')return;h.style.removeProperty('opacity');"
                    "try{h.animate(%s);}"
                    "catch(e){}})()" % anim)
        if _bottom_hold[0]:
            # start the bar's page at 0 and fade it, then show the bar — same tick as
            # the top bar's fade (Onigiri's rule decides whether it shows: Zen hides it)
            mw.bottomWeb.eval("(function(){var b=document.body;if(!b)return;"
                              "try{b.animate(%s);}catch(e){}})()" % anim)
            _release_bottom()
    except Exception as e:
        log("onigiri bars fade: %s" % e)


def cycle_focus_level() -> None:
    from importlib import import_module
    import time
    global _last_cycle
    # one level per press: the level change rebuilds the page while F is still down,
    # so its key-up can be missed and auto-repeat kept firing the shortcut
    # Only real presses count: the level change rebuilds the page while F is still down,
    # so its key-up is missed and auto-repeat keeps firing the shortcut. Those repeats
    # carry Qt's isAutoRepeat flag (seen by _FKeyWatch); a short guard covers any left.
    now = time.monotonic()
    _trace("cycle gate: repeat=%s dt=%.2f" % (_f_watch.repeat if _f_watch else None,
                                                now - _last_cycle))
    if _f_watch is not None and _f_watch.repeat:
        return
    if now - _last_cycle < 0.25:
        return
    _last_cycle = now
    if os.path.exists(os.path.expanduser("~/.janki_oni_trace")):
        import traceback
        _trace("focus cycle: called (state=%s) via %s" % (
            getattr(mw, "state", None),
            " <- ".join("%s:%d" % (f.name, f.lineno) for f in traceback.extract_stack()[-6:-1])))
    try:
        cfg_mod = import_module(compat.ONIGIRI_ID + ".core.config")
        conf = cfg_mod.get_config()
        cur = tuple(bool(conf.get(k, False)) for k in _LEVEL_KEYS)
        idx = next((i for i, (_n, v) in enumerate(_LEVELS) if v == cur), -1)
        name, vals = _LEVELS[(idx + 1) % len(_LEVELS)]      # Off (-1) → Focus
        for k, v in zip(_LEVEL_KEYS, vals):
            conf[k] = v
        cfg_mod.write_config(conf)
        try:                                  # apply now: bars per screen + redraw
            patcher = import_module(compat.ONIGIRI_ID + ".rendering.patcher")
            patcher._update_toolbar_visibility(mw.state, mw.state)
        except Exception as e:
            log("onigiri focus bars: %s" % e)
        try:
            if getattr(mw, "state", None) == "review":
                # rebuild the review page so Onigiri adds (or leaves out) its header for
                # the new level, then show the same card / side without replaying it
                r = mw.reviewer
                if getattr(r, "card", None) is not None:
                    r._initWeb()
                    r.web.eval("window.__jkNoType=1;window.__jkNoFade=1;")
                    r._redraw_current_card()
                    _restore_body_class(r)
                else:
                    mw.reset()
            elif getattr(mw, "state", None) == "deckBrowser":
                mw.deckBrowser.refresh()
        except Exception as e:
            log("onigiri focus redraw: %s" % e)
        _apply_card_centring()
        from aqt.utils import tooltip
        tooltip("Focus: %s" % name, period=1200)
    except Exception as e:
        _trace("focus cycle error: %r" % e)
        log("onigiri focus cycle: %s" % e)


def _review_f_shortcut(state: str, shortcuts: list) -> None:
    """Plain F while reviewing cycles the focus level (as well as Tab+F). Anything
    else already on F moves to Alt+F, as Janki does for its Z/X/C/V keys."""
    if state != "review":
        return
    _trace("review shortcuts: %s" % [str(k) for k, _f in shortcuts if str(k).lower().endswith("f")])
    for i, (k, fn) in enumerate(list(shortcuts)):
        if str(k).lower() == "f":
            shortcuts[i] = ("Alt+F", fn)
    shortcuts.append(("f", cycle_focus_level))


def _set_focus_level(name: str) -> None:
    """Jump straight to one of the cycle's levels (Focus / Flow / Zen)."""
    from importlib import import_module
    vals = dict(_LEVELS).get(name)
    if vals is None:
        return
    try:
        cfg_mod = import_module(compat.ONIGIRI_ID + ".core.config")
        conf = cfg_mod.get_config()
        # land one step before the target, then let the cycle apply it (same redraw path)
        names = [n for n, _v in _LEVELS]
        prev = _LEVELS[(names.index(name) - 1) % len(_LEVELS)][1]
        for k, v in zip(_LEVEL_KEYS, prev):
            conf[k] = v
        cfg_mod.write_config(conf)
        cycle_focus_level()
    except Exception as e:
        log("onigiri focus set: %s" % e)


# ---- Which of the top bar's buttons show (Janki keeps the list; Onigiri has no
# per-button setting). Right-click ON the bar → tick/untick each one.
_BAR_ITEMS = (("decks", "Decks"), ("add", "Add"), ("browse", "Browse"), ("stats", "Stats"),
              ("sync", "Sync"), ("hashi", "Hashi Notes"), ("pomodoro", "Pomodoro"),
              ("level", "Level"), ("progress", "Progress"))
_bar_rect = None          # Onigiri's top bar in the card view (CSS px), from the page

_BAR_JS = r"""(function(H){
function key(el){var oc=el.getAttribute&&el.getAttribute('onclick')||'';
 var m=oc.match(/pycmd\(['"]([a-z]+)['"]\)/);if(m&&['decks','add','browse','stats','sync'].indexOf(m[1])>=0)return m[1];
 var c=(el.className&&el.className.baseVal!==undefined?el.className.baseVal:el.className)||'';
 if(/progress/i.test(c))return 'progress';if(/restaurant|level/i.test(c))return 'level';
 var t=(el.textContent||'').toLowerCase();if(t.indexOf('hashi')>=0)return 'hashi';
 if(t.indexOf('pomodoro')>=0)return 'pomodoro';return '';}
function apply(){var host=document.getElementById('onigiri-reviewer-ui-host');
 var root=host&&host.shadowRoot;var hd=root&&root.getElementById('onigiri-reviewer-header');
 if(!hd)return false;var box=hd.querySelector('.onigiri-reviewer-header-buttons')||hd;
 /* top gap ≈ the Show Answer bar's gap at the bottom of the window */
 if(!root.getElementById('jk-bar-align')){var st=document.createElement('style');
  st.id='jk-bar-align';st.textContent='#onigiri-reviewer-header{margin-top:8px!important;'+
  'padding-top:0!important;padding-bottom:0!important;}';root.appendChild(st);}
 /* a style rule in the bar's own root, so it keeps applying when Onigiri redraws the
    buttons (per-element hiding was lost on its redraws) */
 var sel={decks:"a[onclick*=\"'decks'\"]",add:"a[onclick*=\"'add'\"]",
  browse:"a[onclick*=\"'browse'\"]",stats:"a[onclick*=\"'stats'\"]",
  sync:"a[onclick*=\"'sync'\"]",level:"[class*=restaurant],[class*=level-chip]"};
 /* scoped twice to the header's id: Onigiri's own button rule outranked a bare one */
 var P='#onigiri-reviewer-header#onigiri-reviewer-header ';
 var rules=H.filter(function(k){return sel[k];}).map(function(k){
  return sel[k].split(',').map(function(x){return P+x;}).join(',');});
 var hs=root.getElementById('jk-bar-hide');if(!hs){hs=document.createElement('style');
  hs.id='jk-bar-hide';root.appendChild(hs);}
 hs.textContent=rules.length?rules.join(',')+'{display:none!important;}':'';
 [].forEach.call(box.children,function(el){if(el.style.display==='none')el.style.display='';});
 var rep=function(){var r=hd.getBoundingClientRect();
  pycmd('janki_oni:barrect:'+[r.left,r.top,r.width,r.height].map(Math.round).join(','));};
 rep();if(!host.__jkBarCtx){host.__jkBarCtx=1;window.addEventListener('resize',rep);
  if(window.ResizeObserver)new ResizeObserver(rep).observe(hd);}
 if(window.onigiriRefreshReviewerHeaderOffset)try{window.onigiriRefreshReviewerHeaderOffset();}catch(e){}
 return true;}
if(!apply()){var n=0,t=setInterval(function(){if(apply()||++n>40)clearInterval(t);},50);}
})(%s)"""


# Items Onigiri has its own setting for: the checklist reads/writes those (so it matches
# Onigiri Settings both ways); the rest (Decks/Add/Browse/Stats/Sync) Janki keeps.
def _oni_get(key):
    from importlib import import_module
    conf = import_module(compat.ONIGIRI_ID + ".core.config").get_config_readonly()
    if key in ("hashi", "pomodoro"):          # Onigiri's own rule (tool shown + header)
        vis = import_module(compat.ONIGIRI_ID + ".core.study_tool_visibility")
        return bool(vis.reviewer_button_visible(
            "hashi_notes" if key == "hashi" else "pomodoro", conf))
    if key == "level":
        rl = conf.get("restaurant_level") or (conf.get("achievements", {}) or {}).get(
            "restaurant_level", {}) or {}
        return bool(rl.get("enabled", False) and rl.get("show_reviewer_header", False))
    if key == "progress":
        return bool(conf.get("onigiri_reviewer_progress_enabled", True))
    return None


def _oni_set(key, on) -> None:
    from importlib import import_module
    cfg_mod = import_module(compat.ONIGIRI_ID + ".core.config")
    conf = cfg_mod.get_config()
    if key == "hashi":
        conf.setdefault("hashi_notes", {})["show_in_reviewer_header"] = bool(on)
    elif key == "pomodoro":
        conf["onigiri_pomodoro_show_in_reviewer_header"] = bool(on)
    elif key == "progress":
        conf["onigiri_reviewer_progress_enabled"] = bool(on)
    elif key == "level":
        # write where Onigiri keeps it (top level, or under achievements)
        if "restaurant_level" in conf or "achievements" not in conf:
            rl = conf.setdefault("restaurant_level", {})
        else:
            rl = conf["achievements"].setdefault("restaurant_level", {})
        rl["show_reviewer_header"] = bool(on)
        if on:
            rl["enabled"] = True
    cfg_mod.write_config(conf)
    try:                                       # its progress settings are cached per session
        import_module(compat.ONIGIRI_ID + ".rendering.patcher")._reviewer_progress_settings(
            force=True)
    except Exception:
        pass


def _bar_hidden() -> list:
    from ..util.config import _cfg
    v = _cfg().get("onigiri_bar_hidden", [])
    return list(v) if isinstance(v, list) else []


def _bar_item_shown(key) -> bool:
    try:
        v = _oni_get(key)
    except Exception:
        v = None
    return v if v is not None else key not in _bar_hidden()


def _rebuild_review_page() -> None:
    """Rebuild the review page (Onigiri bakes its header in at render) on the same card
    and side, without replaying the type-out."""
    r = mw.reviewer
    if getattr(mw, "state", None) != "review" or getattr(r, "card", None) is None:
        return
    r._initWeb()
    r.web.eval("window.__jkNoType=1;window.__jkNoFade=1;")
    r._redraw_current_card()
    _restore_body_class(r)


def _restore_body_class(r) -> None:
    """A rebuilt page redrawn on the ANSWER side never gets the card's body classes
    (only Anki's _showQuestion sets them), so `.card` rules — e.g. the note's centred
    text — stopped applying after a focus-level change."""
    try:
        import json
        from aqt.theme import theme_manager
        if getattr(r, "state", None) == "answer":
            cls = theme_manager.body_classes_for_card_ord(r.card.ord)
            r.web.eval("document.body.className=%s;" % json.dumps(cls))
    except Exception as e:
        log("onigiri body class: %s" % e)


def _apply_bar_buttons(*_a) -> None:
    if getattr(mw, "state", None) != "review":
        return
    try:
        import json
        hidden = [k for k in _bar_hidden() if k not in ("hashi", "pomodoro", "progress", "level")]
        mw.web.eval(_BAR_JS % json.dumps(hidden))
    except Exception as e:
        log("onigiri bar buttons: %s" % e)


def _toggle_bar_item(key: str) -> None:
    try:
        if _oni_get(key) is not None:           # Onigiri's own setting
            _oni_set(key, not _oni_get(key))
            _rebuild_review_page()
            return
    except Exception as e:
        log("onigiri bar setting: %s" % e)
    from ..util.config import _cfg_raw
    cfg = _cfg_raw()
    hidden = [k for k in (cfg.get("onigiri_bar_hidden") or []) if isinstance(k, str)]
    (hidden.remove if key in hidden else hidden.append)(key)
    cfg["onigiri_bar_hidden"] = hidden
    mw.addonManager.writeConfig(__name__, cfg)
    _apply_bar_buttons()


def _review_context_menu(webview, menu) -> None:
    """Right-click while reviewing. On Onigiri's top bar: tick which of its buttons
    show. Elsewhere: hide or show the whole bar (Flow / Focus)."""
    if getattr(mw, "state", None) != "review" or webview is not getattr(mw, "web", None):
        return
    on_bar = False
    try:
        from aqt.qt import QCursor
        if _bar_rect and _focus_level() <= 1:
            p = webview.mapFromGlobal(QCursor.pos())
            z = webview.zoomFactor() or 1.0
            x, y = p.x() / z, p.y() / z
            l, t, w, h = _bar_rect
            on_bar = l <= x <= l + w and t <= y <= t + h
    except Exception:
        on_bar = False
    if on_bar:
        try:
            menu.clear()
            for key, label in _BAR_ITEMS:
                a = menu.addAction(label)
                a.setCheckable(True)
                a.setChecked(_bar_item_shown(key))
                a.triggered.connect(lambda _c=False, k=key: _toggle_bar_item(k))
            menu.addSeparator()
            a = menu.addAction("Hide top buttons")
            a.triggered.connect(lambda: _set_focus_level("Flow"))
        except Exception as e:
            log("onigiri bar menu: %s" % e)
        return
    try:
        lvl = _focus_level()
        menu.addSeparator()
        if lvl <= 1:
            a = menu.addAction("Hide top buttons")
            a.triggered.connect(lambda: _set_focus_level("Flow"))
        else:
            a = menu.addAction("Show top buttons")
            a.triggered.connect(lambda: _set_focus_level("Focus"))
    except Exception as e:
        log("onigiri review menu: %s" % e)


_f_watch = None


def _install_f_watch() -> None:
    """Track whether the latest F key press is an auto-repeat (app-wide event filter)."""
    global _f_watch
    if _f_watch is not None:
        return
    from aqt.qt import QObject, QEvent, Qt

    class _FKeyWatch(QObject):
        repeat = False

        def eventFilter(self, obj, ev):
            try:
                if ev.type() == QEvent.Type.KeyPress and ev.key() == Qt.Key.Key_F:
                    self.repeat = bool(ev.isAutoRepeat())
                elif ev.type() == QEvent.Type.ShortcutOverride and ev.key() == Qt.Key.Key_F:
                    self.repeat = bool(ev.isAutoRepeat())
            except Exception:
                pass
            return False
    _f_watch = _FKeyWatch(mw)
    mw.app.installEventFilter(_f_watch)


def _wrap_focus_toggle() -> None:
    _install_f_watch()
    from ..features import focus
    try:
        sc = getattr(mw, "_janki_focus_sc", None)
        if sc is not None:
            sc.setAutoRepeat(False)
    except Exception:
        pass
    if getattr(focus._toggle_focus_mode, "_jk_oni", False):
        return

    def _toggle_focus_mode(*_a, **_k):
        cycle_focus_level()
    _toggle_focus_mode._jk_oni = True
    focus._toggle_focus_mode = _toggle_focus_mode


def _focus_level() -> int:
    """Onigiri's focus level: 0 Off, 1 Focus, 2 Flow, 3 Zen."""
    try:
        from importlib import import_module
        conf = import_module(compat.ONIGIRI_ID + ".core.config").get_config_readonly()
        if conf.get("maxHide", False):
            return 3
        if conf.get("flowMode", False):
            return 2
        return 1 if conf.get("hideNativeHeaderAndBottomBar", False) else 0
    except Exception:
        return 0


def _apply_card_centring(*_a) -> None:
    """At any Onigiri focus level (Focus / Flow / Zen) the card centres on screen, as in
    Janki's own Focus Mode (Off → back to the top). Centred on the WINDOW, not just the
    card's view: with the answer bar showing (Focus, Flow) the view ends above it, so the
    card would sit high — the view's top padding makes up the bar's height, and never
    less than Onigiri's header (kept visible at Focus). Applied live for Tab+F."""
    if getattr(mw, "state", None) != "review":
        return
    try:
        import json
        from ..features import focus as _focus
        level = _focus_level()
        if level >= 1:
            bw = getattr(mw, "bottomWeb", None)
            bar = bw.height() if bw is not None and bw.isVisible() else 0
            css = _focus._FOCUS_CSS.replace("#onigiri-reviewer-ui-host{display:none!important;}", "")
            if bar:   # answer bar showing: keep Reworded / Practice right above it
                css += "#jk-rw-bar,#jk-pq-bar,body .jp-slide-btn{bottom:4px!important;}"
            js = ("(function(){var s=document.getElementById('__janki_focus');"
                  "if(!s){s=document.createElement('style');s.id='__janki_focus';"
                  "(document.head||document.documentElement).appendChild(s);}"
                  "var hdr=Math.ceil(window.onigiriReviewerHeaderOffsetPx||0);"
                  "var pad=Math.max(%d,hdr,36);"   # never under the title strip (Zen: no bars)
                  # photo fit (focus.py) sizes for the height left below this pad
                  "window.__jkFitPad=pad;"
                  "s.textContent=%s+'body,#jk-sc{padding-top:'+pad+'px!important;"
                  "padding-bottom:0!important;box-sizing:border-box!important;}';"
                  # refit once the new layout has settled (a focus-level rebuild measured
                  # the card mid-rebuild and shrank the photo)
                  "if(window.__jkFit)setTimeout(function(){try{window.__jkFit();}catch(e){}},80);"
                  # Onigiri's inline push-down margin on #qa (beats style sheets) → auto
                  "var q=document.getElementById('qa');if(q){q.dataset.onigiriBaseMarginTop='0px';if(!q.__jkSP){var st=q.style,"
                  "sp=st.setProperty.bind(st);q.__jkSP=sp;st.setProperty=function(p,v,pr){"
                  "if(p==='margin-top'&&document.getElementById('__janki_focus'))return;"
                  "return sp(p,v,pr);};}q.__jkSP('margin-top','auto','important');}"
                  "})()" % (int(bar), json.dumps(css)))
        else:
            js = ("(function(){var s=document.getElementById('__janki_focus');"
                  "if(s)s.remove();try{%s}catch(e){}})()" % _focus._ONIGIRI_FOCUS_OFF)
        mw.web.eval(js)
    except Exception as e:
        log("onigiri card centring: %s" % e)


def _zen_on() -> bool:
    try:
        from importlib import import_module
        conf = import_module(compat.ONIGIRI_ID + ".core.config").get_config_readonly()
        return bool(conf.get("maxHide", False))
    except Exception:
        return False


_bottom_hold = [False]


def _sync_fullscreen(*_a) -> None:
    """Tell the bottom bar whether the window is full screen (Edit / More show only
    then)."""
    try:
        fs = bool(mw.windowState() & Qt.WindowState.WindowFullScreen)
        bw = getattr(mw, "bottomWeb", None)
        if bw is not None:
            bw.eval("document.documentElement.classList.toggle('jk-fs',%s)"
                    % ("true" if fs else "false"))
    except Exception as e:
        log("onigiri fullscreen sync: %s" % e)


def _watch_fullscreen(*_a) -> None:
    try:
        wh = mw.windowHandle()
        if wh is not None and not getattr(mw, "_jk_fs_watch", False):
            mw._jk_fs_watch = True
            wh.windowStateChanged.connect(_sync_fullscreen)
    except Exception as e:
        log("onigiri fullscreen watch: %s" % e)


def _release_bottom() -> None:
    _sync_fullscreen()
    if not _bottom_hold[0]:
        return
    _bottom_hold[0] = False
    try:                       # clear any page-level hide left on the bar
        mw.bottomWeb.eval("(function(){var b=document.body;if(!b)return;"
                          "['visibility','opacity','transition'].forEach(function(p){"
                          "b.style.removeProperty(p);});})()")   # incl. the Decks fade-out
    except Exception:
        pass
    # hand the bar back to Onigiri's own rule for the current focus level (Zen hides it,
    # Focus / Flow show it) — forcing it visible showed it in Zen after a review start
    try:
        from importlib import import_module
        patcher = import_module(compat.ONIGIRI_ID + ".rendering.patcher")
        patcher._update_toolbar_visibility(mw.state, mw.state)
    except Exception:
        try:
            bw = getattr(mw, "bottomWeb", None)
            if bw is not None and getattr(mw, "state", None) == "review":
                bw.setVisible(_focus_level() < 3)
        except Exception:
            pass


def _blank_stale_bottom(new_state, _old_state) -> None:
    """Starting a review, Onigiri shows the bottom bar (hidden on its overview) before the
    reviewer's buttons load, so the overview's Options / Custom Study / Description
    flashed there for a moment: blank the old page; the reviewer's own page replaces it."""
    if new_state != "review":
        _bottom_hold[0] = False
        return
    # hold the bar hidden until the reviewer's own buttons are drawn into it (released
    # from the ReviewerBottomBar render below; a timer is the safety net)
    _bottom_hold[0] = True
    QTimer.singleShot(1500, _release_bottom)
    try:
        bw = getattr(mw, "bottomWeb", None)
        if bw is not None:
            bw.setVisible(False)
    except Exception:
        pass


def _add_settings_toggle() -> None:
    """A "Janki glass" section on Onigiri's Themes settings page: one toggle, the same
    switch as Janki Settings → Appearance → Window → Glass behind Onigiri (both read
    and write the collection config key compat.GLASS_KEY)."""
    try:
        from importlib import import_module
        schema = import_module(compat.ONIGIRI_ID + ".settings_web.schema")
    except Exception as e:
        log("onigiri settings toggle: %s" % e)
        return
    if getattr(schema.build_pages, "_jk_glass", False):
        return
    orig = schema.build_pages

    def build_pages(*a, **k):
        pages = orig(*a, **k)
        try:
            page = next((p for p in pages if p.get("id") == "themes"), None) or pages[0]
            page.setdefault("sections", []).append({
                "id": "janki_glass",
                "title": "Janki glass",
                "fields": [{
                    "id": "janki_onigiri_glass",
                    "type": "toggle",
                    "label": "Janki glass behind Onigiri",
                    "desc": "Onigiri's backgrounds and menus become see-through so "
                            "Janki's frosted window glass shows behind them. Layout and "
                            "colours stay Onigiri's.",
                    "bind": {"kind": "col", "key": compat.GLASS_KEY},
                    "default": False,
                }],
            })
        except Exception as e:
            log("onigiri settings toggle: %s" % e)
        return pages
    build_pages._jk_glass = True
    schema.build_pages = build_pages


def _mirror_glass_setting() -> None:
    """Keep Janki's launch-time copy in step with the collection (the Onigiri toggle
    only writes the collection)."""
    try:
        compat.set_onigiri_glass(compat.onigiri_glass())
    except Exception:
        pass


def install() -> None:
    if not compat.onigiri_on():
        return
    gui_hooks.webview_did_receive_js_message.append(_on_js_message)
    # ahead of Onigiri's own handler, which switches pages at once
    gui_hooks.webview_did_receive_js_message._hooks.insert(0, _on_review_decks)
    _wrap_move_to_state()
    gui_hooks.webview_will_set_content.append(_on_will_set_content)
    _wrap_render_page()
    _wrap_tree()
    gui_hooks.deck_browser_did_render.append(_sync_strip)
    gui_hooks.overview_did_refresh.append(_sync_strip)
    gui_hooks.state_did_change.append(_sync_strip)
    gui_hooks.state_did_change.append(_blank_stale_bottom)
    gui_hooks.overview_did_refresh.append(_overview_refreshed)
    # (plain F needs nothing extra: Janki's own main-window F shortcut calls
    # focus._toggle_focus_mode, which _wrap_focus_toggle points at the level cycle — a
    # second F shortcut made Qt treat the key as ambiguous and fire neither)
    gui_hooks.webview_will_show_context_menu.append(_review_context_menu)
    gui_hooks.reviewer_did_show_question.append(_apply_bar_buttons)
    gui_hooks.reviewer_did_show_question.append(_apply_card_centring)
    gui_hooks.reviewer_did_show_answer.append(_apply_card_centring)
    gui_hooks.reviewer_did_show_question.append(_sync_fullscreen)
    gui_hooks.reviewer_did_show_answer.append(_sync_fullscreen)
    gui_hooks.profile_did_open.append(_watch_fullscreen)
    # Onigiri's config is per profile, so register once a profile is open.
    gui_hooks.profile_did_open.append(_register)
    gui_hooks.profile_did_open.append(_keep_bottom_bar_hidden)
    gui_hooks.profile_did_open.append(_default_tray_off)
    gui_hooks.profile_will_close.append(_mirror_glass_setting)
    _add_settings_toggle()
    _wrap_stats()
    _wrap_kome()
    _wrap_kome_fades()
    _wrap_page_base_color()
    _wrap_focus_toggle()
    _wrap_deck_open()
    _wrap_cal_back()
    if _strip is None:
        globals()["_strip"] = _TopStrip()
    # paint the remembered colour before the dashboard's first draw
    gui_hooks.profile_did_open.append(_sync_strip)
