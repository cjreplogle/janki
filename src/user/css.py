"""Webview CSS builder (glass tint, typewriter caption, stats) + content hook."""

import os
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
    "Georgia": 'Georgia,"Times New Roman",serif',
    "System (sans-serif)": '-apple-system,system-ui,"Segoe UI",Roboto,sans-serif',
    "Helvetica": 'Helvetica,Arial,sans-serif',
    "Times New Roman": '"Times New Roman",Times,serif',
}

# SF Pro (San Francisco) is Apple's system UI font, shipped with macOS
# (/System/Library/Fonts/SFNS.ttf). We only *reference* the already-installed
# font — nothing is bundled or redistributed — so it's offered as an option on
# macOS only. -apple-system/system-ui resolve to it in the webview; the named
# families are a belt-and-suspenders fallback.
if sys.platform.startswith("win"):
    # Windows' own UI font (Windows 11), falling back to classic Segoe UI.
    UI_FONTS["Segoe UI"] = '"Segoe UI Variable Text","Segoe UI",system-ui,sans-serif'
if sys.platform == "darwin":
    UI_FONTS["SF Pro"] = (
        '"SF Pro Text","SF Pro Display","SF Pro",'
        '-apple-system,system-ui,sans-serif'
    )

DEFAULT_UI_FONT = "Lora"


_RETIRED_FONTS = {"Anthropic Serif Text"}     # removed options → the default (Lora)


_LAUNCH_FADE = {"done": False}   # first deck list of the session: window fades in


def _arm_launch_fade():
    """First deck list of the session: fade the MAIN WINDOW in once its page has
    loaded. (Fading the page itself kept losing to the 2–3 deck-list redraws Anki and
    Janki's startup do right after — each replaced the fading page at full opacity.
    A window-level fade can't be interrupted by redraws.) Runs before the window is
    first shown, so it starts transparent with no flash; a timer restores it always."""
    try:
        if mw.isVisible() or mw.isFullScreen():
            return                         # already on screen: don't blink it out
        mw.setWindowOpacity(0.0)
    except Exception:
        return
    state = _LAUNCH_FADE
    state.update(started=False, loaded=0)

    def start():
        if state["started"]:
            return
        state["started"] = True
        try:
            mw.web.loadFinished.disconnect(on_load)
        except Exception:
            pass
        try:
            from . import glass as _g
            _g._fade_window(mw, mw.windowOpacity(), 1.0, 130)
        except Exception:
            mw.setWindowOpacity(1.0)

    # Event-driven, not timed: fade once (1) Janki's startup has finished — it redraws
    # the deck list, and fading before that showed the text vanish and pop back — (2)
    # every deck-list load started so far has finished, and (3) the window is showing.
    # Whichever happens last triggers it, the same on any machine.
    def maybe():
        if (state.get("startup_done")
                and state.get("pending", 0) >= state.get("refreshes", 0)
                and state["loaded"] >= state.get("pending", 0)   # LATEST render loaded
                and mw.isVisible()):
            QTimer.singleShot(0, start)      # after the final page's first paint

    def on_load(_ok=True):
        # "the most recent render's page has loaded" — not a count of loads: a redraw
        # landing mid-load cancels the earlier page's load, which then never reports
        # finished (the count stayed one short until an unrelated reload, ~2 s late)
        if _ok is False:
            return                           # an aborted (superseded) load
        state["loaded"] = state.get("pending", 0)
        maybe()

    state["maybe"] = maybe

    try:
        mw.web.loadFinished.connect(on_load)
    except Exception:
        pass

    from aqt.qt import QObject, QEvent

    class _OnShow(QObject):
        def eventFilter(self, obj, ev):
            if ev.type() == QEvent.Type.Show:
                mw.removeEventFilter(self)
                maybe()
            return False
    state["filter"] = _OnShow(mw)
    mw.installEventFilter(state["filter"])

    def safety():
        if not state["started"] or mw.windowOpacity() < 0.99:
            state["started"] = True
            try:
                mw.setWindowOpacity(1.0)
            except Exception:
                pass
    QTimer.singleShot(3000, safety)          # only a never-stuck-invisible net


def _count_launch_refreshes():
    """Deck-list refresh() runs its query in the background and renders later, so a
    refresh requested during startup could land AFTER the fade (the text popped in
    0.3 s later). Count requests until the fade starts; it waits for them to render."""
    try:
        from aqt.deckbrowser import DeckBrowser
        if getattr(DeckBrowser.refresh, "_jk_lf", False):
            return
        orig = DeckBrowser.refresh

        def refresh(self, *a, **k):
            # only startup's own refreshes: the one the background launch sync asks
            # for when it finishes (seconds later) must not keep the window hidden
            if not _LAUNCH_FADE.get("started") and not _LAUNCH_FADE.get("startup_done"):
                _LAUNCH_FADE["refreshes"] = _LAUNCH_FADE.get("refreshes", 0) + 1
            return orig(self, *a, **k)
        refresh._jk_lf = True
        DeckBrowser.refresh = refresh
    except Exception as exc:
        log("launch fade refresh count: %s" % exc)


_count_launch_refreshes()


def launch_startup_done():
    """Called at the end of Janki's _startup (its deck-list redraws are issued)."""
    _LAUNCH_FADE["startup_done"] = True
    m = _LAUNCH_FADE.get("maybe")
    if m:
        m()


def ui_font_label(cfg=None):
    lbl = (cfg or _cfg()).get("card_font", DEFAULT_UI_FONT)
    return DEFAULT_UI_FONT if lbl in _RETIRED_FONTS else lbl


def ui_font_stack(cfg=None):
    lbl = ui_font_label(cfg)
    return UI_FONTS.get(lbl, '"%s",-apple-system,Georgia,serif' % lbl)


def qt_font_families(cfg=None):
    """The chosen UI font as a Qt family list (for native widgets like the Settings
    window): the CSS stack's named families in order, with -apple-system/system-ui
    mapped to the macOS system font and CSS generic keywords dropped."""
    out = []
    for part in ui_font_stack(cfg).split(","):
        name = part.strip().strip('"').strip("'")
        if name in ("-apple-system", "system-ui", "BlinkMacSystemFont"):
            name = ".AppleSystemUIFont"
        elif name in ("serif", "sans-serif", "monospace", "cursive", "fantasy"):
            continue
        if name and name not in out:
            out.append(name)
    return out


_WIDGET_FONT_TAG = "/*janki-widget-font*/"


def widget_font_rule(cfg=None) -> str:
    """A marked QSS rule setting the chosen UI font on every widget in a window. Uses the
    first family from the stack that's actually installed (QSS takes one family), so a
    missing name like "SF Pro Text" falls through to one that exists."""
    _register_bundled_fonts()
    fams = qt_font_families(cfg)
    try:
        from aqt.qt import QFontDatabase
        have = set(QFontDatabase.families())
        pick = next((f for f in fams if f in have or f.startswith(".")), None)
    except Exception:
        pick = fams[0] if fams else None
    if not pick:
        return ""
    return '%s QWidget { font-family: "%s"; }\n' % (_WIDGET_FONT_TAG, pick)


def apply_widget_ui_font(widget, cfg=None):
    """Apply the chosen UI font to a Qt window and all its children, live. Goes through
    the widget's stylesheet (a plain setFont gets overridden by Anki's app stylesheet);
    any previous Janki font rule is replaced, other rules are kept."""
    try:
        import re
        cur = re.sub(re.escape(_WIDGET_FONT_TAG) + r"[^\n]*\n?", "", widget.styleSheet() or "")
        widget.setStyleSheet(cur.rstrip() + "\n" + widget_font_rule(cfg))
    except Exception as e:
        log("apply widget ui font: %s" % e)


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
        # Stylesheets only reach a few native controls on Windows; setFont reaches all
        # of them (menus, dialogs, Settings), so the whole UI matches the Lora chrome.
        try:
            from aqt.qt import QApplication, QFont, QFontDatabase
            _register_bundled_fonts()
            have = set(QFontDatabase.families())
            fam = next((f for f in qt_font_families(cfg) if f in have), None)
            if fam:
                f = QFont(QApplication.font())
                f.setFamily(fam)
                QApplication.setFont(f)
        except Exception as e:
            log("win ui font: %s" % e)
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
_QB_NOSCROLL_JS = (
    "<script>(function(){if(window.__jkQBns)return;window.__jkQBns=1;var ID='amboss-qbank-widget';\n"
    # The widget scrolls the page itself (focus() / scrollIntoView on its own elements,
    # often in its shadow DOM) when it's partly off-screen — a jump right after your own
    # scroll. Swallow those…
    "function inQB(n){try{while(n){if(n.id===ID)return true;n=n.parentNode||n.host;}}catch(e){}return false;}\n"
    "try{var _siv=Element.prototype.scrollIntoView;Element.prototype.scrollIntoView=function(){\n"
    "if(inQB(this))return;return _siv.apply(this,arguments);};\n"
    "var _fo=HTMLElement.prototype.focus;HTMLElement.prototype.focus=function(o){\n"
    "if(inQB(this))return _fo.call(this,Object.assign({},o||{},{preventScroll:true}));\n"
    "return _fo.apply(this,arguments);};\n"
    "if(Element.prototype.scrollIntoViewIfNeeded){var _sin=Element.prototype.scrollIntoViewIfNeeded;\n"
    "Element.prototype.scrollIntoViewIfNeeded=function(){if(inQB(this))return;return _sin.apply(this,arguments);};}\n"
    "}catch(e){}\n"
    # …and any direct page scroll whose call comes from AMBOSS's own script (window.scrollTo/
    # scrollBy, element.scrollTo/scrollBy, scrollTop =): checked by the caller's stack.
    "function fromAmb(){try{return /amboss/i.test(new Error().stack||'');}catch(e){return false;}}\n"
    "try{['scrollTo','scrollBy','scroll'].forEach(function(k){\n"
    "var w=window[k];if(w)window[k]=function(){if(fromAmb())return;return w.apply(this,arguments);};\n"
    "var e=Element.prototype[k];if(e)Element.prototype[k]=function(){if(fromAmb())return;return e.apply(this,arguments);};});\n"
    "var d=Object.getOwnPropertyDescriptor(Element.prototype,'scrollTop');\n"
    "if(d&&d.set)Object.defineProperty(Element.prototype,'scrollTop',{get:d.get,set:function(v){if(fromAmb())return;d.set.call(this,v);},configurable:true});\n"
    "}catch(e){}\n"
    "})();</script>\n")


# Wheel/trackpad scroll the PAGE directly (deck list, Practice, cards). At 120 Hz (no
# frame-rate limit) Chromium's own wheel-scroll animation misfires — tiny nudges leapt
# hundreds of px, often straight to the top/bottom. Here each step moves the page by the
# input × SENS, immediately; inner scrollers that can still move that way keep native
# behaviour. ~/.janki_native_scroll (window.__jkNativeScroll) turns it off for A/B.
# Cards: the content softly fades out over the last EDGE px at the top/bottom of the card
# area (where it scrolls under the toolbar / answer buttons) instead of being sliced off.
# A mask on #qa pinned to the viewport — recomputed on scroll/resize; only the card
# content is masked, not Janki's floating buttons.
# Shared "scrolling" signal for lighter effects while the page moves: window.__jkScrolling
# is true during a scroll and ~150 ms after; a 'jkscrollend' event fires when it settles.
# Per-frame effects (card edge fade, deck row fade, stats fade) pause on it.
_SCROLL_STATE_JS = (
    "<script>(function(){if(window.__jkSS)return;window.__jkSS=1;window.__jkScrolling=false;var T=0;\n"
    # html.jk-scrolling: hover is ignored while the page moves — text sliding under the
    # pointer otherwise fires hover tooltips (AMBOSS: ~10 show/hide per second), and each
    # one repainted the whole card layer mid-scroll. Wheel input still reaches window.
    "var R=document.documentElement;\n"
    "addEventListener('scroll',function(){if(!window.__jkScrolling){window.__jkScrolling=true;R.classList.add('jk-scrolling');}clearTimeout(T);\n"
    "T=setTimeout(function(){window.__jkScrolling=false;R.classList.remove('jk-scrolling');dispatchEvent(new Event('jkscrollend'));},150);},{passive:true,capture:true});\n"
    "var st=document.createElement('style');st.textContent=\n"
    # paint once, then slide: the card / deck list on its own composited layer — opacity, not
    # transform, so position:fixed bits inside cards still pin to the window (with the
    # CPU-composited glass window Chromium otherwise repaints all visible text every frame)
    "'html.jk-scrolling body{pointer-events:none!important}#qa,body>center{will-change:opacity}';\n"
    "(document.head||R).appendChild(st);\n"
    "})();</script>\n")


# Images on cards: a scaled image's outermost pixels only partly cover the screen pixel,
# and on the see-through glass window those come out DARK — a thin black rim around
# e.g. white figures. Sample the image's own edge colour (same-origin media only) and
# draw a 1 px ring of that colour around it: it covers the rim and is invisible.
_IMG_RIM_JS = (
    "<script>(function(){if(window.__jkRim)return;window.__jkRim=1;\n"
    "function fix(im){if(im.__jkRim||!im.complete||!im.naturalWidth||im.naturalWidth<24)return;im.__jkRim=1;\n"
    "try{var W=im.naturalWidth,H=im.naturalHeight,c=document.createElement('canvas');c.width=W;c.height=H;\n"
    "var x=c.getContext('2d');x.drawImage(im,0,0);var pts=[[0,0],[W>>1,0],[W-1,0],[0,H>>1],[W-1,H>>1],[0,H-1],[W>>1,H-1],[W-1,H-1]];\n"
    "var r=0,g=0,b=0,a=0,mx=0,first=null;pts.forEach(function(p){var d=x.getImageData(p[0],p[1],1,1).data;\n"
    "if(!first)first=d;mx=Math.max(mx,Math.abs(d[0]-first[0])+Math.abs(d[1]-first[1])+Math.abs(d[2]-first[2]));\n"
    "r+=d[0];g+=d[1];b+=d[2];a+=d[3];});\n"
    # only for a uniform, opaque edge (a busy or transparent edge would show the ring)
    "if(mx>60||a<8*250)return;im.style.boxShadow='0 0 0 1px rgb('+(r>>3)+','+(g>>3)+','+(b>>3)+')';}catch(e){}}\n"
    "function all(){[].forEach.call(document.querySelectorAll('#qa img'),function(im){if(im.complete)fix(im);else im.addEventListener('load',function(){fix(im)},{once:true});});}\n"
    "try{new MutationObserver(all).observe(document.documentElement,{childList:true,subtree:true});}catch(e){}\n"
    "if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',all);else all();\n"
    "})();</script>\n")


# Cards scroll inside a fixed full-window frame (#jk-sc) that carries a STATIC edge mask:
# content fades out over EDGE px at the top/bottom, always correct, and since the mask
# never changes, scrolling repaints nothing. (Earlier tries: a mask on #qa had to be
# rewritten every frame — the main repaint cost; hiding it while scrolling popped in and
# out; fixed tint strips looked like dark bands on the glass.) Compatibility: the page's
# scroll handles (scrollTo, scrollY/pageYOffset, scrollingElement) point at the frame and
# its scroll events are forwarded to window, so Anki (scrollTo(0,0) on each question,
# #answer.scrollIntoView) and Janki's features keep working. 3D cards are left alone
# (their controls sit on the window edges).
_CARD_FRAME_JS = (
    "<style>#jk-sc{position:fixed;inset:0;overflow-y:auto;overflow-x:hidden;overscroll-behavior:none;outline:none;"
    "-webkit-mask-image:linear-gradient(to bottom,transparent 0,#000 18px,#000 calc(100% - 18px),transparent 100%);"
    "mask-image:linear-gradient(to bottom,transparent 0,#000 18px,#000 calc(100% - 18px),transparent 100%);}"
    "#jk-sc::-webkit-scrollbar{width:0;height:0}#jk-sc.jk-nofade{-webkit-mask-image:none;mask-image:none}</style>"
    "<script>(function(){if(window.__jkFrame)return;window.__jkFrame=1;\n"
    "function setup(){var q=document.getElementById('qa'),E=document.getElementById('jk-sc');\n"
    # the card page persists across cards: 3D cards (controls on the window edges) get no fade
    "if(E){E.classList.toggle('jk-nofade',!!document.querySelector('#jk3d'));return;}if(!q)return;\n"
    "var b=document.body,cs=getComputedStyle(b),F=document.createElement('div');F.id='jk-sc';F.tabIndex=-1;\n"
    # the frame takes over the body's margin + padding so the card sits exactly where it did
    "['Top','Right','Bottom','Left'].forEach(function(k){F.style['padding'+k]=(parseFloat(cs['margin'+k])+parseFloat(cs['padding'+k]))+'px';});\n"
    "b.style.margin='0';b.style.padding='0';\n"
    "q.parentNode.insertBefore(F,q);F.appendChild(q);\n"
    "document.documentElement.style.overflow='hidden';\n"
    # scroll handles → the frame
    "try{Object.defineProperty(document,'scrollingElement',{get:function(){return F},configurable:true});}catch(e){}\n"
    "try{Object.defineProperty(window,'scrollY',{get:function(){return F.scrollTop},configurable:true});\n"
    " Object.defineProperty(window,'pageYOffset',{get:function(){return F.scrollTop},configurable:true});}catch(e){}\n"
    "var ws=window.scrollTo;window.scrollTo=function(x,y){if(x&&typeof x==='object'){F.scrollTo(x);}else{F.scrollTop=y||0;}};\n"
    "window.scrollBy=function(x,y){if(x&&typeof x==='object')F.scrollBy(x);else F.scrollTop+=(y||0);};\n"
    # its scroll events reach window listeners too (tags, scroll state, deck-style fades)
    "F.addEventListener('scroll',function(){dispatchEvent(new Event('scroll'));},{passive:true});\n"
    # keyboard scrolling (the frame isn't focused, so do it here) — unless typing / handled
    "addEventListener('keydown',function(e){if(e.defaultPrevented||e.metaKey||e.ctrlKey||e.altKey)return;\n"
    " var t=e.target;if(t&&(t.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)))return;\n"
    " var h=F.clientHeight,d={ArrowDown:40,ArrowUp:-40,PageDown:h*0.9,PageUp:-h*0.9}[e.key];\n"
    " if(e.key==='Home')F.scrollTop=0;else if(e.key==='End')F.scrollTop=F.scrollHeight;else if(d)F.scrollTop+=d;else return;\n"
    " e.preventDefault();});\n"
    "}\n"
    "if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();\n"
    "try{new MutationObserver(setup).observe(document.documentElement,{childList:true,subtree:true});}catch(e){}\n"
    "})();</script>\n")


