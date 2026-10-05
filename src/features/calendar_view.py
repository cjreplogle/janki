"""Calendar page: a weekly view of your imported calendar, built on the lecture tag map.

Shown in the main window the same way the Practice view is (the deck browser's page,
swapped for a week grid while `_view` is on), so it gets the same fade/drop
transitions, toolbar handling and keyboard focus.

  • each class is a block at its time; matched lectures are blue, fuzzy matches have an
    amber edge, unmatched events are grey
  • click a class → Study (a temporary filtered deck of that lecture's due + new
    cards; reviews count normally), Show tags, or open it in the Lecture wizard
  • ‹ / › / Today to change week

Only the user's own Janki reads their calendar, locally (lectures.events_between).
"""
import datetime
import html
import json

from aqt import gui_hooks, mw
from aqt.qt import QTimer

from ..util.config import log

_view = False          # Calendar page showing (consumed like practice._practice_view)
_week = 0              # weeks from this one
_shown = []            # events on the current render (index → event)
TEMP_PREFIX = "Janki Calendar::"


# --------------------------------------------------------------- open / close ----
def open_calendar():
    global _view
    QTimer.singleShot(700, _prewarm)           # neighbouring weeks, ready for arrows
    try:
        from . import practice, stats_embed
        practice._practice_view = False
        _view = True
        if stats_embed.is_open():
            stats_embed.close_soon(sound="page")
            _redraw()
        else:
            stats_embed.animate_next_deck_render()
            stats_embed.fade_then(_redraw, sound="page")
    except Exception as e:
        log("calendar open: %s" % e)
        _view = True
        _redraw()


def close():
    global _view, _detail
    _view = False
    _detail = None


def _redraw():
    try:
        if getattr(mw, "state", None) != "deckBrowser":
            mw.moveToState("deckBrowser")
        else:
            from . import stats_embed
            if not stats_embed.fast_deck_redraw():
                mw.deckBrowser.refresh()
    except Exception as e:
        log("calendar redraw: %s" % e)


def _mode():
    from ..util.config import _cfg
    m = str(_mode_override or _cfg().get("calendar_view", "week"))
    if m == "2":
        m = "3"                                   # (the old 2-day view is now 3 days)
    return m if m in ("week", "1", "3") else "week"


_mode_override = None   # the just-chosen view, until its config write lands


def _set_mode(m, direction="mode"):
    global _anchor, _mode_override
    try:
        from . import sfx
        sfx.play("select")
    except Exception:
        pass
    _mode_override = m
    _anchor = None
    _swap(direction)                    # draw first…

    def _save():                        # …then persist the choice
        global _mode_override
        try:
            c = mw.addonManager.getConfig(__name__) or {}
            c["calendar_view"] = m
            mw.addonManager.writeConfig(__name__, c)
        except Exception:
            pass
        _mode_override = None
    QTimer.singleShot(0, _save)

_anchor = None         # first day shown in Day / 2-Day view (None = today)


def _weekday_on_or_after(d):
    while d.weekday() >= 5:
        d += datetime.timedelta(days=1)
    return d


def _step_weekdays(d, n):
    """d moved n weekdays (skipping Sat/Sun); n may be negative."""
    step = 1 if n >= 0 else -1
    for _ in range(abs(n)):
        d += datetime.timedelta(days=step)
        while d.weekday() >= 5:
            d += datetime.timedelta(days=step)
    return d


def _days():
    """The dates on screen for the current view."""
    today = datetime.date.today()
    mode = _mode()
    if mode == "week":
        monday = today - datetime.timedelta(days=today.weekday()) + datetime.timedelta(weeks=_week)
        return [monday + datetime.timedelta(days=i) for i in range(5)]
    if mode == "3":                       # 3 Days: consecutive days, weekends included
        start = _anchor or today
        return [start + datetime.timedelta(days=i) for i in range(3)]
    start = _anchor or _weekday_on_or_after(today)
    return [start]


def _swap(direction):
    """Replace the days in the open page (no reload): the page's out-slide is already
    running; jkcSwap drops the new days in and slides them from the other side."""
    try:
        mw.web.eval("window.jkcSwap&&window.jkcSwap(%s,%s)"
                    % (json.dumps(_week_html()), json.dumps(direction)))
    except Exception as e:
        log("calendar swap: %s" % e)
        _redraw()


def _go_week(delta):
    global _week, _anchor
    if _mode() == "week":
        _week = 0 if delta is None else _week + delta
    else:
        if delta is None:
            _anchor = None
        elif _mode() == "3":
            _anchor = _days()[0] + datetime.timedelta(days=3 * delta)
        else:
            _anchor = _step_weekdays(_days()[0], delta)
    try:
        from . import sfx
        sfx.play("move")
    except Exception:
        pass
    _swap("today" if delta is None else ("next" if delta > 0 else "prev"))


# ------------------------------------------------------------------- render ------
_DAY = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]


def _hm(mins):
    h, m = divmod(int(mins), 60)
    ap = "am" if h < 12 else "pm"
    return "%d:%02d%s" % ((h % 12) or 12, m, ap)


_detail = None          # index into _shown of the class page that's open (or None)
_pick_opts = []         # the lecture picker's options on the open class page
_fams_on = set()        # source families switched on for that class


