"""Focus mode, cursor auto-hide, card zoom, and app-focus tracking."""

import sys
from ctypes import c_bool
from aqt import mw
from aqt.qt import Qt, QTimer

from ..util.bridge import _bridge
from ..util.config import _cfg, _cfg_raw, log
from ..util import state
from . import card_timer
from ..util import keytap

# ---------------------------------------------------------------------------
# Auto-hide cursor after idle in fullscreen
# ---------------------------------------------------------------------------
_cursor_timer = None
_cursor_last_pos = None
_cursor_idle_s = 0.0
_cursor_hidden = False
_CURSOR_HIDE_S = 10.0     # idle seconds before hiding
_CURSOR_TICK_MS = 500


def _cursor_hide() -> None:
    """Hide the cursor with a persistent, balanced [NSCursor hide] (unlike
    setHiddenUntilMouseMoves:, which QtWebEngine's constant cursor-set calls on
    repaint immediately cancel). Must be balanced 1:1 with _cursor_show()."""
    global _cursor_hidden
    if _cursor_hidden:
        return
    if sys.platform.startswith("win"):
        try:
            from PyQt6.QtWidgets import QApplication
            from PyQt6.QtCore import Qt as _Qt
            QApplication.setOverrideCursor(_Qt.CursorShape.BlankCursor)
            _cursor_hidden = True
        except Exception:
            pass
        return
    try:
        msg, cls = _bridge()
        msg(None, cls(b"NSCursor"), b"hide")
        _cursor_hidden = True
    except Exception:
        pass


def _cursor_show() -> None:
    """Undo _cursor_hide() (balanced unhide)."""
    global _cursor_hidden
    if not _cursor_hidden:
        return
    if sys.platform.startswith("win"):
        try:
            from PyQt6.QtWidgets import QApplication
            QApplication.restoreOverrideCursor()
        except Exception:
            pass
        _cursor_hidden = False
        return
    try:
        msg, cls = _bridge()
        msg(None, cls(b"NSCursor"), b"unhide")
    except Exception:
        pass
    _cursor_hidden = False


def _cursor_tick():
    global _cursor_last_pos, _cursor_idle_s
    try:
        from PyQt6.QtGui import QCursor
        pos = QCursor.pos()
    except Exception:
        return
    if pos != _cursor_last_pos:
        _cursor_last_pos = pos
        _cursor_idle_s = 0.0
        _cursor_show()          # reveal on any movement
        # NOTE: focus-mode chrome is deliberately NOT restored on move — it
        # "stays hidden" until Focus Mode is toggled off (Tab+F).
        return
    # Idle: accumulate regardless of window state (Focus Mode works windowed too).
    _cursor_idle_s += _CURSOR_TICK_MS / 1000.0
    try:
        fs = mw.isFullScreen()
    except Exception:
        fs = False
    # Hide the cursor after idle when the screen is meant to be distraction-free:
    # OS fullscreen OR Focus Mode engaged (which is often just a maximized window).
    hide_ctx = fs or _focus_mode_on
    if hide_ctx and _cursor_idle_s >= _CURSOR_HIDE_S:
        _cursor_hide()
    elif not hide_ctx:
        _cursor_show()          # never leave it stuck hidden outside those contexts
    # Focus Mode: after the same idle delay, hide the toolbar + bottom bar so only
    # the note-card text remains — works in ANY window state. Stays hidden until
    # Tab+F toggles it off.
    if (_focus_mode_on and not _focus_hidden
            and _cursor_idle_s >= _CURSOR_HIDE_S
            and getattr(mw, "state", None) == "review"):
        _focus_set_hidden(True)
    # Enforce chrome-hidden every tick while engaged — Anki re-shows the top toolbar
    # on card renders, and this timer can't be missed the way a render hook can.
    if _focus_hidden and getattr(mw, "state", None) == "review":
        reassert_chrome_hidden()


def _start_cursor_hide():
    global _cursor_timer
    if (sys.platform != "darwin" and not sys.platform.startswith("win")) or _cursor_timer is not None:
        return
    _cursor_timer = QTimer(mw)  # parented so Qt manages its lifetime
    _cursor_timer.setInterval(_CURSOR_TICK_MS)
    _cursor_timer.timeout.connect(_cursor_tick)
    _cursor_timer.start()


def _track_app_focus():
    """Keep _anki_focused in sync with whether Anki is the frontmost app, so the
    global key tap only reads a plain Space while Anki is focused (Tab+Space still
    overrides when unfocused)."""
    try:
        def _on_state(app_state):
            # NB: param is app_state, NOT state — `state` is the shared-flags
            # module (from . import state); a param named `state` would shadow it
            # so this assignment would never reach state._anki_focused.
            state._anki_focused = (app_state == Qt.ApplicationState.ApplicationActive)
        mw.app.applicationStateChanged.connect(_on_state)
        _track_app_focus._ref = _on_state   # keep the slot alive

        def _on_win(win):
            try:
                state._mw_active = win is None or win is mw.windowHandle()
            except Exception:
                state._mw_active = True
        mw.app.focusWindowChanged.connect(_on_win)
        _track_app_focus._ref2 = _on_win
        state._anki_focused = (mw.app.applicationState() == Qt.ApplicationState.ApplicationActive)
    except Exception:
        pass


