"""Intersperse practice questions into ordinary review sessions.

Two modes, one per trigger (both configurable in Settings ▸ Practice ▸ Intersperse):

* **After every N cards → seamless inline.** A relevant practice question drops in as
  the reviewer's next "card" in the same deck flow (no leaving the deck), then your
  real cards resume. The card is a real *Janki Practice* note, so the MCQ tint /
  binary grade / explanation / Continue are byte-identical to the Practice deck. It is
  NOT served by the scheduler, so we resolve it ourselves (correct → suspend/retire,
  wrong → resurface later this session, skip → drop) without touching your real deck's
  scheduler queue. See resolve_inline() + the delegation in ``user/css.py``.

* **Before each pomodoro break → mini practice set.** A short native filtered deck of
  the matched cards is entered as a pre-break benchmark; grading there is 100% native
  Anki (real scheduler-served practice cards). When it empties we tear the filtered
  deck down, return to your original deck, and let the break begin.

Relevance is matched against the concept tags of the cards you've recently reviewed,
reusing qbank's existing tag matcher (which maps the AJ / #AK / Hutch families via
``lectures._leaf_key``). If nothing matches, the no-match setting decides between
skipping the round and a looser text-similarity fallback.

Everything is guarded behind ``intersperse_enabled`` and never runs when disabled.
"""

import collections

from aqt import mw, gui_hooks
from aqt.reviewer import Reviewer
from aqt.utils import tooltip

from ..util.config import log, _cfg
from ..util import state
from ..integrations import qbank

# --- session tracking -------------------------------------------------------
# Concepts (leaf keys) + text tokens of the last _WINDOW real cards reviewed, so a
# trigger matches what you've actually been studying. Practice/interspersed cards are
# never counted here.
_WINDOW = 25
_recent_leaves = collections.deque(maxlen=_WINDOW)
_recent_tokens = collections.deque(maxlen=_WINDOW)
_cards_since = 0

# --- inline (Trigger A) state ----------------------------------------------
_inline_queue = []          # card ids waiting to be served as the next reviewer cards
_inline_active = set()      # card ids currently shown as an inline practice card
_seen = set()               # card ids already interspersed this session (no repeats)
_requeue = []               # wrong/unfinished inline cids to resurface later
_warned_empty = False       # one-time "no practice cards built" nag per session

# --- pre-break (Trigger B) state -------------------------------------------
_FILTERED_NAME = "Janki Practice (interspersed)"
_pre_break_active = False
_pre_break_on_done = None
_pre_break_prev_deck = None
_pre_break_did = None

_orig_nextcard = None


# ---------------------------------------------------------------------------
# helpers
# ---------------------------------------------------------------------------
def _enabled():
    return bool(_cfg().get("intersperse_enabled", False))


def _target_size():
    lo = int(_cfg().get("intersperse_target_min", 2))
    hi = int(_cfg().get("intersperse_target_max", 4))
    lo = max(1, lo)
    hi = max(lo, hi)
    return lo, hi


def _use_text_fallback():
    return _cfg().get("intersperse_nomatch", "skip") == "text"


def _match_inputs():
    """Aggregate leaf keys + tokens across the recency window."""
    leaves = set()
    tokens = set()
    for s in _recent_leaves:
        leaves |= s
    for s in _recent_tokens:
        tokens |= s
    return leaves, tokens


def _is_practice_note(card):
    try:
        return (card.note_type() or {}).get("name") == qbank._MODEL_NAME
    except Exception:
        return False


def reset_session():
    """Wipe per-session state (called on profile open)."""
    global _cards_since, _warned_empty
    _warned_empty = False
    _recent_leaves.clear()
    _recent_tokens.clear()
    _seen.clear()
    _requeue.clear()
    _inline_queue.clear()
    _inline_active.clear()
    _cards_since = 0


def _gather(limit):
    """Card ids to intersperse now: resurfaced wrong ones first, then fresh matches."""
    leaves, tokens = _match_inputs()
    fallback = _use_text_fallback()
    batch = []
    # Resurface previously-wrong inline cards first (drop any now suspended).
    while _requeue and len(batch) < limit:
        cid = _requeue.pop(0)
        try:
            c = mw.col.get_card(cid)
        except Exception:
            c = None
        if c is not None and getattr(c, "queue", 0) != -1 and cid not in batch:
            batch.append(cid)
    if len(batch) < limit:
        fresh = qbank.intersperse_card_ids(
            leaves, tokens, limit - len(batch),
            use_text_fallback=fallback,
            exclude_cids=set(batch) | _seen)
        batch.extend(fresh)
    return batch[:limit]


# ---------------------------------------------------------------------------
# Trigger A — seamless inline (wraps Reviewer.nextCard)
# ---------------------------------------------------------------------------
def is_inline_active(cid):
    return cid in _inline_active


def _should_trigger_inline():
    c = _cfg()
    if not c.get("intersperse_enabled", False):
        return False
    if not c.get("intersperse_after_cards_enabled", True):
        return False
    if _inline_active or _inline_queue or _pre_break_active:
        return False
    if getattr(state, "_pomo_on_break", False):
        return False
    n = max(1, int(c.get("intersperse_after_cards_n", 20)))
    return _cards_since >= n


