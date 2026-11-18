"""Janki 3D anatomy cards: a "Janki Anatomy 3D" note type over real anatomy models
(Z-Anatomy / BodyParts3D, CC BY-SA), drawn by a bundled three.js engine
(_jk3d-anat-N.js, built from tools/anatomy3d/engine.js).

One note per structure, organised like a muscle chart (Origin / Insertion /
Innervation / Action). Cards made from a note (only when the field they need is filled):
  Identify     the structure is highlighted → name it
  Locate       "Click the …" → click it on the model (✓/✗ shown, result carried to the back)
  Attachments  → the back colours the bone surface it touches (origin orange, insertion purple)
  Innervation  → the back lights up the nerve (`Nerve` = its mesh names) and ghosts the muscles
  Action       → text answer, structure highlighted
  Peel         `Peel` = layers, one per line, removed in order by a slider (front: all on;
               back: first layer gone, what's revealed is labelled)

Fields Meshes / Nerve / Peel hold model part names (as in the model, "Sartorius muscle";
" muscle" may be left off). Region (hip, gluteal, thigh, knee, leg, foot, limb) limits what's
shown; Camera is a view direction (anterior, posterior, lateral, medial, anterolateral…).
"""
import os
import re

from aqt import mw
from aqt.qt import QAction
from aqt.utils import showInfo, tooltip

from ..util.config import log

MODEL_NAME = "Janki Anatomy 3D"
ENGINE = "_jk3d-anat-80.js"   # bump on engine changes that must reach phones (AnkiMobile caches)
LOWER_LIMB = "_jk3d_lowerlimb2.glb"   # bump the name when the model changes (phones cache by name)
UPPER_LIMB = "_jk3d_upperlimb2.glb"
TRUNK = "_jk3d_trunk8.glb"   # shared context (CT); also the base for future back / thorax cards
DECK_ROOT = "Janki 3D Anatomy::Lower Limb"
# Lite version (slower devices): the same cards on simplified models in their own note type and
# deck tree, so its reviews stay apart and the full setup never treats them as duplicates.
# The engine sees "_lite.glb" and also draws at 1x pixels without anti-aliasing.
LITE = {"MODEL_NAME": "Janki Anatomy 3D (Lite)", "DECK_ROOT": "Janki 3D Anatomy (Lite)::Lower Limb",
        "LOWER_LIMB": "_jk3d_lowerlimb2_lite.glb", "UPPER_LIMB": "_jk3d_upperlimb2_lite.glb",
        "TRUNK": "_jk3d_trunk8_lite.glb"}
FULL = {"MODEL_NAME": MODEL_NAME, "DECK_ROOT": DECK_ROOT, "LOWER_LIMB": LOWER_LIMB,
        "UPPER_LIMB": UPPER_LIMB, "TRUNK": TRUNK}


def _with(vals, fn, *a, **k):
    """Run fn with the module names set to `vals` (FULL or LITE), then put the previous back."""
    g = globals()
    saved = {x: g[x] for x in vals}
    try:
        g.update(vals)
        return fn(*a, **k)
    finally:
        g.update(saved)


def _variant_for_current():
    """LITE while the current deck is in the Lite tree, else FULL."""
    try:
        name = mw.col.decks.name(mw.col.decks.current()["id"])
    except Exception:
        return FULL
    top = LITE["DECK_ROOT"].split("::", 1)[0]
    return LITE if (name == top or name.startswith(top + "::")) else FULL
FIELDS = ("Structure", "Meshes", "Region", "Camera", "Limb", "Reflect", "Landmark", "Origin", "Insertion", "Innervation",
          "Nerve", "Action", "Peel", "Extra", "Model", "XrayID")
_ASSETS = os.path.join(os.path.dirname(__file__), "..", "..", "assets", "anatomy3d")

_JS = r"""<script>(function(){
var root=document.getElementById('jka');if(!root||root.__jka)return;root.__jka=1;
function txt(id){var e=document.getElementById(id);if(!e)return '';
 var h=e.innerHTML.replace(/<br\s*\/?>/gi,'\n').replace(/<\/(div|p)>/gi,'\n').replace(/<[^>]+>/g,'');
 var t=document.createElement('textarea');t.innerHTML=h;return t.value.replace(/ /g,' ').trim();}
var peel=txt('jka-peel');
var cfg={model:txt('jka-model')||'""" + LOWER_LIMB + r"""',side:root.getAttribute('data-side'),
 mode:root.getAttribute('data-mode'),name:txt('jka-name'),meshes:txt('jka-meshes'),nerve:txt('jka-nerve'),
 region:txt('jka-region'),cam:txt('jka-cam'),limb:txt('jka-limb'),reflect:txt('jka-reflect'),landmark:txt('jka-landmark'),front:root.getAttribute('data-front')||'adaptive',ivl:window.__jkaIvl,xray:root.getAttribute('data-xray')==='1',origin:txt('jka-origin'),insertion:txt('jka-insertion'),peel:peel?peel.split('\n').filter(function(x){return x.trim();}):[]};
function go(){window.JKANAT.mount(root,cfg);}
if(window.JKANAT&&window.JKANAT.v>=80){go();return;}
(window.__jkaQ=window.__jkaQ||[]).push(go);
if(window.__jkaLoading)return;window.__jkaLoading=1;
fetch('""" + ENGINE + r"""',{cache:'no-cache'}).then(function(r){if(!r.ok)throw r.status;return r.text();})
.then(function(code){var s=document.createElement('script');s.textContent=code;document.head.appendChild(s);})
.catch(function(){window.__jkaLoading=0;root.textContent='3D engine missing: run Tools → Janki: Set up 3D anatomy.';});
})();</script>"""

_DATA = """<div hidden id="jka-model">{{text:Model}}</div>
<div hidden id="jka-name">{{text:Structure}}</div>
<div hidden id="jka-origin">{{text:Origin}}</div>
<div hidden id="jka-insertion">{{text:Insertion}}</div>
<div hidden id="jka-meshes">{{text:Meshes}}</div>
<div hidden id="jka-nerve">{{text:Nerve}}</div>
<div hidden id="jka-region">{{text:Region}}</div>
<div hidden id="jka-cam">{{text:Camera}}</div>
<div hidden id="jka-limb">{{text:Limb}}</div>
<div hidden id="jka-reflect">{{text:Reflect}}</div>
<div hidden id="jka-landmark">{{text:Landmark}}</div>
<div hidden id="jka-peel">{{Peel}}</div>
"""


def _row(label, field, on):
    cls = ' class="on"' if on else ""
    # (jka-* classes: Janki's card-text sizing skips them, so our own sizes apply)
    return "{{#%s}}<tr%s><th class=\"jka-th\">%s</th><td class=\"jka-td\">{{%s}}</td></tr>{{/%s}}" % (field, cls, label, field, field)


def _chart(ask):
    return ('<table class="jka-chart">' + _row("Origin", "Origin", ask == "attach")
            + _row("Insertion", "Insertion", ask == "attach")
            + _row("Innervation", "Innervation", ask == "nerve")
            + _row("Action", "Action", ask == "action") + "</table>")


_CREDIT = ('<div class="jka-credit">Model adapted from BodyParts3D – The Database Center for Life Science – '
           'CC BY-SA 2.1 Japan · Z-Anatomy – The open source atlas of anatomy – CC BY-SA 4.0</div>')

# (template name, required field, mode, front prompt, back heading)
TEMPLATES = (
    ("Identify", "Meshes", "name", "What is highlighted?", "{{Structure}}"),
    ("Locate", "Meshes", "find", "Click the <b>{{Structure}}</b>", "{{Structure}}"),
    ("Identify (X-ray)", "XrayID", "name", "What is highlighted? <span class=\"jka-xrtag\">X-ray</span>", "{{Structure}}"),
    ("Attachments", "Origin", "attach", "<b>{{Structure}}</b>: origin and insertion?", "{{Structure}}"),
    ("Innervation", "Innervation", "nerve", "<b>{{Structure}}</b>: innervation?", "{{Structure}}"),
    ("Action", "Action", "action", "<b>{{Structure}}</b>: {{#Origin}}action{{/Origin}}{{^Origin}}key facts{{/Origin}}?", "{{Structure}}"),
)


def _fmt(req, mode, prompt, heading, side):
    if mode == "peel":
        need = "{{#Peel}}"
        close = "{{/Peel}}"
    else:
        # identify/locate etc. need the meshes; peel notes have no Meshes so make no other cards
        need = "{{#%s}}{{#Meshes}}" % req if req != "Meshes" else "{{#Meshes}}"
        close = "{{/Meshes}}{{/%s}}" % req if req != "Meshes" else "{{/Meshes}}"
    view = '<div id="jka" data-side="%s" data-mode="%s" data-front="%s"%s></div>\n' % (side, mode, _front_mode(), ' data-xray="1"' if req == "XrayID" else "")
    body = '<div class="jka-prompt">%s</div>\n' % prompt
    if side == "back":
        info = '<hr id="answer">\n<div class="jka-head jka-h-%s">%s</div>\n' % (mode, heading)
        if mode != "peel":
            info += _chart(mode).replace('class="jka-chart"', 'class="jka-chart jka-c-%s"' % mode) + "\n"
        info += '{{#Extra}}<div class="jka-extra">{{Extra}}</div>{{/Extra}}\n' + _CREDIT + "\n"
        # answer: the model slides to the left, the information fades in on the right
        body += ('<div class="jka-split"><div class="jka-left">' + view + '</div>'
                 '<div class="jka-right">' + info + '</div></div>\n')
    else:
        body += view
    body += _DATA
    return need + body + _JS + close


def _css():
    with open(os.path.join(os.path.dirname(__file__), "..", "..", "tools", "anatomy3d", "style.css")) as f:
        engine_css = f.read()
    # Janki's card CSS clears `#qa *` backgrounds; the chips/status need theirs back
    engine_css = re.sub(r"(^|\n)\.jka-(chips button|status|chips button\.on)\{",
                        lambda m: m.group(1) + "html body #qa .jka-" + m.group(2) + "{", engine_css)
    engine_css = engine_css.replace("background:", "background:").replace(";}", ";}")
    fixed = []
    for line in engine_css.split("\n"):
        if line.startswith("html body #qa") and "background:" in line:
            # (never twice: "!important !important" is invalid and drops the rule — iOS then
            #  painted its default light-grey button background)
            line = re.sub(r"background:([^;}!]+?)\s*(?:!important)?\s*(?=[;}])", r"background:\1 !important", line)
        fixed.append(line)
    return """.card { font-family: -apple-system, "Helvetica Neue", sans-serif; font-size: 19px; text-align: center; }
@font-face { font-family: "jkaLora"; src: url("_jk3d_lora.ttf"); font-weight: 400 700; }
.jka-prompt { margin: 6px 0 18px; padding-top: 2px; line-height: 1.3; position: relative; z-index: 2; }
/* the prompt: the same size / weight everywhere. Font: Lora (carried in the deck's media) as a
   weak default only — Janki's chosen card font (desktop) and its mobile-theming font override it */
.jka-prompt { font-family: "jkaLora", "Lora", Georgia, "Times New Roman", serif; }
html body #qa .jka-prompt, html body .jka-prompt { font-size: 24px !important; font-weight: 700 !important; letter-spacing: 0 !important; }
#jk-sc .jka-prompt { margin-top: -6px; }   /* Janki's frame leaves room above; plain Anki doesn't */
.jka-head { font-size: 24px; font-weight: 600; margin: 4px 0 8px; }
.jka-chart { margin: 0 auto; border-collapse: collapse; text-align: left; max-width: 760px; font-size: 16px; }
.jka-chart th { padding: 6px 14px 6px 0; vertical-align: top; opacity: .6; font-weight: 500; white-space: nowrap; }
.jka-chart td { padding: 6px 0; }
.jka-chart tr.on th { opacity: 1; color: #35c8ff; }
.jka-chart tr.on td { font-weight: 600; }
.jka-extra { margin-top: 10px; font-size: 15px; opacity: .85; }
.jka-credit { margin-top: 14px; font-size: 11px; opacity: .4; }
.jka-split { display: flex; align-items: center; gap: 28px; }
.jka-left { flex: 0 0 58%; min-width: 0; animation: jka-slide .5s cubic-bezier(.2, .8, .2, 1) both; }
@keyframes jka-shrink { from { flex-basis: 100%; } to { flex-basis: 58%; } }   /* X-ray answer: the film's right edge glides to the midline */
.jka-right { flex: 1; min-width: 0; text-align: left; animation: jka-in .45s .15s ease-out both; }
.jka-right hr#answer { display: none; }
.jka-right .jka-head { text-align: left; }
.jka-right .jka-chart { margin: 0; }
.jka-right .jka-chart th, .jka-right .jka-chart td { display: block; padding: 0; }
.jka-right .jka-chart th { margin-top: 12px; font-size: 13px; text-transform: uppercase; letter-spacing: .06em; }
.jka-right .jka-chart td { margin-top: 2px; }
@keyframes jka-slide { from { transform: translateX(36.2%); } }
@keyframes jka-in { from { opacity: 0; transform: translateX(18px); } }
@media (max-width: 720px) {
  .jka-split { display: block; } .jka-left, .jka-right { animation: none; } .jka-right { margin-top: 10px; } }
html body #jk-pq-bar { display: none !important; }
/* 3D cards are scroll-locked: the page never moves, the wheel belongs to the model */
html, body, html body #jk-sc { overflow: hidden !important; overscroll-behavior: none !important; }
""" + "\n".join(fixed)


FRONT_MODES = (("show", "Show"), ("adaptive", "Adaptive"), ("hide", "Hide"))


def _front_mode():
    try:
        v = mw.col.get_config("jka3d_front", "adaptive")
    except Exception:
        v = "adaptive"
    return v if v in dict(FRONT_MODES) else "adaptive"


def _rewrite_templates():
    """Rewrite the note type's templates (e.g. after the front-model setting changes) and put
    Janki's mobile theming back on (rewriting drops it)."""
    m = _ensure_model()
    try:
        from ..integrations import mobilecards as _mc
        if _mc.is_applied():
            _bk = _mc._load_backup()
            _mc._theme_model(mw.col.models.by_name(MODEL_NAME), _bk)
            _mc._save_backup(_bk)
    except Exception as e:
        log("anatomy3d: mobile theming: %s" % e)
    return m


def _card_will_show(text, card, kind):
    """Desktop: hand the card's interval to the engine (adaptive front model)."""
    try:
        if card.note_type()["name"] in (MODEL_NAME, LITE["MODEL_NAME"]) and kind.endswith("Question"):
            return "<script>window.__jkaIvl=%d;</script>" % max(0, card.ivl) + text
    except Exception:
        pass
    return text


def _ensure_model():
    mm = mw.col.models
    m = mm.by_name(MODEL_NAME)
    new = m is None
    if new:
        m = mm.new(MODEL_NAME)
        for f in FIELDS:
            mm.add_field(m, mm.new_field(f))
    else:
        have = {f["name"] for f in m["flds"]}
        for f in FIELDS:
            if f not in have:
                mm.add_field(m, mm.new_field(f))
    tm = {t["name"]: t for t in m["tmpls"]}
    if "Peel" in tm and not new:          # retired card type
        try:
            mm.remove_template(m, tm.pop("Peel"))
        except Exception as exc:
            log("anatomy3d: remove Peel template: %s" % exc)
    for name, req, mode, prompt, heading in TEMPLATES:
        t = tm.get(name)
        if t is None:
            t = mm.new_template(name)
            mm.add_template(m, t)
        t["qfmt"] = _fmt(req, mode, prompt, heading, "front")
        t["afmt"] = _fmt(req, mode, prompt, heading, "back")
    m["css"] = _css()
    m["sortf"] = 0
    if new:
        mm.add(m)
    else:
        mm.update_dict(m)
    return mm.by_name(MODEL_NAME)


def _copy_media():
    """Copy bundled files into the media folder, replacing older copies (Anki's
    write_data would save a changed file under a new hashed name instead)."""
    mdir = mw.col.media.dir()
    _font = os.path.join(os.path.dirname(__file__), "..", "..", "assets", "fonts", "Lora.ttf")
    for name in (ENGINE, LOWER_LIMB, UPPER_LIMB, TRUNK, "_jk3d_lora.ttf"):
        with open(_font if name == "_jk3d_lora.ttf" else os.path.join(_ASSETS, name), "rb") as f:
            data = f.read()
        dst = os.path.join(mdir, name)
        try:
            with open(dst, "rb") as f:
                if f.read() == data:
                    continue
        except OSError:
            pass
        with open(dst + ".jka-new", "wb") as f:
            f.write(data)
        os.replace(dst + ".jka-new", dst)


