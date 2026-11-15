"""Question-image + answer-image decks (.pptx → .qb).

Some banks are compilations of screenshots from several review books: each question
is a screenshot of the stem and choices, followed (same or next slide) by a screenshot
of the answer and explanation. Every book words its answer differently, so the answer
side is recognised by a handful of openings:

    "The correct answer is: A Anterior cruciate ligament"     (UMich quizzes)
    "16 B. The common fibular nerve…" / "Explanation / A: …"  (Gray's Anatomy Review)
    "117 The answer is D: Inhibition of…"                     (Lippincott)
    "91. A (54, 55) Allopurinol…" / "…The answer is B."       (Katzung)

Images are walked in slide order as a stream: a question opens a block, the answer
opens its answer half, and continuation images (spilled "• D." choices, a lowercase
explanation tail) join the half they continue. Reference pages (First Aid tables)
have neither choices nor an answer and are dropped. The faint A–E glyphs some
screenshots use are usually lost by OCR, so unlabeled choices are the lines after the
stem's last "?"/":", and a letterless answer ("The correct answer is: •Deltoid") is
matched to the choice text."""
import re
import difflib
import collections
import zipfile

L = "ABCDEFGH"
ANS_KW = re.compile(r"(?i)^(the correct answer is|the answer is|explanation\b|answer\s*:)")
ANS_LEAD = re.compile(r"^(?:\d{1,3}\.?\s*)?([A-H])\w?(?:[.:]\s+\S|\s+\(\d)")
CHOICE = re.compile(r"^(?:[•·\-\*]|[Oom0l]\s)?\s*\(?([A-H])[.)]\s*(.+)$")
NUMLINE = re.compile(r"^\d{1,3}\s*\S?\s*$")
ORDER_Q = re.compile(r"(?i)^\w+ order question$")
JUNK = re.compile(r"SECTION III")
MAX_SPAN = 3
VIGNETTE = re.compile(r"(?i)^\s*questions?\s+(\d{1,3})\s*[-–]\s*(\d{1,3})\s*[:.]?")


def VIGNETTE_PARSE(lines):
    m = VIGNETTE.match(lines[0])
    body = " ".join([lines[0][m.end():]] + [x.strip() for x in lines[1:]])
    return int(m.group(1)), int(m.group(2)), re.sub(r"\s+", " ", body).strip()            # slides one question (stem, choices, answer, explanation) may cover


def _sig(lines):
    for x in lines:
        if NUMLINE.match(x) or ORDER_Q.match(x.strip()):
            continue
        return re.sub(r"^\d{1,3}\s+(?=the answer)", "", x.strip(), flags=re.I)
    return ""


SELF_ANS = re.compile(r"^\s*Ans(?:wer)?\s*[:.]\s*([A-H])\b")


def _kind(lines, mode):
    s = _sig(lines)
    if not s or any(JUNK.search(x) for x in lines[:3]):
        return "skip"
    if any(SELF_ANS.match(x) for x in lines) and not CHOICE.match(s):
        return "self"       # stem + "A) …" choices + "Ans: C" on one screenshot
    if ANS_KW.match(s) or re.search(r"(?i)\bthe answer is [A-H]\b", " ".join(lines)):
        return "ans"
    if (mode == "a" and not re.match(r"^\d", lines[0])
            and not any(CHOICE.match(x.strip()) for x in lines)
            and not any(re.search(r"[?:]\s*$", x) for x in lines)):
        return "acont"
    if re.match(r"^(?:[•·]|[Oom0l]\s+[A-H][.)])", s):
        return "qcont"
    if ANS_LEAD.match(re.sub(r"^[a-z]\s+", "", s)) and not s.startswith("("):
        return "ans"
    if re.match(r"^\(?A[.)]", s) and mode == "q":
        return "qcont"
    if s[:1].islower() or s[:1] in ",;)":
        return "acont" if mode == "a" else "qcont"
    if mode == "q" and not re.match(r"^\d", lines[0]):
        return "qcont"
    if len(lines) <= 2 and not any("?" in x for x in lines):
        return "skip"
    return "q"


