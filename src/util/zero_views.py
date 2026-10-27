"""Zero-size web views stall the compositor (battery).

With the uncapped frame rate (--disable-frame-rate-limit), a web view that is "visible"
but squeezed to 0 px (a collapsed side panel, a 0-height strip) makes Chromium's
VizCompositorThread spin at ~100 % CPU while idle — measured: Anki at 100 % on the
deck list, from an empty 0 × 0 view. Hiding such a view stops it; it is shown again once
its container has room (the panel opened). Any add-on's views, not only Janki's.
Each hide / restore is noted in ~/.janki_zero_views.txt."""
import os
import time

from aqt import mw
from aqt.qt import QApplication, QTimer

from .config import log

_LOG = os.path.expanduser("~/.janki_zero_views.txt")
_timer = None


def _note(msg):
    try:
        with open(_LOG, "a") as f:
            f.write("%s %s\n" % (time.strftime("%H:%M:%S"), msg))
    except Exception:
        pass


def _name(w):
    p = w.parentWidget()
    chain = []
    while p is not None and len(chain) < 3:
        chain.append(type(p).__name__ + (":" + p.objectName() if p.objectName() else ""))
        p = p.parentWidget()
    return "%s(%s) in %s" % (type(w).__name__, w.objectName() or "-", " < ".join(chain) or "-")


def _scan():
    try:
        from aqt.qt import QWebEngineView
    except Exception:
        return
    for w in QApplication.allWidgets():
        try:
            if not isinstance(w, QWebEngineView):
                continue
            if getattr(w, "_jk_zero_hidden", False):
                p = w.parentWidget()
                if p is not None and p.isVisible() and p.width() >= 40 and p.height() >= 40:
                    w._jk_zero_hidden = False
                    w.setVisible(True)
                    _note("shown again: %s" % _name(w))
                continue
            if getattr(w, "_jk_one", False) and w.width() == 1 and w.height() == 1:
                continue                     # already parked at 1 × 1
            if w.isVisible() and (w.width() < 1 or w.height() < 1):
                # Contanki reads the controller from a 0 × 0 view parked on the main
                # window: it must stay "visible" (Chromium only gives pad data to a visible
                # page), so it gets a 1 × 1 px size tucked behind everything instead —
                # no longer zero-size, so the compositor stops spinning
                # (setFixedSize: Contanki pins its view with setFixedSize(0, 0), whose
                # 0 maximum clamped a plain resize straight back)
                if w.parentWidget() is mw or type(w).__name__ == "Contanki":
                    w._jk_one = True
                    w.setFixedSize(1, 1)
                    w.move(0, 0)
                    w.lower()
                    _note("1x1: %s" % _name(w))
                    continue
                w._jk_zero_hidden = True
                w.setVisible(False)
                _note("hid %dx%d: %s" % (w.width(), w.height(), _name(w)))
        except Exception:
            continue


def _quiet_contanki_connects():
    """Contanki says "<controller> Connected" on every connect event — Chromium sends one
    whenever its page becomes visible again, and the first press of a session shows it.
    Not shown at all; its other messages (errors…) are untouched."""
    try:
        import importlib
        mod = importlib.import_module("1898790263.contanki")
    except Exception:
        return
    orig = getattr(mod, "tooltip", None)
    if orig is None or getattr(orig, "_jk", False):
        return
    seen = {}

    def tooltip(msg, *a, **k):
        try:
            text = str(msg)
            if text.endswith(" Connected"):
                # it appears on the first button press (that's what reveals the pad to
                # Contanki's page), mid-review — not useful: never shown
                return None
        except Exception:
            pass
        return orig(msg, *a, **k)
    tooltip._jk = True
    mod.tooltip = tooltip


def install():
    global _timer
    _quiet_contanki_connects()
    if _timer is not None:
        return
    try:
        _timer = QTimer(mw)
        _timer.timeout.connect(_scan)
        _timer.start(1500)
    except Exception as e:
        log("zero views: %s" % e)