# ---------------------------------------------------------------------------------------
# Sample notes: right lower limb.  (subdeck, Structure, Meshes, Region, Camera, Origin,
# Insertion, Innervation, Nerve meshes, Action, Extra)
M = "muscle"
SAMPLES = [
    ("Gluteal Region", "Gluteus maximus", "Gluteus maximus muscle", "gluteal", "posterior",
     "Posterior ilium (behind the posterior gluteal line), dorsal sacrum and coccyx, sacrotuberous ligament",
     "Iliotibial tract; gluteal tuberosity of the femur",
     "Inferior gluteal nerve (L5–S2)", "",
     "Extends the thigh (rising from sitting, climbing stairs); laterally rotates it",
     "Not drawn in this model: the inferior gluteal nerve."),
    ("Gluteal Region", "Gluteus medius", "Gluteus medius muscle", "gluteal", "posterolateral",
     "Outer surface of the ilium between the anterior and posterior gluteal lines",
     "Lateral surface of the greater trochanter",
     "Superior gluteal nerve (L4–S1)", "Superior gluteal nerve",
     "Abducts and medially rotates the thigh; holds the pelvis level when the opposite foot is off the ground",
     "Weak (superior gluteal nerve injury) → Trendelenburg sign: the pelvis drops on the UNsupported side."),
    ("Gluteal Region", "Piriformis", "Piriformis muscle", "gluteal", "posterior",
     "Anterior surface of the sacrum (S2–S4)",
     "Superior border of the greater trochanter",
     "Nerve to piriformis (S1–S2)", "Nerve to piriformis muscle",
     "Laterally rotates the extended thigh; abducts the flexed thigh",
     "Landmark of the gluteal region: the sciatic nerve usually exits the greater sciatic foramen below it."),
    ("Anterior Thigh", "Sartorius", "Sartorius muscle", "thigh", "anterior",
     "Anterior superior iliac spine (ASIS)",
     "Superior medial tibia (pes anserinus)",
     "Femoral nerve (L2–L3)", "Femoral nerve",
     "Flexes, abducts and laterally rotates the hip; flexes the knee",
     "Pes anserinus = Sartorius, Gracilis, semiTendinosus (“SGT”)."),
    ("Anterior Thigh", "Rectus femoris", "Rectus femoris muscle", "thigh", "anterior",
     "Anterior inferior iliac spine (AIIS); ilium just above the acetabulum",
     "Base of the patella → tibial tuberosity via the patellar ligament",
     "Femoral nerve (L2–L4)", "Femoral nerve",
     "Extends the knee; flexes the hip (the only quadriceps head that crosses the hip)", ""),
    ("Medial Thigh", "Adductor longus", "Adductor longus", "thigh", "anteromedial",
     "Body of the pubis, below the pubic crest",
     "Middle third of the linea aspera",
     "Obturator nerve, anterior branch (L2–L4)", "Anterior branch of obturator nerve, Obturator nerve",
     "Adducts the thigh", "Forms the medial border of the femoral triangle."),
    ("Medial Thigh", "Gracilis", "Gracilis muscle", "thigh", "medial",
     "Body and inferior ramus of the pubis",
     "Superior medial tibia (pes anserinus)",
     "Obturator nerve, anterior branch (L2–L3)", "Anterior branch of obturator nerve, Obturator nerve",
     "Adducts the thigh; flexes the knee and medially rotates the leg", ""),
    ("Posterior Thigh", "Semitendinosus", "Semitendinosus muscle", "thigh", "posterior",
     "Ischial tuberosity",
     "Superior medial tibia (pes anserinus)",
     "Tibial division of the sciatic nerve (L5–S2)", "Sciatic nerve",
     "Extends the hip; flexes the knee and medially rotates the leg", ""),
    ("Posterior Thigh", "Biceps femoris (long head)", "Long head of biceps femoris", "thigh", "posterior",
     "Ischial tuberosity",
     "Head of the fibula",
     "Tibial division of the sciatic nerve (L5–S2)", "Sciatic nerve",
     "Extends the hip; flexes the knee and laterally rotates the leg",
     "The short head is the one hamstring part supplied by the common fibular division."),
    ("Anterior Leg", "Tibialis anterior", "Tibialis anterior muscle", "leg", "anterolateral",
     "Lateral condyle and upper half of the lateral tibia; interosseous membrane",
     "Medial cuneiform and base of the 1st metatarsal",
     "Deep fibular nerve (L4–L5)", "Deep fibular nerve, Muscular branches of deep fibular nerve",
     "Dorsiflexes and inverts the foot", "Weak → foot drop (deep or common fibular nerve injury)."),
    ("Lateral Leg", "Fibularis longus", "Fibularis longus muscle", "leg", "lateral",
     "Head and upper two-thirds of the lateral fibula",
     "Base of the 1st metatarsal and medial cuneiform (tendon crosses the sole)",
     "Superficial fibular nerve (L5–S2)", "Superficial fibular nerve",
     "Everts the foot; weak plantarflexion; supports the transverse arch", ""),
    ("Posterior Leg", "Gastrocnemius", "Medial head of gastrocnemius, Lateral head of gastrocnemius, Calcaneal tendon",
     "leg", "posterior",
     "Lateral head: lateral femoral condyle. Medial head: popliteal surface of the femur above the medial condyle",
     "Posterior calcaneus, via the calcaneal (Achilles) tendon",
     "Tibial nerve (S1–S2)", "Tibial nerve",
     "Plantarflexes the ankle; flexes the knee", "Achilles reflex tests S1(–S2)."),
    # nerves: Identify / Locate / Action (= what they supply)
    ("Nerves", "Femoral nerve", "Femoral nerve", "thigh", "anterior", "", "", "", "",
     "<b>L2–L4.</b> Motor: anterior thigh (quadriceps, sartorius), iliacus, pectineus. "
     "Sensory: anterior thigh; medial leg and foot via the saphenous nerve", ""),
    ("Nerves", "Obturator nerve", "Obturator nerve, Anterior branch of obturator nerve, Posterior branch of obturator nerve",
     "thigh", "anteromedial", "", "", "", "",
     "<b>L2–L4.</b> Motor: medial thigh adductors (not hamstring part of adductor magnus). "
     "Sensory: medial thigh", "Leaves the pelvis through the obturator foramen."),
    ("Nerves", "Sciatic nerve", "Sciatic nerve", "thigh", "posterior", "", "", "", "",
     "<b>L4–S3.</b> Motor: hamstrings, hamstring part of adductor magnus; everything below the knee "
     "via the tibial and common fibular nerves", "Usually leaves the pelvis below piriformis."),
    ("Nerves", "Common fibular nerve", "Common fibular nerve", "knee", "lateral", "", "", "", "",
     "<b>L4–S2.</b> Splits into superficial (lateral leg, everts) and deep (anterior leg, dorsiflexes) fibular nerves",
     "Wraps the fibular neck → fracture there causes foot drop and numb dorsum of the foot."),
    ("Nerves", "Tibial nerve", "Tibial nerve", "leg", "posterior", "", "", "", "",
     "<b>L4–S3.</b> Motor: posterior leg (plantarflexors, toe flexors), the sole via the plantar nerves",
     "Passes behind the medial malleolus (tarsal tunnel)."),
    ("Nerves", "Superior gluteal nerve", "Superior gluteal nerve", "gluteal", "posterolateral", "", "", "", "",
     "<b>L4–S1.</b> Motor: gluteus medius, gluteus minimus, tensor fasciae latae", ""),
]
# ligaments (Action = what they do / resist)
SAMPLES += [
    ("Knee Ligaments", "Anterior cruciate ligament (ACL)", "Anterior cruciate ligament", "knee", "anterior +5",
     "Posteromedial surface of the lateral femoral condyle", "Anterior intercondylar area of the tibia", "", "",
     "Resists anterior translation of the tibia on the femur (and hyperextension, internal rotation)",
     "Torn: anterior drawer / Lachman positive. Unhappy triad = ACL + MCL + medial meniscus."),
    ("Knee Ligaments", "Posterior cruciate ligament (PCL)", "Posterior cruciate ligament", "knee", "posterior +5",
     "Anterolateral surface of the medial femoral condyle", "Posterior intercondylar area of the tibia", "", "",
     "Resists posterior translation of the tibia on the femur", "Torn (dashboard injury): posterior drawer positive."),
    ("Knee Ligaments", "Tibial (medial) collateral ligament", "Superficial part of tibial collateral ligament, Deep part of tibial collateral ligament",
     "knee", "medial", "Medial epicondyle of the femur", "Medial condyle and medial surface of the tibia", "", "",
     "Resists valgus stress", "Its deep part is attached to the medial meniscus — torn together."),
    ("Knee Ligaments", "Fibular (lateral) collateral ligament", "Fibular collateral ligament", "knee", "lateral",
     "Lateral epicondyle of the femur", "Head of the fibula", "", "",
     "Resists varus stress", "Cord-like; NOT attached to the lateral meniscus."),
    ("Knee Ligaments", "Medial meniscus", "Medial meniscus", "knee", "anteromedial +45", "", "", "", "",
     "C-shaped fibrocartilage: deepens the medial tibial plateau, spreads load",
     "Fixed to the tibial collateral ligament → less mobile → torn more often than the lateral."),
    ("Knee Ligaments", "Lateral meniscus", "Lateral meniscus", "knee", "anterolateral +45", "", "", "", "",
     "Nearly circular (O-shaped) fibrocartilage on the lateral tibial plateau", "More mobile; the popliteus tendon separates it from the fibular collateral ligament."),
    ("Hip & Pelvis Ligaments", "Iliofemoral ligament", "Descending part of iliofemoral ligament, Transverse part of iliofemoral ligament",
     "hip", "anterior", "Anterior inferior iliac spine and the acetabular rim", "Intertrochanteric line of the femur", "", "",
     "Prevents hyperextension of the hip (strongest ligament in the body)", "Y-shaped (ligament of Bigelow)."),
    ("Hip & Pelvis Ligaments", "Sacrotuberous ligament", "Sacrotuberous ligament", "gluteal", "posterior",
     "Posterior iliac spines, lateral sacrum and coccyx", "Ischial tuberosity", "", "",
     "Resists upward tilting of the lower sacrum (with sacrospinous); converts the sciatic notches into foramina", ""),
]
# vessels (Action = course / what it supplies or drains)
_V = "Vessels"
SAMPLES += [
    (_V, "Femoral artery", "Femoral artery", "thigh", "anteromedial", "", "", "", "",
     "Continuation of the external iliac artery below the inguinal ligament; runs through the femoral "
     "triangle and adductor canal, becoming the popliteal artery at the adductor hiatus",
     "Femoral triangle, lateral → medial: Nerve, Artery, Vein (NAV). Pulse at the mid-inguinal point."),
    (_V, "Deep femoral artery (profunda femoris)", "Deep femoral artery", "thigh", "anteromedial", "", "", "", "",
     "Main supply of the thigh muscles: gives the medial and lateral circumflex femoral arteries and the perforating arteries", ""),
    (_V, "Medial circumflex femoral artery", "Medial circumflex femoral artery", "hip", "posterior", "", "", "", "",
     "Winds behind the femoral neck; the main blood supply to the femoral head (via retinacular branches)",
     "Displaced femoral neck fracture → tears it → avascular necrosis of the femoral head."),
    (_V, "Popliteal artery", "Popliteal artery", "knee", "posterior", "", "", "", "",
     "Deepest structure of the popliteal fossa; genicular branches to the knee; divides into the anterior and posterior tibial arteries",
     "Popliteal fossa, superficial → deep: tibial nerve, popliteal vein, popliteal artery."),
    (_V, "Anterior tibial artery", "Anterior tibial artery", "leg", "anterolateral", "", "", "", "",
     "Passes above the interosseous membrane to supply the anterior compartment; becomes the dorsalis pedis at the ankle", ""),
    (_V, "Posterior tibial artery", "Posterior tibial artery", "leg", "posteromedial", "", "", "", "",
     "Supplies the posterior compartment and the sole (medial and lateral plantar arteries)",
     "Pulse behind the medial malleolus (tarsal tunnel)."),
    (_V, "Fibular (peroneal) artery", "Fibular artery", "leg", "posterolateral", "", "", "", "",
     "Branch of the posterior tibial artery; supplies the lateral compartment and the fibula", ""),
    (_V, "Dorsalis pedis artery", "Dorsalis pedis artery", "foot", "anterior", "", "", "", "",
     "Continuation of the anterior tibial artery on the dorsum of the foot; ends in the deep plantar artery / plantar arch",
     "Pulse lateral to the extensor hallucis longus tendon."),
    (_V, "Superior gluteal artery", "Superior gluteal artery", "gluteal", "posterior", "", "", "", "",
     "From the internal iliac artery; leaves the pelvis ABOVE piriformis with the superior gluteal nerve; supplies gluteus medius and minimus", ""),
    (_V, "Inferior gluteal artery", "Inferior gluteal artery", "gluteal", "posterior", "", "", "", "",
     "From the internal iliac artery; leaves the pelvis BELOW piriformis; supplies gluteus maximus", ""),
    (_V, "Obturator artery", "Obturator artery", "hip", "anteromedial", "", "", "", "",
     "From the internal iliac artery; through the obturator canal to the medial thigh; gives the artery of the ligament of the head of the femur", ""),
    (_V, "Great saphenous vein", "Great saphenous vein", "limb", "anteromedial", "", "", "", "",
     "From the medial end of the dorsal venous arch, in front of the medial malleolus, up the medial leg and thigh to the femoral vein at the saphenous opening",
     "Longest vein in the body; harvested for coronary bypass grafts; runs with the saphenous nerve below the knee."),
    (_V, "Small saphenous vein", "Small saphenous vein", "leg", "posterolateral", "", "", "", "",
     "From the lateral end of the dorsal venous arch, behind the lateral malleolus, up the back of the calf to the popliteal vein", "Runs with the sural nerve."),
    (_V, "Femoral vein", "Femoral vein", "thigh", "anteromedial", "", "", "", "",
     "Continuation of the popliteal vein; MEDIAL to the femoral artery in the femoral triangle; becomes the external iliac vein", "Site for central venous access."),
    (_V, "Popliteal vein", "Popliteal vein", "knee", "posterior", "", "", "", "",
     "Formed by the tibial veins; receives the small saphenous vein; between the tibial nerve and the popliteal artery", ""),
]
# osteology (Action = key features / articulations)
_O = "Osteology"
SAMPLES += [
    (_O, "Hip bone (os coxae)", "Hip bone", "hip", "anterolateral", "", "", "", "",
     "Ilium, ischium and pubis, fused at the acetabulum. Articulates with the sacrum (sacro-iliac joint), the femur (hip joint) and the other hip bone (pubic symphysis)",
     "The three parts fuse across the Y-shaped triradiate cartilage in the mid-teens."),
    (_O, "Sacrum", "Sacrum", "hip", "posterior", "", "", "", "",
     "Five fused sacral vertebrae; articulates with L5 above, the coccyx below and both hip bones (sacro-iliac joints)",
     "Anterior and posterior sacral foramina carry the sacral ventral and dorsal rami."),
    (_O, "Femur", "Femur", "thigh", "anterior", "", "", "", "",
     "Longest and strongest bone: head, neck (about 125° to the shaft), greater and lesser trochanters, linea aspera, medial and lateral condyles. Articulates at the hip, the knee (tibia) and with the patella",
     "Neck fractures threaten the head's blood supply (medial circumflex femoral artery)."),
    (_O, "Patella", "Patella", "knee", "anterior", "", "", "", "",
     "Largest sesamoid bone, in the quadriceps tendon; articulates with the patellar surface of the femur; increases the quadriceps' lever arm", ""),
    (_O, "Tibia", "Tibia", "leg", "anteromedial", "", "", "", "",
     "The weight-bearing leg bone: tibial plateau (medial and lateral condyles), tibial tuberosity, subcutaneous anteromedial surface, medial malleolus. Articulates with the femur, the fibula (above and below) and the talus", ""),
    (_O, "Fibula", "Fibula", "leg", "lateral", "", "", "", "",
     "Slender, mainly for muscle attachment (bears little weight): head, neck, lateral malleolus. Forms the lateral side of the ankle mortise",
     "The common fibular nerve winds around its neck — fractures there cause foot drop."),
    (_O, "Talus", "Talus", "foot", "anterolateral", "", "", "", "",
     "No muscle attachments; its trochlea sits in the ankle mortise and passes the body's weight from the tibia to the foot; head articulates with the navicular, below with the calcaneus",
     "Blood supply mostly enters distally → neck fractures risk avascular necrosis of the body."),
    (_O, "Calcaneus", "Calcaneus", "foot", "lateral", "", "", "", "",
     "Largest tarsal bone, the heel: calcaneal tuberosity (Achilles tendon), sustentaculum tali supporting the talus; articulates with the talus and the cuboid", ""),
    (_O, "Navicular", "Navicular bone", "foot", "medial", "", "", "", "",
     "Medial tarsal between the talar head and the three cuneiforms; its tuberosity receives tibialis posterior", ""),
    (_O, "Cuboid", "Cuboid bone", "foot", "lateral", "", "", "", "",
     "Lateral tarsal between the calcaneus and the 4th–5th metatarsals; grooved underneath by the fibularis longus tendon", ""),
    (_O, "Medial cuneiform", "Medial cuneiform bone", "foot", "medial", "", "", "", "",
     "Largest cuneiform; with the 1st metatarsal base, receives tibialis anterior and fibularis longus", ""),
    (_O, "First metatarsal", "First metatarsal bone", "foot", "medial", "", "", "", "",
     "Shortest and thickest metatarsal; two sesamoids under its head (in flexor hallucis brevis)", "Hallux valgus deviates it medially."),
    (_O, "Fifth metatarsal", "Fifth metatarsal bone", "foot", "lateral", "", "", "", "",
     "Lateral border of the foot; tuberosity at its base receives fibularis brevis",
     "Avulsion of the tuberosity (inversion injury) vs. the Jones fracture just beyond it (poor healing)."),
]
# bony landmarks (a point on the bone; Landmark = the engine's key). (subdeck, Structure, bone, key,
# region, camera, Action = what it is / what attaches there)
LANDMARKS = [
    ("Hip Bone Landmarks", "Iliac crest", "Hip bone", "iliac crest", "hip", "anterolateral",
     "Upper border of the ilium, ASIS to PSIS; its highest point is at the L4 level (lumbar puncture landmark)"),
    ("Hip Bone Landmarks", "Anterior superior iliac spine (ASIS)", "Hip bone", "anterior superior iliac spine", "hip", "anterolateral",
     "Origin of sartorius and the inguinal ligament; tensor fasciae latae arises just behind it"),
    ("Hip Bone Landmarks", "Anterior inferior iliac spine (AIIS)", "Hip bone", "anterior inferior iliac spine", "hip", "anterolateral",
     "Origin of the straight head of rectus femoris; the iliofemoral ligament attaches just below"),
    ("Hip Bone Landmarks", "Posterior superior iliac spine (PSIS)", "Hip bone", "posterior superior iliac spine", "hip", "posterior",
     "Under the skin dimples of the lower back, at the S2 level (middle of the sacro-iliac joint)"),
    ("Hip Bone Landmarks", "Ischial spine", "Hip bone", "ischial spine", "hip", "posteromedial",
     "Separates the greater and lesser sciatic notches; sacrospinous ligament attaches; landmark for a pudendal nerve block"),
    ("Hip Bone Landmarks", "Ischial tuberosity", "Hip bone", "ischial tuberosity", "hip", "posterior",
     "Origin of the hamstrings (semitendinosus, semimembranosus, long head of biceps femoris) and the hamstring part of adductor magnus; we sit on it"),
    ("Hip Bone Landmarks", "Pubic tubercle", "Hip bone", "pubic tubercle", "hip", "anterior",
     "Medial attachment of the inguinal ligament; the superficial inguinal ring lies above it"),
    ("Hip Bone Landmarks", "Pubic symphysis", "Hip bone", "pubic symphysis", "hip", "anterior",
     "Secondary cartilaginous joint between the two pubic bodies"),
    ("Hip Bone Landmarks", "Acetabulum", "Hip bone", "acetabulum", "hip", "lateral",
     "Socket of the hip joint, formed by ilium, ischium and pubis; deepened by the labrum"),
    ("Femur Landmarks", "Head of femur", "Femur", "head", "hip", "anterior",
     "Articulates with the acetabulum; the fovea receives the ligament of the head (with a small artery)"),
    ("Femur Landmarks", "Neck of femur", "Femur", "neck", "hip", "anterior",
     "Joins head to shaft at about 125°; the commonest site of hip fracture in the elderly"),
    ("Femur Landmarks", "Greater trochanter", "Femur", "greater trochanter", "hip", "lateral",
     "Insertion of gluteus medius and minimus, piriformis, obturator internus and the gemelli"),
    ("Femur Landmarks", "Lesser trochanter", "Femur", "lesser trochanter", "hip", "posteromedial",
     "Insertion of iliopsoas"),
    ("Femur Landmarks", "Linea aspera", "Femur", "linea aspera", "thigh", "posterior",
     "Ridge down the back of the shaft: the adductors and vastus medialis / lateralis attach; short head of biceps femoris arises"),
    ("Femur Landmarks", "Medial condyle (femur)", "Femur", "medial condyle", "knee", "anteromedial",
     "Articulates with the medial tibial condyle and meniscus; the PCL attaches on its lateral surface"),
    ("Femur Landmarks", "Lateral condyle (femur)", "Femur", "lateral condyle", "knee", "anterolateral",
     "Articulates with the lateral tibial condyle; the ACL attaches on its medial surface"),
    ("Femur Landmarks", "Medial epicondyle (femur)", "Femur", "medial epicondyle", "knee", "medial",
     "Proximal attachment of the tibial (medial) collateral ligament"),
    ("Femur Landmarks", "Lateral epicondyle (femur)", "Femur", "lateral epicondyle", "knee", "lateral",
     "Proximal attachment of the fibular (lateral) collateral ligament"),
    ("Femur Landmarks", "Adductor tubercle", "Femur", "adductor tubercle", "knee", "medial",
     "Insertion of the hamstring part of adductor magnus, above the medial epicondyle"),
    ("Femur Landmarks", "Intercondylar fossa", "Femur", "intercondylar fossa", "knee", "posterior",
     "Notch between the condyles; contains the cruciate ligaments"),
    ("Femur Landmarks", "Patellar surface", "Femur", "patellar surface", "knee", "anterior",
     "Groove on the front of the distal femur where the patella glides"),
]
# ---------------------------------------------------------------------------------------
# Upper limb (right; left = mirror). Landmark notes: (subdeck, Structure, Meshes, Landmark key,
# Region, Camera, facts → Action field, Reflect). Whole bones / groups use an empty key.
_MC = "First metacarpal bone, Second metacarpal bone, Third metacarpal bone, Fourth metacarpal bone, Fifth metacarpal bone"
_FING = ("second", "third", "fourth", "fifth")
_PH_PM = ", ".join(["Proximal phalanx of first finger of hand"] + ["%s phalanx of %s finger of hand" % (r, f) for f in _FING for r in ("Proximal", "Middle")])
_PH_D = ", ".join("Distal phalanx of %s finger of hand" % f for f in ("first",) + _FING)
_PH_ALL = _PH_PM + ", " + _PH_D
UL_NOTES = [
    # scapula
    ("Scapula", "Acromion", "Scapula", "scapula: acromion", "shoulder", "posterolateral",
     "Lateral end of the spine of the scapula, the point of the shoulder; articulates with the clavicle (acromioclavicular joint). Deltoid (acromial part) arises and trapezius inserts here", ""),
    ("Scapula", "Coracoid process", "Scapula", "scapula: coracoid process", "shoulder", "anterior",
     "Hook projecting forward below the clavicle. Attachments: pectoralis minor, short head of biceps brachii, coracobrachialis; coracoclavicular (conoid + trapezoid), coracoacromial and coracohumeral ligaments. Palpable in the deltopectoral triangle", ""),
    ("Scapula", "Spine of scapula", "Scapula", "scapula: spine", "shoulder", "posterior",
     "Ridge across the posterior surface dividing the supraspinous from the infraspinous fossa; continues laterally as the acromion. Trapezius inserts on its upper lip, deltoid arises from its lower lip", ""),
    ("Scapula", "Supraspinous fossa", "Scapula", "scapula: supraspinous fossa", "shoulder", "posterior",
     "Hollow above the spine of the scapula: origin of supraspinatus", ""),
    ("Scapula", "Infraspinous fossa", "Scapula", "scapula: infraspinous fossa", "shoulder", "posterior",
     "Large hollow below the spine of the scapula: origin of infraspinatus", ""),
    ("Scapula", "Subscapular fossa", "Scapula", "scapula: subscapular fossa", "shoulder", "anterior",
     "Concave anterior (costal) surface facing the ribs: origin of subscapularis", ""),
    ("Scapula", "Scapular (suprascapular) notch", "Scapula", "scapula: scapular notch", "shoulder", "anterior",
     "Notch in the superior border, medial to the coracoid; bridged by the superior transverse scapular ligament. Suprascapular nerve passes under it, suprascapular artery over it (“army over the bridge, navy under”)", ""),
    ("Scapula", "Glenoid cavity", "Scapula", "scapula: glenoid cavity", "shoulder", "lateral",
     "Shallow socket for the head of the humerus (glenohumeral joint), deepened by the glenoid labrum", "Humerus"),
    ("Scapula", "Supraglenoid tubercle", "Scapula", "scapula: supraglenoid tubercle", "shoulder", "lateral",
     "Just above the glenoid cavity: origin of the long head of biceps brachii", "Humerus"),
    ("Scapula", "Infraglenoid tubercle", "Scapula", "scapula: infraglenoid tubercle", "shoulder", "lateral",
     "Just below the glenoid cavity: origin of the long head of triceps brachii", "Humerus"),
    ("Scapula", "Medial border of scapula", "Scapula", "scapula: medial border", "shoulder", "posterior",
     "Vertebral border: levator scapulae (above the spine), rhomboid minor and major insert on its posterior lip; serratus anterior along its anterior (costal) lip", ""),
    ("Scapula", "Superior angle of scapula", "Scapula", "scapula: superior angle", "shoulder", "posterior",
     "Junction of the superior and medial borders, about the T2 level: insertion of levator scapulae", ""),
    ("Scapula", "Inferior angle of scapula", "Scapula", "scapula: inferior angle", "shoulder", "posterior",
     "Lowest point of the scapula, about the T7 level; teres major arises from its posterior surface. Moves laterally when the arm is abducted (scapular rotation)", ""),
    # clavicle
    ("Clavicle", "Acromial end of clavicle", "Clavicle", "clavicle: acromial end", "shoulder", "anterior",
     "Flattened lateral end; articulates with the acromion (acromioclavicular joint)", ""),
    ("Clavicle", "Shaft of clavicle", "Clavicle", "clavicle: shaft", "shoulder", "anterior",
     "S-shaped body, convex forward medially and concave forward laterally. Commonest fracture site: junction of the middle and lateral thirds", ""),
    ("Clavicle", "Sternal end of clavicle", "Clavicle", "clavicle: sternal end", "shoulder", "anterior",
     "Rounded medial end; articulates with the manubrium of the sternum and the 1st costal cartilage (sternoclavicular joint)", ""),
    ("Clavicle", "Conoid tubercle", "Clavicle", "clavicle: conoid tubercle", "shoulder", "posterior",
     "On the inferior surface near the lateral end: attachment of the conoid ligament (medial part of the coracoclavicular ligament)", ""),
    ("Clavicle", "Sternal articular surface of clavicle", "Clavicle", "clavicle: sternal articular surface", "shoulder", "anteromedial",
     "Medial articular facet for the manubrium at the sternoclavicular joint (which contains an articular disc)", ""),
    # humerus
    ("Humerus", "Head of humerus", "Humerus", "humerus: head", "shoulder", "anterior",
     "Hemispherical articular head facing medially, upward and backward; articulates with the glenoid cavity", ""),
    ("Humerus", "Greater tubercle", "Humerus", "humerus: greater tubercle", "shoulder", "anterolateral",
     "Lateral projection: insertion of supraspinatus, infraspinatus and teres minor (superior, middle and inferior facets)", ""),
    ("Humerus", "Lesser tubercle", "Humerus", "humerus: lesser tubercle", "shoulder", "anterior",
     "Anterior projection: insertion of subscapularis", ""),
    ("Humerus", "Intertubercular (bicipital) groove", "Humerus", "humerus: intertubercular groove", "shoulder", "anterior",
     "Groove between the tubercles carrying the tendon of the long head of biceps. Pectoralis major inserts on its lateral lip, latissimus dorsi in its floor, teres major on its medial lip", ""),
    ("Humerus", "Anatomical neck of humerus", "Humerus", "humerus: anatomical neck", "shoulder", "anteromedial",
     "Shallow groove around the margin of the articular head; attachment of the glenohumeral joint capsule", ""),
    ("Humerus", "Surgical neck of humerus", "Humerus", "humerus: surgical neck", "shoulder", "posterolateral",
     "Narrowing just below the tubercles: a common fracture site. The axillary nerve and posterior circumflex humeral artery wind around it", ""),
    ("Humerus", "Deltoid tuberosity", "Humerus", "humerus: deltoid tuberosity", "arm", "lateral",
     "Roughened area midway down the lateral shaft: insertion of deltoid", ""),
    ("Humerus", "Radial (spiral) groove", "Humerus", "humerus: radial groove", "arm", "posterolateral",
     "Runs obliquely down the back of the shaft, carrying the radial nerve and the deep (profunda) brachial artery; mid-shaft fractures can injure the nerve (wrist drop)", ""),
    ("Humerus", "Capitulum", "Humerus", "humerus: capitulum", "elbow", "anterior",
     "Rounded lateral part of the distal articular surface; articulates with the head of the radius", ""),
    ("Humerus", "Trochlea", "Humerus", "humerus: trochlea", "elbow", "anterior",
     "Spool-shaped medial part of the distal articular surface; articulates with the trochlear notch of the ulna", ""),
    ("Humerus", "Medial epicondyle of humerus", "Humerus", "humerus: medial epicondyle", "elbow", "anterior",
     "Prominent medial projection: common flexor origin (pronator teres, flexor carpi radialis, palmaris longus, flexor digitorum superficialis, flexor carpi ulnaris) and the ulnar collateral ligament. The ulnar nerve passes behind it", ""),
    ("Humerus", "Lateral epicondyle of humerus", "Humerus", "humerus: lateral epicondyle", "elbow", "anterior",
     "Common extensor origin (extensor carpi radialis brevis, extensor digitorum, extensor digiti minimi, extensor carpi ulnaris), plus supinator and anconeus; radial collateral ligament", ""),
    ("Humerus", "Medial supracondylar ridge", "Humerus", "humerus: medial supracondylar ridge", "elbow", "anterior",
     "Medial border of the distal shaft above the medial epicondyle: medial intermuscular septum; humeral head of pronator teres", ""),
    ("Humerus", "Lateral supracondylar ridge", "Humerus", "humerus: lateral supracondylar ridge", "elbow", "anterior",
     "Lateral border of the distal shaft: origin of brachioradialis and extensor carpi radialis longus", ""),
    ("Humerus", "Radial fossa", "Humerus", "humerus: radial fossa", "elbow", "anterior",
     "Small hollow above the capitulum that receives the head of the radius in full flexion", ""),
    ("Humerus", "Coronoid fossa", "Humerus", "humerus: coronoid fossa", "elbow", "anterior",
     "Hollow above the trochlea that receives the coronoid process of the ulna in full flexion", ""),
    ("Humerus", "Olecranon fossa", "Humerus", "humerus: olecranon fossa", "elbow", "posterior",
     "Deep posterior hollow above the trochlea that receives the olecranon in full extension", ""),
    ("Humerus", "Groove for ulnar nerve", "Humerus", "humerus: groove for ulnar nerve", "elbow", "posterior",
     "Behind the medial epicondyle: the ulnar nerve lies here against bone (the “funny bone”), easily injured", ""),
    # radius
    ("Radius", "Head of radius", "Radius", "radius: head", "elbow", "anterior",
     "Disc-shaped head: articulates with the capitulum and the radial notch of the ulna; turns inside the annular ligament in pronation and supination", ""),
    ("Radius", "Neck of radius", "Radius", "radius: neck", "elbow", "anterior",
     "Constriction just below the head", ""),
    ("Radius", "Radial tuberosity", "Radius", "radius: radial tuberosity", "elbow", "anteromedial",
     "Below the neck: insertion of the biceps brachii tendon", ""),
    ("Radius", "Interosseous border of radius", "Radius", "radius: interosseous border", "forearm", "anterior",
     "Sharp medial border of the shaft: attachment of the interosseous membrane", ""),
    ("Radius", "Dorsal (Lister's) tubercle", "Radius", "radius: dorsal tubercle", "wrist", "posterior",
     "Bump on the back of the distal radius; the extensor pollicis longus tendon turns around it", ""),
    ("Radius", "Styloid process of radius", "Radius", "radius: styloid process", "wrist", "anterior",
     "Distal lateral projection, palpable in the anatomical snuffbox (it lies about 1 cm lower than the ulnar styloid); brachioradialis inserts at its base", ""),
    ("Radius", "Carpal articular surface of radius", "Radius", "radius: carpal articular surface", "wrist", "anterior",
     "Concave distal surface articulating with the scaphoid and lunate (radiocarpal / wrist joint)", "Scaphoid bone, Lunate bone"),
    # ulna
    ("Ulna", "Olecranon", "Ulna", "ulna: olecranon", "elbow", "posterior",
     "Proximal posterior projection, the point of the elbow: insertion of triceps brachii", ""),
    ("Ulna", "Trochlear notch", "Ulna", "ulna: trochlear notch", "elbow", "lateral",
     "Deep notch between the olecranon and the coronoid process; grips the trochlea of the humerus", "Humerus"),
    ("Ulna", "Coronoid process of ulna", "Ulna", "ulna: coronoid process", "elbow", "medial",
     "Anterior lip of the trochlear notch; brachialis inserts just below it", ""),
    ("Ulna", "Radial notch of ulna", "Ulna", "ulna: radial notch", "elbow", "lateral",
     "Lateral facet for the head of the radius (proximal radio-ulnar joint); the annular ligament attaches to its margins", "Radius"),
    ("Ulna", "Ulnar tuberosity", "Ulna", "ulna: ulnar tuberosity", "elbow", "anterior",
     "Rough area below the coronoid process: insertion of brachialis", ""),
    ("Ulna", "Styloid process of ulna", "Ulna", "ulna: styloid process", "wrist", "posterior",
     "Distal posteromedial projection: attachment of the ulnar collateral ligament of the wrist and the apex of the articular disc", ""),
    ("Ulna", "Head of ulna", "Ulna", "ulna: head", "wrist", "posterior",
     "Rounded distal end (the bump on the back of the wrist); articulates with the ulnar notch of the radius (distal radio-ulnar joint), separated from the carpus by the articular disc", ""),
    # carpal bones
    ("Carpal Bones", "Scaphoid", "Scaphoid bone", "", "wrist", "anterior",
     "Largest bone of the proximal row (lateral); floor of the anatomical snuffbox. Most often fractured carpal — blood enters distally, so the proximal pole can undergo avascular necrosis", ""),
    ("Carpal Bones", "Lunate", "Lunate bone", "", "wrist", "anterior",
     "Proximal row, between scaphoid and triquetrum; articulates with the radius. Most often dislocated carpal (anteriorly, into the carpal tunnel)", ""),
    ("Carpal Bones", "Triquetrum", "Triquetrum bone", "", "wrist", "posterior",
     "Pyramid-shaped, proximal row medially; the pisiform sits on its palmar surface", ""),
    ("Carpal Bones", "Pisiform", "Pisiform bone", "", "wrist", "anterior",
     "Pea-shaped sesamoid bone in the tendon of flexor carpi ulnaris; palpable at the medial end of the distal wrist crease", ""),
    ("Carpal Bones", "Trapezium", "Trapezium bone", "", "wrist", "anterior",
     "Distal row laterally; saddle joint with the 1st metacarpal (thumb carpometacarpal joint)", ""),
    ("Carpal Bones", "Tubercle of trapezium", "Trapezium bone", "trapezium: tubercle", "wrist", "anterior",
     "Palmar projection: lateral attachment of the flexor retinaculum; the flexor carpi radialis tendon runs in the groove beside it", ""),
    ("Carpal Bones", "Trapezoid", "Trapezoid bone", "", "wrist", "posterior",
     "Distal row, between trapezium and capitate; articulates with the 2nd metacarpal", ""),
    ("Carpal Bones", "Capitate", "Capitate bone", "", "wrist", "anterior",
     "Largest carpal bone, in the centre of the distal row; articulates with the 3rd metacarpal", ""),
    ("Carpal Bones", "Hamate", "Hamate bone", "", "wrist", "anterior",
     "Distal row medially; articulates with the 4th and 5th metacarpals", ""),
    ("Carpal Bones", "Hook of hamate", "Hamate bone", "hamate: hook", "wrist", "anterior",
     "Palmar hook: medial attachment of the flexor retinaculum; lateral wall of the ulnar (Guyon's) canal for the ulnar nerve and artery", ""),
    # metacarpals and phalanges
    ("Hand Bones", "Metacarpals", _MC, "", "hand", "posterior",
     "Five bones of the palm, numbered 1–5 from the thumb; each has a base (proximal), shaft and head (distal — the knuckle)", ""),
    ("Hand Bones", "Head of metacarpal", _MC, "hand: head", "hand", "anterior",
     "Distal end; the knuckle; articulates with the proximal phalanx (metacarpophalangeal joint)", ""),
    ("Hand Bones", "Shaft of metacarpal", _MC, "hand: shaft", "hand", "posterior",
     "Body of the metacarpal; interosseous muscles arise from its sides", ""),
    ("Hand Bones", "Base of metacarpal", _MC, "hand: base", "hand", "posterior",
     "Proximal end; articulates with the distal carpal row (carpometacarpal joints) and with neighbouring bases", ""),
    ("Hand Bones", "Sesamoid bones of the thumb", "First metacarpal bone", "hand: sesamoids", "hand", "anterior",
     "Two sesamoids on the palmar surface of the 1st metacarpal head, in the tendons of flexor pollicis brevis and adductor pollicis (not modelled separately: the highlight marks where they sit)", ""),
    ("Hand Bones", "Phalanges", _PH_ALL, "", "hand", "posterior",
     "14 phalanges: proximal, middle and distal in each finger; the thumb has only proximal and distal", ""),
    ("Hand Bones", "Head of phalanx", _PH_PM, "hand: head", "hand", "anterior",
     "Distal end (pulley-shaped) of a proximal or middle phalanx; forms the interphalangeal joint with the next phalanx", ""),
    ("Hand Bones", "Shaft of phalanx", _PH_PM, "hand: shaft", "hand", "anterior",
     "Body of the phalanx; the fibrous flexor sheath attaches to its palmar margins", ""),
    ("Hand Bones", "Base of phalanx", _PH_ALL, "hand: base", "hand", "anterior",
     "Proximal end; articulates with the metacarpal head (proximal phalanx) or the head of the phalanx before it", ""),
    ("Hand Bones", "Tuberosity of distal phalanx", _PH_D, "hand: distal tuberosity", "hand", "anterior",
     "Rough tip of each distal phalanx supporting the fingertip pulp", ""),
    # whole bones
    ("Upper Limb Bones", "Scapula", "Scapula", "", "shoulder", "posterior",
     "Triangular shoulder blade over ribs 2–7: spine, acromion, coracoid process, glenoid cavity; articulates with the clavicle and humerus", ""),
    ("Upper Limb Bones", "Clavicle", "Clavicle", "", "shoulder", "anterior",
     "S-shaped strut between the sternum and the acromion; the only bony attachment of the upper limb to the trunk; first bone to ossify", ""),
    ("Upper Limb Bones", "Humerus", "Humerus", "", "arm", "anterior",
     "Bone of the arm: head, tubercles, surgical neck, deltoid tuberosity, radial groove, condyle (capitulum + trochlea) and epicondyles", ""),
    ("Upper Limb Bones", "Radius", "Radius", "", "forearm", "anterior",
     "Lateral forearm bone (thumb side); small head above, broad distal end that forms most of the wrist joint; turns around the ulna in pronation", ""),
    ("Upper Limb Bones", "Ulna", "Ulna", "", "forearm", "anterior",
     "Medial forearm bone; large proximal end (olecranon, trochlear notch) forms the elbow hinge, small head distally", ""),
    # surface anatomy (structures under the skin; the model has no skin layer)
    ("Surface Anatomy", "Extensor digitorum tendons", "Extensor digitorum", "tendon: distal", "hand", "posterior",
     "Raised on the back of the hand when the fingers are extended; insert into the extensor expansions of digits 2–5. Radial nerve (posterior interosseous)", ""),
    ("Surface Anatomy", "Extensor indicis tendon", "Extensor indicis", "tendon: distal", "hand", "posterior",
     "Lies on the ulnar side of the index tendon of extensor digitorum; lets the index finger extend on its own (pointing)", ""),
    ("Surface Anatomy", "Extensor pollicis longus tendon", "Extensor pollicis longus", "tendon: distal", "hand", "posterolateral",
     "Posterior (ulnar) border of the anatomical snuffbox; turns around the dorsal tubercle of the radius; extends the thumb", ""),
    ("Surface Anatomy", "Extensor pollicis brevis tendon", "Extensor pollicis brevis", "tendon: distal", "hand", "posterolateral",
     "Anterior (radial) border of the anatomical snuffbox, alongside abductor pollicis longus; extends the thumb at the MCP joint", ""),
    ("Surface Anatomy", "Palmaris longus tendon", "Palmaris longus muscle", "tendon: distal long", "wrist", "anterior",
     "Thin central tendon at the front of the wrist (opposing thumb and little finger with the wrist flexed makes it stand out); superficial to the flexor retinaculum, over the median nerve; absent in about 15 %", ""),
    ("Surface Anatomy", "1st dorsal interosseous", "Dorsal interossei muscles of hand", "muscle: first dorsal interosseous", "hand", "posterior",
     "Bulge between the 1st and 2nd metacarpals on the back of the hand when the index finger is abducted; deep branch of the ulnar nerve", ""),
    ("Surface Anatomy", "Anatomical snuffbox", "Scaphoid bone", "scaphoid: snuffbox", "wrist", "lateral",
     "Hollow on the radial side of the wrist with the thumb extended. Borders: extensor pollicis longus (posterior); extensor pollicis brevis + abductor pollicis longus (anterior). Floor: scaphoid and trapezium (shown); radial styloid proximally. Contains the radial artery. Tenderness = possible scaphoid fracture", ""),
    ("Surface Anatomy", "Head of 1st metacarpal", "First metacarpal bone", "hand: head", "hand", "anterior",
     "Palpable at the thumb's MCP joint; its palmar surface carries the two sesamoid bones", ""),
    ("Surface Anatomy", "Thenar eminence", "Abductor pollicis brevis, Superficial head of flexor pollicis brevis, Deep head of flexor pollicis brevis, Opponens pollicis muscle", "", "hand", "anterior",
     "Muscle mound at the base of the thumb: abductor pollicis brevis, flexor pollicis brevis, opponens pollicis — recurrent branch of the median nerve (wasted in carpal tunnel syndrome)", ""),
    ("Surface Anatomy", "Hypothenar eminence", "Abductor digiti minimi of hand, Flexor digiti minimi of hand, Opponens digiti minimi muscle of hand", "", "hand", "anterior",
     "Mound on the little-finger side of the palm: abductor, flexor and opponens digiti minimi — deep branch of the ulnar nerve", ""),
    ("Surface Anatomy", "DIP joint crease", "Articular capsules of distal interphalangeal joints", "", "hand", "anterior",
     "Skin crease over the distal interphalangeal joints (the joints are shown: the model has no skin)", ""),
    ("Surface Anatomy", "PIP joint crease", "Articular capsules of proximal interphalangeal joints", "", "hand", "anterior",
     "Skin creases over the proximal interphalangeal joints (joints shown)", ""),
    ("Surface Anatomy", "MCP (palmar digital) crease", "Articular capsules of metacarpophalangeal joints", "", "hand", "anterior",
     "Creases at the base of the fingers, about 1–2 cm distal to the metacarpophalangeal joints (joints shown)", ""),
    ("Surface Anatomy", "Distal transverse palmar crease", "Third metacarpal bone, Fourth metacarpal bone, Fifth metacarpal bone", "hand: distal transverse crease", "hand", "anterior",
     "Runs across the ulnar palm over the heads of the 3rd–5th metacarpals (position approximate: the model has no skin)", ""),
    ("Surface Anatomy", "Proximal transverse palmar crease", "Second metacarpal bone, Third metacarpal bone, Fourth metacarpal bone, Fifth metacarpal bone", "hand: proximal transverse crease", "hand", "anterior",
     "Starts at the radial palm border with the thenar crease and crosses the palm over the metacarpal shafts (position approximate)", ""),
]
# surface-anatomy muscles, with full cards (same tuple layout as SAMPLES)
UL_MUSCLES = [
    # chest
    ("Chest", "Pectoralis major", "Clavicular head of pectoralis major muscle, Sternocostal head of pectoralis major muscle", "shoulder", "anterior",
     "Medial half of the clavicle; sternum and upper costal cartilages", "Lateral lip of the intertubercular groove",
     "Medial and lateral pectoral nerves", "Medial pectoral nerve, Lateral pectoral nerve",
     "Adducts and medially rotates the arm; clavicular head flexes it, sternocostal head extends it from flexion", ""),
    ("Chest", "Pectoralis minor", "Pectoralis minor muscle", "shoulder", "anterior",
     "Ribs 3–5 near their costal cartilages", "Coracoid process",
     "Medial pectoral nerve", "Medial pectoral nerve", "Stabilizes the scapula, drawing it forward and down against the chest wall",
     "Divides the axillary artery into three parts."),
    ("Chest", "Subclavius", "Subclavius muscle", "shoulder", "anterior",
     "First rib and its costal cartilage", "Inferior surface of the clavicle",
     "Nerve to subclavius", "", "Anchors and depresses the clavicle", "Not drawn in this model: the nerve to subclavius."),
    ("Chest", "Serratus anterior", "Serratus anterior muscle", "shoulder", "anterolateral",
     "Outer surfaces of the upper 8–9 ribs", "Anterior (costal) surface of the medial border of the scapula",
     "Long thoracic nerve", "Long thoracic nerve", "Protracts the scapula and holds it against the thoracic wall; rotates it upward",
     "Long thoracic nerve injury → winged scapula."),
    # shoulder
    ("Shoulder", "Deltoid", "Clavicular part of deltoid muscle, Acromial part of deltoid muscle, Scapular spinal part of deltoid muscle", "shoulder", "anterolateral",
     "Lateral third of the clavicle, acromion and spine of the scapula", "Deltoid tuberosity of the humerus",
     "Axillary nerve (C5–C6)", "Axillary nerve",
     "Anterior fibres flex and medially rotate the arm; middle fibres abduct it; posterior fibres extend and laterally rotate it",
     "Forms the rounded contour of the shoulder."),
    ("Shoulder", "Supraspinatus", "Supraspinatus muscle", "shoulder", "posterior",
     "Supraspinous fossa", "Greater tubercle of the humerus (superior facet)",
     "Suprascapular nerve", "Suprascapular nerve", "Starts abduction of the arm (first ~15°); rotator cuff",
     "Most often torn rotator cuff tendon."),
    ("Shoulder", "Infraspinatus", "Infraspinatus muscle", "shoulder", "posterior",
     "Infraspinous fossa", "Greater tubercle of the humerus (middle facet)",
     "Suprascapular nerve", "Suprascapular nerve", "Laterally rotates the arm; rotator cuff", ""),
    ("Shoulder", "Teres minor", "Teres minor muscle", "shoulder", "posterior",
     "Lateral border of the scapula", "Greater tubercle of the humerus (inferior facet)",
     "Axillary nerve", "Axillary nerve", "Laterally rotates the arm; rotator cuff", ""),
    ("Shoulder", "Teres major", "Teres major muscle", "shoulder", "posterior",
     "Posterior surface of the inferior angle of the scapula", "Medial lip of the intertubercular groove",
     "Lower subscapular nerve", "Inferior subscapular nerve", "Adducts and medially rotates the arm", ""),
    ("Shoulder", "Subscapularis", "Subscapularis muscle", "shoulder", "anterior",
     "Subscapular fossa", "Lesser tubercle of the humerus",
     "Upper and lower subscapular nerves", "Superior subscapular nerve, Inferior subscapular nerve",
     "Medially rotates the arm; rotator cuff", ""),
    # arm
    ("Arm", "Biceps brachii", "Long head of biceps brachii, Short head of biceps brachii", "arm", "anterior",
     "Short head: coracoid process; long head: supraglenoid tubercle", "Radial tuberosity and, via the bicipital aponeurosis, the forearm fascia",
     "Musculocutaneous nerve (C5–C6)", "Musculocutaneous nerve",
     "Flexes and supinates the forearm (supination strongest with the elbow flexed)", "Biceps reflex tests C5–C6."),
    ("Arm", "Coracobrachialis", "Coracobrachialis muscle", "arm", "anteromedial",
     "Coracoid process", "Middle of the medial humeral shaft",
     "Musculocutaneous nerve", "Musculocutaneous nerve", "Weakly flexes and adducts the arm",
     "The musculocutaneous nerve pierces it."),
    ("Arm", "Brachialis", "Brachialis muscle", "arm", "anterior",
     "Distal half of the anterior humeral shaft", "Coronoid process and ulnar tuberosity",
     "Musculocutaneous nerve (small radial nerve contribution)", "Musculocutaneous nerve",
     "Flexes the forearm in any position — the main elbow flexor", ""),
    ("Arm", "Triceps brachii", "Long head of triceps brachii, Lateral head of triceps brachii, Medial head of triceps brachii", "arm", "posterior",
     "Long head: infraglenoid tubercle; lateral and medial heads: posterior humeral shaft (above and below the radial groove)",
     "Olecranon", "Radial nerve", "Radial nerve",
     "Extends the forearm; the long head also helps extend and adduct the arm", "Triceps reflex tests C7."),
    ("Arm", "Anconeus", "Anconeus muscle", "elbow", "posterior",
     "Lateral epicondyle of the humerus", "Lateral side of the olecranon and proximal ulna",
     "Radial nerve", "Radial nerve", "Weakly extends the forearm; steadies the elbow", ""),
    # forearm (anterior)
    ("Forearm", "Pronator teres", "Superficial head of pronator teres, Deep head of pronator teres", "forearm", "anterior",
     "Medial epicondyle (humeral head) and coronoid process (ulnar head)", "Middle of the lateral radial shaft",
     "Median nerve", "Median nerve", "Pronates and flexes the forearm",
     "The median nerve passes between its two heads."),
    ("Forearm", "Flexor carpi radialis", "Flexor carpi radialis", "forearm", "anterior",
     "Medial epicondyle of the humerus", "Base of the 2nd metacarpal",
     "Median nerve", "Median nerve", "Flexes and abducts the hand", ""),
    ("Forearm", "Palmaris longus", "Palmaris longus muscle", "forearm", "anterior",
     "Medial epicondyle of the humerus", "Flexor retinaculum and palmar aponeurosis",
     "Median nerve", "Median nerve", "Flexes the hand; tenses the palmar aponeurosis", "Absent in about 15 %."),
    ("Forearm", "Flexor carpi ulnaris", "Humeral head of flexor carpi ulnaris, Ulnar head of flexor carpi ulnaris", "forearm", "anteromedial",
     "Medial epicondyle and the olecranon / posterior ulnar border", "Pisiform, hook of hamate and base of the 5th metacarpal",
     "Ulnar nerve", "Ulnar nerve", "Flexes and adducts the hand", "The ulnar nerve enters the forearm between its two heads."),
    ("Forearm", "Flexor digitorum superficialis", "Humero-ulnar head of flexor digitorum superficialis, Radial head of flexor digitorum superficialis", "forearm", "anterior",
     "Medial epicondyle, coronoid process and proximal anterior radius", "Sides of the middle phalanges of digits 2–5",
     "Median nerve", "Median nerve", "Flexes the PIP and MCP joints of digits 2–5 (and the wrist)", ""),
    ("Forearm", "Flexor digitorum profundus", "Flexor digitorum profundus", "forearm", "anterior",
     "Proximal and middle anterior ulna and the interosseous membrane", "Bases of the distal phalanges of digits 2–5",
     "Ulnar nerve (medial half, digits 4–5); median nerve via the anterior interosseous nerve (lateral half, digits 2–3)",
     "Ulnar nerve, Anterior interosseous nerve of forearm",
     "Flexes the DIP joints of digits 2–5 (then the PIP, MCP and wrist)", "The only muscle that flexes the DIP joints."),
    ("Forearm", "Flexor pollicis longus", "Flexor pollicis longus", "forearm", "anterior",
     "Anterior radial shaft and the interosseous membrane", "Base of the distal phalanx of the thumb",
     "Median nerve (anterior interosseous)", "Anterior interosseous nerve of forearm", "Flexes the thumb (its IP joint)", ""),
    ("Forearm", "Pronator quadratus", "Pronator quadratus", "wrist", "anterior",
     "Distal quarter of the anterior ulna", "Distal quarter of the anterior radius",
     "Median nerve (anterior interosseous)", "Anterior interosseous nerve of forearm", "Pronates the forearm (the main pronator)", ""),
    # forearm (posterior / lateral)
    ("Forearm", "Brachioradialis", "Brachioradialis muscle", "forearm", "anterolateral",
     "Lateral supracondylar ridge of the humerus", "Distal radius, at the base of the styloid process",
     "Radial nerve", "Radial nerve", "Flexes the forearm, strongest in mid-pronation", "Radial nerve muscle that flexes the elbow."),
    ("Forearm", "Extensor carpi radialis longus", "Extensor carpi radialis longus", "forearm", "posterolateral",
     "Lateral supracondylar ridge of the humerus", "Base of the 2nd metacarpal",
     "Radial nerve", "Radial nerve", "Extends and abducts the hand", ""),
    ("Forearm", "Extensor carpi radialis brevis", "Extensor carpi radialis brevis", "forearm", "posterolateral",
     "Lateral epicondyle of the humerus", "Base of the 3rd metacarpal",
     "Radial nerve (deep branch)", "Deep branch of radial nerve", "Extends and abducts the hand",
     "Its origin is the usual site of tennis elbow."),
    ("Forearm", "Extensor digitorum", "Extensor digitorum", "forearm", "posterior",
     "Lateral epicondyle of the humerus", "Extensor expansions of digits 2–5",
     "Radial nerve (posterior interosseous)", "Posterior interosseous nerve of forearm", "Extends the MCP and IP joints of digits 2–5 (and the wrist)", ""),
    ("Forearm", "Extensor digiti minimi", "Extensor digiti minimi", "forearm", "posterior",
     "Lateral epicondyle of the humerus", "Extensor expansion of digit 5",
     "Radial nerve (posterior interosseous)", "Posterior interosseous nerve of forearm", "Extends the MCP and IP joints of the little finger", ""),
    ("Forearm", "Extensor carpi ulnaris", "Humeral head of extensor carpi ulnaris, Ulnar head of extensor carpi ulnaris", "forearm", "posterior",
     "Lateral epicondyle of the humerus and posterior border of the ulna", "Base of the 5th metacarpal",
     "Radial nerve (posterior interosseous)", "Posterior interosseous nerve of forearm", "Extends and adducts the hand", ""),
    ("Forearm", "Supinator", "Supinator", "elbow", "posterolateral",
     "Lateral epicondyle, radial collateral and annular ligaments, supinator crest of the ulna", "Proximal third of the radius",
     "Radial nerve (deep branch)", "Deep branch of radial nerve", "Supinates the forearm",
     "The deep branch of the radial nerve passes through it."),
    ("Forearm", "Extensor indicis", "Extensor indicis", "forearm", "posterior",
     "Posterior distal ulna and the interosseous membrane", "Extensor expansion of the index finger",
     "Radial nerve (posterior interosseous)", "Posterior interosseous nerve of forearm", "Extends the index finger", ""),
    ("Forearm", "Abductor pollicis longus", "Abductor pollicis longus", "forearm", "posterior",
     "Posterior surfaces of the ulna, radius and interosseous membrane", "Base of the 1st metacarpal",
     "Radial nerve (posterior interosseous)", "Posterior interosseous nerve of forearm", "Abducts the thumb", "Anterior border of the anatomical snuffbox, with EPB."),
    ("Forearm", "Extensor pollicis longus", "Extensor pollicis longus", "forearm", "posterior",
     "Middle third of the posterior ulna and the interosseous membrane", "Base of the distal phalanx of the thumb",
     "Radial nerve (posterior interosseous)", "Posterior interosseous nerve of forearm", "Extends the thumb (all its joints)",
     "Posterior border of the anatomical snuffbox."),
    ("Forearm", "Extensor pollicis brevis", "Extensor pollicis brevis", "forearm", "posterior",
     "Posterior distal radius and the interosseous membrane", "Base of the proximal phalanx of the thumb",
     "Radial nerve (posterior interosseous)", "Posterior interosseous nerve of forearm", "Extends the thumb at the MCP joint", ""),
    # hand
    ("Hand", "Opponens pollicis", "Opponens pollicis muscle", "hand", "anterior",
     "Flexor retinaculum and tubercle of the trapezium", "Lateral border of the 1st metacarpal",
     "Recurrent branch of the median nerve", "Median nerve", "Opposes the thumb", "Not drawn: the recurrent branch itself (median nerve shown)."),
    ("Hand", "Abductor pollicis brevis", "Abductor pollicis brevis", "hand", "anterior",
     "Flexor retinaculum, scaphoid and trapezium", "Lateral base of the proximal phalanx of the thumb",
     "Recurrent branch of the median nerve", "Median nerve", "Abducts the thumb", ""),
    ("Hand", "Flexor pollicis brevis", "Superficial head of flexor pollicis brevis, Deep head of flexor pollicis brevis", "hand", "anterior",
     "Flexor retinaculum and trapezium (deep head: trapezoid, capitate)", "Base of the proximal phalanx of the thumb",
     "Recurrent branch of the median nerve (deep head: ulnar nerve)", "Median nerve", "Flexes the thumb at the MCP joint", ""),
    ("Hand", "Adductor pollicis", "Oblique head of adductor pollicis, Transverse head of adductor pollicis", "hand", "anterior",
     "Oblique head: bases of the 2nd–3rd metacarpals and capitate; transverse head: shaft of the 3rd metacarpal",
     "Medial base of the proximal phalanx of the thumb",
     "Ulnar nerve (deep branch)", "Deep branch of ulnar nerve", "Adducts the thumb", "Weak → Froment's sign."),
    ("Hand", "Abductor digiti minimi", "Abductor digiti minimi of hand", "hand", "anterior",
     "Pisiform", "Medial base of the proximal phalanx of the little finger",
     "Ulnar nerve (deep branch)", "Deep branch of ulnar nerve", "Abducts the little finger", ""),
    ("Hand", "Flexor digiti minimi", "Flexor digiti minimi of hand", "hand", "anterior",
     "Hook of the hamate and flexor retinaculum", "Base of the proximal phalanx of the little finger",
     "Ulnar nerve (deep branch)", "Deep branch of ulnar nerve", "Flexes the little finger at the MCP joint", ""),
    ("Hand", "Opponens digiti minimi", "Opponens digiti minimi muscle of hand", "hand", "anterior",
     "Hook of the hamate and flexor retinaculum", "Medial border of the 5th metacarpal",
     "Ulnar nerve (deep branch)", "Deep branch of ulnar nerve", "Opposes the little finger (draws the 5th metacarpal forward)", ""),
    ("Hand", "Dorsal interossei", "Dorsal interossei muscles of hand", "hand", "posterior",
     "Adjacent sides of the metacarpals (four bipennate muscles)", "Bases of the proximal phalanges and extensor expansions of digits 2–4",
     "Ulnar nerve (deep branch)", "Deep branch of ulnar nerve", "Abduct digits 2–4 (DAB); help the lumbricals flex MCP and extend IP joints", ""),
    ("Hand", "Palmar interossei", "Palmar interossei muscles", "hand", "anterior",
     "Palmar surfaces of the 2nd, 4th and 5th metacarpals", "Proximal phalanges and extensor expansions of digits 2, 4 and 5",
     "Ulnar nerve (deep branch)", "Deep branch of ulnar nerve", "Adduct digits 2, 4 and 5 (PAD); help the lumbricals", ""),
]
# lumbricals: one mesh in the model, so each pair is a patch on it (radial vs ulnar side)
UL_LUMBRICALS = [
    ("Hand", "Lumbricals 1 and 2", "muscle: lumbricals radial",
     "Lateral two tendons of flexor digitorum profundus", "Extensor expansions of digits 2 and 3",
     "Median nerve", "Median nerve", "Flex the MCP joints and extend the IP joints"),
    ("Hand", "Lumbricals 3 and 4", "muscle: lumbricals ulnar",
     "Medial three tendons of flexor digitorum profundus (bipennate)", "Extensor expansions of digits 4 and 5",
     "Ulnar nerve (deep branch)", "Deep branch of ulnar nerve", "Flex the MCP joints and extend the IP joints"),
]

