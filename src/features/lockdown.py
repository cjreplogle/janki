"""Lockdown / kiosk focus mode (macOS).

A *soft* kiosk that discourages wandering off mid-study. It uses AppKit
``-[NSApplication setPresentationOptions:]`` (via the ctypes ObjC bridge) to hide
the Dock + menu bar and block ⌘-Tab app switching. The escape hatch is to **hold
Space for 5 seconds** so you can never get genuinely trapped.

Two strictness levels (config ``lockdown_level``):
  • "standard" — hide Dock + menu bar, block process switching, disable ⌘-H.
  • "strict"   — standard PLUS disable force-quit + session termination.

The hold-Space-to-exit is detected via the same CGEventTap that powers the
Pomodoro break bypass, because a Qt event filter can't see Space while the
reviewer webview (Chromium) has focus. Strict mode therefore requires
Accessibility permission — otherwise the only escape could fail, and with
force-quit disabled you'd be trapped. A Qt event filter is installed as a
best-effort backup for non-webview screens.

This is self-discipline, not tamper-proof: it holds no kernel/MDM privileges and
resets automatically if the process dies. Manual toggle only (menu / hotkey);
never auto-engaged.
"""

import math
import os
import subprocess
import sys
from ctypes import c_void_p, c_bool, c_ulong, c_long, c_int, c_char_p

from aqt import mw
from aqt.qt import Qt, QTimer, QEvent, QObject, QShortcut, QKeySequence

from ..util.bridge import _bridge
from ..util.config import _cfg, log
from ..util import state, keytap
from . import focus

# --- NSApplicationPresentationOptions bit flags -----------------------------
_AUTO_HIDE_DOCK          = 1 << 0   # 1
_HIDE_DOCK               = 1 << 1   # 2
_AUTO_HIDE_MENUBAR       = 1 << 2   # 4
_HIDE_MENUBAR            = 1 << 3   # 8
_DISABLE_APPLE_MENU      = 1 << 4   # 16
_DISABLE_PROC_SWITCHING  = 1 << 5   # 32
_DISABLE_FORCE_QUIT      = 1 << 6   # 64
_DISABLE_SESSION_TERM    = 1 << 7   # 128
_DISABLE_HIDE_APP        = 1 << 8   # 256

# Canonical (valid) kiosk combinations. HideMenuBar requires HideDock, and
# DisableProcessSwitching requires the Dock hidden too — both satisfied here.
# An invalid combination throws an ObjC exception, so keep these exact.
_MASK_STANDARD = (_HIDE_DOCK | _HIDE_MENUBAR | _DISABLE_PROC_SWITCHING
                  | _DISABLE_HIDE_APP)
_MASK_STRICT   = (_MASK_STANDARD | _DISABLE_FORCE_QUIT | _DISABLE_SESSION_TERM)

# Hold-to-escape tuning.
_TICK_MS       = 30          # progress-fill update interval
_CONSUME_AFTER = 0.25        # once held this long: show overlay + swallow Space

# Very-strict: seconds of "apps will close" warning (abortable) before we act.
_APP_CLOSE_WARN = 5
# Very-strict: seconds to wait for other apps to quit before engaging anyway.
_APP_QUIT_GRACE = 15

_mgr = None                  # singleton Lockdown manager


def _set_presentation_options(mask: int) -> bool:
    """Apply an NSApplicationPresentationOptions mask. Returns True on success."""
    try:
        msg, cls = _bridge()
        ns = msg(c_void_p, cls(b"NSApplication"), b"sharedApplication")
        if not ns:
            return False
        msg(None, ns, b"setPresentationOptions:", (c_ulong,), (c_ulong(mask),))
        return True
    except Exception as e:
        log("lockdown setPresentationOptions(%s): %s" % (mask, e))
        return False


def _restore_window_buttons() -> None:
    """Re-assert the window's Miniaturizable style bit + unhide the yellow
    minimize traffic-light. Qt's fullscreen exit sometimes drops it. Idempotent:
    only touches styleMask when the bit is actually missing (setStyleMask rebuilds
    the frame, so we avoid it otherwise)."""
    try:
        msg, cls = _bridge()
        win = msg(c_void_p, c_void_p(int(mw.winId())), b"window")
        if not win:
            return
        _MINIATURIZABLE = 1 << 2  # NSWindowStyleMaskMiniaturizable
        cur = int(msg(c_ulong, win, b"styleMask"))
        if not (cur & _MINIATURIZABLE):
            msg(None, win, b"setStyleMask:", (c_ulong,),
                (c_ulong(cur | _MINIATURIZABLE),))
        btn = msg(c_void_p, win, b"standardWindowButton:", (c_long,), (1,))  # miniaturize
        if btn:
            msg(None, btn, b"setHidden:", (c_bool,), (False,))
            msg(None, btn, b"setEnabled:", (c_bool,), (True,))
    except Exception as e:
        log("lockdown restore minimize button: %s" % e)