_WHEEL_JS = (
    "<script>(function(){if(window.__jkWheel||window.__jkNativeScroll)return;window.__jkWheel=1;\n"
    "var SENS=0.72;\n"      # scroll sensitivity: 1 = macOS's own distance
    "function innerCan(t,dy){var R=document.scrollingElement;for(var n=t;n&&n!==R&&n!==document.body&&n!==document.documentElement;n=n.parentNode||n.host){\n"
    "if(n.nodeType!==1)continue;var c=getComputedStyle(n).overflowY;\n"
    "if((c==='auto'||c==='scroll')&&n.scrollHeight>n.clientHeight+1){\n"
    "if(dy<0?n.scrollTop>0:n.scrollTop+n.clientHeight<n.scrollHeight-1)return true;}}return false;}\n"
    # Lift-off lurch: macOS opens the momentum with one outsized step (2–4× the ones before
    # it). Only right after the scroll has been slowing (3+ steps that didn't grow) is such
    # a step capped near the previous one — a scroll that's speeding UP is left alone.
    "var _ep=0,_ed=0,_es=0,_et=0;\n"
    "function despike(d){if(!d)return d;var t=performance.now(),a=Math.abs(d),s=d>0?1:-1;\n"
    "if(s!==_es||t-_et>90||t<_et){_ep=0;_ed=0;}_es=s;_et=t;\n"
    "if(_ed>=3&&_ep>2&&a>_ep*2.2)a=_ep*1.1;\n"
    "_ed=(_ep&&a<=_ep+0.5)?_ed+1:0;_ep=a;return s*a;}\n"
    # Shorter coast after a flick. Detected by SPEED over a 60 ms window (absorbs macOS's
    # 0-size events and ~1 ms doubles): a coast = speed 8 % below the gesture's peak and
    # still falling for 25 ms; steady or rising finger movement never matches. Then the
    # steps fade out over ~K ms. A push, reversal or pause resets it.
    "var _q=[],_pk=0,_lv=0,_lup=0,_cs=0,_dir=0,_ct=0,K=180;\n"
    "function coast(d){var t=performance.now();if(!d)return 0;var s=d>0?1:-1;\n"
    "if(s!==_dir||t-_ct>90||t<_ct){_q=[];_pk=0;_lv=0;_lup=t;_cs=0;_dir=s;}_ct=t;\n"
    "_q.push([t,Math.abs(d)]);while(_q.length&&t-_q[0][0]>60)_q.shift();\n"
    "var v=0;for(var i=0;i<_q.length;i++)v+=_q[i][1];v/=60;\n"
    "if(v>_lv*1.4||v>=_pk){_lup=t;_cs=0;}if(v>_pk)_pk=v;_lv=v;\n"
    "if(!_cs&&v<_pk*0.92&&t-_lup>25)_cs=t;\n"
    "if(!_cs)return d;var o=d*Math.exp(-(t-_cs)/K);return Math.abs(o)<1?0:o;}\n"
    "addEventListener('wheel',function(e){if(e.ctrlKey||e.defaultPrevented||Math.abs(e.deltaX)>Math.abs(e.deltaY))return;\n"
    "var t=e.composedPath?e.composedPath()[0]:e.target;if(innerCan(t,e.deltaY))return;\n"
    "e.preventDefault();var k=e.deltaMode===1?16:(e.deltaMode===2?innerHeight:1);\n"
    "var d=coast(despike(e.deltaY*k))*SENS;\n"
    "if(d)feed(d);},{passive:false});\n"
    # Resample to the display: macOS delivers trackpad steps only ~56×/s (pairs ~1 ms apart,
    # then ~18 ms gaps — measured), so applying each step on arrival moved the page in uneven
    # 10/10/18 ms hops on a 120 Hz screen (judder). Each step is spread evenly over the next
    # ~6 ms (SPAN) instead — a little movement on EVERY frame for minimal added delay.
    "var _pend=0,_rate=0,_lf=0,_raf=0,_pos=null,_wr=0,_lev=0,_gap=10;\n"
    "function feed(d){var se=document.scrollingElement;\n"
    "if(_pos===null||Math.abs(se.scrollTop-_wr)>2){_pos=se.scrollTop;_wr=_pos;_pend=0;}\n"
    # SPAN adapts to the input's own rhythm (EMA of the gap between steps, 6–20 ms): spread
    # each step over exactly the time until the next one → motion on every frame, and never
    # more delay than one input gap (a fixed 6 ms left frames idle between steps)
    "var _now=performance.now(),_gp=_now-_lev;if(_gp>=3){_lev=_now;if(_gp<40)_gap=_gap*0.7+_gp*0.3;}\n"
    "var sp=Math.max(6,Math.min(20,_gap));\n"
    "_pend+=d;_rate=Math.abs(_pend)/sp;if(!_raf){_lf=_now-8.3;tick();}}\n"
    # Driven by a plain 8.3 ms timer (120 Hz), NOT requestAnimationFrame: with the
    # frame-rate limit off, rAF loops spin the page thousands of times a second (measured
    # ~3000 main frames/s while waiting for a slot) and starve input handling. Each timer
    # step moves the page once → exactly one frame.
    "function tick(){_raf=0;var se=document.scrollingElement;\n"
    "if(Math.abs(se.scrollTop-_wr)>2){_pend=0;_pos=null;return;}\n"   # someone else moved it
    "var now=performance.now(),dt=Math.min(40,Math.max(1,now-_lf));_lf=now;\n"
    "var mv=Math.min(Math.abs(_pend),_rate*dt);if(_pend<0)mv=-mv;_pend-=mv;\n"
    "var mx=se.scrollHeight-se.clientHeight;_pos=Math.max(0,Math.min(mx,_pos+mv));\n"
    "se.scrollTop=_pos;_wr=se.scrollTop;\n"
    "if(Math.abs(_pend)>0.05&&_pos>0&&_pos<mx)_raf=setTimeout(tick,8.3);else{_pend=0;}}\n"
    "})();</script>\n")


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
    # (fade retired: the bottom-edge blur band softens a clipped box instead)
    "+'';\n"
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
    # Soft bottom edge: when the box runs past the window bottom, its last EDGE px before
    # the edge dissolve out (mask pinned to the viewport); fully on screen → no mask.
    "var EDGE=48,_lm='';function edge(){var el=document.getElementById(ID);if(!el)return;\n"
    "var r=el.getBoundingClientRect(),vh=document.documentElement.clientHeight||innerHeight;\n"
    # strength ramps in with how far it overflows (0 → full over EDGE px): no pop at the edge
    "var end=Math.round(vh-r.top),ov=r.height-end,a=Math.round(Math.max(0,1-ov/EDGE)*100)/100;\n"
    "var m=(ov<=0)?'':'linear-gradient(to bottom,#000 '+(end-EDGE)+'px,rgba(0,0,0,'+a+') '+end+'px)';\n"
    "if(m!==_lm){_lm=m;el.style.webkitMaskImage=m;el.style.maskImage=m;}}\n"
    # (the fade is retired, so the expensive whole-widget measuring (want/clip: up to
    # ~1600 rect reads per tick) no longer runs — at 120 Hz it stalled scrolling)
    "function tick(){edge();return;var w=want();\n"
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
    "setInterval(sched,1000);\n"
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
    "var _py=0,_lu=0,_o=null,_touched=false,_dh=0;var SK='__janki_db_scroll';\n"
    # Once you've scrolled this page yourself, the restore-after-render below is off
    # for good: a late restore timer firing mid-scroll yanked the list back up.
    "function _mu(){_lu=Date.now();_touched=true;}var _md=false;\n"
    "try{window.addEventListener('mousedown',function(){_md=true;},true);\n"
    "window.addEventListener('mouseup',function(){_md=false;_lu=Date.now();},true);}catch(e){}\n"
    # No scroll anchoring: Chromium shifting the page as late content (stats, chart)
    # lays out above you fought the jump-revert below — the list flung up, then back.
    "try{document.documentElement.style.overflowAnchor='none';}catch(e){}\n"
    "function _sy(){return window.pageYOffset||document.documentElement.scrollTop||0;}\n"
    "['wheel','touchstart','touchmove','keydown','mousedown'].forEach(function(ev){\n"
    "try{window.addEventListener(ev,_mu,{passive:true});}catch(e){}});\n"
    "try{var _sv=sessionStorage.getItem(SK);if(_sv){var p=JSON.parse(_sv);\n"
    "if(p&&p.y>6&&Date.now()-p.t<120000)_o=p;}}catch(e){}\n"
    "function _restore(){if(_o&&_o.y>6){_py=_o.y;window.scrollTo(0,_o.y);}}\n"
    # (The restore-after-render timers + 8 s watchdog are gone: at 120 Hz they couldn't see
    # your own scrolling, so reaching the top looked like a reset and threw you back down.
    # Anki's own redraw keeps the scroll position.)

    "try{window.addEventListener('scroll',function(){\n"
    "var y=_sy(),dh=document.documentElement.scrollHeight,grew=_dh&&dh!==_dh;_dh=dh;\n"
    # Revert only a real programmatic yank (AMBOSS jumping to its widget): not while
    # a scroll gesture or its momentum is still going (1 s), and not when the page
    # just changed height (that's layout settling, not a yank).
    # Never revert a landing at the very top (that's you reaching it — a long scrollbar drag
    # or the end of a fling — not AMBOSS), nor anything while a mouse button is held.
    # (The big-jump revert that used to sit here is gone: at 120 Hz its timing misread your
    # own scrolls as yanks and threw the page up/down. AMBOSS's yanks are now blocked at the
    # source instead — _QB_NOSCROLL_JS stops the widget's focus()/scrollIntoView.)

    "_py=y;\n"
    # only a genuine user scroll updates the saved target (programmatic ones don't)
    "if(Date.now()-_lu<300){_o={y:y,t:Date.now()};\n"
    "try{sessionStorage.setItem(SK,JSON.stringify(_o));}catch(e){}}\n"
    "},{passive:true});}catch(e){}\n"
    "})();</script>\n"
    )


def uniform_text_css(scopes=("",), px: int = 24) -> str:
    """Same base text size on every note type: the card is set to `px`, and sizes that a
    note type's STYLESHEET puts on the card's containers are neutralised. Kept on purpose:
    emphasis typed into the card itself (inline font-size / <font size> / <big>/<small>),
    headings, sub/superscript, and Janki's own UI inside the card (practice choices, the
    reword button…). Relative sizes inside those keep scaling from the new base."""
    px = max(10, min(60, int(px)))
    keep = (':not([style*="font-size"]):not(font[size]):not(big):not(small):not(sub):not(sup)'
            ':not(h1):not(h2):not(h3):not(h4):not(h5):not(h6):not(kbd)'
            ':not([class*="jp-"]):not([id^="jp-"]):not([id^="jk"]):not([class*="jk"])')
    base = ",".join(("%s " % sc if sc else "") + x for sc in scopes
                    for x in ("html body.card", ".card", "#qa"))
    kids = ",".join(("%s " % sc if sc else "") + "#qa *" + keep for sc in scopes)
    return (base + "{font-size:%dpx !important;}" % px
            + kids + "{font-size:inherit !important;}")


def black_text_css(scopes=("",)) -> str:
    """CSS that makes HARD-CODED black text (e.g. <font color="#000000"> pasted into KCOM /
    Cloze+ cards, or inline color:black) use the card's normal text colour instead — on a
    dark card it was invisible (mobile) or flashed black until a script repainted it
    (desktop). Only exact black is touched; real colours are left alone."""
    sels = ['font[color="#000000" i]', 'font[color="#000" i]', 'font[color="black" i]',
            '[style*="color: rgb(0, 0, 0)"]', '[style*="color:rgb(0,0,0)"]',
            '[style*="color: #000000" i]', '[style*="color:#000000" i]',
            '[style*="color: #000;" i]', '[style*="color:#000;" i]',
            '[style*="color: black" i]', '[style*="color:black" i]']
    full = ",".join((sc + " " if sc else "") + x for sc in scopes for x in sels)
    return full + "{color:inherit !important;}"



# Deck list: subdecks drop down when a "+" is clicked and fold up on "−". Anki rebuilds
# the whole page on every collapse toggle, so opening remembers the clicked deck
# (sessionStorage) and unfolds its subdeck rows after the redraw, while closing folds
# them first and then sends Anki's own collapse command. Rows are found by indent (the
# leading &nbsp; count), so it also works on the Practice page's banks.
_DECK_KEYS_JS = r"""(function(){
 if(window.__jkDeckKeys)return; window.__jkDeckKeys=true;
 function rows(){return Array.prototype.filter.call(document.querySelectorAll('tr.deck'),
   function(r){return r.querySelector('a.deck')&&r.offsetParent!==null;});}
 function ind(tr){var td=tr.querySelector('td.decktd');if(!td)return 0;
   return td.textContent.match(/^\xa0*/)[0].length;}
 function sfx(n){try{if(window.__jkPlay&&window.__jkPlay(n))return;pycmd('janki:sfx:'+n);}catch(x){}}
 var hid=null, idle=null;          // remembered row while the highlight is hidden
 var __jkSync=false;
 // Contanki (the remote) and Tab move the browser's focus between deck links: follow
 // it with the same pill, so there's only ever one selection.
 document.addEventListener('focusin',function(e){if(__jkSync)return;
   var a=e.target&&e.target.closest&&e.target.closest('a.deck'); if(!a)return;
   var tr=a.closest('tr.deck'); if(tr&&tr!==cur()){sel(tr);poke();}},true);
 function cur(){return document.querySelector('tr.deck.jk-kb-row');}
 function poke(){clearTimeout(idle);idle=setTimeout(function(){var c=cur();
   if(c){hid=c.id;sel(null,true);}},3000);}
 // A selection made while the page is still dropping in (restore / ↓ from the toolbar
 // right after a Decks/Practice switch): show the pill already in place so it rides
 // the page's slide, instead of its own grow animation running out of step with it.
 var LOADT=Date.now();
 function instant(){var h=document.documentElement;h.classList.add('jk-kb-instant');
   requestAnimationFrame(function(){requestAnimationFrame(function(){h.classList.remove('jk-kb-instant');});});}
 function sel(tr,keep){if(!keep)hid=null;var o=cur();
   if(tr&&Date.now()-LOADT<450)instant();
   document.documentElement.classList.toggle('jk-kbnav',!!tr);if(o){o.classList.remove('jk-kb-row');
   var a=o.querySelector('a.deck');if(a)a.classList.remove('jk-kb');}
   if(!tr)return; tr.classList.add('jk-kb-row');
   var a2=tr.querySelector('a.deck');if(a2){a2.classList.add('jk-kb');
     // keep the browser's focus (what Contanki / Tab move) on the same deck
     if(document.activeElement!==a2){__jkSync=true;try{a2.focus({preventScroll:true});}catch(x){}__jkSync=false;}}
   try{sessionStorage.setItem('jkKbSel',tr.id);}catch(x){}
   var r=tr.getBoundingClientRect();
   if(r.top<40||r.bottom>innerHeight-40)tr.scrollIntoView({block:'nearest'});}
 function start(){var rs=rows();if(!rs.length)return null;
   return document.querySelector('tr.deck.current')||rs[0];}
 document.addEventListener('keydown',function(e){
   if(e.metaKey||e.ctrlKey||e.altKey)return;
   var t=e.target;if(t&&(t.isContentEditable||/INPUT|TEXTAREA|SELECT/.test(t.tagName)))return;
   var k=e.key, rs=rows(); if(!rs.length)return;
   if(!/^(Arrow(Up|Down|Left|Right)|Enter| )$/.test(k))return;
   // first key on this page: tell Python the keyboard is here now, so a pending
   // "back to the toolbar" hand-off (after opening it by keyboard) stands down
   if(!window.__jkKbHere){window.__jkKbHere=1;try{pycmd('janki:kbhere');}catch(x){}}
   var c=cur(), i=c?rs.indexOf(c):-1;
   // First press after the highlight idled away: bring it back AND act on the key.
   // (It used to only re-show it, so the first ↓ after any pause seemed ignored —
   // which felt like lag.) Enter/Space still just re-show, so they can't open a deck
   // you couldn't see was selected.
   if(!c&&hid){var h=document.getElementById(hid);
     if(h){if(k==='Enter'||k===' '){e.preventDefault();sel(h);poke();return;}
       sel(h);c=h;i=rs.indexOf(h);}}
   poke();
   if(k==='ArrowDown'||k==='ArrowUp'){e.preventDefault();
     if(!c){sel(start());return;}
     if(k==='ArrowUp'&&i===0){sel(null);clearTimeout(idle);sfx('move');pycmd('janki:toolbar');return;}
     var n=k==='ArrowDown'?Math.min(rs.length-1,i+1):Math.max(0,i-1);
     if(rs[n]!==c)sfx('move'); sel(rs[n]); return;}
   if(!c){ if(k==='Enter'||k===' '){e.preventDefault();sel(start());} return;}
   var col=c.querySelector('a.collapse'), sign=col?col.textContent.trim():'';
   if(k==='ArrowRight'){e.preventDefault(); sfx('move'); if(sign==='+')col.click();
     else if(i+1<rs.length&&ind(rs[i+1])>ind(c))sel(rs[i+1]); return;}
   if(k==='ArrowLeft'){e.preventDefault(); sfx('move');
     if(sign==='-'||sign==='\u2212'){col.click();return;}
     for(var j=i-1;j>=0;j--)if(ind(rs[j])<ind(c)){sel(rs[j]);return;} return;}
   if(k==='Enter'||k===' '){e.preventDefault();
     try{sessionStorage.setItem('jkKbOn','1');}catch(x){}
     sfx('open'); var a=c.querySelector('a.deck'); if(a){window.__jkKbClick=true;a.click();window.__jkKbClick=false;}}
 },true);
 // Opening a deck: the list dips to 35% at once, and the overview rises from 35% —
 // one continuous dip instead of fade-out, blank, fade-in.
 document.addEventListener('click',function(e){
   var a=e.target.closest&&e.target.closest('a.deck'); if(!a)return;
   if(!window.__jkKbClick)sfx('move');          // mouse click on a deck/bank: the nav tick
   var b=document.body; if(!b)return;
   b.style.transition='opacity .1s ease-out'; b.style.opacity='0.35';
   setTimeout(function(){b.style.opacity='';},1500);   // safety: never stay dim
 },true);
 // coming back down from the toolbar: select the first deck
 window.jkDeckKbEnter=function(){var rs=rows();if(rs.length){sel(rs[0]);poke();}};
 function restore(){var id=null,on=null;
   try{id=sessionStorage.getItem('jkKbSel');on=sessionStorage.getItem('jkKbAct');}catch(x){}
   if(!id||!on||Date.now()-(+on||0)>2500)return;
   var tr=document.getElementById(id); if(tr){sel(tr);poke();}}
 // right-click a deck → expand / collapse its subdecks (same as its +/− link);
 // a deck without subdecks just ignores it (no browser context menu either way)
 document.addEventListener('contextmenu',function(e){
   var tr=e.target.closest&&e.target.closest('tr.deck'); if(!tr||!tr.id)return;
   e.preventDefault(); var a=tr.querySelector('a.collapse'); if(a)a.click();
 },true);
 // keep the selection across the redraw an expand/collapse causes
 document.addEventListener('keydown',function(e){
   if(/^Arrow/.test(e.key)){try{sessionStorage.setItem('jkKbAct',String(Date.now()));}catch(x){}}},true);
 // real mouse use hands control back to the pointer (ignore the synthetic move a
 // redraw fires under a still cursor)
 var t0=Date.now(), last=null;
 document.addEventListener('mousemove',function(e){
   var p=[e.screenX,e.screenY]; if(!last){last=p;return;}
   var moved=Math.abs(p[0]-last[0])+Math.abs(p[1]-last[1]); last=p;
   if(Date.now()-t0<500||moved<3)return;
   var c=cur();if(c){sel(null);try{sessionStorage.removeItem('jkKbAct');}catch(x){}}},{passive:true});
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',restore);
 else restore();
})();"""