# ---------------------------------------------------------------------------------------
# Lower limb, from the course muscle table (same layout as SAMPLES; later entries replace
# earlier notes of the same Structure).
LL_RENAME = {"Biceps femoris (long head)": "Biceps femoris"}
LL_MUSCLES = [
    ("Anterior Thigh", "Pectineus", "Pectineus muscle", "hip", "anterior",
     "Pecten (superior ramus) of the pubis", "Pectineal line of the femur, below the lesser trochanter",
     "Femoral nerve (sometimes also obturator)", "Femoral nerve", "Adducts and flexes the thigh", ""),
    ("Anterior Thigh", "Psoas major", "Psoas major", "hip", "anterior",
     "Bodies and transverse processes of T12–L5", "Lesser trochanter (with iliacus, as iliopsoas)",
     "Anterior rami of L1–L3", "", "Flexes the thigh (with iliacus, the strongest hip flexor)", ""),
    ("Anterior Thigh", "Psoas minor", "Psoas major", "hip", "anterior",
     "Bodies of T12–L1", "Iliopubic eminence (pectineal line of the pelvis)",
     "Anterior rami of L1–L2", "", "Weakly flexes the trunk on the pelvis",
     "Not in this model (absent in about half of people): the highlight is psoas major, on whose front it lies."),
    ("Anterior Thigh", "Iliacus", "Iliacus muscle", "hip", "anterior",
     "Iliac fossa and crest", "Lesser trochanter, via the psoas major tendon",
     "Femoral nerve", "Femoral nerve", "Flexes the thigh", ""),
    ("Anterior Thigh", "Sartorius", "Sartorius muscle", "thigh", "anterior",
     "Anterior superior iliac spine (ASIS)", "Medial surface of the proximal tibia (pes anserinus)",
     "Femoral nerve", "Femoral nerve", "Flexes, abducts and laterally rotates the thigh; flexes the leg", ""),
    ("Anterior Thigh", "Rectus femoris", "Rectus femoris muscle", "thigh", "anterior",
     "Anterior inferior iliac spine (and above the acetabulum)", "Patella via the quadriceps tendon, then tibial tuberosity",
     "Femoral nerve", "Femoral nerve", "Extends the leg; flexes the thigh", "The only quadriceps head crossing the hip."),
    ("Anterior Thigh", "Vastus lateralis", "Vastus lateralis muscle", "thigh", "anterolateral",
     "Greater trochanter and lateral lip of the linea aspera", "Patella via the quadriceps tendon",
     "Femoral nerve", "Femoral nerve", "Extends the leg", ""),
    ("Anterior Thigh", "Vastus medialis", "Vastus medialis muscle", "thigh", "anteromedial",
     "Intertrochanteric line and medial lip of the linea aspera", "Patella via the quadriceps tendon",
     "Femoral nerve", "Femoral nerve", "Extends the leg; its lowest fibres steady the patella", ""),
    ("Anterior Thigh", "Vastus intermedius", "Vastus intermedius muscle", "thigh", "anterior",
     "Anterior and lateral shaft of the femur", "Patella via the quadriceps tendon",
     "Femoral nerve", "Femoral nerve", "Extends the leg", ""),
    ("Medial Thigh", "Adductor longus", "Adductor longus", "thigh", "anterior",
     "Body of the pubis, below the pubic crest", "Middle third of the linea aspera",
     "Obturator nerve", "Obturator nerve", "Adducts the thigh", ""),
    ("Medial Thigh", "Adductor brevis", "Adductor brevis", "thigh", "anteromedial",
     "Body and inferior ramus of the pubis", "Pectineal line and upper linea aspera",
     "Obturator nerve", "Obturator nerve", "Adducts the thigh", ""),
    ("Medial Thigh", "Gracilis", "Gracilis muscle", "thigh", "medial",
     "Body and inferior ramus of the pubis", "Medial surface of the proximal tibia (pes anserinus)",
     "Obturator nerve", "Obturator nerve", "Adducts the thigh; flexes and medially rotates the leg", ""),
    ("Medial Thigh", "Obturator externus", "Obturator externus", "hip", "anterior",
     "Outer surface of the obturator membrane and the bone around the foramen", "Trochanteric fossa of the femur",
     "Obturator nerve", "Obturator nerve", "Laterally rotates the thigh", ""),
    ("Gluteal Region", "Gluteus maximus", "Gluteus maximus muscle", "gluteal", "posterior",
     "Posterior ilium, dorsal sacrum and coccyx, sacrotuberous ligament", "Iliotibial tract and gluteal tuberosity of the femur",
     "Inferior gluteal nerve (L5–S2)", "", "Extends the thigh (rising from sitting, climbing); laterally rotates it",
     "Not drawn in this model: the inferior gluteal nerve."),
    ("Gluteal Region", "Gluteus medius", "Gluteus medius muscle", "gluteal", "posterolateral",
     "Outer surface of the ilium", "Lateral surface of the greater trochanter",
     "Superior gluteal nerve", "Superior gluteal nerve", "Abducts and medially rotates the thigh; keeps the pelvis level in walking",
     "Weak → Trendelenburg sign (pelvis drops on the unsupported side)."),
    ("Gluteal Region", "Gluteus minimus", "Gluteus minimus muscle", "gluteal", "lateral",
     "Outer surface of the ilium (below gluteus medius)", "Anterior surface of the greater trochanter",
     "Superior gluteal nerve", "Superior gluteal nerve", "Abducts and medially rotates the thigh", ""),
    ("Gluteal Region", "Tensor fasciae latae", "Tensor fasciae latae", "hip", "anterolateral",
     "Anterior superior iliac spine and the iliac crest just behind it", "Iliotibial tract",
     "Superior gluteal nerve", "Superior gluteal nerve", "Abducts and medially rotates the thigh; tenses the iliotibial tract", ""),
    ("Gluteal Region", "Piriformis", "Piriformis muscle", "gluteal", "posterior",
     "Anterior surface of the sacrum", "Superior border of the greater trochanter",
     "Nerve to piriformis", "Nerve to piriformis muscle", "Laterally rotates the thigh",
     "Key landmark: the sciatic nerve usually leaves the pelvis below it."),
    ("Gluteal Region", "Obturator internus", "Obturator internus", "gluteal", "posterior",
     "Inner surface of the obturator membrane and the surrounding bone", "Medial surface of the greater trochanter",
     "Nerve to obturator internus", "", "Laterally rotates the thigh", "Not drawn: the nerve to obturator internus."),
    ("Gluteal Region", "Superior gemellus", "Superior gemellus muscle", "gluteal", "posterior",
     "Ischial spine", "Greater trochanter (with the obturator internus tendon)",
     "Nerve to obturator internus", "", "Laterally rotates the thigh", ""),
    ("Gluteal Region", "Inferior gemellus", "Inferior gemellus muscle", "gluteal", "posterior",
     "Ischial tuberosity", "Greater trochanter (with the obturator internus tendon)",
     "Nerve to quadratus femoris", "Nerve to quadratus femoris muscle", "Laterally rotates the thigh", ""),
    ("Gluteal Region", "Quadratus femoris", "Quadratus femoris muscle", "gluteal", "posterior",
     "Lateral border of the ischial tuberosity", "Quadrate tubercle on the intertrochanteric crest",
     "Nerve to quadratus femoris", "Nerve to quadratus femoris muscle", "Laterally rotates the thigh", ""),
    ("Posterior Thigh", "Semitendinosus", "Semitendinosus muscle", "thigh", "posterior",
     "Ischial tuberosity", "Medial surface of the proximal tibia (pes anserinus)",
     "Tibial division of the sciatic nerve", "Sciatic nerve", "Flexes and medially rotates the leg; extends the thigh", ""),
    ("Posterior Thigh", "Semimembranosus", "Semimembranosus muscle", "thigh", "posterior",
     "Ischial tuberosity", "Posterior medial condyle of the tibia",
     "Tibial division of the sciatic nerve", "Sciatic nerve", "Flexes and medially rotates the leg; extends the thigh", ""),
    ("Posterior Thigh", "Biceps femoris", "Long head of biceps femoris, Short head of biceps femoris", "thigh", "posterior",
     "Long head: ischial tuberosity; short head: lateral lip of the linea aspera", "Head of the fibula",
     "Long head: tibial division of sciatic; short head: common fibular division", "Sciatic nerve",
     "Flexes and laterally rotates the leg; long head extends the thigh", ""),
    ("Anterior Leg", "Tibialis anterior", "Tibialis anterior muscle", "leg", "anterior",
     "Lateral condyle and upper lateral shaft of the tibia", "Medial cuneiform and base of the 1st metatarsal",
     "Deep fibular nerve", "Deep fibular nerve", "Dorsiflexes the ankle; inverts the foot",
     "Weak → foot drop (high-stepping gait)."),
    ("Anterior Leg", "Extensor digitorum longus", "Extensor digitorum longus, Tendon of extensor digitorum longus", "leg", "anterior",
     "Lateral condyle of the tibia and upper anterior fibula", "Middle and distal phalanges of toes 2–5",
     "Deep fibular nerve", "Deep fibular nerve", "Extends toes 2–5; dorsiflexes the ankle", ""),
    ("Anterior Leg", "Extensor hallucis longus", "Extensor hallucis longus", "leg", "anterior",
     "Middle anterior fibula and interosseous membrane", "Base of the distal phalanx of the great toe",
     "Deep fibular nerve", "Deep fibular nerve", "Extends the great toe; dorsiflexes the ankle", ""),
    ("Anterior Leg", "Fibularis tertius", "Fibularis tertius muscle", "leg", "anterolateral",
     "Distal anterior fibula", "Base of the 5th metatarsal",
     "Deep fibular nerve", "Deep fibular nerve", "Dorsiflexes the ankle; everts the foot", ""),
    ("Lateral Leg", "Fibularis longus", "Fibularis longus muscle", "leg", "lateral",
     "Head and upper lateral shaft of the fibula", "Base of the 1st metatarsal and medial cuneiform (under the sole)",
     "Superficial fibular nerve", "Superficial fibular nerve", "Everts the foot; weakly plantarflexes", ""),
    ("Lateral Leg", "Fibularis brevis", "Fibularis brevis muscle", "leg", "lateral",
     "Lower lateral shaft of the fibula", "Tuberosity of the 5th metatarsal",
     "Superficial fibular nerve", "Superficial fibular nerve", "Everts the foot; weakly plantarflexes", ""),
    ("Posterior Leg", "Gastrocnemius", "Medial head of gastrocnemius, Lateral head of gastrocnemius, Calcaneal tendon", "leg", "posterior",
     "Lateral head: lateral condyle of the femur; medial head: above the medial condyle", "Calcaneal tuberosity via the calcaneal (Achilles) tendon",
     "Tibial nerve", "Tibial nerve", "Plantarflexes the ankle (when the knee is straight); flexes the leg", ""),
    ("Posterior Leg", "Soleus", "Soleus muscle", "leg", "posterior",
     "Soleal line of the tibia and upper posterior fibula", "Calcaneal tuberosity via the calcaneal tendon",
     "Tibial nerve", "Tibial nerve", "Plantarflexes the ankle (main postural plantarflexor)", ""),
    ("Posterior Leg", "Plantaris", "Plantaris muscle", "knee", "posterior",
     "Lateral supracondylar line of the femur, just above the lateral condyle", "Calcaneus with the calcaneal tendon",
     "Tibial nerve", "Tibial nerve", "Weakly plantarflexes", ""),
    ("Posterior Leg", "Popliteus", "Popliteus muscle", "knee", "posterior",
     "Lateral epicondyle (lateral condyle) of the femur", "Posterior surface of the proximal tibia, above the soleal line",
     "Tibial nerve", "Tibial nerve", "Unlocks the extended knee (laterally rotates the femur on the tibia)", ""),
    ("Posterior Leg", "Flexor hallucis longus", "Flexor hallucis longus", "leg", "posterior",
     "Lower posterior fibula", "Base of the distal phalanx of the great toe",
     "Tibial nerve", "Tibial nerve", "Flexes the great toe; weakly plantarflexes", ""),
    ("Posterior Leg", "Flexor digitorum longus", "Flexor digitorum longus", "leg", "posterior",
     "Posterior surface of the tibia", "Bases of the distal phalanges of toes 2–5",
     "Tibial nerve", "Tibial nerve", "Flexes toes 2–5; weakly plantarflexes", ""),
    ("Posterior Leg", "Tibialis posterior", "Tibialis posterior muscle", "leg", "posterior",
     "Posterior tibia, fibula and interosseous membrane", "Navicular tuberosity and the medial tarsal bones (plantar side)",
     "Tibial nerve", "Tibial nerve", "Plantarflexes the ankle; inverts the foot", ""),
    # foot (details mostly for reference: know the plantar-nerve split)
    ("Foot", "Abductor hallucis", "Abductor hallucis", "foot", "medial",
     "Calcaneal tuberosity", "Base of the proximal phalanx of the great toe",
     "Medial plantar nerve", "Medial plantar nerve", "Abducts and flexes the great toe", ""),
    ("Foot", "Flexor digitorum brevis", "Flexor digitorum brevis", "foot", "inferior",
     "Calcaneal tuberosity", "Middle phalanges of toes 2–5",
     "Medial plantar nerve", "Medial plantar nerve", "Flexes toes 2–5", ""),
    ("Foot", "Abductor digiti minimi (foot)", "Abductor digiti minimi of foot", "foot", "lateral",
     "Calcaneal tuberosity", "Base of the proximal phalanx of the 5th toe",
     "Lateral plantar nerve", "Lateral plantar nerve", "Abducts and flexes the little toe", ""),
    ("Foot", "Quadratus plantae", "Quadratus plantae muscle", "foot", "inferior",
     "Plantar surface of the calcaneus", "Tendon of flexor digitorum longus",
     "Lateral plantar nerve", "Lateral plantar nerve", "Helps flexor digitorum longus (straightens its line of pull)", ""),
    ("Foot", "Lumbricals (foot)", "Lumbrical muscles of foot", "foot", "inferior",
     "Tendons of flexor digitorum longus", "Extensor expansions of toes 2–5",
     "1st: medial plantar nerve; 2nd–4th: lateral plantar nerve", "Medial plantar nerve, Lateral plantar nerve",
     "Flex the proximal phalanges and extend the middle and distal phalanges of toes 2–5", ""),
    ("Foot", "Flexor hallucis brevis", "Medial head of flexor hallucis brevis, Lateral head of flexor hallucis brevis", "foot", "inferior",
     "Cuboid and lateral cuneiform (plantar side)", "Base of the proximal phalanx of the great toe (via the sesamoids)",
     "Medial plantar nerve", "Medial plantar nerve", "Flexes the great toe", ""),
    ("Foot", "Adductor hallucis", "Oblique head of adductor hallucis, Transverse head of adductor hallucis", "foot", "inferior",
     "Oblique head: bases of metatarsals 2–4; transverse head: plantar ligaments of the MTP joints 3–5", "Base of the proximal phalanx of the great toe",
     "Lateral plantar nerve", "Lateral plantar nerve", "Adducts the great toe", ""),
    ("Foot", "Flexor digiti minimi brevis (foot)", "Flexor digiti minimi of foot", "foot", "inferior",
     "Base of the 5th metatarsal", "Base of the proximal phalanx of the 5th toe",
     "Lateral plantar nerve", "Lateral plantar nerve", "Flexes the little toe", ""),
    ("Foot", "Plantar interossei (foot)", "Plantar interossei muscles", "foot", "inferior",
     "Metatarsals 3–5 (medial sides)", "Proximal phalanges of toes 3–5",
     "Lateral plantar nerve", "Lateral plantar nerve", "Adduct toes 3–5; flex the MTP joints", ""),
    ("Foot", "Dorsal interossei (foot)", "Dorsal interossei muscles of foot", "foot", "superior",
     "Adjacent sides of metatarsals 1–5", "Proximal phalanges of toes 2–4",
     "Lateral plantar nerve", "Lateral plantar nerve", "Abduct toes 2–4; flex the MTP joints", ""),
    ("Foot", "Extensor digitorum brevis", "Extensor digitorum brevis", "foot", "anterolateral",
     "Dorsolateral calcaneus", "Long extensor tendons of toes 2–4",
     "Deep fibular nerve", "Deep fibular nerve", "Helps extensor digitorum longus extend toes 2–4", ""),
    ("Foot", "Extensor hallucis brevis", "Extensor hallucis brevis", "foot", "anterolateral",
     "Dorsolateral calcaneus", "Base of the proximal phalanx of the great toe",
     "Deep fibular nerve", "Deep fibular nerve", "Helps extensor hallucis longus extend the great toe", ""),
]
# adductor magnus: one mesh, two parts with different nerves → patches
LL_PART_MUSCLES = [
    ("Medial Thigh", "Adductor magnus — adductor part", "Adductor magnus", "muscle: adductor part", "thigh", "anteromedial",
     "Inferior pubic ramus and ischial ramus", "Gluteal tuberosity, linea aspera and medial supracondylar line",
     "Obturator nerve", "Obturator nerve", "Adducts and flexes the thigh"),
    ("Medial Thigh", "Adductor magnus — hamstring part", "Adductor magnus", "muscle: hamstring part", "thigh", "posterior",
     "Ischial tuberosity", "Adductor tubercle of the femur",
     "Tibial division of the sciatic nerve", "Sciatic nerve", "Adducts and extends the thigh"),
]
# landmarks (spec keys in the engine). (subdeck, Structure, bone meshes, key, region, camera, facts, reflect)
LL_NOTES = [
    ("Hip Bone Landmarks", "Ilium (body)", "Hip bone", "hip: ilium", "hip", "anterolateral",
     "Upper, fan-shaped part of the hip bone; its body forms the upper two-fifths of the acetabulum", ""),
    ("Hip Bone Landmarks", "Ischium (body)", "Hip bone", "hip: ischium", "hip", "posterolateral",
     "Posteroinferior part of the hip bone: body (back of the acetabulum), ischial spine, tuberosity and ramus", ""),
    ("Hip Bone Landmarks", "Pubis", "Hip bone", "hip: pubis", "hip", "anterior",
     "Anteromedial part of the hip bone: body, superior and inferior rami; meets the other side at the pubic symphysis", ""),
    ("Hip Bone Landmarks", "Superior pubic ramus", "Hip bone", "hip: superior pubic ramus", "hip", "anterior",
     "Runs from the pubic body up to the acetabulum; carries the pectineal line and forms the top of the obturator foramen", ""),
    ("Hip Bone Landmarks", "Inferior pubic ramus", "Hip bone", "hip: inferior pubic ramus", "hip", "anterior",
     "Runs down and back from the pubic body to join the ischial ramus (together: the ischiopubic ramus)", ""),
    ("Hip Bone Landmarks", "Symphyseal surface", "Hip bone", "hip: symphyseal surface", "hip", "anteromedial",
     "Oval medial surface of the pubic body, joined to the other side by fibrocartilage (pubic symphysis)", ""),
    ("Hip Bone Landmarks", "Pectineal line (pecten pubis)", "Hip bone", "hip: pectineal line", "hip", "anterior",
     "Sharp ridge on the superior pubic ramus, part of the pelvic brim: origin of pectineus; lacunar ligament attaches", ""),
    ("Hip Bone Landmarks", "Arcuate line", "Hip bone", "hip: arcuate line", "hip", "anteromedial",
     "Ridge on the inner ilium below the iliac fossa — the iliac part of the pelvic brim (true vs false pelvis)", ""),
    ("Hip Bone Landmarks", "Obturator foramen", "Hip bone", "hip: obturator foramen", "hip", "anterolateral",
     "Large opening between pubis and ischium, almost closed by the obturator membrane; the obturator canal at its top carries the obturator nerve and vessels", ""),
    ("Hip Bone Landmarks", "Auricular surface of ilium", "Hip bone", "hip: auricular surface", "hip", "medial",
     "Ear-shaped surface on the inner ilium that articulates with the sacrum (sacro-iliac joint)", "Sacrum"),
    ("Hip Bone Landmarks", "Iliac fossa", "Hip bone", "hip: iliac fossa", "hip", "anteromedial",
     "Smooth concave inner surface of the iliac wing: origin of iliacus", ""),
    ("Femur Landmarks", "Trochanteric fossa", "Femur", "femur: trochanteric fossa", "hip", "posterior",
     "Pit on the medial side of the greater trochanter: insertion of obturator externus", ""),
    ("Femur Landmarks", "Intertrochanteric crest", "Femur", "femur: intertrochanteric crest", "hip", "posterior",
     "Rounded ridge on the back between the trochanters (neck–shaft junction); quadrate tubercle for quadratus femoris", ""),
    ("Femur Landmarks", "Intertrochanteric line", "Femur", "femur: intertrochanteric line", "hip", "anterior",
     "Rough line on the front between the trochanters: attachment of the iliofemoral ligament and capsule; vastus medialis begins here", ""),
    ("Femur Landmarks", "Gluteal tuberosity", "Femur", "femur: gluteal tuberosity", "thigh", "posterior",
     "Rough ridge below the greater trochanter on the back of the femur: insertion of part of gluteus maximus", ""),
    ("Tibia & Fibula", "Medial tibial plateau", "Tibia", "tibia: medial plateau", "knee", "anterior",
     "Upper articular surface of the medial condyle; carries the medial meniscus", "Femur"),
    ("Tibia & Fibula", "Lateral tibial plateau", "Tibia", "tibia: lateral plateau", "knee", "anterior",
     "Upper articular surface of the lateral condyle; carries the lateral meniscus", "Femur"),
    ("Tibia & Fibula", "Medial condyle of tibia", "Tibia", "tibia: medial condyle", "knee", "anteromedial",
     "Medial expansion of the proximal tibia; semimembranosus inserts on its back", ""),
    ("Tibia & Fibula", "Lateral condyle of tibia", "Tibia", "tibia: lateral condyle", "knee", "anterolateral",
     "Lateral expansion of the proximal tibia; articulates with the fibular head underneath; iliotibial tract (Gerdy's tubercle) and tibialis anterior attach", ""),
    ("Tibia & Fibula", "Soleal line", "Tibia", "tibia: soleal line", "leg", "posterior",
     "Oblique ridge on the upper back of the tibia: origin of soleus; popliteus inserts above it", ""),
    ("Tibia & Fibula", "Tibial tuberosity", "Tibia", "tibia: tibial tuberosity", "knee", "anterolateral",
     "Bump at the top of the anterior border: insertion of the patellar ligament (quadriceps)", ""),
    ("Tibia & Fibula", "Medial malleolus", "Tibia", "tibia: medial malleolus", "foot", "medial",
     "Medial projection of the distal tibia, the inner ankle bone; deltoid ligament attaches. Tibialis posterior, FDL, posterior tibial vessels, tibial nerve, FHL pass behind it", ""),
    ("Tibia & Fibula", "Head of fibula", "Fibula", "fibula: head", "knee", "lateral",
     "Proximal end; articulates with the lateral tibial condyle. Biceps femoris and the fibular collateral ligament attach", ""),
    ("Tibia & Fibula", "Neck of fibula", "Fibula", "fibula: neck", "knee", "lateral",
     "Below the head: the common fibular nerve winds around it (fracture or pressure → foot drop)", ""),
    ("Tibia & Fibula", "Lateral malleolus", "Fibula", "fibula: lateral malleolus", "foot", "lateral",
     "Distal end of the fibula, the outer ankle bone (lower than the medial one); fibularis longus and brevis tendons pass behind it", ""),
    ("Tarsal Bones", "Calcaneal tuberosity", "Calcaneus", "calcaneus: tuberosity", "foot", "posterior",
     "Back of the heel: calcaneal (Achilles) tendon inserts; plantar muscles and aponeurosis arise from its underside", ""),
    ("Tarsal Bones", "Sustentaculum tali", "Calcaneus", "calcaneus: sustentaculum tali", "foot", "medial",
     "Medial shelf of the calcaneus supporting the talus; flexor hallucis longus tendon runs in the groove beneath it", ""),
    ("Tarsal Bones", "Intermediate cuneiform", "Intermediate cuneiform bone", "", "foot", "superior",
     "Smallest cuneiform, between the medial and lateral ones; articulates with the 2nd metatarsal", ""),
    ("Tarsal Bones", "Lateral cuneiform", "Lateral cuneiform bone", "", "foot", "superior",
     "Between the intermediate cuneiform and the cuboid; articulates with the 3rd metatarsal", ""),
    ("Tarsal Bones", "Cuneiforms", "Medial cuneiform bone, Intermediate cuneiform bone, Lateral cuneiform bone", "", "foot", "superior",
     "Three wedge-shaped bones (medial, intermediate, lateral) between the navicular and metatarsals 1–3; they shape the transverse arch", ""),
    ("Foot Bones", "Metatarsals", "First metatarsal bone, Second metatarsal bone, Third metatarsal bone, Fourth metatarsal bone, Fifth metatarsal bone", "", "foot", "superior",
     "Five long bones of the forefoot, each with a base, shaft and head; numbered 1–5 from the great toe", ""),
    ("Foot Bones", "Proximal phalanges (foot)", "Proximal phalanx of first finger of foot, Proximal phalanx of second finger of foot, Proximal phalanx of third finger of foot, Proximal phalanx of fourth finger of foot, Proximal phalanx of fifth finger of foot", "", "foot", "superior",
     "First row of toe bones; articulate with the metatarsal heads (MTP joints)", ""),
    ("Foot Bones", "Middle phalanges (foot)", "Middle phalanx of second finger of foot, Middle phalanx of third finger of foot, Middle phalanx of fourth finger of foot, Middle phalanx of fifth finger of foot", "", "foot", "superior",
     "Toes 2–5 only (the great toe has two phalanges)", ""),
    ("Foot Bones", "Distal phalanges (foot)", "Distal phalanx of first finger of foot, Distal phalanx of second finger of foot, Distal phalanx of third finger of foot, Distal phalanx of fourth finger of foot, Distal phalanx of fifth finger of foot", "", "foot", "superior",
     "Tips of the toes", ""),
    # surface anatomy (no skin in the model: the structures underneath are shown)
    ("Surface Anatomy", "Gluteal fold", "Gluteus maximus muscle", "muscle: gluteal fold", "gluteal", "posterior",
     "Skin fold below the buttock; it lies over the lower border of gluteus maximus but doesn't follow it exactly (shown: that border)", ""),
    ("Surface Anatomy", "Intergluteal (natal) cleft", "Coccyx, Sacrum", "", "gluteal", "posterior",
     "Midline groove between the buttocks, over the lower sacrum and coccyx (shown); pilonidal sinus site", ""),
    ("Surface Anatomy", "Inguinal ligament", "Inguinal ligament", "", "hip", "anterior",
     "From the anterior superior iliac spine to the pubic tubercle: the lower border of the external oblique aponeurosis; the femoral vessels and nerve pass beneath it", ""),
    ("Surface Anatomy", "Popliteal fossa", "Femur", "femur: popliteal surface", "knee", "posterior",
     "Diamond-shaped space behind the knee (shown: its floor on the femur). Borders: biceps femoris (superolateral), semimembranosus/semitendinosus (superomedial), the two heads of gastrocnemius (below). Contains the popliteal artery and vein, tibial and common fibular nerves", ""),
    ("Surface Anatomy", "Tendocalcaneus (Achilles tendon)", "Calcaneal tendon", "", "foot", "posterior",
     "Common tendon of gastrocnemius and soleus (triceps surae) onto the calcaneal tuberosity; ankle jerk tests S1", ""),
]