_NETWORKSETUP = "/usr/sbin/networksetup"


def _wifi_device() -> "str | None":
    """The Wi-Fi interface name (e.g. en0), parsed from networksetup."""
    try:
        out = subprocess.run([_NETWORKSETUP, "-listallhardwareports"],
                             capture_output=True, text=True, timeout=5).stdout
        lines = out.splitlines()
        for i, ln in enumerate(lines):
            if ln.strip().startswith("Hardware Port:") and "Wi-Fi" in ln:
                for j in range(i + 1, min(i + 4, len(lines))):
                    if lines[j].strip().startswith("Device:"):
                        return lines[j].split(":", 1)[1].strip()
        return None
    except Exception as e:
        log("lockdown wifi device: %s" % e)
        return None


def _wifi_is_on(dev: str) -> bool:
    try:
        out = subprocess.run([_NETWORKSETUP, "-getairportpower", dev],
                             capture_output=True, text=True, timeout=5).stdout
        return ": On" in out
    except Exception:
        return False


def _set_wifi(dev: str, on: bool) -> None:
    try:
        subprocess.run([_NETWORKSETUP, "-setairportpower", dev, "on" if on else "off"],
                       capture_output=True, timeout=5)
    except Exception as e:
        log("lockdown set wifi %s: %s" % (on, e))


def _close_other_apps() -> "list[int]":
    """Gracefully quit every other regular (Dock) app, so only Anki remains.
    Uses -[NSRunningApplication terminate] (not force-kill), so apps with unsaved
    work show their own save prompt. Skips Anki itself and Finder. Not reopened on
    exit. Returns the pids we asked to quit (terminate is async — poll these)."""
    pids: "list[int]" = []
    try:
        msg, cls = _bridge()
        ws = msg(c_void_p, cls(b"NSWorkspace"), b"sharedWorkspace")
        apps = msg(c_void_p, ws, b"runningApplications")
        if not apps:
            return pids
        n = int(msg(c_ulong, apps, b"count"))
        me = os.getpid()
        for i in range(n):
            app = msg(c_void_p, apps, b"objectAtIndex:", (c_ulong,), (c_ulong(i),))
            if not app:
                continue
            # 0 = NSApplicationActivationPolicyRegular (shows in the Dock)
            if int(msg(c_long, app, b"activationPolicy")) != 0:
                continue
            pid = int(msg(c_int, app, b"processIdentifier"))
            if pid == me:
                continue   # that's us (Anki)
            bid = msg(c_void_p, app, b"bundleIdentifier")
            if bid:
                cstr = msg(c_char_p, bid, b"UTF8String")
                if cstr and cstr == b"com.apple.finder":
                    continue
            try:
                msg(c_bool, app, b"terminate")   # graceful quit
                pids.append(pid)
            except Exception:
                pass
    except Exception as e:
        log("lockdown close other apps: %s" % e)
    return pids


def _apps_still_running(pids: "list[int]") -> bool:
    """True if any of the given pids is still a running regular app."""
    if not pids:
        return False
    try:
        msg, cls = _bridge()
        ws = msg(c_void_p, cls(b"NSWorkspace"), b"sharedWorkspace")
        apps = msg(c_void_p, ws, b"runningApplications")
        if not apps:
            return False
        n = int(msg(c_ulong, apps, b"count"))
        live = set()
        for i in range(n):
            app = msg(c_void_p, apps, b"objectAtIndex:", (c_ulong,), (c_ulong(i),))
            if app:
                live.add(int(msg(c_int, app, b"processIdentifier")))
        return any(p in live for p in pids)
    except Exception:
        return False


