"""Statistics inside the main window.

Anki opens Statistics as its own opaque window. Janki instead shows the same graphs page
(Anki's own "graphs" SvelteKit page, in a StatsWebView) in a panel that swaps into the main
window's content area in place of the deck list / bottom bar — glassed and in the
Interface font. Esc or any main-window navigation (Decks, Practice, …) puts the
normal view back; clicking Stats again keeps you in Stats.

The panel is Janki's OWN widget, built once and only ever hidden/shown — never Anki's
NewDeckStats dialog reparented (that one deletes itself on close, which left dangling
references and crashed on the next open). Shift+Stats still opens Anki's legacy window.
"""

import json

from aqt import mw, gui_hooks

from ..util.config import log, GLASS, _cfg

_panel = None            # the persistent stats panel (built on first open)
_web = None
_pick_btn = None
_popup = None
_mode = "deck"           # "deck" (current deck) | "col" (whole collection)
_installed = False


def _glass_on() -> bool:
    return bool(GLASS and _cfg().get("enabled", True))


def _page_css() -> str:
    from ..user import css as _css, glass as _glass
    light = _glass._tint_is_light()
    ink = "0,0,0" if light else "255,255,255"
    font = _css.ui_font_stack().replace("'", "\\'")
    rules = (
        # Page background → the window's glass; graph cards → faint translucent panels.
        # Anki re-declares its theme colours below :root (night-mode body/containers), so
        # the overrides go on EVERY element or those nested declarations win.
        ":root,html,body,*{--canvas:transparent!important;--window-bg:transparent!important;"
        "--frame-bg:transparent!important;--canvas-elevated:rgba(%(ink)s,0.06)!important;"
        "--canvas-inset:rgba(%(ink)s,0.04)!important;--border-subtle:rgba(%(ink)s,0.12)!important;"
        "--border:rgba(%(ink)s,0.16)!important;}"
        "html,body{background:transparent!important;background-color:transparent!important;}"
        # No deck/collection/search/time-range bar: stats always show the current deck
        # over the last 12 months (Anki's defaults). Its spacer goes too.
        ".range-box,.range-box-pad{display:none!important;}"
        # (No mask on the page: masking the scroller forced a full repaint every scroll
        # frame. The top-edge fade is per-card opacity from _ANIM_JS instead.)
        "div.container{will-change:opacity;}"
    ) % {"ink": ink}
    if _glass_on():
        rules += "html body,html body *{font-family:%s!important;}" % font
    return rules


def _page_js() -> str:
    css = _page_css().replace("\\", "\\\\").replace("'", "\\'")
    # Works at document creation too (no <head> yet → waits for the root element).
    return ("(function(){var s=document.getElementById('__janki_stats_glass');"
            "if(!s){s=document.createElement('style');s.id='__janki_stats_glass';"
            "var put=function(){var r=document.head||document.documentElement;"
            "if(r){r.appendChild(s);return true;}return false;};"
            "if(!put()){new MutationObserver(function(m,o){if(put())o.disconnect();})"
            ".observe(document,{childList:true,subtree:true});}}"
            "s.textContent='" + css + "';})();")