# ---------------------------------------------------------------------------------------
# Back (trunk model). Vertebral landmarks are found per vertebra from its canal; region
# "vertebra" shows the vertebra on its own. (subdeck, Structure, Meshes, Landmark, Region, Camera, facts)
_CERV = "Atlas (C1), Axis (C2), Vertebra C3, Vertebra C4, Vertebra C5, Vertebra C6, Vertebra C7"
_THOR = ", ".join("Vertebra T%d" % i for i in range(1, 13))
_LUMB = ", ".join("Vertebra L%d" % i for i in range(1, 6))
_ALLV = _CERV + ", " + _THOR + ", " + _LUMB
_VPARTS = [   # (name, key, camera, facts)
    ("Vertebral body", "vertebra: body", "superior", "Weight-bearing anterior cylinder; joined to its neighbours by intervertebral discs"),
    ("Vertebral arch", "vertebra: arch", "superior", "Posterior ring (pedicles + laminae) that, with the body, encloses the vertebral foramen; carries the processes"),
    ("Pedicles", "vertebra: pedicle", "superior", "Short pillars joining the arch to the body; their notches form the intervertebral foramina"),
    ("Laminae", "vertebra: lamina", "superior", "Flat plates forming the back of the arch, meeting at the spinous process; ligamenta flava join adjacent laminae"),
    ("Vertebral foramen", "vertebra: foramen", "superior", "Opening enclosed by body and arch; stacked, they form the vertebral canal (spinal cord, meninges, nerve roots)"),
    ("Superior vertebral notch", "vertebra: superior notch", "lateral", "Shallow notch on the upper edge of the pedicle; forms the lower part of the intervertebral foramen above"),
    ("Inferior vertebral notch", "vertebra: inferior notch", "lateral", "Deeper notch under the pedicle; forms the upper part of the intervertebral foramen below"),
    ("Spinous process", "vertebra: spinous process", "lateral", "Posterior midline projection from the junction of the laminae; attachment for back muscles and ligaments"),
    ("Superior articular process", "vertebra: superior articular process", "posterolateral", "Upward projection whose facet meets the inferior articular process of the vertebra above (zygapophysial / facet joint)"),
    ("Inferior articular process", "vertebra: inferior articular process", "posterolateral", "Downward projection whose facet meets the superior articular process of the vertebra below"),
    ("Pars interarticularis", "vertebra: pars interarticularis", "posterolateral", "Part of the lamina between the superior and inferior articular processes; a stress fracture here = spondylolysis (mostly L5)"),
    ("Transverse process", "vertebra: transverse process", "superior", "Lateral projection from the pedicle–lamina junction; muscle attachment (and rib articulation in the thoracic region)"),
]
_REG = [("Cervical", "Cervical Vertebra (C4)", "Vertebra C4"), ("Thoracic", "Thoracic Vertebra (T6)", "Vertebra T6"), ("Lumbar", "Lumbar Vertebra (L3)", "Vertebra L3")]
BACK_NOTES = [
    ("Vertebral Column", "Vertebral column", _ALLV + ", Sacrum, Coccyx", "", "", "lateral",
     "7 cervical, 12 thoracic, 5 lumbar, sacrum (5 fused) and coccyx. Primary (kyphotic) curves: thoracic and sacral; secondary (lordotic): cervical and lumbar, formed after birth"),
    ("Vertebral Column", "Cervical vertebrae", _CERV, "", "", "lateral",
     "C1–C7: small bodies, transverse foramina (vertebral artery), bifid spinous processes (C3–C6); C1 atlas and C2 axis are atypical; C7 has a long spinous process (vertebra prominens)"),
    ("Vertebral Column", "Thoracic vertebrae", _THOR, "", "", "lateral",
     "T1–T12: heart-shaped bodies with costal facets for the rib heads, transverse costal facets (T1–T10), long downward-sloping spinous processes"),
    ("Vertebral Column", "Lumbar vertebrae", _LUMB, "", "", "lateral",
     "L1–L5: the largest, kidney-shaped bodies; short thick spinous processes; no transverse foramina or costal facets"),
    ("Vertebral Column", "Sacrum", "Sacrum", "", "", "posterior",
     "Five fused sacral vertebrae; joins L5 above, the coccyx below and the hip bones (sacro-iliac joints)"),
    ("Vertebral Column", "Coccyx", "Coccyx", "", "", "posterior",
     "3–5 small fused vertebrae; attachment for the gluteus maximus, anococcygeal ligament and pelvic floor"),
    ("Vertebral Column", "Vertebral canal", _ALLV, "vertebra: foramen", "", "posterolateral",
     "The stacked vertebral foramina: holds the spinal cord, meninges, nerve roots and their vessels"),
    ("Vertebral Column", "Intervertebral foramen", "Vertebra L3, Vertebra L4", "vertebra: intervertebral foramen", "vertebra", "lateral",
     "Gap between the inferior notch of one vertebra and the superior notch of the next: the spinal nerve leaves here"),
]
for _r, _sub, _v in _REG:
    for (_n, _k, _cam, _f) in _VPARTS:
        BACK_NOTES.append((_sub, "%s (%s)" % (_n, _r.lower()), _v, _k, "vertebra", _cam, _f))
