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
import json
import shutil
import zipfile

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
    return man


def remove_bank(bid):
    reg = _load_registry()
    meta = reg["banks"].pop(bid, None)
    if meta:
        shutil.rmtree(os.path.join(_qbanks_dir(), meta["dir"]), ignore_errors=True)
        _Q_CACHE.pop(meta["dir"], None)
        _save_registry(reg)


def list_banks():
    return _load_registry().get("banks", {})


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


def _tokens(text):
    text = re.sub(r"<[^>]+>", " ", text or "").lower()
    return {w for w in re.findall(r"[a-z0-9]+", text)
            if len(w) > 2 and w not in _STOP}


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
    }


def find_for_card(card, limit=5):
    """Return up to `limit` normalized questions related to `card`, best first.
    Prefers concept-tag overlap; falls back to text-token overlap for untagged
    banks/questions."""
    note = card.note()
    card_leaves = _leaf_keys(list(note.tags))
    card_tokens = _tokens((card.question() or "") + " " + (card.answer() or ""))

    scored = []
    for bid, meta in list_banks().items():
        if not meta.get("enabled", True):
            continue
        for q in _bank_questions(meta.get("dir", "")):
            if not isinstance(q, dict) or not q.get("stem"):
                continue
            score = 0.0
            qleaves = _leaf_keys(q.get("tags"))
            inter = card_leaves & qleaves
            if inter:
                score = 10.0 + len(inter)            # tag match wins decisively
            elif card_tokens:
                qtok = _tokens(q.get("stem", ""))
                if qtok:
                    ov = len(card_tokens & qtok) / len(qtok)
                    if ov >= 0.35:
                        score = ov
            if score > 0:
                scored.append((score, q))
    scored.sort(key=lambda x: x[0], reverse=True)
    return [_normalize_q(q) for _s, q in scored[:limit]]


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


def docx_estimate_dialog(on_done=None):
    """Pick a .docx, show how many questions it yields, then (on confirm) build a
    .qb next to it and import it. Untagged → matches by text similarity."""
    from aqt.qt import QFileDialog, QMessageBox
    from aqt.utils import tooltip, showWarning
    path, _ = QFileDialog.getOpenFileName(
        mw, "Estimate .qb from .docx", "", "Word documents (*.docx)")
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
    m.setWindowTitle("Estimate .qb from .docx")
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
    tagged, _tot = retag_from_lecture_map()   # auto-tag from the lecture map
    tooltip("Imported “%s” (%d questions); tagged %d from the lecture map."
            % (man.get("name"), len(qs), tagged))
    if on_done:
        try:
            on_done()
        except Exception:
            pass
