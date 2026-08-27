"""IOKit HID / GameController polling and app-nap prevention."""

import sys
import ctypes
from ctypes import c_void_p, c_char_p, c_int, c_long
from aqt import mw
from aqt.qt import QTimer

from ..util.bridge import _bridge
from ..util.config import _cfg
from ..util import state
from ..ui import hud
from ..util import keytap

# ---------------------------------------------------------------------------
# Focus-independent gamepad (GameController framework)
# ---------------------------------------------------------------------------
# Contanki reads the controller via the browser Gamepad API, which only delivers
# input while Anki is focused. In coherence mode Anki is unfocused, so we poll the
# controller directly via GCController (OS-level, focus-independent) and forward
# button presses to the reviewer — but only while a card is up (_remote_active)
# AND Anki is NOT the active app, so we never double-fire with Contanki.
_gc_timer = None
_gc_msg = None
_gc_cls = None
_gc_last = {}          # button selector -> last isPressed
_gc_logged_count = -1  # log controller count when it changes (probe)

# GCExtendedGamepad button -> target macOS keycode (via _send_key_to_anki).
# The 8bitdo Zero 2 (Nintendo layout) maps to the framework's logical buttons
# with the A<->B / X<->Y swap (confirmed empirically):
#   physical Y (Again) -> buttonX -> kc18
#   physical B (Hard)  -> buttonA -> kc19  (also shows the answer on the Q side)
#   physical X (Good)  -> buttonY -> kc20
#   physical A (Easy)  -> buttonB -> kc21
_GC_BUTTON_KC = {b"buttonX": 18, b"buttonA": 19, b"buttonY": 20, b"buttonB": 21}
_gc_shutting_down = False  # set on teardown so the poll can't touch a dying app
_gc_last_hb = 0.0          # throttle for the backgrounded diagnostic heartbeat


def _gc_poll():
    global _gc_logged_count
    if _gc_msg is None or _gc_shutting_down:
        return
    try:
        msg = _gc_msg
        GC = _gc_cls(b"GCController")
        arr = msg(c_void_p, GC, b"controllers") if GC else None
        n = int(msg(ctypes.c_long, arr, b"count")) if arr else 0
        if n != _gc_logged_count:
            _gc_logged_count = n
            keytap._gtap_log(f"[gamepad] GCController count={n}")
        if not n:
            return
        NSApp = msg(c_void_p, _gc_cls(b"NSApplication"), b"sharedApplication")
        app_active = bool(msg(ctypes.c_bool, NSApp, b"isActive"))
        try:
            coherence_visible = bool(hud._coherence_hud is not None
                                     and hud._coherence_hud.isVisible())
        except Exception:
            coherence_visible = False
        # Forward when the coherence HUD is up OR Anki is in the background —
        # exactly the cases where Contanki is silent (the HUD on top blurs the
        # reviewer's document so its Gamepad API stops delivering; a backgrounded
        # app gets no gamepad input either). In plain focused review Contanki
        # handles the pad, so we stay out to avoid double-rating.
        # Only forward when Anki is NOT the active app, to avoid double-firing with
        # Contanki (which stays active with the HUD up — it shows without taking
        # focus, so the reviewer keeps focus). NOTE: GameController does not deliver
        # input to a backgrounded app, so in practice this reads nothing there —
        # the poller is currently inert. Truly reading the pad while Anki is
        # backgrounded needs an IOKit HID monitor (not yet implemented).
        forward = state._remote_active and not app_active
        _ = coherence_visible  # (retained for clarity; not used in the gate)
        for i in range(n):
            ctrl = msg(c_void_p, arr, b"objectAtIndex:", (ctypes.c_long,), (i,))
            gp = msg(c_void_p, ctrl, b"extendedGamepad") if ctrl else None
            if not gp:
                continue
            for sel, kc in _GC_BUTTON_KC.items():
                btn = msg(c_void_p, gp, sel)
                if not btn:
                    continue
                pressed = bool(msg(ctypes.c_bool, btn, b"isPressed"))
                if pressed and not _gc_last.get(sel, False):  # rising edge
                    _rstate = getattr(getattr(mw, 'reviewer', None), 'state', None)
                    keytap._gtap_log(f"[gamepad] {sel.decode()} active={app_active} "
                              f"hud={coherence_visible} fwd={forward} rstate={_rstate}")
                    if forward:
                        keytap._send_key_to_anki(kc, reveal_first=True)
                _gc_last[sel] = pressed
    except Exception as e:
        keytap._gtap_log(f"gc poll: {e}")


