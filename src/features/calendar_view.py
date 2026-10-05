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
import time
import html
import re
import json

from aqt import gui_hooks, mw
from aqt.qt import QTimer

from ..util.config import log

_view = False          # Calendar page showing (consumed like practice._practice_view)
_week = 0              # weeks from this one
_shown = []            # events on the current render (index → event)
# Temporary study decks: no "::" in the name, or Anki creates a visible parent deck
# "Janki Calendar" to hold them (that's the stray deck older versions left behind)
TEMP_PREFIX = "Janki Calendar · "
_OLD_PREFIX = "Janki Calendar::"
_OLD_PARENT = "Janki Calendar"


# --------------------------------------------------------------- open / close ----
def open_calendar():
    global _view
    QTimer.singleShot(6000, lambda: _view and not _weak_busy and prewarm_weak())   # weak areas, ready early
    # Calendar clicked while a class page is open → back to the calendar grid
    if _view and _detail is not None and getattr(mw, "state", None) == "deckBrowser":
        _close_detail()
        return
    QTimer.singleShot(700, _prewarm)           # neighbouring weeks, ready for arrows
    try:
        from . import practice, stats_embed
        practice._practice_view = False
        _view = True
        if stats_embed.is_open():
            stats_embed.close_soon(sound="calendar")
            _redraw()
        else:
            stats_embed.animate_next_deck_render()
            stats_embed.fade_then(_redraw, sound="calendar")
    except Exception as e:
        log("calendar open: %s" % e)
        _view = True
        _redraw()


def close():
    global _view, _detail
    was = _view
    _view = False
    _detail = None
    _sync_back()
    try:                                       # never leave the bottom strip hidden
        bw = getattr(mw, "bottomWeb", None)
        if bw is not None and not bw.isVisible():
            bw.setVisible(True)
    except Exception:
        pass
    if was:
        QTimer.singleShot(0, _redraw_bottom)     # Anki's own buttons back


def _redraw():
    try:
        if getattr(mw, "state", None) != "deckBrowser":
            mw.moveToState("deckBrowser")
        else:
            # The Calendar never shows the deck tree, so never wait on fetching it:
            # re-use what Anki has (a fresh fetch queues behind any background work —
            # the first-open hold). Decks still refreshes properly when you go back.
            db = mw.deckBrowser
            if getattr(db, "_render_data", None) is not None:
                db._renderPage(reuse=True)
            else:
                from . import stats_embed
                if not stats_embed.fast_deck_redraw():
                    db.refresh()
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
    _mode_override = m
    _anchor = None
    _swap(direction)                    # draw first…
    try:                                # (the sound can take ~40 ms to start)
        from . import sfx
        sfx.play("select")
    except Exception:
        pass

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


_deferred_refresh = False


def _app_active():
    try:
        from aqt.qt import Qt
        return mw.app.applicationState() == Qt.ApplicationState.ApplicationActive
    except Exception:
        return True


def _on_app_state(st):
    """Back in Anki: apply a quiet refresh that arrived while you were elsewhere."""
    global _deferred_refresh
    if _deferred_refresh and _app_active():
        _deferred_refresh = False
        if _view:
            _swap("refresh")


def _swap(direction):
    """Replace the days in the open page (no reload): the page's out-slide is already
    running; jkcSwap drops the new days in and slides them from the other side."""
    global _deferred_refresh
    # A background result landing while you're in another app waits for your return:
    # re-rendering the page then could pull keyboard focus from the app you're in.
    if direction == "refresh" and not _app_active():
        _deferred_refresh = True
        return
    try:
        mw.web.eval("window.jkcSwap&&window.jkcSwap(%s,%s)"
                    % (json.dumps(_week_html()), json.dumps(direction)))
        _sync_back()
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
            _anchor = _days()[0] + datetime.timedelta(days=delta)   # slide one day at a time
        else:
            _anchor = _step_weekdays(_days()[0], delta)
    _swap("today" if delta is None else ("next" if delta > 0 else "prev"))
    try:                                # after the swap: the sound can take ~40 ms
        from . import sfx
        sfx.play("move")
    except Exception:
        pass


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
    if _detail == WEAK:
        return _weak_html()
    if _detail is not None and 0 <= _detail < len(_shown):
        return _detail_html(_shown[_detail])
    from ..integrations import lectures
    today = datetime.date.today()
    days = _days()                                      # weekdays only
    monday, sunday = days[0], days[-1]
    loading = False
    try:   # never read/download the calendar here — that happens in the background
        evs, fresh = lectures.events_cached_between(monday, sunday)
        if not fresh:
            loading = True
            lectures.load_events_bg(lambda: _view and _swap("refresh"))
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

    # all-day notices: slim one-line chips in a strip of the SAME height on every day
    # (the hour labels sit beside the grid, so uneven strips misaligned the times)
    AD_MAX, AD_H = 3, 20
    ad_n = max([sum(1 for e in evs if e["date"] == d and
                    (e["start"] is None or _is_allday_kind(e["summary"]))) for d in days] + [0])
    ad_rows = min(ad_n, AD_MAX + 1) if ad_n > AD_MAX else ad_n
    ads_h = max(8, ad_rows * AD_H + 4)
    cols = []
    pending = False
    for d in days:
        blocks, allday = [], []
        lanes = _lanes([(i, e) for i, e in enumerate(evs) if e["date"] == d and
                        e["start"] is not None and not _is_allday_kind(e["summary"])])
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
            mbadge = "<span class='jkc-m' title='Mandatory'>%s</span>" % _STAR if e.get("mandatory") else ""
            sub = html.escape(m["display"]) if m and _norm(m["display"]) != _norm(e["summary"]) else ""
            tip = html.escape(e["summary"] + (("\n→ " + m["display"]) if m else "\n(no lecture match)"))
            if e["start"] is None or _is_allday_kind(e["summary"]):
                if e.get("_dress"):                # a notice, not a class: not clickable
                    # the dress code itself first (a shirt icon stands in for the
                    # "Dress code:" label, which used to push it off the chip)
                    val = re.sub(r"(?i)^dress\s*-?\s*code\s*[:\-–]?\s*", "", e["summary"])
                    allday.append("<div class='jkc-ev jkc-ad jkc-dress' title='%s'>%s%s</div>"
                                  % (title, _SHIRT, html.escape(val or e["summary"])))
                    continue
                allday.append("<div class='%s jkc-ad' data-i='%d' title='%s'>%s%s</div>"
                              % (cls, i, tip, mbadge, title))
                continue
            top = 100.0 * (e["start"] - lo) / span           # % of the day: the grid
            h = 100.0 * (e["end"] - e["start"]) / span        # stretches to the window
            ln, nl = lanes.get(i, (0, 1))
            pos = ("" if nl == 1 else
                   "left:calc(%.4f%% + 2px);right:auto;width:calc(%.4f%% - 4px);"
                   % (100.0 * ln / nl, 100.0 / nl))
            blocks.append(
                "<div class='%s%s' data-i='%d' title='%s' style='top:%.3f%%;height:calc(%.3f%% - 2px);min-height:22px;%s'>"
                "%s<div class='jkc-t'>%s</div><div class='jkc-tm'>%s–%s%s</div>%s</div>"
                % (cls, " jkc-narrow" if nl > 1 else "", i, tip, top, h, pos, mbadge, title,
                   _hm(e["start"]), _hm(e["end"]), _tag_count_html(m),
                   ("<div class='jkc-sub'>%s</div>" % sub) if sub else ""))
        if d == today:                     # "now" line, kept current by the page's timer
            blocks.append("<div class='jkc-now' data-lo='%d' data-hi='%d'></div>" % (lo, hi))
        if len(allday) > AD_MAX:
            rest = len(allday) - AD_MAX
            allday = allday[:AD_MAX] + ["<div class='jkc-ad jkc-more'>+%d more</div>" % rest]
        cols.append(
            "<div class='jkc-col%s'><div class='jkc-dh'>%s <b>%d</b></div>"
            "<div class='jkc-ads' style='min-height:%dpx'>%s</div><div class='jkc-body'>%s</div></div>"
            % (" jkc-today" if d == today else "", _DAY[d.weekday()], d.day, ads_h, "".join(allday),
               "".join(blocks)))
    hours = "".join("<div class='jkc-hr' style='top:%.3f%%'><span>%s</span></div>"
                    % (100.0 * (t - lo) / span, _hm(t)) for t in range(lo, hi + 1, 60))
    if monday == sunday:
        label = "%s, %s %d" % (_DAY[monday.weekday()], monday.strftime("%b"), monday.day)
    else:
        label = "%s %d – %s %d" % (monday.strftime("%b"), monday.day,
                                    sunday.strftime("%b"), sunday.day)
    mode = _mode()
    seg = "<span class='jkc-pill'></span>" + "".join(
        "<button class='jkc-seg%s' data-k='%s' onclick=\"jkcMode('%s')\">%s</button>"
        % (" on" if mode == k else "", k, k, l)
        for k, l in (("1", "Day"), ("3", "3-day"), ("week", "Week")))
    empty = ("" if evs else
             "<div class='jkc-empty'>Loading calendar…</div>" if loading else
             "<div class='jkc-empty'>No classes %s%s.</div>"
             % ("this week" if mode == "week" else "on these days",
                "" if lectures._cfg().get("ics_path") else
                " — import your calendar in lecture wizard (⌘L)"))
    # view switch left · ‹ Today date › centred · Lecture wizard right
    bar = ("<div class='jkc-bar'>"
           "<div class='jkc-l'><span class='jkc-segs'>%s</span></div>"
           "<div class='jkc-c'><button class='jkc-arr jkc-prev' onclick=\"jkcNav('prev')\"><svg width='9' height='14' viewBox='0 0 9 14'><path d='M7 1L2 7l5 6' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/></svg></button>"
           "<span class='jkc-lbl'>%s</span>"
           "<button class='jkc-arr jkc-next' onclick=\"jkcNav('next')\"><svg width='9' height='14' viewBox='0 0 9 14'><path d='M2 1l5 6-5 6' fill='none' stroke='currentColor' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/></svg></button></div>"
           "<div class='jkc-r'><button onclick=\"jkcNav('today')\">Today</button> "
           "<button class='jkc-wand' title='Lecture wizard' aria-label='Lecture wizard' "
           "onclick=\"pycmd('janki:cal:loader')\">%s</button></div></div>" % (seg, label, _WAND))
    # day height: at least the old fixed size, else whatever the window leaves below
    # the bar, day names and all-day strip
    grid = ("<div class='jkc-grid' style='--jkc-n:%d;--jkc-h:max(%dpx,calc(100vh - %dpx))'>"
            "<div class='jkc-hours'>%s</div>%s</div>"
            % (len(days), grid_h, 130 + ads_h, hours, "".join(cols)))
    global _pending_tries
    if pending and _pending_tries < 2:        # match in the background, then refresh
        _pending_tries += 1
        QTimer.singleShot(0, _prewarm)
    elif not pending:
        _pending_tries = 0
    return bar + empty + grid


_primed = {"key": None, "html": None}


def _prime_key():
    from ..integrations import lectures
    return (_mode(), _week, _anchor, _detail, datetime.date.today(),
            lectures._EV_CACHE.get("key"), len(lectures._MATCH_CACHE.get("map") or {}),
            tuple(sorted(_fams_off())), datetime.datetime.now().hour)


def prime():
    """Build this week's page ahead of the first Calendar click (a few seconds after
    launch): the events are read, matches/colours warmed, and the HTML kept ready."""
    if _closing or _view:
        return
    try:
        k = _prime_key()
        html_ = _CSS + "<div id='jkc'>" + _week_html() + "</div>" + _JS
        if _pending_tries == 0:                 # only keep a fully-matched page
            _primed["key"], _primed["html"] = k, html_
    except Exception as e:
        log("calendar prime: %s" % e)


def _page_html():
    try:
        if _primed["html"] and _primed["key"] == _prime_key():
            h, _primed["html"] = _primed["html"], None   # use once
            return h
    except Exception:
        pass
    return _CSS + "<div id='jkc'>" + _week_html() + "</div>" + _JS


# ------------------------------------------------------------- class page --------
def _cfg_get(k, default=None):
    try:
        return (mw.addonManager.getConfig(__name__) or {}).get(k, default)
    except Exception:
        return default


