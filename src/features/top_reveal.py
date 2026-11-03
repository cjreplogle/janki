"""Reveal Anki's auto-hidden top bar (Decks / Browse / Sync) before the screen edge.

With "hide top bar during review" Anki shows the bar only when the pointer LEAVES the
card view — in full screen that's the very top pixel, which also drops the macOS menu
bar over it, so you had to go up and then back down to click. This shows the bar when
the pointer comes within _NEAR px of the top, and hands it back to Anki's own 2 s hide
timer once the pointer moves away (it never hides the bar while you're on it)."""
from aqt import gui_hooks, mw

_NEAR = 40      # px from the top of the card view that reveals the bar
_AWAY = 140     # px: moved this far down again -> Anki's hide timer runs

_JS = """<script>(function(){if(window.__jkTopRev)return;window.__jkTopRev=1;var on=0;
document.addEventListener('mousemove',function(e){
 if(!on&&e.clientY<=%d){on=1;pycmd('jktop:show');}
 else if(on&&e.clientY>=%d){on=0;pycmd('jktop:away');}},{passive:true});})();</script>""" % (_NEAR, _AWAY)


def _wanted() -> bool:
    try:
        return mw.state == "review" and bool(mw.pm.hide_top_bar())
    except Exception:
        return False


def _on_content(web_content, context) -> None:
    from aqt.reviewer import Reviewer
    if isinstance(context, Reviewer):
        web_content.head += _JS


def _on_msg(handled, message, context):
    if not isinstance(message, str) or not message.startswith("jktop:"):
        return handled
    try:
        if _wanted():
            tw = mw.toolbarWeb
            if message == "jktop:show":
                tw.hide_timer.stop()
                tw.show()
            else:
                tw.hide_timer.start()
    except Exception:
        pass
    return (True, None)


def install() -> None:
    gui_hooks.webview_will_set_content.append(_on_content)
    gui_hooks.webview_did_receive_js_message.append(_on_msg)