# ---------------------------------------------------------------------------
# Focus Mode — hide toolbar + bottom bar so only the note-card text remains.
# Engages like the cursor auto-hide (after _CURSOR_HIDE_S of mouse idle while
# reviewing in fullscreen) and stays hidden until toggled off with Tab+F.
# ---------------------------------------------------------------------------
_focus_mode_on = False
_focus_hidden = False   # whether the chrome is currently hidden

# CSS applied to the reviewer webview while Focus Mode is engaged: hide the card
# tags and SAFE-CENTER the card vertically. A flex column with margin:auto on #qa
# centres a short card, but when the card is taller than the viewport the auto margins
# collapse and it aligns to the TOP and scrolls — so tall content is never clipped
# (the old top-clip that forced plain block layout is now fixed at the native layer:
# the toolbar band is reclaimed, so flex centring is safe again).
_FOCUS_CSS = (
    "#tags-container{display:none!important;}"
    "html{height:100%!important;}"
    "body{min-height:100%!important;box-sizing:border-box!important;"
    "display:flex!important;flex-direction:column!important;"
    # top/bottom only: "padding:12px 0" also zeroed the SIDES, and practice cards take
    # their side padding from body.card — at narrow widths their text hit the edges.
    "padding-top:12px!important;padding-bottom:12px!important;"
    "overflow-y:auto!important;}"
    "#qa{margin-top:auto!important;margin-bottom:auto!important;}"
    # The answer bar is hidden here, so lift the bottom-left controls (reword toggle,
    # practice slide button) off the very edge of the screen.
    "#jk-rw-bar,#jk-pq-bar,body .jp-slide-btn{bottom:14px!important;}"
)
if sys.platform.startswith("win"):
    # The frameless window keeps its 14px grab strip above the card in Focus Mode, so
    # centring inside the web view put the card half that below the window's centre.
    # Extra bottom padding (= the strip) centres it on the WINDOW instead.
    _FOCUS_CSS += "body{padding-bottom:26px!important;}"


def _focus_chrome():
    """The webviews Focus Mode hides: top toolbar and bottom answer bar."""
    return [getattr(mw, "toolbarWeb", None), getattr(mw, "bottomWeb", None)]


_FOCUS_ANIM_MS = 220        # card slide duration
_FOCUS_FADE_MS = 220        # chrome fade/slide out (the hide waits for it)
_FOCUS_IN_MS = 370          # chrome fade/slide back in (matches the Calendar entry)


def _fade_chrome(wv, visible: bool) -> None:
    """Fade + slide a chrome webview's content (the top bar up / the bottom bar down)
    by animating its <body> in the page — the same motion as a review started from the
    Calendar. (QGraphicsOpacityEffect renders black on QWebEngineView/macOS, so it's
    done inside the page; height is toggled instantly by the caller — GPU-cheap, no
    per-frame relayout.)"""
    dy = "-6px" if wv is getattr(mw, "toolbarWeb", None) else "6px"
    try:
        if visible:
            wv.eval("(function(){var b=document.body;if(!b)return;"
                    "if(b._jkA)b._jkA.cancel();b.style.opacity='';b.style.transform='';"
                    "if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)')"
                    ".matches)return;"
                    "b._jkA=b.animate([{opacity:0,transform:'translateY(" + dy + ")'},"
                    "{opacity:1,transform:'none'}],{duration:" + str(_FOCUS_IN_MS) + ","
                    "easing:'cubic-bezier(.2,.8,.2,1)'});})()")
        else:
            wv.eval("(function(){var b=document.body;if(!b)return;"
                    "if(b._jkA)b._jkA.cancel();"
                    "b._jkA=b.animate([{opacity:1,transform:'none'},"
                    "{opacity:0,transform:'translateY(" + dy + ")'}],"
                    "{duration:" + str(_FOCUS_FADE_MS) + ",easing:'cubic-bezier(.4,0,.6,1)',"
                    "fill:'forwards'});})()")
    except Exception:
        pass