def _fams_off():
    """Sources (Hutch / AJ / AnKing …) you've switched off — remembered across classes
    and launches (config calendar_fams_off)."""
    try:
        return set((mw.addonManager.getConfig(__name__) or {}).get("calendar_fams_off") or [])
    except Exception:
        return set()


def _save_fam(f, on):
    def w():
        try:
            c = mw.addonManager.getConfig(__name__) or {}
            off = set(c.get("calendar_fams_off") or [])
            (off.discard if on else off.add)(f)
            c["calendar_fams_off"] = sorted(off)
            mw.addonManager.writeConfig(__name__, c)
        except Exception as e:
            log("calendar fams save: %s" % e)
    QTimer.singleShot(0, w)


def _lecture_query(m, fams):
    """The lecture's tag searches for the switched-on sources (a list; empty = none)."""
    return [s for s in m["searches"] if _fam(s) in fams]


def _cids(col, frags, extra=""):
    from ..integrations import lectures
    return list(lectures.find_ids(col, frags, extra))


def _cid_term(ids):
    return "cid:%s" % ",".join(str(c) for c in ids) if ids else "cid:0"


def _fam(frag):
    from ..integrations import lectures
    return lectures.family_of(frag)


_opts_cache = {}       # title → picker alternatives (worked out in the background)
_detail_busy = set()


def _detail_bg(title, opts=False):
    """Match the class / list picker alternatives off the main thread, then refresh
    the open class page."""
    key = (title, opts)
    if key in _detail_busy or getattr(mw, "col", None) is None:
        return
    _detail_busy.add(key)
    _busy_update()
    from aqt.operations import QueryOp
    from ..integrations import lectures

    def op(_col):
        if opts:
            return lectures.lecture_options(title)
        return lectures.match_event(title)

    def done(res):
        global _fams_on
        _detail_busy.discard(key)
        _busy_update()
        if opts:
            _opts_cache[title] = list(res or [])
            if len(_opts_cache) > 200:
                _opts_cache.pop(next(iter(_opts_cache)))
        elif res and _detail is not None and 0 <= _detail < len(_shown) \
                and _shown[_detail]["summary"] == title:
            _fams_on = {_fam(x) for x in res["searches"]} - _fams_off()
        if _view and _detail is not None and 0 <= _detail < len(_shown) \
                and _shown[_detail]["summary"] == title:
            _swap("refresh")

    def failed(_e):
        _detail_busy.discard(key)
        _busy_update()
    QueryOp(parent=mw, op=op, success=done).failure(failed).run_in_background()