def _week_html():
    global _shown
    if _detail is not None and 0 <= _detail < len(_shown):
        return _detail_html(_shown[_detail])
    from ..integrations import lectures
    today = datetime.date.today()
    days = _days()                                      # weekdays only
    monday, sunday = days[0], days[-1]
    try:
        evs = lectures.events_between(monday, sunday)
    except Exception as e:
        log("calendar events: %s" % e)
        evs = []
    _shown = evs
    timed = [e for e in evs if e["start"] is not None and not _is_allday_kind(e["summary"])]
    lo = min([e["start"] for e in timed] + [8 * 60])
    hi = max([e["end"] for e in timed] + [17 * 60])
    lo = (lo // 60) * 60
    hi = -(-hi // 60) * 60
    span = max(60, hi - lo)
    px_per_min = 0.9
    grid_h = int(span * px_per_min)

    cols = []
    pending = False
    for d in days:
        blocks, allday = [], []
        for i, e in enumerate(evs):
            if e["date"] != d:
                continue
            m = lectures.peek_match(e["summary"])      # never match on the main thread
            if m is lectures._PENDING:
                pending = True
                m = None
                # colour comes from the title alone → show it at once; only events that
                # turn out unmatched go grey when matching finishes
                cls = "jkc-ev jkc-c%d" % _course_colour(e["summary"])
            else:
                cls = "jkc-ev" + (" jkc-un" if not m else (" jkc-fz" if m["fuzzy"] else ""))
            if m:                                          # one colour per course
                cls += " jkc-c%d" % _course_colour(e["summary"])
            title = html.escape(e["summary"])
            mbadge = "<span class='jkc-m' title='Mandatory'>M</span>" if e.get("mandatory") else ""
            sub = html.escape(m["display"]) if m and _norm(m["display"]) != _norm(e["summary"]) else ""
            tip = html.escape(e["summary"] + (("\n→ " + m["display"]) if m else "\n(no lecture match)"))
            if e["start"] is None or _is_allday_kind(e["summary"]):
                allday.append("<div class='%s jkc-ad' data-i='%d' title='%s'>%s%s</div>"
                              % (cls, i, tip, mbadge, title))
                continue
            top = int((e["start"] - lo) * px_per_min)
            h = max(22, int((e["end"] - e["start"]) * px_per_min) - 2)
            blocks.append(
                "<div class='%s' data-i='%d' title='%s' style='top:%dpx;height:%dpx'>"
                "%s<div class='jkc-t'>%s</div><div class='jkc-tm'>%s–%s</div>%s</div>"
                % (cls, i, tip, top, h, mbadge, title, _hm(e["start"]), _hm(e["end"]),
                   ("<div class='jkc-sub'>%s</div>" % sub) if sub else ""))
        cols.append(
            "<div class='jkc-col%s'><div class='jkc-dh'>%s <b>%d</b></div>"
            "<div class='jkc-ads'>%s</div><div class='jkc-body' style='height:%dpx'>%s</div></div>"
            % (" jkc-today" if d == today else "", _DAY[d.weekday()], d.day, "".join(allday),
               grid_h, "".join(blocks)))
    hours = "".join("<div class='jkc-hr' style='top:%dpx'><span>%s</span></div>"
                    % (int((t - lo) * px_per_min), _hm(t)) for t in range(lo, hi + 1, 60))
    if monday == sunday:
        label = "%s, %s %d, %d" % (_DAY[monday.weekday()], monday.strftime("%b"),
                                   monday.day, monday.year)
    else:
        label = "%s %d – %s %d, %d" % (monday.strftime("%b"), monday.day,
                                        sunday.strftime("%b"), sunday.day, sunday.year)
    mode = _mode()
    seg = "<span class='jkc-pill'></span>" + "".join(
        "<button class='jkc-seg%s' data-k='%s' onclick=\"jkcMode('%s')\">%s</button>"
        % (" on" if mode == k else "", k, k, l)
        for k, l in (("1", "Day"), ("3", "3-day"), ("week", "Week")))
    empty = ("" if evs else
             "<div class='jkc-empty'>No classes %s%s.</div>"
             % ("this week" if mode == "week" else "on these days",
                "" if lectures._cfg().get("ics_path") else
                " — import your calendar in lecture wizard (⌘L)"))
    # view switch left · ‹ Today date › centred · Lecture wizard right
    bar = ("<div class='jkc-bar'>"
           "<div class='jkc-l'><span class='jkc-segs'>%s</span></div>"
           "<div class='jkc-c'><button class='jkc-arr jkc-prev' onclick=\"jkcNav('prev')\">‹</button>"
           "<span class='jkc-lbl'>%s</span>"
           "<button class='jkc-arr jkc-next' onclick=\"jkcNav('next')\">›</button></div>"
           "<div class='jkc-r'><button onclick=\"jkcNav('today')\">Today</button> "
           "<button onclick=\"pycmd('janki:cal:loader')\">"
           "Lecture wizard…</button></div></div>" % (seg, label))
    grid = ("<div class='jkc-grid' style='--jkc-n:%d'><div class='jkc-hours' "
            "style='height:%dpx'>%s</div>%s</div>" % (len(days), grid_h, hours, "".join(cols)))
    global _pending_tries
    if pending and _pending_tries < 2:        # match in the background, then refresh
        _pending_tries += 1
        QTimer.singleShot(0, _prewarm)
    elif not pending:
        _pending_tries = 0
    return bar + empty + grid


def _page_html():
    return _CSS + "<div id='jkc'>" + _week_html() + "</div>" + _JS


# ------------------------------------------------------------- class page --------
def _lecture_query(m, fams):
    frags = [s for s in m["searches"] if _fam(s) in fams]
    return " OR ".join("(%s)" % s for s in frags) if frags else ""


def _fam(frag):
    from ..integrations import lectures
    return lectures.family_of(frag)


def _detail_html(e):
    """A deck-overview-style page for one class: title, when/where, card counts, the
    source switches, a big Study button and Unsuspend below it."""
    from ..integrations import lectures
    m = lectures.match_event(e["summary"])
    when = "%s, %s %d" % (_DAY[e["date"].weekday()], e["date"].strftime("%b"), e["date"].day)
    if e["start"] is not None:
        when += " · %s–%s" % (_hm(e["start"]), _hm(e["end"]))
    loc = ("<div class='jkd-loc'>%s</div>" % html.escape(e["location"])
           if e.get("location") else "")
    global _pick_opts
    sub = ""
    if m:
        # the matched lecture as a picker: closest alternatives first; choosing one
        # saves it as this class's match (same correction the wizard saves)
        _pick_opts = lectures.lecture_options(e["summary"])
        if m["display"] not in _pick_opts:
            _pick_opts.insert(0, m["display"])
        opts = "".join("<option%s>%s</option>" % (" selected" if o == m["display"] else "",
                                                  html.escape(o)) for o in _pick_opts)
        sub = ("<div class='jkd-sub'><select class='jkd-pick' title='Pick the lecture this "
               "class belongs to' onchange=\"pycmd('janki:cal:pick:'+this.selectedIndex)\">"
               "%s</select></div>" % opts)
    body = ""
    if not m:
        body = ("<div class='jkd-none'>No lecture in your tag map matches this class.<br>"
                "<button onclick=\"pycmd('janki:cal:det:wizard')\">Open the Lecture wizard…</button></div>")
    else:
        present = []
        for s in m["searches"]:
            f = _fam(s)
            if f not in present:
                present.append(f)
        sw = "".join(
            "<label class='jkd-sw%s' onclick=\"pycmd('janki:cal:fam:%s')\"><span class='jkd-knob'>"
            "</span>%s</label>" % (" on" if f in _fams_on else "", f, lectures.FAMILY_LABEL.get(f, f))
            for f in present)
        body = ("<div id='jkd-counts' class='jkd-counts'>Counting cards…</div>"
                "<div class='jkd-sws'>%s</div>"
                "<div class='jkd-studies'>"
                "<button id='jkd-st-act' class='jkd-study' onclick=\"pycmd('janki:cal:det:study:active')\">"
                "Study unsuspended cards</button>"
                "<button id='jkd-st-sus' class='jkd-study jkd-study2' onclick=\"pycmd('janki:cal:det:study:suspended')\">"
                "Study suspended cards</button></div>"
                "<div class='jkd-note'>Suspended cards are unsuspended just for the session "
                "and suspended again afterwards.</div>"
                "<button class='jkd-sec' onclick=\"pycmd('janki:cal:det:unsuspend')\">"
                "Unsuspend cards for this lecture</button>"
                "<div class='jkd-links'><a onclick=\"jkdTags(this)\">Show tags ▾</a> · "
                "<a onclick=\"pycmd('janki:cal:det:wizard')\">Open in lecture wizard</a></div>"
                "<div id='jkd-tags' class='jkd-tags'><div class='jkd-tags-in'>%s</div></div>"
                % (sw, _tags_html(m)))
        QTimer.singleShot(0, lambda m=m: _recount(m))
    return ("<div class='jkc-grid jkc-detail'>"
            "<button class='jkd-back' onclick=\"pycmd('janki:cal:det:back')\">‹ Back</button>"
            "<div class='jkd'><h2>%s%s</h2>%s<div class='jkd-when'>%s</div>%s%s</div></div>"
            % (html.escape(e["summary"]),
               " <span class='jkc-m jkd-m' title='Mandatory'>M</span>" if e.get("mandatory") else "",
               sub, html.escape(when), loc, body))


def _tag_label(frag):
    """Readable label for a tag search: the tag path, last segments emphasised."""
    import re
    tags = re.findall(r'tag:"?([^"\s)]+)', frag) or [frag]
    out = []
    for t in tags:
        t = t.strip('*"')
        segs = [x for x in t.split("::") if x]
        tail = "::".join(segs[-2:]) if len(segs) > 1 else t
        out.append((t, tail.replace("_", " ")))
    return out


def _tags_html(m):
    """The lecture's tags as chips, grouped by source (shown in the Show tags panel)."""
    from ..integrations import lectures
    groups = {}
    for s in m["searches"]:
        groups.setdefault(_fam(s), []).extend(_tag_label(s))
    parts = []
    for f in ("ak", "huc", "aj"):
        if f not in groups:
            continue
        chips = "".join("<span class='jkd-chip' title='%s'>%s</span>"
                        % (html.escape(full), html.escape(short))
                        for full, short in groups[f][:60])
        more = len(groups[f]) - 60
        parts.append("<div class='jkd-tg'><div class='jkd-tgh'>%s</div>%s%s</div>"
                     % (lectures.FAMILY_LABEL.get(f, f), chips,
                        ("<span class='jkd-chip jkd-more'>+%d more</span>" % more) if more > 0 else ""))
    return "".join(parts) or "<div class='jkd-tgh'>No tags</div>"


def _recount(m):
    """New / due / suspended counts for the class (switched-on sources), off the main
    thread, then written into the page."""
    q = _lecture_query(m, _fams_on)
    if not q:
        _set_counts("No sources switched on.")
        return
    try:
        from aqt.operations import QueryOp

        def op(col):
            n = lambda extra: len(col.find_cards("(%s) %s" % (q, extra)))
            return (n("is:new -is:suspended"), n("is:due -is:suspended"), n("is:suspended"),
                    n(""))

        def ok(r):
            new, due, sus, tot = r
            _set_study_counts(tot - sus, sus)
            _set_counts("<b>%d</b> cards · <span class=c-new>%d new</span> · "
                        "<span class=c-due>%d due</span> · <span class=c-sus>%d suspended</span>"
                        % (tot, new, due, sus))
        QueryOp(parent=mw, op=op, success=ok).run_in_background()
    except Exception as e:
        log("calendar recount: %s" % e)


def _set_study_counts(active, sus):
    try:
        mw.web.eval("(function(a,s){var x=document.getElementById('jkd-st-act'),"
                    "y=document.getElementById('jkd-st-sus');"
                    "if(x)x.textContent='Study unsuspended cards ('+a+')';"
                    "if(y)y.textContent='Study suspended cards ('+s+')';})(%d,%d)" % (active, sus))
    except Exception:
        pass


def _set_counts(h):
    try:
        mw.web.eval("(function(){var c=document.getElementById('jkd-counts');if(c)c.innerHTML=%s;})()"
                    % json.dumps(h))
    except Exception:
        pass


def _open_detail(i):
    global _detail, _fams_on
    from ..integrations import lectures
    if not (0 <= i < len(_shown)):
        return
    m = lectures.match_event(_shown[i]["summary"])
    _fams_on = {_fam(s) for s in m["searches"]} if m else set()
    _detail = i
    try:
        from . import sfx
        sfx.play("select")
    except Exception:
        pass
    _swap("open")


def _close_detail():
    global _detail
    if _detail is None:
        return False
    _detail = None
    try:
        from . import sfx
        sfx.play("back")
    except Exception:
        pass
    _swap("back")
    return True


_RESUSPEND = None


def _resuspend_path():
    import os
    return os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
                        "user_files", "calendar_resuspend.json")


def _save_resuspend(ids):
    import os
    try:
        os.makedirs(os.path.dirname(_resuspend_path()), exist_ok=True)
        with open(_resuspend_path(), "w", encoding="utf-8") as f:
            json.dump(sorted(int(i) for i in ids), f)
    except Exception as e:
        log("calendar resuspend save: %s" % e)


def _restore_suspended():
    """Put back the cards 'Study this lecture' unsuspended (on leaving the study, and at
    launch in case Anki quit mid-session)."""
    import os
    col = mw.col
    p = _resuspend_path()
    if col is None or not os.path.isfile(p):
        return
    try:
        with open(p, encoding="utf-8") as f:
            ids = [int(i) for i in json.load(f)]
        if ids:
            col.sched.suspend_cards(ids)
        os.remove(p)
    except Exception as e:
        log("calendar resuspend: %s" % e)


def _study_detail():
    """Every card for the class (suspended included) in a temporary filtered deck.
    Filtered decks can't hold suspended cards, so those are unsuspended just for the
    session and suspended again afterwards (saved to disk first, so a crash can't
    leave them unsuspended)."""
    study_event(_shown[_detail], _fams_on)


def study_event(e, fams=None, which="all"):
    """Study a class's cards (see _study_detail). which: "active" (unsuspended only),
    "suspended" (only suspended — unsuspended for the session, restored after) or "all".
    fams=None → all its sources. Used by the class page and the tray's Today list."""
    from aqt.utils import tooltip
    from ..integrations import lectures
    m = lectures.match_event(e["summary"])
    if not m:
        tooltip("No lecture matches “%s”." % e["summary"])
        return
    if fams is None:
        fams = {_fam(s) for s in m["searches"]}
    q = _lecture_query(m, fams)
    if not q:
        tooltip("Switch on at least one source first.")
        return
    col = mw.col
    try:
        _restore_suspended()
        _cleanup_temp()
        sus = list(col.find_cards("(%s) is:suspended" % q)) if which != "active" else []
        if sus:
            _save_resuspend(sus)
            col.sched.unsuspend_cards(sus)
        did = col.decks.new_filtered(TEMP_PREFIX + m["display"][:60])
        d = col.decks.get(did)
        if which == "suspended":
            term = "cid:%s" % ",".join(str(c) for c in sus) if sus else "cid:0"
        elif which == "active":
            term = "(%s) -is:suspended -is:buried" % q
        else:
            term = "(%s) -is:buried" % q
        d["terms"] = [[term, 99999, 0]]
        d["resched"] = True
        col.decks.save(d)
        col.sched.rebuild_filtered_deck(did)
        if not col.decks.cids(did):
            col.decks.remove([did])
            _restore_suspended()
            tooltip("No cards found for “%s”." % m["display"])
            return
        col.decks.select(did)
        try:
            from . import sfx
            sfx.play("open")
        except Exception:
            pass
        close()
        mw.moveToState("review")
    except Exception as ex:
        _restore_suspended()
        log("calendar study: %s" % ex)
        tooltip("Couldn't start studying (%s)." % ex)


def _unsuspend_detail():
    from aqt.utils import tooltip
    from aqt.operations import CollectionOp
    from ..integrations import lectures
    m = lectures.match_event(_shown[_detail]["summary"])
    q = _lecture_query(m, _fams_on) if m else ""
    if not q:
        tooltip("Switch on at least one source first.")
        return
    box = {"n": 0}

    def op(col):
        ids = col.find_cards("(%s) is:suspended" % q)
        box["n"] = len(ids)
        return col.sched.unsuspend_cards(ids)

    def ok(_c):
        tooltip("Unsuspended %d card(s) for “%s”." % (box["n"], m["display"]))
        try:
            from . import sfx
            sfx.play("loaded")
        except Exception:
            pass
        _recount(m)
    CollectionOp(parent=mw, op=op).success(ok).run_in_background()


_PALETTE = 8


def _course_key(title):
    """The course part of a class title: before ':' / ' - ' / '–', else the first word
    ("Pharm: Autonomics" → "pharm", "MSK – Bone" → "msk")."""
    import re
    t = (title or "").strip()
    m = re.split(r"\s*(?::|\s[-–—]\s|[–—])\s*", t, maxsplit=1)
    head = m[0] if len(m) > 1 and m[0] else (t.split()[0] if t.split() else t)
    return re.sub(r"[^a-z0-9]+", "", head.lower()) or "x"


_colours = None          # {course key: palette index}, remembered in user_files


def _colours_path():
    import os
    return os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
                        "user_files", "calendar_colours.json")