# Bottom-edge fade for the deck list: rows sink out over the last 64px above the
# button bar instead of being cut off. Per-row opacity from each row's position —
# recomputed only on scroll / resize / redraw (rAF-coalesced), so nothing animates at
# rest. (A CSS mask can't do it: on a scrolling page it scrolls with the content.)
_DECK_EDGE_FADE_JS = r"""(function(){
 if(window.__jkEdgeFade)return; window.__jkEdgeFade=true;
 var ZONE=64, pend=false;
 function run(){pend=false;var H=window.innerHeight;
   var rs=document.querySelectorAll('tr.deck');
   for(var i=0;i<rs.length;i++){var r=rs[i].getBoundingClientRect();
     var o=r.top>=H?0:Math.max(0,Math.min(1,(H-(r.top+r.height*0.5))/ZONE));
     o=Math.round(o*20)/20; if(rs[i].__jkeo!==o){rs[i].__jkeo=o;
       rs[i].style.opacity=o===1?'':String(o);}}}
 function sched(){if(!pend){pend=true;requestAnimationFrame(run);}}
 window.addEventListener('scroll',sched,{passive:true});
 window.addEventListener('resize',sched);
 function start(){sched();
   new MutationObserver(sched).observe(document.body,{childList:true,subtree:true});}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);
 else start();
})();"""

# The remote (a gamepad — no key events) drives the same keyboard handlers: d-pad →
# arrow keys, face buttons → Enter ("next"). Standard-mapping d-pad buttons 12–15 or
# the raw X/Y axes (the 8bitdo Zero 2 reports its d-pad as axes).
_PAD_NAV_JS = r"""(function(){
 if(window.__jkPadNav||!navigator.getGamepads)return; window.__jkPadNav=true;
 var last={}, held={};
 function key(k){document.dispatchEvent(new KeyboardEvent('keydown',{key:k,bubbles:true,cancelable:true}));}
 // press = one key; held d-pad repeats like a held arrow key (Enter never repeats)
 function edge(id,on,k){var t=Date.now();
   if(on&&!last[id]){key(k);held[id]=t+380;}
   else if(on&&k!=='Enter'&&held[id]&&t>=held[id]){key(k);held[id]=t+90;}
   if(!on)held[id]=0; last[id]=on;}
 function tick(){
   var ps=navigator.getGamepads?navigator.getGamepads():[];
   var mine=document.hasFocus();
   for(var i=0;i<ps.length;i++){var g=ps[i];if(!g)continue;
     var b=function(n){return !!(g.buttons[n]&&g.buttons[n].pressed);};
     var ax=g.axes||[], x=ax[0]||0, y=ax[1]||0;
     // Not focused: remember what's held instead of forgetting it. Focus passes
     // between views (toolbar ↔ deck list) WHILE the d-pad is still down, and a
     // forgotten state made the newly focused page count that same press again —
     // one ↓ landed on the second row.
     if(!mine){last[i+'u']=b(12)||y<-0.5;last[i+'d']=b(13)||y>0.5;last[i+'l']=b(14)||x<-0.5;
       last[i+'r']=b(15)||x>0.5;last[i+'a']=b(0)||b(1)||b(2)||b(3);held={};continue;}
     edge(i+'u',b(12)||y<-0.5,'ArrowUp');   edge(i+'d',b(13)||y>0.5,'ArrowDown');
     edge(i+'l',b(14)||x<-0.5,'ArrowLeft'); edge(i+'r',b(15)||x>0.5,'ArrowRight');
     edge(i+'a',b(0)||b(1)||b(2)||b(3),'Enter');}
   // A plain timer, NOT requestAnimationFrame: polling on every frame made the page
   // ask for a new frame constantly (~60/s capped; a full CPU core uncapped) even
   // with no controller. Poll at ~60 Hz only while a pad is connected and we have
   // focus; otherwise check once a second.
   var any=false;for(var j=0;j<ps.length;j++){if(ps[j]){any=true;break;}}
   setTimeout(tick, any?(mine?16:100):1000);}
 window.addEventListener('gamepadconnected',function(){setTimeout(tick,0);});
 tick();
})();"""

_OVERVIEW_KEYS_JS = r"""(function(){
 if(window.__jkOvKeys)return; window.__jkOvKeys=true;
 document.addEventListener('keydown',function(e){
   if(e.metaKey||e.ctrlKey||e.altKey)return;
   if(e.key==='ArrowUp'){e.preventDefault();pycmd('janki:sfx:move');pycmd('janki:toolbar');return;}
   if(e.key!==' '&&e.key!=='Enter')return;
   var t=e.target;if(t&&(t.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)))return;
   if(!document.getElementById('study'))return;       // only when there's something to study
   e.preventDefault(); pycmd('janki:sfx:select'); pycmd('study');
 },true);
})();"""

# Toolbar keyboard/remote nav (entered with ↑ from the top deck): ←/→ move, Enter/
# Space open, ↓/Esc go back to the deck list. Same lift + glow as hovering.
_TOOLBAR_KEYS_JS = r"""(function(){
 if(window.__jkTbKeys)return; window.__jkTbKeys=true;
 function sfx(n){try{pycmd('janki:sfx:'+n);}catch(x){}}
 function items(){return Array.prototype.filter.call(document.querySelectorAll('a.hitem'),
   function(a){return a.offsetParent!==null;});}
 function cur(){return document.querySelector('a.hitem.jk-tbsel');}
 // one ring only: the item that had real focus (Decks, after a click) would keep
 // its :focus-visible ring beside the arrow-key selection — move focus along too
 function sel(a){var c=cur();if(c)c.classList.remove('jk-tbsel');if(a)a.classList.add('jk-tbsel');
   var f=document.activeElement;
   if(a){try{a.focus({preventScroll:true});}catch(x){}}
   else if(f&&f.classList&&f.classList.contains('hitem')){f.blur();}}
 // start on the page you came from (Decks, or Practice in the Practice view)
 window.jkToolbarEnter=function(id,last){var it=items();if(!it.length)return;
   sel(last?it[it.length-1]:(it.filter(function(a){return a.id===id;})[0]||it[0]));};
 document.addEventListener('keydown',function(e){
   if(e.metaKey||e.ctrlKey||e.altKey)return;
   var c=cur();
   if(!c&&/^Arrow(Left|Right)$/.test(e.key)){   // focused toolbar, nothing selected yet
     var a=document.activeElement, it0=items();
     c=(a&&it0.indexOf(a)>=0)?a:it0[0]; if(!c)return; sel(c); e.preventDefault(); return;}
   if(!c)return; var it=items(), i=it.indexOf(c), k=e.key;
   if(k==='ArrowLeft'||k==='ArrowRight'){e.preventDefault(); sfx('move');
     if(k==='ArrowRight'&&i===it.length-1){sel(null);pycmd('janki:gear');return;}  // → the gear
     sel(it[Math.max(0,Math.min(it.length-1,i+(k==='ArrowRight'?1:-1)))]);return;}
   if(k==='Enter'||k===' '){e.preventDefault();var id=c.id||'';if(id!=='sync')sfx('select');c.click();
     pycmd('janki:tbkeep:'+id);return;}   // stay on the toolbar: ←/→ + Space keep going
   if(k==='ArrowDown'||k==='Escape'){e.preventDefault();sel(null);sfx('move');pycmd('janki:deckfocus');}
 },true);
 document.addEventListener('mousemove',function(){var c=cur();if(c)sel(null);},{passive:true});
 // the keyboard moved on to the page (Calendar lectures, deck list…): drop the ring —
 // but remember it, so switching to another app and back puts it right back
 var held=null;
 window.addEventListener('blur',function(){var c=cur();if(c){held=c;sel(null);}});
 window.addEventListener('focus',function(){if(held&&!cur()&&held.offsetParent!==null)sel(held);held=null;});
 document.addEventListener('mousedown',function(){held=null;},true);
})();"""

_DECK_DROPDOWN_JS = "(function(){\n if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches) return;\n var DUR=190, EASE='cubic-bezier(.2,.8,.2,1)';\n function ind(tr){var td=tr.querySelector('td.decktd'); if(!td) return 0;\n   return td.textContent.match(/^\xa0*/)[0].length;}\n function kids(tr){var out=[], base=ind(tr), n=tr.nextElementSibling;\n   while(n&&n.classList.contains('deck')&&ind(n)>base){out.push(n); n=n.nextElementSibling;}\n   return out;}\n" \
    r""" // Was TWO separate WAAPI animations per cell (height/opacity on a wrapper,
 // padding on the td itself) — 8 animated elements per row (4 columns x 2). A
 // deck with many subdecks meant dozens to hundreds of simultaneous animations,
 // each driving a per-frame reflow (height/padding both affect layout), which
 // is what made this scale so badly with deck size. Folding padding into the
 // SAME wrapper/keyframe (box-sizing:border-box so the animated height already
 // accounts for it) halves that to one animation per cell — same visual result,
 // half the concurrent layout-affecting animations.
 function wrap(tr){return Array.prototype.map.call(tr.children,function(td){
   var cs=getComputedStyle(td);
   var w=document.createElement('div');
   w.style.overflow='hidden'; w.style.boxSizing='border-box';
   w.style.paddingTop=cs.paddingTop; w.style.paddingBottom=cs.paddingBottom;
   td.style.paddingTop='0'; td.style.paddingBottom='0';
   while(td.firstChild) w.appendChild(td.firstChild); td.appendChild(w); return w;});}
 function unwrap(ws){ws.forEach(function(w){var td=w.parentNode; if(!td) return;
   while(w.firstChild) td.insertBefore(w.firstChild,w); w.remove();
   td.style.paddingTop=''; td.style.paddingBottom='';});}
 function run(rows,open,done){
   // Windows: no fold animation — instant (animating rows stuttered/looked off with
   // software rendering, and the page redraws on every +/− anyway)
   if(/Windows/.test(navigator.userAgent)){if(done) done();return;}
   var ws=[], fill=open?'none':'forwards';
   rows.forEach(function(tr){ws=ws.concat(wrap(tr));});
   ws.forEach(function(w){
     var h=w.scrollHeight+'px', pt=w.style.paddingTop, pb=w.style.paddingBottom;
     var closed={height:'0px',opacity:0,paddingTop:'0px',paddingBottom:'0px'};
     var opened={height:h,opacity:1,paddingTop:pt,paddingBottom:pb};
     w.animate(open?[closed,opened]:[opened,closed],{duration:DUR,easing:EASE,fill:fill});
   });
   // A timer, not animation.finished: that promise can stall (e.g. a backgrounded
   // view), which would leave a fold stuck without ever sending the collapse.
   setTimeout(function(){if(open) unwrap(ws); if(done) done();},DUR+20);
 }
""" \
    "\n document.addEventListener('click',function(e){\n   var a=e.target.closest&&e.target.closest('a.collapse'); if(!a) return;\n   var tr=a.closest('tr.deck'); if(!tr) return; var did=tr.id;\n   try{pycmd('janki:sfx:'+(a.textContent.trim()==='+'?'unfold':'fold'));}catch(x){}\n   if(a.textContent.trim()==='+'){try{sessionStorage.setItem('jkExpand',did);}catch(x){} return;}\n   var rows=kids(tr); if(!rows.length) return;\n   e.preventDefault(); e.stopImmediatePropagation();\n   run(rows,false,function(){pycmd('collapse:'+did);});\n },true);\n function onLoad(){var did=null;\n   try{did=sessionStorage.getItem('jkExpand'); sessionStorage.removeItem('jkExpand');}catch(x){}\n   if(!did) return; var tr=document.getElementById(did); if(!tr) return;\n   var rows=kids(tr); if(rows.length) run(rows,true);}\n if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',onLoad);\n else onLoad();\n})();\n"
# Deck list width + columns: Anki sizes the table to its widest VISIBLE deck name, so
# opening or closing subdecks made the whole list jump wider/narrower and the count
# columns (New / Learn / Due) jump sideways. Remember the widest the list has been this
# session (per view: decks vs Practice banks) and never narrow below it; if a wider name
# appears, slide out to the new width. Each column also slides from its x on the
# previous render to its new x. Capped to the window, and re-fit on resize.
_DECK_WIDTH_JS = r"""(function(){
 var t, key, EASE='cubic-bezier(.2,.8,.2,1)', DUR=300;
 var still=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
 function cap(){ return document.documentElement.clientWidth - 24; }
 function natural(){ var w=t.style.width; t.style.width=''; var n=t.getBoundingClientRect().width;
   t.style.width=w; return n; }
 function get(k){ try{ return sessionStorage.getItem(k); }catch(e){ return null; } }
 function put(k,v){ try{ sessionStorage.setItem(k,v); }catch(e){} }
 function stored(){ return parseFloat(get(key))||0; }
 // Centre x of each column after the name cell (New / Learn / Due / options), from the
 // header row (or the first deck row if there's none).
 function refRow(){ var th=t.querySelector('th'); return th ? th.parentNode : t.querySelector('tr.deck'); }
 function centres(){ var r=refRow(); if(!r) return [];
   return Array.prototype.slice.call(r.children,1).map(function(c){
     var b=c.getBoundingClientRect(); return b.left+b.width/2; }); }
 function go(){
   t=document.querySelector('body center > table'); if(!t) return;
   var th=t.querySelector('th');
   key='jkDeckW:'+(th&&/^\s*Bank\s*$/.test(th.textContent)?'p':'d');
   // Practice view: pin the To-Do / Review / Completion columns to one width, so
   // revealing subdecks (or a fold animation) can't redistribute the table's width
   // between them — the bank-name column absorbs every change instead.
   // Decks AND Practice: pinned count columns, fixed layout, one stable width —
   // opening/closing subdecks never moves or slides a column.
   if(true){ var view=key.slice(-1); t.classList.add('jk-bank');
     if(!document.getElementById('jk-bank-cols')){ var st=document.createElement('style');
       st.id='jk-bank-cols';
       // scrollbar-gutter: a scrollbar appearing (list grew past the window) would
       // narrow the page and nudge the centred table
       st.textContent='html{scrollbar-gutter:stable both-edges;}'
         +'table.jk-bank{table-layout:fixed;box-sizing:border-box;'
         +'max-width:calc(100vw - 24px)!important;}'
         +'table.jk-bank td.decktd a.deck{white-space:normal;}'
         +'table.jk-bank th.count,table.jk-bank tr.deck>td:not(.decktd):not(.opts)'
         +'{width:7.2em;min-width:7.2em;max-width:7.2em;box-sizing:border-box;}'
         +'table.jk-bank td.decktd{overflow-wrap:anywhere;}'
         +'table.jk-bank td.opts,table.jk-bank th:last-child:not(.count)'
         +'{width:2.4em;min-width:2.4em;}';
       document.head.appendChild(st);}
     // One fixed width for the whole Practice view (the widest it has needed, within
     // the window): expanding/collapsing banks never resizes or slides the table.
     key='jkDeckW:'+view+'3';               // per view; fresh key drops older widths
     // A width that does NOT depend on the names: 760 px (or the window, if
     // narrower). Sizing to the widest visible name meant a longer subdeck name
     // revealed by + widened the centred table and slid every column. Long names
     // wrap inside the name column instead; the count columns are pinned above.
     var FIX=760;
     t.style.width=Math.min(cap(), FIX)+'px'; put('jkColAnim','');
     window.addEventListener('resize', function(){
       t.style.width=Math.min(cap(), FIX)+'px'; });
     return; }
   var nat=natural(), prev=Math.min(stored(), cap());
   var target=Math.max(nat, prev), start=prev||nat;
   t.style.width=target+'px'; var fin=centres();
   t.style.width=start+'px';
   // Only animate right after a +/− click. Anki also redraws the list 2–3× on launch
   // (and on returning from review) while the webfont swaps in; sliding on those made
   // the columns jitter against each other.
   var toggled=get('jkColAnim')==='1'; put('jkColAnim','');
   // The New/Learn/Due columns used to get a compensating translateX FLIP here
   // (snapshotting their old x, then animating back from it) whenever a subdeck
   // reveal shifted the table width. Visibly sliding those columns read as a bug,
   // not a nicety — dropped. The table-width slide below still smooths the width
   // change itself; the columns just reflow with it, no separate motion of their own.
   put(key+':x', JSON.stringify(fin));
   t.style.width=target+'px';
   if(toggled && start<target-1 && !still){
     try{ t.animate([{width:start+'px'},{width:target+'px'}],{duration:DUR,easing:EASE}); }catch(e){}
   }
   put(key, String(Math.max(target, stored())));
   // Re-measure once the webfont has loaded (it changes the text widths), so the next
   // toggle slides from where the columns really are.
   function refit(){ t.style.width=Math.max(natural(), Math.min(stored(), cap()))+'px';
     put(key, String(Math.max(parseFloat(t.style.width)||0, stored())));
     put(key+':x', JSON.stringify(centres())); }
   try{ document.fonts.ready.then(function(){ setTimeout(refit, 0); }); }catch(e){}
   window.addEventListener('resize', refit);
 }
 // Mark a +/− click so the redraw it causes (and only that one) animates. Registered
 // before the dropdown script's listener, which stops the event on "−".
 document.addEventListener('click', function(e){
   if(e.target.closest && e.target.closest('a.collapse')) put('jkColAnim','1'); }, true);
 if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',go); else go();
})();"""

