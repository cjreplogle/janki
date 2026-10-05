"""Calendar page: a weekly view of your imported calendar, built on the lecture tag map.

Shown in the main window the same way the Practice view is (the deck browser's page,
swapped for a week grid while `_view` is on), so it gets the same fade/drop
transitions, toolbar handling and keyboard focus.

  • each class is a block at its time; matched lectures are blue, fuzzy matches have an
    amber edge, unmatched events are grey
  • click a class → Study (a temporary filtered deck of that lecture's due + new
    cards; reviews count normally), Show tags, or open it in Load Lectures
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
    global _view
    _view = False


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
    m = str(_cfg().get("calendar_view", "week"))
    if m == "2":
        m = "3"                                   # (the old 2-day view is now 3 days)
    return m if m in ("week", "1", "3") else "week"


def _set_mode(m, direction="mode"):
    global _anchor
    try:
        from . import sfx
        sfx.play("select")
    except Exception:
        pass
    try:
        c = mw.addonManager.getConfig(__name__) or {}
        c["calendar_view"] = m
        mw.addonManager.writeConfig(__name__, c)
    except Exception:
        pass
    _anchor = None
    _swap(direction)


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


def _week_html():
    global _shown
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
    for d in days:
        blocks, allday = [], []
        for i, e in enumerate(evs):
            if e["date"] != d:
                continue
            m = lectures.match_event(e["summary"])
            cls = "jkc-ev" + (" jkc-un" if not m else (" jkc-fz" if m["fuzzy"] else ""))
            title = html.escape(e["summary"])
            sub = html.escape(m["display"]) if m and _norm(m["display"]) != _norm(e["summary"]) else ""
            tip = html.escape(e["summary"] + (("\n→ " + m["display"]) if m else "\n(no lecture match)"))
            if e["start"] is None or _is_allday_kind(e["summary"]):
                allday.append("<div class='%s jkc-ad' data-i='%d' title='%s'>%s</div>"
                              % (cls, i, tip, title))
                continue
            top = int((e["start"] - lo) * px_per_min)
            h = max(22, int((e["end"] - e["start"]) * px_per_min) - 2)
            blocks.append(
                "<div class='%s' data-i='%d' title='%s' style='top:%dpx;height:%dpx'>"
                "<div class='jkc-t'>%s</div><div class='jkc-tm'>%s–%s</div>%s</div>"
                % (cls, i, tip, top, h, title, _hm(e["start"]), _hm(e["end"]),
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
        for k, l in (("1", "Day"), ("3", "3 Days"), ("week", "Week")))
    empty = ("" if evs else
             "<div class='jkc-empty'>No classes %s%s.</div>"
             % ("this week" if mode == "week" else "on these days",
                "" if lectures._cfg().get("ics_path") else
                " — import your calendar in Load Lectures (⌘L)"))
    # view switch left · ‹ Today date › centred · Load Lectures right
    bar = ("<div class='jkc-bar'>"
           "<div class='jkc-l'><span class='jkc-segs'>%s</span></div>"
           "<div class='jkc-c'><button onclick=\"jkcNav('prev')\">‹</button>"
           "<span class='jkc-lbl'>%s</span>"
           "<button onclick=\"jkcNav('next')\">›</button></div>"
           "<div class='jkc-r'><button onclick=\"jkcNav('today')\">Today</button> "
           "<button onclick=\"pycmd('janki:cal:loader')\">"
           "Load Lectures…</button></div></div>" % (seg, label))
    grid = ("<div class='jkc-grid' style='--jkc-n:%d'><div class='jkc-hours' "
            "style='height:%dpx'>%s</div>%s</div>" % (len(days), grid_h, hours, "".join(cols)))
    return bar + empty + grid


def _page_html():
    return _CSS + "<div id='jkc'>" + _week_html() + "</div>" + _JS


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
.jkc-fz{border-left:3px solid #e0b000;}
.jkc-un{background:rgba(255,255,255,.07);border-color:rgba(255,255,255,.14);opacity:.75;}
.jkc-ad{position:relative;margin:0 2px 3px;}
.jkc-t{font-weight:600;}.jkc-tm,.jkc-sub{opacity:.75;font-size:.92em;}
.jkc-empty{opacity:.7;text-align:center;margin:18px 0;}
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
     var g=grid(); if(!g||!g.animate)return;
     g.style.willChange='transform,opacity';
     var from=dir==='next'?'translateX(28px)':(dir==='prev'?'translateX(-28px)':
              (dir==='zin'?'scale(0.97)':(dir==='zout'?'scale(1.03)':'none')));
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
        na = menu.addAction("No lecture matched — fix it in Load Lectures")
        na.setEnabled(False)
    a_load = menu.addAction("Open this day in Load Lectures…")
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
            _event_menu(int(cmd[3:]))
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


def _prewarm():
    """Read this week's events + their lecture matches ahead of time (idle only), so
    opening the Calendar is instant."""
    try:
        from ..integrations import lectures
        for e in lectures.events_between(_days()[0], _days()[-1]):
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
    gui_hooks.deck_browser_will_render_content.append(_on_render)
    gui_hooks.webview_did_receive_js_message.append(on_js_message)
    gui_hooks.state_did_change.append(_on_state)
    gui_hooks.top_toolbar_did_init_links.append(install_toolbar)
