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
def _tpl() -> str:
    """The template block, with the "hide the button on cards that have no rephrasing"
    setting (Settings → Rephrase → Mobile) baked in."""
    hide = "true" if _cfg().get("reword_mobile_hide_unrephrased", True) else "false"
    return _TPL.replace("__JKRW_HIDE__", hide)


_TPL = (
    _START + "\n"
    '<div id="jkrw-b64" hidden>{{' + FIELD + '}}</div>\n'
    '<div id="jkrw-alt" style="display:none;color:#fff;font-size:1em;'
    'line-height:1.5;text-align:center;padding:0 6px;"></div>\n'
    '<button id="jkrw-btn" style="' + _BTN_STYLE + '">Original</button>\n'
    "<script>\n"
    "(function(){\n"
    "  function ready(fn){if(document.readyState!='loading')fn();"
    "else document.addEventListener('DOMContentLoaded',fn);}\n"
    "  ready(function(){ try{\n"
    # Desktop Anki handles rephrasings via the add-on (card_will_show) — pycmd exists
    # ONLY on desktop, never on AnkiMobile/AnkiDroid. On desktop this block removes
    # itself and does nothing. NON-DESTRUCTIVE on mobile: it never moves the card DOM,
    # only toggles element visibility, so it can't blank the card.
    "    var mobile=(typeof pycmd==='undefined');\n"
    "    var els=document.querySelectorAll('#jkrw-b64');\n"
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
    "    var data=null;\n"
    "    try{data=JSON.parse(decodeURIComponent(escape(atob((el.textContent||'').trim()))));}"
    "catch(e){data=null;}\n"
    "    var hideOrig=__JKRW_HIDE__;\n"
    "    var back=!!document.getElementById('answer');\n"
    # Per-card payload ({o:{ord:{q,a}}}): pick THIS card's ord from the cardN class Anki
    # puts on the card (cloze siblings each have their own rephrasings). No class → merge.
    # Old payloads ({q,a} merged per note) still work.
    "    var list=[];\n"
    "    if(data&&data.o){\n"
    "      var cc=(document.body.className||'')+' '+"
    "((document.querySelector('.card')||{}).className||'');\n"
    "      var om=cc.match(/\\bcard(\\d+)\\b/);\n"
    "      if(om){var d0=data.o[String(parseInt(om[1],10)-1)];"
    "list=(d0&&(back?d0.a:d0.q))||[];}\n"
    "      else{Object.keys(data.o).forEach(function(k){"
    "((back?data.o[k].a:data.o[k].q)||[]).forEach(function(v){"
    "if(list.indexOf(v)<0)list.push(v);});});}\n"
    "    }else if(data){list=(back?data.a:data.q)||[];}\n"
    # No rephrasing for this card: hide the button, or (setting off) keep a faint, inert
    # "Original" so the button sits in the same place on every card.
    "    if(!list.length){if(hideOrig){btn.remove();return;}"
    "btn.textContent='Original';btn.style.opacity='0.3';btn.style.pointerEvents='none';"
    "btn.style.display='';return;}\n"
    "    function esc(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML;}\n"
    # Escape, colour cloze blanks blue (like real clozes), and keep line breaks.
    "    function fmt(s){return esc(s)"
    ".replace(/\\[(\\.\\.\\.|\\u2026)\\]/g,'<span style=\"color:#6db3ff\">[$1]</span>')"
    ".replace(/\\n/g,'<br>');}\n"
    # Card content = the SIBLINGS of our injected nodes (the card template output and
    # our nodes share a parent — on mobile that's a wrapper inside <body>, not body
    # itself). We only flip their display, so the original card is always intact.
    "    var host=btn.parentNode||document.body;\n"
    "    var others=[].slice.call(host.children).filter(function(n){\n"
    "      return n!==el&&n!==alt&&n!==btn&&(n.tagName||'').toUpperCase()!=='SCRIPT';});\n"
    "    var idx=0;\n"
    "    function render(){\n"
    "      if(idx===0){others.forEach(function(n){n.style.display='';});"
    "alt.style.display='none'; btn.textContent='Original';}\n"
    "      else{others.forEach(function(n){n.style.display='none';});"
    "alt.innerHTML=fmt(list[idx-1]); alt.style.display='';"
    "btn.textContent=list.length>1?('Reworded '+idx+'/'+list.length):'Reworded';}\n"
    "    }\n"
    "    function toggle(e){if(e){e.preventDefault();e.stopPropagation();}"
    "idx=(idx+1)%(list.length+1);render();}\n"
    "    btn.addEventListener('click',toggle);\n"
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
        for v in vs:
            if v not in d[side]:
                d[side].append(v)
    return out


def _payload(dd) -> str:
    raw = json.dumps({"o": {str(k): v for k, v in dd.items()}},
                     ensure_ascii=False, separators=(",", ":")).encode("utf-8")
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
                        t[k] = _stripped(t.get(k, "")) + "\n" + _tpl() + "\n"
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
                t["qfmt"] = _stripped(t.get("qfmt", "")) + "\n" + _tpl() + "\n"
                t["afmt"] = _stripped(t.get("afmt", "")) + "\n" + _tpl() + "\n"
            col.models.update_dict(model)
            nmodels += 1
        except Exception as exc:
            log(f"reword mobile model {mid}: {exc}")
            continue
        for nid, dd in items:
            try:
                n2 = col.get_note(nid)
                n2[FIELD] = _payload(dd)
                col.update_note(n2)
                nnotes += 1
            except Exception as exc:
                log(f"reword mobile note {nid}: {exc}")
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
