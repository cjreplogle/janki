"""AMBOSS webview frosting, narrow-hide, underlines, and diagnostics."""

import sys
from aqt import mw, gui_hooks
from aqt.qt import QColor, Qt, QTimer

from ..util.config import _cfg

# ---------------------------------------------------------------------------
# AMBOSS side-panel frost — the AMBOSS add-on (1044112126) embeds a WebView
# (AnkiWebView subclass) whose page background is painted the opaque Anki
# CANVAS colour → a solid white/dark slab that clashes with Janki's glass.
# We make that page transparent and inject a frost CSS that survives the
# AMBOSS SPA's re-renders, so the main window's vibrancy shows through.
# ---------------------------------------------------------------------------
_amboss_frost_timer = None
# Self-adapting frost: we can't know AMBOSS's SPA class names (and they change),
# so instead of a fixed selector list we walk the DOM and clear any element whose
# *computed* background colour is a near-white/near-canvas opaque slab. Runs on a
# rAF-debounced MutationObserver so it survives re-renders. Inspects only computed
# background colours — no page text is read or sent anywhere.
_AMBOSS_FROST_JS = (
    "(function(){var ID='__janki_amboss_frost';"
    "function base(){if(!document.documentElement)return;"
    "var s=document.getElementById(ID);"
    "if(!s){s=document.createElement('style');s.id=ID;"
    "(document.head||document.documentElement).appendChild(s);}"
    "s.textContent='html,body,#root,#app,#__next,main{background:transparent!important;"
    "background-color:transparent!important;}';}"
    "function light(bg){var m=bg&&bg.match(/rgba?\\(([^)]+)\\)/);if(!m)return false;"
    "var p=m[1].split(',');var r=parseFloat(p[0]),g=parseFloat(p[1]),b=parseFloat(p[2]),"
    "a=(p.length>3?parseFloat(p[3]):1);"
    "if(a<0.05)return false;"                 # already transparent
    "return (r>228&&g>228&&b>228);}"          # near-white opaque slab
    "function scan(){var els=document.querySelectorAll('body *');"
    "for(var i=0;i<els.length;i++){var el=els[i];if(el.id===ID)continue;"
    "if(el.getAttribute('data-jkf')==='1')continue;"
    "try{var bg=getComputedStyle(el).backgroundColor;"
    "if(light(bg)){el.style.setProperty('background-color','transparent','important');"
    "el.setAttribute('data-jkf','1');}}catch(e){}}}"
    "base();scan();"
    # Trailing 250ms debounce (was rAF = every frame) so a burst of inserts during
    # an AMBOSS preview coalesces into ONE scan instead of re-scanning the whole DOM
    # per animation frame. Observe childList only (NOT style/class) — attribute
    # mutations fire on every transition/hover/scroll tick, which was the lag; new
    # opaque slabs arrive as inserted nodes, and the 2s Python sweep is the backstop.
    "var pend=false;function sched(){if(pend)return;pend=true;"
    "setTimeout(function(){pend=false;if(!document.getElementById(ID))base();scan();},250);}"
    "try{if(window.__janki_amboss_obs)window.__janki_amboss_obs.disconnect();"
    "window.__janki_amboss_obs=new MutationObserver(sched);"
    "window.__janki_amboss_obs.observe(document.documentElement,"
    "{childList:true,subtree:true});"
    "}catch(e){}})();"
)


def _amboss_webviews():
    out = []
    try:
        from aqt.webview import AnkiWebView
    except Exception:
        return out
    try:
        children = mw.findChildren(AnkiWebView)
    except Exception:
        return out
    for w in children:
        try:
            mod = (type(w).__module__ or "")
            host = ""
            try:
                host = (w.url().host() or "").lower()
            except Exception:
                pass
            if mod.split(".")[0] == "1044112126" or "amboss" in host:
                out.append(w)
        except Exception:
            pass
    return out


