"""`.jank` bundles — one file for a whole content drop.

A `.jank` is a renamed `.tar.gz` holding any mix of:
  * `.apkg`  Anki deck packages   → imported into the collection (new notes added, existing
                                     ones updated when the package's copy is newer; your own
                                     review history/scheduling is never overwritten)
  * `.qb`    question banks       → installed/updated (same bank id = replaced)
  * `.json`  lecture → tag maps   → saved to user_files/tagmaps/ and used by Load Lectures
  * `.rp`    rephrasings          → merged into the rephrasing store
  * optional `manifest.json` at the top level: {"name", "version", "notes"} shown on import

Everything is extracted to a private temp folder first (paths are flattened; links, devices
and path tricks are refused) and imported in dependency order: decks → banks → tag maps →
rephrasings (rephrasings point at the notes the decks bring in). Nothing is uploaded.
"""

import json
import os
import shutil
import tarfile
import tempfile

from aqt import mw

from ..util.config import log, _cfg

_EXTS = (".apkg", ".qb", ".json", ".rp")
_MAX_FILES = 500
_MAX_TOTAL = 4 * 1024 ** 3          # 4 GB uncompressed (deck media can be large)


def _tagmap_dir() -> str:
    root = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))  # add-on root
    d = os.path.join(root, "user_files", "tagmaps")
    os.makedirs(d, exist_ok=True)
    return d


def _extract(path: str, dest: str) -> dict:
    """Safely extract the supported files into `dest`. Returns
    {"apkg": [...], "qb": [...], "json": [...], "rp": [...], "manifest": dict|None}."""
    out = {"apkg": [], "qb": [], "json": [], "rp": [], "manifest": None, "skipped": 0}
    total = 0
    used = set()
    try:
        tf = tarfile.open(path, "r:*")
    except tarfile.TarError as exc:
        raise ValueError("Not a valid .jank (it should be a renamed .tar.gz): %s" % exc)
    with tf:
        members = tf.getmembers()
        if len(members) > _MAX_FILES * 4:
            raise ValueError("This .jank has too many entries.")
        for m in members:
            if not m.isfile():                       # dirs are implied; links/devices refused
                continue
            name = m.name.replace("\\", "/")
            while name.startswith("./"):
                name = name[2:]
            parts = [x for x in name.split("/") if x not in ("", ".")]
            if name.startswith("/") or ".." in parts:
                out["skipped"] += 1                  # absolute / traversal paths refused
                continue
            name = "/".join(parts)
            base = os.path.basename(name)
            if not base or base.startswith(".") or "/__MACOSX/" in "/" + name:
                continue                             # macOS resource forks, dotfiles
            low = base.lower()
            is_manifest = low == "manifest.json" and len(parts) == 1
            if not is_manifest and not low.endswith(_EXTS):
                out["skipped"] += 1
                continue
            total += max(0, m.size)
            if total > _MAX_TOTAL:
                raise ValueError("This .jank is too large to import.")
            src = tf.extractfile(m)
            if src is None:
                continue
            if is_manifest:
                try:
                    out["manifest"] = json.loads(src.read(1024 * 1024).decode("utf-8"))
                except Exception:
                    out["manifest"] = None
                continue
            # Flatten into dest with a unique, safe file name.
            stem, ext = os.path.splitext(base)
            safe = "".join(ch for ch in stem if ch.isalnum() or ch in " ._-()")[:120] or "file"
            fn, k = safe + ext.lower(), 1
            while fn.lower() in used:
                k += 1
                fn = "%s-%d%s" % (safe, k, ext.lower())
            used.add(fn.lower())
            target = os.path.join(dest, fn)
            with open(target, "wb") as f:
                shutil.copyfileobj(src, f, 1024 * 1024)
            out[ext.lower().lstrip(".")].append(target)
            if sum(len(out[x]) for x in ("apkg", "qb", "json", "rp")) > _MAX_FILES:
                raise ValueError("This .jank has too many files.")
    for key in ("apkg", "qb", "json", "rp"):
        out[key].sort()
    return out


def _tag_results(path: str):
    """If `path` is an AI tag-matching reply (entries like {"id": "<bank>#<n>", "tags": […]})
    for an INSTALLED bank, return its parsed entries; else None (→ a lecture tag map)."""
    try:
        from ..integrations import qbank
        with open(path, encoding="utf-8") as f:
            data = qbank._parse_results(f.read())
        if not data:
            return None
        banks = set(qbank.list_banks())
        for e in data:
            if isinstance(e, dict):
                bid, _n = qbank._split_qid(e.get("id") or e.get("qid") or "")
                if bid in banks:
                    return data
    except Exception:
        pass
    return None


def _import_tagmap(path: str) -> str:
    """Validate a lecture → tag map and register it with Load Lectures (a same-named map from
    an earlier drop is replaced). Returns the saved path."""
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    if not isinstance(data, (dict, list)) or not data:
        raise ValueError("%s isn't a lecture → tag map" % os.path.basename(path))
    dest = os.path.join(_tagmap_dir(), os.path.basename(path))
    shutil.copy2(path, dest)
    cur = mw.addonManager.getConfig(__name__) or {}
    extras = [p for p in (cur.get("txt_paths") or [])
              if os.path.basename(p).lower() != os.path.basename(dest).lower()]
    extras.append(dest)
    cur["txt_paths"] = extras
    mw.addonManager.writeConfig(__name__, cur)
    return dest


