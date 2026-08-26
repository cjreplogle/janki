"""Focus mode, cursor auto-hide, card zoom, and app-focus tracking."""

import sys
from ctypes import c_bool
from aqt import mw
from aqt.qt import Qt, QTimer

from .bridge import _bridge
from .config import _cfg
from . import state
from . import card_timer, keytap

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


def _start_cursor_hide():
    global _cursor_timer
    if sys.platform != 'darwin' or _cursor_timer is not None:
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
# tags and vertically centre the card text in the window (the chrome is hidden so
# the card owns the full height). Uses height:100% (not 100vh — QtWebEngine
# mis-resolves vh).
_FOCUS_CSS = (
    "#tags-container{display:none!important;}"
    "html,body{height:100%!important;}"
    "body{min-height:100%!important;box-sizing:border-box!important;"
    "display:flex!important;flex-direction:column!important;"
    # `safe center`: centre short cards, but fall back to top-alignment the moment
    # the content is taller than the viewport (revealed back / small window) so the
    # top never gets clipped or pushed off-screen.
    "justify-content:safe center!important;}"
)


def _focus_chrome():
    """The webviews Focus Mode hides: top toolbar and bottom answer bar."""
    return [getattr(mw, "toolbarWeb", None), getattr(mw, "bottomWeb", None)]


_FOCUS_ANIM_MS = 220        # card slide duration
_FOCUS_FADE_MS = 160        # chrome opacity fade duration


def _fade_chrome(wv, visible: bool) -> None:
    """Cross-fade a chrome webview's content by animating its <body> opacity in the
    page (QGraphicsOpacityEffect renders black on QWebEngineView/macOS, so we fade
    CSS opacity inside the page instead). Height is toggled instantly by the caller
    — fading opacity is GPU-cheap and avoids the per-frame relayout that animating
    the webview's height caused (the jitter)."""
    try:
        if visible:
            wv.eval("(function(){var b=document.body;if(!b)return;"
                    "b.style.transition='none';b.style.opacity='0';"
                    "requestAnimationFrame(function(){"
                    "b.style.transition='opacity " + str(_FOCUS_FADE_MS) + "ms ease';"
                    "b.style.opacity='1';"
                    "setTimeout(function(){b.style.transition='';},"
                    + str(_FOCUS_FADE_MS + 60) + ");});})()")
        else:
            wv.eval("(function(){var b=document.body;if(!b)return;"
                    "b.style.transition='opacity " + str(_FOCUS_FADE_MS) + "ms ease';"
                    "b.style.opacity='0';})()")
    except Exception:
        pass


def _focus_apply_card(hidden: bool, offset_px: int = 0) -> None:
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
        "||document.body.firstElementChild;if(!el){" + mutate + "return;}"
        "var first=el.getBoundingClientRect().top;"
        + mutate +
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


def _focus_set_hidden(hidden: bool) -> None:
    global _focus_hidden
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
        # Fade the chrome out first (still occupying layout, so nothing reflows),
        # THEN collapse its height and slide the card to centre.
        for wv in chrome:
            _fade_chrome(wv, False)

        def _after_fade(off=toolbar_h):
            if not _focus_hidden:      # toggled back during the fade — abort
                return
            for wv in chrome:
                try:
                    wv.hide()
                except Exception:
                    pass
            _focus_apply_card(True, off)     # +toolbar_h: card jumped up, slide down
            _reassert_web_focus()  # keep the reviewer webview focused (see below)
        QTimer.singleShot(_FOCUS_FADE_MS + 20, _after_fade)
    else:
        # Restore chrome height instantly (one reflow), slide the card to the top,
        # and fade the chrome back in over the top.
        for wv in chrome:
            try:
                wv.show()
            except Exception:
                pass
        _focus_apply_card(False, -toolbar_h)  # -toolbar_h: card jumped down, slide up
        for wv in chrome:
            _fade_chrome(wv, True)

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
    js = ("(function(){var s=document.getElementById('__janki_zoom');"
          "if(!s){s=document.createElement('style');s.id='__janki_zoom';"
          "(document.head||document.documentElement).appendChild(s);}"
          "s.textContent='#qa,.card{zoom:" + ("%g" % z) + ";}';})()")
    try:
        web.eval(js)
    except Exception:
        pass


def _change_card_zoom(delta: float) -> None:
    cfg = _cfg()
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


def _focus_restore_for_nav() -> None:
    """Leaving the reviewer must not leave the app headless — show the chrome
    again (Focus Mode stays armed and re-hides after idle back in review)."""
    if _focus_hidden:
        _focus_set_hidden(False)
