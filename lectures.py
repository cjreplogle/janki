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
  unsuspend_<deck> : per-deck tag-family toggles (see TAG_FAMILIES), e.g.
                     unsuspend_aj / unsuspend_ak / unsuspend_huc

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

# Live reference to the non-modal Lectures dialog so Qt doesn't garbage-collect it.
_lectures_dlg = None

# Tag/deck families that appear in the spreadsheet cells, in settings-display
# order. Each is (config-suffix, match-string, settings label): a tag line is
# kept when its match-string appears in it (substring), and `unsuspend_<suffix>`
# toggles the family. Substrings are chosen to be self-disambiguating — e.g.
# "#AK" also catches "#AK_Step1_v12", "hUtChCOM" catches its "deck:" form.
TAG_FAMILIES = [
    ("aj",           "AJ_UCCOM_keep", "AJ_UCCOM_keep"),
    ("ak",           "#AK",           "#AK (AnKing)"),
    ("huc",          "hUtChCOM",      "hUtChCOM"),
    ("manki",        "Manki",         "Manki"),
    ("firstaid",     "FirstAid",      "FirstAid"),
    ("sketchymicro", "SketchyMicro",  "SketchyMicro"),
    ("sketchypharm", "SketchyPharm",  "SketchyPharm"),
    ("sketchypath",  "SketchyPath",   "SketchyPath"),
    ("pathoma",      "Pathoma",       "Pathoma"),
    ("physeo",       "Physeo",        "Physeo"),
    ("pixorize",     "Pixorize",      "Pixorize"),
    ("edeckm2",      "EDeckM2",       "EDeckM2"),
    ("rose",         "Rose:)",        "Rose:)"),
]

# On by default = decks actually imported into this collection. The rest ship
# off (their tags exist in the sheet but the decks aren't installed, so they'd
# match nothing) — flip them on here if you import that deck later.
_DEFAULT_ON = {"aj", "ak", "huc"}


def _log(msg):
    try:
        with open(LOG_PATH, "a", encoding="utf-8") as f:
            f.write("%s  %s\n" % (datetime.datetime.now().isoformat(timespec="seconds"), msg))
    except Exception:
        pass


def _cfg():
    cfg = mw.addonManager.getConfig(__name__) or {}
    cfg.setdefault("ics_path", "~/Downloads/replogcj.ics")
    cfg.setdefault("xlsx_path", "~/Downloads/Corresponding Anki Decks.xlsx")
    cfg.setdefault("timezone", "America/New_York")
    cfg.setdefault("auto_on_launch", True)
    for suffix, _match, _label in TAG_FAMILIES:
        cfg.setdefault("unsuspend_%s" % suffix, suffix in _DEFAULT_ON)
    cfg.setdefault("fuzzy_cutoff", 0.72)
    return cfg


def _enabled_families(cfg=None):
    """Match-strings for the tag families currently toggled on in config."""
    cfg = cfg or _cfg()
    return [match for suffix, match, _label in TAG_FAMILIES
            if cfg.get("unsuspend_%s" % suffix, suffix in _DEFAULT_ON)]


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


def _parse_ics_all(path):
    """Parse the whole ICS ONCE into {date: [SUMMARY, ...]}. Day navigation then
    just indexes this dict instead of re-reading/re-fetching + re-parsing the file
    (or re-hitting the network for a URL) for every day."""
    try:
        raw = _read_source_text(path)
    except Exception as e:
        _log("ics read failed: %s" % e)
        return {}
    raw = re.sub(r"\r?\n[ \t]", "", raw)  # unfold RFC5545 continuation lines
    by_date = {}
    for block in raw.split("BEGIN:VEVENT")[1:]:
        s = re.search(r"SUMMARY[^:\r\n]*:(.*)", block)
        d = re.search(r"DTSTART[^:]*:(\d{8})", block)
        if not (s and d):
            continue
        try:
            dt = datetime.datetime.strptime(d.group(1), "%Y%m%d").date()
        except Exception:
            continue
        summ = s.group(1).strip()
        summ = summ.replace("\\,", ",").replace("\\;", ";").replace("\\n", " ").strip()
        if summ:
            by_date.setdefault(dt, []).append(summ)
    return by_date


# Session cache for the parsed ICS, so day-nav / re-open doesn't re-fetch. Keyed
# by (path, mtime) for files and refreshed on each top-level dialog open for URLs
# (see _ics_reset). {"key": ..., "by_date": {...}}
_ICS_CACHE = {"key": None, "by_date": {}}