def _keep_in_front(widget) -> None:
    """Make an overlay window float above everything and STAY visible when Anki
    is not the active app. A Qt Tool window is an NSPanel, which hides on
    deactivate by default — the fix is setHidesOnDeactivate:NO plus a high window
    level + all-spaces collection behavior (same as the coherence caption)."""
    try:
        msg, cls = _bridge()
        ns = msg(c_void_p, c_void_p(int(widget.winId())), b"window")
        if not ns:
            return
        msg(None, ns, b"setLevel:", (c_long,), (c_long(25),))  # NSStatusWindowLevel
        msg(None, ns, b"setHidesOnDeactivate:", (c_bool,), (False,))
        # canJoinAllSpaces(1) | fullScreenAuxiliary(1<<8): show over other apps'
        # spaces and their fullscreen windows too.
        msg(None, ns, b"setCollectionBehavior:", (c_ulong,), (c_ulong(1 | (1 << 8)),))
        is_panel = msg(c_bool, ns, b"isKindOfClass:", (c_void_p,), (cls(b"NSPanel"),))
        if is_panel:
            cur = int(msg(c_ulong, ns, b"styleMask"))
            if not (cur & 128):  # NSWindowStyleMaskNonactivatingPanel
                msg(None, ns, b"setStyleMask:", (c_ulong,), (c_ulong(cur | 128),))
            msg(None, ns, b"setFloatingPanel:", (c_bool,), (True,))
            msg(None, ns, b"setBecomesKeyOnlyIfNeeded:", (c_bool,), (True,))
    except Exception as e:
        log("lockdown keep-in-front: %s" % e)


def _activate_and_raise() -> None:
    """Bring Anki frontmost and raise the main window (so nothing peeks out)."""
    try:
        msg, cls = _bridge()
        ns = msg(c_void_p, cls(b"NSApplication"), b"sharedApplication")
        if ns:
            msg(c_void_p, ns, b"activateIgnoringOtherApps:", (c_bool,), (True,))
    except Exception:
        pass
    try:
        mw.raise_()
        mw.activateWindow()
    except Exception:
        pass


def _warn_close_html(secs: int) -> str:
    """The very-strict pre-close warning caption, with a bold countdown."""
    return ("Very strict lockdown — all other apps will be closed in "
            "<b>%ds…</b> <b>Press Esc to cancel.</b>" % secs)


def _wait_html(secs: int) -> str:
    """The very-strict 'quitting other apps' caption, with a bold countdown."""
    return ("Quitting other apps — answer any save prompts. Lockdown engages "
            "once they close, <b>or in %ds…</b>" % secs)


def _hold_secs() -> float:
    try:
        return max(1.0, float(_cfg().get("lockdown_hold_secs", 5.0)))
    except Exception:
        return 5.0


class _Overlay:
    """Small centred 'Hold Space to unlock' pill with a filling progress bar.
    Only shown once a hold is clearly underway (not on quick Space taps)."""

    def __init__(self):
        self._w = None
        self._frac = 0.0

    def _build(self):
        if self._w is not None:
            return
        from aqt.qt import QWidget
        from PyQt6.QtGui import QColor, QPainter, QBrush, QPainterPath, QFont
        from PyQt6.QtCore import QRectF

        outer = self

        class _V(QWidget):
            def paintEvent(_self, ev):
                p = QPainter(_self)
                p.setRenderHint(QPainter.RenderHint.Antialiasing, True)
                w, h = _self.width(), _self.height()
                path = QPainterPath()
                path.addRoundedRect(QRectF(0, 0, w, h), 14, 14)
                p.fillPath(path, QBrush(QColor(18, 19, 22, 225)))
                p.setPen(QColor(235, 238, 242, 235))
                _f = QFont("Lora", 15)
                _f.setFamilies(["Lora", "Georgia"])
                _f.setStyleHint(QFont.StyleHint.Serif)
                p.setFont(_f)
                p.drawText(QRectF(0, 10, w, 22),
                           Qt.AlignmentFlag.AlignHCenter | Qt.AlignmentFlag.AlignVCenter,
                           "Hold Space or `+Delete to unlock")
                pad = 22
                ty, th = h - 18, 5
                track = QRectF(pad, ty, w - 2 * pad, th)
                tp = QPainterPath(); tp.addRoundedRect(track, 2.5, 2.5)
                p.fillPath(tp, QBrush(QColor(255, 255, 255, 36)))
                fw = (w - 2 * pad) * max(0.0, min(1.0, outer._frac))
                if fw > 1:
                    fill = QRectF(pad, ty, fw, th)
                    fp = QPainterPath(); fp.addRoundedRect(fill, 2.5, 2.5)
                    p.fillPath(fp, QBrush(QColor(120, 205, 160, 235)))
                p.end()

        self._w = _V(None)
        self._w.setWindowFlags(
            Qt.WindowType.FramelessWindowHint | Qt.WindowType.Tool
            | Qt.WindowType.WindowStaysOnTopHint
            | Qt.WindowType.WindowDoesNotAcceptFocus)
        self._w.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground, True)
        self._w.setAttribute(Qt.WidgetAttribute.WA_ShowWithoutActivating, True)
        self._w.resize(360, 64)

    def _reposition(self):
        try:
            g = mw.frameGeometry()
            x = g.x() + (g.width() - self._w.width()) // 2
            y = g.y() + int(g.height() * 0.72)
            self._w.move(x, y)
        except Exception:
            pass

    def show(self, frac: float):
        self._build()
        self._frac = frac
        self._reposition()
        if not self._w.isVisible():
            self._w.show()
            _keep_in_front(self._w)
        self._w.raise_()
        self._w.update()

    def set_frac(self, frac: float):
        self._frac = frac
        if self._w is not None and self._w.isVisible():
            self._w.update()

    def is_shown(self) -> bool:
        return self._w is not None and self._w.isVisible()

    def hide(self):
        if self._w is not None:
            self._w.hide()