_app_nap_token = None


def _prevent_app_nap():
    """Assert a background activity so macOS App Nap doesn't throttle/suspend our
    timers when Anki is in the background — which is exactly coherence mode. Without
    this the gamepad poll stops the moment you switch to another app, so controller
    presses stop registering. NSActivityBackground (0xFF) = background work that
    must not be napped."""
    global _app_nap_token
    if _app_nap_token is not None:
        return
    try:
        msg, cls = _bridge()
        pi = msg(c_void_p, cls(b"NSProcessInfo"), b"processInfo")
        reason = msg(c_void_p, cls(b"NSString"), b"stringWithUTF8String:",
                     (c_char_p,), (b"janki gamepad polling",))
        token = msg(c_void_p, pi, b"beginActivityWithOptions:reason:",
                    (ctypes.c_ulonglong, c_void_p), (0x000000FF, reason))
        if token:
            msg(c_void_p, token, b"retain")  # hold it or the activity ends
            _app_nap_token = token
            keytap._gtap_log("app nap prevention active")
    except Exception as e:
        keytap._gtap_log(f"app nap: {e}")


def _start_gamepad_poll():
    global _gc_timer, _gc_msg, _gc_cls
    if sys.platform != 'darwin' or _gc_timer is not None:
        return
    try:
        ctypes.CDLL('/System/Library/Frameworks/GameController.framework/GameController')
        _gc_msg, _gc_cls = _bridge()
    except Exception as e:
        keytap._gtap_log(f"gamepad framework load: {e}")
        return
    _prevent_app_nap()  # keep polling alive when Anki is backgrounded (coherence)
    _gc_timer = QTimer(mw)  # parented so Qt manages its lifetime
    _gc_timer.setInterval(40)  # ~25 Hz
    _gc_timer.timeout.connect(_gc_poll)
    _gc_timer.start()
    # Stop the poll as early as possible on shutdown (before the ObjC/framework
    # teardown that bus-errors if a poll fires mid-exit).
    try:
        mw.app.aboutToQuit.connect(_stop_gamepad_poll)
    except Exception:
        pass
    keytap._gtap_log("gamepad poll started")


def _stop_gamepad_poll():
    """Stop the poll timer before shutdown — polling into the GameController /
    ObjC bridge while the app tears down bus-errors (crash on exit)."""
    global _gc_timer, _gc_shutting_down
    _gc_shutting_down = True
    try:
        if _gc_timer is not None:
            _gc_timer.stop()
            _gc_timer.timeout.disconnect(_gc_poll)
            _gc_timer = None
    except Exception:
        pass


