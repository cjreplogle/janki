"""Better Manki: a toggle for the restyled Manki muscle cards ("Marlin - Muscle Chart").

On: no Marlin logo, pictures beside the text (picture | centered text | picture), the
deck on its own "smart order" preset and new cards introduced focused-first (one detail
per card, the recall-everything card last). Off: the note type's original styling, the
deck's original preset and the original new-card order.

Both versions are kept in the collection config (`janki_better_manki`), so the toggle
syncs with the collection. The first time it runs, the original state comes from
`user_files/better_manki_seed.json` and the current (already applied) state becomes the
"on" version. Only cards that are still new are reordered; review history is untouched.
"""
import json
import os
import time

from aqt import gui_hooks, mw

from ..util.config import log

_KEY = "janki_better_manki"
_SEED = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
                     "user_files", "better_manki_seed.json")


def _state():
    try:
        return mw.col.get_config(_KEY, None)
    except Exception:
        return None


def _snapshot(like: dict) -> dict:
    """The collection's current values for the same models/decks/cards as `like`."""
    col = mw.col
    out = {"models": {}, "decks": {}, "dues": {}}
    for mid in like.get("models", {}):
        m = col.models.get(int(mid))
        if m:
            out["models"][mid] = {"css": m["css"], "afmt": [t["afmt"] for t in m["tmpls"]]}
    for did in like.get("decks", {}):
        d = col.decks.get(int(did), default=False)
        if d:
            out["decks"][did] = d["conf"]
    ids = [int(c) for c in like.get("dues", {})]
    if ids:
        for cid, due in col.db.all(
                "select id, due from cards where id in (%s)" % ",".join(map(str, ids))):
            out["dues"][str(cid)] = due
    return out


def _seed_state() -> None:
    if _state() is not None or not os.path.exists(_SEED):
        return
    with open(_SEED, encoding="utf-8") as f:
        orig = json.load(f)
    mw.col.set_config(_KEY, {"on": True, "orig": orig, "better": _snapshot(orig)})
    log("better_manki: seeded")


def _apply(snap: dict) -> None:
    col = mw.col
    for mid, v in snap.get("models", {}).items():
        m = col.models.get(int(mid))
        if not m:
            continue
        m["css"] = v["css"]
        for t, afmt in zip(m["tmpls"], v["afmt"]):
            t["afmt"] = afmt
        col.models.update_dict(m)
    for did, conf in snap.get("decks", {}).items():
        d = col.decks.get(int(did), default=False)
        if d and col.decks.get_config(conf):
            d["conf"] = conf
            col.decks.save(d)
    # Reorder only cards that are still new.
    for cid, due in snap.get("dues", {}).items():
        col.db.execute("update cards set due=?, mod=?, usn=-1 where id=? and type=0",
                       due, int(time.time()), int(cid))


# New-card order while on: every muscle's focused cards (Card 4–7: one detail each)
# first, then Card 3 (details → name), Card 2 (picture), Card 1 (recall everything).
# Ranked by card type across all muscles so siblings don't run back to back.
_RANK = {3: 0, 4: 1, 5: 2, 6: 3, 2: 4, 1: 5, 0: 6}


def _cover_parents(s: dict) -> bool:
    """Put the "Manki" parent of the muscle decks on the smart-order preset too: Anki
    takes the new-card sort from the deck you press Study on, and a parent on the
    Default preset sorts by card type (recall-everything first). Only parents named
    Manki — higher decks (Anatomy, MSK…) keep their own ordering. Originals are kept
    for turning off."""
    col = mw.col
    better, orig = s["better"].setdefault("decks", {}), s["orig"].setdefault("decks", {})
    smart = next(iter(better.values()), None)
    if not smart or not col.decks.get_config(smart):
        return False
    changed = False
    muscle = set()
    for mid in s["better"].get("models", {}):
        muscle.update(str(d) for d in col.db.list(
            "select distinct c.did from cards c join notes n on n.id = c.nid "
            "where n.mid = ?", int(mid)))
    want = set(muscle)
    for did in muscle:
        for parent in col.decks.parents(int(did)):
            if "manki" in parent["name"].split("::")[-1].lower():
                want.add(str(parent["id"]))
    # Hand back any deck that shouldn't be covered (e.g. Anatomy/MSK from before).
    for key in [k for k in better if k not in want]:
        d = col.decks.get(int(key), default=False)
        if d and key in orig and d["conf"] != orig[key]:
            d["conf"] = orig[key]
            col.decks.save(d)
        better.pop(key, None)
        orig.pop(key, None)
        changed = True
    for key in want:
        d = col.decks.get(int(key), default=False)
        if not d:
            continue
        if key not in orig:
            orig[key] = d["conf"]
            changed = True
        better[key] = smart
        if d["conf"] != smart:
            d["conf"] = smart
            col.decks.save(d)
            changed = True
    return changed


def smart_order() -> None:
    """Re-sort the muscle cards that are still new. Runs on profile open and when a
    deck is opened, so a reset/forget (which renumbers new cards) is undone."""
    s = _state()
    if not s or not s.get("on"):
        return
    col = mw.col
    if _cover_parents(s):
        col.set_config(_KEY, s)
    for mid in s.get("better", {}).get("models", {}):
        rows = col.db.all("select c.id, c.nid, c.ord, c.due from cards c join notes n "
                          "on n.id = c.nid where n.mid = ? and c.type = 0", int(mid))
        if not rows:
            continue
        first = {}
        for _cid, nid, _o, due in rows:
            first[nid] = min(first.get(nid, due), due)
        want = sorted(rows, key=lambda r: (_RANK.get(r[2], 9), first[r[1]], r[0]))
        start = min(r[3] for r in rows)
        if all(r[3] == start + i for i, r in enumerate(want)):
            continue                                  # already in order
        # Set positions directly: Anki's reposition re-sorts the given cards by their
        # current position, so it can't break a reset's ties (siblings share one).
        now = int(time.time())
        col.db.executemany("update cards set due=?, mod=?, usn=-1 where id=? and type=0",
                           [(start + i, now, r[0]) for i, r in enumerate(want)])
        log("better_manki: reordered %d new cards" % len(want))


def is_on() -> bool:
    s = _state()
    return bool(s and s.get("on"))


def available() -> bool:
    return _state() is not None


def set_enabled(on: bool) -> None:
    s = _state()
    if not s or bool(s.get("on")) == on:
        return
    if on:
        s["orig"] = _snapshot(s["orig"])      # keep any edits made while off
        _apply(s["better"])
        s["on"] = True
        mw.col.set_config(_KEY, s)
        smart_order()
    else:
        s["better"] = _snapshot(s["better"])  # keep any edits made while on
        s["better"].pop("dues", None)         # the "on" order is computed, not stored
        _apply(s["orig"])
    s["on"] = on
    mw.col.set_config(_KEY, s)
    try:
        mw.reset()
    except Exception:
        pass


def install() -> None:
    def _open():
        try:
            _seed_state()
            smart_order()
        except Exception as e:
            log("better_manki: %s" % e)

    def _state_change(new_state, _old):
        if new_state in ("overview", "review"):
            try:
                smart_order()
            except Exception as e:
                log("better_manki order: %s" % e)

    gui_hooks.profile_did_open.append(_open)
    gui_hooks.state_did_change.append(_state_change)