def _focus_apply_card(hidden: bool, offset_px: int = 0, pre: str = "") -> None:
    """Toggle the centre/tags CSS on the current card, wrapped in a FLIP so the card
    GLIDES between top-aligned and centred (measure top before+after, animate the
    delta via the Web Animations API — GPU transform, no reflow). offset_px folds in
    the instant vertical jump from the toolbar's height being toggled, so the card
    appears to start where it was and slides to its new home in one motion."""
    web = getattr(mw, "web", None)
    if web is None:
        return
    import json as _json
    mutate = (
        "var s=document.getElementById('__janki_focus');"
        "if(!s){s=document.createElement('style');s.id='__janki_focus';"
        "(document.head||document.documentElement).appendChild(s);}"
        "s.textContent=" + _json.dumps(_FOCUS_CSS) + ";"
    ) if hidden else (
        "var s=document.getElementById('__janki_focus');if(s)s.remove();"
    )
    js = (
        "(function(){var el=document.getElementById('qa')"
        "||document.body.firstElementChild;if(!el){" + (pre or "") + mutate + "return;}"
        "var first=el.getBoundingClientRect().top;"
        # every other layout change of the toggle runs HERE, in the same task, so the
        # browser can't paint an in-between frame (that was the jump)
        + mutate
        + ("try{(function(){" + pre + "})();}catch(_){}" if pre else "") +
        "var last=el.getBoundingClientRect().top;"
        "var dy=(first-last)+(" + str(int(offset_px)) + ");"
        "if(!dy)return;"
        "try{el.animate([{transform:'translateY('+dy+'px)'},"
        "{transform:'translateY(0)'}],"
        "{duration:" + str(_FOCUS_ANIM_MS) + ",easing:'cubic-bezier(0.645,0.045,0.355,1)'});}"
        "catch(e){}})()"
    )
    try:
        web.eval(js)
    except Exception:
        pass


_frozen = {"on": False}
_transition = {"on": False}


def _set_transition(on: bool) -> None:
    _transition["on"] = on
    if on:
        QTimer.singleShot(1000, lambda: _transition.update(on=False))   # safety



_appkit = {"lib": None}


def _screen_updates(enable: bool) -> None:
    """Hold / release ALL of this app's on-screen updates (NSDisable/EnableScreenUpdates).
    Qt's setUpdatesEnabled didn't cover the web view (Chromium draws it on its own), so
    the stale frame still showed. Deprecated by Apple but functional; the system also
    re-enables updates by itself after ~1 s, so it can never stick."""
    if sys.platform != "darwin":
        return
    import ctypes
    if _appkit["lib"] is None:
        _appkit["lib"] = ctypes.CDLL("/System/Library/Frameworks/AppKit.framework/AppKit")
    fn = _appkit["lib"].NSEnableScreenUpdates if enable else _appkit["lib"].NSDisableScreenUpdates
    fn.restype = None
    fn()


def _freeze(on: bool, exiting: bool = False) -> None:
    """Stop the main window repainting while the bars collapse/restore: Qt would show
    the web view's OLD frame at its NEW position for a frame (the flicker). Frozen, the
    screen keeps the last correct frame until the page has drawn at its new size with
    the card held in place (janki:focus:thaw), or 200 ms at most."""
    try:
        if on:
            # off by default: un-freezing repaints the whole glass window, which can
            # itself show one empty frame; the jump was the re-hide race (fixed)
            # "exit" (default): only when the bars come BACK — the card area shifts
            # down and Qt shows its old frame lower for one frame (seen in a 60 fps
            # recording); entering doesn't need it. True = both ways, False = never.
            mode = _cfg().get("focus_freeze", False)   # neither Qt nor AppKit could hold the web view's frame
            if not (mode is True or (mode == "exit" and exiting)):
                return
            if not _frozen["on"]:
                _frozen["on"] = True
                _screen_updates(False)
                QTimer.singleShot(200, lambda: _freeze(False))
        elif _frozen["on"]:
            _frozen["on"] = False
            _screen_updates(True)
    except Exception:
        _frozen["on"] = False
        try:
            _screen_updates(True)
        except Exception:
            pass


def on_js_message(handled, message, context):
    if isinstance(message, str) and message.startswith("janki:focus:thaw"):
        _freeze(False)
        return (True, None)
    return handled


