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
_opening = False          # guards against a second click while the window is building

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
# Only Hutch ships on: AnKing's tag map is enormous (tens of thousands of tags), and
# auto-loading it on every launch could grind a laptop to a halt. Opt in deliberately.
_DEFAULT_ON = {"huc"}


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
        with urllib.request.urlopen(p, timeout=8) as resp:  # noqa: S310 (user-supplied own calendar)
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
            # Empty cells are self-closing (<c r="O7" s="3"/>). The old pattern let one
            # swallow the NEXT cell's value and file it under the wrong column, so a
            # lecture right after a formatted-but-empty cell lost its column alignment
            # and silently dropped out of the map.
            for attrs, body in re.findall(r'<c\b([^>]*?)(?:/>|>(.*?)</c>)', row, re.S):
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


# Split run-together titles into words at camelCase/PascalCase, acronym, and
# letter↔digit boundaries: 'GeneticRBCDisorders' -> 'Genetic RBC Disorders',
# 'BoneMarrowDevelopment' -> 'Bone Marrow Development'. Question-bank lecture
# titles are often spaceless (no calendar spacing), which otherwise collapses to a
# single opaque token and defeats the keyword-coverage guard below. Underscores
# already split via the final [a-z0-9]+ pass; this handles the case boundaries.
_CAMEL = re.compile(r"[A-Z]+(?=[A-Z][a-z])|[A-Z]?[a-z]+|[A-Z]+|[0-9]+")


def _split_camel(s):
    return " ".join(_CAMEL.findall(s or ""))


def _match_tokens(s):
    s = _PARENS.sub("", s or "")           # strip "(...)" while case is intact
    s = s.replace("&", " and ")
    s = _split_camel(s)                     # break spaceless titles into words
    s = _apply_synonyms(s.lower())
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


def _option_score(event, display):
    """How well lecture `display` fits calendar title `event`, for ordering the row
    dropdown. Shared distinctive WORDS dominate (prefix-tolerant: "urea" ~ "ureagenesis"),
    both ways (how much of the event it covers, and how focused the lecture is on it);
    a character-trigram similarity breaks ties. (Raw character ratio ranked "Nucleus"
    above "TCA Cycle" for "Urea cycle".)"""
    ek = set(_key_tokens(_match_tokens(event)))
    dk = set(_key_tokens(_match_tokens(display)))

    def _hit(w, pool):
        return any(w == x or w.startswith(x) or x.startswith(w) or w[:5] == x[:5]
                   for x in pool)
    cover = (sum(1 for w in ek if _hit(w, dk)) / len(ek)) if ek else 0.0
    focus = (sum(1 for w in dk if _hit(w, ek)) / len(dk)) if dk else 0.0

    def _tri(s):
        s = re.sub(r"[^a-z0-9]", "", (s or "").lower())
        return {s[i:i + 3] for i in range(max(0, len(s) - 2))}
    a, b = _tri(event), _tri(display)
    dice = (2.0 * len(a & b) / (len(a) + len(b))) if (a and b) else 0.0
    return 3.0 * cover + 1.0 * focus + dice


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


def _atoms(searches):
    """Each search split to its single-tag pieces where it's a plain OR of tags
    ("(tag:a OR tag:b …)"), so huge lectures can be asked in small chunks."""
    out = []
    for s in searches:
        inner = s[1:-1] if s.startswith("(") and s.endswith(")") else None
        parts = inner.split(" OR ") if inner else None
        if parts and all(p.startswith(('"tag:', "tag:")) and "(" not in p for p in parts):
            out.extend(parts)
        else:
            out.append(s)
    return out


# Lecture membership (which cards carry a lecture's tags) only changes when notes are
# added / edited / retagged — never on reviews — so it's cached: up to _FIND_MAX
# lectures (LRU, a few KB each), dropped wholesale when the notes signature changes.
# Filters like "is:suspended" then run against just those card ids (fast).
from collections import OrderedDict as _OD
_FIND_CACHE = _OD()
_FIND_SIG = {"v": None}
_FIND_MAX = 64


def _notes_sig(col):
    try:
        return tuple(col.db.first("select count(), max(mod) from notes") or ())
    except Exception:
        return None


# Where each source's cards actually live, found from the collection: cards whose note
# carries the source's tag prefix, grouped by TOP-LEVEL deck. Searches default to those
# decks (e.g. Hutch → CRanki); Settings → Lectures → Calendar can leave one out.
_SRC_PREFIX = {"ak": "#AK", "huc": "hUtChCOM", "aj": "AJ_UCCOM_keep"}
_DETECTED = {"sig": None, "map": {}}


def _detect_path():
    return os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(
        os.path.abspath(__file__)))), "user_files", "source_decks.json")


def _detect_key(col):
    try:
        return "%s|%s" % (col.db.scalar("select count() from notes"), datetime.date.today())
    except Exception:
        return None


def detect_source_decks(col, force=False):
    """{family: [(top-level deck, cards), …]} biggest first; decks holding under 2% of a
    source's cards are dropped as strays. ONE pass over the cards for every source,
    kept on disk and re-checked once a day or when the note count changes."""
    key = _detect_key(col)
    if not force and key and _DETECTED["sig"] == key:
        return _DETECTED["map"]
    if not force and key:
        try:
            saved = json.load(open(_detect_path()))
            if saved.get("key") == key:
                _DETECTED["sig"] = key
                _DETECTED["map"] = {f: [tuple(x) for x in v] for f, v in saved["map"].items()}
                return _DETECTED["map"]
        except Exception:
            pass
    names = {d.id: d.name.split("::")[0] for d in col.decks.all_names_and_ids()}
    cond = " or ".join("n.tags like ?" for _ in _SRC_PREFIX)
    case = " ".join("when n.tags like ? then '%s'" % f for f in _SRC_PREFIX)
    pats = ["%% %s%%" % p for p in _SRC_PREFIX.values()]
    tot = {f: {} for f in _SRC_PREFIX}
    for fam, did, n in col.db.all(
            "select case %s end, case when c.odid then c.odid else c.did end, count() "
            "from cards c join notes n on n.id = c.nid where %s group by 1, 2"
            % (case, cond), *(pats + pats)):
        top = names.get(did)
        if fam in tot and top and not top.startswith("Janki Calendar"):
            tot[fam][top] = tot[fam].get(top, 0) + n
    out = {}
    for fam, t in tot.items():
        allc = sum(t.values())
        out[fam] = sorted(((d, n) for d, n in t.items() if allc and n / allc >= 0.02),
                          key=lambda x: -x[1])
    _DETECTED["sig"], _DETECTED["map"] = key, out
    try:
        with open(_detect_path(), "w") as f:
            json.dump({"key": key, "map": out}, f)
    except Exception:
        pass
    return out


def source_decks():
    """{family: [deck names]} each source is searched in (its decks + subdecks): the
    detected decks minus any you've unticked. A source with nothing detected (or the
    detection not run yet) searches the whole collection."""
    try:
        skip = _cfg().get("lecture_source_skip") or {}
        out = {}
        for fam, decks in (_DETECTED["map"] or {}).items():
            keep = [d for d, _n in decks if d not in (skip.get(fam) or [])]
            if keep:
                out[fam] = keep
        return out
    except Exception:
        return {}


def _deck_clause(names):
    parts = []
    for name in names:
        n = name.replace('"', '')
        parts += ['deck:"%s"' % n, 'deck:"%s::*"' % n]
    return "(" + " OR ".join(parts) + ")"


def _find_base(col, searches):
    detect_source_decks(col)                    # cheap when cached
    decks = source_decks()
    sig = (_notes_sig(col), tuple(sorted((k, tuple(v)) for k, v in decks.items())))
    if sig is None or sig != _FIND_SIG["v"]:
        _FIND_CACHE.clear()
        _FIND_SIG["v"] = sig
    key = tuple(searches)
    hit = _FIND_CACHE.get(key)
    if hit is not None:
        _FIND_CACHE.move_to_end(key)
        return hit
    by_fam = {}
    for srch in searches:
        by_fam.setdefault(family_of(srch), []).extend(_atoms([srch]))
    out = set()
    for fam, atoms in by_fam.items():
        dc = (" " + _deck_clause(decks[fam])) if fam in decks else ""
        # 40 per query: each tag term becomes several SQL nodes (child-tag matching),
        # so 150 could still pass SQLite's depth limit of 1000 on big AnKing lectures
        for i in range(0, len(atoms), 40):
            q = " OR ".join("(%s)" % a for a in atoms[i:i + 40])
            out.update(col.find_cards("(%s)%s" % (q, dc)))
    out = frozenset(out)
    _FIND_CACHE[key] = out
    while len(_FIND_CACHE) > _FIND_MAX:
        _FIND_CACHE.popitem(last=False)
    return out


