"""Per-card lingering-warning bar under the toolbar."""

import sys
import ctypes
from ctypes import c_void_p, c_bool, c_long, c_ulong, c_char_p
from aqt import mw, gui_hooks
from aqt.qt import Qt, QTimer

from ..util.bridge import _bridge, NSPoint, NSRect, NSSize
from ..util.config import _cfg
from ..util import state
from . import focus
from ..user import hud

# ---------------------------------------------------------------------------
# Per-card "lingering" warning bar (under the top toolbar)
# ---------------------------------------------------------------------------
_card_timer_instance = None


def _make_card_timer():
    """A thin progress bar just under the toolbar that fills over 10–30s (scaled
    by card length). When it fills it turns red — a 'you've lingered' nudge,
    replacing the AnKing note-type timer. Mirrors the bottom XP bar."""
    from PyQt6.QtWidgets import QWidget
    from PyQt6.QtGui import QColor, QPainter, QBrush, QPen
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

    # Countdown RING (top-right) — replaces the old under-toolbar bar. It starts as
    # a full circle and depletes clockwise as the card timer runs down.
    RING_D = int(cfg.get("card_timer_ring_size", 11))          # ring diameter (px)
    RING_STROKE = float(cfg.get("card_timer_ring_thickness", 3.0))
    RING_MARGIN = int(cfg.get("card_timer_ring_margin", 14))   # fallback inset from the corner
    RING_GAP = int(cfg.get("card_timer_ring_gap", 12))         # gap right of the Sync button
    RING_ANCHOR = str(cfg.get("card_timer_ring_anchor", "window")).lower()  # "window" | "screen"
    RING_CORNER = str(cfg.get("card_timer_ring_corner", "tray")).lower()    # "top" | "tray" | "bottom"
    BAR_TOP_LIFT = int(cfg.get("card_timer_bar_top_lift", 31))              # px to lift the top bar over the tab bar
    RING_OPACITY = float(cfg.get("card_timer_ring_opacity", 0.48))
    RING_CLOSE_MS = int(cfg.get("card_timer_ring_close_ms", 780))  # ring wipe-out on card complete
    BAR_CLOSE_MS = int(cfg.get("card_timer_bar_close_ms", 500))    # bar wipe-out (a bit quicker)
    RING_BOX = RING_D + 8                                       # widget box (padding for round caps)

    def _op():
        # Live transparency for the ring/bar (settings slider applies with no rebuild).
        return float(_cfg().get("card_timer_ring_opacity", RING_OPACITY))

    def _fs_now():
        # Robust fullscreen check: Qt's isFullScreen() misses macOS NATIVE
        # (green-button) fullscreen, so also check the NSWindow style mask
        # (FullScreen = 1<<14) and whether the window covers the whole screen.
        try:
            if mw.isFullScreen():
                return True
            msg, cls = _bridge()
            mns = msg(c_void_p, c_void_p(int(mw.winId())), b"window")
            if mns and (int(msg(c_ulong, mns, b"styleMask")) & (1 << 14)):
                return True
            scr = mw.screen() if hasattr(mw, "screen") else None
            if scr is not None and mw.frameGeometry().height() >= scr.geometry().height() - 8:
                return True
        except Exception:
            pass
        return False

    class TimerBar(QWidget):
        def __init__(self):
            # NOTE: no WindowStaysOnTopHint — addChildWindow(ordered:Above) keeps it
            # above the main window, and the StaysOnTop/Tool "floating panel"
            # promotion made the main window resign key when the bar showed/filled
            # (stealing focus, esp. in fullscreen). Same lesson as PulseOverlay.
            super().__init__(None,
                Qt.WindowType.FramelessWindowHint |
                Qt.WindowType.Tool)
            self.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground)
            self.setAttribute(Qt.WidgetAttribute.WA_ShowWithoutActivating)
            self._p = 0.0
            self._center_fill = False    # narrow/centred bars fill from the middle out
            self._warn = False
            self._warn_t0 = 0.0          # monotonic when warn began (fill→pulse blend)
            self._native_done = False
            self._float_mode = None      # None=undecided, True=screen-level float, False=child
            self._pulse = 0.0            # 0..2pi phase for the overtime pulse
            self._pulse_t = QTimer(self)
            self._pulse_t.setInterval(33)   # ~30 fps
            self._pulse_t.timeout.connect(self._pulse_tick)
            # "snap shut" close animation state (on card complete)
            self._closing = False
            self._close_filled = 0.0     # arc length (fraction) captured at close
            self._close_warn = False     # was it red (overtime) when it closed?
            self._close_wipe = 0.0       # 0→1: how far the tail has chased the lead
            self._close_t0 = 0.0
            self._close_t = QTimer(self)
            self._close_t.setInterval(16)   # ~60 fps
            self._close_t.timeout.connect(self._close_tick)
            self.setWindowOpacity(_op())

        def _pulse_tick(self):
            import math
            self._pulse = (self._pulse + 0.18) % (2 * math.pi)
            self.update()

        def finish_close(self):
            """Card complete: the trailing end loops around and catches up to the
            leading end, wiping the arc out, then hide. Skips if there was no
            progress or the ring is suppressed (Focus/Caption)."""
            if focus._focus_hidden or focus._focus_mode_on or hud._caption_visible():
                self._closing = False
                return
            if self._mode() == "off":      # off: nothing to animate
                self._closing = False
                self.hide()
                return
            if self._p <= 0.0 and not self._warn:
                self._closing = False
                return
            import time
            self._pulse_t.stop()
            self._closing = True
            self._close_filled = 1.0 if self._warn else self._p
            self._close_warn = self._warn
            self._close_wipe = 0.0
            self._close_ms = BAR_CLOSE_MS if self._mode() == "bar" else RING_CLOSE_MS
            self._close_t0 = time.monotonic()
            # It's already on screen (the question phase was showing it); just make
            # sure and start the animation.
            self.setWindowOpacity(_op())
            if not self.isVisible():
                self.show()
            if not self._close_t.isActive():
                self._close_t.start()
            self.update()

        def _close_tick(self):
            import time
            prog = (time.monotonic() - self._close_t0) * 1000.0 / max(1, getattr(self, "_close_ms", RING_CLOSE_MS))
            if prog >= 1.0:
                self._close_t.stop()
                self._closing = False
                self.hide()
                return
            self._close_wipe = prog * prog * (3.0 - 2.0 * prog)   # smoothstep (ease in-out)
            self.update()

        def _mode(self):
            return str(_cfg().get("card_timer_style", "ring")).lower()

        def _fill_alpha(self):
            # Faint early, de-fade toward full. In fullscreen the floor is higher so
            # the small/narrow indicator stays legible.
            floor = 110 if mw.isFullScreen() else 60
            return min(255, int(floor + (160 - floor) * (self._p ** 2.5)))

        def _fallback_full(self):
            try:
                tl = mw.web.mapToGlobal(QPoint(0, 0))
                self.setGeometry(tl.x() + NARROW_PX // 2, tl.y() - OFFSET_Y,
                                 max(1, mw.web.width() - NARROW_PX), BAR_H)
            except Exception:
                pass

        def _reposition_bar_tray(self):
            # Original bar: matched to the toolbar's nav-button island (just below
            # Decks/Add/Browse/Stats/Sync).
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

        def _reposition_bar(self):
            corner = str(_cfg().get("card_timer_ring_corner", RING_CORNER)).lower()
            self._center_fill = False   # default: fill left→right (full-width bars)
            # "tray" → the original under-toolbar island bar.
            if corner == "tray":
                self._reposition_bar_tray()
                return
            # "top"/"bottom" → full-width strip at the window edge (XP-bar style).
            try:
                geo = mw.geometry()
                rad = int(_cfg().get("win_corner_radius", 11))
                # "Bottom (Narrow)" → notch-width bar centred at the bottom.
                if corner == "bottom_narrow":
                    self._center_fill = True    # fill from the middle out (looks centred)
                    nw = self._notch_width() or int(_cfg().get("card_timer_bar_notch_w", 180))
                    if self._is_fs():
                        scr = mw.screen() if hasattr(mw, "screen") else None
                        sg = scr.geometry() if scr is not None else geo
                        w = nw
                        x = sg.x() + (sg.width() - w) // 2
                        y = sg.y() + sg.height() - BAR_H
                    else:
                        w = max(40, nw // 2)          # ~half width windowed
                        x = geo.x() + (geo.width() - w) // 2
                        y = geo.y() + geo.height() - BAR_H - 5   # padding from the bottom
                    self.setGeometry(x, y, w, BAR_H)
                    return
                # Fullscreen + top: notch-width, centred just below the notch.
                if corner != "bottom" and self._is_fs():
                    self._center_fill = True    # fill from the middle out
                    scr = mw.screen() if hasattr(mw, "screen") else None
                    sg = scr.geometry() if scr is not None else geo
                    # Same width as the notch, centred just below it. Qt clamps the
                    # window below the notch/menu-bar automatically.
                    w = self._notch_width() or int(_cfg().get("card_timer_bar_notch_w", 180))
                    x = sg.x() + (sg.width() - w) // 2
                    self.setGeometry(x, sg.y(), w, BAR_H)
                    return
                if corner == "bottom":
                    y = geo.y() + geo.height() - BAR_H
                else:
                    y = geo.y() - BAR_TOP_LIFT   # over the tab/title bar
                # Inset by the window corner radius so the bar's ends don't extend
                # past the window's rounded corners.
                self.setGeometry(geo.x() + rad, y, max(1, geo.width() - 2 * rad), BAR_H)
            except Exception:
                pass

        def reposition(self):
            # Focus Mode: hide entirely (distracting in focus). Gate on Focus being
            # ARMED (_focus_mode_on), not just chrome currently hidden.
            if focus._focus_hidden or focus._focus_mode_on:
                self.hide()
                return
            # Caption mode replaces the countdown with the caption pulse.
            if hud._caption_visible():
                self.hide()
                return
            # Keep the native window in the right mode (screen-level float for the
            # fullscreen bar, focus-safe child window otherwise).
            self._set_float(self._should_float())
            if self._mode() == "bar":
                self._reposition_bar()
                return
            # Reference corner: "window" = the main Anki window frame (rides with
            # the window); "screen" = the whole display (availableGeometry).
            try:
                if RING_ANCHOR == "screen":
                    scr = mw.screen() if hasattr(mw, "screen") else None
                    g = scr.availableGeometry() if scr is not None else None
                else:
                    g = mw.frameGeometry()
                if g is not None:
                    right_edge = g.x() + g.width()
                    top_y = g.y()
                    bottom_y = g.y() + g.height()
                else:
                    tr = mw.web.mapToGlobal(QPoint(mw.web.width(), 0))
                    br = mw.web.mapToGlobal(QPoint(mw.web.width(), mw.web.height()))
                    right_edge = tr.x()
                    top_y = tr.y()
                    bottom_y = br.y()
            except Exception:
                return
            fallback_x = right_edge - RING_BOX - RING_MARGIN
            fallback_y = top_y + RING_MARGIN
            # Read live so the settings dropdown applies without a rebuild.
            corner = str(_cfg().get("card_timer_ring_corner", RING_CORNER)).lower()

            # Bottom-right: sit above the answer bar by anchoring to the card content
            # area's bottom (mw.web), in the remaining-count numbers' row.
            if corner in ("bottom", "bottom_narrow"):
                try:
                    br = mw.web.mapToGlobal(QPoint(mw.web.width(), mw.web.height()))
                    x = br.x() - RING_BOX - RING_MARGIN
                    y = br.y() + 2
                except Exception:
                    x = right_edge - RING_BOX - RING_MARGIN
                    y = bottom_y - RING_BOX - RING_MARGIN
                self.setGeometry(x, y, RING_BOX, RING_BOX)
                return

            # "top" → true top-right corner of the window/screen (not the Sync row).
            if corner != "tray":
                self.setGeometry(fallback_x, fallback_y, RING_BOX, RING_BOX)
                return

            # "tray": line up vertically with the Sync button (toolbar row) and sit just
            # OUTSIDE it — nestled close to the right of the Sync button (clamped to
            # stay inside the window edge). Measure both in the toolbar webview.
            tw = getattr(mw, "toolbarWeb", None) or getattr(getattr(mw, "toolbar", None), "web", None)
            if tw is None:
                self.setGeometry(fallback_x, fallback_y, RING_BOX, RING_BOX)
                return
            js = ("(function(){var cy=null,t=document.querySelector('.toolbar');"
                  "if(t){var r=t.getBoundingClientRect();cy=(r.top+r.bottom)/2;}"
                  "var it=document.querySelectorAll('.toolbar a,.toolbar button,.hitem,a.hitem');"
                  "var mr=null;for(var i=0;i<it.length;i++){var q=it[i].getBoundingClientRect();"
                  "if(q.width>0&&(mr===null||q.right>mr))mr=q.right;}return [cy,mr];})()")

            def _cb(res):
                try:
                    base = tw.mapToGlobal(QPoint(0, 0))
                    cy = res[0] if res else None
                    mr = res[1] if res else None
                    y = (base.y() + int(round(cy)) - RING_BOX // 2) if cy is not None else fallback_y
                    if mr is not None:
                        sync_right = base.x() + int(round(mr))
                        x = sync_right + RING_GAP        # just outside the Sync button
                        if x + RING_BOX > right_edge - 2:  # keep inside the edge
                            x = right_edge - RING_BOX - 2
                    else:
                        x = fallback_x
                    self.setGeometry(x, y, RING_BOX, RING_BOX)
                except Exception:
                    pass

            try:
                tw.evalWithCallback(js, _cb)
            except Exception:
                try:
                    tw.page().runJavaScript(js, _cb)
                except Exception:
                    self.setGeometry(fallback_x, fallback_y, RING_BOX, RING_BOX)

        def set_state(self, p, warn):
            self._p = max(0.0, min(1.0, p))
            if warn and not self._warn:      # rising edge → start the fill→pulse blend
                import time
                self._warn_t0 = time.monotonic()
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
            self._float_mode = None   # re-decide child vs float on next show

        def _is_fs(self):
            return _fs_now()

        def _should_float(self):
            # Always a focus-safe child window now (the fullscreen bar just centres
            # below the notch instead of floating into the top corner).
            return False

        def _notch_width(self):
            # Width of the macOS notch, from the screen's auxiliary top areas
            # (macOS 12+). 0 if unavailable / no notch. Guarded so it never calls an
            # unrecognized selector on older systems.
            try:
                msg, cls = _bridge()
                ns = msg(c_void_p, c_void_p(int(mw.winId())), b"window")
                scr = msg(c_void_p, ns, b"screen") if ns else None
                if not scr:
                    scr = msg(c_void_p, cls(b"NSScreen"), b"mainScreen")
                if not scr:
                    return 0
                lib = ctypes.cdll.LoadLibrary("/usr/lib/libobjc.dylib")
                lib.sel_registerName.restype = c_void_p
                lib.sel_registerName.argtypes = [c_char_p]
                sel = lib.sel_registerName(b"auxiliaryTopLeftArea")
                if not msg(c_bool, scr, b"respondsToSelector:", (c_void_p,), (sel,)):
                    return 0
                la = msg(NSRect, scr, b"auxiliaryTopLeftArea")
                ra = msg(NSRect, scr, b"auxiliaryTopRightArea")
                nw = ra.origin.x - (la.origin.x + la.size.width)
                if 40 < nw < 400:
                    return int(round(nw))
            except Exception:
                pass
            return 0

        def _set_float(self, on):
            # Idempotent: only re-wire the native window when the mode changes.
            if getattr(self, "_float_mode", None) == on:
                return
            try:
                msg, cls = _bridge()
                ns = msg(c_void_p, c_void_p(int(self.winId())), b"window")
                if not ns:
                    return
                if on:
                    parent = msg(c_void_p, ns, b"parentWindow")
                    if parent:
                        msg(None, parent, b"removeChildWindow:", (c_void_p,), (ns,))
                    # Above the menu bar / notch safe-area so the frame isn't
                    # constrained below them (NSMainMenuWindowLevel is 24).
                    lvl = int(_cfg().get("card_timer_bar_fs_level", 1000))
                    msg(None, ns, b"setLevel:", (c_long,), (c_long(lvl),))
                    # appear over other Spaces / a fullscreen window
                    msg(None, ns, b"setCollectionBehavior:", (c_ulong,), (c_ulong(1 | (1 << 8)),))
                    msg(None, ns, b"setHidesOnDeactivate:", (c_bool,), (False,))
                    if msg(c_bool, ns, b"isKindOfClass:", (c_void_p,), (cls(b"NSPanel"),)):
                        cur = int(msg(c_ulong, ns, b"styleMask"))
                        if not (cur & 128):   # NSWindowStyleMaskNonactivatingPanel (no focus steal)
                            msg(None, ns, b"setStyleMask:", (c_ulong,), (c_ulong(cur | 128),))
                        msg(None, ns, b"setFloatingPanel:", (c_bool,), (True,))
                        msg(None, ns, b"setBecomesKeyOnlyIfNeeded:", (c_bool,), (True,))
                    msg(None, ns, b"orderFront:", (c_void_p,), (None,))
                else:
                    msg(None, ns, b"setLevel:", (c_long,), (c_long(0),))       # NSNormalWindowLevel
                    msg(None, ns, b"setCollectionBehavior:", (c_ulong,), (c_ulong(0),))
                    if not msg(c_void_p, ns, b"parentWindow"):
                        main = msg(c_void_p, c_void_p(int(mw.winId())), b"window")
                        if main:
                            msg(c_void_p, main, b"addChildWindow:ordered:",
                                (c_void_p, c_long), (ns, 1))
                self._float_mode = on
            except Exception:
                pass

        def _native_top_place(self, w, rad, fs_lift):
            # Set the native frame (Cocoa bottom-left) to the physical screen top.
            # At a level above the menu bar this isn't constrained; deferred so it
            # wins over Qt's own (clamped) geometry pass.
            try:
                msg, cls = _bridge()
                ns = msg(c_void_p, c_void_p(int(self.winId())), b"window")
                scr = mw.screen() if hasattr(mw, "screen") else None
                sg = scr.geometry() if scr is not None else None
                if not ns or sg is None:
                    return
                ox = float(sg.x() + sg.width() - w - rad)
                oy = float(sg.height() - BAR_H + fs_lift)  # Cocoa: y up from bottom
                r = NSRect(NSPoint(ox, oy), NSSize(float(w), float(BAR_H)))
                msg(None, ns, b"setFrame:display:", (NSRect, c_bool), (r, True))
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
                self._native_done = True
            except Exception:
                pass
            self._set_float(self._should_float())

        def _paint_bar(self):
            # Original thin progress bar (horizontal).
            import math
            pt = QPainter(self)
            pt.setRenderHint(QPainter.RenderHint.Antialiasing)
            pt.setPen(Qt.PenStyle.NoPen)
            fullw = float(self.width())
            hrad = min(float(BAR_H) / 2.0, fullw / 2.0)
            if self._closing:
                # wipe-out: the trailing (left) end chases the leading (right) end,
                # so the drawn bar shrinks to nothing; fade out as it closes.
                fv = self._close_filled
                t = self._close_wipe
                if self._close_warn:
                    r, g, b = 255, 70, 70
                else:
                    r = int(90 + 165 * fv)
                    g = max(0, int(210 - 120 * fv))
                    b = max(0, int(255 - 200 * fv))
                a = max(0, int(205 * (1.0 - 0.6 * t)))
                w = fv * fullw * (1.0 - t)
                left = (fullw - w) / 2.0 if self._center_fill else t * fv * fullw
                if w > 0:
                    rad = min(float(BAR_H) / 2.0, w / 2.0)
                    pt.setBrush(QBrush(QColor(r, g, b, a)))
                    pt.drawRoundedRect(QRectF(left, 0.0, w, float(BAR_H)), rad, rad)
                pt.end()
                return
            if self._p <= 0:
                pt.end()
                return
            if self._warn:
                import time
                phase = ((time.monotonic() - state._flare_origin) * 1000.0 % PULSE_MS) / PULSE_MS
                s = 0.5 - 0.5 * math.cos(2 * math.pi * phase)
                pt.setBrush(QBrush(QColor(255, 60, 60, int(40 + 150 * s))))
                pt.drawRoundedRect(QRectF(0.0, 0.0, fullw, float(BAR_H)), hrad, hrad)
                col = QColor(255, 70, 70, int(180 + 60 * s))
            else:
                r = int(90 + 165 * self._p)
                g = max(0, int(210 - 120 * self._p))
                b = max(0, int(255 - 200 * self._p))
                # Faint early, de-fade as it fills (same curve as the ring).
                col = QColor(r, g, b, self._fill_alpha())
            pt.setBrush(QBrush(col))
            w = fullw * self._p
            fx = (fullw - w) / 2.0 if self._center_fill else 0.0
            rad = min(float(BAR_H) / 2.0, w / 2.0)
            pt.drawRoundedRect(QRectF(fx, 0.0, w, float(BAR_H)), rad, rad)
            pt.end()

        def paintEvent(self, ev):
            if self._mode() == "bar":
                self._paint_bar()
                return
            import math
            pt = QPainter(self)
            pt.setRenderHint(QPainter.RenderHint.Antialiasing)
            inset = RING_STROKE / 2.0 + 1.0
            box = float(self.width())
            rect = QRectF(inset, inset, box - 2 * inset, box - 2 * inset)
            # Arc colour + alpha. The alpha follows a curve that stays faint while
            # far from done and brightens over a longer window near the end (so the
            # amber/red is visible for a good while).
            if self._closing:
                # wipe-out: the trailing end chases the leading end around, so the
                # drawn arc shrinks to nothing. Colour by the captured fill (red if
                # it was overtime).
                fv = self._close_filled
                if self._close_warn:
                    r, g, b = 255, 70, 70
                else:
                    r = int(90 + 165 * fv)
                    g = max(0, int(210 - 120 * fv))
                    b = max(0, int(255 - 200 * fv))
                a = min(255, int(60 + 195 * (fv ** 2)))
                # Fade out as it closes so the last sliver is more transparent.
                a = max(0, int(a * (1.0 - 0.6 * self._close_wipe)))
                col = QColor(r, g, b, a)
                filled = fv
            elif self._warn:
                # overtime: the whole ring pulses red, IN SYNC with the PulseOverlay
                # flare (shared _flare_origin clock, first cycle starts at the trough).
                import time
                now = time.monotonic()
                phase = ((now - state._flare_origin) * 1000.0 % PULSE_MS) / PULSE_MS
                s = 0.5 - 0.5 * math.cos(2 * math.pi * phase)   # 0..1, synced
                pr, pg, pb, pa = 255, 70, 70, int(170 + 70 * s)
                # Ease from the just-filled amber ring into the red pulse so it
                # doesn't snap. bf: 0 at warn start → 1 after ~500ms.
                bf = min(1.0, (now - self._warn_t0) * 1000.0 / 500.0) if self._warn_t0 else 1.0
                bf = bf * bf * (3 - 2 * bf)   # smoothstep
                ar, ag, ab, aa = 255, 90, 55, 255   # amber fill-end colour
                r = int(ar + (pr - ar) * bf)
                g = int(ag + (pg - ag) * bf)
                b = int(ab + (pb - ab) * bf)
                a = int(aa + (pa - aa) * bf)
                col = QColor(r, g, b, a)
                filled = 1.0
            else:
                # cyan (calm) → amber as it fills toward the warning, and de-fade
                # (grow more solid) the closer it gets to full.
                r = int(90 + 165 * self._p)
                g = max(0, int(210 - 120 * self._p))
                b = max(0, int(255 - 200 * self._p))
                a = self._fill_alpha()
                col = QColor(r, g, b, a)
                filled = self._p
            # (No background track — only the progress arc is drawn.)
            # Fill clockwise from 12 o'clock as time elapses; a complete red ring at
            # expiry. (Qt angles: 1/16°, CCW positive → negative span = clockwise.)
            pen = QPen(col)
            pen.setWidthF(RING_STROKE)
            pen.setCapStyle(Qt.PenCapStyle.RoundCap)
            pt.setPen(pen)
            if self._closing:
                # Trailing end advanced by wipe·arc; remaining length shrinks to 0.
                t = self._close_wipe
                start16 = int(round((90.0 - t * filled * 360.0) * 16))
                span16 = int(round(-(filled * 360.0 * (1.0 - t)) * 16))
            else:
                start16 = 90 * 16
                span16 = int(-filled * 360 * 16)
            if span16 != 0:
                pt.drawArc(rect, start16, span16)
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
                if _fs_now():
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
            # When the flare rides the MAIN window (not the caption HUD), only show
            # it while Anki is actually frontmost. Otherwise showing the overlay
            # re-attaches it as a child of the main window, and addChildWindow pulls
            # the parent window (and the app) to the front — stealing focus from
            # whatever the user was in. The glow wouldn't be visible behind that app
            # anyway. The caption HUD is a nonactivating float built for cross-app
            # visibility, so it's exempt. The ~150ms AMBOSS poll re-runs this, so the
            # flare hides/re-shows within a beat as focus changes.
            front_ok = caption_up or state._anki_focused
            show = (self._red_wanted and not self._tip_open and now >= self._cooldown_until
                    and not state._break_tint_active and not state._pomo_on_break
                    and host_on_screen and front_ok)
            if show:
                self._overlay._max_a = self._flare_alpha()   # boost in fullscreen/focus
                if not self._overlay.isVisible():
                    self._overlay.set_active(True)
                else:
                    self._overlay.update()
            elif self._overlay.isVisible():
                self._overlay.set_active(False)

        def _flare_alpha(self):
            # Peak edge alpha for the red flare. Fullscreen has no window chrome/glass
            # to read against, so it needs a stronger glow than windowed.
            _c = _cfg()
            if _fs_now():
                return int(_c.get("card_timer_pulse_alpha_fullscreen", 44))
            if focus._focus_hidden:
                return int(_c.get("card_timer_pulse_alpha_focus", 24))
            return int(_c.get("card_timer_pulse_alpha", PULSE_MAX_A))

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
            # (The previous card's ring already wiped out in stop_card when the
            # answer was shown.) If a wipe is still animating, leave it — the new
            # ring fades in below after the delay.
            if not self._bar._closing:
                self._bar.reposition()
                self._bar.set_state(0.0, False)
            # Focus Mode keeps the bar hidden; the "Show timer bar" setting can also
            # hide it (independent of the red flare, which still fires either way).
            # Don't pop the bar in immediately — wait a beat, then fade it in, so it
            # doesn't flash on every card flip. _bar_gen invalidates the pending fade
            # if the card changes first.
            self._bar_gen += 1
            if not (focus._focus_hidden or focus._focus_mode_on) and self._bar_pref_on():
                # Appear near-instantly (cap the legacy delay).
                delay = min(60, int(_c.get("card_timer_bar_delay_ms", 0)))
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
            _ga = int(_c.get("card_timer_green_alpha", 16))
            if _fs_now():
                _ga = int(_c.get("card_timer_green_alpha_fullscreen", 46))
            self._green._max_a = _ga
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
            anim.setEndValue(_op())
            anim.setEasingCurve(QEasingCurve.Type.InOutQuad)
            anim.start()
            self._bar_fade = anim

        def _bar_pref_on(self):
            # Caption mode owns the timing feedback via the pulse, so the
            # countdown bar is suppressed while the coherence HUD is up. It also
            # rides the main window, so never show it while that's minimized.
            return (str(_cfg().get("card_timer_style", "ring")).lower() != "off"
                    and not hud._caption_visible()
                    and hud._main_on_screen())

        def sync_bar_pref(self):
            """Show/hide the bar immediately when the setting is toggled mid-card."""
            if self._active and not (focus._focus_hidden or focus._focus_mode_on) and self._bar_pref_on():
                self._bar.reposition()
                self._bar.setWindowOpacity(_op())
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
                self._bar.setWindowOpacity(_op())
                self._bar.show()
                # The toolbar webview was just re-shown and needs a beat to re-lay
                # out before we can measure the button island — reposition now and
                # again as it settles (otherwise the bar lands at a stale spot).
                for d in (0, 130, 320):
                    QTimer.singleShot(d, self._bar.reposition)

        def stop_card(self, wipe=False):
            self._active = False
            self._t.stop()
            self._red_wanted = False
            self._tip_open = False
            self._cooldown_until = 0.0
            self._amboss_poll.stop()
            # Wipe-out only on a real card action (answer revealed). Plain navigation
            # away (Decks/menu) or a break just hides it.
            if wipe:
                self._bar.finish_close()
            else:
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
        # Flipping the card in time is the goal — wipe the ring out + clear pulse.
        mgr.stop_card(wipe=True)

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
