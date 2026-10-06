"""Arrow keys while reviewing: ↑ on the card goes up to the toolbar (on Decks), ↓ goes
down into the bottom bar — Show Answer, then Again / Hard / Good / Easy — where ←/→
pick a button and Enter/Space press it; ↑ from the bar returns to the card.
The arrows never scroll the card (that made a slightly-long card scroll before moving);
a long card scrolls with the wheel/trackpad.
Practice questions keep their own arrow keys (practice_keys) — left alone here."""
from aqt import gui_hooks, mw
from aqt.qt import QApplication, QEvent, QObject, Qt

from ..util.config import log

_CARD_JS = r"""<script>(function(){
 if(window.__jkRvKeys)return; window.__jkRvKeys=true;
 document.addEventListener('keydown',function(e){
   if(e.metaKey||e.ctrlKey||e.altKey||e.shiftKey)return;
   if(document.getElementById('jp-choices'))return;          // practice question
   var t=e.target;if(t&&(t.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)))return;
   // straight to navigation — the arrows never scroll the card first (wheel/trackpad do)
   if(e.key==='ArrowUp'){e.preventDefault();e.stopPropagation();
     pycmd('janki:sfx:move');pycmd('janki:toolbar');}
   else if(e.key==='ArrowDown'){e.preventDefault();e.stopPropagation();
     pycmd('janki:sfx:move');pycmd('janki:rvbottom');}
 },true);
})();</script>"""

_BAR_JS = r"""<style>html body button.jk-bsel{outline:none!important;
 border:2px solid rgba(176,203,246,0.8)!important;}</style>
<script>(function(){
 if(window.__jkBbKeys)return; window.__jkBbKeys=true;
 var active=false;
 function sfx(n){try{pycmd('janki:sfx:'+n);}catch(x){}}
 function btns(){return Array.prototype.filter.call(document.querySelectorAll('button'),
   function(b){return b.offsetParent!==null&&!b.disabled&&b.id!=='jk-bb-x';});}
 function cur(){return document.querySelector('button.jk-bsel');}
 function sel(b){var c=cur();if(c)c.classList.remove('jk-bsel');
   if(b){b.classList.add('jk-bsel');try{b.focus({preventScroll:true});}catch(x){}}}
 function pick(){var it=btns();
   return document.getElementById('ansbut')&&document.getElementById('ansbut').offsetParent!==null
     ? document.getElementById('ansbut')
     : (it.filter(function(b){return b.getAttribute('data-ease')==='3';})[0]||it[0]);}
 window.jkBottomEnter=function(){active=true;sel(pick());};
 function leave(){active=false;sel(null);pycmd('janki:bbleave');}
 // Show Answer → the ease buttons replace it: keep the keyboard here, on Good
 new MutationObserver(function(){if(active&&(!cur()||cur().offsetParent===null))sel(pick());})
   .observe(document.body,{subtree:true,childList:true});
 document.addEventListener('keydown',function(e){
   if(!active||e.metaKey||e.ctrlKey||e.altKey)return;
   var c=cur(),it=btns(),i=it.indexOf(c),k=e.key;
   if(k==='ArrowLeft'||k==='ArrowRight'){e.preventDefault();sfx('move');
     if(i<0){sel(pick());return;}
     sel(it[Math.max(0,Math.min(it.length-1,i+(k==='ArrowRight'?1:-1)))]);return;}
   if(k==='Enter'||k===' '){e.preventDefault();if(c){sfx('select');c.click();}return;}
   if(k==='ArrowUp'||k==='Escape'){e.preventDefault();sfx('move');leave();pycmd('janki:cardfocus');}
 },true);
 window.addEventListener('blur',function(){if(active)leave();});
 document.addEventListener('mousedown',function(){if(active)leave();},true);
})();</script>"""

_bar_active = False


def _in_review():
    return getattr(mw, "state", None) == "review"


def _on_card_will_show(text, card, kind):
    return text + _CARD_JS


def _on_content(web_content, context):
    try:
        from aqt.reviewer import ReviewerBottomBar
        if isinstance(context, ReviewerBottomBar):
            # body, not head: the script watches document.body (null in <head>), and
            # that error stopped it before its key listener was attached
            web_content.body += _BAR_JS
    except Exception as e:
        log("review keys bar: %s" % e)


def _on_js(handled, message, context):
    global _bar_active
    if message == "janki:rvbottom":
        try:
            if _in_review():
                _bar_active = True
                mw.bottomWeb.setFocus()
                mw.bottomWeb.eval("window.jkBottomEnter&&window.jkBottomEnter();")
        except Exception as e:
            log("review keys ↓: %s" % e)
        return (True, None)
    if message == "janki:bbleave":
        _bar_active = False
        return (True, None)
    if message == "janki:cardfocus":
        try:
            mw.web.setFocus()
        except Exception:
            pass
        return (True, None)
    return handled


class _BarKeys(QObject):
    """While the bottom bar or the toolbar has the keyboard during review, Space/Enter/
    arrows go to it — not to Anki's reviewer shortcuts (Enter/Space would otherwise
    flip or answer the card instead of opening what's selected)."""
    _KEYS = {Qt.Key.Key_Space, Qt.Key.Key_Return, Qt.Key.Key_Enter, Qt.Key.Key_Left,
             Qt.Key.Key_Right, Qt.Key.Key_Up, Qt.Key.Key_Escape}

    def eventFilter(self, obj, ev):
        try:
            if (ev.type() == QEvent.Type.ShortcutOverride and ev.key() in self._KEYS
                    and _in_review()):
                fw = QApplication.focusWidget()

                def inside(w):
                    return fw is not None and w is not None and (fw is w or w.isAncestorOf(fw))
                tw = getattr(getattr(mw, "toolbar", None), "web", None)
                # the bottom bar while it has a selection, or the toolbar (arrow-key
                # navigating up there): Enter opens the selected item, not the card
                if (_bar_active and inside(getattr(mw, "bottomWeb", None))) or inside(tw):
                    ev.accept()
        except Exception:
            pass
        return False


_filter = None


def install():
    global _filter
    gui_hooks.card_will_show.append(_on_card_will_show)
    gui_hooks.webview_will_set_content.append(_on_content)
    gui_hooks.webview_did_receive_js_message.append(_on_js)
    _filter = _BarKeys()
    QApplication.instance().installEventFilter(_filter)