BACK_NOTES[[i for i, x in enumerate(BACK_NOTES) if x[1] == "Transverse process (cervical)"][0]] = (
    "Cervical Vertebra (C4)", "Transverse process (cervical)", "Vertebra C4", "cervical: transverse process", "vertebra", "superior",
    "Short, with anterior and posterior tubercles around the transverse foramen")
BACK_NOTES += [
    ("Cervical Vertebra (C4)", "Transverse foramen", "Vertebra C4", "cervical: transverse foramen", "vertebra", "superior",
     "Opening in each cervical transverse process: the vertebral artery and veins run through C6–C1"),
    ("Cervical Vertebra (C4)", "Posterior arch of C1", "Atlas (C1)", "atlas: posterior arch", "vertebra", "superior",
     "Atlas has no body or spinous process: anterior and posterior arches join two lateral masses; the vertebral artery grooves the top of the posterior arch"),
    ("Cervical Vertebra (C4)", "Anterior tubercle of C1", "Atlas (C1)", "atlas: anterior tubercle", "vertebra", "anterolateral",
     "Front of the anterior arch of the atlas: attachment of the anterior longitudinal ligament and longus colli"),
    ("Cervical Vertebra (C4)", "Dens (odontoid process)", "Axis (C2)", "axis: dens", "vertebra", "anterolateral",
     "Peg rising from the axis body (the 'body' of C1); pivot for the atlanto-axial joint (head rotation), held by the transverse ligament"),
    ("Thoracic Vertebra (T6)", "Superior costal facet", "Vertebra T6", "thoracic: superior costal facet", "vertebra", "lateral",
     "Demifacet at the top of the body for the head of its own rib (rib 6 on T6)"),
    ("Thoracic Vertebra (T6)", "Inferior costal facet", "Vertebra T6", "thoracic: inferior costal facet", "vertebra", "lateral",
     "Demifacet at the bottom of the body for the head of the rib below (rib 7 on T6)"),
    ("Thoracic Vertebra (T6)", "Transverse costal facet", "Vertebra T6", "thoracic: transverse costal facet", "vertebra", "lateral",
     "Facet on the transverse process for the tubercle of its own rib (T1–T10)"),
]
# back muscles (both sides shown)
def _lr(*names):
    return ", ".join("%s.%s" % (n, s) for n in names for s in ("l", "r"))
BACK_MUSCLES = [
    ("Back Muscles", "Trapezius", _lr("Descending part of trapezius muscle", "Transverse part of trapezius muscle", "Ascending part of trapezius muscle"), "", "posterior",
     "Occipital bone, nuchal ligament and spinous processes C7–T12", "Lateral clavicle, acromion and spine of the scapula",
     "Accessory nerve (CN XI)", _lr("Accessory nerve (XI)"),
     "Upper fibres elevate, middle fibres retract, lower fibres depress the scapula; upper + lower rotate it upward", ""),
    ("Back Muscles", "Latissimus dorsi", _lr("Latissimus dorsi muscle"), "", "posterior",
     "Spinous processes T7–L5, thoracolumbar fascia, iliac crest and lower ribs", "Floor of the intertubercular groove of the humerus",
     "Thoracodorsal nerve", _lr("Thoracodorsal nerve"), "Extends, adducts and medially rotates the arm", ""),
    ("Back Muscles", "Levator scapulae", _lr("Levator scapulae"), "", "posterolateral",
     "Transverse processes of C1–C4", "Medial border of the scapula above the spine (superior angle)",
     "Dorsal scapular nerve (and C3–C4)", _lr("Dorsal scapular nerve"), "Elevates the scapula", ""),
    ("Back Muscles", "Rhomboid minor", _lr("Rhomboid minor muscle"), "", "posterior",
     "Nuchal ligament and spinous processes of C7–T1", "Medial border of the scapula at the root of its spine",
     "Dorsal scapular nerve", _lr("Dorsal scapular nerve"), "Retracts the scapula and holds it to the thoracic wall", ""),
    ("Back Muscles", "Rhomboid major", _lr("Rhomboid major muscle"), "", "posterior",
     "Spinous processes of T2–T5", "Medial border of the scapula below the spine",
     "Dorsal scapular nerve", _lr("Dorsal scapular nerve"), "Retracts the scapula and holds it to the thoracic wall", ""),
    ("Back Muscles", "Splenius capitis / cervicis", _lr("Splenius capitis muscle", "Splenius colli muscle"), "", "posterior",
     "Nuchal ligament and spinous processes (C7–T6)", "Capitis: mastoid process and occipital bone; cervicis: transverse processes of C1–C3",
     "Posterior rami of spinal nerves", "",
     "One side: laterally flexes the neck and turns the head to the same side; both: extend the head and neck", ""),
    ("Back Muscles", "Iliocostalis", "Iliocostalis lumborum muscle.l, Iliocostalis lumborum muscle.r, Iliocostalis thoracis muscle.l, Iliocostalis thoracis muscle.r, Iliocostalis colli muscle, Iliocostalis colli muscle.r", "", "posterior",
     "Broad common tendon from the posterior sacrum and iliac crest", "Angles of the ribs and cervical transverse processes",
     "Posterior rami of spinal nerves", "",
     "Erector spinae (lateral column): both sides extend the vertebral column; one side flexes it laterally", ""),
    ("Back Muscles", "Longissimus", _lr("Longissimus thoracis muscle", "Longissimus colli muscle", "Longissimus capitis muscle"), "", "posterior",
     "Common tendon from the posterior sacrum and iliac crest; transverse processes", "Ribs, transverse processes and the mastoid process",
     "Posterior rami of spinal nerves", "",
     "Erector spinae (middle column): extends the vertebral column and head; one side flexes laterally", ""),
    ("Back Muscles", "Spinalis", _lr("Spinalis thoracis muscle", "Spinalis colli muscle", "Spinalis capitis muscle"), "", "posterior",
     "Spinous processes (upper lumbar, lower thoracic)", "Spinous processes higher up",
     "Posterior rami of spinal nerves", "",
     "Erector spinae (medial column): extends the vertebral column", ""),
    ("Back Muscles", "Semispinalis capitis", _lr("Semispinalis colli muscle", "Semispinalis thoracis muscle"), "", "posterior",
     "Transverse processes of the cervical and upper thoracic vertebrae", "Occipital bone, between the nuchal lines",
     "Posterior rami of spinal nerves", "",
     "Both sides extend the head and upper spine; one side turns the head to the opposite side",
     "Semispinalis capitis isn't in this model: the highlight is semispinalis cervicis/thoracis, the rest of the same group, just beneath it."),
]

# ---------------------------------------------------------------------------------------
# Brachial plexus (upper-limb model). (Structure, Meshes, Landmark, Camera, facts)
_BP = "Brachial Plexus"
BP_NOTES = [
    ("Roots of the brachial plexus", "Roots of brachial plexus", "", "anterior",
     "Anterior rami of C5–T1, between the anterior and middle scalenes. Branches straight from the roots: dorsal scapular (C5) and long thoracic (C5–C7). (Shown as one piece in this model.)"),
    ("Superior (upper) trunk", "Superior trunk of brachial plexus", "", "anterior",
     "C5 + C6. Gives the suprascapular nerve (and nerve to subclavius). Lesion = Erb's palsy (fall onto the shoulder, birth traction): arm adducted, medially rotated, elbow extended, forearm pronated — “waiter's tip”"),
    ("Middle trunk", "Middle trunk of brachial plexus", "", "anterior",
     "C7 alone; continues into the anterior and posterior divisions"),
    ("Inferior (lower) trunk", "Inferior trunk of brachial plexus", "", "anterior",
     "C8 + T1, over the first rib. Lesion = Klumpke's palsy (pulled-up arm, cervical rib, Pancoast tumour): claw hand, small-muscle wasting, ± Horner syndrome (T1)"),
    ("Anterior divisions", "Anterior division of superior trunk of brachial plexus, Anterior division of middle trunk of brachial plexus, Anterior division of inferior trunk of brachial plexus", "", "anterior",
     "Behind the clavicle; supply the flexor (anterior) compartments. Upper + middle → lateral cord; lower → medial cord"),
    ("Posterior divisions", "Posterior division of superior trunk of brachial plexus, Posterior division of middle trunk of brachial plexus, Posterior division of inferior trunk of brachial plexus", "", "anterior",
     "Behind the clavicle; all three join as the posterior cord, which supplies the extensor (posterior) compartments"),
    ("Posterior cord", "Posterior cord of brachial plexus", "", "anterior",
     "C5–T1, behind the axillary artery. Branches: upper subscapular, thoracodorsal, lower subscapular, axillary, radial (“STAR”)"),
    ("Lateral cord", "Median nerve", "plexus: lateral cord", "anterior",
     "C5–C7, lateral to the axillary artery. Branches: lateral pectoral, musculocutaneous, lateral root of the median nerve. (Not separate in this model: the highlight is where it joins the median nerve.)"),
    ("Medial cord", "Ulnar nerve, Medial antebrachial cutaneous nerve", "plexus: medial cord", "anterior",
     "C8–T1, medial to the axillary artery. Branches: medial pectoral, medial cutaneous nerves of arm and forearm, ulnar, medial root of the median nerve. (Not separate in this model: the highlight is the start of the nerves it gives.)"),
    ("Musculocutaneous nerve", "Musculocutaneous nerve", "", "anterior",
     "C5–C7, lateral cord. Pierces coracobrachialis; supplies coracobrachialis, biceps and brachialis; ends as the lateral cutaneous nerve of the forearm. Lesion: weak elbow flexion and supination"),
    ("Axillary nerve", "Axillary nerve", "", "posterior",
     "C5–C6, posterior cord. Through the quadrangular space round the surgical neck; supplies deltoid and teres minor, skin over the lower deltoid (“regimental badge”). Lesion: surgical-neck fracture or shoulder dislocation → weak abduction"),
    ("Radial nerve", "Radial nerve", "", "posterior",
     "C5–T1, posterior cord. In the radial groove with the deep brachial artery; supplies triceps, anconeus, brachioradialis and all forearm extensors. Lesion (mid-shaft humerus fracture): wrist drop"),
    ("Median nerve", "Median nerve", "", "anterior",
     "C5–T1, lateral + medial roots. No branches in the arm; most forearm flexors, thenar muscles (recurrent branch), lateral two lumbricals. Lesion: carpal tunnel syndrome (thenar wasting); high lesion → “hand of benediction”"),
    ("Ulnar nerve", "Ulnar nerve", "", "anterior",
     "C8–T1, medial cord. Behind the medial epicondyle; FCU, medial half of FDP and most intrinsic hand muscles. Lesion: claw hand (“ulnar claw”), Froment's sign"),
    ("Dorsal scapular nerve", "Dorsal scapular nerve", "", "posterior",
     "C5 root. Supplies the rhomboids and levator scapulae"),
    ("Long thoracic nerve", "Long thoracic nerve", "", "anterolateral",
     "C5–C7 roots; runs down the side of the chest on serratus anterior. Lesion (axillary surgery, carrying heavy loads): winged scapula"),
    ("Suprascapular nerve", "Suprascapular nerve", "", "posterior",
     "C5–C6, superior trunk. Under the superior transverse scapular ligament (scapular notch); supplies supraspinatus and infraspinatus"),
    ("Lateral pectoral nerve", "Lateral pectoral nerve", "", "anterior",
     "C5–C7, lateral cord (named for its cord, not its position). Supplies pectoralis major"),
    ("Medial pectoral nerve", "Medial pectoral nerve", "", "anterior",
     "C8–T1, medial cord. Supplies pectoralis minor and major"),
    ("Upper subscapular nerve", "Superior subscapular nerve", "", "anterior",
     "C5–C6, posterior cord. Supplies subscapularis (upper part)"),
    ("Thoracodorsal nerve", "Thoracodorsal nerve", "", "anterolateral",
     "C6–C8, posterior cord. Supplies latissimus dorsi (at risk in axillary surgery)"),
    ("Lower subscapular nerve", "Inferior subscapular nerve", "", "anterior",
     "C5–C6, posterior cord. Supplies subscapularis (lower part) and teres major"),
    ("Medial cutaneous nerve of arm", "Medial brachial cutaneous nerve", "", "anterior",
     "T1, medial cord. Skin of the medial arm"),
    ("Medial cutaneous nerve of forearm", "Medial antebrachial cutaneous nerve", "", "anterior",
     "C8–T1, medial cord. Skin of the medial forearm"),
]
_BP_REFL = ("Clavicular head of pectoralis major muscle, Sternocostal head of pectoralis major muscle, Pectoralis minor muscle, "
            "Subclavius muscle, Clavicular part of deltoid muscle")

# condensed lower-limb subdecks (aim ~30–80 cards each)
SUB_MERGE = {
    "Gluteal Region": "Hip & Gluteal", "Hip & Pelvis Ligaments": "Hip & Gluteal",
    "Anterior Thigh": "Anterior & Medial Thigh", "Medial Thigh": "Anterior & Medial Thigh",
    "Posterior Thigh": "Posterior Thigh & Knee", "Knee Ligaments": "Posterior Thigh & Knee",
    "Anterior Leg": "Leg", "Lateral Leg": "Leg", "Posterior Leg": "Leg",
    "Nerves": "Nerves & Vessels", "Vessels": "Nerves & Vessels",
    "Tibia & Fibula": "Leg & Foot Bones", "Tarsal Bones": "Leg & Foot Bones", "Foot Bones": "Leg & Foot Bones",
    "Osteology": "Bones & Surface Anatomy",
}

# ---------------------------------------------------------------------------------------
# Upper limb dissections 1–3 + prosection: vessels, nerve branches, muscle heads, joints and
# ligaments, forearm / hand structures. (subdeck, Structure, Meshes, Landmark, Camera, facts, Reflect)
UL_EXTRA = [
    # arteries
    ("Vessels", "Axillary artery", "Axillary artery", "", "anterior",
     "Continuation of the subclavian at the lateral border of the 1st rib to the lower border of teres major; divided into 3 parts by pectoralis minor (branches 1-2-3: superior thoracic; thoraco-acromial, lateral thoracic; subscapular, anterior and posterior circumflex humeral)", "Pectoralis minor muscle, Clavicular head of pectoralis major muscle, Sternocostal head of pectoralis major muscle"),
    ("Vessels", "Brachial artery", "Brachial artery", "", "anterior",
     "Continuation of the axillary artery below teres major; runs down the medial arm with the median nerve, ends in the cubital fossa (medial to the biceps tendon) as the radial and ulnar arteries; site for blood pressure measurement", ""),
    ("Vessels", "Deep artery of the arm (profunda brachii)", "Deep brachial artery", "", "posterior",
     "First large branch of the brachial artery; runs with the radial nerve in the radial groove; ends as the middle and radial collateral arteries", ""),
    ("Vessels", "Anterior circumflex humeral artery", "Anterior circumflex humeral artery", "", "anterior",
     "Third part of the axillary artery; small, passes in front of the surgical neck; anastomoses with the posterior circumflex humeral", ""),
    ("Vessels", "Posterior circumflex humeral artery", "Posterior circumflex humeral artery", "", "posterior",
     "Third part of the axillary artery; through the quadrangular space with the axillary nerve, round the surgical neck", ""),
    ("Vessels", "Subscapular artery", "Subscapular artery", "", "anterior",
     "Largest branch of the axillary artery (third part); divides into the circumflex scapular and thoracodorsal arteries", ""),
    ("Vessels", "Circumflex scapular artery", "Circumflex scapular artery", "", "posterior",
     "Branch of the subscapular artery; through the triangular space to the infraspinous fossa (scapular anastomosis)", ""),
    ("Vessels", "Thoracodorsal artery", "Thoracodorsal artery", "", "anterolateral",
     "Continuation of the subscapular artery; runs with the thoracodorsal nerve to latissimus dorsi", ""),
    ("Vessels", "Lateral thoracic artery", "Lateral thoracic artery", "", "anterolateral",
     "Second part of the axillary artery; descends along the lateral border of pectoralis minor on serratus anterior; supplies the lateral breast", ""),
    ("Vessels", "Suprascapular artery", "Suprascapular artery", "", "posterior",
     "From the thyrocervical trunk; passes OVER the superior transverse scapular ligament (the nerve goes under) to supraspinatus and infraspinatus", ""),
    ("Vessels", "Radial artery", "Radial artery", "", "anterior",
     "Smaller terminal branch of the brachial; under brachioradialis, pulse at the wrist lateral to the FCR tendon; crosses the anatomical snuffbox; forms the deep palmar arch", ""),
    ("Vessels", "Ulnar artery", "Ulnar artery", "", "anterior",
     "Larger terminal branch of the brachial; deep to the flexors, with the ulnar nerve on its medial side; through Guyon's canal; forms the superficial palmar arch; gives the common interosseous artery", ""),
    ("Vessels", "Common interosseous artery", "Common interosseous artery", "", "anterior",
     "Short branch of the ulnar artery; divides into the anterior and posterior interosseous arteries at the interosseous membrane", ""),
    ("Vessels", "Anterior interosseous artery", "Common interosseous artery", "vessel: distal", "anterior",
     "Runs down the front of the interosseous membrane with the anterior interosseous nerve. (Not separate in this model: the highlight is the distal continuation of the common interosseous artery.)", ""),
    ("Vessels", "Posterior interosseous artery", "Posterior interosseous artery", "", "posterior",
     "Passes above the interosseous membrane to the back of the forearm with the posterior interosseous nerve", ""),
    ("Vessels", "Superficial palmar arch", "Superficial palmar arch", "", "anterior",
     "Mainly the ulnar artery (completed by the superficial palmar branch of the radial); lies under the palmar aponeurosis at the level of the extended thumb; gives the common palmar digital arteries", "Palmar aponeurosis"),
    ("Vessels", "Common palmar digital arteries", "Common palmar digital arteries", "", "anterior",
     "From the superficial palmar arch; each divides into two proper palmar digital arteries at the finger webs", "Palmar aponeurosis"),
    ("Vessels", "Proper palmar digital arteries", "Proper palmar digital arteries", "", "anterior",
     "Run along the sides of each finger with the proper palmar digital nerves", "Palmar aponeurosis"),
    # veins
    ("Vessels", "Axillary vein", "Axillary vein", "", "anterior",
     "Formed by the basilic vein + brachial veins at teres major; medial to the axillary artery; becomes the subclavian vein at the 1st rib; receives the cephalic vein", "Pectoralis minor muscle, Clavicular head of pectoralis major muscle, Sternocostal head of pectoralis major muscle"),
    ("Vessels", "Brachial veins", "Brachial veins", "", "anterior",
     "Paired deep veins accompanying the brachial artery (venae comitantes); join the basilic vein to form the axillary vein", ""),
    ("Vessels", "Cephalic vein", "Cephalic vein", "", "anterolateral",
     "Superficial vein from the lateral dorsal venous network up the lateral forearm and arm; in the deltopectoral groove; pierces the clavipectoral fascia into the axillary vein", ""),
    ("Vessels", "Dorsal venous arch (network) of the hand", "Dorsal venous network of hand", "", "posterior",
     "On the back of the hand: drains laterally into the cephalic vein and medially into the basilic vein; common IV site", ""),
    # nerves
    ("Nerves", "Lateral cutaneous nerve of the forearm", "Lateral antebrachial cutaneous nerve", "", "anterolateral",
     "Terminal (cutaneous) branch of the musculocutaneous nerve; emerges lateral to the biceps tendon at the elbow; skin of the lateral forearm", ""),
    ("Nerves", "Anterior interosseous nerve", "Anterior interosseous nerve of forearm", "", "anterior",
     "Branch of the median nerve in the forearm; on the interosseous membrane; supplies FPL, lateral half of FDP and pronator quadratus. Lesion: can't make the 'OK' sign", ""),
    ("Nerves", "Posterior interosseous nerve", "Posterior interosseous nerve of forearm", "", "posterior",
     "Continuation of the deep branch of the radial nerve after it passes through supinator; supplies the forearm extensors", ""),
    ("Nerves", "Deep branch of the radial nerve", "Deep branch of radial nerve", "", "anterolateral",
     "Motor branch of the radial nerve at the elbow; winds round the radius through supinator to become the posterior interosseous nerve", ""),
    ("Nerves", "Superficial branch of the radial nerve", "Superficial branch of radial nerve", "", "anterolateral",
     "Sensory branch of the radial nerve; under brachioradialis, then over the snuffbox to the skin of the lateral dorsum of the hand and thumb", ""),
    ("Nerves", "Deep branch of the ulnar nerve", "Deep branch of ulnar nerve", "", "anterior",
     "Motor branch past the hook of hamate; supplies hypothenar muscles, all interossei, medial two lumbricals, adductor pollicis, deep head of FPB", "Palmar aponeurosis"),
    ("Nerves", "Superficial branch of the ulnar nerve", "Superficial branch of ulnar nerve", "", "anterior",
     "Mainly sensory branch in the palm (and palmaris brevis); common and proper palmar digital nerves to the little finger and medial half of the ring finger", "Palmar aponeurosis"),
    ("Nerves", "Common palmar digital nerves", "Common palmar digital branches of median nerve, Common palmar digital branches of ulnar nerve", "", "anterior",
     "From the median (lateral 3½ fingers) and ulnar (medial 1½) nerves in the palm; each divides into proper palmar digital nerves at the webs", "Palmar aponeurosis"),
    ("Nerves", "Proper palmar digital nerves", "Proper palmar digital branches of median nerve, Proper palmar digital branches of ulnar nerve", "", "anterior",
     "Along the sides of each finger (with the arteries): skin of the palmar fingers and the nail beds", "Palmar aponeurosis"),
    ("Nerves", "Recurrent branch of the median nerve", "Median nerve", "nerve: recurrent median", "anterior",
     "Motor branch curving back into the thenar muscles (APB, FPB, opponens pollicis) just past the flexor retinaculum — the “million-dollar nerve”. (Not separate in this model: the highlight marks where it leaves the median nerve.)", "Palmar aponeurosis, Flexor retinaculum of wrist, Humero-ulnar head of flexor digitorum superficialis, Radial head of flexor digitorum superficialis, Palmaris longus muscle"),
    # joints and ligaments (prosection)
    ("Joints & Ligaments", "Acromioclavicular ligament", "Acromioclavicular ligament", "", "superior",
     "Strengthens the top of the acromioclavicular joint; torn in a mild AC separation", ""),
    ("Joints & Ligaments", "Coracoclavicular ligament", "Conoid ligament, Trapezoid ligament", "", "anterior",
     "Conoid (medial, to the conoid tubercle) + trapezoid (lateral) parts; the main suspension of the scapula from the clavicle — torn in a full AC separation (step deformity)", ""),
    ("Joints & Ligaments", "Coracoacromial ligament", "Coracoacromial ligament", "", "anterolateral",
     "Coracoid to acromion: with them forms the coraco-acromial arch over the humeral head and supraspinatus (impingement). (Re-modelled by Janki: the source lacks it.)", ""),
    ("Joints & Ligaments", "Articular capsule of the glenohumeral joint", "Articular capsule of glenohumeral joint", "", "anterior",
     "Loose capsule from the glenoid margin to the anatomical neck; weakest inferiorly (most dislocations are anterior-inferior); thickened in front by the glenohumeral ligaments", ""),
    ("Joints & Ligaments", "Glenoid labrum", "Glenoid labrum", "", "lateral",
     "Fibrocartilage rim deepening the glenoid cavity; the long head of biceps attaches at its top (SLAP tears)", "Humerus, Articular capsule of glenohumeral joint"),
    ("Joints & Ligaments", "Superior transverse scapular ligament", "Scapula", "scapula: scapular notch", "anterior",
     "Bridges the scapular (suprascapular) notch: suprascapular nerve passes under it, suprascapular artery over it. (Not in this model: the highlight is the notch it closes.)", ""),
    ("Joints & Ligaments", "Tendon of the long head of biceps", "Long head of biceps brachii", "tendon: biceps long head", "anterior",
     "From the supraglenoid tubercle and labrum through the joint capsule (intra-articular), then in the intertubercular groove under the transverse humeral ligament", "Clavicular part of deltoid muscle, Acromial part of deltoid muscle"),
    ("Joints & Ligaments", "Articular capsule of the elbow", "Articular capsule of elbow joint", "", "anterior",
     "Encloses the humero-ulnar, humeroradial and proximal radio-ulnar joints; thin in front and behind, strengthened by the collateral ligaments", ""),
    ("Joints & Ligaments", "Ulnar (medial) collateral ligament", "Ulnar collateral ligament", "", "medial",
     "Triangular, from the medial epicondyle to the coronoid process and olecranon; resists valgus stress (torn in throwers — “Tommy John”)", ""),
    ("Joints & Ligaments", "Radial (lateral) collateral ligament", "Radial collateral ligament", "", "lateral",
     "From the lateral epicondyle, blends with the annular ligament; resists varus stress", ""),
    ("Joints & Ligaments", "Anular ligament", "Annular ligament of radius", "", "lateral",
     "Ring round the radial head, attached to the margins of the radial notch of the ulna; lets the head rotate. Children: the head slips out (pulled elbow / nursemaid's elbow)", ""),
    ("Joints & Ligaments", "Interosseous membrane", "Interosseous membrane of forearm", "", "anterior",
     "Fibrous sheet between the interosseous borders of radius and ulna; fibres run down and medially, passing force from radius to ulna; separates the anterior and posterior compartments", ""),
    # forearm and hand structures
    ("Forearm & Hand Structures", "Flexor retinaculum", "Flexor retinaculum of wrist", "", "anterior",
     "Roof of the carpal tunnel: from scaphoid and trapezium to pisiform and hook of hamate; the median nerve and nine flexor tendons pass under it", ""),
    ("Forearm & Hand Structures", "Extensor retinaculum", "Extensor retinaculum of wrist", "", "posterior",
     "Band across the back of the wrist holding the extensor tendons in six compartments", ""),
    ("Forearm & Hand Structures", "Palmar aponeurosis", "Palmar aponeurosis", "aponeurosis: palm", "anterior",
     "Triangular deep fascia of the central palm, continuous with the palmaris longus tendon; covers the superficial palmar arch and long flexor tendons. Thickening and contracture: Dupuytren's", ""),
    ("Forearm & Hand Structures", "Thenar compartment", "Abductor pollicis brevis, Superficial head of flexor pollicis brevis, Deep head of flexor pollicis brevis, Opponens pollicis muscle", "", "anterior",
     "Abductor pollicis brevis, flexor pollicis brevis, opponens pollicis — recurrent branch of the median nerve", ""),
    ("Forearm & Hand Structures", "Hypothenar muscles", "Abductor digiti minimi of hand, Flexor digiti minimi of hand, Opponens digiti minimi muscle of hand", "", "anterior",
     "Abductor, flexor and opponens digiti minimi — deep branch of the ulnar nerve", ""),
    ("Forearm & Hand Structures", "Common flexor tendon", "Flexor carpi radialis, Palmaris longus muscle, Humeral head of flexor carpi ulnaris, Humero-ulnar head of flexor digitorum superficialis, Superficial head of pronator teres", "tendon: proximal", "anterior",
     "Shared origin of the superficial forearm flexors on the medial epicondyle (golfer's elbow). (Shown: the tops of the muscles that share it.)", ""),
    ("Forearm & Hand Structures", "Common extensor tendon", "Extensor carpi radialis brevis, Extensor digitorum, Extensor digiti minimi, Humeral head of extensor carpi ulnaris", "tendon: proximal", "posterolateral",
     "Shared origin of the superficial forearm extensors on the lateral epicondyle (tennis elbow, mostly ECRB). (Shown: the tops of the muscles that share it.)", ""),
    ("Forearm & Hand Structures", "Extensor expansion", "Extensor digitorum", "tendon: expansion", "posterior",
     "Hood of the extensor tendon over each finger's MCP joint and proximal phalanx; lumbricals and interossei insert into it, letting them flex the MCP and extend the IP joints", ""),
    ("Forearm & Hand Structures", "Quadrangular space", "Axillary nerve, Posterior circumflex humeral artery", "", "posterior",
     "Borders: teres minor (above), teres major (below), long head of triceps (medial), surgical neck of humerus (lateral). Contents (shown): axillary nerve + posterior circumflex humeral artery", ""),
    ("Forearm & Hand Structures", "Triangular space", "Circumflex scapular artery", "", "posterior",
     "Borders: teres minor (above), teres major (below), long head of triceps (lateral). Contents (shown): circumflex scapular artery", ""),
]
# muscle heads (same tuple layout as UL_MUSCLES)
UL_HEADS = [
    ("Arm", "Long head of biceps brachii", "Long head of biceps brachii", "arm", "anterior",
     "Supraglenoid tubercle of the scapula (tendon runs inside the shoulder joint)", "Radial tuberosity (with the short head)",
     "Musculocutaneous nerve", "Musculocutaneous nerve", "Flexes and supinates the forearm; steadies the humeral head", ""),
    ("Arm", "Short head of biceps brachii", "Short head of biceps brachii", "arm", "anterior",
     "Tip of the coracoid process (with coracobrachialis)", "Radial tuberosity and bicipital aponeurosis",
     "Musculocutaneous nerve", "Musculocutaneous nerve", "Flexes and supinates the forearm; helps flex the arm", ""),
    ("Arm", "Long head of triceps brachii", "Long head of triceps brachii", "arm", "posterior",
     "Infraglenoid tubercle of the scapula", "Olecranon", "Radial nerve", "Radial nerve",
     "Extends the forearm; extends and adducts the arm (the only head crossing the shoulder)", "Separates the quadrangular and triangular spaces."),
    ("Arm", "Lateral head of triceps brachii", "Lateral head of triceps brachii", "arm", "posterior",
     "Posterior humerus above the radial groove", "Olecranon", "Radial nerve", "Radial nerve", "Extends the forearm", ""),
    ("Arm", "Medial head of triceps brachii", "Medial head of triceps brachii", "arm", "posterior",
     "Posterior humerus below the radial groove", "Olecranon", "Radial nerve", "Radial nerve", "Extends the forearm (active in all extension)", ""),
]

