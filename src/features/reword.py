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
import json
import time
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
    except Exception:
        _store = {}
    return _store


def _save() -> None:
    try:
        with open(_store_path(), "w", encoding="utf-8") as f:
            json.dump(_load(), f, ensure_ascii=False)
    except Exception as exc:
        log(f"reword save: {exc}")


# --------------------------------------------------------------------------- helpers
def _enabled() -> bool:
    return bool(_cfg().get("reword_enabled", False))


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


def _hash(text: str) -> str:
    return hashlib.sha1(text.encode("utf-8", "replace")).hexdigest()


def _key(note_id, ord_, side: str) -> str:
    return f"{int(note_id)}:{int(ord_)}:{side}"


# --------------------------------------------------------------------------- variant selection
def _pick(variants, card) -> "str | None":
    """Choose which stored phrasing to show. Rotates by the card's review count so a
    given card cycles through its phrasings over successive reviews (the whole point —
    a different wording each time) while staying stable within a single view."""
    if not variants:
        return None
    try:
        idx = int(getattr(card, "reps", 0)) % len(variants)
    except Exception:
        idx = 0
    return variants[idx]


# --------------------------------------------------------------------------- display hook
def apply(text: str, card, kind) -> str:
    """card_will_show transform: swap in a reworded phrasing when one exists and is still
    valid for the current text. DISPLAY-ONLY — the note/scheduler are untouched, so the
    card answers exactly as the original. Returns `text` unchanged on any miss/disabled."""
    if not _enabled():
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
        variant = _pick(rec.get("variants") or [], card)
        return variant if variant else text
    except Exception as exc:
        log(f"reword apply: {exc}")
        return text


# --------------------------------------------------------------------------- generation seam
def _generate(plain_text: str, n: int = 3) -> list:
    """LOCAL paraphrase generator — GROUNDWORK STUB.

    Must return up to `n` reworded, display-ready HTML strings that preserve the card's
    meaning while varying wording/structure, or [] when unavailable. When implemented it
    MUST run fully on-device (card text may never leave the machine). Returning [] here
    means rewording is a safe no-op until a backend is wired in."""
    return []


def reword_card(card, sides=("q", "a"), n: int = 3) -> int:
    """Generate + cache reworded variants for a card's question/answer via the local
    generator. Returns how many sides got variants. No-op (0) while _generate is a stub.
    Display-only: this writes to the local rewords cache, never to the note."""
    if not _enabled():
        return 0
    made = 0
    try:
        note = card.note()
    except Exception:
        return 0
    for side in sides:
        try:
            html = card.question() if side == "q" else card.answer()
            plain = _plain(html)
            if not plain:
                continue
            variants = _generate(plain, n)
            if variants:
                _load()[_key(note.id, card.ord, side)] = {
                    "src": _hash(plain), "variants": list(variants), "ts": int(time.time())}
                made += 1
        except Exception as exc:
            log(f"reword gen {side}: {exc}")
    if made:
        _save()
    return made


# --------------------------------------------------------------------------- maintenance
def set_variants(card, side: str, variants: list) -> None:
    """Directly store display-ready variants for a card side (used for testing/manual
    entry and by future import paths). Keyed to the current text so edits invalidate."""
    try:
        note = card.note()
        html = card.question() if side == "q" else card.answer()
        _load()[_key(note.id, card.ord, side)] = {
            "src": _hash(_plain(html)), "variants": list(variants), "ts": int(time.time())}
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
