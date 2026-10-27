"""The automatic syncs run in the background: when a profile opens, Anki's "Syncing…"
progress window (and busy cursor) is skipped; when Anki quits, the main window hides at
once and the sync + backup finish with no progress windows. The sync itself is unchanged;
Anki's own "synced" tooltip still reports the result, and any question it needs to ask
(e.g. a full sync) still appears. A sync started from the Sync button also runs without
the window: a slim bar beside the Sync button shows it's running instead.
Settings: `sync_in_background` (default on)."""
from aqt import gui_hooks, mw

from ..util.config import _cfg, log

_pending = False     # profile just opened → the next sync is the automatic one
_quiet = False       # that sync is running now
_exit_at = 0.0       # when Quit was asked for (a cancelled quit expires)
_exiting = False     # the close sync has started: everything until exit stays unseen
_manual = False      # a Sync-button sync is running: no window, a bar by the button

# Progress on the Sync button itself (Kome's sidebar row, the top bar, Onigiri's review
# header — shadow roots included): a fill sweeps across behind the label while the sync
# runs, easing toward ~90 % (Anki gives no real percentage), then completes and fades
# when it's done. Transform / opacity only, so nothing around it moves.
_BAR_JS = r"""(function(on){
 function roots(r,out){out.push(r);(r.querySelectorAll?r.querySelectorAll('*'):[]).forEach(
  function(e){if(e.shadowRoot)roots(e.shadowRoot,out);});return out;}
 function txt(e){return (e&&e.textContent||'').trim();}
 roots(document,[]).forEach(function(r){
  if(on&&!r.getElementById('jk-syncfill-css')){var st=document.createElement('style');
   st.id='jk-syncfill-css';st.textContent='.jk-sync-on{position:relative!important;}'
   +'.jk-syncfill{position:absolute;top:50%;height:2px;margin-top:-1px;pointer-events:none;'
   +'border-radius:1px;background:rgba(120,170,255,.85);transform-origin:left center;'
   +'transform:scaleX(0);}';
   (r.head||r).appendChild(st);}
  if(on){
   // the outermost element reading just "Sync" (the whole row / button, not its label)
   r.querySelectorAll('*').forEach(function(e){
    if(txt(e)!=='Sync'||txt(e.parentElement)==='Sync'||e.querySelector('.jk-syncfill'))return;
    if(/^(STYLE|SCRIPT|TITLE)$/.test(e.tagName))return;
    // the label itself (innermost element reading "Sync"): the line starts just past
    // its last letter and runs to the row's right edge
    var lab=e;while(true){var k=[].filter.call(lab.children,function(c){return txt(c)==='Sync';});
     if(!k.length)break;lab=k[0];}
    var rng=document.createRange();rng.selectNodeContents(lab);
    var er=e.getBoundingClientRect(),lr=rng.getBoundingClientRect();
    e.classList.add('jk-sync-on');var f=document.createElement('span');f.className='jk-syncfill';
    f.style.left=Math.round(lr.right-er.left+8)+'px';f.style.right='32px';   // short of the row's status dot
    e.appendChild(f);
    // one continuous curve (a mid keyframe made a visible change of pace): quick at
    // first, then slowing evenly toward 90 %
    try{f.__a=f.animate([{transform:'scaleX(0)'},{transform:'scaleX(.9)'}],
     {duration:14000,easing:'cubic-bezier(.15,.55,.25,1)',fill:'forwards'});}catch(x){}
   });
  }else{
   r.querySelectorAll('.jk-syncfill').forEach(function(f){
    var host=f.parentElement,from=getComputedStyle(f).transform;
    if(f.__a)try{f.__a.cancel();}catch(x){}
    function gone(){f.remove();if(host)host.classList.remove('jk-sync-on');}
    // glide to full, then fade (two animations, so each keeps its own smooth easing)
    try{var a=f.animate([{transform:from==='none'?'scaleX(0)':from},{transform:'scaleX(1)'}],
     {duration:420,easing:'cubic-bezier(.2,.8,.2,1)',fill:'forwards'});
     a.onfinish=function(){try{f.animate([{opacity:1},{opacity:0}],{duration:320,
      easing:'ease-out',fill:'forwards'}).onfinish=gone;}catch(x){gone();}};}catch(x){gone();}
   });
  }
 });})(ON)"""


