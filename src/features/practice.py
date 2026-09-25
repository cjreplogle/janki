"""Practice questions panel.

A frosted-glass dialog that shows questions from imported .qb banks related to
the card currently in the reviewer. MCQ questions (with `choices`) are auto-
graded; questions without choices are reveal-and-self-grade. Fully local.
"""

from aqt import mw
from aqt.qt import (
    Qt, QDialog, QWidget, QVBoxLayout, QHBoxLayout, QLabel, QPushButton,
    QScrollArea,
)
from aqt.utils import tooltip

from ..util.config import log, _cfg
from ..integrations import qbank

_panel = None
# One quiz "session" per card: the matched questions and how far we've stepped
# through them. Tab+Q advances the index; a new card rebuilds it.
_session = {"card_id": None, "qs": [], "i": -1}


def open_practice():
    """Tab+Q entry point: show the NEXT related question for the current card.
    Rebuilds the question set when the card changes; wraps with a tooltip when
    the card's questions are exhausted."""
    global _panel
    r = getattr(mw, "reviewer", None)
    card = getattr(r, "card", None) if r else None
    if card is None or getattr(mw, "state", None) != "review":
        tooltip("Practice: open a card in the reviewer first.")
        return
    cid = getattr(card, "id", None)
    if cid != _session["card_id"]:
        try:
            limit = int(_cfg().get("practice_num_questions", 5))
        except Exception:
            limit = 5
        try:
            _session["qs"] = qbank.find_for_card(card, limit=limit)
        except Exception as e:
            log("practice find_for_card: %s" % e)
            _session["qs"] = []
        _session["card_id"] = cid
        _session["i"] = -1
    qs = _session["qs"]
    if not qs:
        tooltip("No related practice questions found for this card.")
        return
    _session["i"] += 1
    if _session["i"] >= len(qs):        # stepped past the last → wrap + close
        _session["i"] = -1
        _close_panel()
        tooltip("That's all %d practice question(s) for this card." % len(qs))
        return
    _close_panel()
    _panel = PracticePanel(qs[_session["i"]], _session["i"], len(qs), mw)
    _panel.show()
    _panel.raise_()


_PRACTICE_PARENT = "Practice"


def _practice_dids():
    """The Practice parent deck id + all its children (the question banks)."""
    dids = set()
    try:
        for nid in mw.col.decks.all_names_and_ids():
            name = nid.name
            if name == _PRACTICE_PARENT or name.startswith(_PRACTICE_PARENT + "::"):
                dids.add(int(nid.id))
    except Exception as e:
        log("practice dids: %s" % e)
    return dids


def _amboss_dids():
    """Decks named AMBOSS (any path segment, e.g. "AMBOSS Qbank" or "Step 1::AMBOSS")
    plus their subdecks — shown under Practice instead of Decks when
    practice_hide_amboss is on (default)."""
    try:
        if not _cfg().get("practice_hide_amboss", True):
            return set()
        decks = list(mw.col.decks.all_names_and_ids())
    except Exception:
        return set()
    roots = [d.name for d in decks
             if "amboss" in d.name.split("::")[-1].lower()]
    return {int(d.id) for d in decks
            if any(d.name == r or d.name.startswith(r + "::") for r in roots)}


def _practice_banks():
    """List of (did, display_name, total) for each question-bank deck, sorted."""
    out = []
    try:
        for nid in mw.col.decks.all_names_and_ids():
            name = nid.name
            if not name.startswith(_PRACTICE_PARENT + "::"):
                continue
            disp = name.split("::", 1)[1]
            try:
                total = len(mw.col.find_cards('deck:"%s"' % name))
            except Exception:
                total = 0
            out.append((int(nid.id), disp, total))
    except Exception as e:
        log("practice banks: %s" % e)
    out.sort(key=lambda t: t[1].lower())
    return out


# When True, the NEXT deck-browser render shows ONLY the practice banks (inverted
# filter), then re-arms to normal. Set by the Practice toolbar button.
_practice_view = False


