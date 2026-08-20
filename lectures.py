"""
Janki Lectures — local, offline "unsuspend today's lecture cards" for Anki.

Everything runs on-device: it reads a LOCAL .ics calendar file and a LOCAL
tag↔lecture spreadsheet (.xlsx), figures out which lectures are on today,
resolves their AJ_UCCOM_keep + #AK (AnKing) tags, previews how many suspended
cards that is, and unsuspends them only after you confirm. No network. No data
leaves the machine.

Data sources (see config.json, editable via Tools > Add-ons > Config):
  ics_path   : local iCalendar export (lecture titles + dates)
  xlsx_path  : local spreadsheet mapping lecture name -> tags
  timezone   : IANA tz used to decide what "today" is
  auto_on_launch : run the preview automatically when a profile opens
  unsuspend_aj / unsuspend_ak : which tag families to include

Nothing is ever printed off-device; a local debug log is written to
~/Library/Logs/janki-lectures.log (stays on your machine).
"""

import os
import re
import html
import json
import zipfile
import difflib
import datetime
import traceback

from aqt import mw, gui_hooks
from aqt.qt import QAction, QMessageBox, QTimer
from aqt.utils import showInfo, tooltip

ADDON_DIR = os.path.dirname(__file__)
LOG_PATH = os.path.expanduser("~/Library/Logs/janki-lectures.log")


def _log(msg):
    try:
        with open(LOG_PATH, "a", encoding="utf-8") as f:
            f.write("%s  %s\n" % (datetime.datetime.now().isoformat(timespec="seconds"), msg))
    except Exception:
        pass


def _cfg():
    cfg = mw.addonManager.getConfig(__name__) or {}
    cfg.setdefault("ics_path", "~/Downloads/lectures.ics")
    cfg.setdefault("xlsx_path", "~/Downloads/lecture_tags.xlsx")
    cfg.setdefault("timezone", "America/New_York")
    cfg.setdefault("auto_on_launch", True)
    cfg.setdefault("unsuspend_aj", True)
    cfg.setdefault("unsuspend_ak", True)
    cfg.setdefault("fuzzy_cutoff", 0.72)
    return cfg


def _p(path):
    return os.path.expanduser(path or "")


def _rollover_hour():
    """Anki's 'next day starts at' hour (default 4am). Anki rolls the study day
    over this many hours after midnight, so a late-night session before it still
    counts as the previous day."""
    try:
        return int(mw.col.get_config("rollover", 4))
    except Exception:
        pass
    try:  # older Anki
        return int(mw.col.conf.get("rollover", 4))
    except Exception:
        return 4


def _today():
    tz = None
    try:
        from zoneinfo import ZoneInfo
        tz = ZoneInfo(_cfg()["timezone"])
    except Exception:
        tz = None
    # Align "today" with Anki's day boundary: shifting back by the rollover hour
    # makes any time before it fall on the previous day, exactly like Anki's
    # scheduler. Keeps the new-day auto-prompt (and lecture matching) in step with
    # what Anki considers the current study day.
    now = datetime.datetime.now(tz) - datetime.timedelta(hours=_rollover_hour())
    return now.date()


# ---------------------------------------------------------------- ICS ----------

def _is_url(path):
    return bool(re.match(r"(?i)^https?://", (path or "").strip()))


def _read_source_text(path):
    """Read a source that may be a local file path OR an http(s) URL.

    URL fetching is opt-in (only when the configured path is a URL) and is the
    single spot in the add-on that touches the network — a local file path keeps
    everything fully offline.
    """
    p = (path or "").strip()
    if _is_url(p):
        import urllib.request
        with urllib.request.urlopen(p, timeout=20) as resp:  # noqa: S310 (user-supplied own calendar)
            return resp.read().decode("utf-8", "ignore")
    return open(_p(p), encoding="utf-8", errors="ignore").read()


