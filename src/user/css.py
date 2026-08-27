"""Webview CSS builder (glass tint, typewriter caption, stats) + content hook."""

import sys
from typing import Any, Optional
from aqt import mw, gui_hooks
from aqt.webview import WebContent
from aqt.qt import QTimer
from aqt.deckbrowser import DeckBrowser, DeckBrowserBottomBar
from aqt.overview import Overview, OverviewBottomBar
from aqt.reviewer import Reviewer, ReviewerBottomBar
from aqt.toolbar import TopToolbar

from ..util.config import log, ACTIVE, GLASS, _cfg
from ..features import focus
from . import glass, hud

# ---------------------------------------------------------------------------
# CSS
# ---------------------------------------------------------------------------

def _hex_to_rgb(h):
    h = h.lstrip("#")
    if len(h) == 3:
        h = "".join(x * 2 for x in h)
    return int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)


def _tint_rgba(cfg):
    mode = cfg.get("tint_mode", "dark")
    if mode == "light":
        r, g, b = 255, 255, 255
    elif mode == "custom":
        try:
            r, g, b = _hex_to_rgb(cfg.get("tint_color", "#12141e"))
        except Exception:
            r, g, b = 18, 20, 30
    else:
        r, g, b = 18, 20, 30
    return f"rgba({r},{g},{b},{cfg.get('opacity', 0.5):.2f})"


def _props(cfg):
    blur = cfg.get("blur_radius", 12)
    sat = cfg.get("saturation", 140)
    corner = cfg.get("corner_radius", 12)
    # Panels are transparent with no outline — one consistent sheet of glass.
    return (
        f"  background-color: transparent !important;\n"
        f"  border: none !important;\n"
        f"  box-shadow: none !important;\n"
        f"  border-radius: {corner}px !important;\n"
    )


def _body_rgba(cfg):
    """Frosted tint for the whole content area, so text reads as solid on top
    while the desktop still shows through the tint."""
    mode = cfg.get("tint_mode", "dark")
    if mode == "light":
        r, g, b = 255, 255, 255
    elif mode == "custom":
        try:
            r, g, b = _hex_to_rgb(cfg.get("tint_color", "#12141e"))
        except Exception:
            r, g, b = 18, 20, 30
    else:
        r, g, b = 18, 20, 30
    return f"rgba({r},{g},{b},{cfg.get('body_opacity', 0.55):.2f})"


