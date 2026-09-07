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
import difflib
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


def assign_deck_tags_from_headers(family="AJ_UCCOM_keep"):
    """Confidence-gated pass: stamp each question's best-matching <family> lecture
    tag (from its .qb lecture header) onto the question. Returns (tagged, total)."""
    lec = _lectures()
    if lec is None:
        return (0, 0)
    fam_tags = _family_tags(family)
    if not fam_tags:
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
                cache[L] = _best_deck_tag(lec, L, fam_tags)
            dt = cache[L]
            if dt:
                cur = q.get("tags") or []
                if dt not in cur:
                    q["tags"] = sorted(set(cur) | {dt})
                    changed = True
                tagged += 1
        if changed:
            _rewrite_bank(dir_name, qs)
    return tagged, total


def build_tagging_prompt(bids, include_choices=False, include_answer=False,
                         branches=None, concepts=True, hutch_on=True, aj_on=True):
    """Build the paste-into-an-AI prompt for the given bank ids. The candidate
    list is fully modular — each part can be toggled to trade coverage for tokens:
      • concepts   — AnKing #Subjects concept leaves (optionally limited to
                     `branches`, a set of subject-block names, else all).
      • hutch_on   — full hUtChCOM tags.
      • aj_on      — full AJ_UCCOM_keep tags.
      • include_choices — add ALL MCQ options to each question (biggest).
      • include_answer  — add only the CORRECT option (cheaper; often names the
                          diagnosis). Ignored when include_choices is on.
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
    qids = [qid for _L, items in groups for qid, _q in items]
    ex1 = qids[0] if qids else ((bids[0] + "#1") if bids else "bank#1")
    ex2 = qids[1] if len(qids) > 1 else ex1
    ex_tag = (concept_leaves[0] if concept_leaves else
              hutch[0] if hutch else aj[0] if aj else "Some_Concept")

    out = [_prompt_header(sections, ex1, ex2, ex_tag), "\n" + "=" * 64,
           "CANDIDATE TAGS"]
    if concept_leaves:
        out.append("\n-- Concepts (AnKing #Subjects) — return the name exactly --")
        out.extend("- %s" % t for t in concept_leaves)
    if hutch:
        out.append("\n-- Hutch (hUtChCOM) — return the full tag exactly --")
        out.extend("- %s" % t for t in hutch)
    if aj:
        out.append("\n-- AJ (AJ_UCCOM_keep) — return the full tag exactly --")
        out.extend("- %s" % t for t in aj)

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
    for c in (cb_concepts, cb_hutch, cb_aj, cb_answer, cb_choices):
        inc_v.addWidget(c)

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
    bank_row.addWidget(_dropdown("Concept subject blocks", scroll))
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
        return dict(include_choices=cb_choices.isChecked(),
                    include_answer=cb_answer.isChecked(),
                    concepts=cb_concepts.isChecked(),
                    hutch_on=cb_hutch.isChecked(), aj_on=cb_aj.isChecked(),
                    branches=sel_branches)

    def _build():
        prompt, stats = build_tagging_prompt(_selected_bids(), **_params())
        if stats["questions"] == 0:
            showWarning("No questions in the selected bank(s).")
            return None
        return prompt, stats

    def _refresh(*_a):
        for cb in branch_cbs.values():
            cb.setEnabled(cb_concepts.isChecked())
        cb_answer.setEnabled(not cb_choices.isChecked())  # choices supersede answer
        try:
            prompt, stats = build_tagging_prompt(_selected_bids(), **_params())
        except Exception:
            est.setText(""); return
        extra = ("  · +choices" if cb_choices.isChecked()
                 else "  · +answer" if cb_answer.isChecked() else "")
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
    for w in (cb_concepts, cb_hutch, cb_aj, cb_answer, cb_choices,
              *branch_cbs.values()):
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
# Clicking a choice on the FRONT reacts within that box: green if it is the
# correct answer, red if not (and the correct one is outlined green so a wrong
# pick still teaches). The correct choice is marked with .jp-correct in the
# markup (the same class the BACK uses for its blue highlight), so the handler
# just reads it. Locks after the first pick.
_FRONT_JS = (
    "(function(){var box=document.getElementById('jp-choices');if(!box)return;"
    "var cs=box.querySelectorAll('.jp-choice');var done=false;"
    "cs.forEach(function(el){el.classList.add('jp-clickable');"
    "el.addEventListener('click',function(){if(done)return;done=true;"
    "box.classList.add('jp-locked');"
    "var ok=el.classList.contains('jp-correct');el.classList.add('jp-picked');"
    "el.classList.add(ok?'jp-right':'jp-wrong');"
    "if(!ok){var r=box.querySelector('.jp-choice.jp-correct');"
    "if(r)r.classList.add('jp-reveal');}});});})();"
)
_FRONT_TMPL = ('<div class="jp-stem">{{Question}}</div>\n'
               '<div class="jp-choices" id="jp-choices">{{Choices}}</div>\n'
               '<script>' + _FRONT_JS + '</script>')
_BACK_TMPL = ('<div class="jp-answered">{{FrontSide}}</div>\n'
              '{{#Explanation}}<div class="jp-explain">'
              '<div class="jp-explain-h">Explanation / Rationale</div>'
              '{{Explanation}}</div>{{/Explanation}}')
# Choice boxes fade/slide in one-by-one on the FRONT (a reveal touch that matches
# the text-scroll); on the BACK (.jp-answered) the animation is disabled so the
# highlighted answer is visible immediately.
_CARD_CSS = (
    ".card{font-family:\"Anthropic Serif Text\",Georgia,serif;font-size:20px;"
    "text-align:left;color:#ececec;background-color:#1c1d21;max-width:760px;"
    "margin:0 auto;padding:26px;}"
    ".jp-stem{margin-bottom:18px;line-height:1.5;}"
    ".jp-stem img{max-width:100%;border-radius:8px;margin-top:10px;}"
    ".jp-choice{padding:8px 12px;margin:6px 0;border-radius:8px;"
    "border:1px solid rgba(255,255,255,0.08);}"
    ".jp-answered .jp-choice.jp-correct{background:rgba(74,144,255,0.28);"
    "border-color:rgba(74,144,255,0.6);color:#dbe8ff;font-weight:600;}"
    # Interactive front: click a choice to react green (right) / red (wrong).
    ".jp-choice.jp-clickable{cursor:pointer;transition:background .15s,border-color .15s;}"
    ".jp-choices:not(.jp-locked) .jp-choice:hover{background:rgba(255,255,255,0.06);}"
    ".jp-locked .jp-choice{cursor:default;}"
    ".jp-choice.jp-right{background:rgba(56,178,102,0.30);"
    "border-color:rgba(56,178,102,0.75);color:#d6f5e0;font-weight:600;}"
    ".jp-choice.jp-wrong{background:rgba(224,74,74,0.30);"
    "border-color:rgba(224,74,74,0.75);color:#ffdede;font-weight:600;}"
    ".jp-choice.jp-reveal{border-color:rgba(56,178,102,0.75);"
    "box-shadow:inset 0 0 0 1px rgba(56,178,102,0.55);}"
    # Opacity-only (no transform): a translate creates a composited layer whose
    # collapse at animation end repaints the region and re-triggers the AMBOSS
    # underline fade (visible flicker). Fading opacity avoids that entirely.
    "@keyframes jpIn{from{opacity:0;}to{opacity:1;}}"
    ".jp-choices .jp-choice{animation:jpIn .3s ease-out backwards;}"
    ".jp-choices .jp-choice:nth-child(1){animation-delay:.18s;}"
    ".jp-choices .jp-choice:nth-child(2){animation-delay:.34s;}"
    ".jp-choices .jp-choice:nth-child(3){animation-delay:.50s;}"
    ".jp-choices .jp-choice:nth-child(4){animation-delay:.66s;}"
    ".jp-choices .jp-choice:nth-child(5){animation-delay:.82s;}"
    ".jp-choices .jp-choice:nth-child(6){animation-delay:.98s;}"
    ".jp-choices .jp-choice:nth-child(7){animation-delay:1.14s;}"
    ".jp-choices .jp-choice:nth-child(8){animation-delay:1.30s;}"
    ".jp-answered .jp-choices .jp-choice{animation:none;}"
    # Explanation / rationale at the bottom of the back.
    ".jp-explain{margin-top:22px;padding-top:16px;line-height:1.5;"
    "border-top:1px solid rgba(255,255,255,0.12);white-space:pre-line;"
    "color:#cfd3da;font-size:0.94em;}"
    ".jp-explain-h{font-weight:600;color:#9fb4d8;margin-bottom:8px;"
    "letter-spacing:.02em;text-transform:uppercase;font-size:0.78em;}"
)


def _ensure_model():
    mm = mw.col.models
    m = mm.by_name(_MODEL_NAME)
    if m:
        # Keep CSS/template in sync with the current add-on version (so template
        # changes like the choice-reveal animation reach already-converted decks).
        changed = False
        if m.get("css") != _CARD_CSS:
            m["css"] = _CARD_CSS
            changed = True
        try:
            t = m["tmpls"][0]
            if t.get("qfmt") != _FRONT_TMPL or t.get("afmt") != _BACK_TMPL:
                t["qfmt"] = _FRONT_TMPL
                t["afmt"] = _BACK_TMPL
                changed = True
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
    for f in ("Question", "Choices", "Explanation", "QID"):
        mm.add_field(m, mm.new_field(f))
    t = mm.new_template("Practice")
    t["qfmt"] = _FRONT_TMPL
    t["afmt"] = _BACK_TMPL
    mm.add_template(m, t)
    m["css"] = _CARD_CSS
    mm.add(m)
    return m


def _choices_html(q):
    from html import escape
    ch = q.get("choices") or []
    ci = _correct_index(q)
    rows = []
    for j, c in enumerate(ch):
        cls = "jp-choice jp-correct" if j == ci else "jp-choice"
        rows.append('<div class="%s">%s. %s</div>'
                    % (cls, chr(65 + j), escape(_plain(c))))
    return "\n".join(rows)


def _stem_html(q, dir_name):
    from html import escape
    html = escape(_plain(q.get("stem", "")))
    for name in (q.get("media") or []):
        src = os.path.join(_qbanks_dir(), dir_name, "media", name)
        if os.path.isfile(src):
            try:
                fn = mw.col.media.add_file(src)
                html += '<div><img src="%s"></div>' % fn
            except Exception:
                pass
    return html


def convert_bank_to_deck(bid):
    """Upsert one bank into Practice::<bank>. Returns (added, updated)."""
    meta = list_banks().get(bid)
    if not meta:
        return (0, 0)
    m = _ensure_model()
    name = (meta.get("name") or bid).replace("::", "-")
    did = mw.col.decks.id("Practice::" + name)
    dir_name = meta.get("dir", "")
    added = updated = 0
    ordinal = 0
    for q in _bank_questions(dir_name):
        if not isinstance(q, dict) or not q.get("stem"):
            continue
        ordinal += 1
        qid = _safe("%s_%d" % (bid, ordinal))
        fields = {"Question": _stem_html(q, dir_name),
                  "Choices": _choices_html(q),
                  "Explanation": _plain(q.get("explanation", "")),
                  "QID": qid}
        tags = [str(t) for t in (q.get("tags") or [])]
        nids = mw.col.find_notes('note:"%s" QID:%s' % (_MODEL_NAME, qid))
        if nids:
            note = mw.col.get_note(nids[0])
            for k, val in fields.items():
                note[k] = val
            note.tags = tags
            mw.col.update_note(note)
            updated += 1
        else:
            note = mw.col.new_note(m)
            for k, val in fields.items():
                note[k] = val
            note.tags = tags
            mw.col.add_note(note, did)
            added += 1
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
        assign_deck_tags_from_headers()   # deterministic AJ lecture tags first
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
    showInfo("Practice deck updated:\n%d new card(s), %d updated." % (tot_a, tot_u))
    if on_done:
        try:
            on_done()
        except Exception:
            pass


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
    retag_from_lecture_map()                   # M1 calendar map (if it matches)
    deck_tagged, _t = assign_deck_tags_from_headers()   # deterministic AJ tags
    tooltip("Imported “%s” (%d questions); assigned %d school-deck tag(s) from "
            "lecture headers." % (man.get("name"), len(qs), deck_tagged))
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


def build_lo_tagmap_prompt(lectures, branches=None, hutch_on=True, aj_on=True,
                           max_objectives=12):
    """Prompt that maps each lecture (title + objectives) to local tags. Concepts
    are offered as #Subjects leaf names (compact; expanded back on apply); AJ/Hutch
    as full lecture-tag paths (often a 1:1 match for a lecture). Returns
    (prompt, stats)."""
    if branches is None:
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


def write_lo_tagmap(reply_path):
    """Read the AI's lecture→tag JSON reply, expand concept-leaf names to full
    collection tags, and write a proper lecture→tag map JSON into user_files.
    Returns (map_path, lectures_written, tags_kept, tags_dropped)."""
    with open(reply_path, encoding="utf-8") as f:
        raw = f.read().strip()
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

    out_path = os.path.join(os.path.dirname(_qbanks_dir()), "lecture_tagmap.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(out_map, f, ensure_ascii=False, indent=2)
    return out_path, len(out_map), kept, dropped