def open_practice_hub():
    """Toolbar 'Practice' button: show the question banks right where the deck list
    lives, using Anki's own deck rows so it looks identical. It's the same deck
    browser, filtered to only the Practice banks (which are hidden from the normal
    list). Click a bank row to study it; click Decks (or navigate) for the normal
    list again."""
    # The current view (deck list or Stats) fades out while the Practice view builds, then
    # drops in. From Stats, the stats page fades and closes itself once the fade has played.
    try:
        from . import stats_embed
        if stats_embed.is_open():
            stats_embed.close_soon()
            _open_practice_hub_now()
        else:
            stats_embed.fade_then(_open_practice_hub_now)
    except Exception:
        _open_practice_hub_now()


def _open_practice_hub_now():
    global _practice_view
    _practice_view = True
    # Stats swaps into the deck list's spot; already on the deck list this is an in-place
    # re-render (no state change), so close Stats explicitly or it stays on top.
    try:
        from . import stats_embed
        stats_embed.animate_next_deck_render()   # the Practice view drops in when drawn
        if not stats_embed._defer_close:
            stats_embed.close(animate=False)
    except Exception:
        pass
    # The umbrella "Practice" row is hidden in this view, so it MUST be expanded —
    # otherwise Anki doesn't render its children (the banks) at all and the view is
    # blank. NB: the deck-browser home list uses the *reviewer*-scope collapse state
    # (deck["collapsed"] / DeckCollapseScope.REVIEWER — the same one its own +/- toggle
    # writes), NOT "browserCollapsed" (which is the card-browser sidebar). We expand
    # only the parent so the banks list directly; each bank's lectures stay behind its
    # own + (collapsed).
    tree_changed = False
    try:
        pd = mw.col.decks.by_name(_PRACTICE_PARENT)
        if pd:
            tree_changed = bool(pd.get("collapsed"))   # expanding changes the deck tree
            try:
                from anki.decks import DeckCollapseScope
                mw.col.decks.set_collapsed(int(pd["id"]), collapsed=False,
                                           scope=DeckCollapseScope.REVIEWER)
            except Exception:
                # Legacy fallback: the reviewer-scope state is the "collapsed" field.
                pd["collapsed"] = False
                mw.col.decks.save(pd)
    except Exception:
        pass
    try:
        if getattr(mw, "state", None) != "deckBrowser":
            mw.moveToState("deckBrowser")   # renders → fires the filter hook
        else:
            from . import stats_embed        # already here → re-render (fast when current)
            # The fast redraw re-uses the deck tree Anki already has — only valid if expanding
            # "Practice" didn't just change it (then the banks weren't in that tree yet).
            if tree_changed or not stats_embed.fast_deck_redraw():
                mw.deckBrowser.refresh()
    except Exception as e:
        log("practice hub: %s" % e)
    # (the redraw is async and rebuilds the page — its baked-in CSS plays the drop-in)