class _Caption:
    """A message caption: a top-of-screen always-on-top pill for status text
    (e.g. the very-strict 'quitting other apps' notice). Uses a rich-text QLabel
    so parts (the countdown) can be bold. Shows reliably even when Anki isn't
    frontmost — unlike an aqt tooltip, which anchors to Anki."""

    _W = 560

    def __init__(self):
        self._w = None
        self._label = None

    def _build(self):
        if self._w is not None:
            return
        from aqt.qt import QWidget, QLabel, QVBoxLayout
        from PyQt6.QtGui import QColor, QPainter, QBrush, QPainterPath
        from PyQt6.QtCore import QRectF

        class _V(QWidget):
            def paintEvent(_self, ev):
                p = QPainter(_self)
                p.setRenderHint(QPainter.RenderHint.Antialiasing, True)
                w, h = _self.width(), _self.height()
                path = QPainterPath()
                path.addRoundedRect(QRectF(0, 0, w, h), 16, 16)
                p.fillPath(path, QBrush(QColor(18, 19, 22, 235)))
                p.end()

        self._w = _V(None)
        self._w.setWindowFlags(
            Qt.WindowType.FramelessWindowHint | Qt.WindowType.Tool
            | Qt.WindowType.WindowStaysOnTopHint
            | Qt.WindowType.WindowDoesNotAcceptFocus)
        self._w.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground, True)
        self._w.setAttribute(Qt.WidgetAttribute.WA_ShowWithoutActivating, True)
        self._w.setFixedWidth(self._W)

        self._label = QLabel(self._w)
        self._label.setWordWrap(True)
        self._label.setTextFormat(Qt.TextFormat.RichText)
        self._label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        self._label.setStyleSheet(
            "QLabel{color:rgba(236,239,243,0.94);background:transparent;"
            "font-family:'Lora',Georgia,serif;font-size:17px;}")
        lay = QVBoxLayout(self._w)
        lay.setContentsMargins(26, 15, 26, 15)
        lay.addWidget(self._label)

    def _reposition(self):
        try:
            scr = mw.screen() if hasattr(mw, "screen") else None
            g = scr.geometry() if scr else mw.frameGeometry()
            x = g.x() + (g.width() - self._w.width()) // 2
            y = g.y() + int(g.height() * 0.14)
            self._w.move(x, y)
        except Exception:
            pass

    def show(self, html: str):
        self._build()
        self._label.setText(html)
        self._w.adjustSize()      # fit height to the wrapped rich text
        self._reposition()
        if not self._w.isVisible():
            self._w.show()
            _keep_in_front(self._w)
        self._w.raise_()

    def set_text(self, html: str):
        """Update the message in place — for the live countdown."""
        if self._w is None or not self._w.isVisible():
            self.show(html)
            return
        self._label.setText(html)

    def hide(self):
        if self._w is not None:
            self._w.hide()


class _SpaceFilter(QObject):
    """Best-effort backup for non-webview screens: the CGEventTap is the primary
    Space detector (it sees Space over the reviewer webview; this filter does not)."""

    def eventFilter(self, obj, ev):
        try:
            if _mgr is None or not _mgr.locked:
                return False
            t = ev.type()
            if t == QEvent.Type.KeyPress and ev.key() == Qt.Key.Key_Space:
                if not ev.isAutoRepeat():
                    _mgr._begin_hold()
                return state._lockdown_hold_committed
            if t == QEvent.Type.KeyRelease and ev.key() == Qt.Key.Key_Space:
                if not ev.isAutoRepeat():
                    committed = state._lockdown_hold_committed
                    _mgr._cancel_hold()
                    return committed
        except Exception as e:
            log("lockdown eventFilter: %s" % e)
        return False