def _import_apkgs(paths, on_done, prog=None, base=0, total=1) -> None:
    """Import deck packages one after another in the background (Anki's own importer, no
    dialogs): add new notes, update existing ones only when the package's copy is newer,
    keep YOUR scheduling/review history and deck options."""
    from aqt.operations import CollectionOp
    from anki.collection import ImportAnkiPackageRequest, ImportAnkiPackageOptions
    results = {"notes": 0, "errors": []}
    queue = list(paths)

    def _next():
        if not queue:
            on_done(results)
            return
        p = queue.pop(0)
        if prog is not None:
            k = len(paths) - len(queue) - 1
            prog.step(base + k, total, "Importing deck %d of %d: %s"
                      % (k + 1, len(paths), os.path.basename(p)))
        req = ImportAnkiPackageRequest(
            package_path=p,
            options=ImportAnkiPackageOptions(
                merge_notetypes=True, with_scheduling=False, with_deck_configs=False))

        def _ok(res):
            try:
                lg = res.log
                results["notes"] += len(lg.new) + len(lg.updated)
            except Exception:
                pass
            _next()

        def _fail(exc):
            results["errors"].append("%s: %s" % (os.path.basename(p), exc))
            _next()
        CollectionOp(parent=mw, op=lambda col, r=req: col.import_anki_package(r)) \
            .success(_ok).failure(_fail).run_in_background()
    _next()


def import_jank(path: str, parent=None, on_done=None) -> None:
    """Import a .jank bundle (see module docstring) and report what came in."""
    from aqt.utils import showInfo, showWarning
    tmp = tempfile.mkdtemp(prefix="janki-jank-")
    try:
        found = _extract(path, tmp)
    except Exception as exc:
        shutil.rmtree(tmp, ignore_errors=True)
        showWarning("Couldn't open this .jank:\n\n%s" % exc, parent=parent)
        return
    if not any(found[k] for k in ("apkg", "qb", "json", "rp")):
        shutil.rmtree(tmp, ignore_errors=True)
        showWarning("This .jank doesn't contain any .apkg, .qb, .json or .rp files.",
                    parent=parent)
        return

    def _rest(deck_res):
        lines, errors = [], list(deck_res.get("errors", []))
        if found["apkg"]:
            lines.append("Decks: %d package(s), %d notes added/updated"
                         % (len(found["apkg"]) - len(deck_res.get("errors", [])),
                            deck_res.get("notes", 0)))
        # Question banks: unpacked + tagged in the background (qb_res), decks built here
        if found["qb"]:
            ok = qb_res.get("ok", 0)
            errors.extend(qb_res.get("errors", []))
            from ..integrations import qbank
            for i, bid in enumerate(qb_res.get("bids", [])):
                prog.step(S_DECKS + i, N, "Building Practice deck %d of %d…"
                          % (i + 1, len(qb_res["bids"])))
                try:
                    qbank.convert_bank_to_deck(bid)
                except Exception as exc:
                    errors.append("%s: %s" % (bid, exc))
            lines.append("Question banks: %d installed and loaded into the Practice deck" % ok)
        prog.step(S_REST, N, "Applying tag maps and rephrasings…")
        # .json: AI tag-matching replies (applied to the banks just installed) or
        # lecture → tag maps.
        if found["json"]:
            ok = tagged = 0
            for p in found["json"]:
                try:
                    res = _tag_results(p)
                    if res is not None:
                        from ..integrations import qbank
                        tagged += qbank._apply_tag_results(res)[0]
                        continue
                    _import_tagmap(p)
                    ok += 1
                except Exception as exc:
                    errors.append("%s: %s" % (os.path.basename(p), exc))
            if ok:
                lines.append("Lecture tag maps: %d added" % ok)
            if tagged:
                lines.append("Tag matches: applied to %d question(s)" % tagged)
        # Rephrasings (last — they point at the notes the decks brought in)
        if found["rp"]:
            from . import reword
            imp = skip = 0
            why = {}
            for p in found["rp"]:
                try:
                    i, s_, r_ = reword.import_rp(p)
                    imp += i
                    skip += s_
                    for k, v in (r_ or {}).items():
                        why[k] = why.get(k, 0) + v
                except Exception as exc:
                    errors.append("%s: %s" % (os.path.basename(p), exc))
            lines.append("Rephrasings: %d imported%s"
                         % (imp, (" · %d skipped" % skip) if skip else ""))
            for k, v in sorted(why.items(), key=lambda kv: -kv[1])[:3]:
                lines.append("    %d skipped: %s" % (v, k))
        shutil.rmtree(tmp, ignore_errors=True)
        try:
            mw.reset()
        except Exception:
            pass
        prog.close()
        man = found.get("manifest") or {}
        title = man.get("name") or os.path.basename(path)
        head = title + (("  ·  v%s" % man["version"]) if man.get("version") else "")
        msg = head + "\n\n" + "\n".join("• " + x for x in lines)
        if man.get("notes"):
            msg += "\n\n" + str(man["notes"])[:1500]
        if found["rp"]:
            try:
                if not reword._enabled():
                    msg += ("\n\nRephrase mode is off, so the imported rephrasings won't show "
                            "yet: turn it on with Tab+R or in Settings → Rephrase.")
            except Exception:
                pass
            msg += ("\n\nTip: Settings → Rephrase → Mobile → “Enable / update on mobile”, "
                    "then sync, to bring new rephrasings to your phone.")
        if errors:
            msg += "\n\nProblems:\n" + "\n".join("• " + e for e in errors[:10])
        if on_done:
            try:
                on_done()          # e.g. Settings refreshes its Installed Banks list
            except Exception:
                pass
        try:
            from . import sfx as _sfx
            _sfx.loaded()
        except Exception:
            pass
        showInfo(msg, parent=parent, title="Janki: .jank imported")

    # Progress: decks (one step each) → banks unpacked + tagged (background) → one deck
    # build per bank → tag maps / rephrasings.
    from ..integrations import qbank as _qb
    prog = _qb._ImportProgress("Importing .jank")
    n_apkg, n_qb = len(found["apkg"]), len(found["qb"])
    S_QB = n_apkg
    S_DECKS = S_QB + (1 if n_qb else 0)
    S_REST = S_DECKS + n_qb
    N = S_REST + 1
    qb_res = {}

    def _banks(deck_res):
        if not found["qb"]:
            _rest(deck_res)
            return
        from aqt.operations import QueryOp
        prog.step(S_QB, N, "Installing %d question bank%s and matching tags…"
                  % (n_qb, "" if n_qb == 1 else "s"))

        def op(col):
            res = {"ok": 0, "errors": [], "bids": []}
            for p in found["qb"]:
                try:
                    man = _qb.import_qb(p, build_deck=False, enrich=False, sync_deck=False)
                    res["bids"].append(man.get("id"))
                    res["ok"] += 1
                except Exception as exc:
                    res["errors"].append("%s: %s" % (os.path.basename(p), exc))
            try:
                _qb.assign_deck_tags_from_headers()
                _qb.mine_concepts_from_banks()
                _qb.assign_content_tags()
                _qb._Q_CACHE.clear()
            except Exception as exc:
                log("jank bank enrich: %s" % exc)
            return res

        def done(res):
            qb_res.update(res)
            _rest(deck_res)

        def failed(exc):
            qb_res.update({"errors": [str(exc)]})
            _rest(deck_res)
        QueryOp(parent=mw, op=op, success=done).failure(failed).run_in_background()

    if found["apkg"]:
        _import_apkgs(found["apkg"], _banks, prog, 0, N)
    else:
        _banks({})