def _ics_reset():
    """Drop the ICS cache so the next read re-fetches (called on a fresh top-level
    dialog open, so a URL calendar picks up server-side changes; day-nav keeps
    the cache)."""
    _ICS_CACHE["key"] = None


def _ics_by_date(path):
    if _is_url(path):
        key = ("url", path)          # session-stable; _ics_reset refreshes it
    else:
        try:
            key = (path, os.path.getmtime(_p(path)))
        except Exception:
            key = (path, 0)
    if _ICS_CACHE["key"] != key:
        _ICS_CACHE["by_date"] = _parse_ics_all(path)
        _ICS_CACHE["key"] = key
    return _ICS_CACHE["by_date"]


def parse_ics_today(path, target=None):
    """SUMMARY strings for events whose DTSTART date == `target` (default today)."""
    return list(_ics_by_date(path).get(target or _today(), []))


# Session cache for the parsed lecture map (xlsx). Keyed by (path, mtime, families)
# so it rebuilds only when the spreadsheet or enabled families change — not on
# every dialog open / day change. Holds only the latest entry.
_MAP_CACHE = {"key": None, "val": None}


def _get_map(families):
    """(m, keys, opts) for the enabled families, cached by xlsx mtime + families."""
    path = _cfg()["xlsx_path"]
    try:
        mtime = os.path.getmtime(_p(path))
    except Exception:
        mtime = 0
    key = (path, mtime, tuple(families))
    if _MAP_CACHE["key"] != key:
        m = build_lecture_map(families)
        keys = list(m.keys())
        opts = sorted(keys, key=lambda k: m[k]["display"].lower())
        _MAP_CACHE["key"] = key
        _MAP_CACHE["val"] = (m, keys, opts)
    return _MAP_CACHE["val"]


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


# AnKing (source, leaf) -> exact tags index. Two hard constraints drive this:
#  1) Anki's wildcard tag search can't express "this concept as a whole
#     ::-segment" — a `*` always crosses `::`, so any pattern degrades to a
#     substring match (tag:*Connective_Tissue* → 1751 cards vs ~109 real).
#  2) The leaf ALONE is still too broad: the same concept name appears under many
#     AnKing sources (B&B, Bootcamp, Physeo, Sketchy…). The spreadsheet names ONE
#     source per entry (e.g. "B&B::…::01_DNA_Structure"), and only that source's
#     cards are wanted (DNA_Structure: B&B=37, but leaf-across-all-sources=225).
# So we resolve (source, leaf) against the collection's real tag list: the source
# is the 2nd tag segment (#B&B / #FirstAid / …), the leaf is the final concept.
# The intermediate path is IGNORED (AnKing versions renumber/rename it), and the
# NN_ number prefix is stripped. Matching tags (node + its ::Extra/children) are
# searched EXACTLY — precise AND tiny (usually ~2 tags).
_AK_TAG_INDEX = {"map": None}
_AK_PREFIXES = ("#AK_Step1", "#AK_Step2", "#AK_Step3", "#AK_Other")


def _ak_index_reset():
    """Drop the cached AnKing tag index so the next lookup rebuilds it (call on a
    fresh top-level dialog open, so tag edits since last open are picked up)."""
    _AK_TAG_INDEX["map"] = None


def _norm_source(s):
    """Normalize an AnKing source token: drop a leading '#', lowercase. So the
    sheet's shorthand 'B&B' and the real tag's '#B&B' segment compare equal.
    (No &→and here — that would turn 'B&B' into 'band'.)"""
    return (s or "").lstrip("#").lower()


def _leaf_key(s):
    """Canonical key for matching a concept segment between sheet and collection.
    Drops the version NN_ number prefix, a leading '*' (AnKing marks some leaves
    like '*Conduction_Pathway'), lowercases, and maps '&'→'and' (the sheet writes
    'Fructose_&_Galactose' where the deck has 'fructose_and_galactose')."""
    s = (s or "").strip().strip('"').strip()   # drop stray quotes from messy cells
    s = s.lstrip("*")
    s = re.sub(r"^\d+_", "", s)
    return s.replace("&", "and").lower()