def parse_ics_today(path, target=None):
    """Return list of SUMMARY strings for events whose DTSTART date == `target`
    (defaults to today, but the dialog can point it a day ahead/behind)."""
    try:
        raw = _read_source_text(path)
    except Exception as e:
        _log("ics read failed: %s" % e)
        return []
    raw = re.sub(r"\r?\n[ \t]", "", raw)  # unfold RFC5545 continuation lines
    today = target or _today()
    out = []
    for block in raw.split("BEGIN:VEVENT")[1:]:
        s = re.search(r"SUMMARY[^:\r\n]*:(.*)", block)
        d = re.search(r"DTSTART[^:]*:(\d{8})", block)
        if not (s and d):
            continue
        try:
            dt = datetime.datetime.strptime(d.group(1), "%Y%m%d").date()
        except Exception:
            continue
        if dt == today:
            summ = s.group(1).strip()
            summ = summ.replace("\\,", ",").replace("\\;", ";").replace("\\n", " ").strip()
            if summ:
                out.append(summ)
    return out


# --------------------------------------------------------------- XLSX ----------

def _colnum(ref):
    c = re.match(r"([A-Z]+)", ref).group(1)
    n = 0
    for ch in c:
        n = n * 26 + (ord(ch) - 64)
    return n - 1


def _load_xlsx(path):
    """Return list of (sheet_name, rows) where rows is a list of {col_index: text}."""
    z = zipfile.ZipFile(_p(path))
    names = z.namelist()
    ss = []
    if "xl/sharedStrings.xml" in names:
        sx = z.read("xl/sharedStrings.xml").decode("utf-8", "ignore")
        for si in re.findall(r"<si>(.*?)</si>", sx, re.S):
            ss.append(html.unescape("".join(re.findall(r"<t[^>]*>(.*?)</t>", si, re.S))))
    wb = z.read("xl/workbook.xml").decode("utf-8", "ignore")
    rels = z.read("xl/_rels/workbook.xml.rels").decode("utf-8", "ignore")
    ridmap = dict(re.findall(r'Id="([^"]+)"[^>]*Target="([^"]+)"', rels))
    sheets = re.findall(r'<sheet[^>]*name="([^"]*)"[^>]*r:id="([^"]+)"', wb)

    def read_sheet(fn):
        xml = z.read("xl/worksheets/" + fn).decode("utf-8", "ignore")
        rows = []
        for row in re.findall(r"<row[^>]*>(.*?)</row>", xml, re.S):
            cells = {}
            for attrs, body in re.findall(r'<c\b([^>]*)>(.*?)</c>', row, re.S):
                ref = re.search(r'r="([A-Z]+\d+)"', attrs)
                if not ref:
                    continue
                ci = _colnum(ref.group(1))
                t = re.search(r't="([^"]+)"', attrs)
                v = re.search(r"<v>(.*?)</v>", body, re.S)
                iss = re.search(r"<is>.*?<t[^>]*>(.*?)</t>", body, re.S)
                if t and t.group(1) == "s" and v:
                    cells[ci] = ss[int(v.group(1))]
                elif iss:
                    cells[ci] = html.unescape(iss.group(1))
                elif v:
                    cells[ci] = html.unescape(v.group(1))
            rows.append(cells)
        return rows

    out = []
    for name, rid in sheets:
        tgt = ridmap.get(rid, "")
        fn = tgt.split("/")[-1]
        if fn:
            try:
                out.append((name, read_sheet(fn)))
            except Exception as e:
                _log("sheet %s read failed: %s" % (name, e))
    return out


def _norm(s):
    s = (s or "").lower()
    s = s.replace("&", " and ")
    return re.sub(r"[^a-z0-9]+", "", s)


def _extract_searches(cell, want_aj, want_ak):
    """Pull AJ_UCCOM_keep / #AK search fragments out of one messy cell."""
    out = []
    if not cell:
        return out
    for line in cell.split("\n"):
        line = line.strip()
        if not line:
            continue
        # drop trailing human notes in parentheses, e.g. "(SEE NOTE)" / "(some cards)"
        line = re.sub(r"\s*\([^()]*\)\s*$", "", line).strip()
        if not line:
            continue
        nb = line.replace("\\", "")
        is_aj = "AJ_UCCOM_keep" in nb
        is_ak = "#AK" in nb
        if not (is_aj or is_ak):
            continue
        if is_aj and not want_aj:
            continue
        if is_ak and not want_ak:
            continue
        frag = line
        if not frag.lower().startswith("tag:") and (frag.startswith("AJ_UCCOM_keep") or frag.startswith("#AK")):
            frag = "tag:" + frag
        out.append(frag)
    return out