def _build_css(cfg, context):
    if not GLASS or not cfg.get("enabled", True):
        return ""
    props = _props(cfg)
    blur = cfg.get("blur_radius", 12)
    sat = cfg.get("saturation", 140)
    base = (
        "<style>\n"
        "/* anki-glass: strip theme backgrounds (incl. Redesign+ Graphite's blue-grey)\n"
        "   so the desktop shows through, then apply a neutral tint on body only. */\n"
        ":root, html { --canvas: transparent !important; --window-bg: transparent !important;\n"
        "  --canvas-elevated: transparent !important; --canvas-inset: transparent !important;\n"
        "  --canvas-overlay: transparent !important; --frame-bg: transparent !important;\n"
        "  --bs-body-bg: transparent !important; --current-deck: transparent !important;\n"
        "  --window-bg: transparent !important; }\n"
        # Nuke EVERY element background (keep form controls) so no theme color —\n"
        # navy or otherwise — can paint over the glass.
        "html body *:not(button):not(input):not(select):not(textarea):not(a.deck) {\n"
        "  background: transparent !important; background-color: transparent !important;\n"
        "  background-image: none !important; }\n"
        # id-specificity strip for the toolbar / bottom-bar containers, which
        # otherwise keep their opaque theme background and read darker than the
        # center card area.
        "html body #header, html body .toolbar, html body #outer,\n"
        "html body #middle, html body #bottom, html body .bottom,\n"
        "html body #innertable, html body #outer table {\n"
        "  background: transparent !important; background-color: transparent !important;\n"
        "  box-shadow: none !important; }\n"
        # The tint now lives on the WINDOW background (uniform, behind every
        # webview) so it applies equally everywhere — webview bodies stay clear.
        "html body { background: transparent !important; background-color: transparent !important; }\n"
        "/* readable text over the desktop without an opaque backing */\n"
        "body, body * {\n"
        "  text-shadow: 0 0 3px rgba(0,0,0,.95), 0 1px 2px rgba(0,0,0,.85) !important; }\n"
        "</style>\n"
    )
    parts = [base]
    screens = cfg.get("screens", {})
    r = int(cfg.get("win_corner_radius", 11))

    # QtWebEngine surfaces ignore native layer masks, so round the WINDOW's outer
    # corners here in CSS: the top webview gets rounded top corners, the bottom
    # webview rounded bottom corners. Outside the radius is transparent → desktop.
    top_round = (
        "<style>\nhtml{overflow:hidden !important;"
        f"border-top-left-radius:{r}px !important;border-top-right-radius:{r}px !important;}}\n</style>\n"
    )
    bottom_round = (
        "<style>\nhtml{overflow:hidden !important;"
        f"border-bottom-left-radius:{r}px !important;border-bottom-right-radius:{r}px !important;}}\n</style>\n"
    )

    # Gentle fade on screen loads. Anki re-renders a screen 2–3× in quick
    # succession, spaced further apart than the fade, so a per-render animation
    # plays multiple times. A per-navigation TOKEN (survives <body> swaps via
    # sessionStorage) guards it to one fade per armed navigation: the burst
    # shares the current token → first render fades and stores it, the rest skip;
    # each new armed navigation bumps _menu_fade_token → fades again.
    #   * The marker is set SYNCHRONOUSLY in <head> as a class on <html>, before
    #     the body is parsed/painted — combined with the head-CSS `both` fill the
    #     body is at opacity:0 from its very first frame, so there's no flash.
    #   * Skipped renders add no class → body shows at normal opacity 1 (no hide,
    #     so it can never get stuck invisible and there's no blink).
    fade_in = (
        "<style>@keyframes glassFadeIn{from{opacity:0}to{opacity:1}}\n"
        "html.glass-fading body{animation:glassFadeIn .25s ease-out both;}</style>\n"
        "<script>(function(){\n"
        f"  var TOKEN='{hud._menu_fade_token}';\n"
        "  if(sessionStorage.getItem('glassFadeToken')===TOKEN) return;  // already faded\n"
        "  sessionStorage.setItem('glassFadeToken', TOKEN);\n"
        "  document.documentElement.className+=' glass-fading';  // sync, pre-paint\n"
        "})();</script>\n"
    )

    if isinstance(context, DeckBrowser) and screens.get("deck_browser", True):
        parts.append("<style>\nbody center > table:first-of-type {\n" + props
                     + "  overflow:hidden;\n}\n</style>\n")
        parts.append("<style>#studiedToday,#sts-table{display:none!important;}</style>\n")
        # Hide the scrollbar: when the stats block sizing lands at the viewport
        # boundary the scrollbar would toggle on/off (a few-px flicker, bottom
        # right). A zero-width scrollbar can't flicker and no longer steals
        # horizontal space, which also breaks the reflow feedback loop. Content
        # is still scrollable via wheel/trackpad if it overflows.
        parts.append("<style>::-webkit-scrollbar{width:0!important;height:0!important;"
                     "background:transparent!important;}"
                     "html{scrollbar-width:none!important;}</style>\n")
        parts.append(fade_in)
    elif isinstance(context, (DeckBrowserBottomBar, OverviewBottomBar, ReviewerBottomBar)) \
            and screens.get("bottom_bar", True):
        parts.append("<style>\nbody #outer {\n" + props + "  margin:4px 0;\n}\n</style>\n")
        # Bottom buttons: subtle dark fill (slightly darker than the tint) + dark
        # shadow so they read as distinct, visible buttons.
        parts.append(
            "<style>\n"
            "body #outer button, body button {\n"
            "  background: rgba(0,0,0,0.28) !important;\n"
            "  border: none !important;\n"
            "  box-shadow: 0 1px 3px rgba(0,0,0,0.45) !important; }\n"
            "body #outer button:hover, body button:hover {\n"
            "  background: rgba(0,0,0,0.40) !important; }\n"
            # Again/Hard/Good/Easy: tinted background + text color (data-ease 1/2/3/4)
            # Background tint is visible on pure black (OLED) and subtle on glass.
            "body #outer button[data-ease='1']{\n"
            "  color:#ff8080 !important;font-weight:500 !important;\n"
            "  background:rgba(220,60,60,0.18) !important; }\n"
            "body #outer button[data-ease='2']{\n"
            "  color:#ffb560 !important;font-weight:500 !important;\n"
            "  background:rgba(220,140,40,0.16) !important; }\n"
            "body #outer button[data-ease='3']{\n"
            "  color:#6ddd80 !important;font-weight:500 !important;\n"
            "  background:rgba(60,200,90,0.16) !important; }\n"
            "body #outer button[data-ease='4']{\n"
            "  color:#78c4ff !important;font-weight:500 !important;\n"
            "  background:rgba(60,140,240,0.18) !important; }\n"
            "body #outer button[data-ease]:hover{\n"
            "  filter:brightness(1.15) !important; }\n"
            "</style>\n"
        )
        # Responsive bottom bar layout.
        if isinstance(context, DeckBrowserBottomBar):
            # Deck browser uses <center id=outer><table id=header>…</table></center>.
            # toolbar-bottom.css adds padding:9px to #header which overflows width:100%
            # and clips on the right, shifting the visual centre rightward.
            # Nuclear fix: convert the whole thing to a simple flex row.
            parts.append(
                "<style>\n"
                "html, body { overflow:hidden !important; margin:0 !important; padding:0 !important; }\n"
                "body { display:flex !important; justify-content:center !important;"
                " align-items:center !important; height:100% !important;"
                " padding-bottom:18px !important; box-sizing:border-box !important; }\n"
                "#outer, #header, #header tbody, #header tr, #header td {\n"
                "  display:contents !important; }\n"
                "body button { padding:6px 14px !important; min-width:0 !important;"
                " white-space:nowrap !important; }\n"
                "</style>\n"
            )
        elif isinstance(context, OverviewBottomBar):
            # Overview bottom bar (Options / Custom Study / Unbury / Description) is
            # just a row of buttons. The innertable layout centres them within the
            # middle cell, so asymmetric side cells shift them right. Flatten the
            # whole table to display:contents so the buttons become direct flex
            # children of body and centre as one group.
            parts.append(
                "<style>\n"
                "html, body { overflow:hidden !important; margin:0 !important; padding:0 !important; }\n"
                "body { display:flex !important; justify-content:center !important;"
                " align-items:center !important; gap:6px !important; height:100% !important;"
                " padding-bottom:18px !important; box-sizing:border-box !important; }\n"
                "#outer, #innertable, #innertable tbody, #innertable tr, #innertable td,\n"
                "#middle, #middle center, #middle table, #middle tbody, #middle tr, #middle td {\n"
                "  display:contents !important; }\n"
                "body button { padding:6px 14px !important; min-width:0 !important;"
                " white-space:nowrap !important; }\n"
                "</style>\n"
            )
        else:
            # Reviewer: keep the innertable flex layout (edit/more on the sides).
            parts.append(
                "<style>\n"
                "html, body { overflow-x: hidden !important; }\n"
                "#outer { width:100% !important; box-sizing:border-box !important;"
                " padding:2px 6px !important; }\n"
                "#innertable { width:100% !important; }\n"
                "#innertable > tbody > tr { display:flex !important; flex-wrap:wrap !important;\n"
                "  align-items:center !important; justify-content:center !important; gap:6px !important; }\n"
                "#innertable > tbody > tr > td { padding:2px !important; }\n"
                "#middle { flex:1 1 auto !important; display:flex !important; flex-wrap:wrap !important;\n"
                "  justify-content:center !important; align-items:center !important; gap:6px !important; }\n"
                "#middle center, #middle table, #middle tbody, #middle tr, #middle td {\n"
                "  display:contents !important; }\n"
                "#middle button { flex:1 1 0 !important; }\n"
                "#innertable > tbody > tr > td.stat { min-width:0 !important; flex:0 0 auto !important; }\n"
                "#outer button { padding:6px 12px !important; min-width:0 !important;"
                " white-space:nowrap !important; }\n"
                "</style>\n"
            )
        parts.append(bottom_round)
    elif isinstance(context, Overview) and screens.get("overview", True):
        # flex-start + clamp() top-padding: gap from toolbar is proportional to
        # available height so it never crops in short windows and never wastes
        # excessive space in tall ones. Table capped at min(400px,100%) for narrow
        # windows.
        parts.append(
            "<style>\n"
            # Strip every default margin/padding from html and body first so
            # Anki's own stylesheet can't add unexpected space.
            "html, html body { margin:0 !important; padding:0 !important; }\n"
            "html { height:100%; overflow-y:auto !important; }\n"
            # flex column on body; ::before spacer absorbs top space up to 60px
            # so content centers in tall windows but stays near the top in short ones.
            "html body {\n"
            "  min-height:100% !important; display:flex !important;\n"
            "  flex-direction:column !important; align-items:center !important;\n"
            "  justify-content:flex-start !important; text-align:center !important;\n"
            "  padding:0 12px 16px !important; box-sizing:border-box !important; }\n"
            "html body::before {\n"
            "  content:'' !important; display:block !important;\n"
            "  flex:1 1 0 !important; max-height:60px !important; min-height:2px !important; }\n"
            "html body center h1, html body h1 {\n"
            "  margin:0 0 10px !important; padding:0 !important; }\n"
            "html body > center {\n"
            "  width:100% !important; max-width:100% !important;\n"
            "  text-align:center !important; padding:0 !important; margin:0 !important; }\n"
            "html body center > table {\n"
            "  width:min(400px,100%) !important; max-width:100% !important;\n"
            "  margin:0 auto !important; table-layout:fixed !important; }\n"
            "html body center > table > tbody > tr > td {\n"
            "  width:50% !important; text-align:center !important;\n"
            "  vertical-align:middle !important; word-wrap:break-word !important; }\n"
            "</style>\n"
        )
        # "Study Time Stats" addon injects #sts-table (the deck's Total / Past
        # Week times) into the overview via innerHTML. Show it only when it fully
        # fits above the viewport bottom; otherwise hide entirely — never cropped.
        # Start hidden (no flash); the addon injects async, so watch for it with a
        # MutationObserver and re-check on resize. display:none (not removal) keeps
        # it in the DOM so the addon doesn't re-inject a duplicate.
        parts.append(
            "<style>#sts-table{visibility:hidden;}</style>\n"
            "<script>(function(){\n"
            "  function fit(){ var t=document.getElementById('sts-table'); if(!t) return;\n"
            "    t.style.display=''; t.style.visibility='hidden';\n"
            "    var vh=document.documentElement.clientHeight;\n"
            "    if(t.getBoundingClientRect().bottom<=vh-2){ t.style.visibility='visible'; }\n"
            "    else { t.style.display='none'; } }\n"
            "  var s=false; function sched(){ if(s) return; s=true;\n"
            "    requestAnimationFrame(function(){ s=false; fit(); }); }\n"
            "  if(window.MutationObserver) new MutationObserver(sched)\n"
            "    .observe(document.documentElement,{childList:true,subtree:true});\n"
            "  window.addEventListener('resize',sched); sched();\n"
            "})();</script>\n"
        )
        parts.append(fade_in)
    elif isinstance(context, Reviewer) and screens.get("reviewer", True):
        # Keep the card fully transparent (its note background is opaque otherwise).
        # The AnKing note types set `.card{background:#D1CFCE}` and, worse,
        # `.night_mode .card{background:#272828!important}` — the night-mode rule
        # has two classes + !important, so it outranks a plain `.card` override.
        # Match/beat that specificity (html-prefixed, both night-mode class spellings)
        # plus html/body so the whole page stays clear.
        parts.append(
            "<style>\n"
            "html, body,\n"
            "#qa, .card, #qa *,\n"
            "html .night_mode .card, html .nightMode.card,\n"
            "html .night_mode #qa, html .nightMode #qa,\n"
            "html .night_mode .card *, html .nightMode.card * {\n"
            "  background: transparent !important;\n"
            "  background-color: transparent !important;\n}\n</style>\n")
        # Strip the card CONTAINER outline(s). Some note types (AnKing/AnKingMed and
        # bundled templates) border both `.card` and the inner `#qa`, which reads as a
        # "box within a box" on the glass. Scoped to the two containers ONLY (not
        # descendants) so tables, kbd keys, and cloze/hint boxes keep their borders.
        # Not seen on setups running the Anki Redesign add-on (it already restyles the
        # card), but shows on a clean install — so we neutralise it here regardless.
        parts.append(
            "<style>\n"
            "#qa, .card,\n"
            "html .night_mode #qa, html .nightMode #qa,\n"
            "html .night_mode .card, html .nightMode.card {\n"
            "  border: none !important;\n"
            "  outline: none !important;\n"
            "  box-shadow: none !important;\n"
            # Also flatten the FILLED/ROUNDED form of the bubble: a note type that
            # gives the card its own tinted, rounded, shadowed panel reads as a
            # second window floating inside the glass. Strip the fill + rounding so
            # the card text sits directly on the one sheet of glass.
            "  border-radius: 0 !important;\n"
            "  background: transparent !important;\n"
            "  background-color: transparent !important;\n}\n</style>\n")
        # Lists: keep items left-aligned (bullets + wrapped lines line up), but let
        # the list box shrink-to-fit so the centered card centers it as a block —
        # a left-aligned list then reads centered instead of hugging the left edge.
        parts.append("<style>\n"
                     "#qa ul, #qa ol, .card ul, .card ol {\n"
                     "  display: inline-block !important; text-align: left !important; }\n"
                     "#qa li, .card li { text-align: left !important; }\n"
                     "</style>\n")
        # Default card font = the Anthropic serif we use elsewhere. Applied to the
        # card text (kbd/shortcut keys left alone).
        _rc = _cfg()
        _font = _rc.get("card_font", "Anthropic Serif Text")
        parts.append("<style>\n"
                     "#qa, .card, #qa *:not(kbd) {\n"
                     "  font-family: \"%s\", -apple-system, Georgia, serif !important;\n}\n"
                     "</style>\n" % _font)
        # Hide the AnKing note-type countdown timer (#s2/.timer). Its text renders
        # black (unreadable on glass) and isn't wanted — timing is handled at the
        # system level. Scoped to the reviewer, so the pomodoro HUD .timer is safe.
        parts.append("<style>\n"
                     "#s2, .timer, .timeOverMsg { display: none !important; }\n"
                     "</style>\n")
        # Card tags (AnKing #tags-container): its line-height is .45rem, so long
        # tags that wrap onto multiple lines overlap. Give it a real line-height,
        # let items wrap with spacing, and dim it.
        parts.append("<style>\n"
                     "#tags-container {\n"
                     "  opacity: 0.4 !important;\n"
                     "  line-height: 1.5 !important;\n"
                     "  display: flex !important; flex-wrap: wrap !important;\n"
                     "  justify-content: center !important; gap: 2px 6px !important;\n"
                     "  align-items: flex-start !important;\n}\n"
                     "#tags-container > * {\n"
                     "  line-height: 1.4 !important; white-space: nowrap !important;\n"
                     "  margin: 0 !important; float: none !important; }\n"
                     "</style>\n")
        # Focus Mode: while chrome is hidden, hide the card tags AND vertically
        # centre the card in the window. Re-applied on every render so it survives
        # card changes (paired with an immediate eval in _focus_set_hidden for the
        # card already on screen).
        if focus._focus_hidden:
            parts.append("<style>\n" + focus._FOCUS_CSS + "\n</style>\n")
    elif isinstance(context, TopToolbar) and screens.get("toolbar", True):
        parts.append("<style>\nbody #header {\n" + props + "}\n</style>\n")
        # The nav items (a.hitem) live inside one island (div.toolbar). Give the
        # ISLAND the dark fill (matching the bottom buttons), keep items clear, and
        # only highlight the item you're hovering.
        parts.append(
            "<style>\n"
            "html body .header .toolbar, html body div.toolbar {\n"
            "  background: rgba(0,0,0,0.52) !important;\n"
            "  border: none !important; border-radius: 14px !important;\n"
            "  box-shadow: 0 1px 3px rgba(0,0,0,0.45) !important;\n"
            "  padding: 4px 6px !important; }\n"
            "html body .header .hitem, html body a.hitem {\n"
            "  background: transparent !important; box-shadow: none !important;\n"
            "  border: none !important; border-radius: 9px !important; }\n"
            "html body .header .hitem:hover, html body a.hitem:hover {\n"
            "  background: rgba(255,255,255,0.12) !important; }\n"
            "</style>\n"
        )
        parts.append(top_round)

    return "\n".join(parts)


