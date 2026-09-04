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
# Fonts
# ---------------------------------------------------------------------------

# Add-on package dir name → builds the /_addons/<dir>/... URL that Anki's media
# server exposes for our bundled web assets (registered via setWebExports in
# __init__). Lets @font-face load the shipped Lora .ttf in every webview.
_ADDON = __name__.split(".")[0]
_FONTS_URL = "/_addons/%s/assets/fonts" % _ADDON

# Selectable system-wide UI + card fonts (label -> font-family stack). "Lora" is
# bundled with the add-on (declared via @font-face below) so it renders even when
# it isn't installed system-wide; the rest are system fonts. The chosen label is
# stored in config key `card_font`; an unknown value is treated as a literal
# family name so a hand-typed font still works.
UI_FONTS = {
    "Lora": '"Lora",Georgia,"Times New Roman",serif',
    "Anthropic Serif Text": '"Anthropic Serif Text",-apple-system,Georgia,serif',
    "Georgia": 'Georgia,"Times New Roman",serif',
    "System (sans-serif)": '-apple-system,system-ui,"Segoe UI",Roboto,sans-serif',
    "Helvetica": 'Helvetica,Arial,sans-serif',
    "Times New Roman": '"Times New Roman",Times,serif',
}
DEFAULT_UI_FONT = "Lora"


def ui_font_label(cfg=None):
    return (cfg or _cfg()).get("card_font", DEFAULT_UI_FONT)


def ui_font_stack(cfg=None):
    lbl = ui_font_label(cfg)
    return UI_FONTS.get(lbl, '"%s",-apple-system,Georgia,serif' % lbl)


def lora_face_css():
    """@font-face for the bundled Lora (regular + italic). Included in every webview
    so 'Lora' resolves anywhere.

    Each face lists TWO sources: the add-on web-export URL (/_addons/…) first, then
    a copy served from collection.media as a fallback. The /_addons export is NOT
    reliably reachable on every platform (notably Windows), which left card + chrome
    text silently falling back off Lora even though the CSS injected fine. The media
    copy is created on demand (same files the caption HUD uses) and resolves via the
    webview's media base URL; the browser uses whichever source loads."""
    # Ensure the media-served copy exists so the fallback url() resolves. Side-effect
    # only here — we build our own combined src list below.
    try:
        from ..integrations import mobilecards as _mc
        _mc.ensure_lora_media_face()
    except Exception as _e:
        log("lora media face: %s" % _e)
    return (
        "@font-face{font-family:'Lora';font-weight:400 700;font-style:normal;"
        "font-display:swap;src:url('%s/Lora.ttf'), url('_janki_Lora.ttf');}\n"
        "@font-face{font-family:'Lora';font-weight:400 700;font-style:italic;"
        "font-display:swap;src:url('%s/Lora-Italic.ttf'), url('_janki_Lora-Italic.ttf');}\n"
        % (_FONTS_URL, _FONTS_URL)
    )


# The webview CSS above only reaches Anki's HTML chrome (toolbar/deck browser via
# @font-face). Native Qt widgets — the menu bar and its dropdowns, right-click
# context menus — are NOT webviews, so on Windows/Linux they kept the default UI
# font while everything else was Lora. macOS hides this because its top menu bar
# is the native OS bar. The two helpers below register the bundled Lora with Qt's
# font DB (so it resolves without a system install) and apply the chosen UI font
# to native menus via the app stylesheet.
_NATIVE_FONT = {"registered": False}


def _addon_root_dir():
    import os
    return os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def _register_bundled_fonts():
    """Load the bundled Lora .ttf into Qt's application font DB so native widgets
    can render 'Lora' even when it isn't installed system-wide. Runs once."""
    if _NATIVE_FONT["registered"]:
        return
    try:
        import os
        from aqt.qt import QFontDatabase
        fonts = os.path.join(_addon_root_dir(), "assets", "fonts")
        for fn in ("Lora.ttf", "Lora-Italic.ttf"):
            p = os.path.join(fonts, fn)
            if os.path.exists(p):
                QFontDatabase.addApplicationFont(p)
        _NATIVE_FONT["registered"] = True
    except Exception as e:
        log("register bundled fonts: %s" % e)


def apply_native_ui_font(cfg=None):
    """Apply the chosen UI font to native Qt menus so Windows/Linux dropdowns and
    context menus match the Lora'd webview chrome. Appends a marked rule to the app
    stylesheet (stripping any prior one) so it can refresh without stacking and
    without clobbering Anki's / other add-ons' styles."""
    # On Windows the native-widget font override only lands on a few controls
    # (e.g. file-dialog combo text) and leaves the rest mismatched, which looks
    # worse than not touching it — so skip native UI fonts there entirely. The
    # webview chrome/cards still get Lora via CSS.
    import sys
    if sys.platform.startswith("win"):
        return
    try:
        import re
        from aqt.qt import QApplication
        app = mw.app if (mw and hasattr(mw, "app")) else QApplication.instance()
        if app is None:
            return
        _register_bundled_fonts()
        stack = ui_font_stack(cfg)
        rule = ("/*janki-ui-font*/ QMenuBar, QMenuBar::item, QMenu, QMenu::item "
                "{ font-family: %s; }" % stack)
        cur = re.sub(r"/\*janki-ui-font\*/[^\n]*\n?", "", app.styleSheet() or "")
        app.setStyleSheet((cur.rstrip() + "\n" + rule + "\n"))
    except Exception as e:
        log("apply native ui font: %s" % e)


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