def install_practice_toolbar(links, toolbar):
    """top_toolbar_did_init_links hook: add a light-green 'Practice' link (appears after
    Stats, next to Sync)."""
    try:
        # Plain text label — create_link puts it into aria-label="{label}" AND as the
        # visible text, so any quotes/HTML in it break the markup. Colour it green via a
        # <style> block appended alongside (targets the link id).
        link = toolbar.create_link(
            cmd="janki_practice",
            label="Practice",
            func=open_practice_hub,
            tip="Practice question banks",
            id="janki_practice")
        # Insert BEFORE the sync link so Practice sits inside Sync (Sync stays the
        # outermost item). Fall back to just-before-last, then append.
        idx = next((i for i, s in enumerate(links)
                    if isinstance(s, str) and ("pycmd('sync')" in s or 'id="sync"' in s)),
                   None)
        if idx is None:
            idx = max(len(links) - 1, 0)
        links.insert(idx, link)
        links.append("<style>#janki_practice{color:#90ee90 !important;"
                     "font-weight:600;}</style>")
        # Leaving the Practice view is an explicit "Decks" click — wrap that handler to
        # clear the flag (once), so collapse/expand and other refreshes keep the banks
        # up but Decks returns to the normal list.
        try:
            lh = getattr(toolbar, "link_handlers", None)
            if isinstance(lh, dict) and "decks" in lh and not getattr(
                    lh["decks"], "_janki_wrapped", False):
                _orig = lh["decks"]

                def _decks_wrap(*a, **k):
                    global _practice_view
                    if _practice_view:                 # Practice → Decks: fade out, drop in
                        _practice_view = False
                        try:
                            from . import stats_embed
                            if stats_embed.is_open():
                                # Practice → Stats → Decks: Stats is on top — let its own
                                # Decks handling close it (this path only redrew the hidden
                                # list behind Stats, so Decks needed a second click).
                                return _orig(*a, **k)
                            stats_embed.animate_next_deck_render()

                            def _go():
                                if not stats_embed.fast_deck_redraw():
                                    _orig(*a, **k)
                            stats_embed.fade_then(_go)
                            return None
                        except Exception:
                            pass
                    _practice_view = False
                    return _orig(*a, **k)

                _decks_wrap._janki_wrapped = True
                lh["decks"] = _decks_wrap
        except Exception as e:
            log("practice decks wrap: %s" % e)
    except Exception as e:
        log("practice toolbar: %s" % e)


def _acc_pct(did, names):
    """Score for a bank/subbank (this deck + its descendants): the share of the cards
    you've ATTEMPTED that you've RETIRED (suspended). Binary practice suspends a card on
    a correct answer, so this reads as 'of what I've attempted, how much I've gotten
    right / cleared'. = suspended cards / attempted cards.

    Both counts come from the card's CURRENT queue (not the review log), so a card that
    is Forgotten/reset — returning to the new queue — drops back out of the denominator.
    (The old revlog-based count kept every card that was EVER answered forever, since a
    reset doesn't delete revlog history, which made the score read far too low.)

    Attempted = queue in (-1 suspended, 1 learning, 2 review, 3 day-relearn): everything
    that's been answered at least once and not reset. Excludes new (0, incl. reset cards)
    and buried (-2/-3, i.e. skips). Returns an int 0..100, or None when nothing's been
    attempted yet."""
    try:
        this = names.get(did)
        if this is None:
            return None
        sub = [d for d, nm in names.items()
               if nm == this or nm.startswith(this + "::")]
        if not sub:
            return None
        ph = ",".join("?" * len(sub))
        row = mw.col.db.first(
            "select "
            "sum(case when queue=-1 then 1 else 0 end),"
            "sum(case when queue in (-1,1,2,3) then 1 else 0 end) "
            "from cards where did in (%s)" % ph, *sub)
        suspended, attempted = (row or [0, 0])
        suspended = suspended or 0
        attempted = attempted or 0
        if not attempted:
            return None
        return max(0, min(100, int(round(100.0 * suspended / attempted))))
    except Exception as e:
        log("acc pct: %s" % e)
        return None