def _course_colour(title):
    """Palette index for a course. A new course takes the least-used colour (so
    courses don't share one) and keeps it from then on — same colour every week."""
    global _colours
    import os
    key = _course_key(title)
    if _colours is None:
        try:
            with open(_colours_path(), encoding="utf-8") as f:
                _colours = {k: int(v) for k, v in json.load(f).items()}
        except Exception:
            _colours = {}
    if key not in _colours:
        used = [0] * _PALETTE
        for v in _colours.values():
            used[v % _PALETTE] += 1
        _colours[key] = used.index(min(used))
        try:
            os.makedirs(os.path.dirname(_colours_path()), exist_ok=True)
            with open(_colours_path(), "w", encoding="utf-8") as f:
                json.dump(_colours, f, indent=1)
        except Exception:
            pass
    return _colours[key] % _PALETTE


def _is_allday_kind(summary):
    """Day-wide notices that come through as timed events (e.g. a dress code) belong
    in the all-day row, not across the time grid."""
    s = (summary or "").lower()
    return "dress code" in s or "dresscode" in s or "dress-code" in s


def _norm(s):
    return " ".join((s or "").lower().split())


_CSS = """<style>
/* Calendar page only: drop the (empty) deck table, its <br> and the page's top gap */
body center > table:first-of-type{display:none !important;}
body center > br{display:none !important;}
html body{padding-top:0 !important;margin-top:0 !important;justify-content:flex-start !important;}
html body > center{margin-top:0 !important;padding-top:0 !important;}
#jkc{width:min(1100px,calc(100vw - 32px));margin:6px auto 24px;text-align:left;}
.jkc-bar{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:6px;margin:0 0 10px;}
.jkc-l{justify-self:start;}.jkc-r{justify-self:end;}
/* ‹ / ›: no background; slide outward on hover, press in on click */
.jkc-bar .jkc-arr{background:transparent !important;font-size:1.25em;padding:2px 10px;
  transition:transform .22s cubic-bezier(.2,.8,.2,1),opacity .2s ease;opacity:.8;}
.jkc-bar .jkc-prev:hover,.jkc-bar .jkc-prev.kb{transform:translateX(-4px);opacity:1;}
.jkc-bar .jkc-next:hover,.jkc-bar .jkc-next.kb{transform:translateX(4px);opacity:1;}
.jkc-bar .jkc-prev:active,.jkc-bar .jkc-prev.press{transform:translateX(-4px) scale(.86);}
.jkc-bar .jkc-next:active,.jkc-bar .jkc-next.press{transform:translateX(4px) scale(.86);}
.jkc-ev.jk-kb{outline:2px solid rgba(255,255,255,.75);outline-offset:1px;}
.jkc-c{display:flex;align-items:center;gap:6px;}
.jkc-c .jkc-lbl{margin:0 6px;min-width:12em;text-align:center;}
.jkc-bar button{background:rgba(255,255,255,.08);color:inherit;border:none;border-radius:8px;
  padding:4px 11px;cursor:pointer;transition:background .2s ease;}
.jkc-bar button:hover{background:rgba(255,255,255,.16);}
.jkc-lbl{font-weight:600;}
.jkc-grid{display:grid;grid-template-columns:52px repeat(var(--jkc-n,5),1fr);gap:0 6px;position:relative;}
.jkc-segs{position:relative;display:inline-flex;background:rgba(255,255,255,.06);border-radius:9px;padding:2px;margin-right:6px;}
.jkc-segs .jkc-seg{position:relative;z-index:1;background:transparent !important;padding:3px 10px;border-radius:7px;transition:color .2s ease;}
.jkc-segs .jkc-seg.on{color:#cfe0ff;}
/* one pill behind the buttons that glides to the chosen view */
.jkc-pill{position:absolute;z-index:0;top:2px;bottom:2px;left:0;width:0;border-radius:7px;
  background:rgba(156,188,243,.28);transition:transform .24s cubic-bezier(.2,.8,.2,1),width .24s cubic-bezier(.2,.8,.2,1);}
.jkc-hours{position:relative;margin-top:52px;}
.jkc-hr{position:absolute;left:0;right:-9999px;border-top:1px solid rgba(255,255,255,.06);}
.jkc-hr span{position:absolute;top:-8px;left:0;font-size:.72em;opacity:.55;}
.jkc-col{min-width:0;}
.jkc-dh{text-align:center;font-size:.86em;opacity:.8;height:24px;line-height:24px;}
.jkc-today .jkc-dh{color:#9cbcf3;opacity:1;}
.jkc-ads{min-height:28px;}
.jkc-body{position:relative;border-radius:10px;background:rgba(255,255,255,.025);}
.jkc-today .jkc-body{background:rgba(156,188,243,.06);}
.jkc-ev{position:absolute;left:2px;right:2px;border-radius:8px;padding:3px 6px;overflow:hidden;
  background:rgba(156,188,243,.22);border:1px solid rgba(156,188,243,.45);cursor:pointer;
  font-size:.78em;line-height:1.25;transition:background .18s ease,transform .18s cubic-bezier(.2,.8,.2,1);}
.jkc-ev:hover,.jkc-ev.jk-kb{background:rgba(156,188,243,.36);transform:translateY(-1px);}
.jkc-fz{border-left-width:2px !important;border-left-style:dashed !important;}
.jkc-c0{background:rgba(120,165,245,.24);border-color:rgba(120,165,245,.55);}
.jkc-c1{background:rgba(80,195,185,.22);border-color:rgba(80,195,185,.55);}
.jkc-c2{background:rgba(125,200,120,.22);border-color:rgba(125,200,120,.52);}
.jkc-c3{background:rgba(235,185,90,.22);border-color:rgba(235,185,90,.55);}
.jkc-c4{background:rgba(240,130,115,.22);border-color:rgba(240,130,115,.55);}
.jkc-c5{background:rgba(170,135,240,.24);border-color:rgba(170,135,240,.55);}
.jkc-c6{background:rgba(235,120,175,.22);border-color:rgba(235,120,175,.52);}
.jkc-c7{background:rgba(150,170,195,.22);border-color:rgba(150,170,195,.52);}
.jkc-c0:hover{background:rgba(120,165,245,.36);}.jkc-c1:hover{background:rgba(80,195,185,.34);}
.jkc-c2:hover{background:rgba(125,200,120,.34);}.jkc-c3:hover{background:rgba(235,185,90,.34);}
.jkc-c4:hover{background:rgba(240,130,115,.34);}.jkc-c5:hover{background:rgba(170,135,240,.36);}
.jkc-c6:hover{background:rgba(235,120,175,.34);}.jkc-c7:hover{background:rgba(150,170,195,.34);}
.jkc-un{background:rgba(255,255,255,.07);border-color:rgba(255,255,255,.14);opacity:.75;}
.jkc-ad{position:relative;margin:0 2px 3px;}
.jkc-t{font-weight:600;}
/* mandatory: an outlined M badge in the block's top-right corner */
.jkc-m{position:absolute;top:4px;right:4px;width:15px;height:15px;line-height:13px;box-sizing:border-box;
  text-align:center;font-size:10px;font-weight:700;color:#ff9d8a;border:1.5px solid #ff9d8a;border-radius:4px;}
.jkc-ev .jkc-t{padding-right:16px;}
.jkd-m{position:relative;top:-4px;right:auto;display:inline-block;vertical-align:middle;width:20px;height:20px;
  line-height:17px;font-size:13px;border-radius:5px;margin-left:6px;}.jkc-tm,.jkc-sub{opacity:.75;font-size:.92em;}
.jkc-empty{opacity:.7;text-align:center;margin:18px 0;}
.jkc-detail{display:block;position:relative;text-align:center;padding:4px 0 24px;}
.jkd-back{position:absolute;left:0;top:0;background:rgba(255,255,255,.08);color:inherit;border:none;
  border-radius:8px;padding:4px 11px;cursor:pointer;}
.jkd-back:hover{background:rgba(255,255,255,.16);}
.jkd{max-width:520px;margin:28px auto 0;}
.jkd h2{margin:0 0 4px;font-size:1.45em;}
.jkd-sub{opacity:.85;margin-bottom:4px;}
#jkc .jkd-pick{background:rgba(255,255,255,.07) !important;color:inherit;border:1px solid rgba(255,255,255,.14);
  border-radius:8px;padding:3px 8px;font:inherit;max-width:420px;cursor:pointer;
  text-align:center;text-align-last:center;}
#jkc .jkd-pick:hover{background:rgba(255,255,255,.12) !important;}
#jkc .jkd-pick option{background:#1c1e24;color:#eee;}
.jkd-when,.jkd-loc{opacity:.8;font-size:.95em;margin-top:2px;}
.jkd-counts{margin:18px 0 12px;opacity:.9;}
.jkd-counts .c-new{color:#7ab0ff;}.jkd-counts .c-due{color:#7fd17f;}.jkd-counts .c-sus{color:#e0b000;}
.jkd-sws{display:flex;justify-content:center;gap:16px;margin:6px 0 18px;flex-wrap:wrap;}
.jkd-sw{display:inline-flex;align-items:center;gap:8px;cursor:pointer;user-select:none;}
/* (ids + !important: Janki's glass styling clears backgrounds on this page) */
#jkc .jkd-knob{position:relative;display:inline-block;width:36px;height:20px;border-radius:10px;
  background:rgba(255,255,255,.18) !important;transition:background .18s ease;flex:none;}
#jkc .jkd-knob::after{content:'';position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:50%;
  background:#fff !important;transition:transform .18s cubic-bezier(.2,.8,.2,1);}
#jkc .jkd-sw.on .jkd-knob{background:rgba(156,188,243,.9) !important;}
#jkc .jkd-sw.on .jkd-knob::after{transform:translateX(16px);}
#jkc .jkd-study{font-size:1.12em;font-weight:600;padding:12px 34px;border:none;border-radius:14px;
  background:#9cbcf3 !important;color:#10213f !important;text-shadow:none !important;
  cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.35);
  transition:background .2s ease,transform .2s cubic-bezier(.2,.8,.2,1);}
#jkc .jkd-study:hover{background:#b0cbf6 !important;transform:translateY(-1px);}
.jkd-note{font-size:.82em;opacity:.6;margin:8px 0 16px;}
.jkd-studies{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;}
#jkc .jkd-study2{background:rgba(156,188,243,.22) !important;color:#cfe0ff !important;}
#jkc .jkd-study2:hover{background:rgba(156,188,243,.34) !important;}
.jkd-sec{background:rgba(255,255,255,.08);color:inherit;border:none;border-radius:10px;padding:7px 16px;
  cursor:pointer;transition:background .2s ease;}
.jkd-sec:hover{background:rgba(255,255,255,.16);}
.jkd-links{margin-top:14px;font-size:.88em;opacity:.7;}.jkd-links a{cursor:pointer;text-decoration:underline;}
.jkd-none{margin-top:20px;opacity:.85;}.jkd-none button{margin-top:10px;}
/* Show tags: an inline panel that unfolds below the links */
.jkd-tags{display:grid;grid-template-rows:0fr;opacity:0;transition:grid-template-rows .26s cubic-bezier(.2,.8,.2,1),opacity .2s ease;}
.jkd-tags.open{grid-template-rows:1fr;opacity:1;}
.jkd-tags-in{overflow:hidden;}
.jkd-tg{margin:12px auto 0;max-width:620px;text-align:center;}
.jkd-tgh{font-size:.78em;letter-spacing:.04em;text-transform:uppercase;opacity:.55;margin:0 0 6px 2px;}
#jkc .jkd-chip{display:inline-block;margin:0 6px 6px 0;padding:3px 9px;border-radius:999px;font-size:.82em;
  background:rgba(255,255,255,.07) !important;border:1px solid rgba(255,255,255,.12);}
#jkc .jkd-more{opacity:.6;}
</style>"""