# Graph cards (Anki's TitledContainer → div.container) reveal one after another, top to
# bottom: each fades up from slightly below with a light blur. Cards render as their data
# arrives, so a (rAF-throttled) observer queues late ones too. Respects reduced motion; a
# safety timer reveals anything still hidden after 4 s.
_ANIM_JS = (
    "(function(){if(window.__jkAnim)return;window.__jkAnim=1;"
    "var reduce=!!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);"
    # Cards are HIDDEN BY CSS from the moment they exist (no frame where a finished card
    # shows before the reveal hides it), until reveal() marks them .jk-vis. Opacity +
    # transform only (compositor-driven). Scoped to Anki's graph cards via :has().
    "var st=document.createElement('style');"
    "st.textContent=reduce?'':'div.container:has(> .position-relative):not(.jk-vis)"
    "{opacity:0!important;transform:translate3d(0,14px,0);}"
    ".jk-in{transition:opacity .42s ease-out,transform .5s cubic-bezier(.2,.8,.2,1);"
    "will-change:opacity,transform;}';"
    "function addStyle(){var r=document.head||document.documentElement;if(r){r.appendChild(st);"
    "return true;}return false;}"
    "if(!addStyle()){new MutationObserver(function(m,o){if(addStyle())o.disconnect();})"
    ".observe(document,{childList:true,subtree:true});}"
    # Top-edge fade: a card fades out over its last 180px as it scrolls up past the top
    # (opacity only; window scrolling stays on the compositor path). rAF-throttled,
    # written only when a card's value changes.
    "var tk=false;function fade(){tk=false;var cs=document.querySelectorAll('div.container');"
    "for(var i=0;i<cs.length;i++){var el=cs[i];var r=el.getBoundingClientRect();var o=1;"
    "if(r.top<0){o=Math.max(0,Math.min(1,r.bottom/Math.min(r.height,180)));}"
    "o=Math.round(o*20)/20;if(el.__jko!==o){el.__jko=o;el.style.opacity=o===1?'':String(o);}}}"
    "window.addEventListener('scroll',function(){if(!tk){tk=true;requestAnimationFrame(fade);}},"
    "{passive:true});"
    "var q=[],timer=null,safety=null,seen=new WeakSet(),pend=false,shown=0,warm=false;"
    "function reveal(el){el.classList.add('jk-in');el.classList.add('jk-vis');"
    "setTimeout(function(){el.classList.remove('jk-in');},650);}"
    # Stagger the first 6 cards; everything after joins the 6th.
    "function flush(){var el=q.shift();if(!el){timer=null;return;}reveal(el);shown++;"
    "if(shown>=6){while(q.length)reveal(q.shift());timer=null;return;}"
    "timer=setTimeout(flush,60);}"
    # Held (loaded in the background / panel closed): cards stay hidden until a replay.
    # Fresh load: a short beat for the graphs to draw; a replay goes on the next frame.
    "function kick(){if(window.__jkHold||!q.length)return;"
    "if(!timer)timer=setTimeout(function(){requestAnimationFrame(flush);},warm?0:50);"
    "if(safety)clearTimeout(safety);safety=setTimeout(function(){if(window.__jkHold)return;"
    "document.querySelectorAll('div.container:not(.jk-vis)').forEach(reveal);},3000);}"
    # (Re)queue a card: back to hidden instantly — no transition (jk-in dropped + reflow).
    "function add(el){if(seen.has(el))return;seen.add(el);if(reduce){el.classList.add('jk-vis');"
    "return;}el.classList.remove('jk-in');el.classList.remove('jk-vis');void el.offsetHeight;"
    "q.push(el);kick();}"
    "function scan(){pend=false;document.querySelectorAll('div.container').forEach(function(el){"
    "if(el.querySelector(':scope > .position-relative'))add(el);});}"
    "function reset(){if(timer){clearTimeout(timer);timer=null;}seen=new WeakSet();q=[];shown=0;}"
    "window.__jkHide=function(){window.__jkHold=true;reset();scan();};"
    "window.__jkReplay=function(){window.__jkHold=false;warm=true;reset();scan();kick();};"
    "function init(){scan();new MutationObserver(function(){if(!pend){pend=true;"
    "requestAnimationFrame(scan);}}).observe(document.body,{childList:true,subtree:true});}"
    "if(document.body)init();else document.addEventListener('DOMContentLoaded',init);"
    "})();"
)


def _animate(web) -> None:
    if web is None:
        return
    try:
        # Loaded while the panel is closed (background preload) → hold the cards hidden
        # until the next open replays them.
        web.eval("window.__jkHold=%s;" % ("false" if is_open() else "true") + _ANIM_JS)
    except Exception:
        pass


def _style_web(web) -> None:
    if not _glass_on() or web is None:
        return
    try:
        from aqt.qt import QColor, Qt
        web.page().setBackgroundColor(QColor(Qt.GlobalColor.transparent))
    except Exception:
        pass
    try:
        web.eval(_page_js())
    except Exception:
        pass


def _on_bridge_cmd(cmd: str) -> bool:
    # Same as NewDeckStats: clicking a graph element searches the Browser.
    if isinstance(cmd, str) and cmd.startswith("browserSearch"):
        try:
            import aqt
            _, query = cmd.split(":", 1)
            aqt.dialogs.open("Browser", mw).search_for(query)
        except Exception as exc:
            log("stats browserSearch: %s" % exc)
    return False