def _typewriter_head(cfg) -> str:
    """Rapid 'typing out' reveal of card text (anti shape-memory). Reveals text
    nodes char-by-char over a fixed duration, leaving images/formatting/MathJax
    intact, and re-fires on every card and on Show Answer."""
    wpm = int(cfg.get("typewriter_wpm", 550))       # reading speed (200–800 typical)
    min_ms = int(cfg.get("typewriter_min_ms", 300))  # floor for short cards
    max_ms = int(cfg.get("typewriter_max_ms", 2600))  # cap for very long cards
    static = "true" if cfg.get("typewriter_static", True) else "false"
    # Single user-facing speed knob (1.0 = normal, 2.0 = twice as fast). Applied
    # as a uniform divisor on the final duration so it scales EVERY card, even the
    # long ones pinned at max_ms. Clamped to a sane range.
    try:
        speed = float(cfg.get("typewriter_speed", 1.0))
    except (TypeError, ValueError):
        speed = 1.0
    speed = max(0.25, min(8.0, speed))
    return (
        # Hide the card until the script reveals it, so the full text never flashes
        # before the animation. A safety timer reveals it even if the script fails.
        "<style>#qa{visibility:hidden;}</style>\n"
        "<script>\n"
        "(function(){\n"
        f"  var WPM={wpm}, MIN_MS={min_ms}, MAX_MS={max_ms}, STATIC={static}, SPEED={speed};\n"
        "  function ready(fn){ if(document.readyState!='loading') fn();\n"
        "    else document.addEventListener('DOMContentLoaded', fn); }\n"
        "  ready(function(){\n"
        "    var qa = document.getElementById('qa'); if(!qa) return;\n"
        "    var reveal=function(){ try{ qa.style.visibility='visible'; }catch(e){} };\n"
        "    setTimeout(reveal, 600);\n"   # safety: never leave the card hidden
        "    var observer, animating=false;\n"
        "    function skip(node){ var p=node.parentNode;\n"
        "      while(p && p!==qa){ var t=(p.tagName||'').toUpperCase();\n"
        "        if(t==='SCRIPT'||t==='STYLE') return true;\n"
        "        if(t.indexOf('AMBOSS')===0) return true;   // AMBOSS custom elements\n"
        "        if(p.classList && (p.classList.contains('MathJax')||\n"
        "            p.classList.contains('MathJax_Preview')||p.classList.contains('mjx-chtml')||\n"
        "            p.classList.contains('amboss-marker'))) return true;\n"
        "        p=p.parentNode; } return false; }\n"
        "    function collect(clozeOnly){\n"
        "      if(clozeOnly){ var out=[], cs=qa.querySelectorAll('.cloze');\n"
        "        for(var k=0;k<cs.length;k++){ var w2=document.createTreeWalker(cs[k],NodeFilter.SHOW_TEXT,null),m;\n"
        "          while(m=w2.nextNode()){ if(m.nodeValue && m.nodeValue.length && !skip(m)) out.push([m,m.nodeValue]); } }\n"
        "        return out; }\n"
        "      var marker=document.getElementById('answer');\n"
        "      var w=document.createTreeWalker(qa,NodeFilter.SHOW_TEXT,null),o=[],n;\n"
        "      while(n=w.nextNode()){ if(!n.nodeValue || !n.nodeValue.length || skip(n)) continue;\n"
        "        // on the answer side, only type nodes AFTER <hr id=answer> (the back);\n"
        "        // leave the already-seen front instantly visible.\n"
        "        if(marker && !(marker.compareDocumentPosition(n) & 4)) continue;\n"
        "        o.push([n,n.nodeValue]); }\n"
        "      return o; }\n"
        "    function outerSig(){ var c=qa.cloneNode(true), cs=c.querySelectorAll('.cloze');\n"
        "      for(var i=0;i<cs.length;i++){ cs[i].textContent=''; }\n"
        "      return (c.textContent||'').replace(/\\s+/g,' ').trim(); }\n"
        "    function timing(total){ var MS=Math.max(MIN_MS,Math.min(MAX_MS,(total/5)/WPM*60000))/SPEED;\n"
        "      return Math.max(1, Math.ceil(total/Math.max(1,(MS/12)))); }\n"
        "    function typeOutStatic(clozeOnly, done){ var nodes=collect(clozeOnly), spans=[], holders=[];\n"
        "      nodes.forEach(function(e){ var tn=e[0], text=e[1];\n"
        # Wrap each char in a tagged span inside ONE holder, so the reveal can be
        # per-char but every span is removable afterward (see finish()).
        "        var holder=document.createElement('span'); holder.setAttribute('data-jtw','1');\n"
        "        for(var i=0;i<text.length;i++){ var sp=document.createElement('span');\n"
        "          sp.className='__jtwc'; sp.textContent=text[i]; sp.style.visibility='hidden';\n"
        "          holder.appendChild(sp); spans.push(sp); }\n"
        "        if(tn.parentNode){ tn.parentNode.replaceChild(holder, tn); holders.push(holder); } });\n"
        "      reveal();\n"   # full layout is present (all chars sized) → nothing moves
        # On finish, strip EVERY Janki char-span (even ones AMBOSS wrapped inside a
        # marker), then unwrap the holder + normalize — leaving clean text with
        # AMBOSS's own marker as a single element. That fixes: per-letter dropdowns,
        # wrong tooltip position, the fullscreen-hide (span.amboss-marker matches
        # again), and preserves the underline.
        "      function finish(){ for(var h=0;h<holders.length;h++){ var hd=holders[h];\n"
        "          try{ var cs=hd.querySelectorAll('span.__jtwc');\n"
        "               for(var c=0;c<cs.length;c++){ cs[c].replaceWith(document.createTextNode(cs[c].textContent)); }\n"
        "               var par=hd.parentNode;\n"
        "               if(par){ while(hd.firstChild){ par.insertBefore(hd.firstChild, hd); }\n"
        "                 par.removeChild(hd); par.normalize(); } }catch(e){} }\n"
        "        done(); }\n"
        "      var total=spans.length; if(!total){ finish(); return; }\n"
        "      var perTick=timing(total), i=0;\n"
        "      function step(){ var b=perTick;\n"
        "        while(b>0 && i<total){ spans[i].style.visibility='visible'; i++; b--; }\n"
        "        if(i<total) requestAnimationFrame(step); else finish(); }\n"
        "      requestAnimationFrame(step); }\n"
        "    function typeOut(clozeOnly, done){ if(STATIC){ return typeOutStatic(clozeOnly, done); }\n"
        "      var nodes=collect(clozeOnly);\n"
        "      var total=nodes.reduce(function(a,x){return a+x[1].length;},0);\n"
        "      if(!total){ reveal(); done(); return; }\n"
        "      // duration scales with length at WPM (5 chars/word), clamped.\n"
        "      var MS=Math.max(MIN_MS, Math.min(MAX_MS, (total/5)/WPM*60000))/SPEED;\n"
        "      nodes.forEach(function(x){ x[0].nodeValue=''; });\n"
        "      reveal();   // reveal the now-emptied card (no flash of full text)\n"
        "      var perTick=Math.max(1, Math.ceil(total/Math.max(1,(MS/12))));\n"
        "      var ni=0,ci=0;\n"
        "      function step(){ var b=perTick;\n"
        "        while(b>0 && ni<nodes.length){ var c=nodes[ni], rem=c[1].length-ci, take=Math.min(b,rem);\n"
        "          c[0].nodeValue=c[1].slice(0,ci+take); ci+=take; b-=take;\n"
        "          if(ci>=c[1].length){ ni++; ci=0; } }\n"
        "        if(ni<nodes.length) requestAnimationFrame(step); else done(); }\n"
        "      requestAnimationFrame(step); }\n"
        "    var lastSig=null;\n"
        "    // Is this the ANSWER side of a cloze card? Per-render, no cross-render state:\n"
        "    // Anki renders each active .cloze as '[...]' / '[hint]' on the FRONT and the\n"
        "    // real answer text on the BACK. So an active .cloze whose text is NOT bracketed\n"
        "    // means we're viewing the reveal.\n"
        "    function isClozeBack(){ var cz=qa.querySelectorAll('.cloze');\n"
        "      for(var i=0;i<cz.length;i++){ var t=(cz[i].textContent||'').trim();\n"
        "        if(t && !/^\\[[\\s\\S]*\\]$/.test(t)) return true; } return false; }\n"
        "    function run(){ if(animating) return;\n"
        "      var s=qa.textContent||'';\n"
        "      if(!s || !s.trim()){ return; }        // ignore transient empty states\n"
        "      if(s===lastSig){ reveal(); return; }  // already showing this card\n"
        "      lastSig=s;\n"
        "      // Cloze reveal → show instantly, no animation. Front of cloze (and basic\n"
        "      // cards) fall through and animate normally.\n"
        "      if(qa.querySelector('.cloze') && isClozeBack()){ reveal(); return; }\n"
        "      animating=true;\n"
        "      if(observer) observer.disconnect();\n"
        "      typeOut(false, function(){ animating=false;\n"
        "        if(observer) observer.observe(qa,{childList:true}); }); }\n"
        "    // childList-only + SYNCHRONOUS run: the observer microtask fires before\n"
        "    // the browser paints, so emptying the text here means the full text is\n"
        "    // never shown. Fires only on real card/answer swaps, not image/MathJax.\n"
        "    observer=new MutationObserver(run);\n"
        "    observer.observe(qa,{childList:true});\n"
        "    run();\n"
        "  });\n"
        "})();\n"
        "</script>\n"
    )