def find_ids(col, searches, extra=""):
    """Card ids matching any of `searches` (+ `extra`). One giant OR overflows SQLite's
    expression depth (1000) on lectures with hundreds of tags, so the tag part is asked
    150 at a time — and remembered (see _find_base)."""
    base = _find_base(col, searches)
    if not extra or not base:
        return set(base)
    out = set()
    ids = sorted(base)
    for i in range(0, len(ids), 2000):
        out.update(col.find_cards("cid:%s %s" % (",".join(map(str, ids[i:i + 2000])), extra)))
    return out


def _suspended_ids(searches):
    if not searches:
        return set()
    try:
        return find_ids(mw.col, searches, "is:suspended")
    except Exception as e:
        _log("find_cards failed: %s" % e)
        return set()


def _match_ids(searches):
    """All card ids matching these searches, regardless of suspend state — used to
    know which lecture a card belongs to when reconciling re-suspends."""
    if not searches:
        return set()
    try:
        return find_ids(mw.col, searches)
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
    return use_tag_map_file(fn, day_offset)


def use_tag_map_file(fn, day_offset=0, open_after=True):
    """Install `fn` as the lecture→tag map — the file picker's "Choose file…" step, also
    used when a map file is dropped on the main window. Returns True if it loaded."""
    cur = mw.addonManager.getConfig(__name__) or {}
    # The base slot is reserved for a spreadsheet; a .txt/.json is always a
    # complementary layer (still resolves on its own with an empty base).
    if fn.lower().endswith((".txt", ".json")):
        extras = list(cur.get("txt_paths") or [])
        if fn not in extras:
            extras.append(fn)
        cur["txt_paths"] = extras
    else:
        cur["xlsx_path"] = fn
    mw.addonManager.writeConfig(__name__, cur)
    _MAP_CACHE["key"] = None            # force a rebuild with the new path
    m2, _k2, _o2 = _get_map(_enabled_families())
    if m2:
        if open_after:
            QTimer.singleShot(0, lambda: _open_today_dialog(day_offset))
        return True
    showInfo("Couldn't load any lectures from that file.\n\n"
             "Make sure it's a valid .xlsx spreadsheet, .txt or .json tag map.",
             title="Janki Lectures")
    return False


def _generate_map_from_los(day_offset=0, parent=None, on_map_ready=None,
                           open_after=True):
    """Build a lecture→tag map from a course learning-objectives .docx: parse the
    lectures, copy an AI prompt to the clipboard, then (after the user pastes it
    into their own AI and saves the JSON reply) expand + install that reply as the
    map. Local except for the user's own paste.

    `parent`      — dialog parent (so it centers over the Settings window when
                    launched from there).
    `on_map_ready(path)` — called with the written map path after a successful
                    build (lets the Settings pane sync its field so its own save
                    doesn't overwrite the fresh map).
    `open_after`  — jump to the today's-lectures window afterwards (off when run
                    from Settings, which is already modal)."""
    from aqt.qt import (
        QFileDialog, QApplication, QDialog, QVBoxLayout, QHBoxLayout, QLabel,
        QPushButton, QCheckBox, QPlainTextEdit, QFrame,
    )
    from aqt.utils import showWarning, tooltip
    from . import qbank
    par = parent or mw
    path, _f = QFileDialog.getOpenFileName(
        par, "Choose a learning-objectives .docx", "",
        "Word documents (*.docx)")
    if not path:
        return
    try:
        lectures = qbank.lo_docx_lectures(path)
    except Exception as e:
        showWarning("Could not read .docx:\n\n%s" % e)
        return
    if not lectures:
        showWarning("No lecture titles found — the .docx isn't in the expected "
                    "learning-objectives format (ALL-CAPS lecture titles followed "
                    "by their objectives).")
        return

    # Candidate-family counts, so each checkbox shows what it adds (the concept
    # list is by far the biggest — the main lever on prompt size).
    n_concepts = len({t.split("::")[-1] for t in qbank._concept_tags()})
    n_aj = len(qbank._family_tags("AJ_UCCOM_keep"))
    n_hutch = len(qbank._family_tags("hUtChCOM"))

    # Extra lecture titles from an already-configured tag map (spreadsheet/.txt/
    # .json — NOT the .ics, which we never read) to sharpen the concept narrowing.
    extra_titles = []
    try:
        _m, _k, _o = _get_map(_enabled_families())
        extra_titles = [_m[k]["display"] for k in _m]
    except Exception:
        extra_titles = []

    d = QDialog(par)
    d.setWindowTitle("Generate tag map from objectives")
    lay = QVBoxLayout(d)
    lay.addWidget(QLabel(
        "Parsed <b>%d lectures</b> from “%s”." %
        (len(lectures), os.path.basename(path))))

    lay.addWidget(QLabel("<b>Include candidate tags:</b> (fewer = shorter prompt)"))
    # How many concepts the smart-match keeps — computed once (it depends only on
    # the course content, not the other toggles) so it can preview on the label.
    try:
        n_narrowed = len(qbank._relevant_concept_leaves(lectures, extra_titles))
    except Exception:
        n_narrowed = n_concepts

    cb_concepts = QCheckBox("AnKing concepts — #Subjects (%d)" % n_concepts)
    cb_concepts.setChecked(n_concepts > 0)
    lay.addWidget(cb_concepts)

    # Smart-match is a SUB-option of AnKing concepts: indented, and only shown when
    # concepts are enabled. Label previews how many concepts it narrows down to.
    cb_narrow = QCheckBox("Smart-match to this course's content → %d of %d concepts"
                          % (n_narrowed, n_concepts))
    cb_narrow.setChecked(True)
    cb_narrow.setStyleSheet("margin-left: 22px;")
    cb_narrow.setToolTip("Keep only #Subjects concepts whose terms appear in the "
                         "lecture titles/objectives%s — a much shorter, more "
                         "relevant list." %
                         (" and your configured tag map"
                          if extra_titles else ""))
    lay.addWidget(cb_narrow)

    cb_aj = QCheckBox("AJ deck tags — AJ_UCCOM_keep (%d)" % n_aj)
    cb_aj.setChecked(n_aj > 0)
    cb_hutch = QCheckBox("Hutch deck tags — hUtChCOM (%d)" % n_hutch)
    cb_hutch.setChecked(n_hutch > 0)
    for _cb in (cb_aj, cb_hutch):
        lay.addWidget(_cb)

    est = QLabel("")
    est.setStyleSheet("color: palette(mid);")
    lay.addWidget(est)

    def _current_prompt():
        return qbank.build_lo_tagmap_prompt(
            lectures, concepts=cb_concepts.isChecked(),
            aj_on=cb_aj.isChecked(), hutch_on=cb_hutch.isChecked(),
            narrow=cb_narrow.isChecked(), extra_titles=extra_titles)

    def _refresh(*_):
        try:
            cb_narrow.setVisible(cb_concepts.isChecked())   # sub-option of AnKing
            p, s = _current_prompt()
            est.setText("≈ %s characters · ~%s tokens · %d candidate tags "
                        "(%d concepts)"
                        % (f"{len(p):,}", f"{len(p)//4:,}", s["candidates"],
                           s["concepts"]))
        except Exception:
            est.setText("")
    for _cb in (cb_concepts, cb_aj, cb_hutch, cb_narrow):
        _cb.stateChanged.connect(_refresh)
    _refresh()

    copy_btn = QPushButton("Copy prompt to clipboard")
    copy_btn.setStyleSheet(
        "QPushButton{background-color:#55585e;color:white;border:none;"
        "padding:5px 12px;border-radius:5px;}"
        "QPushButton:hover{background-color:#61646b;}")

    def _copy():
        p, _s = _current_prompt()
        QApplication.clipboard().setText(p)
        tooltip("Prompt copied — paste it into your AI.", period=2500)
    copy_btn.clicked.connect(_copy)
    lay.addWidget(copy_btn)

    _hr = QFrame()
    _hr.setFrameShape(QFrame.Shape.HLine)
    _hr.setStyleSheet("color: palette(mid);")
    lay.addWidget(_hr)

    lay.addWidget(QLabel(
        "Paste the AI's JSON reply here, then click <b>Build tag map</b> — you'll be "
        "asked where to save it (.json or .txt):"))
    reply_box = QPlainTextEdit()
    reply_box.setPlaceholderText('{ "Lecture title": ["#AK_Step1_v12::…", …], … }')
    reply_box.setMinimumSize(460, 150)
    lay.addWidget(reply_box)

    def _finish(map_path, n, kept, dropped):
        _MAP_CACHE["key"] = None
        if on_map_ready:
            # Host (Settings pane) wires the file into its .txt/.json list itself.
            try:
                on_map_ready(map_path)
            except Exception:
                pass
        else:
            # Standalone (first-launch) use: add it to the complementary
            # .txt/.json list, NOT the base. The base slot is reserved for an
            # .xlsx spreadsheet; a generated map is always a layer on top. With
            # no base present it still resolves on its own (build_lecture_map
            # merges txt_paths over an empty base), so it reads independently.
            cur = mw.addonManager.getConfig(__name__) or {}
            extras = list(cur.get("txt_paths") or [])
            if map_path not in extras:
                extras.append(map_path)
            cur["txt_paths"] = extras
            mw.addonManager.writeConfig(__name__, cur)
        d.accept()
        _lec_sfx("loaded")
        tooltip("Tag map saved: %d lectures, %d tags (%d dropped).\n%s"
                % (n, kept, dropped, map_path), period=5000)
        if open_after:
            QTimer.singleShot(0, lambda: _open_today_dialog(day_offset))

    def _ask_out_path():
        """Where to save the produced map. Defaults next to the .docx so it's easy
        to find; user picks .json or .txt."""
        default = os.path.splitext(path)[0] + "_tagmap.json"
        op, _s = QFileDialog.getSaveFileName(
            par, "Save tag map", default,
            "JSON tag map (*.json);;Text tag map (*.txt)")
        return op

    def _do_build(raw=None, reply_path=None):
        out_path = _ask_out_path()
        if not out_path:
            return                        # cancelled the save
        try:
            map_path, n, kept, dropped = qbank.write_lo_tagmap(
                raw=raw, reply_path=reply_path, out_path=out_path)
        except Exception as e:
            showWarning("Could not parse the reply:\n\n%s" % e)
            return
        if not n:
            showWarning("No usable lecture → tag mappings were found in the reply.")
            return
        _finish(map_path, n, kept, dropped)

    def _build():
        raw = reply_box.toPlainText().strip()
        if not raw:
            showWarning("Paste the AI's JSON reply first (or use “Load from file…”).")
            return
        _do_build(raw=raw)

    def _load_file():
        rp, _r = QFileDialog.getOpenFileName(
            par, "Load AI reply (.json)", os.path.dirname(path),
            "AI reply (*.json *.txt);;All files (*)")
        if not rp:
            return
        _do_build(reply_path=rp)

    row = QHBoxLayout()
    close_btn = QPushButton("Close")
    close_btn.clicked.connect(d.reject)
    row.addWidget(close_btn)
    row.addStretch(1)
    file_btn = QPushButton("Load from file…")
    file_btn.clicked.connect(_load_file)
    row.addWidget(file_btn)
    build_btn = QPushButton("Build tag map")
    build_btn.setDefault(True)
    build_btn.clicked.connect(_build)
    row.addWidget(build_btn)
    lay.addLayout(row)

    d.exec()


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
            'See the <a href="https://cjre.pl/ogle/janki/load">quick tutorial &amp; format guide ↗</a> for '
            "an example."
        )
        body.setWordWrap(True)
        body.setOpenExternalLinks(True)
        body.setTextInteractionFlags(_Qt.TextInteractionFlag.TextBrowserInteraction)
        body.setMinimumWidth(420)
        lay.addWidget(body)

        row = QHBoxLayout()
        gen_btn = QPushButton("Generate from objectives…")
        gen_btn.setToolTip("Build a tag map from a course learning-objectives .docx "
                           "using your own AI session.")
        row.addWidget(gen_btn)
        row.addStretch(1)
        cancel_btn = QPushButton("Cancel")
        cancel_btn.clicked.connect(d.reject)
        row.addWidget(cancel_btn)
        choose_btn = QPushButton("Choose file…")
        choose_btn.setDefault(True)
        choose_btn.clicked.connect(d.accept)
        row.addWidget(choose_btn)
        lay.addLayout(row)

        # "2" == generate-from-LOs; "1"/accept == file picker; "0"/reject == cancel.
        gen_btn.clicked.connect(lambda: d.done(2))
        try:
            from ..user import glass as _glass
            _glass.keep_dialog_in_front(d)
        except Exception:
            pass
        result = d.exec()
        if result == 2:
            _generate_map_from_los(day_offset)
        elif result:
            _pick_tag_map_file(day_offset)
    except Exception as e:
        _log("tag-map prompt failed: %s" % e)
    finally:
        _import_dlg_open = False


