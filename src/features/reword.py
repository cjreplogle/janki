"""Reword — show cards phrased differently from their stored text.

Goal: stop memorising the exact wording/sentence structure of a card and instead learn
the underlying content, by presenting alternately-phrased versions of the same card.

Core design principle — **same data-space as the original card**: rewording is purely a
DISPLAY transform applied in the ``card_will_show`` hook. It never edits the note's
fields, never creates new notes/cards, and never touches the scheduler. So answering a
reworded card has the exact same effect as answering the original, and Anki's counts /
queues behave as if there were only the one card. If rewording is disabled or no variant
exists, the original text is shown verbatim.

This module is the GROUNDWORK: local variant storage, gating, the display swap, and a
pluggable generation seam. The actual paraphrase generator (``_generate``) is a stub
here — it MUST be a local/on-device backend when implemented (card text may never leave
the machine; see the memory note "anki data stays local"). Candidate backends: Apple's
on-device FoundationModels (macOS 26, mirrors the native Vision OCR used for practice
imports) or a user-run local LLM endpoint. No network calls belong here.

Storage: ``user_files/rewords.json`` — a dict keyed by ``<note_id>:<card_ord>:<side>``.
Each record carries the source-text hash so an edit to the card auto-invalidates its
stale rewords (we only show a variant when its stored hash still matches the live text).
"""

import os
import re
import sys
import json
import time
import shutil
import difflib
import hashlib

from aqt import mw

from ..util.config import log, _cfg


# --------------------------------------------------------------------------- paths
def _store_path() -> str:
    root = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))  # → addon root
    d = os.path.join(root, "user_files")
    os.makedirs(d, exist_ok=True)
    return os.path.join(d, "rewords.json")


# --------------------------------------------------------------------------- store
# Loaded lazily and cached; written back on every mutation. Small enough to keep in mem.
_store = None


def _load() -> dict:
    global _store
    if _store is not None:
        return _store
    try:
        with open(_store_path(), encoding="utf-8") as f:
            _store = json.load(f)
        if not isinstance(_store, dict):
            _store = {}
        _sanitize_store(_store)
    except Exception:
        _store = {}
    return _store


def _sanitize_store(store: dict) -> None:
    """Drop any stored variants that look like leaked CSS/JS (the old list bug) or leaked
    instruction/prompt text, so a glitched reword never displays; the card just re-generates a
    clean one later. Records with no "html" flag are plain-text variants (e.g. from a .rp import)
    and are kept — never dropped just for lacking that flag."""
    changed = False
    for key, rec in list(store.items()):
        vs = rec.get("variants") if isinstance(rec, dict) else None
        if not vs:
            continue
        clean = [v for v in vs
                 if not _CODEISH_RE.search(v or "") and not _LEAK_RE.search(v or "")]
        if len(clean) != len(vs):
            changed = True
            if clean:
                rec["variants"] = clean
            else:
                store.pop(key, None)
    if changed:
        try:
            with open(_store_path(), "w", encoding="utf-8") as f:
                json.dump(store, f, ensure_ascii=False)
        except Exception:
            pass


def _save() -> None:
    try:
        with open(_store_path(), "w", encoding="utf-8") as f:
            json.dump(_load(), f, ensure_ascii=False)
    except Exception as exc:
        log(f"reword save: {exc}")


# --------------------------------------------------------------------------- helpers
def _enabled() -> bool:
    return bool(_cfg().get("reword_enabled", False))


# "Peek": a manual show/hide override. While on, force a rephrasing to display even when
# Reword mode is off and regardless of review count (the Tools ▸ "Show rephrased card"
# toggle). Off → normal behavior (Reword-mode + first-exposure-is-original).
_peek = False


def set_peek(on: bool) -> None:
    global _peek
    _peek = bool(on)


def peek_on() -> bool:
    return _peek


def _side_of(kind) -> "str | None":
    """Map a card_will_show `kind` to 'q'/'a', or None for sides we don't reword."""
    if not isinstance(kind, str):
        return None
    k = kind.lower()
    if "question" in k:
        return "q"
    if "answer" in k:
        return "a"
    return None


def _plain(html: str) -> str:
    """Collapse rendered card HTML to comparable plain text (for hashing + as the source
    the generator paraphrases). Not used to render — display keeps full HTML."""
    if not html:
        return ""
    txt = re.sub(r"(?is)<(script|style).*?</\1>", " ", html)
    txt = re.sub(r"(?is)<br\s*/?>", "\n", txt)
    txt = re.sub(r"(?is)<[^>]+>", " ", txt)
    txt = re.sub(r"&nbsp;", " ", txt)
    txt = re.sub(r"\s+", " ", txt).strip()
    return txt


_IMG_RE = re.compile(r"(?is)<img\b[^>]*>")


def _rich(html: str) -> str:
    """Formatting-PRESERVING text extraction: keep the card's block/line structure (newlines,
    list bullets, headings on their own line) so the generator can SEE and preserve its shape
    instead of a flattened run-on. Scripts/styles and IMAGES are dropped (photos aren't
    reworded). This is what the model paraphrases; `_plain` is still used for hashing/keys."""
    if not html:
        return ""
    import html as _htmlmod
    h = _strip_noncontent(html)
    h = _IMG_RE.sub(" ", h)
    h = re.sub(r"(?is)<li\b[^>]*>", "\n• ", h)                       # bullet each item
    h = re.sub(r"(?is)<br\s*/?>", "\n", h)
    h = re.sub(r"(?is)</(p|div|h[1-6]|tr|li|ul|ol|section|header|blockquote)\s*>", "\n", h)
    h = re.sub(r"(?is)<[^>]+>", " ", h)                                   # drop remaining tags
    h = h.replace("&nbsp;", " ")
    try:
        h = _htmlmod.unescape(h)
    except Exception:
        pass
    out = []
    for ln in h.split("\n"):
        ln = re.sub(r"[ \t]+", " ", ln).strip()
        if ln.startswith("•"):
            body = ln.lstrip("•").strip()
            if body:
                out.append("• " + body)
        elif ln:
            out.append(ln)
    return "\n".join(out)


def _hash(text: str) -> str:
    return hashlib.sha1(text.encode("utf-8", "replace")).hexdigest()


def _key(note_id, ord_, side: str) -> str:
    return f"{int(note_id)}:{int(ord_)}:{side}"


# --------------------------------------------------------------------------- variant selection
# Cards shown (question side) at least once THIS SESSION, and the original-vs-reworded
# decision made for the current exposure (so the answer side matches its question side).
_shown_q = set()
_orig_exposure = {}


def _pick(variants, card) -> "str | None":
    """Pick which stored phrasing to show, rotating by review count so a card cycles through
    its phrasings over successive reviews (stable within a single view)."""
    if not variants:
        return None
    try:
        reps = int(getattr(card, "reps", 0))
    except Exception:
        reps = 0
    idx = (reps - 1) % len(variants) if reps > 0 else 0
    return variants[idx]


# --------------------------------------------------------------------------- display hook
def apply(text: str, card, kind) -> str:
    """card_will_show transform: swap in a reworded phrasing when one exists and is still
    valid for the current text. DISPLAY-ONLY — the note/scheduler are untouched, so the
    card answers exactly as the original. Returns `text` unchanged on any miss/disabled."""
    cid = getattr(card, "id", 0)
    if not _enabled() and not _peek and cid not in _cycle:
        return text
    side = _side_of(kind)
    if side is None:
        return text
    try:
        note = card.note()
        rec = _load().get(_key(note.id, card.ord, side))
        if not rec:
            return text
        if rec.get("src") != _hash(_plain(text)):
            return text            # card was edited since → stale, show original
        variants = rec.get("variants") or []
        if not variants:
            return text            # nothing to reword/toggle to
        reps = int(getattr(card, "reps", 0) or 0)
        cycling = cid in _cycle

        variant = None
        if cycling:
            # Tab+R manual cycle: index 0 = original, k = variants[k-1]. Both sides use the
            # same index so front/back stay on the same version.
            idx = _cycle[cid]
            if idx > 0:
                variant = variants[(idx - 1) % len(variants)]
        else:
            # A genuinely new card (never shown this session AND reps 0) shows the original
            # first — learn it as written. A card brought back by undo has already been shown
            # this session, so it shows reworded (undo restores reps to 0, which is why we
            # track the session, not just reps). Peek forces reworded. The answer side reuses
            # the question side's decision.
            if _peek:
                show_original = False
            elif side == "q":
                show_original = (cid not in _shown_q) and reps <= 0
                _shown_q.add(cid)
                _orig_exposure[cid] = show_original
            else:
                show_original = _orig_exposure.get(cid, reps <= 0 and cid not in _shown_q)
            if not show_original:
                variant = variants[0] if _peek else _pick(variants, card)

        is_cz = _is_cloze(note)

        # Full-HTML variants (list reorder) already carry the original markup/styling AND images
        # — show them verbatim. Text variants (paraphrase) are rebuilt: re-wrap cloze styling,
        # restore line breaks, re-attach the card's photos, and copy the original's inline style.
        is_html = bool(rec.get("html"))
        imgs = "".join(_IMG_RE.findall(text))

        def _disp(varhtml):
            if is_html:
                return varhtml
            v = varhtml.replace("\n", "<br>")          # rich variants keep line structure
            v = _cloze_wrap(v, side, note, card.ord) if is_cz else v
            if imgs:
                v = v + "<br>" + imgs
            pre, suf = _preserve_style(text)
            return pre + v + suf

        if variant is not None:
            # Auto one-per-view regen only when NOT manually cycling (cycling accumulates
            # versions to jump between; regen would replace them).
            if not cycling:
                _regen_after.add(cid)
            shown = _disp(variant)
            other = text                      # the alternate is the original
            showing_reworded = True
        else:
            shown = text                      # showing the original
            alt_idx = _cycle_last.get(cid, 1)  # the reword the toggle would reveal
            other = _disp(variants[(alt_idx - 1) % len(variants)])
            showing_reworded = False

        # Review screens: wrap with the client-side original↔reworded toggle (button + the
        # alternate in a <template>), which swaps with the text-scroll animation. Elsewhere
        # (preview) just return the shown content.
        if isinstance(kind, str) and "review" in kind.lower():
            return _toggleable(shown, other, showing_reworded, multi=len(variants) > 1)
        return shown
    except Exception as exc:
        log(f"reword apply: {exc}")
        return text


