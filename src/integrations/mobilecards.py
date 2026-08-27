"""One-click "mobile card styling" stamper.

AnkiMobile/AnkiDroid can't run add-ons, but card templates + styling live in the
COLLECTION, so they sync to every platform. This module writes an OLED-dark +
Georgia-serif + text-reveal-animation block into every note type (scoped to
mobile so the desktop Janki glass is untouched), so the look reaches the iPad
with nothing to install there. Fully reversible and idempotent — the blocks are
fenced with marker comments, so re-running updates in place and "remove" strips
them cleanly.
"""

import re
from aqt import mw
from aqt.utils import showInfo, askUser, tooltip

from ..util.config import log

# --- fenced blocks (markers make apply idempotent + remove exact) --------------

_CSS_START = "/*janki-mobile-start*/"
_CSS_END = "/*janki-mobile-end*/"
_TPL_START = "<!--janki-mobile-start-->"
_TPL_END = "<!--janki-mobile-end-->"

# Scoped to the platform classes Anki adds to the card (covered both as the card
# element itself and as an ancestor, since that has varied across versions).
_CSS_BLOCK = (
    _CSS_START + "\n"
    ".mobile,.iphone,.ipad,.android{background:#000 !important;}\n"
    ".mobile .card,.card.mobile,.mobile.card,"
    ".iphone .card,.card.iphone,.ipad .card,.card.ipad,"
    ".android .card,.card.android{\n"
    "  background:#000 !important;color:#fff !important;\n"
    "  font-family:Georgia,\"Times New Roman\",serif !important;\n"
    "}\n"
    ".mobile .card a,.card.mobile a,.iphone .card a,.card.iphone a,"
    ".ipad .card a,.card.ipad a,.android .card a,.card.android a{color:#6db3ff !important;}\n"
    + _CSS_END
)

# Text-reveal animation. Self-contained, mobile-only, front/back aware (only the
# newly-shown answer types on the back, via the #answer marker), and guarded so
# the copy pulled in through {{FrontSide}} on the back doesn't double-run.
_TPL_BLOCK = (
    _TPL_START + "\n"
    "<script>\n"
    "(function(){try{\n"
    "  var qa=document.getElementById('qa')||document.querySelector('.card'); if(!qa) return;\n"
    "  var cls=(document.body&&document.body.className||'')+' '+"
    "(document.documentElement&&document.documentElement.className||'')+' '+(qa.className||'');\n"
    "  if(!/mobile|ipad|iphone|android/i.test(cls)) return;   // mobile only\n"
    "  if(qa.getAttribute('data-jmob')) return; qa.setAttribute('data-jmob','1');\n"
    "  var SPEED=2.0;                                          // higher = faster\n"
    "  var marker=document.getElementById('answer');\n"
    "  var w=document.createTreeWalker(qa,NodeFilter.SHOW_TEXT,null),nodes=[],n;\n"
    "  while(n=w.nextNode()){ var p=n.parentNode,t=(p.tagName||'').toUpperCase();\n"
    "    if(t==='SCRIPT'||t==='STYLE') continue;\n"
    "    if(!n.nodeValue||!n.nodeValue.trim()) continue;\n"
    "    if(marker && !(marker.compareDocumentPosition(n)&4)) continue;  // back: only after <hr id=answer>\n"
    "    nodes.push([n,n.nodeValue]); }\n"
    "  var holders=[],spans=[];\n"
    "  nodes.forEach(function(e){ var h=document.createElement('span');\n"
    "    for(var i=0;i<e[1].length;i++){ var s=document.createElement('span');\n"
    "      s.textContent=e[1][i]; s.style.visibility='hidden'; h.appendChild(s); spans.push(s); }\n"
    "    if(e[0].parentNode){ e[0].parentNode.replaceChild(h,e[0]); holders.push([h,e[1]]); } });\n"
    "  var per=Math.max(1,Math.ceil(spans.length/Math.max(1,(600/SPEED)/12))),i=0;\n"
    "  function done(){ for(var k=0;k<holders.length;k++){ try{ holders[k][0].replaceWith(\n"
    "    document.createTextNode(holders[k][1])); }catch(e){} } }\n"
    "  if(!spans.length){ return; }\n"
    "  (function step(){ var b=per; while(b>0&&i<spans.length){ spans[i++].style.visibility='visible'; b--; }\n"
    "    i<spans.length?requestAnimationFrame(step):done(); })();\n"
    "}catch(e){}})();\n"
    "</script>\n"
    + _TPL_END
)


