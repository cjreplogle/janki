"""Floating coherence HUD (directional pad overlay)."""

import os
import sys
import time as _time
import ctypes
from ctypes import c_void_p, c_char_p, c_bool, c_int, c_ulong
from typing import Optional
from aqt import mw
from aqt.qt import Qt, QTimer

from .bridge import _bridge
from .config import _cfg
from . import state
from . import card_timer, css, keytap

# ---------------------------------------------------------------------------
# Coherence mode — bottom-of-screen card HUD, toggled by Tab+\
# ---------------------------------------------------------------------------

# Caption HUD screen anchor: a 3x3 grid. row ∈ top/middle/bottom, col ∈
# left/center/right, stored as "<row>-<col>" in config (coherence_position).
# Tab+arrows nudge it a cell at a time; the settings grid picks a cell directly.
_COH_ROWS = ("top", "middle", "bottom")
_COH_COLS = ("left", "center", "right")
# Glyphs for the settings grid selector, indexed [row][col].
_COH_GLYPHS = (("↖", "↑", "↗"), ("←", "•", "→"), ("↙", "↓", "↘"))


def _coherence_rc():
    """(row, col) for the caption anchor, migrating the legacy single-word values
    (bottom / top / topright) onto the 3x3 grid."""
    raw = str(_cfg().get("coherence_position", "bottom-center") or "").lower()
    raw = {"bottom": "bottom-center", "top": "top-center",
           "topright": "top-right", "center": "middle-center"}.get(raw, raw)
    row, _, col = raw.partition("-")
    if row not in _COH_ROWS:
        row = "bottom"
    if col not in _COH_COLS:
        col = "center"
    return row, col


def _coherence_narrow():
    """Side columns (left/right) constrain width + word-wrap so the box hugs that
    edge instead of spanning the screen like the centered column does."""
    return _coherence_rc()[1] != "center"


_fs_cache = {"t": 0.0, "v": False}  # short-TTL cache for _frontmost_fullscreen


def _frontmost_fullscreen() -> bool:
    """True when the FRONTMOST app's focused window is in macOS native fullscreen.

    This is the ONLY reliable signal available from Anki's own process/Space:
    every screen-geometry API (Qt availableGeometry, CGWindowList, NSScreen
    visibleFrame) reports Anki's own desktop Space and never sees another app's
    fullscreen. So we ask the Accessibility API (permission already granted for
    the global hotkeys) for the frontmost window's AXFullScreen attribute.

    When True → a bottom caption drops to the physical screen bottom (no Dock in
    that Space); when False (desktop) → it clears the Dock. Cached ~0.4s. Any
    failure degrades to False (Dock-clearing behavior)."""
    now = _time.monotonic()
    if now - _fs_cache["t"] < 0.4:
        return _fs_cache["v"]
    val = False
    try:
        if mw.isFullScreen():
            val = True
    except Exception:
        pass
    if not val:
        try:
            AX = ctypes.CDLL('/System/Library/Frameworks/ApplicationServices.framework/ApplicationServices')
            CF = ctypes.CDLL('/System/Library/Frameworks/CoreFoundation.framework/CoreFoundation')
            AX.AXUIElementCreateSystemWide.restype = c_void_p
            AX.AXUIElementCopyAttributeValue.restype = c_int
            AX.AXUIElementCopyAttributeValue.argtypes = [
                c_void_p, c_void_p, ctypes.POINTER(c_void_p)]
            CF.CFStringCreateWithCString.restype = c_void_p
            CF.CFStringCreateWithCString.argtypes = [c_void_p, c_char_p, ctypes.c_uint32]
            CF.CFBooleanGetValue.restype = c_bool
            CF.CFBooleanGetValue.argtypes = [c_void_p]
            CF.CFRelease.argtypes = [c_void_p]

            def _cfstr(s):
                return CF.CFStringCreateWithCString(None, s.encode(), 0x08000100)

            def _attr(el, name):
                out = c_void_p()
                k = _cfstr(name)
                err = AX.AXUIElementCopyAttributeValue(el, k, ctypes.byref(out))
                CF.CFRelease(k)
                return out.value if err == 0 else None

            sysw = AX.AXUIElementCreateSystemWide()
            if sysw:
                app = _attr(sysw, "AXFocusedApplication")
                if app:
                    win = _attr(app, "AXFocusedWindow") or _attr(app, "AXMainWindow")
                    if win:
                        fsv = _attr(win, "AXFullScreen")
                        if fsv:
                            val = bool(CF.CFBooleanGetValue(fsv))
                            CF.CFRelease(fsv)
                        CF.CFRelease(win)
                    CF.CFRelease(app)
                CF.CFRelease(sysw)
        except Exception as _e:
            keytap._gtap_log(f"_frontmost_fullscreen err: {_e}")
            val = False
    _fs_cache["t"] = now
    _fs_cache["v"] = val
    return val