def _lec_sfx(name):
    try:
        from ..features import sfx as _sfx
        _sfx.play(name)
    except Exception:
        pass


def _make_switch_class():
    """A slide switch (pill + knob that glides) that is still a QCheckBox, so every
    existing isChecked / toggled / setChecked call keeps working."""
    from aqt.qt import (QCheckBox, QPainter, QColor, QRectF, QPropertyAnimation,
                        QEasingCurve, pyqtProperty, Qt as _Q, QSize)

    class Switch(QCheckBox):
        def __init__(self, text=""):
            super().__init__(text)
            self._jk_self_painted = True     # glass painter: don't draw a box over us
            self._pos = 0.0
            self.setCursor(_Q.CursorShape.PointingHandCursor)
            self._an = QPropertyAnimation(self, b"knob", self)
            self._an.setDuration(160)
            self._an.setEasingCurve(QEasingCurve.Type.OutCubic)
            self.toggled.connect(self._slide)

        def _get(self):
            return self._pos

        def _set(self, v):
            self._pos = float(v)
            self.update()
        knob = pyqtProperty(float, _get, _set)

        def _slide(self, on):
            self._an.stop()
            self._an.setStartValue(self._pos)
            self._an.setEndValue(1.0 if on else 0.0)
            self._an.start()

        def setChecked(self, on):
            super().setChecked(on)
            self._an.stop()
            self._pos = 1.0 if on else 0.0
            self.update()

        def sizeHint(self):
            fm = self.fontMetrics()
            return QSize(40 + 8 + fm.horizontalAdvance(self.text()) + 4,
                         max(22, fm.height() + 6))

        def hitButton(self, pos):
            return self.rect().contains(pos)

        def paintEvent(self, _ev):
            try:
                p = QPainter(self)
                p.setRenderHint(QPainter.RenderHint.Antialiasing)
                h = 20.0
                y = (self.height() - h) / 2.0
                track = QRectF(1, y, 38, h)
                off, on = QColor(255, 255, 255, 45), QColor(156, 188, 243, 230)
                t = self._pos
                col = QColor(int(off.red() + (on.red() - off.red()) * t),
                             int(off.green() + (on.green() - off.green()) * t),
                             int(off.blue() + (on.blue() - off.blue()) * t),
                             int(off.alpha() + (on.alpha() - off.alpha()) * t))
                p.setPen(_Q.PenStyle.NoPen)
                p.setBrush(col)
                p.drawRoundedRect(track, h / 2, h / 2)
                d = h - 4
                x = track.x() + 2 + (track.width() - d - 4) * t
                p.setBrush(QColor(255, 255, 255))
                p.drawEllipse(QRectF(x, y + 2, d, d))
                p.setPen(self.palette().color(self.foregroundRole()))
                p.drawText(QRectF(46, 0, self.width() - 46, self.height()),
                           int(_Q.AlignmentFlag.AlignVCenter | _Q.AlignmentFlag.AlignLeft),
                           self.text())
                p.end()
            except Exception:
                pass
    return Switch


class _SwitchProxy:
    _cls = None

    def __call__(self, *a, **k):
        if _SwitchProxy._cls is None:
            _SwitchProxy._cls = _make_switch_class()
        return _SwitchProxy._cls(*a, **k)


_Switch = _SwitchProxy()


_LAST_RESET = {"t": 0.0, "ics_mtime": None}
_CACHE_TTL = 600     # s


def _maybe_reset_caches(ics_path):
    """Opening the wizard used to drop the calendar cache AND rebuild the AnKing tag
    index (a scan of every tag in the collection) on every open — slow, especially
    when reopened soon after (e.g. the tour). Refresh only when it's been a while, or
    the local calendar file changed."""
    import time
    now = time.monotonic()
    mt = None
    try:
        if ics_path and not _is_url(ics_path):
            mt = os.path.getmtime(_p(ics_path))
    except Exception:
        pass
    stale = (now - _LAST_RESET["t"] > _CACHE_TTL) or (mt != _LAST_RESET["ics_mtime"])
    if stale:
        _ics_reset()
        _LAST_RESET["t"] = now
        _LAST_RESET["ics_mtime"] = mt
    # The AnKing tag index (tens of thousands of tags) is rebuilt only when the
    # collection's tags actually changed — not on a timer: a rebuild also throws away
    # every lecture match, so all of that matching was being redone every 10 minutes.
    try:
        sig = mw.col.db.scalar("select count() from tags")
    except Exception:
        sig = None
    if sig != _LAST_RESET.get("tag_sig"):
        if _LAST_RESET.get("tag_sig") is not None:
            _ak_index_reset()
        _LAST_RESET["tag_sig"] = sig