class Lockdown:
    def __init__(self):
        from time import monotonic
        self._mono = monotonic
        self.locked = False
        self._mask = _MASK_STANDARD
        self._made_fs = False    # True if lockdown put the window into fullscreen
        self._made_focus = False  # True if lockdown turned Focus Mode on
        self._suspended_for_break = False  # kiosk relaxed during a Pomodoro break
        self._apps_closed = False   # very-strict already quit other apps this session
        self._t0 = 0.0
        self._holding = False
        self._overlay = _Overlay()
        self._caption = _Caption()
        self._filter = _SpaceFilter()

        # Very-strict: Wi-Fi ("airplane mode") — restore prior state on exit.
        self._wifi_dev: "str | None" = None
        self._wifi_was_on = False
        # Very-strict: wait for other apps to actually quit before going kiosk.
        self._wait_pids: "list[int]" = []
        self._wait_start = 0.0
        self._pending_mask = _MASK_STANDARD
        self._wait_timer = QTimer()
        self._wait_timer.setInterval(500)
        self._wait_timer.timeout.connect(self._poll_close)

        # Very-strict: abortable "apps will close" warning countdown (before we
        # touch Wi-Fi or quit anything, so Esc cancels cleanly).
        self._warn_start = 0.0
        self._warn_timer = QTimer()
        self._warn_timer.setInterval(500)
        self._warn_timer.timeout.connect(self._poll_warn)
        self._warn_esc = QShortcut(QKeySequence(Qt.Key.Key_Escape), mw)
        self._warn_esc.setContext(Qt.ShortcutContext.ApplicationShortcut)
        self._warn_esc.activated.connect(self._abort_warn)
        self._warn_esc.setEnabled(False)
        # Enter/Space during the warning → skip the countdown, proceed now.
        self._warn_skips = []
        for _k in (Qt.Key.Key_Space, Qt.Key.Key_Return, Qt.Key.Key_Enter):
            _sc = QShortcut(QKeySequence(_k), mw)
            _sc.setContext(Qt.ShortcutContext.ApplicationShortcut)
            _sc.activated.connect(self._skip_warn)
            _sc.setEnabled(False)
            self._warn_skips.append(_sc)

        self._tick = QTimer()
        self._tick.setInterval(_TICK_MS)
        self._tick.timeout.connect(self._on_tick)

        # Re-assert presentation options periodically (macOS clears them if the
        # app is ever deactivated); also keep the window frontmost.
        self._guard = QTimer()
        self._guard.setInterval(1500)
        self._guard.timeout.connect(self._reassert)

        # Primary detectors ride the shared CGEventTap. Connected once; the hold
        # handlers no-op unless locked. Space and the backtick+Delete chord both
        # feed the same hold-to-exit; the chord also engages lockdown when idle.
        self._hold_source = None   # 'space' or 'chord' — which gesture is holding
        try:
            keytap._key_bridge.lockdown_space.connect(lambda p: self._on_hold(p, "space"))
            keytap._key_bridge.lockdown_chord.connect(lambda p: self._on_hold(p, "chord"))
            keytap._key_bridge.lockdown_enter.connect(self._on_enter)
            keytap._key_bridge.lockdown_warn.connect(self._on_warn_key)
        except Exception as e:
            log("lockdown signal connect: %s" % e)

    # -- Pomodoro integration ---------------------------------------------
    def suspend_for_break(self) -> None:
        """A Pomodoro break started: relax the kiosk so the break screen behaves
        normally (Space skips the break, not the lockdown) and you're not trapped.
        Wi-Fi/fullscreen/Focus/closed-apps are left as-is; re-engaged on resume."""
        if not self.locked or self._suspended_for_break:
            return
        if not _cfg().get("lockdown_unlock_on_break", True):
            return
        self._suspended_for_break = True
        self.locked = False
        state._lockdown_on = False        # hand Space back to the break-skip
        self._cancel_hold()
        self._guard.stop()
        _set_presentation_options(0)      # relax kiosk (force-quit etc. back on)
        try:
            _qapp().removeEventFilter(self._filter)
        except Exception:
            pass
        # Give Wi-Fi back for the break (very-strict turned it off). Keep the
        # flags so resume turns it off again for the next work phase.
        if self._wifi_dev and self._wifi_was_on:
            _set_wifi(self._wifi_dev, True)

    def resume_after_break(self) -> None:
        """Pomodoro work resumed: re-assert the kiosk that was relaxed for the
        break (re-hide chrome + Wi-Fi off again). Never re-warns or re-closes
        apps — those were done once at initial engage (_apps_closed)."""
        if not self._suspended_for_break:
            return
        self._suspended_for_break = False
        _activate_and_raise()
        _set_presentation_options(self._mask)
        # Turn Wi-Fi back off for the work phase (it was restored for the break).
        if self._wifi_dev and self._wifi_was_on:
            _set_wifi(self._wifi_dev, False)
        state._lockdown_on = True
        state._lockdown_hold_committed = False
        try:
            _qapp().installEventFilter(self._filter)
        except Exception:
            pass
        self._guard.start()
        self.locked = True

    # -- public ------------------------------------------------------------
    def lock(self) -> bool:
        if self.locked:
            return True
        self._suspended_for_break = False
        level = str(_cfg().get("lockdown_level", "standard")).lower()
        very_strict = (level == "very_strict")
        strict = (level == "strict") or very_strict

        # The hold-Space escape rides the CGEventTap, which needs Accessibility.
        # In strict modes force-quit is disabled, so a failed escape would trap the
        # user — refuse to engage unless the tap can run.
        keytap._start_key_tap()
        if strict and not keytap.ax_trusted():
            try:
                from aqt.utils import tooltip
                tooltip("Strict lockdown needs Accessibility permission "
                        "(System Settings → Privacy → Accessibility → Anki) so the "
                        "hold-Space exit is guaranteed.", period=4500)
            except Exception:
                pass
            return False

        mask = _MASK_STRICT if strict else _MASK_STANDARD

        # Very strict: show an abortable warning countdown FIRST (nothing
        # destructive yet), then _begin_very_strict does Wi-Fi off + quit apps.
        # But if this session already closed apps (re-engaging after a break),
        # skip the warning/close entirely — just re-assert Wi-Fi off + kiosk.
        if very_strict:
            if self._apps_closed:
                if self._wifi_dev and self._wifi_was_on:
                    _set_wifi(self._wifi_dev, False)
                self._engage(mask)
                return True
            self._pending_mask = mask
            self._warn_start = self._mono()
            self._caption.show(_warn_close_html(_APP_CLOSE_WARN))
            self._warn_shortcuts(True)
            self._warn_timer.start()
            return True

        self._engage(mask)
        return True

    def _warn_shortcuts(self, on: bool):
        # Primary path is the CGEventTap (webview eats plain Space/Enter); the Qt
        # shortcuts are a backup that only fires when a non-webview has focus.
        state._lockdown_warn = on
        self._warn_esc.setEnabled(on)
        for sc in self._warn_skips:
            sc.setEnabled(on)

    def _on_warn_key(self, skip: bool):
        # Dispatch by which countdown is currently running.
        if self._warn_timer.isActive():
            self._skip_warn() if skip else self._abort_warn()
        elif self._wait_timer.isActive():
            self._skip_wait() if skip else self._abort_wait()

    def _poll_warn(self):
        elapsed = self._mono() - self._warn_start
        if elapsed >= _APP_CLOSE_WARN:
            self._warn_timer.stop()
            self._warn_shortcuts(False)
            self._begin_very_strict()
            return
        self._caption.set_text(_warn_close_html(max(1, math.ceil(_APP_CLOSE_WARN - elapsed))))

    def _skip_warn(self):
        """Enter/Space during the very-strict warning → proceed to lockdown now."""
        if not self._warn_timer.isActive():
            return
        self._warn_timer.stop()
        self._warn_shortcuts(False)
        self._begin_very_strict()

    def _abort_warn(self):
        """Esc during the very-strict warning → cancel before anything changes."""
        if not self._warn_timer.isActive():
            return
        self._warn_timer.stop()
        self._warn_shortcuts(False)
        self._caption.hide()
        try:
            from aqt.utils import tooltip
            tooltip("Lockdown cancelled", period=1400)
        except Exception:
            pass

    def _begin_very_strict(self):
        """Do the destructive very-strict actions after the warning elapsed:
        Wi-Fi off (remember prior state), then quit other apps. terminate is
        async, so DON'T go fullscreen yet — poll until those apps are gone."""
        self._wifi_dev = _wifi_device()
        if self._wifi_dev:
            self._wifi_was_on = _wifi_is_on(self._wifi_dev)
            if self._wifi_was_on:
                _set_wifi(self._wifi_dev, False)
        self._wait_pids = _close_other_apps()
        self._apps_closed = True   # don't re-close on any re-engage this session
        if self._wait_pids:
            self._wait_start = self._mono()
            self._caption.show(_wait_html(_APP_QUIT_GRACE))
            state._lockdown_warn = True   # accept Space/Enter skip + Esc during the wait
            self._wait_timer.start()
            return
        self._engage(self._pending_mask)

    def _poll_close(self):
        # Engage once the apps we asked to quit are gone, or after a grace period
        # (e.g. the user cancelled a quit to keep working — don't wait forever).
        elapsed = self._mono() - self._wait_start
        if not _apps_still_running(self._wait_pids) or elapsed >= _APP_QUIT_GRACE:
            self._wait_timer.stop()
            self._wait_pids = []
            state._lockdown_warn = False
            if not self.locked:
                self._engage(self._pending_mask)
            return
        # Tick the grace countdown in the caption. The number is derived from real
        # elapsed time (not decremented per tick), so its rate is correct no matter
        # how often we poll.
        self._caption.set_text(_wait_html(max(1, math.ceil(_APP_QUIT_GRACE - elapsed))))

    def _skip_wait(self):
        """Enter/Space during the app-quit wait → engage lockdown now."""
        if not self._wait_timer.isActive():
            return
        self._wait_timer.stop()
        self._wait_pids = []
        state._lockdown_warn = False
        if not self.locked:
            self._engage(self._pending_mask)

    def _abort_wait(self):
        """Esc during the app-quit wait → cancel and restore Wi-Fi (apps already
        quit can't be reopened)."""
        if not self._wait_timer.isActive():
            return
        self._wait_timer.stop()
        self._wait_pids = []
        state._lockdown_warn = False
        self._caption.hide()
        if self._wifi_dev and self._wifi_was_on:
            _set_wifi(self._wifi_dev, True)
        self._wifi_dev = None
        self._wifi_was_on = False
        try:
            from aqt.utils import tooltip
            tooltip("Lockdown cancelled", period=1400)
        except Exception:
            pass

    def _engage(self, mask: int) -> None:
        self._caption.hide()
        _activate_and_raise()
        if not _set_presentation_options(mask):
            return

        # Take the window fullscreen (unless it already is — then leave it be so
        # unlock doesn't drop it out of the user's own fullscreen).
        try:
            if not mw.isFullScreen():
                mw.showFullScreen()
                self._made_fs = True
        except Exception as e:
            log("lockdown fullscreen: %s" % e)

        # Engage Focus Mode (hide chrome) unless the user already had it on.
        try:
            if not focus._focus_mode_on:
                focus._toggle_focus_mode()
                self._made_focus = True
        except Exception as e:
            log("lockdown focus mode: %s" % e)

        self._mask = mask
        self.locked = True
        state._lockdown_on = True
        state._lockdown_hold_committed = False
        try:
            _qapp().installEventFilter(self._filter)
        except Exception as e:
            log("lockdown installEventFilter: %s" % e)
        self._guard.start()
        try:
            from aqt.utils import tooltip
            tooltip("Lockdown ON — hold Space or `+Delete %ds to exit"
                    % int(_hold_secs()), period=2200)
        except Exception:
            pass

    def unlock(self) -> None:
        # Restore Wi-Fi if very-strict turned it off — ALWAYS, even if called when
        # not fully locked (e.g. aborted during the pre-kiosk wait) or on quit.
        if self._wifi_dev and self._wifi_was_on:
            _set_wifi(self._wifi_dev, True)
        self._wifi_dev = None
        self._wifi_was_on = False
        self._suspended_for_break = False
        self._apps_closed = False   # full exit → a fresh lock may close apps again
        if not self.locked:
            return
        # The exit gesture keys are usually STILL held at this instant. Block them
        # from immediately re-triggering lockdown until they're released: for the
        # chord, latch its ignore flag; for Space, swallow it until keyup.
        if keytap._lk_bt_held and keytap._lk_del_held:
            keytap._lk_ignore_until_release = True
        if self._hold_source == "space":
            keytap._swallow_space_until_up = True
        self._hold_source = None
        self.locked = False
        state._lockdown_on = False
        self._cancel_hold()
        self._caption.hide()
        self._guard.stop()
        _set_presentation_options(0)   # NSApplicationPresentationDefault
        try:
            _qapp().removeEventFilter(self._filter)
        except Exception:
            pass
        # Turn Focus Mode back off only if lockdown enabled it.
        if self._made_focus:
            self._made_focus = False
            try:
                if focus._focus_mode_on:
                    focus._toggle_focus_mode()
            except Exception as e:
                log("lockdown exit focus mode: %s" % e)
        # Leave fullscreen only if lockdown was what entered it.
        if self._made_fs:
            self._made_fs = False
            try:
                mw.showNormal()
            except Exception as e:
                log("lockdown exit fullscreen: %s" % e)
            # The exit-fullscreen animation runs ~1s and can leave the window
            # without its yellow minimize button — re-assert it once it settles.
            for _d in (250, 700, 1300):
                QTimer.singleShot(_d, _restore_window_buttons)
        # Restoring presentation options can leave the (transparent) glass window
        # on screen while Qt still thinks it's hidden, so its webviews never
        # repaint — the window looks invisible. Re-sync visibility + re-assert the
        # native glass, on a short delay so it lands after the option change.
        def _revive():
            try:
                from ..user import glass
                glass._wake_main_webviews()
                glass._reapply_native()
            except Exception as e:
                log("lockdown revive: %s" % e)
            try:
                mw.raise_()
                mw.activateWindow()
            except Exception:
                pass
        QTimer.singleShot(0, _revive)
        QTimer.singleShot(120, _revive)

    def toggle(self) -> None:
        self.unlock() if self.locked else self.lock()

    # -- hold detection ----------------------------------------------------
    def _on_enter(self, _pressed: bool):
        """backtick+Delete pressed while unlocked → engage lockdown."""
        if not self.locked:
            self.lock()

    def _on_hold(self, pressed: bool, source: str = "space"):
        if not self.locked:
            return
        if pressed:
            self._hold_source = source
            self._begin_hold()
        else:
            self._cancel_hold()

    def _begin_hold(self):
        if self._holding:
            return
        self._holding = True
        self._t0 = self._mono()
        self._tick.start()   # overlay appears once the hold passes _CONSUME_AFTER

    def _cancel_hold(self):
        self._holding = False
        self._tick.stop()
        state._lockdown_hold_committed = False
        self._overlay.hide()

    def _on_tick(self):
        if not self._holding:
            self._tick.stop()
            return
        elapsed = self._mono() - self._t0
        if elapsed >= _CONSUME_AFTER:
            state._lockdown_hold_committed = True
            if not self._overlay.is_shown():
                self._overlay.show(elapsed / _hold_secs())
        frac = min(1.0, elapsed / _hold_secs())
        self._overlay.set_frac(frac)
        if frac >= 1.0:
            self._cancel_hold()
            self.unlock()
            try:
                from aqt.utils import tooltip
                tooltip("Lockdown OFF", period=1200)
            except Exception:
                pass

    def _reassert(self):
        if not self.locked:
            self._guard.stop()
            return
        _set_presentation_options(self._mask)


def _qapp():
    from aqt.qt import QApplication
    return QApplication.instance()


def _get() -> "Lockdown | None":
    """Lazily create the singleton (macOS only)."""
    global _mgr
    if sys.platform != "darwin":
        return None
    if _mgr is None:
        _mgr = Lockdown()
    return _mgr


def toggle() -> None:
    m = _get()
    if m is None:
        try:
            from aqt.utils import tooltip
            tooltip("Lockdown mode is macOS-only", period=1500)
        except Exception:
            pass
        return
    m.toggle()


def on_pomodoro_break(begin: bool) -> None:
    """Called by the Pomodoro feature at break start (begin=True) / end. No-op
    unless lockdown is currently engaged."""
    if _mgr is None:
        return
    if begin:
        _mgr.suspend_for_break()
    else:
        _mgr.resume_after_break()


def unlock_if_locked() -> None:
    """Safety hook — restore presentation options + Wi-Fi on shutdown / profile
    close (also covers the pre-kiosk wait, where Wi-Fi is off but not yet locked)."""
    if _mgr is not None and (_mgr.locked or _mgr._wifi_dev):
        _mgr.unlock()


def is_locked() -> bool:
    return _mgr is not None and _mgr.locked