def _make_coherence_hud():
    from PyQt6.QtWidgets import QWidget, QVBoxLayout
    from PyQt6.QtWebEngineWidgets import QWebEngineView
    from PyQt6.QtGui import QColor
    from PyQt6.QtCore import (QPropertyAnimation, QRect, QEasingCurve,
                              QAbstractAnimation)
    from ctypes import c_double
    import json as _json

    _RADIUS = 16
    _PAD_V  = 10   # vertical padding (px) — ~half font-size
    _PAD_H  = 32   # horizontal padding (px)

    class HUD(QWidget):

        def __init__(self):
            super().__init__(
                None,
                Qt.WindowType.FramelessWindowHint
                | Qt.WindowType.WindowStaysOnTopHint
                # Tool → Qt backs it with an NSPanel, which (as a non-activating
                # panel) is the only reliable way to float over ANOTHER app's
                # native-fullscreen Space; a plain NSWindow can't. See _apply_glass.
                | Qt.WindowType.Tool,
            )
            self.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground)
            self.setAttribute(Qt.WidgetAttribute.WA_ShowWithoutActivating)
            # Passive caption → click-through. The Qt attr covers the widget; the
            # authoritative pass-through is setIgnoresMouseEvents in _apply_glass.
            self.setAttribute(Qt.WidgetAttribute.WA_TransparentForMouseEvents)
            self.setStyleSheet("background: transparent;")
            self._view = QWebEngineView(self)
            self._view.page().setBackgroundColor(QColor(0, 0, 0, 0))
            self._view.setStyleSheet("background: transparent;")
            # Keep the page LIFECYCLE ACTIVE so the renderer paints even while Anki
            # is a background app (the caption floats over another app / fullscreen).
            # Otherwise Chromium suspends the background window's renderer and the
            # caption shows blank — the old code masked this by activating Anki,
            # which stole focus. Re-asserted in refresh() (Qt can drift it).
            self._force_active()
            # Allow the setHtml page (file:// base = the media folder) to actually
            # load card images from disk; QtWebEngine can otherwise block file://
            # subresources of setHtml content.
            try:
                from PyQt6.QtWebEngineCore import QWebEngineSettings as _QS
                _s = self._view.settings()
                _s.setAttribute(_QS.WebAttribute.LocalContentCanAccessFileUrls, True)
                _s.setAttribute(_QS.WebAttribute.LocalContentCanAccessRemoteUrls, True)
            except Exception:
                pass
            self._view.loadFinished.connect(self._on_loaded)
            # NO layout: the web view is kept at a FIXED generous viewport pinned to
            # the top-left, and the WINDOW is sized to the measured box (clipping the
            # view). Decoupling the render viewport from the window keeps narrow-
            # column word-wrap — and therefore the measured height — STABLE across
            # the re-fit passes. (A layout would force view==window, so measuring at a
            # stale narrower window over-estimated height → the window jumped up then
            # settled back down when moving bottom-center → a corner.)
            self._view.move(0, 0)
            self._view.resize(*self._vp())
            self._session_max = [0, 0, 0]  # depletion tracking for deck pills
            # (left, top, w, h) of the visible .hud-bg box relative to the window
            # top-left, measured after each render. The window can be taller than
            # the box (inline layout leaves slack), so the red flare shapes itself
            # to this inset, not the whole window — otherwise it spills past the box.
            self._box_inset = None
            self._target_geom = None   # settled target rect, for the caption flare
            self._box_origin = (0, 0)  # measured (bx,by) of the box in the viewport
            self._last_fs = None       # last frontmost-fullscreen state, _watch_space
            # While the caption is up, re-anchor when the frontmost app enters/exits
            # fullscreen (e.g. leaving the fullscreen app back to the desktop — the
            # Dock reappears, so a bottom caption must lift above it).
            from PyQt6.QtCore import QTimer as _QTimer
            self._space_timer = _QTimer(self)
            self._space_timer.setInterval(500)
            self._space_timer.timeout.connect(self._watch_space)

        def _watch_space(self):
            if not self.isVisible():
                return
            fs = _frontmost_fullscreen()
            if fs != self._last_fs:
                self._last_fs = fs
                # Re-anchor for the current box size. A no-op glide (start ==
                # target) if the anchor didn't actually move.
                self._reposition(self.width(), self.height())

        def _vp(self):
            """Fixed, generous render viewport for the web view. Width must exceed
            any box (incl. the narrow-column max-width) so wrapping is viewport-
            independent → stable measured height. Height only needs to be roomy;
            getBoundingClientRect reports true layout height even past the viewport."""
            avail = mw.app.primaryScreen().availableGeometry()
            return max(2200, avail.width()), max(600, avail.height() // 2)

        def _target_rect(self, w: int, h: int):
            """The final on-screen rect for a measured box (w,h): width clamp per
            column, x per column, y per row (bottom drops to the physical screen
            bottom in a fullscreen Space, else clears the Dock)."""
            avail = mw.app.primaryScreen().availableGeometry()
            row, col = _coherence_rc()
            # Side columns wrap to a narrower box so "left"/"right" actually hug the
            # edge; the centered column grows to fit its content.
            if col != 'center':
                max_w = max(440, avail.width() * 3 // 8)
                w = max(320, min(max_w, w))
            else:
                w = max(200, min(avail.width() - 80, w))
            h = max(40, min(avail.height() // 3, h))
            _M = 16   # screen-edge margin
            if col == 'left':
                x = avail.x() + _M
            elif col == 'right':
                x = avail.x() + avail.width() - w - _M
            else:
                x = avail.x() + (avail.width() - w) // 2
            if row == 'top':
                y = avail.y() + 24
            elif row == 'bottom':
                if _frontmost_fullscreen():
                    # No Dock in a fullscreen Space → drop to the physical bottom.
                    full = mw.app.primaryScreen().geometry()
                    y = full.y() + full.height() - h - 8
                else:
                    # Desktop → clear the Dock via the available-area bottom.
                    y = avail.y() + avail.height() - h - 24
            else:  # middle
                y = avail.y() + (avail.height() - h) // 2
            return QRect(x, y, w, h)

        def _reposition(self, w: int, h: int = 60, animate: bool = True,
                        move: bool = False):
            avail  = mw.app.primaryScreen().availableGeometry()
            row = _coherence_rc()[0]
            target = self._target_rect(w, h)
            x, w, h = target.x(), target.width(), target.height()
            # Publish the SETTLED target so the caption flare can shape to where the
            # box is going, not its mid-animation rect. Read by PulseOverlay.
            self._target_geom = target
            # Keep the view at the fixed generous viewport, shifted so the measured
            # box top-left lands at the window origin (0,0) — window shows EXACTLY
            # the box, no empty strip above it.
            ox, oy = getattr(self, '_box_origin', (0, 0))
            self._view.move(-ox, -oy)
            self._view.resize(*self._vp())
            cur = self.geometry()
            # "Off-screen" = outside the PHYSICAL screen, not the available area.
            # In a fullscreen Space the caption legitimately sits below avail.bottom
            # (there's no Dock there) — testing against avail.bottom() wrongly flagged
            # the on-screen caption as off-screen, so every re-fit replayed the entry
            # slide and moving to middle jumped to the top first.
            _full = mw.app.primaryScreen().geometry()
            off_screen = (cur.y() > _full.y() + _full.height()
                          or cur.y() + cur.height() < _full.y())
            # Cancel any in-flight geometry animation so rapid re-measures (image
            # loads) and moves don't stack / fight.
            prev = getattr(self, '_anim', None)
            if prev is not None:
                try:
                    if (prev.state() == QAbstractAnimation.State.Running
                            and prev.endValue() == target):
                        return
                except Exception:
                    pass
                try:
                    prev.stop()
                except Exception:
                    pass
                self._anim = None
            if not (animate and self.isVisible() and self.width() > 0):
                self.setGeometry(target)
                return
            if off_screen:
                # Entry slide-in: the window was shown off-screen (below the
                # physical bottom for a bottom anchor, above the top otherwise);
                # start there at the measured width/x and slide vertically to target.
                if row == 'bottom':
                    full = mw.app.primaryScreen().geometry()
                    self.setGeometry(QRect(x, full.y() + full.height() + 10, w, h))
                else:
                    self.setGeometry(QRect(x, avail.top() - h - 10, w, h))
                start, dur = self.geometry(), 240
            else:
                # Already on-screen: smoothly glide/resize from current geometry to
                # target (Tab+arrow moves, card flip, late image, font-size change).
                start, dur = cur, (200 if move else 170)
            if start == target:
                self.setGeometry(target)   # nothing changed → no needless animation
                return
            anim = QPropertyAnimation(self, b"geometry", self)
            anim.setDuration(dur)
            anim.setEasingCurve(QEasingCurve.Type.OutCubic)
            anim.setStartValue(start)
            anim.setEndValue(target)
            anim.start()
            self._anim = anim

        # Before measuring, strip TRAILING empty content from the card (the answer
        # side of AnKing cards ends with empty extra-field wrappers / <br>s / a
        # dangling Q-A separator that reserve big blank space at the bottom of the
        # box). meaningful() = has text or real media; everything trailing that
        # isn't gets removed, recursing into the last meaningful element to trim its
        # own trailing <br>s. Then report the .hud-bg box rect.
        _MEASURE_JS = (
            "(function(){"
            "function meaningful(n){"
            "if(n.nodeType===3)return n.textContent.replace(/\\s+/g,'').length>0;"
            "if(n.nodeType!==1)return false;"
            "var t=n.tagName;"
            "if(t==='IMG'||t==='SVG'||t==='CANVAS'||t==='VIDEO'||t==='AUDIO'||t==='TABLE')return true;"
            "if(n.querySelector&&n.querySelector('img,svg,canvas,video,audio,table'))return true;"
            "return n.textContent.replace(/\\s+/g,'').length>0;}"
            "function trim(el){var n,g=0;while((n=el.lastChild)&&g++<800){"
            "if(n.nodeType===3&&n.textContent.replace(/\\s+/g,'')===''){el.removeChild(n);continue;}"
            "if(n.nodeType===1&&(n.tagName==='BR'||n.tagName==='HR')){el.removeChild(n);continue;}"
            "if(n.nodeType===1&&!meaningful(n)){el.removeChild(n);continue;}"
            "if(n.nodeType===1){trim(n);}break;}}"
            "try{trim(document.getElementById('qa')||document.querySelector('.card-area')||document.body);}catch(e){}"
            "var b=document.querySelector('.hud-bg');"
            "var r=b?b.getBoundingClientRect():null;"
            "var bh=r?Math.round(r.height):document.body.offsetHeight,ch=-1;"
            # Recompute height from the DEEPEST real content (text/media) plus the
            # card-area bottom padding — trailing empty / over-tall wrappers on the
            # answer side otherwise reserve blank space the raw box rect includes.
            # Only ever SHRINK (never grow past the real box).
            "try{var qa=document.getElementById('qa')||document.querySelector('.card-area');"
            "if(qa&&r){var top=r.top,maxB=top;"
            # Skip out-of-flow (absolute/fixed) subtrees: they don't set the box's
            # real height but can render far below it (e.g. an off-box helper element
            # near the viewport bottom), which otherwise inflated the content height.
            "function oof(el){var p=el;while(p&&p!==qa){var ps=getComputedStyle(p).position;"
            "if(ps==='absolute'||ps==='fixed')return true;p=p.parentElement;}return false;}"
            # media elements: use their own box bottom
            "var md=qa.querySelectorAll('img,svg,canvas,video,audio,table,hr');"
            "for(var i=0;i<md.length;i++){if(oof(md[i]))continue;var cr=md[i].getBoundingClientRect();"
            "var mb=parseFloat(getComputedStyle(md[i]).marginBottom)||0;"
            "if(cr.bottom+mb>maxB)maxB=cr.bottom+mb;}"
            # text: measure the glyph bottom via a Range so a container's min-height
            # / padding below the text doesn't count as content.
            "var tw=document.createTreeWalker(qa,NodeFilter.SHOW_TEXT,null),tn,rng=document.createRange();"
            "while((tn=tw.nextNode())){if(tn.textContent.replace(/\\s+/g,'').length===0)continue;"
            "if(oof(tn.parentElement))continue;"
            "rng.selectNodeContents(tn);var tr=rng.getBoundingClientRect();if(tr.bottom>maxB)maxB=tr.bottom;}"
            "var ca=document.querySelector('.card-area');"
            "var padB=ca?(parseFloat(getComputedStyle(ca).paddingBottom)||0):0;"
            "ch=Math.ceil(maxB-top+padB);"
            "if(ch>0&&ch<bh)bh=ch;}}catch(e){}"
            "return JSON.stringify({w:document.body.offsetWidth,"
            "h:document.body.offsetHeight,"
            "bx:r?Math.round(r.left):0,by:r?Math.round(r.top):0,"
            "bw:r?Math.round(r.width):document.body.offsetWidth,"
            "bh:bh});})()")

        def _fit(self):
            """Measure the rendered box and size the window to it."""
            if not self.isVisible():
                return
            self._view.page().runJavaScript(self._MEASURE_JS, self._apply_fit)

        def _apply_fit(self, result):
            if not self.isVisible():
                return
            # Size the window to the VISIBLE .hud-bg box (bw/bh), not the full
            # <body> (w/h): body is display:inline-block wrapping an inline-flex
            # box, so it carries a baseline gap BELOW the box that grows with
            # font-size — that phantom strip looked like reserved room for a
            # non-existent bottom section.
            try:
                d = _json.loads(result)
                bw = int(d.get('bw') or 0)
                bh = int(d.get('bh') or 0)
                bx = int(d.get('bx') or 0)
                by = int(d.get('by') or 0)
                if bw > 0 and bh > 0:
                    w, h = bw, bh
                else:
                    w, h, bx, by = int(d['w']), int(d['h']), 0, 0
            except Exception:
                w, h, bx, by = 500, 60, 0, 0
            # The box may not sit flush at the viewport top-left (by>0). Pin it to
            # the window origin by offsetting the view, so the window shows EXACTLY
            # the box — otherwise there's `by` px of empty space above the box (and
            # the flare, filling the window, glowed that far above the box top).
            self._box_origin = (bx, by)
            self._reposition(w, h)   # slides in off-screen→target, or glides on resize
            # Window wraps the box exactly, so the flare inset is the whole window.
            self._box_inset = (0, 0, w, h)
            self._apply_glass()
            # Re-shape a live flare (red / one-shot green) to the new box so it
            # doesn't stay stuck at the previous size. No-ops for hidden overlays.
            try:
                if card_timer._card_timer_instance is not None:
                    card_timer._card_timer_instance.reposition()
            except Exception:
                pass

        def set_font_size(self, px: int, prev_px: int = 0):
            """Live font-size change WITHOUT a full re-render: swap an injected
            <style> so the glyphs ease to the new size (CSS transition above)
            while the window glides to fit. Used by the Shift+Tab +/- caption
            resize so it glides instead of snapping.

            We must NOT measure the box mid-transition — getBoundingClientRect
            returns the animating size, so re-fitting then chases a moving target
            and the window wobbles back and forth. Instead PREDICT the settled
            box (only the text scales; the chrome is fixed) and glide there once,
            in step with the glyph transition; then reconcile with a single _fit
            AFTER the transition has fully settled."""
            if not self.isVisible():
                return
            css = (
                ".hud-bg{{font-size:{px}px!important;}}"
                "#qa,.card,.card-area,"
                "#qa *:not(kbd):not(sub):not(sup),"
                ".card *:not(kbd):not(sub):not(sup)"
                "{{font-size:{px}px!important;}}"
            ).format(px=int(px))
            js = ("(function(){var s=document.getElementById('cap-fs-live');"
                  "if(!s){s=document.createElement('style');s.id='cap-fs-live';"
                  "document.head.appendChild(s);}s.textContent="
                  + _json.dumps(css) + ";})()")
            self._view.page().runJavaScript(js)
            # Predicted glide: scale only the text portion of the box, leaving the
            # fixed chrome (card-area padding + the deck-bars pill row) constant.
            if prev_px and prev_px > 0:
                ratio = px / float(prev_px)
                cur = self.geometry()
                _fixed_h = 2 * _PAD_H          # card-area L/R padding
                _fixed_v = 2 * _PAD_V + 11     # card padding + deck-bars row (~11px)
                w = round((cur.width()  - _fixed_h) * ratio) + _fixed_h
                h = round((cur.height() - _fixed_v) * ratio) + _fixed_v
                self._reposition(int(w), int(h))  # single OutCubic glide (~170ms)
            # Reconcile exactly once, after the 170ms font transition settles, so
            # this measures the STATIC box — a single small correction, no wobble.
            QTimer.singleShot(210, self._fit)

        def _on_loaded(self, _ok):
            if not self.isVisible():
                return
            # Fit now, then re-fit as async images/fonts settle — a late-loading
            # image would otherwise be clipped by an under-measured box (looked like
            # the bottom of the card was cut off). Re-fits that find no size change
            # are no-ops; genuine growth animates smoothly (see _reposition).
            self._fit()
            QTimer.singleShot(160, self._fit)
            QTimer.singleShot(480, self._fit)

        def _force_active(self):
            """Force the WebEngine page lifecycle to Active so it keeps rendering
            while Anki is a background app (else the caption paints blank over
            another window/fullscreen). Best-effort across Qt versions."""
            try:
                from PyQt6.QtWebEngineCore import QWebEnginePage as _QP
                self._view.page().setLifecycleState(_QP.LifecycleState.Active)
            except Exception as _e:
                keytap._gtap_log(f"force_active err: {_e}")

        def refresh(self, animate_text=True):
            self._force_active()
            # animate_text=False for re-renders that aren't a new card/side (moving
            # the HUD, settings tweaks) so the typewriter reveal doesn't replay.
            r    = getattr(mw, 'reviewer', None)
            card = getattr(r, 'card', None)
            if not card:
                body, card_css = "<p>No card open</p>", ""
            else:
                state = getattr(r, 'state', 'question')
                try:
                    body = card.question() if state == 'question' else card.answer()
                except Exception:
                    body = "<p>Could not render card</p>"
                try:
                    nt = card.note_type()
                    card_css = (nt or {}).get('css', '')
                except Exception:
                    card_css = ''

            tw_js = (css._typewriter_head(_cfg())
                     if (animate_text and _cfg().get("typewriter", True)) else "")

            # Deck counts — fixed-width depletion pills
            try:
                _nc, _lc, _rc = (mw.col.sched.counts()
                                  if mw.col else (0, 0, 0))
            except Exception:
                _nc, _lc, _rc = 0, 0, 0
            sm = self._session_max
            sm[0] = max(sm[0], _nc)
            sm[1] = max(sm[1], _lc)
            sm[2] = max(sm[2], _rc)
            _PILL_W   = 48  # max pill width px (~2× font-size)
            _denom    = max(sm) or 1  # shared baseline — highest count sets full width
            _fw_new   = int(_PILL_W * _nc / _denom)
            _fw_lrn   = int(_PILL_W * _lc / _denom)
            _fw_rev   = int(_PILL_W * _rc / _denom)

            # Position-aware content constraint (side columns need word-wrap)
            _narrow = _coherence_narrow()
            _avail = mw.app.primaryScreen().availableGeometry()
            # Caption text alignment (settings: left / center / right).
            _align = (_cfg().get('caption_align', 'center') or 'center').lower()
            _ja = {'left': 'flex-start', 'right': 'flex-end'}.get(_align, 'center')
            _ta = _align if _align in ('left', 'right') else 'center'
            # Match the reviewer's card font so caption text uses the app serif
            # (the HUD is a separate webview and otherwise falls back to the
            # note-type / system sans font — "fonts not working" in caption mode).
            _cap_font = _cfg().get('card_font', 'Anthropic Serif Text')
            # Caption text + image size (settings sliders).
            _cap_fs = max(8, int(_cfg().get('caption_font_size', 20)))
            _cap_img = max(80, int(_cfg().get('caption_image_max', 480)))
            _cap_img_h = max(40, int(_cap_img / 3))   # keep the ~3:1 height cap
            if _narrow:
                _max_content_w = max(440, _avail.width() * 3 // 8) - _PAD_H * 2
                _body_w_css = f"max-width:{_max_content_w}px; word-wrap:break-word;"
                _hud_max_w  = max(440, _avail.width() * 3 // 8)
            else:
                # Centered column may span nearly the full screen width — short
                # captions still shrink-to-fit (max-content), long ones can now grow
                # well past the old 1400px cap before wrapping.
                _body_w_css = "width:max-content;"
                _hud_max_w  = max(1400, _avail.width() - 80)

            # Resolve relative <img src="foo.jpg"> against the collection media
            # folder, exactly like the reviewer. Without a base URL, setHtml has an
            # empty origin and card images never load (caption showed no photos).
            from PyQt6.QtCore import QUrl
            try:
                _mdir = mw.col.media.dir() if mw.col else None
                _base = QUrl.fromLocalFile(_mdir + os.sep) if _mdir else QUrl()
            except Exception:
                _base = QUrl()

            self._view.stop()
            # Render into the fixed generous viewport so the FIRST measure already
            # sees final wrapping (no measure-at-stale-width → up-then-down jump).
            self._view.move(0, 0)
            self._view.resize(*self._vp())
            self._view.setHtml(f"""<!DOCTYPE html>
<html><head><meta charset="utf-8">
{tw_js}
<style>
* {{ box-sizing:border-box; margin:0; padding:0; }}
html, body {{ background: transparent !important; }}
body {{
  display: inline-block;
  {_body_w_css}
  margin: 0; padding: 0;
  /* Collapse the inline-block baseline/descender gap below the box (.hud-bg sets
     its own line-height) so body height == box height — no phantom bottom strip. */
  line-height: 0;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}}
.hud-bg {{
  display: inline-flex;
  flex-direction: column;
  align-items: stretch;
  background: rgba(16,16,22,0.72);
  border-radius: {_RADIUS}px;
  overflow: hidden;
  max-width: {_hud_max_w}px;
}}
.deck-bars {{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 5px 0 3px 0;
  flex-shrink: 0;
}}
.pill {{
  width: {_PILL_W}px;
  height: 3px;
  border-radius: 2px;
  background: rgba(255,255,255,0.08);
  overflow: hidden;
  flex-shrink: 0;
}}
.card-area {{
  display: flex; align-items: center; justify-content: {_ja};
  text-align: {_ta};
  padding: {_PAD_V}px {_PAD_H}px;
}}
{card_css}
*, *::before, *::after {{
  color: rgba(255,255,255,0.92) !important;
  background: transparent !important;
  -webkit-text-fill-color: rgba(255,255,255,0.92) !important;
  text-shadow: none !important;
  margin: 0 !important;
  padding: 0 !important;
}}
.hud-bg {{
  background: rgba(16,16,22,0.72) !important;
  font-size: {_cap_fs}px !important;
  line-height: 1.4 !important;
  padding: 0 !important;
}}
.card-area {{ padding: {_PAD_V}px {_PAD_H}px !important;
  justify-content: {_ja} !important; text-align: {_ta} !important; }}
/* App card serif in the HUD (note-type CSS is injected above and would
   otherwise set its own font). kbd/shortcut keys left alone. */
#qa, .card, .card-area, #qa *:not(kbd), .card *:not(kbd) {{
  font-family: "{_cap_font}", -apple-system, Georgia, serif !important;
}}
/* Caption font-size slider. Force ALL card text to the chosen size (the AnKing
   "Extra" field etc. set their own larger font-size, which the container-only
   rule didn't override). Exclude kbd (shortcut keys) and sub/sup so those keep
   their relative sizing (e.g. chemistry subscripts). */
#qa, .card, .card-area,
#qa *:not(kbd):not(sub):not(sup), .card *:not(kbd):not(sub):not(sup) {{
  font-size: {_cap_fs}px !important;
}}
/* Smooth glyph scaling when the font size is nudged live (Shift+Tab +/-). The
   size itself is swapped by an injected <style id="cap-fs-live"> (see
   HUD.set_font_size); this transition eases the change instead of snapping. */
.hud-bg,
#qa, .card, .card-area,
#qa *:not(kbd):not(sub):not(sup), .card *:not(kbd):not(sub):not(sup) {{
  transition: font-size 170ms ease !important;
}}
.deck-bars {{ padding: 5px 0 3px 0 !important; gap: 8px !important; }}
.pill {{ background: rgba(255,255,255,0.08) !important; padding: 0 !important; margin: 0 !important; }}
.fill-new {{ display:block; height:100%; width:{_fw_new}px; background:rgba(91,158,248,0.7) !important; border-radius:2px; }}
.fill-lrn {{ display:block; height:100%; width:{_fw_lrn}px; background:rgba(248,113,113,0.7) !important; border-radius:2px; }}
.fill-rev {{ display:block; height:100%; width:{_fw_rev}px; background:rgba(74,222,128,0.7) !important; border-radius:2px; }}
#qa {{ display: block; }}
img {{ max-width: min({_cap_img}px, 100%) !important; max-height: {_cap_img_h}px !important;
       object-fit: contain !important;
       /* block (not inline) so the bottom margin actually adds layout height —
          inline images ignore vertical margins. Centered; the height measure adds
          this margin back in so it isn't trimmed away. margin-TOP stays 0: image-
          occlusion masks are absolutely positioned, and a top margin would shift
          them down and expose the top of the answer. No opacity, for the same
          reason (translucent masks would reveal what's under them). */
       display: block !important; margin: 0 auto 14px auto !important; }}
/* Lists: keep items left-aligned (bullets + wrapped lines line up), but let
   the list box shrink-to-fit and center as a block, so a left-aligned list
   reads centered on the fullscreen HUD instead of hugging the left edge. */
.card-area ul, .card-area ol {{
  display: inline-block !important;
  text-align: left !important;
  padding-left: 1.5em !important;
  margin: 0 auto !important;
}}
.card-area li {{ text-align: left !important; }}
/* Caption mode owns the timing feedback via the pulse, so hide the AnKing
   card's own countdown (.timer) — and its tags — in the HUD. */
.timer, #timer,
#tags-container, .tags-container, .tags {{ display: none !important; }}
/* Hide Anki's Q/A separator (<hr id=answer>) in the caption — it read as a
   stray underline and isn't needed here. */
hr, #answer {{ display: none !important; }}
</style></head>
<body><div class="hud-bg">
  <div class="deck-bars">
    <div class="pill"><div class="fill-new"></div></div>
    <div class="pill"><div class="fill-lrn"></div></div>
    <div class="pill"><div class="fill-rev"></div></div>
  </div>
  <div class="card-area"><div id="qa" class="card">{body}</div></div>
</div></body></html>""", _base)

        def _apply_glass(self):
            try:
                msg, cls = _bridge()
                ns_win = msg(c_void_p, c_void_p(int(self.winId())), b"window")
                if not ns_win:
                    return
                # To float over ANOTHER app's native-fullscreen Space the window
                # must be a NON-ACTIVATING NSPanel (plain NSWindows can't cross a
                # fullscreen Space's isolation layer). The Tool flag makes Qt back
                # this widget with an NSPanel; here we add the nonactivating-panel
                # style bit and lift the level above the menu bar.
                #   collectionBehavior: 1 = CanJoinAllSpaces (appear on every
                #   Space, incl. other apps' fullscreen + Anki's own), 16 =
                #   Stationary (don't get swept by Space switches). NOTE: 256
                #   (FullScreenAuxiliary) is the OPPOSITE of what we want here —
                #   it ties the window to its OWN app's fullscreen — so it's gone.
                is_panel = msg(c_bool, ns_win, b"isKindOfClass:",
                               (c_void_p,), (cls("NSPanel"),))
                # The NON-ACTIVATING style bit (128) is REQUIRED to cross into
                # another app's fullscreen Space. Re-assert it, but ONLY when it's
                # actually missing — calling setStyleMask rebuilds the window frame
                # and cycles resignKey/becomeKey (the focus churn), so we must not
                # do it redundantly. Checking the current mask makes this idempotent
                # by value: set once when Qt hasn't applied it (or reset it), skip
                # otherwise. The cheaper flags below don't rebuild the frame.
                if is_panel:
                    cur_mask = int(msg(c_ulong, ns_win, b"styleMask"))
                    if not (cur_mask & 128):  # NSWindowStyleMaskNonactivatingPanel
                        msg(None, ns_win, b"setStyleMask:", (c_ulong,),
                            (cur_mask | 128,))
                    msg(None, ns_win, b"setFloatingPanel:", (c_bool,), (True,))
                    msg(None, ns_win, b"setBecomesKeyOnlyIfNeeded:",
                        (c_bool,), (True,))
                    # CRITICAL: a default NSPanel HIDES when its app deactivates —
                    # i.e. the moment you switch away from Anki. That made the
                    # caption vanish whenever Anki lost focus. Keep it visible.
                    msg(None, ns_win, b"setHidesOnDeactivate:", (c_bool,),
                        (False,))
                # NSStatusWindowLevel = 25 (above the menu bar, below the
                # screensaver) — high enough to composite over a fullscreen app.
                msg(c_void_p, ns_win, b"setLevel:", (c_int,), (25,))
                msg(c_void_p, ns_win, b"setCollectionBehavior:", (c_ulong,),
                    (1 | 16,))
                msg(c_void_p, ns_win, b"setOpaque:", (c_bool,), (False,))
                msg(c_void_p, ns_win, b"setHasShadow:", (c_bool,), (False,))
                # Click-through: the caption is a passive read-out, so let every
                # mouse event fall through to the app underneath. Done at the
                # NSWindow level because Qt's WA_TransparentForMouseEvents doesn't
                # reliably cover the QWebEngineView's own native surface.
                msg(None, ns_win, b"setIgnoresMouseEvents:", (c_bool,), (True,))
                msg(c_void_p, ns_win, b"setBackgroundColor:", (c_void_p,),
                    (msg(c_void_p, cls("NSColor"), b"clearColor"),))
                # Clip the composited content to a rounded rect at the CALayer level.
                # SkyLight blur is intentionally NOT used here — it applies to the full
                # rectangular window bounding box, which makes transparent corners
                # appear tinted and the window look square. The CSS background is the tint.
                cv = msg(c_void_p, ns_win, b"contentView")
                if cv:
                    msg(c_void_p, cv, b"setWantsLayer:", (c_bool,), (True,))
                    layer = msg(c_void_p, cv, b"layer")
                    if layer:
                        msg(c_void_p, layer, b"setCornerRadius:",
                            (c_double,), (c_double(float(_RADIUS)),))
                        msg(c_void_p, layer, b"setMasksToBounds:",
                            (c_bool,), (True,))
            except Exception as e:
                keytap._gtap_log(f"coherence glass: {e}")

        def toggle(self):
            if self.isVisible():
                if getattr(self, '_anim', None) is not None:
                    self._anim.stop()
                    self._anim = None
                self._space_timer.stop()
                self.hide()
                # Only pull Anki back to the front if it was already the focused
                # app. If the user is working in another app, closing the caption
                # (Tab+\) must NOT steal focus back to Anki.
                if state._anki_focused and not mw.isMinimized() and mw.isVisible():
                    mw.activateWindow()
            else:
                # Start off-screen in the slide-in direction.
                # The window uses a placeholder width centered on screen so the
                # animation slides in vertically without any horizontal jump.
                # The view's geometry is set wider than the window so the
                # viewport is spacious enough to measure natural content width.
                avail  = mw.app.primaryScreen().availableGeometry()
                row, col = _coherence_rc()
                narrow = col != 'center'
                vp_w   = max(440, avail.width() * 3 // 8) if narrow else 2000
                init_w = vp_w if narrow else min(400, avail.width() - 80)
                # Start off-screen at the TARGET column's x (not centered) so the
                # slide-in is purely vertical — otherwise a corner anchor first
                # flashed centered, then jumped sideways to the corner.
                _M = 16
                if col == 'left':
                    ix = avail.x() + _M
                elif col == 'right':
                    ix = avail.x() + avail.width() - init_w - _M
                else:
                    ix = avail.x() + (avail.width() - init_w) // 2
                # Slide in from the bottom edge for a bottom anchor, else the top.
                # Start BELOW the physical screen bottom (not avail.bottom(), which
                # sits above the Dock and left the placeholder — sized with a GUESS
                # width — briefly visible; for center/right its x depends on width,
                # so it flashed at the wrong x then jumped to the real-width x).
                _full = mw.app.primaryScreen().geometry()
                if row == 'bottom':
                    self.setGeometry(ix, _full.y() + _full.height() + 10, init_w, 60)
                else:
                    self.setGeometry(ix, avail.y() - 300, init_w, 200)
                self._view.move(0, 0)
                self._view.resize(*self._vp())
                # Apply the non-activating NSPanel style (style bit 128,
                # becomesKeyOnlyIfNeeded, level, CanJoinAllSpaces) BEFORE the first
                # show(). _apply_glass otherwise runs only after the first render,
                # so the very first show ordered a not-yet-nonactivating panel to
                # the front and stole focus from a fullscreen app. winId() forces
                # native-window creation, so the NSPanel exists to configure here.
                try:
                    self._apply_glass()
                except Exception:
                    pass
                self.show()  # Tool/NSPanel + WA_ShowWithoutActivating → no focus steal
                self._last_fs = None       # re-evaluate the anchor fresh this open
                self._space_timer.start()  # re-anchor on fullscreen↔desktop changes
                # Wake the WebEngine renderer before handing it HTML (avoids
                # blank-on-reopen) WITHOUT stealing focus. The old code activated
                # NSApp here as the "surest wake" — but activating pulls key focus
                # off whatever window is frontmost, incl. a fullscreen app OR Anki's
                # own fullscreen reviewer, which then stops receiving keys (the
                # reported Tab+\ focus-steal). It's unnecessary: refresh() forces
                # the page lifecycle Active (_force_active) and the launch wrapper's
                # --disable-renderer-backgrounding flags keep the renderer painting.
                QTimer.singleShot(80, self.refresh)
                if not state._anki_focused:
                    # A backgrounded renderer can still come up cold; a second pass
                    # (no typewriter replay) makes sure the caption isn't left blank.
                    QTimer.singleShot(260, lambda: self.refresh(animate_text=False))

    return HUD()


_coherence_hud: Optional[object] = None

# Menu fade-in token. The fade fires once per token: the injected script fades
# only when sessionStorage's stored token differs from the current one, then
# stores it. Anki's 2–3 re-render burst shares one token → a single fade; each
# armed navigation (startup, opening a deck → overview, returning from study)
# bumps the token → fades again, even within the same session/webview. Using a
# token instead of a time window means opening a deck right after the deck
# browser faded still fades (they'd share sessionStorage otherwise).
_menu_fade_token = 1


def _arm_menu_fade():
    global _menu_fade_token
    _menu_fade_token += 1


def _nudge_coherence(dr, dc):
    """Tab+arrow: move the caption HUD one cell across the 3x3 screen grid, clamped
    at the edges. A pure move (same width class) glides; crossing into/out of the
    centered column re-renders because the wrap width changes."""
    row, col = _coherence_rc()
    ri = max(0, min(2, _COH_ROWS.index(row) + dr))
    ci = max(0, min(2, _COH_COLS.index(col) + dc))
    new_pos = f"{_COH_ROWS[ri]}-{_COH_COLS[ci]}"
    old_narrow = (col != 'center')
    cfg = _cfg() or {}
    cfg['coherence_position'] = new_pos
    mw.addonManager.writeConfig(__name__, cfg)
    keytap._gtap_log(f"coherence_position → {new_pos}")
    if _coherence_hud and _coherence_hud.isVisible():
        if (_COH_COLS[ci] != 'center') != old_narrow:
            # wrap width changed → re-render + reposition (no typewriter replay:
            # it's the same card, just a new position)
            _coherence_hud.refresh(animate_text=False)
        else:
            _coherence_hud._reposition(_coherence_hud.width(),
                                       _coherence_hud.height(),
                                       animate=True, move=True)


def _prewarm_coherence_hud():
    """Create the caption HUD up front (hidden) and apply its NSPanel styling now,
    at startup while Anki is focused — NOT lazily on the user's first Tab+\\.

    The one-time `setStyleMask` that adds the non-activating style bit rebuilds the
    window frame and cycles key state; done during the first open over a fullscreen
    app it stole that window's focus (every later open reuses the already-styled
    panel and doesn't, hence the "first time only" steal). Realizing + styling the
    panel here, hidden, moves that churn to launch (nothing to steal from), so the
    first real open just shows an already-non-activating panel."""
    # Caption HUD is a native non-activating NSPanel — macOS only.
    if sys.platform != "darwin":
        return
    global _coherence_hud
    if _coherence_hud is not None:
        return
    try:
        _coherence_hud = _make_coherence_hud()
        _coherence_hud.winId()        # realize the native NSPanel
        _coherence_hud._apply_glass()  # set the non-activating style bit while hidden
        keytap._gtap_log("coherence HUD prewarmed")
    except Exception as e:
        _coherence_hud = None
        keytap._gtap_log(f"coherence prewarm error: {e}")


def _toggle_coherence():
    # Native NSPanel caption HUD — macOS only.
    if sys.platform != "darwin":
        return
    global _coherence_hud
    keytap._gtap_log("_toggle_coherence called")
    if _coherence_hud is None:
        try:
            keytap._gtap_log("creating HUD...")
            _coherence_hud = _make_coherence_hud()
            keytap._gtap_log(f"HUD created: {type(_coherence_hud).__name__}")
        except Exception as e:
            import traceback
            keytap._gtap_log(f"coherence init error: {e}\n{traceback.format_exc()}")
            return
    keytap._gtap_log(f"toggling HUD visible={_coherence_hud.isVisible()}")
    _coherence_hud.toggle()
    # Caption ownership of the timing feedback flips with the HUD: re-evaluate
    # the countdown bar (hide when entering, restore on exit) and re-target any
    # live pulse to the new owner window (main window ↔ HUD).
    try:
        if card_timer._card_timer_instance is not None:
            card_timer._card_timer_instance.sync_bar_pref()
            ov = getattr(card_timer._card_timer_instance, "_overlay", None)
            if ov is not None and ov.isVisible():
                ov.set_active(False)
                # Re-show on the new host only if it's on screen: entering caption
                # → the HUD (always visible); exiting → the main window (skip when
                # it's minimized, else the flare lingers at its stale location).
                if _caption_visible() or _main_on_screen():
                    ov.set_active(True)
                    # The HUD slides/measures over ~120ms after toggle-on, so its
                    # frame isn't final yet — reshape the glow once it settles.
                    QTimer.singleShot(180, lambda o=ov: o.reposition()
                                      if o.isVisible() else None)
    except Exception:
        pass


def _coherence_refresh(animate_text=True):
    if _coherence_hud and _coherence_hud.isVisible():
        _coherence_hud.refresh(animate_text=animate_text)


def _caption_visible():
    """True while the coherence/caption HUD (Tab+\\) is on screen. In caption
    mode the HUD owns the timing feedback: the countdown bar is suppressed and
    the red/green pulse reshapes itself to the HUD frame instead of the main
    window."""
    try:
        return bool(_coherence_hud is not None and _coherence_hud.isVisible())
    except Exception:
        return False


def _main_on_screen():
    """True when the main Anki window is actually visible (not minimized/hidden).
    The card-timer bar and red flare ride the main window, so they must never be
    shown against it while it's minimized — otherwise they linger at the stale
    window location (e.g. after exiting caption mode with Anki minimized)."""
    try:
        return bool(mw.isVisible() and not mw.isMinimized())
    except Exception:
        return True