# The AMBOSS QBank home widget sits at the bottom of the deck browser, so a short
# window cuts it off (bottom half below the fold). This script fades it out when it
# can't be shown whole vertically and back in when there's room. Detection is the
# box's VERTICAL overflow past the viewport bottom (maxB - vh); that's stable w.r.t.
# the box's own visibility, so it can't ping-pong. Changes commit only after
# settling SETTLE ms (kills mount flicker); a 250ms poll drives it since resize
# events are unreliable here. Reads only geometry, never text.
# _qbank_fit_js(dbg): when dbg, paints a small live metrics overlay for tuning.
def _qbank_fit_js(dbg=False):
    return (
    "<script>(function(){\n"
    "var DBG=%s;\n" % ("true" if dbg else "false") +
    "var ID='amboss-qbank-widget';var SID='__janki_qbank_fit';\n"
    # Settle is long during the initial mount window (absorbs React's flicker) then
    # ~immediate afterward, so scroll fade-in stays in lockstep with the stats layers
    # (which fade with no settle) instead of trailing them.
    "var T0=Date.now();function settle(){return (Date.now()-T0<2000)?300:50;}\n"
    "var state=null;var pWant=null;var pSince=0;var M={};\n"
    "function style(){if(document.getElementById(SID))return;\n"
    "var s=document.createElement('style');s.id=SID;\n"
    # Default VISIBLE; the gate adds .jk-qbank-unfit to fade it out. Opacity-only (no
    # transform) so it matches the stats layers and never visibly moves. Default-
    # visible is deliberate: if a measurement glitches (clip() returns null) the box
    # stays shown rather than getting stuck invisible.
    "s.textContent='#'+ID+'{transition:opacity .15s ease;}'\n"
    "+'#'+ID+'.jk-qbank-unfit{opacity:0!important;pointer-events:none!important;}';\n"
    "(document.head||document.documentElement).appendChild(s);}\n"
    # VERTICAL overflow of the box across the host + its light- and shadow-DOM
    # descendants (it renders into a shadow root). ov = how far the box's bottom
    # spills below the window (or its top above): >0 = it can't be shown whole,
    # <=0 = it fits with |ov| px to spare. null = nothing rendered yet.
    "function clip(el){var vh=document.documentElement.clientHeight||window.innerHeight;\n"
    "var any=false,maxB=-1e9,minT=1e9;\n"
    "function look(n){try{var r=n.getBoundingClientRect();\n"
    "if(r.width>0&&r.height>0){any=true;if(r.bottom>maxB)maxB=r.bottom;if(r.top<minT)minT=r.top;}}catch(e){}}\n"
    "look(el);var a=el.querySelectorAll?el.querySelectorAll('*'):[];\n"
    "for(var i=0;i<a.length&&i<800;i++)look(a[i]);\n"
    "if(el.shadowRoot){var b=el.shadowRoot.querySelectorAll('*');\n"
    "for(var j=0;j<b.length&&j<800;j++)look(b[j]);}\n"
    "M.vh=vh;M.any=any;\n"
    "if(!any){M.ov=null;return null;}\n"
    "var ov=maxB-vh;if(-minT>ov)ov=-minT;\n"
    "M.maxB=Math.round(maxB);M.minT=Math.round(minT);\n"
    "M.bh=Math.round(maxB-minT);M.ov=Math.round(ov);\n"
    "return ov;}\n"
    # Once the user has scrolled at all, the box is normal scrollable content — show
    # it so it scrolls in like the counters/map/plot below it. Only at the top rest
    # position do we hide it, and only when it straddles the fold (a half-box would
    # look off at launch): preemptive GAP + hysteresis so it fades BEFORE it clips.
    # Show the box as soon as it's essentially in view (bottom ~at the fold), hide
    # only once its bottom drops below the fold and it starts to clip. Minimal buffer
    # so it isn't invisible while on-screen; a small hysteresis avoids boundary
    # flicker. The AMBOSS load-jump is handled by the scroll-yank guard below.
    "function want(){var el=document.getElementById(ID);if(!el)return null;\n"
    "var c=clip(el);if(c===null)return null;\n"
    "if(state==='hide')return (M.maxB<=M.vh-6)?'show':'hide';\n"
    "return (M.maxB>M.vh+4)?'hide':'show';}\n"
    # Commit a state change only after it has held for SETTLE ms — absorbs the React
    # mount's transient width stages (the open flicker) and any drag jitter.
    "function tick(){style();var w=want();\n"
    "if(w!==null){\n"
    "if(w===state){pWant=null;}\n"
    "else if(w!==pWant){pWant=w;pSince=Date.now();}\n"
    "else if(Date.now()-pSince>=settle()){\n"
    "state=w;pWant=null;var el=document.getElementById(ID);\n"
    "if(el){if(w==='hide')el.classList.add('jk-qbank-unfit');\n"
    "else el.classList.remove('jk-qbank-unfit');}}}\n"
    "if(DBG)dbg();}\n"
    "function dbg(){var d=document.getElementById('__jk_qbank_dbg');\n"
    "if(!d){d=document.createElement('div');d.id='__jk_qbank_dbg';\n"
    "d.style.cssText='position:fixed;left:6px;top:6px;z-index:2147483647;'\n"
    "+'font:11px/1.4 monospace;color:#0f0;background:rgba(0,0,0,.8);'\n"
    "+'padding:5px 8px;border-radius:6px;white-space:pre;pointer-events:none;';\n"
    "document.body.appendChild(d);}\n"
    "d.textContent='qbank state='+state+' want='+pWant+'\\n'\n"
    "+'ov='+M.ov+' boxH='+M.bh+'\\n'\n"
    "+'maxB='+M.maxB+' minT='+M.minT+' vh='+M.vh;}\n"
    "var pend=false;function sched(){if(pend)return;pend=true;\n"
    "requestAnimationFrame(function(){pend=false;tick();});}\n"
    "sched();try{window.addEventListener('resize',sched);}catch(e){}\n"
    "try{window.addEventListener('scroll',sched,{passive:true});}catch(e){}\n"
    # Timed backstops for the async mount + a steady poll (resize events unreliable).
    "[150,400,800,1500,2500].forEach(function(ms){setTimeout(sched,ms);});\n"
    "setInterval(sched,150);\n"
    "try{if(window.ResizeObserver){new ResizeObserver(sched).observe(document.documentElement);}}catch(e){}\n"
    "try{var mo=new MutationObserver(function(){sched();\n"
    "var el=document.getElementById(ID);\n"
    "if(el&&el.shadowRoot&&!el.__jkSObs){el.__jkSObs=new MutationObserver(sched);\n"
    "el.__jkSObs.observe(el.shadowRoot,{childList:true,subtree:true});sched();}});\n"
    "mo.observe(document.documentElement,{childList:true,subtree:true});}catch(e){}\n"
    # Scroll position keeper. Two jobs, both keyed on recent USER input (wheel/touch/
    # key/scrollbar) so we never fight the user:
    #  1) Revert big programmatic scroll jumps (AMBOSS yanking to the QBank widget).
    #  2) Preserve position across deck-browser re-renders — a sync completing (and the
    #     sync-status clearing) re-renders the page and resets it to the top, often
    #     TWICE. We remember the user's last position and restore it as content
    #     settles, plus a short watchdog that re-corrects a delayed snap-to-top.
    "var _py=0,_lu=0,_o=null;var SK='__janki_db_scroll';\n"
    "function _mu(){_lu=Date.now();}\n"
    "function _sy(){return window.pageYOffset||document.documentElement.scrollTop||0;}\n"
    "['wheel','touchstart','touchmove','keydown','mousedown'].forEach(function(ev){\n"
    "try{window.addEventListener(ev,_mu,{passive:true});}catch(e){}});\n"
    "try{var _sv=sessionStorage.getItem(SK);if(_sv){var p=JSON.parse(_sv);\n"
    "if(p&&p.y>6&&Date.now()-p.t<120000)_o=p;}}catch(e){}\n"
    "function _restore(){if(_o&&_o.y>6){_py=_o.y;window.scrollTo(0,_o.y);}}\n"
    # restore as content settles after a (re-)render, unless the user is scrolling
    "if(_o){[0,80,250,600,1000,1500].forEach(function(ms){setTimeout(function(){\n"
    "if(Date.now()-_lu>400)_restore();},ms);});}\n"
    # watchdog (~8s): catch a delayed snap-to-top from the sync-status clearing
    "var _n=0,_wd=setInterval(function(){_n++;\n"
    "if(_o&&_o.y>6&&_sy()<6&&Date.now()-_lu>500)_restore();\n"
    "if(_n>40)clearInterval(_wd);},200);\n"
    "try{window.addEventListener('scroll',function(){\n"
    "var y=_sy();\n"
    "if(Math.abs(y-_py)>120&&Date.now()-_lu>250){window.scrollTo(0,_py);return;}\n"
    "_py=y;\n"
    # only a genuine user scroll updates the saved target (programmatic ones don't)
    "if(Date.now()-_lu<300){_o={y:y,t:Date.now()};\n"
    "try{sessionStorage.setItem(SK,JSON.stringify(_o));}catch(e){}}\n"
    "},{passive:true});}catch(e){}\n"
    "})();</script>\n"
    )


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

    # System-wide UI font, applied for every context (appended before the
    # per-screen branches). Anki's chrome inherits font-family from the root, so
    # setting it on <body> cascades to the deck list (Deck/New/Learn/Due), deck
    # names, counts, the cumulative/daily counters, toolbar and overview text.
    # Form controls (button/input/select/textarea/option) DON'T inherit font by
    # default, so those are forced explicitly. This inheritance-based approach
    # deliberately AVOIDS a universal `*` !important rule — that stuttered/suppressed
    # the nav fade + hover transitions on the software-composited (--disable-gpu) path.
    _stack = ui_font_stack(cfg)
    parts.append(
        "<style>\n"
        + lora_face_css() +
        "html body, html body button, html body input, html body select,\n"
        "html body textarea, html body option {\n"
        "  font-family: %s !important; }\n"
        "</style>\n" % _stack
    )

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
        # Pull the AMBOSS QBank box up toward the deck list: Anki inserts a <br>
        # between the deck table and the stats section, which leaves a big gap. Also
        # zero the box's bottom margin and the stats block's top margin so the
        # QBank↔calendar gap matches the tight deck↔QBank gap above.
        parts.append("<style>body center > br{display:none!important;}\n"
                     "html body #amboss-qbank-widget{margin-top:0!important;"
                     "margin-bottom:0!important;zoom:0.9;}\n"
                     "html body #glass-stats{margin-top:8px!important;}</style>\n")
        # Hide the scrollbar: when the stats block sizing lands at the viewport
        # boundary the scrollbar would toggle on/off (a few-px flicker, bottom
        # right). A zero-width scrollbar can't flicker and no longer steals
        # horizontal space, which also breaks the reflow feedback loop. Content
        # is still scrollable via wheel/trackpad if it overflows.
        parts.append("<style>::-webkit-scrollbar{width:0!important;height:0!important;"
                     "background:transparent!important;}"
                     "html{scrollbar-width:none!important;}</style>\n")
        # AMBOSS QBank home widget (#amboss-qbank-widget) has an internal min-width;
        # when the window is too narrow it overflows the viewport and shows a
        # half-clipped box. Fade it out until the window is wide enough to show it
        # whole (self-adapting: measures actual clipping, no magic px threshold).
        if cfg.get("amboss_qbank_autohide", True):
            parts.append(_qbank_fit_js(cfg.get("amboss_qbank_debug", False)))
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
            # Reviewer bottom bar. DEFAULT (windowed): Edit/More hidden, #middle
            # (Show Answer / ease buttons) spans the whole bar to the window edges.
            # FULLSCREEN (body.janki-fs, toggled by _sync_reviewer_fs): Edit/More
            # show in equal side cells so #middle stays centred — except on the
            # answer side, where they're hidden so the ease buttons fill.
            parts.append(
                "<style>\n"
                "html, body { overflow-x: hidden !important; }\n"
                "#outer { width:100% !important; box-sizing:border-box !important;"
                " padding:2px 6px !important; }\n"
                "#innertable { width:100% !important; }\n"
                "#innertable > tbody > tr { display:flex !important; flex-wrap:nowrap !important;\n"
                "  align-items:center !important; gap:6px !important; min-height:40px !important; }\n"
                "#innertable > tbody > tr > td { padding:2px !important; }\n"
                # Windowed default: hide the Edit/More side cells entirely.
                "#innertable > tbody > tr > td:first-child,\n"
                "#innertable > tbody > tr > td:last-child { display:none !important; }\n"
                "#middle { flex:1 1 auto !important; display:flex !important; flex-wrap:nowrap !important;\n"
                "  justify-content:center !important; align-items:center !important; gap:6px !important; }\n"
                "#middle center, #middle table, #middle tbody, #middle tr, #middle td {\n"
                "  display:contents !important; }\n"
                "#middle button { flex:1 1 0 !important; }\n"
                "#outer button { padding:6px 14px !important; min-width:0 !important;"
                " white-space:nowrap !important; }\n"
                # Fullscreen: reveal Edit/More as equal side cells (keeps #middle centred).
                "body.janki-fs #innertable > tbody > tr > td:first-child,\n"
                "body.janki-fs #innertable > tbody > tr > td:last-child {\n"
                "  display:flex !important; flex:0 0 96px !important; width:96px !important;\n"
                "  min-width:96px !important; align-items:center !important; }\n"
                "body.janki-fs #innertable > tbody > tr > td:first-child {\n"
                "  justify-content:flex-start !important; }\n"
                "body.janki-fs #innertable > tbody > tr > td:last-child {\n"
                "  justify-content:flex-end !important; }\n"
                # Fullscreen answer side: hide them again so ease buttons fill.
                "body.janki-fs #innertable > tbody > tr:has(button[data-ease]) > td:first-child,\n"
                "body.janki-fs #innertable > tbody > tr:has(button[data-ease]) > td:last-child {\n"
                "  display:none !important; }\n"
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
            # flex column on body, vertically centred; 'safe center' falls back to
            # top-aligned (no crop) when the content is taller than the window.
            "html body {\n"
            "  min-height:100% !important; display:flex !important;\n"
            "  flex-direction:column !important; align-items:center !important;\n"
            "  justify-content:safe center !important; text-align:center !important;\n"
            "  padding:16px 12px !important; box-sizing:border-box !important; }\n"
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
        # Card font = the same system-wide font stack (default bundled Lora).
        # Applied to the card text (kbd/shortcut keys left alone).
        parts.append("<style>\n"
                     "#qa, .card, #qa *:not(kbd) {\n"
                     "  font-family: %s !important;\n}\n"
                     "</style>\n" % ui_font_stack(cfg))
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
            # AMBOSS injects an absolutely-positioned 108px-wide toggle (.amboss-indicator,
            # inside an <a> firing amboss:side_panel:toggle) pinned to the top-right. At our
            # window width its (often invisible) hit area overlaps the Sync button, so clicks
            # near Sync accidentally open the AMBOSS viewer. Neutralize the phantom target —
            # the viewer still opens via its own hotkey.
            "html body a[data_e2e_test_id=\"amboss-action-indicator\"],\n"
            "html body .amboss-indicator {\n"
            "  display: none !important; pointer-events: none !important; }\n"
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
        # AMBOSS marks terms (span.amboss-marker + underline) async on card show via
        # ambossAddon.tooltip.phraseMarker.mark(phrases). Our reveal fragments then
        # normalizes the DOM, wiping those markers, and AMBOSS never re-fires. So we
        # (1) wrap mark() to remember the phrases for THIS card, and (2) re-mark on the
        # clean DOM once the animation finishes. Cleared per-card so we never re-mark
        # with a previous card's terms; a no-op when AMBOSS isn't installed.
        "    function jkAmbPm(){ try{ return window.ambossAddon&&ambossAddon.tooltip&&ambossAddon.tooltip.phraseMarker; }catch(e){ return null; } }\n"
        # While the reveal is animating, SUPPRESS AMBOSS's marking (just cache the
        # phrases): those markers would be destroyed by the reveal anyway and fading
        # them in would be a wasted first fade. The single post-animation re-mark
        # (jkAmbRemark, after animating=false) then paints once -> one fade per card.
        "    function jkAmbHook(){ var pm=jkAmbPm(); if(pm && !pm.__jkw){ try{ var o=pm.mark.bind(pm);\n"
        "      pm.mark=function(p){ window.__jkAmbPhr=p; if(animating) return; return o(p); }; pm.__jkw=1; }catch(e){} } }\n"
        "    function jkAmbRemark(){ var pm=jkAmbPm(), p=window.__jkAmbPhr; if(pm && p){ try{ window.__jkRemark=1;\n"
        "      pm.hideAll(); pm.mark(p); setTimeout(function(){ window.__jkRemark=0; }, 250); }catch(e){ window.__jkRemark=0; } } }\n"
        "    jkAmbHook();\n"
        "    function skip(node){ var p=node.parentNode;\n"
        "      while(p && p!==qa){ var t=(p.tagName||'').toUpperCase();\n"
        "        if(t==='SCRIPT'||t==='STYLE') return true;\n"
        "        if(t.indexOf('AMBOSS')===0) return true;   // AMBOSS custom elements\n"
        "        if(p.classList && (p.classList.contains('MathJax')||\n"
        "            p.classList.contains('MathJax_Preview')||p.classList.contains('mjx-chtml')||\n"
        "            p.classList.contains('amboss-marker'))) return true;\n"
        "        p=p.parentNode; } return false; }\n"
        # True if the text node sits inside an underline (<u>/<ins> or an inline
        # text-decoration:underline). Underlined runs are revealed whole (below) to
        # avoid a costly per-frame underline recompute on software-composited glass.
        "    function isUnderlined(node){ var p=node.parentNode; while(p && p!==qa){ var t=(p.tagName||'').toUpperCase();\n"
        "        if(t==='U'||t==='INS') return true;\n"
        "        if(p.style && (p.style.textDecoration||'').indexOf('underline')>=0) return true;\n"
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
        "      nodes.forEach(function(e){ var tn=e[0], text=e[1], nu=isUnderlined(tn);\n"
        # Wrap each char in a tagged span inside ONE holder, so the reveal can be
        # per-char but every span is removable afterward (see finish()). EXCEPTION:
        # text inside an underline (<u>) is revealed as ONE span, not fragmented.
        # Splitting underlined text into many inline boxes makes the browser recompute
        # the underline across all fragments the first time that run paints — a ~150ms
        # spike per underline on software-composited (--disable-gpu) glass. Revealing
        # the underlined run whole (the phrase pops in) avoids it; other text still
        # types char-by-char.
        "        var holder=document.createElement('span'); holder.setAttribute('data-jtw','1');\n"
        "        if(nu){ var sp=document.createElement('span'); sp.className='__jtwc'; sp.textContent=text; sp.style.visibility='hidden'; holder.appendChild(sp); spans.push(sp); }\n"
        "        else { for(var i=0;i<text.length;i++){ var sp=document.createElement('span');\n"
        "          sp.className='__jtwc'; sp.textContent=text[i]; sp.style.visibility='hidden';\n"
        "          holder.appendChild(sp); spans.push(sp); } }\n"
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
        "    function run(){ if(animating||window.__jkRemark) return;\n"
        "      var raw=qa.textContent||'';\n"
        "      if(!raw || !raw.trim()){ return; }     // ignore transient empty states\n"
        # Whitespace-invariant signature: AMBOSS's phraseMarker permanently inserts
        # spaces around block tags (div/p/br/li) with no despacify, which would look
        # like a new card and re-fire the reveal (double animation on the first,
        # slow-to-mark card). Stripping whitespace makes the card identity stable.
        "      var s=raw.replace(/\\s+/g,'');\n"
        "      if(s===lastSig){ reveal(); return; }  // already showing this card\n"
        "      lastSig=s; window.__jkAmbPhr=null; jkAmbHook();\n"
        "      // Cloze reveal → show instantly, no animation. Front of cloze (and basic\n"
        "      // cards) fall through and animate normally.\n"
        "      if(qa.querySelector('.cloze') && isClozeBack()){ reveal(); return; }\n"
        "      animating=true;\n"
        "      if(observer) observer.disconnect();\n"
        "      typeOut(false, function(){ animating=false;\n"
        "        jkAmbRemark(); if(observer) observer.observe(qa,{childList:true}); }); }\n"
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
        all_reviews = mw.col.db.scalar("SELECT count(*) FROM revlog") or 0
        studied_str = (f"Studied {cards_today} cards in {mins_today} minutes today ({spc}s/card)"
                       if cards_today else "No cards studied today")
        studied_str += f" · {all_reviews:,} total reviews"
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
        # LBL is the shared left margin used by BOTH the calendar (day labels) and
        # the plot (y-axis), so their grids/months line up when toggled.
        "var WEEKS=17,CELL=17,GAP=3,LBL=30,ROWS=5;\n"
        "var HM_W=LBL+WEEKS*(CELL+GAP)-GAP;\n"
        "var HM_H=ROWS*(CELL+GAP)-GAP+19;\n"
        "var hmStart=0;\n"
        "function drawHeatmap(c){\n"
        "  var ctx=setup(c,HM_W,HM_H);\n"
        "  ctx.font='11px -apple-system,ui-sans-serif,sans-serif';\n"
        "  var dl=['','M','T','W','T','F',''];\n"
        "  ctx.fillStyle='rgba(255,255,255,0.28)';ctx.textAlign='right';\n"
        "  for(var r=1;r<=5;r++) ctx.fillText(dl[r],LBL-8,(r-1)*(CELL+GAP)+CELL-2);\n"
        "  ctx.textAlign='left';\n"
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
        "        ctx.fillText(months[m],LBL+col*(CELL+GAP),HM_H-5);}\n"
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
        "      rRect(ctx,x,y,CELL,CELL,3);ctx.fill();\n"
        "    }\n"
        "  }\n"
        "}\n"
        "function drawLine(c,anim){\n"
        "  var YLBL=LBL,H=116;\n"
        # same width/coordinate system as the calendar so the x-axes align
        "  var W=HM_W;\n"
        "  var ctx=setup(c,W,H);\n"
        # span the SAME window as the calendar (last WEEKS weeks) so the month
        # labels line up between the two views.
        "  var _dow=new Date().getDay();\n"
        "  var _st=(TODAY-_dow)-(WEEKS-1)*7;\n"
        "  var raw=[],i;\n"
        "  for(i=_st;i<=TODAY;i++) raw.push(DAY[i]||0);\n"
        "  var sm=raw.map(function(v,idx){\n"
        "    var s=0,n=0;\n"
        "    for(var j=Math.max(0,idx-3);j<=Math.min(raw.length-1,idx+3);j++){s+=raw[j];n++;}\n"
        "    return s/n;\n"
        "  });\n"
        "  var mx=Math.max.apply(null,sm)||1;\n"
        "  var N=sm.length,PAD=8,BM=16,PH=H-PAD-BM-6;\n"
        "  var PLOT_X=YLBL;\n"
        "  var PLOT_W=W-YLBL-PAD;\n"
        # week-based x (same scale as the calendar columns): day i -> week i/7
        "  function px(i){return LBL+(i/7)*(CELL+GAP);}\n"
        "  function py(v){return PAD+PH-(v/mx)*PH;}\n"
        "  var animate=(typeof anim==='boolean')?anim:_GA;\n"
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
        # rotated vertical-axis label (Lora, to match the UI font)
        "  ctx.save();ctx.translate(10,PAD+PH/2);ctx.rotate(-Math.PI/2);\n"
        "  ctx.textAlign='center';ctx.fillStyle='rgba(255,255,255,0.42)';\n"
        "  ctx.font='10px \"Lora\",Georgia,serif';\n"
        "  ctx.fillText('Reviews',0,0);ctx.restore();\n"
        # x-axis month labels along the bottom (drawn once; clearRect below leaves them)
        # month labels drawn with the SAME size/formula/baseline as the calendar's
        # (per week column, from the same start day) so they line up exactly.
        "  var moN=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];\n"
        "  ctx.font='11px -apple-system,ui-sans-serif,sans-serif';\n"
        "  ctx.textAlign='left';ctx.fillStyle='rgba(255,255,255,0.32)';\n"
        "  var _lm=-1;\n"
        "  for(var _c=0;_c<WEEKS;_c++){var _cd=_st+_c*7;\n"
        "    var _mo=new Date(_cd*86400000).getMonth();\n"
        "    if(_mo!==_lm){if(_c>0)ctx.fillText(moN[_mo],LBL+_c*(CELL+GAP),H-5);_lm=_mo;}}\n"
        "  var t0=null,DUR=animate?2000:0;\n"
        "  function frame(ts){\n"
        "    if(!t0)t0=ts;\n"
        "    var p=DUR>0?Math.min(1,(ts-t0)/DUR):1;\n"
        "    var e=p<0.5?2*p*p:1-Math.pow(-2*p+2,2)/2;\n"
        "    var n=Math.max(2,Math.round(e*(N-1)));\n"
        # clear only the plot area, preserving y-axis labels
        "    ctx.clearRect(YLBL,0,W-YLBL,PAD+PH+4);\n"
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
        # root wrapper — fully visible from the first paint (no fade-in: a fade
        # replays on every launch re-render, reading as a flicker)
        "  var wrap=document.createElement('div');wrap.id='glass-stats';\n"
        "  wrap.style.opacity='1';\n"
        # Shared chart area (calendar & plot overlapped, one shown at a time) with a
        # tiny vertical switch pinned to its top-right corner.
        "  var chartc=document.createElement('div');chartc.id='gs-chart';\n"
        "  var hc=document.createElement('canvas');hc.id='gs-hmap';\n"
        "  var lc=document.createElement('canvas');lc.id='gs-line';\n"
        "  chartc.appendChild(hc);chartc.appendChild(lc);\n"
        "  var tog=document.createElement('div');tog.id='gs-toggle';\n"
        "  var bCal=document.createElement('button');bCal.className='gs-tbtn';bCal.title='Calendar';\n"
        "  bCal.innerHTML=\"<svg width='12' height='12' viewBox='0 0 18 18' fill='none' stroke='currentColor' stroke-width='1.8'><rect x='1.5' y='1.5' width='6.5' height='6.5' rx='1.4'/><rect x='10' y='1.5' width='6.5' height='6.5' rx='1.4'/><rect x='1.5' y='10' width='6.5' height='6.5' rx='1.4'/><rect x='10' y='10' width='6.5' height='6.5' rx='1.4'/></svg>\";\n"
        "  var bTrend=document.createElement('button');bTrend.className='gs-tbtn';bTrend.title='Trend';\n"
        "  bTrend.innerHTML=\"<svg width='13' height='11' viewBox='0 0 20 16' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'><polyline points='1,12 6,6 10,9 14,3 19,7'/></svg>\";\n"
        "  tog.appendChild(bCal);tog.appendChild(bTrend);\n"
        "  chartc.appendChild(tog);\n"
        "  wrap.appendChild(chartc);\n"
        "  var TRANS='opacity 0.12s';\n"
        "  var st=null;\n"
        "  if(STUDIED){\n"
        "    st=document.createElement('div');st.id='gs-studied';\n"
        "    st.textContent=STUDIED;\n"
        "    wrap.appendChild(st);\n"
        "  }\n"
        # tooltip element (appended to body for fixed positioning)
        "  var tip=document.createElement('div');tip.id='gs-tip';\n"
        "  document.body.appendChild(tip);\n"
        # insert inside <center> so native centering applies
        "  var center=document.querySelector('center');\n"
        "  (center||document.body).appendChild(wrap);\n"
        "  drawHeatmap(hc);\n"
        "  drawLine(lc);\n"
        # size the shared area to the larger of the two, then wire the selector
        "  chartc.style.width=Math.max(hc.offsetWidth,lc.offsetWidth)+'px';\n"
        "  chartc.style.height=Math.max(hc.offsetHeight,lc.offsetHeight)+'px';\n"
        "  var CKEY='janki_gs_chart';\n"
        "  function setChart(w){var cal=(w!=='trend');\n"
        "    hc.style.display=cal?'':'none';lc.style.display=cal?'none':'';\n"
        "    bCal.classList.toggle('on',cal);bTrend.classList.toggle('on',!cal);\n"
        "    if(!cal)drawLine(lc,true);\n"          # replay the line-draw when showing Trend
        "    try{localStorage.setItem(CKEY,cal?'cal':'trend');}catch(e){}}\n"
        "  bCal.onclick=function(){setChart('cal');};\n"
        "  bTrend.onclick=function(){setChart('trend');};\n"
        "  var _cs='cal';try{_cs=localStorage.getItem(CKEY)||'cal';}catch(e){}\n"
        "  setChart(_cs);\n"
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
    # Always give the stats their full height. The old logic collapsed layers to fit
    # above the fold on short windows, but with a short launch window + scroll that
    # only caused the calendar/plot to animate open on first scroll (a jumpy "loading"
    # feel). Full height = nothing to animate on scroll; they sit ready below the fold.
        "    var avail=CONTENT_MIN+220;\n"
        # Break the ResizeObserver feedback loop: setting wrap.height changes body
        # height → re-fires the observer → tiny 1–2px oscillation. Ignore updates
        # whose available height barely changed.
        "    if(Math.abs(avail-_lastAvail)<2) return;\n"
        "    _lastAvail=avail;\n"
        # Natural height (no fixed wrap height): a fixed height + space-evenly spread
        # ~220px of slack as gaps, pushing the calendar away from the QBank box above.
        "    var shortage=(CONTENT_MIN+160)-avail;\n"
        "    layer(st,shortage,0);\n"
        "  }\n"
        "  update();\n"
        # Everything stays fully visible from the first paint — no fold-gate opacity
        # toggling. The gate hid layers below the fold and re-showed them on scroll/
        # resize; with the window resizing once on launch (geometry restore) that read
        # as the plot vanishing then re-appearing. Keep only a resize re-layout.
        "  chartc.style.opacity='1';if(st)st.style.opacity='1';\n"
        # Repaint hook: the canvases are drawn now (possibly before Lora finished
        # loading, so the axis label falls back); call this once fonts are ready.
        "  window._gsRedraw=function(){try{drawHeatmap(hc);drawLine(lc,lc.style.display!=='none');}catch(e){}};\n"
        "  window.addEventListener('resize',function(){update();});\n"
        "}\n"
        # Draw IMMEDIATELY so the block is part of the FIRST paint of every render,
        # exactly like the deck list — which is why it no longer flickers. A deferred
        # draw appeared late and could land on a throwaway launch document (2-3 quick
        # re-renders), drawing then vanishing when that document was replaced. build()
        # is guarded per-document, so a re-render just cheaply redraws the same block.
        # The canvas 'Reviews' label may draw in a fallback font on the very first
        # frame; repaint it once Lora finishes loading (no layout change, no flicker).
        "ready(function(){\n"
        "  build();\n"
        "  try{ document.fonts.load('10px \"Lora\"').then(function(){\n"
        "    if(window._gsRedraw) window._gsRedraw();\n"
        "  }); }catch(e){}\n"
        "});\n"
        "})();\n"
    )

    css = (
        "<style>\n"
        "#glass-stats{display:inline-flex;flex-direction:column;align-items:center;"
        "justify-content:flex-start;gap:24px;padding:0 20px;margin:0 auto;"
        "box-sizing:border-box;}\n"
        "#gs-hdr{display:flex;flex-direction:row;gap:36px;align-items:flex-end;"
        "justify-content:center;}\n"
        # tiny vertical switch pinned to the chart's top-right; active option is green
        "#gs-chart{position:relative;margin:0 auto;transform:translateX(-3px);}\n"
        "#gs-chart canvas{position:absolute;top:0;left:50%;transform:translateX(-50%);}\n"
        "#gs-chart #gs-hmap{transform:translateX(calc(-50% - 15px));}\n"
        "#gs-chart #gs-line{transform:translateX(calc(-50% - 15px));}\n"
        "#gs-toggle{position:absolute;top:-2px;right:-12px;z-index:2;"
        "display:flex;flex-direction:column;gap:2px;padding:2px;border-radius:1px;"
        # No container fill — the semi-opaque black square blends into the glass on
        # macOS but showed as a dark box on Windows. The active button keeps its own
        # .gs-tbtn.on highlight, so the toggle state is still clear.
        "background:transparent;}\n"
        ".gs-tbtn{padding:3px;border-radius:1px;line-height:0;"
        "display:flex;align-items:center;justify-content:center;"
        "border:none;background:transparent;color:rgba(255,255,255,0.45);"
        "cursor:pointer;transition:background 0.15s,color 0.15s;}\n"
        ".gs-tbtn:hover{color:rgba(255,255,255,0.80);}\n"
        ".gs-tbtn.on{background:rgba(190,205,197,0.15);color:rgba(202,214,207,0.95);}\n"
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
        # Review history charts (calendar heatmap + reviews plot) on the deck
        # browser home screen. Optional — hidden via Settings → General.
        if isinstance(context, DeckBrowser) and _cfg().get("deck_stats", True):
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
    "els.forEach(function(el){"
    "var tn=el.tagName;"
    "if(tn==='IMG'||tn==='CANVAS'||tn==='VIDEO'||tn==='PICTURE'||tn==='SVG'||tn==='svg')return;"
    "if(el.closest&&el.closest('svg'))return;"   # never recolor inside an SVG (blanks diagrams)
    "var c=P(getComputedStyle(el).color);"
    "if(!c||c.a===0)return;"
    "var gray=(Math.max(c.r,c.g,c.b)-Math.min(c.r,c.g,c.b))<40;"
    "if(gray&&L(c)<140&&bg(el)<128){el.style.setProperty('color','#fff','important');}});"
    "})();"
)


def _reviewer_is_fs():
    try:
        if mw.isFullScreen():
            return True
        scr = mw.screen() if hasattr(mw, "screen") else None
        if scr is not None and mw.frameGeometry().height() >= scr.geometry().height() - 8:
            return True
    except Exception:
        pass
    return False


def _sync_reviewer_fs(*_):
    """Toggle body.janki-fs on the reviewer bottom bar so Edit/More show only in
    fullscreen (windowed = hidden, Show Answer spans the window)."""
    bw = getattr(mw, "bottomWeb", None)
    if bw is None:
        return
    add = "add" if _reviewer_is_fs() else "remove"
    try:
        bw.eval("(function(){if(document.body)document.body.classList.%s('janki-fs');})()" % add)
    except Exception:
        pass


def _apply_text_contrast(*_):
    if not ACTIVE or not _cfg().get("text_black_to_white", True):
        return

    def _run():
        try:
            mw.web.eval(_TEXT_CONTRAST_JS)
        except Exception:
            pass

    _run()
    # The first render (especially the first card of a session) can finish AFTER
    # this hook fires, leaving black text un-rescued — re-apply a couple times.
    QTimer.singleShot(60, _run)
    QTimer.singleShot(220, _run)