# Deck list header (Deck / New / Learn / Due, or Bank / To-Do / Review / Completion)
# stays pinned at the top while the decks scroll. The glass table has no background to
# hide rows passing under the header, so each row's cells are clipped at the header's
# bottom line instead (clip-path), and hidden once fully above it. overflow:clip (not
# hidden) keeps the rounded table from becoming the sticky element's scroll container.
_DECK_STICKY_CSS = (
    "html body center > table:first-of-type{overflow:clip!important;}"
    "html body center > table:first-of-type th{position:sticky!important;top:0;z-index:3;}"
)
_DECK_STICKY_JS = r"""(function(){
 // Was one getBoundingClientRect() PER CELL (4x a row's real cost, since every cell
 // in a row shares the same top/bottom) plus an unconditional style write on every
 // row every scroll frame, even rows whose clip state hadn't changed — pure layout
 // thrashing on a software-rasterized (Windows glass) scroll, the biggest visible
 // source of choppy scrolling in the deck list. Now: one rect read per ROW, all
 // reads done before any writes (no read/write interleaving forcing extra layout),
 // and a write only for rows whose clip state actually changed since last frame —
 // in practice that's the 0-2 rows crossing the header's bottom edge.
 var t, pend=false, bodyRows=[];
 function collectRows(){
   bodyRows=[]; if(!t) return;
   var th=t.querySelector('th'); if(!th) return;
   Array.prototype.forEach.call(t.rows,function(tr){
     if(tr!==th.parentNode) bodyRows.push({tr:tr, state:null}); }); }
 function clip(){ pend=false; if(!t) return;
   var th=t.querySelector('th'); if(!th) return;
   var H=0; Array.prototype.forEach.call(th.parentNode.children,function(c){
     H=Math.max(H,c.getBoundingClientRect().bottom); });
   // Read phase: one rect per row.
   var rects=bodyRows.map(function(e){ return e.tr.getBoundingClientRect(); });
   // Write phase: only rows whose discretized state changed.
   for(var i=0;i<bodyRows.length;i++){
     var e=bodyRows[i], r=rects[i], next;
     if(r.bottom<=H) next='h';
     else if(r.top<H) next='c'+(H-r.top);
     else next='v';
     if(next===e.state) continue;
     e.state=next;
     var hidden=(next==='h'), clipTop=(next.charAt(0)==='c')?parseFloat(next.slice(1)):null;
     Array.prototype.forEach.call(e.tr.children,function(c){
       if(hidden){ c.style.visibility='hidden'; c.style.clipPath=''; }
       else if(clipTop!==null){ c.style.visibility=''; c.style.clipPath='inset('+clipTop+'px -40px 0 -40px)'; }
       else { c.style.visibility=''; c.style.clipPath=''; }
     });
   }
 }
 function sched(){ if(!pend){ pend=true; requestAnimationFrame(clip); } }
 function onResize(){ collectRows(); sched(); }
 function go(){ t=document.querySelector('body center > table'); if(!t) return;
   collectRows();
   window.addEventListener('scroll',sched,{passive:true});
   window.addEventListener('resize',onResize); sched(); }
 if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',go); else go();
})();"""

# Readability halo for text on glass. Two blurred layers look best but are expensive
# when the webviews draw in software — which the Windows glass needs (every typewriter
# frame repaints them) — so Windows gets one tight layer.
def _win_frameless() -> bool:
    try:
        from ..platform.win import preboot
        return preboot.frameless()
    except Exception:
        return False


_WIN_SOFT = (sys.platform.startswith("win")
             and os.environ.get("JANKI_WIN_RENDER") == "software")
# Readability halo behind text on the glass (Settings > Appearance > Text > Text
# shadows). "performance" (Windows default): one light layer, dropped while a card types
# out. "quality" (macOS default): the full two-layer halo, kept throughout. "off": none.
_SHADOW_PERF = "0 0 2px rgba(0,0,0,.95)"
_SHADOW_QUALITY = "0 0 3px rgba(0,0,0,.95), 0 1px 2px rgba(0,0,0,.85)"
TEXT_SHADOW_MODES = ("performance", "quality", "off")


def text_shadow_mode(cfg=None) -> str:
    cfg = cfg if cfg is not None else _cfg()
    m = str(cfg.get("text_shadow") or "").lower()
    if m in TEXT_SHADOW_MODES:
        return m
    return "performance" if sys.platform.startswith("win") else "quality"


def _text_shadow(cfg=None) -> str:
    m = text_shadow_mode(cfg)
    return {"performance": _SHADOW_PERF, "quality": _SHADOW_QUALITY}.get(m, "none")

_REDESIGN_ID = "2119814566"      # "Anki Redesign" on AnkiWeb


def _redesign_on() -> bool:
    """True when the Anki Redesign add-on is enabled. It brings its own hover
    transitions, so Janki's motion CSS stands down instead of stacking on top.

    addonManager.isEnabled() only checks the "disabled" flag in that add-on's
    stored meta — an add-on that was never INSTALLED has no meta at all, so
    "disabled" is absent and isEnabled() returns True vacuously. That silently
    disabled every bit of Janki's own hover/dropdown motion on any profile that
    never had Redesign installed (i.e. everywhere but the profile this was first
    written against). Must confirm it's actually installed first."""
    try:
        return _REDESIGN_ID in mw.addonManager.allAddons() and \
               bool(mw.addonManager.isEnabled(_REDESIGN_ID))
    except Exception:
        return False


# One easing for all chrome motion: quick start, soft settle.
_EASE = "cubic-bezier(.2,.8,.2,1)"