def _ak_tag_index():
    """Cached index built ONCE per session from the live collection tag list
    (mw.col.tags.all() is expensive and map-building resolves ~1000 leaves;
    re-fetching per leaf froze the dialog). Returns a dict with:
      "by_src_leaf": {(source, leaf): [exact tags]}  — precise, source-scoped
      "by_leaf":     {leaf: [exact tags]}            — fallback when no source
    Both leaf & source are normalized (lowercased, NN_ / '#' stripped). Returns
    {} when there's no collection (offline) so callers fall back to a wildcard."""
    if _AK_TAG_INDEX["map"] is not None:
        return _AK_TAG_INDEX["map"]
    try:
        tags = mw.col.tags.all()
    except Exception:
        return {}
    by_src_leaf = {}
    by_leaf = {}
    for t in tags:
        if not t.startswith(_AK_PREFIXES):
            continue
        segs = t.split("::")
        src = _norm_source(segs[1]) if len(segs) > 1 else ""
        for seg in segs:
            leaf = _leaf_key(seg)
            if not leaf:
                continue
            by_leaf.setdefault(leaf, set()).add(t)
            if src:
                by_src_leaf.setdefault((src, leaf), set()).add(t)
    idx = {
        "by_src_leaf": {k: sorted(v) for k, v in by_src_leaf.items()},
        "by_leaf": {k: sorted(v) for k, v in by_leaf.items()},
    }
    _AK_TAG_INDEX["map"] = idx
    return idx


def _ak_leaf_search(leaf, source=None):
    """Search fragment for an AnKing (source, leaf): an OR of the EXACT tags that
    have `leaf` as a ::-segment under `source`. When a source is given we use it
    (source-scoped, precise); only if the source can't be determined do we fall
    back to the leaf across all sources. Offline (no collection) → loose
    `tag:*leaf*`. Returns None if nothing resolves (caller drops it)."""
    idx = _ak_tag_index()
    if not idx:
        return "tag:*%s*" % leaf              # offline: best-effort substring
    key = _leaf_key(leaf)
    tags = None
    if source:
        tags = idx["by_src_leaf"].get((_norm_source(source), key))
    if not tags:
        # No source (or that source has no such leaf) → any-source leaf match.
        tags = idx["by_leaf"].get(key)
    if not tags:
        return None
    return "(" + " OR ".join('"tag:%s"' % t for t in tags) + ")"


def _extract_searches(cell, families, ak_column=False):
    """Pull search fragments for the ENABLED tag families out of one messy cell.

    `families` is the list of family match-strings currently toggled on (see
    TAG_FAMILIES / _enabled_families). A non-AnKing line is kept only if it
    contains one of them, so turning a deck off drops its tags everywhere.

    `ak_column=True` marks the spreadsheet's AnKing column (always one column to
    the right of the AJ column). AnKing is identified BY POSITION, not by a "#AK"
    marker, because the sheet writes AnKing tags in shorthand — bare content-
    source paths like "B&B::…", "FirstAid::…", "SketchyMicro::…" with no #AK
    prefix at all. Those full paths are from an older AnKing version and no
    longer line up with the installed deck, but the final tag segment (the
    concept, e.g. DNA_Structure) is stable, so for AnKing we drop the whole
    stale path and just match any tag containing that leaf:
    "B&B::10_Genetics::…::05_Pedigrees" -> tag:*Pedigrees* (num prefix stripped
    via ak_leaf_strip_num). Lines with no clean single-word leaf (keyword/bare
    searches) are skipped.
    """
    out = []
    if not cell or not families:
        return out
    ak_on = "#AK" in families
    for line in cell.split("\n"):
        line = line.strip()
        if not line:
            continue
        # drop trailing human notes in parentheses, e.g. "(SEE NOTE)" / "(some cards)"
        line = re.sub(r"\s*\([^()]*\)\s*$", "", line).strip()
        if not line:
            continue
        # De-escape: the sheet writes tags markdown-style with backslash-escaped
        # underscores (B&B::01\_Basics), but the real Anki tag has plain
        # underscores, so the search MUST drop the backslashes or it matches
        # nothing. Anki tags never contain '\', so stripping them here is safe.
        nb = line.replace("\\", "")
        # An AnKing entry is anything in the AnKing column that looks like a tag
        # path (has "::"), plus any line that explicitly names #AK wherever it
        # appears. Everything else is matched against the non-AK families.
        is_ak = ("#AK" in nb) or (ak_column and "::" in nb)
        if is_ak:
            if not ak_on:
                continue
        else:
            if not any(fam in nb for fam in families if fam != "#AK"):
                continue
        frag = nb
        # Bare tag paths (no "tag:"/"deck:" prefix) become tag searches; free-text
        # (which never reaches here for non-AK, and needs "::" for AK) is untouched.
        if not frag.lower().startswith(("tag:", "deck:")):
            frag = "tag:" + frag
        # AnKing (source, leaf) match (see docstring / _ak_leaf_search): resolve
        # the sheet's source (2nd segment: #B&B / #FirstAid / …) + final concept
        # to the EXACT collection tags, ignoring the drift-prone middle path.
        if is_ak and _cfg().get("ak_leaf_only", True) \
                and frag.lower().startswith("tag:"):
            path = frag.split(":", 1)[1] if ":" in frag else frag
            segs = path.split("::")
            # Source = the content-provider segment; skip a leading #AK version
            # prefix if the sheet wrote the full path.
            if segs and re.match(r"#AK_Step\d", segs[0]):
                source = segs[1] if len(segs) > 1 else ""
            else:
                source = segs[0] if segs else ""
            leaf = segs[-1].strip().strip("*") if segs else ""
            if _cfg().get("ak_leaf_strip_num", True):
                leaf = re.sub(r"^\d+_", "", leaf)   # drop version-specific 01_/02_
            if leaf and " " not in leaf:
                frag = _ak_leaf_search(leaf, source)   # source-scoped exact tags
                if not frag:
                    continue   # resolves to no AnKing tag → drop
            else:
                continue   # no clean leaf → drop this AnKing search
        out.append(frag)
    return out