def hide_practice_rows(deck_browser, content):
    """deck_browser_will_render_content hook.

    Normal render: strip the Practice parent + bank rows from the main deck list, so
    banks live only under the Practice button.

    Practice view (just after clicking Practice): INVERT — keep only the Practice bank
    rows so the same deck browser shows the banks where the decks normally are. The
    flag is consumed after one render (navigating/refreshing returns to normal)."""
    global _practice_view
    import re
    try:
        dids = _practice_dids()
        amb = _amboss_dids()               # AMBOSS decks live under Practice too
        html = content.tree
        if _practice_view:
            # Show the banks as the top decks (each expandable by lecture), dropping the
            # "Practice" umbrella row. But NEVER strip everything: if no bank rows are
            # present (cards live directly in "Practice", or its subdecks aren't in the
            # rendered tree), fall back to showing the "Practice" deck itself so the
            # view is never blank.
            parent_did = None
            try:
                d = mw.col.decks.by_name(_PRACTICE_PARENT)
                if d:
                    parent_did = int(d["id"])
            except Exception:
                pass
            children = {x for x in dids if x != parent_did}
            names = {int(n.id): n.name for n in mw.col.decks.all_names_and_ids()}

            def _filter(keep, deindent):
                hdr = iter(["To-Do", "Review", "Score"])   # New / Learn / Due columns

                def _row(m):
                    row = m.group(0)
                    if "<th" in row:                    # column header row
                        row = re.sub(r"(<th colspan=5[^>]*>).*?(</th>)", r"\1Bank\2",
                                     row, count=1, flags=re.DOTALL)
                        row = re.sub(r"(<th class=count>).*?(</th>)",
                                     lambda mm: mm.group(1) + next(hdr, "") + mm.group(2),
                                     row, flags=re.DOTALL)
                        return row
                    if "top-level-drag-row" in row:     # spacer → same top gap as normal
                        return row
                    idm = re.search(r"<tr[^>]*id='(\d+)'", row)
                    if not idm:
                        return ""
                    did = int(idm.group(1))
                    if did not in keep:
                        return ""
                    # De-indent one level: banks were Practice::Bank (level 2), so strip
                    # the leading 6× &nbsp; so banks read as top-level, lectures nest.
                    if did in deindent:
                        row = re.sub(r"(<td class=decktd colspan=5>)(?:&nbsp;){6}", r"\1",
                                     row, count=1)
                    if did in amb:                  # AMBOSS deck: keep its real counts
                        return row
                    # Replace the Due count with % accuracy for this bank/subbank subtree.
                    pct = _acc_pct(did, names)
                    label = ("%d%%" % pct) if pct is not None else "—"
                    cells = list(re.finditer(r"<td align=end>.*?</td>", row, re.DOTALL))
                    if len(cells) >= 3:
                        c = cells[2]
                        row = (row[:c.start()]
                               + '<td align=end><span class="review-count">%s</span></td>' % label
                               + row[c.end():])
                    return row
                return re.sub(r"<tr[^>]*>.*?</tr>", _row, content.tree, flags=re.DOTALL)

            out = _filter(children | amb, children) if (children or amb) else ""
            # Fallback: nothing survived (no bank rows in the tree) → show the whole
            # Practice subtree, parent included, so it's never invisible.
            if not out or not re.search(r"<tr[^>]*id='\d+'", out):
                out = _filter(dids, children)
            html = out
        else:
            for did in dids | amb:
                html = re.sub(
                    r"<tr[^>]*>(?:(?!</tr>).)*?open:%d\b.*?</tr>" % did,
                    "", html, flags=re.DOTALL)
        content.tree = html
        # The AMBOSS add-on's "Qbank" tile (appended to the deck browser's stats area):
        # shown in the Practice view, hidden from the normal deck list.
        if not _practice_view and _cfg().get("practice_hide_amboss", True):
            st_html = content.stats or ""
            st_html = re.sub(r'(?is)<script[^>]*amboss-anki-qbank-widget[^>]*>\s*</script>',
                             "", st_html)
            st_html = re.sub(r'(?is)<amboss-component-wrapper\b[^>]*id="amboss-qbank-widget"'
                             r'[^>]*>.*?</amboss-component-wrapper>', "", st_html)
            # Fallback if the tile is added after this hook runs: drop it once loaded.
            st_html += ("<script>(function(){function k(){var e=document.getElementById("
                        "'amboss-qbank-widget');if(e)e.remove();}"
                        "document.addEventListener('DOMContentLoaded',k);"
                        "setTimeout(k,0);setTimeout(k,300);})();</script>")
            content.stats = st_html
    except Exception as e:
        log("hide practice rows: %s" % e)


def _close_panel():
    global _panel
    try:
        if _panel is not None:
            _panel.close()
    except Exception:
        pass
    _panel = None


def _lecture_matches(lec, path):
    """True if a question's lecture path starts with the subbank `path` (both split
    on '::' and whitespace-normalised)."""
    have = [s.strip() for s in (lec or "").split("::") if s.strip()]
    want = [s.strip() for s in (path or "").split("::") if s.strip()]
    return have[:len(want)] == want