def _parse_q(lines):
    lines = [x for x in lines if not ORDER_Q.match(x.strip())]
    if lines and NUMLINE.match(lines[0]):
        lines = lines[1:]
    if lines:
        lines[0] = re.sub(r"^[.\s]*\d{0,3}[.)|]?\s+", "", lines[0])
    stem, ch, lab = [], [], False
    for x in lines:
        m = CHOICE.match(x.strip())
        if m and len(ch) < len(L) and m.group(1) == L[len(ch)]:
            ch.append(m.group(2).strip())
            lab = True
        elif ch and lab:
            ch[-1] += " " + x.strip()
        else:
            stem.append(x.strip())
    if not ch:
        i = max((k for k, x in enumerate(stem) if re.search(r"[?:]\s*$", x)), default=None)
        if i is not None and 2 <= len(stem) - i - 1 <= 8:
            ch = [re.sub(r"^[A-H]\s+(?=\S)", "", x) for x in stem[i + 1:]
                  if not re.match(r"^\W*[A-Ha-h]?\W*$", x)]
            stem = stem[:i + 1]
    # a letter glyph read glued to its choice ("EDorsal metatarsal")
    ch = [re.sub(r"^%s(?=[A-Z][a-z])" % L[i], "", c) for i, c in enumerate(ch)]
    ch = [re.sub(r"^[•·=\-–~*]+\s*", "", c) for c in ch]
    return re.sub(r"\s+", " ", " ".join(stem)).strip(), ch


LAB = re.compile(r"^\(?([A-H])\)\s*(?:[S§](?=\s*[a-z]))?\s*(.*)$")


def _self_choices(lines):
    """Stem + "A) …" choices where OCR may put a label on its own line ("B)" then the
    text below) or lose one ("medial cuneiform." between "B) cuboid." and "D)"). Known
    labels on either side say which letter is missing, so an unlabeled line that sits in
    such a gap is that choice; otherwise it continues the previous choice."""
    i0 = next((i for i, x in enumerate(lines) if LAB.match(x.strip())), None)
    if i0 is None:
        return _parse_q(lines)
    stem = re.sub(r"\s+", " ", " ".join(x.strip() for x in lines[:i0]
                                       if len(x.strip()) > 2)).strip()   # not a figure's "R"
    toks = []                       # [letter or None, text]
    for x in lines[i0:]:
        m = LAB.match(x.strip())
        if m:
            toks.append([m.group(1), m.group(2).strip()])
        elif toks and toks[-1][0] and not toks[-1][1]:
            toks[-1][1] = x.strip()          # the text of a label read on its own line
        else:
            toks.append([None, x.strip()])
    labels = [t[0] for t in toks if t[0]]
    out = {}
    last = None
    for j, (lt, tx) in enumerate(toks):
        if lt:
            out[lt] = tx
            last = lt
            continue
        nxt = next((t[0] for t in toks[j + 1:] if t[0]), None)
        want = L[L.index(last) + 1] if last and L.index(last) + 1 < len(L) else None
        if len(tx.strip(" '\".,;")) <= 1:
            continue                         # a checkbox / stray mark read as "S"
        if want and want not in labels and labels and L.index(want) < L.index(labels[-1]) and want not in out and (nxt is None or L.index(want) < L.index(nxt)):
            out[want] = tx
            last = want
        elif last:
            out[last] = (out[last] + " " + tx).strip()
    out = {k: re.sub(r"^[\'\"`•·=]\s*", "", v) for k, v in out.items()}
    n = max((L.index(k) for k in out), default=-1) + 1
    ch = [out.get(L[i], "") for i in range(n)]
    return stem, ch


def _norm(t):
    return re.sub(r"[^a-z0-9 ]", "", t.lower()).strip()


def _q_number(lines):
    for x in lines[:3]:
        m = re.match(r"^\s*\.?\s*(\d{1,3})\s*[.)]?(?:\s|$)", x)
        if m and not re.match(r"(?i)^\s*\d+\s*(year|yo|mg|%)", x):
            return int(m.group(1))
    return None


_KEY_ENTRY = r"(?:^|(?<=\s))%d\s*[.)]?\s*(?:The\s+)?(?:correct\s+)?(?:Answer\s+is\s*:?\s*)?\(?([A-H])\b[).:]?"