# ---------------------------------------------------------------------------
# Focus-INDEPENDENT controller via IOKit HID  (the real path for caption mode)
# ---------------------------------------------------------------------------
# GameController (above) is focus-gated on macOS: it won't deliver input to a
# backgrounded app, so it can't drive Anki while another app is focused/full-
# screen (see feedback-ankiglass-gamepad). IOHIDManager reads raw device reports
# off a dedicated CFRunLoop thread, independent of focus — like Karabiner. This
# is the infrastructure for controller-in-caption-mode.
#
# Requires the INPUT MONITORING permission (System Settings > Privacy & Security
# > Input Monitoring > Anki); macOS prompts on the first IOHIDManagerOpen.
#
# Button numbers here are RAW HID usages (Button usage page 0x09, usage = button
# index), which differ from GameController's logical buttons AND are device-
# specific. So this LOGS every button ("[hid] button N ...") to discover the
# mapping, and reads the number->keycode map from config `hid_button_kc`, e.g.
#   "hid_button_kc": {"1": 18, "2": 19, "3": 20, "4": 21}
# (kc 18-21 = reviewer keys 1-4 = Again/Hard/Good/Easy). Forwarding is gated the
# same way as the GC poller: a card is up (_remote_active) AND Anki is not the
# focused app (_anki_focused) — i.e. exactly caption/background mode, so we never
# double-fire with Contanki.
_hid_manager = None
_hid_cb_ref = None            # keep the CFUNCTYPE callback object alive
_hid_thread = None
_hid_shutting_down = False
_hid_last = {}                # button usage -> last integer value (edge detect)
_hid_axis_last = {}           # d-pad axis usage -> last quantized pos (0/127/255)
_hid_runloop = None           # bg thread's CFRunLoop (so teardown can stop it)
_hid_cf = None                # CoreFoundation handle (for CFRunLoopStop at exit)
_HID_USAGE_PAGE_BUTTON = 0x09


def _hid_button_map():
    """config hid_button_kc (JSON keys are strings) -> {int button: int keycode}."""
    raw = _cfg().get("hid_button_kc", {}) or {}
    out = {}
    for k, v in raw.items():
        try:
            out[int(k)] = int(v)
        except Exception:
            pass
    return out


def _hid_break_skip_usage():
    """HID button usage that skips a Pomodoro break when held (mirrors hold-Space).
    Default 2 = the 8bitdo B button (the one used to flip cards)."""
    try:
        return int(_cfg().get("hid_break_skip_usage", 2))
    except Exception:
        return 2


