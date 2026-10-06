"""Z / X / C / V as extra Again / Hard / Good / Easy keys in the reviewer (next to Anki's
1–4). Like 1–4 they only rate once the answer is showing, and they go through the normal
_answerCard path, so Janki's practice-card grading applies unchanged. Anki's review
shortcuts are only live while Anki is focused, so the global Tab+Z/X/C/V chords are
unaffected. They take priority: an Anki action on the same plain key moves to Alt+key
(V = replay your recorded voice → Alt+V). Config: zxcv_rating (default on)."""
from aqt import mw, gui_hooks

from ..util.config import _cfg, log

_KEYS = (("z", 1), ("x", 2), ("c", 3), ("v", 4))


def _rate(ease: int) -> None:
    r = getattr(mw, "reviewer", None)
    if r is None or getattr(r, "state", None) != "answer" or not getattr(r, "card", None):
        return
    try:
        # Respect the deck's button count (e.g. 3-button cards on old schedulers).
        n = r._answerButtonList() and len(r._answerButtonList())
        if n and ease > n:
            return
    except Exception:
        pass
    try:
        r._answerCard(ease)
    except Exception as e:
        log("zxcv: %s" % e)


def _add(state: str, shortcuts: list) -> None:
    if state != "review" or not _cfg().get("zxcv_rating", True):
        return
    # Z/X/C/V win: whatever Anki had on the plain key (V = replay your recorded voice)
    # moves to Alt+<key>, so it's still there
    keys = {k for k, _e in _KEYS}
    for i, (k, fn) in enumerate(list(shortcuts)):
        kl = str(k).lower()
        if kl in keys:
            shortcuts[i] = ("Alt+" + kl.upper(), fn)
    for key, ease in _KEYS:
        shortcuts.append((key, lambda e=ease: _rate(e)))


def install() -> None:
    if not getattr(mw, "_janki_zxcv", False):
        gui_hooks.state_shortcuts_will_change.append(_add)
        mw._janki_zxcv = True