def preview_bank(bid, title=None, path=None):
    """Table-like, read-only view of an imported bank: one row per question stem;
    click a row to expand its choices (correct one marked) / answer. When `path` is
    given, only questions in that subbank/lecture (lecture starting with `path`) are
    shown."""
    global _panel
    import os
    from aqt.qt import (QDialog, QVBoxLayout, QHBoxLayout, QPushButton, QLabel,
                        QTreeWidget, QTreeWidgetItem, QBrush, QColor, QPixmap, Qt)
    qs = qbank.questions_for_bank(bid)
    if path:
        qs = [q for q in qs if _lecture_matches(q.get("lecture"), path)]
    if not qs:
        tooltip("This subbank has no questions to preview." if path
                else "This bank has no questions to preview.")
        return
    meta = qbank.list_banks().get(bid, {})
    media_dir = os.path.join(qbank._qbanks_dir(), meta.get("dir", ""), "media")

    tree = QTreeWidget()
    tree.setHeaderHidden(True)
    tree.setColumnCount(1)
    tree.setWordWrap(True)
    tree.setStyleSheet(
        "QTreeWidget{background:#1c1d21;color:#eee;border:none;font-size:13px;}"
        "QTreeWidget::item{padding:5px;}"
        "QTreeWidget::item:selected{background:rgba(255,255,255,0.08);}")
    green = QBrush(QColor("#7ddb9a"))
    for i, q in enumerate(qs, 1):
        stem_txt = ("(figure question — see image)" if q.get("figure_only")
                    else q.get("stem", "") or "(no stem detected)")
        prefix = "⚠ " if q.get("incomplete") else ""
        top = QTreeWidgetItem(["%s%d.  %s" % (prefix, i, stem_txt)])
        if q.get("incomplete"):
            top.setForeground(0, QBrush(QColor("#ffcf7a")))
            ic = QTreeWidgetItem(["Incomplete:  %s" % q.get("incomplete")])
            ic.setForeground(0, QBrush(QColor("#ffcf7a")))
            top.addChild(ic)
        choices = q.get("choices")
        if choices:
            ci = PracticePanel._answer_index(q.get("answer"), choices)
            for j, c in enumerate(choices):
                label = "%s.  %s" % (chr(65 + j), c)
                child = QTreeWidgetItem([label + ("   ✓" if j == ci else "")])
                if j == ci:
                    child.setForeground(0, green)
                top.addChild(child)
        else:
            child = QTreeWidgetItem(["Answer:  %s" % (q.get("answer") or "")])
            child.setForeground(0, green)
            top.addChild(child)
        exp = (q.get("explanation") or "").strip()
        if exp:
            echild = QTreeWidgetItem(["Rationale:  %s" % exp])
            echild.setForeground(0, QBrush(QColor("#c9b98a")))
            top.addChild(echild)
        lec = q.get("lecture")
        if lec:
            lchild = QTreeWidgetItem(["Lecture:  %s" % lec])
            lchild.setForeground(0, QBrush(QColor("#9aa0aa")))
            top.addChild(lchild)
        tags = q.get("tags")
        if tags:
            tchild = QTreeWidgetItem(["Tags:  %s" % ", ".join(str(t) for t in tags)])
            tchild.setForeground(0, QBrush(QColor("#9aa0aa")))
            top.addChild(tchild)
        img_items = []
        for name in (q.get("media") or []):
            fp = os.path.join(media_dir, name)
            pm = QPixmap(fp) if os.path.isfile(fp) else QPixmap()
            if pm.isNull():
                continue
            ichild = QTreeWidgetItem([""])
            top.addChild(ichild)
            img_items.append((ichild, pm))
        tree.addTopLevelItem(top)
        for ichild, pm in img_items:          # widgets set after the item is in the tree
            lbl = QLabel()
            lbl.setPixmap(pm.scaledToWidth(
                420, Qt.TransformationMode.SmoothTransformation)
                if pm.width() > 420 else pm)
            lbl.setStyleSheet("padding:4px;")
            tree.setItemWidget(ichild, 0, lbl)

    def _toggle(it, _col):
        if it.parent() is None:               # only top-level rows expand/collapse
            it.setExpanded(not it.isExpanded())
    tree.itemClicked.connect(_toggle)

    try:
        if _panel is not None:
            _panel.close()
    except Exception:
        pass
    dlg = QDialog(mw)
    dlg.setWindowTitle("Preview — %s  (%d questions)" % (title or bid, len(qs)))
    dlg.setStyleSheet("QDialog{background:#1c1d21;}")
    v = QVBoxLayout(dlg)
    topbar = QHBoxLayout()
    tag_btn = QPushButton("Tag banks from lecture map")
    tag_btn.setStyleSheet("QPushButton{background:#55585e;color:#fff;border:none;"
                          "padding:5px 12px;border-radius:5px;}"
                          "QPushButton:hover{background:#61646b;}")

    def _retag():
        tagged, total = qbank.retag_from_lecture_map()
        tooltip("Tagged %d of %d questions from the lecture map." % (tagged, total))
        preview_bank(bid, title, path)    # reopen so the new tags show

    tag_btn.clicked.connect(_retag)
    topbar.addWidget(tag_btn)
    topbar.addStretch()
    v.addLayout(topbar)
    v.addWidget(tree)
    dlg.resize(640, 540)
    _panel = dlg
    dlg.show()
    dlg.raise_()
    try:
        from ..user import glass
        glass.hold_dialog_above(dlg)
    except Exception:
        pass