def import_jank_dialog(parent=None, on_done=None) -> None:
    from aqt.qt import QFileDialog
    start = _cfg().get("last_jank_dir") or os.path.expanduser("~/Downloads")
    fn, _f = QFileDialog.getOpenFileName(parent or mw, "Import a .jank bundle", start,
                                         "Janki bundle (*.jank *.tar.gz *.tgz);;All files (*)")
    if not fn:
        return
    try:
        cur = mw.addonManager.getConfig(__name__) or {}
        cur["last_jank_dir"] = os.path.dirname(fn)
        mw.addonManager.writeConfig(__name__, cur)
    except Exception:
        pass
    import_jank(fn, parent=parent, on_done=on_done)


# --------------------------------------------------------------------------- packager
def build_jank(out_path: str, files, name: str = "", version: str = "", notes: str = "") -> int:
    """Write a .jank (tar.gz) with `files` at the top level plus a manifest.json. Duplicate
    file names get a numeric suffix. Returns the number of files packed."""
    import io
    import time
    used, n = set(), 0
    with tarfile.open(out_path, "w:gz") as tf:
        man = {k: v for k, v in (("name", name.strip()), ("version", version.strip()),
                                 ("notes", notes.strip())) if v}
        man["created"] = time.strftime("%Y-%m-%d")
        raw = json.dumps(man, ensure_ascii=False, indent=2).encode("utf-8")
        ti = tarfile.TarInfo("manifest.json")
        ti.size, ti.mtime = len(raw), int(time.time())
        tf.addfile(ti, io.BytesIO(raw))
        for p in files:
            base = os.path.basename(p)
            if base.lower() == "manifest.json":
                continue                              # reserved for the bundle's own manifest
            stem, ext = os.path.splitext(base)
            arc, k = base, 1
            while arc.lower() in used:
                k += 1
                arc = "%s-%d%s" % (stem, k, ext)
            used.add(arc.lower())
            tf.add(p, arcname=arc, recursive=False)
            n += 1
    return n


def _local_sources() -> dict:
    """What this Janki install can put in a bundle without browsing for files."""
    out = {"banks": [], "tagmaps": [], "rp": 0}
    try:
        from ..integrations import qbank
        reg = qbank._load_registry()
        for bid, b in sorted(reg.get("banks", {}).items(), key=lambda kv: kv[1].get("name", "")):
            d = os.path.join(qbank._qbanks_dir(), b.get("dir") or "")
            if os.path.isfile(os.path.join(d, "manifest.json")):
                out["banks"].append({"id": bid, "name": b.get("name") or bid,
                                     "count": b.get("count", 0), "dir": d,
                                     "version": b.get("version", "")})
    except Exception as exc:
        log("jank sources (banks): %s" % exc)
    seen = set()
    try:
        root = os.path.dirname(_tagmap_dir())
        cands = [os.path.join(root, "lecture_tagmap.json")]
        cands += [os.path.join(_tagmap_dir(), f) for f in sorted(os.listdir(_tagmap_dir()))]
        cands += [p for p in (_cfg().get("txt_paths") or [])]
        for p in cands:
            if p.lower().endswith(".json") and os.path.isfile(p):
                rp = os.path.realpath(p)
                if rp not in seen:
                    seen.add(rp)
                    out["tagmaps"].append(p)
    except Exception as exc:
        log("jank sources (tag maps): %s" % exc)
    try:
        from . import reword
        out["rp"] = reword.rephrase_sets()          # {set name: card sides}
    except Exception:
        out["rp"] = {}
    return out


_MATCH_FIELDS = ("tags", "mined_tags", "content_tags")


def _bank_match_count(bank_dir: str) -> int:
    """Questions in an installed bank that carry tag matches (AI / lecture / content)."""
    n = 0
    try:
        with open(os.path.join(bank_dir, "questions.jsonl"), encoding="utf-8") as f:
            for line in f:
                try:
                    q = json.loads(line)
                except Exception:
                    continue
                if isinstance(q, dict) and any(q.get(k) for k in _MATCH_FIELDS):
                    n += 1
    except Exception:
        pass
    return n


