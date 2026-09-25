"""Make rewords work on AnkiMobile / AnkiDroid.

Mobile can't run add-ons, so we bake the rewords INTO the note types (which sync):
- a hidden field ``_JankiRW`` per affected note holds base64(JSON) of its variants
  ({"q":[...], "a":[...]}), and
- a marker-fenced template block (added to qfmt+afmt of the affected note types)
  reads that field and shows a small "Original / Reworded" toggle button, styled
  like the Practice "show original slide" button, that swaps the card text.

Everything is local: the data rides your normal sync inside your own notes; nothing
is uploaded anywhere else. Re-running :func:`apply` refreshes the data + block in
place (idempotent); :func:`remove` strips the block again.

Limitation (first cut): variants are keyed per note+side, not per cloze ord, so a
cloze note with multiple blanks shares one variant pool across its cards.
"""

import base64
import json
import re

from aqt import mw

from ..util.config import log, _cfg
from . import reword

FIELD = "_JankiRW"
_START = "<!-- janki-reword:start -->"
_END = "<!-- janki-reword:end -->"

_BTN_STYLE = (
    # Match the Practice "show original slide" button (.jp-slide-btn): same fill,
    # muted colour, and opacity so it reads the same subdued/dark look.
    "position:fixed;z-index:99999;display:none;opacity:0.55;"
    "left:50%;transform:translateX(-50%);"
    "bottom:calc(30px + env(safe-area-inset-bottom));"
    "font-size:13px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;"
    "color:#9fb4d8;background:rgba(28,29,33,0.7);"
    "border:1px solid rgba(255,255,255,0.2);border-radius:6px;padding:5px 12px;"
    "-webkit-appearance:none;appearance:none;line-height:normal;white-space:nowrap;"
    "touch-action:manipulation;"
)

# Template block. {{_JankiRW}} emits the note's base64 payload (empty on notes with
# no reword → the button stays hidden). Guarded so the FrontSide copy on the back
# doesn't double-init, and it de-dupes stray nodes from that copy.
def _tpl(side: str = "q") -> str:
    """The template block for the front ("q") or back ("a") template, with the "hide the
    button on cards that have no rephrasing" setting baked in. The side is stamped on the
    block because cloze back templates often have no <hr id=answer> to detect it by."""
    hide = "true" if _cfg().get("reword_mobile_hide_unrephrased", True) else "false"
    # Janki's mobile card font set DIRECTLY on the reword (not just inherited from .card),
    # so a wrapper or heading style in the note type can't swap it out.
    font_css = ""
    try:
        from ..integrations import mobilecards
        if mobilecards.is_applied():
            font_css = ("#jkrw-alt,#jkrw-alt *{font-family:%s !important;}"
                        % mobilecards._font_stack())
    except Exception:
        pass
    return (_TPL.replace("__JKRW_HIDE__", hide).replace("__JKRW_SIDE__", side)
            .replace("__JKRW_FONTCSS__", font_css))