_JS = """<script>(function(){
 // ‹ / ›: the days slide out while Python builds the next ones (in parallel, no page
 // reload); jkcSwap then drops them in and slides them in from the other side.
 // Transform + opacity only, on its own layer, so it stays smooth.
 var EASE='cubic-bezier(.2,.8,.2,1)', outDone=null;
 function grid(){return document.querySelector('#jkc .jkc-grid');}
 window.jkcNav=function(dir){
   var g=grid();
   if(g&&g.animate&&(dir==='next'||dir==='prev')){
     g.style.willChange='transform,opacity';
     var a=g.animate([{transform:'none',opacity:1},
                      {transform:'translateX('+(dir==='next'?-28:28)+'px)',opacity:0}],
                     {duration:120,easing:'ease-in',fill:'forwards'});
     outDone=a.finished.catch(function(){});
   } else outDone=null;
   pycmd('janki:cal:'+dir);
 };
 window.jkcSwap=function(inner,dir){
   function put(){
     var root=document.getElementById('jkc'); if(!root)return;
     var keep=root.querySelector('.jkc-l');            // the view switch keeps gliding
     root.innerHTML=inner;
     var fresh=root.querySelector('.jkc-l');
     if(keep&&fresh&&fresh.parentNode)fresh.parentNode.replaceChild(keep,fresh);
     pillInit();
     var g=grid(); if(!g||!g.animate)return;
     g.style.willChange='transform,opacity';
     if(dir==='refresh')return;                       // quiet in-place update
     var from=dir==='next'?'translateX(28px)':(dir==='prev'?'translateX(-28px)':
              (dir==='zin'||dir==='open'?'scale(0.97)':(dir==='zout'||dir==='back'?'scale(1.03)':'none')));
     var a=g.animate([{transform:from,opacity:0},
                      {transform:'none',opacity:1}],{duration:dir==='today'?160:240,easing:EASE});
     a.finished.then(function(){g.style.willChange='';}).catch(function(){});
   }
   if(outDone){var p=outDone;outDone=null;p.then(put);} else put();
 };
 // The view switch's pill: placed under the active option, glides when it changes.
 function pill(btn,anim){var p=document.querySelector('#jkc .jkc-pill');if(!p||!btn)return;
   if(!anim)p.style.transition='none';
   p.style.width=btn.offsetWidth+'px';p.style.transform='translateX('+(btn.offsetLeft-2)+'px)';
   if(!anim){void p.offsetWidth;p.style.transition='';}}
 function pillInit(){pill(document.querySelector('#jkc .jkc-seg.on'),false);}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',pillInit);
 else pillInit();
 // Day / 3 Days / Week: fewer days zooms in, more days zooms out (scale + fade).
 window.jkcMode=function(k){
   var b=document.querySelector('#jkc .jkc-seg[data-k="'+k+'"]');
   if(b&&!b.classList.contains('on')){
     document.querySelectorAll('#jkc .jkc-seg').forEach(function(x){x.classList.remove('on');});
     b.classList.add('on'); pill(b,true);
   }
   var g=grid(), n=k==='week'?5:parseInt(k,10);
   var cur=g?parseInt(getComputedStyle(g).getPropertyValue('--jkc-n'),10)||5:5;
   if(n===cur){return;}
   var dir=n<cur?'zin':'zout';
   if(g&&g.animate){
     g.style.willChange='transform,opacity';
     var a=g.animate([{transform:'none',opacity:1},
                      {transform:'scale('+(dir==='zin'?1.03:0.97)+')',opacity:0}],
                     {duration:120,easing:'ease-in',fill:'forwards'});
     outDone=a.finished.catch(function(){});
   }
   pycmd('janki:cal:mode:'+k+':'+dir);
 };
 // Keyboard / remote: ←/→ change days, ↓/↑ walk the classes, Enter/Space open,
 // ↑ from the top → toolbar. On a class page: ←/Esc back, Enter/Space study.
 function press(cls){var b=document.querySelector('#jkc .'+cls);if(!b)return;
   b.classList.add('kb','press');setTimeout(function(){b.classList.remove('press');},140);
   setTimeout(function(){b.classList.remove('kb');},420);}
 function evs(){return Array.prototype.slice.call(document.querySelectorAll('#jkc .jkc-ev'))
   .sort(function(a,b){var ra=a.getBoundingClientRect(),rb=b.getBoundingClientRect();
     return (ra.left-rb.left)||(ra.top-rb.top);});}
 function sel(el){var c=document.querySelector('#jkc .jkc-ev.jk-kb');if(c)c.classList.remove('jk-kb');
   if(el){el.classList.add('jk-kb');try{pycmd('janki:sfx:move');}catch(x){}
     var r=el.getBoundingClientRect();if(r.top<0||r.bottom>innerHeight)el.scrollIntoView({block:'nearest'});}}
 document.addEventListener('keydown',function(e){
   if(e.metaKey||e.ctrlKey||e.altKey)return;
   var t=e.target;if(t&&(t.isContentEditable||/INPUT|TEXTAREA|SELECT/.test(t.tagName)))return;
   var k=e.key, det=document.querySelector('#jkc .jkc-detail');
   if(det){
     if(k==='ArrowLeft'||k==='Escape'||k==='Backspace'){e.preventDefault();pycmd('janki:cal:det:back');}
     else if(k==='Enter'||k===' '){e.preventDefault();pycmd('janki:cal:det:study:active');}
     else if(k==='ArrowUp'){e.preventDefault();pycmd('janki:toolbar');}
     return;}
   if(k==='ArrowLeft'||k==='ArrowRight'){e.preventDefault();
     var d=k==='ArrowRight'?'next':'prev';press(d==='next'?'jkc-next':'jkc-prev');jkcNav(d);return;}
   var all=evs(), c=document.querySelector('#jkc .jkc-ev.jk-kb'), i=c?all.indexOf(c):-1;
   if(k==='ArrowDown'){e.preventDefault();if(all.length)sel(all[Math.min(all.length-1,i+1)]);return;}
   if(k==='ArrowUp'){e.preventDefault();if(i<=0){sel(null);pycmd('janki:toolbar');}else sel(all[i-1]);return;}
   if((k==='Enter'||k===' ')&&c){e.preventDefault();
     pycmd('janki:cal:ev:'+c.getAttribute('data-i'));}
 },true);
 document.addEventListener('mousemove',function(){sel(null);},{passive:true,once:false});
 window.jkdTags=function(a){var t=document.getElementById('jkd-tags');if(!t)return;
   var o=t.classList.toggle('open');a.textContent=o?'Hide tags ▴':'Show tags ▾';
   try{pycmd('janki:sfx:'+(o?'unfold':'fold'));}catch(x){}};
 document.addEventListener('click',function(e){
   var ev=e.target.closest&&e.target.closest('.jkc-ev'); if(!ev)return;
   pycmd('janki:cal:ev:'+ev.getAttribute('data-i'));
 },true);
})();</script>"""


