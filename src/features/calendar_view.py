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


def _go_week(delta):
    global _week
    _week = 0 if delta is None else _week + delta
    try:
        from . import sfx
        sfx.play("tab")
    except Exception:
        pass
    _redraw()


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
    monday = today - datetime.timedelta(days=today.weekday()) + datetime.timedelta(weeks=_week)
    sunday = monday + datetime.timedelta(days=4)        # weekdays only: Mon–Fri
    try:
        evs = lectures.events_between(monday, sunday)
    except Exception as e:
        log("calendar events: %s" % e)
        evs = []
    _shown = evs
    timed = [e for e in evs if e["start"] is not None]
    lo = min([e["start"] for e in timed] + [8 * 60])
    hi = max([e["end"] for e in timed] + [17 * 60])
    lo = (lo // 60) * 60
    hi = -(-hi // 60) * 60
    span = max(60, hi - lo)
    px_per_min = 0.9
    grid_h = int(span * px_per_min)

    cols = []
    for di in range(5):
        d = monday + datetime.timedelta(days=di)
        blocks, allday = [], []
        for i, e in enumerate(evs):
            if e["date"] != d:
                continue
            m = lectures.match_event(e["summary"])
            cls = "jkc-ev" + (" jkc-un" if not m else (" jkc-fz" if m["fuzzy"] else ""))
            title = html.escape(e["summary"])
            sub = html.escape(m["display"]) if m and _norm(m["display"]) != _norm(e["summary"]) else ""
            tip = html.escape(e["summary"] + (("\n→ " + m["display"]) if m else "\n(no lecture match)"))
            if e["start"] is None:
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
            % (" jkc-today" if d == today else "", _DAY[di], d.day, "".join(allday),
               grid_h, "".join(blocks)))
    hours = "".join("<div class='jkc-hr' style='top:%dpx'><span>%s</span></div>"
                    % (int((t - lo) * px_per_min), _hm(t)) for t in range(lo, hi + 1, 60))
    label = "%s %d – %s %d, %d" % (monday.strftime("%b"), monday.day,
                                    sunday.strftime("%b"), sunday.day, sunday.year)
    empty = ("" if evs else
             "<div class='jkc-empty'>No classes this week%s.</div>"
             % ("" if lectures._cfg().get("ics_path") else
                " — import your calendar in Load Lectures (⌘L)"))
    return (_CSS + "<div id='jkc'>"
            "<div class='jkc-bar'><button onclick=\"pycmd('janki:cal:prev')\">‹</button>"
            "<button onclick=\"pycmd('janki:cal:today')\">Today</button>"
            "<button onclick=\"pycmd('janki:cal:next')\">›</button>"
            "<span class='jkc-lbl'>%s</span><span class='jkc-sp'></span>"
            "<button onclick=\"pycmd('janki:cal:loader')\">Load Lectures…</button></div>"
            "%s<div class='jkc-grid'><div class='jkc-hours' style='height:%dpx'>%s</div>%s</div>"
            "</div>" % (label, empty, grid_h, hours, "".join(cols))
            + _JS)


def _norm(s):
    return " ".join((s or "").lower().split())


_CSS = """<style>
#jkc{width:min(1100px,calc(100vw - 32px));margin:4px auto 24px;text-align:left;}
.jkc-bar{display:flex;align-items:center;gap:6px;margin:0 0 10px;}
.jkc-bar button{background:rgba(255,255,255,.08);color:inherit;border:none;border-radius:8px;
  padding:4px 11px;cursor:pointer;transition:background .2s ease;}
.jkc-bar button:hover{background:rgba(255,255,255,.16);}
.jkc-lbl{font-weight:600;margin-left:6px;}.jkc-sp{flex:1;}
.jkc-grid{display:grid;grid-template-columns:52px repeat(5,1fr);gap:0 6px;position:relative;}
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
        content.stats = _week_html()
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
                                   func=open_calendar, tip="This week's classes",
                                   id="janki_calendar")
        idx = next((i for i, l in enumerate(links) if "sync" in l), len(links))
        links.insert(idx, link)
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


def install():
    gui_hooks.deck_browser_will_render_content.append(_on_render)
    gui_hooks.webview_did_receive_js_message.append(on_js_message)
    gui_hooks.state_did_change.append(_on_state)
    gui_hooks.top_toolbar_did_init_links.append(install_toolbar)