def build_lecture_map(want_aj, want_ak):
    """norm_lecture_name -> {'display': str, 'searches': [str, ...]} across all sheets.

    Sheets are laid out in horizontal blocks; each block has a
    'Corresponding Decks/Tags' header. Lecture name sits one column left of it,
    AJ tags in that column, #AK (ANKING) tags one column right.
    """
    m = {}
    for name, rows in _load_xlsx(_cfg()["xlsx_path"]):
        anchors = set()
        for r in rows:
            for ci, val in r.items():
                if (val or "").strip() == "Corresponding Decks/Tags":
                    anchors.add(ci)
        if not anchors:
            anchors = {1}
        for r in rows:
            for c in anchors:
                lec = (r.get(c - 1) or "").strip()
                if not lec or lec == "Our Lecture" or lec.startswith("If you see"):
                    continue
                searches = _extract_searches(r.get(c), want_aj, want_ak)
                searches += _extract_searches(r.get(c + 1), want_aj, want_ak)
                if not searches:
                    continue
                key = _norm(lec)
                if not key:
                    continue
                entry = m.setdefault(key, {"display": lec, "searches": []})
                for s in searches:
                    if s not in entry["searches"]:
                        entry["searches"].append(s)
    return m


# ------------------------------------------------------------- aliases ---------

def _alias_path():
    return os.path.join(ADDON_DIR, "aliases.json")


def _load_aliases():
    """Map of normalized-calendar-title -> spreadsheet lecture display name."""
    try:
        with open(_alias_path(), encoding="utf-8") as f:
            return {(_norm(k)): v for k, v in json.load(f).items()}
    except Exception:
        return {}


# ------------------------------------------------------------- matching --------

def match_today(want_aj, want_ak):
    """Return (matched, unmatched).

    matched: list of (calendar_title, resolved_lecture, searches, is_fuzzy).
    Calendar titles often abbreviate differently from the spreadsheet
    ("Introduction to X" vs "Intro to X"), so after an exact/alias match we fall
    back to a conservative similarity match. Fuzzy hits are flagged so the
    preview can show what they resolved to and you can veto a wrong guess.
    """
    lectures = parse_ics_today(_cfg()["ics_path"])
    m = build_lecture_map(want_aj, want_ak)
    aliases = _load_aliases()
    cutoff = float(_cfg().get("fuzzy_cutoff", 0.72))
    keys = list(m.keys())
    matched, unmatched = [], []
    for lec in lectures:
        key = _norm(lec)
        if key in aliases:
            key = _norm(aliases[key])
        if key in m:
            matched.append((lec, m[key]["display"], m[key]["searches"], False))
            continue
        close = difflib.get_close_matches(key, keys, n=1, cutoff=cutoff)
        if close:
            mk = close[0]
            matched.append((lec, m[mk]["display"], m[mk]["searches"], True))
        else:
            unmatched.append(lec)
    return matched, unmatched


def _suspended_ids(searches):
    if not searches:
        return set()
    joined = " OR ".join("(%s)" % s for s in searches)
    try:
        return set(mw.col.find_cards("(%s) is:suspended" % joined))
    except Exception as e:
        _log("find_cards failed: %s" % e)
        return set()


def _match_ids(searches):
    """All card ids matching these searches, regardless of suspend state — used to
    know which lecture a card belongs to when reconciling re-suspends."""
    if not searches:
        return set()
    joined = " OR ".join("(%s)" % s for s in searches)
    try:
        return set(mw.col.find_cards("(%s)" % joined))
    except Exception as e:
        _log("find_cards (all) failed: %s" % e)
        return set()


def _unsuspend_ids(ids):
    ids = list(ids)
    if not ids:
        return
    try:
        mw.col.sched.unsuspend_cards(ids)
    except Exception:
        mw.col.unsuspend_cards(ids)


def _suspend_ids(ids):
    ids = list(ids)
    if not ids:
        return
    try:
        mw.col.sched.suspend_cards(ids)
    except Exception:
        mw.col.suspend_cards(ids)


# -------------------------------------------------------------- aliases IO -----