def _on_render(deck_browser, content):
    if not _view:
        return
    try:
        content.tree = ""
        content.stats = _page_html()
    except Exception as e:
        log("calendar render: %s" % e)


# ----------------------------------------------------------- class actions ------
def _event_menu(i):
    from aqt.qt import QMenu, QCursor
    from ..integrations import lectures
    if not (0 <= i < len(_shown)):
        return
    e = _shown[i]
    m = lectures.match_event(e["summary"])
    try:
        from . import sfx
        sfx.play("select")
    except Exception:
        pass
    menu = QMenu(mw)
    head = menu.addAction(e["summary"] + (("  →  " + m["display"]) if m and
                                          _norm(m["display"]) != _norm(e["summary"]) else ""))
    head.setEnabled(False)
    a_study = a_tags = None
    if m:
        a_study = menu.addAction("Study this lecture (due + new)")
        a_tags = menu.addAction("Show its tags…")
    else:
        na = menu.addAction("No lecture matched — fix it in lecture wizard")
        na.setEnabled(False)
    a_load = menu.addAction("Open this day in lecture wizard…")
    chosen = menu.exec(QCursor.pos())
    if chosen is None:
        return
    if chosen is a_study:
        study_lecture(m)
    elif chosen is a_tags:
        _show_tags(m)
    elif chosen is a_load:
        try:
            off = (e["date"] - datetime.date.today()).days
            lectures._open_today_dialog(day_offset=off)
        except Exception as ex:
            log("calendar → loader: %s" % ex)