def _show_bar(on):
    for w in (getattr(mw, "web", None), getattr(getattr(mw, "toolbar", None), "web", None)):
        try:
            if w is not None:
                w.eval(_BAR_JS.replace("(ON)", "(true)" if on else "(false)"))
        except Exception:
            pass


def _on_profile_open():
    global _pending
    _pending = bool(_cfg().get("sync_in_background", True))


def _on_sync_start():
    global _pending, _quiet, _exiting, _manual
    import time
    # the deck list redrawn as a sync starts (Onigiri's sync-status dot) loads with no
    # entry animations too, like the one after it finishes (css.py)
    mw._jk_quiet_render = time.monotonic()
    _quiet, _pending = _pending, False
    if not _quiet and _cfg().get("sync_in_background", True):
        _manual = True
        _show_bar(True)
    # the quit's own sync starts right after its windows close; a quit cancelled by a
    # window (unsaved Add, …) never gets here, and a later manual Sync is past this
    if _exit_at and time.monotonic() - _exit_at < 8:
        _exiting = True
    if _exiting:
        # quitting and every window has agreed to close: hide now, sync unseen
        try:
            mw.hide()
        except Exception:
            pass


def _on_sync_done():
    global _quiet, _manual
    # the deck list Anki redraws after a sync loads with no entry animations (css.py):
    # Kome's rise / fade replaying on an unchanged list read as a flicker
    import time
    mw._jk_quiet_render = time.monotonic()
    # …and with Onigiri, that redraw updates the open deck list in place (the live swap
    # Decks / Calendar / Practice use) instead of reloading the page: a sync reloaded it
    # twice in a second (start + finish), and the rebuild could show as a flicker. The
    # start's reload stays — it's what updates the Sync row's status dot. (Kome's top
    # charts refresh at the next normal deck-list load.)
    try:
        if getattr(mw, "state", None) == "deckBrowser" and not _exiting:
            from ..util import compat
            if compat.onigiri_on():
                from ..integrations import onigiri
                onigiri._arm_swap(quiet=True)   # same list: no entrance
    except Exception:
        pass
    _quiet = _exiting
    if _manual:
        _manual = False
        _show_bar(False)


def _hidden():
    return _quiet or _exiting or _manual


def install():
    try:
        from aqt import progress as _prog
        PM = _prog.ProgressManager
        if getattr(PM._showWin, "_jk_bg", False):
            return
        orig_show, orig_busy = PM._showWin, PM._set_busy_cursor

        def _showWin(self, *a, **k):
            if _hidden():
                self._shown = 1          # treated as shown (no later re-attempts)
                return None
            return orig_show(self, *a, **k)

        def _set_busy_cursor(self, *a, **k):
            if _hidden():
                return None
            return orig_busy(self, *a, **k)

        # Quitting: the window hides as the close sync starts; the sync and backup then
        # run unseen and the app exits when they're done (same as before, just hidden).
        from aqt.main import AnkiQt
        orig_exit = AnkiQt.unloadProfileAndExit

        def unloadProfileAndExit(self, *a, **k):
            global _exit_at
            import time
            # (not hidden yet: a window that refuses to close cancels the quit — the
            # window hides when the close sync starts, past that point)
            if _cfg().get("sync_in_background", True):
                _exit_at = time.monotonic()
            self._jk_quitting = True
            return orig_exit(self, *a, **k)
        AnkiQt.unloadProfileAndExit = unloadProfileAndExit

        # …and on quit, hide it the moment every other window has agreed to close (the
        # point past which the quit can't be cancelled). Anki only hides it after the
        # close sync and the backup, so for ~½ s an emptied glass window sat on screen.
        orig_close_sync = AnkiQt.maybe_auto_sync_on_open_close

        def maybe_auto_sync_on_open_close(self, *a, **k):
            if getattr(self, "_jk_quitting", False):
                try:
                    self.hide()
                except Exception:
                    pass
            return orig_close_sync(self, *a, **k)
        AnkiQt.maybe_auto_sync_on_open_close = maybe_auto_sync_on_open_close

        _showWin._jk_bg = True
        PM._showWin, PM._set_busy_cursor = _showWin, _set_busy_cursor
        # profile_did_open fires immediately before Anki's open-sync starts
        gui_hooks.profile_did_open.append(_on_profile_open)
        gui_hooks.sync_will_start.append(_on_sync_start)
        gui_hooks.sync_did_finish.append(_on_sync_done)
    except Exception as e:
        log("background sync: %s" % e)
