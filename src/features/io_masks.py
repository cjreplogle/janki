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
<div id="jk-io-tags" style="display:none">{{Tags}}</div>
<style id="jk-io-hold">#io-original,#io-overlay{visibility:hidden!important}</style>
<script>
(function(){
  function show(){ var h=document.getElementById('jk-io-hold'); if(h) h.remove(); }
  setTimeout(show,2500);   // never leave the card blank
try{
  var ov=document.getElementById('io-overlay'); var base=ov&&ov.querySelector('img');
  var o=document.querySelector('#jk-io-all-src img'), q=document.querySelector('#jk-io-cur-src img');
  if(!base||!o||base.dataset.jkAll){ show(); return; }
  var cur=q?decodeURIComponent((q.getAttribute('src')||'').split('/').pop()).replace(/-Q\.svg$/,''):'';
  function txt(u){ return fetch(u).then(function(r){ return r.text(); }); }
  // merge the other boxes INTO the card's own mask svg: same size and place, always
  Promise.all([txt(base.src), txt(o.src)]).then(function(t){
    var P=new DOMParser(), mine=P.parseFromString(t[0],'image/svg+xml'), all=P.parseFromString(t[1],'image/svg+xml');
    var gs=mine.documentElement.getElementsByTagName('g'), dst=gs.length?gs[gs.length-1]:mine.documentElement;
    var ag=all.documentElement.getElementsByTagName('g'), src=ag.length?ag[ag.length-1]:all.documentElement;
    // Tables (boxes lined up in columns) are meant to show the rest of each row as
    // the cue, so they keep hide-one. Tags override: io_hide_one / io_hide_all.
    var tg=' '+((document.getElementById('jk-io-tags')||{}).textContent||'').toLowerCase()+' ';
    var shapes=Array.prototype.filter.call(src.children,function(el){ return el.tagName!=='title'; });
    function isTable(){
      var W=parseFloat(all.documentElement.getAttribute('width'))||1000, cols={}, n=0;
      shapes.forEach(function(el){ var x=parseFloat(el.getAttribute('x')); if(isNaN(x)) return;
        var k=Math.round(x/(W*0.03)); cols[k]=(cols[k]||0)+1; });
      var big=Object.keys(cols).filter(function(k){ return cols[k]>=3; });
      big.forEach(function(k){ n+=cols[k]; });
      return big.length>=3 && n>=shapes.length*0.6;
    }
    if(/ io_hide_one /.test(tg) || (!/ io_hide_all /.test(tg) && isTable())){ show(); return; }
    var first=dst.firstChild;
    Array.prototype.slice.call(src.children).forEach(function(el){
      if(el.tagName==='title'||(cur&&el.id===cur)) return;
      dst.insertBefore(mine.importNode(el,true), first);   // under the card's own box
    });
    base.dataset.jkAll='1';
    base.onload=function(){ (base.decode?base.decode():Promise.resolve()).then(show,show); };
    base.onerror=show;
    base.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(new XMLSerializer().serializeToString(mine));
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