def _motion_css(context) -> str:
    """Hover and press transitions for the deck list, toolbar and bottom-bar buttons.
    Only motion lives here (transition / padding / transform); colours stay with the
    glass rules. Honours the OS "reduce motion" setting."""
    from aqt.deckbrowser import DeckBrowser, DeckBrowserBottomBar
    from aqt.overview import Overview, OverviewBottomBar
    from aqt.reviewer import ReviewerBottomBar
    from aqt.toolbar import TopToolbar
    rules = ""
    if isinstance(context, DeckBrowser):
        # Deck names slide right on hover while a soft pill grows out behind them. Both
        # are transforms (the name) and a pseudo-element (the pill), so the name, its
        # row and the count columns never change width — animating padding shifted the
        # other columns sideways. The pill counter-shifts so its left edge stays put.
        rules += (
            # The NAME slides (a span inside the link), not the link: moving the link
            # itself pulled it out from under a pointer resting at its edge, so hover
            # flickered on/off in a loop at one exact x position.
            "html body a.deck {\n"
            "  position:relative; isolation:isolate; text-decoration:none !important;\n"
            "  transition: color .3s ease; }\n"
            "html body a.deck .jk-dn { display:inline-block;\n"
            "  transition: transform .35s %(e)s; }\n"
            "html body a.deck:hover .jk-dn, html body a.deck.jk-kb .jk-dn {\n"
            "  transform: translateX(6px); }\n"
            "html body a.deck::before {\n"
            "  content:''; position:absolute; z-index:-1; inset:-3px -8px -3px -7px;\n"
            "  border-radius:8px; background: rgba(255,255,255,0.10);\n"
            # The pill takes pointer events: it still covers the spot the name slid
            # away from, so the hover can't flicker off at the name's left edge.
            "  opacity:0; transform-origin:left center; transform:scaleX(.7);\n"
            "  transition: opacity .3s ease, transform .35s %(e)s, left .35s %(e)s; }\n"
            "html body a.deck:hover::before, html body a.deck.jk-kb::before {\n"
            "  opacity:1; transform:scaleX(1); left:-13px; }\n"
            "html body a.collapse, html body td.opts a, html body td.opts img {\n"
            "  transition: opacity .25s ease, color .25s ease, transform .25s %(e)s; }\n"
            "html body td.opts a:hover img { transform: rotate(35deg); }\n"
            "html body a.collapse:hover { opacity:.75; }\n"
            # The deck's hover pill (which takes pointer events, and reaches 7–13 px
            # left of the name) sat ON TOP of +/− — clicks there opened the deck. Lift
            # +/− above it and give it a slightly bigger target (no layout change).
            "html body a.collapse { position:relative; z-index:2;\n"
            "  padding:4px 6px; margin:-4px -6px; }\n"
        )
    if isinstance(context, TopToolbar):
        rules += (
            "html body .header .hitem, html body a.hitem {\n"
            "  transition: background-color .28s ease, color .28s ease,\n"
            "    transform .28s %(e)s !important; }\n"
            "html body .header .hitem:hover, html body a.hitem:hover {\n"
            "  transform: translateY(-1px); }\n"
            "html body .header .hitem:active, html body a.hitem:active {\n"
            "  transform: translateY(0) scale(.96); transition-duration:.08s !important; }\n"
        )
    if isinstance(context, (DeckBrowserBottomBar, OverviewBottomBar, ReviewerBottomBar,
                            Overview)):
        rules += (
            "html body button {\n"
            "  transition: background-color .2s linear, color .3s ease-out,\n"
            "    filter .2s ease, box-shadow .25s ease, transform .2s %(e)s !important; }\n"
            "html body button:hover { transform: translateY(-1px); }\n"
            "html body button:active {\n"
            "  transform: translateY(0) scale(.97); transition-duration:.08s !important; }\n"
        )
    if not rules:
        return ""
    return ("<style>\n" + rules % {"e": _EASE} +
            "@media (prefers-reduced-motion: reduce) {\n"
            "  html body a.deck, html body a.hitem, html body .hitem, html body button {\n"
            "    transition: none !important; transform: none !important; } }\n"
            "</style>\n")


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
        # No rubber-band at the top/bottom: with the uncapped frame rate a scroll's
        # momentum could occasionally overshoot into it — the page flung up past its
        # top, then sprang back (deck list and reviewer alike).
        "html, body { overscroll-behavior-y: none !important; }\n"
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
        "  text-shadow: %s !important; }\n"
        "</style>\n"
    ) % _text_shadow(cfg)
    if text_shadow_mode(cfg) == "performance":
        # The typewriter reveal (css.py: _typewriter_head) toggles this class for
        # its brief animation window. Windows glass software-rasterizes every
        # repaint, and re-blurring a text-shadow on every newly-visible char span
        # (there can be hundreds by the end of a long card) is real per-tick cost;
        # dropping the halo just while the type-out is running removes that cost
        # with nothing to see — the halo reappears the instant a card settles.
        base += (
            "<style>\n"
            "body.jk-tw-active, body.jk-tw-active * { text-shadow: none !important; }\n"
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

    # Hover / press motion for Anki's chrome (deck names, toolbar, buttons).
    if cfg.get("ui_animations", True) and not _redesign_on():
        _mc = _motion_css(context)
        if _mc:
            parts.append(_mc)

    if sys.platform.startswith("win"):
        # Chromium on Windows draws chunky classic scrollbars — the most visible
        # "not a Mac" tell. Thin, rounded overlay-style bars instead.
        parts.append(
            "<style>::-webkit-scrollbar{width:8px;height:8px;background:transparent;}"
            "::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.22);border-radius:4px;}"
            "::-webkit-scrollbar-thumb:hover{background:rgba(255,255,255,0.35);}"
            "::-webkit-scrollbar-button,::-webkit-scrollbar-corner{display:none;}</style>\n")

    screens = cfg.get("screens", {})
    r = int(cfg.get("win_corner_radius", 11))
    # Windows fullscreen: square corners (chrome.sync_fullscreen also squares any
    # page already on screen when fullscreen toggles).
    try:
        if sys.platform.startswith("win") and (mw.isFullScreen() or mw.isMaximized()):
            r = 0
    except Exception:
        pass

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
        "html.glass-fading body{animation:glassFadeIn .15s ease-out both;}</style>\n"
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
        # Even spacing: Anki's deck page starts with a 2em body margin + 1rem table
        # padding (~45px), about double the gap above the toolbar pill. Match it.
        parts.append("<style>html body{margin-top:14px!important;}"
                     "body center>table:first-of-type{padding-top:6px!important;}</style>\n")
        # A little more air between WHOLE decks (subdeck spacing unchanged). Anki
        # doesn't mark top-level rows, but they're the only ones whose name cell has no
        # leading &nbsp; indent — tag those, then pad every top-level row after the
        # first. Runs after all Python-side rewrites (e.g. the Practice view's banks).
        # The fixed table width + pinned columns + scrollbar gutter as a STATIC style
        # (the script below applies them too, but only after the page has painted
        # once — after a +/− redraw that first frame was the narrow natural width)
        parts.append("<style>html{scrollbar-gutter:stable both-edges;}"
                     "body center>table:first-of-type{table-layout:fixed;box-sizing:border-box;"
                     "width:min(760px,calc(100vw - 24px))!important;}"
                     "body center>table:first-of-type th.count,"
                     "body center>table:first-of-type tr.deck>td:not(.decktd):not(.opts)"
                     "{width:7.2em;min-width:7.2em;max-width:7.2em;box-sizing:border-box;}"
                     "body center>table:first-of-type td.decktd{overflow-wrap:anywhere;}"
                     "body center>table:first-of-type td.decktd a.deck{white-space:normal;}"
                     "body center>table:first-of-type td.opts{width:2.4em;min-width:2.4em;}"
                     "</style>\n")
        parts.append("<script>" + _DECK_WIDTH_JS + "</script>\n")   # before the dropdown
        # Update available → a small pill bottom-right of the deck list.
        try:
            from ..system import updater as _upd
            if _upd.available:
                parts.append(
                    "<style>#jk-update{position:fixed;right:14px;bottom:12px;z-index:50;"
                    "background:rgba(156,188,243,.18);color:#cfe0ff;border:1px solid "
                    "rgba(156,188,243,.45);border-radius:10px;padding:5px 12px;"
                    "font-size:.92em;cursor:pointer;transition:background .2s ease,"
                    "transform .2s cubic-bezier(.2,.8,.2,1);}"
                    "#jk-update:hover{background:rgba(156,188,243,.3);transform:translateY(-1px);}"
                    "</style><script>(function(){function add(){if(document.getElementById"
                    "('jk-update'))return;var b=document.createElement('div');b.id='jk-update';"
                    "b.title='A new Janki version is available';b.textContent=%s;"
                    "b.onclick=function(){pycmd('janki:update');};document.body.appendChild(b);}"
                    "if(document.readyState==='loading')document.addEventListener("
                    "'DOMContentLoaded',add);else add();})();</script>\n"
                    % json.dumps("\u2191 Update to " + _upd.available[0]))
        except Exception:
            pass
        # Keyboard-only deck navigation (↑/↓ move, →/← expand/collapse, Enter/Space
        # open). The selection reuses the hover look; with hover motion off it's a
        # plain background (never a layout change).
        if not (cfg.get("ui_animations", True) and not _redesign_on()):
            parts.append("<style>html body a.deck.jk-kb{background:rgba(255,255,255,.12);"
                         "border-radius:6px;box-shadow:0 0 0 4px rgba(255,255,255,.12);}"
                         "</style>\n")
        # Anki keeps the gear showing on the "current" deck (the last one opened or
        # collapsed) even when the mouse is elsewhere — only the hovered / arrow-key
        # selected row shows it
        parts.append("<style>html body tr.deck.current:not(:hover):not(.jk-kb-row) .gears"
                     "{visibility:hidden!important;}</style>\n")
        parts.append("<style>html.jk-kb-instant a.deck,html.jk-kb-instant a.deck::before,"
                     "html.jk-kb-instant a.deck .jk-dn{transition:none !important;}</style>\n")
        parts.append("<style>html.jk-kbnav a.deck{pointer-events:none;}"
                     "html body a.deck:focus,html body a.deck:focus-visible{outline:none!important;}</style>"
                     "<script>" + _DECK_KEYS_JS + "</script>\n")
        try:
            from ..features import sfx as _sfx
            parts.append(_sfx.web_player())
        except Exception as _wp_exc:
            log("web sfx: %s" % _wp_exc)
        # perf probe only (user_files/perf_probe): time each arrow key on the deck list —
        # handlers, then the next two frames (≈ when the move is on screen)
        try:
            from ..util import perf_probe as _pp
            if _pp._ON:
                # immediate, no frame wait: did the page get the key at all, and where
                parts.append("<script>(function(){if(window.__jkKbRaw)return;window.__jkKbRaw=1;"
                             "function d(el){if(!el)return '-';var s=el.tagName||'?';if(el.id)s+='#'+el.id;"
                             "if(el.className&&el.className.toString)s+='.'+el.className.toString().split(' ').slice(0,2).join('.');return s;}"
                             "addEventListener('keydown',function(e){if(!/^Arrow/.test(e.key))return;"
                             "var a=document.activeElement;while(a&&a.shadowRoot&&a.shadowRoot.activeElement)a=a.shadowRoot.activeElement;"
                             "pycmd('janki:perfraw:'+e.key+'|target '+d(e.composedPath?e.composedPath()[0]:e.target)+'|focus '+d(a)+"
                             "'|deckkeys '+(!!window.__jkDeckKeys)+'|rows '+document.querySelectorAll('tr.deck').length+"
                             "'|hasFocus '+document.hasFocus());},true);"
                             "pycmd('janki:perfraw:page loaded|deckkeys '+(!!window.__jkDeckKeys));})();</script>\n")
                parts.append("<script>(function(){if(window.__jkKbPerf)return;window.__jkKbPerf=1;"
                             "addEventListener('keydown',function(e){if(!/^Arrow/.test(e.key))return;"
                             "var t0=performance.now(),q=(t0-e.timeStamp);setTimeout(function(){var t1=performance.now();"
                             "requestAnimationFrame(function(){requestAnimationFrame(function(){"
                             "var t2=performance.now();var n=document.getAnimations?document.getAnimations().length:-1;"
                             "pycmd('janki:perfkb:'+(t1-t0).toFixed(1)+':'+(t2-t0).toFixed(1)+':'+n+':'+"
                             "document.querySelectorAll('*').length+':'+q.toFixed(1)+':'+(Date.now()-(t2-t0)).toFixed(0)+':'+Date.now()+':'+"
                             "((document.querySelector('tr.deck.jk-kb-row')||{}).id||'none')+':'+"
                             "[].filter.call(document.querySelectorAll('tr.deck'),function(r){return r.querySelector('a.deck')&&r.offsetParent!==null;}).length+':'+"
                             "(document.activeElement?(document.activeElement.tagName+'.'+(document.activeElement.className||'').toString().slice(0,30)):'-'));});});},0);},true);})();</script>\n")
        except Exception:
            pass
        # wrap each deck name's text in span.jk-dn — the part that slides on hover
        parts.append("<script>(function(){function w(){document.querySelectorAll('a.deck')"
                     ".forEach(function(a){if(a.querySelector('.jk-dn'))return;"
                     "var s=document.createElement('span');s.className='jk-dn';"
                     "while(a.firstChild)s.appendChild(a.firstChild);a.appendChild(s);});}"
                     "if(document.readyState==='loading')document.addEventListener("
                     "'DOMContentLoaded',w);else w();})();</script>\n")
        parts.append("<script>" + _PAD_NAV_JS + "</script>\n")
        parts.append("<script>" + _DECK_EDGE_FADE_JS + "</script>\n")
        if cfg.get("ui_animations", True) and not _redesign_on():
            parts.append("<script>" + _DECK_DROPDOWN_JS + "</script>\n")
        parts.append("<style>" + _DECK_STICKY_CSS + "</style>\n"
                     "<script>" + _DECK_STICKY_JS + "</script>\n")
        # New / Learn / Due headings centred over their numbers (Anki right-aligns both).
        parts.append("<style>html body th.count, html body tr.deck > td[align=end]"
                     "{text-align:center!important;}</style>\n")
        _gap = int(cfg.get("deck_gap_px", 6))
        if _gap > 0:
            parts.append(
                "<style>html body tr.jk-top ~ tr.jk-top > td{padding-top:%dpx!important;}"
                # Extra room where an expanded deck's subdeck list ends and the next
                # whole deck begins, so groups read as groups.
                "html body tr.deck:not(.jk-top) + tr.jk-top > td{padding-top:%dpx!important;}"
                "</style>\n"
                "<script>(function(){function mark(){\n"
                "  document.querySelectorAll('tr.deck').forEach(function(tr){\n"
                "    var td=tr.querySelector('td.decktd');\n"
                "    if(td&&td.textContent.charAt(0)!=='\\u00a0') tr.classList.add('jk-top');});}\n"
                "  if(document.readyState==='loading')"
                " document.addEventListener('DOMContentLoaded',mark); else mark();\n"
                "})();</script>\n"
                % (1 + _gap, 1 + _gap + int(cfg.get("deck_group_gap_px", 6))))
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
        # No fade any more: the box's bottom dissolves into the window edge (edge() in
        # _qbank_fit_js) instead of being sliced off. (A backdrop-filter blur band doesn't
        # render on the software-composited glass page.)
        # the script still carries the scroll keeper (undoes AMBOSS's scroll yanks)
        parts.append(_qbank_fit_js(cfg.get("amboss_qbank_debug", False)))
        if not _LAUNCH_FADE["done"]:
            _LAUNCH_FADE["done"] = True
            _arm_launch_fade()
        if not _LAUNCH_FADE.get("started"):
            _LAUNCH_FADE["pending"] = _LAUNCH_FADE.get("pending", 0) + 1   # a load begins
        parts.append(fade_in)
    elif isinstance(context, (DeckBrowserBottomBar, OverviewBottomBar, ReviewerBottomBar)) \
            and screens.get("bottom_bar", True):
        parts.append("<style>\nbody #outer {\n" + props + "  margin:4px 0;\n}\n</style>\n")
        # Review started from the Calendar (class page / tray): the Show Answer bar
        # fades in with the first card instead of popping in (flag set by
        # calendar_view.study_event / practice_event, used once)
        if isinstance(context, ReviewerBottomBar) and getattr(mw, "_jk_fade_bottom", False) \
                and cfg.get("first_card_fade", True):
            mw._jk_fade_bottom = False
            parts.append(
                "<style>@media (prefers-reduced-motion: no-preference){"
                "body{animation:jkBarIn %dms cubic-bezier(.2,.8,.2,1) both;}}"
                "@keyframes jkBarIn{from{opacity:0;transform:translateY(6px)}"
                "to{opacity:1;transform:none}}</style>\n"
                % max(300, int(cfg.get("first_card_fade_ms", 220)) + 150))
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
            # Keyboard focus: a ring drawn as box-shadow (follows the button's own
            # rounding exactly). The default outline's corners didn't match, so the
            # dark button fill showed as a box inside the ring.
            "body #outer button:focus, body button:focus { outline: none !important; }\n"
            # The ring is a BORDER on the button itself (padding shrinks by the same
            # 2px so nothing moves): it shares the fill's exact rounded corners at any
            # height. A box-shadow ring took its corners from the unclamped 15px radius
            # while the 28px-tall button clamps its own to ~14px — a box showed inside.
            "body #outer button:focus-visible, body button:focus-visible {\n"
            "  outline: none !important;\n"
            "  border: 2px solid rgba(176,203,246,0.8) !important;\n"
            "  padding: 4px 12px !important; }\n"
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
        # Space / Enter (or the remote's face button) = Study Now.
        parts.append("<script>" + _OVERVIEW_KEYS_JS + "</script>\n")
        parts.append("<script>" + _PAD_NAV_JS + "</script>\n")
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
            # Counts + Study Now are one tight group centred under the deck title:
            # each cell only as wide as its contents (equal halves left dead space
            # beside the narrower counts, pulling the group's centre off).
            "html body center > table {\n"
            "  width:auto !important; max-width:100% !important;\n"
            "  margin:0 auto !important; table-layout:auto !important; }\n"
            "html body center > table > tbody > tr > td {\n"
            "  width:auto !important; vertical-align:middle !important;\n"
            "  word-wrap:break-word !important; }\n"
            "html body center > table > tbody > tr > td:first-child {\n"
            "  text-align:right !important; padding-right:22px !important; }\n"
            "html body center > table > tbody > tr > td:last-child {\n"
            "  text-align:left !important; padding-left:22px !important; }\n"
            # the counts: labels right, numbers left, so the numbers form one column
            "html body center > table td table { display:inline-table !important; }\n"
            "html body center > table td table td:first-child {\n"
            "  text-align:right !important; padding:1px 8px 1px 0 !important; }\n"
            "html body center > table td table td:last-child {\n"
            "  text-align:left !important; padding:1px 0 !important; }\n"
            "html body center > table td table { border-spacing:0 5px !important; }\n"
            # Study Now: larger, evenly padded (centred in its half, level with the
            # counts) and a pale blue matching the New count, with dark text.
            "html body button#study {\n"
            "  font-size:1.12em !important; font-weight:600 !important;\n"
            "  padding:12px 34px !important; margin:0 !important; min-width:150px !important;\n"
            "  border:none !important; border-radius:14px !important;\n"
            "  background:#9cbcf3 !important; color:#10213f !important;\n"
            "  text-shadow:none !important;\n"
            "  box-shadow:0 2px 10px rgba(0,0,0,0.35) !important; }\n"
            "html body button#study:hover { background:#b0cbf6 !important; }\n"
            "html body button#study:focus-visible {\n"
            "  outline:2px solid rgba(176,203,246,0.7) !important; outline-offset:2px; }\n"
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
        # A touch more fade here: it reads nicely and covers the moment the first card
        # takes if you hit Study right away.
        parts.append(fade_in.replace('from{opacity:0}', 'from{opacity:.1}')
                     .replace('glassFadeIn .15s', 'glassFadeIn .3s'))
    elif isinstance(context, Reviewer) and screens.get("reviewer", True):
        # No scrollbar on cards (Windows draws one on the right edge — very visible in
        # fullscreen / Focus Mode). Long cards still scroll with wheel/trackpad/keys.
        parts.append("<style>html::-webkit-scrollbar,body::-webkit-scrollbar,"
                     "*::-webkit-scrollbar{width:0!important;height:0!important;"
                     "background:transparent!important;display:none!important;}"
                     "html,body{scrollbar-width:none!important;}</style>\n")
        # Fade the FIRST card in when a study session starts. The reviewer page is
        # rebuilt on every entry to review, and Anki reveals each card by setting
        # #qa's opacity to 1 in one jump; catch that first reveal and animate it in.
        # Later cards keep Anki's (and the typewriter's) normal behaviour.
        if cfg.get("first_card_fade", True):
            _fd = int(cfg.get("first_card_fade_ms", 220))
            parts.append(
                "<script>(function(){\n"
                "  if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)"
                " return;\n"
                "  function arm(){ var qa=document.getElementById('qa'); if(!qa) return;\n"
                "    var mo=new MutationObserver(function(){\n"
                "      if(qa.style.opacity==='1'&&qa.childNodes.length){ mo.disconnect();\n"
                # starts partly visible: the card is there in ~80ms (measured); a fade
                # from 0 made it feel late
                "        try{ qa.animate([{opacity:.3},{opacity:1}],"
                "{duration:%d,easing:'cubic-bezier(.2,.8,.2,1)'}); }catch(e){} } });\n"
                "    mo.observe(qa,{attributes:true,attributeFilter:['style']});\n"
                "    setTimeout(function(){ mo.disconnect(); }, 8000); }\n"
                "  if(document.readyState==='loading')"
                " document.addEventListener('DOMContentLoaded',arm); else arm();\n"
                "})();</script>\n" % _fd)
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
        # Uniform text size across note types (Settings → Appearance → Text).
        if cfg.get("uniform_text", False):
            parts.append("<style>\n" + uniform_text_css(("",), cfg.get("uniform_text_px", 24))
                         + "\n</style>\n")
        # Hard-coded black text → the card's (white) text colour from the FIRST frame, so it
        # doesn't flash black before the contrast script repaints it. Dark tint only.
        try:
            if not glass._tint_is_light(cfg):
                parts.append("<style>\n" + black_text_css(("#qa",)) + "\n</style>\n")
        except Exception:
            pass
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
        # Scope the shrink-to-fit trick to TOP-LEVEL lists only (:not(li ul/ol)).
        # A nested list left as inline-block floats beside its parent <li> and the
        # centering scatters the sub-items across the row; keep nested lists as normal
        # block lists so they indent under their parent. Also hide genuinely empty
        # <li> (a blank line in the list) which otherwise renders a stray bullet.
        parts.append("<style>\n"
                     "#qa ul:not(li ul):not(li ol), #qa ol:not(li ul):not(li ol),\n"
                     ".card ul:not(li ul):not(li ol), .card ol:not(li ul):not(li ol) {\n"
                     "  display: inline-block !important; text-align: left !important; }\n"
                     "#qa li, .card li { text-align: left !important; }\n"
                     "#qa li:empty, .card li:empty { display: none !important; }\n"
                     "</style>\n")
        # Card font = the same system-wide font stack (default bundled Lora).
        # Applied to the card text (kbd/shortcut keys left alone).
        parts.append("<style>\n"
                     "#qa, .card, #qa *:not(kbd) {\n"
                     "  font-family: %s !important;\n}\n"
                     "</style>\n" % ui_font_stack(cfg))
        # Practice "Show original slide" button lives on <body> (outside #qa) so the note-type
        # CSS can lag behind the add-on. Force it here to the minimal reword-toggle look
        # (small, sans) with high specificity so it always matches regardless of the deployed
        # note-type CSS.
        parts.append("<style>\n"
                     "body .jp-slide-btn, button.jp-slide-btn {\n"
                     "  font-size: 11px !important;\n"
                     "  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', "
                     "sans-serif !important;\n}\n"
                     # both share the bottom-left corner: with a rephrasing on the card,
                     # the slide button sits just above the rephrase bar instead of on it
                     "body:has(#jk-rw-bar) .jp-slide-btn {\n"
                     "  bottom: 44px !important;\n}\n"
                     "</style>\n")
        # Cloze deletions: recolour to a readable blue by default. Many note types
        # (incl. AnKing) colour the active cloze green, which fights the glass; a
        # calm blue reads better and matches the mobile-cards cloze colour.
        # Configurable via `cloze_color`; set it blank to leave the note type's own.
        _cloze = str(cfg.get("cloze_color", "#6db3ff") or "").strip()
        if _cloze:
            parts.append("<style>\n"
                         ".cloze, .cloze b, #qa .cloze, .card .cloze,\n"
                         "html .night_mode .cloze, html .nightMode .cloze,\n"
                         "html .night_mode #qa .cloze, html .nightMode.card .cloze {\n"
                         "  color: %s !important;\n}\n</style>\n" % _cloze)
        # Hide the AnKing note-type countdown timer (#s2/.timer). Its text renders
        # black (unreadable on glass) and isn't wanted — timing is handled at the
        # system level. Scoped to the reviewer, so the pomodoro HUD .timer is safe.
        parts.append("<style>\n"
                     "#s2, .timer, .timeOverMsg { display: none !important; }\n"
                     "</style>\n")
        # Showing the answer: Anki snaps the page so the answer divider (<hr id=answer>)
        # is at the very top — on a long card that's a sudden jump down. If the divider
        # is already on screen, stay put; otherwise glide to it instead of snapping.
        parts.append("<script>(function(){if(window.__jkAnsScroll)return;window.__jkAnsScroll=1;\n"
                     "var o=Element.prototype.scrollIntoView;\n"
                     "Element.prototype.scrollIntoView=function(a){\n"
                     " if(this.id==='answer'&&a===undefined){var r=this.getBoundingClientRect();\n"
                     "  if(r.top>=0&&r.top<innerHeight*0.8)return;\n"
                     "  return o.call(this,{behavior:'smooth',block:'start'});}\n"
                     " return o.apply(this,arguments);};})();</script>\n")
        # AnKing on desktop shows OnlineMedEd as a banner IMAGE at the top of the card
        # (.banner-ome) and hides its button (#button-ome, phones only). Swap that: no
        # banner, and the OnlineMedEd button sits in the bottom row with Sketchy /
        # Bootcamp / … (it's already there in the template), styled the same.
        parts.append("<style>html body .banner-ome{display:none !important;}"
                     "html body #button-ome{display:inline-block !important;}</style>\n")
        # Card tags (AnKing's tag list) are hidden unless switched on (Appearance).
        if not cfg.get("card_tags_show", False):
            parts.append("<style>#tags-container{display:none !important;}</style>\n")
        # Card tags (AnKing #tags-container): its line-height is .45rem, so long
        # tags that wrap onto multiple lines overlap. Give it a real line-height,
        # let items wrap with spacing, and dim it.
        parts.append("<style>\n"
                     "#tags-container {\n"
                     "  opacity: 0.4 !important; font-size: .68rem !important;\n"
                     # not typed with the card (they sit apart, pinned to the bottom,
                     # and popped in on their own); a soft fade once the card is up
                     "  animation: jkTagsIn .45s ease .25s backwards;\n"
                     "  line-height: 1.5 !important;\n"
                     "  display: flex !important; flex-wrap: wrap !important;\n"
                     "  justify-content: center !important; gap: 2px 6px !important;\n"
                     "  align-items: flex-start !important;\n}\n"
                     "@keyframes jkTagsIn{from{filter:opacity(0)}to{filter:opacity(1)}}\n"
                     "#tags-container > * {\n"
                     "  line-height: 1.4 !important; white-space: nowrap !important;\n"
                     "  margin: 0 !important; float: none !important; }\n"
                     "</style>\n")
        # …and keep it out of the way: pinned to the bottom of the card view (just
        # above the answer buttons), at most `card_tags_max` tags, the rest behind a
        # "+N more" chip. AnKing cards can carry dozens of tags.
        _tmax = int(cfg.get("card_tags_max", 6) or 0)
        parts.append("<style>\n"
                     "#tags-container {\n"
                     "  position: fixed !important; left: 12px !important; right: 12px !important;\n"
                     "  bottom: 6px !important; top: auto !important; z-index: 3 !important;\n"
                     "  max-height: 4.6em !important; overflow: hidden !important;\n"
                     # the bar spans the width, but only the tags themselves take clicks:
                     # its empty space no longer blocks the card content under it
                     "  pointer-events: none !important; transition: opacity .2s ease;\n}\n"
                     "#tags-container > *, #tags-container .jk-tag-more { pointer-events: auto !important; }\n"
                     "#tags-container:hover { opacity: .85 !important; }\n"
                     # Only once you've scrolled down into the card yourself: out of sight
                     # (and click-through) at the top, fades in as you scroll down.
                     "html:not(.jk-tags-scrolled) #tags-container { visibility: hidden !important;\n"
                     "  pointer-events: none !important; }\n"
                     "html:not(.jk-tags-scrolled) #tags-container * { pointer-events: none !important; }\n"
                     "#tags-container.jk-tags-open { max-height: 40vh !important;\n"
                     "  overflow-y: auto !important; opacity: .9 !important; }\n"
                     "#tags-container .jk-tag-hide, #tags-container .jk-tag-dup,\n"
                     "#tags-container.jk-tags-dupbar { display: none !important; }\n"
                     "#tags-container .jk-tag-more { cursor: pointer; text-decoration: none !important;\n"
                     "  white-space: nowrap; background: transparent; }\n"
                     "#tags-container .jk-tag-more:hover { color: #fff !important; }\n"
                     "body { padding-bottom: var(--jk-tags-h, 5em) !important; }\n"
                     "</style>\n"
                     "<script>(function(){var MAX=%d;\n"
                     # The list is filled in by the note type's own script AFTER our first
                     # look, so this re-runs on every change (it used to lock in on the
                     # first, still-empty pass and never cap). Tags may sit in a wrapper.
                     "function items(c){var k=[].slice.call(c.children).filter(function(x){\n"
                     "  return !x.classList.contains('jk-tag-more');});\n"
                     " while(k.length===1&&k[0].children.length>1)k=[].slice.call(k[0].children);\n"
                     " return k;}\n"
                     # Each tag shows only its last part ("…::05_Pedigrees" → "Pedigrees");
                     # the full tag is on hover.
                     "function short(x){if(x.dataset.jkShort)return;var t=(x.textContent||'').trim();\n"
                     " if(t.indexOf('::')<0)return;x.dataset.jkShort='1';x.title=t;\n"
                     " var leaf=t.split('::').pop().replace(/^\\d+_/,'').replace(/_/g,' ');\n"
                     " var w=document.createTreeWalker(x,NodeFilter.SHOW_TEXT,null),n,first=true;\n"
                     # (only write when different: rewriting identical text still repaints)
                     " while(n=w.nextNode()){if(!n.nodeValue.trim())continue;var nv=first?leaf:'';if(n.nodeValue!==nv)n.nodeValue=nv;first=false;}}\n"
                     # The answer side repeats the front ({{FrontSide}}), so there can be TWO
                     # #tags-container: show only the last one and cap that one.
                     "function bars(){return [].slice.call(document.querySelectorAll('[id=\"tags-container\"]'));}\n"
                     "function cap(){var all=bars();if(!all.length)return;\n"
                     " var c=all[all.length-1];all.forEach(function(x){if(x!==c)x.classList.add('jk-tags-dupbar');});\n"
                     " c.classList.remove('jk-tags-dupbar');\n"
                     " try{var k=items(c);k.forEach(short);\n"
                     " var seen={};k.forEach(function(x){var t=(x.textContent||'').trim().toLowerCase();\n"
                     "  if(seen[t])x.classList.add('jk-tag-dup');seen[t]=1;});\n"
                     " k=k.filter(function(x){return !x.classList.contains('jk-tag-dup');});\n"
                     " var open=c.classList.contains('jk-tags-open');\n"
                     " k.forEach(function(x,i){x.classList.toggle('jk-tag-hide',MAX>0&&i>=MAX&&!open);});\n"
                     " var m=c.querySelector(':scope > .jk-tag-more');\n"
                     " if(MAX>0&&k.length>MAX){if(!m){m=document.createElement('span');m.className='jk-tag-more';\n"
                     "   m.onclick=function(e){e.stopPropagation();c.classList.toggle('jk-tags-open');cap();};c.appendChild(m);}\n"
                     "  var mt=open?'show less':'+'+(k.length-MAX)+' more';if(m.textContent!==mt)m.textContent=mt;\n"
                     # look like the tags beside it (the note type styles those pills):
                     # same font, size, padding and rounding, in a neutral grey
                     "  try{var cs=getComputedStyle(k[0]),st=m.style;\n"
                     "   ['fontFamily','fontSize','fontWeight','lineHeight','padding','borderRadius','borderWidth','letterSpacing']\n"
                     "   .forEach(function(p){st[p]=cs[p];});\n"
                     "   st.borderStyle='solid';st.borderColor='rgba(160,160,160,.55)';st.color='rgba(190,190,190,.9)';\n"
                     "   st.display=cs.display==='inline'?'inline-block':cs.display;st.alignSelf='center';}catch(e){}}\n"
                     " else if(m)m.remove();}catch(e){}}\n"
                     # Room under the card = the bar's real height (it grows when "+N more"
                     # is opened or tags wrap), so the end of the card can always scroll
                     # clear of it instead of sitting underneath.
                     "function room(){var all=bars(),c=all[all.length-1];\n"
                     " var hid=!c||getComputedStyle(c).display==='none';\n"
                     # a root custom property change restyles + repaints the WHOLE page (it ran
                     # ~12×/s mid-scroll) — only write when the value really changes
                     " var hv=hid?'0px':(c.getBoundingClientRect().height+14)+'px',rs=document.documentElement.style;\n"
                     " if(rs.getPropertyValue('--jk-tags-h')!==hv)rs.setProperty('--jk-tags-h',hv);\n"
                     " if(c&&!c.__jkRo&&window.ResizeObserver){c.__jkRo=new ResizeObserver(room);c.__jkRo.observe(c);}}\n"
                     # The note type rebuilds its tag list with its own script right after
                     # the card shows (AnKing swaps in <kbd> pills). Changes made while we
                     # were working used to be ignored, so that rebuild stayed uncapped.
                     # Now: settle 30 ms after the last change, and pause watching while
                     # we edit so our own changes don't loop.
                     "var MO,T=null,ROOT=document.documentElement,OPT={childList:true,subtree:true};\n"
                     "function run(){T=null;MO.disconnect();try{cap();room();}finally{MO.observe(ROOT,OPT);}}\n"
                     "MO=new MutationObserver(function(){if(T)clearTimeout(T);T=setTimeout(run,30);});\n"
                     "MO.observe(ROOT,OPT);document.addEventListener('DOMContentLoaded',run);run();\n"
                     # shown after a scroll YOU made (wheel / touch / keys / scrollbar), not
                     # one the page makes on its own; back at the top → hidden again
                     "var lu=0;['wheel','touchmove','keydown','mousedown'].forEach(function(e){\n"
                     " addEventListener(e,function(){lu=Date.now();},{passive:true});});\n"
                     "function sy(){return window.pageYOffset||ROOT.scrollTop||0;}\n"
                     "addEventListener('scroll',function(){var y=sy();\n"
                     " if(y<=24)ROOT.classList.remove('jk-tags-scrolled');\n"
                     " else if(y>40&&Date.now()-lu<1500)ROOT.classList.add('jk-tags-scrolled');},{passive:true});\n"
                     "})();</script>\n"
                     % _tmax)
        # Focus Mode: while chrome is hidden, hide the card tags AND vertically
        # centre the card in the window. Re-applied on every render so it survives
        # card changes (paired with an immediate eval in _focus_set_hidden for the
        # card already on screen).
        if focus._focus_hidden:
            parts.append("<style>\n" + focus._FOCUS_CSS + "\n</style>\n")
    elif isinstance(context, TopToolbar) and screens.get("toolbar", True):
        # (no transform on the selection: a transformed item gets its own layer, and
        # inside the frosted island that layer drew as a darker box inside the ring)
        parts.append("<style>html body .header a.hitem.jk-tbsel,html body a.hitem.jk-tbsel{"
                     "background:rgba(255,255,255,.12)!important;border-radius:8px!important;}"
                     # keyboard focus ring as a box-shadow on the same 8px rounding (the
                     # default outline's corners didn't match the fill → a box inside it)
                     # any focus state (programmatic focus doesn't match :focus-visible)
                     "html body a.hitem:focus,html body a.hitem:focus-visible,"
                     "html body .toolbar a:focus{outline:none!important;}"
                     "html body .toolbar:has(.jk-tbsel) a.hitem:focus-visible:not(.jk-tbsel){"
                     "border-color:transparent!important;}"
                     "html body a.hitem:focus-visible,html body a.hitem.jk-tbsel{"
                     "border-radius:8px!important;box-shadow:none!important;"
                     "border:2px solid rgba(176,203,246,0.8)!important;"
                     "padding:3px 10px!important;}</style>"
                     "<script>" + _TOOLBAR_KEYS_JS + "</script>\n")
        parts.append("<script>" + _PAD_NAV_JS + "</script>\n")
        parts.append("<style>\nbody #header {\n" + props + "}\n</style>\n")
        if sys.platform.startswith("win") and _win_frameless():
            # The frameless chrome's caption buttons (min/max/close, ~142px) float
            # natively on top of the toolbar's top-right corner. The toolbar's own
            # `.toolbar` pill is centered in a 3-column grid across the FULL window
            # width, so at anything but a wide window its right edge runs under the
            # caption buttons. Reserve that width on the right so the grid's centre
            # column — and the pill — shift left, clear of the buttons.
            parts.append(
                "<style>\nhtml body #header { padding-right:150px !important;"
                # A few px of breathing room above the pill so it (and the caption
                # buttons, offset by the same TOP_GAP in chrome.py) don't sit flush
                # against the window's very top edge.
                " padding-top:0 !important;"   # gap is chrome.TOP_GAP (native margin)
                " box-sizing:border-box !important; }\n</style>\n")
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
            # Anki declares font-family directly on the nav links, so the global
            # `html body{font-family}` rule (which relies on inheritance) can't reach
            # them — name them explicitly so the chosen UI font applies to the
            # Decks/Add/Browse/Stats/Practice/Sync items.
            "html body #header, html body #header *,\n"
            "html body .header .hitem, html body a.hitem {\n"
            "  font-family: %s !important; }\n" % _stack +
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


def _typewriter_head(cfg, prev_hash: str = "") -> str:
    """Rapid 'typing out' reveal of card text (anti shape-memory). Reveals text
    nodes char-by-char over a fixed duration, leaving images/formatting/MathJax
    intact, and re-fires on every card and on Show Answer.

    `prev_hash` is the content hash of the LAST card we actually animated (tracked
    on the Python side across renders). If this render's content hashes to the same
    value — e.g. AMBOSS re-renders the card to mark terms — we reveal instantly
    instead of replaying the reveal, no matter how much later that re-render lands."""
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
        # Idempotency: if this script is injected twice into the SAME document
        # (some content-set paths do), the second copy must not spin up its own
        # observer/animation. A fresh document (reload) resets this, so the card
        # still animates once per real render.
        "  if(window.__jkTwLoaded) return; window.__jkTwLoaded=1;\n"
        f"  var WPM={wpm}, MIN_MS={min_ms}, MAX_MS={max_ms}, STATIC={static}, SPEED={speed};\n"
        # Windows glass draws the webviews in software and re-copies the translucent
        # window every frame, so step every other frame there with twice the
        # characters per step: same typing speed, half the repaints.
        f"  var JK_FR={2 if _WIN_SOFT and os.environ.get('JANKI_SEETHROUGH_GL') != '1' else 1};\n"
        # High-performance text shadows (Windows default): drop the halo while the
        # text types out, so the blur isn't re-rasterized for every revealed step; it
        # returns once the card settles (see body.jk-tw-active in _build_css).
        f"  var JK_NOHALO={'true' if text_shadow_mode(cfg) == 'performance' else 'false'};\n"
        "  function jkNext(f){ if(JK_FR>1){ requestAnimationFrame(function(){ requestAnimationFrame(f); }); }"
        " else { requestAnimationFrame(f); } }\n"
        f'  var PREV_HASH="{prev_hash}";\n'
        "  function ready(fn){ if(document.readyState!='loading') fn();\n"
        "    else document.addEventListener('DOMContentLoaded', fn); }\n"
        "  ready(function(){\n"
        "    var qa = document.getElementById('qa'); if(!qa) return;\n"
        "    var reveal=function(){ try{ qa.style.visibility='visible'; }catch(e){} };\n"
        "    setTimeout(reveal, 600);\n"   # safety: never leave the card hidden
        "    var observer, animating=false;\n"
        # gen: bumped on every real card show, so a reveal still running for the
        # previous side/card stops instead of swallowing the new one. fresh: this
        # render is a new show (Anki called _showQuestion/_showAnswer), not a re-render.
        "    var gen=0, fresh=false, docFirst=true, curFinish=null;\n"
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
        "        if(t==='SCRIPT'||t==='STYLE'||t==='TEMPLATE') return true;\n"
        "        if((p.id||'')==='jk-rw-bar') return true;   // reword control bar (toggle + arrow)\n"
        "        if((p.id||'')==='jk-pq-bar'||(p.id||'')==='jp-slide-btn'||(p.classList&&p.classList.contains('jp-slide-btn'))) return true;   // practice slide button\n"
        "        if((p.id||'')==='tags-container') return true;   // card tags: fade in, not typed\n"
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
        # One steady typing rate for every card: the old 2.6 s cap made any card past
        # ~300 characters type faster than a short one. The cap is now a safety limit
        # (≥ 4.5 s) that only very long visible text reaches.
        "    function totalMs(total){ return Math.max(MIN_MS,Math.min(Math.max(MAX_MS,4500),(total/5)/WPM*60000))/SPEED; }\n"
        # WIPE reveal: one holder per text node (no per-char DOM at all), clip-path
        # animated left→right via the Web Animations API — the browser interpolates
        # ONE property per holder declaratively instead of Janki's JS toggling
        # visibility on hundreds of char-spans every other frame. That per-char
        # version was the real source of the choppy/uneven reveal on Windows glass:
        # every tick forced a style + paint pass across a growing number of live
        # elements, and a slow tick (a big repaint elsewhere landing the same frame)
        # made a WHOLE BATCH of characters pop in at once — visible "skipping."
        # A clip-path wipe has no such batching: however many frames the browser
        # actually manages, the wipe is at the right position for THAT frame, so a
        # dropped frame just means one slightly bigger, still-smooth step forward,
        # not a chunk of characters jumping in. clip-path only clips within an
        # element's OWN box per line fragment, so this only looks right on a run
        # confined to a single visual line; a run that wraps across several lines
        # (a long stretch of plain text with no inline markup breaking it up) falls
        # back to the old per-char step, scoped to just that one run.
        "    function typeOutStatic(clozeOnly, done){\n"
        "      var g=gen, nodes=collect(clozeOnly);\n"
        "      var totalChars=nodes.reduce(function(a,x){return a+x[1].length;},0);\n"
        "      if(!totalChars){ reveal(); done(); return; }\n"
        # EVERY <li> around the text (not just the nearest): a parent item whose text is
        # all in a nested list / child element otherwise kept its bullet from the start
        "      function jkLi(tn){ var out=[], p=tn.parentElement; while(p && p!==qa){\n"
        "        if((p.tagName||'')==='LI') out.push(p); p=p.parentNode; } return out; }\n"
        # Build every holder up front (stable full-size layout, nothing reflows once
        # revealing starts) and hide each with a full clip — clip-path doesn't affect
        # layout, so this is safe to set before reveal() and before measuring lines.
        "      var HIDE='inset(0 100% 0 0)', SHOW='inset(0 0 0 0)';\n"
        "      var holders=nodes.map(function(e){ var tn=e[0], text=e[1];\n"
        "        var holder=document.createElement('span'); holder.setAttribute('data-jtw','1');\n"
        "        holder.textContent=text; holder.style.clipPath=HIDE;\n"
        # find the list items BEFORE swapping the text node out — afterwards it's
        # detached (no parent), so no bullet was ever hidden
        "        var lis=jkLi(tn);\n"
        "        if(tn.parentNode) tn.parentNode.replaceChild(holder, tn);\n"
        "        return {el:holder, text:text, li:lis}; });\n"
        # The <li> ::marker isn't a text node, so it's untouched by any of this and
        # would pop in instantly ahead of its item's text — hide it (once per item;
        # a bullet's text can be split across several holders) until its FIRST
        # holder starts revealing.

        # Pace by VISIBLE text only: whitespace between tags and text in hidden
        # sections (AnKing's collapsed extras) used to count, which sped the visible
        # text up and left invisible pauses — speed varied by note type.
        # …and only text you can actually SEE now: AnKing backs carry sections that are
        # laid out but invisible (visibility:hidden, zero-size collapses) and long
        # extras far below the window (opacity is not checked: the card fades in, and a
        # fading card would read as invisible). Typing those at the steady rate looked like the
        # reveal suddenly crawling — they now just appear (weight 0).
        # measured AFTER reveal(): the card is visibility:hidden until then, which the
        # visibility check would read as "nothing to see" (holders are still clipped)
        "      reveal();\n"
        "      var VH=innerHeight;\n"
        "      function seen(el){ var rs=el.getClientRects(); if(!rs.length) return false;\n"
        "        try{ if(el.checkVisibility && !el.checkVisibility({checkVisibilityCSS:true})) return false; }catch(e){}\n"
        "        var r=rs[0]; if(r.top>VH) return false;\n"
        "        for(var i=0;i<rs.length;i++){ if(rs[i].width>0&&rs[i].height>0) return true; } return false; }\n"
        "      var totalW=0; holders.forEach(function(h){ var vis=seen(h.el);\n"
        "        h.w=vis ? h.text.replace(/\\s+/g,' ').trim().length : 0; totalW+=h.w; });\n"
        # …and only THEN hide the bullets: hidden first, every list item's text read as
        # invisible to seen() (visibility:hidden) and popped in untyped. Same JS turn as
        # the measuring, so no frame shows the bullets early.
        "      var liSeen=[];\n"
        "      holders.forEach(function(h){ h.liFirst=[]; (h.li||[]).forEach(function(li){\n"
        "        if(liSeen.indexOf(li)<0){ liSeen.push(li); li.style.visibility='hidden';\n"
        "          h.liFirst.push(li); } }); });\n"
        "      var MS=totalMs(totalW), cumW=0, T0=0;\n"
        "      function finishHolder(h){ try{ var par=h.el.parentNode;\n"
        "        if(par){ par.replaceChild(document.createTextNode(h.text), h.el); par.normalize(); } }catch(e){} }\n"
        "      function finishAll(){ for(var L=0;L<liSeen.length;L++){ try{ liSeen[L].style.visibility=''; }catch(e){} }\n"
        "        done(); }\n"
        "      curFinish=function(){ gen++; for(var q=0;q<holders.length;q++) finishHolder(holders[q]);\n"
        "        for(var L=0;L<liSeen.length;L++){ try{ liSeen[L].style.visibility=''; }catch(e){} } };\n"
        "      var idx=0;\n"
        "      function next(){\n"
        "        if(g!==gen){ while(idx<holders.length) finishHolder(holders[idx++]);\n"
        "          for(var L=0;L<liSeen.length;L++){ try{ liSeen[L].style.visibility=''; }catch(e){} } return; }\n"
        "        if(idx>=holders.length){ finishAll(); return; }\n"
        "        var h=holders[idx++];\n"
        "        h.liFirst.forEach(function(li){ try{ li.style.visibility=''; }catch(e){} });\n"
        "        if(!T0) T0=performance.now();\n"
        # nothing visible to type (whitespace / hidden): show it now, no pause
        "        if(!h.w){ finishHolder(h); next(); return; }\n"
        # timed against one clock for the whole card, so the gaps between pieces
        # don't add up on cards with lots of formatting. (T0, not t0: the per-char
        # fallback below declares its own `var t0`, which hoists over this function
        # and restarted the clock per piece — each piece then ran longer than the last.)
        "        cumW+=h.w; var dur=Math.max(16, T0+MS*cumW/totalW-performance.now());\n"
        "        var oneLine=h.el.getClientRects().length<=1;\n"
        "        if(oneLine && typeof h.el.animate==='function'){\n"
        "          var rtl=getComputedStyle(h.el).direction==='rtl';\n"
        "          try{\n"
        "            var anim=h.el.animate([{clipPath:rtl?'inset(0 0 0 100%)':HIDE},{clipPath:SHOW}],\n"
        "              {duration:dur, fill:'forwards', easing:JK_FR>1 ?\n"
        "                'steps('+Math.max(1,Math.round(dur/(JK_FR*1000/60)))+',end)' : 'linear'});\n"
        "            anim.onfinish=function(){ finishHolder(h); next(); };\n"
        "            anim.oncancel=function(){ finishHolder(h); next(); };\n"
        "          }catch(e){ finishHolder(h); next(); }\n"
        "          return;\n"
        "        }\n"
        # Multi-line fallback: the same per-char span-visibility step as before, but
        # scoped to just THIS holder's text (rare — a long run of plain text with no
        # inline markup to break it into single-line pieces), not the whole card.
        "        h.el.style.clipPath=''; h.el.textContent='';\n"
        "        var spans=[]; for(var i=0;i<h.text.length;i++){ var sp=document.createElement('span');\n"
        "          sp.className='__jtwc'; sp.textContent=h.text[i]; sp.style.visibility='hidden';\n"
        "          h.el.appendChild(sp); spans.push(sp); }\n"
        # by ELAPSED TIME, not per frame: a fixed count per frame assumed 60 fps and
        # raced / stalled when frames came faster or unevenly
        "        var ci=0, t0=performance.now();\n"
        "        function step(){ if(g!==gen){ finishHolder(h); next(); return; } var want=Math.min(spans.length, Math.ceil(spans.length*"
        "Math.min(1,(performance.now()-t0)/dur)));\n"
        "          while(ci<want){ spans[ci].style.visibility='visible'; ci++; }\n"
        "          if(ci<spans.length) jkNext(step); else { finishHolder(h); next(); } }\n"
        "        jkNext(step);\n"
        "      }\n"
        "      next(); }\n"
        "    function typeOut(clozeOnly, done){ if(STATIC){ return typeOutStatic(clozeOnly, done); }\n"
        "      var g=gen, nodes=collect(clozeOnly);\n"
        "      var total=nodes.reduce(function(a,x){return a+x[1].length;},0);\n"
        "      if(!total){ reveal(); done(); return; }\n"
        "      // duration scales with length at WPM (5 chars/word), clamped.\n"
        "      var MS=Math.max(MIN_MS, Math.min(MAX_MS, (total/5)/WPM*60000))/SPEED;\n"
        "      nodes.forEach(function(x){ x[0].nodeValue=''; });\n"
        # <li> ::marker bullets aren't text nodes: hide each item until the typing
        # reaches its first character, so bullets don't appear ahead of the text.
        "      var liFirst=new Map(), liAll=[];\n"
        "      nodes.forEach(function(x,i){ var p=x[0].parentNode; while(p && p!==qa){\n"
        "        if((p.tagName||'')==='LI'){ if(liAll.indexOf(p)<0){ liAll.push(p); p.style.visibility='hidden';\n"
        "          if(!liFirst.has(i)) liFirst.set(i,[]); liFirst.get(i).push(p); } }\n"
        "        p=p.parentNode; } });\n"
        "      function showLi(i){ var a=liFirst.get(i); if(a){ a.forEach(function(l){ l.style.visibility=''; }); liFirst.delete(i); } }\n"
        "      var fin=done; done=function(){ liAll.forEach(function(l){ l.style.visibility=''; }); fin(); };\n"
        "      curFinish=function(){ gen++; nodes.forEach(function(x){ x[0].nodeValue=x[1]; });\n"
        "        liAll.forEach(function(l){ l.style.visibility=''; }); };\n"
        "      reveal();   // reveal the now-emptied card (no flash of full text)\n"
        "      var ni=0,ci=0,shown=0,t0=performance.now();\n"
        # characters due by now (elapsed time), not a fixed count per frame
        "      function step(){ if(g!==gen){ nodes.forEach(function(x){ x[0].nodeValue=x[1]; });\n"
        "        liAll.forEach(function(l){ l.style.visibility=''; }); return; } var b=Math.min(total,Math.ceil(total*Math.min(1,"
        "(performance.now()-t0)/MS)))-shown; shown+=Math.max(0,b);\n"
        "        while(b>0 && ni<nodes.length){ var c=nodes[ni], rem=c[1].length-ci, take=Math.min(b,rem);\n"
        "          if(ci===0) showLi(ni);\n"
        "          c[0].nodeValue=c[1].slice(0,ci+take); ci+=take; b-=take;\n"
        "          if(ci>=c[1].length){ ni++; ci=0; } }\n"
        "        if(ni<nodes.length) jkNext(step); else done(); }\n"
        "      jkNext(step); }\n"
        "    var lastSig=null;\n"
        # Persist the last-animated card signature across webview RELOADS/re-renders.
        # A plain reload (cold-launch glass reload, mw.reset() after a lecture apply,
        # etc.) builds a fresh document → a per-document lastSig would reset and the
        # SAME card would replay its reveal (the 'plays twice on first open' bug).
        # window.name survives navigation/reload within the same window AND needs no
        # web-storage permission (Anki's webview may not grant sessionStorage), yet
        # resets on a fresh launch — so the first card of a session animates once.
        # Store a short hash, not the card text.
        "    function jkHash(t){ var h=0,i; for(i=0;i<t.length;i++){ h=((h<<5)-h)+t.charCodeAt(i); h|=0; } return String(h); }\n"
        "    function getSig(){ try{ var n=String(window.name||''); if(n.indexOf('jkTw:')===0) return n.slice(5); }catch(e){} return lastSig; }\n"
        "    function setSig(v){ lastSig=v; try{ window.name='jkTw:'+v; }catch(e){} }\n"
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
        "      var s=jkHash(raw.replace(/\\s+/g,''));\n"
        # One-shot skip: set by Python before a Tab+R / Ctrl+Z reword-cycle re-render so
        # jumping between card versions swaps instantly with NO type animation (the bottom-
        # left toggle button, a client-side swap, is unaffected and still animates).
        "      if(window.__jkNoType){ window.__jkNoType=0; setSig(s); reveal(); return; }\n"
        # PREV_HASH = last card Python actually animated (survives a full re-render/
        # new document, unlike window.name). getSig() = same-document/reload guard.
        # Either match → this exact card content already animated → just reveal.
        "      var isNew=fresh; fresh=false; docFirst=false;\n"
        "      if(!isNew && (s===PREV_HASH || s===getSig())){ reveal(); return; }\n"
        "      setSig(s); window.__jkAmbPhr=null; jkAmbHook();\n"
        "      // Janki Practice (MCQ) card → reveal instantly and let the template's\n"
        "      // own per-choice / flip animation run. The typewriter head is injected\n"
        "      // once per session (based on the FIRST card), so an interspersed practice\n"
        "      // card in an otherwise-normal review would otherwise get the text reveal\n"
        "      // and fight the choice animation. Detect it per-card via its markup.\n"
        "      if(qa.querySelector('.jp-stem, #jp-choices')){ reveal(); return; }\n"
        "      // Cloze reveal → show instantly, no animation. Front of cloze (and basic\n"
        "      // cards) fall through and animate normally.\n"
        "      if(qa.querySelector('.cloze') && isClozeBack()){ reveal(); return; }\n"
        # Tell Python which card content we're animating, so a later re-render of
        # the same card (e.g. AMBOSS re-marking) can be injected with it as
        # PREV_HASH and reveal instantly instead of replaying.
        "      try{ if(window.pycmd) pycmd('jktwanim:'+s); }catch(e){}\n"
        "      animating=true;\n"
        # Drop the readability halo for the animation's duration only (Windows glass
        # only — see the matching body.jk-tw-active rule in css.py's _build_css).
        # Removes a growing per-tick shadow-blur cost with nothing visibly lost.
        "      if(JK_NOHALO) document.body.classList.add('jk-tw-active');\n"
        "      if(observer) observer.disconnect();\n"
        "      var g0=gen;\n"
        "      function settle(){ animating=false;\n"
        "        if(JK_NOHALO) document.body.classList.remove('jk-tw-active');\n"
        "        jkAmbRemark(); if(observer) observer.observe(qa,{childList:true}); }\n"
        "      typeOut(false, function(){ if(g0!==gen) return; settle(); });\n"
        "      setTimeout(function(){ if(gen===g0 && animating){ if(curFinish) curFinish(); settle(); } },\n"
        "        MAX_MS/SPEED + 1500); }\n"
        "    // childList-only + SYNCHRONOUS run: the observer microtask fires before\n"
        "    // the browser paints, so emptying the text here means the full text is\n"
        "    // never shown. Fires only on real card/answer swaps, not image/MathJax.\n"
        "    observer=new MutationObserver(run);\n"
        "    observer.observe(qa,{childList:true});\n"
        # Every real card show (question or answer) animates, even mid-reveal or when
        # the text matches the previous card (a relearning card shown again).
        "    function jkWrap(name){ var o=window[name]; if(typeof o!=='function'||o.__jkw) return;\n"
        "      var w=function(){ gen++; if(animating){ animating=false;\n"
        "          if(JK_NOHALO) document.body.classList.remove('jk-tw-active'); }\n"
        "        fresh=!docFirst; try{ observer.observe(qa,{childList:true}); }catch(e){}\n"
        "        return o.apply(this, arguments); };\n"
        "      w.__jkw=1; window[name]=w; }\n"
        "    jkWrap('_showQuestion'); jkWrap('_showAnswer');\n"
        "    run();\n"
        "  });\n"
        "})();\n"
        "</script>\n"
    )