def _focus_flip_around(hidden: bool, offset_px: int, pre: str, collapse) -> None:
    """Jitter-free Focus toggle. Hiding/showing the bars RESIZES mw.web, and the page
    only gets that resize a frame or two after Qt moves the view. Measuring + applying
    the new layout before then (and re-centring after) made the text jump twice. So:
      1. record the card's position (and the viewport size) in the page,
      2. THEN collapse / restore the bars (in the callback — guaranteed order),
      3. apply the Focus CSS + FLIP slide when the page's resize actually lands
         (or at once if it already has; a 250 ms fallback if it never comes)."""
    web = getattr(mw, "web", None)
    if web is None:
        collapse()
        return
    import json as _json
    mutate = (
        "var s=document.getElementById('__janki_focus');"
        "if(!s){s=document.createElement('style');s.id='__janki_focus';"
        "(document.head||document.documentElement).appendChild(s);}"
        "s.textContent=" + _json.dumps(_FOCUS_CSS) + ";"
    ) if hidden else (
        "var s=document.getElementById('__janki_focus');if(s)s.remove();"
    )
    arm = ("(function(){var el=document.getElementById('qa')||document.body.firstElementChild;"
           "window.__jkFlip={first:el?el.getBoundingClientRect().top:null,"
           "h:window.innerHeight};return 1;})()")
    apply = (
        "(function(){var P=window.__jkFlip||{first:null,h:-1};var t=null;"
        "function go(){if(go.done)return;go.done=1;"
        "window.removeEventListener('resize',go);if(t)clearTimeout(t);"
        "var el=document.getElementById('qa')||document.body.firstElementChild;"
        # the Focus CSS FIRST, then the trim/anchor script in ITS OWN function: its
        # early `return`s (e.g. a plain text card) used to skip the centring CSS, so
        # the card stayed at the top until a later pass centred it (the jump)
        + mutate + "try{(function(){" + (pre or "") + "})();}catch(_){}" +
        "function thaw(){requestAnimationFrame(function(){requestAnimationFrame(function(){"
        "try{pycmd('janki:focus:thaw');}catch(e){}});});}"
        "if(!el||P.first==null){thaw();return;}"
        "var last=el.getBoundingClientRect().top;"
        "var dy=(P.first-last)+(window.__jkFlipOff||0);"
        "if(Math.abs(dy)>=1){"
        "try{el.animate([{transform:'translateY('+dy+'px)'},{transform:'translateY(0)'}],"
        "{duration:" + str(_FOCUS_ANIM_MS) + ",easing:'cubic-bezier(0.645,0.045,0.355,1)'});}"
        "catch(e){}}thaw();}"
        "if(window.innerHeight!==P.h)go();"
        "else{window.addEventListener('resize',go);t=setTimeout(go,250);}})()"
    )

    def after_arm(_r=None):
        # Compensate by how far the web view REALLY moved on screen (toolbar height
        # + the layout margin/spacing that Focus also zeroes), measured, not assumed:
        # the card keeps its exact global position, then glides.
        try:
            y0 = web.mapToGlobal(web.rect().topLeft()).y()
        except Exception:
            y0 = None
        _freeze(True, exiting=not hidden)   # hold the last correct frame (see _freeze)
        try:
            collapse()
        except Exception as e:
            log("focus collapse: %s" % e)
        off = int(offset_px)
        try:
            cw = mw.centralWidget()
            if cw is not None and cw.layout() is not None:
                cw.layout().activate()           # geometry settles now, synchronously
            if y0 is not None:
                off = y0 - web.mapToGlobal(web.rect().topLeft()).y()
        except Exception:
            pass
        try:
            web.eval("window.__jkFlipOff=%d;" % off + apply)
        except Exception:
            pass
    try:
        web.page().runJavaScript(arm, after_arm)
    except Exception:
        after_arm()


def reassert_chrome_hidden() -> None:
    """Re-hide the chrome if Focus Mode is engaged. Anki RE-SHOWS the top toolbar
    (toolbarWeb) on every card render, which pushes mw.web down by the toolbar's
    height — its faded-transparent 50px band became the 'dead space at the top the
    card can't go over' (web inWin y=50, toolbarWeb vis=True h=50 while
    focus_hidden=True). Called from the per-render hooks so the
    toolbar stays hidden card-to-card. Cheap and idempotent: no-op unless a chrome
    view is actually visible, so it won't fight the fade animation on toggle."""
    if not _focus_hidden or state._pomo_on_break or _transition["on"]:
        return          # (mid-toggle: the animated collapse owns the bars — an instant
                        # collapse from the tick here was the jump on most toggles)
    # Top toolbar: pin height to 0 (deterministic — Anki re-shows it per render and
    # plain hide() lost that race). Bottom bar: hide() is enough (its slot is at the
    # bottom, so it never creates a top band, and clamping BOTH corrupted the layout).
    _clamp_toolbar(True)
    bw = getattr(mw, "bottomWeb", None)
    if bw is not None:
        try:
            if bw.isVisible():
                bw.hide()
        except Exception:
            pass
    _reclaim_central_layout()


def set_slide_topbar_hidden(hidden: bool) -> None:
    """Hide ONLY the top toolbar while the full-window slide overlay is open, so the
    slide reaches the very TOP of the window ('app contents above it' was the top
    toolbar). The bottom grade bar stays visible for self-grading. Re-asserted per
    render because the slide re-sends janki-slide:1 on each card. On close, restore
    the toolbar unless Focus Mode wants it hidden anyway."""
    tb = getattr(mw, "toolbarWeb", None)
    if tb is None:
        return
    try:
        if hidden:
            _clamp_toolbar(True)     # 0-height band so the slide reaches the top edge
            _reclaim_central_layout()
        else:
            if _focus_hidden:
                return          # Focus Mode keeps the toolbar hidden regardless
            _clamp_toolbar(False)
            _reclaim_central_layout()
    except Exception:
        pass