_NO_LEC = "(no lecture)"


def _bank_rows(bank_dir: str) -> list:
    out = []
    try:
        with open(os.path.join(bank_dir, "questions.jsonl"), encoding="utf-8") as f:
            for line in f:
                try:
                    q = json.loads(line)
                except Exception:
                    continue
                if isinstance(q, dict):
                    out.append(q)
    except Exception:
        pass
    return out


def _bank_lectures(bank_dir: str) -> dict:
    """{lecture path: question count} for a bank, in first-seen order."""
    out = {}
    for q in _bank_rows(bank_dir):
        L = (q.get("lecture") or "").strip() or _NO_LEC
        out[L] = out.get(L, 0) + 1
    return out


def _tagmap_entries(path: str) -> list:
    """[(lecture name, [tag lines])] from a lecture tag map .json (dict or list form)."""
    try:
        with open(path, encoding="utf-8") as f:
            data = json.load(f)
    except Exception:
        return []

    def lines(t):
        return [t] if isinstance(t, str) else [str(x) for x in (t or []) if x]
    out = []
    if isinstance(data, dict):
        for k, v in data.items():
            out.append((str(k), lines(v)))
    elif isinstance(data, list):
        for it in data:
            if isinstance(it, dict):
                nm = it.get("name") or it.get("lecture") or it.get("title")
                tg = it.get("tags", it.get("tag", it.get("searches")))
                if nm:
                    out.append((str(nm), lines(tg)))
    return out


def _write_tagmap_subset(path: str, names, dest_dir: str) -> str:
    keep = set(names)
    sub = {n: t for n, t in _tagmap_entries(path) if n in keep}
    out = os.path.join(dest_dir, os.path.basename(path))
    with open(out, "w", encoding="utf-8") as f:
        json.dump(sub, f, ensure_ascii=False, indent=2)
    return out


def _line_keys(line: str) -> set:
    """Match keys for one tag-map line: its concept leaf, or the deck for deck: lines."""
    from ..integrations import qbank
    t = str(line).strip().strip("\"'()").strip()
    if t.lower().startswith("deck:"):
        return {("deck:" + t[5:].strip().strip("\"'")).lower()}
    if t.lower().startswith("tag:"):
        t = t[4:]
    t = t.strip().strip("\"'*")
    return qbank._leaf_keys([t]) if t else set()


def _deck_keys(dids_names) -> set:
    """Everything the ticked decks are about: each deck (+ subdecks) as deck:<name> and
    the concept leaves of every tag on their cards."""
    from ..integrations import qbank
    col = mw.col
    keys, dids = set(), set()
    for did, nm in dids_names:
        dids.add(did)
        keys.add(("deck:" + nm).lower())
        for cn, cd in col.decks.children(did):
            dids.add(cd)
            keys.add(("deck:" + cn).lower())
    if dids:
        ids = ",".join(str(int(d)) for d in dids)
        tags = set()
        for r in col.db.list("select distinct n.tags from notes n where n.id in (select nid "
                             "from cards where did in (%s) or odid in (%s))" % (ids, ids)):
            tags.update((r or "").split())
        keys |= qbank._leaf_keys(list(tags))
    return keys


def _q_keys(q) -> set:
    from ..integrations import qbank
    return (qbank._leaf_keys(q.get("tags")) | qbank._leaf_keys(q.get("mined_tags"))
            | qbank._leaf_keys(q.get("content_tags")))


def _pack_bank(bank_dir: str, dest_dir: str, stem: str, with_matches: bool = True,
               lectures=None) -> str:
    """Re-pack an installed bank folder as a .qb (zip) for the bundle. with_matches=False
    ships it untagged (tag matches stripped from questions.jsonl)."""
    import zipfile
    out = os.path.join(dest_dir, stem + ".qb")
    if lectures is not None:
        # A SELECTION ships as its own bank (id/name marked), so importing it never
        # replaces a recipient's full copy of the same bank.
        import hashlib
        keep = set(lectures)
        qs = [q for q in _bank_rows(bank_dir)
              if ((q.get("lecture") or "").strip() or _NO_LEC) in keep]
        if not with_matches:
            for q in qs:
                for k in _MATCH_FIELDS:
                    q.pop(k, None)
        try:
            with open(os.path.join(bank_dir, "manifest.json"), encoding="utf-8") as f:
                man = json.load(f)
        except Exception:
            man = {"qb_format": 1, "id": stem}
        h = hashlib.sha1("\n".join(sorted(keep)).encode("utf-8")).hexdigest()[:6]
        man["id"] = "%s-sel-%s" % (man.get("id") or stem, h)
        man["name"] = "%s (selection)" % (man.get("name") or stem)
        man["count"] = len(qs)
        with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
            z.writestr("manifest.json", json.dumps(man, ensure_ascii=False, indent=2))
            z.writestr("questions.jsonl", "\n".join(json.dumps(q, ensure_ascii=False) for q in qs))
            used = {m for q in qs for m in (q.get("media") or [])}
            mdir = os.path.join(bank_dir, "media")
            for m in used:
                mp = os.path.join(mdir, m)
                if os.path.isfile(mp):
                    z.write(mp, "media/" + m)
        return out
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
        for base, _dirs, files in os.walk(bank_dir):
            for f in files:
                full = os.path.join(base, f)
                rel = os.path.relpath(full, bank_dir)
                if not with_matches and rel == "questions.jsonl":
                    lines = []
                    with open(full, encoding="utf-8") as fh:
                        for line in fh:
                            try:
                                q = json.loads(line)
                            except Exception:
                                continue
                            if isinstance(q, dict):
                                for k in _MATCH_FIELDS:
                                    q.pop(k, None)
                            lines.append(json.dumps(q, ensure_ascii=False))
                    z.writestr(rel, "\n".join(lines))
                else:
                    z.write(full, rel)
    return out