def _start_hid_monitor():
    """Open an IOHIDManager matching gamepads/joysticks and forward their button
    presses to the reviewer from a background CFRunLoop thread. No-op unless the
    `hid_controller` config flag is on."""
    global _hid_manager, _hid_cb_ref, _hid_thread, _hid_shutting_down, _hid_cf
    if sys.platform != 'darwin' or _hid_thread is not None:
        return
    if not _cfg().get("hid_controller", False):
        return
    import threading
    try:
        IOKit = ctypes.CDLL('/System/Library/Frameworks/IOKit.framework/IOKit')
        CF = ctypes.CDLL('/System/Library/Frameworks/CoreFoundation.framework/CoreFoundation')
    except Exception as e:
        keytap._gtap_log(f"[hid] framework load: {e}")
        return
    try:
        # --- ctypes signatures. Pointer returns MUST be c_void_p or ctypes
        #     truncates the 64-bit pointer and CoreFoundation PAC-checks crash. ---
        IOKit.IOHIDManagerCreate.restype = c_void_p
        IOKit.IOHIDManagerCreate.argtypes = [c_void_p, ctypes.c_uint32]
        IOKit.IOHIDManagerSetDeviceMatchingMultiple.argtypes = [c_void_p, c_void_p]
        IOKit.IOHIDManagerRegisterInputValueCallback.argtypes = [c_void_p, c_void_p, c_void_p]
        IOKit.IOHIDManagerScheduleWithRunLoop.argtypes = [c_void_p, c_void_p, c_void_p]
        IOKit.IOHIDManagerOpen.restype = ctypes.c_uint32
        IOKit.IOHIDManagerOpen.argtypes = [c_void_p, ctypes.c_uint32]
        IOKit.IOHIDValueGetElement.restype = c_void_p
        IOKit.IOHIDValueGetElement.argtypes = [c_void_p]
        IOKit.IOHIDValueGetIntegerValue.restype = c_long
        IOKit.IOHIDValueGetIntegerValue.argtypes = [c_void_p]
        IOKit.IOHIDElementGetUsagePage.restype = ctypes.c_uint32
        IOKit.IOHIDElementGetUsagePage.argtypes = [c_void_p]
        IOKit.IOHIDElementGetUsage.restype = ctypes.c_uint32
        IOKit.IOHIDElementGetUsage.argtypes = [c_void_p]

        CF.CFNumberCreate.restype = c_void_p
        CF.CFNumberCreate.argtypes = [c_void_p, c_int, c_void_p]
        CF.CFStringCreateWithCString.restype = c_void_p
        CF.CFStringCreateWithCString.argtypes = [c_void_p, c_char_p, ctypes.c_uint32]
        CF.CFDictionaryCreate.restype = c_void_p
        CF.CFDictionaryCreate.argtypes = [c_void_p, ctypes.POINTER(c_void_p),
                                          ctypes.POINTER(c_void_p), c_long,
                                          c_void_p, c_void_p]
        CF.CFArrayCreate.restype = c_void_p
        CF.CFArrayCreate.argtypes = [c_void_p, ctypes.POINTER(c_void_p), c_long, c_void_p]
        CF.CFRunLoopGetCurrent.restype = c_void_p
        CF.CFRunLoopStop.argtypes = [c_void_p]
        IOKit.IOHIDManagerUnscheduleFromRunLoop.argtypes = [c_void_p, c_void_p, c_void_p]
        IOKit.IOHIDManagerClose.restype = ctypes.c_uint32
        IOKit.IOHIDManagerClose.argtypes = [c_void_p, ctypes.c_uint32]

        kCFStringEncodingUTF8 = 0x08000100
        kCFNumberIntType = 9
        # Addresses of CF's global callback structs (needed to build typed
        # CFDictionary / CFArray). c_char.in_dll gives the first byte of the
        # struct; addressof → the struct's address.
        kKeyCB = ctypes.addressof(ctypes.c_char.in_dll(CF, 'kCFTypeDictionaryKeyCallBacks'))
        kValCB = ctypes.addressof(ctypes.c_char.in_dll(CF, 'kCFTypeDictionaryValueCallBacks'))
        kArrCB = ctypes.addressof(ctypes.c_char.in_dll(CF, 'kCFTypeArrayCallBacks'))
        kMode = c_void_p.in_dll(CF, 'kCFRunLoopDefaultMode').value

        def _cfstr(s):
            return CF.CFStringCreateWithCString(None, s, kCFStringEncodingUTF8)

        def _cfnum(n):
            v = c_int(n)
            return CF.CFNumberCreate(None, kCFNumberIntType, ctypes.byref(v))

        def _match_dict(usage_page, usage):
            keys = (c_void_p * 2)(_cfstr(b"DeviceUsagePage"), _cfstr(b"DeviceUsage"))
            vals = (c_void_p * 2)(_cfnum(usage_page), _cfnum(usage))
            return CF.CFDictionaryCreate(None, keys, vals, 2,
                                         c_void_p(kKeyCB), c_void_p(kValCB))

        # Match gamepads (Generic Desktop usage 5) and joysticks (usage 4).
        items = (c_void_p * 2)(_match_dict(1, 5), _match_dict(1, 4))
        matches = CF.CFArrayCreate(None, items, 2, c_void_p(kArrCB))

        mgr = IOKit.IOHIDManagerCreate(None, 0)
        if not mgr:
            keytap._gtap_log("[hid] IOHIDManagerCreate returned NULL")
            return
        IOKit.IOHIDManagerSetDeviceMatchingMultiple(mgr, matches)

        HIDCB = ctypes.CFUNCTYPE(None, c_void_p, ctypes.c_uint32, c_void_p, c_void_p)

        def _on_value(context, result, sender, value):
            # Runs on the background CFRunLoop thread. Only touch plain Python
            # globals + the thread-safe Qt signal here — NO AppKit (not thread
            # safe); the focus gate uses the _anki_focused bool tracked on the
            # main thread.
            if _hid_shutting_down or not value:
                return
            try:
                elem = IOKit.IOHIDValueGetElement(value)
                if not elem:
                    return
                page = int(IOKit.IOHIDElementGetUsagePage(elem))
                if page != _HID_USAGE_PAGE_BUTTON:
                    u = int(IOKit.IOHIDElementGetUsage(elem))
                    iv = int(IOKit.IOHIDValueGetIntegerValue(value))
                    # DISCOVERY: log non-button elements (hat switch / d-pad axes
                    # live on the Generic Desktop page 0x01) on value change so we
                    # can map the D-pad. Deduped to avoid axis spam. Temporary.
                    if _cfg().get("hid_discover", False):
                        k = (page, u)
                        if _hid_last.get(k) != iv:
                            _hid_last[k] = iv
                            keytap._gtap_log(f"[hid] discover page=0x{page:x} "
                                      f"usage=0x{u:x} value={iv}")
                    # D-pad → move the caption around the 3x3 grid. The Zero 2
                    # reports its D-pad as Generic Desktop (0x01) X/Y axes: 0 and
                    # 255 at the extremes, 127 at rest. Fire the matching arrow
                    # keycode on the EDGE into an extreme (not on release, not
                    # repeatedly). Arrows are handled by _send_key_to_anki →
                    # _nudge_coherence (126=up 125=down 123=left 124=right).
                    if page == 0x01 and u in (0x30, 0x31):
                        cur = 0 if iv < 64 else (255 if iv > 191 else 127)
                        if _hid_axis_last.get(u) != cur:
                            _hid_axis_last[u] = cur
                            if cur != 127:
                                if u == 0x31:
                                    kc = 126 if cur == 0 else 125
                                else:
                                    kc = 123 if cur == 0 else 124
                                fwd = bool(state._remote_active and not state._anki_focused)
                                keytap._gtap_log(f"[hid] dpad kc={kc} fwd={fwd}")
                                if fwd:
                                    keytap._key_bridge.send_key.emit(kc)
                    return
                usage = int(IOKit.IOHIDElementGetUsage(elem))
                ival = int(IOKit.IOHIDValueGetIntegerValue(value))
                last = _hid_last.get(usage)
                _hid_last[usage] = ival
                # Break-skip: hold the configured button (default B / usage 2) to
                # skip a Pomodoro break, mirroring the hold-Space bypass. Drive the
                # SAME pomo_space signal the keyboard path uses (press=arm the 3s
                # fill ticker, release=reset) so the fill/skip logic is shared. This
                # runs regardless of focus — the break overlay is up, so there's no
                # card to rate underneath — and returns so the press isn't also
                # forwarded as a rating.
                if state._pomo_on_break and usage == _hid_break_skip_usage():
                    if ival == 1 and last != 1:      # button down
                        keytap._key_bridge.pomo_space.emit(True)
                    elif ival == 0 and last == 1:    # button up
                        keytap._key_bridge.pomo_space.emit(False)
                    return
                if ival == 1 and last != 1:   # rising edge = button down
                    fwd = bool(state._remote_active and not state._anki_focused)
                    keytap._gtap_log(f"[hid] button {usage} press fwd={fwd} "
                              f"remote={state._remote_active} focused={state._anki_focused}")
                    if fwd:
                        kc = _hid_button_map().get(usage)
                        if kc is not None:
                            # Rating keys use the reveal-first two-press flow (a
                            # question-side press flips the card, the next rates);
                            # everything else (e.g. caption toggle) sends plain.
                            sig = (keytap._key_bridge.send_key_rf if kc in (18, 19, 20, 21)
                                   else keytap._key_bridge.send_key)
                            sig.emit(kc)   # -> main thread
            except Exception as e:
                keytap._gtap_log(f"[hid] cb: {e}")

        _hid_cb_ref = HIDCB(_on_value)
        IOKit.IOHIDManagerRegisterInputValueCallback(mgr, _hid_cb_ref, None)
        _prevent_app_nap()   # keep the bg runloop alive while Anki is backgrounded

        def _run():
            global _hid_runloop
            try:
                _hid_runloop = CF.CFRunLoopGetCurrent()
                IOKit.IOHIDManagerScheduleWithRunLoop(mgr, _hid_runloop, kMode)
                ret = int(IOKit.IOHIDManagerOpen(mgr, 0))
                if ret != 0:
                    keytap._gtap_log(f"[hid] IOHIDManagerOpen failed 0x{ret:x} — grant "
                              "Anki 'Input Monitoring' in Privacy & Security")
                    return
                keytap._gtap_log("[hid] monitor running (focus-independent)")
                CF.CFRunLoopRun()   # returns when _stop_hid_monitor stops the loop
                # Clean teardown ON THIS THREAD (the one that opened/scheduled the
                # manager) so IOKit isn't torn down under a live callback = the
                # bus error seen on quit.
                try:
                    IOKit.IOHIDManagerUnscheduleFromRunLoop(mgr, _hid_runloop, kMode)
                    IOKit.IOHIDManagerClose(mgr, 0)
                except Exception:
                    pass
            except Exception as e:
                keytap._gtap_log(f"[hid] run: {e}")

        _hid_manager = mgr
        _hid_cf = CF
        _hid_shutting_down = False
        _hid_thread = threading.Thread(target=_run, daemon=True)
        _hid_thread.start()
        try:
            mw.app.aboutToQuit.connect(_stop_hid_monitor)
        except Exception:
            pass
        # Backup: the dev `just run` quit can skip aboutToQuit, and _stop must run
        # BEFORE sip tears down QObjects at interpreter exit. atexit is LIFO and
        # sip registers its cleanup at PyQt-import (earlier than us), so our
        # handler runs first. _stop_hid_monitor is idempotent (guard + is_alive).
        import atexit
        atexit.register(_stop_hid_monitor)
        keytap._gtap_log("[hid] monitor started")
    except Exception as e:
        keytap._gtap_log(f"[hid] start: {e}")