_stats_last_render: float = 0.0


def _stats_head() -> str:
    """Review history charts for the deck browser."""
    import json as _json, time as _time
    global _stats_last_render
    try:
        today_day = int(_time.time()) // 86400
        year_ago_ms = (int(_time.time()) - 367 * 86400) * 1000
        rows = mw.col.db.all(
            "SELECT CAST(id/1000/86400 AS INTEGER) AS d, COUNT(*) "
            "FROM revlog WHERE id>=? GROUP BY d ORDER BY d",
            year_ago_ms,
        )
        day_counts = {int(r[0]): int(r[1]) for r in rows}
        week_total = sum(day_counts.get(today_day - i, 0) for i in range(7))
        total_reviews = sum(day_counts.values())
        today_cutoff_ms = (mw.col.sched.day_cutoff - 86400) * 1000
        cards_today = mw.col.db.scalar(
            "SELECT count(*) FROM revlog WHERE id>=?", today_cutoff_ms) or 0
        time_today_ms = mw.col.db.scalar(
            "SELECT sum(time) FROM revlog WHERE id>=?", today_cutoff_ms) or 0
        mins_today = round(time_today_ms / 60000, 1)
        spc = round(time_today_ms / 1000 / cards_today, 2) if cards_today else 0
        studied_str = (f"Studied {cards_today} cards in {mins_today} minutes today ({spc}s/card)"
                       if cards_today else "No cards studied today")
    except Exception:
        day_counts, today_day, week_total, total_reviews = {}, 0, 0, 0
        studied_str = ""

    now = _time.time()
    animate_line = (now - _stats_last_render) > 30
    _stats_last_render = now

    js_data = (
        f"var _GD={_json.dumps(day_counts)};\n"
        f"var _GT={today_day};\n"
        f"var _GW={week_total};\n"
        f"var _GS={_json.dumps(studied_str)};\n"
        f"var _GR={total_reviews};\n"
        f"var _GA={'true' if animate_line else 'false'};\n"
    )

    js_body = (
        "(function(){\n"
        "var DAY=_GD,TODAY=_GT,WEEK=_GW,STUDIED=_GS,TOTAL=_GR;\n"
        "var DPR=Math.min(window.devicePixelRatio||1,2);\n"
        "function setup(c,w,h){\n"
        "  c.width=w*DPR;c.height=h*DPR;\n"
        "  c.style.width=w+'px';c.style.height=h+'px';\n"
        "  var ctx=c.getContext('2d');ctx.scale(DPR,DPR);return ctx;\n"
        "}\n"
        "function rRect(ctx,x,y,w,h,r){\n"
        "  ctx.beginPath();\n"
        "  ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.arcTo(x+w,y,x+w,y+r,r);\n"
        "  ctx.lineTo(x+w,y+h-r);ctx.arcTo(x+w,y+h,x+w-r,y+h,r);\n"
        "  ctx.lineTo(x+r,y+h);ctx.arcTo(x,y+h,x,y+h-r,r);\n"
        "  ctx.lineTo(x,y+r);ctx.arcTo(x,y,x+r,y,r);ctx.closePath();\n"
        "}\n"
        "function fmt(n){return n.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g,',');}\n"
        # heatmap geometry shared with tooltip handler
        "var WEEKS=17,CELL=13,GAP=3,LBL=14,ROWS=5;\n"
        "var HM_W=LBL+WEEKS*(CELL+GAP)-GAP;\n"
        "var HM_H=ROWS*(CELL+GAP)-GAP+14;\n"
        "var hmStart=0;\n"
        "function drawHeatmap(c){\n"
        "  var ctx=setup(c,HM_W,HM_H);\n"
        "  ctx.font='9px -apple-system,ui-sans-serif,sans-serif';\n"
        "  var dl=['','M','T','W','T','F',''];\n"
        "  ctx.fillStyle='rgba(255,255,255,0.28)';\n"
        "  for(var r=1;r<=5;r++) ctx.fillText(dl[r],0,(r-1)*(CELL+GAP)+CELL-2);\n"
        "  var todayDow=new Date().getDay();\n"
        "  hmStart=(TODAY-todayDow)-(WEEKS-1)*7;\n"
        "  var maxV=1;\n"
        "  for(var col=0;col<WEEKS;col++)\n"
        "    for(var row=1;row<=5;row++){var v=DAY[hmStart+col*7+row]||0;if(v>maxV)maxV=v;}\n"
        "  var months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];\n"
        "  var lastM=-1;\n"
        "  for(var col=0;col<WEEKS;col++){\n"
        "    var colDay=hmStart+col*7;\n"
        "    var m=new Date(colDay*86400000).getMonth();\n"
        "    if(m!==lastM){\n"
        "      if(col>0){ctx.fillStyle='rgba(255,255,255,0.32)';\n"
        "        ctx.fillText(months[m],LBL+col*(CELL+GAP),HM_H-1);}\n"
        "      lastM=m;\n"
        "    }\n"
        "    for(var row=1;row<=5;row++){\n"
        "      var day=colDay+row;\n"
        "      if(day>TODAY) continue;\n"
        "      var v=DAY[day]||0,t=v/maxV;\n"
        "      var x=LBL+col*(CELL+GAP),y=(row-1)*(CELL+GAP);\n"
        "      if(v===0){ctx.fillStyle='rgba(255,255,255,0.06)';}\n"
        "      else{var g=Math.round(90+t*130);\n"
        "        ctx.fillStyle='rgba(40,'+g+',65,'+(0.2+t*0.8).toFixed(2)+')';}\n"
        "      rRect(ctx,x,y,CELL,CELL,2);ctx.fill();\n"
        "    }\n"
        "  }\n"
        "}\n"
        "function drawLine(c){\n"
        "  var YLBL=22,H=80;\n"
        "  var W=HM_W;\n"
        "  var ctx=setup(c,W,H);\n"
        "  var raw=[],i;\n"
        "  for(i=364;i>=0;i--) raw.push(DAY[TODAY-i]||0);\n"
        "  var sm=raw.map(function(v,idx){\n"
        "    var s=0,n=0;\n"
        "    for(var j=Math.max(0,idx-3);j<=Math.min(raw.length-1,idx+3);j++){s+=raw[j];n++;}\n"
        "    return s/n;\n"
        "  });\n"
        "  var mx=Math.max.apply(null,sm)||1;\n"
        "  var N=sm.length,PAD=2,PH=H-PAD*2-6;\n"
        "  var PLOT_X=YLBL;\n"
        "  var PLOT_W=W-YLBL-PAD;\n"
        "  function px(i){return PLOT_X+(i/(N-1))*PLOT_W;}\n"
        "  function py(v){return PAD+PH-(v/mx)*PH;}\n"
        "  var animate=_GA;\n"
        # draw static y-axis ticks and labels before animation
        "  ctx.font='8px -apple-system,ui-sans-serif,sans-serif';\n"
        "  ctx.textAlign='right';\n"
        "  var ticks=[0,0.5,1];\n"
        "  for(var ti=0;ti<ticks.length;ti++){\n"
        "    var tv=ticks[ti],ty=py(tv*mx);\n"
        "    var lv=Math.round(tv*mx);\n"
        "    ctx.fillStyle='rgba(255,255,255,0.30)';\n"
        "    ctx.fillText(lv,YLBL-3,ty+3);\n"
        "    ctx.beginPath();\n"
        "    ctx.moveTo(YLBL,ty);ctx.lineTo(W-PAD,ty);\n"
        "    ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.lineWidth=1;ctx.stroke();\n"
        "  }\n"
        "  var t0=null,DUR=animate?2000:0;\n"
        "  function frame(ts){\n"
        "    if(!t0)t0=ts;\n"
        "    var p=DUR>0?Math.min(1,(ts-t0)/DUR):1;\n"
        "    var e=p<0.5?2*p*p:1-Math.pow(-2*p+2,2)/2;\n"
        "    var n=Math.max(2,Math.round(e*(N-1)));\n"
        # clear only the plot area, preserving y-axis labels
        "    ctx.clearRect(YLBL,0,W-YLBL,H);\n"
        # redraw grid lines over cleared area
        "    for(var ti=0;ti<ticks.length;ti++){\n"
        "      var tv=ticks[ti],ty=py(tv*mx);\n"
        "      ctx.beginPath();\n"
        "      ctx.moveTo(YLBL,ty);ctx.lineTo(W-PAD,ty);\n"
        "      ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.lineWidth=1;ctx.stroke();\n"
        "    }\n"
        "    ctx.beginPath();\n"
        "    ctx.moveTo(px(0),PAD+PH);ctx.lineTo(px(0),py(sm[0]));\n"
        "    for(i=1;i<=n;i++) ctx.lineTo(px(i),py(sm[i]));\n"
        "    ctx.lineTo(px(n),PAD+PH);ctx.closePath();\n"
        "    var g=ctx.createLinearGradient(0,PAD,0,PAD+PH);\n"
        "    g.addColorStop(0,'rgba(80,200,120,0.22)');\n"
        "    g.addColorStop(1,'rgba(80,200,120,0.01)');\n"
        "    ctx.fillStyle=g;ctx.fill();\n"
        "    ctx.beginPath();\n"
        "    ctx.moveTo(px(0),py(sm[0]));\n"
        "    for(i=1;i<=n;i++) ctx.lineTo(px(i),py(sm[i]));\n"
        "    ctx.strokeStyle='rgba(100,220,140,0.85)';ctx.lineWidth=1.5;\n"
        "    ctx.lineJoin='round';ctx.stroke();\n"
        "    ctx.beginPath();\n"
        "    ctx.moveTo(YLBL,PAD+PH+1);ctx.lineTo(W-PAD,PAD+PH+1);\n"
        "    ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.lineWidth=1;ctx.stroke();\n"
        "    if(p<1) requestAnimationFrame(frame);\n"
        "  }\n"
        "  requestAnimationFrame(frame);\n"
        "}\n"
        "function ready(fn){\n"
        "  if(document.readyState!=='loading') fn();\n"
        "  else document.addEventListener('DOMContentLoaded',fn);\n"
        "}\n"
        # Anki re-renders the deck browser 2–3× on launch (and again after an
        # auto-sync), each a fresh document. Building the graphs immediately makes
        # them flash on every throwaway render. Defer via setTimeout: an
        # intermediate render is replaced before its timer fires (timers die with
        # the document), so ONLY the final, settled document actually draws the
        # graphs — once. build() also fades the block in so its appearance is
        # gentle rather than a pop.
        "function build(){\n"
        "  if(document.getElementById('glass-stats')) return;\n"
        # root wrapper — starts transparent, fades in after layout settles
        "  var wrap=document.createElement('div');wrap.id='glass-stats';\n"
        "  wrap.style.opacity='0';\n"
        # big stats header row: CUMULATIVE | DAILY
        "  var hdr=document.createElement('div');hdr.id='gs-hdr';\n"
        "  function makeStatBox(num,lbl){\n"
        "    var box=document.createElement('div');box.className='gs-statbox';\n"
        "    var nb=document.createElement('div');nb.className='gs-bignum';\n"
        "    nb.textContent=fmt(num);\n"
        "    nb.style.setProperty('font-weight','100','important');\n"
        "    var lb=document.createElement('div');lb.className='gs-lbl';\n"
        "    lb.textContent=lbl;\n"
        "    box.appendChild(nb);box.appendChild(lb);return box;\n"
        "  }\n"
        "  hdr.appendChild(makeStatBox(TOTAL,'CUMULATIVE'));\n"
        "  hdr.appendChild(makeStatBox(DAY[TODAY]||0,'DAILY'));\n"
        "  wrap.appendChild(hdr);\n"
        # heatmap
        "  var hc=document.createElement('canvas');hc.id='gs-hmap';\n"
        "  wrap.appendChild(hc);\n"
        # line chart (always visible, below heatmap)
        "  var lc=document.createElement('canvas');lc.id='gs-line';\n"
        "  wrap.appendChild(lc);\n"
        # studied text — declared outside if so ref is always in scope.
        # NOTE: transitions are intentionally NOT set yet — the FIRST layout must
        # collapse over-tall layers instantly (no visible shrink-from-200px
        # flicker on load). Transitions are enabled after the first update().
        "  var TRANS='opacity 0.12s,max-height 0.15s,margin 0.15s';\n"
        "  var st=null;\n"
        "  if(STUDIED){\n"
        "    st=document.createElement('div');st.id='gs-studied';\n"
        "    st.textContent=STUDIED;\n"
        "    st.style.maxHeight='200px';\n"
        "    wrap.appendChild(st);\n"
        "  }\n"
        "  lc.style.maxHeight='200px';\n"
        "  hc.style.maxHeight='200px';\n"
        "  hdr.style.maxHeight='200px';\n"
        # tooltip element (appended to body for fixed positioning)
        "  var tip=document.createElement('div');tip.id='gs-tip';\n"
        "  document.body.appendChild(tip);\n"
        # insert inside <center> so native centering applies
        "  var center=document.querySelector('center');\n"
        "  (center||document.body).appendChild(wrap);\n"
        "  drawHeatmap(hc);\n"
        "  drawLine(lc);\n"
        # hover tooltip on heatmap
        "  hc.addEventListener('mousemove',function(e){\n"
        "    var rect=hc.getBoundingClientRect();\n"
        "    var mx=e.clientX-rect.left,my=e.clientY-rect.top;\n"
        "    var col=Math.floor((mx-LBL)/(CELL+GAP));\n"
        "    var row=Math.floor(my/(CELL+GAP))+1;\n"
        "    if(col>=0&&col<WEEKS&&row>=1&&row<=5){\n"
        "      var day=hmStart+col*7+row;\n"
        "      if(day<=TODAY){\n"
        "        var v=DAY[day]||0;\n"
        "        var d=new Date(day*86400000);\n"
        "        var ds=d.toLocaleDateString(undefined,{month:'short',day:'numeric'});\n"
        "        tip.textContent=v+' review'+(v===1?'':'s')+' · '+ds;\n"
        "        tip.style.display='block';\n"
        "        tip.style.left=(e.clientX+6)+'px';\n"
        "        tip.style.top=(e.clientY+10)+'px';\n"
        "        return;\n"
        "      }\n"
        "    }\n"
        "    tip.style.display='none';\n"
        "  });\n"
        "  hc.addEventListener('mouseleave',function(){tip.style.display='none';});\n"
        # fill available height with even spacing; cascade-fade + collapse layers as space shrinks
        "  function clamp(v){return Math.max(0,Math.min(1,v));}\n"
        "  var CONTENT_MIN=HM_H+80+55+(STUDIED?20:0);\n"
        "  function layer(el,shortage,start){\n"
        "    if(!el) return;\n"
        "    var t=clamp(1-(shortage-start)/18);\n"
        "    el.style.opacity=String(t);\n"
        "    if(t<=0.01){\n"
        "      el.style.maxHeight='0';el.style.overflow='hidden';el.style.margin='0';\n"
        "    } else {\n"
        "      el.style.maxHeight='200px';el.style.overflow='';el.style.margin='';\n"
        "    }\n"
        "  }\n"
        "  var _lastAvail=-1;\n"
        "  function update(){\n"
        "    var tbl=document.querySelector('center > table');\n"
        "    var topBound=tbl?tbl.getBoundingClientRect().bottom:0;\n"
        "    var viewH=document.documentElement.clientHeight;\n"
        "    var avail=Math.min(Math.max(viewH-topBound-16,20),CONTENT_MIN+220);\n"
        # Break the ResizeObserver feedback loop: setting wrap.height changes body
        # height → re-fires the observer → tiny 1–2px oscillation. Ignore updates
        # whose available height barely changed.
        "    if(Math.abs(avail-_lastAvail)<2) return;\n"
        "    _lastAvail=avail;\n"
        "    wrap.style.height=avail+'px';\n"
        "    var shortage=(CONTENT_MIN+160)-avail;\n"
        "    layer(st,shortage,0);\n"
        "    layer(lc,shortage,80);\n"
        "    layer(hc,shortage,160);\n"
        "    layer(hdr,shortage,240);\n"
        "  }\n"
        "  update();\n"
        # First layout collapsed over-tall layers instantly (no transition set
        # yet → no shrink-from-200px flash). Enable transitions now, then fade the
        # whole block in, so only subsequent (resize) changes animate.
        "  requestAnimationFrame(function(){\n"
        "    [st,lc,hc,hdr].forEach(function(el){ if(el) el.style.transition=TRANS; });\n"
        "    wrap.style.transition='opacity 0.2s ease-out';\n"
        "    wrap.style.opacity='1';\n"
        "  });\n"
        # Only re-layout on real window resizes. A ResizeObserver on document.body
        # self-triggered (update writes wrap.height → body mutates → observer fires
        # → update → …), causing a 1–2px down-flicker of the block below the deck
        # list. window.resize covers genuine viewport changes without the loop.
        "  window.addEventListener('resize',update);\n"
        "}\n"
        # Defer past the launch re-render burst so throwaway renders don't draw.
        "ready(function(){ setTimeout(build, 450); });\n"
        "})();\n"
    )

    css = (
        "<style>\n"
        "#glass-stats{display:inline-flex;flex-direction:column;align-items:center;"
        "justify-content:space-evenly;padding:0 20px;margin:0 auto;"
        "box-sizing:border-box;}\n"
        "#gs-hdr{display:flex;flex-direction:row;gap:36px;align-items:flex-end;"
        "justify-content:center;}\n"
        ".gs-statbox{display:flex;flex-direction:column;align-items:center;gap:3px;}\n"
        ".gs-bignum{font-size:34px;line-height:1;color:rgba(255,255,255,0.88);}\n"
        ".gs-bignum,.gs-lbl{font-family:inherit;}\n"
        ".gs-lbl{font-size:9px;color:rgba(255,255,255,0.32);letter-spacing:0.14em;}\n"
        "#gs-studied{font-size:11px;color:rgba(255,255,255,0.35);text-align:center;"
        "margin-top:2px;}\n"
        "#gs-tip{position:fixed;display:none;pointer-events:none;z-index:9999;"
        "background:rgba(255,255,255,0.08);color:rgba(255,255,255,0.88);"
        "font-size:11px;padding:5px 10px;border-radius:8px;white-space:nowrap;"
        "backdrop-filter:blur(20px) saturate(180%);"
        "border:1px solid rgba(255,255,255,0.18);"
        "box-shadow:0 4px 18px rgba(0,0,0,0.45);}\n"
        "</style>\n"
    )

    return css + "<script>\n" + js_data + "</script>\n" + "<script>\n" + js_body + "</script>\n"


