// Trunk context model: spine, rib cage, thoracic + abdominal viscera, heart and great vessels.
// Shared by the CT view (anatomical context) and, later, back / thorax cards.
// Excluded for licence reasons: the kidney (CC BY-NC in the source distribution).
import {NodeIO, Document} from '@gltf-transform/core';
import {ALL_EXTENSIONS} from '@gltf-transform/extensions';
import {weld, simplify, quantize, dedup, prune} from '@gltf-transform/functions';
import {MeshoptSimplifier} from 'meshoptimizer';
import draco3d from 'draco3dgltf';
import fs from 'fs';
const io=new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({'draco3d.decoder':await draco3d.createDecoderModule()});
// [system, include regex, layer] — first match wins. Extend here.
const RULES=[
  ['skeletal', /vertebra|atlas|axis \(c2\)|sacrum|coccyx|\brib\b|sternum|manubrium|xiphoid|costal cartilage|occipital bone|temporal bone|^scapula|^clavicle|^humerus|^hip bone/i, 'bone'],
  ['visceral', /kidney|renal pelvis|penis|testis|epididym|ductus deferens|ejaculat|seminal|prostate|parotid|sublingual|submandibular|tongue|gingiva|palate|uvula|nasal|pineal|hypophysis|pharynx|epiglottis|parathyroid/i, null],
  ['visceral', /lobe of (left|right) lung/i, 'lung'],
  ['visceral', /trachea|main bronchus|lobar bronchus|intermediate bronchus/i, 'airway'],
  ['visceral', /segmental bronchus|pleura|taenia|omentum|meso|segment of liver/i, null],
  ['visceral', /liver|gallbladder|stomach|duodenum|jejunum|ileum|colon|caecum|cecum|appendix|pancreas|oesophagus|spleen|urinary bladder|suprarenal|thyroid|bile duct|ureter/i, 'organ'],
  ['cardiovascular', /leaflet|cusp|papillary|chordae|vein of left ventricle|artery of heart|interventricular artery|coronary/i, null],
  ['cardiovascular', /^(left|right) (atrium|ventricle)$/i, 'heart'],
  ['cardiovascular', /^(ascending aorta|arch of aorta|thoracic aorta|abdominal aorta|pulmonary trunk|right pulmonary artery|left pulmonary artery|brachiocephalic trunk|left common carotid|right common carotid|left subclavian artery|right subclavian artery|common iliac)/i, 'vessel'],
  ['cardiovascular', /^(superior vena cava|inferior vena cava|right brachiocephalic vein|left brachiocephalic vein|azygos vein|pulmonary veins?|(left|right) (superior|inferior) pulmonary vein)/i, 'vein'],
  ['muscular', /thoracolumbar fascia/i, 'capsule'],   // hidden unless asked (it covers the back)
  ['muscular', /bursa|fascia/i, null],
  ['muscular', /^diaphragm$|trapezius|latissimus|levator scapulae|rhomboid|splenius|iliocostalis|longissimus|spinalis|semispinalis/i, 'muscle'],
  ['nervous', /^accessory nerve \(xi\)|^dorsal scapular nerve|^thoracodorsal nerve/i, 'nerve'],
  ['nervous', /spinal cord|cauda equina|conus medullaris/i, 'nerve'],
  ['nervous', /^spinal dura/i, 'capsule'],
  ['nervous', /^spinal ganglion|^(anterior|posterior) root of spinal nerve|^intercostal nerves/i, 'nerve'],
  ['joints', /^(ligamenta flava|nuchal ligament)/i, 'ligament'],
  // head & neck: the arteries carry on above the great vessels instead of stopping at the neck
  ['cardiovascular', /transverse cervical artery|thyrocervical trunk|^suprascapular artery|^inferior thyroid artery|^vertebral artery|internal thoracic artery|costocervical trunk|^(internal|external) carotid artery|^superior thyroid artery|^lingual artery|^facial artery|^occipital artery|^posterior auricular artery|^maxillary artery|^superficial temporal artery|^ascending pharyngeal artery|^basilar artery|^subclavian artery/i, 'vessel'],
  ['cardiovascular', /^(internal|external|anterior) jugular vein|^subclavian vein|^right subclavian vein|^left subclavian vein|^vertebral vein|^brachiocephalic vein/i, 'vein'],
];
const clean=n=>n.replace(/^\((.*)\)$/,'$1').trim();
const GANG={l:[],r:[]};
const out=new Document(); const buf=out.createBuffer(); const scene=out.createScene('Trunk'); const meta={};
for (const sys of ['skeletal','visceral','cardiovascular','muscular','nervous','joints']){
  const doc=await io.read(`../za/${sys}.glb`);
  for (const n of doc.getRoot().listNodes()){
    const mesh=n.getMesh(); if(!mesh) continue; const name=n.getName(), nm=clean(name);
    const rule=RULES.find(r=>r[0]===sys&&r[1].test(nm)); if(!rule||!rule[2]) continue;
    if(meta[nm]) continue;
    const m=n.getWorldMatrix(); const mn=[1e9,1e9,1e9], mx=[-1e9,-1e9,-1e9];
    for (const prim of mesh.listPrimitives()){
      const P=prim.getAttribute('POSITION').getArray(), N=prim.getAttribute('NORMAL')?.getArray();
      const np=new Float32Array(P.length), nn=N?new Float32Array(N.length):null;
      for(let i=0;i<P.length;i+=3){const x=P[i],y=P[i+1],z=P[i+2];
        np[i]=m[0]*x+m[4]*y+m[8]*z+m[12]; np[i+1]=m[1]*x+m[5]*y+m[9]*z+m[13]; np[i+2]=m[2]*x+m[6]*y+m[10]*z+m[14];
        for(let k=0;k<3;k++){mn[k]=Math.min(mn[k],np[i+k]);mx[k]=Math.max(mx[k],np[i+k]);}
        if(nn){const a=N[i],c=N[i+1],d=N[i+2]; nn[i]=m[0]*a+m[4]*c+m[8]*d; nn[i+1]=m[1]*a+m[5]*c+m[9]*d; nn[i+2]=m[2]*a+m[6]*c+m[10]*d;
          const l=Math.hypot(nn[i],nn[i+1],nn[i+2])||1; nn[i]/=l; nn[i+1]/=l; nn[i+2]/=l;}}
      // spinal cord: the source cord is ~13.5 mm wide all the way down. Give it real proportions:
      // cervical enlargement (~C3–C7 vertebrae) full width, thoracic cord ~10 mm, lumbosacral
      // enlargement (~T10–L1) ~12 mm, tapering into the conus. Scaled about each slice's centre.
      if(/spinal cord/i.test(nm)){
        const sc=y=>{const s=(a,b,t)=>{const u=Math.min(1,Math.max(0,(t-a)/(b-a)));return u*u*(3-2*u);};
          const cerv=s(1.40,1.44,y)*(1-s(1.515,1.54,y)), lumb=s(1.06,1.10,y)*(1-s(1.215,1.25,y));
          return 0.74+0.26*cerv+0.15*lumb + (y>1.53?0.2:0);};   // 0.74 ≈ 10 mm thoracic; top (medulla end) kept
        const C={}; for(let i=0;i<np.length;i+=3){const b=Math.round(np[i+1]/0.004); const c=C[b]||(C[b]=[0,0,0]); c[0]+=np[i]; c[1]+=np[i+2]; c[2]++;}
        for(let i=0;i<np.length;i+=3){const c=C[Math.round(np[i+1]/0.004)], cx=c[0]/c[2], cz=c[1]/c[2], f=sc(np[i+1]);
          np[i]=cx+(np[i]-cx)*f; np[i+2]=cz+(np[i+2]-cz)*f;}
      }
      // peripheral nerves: the source draws them as thin cables — grow to typical adult calibre
      // (mm added to the radius; the cord / roots / ganglia keep their own shape)
      const TGROW={'Accessory nerve (XI)':0.7,'Dorsal scapular nerve':0.35,'Thoracodorsal nerve':0.8,'Intercostal nerves':0.9,
        'Long thoracic nerve':0.6,'Suprascapular nerve':0.6};
      const tg=TGROW[nm.replace(/\.[lr]$/,'')];
      if(rule[2]==='nerve' && tg && nn) for(let i=0;i<np.length;i+=3){const l=Math.hypot(nn[i],nn[i+1],nn[i+2])||1; np[i]+=nn[i]/l*tg/1000; np[i+1]+=nn[i+1]/l*tg/1000; np[i+2]+=nn[i+2]/l*tg/1000;}
      const det=m[0]*(m[5]*m[10]-m[6]*m[9])-m[4]*(m[1]*m[10]-m[2]*m[9])+m[8]*(m[1]*m[6]-m[2]*m[5]);
      const p2=out.createPrimitive().setAttribute('POSITION',out.createAccessor().setType('VEC3').setArray(np).setBuffer(buf));
      if(nn) p2.setAttribute('NORMAL',out.createAccessor().setType('VEC3').setArray(nn).setBuffer(buf));
      const idx=prim.getIndices();
      if(idx){const I=new Uint32Array(idx.getArray()); if(det<0) for(let i=0;i<I.length;i+=3){const t=I[i+1];I[i+1]=I[i+2];I[i+2]=t;}
        p2.setIndices(out.createAccessor().setType('SCALAR').setArray(I).setBuffer(buf));}
      p2.setMaterial(out.createMaterial(nm));
      scene.addChild(out.createNode(nm).setExtras({n:nm,l:rule[2]}).setMesh(out.createMesh(nm).addPrimitive(p2)));
      if(/^spinal ganglion\.([lr])$/i.test(nm)){ const sd=nm.slice(-1); for(let i=0;i<np.length;i+=3) GANG[sd].push([np[i],np[i+1],np[i+2]]); }
      // arachnoid mater: not in the source — a second layer just inside the dura (0.9 mm in)
      if(/^spinal dura/i.test(nm) && nn){
        const ap=new Float32Array(np.length); for(let i=0;i<np.length;i++) ap[i]=np[i]-nn[i]*0.0009;
        const an='Arachnoid mater (spinal)', pa=out.createPrimitive().setAttribute('POSITION',out.createAccessor().setType('VEC3').setArray(ap).setBuffer(buf))
          .setAttribute('NORMAL',out.createAccessor().setType('VEC3').setArray(new Float32Array(nn)).setBuffer(buf)).setMaterial(out.createMaterial(an));
        if(idx){const I=new Uint32Array(idx.getArray()); if(det<0) for(let i=0;i<I.length;i+=3){const t=I[i+1];I[i+1]=I[i+2];I[i+2]=t;}
          pa.setIndices(out.createAccessor().setType('SCALAR').setArray(I).setBuffer(buf));}
        scene.addChild(out.createNode(an).setExtras({n:an,l:'capsule'}).setMesh(out.createMesh(an).addPrimitive(pa)));
        meta[an]={layer:'capsule',min:mn,max:mx};
      }
      // opened (posterior half removed) copies of dura and arachnoid: the cut-away that shows the
      // layers nested (dura → arachnoid → pia/cord) on the meninges cards
      if(/^spinal dura/i.test(nm) && nn && idx){
        const I=new Uint32Array(idx.getArray()), C={};
        for(let i=0;i<np.length;i+=3){const b=Math.round(np[i+1]/0.004),c=C[b]||(C[b]=[0,0]); c[0]+=np[i+2]; c[1]++;}
        const cz=y=>{const c=C[Math.round(y/0.004)]; return c?c[0]/c[1]:0;};
        const half=(P,name)=>{const keep=[]; for(let t=0;t<I.length;t+=3){const a=I[t],b=I[t+1],c=I[t+2];
            const y=(P[a*3+1]+P[b*3+1]+P[c*3+1])/3, z=(P[a*3+2]+P[b*3+2]+P[c*3+2])/3;
            if(z>cz(y)-0.0005) keep.push(a,b,c);}   // anterior half only: open from behind
          if(det<0) for(let i=0;i<keep.length;i+=3){const t=keep[i+1];keep[i+1]=keep[i+2];keep[i+2]=t;}
          const pr=out.createPrimitive().setAttribute('POSITION',out.createAccessor().setType('VEC3').setArray(new Float32Array(P)).setBuffer(buf))
            .setAttribute('NORMAL',out.createAccessor().setType('VEC3').setArray(new Float32Array(nn)).setBuffer(buf))
            .setIndices(out.createAccessor().setType('SCALAR').setArray(new Uint32Array(keep)).setBuffer(buf)).setMaterial(out.createMaterial(name));
          scene.addChild(out.createNode(name).setExtras({n:name,l:'capsule'}).setMesh(out.createMesh(name).addPrimitive(pr)));
          meta[name]={layer:'capsule',min:mn,max:mx};};
        half(np,'Spinal dura (opened)');
        const ap2=new Float32Array(np.length); for(let i=0;i<np.length;i++) ap2[i]=np[i]-nn[i]*0.0009;
        half(ap2,'Arachnoid mater (opened)');
      }
    }
    meta[nm]={layer:rule[2],min:mn,max:mx};
  }
}
// ---- dorsal rami (not in the source): one short nerve per level, from just beyond each spinal
// ganglion backwards and a little laterally into the back muscles (~2.5 cm) ----
for(const sd of ['l','r']){
  const G=GANG[sd]; if(!G.length) continue;
  G.sort((a,b)=>b[1]-a[1]); const cl=[]; let cur=[G[0]];
  for(let i=1;i<G.length;i++){ if(cur[cur.length-1][1]-G[i][1]>0.006){cl.push(cur);cur=[];} cur.push(G[i]); } cl.push(cur);
  const pos=[],nrm=[],idx=[]; const NR=8, NS=10;
  cl.filter(c=>c.length>8).forEach(c=>{
    const m=[0,1,2].map(k=>c.reduce((s,p)=>s+p[k],0)/c.length);
    const lat=Math.sign(m[0])||1, A=[m[0]+lat*0.004,m[1]-0.002,m[2]-0.002], B=[m[0]+lat*0.016,m[1]-0.012,m[2]-0.024];
    const d=[B[0]-A[0],B[1]-A[1],B[2]-A[2]], L=Math.hypot(...d), t=d.map(v=>v/L);
    let u=[t[1]*1-t[2]*0, t[2]*0-t[0]*1, 0]; let ul=Math.hypot(...u)||1; u=u.map(v=>v/ul);
    const w=[t[1]*u[2]-t[2]*u[1], t[2]*u[0]-t[0]*u[2], t[0]*u[1]-t[1]*u[0]];
    const base=pos.length/3;
    for(let s2=0;s2<=NS;s2++){const f=s2/NS, p=[0,1,2].map(k=>A[k]+d[k]*f), r=0.0011*(1-0.4*f);
      for(let k=0;k<NR;k++){const a=k/NR*2*Math.PI, ca=Math.cos(a), sa=Math.sin(a);
        pos.push(p[0]+(u[0]*ca+w[0]*sa)*r, p[1]+(u[1]*ca+w[1]*sa)*r, p[2]+(u[2]*ca+w[2]*sa)*r); nrm.push(u[0]*ca+w[0]*sa, u[1]*ca+w[1]*sa, u[2]*ca+w[2]*sa);}}
    for(let s2=0;s2<NS;s2++)for(let k=0;k<NR;k++){const a=base+s2*NR+k,b2=base+s2*NR+(k+1)%NR,c2=a+NR,d2=b2+NR; idx.push(a,c2,b2,b2,c2,d2);}
  });
  if(!pos.length) continue;
  const nm='Dorsal rami of spinal nerves.'+sd;
  const pr=out.createPrimitive().setAttribute('POSITION',out.createAccessor().setType('VEC3').setArray(new Float32Array(pos)).setBuffer(buf))
    .setAttribute('NORMAL',out.createAccessor().setType('VEC3').setArray(new Float32Array(nrm)).setBuffer(buf))
    .setIndices(out.createAccessor().setType('SCALAR').setArray(new Uint32Array(idx)).setBuffer(buf)).setMaterial(out.createMaterial(nm));
  scene.addChild(out.createNode(nm).setExtras({n:nm,l:'nerve'}).setMesh(out.createMesh(nm).addPrimitive(pr)));
  meta[nm]={layer:'nerve',min:[0,0,0],max:[0,0,0]};
  console.log('dorsal rami', sd, cl.filter(c=>c.length>8).length);
}
await MeshoptSimplifier.ready;
await out.transform(weld(), simplify({simplifier:MeshoptSimplifier, ratio:0.35, error:0.0006}), dedup(), prune(), quantize());
await new NodeIO().registerExtensions(ALL_EXTENSIONS).write('trunk.glb', out);
fs.writeFileSync('trunk_meta.json', JSON.stringify(meta));
const c={}; for(const v of Object.values(meta)) c[v.layer]=(c[v.layer]||0)+1;
console.log(Object.keys(meta).length, c, fs.statSync('trunk.glb').size);
