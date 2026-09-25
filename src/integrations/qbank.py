"""Question banks (.qb) — import bundled banks and retrieve practice questions
related to the card being reviewed.

Runtime is 100% local: no network, no AI. Banks are authored offline (tagged)
and shared internally as a `.qb` file (a renamed zip). A `.qb` contains:

    manifest.json          # id, name, family (aj|ak|huc), match, count
    questions.json | .jsonl # array OR one-object-per-line (auto-detected)
    media/                  # optional images (reserved; not rendered in v1)

Imported banks are extracted into  <addon>/user_files/qbanks/<id>/  (user_files
survives add-on updates) and tracked in registry.json. Matching reuses the
lecture engine's concept-leaf normalisation so questions line up with the same
#AK/AJ/Hutch tags the cards already carry; an untagged bank falls back to plain
text-token overlap against the card's content.
"""

import os
import re
import math
import json
import shutil
import difflib
import zipfile
import collections

from aqt import mw

from ..util.config import log

# In-memory cache of parsed bank questions, keyed by dir → (mtime, [questions]).
_Q_CACHE = {}


# ---------------------------------------------------------------------------
# Paths / registry
# ---------------------------------------------------------------------------
def _qbanks_dir():
    root = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))  # → addon root
    d = os.path.join(root, "user_files", "qbanks")
    os.makedirs(d, exist_ok=True)
    return d


def _registry_path():
    return os.path.join(_qbanks_dir(), "registry.json")


def _load_registry():
    try:
        with open(_registry_path(), encoding="utf-8") as f:
            reg = json.load(f)
        reg.setdefault("banks", {})
        return reg
    except Exception:
        return {"banks": {}}


def _save_registry(reg):
    try:
        with open(_registry_path(), "w", encoding="utf-8") as f:
            json.dump(reg, f, indent=2)
    except Exception as e:
        log("qbank registry save: %s" % e)


def _safe(s):
    return re.sub(r"[^A-Za-z0-9_.-]", "_", str(s)) or "bank"


# ---------------------------------------------------------------------------
# Import
# ---------------------------------------------------------------------------
def import_qb(path):
    """Validate + extract a .qb into user_files/qbanks/<id>/ and register it.
    Re-importing the same id replaces it (an update). Returns the manifest."""
    with zipfile.ZipFile(path) as z:
        try:
            man = json.loads(z.read("manifest.json"))
        except KeyError:
            raise ValueError("Not a .qb package (no manifest.json).")
        bid = man.get("id")
        if not bid or "qb_format" not in man:
            raise ValueError("Invalid .qb: manifest needs 'id' and 'qb_format'.")
        dir_name = _safe(bid)
        dest = os.path.join(_qbanks_dir(), dir_name)
        if os.path.isdir(dest):
            shutil.rmtree(dest, ignore_errors=True)
        z.extractall(dest)

    reg = _load_registry()
    reg["banks"][bid] = {
        "name": man.get("name", bid),
        "family": (man.get("family") or "").lower(),
        "match": (man.get("match") or "tags").lower(),
        "version": man.get("version", ""),
        "dir": dir_name,
        "count": man.get("count", 0),
        "enabled": True,
    }
    _save_registry(reg)
    _Q_CACHE.pop(dir_name, None)
    # Deterministic (no-AI) enrichment so the bank matches review cards without
    # anyone pasting questions into an AI: lecture tags from headers + concept
    # mining from answer/explanation text.
    try:
        assign_deck_tags_from_headers()
        mine_concepts_from_banks()
        _Q_CACHE.pop(dir_name, None)
    except Exception as e:
        log("qbank import enrich: %s" % e)
    # Keep the Practice deck in sync: if one already exists, fold this (new or
    # re-imported) bank into it right away.
    if _practice_deck_exists():
        try:
            convert_bank_to_deck(bid)
            mw.reset()
        except Exception as e:
            log("auto-sync practice deck on import: %s" % e)
    return man


def _practice_deck_exists():
    try:
        return mw.col.decks.by_name("Practice") is not None
    except Exception:
        return False


def _remove_bank_deck(name):
    """Delete a bank's Practice::<name> deck plus its lecture subdecks and cards."""
    try:
        target = "Practice::" + (name or "").replace("::", "-")
        dids = [d.id for d in mw.col.decks.all_names_and_ids()
                if d.name == target or d.name.startswith(target + "::")]
        if dids:
            mw.col.decks.remove(dids)
    except Exception as e:
        log("remove bank deck: %s" % e)


def remove_bank(bid):
    reg = _load_registry()
    meta = reg["banks"].pop(bid, None)
    if meta:
        shutil.rmtree(os.path.join(_qbanks_dir(), meta["dir"]), ignore_errors=True)
        _Q_CACHE.pop(meta["dir"], None)
        _save_registry(reg)
        # Also drop its cards from the Practice deck so the queue stays in sync.
        try:
            _remove_bank_deck(meta.get("name") or bid)
            mw.reset()
        except Exception as e:
            log("remove bank deck sync: %s" % e)


# ---------------------------------------------------------------------------
# Deleting a bank's cards in Anki (the Practice tab / deck list / Browser) removes
# the bank too, so the two never drift apart (Settings → Remove already deletes the
# deck). Keyed on the cards themselves (QID = <bid>_<n>), NOT the deck name, so
# renaming/moving a Practice deck never counts as a delete. A removed bank goes to
# a trash folder first: if Undo brings its cards back, the bank is restored; the
# trash is emptied on the next profile load.
# ---------------------------------------------------------------------------
_banks_seen = None          # bids that had Practice cards at the last check


def _trash_dir():
    return os.path.join(_qbanks_dir(), ".trash")


def _banks_with_cards():
    """Set of bank ids that currently have at least one Janki Practice note."""
    m = mw.col.models.by_name(_MODEL_NAME)
    if not m:
        return set()
    names = [f["name"] for f in m["flds"]]
    if "QID" not in names:
        return set()
    qi = names.index("QID")
    out = set()
    for flds in mw.col.db.list("select flds from notes where mid=?", m["id"]):
        parts = flds.split("\x1f")
        if qi < len(parts) and "_" in parts[qi]:
            out.add(parts[qi].rsplit("_", 1)[0])
    return out


def _bank_key_map():
    """_safe(bid) → bid for installed banks (QIDs carry the _safe()'d id)."""
    return {_safe(b): b for b in _load_registry()["banks"]}


def _trash_bank(bid):
    reg = _load_registry()
    meta = reg["banks"].pop(bid, None)
    if not meta:
        return
    t = _trash_dir()
    os.makedirs(t, exist_ok=True)
    src = os.path.join(_qbanks_dir(), meta["dir"])
    dst = os.path.join(t, meta["dir"])
    shutil.rmtree(dst, ignore_errors=True)
    try:
        if os.path.isdir(src):
            shutil.move(src, dst)
        with open(dst + ".meta.json", "w", encoding="utf-8") as f:
            json.dump({"bid": bid, "meta": meta}, f)
    except Exception as e:
        log("qbank trash: %s" % e)
    _Q_CACHE.pop(meta["dir"], None)
    _save_registry(reg)
    log("qbank: bank %s removed (its Practice cards were deleted)" % bid)


def _restore_bank(key):
    """Bring a trashed bank back (its cards reappeared — e.g. Undo)."""
    t = _trash_dir()
    if not os.path.isdir(t):
        return
    for fn in os.listdir(t):
        if not fn.endswith(".meta.json"):
            continue
        try:
            with open(os.path.join(t, fn), encoding="utf-8") as f:
                rec = json.load(f)
        except Exception:
            continue
        bid, meta = rec.get("bid"), rec.get("meta") or {}
        if _safe(bid) != key or not meta.get("dir"):
            continue
        reg = _load_registry()
        src = os.path.join(t, meta["dir"])
        if bid not in reg["banks"] and os.path.isdir(src):
            dst = os.path.join(_qbanks_dir(), meta["dir"])
            if not os.path.exists(dst):
                shutil.move(src, dst)
                reg["banks"][bid] = meta
                _save_registry(reg)
                log("qbank: bank %s restored (its cards came back)" % bid)
        try:
            os.remove(os.path.join(t, fn))
        except OSError:
            pass
        shutil.rmtree(src, ignore_errors=True)


def sync_banks_with_cards(changes=None, handler=None):
    """operation_did_execute hook: drop banks whose cards were all deleted, and
    restore trashed banks whose cards came back. Only banks that HAD cards count
    — an installed bank not yet loaded into Anki is never touched."""
    global _banks_seen
    if changes is not None and not (getattr(changes, "deck", False)
                                    or getattr(changes, "note", False)):
        return
    try:
        now = _banks_with_cards()
    except Exception as e:
        log("qbank sync check: %s" % e)
        return
    prev, _banks_seen = _banks_seen, now
    if prev is None:
        return
    keys = _bank_key_map()
    for key in prev - now:
        if key in keys:
            _trash_bank(keys[key])
    for key in now - prev:
        if key not in keys:
            _restore_bank(key)


def install_bank_sync():
    """Hook bank↔card sync (idempotent) and empty the previous session's trash."""
    global _banks_seen
    from aqt import gui_hooks
    shutil.rmtree(_trash_dir(), ignore_errors=True)
    _banks_seen = None
    sync_banks_with_cards()                      # baseline snapshot
    if sync_banks_with_cards not in gui_hooks.operation_did_execute._hooks:
        gui_hooks.operation_did_execute.append(sync_banks_with_cards)


def reorder_banks(ordered_bids):
    """Persist a new registry/display order for installed banks. Any bank not named
    in `ordered_bids` keeps its old relative position at the end."""
    reg = _load_registry()
    banks = reg.get("banks", {})
    new = {}
    for bid in ordered_bids:
        if bid in banks and bid not in new:
            new[bid] = banks[bid]
    for bid, meta in banks.items():
        if bid not in new:
            new[bid] = meta
    reg["banks"] = new
    _save_registry(reg)


def rename_bank(bid, new_name):
    """Rename an installed bank (registry) and, if its Practice deck is built, rename
    that deck subtree to match."""
    new_name = (new_name or "").strip()
    if not new_name:
        raise ValueError("Name cannot be empty.")
    reg = _load_registry()
    meta = reg["banks"].get(bid)
    if not meta:
        raise ValueError("Bank not found.")
    old_name = meta.get("name") or bid
    if new_name == old_name:
        return
    meta["name"] = new_name
    _save_registry(reg)
    try:
        old_base = "Practice::" + old_name.replace("::", "-")
        new_base = "Practice::" + new_name.replace("::", "-")
        deck = mw.col.decks.by_name(old_base)
        if deck:
            mw.col.decks.rename(deck, new_base)   # renames its subdecks too
            mw.reset()
    except Exception as e:
        log("rename bank deck: %s" % e)


def merge_banks(bids, new_name):
    """Merge several installed banks into ONE new bank, keeping each original bank as
    a subbank: every question's `lecture` is prefixed with its source bank's name
    ("<origbank>::<origlecture>"), so the built Practice deck nests as
    Practice::<merged>::<origbank>[::<origlecture>]. Media are copied (de-collided).
    The source banks are removed afterward. Returns the new bank id."""
    import time
    new_name = (new_name or "").strip()
    if not new_name:
        raise ValueError("Name cannot be empty.")
    bids = [b for b in (bids or []) if b]
    if len(bids) < 2:
        raise ValueError("Select at least two banks to merge.")
    reg = _load_registry()
    banks = reg.get("banks", {})
    for b in bids:
        if b not in banks:
            raise ValueError("Bank not found: %s" % b)

    new_bid = _safe("merged_%d" % int(time.time()))
    while new_bid in banks or os.path.exists(os.path.join(_qbanks_dir(), _safe(new_bid))):
        new_bid += "_x"
    new_dir = _safe(new_bid)
    dest = os.path.join(_qbanks_dir(), new_dir)
    dest_media = os.path.join(dest, "media")
    os.makedirs(dest_media, exist_ok=True)

    merged_qs = []
    families = set()
    for b in bids:
        meta = banks[b]
        bname = meta.get("name") or b
        bdir = meta.get("dir", "")
        if meta.get("family"):
            families.add(meta.get("family"))
        src_media = os.path.join(_qbanks_dir(), bdir, "media")
        for q in _bank_questions(bdir):
            if not isinstance(q, dict):
                continue
            q = dict(q)
            origlec = (q.get("lecture") or "").strip()
            q["lecture"] = bname + ("::" + origlec if origlec else "")
            media = q.get("media") or []
            if media:
                new_media = []
                for name in media:
                    sp = os.path.join(src_media, name)
                    arc = name
                    dp = os.path.join(dest_media, arc)
                    if os.path.exists(dp):           # collision → prefix with bank id
                        arc = "%s_%s" % (_safe(b), name)
                        dp = os.path.join(dest_media, arc)
                    if os.path.isfile(sp):
                        try:
                            shutil.copyfile(sp, dp)
                        except Exception:
                            pass
                    new_media.append(arc)
                q["media"] = new_media
            sl = q.get("slide")
            if sl:
                sp = os.path.join(src_media, sl); arc = sl
                dp = os.path.join(dest_media, arc)
                if os.path.exists(dp):
                    arc = "%s_%s" % (_safe(b), sl); dp = os.path.join(dest_media, arc)
                if os.path.isfile(sp):
                    try:
                        shutil.copyfile(sp, dp)
                    except Exception:
                        pass
                q["slide"] = arc
            merged_qs.append(q)

    with open(os.path.join(dest, "questions.jsonl"), "w", encoding="utf-8") as f:
        f.write("\n".join(json.dumps(q, ensure_ascii=False) for q in merged_qs))
    family = sorted(families)[0] if len(families) == 1 else ""
    man = {"qb_format": 1, "id": new_bid, "name": new_name, "family": family,
           "match": "tags", "version": "", "count": len(merged_qs)}
    with open(os.path.join(dest, "manifest.json"), "w", encoding="utf-8") as f:
        json.dump(man, f, ensure_ascii=False, indent=2)

    reg = _load_registry()
    reg["banks"][new_bid] = {
        "name": new_name, "family": family, "match": "tags", "version": "",
        "dir": new_dir, "count": len(merged_qs), "enabled": True,
    }
    _save_registry(reg)
    _Q_CACHE.pop(new_dir, None)

    for b in bids:                       # sources are now folded into the merged bank
        remove_bank(b)

    if _practice_deck_exists():
        try:
            convert_bank_to_deck(new_bid)
            mw.reset()
        except Exception as e:
            log("merge convert: %s" % e)
    return new_bid


def nest_bank(src_bid, dest_bid):
    """Fold one bank INTO another (drag src onto dest): src's questions are appended
    to dest with their `lecture` prefixed by src's name, so src becomes a subbank
    (Practice::<dest>::<src>[::<lecture>]). dest keeps its own identity and its
    existing cards/scheduling; src is removed. Returns dest_bid."""
    if not src_bid or not dest_bid or src_bid == dest_bid:
        return dest_bid
    reg = _load_registry()
    banks = reg.get("banks", {})
    src = banks.get(src_bid)
    dest = banks.get(dest_bid)
    if not src or not dest:
        raise ValueError("Bank not found.")
    src_name = src.get("name") or src_bid
    src_dir = src.get("dir", "")
    dest_dir = dest.get("dir", "")
    src_media = os.path.join(_qbanks_dir(), src_dir, "media")
    dest_media = os.path.join(_qbanks_dir(), dest_dir, "media")
    os.makedirs(dest_media, exist_ok=True)

    dest_qs = [q for q in _bank_questions(dest_dir) if isinstance(q, dict)]
    for q in _bank_questions(src_dir):
        if not isinstance(q, dict):
            continue
        q = dict(q)
        origlec = (q.get("lecture") or "").strip()
        q["lecture"] = src_name + ("::" + origlec if origlec else "")
        media = q.get("media") or []
        if media:
            new_media = []
            for name in media:
                sp = os.path.join(src_media, name)
                arc = name
                dp = os.path.join(dest_media, arc)
                if os.path.exists(dp):               # collision → prefix with src id
                    arc = "%s_%s" % (_safe(src_bid), name)
                    dp = os.path.join(dest_media, arc)
                if os.path.isfile(sp):
                    try:
                        shutil.copyfile(sp, dp)
                    except Exception:
                        pass
                new_media.append(arc)
            q["media"] = new_media
        sl = q.get("slide")
        if sl:
            sp = os.path.join(src_media, sl); arc = sl
            dp = os.path.join(dest_media, arc)
            if os.path.exists(dp):
                arc = "%s_%s" % (_safe(src_bid), sl); dp = os.path.join(dest_media, arc)
            if os.path.isfile(sp):
                try:
                    shutil.copyfile(sp, dp)
                except Exception:
                    pass
            q["slide"] = arc
        dest_qs.append(q)

    _rewrite_bank(dest_dir, dest_qs)                  # writes questions.jsonl
    count = sum(1 for q in dest_qs if q.get("stem") or q.get("incomplete"))
    reg = _load_registry()
    if dest_bid in reg["banks"]:
        reg["banks"][dest_bid]["count"] = count
        _save_registry(reg)
    try:                                              # keep dest manifest count current
        mp = os.path.join(_qbanks_dir(), dest_dir, "manifest.json")
        if os.path.isfile(mp):
            with open(mp, encoding="utf-8") as f:
                man = json.load(f)
            man["count"] = count
            with open(mp, "w", encoding="utf-8") as f:
                json.dump(man, f, ensure_ascii=False, indent=2)
    except Exception as e:
        log("nest manifest: %s" % e)

    remove_bank(src_bid)                              # src folded into dest now
    if _practice_deck_exists():
        try:
            convert_bank_to_deck(dest_bid)
            mw.reset()
        except Exception as e:
            log("nest convert: %s" % e)
    return dest_bid


def reconcile_names():
    """Keep registry bank names in sync with their Practice decks, so renaming a
    bank's deck in Anki's main window is reflected in the settings manager. Each bank
    records its built deck id (`did`); if that deck's name changed, adopt the new
    leaf name. Also back-fills `did` for banks built before this existed. Returns True
    if anything changed."""
    try:
        reg = _load_registry()
    except Exception:
        return False
    changed = False
    for bid, meta in reg.get("banks", {}).items():
        did = meta.get("did")
        if not did:                       # back-fill from the current name
            try:
                base = "Practice::" + (meta.get("name") or bid).replace("::", "-")
                deck = mw.col.decks.by_name(base)
            except Exception:
                deck = None
            if deck:
                meta["did"] = int(deck["id"])
                changed = True
            continue
        try:
            deck = mw.col.decks.get(int(did), default=False)
        except Exception:
            deck = None
        if not deck:
            continue
        name = deck.get("name", "")
        if not name.startswith("Practice::"):
            continue                      # moved out of Practice:: — leave the name be
        leaf = name.split("::", 1)[1]
        # Compare against the current name's deck-leaf form ("::" → "-" on build).
        if leaf and leaf != (meta.get("name") or "").replace("::", "-"):
            meta["name"] = leaf
            changed = True
    if changed:
        _save_registry(reg)
    return changed


def export_bank(bid, out_path):
    """Write an installed bank back out as a shareable .qb (a zip of its
    manifest.json + questions + media). Returns the output path."""
    meta = list_banks().get(bid)
    if not meta:
        raise ValueError("Bank not found.")
    bdir = os.path.join(_qbanks_dir(), meta.get("dir", ""))
    if not os.path.isdir(bdir):
        raise ValueError("Bank files are missing on disk.")
    with zipfile.ZipFile(out_path, "w", zipfile.ZIP_DEFLATED) as z:
        for root, _dirs, files in os.walk(bdir):
            for fn in files:
                fp = os.path.join(root, fn)
                z.write(fp, os.path.relpath(fp, bdir))
    return out_path


def list_banks():
    return _load_registry().get("banks", {})


def bank_subtree(bid):
    """The nested subbank/lecture structure of a bank, from its questions' `lecture`
    paths (split on "::"). Returns a list of nodes, each
    {"name": str, "count": int, "children": [...]}. Lecture-less questions aren't
    nested. Used to expand a bank in the settings manager."""
    meta = list_banks().get(bid)
    if not meta:
        return []
    root = {}

    def _node(container, name):
        n = container.get(name)
        if n is None:
            n = {"name": name, "count": 0, "children": {}}
            container[name] = n
        return n

    for q in _bank_questions(meta.get("dir", "")):
        if not isinstance(q, dict) or not (q.get("stem") or q.get("incomplete")):
            continue
        segs = [s.strip() for s in (q.get("lecture") or "").split("::") if s.strip()]
        cont = root
        for seg in segs:
            n = _node(cont, seg)
            n["count"] += 1
            cont = n["children"]

    def _to_list(container):
        return [{"name": n["name"], "count": n["count"],
                 "children": _to_list(n["children"])} for n in container.values()]

    return _to_list(root)


def questions_for_bank(bid):
    """All normalized questions in one installed bank (for previewing)."""
    meta = list_banks().get(bid)
    if not meta:
        return []
    return [_normalize_q(q) for q in _bank_questions(meta.get("dir", ""))
            if isinstance(q, dict) and q.get("stem")]


def _rewrite_bank(dir_name, qs):
    p = os.path.join(_qbanks_dir(), dir_name, "questions.jsonl")
    with open(p, "w", encoding="utf-8") as f:
        f.write("\n".join(json.dumps(q, ensure_ascii=False) for q in qs))
    _Q_CACHE.pop(dir_name, None)


def _leaves_from_searches(searches):
    """Recover the concept-leaf tokens (last ::-segment) from a lecture's Anki
    search fragments (e.g. 'tag:B&B::…::DNA_Structure OR tag:*DNA_Structure*')."""
    out = set()
    for frag in searches or []:
        for part in str(frag).split(" OR "):
            part = part.strip()
            if ":" in part:                       # drop tag:/deck: prefix
                part = part.split(":", 1)[1]
            leaf = part.strip().strip("*").split("::")[-1].strip().strip("*")
            if leaf and " " not in leaf:
                out.add(leaf)
    return out


def retag_from_lecture_map():
    """Stamp concept tags onto every imported question by resolving its stored
    `lecture` against the Lectures feature's lecture→tag map (fuzzy). Local, no
    model. Returns (questions_tagged, questions_total)."""
    lec = _lectures()
    if lec is None:
        return (0, 0)
    try:
        m, keys, _opts = lec._get_map(lec._enabled_families())
    except Exception as e:
        log("qbank retag: map load failed: %s" % e)
        return (0, 0)
    cutoff = float(lec._cfg().get("fuzzy_cutoff", 0.5))
    tagged = total = 0
    for bid, meta in list_banks().items():
        dir_name = meta.get("dir", "")
        qs = _bank_questions(dir_name)
        changed = False
        for q in qs:
            if not isinstance(q, dict) or not q.get("stem"):
                continue
            total += 1
            lecture = q.get("lecture")
            if not lecture:
                continue
            nk = lec._norm(lecture)
            ek = nk if nk in m else lec._fuzzy_match(lecture, nk, keys, m, cutoff)
            if not ek or ek not in m:
                continue
            leaves = _leaves_from_searches(m[ek].get("searches"))
            if leaves:
                q["tags"] = sorted(leaves)
                changed = True
                tagged += 1
        if changed:
            _rewrite_bank(dir_name, qs)
    return (tagged, total)


# ---------------------------------------------------------------------------
# Question loading (JSON or JSONL, auto-detected)
# ---------------------------------------------------------------------------
def load_questions_text(raw):
    raw = (raw or "").strip()
    if not raw:
        return []
    try:
        data = json.loads(raw)                       # whole file parses → JSON
        return data if isinstance(data, list) else list(data.values())
    except json.JSONDecodeError:                     # → JSONL (one per line)
        out = []
        for ln in raw.splitlines():
            ln = ln.strip()
            if ln:
                try:
                    out.append(json.loads(ln))
                except json.JSONDecodeError:
                    pass
        return out


def _bank_questions(dir_name):
    bd = os.path.join(_qbanks_dir(), dir_name)
    for fn in ("questions.jsonl", "questions.json"):
        p = os.path.join(bd, fn)
        if os.path.isfile(p):
            mtime = os.path.getmtime(p)
            cached = _Q_CACHE.get(dir_name)
            if cached and cached[0] == mtime:
                return cached[1]
            with open(p, encoding="utf-8") as f:
                qs = load_questions_text(f.read())
            _Q_CACHE[dir_name] = (mtime, qs)
            return qs
    return []


# ---------------------------------------------------------------------------
# Matching (reuses the lecture engine's leaf normalisation)
# ---------------------------------------------------------------------------
def _lectures():
    try:
        from . import lectures
        return lectures
    except Exception:
        return None


def _leaf_keys(tags):
    """Concept-leaf keys for a list of tags (last ::-segment, normalised)."""
    lec = _lectures()
    out = set()
    for t in tags or []:
        if not t:
            continue
        seg = str(t).split("::")[-1]
        k = lec._leaf_key(seg) if lec is not None else seg.strip().lower()
        if k:
            out.add(k)
    return out


_STOP = set("the a an of to and or in on for with is are be this that as by from "
            "at it its was were which what when who whom into than then also may "
            "can will not but has have had does do".split())


def _stem(w):
    """Crude plural stemmer so 'cells'↔'cell', 'anemias'↔'anemia', 'bodies'↔'body'
    collapse to one token. Deliberately conservative (no Porter) — just the plural
    endings that otherwise split obvious medical synonyms."""
    if len(w) > 4 and w.endswith("ies"):
        return w[:-3] + "y"
    if len(w) > 4 and w.endswith("sses"):
        return w[:-2]
    if len(w) > 3 and w.endswith("s") and not w.endswith("ss"):
        return w[:-1]
    return w


def _tokens_list(text):
    """Ordered, stemmed word tokens. Uses the lecture engine's camelCase-aware
    tokeniser + synonym folding when available, so question text, card text and
    concept-leaf names all normalise the same way (order kept for phrase matching)."""
    text = re.sub(r"<[^>]+>", " ", text or "")
    lec = _lectures()
    if lec is not None:
        raw = lec._match_tokens(text)
    else:
        raw = re.findall(r"[a-z0-9]+", text.lower())
    return [_stem(w) for w in raw if len(w) > 2 and w not in _STOP]


def _tokens(text):
    return set(_tokens_list(text))


# --- IDF weighting (rare medical terms outrank filler) ------------------------
# Document frequency of each token across the collection's notes, so a shared
# "schistocyte" counts for far more than a shared "patient". Read locally, never
# uploaded. Built ONCE per session (lazily, only when text-fallback matching
# actually needs it) and NOT keyed on col.mod — answering/suspending cards changes
# col.mod constantly, and re-scanning the whole collection on every practice
# trigger was the source of the long load. reset_caches() refreshes it per profile.
_IDF = {"df": None, "n": 0}


def reset_caches():
    """Drop the session-cached matching tables so a newly-opened profile rebuilds
    them lazily. Call on profile open — never mid-review (that would re-thrash)."""
    _IDF["df"] = None
    _IDF["n"] = 0
    _CONCEPT_IDX["idx"] = None
    _CONCEPT_IDX["mod"] = None


_IDF_SAMPLE = 8000       # DF is a coarse weight; a sample keeps the build sub-second


def _idf_table():
    if _IDF["df"] is not None:
        return _IDF["df"], _IDF["n"]
    df = collections.Counter()
    n = 0
    try:
        for flds in mw.col.db.list(
                "select flds from notes limit ?", _IDF_SAMPLE):
            n += 1
            for t in _tokens(flds):
                df[t] += 1
    except Exception as e:
        log("qbank idf: %s" % e)
    _IDF["df"] = df
    _IDF["n"] = n
    return df, n


def _idf(tok):
    df, n = _idf_table()
    if not n:
        return 1.0
    return math.log((n + 1.0) / (df.get(tok, 0) + 1.0)) + 1.0


def _weighted_overlap(a, b):
    """IDF-weighted coverage of set `b` (the question) by set `a` (the card/window):
    Σidf(shared) / Σidf(b). 0..1; distinctive shared terms dominate."""
    if not a or not b:
        return 0.0
    denom = sum(_idf(t) for t in b)
    if denom <= 0:
        return 0.0
    return sum(_idf(t) for t in (a & b)) / denom


# --- Deterministic concept detection (the AI-free bridge) ---------------------
# A vignette rarely names its concept, but its ANSWER/EXPLANATION usually does
# ("This is hereditary spherocytosis…"). We mine the collection's own concept-leaf
# names (AnKing #Subjects vocabulary) out of that text — no AI, no upload. Only
# multi-word concepts are mined (single words like "Anemia" are too broad).
_CONCEPT_IDX = {"mod": None, "idx": None}


def _concept_phrase_index():
    """[(leaf_display, key_token_set, phrase)] for multi-word #Subjects concept
    leaves. `phrase` is the leaf's words in order for a contiguous match; the token
    set allows an order-independent all-words-present match. Cached by col mtime."""
    try:
        mod = mw.col.mod
    except Exception:
        mod = None
    if _CONCEPT_IDX["idx"] is not None and _CONCEPT_IDX["mod"] == mod:
        return _CONCEPT_IDX["idx"]
    seen, idx = set(), []
    for t in _concept_tags():
        leaf = t.split("::")[-1].lstrip("*")
        if leaf in seen:
            continue
        seen.add(leaf)
        wl = _tokens_list(leaf.replace("_", " "))
        if len(wl) < 2:                    # skip broad single-word concepts
            continue
        idx.append((leaf, set(wl), " ".join(wl)))
    _CONCEPT_IDX.update(mod=mod, idx=idx)
    return idx


def _concepts_in_text(text):
    """Concept-leaf display names whose name appears in `text` — either as a
    contiguous phrase or with all of its distinctive words present."""
    idx = _concept_phrase_index()
    if not idx or not text:
        return set()
    tl = _tokens_list(text)
    toks = set(tl)
    hay = " " + " ".join(tl) + " "
    hits = set()
    for leaf, words, phrase in idx:
        if (" " + phrase + " ") in hay or words <= toks:
            hits.add(leaf)
    return hits


