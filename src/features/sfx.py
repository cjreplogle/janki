"""Janki UI sound effects (Settings → Focus → Sounds).

Short original sounds (assets/sounds, made by tools/make_sfx.py) for keyboard/remote
navigation and reviewing. Played with QSoundEffect (low latency, preloaded). Volume
0 = off; navigation and review sounds can be switched off separately."""
import os

from aqt import gui_hooks, mw

from ..util.config import _cfg, log

_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
                    "assets", "sounds")
NAV = {"move", "select", "back", "open"}
REVIEW = {"reveal", "again", "hard", "good", "easy", "right", "wrong"}
_fx = {}


def _effect(name):
    fx = _fx.get(name)
    if fx is None:
        try:
            from aqt.qt import QUrl
            from PyQt6.QtMultimedia import QSoundEffect
            fx = QSoundEffect(mw)
            fx.setSource(QUrl.fromLocalFile(os.path.join(_DIR, name + ".wav")))
            _fx[name] = fx
        except Exception as e:
            log("sfx %s: %s" % (name, e))
            _fx[name] = False
            return None
    return fx or None


def play(name, force=False):
    c = _cfg()
    vol = int(c.get("sfx_volume", 0))          # off unless turned up
    if (vol <= 0 or c.get("sfx_muted", False)) and not force:
        return
    if not force:
        if name in NAV and not c.get("sfx_nav", True):
            return
        if name in REVIEW and not c.get("sfx_review", True):
            return
    fx = _effect(name)
    if fx is None:
        return
    try:
        fx.setVolume(max(0.0, min(1.0, (vol if vol > 0 else 30) / 100.0)))
        fx.play()
    except Exception as e:
        log("sfx play: %s" % e)


def preload():
    for n in NAV | REVIEW:
        _effect(n)


def _is_practice(card):
    try:
        from ..integrations import qbank
        return card.note().note_type()["name"] == qbank._MODEL_NAME
    except Exception:
        return False


def _on_answer(reviewer, card, ease):
    if _is_practice(card):
        return                                  # the pick already played right/wrong
    play({1: "again", 2: "hard", 3: "good", 4: "easy"}.get(int(ease), "good"))


def _on_show_answer(card):
    if not _is_practice(card):
        play("reveal")


def on_js_message(handled, message, context):
    if isinstance(message, str) and message.startswith("janki:sfx:"):
        play(message.split(":", 2)[2])
        return (True, None)
    return handled


def install():
    gui_hooks.reviewer_did_answer_card.append(_on_answer)
    # (no sound on revealing the answer — only ratings/picks make one)
    gui_hooks.webview_did_receive_js_message.append(on_js_message)
    try:
        from aqt.qt import QTimer
        gui_hooks.profile_did_open.append(lambda: QTimer.singleShot(3000, preload))
    except Exception:
        pass