# --- Focus-Mode card layout (trim + averaged vertical positioning) --------------
# Baseline: Focus Mode centres the whole #qa box (margin:auto). Two problems that this
# fixes:
#   1) Trailing dead space inside #qa (a dangling <hr>, empty <br>s, empty #pic div)
#      makes the box taller than the visible text, so the text rides high. We hide the
#      trailing empties (tagged data-janki-trim, reversible) so the box wraps content.
#   2) A photo BELOW the text still makes the text ride high when the whole block is
#      centred. Per the user's spec, position the card at the AVERAGE of the two
#      centres: where the TEXT alone would centre, and where ALL contents centre. That
#      is a downward nudge of (allBottom - textBottom)/4 from the all-centred baseline
#      (half-way toward text-centred), applied as a translateY on #qa. Clamped so it
#      never pushes content off-screen, and skipped when the block overflows the window.
_CORE_RESTORE = (
    "var qa=document.getElementById('qa');if(!qa)return;"
    "qa.querySelectorAll('[data-janki-trim]').forEach(function(e){"
    "e.style.removeProperty('display');e.removeAttribute('data-janki-trim');});"
    "qa.style.removeProperty('transform');"
)
_CORE_APPLY = (
    "var qa=document.getElementById('qa');if(!qa)return;"
    "qa.style.removeProperty('transform');"                  # reset before measuring
    # 1) trim trailing empties
    "var k=qa.children;for(var i=k.length-1;i>=0;i--){var el=k[i];"
    "var cs=getComputedStyle(el);"
    "if(cs.display==='none'||cs.position==='fixed'||cs.position==='absolute')continue;"
    "var t=el.tagName;"
    "var media=el.querySelector&&el.querySelector('img,svg,video,canvas,audio,iframe');"
    "var txt=(el.textContent||'').replace(/\\s+/g,'');"
    "if(t==='BR'||t==='HR'||(!txt&&!media&&t!=='IMG'&&t!=='SVG'&&t!=='CANVAS')){"
    "el.setAttribute('data-janki-trim','1');el.style.setProperty('display','none');}"
    "else break;}"
    # 2) collect the remaining in-flow children
    "var vis=[];for(var j=0;j<qa.children.length;j++){var c=qa.children[j];"
    "var s=getComputedStyle(c);"
    "if(s.display==='none'||s.position==='fixed'||s.position==='absolute')continue;"
    "var r0=c.getBoundingClientRect();"
    "if(r0.height<=0&&!(c.querySelector&&c.querySelector('img,svg,canvas,video')))continue;"
    "vis.push(c);}"
    "if(!vis.length)return;"
    "var allTop=vis[0].getBoundingClientRect().top;"
    "var allBot=vis[vis.length-1].getBoundingClientRect().bottom;"
    # textBottom = bottom of the last child that is NOT a media-only (image) element
    "var textBot=allBot;"
    "for(var m=vis.length-1;m>=0;m--){var c2=vis[m];"
    "var hasImg=c2.querySelector&&c2.querySelector('img,svg,canvas,video');"
    "var isImg=/^(IMG|SVG|CANVAS|VIDEO|PICTURE)$/.test(c2.tagName);"
    "var tx=(c2.textContent||'').replace(/\\s+/g,'');"
    "if((hasImg||isImg)&&!tx)continue;"                       # skip trailing media
    "textBot=c2.getBoundingClientRect().bottom;break;}"
    "var extra=allBot-textBot;if(extra<=1)return;"
    "var V=window.innerHeight;var Hall=allBot-allTop;"
    "var shift=extra/4;"                                      # half-way text↔all centre
    "var room=(V-Hall)/2;if(room<0)room=0;"                   # never push off-screen
    "if(shift>room)shift=room;if(shift<=0)return;"
    "var z=parseFloat(getComputedStyle(qa).zoom)||1;"         # #qa carries card zoom
    "qa.style.setProperty('transform','translateY('+(shift/z)+'px)');"
)

# Injected INTO the card HTML via card_will_show so it runs synchronously during render
# — BEFORE first paint — instead of a post-paint web.eval (which showed the padded
# layout for one frame, then reflowed: the flicker). Gated on window.__jankiFocus.
FOCUS_TRIM_SCRIPT = (
    "<script>(function(){try{if(!window.__jankiFocus)return;"
    + _CORE_APPLY + "}catch(_){}})();</script>"
)


def set_focus_flag() -> None:
    """Mirror _focus_hidden into a page global so the inline card_will_show script knows
    whether to run on the next card render (it executes before paint, so it can't call
    back into Python)."""
    web = getattr(mw, "web", None)
    if web is None:
        return
    try:
        web.eval("window.__jankiFocus=" + ("true" if _focus_hidden else "false") + ";")
    except Exception:
        pass


def trim_trailing_empties() -> None:
    """Apply (Focus on) or restore (Focus off) the trim + averaged positioning on the
    CURRENTLY shown card — used on toggle. Per-card navigation is handled pre-paint by
    the inline FOCUS_TRIM_SCRIPT, so this only needs to act on the live card."""
    web = getattr(mw, "web", None)
    if web is None:
        return
    core = _CORE_APPLY if _focus_hidden else _CORE_RESTORE
    try:
        web.eval("(function(){try{" + core + "}catch(_){}})()")
    except Exception:
        pass


def _focus_clear_anchor() -> None:
    """Drop the inline answer-anchor overrides so the card falls back to the
    stylesheet's `safe center` (used for questions, and on Focus Mode exit)."""
    web = getattr(mw, "web", None)
    if web is None:
        return
    try:
        web.eval("(function(){var b=document.body;if(!b)return;"
                 "b.style.removeProperty('justify-content');"
                 "b.style.removeProperty('padding-top');})()")
    except Exception:
        pass