def _frost_one_amboss(wv):
    # transparent Qt page background (kills the opaque CANVAS slab)
    try:
        wv.page().setBackgroundColor(QColor(0, 0, 0, 0))
    except Exception:
        pass
    # inject the frost CSS now
    def _inject():
        try:
            wv.eval(_AMBOSS_FROST_JS)
        except Exception:
            try:
                wv.page().runJavaScript(_AMBOSS_FROST_JS)
            except Exception:
                pass
    _inject()
    # re-inject on every navigation (SPA route change / reload) — connect once
    if not getattr(wv, "_janki_frost_hooked", False):
        try:
            wv.loadFinished.connect(lambda ok: _inject())
            wv._janki_frost_hooked = True
        except Exception:
            pass
    # the transparent web page reveals the Qt container widgets behind it — those
    # are the opaque white slabs. Make the webview widget + its parent chain
    # translucent so the main window's glass shows through.
    _frost_widget_chain(wv)


def _make_widget_transparent(w) -> None:
    """Force a Qt widget's background transparent by EVERY mechanism Qt paints
    with: the translucent-bg attribute, autoFillBackground off, a transparent
    PALETTE, and a scoped stylesheet. The palette is the key one — some AMBOSS
    containers paint their background via the palette Window/Base role, which a
    stylesheet `background: transparent` can't override, leaving the opaque
    'white box' slightly larger than the frosted webview in front of it."""
    try:
        from aqt.qt import QPalette, QColor
        w.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground, True)
        w.setAutoFillBackground(False)
        try:
            pal = w.palette()
            for _role in (QPalette.ColorRole.Window, QPalette.ColorRole.Base,
                          QPalette.ColorRole.Button):
                pal.setColor(_role, QColor(0, 0, 0, 0))
            w.setPalette(pal)
        except Exception:
            pass
        cur = w.styleSheet() or ""
        if "/*janki-frost*/" not in cur:
            # scope the rule to THIS widget only (objectName or class) so we
            # don't blanket child buttons/labels into invisibility
            nm = w.objectName()
            sel = ("#" + nm) if nm else type(w).__name__
            w.setStyleSheet(cur + "\n/*janki-frost*/ " + sel +
                            "{ background: transparent; background-color: transparent; }")
        w.update()
    except Exception:
        pass


def _frost_widget_chain(wv):
    try:
        from PyQt6.QtWidgets import QWidget
    except Exception:
        return
    # the webview widget itself + up to ~6 ancestors (pane → splitter → central)
    w = wv
    hops = 0
    while w is not None and hops < 7:
        _make_widget_transparent(w)
        # stop once we reach one of Anki's own containers (already glassed)
        try:
            if w is mw or w is getattr(mw, "centralWidget", lambda: None)():
                break
        except Exception:
            pass
        w = w.parentWidget()
        hops += 1


def _frost_amboss_navbar():
    # the AMBOSS side-panel nav bar is a themed QWidget painted a solid colour;
    # frost it by object name so its buttons/labels keep their own styling.
    try:
        from PyQt6.QtWidgets import QWidget
    except Exception:
        return
    for w in mw.findChildren(QWidget):
        try:
            nm = w.objectName() or ""
            if not nm.startswith("amboss"):
                continue
            if nm.endswith("webview"):
                continue   # webviews handled separately
            _make_widget_transparent(w)
        except Exception:
            pass


