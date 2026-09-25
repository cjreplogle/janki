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


def _import_apkgs(paths, on_done) -> None:
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
        # Question banks
        if found["qb"]:
            from ..integrations import qbank
            ok = 0
            for p in found["qb"]:
                try:
                    qbank.import_qb(p, build_deck=True)   # straight into Anki as a deck
                    ok += 1
                except Exception as exc:
                    errors.append("%s: %s" % (os.path.basename(p), exc))
            lines.append("Question banks: %d installed and loaded into the Practice deck" % ok)
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
        showInfo(msg, parent=parent, title="Janki: .jank imported")

    if found["apkg"]:
        _import_apkgs(found["apkg"], _rest)
    else:
        _rest({})


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


def _pack_bank(bank_dir: str, dest_dir: str, stem: str, with_matches: bool = True) -> str:
    """Re-pack an installed bank folder as a .qb (zip) for the bundle. with_matches=False
    ships it untagged (tag matches stripped from questions.jsonl)."""
    import zipfile
    out = os.path.join(dest_dir, stem + ".qb")
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
        it.setForeground(1, Qt.GlobalColor.gray)
        group.addChild(it)
        return it

    g_banks = _group("Question banks")
    for b in src["banks"]:
        m = _bank_match_count(b["dir"])
        det = ("%d questions" % b["count"]) if b["count"] else ""
        if m:
            det += (" · " if det else "") + "%d tag-matched" % m
        _leaf(g_banks, b["name"], det, ("bank", b))
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
        _leaf(g_maps, os.path.basename(p), os.path.dirname(p).replace(os.path.expanduser("~"), "~"),
              ("file", p))
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
    g_disk = _group("Added from disk")
    tree.expandAll()

    count = QLabel("")
    count.setStyleSheet("color:#9aa0aa;")

    def _selected():
        sel = []
        for gi in range(tree.topLevelItemCount()):
            g = tree.topLevelItem(gi)
            for ci in range(g.childCount()):
                it = g.child(ci)
                d = it.data(0, ROLE)
                if d and it.checkState(0) == Qt.CheckState.Checked:
                    sel.append(d)
        return sel

    def _refresh(*_a):
        sel = _selected()
        kinds = {}
        for kind, d in sel:
            key = kind
            if kind == "file":
                key = os.path.splitext(d)[1].lower()
            kinds[key] = kinds.get(key, 0) + 1
        nb = kinds.get("bank", 0) + kinds.get(".qb", 0)
        bits = []
        if kinds.get(".apkg"):
            bits.append("%d deck%s" % (kinds[".apkg"], "" if kinds[".apkg"] == 1 else "s"))
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
                _leaf(g_disk, os.path.basename(p),
                      os.path.dirname(p).replace(os.path.expanduser("~"), "~"), ("file", p), True)
        g_disk.setExpanded(True)
        _refresh()

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
            for kind, d in sel:
                if kind == "bank":
                    keep = (opt_matches is None
                            or opt_matches.checkState(0) == Qt.CheckState.Checked)
                    files.append(_pack_bank(d["dir"], tmp, "".join(
                        ch for ch in d["id"] if ch.isalnum() or ch in "._-") or "bank",
                        with_matches=keep))
                elif kind == "rp":
                    files.append(_export_rp(tmp, d))      # d = the set name
                elif kind == "file":
                    files.append(d)
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
    dlg.exec()