def _focus_position_card() -> None:
    """No-op now that Focus Mode top-aligns the card (_FOCUS_CSS uses flex-start):
    the card starts at the top and the answer grows downward, so there's no flip
    shift to compensate for. Just clear any stale inline anchor from the old
    centred layout so it can't add unwanted top padding."""
    if not _focus_hidden:
        return
    _focus_clear_anchor()


def _reassert_web_focus() -> None:
    """Return keyboard focus to the reviewer webview after Focus Mode hides the
    chrome. Hiding toolbarWeb/bottomWeb (and poking the card-timer's native child
    windows) can knock keyboard focus off mw.web in fullscreen. When the webview
    isn't focused, Contanki's Gamepad API sees a NoFocus state and controller
    presses stop rating the card and start hitting its focus/Fullscreen bindings —
    which in a native-fullscreen Space bounces you back to the desktop. Re-focusing
    mw.web keeps the reviewer document focused so Contanki keeps working."""
    web = getattr(mw, "web", None)
    if web is None:
        return
    try:
        web.setFocus()
    except Exception:
        pass


_QWIDGETSIZE_MAX = 16777215


def _clamp_toolbar(collapse: bool) -> None:
    """Show/hide the top toolbar at the QWidget level to reclaim its 50px band.

    Anki's TopWebView.hide()/show() are FLAG-ONLY overrides (they just set
    self.hidden) — they never call QWidget.hide(), so a plain mw.toolbarWeb.hide()
    did NOTHING (that was the persistent 'dead band at the top': the toolbar stayed
    visible at inWin y=50). We call QWidget.hide()/show() DIRECTLY to bypass the
    override and actually collapse/restore the layout slot. The toolbar keeps its
    real fixed height throughout, so restore needs no height re-measurement — and
    because Anki's own re-show is flag-only, it can't fight a QWidget-level hide."""
    tb = getattr(mw, "toolbarWeb", None)
    if tb is None:
        return
    try:
        from aqt.qt import QWidget
        if collapse:
            if tb.isVisible():
                QWidget.hide(tb)
        else:
            if not tb.isVisible():
                QWidget.show(tb)
    except Exception:
        pass


def _set_central_margins(collapse: bool) -> None:
    """Zero the central layout's margins/spacing while Focus Mode hides the chrome, and
    restore the originals on exit. The hidden toolbar otherwise leaves a thin top strip/
    line (the layout's top margin + inter-widget spacing) that shows when the card
    scrolls under it."""
    try:
        cw = mw.centralWidget()
        lay = cw.layout() if cw is not None else None
        if lay is None:
            return
        if collapse:
            if not hasattr(lay, "_janki_margins"):
                m = lay.contentsMargins()
                lay._janki_margins = (m.left(), m.top(), m.right(), m.bottom())
                lay._janki_spacing = lay.spacing()
            # Frameless Windows window: keep the top grab strip (chrome.TOP_GAP) -
            # with the toolbar hidden it's the only place left to drag the window.
            top = 0
            if getattr(mw, "_jk_frameless", False):
                try:
                    from ..platform.win import chrome as _chrome
                    top = _chrome.TOP_GAP
                except Exception:
                    top = 0
            lay.setContentsMargins(0, top, 0, 0)
            lay.setSpacing(0)
        elif hasattr(lay, "_janki_margins"):
            lay.setContentsMargins(*lay._janki_margins)
            lay.setSpacing(lay._janki_spacing)
            del lay._janki_margins
    except Exception:
        pass


def _reclaim_central_layout() -> None:
    """Recompute the central widget's layout so a just-hidden (or just-shown) chrome
    webview's space is reclaimed/restored immediately — mw.web fills to the top edge
    with no leftover gap."""
    try:
        _set_central_margins(_focus_hidden)
        cw = mw.centralWidget()
        lay = cw.layout() if cw is not None else None
        if lay is not None:
            lay.invalidate()
            lay.activate()
        web = getattr(mw, "web", None)
        if web is not None:
            web.updateGeometry()
    except Exception:
        pass


_mask_win = None