# The AMBOSS pop-up dictionary is a tippy.js tooltip injected into the REVIEWER
# webview (mw.web), not a Qt widget. Its white comes from tippy.css
# (.tippy-tooltip{background:#fff!important}) AND from <amboss-tooltip-content>,
# a web component with an OPEN shadow root. We beat the tippy !important via
# higher specificity, and inject a <style> into the shadow root (open → reachable)
# to turn the card into a translucent frosted panel. Text stays dark (#26323d) so
# we keep the panel light+blurred rather than transparent (dark-on-glass = unreadable).
_AMBOSS_TOOLTIP_JS = (
    "(function(){var SID='__janki_tippy_frost';"
    "function css(){if(document.getElementById(SID))return;"
    "var s=document.createElement('style');s.id=SID;"
    # single frosted surface lives on .tippy-content; the container above it and
    # everything inside the shadow root are fully transparent → no nested frame.
    # Frost the ACTUAL tooltip container. tippy v6 uses .tippy-box (older AMBOSS
    # used .tippy-tooltip) — cover both. The background is fairly opaque (0.92) so
    # text is readable even if CSS backdrop-filter doesn't render under the glass
    # patch's software compositing; the blur is a bonus where it does. .tippy-content
    # stays transparent so we get ONE frosted surface, not a nested box.
    # Keep the tippy container transparent — the visible text lives in the
    # <amboss-tooltip-content> shadow host, and frosting .tippy-box left the haze
    # offset below the text. The frost goes on :host instead (see shadow()).
    # AMBOSS bundles tippy v5 (popper 1.16.1), so the light surface is
    # `.tippy-tooltip.light-theme`, whose light box-shadow glow + white bg (specificity
    # 0,2,0) beat a plain .tippy-tooltip and showed as a light ring OUTSIDE our dark
    # :host panel. Kill its box-shadow/filter/background and the white arrow, and zero
    # .tippy-content padding. v6 `.tippy-box` selectors are kept as a harmless fallback.
    "s.textContent='.tippy-tooltip,.tippy-tooltip.light-theme,.tippy-box,"
    ".tippy-box[data-theme~=light],.tippy-box[data-theme~=amboss]{"
    "background:transparent!important;background-color:transparent!important;"
    "border:0!important;box-shadow:none!important;filter:none!important;}"
    ".tippy-tooltip .tippy-content,.tippy-tooltip.light-theme .tippy-content,"
    ".tippy-box .tippy-content{background:transparent!important;"
    "background-color:transparent!important;padding:0!important;color:#ededed!important;}"
    ".tippy-tooltip.light-theme .tippy-backdrop,.tippy-backdrop{"
    "background:transparent!important;background-color:transparent!important;}"
    ".tippy-tooltip.light-theme[x-placement^=top] .tippy-arrow{border-top-color:rgba(28,28,30,.92)!important;}"
    ".tippy-tooltip.light-theme[x-placement^=bottom] .tippy-arrow{border-bottom-color:rgba(28,28,30,.92)!important;}"
    ".tippy-tooltip.light-theme[x-placement^=left] .tippy-arrow{border-left-color:rgba(28,28,30,.92)!important;}"
    ".tippy-tooltip.light-theme[x-placement^=right] .tippy-arrow{border-right-color:rgba(28,28,30,.92)!important;}"
    ".tippy-box .tippy-arrow,.tippy-arrow{color:rgba(28,28,30,.92)!important;}';"
    "(document.head||document.documentElement).appendChild(s);}"
    "function shadow(el){try{var r=el.shadowRoot;if(!r)return;"
    "function inj(){if(r.querySelector('#__janki_shadow_frost'))return;"
    "var st=document.createElement('style');st.id='__janki_shadow_frost';"
    "st.textContent='*{background-color:transparent!important;color:#ededed!important;'+"
    "'border-color:transparent!important;outline:none!important;box-shadow:none!important;}'+"
    # NOTE: backdrop-filter (blur of content behind) needs GPU compositing, but the
    # launcher runs with --disable-gpu (required for the window glass), so Chromium
    # drops it. We keep it as best-effort (activates if a GPU build is ever used) and
    # rely on a mostly-opaque frosted-dark panel for readability meanwhile.
    "':host{display:block!important;background:rgba(28,28,30,.88)!important;"
    "color:#ededed!important;border:1px solid rgba(255,255,255,.08)!important;"
    "border-radius:14px!important;padding:16px 20px!important;"
    "box-shadow:0 10px 32px rgba(0,0,0,.5)!important;"
    "-webkit-backdrop-filter:blur(30px) saturate(160%);"
    "backdrop-filter:blur(30px) saturate(160%);}';"
    "r.appendChild(st);}"
    "inj();"
    # AMBOSS re-sets shadowRoot.innerHTML when the tooltip loads its real content
    # (spinner -> card), which wipes our injected <style> and re-adds the template's
    # own `.amboss-card{background:white}` (the second/inner box). The light-DOM
    # observer can't see shadow-internal mutations, so watch the shadow root itself
    # and re-inject whenever our style is gone.
    "if(!el.__jkso){el.__jkso=new MutationObserver(inj);el.__jkso.observe(r,{childList:true});}"
    "}catch(e){}}"
    # The tippy wrapper chain (popper root / .tippy-box / .tippy-tooltip / content)
    # paints its own box — a second panel around our frosted :host. Rather than chase
    # tippy's version-specific class names, walk up from each tooltip host and force
    # every ancestor transparent with no border/shadow/padding, so only the :host
    # panel remains. Inline !important beats any AMBOSS/tippy stylesheet.
    "function ancestors(el){var p=el.parentNode,n=0;"
    "while(p&&p.nodeType===1&&n<6){var tn=(p.tagName||'').toLowerCase();"
    "if(tn==='body'||tn==='html')break;"
    "p.style.setProperty('background','transparent','important');"
    "p.style.setProperty('background-color','transparent','important');"
    "p.style.setProperty('border','0','important');"
    "p.style.setProperty('box-shadow','none','important');"
    "p.style.setProperty('filter','none','important');"
    "p.style.setProperty('padding','0','important');"
    "p=p.parentNode;n++;}}"
    "function all(){css();var e=document.querySelectorAll('amboss-tooltip-content');"
    "for(var i=0;i<e.length;i++){shadow(e[i]);ancestors(e[i]);}}"
    "all();try{if(!window.__janki_tippy_obs){window.__janki_tippy_obs="
    "new MutationObserver(all);window.__janki_tippy_obs.observe("
    "document.documentElement,{childList:true,subtree:true});}}catch(e){}})();"
)