def _keyed_answer(txt, num):
    """An answer panel with several numbered entries ("3. The Answer is D. … 4. The
    Answer is A. …"): the entry for question `num`, and its text up to the next entry."""
    if num is None:
        return None, None
    entries = list(re.finditer(
        r"(?:^|(?<=\s))(\d{1,3})\s*[.)]?\s*(?:(?i:(?:The\s+)?(?:correct\s+)?Answer\s+is)\s*:?\s*\(?([A-H])\b"
        r"|([A-H])\w?[.:]\s+(?=[A-Z(]))", txt))
    entries = [m for m in entries if m.group(2) or m.group(3)]
    if not entries:
        return None, None
    for i, m in enumerate(entries):
        if int(m.group(1)) == num:
            end = entries[i + 1].start() if i + 1 < len(entries) else len(txt)
            return (m.group(2) or m.group(3)).upper(), txt[m.start():end].strip()
    return None, ""          # a panel of other questions' answers: none of them is ours


def _parse_a(lines, choices, num=None):
    txt = re.sub(r"\s+", " ", " ".join(x.strip() for x in lines)).strip()
    kl, kt = _keyed_answer(txt, num)
    if kl:
        return kl, kt
    if kt == "":
        # the panel numbers its answers and none is this question's. An entry whose
        # number OCR lost ("A. The talocrural…") is ours; otherwise leave it unanswered
        # (flagged) — taking another question's answer would be wrong
        for i, x in enumerate(lines if not re.search(r"(?i)answer is", txt) else []):
            m = re.match(r"^([A-H])[.:]\s+[A-Z]", x.strip())
            if m and not (i and re.match(r"^\d{1,3}\s*\S?$", lines[i - 1].strip())):
                return m.group(1), re.sub(r"\s+", " ", " ".join(y.strip() for y in lines[i:]))
        return None, txt
    sg = re.sub(r"^[a-z]\s+", "", _sig(lines))
    m = (re.search(r"(?i)correct answer is:?\s*([A-H])\b(?!\w)", txt)
         or re.search(r"(?i)answer is:?\s*([A-H])\b", txt)
         or ANS_LEAD.match(sg)
         or re.search(r"(?i)^explanation\s+([A-H])\s*:", txt))
    letter = m.group(1).upper() if m else None
    if not letter or (choices and L.index(letter) >= len(choices)):
        letter = None
        mm = re.search(r"(?i)answer is:?\s*[^\w]*(.{3,80})", txt)
        if mm and choices:
            head = _norm(mm.group(1))
            hits = [(len(_norm(c)), i) for i, c in enumerate(choices)
                    if _norm(c) and head.startswith(_norm(c))]
            if hits:
                letter = L[max(hits)[1]]
            else:
                keys = [_norm(c)[:30] for c in choices]
                best = difflib.get_close_matches(head[:30], keys, 1, 0.6)
                if best:
                    letter = L[keys.index(best[0])]
    return letter, txt


def _title_runs(pptx_path):
    """slide index (0-based, as the importer's slide ids) → (lecture, source) from the
    title placeholder's first two text runs."""
    out = {}
    z = zipfile.ZipFile(pptx_path)
    sx = sorted((n for n in z.namelist() if re.match(r"ppt/slides/slide\d+\.xml$", n)),
                key=lambda n: int(re.search(r"(\d+)\.xml$", n).group(1)))
    for i, n in enumerate(sx):
        xml = z.read(n).decode("utf-8", "ignore")
        for sp in re.findall(r"<p:sp>.*?</p:sp>", xml, re.S):
            if not re.search(r'<p:ph\b[^>]*type="(?:ctrTitle|title)"', sp):
                continue
            runs = [re.sub(r"\s+", " ", r).replace("&amp;", "&").strip()
                    for r in re.findall(r"<a:t>([^<]*)</a:t>", sp)]
            runs = [r for r in runs if r]
            if runs:
                out[i] = (runs[0], runs[1] if len(runs) > 1 else "")
            break
    return out


FIG_REF = re.compile(r"(?i)\b(in the following|arrow|radiograph|MRI|CT\b|photograph|illustration|"
                     r"arteriogram|figure|fig\.|image)")