def _source_icon(kind):
    """Small hand-drawn icon (calendar / spreadsheet grid) in the window text colour."""
    from aqt.qt import QPixmap, QPainter, QPen, QColor, QIcon, QRectF, Qt as _Q
    pm = QPixmap(36, 36)
    pm.fill(_Q.GlobalColor.transparent)
    p = QPainter(pm)
    p.setRenderHint(QPainter.RenderHint.Antialiasing)
    pen = QPen(QColor(230, 232, 238), 2.6)
    pen.setCapStyle(_Q.PenCapStyle.RoundCap)
    p.setPen(pen)
    p.setBrush(_Q.BrushStyle.NoBrush)
    if kind == "ics":
        p.drawRoundedRect(QRectF(5, 8, 26, 23), 4, 4)
        p.drawLine(5, 15, 31, 15)
        p.drawLine(12, 4, 12, 10)
        p.drawLine(24, 4, 24, 10)
        dot = QPen(QColor(230, 232, 238), 3.2)
        dot.setCapStyle(_Q.PenCapStyle.RoundCap)
        p.setPen(dot)
        for x in (12, 18, 24):
            p.drawPoint(x, 22)
    else:
        p.drawRoundedRect(QRectF(5, 6, 26, 24), 3, 3)
        p.drawLine(5, 14, 31, 14)
        p.drawLine(5, 22, 31, 22)
        p.drawLine(14, 6, 14, 30)
    p.end()
    return QIcon(pm)


def _edit_source(kind, parent, on_saved):
    """One text box for the calendar (.ics file or URL) or the main .xlsx map, with
    Browse… — Save writes it and reloads the wizard."""
    from aqt.qt import (QDialog, QVBoxLayout, QHBoxLayout, QLabel, QLineEdit,
                        QPushButton, QFileDialog)
    key = "ics_path" if kind == "ics" else "xlsx_path"
    d = QDialog(parent)
    d.setWindowTitle("Calendar location" if kind == "ics" else "Lecture map location")
    lay = QVBoxLayout(d)
    lay.addWidget(QLabel("Calendar (.ics file or calendar URL):" if kind == "ics"
                         else "Main lecture → tag map (.xlsx):"))
    row = QHBoxLayout()
    edit = QLineEdit(str(_cfg().get(key, "") or ""))
    edit.setMinimumWidth(420)
    browse = QPushButton("Browse…")
    row.addWidget(edit, 1)
    row.addWidget(browse)
    lay.addLayout(row)

    def _browse():
        filt = "Calendar (*.ics)" if kind == "ics" else "Spreadsheet (*.xlsx)"
        fn, _ = QFileDialog.getOpenFileName(d, d.windowTitle(), "", filt)
        if fn:
            edit.setText(fn)
    browse.clicked.connect(_browse)
    btns = QHBoxLayout()
    btns.addStretch(1)
    cancel = QPushButton("Cancel")
    save = QPushButton("Save")
    save.setDefault(True)
    btns.addWidget(cancel)
    btns.addWidget(save)
    lay.addLayout(btns)
    cancel.clicked.connect(d.reject)

    def _save():
        c = mw.addonManager.getConfig(__name__) or {}
        c[key] = edit.text().strip()
        mw.addonManager.writeConfig(__name__, c)
        _ics_reset()
        _MAP_CACHE["key"] = None
        _EV_CACHE["key"] = None
        d.accept()
        on_saved()
    save.clicked.connect(_save)
    edit.returnPressed.connect(_save)
    try:
        from ..user import css as _css
        _css.apply_widget_ui_font(d)
    except Exception:
        pass
    d.exec()