def _build():
    """Create the panel once and slot it (hidden) into the main layout next to mw.web."""
    global _panel, _web
    from aqt.qt import QWidget, QVBoxLayout, QShortcut, QKeySequence, Qt
    from aqt.webview import StatsWebView
    lay = getattr(mw, "mainLayout", None)
    if lay is None or getattr(mw, "web", None) is None:
        raise RuntimeError("main layout not found")
    panel = QWidget(mw.form.centralwidget)
    panel.setObjectName("jankiStatsPanel")
    panel.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground, True)
    panel.setAutoFillBackground(False)
    v = QVBoxLayout(panel)
    v.setContentsMargins(0, 0, 0, 0)
    v.setSpacing(0)
    web = StatsWebView(parent=panel)
    web.set_bridge_command(_on_bridge_cmd, panel)
    web.loadFinished.connect(lambda _ok: (_style_web(_web), _animate(_web), _apply_mode()))
    # Deck picker (replaces the page's own hidden deck/collection bar): a button that opens
    # a glass popup of top-level decks; subdecks stay folded until you press their "+".
    from aqt.qt import QHBoxLayout, QPushButton
    top = QHBoxLayout()
    top.setContentsMargins(12, 14, 12, 12)
    btn = QPushButton()
    btn.setMinimumWidth(280)
    btn.setMaximumWidth(460)
    btn.setCursor(Qt.CursorShape.PointingHandCursor)
    btn.clicked.connect(_show_picker)
    top.addStretch()
    top.addWidget(btn)
    top.addStretch()
    v.addLayout(top)
    v.addWidget(web, 1)
    esc = QShortcut(QKeySequence("Escape"), panel)
    esc.setContext(Qt.ShortcutContext.WidgetWithChildrenShortcut)
    esc.activated.connect(fade_close)
    idx = lay.indexOf(_main_host())
    lay.insertWidget(idx if idx >= 0 else 1, panel, 1)
    panel.hide()
    try:
        from ..user import css as _css, glass as _glass
        if _glass_on():
            panel.setStyleSheet(_glass._glass_dialog_qss(_glass._tint_is_light())
                                + "QWidget#jankiStatsPanel { background: transparent; }")
            _glass.register_glass_host(panel)       # panel lives forever → safe to keep
        _css.apply_widget_ui_font(panel)
    except Exception as exc:
        log("stats panel style: %s" % exc)
    _install_layout_guard(panel)
    _panel, _web, globals()["_pick_btn"] = panel, web, btn


def _deck_label(did) -> str:
    try:
        return mw.col.decks.name(int(did)).replace("::", " \u203a ")
    except Exception:
        return "Deck"


def _fill_decks() -> None:
    """Update the picker button's label to the current selection."""
    if _pick_btn is None:
        return
    if _mode == "col":
        text = "Whole collection"
    else:
        try:
            text = _deck_label(mw.col.decks.current()["id"])
        except Exception:
            text = "Deck"
    fm = _pick_btn.fontMetrics()
    from aqt.qt import Qt
    text = fm.elidedText(text, Qt.TextElideMode.ElideMiddle, _pick_btn.maximumWidth() - 44)
    _pick_btn.setText(text + "  \u25be")


def _deck_tree():
    """{name: {"id": did, "kids": {...}}} of all decks, nested by '::'."""
    root = {}
    try:
        decks = mw.col.decks.all_names_and_ids(skip_empty_default=True)
    except Exception:
        decks = []
    for d in decks:
        node, parts = None, d.name.split("::")
        level = root
        for part in parts:
            node = level.setdefault(part, {"id": None, "kids": {}})
            level = node["kids"]
        node["id"] = int(d.id)
    return root


