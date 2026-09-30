"""Janki UI sound effects (Settings → Focus → Sounds).

Short original sounds (assets/sounds, made by tools/make_sfx.py) for keyboard/remote
navigation and reviewing. Played with QSoundEffect (low latency, preloaded). Volume
0 = off; navigation and review sounds can be switched off separately."""
import os

from aqt import gui_hooks, mw

from ..util.config import _cfg, log

_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
_DIR = os.path.join(_ROOT, "assets", "sounds")
BANKS = ["mallet", "chime", "soft", "retro", "custom"]
CUSTOM_DIR = os.path.join(_ROOT, "user_files", "sounds")


def _bank():
    b = str(_cfg().get("sfx_bank", "mallet"))
    return b if b in BANKS else "mallet"


def _path(name):
    """This sound's file in the chosen set; Custom falls back to Mallet per sound."""
    b = _bank()
    if b == "custom":
        p = os.path.join(CUSTOM_DIR, name + ".wav")
        if os.path.isfile(p):
            return p
        b = "mallet"
    return os.path.join(_DIR, b, name + ".wav")
NAV = {"move", "select", "back", "open", "fold", "unfold", "page", "settings", "stats",
       "practice", "sync", "tray",
       "exit"}
REVIEW = {"reveal", "again", "hard", "good", "easy", "right", "wrong", "timeup"}
_fx = {}
# Played on every card while studying — kept at half level so they don't wear.
_IN_REVIEW_SOFT = {"reveal", "again", "hard", "good", "easy"}


def _effect(name):
    path = _path(name)
    fx = _fx.get(path)
    if fx is None:
        try:
            from aqt.qt import QUrl
            from PyQt6.QtMultimedia import QSoundEffect
            fx = QSoundEffect(mw)
            fx.setSource(QUrl.fromLocalFile(path))
            _fx[path] = fx
        except Exception as e:
            log("sfx %s: %s" % (name, e))
            _fx[path] = False
            return None
    return fx or None


def play(name, force=False):
    c = _cfg()
    vol = int(c.get("sfx_volume", 0))          # off unless turned up
    if (vol <= 0 or c.get("sfx_muted", False)) and not force:
        return
    if not force:
        if name in (c.get("sfx_disabled") or []):    # switched off individually
            return
        if name in NAV and not c.get("sfx_nav", True):
            return
        if name in REVIEW and not c.get("sfx_review", True):
            return
    fx = _effect(name)
    if fx is None:
        return
    try:
        gain = float((c.get("sfx_gain") or {}).get(name, 100)) / 100.0   # per-sound level
        if not force and name in _IN_REVIEW_SOFT:
            gain *= 0.5                         # card-by-card sounds sit well back
        fx.setVolume(max(0.0, min(1.0, (vol if vol > 0 else 30) / 100.0 * gain)))
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


_easy_streak = 0


def _arpeggio(n):
    """Easy streaks climb the rating notes (C–E–G–C): the last n of them, quickly."""
    from aqt.qt import QTimer
    notes = ["again", "hard", "good", "easy"][-n:]
    for i, name in enumerate(notes):
        QTimer.singleShot(i * 55, lambda nm=name: play(nm))


def _on_answer(reviewer, card, ease):
    global _easy_streak
    if _is_practice(card):
        return                                  # the pick already played right/wrong
    ease = int(ease)
    if ease == 4:
        _easy_streak += 1
        if _easy_streak >= 2:
            _arpeggio(min(4, _easy_streak))     # 2 → G C, 3 → E G C, 4+ → C E G C
            return
    else:
        _easy_streak = 0
    play({1: "again", 2: "hard", 3: "good", 4: "easy"}.get(ease, "good"))


def _on_show_answer(card):
    if not _is_practice(card):
        play("reveal")


def on_js_message(handled, message, context):
    if isinstance(message, str) and message.startswith("janki:sfx:"):
        play(message.split(":", 2)[2])
        return (True, None)
    return handled


def play_on_exit():
    """Quitting: Anki is gone within milliseconds, which would cut a QSoundEffect off —
    so hand the exit sound to the system player, which outlives the app."""
    c = _cfg()
    vol = int(c.get("sfx_volume", 0))
    if vol <= 0 or c.get("sfx_muted") or not c.get("sfx_nav", True) \
            or "exit" in (c.get("sfx_disabled") or []):
        return
    path = _path("exit")
    if not os.path.isfile(path):
        return
    gain = vol / 100.0 * float((c.get("sfx_gain") or {}).get("exit", 100)) / 100.0
    try:
        import subprocess, sys
        if sys.platform == "darwin":
            subprocess.Popen(["/usr/bin/afplay", "-v", "%.2f" % max(0.0, min(1.0, gain)), path],
                             start_new_session=True, stdout=subprocess.DEVNULL,
                             stderr=subprocess.DEVNULL)
        elif sys.platform.startswith("win"):
            ps = ("(New-Object Media.SoundPlayer '%s').PlaySync()" % path.replace("'", "''"))
            subprocess.Popen(["powershell", "-NoProfile", "-WindowStyle", "Hidden",
                              "-Command", ps], creationflags=0x08000000)   # no window
    except Exception as e:
        log("sfx exit: %s" % e)


def install():
    gui_hooks.reviewer_did_answer_card.append(_on_answer)
    gui_hooks.reviewer_did_show_answer.append(_on_show_answer)   # a subtle slide
    gui_hooks.webview_did_receive_js_message.append(on_js_message)
    try:                                        # a sync you start yourself (not auto)
        orig = mw.on_sync_button_clicked
        if not getattr(orig, "_jk_sfx", False):
            def _sync_clicked(*a, **k):
                play("sync")
                return orig(*a, **k)
            _sync_clicked._jk_sfx = True
            mw.on_sync_button_clicked = _sync_clicked
    except Exception:
        pass
    try:
        mw.app.aboutToQuit.connect(play_on_exit)
    except Exception:
        pass
    try:
        from aqt.qt import QTimer
        gui_hooks.profile_did_open.append(lambda: QTimer.singleShot(3000, preload))
    except Exception:
        pass
