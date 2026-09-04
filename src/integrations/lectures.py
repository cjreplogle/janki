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

# lectures.py lives in src/integrations/; keep runtime files (log, aliases.json,
# state.json) at the add-on ROOT (two directories up) so existing files +
# .gitignore still match.
ADDON_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
# Log inside the add-on folder (cross-platform; findable via Tools > Add-ons >
# View Files) rather than a macOS-only ~/Library/Logs path.
LOG_PATH = os.path.join(ADDON_DIR, "janki-lectures.log")

# Live reference to the non-modal Lectures dialog so Qt doesn't garbage-collect it.
_lectures_dlg = None

# Tag/deck families that appear in the spreadsheet cells, in settings-display
# order. Each is (config-suffix, match-string, settings label): a tag line is
# kept when its match-string appears in it (substring), and `unsuspend_<suffix>`
# toggles the family. Substrings are chosen to be self-disambiguating — e.g.
# "#AK" also catches "#AK_Step1_v12", "hUtChCOM" catches its "deck:" form.
TAG_FAMILIES = [
    ("aj",           "AJ_UCCOM_keep", "AJ_UCCOM_keep"),
    ("ak",           "#AK",           "#AK"),
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
    cfg.setdefault("ics_path", "")
    cfg.setdefault("xlsx_path", "")
    cfg.setdefault("txt_paths", [])
    cfg.setdefault("timezone", "America/New_York")
    cfg.setdefault("auto_on_launch", True)
    for suffix, _match, _label in TAG_FAMILIES:
        cfg.setdefault("unsuspend_%s" % suffix, suffix in _DEFAULT_ON)
    cfg.setdefault("fuzzy_cutoff", 0.72)
    cfg.setdefault("match_coverage", 0.6)
    cfg.setdefault("ak_exact_only", False)
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


def _src_mtime(path):
    try:
        return os.path.getmtime(_p(path))
    except Exception:
        return 0


def _get_map(families):
    """(m, keys, opts) for the enabled families, cached by every source's mtime
    (base spreadsheet + each extra .txt) + families."""
    cfg = _cfg()
    base = cfg.get("xlsx_path", "")
    txts = tuple((cfg.get("txt_paths") or []))
    key = (base, _src_mtime(base),
           tuple((t, _src_mtime(t)) for t in txts),
           tuple(families))
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


# Parenthetical notes on calendar events ("(group)", "(Team A)", "(NOT recorded)",
# "(histology module)") aren't part of the lecture name — strip them before matching.
_PARENS = re.compile(r"\s*\([^()]*\)")

# Domain synonyms: the calendar and the spreadsheet sometimes name the SAME lecture
# differently (the calendar says "Pharmacokinetics", the sheet says "ADME"). These
# share no letters, so fuzzy matching can't bridge them — map each variant to a
# shared canonical token, applied to both sides so they line up. Add pairs here as
# they come up (left = word as written, right = canonical).
_SYNONYMS = {
    "pharmacokinetics": "adme",
    "pharmacokinetic": "adme",
}
_SYN_RE = re.compile(r"\b(?:%s)\b" % "|".join(map(re.escape, _SYNONYMS)))


def _apply_synonyms(s):
    return _SYN_RE.sub(lambda m: _SYNONYMS[m.group(0)], s)


def _norm(s):
    s = (s or "").lower()
    s = s.replace("&", " and ")
    s = _PARENS.sub("", s)
    s = _apply_synonyms(s)
    # Unify "Introduction to X" with "Intro to X" so the two phrasings match (a
    # spelled-out prefix no longer blocks a hit). Canonicalized to "intro" rather
    # than dropped entirely: removing it collapses e.g. "Intro to Pharmacology" to
    # just "pharmacology", which then mis-ranks onto "Autonomic Pharmacology"
    # instead of the real "Intro to pharmacology and drug approval" lecture.
    s = re.sub(r"\bintroduction\b", "intro", s)
    return re.sub(r"[^a-z0-9]+", "", s)


# --- fuzzy-match guard ---------------------------------------------------------
# difflib's raw character ratio over-scores titles that share a common prefix or
# suffix ("Intro to Pharmacology" vs "Intro to Histology" = 0.74, over the 0.72
# cutoff) and can't tell "Genetics 1" from "Genetics 2" (0.89). So after difflib
# ranks the candidates we gate each one on its DISTINCTIVE words + any lecture
# number before accepting the match.
_MATCH_STOP = {
    # filler words
    "the", "of", "to", "and", "a", "an", "in", "for", "on", "with", "intro",
    "introduction", "overview", "review", "part", "module", "modules", "session",
    "lecture", "pt", "our",
    # session / format / admin words: these show up in calendar EVENT names
    # ("Back Anatomy practical exam", "Cellular aging (small groups)") but aren't
    # the lecture subject, so they must not count against keyword coverage.
    "exam", "exams", "midterm", "final", "quiz", "quizzes", "assessment", "test",
    "practical", "practicals", "lab", "labs", "laboratory", "workshop",
    "recitation", "seminar", "panel", "tutorial", "orientation", "prep",
    "optional", "mandatory", "small", "groups", "group", "team", "teams",
    "discussion", "debate", "case", "cases", "worksheet", "exercise", "activity",
    "dissection", "study", "studies", "selfstudy", "selfstudies", "self",
    "practice", "training", "certification",
}
_ROMAN = {"i": 1, "ii": 2, "iii": 3, "iv": 4, "v": 5, "vi": 6, "vii": 7, "viii": 8}


def _match_tokens(s):
    s = (s or "").lower().replace("&", " and ")
    s = _PARENS.sub("", s)
    s = _apply_synonyms(s)
    return re.findall(r"[a-z0-9]+", s)


def _lecture_number(tokens):
    """First arabic/roman numeral among the tokens (Genetics '2' / OxPhos 'II'), else None."""
    for t in tokens:
        if t.isdigit():
            return int(t)
        if t in _ROMAN:
            return _ROMAN[t]
    return None


def _key_tokens(tokens):
    """Distinctive words: drop filler/stopwords + bare numerals, keep words >=4 chars."""
    return [t for t in tokens
            if t not in _MATCH_STOP and not t.isdigit() and t not in _ROMAN and len(t) >= 4]


def _titles_compatible(a, b, coverage=0.6):
    """True if calendar title `a` could be candidate lecture `b`. Requires: numbers
    agree when both are numbered; and enough of the distinctive words in the
    calendar title are present in the candidate — the sheet may be more descriptive,
    but the calendar's own keywords must (mostly) land. `coverage` is the fraction
    that must match (config `match_coverage`, default 0.6 = 2-of-3 passes, e.g.
    "histology muscle tissue" -> "Histology module - skeletal muscle"; 1-of-2 still
    fails). A near-identical normalized string is also accepted. This blocks
    single-shared-word collisions like 'epithelia & pathology' -> 'orthopedic
    developmental pathology', number mix-ups like 'Genetics 1' -> 'Genetics 2', and
    prefix collisions like 'connective tissue' -> 'ecg 2'."""
    ta, tb = _match_tokens(a), _match_tokens(b)
    na, nb = _lecture_number(ta), _lecture_number(tb)
    if na is not None and nb is not None and na != nb:
        return False
    ka, kb = _key_tokens(ta), _key_tokens(tb)
    if not ka and not kb:
        return True    # neither has distinctive words -> trust difflib's score
    if not ka or not kb:
        return False   # one side has distinctive words, the other none -> not a match

    def _covered(x):
        return max(difflib.SequenceMatcher(None, x, y).ratio() for y in kb) >= 0.8

    if sum(1 for x in ka if _covered(x)) / len(ka) >= coverage:
        return True    # enough of the calendar's keywords appear in the candidate
    return difflib.SequenceMatcher(None, _norm(a), _norm(b)).ratio() >= 0.88


def _fuzzy_match(display, key, keys, m, cutoff):
    """Best fuzzy map key for a calendar title, or None. difflib ranks the top
    candidates; _titles_compatible vetoes the wrong ones (see above)."""
    coverage = float(_cfg().get("match_coverage", 0.6))
    for ck in difflib.get_close_matches(key, keys, n=5, cutoff=cutoff):
        if _titles_compatible(display, m[ck]["display"], coverage):
            return ck
    return None


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

# Concept leaves that resolved only via the loose `tag:*leaf*` fallback (no exact
# AnKing tag in THIS collection — e.g. the deck is named/versioned differently on
# another machine). Filled during build_lecture_map; surfaced as a UI warning so
# the user can sanity-check those looser matches. {leaf: display_leaf}.
_AK_LOOSE = {}


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
    key = _leaf_key(leaf)
    if not idx:
        _AK_LOOSE[key] = leaf                  # offline → loose (note it)
        return "tag:*%s*" % key                # best-effort substring
    tags = None
    if source:
        tags = idx["by_src_leaf"].get((_norm_source(source), key))
    if not tags:
        # No source (or that source has no such leaf) → any-source leaf match.
        tags = idx["by_leaf"].get(key)
    if not tags:
        # Nothing in THIS collection has this leaf as an exact ::-segment — the
        # AnKing deck is likely named/versioned differently here. Match by leaf
        # anywhere in a tag (works across decks) and flag it so the UI can warn.
        # The map always keeps this loose fragment; 'exact matches only' filters
        # it out downstream (see _is_loose_search) so the toggle needs no rebuild.
        _AK_LOOSE[key] = leaf
        return "tag:*%s*" % key
    return "(" + " OR ".join('"tag:%s"' % t for t in tags) + ")"


def _is_loose_search(s):
    """True for a loose AnKing leaf fragment (tag:*concept*) — the ones produced
    when no exact tag matched. 'Exact matches only' drops these. AJ/hUtChCOM and
    resolved AnKing fragments never start with 'tag:*'."""
    return isinstance(s, str) and s.startswith("tag:*")


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


def _build_lecture_map_txt(path, families):
    """Parse a plain-text tag map into the same structure as the xlsx path.

    Format: sections delimited by '====' rules, the lecture name sitting between
    two rules, followed by that lecture's tag lines (AnKing '#AK_…::…' paths and/or
    'tag:'/'deck:' lines). Non-tag prose (Bonus/Note/etc.) is ignored.

        =====================
        CONNECTIVE TISSUE
        =====================
        #AK_Step1_v12::#Physeo::…::Connective_Tissue
        #AK_Step1_v12::#B&B::…::Connective_Tissue
    """
    m = {}
    try:
        text = _read_source_text(path)
    except Exception as e:
        _log("txt read failed: %s" % e)
        return m
    lines = text.splitlines()
    n = len(lines)

    def is_rule(s):
        s = s.strip()
        return len(s) >= 4 and set(s) == {"="}

    def flush(name, taglines):
        if not name or not taglines:
            return
        searches = _extract_searches("\n".join(taglines), families)
        if not searches:
            return
        key = _norm(name)
        if not key:
            return
        entry = m.setdefault(key, {"display": name, "searches": []})
        for s in searches:
            if s not in entry["searches"]:
                entry["searches"].append(s)

    cur, tags, i = None, [], 0
    while i < n:
        if is_rule(lines[i]):
            flush(cur, tags)
            cur, tags = None, []
            # lecture name = next non-empty, non-rule line; skip the closing rule.
            j = i + 1
            while j < n and not lines[j].strip():
                j += 1
            if j < n and not is_rule(lines[j]):
                cur = lines[j].strip()
                k = j + 1
                while k < n and not lines[k].strip():
                    k += 1
                i = (k + 1) if (k < n and is_rule(lines[k])) else (j + 1)
                continue
            i += 1
            continue
        if cur is not None:
            s = lines[i].strip()
            if s.startswith("#") or s.lower().startswith(("tag:", "deck:")):
                tags.append(s)
        i += 1
    flush(cur, tags)
    _log("build_lecture_map(txt): %d lectures" % len(m))
    return m


def _build_lecture_map_json(path, families):
    """Parse a JSON tag map into the same structure as the xlsx/txt paths.

    Two shapes are accepted:
      • an object mapping lecture name -> tag(s):
            {"Connective Tissue": ["#AK_Step1::…::Connective_Tissue",
                                   "tag:AJ_UCCOM_keep::…"], …}
        (a single tag string instead of a list is fine)
      • a list of objects:
            [{"name": "Connective Tissue",
              "tags": ["#AK_Step1::…::Connective_Tissue", …]}, …]
        ("lecture"/"title" alias "name"; "tag"/"searches" alias "tags").

    Tag lines use the same syntax as the .txt format (AnKing "#AK…::…" paths,
    "tag:"/"deck:" lines, bare content-source paths).
    """
    m = {}
    try:
        data = json.loads(_read_source_text(path))
    except Exception as e:
        _log("json read failed: %s" % e)
        return m

    def _as_lines(tags):
        if isinstance(tags, str):
            return [tags]
        if isinstance(tags, (list, tuple)):
            return [str(t) for t in tags]
        return []

    def add(name, tags):
        name = (name or "").strip()
        lines = _as_lines(tags)
        if not name or not lines:
            return
        searches = _extract_searches("\n".join(lines), families)
        if not searches:
            return
        key = _norm(name)
        if not key:
            return
        entry = m.setdefault(key, {"display": name, "searches": []})
        for s in searches:
            if s not in entry["searches"]:
                entry["searches"].append(s)

    if isinstance(data, dict):
        for name, tags in data.items():
            add(name, tags)
    elif isinstance(data, list):
        for item in data:
            if not isinstance(item, dict):
                continue
            name = item.get("name") or item.get("lecture") or item.get("title")
            tags = item.get("tags")
            if tags is None:
                tags = item.get("tag") or item.get("searches")
            add(name, tags)
    _log("build_lecture_map(json): %d lectures" % len(m))
    return m


def _merge_map(dst, src):
    """Union src into dst (per normalized lecture). New lectures are added; ones
    already present keep their display name and gain any new searches."""
    for key, e in src.items():
        entry = dst.setdefault(key, {"display": e["display"], "searches": []})
        for s in e["searches"]:
            if s not in entry["searches"]:
                entry["searches"].append(s)
    return dst


def _build_map_from_source(path, families):
    """norm_lecture_name -> {'display': str, 'searches': [str, ...]} for a SINGLE
    source path (.xlsx workbook, .txt list, or URL). Empty/missing → {}.

    Each sheet is a course module (SFOM, MSK, …) and is laid out in horizontal
    biweekly blocks placed side by side. Every block carries its own
    'Corresponding Decks/Tags' header, and the columns are read RELATIVE to it:
    lecture title one column LEFT, AJ/hUtChCOM decks in that column, #AK (ANKING)
    tags one column RIGHT. So biweekly 1 = A/B/C, biweekly 2 = F/G/H, biweekly 3 =
    K/L/M, … — each block's title/decks/anking shift together and are found by its
    own header, not by fixed column letters. A block only contributes lectures once
    its title column is filled in; blocks with a header but a blank title column
    (common while the sheet is still being built out for later biweeklies) yield
    nothing until the titles are added. `families` defaults to the toggled-on set.
    """
    if families is None:
        families = _enabled_families()
    path = (path or "").strip()
    # Not configured → empty map (never call zipfile on an empty/missing path).
    if not path:
        return {}
    # A plain-text tag map (.txt) / JSON tag map (.json) is parsed differently
    # from an .xlsx workbook.
    if path.lower().endswith(".txt"):
        return _build_lecture_map_txt(path, families)
    if path.lower().endswith(".json"):
        return _build_lecture_map_json(path, families)
    # Guard a missing local file so _load_xlsx never raises FileNotFoundError.
    try:
        if not _is_url(path) and not os.path.exists(_p(path)):
            return {}
    except Exception:
        return {}
    m = {}
    for name, rows in _load_xlsx(path):
        # Anchor = every block's decks header. Match case-insensitively on the
        # "corresponding decks" stem so header variants ("Corresponding Decks",
        # "Corresponding Decks/Tags", trailing spaces) are all caught.
        anchors = set()
        for r in rows:
            for ci, val in r.items():
                if (val or "").strip().lower().startswith("corresponding decks"):
                    anchors.add(ci)
        if not anchors:
            anchors = {1}
        n_before = len(m)
        for r in rows:
            for c in anchors:
                lec = (r.get(c - 1) or "").strip()
                if not lec or lec == "Our Lecture" or lec.startswith("If you see"):
                    continue
                # Skip non-lecture cells that land in a title column: header labels
                # and stray numeric cells (card counts / widths that some blocks
                # leave in the title column). A real title always has a letter.
                if lec.lower() in ("anking tags", "notes") or not re.search(r"[A-Za-z]", lec):
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
        _log("build_lecture_map: sheet %r anchors=%d lectures+=%d"
             % (name, len(anchors), len(m) - n_before))
    return m


def build_lecture_map(families=None):
    """norm_lecture_name -> {'display': str, 'searches': [str, ...]}.

    The BASE source is `xlsx_path` (an .xlsx workbook, a single .txt list, or a
    URL). Any additional .txt files in `txt_paths` are then merged on top — union
    of tags per lecture, new lectures added — so you can keep one spreadsheet as
    the base and layer extra hand-written .txt lists over it, adding/removing them
    without touching the base.
    """
    if families is None:
        families = _enabled_families()
    _AK_LOOSE.clear()   # recomputed as this build resolves AnKing leaves
    cfg = _cfg()
    m = _build_map_from_source(cfg.get("xlsx_path", ""), families)
    for tp in (cfg.get("txt_paths") or []):
        if (tp or "").strip():
            _merge_map(m, _build_map_from_source(tp, families))
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
    exact_only = _cfg().get("ak_exact_only", False)

    def _srch(k):
        ss = m[k]["searches"]
        return [s for s in ss if not _is_loose_search(s)] if exact_only else ss

    keys = list(m.keys())
    matched, unmatched = [], []
    for lec in lectures:
        key = _norm(lec)
        if key in aliases:
            key = _norm(aliases[key])
        if key in m:
            matched.append((lec, m[key]["display"], _srch(key), False))
            continue
        mk = _fuzzy_match(lec, key, keys, m, cutoff)
        if mk:
            matched.append((lec, m[mk]["display"], _srch(mk), True))
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


_import_dlg_open = False   # guards against stacking/looping the import settings dialog


def _pick_tag_map_file(day_offset=0):
    """Pop the OS file picker for the lecture→tag map, save the chosen path to
    config, then open the lecture window. Returns True if a valid map was loaded."""
    from aqt.qt import QFileDialog
    start = os.path.dirname(_p(_cfg().get("xlsx_path", ""))) or ""
    fn, _f = QFileDialog.getOpenFileName(
        mw, "Choose your lecture → tag map (.xlsx, .txt or .json)", start,
        "Tag maps (*.xlsx *.xlsm *.txt *.json);;All files (*)")
    if not fn:
        return False
    cur = mw.addonManager.getConfig(__name__) or {}
    cur["xlsx_path"] = fn
    mw.addonManager.writeConfig(__name__, cur)
    _MAP_CACHE["key"] = None            # force a rebuild with the new path
    m2, _k2, _o2 = _get_map(_enabled_families())
    if m2:
        QTimer.singleShot(0, lambda: _open_today_dialog(day_offset))
        return True
    showInfo("Couldn't load any lectures from that file.\n\n"
             "Make sure it's a valid .xlsx spreadsheet, .txt or .json tag map.",
             title="Janki Lectures")
    return False


def _prompt_and_load_tag_map(day_offset=0):
    """Show a short intro explaining what a lecture→tag map is, with a
    'Choose file…' button that opens the OS file picker. Used both on a fresh
    install (no map set yet) and when a configured map yields nothing. Guarded
    against re-entry / stacking."""
    global _import_dlg_open
    if _import_dlg_open:
        return
    _import_dlg_open = True
    try:
        from aqt.qt import (
            QDialog, QVBoxLayout, QHBoxLayout, QLabel, QPushButton, Qt as _Qt,
        )
        d = QDialog(mw)
        d.setWindowTitle("Janki — Load today's lectures")
        lay = QVBoxLayout(d)

        title = QLabel("Set up your lecture → tag map")
        _tf = title.font()
        _tf.setBold(True)
        _tf.setPointSize(_tf.pointSize() + 2)
        title.setFont(_tf)
        lay.addWidget(title)

        body = QLabel(
            "To unsuspend today's cards, Janki needs a <b>lecture&nbsp;→&nbsp;tag "
            "map</b>: a small file that says which Anki tag(s) belong to each "
            "lecture.<br><br>"
            "It can be an <b>.xlsx</b> spreadsheet (lecture names in one column, "
            "tags in the next), a plain <b>.txt</b> file, or a <b>.json</b> file. "
            "Nothing leaves your computer — the file is only read locally.<br><br>"
            'See the <a href="https://github.com/cjreplogle/janki/blob/HEAD/docs/'
            'load-todays-lectures.md">quick tutorial &amp; format guide ↗</a> for '
            "an example."
        )
        body.setWordWrap(True)
        body.setOpenExternalLinks(True)
        body.setTextInteractionFlags(_Qt.TextInteractionFlag.TextBrowserInteraction)
        body.setMinimumWidth(420)
        lay.addWidget(body)

        row = QHBoxLayout()
        row.addStretch(1)
        cancel_btn = QPushButton("Cancel")
        cancel_btn.clicked.connect(d.reject)
        row.addWidget(cancel_btn)
        choose_btn = QPushButton("Choose file…")
        choose_btn.setDefault(True)
        choose_btn.clicked.connect(d.accept)
        row.addWidget(choose_btn)
        lay.addLayout(row)

        if d.exec():
            _pick_tag_map_file(day_offset)
    except Exception as e:
        _log("tag-map prompt failed: %s" % e)
    finally:
        _import_dlg_open = False


def _open_today_dialog(day_offset=0, auto=False):
    from aqt.qt import (
        QDialog, QVBoxLayout, QHBoxLayout, QLabel, QTableWidget, QTableWidgetItem,
        QComboBox, QPushButton, QHeaderView, QAbstractItemView, Qt as _Qt,
        QStandardItemModel, QStandardItem, QCheckBox, QProgressBar,
        QPropertyAnimation, QEasingCurve, QToolButton,
    )
    cfg = _cfg()
    families = _enabled_families(cfg)
    cutoff = float(cfg.get("fuzzy_cutoff", 0.72))
    ics_path = cfg["ics_path"]
    # No calendar configured → manual mode: list every lecture in the tag map and
    # let the user pick which to unsuspend (no day navigation, no fuzzy matching).
    no_cal = not (ics_path or "").strip()

    _ics_reset()                       # fresh top-level open → refetch URL calendars
    _ak_index_reset()                  # …and rebuild the AnKing tag index (once)
    m, keys, opts = _get_map(families)  # cached by xlsx mtime + families
    if not m:
        # Nothing to load (configured map is missing/empty). Auto-launch just
        # notifies (never prompt → no loop); a manual open offers the file picker.
        if auto:
            tooltip("Janki Lectures — no lectures found. Tools → Load today's "
                    "lectures to choose a tag map.", period=4000)
            return
        _prompt_and_load_tag_map(day_offset)
        return
    aliases = _load_aliases()

    # Per-FRAGMENT suspended card-id sets: {search_fragment: set(cids)}. Filled by
    # the background _recount (find_cards is the slow part). Caching per fragment
    # (not per lecture/family) makes every filter — row totals, the grand total,
    # the per-deck breakdown, source toggles, 'exact only', and the per-lecture
    # +tag enable/disable — pure set math over cached sets, so nothing re-queries.
    # Cleared after an apply (suspended state changed).
    frag_ids = {}

    # Per-lecture DISABLED fragments (session-only), toggled from each row's +tag
    # menu: {nk: set(fragment_strings)}. A disabled fragment is dropped from that
    # lecture's counts and its unsuspend.
    disabled_frags = {}

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
    if no_cal:                       # no calendar → no day navigation
        for _w in (btn_prev, btn_today, btn_next):
            _w.setVisible(False)
        # Manual mode has no day alignment. Offer a one-click calendar import so the
        # user can switch to day-aligned mode without digging through settings. The
        # picker takes EITHER a local .ics file OR a calendar URL (http/https feed) —
        # ics_path already accepts both (see _read_source_text). On accept we save it
        # and reopen the window (now calendar-driven).
        btn_import_cal = QPushButton("＋ Import calendar…")

        def _do_import_cal():
            from aqt.qt import (
                QDialog, QVBoxLayout, QHBoxLayout, QLabel, QLineEdit, QPushButton,
                QFileDialog, QDialogButtonBox,
            )
            d = QDialog(dlg)
            d.setWindowTitle("Import calendar")
            lay = QVBoxLayout(d)
            lay.addWidget(QLabel(
                "Choose a calendar file (.ics) or paste a calendar URL\n"
                "(http/https — e.g. a subscribed .ics feed)."))
            row = QHBoxLayout()
            edit = QLineEdit()
            edit.setMinimumWidth(360)
            edit.setPlaceholderText("https://…/calendar.ics   or   /path/to/file.ics")
            edit.setText((_cfg().get("ics_path", "") or "").strip())
            browse = QPushButton("Browse…")
            row.addWidget(edit, 1)
            row.addWidget(browse)
            lay.addLayout(row)

            # Inline validation notice: a yellow ⚠ line under the field (hidden until
            # a check fails), instead of a modal popup. The dialog stays open so the
            # user can fix the path/URL and retry.
            warn = QLabel("")
            warn.setWordWrap(True)
            warn.setStyleSheet("color:#e0b000;")   # amber/yellow warning
            warn.setVisible(False)
            lay.addWidget(warn)

            def _browse():
                seed = edit.text().strip() or _cfg().get("ics_path", "")
                start = "" if _is_url(seed) else (os.path.dirname(_p(seed)) or "")
                fn, _f = QFileDialog.getOpenFileName(
                    d, "Choose your calendar (.ics)", start,
                    "Calendars (*.ics *.ical *.ifb);;All files (*)")
                if fn:
                    edit.setText(fn)

            browse.clicked.connect(_browse)
            bb = QDialogButtonBox(QDialogButtonBox.StandardButton.Ok
                                  | QDialogButtonBox.StandardButton.Cancel)
            lay.addWidget(bb)

            def _try_accept():
                val = edit.text().strip()
                if not val:
                    warn.setText("⚠  Enter a calendar file path or URL.")
                    warn.setVisible(True)
                    return
                # Validate before committing: read + parse the calendar and require
                # at least one event. A bad path / dead URL / non-ICS file yields
                # nothing — warn instead of silently saving an unusable calendar.
                _ics_reset()
                try:
                    by_date = _parse_ics_all(val)
                except Exception as e:
                    _log("import calendar parse failed: %s" % e)
                    by_date = {}
                if not by_date:
                    warn.setText("⚠  Couldn't read any events from that calendar. "
                                 "Check the path or URL points to a valid .ics with "
                                 "at least one event.")
                    warn.setVisible(True)
                    return
                cur = mw.addonManager.getConfig(__name__) or {}
                cur["ics_path"] = val
                mw.addonManager.writeConfig(__name__, cur)
                _ics_reset()
                d.accept()
                dlg.close()
                QTimer.singleShot(0, lambda: _open_today_dialog(0))

            bb.accepted.connect(_try_accept)
            bb.rejected.connect(d.reject)
            edit.returnPressed.connect(_try_accept)
            d.exec()

        btn_import_cal.clicked.connect(_do_import_cal)
        nav.insertWidget(0, btn_import_cal)

    info_lbl = QLabel("")
    v.addWidget(info_lbl)
    state_lbl = QLabel("")
    state_lbl.setWordWrap(True)
    v.addWidget(state_lbl)

    # Heads-up when some AnKing concept tags had no exact match in this collection
    # and fell back to a loose `tag:*concept*` search (deck named/versioned
    # differently here). Loose matches can be over-broad, so flag them for review —
    # with a checkbox right beside the warning to switch to exact-only matching.
    warn_row = QHBoxLayout()
    warn_lbl = QLabel("")
    warn_lbl.setWordWrap(True)
    warn_lbl.setStyleSheet("color:#e0b000;")   # amber warning
    warn_lbl.setVisible(False)
    exact_cb = QCheckBox("Exact matches only")
    exact_cb.setChecked(bool(cfg.get("ak_exact_only", False)))
    exact_cb.setToolTip(
        "Skip #AK concept tags that have no exact match in this collection "
        "(no loose tag:*concept* matching). Fewer false positives, but a "
        "mismatched deck may then unsuspend nothing.")
    warn_row.addWidget(warn_lbl, 1)
    warn_row.addWidget(exact_cb, 0, _Qt.AlignmentFlag.AlignTop | _Qt.AlignmentFlag.AlignRight)
    v.addLayout(warn_row)

    def _update_warn():
        # The loose warning only applies when loose matches are actually in use —
        # i.e. not in exact-only mode. (The checkbox itself stays visible.)
        if _AK_LOOSE and not exact_cb.isChecked():
            ex = sorted(_AK_LOOSE.values(), key=str.lower)
            shown = ", ".join(ex[:12])
            more = ("  (+%d more)" % (len(ex) - 12)) if len(ex) > 12 else ""
            warn_lbl.setText(
                "⚠ %d #AK concept tag(s) had no exact match in this collection, "
                "so they're matched loosely by name (<code>tag:*concept*</code>) — "
                "double-check these unsuspend the right cards: %s%s"
                % (len(ex), shown, more))
            warn_lbl.setVisible(True)
        else:
            warn_lbl.setVisible(False)

    _update_warn()

    def _on_exact_toggled(_checked):
        # Instant, no re-query: exact and loose id-sets are cached separately, so
        # toggling just changes which portions the counts include (set math). We
        # persist the flag, refresh the warning, and repaint via _recount (which
        # finds everything already cached → no find_cards, no progress bar).
        cur = mw.addonManager.getConfig(__name__) or {}
        cur["ak_exact_only"] = exact_cb.isChecked()
        mw.addonManager.writeConfig(__name__, cur)
        _update_warn()
        _recount()

    exact_cb.toggled.connect(_on_exact_toggled)

    # ── Source selector: unsuspend from only some of the enabled decks ──────────
    # One checkbox per globally-enabled family (AJ / hUtChCOM / AnKing); all ON by
    # default. Unchecking a source excludes its tags from the counts AND the apply,
    # so you can pull, say, only AnKing cards for a lecture. Counts/apply read
    # _selected_families(); toggling recounts live.
    _FAM_SHORT_UI = {"ak": "#AK", "aj": "AJ", "huc": "hUtChCOM"}
    # Families that ACTUALLY appear in the loaded tag map (so we only offer AJ if
    # there are AJ tags, etc.). AnKing fragments lose their marker in the
    # leaf→exact-tags resolution, so anything not AJ/hUtChCOM is AnKing.
    present_fams = set()
    for _nk in m:
        for _frag in m[_nk]["searches"]:
            if "AJ_UCCOM_keep" in _frag:
                present_fams.add("aj")
            elif "hUtChCOM" in _frag:
                present_fams.add("huc")
            else:
                present_fams.add("ak")
    src_cbs = {}
    src_row = QHBoxLayout()
    src_row.addWidget(QLabel("Unsuspend from:"))
    for suffix, _match, label in TAG_FAMILIES:
        if suffix not in {s for s, m, l in TAG_FAMILIES
                          if m in families}:   # only globally-enabled families
            continue
        if suffix not in present_fams:          # only families present in the map
            continue
        cb = QCheckBox(_FAM_SHORT_UI.get(suffix, label))
        cb.setChecked(True)
        src_cbs[suffix] = cb
        src_row.addWidget(cb)
    src_row.addStretch(1)
    if len(src_cbs) > 1:
        v.addLayout(src_row)
    elif len(src_cbs) == 1:
        # Only one source in the map → no choice to make, but show it read-only so
        # it's clear what's being pulled. (The hidden checkbox stays ticked, so
        # _selected_families() still returns it and the apply works.)
        only = next(iter(src_cbs))
        one_lbl = QLabel("Source: %s" % _FAM_SHORT_UI.get(only, only))
        one_lbl.setStyleSheet("color: gray;")
        v.addWidget(one_lbl)

    def _selected_families():
        """Suffixes whose source checkbox is ticked (defaults to all enabled)."""
        sel = {suf for suf, cb in src_cbs.items() if cb.isChecked()}
        return sel or set(src_cbs.keys())   # never let an empty selection zero-out

    table = QTableWidget(0, 5, dlg)
    table.setHorizontalHeaderLabels(
        ["Use", "Lecture" if no_cal else "Calendar event", "Matched lecture",
         "Cards", "Tags"])
    table.verticalHeader().setVisible(False)
    table.setEditTriggers(QAbstractItemView.EditTrigger.NoEditTriggers)
    table.setSelectionMode(QAbstractItemView.SelectionMode.NoSelection)
    hh = table.horizontalHeader()
    hh.setSectionResizeMode(0, QHeaderView.ResizeMode.ResizeToContents)
    hh.setSectionResizeMode(1, QHeaderView.ResizeMode.Stretch)
    hh.setSectionResizeMode(2, QHeaderView.ResizeMode.Stretch)
    hh.setSectionResizeMode(3, QHeaderView.ResizeMode.ResizeToContents)
    hh.setSectionResizeMode(4, QHeaderView.ResizeMode.ResizeToContents)
    if no_cal:                       # the "Matched lecture" combo is redundant here
        table.setColumnHidden(2, True)
    v.addWidget(table)

    total_lbl = QLabel("")
    # Thin determinate bar next to the total, filled as _recount's card-count
    # queries finish in the background. A fine 0–1000 range + a short eased value
    # animation makes each step glide rather than jump. Hidden when idle.
    count_bar = QProgressBar()
    count_bar.setRange(0, 1000)
    count_bar.setMaximumWidth(140)
    count_bar.setMaximumHeight(14)
    count_bar.setTextVisible(False)
    count_bar.setVisible(False)
    count_anim = QPropertyAnimation(count_bar, b"value", dlg)
    count_anim.setDuration(240)
    count_anim.setEasingCurve(QEasingCurve.Type.OutCubic)

    def _anim_bar_to(target):
        count_anim.stop()
        count_anim.setStartValue(count_bar.value())
        count_anim.setEndValue(int(target))
        count_anim.start()
    hb = QHBoxLayout()
    btn_resusp = QPushButton("Re-suspend day")
    btn_unsusp = QPushButton("Apply")
    btn_unsusp.setDefault(True)
    btn_close = QPushButton("Close")
    hb.addWidget(total_lbl); hb.addWidget(count_bar); hb.addStretch(1)
    hb.addWidget(btn_resusp); hb.addWidget(btn_close); hb.addWidget(btn_unsusp)
    v.addLayout(hb)

    # Mutable per-day state (repopulated by _populate; read by _update_total/_apply).
    st = {"offset": None, "target": None, "events": [], "combos": [],
          "auto_keys": [], "has_day_state": False, "active_set": set(),
          "closed": False}
    dlg.finished.connect(lambda _r: st.__setitem__("closed", True))

    _FAM_SHORT = {"ak": "#AK", "aj": "AJ", "huc": "hUtChCOM"}

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

    def _enabled_frags(nk):
        """The search fragments actually used for a lecture right now: family
        source ticked, not loose-when-exact-only, and not disabled in its +tag
        menu. Every filter funnels through here, so counts stay pure set math."""
        sel = _selected_families()
        ex_only = exact_cb.isChecked()
        off = disabled_frags.get(nk) or ()
        out = []
        for s in m[nk]["searches"]:
            if s in off:
                continue
            if _family_of(s) not in sel:
                continue
            if ex_only and _is_loose_search(s):
                continue
            out.append(s)
        return out

    def _row_ids(nk):
        """Union of cached suspended-id sets over a lecture's enabled fragments,
        or None if any enabled fragment isn't cached yet."""
        ids = set()
        for s in _enabled_frags(nk):
            cs = frag_ids.get(s)
            if cs is None:
                return None
            ids |= cs
        return ids

    def _last_seg(s):
        """Readable last ::-segment of the first tag path inside a fragment."""
        mt = re.search(r'tag:"?\*?([^"\)\s]+)', s)
        if not mt:
            return (s[:40] + "…") if len(s) > 40 else s
        path = mt.group(1).rstrip('*"')
        return path.split("::")[-1] or path

    def _frag_label(s):
        """Short human label for a search fragment, shown in the +tag menu."""
        if _is_loose_search(s):
            return "≈ %s  (loose)" % _last_seg(s)
        if "AJ_UCCOM_keep" in s:
            return "AJ · %s" % _last_seg(s)
        if "hUtChCOM" in s:
            return "hUtChCOM · %s" % _last_seg(s)
        return "#AK · %s" % _last_seg(s)

    def _resolve_event(ev):
        """Resolve a calendar event title to a lecture key (nk, is_fuzzy) via the
        alias table, exact match, then fuzzy match — the same rules the rows use."""
        nkey = _norm(ev)
        if nkey in aliases:
            nkey = _norm(aliases[nkey])
        if nkey in m:
            return nkey, False
        mk = _fuzzy_match(ev, nkey, keys, m, cutoff)
        return (mk, True) if mk else (None, False)

    _COUNT_CHUNK = 24   # fragments per background query batch

    def _snapshot():
        """(row, nk, checked) for every row, captured on the main thread."""
        events, combos = st["events"], st["combos"]
        snap = []
        for r in range(len(events)):
            it0 = table.item(r, 0)
            combo = combos[r] if r < len(combos) else None
            nk = combo.currentData() if combo else None
            checked = bool(it0 and it0.checkState() == _Qt.CheckState.Checked)
            snap.append((r, nk, checked))
        return snap

    def _repaint():
        """Paint row counts + the headline total from whatever's cached now. While
        the current day is still being counted, the total keeps the 'Counting…'
        note (rows still fill in as their fragments arrive)."""
        snap = st.get("snap", [])
        for (r, nk, _checked) in snap:
            it3 = table.item(r, 3)
            if it3:
                ids = _row_ids(nk) if nk else None
                it3.setText(str(len(ids)) if ids is not None else ("—" if not nk else "…"))
        totals = set(); fam_ids = {}
        for (r, nk, checked) in snap:
            if not (checked and nk):
                continue
            for s in _enabled_frags(nk):
                cs = frag_ids.get(s)
                if not cs:
                    continue
                totals |= cs
                fam_ids.setdefault(_family_of(s), set()).update(cs)
        parts = []
        for suffix, _match, label in TAG_FAMILIES:
            if fam_ids.get(suffix):
                parts.append("%s %d" % (_FAM_SHORT.get(suffix, label),
                                        len(fam_ids[suffix])))
        breakdown = ("&nbsp;&nbsp;—&nbsp;&nbsp;" + " · ".join(parts)) if parts else ""
        if not st.get("cur_pending"):
            total_lbl.setText("<b>%d</b> cards will be unsuspended%s"
                              % (len(totals), breakdown))

    def _neighbor_frags(have):
        """Uncached fragments of the ±1/±2 days (calendar mode) to pre-warm."""
        if no_cal:
            return []
        base = st.get("target")
        if not base:
            return []
        have = set(have)
        out = []
        for d in (-1, 1, -2, 2):
            day = base + datetime.timedelta(days=d)
            for ev in _ics_by_date(ics_path).get(day, []):
                nk, _fz = _resolve_event(ev)
                if not nk:
                    continue
                for s in m[nk]["searches"]:
                    if s in frag_ids or s in have:
                        continue
                    have.add(s); out.append(s)
        return out

    def _update_count_bar():
        """Drive the progress bar off how much of the CURRENT day is still
        uncached (neighbour pre-warming runs with the bar hidden)."""
        total = st.get("cur_total", 0)
        remaining = sum(1 for s in (st.get("cur_needed") or ()) if s not in frag_ids)
        st["cur_pending"] = bool(total) and remaining > 0
        if not total or remaining <= 0:
            count_anim.stop()
            count_bar.setVisible(False)
        else:
            count_bar.setVisible(True)
            _anim_bar_to(round((total - remaining) * 1000 / total))

    def _pump():
        """Drain the fragment queue one batch at a time in a SINGLE background
        QueryOp — so collection queries never overlap. Re-invokes itself until the
        queue empties. The current day sits at the front (see _recount), so it's
        always counted next; neighbours trail behind and warm silently."""
        if st.get("busy") or st.get("closed"):
            return
        queue = st.setdefault("queue", [])
        if not queue:
            return
        st["busy"] = True
        cgen = st.get("cgen", 0)
        batch = queue[:_COUNT_CHUNK]
        del queue[:_COUNT_CHUNK]
        from aqt.operations import QueryOp

        def op(col):
            res = {}
            for s in batch:
                try:
                    res[s] = set(col.find_cards("(%s) is:suspended" % s))
                except Exception:
                    res[s] = set()
            return res

        def done(res):
            st["busy"] = False
            if st.get("closed"):
                return
            if cgen == st.get("cgen", 0):   # else a suspend/unsuspend invalidated it
                frag_ids.update(res)
            _update_count_bar()
            _repaint()
            _pump()

        QueryOp(parent=dlg, op=op, success=done).run_in_background()

    def _recount():
        """Rebuild the current day's count and (re)prioritise the query queue: the
        day now on screen jumps to the FRONT (counted next), anything previously
        queued stays behind it, and neighbouring days are appended to pre-warm. A
        single worker (_pump) drains the queue, so queries never overlap and the
        visible day always resolves first."""
        snap = _snapshot()
        st["snap"] = snap

        cur, seen = [], set()
        for (r, nk, _ck) in snap:
            if not nk:
                continue
            for s in m[nk]["searches"]:
                if s in frag_ids or s in seen:
                    continue
                seen.add(s); cur.append(s)
        st["cur_needed"] = set(cur)
        st["cur_total"] = len(cur)

        queue = st.setdefault("queue", [])
        curset = set(cur)
        rest = [x for x in queue if x not in curset]
        new_queue = cur + rest                       # current day → front
        have = set(new_queue)
        for s in _neighbor_frags(have):              # neighbours → back
            new_queue.append(s); have.add(s)
        queue[:] = new_queue

        if cur:
            st["cur_pending"] = True
            total_lbl.setText("<i>Counting…</i>")
            count_anim.stop()
            count_bar.setValue(0)
            count_bar.setVisible(True)
            _repaint()                               # fill cached rows now
        else:
            st["cur_pending"] = False
            _update_count_bar()
            _repaint()
        _pump()

    def _refresh_row(row):
        nk = st["combos"][row].currentData()
        it0 = table.item(row, 0)
        if it0:
            it0.setCheckState(_Qt.CheckState.Checked if nk else _Qt.CheckState.Unchecked)
        it3 = table.item(row, 3)
        if it3:
            ids = _row_ids(nk) if nk else None
            it3.setText(str(len(ids)) if ids is not None else ("…" if nk else "—"))
        _recount()

    def _show_tag_menu(row):
        """Dropdown for a row's lecture: one checkable entry per tag, letting you
        enable/disable individual tags for just that lecture. Uses the current
        combo selection so it follows a corrected 'Matched lecture'."""
        from aqt.qt import QMenu, QWidgetAction, QCheckBox as _MCheckBox
        nk = st["combos"][row].currentData() if row < len(st["combos"]) else None
        if not nk:
            return
        frags = m[nk]["searches"]
        off = disabled_frags.setdefault(nk, set())
        menu = QMenu(dlg)
        if not frags:
            a = menu.addAction("(no tags for this lecture)")
            a.setEnabled(False)
        else:
            all_a = menu.addAction("Enable all")
            none_a = menu.addAction("Disable all")
            all_a.triggered.connect(lambda: (off.clear(), _recount()))
            none_a.triggered.connect(lambda: (off.update(frags), _recount()))
            menu.addSeparator()
            for s in frags:
                cb = _MCheckBox(_frag_label(s), menu)
                cb.setChecked(s not in off)
                cb.setToolTip(s)

                def _tog(checked, s=s):
                    if checked:
                        off.discard(s)
                    else:
                        off.add(s)
                    _recount()

                cb.toggled.connect(_tog)
                wa = QWidgetAction(menu)
                wa.setDefaultWidget(cb)
                menu.addAction(wa)
        btn = table.cellWidget(row, 4)
        if btn is not None:
            menu.exec(btn.mapToGlobal(btn.rect().bottomLeft()))

    def _populate(offset):
        st["offset"] = offset
        if no_cal:
            # Manual mode: every lecture in the map, tracked under today's key.
            target = _today()
            st["target"] = target
            events = [m[nk]["display"] for nk in opts]
        else:
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
        if no_cal:
            day_hdr.setText("<b>All lectures</b>")
            info_lbl.setText(
                "No calendar set — tick the lectures to unsuspend, then Apply. "
                "%d lectures in the tag map." % len(m))
        else:
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

        table.blockSignals(True)
        table.setRowCount(0)
        table.setRowCount(len(events))
        st["combos"] = []
        st["auto_keys"] = []
        for r, ev in enumerate(events):
            chk = QTableWidgetItem()
            chk.setFlags(_Qt.ItemFlag.ItemIsUserCheckable | _Qt.ItemFlag.ItemIsEnabled)
            resolved, fuzzy = _resolve_event(ev)
            st["auto_keys"].append(resolved)

            evi = QTableWidgetItem(ev + ("   (~)" if fuzzy else ""))
            combo = QComboBox()
            combo.setModel(combo_model)                    # shared model — cheap
            combo.setCurrentIndex(model_row.get(resolved, 0))
            if has_day_state:
                disp = m[resolved]["display"] if resolved else None
                want_checked = disp in active_set
            elif no_cal:
                want_checked = False           # manual mode: user picks
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
                _ids = _row_ids(resolved)
                cell = str(len(_ids)) if _ids is not None else "…"
            table.setItem(r, 3, QTableWidgetItem(cell))
            # "+" → dropdown to enable/disable this lecture's individual tags.
            if resolved:
                plus = QToolButton()
                plus.setText("+")
                plus.setAutoRaise(True)
                plus.setToolTip("Enable/disable individual tags for this lecture")
                plus.clicked.connect(lambda _c=False, row=r: _show_tag_menu(row))
                table.setCellWidget(r, 4, plus)
            else:
                table.removeCellWidget(r, 4)
            st["combos"].append(combo)
            combo.currentIndexChanged.connect(lambda _i, row=r: _refresh_row(row))
        table.blockSignals(False)

        # Window is already built with cached/"…" counts. _recount queues this
        # day's fragments at the FRONT and neighbours behind; the single _pump
        # worker counts the visible day first, then pre-warms neighbours.
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
            searches = _enabled_frags(nk)   # honors source / exact-only / +tag toggles
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
        frag_ids.clear()   # suspended state changed → cached id-sets are stale
        st["cgen"] = st.get("cgen", 0) + 1   # invalidate any in-flight count batch
        st["queue"] = []                     # rebuilt fresh by the next _recount

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
        frag_ids.clear()
        st["cgen"] = st.get("cgen", 0) + 1   # invalidate any in-flight count batch
        st["queue"] = []                     # rebuilt fresh by the next _recount
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
        QFileDialog, QWidget, QListWidget, QVBoxLayout,
    )
    cfg = _cfg()

    # ---- Pane 1: Sources (spreadsheet + calendar file/URL) -------------------
    src = QWidget()
    g = QGridLayout(src)
    g.setColumnStretch(1, 1)

    g.addWidget(QLabel("<b>Tag map</b> (.xlsx spreadsheet, .txt or .json lecture → tag list)"), 0, 0, 1, 3)
    xlsx_edit = QLineEdit(cfg.get("xlsx_path", ""))
    xlsx_edit.setPlaceholderText("~/Downloads/lectures.xlsx  ·  …_Tags_by_Lecture.txt  ·  tags.json")
    xlsx_btn = QPushButton("Browse…")

    def _pick_xlsx():
        fn, _f = QFileDialog.getOpenFileName(
            src, "Choose tag map", os.path.dirname(_p(xlsx_edit.text())) or "",
            "Tag maps (*.xlsx *.xlsm *.txt *.json);;All files (*)")
        if fn:
            xlsx_edit.setText(fn)

    xlsx_btn.clicked.connect(_pick_xlsx)
    g.addWidget(QLabel("Base file:"), 1, 0)
    g.addWidget(xlsx_edit, 1, 1)
    g.addWidget(xlsx_btn, 1, 2)

    # Extra .txt/.json tag lists, merged ON TOP of the base file (union of tags
    # per lecture). Add/remove as many as you like without touching the base.
    txt_lbl = QLabel(".txt/.json:")
    g.addWidget(txt_lbl, 2, 0)
    txt_list = QListWidget()
    txt_list.setMaximumHeight(90)
    txt_list.setToolTip("Additional .txt/.json tag lists merged on top of the base file.")
    for _tp in (cfg.get("txt_paths") or []):
        if (_tp or "").strip():
            txt_list.addItem(_tp)
    g.addWidget(txt_list, 2, 1)

    txt_btns = QWidget()
    _tbl = QVBoxLayout(txt_btns)
    _tbl.setContentsMargins(0, 0, 0, 0)
    add_txt_btn = QPushButton("Add file…")
    rm_txt_btn = QPushButton("Remove")

    def _add_txt():
        fns, _f = QFileDialog.getOpenFileNames(
            src, "Choose .txt/.json tag list(s)", os.path.dirname(_p(xlsx_edit.text())) or "",
            "Text/JSON tag maps (*.txt *.json);;All files (*)")
        existing = {txt_list.item(i).text() for i in range(txt_list.count())}
        for fn in fns:
            if fn and fn not in existing:
                txt_list.addItem(fn)
                existing.add(fn)

    def _rm_txt():
        for it in txt_list.selectedItems():
            txt_list.takeItem(txt_list.row(it))

    add_txt_btn.clicked.connect(_add_txt)
    rm_txt_btn.clicked.connect(_rm_txt)
    _tbl.addWidget(add_txt_btn)
    _tbl.addWidget(rm_txt_btn)
    _tbl.addStretch(1)
    g.addWidget(txt_btns, 2, 2)

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
    today_btn.setStyleSheet(
        "QPushButton{background-color:#55585e;color:white;border:none;"
        "padding:5px 12px;border-radius:5px;}"
        "QPushButton:hover{background-color:#61646b;}")
    today_btn.clicked.connect(lambda: _open_today_dialog())
    g.addWidget(today_btn, 6, 1, 1, 2)

    # Link to the step-by-step tutorial on GitHub (tag-map format, calendar,
    # manual mode, settings). blob/HEAD resolves to the repo's default branch.
    help_lbl = QLabel(
        '<a href="https://github.com/cjreplogle/janki/blob/HEAD/docs/'
        'load-todays-lectures.md">How to use this — tutorial &amp; tag-map format ↗</a>')
    help_lbl.setOpenExternalLinks(True)
    help_lbl.setStyleSheet("color: palette(mid);")
    g.addWidget(help_lbl, 7, 1, 1, 2)
    g.setRowStretch(8, 1)

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

    bg.addWidget(QLabel("Keyword coverage:"), row, 0)
    coverage = QDoubleSpinBox()
    coverage.setRange(0.30, 1.00)
    coverage.setSingleStep(0.05)
    coverage.setDecimals(2)
    coverage.setValue(float(cfg.get("match_coverage", 0.6)))
    coverage.setToolTip(
        "Fraction of a lecture title's keywords that must be present to accept a "
        "fuzzy match. Higher = stricter (fewer wrong matches); lower = looser.\n"
        "0.60 lets a 2-of-3-word title match (e.g. “histology muscle tissue” "
        "→ “Histology module - skeletal muscle”).")
    bg.addWidget(coverage, row, 1)
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
        cur["txt_paths"] = [txt_list.item(i).text().strip()
                            for i in range(txt_list.count())
                            if txt_list.item(i).text().strip()]
        cur["ics_path"] = ics_edit.text().strip()
        cur["auto_on_launch"] = auto_cb.isChecked()
        for suffix, cb in fam_cbs.items():
            cur["unsuspend_%s" % suffix] = cb.isChecked()
        cur["fuzzy_cutoff"] = float(fuzzy.value())
        cur["match_coverage"] = float(coverage.value())
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