_TPL = (
    _START + "\n"
    '<div id="jkrw-b64" data-side="__JKRW_SIDE__" hidden>{{' + FIELD + '}}</div>\n'
    # Reworded blanks/terms use class="cloze" so the note type's own cloze style applies;
    # this :where() fallback has zero specificity (only used when the template has none).
    '<style>:where(#jkrw-alt .cloze){color:#6db3ff;font-weight:bold;}'
    'html.jkrw-pre body{opacity:0!important;}__JKRW_FONTCSS__</style>\n'
    '<div id="jkrw-alt" style="display:none;color:#fff;font-size:1em;'
    'line-height:1.5;text-align:center;padding:0 6px;"></div>\n'
    '<button id="jkrw-btn" style="' + _BTN_STYLE + '">Original</button>\n'
    "<script>\n"
    "(function(){\n"
    # Answer side opened with a reword chosen on the front: keep the card invisible until
    # the reword is swapped in (no flash of the original). Runs synchronously, before the
    # first paint; render() lifts it, and a 600 ms safety lifts it regardless.
    "  try{var pe=document.querySelector('#jkrw-b64[data-side=\"a\"]');if(pe&&typeof pycmd==='undefined'){\n"
    "    var pd=JSON.parse(decodeURIComponent(escape(atob((pe.textContent||'').trim()))));\n"
    "    var cc0=(document.body?document.body.className:'')+' '+((document.querySelector('.card')||{}).className||'');\n"
    "    var om0=cc0.match(/\\bcard(\\d+)\\b/);var k0=(pd.n||'x')+':'+(om0?om0[1]:'0');\n"
    "    var v0=(window.__jkrw||{})[k0];if(v0===undefined)v0=parseInt(sessionStorage.getItem('jkrw:'+k0)||'0',10)||0;\n"
    "    if(v0>0){var de=document.documentElement;de.classList.add('jkrw-pre');\n"
    "      setTimeout(function(){de.classList.remove('jkrw-pre');},600);}}}catch(e){}\n"
    "  function ready(fn){if(document.readyState!='loading')fn();"
    "else document.addEventListener('DOMContentLoaded',fn);}\n"
    "  ready(function(){ try{\n"
    # Desktop Anki handles rephrasings via the add-on (card_will_show) — pycmd exists
    # ONLY on desktop, never on AnkiMobile/AnkiDroid. On desktop this block removes
    # itself and does nothing. NON-DESTRUCTIVE on mobile: it never moves the card DOM,
    # only toggles element visibility, so it can't blank the card.
    "    var mobile=(typeof pycmd==='undefined');\n"
    "    var els=document.querySelectorAll('#jkrw-b64');\n"
    # Back side = the BACK template's block is present (a FrontSide copy of the front's
    # block may come first); fall back to Anki's <hr id=answer>.
    "    var back=!!document.querySelector('#jkrw-b64[data-side=\"a\"]')||"
    "!!document.getElementById('answer');\n"
    "    var alts=document.querySelectorAll('#jkrw-alt');\n"
    "    var btns=document.querySelectorAll('#jkrw-btn');\n"
    "    var i;\n"
    "    if(!mobile){for(i=0;i<els.length;i++)els[i].remove();"
    "for(i=0;i<alts.length;i++)alts[i].remove();"
    "for(i=0;i<btns.length;i++)btns[i].remove();return;}\n"
    "    for(i=1;i<els.length;i++)els[i].remove();\n"
    "    for(i=1;i<alts.length;i++)alts[i].remove();\n"
    "    for(i=1;i<btns.length;i++)btns[i].remove();\n"
    "    var el=document.getElementById('jkrw-b64');\n"
    "    var alt=document.getElementById('jkrw-alt');\n"
    "    var btn=document.getElementById('jkrw-btn');\n"
    "    if(!el||!alt||!btn)return;\n"
    # Per-ELEMENT guard (not a global): AnkiMobile reuses one page and swaps card HTML
    # without reloading, so a window flag would block every card after the first. Each
    # new card has a fresh button, so guard on the element itself.
    "    if(btn.getAttribute('data-jkrw'))return; btn.setAttribute('data-jkrw','1');\n"
    # position:fixed is relative to the nearest transformed/animated ancestor, so inside
    # some card templates the button sat at the bottom of the CARD, not the screen. Float
    # it on <body> instead. AnkiMobile swaps cards without reloading, so the floated button
    # removes itself once its card's content is gone from the page.
    "    var home=btn.parentNode;\n"
    # A spacer under the card lets long content scroll clear of the floating button
    # instead of sitting under it; it leaves with the button.
    "    function flt(){btn.classList.add('jkrw-floating');\n"
    "      if(btn.parentNode!==document.body)document.body.appendChild(btn);\n"
    "      var old=document.querySelectorAll('body > .jkrw-spacer');for(var q=0;q<old.length;q++)old[q].remove();\n"
    "      var sp=document.createElement('div');sp.className='jkrw-spacer';\n"
    "      sp.style.cssText='height:calc(76px + env(safe-area-inset-bottom));pointer-events:none;';\n"
    "      document.body.appendChild(sp);\n"
    "      var iv=setInterval(function(){if(!home||!document.body.contains(home)){\n"
    "        clearInterval(iv);if(btn.parentNode)btn.remove();if(sp.parentNode)sp.remove();}},400);}\n"
    "    var data=null;\n"
    "    try{data=JSON.parse(decodeURIComponent(escape(atob((el.textContent||'').trim()))));}"
    "catch(e){data=null;}\n"
    "    var hideOrig=__JKRW_HIDE__;\n"

    # Per-card payload ({o:{ord:{q,a}}}): pick THIS card's ord from the cardN class Anki
    # puts on the card (cloze siblings each have their own rephrasings). No class → merge.
    # Old payloads ({q,a} merged per note) still work.
    "    var list=[],fmtd=false;\n"
    "    if(data&&data.o){\n"
    "      var cc=(document.body.className||'')+' '+"
    "((document.querySelector('.card')||{}).className||'');\n"
    "      var om=cc.match(/\\bcard(\\d+)\\b/);\n"
    "      if(om){var d0=data.o[String(parseInt(om[1],10)-1)];"
    "list=(d0&&(back?d0.a:d0.q))||[];fmtd=!!(d0&&d0.f);}\n"
    "      else{Object.keys(data.o).forEach(function(k){"
    "((back?data.o[k].a:data.o[k].q)||[]).forEach(function(v){"
    "if(list.indexOf(v)<0)list.push(v);});});}\n"
    "    }else if(data){list=(back?data.a:data.q)||[];}\n"
    # No rephrasing for this card: hide the button, or (setting off) keep a faint, inert
    # "Original" so the button sits in the same place on every card.
    # Remember the front's choice so revealing the answer shows the matching REWORDED
    # answer (not the original). Per card (note id + ord); window for AnkiMobile (same page),
    # sessionStorage for viewers that reload between sides.
    "    var ck=(data&&data.n?data.n:'x')+':'+(om?om[1]:'0');\n"
    "    function sget(){try{var w=(window.__jkrw||{})[ck];if(w!==undefined)return w;"
    "return parseInt(sessionStorage.getItem('jkrw:'+ck)||'0',10)||0;}catch(e){return 0;}}\n"
    "    function sset(v){try{(window.__jkrw=window.__jkrw||{})[ck]=v;"
    "sessionStorage.setItem('jkrw:'+ck,String(v));}catch(e){}}\n"
    "    if(!back)sset(0);\n"
    "    if(!list.length){if(hideOrig){btn.remove();return;}"
    "btn.textContent='Original';btn.style.opacity='0.3';btn.style.pointerEvents='none';"
    "flt();btn.style.display='';return;}\n"
    "    function esc(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML;}\n"
    # Escape, colour cloze blanks blue (like real clozes), and keep line breaks.
    # Blanks blue like real clozes, filled with this card's HINTS when it has them
    # ([increase/decrease]), one per deletion or a shared one; keeps line breaks.
    # Pre-formatted entries (built on desktop) are used as-is; older plain entries are
    # escaped, blanks marked as cloze, line breaks kept.
    "    function fmt(s){if(fmtd)return s;\n"
    "      return esc(s).replace(/\\[(\\.\\.\\.|\\u2026)\\]/g,'<span class=\"cloze\">[$1]</span>')\n"
    "        .replace(/\\n/g,'<br>');}\n"
    # Card content = the SIBLINGS of our injected nodes (the card template output and
    # our nodes share a parent — on mobile that's a wrapper inside <body>, not body
    # itself). We only flip their display, so the original card is always intact.
    "    var host=btn.parentNode||document.body;\n"
    # Hide the ORIGINAL everywhere, not just next to the button: part of the card can live
    # outside our container (the back half after {{FrontSide}}, a note-type or theming
    # wrapper). Walk up from the reword box to <body>; at each level hide every sibling
    # except the path down to it. Bare text nodes are wrapped in a span so they can be
    # hidden; elements are never moved. Each hidden element's own inline display is saved
    # and restored exactly.
    # What to hide is worked out at TOGGLE time, not once at load: other scripts on the card
    # (theming / text-reveal effects) can re-create its text after load, which left the
    # original's plain text showing above the reword.
    "    var hidden=[];\n"
    "    function collect(){var out=[];var node=alt;\n"
    "      while(node&&node!==document.body&&node.parentNode){var par=node.parentNode;\n"
    "        [].slice.call(par.childNodes).forEach(function(n){\n"
    "          if(n.nodeType===3&&n.nodeValue.replace(/\\s+/g,'')){\n"
    "            var sp=document.createElement('span');sp.className='jkrw-txt';\n"
    "            par.insertBefore(sp,n);sp.appendChild(n);}});\n"
    "        [].slice.call(par.children).forEach(function(n){\n"
    "          if(n===node||n===btn||n===el)return;\n"
    "          var tn=(n.tagName||'').toUpperCase();\n"
    "          if(tn==='SCRIPT'||tn==='STYLE'||tn==='LINK'||tn==='META'||tn==='TEMPLATE')return;\n"
    "          if(n.classList&&(n.classList.contains('jkrw-floating')||n.classList.contains('jkrw-spacer')))return;\n"
    # pinned on-screen controls (e.g. a settings gear) aren't card content — leave them
    "          try{if(getComputedStyle(n).position==='fixed')return;}catch(e){}\n"
    "          out.push(n);});\n"
    "        node=par;}return out;}\n"
    "    function showAll(){hidden.forEach(function(n){n.style.display=n.__jkd||'';});hidden=[];}\n"
    "    function hide1(n){if(n.__jkd===undefined)n.__jkd=n.style.display||'';\n"
    "      n.style.setProperty('display','none','important');}\n"
    "    function hideAll(){showAll();hidden=collect();hidden.forEach(hide1);}\n"
    # While a reword is showing, content re-created later by other scripts (text-reveal /
    # theming rebuild the card's text after load — on the answer side that re-showed the
    # original above the reword) is hidden as it appears. Only ADDS to what's hidden, and our
    # own text wrapping settles after one pass, so it can't loop.
    "    var watching=false;\n"
    "    function rehide(){watching=false;if(idx===0)return;collect().forEach(function(n){\n"
    "      if(hidden.indexOf(n)<0){hidden.push(n);hide1(n);}});}\n"
    "    try{new MutationObserver(function(){if(idx>0&&!watching){watching=true;rehide();}})"
    ".observe(document.body,{childList:true,subtree:true});}catch(e){}\n"
    # The card's pictures go under the reword (like desktop): clones, originals untouched.
    "    function pics(){var seen={},h='';hidden.forEach(function(n){\n"
    "      var ims=(n.tagName||'').toUpperCase()==='IMG'?[n]:[].slice.call(n.querySelectorAll?n.querySelectorAll('img'):[]);\n"
    "      ims.forEach(function(im){var s=im.getAttribute('src')||'';if(!s||seen[s])return;seen[s]=1;\n"
    "        var c=im.cloneNode(false);c.style.display='';c.style.maxWidth='100%';h+='<br>'+c.outerHTML;});});\n"
    "      return h;}\n"
    "    var idx=0;\n"
    "    function render(){\n"
    "      if(idx===0){showAll();alt.style.display='none'; btn.textContent='Original';}\n"
    "      else{hideAll();alt.innerHTML=fmt(list[idx-1])+pics(); alt.style.display='';"
    "document.documentElement.classList.remove('jkrw-pre');"
    "btn.textContent=list.length>1?('Reworded '+idx+'/'+list.length):'Reworded';}\n"
    "    }\n"
    "    function toggle(e){if(e){e.preventDefault();e.stopPropagation();}"
    "idx=(idx+1)%(list.length+1);render();if(!back)sset(idx);}\n"
    "    btn.addEventListener('click',toggle);\n"
    "    flt();\n"
    "    if(back){var st0=sget();if(st0>0){idx=Math.min(st0,list.length);render();}}\n"
    "    btn.style.display='';\n"  # start on original; leave card untouched
    "  }catch(e){}});\n"
    "})();\n"
    "</script>\n"
    + _END
)