# ---------------------------------------------------------------------------------------
# Lower-limb dissections 1–3 additions. (subdeck, Structure, Meshes, Landmark, Camera, facts, Reflect)
LL_EXTRA = [
    ("Nerves & Vessels", "Genicular arteries", "Superior medial genicular artery, Superior lateral genicular artery, Middle genicular artery, Inferior medial genicular artery, Inferior lateral genicular artery", "", "posterior",
     "Five branches of the popliteal artery round the knee: superior medial and lateral, middle (pierces the capsule to the cruciates), inferior medial and lateral. With the descending genicular (femoral) and recurrent tibial branches they form the genicular anastomosis — a collateral route round the knee", ""),
    ("Nerves & Vessels", "Lateral circumflex femoral artery", "Lateral circumflex femoral artery", "", "anterior",
     "Branch of the deep femoral artery; runs laterally under sartorius and rectus femoris; ascending, transverse and descending branches (the descending one along vastus lateralis)", "Sartorius muscle, Rectus femoris muscle"),
    ("Nerves & Vessels", "Superior gluteal vessels", "Superior gluteal artery, Superior gluteal veins", "", "posterior",
     "Leave the pelvis above piriformis (greater sciatic foramen) with the superior gluteal nerve; between gluteus medius and minimus", "Gluteus maximus muscle"),
    ("Nerves & Vessels", "Inferior gluteal vessels", "Inferior gluteal artery, Inferior gluteal veins", "", "posterior",
     "Leave the pelvis below piriformis with the inferior gluteal nerve; supply gluteus maximus", "Gluteus maximus muscle"),
    ("Nerves & Vessels", "Inferior gluteal nerve", "Inferior gluteal artery, Inferior gluteal veins", "", "posterior",
     "L5–S2; below piriformis; the only nerve to gluteus maximus. Lesion: weak hip extension (difficulty climbing stairs, rising from sitting). (Not in this model: the highlight is the inferior gluteal vessels it runs with.)", "Gluteus maximus muscle"),
    ("Nerves & Vessels", "Saphenous nerve", "Saphenous nerve", "", "anteromedial",
     "Longest branch of the femoral nerve; through the adductor canal (not the hiatus), then with the great saphenous vein down the medial leg to the foot; skin only", "Sartorius muscle"),
    ("Nerves & Vessels", "Deep fibular nerve", "Deep fibular nerve", "", "anterolateral",
     "Branch of the common fibular nerve; with the anterior tibial artery down the anterior compartment; supplies the dorsiflexors and the skin of the first web space. Lesion: foot drop", "Tibialis anterior muscle, Extensor digitorum longus"),
    ("Nerves & Vessels", "Posterior cutaneous nerve of the thigh", "Posterior femoral cutaneous nerve", "", "posterior",
     "S1–S3; leaves below piriformis with the sciatic nerve; skin of the back of the thigh and popliteal fossa", "Gluteus maximus muscle"),
    ("Nerves & Vessels", "Sural nerve", "Sural nerve", "", "posterior",
     "From tibial + common fibular contributions; with the small saphenous vein behind the lateral malleolus; skin of the lateral foot; used for nerve grafts", ""),
    ("Posterior Thigh & Knee", "Sacrospinous ligament", "Sacrospinous ligament", "", "posterior",
     "Ischial spine to the side of the sacrum and coccyx; with the sacrotuberous ligament, turns the sciatic notches into the greater and lesser sciatic foramina", ""),
    ("Hip Bone Landmarks", "Greater sciatic notch", "Hip bone", "hip: greater sciatic notch", "posterolateral",
     "Large notch in the posterior border of the hip bone above the ischial spine", ""),
    ("Hip Bone Landmarks", "Lesser sciatic notch", "Hip bone", "hip: lesser sciatic notch", "posterolateral",
     "Notch between the ischial spine and ischial tuberosity; the obturator internus tendon turns round it", ""),
    ("Hip Bone Landmarks", "Greater sciatic foramen", "Hip bone, Sacrospinous ligament, Sacrotuberous ligament", "hip: greater sciatic notch", "posterolateral",
     "Greater sciatic notch closed by the sacrospinous (below) and sacrotuberous ligaments. Piriformis passes through; above it the superior gluteal vessels and nerve, below it the inferior gluteal vessels and nerve, sciatic nerve, posterior cutaneous nerve of the thigh, pudendal nerve and internal pudendal vessels", ""),
    ("Hip Bone Landmarks", "Lesser sciatic foramen", "Hip bone, Sacrospinous ligament, Sacrotuberous ligament", "hip: lesser sciatic notch", "posterolateral",
     "Lesser sciatic notch closed by the sacrospinous (above) and sacrotuberous ligaments. Through it: obturator internus tendon (out), pudendal nerve and internal pudendal vessels (back in to the perineum)", ""),
    ("Leg & Foot Bones", "Pes anserinus", "Tibia", "tibia: pes anserinus", "anteromedial",
     "Common insertion on the upper medial tibia of sartorius, gracilis and semitendinosus — “SGT FOT”: Sartorius, Gracilis, semiTendinosus, supplied by the Femoral, Obturator and Tibial nerves (one from each thigh compartment); anserine bursa beneath", ""),
    ("Hip & Gluteal", "Tendon of obturator internus", "Obturator internus", "muscle: obturator internus tendon", "posterior",
     "Leaves the pelvis through the lesser sciatic foramen, turning 90° round the lesser sciatic notch; joined by the gemelli to the medial greater trochanter", "Gluteus maximus muscle"),
    ("Spaces & Structures", "Femoral triangle", "Femoral nerve, Femoral artery, Femoral vein", "space: femoral triangle", "anterior",
     "Borders: inguinal ligament (above), sartorius (lateral), adductor longus (medial); floor iliopsoas and pectineus. Contents lateral to medial (NAVEL): femoral nerve, artery, vein, (empty space), lymphatics", ""),
    ("Spaces & Structures", "Adductor canal", "Femoral artery, Femoral vein, Saphenous nerve", "space: adductor canal", "anteromedial",
     "Under sartorius in the middle third of the thigh, between vastus medialis and the adductors. Contents: femoral artery and vein, saphenous nerve, nerve to vastus medialis", "Sartorius muscle"),
    ("Spaces & Structures", "Adductor hiatus", "Femoral artery, Femoral vein", "space: adductor hiatus", "medial",
     "Gap in the tendon of adductor magnus above the adductor tubercle: the femoral vessels pass through to become the popliteal vessels. (Shown: the vessels where they pass through.)", "Sartorius muscle"),
    ("Spaces & Structures", "Iliotibial tract", "Iliotibial tract", "", "lateral",
     "Thickened lateral fascia lata from the iliac crest to the lateral tibial condyle (Gerdy's tubercle); tensor fasciae latae and gluteus maximus insert into it; steadies the extended knee", ""),
    ("Spaces & Structures", "Extensor retinacula", "Superior extensor retinaculum of ankle, Inferior extensor retinaculum of ankle", "", "anterolateral",
     "Superior (band above the ankle) and inferior (Y-shaped, on the dorsum of the foot): hold the anterior-compartment tendons down", ""),
    ("Spaces & Structures", "Flexor retinaculum (ankle)", "Flexor retinaculum of ankle", "", "medial",
     "Medial malleolus to calcaneus: roof of the tarsal tunnel. Under it front to back: tibialis posterior, FDL, posterior tibial artery and veins, tibial nerve, FHL (“Tom, Dick And Very Nervous Harry”)", ""),
    ("Spaces & Structures", "Interosseous membrane (leg)", "Interosseous membrane of leg", "", "anterior",
     "Between the interosseous borders of tibia and fibula; separates the anterior and posterior compartments; the anterior tibial vessels pass over its upper edge", ""),
]
LL_HEADS = [
    ("Posterior Thigh & Knee", "Long head of biceps femoris", "Long head of biceps femoris", "thigh", "posterior",
     "Ischial tuberosity", "Head of the fibula", "Tibial division of the sciatic nerve", "Sciatic nerve",
     "Flexes and laterally rotates the leg; extends the thigh", ""),
    ("Posterior Thigh & Knee", "Short head of biceps femoris", "Short head of biceps femoris", "thigh", "posterior",
     "Lateral lip of the linea aspera", "Head of the fibula", "Common fibular division of the sciatic nerve", "Sciatic nerve",
     "Flexes and laterally rotates the leg (doesn't cross the hip)", "The only hamstring supplied by the common fibular division."),
    ("Leg", "Medial head of gastrocnemius", "Medial head of gastrocnemius", "leg", "posterior",
     "Popliteal surface of the femur above the medial condyle", "Calcaneal tuberosity via the calcaneal tendon", "Tibial nerve", "Tibial nerve",
     "Plantarflexes the ankle; flexes the knee", "Forms the inferomedial border of the popliteal fossa."),
    ("Leg", "Lateral head of gastrocnemius", "Lateral head of gastrocnemius", "leg", "posterior",
     "Lateral surface of the lateral femoral condyle", "Calcaneal tuberosity via the calcaneal tendon", "Tibial nerve", "Tibial nerve",
     "Plantarflexes the ankle; flexes the knee", "Forms the inferolateral border of the popliteal fossa."),
]
# back dissections 1–2 (trunk model)
_SP = "Spinal Cord & Meninges"
BACK_EXTRA = [
    ("Back Muscles", "Accessory nerve (CN XI)", "Accessory nerve (XI).l, Accessory nerve (XI).r", "", "posterolateral",
     "Spinal accessory nerve: from the upper cervical cord, up through the foramen magnum and out through the jugular foramen; crosses the posterior triangle to supply sternocleidomastoid and trapezius. Lesion: weak shoulder shrug", ""),
    ("Back Muscles", "Dorsal scapular nerve and vessels", "Dorsal scapular nerve.l, Dorsal scapular nerve.r, (Deep branch of transverse cervical artery).l, (Deep branch of transverse cervical artery).r", "", "posterolateral",
     "Nerve from the C5 root; with the dorsal scapular artery (the deep branch of the transverse cervical artery) and vein, along the medial border of the scapula under levator scapulae and the rhomboids. (The vein isn't in this model.)", "Ascending part of trapezius muscle.l, Ascending part of trapezius muscle.r, Transverse part of trapezius muscle.l, Transverse part of trapezius muscle.r, Descending part of trapezius muscle.l, Descending part of trapezius muscle.r, Rhomboid major muscle.l, Rhomboid major muscle.r, Rhomboid minor muscle.l, Rhomboid minor muscle.r"),
    ("Back Muscles", "Transverse cervical artery", "Transverse cervical artery.l, Transverse cervical artery.r", "", "posterolateral",
     "From the thyrocervical trunk; crosses the posterior triangle; superficial branch to trapezius, deep branch (dorsal scapular artery) along the medial border of the scapula", "Ascending part of trapezius muscle.l, Ascending part of trapezius muscle.r, Transverse part of trapezius muscle.l, Transverse part of trapezius muscle.r, Descending part of trapezius muscle.l, Descending part of trapezius muscle.r"),
    ("Back Muscles", "Ligamentum nuchae", "Nuchal ligament", "", "lateral",
     "Midline fibrous sheet from the external occipital protuberance to the C7 spinous process: the upward continuation of the supraspinous ligament; trapezius, rhomboid minor and splenius arise from it", ""),
    ("Back Muscles", "Thoracolumbar fascia", "Posterior layer of thoracolumbar fascia.l, Posterior layer of thoracolumbar fascia.r, Middle layer of thoracolumbar fascia.l, Middle layer of thoracolumbar fascia.r", "", "posterior",
     "Encloses the deep back muscles in the lumbar region; latissimus dorsi arises from its posterior layer", ""),
    ("Back Muscles", "Mastoid process", "Temporal bone.l, Temporal bone.r", "temporal: mastoid", "lateral",
     "Bump of the temporal bone behind the ear: sternocleidomastoid, splenius capitis and longissimus capitis attach", ""),
    (_SP, "Spinal cord", "White matter of spinal cord", "", "posterior",
     "From the foramen magnum to about L1–L2 (conus medullaris) in adults; 31 pairs of spinal nerves", ""),
    (_SP, "Cervical enlargement", "White matter of spinal cord", "cord: cervical enlargement", "posterior",
     "Widening of the cord at about C4–T1: the segments for the upper limb (brachial plexus)", ""),
    (_SP, "Lumbosacral enlargement", "White matter of spinal cord", "cord: lumbosacral enlargement", "posterior",
     "Widening of the cord at about T10–L1 vertebral levels: the segments for the lower limb", ""),
    (_SP, "Conus medullaris", "White matter of spinal cord", "cord: conus medullaris", "posterior",
     "Tapered end of the spinal cord at about L1–L2 in adults (L3 at birth)", ""),
    (_SP, "Cauda equina", "Cauda equina", "", "posterior",
     "Bundle of lumbar and sacral nerve roots descending in the dural sac below the conus — why lumbar puncture is done at L3/L4 or L4/L5", ""),
    (_SP, "Filum terminale", "Cauda equina", "cauda: filum terminale", "posterior",
     "Thread of pia from the conus medullaris down the middle of the cauda equina to the coccyx (anchors the cord). (Not separate in this model: the highlight marks the bottom of the cauda equina it runs within.)", ""),
    (_SP, "Dura mater (spinal)", "Spinal dura", "", "posterior",
     "Tough outer meningeal tube from the foramen magnum to S2; separated from the vertebrae by the epidural space", ""),
    (_SP, "Dural sac", "Spinal dura", "dura: dural sac", "posterior",
     "Lower end of the dural tube (L2–S2) holding the cauda equina in CSF (lumbar cistern); ends at S2", ""),
    (_SP, "Arachnoid mater", "Arachnoid mater (spinal)", "", "posterolateral",
     "Thin middle meninx lining the inside of the dura; the subarachnoid space beneath it holds CSF. (Shown with the dura opened from behind. Modelled by Janki as a layer just inside the dura.)", ""),
    (_SP, "Pia mater", "White matter of spinal cord", "", "posterior",
     "Delicate inner meninx stuck to the cord surface; forms the denticulate ligaments and the filum terminale. (Shown: the cord surface it covers, with the dura and arachnoid opened from behind.)", ""),
    (_SP, "Epidural space", "Vertebra L1, Vertebra L2, Vertebra L3, Vertebra L4, Vertebra L5, Spinal dura", "vertebra: epidural", "posterolateral",
     "Between the dura and the walls of the vertebral canal: fat and the internal vertebral venous plexus; site of epidural anaesthesia. (Shown: the canal wall bounding it.)", ""),
    (_SP, "Ligamenta flava", "Ligamenta flava", "", "anterior",
     "Yellow elastic ligaments joining the laminae of adjacent vertebrae (the back wall of the canal); pierced in a lumbar puncture", "Spinal dura, White matter of spinal cord, Cauda equina"),
    (_SP, "Dorsal (posterior) roots", "Posterior root of spinal nerve.l, Posterior root of spinal nerve.r", "", "posterior",
     "Sensory rootlets entering the back of the cord; carry the dorsal root ganglion", "Spinal dura"),
    (_SP, "Ventral (anterior) roots", "Anterior root of spinal nerve.l, Anterior root of spinal nerve.r", "", "anterior",
     "Motor rootlets leaving the front of the cord", "Spinal dura"),
    (_SP, "Dorsal root (spinal) ganglion", "Spinal ganglion.l, Spinal ganglion.r", "", "posterolateral",
     "Swelling on the dorsal root in the intervertebral foramen: cell bodies of the sensory neurons", "Spinal dura"),
    (_SP, "Spinal nerve", "Spinal ganglion.l, Spinal ganglion.r, Anterior root of spinal nerve.l, Anterior root of spinal nerve.r, Posterior root of spinal nerve.l, Posterior root of spinal nerve.r", "", "posterolateral",
     "Dorsal + ventral roots join just beyond the ganglion, in the intervertebral foramen, to form the (mixed) spinal nerve, which at once splits into dorsal and ventral rami. (The short nerve trunk isn't separate in this model: shown are the roots and ganglion that form it.)", "Spinal dura"),
    (_SP, "Ventral ramus", "Intercostal nerves.l, Intercostal nerves.r", "", "lateral",
     "Larger branch of the spinal nerve: body wall and limbs (forms the cervical, brachial and lumbosacral plexuses; in the thorax runs on as the intercostal nerves — shown)", ""),
    (_SP, "Dorsal ramus", "Dorsal rami of spinal nerves.l, Dorsal rami of spinal nerves.r", "", "posterolateral",
     "Small posterior branch of the spinal nerve, given off just beyond the ganglion: deep (intrinsic) back muscles and the skin over them. (Modelled by Janki: the source lacks them.)", "Spinal dura"),
]

# (subdeck, Structure, Region, Camera, Peel layers, Extra)
PEELS = [
    ("Gluteal Region", "Gluteal region", "gluteal", "posterior",
     ["Gluteus maximus muscle", "Gluteus medius muscle",
      "Piriformis muscle, Superior gemellus muscle, Inferior gemellus muscle, Obturator internus, Quadratus femoris muscle"],
     "Under gluteus maximus: gluteus medius, piriformis, the gemelli, obturator internus, quadratus femoris "
     "— and the sciatic nerve (turn on Nerve)."),
    ("Posterior Leg", "Posterior leg", "leg", "posterior",
     ["Medial head of gastrocnemius, Lateral head of gastrocnemius",
      "Soleus muscle, Plantaris muscle, Calcaneal tendon",
      "Tibialis posterior muscle, Flexor digitorum longus, Flexor hallucis longus, Popliteus muscle"],
     "Superficial: gastrocnemius, soleus, plantaris. Deep: popliteus, flexor digitorum longus, "
     "flexor hallucis longus, tibialis posterior (all tibial nerve)."),
]


# one subdeck per card type, regions inside: Lower Limb::Identification::Gluteal Region, …
# subdecks that are osteology → they also get an "Identify (X-ray)" card
OSTEO_SUBS = {"Osteology", "Hip Bone Landmarks", "Femur Landmarks", "Tibia & Fibula", "Tarsal Bones", "Foot Bones",
              "Scapula", "Clavicle", "Humerus", "Radius", "Ulna", "Carpal Bones", "Hand Bones", "Upper Limb Bones",
              "Vertebral Column", "Cervical Vertebra (C4)", "Thoracic Vertebra (T6)", "Lumbar Vertebra (L3)"}
TYPE_DECK = {"Identify": "Identification", "Identify (X-ray)": "Identification::Imaging", "Locate": "Click", "Attachments": "Attachments",
             "Innervation": "Innervations", "Action": "Actions", "Peel": "Peel"}