def _mask_web(hold_ms: int = 40, fade_ms: int = 70) -> None:
    """Cover the reviewer with a snapshot of itself while the chrome collapses/restores.
    Moving the web view shows its OLD frame at the NEW position for a frame or two
    (the card visibly jumps before it starts gliding). The snapshot sits exactly where
    the card was, hides that stale frame, then fades out as the glide begins. A
    separate frameless top-level window — native web views draw over child widgets."""
    global _mask_win
    web = getattr(mw, "web", None)
    if web is None or not web.isVisible():
        return
    try:
        from aqt.qt import QLabel, QPropertyAnimation, QEasingCurve
        pm = web.grab()
        if pm.isNull():
            return
        old = _mask_win
        if old is not None:
            try:
                old.close()
            except Exception:
                pass
        w = QLabel(None, Qt.WindowType.FramelessWindowHint | Qt.WindowType.Tool
                   | Qt.WindowType.WindowDoesNotAcceptFocus
                   | Qt.WindowType.WindowTransparentForInput)
        w.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground, True)
        w.setAttribute(Qt.WidgetAttribute.WA_ShowWithoutActivating, True)
        w.setAttribute(Qt.WidgetAttribute.WA_DeleteOnClose, True)
        w.setPixmap(pm)
        tl = web.mapToGlobal(web.rect().topLeft())
        w.setGeometry(tl.x(), tl.y(), web.width(), web.height())
        w.show()
        try:
            from ..user import glass as _glass
            _glass.keep_dialog_in_front(w)
        except Exception:
            w.raise_()
        _mask_win = w

        def _fade():
            try:
                an = QPropertyAnimation(w, b"windowOpacity", w)
                an.setDuration(fade_ms)
                an.setStartValue(1.0)
                an.setEndValue(0.0)
                an.setEasingCurve(QEasingCurve.Type.OutCubic)
                an.finished.connect(w.close)
                w._jk_an = an
                an.start()
            except Exception:
                w.close()
        QTimer.singleShot(hold_ms, _fade)
        def _safety(win=w):
            try:
                if win.isVisible():
                    win.close()
            except RuntimeError:
                pass                             # already closed + deleted (normal)
        QTimer.singleShot(hold_ms + fade_ms + 400, _safety)
    except Exception as e:
        try:
            keytap._gtap_log(f"focus mask: {e}")
        except Exception:
            pass


def _focus_set_hidden(hidden: bool) -> None:
    global _focus_hidden
    # TEMP breadcrumb: log every Focus-Mode chrome change + who triggered it, so an
    # unexpected "lost focus" (chrome coming back) can be traced to its caller.
    try:
        from ..util import diagnostics
        diagnostics.flog("focus_set_hidden(%s) state=%s break=%s  by %s"
                         % (hidden, getattr(mw, "state", "?"),
                            state._pomo_on_break, diagnostics.caller_stack()))
    except Exception:
        pass
    # Set state FIRST so it can never get stuck (a stuck _focus_hidden=True leaves
    # the card permanently centred with the chrome back). Per-render CSS keys off it.
    _focus_hidden = hidden
    # During a Pomodoro break the card is hidden and the break overlay is centred
    # in mw.web. Hiding/showing the chrome resizes mw.web (the bottom answer bar is
    # taller than the top toolbar), which drifts the fixed break panel downward.
    # Defer the chrome change: record the intent now, apply it when the break ends
    # (_end_break re-asserts Focus Mode). The break panel stays put meanwhile.
    if state._pomo_on_break:
        return
    chrome = [w for w in _focus_chrome() if w is not None]
    tb = getattr(mw, "toolbarWeb", None)
    # Remember the toolbar height while it's visible — hiding it shifts mw.web (and
    # the card) up by that much instantly, which _focus_apply_card compensates for.
    if tb is not None and tb.height() > 0:
        tb._janki_full_h = tb.height()
    toolbar_h = int(getattr(tb, "_janki_full_h", 0) or 0) if tb is not None else 0

    if hidden:
        _set_transition(True)          # until the animated collapse has run
        # Fade the chrome out first (still occupying layout, so nothing reflows),
        # THEN collapse its height and slide the card to centre.
        for wv in chrome:
            _fade_chrome(wv, False)

        def _after_fade(off=toolbar_h):
            if not _focus_hidden:      # toggled back during the fade — abort
                return
            def _collapse():
                _set_transition(False)
                if not _focus_hidden:
                    return
                _clamp_toolbar(True)       # deterministic 0-height top band
                bw = getattr(mw, "bottomWeb", None)
                if bw is not None:
                    try:
                        bw.hide()
                    except Exception:
                        pass
                # Force the central layout to reclaim the space the hidden chrome
                # left, so mw.web fills to the very TOP (in fullscreen the vacated
                # strip could otherwise linger as an empty band).
                _reclaim_central_layout()
            # record → collapse → centre + slide once the page's resize lands
            _focus_flip_around(True, off, "window.__jankiFocus=true;" + _CORE_APPLY,
                               _collapse)
            _reassert_web_focus()  # keep the reviewer webview focused (see below)

            # re-assert the centring once everything has settled (slides only if the
            # card isn't already in place)
            def _settle():
                if not _focus_hidden:
                    return
                _reclaim_central_layout()
                _focus_apply_card(True, 0)
            QTimer.singleShot(450, _settle)
        QTimer.singleShot(_FOCUS_FADE_MS + 20, _after_fade)
    else:
        # Restore chrome height instantly (one reflow), slide the card to the top,
        # and fade the chrome back in over the top.
        def _restore():
            _clamp_toolbar(False)          # release the 0-height clamp on the toolbar
            bw = getattr(mw, "bottomWeb", None)
            if bw is not None:
                try:
                    bw.show()
                except Exception:
                    pass
            _reclaim_central_layout()
            for wv in chrome:
                _fade_chrome(wv, True)
        # record → restore the bars → un-centre + slide once the resize lands
        _focus_flip_around(False, -toolbar_h, (
            "window.__jankiFocus=false;" + _CORE_RESTORE +
            "var _b=document.body;if(_b){_b.style.removeProperty('justify-content');"
            "_b.style.removeProperty('padding-top');}"), _restore)

    # Hide the card-timer progress bar in Focus Mode (restore it when off).
    if card_timer._card_timer_instance is not None:
        try:
            card_timer._card_timer_instance.apply_focus()
        except Exception:
            pass


