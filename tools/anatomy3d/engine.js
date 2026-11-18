// Janki anatomy 3D engine: one three.js view per card (name / find / attach / nerve / peel).
// Models: glb whose nodes carry extras {n: structure name, l: layer}.
import './consolefix.js';   // first: AnkiMobile's console lacks error / warn
import * as THREE from 'three';
import SUPPLIES from './supplies.json';   // nerve → the muscle meshes it supplies (from the deck's Nerve fields)
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {computeBoundsTree, acceleratedRaycast} from 'three-mesh-bvh';
// BVH-accelerated raycasts (x-ray / dotted lines / picking test hundreds of thousands of triangles)
THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.Mesh.prototype.raycast = acceleratedRaycast;
const FADE_TOP = 0.09, FADE_BOT = 0.20;

const COL = {bone: 0xe9dfc6, muscle: 0xa8473f, nerve: 0xf0c541, vessel: 0xe3262c, vein: 0x2f6bff, ligament: 0xc3ccd6, capsule: 0xa9adb3};   // ligaments: cool silvery white, distinct from bone
const HL = 0x35c8ff, OK = 0x38d97a, BAD = 0xff5050, ORIG = 0xff9326, INS = 0xb46bff;
const REGIONS = {   // y-range (m) of the model kept in view
  hip: [0.62, 1.12], gluteal: [0.62, 1.12], thigh: [0.36, 1.0], knee: [0.3, 0.6],
  leg: [0.0, 0.5], foot: [-0.02, 0.14], limb: [-0.05, 1.12],
  shoulder: [1.15, 1.5], plexus: [1.2, 1.53], arm: [1.0, 1.45], elbow: [0.95, 1.2], forearm: [0.66, 1.15], wrist: [0.66, 0.95], hand: [0.64, 0.92], 'upper limb': [0.66, 1.5]};
// CT context: a shared trunk model (spine, rib cage, heart, lungs, organs) sliced into the CT
// panes listed here, around the limb. Add planes ('axial', 'sagittal') or swap the model to extend.
const CT_CONTEXT = {model: '_jk3d_trunk8.glb', planes: ['coronal', 'axial', 'sagittal']};
const DIRS = {anterior: [0, 0, 1], posterior: [0, 0, -1], lateral: [-1, 0, 0], medial: [1, 0, 0],
  superior: [0, 1, 0.001], inferior: [0, -1, 0.001]};

const cache = {};
function load(url) {
  if (!cache[url]) cache[url] = new Promise((res, rej) => {
    fetch(url).then(r => { if (!r.ok) throw r.status; return r.arrayBuffer(); })
      .then(buf => new GLTFLoader().parse(buf, '', g => res(g.scene), rej)).catch(rej);
  });
  return cache[url];
}
let live = null;

// Free orbit: drag rotates about the screen axes (so the view can go over the top / under
// the bottom — no pole stop), with inertia, a turntable auto-spin about the body's long
// axis, and a weak pull toward the six straight anatomical views when the view is close.
const AXES6 = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]].map(v => new THREE.Vector3(...v));
function upFor(d) {   // natural "up" for a view direction
  if (Math.abs(d.y) > 0.92) return new THREE.Vector3(0, 0, d.y > 0 ? -1 : 1);   // from above: anterior down… flip below
  return new THREE.Vector3(0, 1, 0);
}
class FreeOrbit {
  constructor(cam, el) {
    this.cam = cam; this.el = el; this.target = new THREE.Vector3();
    this.autoRotate = false; this.autoRotateSpeed = 1.2; this.vx = 0; this.vy = 0;
    this.drag = null; this.ls = []; this.snapOn = true; this.turntable = false;
    // virtual trackball (Shoemake arcball): the pointer is mapped onto a
    // ball under the model; the drag turns the ball from the old point to the new one. Near
    // the middle that tumbles the model, around the rim it rolls it about the view axis.
    this.ball = (x, y) => {
      const r = el.getBoundingClientRect(), R = 0.38 * Math.min(r.width, r.height);
      const nx = (x - r.left - r.width / 2) / R, ny = -(y - r.top - r.height / 2) / R, d = nx * nx + ny * ny;
      if (d >= 1) return new THREE.Vector3(nx, ny, 0).normalize();   // outside the ball: on its rim → pure roll
      const z = Math.sqrt(1 - d);
      return new THREE.Vector3(nx, ny, z).normalize();
    };
    el.addEventListener('pointerdown', ev => {
      if (ev.button !== 0 || ev.shiftKey) return;
      this.drag = {t: performance.now(), x: ev.clientX, y: ev.clientY}; this.spin = null; this.vo = null;
      try { el.setPointerCapture(ev.pointerId); } catch (x) {}
    });
    el.addEventListener('pointermove', ev => {
      if (!this.drag || this.multi) return;
      if (this.turntable) {   // X-ray: only turn about the limb's long axis, view stays level
        const now = performance.now(), dt = Math.max(1, now - this.drag.t), a = -(ev.clientX - this.drag.x) * 0.008;
        this.turn(new THREE.Vector3(0, 1, 0), a); this.spin = {axis: new THREE.Vector3(0, 1, 0), w: a / dt * 16};
        this.drag.x = ev.clientX; this.drag.t = now; return;
      }
      // orbit (turntable): left / right turns about the long axis, up / down tips the view —
      // it stops just short of straight above / below and the limb stays upright
      const now = performance.now(), dt = Math.max(1, now - this.drag.t);
      const dx = ev.clientX - this.drag.x, dy = ev.clientY - (this.drag.y == null ? ev.clientY : this.drag.y);
      this.drag.x = ev.clientX; this.drag.y = ev.clientY; this.drag.t = now;
      this.orbit(dx * 0.008, dy * 0.008); this.vo = [dx * 0.008 / dt * 16, dy * 0.008 / dt * 16];
    });
    const up = () => { if (this.drag && performance.now() - this.drag.t > 80) { this.spin = null; this.vo = null; } this.drag = null; };
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
  }
  addEventListener(t, f) { if (t === 'change') this.ls.push(f); }
  emit() { this.ls.forEach(f => f()); }
  orbit(ax, ay) {           // azimuth about world up, elevation clamped short of the poles
    const off = this.cam.position.clone().sub(this.target), L = off.length();
    let az = Math.atan2(off.x, off.z) - ax, el = Math.asin(Math.max(-1, Math.min(1, off.y / L)));
    if (!this.turntable) el = Math.max(-1.45, Math.min(1.45, el + ay)); else el = 0;
    off.set(Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el)).multiplyScalar(L);
    this.cam.position.copy(this.target).add(off); this.cam.up.set(0, 1, 0); this.cam.lookAt(this.target); this.emit();
  }
  rotate(ax, ay) { this.orbit(ax, ay); }
  rotateFree(ax, ay) {      // (unused: the old free trackball rotation)
    if (this.turntable) { this.turn(new THREE.Vector3(0, 1, 0), -ax); return; }
    const c = this.cam, off = c.position.clone().sub(this.target);
    const upS = c.up.clone(), right = new THREE.Vector3().crossVectors(upS, off).normalize();
    const q = new THREE.Quaternion().setFromAxisAngle(upS, -ax)
      .multiply(new THREE.Quaternion().setFromAxisAngle(right, -ay));
    off.applyQuaternion(q); c.up.applyQuaternion(q).normalize();
    // keep "up" exactly perpendicular to the view
    const f = off.clone().normalize(); c.up.sub(f.multiplyScalar(c.up.dot(off.clone().normalize()))).normalize();
    c.position.copy(this.target).add(off); c.lookAt(this.target); this.emit();
  }
  turn(axis, a) {          // rotate the camera about the target around a world axis
    const q = new THREE.Quaternion().setFromAxisAngle(axis, a);
    const off = this.cam.position.clone().sub(this.target).applyQuaternion(q);
    this.cam.up.applyQuaternion(q).normalize(); this.cam.position.copy(this.target).add(off);
    this.cam.lookAt(this.target); this.emit();
  }
  level() {                 // view horizontal, limb upright (keeps the current heading)
    const off = this.cam.position.clone().sub(this.target), L = off.length();
    const h = new THREE.Vector3(off.x, 0, off.z); if (h.lengthSq() < 1e-8) h.set(0, 0, 1);
    return {p1: this.target.clone().addScaledVector(h.normalize(), L), u1: new THREE.Vector3(0, 1, 0)};
  }
  roll(a) {                 // turn the picture about the view axis (screen clockwise for a > 0)
    const off = this.cam.position.clone().sub(this.target).normalize();
    this.cam.up.applyQuaternion(new THREE.Quaternion().setFromAxisAngle(off, a)).normalize();
    this.cam.lookAt(this.target); this.emit();
  }
  update(dt) {
    let changed = false;
    if (!this.drag && this.vo && Math.hypot(this.vo[0], this.vo[1]) > 1e-4) {   // inertia
      const k = Math.min(1, (dt || 1 / 60) * 60);
      this.orbit(this.vo[0] * k, this.vo[1] * k); const dcy = Math.pow(0.86, k); this.vo[0] *= dcy; this.vo[1] *= dcy; changed = true;
    } else if (this.autoRotate && !this.drag) {
      const a = 2 * Math.PI / 60 * this.autoRotateSpeed * (dt || 1 / 60);
      const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), a);
      const off = this.cam.position.clone().sub(this.target).applyQuaternion(q);
      this.cam.up.applyQuaternion(q); this.cam.position.copy(this.target).add(off); this.cam.lookAt(this.target);
      this.emit(); changed = true;
    } else if (this.snapOn && !this.drag && dt) {
      // weak gravity toward a straight view within ~14°, and "up" toward that view's natural up
      const off = this.cam.position.clone().sub(this.target), d = off.clone().normalize();
      let best = null, bd = -1; AXES6.forEach(a => { const v = a.dot(d); if (v > bd) { bd = v; best = a; } });
      if (bd > Math.cos(14 * Math.PI / 180) && bd < 0.99999 && Math.abs(best.y) < 0.5) {
        const k = 1 - Math.exp(-dt * 3.5);
        const nd = d.clone().lerp(best, k).normalize();
        const nu = new THREE.Vector3(0, 1, 0);
        this.cam.position.copy(this.target).addScaledVector(nd, off.length());
        nu.sub(nd.clone().multiplyScalar(nu.dot(nd))).normalize(); this.cam.up.copy(nu);
        this.cam.lookAt(this.target); this.emit(); changed = true;
      }
    }
    if (!changed) this.cam.lookAt(this.target);
  }
}   // the one view on the page (Anki swaps front → back in place)

function dir(spec, mirror) {
  const v = new THREE.Vector3();
  String(spec || 'anterior').toLowerCase().split(/[\s,+-]+/).forEach(w => {
    const k = Object.keys(DIRS).find(d => w && d.startsWith(w.replace(/^antero/, 'anterior').replace(/^postero/, 'posterior')));
    if (k) v.add(new THREE.Vector3(...DIRS[k]));
    if (w === 'anterolateral') v.add(new THREE.Vector3(-0.7, 0, 0.7));
    if (w === 'posterolateral') v.add(new THREE.Vector3(-0.7, 0, -0.7));
    if (w === 'anteromedial') v.add(new THREE.Vector3(0.7, 0, 0.7));
    if (w === 'posteromedial') v.add(new THREE.Vector3(0.7, 0, -0.7));
  });
  if (v.lengthSq() < 1e-6) v.set(0, 0, 1);
  // "+30" / "-20": tilt the view up / down by that many degrees (from the horizontal heading)
  const el = String(spec || '').match(/([+-]\d+)\s*$/);
  if (el) { const h = new THREE.Vector3(v.x, 0, v.z); if (h.lengthSq() < 1e-6) h.set(0, 0, 1); h.normalize();
    const a = THREE.MathUtils.degToRad(+el[1]); v.copy(h.multiplyScalar(Math.cos(a))).setY(Math.sin(a)); }
  if (mirror) v.x = -v.x;   // left limb: lateral is +x
  return v.normalize();
}
const norm = s => String(s || '').toLowerCase().replace(/\s+/g, ' ').trim();
function names(s) { return String(s || '').split(/[\n,;]+/).map(x => x.trim()).filter(Boolean); }