# The course's dissection term lists, per region, in order: a note goes under the first
# dissection whose list names it (Janki 3D Anatomy::<region>::<dissection>::<subdeck>).
DISSECTIONS = {
 "Upper Limb": [
  ("Dissection 1 – Pectoral, Axilla & Arm", """anterior circumflex humeral artery|axillary artery|axillary nerve|axillary vein|biceps brachii muscle|bicipital aponeurosis|brachial artery|brachial vein|brachialis muscle|cephalic vein|circumflex scapular artery|coracobrachialis muscle|coracoid process of the scapula|coronoid process of the ulna|deep artery of the arm|deltoid muscle|intertubercular|lateral cord|lateral cutaneous nerve of the forearm|lateral thoracic artery|lesser tubercle of the humerus|long head of the biceps brachii muscle|long thoracic nerve|medial cord|medial cutaneous nerve of the arm|medial cutaneous nerve of the forearm|medial epicondyle of the humerus|median nerve|thoracodorsal nerve|musculocutaneous nerve|pectoralis major muscle|pectoralis minor muscle|posterior circumflex humeral artery|posterior cord|radial artery|radial groove of the humerus|radial nerve|radial tuberosity|serratus anterior muscle|short head of the biceps brachii muscle|subscapular artery|subscapular fossa of the scapula|subscapularis muscle|supraglenoid tubercle of the scapula|thoracodorsal artery|ulnar artery|ulnar nerve"""),
  ("Dissection 2 – Anterior Forearm & Hand", """abductor pollicis brevis|anterior interosseous artery|anterior interosseous nerve|brachioradialis muscle|common flexor tendon|common interosseous artery|common palmar digital arteries|common palmar digital nerves|deep branch of the ulnar nerve|flexor carpi radialis|flexor carpi ulnaris|flexor digitorum profundus|flexor digitorum superficialis|flexor pollicis brevis|flexor pollicis longus|flexor retinaculum|hypothenar muscles|median nerve|opponens pollicis|palmar aponeurosis|palmaris longus|posterior interosseous artery|pronator quadratus|pronator teres|proper palmar digital arteries|proper palmar digital nerves|radial artery|recurrent branch of the median nerve|superficial branch of the radial nerve|superficial branch of the ulnar nerve|superficial palmar arch|thenar compartment|ulnar artery"""),
  ("Dissection 3 – Posterior Shoulder, Arm & Forearm", """abductor pollicis longus|anatomical snuffbox|anconeus muscle|axillary nerve|brachioradialis|circumflex scapular artery|common extensor tendon|deep artery of the arm|deep branch of the radial nerve|deltoid muscle|dorsal venous arch|extensor carpi radialis brevis|extensor carpi radialis longus|extensor carpi ulnaris|extensor digiti minimi|extensor digitorum|extensor expansion|extensor indicis|extensor pollicis brevis|extensor pollicis longus|extensor retinaculum|greater tubercle of the humerus|infraspinatus muscle|infraspinous fossa of the scapula|lateral head of the triceps brachii muscle|long head of the triceps brachii muscle|medial head of the triceps brachii muscle|posterior circumflex humeral artery|posterior interosseous nerve|quadrangular space|radial artery|radial nerve|superficial branch of the radial nerve|superior transverse scapular ligament|supinator|suprascapular artery|suprascapular nerve|supraspinatus muscle|supraspinous fossa of the scapula|teres major muscle|teres minor muscle|triangular space|triceps brachii muscle"""),
  ("Shoulder and Elbow Joints", """acromioclavicular ligament|acromion|anatomical neck of the humerus|anular ligament|articular capsule of the elbow|articular capsule of the glenohumeral joint|capitulum|coracoacromial ligament|coracoclavicular ligament|coracoid process of the scapula|coronoid fossa|coronoid process of the ulna|glenoid cavity|glenoid labrum|greater tubercle of the humerus|head of humerus|head of radius|infraspinatus|interosseous membrane|acromial end of clavicle|lateral epicondyle of humerus|lesser tubercle|medial epicondyle of humerus|olecranon|radial lateral collateral ligament|radial fossa|neck of radius|radial notch|radial tuberosity|subscapularis|supraspinatus|tendon of the long head of biceps|teres minor|trochlea|ulnar collateral ligament"""),
 ],
 "Lower Limb": [
  ("Dissection 1 – Anterior Thigh & Leg", """adductor canal|adductor longus|adductor magnus|anterior inferior iliac spine|anterior tibial artery|deep femoral artery|deep fibular nerve|dorsalis pedis artery|extensor digitorum longus|extensor hallucis longus|extensor retinacula|femoral artery|femoral nerve|femoral triangle|femoral vein|fibularis tertius|gracilis|great saphenous vein|iliotibial tract|lateral circumflex femoral artery|medial circumflex femoral artery|rectus femoris|saphenous nerve|sartorius|tensor fasciae latae|tibialis anterior|vastus intermedius|vastus lateralis|vastus medialis"""),
  ("Dissection 2 – Gluteal Region & Posterior Thigh", """gluteal tuberosity|gluteus maximus|gluteus medius|gluteus minimus|greater sciatic foramen|greater sciatic notch|greater trochanter|inferior gemellus|inferior gluteal vessels|inferior gluteal nerve|intertrochanteric crest|ischial spine|ischial tuberosity|lesser sciatic foramen|lesser sciatic notch|long head of biceps femoris|short head of biceps femoris|piriformis|posterior cutaneous nerve of the thigh|quadratus femoris|sacrospinous ligament|sacrotuberous ligament|sciatic nerve|semimembranosus|semitendinosus|superior gemellus|superior gluteal nerve|superior gluteal vessels|tendon of obturator internus|tibial nerve|common fibular nerve"""),
  ("Dissection 3 – Popliteal Fossa & Posterior Leg", """adductor hiatus|anterior tibial artery|tendocalcaneus|common fibular nerve|flexor digitorum longus|flexor hallucis longus|flexor retinaculum (ankle)|gastrocnemius|interosseous membrane (leg)|lateral head of gastrocnemius|long head of biceps femoris|medial head of gastrocnemius|pes anserinus|plantaris|popliteal artery|popliteal fossa|popliteal vein|posterior tibial artery|sciatic nerve|semimembranosus|semitendinosus|short head of biceps femoris|soleus|tibial nerve|tibialis posterior|fibular (peroneal) artery|small saphenous vein|sural nerve|genicular arteries"""),
 ],
 "Back": [
  ("Dissection 1 – Superficial & Deep Back", """accessory nerve|acromion|dorsal scapular nerve and vessels|iliac crest|iliocostalis|latissimus dorsi|levator scapulae|ligamentum nuchae|longissimus|mastoid process|rhomboid major|rhomboid minor|semispinalis capitis|spinalis|splenius|thoracolumbar fascia|transverse cervical artery|trapezius"""),
  ("Dissection 2 – Spinal Cord & Meninges", """arachnoid mater|cauda equina|cervical enlargement|conus medullaris|dorsal ramus|dura mater|dural sac|epidural space|filum terminale|ligamenta flava|lumbosacral enlargement|pia mater|dorsal root (spinal) ganglion|spinal nerve|dorsal (posterior) roots|ventral ramus|vertebral canal|spinal cord|ventral (anterior) roots"""),
 ],
}


def _norm_term(x):
    import re
    return re.sub(r"\s+", " ", re.sub(r"[^a-z0-9 ]", " ", x.lower().replace("the ", "").replace(" muscle", ""))).strip()


def _dissection_of(structure, limb, sub):
    st = _norm_term(structure)
    for name, terms in DISSECTIONS.get(limb, []):
        for t in terms.split("|"):
            t = _norm_term(t)
            if t and (st == t or t in st or st in t):
                return name
    if sub in OSTEO_SUBS or "Surface" in sub or "Landmarks" in sub or sub in ("Bones & Surface Anatomy", "Leg & Foot Bones"):
        return "Osteology & Prosections"
    # not on any list: the dissection that exposes it
    D = {n.split(" – ")[0]: n for n, _ in DISSECTIONS.get(limb, [])}
    st0 = structure.lower()
    if limb == "Lower Limb":
        if st0.startswith(("extensor digitorum brevis", "extensor hallucis brevis")) or sub in ("Anterior & Medial Thigh",) \
                or "fibularis" in st0 or "obturator" in st0:
            return D["Dissection 1"]
        if sub == "Hip & Gluteal" or "gluteal" in st0:
            return D["Dissection 2"]
        return D["Dissection 3"]          # knee joint, popliteus, sole of the foot
    if limb == "Upper Limb":
        if sub == "Joints & Ligaments":
            return "Shoulder and Elbow Joints"
        if sub in ("Hand", "Forearm"):
            return D["Dissection 2"]
        return D["Dissection 1"]          # plexus, chest, arm
    return "Additional Structures"


def _category(n, sub, limb, diss):
    """Type group of a note inside a dissection (or its bone group under Osteology & Prosections)."""
    st = n["Structure"].lower()
    if diss == "Osteology & Prosections":
        if limb == "Upper Limb":
            return {"Scapula": "Scapula & Clavicle", "Clavicle": "Scapula & Clavicle", "Humerus": "Humerus, Radius & Ulna",
                    "Radius": "Humerus, Radius & Ulna", "Ulna": "Humerus, Radius & Ulna",
                    "Upper Limb Bones": "Humerus, Radius & Ulna",
                    "Carpal Bones": "Hand Bones"}.get(sub, sub)
        return sub
    if n["Origin"].strip():
        return "Muscles"
    if sub in ("Nerves", "Brachial Plexus") or re.search(r"nerve|ramus|roots?\b|ganglion|plexus|\bcord\b|trunk\b|divisions", st) \
            and not re.search(r"artery|vein|vessel", st):
        return "Nerves"
    if sub == "Vessels" or re.search(r"arter|vein|vessel|venous|palmar arch", st):
        return "Vessels"
    if sub in OSTEO_SUBS or "Landmarks" in sub or sub in ("Bones & Surface Anatomy", "Leg & Foot Bones") or n["XrayID"].strip():
        return "Bone Landmarks"
    return "Joints, Spaces & Structures"


# Landmark cards whose patch sits behind another bone in the opening view: that bone is reflected
LM_REFLECT = {
    "Glenoid cavity": "Humerus", "Supraglenoid tubercle": "Humerus", "Infraglenoid tubercle": "Humerus",
    "Medial tibial plateau": "Femur, Patella", "Lateral tibial plateau": "Femur, Patella",
    "Auricular surface of ilium": "Sacrum",
    "Intercondylar fossa": "Patella",
    "Olecranon fossa": "Ulna", "Trochlear notch": "Humerus", "Coronoid process of ulna": "Humerus",
    "Anatomical neck of humerus": "Scapula",
    "Radial notch of ulna": "Radius", "Carpal articular surface of radius": "Scaphoid bone, Lunate bone",
}
LM_CAMERA = {
    "Conoid tubercle": "inferior posterior",
    "Medial tibial plateau": "anterior +45", "Lateral tibial plateau": "anterior +45",
    "Trochanteric fossa": "posteromedial +20",
    "Intercondylar fossa": "posterior -10",
    "Groove for ulnar nerve": "posteromedial",
}
# Cards under review after the 2026-11-18 accuracy audit: kept in their own subdeck until checked.
# Empty this set (and re-run setup) to send them back to their normal decks.
FLAG_DECK = "⚑ Flagged for Review"
FLAGGED = set()   # 2026-11-18 audit: reviewed and released in 2.14.3


def _sort_by_type(placed):
    """Region-first decks: Janki 3D Anatomy::<limb>::<subdeck> (scheduling history is kept).
    Card types are picked on the deck overview instead (see _overview). Then any deck under
    the root left empty (the old type-first tiers) is removed."""
    top = DECK_ROOT.split("::", 1)[0]
    last = {nid: (sub, limb) for nid, sub, limb in placed}   # a later put wins
    by_deck = {}
    # region → dissection → a few type groups (no tiny subdecks)
    groups = {}
    for nid, (sub, limb) in last.items():
        n = mw.col.get_note(nid)
        diss = _dissection_of(n["Structure"], limb, sub)
        groups.setdefault((limb, diss), []).append((nid, _category(n, sub, limb, diss)))
    for (limb, diss), items in groups.items():
        from collections import Counter
        cnt = Counter(c for _, c in items)
        big = cnt.most_common(1)[0][0]
        for nid, cat in items:
            if cnt[cat] < 3:                  # too few: into the dissection's biggest group
                cat = big
            if mw.col.get_note(nid)["Structure"] in FLAGGED:   # under review: its own subdeck, by region
                by_deck.setdefault("::".join((top, FLAG_DECK, limb)), []).extend(mw.col.card_ids_of_note(nid))
                continue
            by_deck.setdefault("::".join((top, limb, diss, cat)), []).extend(mw.col.card_ids_of_note(nid))
    for dname, cids in by_deck.items():
        mw.col.set_deck(list(dict.fromkeys(cids)), mw.col.decks.id(dname))
    olds = [d for d in mw.col.decks.all_names_and_ids() if d.name.startswith(top + "::")]
    for d in sorted(olds, key=lambda d: -d.name.count("::")):
        if mw.col.find_cards('"deck:%s"' % d.name.replace('"', '\\"')):
            continue
        if any(x.name.startswith(d.name + "::") for x in mw.col.decks.all_names_and_ids()):
            continue
        try:
            mw.col.decks.remove([d.id])
        except Exception as exc:
            log("anatomy3d: remove empty deck %s: %s" % (d.name, exc))


# ---- Deck overview: pick which card types to study ----
_TYPES = (("Identify", "ID"), ("Identify (X-ray)", "X-ray"), ("Locate", "Click"), ("Attachments", "Attachments"),
          ("Innervation", "Innervations"), ("Action", "Actions"))
STUDY_DECK = "Janki 3D · Study"


def _types_on():
    try:
        v = mw.col.get_config("jka3d_types", None)
    except Exception:
        v = None
    return set(v) if v is not None else {"Identify"}   # first launch: ID cards only (an empty list = all off, kept)


def _overview_one(overview, content):
    try:
        name = mw.col.decks.name(mw.col.decks.current()["id"])
    except Exception:
        return
    if not (name == DECK_ROOT.split("::", 1)[0] or name.startswith(DECK_ROOT.split("::", 1)[0] + "::")):
        return
    on = _types_on()
    chips = []
    for t, label in _TYPES:
        n = len(mw.col.find_cards('"deck:%s" "card:%s"' % (name, t)))
        if not n:
            continue
        chips.append("<button class='jka3t%s' onclick=\"this.classList.toggle('on');pycmd('jka3d:t:%s')\">%s <span>%d</span></button>"
                     % (" on" if t in on else "", t, label, n))
    if not chips:
        return
    content.table += (
        "<style>#jka3row{display:flex !important;flex-wrap:nowrap !important;gap:5px;justify-content:center;"
        "margin:14px auto 6px;white-space:nowrap}"
        "#jka3row .jka3t{border:1px solid rgba(255,255,255,.16) !important;background:transparent !important;"
        "color:rgba(255,255,255,.45) !important;border-radius:999px !important;padding:3px 9px !important;"
        "font-size:12px !important;line-height:1.5 !important;cursor:pointer;box-shadow:none !important;"
        "transition:background .15s,color .15s,border-color .15s;margin:0 !important}"
        "#jka3row .jka3t.on{background:rgba(95,200,255,.2) !important;border-color:rgba(95,200,255,.55) !important;"
        "color:#fff !important}"
        "#jka3row .jka3t span{opacity:.6;margin-left:3px;font-variant-numeric:tabular-nums}"
        "</style><div id='jka3row'>%s</div>" % "".join(chips))
    fm = _front_mode()
    content.table += (
        "<style>#jka3front{display:flex;gap:4px;justify-content:center;align-items:center;margin:8px auto 0;"
        "font-size:12px !important;opacity:.9}#jka3front span.l{opacity:.6;margin-right:4px}"
        "#jka3front .jka3f{border:1px solid rgba(255,255,255,.16) !important;background:transparent !important;"
        "color:rgba(255,255,255,.5) !important;border-radius:999px !important;padding:2px 9px !important;"
        "font-size:12px !important;line-height:1.5 !important;cursor:pointer;box-shadow:none !important;margin:0 !important}"
        "#jka3front .jka3f.on{background:rgba(56,217,122,.22) !important;border-color:rgba(56,217,122,.6) !important;color:#fff !important}</style>"
        "<div id='jka3front'><span class='l'>Model on front for attachments/innervations:</span>%s</div>"
        % "".join("<button class='jka3f%s' title='%s' onclick=\"document.querySelectorAll('#jka3front .jka3f').forEach(function(b){b.classList.remove('on')});"
                  "this.classList.add('on');pycmd('jka3d:front:%s')\">%s</button>"
                  % (" on" if k == fm else "",
                     {"show": "Always show the model on the front of key-facts / attachment / innervation cards",
                      "adaptive": "Show it until the card has graduated (interval of a day or more); then hide it",
                      "hide": "Never show the model on the front of those cards"}[k], k, lbl)
                  for k, lbl in FRONT_MODES))
    # Onigiri: its overview hides add-on rows behind a "Click to reveal" button — keep the chips and
    # the front-model row visible (they ARE the deck's controls), drop the button when nothing else is
    # hidden, and style the chips like Onigiri's own buttons
    try:
        from ..util import compat as _compat
        oni = _compat.onigiri_on()
    except Exception:
        oni = False
    if oni:
        content.table += (
            "<style>"
            "#jka3row .jka3t,#jka3front .jka3f{border-radius:10px !important;font-family:inherit !important;"
            "font-weight:500 !important;padding:4px 11px !important;font-size:12.5px !important;"
            "background:rgba(255,255,255,.07) !important;border:1px solid rgba(255,255,255,.2) !important;"
            "color:rgba(255,255,255,.72) !important;transition:background .15s,color .15s,border-color .15s,filter .15s}"
            "#jka3row .jka3t:hover,#jka3front .jka3f:hover{background:rgba(255,255,255,.13) !important;color:#fff !important}"
            "#jka3row .jka3t.on,#jka3front .jka3f.on{background:var(--accent-color,#8ab4f8) !important;"
            "border-color:var(--accent-color,#8ab4f8) !important;color:#0d1626 !important}"
            "#jka3row .jka3t.on:hover,#jka3front .jka3f.on:hover{filter:brightness(1.08)}"
            "#jka3row{gap:6px !important}"
            "</style>"
            "<script>(function(){var IDS=['jka3row','jka3front','jka3tip'];"
            "function fix(){var ours=0,other=0;"
            "document.querySelectorAll('.onigiri-external-overview-addon').forEach(function(el){"
            "var mine=IDS.some(function(i){return el.id===i||el.querySelector('#'+i);})"
            "||(el.tagName==='STYLE'||el.tagName==='SCRIPT');"
            "if(mine){el.style.display='';el.classList.remove('onigiri-external-overview-addon');ours++;}else other++;});"
            "IDS.forEach(function(i){var e=document.getElementById(i);if(e)e.style.display='';});"
            "if(!other){var r=document.getElementById('onigiri-reveal-btn');"
            "if(r){(r.closest('.overview-reveal-action')||r).style.display='none';}}}"
            "if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(fix,0);});"
            "else setTimeout(fix,0);setTimeout(fix,150);setTimeout(fix,600);})();</script>")
    # first time: a one-off hint under the chips
    try:
        seen = mw.col.get_config("jka3d_tip_seen", False)
    except Exception:
        seen = True
    if not seen:
        content.table += (
            "<div id='jka3tip' style='position:relative;display:flex;justify-content:center;margin-top:2px'>"
            "<div style='position:relative;background:rgba(95,200,255,.95);color:#06202c;font-size:12.5px;"
            "padding:6px 12px;border-radius:9px;box-shadow:0 4px 14px rgba(0,0,0,.35);animation:jka3in .25s ease-out'>"
            "<span style='position:absolute;top:-6px;left:50%;margin-left:-6px;border:6px solid transparent;"
            "border-top:0;border-bottom-color:rgba(95,200,255,.95)'></span>"
            "Click to enable/disable different card types</div></div>"
            "<style>@keyframes jka3in{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}</style>"
            "<script>(function(){var t=document.getElementById('jka3tip');function hide(){if(t){t.style.transition='opacity .3s';"
            "t.style.opacity='0';setTimeout(function(){t&&t.remove();},320);}}"
            "document.querySelectorAll('#jka3row .jka3t').forEach(function(b){b.addEventListener('click',hide);});"
            "setTimeout(hide,9000);})();</script>")
        try:
            mw.col.set_config("jka3d_tip_seen", True)
        except Exception:
            pass


def _in_root():
    try:
        name = mw.col.decks.name(mw.col.decks.current()["id"])
    except Exception:
        return False
    top = DECK_ROOT.split("::", 1)[0]
    return name == top or name.startswith(top + "::")


def _on_js_one(handled, msg, context):
    if not isinstance(msg, str) or not msg.startswith("jka3d:"):
        return handled
    try:
        if msg.startswith("jka3d:t:"):
            t = msg[len("jka3d:t:"):]
            on = _types_on()
            on.symmetric_difference_update({t})
            if not on:
                # all off would suspend every card → Anki shows "Congratulations" instead of this
                # page, and the chips with it: keep the last type on
                from aqt.utils import tooltip
                tooltip("At least one card type has to stay on.")
                mw.overview.refresh()   # the chip toggled itself off in the page: redraw it on
                return (True, None)
            mw.col.set_config("jka3d_types", sorted(on))   # the chip already toggled itself in the page
            apply_types(refresh=True)
        elif msg.startswith("jka3d:front:"):
            v = msg[len("jka3d:front:"):]
            if v in dict(FRONT_MODES) and v != _front_mode():
                mw.col.set_config("jka3d_front", v)
                _rewrite_templates()
        elif msg == "jka3d:study":
            _study_selected()
    except Exception as e:
        log("anatomy3d overview: %s" % e)
    return (True, None)


def apply_types(refresh=False):
    """The card-type choice is shared by the full and Lite decks: apply it to both."""
    a1 = _with(FULL, _apply_types_one, False)
    a2 = _with(LITE, _apply_types_one, False)
    if refresh and (any(a1) or any(a2)):
        try:
            mw.overview.refresh()
        except Exception:
            pass
    return a1[0] + a2[0], a1[1] + a2[1]


def order_new():
    """New-card order: every ID / Click card first (per structure: ID then Click), then the
    X-ray IDs, then key facts / attachments / innervations. Only unseen cards move."""
    col = mw.col
    m = col.models.by_name(MODEL_NAME)
    if not m:
        return 0
    names = {t["ord"]: t["name"] for t in m["tmpls"]}
    rank = {"Identify": 0, "Locate": 1, "Identify (X-ray)": 2, "Action": 3, "Attachments": 4, "Innervation": 5}
    cards = []
    for cid in col.find_cards('"note:%s" is:new' % MODEL_NAME):
        c = col.get_card(cid)
        r = rank.get(names.get(c.ord, ""), 9)
        cards.append(((0 if r <= 1 else 1 if r == 2 else 2), c.nid, r, cid))
    cards.sort()
    # write the positions directly: Anki's reposition keeps the cards' existing relative order
    upd = []
    for pos, (_g, _n, _r, cid) in enumerate(cards):
        c = col.get_card(cid)
        if c.due != pos:
            c.due = pos
            upd.append(c)
    if upd:
        col.update_cards(upd)
    return len(cards)


def _apply_types_one(refresh=False):
    """Switched-off card types are suspended across Janki 3D Anatomy (so they leave the New
    count and Study Now); switching one back on unsuspends only the cards this suspended
    (their ids are kept in the collection config), never ones you suspended yourself."""
    col = mw.col
    on = _types_on()
    top = DECK_ROOT.split("::", 1)[0]
    try:
        mine = set(col.get_config("jka3d_susp", []) or [])
    except Exception:
        mine = set()
    sus, uns = [], []
    for t, _ in _TYPES:
        q = '"deck:%s" "card:%s"' % (top, t)
        if t in on:
            back = [c for c in col.find_cards(q + " is:suspended") if c in mine]
            uns += back
            mine.difference_update(back)
        else:
            new = col.find_cards(q + " -is:suspended")
            sus += new
            mine.update(new)
    if sus:
        col.sched.suspend_cards(sus)
    if uns:
        col.sched.unsuspend_cards(uns)
    col.set_config("jka3d_susp", sorted(mine))
    if refresh and (sus or uns):
        try:
            mw.overview.refresh()
        except Exception:
            pass
    return len(sus), len(uns)


def _study_selected():
    from aqt.utils import tooltip
    name = mw.col.decks.name(mw.col.decks.current()["id"])
    on = [t for t, _ in _TYPES if t in _types_on()]
    if not on:
        tooltip("Switch on at least one card type.")
        return
    q = '"deck:%s" (%s) -is:suspended -is:buried' % (name, " OR ".join('"card:%s"' % t for t in on))
    col = mw.col
    old = col.decks.by_name(STUDY_DECK)
    if old and old.get("dyn"):
        did = old["id"]
    else:
        did = col.decks.new_filtered(STUDY_DECK)
    d = col.decks.get(did)
    d["terms"] = [[q, 99999, 0]]
    d["resched"] = True
    col.decks.save(d)
    col.sched.rebuild_filtered_deck(did)
    if not col.decks.cids(did):
        tooltip("No cards of those types are due here.")
        try:
            mw.overview.refresh()   # Study Now may have faded the page out already
        except Exception:
            pass
        return
    col.decks.select(did)
    mw.moveToState("review")


# ---- Calendar: a dissection class links to its 3D cards ----
_REGION_WORDS = (
    ("Back", r"\bback\b|vertebr|\bspin(e|al)\b|suboccipital|erector"),
    ("Upper Limb", r"upper (limb|extremit)|\barm\b|axill|shoulder|scapul|pectoral|brachial|forearm|cubital|\bhand\b|wrist|palm"),
    ("Lower Limb", r"lower (limb|extremit)|thigh|glute|\bleg\b|knee|poplite|\bfoot\b|ankle|\bhip\b|femoral"),
)


def calendar_links(title):
    """[(label, search, count)] of 3D-anatomy card sets for a class title; [] when the
    class isn't a dissection / anatomy session. Region buttons first, then any subdeck
    whose name appears in the title (e.g. "Gluteal Region")."""
    import re
    if mw.col is None:
        return []
    t = (title or "").lower()
    if not re.search(r"dissect|anatom|\blab\b|cadaver", t):
        return []
    out = []
    for limb, rx in _REGION_WORDS:
        if re.search(rx, t):
            out.append((limb, 'tag:"Janki3D::%s::*"' % limb.replace(" ", "")))
    seen = set()
    for tag in mw.col.tags.all():
        parts = tag.split("::")
        if len(parts) != 3 or parts[0] != "Janki3D" or tag in seen:
            continue
        seen.add(tag)
        words = re.sub(r"(?<=[a-z])(?=[A-Z&])", " ", parts[2]).replace("&", " ").split()
        key = [w.lower() for w in words if len(w) > 3]
        if key and all(w in t for w in key):
            out.append((" ".join(words), 'tag:"%s"' % tag))
    if not out:
        out = [("All 3D anatomy", '"note:%s"' % MODEL_NAME)]
    res = []
    for label, q in out:
        try:
            n = len(mw.col.find_cards(q))
        except Exception:
            n = 0
        if n:
            res.append((label, q, n))
    return res[:5]


TDAVNH = {"Tibialis posterior", "Flexor digitorum longus", "Flexor hallucis longus", "Tibial nerve",
          "Posterior tibial artery", "Medial malleolus"}
TDAVNH_TXT = ("Behind the medial malleolus, front to back: Tibialis posterior, flexor Digitorum longus, posterior tibial Artery (and Veins), tibial Nerve, flexor Hallucis longus — “Tom, Dick And Very Nervous Harry”.")


