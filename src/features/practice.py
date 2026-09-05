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


def _close_panel():
    global _panel
    try:
        if _panel is not None:
            _panel.close()
    except Exception:
        pass
    _panel = None


def preview_bank(bid, title=None):
    """Table-like, read-only view of an imported bank: one row per question stem;
    click a row to expand its choices (correct one marked) / answer."""
    global _panel
    from aqt.qt import (QDialog, QVBoxLayout, QHBoxLayout, QPushButton,
                        QTreeWidget, QTreeWidgetItem, QBrush, QColor)
    qs = qbank.questions_for_bank(bid)
    if not qs:
        tooltip("This bank has no questions to preview.")
        return

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
        top = QTreeWidgetItem(["%d.  %s" % (i, q.get("stem", ""))])
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
        tree.addTopLevelItem(top)

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
        preview_bank(bid, title)          # reopen so the new tags show

    tag_btn.clicked.connect(_retag)
    topbar.addWidget(tag_btn)
    topbar.addStretch()
    v.addLayout(topbar)
    v.addWidget(tree)
    dlg.resize(640, 540)
    _panel = dlg
    dlg.show()
    dlg.raise_()


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
