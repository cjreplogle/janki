import {NodeIO} from '@gltf-transform/core';
import {ALL_EXTENSIONS} from '@gltf-transform/extensions';
import {dequantize, weld, simplifyPrimitive, quantize, prune} from '@gltf-transform/functions';
import {MeshoptSimplifier} from 'meshoptimizer';
await MeshoptSimplifier.ready;
const io=new NodeIO().registerExtensions(ALL_EXTENSIONS);
const [src,out]=process.argv.slice(2);
const d=await io.read(src);
await d.transform(dequantize(), weld());
const tris=p=>{const I=p.getIndices(); return I?I.getCount()/3:p.getAttribute('POSITION').getCount()/3;};
let before=0, after=0, kept=0;
for (const n of d.getRoot().listNodes()) { const me=n.getMesh(); if(!me) continue;
  const layer=(n.getExtras()||{}).l||'muscle';
  const opt = layer==='bone' ? {ratio:0.5, error:0.0008} : {ratio:0.25, error:0.002};
  for (const p of me.listPrimitives()) { const t0=tris(p); before+=t0;
    if (t0 < 600) { after+=t0; continue; }
    const idx=p.getIndices().clone(), pos=p.getAttribute('POSITION');
    simplifyPrimitive(p, {simplifier:MeshoptSimplifier, ...opt, lockBorder:false});
    const t1=tris(p);
    if (t1 < 0.15*t0) { p.setIndices(idx); kept++; after+=t0; } else after+=t1;
  } }
await d.transform(quantize(), prune({keepAttributes:true, keepExtras:true}));
await io.write(out,d);
console.log(out, 'tris', before, '->', Math.round(after), (100*after/before).toFixed(0)+'%', 'reverted', kept);
