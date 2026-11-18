// Upper limb model: right arm + shoulder girdle from the Z-Anatomy / BodyParts3D GLBs.
import {NodeIO, Document} from '@gltf-transform/core';
import {ALL_EXTENSIONS} from '@gltf-transform/extensions';
import {weld, simplify, quantize, dedup, prune} from '@gltf-transform/functions';
import {MeshoptSimplifier} from 'meshoptimizer';
import draco3d from 'draco3dgltf';
import fs from 'fs';
const io=new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({'draco3d.decoder':await draco3d.createDecoderModule()});
const LAYER={skeletal:'bone',muscular:'muscle',nervous:'nerve',cardiovascular:'vessel',joints:'ligament'};
const layerOf=(sys,nm)=>/retinaculum|transverse metacarpal ligament|palmar aponeurosis/i.test(nm)?'ligament':sys==='joints'&&/capsule|labrum|disc|membrane|cartilage/i.test(nm)?'capsule':(sys==='cardiovascular'&&/\bvein|venous|veins\b/i.test(nm)?'vein':LAYER[sys]);
const clean=n=>n.replace(/\.r$/,'').replace(/^\((.*)\)$/,'$1').trim();
const EXCL=/fascia|bursa|sheath|septum|aponeurosis|intercostal|abdominal|diaphragm|lung|pulmonary|aorta|subclavian|jugular|azygos|vena cava|thyrocervical|maxillary|rib\b|costal cartilage|vertebra|sternum|platysma|femor|glute|sciatic|iliac|obtur|piriformis|gemell|tensor fasciae|iliotibial|vastus|rectus femoris|biceps femoris|trochanteric|perforating/i;
const GIRDLE=/clavic|scapul|acromi|coraco|trapezius|latissimus|pectoralis|serratus anterior|rhomboid|levator scapulae|subclavius|deltoid|spinatus|teres|subscapular|axillary|thoracodorsal|long thoracic|suprascapular|pectoral nerve|brachial plexus|cord of|thoraco-acromial|lateral thoracic|circumflex|glenohumeral|glenoid|coracohumeral|transverse humeral|sternoclavicular|trapezoid ligament|conoid|humer|brachial cutaneous|cephalic|basilic/i;
const GROW={'Median nerve':1.6,'Ulnar nerve':1.5,'Radial nerve':1.7,'Musculocutaneous nerve':0.9,'Axillary nerve':1.1,
  'Deep branch of radial nerve':0.7,'Superficial branch of radial nerve':0.5,'Suprascapular nerve':0.6,'Long thoracic nerve':0.4,'Thoracodorsal nerve':0.5};