def build_lecture_map(families=None):
    """norm_lecture_name -> {'display': str, 'searches': [str, ...]} across all sheets.

    Sheets are laid out in horizontal blocks; each block has a
    'Corresponding Decks/Tags' header. Lecture name sits one column left of it,
    AJ tags in that column, #AK (ANKING) tags one column right. `families`
    defaults to the toggled-on set in config.
    """
    if families is None:
        families = _enabled_families()
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
                searches = _extract_searches(r.get(c), families)
                searches += _extract_searches(r.get(c + 1), families, ak_column=True)
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

def match_today(families=None):
    """Return (matched, unmatched).

    matched: list of (calendar_title, resolved_lecture, searches, is_fuzzy).
    Calendar titles often abbreviate differently from the spreadsheet
    ("Introduction to X" vs "Intro to X"), so after an exact/alias match we fall
    back to a conservative similarity match. Fuzzy hits are flagged so the
    preview can show what they resolved to and you can veto a wrong guess.
    """
    lectures = parse_ics_today(_cfg()["ics_path"])
    m = build_lecture_map(families)
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
        QStandardItemModel, QStandardItem, QCheckBox,
    )
    cfg = _cfg()
    families = _enabled_families(cfg)
    cutoff = float(cfg.get("fuzzy_cutoff", 0.72))
    ics_path = cfg["ics_path"]

    _ics_reset()                       # fresh top-level open → refetch URL calendars
    _ak_index_reset()                  # …and rebuild the AnKing tag index (once)
    m, keys, opts = _get_map(families)  # cached by xlsx mtime + families
    aliases = _load_aliases()

    # Per-(lecture, family) SUSPENDED card-id sets: {(nk, fam_suffix): set(cids)}.
    # Filled by the background _recount (find_cards is the slow part). Caching id
    # SETS (not counts) makes row totals, the grand total, the per-deck breakdown,
    # and source-toggles pure set math — no re-querying. Cleared after an apply.
    id_cache = {}

    # ONE shared combo model (every lecture option) built once and reused by every
    # row's combo, instead of re-inserting hundreds of items into N combos per day.
    # NOTE: store the key at Qt.UserRole — that's the role QComboBox.currentData()
    # reads. QStandardItem.setData(v) defaults to UserRole+1, which left
    # currentData() returning None (→ total always 0, counts never matched).
    _UR = _Qt.ItemDataRole.UserRole
    combo_model = QStandardItemModel()
    _skip = QStandardItem("— skip —"); _skip.setData(None, _UR); combo_model.appendRow(_skip)
    for nk in opts:
        _it = QStandardItem(m[nk]["display"]); _it.setData(nk, _UR); combo_model.appendRow(_it)
    model_row = {None: 0}
    for i, nk in enumerate(opts, start=1):
        model_row[nk] = i

    dlg = QDialog(mw)
    dlg.setWindowTitle("Lectures")
    dlg.resize(760, 460)
    v = QVBoxLayout(dlg)

    # ── Day navigation (buttons repopulate in place; the window never closes) ────
    nav = QHBoxLayout()
    btn_prev = QPushButton("◀ Prev day")
    btn_today = QPushButton("Today")
    btn_next = QPushButton("Next day ▶")
    day_hdr = QLabel("")
    nav.addWidget(btn_prev); nav.addWidget(btn_today); nav.addWidget(btn_next)
    nav.addSpacing(12); nav.addWidget(day_hdr); nav.addStretch(1)
    v.addLayout(nav)

    info_lbl = QLabel("")
    v.addWidget(info_lbl)
    state_lbl = QLabel("")
    state_lbl.setWordWrap(True)
    v.addWidget(state_lbl)

    # ── Source selector: unsuspend from only some of the enabled decks ──────────
    # One checkbox per globally-enabled family (AJ / hUtChCOM / AnKing); all ON by
    # default. Unchecking a source excludes its tags from the counts AND the apply,
    # so you can pull, say, only AnKing cards for a lecture. Counts/apply read
    # _selected_families(); toggling recounts live.
    _FAM_SHORT_UI = {"ak": "AnKing", "aj": "AJ", "huc": "hUtChCOM"}
    src_cbs = {}
    src_row = QHBoxLayout()
    src_row.addWidget(QLabel("Unsuspend from:"))
    for suffix, _match, label in TAG_FAMILIES:
        if suffix not in {s for s, m, l in TAG_FAMILIES
                          if m in families}:   # only globally-enabled families
            continue
        cb = QCheckBox(_FAM_SHORT_UI.get(suffix, label))
        cb.setChecked(True)
        src_cbs[suffix] = cb
        src_row.addWidget(cb)
    src_row.addStretch(1)
    if len(src_cbs) > 1:
        v.addLayout(src_row)

    def _selected_families():
        """Suffixes whose source checkbox is ticked (defaults to all enabled)."""
        sel = {suf for suf, cb in src_cbs.items() if cb.isChecked()}
        return sel or set(src_cbs.keys())   # never let an empty selection zero-out

    table = QTableWidget(0, 4, dlg)
    table.setHorizontalHeaderLabels(["Use", "Calendar event", "Matched lecture", "Cards"])
    table.verticalHeader().setVisible(False)
    table.setEditTriggers(QAbstractItemView.EditTrigger.NoEditTriggers)
    table.setSelectionMode(QAbstractItemView.SelectionMode.NoSelection)
    hh = table.horizontalHeader()
    hh.setSectionResizeMode(0, QHeaderView.ResizeMode.ResizeToContents)
    hh.setSectionResizeMode(1, QHeaderView.ResizeMode.Stretch)
    hh.setSectionResizeMode(2, QHeaderView.ResizeMode.Stretch)
    hh.setSectionResizeMode(3, QHeaderView.ResizeMode.ResizeToContents)
    v.addWidget(table)

    total_lbl = QLabel("")
    hb = QHBoxLayout()
    btn_resusp = QPushButton("Re-suspend day")
    btn_unsusp = QPushButton("Apply")
    btn_unsusp.setDefault(True)
    btn_close = QPushButton("Close")
    hb.addWidget(total_lbl); hb.addStretch(1)
    hb.addWidget(btn_resusp); hb.addWidget(btn_close); hb.addWidget(btn_unsusp)
    v.addLayout(hb)

    # Mutable per-day state (repopulated by _populate; read by _update_total/_apply).
    st = {"offset": None, "target": None, "events": [], "combos": [],
          "auto_keys": [], "has_day_state": False, "active_set": set(),
          "closed": False}
    dlg.finished.connect(lambda _r: st.__setitem__("closed", True))

    _FAM_SHORT = {"ak": "AnKing", "aj": "AJ", "huc": "hUtChCOM"}

    def _family_of(frag):
        # AJ / hUtChCOM fragments always carry their family's tag path verbatim.
        if "AJ_UCCOM_keep" in frag:
            return "aj"
        if "hUtChCOM" in frag:
            return "huc"
        # AnKing fragments lost their marker in the leaf→exact-tags resolution
        # (they're now `(tag:"#AK…" OR …)` or a `tag:*leaf*` fallback), so every
        # remaining fragment in this pipeline is AnKing.
        return "ak"

    def _lec_fams(nk):
        """Families present in a lecture's searches (for grouping id-set queries)."""
        return {_family_of(s) for s in m[nk]["searches"]}

    def _row_ids(nk, sel):
        """Union of cached suspended-id sets for a lecture over selected families,
        or None if any needed family set isn't cached yet."""
        ids = set()
        for f in _lec_fams(nk) & sel:
            s = id_cache.get((nk, f))
            if s is None:
                return None
            ids |= s
        return ids

    def _recount():
        """Recompute per-row card counts + the headline total OFF the main thread
        (find_cards is slow on a large collection and freezes the dialog if run
        inline). Snapshot the current selections, run all queries in ONE QueryOp,
        then update the labels/cells when it finishes. A token coalesces rapid
        recounts (day switch, checkbox/combo edits) — only the latest applies."""
        from aqt.operations import QueryOp
        st["rc"] = st.get("rc", 0) + 1
        tok = st["rc"]
        events, combos = st["events"], st["combos"]
        snap = []  # (row, nk, checked) captured on the main thread
        for r in range(len(events)):
            it0 = table.item(r, 0)
            combo = combos[r] if r < len(combos) else None
            nk = combo.currentData() if combo else None
            checked = bool(it0 and it0.checkState() == _Qt.CheckState.Checked)
            snap.append((r, nk, checked))
        sel = _selected_families()          # which sources (AJ/hUtChCOM/AnKing) are on

        # Only query the (lecture, family) id-sets we don't already have cached —
        # everything else (row counts, total, breakdown, source-toggles) is set
        # math on the cache. This is the whole speedup: no giant combined query,
        # and re-counts after a toggle / day revisit issue zero find_cards.
        need = []
        for (r, nk, checked) in snap:
            if not nk:
                continue
            for f in _lec_fams(nk):
                key = (nk, f)
                if key not in id_cache and key not in [n[0] for n in need]:
                    need.append((key, [s for s in m[nk]["searches"]
                                       if _family_of(s) == f]))

        def _repaint():
            for (r, nk, _checked) in snap:
                it3 = table.item(r, 3)
                if it3:
                    ids = _row_ids(nk, sel) if nk else None
                    it3.setText(str(len(ids)) if ids is not None else ("—" if not nk else "…"))
            totals = set(); fam_ids = {}
            for (r, nk, checked) in snap:
                if not (checked and nk):
                    continue
                for f in _lec_fams(nk) & sel:
                    s = id_cache.get((nk, f))
                    if not s:
                        continue
                    totals |= s
                    fam_ids.setdefault(f, set()).update(s)
            parts = []
            for suffix, _match, label in TAG_FAMILIES:
                if fam_ids.get(suffix):
                    parts.append("%s %d" % (_FAM_SHORT.get(suffix, label),
                                            len(fam_ids[suffix])))
            breakdown = ("&nbsp;&nbsp;—&nbsp;&nbsp;" + " · ".join(parts)) if parts else ""
            total_lbl.setText("<b>%d</b> cards will be unsuspended%s"
                              % (len(totals), breakdown))

        if not need:
            _repaint()             # fully cached → instant, no background query
            return
        total_lbl.setText("<i>Counting…</i>")

        def op(col):
            res = {}
            for (key, searches) in need:
                if not searches:
                    res[key] = set(); continue
                q = "(%s) is:suspended" % " OR ".join("(%s)" % s for s in searches)
                try:
                    res[key] = set(col.find_cards(q))
                except Exception:
                    res[key] = set()
            return res

        def done(res):
            if tok != st.get("rc") or st.get("closed"):
                return
            id_cache.update(res)
            _repaint()

        QueryOp(parent=dlg, op=op, success=done).run_in_background()

    def _refresh_row(row):
        nk = st["combos"][row].currentData()
        it0 = table.item(row, 0)
        if it0:
            it0.setCheckState(_Qt.CheckState.Checked if nk else _Qt.CheckState.Unchecked)
        it3 = table.item(row, 3)
        if it3:
            ids = _row_ids(nk, _selected_families()) if nk else None
            it3.setText(str(len(ids)) if ids is not None else ("…" if nk else "—"))
        _recount()

    def _populate(offset):
        st["offset"] = offset
        target = _today() + datetime.timedelta(days=offset)
        st["target"] = target
        events = _ics_by_date(ics_path).get(target, [])
        st["events"] = events
        has_day_state = _has_day_state(target)
        _owned, active_lecs = _load_day_active(target)
        active_set = set(active_lecs)
        st["has_day_state"] = has_day_state
        st["active_set"] = active_set
        st["gen"] = st.get("gen", 0) + 1   # cancels stale count-fills on day switch
        gen = st["gen"]

        btn_today.setEnabled(offset != 0)
        # "Re-suspend day" only makes sense once the day has been unsuspended.
        btn_resusp.setEnabled(has_day_state)
        day_hdr.setText("<b>%s — %s</b>"
                        % (_day_label(offset), target.strftime("%a %b %d, %Y")))
        if events:
            info_lbl.setText(
                "%d calendar events, %d lectures in spreadsheet. Pick the matching "
                "lecture for each row. “~” = auto-guess (fuzzy). Changes are saved."
                % (len(events), len(m)))
        else:
            info_lbl.setText("No calendar events for %s (%s). Use Prev/Next day."
                             % (_day_label(offset), target.strftime("%a %b %d, %Y")))
        state_lbl.setVisible(has_day_state)
        if has_day_state:
            state_lbl.setText(
                "<i>%d lecture(s) already active for this day — unchecking one "
                "re-suspends its cards (only cards Janki unsuspended).</i>"
                % len(active_set))

        _sel = _selected_families()
        table.blockSignals(True)
        table.setRowCount(0)
        table.setRowCount(len(events))
        st["combos"] = []
        st["auto_keys"] = []
        for r, ev in enumerate(events):
            chk = QTableWidgetItem()
            chk.setFlags(_Qt.ItemFlag.ItemIsUserCheckable | _Qt.ItemFlag.ItemIsEnabled)
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
            st["auto_keys"].append(resolved)

            evi = QTableWidgetItem(ev + ("   (~)" if fuzzy else ""))
            combo = QComboBox()
            combo.setModel(combo_model)                    # shared model — cheap
            combo.setCurrentIndex(model_row.get(resolved, 0))
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
            # Counts (find_cards) are the slow part — don't block the window on them.
            # Use a cached value if we already have it (e.g. preloaded neighbour),
            # else a "…" placeholder that the background _recount replaces.
            if not resolved:
                cell = "—"
            else:
                _ids = _row_ids(resolved, _sel)
                cell = str(len(_ids)) if _ids is not None else "…"
            table.setItem(r, 3, QTableWidgetItem(cell))
            st["combos"].append(combo)
            combo.currentIndexChanged.connect(lambda _i, row=r: _refresh_row(row))
        table.blockSignals(False)

        # Window is already built with cached/"…" counts — kick off the real counts
        # in the background (QueryOp) so the dialog never stalls on find_cards.
        _recount()

    def _goto(new_offset):
        _populate(new_offset)

    btn_prev.clicked.connect(lambda: _goto(st["offset"] - 1))
    btn_next.clicked.connect(lambda: _goto(st["offset"] + 1))
    btn_today.clicked.connect(lambda: _goto(0))
    table.itemChanged.connect(lambda _it: _recount())
    for _cb in src_cbs.values():                   # toggling a source recounts live
        _cb.toggled.connect(lambda _c=False: _recount())

    def _do_unsuspend():
        target = st["target"]
        events, combos, auto_keys = st["events"], st["combos"], st["auto_keys"]
        raw = _load_aliases_raw()
        sel = _selected_families()   # only pull from ticked sources (AJ/hUtChCOM/AnKing)
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
            searches = [s for s in m[nk]["searches"] if _family_of(s) in sel]
            if not searches:
                continue
            to_unsusp |= _suspended_ids(searches)
            checked_cards |= _match_ids(searches)
            active_lectures.append(m[nk]["display"])
            if nk != auto_keys[r]:
                raw[ev] = m[nk]["display"]
                changed = True

        prev_ids, _prev_lecs = _load_day_active(target)
        resuspend = prev_ids - checked_cards - _owned_except(target)
        if resuspend:
            if QMessageBox.question(
                    dlg, "Janki Lectures",
                    "Re-suspend %d card(s) from lecture(s) you removed?"
                    % len(resuspend)) != QMessageBox.StandardButton.Yes:
                return
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
        new_owned = (prev_ids - resuspend) | to_unsusp
        _save_day_active(new_owned, active_lectures, target)
        if to_unsusp or resuspend:
            mw.reset()
        id_cache.clear()   # suspended state changed → cached id-sets are stale

        # Feedback: a persistent tooltip AND an in-dialog banner (the window stays
        # open, so the user sees confirmation without it vanishing).
        msg = ("Loaded %s: +%d card(s) unsuspended"
               % (_day_label(st["offset"]), len(to_unsusp)))
        if resuspend:
            msg += ", −%d re-suspended" % len(resuspend)
        tooltip("Janki Lectures — " + msg, period=4000)
        _populate(st["offset"])   # refresh counts/checks in place (dialog stays up)
        state_lbl.setVisible(True)
        state_lbl.setText("<b style='color:#3a3'>✓ %s.</b>" % msg)

    def _do_resuspend():
        """Undo this day: re-suspend every card Janki unsuspended for the viewed
        day, EXCEPT ones another day still wants (so shared AnKing cards stay).
        Only offered once the day has active state (see btn_resusp.setEnabled)."""
        target = st["target"]
        prev_ids, _prev_lecs = _load_day_active(target)
        resuspend = prev_ids - _owned_except(target)
        if QMessageBox.question(
                dlg, "Janki Lectures",
                "Re-suspend the %d card(s) unsuspended for %s?%s"
                % (len(resuspend), _day_label(st["offset"]),
                   ("\n\n(%d shared with another day stay unsuspended.)"
                    % (len(prev_ids) - len(resuspend)))
                   if len(prev_ids) != len(resuspend) else "")
                ) != QMessageBox.StandardButton.Yes:
            return
        _suspend_ids(resuspend)
        _save_day_active(set(), [], target)   # day now owns nothing (entry dropped)
        if resuspend:
            mw.reset()
        id_cache.clear()
        msg = "Re-suspended %s: −%d card(s)" % (_day_label(st["offset"]), len(resuspend))
        tooltip("Janki Lectures — " + msg, period=4000)
        _populate(st["offset"])
        state_lbl.setVisible(True)
        state_lbl.setText("<b style='color:#3a3'>✓ %s.</b>" % msg)

    btn_unsusp.clicked.connect(_do_unsuspend)
    btn_resusp.clicked.connect(_do_resuspend)
    btn_close.clicked.connect(dlg.reject)

    # Close this window automatically if Anki itself is closing/quitting, so a
    # lingering modal can't keep the app alive after the main window is gone.
    def _close_with_anki():
        try:
            dlg.reject()
        except Exception:
            pass
    try:
        mw.app.aboutToQuit.connect(_close_with_anki)
    except Exception:
        pass

    def _cleanup():
        try:
            mw.app.aboutToQuit.disconnect(_close_with_anki)
        except Exception:
            pass
        global _lectures_dlg
        _lectures_dlg = None
    dlg.finished.connect(lambda _=0: _cleanup())

    _populate(day_offset)
    # Non-modal: a modal exec() would block the Anki window, so you could never
    # click back to it (and thus never close it to dismiss this). show() keeps
    # both windows interactive; a module-level ref stops Qt from GC'ing it.
    from aqt.qt import Qt
    dlg.setAttribute(Qt.WidgetAttribute.WA_DeleteOnClose, True)
    global _lectures_dlg
    _lectures_dlg = dlg
    dlg.show()
    dlg.raise_()
    dlg.activateWindow()


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
    xlsx_edit.setPlaceholderText("~/Downloads/Corresponding Anki Decks.xlsx")
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
    ics_edit.setPlaceholderText("~/Downloads/replogcj.ics   or   https://…/basic.ics")
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
    bg.addWidget(auto_cb, 0, 0, 1, 2)

    bg.addWidget(QLabel("<b>Include tags from these decks:</b>"), 1, 0, 1, 2)
    # One checkbox per spreadsheet tag family, packed two-per-row. Decks not in
    # the collection ship off; tick one to pull its tags in once it's imported.
    fam_cbs = {}
    row = 2
    for i, (suffix, _match, label) in enumerate(TAG_FAMILIES):
        cb = QCheckBox("Include %s tags" % label)
        cb.setChecked(bool(cfg.get("unsuspend_%s" % suffix, suffix in _DEFAULT_ON)))
        bg.addWidget(cb, row + i // 2, i % 2)
        fam_cbs[suffix] = cb
    row += (len(TAG_FAMILIES) + 1) // 2

    bg.addWidget(QLabel("Fuzzy match cutoff:"), row, 0)
    fuzzy = QDoubleSpinBox()
    fuzzy.setRange(0.30, 1.00)
    fuzzy.setSingleStep(0.02)
    fuzzy.setDecimals(2)
    fuzzy.setValue(float(cfg.get("fuzzy_cutoff", 0.72)))
    fuzzy.setToolTip("Higher = stricter title matching (fewer, safer auto-guesses).")
    bg.addWidget(fuzzy, row, 1)
    row += 1

    bg.addWidget(QLabel("Timezone:"), row, 0)
    tz_edit = QLineEdit(cfg.get("timezone", "America/New_York"))
    bg.addWidget(tz_edit, row, 1)
    bg.setRowStretch(row + 1, 1)

    def _save():
        # Re-read the CURRENT config and touch only lecture keys, so we never
        # clobber changes the host (anki-glass) wrote live during this same dialog.
        cur = mw.addonManager.getConfig(__name__) or {}
        cur["xlsx_path"] = xlsx_edit.text().strip()
        cur["ics_path"] = ics_edit.text().strip()
        cur["auto_on_launch"] = auto_cb.isChecked()
        for suffix, cb in fam_cbs.items():
            cur["unsuspend_%s" % suffix] = cb.isChecked()
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
        matched, _unmatched = match_today(_enabled_families())
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
