// Patch: extend spinal dura + arachnoid (and their opened halves) into a dural sac around the
// cauda equina, ending at S2. In: trunk7.glb  Out: argv[3]
import {NodeIO} from '@gltf-transform/core';
import {ALL_EXTENSIONS} from '@gltf-transform/extensions';
import {dequantize, quantize} from '@gltf-transform/functions';
import * as THREE from 'three';
const [,, inp, outp, s2y='0.925'] = process.argv;
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
const doc = await io.read(inp); await doc.transform(dequantize());
const nodes = doc.getRoot().listNodes(), byName = n => nodes.find(x => x.getName() === n);
const world = n => { const P = []; const m = new THREE.Matrix4().fromArray(n.getWorldMatrix());
  n.getMesh().listPrimitives().forEach(p => { const a = p.getAttribute('POSITION').getArray();
    for (let i = 0; i < a.length; i += 3) P.push(new THREE.Vector3(a[i], a[i+1], a[i+2]).applyMatrix4(m)); }); return P; };
const cauda = world(byName('Cauda equina')), dura = world(byName('Spinal dura'));
const S2 = +s2y, yTop = 1.13;
const top = dura.filter(v => Math.abs(v.y - yTop) < 0.004), tc = top.reduce((a, v) => a.add(v), new THREE.Vector3()).multiplyScalar(1 / top.length);
const RX = 0.008, RZ = 0.0065, NR = 28, rings = [];
const mid = cauda.filter(v => Math.abs(v.x - tc.x) < 0.006);
const cz = y => { const c = mid.filter(v => Math.abs(v.y - y) < 0.006).map(v => v.z).sort((a, b) => a - b); return c.length > 4 ? c[c.length >> 1] : null; };
let last = tc.z;
for (let y = yTop; y > S2 - 0.0001; y -= 0.003) {
  const z = cz(y); const t = Math.min(1, (yTop - y) / 0.03); if (z != null) last = tc.z + (z - tc.z) * t;
  const end = (y - S2) / 0.016, f = end < 1 ? Math.sqrt(Math.max(0.03, end)) : 1;
  rings.push({y, cx: tc.x, cz: last, rx: RX * f, rz: RZ * f});
}
rings.push({y: S2 - 0.002, cx: tc.x, cz: last, rx: 0.0002, rz: 0.0002});
function add(name, inset, half) {
  const n = byName(name); if (!n) { console.log('missing', name); return; }
  const prim = n.getMesh().listPrimitives()[0], inv = new THREE.Matrix4().fromArray(n.getWorldMatrix()).invert();
  const nm3 = new THREE.Matrix3().getNormalMatrix(inv);
  const P = Array.from(prim.getAttribute('POSITION').getArray()), N = Array.from(prim.getAttribute('NORMAL').getArray());
  const I = Array.from(prim.getIndices().getArray()), base = P.length / 3;
  const K = half ? NR / 2 : NR;
  for (let t = I.length - 3; t >= 0; t -= 3) if (P[I[t]*3+1] !== undefined) { const wy = j => new THREE.Vector3(P[j*3], P[j*3+1], P[j*3+2]).applyMatrix4(new THREE.Matrix4().copy(inv).invert()).y;
    if (wy(I[t]) < yTop - 0.002 && wy(I[t+1]) < yTop - 0.002 && wy(I[t+2]) < yTop - 0.002) I.splice(t, 3); }
  rings.forEach(R => { for (let k = 0; k <= K; k++) { if (!half && k === NR) break; const a = k / NR * 2 * Math.PI;
    const nx = Math.cos(a), nz = Math.sin(a), rx = Math.max(0.0002, R.rx - inset), rz = Math.max(0.0002, R.rz - inset);   // a in [0,π]: anterior (z+) half
    const v = new THREE.Vector3(R.cx + nx * rx, R.y, R.cz + nz * rz).applyMatrix4(inv), w = new THREE.Vector3(nx, 0, nz).applyMatrix3(nm3).normalize();
    P.push(v.x, v.y, v.z); N.push(w.x, w.y, w.z); } });
  const W = half ? K + 1 : NR;
  for (let s = 0; s < rings.length - 1; s++) for (let k = 0; k < (half ? K : NR); k++) {
    const a = base + s * W + k, b = base + s * W + (half ? k + 1 : (k + 1) % NR), c = a + W, d = b + W;
    I.push(a, b, c, b, d, c, a, c, b, b, c, d);   // both windings: seen from inside and out
  }
  prim.getAttribute('POSITION').setArray(new Float32Array(P)); prim.getAttribute('NORMAL').setArray(new Float32Array(N));
  prim.getIndices().setArray(new Uint32Array(I));
  console.log(name, '+', rings.length * W, 'verts');
}
add('Spinal dura', 0, false); add('Arachnoid mater (spinal)', 0.0009, false);
add('Spinal dura (opened)', 0, true); add('Arachnoid mater (opened)', 0.0009, true);
console.log('sac rings', rings.length, rings.filter((r,i)=>i%8==0).map(r=>r.y.toFixed(3)+':'+(r.cz*1000).toFixed(0)).join(' '));
await doc.transform(quantize()); await io.write(outp, doc);