def _clear(layout):
    while layout.count():
        it = layout.takeAt(0)
        w = it.widget()
        if w is not None:
            w.setParent(None)
        elif it.layout() is not None:
            _clear(it.layout())


class PracticePanel(QDialog):
    def __init__(self, question, index, total, parent):
        super().__init__(parent)
        self.setWindowTitle("Practice")
        self.setWindowFlags(Qt.WindowType.Dialog | Qt.WindowType.FramelessWindowHint)
        self.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground)
        self._q = question

        outer = QVBoxLayout(self)
        outer.setContentsMargins(0, 0, 0, 0)
        self._card = QWidget(self)
        self._card.setObjectName("qbcard")
        self._card.setStyleSheet(
            "#qbcard{background: rgba(28,29,33,0.94); border-radius: 14px;"
            "border: 1px solid rgba(255,255,255,0.08);}"
            "QLabel{color:#f0f0f0; background:transparent;}"
        )
        outer.addWidget(self._card)
        self._root = QVBoxLayout(self._card)
        self._root.setContentsMargins(22, 18, 22, 16)
        self._root.setSpacing(12)

        src = "AI" if question.get("source") == "ai" else "bank"
        head = QLabel("Question %d of %d   ·   %s" % (index + 1, total, src))
        head.setStyleSheet("color: rgba(255,255,255,0.55); font-size: 12px;")
        self._root.addWidget(head)

        self._scroll = QScrollArea()
        self._scroll.setWidgetResizable(True)
        self._scroll.setFrameShape(QScrollArea.Shape.NoFrame)
        self._scroll.setStyleSheet("QScrollArea{background:transparent;}")
        self._body_host = QWidget()
        self._body = QVBoxLayout(self._body_host)
        self._body.setContentsMargins(0, 0, 0, 0)
        self._body.setSpacing(10)
        self._scroll.setWidget(self._body_host)
        self._root.addWidget(self._scroll, 1)

        foot = QHBoxLayout()
        hint = QLabel("Tab+Q → next question")
        hint.setStyleSheet("color: rgba(255,255,255,0.40); font-size: 12px;")
        _close = QPushButton("Close")
        _close.setStyleSheet(
            "QPushButton{background:rgba(255,255,255,0.10);color:#eee;"
            "border:none;padding:6px 14px;border-radius:7px;}"
            "QPushButton:hover{background:rgba(255,255,255,0.18);}")
        _close.clicked.connect(self.close)
        foot.addWidget(hint)
        foot.addStretch()
        foot.addWidget(_close)
        self._root.addLayout(foot)

        self.resize(600, 460)
        self._render()

    def _render(self):
        _clear(self._body)
        q = self._q
        stem = QLabel(q.get("stem", ""))
        stem.setWordWrap(True)
        stem.setTextFormat(Qt.TextFormat.RichText)
        stem.setStyleSheet("font-size: 16px; line-height: 1.4;")
        self._body.addWidget(stem)

        if q.get("choices"):
            self._render_mcq(q)
        else:
            self._render_recall(q)
        self._body.addStretch()

    # --- MCQ (auto-graded) --------------------------------------------------
    def _render_mcq(self, q):
        choices = q.get("choices") or []
        answer = q.get("answer")
        correct = self._answer_index(answer, choices)
        self._btns = []
        for idx, text in enumerate(choices):
            b = QPushButton("%s.  %s" % (chr(65 + idx), text))
            b.setStyleSheet(self._choice_css())
            b.clicked.connect(lambda _c=False, i=idx: self._grade(i, correct, q))
            self._body.addWidget(b)
            self._btns.append(b)

    def _grade(self, picked, correct, q):
        for i, b in enumerate(self._btns):
            b.setEnabled(False)
            if i == correct:
                b.setStyleSheet(self._choice_css("ok"))
            elif i == picked:
                b.setStyleSheet(self._choice_css("bad"))
        self._show_explanation(q, header=("Correct!" if picked == correct
                                          else "Not quite."))

    # --- Free-recall (self-graded) -----------------------------------------
    def _render_recall(self, q):
        reveal = QPushButton("Reveal answer")
        reveal.setStyleSheet(
            "QPushButton{background:rgba(90,140,255,0.22);color:#dfe8ff;"
            "border:none;padding:8px 14px;border-radius:8px;}"
            "QPushButton:hover{background:rgba(90,140,255,0.32);}")
        reveal.clicked.connect(lambda: self._reveal_recall(q, reveal))
        self._body.addWidget(reveal)

    def _reveal_recall(self, q, btn):
        btn.setEnabled(False)
        ans = q.get("answer")
        if ans not in (None, ""):
            a = QLabel("<b>Answer:</b> %s" % ans)
            a.setWordWrap(True)
            a.setStyleSheet("color:#bfe3c6; font-size:15px;")
            self._body.insertWidget(self._body.count() - 1, a)
        self._show_explanation(q)

    # --- shared -------------------------------------------------------------
    def _show_explanation(self, q, header=None):
        exp = q.get("explanation")
        if header:
            h = QLabel(header)
            h.setStyleSheet("color:rgba(255,255,255,0.75); font-weight:600;")
            self._body.insertWidget(self._body.count(), h)
        if exp:
            e = QLabel(exp)
            e.setWordWrap(True)
            e.setTextFormat(Qt.TextFormat.RichText)
            e.setStyleSheet("color:rgba(255,255,255,0.80); font-size:13px;"
                            "background:rgba(255,255,255,0.05);"
                            "border-radius:8px; padding:10px;")
            self._body.insertWidget(self._body.count(), e)

    @staticmethod
    def _answer_index(answer, choices):
        if isinstance(answer, int):
            return answer
        try:
            return choices.index(answer)
        except (ValueError, AttributeError):
            pass
        # single letter like "B"
        if isinstance(answer, str) and len(answer.strip()) == 1:
            i = ord(answer.strip().upper()) - 65
            if 0 <= i < len(choices):
                return i
        return -1

    @staticmethod
    def _choice_css(kind=None):
        base = ("QPushButton{text-align:left;color:#eee;border:none;"
                "padding:9px 12px;border-radius:8px;%s}"
                "QPushButton:hover{background:rgba(255,255,255,0.16);}")
        if kind == "ok":
            return base % "background:rgba(80,200,120,0.30);"
        if kind == "bad":
            return base % "background:rgba(230,90,90,0.30);"
        return base % "background:rgba(255,255,255,0.08);"