def _cover_fraction(pptx_path, sid):
    """On a self-answering slide a filled box hides "Ans: X" until clicked. → the box's
    top as a fraction of the screenshot's height (crop there), or None."""
    z = zipfile.ZipFile(pptx_path)
    sx = sorted((n for n in z.namelist() if re.match(r"ppt/slides/slide\d+\.xml$", n)),
                key=lambda n: int(re.search(r"(\d+)\.xml$", n).group(1)))
    xml = z.read(sx[sid]).decode("utf-8", "ignore")
    geo = lambda el: [int(v) for v in re.search(
        r'<a:off x="(-?\d+)" y="(-?\d+)"/>\s*<a:ext cx="(\d+)" cy="(\d+)"', el).groups()]
    pics = [geo(e) for e in re.findall(r"<p:pic>.*?</p:pic>", xml, re.S)]
    boxes = [geo(e) for e in re.findall(r"<p:sp>.*?</p:sp>", xml, re.S)
             if "<a:solidFill>" in e and not re.search(r"<a:t>[^<]*\w", e)]
    if len(pics) != 1 or not boxes:
        return None
    px, py, pw, ph = pics[0]
    for bx, by, bw, bh in boxes:
        if bx < px + pw and bx + bw > px and py < by < py + ph:
            return (by - py) / float(ph)
    return None


def _crop_top(src, frac):
    """Copy of `src` keeping the top `frac` of it (Qt, so it works on Windows too)."""
    try:
        from aqt.qt import QImage
        img = QImage(src)
        if img.isNull():
            return None
        h = max(1, int(img.height() * frac) - 2)
        out = re.sub(r"(\.\w+)$", r"_q\1", src)
        if img.copy(0, 0, img.width(), h).save(out):
            return out
    except Exception:
        pass
    return None


_QSTART = re.compile(r"^(\d{1,3})(?:\s*$|\s+(?=[A-Z]))")


def _split_multi(lines):
    """A screenshot of a book page with several consecutive questions ("5 …", "6 …")
    → one line list per question. Returned unchanged unless ≥2 consecutive numbers
    each start a question and each part has choices."""
    starts = []
    for i, x in enumerate(lines):
        m = _QSTART.match(x.strip())
        if m:
            n = int(m.group(1))
            if not starts or n == starts[-1][1] + 1:
                starts.append((i, n))
    if len(starts) < 2 or starts[0][0] > 2:
        return [lines]
    parts = [lines[a:(starts[j + 1][0] if j + 1 < len(starts) else len(lines))]
             for j, (a, _n) in enumerate(starts)]
    if starts[0][0]:
        parts[0] = lines[:starts[0][0]] + parts[0]
    if not all(any(CHOICE.match(x.strip()) for x in pt) for pt in parts):
        return [lines]
    return parts