# ---------------------------------------------------------------------------
# Card zoom — Ctrl+Plus / Ctrl+Minus scale the reviewer card text. Persisted in
# card_zoom and re-applied per card (a <style id=__janki_zoom> in the head using
# the CSS `zoom` property, which scales the card + nested sizes proportionally).
# ---------------------------------------------------------------------------
def _apply_card_zoom() -> None:
    web = getattr(mw, "web", None)
    if web is None:
        return
    z = float(_cfg().get("card_zoom", 1.0))
    # Zoom ONLY #qa (the card content container). The reviewer's <body> carries the
    # class "card", so a ".card" selector zoomed the SCROLL CONTAINER itself — and a
    # zoomed scroll container mis-computes its scroll range in QtWebEngine, clipping
    # the TOP of any card taller than the viewport (the Focus Mode top-clip bug). It
    # also double-zoomed (#qa nested inside the zoomed body). #qa scales all its
    # descendants, so this still zooms the whole card, once, without touching scroll.
    js = ("(function(){var s=document.getElementById('__janki_zoom');"
          "if(!s){s=document.createElement('style');s.id='__janki_zoom';"
          "(document.head||document.documentElement).appendChild(s);}"
          "s.textContent='#qa{zoom:" + ("%g" % z) + ";}';})()")
    try:
        web.eval(js)
    except Exception:
        pass


def _change_card_zoom(delta: float) -> None:
    cfg = _cfg_raw()
    z = max(0.5, min(3.0, round(float(cfg.get("card_zoom", 1.0)) + delta, 2)))
    cfg["card_zoom"] = z
    try:
        mw.addonManager.writeConfig(__name__, cfg)
    except Exception:
        pass
    _apply_card_zoom()
    try:
        from aqt.utils import tooltip
        tooltip("Card zoom %d%%" % round(z * 100), period=700)
    except Exception:
        pass


def _toggle_focus_mode() -> None:
    """Tab+F: turn Focus Mode on/off. On → chrome hides after the idle delay;
    off → chrome restored immediately."""
    global _focus_mode_on, _cursor_idle_s
    _focus_mode_on = not _focus_mode_on
    if _focus_mode_on:
        _cursor_idle_s = 0.0        # (idle path is now just a fallback)
        # Engage immediately — no need to wait for the idle delay.
        if getattr(mw, "state", None) == "review":
            _focus_set_hidden(True)
    else:
        _focus_set_hidden(False)    # bring the chrome back right away
        _cursor_show()              # and reveal the cursor if it was auto-hidden
    try:
        from aqt.utils import tooltip
        tooltip("Focus Mode " + ("ON" if _focus_mode_on else "OFF"), period=1200)
    except Exception:
        pass


def _open_last_deck() -> None:
    """Tab+O / menu-bar: start studying the last-studied deck straight away —
    select it and drop into the reviewer (Anki bounces to the overview/congrats
    screen if nothing is due). The 'current' deck is Anki's persisted
    last-selected deck, so this survives quitting/reopening."""
    try:
        if mw.col is None:
            return
        did = None
        for getter in (
            lambda: mw.col.decks.get_current_id(),   # modern Anki
            lambda: mw.col.decks.selected(),          # older fallback
            lambda: (mw.col.decks.current() or {}).get("id"),
        ):
            try:
                did = getter()
                if did:
                    break
            except Exception:
                continue
        if not did:
            return
        try:
            mw.col.decks.select(did)
        except Exception:
            pass
        # Tab+O can fire while Anki is unfocused/minimized — bring it forward first.
        if mw.isMinimized() or not mw.isVisible():
            mw.showNormal()
        mw.activateWindow()
        # Start the timebox like the "Study Now" button, then enter review. If the
        # deck has no due cards, moveToState("review") falls through to overview.
        try:
            mw.col.startTimebox()
        except Exception:
            pass
        mw.moveToState("review")
    except Exception as e:
        keytap._gtap_log(f"open last deck failed: {e}")


def engage_on_review() -> None:
    """Focus Mode switched on outside the reviewer (deck list, overview): hide the
    chrome as soon as a review starts, instead of waiting for the idle fallback."""
    if not _focus_mode_on or _focus_hidden:
        return
    from aqt.qt import QTimer

    def _go():
        if _focus_mode_on and not _focus_hidden and getattr(mw, "state", None) == "review":
            _focus_set_hidden(True)
    QTimer.singleShot(60, _go)          # let the reviewer lay out its first card


def _focus_restore_for_nav() -> None:
    """Leaving the reviewer must not leave the app headless — show the chrome
    again (Focus Mode stays armed and re-hides after idle back in review)."""
    if _focus_hidden:
        _focus_set_hidden(False)