function mount(root, cfg) {
  if (live) live.stop();
  // Lite deck (slower devices): simplified models ("…_lite.glb"), 1× pixels, no anti-aliasing, lite CT context
  const LITE = /_lite\.glb(\?|$)/.test(String(cfg.model || ''));
  const ctxModel = LITE ? CT_CONTEXT.model.replace(/\.glb$/, '_lite.glb') : CT_CONTEXT.model;
  root.innerHTML = '';
  root.style.removeProperty('display');
  // recall cards (attachments / innervation / action): the model is on the front only the
  // first time; once the answer has been seen, the front is just the question
  // recall cards (attachments / innervation / key facts): the model on the front is set on the
  // deck overview — show / hide / adaptive (shown while the card is young: interval < 1 day on
  // desktop, which passes the interval in; elsewhere until its answer has been seen once)
  if (/^(attach|nerve|action)$/.test(cfg.mode)) {
    const seenKey = 'jka-seen:' + cfg.mode + ':' + (cfg.name || cfg.meshes);
    let seen = false; try { seen = localStorage.getItem(seenKey) === '1'; } catch (x) {}
    const fm = cfg.front || 'adaptive', ivl = (typeof cfg.ivl === 'number') ? cfg.ivl : (typeof window.__jkaIvl === 'number' ? window.__jkaIvl : null);
    if (cfg.side === 'back') { try { localStorage.setItem(seenKey, '1'); } catch (x) {} }
    else if (fm === 'hide' || (fm === 'adaptive' && (ivl != null ? ivl >= 1 : seen))) { root.style.display = 'none'; return; }
  }
  // scroll-locked card: undo any scroll (Anki scrolls to the answer on flip)
  const unscroll = () => [document.scrollingElement, document.getElementById('jk-sc')].forEach(el => {
    if (el && el.scrollTop) el.scrollTop = 0; });
  unscroll(); [50, 200, 600].forEach(ms => setTimeout(unscroll, ms));
  root.classList.add('jka');
  // CT remembered on: hide the 3D model from the first frame (no flash of it before CT draws),
  // and no answer-side slide (CSS keys off this class)
  let ctPre = false; try { ctPre = localStorage.getItem('jka-ct') === '1'; } catch (x) {}
  root.classList.toggle('jka-ctpre', ctPre);
  // X-ray / CT open framed (a hard film edge): no slide-in on the answer, or that edge visibly moves
  let radPre = !!cfg.xray; try { radPre = radPre || localStorage.getItem('jka-rad') === '1'; } catch (x) {}
  const slideBox = root.closest('.jka-left');
  if (slideBox && ctPre) slideBox.style.animation = 'none';
  else if (slideBox && radPre) slideBox.style.animation = 'jka-shrink .5s cubic-bezier(.2, .8, .2, 1) both';   // left edge fixed, right edge to the midline
  const wrap = document.createElement('div'); wrap.className = 'jka-wrap'; root.appendChild(wrap);
  const msg = document.createElement('div'); msg.className = 'jka-msg'; msg.textContent = 'Loading model…';
  wrap.appendChild(msg);
  // one renderer for the whole review session: a new card reuses it (shaders compiled and model
  // geometry already on the GPU), so question → answer and card → card don't rebuild everything
  let renderer;
  try {
    const R = window.__jkaR;
    if (R && R.getContext() && !R.getContext().isContextLost()) {
      renderer = R; renderer.setRenderTarget(null); renderer.autoClear = true; renderer.setClearColor(0x000000, 0);
      renderer.domElement.removeAttribute('style'); renderer.domElement.className = '';
    } else { renderer = new THREE.WebGLRenderer({antialias: !LITE, alpha: true}); window.__jkaR = renderer; }
  } catch (e) { msg.textContent = '3D needs WebGL, which is off in this Anki.'; return; }
  // listeners this view puts on the shared canvas are removed when it goes (else an old card's
  // handlers would keep reacting)
  const cvEvs = [], cvEl = renderer.domElement, ET = EventTarget.prototype;
  cvEl.addEventListener = function (t, f, o) { ET.addEventListener.call(cvEl, t, f, o); cvEvs.push([t, f, o]); };
  const viewDisp = [];   // per-view GPU resources (render targets) to free on stop
  const DPR = LITE ? 1 : Math.min(2, window.devicePixelRatio || 1), DPR_MOVE = Math.min(DPR, 1);
  renderer.setPixelRatio(DPR);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  wrap.appendChild(renderer.domElement);
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); svg.setAttribute('class', 'jka-lines');
  wrap.appendChild(svg);
  let stopped = false;
  const view = {stop() { stopped = true;
    cvEvs.forEach(([t, f, o]) => { try { ET.removeEventListener.call(cvEl, t, f, o); } catch (x) {} }); cvEvs.length = 0;
    viewDisp.forEach(d => { try { d.dispose(); } catch (x) {} }); viewDisp.length = 0; }};
  live = view;

  load(cfg.model).then(src => {
    if (stopped) return;
    try { build(src); msg.remove(); }
    catch (x) { msg.textContent = '3D view error: ' + (x && x.message || x) + (x && x.stack ? ' — ' + String(x.stack).split('\n').slice(0, 2).join(' | ') : ''); }
  }).catch(e => { msg.textContent = 'Could not load ' + cfg.model + ' (' + e + '). Run Tools → Janki: Set up 3D anatomy.'; });

  function build(src) {
    const TB = window.__jkaT = {t0: performance.now()}; const mark = k => { TB[k] = Math.round(performance.now() - TB.t0); };
    const scene = new THREE.Scene();
    scene.add(new THREE.HemisphereLight(0xffffff, 0x404050, 1.6));
    const key = new THREE.DirectionalLight(0xffffff, 1.4); scene.add(key);
    const model = src.clone(true); scene.add(model);
    // which side: the model is a right limb; a left one is its mirror image. Card field
    // Limb = right / left / either (default: either, picked per review — front and back agree)
    const lk = cfg.mode + '|' + cfg.name + '|' + cfg.meshes;
    let limb = String(cfg.limb || '').toLowerCase();
    if (limb !== 'left' && limb !== 'right') {
      const kept = window.__jkaLimb;
      limb = cfg.side === 'back' && kept && kept.key === lk ? kept.limb : (Math.random() < 0.5 ? 'left' : 'right');
    }
    if (cfg.side !== 'back') window.__jkaLimb = {key: lk, limb};
    const left = limb === 'left';
    if (left) model.scale.x = -1;
    model.updateMatrixWorld(true);
    const parts = [];   // {mesh, name, layer, box}
    model.traverse(o => {
      if (!o.isMesh) return;
      const ex = o.userData || {};
      const name = ex.n || o.name, layer = ex.l || 'muscle';
      const base = (layer === 'vein' || (layer === 'vessel' && /vein/i.test(name))) ? COL.vein : COL[layer] || 0x999999;
      o.material = LITE   // Lite: per-vertex Lambert shading (far cheaper per pixel, esp. on software GL)
        ? new THREE.MeshLambertMaterial({color: base, emissive: layer === 'nerve' ? 0x302400 : 0x000000})
        : new THREE.MeshStandardMaterial({color: base, roughness: layer === 'bone' ? 0.85 : 0.6,
        metalness: 0, emissive: layer === 'nerve' ? 0x302400 : 0x000000});
      o.userData.base = base;
      parts.push({mesh: o, name, key: norm(name), layer, box: new THREE.Box3().setFromObject(o)});
    });
    (function bvh(i) {     // shared geometry: built once per model, in small idle chunks
      const t0 = performance.now();
      for (; i < parts.length && performance.now() - t0 < 8; i++) {
        const g = parts[i].mesh.geometry; if (!g.boundsTree) try { g.computeBoundsTree(); } catch (x) {}
      }
      if (i < parts.length && !stopped) setTimeout(() => bvh(i), 0); else setTimeout(() => { dirty = true; checksDue = true; }, 0);
    })(0);
    const byName = n => { const k = norm(n); return parts.filter(p => p.key === k || p.key === k + ' muscle'); };
    const target = [].concat(...names(cfg.meshes).map(byName));
    const nerve = [].concat(...names(cfg.nerve).map(byName));
    const peel = (cfg.peel || []).map(g => [].concat(...names(g).map(byName)));
    const back = cfg.side === 'back';
    let mode = cfg.mode;
    const isNerve = target.length && target.every(p => p.layer === 'nerve' || p.layer === 'vessel' || p.layer === 'vein');   // thin structures: muscles see-through
    if (isNerve && mode === 'name') mode = 'nerveid';

    // ---- what is in view ----
    let yr = REGIONS[norm(cfg.region)] || null;
    const tbox = new THREE.Box3();
    (target.length ? target : nerve).forEach(p => tbox.union(p.box));
    // ---- bony landmarks: a point found on the bone from its shape (no separate mesh exists) ----
    // medial = toward the midline (+x on a right limb), anterior = +z, up = +y
    // Each landmark = maximise a measure f over a candidate part of the bone; the point is the
    // best vertex, and the highlighted patch is every surface point within `tol` of that best
    // value (so it follows the prominence / socket / ridge, not a circle).
    const UL = UL_SPECS();
    mark('parts');
    const LMdef = cfg.landmark ? (UL[String(cfg.landmark).toLowerCase().trim()] ? ulCached(String(cfg.landmark).toLowerCase().trim()) : landmarkDef(cfg.landmark)) : null;
    // the question and answer are separate views: the answer reuses the question's patch
    function ulCached(key) {
      const LMC = window.__jkaLMC = window.__jkaLMC || new Map();
      const k = cfg.model + '|' + key + '|' + cfg.meshes + '|' + (left ? 'L' : 'R'), c = LMC.get(k);
      if (c) {
        target.forEach(p => { const sg = p.mesh.geometry.userData.jkaSubG;
          if (sg) { const old = p.mesh.geometry; p.mesh.geometry = sg; p.mesh.userData.coarse = old;
            parts.forEach(q => { if (q.mesh.geometry === old) { q.mesh.geometry = sg; q.mesh.userData.coarse = old; } }); } });
        const W = new Map(); target.forEach((p, i) => { const w = c.W[i]; if (w && w.length === p.mesh.geometry.attributes.position.count) W.set(p, w); });
        if (W.size === c.n) return {pt: c.pt, pts: c.pts, W, sphere: c.sphere, ivf: c.ivf};
      }
      const r = ulLandmark(key);
      if (r) { LMC.set(k, {pt: r.pt, pts: r.pts, sphere: r.sphere, ivf: r.ivf, n: r.W.size, W: target.map(p => r.W.get(p) || null)});
        if (LMC.size > 40) LMC.delete(LMC.keys().next().value); }
      return r;
    }
    const LM = LMdef ? LMdef.pt : null;
    const lmPts = !LMdef ? [] : LMdef.pts ? LMdef.pts.slice() : (() => { const a = [];
      target.forEach(p => eachVert(p.mesh, v => { if (LMdef.inPatch(v) && LMdef.soft(v) > 0.3) a.push(v.clone()); })); return a; })();
    try { document.documentElement.setAttribute('data-jkalm', LMdef ? (LMdef.pts ? LMdef.pts.length : 'old') : 'none'); } catch (x) {}
    // ---- spec-driven landmarks (upper limb): each spec picks surface points of the bone by
    // band along its length (b), facing (f), side (sm/sa) and one rule (k):
    //   ext = most extreme toward d · ridge = per-slice extreme · cav = concavity · band = all
    //   sphere = fitted ball (heads) · contact = touching another bone · custom ones below.
    // Frame: m = medial (toward the midline), u = up, a = anterior. t: 0 = distal end, 1 = proximal.
    function UL_SPECS() {
      const H = {
        'scapula: acromion': {k: 'ext', d: [-0.7, 0.7, 0.1], tol: 0.02, reach: 0.04},
        'scapula: coracoid process': {k: 'ext', d: [0.1, 0.15, 1], tol: 0.012, reach: 0.03},
        'scapula: spine': {k: 'ridge', bin: 'm', d: [0, 0.15, -1], b: [0.45, 0.98], sm: [0, 0.86], tol: 0.005},
        'scapula: supraspinous fossa': {k: 'spinefossa', up: true},
        'scapula: infraspinous fossa': {k: 'spinefossa', up: false},
        'scapula: subscapular fossa': {k: 'band', b: [0.04, 0.84], f: [0.4, 0, 1, 0.45]},
        'scapula: scapular notch': {k: 'contact', o: ['Suprascapular nerve'], dist: 0.008, grow: 0.004, b: [0.8, 1], top: 0.018},   // where the suprascapular nerve crosses the superior border (not the spinoglenoid notch lower down)
        'scapula: glenoid cavity': {k: 'ext', d: [-1, 0, 0], b: [0.62, 0.86], f: [-1, 0, 0, 0.45], tol: 0.007, reach: 0.025},
        'scapula: supraglenoid tubercle': {k: 'glenoidend', up: true},
        'scapula: infraglenoid tubercle': {k: 'glenoidend', up: false},
        'scapula: medial border': {k: 'ridge', bin: 'y', d: [1, 0, 0], b: [0.05, 0.85], tol: 0.005},
        'scapula: superior angle': {k: 'ext', d: [0.8, 1, 0], tol: 0.006, reach: 0.02},
        'scapula: inferior angle': {k: 'ext', d: [0, -1, 0], tol: 0.006, reach: 0.02},
        'clavicle: acromial end': {k: 'band', ax: 'lat', b: [0, 0.12]},
        'clavicle: shaft': {k: 'band', ax: 'lat', b: [0.25, 0.75]},
        'clavicle: sternal end': {k: 'band', ax: 'lat', b: [0.88, 1]},
        'clavicle: conoid tubercle': {k: 'ext', ax: 'lat', d: [0, -1, -0.4], b: [0.12, 0.38], tol: 0.005, reach: 0.016},
        'clavicle: sternal articular surface': {k: 'ext', ax: 'lat', d: [1, 0, 0], f: [1, 0, 0, 0.2], tol: 0.004, reach: 0.02},
        'humerus: head': {k: 'sphere', d: [1, 0.7, -0.4], b: [0.8, 1], seedR: 0.022, tol: 0.003, reach: 0.05},
        'humerus: greater tubercle': {k: 'ext', d: [-1, 0.2, 0.15], b: [0.82, 0.97], tol: 0.01, reach: 0.025},
        'humerus: lesser tubercle': {k: 'ext', d: [0.25, 0, 1], b: [0.78, 0.9], tol: 0.004, reach: 0.015},
        'humerus: intertubercular groove': {k: 'spiral', b: [0.72, 0.9], phi: [2.7, 2.7], w: 0.22},
        'humerus: anatomical neck': {k: 'capedge', ref: 'humerus: head', b: [0.75, 1]},   // the articular cap's margin (a ring round the head's axis)
        'humerus: surgical neck': {k: 'band', b: [0.76, 0.82]},
        'humerus: deltoid tuberosity': {k: 'ext', d: [-1, 0, 0.35], b: [0.45, 0.65], tol: 0.003, reach: 0.03},
        'humerus: radial groove': {k: 'spiral', b: [0.36, 0.64], phi: [0.1, 1.5], w: 0.3},   // winds from posterior (top) to lateral (bottom)
        'humerus: capitulum': {k: 'band', b: [0, 0.07], sm: [0.1, 0.4], f: [0, -0.5, 1, 0.25]},
        'humerus: trochlea': {k: 'band', b: [0, 0.075], sm: [0.38, 0.78], f: [0, -1, 0, -0.5]},
        'humerus: medial epicondyle': {k: 'ext', d: [1, 0, 0], b: [0.02, 0.16], tol: 0.007, reach: 0.02},
        'humerus: lateral epicondyle': {k: 'ext', d: [-1, 0, 0], b: [0.02, 0.16], tol: 0.005, reach: 0.018},
        'humerus: medial supracondylar ridge': {k: 'ridge', bin: 'y', d: [1, 0, 0], b: [0.12, 0.32], tol: 0.004},
        'humerus: lateral supracondylar ridge': {k: 'ridge', bin: 'y', d: [-1, 0, 0], b: [0.12, 0.35], tol: 0.004},
        'humerus: radial fossa': {k: 'above', ref: 'humerus: capitulum', b: [0.07, 0.125], f: [0, 0, 1, 0.35], w: 0.08},   // lateral: just above the capitulum (small)
        'humerus: coronoid fossa': {k: 'above', ref: 'humerus: trochlea', b: [0.075, 0.14], f: [0, 0, 1, 0.35], w: 0.12},   // medial: just above the trochlea (larger)
        'humerus: olecranon fossa': {k: 'cav', b: [0.05, 0.2], f: [0, 0, -1, 0.4], sm: [0.25, 0.75], thr: 0.18, reach: 0.022},   // posterior, the deepest and largest
        'humerus: groove for ulnar nerve': {k: 'contact', o: ['Ulnar nerve'], dist: 0.009, grow: 0.005, b: [0, 0.2]},   // where the ulnar nerve lies, behind the medial epicondyle
        'radius: head': {k: 'band', b: [0.94, 1]},
        'radius: neck': {k: 'band', b: [0.87, 0.935]},
        'radius: radial tuberosity': {k: 'ext', d: [0.8, 0, 0.5], b: [0.76, 0.88], tol: 0.003, reach: 0.014},
        'radius: interosseous border': {k: 'ridge', bin: 'y', d: [1, 0, 0], b: [0.2, 0.75], tol: 0.0035},
        'radius: dorsal tubercle': {k: 'ext', d: [0, 0, -1], b: [0.04, 0.14], tol: 0.0015, reach: 0.008},
        'radius: styloid process': {k: 'ext', d: [-0.7, -1, 0], b: [0, 0.15], tol: 0.006, reach: 0.014},
        'radius: carpal articular surface': {k: 'contact', o: ['Scaphoid bone', 'Lunate bone'], dist: 0.004, grow: 0.003, b: [0, 0.1]},
        'ulna: olecranon': {k: 'ext', d: [0, 1, -0.7], b: [0.85, 1], tol: 0.01, reach: 0.022},
        'ulna: trochlear notch': {k: 'contact', o: ['Humerus'], dist: 0.005, grow: 0.004, b: [0.8, 1]},
        'ulna: coronoid process': {k: 'ext', d: [0, 0, 1], b: [0.8, 0.95], tol: 0.005, reach: 0.012},
        'ulna: radial notch': {k: 'contact', o: ['Radius'], dist: 0.004, grow: 0.003, b: [0.8, 1]},
        'ulna: ulnar tuberosity': {k: 'ext', d: [0, -0.2, 1], b: [0.74, 0.84], tol: 0.003, reach: 0.012},
        'ulna: styloid process': {k: 'ext', d: [0.2, -1, -0.3], b: [0, 0.12], tol: 0.004, reach: 0.01},
        'ulna: head': {k: 'band', b: [0.02, 0.1]},
        'trapezium: tubercle': {k: 'ext', d: [0, 0, 1], tol: 0.002, reach: 0.008},
        'hamate: hook': {k: 'ext', d: [0, 0, 1], tol: 0.003, reach: 0.01},
        'hand: head': {k: 'band', ax: 'pca', each: true, b: [0, 0.2]},
        'hand: shaft': {k: 'band', ax: 'pca', each: true, b: [0.3, 0.72]},
        'hand: base': {k: 'band', ax: 'pca', each: true, b: [0.8, 1]},
        'hand: distal tuberosity': {k: 'band', ax: 'pca', each: true, b: [0, 0.25], f: [0, 0, 1, -0.2]},
        'hand: sesamoids': {k: 'band', ax: 'pca', each: true, b: [0, 0.25], f: [0, 0, 1, 0.3]},
        'hand: distal transverse crease': {k: 'band', ax: 'pca', each: true, b: [0, 0.24], f: [0, 0, 1, 0.3]},
        'hand: proximal transverse crease': {k: 'band', ax: 'pca', each: true, b: [0.25, 0.5], f: [0, 0, 1, 0.3]},
        'tendon: distal': {k: 'band', b: [0, 0.4]},
        'tendon: distal long': {k: 'band', b: [0, 0.55]},
        'muscle: first dorsal interosseous': {k: 'ext', d: [-1, 0, 0], tol: 0.014, reach: 0.03},
        'muscle: lumbricals radial': {k: 'ext', d: [-1, 0, 0], tol: 0.034, reach: 0.06},
        'muscle: lumbricals ulnar': {k: 'ext', d: [1, 0, 0], tol: 0.036, reach: 0.06},
        // ---- vertebrae: located relative to the vertebral foramen of each vertebra (k: 'vert') ----
        'vertebra: body': {k: 'vert', part: 'body'}, 'vertebra: arch': {k: 'vert', part: 'arch'},
        'vertebra: pedicle': {k: 'vert', part: 'pedicle'}, 'vertebra: lamina': {k: 'vert', part: 'lamina'},
        'vertebra: foramen': {k: 'vert', part: 'foramen'}, 'vertebra: superior notch': {k: 'vert', part: 'supnotch'},
        'vertebra: inferior notch': {k: 'vert', part: 'infnotch'}, 'vertebra: spinous process': {k: 'vert', part: 'spinous'},
        'vertebra: superior articular process': {k: 'vert', part: 'supart'}, 'vertebra: inferior articular process': {k: 'vert', part: 'infart'},
        'vertebra: pars interarticularis': {k: 'vert', part: 'pars'}, 'vertebra: transverse process': {k: 'vert', part: 'transverse'},
        'cervical: transverse process': {k: 'vert', part: 'transverse', xr: [1.4, 9], zr: [-0.6, 1.6]},
        'cervical: transverse foramen': {k: 'vert', part: 'transforamen'},
        'atlas: posterior arch': {k: 'vert', part: 'arch', zr: [-9, -0.35]},
        'atlas: anterior tubercle': {k: 'ext', d: [0, 0, 1], tol: 0.003, reach: 0.01},
        'axis: dens': {k: 'vert', part: 'dens'},
        'thoracic: superior costal facet': {k: 'vert', part: 'contact', o: ['Sixth rib.l', 'Sixth rib.r'], zr: [0.2, 9], tb: [0.45, 1]},
        'thoracic: inferior costal facet': {k: 'vert', part: 'contact', o: ['Seventh rib.l', 'Seventh rib.r'], zr: [0.2, 9], tb: [0, 0.55]},
        'thoracic: transverse costal facet': {k: 'vert', part: 'contact', o: ['Sixth rib.l', 'Sixth rib.r'], xr: [1.4, 9], zr: [-9, 0.4]},
        'vertebra: intervertebral foramen': {k: 'vert', part: 'ivf'},
        // ---- lower limb (same frame: m medial, u up, a anterior) ----
        // femur, proximal end: a sphere fitted to the head; neck / intertrochanteric line + crest
        // are shells around its centre (neck = head margin outwards; line / crest = the neck's base)
        'femur: head': {k: 'sphere', d: [1, 0.6, 0], b: [0.85, 1], seedR: 0.016, tol: 0.003, reach: 0.06},
        'neck': {k: 'shell', ref: 'femur: head', r0: 0.0015, r1: 0.017, b: [0.82, 1]},
        'femur: intertrochanteric line': {k: 'shell', ref: 'femur: head', r0: 0.021, r1: 0.029, b: [0.8, 0.97], f: [0, 0, 1, 0.35]},
        'femur: intertrochanteric crest': {k: 'shell', ref: 'femur: head', r0: 0.022, r1: 0.031, b: [0.8, 0.97], f: [0, 0, -1, 0.35]},
        'iliac crest': {k: 'crest', tol: 0.0065},   // ASIS → PSIS along the top of the ilium
        'intercondylar fossa': {k: 'cav', b: [0, 0.08], f: [0, -0.3, -1, 0.1], sm: [0.3, 0.7], thr: 0.25, reach: 0.022},
        'patellar surface': {k: 'band', b: [0.015, 0.09], f: [0, 0, 1, 0.45], sm: [0.15, 0.85]},
        'femur: patellar surface': {k: 'band', b: [0.015, 0.09], f: [0, 0, 1, 0.45], sm: [0.15, 0.85]},
        // ilium / ischium / pubis meet in a Y inside the acetabulum (the femoral head's centre):
        // ilium above it, ischium behind-below, pubis in front-below
        'hip: ilium': {k: 'hippart', part: 'ilium'},
        'hip: ischium': {k: 'hippart', part: 'ischium'},
        'hip: pubis': {k: 'hippart', part: 'pubis'},
        'hip: superior pubic ramus': {k: 'band', b: [0.22, 0.45], sa: [0.55, 1], sm: [0.45, 0.92]},
        'hip: inferior pubic ramus': {k: 'band', b: [0.04, 0.25], sm: [0.6, 1], sa: [0.35, 0.85]},
        'hip: symphyseal surface': {k: 'ext', d: [1, 0, 0], f: [1, 0, 0, 0.4], tol: 0.004, reach: 0.03},
        'hip: pectineal line': {k: 'brim', seg: 'pecten', w: 0.003},   // the brim's pubic part: iliopubic eminence → pubic tubercle
        'hip: arcuate line': {k: 'brim', w: 0.0035},   // pelvic brim on the ilium: sacro-iliac joint → iliopubic eminence
        'hip: obturator foramen': {k: 'hole', b: [0, 0.45], outline: 'loop'},
        'hip: auricular surface': {k: 'contact', o: ['Sacrum'], dist: 0.006, grow: 0.004},
        'hip: iliac fossa': {k: 'brim', above: true, b: [0.5, 0.985], f: [1, 0.2, 0.3, 0.35]},
        'femur: trochanteric fossa': {k: 'cav', b: [0.88, 0.98], f: [0.5, 0, -1, 0], sm: [0, 0.5], thr: 0.2, reach: 0.02},
        'femur: gluteal tuberosity': {k: 'ridge', bin: 'y', d: [-0.6, 0, -1], b: [0.66, 0.85], tol: 0.0022},   // an elongated ridge below the greater trochanter
        'femur: popliteal surface': {k: 'band', b: [0.1, 0.25], f: [0, 0, -1, 0.5], sm: [0.2, 0.8]},   // above the condyles
        'tibia: medial plateau': {k: 'band', b: [0.96, 1], f: [0, 1, 0, 0.55], sm: [0.5, 1]},
        'tibia: lateral plateau': {k: 'band', b: [0.96, 1], f: [0, 1, 0, 0.55], sm: [0, 0.5]},
        'tibia: medial condyle': {k: 'band', b: [0.86, 0.99], sm: [0.52, 1]},
        'tibia: lateral condyle': {k: 'band', b: [0.86, 0.99], sm: [0, 0.48]},
        'tibia: soleal line': {k: 'spiral', b: [0.64, 0.86], phi: [0.9, -1.1], w: 0.2},   // upper third, from below the fibular facet
        'tibia: tibial tuberosity': {k: 'ext', d: [0, 0, 1], b: [0.8, 0.94], tol: 0.004, reach: 0.02},
        'tibia: medial malleolus': {k: 'ext', d: [1, -1, 0], b: [0, 0.1], tol: 0.008, reach: 0.02},
        'fibula: head': {k: 'band', b: [0.93, 1]},
        'fibula: neck': {k: 'band', b: [0.87, 0.93]},
        'fibula: lateral malleolus': {k: 'band', b: [0, 0.12]},
        'calcaneus: tuberosity': {k: 'ext', d: [0, 0, -1], tol: 0.01, reach: 0.025},
        'calcaneus: sustentaculum tali': {k: 'ext', d: [1, 0.3, 0], tol: 0.005, reach: 0.015},
        'hip: greater sciatic notch': {k: 'ridge', bin: 'y', d: [0.3, 0, -1], b: [0.33, 0.58], on: /^hip bone$/i, tol: 0.011, outline: 'arc'},
        'hip: lesser sciatic notch': {k: 'ridge', bin: 'y', d: [0.3, 0, -1], b: [0.17, 0.31], on: /^hip bone$/i, tol: 0.009, outline: 'arc'},
        'tibia: pes anserinus': {k: 'ext', d: [0.7, -0.2, 0.6], b: [0.8, 0.9], tol: 0.006, reach: 0.022},
        'muscle: obturator internus tendon': {k: 'ext', d: [-1, 0, 0], tol: 0.022, reach: 0.045},
        'space: femoral triangle': {k: 'band', ya: [0.79, 0.9]},
        'space: adductor canal': {k: 'band', ya: [0.55, 0.72]},
        'space: adductor hiatus': {k: 'band', ya: [0.5, 0.56]},
        // spinal cord / meninges (trunk model; levels from its own vertebrae)
        'cord: cervical enlargement': {k: 'band', ya: [1.435, 1.515]},     // ≈ C3–C7 vertebrae (cord reshaped in build_trunk)
        'cord: lumbosacral enlargement': {k: 'band', ya: [1.11, 1.215]},  // ≈ T11–L1 vertebrae, above the conus
        'cord: conus medullaris': {k: 'band', ya: [1.05, 1.11]},   // the cone, ending at L1–L2
        'cauda: filum terminale': {k: 'band', b: [0, 0.18]},
        'dura: dural sac': {k: 'band', ya: [0.918, 1.075]},   // below the conus (L2) to its blind end at S2
        'temporal: mastoid': {k: 'ext', each: true, d: [0, -1, -0.7], tol: 0.008, reach: 0.02},
        'vertebra: epidural': {k: 'vert', part: 'foramen', on: /^(vertebra|atlas|axis)/i},
        'muscle: gluteal fold': {k: 'ext', d: [0, -1, -0.3], tol: 0.012, reach: 0.09},
        'muscle: adductor part': {k: 'ext', d: [-0.6, 0.3, 0.6], tol: 0.05, reach: 0.25},
        'muscle: hamstring part': {k: 'ext', d: [0.7, 0, -0.7], tol: 0.03, reach: 0.45},   // the posteromedial strip, tuberosity to adductor tubercle
        // brachial plexus cords: not separate in the model — the top of the nerves they become
        'plexus: lateral cord': {k: 'band', ya: [1.352, 1.42]},
        'plexus: medial cord': {k: 'band', ya: [1.352, 1.42]},
        // parts of muscles / vessels / nerves standing in for structures the model lacks
        'tendon: proximal': {k: 'band', each: true, b: [0.86, 1]},
        'aponeurosis: palm': {k: 'band', ya: [0.785, 0.875]},   // the source mesh also sheathes the fingers
        'tendon: biceps long head': {k: 'band', b: [0.8, 1]},
        'tendon: expansion': {k: 'band', b: [0, 0.16]},
        'vessel: distal': {k: 'band', b: [0, 0.72]},
        'nerve: recurrent median': {k: 'ext', d: [-1, 0, 0.6], ya: [0.8, 0.87], tol: 0.006, reach: 0.02},
        'scaphoid: snuffbox': {k: 'ext', d: [-1, 0, -0.4], tol: 0.004, reach: 0.012},
      };
      return H;
    }
    function ulLandmark(key, onParts) {
      const S = UL[key]; if (!S) return null;
      const sg = left ? -1 : 1;
      const md = p => {   // per-mesh world positions, normals, neighbours, curvature (cached)
        if (p._md) return p._md;
        let g = p.mesh.geometry; if (!g.attributes.normal) g.computeVertexNormals();
        if (!g.userData.jkaSub && g.index && p.layer === 'bone') {   // bones only (muscles / vessels are fine as they are and far bigger): split edges > 2.5 mm (shape unchanged)
          const old = g;
          g = old.userData.jkaSubG || subdivide(old, 0.0025 / p.mesh.matrixWorld.getMaxScaleOnAxis()); g.userData.jkaSub = true;
          if (!old.userData.jkaSubG) { old.userData.jkaSubG = g; try { g.computeBoundsTree(); } catch (x) {} }   // kept for the next view (the answer side)
          p.mesh.geometry = g; p.mesh.userData.coarse = old;   // CT slices the coarse copy
          parts.forEach(q => { if (q.mesh.geometry === old) { q.mesh.geometry = g; q.mesh.userData.coarse = old; } });
        }
        const pos = g.attributes.position, nor = g.attributes.normal, n = pos.count;
        const P = new Float32Array(n * 3), N = new Float32Array(n * 3), v = new THREE.Vector3();
        const nm = new THREE.Matrix3().getNormalMatrix(p.mesh.matrixWorld);
        for (let i = 0; i < n; i++) {
          v.fromBufferAttribute(pos, i).applyMatrix4(p.mesh.matrixWorld); P[i * 3] = v.x; P[i * 3 + 1] = v.y; P[i * 3 + 2] = v.z;
          v.fromBufferAttribute(nor, i).applyMatrix3(nm).normalize(); N[i * 3] = v.x; N[i * 3 + 1] = v.y; N[i * 3 + 2] = v.z;
        }
        const nb = Array.from({length: n}, () => []), I = g.index ? g.index.array : null;
        if (I) for (let t = 0; t < I.length; t += 3) for (let e = 0; e < 3; e++) {
          const a = I[t + e], b = I[t + (e + 1) % 3]; nb[a].push(b); nb[b].push(a); }
        let K = new Float32Array(n);   // mean curvature: + = concave (pit / groove)
        for (let i = 0; i < n; i++) {
          const L = nb[i]; if (!L.length) continue; let lx = 0, ly = 0, lz = 0, e2 = 0;
          L.forEach(j => { const dx = P[j * 3] - P[i * 3], dy = P[j * 3 + 1] - P[i * 3 + 1], dz = P[j * 3 + 2] - P[i * 3 + 2];
            lx += dx; ly += dy; lz += dz; e2 += dx * dx + dy * dy + dz * dz; });
          K[i] = 2 * (lx * N[i * 3] + ly * N[i * 3 + 1] + lz * N[i * 3 + 2]) / Math.max(e2, 1e-12);
        }
        for (let it = 0; it < 6; it++) { const K2 = new Float32Array(n);
          for (let i = 0; i < n; i++) { let s = K[i], c = 1; nb[i].forEach(j => { s += K[j]; c++; }); K2[i] = s / c; } K = K2; }
        return (p._md = {n, P, N, nb, K});
      };
      const meshes = onParts || target;
      const vec = (D, i) => new THREE.Vector3(D.P[i * 3], D.P[i * 3 + 1], D.P[i * 3 + 2]);
      const dot3 = (D, i, d, arr) => sg * d[0] * arr[i * 3] + d[1] * arr[i * 3 + 1] + d[2] * arr[i * 3 + 2];
      const pointGrid = (pts, c) => { const G = new Map(); pts.forEach(q => { const k = Math.floor(q.x / c) + ',' + Math.floor(q.y / c) + ',' + Math.floor(q.z / c);
          (G.get(k) || G.set(k, []).get(k)).push(q); });
        return (q, d) => { const r = Math.ceil(d / c), x = Math.floor(q.x / c), y = Math.floor(q.y / c), z = Math.floor(q.z / c);
          for (let a = -r; a <= r; a++) for (let b = -r; b <= r; b++) for (let e = -r; e <= r; e++) {
            const L = G.get((x + a) + ',' + (y + b) + ',' + (z + e)); if (L) for (const w of L) if (w.distanceToSquared(q) < d * d) return true; }
          return false; }; };
      const W = new Map(); let best = null, bestS = -Infinity; const ivfInfo = {};
      const onM = S.on ? meshes.filter(p => S.on.test(p.name)) : meshes;
      const groups = S.each ? onM.map(p => [p]) : [onM];
      let sphere = null;
      groups.forEach(G => {
        const Ds = G.map(md);
        // t along the bone
        let tf;
        if (S.ax === 'lat') { let lo = 1e9, hi = -1e9; Ds.forEach(D => { for (let i = 0; i < D.n; i++) { const m = sg * D.P[i * 3]; lo = Math.min(lo, m); hi = Math.max(hi, m); } });
          tf = (D, i) => (sg * D.P[i * 3] - lo) / (hi - lo); }
        else if (S.ax === 'pca') {
          const c = new THREE.Vector3(); let cnt = 0; Ds.forEach(D => { for (let i = 0; i < D.n; i++) { c.add(vec(D, i)); cnt++; } }); c.multiplyScalar(1 / cnt);
          let ax = new THREE.Vector3(0, 1, 0);
          for (let it = 0; it < 12; it++) { const nx = new THREE.Vector3();
            Ds.forEach(D => { for (let i = 0; i < D.n; i++) { const q = vec(D, i).sub(c); nx.addScaledVector(q, q.dot(ax)); } }); ax = nx.normalize(); }
          { const cap = parts.find(q => q.name === 'Capitate bone');   // proximal end = the end toward the wrist
            const wc = cap ? new THREE.Box3().setFromObject(cap.mesh).getCenter(new THREE.Vector3()) : null;
            if (wc ? wc.clone().sub(c).dot(ax) < 0 : ax.y < 0) ax.negate(); }
          let lo = 1e9, hi = -1e9; Ds.forEach(D => { for (let i = 0; i < D.n; i++) { const s = vec(D, i).sub(c).dot(ax); lo = Math.min(lo, s); hi = Math.max(hi, s); } });
          tf = (D, i) => (vec(D, i).sub(c).dot(ax) - lo) / (hi - lo); }
        else { let lo = 1e9, hi = -1e9; Ds.forEach(D => { for (let i = 0; i < D.n; i++) { lo = Math.min(lo, D.P[i * 3 + 1]); hi = Math.max(hi, D.P[i * 3 + 1]); } });
          tf = (D, i) => (D.P[i * 3 + 1] - lo) / (hi - lo); }
        const inB = (D, i) => !S.b || (tf(D, i) >= S.b[0] && tf(D, i) <= S.b[1]);
        // side ranges within the band
        let mlo = 1e9, mhi = -1e9, alo = 1e9, ahi = -1e9; Ds.forEach(D => { for (let i = 0; i < D.n; i++) if (inB(D, i)) { const m = sg * D.P[i * 3], a = D.P[i * 3 + 2]; mlo = Math.min(mlo, m); mhi = Math.max(mhi, m); alo = Math.min(alo, a); ahi = Math.max(ahi, a); } });
        const cand = (D, i) => inB(D, i) && (!S.ya || (D.P[i * 3 + 1] >= S.ya[0] && D.P[i * 3 + 1] <= S.ya[1])) && (!S.f || dot3(D, i, S.f, D.N) >= S.f[3]) &&
          (!S.sm || ((sg * D.P[i * 3] - mlo) / (mhi - mlo) >= S.sm[0] && (sg * D.P[i * 3] - mlo) / (mhi - mlo) <= S.sm[1])) &&
          (!S.sa || ((D.P[i * 3 + 2] - alo) / (ahi - alo) >= S.sa[0] && (D.P[i * 3 + 2] - alo) / (ahi - alo) <= S.sa[1]));
        const ws = Ds.map(D => new Float32Array(D.n));
        const each = f => Ds.forEach((D, di) => { for (let i = 0; i < D.n; i++) if (cand(D, i)) f(D, i, di); });
        const top = (score) => { let b = null, bs = -Infinity; each((D, i, di) => { const s = score(D, i); if (s > bs) { bs = s; b = [D, i, di]; } }); return [b, bs]; };
        const k = S.k;
        if (k === 'ext' || k === 'sphere') {
          const [b, bs] = top((D, i) => dot3(D, i, S.d, D.P)); if (!b) return;
          const bp = vec(b[0], b[1]);
          if (k === 'ext') each((D, i, di) => { const s = dot3(D, i, S.d, D.P);
            if (s >= bs - S.tol && vec(D, i).distanceTo(bp) < S.reach) ws[di][i] = Math.min(1, (s - (bs - S.tol)) / (S.tol * 0.5)); });
          else {
            let pts = []; each((D, i) => { const q = vec(D, i); if (q.distanceTo(bp) < S.seedR) pts.push(q); });
            let sp = fitSphere(pts);
            for (let it = 0; it < 3; it++) { pts = []; each((D, i) => { const q = vec(D, i); if (Math.abs(q.distanceTo(sp.c) - sp.r) < 0.003) pts.push(q); }); if (pts.length > 20) sp = fitSphere(pts); }
            sphere = sp;
            each((D, i, di) => { const q = vec(D, i); if (Math.abs(q.distanceTo(sp.c) - sp.r) < S.tol && q.distanceTo(bp) < S.reach) ws[di][i] = 1; });
          }
          if (bs > bestS) { bestS = bs; best = bp; }
        } else if (k === 'ridge') {
          // per 3 mm slice the most extreme value, smoothed over neighbours and interpolated between
          // slices (a step per slice drew the ridge as dashes)
          const bw = 0.003, pos = (D, i) => (S.bin === 'm' ? sg * D.P[i * 3] : S.bin === 'a' ? D.P[i * 3 + 2] : D.P[i * 3 + 1]) / bw, mx = {};
          each((D, i) => { const kk = Math.round(pos(D, i)), s = dot3(D, i, S.d, D.P); if (mx[kk] == null || s > mx[kk]) mx[kk] = s; });
          const ms = {}; Object.keys(mx).map(Number).forEach(kk => { const n = [kk - 1, kk, kk + 1].filter(x => mx[x] != null); ms[kk] = n.reduce((t, x) => t + mx[x], 0) / n.length; });
          const at = f => { const b0 = Math.floor(f), a = ms[b0] ?? ms[b0 + 1], c = ms[b0 + 1] ?? ms[b0]; return a == null ? null : a + (c - a) * (f - b0); };
          each((D, i, di) => { const m = at(pos(D, i)); if (m == null) return; const w = 1 - (m - dot3(D, i, S.d, D.P)) / S.tol; if (w > 0) ws[di][i] = Math.min(1, w * 1.5); });
        } else if (k === 'cav') {
          const [b, bs] = top((D, i) => D.K[i]); if (!b || bs <= 0) return; const bp = vec(b[0], b[1]);
          each((D, i, di) => { const s = D.K[i]; if (s >= S.thr * bs && vec(D, i).distanceTo(bp) < S.reach) ws[di][i] = Math.min(1, (s - S.thr * bs) / (0.3 * bs)); });
          best = bp;
        } else if (k === 'spiral') {   // azimuth around the shaft: 0 = posterior, π/2 = lateral, π = anterior
          const cen = {}; each((D, i) => { const kk = Math.round(D.P[i * 3 + 1] / 0.006); const c = cen[kk] || (cen[kk] = [0, 0, 0]); c[0] += D.P[i * 3]; c[1] += D.P[i * 3 + 2]; c[2]++; });
          each((D, i, di) => { const c = cen[Math.round(D.P[i * 3 + 1] / 0.006)], rm = sg * (D.P[i * 3] - c[0] / c[2]), ra = D.P[i * 3 + 2] - c[1] / c[2];
            const phi = Math.atan2(-rm, -ra), u = (tf(D, i) - S.b[1]) / (S.b[0] - S.b[1]), ph0 = S.phi[0] + (S.phi[1] - S.phi[0]) * u;
            let dp = Math.abs(phi - ph0); if (dp > Math.PI) dp = 2 * Math.PI - dp;
            if (dp < S.w) ws[di][i] = Math.min(1, (S.w - dp) / (S.w * 0.4)); });
        } else if (k === 'hole') {   // obturator foramen: project the lower hip bone sideways, find the enclosed gap, take its rim
          const c = 0.003, occ = new Set(), kz = q => Math.floor(q.z / c), ky = q => Math.floor(q.y / c);
          let z0 = 1e9, z1 = -1e9, y0 = 1e9, y1 = -1e9;
          each((D, i) => { const q = vec(D, i), a = kz(q), b2 = ky(q); occ.add(a + ',' + b2); z0 = Math.min(z0, a); z1 = Math.max(z1, a); y0 = Math.min(y0, b2); y1 = Math.max(y1, b2); });
          // close pinholes between sparse vertices
          const occ2 = new Set(occ); occ.forEach(k2 => { const [a, b2] = k2.split(',').map(Number); for (const [da, db] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) occ2.add((a + da) + ',' + (b2 + db)); });
          const out = new Set(), st = [];
          for (let a = z0 - 1; a <= z1 + 1; a++) { st.push([a, y0 - 1], [a, y1 + 1]); } for (let b2 = y0 - 1; b2 <= y1 + 1; b2++) { st.push([z0 - 1, b2], [z1 + 1, b2]); }
          while (st.length) { const [a, b2] = st.pop(), k2 = a + ',' + b2; if (a < z0 - 1 || a > z1 + 1 || b2 < y0 - 1 || b2 > y1 + 1 || out.has(k2) || occ2.has(k2)) continue;
            out.add(k2); st.push([a + 1, b2], [a - 1, b2], [a, b2 + 1], [a, b2 - 1]); }
          const hole = new Set(); for (let a = z0; a <= z1; a++) for (let b2 = y0; b2 <= y1; b2++) { const k2 = a + ',' + b2; if (!occ2.has(k2) && !out.has(k2)) hole.add(k2); }
          if (!hole.size) return;
          each((D, i, di) => { const q = vec(D, i), a = kz(q), b2 = ky(q); let near = false;
            for (let da = -3; da <= 3 && !near; da++) for (let db = -3; db <= 3 && !near; db++) if (hole.has((a + da) + ',' + (b2 + db))) near = true;
            if (near) ws[di][i] = 1; });
        } else if (k === 'arcuate') {   // lower edge of the iliac fossa, front to back
          const lo = {}, kk = (D, i) => Math.round(D.P[i * 3 + 2] / 0.005);
          each((D, i) => { const y = D.P[i * 3 + 1], q = kk(D, i); if (lo[q] == null || y < lo[q]) lo[q] = y; });
          each((D, i, di) => { if (D.P[i * 3 + 1] < lo[kk(D, i)] + 0.004) ws[di][i] = 1; });
        } else if (k === 'vert') {   // per vertebra: frame from its vertebral foramen (centre C, radius R)
          const VP = {body: {zr: [0.95, 9]}, arch: {zr: [-9, 0.95]},
            pedicle: {xr: [0.8, 1.7], zr: [-0.3, 1.0], tb: [0.25, 0.85]}, lamina: {xr: [0, 1.3], zr: [-1.9, -0.6]},
            spinous: {xr: [0, 0.7], zr: [-9, -1.4]}, transverse: {xr: [1.7, 9], zr: [-9, 0.6]},
            supart: {xr: [0.6, 2.4], zr: [-2.0, 0.2], tb: [0.65, 1]}, infart: {xr: [0.2, 1.9], zr: [-2.4, -0.5], tb: [0, 0.35]},
            pars: {xr: [0.5, 1.9], zr: [-1.8, -0.2], tb: [0.3, 0.65]},
            supnotch: {xr: [0.7, 1.9], zr: [-0.5, 1.1], tb: [0.45, 1], ny: 0.2}, infnotch: {xr: [0.7, 1.9], zr: [-0.5, 1.1], tb: [0, 0.55], ny: -0.2},
            dens: {xr: [0, 0.8], zr: [0.45, 9], tb: [0.7, 1]}, contact: {}};
          const ranks = G.map((p, i) => [i, Ds[i].P.reduce((s, v, j) => j % 3 === 1 ? s + v : s, 0) / Ds[i].n]).sort((a, b) => b[1] - a[1]).map(x => x[0]);
          G.forEach((p, di) => {
            const D = Ds[di];
            // raster the vertebra seen from above (x, z), 0.6 mm cells; enclosed empty regions = foramina
            const c = 0.0006; let x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9, y0 = 1e9, y1 = -1e9;
            for (let i = 0; i < D.n; i++) { x0 = Math.min(x0, D.P[i * 3]); x1 = Math.max(x1, D.P[i * 3]); y0 = Math.min(y0, D.P[i * 3 + 1]); y1 = Math.max(y1, D.P[i * 3 + 1]); z0 = Math.min(z0, D.P[i * 3 + 2]); z1 = Math.max(z1, D.P[i * 3 + 2]); }
            const NX = Math.ceil((x1 - x0) / c) + 3, NZ = Math.ceil((z1 - z0) / c) + 3, occ = new Uint8Array(NX * NZ);
            const cell = (x, z) => (Math.floor((x - x0) / c) + 1) + (Math.floor((z - z0) / c) + 1) * NX;
            const g = p.mesh.geometry, I = g.index ? g.index.array : null, tc = I ? I.length / 3 : D.n / 3;
            for (let t = 0; t < tc; t++) { const a = I ? I[t * 3] : t * 3, b2 = I ? I[t * 3 + 1] : t * 3 + 1, e2 = I ? I[t * 3 + 2] : t * 3 + 2;
              const ax = D.P[a * 3], az = D.P[a * 3 + 2], bx = D.P[b2 * 3], bz = D.P[b2 * 3 + 2], cx = D.P[e2 * 3], cz = D.P[e2 * 3 + 2];
              const L = Math.max(Math.hypot(bx - ax, bz - az), Math.hypot(cx - ax, cz - az), Math.hypot(cx - bx, cz - bz)), m = Math.max(1, Math.ceil(L / (c * 0.7)));
              for (let i2 = 0; i2 <= m; i2++) for (let j2 = 0; j2 <= m - i2; j2++) { const u2 = i2 / m, v2 = j2 / m, w2 = 1 - u2 - v2;
                occ[cell(ax * w2 + bx * u2 + cx * v2, az * w2 + bz * u2 + cz * v2)] = 1; } }
            const lab = new Int32Array(NX * NZ).fill(-1), st = [0]; lab[0] = 0;
            while (st.length) { const q = st.pop(), qx = q % NX, qz = (q - qx) / NX;
              for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const nx = qx + dx, nz = qz + dz; if (nx < 0 || nz < 0 || nx >= NX || nz >= NZ) continue;
                const r = nx + nz * NX; if (lab[r] === -1 && !occ[r]) { lab[r] = 0; st.push(r); } } }
            const holes = [];
            for (let q = 0; q < NX * NZ; q++) { if (occ[q] || lab[q] !== -1) continue; const id = holes.length + 1, H = {n: 0, sx: 0, sz: 0}; lab[q] = id; const s2 = [q];
              while (s2.length) { const r = s2.pop(), rx = r % NX, rz = (r - rx) / NX; H.n++; H.sx += rx; H.sz += rz;
                for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const nx = rx + dx, nz = rz + dz; const r2 = nx + nz * NX;
                  if (nx >= 0 && nz >= 0 && nx < NX && nz < NZ && lab[r2] === -1 && !occ[r2]) { lab[r2] = id; s2.push(r2); } } }
              H.x = x0 + (H.sx / H.n - 1 + 0.5) * c; H.z = z0 + (H.sz / H.n - 1 + 0.5) * c; H.r = Math.sqrt(H.n / Math.PI) * c; holes.push(H); }
            holes.sort((a, b) => b.n - a.n); const F = holes[0] || {x: (x0 + x1) / 2, z: (z0 + z1) / 2, r: 0.008};   // the cord (below) gives the centre anyway
            // the canal: centred on the spinal cord / cauda equina at this level (projection holes merge on tilted vertebrae)
            let C = {x: F.x, z: F.z}, cn = 0, cx2 = 0, cz2 = 0;
            parts.filter(q => /spinal cord|cauda equina/i.test(q.name)).forEach(q => { const Q = md(q);
              for (let i = 0; i < Q.n; i++) { const y = Q.P[i * 3 + 1]; if (y > y0 + 0.3 * (y1 - y0) && y < y1 - 0.3 * (y1 - y0)) { cx2 += Q.P[i * 3]; cz2 += Q.P[i * 3 + 2]; cn++; } } });
            if (cn > 10) C = {x: cx2 / cn, z: cz2 / cn};
            // canal radius: nearest bone in each of 24 directions round the cord, median
            const bins = new Array(24).fill(1e9);
            for (let i = 0; i < D.n; i++) { const y = D.P[i * 3 + 1]; if (y < y0 + 0.2 * (y1 - y0) || y > y1 - 0.2 * (y1 - y0)) continue;
              const dx = D.P[i * 3] - C.x, dz = D.P[i * 3 + 2] - C.z, h = Math.hypot(dx, dz), b = Math.floor((Math.atan2(dz, dx) + Math.PI) / (2 * Math.PI) * 24) % 24;
              if (h < bins[b]) bins[b] = h; }
            const bv = bins.filter(x => x < 0.03).sort((a, b) => a - b);
            let R = bv.length ? bv[Math.floor(bv.length / 2)] : 0.008;
            R = Math.max(0.005, Math.min(R, 0.015));
            const part = S.part === 'ivf' ? (ranks.indexOf(di) === 0 ? 'infnotch' : 'supnotch') : S.part;
            const def = Object.assign({}, VP[part] || {}, S.xr ? {xr: S.xr} : {}, S.zr ? {zr: S.zr} : {}, S.tb ? {tb: S.tb} : {});
            const inR = (v, r) => !r || (v >= r[0] && v <= r[1]);
            const tl = i => (D.P[i * 3 + 1] - y0) / (y1 - y0);
            let near = null;
            if (part === 'contact') { const other = []; S.o.forEach(nm => parts.filter(q => q.name === nm).forEach(q => { const Q = md(q); for (let i = 0; i < Q.n; i++) other.push(vec(Q, i)); })); near = pointGrid(other, 0.005); }
            for (let i = 0; i < D.n; i++) {
              const xr = Math.abs(D.P[i * 3] - C.x) / R, zr = (D.P[i * 3 + 2] - C.z) / R, t = tl(i);
              if (S.part === 'ivf' && xr > 0.8 && xr < 1.7 && zr > -0.3 && zr < 0.6) {   // pedicle: its lower edge (upper vertebra) / upper edge (lower) bound the foramen
                const sd = D.P[i * 3] > C.x ? 1 : -1, r = ivfInfo[sd] || (ivfInfo[sd] = {top: -1e9, bot: 1e9, xs: 0, zs: 0, n: 0, pt: 1e9, pb: -1e9});
                if (r.pt == null) { r.pt = 1e9; r.pb = -1e9; }
                if (part === 'infnotch') { if (t > 0.25) r.pt = Math.min(r.pt, D.P[i * 3 + 1]); }   // above the inferior articular processes
                else if (t < 0.72) r.pb = Math.max(r.pb, D.P[i * 3 + 1]);   // below the superior articular processes
              }
              let on;
              if (part === 'foramen') { const hd = Math.hypot(D.P[i * 3] - C.x, D.P[i * 3 + 2] - C.z);
                on = hd < R * 1.25 && ((C.x - D.P[i * 3]) * D.N[i * 3] + (C.z - D.P[i * 3 + 2]) * D.N[i * 3 + 2]) > 0.3 * hd; }
              else if (part === 'transforamen') { on = holes.slice(1).some(H => H.n > 20 && Math.abs(H.x - C.x) > R && Math.hypot(D.P[i * 3] - H.x, D.P[i * 3 + 2] - H.z) < H.r * 1.6); }
              else { on = inR(xr, def.xr) && inR(zr, def.zr) && inR(t, def.tb) && (def.ny == null || (def.ny > 0 ? D.N[i * 3 + 1] > def.ny : D.N[i * 3 + 1] < def.ny));
                if (on && near) on = near(vec(D, i), 0.006); }
              if (on && cand(D, i)) { ws[di][i] = 1;
                if (S.part === 'ivf') { const sd = D.P[i * 3] > C.x ? 1 : -1, r = ivfInfo[sd] || (ivfInfo[sd] = {top: -1e9, bot: 1e9, xs: 0, zs: 0, n: 0});
                  if (part === 'infnotch') r.top = Math.max(r.top, D.P[i * 3 + 1]); else r.bot = Math.min(r.bot, D.P[i * 3 + 1]);
                  r.xs += D.P[i * 3]; r.zs += D.P[i * 3 + 2]; r.n++; } }
            }
          });
        } else if (k === 'swell') {   // where the cord is widest: its own width, 3 mm slices, the run around the peak
          const W = {}; each((D, i) => { const b = Math.round(D.P[i * 3 + 1] / 0.003), x = D.P[i * 3];
            const w = W[b] || (W[b] = [1e9, -1e9]); if (x < w[0]) w[0] = x; if (x > w[1]) w[1] = x; });
          const ks = Object.keys(W).map(Number).sort((a, b) => a - b); if (!ks.length) return;
          const wid = k2 => W[k2][1] - W[k2][0];
          // smooth over 3 slices, find the peak, grow while ≥ frac × peak
          const sm = k2 => [k2 - 1, k2, k2 + 1].filter(q => W[q]).reduce((s, q, _, a) => s + wid(q) / a.length, 0);
          let pk = ks[0]; ks.forEach(k2 => { if (sm(k2) > sm(pk)) pk = k2; });
          const thr = S.frac * sm(pk); let lo = pk, hi = pk;
          while (W[lo - 1] && sm(lo - 1) >= thr) lo--; while (W[hi + 1] && sm(hi + 1) >= thr) hi++;
          each((D, i, di) => { const b = Math.round(D.P[i * 3 + 1] / 0.003); if (b >= lo && b <= hi) ws[di][i] = 1; });
          try { document.documentElement.setAttribute('data-swell', [lo * 3, hi * 3, (sm(pk) * 1000).toFixed(1)].join(',')); } catch (x) {}
        } else if (k === 'shell') {   // a shell around a fitted head's centre (femoral neck, its base lines)
          const ref = parts.filter(q => q.name === G[0].name), hs = ulLandmark(S.ref, ref); if (!hs || !hs.sphere) return;
          const c = hs.sphere.c, r = hs.sphere.r;
          each((D, i, di) => { const d = vec(D, i).distanceTo(c) - r; if (d > S.r0 && d < S.r1) ws[di][i] = Math.min(1, Math.min(d - S.r0, S.r1 - d) / 0.002 + 0.3); });
        } else if (k === 'above') {   // a fossa just above an articular surface: the same medio-lateral position, a band higher
          const ref = parts.filter(q => q.name === G[0].name), rs = ulLandmark(S.ref, ref); if (!rs || !rs.pts.length) return;
          let mlo = 1e9, mhi = -1e9; Ds.forEach(D => { for (let i = 0; i < D.n; i++) { const m = sg * D.P[i * 3]; mlo = Math.min(mlo, m); mhi = Math.max(mhi, m); } });
          const mc = rs.pts.reduce((t, q) => t + sg * q.x, 0) / rs.pts.length, hw = S.w * (mhi - mlo);
          const tc = (S.b[0] + S.b[1]) / 2, th = (S.b[1] - S.b[0]) / 2;   // an oval pit, not a box
          each((D, i, di) => { const e = ((sg * D.P[i * 3] - mc) / hw) ** 2 + ((tf(D, i) - tc) / th) ** 2; if (e < 1) ws[di][i] = Math.min(1, (1 - e) / 0.35); });
          best = null;
        } else if (k === 'crest') {   // top edge of the ilium between ASIS (front end) and PSIS (back end), smooth along its length
          const fem = parts.filter(q => q.name === 'Femur'); const hs = fem.length ? ulLandmark('femur: head', fem) : null; if (!hs || !hs.sphere) return;
          const yA = hs.sphere.c.y; let asis = null, psis = null;
          each((D, i) => { const q = vec(D, i); if (q.y > yA + 0.04 && (!asis || q.z + 0.2 * q.y > asis.z + 0.2 * asis.y)) asis = q;
            if (q.y > yA + 0.03 && (!psis || q.z < psis.z)) psis = q; });
          if (!asis || !psis) return;
          const bw = 0.003, T = {}; each((D, i) => { const q = vec(D, i); if (q.z > asis.z + 0.002 || q.z < psis.z - 0.002) return; const b = Math.round(q.z / bw); if (T[b] == null || q.y > T[b]) T[b] = q.y; });
          const ks = Object.keys(T).map(Number).sort((a, b) => a - b); if (ks.length < 3) return;
          const Ts = {}; ks.forEach(b => { const n = [b - 1, b, b + 1].filter(x => T[x] != null); Ts[b] = n.reduce((t, x) => t + T[x], 0) / n.length; });
          const topAt = z => { const f = z / bw, b0 = Math.floor(f), b1 = b0 + 1, a = Ts[b0] ?? Ts[b1], c = Ts[b1] ?? Ts[b0]; return a == null ? null : a + (c - a) * (f - b0); };
          each((D, i, di) => { const q = vec(D, i); if (q.z > asis.z + 0.002 || q.z < psis.z - 0.002) return; const t = topAt(q.z); if (t == null) return;
            const w = 1 - (t - q.y) / S.tol; if (w > 0) ws[di][i] = Math.min(1, w * 1.6); });
          best = asis.clone().lerp(psis, 0.5);
        } else if (k === 'capedge') {   // margin of a spherical articular cap: the angle (from the pole) where the bone leaves the sphere
          const ref = parts.filter(q => q.name === G[0].name), hs = ulLandmark(S.ref, ref); if (!hs || !hs.sphere) return;
          const c = hs.sphere.c, r = hs.sphere.r, ax = hs.pt.clone().sub(c).normalize();
          const ang = q => Math.acos(Math.max(-1, Math.min(1, q.clone().sub(c).normalize().dot(ax)))) * 180 / Math.PI;
          const on = {}, all = {};
          each((D, i) => { const q = vec(D, i), a = Math.round(ang(q) / 2); if (a > 60) return; all[a] = (all[a] || 0) + 1; if (Math.abs(q.distanceTo(c) - r) < 0.0018) on[a] = (on[a] || 0) + 1; });
          let edge = null; for (let a = 10; a <= 60; a++) if (all[a] > 8 && (on[a] || 0) / all[a] < 0.5) { edge = a * 2; break; }
          if (edge == null) return;
          each((D, i, di) => { const q = vec(D, i), a = ang(q), d = q.distanceTo(c) - r;
            if (a > edge - 6 && a < edge + 8 && d > -0.004 && d < 0.009) ws[di][i] = Math.min(1, Math.min(a - (edge - 6), edge + 7 - a) / 3 + 0.3); });
          best = c.clone().addScaledVector(ax, r * Math.cos(edge * Math.PI / 180));
          try { document.documentElement.setAttribute('data-capedge', edge); } catch (x) {}
        } else if (k === 'hippart') {   // the three hip-bone parts, split at the acetabulum's centre
          const fem = parts.filter(q => q.name === 'Femur'); const hs = fem.length ? ulLandmark('femur: head', fem) : null; if (!hs || !hs.sphere) return;
          const c = hs.sphere.c;
          each((D, i, di) => { const q = vec(D, i), up = q.y > c.y + 0.003, post = q.z < c.z - 0.002;
            if (S.part === 'ilium' ? up : S.part === 'ischium' ? !up && post : !up && !post) ws[di][i] = 1; });
          best = c.clone();
        } else if (k === 'brim') {   // arcuate line: auricular surface's front-lower corner → iliopubic eminence (above the acetabulum, front)
          const fem = parts.filter(q => q.name === 'Femur'); const hs = fem.length ? ulLandmark('femur: head', fem) : null;
          const au = ulLandmark('hip: auricular surface', G); if (!hs || !hs.sphere || !au) return;
          const A = au.pts.reduce((b, q) => (!b || q.z - q.y > b.z - b.y ? q : b), null), c = hs.sphere.c;
          const all = f => Ds.forEach((D, di) => { for (let i = 0; i < D.n; i++) f(D, i, di); });   // the end points: whole bone, not the card's band
          let B = null; all((D, i) => { const q = vec(D, i); if (q.z > c.z && q.y > c.y && q.y < c.y + 0.03 && sg * (q.x - c.x) > 0.01 && D.N[i * 3 + 1] > 0.3 && (!B || q.z + q.y > B.z + B.y)) B = q; });
          if (!B) return;
          let A0 = A;
          if (S.seg === 'pecten') {   // second leg of the brim: eminence → pubic tubercle (upper front point near the symphysis)
            let mx = -1e9; all((D, i) => { mx = Math.max(mx, sg * D.P[i * 3]); });
            let T = null; all((D, i) => { const q = vec(D, i), m = sg * q.x; if (m > mx - 0.035 && m < mx - 0.012 && (!T || q.z + 0.5 * q.y > T.z + 0.5 * T.y)) T = q; });
            if (!T) return; A0 = B; B = T; }
          const A1 = A0, AB = B.clone().sub(A1), L2 = AB.lengthSq();
          const onLine = q => { const t = Math.max(0, Math.min(1, q.clone().sub(A1).dot(AB) / L2)); return {t, d: q.distanceTo(A1.clone().addScaledVector(AB, t))}; };
          if (S.above) each((D, i, di) => { const q = vec(D, i), t = Math.max(0, Math.min(1, q.clone().sub(A1).dot(AB) / L2)), ly = A1.y + AB.y * t;
              if (q.y > ly + 0.004 && sg * D.N[i * 3] > 0.2) ws[di][i] = 1; });
          else { const best2 = {}; each((D, i) => { if (S.seg !== 'pecten' && sg * D.N[i * 3] < 0.05) return; const o = onLine(vec(D, i)); if (o.d > 0.012) return;
              const kk = Math.round(o.t * 40); if (best2[kk] == null || o.d < best2[kk]) best2[kk] = o.d; });
            each((D, i, di) => { if (S.seg !== 'pecten' && sg * D.N[i * 3] < 0.05) return; const o = onLine(vec(D, i)), kk = Math.round(o.t * 40);
              if (best2[kk] != null && o.d < best2[kk] + S.w) ws[di][i] = 1; }); }
          best = A1.clone().lerp(B, 0.5);
        } else if (k === 'band') {
          each((D, i, di) => { ws[di][i] = 1; });
        } else if (k === 'contact') {
          const other = []; S.o.forEach(nm => parts.filter(q => q.name === nm).forEach(q => { const D = md(q); for (let i = 0; i < D.n; i++) other.push(vec(D, i)); }));
          const near = pointGrid(other, 0.005), hit = [];
          each((D, i, di) => { const q = vec(D, i); if (near(q, S.dist)) { ws[di][i] = 1; hit.push(q); } });
          if (S.top && hit.length) {   // only around the highest contact (e.g. the notch, not the nerve's later course)
            const hi = hit.reduce((a, q) => (q.y > a.y ? q : a)); hit.length = 0;
            each((D, i, di) => { if (ws[di][i] && vec(D, i).distanceTo(hi) > S.top) ws[di][i] = 0; else if (ws[di][i]) hit.push(vec(D, i)); });
            best = hi; }
          if (S.grow && hit.length) { const nh = pointGrid(hit, 0.005); each((D, i, di) => { if (!ws[di][i] && nh(vec(D, i), S.grow)) ws[di][i] = 0.7; }); }
        } else if (k === 'notch') {   // the dip in the superior border between the superior angle and the coracoid
          // blade only: per 3 mm medial slice the blade's own plane (median z of front/back-facing points), so
          // the coracoid (juts forward) and the spine (juts back) don't count as border
          const bw = 0.003, bk = (D, i) => Math.round(sg * D.P[i * 3] / bw), zs = {};
          each((D, i) => { if (Math.abs(D.N[i * 3 + 2]) > 0.7) (zs[bk(D, i)] ||= []).push(D.P[i * 3 + 2]); });
          const zb = {}; Object.keys(zs).forEach(k2 => { const a = zs[k2].sort((x, y) => x - y); zb[k2] = a[a.length >> 1]; });
          const onBlade = (D, i) => zb[bk(D, i)] != null && Math.abs(D.P[i * 3 + 2] - zb[bk(D, i)]) < 0.008;
          const top = {}; each((D, i) => { if (!onBlade(D, i) || D.N[i * 3 + 1] < 0.3) return; const kk = bk(D, i); if (top[kk] == null || D.P[i * 3 + 1] > top[kk]) top[kk] = D.P[i * 3 + 1]; });
          const ks = Object.keys(top).map(Number).sort((a, b) => a - b); if (ks.length < 5) return;
          const sm3 = kk => [kk - 1, kk, kk + 1].filter(q => top[q] != null).reduce((t, q, _, a) => t + top[q] / a.length, 0);
          let kmin = ks[2]; ks.slice(2, -2).forEach(kk => { if (sm3(kk) < sm3(kmin)) kmin = kk; });
          each((D, i, di) => { const kk = bk(D, i); if (Math.abs(kk - kmin) <= 2 && onBlade(D, i) && D.N[i * 3 + 1] > 0.1 && D.P[i * 3 + 1] > top[kmin] - 0.006) ws[di][i] = 1; });
          { let bp = null; each((D, i) => { if (bk(D, i) === kmin && onBlade(D, i) && (!bp || D.P[i * 3 + 1] > bp.y)) bp = vec(D, i); }); if (bp) best = bp; }
        } else if (k === 'glenoidend') {
          const gl = ulLandmark('scapula: glenoid cavity', G); if (!gl) return; const glen = gl.pts;
          const e = glen.reduce((a, q) => (!a || (S.up ? q.y > a.y : q.y < a.y) ? q : a), null).clone();
          const anchor = e.add(new THREE.Vector3(0, S.up ? 0.006 : -0.011, 0)), R = S.up ? 0.009 : 0.012;
          const gg = pointGrid(glen, 0.005);
          each((D, i, di) => { const q = vec(D, i); if (q.distanceTo(anchor) < R && !gg(q, 0.0015)) ws[di][i] = 1 - q.distanceTo(anchor) / R * 0.5; });
          best = anchor;
        } else if (k === 'socket') {
          const hum = parts.filter(q => q.name === 'Humerus'); const hs = hum.length ? ulLandmark('humerus: head', hum) : null;
          if (!hs || !hs.sphere) return; const c = hs.sphere.c, r = hs.sphere.r; const glen = [];
          each((D, i, di) => { const q = vec(D, i), d = q.distanceTo(c); if (d < r + 0.015) {
            const n = new THREE.Vector3(D.N[i * 3], D.N[i * 3 + 1], D.N[i * 3 + 2]), tc = c.clone().sub(q).normalize();
            if (n.dot(tc) > 0.55) { glen.push(q); if (k === 'socket') ws[di][i] = 1; } } });
          if (k === 'glenoidend' && glen.length) {
            const e = glen.reduce((a, q) => (!a || (S.up ? q.y > a.y : q.y < a.y) ? q : a), null).clone();
            const anchor = e.add(new THREE.Vector3(0, S.up ? 0.006 : -0.011, 0)), R = S.up ? 0.009 : 0.012;
            const gg = pointGrid(glen, 0.005);
            each((D, i, di) => { const q = vec(D, i); if (q.distanceTo(anchor) < R && !gg(q, 0.0015)) ws[di][i] = 1 - q.distanceTo(anchor) / R * 0.5; });
            best = anchor;
          }
        } else if (k === 'aneck') {   // the margin of the articular head: the head patch's border, widened
          const hs = ulLandmark('humerus: head', G); if (!hs) return; const edge = [];
          G.forEach(p => { const w = hs.W.get(p), D = md(p); if (!w) return;
            for (let i = 0; i < D.n; i++) if (w[i] > 0.35 && D.nb[i].some(j => w[j] <= 0.35)) edge.push(vec(D, i)); });
          const ne = pointGrid(edge, 0.005);
          each((D, i, di) => { if (ne(vec(D, i), 0.0035)) ws[di][i] = 1; });
        } else if (k === 'spinefossa') {
          const sp = ulLandmark('scapula: spine', G); if (!sp) return;
          let slo = 1e9, shi = -1e9; sp.pts.forEach(q => { slo = Math.min(slo, sg * q.x); shi = Math.max(shi, sg * q.x); });
          const sy = {}; sp.pts.forEach(q => { if ((sg * q.x - slo) / (shi - slo) < 0.3) return; const kk = Math.round(sg * q.x / 0.006); sy[kk] = sy[kk] == null ? q.y : Math.max(sy[kk], q.y); });
          const at = q => { let kk = Math.round(sg * q.x / 0.006); for (let o = 0; o < 20; o++) { if (sy[kk + o] != null) return sy[kk + o]; if (sy[kk - o] != null) return sy[kk - o]; } return null; };
          let alo = 1e9, ahi = -1e9; Ds.forEach(D => { for (let i = 0; i < D.n; i++) { const m = sg * D.P[i * 3]; alo = Math.min(alo, m); ahi = Math.max(ahi, m); } });
          const spineW = new Set(sp.pts.map(q => q.x.toFixed(5) + q.y.toFixed(5)));
          each((D, i, di) => { const q = vec(D, i), y = at(q); if (y == null) return;
            const post = -D.N[i * 3 + 2], ms = (sg * q.x - alo) / (ahi - alo);
            if (spineW.has(q.x.toFixed(5) + q.y.toFixed(5))) return;
            if (S.up ? (q.y > y + 0.002 && post > -0.15 && ms > 0.12) : (q.y < y - 0.006 && post > 0.25 && ms > 0.14)) ws[di][i] = 1; });
        }
        G.forEach((p, di) => { const prev = W.get(p); W.set(p, prev ? prev.map((x, i) => Math.max(x, ws[di][i])) : ws[di]); });
      });
      // soften the edge one ring, collect the patch
      const pts = [];
      W.forEach((w, p) => { const D = md(p), w2 = new Float32Array(D.n);
        for (let i = 0; i < D.n; i++) { let s = w[i] * 2, c = 2; D.nb[i].forEach(j => { s += w[j]; c++; }); w2[i] = Math.max(w[i] * 0.85, s / c); if (w2[i] > 0.35) pts.push(vec(D, i)); }
        W.set(p, w2); });
      if (!pts.length) return null;
      if (!best) { const c = pts.reduce((a, q) => a.add(q), new THREE.Vector3()).multiplyScalar(1 / pts.length);
        best = pts.reduce((a, q) => (!a || q.distanceToSquared(c) < a.distanceToSquared(c) ? q : a), null); }
      return {pt: best, W, pts, sphere, ivf: ivfInfo};
    }
    function subdivide(g, L) {   // midpoint edge splitting until no edge is longer than L
      const pa = g.attributes.position, na = g.attributes.normal;
      let P = [], N = [];
      for (let i = 0; i < pa.count; i++) { P.push(pa.getX(i), pa.getY(i), pa.getZ(i)); N.push(na.getX(i), na.getY(i), na.getZ(i)); }
      let I = Array.from(g.index.array);
      const L2 = L * L;
      for (let pass = 0; pass < 7; pass++) {
        const mid = new Map(), out = []; let split = 0;
        const len2 = (a, b) => { const dx = P[a * 3] - P[b * 3], dy = P[a * 3 + 1] - P[b * 3 + 1], dz = P[a * 3 + 2] - P[b * 3 + 2]; return dx * dx + dy * dy + dz * dz; };
        const m = (a, b) => { const k = a < b ? a + '_' + b : b + '_' + a; let r = mid.get(k); if (r != null) return r;
          r = P.length / 3; for (let c = 0; c < 3; c++) { P.push((P[a * 3 + c] + P[b * 3 + c]) / 2); N.push((N[a * 3 + c] + N[b * 3 + c]) / 2); }
          mid.set(k, r); return r; };
        // first decide which edges split (shared decision → no cracks)
        const want = new Set();
        for (let t = 0; t < I.length; t += 3) for (let e = 0; e < 3; e++) { const a = I[t + e], b = I[t + (e + 1) % 3]; if (len2(a, b) > L2) want.add(a < b ? a + '_' + b : b + '_' + a); }
        if (!want.size) break;
        const S = (a, b) => want.has(a < b ? a + '_' + b : b + '_' + a);
        for (let t = 0; t < I.length; t += 3) {
          let a = I[t], b = I[t + 1], c = I[t + 2];
          const s = [S(a, b), S(b, c), S(c, a)], n = s[0] + s[1] + s[2];
          if (!n) { out.push(a, b, c); continue; } split++;
          if (n === 3) { const ab = m(a, b), bc = m(b, c), ca = m(c, a); out.push(a, ab, ca, ab, b, bc, ca, bc, c, ab, bc, ca); continue; }
          // rotate so that edge 0 (a-b) is split
          while (!(n === 1 ? S(a, b) : (S(a, b) && S(b, c)))) { const t0 = a; a = b; b = c; c = t0; }
          if (n === 1) { const ab = m(a, b); out.push(a, ab, c, ab, b, c); }
          else { const ab = m(a, b), bc = m(b, c); out.push(a, ab, c, ab, b, bc, ab, bc, c); }
        }
        I = out; if (!split) break;
      }
      for (let i = 0; i < N.length; i += 3) { const l = Math.hypot(N[i], N[i + 1], N[i + 2]) || 1; N[i] /= l; N[i + 1] /= l; N[i + 2] /= l; }
      const ng = new THREE.BufferGeometry();
      ng.setAttribute('position', new THREE.Float32BufferAttribute(P, 3)); ng.setAttribute('normal', new THREE.Float32BufferAttribute(N, 3));
      ng.setIndex(P.length / 3 > 65535 ? new THREE.Uint32BufferAttribute(I, 1) : new THREE.Uint16BufferAttribute(I, 1));
      return ng;
    }
    function fitSphere(pts) {   // x²+y²+z² + Dx + Ey + Fz + G = 0, least squares (normal equations)
      const A = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], b = [0,0,0,0];
      pts.forEach(v => { const r = [v.x, v.y, v.z, 1], s = -(v.x * v.x + v.y * v.y + v.z * v.z);
        for (let i = 0; i < 4; i++) { b[i] += r[i] * s; for (let j = 0; j < 4; j++) A[i][j] += r[i] * r[j]; } });
      for (let i = 0; i < 4; i++) { let m = i; for (let r = i + 1; r < 4; r++) if (Math.abs(A[r][i]) > Math.abs(A[m][i])) m = r;
        [A[i], A[m]] = [A[m], A[i]]; [b[i], b[m]] = [b[m], b[i]];
        for (let r = 0; r < 4; r++) if (r !== i) { const f = A[r][i] / A[i][i]; for (let c = i; c < 4; c++) A[r][c] -= f * A[i][c]; b[r] -= f * b[i]; } }
      const D = b[0] / A[0][0], E = b[1] / A[1][1], F = b[2] / A[2][2], G = b[3] / A[3][3];
      const c = new THREE.Vector3(-D / 2, -E / 2, -F / 2);
      return {c, r: Math.sqrt(Math.max(0, c.lengthSq() - G))};
    }
    function headSphere(FP, M) {   // the femoral head: fit, then refit on the points near that sphere
      const y1 = Math.max(...FP.map(v => v.y)), top = FP.filter(v => v.y > y1 - 0.06), mMax = Math.max(...top.map(M));
      let s = fitSphere(top.filter(v => M(v) > mMax - 0.03));
      for (let i = 0; i < 2; i++) { const near = FP.filter(v => Math.abs(v.distanceTo(s.c) - s.r) < 0.004); if (near.length > 20) s = fitSphere(near); }
      return s;
    }
    function landmarkDef(key) {
      const P = []; target.forEach(p => eachVert(p.mesh, v => P.push(v.clone()))); if (!P.length) return null;
      const sg = left ? -1 : 1, M = v => sg * v.x;
      const ys = P.map(v => v.y), y1 = Math.max(...ys), y0 = Math.min(...ys), L = y1 - y0;
      const k = String(key).toLowerCase();
      const D = {};
      const def = (name, pred, f, tol, reach) => { D[name] = {pred, f, tol, reach: reach || 0.05}; };
      const inY = (v, a, b) => v.y >= a && v.y <= b;
      if (/femur|femoral/.test(target[0].name.toLowerCase())) {
        const top = P.filter(v => v.y > y1 - 0.06), mMax = Math.max(...top.map(M));
        const hs = top.filter(v => M(v) > mMax - 0.025), head = hs.reduce((a, v) => a.add(v), new THREE.Vector3()).multiplyScalar(1 / hs.length);
        const hr = Math.max(...hs.map(v => v.distanceTo(head)));
        const gtPt = P.filter(v => v.y > y1 - 0.09).reduce((b, v) => (!b || -M(v) > -M(b) ? v : b), null);
        const lowB = P.filter(v => v.y < y0 + 0.11), midM = (Math.max(...lowB.map(M)) + Math.min(...lowB.map(M))) / 2;
        const neckC = head.clone().lerp(gtPt, 0.45);
        const HS = headSphere(P, M);
        def('head', v => v.y > y1 - 0.08, v => -Math.abs(v.distanceTo(HS.c) - HS.r), 0.003, 0.06);   // the ball's surface
        def('neck', v => v.y > y1 - 0.09, v => -v.distanceTo(neckC), 0.012, 0.02);
        def('greater trochanter', v => v.y > y1 - 0.09, v => -M(v) + v.y * 0.3, 0.012, 0.04);
        def('lesser trochanter', v => inY(v, y1 - 0.12, y1 - 0.06), v => M(v) - v.z, 0.008, 0.025);
        // the ridge: at each height, the bone's most posterior points
        const zminAt = {}; P.forEach(v => { const b = Math.round(v.y / 0.008); if (zminAt[b] == null || v.z < zminAt[b]) zminAt[b] = v.z; });
        def('linea aspera', v => inY(v, y0 + 0.3 * L, y0 + 0.75 * L), v => -(v.z - zminAt[Math.round(v.y / 0.008)]), 0.003, 0.25);
        def('medial condyle', v => inY(v, y0, y0 + 0.045), v => M(v) - 0.6 * (v.y - y0), 0.016, 0.04);
        def('lateral condyle', v => inY(v, y0, y0 + 0.045), v => -M(v) - 0.6 * (v.y - y0), 0.016, 0.04);
        def('medial epicondyle', v => inY(v, y0 + 0.035, y0 + 0.075), v => M(v), 0.006, 0.025);
        def('lateral epicondyle', v => inY(v, y0 + 0.035, y0 + 0.075), v => -M(v), 0.006, 0.025);
        def('adductor tubercle', v => inY(v, y0 + 0.07, y0 + 0.1), v => M(v), 0.004, 0.018);
        def('intercondylar fossa', v => inY(v, y0 + 0.005, y0 + 0.04) && Math.abs(M(v) - midM) < 0.012, v => -v.z, 0.012, 0.03);
        def('patellar surface', v => inY(v, y0 + 0.025, y0 + 0.07) && Math.abs(M(v) - midM) < 0.022, v => v.z, 0.008, 0.04);
      } else {   // hip bone
        const FP = []; parts.filter(p => p.name === 'Femur').forEach(p => eachVert(p.mesh, v => FP.push(v.clone())));
        const fy1 = FP.length ? Math.max(...FP.map(v => v.y)) : y0 + 0.4 * L;
        const ftop = FP.filter(v => v.y > fy1 - 0.05), fm = ftop.length ? Math.max(...ftop.map(M)) : 0;
        const hsel = ftop.filter(v => M(v) > fm - 0.025), hc = hsel.reduce((a, v) => a.add(v), new THREE.Vector3()).multiplyScalar(1 / Math.max(1, hsel.length));
        const yA = hc.y, zA = hc.z, mx = Math.max(...P.map(M));
        const asisY = P.filter(v => v.y > yA + 0.04).reduce((b, v) => (!b || v.z + 0.2 * v.y > b.z + 0.2 * b.y ? v : b), null).y;
        const tubY = Math.min(...P.filter(v => v.z < zA).map(v => v.y));
        def('iliac crest', () => true, v => v.y, 0.012, 0.12);
        def('anterior superior iliac spine', v => v.y > yA + 0.04, v => v.z + 0.2 * v.y, 0.006, 0.02);
        def('asis', v => v.y > yA + 0.04, v => v.z + 0.2 * v.y, 0.006, 0.02);
        def('anterior inferior iliac spine', v => v.y > yA + 0.01 && v.y < yA + 0.035 && v.z > zA, v => v.z, 0.005, 0.018);
        def('posterior superior iliac spine', v => v.y > yA + 0.03 && M(v) > mx - 0.06, v => -v.z, 0.006, 0.02);
        def('ischial tuberosity', v => v.z < zA, v => -v.y, 0.012, 0.035);
        def('ischial spine', v => v.y > tubY + 0.025 && v.y < yA && v.z < zA - 0.015, v => M(v), 0.004, 0.015);
        def('pubic symphysis', () => true, v => M(v), 0.005, 0.03);
        def('pubic tubercle', v => M(v) > mx - 0.035 && M(v) < mx - 0.012, v => v.z + 0.5 * v.y, 0.005, 0.015);
        // the socket's surface: just outside the femoral head's own radius
        const HS = FP.length ? headSphere(FP, M) : {c: hc, r: 0.024};
        def('acetabulum', v => v.distanceTo(HS.c) < HS.r + 0.02, v => -Math.abs(v.distanceTo(HS.c) - (HS.r + 0.002)), 0.005, 0.06);   // socket = just outside the head
      }
      const name = Object.keys(D).find(n => k.indexOf(n) >= 0); if (!name) return null;
      const d = D[name], C = P.filter(d.pred); if (!C.length) return null;
      let pt = C[0], fb = d.f(C[0]); C.forEach(v => { const f = d.f(v); if (f > fb) { fb = f; pt = v; } });
      return {pt, inPatch: v => d.pred(v) && d.f(v) >= fb - d.tol && v.distanceTo(pt) < d.reach, soft: v => Math.min(1, (d.f(v) - (fb - d.tol)) / (d.tol * 0.5))};
    }
    mark('landmark');
    const meninx = norm(cfg.region || '') === 'canal' && /mater|dura/i.test(cfg.name || '');
    if (meninx) {   // meninges: a close-up of a short segment, so the nested layers can be told apart
      tbox.makeEmpty(); target.forEach(p => eachVert(p.mesh, v => { if (v.y > 1.17 && v.y < 1.23) tbox.expandByPoint(v); }));
      if (tbox.isEmpty()) target.forEach(p => tbox.union(p.box));
      tbox.expandByScalar(0.006);
    } else if (norm(cfg.region || '') === 'plexus') {   // frame the whole plexus, not just the asked part
      // framed on the asked part's stretch within the plexus (long nerves: not down to the hand),
      // with a margin so the neighbouring plexus stays in view
      tbox.makeEmpty();
      if (LMdef && LMdef.pts) LMdef.pts.forEach(q => tbox.expandByPoint(q)); else target.forEach(p => tbox.union(p.box));
      tbox.min.y = Math.max(tbox.min.y, 1.25); tbox.max.y = Math.min(tbox.max.y, 1.52);
      if (tbox.min.y >= tbox.max.y) { tbox.min.y = 1.3; tbox.max.y = 1.42; }
      tbox.expandByScalar(0.025);
    } else     if (LM) { tbox.makeEmpty(); if (LMdef.pts) { LMdef.pts.forEach(q => tbox.expandByPoint(q)); tbox.expandByScalar(0.025); } else tbox.expandByPoint(LM).expandByScalar(0.03); }
    if (!yr) yr = tbox.isEmpty() ? REGIONS.limb : [tbox.min.y - 0.12, tbox.max.y + 0.12];
    // ligaments / menisci read best on their own: bone + ligament only (Muscle button adds them back)
    const ligCard = target.length && target.every(p => p.layer === 'ligament' || p.layer === 'capsule');
    const boneCard = target.length && target.every(p => p.layer === 'bone');
    const boneLigCard = !boneCard && target.length && target.every(p => p.layer === 'bone' || p.layer === 'ligament' || p.layer === 'capsule');   // e.g. sciatic foramina: bone + ligaments only   // osteology: the skeleton alone
    const layers = new Set(names(cfg.show || (boneCard ? 'bone' : (ligCard || boneLigCard) ? 'bone,ligament' : (mode === 'nerve' ? 'bone,muscle,nerve,ligament' : 'bone,muscle,ligament')))
      .map(norm).map(x => x.replace(/s$/, '').replace('artery', 'vessel').replace('arterie', 'vessel')));
    const inRegion = p => p.box.max.y > yr[0] && p.box.min.y < yr[1];
    const isolate = norm(cfg.region || '') === 'vertebra';   // a vertebra on its own, like a bench specimen
    parts.forEach(p => {
      p.mesh.visible = isolate ? target.includes(p) : inRegion(p) && (layers.has(p.layer) || target.includes(p) || (mode === 'nerve' && nerve.includes(p)));
    });
    const focus = new THREE.Box3();
    parts.forEach(p => { if (p.mesh.visible) focus.union(p.box); });
    focus.min.y = Math.max(focus.min.y, yr[0]); focus.max.y = Math.min(focus.max.y, yr[1]);

    // ---- styling ----
    const paint = (p, c, emis) => { p.mesh.material.color.setHex(c); p.mesh.material.emissive.setHex(emis || 0); };
    // see-through parts: drawn after the solid ones in a FIXED order (no per-frame
    // re-sorting → no popping) and writing depth, so the nearest glass surface wins
    let xrOn = false;
    const ghost = (p, a) => { const m = p.mesh.material; if (m.transparent !== (a < 1)) m.needsUpdate = true;   // blending changes need a recompile
      m.transparent = a < 1; m.opacity = a; m.depthWrite = true;
      p.mesh.renderOrder = a < 1 ? 1 + parts.indexOf(p) / 10000 : 0; };
    // highlight = a translucent blue tint over the structure's own colour (texture/shape still read)
    const hl = p => (p.layer === 'vessel' || p.layer === 'vein')
      ? paint(p, p.layer === 'vein' ? 0x4f8cff : 0xff3b3b, p.layer === 'vein' ? 0x0b2a80 : 0x6a0a0a)   // arteries bright red, veins bright blue
      : paint(p, new THREE.Color(p.mesh.userData.base).lerp(new THREE.Color(HL), 0.6).getHex(), 0x0a2c3c);
    const labels = [];   // {text, part(s), cls}
    const minor = [];    // small, dim context labels on the answer side
    let xray = [];       // parts to keep visible: occluders get ghosted

    let lmMark = null; const ivfDiscs = [];
    if (LM) {   // landmark cards: a glowing marker on the spot (none on a Click front: that's the answer)
      // the landmark's own surface (see landmarkDef), tinted, with a soft edge
      const paintPatch = col => {
        const c3 = new THREE.Color(col);
        target.forEach(p => {
          const g = p.mesh.geometry, pos = g.attributes.position, n = pos.count, cols = new Float32Array(n * 3), wts = new Float32Array(n), base = new THREE.Color(p.mesh.userData.base), v = new THREE.Vector3();
          for (let i = 0; i < n; i++) {
            v.fromBufferAttribute(pos, i).applyMatrix4(p.mesh.matrixWorld);
            const t = LMdef.W ? (LMdef.W.get(p) ? LMdef.W.get(p)[i] : 0) : LMdef.inPatch(v) ? Math.max(0, Math.min(1, LMdef.soft(v))) : 0;
            const c = base.clone().lerp(c3, t * 0.85);
            cols[i * 3] = c.r; cols[i * 3 + 1] = c.g; cols[i * 3 + 2] = c.b; wts[i] = t;
          }
          g.setAttribute('color', new THREE.BufferAttribute(cols, 3));
          g.setAttribute('jkw', new THREE.BufferAttribute(wts, 1));   // the X-ray film shows the patch from this
          p.mesh.material.vertexColors = true; p.mesh.material.color.setHex(0xffffff); p.mesh.material.needsUpdate = true;
        });
        try { dirty = true; } catch (x) { /* first paint happens while the view is built: the loop draws it anyway */ }
      };
      // edges of openings / notches: traced as a glowing line (clearer than a painted band)
      const oSpec = UL[String(cfg.landmark).toLowerCase().trim()];
      if (oSpec && oSpec.outline && LMdef.pts && LMdef.pts.length > 12 && !(mode === 'find' && !back)) {
        const P = LMdef.pts, c = P.reduce((a, q) => a.add(q), new THREE.Vector3()).multiplyScalar(1 / P.length);
        // plane of the rim: its two main directions (power iteration on the covariance)
        const cov = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        P.forEach(q => { const d = [q.x - c.x, q.y - c.y, q.z - c.z]; for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) cov[i][j] += d[i] * d[j]; });
        const pw = (M, skip) => { let v = new THREE.Vector3(0.3, 0.8, 0.5); for (let it = 0; it < 30; it++) {
            const w = new THREE.Vector3(M[0][0] * v.x + M[0][1] * v.y + M[0][2] * v.z, M[1][0] * v.x + M[1][1] * v.y + M[1][2] * v.z, M[2][0] * v.x + M[2][1] * v.y + M[2][2] * v.z);
            if (skip) w.addScaledVector(skip, -w.dot(skip)); v = w.normalize(); } return v; };
        const a1 = pw(cov), a2 = pw(cov, a1);
        const NB = 64, bins = Array.from({length: NB}, () => []);
        P.forEach(q => { const d = q.clone().sub(c), an = Math.atan2(d.dot(a2), d.dot(a1)); bins[Math.floor((an + Math.PI) / (2 * Math.PI) * NB) % NB].push(q); });
        // loop (a hole): the innermost rim point per direction; arc (a notch edge): the bin's average
        let ring = bins.map(B => !B.length ? null : oSpec.outline === 'loop'
          ? B.reduce((m, q) => (!m || q.distanceToSquared(c) < m.distanceToSquared(c) ? q : m), null)
          : B.reduce((a, q) => a.add(q), new THREE.Vector3()).multiplyScalar(1 / B.length));
        if (oSpec.outline === 'arc') {   // a notch edge runs up and down: trace it slice by slice (3 mm)
          const S2 = {}; P.forEach(q => { const k = Math.round(q.y / 0.003); (S2[k] || (S2[k] = [])).push(q); });
          // follow the edge: each slice takes the points near where the last one ended (a slice can
          // also hold unrelated patch points elsewhere — averaging them made the line jump)
          const ks = Object.keys(S2).map(Number).sort((x, y) => x - y); ring = []; let prev = null;
          ks.forEach(k => { let Q = S2[k];
            if (prev) { const near = Q.filter(q => q.distanceTo(prev) < 0.009); if (!near.length) return; Q = near; }
            else { const m = Q.reduce((a, q) => a.add(q), new THREE.Vector3()).multiplyScalar(1 / Q.length);   // start: the biggest cluster in the lowest slice
              Q = Q.filter(q => q.distanceTo(m) < 0.008); if (!Q.length) Q = S2[k]; }
            prev = Q.reduce((a, q) => a.add(q), new THREE.Vector3()).multiplyScalar(1 / Q.length); ring.push(prev.clone()); });
        }
        ring = ring.filter(Boolean);
        if (ring.length > 5) {
          // light smoothing so the line follows the edge, not the vertex noise
          const sm = ring.map((q, i) => { const a = ring[(i - 1 + ring.length) % ring.length], b = ring[(i + 1) % ring.length];
            return oSpec.outline === 'arc' && (i === 0 || i === ring.length - 1) ? q.clone() : q.clone().multiplyScalar(0.5).addScaledVector(a, 0.25).addScaledVector(b, 0.25); });
          const curve = new THREE.CatmullRomCurve3(sm, oSpec.outline === 'loop');
          const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 160, 0.0013, 8, oSpec.outline === 'loop'),
            new THREE.MeshBasicMaterial({color: 0x46d4ff}));
          tube.renderOrder = 12; scene.add(tube);
        }
      }
      const ivf = /intervertebral foramen/.test(String(cfg.landmark).toLowerCase());   // shown as a filled opening instead (below)
      lmMark = {material: {color: {setHex: c => { if (!ivf) paintPatch(c); }}}, set visible(v) { if (v && !ivf) paintPatch(0x35c8ff); }};
      lmMark.visible = !(mode === 'find' && !back);
      // intervertebral foramen: fill the opening itself (a glowing disc each side, spanning the two
      // notches), not just the notch edges
      if (/intervertebral foramen/.test(String(cfg.landmark).toLowerCase()) && LMdef.pts) {   // (built on Click fronts too, hidden: they are the click target)
        Object.values(LMdef.ivf || {}).forEach(r => {
          // notch apices bound it (pedicle edges are a fallback: the articular processes confuse them)
          const top = r.top > -1e8 ? r.top : r.pt, bot = r.bot < 1e8 ? r.bot : r.pb;
          if (!(r.n > 4 && top > bot)) return; r.top = top; r.bot = bot;
          // the opening itself: in a side-on slice through both vertebrae at the foramen, the
          // largest empty circle near the notches (the dark hole you see from the side)
          const px = r.xs / r.n, pz0 = r.zs / r.n, Q = [];
          target.forEach(p => eachVert(p.mesh, v => { if (Math.abs(v.x - px) < 0.007) Q.push([v.z, v.y]); }));
          let bz = pz0, by = (r.top + r.bot) / 2, bd = 0;
          // (not forward into the unmodelled disc space)
          for (let zz = pz0 - 0.018; zz <= pz0 + 0.003; zz += 0.001) for (let yy = r.bot - 0.006; yy <= r.top + 0.022; yy += 0.001) {
            let dm = 1e9; for (const q of Q) { const dz = q[0] - zz, dy = q[1] - yy, d2 = dz * dz + dy * dy; if (d2 < dm) dm = d2; if (dm < bd * bd) break; }
            dm = Math.sqrt(dm); if (dm > bd) { bd = dm; bz = zz; by = yy; } }
          if (bd < 0.002) return;
          const pz = bz, cy = by, ry = Math.min(bd * 1.35, 0.013), rz = Math.min(bd * 0.95, 0.009);   // taller than wide (keyhole / ear shape)
          const pos = [px, cy, pz], idx = [], N = 40;
          for (let i = 0; i < N; i++) { const a = i / N * 2 * Math.PI; pos.push(px, cy + Math.sin(a) * ry, pz + Math.cos(a) * rz); idx.push(0, 1 + i, 1 + (i + 1) % N); }
          const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setIndex(idx);
          const disc = new THREE.Mesh(g, new THREE.MeshBasicMaterial({color: 0x35c8ff, transparent: true, opacity: 0.65, side: THREE.DoubleSide, depthWrite: false}));
          disc.renderOrder = 15; scene.add(disc); disc.visible = !(mode === 'find' && !back); ivfDiscs.push(disc);
          for (let i = 0; i <= 8; i++) { const a = i / 8 * 2 * Math.PI; lmPts.push(new THREE.Vector3(px, cy + (i < 8 ? Math.sin(a) * ry * 0.7 : 0), pz + (i < 8 ? Math.cos(a) * rz * 0.7 : 0))); }   // clicking the opening counts
        });
      }
      if (back) labels.push({text: cfg.name, pts: [LM], cls: 'hl'});
    }
    if (LM) { if (target.some(p => p.layer !== 'bone')) xray = target; }   // a patch on a deep muscle: see through what covers it
    else if (mode === 'name') {
      target.forEach(hl); xray = target;
      if (back) labels.push({text: cfg.name, parts: target, cls: 'hl'});
    } else if (mode === 'find') {
      if (isNerve) parts.forEach(p => {
        if (p.layer === 'muscle') ghost(p, 0.15);
        if (p.layer === target[0].layer && inRegion(p)) p.mesh.visible = true; });
      if (back) { target.forEach(p => paint(p, OK, 0x0a3018)); xray = target;
        labels.push({text: cfg.name, parts: target, cls: 'ok'}); }
    } else if (mode === 'attach') {
      target.forEach(hl); xray = target;
      if (back && target.some(p => p.layer === 'ligament')) labels.push({text: cfg.name, parts: target, cls: 'hl'});   // ligament attachments: the written answer (no footprints)
      else if (back) {
        // Attachments answer: only this muscle on its bones (the Muscle button brings the rest back)
        parts.forEach(p => { if (p.layer === 'muscle' && !target.includes(p)) p.mesh.visible = false; });
        target.forEach(p => ghost(p, 0.6)); footprints();   // see-through enough to show the attachments
      }
    } else if (mode === 'nerve') {
      target.forEach(hl); xray = target;
      if (back) {
        parts.forEach(p => { if (p.layer === 'muscle' && !target.includes(p)) ghost(p, 0.12); });
        target.forEach(p => ghost(p, 0.55));
        nerve.forEach(p => { p.mesh.visible = true; paint(p, 0xffe14a, 0x6a5200); });
        if (nerve.length) labels.push({text: cfg.nervename || nerve[0].name, parts: nerve.filter(p => p.name === nerve[0].name), cls: 'nerve'});
        labels.push({text: cfg.name, parts: target, cls: 'hl'});
        // (only the innervating nerve is labelled — the other nerves stay unlabelled)
        // (its bones get grey Origin / Insertion labels below)
      } else nerve.forEach(p => { p.mesh.visible = false; });
      // in a nerve view the nerves of the region stay dim so the answer isn't given away
      parts.forEach(p => { if (p.layer === 'nerve' && !nerve.includes(p) && !back) p.mesh.visible = false; });
    } else if (mode === 'nerveid') {   // a nerve card: name / course
      parts.forEach(p => { if (p.layer === 'muscle') ghost(p, 0.18); });
      // answer: the muscles this nerve supplies stay more solid (the rest stay faint)
      if (back) {
        const base = n => String(n).replace(/\.[lr]$/, '');
        const sup = new Set();
        Object.keys(SUPPLIES).forEach(k => { if (target.some(t => base(t.name) === base(k))) SUPPLIES[k].forEach(m => sup.add(base(m))); });
        if (sup.size) parts.forEach(p => { if (p.layer === 'muscle' && p.mesh.visible && sup.has(base(p.name))) ghost(p, 0.6); });
      }
      // vessels: show their branches (every vessel of the same kind in the region), dimmer
      const vl = target[0] && (target[0].layer === 'vessel' || target[0].layer === 'vein') ? target[0].layer : null;
      if (vl) {
        parts.forEach(p => { if (p.layer === vl && inRegion(p) && !target.includes(p)) { p.mesh.visible = true; ghost(p, 0.28); } });
        // the vessels it comes from / gives off (meshes that touch it): solid gray, even outside the region
        const pts = []; target.forEach(p => eachVert(p.mesh, v => pts.push(v.clone())));
        const cell = 0.004, grid = new Map(), key = (x, y, z) => x + ',' + y + ',' + z;
        pts.forEach(v => { const k = key(Math.floor(v.x / cell), Math.floor(v.y / cell), Math.floor(v.z / cell)); (grid.get(k) || grid.set(k, []).get(k)).push(v); });
        const tb = new THREE.Box3(); target.forEach(p => tb.union(p.box)); tb.expandByScalar(0.004);
        const touches = q => { if (!q.box.intersectsBox(tb)) return false; const pos = q.mesh.geometry.attributes.position, v = new THREE.Vector3();
          const step = Math.max(1, Math.floor(pos.count / 1500));
          for (let i = 0; i < pos.count; i += step) { v.fromBufferAttribute(pos, i).applyMatrix4(q.mesh.matrixWorld);
            const gx = Math.floor(v.x / cell), gy = Math.floor(v.y / cell), gz = Math.floor(v.z / cell);
            for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) for (let c = -1; c <= 1; c++) {
              const L = grid.get(key(gx + a, gy + b, gz + c)); if (L) for (const w of L) if (w.distanceToSquared(v) < 0.0025 * 0.0025) return true; } }
          return false; };
        const linked = [];
        parts.forEach(q => { if (q.layer !== vl || target.includes(q) || target.some(t => t.name === q.name)) return;
          if (touches(q)) { q.mesh.visible = true; ghost(q, 1); paint(q, 0x9a9da3, 0x101010); q._link = true; linked.push(q); } });
        // named on the answer only, at most 4 (the biggest): more labels just crowd the vessel
        if (back) linked.sort((a, b) => b.box.getSize(new THREE.Vector3()).length() - a.box.getSize(new THREE.Vector3()).length())
          .slice(0, 4).forEach(q => minor.push({text: q.name, parts: [q], cls: 'minor'}));
      }
      target.forEach(p => { p.mesh.visible = true; if (vl) hl(p); else paint(p, HL, 0x0a3a50); });
      if (back) labels.push({text: cfg.name, parts: target, cls: 'hl'});
    } else if (mode === 'action') {
      target.forEach(hl); xray = target;
    }

    // spinal canal cards (cord, meninges, roots): muscles off, vertebrae and dura as glass, the
    // rest of the skeleton faint — the canal seen through the column
    if (norm(cfg.region || '') === 'canal') {
      const isArach = target.some(t => /arachnoid/i.test(t.name)), isPia = /pia mater/i.test(cfg.name || '');
      parts.forEach(p => { if (target.includes(p)) return;
        if (p.layer === 'muscle' || p.layer === 'ligament' || (p.layer === 'capsule' && !/dura/i.test(p.name))) p.mesh.visible = false;   // ligamenta flava etc. would sheathe the cord
        else if (p.layer === 'bone') ghost(p, /vertebra|atlas|axis|sacrum|coccyx/i.test(p.name) ? 0.22 : 0.1);
        // meninges cut-away: the outer layers opened from behind so the nesting shows
        //   arachnoid card → opened dura round it; pia card → opened dura + opened arachnoid round the cord
        else if (p.name === 'Spinal dura (opened)' && (isArach || isPia)) { p.mesh.visible = true; paint(p, 0xb8956a); }   // tan: clearly not the blue asked layer
        else if (p.name === 'Arachnoid mater (opened)' && isPia) { p.mesh.visible = true; paint(p, 0xc9d6e6); }
        else if (/dura|arachnoid/i.test(p.name)) { p.mesh.visible = false; const m = p.mesh.material; m.colorWrite = false; m.depthWrite = false; m.needsUpdate = true; }   // only on its own cards: it would veil the cord (colorWrite off: stays unseen even if re-shown)
        else if (p.layer === 'nerve' && /spinal cord|cauda|root of spinal|spinal ganglion|dorsal rami/i.test(p.name)) p.mesh.visible = true;
      });
      // the asked structure sits inside the column: draw it over the vertebrae so it is never blocked
      if (!meninx) target.forEach(p => { p.mesh.visible = true; p.mesh.renderOrder = 20;
        const m = p.mesh.material; m.depthTest = false; m.transparent = true; m.opacity = 1; m.needsUpdate = true; });
    }
    // brachial plexus cards: the whole plexus stays in view (roots → terminal branches), muscles
    // faded back, so each part is seen in relation to the rest
    if (norm(cfg.region || '') === 'plexus') {
      const PLEX = /brachial plexus|musculocutaneous|axillary nerve|^radial nerve|^median nerve|^ulnar nerve|dorsal scapular|long thoracic|suprascapular nerve|pectoral nerve|subscapular nerve|thoracodorsal|medial brachial cutaneous|medial antebrachial cutaneous/i;
      parts.forEach(p => {
        if (p.layer === 'nerve' && PLEX.test(p.name)) { p.mesh.visible = true; if (!target.includes(p)) p.mesh.renderOrder = 2; }
        else if (p.layer === 'muscle' && !target.includes(p)) ghost(p, 0.1);
      });
    }
    // hidden parts of the asked structure show through as a faint glowing outline (a rim-lit
    // ghost drawn only where something is in front of it). Not on Locate fronts (the answer).
    if (target.length && !LM && !(mode === 'find' && !back)) {
      const ghostMat = new THREE.ShaderMaterial({
        vertexShader: 'varying vec3 vn; varying vec3 vv; void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.); vn = normalize(normalMatrix * normal); vv = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }',
        fragmentShader: 'varying vec3 vn; varying vec3 vv; void main(){ float r = 1. - abs(dot(normalize(vn), normalize(vv))); float a = 0.1 + 0.55 * pow(r, 2.2); gl_FragColor = vec4(0.42, 0.82, 1.0, a); }',
        transparent: true, depthTest: true, depthWrite: false, depthFunc: THREE.GreaterDepth, side: THREE.FrontSide});
      target.forEach(p => { const g = new THREE.Mesh(p.mesh.geometry, ghostMat); g.renderOrder = 20; g.raycast = () => {}; p.mesh.add(g); });
    }
    // answer side: grey lines/labels to the attachments and the innervating nerve
    if (back && target.length && !isNerve && ['name', 'find', 'attach', 'nerve', 'action'].includes(mode)) {
      // (ligaments / menisci: no automatic gray attachment labels — both ends lie on bone, the
      //  written answer names them)
      if (mode !== 'attach' && !LM && !target.some(p => p.layer === 'ligament' || p.layer === 'capsule' || p.layer === 'bone')) footprints(true);
      if (mode !== 'nerve' && mode !== 'attach' && nerve.length) {   // (attachments: no nerve — Nerve button if wanted)
        nerve.forEach(p => { p.mesh.visible = true; paint(p, 0xd9c070, 0x2a2200); });
        const nn = nerve[0].name;
        minor.push({text: 'Nerve · ' + nn, parts: nerve.filter(p => p.name === nn), cls: 'minor'});
      }
    }
    // ---- attachments: bone surface touching the muscle, split proximal / distal ----
    // which model bones a card's Origin / Insertion text names (upper limb: the shoulder muscles'
    // origins aren't simply "the top end", so the text decides where it can)
    function textBones(t) {
      t = String(t || '').toLowerCase(); if (!t) return new Set();
      const B = new Set(), has = n => parts.some(p => p.name === n && p.layer === 'bone');
      const R = [['Scapula', /scapul|coracoid|acromion|glenoid|supraspinous|infraspinous|subscapular fossa|inferior angle|lateral border/],
        ['Clavicle', /clavic/], ['Humerus', /humer|intertubercular|deltoid tuberosity|epicondyle|supracondylar|tubercle of the humerus/],
        ['Radius', /radius|radial tuberosity|radial shaft|supinator crest(?!)/], ['Ulna', /ulna\b|ulna |olecranon|coronoid|ulnar tuberosity|supinator crest/],
        ['Pisiform bone', /pisiform/], ['Hamate bone', /hamate/], ['Trapezium bone', /trapezium/], ['Trapezoid bone', /trapezoid/],
        ['Capitate bone', /capitate/], ['Scaphoid bone', /scaphoid/], ['Lunate bone', /lunate/], ['Triquetrum bone', /triquetrum/],
        ['Femur', /femur|trochanter|linea aspera|femoral/], ['Tibia', /tibia/], ['Fibula', /fibula/], ['Hip bone', /ilium|ischi|pubi|iliac|hip bone/],
        ['Sacrum', /sacrum|sacral/], ['Calcaneus', /calcane/], ['Patella', /patell/]];
      const base = q => q.name.replace(/\.[lr]$/, '');
      R.forEach(([n, re]) => { if (re.test(t)) parts.forEach(q => { if (q.layer === 'bone' && base(q) === n) B.add(q.name); }); });
      // trunk: vertebrae, ribs, skull, sacrum (names as in the trunk model)
      const T = [[/spinous|vertebra|transverse process|nuchal|lamina/, q => /^(vertebra |atlas|axis)/i.test(q.name)],
        [/\bribs?\b|costal/, q => /\brib\b/i.test(q.name)], [/occipit|mastoid|skull/, q => /occipital|temporal/i.test(q.name)],
        [/sacrum|sacral/, q => /^sacrum/i.test(q.name)], [/cervical/, q => /^(vertebra c|atlas|axis)/i.test(q.name)],
        [/thoracic/, q => /^vertebra t/i.test(q.name)]];
      T.forEach(([re, f]) => { if (re.test(t)) parts.forEach(q => { if (q.layer === 'bone' && f(q)) B.add(q.name); }); });
      if (/cervical/.test(t) && /thoracic/.test(t)) {} else if (/cervical/.test(t)) [...B].forEach(n => { if (/^vertebra [tl]/i.test(n)) B.delete(n); });
      else if (/thoracic/.test(t)) [...B].forEach(n => { if (/^(vertebra [cl]|atlas|axis)/i.test(n)) B.delete(n); });
      const ORD = {first: /1st|first|thumb/, second: /2nd|second|index/, third: /3rd|third/, fourth: /4th|fourth/, fifth: /5th|fifth|little/};
      const rng = t.match(/(\d)(?:st|nd|rd|th)?\s*[–-]\s*(\d)/);
      const want = new Set(); Object.keys(ORD).forEach(k => { if (ORD[k].test(t)) want.add(k); });
      if (rng) ['first', 'second', 'third', 'fourth', 'fifth'].slice(+rng[1] - 1, +rng[2]).forEach(k => want.add(k));
      if (/metacarpal/.test(t)) parts.forEach(p => { const m = p.name.match(/^(\w+) metacarpal bone$/i);
        if (m && (!want.size || want.has(m[1].toLowerCase()))) B.add(p.name); });
      if (/phalan/.test(t)) { const types = ['proximal', 'middle', 'distal'].filter(x => t.indexOf(x) >= 0);
        parts.forEach(p => { const m = p.name.match(/^(proximal|middle|distal) phalanx of (\w+) finger of hand$/i);
          if (m && (!types.length || types.includes(m[1].toLowerCase())) && (!want.size || want.has(m[2].toLowerCase()))) B.add(p.name); }); }
      return B;
    }
    function footprints(quiet, fallback) {   // quiet: no colouring, grey context labels only
      const TB = {o: textBones(cfg.origin), i: textBones(cfg.insertion)};
      const pts = [];
      target.forEach(p => eachVert(p.mesh, v => pts.push(v.clone())));
      if (!pts.length) return;
      const cell = 0.006, grid = new Map(), keyOf = (x, y, z) => x + ',' + y + ',' + z;
      pts.forEach(v => { const k = keyOf(Math.floor(v.x / cell), Math.floor(v.y / cell), Math.floor(v.z / cell));
        (grid.get(k) || grid.set(k, []).get(k)).push(v); });
      const mb = new THREE.Box3(); target.forEach(p => mb.union(p.box));
      // origin = contact in the top 35% of the muscle's length, insertion = bottom 22%;
      // where the belly merely lies on a bone (the middle) is not an attachment
      const len = mb.max.y - mb.min.y, yO = mb.max.y - 0.35 * len, R = 0.0065;
      // insertion = where the muscle actually ends: the point farthest from its top (a tendon
      // that runs across the sole, like fibularis longus, slides past bones it doesn't insert on)
      let top = pts[0]; pts.forEach(v => { if (v.y > top.y) top = v; });
      let end = pts[0], ed = -1; pts.forEach(v => { const dd = v.distanceToSquared(top); if (dd > ed) { ed = dd; end = v; } });
      const yI = mb.min.y + 0.22 * len;
      // does anything touch bone right at the end? (else fall back to the bottom of the muscle)
      let endTouch = false;
      { const cell2 = cell; parts.forEach(b => { if (endTouch || b.layer !== 'bone' || !b.mesh.visible) return;
          if (b.box.distanceToPoint(end) > 0.02) return;
          eachVert(b.mesh, v => { if (!endTouch && v.distanceTo(end) < 0.015) endTouch = true; }); }); }
      const nearEnd = fallback ? (v => v.y <= yI) : (v => v.distanceTo(end) < (endTouch ? 0.03 : 0.05) && v.y <= yI + 0.02);
      const sets = {o: [], i: []}, fp = {};
      const textMode = !fallback && TB.o.size && TB.i.size && [...TB.o].some(n => !TB.i.has(n)) && [...TB.i].some(n => !TB.o.has(n));
      parts.forEach(b => {
        if (b.layer !== 'bone' || !b.mesh.visible || !b.box.clone().expandByScalar(0.01).intersectsBox(mb)) return;
        const g = b.mesh.geometry, pos = g.attributes.position, n = pos.count;
        const col = new Float32Array(n * 3), base = new THREE.Color(b.mesh.userData.base);
        const co = new THREE.Color(ORIG), ci = new THREE.Color(INS), v = new THREE.Vector3();
        let any = false; const bp = [], bo = [], bi = [];
        for (let i = 0; i < n; i++) {
          v.fromBufferAttribute(pos, i).applyMatrix4(b.mesh.matrixWorld);
          let hit = false;
          const gx = Math.floor(v.x / cell), gy = Math.floor(v.y / cell), gz = Math.floor(v.z / cell);
          for (let a = -1; a <= 1 && !hit; a++) for (let c = -1; c <= 1 && !hit; c++) for (let d = -1; d <= 1 && !hit; d++) {
            const L = grid.get(keyOf(gx + a, gy + c, gz + d));
            if (L) for (const q of L) if (q.distanceToSquared(v) < R * R) { hit = true; break; }
          }
          let kind = !hit ? 0 : nearEnd(v) ? 2 : v.y >= yO ? 1 : 0;
          if (hit && textMode) { const io = TB.o.has(b.name), ii = TB.i.has(b.name); kind = io && !ii ? 1 : ii && !io ? 2 : io && ii ? kind : 0; }
          const c3 = kind === 1 ? co : kind === 2 ? ci : base;
          col[i * 3] = c3.r; col[i * 3 + 1] = c3.g; col[i * 3 + 2] = c3.b;
          if (kind) { any = true; (kind === 1 ? sets.o : sets.i).push(v.clone()); bp.push(v.clone()); (kind === 1 ? bo : bi).push(v.clone()); }
        }
        const bn = b.name === 'Hip bone' ? 'Hip bone' : b.name.replace(/ bone$/, '');
        // one label per bone name (a bone can be several meshes), kept only if it is a real share
        const add = (k, P) => { if (P.length < 6) return; const key = k + bn;
          if (fp[key]) fp[key].pts.push(...P); else fp[key] = {k, text: (quiet ? k + ' · ' : '') + bn, pts: P.slice()}; };
        add('Origin', bo); add('Insertion', bi);
        if (quiet) return;
        if (any) {
          g.setAttribute('color', new THREE.BufferAttribute(col, 3));
          b.mesh.material.vertexColors = true; b.mesh.material.color.setHex(0xffffff); b.mesh.material.needsUpdate = true;
        }
      });
      // nothing labelable at the end → fall back to the bottom of the muscle
      if (!fallback && (!Object.values(fp).some(f => f.k === 'Insertion') || (textMode && !Object.values(fp).some(f => f.k === 'Origin')))) { parts.forEach(b => { if (b.layer === 'bone' && b.mesh.material.vertexColors) { b.mesh.geometry.deleteAttribute('color'); b.mesh.material.vertexColors = false; b.mesh.material.color.setHex(b.mesh.userData.base); b.mesh.material.needsUpdate = true; } }); return footprints(quiet, true); }
      ['Origin', 'Insertion'].forEach(k => {
        // keep the bones at the very end of the muscle: origin = within 2.5 cm of its highest
        // contact, insertion = within 2.5 cm of its lowest (a tendon reaches past the bones it slides over)
        const L = Object.values(fp).filter(f => f.k === k);
        const ext = f => k === 'Origin' ? Math.max(...f.pts.map(v => v.y)) : -Math.min(...f.pts.map(v => v.y));
        const best = textMode ? -1e9 : Math.max(-1e9, ...L.map(ext));
        L.filter(f => ext(f) >= best - 0.025).sort((a, b) => b.pts.length - a.pts.length).slice(0, 2)   // at most two bones
          .forEach(f => minor.push({text: f.text, pts: f.pts, cls: 'minor'}));
      });
      if (quiet) return;
      labels.push({text: cfg.name, parts: target, cls: 'hl'});
      if (sets.o.length) labels.push({text: 'Origin', pts: sets.o, cls: 'orig'});
      if (sets.i.length) labels.push({text: 'Insertion', pts: sets.i, cls: 'ins'});
    }
    function eachVert(mesh, f) {
      const pos = mesh.geometry.attributes.position, v = new THREE.Vector3();
      for (let i = 0; i < pos.count; i++) f(v.fromBufferAttribute(pos, i).applyMatrix4(mesh.matrixWorld));
    }

    // ---- peel ----
    let level = 0;
    const peelUI = (mode === 'peel' && peel.length) ? document.createElement('div') : null;
    function setPeel(k) {
      level = Math.max(0, Math.min(peel.length, k));
      peel.forEach((g, gi) => g.forEach(p => { p.mesh.visible = gi >= level && inRegion(p); paint(p, p.mesh.userData.base); }));
      labels.length = 0;
      if (back && level < peel.length) {
        const seen = {};
        peel[level].forEach(p => { hl(p); const t = p.name.replace(/ muscle$/, '');
          if (seen[t]) seen[t].parts.push(p); else if (Object.keys(seen).length < 6) labels.push(seen[t] = {text: t, parts: [p], cls: 'hl'}); });
      }
      if (peelUI) { peelUI.querySelector('input').value = level;
        peelUI.querySelector('span').textContent = level ? 'Removed: ' + level + ' layer' + (level > 1 ? 's' : '') : 'All layers'; }
      layout(); dirty = true;
    }
    if (peelUI) {
      peelUI.className = 'jka-peel';
      peelUI.innerHTML = '<input type="range" min="0" max="' + peel.length + '" step="1"><span></span>';
      peelUI.querySelector('input').oninput = e => setPeel(+e.target.value);
      wrap.appendChild(peelUI);
    }

    // ---- camera ----
    const cam = new THREE.PerspectiveCamera(30, 1, 0.01, 20);
    const ctl = new FreeOrbit(cam, renderer.domElement);
    ctl.enableDamping = true; ctl.dampingFactor = 0.12; ctl.screenSpacePanning = true;
    ctl.enableZoom = false;   // own wheel zoom below (trackpad deltas are tiny; Anki eats some)
    // The camera always orbits the structure's centre (ctl.target never moves). Panning slides
    // the picture on screen instead (a projection offset), so rotating after a pan still turns
    // the model about its own centre.
    ctl.enablePan = false;
    ctl.mouseButtons = {LEFT: THREE.MOUSE.ROTATE, MIDDLE: null, RIGHT: null};
    const pan = new THREE.Vector2();          // px, + = picture moved right / down
    let baseY = 0;                             // lifts the picture into the unfaded band
    function applyView() {
      if (!VW) return;
      cam.setViewOffset(VW, VH, -pan.x, -pan.y + baseY, VW, VH); cam.updateProjectionMatrix();
    }
    const cvs = renderer.domElement;
    // right-drag pans: keep Anki's / the page's context menu off the model
    cvs.addEventListener('contextmenu', ev => { ev.preventDefault(); ev.stopImmediatePropagation(); }, true);
    root.addEventListener('contextmenu', ev => { if (ev.target === cvs) { ev.preventDefault(); ev.stopPropagation(); } }, true);
    let panDrag = null;
    cvs.addEventListener('pointerdown', ev => {
      if (!(ev.button === 2 || ev.button === 1 || (ev.button === 0 && ev.shiftKey))) return;
      ev.preventDefault(); ev.stopImmediatePropagation();
      panDrag = {x: ev.clientX, y: ev.clientY, x0: ev.clientX, y0: ev.clientY, b: ev.button}; cvs.setPointerCapture(ev.pointerId); touched(); ease = null;
    }, true);
    cvs.addEventListener('pointermove', ev => {
      if (!panDrag) return;
      const r = cvs.getBoundingClientRect(), sc = VW / r.width;
      pan.x += (ev.clientX - panDrag.x) * sc; pan.y += (ev.clientY - panDrag.y) * sc;
      panDrag.x = ev.clientX; panDrag.y = ev.clientY;
      applyView(); moved(); if (!back) keepCam();
    });
    cvs.addEventListener('pointerup', ev => {   // a right-click that didn't drag = reflect
      if (panDrag && panDrag.b === 2 && Math.hypot(ev.clientX - panDrag.x0, ev.clientY - panDrag.y0) < 5) reflectAt(ev.clientX, ev.clientY);
      panDrag = null; });
    cvs.addEventListener('pointercancel', () => { panDrag = null; });
    // scroll / pinch zooms toward the pointer: the point under the cursor stays put
    function zoomAt(cx, cy, k) {   // zoom by k (distance factor) keeping the surface under (cx, cy) fixed
      const off = cam.position.clone().sub(ctl.target), dist0 = off.length();
      const dist1 = Math.max(radOn ? 0.15 : 0.04, Math.min(radOn ? 14 : 3, dist0 * k)), s = dist1 / dist0;
      const r = cvs.getBoundingClientRect();
      const nx = (cx - r.left) / r.width * 2 - 1, ny = -(cy - r.top) / r.height * 2 + 1;
      // anchor: the surface actually under the pointer (else the orbit centre's depth)
      ray.setFromCamera(new THREE.Vector2(nx, ny), cam); ray.far = Infinity;
      const hit = ray.intersectObjects(parts.filter(p => p.mesh.visible && p.mesh.material.opacity > 0.3).map(p => p.mesh), false)[0];
      const P = hit ? hit.point.clone() : ctl.target.clone();
      const before = P.clone().project(cam);
      cam.position.copy(ctl.target).addScaledVector(off, s); cam.updateMatrixWorld(); applyView();
      const after = P.clone().project(cam);
      // shift the picture so the anchor lands back exactly under the pointer
      pan.x += (before.x - after.x) / 2 * VW; pan.y -= (before.y - after.y) / 2 * VH; applyView();
      ctl.update(); moved(); if (!back) keepCam();
    }
    cvs.addEventListener('wheel', ev => {
      ev.preventDefault(); ev.stopPropagation();
      let dy = ev.deltaY * (ev.deltaMode === 1 ? 33 : ev.deltaMode === 2 ? 400 : 1);
      if (ev.ctrlKey) dy *= 3;                       // trackpad pinch arrives as ctrl+wheel
      zoomAt(ev.clientX, ev.clientY, Math.exp(Math.max(-0.6, Math.min(0.6, dy * 0.0035))));
    }, {passive: false});
    // ---- touch (AnkiMobile / AnkiDroid) ----
    // one finger rotates (the orbit control); two fingers pinch-zoom + pan; a long press or a
    // double-tap reflects. Touches on the model never reach the reviewer's tap-to-answer zones.
    const touches = new Map(); let pinch = null, lp = 0;
    // Touches: a plain TAP anywhere (model included) goes through untouched, so AnkiMobile /
    // AnkiDroid show the answer or grade with Janki's flare. Only gestures are kept: a one-finger
    // drag (rotate — once it moves it's no longer a tap) and two fingers (pinch / pan).
    let tMoved = false, tX = 0, tY = 0;
    cvs.addEventListener('touchstart', ev => {
      if (ev.touches.length === 1) { tMoved = false; tX = ev.touches[0].clientX; tY = ev.touches[0].clientY; }
      if (ev.touches.length > 1 && ev.cancelable) ev.preventDefault();   // no browser zoom; not a tap
    }, {passive: false});
    cvs.addEventListener('touchmove', ev => {
      const t = ev.touches[0];
      if (t && (Math.abs(t.clientX - tX) > 6 || Math.abs(t.clientY - tY) > 6)) tMoved = true;
      if (ev.cancelable) ev.preventDefault();   // no page scroll while rotating (the flare still sees the move)
    }, {passive: false});
    cvs.addEventListener('touchend', ev => {
      if (tMoved || ev.touches.length) { ev.stopPropagation(); if (ev.cancelable) ev.preventDefault(); return; }   // a drag: not a tap
      // Click cards (front): a tap ON a structure is the answer attempt — never also reveal the card;
      // a tap on empty space still goes through and reveals
      if (mode === 'find' && !back) {
        const t = ev.changedTouches[0], r = cvs.getBoundingClientRect();
        ray.setFromCamera(new THREE.Vector2((t.clientX - r.left) / r.width * 2 - 1, -(t.clientY - r.top) / r.height * 2 + 1), cam); ray.far = Infinity;
        if (ray.intersectObjects(parts.filter(p => p.mesh.visible && p.mesh.material.opacity > 0.3).map(p => p.mesh), false).length) {
          ev.stopPropagation(); if (ev.cancelable) ev.preventDefault();
        }
      }
    }, {passive: false});
    cvs.addEventListener('pointerdown', ev => {
      if (ev.pointerType !== 'touch') return;
      touches.set(ev.pointerId, [ev.clientX, ev.clientY]);
      clearTimeout(lp);
      if (touches.size === 1) { const x0 = ev.clientX, y0 = ev.clientY;
        lp = setTimeout(() => { const t = touches.get(ev.pointerId);
          if (t && touches.size === 1 && Math.hypot(t[0] - x0, t[1] - y0) < 8) { ctl.drag = null; ctl.spin = null; reflectAt(x0, y0); } }, 550); }
      if (touches.size === 2) {
        ctl.drag = null; ctl.multi = true; touched();
        const [a, b] = [...touches.values()];
        pinch = {d: Math.hypot(a[0] - b[0], a[1] - b[1]), m: [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], ang: Math.atan2(b[1] - a[1], b[0] - a[0])};
      }
    }, true);
    cvs.addEventListener('pointermove', ev => {
      if (ev.pointerType !== 'touch' || !touches.has(ev.pointerId)) return;
      touches.set(ev.pointerId, [ev.clientX, ev.clientY]);
      if (touches.size !== 2 || !pinch) return;
      ev.stopImmediatePropagation();
      const [a, b] = [...touches.values()], d = Math.hypot(a[0] - b[0], a[1] - b[1]), m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      const r = cvs.getBoundingClientRect(), sc = VW / r.width;
      pan.x += (m[0] - pinch.m[0]) * sc; pan.y += (m[1] - pinch.m[1]) * sc; applyView();
      if (d > 10 && pinch.d > 10) zoomAt(m[0], m[1], pinch.d / d);
      // twist: turning the two fingers rolls the model about the line of sight
      const ang = Math.atan2(b[1] - a[1], b[0] - a[0]); let da = ang - pinch.ang;
      while (da > Math.PI) da -= 2 * Math.PI; while (da < -Math.PI) da += 2 * Math.PI;
      // (twist-to-roll removed with free rotation: the limb stays upright)
      pinch = {d, m, ang}; moved();
    }, true);
    const lift = ev => { if (ev.pointerType !== 'touch') return; touches.delete(ev.pointerId); clearTimeout(lp);
      if (touches.size < 2) { pinch = null; if (!touches.size) ctl.multi = false; } };
    cvs.addEventListener('pointerup', lift, true); cvs.addEventListener('pointercancel', lift, true);
    const center = (tbox.isEmpty() ? focus : tbox).getCenter(new THREE.Vector3());
    if (mode === 'find' || mode === 'peel') focus.getCenter(center);
    const fbox = (mode === 'find' || mode === 'peel' || tbox.isEmpty()) ? focus : tbox;
    const size = fbox.getSize(new THREE.Vector3());
    const d = dir(cfg.cam, left);
    let radOn = false, rad = null, radWant = false;   // radWant: opening in X-ray — draw nothing until it's on   // X-ray mode (declared early: fit() reads it)
    // the view widget and the layer list sit against the window's left edge (the card's own
    // margins would otherwise inset them)
    // fill exactly the space left under the prompt (Janki zooms card content to fit, so a
    // 100vh-based height could overflow and let the card scroll)
    function fitHeight() {
      // phones: one fixed CSS height on both sides, so revealing the answer never resizes the model
      if (window.matchMedia && (matchMedia('(hover: none)').matches || matchMedia('(max-width: 720px)').matches)) { wrap.style.height = ''; return; }
      const sc = document.getElementById('jk-sc') || document.scrollingElement || document.documentElement;
      const R = wrap.getBoundingClientRect(), z = R.height / Math.max(1, wrap.offsetHeight) || 1;
      const rc = root.closest('.jka-split'), rt = rc && rc.querySelector('.jka-right');
      // phones: the answer stacks UNDER the model — leave room for it
      const stacked = rt && getComputedStyle(rc).display === 'block';
      let below = 0;
      if (stacked) { rt.style.height = 'auto'; rt.style.maxHeight = 'none'; wrap.style.height = ''; return; }   // phones' answer side: CSS height (iOS measures too early)
      const avail = (window.innerHeight || sc.clientHeight) - Math.max(0, R.top) - below - 8;
      if (avail < 200) return;
      const hpx = Math.floor(avail / z) + 'px';
      // only re-size for a real change (tiny re-fits while Janki settles made the view blink)
      if (Math.abs((parseFloat(wrap.style.height) || 0) - parseFloat(hpx)) > 4) wrap.style.height = hpx;
      if (rt && !stacked) { rt.style.height = hpx; rt.style.maxHeight = hpx; }
    }
    function edgeAlign() {
      fitHeight();
      // desktop: the layer list is centred on the WINDOW's middle (not the view's, which sits lower)
      try {
        const ch = wrap.querySelector(':scope > .jka-chips');
        if (ch && !(window.matchMedia && (matchMedia('(hover: none)').matches || matchMedia('(max-width: 720px)').matches))) {
          const R = wrap.getBoundingClientRect(), z = R.height / Math.max(1, wrap.offsetHeight) || 1;
          ch.style.setProperty('top', Math.round((innerHeight / 2 - R.top) / z) + 'px', 'important');
        }
      } catch (x) {}
      // (X-ray shows a framed film box: there they sit just inside its edge instead)
      const off = radOn ? -10 : Math.max(0, wrap.getBoundingClientRect().left);
      wrap.querySelectorAll(':scope > .jka-views, :scope > .jka-chips').forEach(el => { el.style.marginLeft = (-off) + 'px'; });
    }
    window.addEventListener('resize', () => edgeAlign());
    let VW = 600, VH = 400;
    function fit() {
      const host = renderer.domElement.parentElement || wrap;
      const w = host.clientWidth || 600, h = (host.clientHeight || 400) - (radOn && host === wrap ? 48 : 0);
      VW = w; VH = h;
      renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); applyView();
      edgeAlign();
      svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    }
    fit();
    const across = Math.abs(d.x) > Math.abs(d.z) ? size.z : size.x;
    // the view fades out over its top 9% and bottom 20%: fit the structure inside the clear
    // band (≈ 68% of the height) and centre it on that band, not on the whole view
    const FADE_T = 0.09, FADE_B = 0.20, band = 1 - FADE_T - FADE_B - 0.03;
    // small structures (a ligament, a short muscle) still get some surroundings: ≥ ~22 cm framed
    const span = Math.max(0.22, Math.max(size.y, across / cam.aspect) / band + 0.02);
    const tanH = Math.tan(THREE.MathUtils.degToRad(15));
    const dist = Math.min(2.5, Math.max(0.15, span / 2 / tanH + across / 2));
    const viewH = 2 * (dist - across / 2) * tanH;
    baseY = ((FADE_B - FADE_T) / 2) * VH * (1 - Math.abs(d.y)); applyView();
    ctl.target.copy(center); cam.position.copy(center).addScaledVector(d, dist); cam.up.copy(upFor(d)); cam.lookAt(center);
    // the back opens on the view the front was left at (rotated / zoomed / panned), so
    // the model slides left from exactly where it was
    const camKey = cfg.mode + '|' + cfg.name + '|' + cfg.meshes + '|' + (cfg.peel || []).join('/');
    const kept = window.__jkaCam;
    // …then eases to the back's own framing while it slides left
    let ease = null;
    if (back && kept && kept.key === camKey) {
      ease = {p0: kept.pos.clone(), t0: ctl.target.clone(), p1: cam.position.clone(), t1: ctl.target.clone(), s: 0,
              q0: (kept.pan || new THREE.Vector2()).clone(), q1: new THREE.Vector2()};
      cam.position.copy(kept.pos).sub(kept.target).add(ctl.target); ease.p0.copy(cam.position);
      if (kept.pan) { pan.copy(kept.pan); applyView(); }
      ['pointerdown', 'wheel'].forEach(ev => renderer.domElement.addEventListener(ev, () => { ease = null; }, true));
      // the asked structure still in view from where the front was left? then don't turn back to
      // the default angle — keep that view (it only slides left with the answer)
      try {
        cam.updateMatrixWorld(); cam.updateProjectionMatrix();
        const fr = new THREE.Frustum().setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(cam.projectionMatrix, cam.matrixWorldInverse));
        const rc = new THREE.Raycaster(), vis = parts.filter(p => p.mesh.visible).map(p => p.mesh), tm = new Set(target.map(p => p.mesh));
        let n = 0, ok = 0; const v = new THREE.Vector3();
        const pts = LM && lmPts.length ? lmPts.filter((_, i) => i % Math.max(1, Math.floor(lmPts.length / 16)) === 0) : [];
        if (!pts.length) target.forEach(p => { const pos = p.mesh.geometry.attributes.position, st = Math.max(1, Math.floor(pos.count / 12));
          for (let i = 0; i < pos.count; i += st) pts.push(v.fromBufferAttribute(pos, i).applyMatrix4(p.mesh.matrixWorld).clone()); });
        pts.forEach(q => { n++; if (!fr.containsPoint(q)) return;
          const dir = q.clone().sub(cam.position), d = dir.length(); rc.set(cam.position, dir.normalize()); rc.far = d + 0.002;
          const h = rc.intersectObjects(vis, false)[0];
          if (!h || tm.has(h.object) || h.distance > d - 0.004) ok++; });
        if (n && ok / n >= 0.35) { ease.p1 = ease.p0.clone(); ease.keep = true; }
      } catch (x) {}
    }
    const keepCam = () => { window.__jkaCam = {key: camKey, pos: cam.position.clone(), target: ctl.target.clone(), pan: pan.clone()}; };
    ctl.minDistance = 0.05; ctl.maxDistance = 3;
    ctl.update();

    // ---- x-ray: whatever sits between the camera and the structure goes see-through ----
    const ray = new THREE.Raycaster();
    let samples = [];
    xray.forEach(p => { const pos = p.mesh.geometry.attributes.position, step = Math.max(1, Math.floor(pos.count / 24));
      for (let i = 0; i < pos.count; i += step) samples.push(new THREE.Vector3().fromBufferAttribute(pos, i).applyMatrix4(p.mesh.matrixWorld)); });
    const ghosted = new Set();
    const AUTO_SEE_THROUGH = false;   // shelved (2026-11-17): occluders no longer turn see-through on their own
    function doXray() {
      if (!AUTO_SEE_THROUGH || !samples.length || xrOn) return;
      const hit = new Set();
      // only soft tissue goes see-through automatically; bones / ligaments stay solid (reflect them by hand)
      const vis = parts.filter(p => p.mesh.visible && !xray.includes(p) && !p._glass && (p.layer === 'muscle' || p.layer === 'vessel')).map(p => p.mesh);
      for (const s of samples) {
        const dirv = s.clone().sub(cam.position), len = dirv.length();
        ray.set(cam.position, dirv.normalize()); ray.far = len - 0.002;
        for (const h of ray.intersectObjects(vis, false)) hit.add(h.object);
      }
      parts.forEach(p => {
        if (hit.has(p.mesh) !== ghosted.has(p)) dirty = true;
        if (hit.has(p.mesh) && !ghosted.has(p)) { ghosted.add(p); p._a = p.mesh.material.opacity; ghost(p, 0.18); }
        else if (!hit.has(p.mesh) && ghosted.has(p)) { ghosted.delete(p); ghost(p, p._a == null ? 1 : p._a); }
      });
    }

    // ---- labels (ported from the embryology engine's callouts) ----
    // Plain-text labels in a column left / right of the model with a thin elbow line to a
    // point on the VISIBLE middle of their part. The line is solid up to the model's
    // silhouette and dashed beyond it when the point is hidden behind tissue. Column side
    // has hysteresis; targets are low-passed and the label rides a damped spring.
    const lab = document.createElement('div'); lab.className = 'jka-labels'; wrap.appendChild(lab);
    let els = [];
    const LS = {side: {}, tg: {}, pos: {}}, GAP = 6, SK = 90, SDAMP = 2 * Math.sqrt(90), SPEED = 500;
    function samplesOf(L) {
      if (!L.pts) { L.pts = []; L.parts.forEach(p => eachVert(p.mesh, v => L.pts.push(v.clone()))); }
      const step = Math.max(1, Math.floor(L.pts.length / 48));
      return L.pts.filter((_, i) => i % step === 0);
    }
    function centreOf(P) {
      const c = P.reduce((a, v) => a.add(v), new THREE.Vector3()).multiplyScalar(1 / Math.max(1, P.length));
      let best = P[0], bd = 1e9; P.forEach(v => { const d = v.distanceToSquared(c); if (d < bd) { bd = d; best = v; } });
      return best || c;
    }
    function layout() {
      lab.innerHTML = ''; svg.innerHTML = '';
      els = labels.map(L => {
        const el = document.createElement('div'); el.className = 'jka-label ' + (L.cls || ''); el.textContent = L.text;
        lab.appendChild(el);
        const S = samplesOf(L);
        const a0 = centreOf(S);
        return {L, k: L.text, el, S, aT: a0, a: a0.clone(), hid: false, w: 0, h: 0};
      });
      checksDue = true;
      try { document.fonts && document.fonts.ready.then(() => { els.forEach(o => { o.w = 0; }); labDirty = true; }); } catch (x) {}
    }
    // silhouette mask (what the model covers on screen), for where a hidden line turns dashed
    const MW = 160; let MH = 100, mask = null, maskRT = null;
    const white = new THREE.MeshBasicMaterial({color: 0xffffff});
    function buildMask() {
      MH = Math.max(40, Math.round(MW * VH / Math.max(1, VW)));
      if (!maskRT || maskRT.height !== MH) { if (maskRT) maskRT.dispose(); maskRT = new THREE.WebGLRenderTarget(MW, MH); viewDisp.push(maskRT); mask = new Uint8Array(MW * MH * 4); }
      const off = parts.filter(p => p.mesh.visible && p.mesh.material.opacity < 0.5);
      off.forEach(p => { p.mesh.visible = false; });
      const bg = scene.background; scene.overrideMaterial = white;
      renderer.setRenderTarget(maskRT); renderer.setClearColor(0x000000, 0); renderer.clear(); renderer.render(scene, cam);
      renderer.readRenderTargetPixels(maskRT, 0, 0, MW, MH, mask);
      renderer.setRenderTarget(null); scene.overrideMaterial = null; scene.background = bg;
      off.forEach(p => { p.mesh.visible = true; });
    }
    const hitPx = (x, y) => {
      if (!mask) return false;
      const mx = Math.floor(x / VW * MW), my = MH - 1 - Math.floor(y / VH * MH);
      return mx >= 0 && my >= 0 && mx < MW && my < MH && mask[(my * MW + mx) * 4 + 3] > 0;
    };
    // anchors: the visible samples' middle; if none is visible, the part's middle (line dashed)
    function occl() {
      const blockers = parts.filter(p => p.mesh.visible && p.mesh.material.opacity >= 0.5).map(p => p.mesh);
      els.forEach(o => {
        const own = new Set((o.L.parts || []).map(p => p.mesh)), vis = [];
        o.S.forEach(v => {
          const dv = v.clone().sub(cam.position), len = dv.length();
          ray.set(cam.position, dv.normalize()); ray.far = len - 0.002;
          const h = ray.intersectObjects(blockers, false).find(i => !own.has(i.object));
          if (!h) vis.push(v);
        });
        const hid = !vis.length;
        // keep the current point while it is still visible and not far off the visible
        // middle (no hopping between near-equal points); otherwise move to the new middle
        let a = o.aT;
        // attachment footprints (point sets, not parts) are small: their point never moves,
        // only the line style changes. Hidden parts keep the last point that was visible.
        if (!o.L.parts || hid) a = o.aT;
        else {
          const c = centreOf(vis), span = o.S.length > 1 ? o.S[0].distanceTo(o.S[o.S.length - 1]) : 0.05;
          if (!vis.includes(o.aT) || o.aT.distanceTo(c) > 0.3 * Math.max(0.02, span)) a = c;
        }
        if (hid !== o.hid || a !== o.aT) { o.hid = hid; o.aT = a; labDirty = true; }
      });
      buildMask(); labDirty = true;
      els.forEach(o => { o.w = 0; });   // re-measure (fonts may have loaded since)
    }
    function cut(x0, y0, x1, y1) {
      const N = 40; let prev = 0;
      for (let i = 1; i <= N; i++) {
        const t = i / N;
        if (hitPx(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t)) {
          let lo = prev, hi = t;
          for (let j = 0; j < 6; j++) { const m = (lo + hi) / 2; if (hitPx(x0 + (x1 - x0) * m, y0 + (y1 - y0) * m)) hi = m; else lo = m; }
          return [x0 + (x1 - x0) * hi, y0 + (y1 - y0) * hi];
        }
        prev = t;
      }
      return [x1, y1];
    }
    const fCorners = []; for (let i = 0; i < 8; i++) fCorners.push(new THREE.Vector3(
      i & 1 ? fbox.max.x : fbox.min.x, i & 2 ? fbox.max.y : fbox.min.y, i & 4 ? fbox.max.z : fbox.min.z));
    let labT = 0, labDirty = true, obsCache = null, obsAt = 0;
    function obstacles() {   // widget boxes in view coordinates (cached; they rarely move)
      const now = performance.now(); if (obsCache && now - obsAt < 1000) return obsCache;
      const W = wrap.getBoundingClientRect(), sx = VW / Math.max(1, W.width), sy = VH / Math.max(1, W.height);
      obsCache = ['.jka-views', '.jka-chips', '.jka-zoom', '.jka-peel', '.jka-ct', '.jka-refl'].map(s => wrap.querySelector(s)).filter(Boolean).map(el => {
        let r = el.getBoundingClientRect();
        if (el.classList.contains('jka-views')) {   // its visible parts only (hover-shown, so always reserved)
          const parts = [...el.children].map(c => c.getBoundingClientRect()).filter(b => b.width);
          if (parts.length) r = {left: Math.min(...parts.map(b => b.left)), top: Math.min(...parts.map(b => b.top)),
            right: Math.max(...parts.map(b => b.right)), bottom: Math.max(...parts.map(b => b.bottom))};
        }
        const o = {l: (r.left - W.left) * sx, t: (r.top - W.top) * sy, r: (r.right - W.left) * sx, b: (r.bottom - W.top) * sy};
        o.top = (o.t + o.b) / 2 < VH / 2; return o;
      }).filter(o => o.r > o.l);
      obsAt = now; return obsCache;
    }
    function place(now) {   // returns true while labels are still moving
      const dt = labT ? Math.min(64, now - labT) : 16; labT = now;
      const w = VW, h = VH; let moving = false;
      // the model's screen box
      let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
      fCorners.forEach(c => { const p = c.clone().project(cam), x = (p.x + 1) / 2 * w, y = (1 - p.y) / 2 * h;
        x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); });
      const box = {cx: Math.max(60, Math.min(w - 60, (x0 + x1) / 2)), cy: h / 2, rx: Math.min(w * 0.3, Math.max(40, (x1 - x0) / 2))};
      const cols = [[], []];
      const ka = 1 - Math.exp(-dt / 1000 * 9);
      els.forEach(o => {
        if (o.a.distanceToSquared(o.aT) > 1e-10) { o.a.lerp(o.aT, ka); moving = true; }
        const p = o.a.clone().project(cam); o.x = (p.x + 1) / 2 * w; o.y = (1 - p.y) / 2 * h;
        if (!o.w) { o.w = o.el.offsetWidth; o.h = o.el.offsetHeight; }
        const dx = o.x - box.cx, prev = LS.side[o.k];
        o.s = (prev != null && Math.abs(dx) < box.rx * 0.4) ? prev : (dx < 0 ? 0 : 1);
        o.c = Math.abs(dx); o.on = true; cols[o.s].push(o);
      });
      const cap = col => col.reduce((s, o) => s + o.h + GAP, 0) <= h - 8;
      const spill = (from, to) => { while (!cap(cols[from])) {
        const c = cols[from].slice().sort((a, b) => a.c - b.c)[0]; if (!c) break;
        cols[from].splice(cols[from].indexOf(c), 1); cols[to].push(c);
        if (!cap(cols[to])) { cols[to].pop(); c.on = false; } else c.s = to; } };
      spill(0, 1); spill(1, 0);
      const kk = 1 - Math.exp(-dt / 1000 * 2.5);
      cols.forEach((col, ci) => {
        col.forEach(o => { LS.side[o.k] = ci; });
        col.sort((a, b) => a.y - b.y);
        col.forEach(o => {
          const want = o.y - o.h / 2; let T = LS.tg[o.k];
          if (!T || T.s !== ci) T = LS.tg[o.k] = {y: want, x: null, s: ci}; else T.y += (want - T.y) * kk;
          if (Math.abs(want - T.y) > 0.5) moving = true; o.ly = T.y;
        });
        let i;
        for (i = 1; i < col.length; i++) col[i].ly = Math.max(col[i].ly, col[i - 1].ly + col[i - 1].h + GAP);
        for (i = col.length - 1; i >= 0; i--) col[i].ly = Math.min(col[i].ly, (i === col.length - 1 ? h - 4 : col[i + 1].ly - GAP) - col[i].h);
        for (i = 0; i < col.length; i++) col[i].ly = Math.max(col[i].ly, i ? col[i - 1].ly + col[i - 1].h + GAP : 4);
        col.forEach(o => {
          const need = ci ? box.cx + box.rx + 36 : box.cx - box.rx - 36 - o.w, T = LS.tg[o.k];
          T.x = T.x == null ? need : T.x + (need - T.x) * kk; if (Math.abs(need - T.x) > 0.5) moving = true;
          const lx = ci ? Math.max(T.x, need) : Math.min(T.x, need);
          o.lx = Math.max(4, Math.min(w - o.w - 4, lx));
        });
        // keep clear of the corner widgets (view crosshair, zoom, layer row): a label that
        // would sit on one moves below a top widget / above a bottom one, then re-pack
        const obs = obstacles();
        if (obs.length) {
          const hits = (o, r) => o.lx < r.r + 6 && o.lx + o.w > r.l - 6 && o.ly < r.b + 4 && o.ly + o.h > r.t - 4;
          for (i = 0; i < col.length; i++) obs.forEach(r => { if (r.top && hits(col[i], r)) col[i].ly = r.b + GAP; });
          for (i = 1; i < col.length; i++) col[i].ly = Math.max(col[i].ly, col[i - 1].ly + col[i - 1].h + GAP);
          for (i = col.length - 1; i >= 0; i--) obs.forEach(r => { if (!r.top && hits(col[i], r)) col[i].ly = r.t - GAP - col[i].h; });
          for (i = col.length - 2; i >= 0; i--) col[i].ly = Math.min(col[i].ly, col[i + 1].ly - GAP - col[i].h);
        }
      });
      let out = '';
      els.forEach(o => {
        if (!o.on) { o.el.style.opacity = 0; return; }
        o.el.style.opacity = '';
        let P = LS.pos[o.k];
        if (!P) P = LS.pos[o.k] = {x: o.lx, y: o.ly, vx: 0, vy: 0};
        else {
          const st = dt / 1000, n = Math.max(1, Math.ceil(st / 0.008)), hh = st / n;
          for (let j = 0; j < n; j++) {
            P.vx += (SK * (o.lx - P.x) - SDAMP * P.vx) * hh; P.vy += (SK * (o.ly - P.y) - SDAMP * P.vy) * hh;
            const capv = Math.max(SPEED, Math.hypot(o.lx - P.x, o.ly - P.y) * 3), sp = Math.hypot(P.vx, P.vy);
            if (sp > capv) { P.vx *= capv / sp; P.vy *= capv / sp; }
            P.x += P.vx * hh; P.y += P.vy * hh;
          }
          if (Math.hypot(o.lx - P.x, o.ly - P.y) < 0.3 && Math.hypot(P.vx, P.vy) < 4) { P.x = o.lx; P.y = o.ly; P.vx = P.vy = 0; }
          else moving = true;
        }
        o.el.style.transform = 'translate(' + P.x.toFixed(1) + 'px,' + P.y.toFixed(1) + 'px)';
        const right = o.s === 1, ex = right ? P.x - 3 : P.x + o.w + 3, ey = P.y + o.h / 2, bx = ex + (right ? -12 : 12);
        const head = ex.toFixed(1) + ',' + ey.toFixed(1) + ' ' + bx.toFixed(1) + ',' + ey.toFixed(1) + ' ';
        const cls = o.L.cls || '';
        if (o.hid) {
          const c = cut(bx, ey, o.x, o.y);
          out += '<polyline class="' + cls + '" points="' + head + c[0].toFixed(1) + ',' + c[1].toFixed(1) + '"/>'
               + '<polyline class="' + cls + ' behind" points="' + c[0].toFixed(1) + ',' + c[1].toFixed(1) + ' ' + o.x.toFixed(1) + ',' + o.y.toFixed(1) + '"/>';
        } else out += '<polyline class="' + cls + '" points="' + head + o.x.toFixed(1) + ',' + o.y.toFixed(1) + '"/>';
      });
      svg.innerHTML = out;
      labDirty = false;
      return moving;
    }

    // ---- find: click a structure ----
    const status = document.createElement('div'); status.className = 'jka-status'; wrap.appendChild(status);
    try { window.__jkaDbg = {LM, lmPts, cam, el: renderer.domElement}; } catch (x) {}
    if (mode === 'find' && !back) {
      let down = null;
      renderer.domElement.addEventListener('pointerdown', e => { down = [e.clientX, e.clientY]; });
      renderer.domElement.addEventListener('pointerup', e => {
        if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 5) return;
        const r = renderer.domElement.getBoundingClientRect();
        ray.setFromCamera(new THREE.Vector2((e.clientX - r.left) / r.width * 2 - 1, -(e.clientY - r.top) / r.height * 2 + 1), cam);
        ray.far = Infinity;
        const hs = ray.intersectObjects(parts.filter(p => p.mesh.visible && p.mesh.material.opacity > 0.5).map(p => p.mesh), false);
        let h = hs[0];
        if (LM && h) {   // landmark: judge the first hit on the asked bone (a bone in front shouldn't eat the click)
          const th = hs.find(x => target.some(q => q.mesh === x.object)); if (th && th.distance - h.distance < 0.04) h = th; }
        const nearLM = LM && lmPts.some(q => ray.ray.distanceSqToPoint(q) < 0.009 * 0.009);
        if (!h && !nearLM) return;
        if (!h) h = {object: target[0].mesh, point: LM.clone(), distance: 0};   // a click into a hole (e.g. a foramen) that hits no bone
        const p = parts.find(q => q.mesh === h.object), right = LM ? ((target.includes(p) && h.point.distanceTo(LM) < 0.014) || lmPts.some(q => ray.ray.distanceSqToPoint(q) < 0.009 * 0.009)) : target.includes(p);   // landmark: on (or within ~9 mm of) the patch
        const res = (window.__jkaFind = window.__jkaFind || []);
        res.push({name: p.name, ok: right});
        if (right) { ivfDiscs.forEach(d => { d.visible = true; d.material.color.setHex(OK); }); if (LM && lmMark) { lmMark.material.color.setHex(OK); } else target.forEach(q => paint(q, OK, 0x0a3018)); status.className = 'jka-status ok';
          status.textContent = '✓ ' + cfg.name; }
        else { paint(p, BAD, 0x400000); status.className = 'jka-status bad'; status.textContent = LM ? '✗ Not quite — that is on the ' + p.name : '✗ That is ' + p.name;
          setTimeout(() => paint(p, p.mesh.userData.base), 1100); }
        dirty = true;
      });
      window.__jkaFind = [];
    } else if (mode === 'find' && back) {
      const res = window.__jkaFind || [];
      if (res.length) { const ok = res.some(r => r.ok);
        status.className = 'jka-status ' + (ok ? 'ok' : 'bad');
        status.textContent = ok ? '✓ Found it' + (res.length > 1 ? ' (try ' + (res.findIndex(r => r.ok) + 1) + ')' : '')
          : '✗ Clicked: ' + res.map(r => r.name).slice(-3).join(', '); }
    }

    // ---- reflect (dissection): double-click a structure to lift it out of the way ----
    const refl = document.createElement('div'); refl.className = 'jka-refl'; wrap.appendChild(refl);
    const reflected = new Set();
    const rkey = cfg.mode + '|' + cfg.name;
    function showRefl() {
      if (!reflected.size) { refl.style.display = 'none'; return; }
      refl.style.display = '';
      const names = [...new Set([...reflected].map(p => p.name.replace(/ muscle$/, '')))].reverse();   // most recent first
      refl.innerHTML = '<span>Reflected: ' + names.slice(0, 3).join(', ') + (names.length > 3 ? ' +' + (names.length - 3) : '') + '</span>';
      const b = document.createElement('button'); b.className = 'jka-reflb'; b.textContent = 'Restore';
      b.addEventListener('pointerdown', ev => ev.stopPropagation());
      b.onclick = ev => { ev.stopPropagation(); reflected.forEach(p => { p.mesh.visible = inRegion(p); }); reflected.clear(); saveRefl(); showRefl(); checksDue = true; dirty = true; };
      refl.appendChild(b);
    }
    function saveRefl() { if (!back) window.__jkaRefl = {key: rkey, names: [...reflected].map(p => p.name)}; }
    function reflect(p) {
      parts.filter(q => q.name === p.name).forEach(q => { q.mesh.visible = false; reflected.add(q); });
      saveRefl(); showRefl(); checksDue = true; dirty = true;
    }
    // ---- click-to-name on the answer side ----
    let pickT = 0; const picks = [];
    function pickAt(cx, cy) {
      const r = renderer.domElement.getBoundingClientRect();
      const cast = (dx, dy) => { ray.setFromCamera(new THREE.Vector2((cx + dx - r.left) / r.width * 2 - 1, -(cy + dy - r.top) / r.height * 2 + 1), cam); ray.far = Infinity;
        return ray.intersectObjects(parts.filter(p => p.mesh.visible && p.mesh.material.opacity > 0.05).map(p => p.mesh), false); };
      let hs = cast(0, 0), p = null;
      const partOf = h => parts.find(q => q.mesh === h.object);
      if (mode === 'nerve') {   // Innervation cards: nerves first, with a few px of slack (they're thin)
        for (const [dx, dy] of [[0, 0], [4, 0], [-4, 0], [0, 4], [0, -4], [6, 6], [-6, -6], [6, -6], [-6, 6]]) {
          const n = cast(dx, dy).map(partOf).find(q => q && q.layer === 'nerve'); if (n) { p = n; break; } }
      }
      if (!p && hs.length) p = partOf(hs[0]);
      if (!p) { picks.length = 0; rebuildLabels(); return; }   // empty space: clear the names
      const i = picks.findIndex(q => q.name === p.name);
      if (i >= 0) picks.splice(i, 1); else picks.push(p);
      rebuildLabels();
    }
    function rebuildLabels() {
      for (let i = labels.length - 1; i >= 0; i--) if (labels[i].cls && labels[i].cls.indexOf('pick') >= 0) labels.splice(i, 1);
      picks.forEach(p => labels.push({text: p.name.replace(/ muscle$/, ''), parts: parts.filter(q => q.name === p.name), cls: 'minor pick'}));
      layout(); dirty = true;
    }
    function reflectAt(cx, cy) {
      const r = renderer.domElement.getBoundingClientRect();
      ray.setFromCamera(new THREE.Vector2((cx - r.left) / r.width * 2 - 1, -(cy - r.top) / r.height * 2 + 1), cam);
      ray.far = Infinity;
      // first thing under the pointer that isn't the asked structure (see-through ones count)
      const hs = ray.intersectObjects(parts.filter(p => p.mesh.visible && p.mesh.material.opacity > 0.05).map(p => p.mesh), false);
      // Locate front: anything may be reflected, the answer too (refusing it would give it away)
      const anyOk = mode === 'find' && !back;
      for (const h of hs) { const p = parts.find(q => q.mesh === h.object); if (p && (anyOk || !target.includes(p))) { reflect(p); return; } }
    }
    // our own double-click / right-click detection (pointer capture by the rotate control
    // swallows the browser's dblclick): two quick still clicks, or a right-click without a drag
    { let dn = null, lastUp = 0, lastXY = [0, 0];
      renderer.domElement.addEventListener('pointerdown', ev => { dn = ev.pointerType === 'touch' ? null : [ev.clientX, ev.clientY, ev.button]; }, true);   // (touch: a tap answers the card)
      renderer.domElement.addEventListener('pointerup', ev => {
        if (!dn) return; const still = Math.hypot(ev.clientX - dn[0], ev.clientY - dn[1]) < 5, btn = dn[2]; dn = null;
        if (!still) return;
        if (btn !== 0) return;
        const now = performance.now();
        if (now - lastUp < 380 && Math.hypot(ev.clientX - lastXY[0], ev.clientY - lastXY[1]) < 10) { lastUp = 0; clearTimeout(pickT); reflectAt(ev.clientX, ev.clientY); return; }
        lastUp = now; lastXY = [ev.clientX, ev.clientY];
        // answer side: a single click names what it hit (waits out a possible double-click)
        if (back && !(mode === 'find' && !back)) { const cx = ev.clientX, cy = ev.clientY; clearTimeout(pickT); pickT = setTimeout(() => pickAt(cx, cy), 390); }
      }, true);
    }
    // default dissection: the card's Reflect list, plus anything that hides most of the asked
    // structure from the opening view (not on Locate fronts — that would point at the answer)
    function autoReflect() {
      // "~Name" = keep it in view but see-through; plain "Name" = reflect it out of the way
      names(cfg.reflect).forEach(n => {
        const glass = n.startsWith('~'), nm = glass ? n.slice(1).trim() : n;
        byName(nm).forEach(p => { if (target.includes(p)) return;
          if (glass) { ghost(p, 0.22); p._a = 0.22; p._glass = true; } else reflect(p); });
      });
      if (!target.length || (mode === 'find' && !back) || mode === 'peel') return;
      const cnt = new Map(); let tot = 0;
      samples.forEach(sv => {
        const dv = sv.clone().sub(cam.position), len = dv.length(); ray.set(cam.position, dv.normalize()); ray.far = len - 0.002;
        const h = ray.intersectObjects(parts.filter(p => p.mesh.visible && !target.includes(p) && !p._glass && p.layer === 'muscle').map(p => p.mesh), false)[0];
        tot++; if (h) { const p = parts.find(q => q.mesh === h.object); cnt.set(p, (cnt.get(p) || 0) + 1); }
      });
      cnt.forEach((c, p) => { if (c / Math.max(1, tot) > 0.35) reflect(p); });
    }
    if (back && window.__jkaRefl && window.__jkaRefl.key === rkey)   // carry the dissection to the answer
      setTimeout(() => window.__jkaRefl.names.forEach(n => { const p = parts.find(q => q.name === n); if (p) reflect(p); }), 0);
    else setTimeout(autoReflect, 30);
    showRefl();

    // first few 3D cards: a one-line tip about reflecting (fades after a few seconds)
    { let seen = 0; try { seen = +(localStorage.getItem('jka-tip-refl') || 0); } catch (x) {}
      if (seen < 1) {   // only on the very first 3D card
        try { localStorage.setItem('jka-tip-refl', String(seen + 1)); } catch (x) {}
        const tip = document.createElement('div'); tip.className = 'jka-tip';
        tip.textContent = (window.matchMedia && matchMedia('(hover: none)').matches) ? 'Long-press a structure to reflect it' : 'Right-click or double-click a structure to reflect it';
        wrap.appendChild(tip);
        setTimeout(() => tip.classList.add('on'), 600);
        setTimeout(() => { tip.classList.remove('on'); setTimeout(() => tip.remove(), 600); }, 6500);
      } }

    // ---- zoom buttons (bottom-right) ----
    const zb = document.createElement('div'); zb.className = 'jka-zoom' + (peelUI ? ' jka-zoom-up' : '');
    [['+', 0.75], ['−', 1 / 0.75]].forEach(([t, f]) => {
      const b = document.createElement('button'); b.className = 'jka-zb'; b.textContent = t;
      b.addEventListener('pointerdown', ev => ev.stopPropagation());
      b.addEventListener('click', ev => { ev.stopPropagation(); zoomBy(f); });
      zb.appendChild(b);
    });
    function zoomBy(f) {
        if (ct) { ct.zoom(f); return; }
        touched();
        const off = cam.position.clone().sub(ctl.target), L = off.length();
        const L1 = Math.max(radOn ? 0.15 : 0.04, Math.min(radOn ? 14 : 3, L * f));
        ease = {p0: cam.position.clone(), t0: ctl.target.clone(), p1: ctl.target.clone().addScaledVector(off, L1 / L),
                t1: ctl.target.clone(), s: 0, u1: cam.up.clone()};
    }
    wrap.appendChild(zb);

    // ---- layer chips (explore) — both sides; stacked under the view widget ----
    const bar = document.createElement('div'); bar.className = 'jka-chips';
    {
      [['bone', 'Bone'], ['muscle', 'Muscle'], ['ligament', 'Lig.'], ['nerve', 'Nerve'], ['vessel', 'Artery'], ['vein', 'Vein']].forEach(([l, t]) => {
        const b = document.createElement('button');
        const on = () => parts.some(p => p.layer === l && p.mesh.visible);
        b.textContent = t; b.dataset.l = l; b.className = on() ? 'jka-b on' : 'jka-b';
        b.onclick = () => {
          if (l === 'ligament') {   // one setting for ligaments + capsules: Lig. → Lig. + capsule → off
            const lig = on(), cap = parts.some(p => p.layer === 'capsule' && p.mesh.visible);
            const nl = !lig ? true : !cap ? true : false, nc = lig && !cap;
            parts.forEach(p => { if (!inRegion(p)) return; if (p.layer === 'ligament') p.mesh.visible = nl; if (p.layer === 'capsule') p.mesh.visible = nc; });
            b.textContent = nc ? 'Lig. + capsule' : 'Lig.'; b.className = nl ? 'jka-b on' : 'jka-b'; dirty = true; return;
          }
          const v = !on(); parts.forEach(p => { if (p.layer === l && inRegion(p)) p.mesh.visible = v; });
          b.className = v ? 'jka-b on' : 'jka-b'; dirty = true; };
        bar.appendChild(b);
      });
      // CT: a simulated axial CT slice (inset) through the model, the asked structure tinted.
      // Built by cutting the meshes with a plane: each cut is filled with a CT grey (front
      // faces write depth only, back faces get the tissue's grey — so only the cut shows).
      const cb = document.createElement('button'); cb.textContent = 'CT'; cb.dataset.l = 'ct'; cb.className = 'jka-b';
      let ctWant = false; try { ctWant = localStorage.getItem('jka-ct') === '1'; } catch (x) {}
      cb.onclick = () => { setCT(!ctOn); };
      bar.appendChild(cb);
      if (ctWant) setTimeout(() => setCT(true), 0);
      const rb = document.createElement('button'); rb.textContent = 'X-ray'; rb.dataset.l = 'xray'; rb.className = 'jka-b';
      let rOn = false; try { rOn = localStorage.getItem('jka-rad') === '1'; } catch (x) {}
      rb.onclick = () => setRad(!radOn);
      bar.appendChild(rb);
      radWant = !!(rOn || cfg.xray);
      if (radWant) {
        if (back && window.__jkaWasRad) wrap.classList.add('jka-nofade');   // the question was a film too: no fade-out/in
        Promise.resolve().then(() => setRad(true, !!cfg.xray, true));
      }   // X-ray ID cards open on the film

    }

    // ---- simulated CT inset ----
    let ct = null, ctOn = false, miniCam = null;
    function setCT(on) {
      if (on && radOn) setRad(false);
      ctOn = on; wrap.classList.toggle('jka-ctmode', on); root.classList.remove('jka-ctpre');   // CT: the view crosshair isn't needed
      // in CT the layer list is replaced by one button that leaves CT

      wrap.querySelectorAll('button[data-l=ct]').forEach(b => { b.className = on ? 'jka-b on' : 'jka-b'; });
      try { localStorage.setItem('jka-ct', on ? '1' : '0'); } catch (x) {}
      if (!on) { if (ct) { ct.ro.disconnect(); ct.box.remove(); if (ct.onEsc) document.removeEventListener('keydown', ct.onEsc, true);
        if (ct.mini) { if (miniCam) { cam.zoom = 1; pan.copy(miniCam.pan); baseY = miniCam.by; miniCam = null; applyView(); } wrap.insertBefore(renderer.domElement, wrap.firstChild); ct.mini.remove(); Object.values(ct.marks || {}).forEach(m => scene.remove(m)); fit(); }
        lab.style.display = ''; svg.style.display = ''; renderer.domElement.style.visibility = ''; ct = null; } dirty = true; return; }
      if (ct) return;
      // Geometric slicing: every triangle crossing the plane gives an exact segment; segments
      // chain into outlines, filled even-odd per structure on a 2D canvas (winding-proof,
      // crisp). A dark "fat" layer under everything fills the gaps like a real CT.
      const CTC = {bone: '#ededed', muscle: '#8a8a8a', nerve: '#747474', vessel: '#c6c6c6', vein: '#a4a4a4', ligament: '#b9b4a2', capsule: '#9a968a',
        lung: '#2b2b2b', airway: '#070707', heart: '#868686', organ: '#8e8e8e'};   // lungs ≈ air: near black
      const ORDER = {capsule: 0.5, muscle: 1, nerve: 2, vessel: 2, vein: 2, ligament: 2.5, bone: 3};
      // whole limb: the scan isn't cut to the card's region
      const src = parts.filter(p => (p.layer !== 'capsule' || p.mesh.visible)).sort((a, b) => (ORDER[a.layer] || 0) - (ORDER[b.layer] || 0)).map(p => {
        const g = p.mesh.userData.coarse || p.mesh.geometry, pos = g.attributes.position, n = pos.count, W = new Float32Array(n * 3), v = new THREE.Vector3();
        for (let i = 0; i < n; i++) { v.fromBufferAttribute(pos, i).applyMatrix4(p.mesh.matrixWorld); W[i * 3] = v.x; W[i * 3 + 1] = v.y; W[i * 3 + 2] = v.z; }
        return {p, W, I: g.index ? g.index.array : null, n, tgt: target.includes(p)};
      }).reduce((acc, S) => {   // a structure stored as several pieces is sliced as one
        const k = S.p.name + '|' + S.tgt, G = acc.map.get(k);
        if (G) { G.items.push(S); G.box = G.box.clone().union(S.p.box); }
        else { const N = {p: S.p, tgt: S.tgt, items: [S], box: S.p.box.clone()}; acc.map.set(k, N); acc.list.push(N); }
        return acc;
      }, {map: new Map(), list: []}).list;
      // bilateral, like a real scan: the other limb is this one mirrored across the midline (x = 0)
      src.slice().forEach(N => {
        const items = N.items;   // same geometry: sliced once, x flipped when drawn
        const box = new THREE.Box3(new THREE.Vector3(-N.box.max.x, N.box.min.y, N.box.min.z), new THREE.Vector3(-N.box.min.x, N.box.max.y, N.box.max.z));
        src.push({p: N.p, tgt: false, mirror: true, items, box});
      });
      // anatomical context (trunk) — loaded on demand, drawn only in CT_CONTEXT.planes
      const ctxPlanes = cfg.ctPlanes || CT_CONTEXT.planes;
      load(cfg.ctContext || ctxModel).then(g => {
        if (stopped) return; g.updateMatrixWorld(true);
        const own = new Set(parts.map(q => q.name));
        g.traverse(o => { if (!o.isMesh) return;
          if (own.has(String((o.userData || {}).n || o.name).replace(/\.[lr]$/, ''))) return;   // already in the limb model
          const ex = o.userData || {}, geo = o.geometry, pos = geo.attributes.position, n = pos.count, W = new Float32Array(n * 3), v = new THREE.Vector3();
          for (let i = 0; i < n; i++) { v.fromBufferAttribute(pos, i).applyMatrix4(o.matrixWorld); W[i * 3] = v.x; W[i * 3 + 1] = v.y; W[i * 3 + 2] = v.z; }
          const p = {name: ex.n || o.name, layer: ex.l || 'organ', box: new THREE.Box3().setFromObject(o)};
          src.push({p, tgt: false, context: true, items: [{p, W, I: geo.index ? geo.index.array : null, n}], box: p.box}); });
        try { fitBody(); panes.forEach(pp => { pp.baseKey = null; }); draw(); } catch (x) {}
      }).catch(() => {});   // no trunk model installed: the limb alone
      // planes: n = normal, u/v = screen right / up (radiology conventions)
      const lat = left ? 1 : -1;   // world x of the patient's lateral side for this limb
      const PL = {
        axial:    {n: [0, 1, 0], u: [1, 0, 0], v: [0, 0, 1], step: 0.003, name: 'Axial'},      // from the feet, anterior up
        coronal:  {n: [0, 0, 1], u: [1, 0, 0], v: [0, 1, 0], step: 0.003, name: 'Coronal'},    // facing the patient
        sagittal: {n: [lat, 0, 0], u: [0, 0, -1], v: [0, 1, 0], step: 0.003, name: 'Sagittal'} // anterior on the left
      };
      let marrow = null;
      function speck() {   // cancellous bone: a random network of struts round marrow spaces —
        // larger cells, thicker struts with a soft fall-off (bright core, dimmer edges)
        const N = 256, t = document.createElement('canvas'); t.width = t.height = N; const x = t.getContext('2d');
        const pts = [];   // spaced-out points (no tiny cells → no streaky fans)
        for (let tries = 0; pts.length < 85 && tries < 6000; tries++) {
          const q = [Math.random() * N, Math.random() * N, 0.7 + Math.random() * 0.8];
          if (pts.every(([px, py]) => { let dx = Math.abs(q[0] - px), dy = Math.abs(q[1] - py); dx = Math.min(dx, N - dx); dy = Math.min(dy, N - dy); return dx * dx + dy * dy > 15 * 15; })) pts.push(q);
        }
        const img = x.createImageData(N, N);
        for (let y = 0; y < N; y++) for (let xx = 0; xx < N; xx++) {
          let d1 = 1e9, d2 = 1e9, w1 = 1;
          pts.forEach(([px, py, w]) => { let dx = Math.abs(xx - px), dy = Math.abs(y - py); dx = Math.min(dx, N - dx); dy = Math.min(dy, N - dy);
            const dd = Math.sqrt(dx * dx + dy * dy); if (dd < d1) { d2 = d1; d1 = dd; w1 = w; } else if (dd < d2) d2 = dd; });
          const g = (d2 - d1) / 2, sg = 1.7 * w1;                    // distance to the strut's mid-line
          const strut = Math.exp(-(g * g) / (2 * sg * sg));          // soft profile: brightest in the middle
          const gr = Math.round(88 + strut * 80 + (Math.random() - 0.5) * 12), i = (y * N + xx) * 4;
          img.data[i] = img.data[i + 1] = img.data[i + 2] = gr; img.data[i + 3] = 255;
        }
        x.putImageData(img, 0, 0);
        const s = document.createElement('canvas'); s.width = s.height = N; const y2 = s.getContext('2d');
        y2.filter = 'blur(0.8px)'; for (const ox of [-N, 0, N]) for (const oy of [-N, 0, N]) y2.drawImage(t, ox, oy);
        return s;
      }
      // three panes, PACS style: axial (large) + coronal + sagittal; each shows where the other
      // two cut (crosshair); a click moves the other two through that point; scroll moves its own
      const box = document.createElement('div'); box.className = 'jka-ct';
      const head = document.createElement('div'); head.className = 'jka-ct-h';
      head.innerHTML = 'CT <span>(simulated) · scroll a pane to move its slice · click to aim the others</span>';
      box.appendChild(head); wrap.appendChild(box);
      // the layer list is hidden in CT: one button (bottom-left of the CT screen) leaves CT
      const xb2 = document.createElement('button'); xb2.className = 'jka-ctoff'; xb2.textContent = 'Disable CT';
      xb2.addEventListener('pointerdown', ev => ev.stopPropagation()); xb2.onclick = ev => { ev.stopPropagation(); setCT(false); };
      box.appendChild(xb2);
      lab.style.display = 'none'; svg.style.display = 'none';
      let mini = null;
      if (back) {
        mini = document.createElement('div'); mini.className = 'jka-mini'; wrap.appendChild(mini);
        mini.appendChild(renderer.domElement); fit(); dirty = true;
        // the preview is small: pull back so the whole region fits (restored when CT closes)
        miniCam = {pan: pan.clone(), by: baseY};
        pan.set(0, 0); baseY = 0; cam.zoom = 0.4; applyView();   // wider lens (survives the camera glide)
      } else renderer.domElement.style.visibility = 'hidden';
      const ref = tbox.isEmpty() ? focus : tbox, c = ref.getCenter(new THREE.Vector3());
      const fb = focus.clone(); fb.min.y = Math.max(fb.min.y, yr[0]); fb.max.y = Math.min(fb.max.y, yr[1]);
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const V3 = a => new THREE.Vector3(...a);
      const COL = {axial: '#ffd36b', coronal: '#7fd8ff', sagittal: '#ff8f8f'};
      const panes = ['axial', 'coronal', 'sagittal'].map(k => {
        const el = document.createElement('div'); el.className = 'jka-ctp jka-ctp-' + k;
        const cv = document.createElement('canvas'); el.appendChild(cv);
        // the pane's name is a dropdown: Axial / Coronal / Sagittal (just that view) or All
        const t = document.createElement('button'); t.className = 'jka-ctp-t'; t.innerHTML = PL[k].name + ' <span>▾</span>'; t.style.color = COL[k]; el.appendChild(t);
        t.addEventListener('pointerdown', ev => ev.stopPropagation());
        t.addEventListener('click', ev => { ev.stopPropagation(); if (soloK) openMenu(t); });   // dropdown only in single view
        // all three shown: a "+" beside each name enlarges that view
        const plus = document.createElement('button'); plus.className = 'jka-ctp-plus';
        plus.innerHTML = '<svg viewBox="0 0 14 14" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
          + '<path d="M3 11 L11 3"/><path d="M6.5 3 H11 V7.5"/><path d="M7.5 11 H3 V6.5"/></svg>';   // diagonal ↔: enlarge
        plus.addEventListener('pointerdown', ev => ev.stopPropagation());
        plus.addEventListener('click', ev => { ev.stopPropagation(); solo(k, true); });
        plus.style.color = COL[k];   // the pane's colour (axial yellow, coronal blue, sagittal red)
        el.appendChild(plus);
        box.appendChild(el);
        const P = PL[k];
        const pane = {k, el, cv, g2: cv.getContext('2d'), n: V3(P.n), u: V3(P.u), v: V3(P.v), d: V3(P.n).dot(c),
          half: k === 'axial' ? 0.1 : 0.16, W: 300, H: 300, cu: 0, cvv: 0};
        pane.cu = pane.u.dot(c); pane.cvv = pane.v.dot(c);
        return pane;
      });
      // coronal: open on the whole body (both limbs + trunk), like a scout view; zoom in from there
      function fitBody() {
        const pn = panes.find(p => p.k === 'coronal'); if (!pn || pn.manual) return;
        let u0 = 1e9, u1 = -1e9, v0 = 1e9, v1 = -1e9;
        src.forEach(S => { const b = S.box; for (let i = 0; i < 8; i++) {
          const q = new THREE.Vector3(i & 1 ? b.max.x : b.min.x, i & 2 ? b.max.y : b.min.y, i & 4 ? b.max.z : b.min.z);
          const a = q.dot(pn.u), w = q.dot(pn.v); u0 = Math.min(u0, a); u1 = Math.max(u1, a); v0 = Math.min(v0, w); v1 = Math.max(v1, w); } });
        if (u1 <= u0) return;
        const asp = (pn.cv.height || pn.H || 1) / (pn.cv.width || pn.W || 1);
        pn.half = Math.max((v1 - v0) / 2, (u1 - u0) / 2 * asp) * 1.04; pn.cu = (u0 + u1) / 2; pn.cvv = (v0 + v1) / 2; pn.baseKey = null;
      }
      fitBody();
      const marks = {};
      if (mini) panes.forEach(pn => { const m = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.34),
        new THREE.MeshBasicMaterial({color: COL[pn.k], transparent: true, opacity: 0.25, side: THREE.DoubleSide, depthWrite: false}));
        m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), pn.n); scene.add(m); marks[pn.k] = m; });
      function rangeOf(n) { let lo = 1e9, hi = -1e9;
        for (let i = 0; i < 8; i++) { const q = n.dot(new THREE.Vector3(i & 1 ? fb.max.x : fb.min.x, i & 2 ? fb.max.y : fb.min.y, i & 4 ? fb.max.z : fb.min.z)); lo = Math.min(lo, q); hi = Math.max(hi, q); }
        return [lo, hi]; }
      function size() { panes.forEach(pn => { const r = pn.el.getBoundingClientRect(); pn.W = r.width || 300; pn.H = r.height || 300;
        pn.cv.width = Math.round(pn.W * dpr); pn.cv.height = Math.round(pn.H * dpr); }); }
      function drawPane(pn) {
        const {n, u, v, g2, cv} = pn, [lo, hi] = rangeOf(n);
        pn.d = Math.max(lo, Math.min(hi, pn.d));
        const s = pn.H / (2 * pn.half) * dpr, d = pn.d;
        const X = pu => cv.width / 2 + (pu - pn.cu) * s, Y = pv => cv.height / 2 - (pv - pn.cvv) * s;
        pn.toWorld = (px, py) => c.clone().addScaledVector(u, pn.cu + (px * dpr - cv.width / 2) / s - u.dot(c))
          .addScaledVector(v, pn.cvv - (py * dpr - cv.height / 2) / s - v.dot(c)).addScaledVector(n, d - n.dot(c));
        const keyT = d.toFixed(5) + '|' + pn.half + '|' + cv.width + 'x' + cv.height + '|' + picked + '|' + pn.cu.toFixed(5) + ',' + pn.cvv.toFixed(5);
        if (pn.baseKey !== keyT) { pn.baseKey = keyT; sliceTissue(pn, s, d, X, Y);
          // axial: fit the whole limb section (plus fat / skin) unless you've zoomed / panned it
          // (only once, on the first slice shown: later slices keep that framing)
          if (pn.k === 'axial' && !pn.manual && !pn.fitted && pn.shapes && pn.shapes.length && !pn.fitting) {
            let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
            pn.shapes.forEach(sh => sh.loops.forEach(L => L.forEach(q => { x0 = Math.min(x0, q[0]); x1 = Math.max(x1, q[0]); y0 = Math.min(y0, q[1]); y1 = Math.max(y1, q[1]); })));
            if (x1 > x0) {
              const wW = (x1 - x0) / s + 0.03, wH = (y1 - y0) / s + 0.03;   // world size + fat / skin margin
              const cxW = pn.cu + ((x0 + x1) / 2 - cv.width / 2) / s, cyW = pn.cvv - ((y0 + y1) / 2 - cv.height / 2) / s;
              const half = Math.max(wH / 2, wW / 2 * cv.height / cv.width) * 1.08;
              if (Math.abs(half - pn.half) / pn.half > 0.04 || Math.abs(cxW - pn.cu) > 0.003 || Math.abs(cyW - pn.cvv) > 0.003) {
                pn.half = half; pn.cu = cxW; pn.cvv = cyW; pn.fitting = true; drawPane(pn); pn.fitting = false; pn.fitted = true; return;
              }
              pn.fitted = true;
            }
          }
        }
        g2.setTransform(1, 0, 0, 1, 0, 0); g2.drawImage(pn.base, 0, 0);
        crosshair(pn, X, Y);
        if (marks[pn.k]) { marks[pn.k].position.copy(c.clone().addScaledVector(n, d - n.dot(c))); dirty = true; }
      }
      // 3D trabecular field: jittered-grid Worley noise in WORLD space (cell ≈ 2.6 mm). A pixel
      // near the plate between its two nearest cells is strut. Fixed to the body, so moving the
      // slice moves through real 3D struts, and the three panes show the same network.
      const TCS = 0.0042, TSG = 0.00026;
      const th = (a, b, c2) => { let h = (a * 374761393 + b * 668265263 + c2 * 1274126177) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296; };
      function vn3(x, y, z, k) {   // smooth 3D value noise in [0,1]
        const ix = Math.floor(x), iy = Math.floor(y), iz = Math.floor(z), fx = x - ix, fy = y - iy, fz = z - iz;
        const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy), sz = fz * fz * (3 - 2 * fz);
        const H = (a, b, c2) => th(a + k * 101, b + k * 37, c2 + k * 59);
        const l = (a, b, t) => a + (b - a) * t;
        return l(l(l(H(ix, iy, iz), H(ix + 1, iy, iz), sx), l(H(ix, iy + 1, iz), H(ix + 1, iy + 1, iz), sx), sy),
                 l(l(H(ix, iy, iz + 1), H(ix + 1, iy, iz + 1), sx), l(H(ix, iy + 1, iz + 1), H(ix + 1, iy + 1, iz + 1), sx), sy), sz);
      }
      function trab(x0, y0, z0) {
        // curved struts: warp the point by smooth noise (~0.4 cell) before the cell lookup
        const wf = 1 / (TCS * 1.4), wa = TCS * 0.45;
        const x = x0 + (vn3(x0 * wf, y0 * wf, z0 * wf, 1) - 0.5) * 2 * wa;
        const y = y0 + (vn3(x0 * wf, y0 * wf, z0 * wf, 2) - 0.5) * 2 * wa;
        const z = z0 + (vn3(x0 * wf, y0 * wf, z0 * wf, 3) - 0.5) * 2 * wa;
        const ix = Math.floor(x / TCS), iy = Math.floor(y / TCS), iz = Math.floor(z / TCS);
        let f1 = 1e9, f2 = 1e9;
        for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) for (let c2 = -1; c2 <= 1; c2++) {
          const cx = ix + a, cy = iy + b, cz = iz + c2;
          const px = (cx + th(cx, cy, cz)) * TCS, py = (cy + th(cy, cz, cx + 7)) * TCS, pz = (cz + th(cz, cx, cy + 13)) * TCS;
          const dd = (px - x) * (px - x) + (py - y) * (py - y) + (pz - z) * (pz - z);
          if (dd < f1) { f2 = f1; f1 = dd; } else if (dd < f2) f2 = dd;
        }
        const g = (Math.sqrt(f2) - Math.sqrt(f1)) / 2;
        // thickness varies slowly through the bone (0.45×–1.7×); some thin struts fade out
        const tf = 1 / (TCS * 2.2), tv = vn3(x0 * tf, y0 * tf, z0 * tf, 4), sg = TSG * (0.45 + 1.25 * tv);
        const fade = 0.55 + 0.45 * Math.min(1, vn3(x0 * tf * 1.7, y0 * tf * 1.7, z0 * tf * 1.7, 5) * 1.8);
        return Math.exp(-(g * g) / (2 * sg * sg)) * fade;
      }
      function boneTexture(pn, s, d, shapes, W2, H2) {
        // mask of bone pixels (computed at half resolution, then scaled up)
        const sc = 0.5, w = Math.ceil(W2 * sc), h = Math.ceil(H2 * sc);
        const m = document.createElement('canvas'); m.width = w; m.height = h; const mg = m.getContext('2d');
        mg.setTransform(sc, 0, 0, sc, 0, 0); mg.fillStyle = '#fff';
        shapes.forEach(sh => { if (sh.S.p.layer !== 'bone' || !sh.loops.length || /^(Hip bone|Sacrum|Coccyx|Vertebra)/.test(sh.S.p.name)) return;
          mg.beginPath(); sh.loops.forEach(L => { mg.moveTo(L[0][0], L[0][1]); L.forEach(q => mg.lineTo(q[0], q[1])); mg.closePath(); }); mg.fill('nonzero'); });
        const md = mg.getImageData(0, 0, w, h), out = mg.createImageData(w, h), {u, v, n} = pn;
        for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4; if (!md.data[i + 3]) continue;
          const uu = pn.cu + (x / sc - W2 / 2) / s, vv = pn.cvv - (y / sc - H2 / 2) / s;
          const wx = u.x * uu + v.x * vv + n.x * d, wy = u.y * uu + v.y * vv + n.y * d, wz = u.z * uu + v.z * vv + n.z * d;
          const gr = Math.round(86 + trab(wx, wy, wz) * 84 + (Math.random() - 0.5) * 10);
          out.data[i] = out.data[i + 1] = out.data[i + 2] = gr; out.data[i + 3] = 255;
        }
        mg.setTransform(1, 0, 0, 1, 0, 0); mg.putImageData(out, 0, 0);
        const big = document.createElement('canvas'); big.width = W2; big.height = H2; const bg = big.getContext('2d');
        bg.imageSmoothingEnabled = true; bg.filter = 'blur(0.6px)'; bg.drawImage(m, 0, 0, W2, H2);
        return big;
      }
      // ---- slicing, fast path: each piece's triangles are bucketed (2 mm) along the three
      // axes once, so a slice only visits the triangles near it; results (world-space
      // segments) are cached per piece / axis / position, and the mirrored limb reuses them.
      const segCache = new Map(), SEG_MAX = 12000;
      function axisIndex(It, ax) {
        It.ix = It.ix || []; if (It.ix[ax]) return It.ix[ax];
        const W = It.W, I = It.I, tc = I ? I.length / 3 : It.n / 3, B = 0.002;
        let lo = 1e9, hi = -1e9; for (let i = ax; i < W.length; i += 3) { lo = Math.min(lo, W[i]); hi = Math.max(hi, W[i]); }
        const nb = Math.max(1, Math.ceil((hi - lo) / B) + 1), cnt = new Int32Array(nb + 1);
        const rng = new Int32Array(tc * 2);
        for (let t = 0; t < tc; t++) { const a = I ? I[t * 3] : t * 3, b = I ? I[t * 3 + 1] : t * 3 + 1, c2 = I ? I[t * 3 + 2] : t * 3 + 2;
          const p0 = W[a * 3 + ax], p1 = W[b * 3 + ax], p2 = W[c2 * 3 + ax];
          const b0 = Math.floor((Math.min(p0, p1, p2) - lo) / B), b1 = Math.floor((Math.max(p0, p1, p2) - lo) / B);
          rng[t * 2] = b0; rng[t * 2 + 1] = b1; for (let k = b0; k <= b1; k++) cnt[k + 1]++; }
        for (let k = 0; k < nb; k++) cnt[k + 1] += cnt[k];
        const list = new Int32Array(cnt[nb]), fill = cnt.slice(0, nb);
        for (let t = 0; t < tc; t++) for (let k = rng[t * 2]; k <= rng[t * 2 + 1]; k++) list[fill[k]++] = t;
        return (It.ix[ax] = {lo, B, nb, start: cnt, list});
      }
      let itemIds = 0;
      function segsFor(It, ax, coord) {
        if (It.id == null) It.id = ++itemIds;
        const key = It.id + '|' + ax + '|' + coord.toFixed(5), hit = segCache.get(key);
        if (hit) { segCache.delete(key); segCache.set(key, hit); return hit; }
        const X3 = axisIndex(It, ax), out = [];
        const bk = Math.floor((coord - X3.lo) / X3.B);
        if (bk >= 0 && bk < X3.nb) {
          const W = It.W, I = It.I;
          for (let q = X3.start[bk]; q < X3.start[bk + 1]; q++) {
            const t = X3.list[q], a = I ? I[t * 3] : t * 3, b = I ? I[t * 3 + 1] : t * 3 + 1, c2 = I ? I[t * 3 + 2] : t * 3 + 2;
            const da = W[a * 3 + ax] - coord, db = W[b * 3 + ax] - coord, dc = W[c2 * 3 + ax] - coord;
            const pts = [];
            const cut = (i, j, di, dj) => { const f = di / (di - dj); pts.push(W[i * 3] + (W[j * 3] - W[i * 3]) * f, W[i * 3 + 1] + (W[j * 3 + 1] - W[i * 3 + 1]) * f, W[i * 3 + 2] + (W[j * 3 + 2] - W[i * 3 + 2]) * f); };
            if ((da > 0) !== (db > 0)) cut(a, b, da, db);
            if ((db > 0) !== (dc > 0)) cut(b, c2, db, dc);
            if ((dc > 0) !== (da > 0)) cut(c2, a, dc, da);
            if (pts.length === 6) for (let k = 0; k < 6; k++) out.push(pts[k]);
          }
        }
        const arr = new Float32Array(out);
        segCache.set(key, arr); if (segCache.size > SEG_MAX) segCache.delete(segCache.keys().next().value);
        return arr;
      }
      function sliceTissue(pn, s, d, X, Y) {
        // 5: while the slice is moving, skip the trabecular texture; full quality ~180 ms after it stops
        const now = performance.now(), fast = !pn.forceFull && pn.lastSlice && now - pn.lastSlice < 200;
        pn.forceFull = false; clearTimeout(pn.fullT);
        const texOK = s / 1000 > 1 / 0.8;   // trabecular texture only when a pixel is < 0.8 mm (zoomed out it can't be seen)
        if (fast) pn.fullT = setTimeout(() => { pn.forceFull = true; pn.baseKey = null; drawPane(pn); }, 180);
        const {n, u, v} = pn;
        if (!pn.base) pn.base = document.createElement('canvas');
        const cv = pn.base; cv.width = pn.cv.width; cv.height = pn.cv.height; const g2 = cv.getContext('2d');
        g2.setTransform(1, 0, 0, 1, 0, 0); g2.fillStyle = '#0a0a0a'; g2.fillRect(0, 0, cv.width, cv.height);
        const shapes = []; let shapesLines = null, boneTex = null;
        src.forEach(S => {
          if (S.context && !ctxPlanes.includes(pn.k)) return;
          const b = S.box; let bl = 1e9, bh = -1e9;
          for (let i = 0; i < 8; i++) { const q = n.x * (i & 1 ? b.max.x : b.min.x) + n.y * (i & 2 ? b.max.y : b.min.y) + n.z * (i & 4 ? b.max.z : b.min.z); bl = Math.min(bl, q); bh = Math.max(bh, q); }
          if (bl > d || bh < d) return;
          const segs = [];
          const mx = S.mirror ? -1 : 1, ax = Math.abs(n.x) > 0.5 ? 0 : Math.abs(n.y) > 0.5 ? 1 : 2, coord = d * (ax === 0 ? n.x : ax === 1 ? n.y : n.z);
          const prj = (x, y, z) => [X(x * u.x + y * u.y + z * u.z), Y(x * v.x + y * v.y + z * v.z)];
          S.items.forEach(It => {
            const ws = segsFor(It, ax, ax === 0 ? coord * mx : coord);
            for (let k = 0; k < ws.length; k += 6) segs.push([prj(ws[k] * mx, ws[k + 1], ws[k + 2]), prj(ws[k + 3] * mx, ws[k + 4], ws[k + 5])]);
          });
          if (!segs.length) return;
          const key = q => Math.round(q[0] * 4) + ',' + Math.round(q[1] * 4), ends = new Map();
          segs.forEach((sg, i) => [0, 1].forEach(j => { const k = key(sg[j]); (ends.get(k) || ends.set(k, []).get(k)).push([i, j]); }));
          const used = new Uint8Array(segs.length), loops = [];
          for (let i = 0; i < segs.length; i++) {
            if (used[i]) continue; used[i] = 1;
            const L = [segs[i][0], segs[i][1]]; let cur = segs[i][1];
            for (let guard = 0; guard < segs.length; guard++) {
              const cand = (ends.get(key(cur)) || []).find(([si]) => !used[si]); if (!cand) break;
              used[cand[0]] = 1; const nxt = segs[cand[0]][1 - cand[1]]; L.push(nxt); cur = nxt;
            }
            if (L.length > 1) loops.push(L);
          }
          // stitch open chains (holes in the mesh break an outline): join the nearest ends
          // while they are close; what still can't close is drawn as a line, never filled
          // (closing it with a straight chord made the wedges)
          const TOL = 8 * dpr, dist = (p1, p2) => Math.hypot(p1[0] - p2[0], p1[1] - p2[1]);
          const isClosed = L => dist(L[0], L[L.length - 1]) <= TOL;
          let open = loops.filter(L => !isClosed(L)), closed = loops.filter(isClosed);
          for (let guard = 0; open.length && guard < 400; guard++) {
            const A = open[0]; let best = null, bd = TOL * 3;
            if (dist(A[0], A[A.length - 1]) < bd && A.length > 2) { bd = dist(A[0], A[A.length - 1]); best = {self: true}; }
            for (let j = 1; j < open.length; j++) { const B = open[j];
              [[A[A.length - 1], B[0], 0], [A[A.length - 1], B[B.length - 1], 1], [A[0], B[B.length - 1], 2], [A[0], B[0], 3]].forEach(([p1, p2, m]) => {
                const dd = dist(p1, p2); if (dd < bd) { bd = dd; best = {j, m}; } }); }
            if (!best) {
              // can't join: close it anyway if the gap is small next to its length (a mesh
              // hole), otherwise it's a fragment — draw it as a line
              let len = 0; for (let i = 1; i < A.length; i++) len += dist(A[i - 1], A[i]);
              open.shift();
              if (A.length > 4 && dist(A[0], A[A.length - 1]) < 0.18 * len) closed.push(A);
              else (shapesLines || (shapesLines = [])).push(A);
              continue;
            }
            if (best.self) { closed.push(open.shift()); continue; }
            const B = open[best.j]; let M;
            if (best.m === 0) M = A.concat(B); else if (best.m === 1) M = A.concat(B.slice().reverse());
            else if (best.m === 2) M = B.concat(A); else M = B.slice().reverse().concat(A);
            open.splice(best.j, 1); open[0] = M;
            if (isClosed(M)) closed.push(open.shift());
          }
          shapes.push({S, loops: closed.filter(L => L.length > 2), lines: shapesLines || []}); shapesLines = null;
        });
        const path = loops => { g2.beginPath(); loops.forEach(L => { g2.moveTo(L[0][0], L[0][1]); for (let i = 1; i < L.length; i++) g2.lineTo(L[i][0], L[i][1]); g2.closePath(); }); };
        g2.lineJoin = 'round';
        // skin + subcutaneous fat (the model has neither): a fat layer ~1.2 cm round the deep
        // tissue with a thin skin line at its edge; on axial slices the limb outline (convex
        // hull) is filled with fat too, so the gaps between muscle groups read as fat
        const FAT = '#3a3a3a', SKIN = '#8f8f8f', F = 0.012 * s, K = Math.max(1 * dpr, 0.0007 * s);
        const tissue = shapes.filter(sh => sh.S.p.layer !== 'capsule' && sh.S.p.layer !== 'lung' && sh.S.p.layer !== 'airway');
        // one outline per separate body part in the slice (arm vs trunk vs the other limb):
        // shapes whose boxes come within ~2 cm are grouped, each group gets its own hull
        let hulls = [];
        if (pn.k === 'axial') {
          const bx = tissue.map(sh => { let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9; sh.loops.forEach(L => L.forEach(q => { x0 = Math.min(x0, q[0]); y0 = Math.min(y0, q[1]); x1 = Math.max(x1, q[0]); y1 = Math.max(y1, q[1]); })); return [x0, y0, x1, y1]; });
          const TRUNK = /latissimus|serratus|pectoralis|trapezius|rhomboid|levator scapulae|subclavius|intercostal|thoraco|lateral thoracic|long thoracic|vertebra|sacrum|coccyx|psoas|quadratus lumborum|iliac artery|iliac vein/i;
          const trunk = sh => sh.S.context || TRUNK.test(sh.S.p.name), side = sh => !!sh.S.mirror;
          const par = tissue.map((_, i) => i), f = i => (par[i] === i ? i : (par[i] = f(par[i]))), gap = 0.006 * s;
          for (let i = 0; i < bx.length; i++) for (let j = i + 1; j < bx.length; j++) { const A = bx[i], B = bx[j];
            if (A[0] > 1e8 || B[0] > 1e8 || side(tissue[i]) !== side(tissue[j]) || trunk(tissue[i]) || trunk(tissue[j])) continue;
            if (A[0] - gap < B[2] && B[0] - gap < A[2] && A[1] - gap < B[3] && B[1] - gap < A[3]) par[f(i)] = f(j); }
          const groups = new Map(); tissue.forEach((sh, i) => { if (bx[i][0] > 1e8) return; if (trunk(sh)) return; const r = f(i); (groups.get(r) || groups.set(r, []).get(r)).push(sh); });
          const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
          groups.forEach(G => { const P = []; G.forEach(sh => sh.loops.forEach(L => L.forEach(q => P.push(q)))); if (P.length < 3) return;
            P.sort((a, b) => a[0] - b[0] || a[1] - b[1]); const lo = [], up = [];
            P.forEach(q => { while (lo.length > 1 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); });
            P.slice().reverse().forEach(q => { while (up.length > 1 && cr(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop(); up.push(q); });
            hulls.push(lo.slice(0, -1).concat(up.slice(0, -1))); });
        }
        const body = (w, col) => {
          g2.strokeStyle = col; g2.fillStyle = col; g2.lineWidth = w;
          hulls.forEach(hull => { g2.beginPath(); hull.forEach((q, i) => i ? g2.lineTo(q[0], q[1]) : g2.moveTo(q[0], q[1])); g2.closePath(); g2.fill(); g2.stroke(); });
          tissue.forEach(sh => { path(sh.loops); g2.fill('evenodd'); g2.stroke();
            if (sh.lines.length) { g2.beginPath(); sh.lines.forEach(L => { g2.moveTo(L[0][0], L[0][1]); L.forEach(q => g2.lineTo(q[0], q[1])); }); g2.stroke(); } });
        };
        g2.lineJoin = 'round'; g2.lineCap = 'round';
        body(2 * (F + K), SKIN); body(2 * F, FAT);
        const drawOne = sh => {
          path(sh.loops);
          if (sh.S.p.layer === 'bone' && !sh.S.tgt) {
            // ends of a bone (epi/metaphysis): trabecular, thin cortex; the shaft: fatty marrow
            // (dark on CT) inside a thick cortex. "Shaft-ness" from where along the bone's
            // length (world y) the slice point lies; along y in coronal / sagittal panes.
            const bb = sh.S.p.box, by0 = bb.min.y, by1 = bb.max.y, bh = Math.max(1e-4, by1 - by0);
            const long = /^(Femur|Tibia|Fibula)$/.test(sh.S.p.name);   // long bones: a fatty shaft
            const shaftAt = yy => { if (!long) return 0; const t = (yy - by0) / bh;
              const e1 = Math.min(1, Math.max(0, (t - 0.16) / 0.12)), e2 = Math.min(1, Math.max(0, (0.84 - t) / 0.12)); return Math.min(e1, e2); };
            // fills are limited to the shape's own box: full-canvas fills per bone (×100 ribs and
            // vertebrae in a coronal slice) were most of the CT redraw time
            let bx0 = 1e9, by0p = 1e9, bx1 = -1e9, by1p = -1e9;
            sh.loops.forEach(L => L.forEach(q => { if (q[0] < bx0) bx0 = q[0]; if (q[0] > bx1) bx1 = q[0]; if (q[1] < by0p) by0p = q[1]; if (q[1] > by1p) by1p = q[1]; }));
            bx0 = Math.max(0, Math.floor(bx0) - 2); by0p = Math.max(0, Math.floor(by0p) - 2);
            const bw = Math.min(cv.width, Math.ceil(bx1) + 2) - bx0, bhp = Math.min(cv.height, Math.ceil(by1p) + 2) - by0p;
            if (bw <= 0 || bhp <= 0) return;
            g2.save(); g2.clip('nonzero');   // doubled surfaces in the bone meshes: even-odd would hollow them
            if (/^(Hip bone|Sacrum|Coccyx)|vertebra|atlas|axis \(c2|\brib\b|stern|manubrium|xiphoid|costal/i.test(sh.S.p.name)) { g2.fillStyle = '#c9c9c9'; g2.fillRect(bx0, by0p, bw, bhp); }   // pelvis, spine, ribs: dense, no trabecular network
            else if (fast || !texOK) { g2.fillStyle = '#b4b4b4'; g2.fillRect(bx0, by0p, bw, bhp); }
            else { if (!boneTex) boneTex = boneTexture(pn, s, d, shapes, cv.width, cv.height); g2.drawImage(boneTex, bx0, by0p, bw, bhp, bx0, by0p, bw, bhp); }
            const fat = 'rgba(58,58,58,', vy = v.y;
            if (long && Math.abs(vy) > 0.5) {             // pane's vertical is the body axis: gradient
              const yA = Y(by0 * vy), yB = Y(by1 * vy), gr = g2.createLinearGradient(0, yA, 0, yB);
              [0, .16, .28, .5, .72, .84, 1].forEach(t => gr.addColorStop(t, fat + shaftAt(by0 + t * bh).toFixed(2) + ')'));
              g2.fillStyle = gr; g2.fillRect(bx0, by0p, bw, bhp);
            } else if (long) { g2.fillStyle = fat + shaftAt(d).toFixed(2) + ')'; g2.fillRect(bx0, by0p, bw, bhp); }
            const sf = Math.abs(vy) > 0.5 ? 0.5 : shaftAt(d);
            path(sh.loops); g2.strokeStyle = '#f4f4f4'; g2.lineWidth = Math.max(4 * dpr, (0.005 + 0.009 * sf) * s); g2.stroke();   // clipped inside: half its width shows
            g2.restore(); return;
          }
          g2.fillStyle = CTC[sh.S.p.layer] || '#888'; g2.fill('evenodd');
          if (sh.S.tgt) { g2.fillStyle = 'rgba(95,200,255,.58)'; g2.fill('evenodd'); }   // tint, tissue still shows
          g2.strokeStyle = 'rgba(40,40,40,.55)'; g2.lineWidth = 0.8 * dpr; g2.stroke();
        };
        shapes.forEach(drawOne);
        pn.shapes = shapes;
        pn.lastSlice = performance.now();   // from the END of this redraw: slow redraws still count as continuous
        // a label only for the structure clicked (pn.pick = its name)
        const taken = [];
        g2.font = '600 ' + (10.5 * dpr) + 'px -apple-system, system-ui, sans-serif'; g2.textAlign = 'center'; g2.textBaseline = 'middle';
        shapes.filter(sh => sh.S.p.name === picked && sh.loops.length).forEach(sh => {
          let sx = 0, sy = 0, cnt = 0, area = 0;
          sh.loops.forEach(L => { for (let i = 0; i < L.length; i++) { const a = L[i], b = L[(i + 1) % L.length]; area += a[0] * b[1] - b[0] * a[1]; sx += a[0]; sy += a[1]; cnt++; } });
          const ax = sx / cnt, ay = sy / cnt, txt = sh.S.p.name.replace(/ muscle$/, '');
          const w = g2.measureText(txt).width + 6 * dpr, h = 14 * dpr;
          let ly = ay - 16 * dpr; for (let k = 0; k < 6 && taken.some(r => Math.abs(r[0] - ax) < (r[2] + w) / 2 && Math.abs(r[1] - ly) < h); k++) ly -= h;
          taken.push([ax, ly, w]);
          g2.strokeStyle = 'rgba(255,224,150,.6)'; g2.lineWidth = 1 * dpr; g2.beginPath(); g2.moveTo(ax, ay); g2.lineTo(ax, ly + h / 2 - 2 * dpr); g2.stroke();
          g2.fillStyle = 'rgba(0,0,0,.6)'; g2.fillRect(ax - w / 2, ly - h / 2, w, h);
          g2.fillStyle = '#ffe196'; g2.fillText(txt, ax, ly + 0.5 * dpr);
        });
        g2.textAlign = 'start'; g2.textBaseline = 'alphabetic';
        shapes.forEach(sh => { if (!sh.lines.length) return;
          g2.beginPath(); sh.lines.forEach(L => { g2.moveTo(L[0][0], L[0][1]); for (let i = 1; i < L.length; i++) g2.lineTo(L[i][0], L[i][1]); });
          g2.strokeStyle = sh.S.p.layer === 'bone' ? '#f2f2f2' : (CTC[sh.S.p.layer] || '#888'); g2.lineWidth = (sh.S.p.layer === 'bone' ? 2.5 : 1.5) * dpr; g2.stroke(); });
      }
      function crosshair(pn, X, Y) {
        const {u, v, g2, cv} = pn;
        g2.setLineDash([4 * dpr, 4 * dpr]); g2.lineWidth = 1 * dpr;
        panes.forEach(o => { if (o === pn) return;
          g2.strokeStyle = COL[o.k]; g2.globalAlpha = 0.7; g2.beginPath();
          const pu = o.n.dot(u), pv = o.n.dot(v);
          if (Math.abs(pu) > 0.5) { const x = X(o.d / pu); g2.moveTo(x, 0); g2.lineTo(x, cv.height); }
          else if (Math.abs(pv) > 0.5) { const y = Y(o.d / pv); g2.moveTo(0, y); g2.lineTo(cv.width, y); }
          g2.stroke(); g2.globalAlpha = 1; });
        g2.setLineDash([]);
      }
      let picked = null, soloK = null;
      const menu = document.createElement('div'); menu.className = 'jka-ctmenu'; menu.style.display = 'none'; box.appendChild(menu);
      const smallScr = window.matchMedia && (matchMedia('(hover: none)').matches || matchMedia('(max-width: 720px)').matches);
      [['axial', 'Axial'], ['coronal', 'Coronal'], ['sagittal', 'Sagittal']].concat(smallScr ? [] : [[null, 'All three']]).forEach(([k, t]) => {
        const b = document.createElement('button'); b.className = 'jka-ctmi'; b.textContent = t; b.dataset.k = k || '';
        b.addEventListener('pointerdown', ev => ev.stopPropagation());
        b.addEventListener('click', ev => { ev.stopPropagation(); menu.style.display = 'none'; solo(k, true); });
        menu.appendChild(b);
      });
      function openMenu(t) {
        if (menu.style.display !== 'none') { menu.style.display = 'none'; return; }
        const B = box.getBoundingClientRect(), R = t.getBoundingClientRect();
        menu.style.display = ''; menu.style.top = (R.bottom - B.top + 4) + 'px';
        menu.style.left = 'auto'; menu.style.right = '8px';   // flush with the right side, under the label
        menu.querySelectorAll('button').forEach(b => b.classList.toggle('on', (b.dataset.k || null) === soloK));
      }
      box.addEventListener('pointerdown', () => { menu.style.display = 'none'; });
      function solo(k, set) {
        soloK = set ? k : (soloK === k ? null : k);
        box.classList.toggle('jka-ct-solo', !!soloK);
        panes.forEach(p => p.el.classList.toggle('jka-on', p.k === soloK));
        requestAnimationFrame(() => { size(); panes.forEach(p => { p.baseKey = null; }); draw(); });
      }
      const onEsc = ev => { if (ev.key === 'Escape' && soloK && ct) { ev.preventDefault(); ev.stopPropagation(); solo(soloK); } };
      document.addEventListener('keydown', onEsc, true);
      const draw = () => panes.forEach(drawPane);
      try { window.__jkaCT = {panes, drawPane, src, slice: sliceTissue}; } catch (x) {}
      panes.forEach(pn => {
        pn.cv.addEventListener('wheel', ev => {
          ev.preventDefault(); ev.stopPropagation();
          if (ev.ctrlKey) { pn.manual = true; pn.half = Math.max(0.03, Math.min(1.0, pn.half * Math.exp(ev.deltaY * 0.01))); drawPane(pn); return; }
          pn.d -= Math.sign(ev.deltaY) * 0.003; draw();
        }, {passive: false});
        // press / drag: the other two planes follow the pointer (smooth: one redraw per frame)
        let drag = false, pend = null, raf = 0;
        const aim = ev => { const r = pn.cv.getBoundingClientRect(); pend = pn.toWorld(ev.clientX - r.left, ev.clientY - r.top);
          if (!raf) raf = requestAnimationFrame(() => { raf = 0; if (!pend) return; const P = pend; pend = null;
            panes.forEach(o => { if (o !== pn) o.d = o.n.dot(P); }); draw(); }); };
        let down = null;
        let panning = null;
        pn.cv.addEventListener('contextmenu', ev => ev.preventDefault());
        pn.cv.addEventListener('pointerdown', ev => {
          if (ev.button === 2 || ev.button === 1 || (ev.button === 0 && ev.shiftKey)) {   // pan this pane
            ev.preventDefault(); pn.manual = true; panning = [ev.clientX, ev.clientY]; pn.cv.setPointerCapture(ev.pointerId); return; }
          if (ev.button !== 0) return; down = [ev.clientX, ev.clientY]; drag = false; pn.cv.setPointerCapture(ev.pointerId); });
        pn.cv.addEventListener('pointermove', ev => {
          if (panning) { const s = pn.H / (2 * pn.half);
            pn.cu -= (ev.clientX - panning[0]) / s; pn.cvv += (ev.clientY - panning[1]) / s; panning = [ev.clientX, ev.clientY];
            if (!pn.praf) pn.praf = requestAnimationFrame(() => { pn.praf = 0; drawPane(pn); }); return; }
          if (!down) return;
          if (!drag && Math.hypot(ev.clientX - down[0], ev.clientY - down[1]) > 4) drag = true;
          if (drag) aim(ev); });
        pn.cv.addEventListener('pointerup', ev => {
          if (down && !drag) {   // a click: name the structure under the pointer (or clear)
            const r = pn.cv.getBoundingClientRect(), x = (ev.clientX - r.left) * dpr, y = (ev.clientY - r.top) * dpr;
            const g = pn.cv.getContext('2d'); let hit = null;
            (pn.shapes || []).slice().reverse().some(sh => { if (!sh.loops.length) return false;
              g.beginPath(); sh.loops.forEach(L => { g.moveTo(L[0][0], L[0][1]); L.forEach(q => g.lineTo(q[0], q[1])); g.closePath(); });
              if (g.isPointInPath(x, y, sh.S.p.layer === 'bone' ? 'nonzero' : 'evenodd')) { hit = sh.S.p.name; return true; } return false; });
            picked = hit === picked ? null : hit; draw();
          }
          down = null; drag = false; panning = null; });
        pn.cv.addEventListener('pointercancel', () => { down = null; drag = false; panning = null; });
        // touch: pinch zooms this pane, two fingers moving together scroll its slice
        const tp = new Map(); let tp0 = null;
        ['touchstart', 'touchmove', 'touchend', 'touchcancel'].forEach(t => pn.cv.addEventListener(t, ev => { ev.stopPropagation(); if (ev.cancelable) ev.preventDefault(); }, {passive: false}));
        pn.cv.addEventListener('pointerdown', ev => { if (ev.pointerType !== 'touch') return; tp.set(ev.pointerId, [ev.clientX, ev.clientY]);
          if (tp.size === 2) { down = null; drag = false; const [a, b] = [...tp.values()]; tp0 = {d: Math.hypot(a[0] - b[0], a[1] - b[1]), y: (a[1] + b[1]) / 2}; } }, true);
        pn.cv.addEventListener('pointermove', ev => { if (ev.pointerType !== 'touch' || !tp.has(ev.pointerId)) return; tp.set(ev.pointerId, [ev.clientX, ev.clientY]);
          if (tp.size !== 2 || !tp0) return; ev.stopImmediatePropagation();
          const [a, b] = [...tp.values()], d = Math.hypot(a[0] - b[0], a[1] - b[1]), y = (a[1] + b[1]) / 2;
          if (d > 10 && tp0.d > 10 && Math.abs(d - tp0.d) > 1) { pn.manual = true; pn.half = Math.max(0.03, Math.min(1.0, pn.half * tp0.d / d)); }
          pn.d += (y - tp0.y) * 0.0004; tp0 = {d, y};
          if (!pn.praf) pn.praf = requestAnimationFrame(() => { pn.praf = 0; draw(); }); }, true);
        const tl = ev => { if (ev.pointerType !== 'touch') return; tp.delete(ev.pointerId); if (tp.size < 2) tp0 = null; };
        pn.cv.addEventListener('pointerup', tl, true); pn.cv.addEventListener('pointercancel', tl, true);
        pn.cv.addEventListener('dblclick', ev => { ev.preventDefault(); if (!smallScr) solo(pn.k); });
      });
      ['pointerdown', 'pointermove', 'pointerup'].forEach(t => box.addEventListener(t, ev => ev.stopPropagation()));
      const ro = new ResizeObserver(() => { size(); draw(); }); ro.observe(wrap);
      ct = {box, mini, mark: null, marks, ro, onEsc,
            zoom: f => { panes.forEach(pn => { pn.manual = true; pn.half = Math.max(0.03, Math.min(1.0, pn.half * f)); }); draw(); },
            key: dy => { panes[0].d += dy; draw(); }};
      size(); draw();
      // one CT view on the answer side, and always on phones / small screens (pick via the label)
      const small = window.matchMedia && (matchMedia('(hover: none)').matches || matchMedia('(max-width: 720px)').matches);
      if (back || small) solo('axial', true);
      obsCache = null;
    }

    // ---- simulated radiograph (X-ray) from the current view ----
    // Each structure adds (back depth − front depth) × its attenuation into a float buffer
    // (= thickness along the ray); shown as 1 − e^(−sum): bone bright, soft tissue faint.
    // The asked structure's thickness goes to a second channel and is tinted.
    function setRad(on, forced, instant) {   // instant: a card opening in X-ray — no glide from the 3D view
      radWant = false; if (!back) window.__jkaWasRad = on;   // from here on X-ray is on or off for real
      if (on && ctOn) setCT(false);
      const wasRad = radOn; radOn = on; ctl.turntable = on;
      if (!instant) { wrap.classList.add('jka-glide'); setTimeout(() => wrap.classList.remove('jka-glide'), 450); }   // glide only for a switch by hand
      wrap.classList.toggle('jka-radmode', on); fit(); edgeAlign();   // a crisp, rounded film box (no edge fade)
      // X-ray beams are near-parallel: a long narrow lens from far back (same framing) so
      // joints anywhere in the picture are seen straight-on, not looked down / up into
      const LENS = Math.tan(THREE.MathUtils.degToRad(15)) / Math.tan(THREE.MathUtils.degToRad(3.5));
      if (on && !wasRad) { ctl.autoRotate = false; const L = ctl.level();
        cam.fov = 7; cam.far = 40; cam.updateProjectionMatrix();
        const p0 = ctl.target.clone().add(cam.position.clone().sub(ctl.target).multiplyScalar(LENS));
        const p1 = ctl.target.clone().add(L.p1.clone().sub(ctl.target).multiplyScalar(LENS));
        if (instant) { cam.position.copy(p1); if (L.u1) cam.up.copy(L.u1); cam.lookAt(ctl.target); ease = null; }   // straight to the level film view
        else { cam.position.copy(p0); ease = {p0, t0: ctl.target.clone(), p1, t1: ctl.target.clone(), s: 0, u1: L.u1}; } }
      if (!on && wasRad) { cam.fov = 30; cam.far = 20; cam.updateProjectionMatrix();
        cam.position.copy(ctl.target.clone().add(cam.position.clone().sub(ctl.target).multiplyScalar(1 / LENS))); }
      wrap.querySelectorAll('button[data-l=xray]').forEach(b => { b.className = on ? 'jka-b on' : 'jka-b'; });
      if (!forced) try { localStorage.setItem('jka-rad', on ? '1' : '0'); } catch (x) {}
      if (on && !rad) { const T = window.__jkaT || {}; T.radStart = Math.round(performance.now() - (T.t0 || 0));
        const MU = {bone: 55, muscle: 1.5, vessel: 3.2, nerve: 2.6};   // soft tissue light: joint spaces stay dark
        const rs = new THREE.Scene();
        // shrink > 0: the surface moved inward along its normals (the inner face of the cortex);
        // tex > 0: the contribution is mottled (trabecular bone)
        const mk = (mu, tgt, shrink, tex) => new THREE.ShaderMaterial({
          uniforms: {mu: {value: mu}, tg: {value: tgt ? 1 : 0}, sh: {value: shrink || 0}, tx: {value: tex || 0}, ctr: {value: new THREE.Vector3()}, fl: {value: 1}},
          // depth measured from the structure's own centre: a ray that slips through a crack
          // in the mesh then adds a tiny error, not a bright / black speck
          vertexShader: 'uniform float sh; uniform vec3 ctr; varying float vz; varying vec3 wp; void main(){ vec3 p = position - normal * sh;'
            + ' vec4 w = modelMatrix * vec4(p, 1.); wp = w.xyz; vec4 mv = viewMatrix * w; vec4 mc = viewMatrix * vec4(ctr, 1.);'
            + ' vz = mc.z - mv.z; gl_Position = projectionMatrix * mv; }',
          fragmentShader: 'uniform float mu, tg, tx, fl; varying float vz; varying vec3 wp;'
            + ' float h(vec3 p){ return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }'
            + ' void main(){ float s = (gl_FrontFacing ? -1. : 1.) * fl;'
            + ' gl_FragColor = vec4(s * vz * mu, s * vz * tg * 40., s * vz * tx, 1.); }',
          side: THREE.DoubleSide, depthTest: false, depthWrite: false, transparent: true,
          blending: THREE.CustomBlending, blendEquation: THREE.AddEquation, blendSrc: THREE.OneFactor, blendDst: THREE.OneFactor});
        const mats = {};
        const add = (p, m0) => { const m = m0.clone(); m.uniforms.ctr.value = p.box.getCenter(new THREE.Vector3());
          const o = new THREE.Mesh(p.mesh.geometry, m); o.matrixAutoUpdate = false; o.matrix.copy(p.mesh.matrixWorld);
          o.userData.src = p; rs.add(o); };
        parts.forEach(p => {
          if (p.layer === 'nerve' || p.layer === 'vessel' || p.layer === 'vein' || p.layer === 'ligament' || p.layer === 'capsule') return;   // soft / thin: ~no contrast, only speckle
          const tgt = target.includes(p), key = p.layer + tgt;
          if (p.layer === 'bone') {
            // cortex: dense outer shell (~2.5 mm); inside it, lighter mottled trabecular bone
            add(p, mats.bo || (mats.bo = mk(150, false, 0, 0)));
            add(p, mats.bi || (mats.bi = mk(-150, false, 0.006, 9)));
            if (tgt && !LM && mode === 'name') add(p, mats.bt || (mats.bt = mk(0, true, 0, 0)));   // the asked bone: blue tint
            return;
          }
          add(p, mats[key] || (mats[key] = mk(MU[p.layer] || 2.6, tgt)));
        });
        // the whole skeleton: the other limb (this one mirrored; midline bones aren't doubled)
        // and the trunk's bones (spine, ribs, sternum, pelvis), drawn whatever the card's region
        const addBone = (geo, mtx, box, flip) => {
          const ctr = box.getCenter(new THREE.Vector3());
          [[mats.bo || (mats.bo = mk(150, false, 0, 0))], [mats.bi || (mats.bi = mk(-150, false, 0.006, 9))]].forEach(([m0]) => {
            const m = m0.clone(); m.uniforms.ctr.value = ctr; m.uniforms.fl.value = flip ? -1 : 1;
            const o = new THREE.Mesh(geo, m); o.matrixAutoUpdate = false; o.matrix.copy(mtx); o.userData.always = true; rs.add(o); });
        };
        const MIR = new THREE.Matrix4().makeScale(-1, 1, 1);
        parts.forEach(p => { if (p.layer !== 'bone') return; const cx = (p.box.min.x + p.box.max.x) / 2;
          if (p.box.min.x < 0.005 && p.box.max.x > -0.005) return;   // crosses the midline: already whole
          const b = p.box.clone().applyMatrix4(MIR);
          addBone(p.mesh.geometry, MIR.clone().multiply(p.mesh.matrixWorld), b, false); });   // three.js flips the facing for mirrored matrices itself
        load(ctxModel).then(g => {
          if (stopped) return; g.updateMatrixWorld(true); const own = new Set(parts.map(q => q.name));
          g.traverse(o => { if (!o.isMesh || (o.userData || {}).l !== 'bone') return;
            if (own.has(String(o.userData.n || o.name).replace(/\.[lr]$/, ''))) return;
            addBone(o.geometry, o.matrixWorld, new THREE.Box3().setFromObject(o), false); });
          dirty = true;
        }).catch(() => {});
        const rt = new THREE.WebGLRenderTarget(4, 4, {type: THREE.HalfFloatType, depthBuffer: false}); viewDisp.push(rt);
        const show = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({
          vertexShader: 'varying vec2 vu; void main(){ vu = uv; gl_Position = vec4(position.xy, 0., 1.); }',
          uniforms: {t: {value: rt.texture}, px: {value: new THREE.Vector2(1, 1)}},
          fragmentShader: 'uniform sampler2D t; uniform vec2 px; varying vec2 vu; float hh(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }'
            + ' float vn(vec2 q){ vec2 i = floor(q), f = fract(q); f = f * f * (3. - 2. * f);'
            + ' return mix(mix(hh(i), hh(i + vec2(1, 0)), f.x), mix(hh(i + vec2(0, 1)), hh(i + vec2(1, 1)), f.x), f.y); }'
            + ' vec4 mn(vec4 a, vec4 b){ return min(a, b); } vec4 mx(vec4 a, vec4 b){ return max(a, b); }'
            + ' vec4 med5(vec4 a, vec4 b, vec4 c, vec4 d, vec4 e){'   // median of 5 (per channel)
            + '  vec4 f = mx(mn(a, b), mn(c, d)); vec4 g = mn(mx(a, b), mx(c, d));'
            + '  return mx(mn(f, g), mn(mx(f, g), e)) * 0. + mn(mx(mn(f, g), e), mx(f, g)); }'
            + ' void main(){ vec4 a = med5(texture2D(t, vu), texture2D(t, vu + vec2(px.x, 0.)), texture2D(t, vu - vec2(px.x, 0.)),'
            + '  texture2D(t, vu + vec2(0., px.y)), texture2D(t, vu - vec2(0., px.y)));'
            + ' float n = vn(gl_FragCoord.xy / 4.) * .6 + vn(gl_FragCoord.xy / 1.7) * .4;'
            + ' float tb = max(a.b, 0.) * (0.7 + 0.6 * n);'
            + ' float g = 1. - exp(-max(a.r + tb, 0.)); float k = 1. - exp(-max(a.g, 0.));'
            + ' float bl = 0.; for (int i = 0; i < 8; i++) { float an = float(i) * 0.785398; vec4 q = texture2D(t, vu + vec2(cos(an), sin(an)) * px * 4.);'
            + '  bl += 1. - exp(-max(q.r + max(q.b, 0.), 0.)); } bl /= 8.;'
            + ' g = clamp(g + 0.9 * (g - bl), 0., 1.);'   // edge enhancement, as film processing does
            + ' vec3 c = vec3(g) * 0.92 + 0.03; c = mix(c, vec3(0.37, 0.78, 1.), clamp(k, 0., 1.) * 0.6);'
            + ' gl_FragColor = vec4(c, 1.); }',
          depthTest: false, depthWrite: false}));
        const ss = new THREE.Scene(); ss.add(show);
        // landmark patch over the film (from the 'jkw' weights painted on the bone)
        let ps = null;
        if (LM && mode === 'name') {
          ps = new THREE.Scene();
          const pm = new THREE.ShaderMaterial({
            vertexShader: 'attribute float jkw; varying float w; void main(){ w = jkw; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }',
            fragmentShader: 'varying float w; void main(){ if (w < 0.05) discard; gl_FragColor = vec4(0.25, 0.8, 1., clamp(w, 0., 1.) * 0.55); }',
            transparent: true, depthTest: false, depthWrite: false, side: THREE.DoubleSide});
          target.forEach(p => { const g = p.mesh.geometry;
            if (!g.attributes.jkw) g.setAttribute('jkw', new THREE.BufferAttribute(new Float32Array(g.attributes.position.count), 1));
            const o = new THREE.Mesh(g, pm); o.matrixAutoUpdate = false; o.matrix.copy(p.mesh.matrixWorld); ps.add(o); });
        }
        rad = {rs, rt, ss, ps}; T.radBuilt = Math.round(performance.now() - (T.t0 || 0));
      }
      lab.style.display = on ? 'none' : ''; svg.style.display = on ? 'none' : '';
      dirty = true;
    }
    function drawRad() { { const T = window.__jkaT || {}; if (T.radFrame == null) T.radFrame = Math.round(performance.now() - (T.t0 || 0)); }
      const sz = renderer.getDrawingBufferSize(new THREE.Vector2());
      if (rad.rt.width !== sz.x || rad.rt.height !== sz.y) { rad.rt.setSize(sz.x, sz.y); rad.ss.children[0].material.uniforms.px.value.set(1 / sz.x, 1 / sz.y); }
      rad.rs.children.forEach(o => { if (o.userData.always) { o.visible = true; return; } const p = o.userData.src; o.visible = p.layer === 'bone' || (inRegion(p) && p.mesh.visible); });
      renderer.setRenderTarget(rad.rt); renderer.setClearColor(0x000000, 0); renderer.clear(); renderer.render(rad.rs, cam);
      renderer.setRenderTarget(null); renderer.clear(); renderer.render(rad.ss, fadeCam);   // no fade: sharp film edges
      if (rad.ps) { rad.ps.children.forEach((o, i) => { const p = target[i]; if (p && o.geometry !== p.mesh.geometry) o.geometry = p.mesh.geometry; }); renderer.render(rad.ps, cam); }
    }

    const fadeScene = new THREE.Scene(), fadeCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    fadeScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({
      vertexShader: 'varying vec2 vv; void main(){ vv = uv; gl_Position = vec4(position.xy, 0., 1.); }',
      fragmentShader: 'varying vec2 vv; uniform float ft, fb; void main(){ float a = smoothstep(0., fb, vv.y) * smoothstep(0., ft, 1. - vv.y)'
        + ' * smoothstep(0., .06, vv.x) * smoothstep(0., .06, 1. - vv.x); gl_FragColor = vec4(0., 0., 0., a); }',   // all four edges fade
      uniforms: {ft: {value: FADE_TOP}, fb: {value: FADE_BOT}},
      transparent: true, depthTest: false, depthWrite: false, blending: THREE.CustomBlending,
      blendEquation: THREE.AddEquation, blendSrc: THREE.ZeroFactor, blendDst: THREE.SrcAlphaFactor,
      blendSrcAlpha: THREE.ZeroFactor, blendDstAlpha: THREE.SrcAlphaFactor})));
    renderer.autoClear = false;
    // view crosshair (top-left, shown while the pointer is over the model): six arms, one per
    // anatomical direction, turning with the model. Click an end → glide to that view (works for
    // arms pointing away too). Drag on it → rotates the model.
    const views = document.createElement('div'); views.className = 'jka-views';
    const NS = 'http://www.w3.org/2000/svg', GS = 112, GC = GS / 2, GR = 42;
    const gsvg = document.createElementNS(NS, 'svg'); gsvg.setAttribute('viewBox', '0 0 ' + GS + ' ' + GS);
    gsvg.setAttribute('class', 'jka-gizmo'); views.appendChild(gsvg);
    const latX = left ? 1 : -1;
    const AX = [['anterior', 'A', [0, 0, 1], '#7fd8ff'], ['posterior', 'P', [0, 0, -1], '#7fd8ff'],
                ['superior', 'S', [0, 1, 0], '#ffd36b'], ['inferior', 'I', [0, -1, 0], '#ffd36b'],
                ['lateral', 'L', [latX, 0, 0], '#ff8f8f'], ['medial', 'M', [-latX, 0, 0], '#ff8f8f']];
    const arms = AX.map(([k, t, v, c]) => {
      const g = document.createElementNS(NS, 'g'); g.setAttribute('class', 'jka-arm'); g.dataset.k = k;
      const ln = document.createElementNS(NS, 'line');
      ln.setAttribute('stroke', c);
      const dot = document.createElementNS(NS, 'circle'); dot.setAttribute('fill', c);
      const tx = document.createElementNS(NS, 'text'); tx.textContent = t; tx.setAttribute('class', 'jka-gt'); tx.setAttribute('fill', c);
      const hit = document.createElementNS(NS, 'circle'); hit.setAttribute('r', 11); hit.setAttribute('class', 'jka-hit');
      g.append(ln, dot, tx, hit); gsvg.appendChild(g);
      return {k, v: new THREE.Vector3(...v), g, ln, dot, tx, hit};
    });
    const cubeG = document.createElementNS(NS, 'g'); cubeG.setAttribute('class', 'jka-gcube');
    const CF = [[[1,0,0],[1,-1,-1],[1,1,-1],[1,1,1],[1,-1,1]], [[-1,0,0],[-1,-1,-1],[-1,-1,1],[-1,1,1],[-1,1,-1]],
                [[0,1,0],[-1,1,-1],[-1,1,1],[1,1,1],[1,1,-1]], [[0,-1,0],[-1,-1,-1],[1,-1,-1],[1,-1,1],[-1,-1,1]],
                [[0,0,1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]], [[0,0,-1],[-1,-1,-1],[-1,1,-1],[1,1,-1],[1,-1,-1]]]
      .map(f => { const pg = document.createElementNS(NS, 'polygon'); cubeG.appendChild(pg);
        return {n: new THREE.Vector3(...f[0]), c: f.slice(1).map(v => new THREE.Vector3(...v)), pg}; });
    const secPoly = document.createElementNS(NS, 'polygon'); secPoly.setAttribute('class', 'jka-gsec');
    const CE = [[0,1],[2,3],[4,5],[6,7],[0,2],[1,3],[4,6],[5,7],[0,4],[1,5],[2,6],[3,7]];
    const CV = []; for (let i = 0; i < 8; i++) CV.push(new THREE.Vector3(i & 1 ? 1 : -1, i & 2 ? 1 : -1, i & 4 ? 1 : -1));
    const CH = 7;   // cube half-size (px)
    const q = new THREE.Quaternion();
    // the crosshair is drawn from a little above and to the side of the real view, so the
    // section (the plane facing you) is seen at an angle through the cube instead of flat-on
    const QOFF = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.38, -0.5, 0, 'YXZ'));
    const SECN = new THREE.Vector3(0, 0, 1).applyQuaternion(QOFF);
    // Fixed frame: the cube (the body) and its six arms are always drawn from the same
    // anterior-lateral-superior 3/4 view; the blue square is the plane you are looking at
    // (perpendicular to the view) and turns as the model turns.
    const FV = new THREE.Vector3(0.42 * latX, 0.5, 0.76).normalize();
    const FR = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), FV).normalize();
    const FU = new THREE.Vector3().crossVectors(FV, FR);
    const P = v => new THREE.Vector3(v.dot(FR), v.dot(FU), v.dot(FV));
    let gKey = '';
    // two consistent ways to draw it (switch, top-left; remembered):
    //   section — body cube + arms fixed, the blue plane turns to show the section you view
    //   axes    — cube + arms turn with the orbit (screen directions), the plane faces you
    let gMode = 'section';
    try { gMode = localStorage.getItem('jka-gizmo') === 'axes' ? 'axes' : 'section'; } catch (x) {}
    const gsw = document.createElement('button'); gsw.className = 'jka-gsw';
    gsw.innerHTML = '<svg viewBox="0 0 18 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4.20 7.51 A5.2 5.2 0 0 1 13.80 7.51"/><path d="M6.46 6.23 L4.20 7.51 L3.50 5.00"/><path d="M14.50 5.00 L13.80 7.51 L11.54 6.23"/></svg>';
    const gswText = () => {
      gsw.removeAttribute('title'); };
    gswText();
    gsw.addEventListener('pointerdown', ev => ev.stopPropagation());
    gsw.addEventListener('click', ev => {
      ev.stopPropagation(); gMode = gMode === 'axes' ? 'section' : 'axes'; gswText(); gKey = '';
      try { localStorage.setItem('jka-gizmo', gMode); } catch (x) {}
      drawCube();
    });
    views.insertBefore(gsw, views.firstChild);
    // desktop: + / − sit at the orbit widget's bottom corners (phones have no widget or zoom buttons)
    if (!(window.matchMedia && (matchMedia('(hover: none)').matches || matchMedia('(max-width: 720px)').matches))) {
      const zbEl = wrap.querySelector(':scope > .jka-zoom'); if (zbEl) { zbEl.classList.add('jka-zoom-w'); views.appendChild(zbEl); }
    }
    // play / pause the slow spin (top-right of the widget, opposite the switch)
    const gpl = document.createElement('button'); gpl.className = 'jka-gpl';
    const PLAYI = '<svg viewBox="0 0 12 12" width="11" height="11"><path d="M3 1.8v8.4l7-4.2z" fill="currentColor"/></svg>',
          PAUSEI = '<svg viewBox="0 0 12 12" width="11" height="11"><path d="M2.6 1.8h2.4v8.4H2.6zM7 1.8h2.4v8.4H7z" fill="currentColor"/></svg>';
    let gplState = null;
    const gplSync = () => { const on = !!ctl.autoRotate; if (on !== gplState) { gplState = on; gpl.innerHTML = on ? PAUSEI : PLAYI;
      const m = wrap.querySelector(':scope > .jka-mplay'); if (m) m.innerHTML = gpl.innerHTML; } };
    gpl.addEventListener('pointerdown', ev => ev.stopPropagation());
    const toggleSpin = () => {
      clearTimeout(spinT);
      if (ctl.autoRotate) { ctl.autoRotate = false; user = true; noSpin = true; }   // stays still until played
      else { noSpin = false; user = false; ease = null; ctl.autoRotate = true; }
      gplSync();
    };
    gpl.addEventListener('click', ev => { ev.stopPropagation(); toggleSpin(); });
    views.insertBefore(gpl, views.firstChild);
    // phones: the same play / pause, bottom-right (AnkiMobile keeps one-finger swipes for itself,
    // so the spin is how you see other sides there; pinch still zooms)
    const mpl = document.createElement('button'); mpl.className = 'jka-mplay';
    ['touchstart', 'touchend', 'pointerdown'].forEach(t => mpl.addEventListener(t, ev => ev.stopPropagation(), {passive: true}));
    mpl.addEventListener('click', ev => { ev.stopPropagation(); ev.preventDefault(); toggleSpin(); });
    wrap.appendChild(mpl);
    gplSync();
    function drawCube() {   // (name kept: called from the render loop)
      const w = cam.position.clone().sub(ctl.target).normalize();
      const key = w.x.toFixed(3) + w.y.toFixed(3) + w.z.toFixed(3) + gMode + (gMode === 'axes' ? cam.up.y.toFixed(3) : '');
      if (key === gKey) return; gKey = key;
      q.copy(cam.quaternion).invert();
      const axes = gMode === 'axes';
      const T = axes ? (v => v.clone().applyQuaternion(q)) : P;   // world → widget (x right, y up, z out)
      arms.forEach(a => {
        const p = T(a.v);
        const x = GC + p.x * GR, y = GC - p.y * GR;
        a.depth = p.z;
        a.ln.setAttribute('x1', GC + p.x * 14); a.ln.setAttribute('y1', GC - p.y * 14);
        a.ln.setAttribute('x2', GC + p.x * (GR - 8)); a.ln.setAttribute('y2', GC - p.y * (GR - 8));
        a.dot.setAttribute('r', 0);
        a.hit.setAttribute('cx', x); a.hit.setAttribute('cy', y);
        a.tx.setAttribute('x', x); a.tx.setAttribute('y', y + 0.5);
        a.g.style.opacity = (0.45 + 0.55 * Math.max(0, a.v.dot(w))).toFixed(2);
      });
      CF.forEach(f => {
        const nz = T(f.n).z;
        f.pg.style.display = nz > 0.01 ? '' : 'none';
        f.pg.setAttribute('points', f.c.map(v => { const c = T(v.clone().multiplyScalar(CH));
          return (GC + c.x).toFixed(1) + ',' + (GC - c.y).toFixed(1); }).join(' '));
        f.pg.style.fillOpacity = (0.1 + 0.22 * nz).toFixed(2);
      });
      // section square: perpendicular to the view, through the cube's centre
      const up = Math.abs(w.y) > 0.9 ? new THREE.Vector3(0, 0, 1) : new THREE.Vector3(0, 1, 0);
      const s1 = new THREE.Vector3().crossVectors(up, w).normalize(), s2 = new THREE.Vector3().crossVectors(w, s1);
      const SS = 15;
      if (axes) {
        // axes mode: the section is the actual slice of the cube by the plane facing you
        // (z = 0 here), so its shape — square, rectangle, hexagon — shows the angle
        const cv = CV.map(v => T(v.clone().multiplyScalar(CH))), pts = [];
        CE.forEach(([i, j]) => { const A = cv[i], B = cv[j];
          if ((A.z > 0) !== (B.z > 0)) { const t = A.z / (A.z - B.z); pts.push([A.x + (B.x - A.x) * t, A.y + (B.y - A.y) * t]); } });
        const mx = pts.reduce((s, p) => s + p[0], 0) / (pts.length || 1), my = pts.reduce((s, p) => s + p[1], 0) / (pts.length || 1);
        pts.sort((p1, p2) => Math.atan2(p1[1] - my, p1[0] - mx) - Math.atan2(p2[1] - my, p2[0] - mx));
        secPoly.setAttribute('points', pts.map(p => (GC + p[0]).toFixed(1) + ',' + (GC - p[1]).toFixed(1)).join(' '));
      } else secPoly.setAttribute('points', [[1, 1], [1, -1], [-1, -1], [-1, 1]].map(([i, j]) => {
        const c = T(s1.clone().multiplyScalar(i * SS).addScaledVector(s2, j * SS));
        return (GC + c.x).toFixed(1) + ',' + (GC - c.y).toFixed(1); }).join(' '));
      const order = arms.slice().sort((a, b) => a.depth - b.depth);
      order.filter(a => a.depth < 0).forEach(a => gsvg.appendChild(a.g));
      gsvg.appendChild(cubeG); gsvg.appendChild(secPoly);
      order.filter(a => a.depth >= 0).forEach(a => gsvg.appendChild(a.g));
    }
    let gDrag = null;
    gsvg.addEventListener('pointerdown', ev => {
      ev.stopPropagation(); ev.preventDefault(); touched();
      gDrag = {x: ev.clientX, y: ev.clientY, moved: false, k: ev.target.closest('.jka-arm') && ev.target.closest('.jka-arm').dataset.k};
      gsvg.setPointerCapture(ev.pointerId);
    });
    const sph = new THREE.Spherical();
    gsvg.addEventListener('pointermove', ev => {
      if (!gDrag) return;
      const dx = ev.clientX - gDrag.x, dy = ev.clientY - gDrag.y;
      if (!gDrag.moved && Math.hypot(dx, dy) < 3) return;
      gDrag.moved = true; gDrag.x = ev.clientX; gDrag.y = ev.clientY; ease = null;
      ctl.rotate(dx * 0.018, dy * 0.018); moved(); if (!back) keepCam();
    });
    gsvg.addEventListener('pointerup', ev => {
      const d0 = gDrag; gDrag = null; if (!d0 || d0.moved || !d0.k) return;
      const dd = cam.position.distanceTo(ctl.target);
      ease = {p0: cam.position.clone(), t0: ctl.target.clone(),
              p1: ctl.target.clone().addScaledVector(dir(d0.k, left), dd), t1: ctl.target.clone(), s: 0};
    });
    wrap.appendChild(views);

    // section plane: named under the crosshair (one widget, top-left)
    const stxt = document.createElement('div'); stxt.className = 'jka-sect'; views.appendChild(stxt);
    wrap.appendChild(bar);   // layer list: bottom-left corner
    setTimeout(edgeAlign, 0); setTimeout(edgeAlign, 300); setTimeout(edgeAlign, 650); setTimeout(edgeAlign, 1200);   // again once Janki has fitted the card / after the slide
    let secKey = '';
    function drawSec() {
      const w = cam.position.clone().sub(ctl.target).normalize();
      const a = new THREE.Vector3(w.x * (left ? 1 : -1), w.y, w.z);      // (lateral, superior, anterior)
      const key = a.x.toFixed(2) + a.y.toFixed(2) + a.z.toFixed(2); if (key === secKey) return; secKey = key;
      const ax = Math.abs(a.x), ay = Math.abs(a.y), az = Math.abs(a.z), D = r => Math.round(r * 180 / Math.PI);
      let name, t1, t2;
      if (az >= ax && az >= ay) { name = 'Coronal'; t1 = [D(Math.atan2(a.x, az)), a.x >= 0 ? 'L' : 'M']; t2 = [D(Math.asin(a.y)), a.y >= 0 ? 'S' : 'I']; }
      else if (ax >= ay) { name = 'Sagittal'; t1 = [D(Math.atan2(a.z, ax)), a.z >= 0 ? 'A' : 'P']; t2 = [D(Math.asin(a.y)), a.y >= 0 ? 'S' : 'I']; }
      else { name = 'Transverse'; t1 = [D(Math.atan2(a.z, ay)), a.z >= 0 ? 'A' : 'P']; t2 = [D(Math.atan2(a.x, ay)), a.x >= 0 ? 'L' : 'M']; }
      const tilt = [t1, t2].filter(t => Math.abs(t[0]) >= 5).map(t => Math.abs(t[0]) + '° ' + t[1]);
      stxt.innerHTML = '<b>' + name + '</b>' + (tilt.length ? '<span>' + tilt.join(' · ') + '</span>' : '');
    }
    // (which side is deliberately not written: telling left from right is part of the drill)
    window.__jkaView = {cam, ctl, parts, target, d, center, renderer};
    let labMoving = false;
    let lastT = 0, dirty = true, lastX = 0, moving = false, idleT = 0, checksDue = true;
    // while the view moves: lower resolution, no visibility checks; full quality once it settles
    function moved() {
      dirty = true; checksDue = true;
      if (!moving) { moving = true; renderer.setPixelRatio(DPR_MOVE); fit(); }
      clearTimeout(idleT);
      idleT = setTimeout(() => { moving = false; renderer.setPixelRatio(DPR); fit(); dirty = true; }, 180);
    }
    // slow turntable spin to show the structure from all sides; any touch stops it, and it
    // picks up again after a while untouched
    ctl.autoRotateSpeed = 1.2;   // ≈ 50 s per turn
    let user = false, spinT = 0, noSpin = LITE;   // Lite: no turntable unless played (an idle model draws nothing)
    const spinOn = () => { if (!radOn) ctl.autoRotate = true; };   // no turntable on an X-ray
    function touched() {
      user = true; ctl.autoRotate = false; clearTimeout(spinT);
      spinT = setTimeout(() => { user = false; if (!noSpin) spinOn(); }, 9000);
    }
    ['pointerdown', 'wheel'].forEach(ev => renderer.domElement.addEventListener(ev, touched, true));
    renderer.domElement.addEventListener('pointerup', () => { setTimeout(() => { user = false; }, 0); }, true);
    if (!LITE) setTimeout(spinOn, back ? 700 : 400);
    ctl.addEventListener('change', () => {
      if (user || ease) moved(); else { dirty = true; checksDue = true; }
      if (!back) keepCam(); });
    if (!back) keepCam();
    // a resize clears the canvas: redraw right here (before the browser paints) so a resizing
    // film / view never shows an empty frame (the X-ray answer's glide resizes it every frame)
    new ResizeObserver(() => { fit(); dirty = true;
      try { if (stopped) return; if (radOn && rad) drawRad(); else { renderer.clear(); renderer.render(scene, cam); renderer.render(fadeScene, fadeCam); } } catch (x) {}
    }).observe(wrap);
    labels.push(...minor);
    if (peelUI) setPeel(back ? 1 : 0); else layout();
    // arrow keys turn the model (held = continuous, smooth)
    const keys = new Set(); let keyShift = false;
    const onKey = ev => {
      if (!/^Arrow(Left|Right|Up|Down)$/.test(ev.key) || ev.metaKey || ev.ctrlKey || ev.altKey) return;
      if (stopped || !root.isConnected) { document.removeEventListener('keydown', onKey, true); document.removeEventListener('keyup', offKey, true); return; }
      ev.preventDefault(); ev.stopPropagation(); keyShift = ev.shiftKey;
      if (!keys.has(ev.key)) { keys.add(ev.key); touched(); }
    };
    const offKey = ev => { keys.delete(ev.key); if (ev.key === 'Shift') keyShift = false; };
    // controller (Janki's gamepad → JKANAT.input): d-pad held = arrow held, +/− = zoom
    view.in_key = (k, down) => { keyShift = false; if (down) { if (!keys.has(k)) { keys.add(k); touched(); } } else keys.delete(k); };
    view.in_zoom = s => zoomBy(s > 0 ? 0.75 : 1 / 0.75);
    document.addEventListener('keydown', onKey, true); document.addEventListener('keyup', offKey, true);
    window.addEventListener('blur', () => keys.clear());
    let liteDrawn = -1e9;
    (function tick(t) {
      if (stopped || !root.isConnected) { if (!stopped) view.stop(); return; }
      requestAnimationFrame(tick);
      if (ease) {
        if (!ease.s) ease.s = t;
        const k = Math.min(1, (t - ease.s) / 500), q = 1 - Math.pow(1 - k, 3);   // same .5s as the slide
        cam.position.lerpVectors(ease.p0, ease.p1, q); ctl.target.lerpVectors(ease.t0, ease.t1, q);
        if (!ease.u0) { ease.u0 = cam.up.clone(); ease.u1 = ease.u1 || upFor(ease.p1.clone().sub(ease.t1).normalize()); }
        cam.up.lerpVectors(ease.u0, ease.u1, q).normalize();
        if (ease.q0) { pan.lerpVectors(ease.q0, ease.q1, q); applyView(); }
        dirty = true; if (k >= 1) ease = null;
      }
      const dt = lastT ? Math.min(0.05, (t - lastT) / 1000) : 0; lastT = t;
      if (ct) {   // CT view: up / down arrows (and the d-pad) step through slices; the model is paused
        const ky = (keys.has('ArrowUp') ? 1 : 0) - (keys.has('ArrowDown') ? 1 : 0);
        if (ky) ct.key(ky * 0.06 * dt);
        if (!ct.mini) return;
        ctl.update(dt);
        if (dirty) { dirty = false; renderer.clear(); renderer.render(scene, cam); }
        return;
      }
      if (keys.size && !ease) {
        const a = 1.7 * dt, kx = (keys.has('ArrowRight') ? 1 : 0) - (keys.has('ArrowLeft') ? 1 : 0),
              ky = (keys.has('ArrowDown') ? 1 : 0) - (keys.has('ArrowUp') ? 1 : 0);
        if ((kx || ky) && keyShift) {      // shift + arrows pan the picture
          user = true; pan.x += kx * 420 * dt; pan.y += ky * 420 * dt; applyView(); moved(); if (!back) keepCam();
          clearTimeout(spinT); spinT = setTimeout(() => { user = false; if (!noSpin) spinOn(); }, 9000);
        } else if (kx || ky) { user = true; ctl.rotate(kx * a, ky * a); clearTimeout(spinT); spinT = setTimeout(() => { user = false; if (!noSpin) spinOn(); }, 9000); }
      }
      if (!ease) ctl.update(dt); else cam.lookAt(ctl.target);
      if (radWant && !radOn) return;   // X-ray coming: no plain-3D frame first (that was the flicker)
      if (!dirty && t > 1500) { if (labMoving || labDirty) labMoving = place(t); return; }
      if (LITE && t - liteDrawn < 32) return;   // Lite: at most ~30 frames a second (dirty stays set)
      liteDrawn = t;
      dirty = false;
      key.position.copy(cam.position).add(new THREE.Vector3(0.3, 0.5, 0.2));
      if (!moving && checksDue && t - lastX > (LITE ? 400 : ctl.autoRotate ? 200 : 60)) { lastX = t; checksDue = false; doXray(); occl(); }
      if (radOn && rad) drawRad(); else { renderer.clear(); renderer.render(scene, cam); renderer.render(fadeScene, fadeCam); }
      if (!wrap.classList.contains('jka-shown')) requestAnimationFrame(() => wrap.classList.add('jka-shown'));   // one fade-in, once drawn
      drawCube(); drawSec(); gplSync();
      labMoving = place(t);
    })(0);
    setTimeout(() => { doXray(); dirty = true; }, 50);
  }
  return view;
}

window.JKANAT = {v: 80, mount, input: (t, a, b) => { const f = live && live['in_' + t]; if (f) f(a, b); return !!f; }};
(window.__jkaQ || []).splice(0).forEach(f => f());