# The last-animated card content hash is stored on the mw singleton
# (mw._janki_tw_jh), set by _on_js_message and read by _on_will_set_content — NOT
# in a module global, because this add-on can run with more than one module
# instance (confirmed: id(module globals) differs between the two hooks), so a
# global here isn't shared. mw is the one object both instances agree on.

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
        "  var CKEY='janki_gs_chart2';\n"
        # Three states: hidden (the default — just the two icons), calendar, or trend.
        # Clicking the chart that's showing hides it again.
        "  var FULLW=chartc.style.width,FULLH=chartc.style.height,CUR='none';\n"
        "  function setChart(w){CUR=w;var cal=(w==='cal'),tr=(w==='trend');\n"
        "    hc.style.display=cal?'':'none';lc.style.display=tr?'':'none';\n"
        "    chartc.style.height=(cal||tr)?FULLH:'18px';\n"
        "    bCal.classList.toggle('on',cal);bTrend.classList.toggle('on',tr);\n"
        "    if(tr)drawLine(lc,true);\n"          # replay the line-draw when showing Trend
        "    try{localStorage.setItem(CKEY,w);}catch(e){}}\n"
        "  bCal.onclick=function(){setChart(CUR==='cal'?'none':'cal');};\n"
        "  bTrend.onclick=function(){setChart(CUR==='trend'?'none':'trend');};\n"
        "  var _cs='none';try{_cs=localStorage.getItem(CKEY)||'none';}catch(e){}\n"
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