# Undo the tooltip frost: drop the injected <style>, disconnect the observer, and
# strip the shadow-root styles so AMBOSS's native tippy tooltip is fully restored
# (used when amboss_tooltip_frost is off — some tippy configs flicker on/off when
# we alter the tooltip geometry/stacking, so this lets the frost be turned off).
_AMBOSS_TOOLTIP_OFF_JS = (
    "(function(){var s=document.getElementById('__janki_tippy_frost');if(s)s.remove();"
    "try{if(window.__janki_tippy_obs){window.__janki_tippy_obs.disconnect();"
    "window.__janki_tippy_obs=null;}}catch(e){}"
    "try{var e=document.querySelectorAll('amboss-tooltip-content');"
    "for(var i=0;i<e.length;i++){var r=e[i].shadowRoot;if(r){"
    "var st=r.querySelector('#__janki_shadow_frost');if(st)st.remove();}}}catch(e){}})();"
)


def _frost_amboss_tooltip():
    w = getattr(mw, "web", None)
    if w is None:
        return
    js = (_AMBOSS_TOOLTIP_JS if bool(_cfg().get("amboss_tooltip_frost", True))
          else _AMBOSS_TOOLTIP_OFF_JS)
    try:
        w.eval(js)
    except Exception:
        try:
            w.page().runJavaScript(js)
        except Exception:
            pass


# ---------------------------------------------------------------------------
# A narrow window clips AMBOSS hover previews. Rather than resize the window
# (the user doesn't want it physically popping out), just SUPPRESS the preview
# while the reviewer is too narrow to show it properly: inject a CSS media query
# that hides the tooltip below preview_min_window_width. It's purely reactive —
# no polling, no window changes — so when the window is wide enough previews come
# back on their own.
# ---------------------------------------------------------------------------
def _amboss_narrow_hide_js(min_w):
    return (
        "(function(){var SID='__janki_tip_narrow';var s=document.getElementById(SID);"
        "if(!s){s=document.createElement('style');s.id=SID;"
        "(document.head||document.documentElement).appendChild(s);}"
        "s.textContent='@media (max-width:" + str(int(min_w) - 1) + "px){"
        ".tippy-popper,.tippy-box,.tippy-tooltip,amboss-tooltip-content{"
        "display:none!important;visibility:hidden!important;opacity:0!important;"
        "pointer-events:none!important;}}';})()"
    )


def _apply_amboss_narrow_hide():
    """DISABLED. This used to hide AMBOSS hover tooltips when the reviewer webview
    was narrower than preview_min_window_width — but with the AMBOSS panel open the
    reviewer is routinely < 900px, so tooltips vanished on the question side (the
    rule was applied only on question renders) and came back on reveal. That was
    more annoying than the overflow it guarded against, so now we do the opposite:
    actively remove any leftover hide rule so tooltips always show."""
    web = getattr(mw, "web", None)
    if web is None:
        return
    js = ("(function(){var s=document.getElementById('__janki_tip_narrow');"
          "if(s)s.remove();})()")
    try:
        web.eval(js)
    except Exception:
        try:
            web.page().runJavaScript(js)
        except Exception:
            pass