def _export_rp(dest_dir: str, set_name=None) -> str:
    """One rephrasing SET as a .rp (plain-text rephrasings; list-reorder HTML variants are
    left out — they're rebuilt locally). set_name None = every set in one file. The set
    name rides in the file (and its file name) so the recipient keeps the same sets."""
    from . import reword
    store = reword._load()
    items = [{"id": k, "variants": r["variants"]} for k, r in sorted(store.items())
             if isinstance(r, dict) and r.get("variants") and not r.get("html")
             and (set_name is None or reword.rec_set(r) == set_name)]
    # Each note's GUID too: note ids differ between collections, GUIDs don't, so the
    # rephrasings land on the right cards on someone else's copy of the same deck.
    try:
        guids = dict(mw.col.db.all("select id, guid from notes"))
        for it in items:
            g = guids.get(int(str(it["id"]).split(":")[0]))
            if g:
                it["guid"] = g
    except Exception as exc:
        log("jank rp guids: %s" % exc)
    stem = "".join(ch for ch in (set_name or "rephrasings") if ch.isalnum() or ch in " ._-()")
    stem = stem.strip().replace(" ", "-") or "rephrasings"
    out = os.path.join(dest_dir, stem + ".rp")
    k = 1
    while os.path.exists(out):
        k += 1
        out = os.path.join(dest_dir, "%s-%d.rp" % (stem, k))
    doc = {"type": "janki-rephrase", "version": 1, "items": items}
    if set_name:
        doc["set"] = set_name
    with open(out, "w", encoding="utf-8") as f:
        json.dump(doc, f, ensure_ascii=False, separators=(",", ":"))
    return out


def _export_deck_apkg(dest_dir: str, did: int, name: str, with_scheduling: bool) -> str:
    """Export one deck (with its subdecks, notes and media) to an .apkg in dest_dir."""
    from anki.collection import ExportAnkiPackageOptions, DeckIdLimit
    stem = "".join(ch for ch in name.replace("::", " - ")
                   if ch.isalnum() or ch in " ._-").strip() or "deck"
    out = os.path.join(dest_dir, stem + ".apkg")
    mw.col.export_anki_package(
        out_path=out,
        options=ExportAnkiPackageOptions(with_scheduling=with_scheduling,
                                         with_deck_configs=with_scheduling,
                                         with_media=True, legacy=False),
        limit=DeckIdLimit(deck_id=did))
    return out