def _open_today_dialog(day_offset=0, auto=False):
    from aqt.qt import (
        QDialog, QVBoxLayout, QHBoxLayout, QLabel, QTableWidget, QTableWidgetItem,
        QComboBox, QPushButton, QHeaderView, QAbstractItemView, Qt as _Qt,
        QStandardItemModel, QStandardItem, QCheckBox, QProgressBar,
        QPropertyAnimation, QEasingCurve, QToolButton,
    )
    if not auto:
        _lec_sfx("lectures")                 # the wizard opening (not the auto-run)
    cfg = _cfg()
    families = _enabled_families(cfg)
    cutoff = float(cfg.get("fuzzy_cutoff", 0.72))
    ics_path = cfg["ics_path"]
    # No calendar configured → manual mode: list every lecture in the tag map and
    # let the user pick which to unsuspend (no day navigation, no fuzzy matching).
    no_cal = not (ics_path or "").strip()

    _maybe_reset_caches(ics_path)      # refresh calendar / tag index only when stale
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

    class _SimCombo(QComboBox):
        """Row dropdown that, the first time it's opened, re-orders its options by
        similarity to the row's calendar event (best match first; "— skip —" stays on
        top) instead of alphabetically. Built lazily on open, so a day with many events
        doesn't pay for sorting every row up front; the selection is kept."""

        def __init__(self, event_title):
            super().__init__()
            self._event = event_title or ""
            self._sorted = False

        def showPopup(self):
            if not getattr(self, "_glassed", False):
                self._glassed = True
                try:
                    from ..user import glass as _glass
                    _glass.glass_combo_popup(self)
                except Exception:
                    self.setMaxVisibleItems(10)
            if not self._sorted and self._event:
                self._sorted = True
                try:
                    cur = self.currentData()

                    def score(nk):
                        return _option_score(self._event, m[nk]["display"])
                    ranked = sorted(opts, key=lambda nk: (-score(nk), m[nk]["display"].lower()))
                    mdl = QStandardItemModel(self)
                    it = QStandardItem("— skip —"); it.setData(None, _UR); mdl.appendRow(it)
                    for nk in ranked:
                        it = QStandardItem(m[nk]["display"]); it.setData(nk, _UR)
                        mdl.appendRow(it)
                    self.blockSignals(True)
                    self.setModel(mdl)
                    i = self.findData(cur, _UR) if cur is not None else 0
                    self.setCurrentIndex(i if i >= 0 else 0)
                    self.blockSignals(False)
                except Exception as exc:
                    _log("lecture combo sort: %s" % exc)
            super().showPopup()

    dlg = QDialog(mw)
    dlg.setWindowTitle("Lectures")
    # Same look as Janki Settings: glass, Interface font, close-only titlebar with the
    # content extended under it (drag the empty background to move the window).
    try:
        from ..user import glass as _glass, css as _css
        _glass.glass_dialog(dlg)
        _css.apply_widget_ui_font(dlg)
    except Exception:
        pass
    dlg.resize(760, 460)
    v = QVBoxLayout(dlg)
    _expanded = bool(getattr(dlg, "_jk_expanded", False))
    if _expanded:                    # content sits up in the titlebar row
        _m = v.contentsMargins()
        v.setContentsMargins(_m.left(), 6, _m.right(), _m.bottom())

    # ── Day navigation (buttons repopulate in place; the window never closes) ────
    nav = QHBoxLayout()
    if _expanded:
        nav.addSpacing(58)           # clear the close button in the top-left corner
    btn_prev = QPushButton("◀ Prev day")
    btn_today = QPushButton("Today")
    btn_next = QPushButton("Next day ▶")
    day_hdr = QLabel("")
    nav.addWidget(btn_prev); nav.addWidget(btn_today); nav.addWidget(btn_next)
    nav.addSpacing(12); nav.addWidget(day_hdr); nav.addStretch(1)
    # Top-right: quick edits for the two sources — the calendar (.ics file or URL) and
    # the main lecture → tag map (.xlsx). Saving reopens the wizard on the same day.
    for _kind, _tip in (("ics", "Calendar (.ics) location"), ("xlsx", "Lecture map (.xlsx) location")):
        _tb = QToolButton()
        _tb.setIcon(_source_icon(_kind))
        _tb.setToolTip(_tip)
        _tb.setAutoRaise(True)
        _tb.setFixedSize(30, 28)
        _tb.clicked.connect(lambda _c=False, k=_kind: _edit_source(
            k, dlg, lambda: (dlg.close(), QTimer.singleShot(
                120, lambda: _open_today_dialog(day_offset=st.get("offset", day_offset))))))
        nav.addWidget(_tb)
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
    warn_lbl.setCursor(_Qt.CursorShape.PointingHandCursor)
    warn_lbl.setToolTip("Click to show / hide the full list")

    def _warn_click(_ev, lbl=warn_lbl):
        lbl._jk_open = not getattr(lbl, "_jk_open", False)
        if hasattr(lbl, "_jk_full"):
            lbl.setText(lbl._jk_full if lbl._jk_open else lbl._jk_short)
    warn_lbl.mousePressEvent = _warn_click
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
            # One line by default; click it to expand the full list (and again to fold).
            warn_lbl._jk_full = (
                "⚠ %d #AK concept tag(s) had no exact match in this collection, "
                "so they're matched loosely by name (<code>tag:*concept*</code>) — "
                "double-check these unsuspend the right cards: %s%s  "
                "<span style='opacity:.7'>▾ hide</span>"
                % (len(ex), shown, more))
            warn_lbl._jk_short = ("⚠ %d #AK concept tag(s) matched loosely by name — "
                                  "<span style='opacity:.7'>show details ▸</span>" % len(ex))
            warn_lbl.setText(warn_lbl._jk_full if getattr(warn_lbl, "_jk_open", False)
                             else warn_lbl._jk_short)
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
        cb = _Switch(_FAM_SHORT_UI.get(suffix, label))
        cb.setChecked(False)          # every source starts off — switch on the ones you want
        src_cbs[suffix] = cb
        src_row.addWidget(cb)
    src_row.addStretch(1)
    if len(src_cbs) > 1:
        v.addLayout(src_row)
    elif len(src_cbs) == 1:
        next(iter(src_cbs.values())).setChecked(True)   # no choice to make
        # Only one source in the map → no choice to make, but show it read-only so
        # it's clear what's being pulled. (The hidden checkbox stays ticked, so
        # _selected_families() still returns it and the apply works.)
        only = next(iter(src_cbs))
        one_lbl = QLabel("Source: %s" % _FAM_SHORT_UI.get(only, only))
        one_lbl.setStyleSheet("color: gray;")
        v.addWidget(one_lbl)

    def _selected_families():
        """Suffixes whose source checkbox is ticked (defaults to all enabled)."""
        # Nothing ticked = nothing unsuspended (the counts show 0 until a source is
        # chosen).
        return {suf for suf, cb in src_cbs.items() if cb.isChecked()}

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
    # Jump to Janki Settings → Lectures (sources, tag map, behaviour).
    btn_settings = QPushButton("Options")
    btn_settings.setToolTip("Open Janki Settings on the Lectures tab")

    def _open_lecture_settings():
        # Close the wizard, then open Settings → Lectures (reopen the wizard afterwards
        # to pick up any changed sources).
        try:
            dlg.reject()
        except Exception:
            pass
        try:
            from ..system import settings_dialog
            settings_dialog._open_settings(section="lectures")
        except Exception:
            pass
    btn_settings.clicked.connect(_open_lecture_settings)
    # No Close button — the window's red X closes it (same as Settings).
    hb.addWidget(total_lbl); hb.addWidget(count_bar); hb.addStretch(1)
    hb.addWidget(btn_settings); hb.addWidget(btn_resusp); hb.addWidget(btn_unsusp)
    v.addLayout(hb)

    # Mutable per-day state (repopulated by _populate; read by _update_total/_apply).
    st = {"offset": None, "target": None, "events": [], "combos": [],
          "auto_keys": [], "has_day_state": False, "active_set": set(),
          "closed": False, "resolve": {}}
    dlg.finished.connect(lambda _r: (st.__setitem__("closed", True), _lec_sfx("close")))

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
        alias table, exact match, then fuzzy match — the same rules the rows use.
        Memoized per dialog: the fuzzy match (difflib over every lecture key) is the
        single most repeated cost — the same titles recur across the visible day,
        neighbour pre-warming (±2 days) and every re-populate — so caching it makes
        the biggest difference to the load screen on slow devices."""
        cache = st["resolve"]
        hit = cache.get(ev)
        if hit is not None:
            return hit
        nkey = _norm(ev)
        if nkey in aliases:
            nkey = _norm(aliases[nkey])
        if nkey in m:
            res = (nkey, False)
        else:
            mk = _fuzzy_match(ev, nkey, keys, m, cutoff)
            res = (mk, True) if mk else (None, False)
        cache[ev] = res
        return res

    # Tag searches per background query batch. A batch can't be interrupted, and one
    # search costs ~0.15–1.5 s on a big collection, so a Prev/Next click waits for the
    # batch already running before the new day is counted: keep it to ONE search
    # (24 made day switches stall ~5 s once the map held 300+ lectures).
    _COUNT_CHUNK = 1

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
        """Uncached fragments of the ±1 days (calendar mode) to pre-warm, so a
        single Prev/Next step is instant. Kept to ±1 (not ±2) to halve the trailing
        background count load on slow devices — the visible day is always counted
        first regardless (see _recount), so this only fills idle time after."""
        if no_cal:
            return []
        base = st.get("target")
        if not base:
            return []
        have = set(have)
        out = []
        for d in (-1, 1):
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
            # Neighbour pre-warming finishes a query every few ms; repainting the whole
            # table (and re-unioning every lecture's card sets) after each one lagged
            # the day buttons. Only repaint when the day on screen gained a count.
            if set(res) & (st.get("cur_needed") or set()):
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
        # (No neighbour pre-counting any more: those broad tag searches kept running
        # after the window closed and held the collection, so Anki looked stuck
        # "loading". Other days count when you move to them.)
        queue[:] = [x for x in new_queue if x in curset]

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
        if st.get("closed"):                     # a queued nav-debounce fired post-close
            return
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
            combo = _SimCombo(ev)                           # sorts by similarity on open
            combo.setModel(combo_model)                    # shared model — cheap
            combo.setMaxVisibleItems(10)                   # glass popup styled on open
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

    # Debounced day navigation. Each click only updates the INTENDED offset + the
    # header, and (re)arms a short timer; the heavy _populate (rebuilds the table,
    # recreates every combo, spawns count queries) runs once, for the final day,
    # after the burst settles. Rapid seeking used to fire a full rebuild per click,
    # and the pile-up of widget teardown/deleteLater crashed slower devices.
    _nav_timer = QTimer(dlg)
    _nav_timer.setSingleShot(True)
    _nav_timer.setInterval(150)
    _nav_timer.timeout.connect(lambda: _populate(st.get("offset", 0)))

    def _goto(new_offset):
        st["offset"] = new_offset                # accumulates across a click burst
        if not no_cal:                           # cheap immediate feedback
            _tgt = _today() + datetime.timedelta(days=new_offset)
            day_hdr.setText("<b>%s — %s</b>"
                            % (_day_label(new_offset), _tgt.strftime("%a %b %d, %Y")))
        btn_today.setEnabled(new_offset != 0)
        _nav_timer.start()                       # restart → coalesce the burst

    btn_prev.clicked.connect(lambda: _goto(st.get("offset", 0) - 1))
    btn_next.clicked.connect(lambda: _goto(st.get("offset", 0) + 1))
    btn_today.clicked.connect(lambda: _goto(0))
    table.itemChanged.connect(lambda _it: _recount())
    for _cb in src_cbs.values():                   # toggling a source recounts live
        _cb.toggled.connect(lambda _c=False: _recount())

    # Loading a big day (AnKing can put ~2000 cards on one day) used to freeze Anki: two
    # find_cards per lecture, the unsuspend, and a full mw.reset() all ran on the main thread.
    # Now: ONE combined search in a background QueryOp, then the (un)suspend as a background
    # CollectionOp (undoable; Anki refreshes its own views from the op's changes, so no reset).
    def _busy(on, text=""):
        btn_unsusp.setEnabled(not on)
        btn_resusp.setEnabled(not on and _has_day_state(st["target"]))
        if on:
            state_lbl.setVisible(True)
            state_lbl.setText("<i>%s</i>" % text)

    def _finish_change(msg):
        frag_ids.clear()   # suspended state changed → cached id-sets are stale
        st["cgen"] = st.get("cgen", 0) + 1   # invalidate any in-flight count batch
        st["queue"] = []                     # rebuilt fresh by the next _recount
        tooltip("Janki Lectures — " + msg, period=4000)
        _populate(st["offset"])   # refresh counts/checks in place (dialog stays up)
        _busy(False)
        state_lbl.setVisible(True)
        state_lbl.setText("<b style='color:#3a3'>✓ %s.</b>" % msg)

    def _run_change(unsusp, susp, on_done):
        """(Un)suspend in one background CollectionOp, then on_done() on the main thread."""
        if not unsusp and not susp:
            on_done()
            return
        from aqt.operations import CollectionOp

        def op(col):
            ch = None
            if unsusp:
                ch = col.sched.unsuspend_cards(list(unsusp))
            if susp:
                ch = col.sched.suspend_cards(list(susp))
            return ch

        def failed(exc):
            _busy(False)
            _log("unsuspend op failed: %s" % exc)
            state_lbl.setText("<b style='color:#c33'>Couldn't change cards: %s</b>" % exc)

        CollectionOp(parent=dlg, op=op).success(lambda _c: on_done()).failure(failed).run_in_background()

    def _do_unsuspend():
        target = st["target"]
        events, combos, auto_keys = st["events"], st["combos"], st["auto_keys"]
        raw = _load_aliases_raw()
        changed = False
        searches_all = []        # every enabled fragment of every checked lecture
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
            searches_all.extend(s for s in searches if s not in searches_all)
            active_lectures.append(m[nk]["display"])
            if nk != auto_keys[r]:
                raw[ev] = m[nk]["display"]
                changed = True

        from aqt.operations import QueryOp
        joined = " OR ".join("(%s)" % s for s in searches_all)

        prev_ids_now, _pl = _load_day_active(target)
        cached = all(s in frag_ids for s in searches_all)
        if cached and not prev_ids_now:
            # Everything's already counted and nothing to re-suspend: no search needed.
            to_u = set()
            for s_ in searches_all:
                to_u |= frag_ids[s_]
            found_now = (to_u, set(to_u))
        else:
            found_now = None

        def find(col):
            if not joined:
                return set(), set()
            try:
                return (find_ids(col, searches_all, "is:suspended"),   # → unsuspend
                        find_ids(col, searches_all))                   # all (re-suspend calc)
            except Exception as e:
                _log("find_cards failed: %s" % e)
                return set(), set()

        def found(res):
            to_unsusp, checked_cards = res
            prev_ids, _prev_lecs = _load_day_active(target)
            resuspend = prev_ids - checked_cards - _owned_except(target)
            if resuspend:
                if QMessageBox.question(
                        dlg, "Janki Lectures",
                        "Re-suspend %d card(s) from lecture(s) you removed?"
                        % len(resuspend)) != QMessageBox.StandardButton.Yes:
                    _busy(False); state_lbl.setVisible(False)
                    return
            if len(to_unsusp) > 200:
                if QMessageBox.question(
                        dlg, "Janki Lectures",
                        "This will unsuspend %d cards — that's a lot for one day.\n\n"
                        "Continue?" % len(to_unsusp)) != QMessageBox.StandardButton.Yes:
                    _busy(False); state_lbl.setVisible(False)
                    return
            if changed:
                _save_aliases(raw)
            _busy(True, "Unsuspending %d card(s)…" % len(to_unsusp))

            def applied():
                _save_day_active((prev_ids - resuspend) | to_unsusp, active_lectures, target)
                msg = ("Loaded %s: +%d card(s) unsuspended"
                       % (_day_label(st["offset"]), len(to_unsusp)))
                if resuspend:
                    msg += ", −%d re-suspended" % len(resuspend)
                _finish_change(msg)

            _run_change(to_unsusp, resuspend, applied)

        if found_now is not None:
            found(found_now)
            return
        _busy(True, "Finding cards…")
        QueryOp(parent=dlg, op=find, success=found).run_in_background()

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
        _busy(True, "Re-suspending %d card(s)…" % len(resuspend))

        def applied():
            _save_day_active(set(), [], target)   # day now owns nothing (entry dropped)
            _finish_change("Re-suspended %s: −%d card(s)" % (_day_label(st["offset"]), len(resuspend)))

        _run_change(set(), resuspend, applied)

    btn_unsusp.clicked.connect(_do_unsuspend)
    btn_resusp.clicked.connect(_do_resuspend)

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
    # "Always in front" puts WindowStaysOnTopHint on the MAIN window, which would
    # otherwise float ABOVE this child dialog (so the loader opens hidden behind
    # Anki on launch). Match the flag so the loader stays above the also-on-top
    # main window.
    if _cfg().get("always_on_top", False):
        dlg.setWindowFlag(Qt.WindowType.WindowStaysOnTopHint, True)
    global _lectures_dlg
    _lectures_dlg = dlg
    try:
        from ..user import glass as _glass
        dlg.setWindowOpacity(0.0)                # fade in (no sudden pop)
        _glass.bring_dialog_to_front(dlg)
        _glass.hide_titlebar_extras(dlg)
        try:
            _glass._fade_window(dlg, 0.0, 1.0, 220, drop=10)
        except Exception:
            dlg.setWindowOpacity(1.0)
        # Re-assert once the opening click / main-window activation has settled, so the
        # main window can't end up on top of it.
        QTimer.singleShot(150, lambda: (_glass.bring_dialog_to_front(dlg)
                                        if dlg.isVisible() else None))
    except Exception:
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

    g.addWidget(QLabel("<b>Tag map</b> — base spreadsheet (.xlsx), plus optional .txt/.json layers"), 0, 0, 1, 3)
    xlsx_edit = QLineEdit(cfg.get("xlsx_path", ""))
    xlsx_edit.setPlaceholderText("~/Downloads/lectures.xlsx  (base spreadsheet)")
    xlsx_btn = QPushButton("Browse…")

    def _pick_xlsx():
        # Base file is spreadsheet-only; .txt/.json go in the complementary list
        # below (they still resolve on their own when no base is set).
        fn, _f = QFileDialog.getOpenFileName(
            src, "Choose base spreadsheet", os.path.dirname(_p(xlsx_edit.text())) or "",
            "Spreadsheet (*.xlsx *.xlsm);;All files (*)")
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
            src, "Choose tag map file(s)", os.path.dirname(_p(xlsx_edit.text())) or "",
            "Tag maps (*.xlsx *.xlsm *.txt *.json);;All files (*)")
        # A spreadsheet is the base map (one slot); .txt/.json files layer on top.
        sheets = [f for f in fns if f.lower().endswith((".xlsx", ".xlsm"))]
        if sheets:
            xlsx_edit.setText(sheets[-1])
        fns = [f for f in fns if not f.lower().endswith((".xlsx", ".xlsm"))]
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

    # Build a tag map from a course learning-objectives .docx via a one-time AI
    # round-trip (prompt to clipboard → paste → load the JSON reply). On success
    # it writes a .json map and points the Base file at it.
    gen_btn = QPushButton("Generate tag map from objectives (.docx)…")
    gen_btn.setStyleSheet(
        "QPushButton{background-color:#55585e;color:white;border:none;"
        "padding:5px 12px;border-radius:5px;}"
        "QPushButton:hover{background-color:#61646b;}")
    gen_btn.setToolTip("Parse a learning-objectives .docx and build a lecture → "
                       "tag map with your own AI session. Fills in the Base file "
                       "above.")
    def _add_generated_map(p):
        # Add the produced map into the .txt/.json list (merged on top of the base),
        # de-duped. The pane's _save() persists txt_paths on close.
        existing = {txt_list.item(i).text() for i in range(txt_list.count())}
        if p and p not in existing:
            txt_list.addItem(p)

    gen_btn.clicked.connect(lambda: _generate_map_from_los(
        parent=src, on_map_ready=_add_generated_map, open_after=False))
    g.addWidget(gen_btn, 3, 1, 1, 2)

    g.addWidget(QLabel("<b>Calendar</b> (.ics — local file or http(s) URL)"), 4, 0, 1, 3)
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
    g.addWidget(QLabel("File/URL:"), 5, 0)
    g.addWidget(ics_edit, 5, 1)
    g.addWidget(ics_btn, 5, 2)

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
    g.addWidget(ics_note, 6, 1, 1, 2)

    # Jump straight to the unsuspend window to add/remove today's lectures.
    today_btn = QPushButton("Open today's lecture window…")
    today_btn.setStyleSheet(
        "QPushButton{background-color:#55585e;color:white;border:none;"
        "padding:5px 12px;border-radius:5px;}"
        "QPushButton:hover{background-color:#61646b;}")
    today_btn.clicked.connect(lambda: _open_today_dialog())
    g.addWidget(today_btn, 7, 1, 1, 2)

    # Link to the step-by-step tutorial on GitHub (tag-map format, calendar,
    # manual mode, settings). blob/HEAD resolves to the repo's default branch.
    help_lbl = QLabel(
        '<a href="https://cjre.pl/ogle/janki/load">How to use this — tutorial &amp; tag-map format ↗</a>')
    help_lbl.setOpenExternalLinks(True)
    help_lbl.setStyleSheet("color: palette(mid);")
    g.addWidget(help_lbl, 8, 1, 1, 2)
    g.setRowStretch(9, 1)

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

    ak_warn = QLabel("⚠ AnKing auto-load is on. AnKing's tag map is huge, so loading it "
                     "every launch can take minutes and slow your whole computer. "
                     "Consider leaving AnKing off here and loading it by hand.")
    ak_warn.setWordWrap(True)
    ak_warn.setStyleSheet("color:#ff9d8a;")
    bg.addWidget(ak_warn, row, 0, 1, 2)
    row += 1

    def _ak_warn_update(*_a):
        ak = fam_cbs.get("ak")
        ak_warn.setVisible(bool(auto_cb.isChecked() and ak is not None and ak.isChecked()))
    auto_cb.toggled.connect(_ak_warn_update)
    if "ak" in fam_cbs:
        fam_cbs["ak"].toggled.connect(_ak_warn_update)
    _ak_warn_update()

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

    return [("Sources", src), ("Behavior", beh)], _save


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
            # Already open → just bring it forward (no second window).
            if _lectures_dlg is not None:
                try:
                    if _lectures_dlg.isVisible():
                        from ..user import glass as _glass
                        _glass.bring_dialog_to_front(_lectures_dlg)
                        return
                except Exception:
                    pass
            # A click while the window is still being built → ignore (it's coming).
            global _opening
            if _opening:
                return
            _opening = True
            try:
                import time as _time
                _t = _time.perf_counter()
                _open_today_dialog(auto=auto)
                _log("open lectures window: %.0f ms" % ((_time.perf_counter() - _t) * 1000))
            finally:
                _opening = False
            return
        # Non-interactive (auto-on-launch): only the calendar drives auto-matching.
        # With no calendar there's nothing to align, so never mass-unsuspend.
        if not (_cfg().get("ics_path") or "").strip():
            return
        # Silently unsuspend auto-matches.
        # Search + unsuspend off the main thread (big days froze Anki; see _do_unsuspend).
        matched, _unmatched = match_today(_enabled_families())
        searches = [q for _cal, _res, ss, _fz in matched for q in ss]
        if not searches:
            tooltip("Janki Lectures: unsuspended 0 cards for today.")
            return
        from aqt.operations import CollectionOp
        joined = " OR ".join("(%s)" % q for q in searches)
        box = {}

        def op(col):
            ids = list(find_ids(col, searches, "is:suspended"))
            box["n"] = len(ids)
            return col.sched.unsuspend_cards(ids)

        CollectionOp(parent=mw, op=op).success(
            lambda _c: (_lec_sfx("loaded"),
                        tooltip("Janki Lectures: unsuspended %d cards for today." % box.get("n", 0)))
        ).run_in_background()
    except Exception as e:
        _log("run_today error: %s\n%s" % (e, traceback.format_exc()))
        if interactive:
            showInfo("Janki Lectures hit an error:\n\n%s\n\nSee %s" % (e, LOG_PATH), title="Janki Lectures")


# --------------------------------------------------------------- wiring --------

def _install_menu():
    act = QAction("Load today's lectures", mw)
    act.triggered.connect(lambda: run_today(interactive=True))
    mw.form.menuTools.addAction(act)


def _warm_map():
    """Pre-build the lecture-map cache off the critical path so the first "Load
    today's lectures" open is instant instead of a cold build (parsing the
    spreadsheet + resolving ~1k AnKing leaves is the slow part, and it's cached
    afterwards). No-op if a map is already cached or nothing is configured."""
    try:
        if _paths_ready():
            _get_map(_enabled_families())
    except Exception as e:
        _log("map warm: %s" % e)


def _on_profile_open():
    # Warm the map in the background a few seconds after launch, regardless of the
    # auto-open setting, so a later manual open is snappy on slow devices. Cached,
    # so it's a no-op if auto-open below already built it.
    if _paths_ready():
        QTimer.singleShot(4000, _warm_map)
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
    if _cfg().get("unsuspend_ak", "ak" in _DEFAULT_ON):
        try:
            from aqt.utils import tooltip
            tooltip("Auto-loading today's lectures with AnKing on — this can be slow. "
                    "Settings → Lectures to turn AnKing off.", period=7000)
        except Exception:
            pass
    _save_state(st)
    QTimer.singleShot(1500, lambda: run_today(interactive=True, auto=True))


gui_hooks.main_window_did_init.append(_install_menu)
gui_hooks.profile_did_open.append(_on_profile_open)


# ------------------------------------------------- calendar-view helpers --------
# Used by the Calendar page (features/calendar_view.py). Same sources, same matching
# rules as the Load Lectures wizard, but with event TIMES and a plain function API.

def _ics_dt(val, tzid):
    """An ICS DTSTART/DTEND value → (date, minutes-from-midnight or None) in LOCAL
    time. UTC ('…Z') is converted; TZID / floating times are taken as wall time."""
    m = re.match(r"(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})?(Z)?)?", val or "")
    if not m:
        return None, None
    y, mo, d = int(m.group(1)), int(m.group(2)), int(m.group(3))
    if not m.group(4):
        return datetime.date(y, mo, d), None                    # all-day
    hh, mm = int(m.group(4)), int(m.group(5))
    dt = datetime.datetime(y, mo, d, hh, mm)
    if m.group(7):                                              # UTC → local
        dt = dt.replace(tzinfo=datetime.timezone.utc).astimezone().replace(tzinfo=None)
    return dt.date(), dt.hour * 60 + dt.minute


def _parse_ics_events(path):
    """[{date, start, end, summary, location}] for every VEVENT (times in local
    minutes, None for all-day)."""
    try:
        raw = _read_source_text(path)
    except Exception as e:
        _log("ics read failed: %s" % e)
        return []
    raw = re.sub(r"\r?\n[ \t]", "", raw)
    out, moved = [], set()
    for block in raw.split("BEGIN:VEVENT")[1:]:
        block = block.split("END:VEVENT")[0]

        def field(name):
            mm = re.search(r"(?m)^%s((?:;[^:\r\n]*)?):(.*)$" % name, block)
            if not mm:
                return None, None
            params = mm.group(1) or ""
            tz = re.search(r"TZID=([^;:]+)", params)
            return mm.group(2).strip(), (tz.group(1) if tz else None)
        summ, _ = field("SUMMARY")
        st, stz = field("DTSTART")
        en, etz = field("DTEND")
        loc, _ = field("LOCATION")
        desc, _ = field("DESCRIPTION")
        cats, _ = field("CATEGORIES")
        rrule, _ = field("RRULE")
        url_f, _ = field("URL")
        uid, _ = field("UID")
        rid, ridtz = field("RECURRENCE-ID")
        if not (summ and st):
            continue
        d, smin = _ics_dt(st, stz)
        if d is None:
            continue
        ed, emin = _ics_dt(en, etz) if en else (d, None)
        if smin is not None and (emin is None or ed != d):
            emin = smin + 60 if emin is None else 24 * 60           # clamp to the day
        def unesc(t):
            # feeds sometimes HTML-escape titles ("P&amp;S") — show them plainly
            return html.unescape((t or "").replace("\\,", ",").replace("\\;", ";")
                                 .replace("\\n", " ")).strip()
        blob = " ".join(unesc(x) for x in (summ, desc, cats)).lower()
        mand = bool(re.search(r"\bmandatory\b|\brequired\b|attendance required", blob))
        base = {"start": smin, "end": emin, "summary": unesc(summ),
                "location": unesc(loc), "mandatory": mand}
        # the event's page in the LMS: the URL field, else "Link to event: https://…"
        # (or the first link) in its notes
        # un-escape first: ICS escapes "," ";" with a backslash and feeds HTML-escape
        # "&" as "&amp;" — either way the link came out broken (a blank page)
        plain = html.unescape((desc or "").replace("\\n", " ").replace("\\N", " ")
                              .replace("\\,", ",").replace("\\;", ";")
                              .replace("\\\\", "\\"))
        lm = (re.search(r"link to event\s*:?\s*(https?://[^\s<>\"']+)", plain, re.I)
              or re.search(r"(https?://[^\s<>\"']+)", plain))
        link = html.unescape((url_f or "").replace("\\,", ",").replace("\\;", ";")).strip() \
            or (lm.group(1) if lm else "")
        if link.startswith(("http://", "https://")):
            base["url"] = link.rstrip(".,;)")
        # "Dress Code: …" written in a class's notes → that day's dress code
        dm = re.search(r"dress\s*-?\s*code\s*[:\-–]\s*(.+?)(?:\\n|\\N|\n|$)", desc or "", re.I)
        if dm:
            val = unesc(dm.group(1))
            # notes often run on: "(CONFLICT)", "Link to event: https://…"
            val = re.split(r"\(\s*conflict\s*\)|\blink to event\b|https?://|\s{3,}", val,
                           flags=re.I)[0]
            val = val.strip(" .;,:-–")
            if val.count(")") > val.count("("):        # a stray closing bracket
                val = val.replace(")", "", val.count(")") - val.count("("))
            val = val.strip(" .;,:-–")
            if val:
                base["dress"] = val[:80]
        if rid:                                   # one moved/edited occurrence
            moved.add((uid, _ics_dt(rid, ridtz)[0]))
        # an all-day item spanning several days (an assignment window; DTEND is
        # exclusive) shows only on its last day — the due date
        lag = (ed - d).days - 1 if (smin is None and ed and ed > d) else 0
        days = [d + datetime.timedelta(days=lag)]
        if rrule and not rid:
            ex = set()
            for exv in re.findall(r"(?m)^EXDATE(?:;[^:\r\n]*)?:(.*)$", block):
                for v in exv.split(","):
                    ex.add(_ics_dt(v.strip(), None)[0])
            days = [x + datetime.timedelta(days=lag) for x in _expand_rrule(d, rrule)
                    if x not in ex]
            for x in days:
                out.append(dict(base, date=x, _uid=uid, _rec=True))
            continue
        for x in days:
            out.append(dict(base, date=x, _uid=uid))
    # an edited occurrence replaces the generated one for that day
    out = [e for e in out if not (e.get("_rec") and (e.get("_uid"), e["date"]) in moved)]
    # one all-day "Dress code: …" notice per day, from the classes' notes
    seen = set()
    for e in list(out):
        if e.get("dress") and (e["date"], e["dress"].lower()) not in seen:
            seen.add((e["date"], e["dress"].lower()))
            out.append({"date": e["date"], "start": None, "end": None,
                        "summary": "Dress code: " + e["dress"], "location": "",
                        "mandatory": False, "_dress": True})
    return out


_WD = {"MO": 0, "TU": 1, "WE": 2, "TH": 3, "FR": 4, "SA": 5, "SU": 6}


def _expand_rrule(d0, rule):
    """Dates of a DAILY/WEEKLY repeating event (INTERVAL, BYDAY, UNTIL, COUNT), capped at
    ~2 years. Other frequencies fall back to the first date."""
    r = dict(kv.split("=", 1) for kv in rule.split(";") if "=" in kv)
    freq = r.get("FREQ", "")
    step = max(1, int(r.get("INTERVAL", "1") or 1))
    until = _ics_dt(r["UNTIL"], None)[0] if "UNTIL" in r else None
    count = int(r["COUNT"]) if r.get("COUNT", "").isdigit() else None
    stop = d0 + datetime.timedelta(days=730)
    if until:
        stop = min(stop, until)
    starts = []
    if freq == "DAILY":
        x = d0
        while x <= stop and (count is None or len(starts) < count):
            starts.append(x); x += datetime.timedelta(days=step)
    elif freq == "WEEKLY":
        wds = sorted(_WD[w[-2:]] for w in r.get("BYDAY", "").split(",") if w[-2:] in _WD) \
            or [d0.weekday()]
        wk = d0 - datetime.timedelta(days=d0.weekday())
        while wk <= stop and (count is None or len(starts) < count):
            for wd in wds:
                x = wk + datetime.timedelta(days=wd)
                if d0 <= x <= stop and (count is None or len(starts) < count):
                    starts.append(x)
            wk += datetime.timedelta(weeks=step)
    else:
        starts = [d0]
    return starts


_EV_CACHE = {"key": None, "events": []}


def events_between(d0, d1):
    """Calendar events with d0 <= date <= d1, sorted by date/time (cached like the
    wizard's day index)."""
    path = _cfg().get("ics_path", "")
    if not path:
        return []
    key = ("url", path) if _is_url(path) else (path, _src_mtime(path))
    if _EV_CACHE["key"] != key:
        _EV_CACHE["events"] = _parse_ics_events(path)
        _EV_CACHE["key"] = key
    evs = [e for e in _EV_CACHE["events"] if d0 <= e["date"] <= d1]
    return sorted(evs, key=lambda e: (e["date"], e["start"] if e["start"] is not None else -1))


def _ev_key():
    path = _cfg().get("ics_path", "")
    if not path:
        return None, None
    return path, (("url", path) if _is_url(path) else (path, _src_mtime(path)))


def events_cached_between(d0, d1):
    """Like events_between but never reads the calendar on the caller's thread:
    (events, fresh). Not fresh = the last-known events (maybe none) while a background
    load_events_bg() brings them up to date."""
    path, key = _ev_key()
    if not path:
        return [], True
    evs = [e for e in _EV_CACHE["events"] if d0 <= e["date"] <= d1]
    evs.sort(key=lambda e: (e["date"], e["start"] if e["start"] is not None else -1))
    return evs, _EV_CACHE["key"] == key


_EV_LOADING = {"on": False}
CLOSING = {"on": False}    # Anki is shutting down: start no more background work


def load_events_bg(done=None):
    """Parse (or download) the calendar off the main thread, then call done()."""
    path, key = _ev_key()
    if not path or _EV_CACHE["key"] == key or _EV_LOADING["on"] or CLOSING["on"]:
        return
    _EV_LOADING["on"] = True

    def work():
        try:
            evs = _parse_ics_events(path)
        except Exception as e:
            _log("calendar load: %s" % e)
            evs = None

        def back():
            _EV_LOADING["on"] = False
            if evs is not None:
                _EV_CACHE["events"], _EV_CACHE["key"] = evs, key
                if done:
                    try:
                        done()
                    except Exception:
                        pass
        mw.taskman.run_on_main(back)
    mw.taskman.run_in_background(work)


_MATCH_CACHE = {"key": None, "map": {}}


# Per-lecture tag opt-outs (calendar class page "−" on a tag chip): {lecture key: [tag]}.
# Applied to every match handed out, so counts / study / practice / weak areas skip them.
_EXCL = {"mt": None, "map": {}}


def _excl_path():
    return os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(
        os.path.abspath(__file__)))), "user_files", "lecture_excluded.json")