def _normalize_q(q):
    ch = q.get("choices")
    return {
        "stem": q.get("stem", ""),
        "choices": list(ch) if ch else None,
        "answer": q.get("answer"),
        "explanation": q.get("explanation") or "",
        "tags": q.get("tags") or [],
        "lecture": q.get("lecture", ""),
        "source": q.get("source", "bank"),
        "media": q.get("media") or [],
        "slide": q.get("slide") or "",
        "ans_slide": q.get("ans_slide") or "",
        "slide_no": q.get("slide_no") or "",
        "figure_only": bool(q.get("figure_only")),
        "incomplete": q.get("incomplete") or "",
    }


_FUZZY_LEAF_MIN = 0.6


def _leaf_words(leaf):
    return frozenset(w for w in re.split(r"[_\s]+", leaf or "") if w)


def _fuzzy_leaf_score(card_word_sets, qleaves):
    """Word-set (Jaccard) overlap between the card's leaf-key words and each
    question leaf's words — catches tag variants like 'DNA_Structure' vs
    'Structure_of_DNA'. Cheap set ops (no difflib) so it stays fast in the review
    hot path. Returns Σ of each question leaf's best match ≥ cutoff, else 0."""
    if not card_word_sets or not qleaves:
        return 0.0
    total = 0.0
    for ql in qleaves:
        qw = _leaf_words(ql)
        if not qw:
            continue
        best = 0.0
        for cw in card_word_sets:
            if not cw:
                continue
            j = len(qw & cw) / len(qw | cw)
            if j > best:
                best = j
        if best >= _FUZZY_LEAF_MIN:
            total += best
    return total


def _q_match_text(q):
    """The question text used for the fallback: stem + choices + answer + the
    explanation (the explanation/answer usually names the concept)."""
    parts = [q.get("stem") or ""]
    ch = q.get("choices") or []
    if ch:
        parts.extend(str(c) for c in ch)
    a = q.get("answer")
    if isinstance(a, str):
        parts.append(a)
    parts.append(q.get("explanation") or "")
    return " ".join(parts)


def _rank_questions(leaves, tokens, use_text_fallback=True, exclude_qids=None,
                    leaf_weights=None):
    """Rank complete questions across ENABLED banks by relevance to concept-leaf
    `leaves` (tag match wins decisively), then fuzzy leaf match, then IDF-weighted
    text overlap of `tokens`. Returns question dicts best-first, each annotated with
    `_bid`/`_ordinal`/`_qid` so a caller can resolve it back to its Practice card
    (the qid mirrors convert_bank_to_deck's `bid_ordinal` numbering exactly).

    `leaves`/`tokens` are sets. `leaf_weights` (optional) is a {leaf: weight} map so
    concepts seen more often recently rank higher. Incomplete questions never match.
    Mined concepts (deterministically detected from each question's answer/
    explanation text) count as tag matches — this is the AI-free card↔question
    bridge for banks that ship without concept tags."""
    exclude_qids = exclude_qids or set()
    lw = leaf_weights or {}

    def _w(ls):
        return sum(lw.get(l, 1.0) for l in ls)

    card_word_sets = [_leaf_words(l) for l in leaves]   # precomputed once for fuzzy
    scored = []
    for bid, meta in list_banks().items():
        if not meta.get("enabled", True):
            continue
        ordinal = 0
        for q in _bank_questions(meta.get("dir", "")):
            if not isinstance(q, dict):
                continue
            # Mirror convert_bank_to_deck: the ordinal advances for every question
            # that becomes a card (has a stem OR is incomplete) so the qid lines up.
            if not q.get("stem") and not q.get("incomplete"):
                continue
            ordinal += 1
            if not q.get("stem") or q.get("incomplete"):
                continue    # only complete questions are matchable
            qid = _safe("%s_%d" % (bid, ordinal))
            if qid in exclude_qids:
                continue
            score = 0.0
            qleaves = _leaf_keys(q.get("tags")) | _leaf_keys(q.get("mined_tags"))
            inter = leaves & qleaves
            if inter:
                score = 10.0 + _w(inter)             # exact tag/concept match wins
            else:
                fuzz = _fuzzy_leaf_score(card_word_sets, qleaves)
                if fuzz > 0:
                    score = 6.0 + fuzz               # near-miss tag variant
                elif use_text_fallback and tokens:
                    ov = _weighted_overlap(tokens, _tokens(_q_match_text(q)))
                    if ov >= 0.30:
                        score = ov                   # IDF-weighted text (0..1)
            if score > 0:
                qa = dict(q)
                qa["_bid"] = bid
                qa["_ordinal"] = ordinal
                qa["_qid"] = qid
                scored.append((score, qa))
    scored.sort(key=lambda x: x[0], reverse=True)
    return [q for _s, q in scored]


def find_for_card(card, limit=5):
    """Return up to `limit` normalized questions related to `card`, best first.
    Prefers concept-tag overlap; falls back to text-token overlap for untagged
    banks/questions."""
    note = card.note()
    leaves = _leaf_keys(list(note.tags))
    tokens = _tokens((card.question() or "") + " " + (card.answer() or ""))
    ranked = _rank_questions(leaves, tokens, use_text_fallback=True)
    return [_normalize_q(q) for q in ranked[:limit]]


def intersperse_card_ids(leaves, tokens, limit, use_text_fallback=True,
                         exclude_cids=None, leaf_weights=None):
    """Resolve the top-ranked matching questions to REAL Practice **card ids** (best
    first), for interspersing into a live review session. Skips suspended cards
    (already retired) and any in `exclude_cids`. Returns up to `limit` card ids."""
    exclude_cids = set(exclude_cids or ())
    out = []
    for q in _rank_questions(leaves, tokens, use_text_fallback=use_text_fallback,
                             leaf_weights=leaf_weights):
        if len(out) >= limit:
            break
        qid = q.get("_qid")
        if not qid:
            continue
        try:
            nids = mw.col.find_notes('note:"%s" QID:%s' % (_MODEL_NAME, qid))
        except Exception:
            nids = []
        got = None
        for nid in nids:
            try:
                note = mw.col.get_note(nid)
            except Exception:
                continue
            for cid in note.card_ids():
                if cid in exclude_cids or cid in out:
                    continue
                try:
                    c = mw.col.get_card(cid)
                except Exception:
                    continue
                if getattr(c, "queue", 0) == -1:     # suspended → already retired
                    continue
                got = cid
                break
            if got:
                break
        if got:
            out.append(got)
    return out


# ---------------------------------------------------------------------------
# Import dialog (Tools menu)
# ---------------------------------------------------------------------------
def import_dialog():
    from aqt.qt import QFileDialog
    from aqt.utils import tooltip, showWarning
    path, _ = QFileDialog.getOpenFileName(
        mw, "Import question bank", "", "Question banks (*.qb *.zip)")
    if not path:
        return
    try:
        man = import_qb(path)
    except Exception as e:
        showWarning("Could not import question bank:\n\n%s" % e)
        return
    tooltip("Imported “%s” (%s questions)." % (man.get("name", "bank"),
                                               man.get("count", "?")))


# ---------------------------------------------------------------------------
# Build a .qb from a regularly-formatted .docx question bank (fully local, no
# model). Expected layout (repeating):
#   Lecture: <name>        Objective: <text>        N. <stem>
#   A) .. E) choices        Answer: <letter>        Rationale: <text>
#   Professor's Quote: <text>   (optional)
# ---------------------------------------------------------------------------
_RE_LECT = re.compile(r"^Lecture:\s*(.*)$", re.I)
_RE_OBJ = re.compile(r"^Objective:\s*(.*)$", re.I)
_RE_NUM = re.compile(r"^(\d+)\.\s+(.*)$")
_RE_CHO = re.compile(r"^([A-Ea-e])[\)\.]\s*(.+)$")
_RE_ANS = re.compile(r"^Answer:\s*([A-Ea-e])", re.I)
_RE_RAT = re.compile(r"^Rationale:\s*(.*)$", re.I)
_RE_QUO = re.compile(r"^Professor.{0,3}s Quote:\s*(.*)$", re.I)


def _docx_rels(z):
    try:
        rx = z.read("word/_rels/document.xml.rels").decode("utf-8", "ignore")
    except KeyError:
        return {}
    return dict(re.findall(r'Id="([^"]+)"[^>]*?Target="([^"]+)"', rx))


def _docx_paragraphs(path):
    """List of (text, [embed_rIds]) per paragraph. Image-only paragraphs are kept
    (empty text) so their image still binds to the enclosing question."""
    z = zipfile.ZipFile(path)
    xml = z.read("word/document.xml").decode("utf-8", "ignore")
    out = []
    for p in re.split(r"</w:p>", xml):
        embeds = re.findall(r'r:embed="([^"]+)"', p)
        t = re.sub(r"<[^>]+>", "", p)
        t = (t.replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">")
              .replace("&quot;", '"').replace("&#8217;", "’").replace("&apos;", "'"))
        t = t.strip()
        if t or embeds:
            out.append((t, embeds))
    return out


def _parse_docx(paras):
    questions, cur, field, lecture, objective = [], None, None, "", ""

    def finalize():
        nonlocal cur
        if cur and cur.get("stem") and cur.get("choices") and cur.get("_ans"):
            idx = ord(cur.pop("_ans").upper()) - 65
            if 0 <= idx < len(cur["choices"]):
                cur["answer"] = idx
                exp = cur.pop("_rat", "").strip()
                quote = cur.pop("_quote", "").strip()
                if quote:
                    exp = (exp + "\n\nProfessor’s Quote: " + quote).strip()
                cur["explanation"] = exp
                rids = cur.pop("_embeds", [])
                if rids:
                    cur["media_rids"] = list(dict.fromkeys(rids))
                questions.append(cur)
        cur = None

    for text, embeds in paras:
        line = text
        if cur is not None and embeds:
            cur.setdefault("_embeds", []).extend(embeds)
        if not line:
            continue
        m = _RE_LECT.match(line)
        if m:
            finalize(); lecture = m.group(1).strip(); field = None; continue
        m = _RE_OBJ.match(line)
        if m:
            finalize(); objective = m.group(1).strip(); field = None; continue
        m = _RE_NUM.match(line)
        if m:
            finalize()
            cur = {"id": "q%s" % m.group(1), "stem": m.group(2).strip(),
                   "choices": [], "lecture": lecture, "objective": objective,
                   "tags": [], "source": "bank"}
            field = "stem"; continue
        if cur is None:
            continue
        m = _RE_ANS.match(line)
        if m:
            cur["_ans"] = m.group(1); field = None; continue
        m = _RE_RAT.match(line)
        if m:
            cur["_rat"] = m.group(1).strip(); field = "rat"; continue
        m = _RE_QUO.match(line)
        if m:
            cur["_quote"] = m.group(1).strip(); field = "quote"; continue
        m = _RE_CHO.match(line)
        if m:
            cur["choices"].append(m.group(2).strip()); field = "choice"; continue
        if field == "stem":
            cur["stem"] += " " + line
        elif field == "choice" and cur["choices"]:
            cur["choices"][-1] += " " + line
        elif field == "rat":
            cur["_rat"] = cur.get("_rat", "") + " " + line
        elif field == "quote":
            cur["_quote"] = cur.get("_quote", "") + " " + line
    finalize()
    return questions


def _write_qb(docx_path, qs):
    base = os.path.splitext(os.path.basename(docx_path))[0]
    man = {"qb_format": 1, "id": re.sub(r"[^A-Za-z0-9_.-]", "-", base).lower(),
           "name": base.replace("_", " "), "version": "1", "author": "internal",
           "family": "", "match": "text", "count": len(qs)}
    out = os.path.splitext(docx_path)[0] + ".qb"
    try:
        src = zipfile.ZipFile(docx_path)
        rels = _docx_rels(src)
    except Exception:
        src, rels = None, {}
    written = set()
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("manifest.json", json.dumps(man, indent=2))
        for q in qs:
            names = []
            for rid in q.pop("media_rids", []):
                tgt = rels.get(rid)
                if not tgt or src is None:
                    continue
                base_name = tgt.split("/")[-1]
                if base_name not in written:
                    try:
                        z.writestr("media/" + base_name, src.read("word/" + tgt))
                        written.add(base_name)
                    except KeyError:
                        continue
                names.append(base_name)
            if names:
                q["media"] = names
        z.writestr("questions.jsonl",
                   "\n".join(json.dumps(q, ensure_ascii=False) for q in qs))
    if src is not None:
        src.close()
    return out, man


# ---------------------------------------------------------------------------
# Build a .qb from a .pptx question bank whose questions/answers live INSIDE
# slide images (screenshots). We OCR each slide with the built-in macOS Vision
# framework (fully offline, no model download, no pip install) via a tiny Swift
# helper compiled on first use, then parse the recognized text into the SAME
# question shape as the .docx path so all the existing grading/Score reuse.
#
# Expected slide text (as recognized):
#   N. <stem>              (A) <choice> … (E) <choice>
# and, on a later slide, keyed by the same number:
#   N. The answer is X. <rationale>
# Question numbers reset per section, so an answer binds to the *nearest
# preceding* unanswered question carrying that number.
# ---------------------------------------------------------------------------
_PPTX_LOGO_DIMS = (2475000, 816900)   # repeated banner/logo on every slide → skip

_OCR_SWIFT = r'''import Foundation
import Vision
import AppKit

struct OCRBox { let y: CGFloat; let h: CGFloat; let minX: CGFloat; let maxX: CGFloat; let s: String }

func rowOrder(_ items: [OCRBox]) -> [OCRBox] {
    return items.sorted {
        if abs($0.y - $1.y) > 0.02 { return $0.y > $1.y }
        return $0.minX < $1.minX
    }
}

// Sort one column's boxes into reading order: top-to-bottom, left-to-right —
// except a block whose lines themselves sit side by side (a matching set: the
// numbered stems on the left, their shared (A)–(E) list on the right). Such a
// block is found as a vertical run of lines that a narrow inner gutter splits
// into two overlapping stacks; each stack is read whole so the two don't
// interleave row by row. Prose lines span the gutter, so they bound the run.
func columnOrder(_ items: [OCRBox]) -> [String] {
    let rows = rowOrder(items)
    guard rows.count >= 6 else { return rows.map { $0.s } }
    let lo = rows.map { $0.minX }.min()!, hi = rows.map { $0.maxX }.max()!
    let w = hi - lo
    var best: (n: Int, gap: CGFloat, a: Int, b: Int, x: CGFloat)? = nil
    var x = lo + 0.2 * w
    while x <= hi - 0.2 * w {
        var start = 0
        var i = 0
        while i <= rows.count {
            // a run ends at a line crossing x, at a big vertical gap, or at the end
            let brk = i == rows.count || (rows[i].minX < x && rows[i].maxX > x)
                || (i > start && rows[i - 1].y - (rows[i].y + rows[i].h) > 0.02)
            if brk {
                let run = Array(rows[start..<i])
                let L = run.filter { $0.maxX <= x }, R = run.filter { $0.minX >= x }
                if L.count >= 3 && R.count >= 3 {
                    let gap = R.map { $0.minX }.min()! - L.map { $0.maxX }.max()!
                    let lTop = L.map { $0.y + $0.h }.max()!, lBot = L.map { $0.y }.min()!
                    let rTop = R.map { $0.y + $0.h }.max()!, rBot = R.map { $0.y }.min()!
                    let ov = min(lTop, rTop) - max(lBot, rBot)
                    if gap >= 0.012 && ov >= 0.5 * min(lTop - lBot, rTop - rBot) {
                        let n = run.count
                        if best == nil || n > best!.n || (n == best!.n && gap > best!.gap) {
                            best = (n, gap, start, i, x)
                        }
                    }
                }
                // a crossing line belongs to no run; a gap starts a new run at i
                if i < rows.count && rows[i].minX < x && rows[i].maxX > x { start = i + 1 }
                else { start = i }
            }
            i += 1
        }
        x += 0.005
    }
    guard let b = best else { return rows.map { $0.s } }
    let run = Array(rows[b.a..<b.b])
    let L = run.filter { ($0.minX + $0.maxX) / 2 < b.x }, R = run.filter { ($0.minX + $0.maxX) / 2 >= b.x }
    return columnOrder(Array(rows[..<b.a]))
        + rowOrder(L).map { $0.s } + rowOrder(R).map { $0.s }
        + columnOrder(Array(rows[b.b...]))
}

func ocr(_ path: String) -> [String] {
    guard let img = NSImage(contentsOfFile: path),
          let tiff = img.tiffRepresentation,
          let bmp = NSBitmapImageRep(data: tiff),
          let cg = bmp.cgImage else { return [] }
    let req = VNRecognizeTextRequest()
    req.recognitionLevel = .accurate
    req.usesLanguageCorrection = true
    let h = VNImageRequestHandler(cgImage: cg, options: [:])
    try? h.perform([req])
    var boxes: [OCRBox] = []
    for o in (req.results ?? []) {
        guard let t = o.topCandidates(1).first else { continue }
        let bb = o.boundingBox
        boxes.append(OCRBox(y: bb.origin.y, h: bb.height, minX: bb.minX, maxX: bb.maxX, s: t.string))
    }
    if boxes.isEmpty { return [] }
    // Detect a vertical gutter in the central region that no text box spans, so
    // side-by-side (two-question) slides are read a full column at a time instead
    // of interleaving the columns row by row (which scrambles both questions).
    var bestGap: CGFloat = 0, bestSplit: CGFloat = -1
    var x: CGFloat = 0.34
    while x <= 0.66 {
        if !boxes.contains(where: { $0.minX < x && $0.maxX > x }) {
            let leftEdge = boxes.filter { $0.maxX <= x }.map { $0.maxX }.max() ?? 0
            let rightEdge = boxes.filter { $0.minX >= x }.map { $0.minX }.min() ?? 1
            if rightEdge - leftEdge > bestGap { bestGap = rightEdge - leftEdge; bestSplit = (leftEdge + rightEdge) / 2 }
        }
        x += 0.01
    }
    // (a textbook page's gutter can be under 4% of the width, e.g. 0.49 → 0.53)
    if bestSplit > 0 && bestGap > 0.025 {
        let left = boxes.filter { ($0.minX + $0.maxX) / 2 < bestSplit }
        let right = boxes.filter { ($0.minX + $0.maxX) / 2 >= bestSplit }
        if left.count >= 3 && right.count >= 3 {
            return columnOrder(left) + columnOrder(right)
        }
    }
    return columnOrder(boxes)
}

// For an embedded-figure question the screenshot holds stem + figure + choices.
// We keep the stem + figure + question line as the image (rendered exactly as on
// the slide) and crop OFF the choices block at the bottom (they're shown as
// separate clickable options). Returns the y to keep down to [0, y], or nil if
// no choices row is found (then the full image is kept).
func choicesTop(_ cg: CGImage) -> CGFloat? {
    let W = CGFloat(cg.width), H = CGFloat(cg.height)
    let req = VNRecognizeTextRequest(); req.recognitionLevel = .accurate
    try? VNImageRequestHandler(cgImage: cg, options: [:]).perform([req])
    var opts: [(CGFloat, Character)] = []      // (top-left y, letter)
    for o in (req.results ?? []) {
        guard let t = o.topCandidates(1).first?.string else { continue }
        // an option line: "(A) …", "A) …", "A. …"
        let s = t.trimmingCharacters(in: .whitespaces)
        let chars = Array(s.prefix(3))
        var letter: Character? = nil
        if chars.count >= 3, chars[0] == "(", chars[2] == ")" { letter = chars[1] }
        else if chars.count >= 2, chars[1] == ")" || chars[1] == "." { letter = chars[0] }
        if let L = letter, "ABCDEabcde".contains(L) {
            opts.append(((1 - o.boundingBox.maxY) * H, Character(String(L).uppercased())))
        }
    }
    // Need option A followed by at least one more (B/C/…) in the lower half.
    let aRows = opts.filter { $0.1 == "A" && $0.0 > 0.25 * H }.map { $0.0 }.sorted()
    for ay in aRows {
        if opts.contains(where: { $0.1 == "B" && $0.0 > ay - 4 }) {
            return max(0, ay - 12)
        }
    }
    return nil
}

func cropFigure(_ inp: String, _ outp: String) -> Bool {
    guard let img = NSImage(contentsOfFile: inp), let tiff = img.tiffRepresentation,
          let bmp = NSBitmapImageRep(data: tiff), let cg = bmp.cgImage,
          let y = choicesTop(cg), y > 0.15 * CGFloat(cg.height) else { return false }
    let rect = CGRect(x: 0, y: 0, width: CGFloat(cg.width), height: y)
    guard let c = cg.cropping(to: rect) else { return false }
    let rep = NSBitmapImageRep(cgImage: c)
    guard let data = rep.representation(using: .png, properties: [:]) else { return false }
    do { try data.write(to: URL(fileURLWithPath: outp)); return true } catch { return false }
}

let args = CommandLine.arguments
if args.count >= 4 && args[1] == "--crop" {
    print(cropFigure(args[2], args[3]) ? "OK" : "SKIP")
} else {
    // Process this chunk sequentially, flushing one JSON line per image so the
    // caller can stream progress. Parallelism comes from the caller running
    // several of these processes at once (a single throttled process is pinned
    // to a couple of cores; multiple processes spread across the machine).
    for path in args.dropFirst() {
        let obj: [String: Any] = ["path": path, "lines": ocr(path)]
        if let d = try? JSONSerialization.data(withJSONObject: obj),
           let s = String(data: d, encoding: .utf8) { print(s); fflush(stdout) }
    }
}
'''


def _ocr_dir():
    root = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
    d = os.path.join(root, "user_files", "ocr")
    os.makedirs(d, exist_ok=True)
    return d


def _ocr_binary():
    """Compile (once, cached in user_files) and return the Vision OCR helper.
    Raises RuntimeError with a friendly message if the toolchain is missing."""
    import subprocess
    d = _ocr_dir()
    src = os.path.join(d, "janki_ocr.swift")
    binp = os.path.join(d, "janki_ocr")
    cur = ""
    if os.path.isfile(src):
        with open(src, encoding="utf-8") as f:
            cur = f.read()
    if cur != _OCR_SWIFT:                 # source changed / first run → rebuild
        with open(src, "w", encoding="utf-8") as f:
            f.write(_OCR_SWIFT)
        try:
            os.remove(binp)
        except OSError:
            pass
    if os.path.isfile(binp) and os.access(binp, os.X_OK):
        return binp
    swiftc = shutil.which("swiftc") or "/usr/bin/swiftc"
    if not os.path.exists(swiftc):
        raise RuntimeError(
            "Reading text from slides uses macOS's built-in text recognition, "
            "which needs Xcode Command Line Tools.\n\nInstall them once with:\n"
            "    xcode-select --install\n\nthen try again.")
    r = subprocess.run([swiftc, "-O", src, "-o", binp],
                       capture_output=True, text=True)
    if r.returncode != 0 or not os.path.isfile(binp):
        raise RuntimeError("Could not build the OCR helper:\n\n%s"
                           % ((r.stderr or "").strip()[:800]))
    return binp


def _boost_thread_qos():
    """Raise this thread's macOS QoS to user-initiated so a subprocess spawned
    from it is routed to the Neural Engine. Accurate Vision OCR launched from a
    background/low-QoS thread (e.g. Anki's taskman worker) otherwise falls back
    to CPU and runs ~50× slower. Harmless off macOS."""
    import sys
    if sys.platform != "darwin":
        return
    try:
        import ctypes
        # QOS_CLASS_USER_INTERACTIVE = 0x21 — matches the (proven-fast) shell
        # context that routes accurate Vision to the Neural Engine.
        ctypes.CDLL("/usr/lib/libSystem.dylib").pthread_set_qos_class_self_np(0x21, 0)
    except Exception:
        pass


def _ocr_images(paths, progress=None):
    """Return {path: [lines]} using macOS Vision. Runs several helper processes in
    parallel and streams their combined output so `progress(done, total, path)`
    fires per image. Multiple processes are used because accurate Vision OCR
    spawned from Anki's background thread is throttled to a couple of cores
    (~0.2s/image); spreading the work across processes recovers most of the
    speed (~5× on an 8-core machine)."""
    import subprocess
    import select
    _boost_thread_qos()                     # helps when the Neural Engine is reachable
    binp = _ocr_binary()
    paths = list(paths)
    total = len(paths)
    out = {}
    if not paths:
        return out
    nproc = max(1, min(8, os.cpu_count() or 4, total))
    chunks = [paths[i::nproc] for i in range(nproc)]
    procs = [subprocess.Popen([binp] + c, stdout=subprocess.PIPE,
                              stderr=subprocess.DEVNULL)
             for c in chunks if c]
    bufs = {p.stdout.fileno(): b"" for p in procs}
    open_fds = set(bufs)
    done = 0
    try:
        while open_fds:
            ready, _, _ = select.select(list(open_fds), [], [], 0.2)
            for fd in ready:
                data = os.read(fd, 65536)
                if not data:
                    open_fds.discard(fd)
                    continue
                bufs[fd] += data
                while b"\n" in bufs[fd]:
                    line, bufs[fd] = bufs[fd].split(b"\n", 1)
                    line = line.strip()
                    if not line:
                        continue
                    try:
                        o = json.loads(line.decode("utf-8", "ignore"))
                        out[o["path"]] = o.get("lines", [])
                    except Exception:
                        continue
                    done += 1
                    if progress:
                        progress(done, total, o.get("path"))
    finally:
        for p in procs:
            p.wait()
    return out


def _crop_figure(src):
    """Crop `src` to just its figure (drop stem/choices text) via the helper.
    Returns the cropped path, or `src` unchanged if no figure band was found."""
    import subprocess
    _boost_thread_qos()
    out = os.path.splitext(src)[0] + ".crop.png"
    try:
        binp = _ocr_binary()
        r = subprocess.run([binp, "--crop", src, out], capture_output=True,
                           text=True, timeout=60)
        if r.returncode == 0 and (r.stdout or "").strip() == "OK" and os.path.isfile(out):
            return out
    except Exception:
        pass
    return src


def _pptx_slide_pics(z, names, sx):
    """→ [(arc, (cx, cy)), …] for the <p:pic> images on one slide, in order."""
    rels_name = "ppt/slides/_rels/" + sx.rsplit("/", 1)[-1] + ".rels"
    rmap = {}
    if rels_name in names:
        rx = z.read(rels_name).decode("utf-8", "ignore")
        for rid, tgt in re.findall(r'Id="([^"]+)"[^>]*Target="([^"]+)"', rx):
            rmap[rid] = tgt
    xml = z.read(sx).decode("utf-8", "ignore")
    out = []
    for blk in re.findall(r"<p:pic>.*?</p:pic>", xml, re.S):
        emb = re.search(r'r:embed="([^"]+)"', blk)
        ext = re.search(r'<a:ext cx="(\d+)" cy="(\d+)"', blk)
        if not emb or not ext:
            continue
        tgt = rmap.get(emb.group(1))
        if not tgt:
            continue
        arc = os.path.normpath(os.path.join("ppt/slides", tgt)).replace("\\", "/")
        if arc in names:
            out.append((arc, (int(ext.group(1)), int(ext.group(2)))))
    return out


def _pptx_native_paragraphs(z, sx):
    """Native (typed, not screenshot) text on a slide, one string per paragraph."""
    xml = z.read(sx).decode("utf-8", "ignore")
    out = []
    for p in re.split(r"</a:p>", xml):
        runs = re.findall(r"<a:t>(.*?)</a:t>", p, re.S)
        t = re.sub(r"\s+", " ", " ".join(re.sub(r"<[^>]+>", "", x) for x in runs))
        t = (t.replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">")
              .replace("&quot;", '"').replace("&#8217;", "’").replace("&apos;", "'")).strip()
        if t:
            out.append(t)
    return out