def packager_dialog(parent=None) -> None:
    """Build a .jank: tick what to include from this install (question banks, lecture tag
    maps, rephrasings) and/or add files from disk (.qb / .json / .rp / .apkg), name the drop,
    and export one file."""
    from aqt.qt import (QDialog, QVBoxLayout, QHBoxLayout, QLabel, QPushButton, QTreeWidget,
                        QTreeWidgetItem, QLineEdit, QPlainTextEdit, QFileDialog, QTimer, Qt,
                        QHeaderView)
    from aqt.utils import tooltip, showWarning
    dlg = QDialog(parent or mw)
    dlg.setWindowTitle("Build a .jank bundle")
    try:
        from ..user import glass as _glass, css as _css
        _glass.glass_dialog(dlg)
        _css.apply_widget_ui_font(dlg)
    except Exception:
        _glass = None
    v = QVBoxLayout(dlg)
    top = 34 if getattr(dlg, "_jk_expanded", False) else 12    # clear the traffic lights
    v.setContentsMargins(16, top, 16, 14)
    v.setSpacing(8)

    head = QLabel("<b style='font-size:16px'>Build a .jank bundle</b>")
    v.addWidget(head)
    intro = QLabel("Tick what to include from this Janki, add any other files, then export "
                   "one .jank to share.")
    intro.setWordWrap(True)
    intro.setStyleSheet("color:#9aa0aa;")
    v.addWidget(intro)

    tree = QTreeWidget()
    tree.setHeaderHidden(True)
    tree.setColumnCount(2)
    tree.setRootIsDecorated(True)
    tree.setIndentation(16)
    tree.header().setStretchLastSection(False)
    tree.header().setSectionResizeMode(0, QHeaderView.ResizeMode.Stretch)
    tree.header().setSectionResizeMode(1, QHeaderView.ResizeMode.ResizeToContents)
    tree.setMinimumHeight(230)
    tree.setTextElideMode(Qt.TextElideMode.ElideMiddle)
    v.addWidget(tree, 1)

    ROLE = Qt.ItemDataRole.UserRole
    src = _local_sources()

    def _group(title):
        g = QTreeWidgetItem([title, ""])
        f = g.font(0); f.setBold(True); g.setFont(0, f)
        g.setFlags(Qt.ItemFlag.ItemIsEnabled)
        tree.addTopLevelItem(g)
        return g

    def _leaf(group, text, detail, data, checked=False):
        it = QTreeWidgetItem([text, detail])
        it.setFlags(Qt.ItemFlag.ItemIsEnabled | Qt.ItemFlag.ItemIsUserCheckable
                    | Qt.ItemFlag.ItemIsSelectable)
        it.setCheckState(0, Qt.CheckState.Checked if checked else Qt.CheckState.Unchecked)
        it.setData(0, ROLE, data)
        it.setToolTip(0, text)
        it.setForeground(1, Qt.GlobalColor.gray)
        group.addChild(it)
        return it

    g_banks = _group("Question banks")
    for b in src["banks"]:
        m = _bank_match_count(b["dir"])
        det = ("%d questions" % b["count"]) if b["count"] else ""
        if m:
            det += (" · " if det else "") + "%d tag-matched" % m
        bi = _leaf(g_banks, b["name"], det, ("bank", b))
        bi.setFlags(bi.flags() | Qt.ItemFlag.ItemIsAutoTristate)
        lecs = _bank_lectures(b["dir"])
        if len(lecs) > 1:                          # ▸ pick lectures (packs only those)
            for L, n in lecs.items():
                _leaf(bi, L, "%d question%s" % (n, "" if n == 1 else "s"),
                      ("banklec", (b["id"], L)))
    opt_matches = None
    if not src["banks"]:
        _leaf(g_banks, "No banks installed", "", None).setFlags(Qt.ItemFlag.NoItemFlags)
    else:
        # Share the banks WITH their tag matches (AI results you applied + lecture/content
        # tags), so others' interspersing / Tab+Q match their cards without re-tagging.
        opt_matches = QTreeWidgetItem(["Include tag matches (AI + lecture tags)",
                                       "banks arrive already matched"])
        opt_matches.setFlags(Qt.ItemFlag.ItemIsEnabled | Qt.ItemFlag.ItemIsUserCheckable)
        opt_matches.setCheckState(0, Qt.CheckState.Checked)
        opt_matches.setForeground(1, Qt.GlobalColor.gray)
        f_ = opt_matches.font(0); f_.setItalic(True); opt_matches.setFont(0, f_)
        g_banks.addChild(opt_matches)
    g_maps = _group("Lecture tag maps")
    for p in src["tagmaps"]:
        # (the folder goes in the tooltip: as detail text it widened column 2 until
        # the lecture names were cut to a few letters)
        mi = _leaf(g_maps, os.path.basename(p), "", ("file", p))
        mi.setToolTip(0, p.replace(os.path.expanduser("~"), "~"))
        ents = _tagmap_entries(p)
        if len(ents) > 1:                          # ▸ pick lectures (packs only those)
            mi.setFlags(mi.flags() | Qt.ItemFlag.ItemIsAutoTristate)
            mi.setText(1, "%d lectures" % len(ents))
            for nm, lines in ents:
                _leaf(mi, nm, "%d tag%s" % (len(lines), "" if len(lines) == 1 else "s"),
                      ("mapentry", (p, nm, lines)))
    if not src["tagmaps"]:
        _leaf(g_maps, "No tag maps yet", "", None).setFlags(Qt.ItemFlag.NoItemFlags)
    g_rp = _group("Rephrasings")
    if src["rp"]:
        # One row per set (the .rp it was imported from, pasted replies, on-device), so a
        # bundle can carry just the rephrasings meant for it.
        for sname in sorted(src["rp"], key=str.lower):
            _leaf(g_rp, sname, "%d card sides" % src["rp"][sname], ("rp", sname))
    else:
        _leaf(g_rp, "No rephrasings stored", "", None).setFlags(Qt.ItemFlag.NoItemFlags)
    # Anki decks (with their subdecks) — exported as .apkg inside the bundle; the
    # importer already brings .apkg files in.
    g_decks = _group("Decks")
    opt_sched = None
    try:
        rows = []
        for nid in mw.col.decks.all_names_and_ids(skip_empty_default=True):
            nm = nid.name
            top = nm.split("::")[0]
            if top in ("Practice",) or top.startswith("Janki Calendar"):
                continue                       # banks + temporary class decks
            rows.append((nm, int(nid.id)))
        # a real tree: top-level decks only; ▸ reveals a deck's subdecks
        node = {}
        for nm, did in sorted(rows, key=lambda r: r[0].lower()):
            try:
                n = mw.col.decks.card_count(did, include_subdecks=True)
                det = "%d card%s" % (n, "" if n == 1 else "s")
            except Exception:
                det = ""
            if any(x.startswith(nm + "::") for x, _d in rows):
                det += (" · " if det else "") + "with subdecks"
            parent = node.get(nm.rsplit("::", 1)[0]) if "::" in nm else None
            node[nm] = _leaf(parent or g_decks, nm.split("::")[-1], det, ("deck", (did, nm)))
        if rows:
            opt_sched = QTreeWidgetItem(["Include review history (scheduling)",
                                         "off: recipients start the cards fresh"])
            opt_sched.setFlags(Qt.ItemFlag.ItemIsEnabled | Qt.ItemFlag.ItemIsUserCheckable)
            opt_sched.setCheckState(0, Qt.CheckState.Unchecked)
            opt_sched.setForeground(1, Qt.GlobalColor.gray)
            f_ = opt_sched.font(0); f_.setItalic(True); opt_sched.setFont(0, f_)
            g_decks.addChild(opt_sched)
        else:
            _leaf(g_decks, "No decks", "", None).setFlags(Qt.ItemFlag.NoItemFlags)
    except Exception as exc:
        log("jank decks: %s" % exc)
    g_disk = _group("Added from disk")
    tree.expandAll()
    for g in (g_banks, g_maps):                  # bank / map lectures start collapsed
        for i in range(g.childCount()):
            g.child(i).setExpanded(False)
    for i in range(g_decks.childCount()):        # decks start collapsed (subdecks on ▸)
        def _collapse(it):
            it.setExpanded(False)
            for j in range(it.childCount()):
                _collapse(it.child(j))
        _collapse(g_decks.child(i))

    count = QLabel("")
    count.setStyleSheet("color:#9aa0aa;")

    def _selected():
        sel = []

        def walk(it):                              # nested (deck → subdecks) too
            for ci in range(it.childCount()):
                c = it.child(ci)
                d = c.data(0, ROLE)
                st = c.checkState(0)
                if d and st == Qt.CheckState.Checked:
                    sel.append(d)
                elif d and st == Qt.CheckState.PartiallyChecked and d[0] in ("bank", "file"):
                    sel.append(("partial-" + d[0], d))
                walk(c)
        for gi in range(tree.topLevelItemCount()):
            walk(tree.topLevelItem(gi))
        return sel

    def _refresh(*_a):
        sel = _selected()
        kinds = {}
        for kind, d in sel:
            if kind in ("banklec", "mapentry"):
                continue
            if kind.startswith("partial-"):
                kind, d = d
            key = kind
            if kind == "file":
                key = os.path.splitext(d)[1].lower()
            kinds[key] = kinds.get(key, 0) + 1
        nb = kinds.get("bank", 0) + kinds.get(".qb", 0)
        nd = kinds.get(".apkg", 0) + kinds.get("deck", 0)
        bits = []
        if nd:
            bits.append("%d deck%s" % (nd, "" if nd == 1 else "s"))
        if nb:
            bits.append("%d bank%s" % (nb, "" if nb == 1 else "s"))
        if kinds.get(".json"):
            bits.append("%d tag map%s" % (kinds[".json"], "" if kinds[".json"] == 1 else "s"))
        if kinds.get("rp") or kinds.get(".rp"):
            bits.append("rephrasings")
        count.setText("Selected: " + " · ".join(bits) if bits else "Nothing selected yet.")
        export.setEnabled(bool(sel))
    tree.itemChanged.connect(_refresh)

    def _add_disk(paths):
        have = {g_disk.child(i).data(0, ROLE)[1] for i in range(g_disk.childCount())}
        for p in paths:
            p = os.path.abspath(p)
            if p.lower().endswith(_EXTS) and os.path.isfile(p) and p not in have:
                it_ = _leaf(g_disk, os.path.basename(p), "", ("file", p), True)
                it_.setToolTip(0, p.replace(os.path.expanduser("~"), "~"))
        g_disk.setExpanded(True)
        _refresh()

    from aqt.qt import QCheckBox
    follow = QCheckBox("Trim banks and tag maps to the ticked decks")
    follow.setToolTip("Ticks only the bank lectures and tag-map lectures that the decks "
                      "you ticked actually use (their tags, subdecks, or mapped deck). "
                      "Adjust by hand afterwards if you like.")
    v.addWidget(follow)

    def _apply_follow(*_a):
        if not follow.isChecked():
            return
        picked = []

        def walk(it):
            for ci in range(it.childCount()):
                c = it.child(ci)
                d = c.data(0, ROLE)
                if d and d[0] == "deck" and c.checkState(0) == Qt.CheckState.Checked:
                    picked.append(d[1])
                walk(c)
        walk(g_decks)
        try:
            keys = _deck_keys(picked) if picked else set()
        except Exception as exc:
            log("jank follow decks: %s" % exc)
            return
        tree.blockSignals(True)
        try:
            for bi in range(g_banks.childCount()):
                b_it = g_banks.child(bi)
                bd = b_it.data(0, ROLE)
                if not bd or bd[0] != "bank":
                    continue
                hit = {((q.get("lecture") or "").strip() or _NO_LEC)
                       for q in _bank_rows(bd[1]["dir"]) if keys & _q_keys(q)}
                if b_it.childCount():
                    for ci in range(b_it.childCount()):
                        c = b_it.child(ci)
                        c.setCheckState(0, Qt.CheckState.Checked if c.data(0, ROLE)[1][1] in hit
                                        else Qt.CheckState.Unchecked)
                else:
                    b_it.setCheckState(0, Qt.CheckState.Checked if hit else Qt.CheckState.Unchecked)
            for mi in range(g_maps.childCount()):
                m_it = g_maps.child(mi)
                for ci in range(m_it.childCount()):
                    c = m_it.child(ci)
                    _p, _nm, lines = c.data(0, ROLE)[1]
                    ok = any(keys & _line_keys(ln) for ln in lines)
                    c.setCheckState(0, Qt.CheckState.Checked if ok else Qt.CheckState.Unchecked)
        finally:
            tree.blockSignals(False)
        # parents' tri-state is recomputed by Qt on child changes; nudge a repaint
        tree.viewport().update()
        _refresh()

    def _on_item(it, _col):
        d = it.data(0, ROLE)
        if follow.isChecked() and d and d[0] == "deck":
            _apply_follow()
    tree.itemChanged.connect(_on_item)
    follow.toggled.connect(_apply_follow)

    row = QHBoxLayout()
    add = QPushButton("Add files from disk…")
    rem = QPushButton("Remove")
    rem.setToolTip("Remove the selected files you added from disk")
    for b in (add, rem):
        b.setAutoDefault(False)
    row.addWidget(add)
    row.addWidget(rem)
    row.addStretch()
    row.addWidget(count)
    v.addLayout(row)

    def _pick():
        start = _cfg().get("last_jank_src_dir") or os.path.expanduser("~/Downloads")
        fns, _f = QFileDialog.getOpenFileNames(
            dlg, "Add files to the bundle", start,
            "Bundle files (*.qb *.json *.rp *.apkg);;Decks (*.apkg);;Question banks (*.qb);;"
            "Lecture tag maps (*.json);;Rephrasings (*.rp)")
        if fns:
            try:
                cur = mw.addonManager.getConfig(__name__) or {}
                cur["last_jank_src_dir"] = os.path.dirname(fns[0])
                mw.addonManager.writeConfig(__name__, cur)
            except Exception:
                pass
            _add_disk(fns)

    def _remove():
        for it in tree.selectedItems():
            if it.parent() is g_disk:
                g_disk.removeChild(it)
        _refresh()
    add.clicked.connect(_pick)
    rem.clicked.connect(_remove)

    # Files dragged onto the list are added under "Added from disk".
    tree.setAcceptDrops(True)

    def _drag_enter(ev):
        if ev.mimeData() and ev.mimeData().hasUrls():
            ev.acceptProposedAction()

    def _drop(ev):
        md = ev.mimeData()
        if md and md.hasUrls():
            _add_disk([u.toLocalFile() for u in md.urls() if u.isLocalFile()])
            ev.acceptProposedAction()
    tree.dragEnterEvent = _drag_enter
    tree.dragMoveEvent = _drag_enter
    tree.dropEvent = _drop

    form = QHBoxLayout()
    name = QLineEdit(); name.setPlaceholderText("Bundle name (e.g. Block 2 · Week 3)")
    ver = QLineEdit(); ver.setPlaceholderText("Version"); ver.setMaximumWidth(120)
    form.addWidget(name, 1)
    form.addWidget(ver)
    v.addLayout(form)
    notes = QPlainTextEdit(); notes.setPlaceholderText("Notes shown when it's imported (optional)")
    notes.setFixedHeight(64)
    v.addWidget(notes)

    brow = QHBoxLayout()
    cancel = QPushButton("Cancel")
    export = QPushButton("Export .jank…")
    for b in (cancel, export):
        b.setAutoDefault(False)
    export.setDefault(True)
    brow.addStretch()
    brow.addWidget(cancel)
    brow.addWidget(export)
    v.addLayout(brow)
    cancel.clicked.connect(dlg.reject)

    def _export():
        sel = _selected()
        if not sel:
            return
        stem = "".join(ch for ch in (name.text().strip() or "janki-bundle")
                       if ch.isalnum() or ch in " ._-").strip().replace(" ", "-") or "janki-bundle"
        if ver.text().strip():
            stem += "-v" + "".join(ch for ch in ver.text().strip() if ch.isalnum() or ch in "._-")
        start = os.path.join(_cfg().get("last_jank_src_dir") or os.path.expanduser("~/Downloads"),
                             stem + ".jank")
        out, _f = QFileDialog.getSaveFileName(dlg, "Export .jank", start, "Janki bundle (*.jank)")
        if not out:
            return
        if not out.lower().endswith(".jank"):
            out += ".jank"
        tmp = tempfile.mkdtemp(prefix="janki-jank-build-")
        try:
            files = []
            keep = (opt_matches is None
                    or opt_matches.checkState(0) == Qt.CheckState.Checked)
            full_banks = {d["id"] for k, d in sel if k == "bank"}
            lec_pick, map_pick = {}, {}
            for k, d in sel:
                if k == "banklec" and d[0] not in full_banks:
                    lec_pick.setdefault(d[0], []).append(d[1])
                elif k == "mapentry":
                    map_pick.setdefault(d[0], []).append(d[1])
            for k, d in sel:
                if k == "partial-bank":
                    b = d[1]
                    files.append(_pack_bank(b["dir"], tmp, "".join(
                        ch for ch in b["id"] if ch.isalnum() or ch in "._-") or "bank",
                        with_matches=keep, lectures=lec_pick.get(b["id"], [])))
                elif k == "partial-file":
                    p = d[1]
                    files.append(_write_tagmap_subset(p, map_pick.get(p, []), tmp))
            for kind, d in sel:
                if kind == "bank":
                    files.append(_pack_bank(d["dir"], tmp, "".join(
                        ch for ch in d["id"] if ch.isalnum() or ch in "._-") or "bank",
                        with_matches=keep))
                elif kind == "rp":
                    files.append(_export_rp(tmp, d))      # d = the set name
                elif kind == "file":
                    files.append(d)
            # decks: one .apkg per picked deck (its subdecks included); a subdeck whose
            # parent is also picked is already inside the parent's package
            picked = [d for k, d in sel if k == "deck"]
            names = [nm for _did, nm in picked]
            sched = opt_sched is not None and opt_sched.checkState(0) == Qt.CheckState.Checked
            for did, nm in picked:
                if any(nm.startswith(o + "::") for o in names if o != nm):
                    continue
                files.append(_export_deck_apkg(tmp, did, nm, sched))
            n = build_jank(out, files, name.text(), ver.text(), notes.toPlainText())
        except Exception as exc:
            showWarning("Couldn't build the .jank:\n\n%s" % exc, parent=dlg)
            return
        finally:
            shutil.rmtree(tmp, ignore_errors=True)
        tooltip("Exported %s (%d files)." % (os.path.basename(out), n), period=3500)
        dlg.accept()
    export.clicked.connect(_export)
    _refresh()
    dlg.resize(640, 600)
    if _glass is not None:
        def _front():
            try:
                _glass.hide_titlebar_extras(dlg)
                _glass.bring_dialog_to_front(dlg)
            except Exception:
                pass
        QTimer.singleShot(0, _front)

    # macOS re-shows the PARENT's minimise/zoom buttons while a child dialog is up
    # (Settings is close-only; they landed over its "General" tab) — re-hide them
    def _parent_close_only():
        try:
            if _glass is not None and parent is not None:
                _glass.hide_titlebar_extras(parent.window())
        except Exception:
            pass
    QTimer.singleShot(50, _parent_close_only)
    try:
        dlg.exec()
    finally:
        _parent_close_only()
        QTimer.singleShot(50, _parent_close_only)