def _show_tags(m):
    from aqt.utils import showText
    lines = [m["display"], ""] + ["• " + s for s in m["searches"]]
    showText("\n".join(lines), title="Tags for this lecture", minWidth=520)


def study_lecture(m):
    """A temporary filtered deck with the lecture's due + new cards (suspended stay
    suspended). Filtered decks reschedule normally, so this counts like any review."""
    from aqt.utils import tooltip
    col = mw.col
    if col is None or not m or not m["searches"]:
        return
    search = "(%s) (is:due OR is:new) -is:suspended -is:buried" % " OR ".join(
        "(%s)" % s for s in m["searches"])
    name = TEMP_PREFIX + m["display"][:60]
    try:
        _cleanup_temp(keep=None)
        did = col.decks.new_filtered(name)
        d = col.decks.get(did)
        d["terms"] = [[search, 9999, 0]]
        d["resched"] = True
        col.decks.save(d)
        col.sched.rebuild_filtered_deck(did)
        if not col.decks.cids(did):
            col.decks.remove([did])
            tooltip("Nothing due or new for “%s” right now." % m["display"])
            return
        col.decks.select(did)
        try:
            from . import sfx
            sfx.play("open")
        except Exception:
            pass
        close()
        mw.moveToState("overview")
    except Exception as e:
        log("calendar study: %s" % e)
        tooltip("Couldn't build the study deck (%s)." % e)