def _show_picker() -> None:
    """Glass popup under the button: Whole collection + top-level decks; "+" unfolds a
    deck's subdecks (built lazily, so huge trees open instantly)."""
    global _popup
    from aqt.qt import (QFrame, QVBoxLayout, QHBoxLayout, QScrollArea, QWidget, QPushButton,
                        QToolButton, Qt, QPoint)
    from ..user import glass as _glass, css as _css
    light = _glass._tint_is_light()
    ink = "0,0,0" if light else "255,255,255"
    fg = "#1c1c1e" if light else "#f2f2f7"
    # Light tint only — the native rounded blur behind the popup does the frosting (a heavy
    # tint here read as a solid dark panel).
    bg = "rgba(246,246,248,0.30)" if light else "rgba(24,25,30,0.26)"
    try:
        cur = int(mw.col.decks.current()["id"])
    except Exception:
        cur = None

    pop = QFrame(_pick_btn, Qt.WindowType.Popup | Qt.WindowType.FramelessWindowHint)
    pop.setObjectName("jkDeckPopup")
    pop.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground, True)
    pop.setAttribute(Qt.WidgetAttribute.WA_DeleteOnClose, True)
    pop.setStyleSheet((
        "QFrame#jkDeckPopup { background: %(bg)s; border: 1px solid rgba(%(ink)s,0.14);"
        " border-radius: 10px; }"
        "QScrollArea, QScrollArea > QWidget > QWidget { background: transparent; border: none; }"
        "QPushButton#deckItem { background: transparent; border: none; text-align: left;"
        " padding: 4px 8px; color: %(fg)s; border-radius: 6px; }"
        "QPushButton#deckItem:hover { background: rgba(%(ink)s,0.12); }"
        "QPushButton#deckItem[current=\"true\"] { font-weight: bold; }"
        "QToolButton { background: transparent; border: none; color: rgba(%(ink)s,0.70);"
        " font-weight: bold; border-radius: 4px; }"
        "QToolButton:hover { background: rgba(%(ink)s,0.12); }"
        "QScrollBar:vertical { width: 6px; background: transparent; margin: 4px 2px; }"
        "QScrollBar::handle:vertical { background: rgba(%(ink)s,0.22); border-radius: 3px;"
        " min-height: 24px; }"
        "QScrollBar::add-line, QScrollBar::sub-line { height: 0; }"
    ) % {"bg": bg, "fg": fg, "ink": ink})
    outer = QVBoxLayout(pop)
    outer.setContentsMargins(5, 5, 5, 5)
    scroll = QScrollArea()
    scroll.setWidgetResizable(True)
    scroll.setHorizontalScrollBarPolicy(Qt.ScrollBarPolicy.ScrollBarAlwaysOff)
    host = QWidget()
    lay = QVBoxLayout(host)
    lay.setContentsMargins(0, 0, 0, 0)
    lay.setSpacing(1)
    scroll.setWidget(host)
    outer.addWidget(scroll)

    def _pick(did):
        pop.close()
        _choose(did)

    def _row(label, did, kids, depth, into):
        row = QHBoxLayout()
        row.setContentsMargins(depth * 16, 0, 0, 0)
        row.setSpacing(2)
        if kids:
            plus = QToolButton()
            plus.setText("+")
            plus.setFixedSize(20, 20)
            plus.setCursor(Qt.CursorShape.PointingHandCursor)
            row.addWidget(plus)
        else:
            plus = None
            row.addSpacing(22)
        item = QPushButton(label)
        item.setObjectName("deckItem")
        item.setCursor(Qt.CursorShape.PointingHandCursor)
        item.setProperty("current", "true" if (did is not None and did == cur and _mode == "deck")
                         or (did == "col" and _mode == "col") else "false")
        item.clicked.connect(lambda _c=False, d=did: _pick(d))
        row.addWidget(item, 1)
        into.addLayout(row)
        if plus is not None:
            sub = QWidget()
            sl = QVBoxLayout(sub)
            sl.setContentsMargins(0, 0, 0, 0)
            sl.setSpacing(1)
            sub.setVisible(False)
            into.addWidget(sub)
            built = {"done": False}

            def _toggle(_c=False, sub=sub, plus=plus, kids=kids, sl=sl, built=built):
                if not built["done"]:
                    for name in sorted(kids, key=str.lower):
                        k = kids[name]
                        _row(name, k["id"], k["kids"], depth + 1, sl)
                    built["done"] = True
                show = not sub.isVisible()
                sub.setVisible(show)
                plus.setText("\u2212" if show else "+")
                QTimerSafe(_fit)
            plus.clicked.connect(_toggle)

    _row("Whole collection", "col", None, 0, lay)
    tree = _deck_tree()
    for name in sorted(tree, key=str.lower):
        n = tree[name]
        _row(name, n["id"], n["kids"], 0, lay)
    lay.addStretch()
    try:
        _css.apply_widget_ui_font(pop)
    except Exception:
        pass

    def _fit():
        host.adjustSize()
        h = min(host.sizeHint().height() + 12, 12 * 28 + 12)
        pop.resize(max(_pick_btn.width(), 320), h)

    _fit()
    pos = _pick_btn.mapToGlobal(QPoint(0, _pick_btn.height() + 4))
    pos.setX(pos.x() + (_pick_btn.width() - pop.width()) // 2)
    pop.move(pos)
    try:
        if _glass_on():
            if _glass._popup_filter is None:
                _glass._popup_filter = _glass._GlassPopupShow()
            pop.installEventFilter(_glass._popup_filter)   # rounded native glass on show
    except Exception:
        pass
    _popup = pop
    pop.show()


def QTimerSafe(fn) -> None:
    try:
        from aqt.qt import QTimer
        QTimer.singleShot(0, fn)
    except Exception:
        pass


def _search_query() -> str:
    """The graphs page search for the current selection. A deck uses its id + all subdeck
    ids (did: is exact-deck-only, and ids avoid quoting/wildcard issues in deck names)."""
    if _mode == "col":
        return ""
    try:
        did = int(mw.col.decks.current()["id"])
        ids = mw.col.decks.deck_and_child_ids(did)
        return "did:" + ",".join(str(int(x)) for x in ids)
    except Exception:
        return "deck:current"


def _refresh_data() -> None:
    """Re-query the already-loaded graphs page through its (hidden) search box — the page
    re-fetches only the data; no page reload. A trailing space forces a re-query when the
    search text is unchanged (e.g. refreshing after reviews)."""
    global _loaded_key
    if _web is None:
        return
    q = _search_query()
    js = ("(function(q){var n=0;(function t(){"
          "var i=document.querySelector('.range-box input:not([type=radio])');"
          "if(i){if(i.value===q)q=q+' ';i.value=q;"
          "i.dispatchEvent(new Event('input',{bubbles:true}));"
          "i.dispatchEvent(new Event('change',{bubbles:true}));return;}"
          "if(++n<50)setTimeout(t,100);})();})(%s);" % json.dumps(q))
    try:
        _web.eval(js)
        _loaded_key = _load_key()
    except Exception as exc:
        log("stats refresh: %s" % exc)


def _apply_mode() -> None:
    """After a full page load: point the page at the current selection (the page itself
    starts on deck:current, which already matches deck mode)."""
    if _mode == "col":
        _refresh_data()


def _choose(data) -> None:
    global _mode
    if data == "col":
        _mode = "col"
        _fill_decks()
        _refresh_data()
        return
    if data is None:
        return
    _mode = "deck"

    def _after(_r=None):
        _fill_decks()
        _ensure_loaded()
    try:
        from aqt.operations.deck import set_current_deck
        from anki.decks import DeckId
        set_current_deck(parent=mw, deck_id=DeckId(int(data))).success(
            _after).run_in_background()
    except Exception as exc:
        log("stats deck pick: %s" % exc)


def is_open() -> bool:
    return _panel is not None and _panel.isVisible() and _panel.maximumHeight() > 0


# Hiding a QWebEngineView and showing it again makes Chromium rebuild its surface, which
# resets the page to an OPAQUE background — the deck list came back without glass. So the
# views are never hidden: the one not in use is collapsed to zero height instead, and the
# native glass is re-asserted (in a few passes, as Chromium settles) after every swap.
_saved_heights = {}


def _collapse(w) -> None:
    if w is None:
        return
    if w not in _saved_heights:
        _saved_heights[w] = (w.minimumHeight(), w.maximumHeight())
    w.setFixedHeight(0)


def _expand(w) -> None:
    if w is None:
        return
    mn, mx = _saved_heights.pop(w, (0, 16777215))
    w.setMinimumHeight(mn)
    w.setMaximumHeight(mx)


def _reglass() -> None:
    """Keep the swapped views' page backgrounds transparent (Chromium can reset a view to
    its opaque default when its surface is rebuilt). Only that — re-applying the whole
    native window glass (tint/blur/corners) several times visibly flickered the window, and
    isn't needed since the views are collapsed, never hidden."""
    try:
        from aqt.qt import QTimer
        from ..user import glass as _glass
        for d in (0, 250):
            QTimer.singleShot(d, _glass._clear_existing_webviews)
    except Exception as exc:
        log("stats reglass: %s" % exc)


def _main_host():
    """The widget that actually sits in the main layout around mw.web. Usually mw.web itself,
    but other add-ons can wrap it (e.g. a sidebar splitter) — collapsing only mw.web then
    left the wrapper holding half the window."""
    w = mw.web
    central = mw.form.centralwidget
    try:
        while w is not None and w.parentWidget() is not None and w.parentWidget() is not central:
            w = w.parentWidget()
    except Exception:
        return mw.web
    return w if w is not None else mw.web


def _collapse_others() -> None:
    """Give the stats panel the whole content area: collapse whatever holds the deck list
    (re-resolved each time — add-ons like AMBOSS may wrap mw.web later) and the bottom bar,
    and set the stretch factors."""
    if _panel is None:
        return
    others = [w for w in (_main_host(), getattr(mw, "bottomWeb", None)) if w is not None]
    for w in others:
        _collapse(w)
    _expand(_panel)
    try:
        lay = mw.mainLayout
        lay.setStretchFactor(_panel, 1)
        for w in others:
            lay.setStretchFactor(w, 0)
        lay.invalidate()
        lay.activate()
    except Exception:
        pass


def _install_layout_guard(panel) -> None:
    """While stats is open, something can re-grow the deck list area underneath (a deck
    list redraw resizes the bottom bar; AMBOSS resizes its wrapper), leaving stats half
    height. Re-assert the collapse whenever that happens (cheap check, 250 ms)."""
    from aqt.qt import QTimer
    t = QTimer(panel)
    t.setInterval(250)

    def _tick():
        if not is_open():
            return
        try:
            for w in (_main_host(), getattr(mw, "bottomWeb", None)):
                if w is not None and (w.height() > 0 or w.maximumHeight() != 0):
                    _collapse_others()
                    break
        except Exception:
            pass
    t.timeout.connect(_tick)
    t.start()


_RESET_JS = ("(function(){var b=document.body;if(b){b.style.transition='';"
             "b.style.opacity='';b.style.transform='';}})();")


def open_stats() -> None:
    if _panel is None:
        _build()
    _collapse_others()
    try:
        # The deck list was faded out on the way here; now that it's hidden behind Stats,
        # restore it — otherwise leaving Stats revealed a still-invisible list (a "dead"
        # first click on Decks) until a redraw replaced it.
        mw.web.eval(_RESET_JS)
    except Exception:
        pass
    if not _panel.isVisible():
        _panel.show()                            # first open only; afterwards it stays shown
    try:                                         # undo a previous fade-out on this page
        _web.eval(_RESET_JS)
    except Exception:
        pass
    global _mode
    _mode = "deck"
    _fill_decks()
    if not _ensure_loaded():
        # Page already current (preloaded, or nothing changed since) → instant; just replay
        # the reveal from the top.
        # Wait for the panel's resize to land first, so the page lays out at full height.
        def _replay():
            try:
                _web.eval("window.scrollTo(0,0);"
                          "window.__jkReplay&&window.__jkReplay();")
            except Exception:
                pass
        try:
            from aqt.qt import QTimer
            QTimer.singleShot(16, _replay)
        except Exception:
            _replay()
    _style_web(_web)
    _web.setFocus()
    _reglass()


_loaded_key = None


def _load_key():
    try:
        return (_mode, int(mw.col.decks.current()["id"]), int(mw.col.mod))
    except Exception:
        return None


_page_ready = False       # the graphs page has been fully loaded at least once


def _install_page_script() -> None:
    """Inject the glass CSS + reveal script at DOCUMENT CREATION (before the page paints),
    so a fresh load never flashes Anki's opaque canvas or finished cards first. Rebuilt
    before each full load (tint/font may have changed; hold = panel closed)."""
    try:
        from aqt.qt import QWebEngineScript
        scripts = _web.page().scripts()
        for old in scripts.find("janki-stats"):
            scripts.remove(old)
        src = ("window.__jkHold=%s;" % ("false" if is_open() else "true")
               + (_page_js() if _glass_on() else "") + _ANIM_JS)
        sc = QWebEngineScript()
        sc.setName("janki-stats")
        sc.setSourceCode(src)
        sc.setInjectionPoint(QWebEngineScript.InjectionPoint.DocumentCreation)
        sc.setWorldId(QWebEngineScript.ScriptWorldId.MainWorld)
        sc.setRunsOnSubFrames(False)
        scripts.insert(sc)
    except Exception as exc:
        log("stats page script: %s" % exc)


def _ensure_loaded(force: bool = False) -> bool:
    """Bring the page up to date. Full SvelteKit load only the first time (or when forced);
    afterwards a changed selection / collection just re-queries the data in place.
    Returns True if a FULL load was started."""
    global _loaded_key, _page_ready
    key = _load_key()
    if force or not _page_ready:
        _loaded_key = key
        _page_ready = True
        _install_page_script()
        _web.load_sveltekit_page("graphs")
        return True
    if key is None or key != _loaded_key:
        _refresh_data()
    return False


def _preload() -> None:
    """Build the panel and load the graphs page in the background after startup, so the
    first Stats click shows it instantly instead of spinning up a web page."""
    try:
        if not _cfg().get("stats_in_main", True) or getattr(mw, "col", None) is None:
            return
        if _panel is None:
            _build()
        global _mode
        _mode = "deck"
        _ensure_loaded()
    except Exception as exc:
        log("stats preload: %s" % exc)


# A short fade + drop-in for the deck list / Practice view when you switch to it (Stats has
# its own staggered card reveal). Runs in the page itself (Qt opacity effects blank or
# de-glass a web view); skipped under reduced motion; nothing lingers after it ends.
_DROP_JS = ("(function(){try{var b=document.body;if(!b)return;b.style.transition='';"
            "b.style.opacity='';b.style.transform='';"
            "if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)')"
            ".matches)return;if(!b.animate)return;"
            "document.documentElement.animate([{opacity:0,transform:'translateY(-8px)'},"
            "{opacity:1,transform:'none'}],{duration:200,easing:'cubic-bezier(.2,.8,.2,1)'});"
            "}catch(e){}})();")
_animate_next_deck = False

# The outgoing view fades out (and dips slightly) while the switch happens.
_FADE_OUT_JS = ("(function(){try{if(window.matchMedia&&matchMedia('(prefers-reduced-motion: "
                "reduce)').matches)return;var b=document.body;if(!b)return;"
                "b.style.transition='opacity .08s ease-out,transform .08s ease-out';"
                "b.style.opacity='0';b.style.transform='translateY(4px)';}catch(e){}})();")


def fade_then(fn, web=None, ms: int = 0) -> None:
    """Fade the current view out and run `fn` (the actual switch). Page switches start at
    once (ms=0): the old page fades WHILE the new one builds, instead of waiting for the
    fade and then for the build. Instant panel swaps (Stats) pass a short delay so their
    fade-out is still seen."""
    try:
        (web or mw.web).eval(_FADE_OUT_JS)
    except Exception:
        pass
    try:
        from aqt.qt import QTimer
        QTimer.singleShot(max(0, int(ms)), fn)
    except Exception:
        fn()


_defer_close = False      # Stats is fading out; don't let navigation close it instantly
_opening = False          # a Stats open is scheduled (ignore repeat clicks meanwhile)


def close_soon(ms: int = 110, timeout: int = 1500) -> None:
    """Leave Stats for another page. The stats page fades out while the deck list behind it
    is redrawn, and Stats is only removed once that NEW page has loaded (at least `ms` for
    the fade, at most `timeout`). Revealing the collapsed list any earlier showed its last
    painted frame — the old deck list or Practice view — for a moment."""
    global _defer_close
    if not is_open():
        return
    _defer_close = True
    try:
        _web.eval("(function(){try{var b=document.body;if(!b)return;b.style.transition="
                  "'opacity .1s ease-out,transform .1s ease-out';b.style.opacity='0';"
                  "b.style.transform='translateY(4px)';}catch(e){}})();")
    except Exception:
        pass
    import time as _time
    from aqt.qt import QTimer
    t0 = _time.monotonic()
    state = {"done": False}

    def _done():
        global _defer_close
        if state["done"]:
            return
        state["done"] = True
        try:
            mw.web.loadFinished.disconnect(_on_load)
        except Exception:
            pass
        _defer_close = False
        close(animate=False)
        drop_in(mw.web)                          # the new list is ready → drop it in

    def _on_load(_ok=True):
        wait = int(ms - (_time.monotonic() - t0) * 1000)
        QTimer.singleShot(max(0, wait), _done)

    try:
        mw.web.loadFinished.connect(_on_load)
    except Exception:
        pass
    QTimer.singleShot(timeout, _done)            # no page load came → close anyway


def fade_close() -> None:
    """Stats → deck list with the fade: stats page fades out, then the list drops in."""
    if is_open():
        fade_then(close, _web, 80)


def drop_in(web=None) -> None:
    try:
        (web or mw.web).eval(_DROP_JS)
    except Exception:
        pass


def fast_deck_redraw() -> bool:
    """Redraw the deck list re-using the deck tree Anki already has (skips the background
    database query — the slow part of a switch). Only when the list isn't stale (reviews /
    edits since set _refresh_needed). Returns False when a full refresh is needed."""
    try:
        db = mw.deckBrowser
        if getattr(mw, "state", None) != "deckBrowser" or getattr(db, "_refresh_needed", True) \
                or getattr(db, "_render_data", None) is None:
            return False
        db._renderPage(reuse=True)
        return True
    except Exception as exc:
        log("fast deck redraw: %s" % exc)
        return False


def animate_next_deck_render() -> None:
    """The next deck-list render (Practice ↔ Decks switch) plays the drop-in."""
    global _animate_next_deck
    _animate_next_deck = True


# Baked into the deck list's own HTML when a switch is pending, so the drop-in starts on the
# page's FIRST paint instead of waiting for the load to finish + a JS round trip (the full
# deck list takes longer to build than the Practice view, so that wait was noticeable).
# On <html> (not <body>): Janki's own deck-list fade (html.glass-fading body{animation})
# would otherwise override it; on the root the two simply combine.
_DROP_CSS = ("<style>@media (prefers-reduced-motion: no-preference){html{animation:"
             "jkDrop .2s cubic-bezier(.2,.8,.2,1) both;}}"
             "@keyframes jkDrop{from{opacity:0;transform:translateY(-8px);}"
             "to{opacity:1;transform:none;}}</style>")


def _on_will_set_content(web_content, context) -> None:
    global _animate_next_deck
    try:
        from aqt.deckbrowser import DeckBrowser
        if _animate_next_deck and isinstance(context, DeckBrowser):
            _animate_next_deck = False
            web_content.head += _DROP_CSS
    except Exception:
        pass


def close(animate: bool = True) -> None:
    if not is_open():
        return
    _collapse(_panel)
    try:
        _web.eval("window.__jkHide&&window.__jkHide();")   # hidden, ready for the next open
    except Exception:
        pass
    # Restore EVERYTHING that was collapsed (the host may have changed while open).
    for w in [w for w in list(_saved_heights) if w is not _panel]:
        try:
            _expand(w)
        except Exception:
            _saved_heights.pop(w, None)
    try:
        mw.web.setFocus()
    except Exception:
        pass
    if animate and not _animate_next_deck:     # a pending re-render animates instead
        drop_in(mw.web)
    _reglass()


def _on_state_change(new_state=None, *_a) -> None:
    # Any navigation in the main window (toolbar Decks, opening a deck, …) leaves stats —
    # unless a fade-out close is already under way (close_soon).
    if is_open() and not _defer_close:
        close()
    # Back on the deck list after reviews: refresh the (hidden) graphs quietly, so the next
    # Stats click shows current numbers instantly. Skipped while studying.
    if new_state == "deckBrowser" and _page_ready and _web is not None:
        try:
            from aqt.qt import QTimer

            def _bg():
                if is_open() or getattr(mw, "state", None) != "deckBrowser":
                    return
                global _mode
                _mode = "deck"
                if _load_key() != _loaded_key:
                    _refresh_data()
            QTimer.singleShot(1500, _bg)
        except Exception:
            pass


def _patched_on_stats(orig):
    def onStats(*a, **k):
        try:
            from aqt.utils import KeyboardModifiersPressed
            shift = KeyboardModifiersPressed().shift
        except Exception:
            shift = False
        if shift or not _cfg().get("stats_in_main", True):
            return orig(*a, **k)
        try:
            if not mw._selectedDeck():
                return None
            # Clicking Stats while it's open (or already opening — e.g. a double-click) keeps
            # you in Stats; leave with Esc or another toolbar button.
            global _opening
            if is_open() or _opening:
                return None
            _opening = True

            def _go():
                global _opening
                _opening = False
                open_stats()
            return fade_then(_go, None, 80)     # deck list fades out, stats reveals in
        except Exception as exc:
            log("stats panel failed, using the window: %s" % exc)
            return orig(*a, **k)
    return onStats


def _on_main_window_init() -> None:
    # The toolbar's Stats link calls mw.onStats at click time; the "T" shortcut was bound
    # when the window was built, so rebind it to the patched handler as well.
    orig = mw.onStats
    mw.onStats = _patched_on_stats(orig)
    try:
        from aqt.qt import QTimer
        QTimer.singleShot(6000, _preload)        # after launch settles
    except Exception:
        pass
    try:
        from aqt.qt import QShortcut, QKeySequence
        for sc in mw.findChildren(QShortcut):
            if sc.key() == QKeySequence("t"):
                try:
                    sc.activated.disconnect()
                except Exception:
                    pass
                sc.activated.connect(lambda: mw.onStats())
    except Exception as exc:
        log("stats shortcut: %s" % exc)


def _wrap_toolbar_links(links, toolbar) -> None:
    """Toolbar "Decks" while Stats is open: fade Stats out, then switch — the deck list
    drops in from its first frame (baked CSS). Plain Anki navigation closed Stats
    instantly, so the animation got lost in the page swap."""
    try:
        lh = getattr(toolbar, "link_handlers", None)
        if not isinstance(lh, dict) or "decks" not in lh:
            return
        cur = lh["decks"]
        if getattr(cur, "_janki_stats_wrapped", False):
            return

        def _decks(*a, **k):
            if is_open():
                animate_next_deck_render()
                close_soon()                  # stats fades out while the list builds
                if fast_deck_redraw():
                    return None
                return cur(*a, **k)
            return cur(*a, **k)
        _decks._janki_stats_wrapped = True
        lh["decks"] = _decks
    except Exception as exc:
        log("stats decks wrap: %s" % exc)


def install() -> None:
    global _installed
    if _installed:
        return
    _installed = True
    try:
        gui_hooks.main_window_did_init.append(_on_main_window_init)
        gui_hooks.state_did_change.append(_on_state_change)
        gui_hooks.webview_will_set_content.append(_on_will_set_content)
        gui_hooks.top_toolbar_did_init_links.append(_wrap_toolbar_links)
    except Exception as exc:
        log("stats embed: %s" % exc)
