"""Per-card lingering-warning bar under the toolbar."""

import sys
from ctypes import c_void_p, c_bool, c_long, c_ulong
from aqt import mw, gui_hooks
from aqt.qt import Qt, QTimer

from .bridge import _bridge
from .config import _cfg
from . import state
from . import focus, hud

# ---------------------------------------------------------------------------
# Per-card "lingering" warning bar (under the top toolbar)
# ---------------------------------------------------------------------------
_card_timer_instance = None


def _make_card_timer():
    """A thin progress bar just under the toolbar that fills over 10–30s (scaled
    by card length). When it fills it turns red — a 'you've lingered' nudge,
    replacing the AnKing note-type timer. Mirrors the bottom XP bar."""
    from PyQt6.QtWidgets import QWidget
    from PyQt6.QtGui import QColor, QPainter, QBrush
    from PyQt6.QtCore import QRectF, QPoint

    cfg = _cfg()
    MIN_S = float(cfg.get("card_timer_min_s", 1.75))
    MAX_S = float(cfg.get("card_timer_max_s", 30))
    CHARS_MAX = max(1, int(cfg.get("card_timer_chars_for_max", 900)))
    # >1 makes short/medium cards stay near MIN_S (fill quicker); only long cards approach MAX_S
    CURVE = float(cfg.get("card_timer_curve", 2.6))
    BAR_H = 3
    TICK_MS = 50
    OPACITY = float(cfg.get("card_timer_opacity", 0.45))   # more transparent
    OFFSET_Y = int(cfg.get("card_timer_offset_y", -4))     # negative = nudge DOWN, clear of the toolbar buttons
    NARROW_PX = int(cfg.get("card_timer_narrow_px", 16))   # trim total width (split evenly both sides)
    BG_PULSE = bool(cfg.get("card_timer_bg_pulse", True))  # pulse the window edges when the timer fills
    PULSE_BAND = int(cfg.get("card_timer_pulse_band", 120))  # (legacy; kept for config compat)
    PULSE_MAX_A = int(cfg.get("card_timer_pulse_alpha", 14))  # peak edge alpha 0–255 (lower = more transparent)
    PULSE_MS = int(cfg.get("card_timer_pulse_ms", 2200))      # one in/out pulse cycle (higher = slower)
    PULSE_RADIUS = int(cfg.get("card_timer_pulse_radius",     # match the window's rounded corners
                               int(cfg.get("win_corner_radius", 11))))
    # fraction of the way each edge gradient reaches toward the centre (0.5 = centre)
    PULSE_REACH = max(0.05, min(0.5, float(cfg.get("card_timer_pulse_reach", 0.45))))

    class TimerBar(QWidget):
        def __init__(self):
            super().__init__(None,
                Qt.WindowType.FramelessWindowHint |
                Qt.WindowType.WindowStaysOnTopHint |
                Qt.WindowType.Tool)
            self.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground)
            self.setAttribute(Qt.WidgetAttribute.WA_ShowWithoutActivating)
            self.setFixedHeight(BAR_H)
            self._p = 0.0
            self._warn = False
            self._native_done = False
            self._pulse = 0.0            # 0..2pi phase for the overtime pulse
            self._pulse_t = QTimer(self)
            self._pulse_t.setInterval(33)   # ~30 fps
            self._pulse_t.timeout.connect(self._pulse_tick)
            self.setWindowOpacity(OPACITY)

        def _pulse_tick(self):
            import math
            self._pulse = (self._pulse + 0.18) % (2 * math.pi)
            self.update()

        def _fallback_full(self):
            try:
                tl = mw.web.mapToGlobal(QPoint(0, 0))
                self.setGeometry(tl.x() + NARROW_PX // 2, tl.y() - OFFSET_Y,
                                 max(1, mw.web.width() - NARROW_PX), BAR_H)
            except Exception:
                pass

        def reposition(self):
            # Focus Mode: hide the progress bar entirely (distracting in focus).
            # Gate on Focus being ARMED (_focus_mode_on), not just chrome currently
            # hidden — after returning to the reviewer the chrome is briefly back
            # (_focus_hidden False) before the idle re-hide, and the bar must not
            # reappear in that window.
            if focus._focus_hidden or focus._focus_mode_on:
                self.hide()
                return
            # Caption mode replaces the countdown bar with the caption pulse.
            if hud._caption_visible():
                self.hide()
                return
            # Match the width/position of the nav button island (Decks/Add/Browse/
            # Stats/Sync), which lives inside the toolbar webview's DOM — measure it
            # in JS, then map to window coords. Falls back to full content width.
            tw = getattr(mw, "toolbarWeb", None) or getattr(getattr(mw, "toolbar", None), "web", None)
            if tw is None:
                self._fallback_full()
                return
            js = ("(function(){var t=document.querySelector('.toolbar');"
                  "if(t){var r=t.getBoundingClientRect();if(r.width>0)return [r.left,r.bottom,r.width];}"
                  "var it=document.querySelectorAll('.hitem, a.hitem');"
                  "var l=1e9,rt=-1e9,b=-1e9,n=0;"
                  "for(var i=0;i<it.length;i++){var q=it[i].getBoundingClientRect();"
                  "if(!q.width)continue;l=Math.min(l,q.left);rt=Math.max(rt,q.right);b=Math.max(b,q.bottom);n++;}"
                  "return n?[l,b,rt-l]:null;})()")

            def _cb(rect):
                try:
                    if not rect:
                        self._fallback_full()
                        return
                    base = tw.mapToGlobal(QPoint(0, 0))
                    left = base.x() + int(round(rect[0])) + NARROW_PX // 2
                    y = base.y() + int(round(rect[1])) - OFFSET_Y
                    w = max(1, int(round(rect[2])) - NARROW_PX)
                    self.setGeometry(left, y, w, BAR_H)
                except Exception:
                    pass

            try:
                tw.evalWithCallback(js, _cb)
            except Exception:
                try:
                    tw.page().runJavaScript(js, _cb)
                except Exception:
                    self._fallback_full()

        def set_state(self, p, warn):
            self._p = max(0.0, min(1.0, p))
            self._warn = warn
            try:
                if warn:
                    if not self._pulse_t.isActive():
                        self._pulse = 0.0
                        self._pulse_t.start()
                else:
                    self._pulse_t.stop()
            except RuntimeError:
                pass   # C++ QTimer already gone (bar being torn down)
            self.update()

        def showEvent(self, ev):
            super().showEvent(ev)
            if not self._native_done:
                QTimer.singleShot(0, self._apply_native)

        def hideEvent(self, ev):
            super().hideEvent(ev)
            self._pulse_t.stop()
            self._detach_native()
            self._native_done = False

        def _detach_native(self):
            try:
                msg, cls = _bridge()
                ns = msg(c_void_p, c_void_p(int(self.winId())), b"window")
                if not ns:
                    return
                parent = msg(c_void_p, ns, b"parentWindow")
                if parent:
                    msg(None, parent, b"removeChildWindow:", (c_void_p,), (ns,))
                msg(None, ns, b"orderOut:", (c_void_p,), (None,))
            except Exception:
                pass

        def _apply_native(self):
            try:
                msg, cls = _bridge()
                ns = msg(c_void_p, c_void_p(int(self.winId())), b"window")
                if not ns:
                    return
                msg(c_void_p, ns, b"setOpaque:", (c_bool,), (False,))
                msg(c_void_p, ns, b"setHasShadow:", (c_bool,), (False,))
                msg(c_void_p, ns, b"setBackgroundColor:", (c_void_p,),
                    (msg(c_void_p, cls("NSColor"), b"clearColor"),))
                if not msg(c_void_p, ns, b"parentWindow"):
                    main = msg(c_void_p, c_void_p(int(mw.winId())), b"window")
                    if main:
                        msg(c_void_p, main, b"addChildWindow:ordered:",
                            (c_void_p, c_long), (ns, 1))
                self._native_done = True
            except Exception:
                pass

        def paintEvent(self, ev):
            if self._p <= 0:
                return
            import math
            pt = QPainter(self)
            pt.setRenderHint(QPainter.RenderHint.Antialiasing)
            pt.setPen(Qt.PenStyle.NoPen)
            fullw = float(self.width())
            hrad = min(float(BAR_H) / 2.0, fullw / 2.0)
            if self._warn:
                # overtime: pulse a full-width red glow behind the bar to alert.
                # Phase from a shared clock anchored at expiry (_flare_origin) so the
                # bar pulses IN SYNC with the PulseOverlay flare AND the first cycle
                # starts from the trough.
                import time
                phase = ((time.monotonic() - state._flare_origin) * 1000.0 % PULSE_MS) / PULSE_MS
                s = 0.5 - 0.5 * math.cos(2 * math.pi * phase)   # 0..1, synced
                glow = QColor(255, 60, 60, int(40 + 150 * s))
                pt.setBrush(QBrush(glow))
                pt.drawRoundedRect(QRectF(0.0, 0.0, fullw, float(BAR_H)), hrad, hrad)
                col = QColor(255, 70, 70, int(180 + 60 * s))
            else:
                # cyan (calm) → amber as it fills toward the warning
                r = int(90 + 165 * self._p)
                g = max(0, int(210 - 120 * self._p))
                b = max(0, int(255 - 200 * self._p))
                col = QColor(r, g, b, 205)
            pt.setBrush(QBrush(col))
            w = fullw * self._p
            rad = min(float(BAR_H) / 2.0, w / 2.0)
            pt.drawRoundedRect(QRectF(0.0, 0.0, w, float(BAR_H)), rad, rad)
            pt.end()

    class PulseOverlay(QWidget):
        """Full-screen, mouse-transparent child window that pulses a red edge-glow
        when the card timer fills. The four edge gradients reach ~PULSE_REACH of the
        way to the centre; corners are rounded to PULSE_RADIUS. Covers the whole
        window frame (incl. the top drag bar) — sits above the toolbar buttons.

        color/max_a/pulse_ms/cycles are per-instance so the same widget serves both
        the red "time's up" flare (loops forever until the card flips: cycles=None)
        and the green "done for today" flare (a short one-shot burst: cycles=N)."""
        def __init__(self, color=(255, 45, 45), max_a=None, pulse_ms=None,
                     cycles=None):
            # NOTE: no WindowStaysOnTopHint — addChildWindow(ordered:Above) already
            # keeps this above the main window, and the StaysOnTop/Tool "floating
            # panel" promotion made the main window resign key when the flare showed,
            # firing window.blur in the AMBOSS webview (dismissed its preview/tooltip).
            super().__init__(None,
                Qt.WindowType.FramelessWindowHint |
                Qt.WindowType.Tool)
            self.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground)
            self.setAttribute(Qt.WidgetAttribute.WA_ShowWithoutActivating)
            self.setAttribute(Qt.WidgetAttribute.WA_TransparentForMouseEvents)
            self._prog = 0.0
            self._native_done = False
            self._color = color
            self._max_a = PULSE_MAX_A if max_a is None else max_a
            self._pulse_ms = PULSE_MS if pulse_ms is None else pulse_ms
            self._radius = float(PULSE_RADIUS)   # outer corner radius; matches
            #                                      the HUD's when in caption mode
            self._cycles = cycles          # None = loop forever; N = flash N times
            self._cycles_done = 0
            self._pulse_t = QTimer(self)
            self._pulse_t.setInterval(33)   # ~30 fps
            self._pulse_t.timeout.connect(self._tick)

        def _tick(self):
            import math
            self._prog += 33.0 / max(1, self._pulse_ms)
            if self._prog >= 1.0:
                self._prog = 0.0            # completed one in/out cycle
                if self._cycles is not None:
                    self._cycles_done += 1
                    if self._cycles_done >= self._cycles:
                        self.set_active(False)   # one-shot burst finished
                        return
            # Drive the in/out pulse via WINDOW OPACITY over a static paint (cheap,
            # and freezes the dither). Red (loop) locks phase to the shared wall clock
            # to stay synced with the timer bar; green (one-shot) uses _prog.
            if self._cycles is None:
                import time
                phase = ((time.monotonic() - state._flare_origin) * 1000.0 % self._pulse_ms) / self._pulse_ms
            else:
                phase = self._prog
            env = 0.12 + 0.88 * (0.5 - 0.5 * math.cos(2 * math.pi * phase))
            try:
                self.setWindowOpacity(env)
            except Exception:
                pass

        def reposition(self):
            # Caption mode: the pulse belongs to the coherence HUD, not the main
            # window — shape the glow to the HUD's frame (matching its 16px
            # corner) so it reads as the caption itself pulsing. Use geometry()
            # (the client rect = the visible box), NOT frameGeometry(): the HUD is
            # frameless, so on macOS frameGeometry reports a top edge a few px
            # above the box and the glow spills above it.
            try:
                if hud._caption_visible():
                    # The HUD window is sized exactly to the visible box (see
                    # _vp / _apply_fit), so the flare is simply the whole HUD window.
                    # Prefer the HUD's SETTLED target rect over its live geometry:
                    # while the box is mid-resize (bottom-anchored), the live rect's
                    # top hasn't moved yet, which left the flare a few px above the
                    # top once the box settled.
                    hg = getattr(hud._coherence_hud, '_target_geom', None) \
                        or hud._coherence_hud.geometry()
                    if hg.width() > 0 and hg.height() > 0:
                        self._radius = 16.0   # matches HUD _RADIUS
                        self.setGeometry(hg.x(), hg.y(), hg.width(), hg.height())
                        return
            except Exception:
                pass
            self._radius = float(PULSE_RADIUS)
            # Cover the whole window FRAME (frameGeometry includes the native
            # titlebar/drag strip) so the glow reaches every screen edge. In native
            # fullscreen frameGeometry can under-report (glow stops short of the
            # bottom), so use the window's authoritative screen rect there.
            try:
                if mw.isFullScreen():
                    scr = mw.screen()
                    if scr is None and mw.windowHandle() is not None:
                        scr = mw.windowHandle().screen()
                    if scr is not None:
                        g = scr.geometry()
                        if g.width() > 0 and g.height() > 0:
                            self.setGeometry(g.x(), g.y(), g.width(), g.height())
                            return
                fg = mw.frameGeometry()
                if fg.width() > 0 and fg.height() > 0:
                    self.setGeometry(fg.x(), fg.y(), fg.width(), fg.height())
                    return
                tl = mw.mapToGlobal(QPoint(0, 0))
                self.setGeometry(tl.x(), tl.y(), mw.width(), mw.height())
            except Exception:
                pass

        def set_active(self, on):
            if on:
                self.reposition()
                self._prog = 0.0
                self._cycles_done = 0
                # Seed at the trough so opacity-driven pulse doesn't flash full-bright
                # before the first tick.
                self.setWindowOpacity(0.12)
                if not self.isVisible():
                    self.show()
                if not self._pulse_t.isActive():
                    self._pulse_t.start()
                self.update()
            else:
                try:
                    self._pulse_t.stop()
                except RuntimeError:
                    pass
                self.hide()

        def showEvent(self, ev):
            super().showEvent(ev)
            if not self._native_done:
                QTimer.singleShot(0, self._apply_native)

        def hideEvent(self, ev):
            super().hideEvent(ev)
            self._detach_native()
            self._native_done = False

        def _detach_native(self):
            try:
                msg, cls = _bridge()
                ns = msg(c_void_p, c_void_p(int(self.winId())), b"window")
                if not ns:
                    return
                parent = msg(c_void_p, ns, b"parentWindow")
                if parent:
                    msg(None, parent, b"removeChildWindow:", (c_void_p,), (ns,))
                msg(None, ns, b"orderOut:", (c_void_p,), (None,))
            except Exception:
                pass

        def _apply_native(self):
            try:
                msg, cls = _bridge()
                ns = msg(c_void_p, c_void_p(int(self.winId())), b"window")
                if not ns:
                    return
                msg(c_void_p, ns, b"setOpaque:", (c_bool,), (False,))
                msg(c_void_p, ns, b"setHasShadow:", (c_bool,), (False,))
                msg(c_void_p, ns, b"setIgnoresMouseEvents:", (c_bool,), (True,))
                msg(c_void_p, ns, b"setBackgroundColor:", (c_void_p,),
                    (msg(c_void_p, cls("NSColor"), b"clearColor"),))
                # 1 = CanJoinAllSpaces, 256 = FullScreenAuxiliary — shows in native fullscreen.
                msg(c_void_p, ns, b"setCollectionBehavior:", (c_ulong,), (1 | 256,))
                main = msg(c_void_p, c_void_p(int(mw.winId())), b"window")
                # In caption mode the HUD floats above the main window (level 3),
                # so a glow parented to the main window would hide behind the
                # HUD's tinted background. Parent it to the HUD instead — ordered
                # above — so it wraps the caption.
                host = main
                if hud._caption_visible():
                    try:
                        hw = msg(c_void_p, c_void_p(int(hud._coherence_hud.winId())),
                                 b"window")
                        if hw:
                            host = hw
                    except Exception:
                        pass
                if not msg(c_void_p, ns, b"parentWindow"):
                    if host:
                        msg(c_void_p, host, b"addChildWindow:ordered:",
                            (c_void_p, c_long), (ns, 1))
                # Reassert the main window as key so any transient resign-key from
                # showing this overlay is undone — keeps DOM focus in the AMBOSS /
                # reviewer webview (no window.blur). Only when Anki is frontmost, so
                # we never steal focus from another app.
                if main and state._anki_focused:
                    msg(None, main, b"makeKeyWindow")
                self._native_done = True
            except Exception:
                pass

        def paintEvent(self, ev):
            from PyQt6.QtGui import QLinearGradient, QPainterPath
            # Paint ONCE at PEAK alpha; the in/out pulse is driven by window opacity
            # in _tick. Painting per-frame re-rastered the low-alpha gradient every
            # tick, so its 8-bit banding × the vibrancy dither "crawled" as scattered
            # pixels over the transparent card background. A static paint + opacity
            # animation freezes that pattern → smooth glow.
            a = int(self._max_a)
            if a <= 0:
                return
            cr, cg, cb = self._color
            w = float(self.width()); h = float(self.height())
            if w <= 0 or h <= 0:
                return
            pt = QPainter(self)
            pt.setRenderHint(QPainter.RenderHint.Antialiasing)
            pt.setPen(Qt.PenStyle.NoPen)
            # round the outer corners of the glow frame
            clip = QPainterPath()
            clip.addRoundedRect(QRectF(0, 0, w, h), float(self._radius), float(self._radius))
            pt.setClipPath(clip)
            # Lighten (max) compositing so overlapping edge bands don't ADD in the
            # corners — that additive brightening was the visible colour seam.
            pt.setCompositionMode(QPainter.CompositionMode.CompositionMode_Lighten)
            # each edge gradient reaches PULSE_REACH of the way to the centre
            bv = h * PULSE_REACH   # top/bottom band height
            bh = w * PULSE_REACH   # left/right band width
            edge = QColor(cr, cg, cb, a)
            clear = QColor(cr, cg, cb, 0)
            gt = QLinearGradient(0, 0, 0, bv)
            gt.setColorAt(0.0, edge); gt.setColorAt(1.0, clear)
            pt.fillRect(QRectF(0, 0, w, bv), QBrush(gt))
            gb = QLinearGradient(0, h, 0, h - bv)
            gb.setColorAt(0.0, edge); gb.setColorAt(1.0, clear)
            pt.fillRect(QRectF(0, h - bv, w, bv), QBrush(gb))
            gl = QLinearGradient(0, 0, bh, 0)
            gl.setColorAt(0.0, edge); gl.setColorAt(1.0, clear)
            pt.fillRect(QRectF(0, 0, bh, h), QBrush(gl))
            gr = QLinearGradient(w, 0, w - bh, 0)
            gr.setColorAt(0.0, edge); gr.setColorAt(1.0, clear)
            pt.fillRect(QRectF(w - bh, 0, bh, h), QBrush(gr))
            pt.end()

    class Manager:
        def __init__(self):
            self._bar = TimerBar()
            self._overlay = PulseOverlay() if BG_PULSE else None
            # Green "done for today" flash — a short one-shot burst (per-instance
            # colour/cycles). Params are refreshed live from config in card_done_flash.
            self._green = PulseOverlay(color=(70, 220, 110), cycles=1) if BG_PULSE else None
            self._elapsed = 0.0
            self._dur = MIN_S * 1000.0
            self._active = False
            self._t = QTimer(mw)
            self._t.setInterval(TICK_MS)
            self._t.timeout.connect(self._tick)
            # Red flare is suppressed while an AMBOSS hover tip is on screen (the
            # native overlay window sitting over the reviewer webview makes tippy
            # flicker). _red_wanted = "the timer has filled, red SHOULD show unless
            # suppressed"; a ~150ms poll of mw.web toggles actual visibility.
            self._red_wanted = False
            self._tip_open = False
            self._cooldown_until = 0.0   # monotonic time before which red stays hidden
            self._bar_gen = 0            # invalidates a pending delayed bar fade-in
            self._bar_fade = None        # keep a ref to the opacity animation
            self._amboss_poll = QTimer(mw)
            self._amboss_poll.setInterval(150)
            self._amboss_poll.timeout.connect(self._poll_amboss_tip)

        def _tick(self):
            if not self._active:
                return
            self._elapsed += TICK_MS
            p = self._elapsed / self._dur
            self._bar.set_state(min(1.0, p), p >= 1.0)
            if p >= 1.0:
                self._t.stop()   # hold the warning; nothing left to animate
                # Anchor the pulse phase to NOW so the first cycle starts from the
                # trough (not mid-clock) — bar + overlay share this origin, stay synced.
                import time
                state._flare_origin = time.monotonic()
                # The blue break cue overrides the red pulse — don't show red while a
                # break is due (tint) or in progress; also honour the on/off setting.
                if (self._overlay and not state._break_tint_active and not state._pomo_on_break
                        and bool(_cfg().get("card_timer_red_flare", True))):
                    self._red_wanted = True
                    if not self._amboss_poll.isActive():
                        self._amboss_poll.start()
                    self._poll_amboss_tip()   # decide visibility after checking for a tip

        def _poll_amboss_tip(self):
            # While the red flare should be up, check whether an AMBOSS hover tip is
            # on screen; if so, hide the flare (it flickers the tippy tooltip).
            if not self._red_wanted:
                self._amboss_poll.stop()
                return
            w = getattr(mw, "web", None)
            if w is None:
                return
            js = ("(function(){var els=document.querySelectorAll("
                  "'.tippy-popper,.tippy-box,.tippy-tooltip,amboss-tooltip-content');"
                  "for(var i=0;i<els.length;i++){var e=els[i];"
                  "if(e.getAttribute&&e.getAttribute('data-state')==='hidden')continue;"
                  "var r=e.getBoundingClientRect();"
                  "if(r.width>2&&r.height>2)return true;}return false;})()")

            def _cb(res):
                self._tip_open = bool(res)
                self._update_red()
            try:
                w.evalWithCallback(js, _cb)
            except Exception:
                try:
                    w.page().runJavaScript(js, _cb)
                except Exception:
                    pass

        def _update_red(self):
            """Apply the desired red-flare visibility given wanted/suppressed state.
            After an AMBOSS tip closes we wait card_timer_flare_cooldown_s before the
            flare returns, so it doesn't snap back the instant you move off a term."""
            if self._overlay is None:
                return
            import time
            now = time.monotonic()
            if self._tip_open:
                # Keep pushing the cooldown out while the tip is up; it starts
                # counting down from the moment the tip actually closes.
                self._cooldown_until = now + float(
                    _cfg().get("card_timer_flare_cooldown_s", 2.0))
            # Caption mode can suppress the flare entirely (setting) — the HUD is a
            # small reading surface and the edge glow is often unwanted there.
            caption_up = hud._caption_visible()
            if caption_up and not bool(_cfg().get("caption_flare", True)):
                if self._overlay.isVisible():
                    self._overlay.set_active(False)
                return
            # The flare lives on the caption HUD when it's up, otherwise on the
            # main window — so only show it when its host is actually on screen
            # (never against a minimized main window).
            host_on_screen = caption_up or hud._main_on_screen()
            show = (self._red_wanted and not self._tip_open and now >= self._cooldown_until
                    and not state._break_tint_active and not state._pomo_on_break
                    and host_on_screen)
            if show and not self._overlay.isVisible():
                self._overlay.set_active(True)
            elif not show and self._overlay.isVisible():
                self._overlay.set_active(False)

        def start_card(self, text_len):
            # Read the shape params LIVE so settings changes apply to the very next
            # card with no rebuild (the closure values are just fallbacks).
            _c = _cfg()
            # Direct model: "Seconds until flare" is the base time for a ~1-sentence
            # card. Card length still nudges it, but the multiplier is CLAMPED so a
            # long AnKing cloze can't balloon the timer (was: unbounded len/80, which
            # pushed long cards to 60s+). len_min/max_mult default 0.5..1.5.
            base_secs = float(_c.get("card_timer_seconds", 8.0))
            sentence_chars = max(1, int(_c.get("card_timer_sentence_chars", 80)))
            len_lo = float(_c.get("card_timer_len_min_mult", 0.5))
            len_hi = float(_c.get("card_timer_len_max_mult", 1.5))
            cap_s = float(_c.get("card_timer_cap_s", 600.0))
            floor_s = float(_c.get("card_timer_min_s", MIN_S))
            len_mult = max(len_lo, min(len_hi, max(0, text_len) / sentence_chars))
            dur_s = base_secs * len_mult
            dur_s = min(cap_s, max(floor_s, dur_s))
            self._dur = dur_s * 1000.0
            self._elapsed = 0.0
            self._active = True
            self._red_wanted = False
            self._tip_open = False
            self._cooldown_until = 0.0
            self._amboss_poll.stop()
            if self._overlay:
                self._overlay.set_active(False)   # new card → clear any lingering pulse
            self._bar.reposition()
            self._bar.set_state(0.0, False)
            # Focus Mode keeps the bar hidden; the "Show timer bar" setting can also
            # hide it (independent of the red flare, which still fires either way).
            # Don't pop the bar in immediately — wait a beat, then fade it in, so it
            # doesn't flash on every card flip. _bar_gen invalidates the pending fade
            # if the card changes first.
            self._bar_gen += 1
            self._bar.hide()
            if not (focus._focus_hidden or focus._focus_mode_on) and self._bar_pref_on():
                delay = int(_c.get("card_timer_bar_delay_ms", 500))
                gen = self._bar_gen
                QTimer.singleShot(delay, lambda g=gen: self._fade_in_bar(g))
            if not self._t.isActive():
                self._t.start()

        def card_done_flash(self):
            """Green edge-flare celebrating a card that's finished for the day."""
            if self._green is None:
                return
            _c = _cfg()
            if not bool(_c.get("card_timer_green_flare", True)):
                return
            if hud._caption_visible() and not bool(_c.get("caption_flare", True)):
                return
            if state._break_tint_active or state._pomo_on_break:
                return
            # Refresh look/length live so settings changes apply with no rebuild.
            self._green._max_a = int(_c.get("card_timer_green_alpha", 16))
            self._green._cycles = max(1, int(_c.get("card_timer_green_cycles", 1)))
            self._green._pulse_ms = int(_c.get("card_timer_green_ms", 900))
            self._green.set_active(True)

        def _fade_in_bar(self, gen):
            # Fired ~card_timer_bar_delay_ms after the card started; skip if the card
            # already changed, was answered, or the bar is otherwise not wanted.
            if gen != self._bar_gen or not self._active:
                return
            if focus._focus_hidden or focus._focus_mode_on or not self._bar_pref_on():
                return
            self._bar.reposition()
            self._bar.setWindowOpacity(0.0)
            self._bar.show()
            from aqt.qt import QPropertyAnimation, QEasingCurve
            anim = QPropertyAnimation(self._bar, b"windowOpacity")
            anim.setDuration(int(_cfg().get("card_timer_bar_fade_ms", 260)))
            anim.setStartValue(0.0)
            anim.setEndValue(OPACITY)
            anim.setEasingCurve(QEasingCurve.Type.InOutQuad)
            anim.start()
            self._bar_fade = anim

        def _bar_pref_on(self):
            # Caption mode owns the timing feedback via the pulse, so the
            # countdown bar is suppressed while the coherence HUD is up. It also
            # rides the main window, so never show it while that's minimized.
            return (bool(_cfg().get("card_timer_show_bar", True))
                    and not hud._caption_visible()
                    and hud._main_on_screen())

        def sync_bar_pref(self):
            """Show/hide the bar immediately when the setting is toggled mid-card."""
            if self._active and not (focus._focus_hidden or focus._focus_mode_on) and self._bar_pref_on():
                self._bar.reposition()
                self._bar.setWindowOpacity(OPACITY)
                self._bar.show()
            else:
                self._bar.hide()

        def apply_focus(self):
            """Hide the progress bar in Focus Mode; restore it (if a card is active)
            when Focus Mode turns off. Also make the red flare LESS transparent in
            Focus Mode (the chrome is gone, so a stronger edge glow reads better)."""
            if self._overlay is not None:
                _c = _cfg()
                base = int(_c.get("card_timer_pulse_alpha", PULSE_MAX_A))
                foc = int(_c.get("card_timer_pulse_alpha_focus", 24))
                self._overlay._max_a = foc if focus._focus_hidden else base
                if self._overlay.isVisible():
                    self._overlay.update()   # repaint at the new alpha immediately
            if focus._focus_hidden or focus._focus_mode_on or not self._bar_pref_on():
                self._bar.hide()
            elif self._active:
                self._bar.setWindowOpacity(OPACITY)
                self._bar.show()
                # The toolbar webview was just re-shown and needs a beat to re-lay
                # out before we can measure the button island — reposition now and
                # again as it settles (otherwise the bar lands at a stale spot).
                for d in (0, 130, 320):
                    QTimer.singleShot(d, self._bar.reposition)

        def stop_card(self):
            self._active = False
            self._t.stop()
            self._red_wanted = False
            self._tip_open = False
            self._cooldown_until = 0.0
            self._amboss_poll.stop()
            self._bar.set_state(0.0, False)
            self._bar.hide()
            if self._overlay:
                self._overlay.set_active(False)

        def hide_bar(self):
            self._bar.hide()
            if self._overlay:
                self._overlay.set_active(False)

        def reposition(self):
            if self._active:
                self._bar.reposition()
                if self._overlay and self._overlay.isVisible():
                    self._overlay.reposition()
            if self._green and self._green.isVisible():
                self._green.reposition()

        def stop(self):
            # unregister hooks FIRST so a queued reviewer callback can't fire
            # against the about-to-be-destroyed bar (RuntimeError: C++ deleted)
            try:
                if self._on_q and hasattr(gui_hooks, "reviewer_did_show_question"):
                    gui_hooks.reviewer_did_show_question.remove(self._on_q)
            except Exception:
                pass
            try:
                if self._on_answer and hasattr(gui_hooks, "reviewer_did_show_answer"):
                    gui_hooks.reviewer_did_show_answer.remove(self._on_answer)
            except Exception:
                pass
            try:
                if self._on_state and hasattr(gui_hooks, "state_did_change"):
                    gui_hooks.state_did_change.remove(self._on_state)
            except Exception:
                pass
            try:
                if self._on_answered and hasattr(gui_hooks, "reviewer_did_answer_card"):
                    gui_hooks.reviewer_did_answer_card.remove(self._on_answered)
            except Exception:
                pass
            self._on_q = self._on_state = self._on_answer = self._on_answered = None
            self.stop_card()
            try:
                self._bar.close()
                self._bar.deleteLater()
            except Exception:
                pass
            try:
                if self._overlay:
                    self._overlay.close()
                    self._overlay.deleteLater()
                    self._overlay = None
            except Exception:
                pass
            try:
                if self._green:
                    self._green.close()
                    self._green.deleteLater()
                    self._green = None
            except Exception:
                pass

    mgr = Manager()
    mgr._on_q = mgr._on_state = mgr._on_answer = mgr._on_answered = None

    def _done_for_today(card):
        # After answering, the card is rescheduled. It won't be seen again today if
        # it's a review card (queue 2) or an inter-day (re)learning card (queue 3)
        # whose next due day is past today. Queue 1 = intraday learning steps → it
        # WILL come back today, so no green flare.
        try:
            q = int(card.queue)
            if q == 2:                                   # QUEUE_TYPE_REV
                return True
            if q == 3:                                   # DAY_LEARN_RELEARN
                return int(card.due) > int(mw.col.sched.today)
        except Exception:
            pass
        return False

    def _on_answered(reviewer, card, ease):
        try:
            if _done_for_today(card):
                mgr.card_done_flash()
        except Exception:
            pass

    def _on_q(card):
        # Don't run the card timer during a break — it starts fresh when the break
        # is deactivated (_end_break calls this for the revealed card).
        if state._pomo_on_break:
            return
        try:
            import re as _re
            txt = _re.sub(r"<[^>]+>", "", card.question() or "")
            mgr.start_card(len(txt.strip()))
        except Exception:
            try:
                mgr.start_card(0)
            except Exception:
                pass

    def _on_answer(card):
        # Flipping the card in time is the goal — clear the linger bar + pulse.
        mgr.stop_card()

    def _on_state(new_state, old_state):
        if new_state != "review":
            mgr.stop_card()

    if hasattr(gui_hooks, "reviewer_did_show_question"):
        gui_hooks.reviewer_did_show_question.append(_on_q)
    if hasattr(gui_hooks, "reviewer_did_show_answer"):
        gui_hooks.reviewer_did_show_answer.append(_on_answer)
    if hasattr(gui_hooks, "state_did_change"):
        gui_hooks.state_did_change.append(_on_state)
    if hasattr(gui_hooks, "reviewer_did_answer_card"):
        gui_hooks.reviewer_did_answer_card.append(_on_answered)
    mgr._on_q = _on_q
    mgr._on_answer = _on_answer
    mgr._on_state = _on_state
    mgr._on_answered = _on_answered

    return mgr


def _apply_card_timer(on: bool) -> None:
    # Native edge-glow overlays (Cocoa/CGS) — macOS only.
    if sys.platform != "darwin":
        return
    global _card_timer_instance
    if on:
        if _card_timer_instance is None:
            _card_timer_instance = _make_card_timer()
    else:
        if _card_timer_instance is not None:
            _card_timer_instance.stop()
            _card_timer_instance = None