def _detail_html(e):
    """A deck-overview-style page for one class: title, when/where, card counts, the
    source switches, a big Study button and Unsuspend below it."""
    from ..integrations import lectures
    # never match / list lectures here (main thread): use what's known, fill the rest
    # in from the background — the page opens at once even on a cold start
    m = lectures.peek_match(e["summary"])
    pending = m is lectures._PENDING
    if pending:
        m = None
        _detail_bg(e["summary"])
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
        cached = _opts_cache.get(e["summary"])
        if cached is None:
            _detail_bg(e["summary"], opts=True)
        _pick_opts = list(cached or [])
        if m["display"] not in _pick_opts:
            _pick_opts.insert(0, m["display"])
        # Janki's own drop-down (the system menu came out white-on-white here)
        items = "".join("<div class='jkd-opt%s' data-i='%d'>%s</div>"
                        % (" on" if o == m["display"] else "", n, html.escape(o))
                        for n, o in enumerate(_pick_opts))
        sub = ("<div class='jkd-sub'><div class='jkd-dd'>"
               "<button class='jkd-pick' onclick='jkdPick(event)' title='Pick the lecture "
               "this class belongs to'>%s</button><div class='jkd-menu'>%s</div></div></div>"
               % (html.escape(m["display"]), items))
    body = ""
    if pending:
        body = "<div class='jkd-counts'>Finding this lecture…</div>"
    elif not m:
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
        # known numbers stay on screen while they're re-counted (with a small spinner)
        _cc = _counts_cache.get(_count_key(m)) or _counts_last.get(m.get("key"))
        if _cc:                              # study buttons keep their numbers too
            QTimer.singleShot(0, lambda c=_cc: _set_study_counts(c[3] - c[2], c[3]))
        body = ("<div id='jkd-counts' class='jkd-counts'>%s</div>"
                % ((_counts_html(_cc) + " <i class='jkd-reload'></i>") if _cc else "… cards") +
                "<div class='jkd-sws'>%s</div>"
                "<div class='jkd-studies'>"
                "<button id='jkd-st-act' class='jkd-study' onclick=\"pycmd('janki:cal:det:study:active')\">"
                "Study unsuspended cards</button>"
                "<button class='jkd-study jkd-prac' onclick=\"pycmd('janki:cal:det:practice')\">"
                "Practice</button></div>"
                "<div class='jkd-secs'>"
                "<button id='jkd-st-sus' class='jkd-sec' onclick=\"pycmd('janki:cal:det:study:all')\">"
                "Study all cards</button>"
                "<button class='jkd-sec' onclick=\"pycmd('janki:cal:det:unsuspend')\">"
                "Unsuspend cards for this lecture</button>%s</div>"
                "<div class='jkd-note'>“Study all” unsuspends cards just for the session "
                "and suspends them again afterwards.</div>"
                "<div class='jkd-links'><a data-n='%d' onclick=\"jkdTags(this)\">Show %s ▾</a> · "
                "<a onclick=\"pycmd('janki:cal:det:wizard')\">Open in lecture wizard</a></div>"
                "<div id='jkd-tags' class='jkd-tags'><div class='jkd-tags-in'>%s</div></div>"
                % (sw, ("<button class='jkd-sec' onclick=\"pycmd('janki:cal:det:lms')\">"
                        "Open in LMS</button>") if e.get("url") else "",
                   _tag_count(m), _tags_word(_tag_count(m)), _tags_html(m)))
        QTimer.singleShot(0, lambda m=m: _recount(m))
    return ("<div class='jkc-grid jkc-detail'>"
            "<div class='jkd'><h2>%s%s</h2>%s<div class='jkd-when'>%s</div>%s%s</div></div>"
            % (html.escape(e["summary"]),
               (" <span class='jkc-m jkd-m' title='Mandatory'>%s</span>" % _STAR
                if e.get("mandatory") else ""),
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


_tag_list = []        # full tags behind the chips on the open class page (by index)


def _tag_count(m):
    """Tags a class searches (switched-on sources, opt-outs left out)."""
    if not m:
        return 0
    off = _fams_off()
    return sum(len(_tag_label(s)) for s in m["searches"] if _fam(s) not in off)


def _tags_word(n):
    return "1 tag" if n == 1 else "%d tags" % n


def _tag_count_html(m):
    n = _tag_count(m)
    return ("<span class='jkc-tc'> · %s</span>" % _tags_word(n)) if n else ""


def _tags_html(m):
    """The lecture's tags as chips, grouped by source (shown in the Show tags panel)."""
    from ..integrations import lectures
    global _tag_list
    groups = {}
    for s in m.get("_raw_searches", m["searches"]):
        groups.setdefault(_fam(s), []).extend(_tag_label(s))
    ex = set(m.get("excluded") or [])
    _tag_list = []
    parts = []

    def chip(full, short):
        _tag_list.append(full)
        off = full.strip("*").lower() in ex
        return ("<span class='jkd-chip%s' title='%s'>%s<b class='jkd-x' data-t='%d' "
                "title='%s'>%s</b></span>"
                % (" off" if off else "", html.escape(full), html.escape(short),
                   len(_tag_list) - 1, "Use this tag again" if off else
                   "Leave this tag out for this lecture", "+" if off else "−"))
    for f in ("ak", "huc", "aj"):
        if f not in groups:
            continue
        chips = "".join(chip(full, short) for full, short in groups[f][:60])
        more = len(groups[f]) - 60
        parts.append("<div class='jkd-tg'><div class='jkd-tgh'>%s</div>%s%s</div>"
                     % (lectures.FAMILY_LABEL.get(f, f), chips,
                        ("<span class='jkd-chip jkd-more'>+%d more</span>" % more) if more > 0 else ""))
    return "".join(parts) or "<div class='jkd-tgh'>No tags</div>"


def _recount(m):
    """New / due / suspended counts for the class (switched-on sources), off the main
    thread, then written into the page."""
    if getattr(mw, "col", None) is None:
        return
    q = _lecture_query(m, _fams_on)
    if not q:
        _set_counts("No sources switched on.")
        return
    key = _count_key(m)
    try:
        from aqt.operations import QueryOp

        def op(col):
            # one (cached) search for the lecture's cards, then ONE pass over those
            # cards for new / due / suspended — not three more filtered searches
            from ..integrations import lectures
            ids = sorted(lectures._find_base(col, q))
            new = due = sus = 0
            today = col.sched.today
            for i in range(0, len(ids), 900):
                for qu, typ, d in col.db.all(
                        "select queue, type, due from cards where id in (%s)"
                        % ",".join(map(str, ids[i:i + 900]))):
                    if qu == -1:
                        sus += 1
                    elif typ == 0:
                        new += 1
                    elif (qu == 2 and d <= today) or qu in (1, 3):
                        due += 1
            return (new, due, sus, len(ids))

        def ok(r):
            new, due, sus, tot = r
            _counts_cache[key] = r
            _counts_last[m.get("key")] = r
            if len(_counts_cache) > 200:
                _counts_cache.pop(next(iter(_counts_cache)))
            _set_study_counts(tot - sus, tot)
            _set_counts("<b>%d</b> cards · <span class=c-new>%d new</span> · "
                        "<span class=c-due>%d due</span> · <span class=c-sus>%d suspended</span>"
                        % (tot, new, due, sus))
        QueryOp(parent=mw, op=op, success=ok).run_in_background()
    except Exception as e:
        log("calendar recount: %s" % e)


_counts_cache = {}     # (lecture, sources) → last counts, so a redraw doesn't flash "…"
_counts_last = {}      # lecture → its latest counts (any sources): shown while recounting


def _count_key(m):
    return (m.get("key"), tuple(sorted(_fams_on)), tuple(m["searches"]))


def _counts_html(r):
    new, due, sus, tot = r
    return ("<b>%d</b> cards · <span class=c-new>%d new</span> · <span class=c-due>%d due</span>"
            " · <span class=c-sus>%d suspended</span>" % (tot, new, due, sus))


def _set_study_counts(active, sus):
    try:
        mw.web.eval("window.jkcCounts&&window.jkcCounts(null,%d,%d)" % (active, sus))
    except Exception:
        pass


def _set_counts(h):
    try:
        mw.web.eval("window.jkcCounts&&window.jkcCounts(%s)" % json.dumps(h))
    except Exception:
        pass


def _open_detail(i):
    global _detail, _fams_on
    from ..integrations import lectures
    if not (0 <= i < len(_shown)):
        return
    m = lectures.peek_match(_shown[i]["summary"])         # no matching on open
    if m is lectures._PENDING:
        m = None
    _fams_on = ({_fam(s) for s in m["searches"]} - _fams_off()) if m else set()
    _detail = i
    try:
        from . import sfx
        sfx.play("select")
    except Exception:
        pass
    _swap("open")


# ------------------------------------------------------------ weak areas ------
# "Identify Weak Areas": lectures you've already had, ranked by how under-studied they
# look — cards never started (suspended / new), recent recall, leeches and overdue
# cards — from the calendar + tag map + review history. All local.
WEAK = -1             # _detail value for the weak-areas page
_weak = None          # None = counting; else [row dicts] best (weakest) first


_weak_mode = "2w"      # "2w" = past two weeks · "block" = end of block (8 weeks)
_WEAK_SPAN = {"2w": 2, "block": 8}     # weeks, counting this one, Monday-aligned


def _weak_start(mode):
    """First day of the window: Monday of last week (2w) / 7 weeks before this one."""
    t = datetime.date.today()
    return t - datetime.timedelta(days=t.weekday() + 7 * (_WEAK_SPAN[mode] - 1))
_weak_cache = {}       # mode → (key, rows); key changes when the collection does
_weak_busy = set()
_weak_redo = set()      # views to recompute once background matching finishes


def open_weak():
    global _detail, _weak
    _detail = WEAK
    _weak = _weak_cached(_weak_mode)
    try:
        from . import sfx
        sfx.play("open")
    except Exception:
        pass
    _swap("open")
    QTimer.singleShot(0, _redraw_bottom)
    if _weak is None:
        _weak_compute(_weak_mode)


def _set_weak_mode(mode):
    global _weak_mode, _weak
    if mode not in _WEAK_SPAN or mode == _weak_mode:
        return
    _weak_mode = mode
    _weak = _weak_cached(mode)
    try:
        from . import sfx
        sfx.play("select")
    except Exception:
        pass
    _swap("refresh")
    if _weak is None:
        _weak_compute(mode)


_weak_gen = 0          # bumped whenever an operation changes cards/notes


def _weak_dirty(changes=None, handler=None):
    global _weak_gen
    try:
        if changes is None or getattr(changes, "card", True) or getattr(changes, "note", True):
            _weak_gen += 1
    except Exception:
        _weak_gen += 1


def _weak_key():
    # NO collection access here: this runs on the main thread, and asking the collection
    # anything while a background job holds it froze the window (33 s in a profile)
    from ..integrations import lectures
    lectures._excl_map()                     # a file stat; refreshes if edited
    return (_weak_gen, datetime.date.today(), tuple(sorted(_fams_off())), lectures._EXCL["mt"],
            tuple(sorted((k, tuple(v)) for k, v in lectures.source_decks().items())))


def _weak_cached(mode):
    hit = _weak_cache.get(mode)
    return hit[1] if hit and hit[0] == _weak_key() else None


def prewarm_weak():
    """Work out both views in the background (after the Calendar opens), one after the
    other, so the button shows results straight away without a burst of work."""
    if _closing:
        return
    # only the 2-week view: End of block (8 weeks of AnKing-heavy lectures) runs
    # when you actually open it
    if _weak_cached("2w") is None:
        _weak_compute("2w")


def _weak_compute(mode, then=None):
    """Three steps, so the collection is only held briefly:
      1. main thread, no collection: lectures from the in-memory matches → tag terms
      2. a short QueryOp: read notes' tags, cards' states, 30 days of revlog (+ the few
         non-tag terms via find_notes)
      3. a plain worker thread (collection free): match and score everything
    Lectures not matched yet are matched in the background and show up next time."""
    if _closing:
        return
    if mode in _weak_busy or getattr(mw, "col", None) is None:
        return
    from aqt.operations import QueryOp
    from ..integrations import lectures
    today = datetime.date.today()
    evs, _fresh = lectures.events_cached_between(_weak_start(mode), today)
    off = _fams_off()
    key = _weak_key()
    now_min = _now_min()
    _weak_busy.add(mode)
    _busy_update()

    # 1 ------------------------------------------------------------------------
    lecs, seen, pending = [], set(), False
    for e in sorted(evs, key=lambda x: x["date"], reverse=True):
        if e["start"] is None or _is_allday_kind(e["summary"]):
            continue
        if e["date"] == today and (e["end"] or 0) > now_min:
            continue                             # not had it yet
        m = lectures.peek_match(e["summary"])
        if m is lectures._PENDING:
            pending = True
            continue
        if not m or m["key"] in seen:
            continue
        seen.add(m["key"])
        atoms = [(_fam(x), a) for x in m["searches"] if _fam(x) not in off
                 for a in lectures._atoms([x])]
        if atoms:
            lecs.append((e, m, atoms))
    if pending:
        # older lectures not matched yet: match them, then work this view out again
        _weak_redo.add(mode)
        QTimer.singleShot(0, lambda: _prewarm(back=(today - _weak_start(mode)).days + 1))
    other = sorted({a for _e, _m, atoms in lecs for _f, a in atoms if _atom_plain(a) is None})
    _weak_progress(mode, 0.05)

    # 2 ------------------------------------------------------------------------
    def read(col):
        import time as _t
        data = {"notes": col.db.all("select id, tags from notes"),
                "cards": col.db.all("select id, nid, queue, type, due, "
                                    "case when odid then odid else did end from cards"),
                "rev": col.db.all("select cid, ease, count() from revlog where id > ? and "
                                  "type < 3 group by cid, ease",
                                  int((_t.time() - 30 * 86400) * 1000)),
                "today": col.sched.today, "other": {}, "allow": {}}
        lectures.detect_source_decks(col)
        for fam, names in lectures.source_decks().items():   # source's decks + subdecks
            ids = set()
            for name in names:
                did = col.decks.id_for_name(name)
                if did:
                    ids.update(col.decks.deck_and_child_ids(did))
            if ids:
                data["allow"][fam] = ids
        for a in other:
            try:
                data["other"][a] = set(col.find_notes(a))
            except Exception:
                data["other"][a] = set()
        return data

    # 3 ------------------------------------------------------------------------
    def crunch(data):
        import bisect
        import fnmatch
        import time as _t
        tag_nids, leech_nids = {}, set()
        for nid, tags in data["notes"]:
            for t in (tags or "").split():
                tl = t.lower()
                tag_nids.setdefault(tl, []).append(nid)
                if tl == "leech":
                    leech_nids.add(nid)
        keys = sorted(tag_nids)
        nid_cards = {}
        for cid, nid, q, typ, d, did in data["cards"]:
            nid_cards.setdefault(nid, []).append((cid, q, typ, d, did))
        allow = data.get("allow") or {}
        rev = {}
        for cid, ease, cnt in data["rev"]:
            g, b = rev.get(cid, (0, 0))
            rev[cid] = (g + cnt, b) if ease > 1 else (g, b + cnt) if ease == 1 else (g, b)
        data.clear()                              # drop the raw rows early
        cache = {}

        def atom_nids(a):
            if a in cache:
                return cache[a]
            pat = _atom_plain(a)
            out = set()
            if pat is None:
                out = other_hits.get(a, set())
            elif "*" in pat or "?" in pat:
                core = pat.strip("*")
                if "*" not in core and "?" not in core:          # *leaf* → substring
                    for k in keys:
                        if core in k:
                            out.update(tag_nids[k])
                else:
                    for k in keys:
                        if fnmatch.fnmatchcase(k, pat):
                            out.update(tag_nids[k])
            else:                                   # the tag and its ::children
                lo = bisect.bisect_left(keys, pat)
                for k in keys[lo:]:
                    if k == pat or k.startswith(pat + "::"):
                        out.update(tag_nids[k])
                    elif not k.startswith(pat):
                        break
            cache[a] = out
            return out

        rows, last = [], 0.0
        for idx, (e, m, atoms) in enumerate(lecs):
            if _closing:
                return []
            now = _t.monotonic()
            if now - last > 0.1:
                last = now
                f = 0.45 + 0.55 * idx / max(1, len(lecs))
                mw.taskman.run_on_main(lambda f=f: _weak_progress(mode, f))
            hits = {}                          # nid → families it was found through
            for fam, a in atoms:
                for nid in atom_nids(a):
                    hits.setdefault(nid, set()).add(fam)
            n = sus = new = due = leech = good = bad = 0
            for nid, fams in hits.items():
                lch = nid in leech_nids
                for cid, q, typ, d, did in nid_cards.get(nid, ()):
                    # a source tied to a deck only counts cards in that deck
                    if not any(f not in allow or did in allow[f] for f in fams):
                        continue
                    n += 1
                    if q == -1:
                        sus += 1
                    elif typ == 0:
                        new += 1
                    elif (q == 2 and d <= sched_today) or q in (1, 3):
                        due += 1
                    if lch:
                        leech += 1
                    gb = rev.get(cid)
                    if gb:
                        good += gb[0]; bad += gb[1]
            if not n:
                continue
            revs = good + bad
            recall = good / revs if revs else None
            active = n - sus                    # suspended cards aren't "not started"
            unstarted = new / active if active else 0.0
            score = (0.55 * unstarted + 0.3 * (1 - recall if recall is not None else 0.5)
                     + 0.15 * min(1.0, due / n * 3) + min(0.15, leech * 0.02))
            rows.append({"e": e, "m": m, "n": n, "sus": sus, "new": new, "due": due,
                         "active": active,
                         "leech": leech, "recall": recall, "revs": revs,
                         "unstarted": unstarted, "score": score})
        rows.sort(key=lambda r: -r["score"])
        return rows

    other_hits = {}
    sched_today = 0

    def done(rows):
        global _weak
        _weak_busy.discard(mode)
        _busy_update()
        _weak_cache[mode] = (key, rows)
        if _weak_mode == mode:
            _weak = rows
            if _view and _detail == WEAK:
                _swap("refresh")
        if then and _view:
            QTimer.singleShot(1500, then)

    def failed(err):
        _weak_busy.discard(mode)
        _busy_update()
        log("weak areas: %s" % err)

    def got(data):
        nonlocal sched_today
        other_hits.update(data.get("other") or {})
        sched_today = data.get("today", 0)
        _weak_progress(mode, 0.4)

        def fin(fut):
            try:
                done(fut.result())
            except Exception as ex:
                failed(ex)
        mw.taskman.run_in_background(lambda: crunch(data), fin, uses_collection=False)

    QueryOp(parent=mw, op=read, success=got).failure(failed).run_in_background()


def _atom_plain(a):
    """The lower-case tag pattern of a plain 'tag:…' term, else None."""
    t = a.strip().strip('"')
    if t.lower().startswith("tag:") and " " not in t and "(" not in t:
        return t[4:].lower()
    return None


# "Biweekly Assessment" (or "… Exam"): the assessment itself — not its feedback session,
# review, retake, etc.
_EXAM_RE = re.compile(r"\b(assessment|exam|examination)\b", re.I)
_NOT_EXAM = re.compile(r"\b(reviews?|prep|preparation|practices?|recaps?|q ?& ?a|tutorials?|"
                       r"info|feedback|debrief(?:ing)?s?|retakes?|re-?takes?|make-?ups?|"
                       r"remediation|orientation|results?|study|sessions?|walk-?through|"
                       r"overview|go-?over|osce|comp\.? ?hx|history|hx|physical|p\.? ?e\.?|"
                       r"standardi[sz]ed|sp|clinical|skills?)\b", re.I)
_BIWEEKLY = re.compile(r"\bbi-?weekly\b", re.I)
_EXAM_NUM = re.compile(r"(?:assessment|exam(?:ination)?)\s*#?\s*([ivx]{1,5}|\d{1,2})\b", re.I)


def _roman(n):
    out = ""
    for v, s_ in ((10, "X"), (9, "IX"), (5, "V"), (4, "IV"), (1, "I")):
        while n >= v:
            out += s_
            n -= v
    return out


def _exam_dates():
    """[(date, 'Biweekly III'), …] from the calendar's exam events, oldest first. Named
    from the event's own number if it has one, else counted within the block (the count
    restarts after a gap of over four weeks = a new block)."""
    from ..integrations import lectures
    seen, raw = set(), []
    evs = lectures._EV_CACHE.get("events") or []
    # a calendar that names them "Biweekly …" → only those are the exams (an OSCE such as
    # "Comp. Hx Assessment" or a physical exam then can't sneak in)
    need_bw = any(_BIWEEKLY.search(e.get("summary") or "") for e in evs)
    for e in evs:
        t = e.get("summary") or ""
        if need_bw and not _BIWEEKLY.search(t):
            continue
        if _EXAM_RE.search(t) and not _NOT_EXAM.search(t) and e["date"] not in seen:
            seen.add(e["date"])
            raw.append((e["date"], t))
    raw.sort()
    # one assessment can span days (two parts, a sitting per group): within 3 days = one
    merged = []
    for d, t in raw:
        if merged and (d - merged[-1][0]).days <= 3:
            merged[-1] = (d, merged[-1][1])       # count it once, dated by its last day
        else:
            merged.append((d, t))
    raw = merged
    out, n, prev = [], 0, None
    for d, t in raw:
        n = 1 if prev is None or (d - prev).days > 28 else n + 1
        prev = d
        m = _EXAM_NUM.search(t)
        if m:
            tok = m.group(1)
            num = int(tok) if tok.isdigit() else _unroman(tok.upper())
            if num:
                n = num                     # later unnumbered exams count on from here
            label = "Biweekly " + (_roman(num) if num else tok.upper())
        else:
            label = "Biweekly " + _roman(n)
        out.append((d, label))
    return out


def _unroman(t):
    vals = {"I": 1, "V": 5, "X": 10}
    try:
        tot, prevv = 0, 0
        for ch in reversed(t):
            v = vals[ch]
            tot += -v if v < prevv else v
            prevv = max(prevv, v)
        return tot
    except Exception:
        return 0


def _next_biweekly(exams):
    last = exams[-1][1].split()[-1] if exams else ""
    vals = {"I": 1, "V": 5, "X": 10}
    try:
        tot, prevv = 0, 0
        for ch in reversed(last):
            v = vals[ch]
            tot += -v if v < prevv else v
            prevv = max(prevv, v)
        return "Biweekly " + _roman(tot + 1)
    except Exception:
        return "Next biweekly"


def _weak_progress(mode, frac):
    """Fill the 'Looking through your lectures…' bar (only if that view is showing)."""
    if _view and _detail == WEAK and _weak is None and _weak_mode == mode and _app_active():
        try:
            mw.web.eval("(function(){var b=document.getElementById('jkw-prog');"
                        "if(b)b.style.width='%d%%';})()" % int(5 + 95 * frac))
        except Exception:
            pass


def _now_min():
    t = datetime.datetime.now()
    return t.hour * 60 + t.minute


def _date_label(d):
    return "%s, %s %d" % (_DAY[d.weekday()], d.strftime("%b"), d.day)


def _ago(d):
    n = (datetime.date.today() - d).days
    return "today" if n == 0 else "yesterday" if n == 1 else (
        "%d days ago" % n if n < 14 else "%d weeks ago" % (n // 7))


def _weak_html():
    seg = "".join("<button class='jkw-m%s' onclick=\"pycmd('janki:cal:weakmode:%s')\">%s</button>"
                  % (" on" if _weak_mode == k else "", k, l)
                  for k, l in (("2w", "Biweekly"), ("block", "End of block")))
    head = ("<div class='jkc-grid jkc-detail jkw'><div class='jkd'>"
            "<h2>Weak areas</h2><div class='jkw-seg'>%s</div>"
            "<div class='jkd-when'>Lectures since %s, least-studied first</div>"
            % (seg, _date_label(_weak_start(_weak_mode))))
    if _weak is None:
        return head + ("<div class='jkd-counts'>Looking through your lectures…</div>"
                       "<div class='jkw-pbar'><i id='jkw-prog'></i></div></div></div>")
    if not _weak:
        return head + ("<div class='jkd-counts'>No past lectures with cards found — "
                       "nothing to flag.</div></div></div>")
    def row(i, r):
        chips = []
        if not r.get("active", r["n"]):
            chips.append("<span class='jkw-c'>all suspended</span>")
        elif r["unstarted"] >= 0.05:
            chips.append("<span class='jkw-c jkw-bad'>%d%% not started</span>"
                         % round(100 * r["unstarted"]))
        if r["recall"] is not None:
            chips.append("<span class='jkw-c%s'>%d%% recall</span>"
                         % (" jkw-bad" if r["recall"] < 0.8 else "", round(100 * r["recall"])))
        else:
            chips.append("<span class='jkw-c'>no reviews in 30 days</span>")
        if r["due"]:
            chips.append("<span class='jkw-c'>%d due</span>" % r["due"])
        if r["leech"]:
            chips.append("<span class='jkw-c jkw-bad'>%d leech%s</span>"
                         % (r["leech"], "es" if r["leech"] != 1 else ""))
        act = r.get("active", r["n"])
        done_pct = round(100 * (1 - r["unstarted"])) if act else 0
        cards = ("%d cards" % r["n"]) if act == r["n"] else ("%d cards · %d active" % (r["n"], act))
        return (
            "<div class='jkw-row' onclick=\"pycmd('janki:cal:weak:open:%d')\">"
            "<div class='jkw-main'><div class='jkw-t'>%s</div>"
            "<div class='jkw-sub'>%s · %s</div>"
            "<div class='jkw-bar'><i style='width:%d%%'></i></div>"
            "<div class='jkw-chips'>%s</div></div>"
            "<div class='jkw-btns'>"
            "<button class='jkd-sec' onclick=\"event.stopPropagation();pycmd('janki:cal:weak:study:%d')\">Study</button>"
            "<button class='jkd-sec jkw-prac' onclick=\"event.stopPropagation();pycmd('janki:cal:weak:prac:%d')\">"
            "Practice</button></div></div>"
            % (i, html.escape(r["m"]["display"]), _ago(r["e"]["date"]), cards, done_pct,
               "".join(chips), i, i))

    rows = list(enumerate(_weak))
    start = _weak_start(_weak_mode)
    if _weak_mode in _weak_redo:
        head += ("<div class='jkw-more'><i></i>Matching older lectures — more will "
                 "appear shortly</div>")
    if _weak_mode != "block":
        out = [row(i, r) for i, r in rows[:40]]
        return head + "<div class='jkw-list'>%s</div></div></div>" % "".join(out)
    # End of block: one group per biweekly exam (the lectures each exam covers), newest
    # first; open one to see its lectures (still least-studied first). Without exams in
    # the calendar, plain two-week periods.
    exams = _exam_dates()
    groups, meta = {}, {}
    for i, r in rows:
        d = r["e"]["date"]
        if exams:
            k = next((n for n, (ed_, _lbl) in enumerate(exams) if d <= ed_), len(exams))
        else:
            k = max(0, (d - start).days // 14)
        groups.setdefault(k, []).append((i, r))
    out = []
    for k in sorted(groups, reverse=True):
        g = groups[k]
        dates = [r["e"]["date"] for _i, r in g]
        a, b = min(dates), max(dates)
        if exams:
            if k < len(exams):
                title = "%s <span class='jkw-gx'>· exam %s %d</span>" % (
                    exams[k][1], exams[k][0].strftime("%b"), exams[k][0].day)
            else:
                title = "%s <span class='jkw-gx'>· in progress</span>" % _next_biweekly(exams)
            span = "%s %d – %s %d" % (a.strftime("%b"), a.day, b.strftime("%b"), b.day)
        else:
            a = start + datetime.timedelta(days=14 * k)
            b = a + datetime.timedelta(days=11)
            title, span = "%s %d – %s %d" % (a.strftime("%b"), a.day, b.strftime("%b"), b.day), ""
        uns = sum(r["unstarted"] for _i, r in g) / len(g)
        weakest = g[0][1]["m"]["display"]
        out.append(
            "<details class='jkw-grp'%s><summary><span class='jkw-gt'>%s</span>"
            "<span class='jkw-gs'>%s%d lecture%s · %d%% not started · weakest: %s</span>"
            "<span class='jkw-bar jkw-gbar'><i style='width:%d%%'></i></span></summary>%s</details>"
            % (" open" if k == max(groups) else "", title, (span + " · ") if span else "",
               len(g), "" if len(g) == 1 else "s", round(100 * uns), html.escape(weakest),
               round(100 * (1 - uns)), "".join(row(i, r) for i, r in g[:40])))
    return head + "<div class='jkw-list'>%s</div></div></div>" % "".join(out)


_from_weak = False     # the open class page came from the weak-areas list


def _open_weak_lecture(i):
    """A weak-areas row → that lecture's class page (Back returns to the list)."""
    global _from_weak
    if not _weak or not (0 <= i < len(_weak)):
        return
    e = _weak[i]["e"]
    if e not in _shown:
        _shown.append(e)
    _from_weak = True
    _open_detail(_shown.index(e))


def _close_detail():
    global _detail, _from_weak
    if _detail is None:
        return False
    if _from_weak and _detail != WEAK:      # back to the weak-areas list
        _from_weak = False
        _detail = WEAK
        try:
            from . import sfx
            sfx.play("back")
        except Exception:
            pass
        _swap("back")
        return True
    _from_weak = False
    was_weak = _detail == WEAK
    _detail = None
    if was_weak:
        QTimer.singleShot(0, _redraw_bottom)
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
        fams = {_fam(s) for s in m["searches"]} - _fams_off()
    q = _lecture_query(m, fams)
    if not q:
        tooltip("Switch on at least one source first.")
        return
    col = mw.col
    try:
        _restore_suspended()
        _cleanup_temp()
        sus = _cids(col, q, "is:suspended") if which != "active" else []
        if sus:
            _save_resuspend(sus)
            col.sched.unsuspend_cards(sus)
        did = col.decks.new_filtered(TEMP_PREFIX + m["display"][:60])
        d = col.decks.get(did)
        if which == "suspended":
            term = _cid_term(sus)
        elif which == "active":
            term = _cid_term(_cids(col, q, "-is:suspended -is:buried"))
        else:
            term = _cid_term(_cids(col, q, "-is:buried"))
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
        ids = _cids(col, q, "is:suspended")
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


# mandatory: a small filled star (Janki's own mark)
# lecture wizard: a little magic wand (stick + sparkle)
_WAND = ("<svg width='15' height='15' viewBox='0 0 24 24' aria-hidden='true'><path d='M4 20L14.5 9.5' "
         "stroke='currentColor' stroke-width='2.2' stroke-linecap='round'/><path d='M17 2.5l.9 2.3 "
         "2.3.9-2.3.9-.9 2.3-.9-2.3-2.3-.9 2.3-.9zM20.5 11l.5 1.2 1.2.5-1.2.5-.5 1.2-.5-1.2-1.2-.5 "
         "1.2-.5zM10 3l.5 1.2 1.2.5-1.2.5-.5 1.2-.5-1.2-1.2-.5 1.2-.5z' fill='currentColor'/></svg>")
_STAR = ("<svg width='11' height='11' viewBox='0 0 24 24'><path d='M12 2.5l2.9 6.1 6.6.8-4.9 4.6"
         " 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z' fill='currentColor'/></svg>")
_SHIRT = ("<svg class='jkc-shirt' width='13' height='11' viewBox='0 0 26 22'><path d='M9 1"
          "L1 5l3 6 3-1.5V21h12V9.5l3 1.5 3-6-8-4c-.6 2-2.4 3.2-4 3.2S9.6 3 9 1z' fill='none'"
          " stroke='currentColor' stroke-width='2' stroke-linejoin='round'/></svg>")


def _lanes(items):
    """Side-by-side lanes for overlapping classes: {index: (lane, lanes in its cluster)}.
    Events that overlap (directly or through a chain) share a cluster; each takes the
    first free lane."""
    out = {}
    items = sorted(items, key=lambda ie: (ie[1]["start"], -(ie[1]["end"] or 0)))
    cluster, ends, c_end = [], [], -1

    def flush():
        for idx, ln in cluster:
            out[idx] = (ln, len(ends))
    for idx, e in items:
        st, en = e["start"], max(e["end"] or 0, e["start"] + 1)
        if cluster and st >= c_end:
            flush(); cluster, ends = [], []
        for ln, end in enumerate(ends):
            if end <= st:
                ends[ln] = en; break
        else:
            ln = len(ends); ends.append(en)
        cluster.append((idx, ln))
        c_end = max(c_end, en) if len(cluster) > 1 else en
    if cluster:
        flush()
    return out


def _is_allday_kind(summary):
    """Day-wide notices that come through as timed events (e.g. a dress code) belong
    in the all-day row, not across the time grid."""
    s = re.sub(r"[^a-z]", "", (summary or "").lower())   # "Dress: Code", "dress-code"…
    return "dresscode" in s


def _norm(s):
    return " ".join((s or "").lower().split())


_CSS = """<style>
/* Calendar page only: drop the (empty) deck table, its <br> and the page's top gap */
body center > table:first-of-type{display:none !important;}
body center > br{display:none !important;}
html body{padding-top:0 !important;margin-top:0 !important;justify-content:flex-start !important;}
html body > center{margin-top:0 !important;padding-top:0 !important;}
html,body{overflow-x:hidden !important;overscroll-behavior-x:none;}
#jkc{width:min(1100px,calc(100vw - 32px));margin:18px auto 24px;text-align:left;}
.jkc-bar{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:6px;margin:0 0 10px;}
.jkc-l{justify-self:start;}.jkc-r{justify-self:end;}
/* ‹ / ›: no background; slide outward on hover, press in on click */
.jkc-bar .jkc-arr{background:transparent !important;padding:6px 10px;align-self:center;
  /* drawn chevrons: text ‹ › sat below the date's middle */
  position:relative;}
/* invisible, generous hit area around each arrow (no layout change) */
.jkc-bar .jkc-arr::before{content:'';position:absolute;inset:-14px -26px;}
.jkc-bar .jkc-prev::before{right:-4px;}.jkc-bar .jkc-next::before{left:-4px;}
.jkc-bar .jkc-arr{
  transition:transform .22s cubic-bezier(.2,.8,.2,1),opacity .2s ease;opacity:.8;}
.jkc-bar .jkc-prev:hover,.jkc-bar .jkc-prev.kb{transform:translateX(-4px);opacity:1;}
.jkc-bar .jkc-next:hover,.jkc-bar .jkc-next.kb{transform:translateX(4px);opacity:1;}
.jkc-bar .jkc-prev:active,.jkc-bar .jkc-prev.press{transform:translateX(-4px) scale(.86);}
.jkc-bar .jkc-next:active,.jkc-bar .jkc-next.press{transform:translateX(4px) scale(.86);}
.jkc-ev.jk-kb{outline:2px solid rgba(255,255,255,.75);outline-offset:1px;}
#jkc .jk-kbf{outline:2px solid rgba(255,255,255,.8) !important;outline-offset:2px;border-radius:8px;}
.jkc-c{display:flex;align-items:center;gap:6px;}
.jkc-c .jkc-lbl{margin:0 6px;min-width:9em;text-align:center;}
.jkc-bar button{background:rgba(255,255,255,.08);color:inherit;border:none;border-radius:8px;
  display:inline-flex;align-items:center;justify-content:center;text-align:center;line-height:1.25;
  padding:4px 11px;cursor:pointer;transition:background .2s ease;}
.jkc-bar button:hover{background:rgba(255,255,255,.16);}
.jkc-lbl{font-weight:600;}
.jkc-grid{display:grid;grid-template-columns:52px repeat(var(--jkc-n,5),1fr);gap:0 6px;position:relative;padding-right:58px;  /* mirrors the hour column so the days sit centred */
  clip-path:inset(-40px 55px -40px -40px);  /* hour lines end with the last day, not in the margin */
  will-change:transform,opacity;}  /* layer made up front: first Day/3-day/Week zoom doesn't stall */
#jkc .jkc-segs{position:relative;display:inline-flex;background:rgba(255,255,255,.06) !important;border-radius:9px;padding:2px;margin-right:6px;}
.jkc-segs .jkc-seg{position:relative;z-index:1;white-space:nowrap;background:transparent !important;padding:3px 10px;border-radius:7px;transition:color .2s ease;}
.jkc-segs .jkc-seg.on{color:#cfe0ff;}
/* one pill behind the buttons that glides to the chosen view */
#jkc .jkc-pill{position:absolute;z-index:0;top:2px;bottom:2px;left:0;width:0;border-radius:7px;
  background:rgba(156,188,243,.28) !important;transition:transform .24s cubic-bezier(.2,.8,.2,1),width .24s cubic-bezier(.2,.8,.2,1);}
/* hours hug the bottom, level with the day bodies — so a taller all-day strip (a
   wrapped dress code) can never put the times out of line */
.jkc-hours{position:relative;align-self:end;height:var(--jkc-h);}
.jkc-hr{position:absolute;left:0;right:-9999px;border-top:1px solid rgba(255,255,255,.06);}
.jkc-hr span{position:absolute;top:-8px;left:0;font-size:.72em;opacity:.55;}
.jkc-col,.jkc-ghost{min-width:0;display:flex;flex-direction:column;}
.jkc-col .jkc-body{flex:none;}
.jkc-dh{text-align:center;font-size:.86em;opacity:.8;height:24px;line-height:24px;}
.jkc-today .jkc-dh{color:#9cbcf3;opacity:1;}
/* keyboard-chosen day: header lifts, body gets a soft ring */
#jkc .jkc-col.jk-kbday .jkc-dh{opacity:1;color:#fff;}
#jkc .jkc-col.jk-kbday .jkc-body{box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.28);}
.jkc-ads{overflow:hidden;flex:1;}
.jkc-body{position:relative;height:var(--jkc-h);border-radius:10px;background:rgba(255,255,255,.025);}
.jkc-today .jkc-body{background:rgba(156,188,243,.06);}
.jkc-ev{position:absolute;left:2px;right:2px;border-radius:8px;padding:3px 6px;overflow:hidden;box-sizing:border-box;
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
.jkc-ad{position:relative;margin:0 2px 2px;height:18px;line-height:16px;padding:0 8px !important;
  font-size:.74em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.jkc-ad .jkc-m{display:none;}
#jkc .jkc-shirt{vertical-align:-1px;margin-right:5px;opacity:.85;}
#jkc .jkc-dress{white-space:normal;height:auto;min-height:18px;line-height:1.25;padding:1px 8px !important;
  overflow:visible;text-overflow:clip;color:#ff9d8a !important;border-color:rgba(255,157,138,.6) !important;background:rgba(255,157,138,.1) !important;cursor:default;transform:none !important;filter:none !important;}
/* where you are in the day: a thin red line with a dot on today's column */
#jkc .jkc-now{position:absolute;left:0;right:0;height:0;z-index:5;pointer-events:none;display:none;
  border-top:2px solid #ff6b6b;}
#jkc .jkc-now::before{content:'';position:absolute;left:-5px;top:-6px;width:10px;height:10px;
  border-radius:50%;background:#ff6b6b !important;}
.jkc-narrow{padding:3px 5px !important;font-size:.84em;}
.jkc-narrow .jkc-m{transform:scale(.85);}
.jkc-more{opacity:.6;border:none !important;text-align:center;}
.jkc-t{font-weight:600;}
/* mandatory: an outlined M badge in the block's top-right corner */
.jkc-m{position:absolute;top:4px;right:4px;width:15px;height:15px;box-sizing:border-box;
  display:flex;align-items:center;justify-content:center;line-height:1;padding-top:1px;
  font-size:10px;font-weight:700;font-family:-apple-system,"Segoe UI",sans-serif;
  color:#ff9d8a;border:none;border-radius:0;}
.jkc-ev .jkc-t{padding-right:16px;}
.jkd-m svg{width:16px;height:16px;}
.jkc-ev:has(> .jkc-m) .jkc-t{padding-right:13px;}  /* room for the star */
.jkd-m{position:relative;top:-3px;right:auto;display:inline-flex;vertical-align:middle;width:20px;height:20px;
  font-size:13px;border-radius:5px;margin-left:6px;}.jkc-tm,.jkc-sub{opacity:.75;font-size:.92em;}
#jkc .jkc-r{display:flex;align-items:center;gap:6px;}
#jkc .jkc-r button{height:2em;box-sizing:border-box;}
#jkc .jkc-wand{padding:0 10px !important;}
#jkc .jkc-wand svg{display:block;}
#jkc-busy{position:fixed;right:14px;bottom:12px;z-index:50;display:flex;align-items:center;gap:7px;
  padding:4px 11px 4px 8px;border-radius:999px;font-size:.78em;color:#cfd6e4;pointer-events:none;
  background:rgba(20,22,30,.72) !important;border:1px solid rgba(255,255,255,.1);
  opacity:0;transform:translateY(6px);transition:opacity .25s ease,transform .25s ease;}
#jkc-busy.on{opacity:.9;transform:none;}
#jkc-busy i{width:10px;height:10px;border-radius:50%;border:2px solid rgba(156,188,243,.3);
  border-top-color:#9cbcf3;animation:jkcSpin .8s linear infinite;}
@keyframes jkcSpin{to{transform:rotate(360deg);}}
.jkc-tc{opacity:.75;}
#jkc .jkd-reload{display:inline-block;width:9px;height:9px;margin-left:4px;vertical-align:1px;border-radius:50%;
  border:2px solid rgba(156,188,243,.3);border-top-color:#9cbcf3;animation:jkcSpin .8s linear infinite;}
.jkc-empty{opacity:.7;text-align:center;margin:18px 0;}
.jkc-detail{display:block;position:relative;text-align:center;padding:4px 0 24px;}
.jkd-back{position:absolute;left:0;top:0;background:rgba(255,255,255,.08);color:inherit;border:none;
  border-radius:8px;padding:4px 11px;cursor:pointer;}
.jkd-back:hover{background:rgba(255,255,255,.16);}
.jkd{max-width:520px;margin:28px auto 0;}
.jkd h2{margin:0 0 4px;font-size:1.45em;}
.jkd-sub{margin-bottom:4px;}
/* lecture picker: a button (name centred, inset chevron) + Janki's own glass menu */
#jkc .jkc-grid.jkc-detail{clip-path:none;padding-right:0;}  /* no hour column here */
#jkc .jkd-dd{position:relative !important;display:inline-block;}
#jkc .jkd-pick{background:rgba(255,255,255,.07) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' fill='none' stroke='%23cfd3dc' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat right 9px center !important;
  color:inherit;border:1px solid rgba(255,255,255,.14);border-radius:8px;padding:3px 30px 3px 14px;
  font:inherit;cursor:pointer;max-width:min(520px,90vw);white-space:nowrap;overflow:hidden;
  text-overflow:ellipsis;transition:background-color .18s ease;}
#jkc .jkd-pick:hover,#jkc .jkd-dd.open .jkd-pick{background-color:rgba(255,255,255,.13) !important;}
#jkc .jkd-menu{position:absolute;left:50%;top:calc(100% + 6px);z-index:60;min-width:100%;
  width:max-content;max-width:min(640px,92vw);
  max-height:320px;overflow-y:auto;padding:5px;border-radius:12px;text-align:center;
  background:rgba(28,30,38,.97) !important;border:1px solid rgba(255,255,255,.12);
  box-shadow:0 10px 30px rgba(0,0,0,.45);opacity:0;pointer-events:none;
  transform:translate(-50%,-6px);transition:opacity .16s ease,transform .2s cubic-bezier(.2,.8,.2,1);}
#jkc .jkd-dd.open .jkd-menu{opacity:1;pointer-events:auto;transform:translate(-50%,0);}
.jkd-opt{padding:5px 14px;border-radius:8px;cursor:pointer;white-space:nowrap;font-size:.95em;}
#jkc .jkd-opt:hover{background:rgba(255,255,255,.1) !important;}
#jkc .jkd-opt.on{color:#cfe0ff;background:rgba(156,188,243,.2) !important;}
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
.jkd-secs{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:12px;}
.jkd-secs .jkd-sec{margin:0 !important;}
#jkc .jkw-seg{display:inline-flex;gap:2px;padding:2px;margin:6px 0 4px;border-radius:9px;
  background:rgba(255,255,255,.06) !important;}
#jkc .jkw-m{background:transparent !important;border:none;color:inherit;font:inherit;font-size:.88em;
  padding:3px 12px;border-radius:7px;cursor:pointer;opacity:.75;}
#jkc .jkw-m.on{background:rgba(156,188,243,.28) !important;color:#cfe0ff;opacity:1;}
#jkc .jkw-pbar{width:min(360px,70vw);height:5px;margin:10px auto 0;border-radius:3px;
  background:rgba(255,255,255,.1) !important;overflow:hidden;}
#jkc .jkw-pbar i{display:block;height:100%;width:5%;border-radius:3px;background:#9cbcf3 !important;
  transition:width .25s ease;}
#jkc .jkw-more{display:inline-flex;align-items:center;gap:7px;opacity:.75;font-size:.85em;margin-top:6px;}
#jkc .jkw-more i{width:10px;height:10px;border-radius:50%;border:2px solid rgba(156,188,243,.3);
  border-top-color:#9cbcf3;animation:jkcSpin .8s linear infinite;}
#jkc .jkw-grp{max-width:760px;margin:10px auto 0;text-align:left;border-radius:14px;padding:4px 6px 6px;
  background:rgba(255,255,255,.035) !important;border:1px solid rgba(255,255,255,.08);}
#jkc .jkw-grp summary{list-style:none;cursor:pointer;padding:8px 10px;display:grid;
  grid-template-columns:auto 1fr;gap:2px 12px;align-items:center;}
#jkc .jkw-grp summary::-webkit-details-marker{display:none;}
#jkc .jkw-grp summary::before{content:'›';grid-row:span 2;font-size:1.3em;opacity:.6;
  transition:transform .2s ease;display:inline-block;}
#jkc .jkw-grp[open] summary::before{transform:rotate(90deg);}
.jkw-gt{font-weight:700;}
.jkw-gx{font-weight:400;opacity:.7;font-size:.9em;}
.jkw-gs{grid-column:2;opacity:.7;font-size:.85em;}
#jkc .jkw-gbar{grid-column:2;margin-top:4px;}
#jkc .jkw-grp .jkw-row{margin:6px 4px;}
#jkc .jkw .jkw-list{max-width:760px;margin:14px auto 0;text-align:left;}
#jkc .jkw-row{cursor:pointer;transition:background-color .15s ease;display:flex;gap:14px;align-items:center;padding:10px 14px;margin:6px 0;border-radius:12px;
  background:rgba(255,255,255,.05) !important;border:1px solid rgba(255,255,255,.08);}
#jkc .jkw-row:hover{background:rgba(255,255,255,.09) !important;}
.jkw-main{flex:1;min-width:0;}
.jkw-t{font-weight:700;}
.jkw-sub{opacity:.7;font-size:.86em;margin:1px 0 5px;}
#jkc .jkw-bar{height:4px;border-radius:2px;background:rgba(255,255,255,.1) !important;overflow:hidden;}
#jkc .jkw-bar i{display:block;height:100%;background:#9cbcf3 !important;border-radius:2px;}
.jkw-chips{margin-top:6px;display:flex;gap:6px;flex-wrap:wrap;}
#jkc .jkw-c{font-size:.78em;padding:1px 8px;border-radius:999px;background:rgba(255,255,255,.08) !important;}
#jkc .jkw-c.jkw-bad{color:#ff9d8a;background:rgba(255,157,138,.12) !important;}
.jkw-btns{display:flex;gap:6px;flex:none;}
.jkw-btns .jkd-sec{margin:0 !important;}
#jkc .jkw-prac{color:#c9f7c9 !important;}
#jkc .jkd-prac{background:#9fe0a3 !important;color:#0f2e16 !important;margin-left:8px;}
#jkc .jkd-prac:hover{background:#b3ebb6 !important;}
#jkc .jkd-study2{background:rgba(156,188,243,.22) !important;color:#cfe0ff !important;
  font-size:.95em;padding:8px 22px;border-radius:12px;align-self:center;}
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
#jkc .jkd-chip .jkd-x{display:inline-block;margin-left:6px;width:15px;height:15px;line-height:14px;
  text-align:center;border-radius:50%;font-weight:700;cursor:pointer;opacity:.55;
  background:rgba(255,255,255,.1) !important;transition:opacity .15s ease,background-color .15s ease;}
#jkc .jkd-chip .jkd-x:hover{opacity:1;background:rgba(255,157,138,.3) !important;}
#jkc .jkd-chip.off{opacity:.45;text-decoration:line-through;}
#jkc .jkd-chip.off .jkd-x{text-decoration:none;}
#jkc .jkd-chip.off .jkd-x:hover{background:rgba(144,238,144,.3) !important;}
#jkc .jkd-chip{display:inline-block;margin:0 6px 6px 0;padding:3px 9px;border-radius:999px;font-size:.82em;
  background:rgba(255,255,255,.07) !important;border:1px solid rgba(255,255,255,.12);}
#jkc .jkd-more{opacity:.6;}
</style>"""

_JS = """<script>(function(){
 // ‹ / ›: the days slide out while Python builds the next ones (in parallel, no page
 // reload); jkcSwap then drops them in and slides them in from the other side.
 // Transform + opacity only, on its own layer, so it stays smooth.
 var EASE='cubic-bezier(.2,.8,.2,1)', outDone=null, step=null;
 function grid(){return document.querySelector('#jkc .jkc-grid');}
 window.jkcNav=function(dir){
   var g=grid();
   step=null;
   // 3-day moves one day: keep the grid and slide the days over by one column.
   var on=document.querySelector('#jkc .jkc-seg.on');
   if(g&&g.animate&&(dir==='next'||dir==='prev')&&on&&on.getAttribute('data-k')==='3'){
     var cs=g.querySelectorAll('.jkc-col');
     if(cs.length){var leave=cs[dir==='next'?0:cs.length-1];
       step={dir:dir,w:(cs.length>1?cs[1].offsetLeft-cs[0].offsetLeft:leave.offsetWidth+6),
             ghost:leave.cloneNode(true),left:leave.offsetLeft,top:leave.offsetTop,
             width:leave.offsetWidth};}
     outDone=null;
   } else if(g&&g.animate&&(dir==='next'||dir==='prev')){
     g.style.willChange='transform,opacity';
     var a=g.animate([{transform:'none',opacity:1},
                      {transform:'translateX('+(dir==='next'?-28:28)+'px)',opacity:0}],
                     {duration:120,easing:'ease-in',fill:'forwards'});
     outDone=a.finished.catch(function(){});
   } else outDone=null;
   pycmd('janki:cal:'+dir);
 };
 // the now-line: placed on render/swap, nudged every 30 s
 function nowLine(){var n=document.querySelector('#jkc .jkc-now');if(!n)return;
   var d=new Date(),m=d.getHours()*60+d.getMinutes(),lo=+n.dataset.lo,hi=+n.dataset.hi;
   if(m<lo||m>hi){n.style.display='none';return;}
   n.style.display='block';n.style.top=(100*(m-lo)/(hi-lo))+'%';}
 if(!window._jkNowT)window._jkNowT=setInterval(nowLine,30000);
 window.addEventListener('load',nowLine);setTimeout(nowLine,0);
 // Two-finger trackpad swipe ← / → : one step per swipe (the gesture's momentum tail
 // is ignored until the wheel goes quiet), and the page never scrolls sideways.
 var swAcc=0, swLock=false, swQuiet=null;
 window.addEventListener('wheel',function(e){
   if(!document.querySelector('#jkc .jkc-grid')||document.querySelector('#jkc .jkc-detail'))return;
   if(Math.abs(e.deltaX)<=Math.abs(e.deltaY))return;  // vertical scroll stays normal
   e.preventDefault();
   clearTimeout(swQuiet);swQuiet=setTimeout(function(){swAcc=0;swLock=false;},220);
   if(swLock)return;
   swAcc+=e.deltaX;
   if(Math.abs(swAcc)>60){var d=swAcc>0?'next':'prev';swLock=true;swAcc=0;
     press(d==='next'?'jkc-next':'jkc-prev');jkcNav(d);}
 },{passive:false});
 // bottom-right "Updating…" chip while background calendar work runs
 window.jkcBusy=function(on){var b=document.getElementById('jkc-busy');
   if(!b){b=document.createElement('div');b.id='jkc-busy';
     b.innerHTML="<i></i><span>Updating…</span>";document.body.appendChild(b);}
   b.classList.toggle('on',!!on);};
 // Counts can land while the class page is still sliding in (its elements don't
 // exist yet): keep them and apply as soon as the page is in place.
 var pendC=null,pendA=null;
 function applyCounts(){
   var c=document.getElementById('jkd-counts');if(c&&pendC!=null){c.innerHTML=pendC;pendC=null;}
   var x=document.getElementById('jkd-st-act'),y=document.getElementById('jkd-st-sus');
   if(x&&y&&pendA){x.textContent='Study unsuspended cards ('+pendA[0]+')';
     y.textContent='Study all cards ('+pendA[1]+')';pendA=null;}}
 window.jkcCounts=function(h,a,s){if(h!=null)pendC=h;if(a!=null)pendA=[a,s];applyCounts();};
 // Safety net: a class page still showing "…" asks for its counts again (up to 8×)
 var cWatch=null,cTries=0;
 function watchCounts(){clearTimeout(cWatch);cTries=0;tick();
   function tick(){cWatch=setTimeout(function(){
     var c=document.getElementById('jkd-counts');
     if(!c||!document.querySelector('#jkc .jkc-detail'))return;
     if((c.textContent.trim().charAt(0)==='…'||c.querySelector('.jkd-reload'))&&cTries++<8){
       try{pycmd('janki:cal:recount');}catch(x){}tick();}},1200);}}
 var inDone=null, lastInner='';
 window.jkcSwap=function(inner,dir){
   // A quiet refresh (matches arrived) never cuts a slide short, and is skipped when
   // nothing changed — replacing the page mid-slide read as a hitch.
   if(dir==='refresh'){
     if(inner===lastInner)return;
     if(outDone||inDone){var w=outDone||inDone;w.then(function(){jkcSwap(inner,'refresh');});return;}
   }
   function put(){
     var root=document.getElementById('jkc'); if(!root)return;
     lastInner=inner;
     var keep=root.querySelector('.jkc-l');            // the view switch keeps gliding
     root.innerHTML=inner;
     var fresh=root.querySelector('.jkc-l');
     if(keep&&fresh&&fresh.parentNode)fresh.parentNode.replaceChild(keep,fresh);
     pillInit();nowLine();applyCounts();watchCounts();
     if(selAfter){var sa=selAfter;selAfter=null;
       setTimeout(function(){var n=cols().length;selDay(sa==='first'?0:n-1,selRef);},0);}
     var g=grid(); if(!g||!g.animate)return;
     if(step&&step.dir===dir){                         // one-day slide (3-day view)
       var st=step;step=null;var sx=dir==='next'?st.w:-st.w;
       g.querySelectorAll('.jkc-col').forEach(function(c,i,all){
         var enter=(dir==='next'?i===all.length-1:i===0);
         c.animate(enter?[{transform:'translateX('+sx+'px)',opacity:0},{transform:'none',opacity:1}]
                        :[{transform:'translateX('+sx+'px)'},{transform:'none'}],
                   {duration:260,easing:EASE});});
       var gh=st.ghost;
       // the leaving day's copy is NOT a day: keyboard selection must never land on it
       gh.classList.remove('jkc-col','jk-kbday');gh.classList.add('jkc-ghost');
       gh.style.cssText+=';position:absolute;margin:0;pointer-events:none;left:'+
         st.left+'px;top:'+st.top+'px;width:'+st.width+'px;';
       g.appendChild(gh);
       var ga=gh.animate([{transform:'none',opacity:1},{transform:'translateX('+(-sx)+'px)',opacity:0}],
                         {duration:260,easing:EASE,fill:'forwards'});
       ga.finished.then(function(){gh.remove();}).catch(function(){gh.remove();});
       var f1=ga.finished.catch(function(){});inDone=f1;
       f1.then(function(){if(inDone===f1)inDone=null;});
       return;
     }
     g.style.willChange='transform,opacity';
     if(dir==='refresh')return;                       // quiet in-place update
     var from=dir==='next'?'translateX(28px)':(dir==='prev'?'translateX(-28px)':
              (dir==='zin'||dir==='open'?'scale(0.97)':(dir==='zout'||dir==='back'?'scale(1.03)':'none')));
     var a=g.animate([{transform:from,opacity:0},
                      {transform:'none',opacity:1}],{duration:dir==='today'?160:240,easing:EASE});
     a.finished.then(function(){g.style.willChange='';}).catch(function(){});
     var f2=a.finished.catch(function(){});inDone=f2;
     f2.then(function(){if(inDone===f2)inDone=null;});
   }
   if(outDone){var p=outDone;outDone=null;p.then(put);} else put();
 };
 // The view switch's pill: placed under the active option, glides when it changes.
 function pill(btn,anim){var p=document.querySelector('#jkc .jkc-pill');if(!p||!btn)return;
   if(!anim)p.style.transition='none';
   p.style.width=btn.offsetWidth+'px';p.style.top=btn.offsetTop+'px';p.style.height=btn.offsetHeight+'px';
   p.style.bottom='auto';p.style.transform='translateX('+btn.offsetLeft+'px)';
   if(!anim){void p.offsetWidth;p.style.transition='';}}
 // Fonts/glass can still be settling at first paint (0 width) — retry until measured.
 function pillInit(n){var b=document.querySelector('#jkc .jkc-seg.on');pill(b,false);
   n=n||0;if(b&&!b.offsetWidth&&n<40)requestAnimationFrame(function(){pillInit(n+1);});}
 window.addEventListener('load',function(){pillInit();});
 window.addEventListener('resize',function(){pillInit();});
 if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){pillInit();});
 document.addEventListener('DOMContentLoaded',function(){watchCounts();});
 if(document.readyState!=='loading')setTimeout(watchCounts,0);
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){pillInit();});
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
 function evs(){return Array.prototype.slice.call(document.querySelectorAll('#jkc .jkc-ev:not(.jkc-dress)'))
   .sort(function(a,b){var ra=a.getBoundingClientRect(),rb=b.getBoundingClientRect();
     return (ra.left-rb.left)||(ra.top-rb.top);});}
 // Class page / Weak areas: arrow keys walk every control (spatially), Enter clicks
 function kbItems(){return Array.prototype.slice.call(document.querySelectorAll(
   '#jkc .jkc-detail button, #jkc .jkc-detail .jkd-sw, #jkc .jkc-detail .jkd-links a,'+
   ' #jkc .jkc-detail .jkw-row, #jkc .jkc-detail summary, #jkc .jkc-detail .jkw-m,'+
   ' #jkc .jkc-detail .jkd-x')).filter(function(x){var r=x.getBoundingClientRect();
     return r.width>0&&r.height>0;});}
 function kbPick(el){var o=document.querySelector('#jkc .jk-kbf');if(o)o.classList.remove('jk-kbf');
   if(!el)return;el.classList.add('jk-kbf');try{pycmd('janki:sfx:move');}catch(x){}
   var r=el.getBoundingClientRect();if(r.top<0||r.bottom>innerHeight)el.scrollIntoView({block:'nearest'});}
 function kbNext(cur,k){var a=cur.getBoundingClientRect(),ax=a.left+a.width/2,ay=a.top+a.height/2,
   best=null,bd=1e9;
   kbItems().forEach(function(x){if(x===cur||x.contains(cur)||cur.contains(x))return;
     var b=x.getBoundingClientRect(),bx=b.left+b.width/2,by=b.top+b.height/2,dx=bx-ax,dy=by-ay;
     var ok=k==='ArrowRight'?dx>4&&Math.abs(dy)<a.height:k==='ArrowLeft'?dx<-4&&Math.abs(dy)<a.height:
            k==='ArrowDown'?dy>4:dy<-4;
     if(!ok)return;
     var d=(k==='ArrowDown'||k==='ArrowUp')?Math.abs(dy)*1+Math.abs(dx)*0.4:Math.abs(dx)+Math.abs(dy)*3;
     if(d<bd){bd=d;best=x;}});
   return best;}
 document.addEventListener('mousemove',function(){kbPick(null);},{passive:true});
 function cols(){return Array.prototype.slice.call(
   document.querySelectorAll('#jkc .jkc-grid:not(.jkc-detail) .jkc-col'));}
 function markDay(col){var o=document.querySelector('#jkc .jkc-col.jk-kbday');
   if(o&&o!==col)o.classList.remove('jk-kbday');if(col)col.classList.add('jk-kbday');}
 // ←/→ walk the days; past the first/last the view moves on and lands on the new day
 var selAfter=null, selRef=null;
 function selDay(i,ref){var cs=cols(),col=cs[i];if(!col)return;markDay(col);
   var best=null,bd=1e9;
   col.querySelectorAll('.jkc-body .jkc-ev').forEach(function(ev){
     var d=ref==null?ev.offsetTop:Math.abs(ev.offsetTop-ref);if(d<bd){bd=d;best=ev;}});
   if(best)sel(best);else{sel(null);markDay(col);try{pycmd('janki:sfx:move');}catch(x){}}}
 function sel(el){var c=document.querySelector('#jkc .jkc-ev.jk-kb');if(c)c.classList.remove('jk-kb');
   if(!el)markDay(null);
   if(el){el.classList.add('jk-kb');markDay(el.closest('.jkc-col'));try{pycmd('janki:sfx:move');}catch(x){}
     var r=el.getBoundingClientRect();if(r.top<0||r.bottom>innerHeight)el.scrollIntoView({block:'nearest'});}}
 document.addEventListener('keydown',function(e){
   if(e.metaKey||e.ctrlKey||e.altKey)return;
   var t=e.target;if(t&&(t.isContentEditable||/INPUT|TEXTAREA|SELECT/.test(t.tagName)))return;
   var k=e.key, det=document.querySelector('#jkc .jkc-detail');
   if(det){
     if(k==='Escape'||k==='Backspace'){e.preventDefault();kbPick(null);pycmd('janki:cal:det:back');return;}
     if(/^Arrow/.test(k)){e.preventDefault();
       var cur=document.querySelector('#jkc .jk-kbf');
       if(!cur){var f=kbItems()[0];if(f)kbPick(f);return;}       // first press: highlight
       var nx=kbNext(cur,k);
       if(nx)kbPick(nx);
       else if(k==='ArrowLeft'){kbPick(null);pycmd('janki:cal:det:back');}
       else if(k==='ArrowUp'){kbPick(null);pycmd('janki:toolbar');}
       return;}
     if(k==='Enter'||k===' '){e.preventDefault();
       var c2=document.querySelector('#jkc .jk-kbf');
       if(c2)c2.click();else pycmd('janki:cal:det:study:active');
       return;}
     return;}
   if(k==='ArrowLeft'||k==='ArrowRight'){e.preventDefault();
     var right=k==='ArrowRight',cs=cols(),cur=document.querySelector('#jkc .jkc-col.jk-kbday'),
         ci=cur?cs.indexOf(cur):-1,sv=document.querySelector('#jkc .jkc-ev.jk-kb'),
         ref=sv?sv.offsetTop:null;
     if(ci<0){var td=document.querySelector('#jkc .jkc-col.jkc-today');
       selDay(td?cs.indexOf(td):(right?0:cs.length-1),null);return;}
     var ti=ci+(right?1:-1);
     if(ti>=0&&ti<cs.length){selDay(ti,ref);return;}
     // off the edge: 3-day slides by one day (new day enters at that edge);
     // week/day views jump, landing on the near edge of the new days
     var three=(document.querySelector('#jkc .jkc-seg.on')||{}).getAttribute&&
               document.querySelector('#jkc .jkc-seg.on').getAttribute('data-k')==='3';
     selAfter=three?(right?'last':'first'):(right?'first':'last');selRef=ref;
     var d=right?'next':'prev';press(d==='next'?'jkc-next':'jkc-prev');jkcNav(d);return;}
   var all=evs(), c=document.querySelector('#jkc .jkc-ev.jk-kb'), i=c?all.indexOf(c):-1;
   if(k==='ArrowDown'){e.preventDefault();if(all.length)sel(all[Math.min(all.length-1,i+1)]);return;}
   if(k==='ArrowUp'){e.preventDefault();if(i<=0){sel(null);pycmd('janki:toolbar');}else sel(all[i-1]);return;}
   if((k==='Enter'||k===' ')&&c){e.preventDefault();
     pycmd('janki:cal:ev:'+c.getAttribute('data-i'));}
 },true);
 document.addEventListener('mousemove',function(){sel(null);},{passive:true,once:false});
 window.jkdPick=function(ev){ev.stopPropagation();
   var dd=ev.target.closest('.jkd-dd');if(!dd)return;
   var o=dd.classList.toggle('open');
   if(o){var on=dd.querySelector('.jkd-opt.on');if(on)on.scrollIntoView({block:'center'});}
   try{pycmd('janki:sfx:'+(o?'unfold':'fold'));}catch(x){}};
 document.addEventListener('click',function(e){
   var opt=e.target.closest&&e.target.closest('.jkd-opt');
   var dd=document.querySelector('#jkc .jkd-dd.open');
   if(opt){dd&&dd.classList.remove('open');pycmd('janki:cal:pick:'+opt.getAttribute('data-i'));return;}
   if(dd&&!e.target.closest('.jkd-dd'))dd.classList.remove('open');
 },true);
 document.addEventListener('keydown',function(e){
   var dd=document.querySelector('#jkc .jkd-dd.open');
   if(dd&&e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();dd.classList.remove('open');}
 },true);
 document.addEventListener('click',function(e){
   var x=e.target.closest&&e.target.closest('#jkc .jkd-x');if(!x)return;
   e.stopPropagation();var c=x.parentNode,off=c.classList.toggle('off');
   x.textContent=off?'+':'\u2212';x.title=off?'Use this tag again':'Leave this tag out for this lecture';
   pycmd('janki:cal:tagx:'+x.getAttribute('data-t')+':'+(off?1:0));
 },true);
 window.jkdTags=function(a){var t=document.getElementById('jkd-tags');if(!t)return;
   var o=t.classList.toggle('open'),n=+a.getAttribute('data-n'),w=n===1?'1 tag':n+' tags';
   a.textContent=o?'Hide '+w+' ▴':'Show '+w+' ▾';
   try{pycmd('janki:sfx:'+(o?'unfold':'fold'));}catch(x){}};
 document.addEventListener('click',function(e){
   var ev=e.target.closest&&e.target.closest('.jkc-ev:not(.jkc-dress)'); if(!ev)return;
   pycmd('janki:cal:ev:'+ev.getAttribute('data-i'));
 },true);
})();</script>"""


def _on_render(deck_browser, content):
    if not _view:
        return
    QTimer.singleShot(0, _redraw_bottom)
    QTimer.singleShot(300, _busy_update)      # the page reloaded: re-show the chip if busy
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


_PRACTICE_MIN = 3     # fewer related questions than this → treat as none


def practice_event(e):
    """Practice questions related to this class (its lecture's concept tags first,
    then wording), in a temporary filtered deck — judged like the Practice deck."""
    from aqt.utils import tooltip
    from aqt.operations import QueryOp
    from ..integrations import lectures
    m = lectures.match_event(e["summary"]) if e else None
    if not m:
        tooltip("No lecture matched for this class.")
        return
    name = m["display"]

    def op(_col):
        from ..integrations import qbank
        # concept leaves from EVERY source: the switches pick which card decks you
        # study, not which questions are related (AnKing off left only Hutch's few)
        srch = m.get("_raw_searches") or m["searches"]
        leaves = qbank._leaf_keys(list(qbank._leaves_from_searches(srch)))
        toks = qbank._tokens(name + " " + e["summary"])
        if not leaves:
            return []
        # the original matching (tags, near-miss tags, then wording); a stray hit or
        # two still means this lecture has no real bank
        if str(_cfg_get("practice_match", "lenient")) == "strict":   # exact tags only
            ids = qbank.intersperse_card_ids(leaves, toks, 40, use_text_fallback=False,
                                             exact_only=True)
        else:
            ids = qbank.intersperse_card_ids(leaves, toks, 40, relaxed=True)
        return ids if len(ids) >= _PRACTICE_MIN else []

    def done(cids):
        col = mw.col
        if not cids:
            tooltip("No related practice questions for “%s”." % name)
            return
        try:
            _cleanup_temp()
            did = col.decks.new_filtered(TEMP_PREFIX + "Practice · " + name[:50])
            d = col.decks.get(did)
            d["terms"] = [[_cid_term(cids), 99999, 0]]
            d["resched"] = True
            col.decks.save(d)
            col.sched.rebuild_filtered_deck(did)
            col.decks.select(did)
            try:
                from . import sfx
                sfx.play("practice")
            except Exception:
                pass
            close()
            mw.moveToState("review")
        except Exception as ex:
            log("calendar practice: %s" % ex)
            tooltip("Couldn't start practice: %s" % ex)
    QueryOp(parent=mw, op=op, success=done).run_in_background()


def study_lecture(m):
    """A temporary filtered deck with the lecture's due + new cards (suspended stay
    suspended). Filtered decks reschedule normally, so this counts like any review."""
    from aqt.utils import tooltip
    col = mw.col
    if col is None or not m or not m["searches"]:
        return
    search = _cid_term(_cids(col, list(m["searches"]),
                             "(is:due OR is:new) -is:suspended -is:buried"))
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
            if (nid.name.startswith(TEMP_PREFIX) or nid.name.startswith(_OLD_PREFIX)) \
                    and nid.id != keep:
                col.decks.remove([nid.id])
        # the empty parent older versions created — only if it really holds nothing
        # (removing a normal deck would delete its cards)
        pid = col.decks.id_for_name(_OLD_PARENT)
        if pid and not col.decks.children(pid) and \
                not col.db.scalar("select count() from cards where did = ? or odid = ?", pid, pid):
            col.decks.remove([pid])
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
            parts = cmd[5:].split(":")
            _set_mode(parts[0], parts[1] if len(parts) > 1 else "mode")
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
                    _fams_on.update({_fam(s) for s in m2["searches"]} - _fams_off())
                try:
                    from . import sfx
                    sfx.play("select")
                except Exception:
                    pass
                _swap("refresh")
        elif cmd.startswith("fam:"):
            f = cmd[4:]
            _fams_on.symmetric_difference_update({f})
            _save_fam(f, f in _fams_on)
            try:
                from . import sfx
                sfx.play("move")
            except Exception:
                pass
            _swap("refresh")
        elif cmd == "weak":
            open_weak()
        elif cmd.startswith("weakmode:"):
            _set_weak_mode(cmd[9:])
        elif cmd.startswith("weak:") and _weak:
            _, act, i = cmd.split(":")
            i = int(i)
            if 0 <= i < len(_weak):
                if act == "open":
                    _open_weak_lecture(i)
                elif act == "study":
                    study_event(_weak[i]["e"], None, "all")
                else:
                    practice_event(_weak[i]["e"])
        elif cmd == "det:practice":
            if _detail is not None and 0 <= _detail < len(_shown):
                practice_event(_shown[_detail])
        elif cmd.startswith("tagx:"):
            _, idx, off = cmd.split(":")
            idx = int(idx)
            if _detail is not None and 0 <= _detail < len(_shown) and 0 <= idx < len(_tag_list):
                from ..integrations import lectures
                m = lectures.match_event(_shown[_detail]["summary"])
                if m:
                    lectures.set_excluded(m["key"], _tag_list[idx], off == "1")
                    try:
                        from . import sfx
                        sfx.play("move")
                    except Exception:
                        pass
                    _recount(lectures.match_event(_shown[_detail]["summary"]))
        elif cmd == "recount":                 # the page is still showing "…"
            if _detail is not None and 0 <= _detail < len(_shown):
                from ..integrations import lectures
                title = _shown[_detail]["summary"]
                m = lectures.peek_match(title)
                if m is lectures._PENDING:
                    _detail_bg(title)
                elif m:
                    if not _fams_on:
                        _fams_on.update({_fam(x) for x in m["searches"]} - _fams_off())
                    c = _counts_cache.get(_count_key(m))
                    if c:                          # known already: just show it
                        _set_study_counts(c[3] - c[2], c[3])
                        _set_counts(_counts_html(c))
                    else:
                        _recount(m)
        elif cmd == "det:lms":
            if _detail is not None and 0 <= _detail < len(_shown) and _shown[_detail].get("url"):
                from aqt.utils import openLink
                openLink(_shown[_detail]["url"])
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


# "‹ Back" for a class page lives in the toolbar strip's top-left corner (the toolbar
# is its own webview), sized and centred on the nav pill so it reads as part of the bar.
_BACK_JS = r"""(function(on){var b=document.getElementById('jk-cal-back');
if(!on){if(b){b.classList.remove('in');setTimeout(function(){b&&b.remove();},220);}return;}
var t=document.querySelector('div.toolbar');if(!t)return;var r=t.getBoundingClientRect();
if(!b){b=document.createElement('button');b.id='jk-cal-back';
 b.innerHTML="<svg width='8' height='13' viewBox='0 0 9 14'><path d='M7 1L2 7l5 6' fill='none' "+
  "stroke='currentColor' stroke-width='1.9' stroke-linecap='round' stroke-linejoin='round'/></svg>"+
  "<span>Back</span>";
 b.onclick=function(){pycmd('janki:cal:det:back');};
 var st=document.getElementById('jk-cal-back-css');
 if(!st){st=document.createElement('style');st.id='jk-cal-back-css';st.textContent=
  "#jk-cal-back{position:fixed;left:16px;z-index:50;display:inline-flex;align-items:center;"+
  "justify-content:center;gap:7px;padding:0 16px;border:none;border-radius:999px;cursor:pointer;"+
  "background:rgba(0,0,0,.52) !important;color:inherit;font:inherit;font-weight:600;"+
  "box-shadow:0 1px 3px rgba(0,0,0,.25);opacity:0;transform:translateX(-8px);"+
  "transition:opacity .2s ease,transform .25s cubic-bezier(.2,.8,.2,1),background-color .18s ease;}"+
  "#jk-cal-back.in{opacity:1;transform:none;}"+
  "#jk-cal-back:hover{background:rgba(255,255,255,.14) !important;}"+
  "#jk-cal-back:hover svg{transform:translateX(-3px);}"+
  "#jk-cal-back svg{transition:transform .22s cubic-bezier(.2,.8,.2,1);}";
  document.head.appendChild(st);}
 document.body.appendChild(b);requestAnimationFrame(function(){b.classList.add('in');});}
b.style.top=r.top+'px';b.style.height=r.height+'px';})(%s);"""


def _sync_back():
    on = bool(_view and _detail is not None and getattr(mw, "state", None) == "deckBrowser")
    try:
        mw.toolbar.web.eval(_BACK_JS % ("true" if on else "false"))
    except Exception:
        pass


def _on_toolbar_redraw(*_a):
    if _view and _detail is not None:
        QTimer.singleShot(80, _sync_back)


def _on_state(new_state, old_state):
    if new_state != "deckBrowser":
        close()
    _sync_back()
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

                def wrapped(*a, _cur=cur, _key=key, **k):
                    was = _view
                    close()
                    if was and _key == "decks" and getattr(mw, "state", None) == "deckBrowser":
                        try:                       # Calendar → Decks: fade out, list rises in
                            from . import stats_embed
                            if not stats_embed.is_open():
                                stats_embed.animate_next_deck_render()
                                stats_embed.fade_then(
                                    lambda: stats_embed.fast_deck_redraw() or _cur(*a, **k),
                                    sound="page")
                                return None
                        except Exception:
                            pass
                    return _cur(*a, **k)
                wrapped._jk_cal_wrapped = True
                lh[key] = wrapped
    except Exception as e:
        log("calendar toolbar: %s" % e)


_warming = False
_pending_tries = 0      # caps background-match → refresh rounds per opening


_prewarm_back = [14]   # days back the background matching covers (End of block → 56)


def _prewarm(back=None):
    """Match the nearby fortnight's classes to lectures in the background, a few at a
    time: each batch is its own short collection job, so a class page's card count (or
    anything else) can slot in between instead of waiting for the whole run."""
    if _closing:
        return
    global _warming
    if back:
        _prewarm_back[0] = max(_prewarm_back[0], back)
    if _warming or getattr(mw, "col", None) is None:
        return
    from ..integrations import lectures
    t = datetime.date.today()
    evs, fresh = lectures.events_cached_between(
        t - datetime.timedelta(days=_prewarm_back[0]), t + datetime.timedelta(days=14))
    if not fresh:
        lectures.load_events_bg(lambda: QTimer.singleShot(0, _prewarm))
        return
    seen, todo = set(), []
    for e in sorted(evs, key=lambda e: abs((e["date"] - t).days)):   # nearest first
        title = e["summary"]
        if title not in seen and lectures.peek_match(title) is lectures._PENDING:
            seen.add(title)
            todo.append(title)
    if not todo:
        return
    _warming = True
    _busy_update()
    from aqt.operations import QueryOp

    def step(k):
        if _closing or k >= len(todo):
            finish()
            return
        batch = todo[k:k + 4]

        def op(_col):
            for title in batch:
                lectures.match_event(title)

        def ok(_r):
            QTimer.singleShot(0, lambda: step(k + len(batch)))

        def bad(_e):
            finish()
        QueryOp(parent=mw, op=op, success=ok).failure(bad).run_in_background()

    def finish():
        global _warming
        _warming = False
        _busy_update()
        for mode in list(_weak_redo):           # weak areas waiting on these matches
            _weak_redo.discard(mode)
            _weak_cache.pop(mode, None)
            if _view and _detail == WEAK and _weak_mode == mode:
                _weak_compute(mode)
            else:
                QTimer.singleShot(0, lambda m=mode: _weak_compute(m))
        QTimer.singleShot(200, prime)
        if _view and getattr(mw, "state", None) == "deckBrowser":
            _swap("refresh")                       # colours/labels now that matches exist
    step(0)


def _busy_update():
    """The little 'Updating…' chip in the page's bottom-right: on while background
    calendar work runs (matching, weak areas, class page lookups, calendar download)."""
    try:
        from ..integrations import lectures
        on = bool(_warming or _weak_busy or _detail_busy or lectures._EV_LOADING["on"])
        if _view:
            mw.web.eval("window.jkcBusy&&window.jkcBusy(%s)" % ("true" if on else "false"))
    except Exception:
        pass


def _schedule_prewarm():
    try:                                             # read the calendar file at once
        from ..integrations import lectures
        QTimer.singleShot(0, lambda: lectures.load_events_bg(
            lambda: QTimer.singleShot(500, prime)))
    except Exception:
        pass
    try:
        from . import stats_embed
        stats_embed._when_idle(_prewarm, 3000)       # match this fortnight early
    except Exception:
        pass


_closing = False


def _on_close():
    global _closing
    _closing = True
    try:
        from ..integrations import lectures
        lectures.CLOSING["on"] = True
    except Exception:
        pass


def _on_open():
    global _closing
    _closing = False
    try:
        from ..integrations import lectures
        lectures.CLOSING["on"] = False
    except Exception:
        pass


def _patch_bottom():
    """On the Calendar the deck list's bottom bar (Get Shared / Create Deck / Import)
    becomes one 'Identify Weak Areas' button; everywhere else it's Anki's own."""
    try:
        from aqt.deckbrowser import DeckBrowser, DeckBrowserBottomBar
        if getattr(DeckBrowser._drawButtons, "_jk_cal", False):
            return
        orig = DeckBrowser._drawButtons

        def draw(self):
            if not _view:
                return orig(self)
            # inside Weak areas the bar stays empty (no Identify / Load buttons)
            buf = "" if _detail == WEAK else \
                "<button onclick='pycmd(\"janki:cal:weak\");'>Identify Weak Areas</button>"
            self.bottom.draw(
                buf=buf,
                link_handler=self._linkHandler,
                web_context=DeckBrowserBottomBar(self))
        draw._jk_cal = True
        DeckBrowser._drawButtons = draw
    except Exception as e:
        log("calendar bottom bar: %s" % e)


def _redraw_bottom():
    try:
        if getattr(mw, "state", None) == "deckBrowser":
            mw.deckBrowser._drawButtons()
        # Weak areas has no bottom buttons: drop the whole strip so the list reaches
        # the window's bottom (an empty bar left a band of dead space)
        bw = getattr(mw, "bottomWeb", None)
        if bw is not None:
            want = not (_view and _detail == WEAK and mw.state == "deckBrowser")
            if bw.isVisible() != want:
                bw.setVisible(want)
    except Exception:
        pass


_sync_had_view = False


def _on_sync_start():
    global _sync_had_view
    _sync_had_view = bool(_view)


def _on_sync_done():
    """A sync shouldn't drop you out of the Calendar: if it did, put it straight back
    (re-using the page data — no wait for the post-sync refresh)."""
    global _view, _sync_had_view
    was, _sync_had_view = _sync_had_view, False
    if not was:
        return

    def back():
        global _view
        if not _view and getattr(mw, "state", None) == "deckBrowser":
            _view = True
            _redraw()
    QTimer.singleShot(0, back)
    QTimer.singleShot(400, back)


def install():
    _patch_bottom()
    try:
        gui_hooks.sync_will_start.append(_on_sync_start)
        gui_hooks.sync_did_finish.append(_on_sync_done)
    except Exception:
        pass
    try:
        mw.app.applicationStateChanged.connect(_on_app_state)
    except Exception:
        pass
    try:
        gui_hooks.operation_did_execute.append(_weak_dirty)
    except Exception:
        pass
    gui_hooks.profile_did_open.append(_on_open)
    gui_hooks.profile_will_close.append(_on_close)
    try:     # a collection (re)loaded / sync finished = definitely not shutting down
        gui_hooks.collection_did_load.append(lambda *_a: _on_open())
        gui_hooks.sync_did_finish.append(_on_open)
    except Exception:
        pass
    gui_hooks.profile_did_open.append(_schedule_prewarm)
    gui_hooks.profile_did_open.append(lambda: QTimer.singleShot(1500, _restore_suspended))
    gui_hooks.profile_did_open.append(lambda: QTimer.singleShot(1800, _cleanup_temp))
    gui_hooks.deck_browser_will_render_content.append(_on_render)
    gui_hooks.webview_did_receive_js_message.append(on_js_message)
    gui_hooks.state_did_change.append(_on_state)
    try:
        gui_hooks.top_toolbar_did_redraw.append(_on_toolbar_redraw)
    except Exception:
        pass
    gui_hooks.top_toolbar_did_init_links.append(install_toolbar)