def _on_will_set_content(web_content: WebContent, context: Optional[Any]) -> None:
    try:
        css = _build_css(_cfg(), context)
        if css:
            web_content.head += "\n" + css
        # Typewriter reveal on the reviewer card (independent of the glass theme).
        if isinstance(context, Reviewer) and _cfg().get("typewriter", True):
            web_content.head += "\n" + _typewriter_head(_cfg())
        # Review history charts on the deck browser.
        if isinstance(context, DeckBrowser):
            web_content.head += "\n" + _stats_head()
        if GLASS:
            QTimer.singleShot(150, glass._clear_existing_webviews)
    except Exception as exc:
        log(f"css hook: {exc}")


if hasattr(gui_hooks, "webview_will_set_content"):
    gui_hooks.webview_will_set_content.append(_on_will_set_content)


# The "Congratulations! You have finished this deck for now." page is loaded via
# load_sveltekit_page, which does NOT fire webview_will_set_content — so it never
# received the glass CSS and rendered opaque. Re-inject the core transparency
# rules into mw.web on every load (self-healing, idempotent via the style id).
_CONGRATS_GLASS_CSS = (
    ":root,html{--canvas:transparent!important;--window-bg:transparent!important;"
    "--canvas-elevated:transparent!important;--canvas-inset:transparent!important;"
    "--canvas-overlay:transparent!important;--frame-bg:transparent!important;"
    "--bs-body-bg:transparent!important;--current-deck:transparent!important;}"
    "html body *:not(button):not(input):not(select):not(textarea):not(a.deck)"
    "{background:transparent!important;background-color:transparent!important;"
    "background-image:none!important;}"
    "html,body{background:transparent!important;background-color:transparent!important;}"
    "body,body *{text-shadow:0 0 3px rgba(0,0,0,.95),0 1px 2px rgba(0,0,0,.85)!important;}"
)
_CONGRATS_GLASS_JS = (
    "(function(){if(document.getElementById('__janki_congrats_glass'))return;"
    "var s=document.createElement('style');s.id='__janki_congrats_glass';"
    "s.textContent='" + _CONGRATS_GLASS_CSS + "';"
    "if(document.head)document.head.appendChild(s);})();"
)


