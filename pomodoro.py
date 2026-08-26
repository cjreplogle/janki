"""Pomodoro timer widget."""

from ctypes import c_void_p, c_bool, c_long, c_ulong
from aqt import mw
from aqt.qt import Qt, QTimer

from .bridge import _bridge
from .config import _cfg
from . import state
from . import card_timer, focus, keytap

# ---------------------------------------------------------------------------
# Pomodoro timer — XP bar + break screen with hold-Space bypass
# ---------------------------------------------------------------------------

def _make_pomodoro():
    """Build and return a started Pomodoro manager."""
    from PyQt6.QtWidgets import QWidget, QVBoxLayout
    from PyQt6.QtWebEngineWidgets import QWebEngineView
    from PyQt6.QtGui import QColor, QPainter, QBrush, QPainterPath, QCursor
    from PyQt6.QtCore import QRectF, QPropertyAnimation, QEasingCurve
    from ctypes import c_double

    _pcfg          = _cfg()
    WORK_SECS      = max(1, int(_pcfg.get('pomodoro_work_mins', 25))) * 60
    SHORT_SECS     = max(1, int(_pcfg.get('pomodoro_short_break_mins', 5))) * 60
    LONG_SECS      = max(1, int(_pcfg.get('pomodoro_long_break_mins', 15))) * 60
    # every Nth break is a long one; 0 disables long breaks entirely
    LONG_AFTER     = max(0, int(_pcfg.get('pomodoro_long_break_every', 4)))
    BYPASS_SECS    = 3.0      # hold duration to skip break
    BYPASS_TICK_MS = 50       # bypass animation update interval
    TINT_A         = int(float(_pcfg.get('pomodoro_break_tint_alpha', 0.11)) * 255)  # peak blue edge alpha 0–255
    TINT_REACH     = max(0.05, min(0.5, float(_pcfg.get('pomodoro_break_tint_reach', 0.45))))  # reach toward centre
    TINT_RADIUS    = int(_pcfg.get('win_corner_radius', 11))  # match the window's rounded corners
    TINT_FADE_MS   = int(_pcfg.get('pomodoro_break_tint_fade_ms', 600))  # fade-in duration (stays static after)
    BAR_H          = 3        # xp bar pixel height

    # ── XP bar ──────────────────────────────────────────────────────────────
    _XP_DIM       = 0.22   # opacity when idle
    _XP_FULL      = 1.0    # opacity when nearby
    _XP_PROXIMITY = 60     # px from bar edge to count as "nearby"

    class XPBar(QWidget):
        def __init__(self):
            super().__init__(None,
                Qt.WindowType.FramelessWindowHint |
                Qt.WindowType.WindowStaysOnTopHint |
                Qt.WindowType.Tool)
            self.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground)
            self.setAttribute(Qt.WidgetAttribute.WA_ShowWithoutActivating)
            self.setFixedHeight(BAR_H)
            self._p = 0.0
            self._native_done = False
            self._opacity_anim = None
            self.setWindowOpacity(_XP_DIM)
            self._hover_timer = QTimer(self)
            self._hover_timer.setInterval(120)
            self._hover_timer.timeout.connect(self._check_proximity)

        def _check_proximity(self):
            cur = QCursor.pos()
            geo = self.geometry()
            px = _XP_PROXIMITY
            nearby = (geo.x() - px <= cur.x() <= geo.right() + px and
                      geo.y() - px <= cur.y() <= geo.bottom() + px)
            target = _XP_FULL if nearby else _XP_DIM
            if abs(self.windowOpacity() - target) > 0.01:
                if self._opacity_anim:
                    self._opacity_anim.stop()
                anim = QPropertyAnimation(self, b"windowOpacity", self)
                anim.setDuration(200)
                anim.setEasingCurve(QEasingCurve.Type.OutCubic)
                anim.setStartValue(self.windowOpacity())
                anim.setEndValue(target)
                anim.start()
                self._opacity_anim = anim

        def reposition(self):
            geo = mw.geometry()
            self.setGeometry(geo.x(), geo.y() + geo.height() - BAR_H,
                             geo.width(), BAR_H)

        def set_progress(self, p):
            self._p = max(0.0, min(1.0, p))
            self.update()

        def showEvent(self, ev):
            super().showEvent(ev)
            if not self._native_done:
                QTimer.singleShot(0, self._apply_native)
            self.setWindowOpacity(_XP_DIM)
            self._hover_timer.start()

        def hideEvent(self, ev):
            super().hideEvent(ev)
            self._hover_timer.stop()
            self._detach_native()      # remove child-window link so the parent
            self._native_done = False  # can fully occlude; re-assert on next show

        def _detach_native(self):
            # Detach from the parent NSWindow and order out. Leaving the child
            # window attached keeps the main window's surfaces from being treated
            # as occluded on minimize — which leaves them blank on restore and
            # keeps this bar visible. Detaching lets minimize behave normally.
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
                # Attach as child window of the main Anki NSWindow.
                # Child windows always composite above their parent regardless
                # of window level, so no z-order fighting needed.
                existing_parent = msg(c_void_p, ns, b"parentWindow")
                if not existing_parent:
                    main_win = msg(c_void_p, c_void_p(int(mw.winId())), b"window")
                    if main_win:
                        msg(c_void_p, main_win, b"addChildWindow:ordered:",
                            (c_void_p, c_long), (ns, 1))  # NSWindowAbove = 1
                self._native_done = True
            except Exception:
                pass

        def paintEvent(self, ev):
            if self._p <= 0:
                return
            r   = float(_cfg().get('win_corner_radius', 11))
            w   = float(self.width())
            h   = float(BAR_H)
            # Clip to the bottom portion of a rounded rect matching the window
            # corner radius. The rect extends well above the bar so only the
            # bottom-left and bottom-right corners curve — the top doesn't.
            clip = QPainterPath()
            clip.addRoundedRect(QRectF(0.0, -(r * 2), w, r * 2 + h), r, r)
            p = QPainter(self)
            p.setRenderHint(QPainter.RenderHint.Antialiasing)
            p.setClipPath(clip)
            p.setPen(Qt.PenStyle.NoPen)
            p.setBrush(QBrush(QColor(100, 210, 255, 200)))
            p.drawRect(QRectF(0.0, 0.0, w * self._p, h))
            p.end()

    # ── Break screen ─────────────────────────────────────────────────────────
    class BreakScreen:
        """Break overlay rendered *inside* the main reviewer webview (mw.web) as a
        DOM layer — so it appears like a card within the main window and shows even
        while Anki is in native fullscreen (unlike a separate NSWindow, which opens
        on the default Space). Self-heals each second in case the card re-renders."""
        _STYLE = (
            "<style>"
            "#__janki_break,#__janki_break *{outline:none!important;border:none!important;}"
            # Hide the card with display:none on <body> — a descendant CANNOT
            # un-hide a display:none ancestor (unlike visibility, which a note type
            # could beat with visibility:visible). The overlay lives under <html>
            # (sibling of <body>), so it still renders. Card fully gone; the window's
            # glass/vibrancy shows through. Reverts when the overlay is removed.
            "html{background:transparent!important;}"
            "body{display:none!important;}"
            "#__janki_break{position:fixed;inset:0;z-index:2147483600;"
            "display:flex;align-items:center;justify-content:center;"
            "background:transparent;"   # no slab — just the glass window behind
            # match the app's card serif (loaded in the reviewer webview already)
            "font-family:\"Anthropic Serif Text\",-apple-system,Georgia,serif;}"
            "#__janki_break .jb-panel{background:transparent;"   # fully transparent panel
            "padding:34px 52px;text-align:center;"
            "color:rgba(255,255,255,0.94);min-width:340px;"
            "text-shadow:0 1px 4px rgba(0,0,0,0.55);}"   # legibility over glass
            "#__janki_break .jb-title{font-size:24px;font-weight:600;"
            "color:rgba(80,190,255,0.95);margin-bottom:4px;}"
            "#__janki_break .jb-session{font-size:12px;color:rgba(255,255,255,0.3);"
            "margin-bottom:22px;letter-spacing:.05em;}"
            "#__janki_break .jb-timer{font-size:58px;font-weight:200;"
            "font-variant-numeric:tabular-nums;letter-spacing:4px;margin-bottom:26px;}"
            "#__janki_break .jb-hint{font-size:12px;color:rgba(255,255,255,0.28);"
            "margin-bottom:10px;}"
            "#__jbreak_bt{height:5px;background:rgba(255,255,255,0.14);"
            "border-radius:3px;overflow:hidden;display:none;width:100%;margin:0 auto;}"
            "#__jbreak_bf{height:100%;width:0%;background:rgba(90,200,255,0.95);"
            "border-radius:3px;transition:width .05s linear;}"
            "</style>"
        )
        # JS to (re)create the fixed overlay container from the stored HTML.
        _ENSURE = (
            "var o=document.getElementById('__janki_break');"
            "if(!o&&window.__jbreakHtml){o=document.createElement('div');"
            "o.id='__janki_break';"
            "o.style.cssText='position:fixed;inset:0;z-index:2147483600;';"
            "document.documentElement.appendChild(o);"  # <html>, not body — survives card re-renders
            "o.innerHTML=window.__jbreakHtml;}"
        )

        def _web(self):
            return getattr(mw, "web", None)

        def _eval(self, js: str):
            web = self._web()
            if web is None:
                return
            try:
                web.eval(js)
            except Exception:
                pass

        # No-ops kept so the manager's call sites stay unchanged.
        def reposition(self):
            pass

        def show(self):
            pass

        def _center_offset_px(self):
            """Pixels to nudge the break panel so it centres on the WINDOW rather
            than on mw.web. In Focus Mode the toolbar/answer bar are hidden and
            mw.web's centre no longer coincides with the window centre, so the
            flex-centred panel drifts (looked low). We know mw.web's on-screen
            position and the window rect, so compute the delta directly. Positive
            shifts the panel downward."""
            try:
                from aqt.qt import QPoint
                web = mw.web
                web_top = web.mapToGlobal(QPoint(0, 0)).y()
                web_h = web.height()
                win = mw.geometry()
                win_center = win.y() + win.height() / 2.0
                return int(round((win_center - web_top) - web_h / 2.0))
            except Exception:
                return 0

        def render_static(self, remaining: int, session: int, is_long: bool):
            """Inject the break overlay into mw.web — called ONCE per break."""
            import json
            mins, secs = divmod(remaining, 60)
            title = "Long Break" if is_long else "Break"
            _sess_txt = f"Session {session} of {LONG_AFTER}" if LONG_AFTER > 0 else f"Session {session}"
            _off = self._center_offset_px()
            _panel_open = ("<div class='jb-panel' style='transform:translateY(%dpx)'>"
                           % _off) if _off else "<div class='jb-panel'>"
            inner = self._STYLE + _panel_open + (
                f"<div class='jb-title'>{title}</div>"
                f"<div class='jb-session'>{_sess_txt}</div>"
                f"<div class='jb-timer' id='__jbreak_timer'>{mins}:{secs:02d}</div>"
                "<div class='jb-hint'>Hold Space or B to skip</div>"
                "<div id='__jbreak_bt'><div id='__jbreak_bf'></div></div>"
                "</div>"
            )
            self._eval(
                "(function(){window.__jbreakHtml=" + json.dumps(inner) + ";"
                + self._ENSURE +
                "o=document.getElementById('__janki_break');"
                "if(o)o.innerHTML=window.__jbreakHtml;})()"
            )

        def update_time(self, remaining: int):
            """Update the countdown text via JS; re-create the overlay if a card
            render wiped it (self-healing)."""
            import json
            mins, secs = divmod(remaining, 60)
            self._eval(
                "(function(){" + self._ENSURE +
                "var e=document.getElementById('__jbreak_timer');"
                "if(e)e.textContent=" + json.dumps(f"{mins}:{secs:02d}") + ";})()"
            )

        def set_bypass(self, frac: float):
            vis = "block" if frac > 0 else "none"
            w   = f"{frac * 100:.1f}%"
            self._eval(
                "(function(){var t=document.getElementById('__jbreak_bt');"
                "var f=document.getElementById('__jbreak_bf');"
                f"if(t)t.style.display='{vis}';"
                f"if(f)f.style.width='{w}';}})()"
            )

        def hide(self):
            self._eval(
                "(function(){var o=document.getElementById('__janki_break');"
                "if(o)o.remove();window.__jbreakHtml=null;})()"
            )

    class BreakTint(QWidget):
        """Static (non-pulsing) pale-blue full-screen edge tint — a calm 'break due'
        cue. Same full-screen edge-gradient shape as the red card pulse (reaching
        ~TINT_REACH toward the centre, rounded corners), but steady and blue."""
        def __init__(self):
            super().__init__(None,
                Qt.WindowType.FramelessWindowHint |
                Qt.WindowType.WindowStaysOnTopHint |
                Qt.WindowType.Tool)
            self.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground)
            self.setAttribute(Qt.WidgetAttribute.WA_ShowWithoutActivating)
            self.setAttribute(Qt.WidgetAttribute.WA_TransparentForMouseEvents)
            self._native_done = False
            self._fade = None

        def reposition(self):
            try:
                # In native fullscreen frameGeometry can under-report (the glow then
                # stops short of the screen bottom). The window's screen rect is the
                # authoritative full-screen size, so use it while fullscreen.
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
            except Exception:
                pass

        def show(self):
            state._break_tint_active = True
            # Blue break cue overrides the red card pulse — kill any active red now.
            if card_timer._card_timer_instance is not None and getattr(card_timer._card_timer_instance, "_overlay", None):
                card_timer._card_timer_instance._overlay.set_active(False)
            self.reposition()
            self.setWindowOpacity(0.0)   # fade in from transparent, then hold static
            super().show()
            self.update()
            self._start_fade()

        def _start_fade(self):
            try:
                if self._fade:
                    self._fade.stop()
                anim = QPropertyAnimation(self, b"windowOpacity", self)
                anim.setDuration(TINT_FADE_MS)
                anim.setStartValue(0.0)
                anim.setEndValue(1.0)
                anim.setEasingCurve(QEasingCurve.Type.OutCubic)
                anim.start()
                self._fade = anim
            except Exception:
                self.setWindowOpacity(1.0)

        def showEvent(self, ev):
            super().showEvent(ev)
            if not self._native_done:
                QTimer.singleShot(0, self._apply_native)

        def hide(self):
            state._break_tint_active = False
            if self._fade:
                try:
                    self._fade.stop()
                except Exception:
                    pass
            super().hide()

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
                msg(c_void_p, ns, b"setCollectionBehavior:", (c_ulong,), (1 | 256,))
                if not msg(c_void_p, ns, b"parentWindow"):
                    main = msg(c_void_p, c_void_p(int(mw.winId())), b"window")
                    if main:
                        msg(c_void_p, main, b"addChildWindow:ordered:",
                            (c_void_p, c_long), (ns, 1))
                self._native_done = True
            except Exception:
                pass

        def paintEvent(self, ev):
            from PyQt6.QtGui import QLinearGradient, QPainterPath
            a = int(TINT_A)
            if a <= 0:
                return
            w = float(self.width()); h = float(self.height())
            if w <= 0 or h <= 0:
                return
            pt = QPainter(self)
            pt.setRenderHint(QPainter.RenderHint.Antialiasing)
            pt.setPen(Qt.PenStyle.NoPen)
            clip = QPainterPath()
            clip.addRoundedRect(QRectF(0, 0, w, h), float(TINT_RADIUS), float(TINT_RADIUS))
            pt.setClipPath(clip)
            # Lighten (max) compositing so overlapping edge bands don't ADD in the
            # corners — removes the visible colour seam.
            pt.setCompositionMode(QPainter.CompositionMode.CompositionMode_Lighten)
            bv = h * TINT_REACH
            bh = w * TINT_REACH
            edge = QColor(120, 175, 255, a)
            clear = QColor(120, 175, 255, 0)
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

    # ── Manager ──────────────────────────────────────────────────────────────
    class Pomodoro:
        def __init__(self):
            self._elapsed_ms    = 0      # ms spent in current work period
            self._break_rem_ms  = 0      # ms remaining in current break
            self._break_disp_s  = -1     # last second value rendered (avoid full reloads every 50 ms)
            self._sessions      = 0
            self._on_break      = False
            self._break_pending = False  # work timer expired; break waits for the next card
            self._is_long       = False
            self._bypass_t      = 0.0
            self._xp = XPBar()
            self._bs = BreakScreen()
            self._tint = BreakTint()

            self._ticker = QTimer()
            self._ticker.setInterval(50)   # 20 fps — smooth XP bar
            self._ticker.timeout.connect(self._tick)

            self._bypass_ticker = QTimer()
            self._bypass_ticker.setInterval(BYPASS_TICK_MS)
            self._bypass_ticker.timeout.connect(self._bypass_tick)

            self._in_review = False   # XP only ticks + shows during active review

            keytap._key_bridge.pomo_space.connect(self._on_space)

        def start(self):
            self._xp.reposition()
            # XP bar stays hidden until reviewer is entered
            self._ticker.start()

        def enter_review(self):
            """Called when the reviewer shows a card (question or answer)."""
            if not self._ticker.isActive() or self._on_break:
                return
            # A break is due: show it in place of this (next) card. Skipping the
            # break hides the overlay and reveals the card already loaded beneath.
            if self._break_pending:
                self._break_pending = False
                self._begin_break()
                return
            self._in_review = True
            self._xp.reposition()
            self._xp.show()

        def leave_review(self):
            """Called when leaving the reviewer (deck browser, overview, etc.)."""
            self._in_review = False
            self._xp.hide()
            self._tint.hide()   # keep state clean (if still pending, the break screen shows on return)

        def stop(self):
            self._ticker.stop()
            self._bypass_ticker.stop()
            self._xp.hide()
            self._bs.hide()
            self._tint.hide()
            state._pomo_on_break = False
            try:
                keytap._key_bridge.pomo_space.disconnect(self._on_space)
            except Exception:
                pass

        def _tick(self):
            # Invariant: the XP bar rides the main Anki window. If that window is
            # minimized or hidden, the bar must be too. The usual WindowStateChange
            # hide misses the case where the caption HUD (a separate top-level
            # window) absorbed the minimize, so main never emitted the event —
            # enforce it here every tick as a backstop.
            try:
                if self._xp.isVisible() and (mw.isMinimized() or not mw.isVisible()):
                    self._xp.hide()
            except Exception:
                pass
            if self._on_break:
                self._break_rem_ms -= 50
                if self._break_rem_ms <= 0:
                    self._end_break()
                else:
                    # Recalculate displayed seconds; only reload HTML when the
                    # second value changes (avoids a WebEngine reload every 50 ms).
                    disp_s = max(1, (self._break_rem_ms + 999) // 1000)
                    if disp_s != self._break_disp_s:
                        self._break_disp_s = disp_s
                        self._bs.update_time(disp_s)  # JS only — no reload, no flicker
            else:
                if self._in_review and not self._break_pending:
                    self._elapsed_ms += 50
                self._xp.set_progress(
                    min(1.0, self._elapsed_ms / (WORK_SECS * 1000)))
                # Work timer up: don't interrupt the current card — arm the break
                # so it takes over in place of the NEXT card (see enter_review).
                # Show a static pale-blue "break due" tint on the current card.
                if self._elapsed_ms >= WORK_SECS * 1000 and not self._break_pending:
                    self._break_pending = True
                    self._tint.show()

        def _begin_break(self):
            self._tint.hide()          # the break screen now takes over the cue
            # Stop any running card timer — it must not tick behind the break screen
            # (starts fresh in _end_break). Belt-and-suspenders vs. hook order.
            if card_timer._card_timer_instance is not None:
                card_timer._card_timer_instance.stop_card()
            self._on_break     = True
            self._elapsed_ms   = 0
            self._sessions    += 1
            self._is_long      = (LONG_AFTER > 0 and self._sessions % LONG_AFTER == 0)
            self._break_rem_ms = (LONG_SECS if self._is_long else SHORT_SECS) * 1000
            self._break_disp_s = -1
            self._xp.set_progress(0.0)
            state._pomo_on_break = True
            # Wake the app so the WebEngine renderer is active
            try:
                _msg, _cls = _bridge()
                _ns = _msg(c_void_p, _cls(b"NSApplication"), b"sharedApplication")
                _msg(c_void_p, _ns, b"activateIgnoringOtherApps:",
                     (c_bool,), (True,))
            except Exception:
                pass
            self._bs.reposition()
            self._bs.show()
            _break_secs = LONG_SECS if self._is_long else SHORT_SECS
            self._bs.render_static(_break_secs, self._session_display(), self._is_long)

        def _end_break(self):
            self._on_break    = False
            self._elapsed_ms  = 0
            state._pomo_on_break    = False
            self._bypass_t    = 0.0
            self._bypass_ticker.stop()
            self._bs.hide()
            # The card that was hidden beneath the break is now revealed — resume
            # the work timer against it (enter_review skipped this to run the break).
            if getattr(mw, "state", None) == "review":
                self._in_review = True
                self._xp.reposition()
                self._xp.show()
                # Now that the break is deactivated, start the card timer fresh for
                # the revealed card (its start was suppressed during the break).
                if card_timer._card_timer_instance is not None:
                    r = getattr(mw, "reviewer", None)
                    card = getattr(r, "card", None) if r else None
                    if card is not None and getattr(r, "state", None) == "question":
                        card_timer._card_timer_instance._on_q(card)
                # Apply any Focus Mode chrome change that was deferred during the
                # break (kept deferred so the break panel wouldn't drift).
                if focus._focus_mode_on:
                    focus._focus_set_hidden(True)
            else:
                self._in_review = False

        def _session_display(self):
            if LONG_AFTER <= 0:
                return self._sessions
            return ((self._sessions - 1) % LONG_AFTER) + 1

        def _on_space(self, pressed: bool):
            if not self._on_break:
                return
            if pressed:
                # Holding Space fires autorepeat keydowns (many per second). Only
                # arm the hold on the FIRST press — if the bypass ticker is already
                # running, ignore the repeats so they don't keep resetting progress
                # to 0 (which made the break impossible to skip).
                if not self._bypass_ticker.isActive():
                    self._bypass_t = 0.0
                    self._bypass_ticker.start()
            else:
                self._bypass_ticker.stop()
                self._bypass_t = 0.0
                self._bs.set_bypass(0.0)

        def _bypass_tick(self):
            self._bypass_t += BYPASS_TICK_MS / 1000.0
            frac = min(1.0, self._bypass_t / BYPASS_SECS)
            self._bs.set_bypass(frac)
            if self._bypass_t >= BYPASS_SECS:
                self._bypass_ticker.stop()
                # Space is still held now — eat it (and its release) so it doesn't
                # reach the reviewer and flip the revealed card.
                keytap._swallow_space_until_up = True
                self._end_break()

    p = Pomodoro()
    p.start()
    return p


_pomo_instance = None


def _apply_pomodoro(on: bool) -> None:
    global _pomo_instance
    if on:
        if _pomo_instance is None:
            _pomo_instance = _make_pomodoro()
    else:
        if _pomo_instance is not None:
            _pomo_instance.stop()
            _pomo_instance = None


def _rebuild_pomodoro() -> None:
    """Re-read config and restart the Pomodoro timer so break-spacing changes
    apply live. Resets the current work/session progress (fine for a settings
    change). No-op if Pomodoro is disabled."""
    if _cfg().get("pomodoro", False):
        _apply_pomodoro(False)
        _apply_pomodoro(True)
