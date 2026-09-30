"""Warm the first cards while a deck's overview is on screen: the next few queued
cards' images are fetched into the web view's cache, so the first card (and the ones
right after it) show without waiting for their pictures. Read-only: nothing about the
queue or the cards is changed."""
import json
import re

from aqt import gui_hooks, mw
from aqt.qt import QTimer

from ..util.config import log

_IMG = re.compile(r"""<img\b[^>]*?\bsrc\s*=\s*["']?([^"' >]+)""", re.I)
_N = 5


def _warm():
    try:
        if getattr(mw, "state", None) != "overview" or mw.col is None:
            return
        q = mw.col.sched.get_queued_cards(fetch_limit=_N)
        srcs = []
        for qc in list(q.cards)[:_N]:
            c = mw.col.get_card(qc.card.id)
            for side in (c.question(), c.answer()):
                for s in _IMG.findall(side or ""):
                    if not s.startswith(("data:", "http:", "https:")) and s not in srcs:
                        srcs.append(s)
        if srcs:
            mw.web.eval("(function(a){window.__jkWarm=a.map(function(s){var i=new Image();"
                        "i.decoding='async';i.src=s;return i;});})(%s);" % json.dumps(srcs[:40]))
    except Exception as e:
        log("preload: %s" % e)


def _on_state(new_state, _old):
    if new_state == "overview":
        QTimer.singleShot(150, _warm)      # after the overview has painted


def install():
    gui_hooks.state_did_change.append(_on_state)
