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
import json
import shutil
from pathlib import Path
from aqt import mw
from aqt.utils import showInfo, askUser, tooltip

from ..util.config import log, _cfg

# Original note-type CSS + templates are backed up here (in $HOME so it survives an
# add-on update, which wipes the add-on folder). Revert restores from this exactly.
_BACKUP = Path.home() / ".janki_mobile_theme_backup.json"

# Selectable card fonts (label -> font-family stack). The chosen label is stored in
# config as `mobile_font`; the stack is baked into the note-type CSS on apply.
FONTS = {
    "Georgia (serif)": 'Georgia,"Times New Roman",serif',
    "Times New Roman": '"Times New Roman",Times,serif',
    "System (sans-serif)": '-apple-system,system-ui,"Segoe UI",Roboto,sans-serif',
    "Rounded": 'ui-rounded,"SF Pro Rounded",-apple-system,system-ui,sans-serif',
    "Helvetica": 'Helvetica,Arial,sans-serif',
    "Typewriter (mono)": 'ui-monospace,Menlo,"Courier New",Courier,monospace',
    # OFL font shipped with the add-on and embedded into collection.media (see
    # _EMBED_FONTS) so it renders on the iPad too. Georgia is kept in the stack as a
    # per-glyph fallback for characters Lora lacks (e.g. Greek β/α/γ on med cards).
    "Lora (serif)": '"LoraJanki",Georgia,"Times New Roman",serif',
}
DEFAULT_FONT = "Georgia (serif)"

# Fonts that must be shipped into collection.media (with a leading underscore so
# Anki keeps + syncs them) and declared via @font-face. Only OFL/redistributable
# fonts belong here — media syncs to AnkiWeb, so anything proprietary must NOT be
# embedded. Keyed by the FONTS label; each entry carries the @font-face family name
# and the (media_name, asset_name, weight_range, style) of every face to embed.
_ASSET_FONTS = Path(__file__).resolve().parents[2] / "assets" / "fonts"
_EMBED_FONTS = {
    "Lora (serif)": {
        "face": "LoraJanki",
        "files": [
            ("_janki_Lora.ttf", "Lora.ttf", "400 700", "normal"),
            ("_janki_Lora-Italic.ttf", "Lora-Italic.ttf", "400 700", "italic"),
        ],
    },
}


def current_font() -> str:
    """The label of the currently selected mobile font (falls back to default)."""
    lbl = _cfg().get("mobile_font", DEFAULT_FONT)
    return lbl if lbl in FONTS else DEFAULT_FONT


def _font_stack() -> str:
    return FONTS.get(current_font(), FONTS[DEFAULT_FONT])


def _font_face_css() -> str:
    """@font-face rules for the selected font, if it's an embedded one. Empty for
    plain system-font choices (nothing to declare)."""
    spec = _EMBED_FONTS.get(current_font())
    if not spec:
        return ""
    out = ""
    for media_name, _asset, weight, style in spec["files"]:
        out += (
            "@font-face{font-family:'" + spec["face"] + "';"
            "src:url('" + media_name + "');"
            "font-weight:" + weight + ";font-style:" + style + ";"
            "font-display:swap;}\n"
        )
    return out


def _ensure_font_media() -> None:
    """Copy the selected embedded font's files from the add-on into collection.media
    (idempotent). No-op for system fonts or if the assets/media aren't available."""
    spec = _EMBED_FONTS.get(current_font())
    if not spec or mw is None or mw.col is None:
        return
    try:
        mdir = Path(mw.col.media.dir())
    except Exception:
        return
    for media_name, asset, _weight, _style in spec["files"]:
        dst = mdir / media_name
        if dst.exists():
            continue
        src = _ASSET_FONTS / asset
        if not src.exists():
            log("mobilecards font asset missing: %s" % src)
            continue
        try:
            shutil.copyfile(src, dst)
        except Exception as exc:
            log("mobilecards font copy %s: %s" % (media_name, exc))

# --- fenced blocks (markers make apply idempotent + remove exact) --------------