def _cleanup_temp(keep=None):
    """Remove the temporary calendar study decks (their cards go home)."""
    col = mw.col
    if col is None:
        return
    try:
        for nid in col.decks.all_names_and_ids():
            if nid.name.startswith(TEMP_PREFIX) and nid.id != keep:
                col.decks.remove([nid.id])
    except Exception as e:
        log("calendar cleanup: %s" % e)


# ------------------------------------------------------------------ wiring -------
def on_js_message(handled, message, context):
    if not (isinstance(message, str) and message.startswith("janki:cal:")):
        return handled
    cmd = message[len("janki:cal:"):]
    try:
        if cmd == "prev":
            _go_week(-1)
        elif cmd == "next":
            _go_week(1)
        elif cmd == "today":
            _go_week(None)
        elif cmd.startswith("mode:"):
            _set_mode(cmd[5:].split(":")[0], cmd[5:].split(":")[1] if ":" in cmd[5:] else "mode")
        elif cmd == "loader":
            from ..integrations import lectures
            lectures.run_today(interactive=True)
        elif cmd.startswith("ev:"):
            _open_detail(int(cmd[3:]))
        elif cmd.startswith("pick:"):
            from ..integrations import lectures
            i = int(cmd[5:])
            if _detail is not None and 0 <= i < len(_pick_opts):
                lectures.set_alias(_shown[_detail]["summary"], _pick_opts[i])
                m2 = lectures.match_event(_shown[_detail]["summary"])
                _fams_on.clear()
                if m2:
                    _fams_on.update(_fam(s) for s in m2["searches"])
                try:
                    from . import sfx
                    sfx.play("select")
                except Exception:
                    pass
                _swap("refresh")
        elif cmd.startswith("fam:"):
            f = cmd[4:]
            _fams_on.symmetric_difference_update({f})
            try:
                from . import sfx
                sfx.play("move")
            except Exception:
                pass
            _swap("refresh")
        elif cmd == "det:back":
            _close_detail()
        elif cmd.startswith("det:study"):
            which = cmd.split(":")[2] if cmd.count(":") >= 2 else "all"
            study_event(_shown[_detail], _fams_on, which)
        elif cmd == "det:unsuspend":
            _unsuspend_detail()
        elif cmd == "det:tags":
            from ..integrations import lectures
            _show_tags(lectures.match_event(_shown[_detail]["summary"]))
        elif cmd == "det:wizard":
            from ..integrations import lectures
            off = (_shown[_detail]["date"] - datetime.date.today()).days
            lectures._open_today_dialog(day_offset=off)
    except Exception as e:
        log("calendar cmd %s: %s" % (cmd, e))
    return (True, None)