def _excl_map():
    p = _excl_path()
    mt = _src_mtime(p) if os.path.exists(p) else None
    if mt != _EXCL["mt"]:
        try:
            _EXCL["map"] = json.load(open(p)) if mt else {}
        except Exception:
            _EXCL["map"] = {}
        _EXCL["mt"] = mt
    return _EXCL["map"]


def set_excluded(key, tag, off):
    m = dict(_excl_map())
    cur = set(m.get(key) or [])
    (cur.add if off else cur.discard)(tag.lower())
    if cur:
        m[key] = sorted(cur)
    else:
        m.pop(key, None)
    try:
        with open(_excl_path(), "w") as f:
            json.dump(m, f, indent=1)
    except Exception as e:
        _log("excluded save: %s" % e)
    _EXCL["mt"] = None


def _atom_tag(a):
    mm = re.match(r'^"?tag:([^"\s]+)"?$', a.strip())
    return mm.group(1).strip("*").lower() if mm else None


def _with_exclusions(m):
    if not m or m is _PENDING:
        return m
    ex = set(_excl_map().get(m.get("key")) or [])
    out = dict(m, _raw_searches=m["searches"], excluded=sorted(ex))
    if not ex:
        return out
    kept = []
    for s in m["searches"]:
        atoms = _atoms([s])
        keep = [a for a in atoms if _atom_tag(a) not in ex]
        if len(keep) == len(atoms):
            kept.append(s)
        elif keep:
            kept.append("(" + " OR ".join(keep) + ")")
    out["searches"] = kept
    return out