def _stripped(text: str, start: str, end: str) -> str:
    """Remove any existing fenced janki-mobile block (with its fence) from text."""
    if not text:
        return text or ""
    pat = re.compile(re.escape(start) + r".*?" + re.escape(end) + r"\n?", re.S)
    return pat.sub("", text)


# --- apply / remove ------------------------------------------------------------

def apply_all() -> None:
    if mw is None or mw.col is None:
        return
    if not askUser(
        "Add the mobile styling (OLED dark + text animation + Georgia serif) to "
        "ALL your note types?\n\n"
        "It's scoped to phones/tablets, so your desktop look is untouched, and "
        "you can undo it anytime with “Remove mobile styling”. You'll need to "
        "sync afterwards to push it to the iPad.",
        title="Janki: Mobile cards",
    ):
        return
    n_types = n_tmpls = 0
    try:
        for m in mw.col.models.all():
            m["css"] = _stripped(m.get("css", ""), _CSS_START, _CSS_END).rstrip() \
                + "\n\n" + _CSS_BLOCK + "\n"
            for t in m["tmpls"]:
                t["qfmt"] = _stripped(t.get("qfmt", ""), _TPL_START, _TPL_END).rstrip() \
                    + "\n" + _TPL_BLOCK + "\n"
                t["afmt"] = _stripped(t.get("afmt", ""), _TPL_START, _TPL_END).rstrip() \
                    + "\n" + _TPL_BLOCK + "\n"
                n_tmpls += 1
            try:
                mw.col.models.update_dict(m)
            except Exception:
                mw.col.models.save(m)
            n_types += 1
        mw.reset()
    except Exception as exc:
        log("mobilecards apply: %s" % exc)
        showInfo("Janki: couldn't apply mobile styling (%s)." % exc,
                 title="Janki: Mobile cards")
        return
    showInfo(
        "Applied mobile styling to %d note types (%d templates).\n\n"
        "Now Sync to push it to your iPad (make sure AnkiMobile is set to a Dark "
        "theme for the full OLED effect).\n\n"
        "To undo: Tools → Janki: Mobile cards → Remove mobile styling."
        % (n_types, n_tmpls),
        title="Janki: Mobile cards",
    )


def remove_all() -> None:
    if mw is None or mw.col is None:
        return
    if not askUser("Remove Janki's mobile styling from all note types?",
                   title="Janki: Mobile cards"):
        return
    n = 0
    try:
        for m in mw.col.models.all():
            css = _stripped(m.get("css", ""), _CSS_START, _CSS_END).rstrip() + "\n"
            changed = css != (m.get("css", "") or "")
            m["css"] = css
            for t in m["tmpls"]:
                q = _stripped(t.get("qfmt", ""), _TPL_START, _TPL_END).rstrip() + "\n"
                a = _stripped(t.get("afmt", ""), _TPL_START, _TPL_END).rstrip() + "\n"
                changed = changed or q != (t.get("qfmt", "") or "") or a != (t.get("afmt", "") or "")
                t["qfmt"], t["afmt"] = q, a
            if changed:
                try:
                    mw.col.models.update_dict(m)
                except Exception:
                    mw.col.models.save(m)
                n += 1
        mw.reset()
    except Exception as exc:
        log("mobilecards remove: %s" % exc)
        showInfo("Janki: couldn't remove mobile styling (%s)." % exc,
                 title="Janki: Mobile cards")
        return
    showInfo("Removed mobile styling from %d note types.\n\nSync to update the iPad."
             % n, title="Janki: Mobile cards")


def install_menu() -> None:
    from aqt.qt import QMenu, QAction
    menu = QMenu("Janki: Mobile cards", mw)
    a_apply = QAction("Apply OLED + animation + font to ALL note types", mw)
    a_apply.triggered.connect(apply_all)
    a_remove = QAction("Remove mobile styling from all note types", mw)
    a_remove.triggered.connect(remove_all)
    menu.addAction(a_apply)
    menu.addAction(a_remove)
    mw.form.menuTools.addMenu(menu)