def _pptx_content_images(pptx_path, tmpdir):
    """Extract content images from a .pptx in slide order, dropping page chrome.
    Returns a per-slide sequence of **(temp_path, category)** — with repeats: a
    recurring image (an answer-key panel shown on several slides) appears once
    per slide it's on, so it can re-match against questions that come later. Each
    distinct image is written to disk (and later OCR'd) only once.

    `category` is the current section — banks are organised under native-text
    "title" slides whose text names a topic (e.g. "Cell Death and Injury"). We
    take the topic list from the agenda slide (topics that recur) and, walking in
    order, switch the current category whenever a slide's whole native text is
    one of them. Questions inherit it as their lecture tag, and answer↔question
    matching is scoped to a section.

    Chrome (a watermark/logo/footer) is any image on **most** slides — dropped
    everywhere so it's never OCR'd and never pollutes the parse. The fixed-size
    banner is skipped as a fallback."""
    z = zipfile.ZipFile(pptx_path)
    names = set(z.namelist())
    slide_xmls = sorted(
        [n for n in names if re.match(r"ppt/slides/slide\d+\.xml$", n)],
        key=lambda n: int(re.search(r"(\d+)", n.rsplit("/", 1)[-1]).group(1)))
    per_slide = [_pptx_slide_pics(z, names, sx) for sx in slide_xmls]
    per_text = [_pptx_native_paragraphs(z, sx) for sx in slide_xmls]

    # Topics = native paragraphs that recur across slides (a title slide repeats
    # its topic from the agenda). A slide whose whole native text is one topic is
    # a section header.
    pfreq = {}
    for paras in per_text:
        for p in set(paras):
            pfreq[p] = pfreq.get(p, 0) + 1
    topics = {p for p, c in pfreq.items() if c >= 2 and 2 <= len(p) <= 80}

    # Chrome images: present on > half the slides (min 5).
    ifreq = {}
    for pics in per_slide:
        for arc in {arc for arc, _ in pics}:
            ifreq[arc] = ifreq.get(arc, 0) + 1
    n = len(slide_xmls)
    chrome = {arc for arc, c in ifreq.items() if c > max(5, n // 2)}

    ordered, extracted = [], {}
    category = ""
    for sid, (pics, paras) in enumerate(zip(per_slide, per_text)):
        full = " ".join(paras).strip()
        if full in topics:                 # a section-title slide
            category = full
        for arc, dims in pics:
            if arc in chrome or dims == _PPTX_LOGO_DIMS:
                continue
            if arc not in extracted:
                fp = os.path.join(tmpdir, "%03d_%s"
                                  % (len(extracted), arc.rsplit("/", 1)[-1]))
                with open(fp, "wb") as f:
                    f.write(z.read(arc))
                extracted[arc] = fp
            ordered.append((extracted[arc], category, sid))
    z.close()
    return ordered


# Answer styles seen in the wild (question slides always carry (A)–(E) choices;
# answer slides don't — that's how we tell them apart):
#   "N. The answer is X. <rationale>"   number may be on a nearby/earlier line
#   "N. X <rationale>"                  BRS key; the '.' after the letter is often
#                                        dropped by OCR, so the letter is just a
#                                        standalone A–E token
#   "N. Correct: <rationale> (X)"        letter in trailing parens
_RE_P_ANS = re.compile(r"(?i)\bthe answer is\s*\(?([A-F])\b")
_RE_P_ANS_BRS = re.compile(r"^\s*(\d{1,3})[\.\)]\s+([A-F])(?:[\.\):]\s*|\s+)(\S.*)$")
_RE_P_ANS_COR = re.compile(r"(?i)^\s*(\d{1,3})?[\.\)]?\s*correct\b.*?\(([A-F])\)")
_RE_P_NUM = re.compile(r"^\s*(\d{1,3})[\.\)]\s+(\S.*)$")
_RE_P_STD = re.compile(r"^\s*(\d{1,3})[\.\)]?\s*$")     # a bare number on its own line
_RE_P_CHO = re.compile(r"^\s*\(?([A-Fa-f])[\)\.\:]\s*(\S.*)$")
# A choice letter alone on its own line ("(C)" / "C)" / "C." — text on the next
# line). Requires a bracket/punctuation so a bare graph label ("A", "B") is NOT
# mistaken for a choice.
_RE_P_CHO0 = re.compile(r"^\s*(?:\(([A-Fa-f])\)|([A-Fa-f])[\)\.\:])\s*$")
# "Questions 13-15" panel that shares a figure across a range of questions.
_RE_P_QRANGE = re.compile(
    r"(?i)\bquestions?\s+(\d{1,3})\s*(?:-|–|—|to|thru|through)\s*(\d{1,3})")


def _join(a, b):
    """Join wrapped OCR fragments, healing soft hyphens ('con-' + 'centration'
    → 'concentration') from line-break hyphenation."""
    a = a.rstrip()
    b = b.strip()
    if not a:
        return b
    if not b:
        return a
    if a.endswith("-") and len(a) >= 2 and a[-2].isalpha() and b[:1].islower():
        return a[:-1] + b
    return a + " " + b


def _merge_bare_numbers(lines):
    """Fold a lone question number onto the following line ('4' + 'A chronic…'
    → '4. A chronic…') so a numbered stem is recognised even when OCR puts the
    number on its own line."""
    out, i, n = [], 0, len(lines)
    while i < n:
        m = _RE_P_STD.match(lines[i])
        prev = out[-1] if out else None
        # Only fold a *question* number: not part of a run of numbers (a data
        # table), and only onto a *stem-like* next line — a real stem is a long
        # sentence (≥3 words), so a lone graph axis label ("60" + "R" / "log dose")
        # is never turned into a bogus "60. R" question that steals the choices.
        if (m and i + 1 < n and not _RE_P_STD.match(lines[i + 1])
                and not _RE_P_CHO.match(lines[i + 1])
                and (prev is None or not _RE_P_STD.match(prev))
                and len(lines[i + 1].split()) >= 3
                and int(m.group(1)) <= 60):
            out.append("%s. %s" % (m.group(1), lines[i + 1].strip()))
            i += 2
        else:
            out.append(lines[i])
            i += 1
    return out


def _choice_letter(l):
    """Uppercase letter (A–F) if `l` is an answer-choice marker ('(A) x', 'A) x',
    'A.', or a lone '(A)'), else None."""
    m = _RE_P_CHO.match(l)
    if m:
        return m.group(1).upper()
    m0 = _RE_P_CHO0.match(l)
    if m0:
        return (m0.group(1) or m0.group(2)).upper()
    return None


# A section header between question groups on one page ("Board-style Questions",
# "Review Questions") — short, no sentence punctuation, ends in "Question(s)".
_RE_P_SECTION = re.compile(r"(?i)^\s*[A-Za-z][\w\s/&-]{0,40}\bquestions?\s*$")


def _is_case_break(l):
    """True for a line that opens a new question group — a shared-case lead-in
    ("Questions 11 through 13 are based on…") or a section header — so the text
    that follows is never glued onto the previous question's last choice."""
    if _RE_P_SECTION.match(l) and len(l.split()) <= 5:
        return True
    return bool(re.match(r"(?i)^\s*(?:for\s+)?questions?\s+\d", l)
                and _RE_P_QRANGE.search(l))


def _split_question_segments(lines):
    """Split a slide's lines into one segment per question. A new question begins
    at a numbered stem ('N. …') OR — for slides whose question numbers OCR dropped
    or garbled (blue-label numbers, faint digits) — at an '(A)' choice that
    restarts the letter run while the current segment already holds ≥2 choices
    (that new question's stem is the trailing non-choice lines before the '(A)')."""
    segs, cur = [], []
    for l in lines:
        if _RE_P_NUM.match(l) or _is_case_break(l):
            if cur:
                segs.append(cur)
            cur = [l]
            continue
        if _choice_letter(l) == "A" and sum(
                1 for x in cur if _choice_letter(x) is not None) >= 2:
            j = len(cur)                    # peel trailing stem lines off `cur`
            while j > 0 and _choice_letter(cur[j - 1]) is None:
                j -= 1
            head, stem_lines = cur[:j], cur[j:]
            if head:
                segs.append(head)
            cur = stem_lines + [l]
            continue
        cur.append(l)
    if cur:
        segs.append(cur)
    return segs


def _extract_questions(lines):
    """Questions on a slide: a stem followed by A→B→C… choices. Multiple questions
    per slide split at each numbered stem, or (when OCR loses the number) at the
    next question's '(A)'. Kept only if a stem accumulates ≥2 sequential choices —
    which is also what marks a slide as a *question* slide (answer slides carry no
    parenthesised choices). `_num` is None when the number couldn't be read; the
    caller fills it in sequence within the section."""
    lines = _merge_bare_numbers(lines)
    # A matching set ("An answer may be used once, more than once, or not at
    # all"): several numbered stems share ONE lettered list printed after them,
    # so a stem with no choices of its own borrows the next question's list.
    matching = bool(re.search(r"(?i)more\s+than\s+once|once,?\s+or\s+not\s+at\s+all",
                              " ".join(lines)))
    shared = []             # choiceless numbered stems waiting for a shared list
    out = []
    for seg in _split_question_segments(lines):
        if not seg:
            continue
        m = _RE_P_NUM.match(seg[0])
        num = int(m.group(1)) if m else None
        stem0 = m.group(2) if m else seg[0]
        q = {"_num": num, "stem": re.sub(r"^[\s.·•]+", "", stem0).strip(),
             "choices": [], "answer": None, "explanation": "", "lecture": "",
             "objective": "", "tags": [], "source": "bank"}
        field = "stem"
        for l in seg[1:]:
            want = chr(65 + len(q["choices"]))
            # Only parenthesised/dotted "(A)"/"A." choices — NOT bare "A text",
            # which on answer slides is the per-distractor explanation ("A …", "B
            # …") and would make an answer slide look like a question.
            cm = _RE_P_CHO.match(l)
            c0 = _RE_P_CHO0.match(l)
            c0_letter = (c0.group(1) or c0.group(2)) if c0 else None
            if cm and cm.group(1).upper() == want and len(q["choices"]) < 6:
                q["choices"].append(cm.group(2).strip())
                field = "choice"
            elif c0_letter and c0_letter.upper() == want and len(q["choices"]) < 6:
                q["choices"].append("")     # letter alone; text is on next line(s)
                field = "choice"
            elif (field == "choice" and len(q["choices"]) < 6
                  and re.match(r"^%s\s+[A-Z]" % want, l) and len(l.split()) <= 6):
                # OCR sometimes drops a choice letter's delimiter ("C Potency" for
                # "C. Potency"). Accept it ONLY when it's the expected next letter
                # and short — so a long answer-slide distractor line never matches.
                q["choices"].append(l.split(None, 1)[1].strip())
                field = "choice"
            elif field == "choice" and q["choices"]:
                q["choices"][-1] = _join(q["choices"][-1], l)
            elif field == "stem":
                q["stem"] = _join(q["stem"], l)
        q["choices"] = [c.strip() for c in q["choices"]]
        if matching and num is not None and not q["choices"] and q["stem"]:
            if shared and shared[-1]["_num"] != num - 1:
                shared = []
            shared.append(q)
            continue
        if (len(q["choices"]) >= 2 and all(q["choices"])
                and not _looks_like_answer_text(q["stem"])):
            if shared and num is not None and shared[-1]["_num"] == num - 1:
                for sq in shared:
                    sq["choices"] = list(q["choices"])
                    out.append(sq)
            out.append(q)
        shared = []
    return out


# A per-distractor explanation line on an answer slide: a bare letter then a
# capitalised word ("A Intrinsic activity refers to…"). Questions use "A." with a
# delimiter, so these only appear on answer/explanation slides.
_RE_P_DISTRACT = re.compile(r"^\s*([A-F])\s+[A-Z]")
# "N. X <rationale>" answer line where X is the answer letter right after the
# number — tolerating OCR that mashes it into the next word ("2. CA peculiar…" =
# answer C). X must not be the start of a lowercase word ("2. Beta…" ≠ answer B).
_RE_P_ANS_EXPL = re.compile(r"^\s*(\d{1,3})[\.\)]\s+([A-F])(?![a-z])")
# A "distractors defer to the answer" line: "A-E See correct answer explanation" /
# "A, B, D, E See correct answer explanation" — marks an explanation slide.
_RE_P_SEE_EXPL = re.compile(r"(?i)see\s+(?:the\s+)?(?:correct\s+)?answer\s+explanation"
                            r"|see\s+correct\s+answer")


def _merge_answer_wrap(lines):
    """OCR often wraps 'The answer is X' across a line break ('… The answer' +
    'is B'). Join a line to the next while it dangles mid-phrase so the answer
    marker is detectable."""
    out, i, n = [], 0, len(lines)
    while i < n:
        cur = lines[i]
        while i + 1 < n and re.search(r"(?i)\bthe answer(?:\s+is)?\s*$", cur):
            cur = cur + " " + lines[i + 1]
            i += 1
        out.append(cur)
        i += 1
    return out


def _looks_like_answer_text(s):
    """True if `s` is answer-key prose, not a question stem — a distractor
    reference ("(choice E)"), the 'N. Correct: … (X)' key, or 'the answer is X'.
    Used to keep answer content from being mis-parsed as a question."""
    s = s or ""
    return bool(re.search(r"(?i)\(choices?\s+[A-F]\b", s)
                or _RE_P_ANS_COR.match(s)
                or re.search(r"(?i)\bthe answer is\s+[A-F]\b", s))


def _match_choice_to_rationale(choices, rat):
    """Which choice does this answer's rationale describe? These answer keys open
    by restating the correct choice ("… Scar formation. A large infarct …"), so a
    choice's text appears at the start of the rationale. Returns (index, confidence
    0-1). Used to verify/repair a positional answer binding without guessing —
    when nothing matches (the rationale is about a different question) confidence
    is low and the caller leaves the question unmatched."""
    def norm(s):
        return re.sub(r"[^a-z0-9 ]", " ", (s or "").lower())
    rn = re.sub(r"\s+", " ", norm(rat)).strip()
    head = rn[:120]
    head_tokens = set(rn.split()[:24])
    best_i, best = -1, 0.0
    for i, c in enumerate(choices):
        cn = re.sub(r"\s+", " ", norm(c)).strip()
        if not cn:
            continue
        score = 0.0
        key = cn[:28]                       # verbatim restatement at the head
        if len(key) >= 6 and key in head:
            score = 0.9
        ctoks = [t for t in cn.split() if len(t) > 3]   # content-word overlap
        if ctoks:
            hits = sum(1 for t in ctoks if t in head_tokens)
            if hits >= 2:
                score = max(score, hits / len(ctoks))
        if score > best:
            best, best_i = score, i
    return best_i, best


_OVERLAP_STOP = frozenset(
    "which would following these their there about other being because after "
    "before where while could should most least none also than that this with "
    "from have been into only more such they them then when were will what your "
    "each both between during".split())


def _rationale_overlap(q, rat):
    """How many distinct content words a rationale shares with a question's stem
    and choices (a related answer shares several; another chapter's shares ~0-3)."""
    def toks(s):
        return {t for t in re.findall(r"[a-z0-9]+", (s or "").lower())
                if len(t) > 3 and t not in _OVERLAP_STOP}
    return len(toks(rat) & toks(q["stem"] + " " + " ".join(q["choices"])))


def _is_expl_answer_slide(lines):
    """An 'explanation' answer slide: 'N. <answer letter> <rationale>' (the answer
    is the first char after the number), confirmed by either ≥2 per-distractor
    lines ('A …', 'B …') or a 'See correct answer explanation' deferral line."""
    if not any(_RE_P_ANS_EXPL.match(l) for l in lines):
        return False
    return (sum(1 for l in lines if _RE_P_DISTRACT.match(l)) >= 2
            or any(_RE_P_SEE_EXPL.search(l) for l in lines))


def _extract_answers(lines):
    """Answers on an answer slide → [(num_or_None, letter, rationale)]. Handles
    'The answer is X' (even wrapped across lines), BRS 'N. X <rationale>', 'N.
    Correct: … (X)', the 'N. X <rationale>' explanation format (answer = first
    char after the number, possibly OCR-mashed into the word), and several answers
    on one slide (a repeated key panel). A numberless 'The answer is X' recovers
    its number from the nearest preceding numbered line."""
    lines = _merge_answer_wrap(lines)
    marks = []                          # (i, num_or_None, letter, rat_start, explicit)
    for i, l in enumerate(lines):
        mc = _RE_P_ANS_COR.match(l)
        if mc:
            num = int(mc.group(1)) if mc.group(1) else None
            marks.append((i, num, mc.group(2).upper(), mc.end(), num is not None))
            continue
        mb = _RE_P_ANS_BRS.match(l)
        if mb:
            marks.append((i, int(mb.group(1)), mb.group(2).upper(), mb.start(3), True))
            continue
        m1 = _RE_P_ANS.search(l)
        if m1:
            num = None
            for j in range(i, -1, -1):
                mm = _RE_P_NUM.match(lines[j]) or _RE_P_STD.match(lines[j])
                if mm and int(mm.group(1)) <= 60:   # skip page numbers ("102
                    num = int(mm.group(1))          # Chapter 12") — Q numbers are
                    break                           # small and reset per section
            marks.append((i, num, m1.group(1).upper(), m1.end(), False))
    # Fallback: an explanation slide ("N. X rationale" + distractor lines) whose
    # answer letter the standard patterns missed (OCR mashed it into the word).
    if not marks and _is_expl_answer_slide(lines):
        for i, l in enumerate(lines):
            me = _RE_P_ANS_EXPL.match(l)
            if me:
                marks.append((i, int(me.group(1)), me.group(2).upper(), me.end(), True))
    # A numberless "The answer is X" (BRS batches several answers on one slide and
    # only numbers the first) recovers its number from the nearest number above —
    # which is the *previous* answer's, giving a duplicate. Bump it past the last.
    last_num = 0
    for k, (i, num, letter, pos, explicit) in enumerate(marks):
        if explicit and num is not None:
            last_num = num
        elif num is not None:
            if num <= last_num:
                num = last_num + 1
            last_num = num
            marks[k] = (i, num, letter, pos, explicit)
    out = []
    for k, (i, num, letter, pos, explicit) in enumerate(marks):
        end = marks[k + 1][0] if k + 1 < len(marks) else len(lines)
        rat = lines[i][pos:].lstrip(" .:-)")
        for l in lines[i + 1:end]:
            rat = _join(rat, l)
        out.append((num, letter, rat.strip()))
    return out


def _has_answers(lines):
    lines = _merge_answer_wrap(lines)
    if any(_RE_P_ANS.search(l) or _RE_P_ANS_BRS.match(l) or _RE_P_ANS_COR.match(l)
           for l in lines):
        return True
    return _is_expl_answer_slide(lines)


# A question has an EMBEDDED figure only if its stem actually references an
# accompanying figure — phrases, not bare words ("dose-response curve" in a
# choice must NOT trigger this).
# Nouns that name an embedded figure/image in a question stem (histology/path
# banks lean on "illustration"/"image"/"photomicrograph", not just "figure").
_FIG_NOUN = (r"graph|figure|table|diagram|chart|histogram|tracing|curves?|"
             r"illustration|image|photo(?:graph|micrograph)?|micrograph|"
             r"section|specimen|slide|smear|biopsy")
_FIG_KW = re.compile(
    r"(?i)"
    r"\b(?:" + _FIG_NOUN + r")\s+(?:below|above)\b"   # "graph below", "image above"
    r"|\bfollowing\s+(?:" + _FIG_NOUN + r")\b"        # "following table/illustration"
    r"|\bshown\s+(?:below|above|in the\b)"            # "shown below", "shown in the"
    r"|\b(?:depicted|illustrated)\b"
    r"|\b(?:" + _FIG_NOUN + r")\s+(?:shows?|depicts?|demonstrates?)\b"  # "illustration shows"
    r"|\bcurves?\s+in\s+the\s+(?:graph|figure)\b"     # "curves in the graph"
    r"|\bin\s+the\s+(?:" + _FIG_NOUN + r")\b")        # "in the illustration/image"


def _looks_like_prose(lines):
    """True if `lines` read as sentence text (a question-stem fragment) rather
    than a figure's scattered labels — used to tell a stem that was split across
    two images apart from an actual graph/table screenshot."""
    body = [l for l in lines if not _RE_P_STD.match(l)]
    words = sum(len(l.split()) for l in body)
    return words >= 12 and words >= 4 * max(1, len(body))


def _shared_cases(lines):
    """Every '(For) Questions X-Y refer to / are based on the following case: …'
    lead-in on a slide (a clinical vignette shared by a range of questions; a
    textbook page can carry two). The lead-in may wrap mid-word ("fol-" /
    "lowing case:"). Returns [(lo, hi, case_text), …]."""
    out = []
    for i, l in enumerate(lines):
        m = _RE_P_QRANGE.search(l)
        if not m:
            continue
        # the lead-in runs to its colon, at most two wrapped lines further
        lead, k = l, i
        while (":" not in lead and k + 1 < len(lines) and k < i + 2
               and not _RE_P_NUM.match(lines[k + 1])
               and (lead.endswith("-") or ":" in lines[k + 1][:40])):
            k += 1
            lead = _join(lead, lines[k])
        if not re.search(r"(?i)refer|following|based\s+on|case|patient|scenario", lead):
            continue
        # A figure range ("refer to the following graph/diagram") is not a case.
        if re.search(r"(?i)graph|diagram|figure|table|chart|curve|tracing", lead):
            continue
        lo, hi = int(m.group(1)), int(m.group(2))
        if not (0 < lo <= hi <= lo + 20):
            continue
        # text after the lead-in's colon on its own last line is case text too
        tail = lead.split(":", 1)[1].strip() if ":" in lead else ""
        buf = [tail] if tail else []
        for nx in lines[k + 1:]:            # case text up to the first question
            if _RE_P_NUM.match(nx) or _choice_letter(nx) or _is_case_break(nx):
                break
            buf.append(nx)
        # Only a genuine prose vignette — not a figure's scattered labels.
        if not _looks_like_prose(buf):
            continue
        text = ""
        for b in buf:
            text = _join(text, b)
        text = text.strip()
        if text:
            out.append((lo, hi, text))
    return out


def _continues_choices(q, lines):
    """True if `lines` begin with the next expected choice letter of `q` — i.e.
    they're the tail of a choice list that spilled onto the next image."""
    for l in lines:
        cl = _choice_letter(l)
        if cl is not None:
            return cl == chr(65 + len(q["choices"]))
        if l.strip():
            return False                    # real text before any choice → not a tail
    return False


def _append_choices(q, lines):
    """Append continuation choices (a choice list split across two images)."""
    for l in lines:
        want = chr(65 + len(q["choices"]))
        cm = _RE_P_CHO.match(l)
        c0 = _RE_P_CHO0.match(l)
        c0l = (c0.group(1) or c0.group(2)) if c0 else None
        if cm and cm.group(1).upper() == want and len(q["choices"]) < 6:
            q["choices"].append(cm.group(2).strip())
        elif c0l and c0l.upper() == want and len(q["choices"]) < 6:
            q["choices"].append("")
        elif q["choices"]:
            q["choices"][-1] = _join(q["choices"][-1], l)


_RE_PLOIDY = re.compile(r"(?<![A-Za-z0-9])[24]N(?![A-Za-z0-9])")
_RE_PLOIDY_1 = re.compile(r"(?<![A-Za-z0-9])[Il]N(?![A-Za-z0-9])")
_RE_PLOIDY_DNA = re.compile(r"\bDNA\b[^.]{0,20}?(?<![A-Za-z0-9])[Il]N(?![A-Za-z0-9])")


def _fix_ploidy(q):
    """OCR reads DNA content '1N' as 'IN'/'lN'. Repair it only in a question that
    also speaks of 2N/4N, or right after "DNA" ("amount of DNA to IN") — where a
    standalone capital 'IN' can't be the word."""
    texts = [q.get("stem", ""), q.get("explanation", "")] + list(q.get("choices") or [])
    if not any(_RE_PLOIDY.search(t or "") or _RE_PLOIDY_DNA.search(t or "")
               for t in texts):
        return
    q["stem"] = _RE_PLOIDY_1.sub("1N", q.get("stem", ""))
    q["explanation"] = _RE_PLOIDY_1.sub("1N", q.get("explanation", ""))
    q["choices"] = [_RE_PLOIDY_1.sub("1N", c) for c in q.get("choices") or []]


def _parse_ocr_blocks(blocks):
    """blocks = [(path, [lines], category, slide_id), …] in slide order →
    (questions, n_detected). A slide that yields questions (stem + ≥2 choices) is
    a question slide; if it states answers it's an answer slide; anything else on
    a slide (a graph/table/photo screenshot) is a *figure*. Answers bind to
    questions **within the same section** (numbers reset per section and some keys
    are numberless, so global matching is unsafe). Figures on a question's slide
    are attached to that question; a question whose text references a figure but
    has no separate figure image keeps its own screenshot (embedded graph/table)."""
    questions = []          # every question (with choices), in slide order
    answers = []            # (n_seen_before, num, letter, rat, category)
    slide_figs = {}         # slide_id → [figure image paths]
    range_figs = []         # (category, lo, hi, [paths]) — a shared-figure panel
    range_cases = {}        # (category, lo, hi) → case text shared by a range
    sec_last = {}           # category → last question number seen/assigned
    seen_stems = set()
    pending = None          # (prefix_text, prefix_num) — a stem fragment (a
                            # question whose opening text is on the previous image)
    last_q = None           # most recent question (for choices split across images)
    last_q_sid = None
    prev_img = None         # (sid, lines, answers-before, answers-after) of the last
                            # non-question image — to recover a misfiled stem opening
    for path, raw, category, sid in blocks:
        lines = [l.strip() for l in raw if l.strip()]
        n_ans_before = len(answers)
        # A shared clinical vignette ("Questions 26-28 refer to the following
        # case: …") can appear on its own panel or inline above the first
        # question — record it either way so it prepends to that whole range.
        cases = _shared_cases(lines)
        for lo, hi, text in cases:          # applies from this slide onward
            range_cases.setdefault((category, lo, hi), (len(questions), text))
        case = cases[0] if cases else None
        qs = _extract_questions(lines)
        if qs:                              # → a question slide
            for n, q in enumerate(qs):
                # Include the number and the choices: consecutive figure questions
                # can share an identical figure-description lead-in ("The figure
                # below depicts…") yet be different questions — dedup only true
                # repeats (same number, stem AND choices), not those.
                key = (category, q.get("_num"), q["stem"][:80].lower(),
                       tuple(c[:20].lower() for c in q["choices"]))
                if key in seen_stems:       # skip a repeated question panel
                    continue
                seen_stems.add(key)
                if n == 0 and pending:      # opening text was on the prior image
                    q["stem"] = _join(pending[0], q["stem"])
                    if q["_num"] is None:
                        q["_num"] = pending[1]
                    q["_slide_prefix"] = list(pending[2])   # stitched above the slide
                elif (n == 0 and q["_num"] is None and q["stem"][:1].islower()
                      and prev_img and prev_img[0] == sid):
                    # A numberless stem opening mid-sentence ("and muscle weakness…")
                    # continues the previous image on this slide — even when that
                    # image was misfiled (its "33. A 4-month-old…" reads like a
                    # "N. X rationale" key). Take its text + number, and withdraw
                    # any answers it was credited with.
                    pl = prev_img[1]
                    mnum = _RE_P_NUM.match(pl[0]) if pl else None
                    head = ""
                    for l in ([mnum.group(2)] + pl[1:]) if mnum else pl:
                        head = _join(head, l)
                    if head and _looks_like_prose(pl):
                        q["stem"] = _join(head, q["stem"])
                        if mnum:
                            q["_num"] = int(mnum.group(1))
                        q["_slide_prefix"] = [prev_img[4]]
                        del answers[prev_img[2]:prev_img[3]]
                        figs = slide_figs.get(sid, [])
                        if prev_img[4] in figs:     # …or filed as a figure
                            figs.remove(prev_img[4])
                # OCR may drop a question's number (blue label / faint digit); fill
                # it in sequence within the section so its answer still binds.
                if q["_num"] is None:
                    q["_num"] = sec_last.get(category, 0) + 1
                sec_last[category] = q["_num"]
                q["lecture"] = category or ""
                q["_cat"] = category
                q["_slide"] = sid
                q["_src"] = path
                questions.append(q)
                last_q, last_q_sid = q, sid
            pending = None
        elif last_q is not None and sid == last_q_sid \
                and _continues_choices(last_q, lines):
            _append_choices(last_q, lines)  # choice list spilled onto next image
            pending = None
        elif _has_answers(lines):           # → an answer slide
            pending = None
            for num, letter, rat in _extract_answers(lines):
                # keep `path` = the answer/explanation slide image, to attach later
                answers.append((len(questions), num, letter, rat, category, path))
        elif case:                          # a pure shared-case / range panel
            for l in lines:                 # may also be a shared *figure* range
                mr = _RE_P_QRANGE.search(l)
                if mr and re.search(r"(?i)graph|figure|table|diagram|chart|below", l):
                    lo, hi = int(mr.group(1)), int(mr.group(2))
                    if 0 < lo <= hi <= lo + 20:
                        range_figs.append((category, lo, hi, [path]))
        elif _looks_like_prose(lines) and not _looks_like_answer_text(" ".join(lines)):
            # → a stem fragment (not a figure): the opening of the next question,
            # whose choices are on the following image. Require it to START like a
            # real stem (number or a capital letter) — a fragment beginning
            # mid-sentence/lowercase is an answer-rationale continuation
            # ("elastic fibers … are produced by fibroblasts"), not a question, and
            # must NOT be carried onto the next question.
            nums = [l for l in lines if _RE_P_STD.match(l)]
            pnum = int(_RE_P_STD.match(nums[0]).group(1)) if nums else None
            body = " ".join(l for l in lines if not _RE_P_STD.match(l)).strip()
            if body[:1].isupper() or body[:1].isdigit():
                pending = (_join(pending[0], body) if pending else body,
                           (pending[1] if pending and pending[1] else pnum),
                           (pending[2] if pending else []) + [path])
            else:
                pending = None              # rationale continuation → drop
        else:                               # → a figure/other image
            pending = None
            slide_figs.setdefault(sid, []).append(path)
            # A "Questions 13-15" panel: one figure shared by a range of questions
            # that live on *later* slides. Record the range so it attaches to them.
            for l in lines:
                mr = _RE_P_QRANGE.search(l)
                if mr:
                    lo, hi = int(mr.group(1)), int(mr.group(2))
                    if 0 < lo <= hi <= lo + 20:
                        range_figs.append((category, lo, hi, [path]))
        prev_img = None if qs else (sid, lines, n_ans_before, len(answers), path)

    for pos, num, letter, rat, category, ans_path in answers:
        pool = [q for q in questions[:pos]
                if q["_cat"] == category and q["answer"] is None]
        target = idx = None
        if num is not None:                 # pass 1: bind by question number
            for q in reversed(pool):
                if q["_num"] == num:
                    target, idx = q, ord(letter) - 65
                    break
            # A number match far back in the deck (another chapter reusing "7.")
            # must also agree on content — a deck that omits a set's answers would
            # otherwise hand it an unrelated chapter's key. Unverified → unanswered.
            if target is not None:
                back = pos - next(k for k, qq in enumerate(questions) if qq is target)
                if back > 6 and _match_choice_to_rationale(target["choices"], rat)[1] < 0.7 \
                        and _rationale_overlap(target, rat) < 5:
                    target = idx = None
        if target is None and pool:
            # pass 2: no number match. Verify against the most-recent open question
            # by matching the answer's rationale text to one of its choices — the
            # rationale restates the correct choice ("… Fibronectin forms tracks…").
            # This recovers answers whose number was garbled/misaligned WITHOUT
            # guessing: bind to the text-matched choice (self-correcting the letter),
            # or, only for a numberless answer, fall back to the stated letter.
            cand = pool[-1]
            mi, conf = _match_choice_to_rationale(cand["choices"], rat)
            if conf >= 0.7:
                target, idx = cand, mi
            elif num is None:
                target, idx = cand, ord(letter) - 65
        if target is not None and idx is not None and 0 <= idx < len(target["choices"]):
            target["answer"] = idx
            target["explanation"] = rat
            if ans_path:
                target["_ans_slide_src"] = ans_path   # explanation/answer slide image

    # Attach figures: a separate figure image on the question's slide, a shared
    # "Questions X-Y" figure panel (on an earlier slide), or (for an embedded
    # graph/table) the question's own screenshot when it names a figure.
    for q in questions:
        figs = list(slide_figs.get(q["_slide"], []))
        shared = [p for cat, lo, hi, ps in range_figs
                  if cat == q["_cat"] and lo <= (q["_num"] or -1) <= hi for p in ps]
        if figs:                            # separate figure image(s) on the slide
            q["_media_paths"] = list(dict.fromkeys(figs))
        elif shared:                        # figure shared across a question range
            q["_media_paths"] = list(dict.fromkeys(shared))
        elif _FIG_KW.search(q["stem"]):        # figure referenced in the stem
            # Embedded figure: the graph/table is baked into the question
            # screenshot, so OCR dragged its labels/cells into the stem. Show the
            # screenshot itself and render image-only (drop the garbled stem text).
            # a stem that began on earlier screenshot(s) shows them all, in order
            q["_media_paths"] = list(q.get("_slide_prefix") or []) + [q["_src"]]
            q["figure_only"] = True

    # Prepend a shared clinical vignette to the questions of its range that
    # FOLLOW it — once each, stopping when the numbering leaves the range (a later
    # chapter reusing the same numbers is a different case).
    for (cat, lo, hi), (start, text) in range_cases.items():
        done = set()
        for q in questions[start:]:
            if q["_cat"] != cat:
                continue
            n = q["_num"] or -1
            if not (lo <= n <= hi) or n in done:
                if done:
                    break
                continue
            q["stem"] = _join(text, q["stem"])
            done.add(n)

    for q in questions:
        _fix_ploidy(q)

    good, incomplete = [], []
    for q in questions:
        src = q.get("_src")
        if src:
            q["_slide_src"] = src          # keep the source slide for later viewing/editing
        sn = q.get("_slide")
        if sn is not None:
            q["slide_no"] = sn + 1         # 1-based slide number for easy reference
        for k in ("_num", "_cat", "_slide", "_src"):
            q.pop(k, None)
        if q["stem"] and len(q["choices"]) >= 2 and q["answer"] is not None:
            q["id"] = "q%d" % (len(good) + 1)
            good.append(q)
            continue
        # Detected but didn't fully resolve. Keep it aside (flagged) so it can be
        # imported as an *incomplete* card for diagnosis instead of vanishing.
        reasons = []
        if not q["stem"]:
            reasons.append("no stem")
        if len(q["choices"]) < 2:
            reasons.append("only %d choice(s)" % len(q["choices"]))
        if q["answer"] is None:
            reasons.append("no answer matched")
        q["incomplete"] = ", ".join(reasons) or "incomplete"
        if not q.get("_media_paths") and src:   # show the original slide for context
            q["_media_paths"] = [src]
        q["id"] = "x%d" % (len(incomplete) + 1)
        incomplete.append(q)
    return good, len(questions), incomplete


def _shrink_image_bytes(path, max_w=1400, quality=80):
    """Downscale (to `max_w` wide) and JPEG-compress an image to bytes, for storing
    lightweight reference slides in a .qb. Returns None on any failure so the caller
    can fall back to the original file."""
    try:
        from aqt.qt import Qt, QImage, QByteArray, QBuffer, QIODevice
        img = QImage(path)
        if img.isNull():
            return None
        if img.width() > max_w:
            img = img.scaledToWidth(
                max_w, Qt.TransformationMode.SmoothTransformation)
        ba = QByteArray()
        buf = QBuffer(ba)
        buf.open(QIODevice.OpenModeFlag.WriteOnly)
        if not img.save(buf, "JPG", quality):
            return None
        return bytes(ba)
    except Exception as e:
        log("qbank shrink image: %s" % e)
        return None


def _stitch_image_bytes(paths, max_w=1400, quality=80):
    """Stack images top-to-bottom (a question whose stem runs across several
    screenshots on one slide) into one downscaled JPEG, for the reference slide.
    None on any failure — the caller then keeps the last image alone."""
    try:
        from aqt.qt import (Qt, QImage, QPainter, QColor, QByteArray, QBuffer,
                            QIODevice)
        imgs = [QImage(p) for p in paths]
        imgs = [i for i in imgs if not i.isNull()]
        if len(imgs) < 2:
            return None
        w = min(max_w, max(i.width() for i in imgs))
        imgs = [i.scaledToWidth(w, Qt.TransformationMode.SmoothTransformation)
                if i.width() > w else i for i in imgs]
        gap = 12
        out = QImage(w, sum(i.height() for i in imgs) + gap * (len(imgs) - 1),
                     QImage.Format.Format_RGB32)
        out.fill(QColor("white"))
        p = QPainter(out)
        y = 0
        for i in imgs:
            p.drawImage(0, y, i)
            y += i.height() + gap
        p.end()
        ba = QByteArray()
        buf = QBuffer(ba)
        buf.open(QIODevice.OpenModeFlag.WriteOnly)
        if not out.save(buf, "JPG", quality):
            return None
        return bytes(ba)
    except Exception as e:
        log("qbank stitch image: %s" % e)
        return None


def _write_qb_plain(out_path, base_name, qs):
    """Write a .qb from already-parsed question dicts, copying any attached figure
    images (from each question's `_media_paths`) into media/ and recording their
    names on the question's `media` field."""
    man = {"qb_format": 1, "id": re.sub(r"[^A-Za-z0-9_.-]", "-", base_name).lower(),
           "name": base_name.replace("_", " "), "version": "1", "author": "internal",
           "family": "", "match": "text", "count": len(qs)}
    fields = ("id", "stem", "choices", "answer", "explanation", "lecture",
              "objective", "tags", "source", "media", "slide", "ans_slide",
              "slide_no", "figure_only", "incomplete")
    written = {}            # src temp path → media/<arc name>
    with zipfile.ZipFile(out_path, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("manifest.json", json.dumps(man, indent=2))
        for q in qs:
            names = []
            for sp in q.get("_media_paths", []):
                if sp not in written:
                    ext = os.path.splitext(sp)[1] or ".png"
                    arc = "m%d%s" % (len(written), ext)
                    try:
                        z.write(sp, "media/" + arc)
                    except OSError:
                        continue
                    written[sp] = arc
                names.append(written[sp])
            if names:
                q["media"] = list(dict.fromkeys(names))
            # The original slide screenshot — stored (not shown on the card) only so
            # it can be viewed/compared when correcting a mis-parsed question. It's a
            # reference image, not study content, so downscale + JPEG-compress it to
            # keep the .qb light (raw slide PNGs would bloat a bank by 10-100×).
            sp = q.get("_slide_src")
            pre = [p for p in q.get("_slide_prefix") or [] if p != sp]
            if sp and pre:
                # the stem began on earlier image(s): show them stacked above
                data = _stitch_image_bytes(pre + [sp])
                key = tuple(pre + [sp])
                if data is not None and key not in written:
                    arc = "s%d.jpg" % len(written)
                    z.writestr("media/" + arc, data)
                    written[key] = arc
                if key in written:
                    q["slide"] = written[key]
                    sp = None               # done — skip the single-image path
            if sp:
                if sp not in written:
                    arc = "s%d.jpg" % len(written)
                    data = _shrink_image_bytes(sp)
                    try:
                        if data is not None:
                            z.writestr("media/" + arc, data)
                        else:
                            arc = "s%d%s" % (len(written),
                                             os.path.splitext(sp)[1] or ".png")
                            z.write(sp, "media/" + arc)   # fallback: store as-is
                        written[sp] = arc
                    except OSError:
                        pass
                if sp in written:
                    q["slide"] = written[sp]
            # The answer/explanation slide (shown on the back), same compression.
            ap = q.get("_ans_slide_src")
            if ap:
                if ap not in written:
                    arc = "a%d.jpg" % len(written)
                    data = _shrink_image_bytes(ap)
                    try:
                        if data is not None:
                            z.writestr("media/" + arc, data)
                        else:
                            arc = "a%d%s" % (len(written),
                                             os.path.splitext(ap)[1] or ".png")
                            z.write(ap, "media/" + arc)
                        written[ap] = arc
                    except OSError:
                        pass
                if ap in written:
                    q["ans_slide"] = written[ap]
        clean = [{k: q[k] for k in fields if k in q} for q in qs]
        z.writestr("questions.jsonl",
                   "\n".join(json.dumps(q, ensure_ascii=False) for q in clean))
    return man


def pptx_import_dialog(on_done=None, path=None):
    """Pick a .pptx, OCR its slides locally, parse MCQs, and build+import a .qb
    in one step. OCR is macOS Vision (offline); imperfect slides may be skipped.
    Pass ``path`` to skip the file picker (e.g. a file dropped onto the list)."""
    from aqt.qt import QFileDialog, QMessageBox
    from aqt.utils import tooltip, showWarning
    import tempfile
    if not path:
        path, _ = QFileDialog.getOpenFileName(
            mw, "Build .qb from .pptx (OCR)", "", "PowerPoint (*.pptx)")
    if not path:
        return
    tmp = tempfile.mkdtemp(prefix="janki_pptx_")
    try:
        imgs = _pptx_content_images(path, tmp)   # [(temp_path, category, sid), …]
    except Exception as e:
        shutil.rmtree(tmp, ignore_errors=True)
        showWarning("Could not read .pptx:\n\n%s" % e)
        return
    if not imgs:
        shutil.rmtree(tmp, ignore_errors=True)
        showWarning("No slide images found in this .pptx.")
        return
    uniq = list(dict.fromkeys(p for p, _c, _s in imgs))   # OCR each image once

    # OCR is the slow part — run it OFF the main thread so the progress bar
    # actually animates (a main-thread loop would freeze the UI). Images finish
    # out of order (parallel processes), so report the monotonic count, not the
    # slide index (which would jump around).
    def _bg():
        def prog(done, total, cur_path=None):
            pct = int(100 * done / total) if total else 0
            mw.taskman.run_on_main(
                lambda d=done, t=total, p=pct: mw.progress.update(
                    label="Reading slides… %d of %d  (%d%%)" % (d, t, p),
                    value=d, max=t))
        return _ocr_images(uniq, progress=prog)

    def _after(fut):
        mw.progress.finish()
        try:
            ocr_map = fut.result()
        except Exception as e:
            shutil.rmtree(tmp, ignore_errors=True)
            showWarning("Text recognition failed:\n\n%s" % e)
            return
        qs, detected, incomplete = _parse_ocr_blocks(
            [(p, ocr_map.get(p, []), cat, sid) for p, cat, sid in imgs])
        # Keep `tmp` alive until after _write_qb_plain — each question's figure
        # images (_media_paths) point into it and are copied into the .qb.
        try:
            if not qs and not incomplete:
                showWarning(
                    "No multiple-choice questions could be read.\n\n"
                    "OCR detected %d candidate(s) but none had usable choices. "
                    "Check the slide format." % detected)
                return
            base = os.path.splitext(os.path.basename(path))[0]
            m = QMessageBox(mw)
            m.setWindowTitle("Build .qb from .pptx")
            m.setText("Recognized %d complete question(s) (of %d detected across "
                      "%d slide image(s))." % (len(qs), detected, len(uniq)))
            info = ("OCR isn't perfect — some questions may need a small fix in the "
                    "bank preview afterwards.\n\nCreate a .qb and import it now?")
            if incomplete:
                info = ("%d more were detected but couldn't be fully parsed "
                        "(missing an answer, choices, or stem). You can also import "
                        "those as flagged “incomplete” cards — each shows its "
                        "original slide image — to diagnose/fix them.\n\n"
                        % len(incomplete)) + info
            m.setInformativeText(info)
            create = inc_btn = None
            if qs:
                create = m.addButton("Create & import",
                                     QMessageBox.ButtonRole.AcceptRole)
            if incomplete:
                inc_btn = m.addButton(
                    ("Import %d complete + %d incomplete" % (len(qs), len(incomplete)))
                    if qs else "Import %d incomplete" % len(incomplete),
                    QMessageBox.ButtonRole.AcceptRole)
            m.addButton("Cancel", QMessageBox.ButtonRole.RejectRole)
            m.exec()
            clicked = m.clickedButton()
            if clicked not in (create, inc_btn) or clicked is None:
                return
            final_qs = list(qs)
            if clicked is inc_btn:
                final_qs += incomplete
            # Crop embedded-figure screenshots down to just the figure (they
            # otherwise carry the stem/choices text too). Incomplete cards keep
            # their full screenshot (no figure_only flag) for diagnosis.
            crop_qs = [q for q in final_qs
                       if q.get("figure_only") and q.get("_media_paths")]
            if crop_qs:
                mw.progress.start(label="Cropping figures…", immediate=True)
                try:
                    for i, q in enumerate(crop_qs):
                        mw.progress.update(label="Cropping figures… %d/%d"
                                           % (i + 1, len(crop_qs)))
                        # crop only the LAST screenshot (it holds the choices);
                        # earlier ones of a stitched stem are kept whole
                        mp = q["_media_paths"]
                        q["_media_paths"] = mp[:-1] + [_crop_figure(mp[-1])]
                finally:
                    mw.progress.finish()
            out = os.path.splitext(path)[0] + ".qb"
            try:
                man = _write_qb_plain(out, base, final_qs)
                import_qb(out)
            except Exception as e:
                showWarning("Could not create/import .qb:\n\n%s" % e)
                return
            retag_from_lecture_map()
            assign_deck_tags_from_headers()
            n_inc = len(final_qs) - len(qs)
            tooltip("Imported “%s” (%d questions%s from slide OCR)."
                    % (man.get("name"), len(final_qs),
                       (" incl. %d incomplete" % n_inc) if n_inc else ""),
                    period=4000)
            if on_done:
                on_done()
        finally:
            shutil.rmtree(tmp, ignore_errors=True)

    mw.progress.start(label="Preparing text recognition…", immediate=True)
    mw.taskman.run_in_background(_bg, _after)


# ---------------------------------------------------------------------------
# AI-assisted tagging (offline round-trip). We DON'T call any model — instead we
# build a prompt the user pastes into their own Claude/ChatGPT, and later import
# the JSON reply. A practice question is a clinical vignette that never literally
# names its tag ("Hemolytic_Anemia"), so lexical pre-filtering can't work — the AI
# must read the vignette and recognise the concept. To keep the candidate list
# pasteable we DON'T dump AnKing's ~43k tags (75% of which are UWorld/FirstAid/
# AMBOSS cross-references, not concepts): we offer the curated #Subjects concept
# tree (~1.9k leaves) plus the small school decks (Hutch/AJ) in full. The AI picks
# per question; the reply maps question id → chosen tags, written back onto the
# bank. No lecture→tag map is involved, so this works for any material the
# collection covers (M1, M2, …) regardless of what the calendar map contains.
# ---------------------------------------------------------------------------
_ROOTS = ("#AK", "AJ_UCCOM_keep", "hUtChCOM")
_SUBJECTS_MARK = "::#Subjects::"      # AnKing's canonical concept subtree
_TAG_UNIVERSE = {"mod": None, "tags": None}


def _prompt_header(sections, ex1, ex2, ex_tag):
    """Build the instruction header dynamically: only the sections actually
    included, a VERBATIM real id example (models copy examples), a bias toward []
    over weak matches, and a worked example."""
    return (
        "You are an expert medical educator assigning Anki tags to exam-style "
        "practice questions. Each question is a clinical vignette that usually "
        "does NOT name its underlying concept — infer the concept, then tag it.\n\n"
        "A shared CANDIDATE TAGS list is given once below, in %d section(s):\n"
        % len(sections) + "\n".join(sections) + "\n\n"
        "For EACH question:\n"
        "• Pick UP TO 3 candidates that clearly fit; fewer is better.\n"
        "• Return an empty list [] rather than a weak or approximate match — many "
        "questions are pure physiology / histology / lab with no matching concept; "
        "[] is the correct answer for those.\n"
        "• Choose ONLY from the candidate list and copy each choice "
        "character-for-character (including any leading '*'). Never invent or "
        "alter a tag.\n"
        "• Reproduce the bracketed id VERBATIM.\n\n"
        "Return ONLY a JSON array — no prose, no markdown fences — with one object "
        "per question, in order. Example:\n"
        '  [{"id": "%s", "tags": ["%s"]},\n'
        '   {"id": "%s", "tags": []}]\n' % (ex1, ex_tag, ex2)
    )


def _plain(s):
    s = re.sub(r"<[^>]+>", " ", s or "")
    return re.sub(r"\s+", " ", s).strip()


def _correct_index(q):
    """Index of the correct choice (answer stored as int index, letter, or exact
    text). -1 if unknown."""
    a = q.get("answer")
    ch = q.get("choices") or []
    if isinstance(a, int):
        return a if 0 <= a < len(ch) else -1
    if isinstance(a, str):
        s = a.strip()
        if len(s) == 1 and s.upper().isalpha():
            i = ord(s.upper()) - 65
            return i if 0 <= i < len(ch) else -1
        try:
            return ch.index(a)
        except ValueError:
            return -1
    return -1


def _collection_tags():
    """Set of every distinct tag in the local collection (cached by col mtime).
    Read locally from notes; never leaves the machine on its own."""
    try:
        mod = mw.col.mod
    except Exception:
        mod = None
    if _TAG_UNIVERSE["tags"] is not None and _TAG_UNIVERSE["mod"] == mod:
        return _TAG_UNIVERSE["tags"]
    uniq = set()
    try:
        for ts in mw.col.db.list("select tags from notes"):
            if ts:
                uniq.update(ts.split())
    except Exception as e:
        log("qbank collection tags: %s" % e)
    _TAG_UNIVERSE["mod"] = mod
    _TAG_UNIVERSE["tags"] = uniq
    return uniq


def _concept_tags():
    """AnKing #Subjects concept tags in the collection (the curated concept tree,
    excluding the UWorld/FirstAid/AMBOSS cross-reference clutter)."""
    return [t for t in _collection_tags() if _SUBJECTS_MARK in t]


def _concept_branches():
    """{branch: sorted[leaf names]} for the #Subjects tree — branch is the subject
    block right under #Subjects (Hematology, Cardiology, …). A bank usually covers
    one block, so keeping only relevant branches slashes the candidate list."""
    out = {}
    for t in _concept_tags():
        segs = t.split("::")
        try:
            i = segs.index("#Subjects")
        except ValueError:
            continue
        if i + 2 < len(segs):                 # need a branch AND a leaf beyond it
            out.setdefault(segs[i + 1], set()).add(segs[-1])
    return {b: sorted(v) for b, v in out.items()}


def _concept_leaf_index():
    """concept-leaf key → sorted full-path #Subjects tags carrying it. Used to
    expand a returned concept name back to the real collection tags."""
    lec = _lectures()
    idx = {}
    for t in _concept_tags():
        leaf = t.split("::")[-1]
        k = lec._leaf_key(leaf) if lec is not None else leaf.strip().lower()
        if k:
            idx.setdefault(k, []).append(t)
    for k in idx:
        idx[k] = sorted(idx[k])
    return idx


def _family_tags(root):
    return sorted(t for t in _collection_tags() if root in t)


# AnKing content is copyrighted, so its CARD TEXT is never emitted as an example
# snippet (tag NAMES are fine — they're just labels). A note counts as AnKing if it
# carries any AnKing marker tag (the #AK root, the #AnKing note marker, or the
# #Subjects concept subtree, which only AnKing ships).
_ANKING_MARKS = ("#AK", "#AnKing", _SUBJECTS_MARK)


def _is_anking_tags(tagset):
    return any(m in t for t in tagset for m in _ANKING_MARKS)


def _card_snippet(flds, max_len=160):
    """A short plain-text preview of a note's fields (\x1f-separated), so the AI
    can see what a candidate tag actually covers. Read locally; never uploaded on
    its own — it only lands in the prompt the user pastes into their own AI."""
    parts = [p for p in (_plain(f) for f in (flds or "").split("\x1f")) if p]
    s = " / ".join(parts)
    return (s[:max_len].rstrip() + "…") if len(s) > max_len else s


def _decks_top_level():
    """[(top-level deck name, [deck_ids incl. subdecks])], for the deck-source
    picker. Selecting a top-level deck includes all of its subdecks."""
    out = {}
    try:
        for d in mw.col.decks.all_names_and_ids(skip_empty_default=True,
                                                include_filtered=False):
            top = d.name.split("::", 1)[0]
            if top == "Practice":        # skip our own Janki Practice decks
                continue
            if "anking" in top.lower():  # copyright — AnKing text is never used
                continue
            out.setdefault(top, []).append(d.id)
    except Exception as e:
        log("qbank deck list: %s" % e)
    return sorted(out.items(), key=lambda kv: kv[0].lower())


def _notes_in_decks(deck_ids):
    """Set of note ids that have at least one card in any of `deck_ids`.
    None (no filter) → None (means the whole collection)."""
    if not deck_ids:
        return None
    try:
        ph = ",".join("?" * len(deck_ids))
        return set(mw.col.db.list(
            "select distinct nid from cards where did in (%s)" % ph,
            *[int(d) for d in deck_ids]))
    except Exception as e:
        log("qbank notes-in-decks: %s" % e)
        return None


def _candidate_examples(concept_leaves, hutch_tags, aj_tags, max_len=160,
                        deck_ids=None):
    """One representative card snippet per candidate tag, from a SINGLE local pass
    over notes (stops early once every wanted tag has an example). Concept leaves
    are keyed by leaf name (matched via any full #Subjects path carrying it);
    Hutch/AJ are keyed by their full tag. `deck_ids` restricts which decks the
    example cards may come from. Returns (concept_ex, hutch_ex, aj_ex)."""
    concept_ex, hutch_ex, aj_ex = {}, {}, {}
    allowed_nids = _notes_in_decks(deck_ids)   # None = whole collection
    # Map every wanted concept full-path → its displayed leaf name.
    path_leaf = {}
    if concept_leaves:
        leafset = set(concept_leaves)
        for t in _concept_tags():
            leaf = t.split("::")[-1]
            if leaf in leafset:
                path_leaf[t] = leaf
    hutch_set, aj_set = set(hutch_tags), set(aj_tags)
    wanted = set(path_leaf) | hutch_set | aj_set
    if not wanted:
        return concept_ex, hutch_ex, aj_ex
    need_leaves = set(path_leaf.values())
    try:
        rows = mw.col.db.execute("select id, tags, flds from notes")
    except Exception as e:
        log("qbank candidate examples: %s" % e)
        return concept_ex, hutch_ex, aj_ex
    for nid, tags_str, flds in rows:
        if not tags_str:
            continue
        if allowed_nids is not None and nid not in allowed_nids:
            continue
        ntags = set(tags_str.split())
        if _is_anking_tags(ntags):        # never emit AnKing card text (copyright)
            continue
        hit = ntags & wanted
        if not hit:
            continue
        snip = None
        for t in hit:
            if t in path_leaf:
                leaf = path_leaf[t]
                if leaf not in concept_ex:
                    snip = snip if snip is not None else _card_snippet(flds, max_len)
                    if snip:
                        concept_ex[leaf] = snip
                        need_leaves.discard(leaf)
            elif t in hutch_set and t not in hutch_ex:
                snip = snip if snip is not None else _card_snippet(flds, max_len)
                if snip:
                    hutch_ex[t] = snip
            elif t in aj_set and t not in aj_ex:
                snip = snip if snip is not None else _card_snippet(flds, max_len)
                if snip:
                    aj_ex[t] = snip
        if (not need_leaves and len(hutch_ex) >= len(hutch_set)
                and len(aj_ex) >= len(aj_set)):
            break
    return concept_ex, hutch_ex, aj_ex


# --- Deterministic deck-tag pointer (headers → school-deck lecture tag) -------
# A .qb's lecture headers (e.g. "GeneticRBCDisorders") map onto the school deck's
# own lecture tags (AJ_UCCOM_keep::Blood::Week2::14_GeneticDisordersofRBCs). That
# tag is a deterministic code lookup, not an LLM inference — so we assign it here
# and keep AJ out of the AI prompt. But the deck's tagging is uneven, so this is
# CONFIDENCE-GATED: only strong matches are applied; ambiguous/absent headers are
# left for the concept pass. (AJ is AnKing-derived, so its lecture tag and the
# #Subjects concept tag are consistent by construction.)
_DECK_MATCH_MIN = 0.6


def _match_score(lec, header, leaf):
    """Fraction of the header's distinctive words covered (fuzzily) by the tag's
    leaf. Reuses the lecture engine's camelCase-aware tokeniser."""
    ha = lec._key_tokens(lec._match_tokens(header))
    hb = lec._key_tokens(lec._match_tokens(leaf))
    if not ha or not hb:
        return 0.0
    def _cov(x):
        return max((difflib.SequenceMatcher(None, x, y).ratio() for y in hb),
                   default=0.0)
    return sum(1 for x in ha if _cov(x) >= 0.82) / len(ha)


def _best_deck_tag(lec, header, fam_tags):
    best, best_s = None, 0.0
    for t in fam_tags:
        s = _match_score(lec, header, t.split("::")[-1])
        if s > best_s:
            best, best_s = t, s
    return best if best_s >= _DECK_MATCH_MIN else None


def assign_deck_tags_from_headers(families=("AJ_UCCOM_keep", "hUtChCOM")):
    """Confidence-gated pass: stamp each question's best-matching lecture tag (from
    its .qb lecture header) onto the question, for EACH school-deck family the
    collection has (AJ and Hutch by default). A header often maps into whichever
    deck the user actually studies, so covering both makes lecture-level matching
    fire regardless. Returns (tagged, total)."""
    if isinstance(families, str):
        families = (families,)
    lec = _lectures()
    if lec is None:
        return (0, 0)
    fam_lists = [(f, _family_tags(f)) for f in families]
    fam_lists = [(f, ts) for f, ts in fam_lists if ts]
    if not fam_lists:
        return (0, 0)
    tagged = total = 0
    for _bid, meta in list_banks().items():
        dir_name = meta.get("dir", "")
        qs = _bank_questions(dir_name)
        cache, changed = {}, False
        for q in qs:
            if not isinstance(q, dict) or not q.get("stem"):
                continue
            total += 1
            L = q.get("lecture")
            if not L:
                continue
            if L not in cache:
                dts = []
                for _f, ts in fam_lists:
                    dt = _best_deck_tag(lec, L, ts)
                    if dt:
                        dts.append(dt)
                cache[L] = dts
            dts = cache[L]
            if dts:
                cur = q.get("tags") or []
                new = set(cur) | set(dts)
                if new != set(cur):
                    q["tags"] = sorted(new)
                    changed = True
                tagged += 1
        if changed:
            _rewrite_bank(dir_name, qs)
    return tagged, total


def mine_concepts_from_banks():
    """Deterministically detect concept leaves in each question's stem + correct
    answer + explanation using the collection's own #Subjects vocabulary, storing
    them in the question's `mined_tags`. This is the AI-free bridge that lets
    tag-less banks match real review cards. No AI, nothing uploaded. Returns
    (questions_with_concepts, total)."""
    if not _concept_phrase_index():
        return (0, 0)
    mined = total = 0
    for _bid, meta in list_banks().items():
        dir_name = meta.get("dir", "")
        qs = _bank_questions(dir_name)
        changed = False
        for q in qs:
            if not isinstance(q, dict) or not q.get("stem") or q.get("incomplete"):
                continue
            total += 1
            ci = _correct_index(q)
            ch = q.get("choices") or []
            correct = ch[ci] if 0 <= ci < len(ch) else ""
            a = q.get("answer")
            text = " ".join([q.get("stem") or "", str(correct),
                             a if isinstance(a, str) else "",
                             q.get("explanation") or ""])
            hits = sorted(_concepts_in_text(text))
            prev = list(q.get("mined_tags") or [])
            if hits != prev:
                if hits:
                    q["mined_tags"] = hits
                else:
                    q.pop("mined_tags", None)
                changed = True
            if hits:
                mined += 1
        if changed:
            _rewrite_bank(dir_name, qs)
    return mined, total


def retag_all_banks():
    """Run every deterministic (no-AI) tagging pass so banks match review cards as
    well as possible without anyone uploading questions/cards to an AI: the calendar
    lecture map, header→deck lecture tags (AJ/Hutch), and concept mining from each
    question's answer/explanation. Returns (deck_tagged, concept_mined)."""
    try:
        retag_from_lecture_map()
    except Exception as e:
        log("retag_all lecture_map: %s" % e)
    dt = mc = 0
    try:
        dt, _ = assign_deck_tags_from_headers()
    except Exception as e:
        log("retag_all headers: %s" % e)
    try:
        mc, _ = mine_concepts_from_banks()
    except Exception as e:
        log("retag_all mine: %s" % e)
    return dt, mc


def build_tagging_prompt(bids, include_choices=False, include_answer=False,
                         branches=None, concepts=True, hutch_on=True, aj_on=True,
                         include_card_text=False, card_text_decks=None):
    """Build the paste-into-an-AI prompt for the given bank ids. The candidate
    list is fully modular — each part can be toggled to trade coverage for tokens:
      • concepts   — AnKing #Subjects concept leaves (optionally limited to
                     `branches`, a set of subject-block names, else all).
      • hutch_on   — full hUtChCOM tags.
      • aj_on      — full AJ_UCCOM_keep tags.
      • include_choices — add ALL MCQ options to each question (biggest).
      • include_answer  — add only the CORRECT option (cheaper; often names the
                          diagnosis). Ignored when include_choices is on.
      • include_card_text — append a representative card snippet to each candidate
                          tag (from the notes carrying it) so the AI can see what
                          each tag covers. Much larger prompt.
      • card_text_decks — restrict which decks the example snippets are drawn from
                          (list of deck ids; None = whole collection).
    Returns (prompt_text, stats)."""
    lec = _lectures()

    # Concept candidates: distinct #Subjects leaf names, optionally restricted to
    # selected subject branches (short; expanded back to full paths on apply).
    if not concepts:
        concept_leaves = []
    elif branches is None:
        concept_leaves = sorted({t.split("::")[-1] for t in _concept_tags()})
    else:
        bmap = _concept_branches()
        sel = set(branches)
        concept_leaves = sorted({l for b, v in bmap.items() if b in sel
                                 for l in v})
    hutch = _family_tags("hUtChCOM") if hutch_on else []
    aj = _family_tags("AJ_UCCOM_keep") if aj_on else []

    # Gather questions grouped by lecture (first-seen order); qid = bank#ordinal,
    # ordinal being 1-based over stem-bearing questions in that bank's file order
    # (stable, so the reply maps back without storing anything).
    groups, lec_pos = [], {}
    for bid in bids:
        meta = list_banks().get(bid) or {}
        ordinal = 0
        for q in _bank_questions(meta.get("dir", "")):
            if not isinstance(q, dict) or not q.get("stem"):
                continue
            ordinal += 1
            qid = "%s#%d" % (bid, ordinal)
            L = q.get("lecture") or "(no lecture)"
            if L not in lec_pos:
                lec_pos[L] = len(groups)
                groups.append([L, []])
            groups[lec_pos[L]][1].append((qid, q))
    total_q = sum(len(items) for _L, items in groups)

    # Section descriptions (only for what's actually included) + a real id example
    # so the model copies the correct format.
    sections = []
    if concept_leaves:
        sections.append("  • Concepts — AnKing #Subjects concept names; return the "
                        "name EXACTLY as shown. Some start with '*' (e.g. "
                        "*Anemia_Workup) — keep the '*'.")
    if hutch:
        sections.append("  • Hutch — full hUtChCOM tags; return the whole :: path.")
    if aj:
        sections.append("  • AJ — full AJ_UCCOM_keep tags; return the whole :: path.")
    if include_card_text:
        sections.append("  • Any '⟶ e.g. …' after a candidate is a sample card's "
                        "text for context only — it shows what the tag covers; "
                        "return just the tag, never the example text.")
    qids = [qid for _L, items in groups for qid, _q in items]
    ex1 = qids[0] if qids else ((bids[0] + "#1") if bids else "bank#1")
    ex2 = qids[1] if len(qids) > 1 else ex1
    ex_tag = (concept_leaves[0] if concept_leaves else
              hutch[0] if hutch else aj[0] if aj else "Some_Concept")

    # Optional: a representative card snippet per candidate, so the AI can see
    # what each tag actually covers (a big token cost — off by default).
    concept_ex = hutch_ex = aj_ex = {}
    if include_card_text:
        concept_ex, hutch_ex, aj_ex = _candidate_examples(
            concept_leaves, hutch, aj, deck_ids=card_text_decks)

    def _line(name, ex):
        snip = ex.get(name)
        return "- %s  ⟶ e.g. %s" % (name, snip) if snip else "- %s" % name

    out = [_prompt_header(sections, ex1, ex2, ex_tag), "\n" + "=" * 64,
           "CANDIDATE TAGS"]
    if concept_leaves:
        out.append("\n-- Concepts (AnKing #Subjects) — return the name exactly --")
        out.extend(_line(t, concept_ex) for t in concept_leaves)
    if hutch:
        out.append("\n-- Hutch (hUtChCOM) — return the full tag exactly --")
        out.extend(_line(t, hutch_ex) for t in hutch)
    if aj:
        out.append("\n-- AJ (AJ_UCCOM_keep) — return the full tag exactly --")
        out.extend(_line(t, aj_ex) for t in aj)

    out.append("\n" + "=" * 64)
    out.append("QUESTIONS")
    for L, items in groups:
        out.append("\n### %s" % L)
        for qid, q in items:
            mark = ("  [IMAGE not included — tag from the text if possible]"
                    if q.get("media") else "")
            out.append("[%s] %s%s" % (qid, _plain(q.get("stem", "")), mark))
            ch = q.get("choices")
            if ch and include_choices:
                ci = _correct_index(q)
                out.append("   " + "   ".join(
                    "%s. %s%s" % (chr(65 + j), _plain(c), " ✓" if j == ci else "")
                    for j, c in enumerate(ch)))
            elif ch and include_answer:
                ci = _correct_index(q)
                if 0 <= ci < len(ch):
                    out.append("   Answer: %s. %s" % (chr(65 + ci), _plain(ch[ci])))

    stats = {"questions": total_q,
             "candidates": len(concept_leaves) + len(hutch) + len(aj),
             "concepts": len(concept_leaves), "hutch": len(hutch), "aj": len(aj)}
    return "\n".join(out), stats


def copy_tagging_prompt_dialog(on_done=None):
    """Pick bank(s), build the AI tag-matching prompt, and copy it to the
    clipboard (or save it as .txt for large prompts)."""
    from aqt.qt import (Qt, QDialog, QVBoxLayout, QHBoxLayout, QLabel,
                        QRadioButton, QButtonGroup, QPushButton, QApplication,
                        QFileDialog, QCheckBox, QScrollArea, QWidget)
    from aqt.utils import tooltip, showWarning
    banks = list_banks()
    if not banks:
        tooltip("No question banks imported yet.")
        return
    dlg = QDialog(mw)
    dlg.setWindowTitle("AI tag-matching prompt")
    v = QVBoxLayout(dlg)
    lbl = QLabel(
        "Builds a prompt that asks an AI to match each question to your Anki "
        "concept tags (AnKing #Subjects + Hutch/AJ). Paste it into "
        "Claude/ChatGPT, save the JSON reply, then use “Apply AI tag results…” "
        "to write the tags back. (Large prompt — Claude handles it best; use "
        "Save .txt for very large banks.)")
    lbl.setWordWrap(True)
    v.addWidget(lbl)
    from aqt.qt import QToolButton, QMenu, QWidgetAction

    def _dropdown(title, inner):
        """A compact toolbar button that pops up `inner` (a widget of checkboxes)
        as a box when clicked; the box stays open while you toggle items."""
        btn = QToolButton()
        btn.setText(title + "  ▾")
        btn.setPopupMode(QToolButton.ToolButtonPopupMode.InstantPopup)
        btn.setStyleSheet("QToolButton{padding:4px 10px;border:1px solid "
                          "rgba(255,255,255,0.18);border-radius:5px;}"
                          "QToolButton::menu-indicator{image:none;}")
        menu = QMenu(btn)
        wa = QWidgetAction(menu)
        wa.setDefaultWidget(inner)
        menu.addAction(wa)
        btn.setMenu(menu)
        return btn

    # --- option boxes (shown via the dropdowns on the Bank row) -------------
    hutch_n = len(_family_tags("hUtChCOM"))
    aj_n = len(_family_tags("AJ_UCCOM_keep"))
    inc_box = QWidget(); inc_v = QVBoxLayout(inc_box)
    inc_v.setContentsMargins(10, 8, 10, 8)
    cb_concepts = QCheckBox("AnKing concepts (#Subjects)"); cb_concepts.setChecked(True)
    cb_hutch = QCheckBox("Hutch tags (%d)" % hutch_n); cb_hutch.setChecked(True)
    cb_aj = QCheckBox("AJ tags (%d) — usually deterministic, off" % aj_n)
    cb_aj.setChecked(False)   # AJ lecture tag is assigned in code, not by the model
    cb_answer = QCheckBox("Correct answer"); cb_answer.setChecked(False)
    cb_choices = QCheckBox("All answer choices (larger)"); cb_choices.setChecked(False)
    cb_cardtext = QCheckBox("Example card text per tag (much larger)")
    cb_cardtext.setChecked(False)
    cb_cardtext.setToolTip(
        "Append a short snippet from a real card carrying each candidate tag, so "
        "the AI can see what the tag covers. Greatly increases prompt size.")
    for c in (cb_concepts, cb_hutch, cb_aj, cb_answer, cb_choices, cb_cardtext):
        inc_v.addWidget(c)

    # Suboption of card text: which decks the example snippets may come from
    # (nonspecific — just the user's own top-level decks; all on = whole
    # collection, the default). Indented so it reads as a child of card text.
    deck_lbl = QLabel("      from decks:")
    deck_lbl.setStyleSheet("color:#9aa0aa;")
    inc_v.addWidget(deck_lbl)
    deck_scroll = QScrollArea(); deck_scroll.setWidgetResizable(True)
    deck_scroll.setFixedHeight(120)
    deck_host = QWidget(); deck_hv = QVBoxLayout(deck_host)
    deck_hv.setContentsMargins(22, 0, 0, 0)
    deck_cbs = {}                                   # top-level name -> (checkbox, [dids])
    for _name, _dids in _decks_top_level():
        _dcb = QCheckBox(_name); _dcb.setChecked(True)
        deck_cbs[_name] = (_dcb, _dids); deck_hv.addWidget(_dcb)
    deck_hv.addStretch()
    deck_scroll.setWidget(deck_host)
    inc_v.addWidget(deck_scroll)

    bmap = _concept_branches()
    branch_order = sorted(bmap, key=lambda b: (-len(bmap[b]), b))
    scroll = QScrollArea(); scroll.setWidgetResizable(True)
    scroll.setFixedHeight(220); scroll.setMinimumWidth(240)
    host = QWidget(); host_v = QVBoxLayout(host)
    branch_cbs = {}
    for b in branch_order:
        cb = QCheckBox("%s (%d)" % (b, len(bmap[b]))); cb.setChecked(True)
        branch_cbs[b] = cb; host_v.addWidget(cb)
    host_v.addStretch()
    scroll.setWidget(host)

    # --- Bank row: label + All-banks checkbox + the two option dropdowns ----
    bank_row = QHBoxLayout()
    bank_row.addWidget(QLabel("Bank:"))
    cb_all = QCheckBox("All banks (%d)" % len(banks)); cb_all.setChecked(True)
    bank_row.addWidget(cb_all)
    bank_row.addSpacing(10)
    bank_row.addWidget(_dropdown("Include in prompt", inc_box))
    blocks_btn = _dropdown("Concept subject blocks", scroll)
    bank_row.addWidget(blocks_btn)
    bank_row.addStretch()
    v.addLayout(bank_row)

    # Per-bank radios: only shown/needed when "All banks" is off.
    grp = QButtonGroup(dlg)
    bank_box = QWidget(); bank_bv = QVBoxLayout(bank_box)
    bank_bv.setContentsMargins(16, 0, 0, 0)
    ids = []
    for k, (bid, meta) in enumerate(banks.items()):
        rb = QRadioButton("%s  (%s q)" % (meta.get("name", bid),
                                          meta.get("count", "?")))
        grp.addButton(rb, k)
        bank_bv.addWidget(rb)
        ids.append(bid)
    if ids:
        grp.button(0).setChecked(True)
    bank_box.setVisible(False)
    v.addWidget(bank_box)

    est = QLabel(""); est.setStyleSheet("color:#9aa0aa; margin-top:4px;")
    v.addWidget(est)

    def _selected_bids():
        if cb_all.isChecked():
            return list(ids)
        btn = grp.checkedButton()
        idx = grp.id(btn) if btn is not None else -1
        return [ids[idx]] if 0 <= idx < len(ids) else list(ids)

    def _params():
        sel_branches = None
        if cb_concepts.isChecked():
            chosen = [b for b, cb in branch_cbs.items() if cb.isChecked()]
            sel_branches = None if len(chosen) == len(branch_cbs) else set(chosen)
        deck_ids = None
        if cb_cardtext.isChecked():
            chosen = [(cb, dids) for cb, dids in deck_cbs.values()]
            picked = [d for cb, dids in chosen if cb.isChecked() for d in dids]
            # All selected → None (whole collection); a subset → just those decks.
            if picked and not all(cb.isChecked() for cb, _d in chosen):
                deck_ids = picked
        return dict(include_choices=cb_choices.isChecked(),
                    include_answer=cb_answer.isChecked(),
                    concepts=cb_concepts.isChecked(),
                    hutch_on=cb_hutch.isChecked(), aj_on=cb_aj.isChecked(),
                    branches=sel_branches,
                    include_card_text=cb_cardtext.isChecked(),
                    card_text_decks=deck_ids)

    def _build():
        prompt, stats = build_tagging_prompt(_selected_bids(), **_params())
        if stats["questions"] == 0:
            showWarning("No questions in the selected bank(s).")
            return None
        return prompt, stats

    def _refresh(*_a):
        blocks_btn.setVisible(cb_concepts.isChecked())   # AnKing-only; hide otherwise
        for cb in branch_cbs.values():
            cb.setEnabled(cb_concepts.isChecked())
        cb_answer.setEnabled(not cb_choices.isChecked())  # choices supersede answer
        deck_lbl.setEnabled(cb_cardtext.isChecked())      # deck picker is a subopt
        deck_scroll.setEnabled(cb_cardtext.isChecked())
        for _dcb, _d in deck_cbs.values():
            _dcb.setEnabled(cb_cardtext.isChecked())
        try:
            prompt, stats = build_tagging_prompt(_selected_bids(), **_params())
        except Exception:
            est.setText(""); return
        extra = ("  · +choices" if cb_choices.isChecked()
                 else "  · +answer" if cb_answer.isChecked() else "")
        if cb_cardtext.isChecked():
            extra += "  · +card text"
        est.setText("≈ %d tokens  ·  %d questions, %d candidates "
                    "(%d concepts + %d Hutch + %d AJ)%s"
                    % (len(prompt) // 4, stats["questions"], stats["candidates"],
                       stats["concepts"], stats["hutch"], stats["aj"], extra))

    def _toggle_all(on):
        bank_box.setVisible(not on)   # show the radio list only when picking one
        dlg.adjustSize()
        _refresh()

    cb_all.toggled.connect(_toggle_all)
    grp.buttonToggled.connect(lambda *a: _refresh())
    for w in (cb_concepts, cb_hutch, cb_aj, cb_answer, cb_choices, cb_cardtext,
              *branch_cbs.values(),
              *[cb for cb, _d in deck_cbs.values()]):
        w.toggled.connect(_refresh)
    _refresh()

    def _copy():
        r = _build()
        if not r:
            return
        prompt, stats = r
        QApplication.clipboard().setText(prompt)
        tooltip("Copied: %d questions · %d candidates (%d concepts + %d Hutch + "
                "%d AJ) · ~%d tokens."
                % (stats["questions"], stats["candidates"], stats["concepts"],
                   stats["hutch"], stats["aj"], len(prompt) // 4), period=4200)
        dlg.accept()

    def _save():
        r = _build()
        if not r:
            return
        prompt, stats = r
        path, _ = QFileDialog.getSaveFileName(
            dlg, "Save prompt", "tag-matching-prompt.txt", "Text (*.txt)")
        if not path:
            return
        try:
            with open(path, "w", encoding="utf-8") as f:
                f.write(prompt)
        except Exception as e:
            showWarning("Could not save:\n\n%s" % e)
            return
        tooltip("Saved prompt (%d questions)." % stats["questions"], period=3000)
        dlg.accept()

    row = QHBoxLayout()
    close = QPushButton("Close")
    save = QPushButton("Save .txt…")
    copy = QPushButton("Copy to clipboard")
    for b in (save, copy):
        b.setStyleSheet("QPushButton{background-color:#55585e;color:white;"
                        "border:none;padding:5px 12px;border-radius:5px;}"
                        "QPushButton:hover{background-color:#61646b;}")
    row.addWidget(close)
    row.addStretch()
    row.addWidget(save)
    row.addWidget(copy)
    v.addLayout(row)
    close.clicked.connect(dlg.reject)
    save.clicked.connect(_save)
    copy.clicked.connect(_copy)
    dlg.resize(560, 220)
    dlg.exec()
    if on_done:
        try:
            on_done()
        except Exception:
            pass


def _split_qid(qid):
    """'bank-id#12' → ('bank-id', 12). Returns (None, None) if malformed."""
    s = str(qid)
    if "#" in s:
        bid, _, ordn = s.rpartition("#")
        try:
            return bid, int(ordn)
        except ValueError:
            return None, None
    return None, None


def _nth_question(qs, n):
    """The n-th (1-based) stem-bearing question in a bank's file order — matches
    the ordinal used when the prompt was built."""
    c = 0
    for q in qs:
        if isinstance(q, dict) and q.get("stem"):
            c += 1
            if c == n:
                return q
    return None


def _parse_results(raw):
    """Parse an AI reply into a list of {"id":…, "tags":[…]} dicts. Tolerates a
    markdown ```json fence, a top-level array, a wrapper object, or JSONL."""
    raw = (raw or "").strip()
    if raw.startswith("```"):
        raw = re.sub(r"^```[A-Za-z]*\n?", "", raw)
        raw = re.sub(r"\n?```$", "", raw).strip()
    try:
        data = json.loads(raw)
        if isinstance(data, dict):
            data = data.get("results") or data.get("questions") or list(data.values())
        if isinstance(data, list):
            return [d for d in data if isinstance(d, dict)]
    except json.JSONDecodeError:
        pass
    out = []
    for ln in raw.splitlines():
        ln = ln.strip().rstrip(",")
        if ln.startswith("{"):
            try:
                out.append(json.loads(ln))
            except json.JSONDecodeError:
                pass
    return out


def _resolve_returned_tag(t, valid, concept_idx, lec):
    """An AI-returned tag → the real collection tag(s) to store. Full paths
    (Hutch/AJ, or a full #Subjects path) that exist verbatim are kept as-is; a
    bare concept name (#Subjects leaf) is expanded to its full-path tag(s)."""
    if t in valid:
        return [t]
    k = lec._leaf_key(t.split("::")[-1]) if lec is not None else t.strip().lower()
    return list(concept_idx.get(k, ()))


def _apply_tag_results(data):
    """Write AI-chosen tags back onto bank questions. Concept-leaf names are
    expanded to full-path #Subjects tags; only tags that actually exist in the
    collection are kept (so they line up with real cards). Returns
    (questions_updated, tags_dropped, entries_skipped)."""
    valid = _collection_tags()
    concept_idx = _concept_leaf_index()
    lec = _lectures()
    bank_qs = {bid: (meta.get("dir", ""), _bank_questions(meta.get("dir", "")))
               for bid, meta in list_banks().items()}
    updated = dropped = skipped = 0
    changed = {}
    for entry in data:
        qid = entry.get("id") or entry.get("qid")
        tags = entry.get("tags") or []
        bid, ordn = _split_qid(qid) if qid is not None else (None, None)
        if bid is None or bid not in bank_qs:
            skipped += 1
            continue
        dir_name, qs = bank_qs[bid]
        target = _nth_question(qs, ordn)
        if target is None:
            skipped += 1
            continue
        clean = []
        for x in tags:
            t = str(x).strip()
            if not t:
                continue
            resolved = _resolve_returned_tag(t, valid, concept_idx, lec)
            if resolved:
                clean.extend(resolved)
            else:
                dropped += 1
        if not clean:
            continue
        existing = target.get("tags") or []
        merged = sorted(set(existing) | set(clean))
        if merged != existing:
            target["tags"] = merged
            updated += 1
            changed[bid] = dir_name
    for bid, dir_name in changed.items():
        _rewrite_bank(dir_name, bank_qs[bid][1])
    return updated, dropped, skipped


def apply_tag_results_dialog(on_done=None):
    """Pick the AI's JSON reply file and apply its tag choices to the banks."""
    from aqt.qt import QFileDialog
    from aqt.utils import tooltip, showWarning
    path, _ = QFileDialog.getOpenFileName(
        mw, "Apply AI tag results", "",
        "AI results (*.json *.jsonl *.txt);;All files (*)")
    if not path:
        return
    try:
        with open(path, encoding="utf-8") as f:
            raw = f.read()
    except Exception as e:
        showWarning("Could not read file:\n\n%s" % e)
        return
    data = _parse_results(raw)
    if not data:
        showWarning('No {"id": …, "tags": […]} entries found in that file.')
        return
    updated, dropped, skipped = _apply_tag_results(data)
    msg = "Applied tags to %d question(s)." % updated
    if dropped:
        msg += "\n%d tag(s) weren't in your collection and were dropped." % dropped
    if skipped:
        msg += "\n%d entr(y/ies) had unknown question ids and were skipped." % skipped
    tooltip(msg, period=4500)
    if on_done:
        try:
            on_done()
        except Exception:
            pass


# ---------------------------------------------------------------------------
# Convert a .qb into a real Anki deck — portable substrate that syncs to mobile
# and every platform (no add-on needed on the device). One "Practice::<bank>"
# subdeck per bank; a dedicated note type whose BACK is visually identical to the
# FRONT except the correct choice is highlighted blue. Questions carry their
# assigned #Subjects tags, so they interleave/search alongside the real cards.
# Idempotent: re-converting upserts by a stored QID (keeps scheduling history).
# ---------------------------------------------------------------------------
_MODEL_NAME = "Janki Practice"
# Clicking a choice on the FRONT tints the WHOLE card green (correct) / red
# (wrong), and marks the picked choice (plus the correct one, if the pick was
# wrong). The result is stashed in sessionStorage so the BACK/explanation side can
# re-apply the same full-card tint after the flip (a fresh render loses JS state).
# The correct choice carries .jp-correct in the markup (same class the BACK uses
# for its blue highlight), so the handler just reads it. Locks after one pick.
# Inline-style tinting of a choice box (green/red/blue). Set as inline styles so the
# fill is robust to a stale/older note-type CSS (inline beats a non-!important rule).
_JP_TINT_JS = (
    "if(!window.jankiTint){window.jankiTint=function(el,k){if(!el)return;"
    "if(k==='right'){el.style.background='#2f7d52';el.style.borderColor='#3fae72';"
    "el.style.color='#eafff1';}"
    "else if(k==='wrong'){el.style.background='#a33a3a';el.style.borderColor='#d05a5a';"
    "el.style.color='#ffecec';}"
    "else if(k==='blue'){el.style.background='rgba(74,144,255,0.30)';"
    "el.style.borderColor='rgba(74,144,255,0.65)';el.style.color='#dbe8ff';}"
    "el.style.fontWeight='600';};}"
)
# MOBILE only: if every visible choice fits on a single line, bump the choice font a
# little for readability (short A/B/C/D answers look cramped at the base size on a
# phone). Guarded so it never wraps: if the larger size pushes any choice onto a
# second line, it reverts. Desktop (add-on sets jankiPracticeAutoFlip) is untouched.
# Choices keep ONE size on both sides. (The old mobile "bump single-line choices up"
# re-measured on the back, where the collapsed choices changed the result, so the
# answers resized as the explanation appeared.) Kept as a function that only clears
# the class, because existing templates call it.
_JP_SIZE_JS = (
    "if(!window.jankiSizeChoices){window.jankiSizeChoices=function(){"
    "var box=document.getElementById('jp-choices');if(box)box.classList.remove('jp-big');"
    "};}"
)
# Correct answer is stored in the editable {{Answer}} field (a letter A–F, or a
# 1-based number) and rendered into a hidden #jp-answer element. This marks the
# matching choice .jp-correct AT RENDER TIME, so editing the Answer field in Anki's
# note editor (or the Janki editor) changes which choice is right everywhere —
# front tint, back highlight, and grading — with no rebuild. If the field is empty
# (older cards not yet re-converted) the baked .jp-correct class is left as-is.
_JP_ANSWER_JS = (
    "if(!window.jankiMarkCorrect){window.jankiMarkCorrect=function(){"
    "var box=document.getElementById('jp-choices');"
    "var ans=document.getElementById('jp-answer');"
    "if(!box||!ans)return;var v=(ans.textContent||'').trim();if(!v)return;"
    "var cs=box.querySelectorAll('.jp-choice');var idx=-1;"
    "if(/^[A-Za-z]$/.test(v)){idx=v.toUpperCase().charCodeAt(0)-65;}"
    "else{var n=parseInt(v,10);if(!isNaN(n))idx=n-1;}"
    "if(idx<0||idx>=cs.length)return;"
    "for(var i=0;i<cs.length;i++)cs[i].classList.remove('jp-correct');"
    "cs[idx].classList.add('jp-correct');};}"
)
# "Show original slide" toggle: swaps the (possibly mis-parsed) question text/choices
# for the stored source-slide image, as a fallback. The button is baked into the card
# template (so it works on AnkiMobile too) and positioned by CSS — bottom-left on
# desktop, bottom-center on mobile. State persists across cards via sessionStorage;
# stopPropagation so tapping it never flips the card.
_JP_SLIDE_JS = (
    # Before anything renders: re-mark slide mode on <html> from the saved preference.
    "try{if(sessionStorage.getItem('jp_show_slide')==='1')"
    "document.documentElement.classList.add('jp-slide-mode');}catch(_){}"
    "if(!window.jankiApplySlide){"
    "window.jankiApplySlide=function(open){"
    # Render the slide(s) into a single BODY-LEVEL overlay (#jp-slide-ov, position:fixed
    # inset:0) — appended to <body> so it escapes the card's zoom/vh/centering layout
    # entirely. Images are FIT to the viewport (flex-centered, object-fit:contain, no
    # scroll). On the ANSWER side both the question AND answer slides show at once,
    # stacked and each capped to ~half height so both fit without scrolling.
    "var q=document.getElementById('jp-slide');"
    "var a=document.getElementById('jp-ans-slide');"
    "if(!q&&!a)return;"                                 # no slide on this card → no-op
    "var isBack=!!document.querySelector('.jp-answered');"
    "var qi=q?q.querySelector('img'):null;"
    "var ai=a?a.querySelector('img'):null;"
    "if(q)q.style.display='none';if(a)a.style.display='none';"  # only render via overlay
    "var ov=document.getElementById('jp-slide-ov');"
    # Slide MODE also lives on <html> (AnkiMobile rewrites <body>'s classes on every
    # card/reveal, which let the text flash through between renders). With it, CSS hides
    # the text from the very first paint of any card that has a slide.
    "try{document.documentElement.classList.toggle('jp-slide-mode',!!open);}catch(_){}"
    # Closing: fade the overlay out (the text is already revealed underneath it), then hide.
    "if(!open){if(ov&&ov.style.display!=='none'){"
    "ov.className=ov.className.replace(' jp-anim','')+' jp-closing';"
    "clearTimeout(ov._jpct);ov._jpct=setTimeout(function(){"
    "if(!document.documentElement.classList.contains('jp-slide-mode'))ov.style.display='none';"
    "ov.classList.remove('jp-closing');},160);}"
    "document.body.classList.remove('jp-slide-open');}"        # reveal the card text
    "else{"
    # Card with an answer slide → two fixed half-height slots from the FRONT on (the empty
    # bottom slot is reserved), so the question slide keeps its size and place on reveal and
    # only the answer slide fades in. #jp-has-ans marks the answer slide on the front.
    "var two=!!(qi&&(ai||document.getElementById('jp-has-ans')));"
    "var s0=(qi&&qi.src)?qi.src:((!qi&&ai&&ai.src)?ai.src:'');"
    "var s1=(two&&isBack&&ai&&ai.src)?ai.src:'';"
    "var srcs=[];if(s0)srcs.push(s0);if(s1)srcs.push(s1);"
    # Enter slide mode as soon as the card HAS a slide (q||a already checked above) —
    # cover the text with the opaque overlay + hide #qa IMMEDIATELY, even before the
    # image src has resolved. Anki rewrites document.body.className on every card render,
    # wiping jp-slide-open, so we must re-add it here each time; and the image can lag a
    # frame, so we show the overlay first (opaque) and fill/refresh it when srcs arrive.
    "if(!ov){ov=document.createElement('div');ov.id='jp-slide-ov';"
    "document.body.appendChild(ov);}"
    "else if(ov.parentNode!==document.body)document.body.appendChild(ov);"
    "clearTimeout(ov._jpct);"                                  # reopened mid-fade-out
    "var anim=!!window.__jpAnimNext;window.__jpAnimNext=false;"
    "ov.className='jp-slide-ov'+(two?' jp-two':'')+(anim?' jp-anim':'');"
    "document.body.classList.add('jp-slide-open');"          # hide card text NOW
    "ov.style.display='flex';"
    # One slot per slide. A slot whose image changed (next card) fades the old one out and
    # the new one in once loaded; an unchanged slot is left alone (no reload, no fade).
    # The overlay stays opaque, so card text never flashes through between slides.
    "var n=two?2:1;"
    "if(ov._jpn!==n){ov.innerHTML='';for(var k=0;k<n;k++){var sd=document.createElement('div');"
    "sd.className='jp-slot';ov.appendChild(sd);}ov._jpn=n;}"
    # delay: hold this slot's fade-in so the answer fades in AFTER the question when both
    # arrive together (a fresh overlay on the back).
    "var setSlot=function(d,src,delay){if(!d||(d._jpsrc||'')===src)return false;d._jpsrc=src;"
    "var old=d.querySelector('img');"
    "var put=function(){if(d._jpsrc!==src)return;d.innerHTML='';if(!src)return;"
    "var im=document.createElement('img');im.style.opacity='0';"
    "var shown=false,t0=Date.now();var show=function(){if(shown)return;shown=true;"
    "var w=Math.max(0,(delay||0)-(Date.now()-t0));"
    "setTimeout(function(){im.style.opacity='';},w);};"
    "im.onload=show;im.onerror=show;setTimeout(show,400);im.src=src;d.appendChild(im);"
    # Commit opacity 0 now: a cached image can load before the next frame, and without
    # this the browser never sees the 0 and the fade is skipped.
    "try{getComputedStyle(im).opacity;}catch(_){}};"
    "clearTimeout(d._jpft);"
    "if(old&&!anim){old.classList.add('jp-out');d._jpft=setTimeout(put,120);}else put();"
    "return true;};"
    "var q0=s0?setSlot(ov.children[0],s0,0):false;"
    "if(n>1)setSlot(ov.children[1],s1,q0?220:0);"
    # Replay the fade/slide-up in (same jpSlideUp the answer slides + photos use) each
    # time it opens — reflow between animation:none and '' restarts the CSS animation.
    "if(anim){ov.style.animation='none';void ov.offsetWidth;ov.style.animation='';}"
    # Anki re-applies document.body.className a beat AFTER this runs on a fresh card,
    # stripping jp-slide-open (so the text reappeared on subsequent cards). Reassert the
    # class + overlay on the next frames — no animation replay, just re-hide the text.
    "var reOpen=function(){try{if(sessionStorage.getItem('jp_show_slide')!=='1')return;}"
    "catch(_){}document.body.classList.add('jp-slide-open');if(ov)ov.style.display='flex';};"
    "try{requestAnimationFrame(reOpen);}catch(_){}"
    "setTimeout(reOpen,50);setTimeout(reOpen,150);setTimeout(reOpen,400);"
    # If the image wasn't ready yet, re-run shortly so the overlay gets its picture.
    "if(!srcs.length){setTimeout(function(){window.jankiApplySlide(true);},80);"
    "setTimeout(function(){window.jankiApplySlide(true);},250);}}"
    "var btn=document.getElementById('jp-slide-btn');"
    "if(btn)btn.textContent=open?'Show question':'Show original slide';"
    # slide OPEN → keep the button visible; slide closed (desktop) → hover-reveal only
    "try{window.__jpSlideOpen=open;if(btn){var _m=/(mobile|iphone|ipad|ipod|android)/i.test("
    "(document.body&&document.body.className||'')+' '+(document.documentElement&&"
    "document.documentElement.className||''));if(open){btn.style.opacity='0.55';"
    "btn.style.pointerEvents='auto';}else if(!_m){btn.style.opacity='0';"
    "btn.style.pointerEvents='none';}}}catch(_){}"
    # Showing the slide = the parse is untrusted → restore Anki's real Again/Hard/
    # Good/Easy to self-grade; put the binary Continue back in normal mode.
    "try{if(typeof pycmd!=='undefined')pycmd('janki-slide:'+(open?'1':'0'));}catch(_){}};"
    "window.jankiToggleSlide=function(){"
    "var cur=false;try{cur=sessionStorage.getItem('jp_show_slide')==='1';}catch(_){}"
    "var nw=!cur;try{sessionStorage.setItem('jp_show_slide',nw?'1':'0');}catch(_){}"
    "window.__jpAnimNext=nw;window.jankiApplySlide(nw);};"
    "window.jankiSlideInit=function(){"
    # Only when this card has a stored slide (#jp-slide or #jp-ans-slide).
    "var has=!!(document.getElementById('jp-slide')||"
    "document.getElementById('jp-ans-slide'));"
    "var btn=document.getElementById('jp-slide-btn');"
    "if(!has){if(btn&&btn.parentNode)btn.parentNode.removeChild(btn);return;}"
    # Create the button in JS and attach it to <body> (NOT inside #qa/.card): that
    # escapes any transformed ancestor, so position:fixed pins to the real viewport
    # — the reliable way to reach the screen bottom on AnkiMobile. Persists across
    # card renders (it lives outside #qa), so there's never a duplicate.
    "if(!btn){btn=document.createElement('button');btn.id='jp-slide-btn';"
    "btn.type='button';btn.className='jp-slide-btn';document.body.appendChild(btn);}"
    "else if(btn.parentNode!==document.body){document.body.appendChild(btn);}"
    "if(!btn._jpwired){btn._jpwired=true;"
    "var go=function(e){if(e){if(e.preventDefault)e.preventDefault();"
    "if(e.stopPropagation)e.stopPropagation();}window.jankiToggleSlide();};"
    "btn.addEventListener('click',go);btn.addEventListener('touchend',go,{passive:false});}"
    # MOBILE: AnkiMobile/WKWebView often anchors position:fixed to the card content
    # (not the viewport), so the button rides up with a short card. Pin it to the LIVE
    # viewport bottom in document coords via visualViewport, re-placed on scroll/resize.
    "var isMob=/(mobile|iphone|ipad|ipod|android)/i.test("
    "(document.body&&document.body.className||'')+' '+"
    "(document.documentElement&&document.documentElement.className||''));"
    "if(isMob&&!btn._jpmob){btn._jpmob=true;"
    # Measure against the button's REAL containing block (top:0 → its viewport y) instead
    # of assuming document coords: when <body> has a margin/transform, sy+vh overshot the
    # page end, grew the document, and each scroll re-placed it lower — a page that
    # opened scrolled down and kept scrolling on short questions.
    "var place=function(){var vv=window.visualViewport;"
    "var vh=vv?vv.height:window.innerHeight;var voff=vv?vv.offsetTop:0;"
    "btn.style.position='absolute';btn.style.bottom='auto';btn.style.left='50%';"
    "btn.style.transform='translateX(-50%)';btn.style.top='0px';"
    "var r=btn.getBoundingClientRect();"
    "var s=(btn.offsetHeight&&r.height)?r.height/btn.offsetHeight:1;"
    "var t=(voff+vh-r.height-18-r.top)/(s||1);"
    "btn.style.top=Math.max(0,t)+'px';};"
    "btn._jpplace=place;"
    "window.addEventListener('scroll',place,{passive:true});"
    "window.addEventListener('resize',place);"
    "if(window.visualViewport){visualViewport.addEventListener('resize',place);"
    "visualViewport.addEventListener('scroll',place);}"
    "setTimeout(place,0);setTimeout(place,300);}"
    "else if(isMob&&btn._jpplace){setTimeout(btn._jpplace,0);}"
    # DESKTOP: hover-reveal — hide the button until the cursor is near the bottom-left corner
    # (mirrors the reword bar). Mobile keeps it visible (no hover there).
    "if(!isMob){"
    # Force the minimal reword-toggle look INLINE (beats the inherited serif card font without
    # depending on the note-type CSS deploy or a stylesheet override winning specificity).
    "btn.style.fontSize='11px';"
    "btn.style.fontFamily=\"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif\";"
    "if(!btn._jphover){btn._jphover=true;btn.style.opacity='0';btn.style.pointerEvents='none';}"
    "if(!window.__jpSlideHoverBound){window.__jpSlideHoverBound=true;"
    "document.addEventListener('mousemove',function(e){"
    "var b=document.getElementById('jp-slide-btn');if(!b)return;"
    "if(window.__jpSlideOpen){b.style.opacity='0.55';b.style.pointerEvents='auto';return;}"
    "var near=(e.clientX<220&&e.clientY>window.innerHeight-90);"
    "b.style.opacity=near?'0.55':'0';b.style.pointerEvents=near?'auto':'none';});}}"
    "var rem=false;try{rem=sessionStorage.getItem('jp_show_slide')==='1';}catch(_){}"
    "window.jankiApplySlide(rem);};}"
)
_FRONT_JS = (
    "(function(){if(document.querySelector('.jp-answered'))return;"  # back re-runs this; skip it
    "var box=document.getElementById('jp-choices');if(!box)return;"
    + _JP_ANSWER_JS + "window.jankiMarkCorrect();"
    + _JP_SLIDE_JS + "window.jankiSlideInit();"
    # Mobile: a new question starts at the top (AnkiMobile can carry the previous
    # card's scroll offset into the next render).
    "try{if(/(mobile|iphone|ipad|ipod|android)/i.test(document.body.className+' '+"
    "document.documentElement.className))window.scrollTo(0,0);}catch(_){}"
    # Tint a choice box via INLINE styles (not just a class) so the fill shows even
    # when an older/stale note-type CSS is deployed — inline beats a non-!important
    # stylesheet rule, so the box always colours in step with the whole-card tint.
    + _JP_TINT_JS +
    _JP_SIZE_JS +
    "try{sessionStorage.removeItem('jp_result');}catch(e){}"          # fresh question
    "try{sessionStorage.removeItem('jp_pick');}catch(e){}"            # fresh question
    "try{sessionStorage.removeItem('jp_dropped');}catch(e){}"         # remote-mode drop
    "window.__jpRemoteDone=false;"                                     # arm remote setup for this card
    # Drop any remote-mode key handler left over from the previous card (the document
    # persists across reviewer cards, so a stale keydown listener would accumulate).
    "if(window.__jpRemoteKey){document.removeEventListener('keydown',window.__jpRemoteKey,true);"
    "window.__jpRemoteKey=null;}"
    # Drop the previous card's binary-grade Continue key handler (document persists), so
    # Space on this question can't grade the card that just left.
    "if(window.__jpContKey){document.removeEventListener('keydown',window.__jpContKey,true);"
    "window.__jpContKey=null;}"
    "var cs=box.querySelectorAll('.jp-choice');var done=false;"
    "cs.forEach(function(el,idx){el.classList.add('jp-clickable');"
    "var pick=function(){if(done)return;done=true;"
    "box.classList.add('jp-locked');"
    "var ok=el.classList.contains('jp-correct');el.classList.add('jp-picked');"
    "el.classList.add(ok?'jp-right':'jp-wrong');window.jankiTint(el,ok?'right':'wrong');"
    "var card=el.closest('.card')||document.body;"
    # Whole-card fill only on DESKTOP (the add-on sets jankiPracticeAutoFlip). On a
    # full-screen mobile card it becomes a full-screen wash, so there we tint just the
    # answer boxes.
    "if(typeof window.jankiPracticeAutoFlip!=='undefined')"
    "card.classList.add(ok?'jp-fill-right':'jp-fill-wrong');"
    "try{sessionStorage.setItem('jp_result',ok?'right':'wrong');"
    "sessionStorage.setItem('jp_pick',idx);"
    # Binary grading: the pick IS the grade — stash the ease the back's Continue will
    # apply (correct → Easy 4, wrong → jankiPracticeWrongEase, default 2 = Hard).
    "if(window.jankiPracticeBinaryGrade!==false){"
    "sessionStorage.setItem('jp_autoease',ok?4:(window.jankiPracticeWrongEase||2));}"
    # Record the stem's on-screen position at flip time so the back can glide the
    # card from here to its new (re-centred) spot instead of jumping.
    "var _stp=document.querySelector('.jp-stem');"
    "if(_stp)sessionStorage.setItem('jp_stem_top',_stp.getBoundingClientRect().top);}catch(e){}"
    "if(!ok){var r=box.querySelector('.jp-choice.jp-correct');"
    "if(r){r.classList.add('jp-reveal-blue');window.jankiTint(r,'blue');}}"
    # After the pick registers, optionally flip to the back (explanation) so a
    # tap/click both grades AND reveals. Gated on window.jankiPracticeAutoFlip (set
    # by the add-on from config; default ON when unset, so it also works on synced
    # devices). Small delay lets the green/red tint show before the flip.
    # Flip to the back if auto-flip is on OR binary grading is on (binary needs the
    # back so its Continue can grade with the stashed ease).
    "if((window.jankiPracticeAutoFlip!==false||window.jankiPracticeBinaryGrade!==false)"
    "&&typeof pycmd!=='undefined'){"
    "var dly=(typeof window.jankiPracticeFlipDelay==='number')?window.jankiPracticeFlipDelay:600;"
    "setTimeout(function(){try{pycmd('ans');}catch(e){}},dly);}};"
    # Register click (desktop) AND touch (AnkiMobile — a `click` on a plain <div>
    # is unreliable in iOS WebKit, which is why taps 'don't read'). preventDefault
    # on touchend suppresses the synthesized ghost click; the `done` flag guards
    # against any double-fire regardless.
    "el.__jpPick=pick;"                                    # remote/keyboard can trigger it
    "el.addEventListener('click',pick);"
    "el.addEventListener('touchend',function(ev){"
    "if(ev&&ev.cancelable)ev.preventDefault();pick();},false);"
    "});"
    # Remote mode: with a 4-button Anki remote, drop one random WRONG choice so exactly
    # four remain, and let A/B/C/D (or 1/2/3/4) pick them — the button-press runs the
    # SAME pick() as a click, so it visualises identically (box tint + card fill + flip).
    "var setupRemote=function(){"
    "if(window.__jpRemoteDone)return;window.__jpRemoteDone=true;"      # idempotent per card
    "var arr=Array.prototype.slice.call(cs);var wrong=[];"
    "for(var i=0;i<arr.length;i++){if(!arr[i].classList.contains('jp-correct'))wrong.push(i);}"
    # never drop the correct answer; remember which one so the BACK hides the same box
    # (front/back choice indices stay aligned).
    "if(arr.length>4&&wrong.length){var drop=wrong[Math.floor(Math.random()*wrong.length)];"
    "arr[drop].classList.add('jp-dropped');arr[drop].style.display='none';"
    "try{sessionStorage.setItem('jp_dropped',drop);}catch(e){}}"
    # relabel the still-visible choices A,B,C,D and collect them in visible order
    "var vis=[],L=0;for(var j=0;j<arr.length;j++){"
    "if(arr[j].classList.contains('jp-dropped'))continue;"
    "var lt=arr[j].querySelector('.jp-letter');if(lt)lt.textContent=String.fromCharCode(65+L)+'.';"
    "vis.push(arr[j]);L++;}"
    # Hook the add-on calls from Python when a controller/remote face button is
    # pressed (the 8bitdo drives Anki via Python, not DOM keys): pick the n-th
    # visible choice, running the SAME pick() a click/keypress would.
    "window.jankiPickVisible=function(n){if(vis[n]&&vis[n].__jpPick)vis[n].__jpPick();};"
    # A/1 -> 1st visible, B/2 -> 2nd, C/3 -> 3rd, D/4 -> 4th. Question side only (on the
    # back, keys 1-4 must stay Anki's native grading).
    "var onKey=function(ev){if(done)return;"
    "if(document.querySelector('.jp-answered'))return;"
    "var k=(ev.key||'').toLowerCase();var n=-1;"
    "if(k>='1'&&k<='4')n=k.charCodeAt(0)-49;else if(k>='a'&&k<='d')n=k.charCodeAt(0)-97;"
    "if(n<0||n>=vis.length)return;"
    "if(ev.preventDefault)ev.preventDefault();if(ev.stopPropagation)ev.stopPropagation();"
    "if(vis[n].__jpPick)vis[n].__jpPick();};"
    "if(window.__jpRemoteKey)document.removeEventListener('keydown',window.__jpRemoteKey,true);"
    "window.__jpRemoteKey=onKey;document.addEventListener('keydown',onKey,true);};"
    # Expose setupRemote so apply_practice_prefs can call it DIRECTLY (deterministic)
    # once it knows a remote is connected — no longer relying on the poll race below.
    "window.jankiSetupRemote=setupRemote;"
    # The add-on pushes window.jankiPracticeRemoteMode via apply_practice_prefs, which
    # may land a frame or two after this template script runs — so if it's not set yet,
    # poll (up to ~2s) as a fallback. On mobile (flag never set) this just times out.
    "if(window.jankiPracticeRemoteMode===true){setupRemote();}"
    "else if(window.jankiPracticeRemoteMode===undefined){var tr=0;var iv=setInterval(function(){"
    "tr++;if(window.jankiPracticeRemoteMode===true){clearInterval(iv);setupRemote();}"
    "else if(window.jankiPracticeRemoteMode===false||tr>50){clearInterval(iv);}},40);}"
    # Mobile: size up single-line choices once layout settles.
    "if(window.requestAnimationFrame){requestAnimationFrame(function(){"
    "requestAnimationFrame(window.jankiSizeChoices);});}else{setTimeout(window.jankiSizeChoices,60);}"
    "})();"
)
# On the back, re-apply the front pick (the back is a fresh render of FrontSide, so
# the click-applied classes are gone): re-tint the whole card AND re-mark the
# choices. The correct answer always shows green; on a miss the choice you picked
# shows red too, so you see both your answer and the right one.
_BACK_JS = (
    "(function(){"
    + _JP_TINT_JS +
    _JP_SIZE_JS +
    _JP_ANSWER_JS + "window.jankiMarkCorrect();"   # correct from editable {{Answer}}
    + _JP_SLIDE_JS + "window.jankiSlideInit();"
    # Tap helper: bind an action to BOTH touch (AnkiMobile) and click (desktop)
    # without double-firing OR triggering AnkiMobile's tap-to-advance gesture. We
    # swallow touchstart+touchend (preventDefault + stopPropagation) so the tap never
    # reaches Anki's native gesture (which was flipping to the next card); the
    # time-guard drops any ghost click that slips through right after a tap.
    "if(!window.jankiTap){window.jankiTap=function(el,fn){var t=0;"
    "var eat=function(ev){if(ev){if(ev.cancelable)ev.preventDefault();ev.stopPropagation();}};"
    "el.addEventListener('touchstart',eat,{passive:false});"
    "el.addEventListener('touchend',function(ev){eat(ev);t=Date.now();fn();},{passive:false});"
    "el.addEventListener('click',function(ev){if(ev)ev.stopPropagation();"
    "if(Date.now()-t<500)return;fn();});};}"
    # Explanation show/hide toggle (works regardless of whether a choice was
    # clicked, so it's wired before the answer-state check below).
    "var tb=document.getElementById('jp-explain-toggle');"
    "var eb=document.getElementById('jp-explain-body');"
    "var eh=document.querySelector('.jp-explain-h');"
    "if(eb&&!eb.__jkw){eb.__jkw=1;"
    # FLIP: run a layout change (fn) and glide the prompt/answers block (.jp-answered)
    # from its old position to the new one — so when the explanation appears/hides and
    # the (centred) content re-flows, the prompt/answers slide smoothly instead of
    # jumping. No-op when top-aligned (delta 0).
    "var flip=function(fn){var ans=document.querySelector('.jp-answered');"
    "var first=ans?ans.getBoundingClientRect().top:0;fn();"
    "if(ans){var last=ans.getBoundingClientRect().top;var dy=first-last;"
    "if(dy){try{ans.animate([{transform:'translateY('+dy+'px)'},{transform:'translateY(0)'}],"
    "{duration:320,easing:'cubic-bezier(0.645,0.045,0.355,1)'});}catch(e){}}}};"
    "var tog=function(){"
    "var hidden=eb.style.display==='none';"
    "if(hidden){flip(function(){eb.style.display='';});"
    "eb.style.animation='none';void eb.offsetHeight;"
    "eb.style.animation='jpSlideUp .3s ease-out';}"               # slide/fade in
    "else{eb.style.animation='jpSlideDown .25s ease-in forwards';" # slide/fade out
    "setTimeout(function(){flip(function(){eb.style.display='none';});"
    "eb.style.animation='';},240);}"
    "if(tb){tb.textContent=hidden?'\\u2212':'+';"
    "tb.setAttribute('aria-expanded',hidden?'true':'false');}"
    "try{sessionStorage.setItem('jp_show_exp',hidden?'1':'0');}catch(e){}};"  # remember across cards
    # clicking/tapping ANYWHERE in the header row (title or +/- button) toggles it
    "if(eh)window.jankiTap(eh,tog);}"
    # Default show/hide for the explanation: the remembered per-session state if set,
    # else the config default.
    "var showExp;try{var _se=sessionStorage.getItem('jp_show_exp');"
    "showExp=(_se===null)?(window.jankiPracticeShowExplanation!==false):(_se==='1');}"
    "catch(e){showExp=window.jankiPracticeShowExplanation!==false;}"
    "if(eb)eb.style.display=showExp?'':'none';"
    "if(tb){tb.textContent=showExp?'\\u2212':'+';"
    "tb.setAttribute('aria-expanded',showExp?'true':'false');}"
    "var r,pk;try{r=sessionStorage.getItem('jp_result');"
    "pk=parseInt(sessionStorage.getItem('jp_pick'),10);}catch(e){}"
    "if(!r)return;"
    "var card=document.querySelector('.card')||document.body;"
    # Whole-card fill only on DESKTOP (see front) — mobile tints just the boxes.
    "if(typeof window.jankiPracticeAutoFlip!=='undefined')"
    "card.classList.add(r==='right'?'jp-fill-right':'jp-fill-wrong');"
    "var box=document.getElementById('jp-choices');if(!box)return;"
    "box.classList.add('jp-locked');"
    "var cs=box.querySelectorAll('.jp-choice');"
    # Remote mode: hide the SAME wrong choice the front dropped and relabel the visible
    # boxes A,B,C,D so the back matches the four-option front. Keyed off jp_dropped (set
    # by the front only in remote mode) so it's independent of any window-flag race.
    "var _drp=-1;try{_drp=parseInt(sessionStorage.getItem('jp_dropped'),10);}catch(e){}"
    "var _rem=(!isNaN(_drp)&&_drp>=0);"
    "if(_rem&&cs[_drp]){cs[_drp].classList.add('jp-dropped');cs[_drp].style.display='none';}"
    "if(_rem){var _bl=0;for(var _bi=0;_bi<cs.length;_bi++){"
    "if(cs[_bi].classList.contains('jp-dropped'))continue;"
    "var _blt=cs[_bi].querySelector('.jp-letter');"
    "if(_blt)_blt.textContent=String.fromCharCode(65+_bl)+'.';_bl++;}}"
    "var cor=box.querySelector('.jp-choice.jp-correct');"
    # correct answer: green when you got it right, BLUE when you got it wrong
    "if(cor){cor.classList.add(r==='right'?'jp-reveal':'jp-reveal-blue','jp-picked');"
    "window.jankiTint(cor,r==='right'?'right':'blue');}"
    "if(!isNaN(pk)&&cs[pk]){cs[pk].classList.add('jp-picked');" # your pick → green if right, red if wrong
    "cs[pk].classList.add(r==='right'?'jp-right':'jp-wrong');"
    "window.jankiTint(cs[pk],r==='right'?'right':'wrong');}"
    # Collapse/expand helpers (on window so a settings toggle can reuse them). Each
    # measures the element's height so max-height can actually transition (auto→0
    # would snap). Collapse = fade out + shrink; the remaining choices reflow up.
    "if(!window.jankiCollapse){window.jankiCollapse=function(el){"
    "el.style.maxHeight=el.scrollHeight+'px';void el.offsetHeight;"
    "el.classList.add('jp-collapsed');};}"
    "if(!window.jankiExpand){window.jankiExpand=function(el){"
    "el.style.maxHeight='0px';el.classList.remove('jp-collapsed');void el.offsetHeight;"
    "el.style.maxHeight=el.scrollHeight+'px';"
    "setTimeout(function(){if(!el.classList.contains('jp-collapsed'))el.style.maxHeight='';},420);};}"
    # Mark the irrelevant choices (neither your pick nor the correct answer) and add
    # an "Other answers" toggle. Default state from config.
    "var others=[];for(var i=0;i<cs.length;i++){"
    "if(!cs[i].classList.contains('jp-picked')&&!cs[i].classList.contains('jp-dropped')){"
    "cs[i].classList.add('jp-other');others.push(cs[i]);}}"
    # remembered per-session state if set, else the config default
    "var showAll;try{var _sa=sessionStorage.getItem('jp_show_all');"
    "showAll=(_sa===null)?(window.jankiPracticeShowAllAnswers===true):(_sa==='1');}"
    "catch(e){showAll=window.jankiPracticeShowAllAnswers===true;}"
    "if(showAll){box.classList.add('jp-show-others');}"
    # A beat after the back appears, fade the non-relevant out + slide the remaining
    # choices up (animated collapse). The choices sit BELOW the stem, so in the normal
    # top-aligned layout the stem doesn't move — only the answers animate.
    "else{setTimeout(function(){others.forEach(window.jankiCollapse);},220);}"
    "if(others.length&&!document.getElementById('jp-others-toggle')){"
    "var ob=document.createElement('div');ob.className='jp-others-link';"
    "ob.id='jp-others-toggle';ob.setAttribute('role','button');"
    "ob.textContent=showAll?'Hide other answers':'Other answers';"
    "ob.setAttribute('aria-expanded',showAll?'true':'false');"
    "box.parentNode.insertBefore(ob,box.nextSibling);"    # below the visible answers
    "window.jankiTap(ob,function(){"
    "var shown=box.classList.toggle('jp-show-others');"
    "others.forEach(shown?window.jankiExpand:window.jankiCollapse);"
    "ob.textContent=shown?'Hide other answers':'Other answers';"
    "ob.setAttribute('aria-expanded',shown?'true':'false');"
    "try{sessionStorage.setItem('jp_show_all',shown?'1':'0');}catch(e){}});}"  # remember across cards
    # Cross-flip glide: the back's layout (collapsed choices + explanation) centres
    # differently from the front, so the prompt would JUMP on the flip. Start the
    # card at the front's stem position and animate it to its new spot — one smooth
    # move. No-op when top-aligned (delta ~0). Runs after the layout is final.
    "try{var _ft=parseFloat(sessionStorage.getItem('jp_stem_top'));"
    "var _bs=document.querySelector('.jp-stem');"
    "if(!isNaN(_ft)&&_bs){var _dy=_ft-_bs.getBoundingClientRect().top;"
    "if(Math.abs(_dy)>1){var _cd=document.querySelector('.card')||document.body;"
    "try{_cd.animate([{transform:'translateY('+_dy+'px)'},{transform:'translateY(0)'}],"
    "{duration:300,easing:'cubic-bezier(0.645,0.045,0.355,1)'});}catch(e){}}}"
    "sessionStorage.removeItem('jp_stem_top');}catch(e){}"
    # Binary grading: the pick already decided the grade. Add a single Continue that
    # applies the stashed ease (correct→Easy 4, wrong→Hard 2) and advances — the native
    # Again/Hard/Good/Easy buttons are hidden Python-side (see set_practice_bottom_hidden).
    "if(window.jankiPracticeBinaryGrade!==false){window.__jpCont=false;"
    "var _ae=4;try{_ae=parseInt(sessionStorage.getItem('jp_autoease'),10)||4;}catch(e){}"
    "var _ok=0;try{_ok=(sessionStorage.getItem('jp_result')==='right')?1:0;}catch(e){}"
    # Did they actually pick an answer? _FRONT_JS clears jp_result on every fresh
    # question, so an absent value means they revealed/skipped without choosing. In
    # that case Continue BURIES the card (set aside for the session, no judgement)
    # instead of grading it wrong.
    "var _ans=1;try{_ans=(sessionStorage.getItem('jp_result')!=null)?1:0;}catch(e){}"
    # Continue just asks Python to resolve the card; the outcome (grade from the pick,
    # or bury if none) is decided Python-side from the jp-ready report below.
    "window.jankiContinue=function(){if(window.__jpCont)return;window.__jpCont=true;"
    "try{if(typeof pycmd!=='undefined')pycmd('jp-continue');}catch(e){}};"
    # The visible Continue button lives in the bottom bar (a separate webview) so it
    # sits in the space the Again/Hard/Good/Easy buttons occupy — no scrolling. Report
    # the decided grade (and whether answered) to Python so that button can resolve it.
    "try{if(typeof pycmd!=='undefined')pycmd('jp-ready:'+_ae+':'+_ok+':'+_ans);}catch(e){}"
    # DESKTOP (add-on sets jankiPracticeAutoFlip): no judgement comes from the back —
    # the front pick already decided it. Any key that would normally grade on the answer
    # side — Space/Enter AND the ease shortcuts 1/2/3/4 — is captured and routed to
    # Continue instead (capture + preventDefault so Anki's own grade never fires).
    "if(typeof window.jankiPracticeAutoFlip!=='undefined'){"
    "if(window.__jpContKey)document.removeEventListener('keydown',window.__jpContKey,true);"
    "window.__jpContKey=function(ev){var k=ev.key;"
    "if(k===' '||k==='Spacebar'||k==='Enter'||k==='1'||k==='2'||k==='3'||k==='4'){"
    "if(ev.preventDefault)ev.preventDefault();if(ev.stopPropagation)ev.stopPropagation();"
    "window.jankiContinue();}};"
    "document.addEventListener('keydown',window.__jpContKey,true);}"
    # MOBILE has no on-card grade button: AnkiMobile blocks grading a card from card
    # JavaScript, so there's no way to advance/grade from here. On mobile the pick still
    # shows the right/wrong tint + explanation; grading is done with AnkiMobile's own
    # Again/Hard/Good/Easy buttons.
    "}"                                                     # close binary-grade block
    # Mobile: size up single-line choices once the back's collapse layout settles.
    "if(window.requestAnimationFrame){requestAnimationFrame(function(){"
    "requestAnimationFrame(window.jankiSizeChoices);});}else{setTimeout(window.jankiSizeChoices,60);}"
    "})();"
)
_FRONT_TMPL = ('<div class="jp-stem">{{Question}}</div>\n'
               '<div class="jp-choices" id="jp-choices">{{Choices}}</div>\n'
               # Editable correct-answer holder (a letter A–F). Hidden; read by
               # jankiMarkCorrect to mark the right choice. Flows to the back via
               # {{FrontSide}}, so the answer highlight is field-driven too.
               '<div id="jp-answer" style="display:none">{{Answer}}</div>\n'
               # Original-slide fallback: just the hidden slide container. The toggle
               # BUTTON is created by jankiSlideInit and attached to <body> (so it
               # escapes transformed ancestors and position:fixed reaches the real
               # screen bottom, incl. AnkiMobile). Only when a slide exists ({{#Slide}}).
               '{{#Slide}}<div class="jp-slide" id="jp-slide" style="display:none">'
               '{{Slide}}</div>{{/Slide}}\n'
               # Marks "this card has an answer slide" on the FRONT, so slide mode reserves
               # the answer's half of the screen before the reveal.
               '{{#AnsSlide}}<i id="jp-has-ans" style="display:none"></i>{{/AnsSlide}}\n'
               '<script>' + _FRONT_JS + '</script>')
_BACK_TMPL = ('<div class="jp-answered">{{FrontSide}}</div>\n'
              '{{#Explanation}}<div class="jp-explain">'
              '<div class="jp-explain-h">'
              '<span class="jp-explain-title">Explanation / Rationale</span>'
              '<button type="button" class="jp-explain-toggle" '
              'id="jp-explain-toggle" aria-expanded="true">−</button>'
              '</div>'
              '<div class="jp-explain-body" id="jp-explain-body">{{Explanation}}</div>'
              '</div>{{/Explanation}}\n'
              # The original answer/explanation slide, shown on the back for reference
              # (fallback when the parsed rationale is wrong/incomplete). Only when a
              # slide is stored ({{#AnsSlide}}).
              # Answer slide — hidden by default (normal mode shows the TEXT
              # explanation above); revealed only in "slide mode" (the toggle).
              '{{#AnsSlide}}<div class="jp-ans-slide" id="jp-ans-slide" '
              'style="display:none"><div class="jp-ans-slide-h">Answer slide</div>'
              '{{AnsSlide}}</div>{{/AnsSlide}}\n'
              '<script>' + _BACK_JS + '</script>')
# Choice boxes fade/slide in one-by-one on the FRONT (a reveal touch that matches
# the text-scroll); on the BACK (.jp-answered) the animation is disabled so the
# highlighted answer is visible immediately.
_CARD_CSS = (
    ".card{font-family:\"Anthropic Serif Text\",Georgia,serif;font-size:20px;"
    "text-align:left;color:#ececec;background-color:#1c1d21;max-width:760px;"
    "margin:0 auto;padding:26px;transition:background-color .25s ease;}"
    ".jp-stem{margin-bottom:18px;line-height:1.5;"
    "animation:jpSlideUp .35s ease-out both;}"
    # Diagnostic banner on an incomplete-parse card.
    ".jp-incomplete{background:rgba(255,176,32,0.16);border:1px solid "
    "rgba(255,176,32,0.5);color:#ffcf7a;font-size:0.8em;font-weight:600;"
    "padding:6px 10px;border-radius:8px;margin-bottom:12px;}"
    ".jp-answered .jp-stem{animation:none;}"   # don't re-animate on the flip
    # Cap figure height so the choices stay on-screen (scales to fit within both
    # the width and ~40% of the viewport height, keeping aspect ratio).
    ".jp-stem img{display:block;max-width:100%;max-height:40vh;height:auto;"
    "width:auto;object-fit:contain;border-radius:8px;margin:10px auto 0;}"
    ".jp-choice{padding:8px 12px;margin:6px 0;border-radius:8px;"
    "border:1px solid rgba(255,255,255,0.08);overflow:hidden;"
    # transition drives the fade-out + collapse of hidden choices (and the reflow
    # that slides the remaining ones up), plus a quick fade-in of the answer tint
    # (background/border/text colour) instead of it snapping.
    "transition:opacity .3s ease,max-height .35s ease,margin .3s ease,"
    "padding .3s ease,border-width .3s ease,background-color .25s ease,"
    "border-color .25s ease,color .25s ease;}"
    ".jp-letter{font-weight:700;}"   # bold the A./B./C. prefix
    # Mobile single-line choices: a little larger for readability (class added by
    # window.jankiSizeChoices only when every choice fits on one line).
    ".jp-choices.jp-big .jp-choice{font-size:1.09em;}"
    ".jp-answered .jp-choice.jp-correct{background:rgba(74,144,255,0.28);"
    "border-color:rgba(74,144,255,0.6);color:#dbe8ff;font-weight:600;}"
    # Interactive front: clicking a choice tints the WHOLE card fill green
    # (correct) / red (wrong) — the back re-applies the same tint. The picked
    # choice (and the correct one, on a miss) gets a light matching fill so it's
    # still identifiable against the tinted card; no outline/border emphasis.
    ".jp-choice.jp-clickable{cursor:pointer;transition:background-color .2s ease,"
    "border-color .2s ease,color .2s ease;}"
    ".jp-choices:not(.jp-locked) .jp-choice:hover{background:rgba(255,255,255,0.06);}"
    ".jp-locked .jp-choice{cursor:default;}"
    # Picked/revealed choice fills: OPAQUE so the button interior reads clearly
    # against the whole-card green/red tint (a low-alpha wash blended into it and
    # looked like the button wasn't tinting). Matching border reinforces the edge.
    # color is !important too so it beats the back's higher-specificity blue
    # ".jp-answered .jp-choice.jp-correct" rule (green/red must win on the back).
    ".jp-choice.jp-right{background:#2f7d52!important;border-color:#3fae72!important;"
    "color:#eafff1!important;font-weight:600;}"
    ".jp-choice.jp-wrong{background:#a33a3a!important;border-color:#d05a5a!important;"
    "color:#ffecec!important;font-weight:600;}"
    ".jp-choice.jp-reveal{background:#2f7d52!important;border-color:#3fae72!important;"
    "color:#eafff1!important;font-weight:600;}"
    # Correct answer when you were WRONG: highlighted blue (distinct from the red
    # of your own wrong pick, and from the green of a correct pick).
    ".jp-choice.jp-reveal-blue{background:rgba(74,144,255,0.30)!important;"
    "border-color:rgba(74,144,255,0.65)!important;color:#dbe8ff!important;font-weight:600;}"
    ".card.jp-fill-right{background-color:#18271d;}"
    ".card.jp-fill-wrong{background-color:#2b181b;}"
    # Opacity-only (no transform): a translate creates a composited layer whose
    # collapse at animation end repaints the region and re-triggers the AMBOSS
    # underline fade (visible flicker). Fading opacity avoids that entirely.
    "@keyframes jpIn{from{opacity:0;}to{opacity:1;}}"
    # explanation entrance / toggle-in: fade + slide up; toggle-out: fade + slide down
    "@keyframes jpSlideUp{from{opacity:0;transform:translateY(14px);}"
    "to{opacity:1;transform:translateY(0);}}"
    "@keyframes jpSlideDown{from{opacity:1;transform:translateY(0);}"
    "to{opacity:0;transform:translateY(14px);}}"
    ".jp-choices .jp-choice{animation:jpIn .2s ease-out backwards;}"
    ".jp-choices .jp-choice:nth-child(1){animation-delay:.06s;}"
    ".jp-choices .jp-choice:nth-child(2){animation-delay:.13s;}"
    ".jp-choices .jp-choice:nth-child(3){animation-delay:.20s;}"
    ".jp-choices .jp-choice:nth-child(4){animation-delay:.27s;}"
    ".jp-choices .jp-choice:nth-child(5){animation-delay:.34s;}"
    ".jp-choices .jp-choice:nth-child(6){animation-delay:.41s;}"
    ".jp-choices .jp-choice:nth-child(7){animation-delay:.48s;}"
    ".jp-choices .jp-choice:nth-child(8){animation-delay:.55s;}"
    ".jp-answered .jp-choices .jp-choice{animation:none;}"
    # Explanation / rationale at the bottom of the back — fades in (opacity-only,
    # same jpIn keyframe as the choices) a beat after the flip so it eases in
    # rather than snapping.
    ".jp-explain{margin-top:22px;padding-top:16px;line-height:1.5;"
    "border-top:1px solid rgba(255,255,255,0.12);white-space:pre-line;"
    "color:#cfd3da;font-size:0.94em;"
    "animation:jpSlideUp .4s ease-out both;animation-delay:.15s;}"
    # Explanation body text: a bit smaller than the header row, and italicized.
    ".jp-explain-body{font-size:0.86em;font-style:italic;}"
    # the whole header row is clickable to show/hide the explanation
    ".jp-explain-h{display:flex;align-items:center;justify-content:space-between;"
    "font-weight:600;color:#9fb4d8;margin-bottom:8px;cursor:pointer;"
    "letter-spacing:.02em;text-transform:uppercase;font-size:0.78em;}"
    # +/- toggle at the header's top-right to show/hide the explanation body.
    ".jp-explain-toggle{cursor:pointer;flex:0 0 auto;width:22px;height:22px;"
    "padding:0;margin-left:12px;border-radius:6px;text-transform:none;"
    "background:transparent;border:none;outline:none;"
    "color:#cfd3da;font-size:19px;font-weight:700;line-height:1;"
    "display:flex;align-items:center;justify-content:center;}"
    ".jp-explain-toggle:hover{color:#ffffff;}"
    # Irrelevant choices collapse (fade out + slide up) on the back until the
    # "Other answers" toggle reveals them. The collapse itself is driven by JS
    # (max-height measured per element so it can transition); this is the end state.
    ".jp-choice.jp-collapsed{opacity:0;max-height:0!important;"
    "margin-top:0!important;margin-bottom:0!important;padding-top:0!important;"
    "padding-bottom:0!important;border-width:0!important;}"
    # Remote mode: a wrong choice removed to leave four options for a 4-button remote.
    ".jp-choice.jp-dropped{display:none!important;}"
    # Understated text link below the visible answers, aligned to the right edge
    # of the answer box.
    ".jp-others-link{display:block;margin:10px 0 2px;cursor:pointer;"
    "color:#ffffff;opacity:0.7;font-size:0.72em;text-align:right;}"
    ".jp-others-link:hover{opacity:1;text-decoration:underline;}"
    # Binary-grade Continue button (replaces the hidden Again/Hard/Good/Easy row).
    ".jp-continue{display:block;margin:26px auto 6px;max-width:280px;text-align:center;"
    "padding:11px 20px;border-radius:11px;cursor:pointer;font-size:0.9em;font-weight:600;"
    "color:#eafff0;background:rgba(80,200,130,0.16);"
    "border:1px solid rgba(120,230,160,0.5);transition:background .15s,transform .05s;}"
    ".jp-continue:hover{background:rgba(80,200,130,0.28);}"
    ".jp-continue:active{transform:scale(0.98);}"
    # Slide mode = a body-level, full-viewport overlay (#jp-slide-ov, built by
    # jankiApplySlide and appended to <body> so it escapes the card's zoom/vh/centering).
    # Images are FIT to the viewport (flex-centered, object-fit:contain) so the whole
    # slide shows at once with NO scrolling. On the back, both question + answer slides
    # stack (.jp-two) and each is capped to ~half height so both fit without scrolling.
    "#jp-slide-ov{position:fixed;top:0;right:0;bottom:0;left:0;z-index:25;"
    "background:#1c1d21;display:flex;flex-direction:column;align-items:center;"
    "justify-content:center;gap:10px;padding:16px;box-sizing:border-box;}"
    # Fade/slide-up only when the slide is OPENED by the button (.jp-anim) — replaying it
    # on every card in slide mode made each advance blink slide → black → slide.
    "#jp-slide-ov.jp-anim{animation:jpSlideUp .35s ease-out both;}"
    # Phones/tablets: the card is pure OLED black, so the overlay must be too (the desktop
    # #1c1d21 read as a grey panel there).
    ".mobile #jp-slide-ov,.iphone #jp-slide-ov,.ipad #jp-slide-ov,.android #jp-slide-ov"
    "{background:#000!important;justify-content:flex-start!important;"
    "padding-top:max(12px,env(safe-area-inset-top,0px))!important;}"
    # Slots: one fills the overlay; two split it into fixed halves (the answer's half is
    # reserved on the front too), so neither slide resizes or moves on reveal. The image
    # is absolutely fitted inside its slot, which is centred on desktop and top-aligned on phones.
    "#jp-slide-ov .jp-slot{position:relative;flex:1 1 0;min-height:0;width:100%;}"
    "#jp-slide-ov img{position:absolute;top:0;right:0;bottom:0;left:0;margin:auto;"
    "display:block;max-width:100%;max-height:100%;width:auto;height:auto;"
    "object-fit:contain;border-radius:6px;}"
    ".mobile #jp-slide-ov img,.iphone #jp-slide-ov img,.ipad #jp-slide-ov img,"
    ".android #jp-slide-ov img{margin:0 auto auto;}"
    # Two slides: the question slide sits at the top, capped at half the screen by
    # viewport units only (so its size never changes on reveal). Its slot hugs it, and
    # the answer slide sits directly below in the remaining space, not centred in a half
    # of its own. 42px = the overlay's 2x16px padding + 10px gap.
    "#jp-slide-ov.jp-two .jp-slot:first-child{flex:0 0 auto;}"
    "#jp-slide-ov.jp-two .jp-slot:first-child img{position:static;margin:0 auto;"
    "max-height:calc((100vh - 42px) / 2);max-height:calc((100dvh - 42px) / 2);}"
    "#jp-slide-ov.jp-two .jp-slot:last-child img{margin:0 auto auto;}"
    # Quick fades: images in/out between slides, the whole overlay out on close.
    "#jp-slide-ov img{transition:opacity .18s ease-out;}"
    "#jp-slide-ov img.jp-out{opacity:0!important;transition-duration:.12s;}"
    "#jp-slide-ov.jp-closing{opacity:0;transition:opacity .16s ease-out;}"
    # While the overlay is open, hide the card text behind it (the overlay lives on
    # <body>, so hiding #qa is safe and guarantees nothing bleeds through).
    "body.jp-slide-open #qa{visibility:hidden!important;}"
    "html.jp-slide-mode body:has(#jp-slide) #qa,"
    "html.jp-slide-mode body:has(#jp-ans-slide) #qa{visibility:hidden!important;}"
    # AnkiMobile doesn't necessarily put the card in #qa — so in slide mode hide EVERYTHING
    # on the page except the slide overlay + its button (the overlay fades in, and the text
    # showed through it until it was opaque).
    # (mobile only — desktop keeps its body-level UI such as the card timer)
    "body.jp-slide-open:is(.mobile,.iphone,.ipad,.android)>:not(#jp-slide-ov):not(.jp-slide-btn):not(script):not(style),"
    "html:is(.mobile,.iphone,.ipad,.android) body.jp-slide-open>:not(#jp-slide-ov):not(.jp-slide-btn):not(script):not(style),"
    "html.jp-slide-mode body:is(.mobile,.iphone,.ipad,.android):is(:has(#jp-slide),:has(#jp-ans-slide))>:not(#jp-slide-ov):not(.jp-slide-btn):not(script):not(style),"
    "html.jp-slide-mode:is(.mobile,.iphone,.ipad,.android) body:is(:has(#jp-slide),:has(#jp-ans-slide))>:not(#jp-slide-ov):not(.jp-slide-btn):not(script):not(style)"
    "{visibility:hidden!important;}"
    # Original-slide fallback button: pinned bottom-left on desktop (low, just above
    # the bottom bar), and bottom-CENTER on mobile (AnkiMobile has no such bar).
    # Minimal chrome to match the reword toggle: small, subtle grey, sans (this button lives on
    # <body>, so without an explicit family it'd inherit the serif card font).
    ".jp-slide-btn{position:fixed;left:10px;bottom:0;z-index:30;cursor:pointer;"
    "font-size:11px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;"
    "color:#9fb4d8;opacity:0.55;background:rgba(28,29,33,0.7);"
    "border:1px solid rgba(255,255,255,0.2);border-radius:6px;padding:3px 9px;"
    "transition:opacity .15s;}"
    ".jp-slide-btn:hover{opacity:1;color:#fff;}"
    ".mobile .jp-slide-btn,.iphone .jp-slide-btn,.ipad .jp-slide-btn,"
    ".android .jp-slide-btn{left:50%;right:auto;"
    "bottom:calc(env(safe-area-inset-bottom, 0px) + 12px);"
    "transform:translateX(-50%);font-size:13px;padding:5px 12px;}"
    # Phones: the mobile theme (mobilecards) vertically centres every card (#qa margin
    # auto inside a full-height body). A practice question should start at the TOP. Only
    # #qa's margins change: the body keeps its full height, because the theme sets
    # overflow:hidden on a card that fits, and a shorter body clipped the
    # bottom-pinned "Show original slide" button. Practice note type only.
    "html:is(.mobile,.iphone,.ios,.ipad,.android) body #qa"
    "{margin-top:0!important;margin-bottom:0!important;}"
    ".jp-slide img{display:block;max-width:100%;max-height:80vh;height:auto;"
    "width:auto;margin:0 auto;border-radius:8px;}"
    # Answer/explanation slide shown on the back.
    ".jp-ans-slide{margin-top:22px;padding-top:16px;"
    "border-top:1px solid rgba(255,255,255,0.12);"
    "animation:jpSlideUp .4s ease-out both;animation-delay:.15s;}"
    ".jp-ans-slide-h{font-weight:600;color:#9fb4d8;margin-bottom:8px;"
    "letter-spacing:.02em;text-transform:uppercase;font-size:0.78em;}"
    ".jp-ans-slide img{display:block;max-width:100%;max-height:70vh;height:auto;"
    "width:auto;margin:0 auto;border-radius:8px;}"
    # Phone-width screens: shrink the answer + rationale text so the card isn't
    # crowded (a bit tighter choice padding too).
    "@media (max-width:520px){"
    ".jp-choice{font-size:0.82em;padding:7px 10px;}"
    ".jp-explain-body{font-size:0.78em;}"
    "}"
)


# Blocks other Janki features stamp INTO note types (mobile theming, mobile rephrase).
# They're not part of the Practice template itself, so ignore them when checking for
# drift and keep them when refreshing — otherwise every launch "found a difference",
# rewrote the note type (a ~0.5s update_dict on the startup path) and stripped the
# mobile styling off Practice cards.
_INJECTED_RES = [
    re.compile(r"(?s)\s*<!--janki-mobile-start-->.*?<!--janki-mobile-end-->"),
    re.compile(r"(?s)\s*/\*janki-mobile-start\*/.*?/\*janki-mobile-end\*/"),
    re.compile(r"(?s)\s*<!-- janki-reword:start -->.*?<!-- janki-reword:end -->"),
]


def _split_injected(text):
    """(text without Janki-injected blocks, [the injected blocks in order])."""
    text = text or ""
    blocks = []
    for rx in _INJECTED_RES:
        blocks += rx.findall(text)
        text = rx.sub("", text)
    return text.rstrip(), blocks


def _sync_part(cur, want):
    """Return (new_value, changed) for one CSS/template string, preserving injected
    blocks and ignoring them (plus trailing whitespace) in the comparison."""
    base, blocks = _split_injected(cur)
    if base == want.rstrip():
        return cur, False
    return want + "".join(blocks), True


def _ensure_model():
    mm = mw.col.models
    m = mm.by_name(_MODEL_NAME)
    if m:
        # Keep CSS/template in sync with the current add-on version (so template
        # changes like the choice-reveal animation reach already-converted decks).
        changed = False
        why = []
        m["css"], c = _sync_part(m.get("css"), _CARD_CSS)
        if c:
            changed = True
            why.append("css")
        # Migrate: add fields introduced after this deck was built (Answer, the
        # slide number, and the slide image) so older Practice decks gain them.
        try:
            have = {f.get("name") for f in m.get("flds", [])}
            for fld in ("Answer", "SlideNo", "Slide", "AnsSlide"):
                if fld not in have:
                    mm.add_field(m, mm.new_field(fld))
                    changed = True
                    why.append("field " + fld)
        except Exception:
            pass
        try:
            t = m["tmpls"][0]
            t["qfmt"], cq = _sync_part(t.get("qfmt"), _FRONT_TMPL)
            t["afmt"], ca = _sync_part(t.get("afmt"), _BACK_TMPL)
            if cq or ca:
                changed = True
                why.append("template")
        except Exception:
            pass
        try:
            from ..util import boot_timing
            boot_timing.mark("practice sync: %s" % (", ".join(why) or "no change"))
        except Exception:
            pass
        if changed:
            try:
                mm.update_dict(m)
            except Exception:
                try:
                    mm.save(m)
                except Exception:
                    pass
        return m
    m = mm.new(_MODEL_NAME)
    for f in ("Question", "Choices", "Answer", "Explanation",
              "SlideNo", "Slide", "AnsSlide", "QID"):
        mm.add_field(m, mm.new_field(f))
    t = mm.new_template("Practice")
    t["qfmt"] = _FRONT_TMPL
    t["afmt"] = _BACK_TMPL
    mm.add_template(m, t)
    m["css"] = _CARD_CSS
    mm.add(m)
    return m


def enforce_slide_btn_style():
    """Force the 'Show original slide' button to the minimal reword-toggle look by setting its
    font INLINE with !important on the live element — beats any stylesheet rule and doesn't depend
    on the note-type template/CSS (which is baked into the model and can lag the add-on). The
    button is created by the template's jankiSlideInit and persists on <body>; retry briefly in
    case it isn't in the DOM yet. Called from reviewer_did_show_question/answer (fires for
    practice cards)."""
    try:
        import json as _json
        # The reword toggle inherits the card font stack (#qa * → ui_font_stack); match it so the
        # two buttons use the SAME font. Fall back to a system sans if that lookup fails.
        try:
            from ..user.css import ui_font_stack
            from ..util.config import _cfg
            _font = ui_font_stack(_cfg())
            _zoom = float(_cfg().get("card_zoom", 1.0))    # #qa carries this; body button doesn't
        except Exception:
            _font = "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
            _zoom = 1.0
        fj = _json.dumps(_font)                     # safe JS string literal (escapes the quotes)
        mw.web.eval(
            "(function(){function f(){var b=document.getElementById('jp-slide-btn');if(!b)return;"
            "b.style.setProperty('font-size','11px','important');"
            "b.style.setProperty('font-family'," + fj + ",'important');"
            # match the reword toggle's box exactly (rounding/border/padding), overriding whatever
            # the note-type CSS deployed
            "b.style.setProperty('border-radius','6px','important');"
            "b.style.setProperty('border','1px solid rgba(255,255,255,0.2)','important');"
            "b.style.setProperty('padding','3px 9px','important');"
            "b.style.setProperty('background','rgba(28,29,33,0.7)','important');"
            # strip native <button> metrics so its height matches the reword <div> exactly
            "b.style.setProperty('-webkit-appearance','none','important');"
            "b.style.setProperty('appearance','none','important');"
            "b.style.setProperty('box-sizing','content-box','important');"
            "b.style.setProperty('line-height','normal','important');"
            "b.style.setProperty('margin','0','important');"
            "b.style.setProperty('min-height','0','important');"
            # match the card zoom the reword button gets from #qa{zoom:z} so the sizes agree
            "b.style.setProperty('zoom','" + ("%g" % _zoom) + "','important');"
            # font color = the reword toggle's muted blue-grey (match the deck reword button)
            "b.style.setProperty('color','#9fb4d8','important');"
            # white hover, like the reword buttons (must use !important to beat the base color;
            # opacity stays non-important so the hover-reveal mousemove can still hide the button)
            "b.onmouseenter=function(){this.style.setProperty('color','#fff','important');"
            "this.style.opacity='1';};"
            "b.onmouseleave=function(){this.style.setProperty('color','#9fb4d8','important');"
            "this.style.opacity='0.55';};}"
            "f();setTimeout(f,120);setTimeout(f,400);})();")
    except Exception:
        pass


def apply_practice_prefs(persist=False):
    """Push the Practice card preferences into the reviewer webview as window flags
    the templates read: click-to-flip, and the default show/hide of the explanation
    and 'other answers'. Called on each question render (so a change applies to the
    next card) and on a settings toggle — where it ALSO updates the currently shown
    back immediately (no-op on the front).

    The explanation/'other answers' show-hide state is remembered per session in
    sessionStorage so it carries between cards. persist=True (a settings toggle)
    rewrites that remembered state from config, so an explicit settings change wins
    over whatever was toggled on a card; the per-render call leaves it untouched."""
    web = getattr(mw, "web", None)
    if web is None:
        return
    # Clear the resolver's per-card latch each render so a card that legitimately
    # returns later this session can be resolved again (see css._jp_resolve).
    try:
        mw._janki_last_resolved = None
        mw._janki_slide_fallback = False   # slide fallback is per-card; reset each render
    except Exception:
        pass
    try:
        from ..util.config import _cfg
        c = _cfg()
        flip = "true" if bool(c.get("practice_click_flips", True)) else "false"
        delay = int(c.get("practice_click_flip_delay_ms", 600))
        show_all = "true" if bool(c.get("practice_show_all_answers", False)) else "false"
        show_exp = "true" if bool(c.get("practice_show_explanation", True)) else "false"
        # Remote mode is live: on only when the setting is checked AND a controller/
        # remote is actually connected right now (so unplugging it drops back to the
        # full choice set on the next card — no deck rebuild). Re-evaluated per render.
        remote_on = bool(c.get("practice_remote_mode", False))
        if remote_on:
            try:
                from . import gamepad
                remote_on = gamepad.is_controller_connected()
            except Exception:
                remote_on = False
        remote = "true" if remote_on else "false"
        # Binary grading: picking an answer IS the grade — correct → Easy (4),
        # wrong → practice_wrong_ease (default 2 = Hard). The native Again/Hard/Good/
        # Easy buttons are hidden and replaced by a single Continue on the back.
        binary = "true" if bool(c.get("practice_binary_grade", True)) else "false"
        wrong_ease = int(c.get("practice_wrong_ease", 2))
        remember = (
            "try{sessionStorage.setItem('jp_show_exp',%s?'1':'0');"
            "sessionStorage.setItem('jp_show_all',%s?'1':'0');}catch(e){}"
            % (show_exp, show_all)) if persist else ""
        # NOTE: build the full template string FIRST, then apply % — otherwise Python's
        # operator precedence (% binds tighter than +) would apply the format only to
        # the fragment after "+ remember +", raising "not all arguments converted" and
        # (silently, via the except below) leaving the window.jankiPractice* flags
        # unset — which is exactly what stopped remote mode from ever activating.
        tmpl = (
            "window.jankiPracticeAutoFlip=%s;window.jankiPracticeFlipDelay=%d;"
            "window.jankiPracticeRemoteMode=%s;"
            "window.jankiPracticeBinaryGrade=%s;window.jankiPracticeWrongEase=%d;"
            # Deterministic activation: the moment we know a remote is connected, run
            # setupRemote() directly (the front template exposes it) instead of waiting
            # on its poll — this is what drops to 4 choices and defines jankiPickVisible.
            "if(%s===true&&window.jankiSetupRemote){window.jankiSetupRemote();}"
            "window.jankiPracticeShowAllAnswers=%s;window.jankiPracticeShowExplanation=%s;"
            + remember +
            # Apply to the current back right away (all getElementById are no-ops on
            # the front / a non-practice card).
            "(function(){var eb=document.getElementById('jp-explain-body'),"
            "tb=document.getElementById('jp-explain-toggle');"
            "if(eb)eb.style.display=%s?'':'none';"
            "if(tb)tb.textContent=%s?'\\u2212':'+';"
            "var box=document.getElementById('jp-choices');"
            "if(box){var oth=box.querySelectorAll('.jp-choice.jp-other');var i;"
            "if(%s){box.classList.add('jp-show-others');"
            "if(window.jankiExpand)for(i=0;i<oth.length;i++)window.jankiExpand(oth[i]);}"
            "else{box.classList.remove('jp-show-others');"
            "if(window.jankiCollapse)for(i=0;i<oth.length;i++)window.jankiCollapse(oth[i]);}}"
            "var ob=document.getElementById('jp-others-toggle');"
            "if(ob)ob.textContent=%s?'Hide other answers':'Other answers';})();"
        )
        js = tmpl % (flip, delay, remote, binary, wrong_ease, remote, show_all, show_exp,
                     show_exp, show_exp, show_all, show_all)
        web.eval(js)
    except Exception as e:
        log("practice prefs: %s" % e)


# --- Contanki hand-off -------------------------------------------------------
# The Contanki add-on reads the SAME physical controller (via the browser Gamepad
# API in its own webview) and, while Anki is focused, grades Again/Hard/Good/Easy
# on the four face buttons — the very buttons Janki drives for remote practice.
# That double-fires (Janki grades AND Contanki grades). To let Janki fully own the
# remote on a practice card, suspend Contanki while such a card is up (in remote
# mode) and resume it everywhere else. Janki's own input is IOKit HID, independent
# of Contanki's webview, so suspending Contanki never affects Janki.
_contanki_suspended_by_us = False


def _practice_card_active():
    """True if the reviewer is currently on a Janki Practice card AND remote mode is
    live (setting on + a controller actually connected)."""
    try:
        from ..util.config import _cfg
        if not _cfg().get("practice_remote_mode", False):
            return False
        from . import gamepad
        if not gamepad.is_controller_connected():
            return False
        r = getattr(mw, "reviewer", None)
        card = getattr(r, "card", None) if r else None
        if card is None:
            return False
        nt = card.note_type() or {}
        return nt.get("name") == _MODEL_NAME
    except Exception:
        return False


def sync_contanki_for_card():
    """Suspend Contanki while a Janki Practice card is up in remote mode (so it can't
    double-grade the four face buttons), and resume it on any other card. No-op if
    Contanki isn't installed. Called on each question/answer render."""
    global _contanki_suspended_by_us
    con = getattr(mw, "contanki", None)
    if con is None:
        return
    want_suspend = _practice_card_active()
    try:
        if want_suspend and not _contanki_suspended_by_us:
            con.suspend()
            _contanki_suspended_by_us = True
            log("contanki suspended for practice card")
        elif not want_suspend and _contanki_suspended_by_us:
            con.resume()
            _contanki_suspended_by_us = False
            log("contanki resumed")
    except Exception as e:
        log("contanki sync: %s" % e)


def resume_contanki():
    """Force-resume Contanki if Janki suspended it (call when leaving the reviewer, so
    it never gets stuck suspended)."""
    global _contanki_suspended_by_us
    con = getattr(mw, "contanki", None)
    if con is not None and _contanki_suspended_by_us:
        try:
            con.resume()
        except Exception as e:
            log("contanki resume: %s" % e)
    _contanki_suspended_by_us = False


def set_practice_bottom_hidden(hide):
    """Hide/show Anki's native Again/Hard/Good/Easy buttons (they carry data-ease) in
    the bottom bar — used by binary-grade practice so the pick is the only grade."""
    bw = getattr(mw, "bottomWeb", None)
    if bw is None:
        return
    try:
        if hide:
            bw.eval("(function(){"
                    # Hide the native Again/Hard/Good/Easy buttons.
                    "var s=document.getElementById('jp-hide-ease');"
                    "if(!s){s=document.createElement('style');s.id='jp-hide-ease';"
                    "s.textContent='button[data-ease]{display:none!important;}';"
                    "(document.head||document.documentElement).appendChild(s);}"
                    # Drop a single Continue button into the same row the ease buttons
                    # sat in, so it occupies that space and needs no scrolling. Clicking
                    # it pycmds jp-continue; Python applies the stashed grade.
                    "if(!document.getElementById('jp-continue-style')){"
                    "var cs=document.createElement('style');cs.id='jp-continue-style';"
                    "cs.textContent='#jp-continue-bar{display:block;margin:0 auto;padding:8px 30px;"
                    "min-width:220px;font-size:15px;font-weight:600;color:#8ff0b0;cursor:pointer;"
                    "border:1px solid rgba(80,200,130,0.55);border-radius:9px;"
                    "background:rgba(80,200,130,0.16);}"
                    "#jp-continue-bar:hover{background:rgba(80,200,130,0.28);}"
                    "#jp-continue-bar:active{transform:scale(0.98);}';"
                    "(document.head||document.documentElement).appendChild(cs);}"
                    "if(!document.getElementById('jp-continue-bar')){"
                    "var b=document.createElement('button');b.id='jp-continue-bar';"
                    "b.textContent='Continue \\u2192';"
                    "b.onclick=function(){try{pycmd('jp-continue');}catch(e){}};"
                    "var ref=document.querySelector('button[data-ease]');"
                    "var host=(ref&&ref.parentNode)||document.getElementById('outer')||document.body;"
                    "host.appendChild(b);}"
                    "})();")
        else:
            bw.eval("(function(){var s=document.getElementById('jp-hide-ease');"
                    "if(s)s.parentNode.removeChild(s);"
                    "var b=document.getElementById('jp-continue-bar');"
                    "if(b)b.parentNode.removeChild(b);})();")
    except Exception as e:
        log("practice bottom hide: %s" % e)


def sync_practice_bottom():
    """Hide the native ease buttons only while a binary-grade Janki Practice card shows
    its answer; restore them otherwise. Called on each question/answer render."""
    try:
        from ..util.config import _cfg
        want_hide = False
        if bool(_cfg().get("practice_binary_grade", True)):
            r = getattr(mw, "reviewer", None)
            card = getattr(r, "card", None) if r else None
            if (card is not None
                    and (card.note_type() or {}).get("name") == _MODEL_NAME
                    and getattr(r, "state", None) == "answer"):
                want_hide = True
        set_practice_bottom_hidden(want_hide)
    except Exception:
        pass


def cleanup_slide_button_if_not_practice():
    """The slide toggle is attached to <body>, so on desktop (where the card webview
    persists across cards) it would linger onto a non-practice card — whose template
    JS never runs to remove it. Strip it here when the current card isn't a Janki
    Practice card. (Practice cards manage it themselves via jankiSlideInit; AnkiMobile
    reloads per card so it's a non-issue there.)"""
    web = getattr(mw, "web", None)
    if web is None:
        return
    try:
        r = getattr(mw, "reviewer", None)
        card = getattr(r, "card", None) if r else None
        is_practice = (card is not None
                       and (card.note_type() or {}).get("name") == _MODEL_NAME)
        if not is_practice:
            web.eval("(function(){var b=document.getElementById('jp-slide-btn');"
                     "if(b&&b.parentNode)b.parentNode.removeChild(b);})();")
    except Exception:
        pass


def sync_practice_model_if_present():
    """Refresh the Janki Practice note type's CSS/template to the current add-on
    version IF it already exists — so styling fixes (e.g. the opaque picked-choice
    fill) reach already-converted decks on launch, without a manual re-convert.
    Does nothing for users who never built a Practice deck (no model to update)."""
    try:
        if mw.col.models.by_name(_MODEL_NAME):
            _ensure_model()
    except Exception as e:
        log("practice model sync: %s" % e)


def _answer_letter(q):
    """The correct choice as a letter (A–F) for the editable Answer field, or ""."""
    ch = q.get("choices") or []
    ci = _correct_index(q)
    return chr(65 + ci) if 0 <= ci < len(ch) else ""


def _slide_html(q, dir_name):
    """`<img>` for the question's stored source slide, added to the collection's
    media so it shows in Anki's note editor (the Slide field). "" if none stored.
    Not placed on the card template — this is a reference image for the editor."""
    return _media_img_field(q.get("slide"), dir_name)


def _ans_slide_html(q, dir_name):
    """`<img>` for the answer/explanation slide, shown on the back. "" if none."""
    return _media_img_field(q.get("ans_slide"), dir_name)


def _media_img_field(name, dir_name):
    if not name:
        return ""
    src = os.path.join(_qbanks_dir(), dir_name, "media", name)
    if not os.path.isfile(src):
        return ""
    try:
        fn = mw.col.media.add_file(src)
        return '<img src="%s">' % fn
    except Exception:
        return ""


def _choices_html(q):
    from html import escape
    ch = q.get("choices") or []
    ci = _correct_index(q)
    rows = []
    for j, c in enumerate(ch):
        cls = "jp-choice jp-correct" if j == ci else "jp-choice"
        rows.append('<div class="%s"><span class="jp-letter">%s.</span> %s</div>'
                    % (cls, chr(65 + j), escape(_plain(c))))
    return "\n".join(rows)


def _locate_by_qid(qid):
    """Find the bank question behind a Practice card's QID (bid_ordinal). Returns
    (bid, dir_name, qs_list, index) or None. `qs_list` is the live cached list, so
    mutating qs_list[index] and calling _rewrite_bank persists the edit."""
    if not qid:
        return None
    for bid, meta in list_banks().items():
        dir_name = meta.get("dir", "")
        qs = _bank_questions(dir_name)
        ordinal = 0
        for i, q in enumerate(qs):
            if not isinstance(q, dict):
                continue
            if not q.get("stem") and not q.get("incomplete"):
                continue
            ordinal += 1
            if _safe("%s_%d" % (bid, ordinal)) == qid:
                return bid, dir_name, qs, i
    return None


def edit_question_dialog(card=None, on_done=None):
    """View the original slide and edit a practice card's stem / choices / correct
    answer / explanation on the user end. Writes back to the .qb bank (so it
    survives rebuilds) AND updates the live Anki card. Operates on the current
    reviewer card by default."""
    from aqt.qt import (Qt, QDialog, QVBoxLayout, QHBoxLayout, QLabel, QLineEdit,
                        QPlainTextEdit, QPushButton, QRadioButton, QButtonGroup,
                        QScrollArea, QWidget, QPixmap)
    from aqt.utils import tooltip, showWarning
    r = getattr(mw, "reviewer", None)
    card = card or (getattr(r, "card", None) if r else None)
    if card is None:
        tooltip("Open a practice card in the reviewer first.")
        return
    try:
        note = card.note()
        if (note.note_type() or {}).get("name") != _MODEL_NAME:
            tooltip("This isn't a Janki practice card.")
            return
    except Exception:
        return
    qid = note["QID"] if "QID" in note else ""
    loc = _locate_by_qid(qid)
    if not loc:
        showWarning("Couldn't find this card's source question in any imported "
                    "bank (it may have been added manually or its bank removed).")
        return
    bid, dir_name, qs, idx = loc
    q = qs[idx]

    dlg = QDialog(mw)
    dlg.setWindowTitle("Edit practice question")
    dlg.setMinimumWidth(660)
    v = QVBoxLayout(dlg)

    # Original slide (stored on newer imports) — shown for comparison.
    slide_name = q.get("slide") or next(iter(q.get("media") or []), None)
    img_path = None
    if slide_name:
        p = os.path.join(_qbanks_dir(), dir_name, "media", slide_name)
        if os.path.isfile(p):
            img_path = p
    if img_path:
        _sn = q.get("slide_no")
        v.addWidget(QLabel("Original slide%s:"
                           % ((" (slide %s)" % _sn) if _sn else "")))
        scroll = QScrollArea()
        scroll.setWidgetResizable(True)
        scroll.setMinimumHeight(260)
        lbl = QLabel()
        pm = QPixmap(img_path)
        if not pm.isNull():
            lbl.setPixmap(pm.scaledToWidth(
                620, Qt.TransformationMode.SmoothTransformation))
        lbl.setAlignment(Qt.AlignmentFlag.AlignCenter)
        scroll.setWidget(lbl)
        v.addWidget(scroll)
    else:
        hint = QLabel("No original slide stored for this card. Newer imports keep "
                      "the source slide — re-import this bank to view it here.")
        hint.setWordWrap(True)
        hint.setStyleSheet("color: gray;")
        v.addWidget(hint)

    v.addWidget(QLabel("Question:"))
    stem_edit = QPlainTextEdit(_plain(q.get("stem", "")))
    stem_edit.setFixedHeight(84)
    v.addWidget(stem_edit)

    v.addWidget(QLabel("Choices — select the correct one (clear a box to remove it):"))
    grp = QButtonGroup(dlg)
    rows_host = QWidget()
    rows_v = QVBoxLayout(rows_host)
    rows_v.setContentsMargins(0, 0, 0, 0)
    rows = []                       # (radio, line_edit) in display order
    ci = _correct_index(q)

    def _add_row(text="", correct=False):
        rb = QRadioButton()
        grp.addButton(rb)
        le = QLineEdit(text)
        rb.setChecked(correct)
        row = QHBoxLayout()
        row.addWidget(rb)
        row.addWidget(le)
        w = QWidget()
        w.setLayout(row)
        rows_v.addWidget(w)
        rows.append((rb, le))

    for j, c in enumerate(q.get("choices") or []):
        _add_row(_plain(c), j == ci)
    if not rows:
        _add_row("", True)
    v.addWidget(rows_host)

    add_btn = QPushButton("+ Add choice")
    add_btn.clicked.connect(lambda: _add_row("", False))
    v.addWidget(add_btn)

    v.addWidget(QLabel("Explanation / rationale:"))
    exp_edit = QPlainTextEdit(_plain(q.get("explanation", "")))
    exp_edit.setFixedHeight(90)
    v.addWidget(exp_edit)

    btns = QHBoxLayout()
    btns.addStretch()
    cancel = QPushButton("Cancel")
    cancel.clicked.connect(dlg.reject)
    save = QPushButton("Save")
    save.setDefault(True)
    btns.addWidget(cancel)
    btns.addWidget(save)
    v.addLayout(btns)

    def _save():
        # Keep non-empty choices in order; the correct index is the checked row's
        # position among the kept choices.
        kept, correct_idx = [], None
        for rb, le in rows:
            t = le.text().strip()
            if not t:
                continue
            if rb.isChecked():
                correct_idx = len(kept)
            kept.append(t)
        q["stem"] = stem_edit.toPlainText().strip()
        q["choices"] = kept
        q["answer"] = correct_idx
        q["explanation"] = exp_edit.toPlainText().strip()
        # Resolved a previously-incomplete card?
        if q.get("incomplete") and q["stem"] and len(kept) >= 2 and correct_idx is not None:
            q.pop("incomplete", None)
            q.pop("figure_only", None)     # it's a real MCQ now, not a raw screenshot
        _rewrite_bank(dir_name, qs)
        # Push the edit onto the live Anki card.
        try:
            note["Question"] = _stem_html(q, dir_name)
            note["Choices"] = _choices_html(q)
            if "Answer" in note:
                note["Answer"] = _answer_letter(q)
            if "SlideNo" in note:
                note["SlideNo"] = str(q.get("slide_no") or "")
            if "Slide" in note:
                note["Slide"] = _slide_html(q, dir_name)
            if "AnsSlide" in note:
                note["AnsSlide"] = _ans_slide_html(q, dir_name)
            note["Explanation"] = _plain(q.get("explanation", ""))
            if not q.get("incomplete") and _INCOMPLETE_TAG in note.tags:
                note.tags = [t for t in note.tags if t != _INCOMPLETE_TAG]
            mw.col.update_note(note)
        except Exception as e:
            log("edit question note update: %s" % e)
        # Re-render if it's the card currently on screen.
        try:
            if r is not None and getattr(r, "card", None) is not None \
                    and r.card.nid == note.id:
                r.card.load()
                if getattr(r, "state", None) == "answer":
                    r._showAnswer()
                else:
                    r._showQuestion()
        except Exception:
            pass
        tooltip("Saved. The card and its bank were updated.")
        dlg.accept()
        if on_done:
            try:
                on_done()
            except Exception:
                pass

    save.clicked.connect(_save)
    dlg.exec()


def _stem_html(q, dir_name):
    from html import escape
    # figure_only: the question (stem + figure) lives in the screenshot, so show
    # just the image — the OCR'd stem is garbled figure/table text.
    html = "" if q.get("figure_only") else escape(_plain(q.get("stem", "")))
    if q.get("incomplete"):
        # An imported-for-diagnosis card: banner + always show the raw stem text
        # and the original slide image so the parse can be inspected/fixed.
        html = ('<div class="jp-incomplete">⚠ Incomplete parse — %s</div>'
                % escape(_plain(q.get("incomplete")))
                + escape(_plain(q.get("stem", ""))))
    for name in (q.get("media") or []):
        src = os.path.join(_qbanks_dir(), dir_name, "media", name)
        if os.path.isfile(src):
            try:
                fn = mw.col.media.add_file(src)
                html += '<div><img src="%s"></div>' % fn
            except Exception:
                pass
    return html


_INCOMPLETE_TAG = "Practice::Incomplete"


def _theme_tag(lecture):
    """The section/theme title (e.g. a "Glycogen Metabolism" title slide) as an
    Anki tag: spaces → underscores (Anki splits tags on spaces), grouped under a
    'Practice::' root so all theme tags sit together in the tag sidebar. None if
    the question has no theme."""
    t = re.sub(r"\s+", "_", (lecture or "").strip()).strip("_")
    return "Practice::" + t if t else None


_PRACTICE_CONF_NAME = "Janki Practice (slide order)"


def _ensure_practice_conf():
    """A deck-options group that shows new practice cards in **slide order**:
    gather by ascending position across the whole bank (ignoring the lecture
    subdecks) and don't re-sort. Returns its id, or None if the API differs."""
    try:
        conf = None
        for c in mw.col.decks.all_config():
            if c.get("name") == _PRACTICE_CONF_NAME:
                conf = c
                break
        if conf is None:
            conf = mw.col.decks.add_config(_PRACTICE_CONF_NAME)
        conf["newGatherPriority"] = 1     # LOWEST_POSITION → ascending position
        conf["newSortOrder"] = 1          # NO_SORT → keep the gathered (slide) order
        conf["new"]["order"] = 0          # in-order (not random) for old scheduler too
        conf["new"]["perDay"] = 9999      # work through the bank rather than 20/day
        mw.col.decks.update_config(conf)
        return conf["id"]
    except Exception as e:
        log("practice deck-config: %s" % e)
        return None


def _apply_practice_conf(did, cid):
    if not cid or not did:
        return
    try:
        deck = mw.col.decks.get(did)
        if deck and str(deck.get("conf")) != str(cid):
            mw.col.decks.set_config_id_for_deck_dict(deck, cid)
    except Exception as e:
        log("apply practice conf: %s" % e)


def _reposition_new(note, pos):
    """Pin a card's new-queue position to `pos` (slide order). Only touches cards
    still in the new queue, so it never disturbs already-scheduled reviews."""
    try:
        for cid in note.card_ids():
            c = mw.col.get_card(cid)
            if c.type == 0 and c.due != pos:   # 0 = new
                c.due = pos
                mw.col.update_card(c)
    except Exception as e:
        log("reposition new card: %s" % e)


def convert_bank_to_deck(bid):
    """Upsert one bank into Practice::<bank>. Returns (added, updated)."""
    meta = list_banks().get(bid)
    if not meta:
        return (0, 0)
    m = _ensure_model()
    name = (meta.get("name") or bid).replace("::", "-")
    base = "Practice::" + name
    did = mw.col.decks.id(base)          # bank deck (fallback when no lecture)
    dir_name = meta.get("dir", "")
    cid = _ensure_practice_conf()        # slide-order deck options
    _apply_practice_conf(mw.col.decks.id("Practice"), cid)
    _apply_practice_conf(did, cid)
    seen_dids = {did}
    added = updated = 0
    ordinal = 0
    for q in _bank_questions(dir_name):
        if not isinstance(q, dict):
            continue
        # A complete question needs a stem; an incomplete (diagnostic) card is kept
        # even with no stem, since its screenshot/partial data is the whole point.
        if not q.get("stem") and not q.get("incomplete"):
            continue
        ordinal += 1
        qid = _safe("%s_%d" % (bid, ordinal))
        # Each question's card goes into a per-lecture subdeck (Bank::Lecture) so the
        # bank expands by lecture; lecture-less questions stay in the bank deck. A
        # lecture may itself be nested with "::" (e.g. a merged bank stores
        # "<origbank>::<lecture>") — keep that hierarchy so each merged bank becomes a
        # subbank.
        segs = [s.strip() for s in (q.get("lecture") or "").split("::") if s.strip()]
        lec = "::".join(segs)
        qdid = mw.col.decks.id(base + "::" + lec) if lec else did
        if qdid not in seen_dids:
            _apply_practice_conf(qdid, cid)
            seen_dids.add(qdid)
        fields = {"Question": _stem_html(q, dir_name),
                  "Choices": _choices_html(q),
                  "Answer": _answer_letter(q),
                  "Explanation": _plain(q.get("explanation", "")),
                  "SlideNo": str(q.get("slide_no") or ""),
                  "Slide": _slide_html(q, dir_name),
                  "AnsSlide": _ans_slide_html(q, dir_name),
                  "QID": qid}
        tags = [str(t) for t in (q.get("tags") or [])]
        tt = _theme_tag(q.get("lecture"))   # tag the card by its section theme
        if tt and tt not in tags:
            tags.append(tt)
        if q.get("incomplete") and _INCOMPLETE_TAG not in tags:
            tags.append(_INCOMPLETE_TAG)    # flag diagnostic (incomplete) cards
        nids = mw.col.find_notes('note:"%s" QID:%s' % (_MODEL_NAME, qid))
        if nids:
            note = mw.col.get_note(nids[0])
            for k, val in fields.items():
                note[k] = val
            note.tags = tags
            mw.col.update_note(note)
            try:                              # re-file existing card into its lecture deck
                cids = note.card_ids()
                if cids:
                    mw.col.set_deck(cids, qdid)
            except Exception:
                pass
            updated += 1
        else:
            note = mw.col.new_note(m)
            for k, val in fields.items():
                note[k] = val
            note.tags = tags
            mw.col.add_note(note, qdid)
            added += 1
        # Pin new-queue position to slide order (with gather=LOWEST_POSITION this
        # makes the whole bank review in exact slideshow order across lectures).
        _reposition_new(note, ordinal)
    # Record the bank's deck id so a later deck rename can be synced back (see
    # reconcile_names).
    try:
        reg = _load_registry()
        if bid in reg["banks"] and reg["banks"][bid].get("did") != did:
            reg["banks"][bid]["did"] = int(did)
            _save_registry(reg)
    except Exception as e:
        log("store bank did: %s" % e)
    return (added, updated)


def convert_to_deck_dialog(on_done=None):
    """Confirm, then build/refresh the Practice deck (a subdeck per bank)."""
    from aqt.utils import tooltip, showInfo, askUser
    banks = list_banks()
    if not banks:
        tooltip("No question banks imported yet.")
        return
    if not askUser(
            "Create/update the “Practice” deck with a subdeck per bank "
            "(%d bank%s)?\n\nEach question becomes a normal card — front = "
            "question + choices, back = the same with the answer highlighted — "
            "tagged with its concept tags, so it syncs everywhere."
            % (len(banks), "" if len(banks) == 1 else "s")):
        return
    try:
        assign_deck_tags_from_headers()   # deterministic lecture tags first
        mine_concepts_from_banks()        # + concept mining (AI-free bridge)
    except Exception as e:
        log("deck-tag pass: %s" % e)
    tot_a = tot_u = 0
    for bid in banks:
        try:
            a, u = convert_bank_to_deck(bid)
            tot_a += a; tot_u += u
        except Exception as e:
            log("convert bank %s: %s" % (bid, e))
    try:
        mw.reset()
    except Exception:
        pass
    tooltip("Practice deck updated: %d new, %d updated." % (tot_a, tot_u),
            period=3500)
    if on_done:
        try:
            on_done()
        except Exception:
            pass


def docx_estimate_dialog(on_done=None, path=None):
    """Pick a .docx, show how many questions it yields, then (on confirm) build a
    .qb next to it and import it. Untagged → matches by text similarity.
    Pass ``path`` to skip the file picker (e.g. a file dropped onto the list)."""
    from aqt.qt import QFileDialog, QMessageBox
    from aqt.utils import tooltip, showWarning
    if not path:
        path, _ = QFileDialog.getOpenFileName(
            mw, "Build .qb from .docx", "", "Word documents (*.docx)")
    if not path:
        return
    try:
        qs = _parse_docx(_docx_paragraphs(path))
    except Exception as e:
        showWarning("Could not read .docx:\n\n%s" % e)
        return
    if not qs:
        showWarning("No questions found — the .docx isn't in the expected format.")
        return
    lects = len({q.get("lecture") for q in qs if q.get("lecture")})
    imgs = sum(1 for q in qs if q.get("media_rids"))
    m = QMessageBox(mw)
    m.setWindowTitle("Build .qb from .docx")
    m.setText("Parsed %d questions across %d lectures (%d with images)."
              % (len(qs), lects, imgs))
    m.setInformativeText("Create a .qb and import it now?\n(Untagged — matches by "
                         "text similarity; concept tags can be added later.)")
    create = m.addButton("Create & import", QMessageBox.ButtonRole.AcceptRole)
    m.addButton("Cancel", QMessageBox.ButtonRole.RejectRole)
    m.exec()
    if m.clickedButton() is not create:
        return
    try:
        out, man = _write_qb(path, qs)
        import_qb(out)
    except Exception as e:
        showWarning("Could not create/import .qb:\n\n%s" % e)
        return
    retag_from_lecture_map()                   # M1 calendar map (if it matches)
    deck_tagged, _t = assign_deck_tags_from_headers()   # deterministic deck tags
    mined, _m = mine_concepts_from_banks()     # concept mining (AI-free bridge)
    tooltip("Imported “%s” (%d questions); %d deck-tagged from headers, %d concept-"
            "matched from text." % (man.get("name"), len(qs), deck_tagged, mined))
    if on_done:
        try:
            on_done()
        except Exception:
            pass


# ---------------------------------------------------------------------------
# Learning-objectives → lecture→tag map (fresh-install helper). A course "learning
# objectives" .docx lists each lecture as an ALL-CAPS title followed by its
# objectives. We extract (title, objectives), build a prompt asking an AI to map
# each lecture to the best LOCAL tags, then expand/​write the reply into a proper
# lecture→tag map JSON. Runtime is 100% local; the AI step is a one-time paste the
# user runs in their own session.
# ---------------------------------------------------------------------------
_LO_DAY_RE = re.compile(r"^\s*WEEK\s+\d+\b", re.I)
_LO_CUT_RE = re.compile(r"\b(with the material|with the information|these "
                        r"learning objectives|the student should)\b", re.I)


def _lo_is_title(head):
    letters = [c for c in head if c.isalpha()]
    if len(letters) < 3:
        return False
    return sum(1 for c in letters if c.isupper()) / len(letters) >= 0.85


def _lo_title(line):
    """If `line` begins a lecture, return its clean title; else None. A title is
    the ALL-CAPS lecture name before any intro clause ('… With the material
    presented in this lecture…') or first sentence break."""
    if _LO_DAY_RE.match(line):
        return None                       # 'WEEK 1: TUESDAY' day marker, not a title
    head = _LO_CUT_RE.split(line, maxsplit=1)[0]
    head = re.split(r"\.\s", head, maxsplit=1)[0]  # 'GLYCOLYSIS. These…' → 'GLYCOLYSIS'
    head = head.strip().rstrip(".:").strip()
    return head if _lo_is_title(head) else None


def lo_docx_lectures(path):
    """[(title, [objective, …]), …] parsed from a learning-objectives .docx."""
    out, cur = [], None
    for text, _embeds in _docx_paragraphs(path):
        line = text.strip()
        if not line:
            continue
        title = _lo_title(line)
        if title:
            cur = [title, []]
            out.append(cur)
        elif cur is not None:
            if line.startswith("*") and "asterisk" in line.lower():
                continue                  # skip the legend note line
            cur[1].append(line)
    return [(t, objs) for t, objs in out if objs]   # drop stray title-less caps


def _relevant_concept_leaves(lectures, extra_titles=None, coverage=None):
    """Narrow the ~1.9k #Subjects concept candidates to only what the COURSE covers.

    Keep a concept leaf only if enough of its distinctive words appear in the
    lecture content — the LO titles + objectives we're mapping, plus any lecture
    titles already in the configured tag map (calendar/spreadsheet) when available.
    Reuses the lecture engine's own tokenizer (_match_tokens / _key_tokens) and the
    `match_coverage` knob, so it behaves like every other match in Janki. Falls back
    to the full list if the engine or a vocabulary isn't available."""
    all_leaves = sorted({t.split("::")[-1] for t in _concept_tags()})
    lec = _lectures()
    if lec is None:
        return all_leaves
    if coverage is None:
        try:
            coverage = float(_cfg().get("match_coverage", 0.6))
        except Exception:
            coverage = 0.6
    # Course vocabulary: distinctive tokens from every title + objective (+ any
    # external lecture titles). One flat set → O(1) membership per concept token.
    vocab = set()
    for title, objs in lectures:
        vocab.update(lec._key_tokens(lec._match_tokens(title)))
        for o in objs:
            vocab.update(lec._key_tokens(lec._match_tokens(o)))
    for t in (extra_titles or []):
        vocab.update(lec._key_tokens(lec._match_tokens(t)))
    if not vocab:
        return all_leaves
    kept = []
    for leaf in all_leaves:
        toks = lec._key_tokens(lec._match_tokens(leaf.strip("*")))
        if not toks:                      # acronym/short leaf → can't judge; keep it
            kept.append(leaf)
            continue
        if sum(1 for t in toks if t in vocab) / len(toks) >= coverage:
            kept.append(leaf)
    return kept


def build_lo_tagmap_prompt(lectures, branches=None, hutch_on=True, aj_on=True,
                           concepts=True, narrow=True, extra_titles=None,
                           max_objectives=12):
    """Prompt that maps each lecture (title + objectives) to local tags. Each
    candidate family is toggleable to trade coverage for tokens: concepts (AnKing
    #Subjects leaf names, compact + expanded back on apply), AJ, Hutch (full
    lecture-tag paths, often a 1:1 match for a lecture). When `narrow` is on the
    concept list is pruned to only what the course content covers (see
    _relevant_concept_leaves). Returns (prompt, stats)."""
    if not concepts:
        concept_leaves = []
    elif narrow:
        concept_leaves = _relevant_concept_leaves(lectures, extra_titles)
        if branches is not None:          # optional extra branch filter on top
            bmap = _concept_branches()
            allowed = {l for b, v in bmap.items() if b in set(branches) for l in v}
            concept_leaves = [l for l in concept_leaves if l in allowed]
    elif branches is None:
        concept_leaves = sorted({t.split("::")[-1] for t in _concept_tags()})
    else:
        bmap = _concept_branches()
        sel = set(branches)
        concept_leaves = sorted({l for b, v in bmap.items() if b in sel for l in v})
    hutch = _family_tags("hUtChCOM") if hutch_on else []
    aj = _family_tags("AJ_UCCOM_keep") if aj_on else []

    sections = []
    if concept_leaves:
        sections.append("  • Concepts — AnKing #Subjects concept names; return the "
                        "name EXACTLY as shown (keep any leading '*').")
    if aj:
        sections.append("  • AJ — full AJ_UCCOM_keep lecture tags; return the whole "
                        ":: path.")
    if hutch:
        sections.append("  • Hutch — full hUtChCOM tags; return the whole :: path.")

    ex_title = lectures[0][0] if lectures else "Some Lecture"
    ex_tag = (concept_leaves[0] if concept_leaves else
              aj[0] if aj else hutch[0] if hutch else "Some_Concept")

    header = (
        "You are an expert medical educator building a LECTURE → ANKI TAG map. For "
        "each lecture below (its title + learning objectives), choose the tag(s) "
        "whose cards a student should study for that lecture.\n\n"
        "A shared CANDIDATE TAGS list is given once below, in %d section(s):\n"
        % len(sections) + "\n".join(sections) + "\n\n"
        "For EACH lecture:\n"
        "• Prefer the ONE AJ/Hutch lecture tag that names the same lecture, if present.\n"
        "• Add UP TO 3 concept tags the objectives clearly cover; fewer is better.\n"
        "• Choose ONLY from the candidate list and copy each choice "
        "character-for-character. Never invent or alter a tag.\n"
        "• Use [] only if truly nothing fits.\n\n"
        "Return ONLY a JSON object — no prose, no markdown fences — mapping each "
        "lecture title (verbatim) to its tag list. Example:\n"
        '  {"%s": ["%s"]}\n' % (ex_title, ex_tag)
    )

    out = [header, "=" * 64, "CANDIDATE TAGS"]
    if concept_leaves:
        out.append("\n-- Concepts (AnKing #Subjects) — return the name exactly --")
        out.extend("- %s" % t for t in concept_leaves)
    if aj:
        out.append("\n-- AJ (AJ_UCCOM_keep) — return the full tag exactly --")
        out.extend("- %s" % t for t in aj)
    if hutch:
        out.append("\n-- Hutch (hUtChCOM) — return the full tag exactly --")
        out.extend("- %s" % t for t in hutch)

    out.append("\n" + "=" * 64)
    out.append("LECTURES")
    for title, objs in lectures:
        out.append("\n### %s" % title)
        out.extend("- %s" % o for o in objs[:max_objectives])

    stats = {"lectures": len(lectures),
             "candidates": len(concept_leaves) + len(hutch) + len(aj),
             "concepts": len(concept_leaves), "hutch": len(hutch), "aj": len(aj)}
    return "\n".join(out), stats


def _tagmap_to_txt(m):
    """Serialize a {lecture: [tags]} map into Janki's ==== delimited .txt format
    (the same shape _build_lecture_map_txt reads)."""
    rule = "=" * 40
    out = []
    for name, tags in m.items():
        out.append(rule)
        out.append(name)
        out.append(rule)
        out.extend(tags)
        out.append("")
    return "\n".join(out)


def write_lo_tagmap(reply_path=None, raw=None, out_path=None):
    """Turn the AI's lecture→tag JSON reply (a file path OR pasted `raw` text) into
    a proper lecture→tag map: expand concept-leaf names to full collection tags and
    write it out. Saves to `out_path` (format by extension — .txt uses the ====
    format, anything else JSON); defaults to user_files/lecture_tagmap.json.
    Returns (map_path, lectures_written, kept, dropped)."""
    if raw is None:
        with open(reply_path, encoding="utf-8") as f:
            raw = f.read()
    raw = (raw or "").strip()
    if raw.startswith("```"):                       # tolerate ```json fences
        raw = re.sub(r"^```[a-zA-Z]*\n?|\n?```$", "", raw).strip()
    data = json.loads(raw)

    pairs = []
    if isinstance(data, dict):
        pairs = list(data.items())
    elif isinstance(data, list):
        for it in data:
            if isinstance(it, dict):
                name = it.get("name") or it.get("lecture") or it.get("title")
                pairs.append((name, it.get("tags") or it.get("tag") or []))

    valid = _collection_tags()
    concept_idx = _concept_leaf_index()
    lec = _lectures()
    out_map, kept, dropped = {}, 0, 0
    for name, tags in pairs:
        name = (name or "").strip()
        if not name:
            continue
        if isinstance(tags, str):
            tags = [tags]
        clean = []
        for x in (tags or []):
            t = str(x).strip()
            if not t:
                continue
            resolved = _resolve_returned_tag(t, valid, concept_idx, lec)
            if resolved:
                clean.extend(resolved)
                kept += len(resolved)
            else:
                dropped += 1
        if clean:
            out_map[name] = sorted(set(clean))

    if not out_path:
        out_path = os.path.join(os.path.dirname(_qbanks_dir()), "lecture_tagmap.json")
    if out_path.lower().endswith(".txt"):
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(_tagmap_to_txt(out_map))
    else:
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(out_map, f, ensure_ascii=False, indent=2)
    return out_path, len(out_map), kept, dropped