# --------------------------------------------------------------------------- on-device generator (macOS)
# A tiny Swift helper that rephrases text with Apple's on-device FoundationModels
# (Apple Intelligence, macOS 26+). Same compile-once-and-run-as-subprocess pattern as
# the Vision OCR helper — 100% local, card text never leaves the machine. Reads the text
# on stdin, prints a JSON array of variants. Prints [] (and a stderr note) when the model
# isn't available (older macOS, Apple Intelligence off, unsupported hardware).
_REWORD_SWIFT = r'''
import Foundation
import FoundationModels

@main
struct Reword {
    static func main() async {
        var n = 3, kind = "text", keepBlanks = false
        var protect: [String] = []
        var it = CommandLine.arguments.dropFirst().makeIterator()
        while let a = it.next() {
            switch a {
            case "--n": if let v = it.next(), let i = Int(v) { n = max(1, min(10, i)) }
            case "--kind": if let v = it.next() { kind = v }
            case "--keepblanks": keepBlanks = true
            case "--protect":
                if let v = it.next(), let d = v.data(using: .utf8),
                   let arr = try? JSONDecoder().decode([String].self, from: d) { protect = arr }
            default: break
            }
        }
        let text = String(data: FileHandle.standardInput.readDataToEndOfFile(), encoding: .utf8)?
            .trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        if text.isEmpty { print("[]"); return }
        guard #available(macOS 26.0, *) else { FileHandle.standardError.write("unavailable: os\n".data(using: .utf8)!); print("[]"); return }
        guard case .available = SystemLanguageModel.default.availability else {
            FileHandle.standardError.write("unavailable: model\n".data(using: .utf8)!); print("[]"); return
        }
        var base = """
        You reword flashcard \(kind) text for study. Rewrite it in a DIFFERENT way while keeping \
        the MEANING, facts, names, numbers, units, and terminology EXACTLY the same. Your output \
        MUST be a correct, natural, GRAMMATICAL sentence that says the same thing — a fluent \
        paraphrase, not a scramble. Prefer changing word choice and phrasing over aggressively \
        reordering clauses; only restructure if the result still reads correctly. Keep multi-word \
        names and noun phrases (e.g. "diffuse lymphoid tissue") intact as a unit — never split or \
        reorder the words inside them. Do not add, remove, or change information; do NOT add facts, \
        examples, explanations, or headings; keep about the same LENGTH (same number of sentences). \
        Do not answer or explain. Output ONLY the reworded text.
        """
        if kind == "question" {
            base += "\nThis text is a QUESTION. Your output MUST also be a QUESTION asking the " +
                    "SAME thing — reworded. NEVER answer it, define terms, give examples, or add " +
                    "any facts/explanation. Keep it ONE short line, roughly the same length as the " +
                    "input. If unsure, just lightly reword the question."
        }
        if text.contains("\n") {
            base += "\nThe text is STRUCTURED across multiple lines (e.g. a heading with items, " +
                    "or a bulleted list). Preserve that structure: keep the SAME lines/sections, " +
                    "each on its own line, keep bullet markers (•) where present and keep every " +
                    "heading — rephrase the wording WITHIN each line. Never merge everything onto " +
                    "one line, drop a line, or reorder headings."
        }
        let nBlanks = text.components(separatedBy: "[...]").count - 1
        let multiBlank = keepBlanks && nBlanks > 1
        if keepBlanks {
            base += "\nThe text has \(nBlanks) blank(s) written as [...]. Keep every [...] exactly; " +
                    "never fill them in, guess, or reveal what belongs there. Each blank must keep " +
                    "testing the same thing."
        }
        if multiBlank {
            base += "\nThere are \(nBlanks) blanks and EACH tests a DIFFERENT thing. Keep all " +
                    "\(nBlanks) blanks in the SAME ORDER, each in a clause that tests the SAME thing " +
                    "as in the original. NEVER merge blanks, swap their order, or change what any " +
                    "blank tests. Still change the actual WORDING and phrasing of the non-blank text " +
                    "substantially — not just the grammar or punctuation."
        }
        if !protect.isEmpty {
            let joined = protect.map { "\"\($0)\"" }.joined(separator: ", ")
            base += "\nThese exact terms MUST appear unchanged and verbatim in your output: \(joined). " +
                    "Do not alter, translate, abbreviate, or rephrase them (you may move them)."
        }
        // Structural directives (single blank / no blanks) vs wording-focused directives that
        // preserve blank order (multi-blank) so distinct blanks don't get scrambled.
        let structural = [
            "Use different vocabulary and phrasing while keeping the sentence natural and correct.",
            "Reword with synonyms and a slightly different phrasing; keep it fluent and grammatical.",
            "Say the same thing in a different, natural way — accuracy and readability come first.",
            "Rephrase clearly with fresh wording; keep every fact and keep the grammar clean.",
            "Express the same idea with different words; only restructure if it still reads correctly.",
            "Give a natural paraphrase that a careful writer would accept — same meaning, new wording.",
        ]
        let wording = [
            "Replace the non-blank wording with different vocabulary and phrasing; keep each blank's clause and their order.",
            "Substantially reword the connecting text (different verbs/phrases) but keep the blanks where they are, in order.",
            "Use clearly different words for everything except the blanks and the protected terms; keep blank order.",
            "Paraphrase each clause with fresh wording while leaving each blank testing the same thing in the same order.",
        ]
        let hints = multiBlank ? wording : structural
        // Fresh session per variant + a rotating hint + rising temperature → distinct wording.
        // Multi-blank uses a gentler temperature to avoid garbled output. The on-device model
        // runs in a shared system service warmed by the add-on's startup warm-up.
        var out: [String] = [], seen = Set<String>()
        for i in 0..<n {
            do {
                let session = LanguageModelSession(instructions: base + "\n" + hints[i % hints.count])
                let temp = multiBlank ? min(0.9, 0.6 + Double(i) * 0.1)
                                      : min(1.1, 0.85 + Double(i) * 0.1)
                let opts = GenerationOptions(temperature: temp)
                let c = try await session.respond(to: text, options: opts).content
                    .trimmingCharacters(in: .whitespacesAndNewlines)
                if !c.isEmpty, !seen.contains(c), c != text { seen.insert(c); out.append(c) }
            } catch { FileHandle.standardError.write("err: \(error)\n".data(using: .utf8)!) }
        }
        if let d = try? JSONEncoder().encode(out), let s = String(data: d, encoding: .utf8) { print(s) }
        else { print("[]") }
    }
}
'''


def _reword_dir() -> str:
    root = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))  # → addon root
    d = os.path.join(root, "user_files", "reword")
    os.makedirs(d, exist_ok=True)
    return d


def on_device_available() -> bool:
    """macOS with a Swift toolchain — the only place the onboard model can run."""
    return sys.platform == "darwin" and bool(shutil.which("swiftc") or
                                             os.path.exists("/usr/bin/swiftc"))


def _reword_binary() -> str:
    """Compile (once, cached in user_files) and return the on-device rephraser helper."""
    import subprocess
    d = _reword_dir()
    src = os.path.join(d, "janki_reword.swift")
    binp = os.path.join(d, "janki_reword")
    cur = ""
    if os.path.isfile(src):
        with open(src, encoding="utf-8") as f:
            cur = f.read()
    if cur != _REWORD_SWIFT:                 # source changed / first run → rebuild
        with open(src, "w", encoding="utf-8") as f:
            f.write(_REWORD_SWIFT)
        try:
            os.remove(binp)
        except OSError:
            pass
    if os.path.isfile(binp) and os.access(binp, os.X_OK):
        return binp
    swiftc = shutil.which("swiftc") or "/usr/bin/swiftc"
    if not os.path.exists(swiftc):
        raise RuntimeError(
            "On-device rephrasing needs Xcode Command Line Tools.\n\nInstall once with:\n"
            "    xcode-select --install\n\nthen try again.")
    r = subprocess.run([swiftc, "-O", "-parse-as-library", src, "-o", binp],
                       capture_output=True, text=True)
    if r.returncode != 0 or not os.path.isfile(binp):
        raise RuntimeError("Could not build the rephraser helper:\n\n%s"
                           % ((r.stderr or "").strip()[:800]))
    return binp


def _generate(plain_text: str, n: int = 3, kind: str = "text",
              protect=None, keep_blanks: bool = False) -> list:
    """On-device paraphrases via the Swift/FoundationModels helper (macOS). Returns up to
    `n` fact-preserving rephrasings, or [] when unavailable (non-mac, model off) — in which
    case the portable .rp import path is how variants get populated. `protect` = terms that
    must survive verbatim (e.g. a cloze answer on the back); `keep_blanks` = keep [...]."""
    if not plain_text.strip() or not on_device_available():
        return []
    import subprocess
    try:
        binp = _reword_binary()
        args = [binp, "--n", str(int(n)), "--kind", kind]
        if keep_blanks:
            args.append("--keepblanks")
        if protect:
            args += ["--protect", json.dumps(list(protect), ensure_ascii=False)]
        # Run the model at LOW CPU priority so background generation can't starve the UI. Use
        # the `nice` COMMAND (not preexec_fn — that forces a slow fork() of all of Anki, which
        # itself hitches the UI); the nice wrapper keeps the fast posix_spawn path.
        if sys.platform == "darwin" and os.path.exists("/usr/bin/nice"):
            args = ["/usr/bin/nice", "-n", "15"] + args
        r = subprocess.run(args, input=plain_text, capture_output=True, text=True, timeout=180)
        data = json.loads((r.stdout or "[]").strip() or "[]")
        return [s for s in data if isinstance(s, str) and s.strip()]
    except Exception as exc:
        log(f"reword generate: {exc}")
        return []


# --------------------------------------------------------------------------- cloze / validation
_CLOZE_RE = re.compile(r"\{\{c(\d+)::(.*?)(?:::(.*?))?\}\}", re.S)
_BLANK_RE = re.compile(r"\[\s*\.\.\.\s*\]")


def _is_cloze(note) -> bool:
    try:
        return int(note.note_type().get("type", 0)) == 1
    except Exception:
        return False


def _is_image_occlusion(note) -> bool:
    """True for Image Occlusion notes (built-in IO or the IO Enhanced add-on). These are
    image/mask cards, so there's no meaningful text to reword — skip them everywhere."""
    try:
        nt = note.note_type()
        if "image occlusion" in (nt.get("name") or "").lower():
            return True
        flds = {(f.get("name") or "").lower() for f in nt.get("flds", [])}
        if "occlusion" in flds or {"question mask", "answer mask"} & flds:
            return True
    except Exception:
        pass
    return False


def _cloze_terms(note, ord_) -> list:
    """The deleted answer text(s) for the cloze number this card tests (ord 0 → c1)."""
    num = int(ord_) + 1
    terms = []
    try:
        for fld in note.fields:
            for m in _CLOZE_RE.finditer(fld or ""):
                if int(m.group(1)) == num:
                    t = _plain(m.group(2) or "").strip()
                    if t:
                        terms.append(t)
    except Exception:
        pass
    return terms


def _norm(s: str) -> str:
    """Loose normalization for 'is this basically the same text?' comparisons."""
    return re.sub(r"[^0-9a-z]+", " ", (s or "").lower()).strip()


def _termnorm(s: str) -> str:
    """Fold spacing/hyphens for a lenient 'is this term present?' check so 'MHC II', 'MHCII' and
    'MHC-II' all match. Keeps letters/digits (so CD8 ≠ CD80)."""
    return re.sub(r"[\s\-]+", "", (s or "").lower())


# Distinctive phrases from OUR instructions (or a chatty model lead-in) that must never end up
# in a stored reword. Multi-word / instruction-only tokens so they don't false-positive on
# ordinary medical card content.
_LEAK_RE = re.compile(
    r"(?i)(?:"
    r"\brephrased?\b|\bparaphrase|\breworded?\b|same meaning|sentence (?:structure|shape)|"
    r"\bclauses?\b|clause order|(?:active|passive) voice|active\W+passive|grammatical|"
    r"\bverbatim\b|your output|you may move them|must appear|appear unchanged|"
    r"do not (?:add|remove|answer|explain|alter|change)|output only|"
    r"here (?:is|are) (?:the|a|your)|here's the|sure,? here|as an ai|"
    r"i (?:cannot|can't|will|'ll)|preserve (?:the|that|its)|keep (?:every|each)\b|"
    r"on its own line|protected|non-?blank|blanks? (?:are|written|must|exactly)|flashcard|"
    r"lead with the|reorder the|different (?:vocabulary|wording|word|sentence)|"
    r"the original (?:ends|begins|starts)|than the original)")


def _too_similar(variant: str, original: str) -> bool:
    """True when a variant is basically the original with cosmetic edits. For MULTI-LINE
    (structured) cards a global word ratio is useless — forced-identical headings, bullets and
    protected terms inflate it — so we compare LINE BY LINE and reject only when almost every
    line is unchanged. Single-line text keeps the word-order ratio guard."""
    o, v = _norm(original), _norm(variant)
    if not o:
        return False
    if "\n" in original or "\n" in variant:
        olines = {_norm(x) for x in original.split("\n") if _norm(x)}
        vlines = [_norm(x) for x in variant.split("\n") if _norm(x)]
        if not vlines:
            return True
        unchanged = sum(1 for vl in vlines if vl in olines)
        return unchanged >= max(1, int(round(len(vlines) * 0.9)))
    return difflib.SequenceMatcher(None, o.split(), v.split()).ratio() > 0.8