def _paths_ready() -> bool:
    """True once the TAG MAP is set (the calendar is optional). Without a calendar
    the lecture window runs in manual mode (pick lectures to unsuspend). On a fresh
    install the path is empty, so guard on this so the feature stays dormant until
    it's actually configured."""
    c = _cfg()
    if (c.get("xlsx_path") or "").strip():
        return True
    return any((t or "").strip() for t in (c.get("txt_paths") or []))


def run_today(interactive=True, auto=False):
    if not _paths_ready():
        # No tag map configured yet. A manual open pops a file picker to choose one
        # right away (then loads it); auto-launch stays silent (no dialog on boot).
        if interactive and not auto:
            _prompt_and_load_tag_map()
        return
    try:
        if interactive:
            _open_today_dialog(auto=auto)
            return
        # Non-interactive (auto-on-launch): only the calendar drives auto-matching.
        # With no calendar there's nothing to align, so never mass-unsuspend.
        if not (_cfg().get("ics_path") or "").strip():
            return
        # Silently unsuspend auto-matches.
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
    if not _paths_ready():
        return                     # nothing configured yet → stay silent on launch
    today = _today().isoformat()
    st = _load_state()
    if st.get("last_auto_date") == today:
        return
    st["last_auto_date"] = today
    _save_state(st)
    QTimer.singleShot(1500, lambda: run_today(interactive=True, auto=True))


gui_hooks.main_window_did_init.append(_install_menu)
gui_hooks.profile_did_open.append(_on_profile_open)