def _serve_next_inline(reviewer):
    """Show the next queued inline practice card as the reviewer's current card,
    bypassing the scheduler. Returns True if one was shown."""
    while _inline_queue:
        cid = _inline_queue.pop(0)
        try:
            card = mw.col.get_card(cid)
        except Exception:
            card = None
        if card is None:
            continue
        _inline_active.add(cid)
        _seen.add(cid)
        reviewer.card = card
        try:
            card.start_timer()
        except Exception:
            pass
        try:
            reviewer._showQuestion()
        except Exception as e:
            log("intersperse serve: %s" % e)
            _inline_active.discard(cid)
            continue
        return True
    return False


def _do_nextcard(self):
    global _cards_since
    # Mid-batch: keep serving the queued inline cards before the deferred real card.
    if _inline_queue and _serve_next_inline(self):
        return None
    # Time to start a new inline batch?
    if _should_trigger_inline():
        _, hi = _target_size()
        batch = _gather(hi)
        _cards_since = 0            # reset either way (skip retries after another N)
        if batch:
            _inline_queue.extend(batch)
            if _serve_next_inline(self):
                return None
        else:
            _hint_no_cards()
    return _orig_nextcard(self)


def _hint_no_cards():
    """One-time nudge if the trigger fires but nothing matched — usually because the
    Practice deck hasn't been built (interspersing pulls real Practice cards)."""
    global _warned_empty
    if _warned_empty:
        return
    _warned_empty = True
    try:
        if not mw.col.find_notes('note:"%s"' % qbank._MODEL_NAME):
            tooltip("Interspersing is on, but no practice cards are built yet.\n"
                    "Settings ▸ Practice ▸ Question Bank ▸ “Load Question Banks to "
                    "Anki”.", period=6000)
        else:
            tooltip("No practice questions matched your recent cards. Try setting "
                    "“If nothing matches” to Text-similarity in Settings ▸ Practice ▸ "
                    "Intersperse.", period=6000)
    except Exception:
        pass


def _install_nextcard_wrap():
    global _orig_nextcard
    if _orig_nextcard is not None:
        return
    _orig_nextcard = Reviewer.nextCard

    def _wrapped(self):
        try:
            return _do_nextcard(self)
        except Exception as e:
            log("intersperse nextCard: %s" % e)
            return _orig_nextcard(self)

    Reviewer.nextCard = _wrapped


def practice_now():
    """Tab+Q entry point: show a relevant practice question INLINE in the reviewer
    (review mode), for the card you're on, then return to it. Reuses the inline
    machinery; works on demand regardless of the auto-intersperse setting. Because
    the current card is never answered, the scheduler serves it again right after."""
    r = getattr(mw, "reviewer", None)
    card = getattr(r, "card", None) if r else None
    if card is None or getattr(mw, "state", None) != "review":
        tooltip("Practice: open a card in the reviewer first.")
        return
    # Already on a practice question → Tab+Q exits back to the card you were on.
    if _is_practice_note(card) or is_inline_active(getattr(card, "id", None)):
        exit_inline()
        return
    try:
        leaves = qbank._leaf_keys(list(card.note().tags))
        tokens = qbank._tokens((card.question() or "") + " " + (card.answer() or ""))
    except Exception:
        leaves, tokens = set(), set()
    _, hi = _target_size()
    # Explicit request → always allow the text fallback so something relevant shows.
    cids = qbank.intersperse_card_ids(
        leaves, tokens, hi, use_text_fallback=True, exclude_cids=_seen)
    if not cids:
        tooltip("No related practice questions found for this card.\n"
                "Build the Practice deck first: Settings ▸ Practice ▸ Question Bank ▸ "
                "“Load Question Banks to Anki”.")
        return
    _inline_queue.extend(cids)
    try:
        r.nextCard()               # wrapped → serves the first inline card
    except Exception as e:
        log("intersperse practice_now: %s" % e)


def exit_inline():
    """Abandon any in-flight inline practice cards and return to the real review
    card. The underlying real card was never answered, so bypassing the wrap makes
    the scheduler serve it again (you land back where you were)."""
    _inline_queue.clear()
    _inline_active.clear()
    r = getattr(mw, "reviewer", None)
    if r is not None and _orig_nextcard is not None:
        try:
            _orig_nextcard(r)          # bypass the wrap → next real (unanswered) card
        except Exception as e:
            log("intersperse exit_inline: %s" % e)


def resolve_inline(cid, correct, answered):
    """Resolve an inline practice card WITHOUT the SRS backend (it wasn't scheduler-
    served, so answer_card would desync the real queue). Correct → suspend/retire
    (counts toward the bank Score, same as practice mode); wrong → resurface later
    this session; skip → drop. Then advance the reviewer to the next card."""
    _inline_active.discard(cid)
    try:
        if answered and correct:
            mw.col.sched.suspend_cards([cid])
        elif answered and not correct:
            if cid not in _requeue:
                _requeue.append(cid)   # comes back later, like practice-mode "Hard"
        # skip (not answered) → drop for the session (already in _seen)
    except Exception as e:
        log("intersperse resolve: %s" % e)
    r = getattr(mw, "reviewer", None)
    if r is not None:
        try:
            r.nextCard()
        except Exception as e:
            log("intersperse advance: %s" % e)