_CSS_START = "/*janki-mobile-start*/"
_CSS_END = "/*janki-mobile-end*/"
_TPL_START = "<!--janki-mobile-start-->"
_TPL_END = "<!--janki-mobile-end-->"

# Scoped to the platform classes Anki adds to the card (covered both as the card
# element itself and as an ancestor, since that has varied across versions).
def _css_block() -> str:
    return (
        _CSS_START + "\n"
        + _font_face_css() +
        ".mobile,.iphone,.ipad,.android{background:#000 !important;}\n"
        # Center the card content vertically. On AnkiMobile the platform classes
        # (mobile/iphone/ios) are on <html>, <body> IS the card (it carries .card), and
        # #qa is a shorter content wrapper inside body sitting at the top. So make <body>
        # the flex column and center #qa in it with margin:auto (won't clip cards taller
        # than the screen). dvh tracks the *visible* viewport (vh is the taller layout one).
        "html.mobile>body,html.iphone>body,html.ios>body,html.ipad>body,html.android>body{\n"
        "  min-height:100vh;min-height:100dvh;\n"
        "  display:flex !important;flex-direction:column !important;\n"
        "}\n"
        ".mobile #qa,.iphone #qa,.ios #qa,.ipad #qa,.android #qa{\n"
        "  margin-top:auto !important;margin-bottom:auto !important;\n"
        "}\n"
        # Kill the iOS rubber-band bounce so a card that fits can't be dragged/scrolled
        # into the empty space below it. (The JS below also locks body to the visible
        # height and disables overflow when the card fits; this is the CSS fallback.)
        "html.mobile,html.iphone,html.ios,html.ipad,html.android{overscroll-behavior:none !important;}\n"
        # Hide the scrollbar/scroll indicator while a (long) card is scrolled.
        "html.mobile::-webkit-scrollbar,html.iphone::-webkit-scrollbar,html.ios::-webkit-scrollbar,"
        "html.ipad::-webkit-scrollbar,html.android::-webkit-scrollbar,"
        ".mobile ::-webkit-scrollbar,.iphone ::-webkit-scrollbar,.ios ::-webkit-scrollbar,"
        ".ipad ::-webkit-scrollbar,.android ::-webkit-scrollbar{\n"
        "  display:none !important;width:0 !important;height:0 !important;background:transparent !important;}\n"
        "html.mobile,html.iphone,html.ios,html.ipad,html.android{scrollbar-width:none !important;}\n"
        ".mobile .card,.card.mobile,.mobile.card,"
        ".iphone .card,.card.iphone,.ipad .card,.card.ipad,"
        ".android .card,.card.android{\n"
        "  background:#000 !important;color:#fff !important;\n"
        "  font-family:" + _font_stack() + " !important;\n"
        "}\n"
        ".mobile .card a,.card.mobile a,.iphone .card a,.card.iphone a,"
        ".ipad .card a,.card.ipad a,.android .card a,.card.android a{color:#6db3ff !important;}\n"
        # Cloze deletions (incl. the hidden [...] preview) in light blue, not green.
        ".mobile .cloze,.iphone .cloze,.ipad .cloze,.android .cloze{color:#6db3ff !important;}\n"
        # AnKing: hide the broken hyperlink watermark photo (#pic / _AnKingRound.png).
        ".mobile #pic,.iphone #pic,.ipad #pic,.android #pic{display:none !important;}\n"
        # Let taps on images pass THROUGH to the card, so position-press grading + the
        # tap flare work over photos (AnkiMobile otherwise swallows image taps for its
        # native zoom, and our touchstart never fires). Trade-off: no tap/pinch-zoom on
        # card images. Scoped to mobile; desktop unaffected.
        ".mobile img,.iphone img,.ipad img,.android img{pointer-events:none !important;}\n"
        # AnKing: keep the resource hint buttons in a horizontal row, not stacked.
        ".mobile .hintBtn,.iphone .hintBtn,.ipad .hintBtn,.android .hintBtn{\n"
        "  display:inline-block !important;vertical-align:middle;margin:3px 2px;\n"
        "}\n"
        # AnKing: hide the (broken/missing) resource-button icons. They render as the
        # stray "!" glyphs and, since they have no size until they fail to load, they
        # grow #qa on load and make the vertically-centered card jump.
        ".mobile .button-general img,.iphone .button-general img,"
        ".ipad .button-general img,.android .button-general img,"
        ".mobile .hintBtn img,.iphone .hintBtn img,"
        ".ipad .hintBtn img,.android .hintBtn img{display:none !important;}\n"
        # AnKing countdown timer (#s2 / .timer): hide it entirely — both the counting
        # m:ss clock and the "time's up" message (a vertical column of red "!") it writes
        # into #s2 when it expires.
        ".mobile .timer,.iphone .timer,.ipad .timer,.android .timer,"
        ".mobile #s2,.iphone #s2,.ipad #s2,.android #s2{display:none !important;}\n"
        # AnKing has a trailing plain <hr> after the answer (before the hidden buttons)
        # that shows as a lone line at the bottom of the back. Hide every <hr> except the
        # question/answer separator (<hr id=answer>), which we keep.
        ".mobile hr:not(#answer),.iphone hr:not(#answer),"
        ".ipad hr:not(#answer),.android hr:not(#answer){display:none !important;}\n"
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
    # --- tap-position flare (POC) — only fires when a tap actually DID something
    # (revealed the answer or graded), detected by a card re-render after the tap.
    # The touch listeners just RECORD the last tap (position + whether we were on the
    # back); the draw happens on the next render (see the consume check after the sig
    # guard). Listen-only (no preventDefault) so position-press grading still works.
    "  if(!window.__jkFlareInit){ window.__jkFlareInit=1;\n"
    # Handlers defined ONCE on window (persist across cards); state lives on window too.
    # They're RE-BOUND to the current document every render (block after this guard),
    # because AnkiMobile swaps the document per card — that dropped the listeners after
    # card 1. The flare draws immediately on touchstart and is removed if the touch
    # becomes a scroll (nothing needs to survive the card change).
    # IO cards have no <hr id=answer> marker, so front/back can't be told apart —
    # give them the edge-glow directly (detected via IO's container elements).
    "    window.__jkIsIO=function(){ try{ return !!document.querySelector('[id^=\"io-\"],#io-overlay,#io-wrapper,[class*=occlus]'); }catch(e){ return false; } };\n"
    "    window.__jkH={\n"
    # Draw the flare IMMEDIATELY on touchstart (visible before the card advances). If
    # the touch becomes a scroll, remove it. Nothing has to survive the card change.
    "      ts:function(ev){ try{ var t=ev.touches&&ev.touches[0]; if(!t)return; window.__jkMoved=false; window.__jkSX=t.clientX; window.__jkSY=t.clientY;\n"
    "          window.__jkFlareDraw({x:t.clientX,y:t.clientY,wasBack:!!document.getElementById('answer')}); }catch(e){} },\n"
    "      tm:function(ev){ try{ var t=ev.touches&&ev.touches[0]; if(!t)return; if(!window.__jkMoved&&(Math.abs(t.clientX-window.__jkSX)>12||Math.abs(t.clientY-window.__jkSY)>12)){ window.__jkMoved=true; var el=window.__jkEl; if(el&&el.parentNode) el.parentNode.removeChild(el); } }catch(e){} },\n"
    # Pointer events as a fallback trigger: they often still fire when an overlay (e.g.
    # Image Occlusion) swallows the touch events. Deduped against touch via __jkLast.
    "      pd:function(ev){ try{ window.__jkMoved=false; window.__jkSX=ev.clientX; window.__jkSY=ev.clientY; window.__jkFlareDraw({x:ev.clientX,y:ev.clientY,wasBack:!!document.getElementById('answer')}); }catch(e){} },\n"
    "      pm:function(ev){ try{ if(!window.__jkMoved&&(Math.abs(ev.clientX-window.__jkSX)>12||Math.abs(ev.clientY-window.__jkSY)>12)){ window.__jkMoved=true; var el=window.__jkEl; if(el&&el.parentNode) el.parentNode.removeChild(el); } }catch(e){} }\n"
    "    };\n"
    # Draw: neutral/subtle for a reveal (front->back); grade-coloured for a grade
    # (back->next). Grade zones = left/right column x top/middle/bottom third —
    # left+middle=Hard, left+top/bottom=Again; right+middle=Good, right+top/bottom=Easy.
    "    window.__jkFlareDraw=function(p){ if(window.__jkLast&&Date.now()-window.__jkLast<350) return; window.__jkLast=Date.now();\n"
    "      var vw=window.innerWidth||1, vh=window.innerHeight||1, fx=p.x/vw, fy=p.y/vh, grade, col; window.__jkEl=null;\n"
    # Back-side: <hr id=answer> when present (normal cards). IO has no such marker, so
    # infer from the input sequence — taps alternate reveal,grade,reveal,grade..., one
    # reveal + one grade per card, so a toggle stays in sync and self-resets each grade.
    # State kept on window + localStorage so it survives IO's front->back re-render.
    "      var back=p.wasBack;\n"
    # Cloze cards have no <hr id=answer> either — detect the back reliably: cloze text
    # is bracketed ([...]) on the front and the real (unbracketed) answer on the back.
    "      if(!back){ var cz=document.querySelectorAll('.cloze'); for(var ci=0;ci<cz.length;ci++){ var ct=(cz[ci].textContent||'').trim(); if(ct && !/^\\[[\\s\\S]*\\]$/.test(ct)){ back=true; break; } } }\n"
    "      if(!back && window.__jkIsIO()){ var s=window.__jkState; if(s===undefined){ try{ s=parseInt(localStorage.getItem('jkState'))||0; }catch(e){ s=0; } }\n"
    "        back=(s===1); var ns=back?0:1; window.__jkState=ns; try{ localStorage.setItem('jkState',ns); }catch(e){}\n"
    "        if(!back){ window.__jkJR=1; try{ localStorage.setItem('jkJR',1); }catch(e){} } }\n"
    # Grade zones on AnkiMobile's 3x3 grid (thirds at 33%/67%). Only the exact CENTRE
    # cell (middle third of BOTH x and y) is dead → no flare. Else: left half = Hard
    # (mid row) / Again (top+bottom); right half = Good (mid) / Easy (top+bottom).
    "      if(back){ var mid=(fy>=0.33&&fy<0.67), midX=(fx>=0.33&&fx<0.67);\n"
    "        if(mid&&midX){ return; }\n"
    "        var left=fx<0.5;\n"
    "        grade=left?(mid?'Hard':'Again'):(mid?'Good':'Easy');\n"
    "        col=grade==='Again'?'#ff4d4f':grade==='Hard'?'#ffb84d':grade==='Good'?'#4dd07a':'#3ba7ff';\n"
    # Grade flare = pulsing edge-glow like the desktop timer flare: an inset colour
    # glow that blooms in from every edge, one in/out pulse. Position picks the colour.
    "        var f=document.createElement('div');\n"
    # Side glow that tapers at top & bottom (rounded profile): two elliptical radial
    # gradients centred at the left & right edge mid-heights, grade colour fading to
    # transparent — each side reads as a vertical lens, faint near the top/bottom.
    "        f.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:2147483646;opacity:.15;transition:opacity .3s ease-in;background:radial-gradient(28% 60% at 0% 50%,'+col+',transparent),radial-gradient(28% 60% at 100% 50%,'+col+',transparent)';\n"
    "        document.body.appendChild(f); window.__jkEl=f;\n"
    "        setTimeout(function(){ try{ f.style.opacity='0'; }catch(e){} }, 160);\n"
    "        setTimeout(function(){ try{ f.parentNode&&f.parentNode.removeChild(f); }catch(e){} }, 520);\n"
    "      } else { grade='Show'; col='#c8c8d0';\n"
    # Reveal = subtle neutral ripple at the press point — only when tap feedback is on
    # (mobile_tap_feedback, baked in as __JK_FB__ at apply time).
    "        if(__JK_FB__){ var d=document.createElement('div');\n"
    "        d.style.cssText='position:fixed;left:'+p.x+'px;top:'+p.y+'px;width:8px;height:8px;margin:-4px 0 0 -4px;border-radius:50%;pointer-events:none;z-index:2147483647;background:'+col+';box-shadow:0 0 10px 2px '+col+';opacity:.2;transition:transform .45s ease-out,opacity .45s ease-out;';\n"
    "        document.body.appendChild(d); window.__jkEl=d;\n"
    "        requestAnimationFrame(function(){ d.style.transform='scale(7)'; d.style.opacity='0'; });\n"
    "        setTimeout(function(){ try{ d.parentNode&&d.parentNode.removeChild(d); }catch(e){} }, 550); } }\n"
    "      };\n"
    "  }\n"
    # Re-bind the once-defined listeners to the CURRENT document EVERY render (remove
    # then add = idempotent if it persisted, re-attached if AnkiMobile swapped it).
    # This is what makes taps register on every card, not just the first.
    "  try{ var H=window.__jkH; if(H){\n"
    "    document.removeEventListener('touchstart',H.ts,true); document.addEventListener('touchstart',H.ts,true);\n"
    "    document.removeEventListener('touchmove',H.tm,true); document.addEventListener('touchmove',H.tm,true);\n"
    "    document.removeEventListener('pointerdown',H.pd,true); document.addEventListener('pointerdown',H.pd,true);\n"
    "    document.removeEventListener('pointermove',H.pm,true); document.addEventListener('pointermove',H.pm,true);\n"
    "  } }catch(e){}\n"
    # IO reveal/grade sync: this render is the back (keep state) only if a reveal just
    # happened (__jkJR); otherwise it's a NEW card → reset to 'expect reveal' (state 0).
    # Makes a missed grade tap self-correct on the next card instead of showing grade
    # on the reveal press.
    "  try{ if(window.__jkIsIO && window.__jkIsIO()){ var jr=window.__jkJR; if(jr===undefined){ try{ jr=parseInt(localStorage.getItem('jkJR'))||0; }catch(e){ jr=0; } }\n"
    "    if(jr){ window.__jkJR=0; try{ localStorage.setItem('jkJR',0); }catch(e){} }\n"
    "    else { window.__jkState=0; try{ localStorage.setItem('jkState',0); }catch(e){} } } }catch(e){}\n"
    # Guard on the rendered text, not a flag on the (persistent) #qa element:
    # AnkiMobile reuses #qa across cards, so an element flag fires only on the first
    # card. A content signature re-runs on each new card, yet still dedupes the two
    # runs on the back (FrontSide's copy of this script + the afmt copy).
    "  var sig=(qa.textContent||'');\n"
    "  if(window.__jmobSig===sig) return; window.__jmobSig=sig;\n"
    # (Flare now draws immediately on tap — no next-render consume needed.)
    # No-empty-scroll: CSS 100vh here is taller than the visible viewport, leaving dead
    # scrollable space below a short card. Pin <body> to the real visible height so the
    # card still centers, and turn off overflow whenever the content fits (long cards
    # keep scrolling). Re-checked on a few timers + on resize (rotation/keyboard).
    "  try{ var jkEl=document.documentElement, jkB=document.body;\n"
    "    jkEl.style.overscrollBehavior='none'; jkB.style.overscrollBehavior='none';\n"
    "    function jkFit(){ var vh=window.innerHeight; jkB.style.minHeight=vh+'px';\n"
    "      var ov=(jkB.scrollHeight<=vh+1)?'hidden':''; jkEl.style.overflow=ov; jkB.style.overflow=ov; }\n"
    "    jkFit(); setTimeout(jkFit,300); setTimeout(jkFit,1200); setTimeout(jkFit,3000);\n"
    "    if(!window.__jmFit){ window.__jmFit=1; window.addEventListener('resize',jkFit); }\n"
    "  }catch(e){}\n"
    "  var SPEED=1.25;                                         // higher = faster\n"
    "  var marker=document.getElementById('answer');\n"
    # Underlined text is revealed as one whole span (below), not char-split: on
    # desktop glass, fragmenting a <u> into many inline boxes triggers a ~150ms
    # underline recompute. Mirrored here for consistency (cheap either way).
    "  function jkUL(node){ var p=node.parentNode; while(p&&p!==qa){ var t=(p.tagName||'').toUpperCase();\n"
    "    if(t==='U'||t==='INS') return true;\n"
    "    if(p.style&&(p.style.textDecoration||'').indexOf('underline')>=0) return true;\n"
    "    p=p.parentNode; } return false; }\n"
    "  var w=document.createTreeWalker(qa,NodeFilter.SHOW_TEXT,null),nodes=[],n;\n"
    "  while(n=w.nextNode()){ var p=n.parentNode,t=(p.tagName||'').toUpperCase();\n"
    "    if(t==='SCRIPT'||t==='STYLE') continue;\n"
    "    if(!n.nodeValue||!n.nodeValue.trim()) continue;\n"
    "    if(marker && !(marker.compareDocumentPosition(n)&4)) continue;  // back: only after <hr id=answer>\n"
    "    nodes.push([n,n.nodeValue,jkUL(n)]); }\n"
    "  var holders=[],spans=[];\n"
    "  nodes.forEach(function(e){ var h=document.createElement('span');\n"
    "    if(e[2]){ var s=document.createElement('span'); s.textContent=e[1]; s.style.visibility='hidden'; h.appendChild(s); spans.push(s); }\n"
    "    else { for(var i=0;i<e[1].length;i++){ var s=document.createElement('span');\n"
    "      s.textContent=e[1][i]; s.style.visibility='hidden'; h.appendChild(s); spans.push(s); } }\n"
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


def _tpl_block() -> str:
    """The per-card mobile script with runtime flags baked in from config.
    `mobile_tap_feedback` -> __JK_FB__ (the reveal ripple dot)."""
    fb = "true" if _cfg().get("mobile_tap_feedback", True) else "false"
    return _TPL_BLOCK.replace("__JK_FB__", fb)


def _stripped(text: str, start: str, end: str) -> str:
    """Remove any existing fenced janki-mobile block (with its fence) from text."""
    if not text:
        return text or ""
    pat = re.compile(re.escape(start) + r".*?" + re.escape(end) + r"\n?", re.S)
    return pat.sub("", text)


# AnKing hardcodes decorative images in its templates: the hyperlink "watermark"
# (<a href="...ankingmed..."><img src="_AnKingRound.jpg/.png" id="pic"></a>) and the
# resource-button icons (<img src="_Anking_v3.png">, "_pathoma.icon.png", etc.). Many
# are missing or case-mismatched vs the media folder; case-sensitive iOS 404s each and
# stacks an "an image is missing" warning (the vertical "!" column that appears once
# the countdown reveals the buttons). CSS can only hide them (Anki still tries to load
# them), so we strip the references from the template on apply. Real card images arrive
# via {{Field}} and never appear as a literal _-prefixed src, so those are untouched.
# AnKing re-adds these on update; re-applying removes them again, and the untouched
# original is preserved in the backup, so revert restores them.
_ANKING_WM_ANCHOR_RE = re.compile(
    r"\s*<a\b[^>]*ankingmed[^>]*>\s*<img\b[^>]*>\s*</a>", re.I | re.S)
_ANKING_ICON_IMG_RE = re.compile(
    r'<img\b[^>]*\bsrc\s*=\s*["\']_[^"\'{}]*["\'][^>]*>', re.I | re.S)


def _strip_anking_decorations(text: str) -> str:
    """Remove AnKing's hardcoded decorative images (hyperlink watermark + the
    resource-button icons) that trigger iOS 'missing image' warnings."""
    if not text:
        return text or ""
    text = _ANKING_WM_ANCHOR_RE.sub("", text)
    text = _ANKING_ICON_IMG_RE.sub("", text)
    return text


# --- backup / state ------------------------------------------------------------

def _load_backup() -> dict:
    try:
        return json.loads(_BACKUP.read_text(encoding="utf-8"))
    except Exception:
        return {}


def _save_backup(d: dict) -> None:
    try:
        _BACKUP.write_text(json.dumps(d), encoding="utf-8")
    except Exception as exc:
        log("mobilecards backup save: %s" % exc)


def is_applied() -> bool:
    """True if the mobile theming is currently applied (a backup exists, or any
    note type still carries the fenced block)."""
    if _BACKUP.exists():
        return True
    try:
        for m in mw.col.models.all():
            if _CSS_START in (m.get("css", "") or ""):
                return True
            for t in m["tmpls"]:
                if _TPL_START in (t.get("qfmt", "") or "") or _TPL_START in (t.get("afmt", "") or ""):
                    return True
    except Exception:
        pass
    return False


# --- apply / revert ------------------------------------------------------------

def _sync_now() -> None:
    """Trigger Anki's normal sync (same as clicking the Sync button) so applied
    mobile-theming changes push to devices without a manual click. No-op if the
    method isn't available or sync isn't set up."""
    if mw is None:
        return
    try:
        if hasattr(mw, "on_sync_button_clicked"):
            mw.on_sync_button_clicked()
        elif hasattr(mw, "onSync"):
            mw.onSync()
    except Exception as exc:
        log("mobilecards auto-sync: %s" % exc)


def apply_all() -> None:
    if mw is None or mw.col is None:
        return
    if not askUser(
        "Add the mobile styling (OLED dark + text animation + Georgia serif) to "
        "ALL your note types?\n\n"
        "Your current note-type styling is saved locally first, so you can revert "
        "to exactly what you had. It's scoped to phones/tablets, so your desktop "
        "look is untouched. Sync afterwards to push it to the iPad.",
        title="Janki: Mobile cards",
    ):
        return
    _ensure_font_media()
    backup = _load_backup()
    n_types = n_tmpls = 0
    try:
        for m in mw.col.models.all():
            mid = str(m["id"])
            # Back up the ORIGINAL (our fenced block stripped), once per note type.
            if mid not in backup:
                backup[mid] = {
                    "name": m.get("name", ""),
                    "css": _stripped(m.get("css", ""), _CSS_START, _CSS_END),
                    "tmpls": {
                        str(t["ord"]): {
                            "qfmt": _stripped(t.get("qfmt", ""), _TPL_START, _TPL_END),
                            "afmt": _stripped(t.get("afmt", ""), _TPL_START, _TPL_END),
                        } for t in m["tmpls"]
                    },
                }
            m["css"] = _stripped(m.get("css", ""), _CSS_START, _CSS_END).rstrip() \
                + "\n\n" + _css_block() + "\n"
            blk = _tpl_block()
            for t in m["tmpls"]:
                qf = _strip_anking_decorations(_stripped(t.get("qfmt", ""), _TPL_START, _TPL_END))
                af = _strip_anking_decorations(_stripped(t.get("afmt", ""), _TPL_START, _TPL_END))
                t["qfmt"] = qf.rstrip() + "\n" + blk + "\n"
                t["afmt"] = af.rstrip() + "\n" + blk + "\n"
                n_tmpls += 1
            try:
                mw.col.models.update_dict(m)
            except Exception:
                mw.col.models.save(m)
            n_types += 1
        _save_backup(backup)
        mw.reset()
    except Exception as exc:
        log("mobilecards apply: %s" % exc)
        showInfo("Janki: couldn't apply mobile styling (%s)." % exc,
                 title="Janki: Mobile cards")
        return
    showInfo(
        "Applied mobile styling to %d note types (%d templates).\n\n"
        "Syncing now to push it to your iPad (set AnkiMobile to a Dark theme for the "
        "full OLED effect). Your original styling is saved — use “Revert mobile "
        "theming” to restore it exactly."
        % (n_types, n_tmpls),
        title="Janki: Mobile cards",
    )
    _sync_now()


def restyle_font() -> None:
    """Re-stamp only the CSS block (new font) on note types that already carry the
    theming — silent and idempotent, so the font dropdown takes effect live without
    the full apply confirmation. No-op if theming isn't applied."""
    if mw is None or mw.col is None or not is_applied():
        return
    _ensure_font_media()
    n = 0
    try:
        for m in mw.col.models.all():
            if _CSS_START not in (m.get("css", "") or ""):
                continue
            m["css"] = _stripped(m.get("css", ""), _CSS_START, _CSS_END).rstrip() \
                + "\n\n" + _css_block() + "\n"
            try:
                mw.col.models.update_dict(m)
            except Exception:
                mw.col.models.save(m)
            n += 1
        if n:
            mw.reset()
            _sync_now()
    except Exception as exc:
        log("mobilecards restyle: %s" % exc)


def restamp_templates() -> None:
    """Re-stamp only the per-card template block (e.g. after toggling tap feedback)
    on note types that already carry the theming — silent, no confirmation. No-op if
    theming isn't applied."""
    if mw is None or mw.col is None or not is_applied():
        return
    blk = _tpl_block()
    n = 0
    try:
        for m in mw.col.models.all():
            changed = False
            for t in m["tmpls"]:
                if _TPL_START not in (t.get("qfmt", "") or "") \
                        and _TPL_START not in (t.get("afmt", "") or ""):
                    continue
                qf = _strip_anking_decorations(_stripped(t.get("qfmt", ""), _TPL_START, _TPL_END))
                af = _strip_anking_decorations(_stripped(t.get("afmt", ""), _TPL_START, _TPL_END))
                t["qfmt"] = qf.rstrip() + "\n" + blk + "\n"
                t["afmt"] = af.rstrip() + "\n" + blk + "\n"
                changed = True
            if changed:
                try:
                    mw.col.models.update_dict(m)
                except Exception:
                    mw.col.models.save(m)
                n += 1
        if n:
            mw.reset()
            _sync_now()
    except Exception as exc:
        log("mobilecards restamp: %s" % exc)


def remove_all() -> None:
    """Revert: restore each note type's saved original CSS + templates exactly.
    Falls back to stripping the fenced block for any note type without a backup."""
    if mw is None or mw.col is None:
        return
    if not askUser("Revert Janki's mobile theming and restore your original "
                   "note-type styling?", title="Janki: Mobile cards"):
        return
    backup = _load_backup()
    n = 0
    try:
        for m in mw.col.models.all():
            mid = str(m["id"])
            saved = backup.get(mid)
            if saved:
                m["css"] = saved.get("css", m.get("css", ""))
                for t in m["tmpls"]:
                    st = saved.get("tmpls", {}).get(str(t["ord"]))
                    if st:
                        t["qfmt"], t["afmt"] = st.get("qfmt", t["qfmt"]), st.get("afmt", t["afmt"])
                    else:
                        t["qfmt"] = _stripped(t.get("qfmt", ""), _TPL_START, _TPL_END)
                        t["afmt"] = _stripped(t.get("afmt", ""), _TPL_START, _TPL_END)
            else:
                m["css"] = _stripped(m.get("css", ""), _CSS_START, _CSS_END)
                for t in m["tmpls"]:
                    t["qfmt"] = _stripped(t.get("qfmt", ""), _TPL_START, _TPL_END)
                    t["afmt"] = _stripped(t.get("afmt", ""), _TPL_START, _TPL_END)
            try:
                mw.col.models.update_dict(m)
            except Exception:
                mw.col.models.save(m)
            n += 1
        try:
            _BACKUP.unlink()
        except Exception:
            pass
        mw.reset()
    except Exception as exc:
        log("mobilecards revert: %s" % exc)
        showInfo("Janki: couldn't revert mobile styling (%s)." % exc,
                 title="Janki: Mobile cards")
        return
    showInfo("Reverted mobile theming and restored your original styling across "
             "%d note types.\n\nSync to update the iPad." % n,
             title="Janki: Mobile cards")


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