def _stop_hid_monitor():
    """Stop dispatching HID input and tear the monitor down cleanly BEFORE the
    process exits. Setting the guard alone isn't enough: the daemon CFRunLoop
    thread stays inside CFRunLoopRun with the manager open+scheduled, so on quit
    IOKit can fire the callback (or get torn down under one) mid-shutdown = the
    bus error. So we also stop the bg runloop and join it; _run then unschedules
    and closes the manager on its own thread before returning."""
    global _hid_shutting_down
    _hid_shutting_down = True
    rl, cf, th = _hid_runloop, _hid_cf, _hid_thread
    # CFRunLoopStop only wakes CFRunLoopRun if the loop is *currently* inside it;
    # issued a hair too early (between callouts, or before Run starts) it's a
    # no-op and the daemon thread stays parked in CFRunLoopRun. A single stop +
    # 1s join could therefore leave the thread alive into interpreter shutdown,
    # where its live IOKit callback races sip's atexit QObject cleanup = the
    # SIGBUS on quit. So retry the stop while polling the join, up to ~3s, until
    # the bg thread actually returns (it unschedules + closes the manager on its
    # own thread first).
    if th is not None:
        import time as _t
        deadline = _t.monotonic() + 3.0
        while th.is_alive() and _t.monotonic() < deadline:
            if cf is not None and rl is not None:
                try:
                    cf.CFRunLoopStop(rl)   # thread-safe; wakes CFRunLoopRun
                except Exception:
                    pass
            th.join(timeout=0.1)
        if th.is_alive():
            keytap._gtap_log("[hid] monitor thread did not stop within 3s")