def parse(pptx_path, blocks):
    """blocks = [(path, [lines], category, slide_id), …] → (good, detected, incomplete),
    in the same shape as qbank._parse_ocr_blocks."""
    try:
        titles = _title_runs(pptx_path)
    except Exception:
        titles = {}
    items, cur, mode = [], None, None
    open_qs, ablock, vig, seen = [], None, None, set()
    flat = []
    for p, lines, _cat, sid in blocks:
        lines = [x for x in lines if x.strip()]
        parts = _split_multi(lines) if _kind(lines, "q") == "q" else [lines]
        flat += [(p, pt, _cat, sid) for pt in parts]
    for p, lines, _cat, sid in flat:
        k = _kind(lines, mode)
        # one question never spans more than 3 slides: a continuation further on than
        # that is a new question (stops a misread format swallowing a whole section)
        if (cur is not None and k in ("qcont", "acont") and isinstance(sid, int)
                and isinstance(cur.get("sid"), int) and sid - cur["sid"] >= MAX_SPAN):
            k = "q" if any(re.search(r"[?:]\s*$", x) for x in lines) or mode != "a" else "skip"
        if lines and VIGNETTE.match(lines[0]):
            vig = VIGNETTE_PARSE(lines)          # "Questions 16-20: <shared case>"
            continue
        if k != "self" and re.match(r"^\d{1,3}[.)]\s+\S", lines[0] if lines else "") \
                and not ANS_KW.match(_sig(lines)) and not re.search(r"(?i)\banswer is\b", lines[0]) \
                and (any("?" in x for x in lines) or any(CHOICE.match(x.strip()) for x in lines)):
            k = "q"                              # a numbered stem with choices opens a question
        key = " ".join(lines[:3])[:120]
        if k in ("q", "self") and key in seen:
            continue                             # the same screenshot shown again
        if k in ("q", "self"):
            seen.add(key)
        if k == "skip":
            continue
        if k == "self":
            cur = {"q": list(lines), "a": [], "sid": sid, "src": p, "self": True}
            items.append(cur)
            mode = "s"
            continue
        if mode == "s" and k in ("qcont", "acont"):
            if not re.search(r"[A-Za-z]{3}", " ".join(lines)) or len(lines) <= 2:
                cur.setdefault("figs", []).append(p)     # the figure the stem points to
            continue
        if k == "q" or (k == "qcont" and (cur is None or mode == "a")):
            if mode == "a":
                open_qs = []
            cur = {"q": list(lines), "a": None, "sid": sid, "src": p}
            n = _q_number(lines)
            if vig and n is not None and vig[0] <= n <= vig[1]:
                cur["vig"] = vig[2]
            items.append(cur)
            open_qs.append(cur)
            mode = "q"
        elif k == "qcont":
            cur["q"] += lines
        elif k == "ans":
            if mode != "a":
                ablock = []                      # one answer panel serves every waiting question
                for it in open_qs or [None]:
                    if it is None:
                        it = {"q": [], "a": None, "sid": sid, "src": p}
                        items.append(it)
                    it["a"] = ablock
                    it.setdefault("asrc", p)
                open_qs = []
            ablock += lines
            mode = "a"
        elif k == "acont" and ablock is not None:
            ablock += lines
    shared = collections.Counter(id(it["a"]) for it in items if it.get("a") is not None)
    good, incomplete, detected = [], [], 0
    for it in items:
        if it.get("self"):
            ql, letter, expl, seen_ans = [], None, [], False
            for x in it["q"]:
                m = SELF_ANS.match(x)
                if m:
                    letter, seen_ans = m.group(1), True
                elif seen_ans:
                    expl.append(x.strip())
                else:
                    ql.append(x)
            # a note after the last choice ("One of them is part of the pes anserinus.")
            k = max((i for i, x in enumerate(ql) if LAB.match(x.strip())), default=-1)
            if k >= 0 and LAB.match(ql[k].strip()).group(2):
                first = k + 1           # the last choice's text is on its label line
            else:
                first = k + 2           # a bare "E)": its text is the next line
            while k >= 0 and len(ql) > first and ql[-1][:1].isupper() and not LAB.match(ql[-1].strip()):
                expl.insert(0, ql.pop().strip())
            stem, ch = _self_choices(ql)
            expl = " ".join(expl)
        else:
            stem, ch = _parse_q(it["q"])
            letter, expl = _parse_a(it["a"] or [], ch, _q_number(it["q"]))
            if it.get("vig"):
                stem = (it["vig"] + " " + stem).strip()
        if letter is None:      # inline "Ans: A" in the question screenshot
            mm = re.search(r"Ans:\s*([A-H])", " ".join(it["q"]))
            if mm:
                letter = mm.group(1)
                ch = [re.sub(r"\s*Ans:\s*[A-H]\s*$", "", c) for c in ch]
        if not ch and (not letter or not (it.get("a") and ANS_KW.match(_sig(it["a"])))
                       or shared[id(it["a"])] > 1):
            continue            # a reference page / stray explanation, not a question
        if not letter and (not ch or (not it.get("self") and not it.get("a"))):
            continue            # a reference page / reading guide, not a question
        detected += 1
        sid = it["sid"]
        lecture, source = titles.get(sid, ("", ""))
        q = {"stem": stem, "choices": ch,
             "answer": L.index(letter) if letter and L.index(letter) < len(ch) else None,
             "explanation": expl, "lecture": lecture, "objective": "",
             "tags": [], "source": source or "bank",
             "_slide_src": it["src"], "slide_no": (sid + 1) if isinstance(sid, int) else None}
        q["_qnum"] = None if it.get("self") else _q_number(it["q"])
        if it.get("asrc"):
            q["_ans_slide_src"] = it["asrc"]
        if it.get("figs"):
            q["_media_paths"] = list(it["figs"])
        elif it.get("self") and FIG_REF.search(stem) and isinstance(sid, int):
            try:    # the picture is inside the screenshot: show it, minus the answer
                fr = _cover_fraction(pptx_path, sid)
                crop = _crop_top(it["src"], fr) if fr else None
                if crop:
                    q["_media_paths"] = [crop]
            except Exception:
                pass
        if q["stem"] and len(ch) >= 2 and q["answer"] is not None:
            q["id"] = "q%d" % (len(good) + 1)
            good.append(q)
        else:
            why = []
            if not q["stem"]:
                why.append("no stem")
            if len(ch) < 2:
                why.append("only %d choice(s)" % len(ch))
            if q["answer"] is None:
                why.append("no answer matched")
            q["incomplete"] = ", ".join(why)
            q["_media_paths"] = [it["src"]]
            q["id"] = "x%d" % (len(incomplete) + 1)
            incomplete.append(q)
    return good, detected, incomplete