def _load_aliases_raw():
    try:
        with open(_alias_path(), encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {}


def _save_aliases(raw):
    try:
        with open(_alias_path(), "w", encoding="utf-8") as f:
            json.dump(raw, f, indent=2, ensure_ascii=False)
    except Exception as e:
        _log("save aliases failed: %s" % e)


# -------------------------------------------------------------- state IO -------

def _state_path():
    return os.path.join(ADDON_DIR, "state.json")


def _load_state():
    try:
        with open(_state_path(), encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {}


def _save_state(d):
    try:
        with open(_state_path(), "w", encoding="utf-8") as f:
            json.dump(d, f)
    except Exception as e:
        _log("save state failed: %s" % e)


# ---- today's active set: what Janki has unsuspended for the current day -------
# So re-opening the window can add/remove lectures and re-suspend cards Janki
# itself unsuspended (never touches cards the user unsuspended by other means).

def _day_key(day):
    return (day or _today()).isoformat()


def _has_day_state(day):
    return _day_key(day) in ((_load_state().get("days")) or {})


def _load_day_active(day):
    """Return (owned_ids:set, active_lectures:list[display]) for `day`, or empty."""
    d = ((_load_state().get("days")) or {}).get(_day_key(day))
    if not d:
        return set(), []
    return set(d.get("ids", [])), list(d.get("lectures", []))


def _save_day_active(ids, lectures, day):
    st = _load_state()
    days = st.setdefault("days", {})
    key = _day_key(day)
    if ids or lectures:
        days[key] = {"ids": sorted(int(i) for i in ids), "lectures": list(lectures)}
    else:
        days.pop(key, None)   # nothing active → drop the entry
    _save_state(st)


def _owned_except(day):
    """Union of owned card ids across ALL other tracked days — cards still wanted
    for another day must not be re-suspended when editing this one."""
    key = _day_key(day)
    out = set()
    for k, d in ((_load_state().get("days")) or {}).items():
        if k != key:
            out |= set(d.get("ids", []))
    return out


# --------------------------------------------------------------- UI ------------

def _day_label(offset):
    names = {0: "Today", -1: "Yesterday", 1: "Tomorrow"}
    if offset in names:
        return names[offset]
    return ("+%d days" % offset) if offset > 0 else ("%d days" % offset)


def _open_today_dialog(day_offset=0):
    from aqt.qt import (
        QDialog, QVBoxLayout, QHBoxLayout, QLabel, QTableWidget, QTableWidgetItem,
        QComboBox, QPushButton, QHeaderView, QAbstractItemView, Qt as _Qt,
    )
    cfg = _cfg()
    target = _today() + datetime.timedelta(days=day_offset)
    want_aj = cfg.get("unsuspend_aj", True)
    want_ak = cfg.get("unsuspend_ak", True)
    cutoff = float(cfg.get("fuzzy_cutoff", 0.72))

    m = build_lecture_map(want_aj, want_ak)
    keys = list(m.keys())
    opts = sorted(keys, key=lambda k: m[k]["display"].lower())   # norm keys, by display
    aliases = _load_aliases()
    events = parse_ics_today(cfg["ics_path"], target)

    # The target day's active set (what Janki has already unsuspended for it). If
    # present, rows are pre-checked to mirror it — so re-opening reflects "what
    # they were" and unchecking a lecture re-suspends its cards.
    has_day_state = _has_day_state(target)
    _owned_ids, _active_lecs = _load_day_active(target)
    active_set = set(_active_lecs)

    if not events:
        if QMessageBox.question(
                mw, "Janki Lectures",
                "No calendar events for %s (%s).\n\nLook at another day?"
                % (_day_label(day_offset), target.strftime("%a %b %d, %Y")),
                QMessageBox.StandardButton.Yes | QMessageBox.StandardButton.No
                ) == QMessageBox.StandardButton.Yes:
            QTimer.singleShot(0, lambda: _open_today_dialog(day_offset + 1))
        return

    dlg = QDialog(mw)
    dlg.setWindowTitle("Lectures — %s" % _day_label(day_offset))
    dlg.resize(760, 460)
    v = QVBoxLayout(dlg)

    # ── Day navigation ───────────────────────────────────────────────────────
    nav = QHBoxLayout()
    btn_prev = QPushButton("◀ Prev day")
    btn_today = QPushButton("Today")
    btn_next = QPushButton("Next day ▶")
    btn_today.setEnabled(day_offset != 0)
    day_hdr = QLabel("<b>%s — %s</b>" % (_day_label(day_offset),
                                         target.strftime("%a %b %d, %Y")))
    nav.addWidget(btn_prev)
    nav.addWidget(btn_today)
    nav.addWidget(btn_next)
    nav.addSpacing(12)
    nav.addWidget(day_hdr)
    nav.addStretch(1)
    v.addLayout(nav)

    def _goto(new_offset):
        dlg.reject()
        QTimer.singleShot(0, lambda: _open_today_dialog(new_offset))

    btn_prev.clicked.connect(lambda: _goto(day_offset - 1))
    btn_next.clicked.connect(lambda: _goto(day_offset + 1))
    btn_today.clicked.connect(lambda: _goto(0))

    v.addWidget(QLabel(
        "%d calendar events, %d lectures in spreadsheet. Pick the matching lecture "
        "for each row. “~” = auto-guess (fuzzy). Changes are saved so they stick."
        % (len(events), len(m))))
    if has_day_state:
        v.addWidget(QLabel(
            "<i>%d lecture(s) already active for this day — unchecking one "
            "re-suspends its cards (only cards Janki unsuspended).</i>"
            % len(active_set)))

    table = QTableWidget(len(events), 4, dlg)
    table.setHorizontalHeaderLabels(["Use", "Calendar event", "Matched lecture", "Cards"])
    table.verticalHeader().setVisible(False)
    table.setEditTriggers(QAbstractItemView.EditTrigger.NoEditTriggers)
    table.setSelectionMode(QAbstractItemView.SelectionMode.NoSelection)
    hh = table.horizontalHeader()
    hh.setSectionResizeMode(0, QHeaderView.ResizeMode.ResizeToContents)
    hh.setSectionResizeMode(1, QHeaderView.ResizeMode.Stretch)
    hh.setSectionResizeMode(2, QHeaderView.ResizeMode.Stretch)
    hh.setSectionResizeMode(3, QHeaderView.ResizeMode.ResizeToContents)

    combos = []
    auto_keys = []

    def _count(nk):
        return len(_suspended_ids(m[nk]["searches"])) if nk else 0

    def _refresh(row):
        nk = combos[row].currentData()
        table.item(row, 3).setText(str(_count(nk)) if nk else "—")
        table.item(row, 0).setCheckState(
            _Qt.CheckState.Checked if nk else _Qt.CheckState.Unchecked)
        _update_total()

    def _update_total():
        ids = set()
        for r in range(len(events)):
            if table.item(r, 0).checkState() == _Qt.CheckState.Checked:
                nk = combos[r].currentData()
                if nk:
                    ids |= _suspended_ids(m[nk]["searches"])
        total_lbl.setText("<b>%d</b> cards will be unsuspended" % len(ids))

    for r, ev in enumerate(events):
        chk = QTableWidgetItem()
        chk.setFlags(_Qt.ItemFlag.ItemIsUserCheckable | _Qt.ItemFlag.ItemIsEnabled)

        # auto-match: exact/alias, then fuzzy
        nkey = _norm(ev)
        if nkey in aliases:
            nkey = _norm(aliases[nkey])
        resolved, fuzzy = None, False
        if nkey in m:
            resolved = nkey
        else:
            close = difflib.get_close_matches(nkey, keys, n=1, cutoff=cutoff)
            if close:
                resolved, fuzzy = close[0], True
        auto_keys.append(resolved)

        evi = QTableWidgetItem(ev + ("   (~)" if fuzzy else ""))
        combo = QComboBox()
        combo.addItem("— skip —", None)
        for nk in opts:
            combo.addItem(m[nk]["display"], nk)
        if resolved:
            idx = combo.findData(resolved)
            combo.setCurrentIndex(idx if idx >= 0 else 0)
        # Check state mirrors today's active set once a day is under way; before
        # that (fresh day) it follows the auto-match.
        if has_day_state:
            disp = m[resolved]["display"] if resolved else None
            want_checked = disp in active_set
        else:
            want_checked = bool(resolved)
        chk.setCheckState(_Qt.CheckState.Checked if want_checked
                          else _Qt.CheckState.Unchecked)

        table.setItem(r, 0, chk)
        table.setItem(r, 1, evi)
        table.setCellWidget(r, 2, combo)
        table.setItem(r, 3, QTableWidgetItem(str(_count(resolved)) if resolved else "—"))
        combos.append(combo)
        combo.currentIndexChanged.connect(lambda _i, row=r: _refresh(row))

    v.addWidget(table)

    total_lbl = QLabel("")
    hb = QHBoxLayout()
    btn_unsusp = QPushButton("Apply")
    btn_unsusp.setDefault(True)
    btn_close = QPushButton("Close")
    hb.addWidget(total_lbl)
    hb.addStretch(1)
    hb.addWidget(btn_close)
    hb.addWidget(btn_unsusp)
    v.addLayout(hb)
    table.itemChanged.connect(lambda _it: _update_total())
    _update_total()

    def _do_unsuspend():
        raw = _load_aliases_raw()
        changed = False
        to_unsusp = set()        # suspended cards in checked lectures → unsuspend
        checked_cards = set()    # ALL cards in checked lectures (for re-suspend calc)
        active_lectures = []
        for r, ev in enumerate(events):
            if table.item(r, 0).checkState() != _Qt.CheckState.Checked:
                continue
            nk = combos[r].currentData()
            if not nk:
                continue
            searches = m[nk]["searches"]
            to_unsusp |= _suspended_ids(searches)
            checked_cards |= _match_ids(searches)
            active_lectures.append(m[nk]["display"])
            # Persist ONLY manual overrides (a pick that differs from the auto
            # guess). Fuzzy guesses stay dynamic; an explicit choice becomes an
            # exact alias so it's deterministic next launch.
            if nk != auto_keys[r]:
                raw[ev] = m[nk]["display"]
                changed = True

        # Re-suspend cards Janki unsuspended earlier for this day whose lecture is
        # no longer checked — but only ones NOT still covered by a checked lecture
        # this day (checked_cards) or owned by ANOTHER day (_owned_except). AnKing
        # cards are shared across lectures/days, so both guards protect them.
        prev_ids, _prev_lecs = _load_day_active(target)
        resuspend = prev_ids - checked_cards - _owned_except(target)
        if resuspend:
            if QMessageBox.question(
                    dlg, "Janki Lectures",
                    "Re-suspend %d card(s) from lecture(s) you removed?"
                    % len(resuspend)) != QMessageBox.StandardButton.Yes:
                return

        # Safety net: a normal day is a few hundred cards at most. An unusually
        # large unsuspend usually means a bad match / overbroad tag search — confirm
        # before touching the clean baseline.
        if len(to_unsusp) > 200:
            if QMessageBox.question(
                    dlg, "Janki Lectures",
                    "This will unsuspend %d cards — that's a lot for one day.\n\n"
                    "Continue?" % len(to_unsusp)) != QMessageBox.StandardButton.Yes:
                return

        if changed:
            _save_aliases(raw)
        _unsuspend_ids(to_unsusp)
        _suspend_ids(resuspend)
        # Owned set = previously-owned cards still wanted, plus the newly unsuspended.
        new_owned = (prev_ids - resuspend) | to_unsusp
        _save_day_active(new_owned, active_lectures, target)
        if to_unsusp or resuspend:
            mw.reset()
        tooltip("Janki Lectures: +%d unsuspended, −%d re-suspended."
                % (len(to_unsusp), len(resuspend)))
        dlg.accept()

    btn_unsusp.clicked.connect(_do_unsuspend)
    btn_close.clicked.connect(dlg.reject)
    dlg.exec()


# ----------------------------------------------------------- settings UI -------

def build_settings_pages():
    """Build the Sources + Behavior panes. Returns (pages, save_fn) where pages is
    [(title, QWidget), ...] and save_fn() writes all fields to config. The host
    settings dialog (GlassSettings) adds these as extra tabs and calls save_fn on
    close, so lecture settings live in the same window as everything else."""
    from aqt.qt import (
        QGridLayout, QLabel, QLineEdit, QPushButton, QCheckBox, QDoubleSpinBox,
        QFileDialog, QWidget,
    )
    cfg = _cfg()

    # ---- Pane 1: Sources (spreadsheet + calendar file/URL) -------------------
    src = QWidget()
    g = QGridLayout(src)
    g.setColumnStretch(1, 1)

    g.addWidget(QLabel("<b>Spreadsheet</b> (.xlsx lecture → tag map)"), 0, 0, 1, 3)
    xlsx_edit = QLineEdit(cfg.get("xlsx_path", ""))
    xlsx_edit.setPlaceholderText("~/Downloads/lecture_tags.xlsx")
    xlsx_btn = QPushButton("Browse…")

    def _pick_xlsx():
        fn, _f = QFileDialog.getOpenFileName(
            src, "Choose spreadsheet", os.path.dirname(_p(xlsx_edit.text())) or "",
            "Spreadsheets (*.xlsx *.xlsm);;All files (*)")
        if fn:
            xlsx_edit.setText(fn)

    xlsx_btn.clicked.connect(_pick_xlsx)
    g.addWidget(QLabel("File:"), 1, 0)
    g.addWidget(xlsx_edit, 1, 1)
    g.addWidget(xlsx_btn, 1, 2)

    g.addWidget(QLabel("<b>Calendar</b> (.ics — local file or http(s) URL)"), 3, 0, 1, 3)
    ics_edit = QLineEdit(cfg.get("ics_path", ""))
    ics_edit.setPlaceholderText("~/Downloads/lectures.ics   or   https://…/basic.ics")
    ics_btn = QPushButton("Browse…")

    def _pick_ics():
        fn, _f = QFileDialog.getOpenFileName(
            src, "Choose calendar file", os.path.dirname(_p(ics_edit.text())) or "",
            "Calendars (*.ics);;All files (*)")
        if fn:
            ics_edit.setText(fn)

    ics_btn.clicked.connect(_pick_ics)
    g.addWidget(QLabel("File/URL:"), 4, 0)
    g.addWidget(ics_edit, 4, 1)
    g.addWidget(ics_btn, 4, 2)

    ics_note = QLabel("")
    ics_note.setWordWrap(True)
    ics_note.setStyleSheet("color: palette(mid);")

    def _update_ics_note():
        if _is_url(ics_edit.text()):
            ics_note.setText("⚠ A URL is fetched over the network on each run. "
                             "A local file keeps everything offline.")
        else:
            ics_note.setText("Local file — fully offline.")

    ics_edit.textChanged.connect(_update_ics_note)
    _update_ics_note()
    g.addWidget(ics_note, 5, 1, 1, 2)

    # Jump straight to the unsuspend window to add/remove today's lectures.
    today_btn = QPushButton("Open today's lecture window…")
    today_btn.clicked.connect(lambda: _open_today_dialog())
    g.addWidget(today_btn, 6, 1, 1, 2)
    g.setRowStretch(7, 1)

    # ---- Pane 2: Behavior ----------------------------------------------------
    beh = QWidget()
    bg = QGridLayout(beh)
    bg.setColumnStretch(1, 1)

    auto_cb = QCheckBox("Auto-load today's lectures on first launch each day")
    auto_cb.setChecked(cfg.get("auto_on_launch", True))
    aj_cb = QCheckBox("Include AJ_UCCOM_keep tags")
    aj_cb.setChecked(cfg.get("unsuspend_aj", True))
    ak_cb = QCheckBox("Include #AK (AnKing) tags")
    ak_cb.setChecked(cfg.get("unsuspend_ak", True))
    bg.addWidget(auto_cb, 0, 0, 1, 2)
    bg.addWidget(aj_cb, 1, 0, 1, 2)
    bg.addWidget(ak_cb, 2, 0, 1, 2)

    bg.addWidget(QLabel("Fuzzy match cutoff:"), 3, 0)
    fuzzy = QDoubleSpinBox()
    fuzzy.setRange(0.30, 1.00)
    fuzzy.setSingleStep(0.02)
    fuzzy.setDecimals(2)
    fuzzy.setValue(float(cfg.get("fuzzy_cutoff", 0.72)))
    fuzzy.setToolTip("Higher = stricter title matching (fewer, safer auto-guesses).")
    bg.addWidget(fuzzy, 3, 1)

    bg.addWidget(QLabel("Timezone:"), 4, 0)
    tz_edit = QLineEdit(cfg.get("timezone", "America/New_York"))
    bg.addWidget(tz_edit, 4, 1)
    bg.setRowStretch(5, 1)

    def _save():
        # Re-read the CURRENT config and touch only lecture keys, so we never
        # clobber changes the host (anki-glass) wrote live during this same dialog.
        cur = mw.addonManager.getConfig(__name__) or {}
        cur["xlsx_path"] = xlsx_edit.text().strip()
        cur["ics_path"] = ics_edit.text().strip()
        cur["auto_on_launch"] = auto_cb.isChecked()
        cur["unsuspend_aj"] = aj_cb.isChecked()
        cur["unsuspend_ak"] = ak_cb.isChecked()
        cur["fuzzy_cutoff"] = float(fuzzy.value())
        cur["timezone"] = tz_edit.text().strip() or "America/New_York"
        try:
            mw.addonManager.writeConfig(__name__, cur)
        except Exception as e:
            _log("writeConfig failed: %s" % e)

    return [("Lectures: Sources", src), ("Lectures: Behavior", beh)], _save


def _open_settings_dialog():
    """Standalone lecture-settings window. Not wired into the menu once merged into
    the main add-on (GlassSettings hosts these panes); kept for manual use."""
    from aqt.qt import QDialog, QVBoxLayout, QTabWidget, QDialogButtonBox
    dlg = QDialog(mw)
    dlg.setWindowTitle("Janki Lecture Settings")
    dlg.resize(600, 360)
    outer = QVBoxLayout(dlg)
    tabs = QTabWidget(dlg)
    outer.addWidget(tabs)
    pages, save_fn = build_settings_pages()
    for title, w in pages:
        tabs.addTab(w, title)
    bb = QDialogButtonBox(QDialogButtonBox.StandardButton.Save
                          | QDialogButtonBox.StandardButton.Cancel)
    outer.addWidget(bb)

    def _do_save():
        save_fn()
        tooltip("Janki settings saved.")
        dlg.accept()

    bb.accepted.connect(_do_save)
    bb.rejected.connect(dlg.reject)
    dlg.exec()


# --------------------------------------------------------------- run -----------

def run_today(interactive=True):
    try:
        if interactive:
            _open_today_dialog()
            return
        # Non-interactive (not currently wired): silently unsuspend auto-matches.
        want_aj = _cfg().get("unsuspend_aj", True)
        want_ak = _cfg().get("unsuspend_ak", True)
        matched, _unmatched = match_today(want_aj, want_ak)
        ids = set()
        for _cal, _res, searches, _fz in matched:
            ids |= _suspended_ids(searches)
        ids = list(ids)
        if ids:
            try:
                mw.col.sched.unsuspend_cards(ids)
            except Exception:
                mw.col.unsuspend_cards(ids)
            mw.reset()
        tooltip("Janki Lectures: unsuspended %d cards for today." % len(ids))
    except Exception as e:
        _log("run_today error: %s\n%s" % (e, traceback.format_exc()))
        if interactive:
            showInfo("Janki Lectures hit an error:\n\n%s\n\nSee %s" % (e, LOG_PATH), title="Janki Lectures")


# --------------------------------------------------------------- wiring --------

def _install_menu():
    act = QAction("Load today's lectures", mw)
    act.triggered.connect(lambda: run_today(interactive=True))
    mw.form.menuTools.addAction(act)


def _on_profile_open():
    # Auto-open only on the FIRST launch of each calendar day. Subsequent
    # launches the same day don't re-pop the dialog (Tools > Load today's
    # lectures still works manually anytime).
    if not _cfg().get("auto_on_launch", True):
        return
    today = _today().isoformat()
    st = _load_state()
    if st.get("last_auto_date") == today:
        return
    st["last_auto_date"] = today
    _save_state(st)
    QTimer.singleShot(1500, lambda: run_today(interactive=True))


gui_hooks.main_window_did_init.append(_install_menu)
gui_hooks.profile_did_open.append(_on_profile_open)