def _valid_variants(variants, side: str, is_cloze: bool, terms, orig_blanks: int,
                    original: str = "", lenient: bool = False) -> list:
    """Keep only variants that respect the card's meaning contract: cloze QUESTIONS must keep the
    same number of [...] blanks and never leak an answer term; cloze ANSWERS must keep every
    deleted term verbatim. Also drop variants identical to the original, or carrying leaked
    instruction/prompt text. Bad output is dropped (→ original).

    `lenient` (used for the trusted .rp IMPORT path) loosens the cloze checks that were needlessly
    rejecting good model output: the QUESTION only needs >=1 blank (not an exact count — brittle
    with hints/multi-blank) and only truly-blanked terms count as a leak (a term that legitimately
    appears in the stem is fine); the ANSWER matches deleted terms with spacing/hyphens folded."""
    out, low = [], [t.lower() for t in terms if t]
    seen = set()
    for v in variants:
        vv = _BLANK_RE.sub("[...]", v)                 # normalize blanks
        nrm = _norm(vv)
        if not nrm or nrm in seen:
            continue
        if _LEAK_RE.search(vv):                        # instruction/prompt text seeped in
            continue
        if _too_similar(vv, original):                 # just cosmetic edits → not a real reword
            continue
        if is_cloze and side == "q":
            nb = vv.count("[...]")
            if lenient:
                if nb < 1:                             # must still be a fill-in-the-blank question
                    continue
                # only terms that are actually blanked (not part of the stem) count as a leak
                leak = [t for t in low if t not in (original or "").lower()]
            else:
                if nb != max(1, orig_blanks):
                    continue
                leak = low
            if any(t in vv.lower() for t in leak):     # answer leaked into the question
                continue
        if is_cloze and side == "a":
            if lenient:
                vn = _termnorm(vv)
                if any(_termnorm(t) not in vn for t in low):   # a deleted term went missing
                    continue
            elif any(t not in vv.lower() for t in low):
                continue
        seen.add(nrm)
        out.append(vv)
    return out


# --------------------------------------------------------------------------- formatting preservation
def _preserve_style(original_html: str) -> "tuple[str,str]":
    """(prefix, suffix) that re-wrap the reworded text in the ORIGINAL's inline SIZE/FONT/
    ALIGNMENT (font-size / font-family / text-align) so the rephrased card keeps the same
    size and centering. Deliberately NOT font-weight or color — copying those bolded the
    whole block and fought the cloze highlight. Template CSS handles the rest (we only swap
    field content). No match → no wrapper (template CSS alignment still applies)."""
    props = []
    for prop in ("font-size", "font-family", "text-align"):
        m = re.search(prop + r"\s*:\s*([^;\"'>]+)", original_html or "", re.I)
        if m:
            props.append("%s:%s" % (prop, m.group(1).strip()))
    if not props:
        return "", ""
    return '<div style="%s">' % "; ".join(props), "</div>"


def _cloze_wrap(variant: str, side: str, note, ord_) -> str:
    """Re-apply Anki's `.cloze` span so the blank (front) / answer term(s) (back) get the
    deck's cloze styling (the blue/bold) that plain reworded text otherwise loses. Matches
    the answer term case-INSENSITIVELY (the model may re-case it) and wraps every occurrence,
    keeping the text's own casing; longest terms first so overlaps wrap cleanly."""
    if side == "q":
        return variant.replace("[...]", '<span class="cloze">[...]</span>')
    for t in sorted((t for t in _cloze_terms(note, ord_) if t), key=len, reverse=True):
        variant = re.sub(re.escape(t),
                         lambda m: '<span class="cloze">%s</span>' % m.group(0),
                         variant, flags=re.I)
    return variant


def _blank_terms(text: str, terms) -> "str | None":
    """Derive a cloze QUESTION from a reworded answer by replacing each deleted term (in
    order, case-insensitive, first unused occurrence) with [...]. Returns None if a term
    isn't present — so we can only build a question when the reword actually kept the term."""
    out = text
    for t in terms:
        if not t:
            continue
        m = re.search(re.escape(t), out, re.I)
        if not m:
            return None
        out = out[:m.start()] + "[...]" + out[m.end():]
    return out


# --------------------------------------------------------------------------- list reordering
# Many cards are really a TITLE phrase followed by a SET of items (bullets / <br> lines) whose
# order carries no meaning — e.g. "innate immunity physical mechanisms" + a list of barriers.
# Collapsing those to one run-on and paraphrasing mangles them. For such lists we instead keep
# every item verbatim and just REORDER them (a genuine, faithful "reword"). We do NOT reorder
# a COUNTING / sequential list (ordered <ol>, or items numbered/"first…second…"/"step 1…") where
# the order is the point.
_LI_RE = re.compile(r"(?is)<li\b[^>]*>(.*?)</li>")
_OL_RE = re.compile(r"(?is)<ol\b")
_COUNT_RE = re.compile(
    r"^\s*(?:\(?\d+[.)]?|[ivxlcdm]+[.)]|first|second|third|fourth|fifth|sixth|next|then|"
    r"finally|last|step|phase|stage|day|week|stage)\b", re.I)


# Card HTML carries the note-type <style>/<script> and Janki's injected mobile block. Strip all
# of it BEFORE looking for a list, or its lines get mistaken for list items and shuffled into
# garbage. Also reject any candidate item that looks like leftover CSS/JS as a second line of
# defense.
_CODEISH_RE = re.compile(
    r"[{}]|;\s*$|::|=>|\bfunction\b|\bvar\b|\bwindow\.|\bdocument\.|@font-face|!important"
    r"|-webkit-|[a-z-]+\s*:\s*[^;]+;", re.I)


def _strip_noncontent(html: str) -> str:
    """Remove <script>/<style>/<template> blocks and HTML comments — leaving only card content."""
    if not html:
        return ""
    h = re.sub(r"(?is)<(script|style|template)\b.*?</\1>", " ", html)
    h = re.sub(r"(?is)<!--.*?-->", " ", h)
    return h


def _clean_items(raw) -> list:
    """Plain-text each candidate item and drop empties / code-looking leftovers."""
    out = []
    for x in raw:
        p = _plain(x)
        if p and not _CODEISH_RE.search(p):
            out.append(p)
    return out


def _br_lines(html: str) -> list:
    """Split content HTML into visible lines on <br> / newlines (block-ish boundaries)."""
    parts = re.split(r"(?is)<br\s*/?>|</p>|</div>|\n", html or "")
    return [p for p in (x.strip() for x in parts) if _plain(p)]


def _list_spec(html: str, terms) -> "dict | None":
    """Detect a reorderable list in a card's HTML. Returns {'title', 'items', 'ordered'}
    (title + items as PLAIN text) or None when it isn't a list of >=3 items."""
    if not html:
        return None
    html = _strip_noncontent(html)         # never treat CSS/JS as list items
    li = _LI_RE.findall(html)
    if len(li) >= 3:
        m = re.search(r"(?is)<(ul|ol)\b", html)
        title = _plain(html[:m.start()]) if m else ""
        items = _clean_items(li)
        if len(items) >= 3:
            return {"title": title, "items": items, "ordered": bool(_OL_RE.search(html))}
        return None
    # <br>/newline fallback: >=3 lines; a leading line with no cloze term is the title.
    lines = _br_lines(html)
    if len(lines) < 3:
        return None
    title = ""
    low = [t.lower() for t in terms if t]
    if low and not any(t in _plain(lines[0]).lower() for t in low):
        title, lines = _plain(lines[0]), lines[1:]
    items = _clean_items(lines)
    if len(items) < 3:
        return None
    return {"title": title, "items": items, "ordered": False}