def _stripped(s: str) -> str:
    return re.sub(re.escape(_START) + r".*?" + re.escape(_END), "",
                  s or "", flags=re.S).rstrip()


def _by_note():
    """{note_id: {ord: {"q":[variants], "a":[variants]}}} from the reword store — kept per
    card ord so a cloze sibling without its own rephrasing doesn't borrow another's."""
    out = {}
    for key, rec in reword._load().items():
        try:
            nid, ordn, side = key.split(":")
            nid, ordn = int(nid), int(ordn)
        except (ValueError, AttributeError):
            continue
        if side not in ("q", "a"):
            continue
        vs = [v for v in (rec.get("variants") or []) if v]
        if not vs:
            continue
        d = out.setdefault(nid, {}).setdefault(ordn, {"q": [], "a": []})
        if rec.get("html"):
            d.setdefault("html", set()).add(side)
        for v in vs:
            if v not in d[side]:
                d[side].append(v)
    return out


def _formatted(note, ordn: int, side: str, variants, is_html: bool) -> list:
    """Each reword as display-ready HTML, built with the SAME formatter desktop uses:
    list structure, bold, enlarged key phrases, cloze blanks (with hints) / highlighted
    answer terms, and the card's own size/font/alignment wrapper."""
    card = None
    for c in note.cards():
        if c.ord == int(ordn):
            card = c
            break
    if card is None:
        return []
    html = card.question() if side == "q" else card.answer()
    if is_html:
        return list(variants)                   # already full HTML (list reorders)
    is_cz = reword._is_cloze(note)
    pre, suf = reword._preserve_style(html)
    out = []
    for v in variants:
        try:
            out.append(pre + reword._format_text_variant(v, html, side, note, int(ordn), is_cz)
                       + suf)
        except Exception:
            out.append(v.replace("\n", "<br>"))
    return out