# Press on the toolbar's empty space and drag (> 3px) = move the window; double-click =
# maximise. Starting on movement (not press) lets a fullscreen window stay put on a
# plain click; start_move restores it under the cursor once a drag begins.
_WIN_TOOLBAR_DRAG_JS = (
    "(function(){function bare(e){return !e.target.closest("
    "'a,button,input,select,textarea,.hitem');}var d=null;"
    "document.addEventListener('mousedown',function(e){"
    "d=(e.button===0&&e.detail===1&&bare(e))?[e.screenX,e.screenY]:null;"
    "if(d)e.preventDefault();},true);"
    "document.addEventListener('mousemove',function(e){"
    "if(!d)return;if(!(e.buttons&1)){d=null;return;}"
    "if(Math.abs(e.screenX-d[0])+Math.abs(e.screenY-d[1])>3){d=null;"
    "pycmd('jkwin:move');}},true);"
    "document.addEventListener('mouseup',function(){d=null;},true);"
    "document.addEventListener('dblclick',function(e){"
    "if(bare(e))pycmd('jkwin:max');},true);})();")


def _on_will_set_content(web_content: WebContent, context: Optional[Any]) -> None:
    try:
        css = _build_css(_cfg(), context)
        if css:
            web_content.head += "\n" + css
        # Frameless Windows window: the toolbar's empty space is the title bar - in
        # every look (not tied to the toolbar's glass styling being on).
        if sys.platform.startswith("win") and isinstance(context, TopToolbar) \
                and _win_frameless():
            web_content.head += "\n<script>" + _WIN_TOOLBAR_DRAG_JS + "</script>\n"
            # See-through: Windows sends clicks on fully transparent pixels to the
            # window behind, so the empty toolbar couldn't be grabbed. A 1/255 tint
            # (invisible) makes it hit-testable.
            if _WIN_SOFT:
                web_content.head += ("\n<style>html{background-color:"
                                     "rgba(0,0,0,0.004)!important;}</style>\n")
        # Typewriter reveal on the reviewer card (independent of the glass theme).
        # Skip it entirely on Janki Practice (MCQ) cards: they have their own
        # per-choice reveal animation, and the typewriter's hide-then-reveal of
        # #qa fights it (choice boxes animate while hidden → first/last render
        # out of order) and its post-reveal AMBOSS re-mark causes underline flicker.
        _is_practice = False
        try:
            _c = mw.reviewer.card
            if _c is not None and _c.note_type()["name"] == "Janki Practice":
                _is_practice = True
        except Exception:
            _is_practice = False
        if isinstance(context, Reviewer) and _cfg().get("typewriter", True) and not _is_practice:
            # A card can be RENDERED more than once (notably AMBOSS re-sets the
            # content to mark its terms), which replays the reveal. We can't tell
            # front from back reliably at this point (reviewer.state is often None),
            # so instead we inject the content hash of the last card we actually
            # animated (persisted across renders via the JS→Python ping below). If
            # this render's content hashes to the same value, the JS reveals it
            # instantly instead of re-typing — regardless of the gap between renders.
            prev = getattr(mw, "_janki_tw_jh", "") or ""
            web_content.head += "\n" + _typewriter_head(_cfg(), prev_hash=prev)
        # Review history charts (calendar heatmap + reviews plot) on the deck
        # browser home screen. Optional — hidden via Settings → General.
        # in <head>, so it's in place before AMBOSS's widget first mounts (and scrolls)
        if isinstance(context, DeckBrowser):
            web_content.head = _QB_NOSCROLL_JS + web_content.head
        # 1:1 wheel scrolling on the deck list / Practice AND on cards (same 120 Hz misfire)
        if isinstance(context, Reviewer):
            web_content.head = _CARD_FRAME_JS + _IMG_RIM_JS + web_content.head
        if isinstance(context, (DeckBrowser, Reviewer)):
            web_content.head = _SCROLL_STATE_JS + _WHEEL_JS + web_content.head
            # A/B: ~/.janki_native_scroll → Chromium's own scrolling; prepended last so the
            # flag is set before _WHEEL_JS reads it
            if os.path.exists(os.path.expanduser("~/.janki_native_scroll")):
                web_content.head = "<script>window.__jkNativeScroll=1;</script>" + web_content.head
        if isinstance(context, DeckBrowser) and _cfg().get("deck_stats", False):
            web_content.head += "\n" + _stats_head()
        # In the Practice view, relabel the deck browser's bottom "Import File" button
        # to "Import Bank" (its click is redirected to the bank importer — see
        # _on_js_message). Only while the Practice panel is open.
        if isinstance(context, DeckBrowserBottomBar):
            try:
                from ..features import practice
                if getattr(practice, "_practice_view", False):
                    import re as _re
                    body = web_content.body.replace("Import File", "Import Bank")
                    # Drop the Get Shared + Create Deck buttons (not relevant to banks).
                    for _cmd in ("shared", "create"):
                        body = _re.sub(
                            r"<button[^>]*pycmd\(&quot;%s&quot;\)[^>]*>.*?</button>" % _cmd,
                            "", body, flags=_re.DOTALL)
                        body = _re.sub(
                            r"<button[^>]*pycmd\(\"%s\"\)[^>]*>.*?</button>" % _cmd,
                            "", body, flags=_re.DOTALL)
                    # same size + look as the Calendar's "Study Progress" button
                    body = _re.sub(r"<button(?![^>]*jk-sp)([^>]*>\s*Import Bank)",
                                   "<button class='jk-sp' style='font-size:1.15em !important;"
                                   "padding:7px 22px !important;border:0.5px solid rgba(255,255,255,.6) !important;"
                                   "border-radius:999px !important;font-weight:600 !important;transform:none;'\\1",
                                   body, count=1)
                    body = ("<style>body #outer button.jk-sp{transition:background-color .15s ease,"
                            "border-color .15s ease,box-shadow .15s ease,transform .1s ease !important;}"
                            "body #outer button.jk-sp:hover{background:rgba(255,255,255,.08) !important;"
                            "border-color:rgba(255,255,255,.8) !important;"
                            "box-shadow:inset 0 0 8px rgba(156,188,243,.15) !important;}"
                            "body #outer button.jk-sp:active{transform:scale(.97) !important;}</style>" + body)
                    web_content.body = body
                elif not _calendar_showing():          # the Calendar has its own wand
                    # Normal Decks screen: add a "Load Lectures" button that opens the
                    # Load today's lectures wizard (click handled in _on_js_message).
                    web_content.body += (
                        "<button title=\"Load today's lectures\" "
                        "onclick='pycmd(\"janki-load-lectures\");'>Load Lectures</button>")
            except Exception:
                pass
        # Binary-grade practice: hide the native Again/Hard/Good/Easy buttons from the
        # FIRST paint by baking the rule into the bottom bar's initial HTML. Doing it
        # via JS after render (sync_practice_bottom) left a flicker of the ease buttons
        # before they were hidden; this kills that. The Continue button is still added
        # by sync_practice_bottom (additive, so no flicker).
        if isinstance(context, ReviewerBottomBar) and _is_practice \
                and _cfg().get("practice_binary_grade", True):
            web_content.head += "\n<style>button[data-ease]{display:none!important;}</style>"
        if GLASS:
            QTimer.singleShot(150, glass._clear_existing_webviews)
    except Exception as exc:
        log(f"css hook: {exc}")


if hasattr(gui_hooks, "webview_will_set_content"):
    gui_hooks.webview_will_set_content.append(_on_will_set_content)


def _jp_apply_grade(ease, correct):
    """Grade the current practice card + advance. Correct → also suspend it so the
    card is retired from the queue (in addition to being graded Easy). Sets the
    _janki_grading flag so the _answerCard wrapper lets THIS (our own) grade through
    instead of redirecting it back into the resolver.

    The suspend can't happen synchronously here: _answerCard runs answer_card() in a
    BACKGROUND thread, and that op rewrites the card's queue when it commits — a
    suspend fired now races it and usually gets overwritten (card stays unsuspended).
    So stash the cid; _on_reviewer_answered suspends it once the op has committed."""
    r = getattr(mw, "reviewer", None)
    card = getattr(r, "card", None) if r else None
    if r and card and getattr(r, "state", None) == "answer":
        mw._janki_suspend_cid = card.id if correct else None
        mw._janki_grading = True
        try:
            r._answerCard(ease)
        finally:
            mw._janki_grading = False


def _on_reviewer_answered(reviewer, card, ease):
    """Suspend a correctly-answered practice card AFTER its answer op has committed
    (see _jp_apply_grade). Fires for every answer; no-ops unless a suspend was queued."""
    cid = getattr(mw, "_janki_suspend_cid", None)
    if cid is None:
        return
    mw._janki_suspend_cid = None
    def _do():
        try:
            mw.col.sched.suspend_cards([cid])
        except Exception:
            pass
    QTimer.singleShot(0, _do)


if hasattr(gui_hooks, "reviewer_did_answer_card"):
    gui_hooks.reviewer_did_answer_card.append(_on_reviewer_answered)


def _jp_bury():
    """Set the current practice card aside for this session with no judgement — used
    for a wrong pick and when advancing without one. Bury records no review and doesn't touch
    scheduling; the card returns next session."""
    r = getattr(mw, "reviewer", None)
    card = getattr(r, "card", None) if r else None
    if r and card and getattr(r, "state", None) == "answer":
        try:
            r.bury_current_card()
        except Exception:
            pass