def _match_event_raw(title):
    """The lecture a calendar title belongs to, by the wizard's rules (aliases →
    exact → fuzzy): {"key", "display", "searches", "fuzzy"} or None. Remembered per
    title until the tag map or aliases change (fuzzy matching is the slow part)."""
    try:
        akey = (_MAP_CACHE.get("key"), _src_mtime(_alias_path()))
        if _MATCH_CACHE["key"] != akey:
            _MATCH_CACHE["key"], _MATCH_CACHE["map"] = akey, {}
        if title in _MATCH_CACHE["map"]:
            return _MATCH_CACHE["map"][title]
        res = _match_event_uncached(title)
        _MATCH_CACHE["key"] = (_MAP_CACHE.get("key"), akey[1])   # map may have just loaded
        _MATCH_CACHE["map"][title] = res
        return res
    except Exception as e:
        _log("match_event: %s" % e)
        return None


_PENDING = object()


def _peek_match_raw(title):
    """Cached match for `title` without computing it: the match/None if known,
    _PENDING if it hasn't been matched yet (so a view can draw first, match later)."""
    try:
        akey = (_MAP_CACHE.get("key"), _src_mtime(_alias_path()))
        if _MATCH_CACHE["key"] != akey or _MAP_CACHE.get("key") is None:
            return _PENDING
        return _MATCH_CACHE["map"].get(title, _PENDING)
    except Exception:
        return _PENDING