def setup():
    if mw.col is None:
        return
    try:
        _copy_media()
        m = _ensure_model()
        # rewriting the templates drops Janki's mobile theming (tap flare, fonts): put it back
        try:
            from ..integrations import mobilecards as _mc
            if _mc.is_applied():
                _bk = _mc._load_backup()
                _mc._theme_model(mw.col.models.by_name(MODEL_NAME), _bk)
                _mc._save_backup(_bk)
                m = mw.col.models.by_name(MODEL_NAME)
        except Exception as _e:
            log("anatomy3d: mobile theming: %s" % _e)
        mid = m["id"]
        existing = {}
        # one note per structure: keep the oldest (it carries the review history), drop copies
        _seen, _dups = {}, []
        for nid in sorted(mw.col.find_notes('"note:%s"' % MODEL_NAME)):
            st0 = mw.col.get_note(nid)["Structure"]
            st0 = LL_RENAME.get(st0, st0)
            if st0 in _seen:
                _dups.append(nid)
            else:
                _seen[st0] = nid
        if _dups:
            mw.col.remove_notes(_dups)
        for nid in mw.col.find_notes('"note:%s"' % MODEL_NAME):
            n = mw.col.get_note(nid)
            st0 = n["Structure"]
            if st0 in LL_RENAME:
                n["Structure"] = LL_RENAME[st0]
                mw.col.update_note(n)
            existing[n["Structure"]] = n
        added = 0

        placed = []

        def put(sub, vals, limb="Lower Limb"):
            nonlocal added
            vals = dict(vals); vals["Structure"] = LL_RENAME.get(vals["Structure"], vals["Structure"])
            if not vals.get("Reflect") and vals["Structure"] in LM_REFLECT:   # the bone that hides the landmark
                vals["Reflect"] = LM_REFLECT[vals["Structure"]]
            if vals["Structure"] in LM_CAMERA:
                vals["Camera"] = LM_CAMERA[vals["Structure"]]
            n = existing.get(vals["Structure"])
            new = n is None
            if new:
                n = mw.col.new_note(m)
            for k, v in vals.items():
                n[k] = v
            n["Model"] = {"Upper Limb": UPPER_LIMB, "Back": TRUNK}.get(limb, LOWER_LIMB)
            n["XrayID"] = "1" if sub in OSTEO_SUBS else ""   # osteology: also an X-ray ID card (Identification::Imaging)
            if limb == "Back":
                n["Limb"] = "right"   # the trunk is never mirrored (heart stays on the left)
            if limb == "Lower Limb":                   # condensed subdecks
                sub = SUB_MERGE.get(sub, "Bones & Surface Anatomy" if sub == "Surface Anatomy" else sub)
            tag = "Janki3D::%s::%s" % (limb.replace(" ", ""), sub.replace(" ", ""))
            n.tags = [t for t in n.tags if not t.startswith("Janki3D::")] + [tag]
            if new:
                mw.col.add_note(n, mw.col.decks.id(DECK_ROOT.split("::", 1)[0] + "::" + limb + "::" + sub))
                added += 1
                existing[vals["Structure"]] = n   # listed again later (another list): update it, don't add a twin
            else:
                mw.col.update_note(n)
            if vals["Structure"] in TDAVNH and TDAVNH_TXT not in n["Extra"]:   # tarsal tunnel mnemonic
                n["Extra"] = (n["Extra"] + " " if n["Extra"] else "") + TDAVNH_TXT
                mw.col.update_note(n)
            placed.append((n.id, sub, limb))

        # structures reflected by default on a card (the engine also reflects whatever hides
        # most of the asked structure from the opening view)
        GM = "Gluteus maximus muscle"
        CALF = "Medial head of gastrocnemius, Lateral head of gastrocnemius, Soleus muscle, Plantaris muscle, Calcaneal tendon"
        REFLECT = {"Gluteus medius": "Gluteus maximus muscle", "Piriformis": "Gluteus maximus muscle",
                   # deep gluteal region: gluteus maximus out of the way
                   "Gluteus minimus": GM + ", Gluteus medius muscle", "Superior gemellus": GM, "Inferior gemellus": GM,
                   "Obturator internus": GM, "Quadratus femoris": GM, "Sciatic nerve": GM,
                   "Superior gluteal artery": GM + ", Gluteus medius muscle", "Inferior gluteal artery": GM,
                   "Obturator externus": "Pectineus muscle, Adductor longus, Adductor brevis",
                   # deep posterior leg: the calf (gastrocnemius, soleus, plantaris) out of the way
                   "Tibialis posterior": CALF, "Flexor digitorum longus": CALF, "Flexor hallucis longus": CALF,
                   "Popliteus": CALF, "Tibial nerve": CALF, "Posterior tibial artery": CALF, "Fibular (peroneal) artery": CALF,
                   "Superior gluteal nerve": "Gluteus maximus muscle",
                   "Medial meniscus": "Patella", "Lateral meniscus": "Patella",
                   # cruciates sit inside the notch: see them through a glass femur
                   "Anterior cruciate ligament (ACL)": "~Femur, Patella", "Posterior cruciate ligament (PCL)": "~Femur, Patella"}
        for (sub, st, meshes, region, cam, o, i, inn, nerve, act, extra) in SAMPLES:
            put(sub, {"Structure": st, "Meshes": meshes, "Region": region, "Camera": cam,
                      "Origin": o, "Insertion": i, "Innervation": inn, "Nerve": nerve,
                      "Action": act, "Extra": extra, "Reflect": REFLECT.get(st, "")})
        for (sub, st, bone, key, region, cam, act) in LANDMARKS:
            put(sub, {"Structure": st, "Meshes": bone, "Landmark": key, "Region": region, "Camera": cam,
                      "Action": act, "Origin": "", "Insertion": "", "Innervation": "", "Nerve": "", "Extra": "",
                      "Reflect": "Femur" if key == "acetabulum" else ""})   # the socket is hidden behind the head
        for (sub, st, meshes, region, cam, o, i, inn, nerve, act, extra) in LL_MUSCLES:
            put(sub, {"Structure": st, "Meshes": meshes, "Landmark": "", "Region": region, "Camera": cam,
                      "Origin": o, "Insertion": i, "Innervation": inn, "Nerve": nerve,
                      "Action": act, "Extra": extra, "Reflect": REFLECT.get(st, "")})
        for (sub, st, meshes, key, region, cam, o, i, inn, nerve, act) in LL_PART_MUSCLES:
            refl = ("Semitendinosus muscle, Semimembranosus muscle, Long head of biceps femoris, Gracilis muscle, Gluteus maximus muscle"
                    if "hamstring" in key else "Adductor longus, Adductor brevis, Pectineus muscle, Sartorius muscle, Gracilis muscle")
            put(sub, {"Structure": st, "Meshes": meshes, "Landmark": key, "Region": region, "Camera": cam,
                      "Origin": o, "Insertion": i, "Innervation": inn, "Nerve": nerve, "Action": act, "Extra": "", "Reflect": refl})
        for (sub, st, meshes, key, region, cam, facts, refl) in LL_NOTES:
            put(sub, {"Structure": st, "Meshes": meshes, "Landmark": key, "Region": region, "Camera": cam,
                      "Action": facts, "Origin": "", "Insertion": "", "Innervation": "", "Nerve": "", "Extra": "",
                      "Reflect": refl})
        for (sub, st, meshes, key, region, cam, facts, refl) in UL_NOTES:
            put(sub, {"Structure": st, "Meshes": meshes, "Landmark": key, "Region": region, "Camera": cam,
                      "Action": facts, "Origin": "", "Insertion": "", "Innervation": "", "Nerve": "", "Extra": "",
                      "Reflect": refl}, "Upper Limb")
        for (sub, st, meshes, region, cam, o, i, inn, nerve, act, extra) in UL_MUSCLES:
            put(sub, {"Structure": st, "Meshes": meshes, "Landmark": "", "Region": region, "Camera": cam,
                      "Origin": o, "Insertion": i, "Innervation": inn, "Nerve": nerve,
                      "Action": act, "Extra": extra, "Reflect": ""}, "Upper Limb")
        for (sub, st, key, o, i, inn, nerve, act) in UL_LUMBRICALS:
            put(sub, {"Structure": st, "Meshes": "Lumbrical muscles of hand", "Landmark": key, "Region": "hand", "Camera": "anterior",
                      "Origin": o, "Insertion": i, "Innervation": inn, "Nerve": nerve, "Action": act, "Extra": "",
                      "Reflect": "Humero-ulnar head of flexor digitorum superficialis, Radial head of flexor digitorum superficialis, Palmaris longus muscle, Flexor retinaculum of wrist, Superficial transverse metacarpal ligament"}, "Upper Limb")
        for (sub, st, meshes, key, cam, facts, refl) in LL_EXTRA:
            put(sub, {"Structure": st, "Meshes": meshes, "Landmark": key, "Region": "", "Camera": cam,
                      "Action": facts, "Origin": "", "Insertion": "", "Innervation": "", "Nerve": "", "Extra": "",
                      "Reflect": refl})
        for (sub, st, meshes, region, cam, o, i, inn, nerve, act, extra) in LL_HEADS:
            put(sub, {"Structure": st, "Meshes": meshes, "Landmark": "", "Region": region, "Camera": cam,
                      "Origin": o, "Insertion": i, "Innervation": inn, "Nerve": nerve, "Action": act, "Extra": extra, "Reflect": ""})
        for (sub, st, meshes, key, cam, facts, refl) in BACK_EXTRA:
            put(sub, {"Structure": st, "Meshes": meshes, "Landmark": key, "Region": "canal" if sub == _SP else "", "Camera": cam,
                      "Action": facts, "Origin": "", "Insertion": "", "Innervation": "", "Nerve": "", "Extra": "",
                      "Reflect": refl}, "Back")
        for (sub, st, meshes, key, cam, facts, refl) in UL_EXTRA:
            put(sub, {"Structure": st, "Meshes": meshes, "Landmark": key, "Region": "", "Camera": cam,
                      "Action": facts, "Origin": "", "Insertion": "", "Innervation": "", "Nerve": "", "Extra": "",
                      "Reflect": refl}, "Upper Limb")
        for (sub, st, meshes, region, cam, o, i, inn, nerve, act, extra) in UL_HEADS:
            put(sub, {"Structure": st, "Meshes": meshes, "Landmark": "", "Region": region, "Camera": cam,
                      "Origin": o, "Insertion": i, "Innervation": inn, "Nerve": nerve, "Action": act, "Extra": extra, "Reflect": ""}, "Upper Limb")
        for (st, meshes, key, cam, facts) in BP_NOTES:
            put(_BP, {"Structure": st, "Meshes": meshes, "Landmark": key, "Region": "plexus", "Camera": "anterolateral" if st.startswith("Roots") else cam,
                      "Action": facts, "Origin": "", "Insertion": "", "Innervation": "", "Nerve": "", "Extra": "",
                      "Reflect": _BP_REFL}, "Upper Limb")
        for (sub, st, meshes, key, region, cam, facts) in BACK_NOTES:
            put(sub, {"Structure": st, "Meshes": meshes, "Landmark": key, "Region": region, "Camera": cam,
                      "Action": facts, "Origin": "", "Insertion": "", "Innervation": "", "Nerve": "", "Extra": "", "Reflect": ""}, "Back")
        for (sub, st, meshes, region, cam, o, i, inn, nerve, act, extra) in BACK_MUSCLES:
            deep = st not in ("Trapezius", "Latissimus dorsi")
            trap = _lr("Descending part of trapezius muscle", "Transverse part of trapezius muscle", "Ascending part of trapezius muscle")
            refl = "" if not deep else trap + (", " + _lr("Latissimus dorsi muscle", "Rhomboid major muscle", "Rhomboid minor muscle", "Splenius capitis muscle", "Splenius colli muscle")
                                                 if st in ("Iliocostalis", "Longissimus", "Spinalis", "Semispinalis capitis") else "")
            put(sub, {"Structure": st, "Meshes": meshes, "Landmark": "", "Region": region, "Camera": "posterolateral" if deep else cam,
                      "Origin": o, "Insertion": i, "Innervation": inn, "Nerve": nerve, "Action": act, "Extra": extra, "Reflect": refl}, "Back")
        # stray duplicates of renamed notes (an earlier setup re-created the old name)
        _st = [nid for nid in mw.col.find_notes('"note:%s"' % MODEL_NAME)
               if mw.col.get_note(nid)["Structure"] in LL_RENAME and nid not in {x[0] for x in placed}]
        if _st:
            mw.col.remove_notes(_st)
        # (Peel cards retired: their notes, template and deck are removed)
        peel_nids = [nid for nid in mw.col.find_notes('"note:%s"' % MODEL_NAME) if mw.col.get_note(nid)["Peel"].strip()]
        if peel_nids:
            mw.col.remove_notes(peel_nids)
        _sort_by_type(placed)
        try:
            if mw.col.get_config("jka3d_types", None) == []:     # all off (decks would show as finished): ID back on
                mw.col.set_config("jka3d_types", ["Identify"])
            if not mw.col.get_config("jka3d_types_v2", False):   # new default: ID only (once)
                mw.col.set_config("jka3d_types", ["Identify"])
                mw.col.set_config("jka3d_types_v2", True)
            apply_types()
        except Exception as _e:
            log("anatomy3d apply types: %s" % _e)
        try:
            order_new()
        except Exception as _e:
            log("anatomy3d order: %s" % _e)
        mw.reset()
        showInfo("Janki 3D anatomy is set up.\n\n%s sample notes in “%s”.\n\n"
                 "Drag to rotate, scroll to zoom, right-drag to pan. On the back, the "
                 "Bone / Muscle / Nerve / Artery buttons toggle layers."
                 % (("Added %d" % added) if added else "Refreshed the", DECK_ROOT))
    except Exception as e:
        log("anatomy3d setup: %s" % e)
        try:
            import traceback
            with open(os.path.expanduser("~/.janki_anat_error.txt"), "w") as f:
                f.write(traceback.format_exc())
        except Exception:
            pass
        showInfo("Janki 3D anatomy setup failed: %s" % e)


def setup_lite():
    """Tools → Set up 3D anatomy cards (Lite): run the same setup against the Lite note type,
    deck tree and models (module names swapped for the duration, then put back)."""
    g = globals()
    saved = {k: g[k] for k in LITE}
    try:
        g.update(LITE)
        setup()
    finally:
        g.update(saved)


def _specs():
    """(RAM in GB or None, CPU cores, Apple Silicon?) for the Normal / Lite suggestion."""
    import platform, subprocess
    ram = None
    try:
        if platform.system() == "Darwin":
            ram = int(subprocess.run(["sysctl", "-n", "hw.memsize"], capture_output=True, text=True, timeout=2).stdout) / 2**30
        elif platform.system() == "Windows":
            import ctypes
            class MS(ctypes.Structure):
                _fields_ = [("l", ctypes.c_ulong), ("load", ctypes.c_ulong), ("total", ctypes.c_ulonglong)] + \
                           [("x%d" % i, ctypes.c_ulonglong) for i in range(6)]
            ms = MS(); ms.l = ctypes.sizeof(MS)
            if ctypes.windll.kernel32.GlobalMemoryStatusEx(ctypes.byref(ms)):
                ram = ms.total / 2**30
        else:
            with open("/proc/meminfo") as f:
                ram = int(f.readline().split()[1]) / 2**20
    except Exception:
        ram = None
    cores = os.cpu_count() or 0
    arm_mac = platform.system() == "Darwin" and platform.machine() == "arm64"
    return ram, cores, arm_mac


# A tiny WebGL test run in Anki's own page (the same Chromium as the cards): which renderer is in
# use (a real GPU, or a software fallback such as SwiftShader) and how long the GPU takes to draw a
# fixed load (200k small triangles). Measured: Apple M5 1.6 ms; SwiftShader on the same Mac 14 ms.
_GPU_BENCH = r"""(function(){try{
var c=document.createElement('canvas');c.width=512;c.height=512;
var g=c.getContext('webgl2',{antialias:false})||c.getContext('webgl',{antialias:false})||c.getContext('experimental-webgl');
if(!g)return JSON.stringify({gl:false});
var e=g.getExtension('WEBGL_debug_renderer_info');
var r=e?g.getParameter(e.UNMASKED_RENDERER_WEBGL):g.getParameter(g.RENDERER);
function sh(t,s){var x=g.createShader(t);g.shaderSource(x,s);g.compileShader(x);return x;}
var p=g.createProgram();
g.attachShader(p,sh(g.VERTEX_SHADER,'attribute vec3 a;uniform float k;varying float v;void main(){v=a.z;gl_Position=vec4(a.xy*0.9+vec2(sin(k+a.z*40.0),cos(k))*0.05,a.z,1.0);}'));
g.attachShader(p,sh(g.FRAGMENT_SHADER,'precision mediump float;varying float v;void main(){gl_FragColor=vec4(v,0.5,1.0-v,1.0);}'));
g.linkProgram(p);g.useProgram(p);
var N=200000,a=new Float32Array(N*9);
for(var i=0;i<N*9;i+=9){var x=Math.random()*2-1,y=Math.random()*2-1,z=Math.random();a[i]=x;a[i+1]=y;a[i+2]=z;a[i+3]=x+0.02;a[i+4]=y;a[i+5]=z;a[i+6]=x;a[i+7]=y+0.02;a[i+8]=z;}
var b=g.createBuffer();g.bindBuffer(g.ARRAY_BUFFER,b);g.bufferData(g.ARRAY_BUFFER,a,g.STATIC_DRAW);
var L=g.getAttribLocation(p,'a');g.enableVertexAttribArray(L);g.vertexAttribPointer(L,3,g.FLOAT,false,0,0);
var K=g.getUniformLocation(p,'k');g.enable(g.DEPTH_TEST);
g.uniform1f(K,0);g.drawArrays(g.TRIANGLES,0,N*3);g.readPixels(0,0,1,1,g.RGBA,g.UNSIGNED_BYTE,new Uint8Array(4));  // warm-up
var t0=performance.now(),F=12;
for(var f=0;f<F;f++){g.clear(g.COLOR_BUFFER_BIT|g.DEPTH_BUFFER_BIT);g.uniform1f(K,f);g.drawArrays(g.TRIANGLES,0,N*3);}
g.readPixels(0,0,1,1,g.RGBA,g.UNSIGNED_BYTE,new Uint8Array(4));
var ms=(performance.now()-t0)/F;
var lc=g.getExtension('WEBGL_lose_context');if(lc)lc.loseContext();
return JSON.stringify({gl:true,renderer:r,ms:Math.round(ms*10)/10});
}catch(x){return JSON.stringify({gl:false,err:String(x)});}})()"""


def _gpu_probe(done):
    """Calls done(dict | None) with {gl, renderer, ms}; None if the page didn't answer in time."""
    import json
    from aqt.qt import QTimer
    state = {"fired": False}
    def fire(v):
        if state["fired"]:
            return
        state["fired"] = True
        try:
            done(json.loads(v) if isinstance(v, str) else None)
        except Exception:
            done(None)
    try:
        mw.web.evalWithCallback(_GPU_BENCH, fire)
    except Exception:
        fire(None)
        return
    QTimer.singleShot(4000, lambda: fire(None))


def _gpu_name(r):
    r = str(r or "")
    if "Renderer:" in r:                       # ANGLE (Apple, ANGLE Metal Renderer: Apple M5, …)
        return r.split("Renderer:")[-1].split(",")[0].strip()
    if r.startswith("ANGLE (") and r.count(",") >= 2:   # ANGLE (NVIDIA, NVIDIA GeForce … Direct3D11 …)
        return r.split(",")[1].split(" Direct3D")[0].split(" (0x")[0].strip()
    return r


def _recommend(gpu, ram, cores, arm_mac):
    """('lite' | 'normal', reason line)."""
    bits, lite = [], False
    fast_gpu = False
    if gpu and gpu.get("gl"):
        r = str(gpu.get("renderer") or "")
        soft = any(k in r.lower() for k in ("swiftshader", "llvmpipe", "software", "basic render"))
        ms = gpu.get("ms")
        if soft:
            lite = True
            bits.append("No GPU in use (software rendering)")
        elif isinstance(ms, (int, float)):
            speed = "fast" if ms < 4 else "moderate" if ms < 10 else "slow"
            fast_gpu = ms < 4
            bits.append("GPU: %s · %s (%.1f ms test)" % (_gpu_name(r) or "unknown", speed, ms))
            if ms >= 10 or (ms >= 4 and ram is not None and ram < 8):
                lite = True
    elif gpu is not None:
        lite = True
        bits.append("WebGL unavailable")
    else:
        bits.append("GPU: not measured")
    if ram:
        bits.append("%d GB memory" % round(ram))
    if cores:
        bits.append("%d CPU cores" % cores)
    if (ram is not None and ram < 8 and not fast_gpu) or (cores and cores < 4):
        lite = True
    return ("lite" if lite else "normal"), " · ".join(bits)


def choose_setup():
    """Tools → Set up 3D anatomy cards: Normal or Lite, suggested from this computer's GPU
    (renderer + a quick draw test), memory and CPU cores."""
    from aqt.qt import QApplication, Qt
    try:
        QApplication.setOverrideCursor(Qt.CursorShape.WaitCursor)
    except Exception:
        pass
    def go(gpu):
        try:
            QApplication.restoreOverrideCursor()
        except Exception:
            pass
        ram, cores, arm_mac = _specs()
        rec, why = _recommend(gpu, ram, cores, arm_mac)
        try:
            log("anatomy3d setup suggestion: %s (%s)" % (rec, why))
        except Exception:
            pass
        _choose_dialog(rec, why)
    _gpu_probe(go)


def _choose_dialog(rec, why):
    from aqt.qt import QDialog, QVBoxLayout, QHBoxLayout, QLabel, QPushButton, Qt
    dlg = QDialog(mw)
    dlg.setWindowTitle("Set up 3D anatomy cards")
    try:
        from ..user import glass as _glass, css as _css
        _glass.glass_dialog(dlg)
        _css.apply_widget_ui_font(dlg)
    except Exception:
        pass
    v = QVBoxLayout(dlg)
    v.setSpacing(10)
    if getattr(dlg, "_jk_expanded", False):          # content sits in the titlebar row
        _m = v.contentsMargins()
        v.setContentsMargins(_m.left(), 30, _m.right(), _m.bottom())
    title = QLabel("Set up 3D anatomy cards")
    title.setStyleSheet("font-size:17px;font-weight:600;background:transparent")
    v.addWidget(title)
    sub = QLabel("Choose the version for this computer. Lite is a separate deck with its own "
                 "reviews, so set up the one you'll study.")
    sub.setWordWrap(True)
    sub.setStyleSheet("color:rgba(255,255,255,.62);background:transparent")
    v.addWidget(sub)
    choice = {"v": None}
    from aqt.qt import QFrame

    class _Opt(QFrame):
        def __init__(self, key, head, body):
            super().__init__()
            self.key = key
            self.setObjectName("jkaOpt")
            self.setProperty("rec", key == rec)
            self.setProperty("sel", False)
            self.setCursor(Qt.CursorShape.PointingHandCursor)
            lay = QVBoxLayout(self); lay.setContentsMargins(16, 12, 16, 12); lay.setSpacing(3)
            top = QHBoxLayout(); top.setSpacing(8)
            h = QLabel(head); h.setStyleSheet("font-size:14px;font-weight:700;background:transparent;border:none")
            top.addWidget(h)
            if key == rec:
                tag = QLabel("Recommended")
                tag.setStyleSheet("font-size:11px;font-weight:600;color:#06202c;background:rgba(95,200,255,.92);"
                                  "border:none;border-radius:8px;padding:1px 8px")
                top.addWidget(tag)
            top.addStretch()
            lay.addLayout(top)
            b = QLabel(body); b.setWordWrap(True)
            b.setStyleSheet("font-size:12.5px;color:rgba(255,255,255,.66);background:transparent;border:none")
            lay.addWidget(b)

        def mouseReleaseEvent(self, e):
            select(self.key)

    dlg.setStyleSheet((dlg.styleSheet() or "") +
        "QFrame#jkaOpt{border-radius:12px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14)}"
        "QFrame#jkaOpt:hover{background:rgba(255,255,255,.10)}"
        'QFrame#jkaOpt[sel="true"]{background:rgba(95,200,255,.14);border:1.5px solid rgba(95,200,255,.85)}'
        'QFrame#jkaOpt[sel="true"]:hover{background:rgba(95,200,255,.19)}')
    opts = {}

    def select(key):
        choice["v"] = key
        for k, w in opts.items():
            w.setProperty("sel", k == key)
            w.style().unpolish(w); w.style().polish(w); w.update()

    def card(key, head, body):
        opts[key] = _Opt(key, head, body)
        v.addWidget(opts[key])
    card("normal", "Normal", "Full-detail models, sharp on high-resolution screens.")
    card("lite", "Lite", "Simplified models drawn at a lower resolution, for older or slower computers and phones.")
    info = QLabel(why)
    info.setWordWrap(True)
    info.setStyleSheet("color:rgba(255,255,255,.5);font-size:11.5px;background:transparent")
    v.addWidget(info)
    row = QHBoxLayout()
    cancel = QPushButton("Cancel")
    cancel.setStyleSheet("QPushButton{padding:5px 14px;border-radius:8px;background:rgba(255,255,255,.07);"
                         "border:1px solid rgba(255,255,255,.14);color:rgba(255,255,255,.8)}"
                         "QPushButton:hover{background:rgba(255,255,255,.12)}")
    cancel.clicked.connect(dlg.reject)
    ok = QPushButton("OK")
    ok.setDefault(True)
    ok.setStyleSheet("QPushButton{padding:5px 20px;border-radius:8px;font-weight:600;color:#06202c;"
                     "background:rgba(95,200,255,.92);border:1px solid rgba(95,200,255,1)}"
                     "QPushButton:hover{background:rgba(125,212,255,1)}")
    ok.clicked.connect(dlg.accept)
    row.addWidget(cancel)
    row.addStretch()
    row.addWidget(ok)
    v.addLayout(row)
    select(rec)
    dlg.setMinimumWidth(440)
    if not dlg.exec():
        return
    if choice["v"] == "normal":
        setup()
    elif choice["v"] == "lite":
        setup_lite()


# ---- controller: while a 3D anatomy card is up, the d-pad turns the model (held = keeps
# turning) and the remote's +/− zoom it, instead of their usual jobs.
def showing():
    try:
        return (mw.state == "review" and mw.reviewer.card is not None
                and mw.reviewer.card.note_type()["name"] in (MODEL_NAME, LITE["MODEL_NAME"]))
    except Exception:
        return False


def _js(code):
    try:
        mw.taskman.run_on_main(lambda: mw.reviewer.web.eval(code))
    except Exception:
        pass


def dpad_axis(usage, prev, cur):
    """HID d-pad axis edge (0x30 = X, 0x31 = Y; 0 / 127 / 255). Returns True when it was
    taken for a 3D card (any thread)."""
    if not showing():
        return False
    names = {0x30: ("ArrowLeft", "ArrowRight"), 0x31: ("ArrowUp", "ArrowDown")}.get(usage)
    if not names:
        return False
    ev = []
    if prev in (0, 255):
        ev.append((names[0 if prev == 0 else 1], "false"))
    if cur in (0, 255):
        ev.append((names[0 if cur == 0 else 1], "true"))
    if ev:
        _js("window.JKANAT&&JKANAT.input&&(" + ",".join(
            "JKANAT.input('key','%s',%s)" % e for e in ev) + ");")
    return True


def zoom(step):
    """Remote +/− on a 3D card: zoom the model. Returns True when taken (main thread)."""
    if not showing():
        return False
    try:
        mw.reviewer.web.eval("window.JKANAT&&JKANAT.input&&JKANAT.input('zoom',%d);" % (1 if step > 0 else -1))
    except Exception:
        pass
    return True


def _overview(overview, content):
    return _with(_variant_for_current(), _overview_one, overview, content)


def _on_js(handled, msg, context):
    if not isinstance(msg, str) or not msg.startswith("jka3d:"):
        return handled
    return _with(_variant_for_current(), _on_js_one, handled, msg, context)


def _hooks():
    from aqt import gui_hooks
    gui_hooks.overview_will_render_content.append(_overview)
    gui_hooks.card_will_show.append(_card_will_show)
    gui_hooks.webview_did_receive_js_message.append(_on_js)



def install():
    act = QAction("Janki: Set up 3D anatomy cards", mw)
    act.triggered.connect(choose_setup)
    mw.form.menuTools.addAction(act)
    try:
        _hooks()
    except Exception as e:
        log("anatomy3d hooks: %s" % e)
    # one-shot dev hook: ~/.janki_anat_setup runs setup at profile open, then is removed
    flag = os.path.expanduser("~/.janki_anat_setup")
    if os.path.exists(flag):
        from aqt import gui_hooks
        def _once():
            try:
                with open(flag) as f:
                    what = f.read().strip()   # "" = full setup, "lite" = Lite, "both" = full then Lite
                os.remove(flag)
            except OSError:
                what = ""
            if what in ("", "both"):
                setup()
            if what in ("lite", "both"):
                setup_lite()
        gui_hooks.profile_did_open.append(_once)