# ---------------------------------------------------------------------------
# Trigger B — mini practice set before a pomodoro break (native filtered deck)
# ---------------------------------------------------------------------------
def want_pre_break():
    c = _cfg()
    return bool(c.get("intersperse_enabled", False)
                and c.get("intersperse_before_break_enabled", True))


def _build_filtered(cids):
    try:
        old = mw.col.decks.by_name(_FILTERED_NAME)
        if old:
            try:
                mw.col.sched.empty_filtered_deck(int(old["id"]))
            except Exception:
                pass
            try:
                mw.col.decks.remove([int(old["id"])])
            except Exception:
                pass
        did = mw.col.decks.new_filtered(_FILTERED_NAME)
        d = mw.col.decks.get(did)
        search = "cid:" + ",".join(str(c) for c in cids)
        # v3 filtered-deck config: terms = [[search, limit, order]]; keep rescheduling
        # on so answered cards behave like a normal Practice-deck review.
        d["terms"] = [[search, len(cids), 0]]
        d["resched"] = True
        mw.col.decks.save(d)
        mw.col.sched.rebuild_filtered_deck(did)
        return did
    except Exception as e:
        log("intersperse filtered build: %s" % e)
        return None


def run_pre_break_set(on_done):
    """Present a short filtered-deck set of matched practice cards, then call
    on_done() (the pomodoro break). If nothing matches, on_done() runs immediately so
    the break is not delayed."""
    global _pre_break_active, _pre_break_on_done, _pre_break_prev_deck, _pre_break_did
    if not want_pre_break() or _pre_break_active:
        return on_done()
    _, hi = _target_size()
    leaves, tokens = _match_inputs()
    cids = qbank.intersperse_card_ids(
        leaves, tokens, hi, use_text_fallback=_use_text_fallback(),
        exclude_cids=_seen)
    if not cids:
        return on_done()               # nothing relevant → straight to the break
    try:
        _pre_break_prev_deck = mw.col.decks.get_current_id()
    except Exception:
        _pre_break_prev_deck = None
    did = _build_filtered(cids)
    if not did:
        return on_done()
    _pre_break_did = did
    _pre_break_on_done = on_done
    _pre_break_active = True
    _seen.update(cids)
    try:
        mw.col.decks.select(did)
        mw.moveToState("review")
    except Exception as e:
        log("intersperse pre-break enter: %s" % e)
        _pre_break_active = False
        _cleanup_pre_break()
        return on_done()


def _cleanup_pre_break():
    global _pre_break_did, _pre_break_prev_deck
    did = _pre_break_did
    _pre_break_did = None
    try:
        if did:
            mw.col.sched.empty_filtered_deck(int(did))
            mw.col.decks.remove([int(did)])
    except Exception:
        pass
    try:
        if _pre_break_prev_deck:
            mw.col.decks.select(_pre_break_prev_deck)
    except Exception:
        pass
    _pre_break_prev_deck = None


def _finish_pre_break():
    """Filtered set exhausted (or reviewer left): tear it down, resume the original
    deck, then begin the deferred break over its next card."""
    global _pre_break_active, _pre_break_on_done
    if not _pre_break_active:
        return
    _pre_break_active = False
    done = _pre_break_on_done
    _pre_break_on_done = None
    _cleanup_pre_break()
    try:
        mw.moveToState("review")       # resume the original deck's review
    except Exception:
        pass
    if done:
        try:
            done()                     # pomodoro _begin_break → overlay on next card
        except Exception as e:
            log("intersperse pre-break done: %s" % e)


# ---------------------------------------------------------------------------
# hooks
# ---------------------------------------------------------------------------
def _on_answered(reviewer, card, ease):
    global _cards_since
    if not _enabled():
        return
    if _is_practice_note(card):
        return                         # never count practice/interspersed cards
    try:
        note = card.note()
        _recent_leaves.append(qbank._leaf_keys(list(note.tags)))
        _recent_tokens.append(
            qbank._tokens((card.question() or "") + " " + (card.answer() or "")))
    except Exception:
        pass
    _cards_since += 1


def _on_state_change(new_state, old_state):
    global _inline_queue
    try:
        if _pre_break_active and old_state == "review" and new_state != "review":
            _finish_pre_break()
            return
    except Exception as e:
        log("intersperse state change: %s" % e)
    if new_state != "review":
        _inline_queue.clear()
        _inline_active.clear()


_hooks_installed = False


def install():
    """Wrap the reviewer + register hooks (idempotent)."""
    global _hooks_installed
    _install_nextcard_wrap()
    if _hooks_installed:
        return
    try:
        gui_hooks.reviewer_did_answer_card.append(_on_answered)
        gui_hooks.state_did_change.append(_on_state_change)
        _hooks_installed = True
    except Exception as e:
        log("intersperse hook register: %s" % e)