const SCAP=[];
const out=new Document(); const buf=out.createBuffer(); const scene=out.createScene('UpperLimb'); const meta={};
for (const sys of Object.keys(LAYER)){
  const doc=await io.read(`../za/${sys}.glb`);
  for (const n of doc.getRoot().listNodes()){
    const mesh=n.getMesh(); if(!mesh) continue; const name=n.getName();
    if(/\.l$/.test(name)) continue;
    const nm=clean(name); if(meta[nm]||(EXCL.test(nm)&&!/^Palmar aponeurosis$/.test(nm))) continue;
    const m=n.getWorldMatrix(); const prims=[]; const mn=[1e9,1e9,1e9], mx=[-1e9,-1e9,-1e9];
    for (const prim of mesh.listPrimitives()){
      const P=prim.getAttribute('POSITION').getArray(), N=prim.getAttribute('NORMAL')?.getArray();
      const np=new Float32Array(P.length), nn=N?new Float32Array(N.length):null;
      for(let i=0;i<P.length;i+=3){const x=P[i],y=P[i+1],z=P[i+2];
        np[i]=m[0]*x+m[4]*y+m[8]*z+m[12]; np[i+1]=m[1]*x+m[5]*y+m[9]*z+m[13]; np[i+2]=m[2]*x+m[6]*y+m[10]*z+m[14];
        for(let k=0;k<3;k++){mn[k]=Math.min(mn[k],np[i+k]);mx[k]=Math.max(mx[k],np[i+k]);}
        if(nn){const a=N[i],c=N[i+1],d=N[i+2]; nn[i]=m[0]*a+m[4]*c+m[8]*d; nn[i+1]=m[1]*a+m[5]*c+m[9]*d; nn[i+2]=m[2]*a+m[6]*c+m[10]*d;}}
      prims.push({prim,np,nn});
    }
    const cx=(mn[0]+mx[0])/2, cy=(mn[1]+mx[1])/2;
    const keep=(cx<-0.16&&cy>0.6) || (cy>1.15&&cx<-0.02&&GIRDLE.test(nm)) || /Latissimus dorsi/.test(nm);
    if(!keep) continue;
    const L=layerOf(sys,nm);
    for (const {prim,np,nn} of prims){
      if(L==='nerve'&&nn){const g=(GROW[nm]??0.3)/1000; for(let i=0;i<np.length;i+=3){const l=Math.hypot(nn[i],nn[i+1],nn[i+2])||1; for(let k=0;k<3;k++) np[i+k]+=nn[i+k]/l*g;}}
      if(L==='ligament'&&nn) for(let i=0;i<np.length;i+=3){const l=Math.hypot(nn[i],nn[i+1],nn[i+2])||1; for(let k=0;k<3;k++) np[i+k]+=nn[i+k]/l*0.0006;}
      if(nn) for(let i=0;i<nn.length;i+=3){const l=Math.hypot(nn[i],nn[i+1],nn[i+2])||1;nn[i]/=l;nn[i+1]/=l;nn[i+2]/=l;}
      if(nm==='Scapula') SCAP.push(np);
      const det=m[0]*(m[5]*m[10]-m[6]*m[9])-m[4]*(m[1]*m[10]-m[2]*m[9])+m[8]*(m[1]*m[6]-m[2]*m[5]);
      const p2=out.createPrimitive().setAttribute('POSITION',out.createAccessor().setType('VEC3').setArray(np).setBuffer(buf));
      if(nn) p2.setAttribute('NORMAL',out.createAccessor().setType('VEC3').setArray(nn).setBuffer(buf));
      const idx=prim.getIndices();
      if(idx){const I=new Uint32Array(idx.getArray()); if(det<0) for(let i=0;i<I.length;i+=3){const t=I[i+1];I[i+1]=I[i+2];I[i+2]=t;}
        p2.setIndices(out.createAccessor().setType('SCALAR').setArray(I).setBuffer(buf));}
      p2.setMaterial(out.createMaterial(nm).setRoughnessFactor(0.7).setMetallicFactor(0));
      scene.addChild(out.createNode(nm).setExtras({n:nm,l:L}).setMesh(out.createMesh(nm).addPrimitive(p2)));
    }
    meta[nm]={layer:L,min:mn,max:mx};
  }
}
// ---- coracoacromial ligament (not in the source): a flat band, coracoid tip → acromion tip ----
// right limb: +x medial, +z anterior, +y up
{
  const P=[]; SCAP.forEach(a=>{for(let i=0;i<a.length;i+=3)P.push([a[i],a[i+1],a[i+2]]);});
  const best=f=>P.reduce((b,p)=>(!b||f(p)>f(b))?p:b,null);
  const cor=best(p=>p[2]+0.1*p[1]);                       // coracoid: most anterior
  const acr=best(p=>-0.7*p[0]+0.7*p[1]+0.1*p[2]);          // acromion: top lateral tip
  const A=[cor[0]+0.004,cor[1]+0.002,cor[2]-0.006], B=[acr[0]+0.012,acr[1]-0.004,acr[2]+0.008];   // just inside each tip
  const NS=24, NR=16, pos=[], nrm=[], idx=[];
  const dir=[B[0]-A[0],B[1]-A[1],B[2]-A[2]], L=Math.hypot(...dir), t0=dir.map(v=>v/L);
  let n1=[t0[1]*0-t0[2]*1, t0[2]*0-t0[0]*0, t0[0]*1-t0[1]*0]; const l1=Math.hypot(...n1); n1=n1.map(v=>v/l1);   // ⟂ to up: the band lies flat over the joint
  const n2=[t0[1]*n1[2]-t0[2]*n1[1], t0[2]*n1[0]-t0[0]*n1[2], t0[0]*n1[1]-t0[1]*n1[0]];
  const C=[(A[0]+B[0])/2, (A[1]+B[1])/2+0.006, (A[2]+B[2])/2];   // slight upward arch over the humeral head
  for(let s2=0;s2<=NS;s2++){const t=s2/NS, p=[0,1,2].map(i=>(1-t)*(1-t)*A[i]+2*(1-t)*t*C[i]+t*t*B[i]);
    const w=0.009*(1+0.6*Math.sin(Math.PI*t)), h=0.0016;   // wide flat band, broadest in the middle
    for(let k=0;k<NR;k++){const a=k/NR*2*Math.PI, ca=Math.cos(a)*w, sa=Math.sin(a)*h;
      pos.push(p[0]+n1[0]*ca+n2[0]*sa, p[1]+n1[1]*ca+n2[1]*sa, p[2]+n1[2]*ca+n2[2]*sa);
      const ex=Math.cos(a)/w, ey=Math.sin(a)/h, el=Math.hypot(ex,ey); nrm.push((n1[0]*ex+n2[0]*ey)/el,(n1[1]*ex+n2[1]*ey)/el,(n1[2]*ex+n2[2]*ey)/el);}}
  for(let s2=0;s2<NS;s2++)for(let k=0;k<NR;k++){const a=s2*NR+k,b=s2*NR+(k+1)%NR,c=a+NR,d=b+NR; idx.push(a,c,b,b,c,d);}
  const nm='Coracoacromial ligament', Pp=new Float32Array(pos);
  const prim=out.createPrimitive().setAttribute('POSITION',out.createAccessor().setType('VEC3').setArray(Pp).setBuffer(buf))
    .setAttribute('NORMAL',out.createAccessor().setType('VEC3').setArray(new Float32Array(nrm)).setBuffer(buf))
    .setIndices(out.createAccessor().setType('SCALAR').setArray(new Uint32Array(idx)).setBuffer(buf)).setMaterial(out.createMaterial(nm));
  scene.addChild(out.createNode(nm).setExtras({n:nm,l:'ligament'}).setMesh(out.createMesh(nm).addPrimitive(prim)));
  meta[nm]={layer:'ligament',min:[0,0,0],max:[0,0,0]};
  console.log('CA lig', cor.map(v=>v.toFixed(3)), acr.map(v=>v.toFixed(3)));
}
await MeshoptSimplifier.ready;
await out.transform(weld(), simplify({simplifier:MeshoptSimplifier, ratio:0.7, error:0.0002}), dedup(), prune(), quantize());
await new NodeIO().registerExtensions(ALL_EXTENSIONS).write('upperlimb.glb', out);
fs.writeFileSync('upperlimb_meta.json', JSON.stringify(meta));
const c={}; for(const v of Object.values(meta)) c[v.layer]=(c[v.layer]||0)+1;
console.log(Object.keys(meta).length, c, fs.statSync('upperlimb.glb').size);