def match_event(title):
    """The lecture a calendar title belongs to (cached), minus tags opted out."""
    return _with_exclusions(_match_event_raw(title))


def peek_match(title):
    return _with_exclusions(_peek_match_raw(title))


def _match_event_uncached(title):
    try:
        families = _enabled_families()
        m, keys, _opts = _get_map(families)
        if not m:
            return None
        cutoff = float(_cfg().get("fuzzy_cutoff", 0.72))
        aliases = _load_aliases()
        nkey = _norm(title)
        if nkey in aliases:
            nkey = _norm(aliases[nkey])
        fuzzy = False
        if nkey not in m:
            nkey = _fuzzy_match(title, nkey, keys, m, cutoff)
            fuzzy = True
        if not nkey or nkey not in m:
            return None
        return {"key": nkey, "display": m[nkey]["display"],
                "searches": list(m[nkey]["searches"]), "fuzzy": fuzzy}
    except Exception as e:
        _log("match_event: %s" % e)
        return None


FAMILY_LABEL = {"ak": "AnKing", "huc": "Hutch", "aj": "AJ"}


def family_of(frag):
    """Which source a lecture's search fragment belongs to (same rule as the wizard)."""
    if "AJ_UCCOM_keep" in frag:
        return "aj"
    if "hUtChCOM" in frag:
        return "huc"
    return "ak"


def lecture_options(title, limit=40):
    """[(display, …)] of tag-map lectures, best match for `title` first (for the
    calendar class page's lecture picker)."""
    try:
        m, _keys, opts = _get_map(_enabled_families())
        ranked = sorted(opts, key=lambda nk: (-_option_score(title, m[nk]["display"]),
                                              m[nk]["display"].lower()))
        return [m[nk]["display"] for nk in ranked[:limit]]
    except Exception as e:
        _log("lecture_options: %s" % e)
        return []


def set_alias(title, display):
    """Remember that calendar event `title` is lecture `display` (the same correction
    the wizard saves when you pick another lecture for a row)."""
    raw = _load_aliases_raw()
    raw[title] = display
    _save_aliases(raw)
    _MATCH_CACHE["key"] = None              # re-match with the new alias