def _payload(dd, note=None) -> str:
    o = {}
    for k, v in dd.items():
        ent = {}
        html_sides = v.get("html") or set()
        if note is not None:
            try:
                for side in ("q", "a"):
                    ent[side] = _formatted(note, int(k), side, v.get(side, []),
                                           side in html_sides)
                ent["f"] = 1                     # entries are ready-made HTML
            except Exception as exc:
                log(f"reword mobile format {note.id}:{k}: {exc}")
                ent = {}
        if not ent:                              # fallback: plain text (escaped on device)
            ent = {"q": v.get("q", []), "a": v.get("a", [])}
        o[str(k)] = ent
    doc = {"o": o}
    if note is not None:
        doc["n"] = int(note.id)                 # card identity for front→back carry-over
    raw = json.dumps(doc, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
    return base64.b64encode(raw).decode("ascii")


def restamp_templates() -> int:
    """Re-write the template block (e.g. after the hide-button setting changes) on note
    types that already carry it. No note/field changes, so it's a normal (not full) sync."""
    n = 0
    try:
        for m in mw.col.models.all():
            touched = False
            for t in m.get("tmpls", []):
                for k in ("qfmt", "afmt"):
                    if _START in (t.get(k, "") or ""):
                        t[k] = (_stripped(t.get(k, "")) + "\n"
                                + _tpl("a" if k == "afmt" else "q") + "\n")
                        touched = True
            if touched:
                mw.col.models.update_dict(m)
                n += 1
    except Exception as exc:
        log(f"reword mobile restamp: {exc}")
    return n


def is_applied() -> bool:
    try:
        for m in mw.col.models.all():
            for t in m.get("tmpls", []):
                if _START in (t.get("qfmt", "") or "") or _START in (t.get("afmt", "") or ""):
                    return True
    except Exception:
        pass
    return False


def apply():
    """Bake the reword data + toggle into every note type that has rewords. Returns
    (models_touched, notes_written). A schema change (new field) means the next sync
    is a one-way full sync."""
    col = mw.col
    data = _by_note()
    if not col or not data:
        return (0, 0)
    from collections import defaultdict
    by_mid = defaultdict(list)
    for nid, dd in data.items():
        try:
            note = col.get_note(nid)
        except Exception:
            continue
        by_mid[note.mid].append((nid, dd))

    nmodels = nnotes = 0
    for mid, items in by_mid.items():
        try:
            model = col.models.get(mid)
            if not model:
                continue
            names = [f["name"] for f in model["flds"]]
            if FIELD not in names:
                col.models.add_field(model, col.models.new_field(FIELD))
            for t in model["tmpls"]:
                t["qfmt"] = _stripped(t.get("qfmt", "")) + "\n" + _tpl("q") + "\n"
                t["afmt"] = _stripped(t.get("afmt", "")) + "\n" + _tpl("a") + "\n"
            col.models.update_dict(model)
            nmodels += 1
        except Exception as exc:
            log(f"reword mobile model {mid}: {exc}")
            continue
        for nid, dd in items:
            try:
                n2 = col.get_note(nid)
                n2[FIELD] = _payload(dd, n2)
                col.update_note(n2)
                nnotes += 1
            except Exception as exc:
                log(f"reword mobile note {nid}: {exc}")
    # Keep Janki's mobile theming in step (e.g. its tap flare now skips the reword button).
    try:
        from ..integrations import mobilecards
        if nmodels and mobilecards.is_applied():
            mobilecards.refresh_quiet()       # CSS + templates, and theme any new types
    except Exception as exc:
        log(f"reword mobile: theming restamp: {exc}")
    return (nmodels, nnotes)


def remove():
    """Strip the template block from all note types AND delete the hidden _JankiRW
    field so nothing is left baked in your notes. Returns models touched."""
    col = mw.col
    if not col:
        return 0
    n = 0
    for m in col.models.all():
        try:
            mid = m["id"]
            model = col.models.get(mid)
            hit = False
            for t in model["tmpls"]:
                if _START in (t.get("qfmt", "") or "") or _START in (t.get("afmt", "") or ""):
                    t["qfmt"] = _stripped(t.get("qfmt", ""))
                    t["afmt"] = _stripped(t.get("afmt", ""))
                    hit = True
            if hit:
                col.models.update_dict(model)
            # Drop the hidden field (clears the base64 payload from every note).
            model = col.models.get(mid)
            fld = next((f for f in model["flds"] if f.get("name") == FIELD), None)
            if fld is not None:
                try:
                    col.models.remove_field(model, fld)
                    hit = True
                except Exception as exc:
                    log(f"reword mobile remove field {mid}: {exc}")
            if hit:
                n += 1
        except Exception as exc:
            log(f"reword mobile remove {m.get('id')}: {exc}")
    return n
