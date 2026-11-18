import {NodeIO, Document, getBounds} from '@gltf-transform/core';
import {ALL_EXTENSIONS} from '@gltf-transform/extensions';
import {weld, simplify, quantize, dedup, prune} from '@gltf-transform/functions';
import {MeshoptSimplifier} from 'meshoptimizer';
import draco3d from 'draco3dgltf';
import fs from 'fs';
const io=new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({'draco3d.decoder':await draco3d.createDecoderModule()});
const EXCL=/radius|carp|metacarp|wrist|radio|ulno|ulnar collateral|scapho|pisotriq|triquetro|forearm|annular|hand|wrist|forearm|antebrach|palm|pollicis|metacarp|digiti minimi muscle of hand|carpi|radius|ulna|radial|ulnar|median|scaphoid|lunate|triquetrum|pisiform|trapezi|capitate|hamate|interosse\w* nerve of forearm|indicis|pronator|flexor digitorum (superficialis|profundus)|Extensor digitorum\.|Extensor digiti minimi|bursa|sheath|septum|\bfascia\b|trapezoid|carpal|interosseous artery|appendicular|ileocolic|penis|testicular|anorectal|epigastric|tendinous arch|anal|coccygeus|iliococcygeus|pubo|pyramidalis|genital branch|pudendal|cruciform|aponeurosis of|superficialis/i;
const KEEP_MID=/^(Vertebra L[45]$|Fifth lumbar vertebra|Fourth lumbar vertebra|Sacrum|Coccyx|Psoas major|Psoas minor|Quadratus lumborum|Lumbosacral trunk|External iliac artery|Common iliac artery|Internal iliac artery|Superior gluteal artery|Inferior gluteal artery|Great saphenous vein)/i;
const LAYER={skeletal:'bone',muscular:'muscle',nervous:'nerve',cardiovascular:'vessel',joints:'ligament'};
const out=new Document(); const buf=out.createBuffer(); const scene=out.createScene('LowerLimb');
const meta={}; let flipped=0; const TIB=[], FEM=[];
const layerOf=(sys,nm)=>sys==='joints'&&/capsule|fat pad|Frenula|labrum|membrane|cartilage/i.test(nm)?'capsule':(sys==='cardiovascular'&&/\bvein|venous|venae|veins\b/i.test(nm)?'vein':LAYER[sys]);
const clean=n=>n.replace(/\.r$/,'').replace(/^\((.*)\)$/,'$1').trim();
for (const sys of Object.keys(LAYER)){
  const doc=await io.read(`../za/${sys}.glb`);
  for (const n of doc.getRoot().listNodes()){
    const mesh=n.getMesh(); if(!mesh) continue;
    const name=n.getName(); const b=getBounds(n);
    const cx=(b.min[0]+b.max[0])/2;
    if(/\.l$/.test(name)) continue;
    const mid=KEEP_MID.test(name);
    if(!mid && !(cx<-0.003 && b.max[1]<1.12 && b.min[1]<0.95)) continue;
    if(EXCL.test(name) && !mid) continue;
    if(b.min[0] < -0.2) continue;   // lies out beside the hip: the hanging arm / hand, not the leg
    // (veins now kept: their own layer)
    if(mid && cx>0.02 && !/Vertebra|Sacrum|Coccyx/i.test(name)) continue; // left-side mid structures
    const nm=clean(name); if(meta[nm]) continue;
    if(/^(Anterior|Posterior) cruciate ligament$/.test(nm)) continue;   // rebuilt below from the bones' landmarks
    const m=n.getWorldMatrix();
    for (const prim of mesh.listPrimitives()){
      const pos=prim.getAttribute('POSITION'); const idx=prim.getIndices();
      const P=pos.getArray(), N=prim.getAttribute('NORMAL')?.getArray();
      const np=new Float32Array(P.length), nn=N?new Float32Array(N.length):null;
      for(let i=0;i<P.length;i+=3){const x=P[i],y=P[i+1],z=P[i+2];
        np[i]=m[0]*x+m[4]*y+m[8]*z+m[12]; np[i+1]=m[1]*x+m[5]*y+m[9]*z+m[13]; np[i+2]=m[2]*x+m[6]*y+m[10]*z+m[14];
        if(nn){const a=N[i],c=N[i+1],d=N[i+2]; nn[i]=m[0]*a+m[4]*c+m[8]*d; nn[i+1]=m[1]*a+m[5]*c+m[9]*d; nn[i+2]=m[2]*a+m[6]*c+m[10]*d;}}
      // nerves: the source tubes are cable-thin; grow each to its real calibre (mm added to the radius)
      const NERVE_GROW = {'Sciatic nerve': 4.2, 'Tibial nerve': 2.8, 'Femoral nerve': 2.2, 'Common fibular nerve': 1.6,
        'Deep fibular nerve': 0.7, 'Superficial fibular nerve': 0.7, 'Obturator nerve': 0.4, 'Saphenous nerve': 0.5,
        'Superior gluteal nerve': 0.8, 'Medial plantar nerve': 0.8, 'Lateral plantar nerve': 0.7, 'Sural nerve': 0.6,
        'Posterior femoral cutaneous nerve': 0.5, 'Lateral femoral cutaneous nerve': 0.4};
      if(layerOf(sys,nm)==='nerve' && nn){ const g=(NERVE_GROW[nm] ?? 0.3)/1000;
        for(let i=0;i<np.length;i+=3){const l=Math.hypot(nn[i],nn[i+1],nn[i+2])||1; np[i]+=nn[i]/l*g; np[i+1]+=nn[i+1]/l*g; np[i+2]+=nn[i+2]/l*g;} }
      // ligaments: thicken 1 mm along the normals (thin bands read as slivers otherwise)
      if(layerOf(sys,nm)==='ligament' && nn) for(let i=0;i<np.length;i+=3){const l=Math.hypot(nn[i],nn[i+1],nn[i+2])||1;
        np[i]+=nn[i]/l*0.001; np[i+1]+=nn[i+1]/l*0.001; np[i+2]+=nn[i+2]/l*0.001;}
      if(nm==='Tibia') TIB.push(np); if(nm==='Femur') FEM.push(np);
      const p2=out.createPrimitive().setAttribute('POSITION',out.createAccessor().setType('VEC3').setArray(np).setBuffer(buf));
      if(nn) p2.setAttribute('NORMAL',out.createAccessor().setType('VEC3').setArray(nn).setBuffer(buf));
      const det=m[0]*(m[5]*m[10]-m[6]*m[9])-m[4]*(m[1]*m[10]-m[2]*m[9])+m[8]*(m[1]*m[6]-m[2]*m[5]);
      if(det<0) flipped++;
      if(nn) for(let i=0;i<nn.length;i+=3){const l=Math.hypot(nn[i],nn[i+1],nn[i+2])||1;nn[i]/=l;nn[i+1]/=l;nn[i+2]/=l;}
      if(idx){const I=new Uint32Array(idx.getArray()); if(det<0) for(let i=0;i<I.length;i+=3){const t=I[i+1];I[i+1]=I[i+2];I[i+2]=t;}
        p2.setIndices(out.createAccessor().setType('SCALAR').setArray(I).setBuffer(buf));}
      const mat=out.createMaterial(nm).setRoughnessFactor(0.7).setMetallicFactor(0);
      p2.setMaterial(mat);
      scene.addChild(out.createNode(nm).setExtras({n:nm,l:layerOf(sys,nm)}).setMesh(out.createMesh(nm).addPrimitive(p2)));
    }
    meta[nm]={layer:layerOf(sys,nm), min:b.min, max:b.max};
  }
}
// ---- cruciate ligaments, rebuilt from standard attachment sites on this model's own tibia ----
// (Z-Anatomy's hand-made pair had the PCL's femoral end too far back; BodyParts3D has none.)
// Right limb: +x = medial (toward the midline), +z = anterior, +y = up.
{
  const T=[]; TIB.forEach(a=>{for(let i=0;i<a.length;i+=3)T.push([a[i],a[i+1],a[i+2]]);});
  const yTop=Math.max(...T.map(p=>p[1])), top=T.filter(p=>p[1]>yTop-0.012);
  const x0=Math.min(...top.map(p=>p[0])), x1=Math.max(...top.map(p=>p[0])), z0=Math.min(...top.map(p=>p[2])), z1=Math.max(...top.map(p=>p[2]));
  const W=x1-x0, D=z1-z0, cx=(x0+x1)/2, cz=(z0+z1)/2;
  console.log('plateau W,D mm', (W*1000).toFixed(0), (D*1000).toFixed(0));
  const tube=(nm, A, B, bow, ra, rb, twist)=>{
    // centreline: quadratic Bézier A→B bowed by `bow`; ends pushed 3 mm into bone
    const dir=[B[0]-A[0],B[1]-A[1],B[2]-A[2]], L=Math.hypot(...dir), u=dir.map(v=>v/L);
    const A2=A.map((v,i)=>v-u[i]*0.003), B2=B.map((v,i)=>v+u[i]*0.003);
    const C=[(A2[0]+B2[0])/2+bow[0],(A2[1]+B2[1])/2+bow[1],(A2[2]+B2[2])/2+bow[2]];
    const NS=28, NR=18, pos=[], idx=[], nrm=[];
    const pt=t=>[0,1,2].map(i=>(1-t)*(1-t)*A2[i]+2*(1-t)*t*C[i]+t*t*B2[i]);
    for(let s=0;s<=NS;s++){
      const t=s/NS, p=pt(t), q=pt(Math.min(1,t+1/NS)), r0=pt(Math.max(0,t-1/NS));
      let tg=[q[0]-r0[0],q[1]-r0[1],q[2]-r0[2]]; const tl=Math.hypot(...tg); tg=tg.map(v=>v/tl);
      let ref=Math.abs(tg[2])<0.9?[0,0,1]:[1,0,0];
      let n1=[tg[1]*ref[2]-tg[2]*ref[1], tg[2]*ref[0]-tg[0]*ref[2], tg[0]*ref[1]-tg[1]*ref[0]]; const nl=Math.hypot(...n1); n1=n1.map(v=>v/nl);
      const n2=[tg[1]*n1[2]-tg[2]*n1[1], tg[2]*n1[0]-tg[0]*n1[2], tg[0]*n1[1]-tg[1]*n1[0]];
      const tw=twist*t, sw=1+0.25*Math.sin(Math.PI*t)*0;   // flared footprints, slimmer waist
      const flare=1+0.35*(Math.pow(1-t,6)+Math.pow(t,6));
      for(let k=0;k<NR;k++){ const a=k/NR*2*Math.PI+tw, ca=Math.cos(a)*ra*flare, sa=Math.sin(a)*rb*flare;
        pos.push(p[0]+n1[0]*ca+n2[0]*sa, p[1]+n1[1]*ca+n2[1]*sa, p[2]+n1[2]*ca+n2[2]*sa);
        // normal of an ellipse cross-section (outward)
        const ex=Math.cos(a)/ra, ey=Math.sin(a)/rb, el=Math.hypot(ex,ey);
        nrm.push((n1[0]*ex+n2[0]*ey)/el, (n1[1]*ex+n2[1]*ey)/el, (n1[2]*ex+n2[2]*ey)/el); }
    }
    for(let s=0;s<NS;s++)for(let k=0;k<NR;k++){const a=s*NR+k,b=s*NR+(k+1)%NR,c=a+NR,d=b+NR; idx.push(a,c,b,b,c,d);}
    // caps
    const cA=pos.length/3; const pa=pt(0); pos.push(...pa); const cB=pos.length/3; const pb=pt(1); pos.push(...pb);
    nrm.push(...u.map(v=>-v), ...u);
    for(let k=0;k<NR;k++){ idx.push(cA,(k+1)%NR,k); idx.push(cB,NS*NR+k,NS*NR+(k+1)%NR); }
    const P=new Float32Array(pos), I=new Uint32Array(idx);
    const prim=out.createPrimitive().setAttribute('POSITION',out.createAccessor().setType('VEC3').setArray(P).setBuffer(buf))
      .setAttribute('NORMAL',out.createAccessor().setType('VEC3').setArray(new Float32Array(nrm)).setBuffer(buf))
      .setIndices(out.createAccessor().setType('SCALAR').setArray(I).setBuffer(buf)).setMaterial(out.createMaterial(nm));
    scene.addChild(out.createNode(nm).setExtras({n:nm,l:'ligament'}).setMesh(out.createMesh(nm).addPrimitive(prim)));
    const mn=[0,1,2].map(i=>Math.min(...Array.from({length:P.length/3},(_,j)=>P[j*3+i]))), mx=[0,1,2].map(i=>Math.max(...Array.from({length:P.length/3},(_,j)=>P[j*3+i])));
    meta[nm]={layer:'ligament', min:mn, max:mx};
  };
  const fy=yTop+0.027;   // notch level in extension
  // ACL: anterior intercondylar area (just medial of centre) → posteromedial face of the LATERAL condyle (back of the notch)
  tube('Anterior cruciate ligament', [cx+0.03*W, yTop-0.001, z1-0.24*D], [cx-0.12*W, fy, cz-0.16*D], [-0.002,0,0.003], 0.0055, 0.0032, Math.PI/2);
  // PCL: posterior intercondylar area (onto the back of the tibia) → lateral face of the MEDIAL condyle (front of the notch)
  tube('Posterior cruciate ligament', [cx-0.01*W, yTop-0.009, z0+0.07*D], [cx+0.11*W, fy-0.002, cz+0.06*D], [0.002,0,-0.004], 0.0065, 0.0036, -Math.PI/3);
}
await MeshoptSimplifier.ready;
await out.transform(weld(), simplify({simplifier:MeshoptSimplifier, ratio:0.7, error:0.0002}), dedup(), prune(), quantize());
await new NodeIO().registerExtensions(ALL_EXTENSIONS).write('lowerlimb.glb', out);
fs.writeFileSync('lowerlimb_meta.json', JSON.stringify(meta));
const c={}; for(const v of Object.values(meta)) c[v.layer]=(c[v.layer]||0)+1;
console.log('flipped',flipped,Object.keys(meta).length, c, fs.statSync('lowerlimb.glb').size);
