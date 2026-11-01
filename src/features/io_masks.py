"""Older image occlusion (Image Occlusion Enhanced add-on) cards made in "hide one"
mode only cover the card's own box, so every other label on the image is readable —
going through a figure's cards in order gives the answers away. This adds a small
script to those note types' templates that also draws the note's full mask set
("Original Mask"), minus the card's own box, under the card's mask. Toggle Masks
hides them all. Settings → General; applied at startup and after imports/changes so
newly imported copies of the note type are covered. Templates only: notes and
scheduling are untouched; the change syncs to other devices (where loading the mask
fails, e.g. some mobile apps, the card just looks as before)."""
import re

from aqt import mw

START, END = "<!--janki-io-all-start-->", "<!--janki-io-all-end-->"
SNIP = START + r"""
<div id="jk-io-all-src" style="display:none">{{Original Mask}}</div>
<div id="jk-io-cur-src" style="display:none">{{Question Mask}}</div>
<style id="jk-io-hold">#io-original,#io-overlay{visibility:hidden!important}</style>
<script>
(function(){
  function show(){ var h=document.getElementById('jk-io-hold'); if(h) h.remove(); }
  setTimeout(show,1500);   // never leave the card blank
try{
  var ov=document.getElementById('io-overlay'); if(!ov){ show(); return; }
  var o=document.querySelector('#jk-io-all-src img'), q=document.querySelector('#jk-io-cur-src img');
  if(!o){ show(); return; }
  var cur=q?decodeURIComponent((q.getAttribute('src')||'').split('/').pop()).replace(/-Q\.svg$/,''):'';
  var old=ov.querySelector('.jk-io-all'); if(old) old.remove();
  fetch(o.src).then(function(r){return r.text();}).then(function(txt){
    var doc=new DOMParser().parseFromString(txt,'image/svg+xml');
    if(cur){ var me=doc.getElementById(cur); if(me) me.remove(); }
    // the card's own box: drawn by the Question Mask (front) / revealed (back)
    var url='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(new XMLSerializer().serializeToString(doc));
    var base=ov.querySelector('img'); if(!base){ show(); return; }
    var img=document.createElement('img'); img.className='jk-io-all'; img.onload=img.onerror=show; img.src=url;
    function place(){
      if(getComputedStyle(ov).position==='static') ov.style.position='relative';
      img.style.cssText='position:absolute;pointer-events:none;left:'+base.offsetLeft+'px;top:'+base.offsetTop+'px;width:'+base.offsetWidth+'px;height:'+base.offsetHeight+'px';
    }
    ov.insertBefore(img, base);   // under the card's own (red) mask
    if(base.complete) place(); else base.addEventListener('load',place);
    window.addEventListener('resize',place);
  }).catch(show);
}catch(e){ show(); }})();
</script>
""" + END




def _targets(col):
    for m in col.models.all():
        names = {f["name"] for f in m["flds"]}
        if {"Question Mask", "Original Mask"} <= names:
            yield m


def _strip(s):
    return re.sub(re.escape(START) + ".*?" + re.escape(END) + r"\n?", "", s, flags=re.S)


def _with(s):
    s = _strip(s)
    return s.replace("{{/Image}}", SNIP + "\n{{/Image}}", 1) if "{{/Image}}" in s else s + SNIP


def apply(col=None, on=True) -> int:
    """Add (on) or remove the script. Only writes note types that change."""
    col = col or mw.col
    n = 0
    for m in list(_targets(col)):
        changed = False
        for t in m["tmpls"]:
            for k in ("qfmt", "afmt"):
                new = _with(t[k]) if on else _strip(t[k])
                if new != t[k]:
                    t[k] = new
                    changed = True
        if changed:
            col.models.update_dict(m)
            n += 1
    return n


def enabled() -> bool:
    from ..util.config import _cfg
    return bool(_cfg().get("io_keep_all_masks", True))


def maybe_apply(*_a) -> None:
    try:
        if mw.col and enabled():
            apply(mw.col, True)
    except Exception as exc:
        from ..util.config import log
        log("io masks: %s" % exc)


def install() -> None:
    from aqt import gui_hooks
    gui_hooks.profile_did_open.append(lambda: mw.progress.single_shot(3000, maybe_apply))
    # an import (or note-type add) can bring a new copy of the note type
    def _op(changes, handler):
        if getattr(changes, "notetype", False):
            mw.progress.single_shot(500, maybe_apply)
    gui_hooks.operation_did_execute.append(_op)