def _is_counting_list(items, ordered: bool) -> bool:
    """A list whose ORDER matters — don't shuffle it. True for ordered <ol> or when most items
    begin with a sequence marker (number, roman numeral, first/second…, step/phase/stage…)."""
    if ordered:
        return True
    hits = sum(1 for it in items if _COUNT_RE.match(it or ""))
    return hits >= max(2, (len(items) + 1) // 2)


def _reorder_variants(title: str, items, n: int) -> list:
    """Up to `n` distinct reorderings of `items` (each verbatim), joined by <br> under the
    title. None equals the original order. Deterministic (content-seeded) so it's stable."""
    import random
    base = list(items)
    seen = {tuple(base)}
    prefix = (title + "<br>") if title else ""
    rng = random.Random(_hash("".join(base)))
    out, attempts = [], 0
    while len(out) < n and attempts < 80:
        attempts += 1
        perm = base[:]
        rng.shuffle(perm)
        tp = tuple(perm)
        if tp in seen:
            continue
        seen.add(tp)
        out.append(prefix + "<br>".join(perm))
    return out


def _list_produce(is_cloze: bool, terms, list_spec: dict, n: int) -> "dict | None":
    """Build reordered variants for a list card ({'q':[...], 'a':[...]}), or None to fall back
    to the model (counting list, or reordering couldn't produce a valid pair)."""
    if _is_counting_list(list_spec["items"], list_spec["ordered"]):
        return None
    a_variants = _reorder_variants(list_spec["title"], list_spec["items"], n)
    if not a_variants:
        return None
    res = {"q": [], "a": []}
    if not is_cloze:
        res["a"] = a_variants
        return res if res["a"] else None
    low = [t.lower() for t in terms if t]
    want_blanks = max(1, len([t for t in terms if t]))
    for av in a_variants:
        q = _blank_terms(av, terms)
        if not q or q.count("[...]") != want_blanks:
            continue
        if any(t in q.lower() for t in low):          # a term wasn't fully blanked
            continue
        res["a"].append(av)
        res["q"].append(q)                            # aligned q/a pair
    return res if res["a"] else None


# --- HTML-preserving reorder --------------------------------------------------
# The plain-text reorder above loses the card's formatting (centering, bullet styling, cloze
# weight). To MATCH the original exactly we instead reorder the original HTML NODES in place:
# same markup, same styling, just a different item order. Works on both sides with ONE shared
# permutation so a cloze card's front/back stay aligned. Full-HTML variants are stored with
# html=True and displayed verbatim (images ride along automatically).
_BULLET_RE = re.compile(r"^\s*(?:[-•–—*·▪◦‣])\s+")


def _is_bullet_line(chunk: str) -> bool:
    """A <br>-chunk that is an actual list item (starts with a bullet/dash marker), as opposed
    to a heading/intro line like 'it contains:'."""
    return bool(_BULLET_RE.match(_plain(chunk)))


def _bullet_skeleton(html: str):
    """For <br>-delimited cards with bullet/dash lines: return (chunks, bullet_indices) so the
    bullet lines can be reordered IN PLACE while every non-bullet line (headings/intro like
    'it contains:', trailing notes) stays exactly where it is. None if <3 bullet lines, or a
    real <li> list (handled by _split_html_list). This never drops or moves non-bullet content."""
    if not html or _LI_RE.search(html):
        return None
    chunks = re.split(r"(?is)<br\s*/?>", html)
    while chunks and not _plain(chunks[-1]):           # drop trailing empties
        chunks.pop()
    bidx = [i for i, c in enumerate(chunks) if _plain(c) and _is_bullet_line(c)]
    if len(bidx) < 3:
        return None
    return chunks, bidx


def _rebuild_bullets(chunks, bidx, perm) -> str:
    """Rejoin `chunks` with only the bullet slots (bidx) reordered by `perm`; all other lines fixed."""
    out = list(chunks)
    orig = [chunks[i] for i in bidx]
    for slot, src in zip(bidx, perm):
        out[slot] = orig[src]
    return "<br>".join(out)


def _split_html_list(html: str):
    """Split a side's HTML into (prefix, [item_html…], suffix, joiner) so items can be reordered
    with all their markup intact. Uses <li> elements, else <br>-delimited lines (first line kept
    in the prefix as a heading). None if it isn't a list of >=3 items. Note: <br> cards with
    bullet markers are handled earlier by _bullet_skeleton (in-place reorder)."""
    if not html:
        return None
    lis = list(_LI_RE.finditer(html))
    if len(lis) >= 3:
        return (html[:lis[0].start()], [m.group(0) for m in lis],
                html[lis[-1].end():], "")
    chunks = re.split(r"(?is)<br\s*/?>", html)
    while chunks and not _plain(chunks[-1]):           # drop trailing empties
        chunks.pop()
    if len([c for c in chunks if _plain(c)]) < 4:      # heading + >=3 content lines
        return None
    return (chunks[0] + "<br>", chunks[1:], "", "<br>")


def _list_html_variants(q_html: str, a_html: str, terms, n: int) -> "dict | None":
    """Reorder the ORIGINAL item HTML (formatting preserved) into up to `n` variants. Reorders
    both sides with the SAME permutation so cloze front/back stay aligned. Returns
    {'q':[…],'a':[…],'html':True} or None (not a list, or a counting list where order matters)."""
    import random
    # Preferred path for <br> cards with bullet lines: reorder the bullets IN PLACE, leaving all
    # heading/intro/trailing lines fixed (so 'it contains:' never migrates into the list, and no
    # content is ever dropped). Falls back to the <li>/prefix split otherwise.
    a_sk = _bullet_skeleton(a_html)
    if a_sk:
        a_chunks, a_bidx = a_sk
        a_bullets = [_plain(a_chunks[i]) for i in a_bidx]
        if _is_counting_list(a_bullets, bool(_OL_RE.search(a_html))):
            return None
        q_sk = _bullet_skeleton(q_html)
        use_q = bool(q_sk and len(q_sk[1]) == len(a_bidx))
        idx = list(range(len(a_bidx)))
        seen = {tuple(idx)}
        rng = random.Random(_hash("".join(a_bullets)))
        res = {"q": [], "a": [], "html": True}
        tries = 0
        while len(res["a"]) < n and tries < 100:
            tries += 1
            perm = idx[:]
            rng.shuffle(perm)
            tp = tuple(perm)
            if tp in seen:
                continue
            seen.add(tp)
            res["a"].append(_rebuild_bullets(a_chunks, a_bidx, perm))
            if use_q:
                q_chunks, q_bidx = q_sk
                res["q"].append(_rebuild_bullets(q_chunks, q_bidx, perm))
        return res if res["a"] else None

    a_split = _split_html_list(a_html)
    if not a_split:
        return None
    a_pre, a_items, a_suf, a_join = a_split
    if _is_counting_list([_plain(x) for x in a_items], bool(_OL_RE.search(a_html))):
        return None
    q_split = _split_html_list(q_html)
    use_q = bool(q_split and len(q_split[1]) == len(a_items))
    idx = list(range(len(a_items)))
    seen = {tuple(idx)}
    rng = random.Random(_hash("".join(_plain(x) for x in a_items)))
    res = {"q": [], "a": [], "html": True}
    tries = 0
    while len(res["a"]) < n and tries < 100:
        tries += 1
        perm = idx[:]
        rng.shuffle(perm)
        tp = tuple(perm)
        if tp in seen:
            continue
        seen.add(tp)
        res["a"].append(a_pre + a_join.join(a_items[i] for i in perm) + a_suf)
        if use_q:
            qp, qi, qs, qj = q_split
            res["q"].append(qp + qj.join(qi[i] for i in perm) + qs)
    return res if res["a"] else None


def _gen_valid(plain, want, kind, side, is_cloze, terms, blanks,
               protect=None, keep_blanks=False) -> list:
    """Return up to `want` validated variants (or []). Distinct wording, meaning preserved —
    see _valid_variants for the contract. One model call (each cold-starts the on-device model
    and emits candidates sequentially, ~2s each): over-generate a small batch rather than
    retrying. If nothing validates, we just show the original."""
    if not plain:
        return []
    raw = _generate(plain, min(6, want + 4), kind=kind, protect=protect, keep_blanks=keep_blanks)
    return _valid_variants(raw, side, is_cloze, terms, blanks, plain)[:want]


def _produce_variants(is_cloze: bool, terms, q_plain: str, a_plain: str, n: int,
                      list_spec=None, q_html=None, a_html=None) -> dict:
    """Generate reword variants for both sides (no collection access, so it's safe on a
    background thread). For a LIST card (title + unordered items) we REORDER the original item
    HTML — same formatting, different order — via _list_html_variants (result carries html=True).
    Otherwise we paraphrase: CLOZE rewords the answer (terms kept verbatim) then derives the
    question by blanking this card's terms (aligned front/back); BASIC rewords each side."""
    if q_html is not None or a_html is not None:
        lv = _list_html_variants(q_html or "", a_html or "", terms, n)
        if lv:
            return lv                         # formatting-preserving reorder; skip paraphraser
    res = {"q": [], "a": []}
    if is_cloze:
        q_blanks = q_plain.count("[...]") or len([t for t in terms if t]) or 1
        keep = [t for t in terms if t]
        low = [t.lower() for t in keep]
        # MULTI-BLANK cloze: rephrase the QUESTION keeping its [...] blanks, then rebuild the
        # answer by dropping each deleted term back into a blank VERBATIM. The answer-first path
        # below can't handle several blanks (the small model won't echo multiple exact terms, and
        # terms repeated in a back-extra summary leak when back-derived), so those cards use this.
        if len(keep) > 1 and q_plain.count("[...]") == len(keep):
            # ONE strategy per card (no chaining → at most one model call): multi-blank cloze uses
            # the question-first rebuild. Note the small on-device model often FILLS inline blanks
            # instead of keeping them; those candidates have the wrong blank count and are dropped,
            # so such cards simply get no reword (never a wrong one).
            q_lines, a_lines = q_plain.split("\n"), a_plain.split("\n")
            extra = ("\n".join(a_lines[len(q_lines):]).strip()   # back-extra (e.g. a summary line)
                     if len(a_lines) > len(q_lines) else "")
            for qv in _gen_valid(q_plain, n + 1, kind="question", side="q", is_cloze=True,
                                 terms=terms, blanks=q_blanks, keep_blanks=True):
                if qv.count("[...]") != len(keep):
                    continue
                av = qv
                for t in keep:
                    av = av.replace("[...]", t, 1)         # fill blanks with verbatim terms, in order
                if extra:
                    av = av + "\n" + extra                 # keep any answer-only back-extra content
                res["q"].append(qv)
                res["a"].append(av)
                if len(res["a"]) >= n:
                    break
        else:
            # SINGLE-BLANK: rephrase the ANSWER keeping the deleted term verbatim, then derive the
            # question by blanking it.
            a_cands = _gen_valid(a_plain, n + 1, kind="answer", side="a", is_cloze=True,
                                 terms=terms, blanks=0, protect=terms)
            for av in a_cands:
                q = _blank_terms(av, terms)
                if not q or q.count("[...]") != q_blanks:
                    continue
                if any(t in q.lower() for t in low):      # a term leaked (not fully blanked)
                    continue
                res["a"].append(av)
                res["q"].append(q)
                if len(res["a"]) >= n:
                    break
    else:
        res["q"] = _gen_valid(q_plain, n, kind="question", side="q", is_cloze=False,
                              terms=[], blanks=0)
        res["a"] = _gen_valid(a_plain, n, kind="answer", side="a", is_cloze=False,
                              terms=[], blanks=0)
    return res


def reword_card(card, sides=("q", "a"), n: int = 1) -> int:
    """Generate + cache reworded variants for a card's question/answer via the local
    generator. Returns how many sides got variants. Generating is allowed regardless of
    the display toggle (so you can prep variants first); only apply() gates on it.
    Display-only: this writes to the local rewords cache, never to the note."""
    try:
        note = card.note()
    except Exception:
        return 0
    if _is_image_occlusion(note):
        return 0                              # image/mask card — nothing to reword
    is_cloze = _is_cloze(note)
    terms = _cloze_terms(note, card.ord) if is_cloze else []
    q_plain = _plain(card.question())
    a_plain = _plain(card.answer())
    q_rich = _rich(card.question())        # structure-preserving text for the generator
    a_rich = _rich(card.answer())
    try:
        res = _produce_variants(is_cloze, terms, q_rich, a_rich, n,
                                q_html=card.question(), a_html=card.answer())
    except Exception as exc:
        log(f"reword gen: {exc}")
        return 0
    is_html = bool(res.get("html"))
    store = _load()
    made = 0
    for side, plain in (("q", q_plain), ("a", a_plain)):
        vs = res.get(side) or []
        if vs and plain:
            store[_key(note.id, card.ord, side)] = {
                "src": _hash(plain), "variants": list(vs), "ts": int(time.time()),
                "html": is_html}
            made += 1
    if made:
        _save()
    return made


# --------------------------------------------------------------------------- preview / query
def get_card_rewords(card) -> dict:
    """{'q': (original_plain, [variants]), 'a': (...)} for a card — only variants still valid
    for the current text (edited-since entries show as empty). For the Settings preview."""
    res = {}
    try:
        note = card.note()
    except Exception:
        return res
    for side in ("q", "a"):
        html = card.question() if side == "q" else card.answer()
        plain = _plain(html)                       # for the src-hash validity check
        rec = _load().get(_key(note.id, card.ord, side))
        variants = list(rec.get("variants") or []) if rec and rec.get("src") == _hash(plain) else []
        if rec and rec.get("html"):                # full-HTML variants → readable text for preview
            variants = [_rich(v) for v in variants]
        res[side] = (_rich(html), variants)        # show the STRUCTURED text that's reworded
    return res


def delete_reword_variant(key: str, variant: str) -> bool:
    """Remove a single stored variant (by exact stored text) from `key`; drop the record if it
    was its last variant. Persists. Returns True if something was removed."""
    store = _load()
    rec = store.get(key)
    if not isinstance(rec, dict):
        return False
    vs = rec.get("variants") or []
    if variant not in vs:
        return False
    vs = [v for v in vs if v != variant]
    if vs:
        rec["variants"] = vs
    else:
        store.pop(key, None)
    _save()
    return True


def view_all_rewords_dialog(on_done=None, parent=None):
    """A scrollable, filterable browser of EVERY stored reword — each card's original text (per
    side) and its stored rephrasings, each with a delete (✕) button so individual rewords can be
    removed. Skips stale entries (card edited since stored)."""
    from aqt.qt import (QDialog, QVBoxLayout, QHBoxLayout, QLabel, QLineEdit, QPushButton,
                        QScrollArea, QWidget, QFrame, Qt)
    store = _load()

    dlg = QDialog(parent or mw)
    dlg.setWindowTitle("All stored rewords")
    v = QVBoxLayout(dlg)
    count = QLabel("")
    count.setStyleSheet("color:#9aa0aa;")
    v.addWidget(count)
    filt = QLineEdit()
    filt.setPlaceholderText("Filter…")
    v.addWidget(filt)
    scroll = QScrollArea(); scroll.setWidgetResizable(True)
    host = QWidget(); hostv = QVBoxLayout(host)
    scroll.setWidget(host)
    v.addWidget(scroll, 1)

    groups = []          # (search_text_lower, group_widget, variant_row_count_getter)
    cards_seen = set()

    def _refresh_count():
        q = filt.text().strip().lower()
        shown = sum(1 for s, _g, _n in groups if not q or q in s)
        total_v = sum(_n() for _s, _g, _n in groups)
        count.setText("%d card-sides shown · %d rewords total" % (shown, total_v))

    for key in sorted(store.keys()):
        rec = store.get(key) or {}
        variants = rec.get("variants") or []
        if not variants:
            continue
        try:
            nid, ordn, side = key.split(":")
            card = None
            for cc in mw.col.get_note(int(nid)).cards():
                if cc.ord == int(ordn):
                    card = cc
                    break
            if card is None:
                continue
            html = card.question() if side == "q" else card.answer()
            if rec.get("src") != _hash(_plain(html)):
                continue                           # stale — card changed since stored
            orig = _rich(html)
            is_html = bool(rec.get("html"))
        except Exception:
            continue
        cards_seen.add((nid, ordn))

        group = QFrame()
        group.setFrameShape(QFrame.Shape.StyledPanel)
        gv = QVBoxLayout(group)
        hdr = QLabel("<b>%s</b> · %s" % ("Q" if side == "q" else "A",
                                         (orig.replace("\n", " ")[:120] or "(empty)")))
        hdr.setWordWrap(True)
        gv.addWidget(hdr)
        rows_alive = {"n": 0}

        def _add_variant_row(raw, gv=gv, key=key, is_html=is_html, group=group,
                             rows_alive=rows_alive):
            disp = _rich(raw) if is_html else raw
            row_w = QWidget(); rh = QHBoxLayout(row_w); rh.setContentsMargins(0, 0, 0, 0)
            lab = QLabel(disp.replace("\n", "  ")); lab.setWordWrap(True)
            rh.addWidget(lab, 1)
            x = QPushButton("×"); x.setFixedSize(26, 26)
            x.setToolTip("Delete this rephrasing")
            x.setAutoDefault(False); x.setDefault(False)
            x.setFlat(True)
            x.setStyleSheet("QPushButton{border:none;border-radius:5px;padding:0 0 2px 0;"
                            "background:rgba(255,90,90,0.22);color:#e6e6e6;"
                            "font-size:16px;font-weight:bold;}")

            def _del(_=None, raw=raw, key=key, row_w=row_w, group=group,
                     rows_alive=rows_alive):
                if delete_reword_variant(key, raw):
                    row_w.setParent(None); row_w.deleteLater()
                    rows_alive["n"] -= 1
                    if rows_alive["n"] <= 0:       # last one gone → drop the whole card group
                        group.setParent(None); group.deleteLater()
                    _refresh_count()
            x.clicked.connect(_del)
            rh.addWidget(x, 0, Qt.AlignmentFlag.AlignTop)
            gv.addWidget(row_w)
            rows_alive["n"] += 1

        for raw in variants:
            _add_variant_row(raw)
        hostv.addWidget(group)
        search = (orig + " " + " ".join(variants)).lower()
        groups.append((search, group, lambda ra=rows_alive: ra["n"]))

    hostv.addStretch()

    def _filter(*_a):
        q = filt.text().strip().lower()
        for s, g, _n in groups:
            try:
                g.setVisible(not q or q in s)
            except Exception:
                pass
        _refresh_count()
    filt.textChanged.connect(_filter)
    _refresh_count()

    row = QHBoxLayout()
    close = QPushButton("Close")
    close.setAutoDefault(False); close.setDefault(False)   # Enter must NOT close the window
    close.clicked.connect(dlg.accept)
    row.addStretch()
    row.addWidget(close)
    v.addLayout(row)
    dlg.resize(680, 560)
    dlg.exec()
    if on_done:
        try:
            on_done()
        except Exception:
            pass


# --------------------------------------------------------------------------- maintenance
def set_variants(card, side: str, variants: list) -> None:
    """Directly store display-ready variants for a card side (used for testing/manual
    entry and by future import paths). Keyed to the current text so edits invalidate."""
    try:
        note = card.note()
        html = card.question() if side == "q" else card.answer()
        _load()[_key(note.id, card.ord, side)] = {
            "src": _hash(_plain(html)), "variants": list(variants), "ts": int(time.time()),
            "html": False}
        _save()
    except Exception as exc:
        log(f"reword set: {exc}")


def clear_card(card) -> None:
    store = _load()
    try:
        nid = card.note().id
    except Exception:
        return
    for side in ("q", "a"):
        store.pop(_key(nid, card.ord, side), None)
    _save()


def clear_all() -> None:
    global _store
    _store = {}
    _save()


# --------------------------------------------------------------------------- portable .rp path
# For anyone NOT on macOS (or who'd rather use their own LLM): export a deck's raw text
# with a built-in prompt, paste it into any chat model, and import the returned .rp file.
# A .rp is JSON that mirrors how .qb banks are imported — it feeds the SAME local rewords
# store the on-device path uses, so display/behavior are identical.
_RP_PROMPT = (
    "You are helping build alternate PHRASINGS for Anki flashcards so the learner recalls the "
    "CONTENT, not the exact wording.\n\n"
    "For EACH item in the JSON below, write %d alternative phrasings of its `text`. Every "
    "phrasing MUST:\n"
    "- keep EXACTLY the same meaning, facts, names, numbers, units, and terminology;\n"
    "- be a correct, natural, GRAMMATICAL sentence that says the same thing — a fluent "
    "paraphrase, never a scramble or word salad;\n"
    "- genuinely vary the wording (don't just reorder a couple of words or swap one synonym);\n"
    "- keep multi-word names and technical noun phrases (e.g. \"diffuse lymphoid tissue\") "
    "INTACT as a unit — never split them or reorder the words inside them;\n"
    "- NOT answer, explain, translate, define, or add/remove any information;\n"
    "- stay about the same length (same number of sentences/lines) as the original.\n\n"
    "Structure: some `text` values span MULTIPLE LINES (a heading with items, or a bulleted "
    "list with • markers). Preserve that structure exactly — keep the same lines/sections, keep "
    "every heading and bullet, and rephrase only the wording within each line. Never merge lines "
    "into one, drop a line, or reorder headings.\n\n"
    "Cloze rules (CRITICAL):\n"
    "- If an item has \"keep_blanks\": true, its `text` contains blanks written as [...]. "
    "Keep EVERY [...] EXACTLY, in the same count and order. NEVER fill a blank in, guess it, "
    "answer it, or reveal what belongs there — reword ONLY the text around the blanks.\n"
    "- If an item has a \"protect\" list, every string in it MUST appear UNCHANGED and verbatim "
    "in each of your phrasings (you may move it, but do not alter it).\n\n"
    "OUTPUT (strict): reply with ONE valid JSON object and NOTHING else — no prose, no notes, "
    "no markdown, no ``` code fences. Preserve each item's `id` verbatim. Use exactly this shape:\n"
    '{"type":"janki-rephrase","version":1,"items":['
    '{"id":"<same id>","variants":["phrasing 1","phrasing 2"]}]}\n\n'
    "Items:\n"
)


def _cards_for_deck(did: int):
    try:
        cids = mw.col.decks.cids(int(did), children=True)
    except Exception:
        cids = mw.col.find_cards('did:%d' % int(did))
    for cid in cids:
        try:
            yield mw.col.get_card(cid)
        except Exception:
            continue


def _rp_build_items(card_ids=None, deck_id=None, deck_ids=None, limit=0, skip_done=True):
    """Gather the export items (and the count of cards used). `skip_done` omits a card side that
    already has valid stored variants — so successive batches cover NEW cards. `limit` caps the
    number of CARDS contributing items (0 = no cap) so a big deck can be reworded in fast chunks."""
    if card_ids:
        cards = [mw.col.get_card(c) for c in card_ids]
    elif deck_ids:
        cards, seen = [], set()
        for did in deck_ids:
            for c in _cards_for_deck(did):
                if c.id not in seen:
                    seen.add(c.id)
                    cards.append(c)
    else:
        cards = list(_cards_for_deck(deck_id))
    store = _load()
    items, used = [], 0
    for c in cards:
        note = c.note()
        if _is_image_occlusion(note):
            continue                          # image/mask cards have nothing to reword
        is_cloze = _is_cloze(note)
        terms = _cloze_terms(note, c.ord) if is_cloze else []
        card_items = []
        for side in ("q", "a"):
            html = c.question() if side == "q" else c.answer()
            plain = _plain(html)
            if not plain:
                continue
            if skip_done:                     # already has current, valid rewords → don't re-ask
                rec = store.get(_key(note.id, c.ord, side))
                if rec and rec.get("src") == _hash(plain) and rec.get("variants"):
                    continue
            # Export the STRUCTURE-preserving text so the external model can keep the card's
            # shape; `src` stays keyed on _plain so edits invalidate consistently.
            item = {"id": _key(note.id, c.ord, side), "src": _hash(plain), "text": _rich(html)}
            if is_cloze and side == "q":
                item["keep_blanks"] = True         # back-answer terms are NOT exported here
            elif is_cloze and side == "a" and terms:
                item["protect"] = terms
            card_items.append(item)
        if not card_items:
            continue
        if limit and used >= limit:           # hit the per-prompt card cap → stop here
            break
        items.extend(card_items)
        used += 1
    return items, used


def build_rp_prompt(card_ids=None, deck_id=None, deck_ids=None, n: int = 3,
                    limit: int = 0, skip_done: bool = True) -> str:
    """Build the copy-paste prompt + JSON items for an external LLM. Card text stays on the
    clipboard only if the USER chooses to paste it — Janki sends nothing. See _rp_build_items
    for `limit` / `skip_done` (batching a big deck)."""
    items, _used = _rp_build_items(card_ids, deck_id, deck_ids, limit, skip_done)
    return (_RP_PROMPT % int(n)) + json.dumps({"items": items}, ensure_ascii=False, indent=0)


def _rp_deck_count(deck_ids) -> int:
    """Cheap card count across deck_ids (cids only, no Card loads), de-duplicated."""
    seen = set()
    for did in deck_ids or []:
        try:
            seen.update(mw.col.decks.cids(int(did), children=True))
        except Exception:
            try:
                seen.update(mw.col.find_cards("did:%d" % int(did)))
            except Exception:
                pass
    return len(seen)


def copy_rephrase_prompt_dialog(on_done=None, parent=None):
    """A separate window (like the qbank tag-prompt tool) to CHECK which decks to pull cards
    from, choose phrasings-per-card, then copy the external-LLM rephrase prompt to the clipboard
    or save it as .txt. Nothing leaves the machine unless the user pastes it into a chat model."""
    from aqt.qt import (QDialog, QVBoxLayout, QHBoxLayout, QLabel, QPushButton, QApplication,
                        QFileDialog, QCheckBox, QScrollArea, QWidget, QSpinBox)
    from aqt.utils import tooltip, showWarning
    try:
        from ..integrations.qbank import _decks_top_level
        decks = _decks_top_level()                  # [(top name, [dids incl subdecks])]
    except Exception:
        decks = []
    if not decks:                                   # fallback: flat deck list
        try:
            decks = [(d.name, [int(d.id)]) for d in mw.col.decks.all_names_and_ids()]
        except Exception:
            decks = []
    if not decks:
        tooltip("No decks found.")
        return

    dlg = QDialog(parent or mw)
    dlg.setWindowTitle("Rephrase prompt")
    v = QVBoxLayout(dlg)
    lbl = QLabel(
        "Builds a prompt that asks any chat model to write alternate phrasings for the cards in "
        "the decks you check below. Paste it into Claude/ChatGPT, save the JSON reply as a .rp "
        "file, then use “Import rephrasings (.rp)…”. Card text stays local unless you paste it.")
    lbl.setWordWrap(True)
    v.addWidget(lbl)

    top = QHBoxLayout()
    top.addWidget(QLabel("Phrasings per card:"))
    spin = QSpinBox(); spin.setRange(1, 5); spin.setValue(2)
    top.addWidget(spin)
    top.addSpacing(16)
    top.addWidget(QLabel("Max cards per prompt:"))
    lim = QSpinBox(); lim.setRange(0, 5000); lim.setValue(75)
    lim.setSpecialValueText("All")                  # 0 → "All" (no cap)
    lim.setToolTip("Big decks take a chat model many minutes. Cap each prompt to a batch (e.g. "
                   "75); import it, then copy again to get the next batch.")
    top.addWidget(lim)
    top.addStretch()
    v.addLayout(top)

    cb_skip = QCheckBox("Skip cards that already have rephrasings (so batches cover new cards)")
    cb_skip.setChecked(True)
    v.addWidget(cb_skip)

    cb_all = QCheckBox("All decks (%d)" % len(decks)); cb_all.setChecked(True)
    v.addWidget(cb_all)
    scroll = QScrollArea(); scroll.setWidgetResizable(True); scroll.setFixedHeight(240)
    host = QWidget(); hv = QVBoxLayout(host); hv.setContentsMargins(16, 0, 0, 0)
    deck_cbs = []                                   # (checkbox, [dids])
    for name, dids in decks:
        cb = QCheckBox(name); cb.setChecked(True); cb.setEnabled(False)
        deck_cbs.append((cb, dids)); hv.addWidget(cb)
    hv.addStretch()
    scroll.setWidget(host)
    v.addWidget(scroll)

    est = QLabel(""); est.setStyleSheet("color:#9aa0aa; margin-top:4px;")
    v.addWidget(est)

    def _selected_dids():
        if cb_all.isChecked():
            return [d for _n, dids in decks for d in dids]
        return [d for cb, dids in deck_cbs if cb.isChecked() for d in dids]

    def _refresh(*_a):
        on = cb_all.isChecked()
        for cb, _d in deck_cbs:
            cb.setEnabled(not on)                   # individual picks only when "All" is off
        dids = _selected_dids()
        total = _rp_deck_count(dids)
        try:
            items, used = _rp_build_items(deck_ids=dids, limit=lim.value(),
                                          skip_done=cb_skip.isChecked())
        except Exception:
            items, used = [], 0
        asks = len(items) * spin.value()
        est.setText("%d cards in selection  ·  this prompt: %d cards (%d items) → ~%d "
                    "rephrasings for the model" % (total, used, len(items), asks))

    cb_all.toggled.connect(_refresh)
    cb_skip.toggled.connect(_refresh)
    lim.valueChanged.connect(_refresh)
    spin.valueChanged.connect(_refresh)
    for cb, _d in deck_cbs:
        cb.toggled.connect(_refresh)
    _refresh()

    def _build():
        dids = _selected_dids()
        if not dids:
            showWarning("Check at least one deck.")
            return None
        items, used = _rp_build_items(deck_ids=dids, limit=lim.value(),
                                      skip_done=cb_skip.isChecked())
        if not items:
            showWarning("Nothing to export — those cards already have rephrasings "
                        "(uncheck “Skip …” to rebuild them).")
            return None
        return build_rp_prompt(deck_ids=dids, n=spin.value(), limit=lim.value(),
                               skip_done=cb_skip.isChecked())

    def _copy():
        t = _build()
        if t is None:
            return
        QApplication.clipboard().setText(t)
        tooltip("Prompt copied — paste into any chat model, save the reply as a .rp file, "
                "then import it.", period=4200)
        dlg.accept()

    def _save():
        t = _build()
        if t is None:
            return
        path, _ = QFileDialog.getSaveFileName(dlg, "Save prompt", "rephrase-prompt.txt",
                                              "Text (*.txt)")
        if not path:
            return
        try:
            with open(path, "w", encoding="utf-8") as f:
                f.write(t)
        except Exception as e:
            showWarning("Could not save:\n\n%s" % e)
            return
        tooltip("Saved rephrase prompt.", period=3000)
        dlg.accept()

    row = QHBoxLayout()
    close = QPushButton("Close"); save = QPushButton("Save .txt…"); copy = QPushButton("Copy to clipboard")
    for b in (save, copy):
        b.setStyleSheet("QPushButton{background-color:#55585e;color:white;border:none;"
                        "padding:5px 12px;border-radius:5px;}"
                        "QPushButton:hover{background-color:#61646b;}")
    row.addWidget(close); row.addStretch(); row.addWidget(save); row.addWidget(copy)
    v.addLayout(row)
    close.clicked.connect(dlg.reject)
    save.clicked.connect(_save)
    copy.clicked.connect(_copy)
    dlg.resize(560, 520)
    dlg.exec()
    if on_done:
        try:
            on_done()
        except Exception:
            pass


def _rp_loads(t: str):
    """json.loads with a couple of lenient passes: strip a wrapping code fence and tolerate
    trailing commas."""
    t = t.strip()
    t = re.sub(r"^```[a-zA-Z0-9]*\s*", "", t)
    t = re.sub(r"\s*```\s*$", "", t).strip()
    try:
        return json.loads(t)
    except Exception:
        return json.loads(re.sub(r",(\s*[}\]])", r"\1", t))       # trailing commas


def _rp_doc_items(doc) -> list:
    """Pull the item list out of a parsed JSON doc: {"items":[…]}, a bare array, or a single item."""
    if isinstance(doc, list):
        return [x for x in doc if isinstance(x, dict)]
    if isinstance(doc, dict):
        items = doc.get("items")
        if isinstance(items, list):
            return [x for x in items if isinstance(x, dict)]
        if "id" in doc:                             # a single bare item
            return [doc]
    return []


def _dertf(raw: str) -> str:
    """If `raw` is an RTF document (e.g. a reply saved from TextEdit's rich-text mode), decode it
    to plain text: unescape \\{ \\} \\\\, decode \\'xx (cp1252) and \\uN unicode, turn line/para
    breaks into newlines, drop control words + the font/color/style groups, and remove RTF
    grouping braces. Non-RTF input is returned unchanged."""
    if not raw or not raw.lstrip()[:8].startswith("{\\rtf"):
        return raw
    s = raw.replace("\\\\", "\x00BS\x00").replace("\\{", "\x00LB\x00").replace("\\}", "\x00RB\x00")
    for _ in range(4):                              # drop font/color/style/info groups
        s = re.sub(r"\{\\\*?\\?(?:fonttbl|colortbl|expandedcolortbl|stylesheet|info|fldinst)"
                   r"[^{}]*\}", " ", s)
    s = re.sub(r"\\'([0-9a-fA-F]{2})",
               lambda m: bytes([int(m.group(1), 16)]).decode("cp1252", "replace"), s)

    def _u(m):
        n = int(m.group(1))
        if n < 0:
            n += 65536
        return "\n" if n in (8232, 8233) else (chr(n) if 0 <= n <= 0x10FFFF else "")
    s = re.sub(r"\\uc\d+", "", s)
    s = re.sub(r"\\u(-?\d+) ?", _u, s)
    s = re.sub(r"\\(?:par|line|pard)\b", "\n", s)
    s = re.sub(r"\\[a-zA-Z]+-?\d* ?", "", s)       # remaining control words
    s = re.sub(r"\\[^a-zA-Z]", "", s)              # control symbols
    s = s.replace("\r", "").replace("\n", " ").replace("{", "").replace("}", "")
    return s.replace("\x00LB\x00", "{").replace("\x00RB\x00", "}").replace("\x00BS\x00", "\\")


_JSON_ESC = {"n": "\n", "t": "\t", "r": "\r", "b": "\b", "f": "\f", '"': '"', "\\": "\\", "/": "/"}


def _json_unescape(s: str) -> str:
    """Apply JSON string escapes in one pass (\\n → newline, \\" → ", \\\\ → \\)."""
    return re.sub(r"\\(.)", lambda m: _JSON_ESC.get(m.group(1), m.group(1)), s)


def _rp_salvage(text: str) -> list:
    """Last-resort recovery when the JSON won't parse — the usual cause is a model leaving
    UNESCAPED double-quotes inside a variant, which breaks json.loads for the WHOLE document and
    otherwise loses everything. Pull out each {"id":…,"variants":[…]} item individually and split
    the variants on the ","-delimiters, tolerating stray quotes inside a phrasing."""
    items = []
    for m in re.finditer(r'"id"\s*:\s*"([^"]+)"\s*,\s*"variants"\s*:\s*\[(.*?)\](?=\s*[},])',
                         text, re.S):
        vid, arr = m.group(1), m.group(2).strip()
        if arr.startswith('"'):
            arr = arr[1:]
        if arr.endswith('"'):
            arr = arr[:-1]
        vs = [_json_unescape(p) for p in re.split(r'"\s*,\s*"', arr) if p.strip()]
        if vs:
            items.append({"id": vid, "variants": vs})
    return items


def _rp_items(raw: str) -> list:
    """Parse a .rp payload — or ANY pasted plaintext that CONTAINS the JSON — as leniently as
    possible so a stray chat model can't break import. Handles: a UTF-8 BOM; ```json fences
    anywhere in the text (not just the ends); prose wrapped around the JSON; a top-level array or
    a single bare item instead of {"items":[…]}; trailing commas; and JSONL (one {…} item per
    line); and, when the JSON is still MALFORMED (a model left unescaped quotes in a variant),
    a per-item salvage that recovers each item individually. Returns the item list; raises only
    when there's no JSON at all."""
    if not raw or not raw.strip():
        return []
    raw = _dertf(raw)                              # decode RTF if that's what was pasted/saved
    s = raw.lstrip("﻿").strip()

    candidates = []
    for m in re.finditer(r"```[a-zA-Z0-9]*\r?\n?([\s\S]*?)```", s):   # fenced blocks, anywhere
        candidates.append(m.group(1))
    candidates.append(s)                                              # the whole payload
    for pat in (r"\{[\s\S]*\}", r"\[[\s\S]*\]"):                      # greedy outer object/array
        m = re.search(pat, s)
        if m:
            candidates.append(m.group(0))
    for cand in candidates:
        if not cand or not cand.strip():
            continue
        try:
            items = _rp_doc_items(_rp_loads(cand))
        except Exception:
            items = []
        if items:
            return items

    # Malformed JSON (e.g. a model left unescaped quotes in a variant): recover items one by one.
    sv = _rp_salvage(s)
    if sv:
        return sv

    # JSONL last resort: each line is its own {…} item object.
    items = []
    for line in s.splitlines():
        line = line.strip().rstrip(",")
        if line.startswith("{") and line.endswith("}"):
            try:
                o = json.loads(line)
                if isinstance(o, dict):
                    items.append(o)
            except Exception:
                pass
    if items:
        return items
    raise ValueError("no JSON found in the pasted text")


def _rp_variants(it: dict) -> list:
    """Pull the variant strings out of an item, tolerating key aliases and a single string
    instead of a list. De-duplicated, trimmed, non-empty."""
    v = it.get("variants")
    if v is None:
        for alias in ("rephrasings", "phrasings", "alternatives", "rewrites"):
            if it.get(alias) is not None:
                v = it.get(alias)
                break
    if isinstance(v, str):
        v = [v]
    out, seen = [], set()
    for x in (v or []):
        if isinstance(x, str):
            x = x.strip()
            if x and x not in seen:
                seen.add(x)
                out.append(x)
    return out


def import_rp(path: str):
    """Import a .rp FILE's variants into the local rewords store. See import_rp_text."""
    with open(path, encoding="utf-8") as f:
        raw = f.read()
    return import_rp_text(raw)


def import_rp_text(raw: str):
    """Import rephrasings from a raw string (a pasted model reply or a .rp file's contents).
    Maps each item back to its live card by id and stores variants ONLY if the card's current
    text still matches the exported source hash (so edits since export safely skip). Tolerant of
    messy model output (see _rp_items / _rp_variants). Returns (imported, skipped, reasons) where
    `reasons` is a {reason: count} breakdown of the skips (also logged)."""
    items = _rp_items(raw)                          # raises only if no JSON at all is present
    store = _load()
    imported = 0
    reasons = {}

    def _skip(why):
        reasons[why] = reasons.get(why, 0) + 1

    for it in items:
        if not isinstance(it, dict):
            _skip("not an object"); continue
        key = it.get("id") or it.get("key")
        variants = _rp_variants(it)
        if not key or not variants:
            _skip("no id / no variants"); continue
        try:
            parts = str(key).split(":")
            if len(parts) != 3 or parts[2] not in ("q", "a"):
                _skip("bad id format"); continue
            nid, ordn, side = parts
            card = None
            try:
                for c in mw.col.get_note(int(nid)).cards():
                    if c.ord == int(ordn):
                        card = c
                        break
            except Exception:
                card = None
            if card is None:
                _skip("card not found (deleted/moved)"); continue
            html = card.question() if side == "q" else card.answer()
            plain = _plain(html)
            cur_hash = _hash(plain)
            if it.get("src") and it["src"] != cur_hash:
                _skip("card edited since prompt was copied"); continue
            note = card.note()
            is_cloze = _is_cloze(note)
            terms = _cloze_terms(note, card.ord) if is_cloze else []
            valid = _valid_variants(variants, side, is_cloze, terms,
                                    plain.count("[...]"), plain, lenient=True)
            if not valid:
                # Distinguish the common cloze failures so the breakdown is actionable.
                if is_cloze and side == "a":
                    _skip("cloze answer variant missing a deleted term")
                elif is_cloze and side == "q":
                    _skip("cloze question variant changed the blanks / leaked a term")
                else:
                    _skip("variant identical to original or leaked prompt text")
                continue
            store[key] = {"src": cur_hash, "variants": valid, "ts": int(time.time()),
                          "html": False}          # .rp variants are plain text (rebuilt on display)
            imported += 1
        except Exception:
            _skip("error")
    _save()
    skipped = sum(reasons.values())
    if reasons:
        log("reword import skips: %s" % reasons)
    return imported, skipped, reasons


# --------------------------------------------------------------------------- background prefetch
# Generate rewords for the CURRENT + upcoming cards ahead of time, off the main thread, so a
# reworded card is ready the moment you reach it. Threading rule: touch the collection ONLY on
# the main thread (extract card text there); run the slow model subprocess + validation on a
# background thread; store back on the main thread. One job at a time (serialized).
_pf_seen = set()
_pf_queue = []
_regen_queue = []          # cards that were shown reworded → regenerate a FRESH variant
_regen_after = set()       # apply() marks cards it showed reworded; swept once you move off
_pf_busy = False

# Tab+R manual cycle: cid -> version index (0 = original, k = variants[k-1]).
_cycle = {}


_cycle_last = {}           # cid -> last non-original index (so the button toggles back to it)


def get_cycle(cid) -> int:
    return _cycle.get(int(cid), 0)


def set_cycle(cid, idx: int) -> None:
    _cycle[int(cid)] = int(idx)


# Client-side original↔reworded swap (mirrors the practice slide-button pattern): swap a
# DIRECT child of #qa so the typewriter's MutationObserver (childList on #qa) replays the
# text-scroll reveal on the new content — no Python re-render. The alternate version rides
# in a <template> (inert; the reveal's TreeWalker never touches it). pycmd keeps Python's
# cycle state in sync so the answer side / Tab+R / Ctrl+Z agree.
_SWAP_JS = (
    "window.jankiRewordSwap=function(){try{"
    "var qa=document.getElementById('qa'),"
    "live=document.getElementById('jk-rw-live'),"
    "alt=document.getElementById('jk-rw-alt'),"
    "btn=document.getElementById('jk-rw-toggle');"
    "if(!qa||!live||!alt||qa.__jkSwapping)return;"   # ignore rapid re-clicks mid-fade
    "qa.__jkSwapping=true;"
    "var cur=live.innerHTML,other=alt.innerHTML;"
    # FADE OUT the whole card (#qa holds both the content and the button bar), then swap the
    # content and FADE it back IN — a soft crossfade instead of an instant flip.
    "qa.style.transition='opacity .14s';qa.style.opacity='0';"
    "setTimeout(function(){try{"
    "window.__jkNoType=1;"                  # no text-typing animation; we do the fade instead
    "var nn=document.createElement('div');nn.id='jk-rw-live';nn.innerHTML=other;"
    "live.replaceWith(nn);"                 # changes #qa childList → reveal replays (instant)
    "alt.innerHTML=cur;"                    # stash the old version for the next toggle
    "if(btn)btn.textContent=(btn.textContent.trim()==='Original')?'Reworded':'Original';"
    # the label now reflects the CURRENT side; the next-version button shows only when reworded
    "var nx=document.getElementById('jk-rw-next');"
    "if(nx&&btn)nx.style.display=(btn.textContent.trim()==='Reworded')?'':'none';"
    # reworded → keep the bar visible; original → re-arm hover-hide but NOT immediately, so the
    # just-clicked button stays until the cursor moves away from the corner
    "if(window.jankiRewordHover&&btn)jankiRewordHover(btn.textContent.trim()==='Original',false);"
    "if(typeof pycmd!=='undefined')pycmd('jankireword:toggle');"
    "requestAnimationFrame(function(){qa.style.opacity='1';qa.__jkSwapping=false;});"
    "}catch(e){qa.__jkSwapping=false;}},150);"
    "}catch(e){}};"
)

# "Next reword" arrow: fade the card out, advance to the next stored variant (Python re-renders
# with __jkNoType so there's no type animation), then the fresh render fades back in (_FADEIN_JS).
_NEXT_JS = (
    "window.jankiRewordNext=function(){try{"
    "var qa=document.getElementById('qa');"
    "if(qa){qa.style.transition='opacity .14s';qa.style.opacity='0';}"
    "window.__jkNoType=1;"
    "setTimeout(function(){try{if(typeof pycmd!=='undefined')pycmd('jankireword:next');}"
    "catch(e){}},150);}catch(e){}};"
)

# Runs on each reword render: if the card was faded out for an arrow-advance, fade it back in.
# No-op on normal renders (opacity isn't '0' unless the arrow set it), so only the arrow fades.
_FADEIN_JS = (
    "requestAnimationFrame(function(){try{var q=document.getElementById('qa');"
    "if(q&&q.style.opacity==='0'){q.style.transition='opacity .14s';q.style.opacity='1';}}"
    "catch(e){}});"
)

# Hover-reveal for the ORIGINAL view: hide the control bar until the cursor is near the bottom-left
# corner (or Tab+R switches to a reworded view). jankiRewordHover(true) turns hiding on; false
# keeps the bar visible. One shared mousemove listener drives it.
_HOVER_JS = (
    "window.jankiRewordHover=function(on,immediate){window.__jkRwHide=!!on;"
    "var b=document.getElementById('jk-rw-bar');if(!b)return;"
    "if(!on){b.style.opacity='1';b.style.pointerEvents='auto';}"
    # hide right away for a FRESH card; on a manual toggle keep it visible until the cursor
    # actually moves away (the mousemove handler then hides it when it leaves the corner)
    "else if(immediate){b.style.opacity='0';b.style.pointerEvents='none';}};"
    "if(!window.__jkRwHoverBound){window.__jkRwHoverBound=true;"
    "document.addEventListener('mousemove',function(e){"
    "if(!window.__jkRwHide)return;"
    "var b=document.getElementById('jk-rw-bar');if(!b)return;"
    "var near=(e.clientX<220&&e.clientY>window.innerHeight-90);"
    "b.style.opacity=near?'1':'0';b.style.pointerEvents=near?'auto':'none';});}"
)


def _button_html(label: str, multi: bool = False, showing_reworded: bool = False) -> str:
    """The bottom-left control bar: the original↔reworded toggle, plus (when the card has >1
    reword) a tiny '›' button right beside it that iterates to the next version. The iterate
    button shows only while the reworded side is on screen."""
    toggle = (
        '<div id="jk-rw-toggle" onclick="jankiRewordSwap()" '
        'onmouseover="this.style.opacity=1;this.style.color=\'#fff\';" '
        'onmouseout="this.style.opacity=0.55;this.style.color=\'#9fb4d8\';" '
        'style="cursor:pointer;font-size:11px;color:#9fb4d8;opacity:0.55;'
        'background:rgba(28,29,33,0.7);border:1px solid rgba(255,255,255,0.2);'
        'border-radius:6px;padding:3px 9px;user-select:none;">' + label + '</div>')
    nxt = ""
    if multi:
        disp = "block" if showing_reworded else "none"
        nxt = (
            '<div id="jk-rw-next" onclick="jankiRewordNext()" title="Next rephrasing" '
            'onmouseover="this.style.opacity=1;this.style.color=\'#fff\';" '
            'onmouseout="this.style.opacity=0.55;this.style.color=\'#9fb4d8\';" '
            'style="display:%s;cursor:pointer;font:700 13px/1 -apple-system,sans-serif;'
            'color:#9fb4d8;opacity:0.55;background:rgba(28,29,33,0.7);'
            'border:1px solid rgba(255,255,255,0.2);border-radius:6px;padding:3px 10px;'
            'user-select:none;">&#8250;</div>' % disp)
    # In the original view the bar starts hidden (opacity 0) and is hover-revealed; in the
    # reworded view it's visible. transition gives a soft fade-in on hover.
    op = "1" if showing_reworded else "0"
    pe = "auto" if showing_reworded else "none"
    return (
        '<div id="jk-rw-bar" style="position:fixed;left:10px;bottom:0;z-index:2147483000;'
        'display:flex;gap:6px;align-items:center;transition:opacity .15s;'
        'opacity:%s;pointer-events:%s;">' % (op, pe) + toggle + nxt + '</div>')


def _toggleable(shown_html: str, other_html: str, showing_reworded: bool,
                multi: bool = False) -> str:
    """Wrap the shown content + the alternate (in a <template>) + the bottom-left control bar
    (toggle, and a next-version button when `multi`). In the original view the bar is hidden
    until you hover near it (or Tab+R switches to a reworded view)."""
    label = "Reworded" if showing_reworded else "Original"
    script = (_SWAP_JS + _HOVER_JS + (_NEXT_JS if multi else "")
              + ("jankiRewordHover(false);" if showing_reworded else "jankiRewordHover(true,true);")
              + _FADEIN_JS)
    return (
        '<div id="jk-rw-live">' + shown_html + '</div>'
        '<template id="jk-rw-alt">' + other_html + '</template>'
        + _button_html(label, multi, showing_reworded)
        + '<script>' + script + '</script>')


def _inject_live_current() -> None:
    """Called after a reword finishes generating: if the card now-ready is the one on screen
    AND it's currently displayed WITHOUT a toggle (shown un-reworded because gen wasn't ready),
    wrap the live content and drop the button in — so the fresh reword becomes toggleable
    without re-showing the card. Idempotent: the injected JS bails if the button already exists."""
    try:
        if getattr(mw, "state", None) != "review" or not (_enabled() or _peek):
            return
        r = getattr(mw, "reviewer", None)
        cur = getattr(r, "card", None) if r else None
        if cur is None:
            return
        side = "a" if getattr(r, "state", None) == "answer" else "q"
        note = cur.note()
        rec = _load().get(_key(note.id, cur.ord, side))
        if not rec:
            return
        variants = rec.get("variants") or []
        if not variants:
            return
        text = cur.question() if side == "q" else cur.answer()
        if rec.get("src") != _hash(_plain(text)):
            return                                 # stale (card edited) — leave the live view be
        is_html = bool(rec.get("html"))
        is_cz = _is_cloze(note)
        imgs = "".join(_IMG_RE.findall(text))

        def _disp(varhtml):
            if is_html:
                return varhtml
            v = varhtml.replace("\n", "<br>")
            v = _cloze_wrap(v, side, note, cur.ord) if is_cz else v
            if imgs:
                v = v + "<br>" + imgs
            pre, suf = _preserve_style(text)
            return pre + v + suf

        alt_idx = _cycle_last.get(cur.id, 1)       # the reword the toggle will reveal
        other_html = _disp(variants[(alt_idx - 1) % len(variants)])
        multi = len(variants) > 1
        tail = ('<template id="jk-rw-alt">' + other_html + '</template>'
                + _button_html("Original", multi=multi, showing_reworded=False))
        script = _SWAP_JS + _HOVER_JS + (_NEXT_JS if multi else "") + "jankiRewordHover(true,true);"
        js = (
            "(function(){try{"
            "var qa=document.getElementById('qa');"
            "if(!qa||document.getElementById('jk-rw-toggle'))return;"   # already toggleable
            "var html=qa.innerHTML;"
            "window.__jkNoType=1;"                                      # no re-type animation
            "qa.innerHTML='<div id=\"jk-rw-live\">'+html+'</div>'+" + json.dumps(tail) + ";"
            + script +
            "}catch(e){}})();"
        )
        mw.web.eval(js)
    except Exception as exc:
        log(f"reword inject live: {exc}")


def toggle_cycle(cid) -> None:
    """Flip the card between original (index 0) and its last-shown reword."""
    cid = int(cid)
    idx = _cycle.get(cid, 0)
    if idx > 0:
        _cycle_last[cid] = idx
        _cycle[cid] = 0
    else:
        _cycle[cid] = _cycle_last.get(cid, 1)


def on_js_message(handled, message, context):
    """webview_did_receive_js_message filter: the bottom-left button already swapped the
    content client-side (with the scroll animation); here we only sync Python's cycle state
    so the answer side / Tab+R / Ctrl+Z stay in agreement — NO Python re-render."""
    try:
        if message == "jankireword:toggle":
            r = getattr(mw, "reviewer", None)
            if getattr(mw, "state", None) == "review" and r and getattr(r, "card", None):
                set_peek(False)
                toggle_cycle(r.card.id)
            return (True, None)
        if message == "jankireword:next":
            # Advance to the next stored reword (wrapping within 1..N, never back to the
            # original), then re-show the current side WITHOUT the type animation. Python owns
            # the cycle index so the answer side / Tab+R / Ctrl+Z stay aligned.
            r = getattr(mw, "reviewer", None)
            if getattr(mw, "state", None) == "review" and r and getattr(r, "card", None):
                set_peek(False)
                cid = r.card.id
                side = "a" if getattr(r, "state", None) == "answer" else "q"
                n = variant_count(r.card, side)
                if n > 0:
                    nxt = get_cycle(cid) + 1
                    if nxt > n:
                        nxt = 1                     # wrap; stay on rewords (skip index 0/original)
                    set_cycle(cid, nxt)
                    _cycle_last[cid] = nxt
                    try:
                        mw.web.eval("window.__jkNoType=1;")
                    except Exception:
                        pass
                    if side == "a":
                        r._showAnswer()
                    else:
                        r._showQuestion()
            return (True, None)
    except Exception as exc:
        log(f"reword js message: {exc}")
    return handled


_prev_undo = None


def install_undo_hook() -> None:
    """Make undo (Ctrl+Z) step BACK through the Tab+R version cycle when the current card is
    being cycled (index > 0). At the original it falls through to Anki's real undo. Wrapping
    mw.undo covers the shortcut, the Edit menu, and the reviewer's undo key; chains with any
    existing undo wrap (e.g. intersperse) since we capture whatever mw.undo is now."""
    global _prev_undo
    if _prev_undo is not None:
        return
    try:
        _prev_undo = mw.undo

        def _undo(*a, **k):
            try:
                r = getattr(mw, "reviewer", None)
                if (getattr(mw, "state", None) == "review" and r
                        and getattr(r, "card", None)):
                    cid = r.card.id
                    if _cycle.get(cid, 0) > 0:
                        _cycle[cid] -= 1                 # back one version
                        try:
                            mw.web.eval("window.__jkNoType=1;")   # cycle → no type anim
                        except Exception:
                            pass
                        if getattr(r, "state", None) == "answer":
                            r._showAnswer()
                        else:
                            r._showQuestion()
                        return
            except Exception as exc:
                log(f"reword undo hook: {exc}")
            return _prev_undo(*a, **k) if _prev_undo else None
        mw.undo = _undo
    except Exception as exc:
        log(f"reword install undo: {exc}")


def variant_count(card, side: str) -> int:
    """How many stored variants a card side currently has (valid for its live text)."""
    try:
        note = card.note()
        html = card.question() if side == "q" else card.answer()
        rec = _load().get(_key(note.id, card.ord, side))
        if rec and rec.get("src") == _hash(_plain(html)):
            return len(rec.get("variants") or [])
    except Exception:
        pass
    return 0


def generate_more_async(card, on_done=None) -> None:
    """Generate ONE more rephrasing and APPEND it (keeping cloze q/a pairs aligned), for the
    Tab+R cycle. Extract on the caller's (main) thread, model on a background thread, store
    back here. Calls on_done(total_variants_or_0) when finished."""
    try:
        job = _prefetch_extract(card, force=True)
    except Exception:
        job = None
    if not job:
        if on_done:
            on_done(0)
        return

    def _done(fut):
        added = 0
        try:
            out, is_html = fut.result()
            store = _load()
            for side, (src, new) in out.items():
                key = _key(job["nid"], job["ord"], side)
                rec = store.get(key)
                if rec and rec.get("src") == src:
                    existing = rec.get("variants") or []
                    for v in new:
                        if v not in existing:
                            existing.append(v)
                    rec["variants"] = existing
                    rec["ts"] = int(time.time())
                    rec["html"] = is_html
                    added = max(added, len(existing))
                else:
                    store[key] = {"src": src, "variants": list(new),
                                  "ts": int(time.time()), "html": is_html}
                    added = max(added, len(new))
            _save()
        except Exception as exc:
            log(f"reword generate_more: {exc}")
        _inject_live_current()                     # if this was the open card, add the button live
        if on_done:
            on_done(added)
    mw.taskman.run_in_background(lambda: _prefetch_run(job, 1), _done, uses_collection=False)


def regenerate_card_async(card, on_done=None) -> None:
    """Regenerate a card's rewords WITHOUT holding the single-worker collection executor (which
    also serves the reviewer's card-fetch/answer/undo — running the model there freezes review).
    Extract on the main thread (collection access), run the model on a no-collection background
    thread, store on the main thread. Calls on_done(sides_stored) when finished."""
    try:
        job = _prefetch_extract(card, force=True)
    except Exception:
        job = None
    if not job:
        if on_done:
            on_done(0)
        return

    def _done(fut):
        stored = 0
        try:
            out, is_html = fut.result()
            _prefetch_store(job, out, is_html)
            stored = len(out)
        except Exception as exc:
            log(f"reword regenerate: {exc}")
        _inject_live_current()                     # if it's the open card, add the button live
        if on_done:
            on_done(stored)
    mw.taskman.run_in_background(lambda: _prefetch_run(job, 1), _done, uses_collection=False)


def _prefetch_extract(card, force=False):
    """Main-thread: gather both sides' plain text + cloze context for a card. Returns a job
    dict (no collection refs) or None. `force` regenerates even if valid variants already
    exist (used to refresh a card after it was viewed); otherwise skips cards already done."""
    note = card.note()
    if _is_image_occlusion(note):
        return None                           # don't pre-load rewords for image-occlusion cards
    is_cloze = _is_cloze(note)
    terms = _cloze_terms(note, card.ord) if is_cloze else []
    q_plain = _plain(card.question())
    a_plain = _plain(card.answer())

    def _needs(side, plain):
        if not plain:
            return False
        if force:
            return True
        rec = _load().get(_key(note.id, card.ord, side))
        return not (rec and rec.get("src") == _hash(plain) and rec.get("variants"))

    if not (_needs("q", q_plain) or _needs("a", a_plain)):
        return None                           # both sides already have valid variants
    return {"nid": note.id, "ord": card.ord, "is_cloze": is_cloze, "terms": terms,
            "q_plain": q_plain, "a_plain": a_plain,
            "q_rich": _rich(card.question()), "a_rich": _rich(card.answer()),
            "q_html": card.question(), "a_html": card.answer(),
            "q_src": _hash(q_plain), "a_src": _hash(a_plain)}


def _prefetch_run(job, n):
    """Background-thread: model generation / HTML reorder + validation (no collection access).
    Reorders original item HTML for list cards, else paraphrases the rich text. Returns
    ({side: (src_hash, [variants])}, is_html)."""
    res = _produce_variants(job["is_cloze"], job["terms"], job["q_rich"], job["a_rich"], n,
                            q_html=job.get("q_html"), a_html=job.get("a_html"))
    out = {}
    if res.get("q"):
        out["q"] = (job["q_src"], res["q"])
    if res.get("a"):
        out["a"] = (job["a_src"], res["a"])
    return out, bool(res.get("html"))


def _prefetch_store(job, out, is_html=False):
    """Main-thread: commit background-generated variants to the store."""
    if not out:
        return
    store = _load()
    for side, (src, variants) in out.items():
        store[_key(job["nid"], job["ord"], side)] = {
            "src": src, "variants": variants, "ts": int(time.time()), "html": is_html}
    _save()


def _pf_pump():
    """Main-thread: start the next job if idle. ALWAYS favors the card currently open (its
    reword is generated before any look-ahead or regen), then regen jobs, then other fill jobs.
    Skips cards that need nothing. Runs off the collection executor (uses_collection=False) so
    generation never blocks the reviewer's own card-fetch/answer/undo."""
    global _pf_busy
    if _pf_busy:
        return
    # The open card jumps to the front of the fill queue so it's rephrased first.
    cur_id = None
    try:
        cur = getattr(mw.reviewer, "card", None)
        cur_id = cur.id if cur is not None else None
    except Exception:
        cur_id = None
    if cur_id is not None and cur_id in _pf_queue:
        _pf_queue.remove(cur_id)
        _pf_queue.insert(0, cur_id)

    while _regen_queue or _pf_queue:
        # Fill the OPEN card ahead of regen; otherwise regen beats other look-ahead fills.
        if cur_id is not None and _pf_queue and _pf_queue[0] == cur_id:
            force, cid = False, _pf_queue.pop(0)
        else:
            force = bool(_regen_queue)
            cid = _regen_queue.pop(0) if force else _pf_queue.pop(0)
        if not force:
            if cid in _pf_seen:
                continue
            _pf_seen.add(cid)
        try:
            job = _prefetch_extract(mw.col.get_card(cid), force=force)
        except Exception:
            job = None
        if not job:
            continue
        _pf_busy = True
        n = 1   # one rephrasing per view; a fresh one is generated after you view it

        def _done(fut, job=job):
            global _pf_busy
            try:
                out, is_html = fut.result()
                _prefetch_store(job, out, is_html)
            except Exception as exc:
                log(f"reword prefetch store: {exc}")
            _pf_busy = False
            _inject_live_current()                 # if this was the open card, add the button live
            _pf_pump()                             # chain to the next queued card
        mw.taskman.run_in_background(lambda job=job, n=n: _prefetch_run(job, n), _done,
                                     uses_collection=False)
        return


# A single restartable "settle" timer. Every card show restarts it; generation only kicks off
# once you PAUSE on a card for _PF_SETTLE_MS. So blitzing through cards — or rapid Ctrl+Z —
# never starts the heavy on-device model and never stalls the UI. If a variant isn't ready when
# a card is shown, apply() just shows the original; the reword turns up on a later pass.
_pf_timer = None
_PF_SETTLE_MS = 900


def _pf_queue_now():
    """Timer callback (main thread): peek the current + upcoming cards, fold in any pending
    regen, and pump the background generator. Only runs after the settle delay."""
    if not on_device_available() or not (_enabled() or _peek):
        return
    do_fill = bool(_cfg().get("reword_prefetch", True))
    n_cards = int(_cfg().get("reword_prefetch_count", 3))
    cids = []
    cur_id = None
    try:
        cur = getattr(mw.reviewer, "card", None)
        if cur is not None:
            cur_id = cur.id
            if do_fill:
                cids.append(cur.id)
        if do_fill:
            qc = mw.col.sched.get_queued_cards(fetch_limit=max(1, n_cards))
            for e in getattr(qc, "cards", []) or []:
                c = getattr(e, "card", None)
                if c is not None:
                    cids.append(c.id)
    except Exception as exc:
        log(f"reword prefetch peek: {exc}")
    # Regenerate a fresh variant for any card we already SHOWED reworded — but not the one on
    # screen now (that would change the answer side mid-exposure). So we refresh a card once
    # you've moved off it, ready with a new phrasing next time.
    for cid in list(_regen_after):
        if cid != cur_id:
            _regen_after.discard(cid)
            if cid not in _regen_queue:
                _regen_queue.append(cid)
    for cid in cids:
        if cid not in _pf_seen and cid not in _pf_queue:
            _pf_queue.append(cid)
    _pf_pump()


def prefetch_upcoming(count=None) -> None:
    """Called on every card show. Restarts the settle timer instead of generating immediately,
    so fast navigation / Ctrl+Z never triggers the model — it only runs once you linger on a
    card. Card display itself never waits on generation. On-device generation is an EXPERIMENTAL
    backup: this whole auto path is gated behind `reword_prefetch` (off by default) — the primary
    way to get rewords is importing an AI-built .rp. Manual (button / Tab+R) still works when off."""
    global _pf_timer
    if not on_device_available() or not (_enabled() or _peek):
        return
    if not _cfg().get("reword_prefetch", False):   # on-device auto is opt-in / experimental
        return
    try:
        from aqt.qt import QTimer
        if _pf_timer is None:
            _pf_timer = QTimer(mw)
            _pf_timer.setSingleShot(True)
            _pf_timer.timeout.connect(_pf_queue_now)
        _pf_timer.start(_PF_SETTLE_MS)     # restart → fires only after you settle on a card
    except Exception:
        _pf_queue_now()


_warmed = False


def warm_up() -> None:
    """Compile the helper and load the model ONCE in the background at startup, so the first
    real generation isn't slowed by the swiftc build + model cold-start. Safe no-op off mac
    / when the feature isn't in use."""
    global _warmed
    if _warmed or not on_device_available():
        return
    if not _cfg().get("reword_prefetch", False):   # only warm the model if on-device auto is on
        return
    _warmed = True

    def _work():
        try:
            _generate("Warm up the on-device model.", 1, kind="text")
        except Exception:
            pass
    try:
        mw.taskman.run_in_background(_work, lambda *_a: None, uses_collection=False)
    except Exception:
        pass