# ---------------------------------------------------------------------------
# AMBOSS term underlines (border-bottom on `span.amboss-marker`, from the AMBOSS
# add-on's reviewer.py) are shown in ALL modes — fullscreen and windowed. We just
# make sure any leftover hide-style from a previous version is removed.
# ---------------------------------------------------------------------------
_AMBOSS_UL_SHOW_JS = (
    "(function(){var s=document.getElementById('__janki_amboss_ul');"
    "if(s)s.remove();})()"
)


def _apply_amboss_underlines():
    """Show AMBOSS term underlines in every mode (windowed + fullscreen)."""
    web = getattr(mw, "web", None)
    if web is None:
        return
    try:
        web.eval(_AMBOSS_UL_SHOW_JS)
    except Exception:
        pass


def _start_amboss_size_watch():
    if not _cfg().get("amboss_frost", True):
        return
    _apply_amboss_narrow_hide()


def _stop_amboss_size_watch():
    return


_AMBOSS_DIAG_JS = (
    "(function(){var host=location.host;"
    "var ifr=document.querySelectorAll('iframe').length;"
    "var all=document.querySelectorAll('body *').length;"
    "var sh=0,e=document.querySelectorAll('*');"
    "for(var i=0;i<e.length;i++){if(e[i].shadowRoot)sh++;}"
    "var white=0,els=document.querySelectorAll('body *');"
    "for(var i=0;i<els.length;i++){var bg=getComputedStyle(els[i]).backgroundColor;"
    "var m=bg&&bg.match(/rgba?\\(([^)]+)\\)/);if(m){var p=m[1].split(',');"
    "if(parseFloat(p[0])>228&&parseFloat(p[1])>228&&parseFloat(p[2])>228&&"
    "(p.length<4||parseFloat(p[3])>0.05))white++;}}"
    "var inj=document.getElementById('__janki_amboss_frost')?1:0;"
    "return host+' | iframes='+ifr+' | bodyEls='+all+' | shadowRoots='+sh+"
    "' | whiteSlabs='+white+' | styleInjected='+inj;})()"
)


def _amboss_diagnose() -> None:
    from aqt.utils import showInfo
    wvs = _amboss_webviews()
    if not wvs:
        showInfo("AMBOSS frost: 0 matching webviews found.\n"
                 "Open the AMBOSS panel first (so its webview exists), then run this again.")
        return
    results = [None] * len(wvs)
    remaining = {"n": len(wvs)}

    def _finish():
        lines = [f"AMBOSS frost diagnose — {len(wvs)} matching webviews:\n"]
        for i, wv in enumerate(wvs):
            try:
                pgbg = wv.page().backgroundColor().name(QColor.NameFormat.HexArgb)
            except Exception:
                pgbg = "?"
            try:
                on = wv.objectName() or "(no name)"
            except Exception:
                on = "?"
            try:
                vis = wv.isVisible()
                sz = f"{wv.width()}x{wv.height()}"
            except Exception:
                vis, sz = "?", "?"
            lines.append(f"[{i}] name={on} vis={vis} size={sz} qtbg={pgbg}\n"
                         f"     {results[i]}")
        showInfo("\n".join(lines))

    def _mk(i, wv):
        def _cb(res):
            results[i] = res
            remaining["n"] -= 1
            if remaining["n"] == 0:
                _finish()
        try:
            wv.page().runJavaScript(_AMBOSS_DIAG_JS, _cb)
        except Exception as exc:
            results[i] = f"JS eval failed: {exc}"
            remaining["n"] -= 1
            if remaining["n"] == 0:
                _finish()
    for i, wv in enumerate(wvs):
        _mk(i, wv)