def _ensure_congrats_glass(*_):
    if not GLASS or not _cfg().get("enabled", True):
        return
    try:
        mw.web.eval(_CONGRATS_GLASS_JS)
    except Exception:
        pass


# Rescue black/grey card text on the dark glass / OLED background, WITHOUT
# touching intentional colours (green/blue cloze, coloured highlights, etc.).
# For each element we recolour to white only when its text colour is:
#   * near-GRAYSCALE (max-min channel < 40 → black/grey, not a real colour), AND
#   * reasonably dark (luminance < 140 → catches black through mid-grey; leaves
#     already-light text alone), AND
#   * sitting on a dark effective background (< 128 → so dark text on a light
#     inline box, e.g. a highlight, is left readable and light mode is untouched).
# Saturated colours (green/blue/red) always have a large max-min gap, so they're
# preserved regardless of how dark they are.
_TEXT_CONTRAST_JS = (
    "(function(){"
    "function P(c){var m=c&&c.match(/rgba?\\(([^)]+)\\)/);if(!m)return null;"
    "var p=m[1].split(',').map(parseFloat);return{r:p[0],g:p[1],b:p[2],a:p.length>3?p[3]:1};}"
    "function L(o){return o?0.299*o.r+0.587*o.g+0.114*o.b:null;}"
    "function bg(el){var e=el;while(e){var b=P(getComputedStyle(e).backgroundColor);"
    "if(b&&b.a>0)return L(b);e=e.parentElement;}return 0;}"
    "var root=document.getElementById('qa')||document.querySelector('.card')||document.body;"
    "if(!root)return;var els=[root];var q=root.querySelectorAll('*');"
    "for(var i=0;i<q.length;i++)els.push(q[i]);"
    "els.forEach(function(el){var c=P(getComputedStyle(el).color);"
    "if(!c||c.a===0)return;"
    "var gray=(Math.max(c.r,c.g,c.b)-Math.min(c.r,c.g,c.b))<40;"
    "if(gray&&L(c)<140&&bg(el)<128){el.style.setProperty('color','#fff','important');}});"
    "})();"
)


def _apply_text_contrast(*_):
    if not ACTIVE or not _cfg().get("text_black_to_white", True):
        return
    try:
        mw.web.eval(_TEXT_CONTRAST_JS)
    except Exception:
        pass