def _on_state(new_state, old_state):
    if new_state != "deckBrowser":
        close()
    # Back on the deck list after studying a class: tidy the temporary deck away
    # (its cards return to their own decks; the reviews already counted).
    if new_state == "deckBrowser" and old_state in ("overview", "review"):
        QTimer.singleShot(0, _cleanup_temp)
        QTimer.singleShot(0, _restore_suspended)


def install_toolbar(links, toolbar):
    """A 'Calendar' toolbar item (after Practice); Decks/Practice/Stats leave it."""
    try:
        link = toolbar.create_link(cmd="janki_calendar", label="Calendar",
                                   func=open_calendar, tip="",
                                   id="janki_calendar")
        links.insert(0, link)                    # furthest left in the toolbar
        # Light blue (like Practice's green). Icon or the word "Calendar", per
        # Settings → General; with the icon the label stays for tooltip/accessibility.
        from ..util.config import _cfg
        style = "#janki_calendar{color:#a8d0ff !important;}"
        if _cfg().get("calendar_toolbar_icon", True):
            svg = ("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' "
                   "stroke='black' stroke-width='2' stroke-linecap='round' "
                   "stroke-linejoin='round'><rect x='3' y='5' width='18' height='16' rx='3'/>"
                   "<path d='M3 10h18M8 3v4M16 3v4'/><circle cx='8' cy='14.5' r='.6' "
                   "fill='black'/><circle cx='12' cy='14.5' r='.6' fill='black'/>"
                   "<circle cx='16' cy='14.5' r='.6' fill='black'/></svg>")
            import urllib.parse as _up
            uri = "data:image/svg+xml," + _up.quote(svg)
            # The label keeps its normal font size (so the item has exactly the same line
            # height + baseline as Decks/Add/…), but is invisible and clipped to the
            # icon's width; the icon is centred on top of it.
            style += ("#janki_calendar{position:relative;display:inline-block;width:1.2em;"
                      "white-space:nowrap;color:transparent !important;"
                      "text-shadow:none !important;"
                      "clip-path:inset(0);vertical-align:baseline;}"
                      "#janki_calendar::before{content:'';position:absolute;left:50%%;top:50%%;"
                      "width:1.15em;height:1.15em;transform:translate(-50%%,-50%%);"
                      "background:#a8d0ff;-webkit-mask:url(\"%s\") center/contain "
                      "no-repeat;mask:url(\"%s\") center/contain no-repeat;}" % (uri, uri))
        links.append("<style>%s</style>" % style)
        lh = getattr(toolbar, "link_handlers", None)
        if isinstance(lh, dict):
            for key in ("decks", "janki_practice", "stats"):
                cur = lh.get(key)
                if cur is None or getattr(cur, "_jk_cal_wrapped", False):
                    continue

                def wrapped(*a, _cur=cur, **k):
                    close()
                    return _cur(*a, **k)
                wrapped._jk_cal_wrapped = True
                lh[key] = wrapped
    except Exception as e:
        log("calendar toolbar: %s" % e)


_warming = False
_pending_tries = 0      # caps background-match → refresh rounds per opening


def _prewarm():
    """Match ±2 weeks of events to lectures OFF the main thread (Anki's QueryOp, which
    also serialises collection access), so neither opening the Calendar nor the first
    arrow / view switch holds the window."""
    global _warming
    if _warming or getattr(mw, "col", None) is None:
        return
    _warming = True
    try:
        from aqt.operations import QueryOp

        def done(_r):
            global _warming
            _warming = False
            if _view and getattr(mw, "state", None) == "deckBrowser":
                _swap("refresh")                   # colours/labels now that matches exist

        def failed(_e):
            global _warming
            _warming = False
        QueryOp(parent=mw, op=lambda _col: _prewarm_work(), success=done) \
            .failure(failed).run_in_background()
    except Exception as e:
        _warming = False
        log("calendar prewarm: %s" % e)


def _prewarm_work():
    # Two weeks either side: the 3-Day view and week arrows reach beyond this week, and
    # matching events on first sight caused a hold on the first view switch / arrow.
    try:
        from ..integrations import lectures
        t = datetime.date.today()
        for e in lectures.events_between(t - datetime.timedelta(days=14),
                                         t + datetime.timedelta(days=21)):
            lectures.match_event(e["summary"])
    except Exception as e:
        log("calendar prewarm: %s" % e)


def _schedule_prewarm():
    try:
        from . import stats_embed
        stats_embed._when_idle(_prewarm, 8000)       # waits while you navigate/study
    except Exception:
        pass


def install():
    gui_hooks.profile_did_open.append(_schedule_prewarm)
    gui_hooks.profile_did_open.append(lambda: QTimer.singleShot(1500, _restore_suspended))
    gui_hooks.deck_browser_will_render_content.append(_on_render)
    gui_hooks.webview_did_receive_js_message.append(on_js_message)
    gui_hooks.state_did_change.append(_on_state)
    gui_hooks.top_toolbar_did_init_links.append(install_toolbar)