def _apply_amboss_frost(on: bool) -> None:
    # Widget/navbar frosting uses native macOS vibrancy — macOS only. (The
    # JS-based underline + narrow-hide helpers stay cross-platform.)
    if sys.platform != "darwin":
        return
    global _amboss_frost_timer
    if on:
        # scan periodically: the AMBOSS panel is created lazily when first opened,
        # so it may not exist at startup. Cheap findChildren sweep every ~2s.
        def _sweep():
            for w in _amboss_webviews():
                _frost_one_amboss(w)
            _frost_amboss_navbar()
            _frost_amboss_tooltip()   # the hover pop-up dictionary (reviewer webview)
        if _amboss_frost_timer is None:
            _amboss_frost_timer = QTimer(mw)
            _amboss_frost_timer.setInterval(2000)
            _amboss_frost_timer.timeout.connect(_sweep)
            _amboss_frost_timer.start()
            # also re-assert the tooltip patch each time a card renders (mw.web
            # re-documents), so the shadow-root style is present before first hover
            if hasattr(gui_hooks, "reviewer_did_show_question"):
                gui_hooks.reviewer_did_show_question.append(
                    lambda card: _frost_amboss_tooltip())
        _sweep()
    else:
        if _amboss_frost_timer is not None:
            _amboss_frost_timer.stop()
            _amboss_frost_timer = None


def _amboss_widget_trace() -> None:
    """Walk each AMBOSS webview's ancestor chain and report which widget paints
    opaque (palette Window colour + autoFillBackground + stylesheet bg). Reports
    only widget geometry/colour/class metadata — no page content."""
    from aqt.utils import showInfo
    try:
        from PyQt6.QtGui import QPalette
    except Exception:
        QPalette = None
    wvs = _amboss_webviews()
    if not wvs:
        showInfo("AMBOSS: 0 webviews. Open the panel first.")
        return
    lines = []
    for i, wv in enumerate(wvs):
        try:
            nm = wv.objectName() or "?"
        except Exception:
            nm = "?"
        lines.append(f"=== webview[{i}] {nm} ===")
        w = wv
        hops = 0
        while w is not None and hops < 9:
            try:
                cn = type(w).__name__
                on = w.objectName() or "-"
                aff = w.autoFillBackground()
                vis = w.isVisible()
                sz = f"{w.width()}x{w.height()}"
                win = "?"
                if QPalette is not None:
                    try:
                        win = w.palette().color(
                            QPalette.ColorRole.Window).name(QColor.NameFormat.HexArgb)
                    except Exception:
                        pass
                ss = (w.styleSheet() or "").replace("\n", " ")
                hasbg = "background" in ss.lower()
                mine = "janki-frost" in ss
                lines.append(f"  [{hops}] {cn}#{on} aff={aff} vis={vis} "
                             f"{sz} win={win} ss-bg={hasbg} frosted={mine}")
            except Exception as e:
                lines.append(f"  [{hops}] err {e}")
            try:
                if w is mw:
                    break
            except Exception:
                pass
            w = w.parentWidget()
            hops += 1
        lines.append("")

    # --- full inventory: every webview + every top-level window, VISIBLE ones
    #     first, so the actual on-screen white surface is easy to spot ---------
    try:
        from aqt.webview import AnkiWebView
        from PyQt6.QtWidgets import QApplication
        from PyQt6.QtWebEngineWidgets import QWebEngineView
    except Exception:
        AnkiWebView = QApplication = QWebEngineView = None
    if AnkiWebView is not None:
        lines.append("=== ALL webviews (visible first) ===")
        allwv = []
        try:
            allwv = mw.findChildren(QWebEngineView)
        except Exception:
            try:
                allwv = mw.findChildren(AnkiWebView)
            except Exception:
                allwv = []
        rows = []
        for w in allwv:
            try:
                rows.append((w.isVisible(), type(w).__name__, w.objectName() or "-",
                             w.width(), w.height()))
            except Exception:
                pass
        for vis, cn, on, ww, hh in sorted(rows, key=lambda r: (not r[0])):
            lines.append(f"  vis={vis} {cn}#{on} {ww}x{hh}")
        lines.append("")
        lines.append("=== top-level windows ===")
        try:
            for tw in QApplication.topLevelWidgets():
                try:
                    if not tw.isVisible():
                        continue
                    lines.append(f"  {type(tw).__name__}#{tw.objectName() or '-'} "
                                 f"{tw.width()}x{tw.height()} "
                                 f"title={tw.windowTitle()!r}")
                except Exception:
                    pass
        except Exception:
            pass
    showInfo("\n".join(lines))