def _key(q):
    return re.sub(r"[^a-z0-9]", "", (q.get("stem") or "").lower())[-60:]


def _support(q):
    """How well a question's explanation backs its marked answer: share of the answer
    choice's words (4+ letters) that the explanation mentions; -1 with no explanation."""
    ch, a = q.get("choices") or [], q.get("answer")
    ex = (q.get("explanation") or "").lower()
    if not isinstance(a, int) or not (0 <= a < len(ch)) or not ex:
        return -1.0
    w = [x for x in re.findall(r"[a-z]{4,}", ch[a].lower())]
    if re.search(r"\bAns:\s*[A-H]", ch[a]) or any(re.search(r"\bAns:\s*[A-H]", c) for c in ch):
        return -2.0                      # an answer key read as part of a choice
    return sum(1 for x in w if x in ex) / float(len(w)) if w else 0.0


def merge(orig, paired):
    """Combine the generic parser's result with this one's, question by question:
    every question either finds is kept; when both find the same question (same stem)
    the one whose explanation better supports its answer wins (ties: the generic one,
    which carries its own figure handling). Each is (good, detected, incomplete)."""
    og, _od, oi = orig
    pg, _pd, pi = paired
    by = {}
    for q in og:
        by.setdefault(_key(q), q)
    alt = {(q.get("slide_no"), tuple(_norm(c) for c in q.get("choices") or [])): _key(q) for q in og}
    for q in pg:
        k = _key(q)
        ak = alt.get((q.get("slide_no"), tuple(_norm(c) for c in q.get("choices") or [])))
        if k not in by and ak in by:
            o = by[ak]
            if (q.get("answer") == o.get("answer") and len(q.get("stem") or "") > len(o.get("stem") or "")):
                q.setdefault("_media_paths", o.get("_media_paths") or [])
                by[ak] = q              # same question, ours carries the shared case text
            continue
        o = by.get(k)
        if o is None:
            by[k] = q
        elif _support(q) > _support(o):
            if not q.get("_media_paths") and o.get("_media_paths"):
                q["_media_paths"] = o["_media_paths"]
            by[k] = q
        elif not o.get("lecture") and q.get("lecture"):
            o["lecture"] = q["lecture"]
    good = sorted(by.values(), key=lambda q: (q.get("slide_no") or 0))
    have = set(by)
    inc, seen = [], set()
    good_slides = {q.get("slide_no") for q in good}
    for q in list(oi) + list(pi):
        k = _key(q)
        if k in have or k in seen or q.get("slide_no") in good_slides:
            continue
        if q in oi and (len(q.get("choices") or []) < 2 or not re.search(r"[?:]", q.get("stem") or "")):
            continue            # the generic parser's reading of a reference page
        seen.add(k)
        inc.append(q)
    inc.sort(key=lambda q: (q.get("slide_no") or 0))
    for q in list(good) + list(inc):
        q.pop("_qnum", None)
    for i, q in enumerate(good):
        q["id"] = "q%d" % (i + 1)
    for i, q in enumerate(inc):
        q["id"] = "x%d" % (i + 1)
    return good, len(good) + len(inc), inc