def _jp_resolve():
    """The SINGLE authority for advancing a binary-grade practice card. Applies the
    outcome the FRONT pick decided: correct → Easy + suspend; wrong, or no answer
    picked → bury until next session. Latched per card id so a stray/duplicate trigger — e.g.
    Anki's native answer shortcut firing alongside our own Continue — can't act twice
    (the second call sees the card already resolved and no-ops). The latch is cleared
    on each question render (see apply_practice_prefs) so a card that legitimately
    returns later in the session can be resolved again."""
    r = getattr(mw, "reviewer", None)
    card = getattr(r, "card", None) if r else None
    if not (r and card and getattr(r, "state", None) == "answer"):
        return
    cid = card.id
    if getattr(mw, "_janki_last_resolved", None) == cid:
        return
    mw._janki_last_resolved = cid
    pend = getattr(mw, "_janki_pending_grade", None)
    mw._janki_pending_grade = None
    # Interspersed inline practice card (Trigger A): it was NOT served by the
    # scheduler, so answer_card would desync the real queue. Resolve it ourselves
    # (correct → suspend/retire, wrong → resurface, skip → drop) and advance.
    try:
        from ..features import intersperse
        if intersperse.is_inline_active(cid):
            correct = bool(pend and len(pend) >= 2 and pend[1])
            answered = bool(pend and len(pend) >= 3 and pend[2])
            intersperse.resolve_inline(cid, correct, answered)
            return
    except Exception as e:
        log("intersperse resolve delegate: %s" % e)
    if pend and len(pend) >= 3 and pend[2] and pend[1]:
        _jp_apply_grade(pend[0], True)
    else:
        # Wrong pick or no pick: bury — set aside until next session with no review
        # recorded and no scheduling change (a wrong answer used to grade Hard).
        _jp_bury()


# Redirect ALL grade attempts on a binary-grade practice card through _jp_resolve, so
# the front pick is the only judge. This closes the gap where Anki's native answer
# shortcuts (1/2/3/4, spacebar rating) reached _answerCard directly — bypassing our
# binary logic and grading the card Good regardless of the pick (which lit the green
# flare even on wrong/blank answers). Our own grade passes through via _janki_grading.
_janki_orig_answer_card = Reviewer._answerCard


def _janki_answer_card(self, ease):
    if getattr(mw, "_janki_grading", False):
        return _janki_orig_answer_card(self, ease)
    try:
        card = getattr(self, "card", None)
        if (card is not None
                and (card.note_type() or {}).get("name") == "Janki Practice"
                and _cfg().get("practice_binary_grade", True)
                and getattr(self, "state", None) == "answer"
                # While the original-slide fallback is shown, the parse is untrusted,
                # so let the real Again/Hard/Good/Easy grade the card directly instead
                # of the binary pick-based resolver.
                and not getattr(mw, "_janki_slide_fallback", False)):
            _jp_resolve()
            return
    except Exception:
        pass
    return _janki_orig_answer_card(self, ease)


Reviewer._answerCard = _janki_answer_card


def _on_js_message(handled, message, context):
    """Catch the typewriter's animation ping: record (on the mw singleton, which
    every add-on module instance shares — a module global here does NOT) the
    content hash it just animated, so the NEXT render of the same card (e.g. an
    AMBOSS re-mark re-render) is injected with it as PREV_HASH and reveals
    instantly instead of replaying the reveal."""
    try:
        # Windows frameless glass window: drag / maximise from the toolbar's empty space.
        if message == "jkwin:move":
            from ..platform.win import chrome
            chrome.start_move()
            return (True, None)
        if message == "jkwin:max":
            from ..platform.win import chrome
            chrome.toggle_maximize()
            return (True, None)
        if isinstance(message, str) and message.startswith("jktwanim:"):
            parts = message.split(":", 1)
            if len(parts) == 2:
                setattr(mw, "_janki_tw_jh", parts[1])
            return (True, None)
        # In the Practice view, the deck browser's "Import File" button imports a
        # question bank instead (opens Janki ▸ Practice ▸ Question Bank). Only while the
        # Practice panel is open — normal deck browser keeps native file import.
        if isinstance(message, str) and message == "import":
            try:
                from ..features import practice
                from aqt.deckbrowser import DeckBrowser, DeckBrowserBottomBar
                # The Import File button lives in the deck browser's BOTTOM bar, whose
                # bridge context is DeckBrowserBottomBar (not DeckBrowser).
                if getattr(practice, "_practice_view", False) and isinstance(
                        context, (DeckBrowser, DeckBrowserBottomBar)):
                    from ..system import settings_dialog
                    settings_dialog._open_settings(section="practice_qbank")
                    return (True, None)
            except Exception:
                pass
        # "Load Lectures" button on the normal Decks screen → the Load today's lectures
        # wizard (same as Tools ▸ Load today's lectures).
        if isinstance(message, str) and message == "janki-load-lectures":
            try:
                from ..integrations import lectures
                from aqt.qt import QTimer as _QT
                # Open AFTER this webview click finishes — opening mid-click let the
                # main window come back to the front over the new window.
                _QT.singleShot(0, lambda: lectures.run_today(interactive=True))
            except Exception:
                pass
            return (True, None)
        # The back side reports the decided grade + whether an answer was picked, so the
        # resolver knows the front pick's outcome (correct→Easy+suspend, wrong→Hard, or
        # no pick→bury). Stashed on mw because the bottom-bar Continue button lives in a
        # separate webview that can't read the card's sessionStorage.
        if isinstance(message, str) and message.startswith("jp-ready:"):
            try:
                parts = message.split(":")
                answered = len(parts) <= 3 or parts[3] == "1"
                mw._janki_pending_grade = (int(parts[1]), len(parts) > 2 and parts[2] == "1", answered)
            except Exception:
                pass
            return (True, None)
        # Continue (bottom-bar button / Space / Enter / controller) → resolve the card
        # via the single authority. _jp_resolve is latched so this can't double-fire
        # with Anki's native answer shortcut.
        if isinstance(message, str) and message == "jp-continue":
            try:
                _jp_resolve()
            except Exception:
                pass
            return (True, None)
        # "Show original slide" fallback: while the slide is shown the parsed answer
        # can't be trusted, so reveal Anki's native Again/Hard/Good/Easy to self-grade;
        # restore the binary Continue when the question is shown again.
        # Bottom-bar "Original slide" button → flip slide mode in the card webview.
        if isinstance(message, str) and message == "janki-slide-toggle":
            try:
                mw.web.eval("window.jankiToggleSlide&&window.jankiToggleSlide();")
            except Exception:
                pass
            return (True, None)
        if isinstance(message, str) and message.startswith("janki-slide:"):
            try:
                from ..integrations import qbank
                show = message.endswith(":1")
                mw._janki_slide_fallback = show   # let native ease grade while shown
                from ..features import focus
                focus.set_slide_topbar_hidden(show)  # slide reaches window top
                if show:
                    qbank.set_practice_bottom_hidden(False)
                else:
                    qbank.sync_practice_bottom()
            except Exception:
                pass
            return (True, None)
    except Exception:
        pass
    return handled


if hasattr(gui_hooks, "webview_did_receive_js_message"):
    gui_hooks.webview_did_receive_js_message.append(_on_js_message)


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
)


def _congrats_glass_js(cfg) -> str:
    css = _CONGRATS_GLASS_CSS + "body,body *{text-shadow:" + _text_shadow(cfg) + "!important;}"
    return ("(function(){if(document.getElementById('__janki_congrats_glass'))return;"
            "var s=document.createElement('style');s.id='__janki_congrats_glass';"
            "s.textContent='" + css + "';"
            "if(document.head)document.head.appendChild(s);})();")


def install_congrats_preglass() -> None:
    """Register a document-creation script on mw.web that makes the congrats page
    transparent before it paints (a constructed stylesheet can be adopted before <head>
    exists). Runs on every main-window page; acts only on the congrats URL."""
    cfg = _cfg()
    if not GLASS or not cfg.get("enabled", True):
        return
    try:
        try:
            from aqt.qt import QWebEngineScript
        except ImportError:
            from PyQt6.QtWebEngineCore import QWebEngineScript
        import json
        page = mw.web.page()
        for old in page.scripts().find("janki-congrats-preglass"):
            page.scripts().remove(old)
        css = (_CONGRATS_GLASS_CSS + "body,body *{text-shadow:" + _text_shadow(cfg) + "!important;}"
               # entrance: the heading drops in and fades up, the line under it just
               # after (opacity/transform only — nothing in the layout moves)
               # starts at .02, not 0: with nothing visible, Chromium holds the new page
               # back (~0.45 s "paint holding") before drawing it — the hang on opening
               "@keyframes jkCongIn{from{opacity:.02;transform:translateY(-10px)}"
               "to{opacity:1;transform:none}}"
               "body h1,body h2,body h3{animation:jkCongIn .42s cubic-bezier(.2,.8,.2,1) both}"
               "body p,body ul,body ol{animation:jkCongIn .42s cubic-bezier(.2,.8,.2,1) .09s both}")
        sc = QWebEngineScript()
        sc.setName("janki-congrats-preglass")
        sc.setInjectionPoint(QWebEngineScript.InjectionPoint.DocumentCreation)
        sc.setWorldId(QWebEngineScript.ScriptWorldId.MainWorld)
        sc.setRunsOnSubFrames(False)
        sc.setSourceCode(
            "(function(){try{if(!/congrats/.test(location.pathname))return;"
            "var s=new CSSStyleSheet();s.replaceSync(%s);"
            "document.adoptedStyleSheets=document.adoptedStyleSheets.concat([s]);}catch(e){}})();"
            % json.dumps(css))
        page.scripts().insert(sc)
    except Exception as e:
        log("congrats preglass: %s" % e)


def _congrats_font_js(cfg) -> str:
    """The congrats page's text in the chosen Janki UI font (Lora by default), like the
    rest of the chrome. Rebuilt on every load so a font change applies; replaces its
    own <style> rather than stacking."""
    import json
    css = (lora_face_css() +
           "html body, html body h1, html body h2, html body h3, html body p,"
           " html body a, html body button {font-family:%s!important;}"
           "html body h1{font-weight:600!important;letter-spacing:0!important;}"
           % ui_font_stack(cfg))
    # loadFinished fires for every main-window page (reviewer included), so only touch
    # the congrats page — never a card's own fonts.
    return ("(function(){if(!/congrats/.test(location.pathname))return;"
            "var s=document.getElementById('__janki_congrats_font');"
            "if(!s){s=document.createElement('style');s.id='__janki_congrats_font';"
            "if(document.head)document.head.appendChild(s);}"
            "s.textContent=%s;})();" % json.dumps(css))


def _ensure_congrats_glass(*_):
    cfg = _cfg()
    if not GLASS or not cfg.get("enabled", True):
        return
    try:
        mw.web.eval(_congrats_glass_js(cfg))
        mw.web.eval(_congrats_font_js(cfg))
    except Exception:
        pass


# "Finished this deck for now": Space (or Enter) goes back to the deck list. Only on
# the congrats page; the listener is harmless elsewhere since it checks the URL.
_CONGRATS_KEYS_JS = (
    "(function(){if(window.__jkCongratsKeys)return;window.__jkCongratsKeys=true;"
    "document.addEventListener('keydown',function(e){"
    "if(!/congrats/.test(location.href))return;"
    "if(e.metaKey||e.ctrlKey||e.altKey)return;"
    "if(e.key!==' '&&e.key!=='Enter')return;"
    "var t=e.target;if(t&&(t.isContentEditable||/INPUT|TEXTAREA|SELECT|BUTTON|A/.test(t.tagName)))return;"
    "e.preventDefault();var f=window.pycmd||window.bridgeCommand;if(f){f('janki:sfx:back');f('janki:decks');}},true);})();")


def _congrats_keys(*_):
    try:
        if "congrats" in mw.web.url().toString():
            mw.web.eval(_CONGRATS_KEYS_JS)
            mw.web.eval(_PAD_NAV_JS)
            mw.web.setFocus()
    except Exception:
        pass


def _deck_gear_items(menu, did: int) -> None:
    """Extra items in each deck row's gear menu (Anki's Rename / Options / Export / Delete):
    Unsuspend all cards (deck + subdecks) / Create subdeck / Hide from deck list."""
    from aqt.utils import getOnlyText, tooltip
    col = mw.col
    if col is None:
        return
    d = col.decks.get(did, default=False)
    if not d:
        return
    name = d["name"]
    leaf = name.split("::")[-1]
    menu.addSeparator()

    dq = 'deck:"%s"' % name.replace('"', '\\"')
    try:                                     # anything suspended in the deck (+ subdecks)?
        any_susp = bool(col.find_cards(dq + " is:suspended"))
    except Exception:
        any_susp = True

    def _toggle_suspend():
        # nothing suspended → the item suspends everything instead (both undoable)
        from aqt.operations import CollectionOp
        q = dq + (" is:suspended" if any_susp else " -is:suspended")

        def op2(c):                          # remembers the count for the tooltip
            ids = c.find_cards(q)
            op2.n = len(ids)
            return c.sched.unsuspend_cards(ids) if any_susp else c.sched.suspend_cards(ids)
        op2.n = 0
        CollectionOp(parent=mw, op=op2).success(
            lambda _c: tooltip("%s %d card(s)." % ("Unsuspended" if any_susp else "Suspended",
                                                   op2.n))).run_in_background()

    def _subdeck():
        sub = getOnlyText("Name of the new subdeck under “%s”:" % name, parent=mw)
        sub = (sub or "").strip().strip(":")
        if sub:
            col.decks.id("%s::%s" % (name, sub))
            mw.deckBrowser.refresh()

    def _hide():
        from ..features import hidden_decks
        hidden_decks.set_hidden(did, True)
        from aqt.qt import QKeySequence
        undo = QKeySequence(QKeySequence.StandardKey.Undo).toString(
            QKeySequence.SequenceFormat.NativeText)
        tooltip("Hidden “%s”. %s to undo, or show it again from Browse → right-click the "
                "deck → Show in deck list." % (leaf, undo or "Undo"), period=4000)

    menu.addAction("%s all cards in “%s”" % ("Unsuspend" if any_susp else "Suspend", leaf)
                   ).triggered.connect(lambda _=False: _toggle_suspend())
    menu.addAction("Create subdeck…").triggered.connect(lambda _=False: _subdeck())
    menu.addAction("Hide from deck list").triggered.connect(lambda _=False: _hide())

def _calendar_showing():
    try:
        from ..features import calendar_view
        return bool(calendar_view._view)
    except Exception:
        return False


_TBKEEP = {"n": 0}     # pending "keyboard back to the toolbar" hand-off (janki:tbkeep)


def on_js_message(handled, message, context):
    if isinstance(message, str) and message.startswith("janki:perfraw:"):
        try:
            from ..util import perf_probe as _pp
            _pp._w("deck raw: " + message[len("janki:perfraw:"):])
        except Exception:
            pass
        return (True, None)
    if isinstance(message, str) and message.startswith("janki:perfkb:"):
        try:
            from ..util import perf_probe as _pp
            parts_ = message.split(":")[2:]
            h, f, n, els = parts_[:4]
            q = parts_[4] if len(parts_) > 4 else "?"
            kd = parts_[5] if len(parts_) > 5 else "?"
            drawn = parts_[6] if len(parts_) > 6 else "?"
            selrow = parts_[7] if len(parts_) > 7 else "?"
            nrows = parts_[8] if len(parts_) > 8 else "?"
            act = ":".join(parts_[9:]) if len(parts_) > 9 else "?"
            _pp._w("deck arrow: key→page %sms, handlers %sms, on screen %sms, animations %s, "
                   "elements %s, keydown@%s drawn@%s, selected row %s of %s rows, focus %s"
                   % (q, h, f, n, els, kd, drawn, selrow, nrows, act))
        except Exception:
            pass
        return (True, None)
    if message == "janki:update":
        try:
            from ..system import updater as _upd
            _upd.install_available()
        except Exception:
            pass
        return (True, None)
    if message == "janki:toolbar:practice":      # ↑ off the top of a practice question
        try:
            mw.toolbar.web.setFocus()
            mw.toolbar.web.eval("window.jkToolbarEnter&&window.jkToolbarEnter('janki_practice');")
        except Exception:
            pass
        return (True, None)
    if message == "janki:toolbar":
        try:
            mw.toolbar.web.setFocus()
            from ..features import practice as _pr, stats_embed as _se, calendar_view as _cv
            here = ("stats" if _se.is_open() else
                    "janki_practice" if getattr(_pr, "_practice_view", False) else
                    "janki_calendar" if getattr(_cv, "_view", False) else "decks")
            mw.toolbar.web.eval("window.jkToolbarEnter&&window.jkToolbarEnter(%r);" % here)
        except Exception:
            pass
        return (True, None)
    if message == "janki:gear":
        try:
            from ..features import settings_button as _sb
            b = _sb._btn
            if b is not None and b.isVisible():
                from aqt.qt import Qt as _Qt
                b.setFocus(_Qt.FocusReason.TabFocusReason)
            else:                                    # no gear → stay on the last item
                mw.toolbar.web.eval("window.jkToolbarEnter&&window.jkToolbarEnter('',true);")
        except Exception:
            pass
        return (True, None)
    if message == "janki:kbhere":
        _TBKEEP["n"] += 1          # keys used on the page: cancel the hand-back
        return (True, None)
    if message == "janki:deckfocus":
        _TBKEEP["n"] += 1          # cancels a pending hand-back to the toolbar
        try:
            from ..features import stats_embed as _se
            if _se.is_open() and _se._web is not None:
                _se._web.setFocus()                      # ↓ into Stats
            else:
                mw.web.setFocus()
                if getattr(mw, "state", None) == "deckBrowser":
                    mw.web.eval("window.jkDeckKbEnter&&window.jkDeckKbEnter();")
        except Exception:
            pass
        return (True, None)
    if isinstance(message, str) and message.startswith("janki:tbkeep:"):
        # Opened a page from the toolbar by keyboard: once it has taken over (and
        # grabbed focus), hand the keyboard back to the toolbar on the same item.
        tid = message.split(":", 2)[2]
        try:
            from aqt.qt import QTimer
            _TBKEEP["n"] += 1
            tok = _TBKEEP["n"]

            def _back():
                # ↓ into the page before this fired (janki:deckfocus bumps the token):
                # leave the keyboard there. Pulling it back to the toolbar made the next
                # ↓ re-enter on the first row — a back-and-forth on a quick ↓.
                if _TBKEEP["n"] != tok:
                    return
                try:
                    mw.toolbar.web.setFocus()
                    mw.toolbar.web.eval("window.jkToolbarEnter&&window.jkToolbarEnter(%r);"
                                        % tid)
                except Exception:
                    pass
            if tid in ("decks", "stats", "janki_practice"):   # pages, not dialogs
                QTimer.singleShot(450, _back)
        except Exception:
            pass
        return (True, None)
    if message == "janki:decks":
        try:
            mw.moveToState("deckBrowser")
        except Exception:
            pass
        return (True, None)
    return handled


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
