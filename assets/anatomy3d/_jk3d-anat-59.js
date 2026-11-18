(()=>{var gx=Object.create;var Zd=Object.defineProperty;var xx=Object.getOwnPropertyDescriptor;var yx=Object.getOwnPropertyNames;var _x=Object.getPrototypeOf,vx=Object.prototype.hasOwnProperty;var kt=(s,e)=>()=>(s&&(e=s(s=0)),e);var Kd=(s,e)=>()=>(e||s((e={exports:{}}).exports,e),e.exports);var bx=(s,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of yx(e))!vx.call(s,i)&&i!==t&&Zd(s,i,{get:()=>e[i],enumerable:!(n=xx(e,i))||n.enumerable});return s};var Mx=(s,e,t)=>(t=s!=null?gx(_x(s)):{},bx(e||!s||!s.__esModule?Zd(t,"default",{value:s,enumerable:!0}):t,s));var Jd=Kd(()=>{(function(){var s=typeof console!="undefined"&&console||(globalThis.console={}),e=typeof s.log=="function"?s.log.bind(s):function(){};["error","warn","info","debug","trace","group","groupEnd","time","timeEnd","table","assert"].forEach(function(t){typeof s[t]!="function"&&(s[t]=t==="assert"?function(){}:e)})})()});function Es(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Li[s&255]+Li[s>>8&255]+Li[s>>16&255]+Li[s>>24&255]+"-"+Li[e&255]+Li[e>>8&255]+"-"+Li[e>>16&15|64]+Li[e>>24&255]+"-"+Li[t&63|128]+Li[t>>8&255]+"-"+Li[t>>16&255]+Li[t>>24&255]+Li[n&255]+Li[n>>8&255]+Li[n>>16&255]+Li[n>>24&255]).toLowerCase()}function ci(s,e,t){return Math.max(e,Math.min(t,s))}function df(s,e){return(s%e+e)%e}function _y(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function vy(s,e,t){return s!==e?(t-s)/(e-s):0}function Pa(s,e,t){return(1-t)*s+t*e}function by(s,e,t,n){return Pa(s,e,1-Math.exp(-t*n))}function My(s,e=1){return e-Math.abs(df(s,e*2)-e)}function Sy(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Ey(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Ty(s,e){return s+Math.floor(Math.random()*(e-s+1))}function wy(s,e){return s+Math.random()*(e-s)}function Ay(s){return s*(.5-Math.random())}function Ry(s){s!==void 0&&(Up=s);let e=Up+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Cy(s){return s*Ca}function Py(s){return s*zo}function Th(s){return(s&s-1)===0&&s!==0}function Iy(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function al(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Ly(s,e,t,n,i){let r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),u=o((e+n)/2),h=r((e-n)/2),f=o((e-n)/2),d=r((n-e)/2),g=o((n-e)/2);switch(i){case"XYX":s.set(a*u,c*h,c*f,a*l);break;case"YZY":s.set(c*f,a*u,c*h,a*l);break;case"ZXZ":s.set(c*h,c*f,a*u,a*l);break;case"XZX":s.set(a*u,c*g,c*d,a*l);break;case"YXY":s.set(c*d,a*u,c*g,a*l);break;case"ZYZ":s.set(c*g,c*d,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Ls(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Cn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}function s0(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Ba(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Ny(){let s=Ba("canvas");return s.style.display="block",s}function Ia(s){s in Fp||(Fp[s]=!0,console.warn(s))}function No(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Gu(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}function Wu(s){return typeof HTMLImageElement!="undefined"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&s instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&s instanceof ImageBitmap?cl.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}function qu(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){kr.fromArray(s,r);let a=i.x*Math.abs(kr.x)+i.y*Math.abs(kr.y)+i.z*Math.abs(kr.z),c=e.dot(kr),l=t.dot(kr),u=n.dot(kr);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}function th(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}function Yy(s,e,t,n,i,r,o,a){let c;if(e.side===Ui?c=n.intersectTriangle(o,r,i,!0,a):c=n.intersectTriangle(i,r,o,e.side===Gi,a),c===null)return null;Hc.copy(a),Hc.applyMatrix4(s.matrixWorld);let l=t.ray.origin.distanceTo(Hc);return l<t.near||l>t.far?null:{distance:l,point:Hc.clone(),object:s}}function Vc(s,e,t,n,i,r,o,a,c,l){s.getVertexPosition(a,Mo),s.getVertexPosition(c,So),s.getVertexPosition(l,Eo);let u=Yy(s,e,t,n,Mo,So,Eo,zc);if(u){i&&(Bc.fromBufferAttribute(i,a),Oc.fromBufferAttribute(i,c),kc.fromBufferAttribute(i,l),u.uv=ss.getInterpolation(zc,Mo,So,Eo,Bc,Oc,kc,new nt)),r&&(Bc.fromBufferAttribute(r,a),Oc.fromBufferAttribute(r,c),kc.fromBufferAttribute(r,l),u.uv1=ss.getInterpolation(zc,Mo,So,Eo,Bc,Oc,kc,new nt),u.uv2=u.uv1),o&&(Zp.fromBufferAttribute(o,a),Kp.fromBufferAttribute(o,c),Jp.fromBufferAttribute(o,l),u.normal=ss.getInterpolation(zc,Mo,So,Eo,Zp,Kp,Jp,new w),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a,b:c,c:l,normal:new w,materialIndex:0};ss.getNormal(Mo,So,Eo,h.normal),u.face=h}return u}function Wo(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Hi(s){let e={};for(let t=0;t<s.length;t++){let n=Wo(s[t]);for(let i in n)e[i]=n[i]}return e}function jy(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function o0(s){return s.getRenderTarget()===null?s.outputColorSpace:Mn.workingColorSpace}function a0(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function e_(s,e){let t=e.isWebGL2,n=new WeakMap;function i(l,u){let h=l.array,f=l.usage,d=h.byteLength,g=s.createBuffer();s.bindBuffer(u,g),s.bufferData(u,h,f),l.onUploadCallback();let y;if(h instanceof Float32Array)y=s.FLOAT;else if(h instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)y=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else y=s.UNSIGNED_SHORT;else if(h instanceof Int16Array)y=s.SHORT;else if(h instanceof Uint32Array)y=s.UNSIGNED_INT;else if(h instanceof Int32Array)y=s.INT;else if(h instanceof Int8Array)y=s.BYTE;else if(h instanceof Uint8Array)y=s.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)y=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:g,type:y,bytesPerElement:h.BYTES_PER_ELEMENT,version:l.version,size:d}}function r(l,u,h){let f=u.array,d=u._updateRange,g=u.updateRanges;if(s.bindBuffer(h,l),d.count===-1&&g.length===0&&s.bufferSubData(h,0,f),g.length!==0){for(let y=0,m=g.length;y<m;y++){let p=g[y];t?s.bufferSubData(h,p.start*f.BYTES_PER_ELEMENT,f,p.start,p.count):s.bufferSubData(h,p.start*f.BYTES_PER_ELEMENT,f.subarray(p.start,p.start+p.count))}u.clearUpdateRanges()}d.count!==-1&&(t?s.bufferSubData(h,d.offset*f.BYTES_PER_ELEMENT,f,d.offset,d.count):s.bufferSubData(h,d.offset*f.BYTES_PER_ELEMENT,f.subarray(d.offset,d.offset+d.count)),d.count=-1),u.onUploadCallback()}function o(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);let u=n.get(l);u&&(s.deleteBuffer(u.buffer),n.delete(l))}function c(l,u){if(l.isGLBufferAttribute){let f=n.get(l);(!f||f.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);let h=n.get(l);if(h===void 0)n.set(l,i(l,u));else if(h.version<l.version){if(h.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(h.buffer,l,u),h.version=l.version}}return{get:o,remove:a,update:c}}function Db(s,e,t,n,i,r,o){let a=new It(0),c=r===!0?0:1,l,u,h=null,f=0,d=null;function g(m,p){let b=!1,_=p.isScene===!0?p.background:null;_&&_.isTexture&&(_=(p.backgroundBlurriness>0?t:e).get(_)),_===null?y(a,c):_&&_.isColor&&(y(_,1),b=!0);let T=s.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||b)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),_&&(_.isCubeTexture||_.mapping===Bl)?(u===void 0&&(u=new Sn(new ka(1,1,1),new Xi({name:"BackgroundCubeMaterial",uniforms:Wo(Ps.backgroundCube.uniforms),vertexShader:Ps.backgroundCube.vertexShader,fragmentShader:Ps.backgroundCube.fragmentShader,side:Ui,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(P,C,M){this.matrixWorld.copyPosition(M.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),u.material.uniforms.envMap.value=_,u.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,u.material.toneMapped=Mn.getTransfer(_.colorSpace)!==Vn,(h!==_||f!==_.version||d!==s.toneMapping)&&(u.material.needsUpdate=!0,h=_,f=_.version,d=s.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new Sn(new Jr(2,2),new Xi({name:"BackgroundMaterial",uniforms:Wo(Ps.background.uniforms),vertexShader:Ps.background.vertexShader,fragmentShader:Ps.background.fragmentShader,side:Gi,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,l.material.toneMapped=Mn.getTransfer(_.colorSpace)!==Vn,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||f!==_.version||d!==s.toneMapping)&&(l.material.needsUpdate=!0,h=_,f=_.version,d=s.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function y(m,p){m.getRGB(Wc,o0(s)),n.buffers.color.setClear(Wc.r,Wc.g,Wc.b,p,o)}return{getClearColor:function(){return a},setClearColor:function(m,p=1){a.set(m),c=p,y(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,y(a,c)},render:g}}function Ub(s,e,t,n){let i=s.getParameter(s.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||r!==null,a={},c=m(null),l=c,u=!1;function h(B,Y,Z,Ee,ae){let _e=!1;if(o){let Te=y(Ee,Z,Y);l!==Te&&(l=Te,d(l.object)),_e=p(B,Ee,Z,ae),_e&&b(B,Ee,Z,ae)}else{let Te=Y.wireframe===!0;(l.geometry!==Ee.id||l.program!==Z.id||l.wireframe!==Te)&&(l.geometry=Ee.id,l.program=Z.id,l.wireframe=Te,_e=!0)}ae!==null&&t.update(ae,s.ELEMENT_ARRAY_BUFFER),(_e||u)&&(u=!1,z(B,Y,Z,Ee),ae!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(ae).buffer))}function f(){return n.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function d(B){return n.isWebGL2?s.bindVertexArray(B):r.bindVertexArrayOES(B)}function g(B){return n.isWebGL2?s.deleteVertexArray(B):r.deleteVertexArrayOES(B)}function y(B,Y,Z){let Ee=Z.wireframe===!0,ae=a[B.id];ae===void 0&&(ae={},a[B.id]=ae);let _e=ae[Y.id];_e===void 0&&(_e={},ae[Y.id]=_e);let Te=_e[Ee];return Te===void 0&&(Te=m(f()),_e[Ee]=Te),Te}function m(B){let Y=[],Z=[],Ee=[];for(let ae=0;ae<i;ae++)Y[ae]=0,Z[ae]=0,Ee[ae]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:Y,enabledAttributes:Z,attributeDivisors:Ee,object:B,attributes:{},index:null}}function p(B,Y,Z,Ee){let ae=l.attributes,_e=Y.attributes,Te=0,Be=Z.getAttributes();for(let ht in Be)if(Be[ht].location>=0){let Ue=ae[ht],Qe=_e[ht];if(Qe===void 0&&(ht==="instanceMatrix"&&B.instanceMatrix&&(Qe=B.instanceMatrix),ht==="instanceColor"&&B.instanceColor&&(Qe=B.instanceColor)),Ue===void 0||Ue.attribute!==Qe||Qe&&Ue.data!==Qe.data)return!0;Te++}return l.attributesNum!==Te||l.index!==Ee}function b(B,Y,Z,Ee){let ae={},_e=Y.attributes,Te=0,Be=Z.getAttributes();for(let ht in Be)if(Be[ht].location>=0){let Ue=_e[ht];Ue===void 0&&(ht==="instanceMatrix"&&B.instanceMatrix&&(Ue=B.instanceMatrix),ht==="instanceColor"&&B.instanceColor&&(Ue=B.instanceColor));let Qe={};Qe.attribute=Ue,Ue&&Ue.data&&(Qe.data=Ue.data),ae[ht]=Qe,Te++}l.attributes=ae,l.attributesNum=Te,l.index=Ee}function _(){let B=l.newAttributes;for(let Y=0,Z=B.length;Y<Z;Y++)B[Y]=0}function T(B){P(B,0)}function P(B,Y){let Z=l.newAttributes,Ee=l.enabledAttributes,ae=l.attributeDivisors;Z[B]=1,Ee[B]===0&&(s.enableVertexAttribArray(B),Ee[B]=1),ae[B]!==Y&&((n.isWebGL2?s:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](B,Y),ae[B]=Y)}function C(){let B=l.newAttributes,Y=l.enabledAttributes;for(let Z=0,Ee=Y.length;Z<Ee;Z++)Y[Z]!==B[Z]&&(s.disableVertexAttribArray(Z),Y[Z]=0)}function M(B,Y,Z,Ee,ae,_e,Te){Te===!0?s.vertexAttribIPointer(B,Y,Z,ae,_e):s.vertexAttribPointer(B,Y,Z,Ee,ae,_e)}function z(B,Y,Z,Ee){if(n.isWebGL2===!1&&(B.isInstancedMesh||Ee.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;_();let ae=Ee.attributes,_e=Z.getAttributes(),Te=Y.defaultAttributeValues;for(let Be in _e){let ht=_e[Be];if(ht.location>=0){let he=ae[Be];if(he===void 0&&(Be==="instanceMatrix"&&B.instanceMatrix&&(he=B.instanceMatrix),Be==="instanceColor"&&B.instanceColor&&(he=B.instanceColor)),he!==void 0){let Ue=he.normalized,Qe=he.itemSize,Tt=t.get(he);if(Tt===void 0)continue;let wt=Tt.buffer,jt=Tt.type,$t=Tt.bytesPerElement,Gt=n.isWebGL2===!0&&(jt===s.INT||jt===s.UNSIGNED_INT||he.gpuType===Ym);if(he.isInterleavedBufferAttribute){let xn=he.data,re=xn.stride,Wn=he.offset;if(xn.isInstancedInterleavedBuffer){for(let zt=0;zt<ht.locationSize;zt++)P(ht.location+zt,xn.meshPerAttribute);B.isInstancedMesh!==!0&&Ee._maxInstanceCount===void 0&&(Ee._maxInstanceCount=xn.meshPerAttribute*xn.count)}else for(let zt=0;zt<ht.locationSize;zt++)T(ht.location+zt);s.bindBuffer(s.ARRAY_BUFFER,wt);for(let zt=0;zt<ht.locationSize;zt++)M(ht.location+zt,Qe/ht.locationSize,jt,Ue,re*$t,(Wn+Qe/ht.locationSize*zt)*$t,Gt)}else{if(he.isInstancedBufferAttribute){for(let xn=0;xn<ht.locationSize;xn++)P(ht.location+xn,he.meshPerAttribute);B.isInstancedMesh!==!0&&Ee._maxInstanceCount===void 0&&(Ee._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let xn=0;xn<ht.locationSize;xn++)T(ht.location+xn);s.bindBuffer(s.ARRAY_BUFFER,wt);for(let xn=0;xn<ht.locationSize;xn++)M(ht.location+xn,Qe/ht.locationSize,jt,Ue,Qe*$t,Qe/ht.locationSize*xn*$t,Gt)}}else if(Te!==void 0){let Ue=Te[Be];if(Ue!==void 0)switch(Ue.length){case 2:s.vertexAttrib2fv(ht.location,Ue);break;case 3:s.vertexAttrib3fv(ht.location,Ue);break;case 4:s.vertexAttrib4fv(ht.location,Ue);break;default:s.vertexAttrib1fv(ht.location,Ue)}}}}C()}function v(){O();for(let B in a){let Y=a[B];for(let Z in Y){let Ee=Y[Z];for(let ae in Ee)g(Ee[ae].object),delete Ee[ae];delete Y[Z]}delete a[B]}}function R(B){if(a[B.id]===void 0)return;let Y=a[B.id];for(let Z in Y){let Ee=Y[Z];for(let ae in Ee)g(Ee[ae].object),delete Ee[ae];delete Y[Z]}delete a[B.id]}function V(B){for(let Y in a){let Z=a[Y];if(Z[B.id]===void 0)continue;let Ee=Z[B.id];for(let ae in Ee)g(Ee[ae].object),delete Ee[ae];delete Z[B.id]}}function O(){j(),u=!0,l!==c&&(l=c,d(l.object))}function j(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:h,reset:O,resetDefaultState:j,dispose:v,releaseStatesOfGeometry:R,releaseStatesOfProgram:V,initAttributes:_,enableAttribute:T,disableUnusedAttributes:C}}function Fb(s,e,t,n){let i=n.isWebGL2,r;function o(u){r=u}function a(u,h){s.drawArrays(r,u,h),t.update(h,r,1)}function c(u,h,f){if(f===0)return;let d,g;if(i)d=s,g="drawArraysInstanced";else if(d=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[g](r,u,h,f),t.update(h,r,f)}function l(u,h,f){if(f===0)return;let d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<f;g++)this.render(u[g],h[g]);else{d.multiDrawArraysWEBGL(r,u,0,h,0,f);let g=0;for(let y=0;y<f;y++)g+=h[y];t.update(g,r,1)}}this.setMode=o,this.render=a,this.renderInstances=c,this.renderMultiDraw=l}function Bb(s,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){let M=e.get("EXT_texture_filter_anisotropic");n=s.getParameter(M.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(M){if(M==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";M="mediump"}return M==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let o=typeof WebGL2RenderingContext!="undefined"&&s.constructor.name==="WebGL2RenderingContext",a=t.precision!==void 0?t.precision:"highp",c=r(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);let l=o||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,h=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),d=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),y=s.getParameter(s.MAX_VERTEX_ATTRIBS),m=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),p=s.getParameter(s.MAX_VARYING_VECTORS),b=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),_=f>0,T=o||e.has("OES_texture_float"),P=_&&T,C=o?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:l,getMaxAnisotropy:i,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:f,maxTextureSize:d,maxCubemapSize:g,maxAttributes:y,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:b,vertexTextures:_,floatFragmentTextures:T,floatVertexTextures:P,maxSamples:C}}function Ob(s){let e=this,t=null,n=0,i=!1,r=!1,o=new ts,a=new fn,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){let d=h.length!==0||f||n!==0||i;return i=f,n=h.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,d){let g=h.clippingPlanes,y=h.clipIntersection,m=h.clipShadows,p=s.get(h);if(!i||g===null||g.length===0||r&&!m)r?u(null):l();else{let b=r?0:n,_=b*4,T=p.clippingState||null;c.value=T,T=u(g,f,_,d);for(let P=0;P!==_;++P)T[P]=t[P];p.clippingState=T,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,f,d,g){let y=h!==null?h.length:0,m=null;if(y!==0){if(m=c.value,g!==!0||m===null){let p=d+y*4,b=f.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let _=0,T=d;_!==y;++_,T+=4)o.copy(h[_]).applyMatrix4(b,a),o.normal.toArray(m,T),m[T+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,m}}function kb(s){let e=new WeakMap;function t(o,a){return a===bh?o.mapping=Fo:a===Mh&&(o.mapping=Bo),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===bh||a===Mh)if(e.has(o)){let c=e.get(o).texture;return t(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new Ch(c.height/2);return l.fromEquirectangularTexture(s,o),e.set(o,l),o.addEventListener("dispose",i),t(l.texture,o.mapping)}else return null}}return o}function i(o){let a=o.target;a.removeEventListener("dispose",i);let c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}function zb(s){let e=[],t=[],n=[],i=s,r=s-Po+1+$p.length;for(let o=0;o<r;o++){let a=Math.pow(2,i);t.push(a);let c=1/a;o>s-Po?c=$p[o-s+Po-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),u=-l,h=1+l,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,g=6,y=3,m=2,p=1,b=new Float32Array(y*g*d),_=new Float32Array(m*g*d),T=new Float32Array(p*g*d);for(let C=0;C<d;C++){let M=C%3*2/3-1,z=C>2?0:-1,v=[M,z,0,M+2/3,z,0,M+2/3,z+1,0,M,z,0,M+2/3,z+1,0,M,z+1,0];b.set(v,y*g*C),_.set(f,m*g*C);let R=[C,C,C,C,C,C];T.set(R,p*g*C)}let P=new Si;P.setAttribute("position",new Tn(b,y)),P.setAttribute("uv",new Tn(_,m)),P.setAttribute("faceIndex",new Tn(T,p)),e.push(P),i>Po&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function tm(s,e,t){let n=new ps(s,e,t);return n.texture.mapping=Bl,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Xc(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function Hb(s,e,t){let n=new Float32Array(Wr),i=new w(0,1,0);return new Xi({name:"SphericalGaussianBlur",defines:{n:Wr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:pf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:mr,depthTest:!1,depthWrite:!1})}function nm(){return new Xi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:pf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:mr,depthTest:!1,depthWrite:!1})}function im(){return new Xi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:pf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:mr,depthTest:!1,depthWrite:!1})}function pf(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Vb(s){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===bh||c===Mh,u=c===Fo||c===Bo;if(l||u)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let h=e.get(a);return t===null&&(t=new dl(s)),h=l?t.fromEquirectangular(a,h):t.fromCubemap(a,h),e.set(a,h),h.texture}else{if(e.has(a))return e.get(a).texture;{let h=a.image;if(l&&h&&h.height>0||u&&h&&i(h)){t===null&&(t=new dl(s));let f=l?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,f),a.addEventListener("dispose",r),f.texture}else return null}}}return a}function i(a){let c=0,l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Gb(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){let i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Wb(s,e,t,n){let i={},r=new WeakMap;function o(h){let f=h.target;f.index!==null&&e.remove(f.index);for(let g in f.attributes)e.remove(f.attributes[g]);for(let g in f.morphAttributes){let y=f.morphAttributes[g];for(let m=0,p=y.length;m<p;m++)e.remove(y[m])}f.removeEventListener("dispose",o),delete i[f.id];let d=r.get(f);d&&(e.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(h,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,t.memory.geometries++),f}function c(h){let f=h.attributes;for(let g in f)e.update(f[g],s.ARRAY_BUFFER);let d=h.morphAttributes;for(let g in d){let y=d[g];for(let m=0,p=y.length;m<p;m++)e.update(y[m],s.ARRAY_BUFFER)}}function l(h){let f=[],d=h.index,g=h.attributes.position,y=0;if(d!==null){let b=d.array;y=d.version;for(let _=0,T=b.length;_<T;_+=3){let P=b[_+0],C=b[_+1],M=b[_+2];f.push(P,C,C,M,M,P)}}else if(g!==void 0){let b=g.array;y=g.version;for(let _=0,T=b.length/3-1;_<T;_+=3){let P=_+0,C=_+1,M=_+2;f.push(P,C,C,M,M,P)}}else return;let m=new(s0(f)?Go:Vo)(f,1);m.version=y;let p=r.get(h);p&&e.remove(p),r.set(h,m)}function u(h){let f=r.get(h);if(f){let d=h.index;d!==null&&f.version<d.version&&l(h)}else l(h);return r.get(h)}return{get:a,update:c,getWireframeAttribute:u}}function Xb(s,e,t,n){let i=n.isWebGL2,r;function o(d){r=d}let a,c;function l(d){a=d.type,c=d.bytesPerElement}function u(d,g){s.drawElements(r,g,a,d*c),t.update(g,r,1)}function h(d,g,y){if(y===0)return;let m,p;if(i)m=s,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](r,g,a,d*c,y),t.update(g,r,y)}function f(d,g,y){if(y===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<y;p++)this.render(d[p]/c,g[p]);else{m.multiDrawElementsWEBGL(r,g,0,a,d,0,y);let p=0;for(let b=0;b<y;b++)p+=g[b];t.update(p,r,1)}}this.setMode=o,this.setIndex=l,this.render=u,this.renderInstances=h,this.renderMultiDraw=f}function qb(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Yb(s,e){return s[0]-e[0]}function jb(s,e){return Math.abs(e[1])-Math.abs(s[1])}function Zb(s,e,t){let n={},i=new Float32Array(8),r=new WeakMap,o=new Ln,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function c(l,u,h){let f=l.morphTargetInfluences;if(e.isWebGL2===!0){let d=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,g=d!==void 0?d.length:0,y=r.get(u);if(y===void 0||y.count!==g){let B=function(){O.dispose(),r.delete(u),u.removeEventListener("dispose",B)};y!==void 0&&y.texture.dispose();let b=u.morphAttributes.position!==void 0,_=u.morphAttributes.normal!==void 0,T=u.morphAttributes.color!==void 0,P=u.morphAttributes.position||[],C=u.morphAttributes.normal||[],M=u.morphAttributes.color||[],z=0;b===!0&&(z=1),_===!0&&(z=2),T===!0&&(z=3);let v=u.attributes.position.count*z,R=1;v>e.maxTextureSize&&(R=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);let V=new Float32Array(v*R*4*g),O=new ul(V,v,R,g);O.type=Ns,O.needsUpdate=!0;let j=z*4;for(let Y=0;Y<g;Y++){let Z=P[Y],Ee=C[Y],ae=M[Y],_e=v*R*4*Y;for(let Te=0;Te<Z.count;Te++){let Be=Te*j;b===!0&&(o.fromBufferAttribute(Z,Te),V[_e+Be+0]=o.x,V[_e+Be+1]=o.y,V[_e+Be+2]=o.z,V[_e+Be+3]=0),_===!0&&(o.fromBufferAttribute(Ee,Te),V[_e+Be+4]=o.x,V[_e+Be+5]=o.y,V[_e+Be+6]=o.z,V[_e+Be+7]=0),T===!0&&(o.fromBufferAttribute(ae,Te),V[_e+Be+8]=o.x,V[_e+Be+9]=o.y,V[_e+Be+10]=o.z,V[_e+Be+11]=ae.itemSize===4?o.w:1)}}y={count:g,texture:O,size:new nt(v,R)},r.set(u,y),u.addEventListener("dispose",B)}let m=0;for(let b=0;b<f.length;b++)m+=f[b];let p=u.morphTargetsRelative?1:1-m;h.getUniforms().setValue(s,"morphTargetBaseInfluence",p),h.getUniforms().setValue(s,"morphTargetInfluences",f),h.getUniforms().setValue(s,"morphTargetsTexture",y.texture,t),h.getUniforms().setValue(s,"morphTargetsTextureSize",y.size)}else{let d=f===void 0?0:f.length,g=n[u.id];if(g===void 0||g.length!==d){g=[];for(let _=0;_<d;_++)g[_]=[_,0];n[u.id]=g}for(let _=0;_<d;_++){let T=g[_];T[0]=_,T[1]=f[_]}g.sort(jb);for(let _=0;_<8;_++)_<d&&g[_][1]?(a[_][0]=g[_][0],a[_][1]=g[_][1]):(a[_][0]=Number.MAX_SAFE_INTEGER,a[_][1]=0);a.sort(Yb);let y=u.morphAttributes.position,m=u.morphAttributes.normal,p=0;for(let _=0;_<8;_++){let T=a[_],P=T[0],C=T[1];P!==Number.MAX_SAFE_INTEGER&&C?(y&&u.getAttribute("morphTarget"+_)!==y[P]&&u.setAttribute("morphTarget"+_,y[P]),m&&u.getAttribute("morphNormal"+_)!==m[P]&&u.setAttribute("morphNormal"+_,m[P]),i[_]=C,p+=C):(y&&u.hasAttribute("morphTarget"+_)===!0&&u.deleteAttribute("morphTarget"+_),m&&u.hasAttribute("morphNormal"+_)===!0&&u.deleteAttribute("morphNormal"+_),i[_]=0)}let b=u.morphTargetsRelative?1:1-p;h.getUniforms().setValue(s,"morphTargetBaseInfluence",b),h.getUniforms().setValue(s,"morphTargetInfluences",i)}}return{update:c}}function Kb(s,e,t,n){let i=new WeakMap;function r(c){let l=n.render.frame,u=c.geometry,h=e.get(c,u);if(i.get(h)!==l&&(e.update(h),i.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;i.get(f)!==l&&(f.update(),i.set(f,l))}return h}function o(){i=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}function jo(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=sm[i];if(r===void 0&&(r=new Float32Array(i),sm[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function xi(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function yi(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function zl(s,e){let t=rm[e];t===void 0&&(t=new Int32Array(e),rm[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function Jb(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function $b(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xi(t,e))return;s.uniform2fv(this.addr,e),yi(t,e)}}function Qb(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(xi(t,e))return;s.uniform3fv(this.addr,e),yi(t,e)}}function eM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xi(t,e))return;s.uniform4fv(this.addr,e),yi(t,e)}}function tM(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(xi(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),yi(t,e)}else{if(xi(t,n))return;cm.set(n),s.uniformMatrix2fv(this.addr,!1,cm),yi(t,n)}}function nM(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(xi(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),yi(t,e)}else{if(xi(t,n))return;am.set(n),s.uniformMatrix3fv(this.addr,!1,am),yi(t,n)}}function iM(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(xi(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),yi(t,e)}else{if(xi(t,n))return;om.set(n),s.uniformMatrix4fv(this.addr,!1,om),yi(t,n)}}function sM(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function rM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xi(t,e))return;s.uniform2iv(this.addr,e),yi(t,e)}}function oM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(xi(t,e))return;s.uniform3iv(this.addr,e),yi(t,e)}}function aM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xi(t,e))return;s.uniform4iv(this.addr,e),yi(t,e)}}function cM(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function lM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xi(t,e))return;s.uniform2uiv(this.addr,e),yi(t,e)}}function uM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(xi(t,e))return;s.uniform3uiv(this.addr,e),yi(t,e)}}function hM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xi(t,e))return;s.uniform4uiv(this.addr,e),yi(t,e)}}function fM(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r=this.type===s.SAMPLER_2D_SHADOW?l0:c0;t.setTexture2D(e||r,i)}function dM(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||h0,i)}function pM(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||f0,i)}function mM(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||u0,i)}function gM(s){switch(s){case 5126:return Jb;case 35664:return $b;case 35665:return Qb;case 35666:return eM;case 35674:return tM;case 35675:return nM;case 35676:return iM;case 5124:case 35670:return sM;case 35667:case 35671:return rM;case 35668:case 35672:return oM;case 35669:case 35673:return aM;case 5125:return cM;case 36294:return lM;case 36295:return uM;case 36296:return hM;case 35678:case 36198:case 36298:case 36306:case 35682:return fM;case 35679:case 36299:case 36307:return dM;case 35680:case 36300:case 36308:case 36293:return pM;case 36289:case 36303:case 36311:case 36292:return mM}}function xM(s,e){s.uniform1fv(this.addr,e)}function yM(s,e){let t=jo(e,this.size,2);s.uniform2fv(this.addr,t)}function _M(s,e){let t=jo(e,this.size,3);s.uniform3fv(this.addr,t)}function vM(s,e){let t=jo(e,this.size,4);s.uniform4fv(this.addr,t)}function bM(s,e){let t=jo(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function MM(s,e){let t=jo(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function SM(s,e){let t=jo(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function EM(s,e){s.uniform1iv(this.addr,e)}function TM(s,e){s.uniform2iv(this.addr,e)}function wM(s,e){s.uniform3iv(this.addr,e)}function AM(s,e){s.uniform4iv(this.addr,e)}function RM(s,e){s.uniform1uiv(this.addr,e)}function CM(s,e){s.uniform2uiv(this.addr,e)}function PM(s,e){s.uniform3uiv(this.addr,e)}function IM(s,e){s.uniform4uiv(this.addr,e)}function LM(s,e,t){let n=this.cache,i=e.length,r=zl(t,i);xi(n,r)||(s.uniform1iv(this.addr,r),yi(n,r));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||c0,r[o])}function NM(s,e,t){let n=this.cache,i=e.length,r=zl(t,i);xi(n,r)||(s.uniform1iv(this.addr,r),yi(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||h0,r[o])}function DM(s,e,t){let n=this.cache,i=e.length,r=zl(t,i);xi(n,r)||(s.uniform1iv(this.addr,r),yi(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||f0,r[o])}function UM(s,e,t){let n=this.cache,i=e.length,r=zl(t,i);xi(n,r)||(s.uniform1iv(this.addr,r),yi(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||u0,r[o])}function FM(s){switch(s){case 5126:return xM;case 35664:return yM;case 35665:return _M;case 35666:return vM;case 35674:return bM;case 35675:return MM;case 35676:return SM;case 5124:case 35670:return EM;case 35667:case 35671:return TM;case 35668:case 35672:return wM;case 35669:case 35673:return AM;case 5125:return RM;case 36294:return CM;case 36295:return PM;case 36296:return IM;case 35678:case 36198:case 36298:case 36306:case 35682:return LM;case 35679:case 36299:case 36307:return NM;case 35680:case 36300:case 36308:case 36293:return DM;case 36289:case 36303:case 36311:case 36292:return UM}}function lm(s,e){s.seq.push(e),s.map[e.id]=e}function BM(s,e,t){let n=s.name,i=n.length;for(lh.lastIndex=0;;){let r=lh.exec(n),o=lh.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){lm(t,l===void 0?new Ph(a,s,e):new Ih(a,s,e));break}else{let h=t.map[a];h===void 0&&(h=new Lh(a),lm(t,h)),t=h}}}function um(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}function zM(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function HM(s){let e=Mn.getPrimaries(Mn.workingColorSpace),t=Mn.getPrimaries(s),n;switch(e===t?n="":e===ol&&t===rl?n="LinearDisplayP3ToLinearSRGB":e===rl&&t===ol&&(n="LinearSRGBToLinearDisplayP3"),s){case mi:case kl:return[n,"LinearTransferOETF"];case Gn:case ff:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function hm(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";let r=/ERROR: 0:(\d+)/.exec(i);if(r){let o=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+zM(s.getShaderSource(e),o)}else return i}function VM(s,e){let t=HM(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function GM(s,e){let t;switch(e){case Yx:t="Linear";break;case jx:t="Reinhard";break;case Zx:t="OptimizedCineon";break;case Kx:t="ACESFilmic";break;case $x:t="AgX";break;case Jx:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function WM(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Io).join(`
`)}function XM(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Io).join(`
`)}function qM(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function YM(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function Io(s){return s!==""}function fm(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function dm(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}function Nh(s){return s.replace(jM,KM)}function KM(s,e){let t=hn[e];if(t===void 0){let n=ZM.get(e);if(n!==void 0)t=hn[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Nh(t)}function pm(s){return s.replace(JM,$M)}function $M(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function mm(s){let e="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function QM(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Wm?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Tx?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Js&&(e="SHADOWMAP_TYPE_VSM"),e}function eS(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Fo:case Bo:e="ENVMAP_TYPE_CUBE";break;case Bl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function tS(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Bo:e="ENVMAP_MODE_REFRACTION";break}return e}function nS(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Xm:e="ENVMAP_BLENDING_MULTIPLY";break;case Xx:e="ENVMAP_BLENDING_MIX";break;case qx:e="ENVMAP_BLENDING_ADD";break}return e}function iS(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function sS(s,e,t,n){let i=s.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,c=QM(t),l=eS(t),u=tS(t),h=nS(t),f=iS(t),d=t.isWebGL2?"":WM(t),g=XM(t),y=qM(r),m=i.createProgram(),p,b,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y].filter(Io).join(`
`),p.length>0&&(p+=`
`),b=[d,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y].filter(Io).join(`
`),b.length>0&&(b+=`
`)):(p=[mm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Io).join(`
`),b=[d,mm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==gr?"#define TONE_MAPPING":"",t.toneMapping!==gr?hn.tonemapping_pars_fragment:"",t.toneMapping!==gr?GM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",hn.colorspace_pars_fragment,VM("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Io).join(`
`)),o=Nh(o),o=fm(o,t),o=dm(o,t),a=Nh(a),a=fm(a,t),a=dm(a,t),o=pm(o),a=pm(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,b=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Dp?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Dp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+b);let T=_+p+o,P=_+b+a,C=um(i,i.VERTEX_SHADER,T),M=um(i,i.FRAGMENT_SHADER,P);i.attachShader(m,C),i.attachShader(m,M),t.index0AttributeName!==void 0?i.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m);function z(O){if(s.debug.checkShaderErrors){let j=i.getProgramInfoLog(m).trim(),B=i.getShaderInfoLog(C).trim(),Y=i.getShaderInfoLog(M).trim(),Z=!0,Ee=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(Z=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,m,C,M);else{let ae=hm(i,C,"vertex"),_e=hm(i,M,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Program Info Log: `+j+`
`+ae+`
`+_e)}else j!==""?console.warn("THREE.WebGLProgram: Program Info Log:",j):(B===""||Y==="")&&(Ee=!1);Ee&&(O.diagnostics={runnable:Z,programLog:j,vertexShader:{log:B,prefix:p},fragmentShader:{log:Y,prefix:b}})}i.deleteShader(C),i.deleteShader(M),v=new Do(i,m),R=YM(i,m)}let v;this.getUniforms=function(){return v===void 0&&z(this),v};let R;this.getAttributes=function(){return R===void 0&&z(this),R};let V=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return V===!1&&(V=i.getProgramParameter(m,OM)),V},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=kM++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=C,this.fragmentShader=M,this}function oS(s,e,t,n,i,r,o){let a=new Oa,c=new Dh,l=[],u=i.isWebGL2,h=i.logarithmicDepthBuffer,f=i.vertexTextures,d=i.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(v){return v===0?"uv":`uv${v}`}function m(v,R,V,O,j){let B=O.fog,Y=j.geometry,Z=v.isMeshStandardMaterial?O.environment:null,Ee=(v.isMeshStandardMaterial?t:e).get(v.envMap||Z),ae=Ee&&Ee.mapping===Bl?Ee.image.height:null,_e=g[v.type];v.precision!==null&&(d=i.getMaxPrecision(v.precision),d!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",d,"instead."));let Te=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,Be=Te!==void 0?Te.length:0,ht=0;Y.morphAttributes.position!==void 0&&(ht=1),Y.morphAttributes.normal!==void 0&&(ht=2),Y.morphAttributes.color!==void 0&&(ht=3);let he,Ue,Qe,Tt;if(_e){let $n=Ps[_e];he=$n.vertexShader,Ue=$n.fragmentShader}else he=v.vertexShader,Ue=v.fragmentShader,c.update(v),Qe=c.getVertexShaderID(v),Tt=c.getFragmentShaderID(v);let wt=s.getRenderTarget(),jt=j.isInstancedMesh===!0,$t=j.isBatchedMesh===!0,Gt=!!v.map,xn=!!v.matcap,re=!!Ee,Wn=!!v.aoMap,zt=!!v.lightMap,Dt=!!v.bumpMap,ot=!!v.normalMap,On=!!v.displacementMap,Ut=!!v.emissiveMap,N=!!v.metalnessMap,A=!!v.roughnessMap,ie=v.anisotropy>0,Ce=v.clearcoat>0,Ie=v.iridescence>0,ke=v.sheen>0,St=v.transmission>0,Ke=ie&&!!v.anisotropyMap,st=Ce&&!!v.clearcoatMap,At=Ce&&!!v.clearcoatNormalMap,Ht=Ce&&!!v.clearcoatRoughnessMap,Fe=Ie&&!!v.iridescenceMap,Pe=Ie&&!!v.iridescenceThicknessMap,Le=ke&&!!v.sheenColorMap,bt=ke&&!!v.sheenRoughnessMap,Et=!!v.specularMap,et=!!v.specularColorMap,Mt=!!v.specularIntensityMap,Qt=St&&!!v.transmissionMap,kn=St&&!!v.thicknessMap,Ft=!!v.gradientMap,He=!!v.alphaMap,H=v.alphaTest>0,Ye=!!v.alphaHash,je=!!v.extensions,Wt=!!Y.attributes.uv1,Bt=!!Y.attributes.uv2,bn=!!Y.attributes.uv3,yn=gr;return v.toneMapped&&(wt===null||wt.isXRRenderTarget===!0)&&(yn=s.toneMapping),{isWebGL2:u,shaderID:_e,shaderType:v.type,shaderName:v.name,vertexShader:he,fragmentShader:Ue,defines:v.defines,customVertexShaderID:Qe,customFragmentShaderID:Tt,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:d,batching:$t,instancing:jt,instancingColor:jt&&j.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:wt===null?s.outputColorSpace:wt.isXRRenderTarget===!0?wt.texture.colorSpace:mi,map:Gt,matcap:xn,envMap:re,envMapMode:re&&Ee.mapping,envMapCubeUVHeight:ae,aoMap:Wn,lightMap:zt,bumpMap:Dt,normalMap:ot,displacementMap:f&&On,emissiveMap:Ut,normalMapObjectSpace:ot&&v.normalMapType===hy,normalMapTangentSpace:ot&&v.normalMapType===n0,metalnessMap:N,roughnessMap:A,anisotropy:ie,anisotropyMap:Ke,clearcoat:Ce,clearcoatMap:st,clearcoatNormalMap:At,clearcoatRoughnessMap:Ht,iridescence:Ie,iridescenceMap:Fe,iridescenceThicknessMap:Pe,sheen:ke,sheenColorMap:Le,sheenRoughnessMap:bt,specularMap:Et,specularColorMap:et,specularIntensityMap:Mt,transmission:St,transmissionMap:Qt,thicknessMap:kn,gradientMap:Ft,opaque:v.transparent===!1&&v.blending===Lo,alphaMap:He,alphaTest:H,alphaHash:Ye,combine:v.combine,mapUv:Gt&&y(v.map.channel),aoMapUv:Wn&&y(v.aoMap.channel),lightMapUv:zt&&y(v.lightMap.channel),bumpMapUv:Dt&&y(v.bumpMap.channel),normalMapUv:ot&&y(v.normalMap.channel),displacementMapUv:On&&y(v.displacementMap.channel),emissiveMapUv:Ut&&y(v.emissiveMap.channel),metalnessMapUv:N&&y(v.metalnessMap.channel),roughnessMapUv:A&&y(v.roughnessMap.channel),anisotropyMapUv:Ke&&y(v.anisotropyMap.channel),clearcoatMapUv:st&&y(v.clearcoatMap.channel),clearcoatNormalMapUv:At&&y(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ht&&y(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Fe&&y(v.iridescenceMap.channel),iridescenceThicknessMapUv:Pe&&y(v.iridescenceThicknessMap.channel),sheenColorMapUv:Le&&y(v.sheenColorMap.channel),sheenRoughnessMapUv:bt&&y(v.sheenRoughnessMap.channel),specularMapUv:Et&&y(v.specularMap.channel),specularColorMapUv:et&&y(v.specularColorMap.channel),specularIntensityMapUv:Mt&&y(v.specularIntensityMap.channel),transmissionMapUv:Qt&&y(v.transmissionMap.channel),thicknessMapUv:kn&&y(v.thicknessMap.channel),alphaMapUv:He&&y(v.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(ot||ie),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,vertexUv1s:Wt,vertexUv2s:Bt,vertexUv3s:bn,pointsUvs:j.isPoints===!0&&!!Y.attributes.uv&&(Gt||He),fog:!!B,useFog:v.fog===!0,fogExp2:B&&B.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:j.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:Be,morphTextureStride:ht,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:v.dithering,shadowMapEnabled:s.shadowMap.enabled&&V.length>0,shadowMapType:s.shadowMap.type,toneMapping:yn,useLegacyLights:s._useLegacyLights,decodeVideoTexture:Gt&&v.map.isVideoTexture===!0&&Mn.getTransfer(v.map.colorSpace)===Vn,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Mi,flipSided:v.side===Ui,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionDerivatives:je&&v.extensions.derivatives===!0,extensionFragDepth:je&&v.extensions.fragDepth===!0,extensionDrawBuffers:je&&v.extensions.drawBuffers===!0,extensionShaderTextureLOD:je&&v.extensions.shaderTextureLOD===!0,extensionClipCullDistance:je&&v.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()}}function p(v){let R=[];if(v.shaderID?R.push(v.shaderID):(R.push(v.customVertexShaderID),R.push(v.customFragmentShaderID)),v.defines!==void 0)for(let V in v.defines)R.push(V),R.push(v.defines[V]);return v.isRawShaderMaterial===!1&&(b(R,v),_(R,v),R.push(s.outputColorSpace)),R.push(v.customProgramCacheKey),R.join()}function b(v,R){v.push(R.precision),v.push(R.outputColorSpace),v.push(R.envMapMode),v.push(R.envMapCubeUVHeight),v.push(R.mapUv),v.push(R.alphaMapUv),v.push(R.lightMapUv),v.push(R.aoMapUv),v.push(R.bumpMapUv),v.push(R.normalMapUv),v.push(R.displacementMapUv),v.push(R.emissiveMapUv),v.push(R.metalnessMapUv),v.push(R.roughnessMapUv),v.push(R.anisotropyMapUv),v.push(R.clearcoatMapUv),v.push(R.clearcoatNormalMapUv),v.push(R.clearcoatRoughnessMapUv),v.push(R.iridescenceMapUv),v.push(R.iridescenceThicknessMapUv),v.push(R.sheenColorMapUv),v.push(R.sheenRoughnessMapUv),v.push(R.specularMapUv),v.push(R.specularColorMapUv),v.push(R.specularIntensityMapUv),v.push(R.transmissionMapUv),v.push(R.thicknessMapUv),v.push(R.combine),v.push(R.fogExp2),v.push(R.sizeAttenuation),v.push(R.morphTargetsCount),v.push(R.morphAttributeCount),v.push(R.numDirLights),v.push(R.numPointLights),v.push(R.numSpotLights),v.push(R.numSpotLightMaps),v.push(R.numHemiLights),v.push(R.numRectAreaLights),v.push(R.numDirLightShadows),v.push(R.numPointLightShadows),v.push(R.numSpotLightShadows),v.push(R.numSpotLightShadowsWithMaps),v.push(R.numLightProbes),v.push(R.shadowMapType),v.push(R.toneMapping),v.push(R.numClippingPlanes),v.push(R.numClipIntersection),v.push(R.depthPacking)}function _(v,R){a.disableAll(),R.isWebGL2&&a.enable(0),R.supportsVertexTextures&&a.enable(1),R.instancing&&a.enable(2),R.instancingColor&&a.enable(3),R.matcap&&a.enable(4),R.envMap&&a.enable(5),R.normalMapObjectSpace&&a.enable(6),R.normalMapTangentSpace&&a.enable(7),R.clearcoat&&a.enable(8),R.iridescence&&a.enable(9),R.alphaTest&&a.enable(10),R.vertexColors&&a.enable(11),R.vertexAlphas&&a.enable(12),R.vertexUv1s&&a.enable(13),R.vertexUv2s&&a.enable(14),R.vertexUv3s&&a.enable(15),R.vertexTangents&&a.enable(16),R.anisotropy&&a.enable(17),R.alphaHash&&a.enable(18),R.batching&&a.enable(19),v.push(a.mask),a.disableAll(),R.fog&&a.enable(0),R.useFog&&a.enable(1),R.flatShading&&a.enable(2),R.logarithmicDepthBuffer&&a.enable(3),R.skinning&&a.enable(4),R.morphTargets&&a.enable(5),R.morphNormals&&a.enable(6),R.morphColors&&a.enable(7),R.premultipliedAlpha&&a.enable(8),R.shadowMapEnabled&&a.enable(9),R.useLegacyLights&&a.enable(10),R.doubleSided&&a.enable(11),R.flipSided&&a.enable(12),R.useDepthPacking&&a.enable(13),R.dithering&&a.enable(14),R.transmission&&a.enable(15),R.sheen&&a.enable(16),R.opaque&&a.enable(17),R.pointsUvs&&a.enable(18),R.decodeVideoTexture&&a.enable(19),v.push(a.mask)}function T(v){let R=g[v.type],V;if(R){let O=Ps[R];V=Zy.clone(O.uniforms)}else V=v.uniforms;return V}function P(v,R){let V;for(let O=0,j=l.length;O<j;O++){let B=l[O];if(B.cacheKey===R){V=B,++V.usedTimes;break}}return V===void 0&&(V=new sS(s,R,v,r),l.push(V)),V}function C(v){if(--v.usedTimes===0){let R=l.indexOf(v);l[R]=l[l.length-1],l.pop(),v.destroy()}}function M(v){c.remove(v)}function z(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:T,acquireProgram:P,releaseProgram:C,releaseShaderCache:M,programs:l,dispose:z}}function aS(){let s=new WeakMap;function e(r){let o=s.get(r);return o===void 0&&(o={},s.set(r,o)),o}function t(r){s.delete(r)}function n(r,o,a){s.get(r)[o]=a}function i(){s=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function cS(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function gm(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function xm(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(h,f,d,g,y,m){let p=s[e];return p===void 0?(p={id:h.id,object:h,geometry:f,material:d,groupOrder:g,renderOrder:h.renderOrder,z:y,group:m},s[e]=p):(p.id=h.id,p.object=h,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=y,p.group=m),e++,p}function a(h,f,d,g,y,m){let p=o(h,f,d,g,y,m);d.transmission>0?n.push(p):d.transparent===!0?i.push(p):t.push(p)}function c(h,f,d,g,y,m){let p=o(h,f,d,g,y,m);d.transmission>0?n.unshift(p):d.transparent===!0?i.unshift(p):t.unshift(p)}function l(h,f){t.length>1&&t.sort(h||cS),n.length>1&&n.sort(f||gm),i.length>1&&i.sort(f||gm)}function u(){for(let h=e,f=s.length;h<f;h++){let d=s[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:a,unshift:c,finish:u,sort:l}}function lS(){let s=new WeakMap;function e(n,i){let r=s.get(n),o;return r===void 0?(o=new xm,s.set(n,[o])):i>=r.length?(o=new xm,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function uS(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new w,color:new It};break;case"SpotLight":t={position:new w,direction:new w,color:new It,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new w,color:new It,distance:0,decay:0};break;case"HemisphereLight":t={direction:new w,skyColor:new It,groundColor:new It};break;case"RectAreaLight":t={color:new It,position:new w,halfWidth:new w,halfHeight:new w};break}return s[e.id]=t,t}}}function hS(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}function dS(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function pS(s,e){let t=new uS,n=hS(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new w);let r=new w,o=new vt,a=new vt;function c(u,h){let f=0,d=0,g=0;for(let O=0;O<9;O++)i.probe[O].set(0,0,0);let y=0,m=0,p=0,b=0,_=0,T=0,P=0,C=0,M=0,z=0,v=0;u.sort(dS);let R=h===!0?Math.PI:1;for(let O=0,j=u.length;O<j;O++){let B=u[O],Y=B.color,Z=B.intensity,Ee=B.distance,ae=B.shadow&&B.shadow.map?B.shadow.map.texture:null;if(B.isAmbientLight)f+=Y.r*Z*R,d+=Y.g*Z*R,g+=Y.b*Z*R;else if(B.isLightProbe){for(let _e=0;_e<9;_e++)i.probe[_e].addScaledVector(B.sh.coefficients[_e],Z);v++}else if(B.isDirectionalLight){let _e=t.get(B);if(_e.color.copy(B.color).multiplyScalar(B.intensity*R),B.castShadow){let Te=B.shadow,Be=n.get(B);Be.shadowBias=Te.bias,Be.shadowNormalBias=Te.normalBias,Be.shadowRadius=Te.radius,Be.shadowMapSize=Te.mapSize,i.directionalShadow[y]=Be,i.directionalShadowMap[y]=ae,i.directionalShadowMatrix[y]=B.shadow.matrix,T++}i.directional[y]=_e,y++}else if(B.isSpotLight){let _e=t.get(B);_e.position.setFromMatrixPosition(B.matrixWorld),_e.color.copy(Y).multiplyScalar(Z*R),_e.distance=Ee,_e.coneCos=Math.cos(B.angle),_e.penumbraCos=Math.cos(B.angle*(1-B.penumbra)),_e.decay=B.decay,i.spot[p]=_e;let Te=B.shadow;if(B.map&&(i.spotLightMap[M]=B.map,M++,Te.updateMatrices(B),B.castShadow&&z++),i.spotLightMatrix[p]=Te.matrix,B.castShadow){let Be=n.get(B);Be.shadowBias=Te.bias,Be.shadowNormalBias=Te.normalBias,Be.shadowRadius=Te.radius,Be.shadowMapSize=Te.mapSize,i.spotShadow[p]=Be,i.spotShadowMap[p]=ae,C++}p++}else if(B.isRectAreaLight){let _e=t.get(B);_e.color.copy(Y).multiplyScalar(Z),_e.halfWidth.set(B.width*.5,0,0),_e.halfHeight.set(0,B.height*.5,0),i.rectArea[b]=_e,b++}else if(B.isPointLight){let _e=t.get(B);if(_e.color.copy(B.color).multiplyScalar(B.intensity*R),_e.distance=B.distance,_e.decay=B.decay,B.castShadow){let Te=B.shadow,Be=n.get(B);Be.shadowBias=Te.bias,Be.shadowNormalBias=Te.normalBias,Be.shadowRadius=Te.radius,Be.shadowMapSize=Te.mapSize,Be.shadowCameraNear=Te.camera.near,Be.shadowCameraFar=Te.camera.far,i.pointShadow[m]=Be,i.pointShadowMap[m]=ae,i.pointShadowMatrix[m]=B.shadow.matrix,P++}i.point[m]=_e,m++}else if(B.isHemisphereLight){let _e=t.get(B);_e.skyColor.copy(B.color).multiplyScalar(Z*R),_e.groundColor.copy(B.groundColor).multiplyScalar(Z*R),i.hemi[_]=_e,_++}}b>0&&(e.isWebGL2?s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Xe.LTC_FLOAT_1,i.rectAreaLTC2=Xe.LTC_FLOAT_2):(i.rectAreaLTC1=Xe.LTC_HALF_1,i.rectAreaLTC2=Xe.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Xe.LTC_FLOAT_1,i.rectAreaLTC2=Xe.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=Xe.LTC_HALF_1,i.rectAreaLTC2=Xe.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=f,i.ambient[1]=d,i.ambient[2]=g;let V=i.hash;(V.directionalLength!==y||V.pointLength!==m||V.spotLength!==p||V.rectAreaLength!==b||V.hemiLength!==_||V.numDirectionalShadows!==T||V.numPointShadows!==P||V.numSpotShadows!==C||V.numSpotMaps!==M||V.numLightProbes!==v)&&(i.directional.length=y,i.spot.length=p,i.rectArea.length=b,i.point.length=m,i.hemi.length=_,i.directionalShadow.length=T,i.directionalShadowMap.length=T,i.pointShadow.length=P,i.pointShadowMap.length=P,i.spotShadow.length=C,i.spotShadowMap.length=C,i.directionalShadowMatrix.length=T,i.pointShadowMatrix.length=P,i.spotLightMatrix.length=C+M-z,i.spotLightMap.length=M,i.numSpotLightShadowsWithMaps=z,i.numLightProbes=v,V.directionalLength=y,V.pointLength=m,V.spotLength=p,V.rectAreaLength=b,V.hemiLength=_,V.numDirectionalShadows=T,V.numPointShadows=P,V.numSpotShadows=C,V.numSpotMaps=M,V.numLightProbes=v,i.version=fS++)}function l(u,h){let f=0,d=0,g=0,y=0,m=0,p=h.matrixWorldInverse;for(let b=0,_=u.length;b<_;b++){let T=u[b];if(T.isDirectionalLight){let P=i.directional[f];P.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),P.direction.sub(r),P.direction.transformDirection(p),f++}else if(T.isSpotLight){let P=i.spot[g];P.position.setFromMatrixPosition(T.matrixWorld),P.position.applyMatrix4(p),P.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),P.direction.sub(r),P.direction.transformDirection(p),g++}else if(T.isRectAreaLight){let P=i.rectArea[y];P.position.setFromMatrixPosition(T.matrixWorld),P.position.applyMatrix4(p),a.identity(),o.copy(T.matrixWorld),o.premultiply(p),a.extractRotation(o),P.halfWidth.set(T.width*.5,0,0),P.halfHeight.set(0,T.height*.5,0),P.halfWidth.applyMatrix4(a),P.halfHeight.applyMatrix4(a),y++}else if(T.isPointLight){let P=i.point[d];P.position.setFromMatrixPosition(T.matrixWorld),P.position.applyMatrix4(p),d++}else if(T.isHemisphereLight){let P=i.hemi[m];P.direction.setFromMatrixPosition(T.matrixWorld),P.direction.transformDirection(p),m++}}}return{setup:c,setupView:l,state:i}}function ym(s,e){let t=new pS(s,e),n=[],i=[];function r(){n.length=0,i.length=0}function o(h){n.push(h)}function a(h){i.push(h)}function c(h){t.setup(n,h)}function l(h){t.setupView(n,h)}return{init:r,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function mS(s,e){let t=new WeakMap;function n(r,o=0){let a=t.get(r),c;return a===void 0?(c=new ym(s,e),t.set(r,[c])):o>=a.length?(c=new ym(s,e),a.push(c)):c=a[o],c}function i(){t=new WeakMap}return{get:n,dispose:i}}function yS(s,e,t){let n=new vr,i=new nt,r=new nt,o=new Ln,a=new Fh({depthPacking:uy}),c=new Bh,l={},u=t.maxTextureSize,h={[Gi]:Ui,[Ui]:Gi,[Mi]:Mi},f=new Xi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new nt},radius:{value:4}},vertexShader:gS,fragmentShader:xS}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let g=new Si;g.setAttribute("position",new Tn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new Sn(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Wm;let p=this.type;this.render=function(C,M,z){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;let v=s.getRenderTarget(),R=s.getActiveCubeFace(),V=s.getActiveMipmapLevel(),O=s.state;O.setBlending(mr),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let j=p!==Js&&this.type===Js,B=p===Js&&this.type!==Js;for(let Y=0,Z=C.length;Y<Z;Y++){let Ee=C[Y],ae=Ee.shadow;if(ae===void 0){console.warn("THREE.WebGLShadowMap:",Ee,"has no shadow.");continue}if(ae.autoUpdate===!1&&ae.needsUpdate===!1)continue;i.copy(ae.mapSize);let _e=ae.getFrameExtents();if(i.multiply(_e),r.copy(ae.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(r.x=Math.floor(u/_e.x),i.x=r.x*_e.x,ae.mapSize.x=r.x),i.y>u&&(r.y=Math.floor(u/_e.y),i.y=r.y*_e.y,ae.mapSize.y=r.y)),ae.map===null||j===!0||B===!0){let Be=this.type!==Js?{minFilter:fi,magFilter:fi}:{};ae.map!==null&&ae.map.dispose(),ae.map=new ps(i.x,i.y,Be),ae.map.texture.name=Ee.name+".shadowMap",ae.camera.updateProjectionMatrix()}s.setRenderTarget(ae.map),s.clear();let Te=ae.getViewportCount();for(let Be=0;Be<Te;Be++){let ht=ae.getViewport(Be);o.set(r.x*ht.x,r.y*ht.y,r.x*ht.z,r.y*ht.w),O.viewport(o),ae.updateMatrices(Ee,Be),n=ae.getFrustum(),T(M,z,ae.camera,Ee,this.type)}ae.isPointLightShadow!==!0&&this.type===Js&&b(ae,z),ae.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(v,R,V)};function b(C,M){let z=e.update(y);f.defines.VSM_SAMPLES!==C.blurSamples&&(f.defines.VSM_SAMPLES=C.blurSamples,d.defines.VSM_SAMPLES=C.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new ps(i.x,i.y)),f.uniforms.shadow_pass.value=C.map.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,s.setRenderTarget(C.mapPass),s.clear(),s.renderBufferDirect(M,null,z,f,y,null),d.uniforms.shadow_pass.value=C.mapPass.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,s.setRenderTarget(C.map),s.clear(),s.renderBufferDirect(M,null,z,d,y,null)}function _(C,M,z,v){let R=null,V=z.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(V!==void 0)R=V;else if(R=z.isPointLight===!0?c:a,s.localClippingEnabled&&M.clipShadows===!0&&Array.isArray(M.clippingPlanes)&&M.clippingPlanes.length!==0||M.displacementMap&&M.displacementScale!==0||M.alphaMap&&M.alphaTest>0||M.map&&M.alphaTest>0){let O=R.uuid,j=M.uuid,B=l[O];B===void 0&&(B={},l[O]=B);let Y=B[j];Y===void 0&&(Y=R.clone(),B[j]=Y,M.addEventListener("dispose",P)),R=Y}if(R.visible=M.visible,R.wireframe=M.wireframe,v===Js?R.side=M.shadowSide!==null?M.shadowSide:M.side:R.side=M.shadowSide!==null?M.shadowSide:h[M.side],R.alphaMap=M.alphaMap,R.alphaTest=M.alphaTest,R.map=M.map,R.clipShadows=M.clipShadows,R.clippingPlanes=M.clippingPlanes,R.clipIntersection=M.clipIntersection,R.displacementMap=M.displacementMap,R.displacementScale=M.displacementScale,R.displacementBias=M.displacementBias,R.wireframeLinewidth=M.wireframeLinewidth,R.linewidth=M.linewidth,z.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let O=s.properties.get(R);O.light=z}return R}function T(C,M,z,v,R){if(C.visible===!1)return;if(C.layers.test(M.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&R===Js)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,C.matrixWorld);let j=e.update(C),B=C.material;if(Array.isArray(B)){let Y=j.groups;for(let Z=0,Ee=Y.length;Z<Ee;Z++){let ae=Y[Z],_e=B[ae.materialIndex];if(_e&&_e.visible){let Te=_(C,_e,v,R);C.onBeforeShadow(s,C,M,z,j,Te,ae),s.renderBufferDirect(z,null,j,Te,C,ae),C.onAfterShadow(s,C,M,z,j,Te,ae)}}}else if(B.visible){let Y=_(C,B,v,R);C.onBeforeShadow(s,C,M,z,j,Y,null),s.renderBufferDirect(z,null,j,Y,C,null),C.onAfterShadow(s,C,M,z,j,Y,null)}}let O=C.children;for(let j=0,B=O.length;j<B;j++)T(O[j],M,z,v,R)}function P(C){C.target.removeEventListener("dispose",P);for(let z in l){let v=l[z],R=C.target.uuid;R in v&&(v[R].dispose(),delete v[R])}}}function _S(s,e,t){let n=t.isWebGL2;function i(){let H=!1,Ye=new Ln,je=null,Wt=new Ln(0,0,0,0);return{setMask:function(Bt){je!==Bt&&!H&&(s.colorMask(Bt,Bt,Bt,Bt),je=Bt)},setLocked:function(Bt){H=Bt},setClear:function(Bt,bn,yn,Jn,$n){$n===!0&&(Bt*=Jn,bn*=Jn,yn*=Jn),Ye.set(Bt,bn,yn,Jn),Wt.equals(Ye)===!1&&(s.clearColor(Bt,bn,yn,Jn),Wt.copy(Ye))},reset:function(){H=!1,je=null,Wt.set(-1,0,0,0)}}}function r(){let H=!1,Ye=null,je=null,Wt=null;return{setTest:function(Bt){Bt?$t(s.DEPTH_TEST):Gt(s.DEPTH_TEST)},setMask:function(Bt){Ye!==Bt&&!H&&(s.depthMask(Bt),Ye=Bt)},setFunc:function(Bt){if(je!==Bt){switch(Bt){case kx:s.depthFunc(s.NEVER);break;case zx:s.depthFunc(s.ALWAYS);break;case Hx:s.depthFunc(s.LESS);break;case nl:s.depthFunc(s.LEQUAL);break;case Vx:s.depthFunc(s.EQUAL);break;case Gx:s.depthFunc(s.GEQUAL);break;case lf:s.depthFunc(s.GREATER);break;case Wx:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}je=Bt}},setLocked:function(Bt){H=Bt},setClear:function(Bt){Wt!==Bt&&(s.clearDepth(Bt),Wt=Bt)},reset:function(){H=!1,Ye=null,je=null,Wt=null}}}function o(){let H=!1,Ye=null,je=null,Wt=null,Bt=null,bn=null,yn=null,Jn=null,$n=null;return{setTest:function(an){H||(an?$t(s.STENCIL_TEST):Gt(s.STENCIL_TEST))},setMask:function(an){Ye!==an&&!H&&(s.stencilMask(an),Ye=an)},setFunc:function(an,En,Bi){(je!==an||Wt!==En||Bt!==Bi)&&(s.stencilFunc(an,En,Bi),je=an,Wt=En,Bt=Bi)},setOp:function(an,En,Bi){(bn!==an||yn!==En||Jn!==Bi)&&(s.stencilOp(an,En,Bi),bn=an,yn=En,Jn=Bi)},setLocked:function(an){H=an},setClear:function(an){$n!==an&&(s.clearStencil(an),$n=an)},reset:function(){H=!1,Ye=null,je=null,Wt=null,Bt=null,bn=null,yn=null,Jn=null,$n=null}}}let a=new i,c=new r,l=new o,u=new WeakMap,h=new WeakMap,f={},d={},g=new WeakMap,y=[],m=null,p=!1,b=null,_=null,T=null,P=null,C=null,M=null,z=null,v=new It(0,0,0),R=0,V=!1,O=null,j=null,B=null,Y=null,Z=null,Ee=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),ae=!1,_e=0,Te=s.getParameter(s.VERSION);Te.indexOf("WebGL")!==-1?(_e=parseFloat(/^WebGL (\d)/.exec(Te)[1]),ae=_e>=1):Te.indexOf("OpenGL ES")!==-1&&(_e=parseFloat(/^OpenGL ES (\d)/.exec(Te)[1]),ae=_e>=2);let Be=null,ht={},he=s.getParameter(s.SCISSOR_BOX),Ue=s.getParameter(s.VIEWPORT),Qe=new Ln().fromArray(he),Tt=new Ln().fromArray(Ue);function wt(H,Ye,je,Wt){let Bt=new Uint8Array(4),bn=s.createTexture();s.bindTexture(H,bn),s.texParameteri(H,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(H,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let yn=0;yn<je;yn++)n&&(H===s.TEXTURE_3D||H===s.TEXTURE_2D_ARRAY)?s.texImage3D(Ye,0,s.RGBA,1,1,Wt,0,s.RGBA,s.UNSIGNED_BYTE,Bt):s.texImage2D(Ye+yn,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Bt);return bn}let jt={};jt[s.TEXTURE_2D]=wt(s.TEXTURE_2D,s.TEXTURE_2D,1),jt[s.TEXTURE_CUBE_MAP]=wt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(jt[s.TEXTURE_2D_ARRAY]=wt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),jt[s.TEXTURE_3D]=wt(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),c.setClear(1),l.setClear(0),$t(s.DEPTH_TEST),c.setFunc(nl),Ut(!1),N($d),$t(s.CULL_FACE),ot(mr);function $t(H){f[H]!==!0&&(s.enable(H),f[H]=!0)}function Gt(H){f[H]!==!1&&(s.disable(H),f[H]=!1)}function xn(H,Ye){return d[H]!==Ye?(s.bindFramebuffer(H,Ye),d[H]=Ye,n&&(H===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=Ye),H===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=Ye)),!0):!1}function re(H,Ye){let je=y,Wt=!1;if(H)if(je=g.get(Ye),je===void 0&&(je=[],g.set(Ye,je)),H.isWebGLMultipleRenderTargets){let Bt=H.texture;if(je.length!==Bt.length||je[0]!==s.COLOR_ATTACHMENT0){for(let bn=0,yn=Bt.length;bn<yn;bn++)je[bn]=s.COLOR_ATTACHMENT0+bn;je.length=Bt.length,Wt=!0}}else je[0]!==s.COLOR_ATTACHMENT0&&(je[0]=s.COLOR_ATTACHMENT0,Wt=!0);else je[0]!==s.BACK&&(je[0]=s.BACK,Wt=!0);Wt&&(t.isWebGL2?s.drawBuffers(je):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(je))}function Wn(H){return m!==H?(s.useProgram(H),m=H,!0):!1}let zt={[Is]:s.FUNC_ADD,[wx]:s.FUNC_SUBTRACT,[Ax]:s.FUNC_REVERSE_SUBTRACT};if(n)zt[np]=s.MIN,zt[ip]=s.MAX;else{let H=e.get("EXT_blend_minmax");H!==null&&(zt[np]=H.MIN_EXT,zt[ip]=H.MAX_EXT)}let Dt={[Ul]:s.ZERO,[Fl]:s.ONE,[Rx]:s.SRC_COLOR,[Uo]:s.SRC_ALPHA,[Dx]:s.SRC_ALPHA_SATURATE,[Lx]:s.DST_COLOR,[Px]:s.DST_ALPHA,[Cx]:s.ONE_MINUS_SRC_COLOR,[vh]:s.ONE_MINUS_SRC_ALPHA,[Nx]:s.ONE_MINUS_DST_COLOR,[Ix]:s.ONE_MINUS_DST_ALPHA,[Ux]:s.CONSTANT_COLOR,[Fx]:s.ONE_MINUS_CONSTANT_COLOR,[Bx]:s.CONSTANT_ALPHA,[Ox]:s.ONE_MINUS_CONSTANT_ALPHA};function ot(H,Ye,je,Wt,Bt,bn,yn,Jn,$n,an){if(H===mr){p===!0&&(Gt(s.BLEND),p=!1);return}if(p===!1&&($t(s.BLEND),p=!0),H!==Dl){if(H!==b||an!==V){if((_!==Is||C!==Is)&&(s.blendEquation(s.FUNC_ADD),_=Is,C=Is),an)switch(H){case Lo:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Qd:s.blendFunc(s.ONE,s.ONE);break;case ep:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case tp:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}else switch(H){case Lo:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Qd:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case ep:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case tp:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}T=null,P=null,M=null,z=null,v.set(0,0,0),R=0,b=H,V=an}return}Bt=Bt||Ye,bn=bn||je,yn=yn||Wt,(Ye!==_||Bt!==C)&&(s.blendEquationSeparate(zt[Ye],zt[Bt]),_=Ye,C=Bt),(je!==T||Wt!==P||bn!==M||yn!==z)&&(s.blendFuncSeparate(Dt[je],Dt[Wt],Dt[bn],Dt[yn]),T=je,P=Wt,M=bn,z=yn),(Jn.equals(v)===!1||$n!==R)&&(s.blendColor(Jn.r,Jn.g,Jn.b,$n),v.copy(Jn),R=$n),b=H,V=!1}function On(H,Ye){H.side===Mi?Gt(s.CULL_FACE):$t(s.CULL_FACE);let je=H.side===Ui;Ye&&(je=!je),Ut(je),H.blending===Lo&&H.transparent===!1?ot(mr):ot(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),c.setFunc(H.depthFunc),c.setTest(H.depthTest),c.setMask(H.depthWrite),a.setMask(H.colorWrite);let Wt=H.stencilWrite;l.setTest(Wt),Wt&&(l.setMask(H.stencilWriteMask),l.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),l.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),ie(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?$t(s.SAMPLE_ALPHA_TO_COVERAGE):Gt(s.SAMPLE_ALPHA_TO_COVERAGE)}function Ut(H){O!==H&&(H?s.frontFace(s.CW):s.frontFace(s.CCW),O=H)}function N(H){H!==Sx?($t(s.CULL_FACE),H!==j&&(H===$d?s.cullFace(s.BACK):H===Ex?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Gt(s.CULL_FACE),j=H}function A(H){H!==B&&(ae&&s.lineWidth(H),B=H)}function ie(H,Ye,je){H?($t(s.POLYGON_OFFSET_FILL),(Y!==Ye||Z!==je)&&(s.polygonOffset(Ye,je),Y=Ye,Z=je)):Gt(s.POLYGON_OFFSET_FILL)}function Ce(H){H?$t(s.SCISSOR_TEST):Gt(s.SCISSOR_TEST)}function Ie(H){H===void 0&&(H=s.TEXTURE0+Ee-1),Be!==H&&(s.activeTexture(H),Be=H)}function ke(H,Ye,je){je===void 0&&(Be===null?je=s.TEXTURE0+Ee-1:je=Be);let Wt=ht[je];Wt===void 0&&(Wt={type:void 0,texture:void 0},ht[je]=Wt),(Wt.type!==H||Wt.texture!==Ye)&&(Be!==je&&(s.activeTexture(je),Be=je),s.bindTexture(H,Ye||jt[H]),Wt.type=H,Wt.texture=Ye)}function St(){let H=ht[Be];H!==void 0&&H.type!==void 0&&(s.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function Ke(){try{s.compressedTexImage2D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function st(){try{s.compressedTexImage3D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function At(){try{s.texSubImage2D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Ht(){try{s.texSubImage3D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Fe(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Pe(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Le(){try{s.texStorage2D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function bt(){try{s.texStorage3D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Et(){try{s.texImage2D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function et(){try{s.texImage3D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Mt(H){Qe.equals(H)===!1&&(s.scissor(H.x,H.y,H.z,H.w),Qe.copy(H))}function Qt(H){Tt.equals(H)===!1&&(s.viewport(H.x,H.y,H.z,H.w),Tt.copy(H))}function kn(H,Ye){let je=h.get(Ye);je===void 0&&(je=new WeakMap,h.set(Ye,je));let Wt=je.get(H);Wt===void 0&&(Wt=s.getUniformBlockIndex(Ye,H.name),je.set(H,Wt))}function Ft(H,Ye){let Wt=h.get(Ye).get(H);u.get(Ye)!==Wt&&(s.uniformBlockBinding(Ye,Wt,H.__bindingPointIndex),u.set(Ye,Wt))}function He(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),n===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),f={},Be=null,ht={},d={},g=new WeakMap,y=[],m=null,p=!1,b=null,_=null,T=null,P=null,C=null,M=null,z=null,v=new It(0,0,0),R=0,V=!1,O=null,j=null,B=null,Y=null,Z=null,Qe.set(0,0,s.canvas.width,s.canvas.height),Tt.set(0,0,s.canvas.width,s.canvas.height),a.reset(),c.reset(),l.reset()}return{buffers:{color:a,depth:c,stencil:l},enable:$t,disable:Gt,bindFramebuffer:xn,drawBuffers:re,useProgram:Wn,setBlending:ot,setMaterial:On,setFlipSided:Ut,setCullFace:N,setLineWidth:A,setPolygonOffset:ie,setScissorTest:Ce,activeTexture:Ie,bindTexture:ke,unbindTexture:St,compressedTexImage2D:Ke,compressedTexImage3D:st,texImage2D:Et,texImage3D:et,updateUBOMapping:kn,uniformBlockBinding:Ft,texStorage2D:Le,texStorage3D:bt,texSubImage2D:At,texSubImage3D:Ht,compressedTexSubImage2D:Fe,compressedTexSubImage3D:Pe,scissor:Mt,viewport:Qt,reset:He}}function vS(s,e,t,n,i,r,o){let a=i.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap,h,f=new WeakMap,d=!1;try{d=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(N,A){return d?new OffscreenCanvas(N,A):Ba("canvas")}function y(N,A,ie,Ce){let Ie=1;if((N.width>Ce||N.height>Ce)&&(Ie=Ce/Math.max(N.width,N.height)),Ie<1||A===!0)if(typeof HTMLImageElement!="undefined"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&N instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&N instanceof ImageBitmap){let ke=A?al:Math.floor,St=ke(Ie*N.width),Ke=ke(Ie*N.height);h===void 0&&(h=g(St,Ke));let st=ie?g(St,Ke):h;return st.width=St,st.height=Ke,st.getContext("2d").drawImage(N,0,0,St,Ke),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+N.width+"x"+N.height+") to ("+St+"x"+Ke+")."),st}else return"data"in N&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+N.width+"x"+N.height+")."),N;return N}function m(N){return Th(N.width)&&Th(N.height)}function p(N){return a?!1:N.wrapS!==ns||N.wrapT!==ns||N.minFilter!==fi&&N.minFilter!==Vi}function b(N,A){return N.generateMipmaps&&A&&N.minFilter!==fi&&N.minFilter!==Vi}function _(N){s.generateMipmap(N)}function T(N,A,ie,Ce,Ie=!1){if(a===!1)return A;if(N!==null){if(s[N]!==void 0)return s[N];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let ke=A;if(A===s.RED&&(ie===s.FLOAT&&(ke=s.R32F),ie===s.HALF_FLOAT&&(ke=s.R16F),ie===s.UNSIGNED_BYTE&&(ke=s.R8)),A===s.RED_INTEGER&&(ie===s.UNSIGNED_BYTE&&(ke=s.R8UI),ie===s.UNSIGNED_SHORT&&(ke=s.R16UI),ie===s.UNSIGNED_INT&&(ke=s.R32UI),ie===s.BYTE&&(ke=s.R8I),ie===s.SHORT&&(ke=s.R16I),ie===s.INT&&(ke=s.R32I)),A===s.RG&&(ie===s.FLOAT&&(ke=s.RG32F),ie===s.HALF_FLOAT&&(ke=s.RG16F),ie===s.UNSIGNED_BYTE&&(ke=s.RG8)),A===s.RGBA){let St=Ie?sl:Mn.getTransfer(Ce);ie===s.FLOAT&&(ke=s.RGBA32F),ie===s.HALF_FLOAT&&(ke=s.RGBA16F),ie===s.UNSIGNED_BYTE&&(ke=St===Vn?s.SRGB8_ALPHA8:s.RGBA8),ie===s.UNSIGNED_SHORT_4_4_4_4&&(ke=s.RGBA4),ie===s.UNSIGNED_SHORT_5_5_5_1&&(ke=s.RGB5_A1)}return(ke===s.R16F||ke===s.R32F||ke===s.RG16F||ke===s.RG32F||ke===s.RGBA16F||ke===s.RGBA32F)&&e.get("EXT_color_buffer_float"),ke}function P(N,A,ie){return b(N,ie)===!0||N.isFramebufferTexture&&N.minFilter!==fi&&N.minFilter!==Vi?Math.log2(Math.max(A.width,A.height))+1:N.mipmaps!==void 0&&N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?A.mipmaps.length:1}function C(N){return N===fi||N===il||N===Ra?s.NEAREST:s.LINEAR}function M(N){let A=N.target;A.removeEventListener("dispose",M),v(A),A.isVideoTexture&&u.delete(A)}function z(N){let A=N.target;A.removeEventListener("dispose",z),V(A)}function v(N){let A=n.get(N);if(A.__webglInit===void 0)return;let ie=N.source,Ce=f.get(ie);if(Ce){let Ie=Ce[A.__cacheKey];Ie.usedTimes--,Ie.usedTimes===0&&R(N),Object.keys(Ce).length===0&&f.delete(ie)}n.remove(N)}function R(N){let A=n.get(N);s.deleteTexture(A.__webglTexture);let ie=N.source,Ce=f.get(ie);delete Ce[A.__cacheKey],o.memory.textures--}function V(N){let A=N.texture,ie=n.get(N),Ce=n.get(A);if(Ce.__webglTexture!==void 0&&(s.deleteTexture(Ce.__webglTexture),o.memory.textures--),N.depthTexture&&N.depthTexture.dispose(),N.isWebGLCubeRenderTarget)for(let Ie=0;Ie<6;Ie++){if(Array.isArray(ie.__webglFramebuffer[Ie]))for(let ke=0;ke<ie.__webglFramebuffer[Ie].length;ke++)s.deleteFramebuffer(ie.__webglFramebuffer[Ie][ke]);else s.deleteFramebuffer(ie.__webglFramebuffer[Ie]);ie.__webglDepthbuffer&&s.deleteRenderbuffer(ie.__webglDepthbuffer[Ie])}else{if(Array.isArray(ie.__webglFramebuffer))for(let Ie=0;Ie<ie.__webglFramebuffer.length;Ie++)s.deleteFramebuffer(ie.__webglFramebuffer[Ie]);else s.deleteFramebuffer(ie.__webglFramebuffer);if(ie.__webglDepthbuffer&&s.deleteRenderbuffer(ie.__webglDepthbuffer),ie.__webglMultisampledFramebuffer&&s.deleteFramebuffer(ie.__webglMultisampledFramebuffer),ie.__webglColorRenderbuffer)for(let Ie=0;Ie<ie.__webglColorRenderbuffer.length;Ie++)ie.__webglColorRenderbuffer[Ie]&&s.deleteRenderbuffer(ie.__webglColorRenderbuffer[Ie]);ie.__webglDepthRenderbuffer&&s.deleteRenderbuffer(ie.__webglDepthRenderbuffer)}if(N.isWebGLMultipleRenderTargets)for(let Ie=0,ke=A.length;Ie<ke;Ie++){let St=n.get(A[Ie]);St.__webglTexture&&(s.deleteTexture(St.__webglTexture),o.memory.textures--),n.remove(A[Ie])}n.remove(A),n.remove(N)}let O=0;function j(){O=0}function B(){let N=O;return N>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+N+" texture units while this GPU supports only "+i.maxTextures),O+=1,N}function Y(N){let A=[];return A.push(N.wrapS),A.push(N.wrapT),A.push(N.wrapR||0),A.push(N.magFilter),A.push(N.minFilter),A.push(N.anisotropy),A.push(N.internalFormat),A.push(N.format),A.push(N.type),A.push(N.generateMipmaps),A.push(N.premultiplyAlpha),A.push(N.flipY),A.push(N.unpackAlignment),A.push(N.colorSpace),A.join()}function Z(N,A){let ie=n.get(N);if(N.isVideoTexture&&On(N),N.isRenderTargetTexture===!1&&N.version>0&&ie.__version!==N.version){let Ce=N.image;if(Ce===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Ce.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Qe(ie,N,A);return}}t.bindTexture(s.TEXTURE_2D,ie.__webglTexture,s.TEXTURE0+A)}function Ee(N,A){let ie=n.get(N);if(N.version>0&&ie.__version!==N.version){Qe(ie,N,A);return}t.bindTexture(s.TEXTURE_2D_ARRAY,ie.__webglTexture,s.TEXTURE0+A)}function ae(N,A){let ie=n.get(N);if(N.version>0&&ie.__version!==N.version){Qe(ie,N,A);return}t.bindTexture(s.TEXTURE_3D,ie.__webglTexture,s.TEXTURE0+A)}function _e(N,A){let ie=n.get(N);if(N.version>0&&ie.__version!==N.version){Tt(ie,N,A);return}t.bindTexture(s.TEXTURE_CUBE_MAP,ie.__webglTexture,s.TEXTURE0+A)}let Te={[jr]:s.REPEAT,[ns]:s.CLAMP_TO_EDGE,[Ua]:s.MIRRORED_REPEAT},Be={[fi]:s.NEAREST,[il]:s.NEAREST_MIPMAP_NEAREST,[Ra]:s.NEAREST_MIPMAP_LINEAR,[Vi]:s.LINEAR,[uf]:s.LINEAR_MIPMAP_NEAREST,[yr]:s.LINEAR_MIPMAP_LINEAR},ht={[fy]:s.NEVER,[yy]:s.ALWAYS,[dy]:s.LESS,[i0]:s.LEQUAL,[py]:s.EQUAL,[xy]:s.GEQUAL,[my]:s.GREATER,[gy]:s.NOTEQUAL};function he(N,A,ie){if(ie?(s.texParameteri(N,s.TEXTURE_WRAP_S,Te[A.wrapS]),s.texParameteri(N,s.TEXTURE_WRAP_T,Te[A.wrapT]),(N===s.TEXTURE_3D||N===s.TEXTURE_2D_ARRAY)&&s.texParameteri(N,s.TEXTURE_WRAP_R,Te[A.wrapR]),s.texParameteri(N,s.TEXTURE_MAG_FILTER,Be[A.magFilter]),s.texParameteri(N,s.TEXTURE_MIN_FILTER,Be[A.minFilter])):(s.texParameteri(N,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(N,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(N===s.TEXTURE_3D||N===s.TEXTURE_2D_ARRAY)&&s.texParameteri(N,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(A.wrapS!==ns||A.wrapT!==ns)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(N,s.TEXTURE_MAG_FILTER,C(A.magFilter)),s.texParameteri(N,s.TEXTURE_MIN_FILTER,C(A.minFilter)),A.minFilter!==fi&&A.minFilter!==Vi&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),A.compareFunction&&(s.texParameteri(N,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(N,s.TEXTURE_COMPARE_FUNC,ht[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){let Ce=e.get("EXT_texture_filter_anisotropic");if(A.magFilter===fi||A.minFilter!==Ra&&A.minFilter!==yr||A.type===Ns&&e.has("OES_texture_float_linear")===!1||a===!1&&A.type===Zr&&e.has("OES_texture_half_float_linear")===!1)return;(A.anisotropy>1||n.get(A).__currentAnisotropy)&&(s.texParameterf(N,Ce.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,i.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy)}}function Ue(N,A){let ie=!1;N.__webglInit===void 0&&(N.__webglInit=!0,A.addEventListener("dispose",M));let Ce=A.source,Ie=f.get(Ce);Ie===void 0&&(Ie={},f.set(Ce,Ie));let ke=Y(A);if(ke!==N.__cacheKey){Ie[ke]===void 0&&(Ie[ke]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,ie=!0),Ie[ke].usedTimes++;let St=Ie[N.__cacheKey];St!==void 0&&(Ie[N.__cacheKey].usedTimes--,St.usedTimes===0&&R(A)),N.__cacheKey=ke,N.__webglTexture=Ie[ke].texture}return ie}function Qe(N,A,ie){let Ce=s.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(Ce=s.TEXTURE_2D_ARRAY),A.isData3DTexture&&(Ce=s.TEXTURE_3D);let Ie=Ue(N,A),ke=A.source;t.bindTexture(Ce,N.__webglTexture,s.TEXTURE0+ie);let St=n.get(ke);if(ke.version!==St.__version||Ie===!0){t.activeTexture(s.TEXTURE0+ie);let Ke=Mn.getPrimaries(Mn.workingColorSpace),st=A.colorSpace===ds?null:Mn.getPrimaries(A.colorSpace),At=A.colorSpace===ds||Ke===st?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,A.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,A.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,At);let Ht=p(A)&&m(A.image)===!1,Fe=y(A.image,Ht,!1,i.maxTextureSize);Fe=Ut(A,Fe);let Pe=m(Fe)||a,Le=r.convert(A.format,A.colorSpace),bt=r.convert(A.type),Et=T(A.internalFormat,Le,bt,A.colorSpace,A.isVideoTexture);he(Ce,A,Pe);let et,Mt=A.mipmaps,Qt=a&&A.isVideoTexture!==!0&&Et!==Qm,kn=St.__version===void 0||Ie===!0,Ft=P(A,Fe,Pe);if(A.isDepthTexture)Et=s.DEPTH_COMPONENT,a?A.type===Ns?Et=s.DEPTH_COMPONENT32F:A.type===dr?Et=s.DEPTH_COMPONENT24:A.type===Xr?Et=s.DEPTH24_STENCIL8:Et=s.DEPTH_COMPONENT16:A.type===Ns&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),A.format===qr&&Et===s.DEPTH_COMPONENT&&A.type!==hf&&A.type!==dr&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),A.type=dr,bt=r.convert(A.type)),A.format===Oo&&Et===s.DEPTH_COMPONENT&&(Et=s.DEPTH_STENCIL,A.type!==Xr&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),A.type=Xr,bt=r.convert(A.type))),kn&&(Qt?t.texStorage2D(s.TEXTURE_2D,1,Et,Fe.width,Fe.height):t.texImage2D(s.TEXTURE_2D,0,Et,Fe.width,Fe.height,0,Le,bt,null));else if(A.isDataTexture)if(Mt.length>0&&Pe){Qt&&kn&&t.texStorage2D(s.TEXTURE_2D,Ft,Et,Mt[0].width,Mt[0].height);for(let He=0,H=Mt.length;He<H;He++)et=Mt[He],Qt?t.texSubImage2D(s.TEXTURE_2D,He,0,0,et.width,et.height,Le,bt,et.data):t.texImage2D(s.TEXTURE_2D,He,Et,et.width,et.height,0,Le,bt,et.data);A.generateMipmaps=!1}else Qt?(kn&&t.texStorage2D(s.TEXTURE_2D,Ft,Et,Fe.width,Fe.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,Fe.width,Fe.height,Le,bt,Fe.data)):t.texImage2D(s.TEXTURE_2D,0,Et,Fe.width,Fe.height,0,Le,bt,Fe.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){Qt&&kn&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ft,Et,Mt[0].width,Mt[0].height,Fe.depth);for(let He=0,H=Mt.length;He<H;He++)et=Mt[He],A.format!==is?Le!==null?Qt?t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,He,0,0,0,et.width,et.height,Fe.depth,Le,et.data,0,0):t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,He,Et,et.width,et.height,Fe.depth,0,et.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Qt?t.texSubImage3D(s.TEXTURE_2D_ARRAY,He,0,0,0,et.width,et.height,Fe.depth,Le,bt,et.data):t.texImage3D(s.TEXTURE_2D_ARRAY,He,Et,et.width,et.height,Fe.depth,0,Le,bt,et.data)}else{Qt&&kn&&t.texStorage2D(s.TEXTURE_2D,Ft,Et,Mt[0].width,Mt[0].height);for(let He=0,H=Mt.length;He<H;He++)et=Mt[He],A.format!==is?Le!==null?Qt?t.compressedTexSubImage2D(s.TEXTURE_2D,He,0,0,et.width,et.height,Le,et.data):t.compressedTexImage2D(s.TEXTURE_2D,He,Et,et.width,et.height,0,et.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Qt?t.texSubImage2D(s.TEXTURE_2D,He,0,0,et.width,et.height,Le,bt,et.data):t.texImage2D(s.TEXTURE_2D,He,Et,et.width,et.height,0,Le,bt,et.data)}else if(A.isDataArrayTexture)Qt?(kn&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ft,Et,Fe.width,Fe.height,Fe.depth),t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Fe.width,Fe.height,Fe.depth,Le,bt,Fe.data)):t.texImage3D(s.TEXTURE_2D_ARRAY,0,Et,Fe.width,Fe.height,Fe.depth,0,Le,bt,Fe.data);else if(A.isData3DTexture)Qt?(kn&&t.texStorage3D(s.TEXTURE_3D,Ft,Et,Fe.width,Fe.height,Fe.depth),t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Fe.width,Fe.height,Fe.depth,Le,bt,Fe.data)):t.texImage3D(s.TEXTURE_3D,0,Et,Fe.width,Fe.height,Fe.depth,0,Le,bt,Fe.data);else if(A.isFramebufferTexture){if(kn)if(Qt)t.texStorage2D(s.TEXTURE_2D,Ft,Et,Fe.width,Fe.height);else{let He=Fe.width,H=Fe.height;for(let Ye=0;Ye<Ft;Ye++)t.texImage2D(s.TEXTURE_2D,Ye,Et,He,H,0,Le,bt,null),He>>=1,H>>=1}}else if(Mt.length>0&&Pe){Qt&&kn&&t.texStorage2D(s.TEXTURE_2D,Ft,Et,Mt[0].width,Mt[0].height);for(let He=0,H=Mt.length;He<H;He++)et=Mt[He],Qt?t.texSubImage2D(s.TEXTURE_2D,He,0,0,Le,bt,et):t.texImage2D(s.TEXTURE_2D,He,Et,Le,bt,et);A.generateMipmaps=!1}else Qt?(kn&&t.texStorage2D(s.TEXTURE_2D,Ft,Et,Fe.width,Fe.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,Le,bt,Fe)):t.texImage2D(s.TEXTURE_2D,0,Et,Le,bt,Fe);b(A,Pe)&&_(Ce),St.__version=ke.version,A.onUpdate&&A.onUpdate(A)}N.__version=A.version}function Tt(N,A,ie){if(A.image.length!==6)return;let Ce=Ue(N,A),Ie=A.source;t.bindTexture(s.TEXTURE_CUBE_MAP,N.__webglTexture,s.TEXTURE0+ie);let ke=n.get(Ie);if(Ie.version!==ke.__version||Ce===!0){t.activeTexture(s.TEXTURE0+ie);let St=Mn.getPrimaries(Mn.workingColorSpace),Ke=A.colorSpace===ds?null:Mn.getPrimaries(A.colorSpace),st=A.colorSpace===ds||St===Ke?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,A.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,A.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,st);let At=A.isCompressedTexture||A.image[0].isCompressedTexture,Ht=A.image[0]&&A.image[0].isDataTexture,Fe=[];for(let He=0;He<6;He++)!At&&!Ht?Fe[He]=y(A.image[He],!1,!0,i.maxCubemapSize):Fe[He]=Ht?A.image[He].image:A.image[He],Fe[He]=Ut(A,Fe[He]);let Pe=Fe[0],Le=m(Pe)||a,bt=r.convert(A.format,A.colorSpace),Et=r.convert(A.type),et=T(A.internalFormat,bt,Et,A.colorSpace),Mt=a&&A.isVideoTexture!==!0,Qt=ke.__version===void 0||Ce===!0,kn=P(A,Pe,Le);he(s.TEXTURE_CUBE_MAP,A,Le);let Ft;if(At){Mt&&Qt&&t.texStorage2D(s.TEXTURE_CUBE_MAP,kn,et,Pe.width,Pe.height);for(let He=0;He<6;He++){Ft=Fe[He].mipmaps;for(let H=0;H<Ft.length;H++){let Ye=Ft[H];A.format!==is?bt!==null?Mt?t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+He,H,0,0,Ye.width,Ye.height,bt,Ye.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+He,H,et,Ye.width,Ye.height,0,Ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Mt?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+He,H,0,0,Ye.width,Ye.height,bt,Et,Ye.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+He,H,et,Ye.width,Ye.height,0,bt,Et,Ye.data)}}}else{Ft=A.mipmaps,Mt&&Qt&&(Ft.length>0&&kn++,t.texStorage2D(s.TEXTURE_CUBE_MAP,kn,et,Fe[0].width,Fe[0].height));for(let He=0;He<6;He++)if(Ht){Mt?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+He,0,0,0,Fe[He].width,Fe[He].height,bt,Et,Fe[He].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+He,0,et,Fe[He].width,Fe[He].height,0,bt,Et,Fe[He].data);for(let H=0;H<Ft.length;H++){let je=Ft[H].image[He].image;Mt?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+He,H+1,0,0,je.width,je.height,bt,Et,je.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+He,H+1,et,je.width,je.height,0,bt,Et,je.data)}}else{Mt?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+He,0,0,0,bt,Et,Fe[He]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+He,0,et,bt,Et,Fe[He]);for(let H=0;H<Ft.length;H++){let Ye=Ft[H];Mt?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+He,H+1,0,0,bt,Et,Ye.image[He]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+He,H+1,et,bt,Et,Ye.image[He])}}}b(A,Le)&&_(s.TEXTURE_CUBE_MAP),ke.__version=Ie.version,A.onUpdate&&A.onUpdate(A)}N.__version=A.version}function wt(N,A,ie,Ce,Ie,ke){let St=r.convert(ie.format,ie.colorSpace),Ke=r.convert(ie.type),st=T(ie.internalFormat,St,Ke,ie.colorSpace);if(!n.get(A).__hasExternalTextures){let Ht=Math.max(1,A.width>>ke),Fe=Math.max(1,A.height>>ke);Ie===s.TEXTURE_3D||Ie===s.TEXTURE_2D_ARRAY?t.texImage3D(Ie,ke,st,Ht,Fe,A.depth,0,St,Ke,null):t.texImage2D(Ie,ke,st,Ht,Fe,0,St,Ke,null)}t.bindFramebuffer(s.FRAMEBUFFER,N),ot(A)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Ce,Ie,n.get(ie).__webglTexture,0,Dt(A)):(Ie===s.TEXTURE_2D||Ie>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Ie<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,Ce,Ie,n.get(ie).__webglTexture,ke),t.bindFramebuffer(s.FRAMEBUFFER,null)}function jt(N,A,ie){if(s.bindRenderbuffer(s.RENDERBUFFER,N),A.depthBuffer&&!A.stencilBuffer){let Ce=a===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(ie||ot(A)){let Ie=A.depthTexture;Ie&&Ie.isDepthTexture&&(Ie.type===Ns?Ce=s.DEPTH_COMPONENT32F:Ie.type===dr&&(Ce=s.DEPTH_COMPONENT24));let ke=Dt(A);ot(A)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ke,Ce,A.width,A.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,ke,Ce,A.width,A.height)}else s.renderbufferStorage(s.RENDERBUFFER,Ce,A.width,A.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,N)}else if(A.depthBuffer&&A.stencilBuffer){let Ce=Dt(A);ie&&ot(A)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ce,s.DEPTH24_STENCIL8,A.width,A.height):ot(A)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ce,s.DEPTH24_STENCIL8,A.width,A.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,A.width,A.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,N)}else{let Ce=A.isWebGLMultipleRenderTargets===!0?A.texture:[A.texture];for(let Ie=0;Ie<Ce.length;Ie++){let ke=Ce[Ie],St=r.convert(ke.format,ke.colorSpace),Ke=r.convert(ke.type),st=T(ke.internalFormat,St,Ke,ke.colorSpace),At=Dt(A);ie&&ot(A)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,At,st,A.width,A.height):ot(A)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,At,st,A.width,A.height):s.renderbufferStorage(s.RENDERBUFFER,st,A.width,A.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function $t(N,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,N),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(A.depthTexture).__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),Z(A.depthTexture,0);let Ce=n.get(A.depthTexture).__webglTexture,Ie=Dt(A);if(A.depthTexture.format===qr)ot(A)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Ce,0,Ie):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Ce,0);else if(A.depthTexture.format===Oo)ot(A)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Ce,0,Ie):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Ce,0);else throw new Error("Unknown depthTexture format")}function Gt(N){let A=n.get(N),ie=N.isWebGLCubeRenderTarget===!0;if(N.depthTexture&&!A.__autoAllocateDepthBuffer){if(ie)throw new Error("target.depthTexture not supported in Cube render targets");$t(A.__webglFramebuffer,N)}else if(ie){A.__webglDepthbuffer=[];for(let Ce=0;Ce<6;Ce++)t.bindFramebuffer(s.FRAMEBUFFER,A.__webglFramebuffer[Ce]),A.__webglDepthbuffer[Ce]=s.createRenderbuffer(),jt(A.__webglDepthbuffer[Ce],N,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer=s.createRenderbuffer(),jt(A.__webglDepthbuffer,N,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function xn(N,A,ie){let Ce=n.get(N);A!==void 0&&wt(Ce.__webglFramebuffer,N,N.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),ie!==void 0&&Gt(N)}function re(N){let A=N.texture,ie=n.get(N),Ce=n.get(A);N.addEventListener("dispose",z),N.isWebGLMultipleRenderTargets!==!0&&(Ce.__webglTexture===void 0&&(Ce.__webglTexture=s.createTexture()),Ce.__version=A.version,o.memory.textures++);let Ie=N.isWebGLCubeRenderTarget===!0,ke=N.isWebGLMultipleRenderTargets===!0,St=m(N)||a;if(Ie){ie.__webglFramebuffer=[];for(let Ke=0;Ke<6;Ke++)if(a&&A.mipmaps&&A.mipmaps.length>0){ie.__webglFramebuffer[Ke]=[];for(let st=0;st<A.mipmaps.length;st++)ie.__webglFramebuffer[Ke][st]=s.createFramebuffer()}else ie.__webglFramebuffer[Ke]=s.createFramebuffer()}else{if(a&&A.mipmaps&&A.mipmaps.length>0){ie.__webglFramebuffer=[];for(let Ke=0;Ke<A.mipmaps.length;Ke++)ie.__webglFramebuffer[Ke]=s.createFramebuffer()}else ie.__webglFramebuffer=s.createFramebuffer();if(ke)if(i.drawBuffers){let Ke=N.texture;for(let st=0,At=Ke.length;st<At;st++){let Ht=n.get(Ke[st]);Ht.__webglTexture===void 0&&(Ht.__webglTexture=s.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&N.samples>0&&ot(N)===!1){let Ke=ke?A:[A];ie.__webglMultisampledFramebuffer=s.createFramebuffer(),ie.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,ie.__webglMultisampledFramebuffer);for(let st=0;st<Ke.length;st++){let At=Ke[st];ie.__webglColorRenderbuffer[st]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,ie.__webglColorRenderbuffer[st]);let Ht=r.convert(At.format,At.colorSpace),Fe=r.convert(At.type),Pe=T(At.internalFormat,Ht,Fe,At.colorSpace,N.isXRRenderTarget===!0),Le=Dt(N);s.renderbufferStorageMultisample(s.RENDERBUFFER,Le,Pe,N.width,N.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+st,s.RENDERBUFFER,ie.__webglColorRenderbuffer[st])}s.bindRenderbuffer(s.RENDERBUFFER,null),N.depthBuffer&&(ie.__webglDepthRenderbuffer=s.createRenderbuffer(),jt(ie.__webglDepthRenderbuffer,N,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(Ie){t.bindTexture(s.TEXTURE_CUBE_MAP,Ce.__webglTexture),he(s.TEXTURE_CUBE_MAP,A,St);for(let Ke=0;Ke<6;Ke++)if(a&&A.mipmaps&&A.mipmaps.length>0)for(let st=0;st<A.mipmaps.length;st++)wt(ie.__webglFramebuffer[Ke][st],N,A,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Ke,st);else wt(ie.__webglFramebuffer[Ke],N,A,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Ke,0);b(A,St)&&_(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ke){let Ke=N.texture;for(let st=0,At=Ke.length;st<At;st++){let Ht=Ke[st],Fe=n.get(Ht);t.bindTexture(s.TEXTURE_2D,Fe.__webglTexture),he(s.TEXTURE_2D,Ht,St),wt(ie.__webglFramebuffer,N,Ht,s.COLOR_ATTACHMENT0+st,s.TEXTURE_2D,0),b(Ht,St)&&_(s.TEXTURE_2D)}t.unbindTexture()}else{let Ke=s.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(a?Ke=N.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(Ke,Ce.__webglTexture),he(Ke,A,St),a&&A.mipmaps&&A.mipmaps.length>0)for(let st=0;st<A.mipmaps.length;st++)wt(ie.__webglFramebuffer[st],N,A,s.COLOR_ATTACHMENT0,Ke,st);else wt(ie.__webglFramebuffer,N,A,s.COLOR_ATTACHMENT0,Ke,0);b(A,St)&&_(Ke),t.unbindTexture()}N.depthBuffer&&Gt(N)}function Wn(N){let A=m(N)||a,ie=N.isWebGLMultipleRenderTargets===!0?N.texture:[N.texture];for(let Ce=0,Ie=ie.length;Ce<Ie;Ce++){let ke=ie[Ce];if(b(ke,A)){let St=N.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,Ke=n.get(ke).__webglTexture;t.bindTexture(St,Ke),_(St),t.unbindTexture()}}}function zt(N){if(a&&N.samples>0&&ot(N)===!1){let A=N.isWebGLMultipleRenderTargets?N.texture:[N.texture],ie=N.width,Ce=N.height,Ie=s.COLOR_BUFFER_BIT,ke=[],St=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ke=n.get(N),st=N.isWebGLMultipleRenderTargets===!0;if(st)for(let At=0;At<A.length;At++)t.bindFramebuffer(s.FRAMEBUFFER,Ke.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+At,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Ke.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+At,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Ke.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ke.__webglFramebuffer);for(let At=0;At<A.length;At++){ke.push(s.COLOR_ATTACHMENT0+At),N.depthBuffer&&ke.push(St);let Ht=Ke.__ignoreDepthValues!==void 0?Ke.__ignoreDepthValues:!1;if(Ht===!1&&(N.depthBuffer&&(Ie|=s.DEPTH_BUFFER_BIT),N.stencilBuffer&&(Ie|=s.STENCIL_BUFFER_BIT)),st&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ke.__webglColorRenderbuffer[At]),Ht===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[St]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[St])),st){let Fe=n.get(A[At]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Fe,0)}s.blitFramebuffer(0,0,ie,Ce,0,0,ie,Ce,Ie,s.NEAREST),l&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,ke)}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),st)for(let At=0;At<A.length;At++){t.bindFramebuffer(s.FRAMEBUFFER,Ke.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+At,s.RENDERBUFFER,Ke.__webglColorRenderbuffer[At]);let Ht=n.get(A[At]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Ke.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+At,s.TEXTURE_2D,Ht,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ke.__webglMultisampledFramebuffer)}}function Dt(N){return Math.min(i.maxSamples,N.samples)}function ot(N){let A=n.get(N);return a&&N.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function On(N){let A=o.render.frame;u.get(N)!==A&&(u.set(N,A),N.update())}function Ut(N,A){let ie=N.colorSpace,Ce=N.format,Ie=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||N.format===Eh||ie!==mi&&ie!==ds&&(Mn.getTransfer(ie)===Vn?a===!1?e.has("EXT_sRGB")===!0&&Ce===is?(N.format=Eh,N.minFilter=Vi,N.generateMipmaps=!1):A=cl.sRGBToLinear(A):(Ce!==is||Ie!==xr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",ie)),A}this.allocateTextureUnit=B,this.resetTextureUnits=j,this.setTexture2D=Z,this.setTexture2DArray=Ee,this.setTexture3D=ae,this.setTextureCube=_e,this.rebindTextures=xn,this.setupRenderTarget=re,this.updateRenderTargetMipmap=Wn,this.updateMultisampleRenderTarget=zt,this.setupDepthRenderbuffer=Gt,this.setupFrameBufferTexture=wt,this.useMultisampledRTT=ot}function bS(s,e,t){let n=t.isWebGL2;function i(r,o=ds){let a,c=Mn.getTransfer(o);if(r===xr)return s.UNSIGNED_BYTE;if(r===jm)return s.UNSIGNED_SHORT_4_4_4_4;if(r===Zm)return s.UNSIGNED_SHORT_5_5_5_1;if(r===ey)return s.BYTE;if(r===ty)return s.SHORT;if(r===hf)return s.UNSIGNED_SHORT;if(r===Ym)return s.INT;if(r===dr)return s.UNSIGNED_INT;if(r===Ns)return s.FLOAT;if(r===Zr)return n?s.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===ny)return s.ALPHA;if(r===is)return s.RGBA;if(r===iy)return s.LUMINANCE;if(r===sy)return s.LUMINANCE_ALPHA;if(r===qr)return s.DEPTH_COMPONENT;if(r===Oo)return s.DEPTH_STENCIL;if(r===Eh)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===ry)return s.RED;if(r===Km)return s.RED_INTEGER;if(r===oy)return s.RG;if(r===Jm)return s.RG_INTEGER;if(r===$m)return s.RGBA_INTEGER;if(r===Fu||r===Bu||r===Ou||r===ku)if(c===Vn)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===Fu)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Bu)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Ou)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===ku)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===Fu)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Bu)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Ou)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===ku)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===rp||r===op||r===ap||r===cp)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===rp)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===op)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===ap)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===cp)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Qm)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===lp||r===up)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(r===lp)return c===Vn?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===up)return c===Vn?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===hp||r===fp||r===dp||r===pp||r===mp||r===gp||r===xp||r===yp||r===_p||r===vp||r===bp||r===Mp||r===Sp||r===Ep)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(r===hp)return c===Vn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===fp)return c===Vn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===dp)return c===Vn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===pp)return c===Vn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===mp)return c===Vn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===gp)return c===Vn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===xp)return c===Vn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===yp)return c===Vn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===_p)return c===Vn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===vp)return c===Vn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===bp)return c===Vn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Mp)return c===Vn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Sp)return c===Vn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Ep)return c===Vn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===zu||r===Tp||r===wp)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(r===zu)return c===Vn?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Tp)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===wp)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===ay||r===Ap||r===Rp||r===Cp)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(r===zu)return a.COMPRESSED_RED_RGTC1_EXT;if(r===Ap)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Rp)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Cp)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Xr?n?s.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):s[r]!==void 0?s[r]:null}return{convert:i}}function SS(s,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,o0(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,b,_,T){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,T)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),y(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,b,_):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ui&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ui&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let b=e.get(p).envMap;if(b&&(m.envMap.value=b,m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;let _=s._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*_,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,b,_){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=_*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ui&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function y(m,p){let b=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function ES(s,e,t,n){let i={},r={},o=[],a=t.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(b,_){let T=_.program;n.uniformBlockBinding(b,T)}function l(b,_){let T=i[b.id];T===void 0&&(g(b),T=u(b),i[b.id]=T,b.addEventListener("dispose",m));let P=_.program;n.updateUBOMapping(b,P);let C=e.render.frame;r[b.id]!==C&&(f(b),r[b.id]=C)}function u(b){let _=h();b.__bindingPointIndex=_;let T=s.createBuffer(),P=b.__size,C=b.usage;return s.bindBuffer(s.UNIFORM_BUFFER,T),s.bufferData(s.UNIFORM_BUFFER,P,C),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,_,T),T}function h(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){let _=i[b.id],T=b.uniforms,P=b.__cache;s.bindBuffer(s.UNIFORM_BUFFER,_);for(let C=0,M=T.length;C<M;C++){let z=Array.isArray(T[C])?T[C]:[T[C]];for(let v=0,R=z.length;v<R;v++){let V=z[v];if(d(V,C,v,P)===!0){let O=V.__offset,j=Array.isArray(V.value)?V.value:[V.value],B=0;for(let Y=0;Y<j.length;Y++){let Z=j[Y],Ee=y(Z);typeof Z=="number"||typeof Z=="boolean"?(V.__data[0]=Z,s.bufferSubData(s.UNIFORM_BUFFER,O+B,V.__data)):Z.isMatrix3?(V.__data[0]=Z.elements[0],V.__data[1]=Z.elements[1],V.__data[2]=Z.elements[2],V.__data[3]=0,V.__data[4]=Z.elements[3],V.__data[5]=Z.elements[4],V.__data[6]=Z.elements[5],V.__data[7]=0,V.__data[8]=Z.elements[6],V.__data[9]=Z.elements[7],V.__data[10]=Z.elements[8],V.__data[11]=0):(Z.toArray(V.__data,B),B+=Ee.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,O,V.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function d(b,_,T,P){let C=b.value,M=_+"_"+T;if(P[M]===void 0)return typeof C=="number"||typeof C=="boolean"?P[M]=C:P[M]=C.clone(),!0;{let z=P[M];if(typeof C=="number"||typeof C=="boolean"){if(z!==C)return P[M]=C,!0}else if(z.equals(C)===!1)return z.copy(C),!0}return!1}function g(b){let _=b.uniforms,T=0,P=16;for(let M=0,z=_.length;M<z;M++){let v=Array.isArray(_[M])?_[M]:[_[M]];for(let R=0,V=v.length;R<V;R++){let O=v[R],j=Array.isArray(O.value)?O.value:[O.value];for(let B=0,Y=j.length;B<Y;B++){let Z=j[B],Ee=y(Z),ae=T%P;ae!==0&&P-ae<Ee.boundary&&(T+=P-ae),O.__data=new Float32Array(Ee.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=T,T+=Ee.storage}}}let C=T%P;return C>0&&(T+=P-C),b.__size=T,b.__cache={},this}function y(b){let _={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(_.boundary=4,_.storage=4):b.isVector2?(_.boundary=8,_.storage=8):b.isVector3||b.isColor?(_.boundary=16,_.storage=12):b.isVector4?(_.boundary=16,_.storage=16):b.isMatrix3?(_.boundary=48,_.storage=48):b.isMatrix4?(_.boundary=64,_.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),_}function m(b){let _=b.target;_.removeEventListener("dispose",m);let T=o.indexOf(_.__bindingPointIndex);o.splice(T,1),s.deleteBuffer(i[_.id]),delete i[_.id],delete r[_.id]}function p(){for(let b in i)s.deleteBuffer(i[b]);o=[],i={},r={}}return{bind:c,update:l,dispose:p}}function RS(s,e){return s.z-e.z}function CS(s,e){return e.z-s.z}function IS(s,e,t=0){let n=e.itemSize;if(s.isInterleavedBufferAttribute||s.array.constructor!==e.array.constructor){let i=s.count;for(let r=0;r<i;r++)for(let o=0;o<n;o++)e.setComponent(r+t,o,s.getComponent(r,o))}else e.array.set(s.array,t*n);e.needsUpdate=!0}function Um(s,e,t,n,i,r,o){let a=Vh.distanceSqToPoint(s);if(a<t){let c=new w;Vh.closestPointToPoint(s,c),c.applyMatrix4(n);let l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,object:o})}}function mf(){let s=0,e=0,t=0,n=0;function i(r,o,a,c){s=r,e=a,t=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){i(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,u,h){let f=(o-r)/l-(a-r)/(l+u)+(a-o)/u,d=(a-o)/u-(c-o)/(u+h)+(c-a)/h;f*=u,d*=u,i(o,a,f,d)},calc:function(r){let o=r*r,a=o*r;return s+e*r+t*o+n*a}}}function Fm(s,e,t,n,i){let r=(n-e)*.5,o=(i-t)*.5,a=s*s,c=s*a;return(2*t-2*n+r+o)*c+(-3*t+3*n-2*r-o)*a+r*s+t}function LS(s,e){let t=1-s;return t*t*e}function NS(s,e){return 2*(1-s)*s*e}function DS(s,e){return s*s*e}function Na(s,e,t,n){return LS(s,e)+NS(s,t)+DS(s,n)}function US(s,e){let t=1-s;return t*t*t*e}function FS(s,e){let t=1-s;return 3*t*t*s*e}function BS(s,e){return 3*(1-s)*s*s*e}function OS(s,e){return s*s*s*e}function Da(s,e,t,n,i){return US(s,e)+FS(s,t)+BS(s,n)+OS(s,i)}function el(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function zS(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function HS(s){function e(i,r){return s[i]-s[r]}let t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Bm(s,e,t){let n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){let a=t[r]*e;for(let c=0;c!==e;++c)i[o++]=s[a+c]}return i}function d0(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=s[i++];while(r!==void 0)}function VS(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Qs;case"vector":case"vector2":case"vector3":case"vector4":return er;case"color":return wl;case"quaternion":return Fs;case"bool":case"boolean":return Tr;case"string":return wr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function GS(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=VS(s.type);if(s.times===void 0){let t=[],n=[];d0(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}function Hm(s,e){return s.distance-e.distance}function cf(s,e,t,n){if(s.layers.test(e.layers)&&s.raycast(e,t),n===!0){let i=s.children;for(let r=0,o=i.length;r<o;r++)cf(i[r],e,t,!0)}}var Ka,Gm,Sx,$d,Ex,Wm,Tx,Js,Gi,Ui,Mi,mr,Lo,Qd,ep,tp,Dl,Is,wx,Ax,np,ip,Ul,Fl,Rx,Cx,Uo,vh,Px,Ix,Lx,Nx,Dx,Ux,Fx,Bx,Ox,kx,zx,Hx,nl,Vx,Gx,lf,Wx,Xm,Xx,qx,gr,Yx,jx,Zx,Kx,Jx,$x,sp,Qx,qm,Fo,Bo,bh,Mh,Bl,jr,ns,Ua,fi,il,Ra,Vi,uf,yr,xr,ey,ty,hf,Ym,dr,Ns,Zr,jm,Zm,Xr,ny,is,iy,sy,qr,Oo,ry,Km,oy,Jm,$m,Fu,Bu,Ou,ku,rp,op,ap,cp,Qm,lp,up,hp,fp,dp,pp,mp,gp,xp,yp,_p,vp,bp,Mp,Sp,Ep,zu,Tp,wp,ay,Ap,Rp,Cp,ko,Kr,Hu,Pp,Ip,Lp,cy,e0,Ol,Ja,t0,Yr,ly,uy,n0,hy,ds,Gn,mi,ff,kl,sl,Vn,rl,ol,ho,Np,fy,dy,py,i0,my,gy,xy,yy,Sh,Dp,Eh,Ds,Fa,_r,Li,Up,Ca,zo,Qr,nt,fn,Vu,Fp,Bp,Op,Ec,Dy,Mn,fo,cl,Uy,ll,Fy,Fi,Ln,wh,ps,ul,Ah,gi,w,Xu,kp,on,Xs,bs,Tc,po,mo,go,ar,cr,Or,va,wc,Ac,kr,By,ba,Yu,ii,qs,ju,Rc,lr,Zu,Cc,Ku,$s,vt,xo,Ms,Oy,ky,ur,Pc,Qi,zp,Hp,Ho,Oa,zy,Vp,yo,Ys,Ic,Ma,Hy,Vy,Gp,Wp,Xp,Gy,Wy,Zn,Ss,js,Ju,Zs,_o,vo,qp,$u,Qu,eh,Lc,ss,r0,hr,Nc,It,Ni,Xy,rs,Wi,ai,Dc,Tn,Vo,Go,pi,qy,fs,nh,bo,es,Sa,bi,Si,Yp,zr,Uc,jp,Mo,So,Eo,ih,Fc,Bc,Oc,kc,Zp,Kp,Jp,zc,Hc,Sn,ka,Zy,Ky,Jy,Xi,hl,di,To,wo,Rh,fl,Ch,sh,$y,Qy,ts,Hr,Gc,vr,Jr,t_,n_,i_,s_,r_,o_,a_,c_,l_,u_,h_,f_,d_,p_,m_,g_,x_,y_,__,v_,b_,M_,S_,E_,T_,w_,A_,R_,C_,P_,I_,L_,N_,D_,U_,F_,B_,O_,k_,z_,H_,V_,G_,W_,X_,q_,Y_,j_,Z_,K_,J_,$_,Q_,ev,tv,nv,iv,sv,rv,ov,av,cv,lv,uv,hv,fv,dv,pv,mv,gv,xv,yv,_v,vv,bv,Mv,Sv,Ev,Tv,wv,Av,Rv,Cv,Pv,Iv,Lv,Nv,Dv,Uv,Fv,Bv,Ov,kv,zv,Hv,Vv,Gv,Wv,Xv,qv,Yv,jv,Zv,Kv,Jv,$v,Qv,eb,tb,nb,ib,sb,rb,ob,ab,cb,lb,ub,hb,fb,db,pb,mb,gb,xb,yb,_b,vb,bb,Mb,Sb,Eb,Tb,wb,Ab,Rb,Cb,Pb,Ib,Lb,Nb,hn,Xe,Ps,Wc,br,Po,$p,Wr,rh,Qp,oh,ah,ch,Gr,Ao,em,dl,pl,c0,l0,u0,h0,f0,sm,rm,om,am,cm,Ph,Ih,Lh,lh,Do,OM,kM,jM,ZM,JM,rS,Dh,Uh,fS,Fh,Bh,gS,xS,Oh,Us,MS,La,kh,za,zh,Mr,Ha,zi,Va,_m,vm,bm,TS,Mm,qc,uh,Sm,hh,ml,Ga,gl,Em,wS,xl,$r,Ro,Tm,Yc,wm,AS,Ea,Ta,yl,Hh,Co,fr,Am,PS,Rm,fh,jc,Vr,wa,dh,Di,Zc,_l,Wa,Cm,Pm,Im,ph,Kc,Xo,Lm,Nm,vl,bl,Xa,Dm,Vh,Jc,$c,Ml,Ts,Sl,Gh,Qc,mh,gh,xh,qa,Wh,Xh,qh,Yh,jh,El,Zh,kS,Tl,Sr,ms,Er,Kh,Jh,$h,gs,Tr,wl,Qs,Qh,Fs,wr,er,Al,pr,ef,WS,tr,Ks,tf,Ya,nf,Rl,qo,Cl,yh,Om,km,ja,sf,Pl,zm,Aa,_h,rf,Il,of,Yo,Ar,Ll,gf,XS,xf,qS,YS,jS,ZS,KS,JS,$S,af,Bn,$E,Za,Nl,Vm,tl,Zi,li=kt(()=>{Ka="160",Gm={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Sx=0,$d=1,Ex=2,Wm=1,Tx=2,Js=3,Gi=0,Ui=1,Mi=2,mr=0,Lo=1,Qd=2,ep=3,tp=4,Dl=5,Is=100,wx=101,Ax=102,np=103,ip=104,Ul=200,Fl=201,Rx=202,Cx=203,Uo=204,vh=205,Px=206,Ix=207,Lx=208,Nx=209,Dx=210,Ux=211,Fx=212,Bx=213,Ox=214,kx=0,zx=1,Hx=2,nl=3,Vx=4,Gx=5,lf=6,Wx=7,Xm=0,Xx=1,qx=2,gr=0,Yx=1,jx=2,Zx=3,Kx=4,Jx=5,$x=6,sp="attached",Qx="detached",qm=300,Fo=301,Bo=302,bh=303,Mh=304,Bl=306,jr=1e3,ns=1001,Ua=1002,fi=1003,il=1004,Ra=1005,Vi=1006,uf=1007,yr=1008,xr=1009,ey=1010,ty=1011,hf=1012,Ym=1013,dr=1014,Ns=1015,Zr=1016,jm=1017,Zm=1018,Xr=1020,ny=1021,is=1023,iy=1024,sy=1025,qr=1026,Oo=1027,ry=1028,Km=1029,oy=1030,Jm=1031,$m=1033,Fu=33776,Bu=33777,Ou=33778,ku=33779,rp=35840,op=35841,ap=35842,cp=35843,Qm=36196,lp=37492,up=37496,hp=37808,fp=37809,dp=37810,pp=37811,mp=37812,gp=37813,xp=37814,yp=37815,_p=37816,vp=37817,bp=37818,Mp=37819,Sp=37820,Ep=37821,zu=36492,Tp=36494,wp=36495,ay=36283,Ap=36284,Rp=36285,Cp=36286,ko=2300,Kr=2301,Hu=2302,Pp=2400,Ip=2401,Lp=2402,cy=2500,e0=0,Ol=1,Ja=2,t0=3e3,Yr=3001,ly=3200,uy=3201,n0=0,hy=1,ds="",Gn="srgb",mi="srgb-linear",ff="display-p3",kl="display-p3-linear",sl="linear",Vn="srgb",rl="rec709",ol="p3",ho=7680,Np=519,fy=512,dy=513,py=514,i0=515,my=516,gy=517,xy=518,yy=519,Sh=35044,Dp="300 es",Eh=1035,Ds=2e3,Fa=2001,_r=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let i=this._listeners[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}},Li=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Up=1234567,Ca=Math.PI/180,zo=180/Math.PI;Qr={DEG2RAD:Ca,RAD2DEG:zo,generateUUID:Es,clamp:ci,euclideanModulo:df,mapLinear:_y,inverseLerp:vy,lerp:Pa,damp:by,pingpong:My,smoothstep:Sy,smootherstep:Ey,randInt:Ty,randFloat:wy,randFloatSpread:Ay,seededRandom:Ry,degToRad:Cy,radToDeg:Py,isPowerOfTwo:Th,ceilPowerOfTwo:Iy,floorPowerOfTwo:al,setQuaternionFromProperEuler:Ly,normalize:Cn,denormalize:Ls},nt=class s{constructor(e=0,t=0){s.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ci(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},fn=class s{constructor(e,t,n,i,r,o,a,c,l){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,c,l)}set(e,t,n,i,r,o,a,c,l){let u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],h=n[7],f=n[2],d=n[5],g=n[8],y=i[0],m=i[3],p=i[6],b=i[1],_=i[4],T=i[7],P=i[2],C=i[5],M=i[8];return r[0]=o*y+a*b+c*P,r[3]=o*m+a*_+c*C,r[6]=o*p+a*T+c*M,r[1]=l*y+u*b+h*P,r[4]=l*m+u*_+h*C,r[7]=l*p+u*T+h*M,r[2]=f*y+d*b+g*P,r[5]=f*m+d*_+g*C,r[8]=f*p+d*T+g*M,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-n*r*u+n*a*c+i*r*l-i*o*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=u*o-a*l,f=a*c-u*r,d=l*r-o*c,g=t*h+n*f+i*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/g;return e[0]=h*y,e[1]=(i*l-u*n)*y,e[2]=(a*n-i*o)*y,e[3]=f*y,e[4]=(u*t-i*c)*y,e[5]=(i*r-a*t)*y,e[6]=d*y,e[7]=(n*c-l*t)*y,e[8]=(o*t-n*r)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-i*l,i*c,-i*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Vu.makeScale(e,t)),this}rotate(e){return this.premultiply(Vu.makeRotation(-e)),this}translate(e,t){return this.premultiply(Vu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Vu=new fn;Fp={};Bp=new fn().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Op=new fn().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ec={[mi]:{transfer:sl,primaries:rl,toReference:s=>s,fromReference:s=>s},[Gn]:{transfer:Vn,primaries:rl,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[kl]:{transfer:sl,primaries:ol,toReference:s=>s.applyMatrix3(Op),fromReference:s=>s.applyMatrix3(Bp)},[ff]:{transfer:Vn,primaries:ol,toReference:s=>s.convertSRGBToLinear().applyMatrix3(Op),fromReference:s=>s.applyMatrix3(Bp).convertLinearToSRGB()}},Dy=new Set([mi,kl]),Mn={enabled:!0,_workingColorSpace:mi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!Dy.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;let n=Ec[e].toReference,i=Ec[t].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return Ec[s].primaries},getTransfer:function(s){return s===ds?sl:Ec[s].transfer}};cl=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement=="undefined")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{fo===void 0&&(fo=Ba("canvas")),fo.width=e.width,fo.height=e.height;let n=fo.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=fo}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement!="undefined"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&e instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&e instanceof ImageBitmap){let t=Ba("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=No(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(No(t[n]/255)*255):t[n]=No(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Uy=0,ll=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Uy++}),this.uuid=Es(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Wu(i[o].image)):r.push(Wu(i[o]))}else r=Wu(i);n.url=r}return t||(e.images[this.uuid]=n),n}};Fy=0,Fi=class s extends _r{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=ns,i=ns,r=Vi,o=yr,a=is,c=xr,l=s.DEFAULT_ANISOTROPY,u=ds){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Fy++}),this.uuid=Es(),this.name="",this.source=new ll(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new nt(0,0),this.repeat=new nt(1,1),this.center=new nt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new fn,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(Ia("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===Yr?Gn:ds),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==qm)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case jr:e.x=e.x-Math.floor(e.x);break;case ns:e.x=e.x<0?0:1;break;case Ua:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case jr:e.y=e.y-Math.floor(e.y);break;case ns:e.y=e.y<0?0:1;break;case Ua:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Ia("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Gn?Yr:t0}set encoding(e){Ia("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Yr?Gn:ds}};Fi.DEFAULT_IMAGE=null;Fi.DEFAULT_MAPPING=qm;Fi.DEFAULT_ANISOTROPY=1;Ln=class s{constructor(e=0,t=0,n=0,i=1){s.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,c=e.elements,l=c[0],u=c[4],h=c[8],f=c[1],d=c[5],g=c[9],y=c[2],m=c[6],p=c[10];if(Math.abs(u-f)<.01&&Math.abs(h-y)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+y)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let _=(l+1)/2,T=(d+1)/2,P=(p+1)/2,C=(u+f)/4,M=(h+y)/4,z=(g+m)/4;return _>T&&_>P?_<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(_),i=C/n,r=M/n):T>P?T<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(T),n=C/i,r=z/i):P<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(P),n=M/r,i=z/r),this.set(n,i,r,t),this}let b=Math.sqrt((m-g)*(m-g)+(h-y)*(h-y)+(f-u)*(f-u));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(h-y)/b,this.z=(f-u)/b,this.w=Math.acos((l+d+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},wh=class extends _r{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ln(0,0,e,t),this.scissorTest=!1,this.viewport=new Ln(0,0,e,t);let i={width:e,height:t,depth:1};n.encoding!==void 0&&(Ia("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Yr?Gn:ds),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Vi,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Fi(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new ll(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},ps=class extends wh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},ul=class extends Fi{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=fi,this.minFilter=fi,this.wrapR=ns,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Ah=class extends Fi{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=fi,this.minFilter=fi,this.wrapR=ns,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},gi=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let c=n[i+0],l=n[i+1],u=n[i+2],h=n[i+3],f=r[o+0],d=r[o+1],g=r[o+2],y=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=f,e[t+1]=d,e[t+2]=g,e[t+3]=y;return}if(h!==y||c!==f||l!==d||u!==g){let m=1-a,p=c*f+l*d+u*g+h*y,b=p>=0?1:-1,_=1-p*p;if(_>Number.EPSILON){let P=Math.sqrt(_),C=Math.atan2(P,p*b);m=Math.sin(m*C)/P,a=Math.sin(a*C)/P}let T=a*b;if(c=c*m+f*T,l=l*m+d*T,u=u*m+g*T,h=h*m+y*T,m===1-a){let P=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=P,l*=P,u*=P,h*=P}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,r,o){let a=n[i],c=n[i+1],l=n[i+2],u=n[i+3],h=r[o],f=r[o+1],d=r[o+2],g=r[o+3];return e[t]=a*g+u*h+c*d-l*f,e[t+1]=c*g+u*f+l*h-a*d,e[t+2]=l*g+u*d+a*f-c*h,e[t+3]=u*g-a*h-c*f-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(i/2),h=a(r/2),f=c(n/2),d=c(i/2),g=c(r/2);switch(o){case"XYZ":this._x=f*u*h+l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h-f*d*g;break;case"YXZ":this._x=f*u*h+l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h+f*d*g;break;case"ZXY":this._x=f*u*h-l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h-f*d*g;break;case"ZYX":this._x=f*u*h-l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h+f*d*g;break;case"YZX":this._x=f*u*h+l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h-f*d*g;break;case"XZY":this._x=f*u*h-l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],h=t[10],f=n+a+h;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-c)*d,this._y=(r-l)*d,this._z=(o-i)*d}else if(n>a&&n>h){let d=2*Math.sqrt(1+n-a-h);this._w=(u-c)/d,this._x=.25*d,this._y=(i+o)/d,this._z=(r+l)/d}else if(a>h){let d=2*Math.sqrt(1+a-n-h);this._w=(r-l)/d,this._x=(i+o)/d,this._y=.25*d,this._z=(c+u)/d}else{let d=2*Math.sqrt(1+h-n-a);this._w=(o-i)/d,this._x=(r+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ci(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+o*a+i*l-r*c,this._y=i*u+o*c+r*a-n*l,this._z=r*u+o*l+n*c-i*a,this._w=o*u-n*a-i*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,r=this._z,o=this._w,a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let d=1-t;return this._w=d*o+t*this._w,this._x=d*n+t*this._x,this._y=d*i+t*this._y,this._z=d*r+t*this._z,this.normalize(),this}let l=Math.sqrt(c),u=Math.atan2(l,a),h=Math.sin((1-t)*u)/l,f=Math.sin(t*u)/l;return this._w=o*h+this._w*f,this._x=n*h+this._x*f,this._y=i*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(r),n*Math.cos(r),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},w=class s{constructor(e=0,t=0,n=0){s.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(kp.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(kp.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*i-a*n),u=2*(a*t-r*i),h=2*(r*n-o*t);return this.x=t+c*l+o*h-a*u,this.y=n+c*u+a*l-r*h,this.z=i+c*h+r*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=i*c-r*a,this.y=r*o-n*c,this.z=n*a-i*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Xu.copy(this).projectOnVector(e),this.sub(Xu)}reflect(e){return this.sub(Xu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ci(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Xu=new w,kp=new gi,on=class{constructor(e=new w(1/0,1/0,1/0),t=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(bs.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(bs.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=bs.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,bs):bs.fromBufferAttribute(r,o),bs.applyMatrix4(e.matrixWorld),this.expandByPoint(bs);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Tc.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Tc.copy(n.boundingBox)),Tc.applyMatrix4(e.matrixWorld),this.union(Tc)}let i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,bs),bs.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(va),wc.subVectors(this.max,va),po.subVectors(e.a,va),mo.subVectors(e.b,va),go.subVectors(e.c,va),ar.subVectors(mo,po),cr.subVectors(go,mo),Or.subVectors(po,go);let t=[0,-ar.z,ar.y,0,-cr.z,cr.y,0,-Or.z,Or.y,ar.z,0,-ar.x,cr.z,0,-cr.x,Or.z,0,-Or.x,-ar.y,ar.x,0,-cr.y,cr.x,0,-Or.y,Or.x,0];return!qu(t,po,mo,go,wc)||(t=[1,0,0,0,1,0,0,0,1],!qu(t,po,mo,go,wc))?!1:(Ac.crossVectors(ar,cr),t=[Ac.x,Ac.y,Ac.z],qu(t,po,mo,go,wc))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,bs).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(bs).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Xs[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Xs[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Xs[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Xs[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Xs[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Xs[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Xs[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Xs[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Xs),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Xs=[new w,new w,new w,new w,new w,new w,new w,new w],bs=new w,Tc=new on,po=new w,mo=new w,go=new w,ar=new w,cr=new w,Or=new w,va=new w,wc=new w,Ac=new w,kr=new w;By=new on,ba=new w,Yu=new w,ii=class{constructor(e=new w,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):By.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ba.subVectors(e,this.center);let t=ba.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(ba,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Yu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ba.copy(e.center).add(Yu)),this.expandByPoint(ba.copy(e.center).sub(Yu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},qs=new w,ju=new w,Rc=new w,lr=new w,Zu=new w,Cc=new w,Ku=new w,$s=class{constructor(e=new w,t=new w(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,qs)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=qs.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(qs.copy(this.origin).addScaledVector(this.direction,t),qs.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){ju.copy(e).add(t).multiplyScalar(.5),Rc.copy(t).sub(e).normalize(),lr.copy(this.origin).sub(ju);let r=e.distanceTo(t)*.5,o=-this.direction.dot(Rc),a=lr.dot(this.direction),c=-lr.dot(Rc),l=lr.lengthSq(),u=Math.abs(1-o*o),h,f,d,g;if(u>0)if(h=o*c-a,f=o*a-c,g=r*u,h>=0)if(f>=-g)if(f<=g){let y=1/u;h*=y,f*=y,d=h*(h+o*f+2*a)+f*(o*h+f+2*c)+l}else f=r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;else f=-r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;else f<=-g?(h=Math.max(0,-(-o*r+a)),f=h>0?-r:Math.min(Math.max(-r,-c),r),d=-h*h+f*(f+2*c)+l):f<=g?(h=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(h=Math.max(0,-(o*r+a)),f=h>0?r:Math.min(Math.max(-r,-c),r),d=-h*h+f*(f+2*c)+l);else f=o>0?-r:r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(ju).addScaledVector(Rc,f),d}intersectSphere(e,t){qs.subVectors(e.center,this.origin);let n=qs.dot(this.direction),i=qs.dot(qs)-n*n,r=e.radius*e.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,c,l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,i=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,i=(e.min.x-f.x)*l),u>=0?(r=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),h>=0?(a=(e.min.z-f.z)*h,c=(e.max.z-f.z)*h):(a=(e.max.z-f.z)*h,c=(e.min.z-f.z)*h),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,qs)!==null}intersectTriangle(e,t,n,i,r){Zu.subVectors(t,e),Cc.subVectors(n,e),Ku.crossVectors(Zu,Cc);let o=this.direction.dot(Ku),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;lr.subVectors(this.origin,e);let c=a*this.direction.dot(Cc.crossVectors(lr,Cc));if(c<0)return null;let l=a*this.direction.dot(Zu.cross(lr));if(l<0||c+l>o)return null;let u=-a*lr.dot(Ku);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},vt=class s{constructor(e,t,n,i,r,o,a,c,l,u,h,f,d,g,y,m){s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,c,l,u,h,f,d,g,y,m)}set(e,t,n,i,r,o,a,c,l,u,h,f,d,g,y,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=u,p[10]=h,p[14]=f,p[3]=d,p[7]=g,p[11]=y,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/xo.setFromMatrixColumn(e,0).length(),r=1/xo.setFromMatrixColumn(e,1).length(),o=1/xo.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){let f=o*u,d=o*h,g=a*u,y=a*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=d+g*l,t[5]=f-y*l,t[9]=-a*c,t[2]=y-f*l,t[6]=g+d*l,t[10]=o*c}else if(e.order==="YXZ"){let f=c*u,d=c*h,g=l*u,y=l*h;t[0]=f+y*a,t[4]=g*a-d,t[8]=o*l,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=d*a-g,t[6]=y+f*a,t[10]=o*c}else if(e.order==="ZXY"){let f=c*u,d=c*h,g=l*u,y=l*h;t[0]=f-y*a,t[4]=-o*h,t[8]=g+d*a,t[1]=d+g*a,t[5]=o*u,t[9]=y-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let f=o*u,d=o*h,g=a*u,y=a*h;t[0]=c*u,t[4]=g*l-d,t[8]=f*l+y,t[1]=c*h,t[5]=y*l+f,t[9]=d*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let f=o*c,d=o*l,g=a*c,y=a*l;t[0]=c*u,t[4]=y-f*h,t[8]=g*h+d,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=d*h+g,t[10]=f-y*h}else if(e.order==="XZY"){let f=o*c,d=o*l,g=a*c,y=a*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=f*h+y,t[5]=o*u,t[9]=d*h-g,t[2]=g*h-d,t[6]=a*u,t[10]=y*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Oy,e,ky)}lookAt(e,t,n){let i=this.elements;return Qi.subVectors(e,t),Qi.lengthSq()===0&&(Qi.z=1),Qi.normalize(),ur.crossVectors(n,Qi),ur.lengthSq()===0&&(Math.abs(n.z)===1?Qi.x+=1e-4:Qi.z+=1e-4,Qi.normalize(),ur.crossVectors(n,Qi)),ur.normalize(),Pc.crossVectors(Qi,ur),i[0]=ur.x,i[4]=Pc.x,i[8]=Qi.x,i[1]=ur.y,i[5]=Pc.y,i[9]=Qi.y,i[2]=ur.z,i[6]=Pc.z,i[10]=Qi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],h=n[5],f=n[9],d=n[13],g=n[2],y=n[6],m=n[10],p=n[14],b=n[3],_=n[7],T=n[11],P=n[15],C=i[0],M=i[4],z=i[8],v=i[12],R=i[1],V=i[5],O=i[9],j=i[13],B=i[2],Y=i[6],Z=i[10],Ee=i[14],ae=i[3],_e=i[7],Te=i[11],Be=i[15];return r[0]=o*C+a*R+c*B+l*ae,r[4]=o*M+a*V+c*Y+l*_e,r[8]=o*z+a*O+c*Z+l*Te,r[12]=o*v+a*j+c*Ee+l*Be,r[1]=u*C+h*R+f*B+d*ae,r[5]=u*M+h*V+f*Y+d*_e,r[9]=u*z+h*O+f*Z+d*Te,r[13]=u*v+h*j+f*Ee+d*Be,r[2]=g*C+y*R+m*B+p*ae,r[6]=g*M+y*V+m*Y+p*_e,r[10]=g*z+y*O+m*Z+p*Te,r[14]=g*v+y*j+m*Ee+p*Be,r[3]=b*C+_*R+T*B+P*ae,r[7]=b*M+_*V+T*Y+P*_e,r[11]=b*z+_*O+T*Z+P*Te,r[15]=b*v+_*j+T*Ee+P*Be,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],h=e[6],f=e[10],d=e[14],g=e[3],y=e[7],m=e[11],p=e[15];return g*(+r*c*h-i*l*h-r*a*f+n*l*f+i*a*d-n*c*d)+y*(+t*c*d-t*l*f+r*o*f-i*o*d+i*l*u-r*c*u)+m*(+t*l*h-t*a*d-r*o*h+n*o*d+r*a*u-n*l*u)+p*(-i*a*u-t*c*h+t*a*f+i*o*h-n*o*f+n*c*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=e[9],f=e[10],d=e[11],g=e[12],y=e[13],m=e[14],p=e[15],b=h*m*l-y*f*l+y*c*d-a*m*d-h*c*p+a*f*p,_=g*f*l-u*m*l-g*c*d+o*m*d+u*c*p-o*f*p,T=u*y*l-g*h*l+g*a*d-o*y*d-u*a*p+o*h*p,P=g*h*c-u*y*c-g*a*f+o*y*f+u*a*m-o*h*m,C=t*b+n*_+i*T+r*P;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let M=1/C;return e[0]=b*M,e[1]=(y*f*r-h*m*r-y*i*d+n*m*d+h*i*p-n*f*p)*M,e[2]=(a*m*r-y*c*r+y*i*l-n*m*l-a*i*p+n*c*p)*M,e[3]=(h*c*r-a*f*r-h*i*l+n*f*l+a*i*d-n*c*d)*M,e[4]=_*M,e[5]=(u*m*r-g*f*r+g*i*d-t*m*d-u*i*p+t*f*p)*M,e[6]=(g*c*r-o*m*r-g*i*l+t*m*l+o*i*p-t*c*p)*M,e[7]=(o*f*r-u*c*r+u*i*l-t*f*l-o*i*d+t*c*d)*M,e[8]=T*M,e[9]=(g*h*r-u*y*r-g*n*d+t*y*d+u*n*p-t*h*p)*M,e[10]=(o*y*r-g*a*r+g*n*l-t*y*l-o*n*p+t*a*p)*M,e[11]=(u*a*r-o*h*r-u*n*l+t*h*l+o*n*d-t*a*d)*M,e[12]=P*M,e[13]=(u*y*i-g*h*i+g*n*f-t*y*f-u*n*m+t*h*m)*M,e[14]=(g*a*i-o*y*i-g*n*c+t*y*c+o*n*m-t*a*m)*M,e[15]=(o*h*i-u*a*i+u*n*c-t*h*c-o*n*f+t*a*f)*M,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,u=r*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,u*a+n,u*c-i*o,0,l*c-i*a,u*c+i*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,u=o+o,h=a+a,f=r*l,d=r*u,g=r*h,y=o*u,m=o*h,p=a*h,b=c*l,_=c*u,T=c*h,P=n.x,C=n.y,M=n.z;return i[0]=(1-(y+p))*P,i[1]=(d+T)*P,i[2]=(g-_)*P,i[3]=0,i[4]=(d-T)*C,i[5]=(1-(f+p))*C,i[6]=(m+b)*C,i[7]=0,i[8]=(g+_)*M,i[9]=(m-b)*M,i[10]=(1-(f+y))*M,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,r=xo.set(i[0],i[1],i[2]).length(),o=xo.set(i[4],i[5],i[6]).length(),a=xo.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],Ms.copy(this);let l=1/r,u=1/o,h=1/a;return Ms.elements[0]*=l,Ms.elements[1]*=l,Ms.elements[2]*=l,Ms.elements[4]*=u,Ms.elements[5]*=u,Ms.elements[6]*=u,Ms.elements[8]*=h,Ms.elements[9]*=h,Ms.elements[10]*=h,t.setFromRotationMatrix(Ms),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o,a=Ds){let c=this.elements,l=2*r/(t-e),u=2*r/(n-i),h=(t+e)/(t-e),f=(n+i)/(n-i),d,g;if(a===Ds)d=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Fa)d=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=Ds){let c=this.elements,l=1/(t-e),u=1/(n-i),h=1/(o-r),f=(t+e)*l,d=(n+i)*u,g,y;if(a===Ds)g=(o+r)*h,y=-2*h;else if(a===Fa)g=r*h,y=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=y,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},xo=new w,Ms=new vt,Oy=new w(0,0,0),ky=new w(1,1,1),ur=new w,Pc=new w,Qi=new w,zp=new vt,Hp=new gi,Ho=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],o=i[4],a=i[8],c=i[1],l=i[5],u=i[9],h=i[2],f=i[6],d=i[10];switch(t){case"XYZ":this._y=Math.asin(ci(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ci(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(ci(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ci(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(ci(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-ci(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return zp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(zp,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Hp.setFromEuler(this),this.setFromQuaternion(Hp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ho.DEFAULT_ORDER="XYZ";Oa=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},zy=0,Vp=new w,yo=new gi,Ys=new vt,Ic=new w,Ma=new w,Hy=new w,Vy=new gi,Gp=new w(1,0,0),Wp=new w(0,1,0),Xp=new w(0,0,1),Gy={type:"added"},Wy={type:"removed"},Zn=class s extends _r{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:zy++}),this.uuid=Es(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new w,t=new Ho,n=new gi,i=new w(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new vt},normalMatrix:{value:new fn}}),this.matrix=new vt,this.matrixWorld=new vt,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Oa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return yo.setFromAxisAngle(e,t),this.quaternion.multiply(yo),this}rotateOnWorldAxis(e,t){return yo.setFromAxisAngle(e,t),this.quaternion.premultiply(yo),this}rotateX(e){return this.rotateOnAxis(Gp,e)}rotateY(e){return this.rotateOnAxis(Wp,e)}rotateZ(e){return this.rotateOnAxis(Xp,e)}translateOnAxis(e,t){return Vp.copy(e).applyQuaternion(this.quaternion),this.position.add(Vp.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Gp,e)}translateY(e){return this.translateOnAxis(Wp,e)}translateZ(e){return this.translateOnAxis(Xp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ys.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ic.copy(e):Ic.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Ma.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ys.lookAt(Ma,Ic,this.up):Ys.lookAt(Ic,Ma,this.up),this.quaternion.setFromRotationMatrix(Ys),i&&(Ys.extractRotation(i.matrixWorld),yo.setFromRotationMatrix(Ys),this.quaternion.premultiply(yo.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Gy)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Wy)),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ys.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ys.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ys),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ma,e,Hy),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ma,Vy,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++){let r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){let i=this.children;for(let r=0,o=i.length;r<o;r++){let a=i[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let h=c[l];r(e.shapes,h)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];i.animations.push(r(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),u=o(e.images),h=o(e.shapes),f=o(e.skeletons),d=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){let c=[];for(let l in a){let u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};Zn.DEFAULT_UP=new w(0,1,0);Zn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Zn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;Ss=new w,js=new w,Ju=new w,Zs=new w,_o=new w,vo=new w,qp=new w,$u=new w,Qu=new w,eh=new w,Lc=!1,ss=class s{constructor(e=new w,t=new w,n=new w){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Ss.subVectors(e,t),i.cross(Ss);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Ss.subVectors(i,t),js.subVectors(n,t),Ju.subVectors(e,t);let o=Ss.dot(Ss),a=Ss.dot(js),c=Ss.dot(Ju),l=js.dot(js),u=js.dot(Ju),h=o*l-a*a;if(h===0)return r.set(0,0,0),null;let f=1/h,d=(l*c-a*u)*f,g=(o*u-a*c)*f;return r.set(1-d-g,g,d)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Zs)===null?!1:Zs.x>=0&&Zs.y>=0&&Zs.x+Zs.y<=1}static getUV(e,t,n,i,r,o,a,c){return Lc===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Lc=!0),this.getInterpolation(e,t,n,i,r,o,a,c)}static getInterpolation(e,t,n,i,r,o,a,c){return this.getBarycoord(e,t,n,i,Zs)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Zs.x),c.addScaledVector(o,Zs.y),c.addScaledVector(a,Zs.z),c)}static isFrontFacing(e,t,n,i){return Ss.subVectors(n,t),js.subVectors(e,t),Ss.cross(js).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ss.subVectors(this.c,this.b),js.subVectors(this.a,this.b),Ss.cross(js).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,r){return Lc===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Lc=!0),s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,o,a;_o.subVectors(i,n),vo.subVectors(r,n),$u.subVectors(e,n);let c=_o.dot($u),l=vo.dot($u);if(c<=0&&l<=0)return t.copy(n);Qu.subVectors(e,i);let u=_o.dot(Qu),h=vo.dot(Qu);if(u>=0&&h<=u)return t.copy(i);let f=c*h-u*l;if(f<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(n).addScaledVector(_o,o);eh.subVectors(e,r);let d=_o.dot(eh),g=vo.dot(eh);if(g>=0&&d<=g)return t.copy(r);let y=d*l-c*g;if(y<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(vo,a);let m=u*g-d*h;if(m<=0&&h-u>=0&&d-g>=0)return qp.subVectors(r,i),a=(h-u)/(h-u+(d-g)),t.copy(i).addScaledVector(qp,a);let p=1/(m+y+f);return o=y*p,a=f*p,t.copy(n).addScaledVector(_o,o).addScaledVector(vo,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},r0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},hr={h:0,s:0,l:0},Nc={h:0,s:0,l:0};It=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Gn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Mn.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=Mn.workingColorSpace){return this.r=e,this.g=t,this.b=n,Mn.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=Mn.workingColorSpace){if(e=df(e,1),t=ci(t,0,1),n=ci(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=th(o,r,e+1/3),this.g=th(o,r,e),this.b=th(o,r,e-1/3)}return Mn.toWorkingColorSpace(this,i),this}setStyle(e,t=Gn){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Gn){let n=r0[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=No(e.r),this.g=No(e.g),this.b=No(e.b),this}copyLinearToSRGB(e){return this.r=Gu(e.r),this.g=Gu(e.g),this.b=Gu(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Gn){return Mn.fromWorkingColorSpace(Ni.copy(this),e),Math.round(ci(Ni.r*255,0,255))*65536+Math.round(ci(Ni.g*255,0,255))*256+Math.round(ci(Ni.b*255,0,255))}getHexString(e=Gn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Mn.workingColorSpace){Mn.fromWorkingColorSpace(Ni.copy(this),t);let n=Ni.r,i=Ni.g,r=Ni.b,o=Math.max(n,i,r),a=Math.min(n,i,r),c,l,u=(a+o)/2;if(a===o)c=0,l=0;else{let h=o-a;switch(l=u<=.5?h/(o+a):h/(2-o-a),o){case n:c=(i-r)/h+(i<r?6:0);break;case i:c=(r-n)/h+2;break;case r:c=(n-i)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=Mn.workingColorSpace){return Mn.fromWorkingColorSpace(Ni.copy(this),t),e.r=Ni.r,e.g=Ni.g,e.b=Ni.b,e}getStyle(e=Gn){Mn.fromWorkingColorSpace(Ni.copy(this),e);let t=Ni.r,n=Ni.g,i=Ni.b;return e!==Gn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(hr),this.setHSL(hr.h+e,hr.s+t,hr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(hr),e.getHSL(Nc);let n=Pa(hr.h,Nc.h,t),i=Pa(hr.s,Nc.s,t),r=Pa(hr.l,Nc.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ni=new It;It.NAMES=r0;Xy=0,rs=class extends _r{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Xy++}),this.uuid=Es(),this.name="",this.type="Material",this.blending=Lo,this.side=Gi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Uo,this.blendDst=vh,this.blendEquation=Is,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new It(0,0,0),this.blendAlpha=0,this.depthFunc=nl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Np,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ho,this.stencilZFail=ho,this.stencilZPass=ho,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Lo&&(n.blending=this.blending),this.side!==Gi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Uo&&(n.blendSrc=this.blendSrc),this.blendDst!==vh&&(n.blendDst=this.blendDst),this.blendEquation!==Is&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==nl&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Np&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ho&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ho&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ho&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(t){let r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Wi=class extends rs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new It(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Xm,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},ai=new w,Dc=new nt,Tn=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Sh,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Ns,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Dc.fromBufferAttribute(this,t),Dc.applyMatrix3(e),this.setXY(t,Dc.x,Dc.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ai.fromBufferAttribute(this,t),ai.applyMatrix3(e),this.setXYZ(t,ai.x,ai.y,ai.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ai.fromBufferAttribute(this,t),ai.applyMatrix4(e),this.setXYZ(t,ai.x,ai.y,ai.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ai.fromBufferAttribute(this,t),ai.applyNormalMatrix(e),this.setXYZ(t,ai.x,ai.y,ai.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ai.fromBufferAttribute(this,t),ai.transformDirection(e),this.setXYZ(t,ai.x,ai.y,ai.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ls(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Cn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ls(t,this.array)),t}setX(e,t){return this.normalized&&(t=Cn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ls(t,this.array)),t}setY(e,t){return this.normalized&&(t=Cn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ls(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Cn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ls(t,this.array)),t}setW(e,t){return this.normalized&&(t=Cn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Cn(t,this.array),n=Cn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Cn(t,this.array),n=Cn(n,this.array),i=Cn(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=Cn(t,this.array),n=Cn(n,this.array),i=Cn(i,this.array),r=Cn(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Sh&&(e.usage=this.usage),e}},Vo=class extends Tn{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Go=class extends Tn{constructor(e,t,n){super(new Uint32Array(e),t,n)}},pi=class extends Tn{constructor(e,t,n){super(new Float32Array(e),t,n)}},qy=0,fs=new vt,nh=new Zn,bo=new w,es=new on,Sa=new on,bi=new w,Si=class s extends _r{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:qy++}),this.uuid=Es(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(s0(e)?Go:Vo)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new fn().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return fs.makeRotationFromQuaternion(e),this.applyMatrix4(fs),this}rotateX(e){return fs.makeRotationX(e),this.applyMatrix4(fs),this}rotateY(e){return fs.makeRotationY(e),this.applyMatrix4(fs),this}rotateZ(e){return fs.makeRotationZ(e),this.applyMatrix4(fs),this}translate(e,t,n){return fs.makeTranslation(e,t,n),this.applyMatrix4(fs),this}scale(e,t,n){return fs.makeScale(e,t,n),this.applyMatrix4(fs),this}lookAt(e){return nh.lookAt(e),nh.updateMatrix(),this.applyMatrix4(nh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(bo).negate(),this.translate(bo.x,bo.y,bo.z),this}setFromPoints(e){let t=[];for(let n=0,i=e.length;n<i;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new pi(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new on);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];es.setFromBufferAttribute(r),this.morphTargetsRelative?(bi.addVectors(this.boundingBox.min,es.min),this.boundingBox.expandByPoint(bi),bi.addVectors(this.boundingBox.max,es.max),this.boundingBox.expandByPoint(bi)):(this.boundingBox.expandByPoint(es.min),this.boundingBox.expandByPoint(es.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ii);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new w,1/0);return}if(e){let n=this.boundingSphere.center;if(es.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];Sa.setFromBufferAttribute(a),this.morphTargetsRelative?(bi.addVectors(es.min,Sa.min),es.expandByPoint(bi),bi.addVectors(es.max,Sa.max),es.expandByPoint(bi)):(es.expandByPoint(Sa.min),es.expandByPoint(Sa.max))}es.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)bi.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(bi));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)bi.fromBufferAttribute(a,l),c&&(bo.fromBufferAttribute(e,l),bi.add(bo)),i=Math.max(i,n.distanceToSquared(bi))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.array,i=t.position.array,r=t.normal.array,o=t.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Tn(new Float32Array(4*a),4));let c=this.getAttribute("tangent").array,l=[],u=[];for(let R=0;R<a;R++)l[R]=new w,u[R]=new w;let h=new w,f=new w,d=new w,g=new nt,y=new nt,m=new nt,p=new w,b=new w;function _(R,V,O){h.fromArray(i,R*3),f.fromArray(i,V*3),d.fromArray(i,O*3),g.fromArray(o,R*2),y.fromArray(o,V*2),m.fromArray(o,O*2),f.sub(h),d.sub(h),y.sub(g),m.sub(g);let j=1/(y.x*m.y-m.x*y.y);isFinite(j)&&(p.copy(f).multiplyScalar(m.y).addScaledVector(d,-y.y).multiplyScalar(j),b.copy(d).multiplyScalar(y.x).addScaledVector(f,-m.x).multiplyScalar(j),l[R].add(p),l[V].add(p),l[O].add(p),u[R].add(b),u[V].add(b),u[O].add(b))}let T=this.groups;T.length===0&&(T=[{start:0,count:n.length}]);for(let R=0,V=T.length;R<V;++R){let O=T[R],j=O.start,B=O.count;for(let Y=j,Z=j+B;Y<Z;Y+=3)_(n[Y+0],n[Y+1],n[Y+2])}let P=new w,C=new w,M=new w,z=new w;function v(R){M.fromArray(r,R*3),z.copy(M);let V=l[R];P.copy(V),P.sub(M.multiplyScalar(M.dot(V))).normalize(),C.crossVectors(z,V);let j=C.dot(u[R])<0?-1:1;c[R*4]=P.x,c[R*4+1]=P.y,c[R*4+2]=P.z,c[R*4+3]=j}for(let R=0,V=T.length;R<V;++R){let O=T[R],j=O.start,B=O.count;for(let Y=j,Z=j+B;Y<Z;Y+=3)v(n[Y+0]),v(n[Y+1]),v(n[Y+2])}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Tn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let i=new w,r=new w,o=new w,a=new w,c=new w,l=new w,u=new w,h=new w;if(e)for(let f=0,d=e.count;f<d;f+=3){let g=e.getX(f+0),y=e.getX(f+1),m=e.getX(f+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,y),o.fromBufferAttribute(t,m),u.subVectors(o,r),h.subVectors(i,r),u.cross(h),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,y),l.fromBufferAttribute(n,m),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(y,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=t.count;f<d;f+=3)i.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,r),h.subVectors(i,r),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)bi.fromBufferAttribute(e,t),bi.normalize(),e.setXYZ(t,bi.x,bi.y,bi.z)}toNonIndexed(){function e(a,c){let l=a.array,u=a.itemSize,h=a.normalized,f=new l.constructor(c.length*u),d=0,g=0;for(let y=0,m=c.length;y<m;y++){a.isInterleavedBufferAttribute?d=c[y]*a.data.stride+a.offset:d=c[y]*u;for(let p=0;p<u;p++)f[g++]=l[d++]}return new Tn(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let a in i){let c=i[a],l=e(c,n);t.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let u=0,h=l.length;u<h;u++){let f=l[u],d=e(f,n);c.push(d)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let h=0,f=l.length;h<f;h++){let d=l[h];u.push(d.toJSON(e.data))}u.length>0&&(i[c]=u,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let i=e.attributes;for(let l in i){let u=i[l];this.setAttribute(l,u.clone(t))}let r=e.morphAttributes;for(let l in r){let u=[],h=r[l];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,u=o.length;l<u;l++){let h=o[l];this.addGroup(h.start,h.count,h.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Yp=new vt,zr=new $s,Uc=new ii,jp=new w,Mo=new w,So=new w,Eo=new w,ih=new w,Fc=new w,Bc=new nt,Oc=new nt,kc=new nt,Zp=new w,Kp=new w,Jp=new w,zc=new w,Hc=new w,Sn=class extends Zn{constructor(e=new Si,t=new Wi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let a=this.morphTargetInfluences;if(r&&a){Fc.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let u=a[c],h=r[c];u!==0&&(ih.fromBufferAttribute(h,e),o?Fc.addScaledVector(ih,u):Fc.addScaledVector(ih.sub(t),u))}t.add(Fc)}return t}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Uc.copy(n.boundingSphere),Uc.applyMatrix4(r),zr.copy(e.ray).recast(e.near),!(Uc.containsPoint(zr.origin)===!1&&(zr.intersectSphere(Uc,jp)===null||zr.origin.distanceToSquared(jp)>(e.far-e.near)**2))&&(Yp.copy(r).invert(),zr.copy(e.ray).applyMatrix4(Yp),!(n.boundingBox!==null&&zr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,zr)))}_computeIntersections(e,t,n){let i,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,y=f.length;g<y;g++){let m=f[g],p=o[m.materialIndex],b=Math.max(m.start,d.start),_=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let T=b,P=_;T<P;T+=3){let C=a.getX(T),M=a.getX(T+1),z=a.getX(T+2);i=Vc(this,p,e,n,l,u,h,C,M,z),i&&(i.faceIndex=Math.floor(T/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let g=Math.max(0,d.start),y=Math.min(a.count,d.start+d.count);for(let m=g,p=y;m<p;m+=3){let b=a.getX(m),_=a.getX(m+1),T=a.getX(m+2);i=Vc(this,o,e,n,l,u,h,b,_,T),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,y=f.length;g<y;g++){let m=f[g],p=o[m.materialIndex],b=Math.max(m.start,d.start),_=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let T=b,P=_;T<P;T+=3){let C=T,M=T+1,z=T+2;i=Vc(this,p,e,n,l,u,h,C,M,z),i&&(i.faceIndex=Math.floor(T/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let g=Math.max(0,d.start),y=Math.min(c.count,d.start+d.count);for(let m=g,p=y;m<p;m+=3){let b=m,_=m+1,T=m+2;i=Vc(this,o,e,n,l,u,h,b,_,T),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}};ka=class s extends Si{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],u=[],h=[],f=0,d=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,i,o,2),g("x","z","y",1,-1,e,n,-t,i,o,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new pi(l,3)),this.setAttribute("normal",new pi(u,3)),this.setAttribute("uv",new pi(h,2));function g(y,m,p,b,_,T,P,C,M,z,v){let R=T/M,V=P/z,O=T/2,j=P/2,B=C/2,Y=M+1,Z=z+1,Ee=0,ae=0,_e=new w;for(let Te=0;Te<Z;Te++){let Be=Te*V-j;for(let ht=0;ht<Y;ht++){let he=ht*R-O;_e[y]=he*b,_e[m]=Be*_,_e[p]=B,l.push(_e.x,_e.y,_e.z),_e[y]=0,_e[m]=0,_e[p]=C>0?1:-1,u.push(_e.x,_e.y,_e.z),h.push(ht/M),h.push(1-Te/z),Ee+=1}}for(let Te=0;Te<z;Te++)for(let Be=0;Be<M;Be++){let ht=f+Be+Y*Te,he=f+Be+Y*(Te+1),Ue=f+(Be+1)+Y*(Te+1),Qe=f+(Be+1)+Y*Te;c.push(ht,he,Qe),c.push(he,Ue,Qe),ae+=6}a.addGroup(d,ae,v),d+=ae,f+=Ee}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};Zy={clone:Wo,merge:Hi},Ky=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Jy=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Xi=class extends rs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ky,this.fragmentShader=Jy,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Wo(e.uniforms),this.uniformsGroups=jy(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},hl=class extends Zn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new vt,this.projectionMatrix=new vt,this.projectionMatrixInverse=new vt,this.coordinateSystem=Ds}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},di=class extends hl{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=zo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ca*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return zo*2*Math.atan(Math.tan(Ca*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ca*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*i/c,t-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},To=-90,wo=1,Rh=class extends Zn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new di(To,wo,e,t);i.layers=this.layers,this.add(i);let r=new di(To,wo,e,t);r.layers=this.layers,this.add(r);let o=new di(To,wo,e,t);o.layers=this.layers,this.add(o);let a=new di(To,wo,e,t);a.layers=this.layers,this.add(a);let c=new di(To,wo,e,t);c.layers=this.layers,this.add(c);let l=new di(To,wo,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,c]=t;for(let l of t)this.remove(l);if(e===Ds)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Fa)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(h,f,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},fl=class extends Fi{constructor(e,t,n,i,r,o,a,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:Fo,super(e,t,n,i,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Ch=class extends ps{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];t.encoding!==void 0&&(Ia("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Yr?Gn:ds),this.texture=new fl(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Vi}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new ka(5,5,5),r=new Xi({name:"CubemapFromEquirect",uniforms:Wo(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ui,blending:mr});r.uniforms.tEquirect.value=t;let o=new Sn(i,r),a=t.minFilter;return t.minFilter===yr&&(t.minFilter=Vi),new Rh(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}},sh=new w,$y=new w,Qy=new fn,ts=class{constructor(e=new w(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=sh.subVectors(n,t).cross($y.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(sh),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Qy.getNormalMatrix(e),i=this.coplanarPoint(sh).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Hr=new ii,Gc=new w,vr=class{constructor(e=new ts,t=new ts,n=new ts,i=new ts,r=new ts,o=new ts){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ds){let n=this.planes,i=e.elements,r=i[0],o=i[1],a=i[2],c=i[3],l=i[4],u=i[5],h=i[6],f=i[7],d=i[8],g=i[9],y=i[10],m=i[11],p=i[12],b=i[13],_=i[14],T=i[15];if(n[0].setComponents(c-r,f-l,m-d,T-p).normalize(),n[1].setComponents(c+r,f+l,m+d,T+p).normalize(),n[2].setComponents(c+o,f+u,m+g,T+b).normalize(),n[3].setComponents(c-o,f-u,m-g,T-b).normalize(),n[4].setComponents(c-a,f-h,m-y,T-_).normalize(),t===Ds)n[5].setComponents(c+a,f+h,m+y,T+_).normalize();else if(t===Fa)n[5].setComponents(a,h,y,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Hr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Hr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Hr)}intersectsSprite(e){return Hr.center.set(0,0,0),Hr.radius=.7071067811865476,Hr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Hr)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Gc.x=i.normal.x>0?e.max.x:e.min.x,Gc.y=i.normal.y>0?e.max.y:e.min.y,Gc.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Gc)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};Jr=class s extends Si{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(i),l=a+1,u=c+1,h=e/a,f=t/c,d=[],g=[],y=[],m=[];for(let p=0;p<u;p++){let b=p*f-o;for(let _=0;_<l;_++){let T=_*h-r;g.push(T,-b,0),y.push(0,0,1),m.push(_/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let b=0;b<a;b++){let _=b+l*p,T=b+l*(p+1),P=b+1+l*(p+1),C=b+1+l*p;d.push(_,T,C),d.push(T,P,C)}this.setIndex(d),this.setAttribute("position",new pi(g,3)),this.setAttribute("normal",new pi(y,3)),this.setAttribute("uv",new pi(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}},t_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,n_=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,i_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,s_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,r_=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,o_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,a_=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,c_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,l_=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,u_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,h_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,f_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,d_=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,p_=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,m_=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,g_=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,x_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,y_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,__=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,v_=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,b_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,M_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,S_=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,E_=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,T_=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,w_=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,A_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,R_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,C_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,P_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,I_="gl_FragColor = linearToOutputTexel( gl_FragColor );",L_=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,N_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,D_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,U_=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,F_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,B_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,O_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,k_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,z_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,H_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,V_=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,G_=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,W_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,X_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,q_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Y_=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,j_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Z_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,K_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,J_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,$_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Q_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ev=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,tv=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,nv=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,iv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,sv=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,rv=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ov=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,av=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,cv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,lv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,uv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,hv=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,fv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,dv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,pv=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,mv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,gv=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,xv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,yv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,_v=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,vv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Mv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Sv=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Ev=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Tv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,wv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Av=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Rv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Cv=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Pv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Iv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Lv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Nv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Dv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Uv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Fv=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Bv=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Ov=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,kv=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,zv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Hv=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Vv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Gv=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Wv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Xv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,qv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Yv=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,jv=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Zv=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Kv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Jv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,$v=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Qv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,eb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,tb=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ib=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ob=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ab=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,cb=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,lb=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,ub=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,hb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fb=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,db=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,pb=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,mb=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gb=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xb=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yb=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,_b=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vb=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,bb=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Mb=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Sb=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Eb=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Tb=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wb=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ab=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rb=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Cb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Pb=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ib=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Lb=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Nb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,hn={alphahash_fragment:t_,alphahash_pars_fragment:n_,alphamap_fragment:i_,alphamap_pars_fragment:s_,alphatest_fragment:r_,alphatest_pars_fragment:o_,aomap_fragment:a_,aomap_pars_fragment:c_,batching_pars_vertex:l_,batching_vertex:u_,begin_vertex:h_,beginnormal_vertex:f_,bsdfs:d_,iridescence_fragment:p_,bumpmap_pars_fragment:m_,clipping_planes_fragment:g_,clipping_planes_pars_fragment:x_,clipping_planes_pars_vertex:y_,clipping_planes_vertex:__,color_fragment:v_,color_pars_fragment:b_,color_pars_vertex:M_,color_vertex:S_,common:E_,cube_uv_reflection_fragment:T_,defaultnormal_vertex:w_,displacementmap_pars_vertex:A_,displacementmap_vertex:R_,emissivemap_fragment:C_,emissivemap_pars_fragment:P_,colorspace_fragment:I_,colorspace_pars_fragment:L_,envmap_fragment:N_,envmap_common_pars_fragment:D_,envmap_pars_fragment:U_,envmap_pars_vertex:F_,envmap_physical_pars_fragment:j_,envmap_vertex:B_,fog_vertex:O_,fog_pars_vertex:k_,fog_fragment:z_,fog_pars_fragment:H_,gradientmap_pars_fragment:V_,lightmap_fragment:G_,lightmap_pars_fragment:W_,lights_lambert_fragment:X_,lights_lambert_pars_fragment:q_,lights_pars_begin:Y_,lights_toon_fragment:Z_,lights_toon_pars_fragment:K_,lights_phong_fragment:J_,lights_phong_pars_fragment:$_,lights_physical_fragment:Q_,lights_physical_pars_fragment:ev,lights_fragment_begin:tv,lights_fragment_maps:nv,lights_fragment_end:iv,logdepthbuf_fragment:sv,logdepthbuf_pars_fragment:rv,logdepthbuf_pars_vertex:ov,logdepthbuf_vertex:av,map_fragment:cv,map_pars_fragment:lv,map_particle_fragment:uv,map_particle_pars_fragment:hv,metalnessmap_fragment:fv,metalnessmap_pars_fragment:dv,morphcolor_vertex:pv,morphnormal_vertex:mv,morphtarget_pars_vertex:gv,morphtarget_vertex:xv,normal_fragment_begin:yv,normal_fragment_maps:_v,normal_pars_fragment:vv,normal_pars_vertex:bv,normal_vertex:Mv,normalmap_pars_fragment:Sv,clearcoat_normal_fragment_begin:Ev,clearcoat_normal_fragment_maps:Tv,clearcoat_pars_fragment:wv,iridescence_pars_fragment:Av,opaque_fragment:Rv,packing:Cv,premultiplied_alpha_fragment:Pv,project_vertex:Iv,dithering_fragment:Lv,dithering_pars_fragment:Nv,roughnessmap_fragment:Dv,roughnessmap_pars_fragment:Uv,shadowmap_pars_fragment:Fv,shadowmap_pars_vertex:Bv,shadowmap_vertex:Ov,shadowmask_pars_fragment:kv,skinbase_vertex:zv,skinning_pars_vertex:Hv,skinning_vertex:Vv,skinnormal_vertex:Gv,specularmap_fragment:Wv,specularmap_pars_fragment:Xv,tonemapping_fragment:qv,tonemapping_pars_fragment:Yv,transmission_fragment:jv,transmission_pars_fragment:Zv,uv_pars_fragment:Kv,uv_pars_vertex:Jv,uv_vertex:$v,worldpos_vertex:Qv,background_vert:eb,background_frag:tb,backgroundCube_vert:nb,backgroundCube_frag:ib,cube_vert:sb,cube_frag:rb,depth_vert:ob,depth_frag:ab,distanceRGBA_vert:cb,distanceRGBA_frag:lb,equirect_vert:ub,equirect_frag:hb,linedashed_vert:fb,linedashed_frag:db,meshbasic_vert:pb,meshbasic_frag:mb,meshlambert_vert:gb,meshlambert_frag:xb,meshmatcap_vert:yb,meshmatcap_frag:_b,meshnormal_vert:vb,meshnormal_frag:bb,meshphong_vert:Mb,meshphong_frag:Sb,meshphysical_vert:Eb,meshphysical_frag:Tb,meshtoon_vert:wb,meshtoon_frag:Ab,points_vert:Rb,points_frag:Cb,shadow_vert:Pb,shadow_frag:Ib,sprite_vert:Lb,sprite_frag:Nb},Xe={common:{diffuse:{value:new It(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new fn},alphaMap:{value:null},alphaMapTransform:{value:new fn},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new fn}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new fn}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new fn}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new fn},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new fn},normalScale:{value:new nt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new fn},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new fn}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new fn}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new fn}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new It(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new It(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new fn},alphaTest:{value:0},uvTransform:{value:new fn}},sprite:{diffuse:{value:new It(16777215)},opacity:{value:1},center:{value:new nt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new fn},alphaMap:{value:null},alphaMapTransform:{value:new fn},alphaTest:{value:0}}},Ps={basic:{uniforms:Hi([Xe.common,Xe.specularmap,Xe.envmap,Xe.aomap,Xe.lightmap,Xe.fog]),vertexShader:hn.meshbasic_vert,fragmentShader:hn.meshbasic_frag},lambert:{uniforms:Hi([Xe.common,Xe.specularmap,Xe.envmap,Xe.aomap,Xe.lightmap,Xe.emissivemap,Xe.bumpmap,Xe.normalmap,Xe.displacementmap,Xe.fog,Xe.lights,{emissive:{value:new It(0)}}]),vertexShader:hn.meshlambert_vert,fragmentShader:hn.meshlambert_frag},phong:{uniforms:Hi([Xe.common,Xe.specularmap,Xe.envmap,Xe.aomap,Xe.lightmap,Xe.emissivemap,Xe.bumpmap,Xe.normalmap,Xe.displacementmap,Xe.fog,Xe.lights,{emissive:{value:new It(0)},specular:{value:new It(1118481)},shininess:{value:30}}]),vertexShader:hn.meshphong_vert,fragmentShader:hn.meshphong_frag},standard:{uniforms:Hi([Xe.common,Xe.envmap,Xe.aomap,Xe.lightmap,Xe.emissivemap,Xe.bumpmap,Xe.normalmap,Xe.displacementmap,Xe.roughnessmap,Xe.metalnessmap,Xe.fog,Xe.lights,{emissive:{value:new It(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:hn.meshphysical_vert,fragmentShader:hn.meshphysical_frag},toon:{uniforms:Hi([Xe.common,Xe.aomap,Xe.lightmap,Xe.emissivemap,Xe.bumpmap,Xe.normalmap,Xe.displacementmap,Xe.gradientmap,Xe.fog,Xe.lights,{emissive:{value:new It(0)}}]),vertexShader:hn.meshtoon_vert,fragmentShader:hn.meshtoon_frag},matcap:{uniforms:Hi([Xe.common,Xe.bumpmap,Xe.normalmap,Xe.displacementmap,Xe.fog,{matcap:{value:null}}]),vertexShader:hn.meshmatcap_vert,fragmentShader:hn.meshmatcap_frag},points:{uniforms:Hi([Xe.points,Xe.fog]),vertexShader:hn.points_vert,fragmentShader:hn.points_frag},dashed:{uniforms:Hi([Xe.common,Xe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:hn.linedashed_vert,fragmentShader:hn.linedashed_frag},depth:{uniforms:Hi([Xe.common,Xe.displacementmap]),vertexShader:hn.depth_vert,fragmentShader:hn.depth_frag},normal:{uniforms:Hi([Xe.common,Xe.bumpmap,Xe.normalmap,Xe.displacementmap,{opacity:{value:1}}]),vertexShader:hn.meshnormal_vert,fragmentShader:hn.meshnormal_frag},sprite:{uniforms:Hi([Xe.sprite,Xe.fog]),vertexShader:hn.sprite_vert,fragmentShader:hn.sprite_frag},background:{uniforms:{uvTransform:{value:new fn},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:hn.background_vert,fragmentShader:hn.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:hn.backgroundCube_vert,fragmentShader:hn.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:hn.cube_vert,fragmentShader:hn.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:hn.equirect_vert,fragmentShader:hn.equirect_frag},distanceRGBA:{uniforms:Hi([Xe.common,Xe.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:hn.distanceRGBA_vert,fragmentShader:hn.distanceRGBA_frag},shadow:{uniforms:Hi([Xe.lights,Xe.fog,{color:{value:new It(0)},opacity:{value:1}}]),vertexShader:hn.shadow_vert,fragmentShader:hn.shadow_frag}};Ps.physical={uniforms:Hi([Ps.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new fn},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new fn},clearcoatNormalScale:{value:new nt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new fn},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new fn},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new fn},sheen:{value:0},sheenColor:{value:new It(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new fn},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new fn},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new fn},transmissionSamplerSize:{value:new nt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new fn},attenuationDistance:{value:0},attenuationColor:{value:new It(0)},specularColor:{value:new It(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new fn},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new fn},anisotropyVector:{value:new nt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new fn}}]),vertexShader:hn.meshphysical_vert,fragmentShader:hn.meshphysical_frag};Wc={r:0,b:0,g:0};br=class extends hl{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,o=n+e,a=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Po=4,$p=[.125,.215,.35,.446,.526,.582],Wr=20,rh=new br,Qp=new It,oh=null,ah=0,ch=0,Gr=(1+Math.sqrt(5))/2,Ao=1/Gr,em=[new w(1,1,1),new w(-1,1,1),new w(1,1,-1),new w(-1,1,-1),new w(0,Gr,Ao),new w(0,Gr,-Ao),new w(Ao,0,Gr),new w(-Ao,0,Gr),new w(Gr,Ao,0),new w(-Gr,Ao,0)],dl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){oh=this._renderer.getRenderTarget(),ah=this._renderer.getActiveCubeFace(),ch=this._renderer.getActiveMipmapLevel(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=im(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=nm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(oh,ah,ch),e.scissorTest=!1,Xc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Fo||e.mapping===Bo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),oh=this._renderer.getRenderTarget(),ah=this._renderer.getActiveCubeFace(),ch=this._renderer.getActiveMipmapLevel();let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Vi,minFilter:Vi,generateMipmaps:!1,type:Zr,format:is,colorSpace:mi,depthBuffer:!1},i=tm(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=tm(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=zb(r)),this._blurMaterial=Hb(r,e,t)}return i}_compileMaterial(e){let t=new Sn(this._lodPlanes[0],e);this._renderer.compile(t,rh)}_sceneToCubeUV(e,t,n,i){let a=new di(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(Qp),u.toneMapping=gr,u.autoClear=!1;let d=new Wi({name:"PMREM.Background",side:Ui,depthWrite:!1,depthTest:!1}),g=new Sn(new ka,d),y=!1,m=e.background;m?m.isColor&&(d.color.copy(m),e.background=null,y=!0):(d.color.copy(Qp),y=!0);for(let p=0;p<6;p++){let b=p%3;b===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):b===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));let _=this._cubeSize;Xc(i,b*_,p>2?_:0,_,_),u.setRenderTarget(i),y&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===Fo||e.mapping===Bo;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=im()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=nm());let r=i?this._cubemapMaterial:this._equirectMaterial,o=new Sn(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let c=this._cubeSize;Xc(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,rh)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){let r=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=em[(i-1)%em.length];this._blur(e,i-1,i,r,o)}t.autoClear=n}_blur(e,t,n,i,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",r),this._halfBlur(o,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,h=new Sn(this._lodPlanes[i],l),f=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Wr-1),y=r/g,m=isFinite(r)?1+Math.floor(u*y):Wr;m>Wr&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Wr}`);let p=[],b=0;for(let M=0;M<Wr;++M){let z=M/y,v=Math.exp(-z*z/2);p.push(v),M===0?b+=v:M<m&&(b+=2*v)}for(let M=0;M<p.length;M++)p[M]=p[M]/b;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:_}=this;f.dTheta.value=g,f.mipInt.value=_-n;let T=this._sizeLods[i],P=3*T*(i>_-Po?i-_+Po:0),C=4*(this._cubeSize-T);Xc(t,P,C,3*T,2*T),c.setRenderTarget(t),c.render(h,rh)}};pl=class extends Fi{constructor(e,t,n,i,r,o,a,c,l,u){if(u=u!==void 0?u:qr,u!==qr&&u!==Oo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===qr&&(n=dr),n===void 0&&u===Oo&&(n=Xr),super(null,i,r,o,a,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:fi,this.minFilter=c!==void 0?c:fi,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},c0=new Fi,l0=new pl(1,1);l0.compareFunction=i0;u0=new ul,h0=new Ah,f0=new fl,sm=[],rm=[],om=new Float32Array(16),am=new Float32Array(9),cm=new Float32Array(4);Ph=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=gM(t.type)}},Ih=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=FM(t.type)}},Lh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(e,t[a.id],n)}}},lh=/(\w+)(\])?(\[|\.)?/g;Do=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=e.getActiveUniform(t,i),o=e.getUniformLocation(t,r.name);BM(r,o,this)}}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){let a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let o=e[i];o.id in t&&n.push(o)}return n}};OM=37297,kM=0;jM=/^[ \t]*#include +<([\w\d./]+)>/gm;ZM=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);JM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;rS=0,Dh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Uh(e),t.set(e,n)),n}},Uh=class{constructor(e){this.id=rS++,this.code=e,this.usedTimes=0}};fS=0;Fh=class extends rs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ly,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Bh=class extends rs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},gS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,xS=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;Oh=class extends di{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},Us=class extends Zn{constructor(){super(),this.isGroup=!0,this.type="Group"}},MS={type:"move"},La=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Us,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Us,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Us,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let y of e.hand.values()){let m=t.getJointPose(y,n),p=this._getHandJoint(l,y);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(MS)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Us;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},kh=class extends _r{constructor(e,t){super();let n=this,i=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,h=null,f=null,d=null,g=null,y=t.getContextAttributes(),m=null,p=null,b=[],_=[],T=new nt,P=null,C=new di;C.layers.enable(1),C.viewport=new Ln;let M=new di;M.layers.enable(2),M.viewport=new Ln;let z=[C,M],v=new Oh;v.layers.enable(1),v.layers.enable(2);let R=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(he){let Ue=b[he];return Ue===void 0&&(Ue=new La,b[he]=Ue),Ue.getTargetRaySpace()},this.getControllerGrip=function(he){let Ue=b[he];return Ue===void 0&&(Ue=new La,b[he]=Ue),Ue.getGripSpace()},this.getHand=function(he){let Ue=b[he];return Ue===void 0&&(Ue=new La,b[he]=Ue),Ue.getHandSpace()};function O(he){let Ue=_.indexOf(he.inputSource);if(Ue===-1)return;let Qe=b[Ue];Qe!==void 0&&(Qe.update(he.inputSource,he.frame,l||o),Qe.dispatchEvent({type:he.type,data:he.inputSource}))}function j(){i.removeEventListener("select",O),i.removeEventListener("selectstart",O),i.removeEventListener("selectend",O),i.removeEventListener("squeeze",O),i.removeEventListener("squeezestart",O),i.removeEventListener("squeezeend",O),i.removeEventListener("end",j),i.removeEventListener("inputsourceschange",B);for(let he=0;he<b.length;he++){let Ue=_[he];Ue!==null&&(_[he]=null,b[he].disconnect(Ue))}R=null,V=null,e.setRenderTarget(m),d=null,f=null,h=null,i=null,p=null,ht.stop(),n.isPresenting=!1,e.setPixelRatio(P),e.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(he){r=he,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(he){a=he,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(he){l=he},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(he){if(i=he,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",O),i.addEventListener("selectstart",O),i.addEventListener("selectend",O),i.addEventListener("squeeze",O),i.addEventListener("squeezestart",O),i.addEventListener("squeezeend",O),i.addEventListener("end",j),i.addEventListener("inputsourceschange",B),y.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(T),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){let Ue={antialias:i.renderState.layers===void 0?y.antialias:!0,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(i,t,Ue),i.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),p=new ps(d.framebufferWidth,d.framebufferHeight,{format:is,type:xr,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil})}else{let Ue=null,Qe=null,Tt=null;y.depth&&(Tt=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Ue=y.stencil?Oo:qr,Qe=y.stencil?Xr:dr);let wt={colorFormat:t.RGBA8,depthFormat:Tt,scaleFactor:r};h=new XRWebGLBinding(i,t),f=h.createProjectionLayer(wt),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),p=new ps(f.textureWidth,f.textureHeight,{format:is,type:xr,depthTexture:new pl(f.textureWidth,f.textureHeight,Qe,void 0,void 0,void 0,void 0,void 0,void 0,Ue),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0});let jt=e.properties.get(p);jt.__ignoreDepthValues=f.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),ht.setContext(i),ht.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function B(he){for(let Ue=0;Ue<he.removed.length;Ue++){let Qe=he.removed[Ue],Tt=_.indexOf(Qe);Tt>=0&&(_[Tt]=null,b[Tt].disconnect(Qe))}for(let Ue=0;Ue<he.added.length;Ue++){let Qe=he.added[Ue],Tt=_.indexOf(Qe);if(Tt===-1){for(let jt=0;jt<b.length;jt++)if(jt>=_.length){_.push(Qe),Tt=jt;break}else if(_[jt]===null){_[jt]=Qe,Tt=jt;break}if(Tt===-1)break}let wt=b[Tt];wt&&wt.connect(Qe)}}let Y=new w,Z=new w;function Ee(he,Ue,Qe){Y.setFromMatrixPosition(Ue.matrixWorld),Z.setFromMatrixPosition(Qe.matrixWorld);let Tt=Y.distanceTo(Z),wt=Ue.projectionMatrix.elements,jt=Qe.projectionMatrix.elements,$t=wt[14]/(wt[10]-1),Gt=wt[14]/(wt[10]+1),xn=(wt[9]+1)/wt[5],re=(wt[9]-1)/wt[5],Wn=(wt[8]-1)/wt[0],zt=(jt[8]+1)/jt[0],Dt=$t*Wn,ot=$t*zt,On=Tt/(-Wn+zt),Ut=On*-Wn;Ue.matrixWorld.decompose(he.position,he.quaternion,he.scale),he.translateX(Ut),he.translateZ(On),he.matrixWorld.compose(he.position,he.quaternion,he.scale),he.matrixWorldInverse.copy(he.matrixWorld).invert();let N=$t+On,A=Gt+On,ie=Dt-Ut,Ce=ot+(Tt-Ut),Ie=xn*Gt/A*N,ke=re*Gt/A*N;he.projectionMatrix.makePerspective(ie,Ce,Ie,ke,N,A),he.projectionMatrixInverse.copy(he.projectionMatrix).invert()}function ae(he,Ue){Ue===null?he.matrixWorld.copy(he.matrix):he.matrixWorld.multiplyMatrices(Ue.matrixWorld,he.matrix),he.matrixWorldInverse.copy(he.matrixWorld).invert()}this.updateCamera=function(he){if(i===null)return;v.near=M.near=C.near=he.near,v.far=M.far=C.far=he.far,(R!==v.near||V!==v.far)&&(i.updateRenderState({depthNear:v.near,depthFar:v.far}),R=v.near,V=v.far);let Ue=he.parent,Qe=v.cameras;ae(v,Ue);for(let Tt=0;Tt<Qe.length;Tt++)ae(Qe[Tt],Ue);Qe.length===2?Ee(v,C,M):v.projectionMatrix.copy(C.projectionMatrix),_e(he,v,Ue)};function _e(he,Ue,Qe){Qe===null?he.matrix.copy(Ue.matrixWorld):(he.matrix.copy(Qe.matrixWorld),he.matrix.invert(),he.matrix.multiply(Ue.matrixWorld)),he.matrix.decompose(he.position,he.quaternion,he.scale),he.updateMatrixWorld(!0),he.projectionMatrix.copy(Ue.projectionMatrix),he.projectionMatrixInverse.copy(Ue.projectionMatrixInverse),he.isPerspectiveCamera&&(he.fov=zo*2*Math.atan(1/he.projectionMatrix.elements[5]),he.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(he){c=he,f!==null&&(f.fixedFoveation=he),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=he)};let Te=null;function Be(he,Ue){if(u=Ue.getViewerPose(l||o),g=Ue,u!==null){let Qe=u.views;d!==null&&(e.setRenderTargetFramebuffer(p,d.framebuffer),e.setRenderTarget(p));let Tt=!1;Qe.length!==v.cameras.length&&(v.cameras.length=0,Tt=!0);for(let wt=0;wt<Qe.length;wt++){let jt=Qe[wt],$t=null;if(d!==null)$t=d.getViewport(jt);else{let xn=h.getViewSubImage(f,jt);$t=xn.viewport,wt===0&&(e.setRenderTargetTextures(p,xn.colorTexture,f.ignoreDepthValues?void 0:xn.depthStencilTexture),e.setRenderTarget(p))}let Gt=z[wt];Gt===void 0&&(Gt=new di,Gt.layers.enable(wt),Gt.viewport=new Ln,z[wt]=Gt),Gt.matrix.fromArray(jt.transform.matrix),Gt.matrix.decompose(Gt.position,Gt.quaternion,Gt.scale),Gt.projectionMatrix.fromArray(jt.projectionMatrix),Gt.projectionMatrixInverse.copy(Gt.projectionMatrix).invert(),Gt.viewport.set($t.x,$t.y,$t.width,$t.height),wt===0&&(v.matrix.copy(Gt.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),Tt===!0&&v.cameras.push(Gt)}}for(let Qe=0;Qe<b.length;Qe++){let Tt=_[Qe],wt=b[Qe];Tt!==null&&wt!==void 0&&wt.update(Tt,Ue,l||o)}Te&&Te(he,Ue),Ue.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Ue}),g=null}let ht=new a0;ht.setAnimationLoop(Be),this.setAnimationLoop=function(he){Te=he},this.dispose=function(){}}};za=class{constructor(e={}){let{canvas:t=Ny(),context:n=null,depth:i=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=o;let d=new Uint32Array(4),g=new Int32Array(4),y=null,m=null,p=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Gn,this._useLegacyLights=!1,this.toneMapping=gr,this.toneMappingExposure=1;let _=this,T=!1,P=0,C=0,M=null,z=-1,v=null,R=new Ln,V=new Ln,O=null,j=new It(0),B=0,Y=t.width,Z=t.height,Ee=1,ae=null,_e=null,Te=new Ln(0,0,Y,Z),Be=new Ln(0,0,Y,Z),ht=!1,he=new vr,Ue=!1,Qe=!1,Tt=null,wt=new vt,jt=new nt,$t=new w,Gt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function xn(){return M===null?Ee:1}let re=n;function Wn(I,K){for(let oe=0;oe<I.length;oe++){let ce=I[oe],Q=t.getContext(ce,K);if(Q!==null)return Q}return null}try{let I={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ka}`),t.addEventListener("webglcontextlost",He,!1),t.addEventListener("webglcontextrestored",H,!1),t.addEventListener("webglcontextcreationerror",Ye,!1),re===null){let K=["webgl2","webgl","experimental-webgl"];if(_.isWebGL1Renderer===!0&&K.shift(),re=Wn(K,I),re===null)throw Wn(K)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext!="undefined"&&re instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),re.getShaderPrecisionFormat===void 0&&(re.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(I){throw console.error("THREE.WebGLRenderer: "+I.message),I}let zt,Dt,ot,On,Ut,N,A,ie,Ce,Ie,ke,St,Ke,st,At,Ht,Fe,Pe,Le,bt,Et,et,Mt,Qt;function kn(){zt=new Gb(re),Dt=new Bb(re,zt,e),zt.init(Dt),et=new bS(re,zt,Dt),ot=new _S(re,zt,Dt),On=new qb(re),Ut=new aS,N=new vS(re,zt,ot,Ut,Dt,et,On),A=new kb(_),ie=new Vb(_),Ce=new e_(re,Dt),Mt=new Ub(re,zt,Ce,Dt),Ie=new Wb(re,Ce,On,Mt),ke=new Kb(re,Ie,Ce,On),Le=new Zb(re,Dt,N),Ht=new Ob(Ut),St=new oS(_,A,ie,zt,Dt,Mt,Ht),Ke=new SS(_,Ut),st=new lS,At=new mS(zt,Dt),Pe=new Db(_,A,ie,ot,ke,f,c),Fe=new yS(_,ke,Dt),Qt=new ES(re,On,Dt,ot),bt=new Fb(re,zt,On,Dt),Et=new Xb(re,zt,On,Dt),On.programs=St.programs,_.capabilities=Dt,_.extensions=zt,_.properties=Ut,_.renderLists=st,_.shadowMap=Fe,_.state=ot,_.info=On}kn();let Ft=new kh(_,re);this.xr=Ft,this.getContext=function(){return re},this.getContextAttributes=function(){return re.getContextAttributes()},this.forceContextLoss=function(){let I=zt.get("WEBGL_lose_context");I&&I.loseContext()},this.forceContextRestore=function(){let I=zt.get("WEBGL_lose_context");I&&I.restoreContext()},this.getPixelRatio=function(){return Ee},this.setPixelRatio=function(I){I!==void 0&&(Ee=I,this.setSize(Y,Z,!1))},this.getSize=function(I){return I.set(Y,Z)},this.setSize=function(I,K,oe=!0){if(Ft.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=I,Z=K,t.width=Math.floor(I*Ee),t.height=Math.floor(K*Ee),oe===!0&&(t.style.width=I+"px",t.style.height=K+"px"),this.setViewport(0,0,I,K)},this.getDrawingBufferSize=function(I){return I.set(Y*Ee,Z*Ee).floor()},this.setDrawingBufferSize=function(I,K,oe){Y=I,Z=K,Ee=oe,t.width=Math.floor(I*oe),t.height=Math.floor(K*oe),this.setViewport(0,0,I,K)},this.getCurrentViewport=function(I){return I.copy(R)},this.getViewport=function(I){return I.copy(Te)},this.setViewport=function(I,K,oe,ce){I.isVector4?Te.set(I.x,I.y,I.z,I.w):Te.set(I,K,oe,ce),ot.viewport(R.copy(Te).multiplyScalar(Ee).floor())},this.getScissor=function(I){return I.copy(Be)},this.setScissor=function(I,K,oe,ce){I.isVector4?Be.set(I.x,I.y,I.z,I.w):Be.set(I,K,oe,ce),ot.scissor(V.copy(Be).multiplyScalar(Ee).floor())},this.getScissorTest=function(){return ht},this.setScissorTest=function(I){ot.setScissorTest(ht=I)},this.setOpaqueSort=function(I){ae=I},this.setTransparentSort=function(I){_e=I},this.getClearColor=function(I){return I.copy(Pe.getClearColor())},this.setClearColor=function(){Pe.setClearColor.apply(Pe,arguments)},this.getClearAlpha=function(){return Pe.getClearAlpha()},this.setClearAlpha=function(){Pe.setClearAlpha.apply(Pe,arguments)},this.clear=function(I=!0,K=!0,oe=!0){let ce=0;if(I){let Q=!1;if(M!==null){let Re=M.texture.format;Q=Re===$m||Re===Jm||Re===Km}if(Q){let Re=M.texture.type,yt=Re===xr||Re===dr||Re===hf||Re===Xr||Re===jm||Re===Zm,Je=Pe.getClearColor(),Vt=Pe.getClearAlpha(),Yt=Je.r,Zt=Je.g,Kt=Je.b;yt?(d[0]=Yt,d[1]=Zt,d[2]=Kt,d[3]=Vt,re.clearBufferuiv(re.COLOR,0,d)):(g[0]=Yt,g[1]=Zt,g[2]=Kt,g[3]=Vt,re.clearBufferiv(re.COLOR,0,g))}else ce|=re.COLOR_BUFFER_BIT}K&&(ce|=re.DEPTH_BUFFER_BIT),oe&&(ce|=re.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),re.clear(ce)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",He,!1),t.removeEventListener("webglcontextrestored",H,!1),t.removeEventListener("webglcontextcreationerror",Ye,!1),st.dispose(),At.dispose(),Ut.dispose(),A.dispose(),ie.dispose(),ke.dispose(),Mt.dispose(),Qt.dispose(),St.dispose(),Ft.dispose(),Ft.removeEventListener("sessionstart",$n),Ft.removeEventListener("sessionend",an),Tt&&(Tt.dispose(),Tt=null),En.stop()};function He(I){I.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function H(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let I=On.autoReset,K=Fe.enabled,oe=Fe.autoUpdate,ce=Fe.needsUpdate,Q=Fe.type;kn(),On.autoReset=I,Fe.enabled=K,Fe.autoUpdate=oe,Fe.needsUpdate=ce,Fe.type=Q}function Ye(I){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",I.statusMessage)}function je(I){let K=I.target;K.removeEventListener("dispose",je),Wt(K)}function Wt(I){Bt(I),Ut.remove(I)}function Bt(I){let K=Ut.get(I).programs;K!==void 0&&(K.forEach(function(oe){St.releaseProgram(oe)}),I.isShaderMaterial&&St.releaseShaderCache(I))}this.renderBufferDirect=function(I,K,oe,ce,Q,Re){K===null&&(K=Gt);let yt=Q.isMesh&&Q.matrixWorld.determinant()<0,Je=pc(I,K,oe,ce,Q);ot.setMaterial(ce,yt);let Vt=oe.index,Yt=1;if(ce.wireframe===!0){if(Vt=Ie.getWireframeAttribute(oe),Vt===void 0)return;Yt=2}let Zt=oe.drawRange,Kt=oe.attributes.position,wn=Zt.start*Yt,ri=(Zt.start+Zt.count)*Yt;Re!==null&&(wn=Math.max(wn,Re.start*Yt),ri=Math.min(ri,(Re.start+Re.count)*Yt)),Vt!==null?(wn=Math.max(wn,0),ri=Math.min(ri,Vt.count)):Kt!=null&&(wn=Math.max(wn,0),ri=Math.min(ri,Kt.count));let Un=ri-wn;if(Un<0||Un===1/0)return;Mt.setup(Q,ce,Je,oe,Vt);let _i,Fn=bt;if(Vt!==null&&(_i=Ce.get(Vt),Fn=Et,Fn.setIndex(_i)),Q.isMesh)ce.wireframe===!0?(ot.setLineWidth(ce.wireframeLinewidth*xn()),Fn.setMode(re.LINES)):Fn.setMode(re.TRIANGLES);else if(Q.isLine){let tn=ce.linewidth;tn===void 0&&(tn=1),ot.setLineWidth(tn*xn()),Q.isLineSegments?Fn.setMode(re.LINES):Q.isLineLoop?Fn.setMode(re.LINE_LOOP):Fn.setMode(re.LINE_STRIP)}else Q.isPoints?Fn.setMode(re.POINTS):Q.isSprite&&Fn.setMode(re.TRIANGLES);if(Q.isBatchedMesh)Fn.renderMultiDraw(Q._multiDrawStarts,Q._multiDrawCounts,Q._multiDrawCount);else if(Q.isInstancedMesh)Fn.renderInstances(wn,Un,Q.count);else if(oe.isInstancedBufferGeometry){let tn=oe._maxInstanceCount!==void 0?oe._maxInstanceCount:1/0,fa=Math.min(oe.instanceCount,tn);Fn.renderInstances(wn,Un,fa)}else Fn.render(wn,Un)};function bn(I,K,oe){I.transparent===!0&&I.side===Mi&&I.forceSinglePass===!1?(I.side=Ui,I.needsUpdate=!0,os(I,K,oe),I.side=Gi,I.needsUpdate=!0,os(I,K,oe),I.side=Mi):os(I,K,oe)}this.compile=function(I,K,oe=null){oe===null&&(oe=I),m=At.get(oe),m.init(),b.push(m),oe.traverseVisible(function(Q){Q.isLight&&Q.layers.test(K.layers)&&(m.pushLight(Q),Q.castShadow&&m.pushShadow(Q))}),I!==oe&&I.traverseVisible(function(Q){Q.isLight&&Q.layers.test(K.layers)&&(m.pushLight(Q),Q.castShadow&&m.pushShadow(Q))}),m.setupLights(_._useLegacyLights);let ce=new Set;return I.traverse(function(Q){let Re=Q.material;if(Re)if(Array.isArray(Re))for(let yt=0;yt<Re.length;yt++){let Je=Re[yt];bn(Je,oe,Q),ce.add(Je)}else bn(Re,oe,Q),ce.add(Re)}),b.pop(),m=null,ce},this.compileAsync=function(I,K,oe=null){let ce=this.compile(I,K,oe);return new Promise(Q=>{function Re(){if(ce.forEach(function(yt){Ut.get(yt).currentProgram.isReady()&&ce.delete(yt)}),ce.size===0){Q(I);return}setTimeout(Re,10)}zt.get("KHR_parallel_shader_compile")!==null?Re():setTimeout(Re,10)})};let yn=null;function Jn(I){yn&&yn(I)}function $n(){En.stop()}function an(){En.start()}let En=new a0;En.setAnimationLoop(Jn),typeof self!="undefined"&&En.setContext(self),this.setAnimationLoop=function(I){yn=I,Ft.setAnimationLoop(I),I===null?En.stop():En.start()},Ft.addEventListener("sessionstart",$n),Ft.addEventListener("sessionend",an),this.render=function(I,K){if(K!==void 0&&K.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),K.parent===null&&K.matrixWorldAutoUpdate===!0&&K.updateMatrixWorld(),Ft.enabled===!0&&Ft.isPresenting===!0&&(Ft.cameraAutoUpdate===!0&&Ft.updateCamera(K),K=Ft.getCamera()),I.isScene===!0&&I.onBeforeRender(_,I,K,M),m=At.get(I,b.length),m.init(),b.push(m),wt.multiplyMatrices(K.projectionMatrix,K.matrixWorldInverse),he.setFromProjectionMatrix(wt),Qe=this.localClippingEnabled,Ue=Ht.init(this.clippingPlanes,Qe),y=st.get(I,p.length),y.init(),p.push(y),Bi(I,K,0,_.sortObjects),y.finish(),_.sortObjects===!0&&y.sort(ae,_e),this.info.render.frame++,Ue===!0&&Ht.beginShadows();let oe=m.state.shadowsArray;if(Fe.render(oe,I,K),Ue===!0&&Ht.endShadows(),this.info.autoReset===!0&&this.info.reset(),Pe.render(y,I),m.setupLights(_._useLegacyLights),K.isArrayCamera){let ce=K.cameras;for(let Q=0,Re=ce.length;Q<Re;Q++){let yt=ce[Q];dc(y,I,yt,yt.viewport)}}else dc(y,I,K);M!==null&&(N.updateMultisampleRenderTarget(M),N.updateRenderTargetMipmap(M)),I.isScene===!0&&I.onAfterRender(_,I,K),Mt.resetDefaultState(),z=-1,v=null,b.pop(),b.length>0?m=b[b.length-1]:m=null,p.pop(),p.length>0?y=p[p.length-1]:y=null};function Bi(I,K,oe,ce){if(I.visible===!1)return;if(I.layers.test(K.layers)){if(I.isGroup)oe=I.renderOrder;else if(I.isLOD)I.autoUpdate===!0&&I.update(K);else if(I.isLight)m.pushLight(I),I.castShadow&&m.pushShadow(I);else if(I.isSprite){if(!I.frustumCulled||he.intersectsSprite(I)){ce&&$t.setFromMatrixPosition(I.matrixWorld).applyMatrix4(wt);let yt=ke.update(I),Je=I.material;Je.visible&&y.push(I,yt,Je,oe,$t.z,null)}}else if((I.isMesh||I.isLine||I.isPoints)&&(!I.frustumCulled||he.intersectsObject(I))){let yt=ke.update(I),Je=I.material;if(ce&&(I.boundingSphere!==void 0?(I.boundingSphere===null&&I.computeBoundingSphere(),$t.copy(I.boundingSphere.center)):(yt.boundingSphere===null&&yt.computeBoundingSphere(),$t.copy(yt.boundingSphere.center)),$t.applyMatrix4(I.matrixWorld).applyMatrix4(wt)),Array.isArray(Je)){let Vt=yt.groups;for(let Yt=0,Zt=Vt.length;Yt<Zt;Yt++){let Kt=Vt[Yt],wn=Je[Kt.materialIndex];wn&&wn.visible&&y.push(I,yt,wn,oe,$t.z,Kt)}}else Je.visible&&y.push(I,yt,Je,oe,$t.z,null)}}let Re=I.children;for(let yt=0,Je=Re.length;yt<Je;yt++)Bi(Re[yt],K,oe,ce)}function dc(I,K,oe,ce){let Q=I.opaque,Re=I.transmissive,yt=I.transparent;m.setupLightsView(oe),Ue===!0&&Ht.setGlobalState(_.clippingPlanes,oe),Re.length>0&&ks(Q,Re,K,oe),ce&&ot.viewport(R.copy(ce)),Q.length>0&&Pi(Q,K,oe),Re.length>0&&Pi(Re,K,oe),yt.length>0&&Pi(yt,K,oe),ot.buffers.depth.setTest(!0),ot.buffers.depth.setMask(!0),ot.buffers.color.setMask(!0),ot.setPolygonOffset(!1)}function ks(I,K,oe,ce){if((oe.isScene===!0?oe.overrideMaterial:null)!==null)return;let Re=Dt.isWebGL2;Tt===null&&(Tt=new ps(1,1,{generateMipmaps:!0,type:zt.has("EXT_color_buffer_half_float")?Zr:xr,minFilter:yr,samples:Re?4:0})),_.getDrawingBufferSize(jt),Re?Tt.setSize(jt.x,jt.y):Tt.setSize(al(jt.x),al(jt.y));let yt=_.getRenderTarget();_.setRenderTarget(Tt),_.getClearColor(j),B=_.getClearAlpha(),B<1&&_.setClearColor(16777215,.5),_.clear();let Je=_.toneMapping;_.toneMapping=gr,Pi(I,oe,ce),N.updateMultisampleRenderTarget(Tt),N.updateRenderTargetMipmap(Tt);let Vt=!1;for(let Yt=0,Zt=K.length;Yt<Zt;Yt++){let Kt=K[Yt],wn=Kt.object,ri=Kt.geometry,Un=Kt.material,_i=Kt.group;if(Un.side===Mi&&wn.layers.test(ce.layers)){let Fn=Un.side;Un.side=Ui,Un.needsUpdate=!0,Ji(wn,oe,ce,ri,Un,_i),Un.side=Fn,Un.needsUpdate=!0,Vt=!0}}Vt===!0&&(N.updateMultisampleRenderTarget(Tt),N.updateRenderTargetMipmap(Tt)),_.setRenderTarget(yt),_.setClearColor(j,B),_.toneMapping=Je}function Pi(I,K,oe){let ce=K.isScene===!0?K.overrideMaterial:null;for(let Q=0,Re=I.length;Q<Re;Q++){let yt=I[Q],Je=yt.object,Vt=yt.geometry,Yt=ce===null?yt.material:ce,Zt=yt.group;Je.layers.test(oe.layers)&&Ji(Je,K,oe,Vt,Yt,Zt)}}function Ji(I,K,oe,ce,Q,Re){I.onBeforeRender(_,K,oe,ce,Q,Re),I.modelViewMatrix.multiplyMatrices(oe.matrixWorldInverse,I.matrixWorld),I.normalMatrix.getNormalMatrix(I.modelViewMatrix),Q.onBeforeRender(_,K,oe,ce,I,Re),Q.transparent===!0&&Q.side===Mi&&Q.forceSinglePass===!1?(Q.side=Ui,Q.needsUpdate=!0,_.renderBufferDirect(oe,K,ce,Q,I,Re),Q.side=Gi,Q.needsUpdate=!0,_.renderBufferDirect(oe,K,ce,Q,I,Re),Q.side=Mi):_.renderBufferDirect(oe,K,ce,Q,I,Re),I.onAfterRender(_,K,oe,ce,Q,Re)}function os(I,K,oe){K.isScene!==!0&&(K=Gt);let ce=Ut.get(I),Q=m.state.lights,Re=m.state.shadowsArray,yt=Q.state.version,Je=St.getParameters(I,Q.state,Re,K,oe),Vt=St.getProgramCacheKey(Je),Yt=ce.programs;ce.environment=I.isMeshStandardMaterial?K.environment:null,ce.fog=K.fog,ce.envMap=(I.isMeshStandardMaterial?ie:A).get(I.envMap||ce.environment),Yt===void 0&&(I.addEventListener("dispose",je),Yt=new Map,ce.programs=Yt);let Zt=Yt.get(Vt);if(Zt!==void 0){if(ce.currentProgram===Zt&&ce.lightsStateVersion===yt)return ha(I,Je),Zt}else Je.uniforms=St.getUniforms(I),I.onBuild(oe,Je,_),I.onBeforeCompile(Je,_),Zt=St.acquireProgram(Je,Vt),Yt.set(Vt,Zt),ce.uniforms=Je.uniforms;let Kt=ce.uniforms;return(!I.isShaderMaterial&&!I.isRawShaderMaterial||I.clipping===!0)&&(Kt.clippingPlanes=Ht.uniform),ha(I,Je),ce.needsLights=yu(I),ce.lightsStateVersion=yt,ce.needsLights&&(Kt.ambientLightColor.value=Q.state.ambient,Kt.lightProbe.value=Q.state.probe,Kt.directionalLights.value=Q.state.directional,Kt.directionalLightShadows.value=Q.state.directionalShadow,Kt.spotLights.value=Q.state.spot,Kt.spotLightShadows.value=Q.state.spotShadow,Kt.rectAreaLights.value=Q.state.rectArea,Kt.ltc_1.value=Q.state.rectAreaLTC1,Kt.ltc_2.value=Q.state.rectAreaLTC2,Kt.pointLights.value=Q.state.point,Kt.pointLightShadows.value=Q.state.pointShadow,Kt.hemisphereLights.value=Q.state.hemi,Kt.directionalShadowMap.value=Q.state.directionalShadowMap,Kt.directionalShadowMatrix.value=Q.state.directionalShadowMatrix,Kt.spotShadowMap.value=Q.state.spotShadowMap,Kt.spotLightMatrix.value=Q.state.spotLightMatrix,Kt.spotLightMap.value=Q.state.spotLightMap,Kt.pointShadowMap.value=Q.state.pointShadowMap,Kt.pointShadowMatrix.value=Q.state.pointShadowMatrix),ce.currentProgram=Zt,ce.uniformsList=null,Zt}function io(I){if(I.uniformsList===null){let K=I.currentProgram.getUniforms();I.uniformsList=Do.seqWithValue(K.seq,I.uniforms)}return I.uniformsList}function ha(I,K){let oe=Ut.get(I);oe.outputColorSpace=K.outputColorSpace,oe.batching=K.batching,oe.instancing=K.instancing,oe.instancingColor=K.instancingColor,oe.skinning=K.skinning,oe.morphTargets=K.morphTargets,oe.morphNormals=K.morphNormals,oe.morphColors=K.morphColors,oe.morphTargetsCount=K.morphTargetsCount,oe.numClippingPlanes=K.numClippingPlanes,oe.numIntersection=K.numClipIntersection,oe.vertexAlphas=K.vertexAlphas,oe.vertexTangents=K.vertexTangents,oe.toneMapping=K.toneMapping}function pc(I,K,oe,ce,Q){K.isScene!==!0&&(K=Gt),N.resetTextureUnits();let Re=K.fog,yt=ce.isMeshStandardMaterial?K.environment:null,Je=M===null?_.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:mi,Vt=(ce.isMeshStandardMaterial?ie:A).get(ce.envMap||yt),Yt=ce.vertexColors===!0&&!!oe.attributes.color&&oe.attributes.color.itemSize===4,Zt=!!oe.attributes.tangent&&(!!ce.normalMap||ce.anisotropy>0),Kt=!!oe.morphAttributes.position,wn=!!oe.morphAttributes.normal,ri=!!oe.morphAttributes.color,Un=gr;ce.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(Un=_.toneMapping);let _i=oe.morphAttributes.position||oe.morphAttributes.normal||oe.morphAttributes.color,Fn=_i!==void 0?_i.length:0,tn=Ut.get(ce),fa=m.state.lights;if(Ue===!0&&(Qe===!0||I!==v)){let Yi=I===v&&ce.id===z;Ht.setState(ce,I,Yi)}let Xn=!1;ce.version===tn.__version?(tn.needsLights&&tn.lightsStateVersion!==fa.state.version||tn.outputColorSpace!==Je||Q.isBatchedMesh&&tn.batching===!1||!Q.isBatchedMesh&&tn.batching===!0||Q.isInstancedMesh&&tn.instancing===!1||!Q.isInstancedMesh&&tn.instancing===!0||Q.isSkinnedMesh&&tn.skinning===!1||!Q.isSkinnedMesh&&tn.skinning===!0||Q.isInstancedMesh&&tn.instancingColor===!0&&Q.instanceColor===null||Q.isInstancedMesh&&tn.instancingColor===!1&&Q.instanceColor!==null||tn.envMap!==Vt||ce.fog===!0&&tn.fog!==Re||tn.numClippingPlanes!==void 0&&(tn.numClippingPlanes!==Ht.numPlanes||tn.numIntersection!==Ht.numIntersection)||tn.vertexAlphas!==Yt||tn.vertexTangents!==Zt||tn.morphTargets!==Kt||tn.morphNormals!==wn||tn.morphColors!==ri||tn.toneMapping!==Un||Dt.isWebGL2===!0&&tn.morphTargetsCount!==Fn)&&(Xn=!0):(Xn=!0,tn.__version=ce.version);let As=tn.currentProgram;Xn===!0&&(As=os(ce,K,Q));let so=!1,$i=!1,as=!1,ti=As.getUniforms(),Oi=tn.uniforms;if(ot.useProgram(As.program)&&(so=!0,$i=!0,as=!0),ce.id!==z&&(z=ce.id,$i=!0),so||v!==I){ti.setValue(re,"projectionMatrix",I.projectionMatrix),ti.setValue(re,"viewMatrix",I.matrixWorldInverse);let Yi=ti.map.cameraPosition;Yi!==void 0&&Yi.setValue(re,$t.setFromMatrixPosition(I.matrixWorld)),Dt.logarithmicDepthBuffer&&ti.setValue(re,"logDepthBufFC",2/(Math.log(I.far+1)/Math.LN2)),(ce.isMeshPhongMaterial||ce.isMeshToonMaterial||ce.isMeshLambertMaterial||ce.isMeshBasicMaterial||ce.isMeshStandardMaterial||ce.isShaderMaterial)&&ti.setValue(re,"isOrthographic",I.isOrthographicCamera===!0),v!==I&&(v=I,$i=!0,as=!0)}if(Q.isSkinnedMesh){ti.setOptional(re,Q,"bindMatrix"),ti.setOptional(re,Q,"bindMatrixInverse");let Yi=Q.skeleton;Yi&&(Dt.floatVertexTextures?(Yi.boneTexture===null&&Yi.computeBoneTexture(),ti.setValue(re,"boneTexture",Yi.boneTexture,N)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}Q.isBatchedMesh&&(ti.setOptional(re,Q,"batchingTexture"),ti.setValue(re,"batchingTexture",Q._matricesTexture,N));let da=oe.morphAttributes;if((da.position!==void 0||da.normal!==void 0||da.color!==void 0&&Dt.isWebGL2===!0)&&Le.update(Q,oe,As),($i||tn.receiveShadow!==Q.receiveShadow)&&(tn.receiveShadow=Q.receiveShadow,ti.setValue(re,"receiveShadow",Q.receiveShadow)),ce.isMeshGouraudMaterial&&ce.envMap!==null&&(Oi.envMap.value=Vt,Oi.flipEnvMap.value=Vt.isCubeTexture&&Vt.isRenderTargetTexture===!1?-1:1),$i&&(ti.setValue(re,"toneMappingExposure",_.toneMappingExposure),tn.needsLights&&xu(Oi,as),Re&&ce.fog===!0&&Ke.refreshFogUniforms(Oi,Re),Ke.refreshMaterialUniforms(Oi,ce,Ee,Z,Tt),Do.upload(re,io(tn),Oi,N)),ce.isShaderMaterial&&ce.uniformsNeedUpdate===!0&&(Do.upload(re,io(tn),Oi,N),ce.uniformsNeedUpdate=!1),ce.isSpriteMaterial&&ti.setValue(re,"center",Q.center),ti.setValue(re,"modelViewMatrix",Q.modelViewMatrix),ti.setValue(re,"normalMatrix",Q.normalMatrix),ti.setValue(re,"modelMatrix",Q.matrixWorld),ce.isShaderMaterial||ce.isRawShaderMaterial){let Yi=ce.uniformsGroups;for(let ro=0,_u=Yi.length;ro<_u;ro++)if(Dt.isWebGL2){let mc=Yi[ro];Qt.update(mc,As),Qt.bind(mc,As)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return As}function xu(I,K){I.ambientLightColor.needsUpdate=K,I.lightProbe.needsUpdate=K,I.directionalLights.needsUpdate=K,I.directionalLightShadows.needsUpdate=K,I.pointLights.needsUpdate=K,I.pointLightShadows.needsUpdate=K,I.spotLights.needsUpdate=K,I.spotLightShadows.needsUpdate=K,I.rectAreaLights.needsUpdate=K,I.hemisphereLights.needsUpdate=K}function yu(I){return I.isMeshLambertMaterial||I.isMeshToonMaterial||I.isMeshPhongMaterial||I.isMeshStandardMaterial||I.isShadowMaterial||I.isShaderMaterial&&I.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(I,K,oe){Ut.get(I.texture).__webglTexture=K,Ut.get(I.depthTexture).__webglTexture=oe;let ce=Ut.get(I);ce.__hasExternalTextures=!0,ce.__hasExternalTextures&&(ce.__autoAllocateDepthBuffer=oe===void 0,ce.__autoAllocateDepthBuffer||zt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ce.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(I,K){let oe=Ut.get(I);oe.__webglFramebuffer=K,oe.__useDefaultFramebuffer=K===void 0},this.setRenderTarget=function(I,K=0,oe=0){M=I,P=K,C=oe;let ce=!0,Q=null,Re=!1,yt=!1;if(I){let Vt=Ut.get(I);Vt.__useDefaultFramebuffer!==void 0?(ot.bindFramebuffer(re.FRAMEBUFFER,null),ce=!1):Vt.__webglFramebuffer===void 0?N.setupRenderTarget(I):Vt.__hasExternalTextures&&N.rebindTextures(I,Ut.get(I.texture).__webglTexture,Ut.get(I.depthTexture).__webglTexture);let Yt=I.texture;(Yt.isData3DTexture||Yt.isDataArrayTexture||Yt.isCompressedArrayTexture)&&(yt=!0);let Zt=Ut.get(I).__webglFramebuffer;I.isWebGLCubeRenderTarget?(Array.isArray(Zt[K])?Q=Zt[K][oe]:Q=Zt[K],Re=!0):Dt.isWebGL2&&I.samples>0&&N.useMultisampledRTT(I)===!1?Q=Ut.get(I).__webglMultisampledFramebuffer:Array.isArray(Zt)?Q=Zt[oe]:Q=Zt,R.copy(I.viewport),V.copy(I.scissor),O=I.scissorTest}else R.copy(Te).multiplyScalar(Ee).floor(),V.copy(Be).multiplyScalar(Ee).floor(),O=ht;if(ot.bindFramebuffer(re.FRAMEBUFFER,Q)&&Dt.drawBuffers&&ce&&ot.drawBuffers(I,Q),ot.viewport(R),ot.scissor(V),ot.setScissorTest(O),Re){let Vt=Ut.get(I.texture);re.framebufferTexture2D(re.FRAMEBUFFER,re.COLOR_ATTACHMENT0,re.TEXTURE_CUBE_MAP_POSITIVE_X+K,Vt.__webglTexture,oe)}else if(yt){let Vt=Ut.get(I.texture),Yt=K||0;re.framebufferTextureLayer(re.FRAMEBUFFER,re.COLOR_ATTACHMENT0,Vt.__webglTexture,oe||0,Yt)}z=-1},this.readRenderTargetPixels=function(I,K,oe,ce,Q,Re,yt){if(!(I&&I.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Je=Ut.get(I).__webglFramebuffer;if(I.isWebGLCubeRenderTarget&&yt!==void 0&&(Je=Je[yt]),Je){ot.bindFramebuffer(re.FRAMEBUFFER,Je);try{let Vt=I.texture,Yt=Vt.format,Zt=Vt.type;if(Yt!==is&&et.convert(Yt)!==re.getParameter(re.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let Kt=Zt===Zr&&(zt.has("EXT_color_buffer_half_float")||Dt.isWebGL2&&zt.has("EXT_color_buffer_float"));if(Zt!==xr&&et.convert(Zt)!==re.getParameter(re.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Zt===Ns&&(Dt.isWebGL2||zt.has("OES_texture_float")||zt.has("WEBGL_color_buffer_float")))&&!Kt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}K>=0&&K<=I.width-ce&&oe>=0&&oe<=I.height-Q&&re.readPixels(K,oe,ce,Q,et.convert(Yt),et.convert(Zt),Re)}finally{let Vt=M!==null?Ut.get(M).__webglFramebuffer:null;ot.bindFramebuffer(re.FRAMEBUFFER,Vt)}}},this.copyFramebufferToTexture=function(I,K,oe=0){let ce=Math.pow(2,-oe),Q=Math.floor(K.image.width*ce),Re=Math.floor(K.image.height*ce);N.setTexture2D(K,0),re.copyTexSubImage2D(re.TEXTURE_2D,oe,0,0,I.x,I.y,Q,Re),ot.unbindTexture()},this.copyTextureToTexture=function(I,K,oe,ce=0){let Q=K.image.width,Re=K.image.height,yt=et.convert(oe.format),Je=et.convert(oe.type);N.setTexture2D(oe,0),re.pixelStorei(re.UNPACK_FLIP_Y_WEBGL,oe.flipY),re.pixelStorei(re.UNPACK_PREMULTIPLY_ALPHA_WEBGL,oe.premultiplyAlpha),re.pixelStorei(re.UNPACK_ALIGNMENT,oe.unpackAlignment),K.isDataTexture?re.texSubImage2D(re.TEXTURE_2D,ce,I.x,I.y,Q,Re,yt,Je,K.image.data):K.isCompressedTexture?re.compressedTexSubImage2D(re.TEXTURE_2D,ce,I.x,I.y,K.mipmaps[0].width,K.mipmaps[0].height,yt,K.mipmaps[0].data):re.texSubImage2D(re.TEXTURE_2D,ce,I.x,I.y,yt,Je,K.image),ce===0&&oe.generateMipmaps&&re.generateMipmap(re.TEXTURE_2D),ot.unbindTexture()},this.copyTextureToTexture3D=function(I,K,oe,ce,Q=0){if(_.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let Re=I.max.x-I.min.x+1,yt=I.max.y-I.min.y+1,Je=I.max.z-I.min.z+1,Vt=et.convert(ce.format),Yt=et.convert(ce.type),Zt;if(ce.isData3DTexture)N.setTexture3D(ce,0),Zt=re.TEXTURE_3D;else if(ce.isDataArrayTexture||ce.isCompressedArrayTexture)N.setTexture2DArray(ce,0),Zt=re.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}re.pixelStorei(re.UNPACK_FLIP_Y_WEBGL,ce.flipY),re.pixelStorei(re.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ce.premultiplyAlpha),re.pixelStorei(re.UNPACK_ALIGNMENT,ce.unpackAlignment);let Kt=re.getParameter(re.UNPACK_ROW_LENGTH),wn=re.getParameter(re.UNPACK_IMAGE_HEIGHT),ri=re.getParameter(re.UNPACK_SKIP_PIXELS),Un=re.getParameter(re.UNPACK_SKIP_ROWS),_i=re.getParameter(re.UNPACK_SKIP_IMAGES),Fn=oe.isCompressedTexture?oe.mipmaps[Q]:oe.image;re.pixelStorei(re.UNPACK_ROW_LENGTH,Fn.width),re.pixelStorei(re.UNPACK_IMAGE_HEIGHT,Fn.height),re.pixelStorei(re.UNPACK_SKIP_PIXELS,I.min.x),re.pixelStorei(re.UNPACK_SKIP_ROWS,I.min.y),re.pixelStorei(re.UNPACK_SKIP_IMAGES,I.min.z),oe.isDataTexture||oe.isData3DTexture?re.texSubImage3D(Zt,Q,K.x,K.y,K.z,Re,yt,Je,Vt,Yt,Fn.data):oe.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),re.compressedTexSubImage3D(Zt,Q,K.x,K.y,K.z,Re,yt,Je,Vt,Fn.data)):re.texSubImage3D(Zt,Q,K.x,K.y,K.z,Re,yt,Je,Vt,Yt,Fn),re.pixelStorei(re.UNPACK_ROW_LENGTH,Kt),re.pixelStorei(re.UNPACK_IMAGE_HEIGHT,wn),re.pixelStorei(re.UNPACK_SKIP_PIXELS,ri),re.pixelStorei(re.UNPACK_SKIP_ROWS,Un),re.pixelStorei(re.UNPACK_SKIP_IMAGES,_i),Q===0&&ce.generateMipmaps&&re.generateMipmap(Zt),ot.unbindTexture()},this.initTexture=function(I){I.isCubeTexture?N.setTextureCube(I,0):I.isData3DTexture?N.setTexture3D(I,0):I.isDataArrayTexture||I.isCompressedArrayTexture?N.setTexture2DArray(I,0):N.setTexture2D(I,0),ot.unbindTexture()},this.resetState=function(){P=0,C=0,M=null,ot.reset(),Mt.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ds}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=e===ff?"display-p3":"srgb",t.unpackColorSpace=Mn.workingColorSpace===kl?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Gn?Yr:t0}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Yr?Gn:mi}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}},zh=class extends za{};zh.prototype.isWebGL1Renderer=!0;Mr=class extends Zn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}},Ha=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Sh,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Es()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Es()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Es()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},zi=new w,Va=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)zi.fromBufferAttribute(this,t),zi.applyMatrix4(e),this.setXYZ(t,zi.x,zi.y,zi.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)zi.fromBufferAttribute(this,t),zi.applyNormalMatrix(e),this.setXYZ(t,zi.x,zi.y,zi.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)zi.fromBufferAttribute(this,t),zi.transformDirection(e),this.setXYZ(t,zi.x,zi.y,zi.z);return this}setX(e,t){return this.normalized&&(t=Cn(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Cn(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Cn(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Cn(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ls(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ls(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ls(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ls(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Cn(t,this.array),n=Cn(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Cn(t,this.array),n=Cn(n,this.array),i=Cn(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Cn(t,this.array),n=Cn(n,this.array),i=Cn(i,this.array),r=Cn(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Tn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},_m=new w,vm=new Ln,bm=new Ln,TS=new w,Mm=new vt,qc=new w,uh=new ii,Sm=new vt,hh=new $s,ml=class extends Sn{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=sp,this.bindMatrix=new vt,this.bindMatrixInverse=new vt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new on),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,qc),this.boundingBox.expandByPoint(qc)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new ii),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,qc),this.boundingSphere.expandByPoint(qc)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),uh.copy(this.boundingSphere),uh.applyMatrix4(i),e.ray.intersectsSphere(uh)!==!1&&(Sm.copy(i).invert(),hh.copy(e.ray).applyMatrix4(Sm),!(this.boundingBox!==null&&hh.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,hh)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Ln,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===sp?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Qx?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;vm.fromBufferAttribute(i.attributes.skinIndex,e),bm.fromBufferAttribute(i.attributes.skinWeight,e),_m.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let o=bm.getComponent(r);if(o!==0){let a=vm.getComponent(r);Mm.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(TS.copy(_m).applyMatrix4(Mm),o)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}},Ga=class extends Zn{constructor(){super(),this.isBone=!0,this.type="Bone"}},gl=class extends Fi{constructor(e=null,t=1,n=1,i,r,o,a,c,l=fi,u=fi,h,f){super(null,o,a,c,l,u,i,r,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Em=new vt,wS=new vt,xl=class s{constructor(e=[],t=[]){this.uuid=Es(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new vt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new vt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:wS;Em.multiplyMatrices(a,t[r]),Em.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new gl(t,e,e,is,Ns);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let r=e.bones[n],o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Ga),this.bones.push(o),this.boneInverses.push(new vt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){let o=t[i];e.bones.push(o.uuid);let a=n[i];e.boneInverses.push(a.toArray())}return e}},$r=class extends Tn{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Ro=new vt,Tm=new vt,Yc=[],wm=new on,AS=new vt,Ea=new Sn,Ta=new ii,yl=class extends Sn{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new $r(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,AS)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new on),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ro),wm.copy(e.boundingBox).applyMatrix4(Ro),this.boundingBox.union(wm)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ii),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ro),Ta.copy(e.boundingSphere).applyMatrix4(Ro),this.boundingSphere.union(Ta)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Ea.geometry=this.geometry,Ea.material=this.material,Ea.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ta.copy(this.boundingSphere),Ta.applyMatrix4(n),e.ray.intersectsSphere(Ta)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Ro),Tm.multiplyMatrices(n,Ro),Ea.matrixWorld=Tm,Ea.raycast(e,Yc);for(let o=0,a=Yc.length;o<a;o++){let c=Yc[o];c.instanceId=r,c.object=this,t.push(c)}Yc.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new $r(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}};Hh=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t){let n=this.pool,i=this.list;this.index>=n.length&&n.push({start:-1,count:-1,z:-1});let r=n[this.index];i.push(r),this.index++,r.start=e.start,r.count=e.count,r.z=t}reset(){this.list.length=0,this.index=0}},Co="batchId",fr=new vt,Am=new vt,PS=new vt,Rm=new vt,fh=new vr,jc=new on,Vr=new ii,wa=new w,dh=new Hh,Di=new Sn,Zc=[];_l=class extends Sn{get maxGeometryCount(){return this._maxGeometryCount}constructor(e,t,n=t*2,i){super(new Si,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._drawRanges=[],this._reservedRanges=[],this._visibility=[],this._active=[],this._bounds=[],this._maxGeometryCount=e,this._maxVertexCount=t,this._maxIndexCount=n,this._geometryInitialized=!1,this._geometryCount=0,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._visibilityChanged=!0,this._matricesTexture=null,this._initMatricesTexture()}_initMatricesTexture(){let e=Math.sqrt(this._maxGeometryCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4),n=new gl(t,e,e,is,Ns);this._matricesTexture=n}_initializeGeometry(e){let t=this.geometry,n=this._maxVertexCount,i=this._maxGeometryCount,r=this._maxIndexCount;if(this._geometryInitialized===!1){for(let a in e.attributes){let c=e.getAttribute(a),{array:l,itemSize:u,normalized:h}=c,f=new l.constructor(n*u),d=new c.constructor(f,u,h);d.setUsage(c.usage),t.setAttribute(a,d)}if(e.getIndex()!==null){let a=n>65536?new Uint32Array(r):new Uint16Array(r);t.setIndex(new Tn(a,1))}let o=i>65536?new Uint32Array(n):new Uint16Array(n);t.setAttribute(Co,new Tn(o,1)),this._geometryInitialized=!0}}_validateGeometry(e){if(e.getAttribute(Co))throw new Error(`BatchedMesh: Geometry cannot use attribute "${Co}"`);let t=this.geometry;if(!!e.getIndex()!=!!t.getIndex())throw new Error('BatchedMesh: All geometries must consistently have "index".');for(let n in t.attributes){if(n===Co)continue;if(!e.hasAttribute(n))throw new Error(`BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);let i=e.getAttribute(n),r=t.getAttribute(n);if(i.itemSize!==r.itemSize||i.normalized!==r.normalized)throw new Error("BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new on);let e=this._geometryCount,t=this.boundingBox,n=this._active;t.makeEmpty();for(let i=0;i<e;i++)n[i]!==!1&&(this.getMatrixAt(i,fr),this.getBoundingBoxAt(i,jc).applyMatrix4(fr),t.union(jc))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ii);let e=this._geometryCount,t=this.boundingSphere,n=this._active;t.makeEmpty();for(let i=0;i<e;i++)n[i]!==!1&&(this.getMatrixAt(i,fr),this.getBoundingSphereAt(i,Vr).applyMatrix4(fr),t.union(Vr))}addGeometry(e,t=-1,n=-1){if(this._initializeGeometry(e),this._validateGeometry(e),this._geometryCount>=this._maxGeometryCount)throw new Error("BatchedMesh: Maximum geometry count reached.");let i={vertexStart:-1,vertexCount:-1,indexStart:-1,indexCount:-1},r=null,o=this._reservedRanges,a=this._drawRanges,c=this._bounds;this._geometryCount!==0&&(r=o[o.length-1]),t===-1?i.vertexCount=e.getAttribute("position").count:i.vertexCount=t,r===null?i.vertexStart=0:i.vertexStart=r.vertexStart+r.vertexCount;let l=e.getIndex(),u=l!==null;if(u&&(n===-1?i.indexCount=l.count:i.indexCount=n,r===null?i.indexStart=0:i.indexStart=r.indexStart+r.indexCount),i.indexStart!==-1&&i.indexStart+i.indexCount>this._maxIndexCount||i.vertexStart+i.vertexCount>this._maxVertexCount)throw new Error("BatchedMesh: Reserved space request exceeds the maximum buffer size.");let h=this._visibility,f=this._active,d=this._matricesTexture,g=this._matricesTexture.image.data;h.push(!0),f.push(!0);let y=this._geometryCount;this._geometryCount++,PS.toArray(g,y*16),d.needsUpdate=!0,o.push(i),a.push({start:u?i.indexStart:i.vertexStart,count:-1}),c.push({boxInitialized:!1,box:new on,sphereInitialized:!1,sphere:new ii});let m=this.geometry.getAttribute(Co);for(let p=0;p<i.vertexCount;p++)m.setX(i.vertexStart+p,y);return m.needsUpdate=!0,this.setGeometryAt(y,e),y}setGeometryAt(e,t){if(e>=this._geometryCount)throw new Error("BatchedMesh: Maximum geometry count reached.");this._validateGeometry(t);let n=this.geometry,i=n.getIndex()!==null,r=n.getIndex(),o=t.getIndex(),a=this._reservedRanges[e];if(i&&o.count>a.indexCount||t.attributes.position.count>a.vertexCount)throw new Error("BatchedMesh: Reserved space not large enough for provided geometry.");let c=a.vertexStart,l=a.vertexCount;for(let d in n.attributes){if(d===Co)continue;let g=t.getAttribute(d),y=n.getAttribute(d);IS(g,y,c);let m=g.itemSize;for(let p=g.count,b=l;p<b;p++){let _=c+p;for(let T=0;T<m;T++)y.setComponent(_,T,0)}y.needsUpdate=!0}if(i){let d=a.indexStart;for(let g=0;g<o.count;g++)r.setX(d+g,c+o.getX(g));for(let g=o.count,y=a.indexCount;g<y;g++)r.setX(d+g,c);r.needsUpdate=!0}let u=this._bounds[e];t.boundingBox!==null?(u.box.copy(t.boundingBox),u.boxInitialized=!0):u.boxInitialized=!1,t.boundingSphere!==null?(u.sphere.copy(t.boundingSphere),u.sphereInitialized=!0):u.sphereInitialized=!1;let h=this._drawRanges[e],f=t.getAttribute("position");return h.count=i?o.count:f.count,this._visibilityChanged=!0,e}deleteGeometry(e){let t=this._active;return e>=t.length||t[e]===!1?this:(t[e]=!1,this._visibilityChanged=!0,this)}getBoundingBoxAt(e,t){if(this._active[e]===!1)return this;let i=this._bounds[e],r=i.box,o=this.geometry;if(i.boxInitialized===!1){r.makeEmpty();let a=o.index,c=o.attributes.position,l=this._drawRanges[e];for(let u=l.start,h=l.start+l.count;u<h;u++){let f=u;a&&(f=a.getX(f)),r.expandByPoint(wa.fromBufferAttribute(c,f))}i.boxInitialized=!0}return t.copy(r),t}getBoundingSphereAt(e,t){if(this._active[e]===!1)return this;let i=this._bounds[e],r=i.sphere,o=this.geometry;if(i.sphereInitialized===!1){r.makeEmpty(),this.getBoundingBoxAt(e,jc),jc.getCenter(r.center);let a=o.index,c=o.attributes.position,l=this._drawRanges[e],u=0;for(let h=l.start,f=l.start+l.count;h<f;h++){let d=h;a&&(d=a.getX(d)),wa.fromBufferAttribute(c,d),u=Math.max(u,r.center.distanceToSquared(wa))}r.radius=Math.sqrt(u),i.sphereInitialized=!0}return t.copy(r),t}setMatrixAt(e,t){let n=this._active,i=this._matricesTexture,r=this._matricesTexture.image.data,o=this._geometryCount;return e>=o||n[e]===!1?this:(t.toArray(r,e*16),i.needsUpdate=!0,this)}getMatrixAt(e,t){let n=this._active,i=this._matricesTexture.image.data,r=this._geometryCount;return e>=r||n[e]===!1?null:t.fromArray(i,e*16)}setVisibleAt(e,t){let n=this._visibility,i=this._active,r=this._geometryCount;return e>=r||i[e]===!1||n[e]===t?this:(n[e]=t,this._visibilityChanged=!0,this)}getVisibleAt(e){let t=this._visibility,n=this._active,i=this._geometryCount;return e>=i||n[e]===!1?!1:t[e]}raycast(e,t){let n=this._visibility,i=this._active,r=this._drawRanges,o=this._geometryCount,a=this.matrixWorld,c=this.geometry;Di.material=this.material,Di.geometry.index=c.index,Di.geometry.attributes=c.attributes,Di.geometry.boundingBox===null&&(Di.geometry.boundingBox=new on),Di.geometry.boundingSphere===null&&(Di.geometry.boundingSphere=new ii);for(let l=0;l<o;l++){if(!n[l]||!i[l])continue;let u=r[l];Di.geometry.setDrawRange(u.start,u.count),this.getMatrixAt(l,Di.matrixWorld).premultiply(a),this.getBoundingBoxAt(l,Di.geometry.boundingBox),this.getBoundingSphereAt(l,Di.geometry.boundingSphere),Di.raycast(e,Zc);for(let h=0,f=Zc.length;h<f;h++){let d=Zc[h];d.object=this,d.batchId=l,t.push(d)}Zc.length=0}Di.material=null,Di.geometry.index=null,Di.geometry.attributes={},Di.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._drawRanges=e._drawRanges.map(t=>({...t})),this._reservedRanges=e._reservedRanges.map(t=>({...t})),this._visibility=e._visibility.slice(),this._active=e._active.slice(),this._bounds=e._bounds.map(t=>({boxInitialized:t.boxInitialized,box:t.box.clone(),sphereInitialized:t.sphereInitialized,sphere:t.sphere.clone()})),this._maxGeometryCount=e._maxGeometryCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._geometryCount=e._geometryCount,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.slice(),this}dispose(){return this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this}onBeforeRender(e,t,n,i,r){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;let o=i.getIndex(),a=o===null?1:o.array.BYTES_PER_ELEMENT,c=this._visibility,l=this._multiDrawStarts,u=this._multiDrawCounts,h=this._drawRanges,f=this.perObjectFrustumCulled;f&&(Rm.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),fh.setFromProjectionMatrix(Rm,e.isWebGPURenderer?Fa:Ds));let d=0;if(this.sortObjects){Am.copy(this.matrixWorld).invert(),wa.setFromMatrixPosition(n.matrixWorld).applyMatrix4(Am);for(let m=0,p=c.length;m<p;m++)if(c[m]){this.getMatrixAt(m,fr),this.getBoundingSphereAt(m,Vr).applyMatrix4(fr);let b=!1;if(f&&(b=!fh.intersectsSphere(Vr)),!b){let _=wa.distanceTo(Vr.center);dh.push(h[m],_)}}let g=dh.list,y=this.customSort;y===null?g.sort(r.transparent?CS:RS):y.call(this,g,n);for(let m=0,p=g.length;m<p;m++){let b=g[m];l[d]=b.start*a,u[d]=b.count,d++}dh.reset()}else for(let g=0,y=c.length;g<y;g++)if(c[g]){let m=!1;if(f&&(this.getMatrixAt(g,fr),this.getBoundingSphereAt(g,Vr).applyMatrix4(fr),m=!fh.intersectsSphere(Vr)),!m){let p=h[g];l[d]=p.start*a,u[d]=p.count,d++}}this._multiDrawCount=d,this._visibilityChanged=!1}onBeforeShadow(e,t,n,i,r,o){this.onBeforeRender(e,null,i,r,o)}},Wa=class extends rs{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new It(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Cm=new w,Pm=new w,Im=new vt,ph=new $s,Kc=new ii,Xo=class extends Zn{constructor(e=new Si,t=new Wa){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Cm.fromBufferAttribute(t,i-1),Pm.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Cm.distanceTo(Pm);e.setAttribute("lineDistance",new pi(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Kc.copy(n.boundingSphere),Kc.applyMatrix4(i),Kc.radius+=r,e.ray.intersectsSphere(Kc)===!1)return;Im.copy(i).invert(),ph.copy(e.ray).applyMatrix4(Im);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=new w,u=new w,h=new w,f=new w,d=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){let p=Math.max(0,o.start),b=Math.min(g.count,o.start+o.count);for(let _=p,T=b-1;_<T;_+=d){let P=g.getX(_),C=g.getX(_+1);if(l.fromBufferAttribute(m,P),u.fromBufferAttribute(m,C),ph.distanceSqToSegment(l,u,f,h)>c)continue;f.applyMatrix4(this.matrixWorld);let z=e.ray.origin.distanceTo(f);z<e.near||z>e.far||t.push({distance:z,point:h.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}else{let p=Math.max(0,o.start),b=Math.min(m.count,o.start+o.count);for(let _=p,T=b-1;_<T;_+=d){if(l.fromBufferAttribute(m,_),u.fromBufferAttribute(m,_+1),ph.distanceSqToSegment(l,u,f,h)>c)continue;f.applyMatrix4(this.matrixWorld);let C=e.ray.origin.distanceTo(f);C<e.near||C>e.far||t.push({distance:C,point:h.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}},Lm=new w,Nm=new w,vl=class extends Xo{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Lm.fromBufferAttribute(t,i),Nm.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Lm.distanceTo(Nm);e.setAttribute("lineDistance",new pi(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},bl=class extends Xo{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Xa=class extends rs{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new It(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Dm=new vt,Vh=new $s,Jc=new ii,$c=new w,Ml=class extends Zn{constructor(e=new Si,t=new Xa){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Jc.copy(n.boundingSphere),Jc.applyMatrix4(i),Jc.radius+=r,e.ray.intersectsSphere(Jc)===!1)return;Dm.copy(i).invert(),Vh.copy(e.ray).applyMatrix4(Dm);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,h=n.attributes.position;if(l!==null){let f=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let g=f,y=d;g<y;g++){let m=l.getX(g);$c.fromBufferAttribute(h,m),Um($c,m,c,i,e,t,this)}}else{let f=Math.max(0,o.start),d=Math.min(h.count,o.start+o.count);for(let g=f,y=d;g<y;g++)$c.fromBufferAttribute(h,g),Um($c,g,c,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};Ts=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){let n=this.getLengths(),i=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-o,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===o)return i/(r-1);let u=n[i],f=n[i+1]-u,d=(o-u)/f;return(i+d)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);let o=this.getPoint(i),a=this.getPoint(r),c=t||(o.isVector2?new nt:new w);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){let n=new w,i=[],r=[],o=[],a=new w,c=new vt;for(let d=0;d<=e;d++){let g=d/e;i[d]=this.getTangentAt(g,new w)}r[0]=new w,o[0]=new w;let l=Number.MAX_VALUE,u=Math.abs(i[0].x),h=Math.abs(i[0].y),f=Math.abs(i[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),f<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(i[d-1],i[d]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(ci(i[d-1].dot(i[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,g))}o[d].crossVectors(i[d],r[d])}if(t===!0){let d=Math.acos(ci(r[0].dot(r[e]),-1,1));d/=e,i[0].dot(a.crossVectors(r[0],r[e]))>0&&(d=-d);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(i[g],d*g)),o[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Sl=class extends Ts{constructor(e=0,t=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t){let n=t||new nt,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);let a=this.aStartAngle+e*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*u-d*h+this.aX,l=f*h+d*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Gh=class extends Sl{constructor(e,t,n,i,r,o){super(e,t,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};Qc=new w,mh=new mf,gh=new mf,xh=new mf,qa=class extends Ts{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new w){let n=t,i=this.points,r=i.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,u;this.closed||a>0?l=i[(a-1)%r]:(Qc.subVectors(i[0],i[1]).add(i[0]),l=Qc);let h=i[a%r],f=i[(a+1)%r];if(this.closed||a+2<r?u=i[(a+2)%r]:(Qc.subVectors(i[r-1],i[r-2]).add(i[r-1]),u=Qc),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(h),d),y=Math.pow(h.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(u),d);y<1e-4&&(y=1),g<1e-4&&(g=y),m<1e-4&&(m=y),mh.initNonuniformCatmullRom(l.x,h.x,f.x,u.x,g,y,m),gh.initNonuniformCatmullRom(l.y,h.y,f.y,u.y,g,y,m),xh.initNonuniformCatmullRom(l.z,h.z,f.z,u.z,g,y,m)}else this.curveType==="catmullrom"&&(mh.initCatmullRom(l.x,h.x,f.x,u.x,this.tension),gh.initCatmullRom(l.y,h.y,f.y,u.y,this.tension),xh.initCatmullRom(l.z,h.z,f.z,u.z,this.tension));return n.set(mh.calc(c),gh.calc(c),xh.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new w().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};Wh=class extends Ts{constructor(e=new nt,t=new nt,n=new nt,i=new nt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new nt){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Da(e,i.x,r.x,o.x,a.x),Da(e,i.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Xh=class extends Ts{constructor(e=new w,t=new w,n=new w,i=new w){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new w){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Da(e,i.x,r.x,o.x,a.x),Da(e,i.y,r.y,o.y,a.y),Da(e,i.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},qh=class extends Ts{constructor(e=new nt,t=new nt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new nt){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new nt){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Yh=class extends Ts{constructor(e=new w,t=new w){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new w){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new w){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},jh=class extends Ts{constructor(e=new nt,t=new nt,n=new nt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new nt){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(Na(e,i.x,r.x,o.x),Na(e,i.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},El=class extends Ts{constructor(e=new w,t=new w,n=new w){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new w){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(Na(e,i.x,r.x,o.x),Na(e,i.y,r.y,o.y),Na(e,i.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Zh=class extends Ts{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new nt){let n=t,i=this.points,r=(i.length-1)*e,o=Math.floor(r),a=r-o,c=i[o===0?o:o-1],l=i[o],u=i[o>i.length-2?i.length-1:o+1],h=i[o>i.length-3?i.length-1:o+2];return n.set(Fm(a,c.x,l.x,u.x,h.x),Fm(a,c.y,l.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new nt().fromArray(i))}return this}},kS=Object.freeze({__proto__:null,ArcCurve:Gh,CatmullRomCurve3:qa,CubicBezierCurve:Wh,CubicBezierCurve3:Xh,EllipseCurve:Sl,LineCurve:qh,LineCurve3:Yh,QuadraticBezierCurve:jh,QuadraticBezierCurve3:El,SplineCurve:Zh}),Tl=class s extends Si{constructor(e=new El(new w(-1,-1,0),new w(-1,1,0),new w(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};let o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new w,c=new w,l=new nt,u=new w,h=[],f=[],d=[],g=[];y(),this.setIndex(g),this.setAttribute("position",new pi(h,3)),this.setAttribute("normal",new pi(f,3)),this.setAttribute("uv",new pi(d,2));function y(){for(let _=0;_<t;_++)m(_);m(r===!1?t:0),b(),p()}function m(_){u=e.getPointAt(_/t,u);let T=o.normals[_],P=o.binormals[_];for(let C=0;C<=i;C++){let M=C/i*Math.PI*2,z=Math.sin(M),v=-Math.cos(M);c.x=v*T.x+z*P.x,c.y=v*T.y+z*P.y,c.z=v*T.z+z*P.z,c.normalize(),f.push(c.x,c.y,c.z),a.x=u.x+n*c.x,a.y=u.y+n*c.y,a.z=u.z+n*c.z,h.push(a.x,a.y,a.z)}}function p(){for(let _=1;_<=t;_++)for(let T=1;T<=i;T++){let P=(i+1)*(_-1)+(T-1),C=(i+1)*_+(T-1),M=(i+1)*_+T,z=(i+1)*(_-1)+T;g.push(P,C,z),g.push(C,M,z)}}function b(){for(let _=0;_<=t;_++)for(let T=0;T<=i;T++)l.x=_/t,l.y=T/i,d.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new s(new kS[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},Sr=class extends rs{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new It(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new It(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=n0,this.normalScale=new nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ms=class extends Sr{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new nt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ci(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new It(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new It(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new It(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};Er=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Kh=class extends Er{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Pp,endingEnd:Pp}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,o=e+1,a=i[r],c=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Ip:r=e,a=2*t-n;break;case Lp:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Ip:o=e,c=2*n-t;break;case Lp:o=1,c=n+i[1]-i[0];break;default:o=e-1,c=t}let l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,d=this._weightNext,g=(n-t)/(i-t),y=g*g,m=y*g,p=-f*m+2*f*y-f*g,b=(1+f)*m+(-1.5-2*f)*y+(-.5+f)*g+1,_=(-1-d)*m+(1.5+d)*y+.5*g,T=d*m-d*y;for(let P=0;P!==a;++P)r[P]=p*o[u+P]+b*o[l+P]+_*o[c+P]+T*o[h+P];return r}},Jh=class extends Er{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(n-t)/(i-t),h=1-u;for(let f=0;f!==a;++f)r[f]=o[l+f]*h+o[c+f]*u;return r}},$h=class extends Er{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},gs=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=el(t,this.TimeBufferType),this.values=el(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:el(e.times,Array),values:el(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new $h(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Jh(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Kh(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ko:t=this.InterpolantFactoryMethodDiscrete;break;case Kr:t=this.InterpolantFactoryMethodLinear;break;case Hu:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ko;case this.InterpolantFactoryMethodLinear:return Kr;case this.InterpolantFactoryMethodSmooth:return Hu}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(i!==void 0&&zS(i))for(let a=0,c=i.length;a!==c;++a){let l=i[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Hu,r=e.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(i)c=!0;else{let h=a*n,f=h-n,d=h+n;for(let g=0;g!==n;++g){let y=t[h+g];if(y!==t[f+g]||y!==t[d+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let h=a*n,f=o*n;for(let d=0;d!==n;++d)t[f+d]=t[h+d]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};gs.prototype.TimeBufferType=Float32Array;gs.prototype.ValueBufferType=Float32Array;gs.prototype.DefaultInterpolation=Kr;Tr=class extends gs{};Tr.prototype.ValueTypeName="bool";Tr.prototype.ValueBufferType=Array;Tr.prototype.DefaultInterpolation=ko;Tr.prototype.InterpolantFactoryMethodLinear=void 0;Tr.prototype.InterpolantFactoryMethodSmooth=void 0;wl=class extends gs{};wl.prototype.ValueTypeName="color";Qs=class extends gs{};Qs.prototype.ValueTypeName="number";Qh=class extends Er{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(i-t),l=e*a;for(let u=l+a;l!==u;l+=4)gi.slerpFlat(r,0,o,l-a,o,l,c);return r}},Fs=class extends gs{InterpolantFactoryMethodLinear(e){return new Qh(this.times,this.values,this.getValueSize(),e)}};Fs.prototype.ValueTypeName="quaternion";Fs.prototype.DefaultInterpolation=Kr;Fs.prototype.InterpolantFactoryMethodSmooth=void 0;wr=class extends gs{};wr.prototype.ValueTypeName="string";wr.prototype.ValueBufferType=Array;wr.prototype.DefaultInterpolation=ko;wr.prototype.InterpolantFactoryMethodLinear=void 0;wr.prototype.InterpolantFactoryMethodSmooth=void 0;er=class extends gs{};er.prototype.ValueTypeName="vector";Al=class{constructor(e,t=-1,n,i=cy){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Es(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(GS(n[o]).scale(i));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(gs.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let r=t.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);let u=HS(c);c=Bm(c,1,u),l=Bm(l,1,u),!i&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new Qs(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){let l=e[a],u=l.name.match(r);if(u&&u.length>1){let h=u[1],f=i[h];f||(i[h]=f=[]),f.push(l)}}let o=[];for(let a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(h,f,d,g,y){if(d.length!==0){let m=[],p=[];d0(d,m,p,g),m.length!==0&&y.push(new h(f,m,p))}},i=[],r=e.name||"default",o=e.fps||30,a=e.blendMode,c=e.length||-1,l=e.hierarchy||[];for(let h=0;h<l.length;h++){let f=l[h].keys;if(!(!f||f.length===0))if(f[0].morphTargets){let d={},g;for(g=0;g<f.length;g++)if(f[g].morphTargets)for(let y=0;y<f[g].morphTargets.length;y++)d[f[g].morphTargets[y]]=-1;for(let y in d){let m=[],p=[];for(let b=0;b!==f[g].morphTargets.length;++b){let _=f[g];m.push(_.time),p.push(_.morphTarget===y?1:0)}i.push(new Qs(".morphTargetInfluence["+y+"]",m,p))}c=d.length*o}else{let d=".bones["+t[h].name+"]";n(er,d+".position",f,"pos",i),n(Fs,d+".quaternion",f,"rot",i),n(er,d+".scale",f,"scl",i)}}return i.length===0?null:new this(r,c,i,a)}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};pr={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}},ef=class{constructor(e,t,n){let i=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,r===!1&&i.onStart!==void 0&&i.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,i.onProgress!==void 0&&i.onProgress(u,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){let h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=l.length;h<f;h+=2){let d=l[h],g=l[h+1];if(d.global&&(d.lastIndex=0),d.test(u))return g}return null}}},WS=new ef,tr=class{constructor(e){this.manager=e!==void 0?e:WS,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};tr.DEFAULT_MATERIAL_NAME="__DEFAULT";Ks={},tf=class extends Error{constructor(e,t){super(e),this.response=t}},Ya=class extends tr{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=pr.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Ks[e]!==void 0){Ks[e].push({onLoad:t,onProgress:n,onError:i});return}Ks[e]=[],Ks[e].push({onLoad:t,onProgress:n,onError:i});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream=="undefined"||l.body===void 0||l.body.getReader===void 0)return l;let u=Ks[e],h=l.body.getReader(),f=l.headers.get("Content-Length")||l.headers.get("X-File-Size"),d=f?parseInt(f):0,g=d!==0,y=0,m=new ReadableStream({start(p){b();function b(){h.read().then(({done:_,value:T})=>{if(_)p.close();else{y+=T.byteLength;let P=new ProgressEvent("progress",{lengthComputable:g,loaded:y,total:d});for(let C=0,M=u.length;C<M;C++){let z=u[C];z.onProgress&&z.onProgress(P)}p.enqueue(T),b()}})}}});return new Response(m)}else throw new tf(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return l.json();default:if(a===void 0)return l.text();{let h=/charset="?([^;"\s]*)"?/i.exec(a),f=h&&h[1]?h[1].toLowerCase():void 0,d=new TextDecoder(f);return l.arrayBuffer().then(g=>d.decode(g))}}}).then(l=>{pr.add(e,l);let u=Ks[e];delete Ks[e];for(let h=0,f=u.length;h<f;h++){let d=u[h];d.onLoad&&d.onLoad(l)}}).catch(l=>{let u=Ks[e];if(u===void 0)throw this.manager.itemError(e),l;delete Ks[e];for(let h=0,f=u.length;h<f;h++){let d=u[h];d.onError&&d.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}},nf=class extends tr{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=pr.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;let a=Ba("img");function c(){u(),pr.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(h){u(),i&&i(h),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}},Rl=class extends tr{constructor(e){super(e)}load(e,t,n,i){let r=new Fi,o=new nf(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}},qo=class extends Zn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new It(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}},Cl=class extends qo{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Zn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new It(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},yh=new vt,Om=new w,km=new w,ja=class{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new nt(512,512),this.map=null,this.mapPass=null,this.matrix=new vt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vr,this._frameExtents=new nt(1,1),this._viewportCount=1,this._viewports=[new Ln(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Om.setFromMatrixPosition(e.matrixWorld),t.position.copy(Om),km.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(km),t.updateMatrixWorld(),yh.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(yh),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(yh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},sf=class extends ja{constructor(){super(new di(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,n=zo*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Pl=class extends qo{constructor(e,t,n=0,i=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Zn.DEFAULT_UP),this.updateMatrix(),this.target=new Zn,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new sf}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},zm=new vt,Aa=new w,_h=new w,rf=class extends ja{constructor(){super(new di(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new nt(4,2),this._viewportCount=6,this._viewports=[new Ln(2,1,1,1),new Ln(0,1,1,1),new Ln(3,1,1,1),new Ln(1,1,1,1),new Ln(3,0,1,1),new Ln(1,0,1,1)],this._cubeDirections=[new w(1,0,0),new w(-1,0,0),new w(0,0,1),new w(0,0,-1),new w(0,1,0),new w(0,-1,0)],this._cubeUps=[new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,0,1),new w(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Aa.setFromMatrixPosition(e.matrixWorld),n.position.copy(Aa),_h.copy(n.position),_h.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(_h),n.updateMatrixWorld(),i.makeTranslation(-Aa.x,-Aa.y,-Aa.z),zm.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(zm)}},Il=class extends qo{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new rf}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},of=class extends ja{constructor(){super(new br(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Yo=class extends qo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Zn.DEFAULT_UP),this.updateMatrix(),this.target=new Zn,this.shadow=new of}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Ar=class{static decodeText(e){if(typeof TextDecoder!="undefined")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}},Ll=class extends tr{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap=="undefined"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch=="undefined"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=pr.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{i&&i(l)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;let c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return pr.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){i&&i(l),pr.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});pr.add(e,c),r.manager.itemStart(e)}},gf="\\[\\]\\.:\\/",XS=new RegExp("["+gf+"]","g"),xf="[^"+gf+"]",qS="[^"+gf.replace("\\.","")+"]",YS=/((?:WC+[\/:])*)/.source.replace("WC",xf),jS=/(WCOD+)?/.source.replace("WCOD",qS),ZS=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",xf),KS=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",xf),JS=new RegExp("^"+YS+jS+ZS+KS+"$"),$S=["material","materials","bones","map"],af=class{constructor(e,t,n){let i=n||Bn.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Bn=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(XS,"")}static parseTrackName(e){let t=JS.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);$S.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[i];if(o===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Bn.Composite=af;Bn.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Bn.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Bn.prototype.GetterByBindingType=[Bn.prototype._getValue_direct,Bn.prototype._getValue_array,Bn.prototype._getValue_arrayElement,Bn.prototype._getValue_toArray];Bn.prototype.SetterByBindingTypeAndVersioning=[[Bn.prototype._setValue_direct,Bn.prototype._setValue_direct_setNeedsUpdate,Bn.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Bn.prototype._setValue_array,Bn.prototype._setValue_array_setNeedsUpdate,Bn.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Bn.prototype._setValue_arrayElement,Bn.prototype._setValue_arrayElement_setNeedsUpdate,Bn.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Bn.prototype._setValue_fromArray,Bn.prototype._setValue_fromArray_setNeedsUpdate,Bn.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];$E=new Float32Array(1),Za=class{constructor(e,t,n=0,i=1/0){this.ray=new $s(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Oa,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return cf(e,this,n,t),n.sort(Hm),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)cf(e[i],this,n,t);return n.sort(Hm),n}};Nl=class{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(ci(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}},Vm=new w,tl=new w,Zi=class{constructor(e=new w,t=new w){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){Vm.subVectors(e,this.start),tl.subVectors(this.end,this.start);let n=tl.dot(tl),r=tl.dot(Vm)/n;return t&&(r=ci(r,0,1)),r}closestPointToPoint(e,t,n){let i=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(i).add(this.start)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}};typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ka}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ka)});function yf(s,e){if(e===e0)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===Ja||e===Ol){let t=s.getIndex();if(t===null){let o=[],a=s.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);s.setIndex(o),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}let n=t.count-2,i=[];if(e===Ja)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}var m0=kt(()=>{li()});function QS(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}function nE(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Sr({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Gi})),s.DefaultMaterial}function eo(s,e,t){for(let n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Cr(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function iE(s,e,t){let n=!1,i=!1,r=!1;for(let l=0,u=e.length;l<u;l++){let h=e[l];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(i=!0),h.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);let o=[],a=[],c=[];for(let l=0,u=e.length;l<u;l++){let h=e[l];if(n){let f=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):s.attributes.position;o.push(f)}if(i){let f=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):s.attributes.normal;a.push(f)}if(r){let f=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):s.attributes.color;c.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){let u=l[0],h=l[1],f=l[2];return n&&(s.morphAttributes.position=u),i&&(s.morphAttributes.normal=h),r&&(s.morphAttributes.color=f),s.morphTargetsRelative=!0,s})}function sE(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function rE(s){let e,t=s.extensions&&s.extensions[gn.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+bf(t.attributes):e=s.indices+":"+bf(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+bf(s.targets[n]);return e}function bf(s){let e="",t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function Xf(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function oE(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}function cE(s,e,t){let n=e.attributes,i=new on;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(i.set(new w(c[0],c[1],c[2]),new w(l[0],l[1],l[2])),a.normalized){let u=Xf(Zo[a.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let a=new w,c=new w;for(let l=0,u=r.length;l<u;l++){let h=r[l];if(h.POSITION!==void 0){let f=t.json.accessors[h.POSITION],d=f.min,g=f.max;if(d!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(d[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(d[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(d[2]),Math.abs(g[2]))),f.normalized){let y=Xf(Zo[f.componentType]);c.multiplyScalar(y)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}s.boundingBox=i;let o=new ii;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=o}function _0(s,e,t){let n=e.attributes,i=[];function r(o,a){return t.getDependency("accessor",o).then(function(c){s.setAttribute(a,c)})}for(let o in n){let a=Wf[o]||o.toLowerCase();a in s.attributes||i.push(r(n[o],a))}if(e.indices!==void 0&&!s.index){let o=t.getDependency("accessor",e.indices).then(function(a){s.setIndex(a)});i.push(o)}return Mn.workingColorSpace!==mi&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Mn.workingColorSpace}" not supported.`),Cr(s,e),cE(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?iE(s,e.targets,t):s})}var Hl,gn,Mf,Sf,Ef,Tf,wf,Af,Rf,Cf,Pf,If,Lf,Nf,Df,Uf,Ff,Bf,Of,v0,$a,g0,kf,zf,Hf,Vf,Vl,eE,Gf,xs,Zo,x0,y0,_f,Wf,Rr,tE,vf,aE,qf,b0=kt(()=>{li();m0();Hl=class extends tr{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Tf(t)}),this.register(function(t){return new Df(t)}),this.register(function(t){return new Uf(t)}),this.register(function(t){return new Ff(t)}),this.register(function(t){return new Af(t)}),this.register(function(t){return new Rf(t)}),this.register(function(t){return new Cf(t)}),this.register(function(t){return new Pf(t)}),this.register(function(t){return new Ef(t)}),this.register(function(t){return new If(t)}),this.register(function(t){return new wf(t)}),this.register(function(t){return new Nf(t)}),this.register(function(t){return new Lf(t)}),this.register(function(t){return new Mf(t)}),this.register(function(t){return new Bf(t)}),this.register(function(t){return new Of(t)})}load(e,t,n,i){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let l=Ar.extractUrlBase(e);o=Ar.resolveURL(l,this.path)}else o=Ar.extractUrlBase(e);this.manager.itemStart(e);let a=function(l){i?i(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new Ya(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,o,function(u){t(u),r.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r,o={},a={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===v0){try{o[gn.KHR_BINARY_GLTF]=new kf(e)}catch(h){i&&i(h);return}r=JSON.parse(o[gn.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new qf(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let h=this.pluginCallbacks[u](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[h.name]=h,o[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){let h=r.extensionsUsed[u],f=r.extensionsRequired||[];switch(h){case gn.KHR_MATERIALS_UNLIT:o[h]=new Sf;break;case gn.KHR_DRACO_MESH_COMPRESSION:o[h]=new zf(r,this.dracoLoader);break;case gn.KHR_TEXTURE_TRANSFORM:o[h]=new Hf;break;case gn.KHR_MESH_QUANTIZATION:o[h]=new Vf;break;default:f.indexOf(h)>=0&&a[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}};gn={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Mf=class{constructor(e){this.parser=e,this.name=gn.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,u=new It(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],mi);let h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Yo(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Il(u),l.distance=h;break;case"spot":l=new Pl(u),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,Cr(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}},Sf=class{constructor(){this.name=gn.KHR_MATERIALS_UNLIT}getMaterialType(){return Wi}extendParams(e,t,n){let i=[];e.color=new It(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],mi),e.opacity=o[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,Gn))}return Promise.all(i)}},Ef=class{constructor(e){this.parser=e,this.name=gn.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},Tf=class{constructor(e){this.parser=e,this.name=gn.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ms}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){let a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new nt(a,a)}return Promise.all(r)}},wf=class{constructor(e){this.parser=e,this.name=gn.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ms}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}},Af=class{constructor(e){this.parser=e,this.name=gn.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ms}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new It(0,0,0),t.sheenRoughness=0,t.sheen=1;let o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){let a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],mi)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Gn)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}},Rf=class{constructor(e){this.parser=e,this.name=gn.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ms}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}},Cf=class{constructor(e){this.parser=e,this.name=gn.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ms}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;let a=o.attenuationColor||[1,1,1];return t.attenuationColor=new It().setRGB(a[0],a[1],a[2],mi),Promise.all(r)}},Pf=class{constructor(e){this.parser=e,this.name=gn.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ms}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},If=class{constructor(e){this.parser=e,this.name=gn.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ms}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));let a=o.specularColorFactor||[1,1,1];return t.specularColor=new It().setRGB(a[0],a[1],a[2],mi),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Gn)),Promise.all(r)}},Lf=class{constructor(e){this.parser=e,this.name=gn.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ms}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}},Nf=class{constructor(e){this.parser=e,this.name=gn.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ms}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}},Df=class{constructor(e){this.parser=e,this.name=gn.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let r=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}},Uf=class{constructor(e){this.parser=e,this.name=gn.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=i.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Ff=class{constructor(e){this.parser=e,this.name=gn.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=i.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Bf=class{constructor(e){this.name=gn.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let c=i.byteOffset||0,l=i.byteLength||0,u=i.count,h=i.byteStride,f=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,h,f,i.mode,i.filter).then(function(d){return d.buffer}):o.ready.then(function(){let d=new ArrayBuffer(u*h);return o.decodeGltfBuffer(new Uint8Array(d),u,h,f,i.mode,i.filter),d})})}else return null}},Of=class{constructor(e){this.name=gn.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let l of i.primitives)if(l.mode!==xs.TRIANGLES&&l.mode!==xs.TRIANGLE_STRIP&&l.mode!==xs.TRIANGLE_FAN&&l.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],c={};for(let l in o)a.push(this.parser.getDependency("accessor",o[l]).then(u=>(c[l]=u,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{let u=l.pop(),h=u.isGroup?u.children:[u],f=l[0].count,d=[];for(let g of h){let y=new vt,m=new w,p=new gi,b=new w(1,1,1),_=new yl(g.geometry,g.material,f);for(let T=0;T<f;T++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,T),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,T),c.SCALE&&b.fromBufferAttribute(c.SCALE,T),_.setMatrixAt(T,y.compose(m,p,b));for(let T in c)if(T==="_COLOR_0"){let P=c[T];_.instanceColor=new $r(P.array,P.itemSize,P.normalized)}else T!=="TRANSLATION"&&T!=="ROTATION"&&T!=="SCALE"&&g.geometry.setAttribute(T,c[T]);Zn.prototype.copy.call(_,g),this.parser.assignFinalMaterial(_),d.push(_)}return u.isGroup?(u.clear(),u.add(...d),u):d[0]}))}},v0="glTF",$a=12,g0={JSON:1313821514,BIN:5130562},kf=class{constructor(e){this.name=gn.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,$a),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==v0)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-$a,r=new DataView(e,$a),o=0;for(;o<i;){let a=r.getUint32(o,!0);o+=4;let c=r.getUint32(o,!0);if(o+=4,c===g0.JSON){let l=new Uint8Array(e,$a+o,a);this.content=n.decode(l)}else if(c===g0.BIN){let l=$a+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},zf=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=gn.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(let u in o){let h=Wf[u]||u.toLowerCase();a[h]=o[u]}for(let u in e.attributes){let h=Wf[u]||u.toLowerCase();if(o[u]!==void 0){let f=n.accessors[e.attributes[u]],d=Zo[f.componentType];l[h]=d.name,c[h]=f.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(h,f){i.decodeDracoFile(u,function(d){for(let g in d.attributes){let y=d.attributes[g],m=c[g];m!==void 0&&(y.normalized=m)}h(d)},a,l,mi,f)})})}},Hf=class{constructor(){this.name=gn.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},Vf=class{constructor(){this.name=gn.KHR_MESH_QUANTIZATION}},Vl=class extends Er{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,u=i-t,h=(n-t)/u,f=h*h,d=f*h,g=e*l,y=g-l,m=-2*d+3*f,p=d-f,b=1-m,_=p-f+h;for(let T=0;T!==a;T++){let P=o[y+T+a],C=o[y+T+c]*u,M=o[g+T+a],z=o[g+T]*u;r[T]=b*P+_*C+m*M+p*z}return r}},eE=new gi,Gf=class extends Vl{interpolate_(e,t,n,i){let r=super.interpolate_(e,t,n,i);return eE.fromArray(r).normalize().toArray(r),r}},xs={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Zo={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},x0={9728:fi,9729:Vi,9984:il,9985:uf,9986:Ra,9987:yr},y0={33071:ns,33648:Ua,10497:jr},_f={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Wf={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Rr={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},tE={CUBICSPLINE:void 0,LINEAR:Kr,STEP:ko},vf={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};aE=new vt,qf=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new QS,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,r=-1;typeof navigator!="undefined"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,r=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap=="undefined"||n||i&&r<98?this.textureLoader=new Rl(this.options.manager):this.textureLoader=new Ll(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Ya(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return eo(r,a,i),Cr(a,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){let o=t[i].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let i=0,r=e.length;i<r;i++){let o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),r=(o,a)=>{let c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(let[l,u]of o.children.entries())r(u,a.children[l])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[gn.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(r,o){n.load(Ar.resolveURL(t.uri,i.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let o=_f[i.type],a=Zo[i.componentType],c=i.normalized===!0,l=new a(i.count*o);return Promise.resolve(new Tn(l,o,c))}let r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],c=_f[i.type],l=Zo[i.componentType],u=l.BYTES_PER_ELEMENT,h=u*c,f=i.byteOffset||0,d=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0,y,m;if(d&&d!==h){let p=Math.floor(f/d),b="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count,_=t.cache.get(b);_||(y=new l(a,p*d,i.count*d/u),_=new Ha(y,d/u),t.cache.add(b,_)),m=new Va(_,c,f%d/u,g)}else a===null?y=new l(i.count*c):y=new l(a,f,i.count*c),m=new Tn(y,c,g);if(i.sparse!==void 0){let p=_f.SCALAR,b=Zo[i.sparse.indices.componentType],_=i.sparse.indices.byteOffset||0,T=i.sparse.values.byteOffset||0,P=new b(o[1],_,i.sparse.count*p),C=new l(o[2],T,i.sparse.count*c);a!==null&&(m=new Tn(m.array.slice(),m.itemSize,m.normalized));for(let M=0,z=P.length;M<z;M++){let v=P[M];if(m.setX(v,C[M*c]),c>=2&&m.setY(v,C[M*c+1]),c>=3&&m.setZ(v,C[M*c+2]),c>=4&&m.setW(v,C[M*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return m})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r],a=this.textureLoader;if(o.uri){let c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let i=this,r=this.json,o=r.textures[e],a=r.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);let f=(r.samplers||{})[o.sampler]||{};return u.magFilter=x0[f.magFilter]||Vi,u.minFilter=x0[f.minFilter]||yr,u.wrapS=y0[f.wrapS]||jr,u.wrapT=y0[f.wrapT]||jr,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());let o=i.images[e],a=self.URL||self.webkitURL,c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(h){l=!0;let f=new Blob([h],{type:o.mimeType});return c=a.createObjectURL(f),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(c).then(function(h){return new Promise(function(f,d){let g=f;t.isImageBitmapLoader===!0&&(g=function(y){let m=new Fi(y);m.needsUpdate=!0,f(m)}),t.load(Ar.resolveURL(h,r.path),g,void 0,d)})}).then(function(h){return l===!0&&a.revokeObjectURL(c),h.userData.mimeType=o.mimeType||oE(o.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[gn.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[gn.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let c=r.associations.get(o);o=r.extensions[gn.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new Xa,rs.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new Wa,rs.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(i||r||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Sr}loadMaterial(e){let t=this,n=this.json,i=this.extensions,r=n.materials[e],o,a={},c=r.extensions||{},l=[];if(c[gn.KHR_MATERIALS_UNLIT]){let h=i[gn.KHR_MATERIALS_UNLIT];o=h.getMaterialType(),l.push(h.extendParams(a,r,t))}else{let h=r.pbrMetallicRoughness||{};if(a.color=new It(1,1,1),a.opacity=1,Array.isArray(h.baseColorFactor)){let f=h.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],mi),a.opacity=f[3]}h.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",h.baseColorTexture,Gn)),a.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,a.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",h.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",h.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=Mi);let u=r.alphaMode||vf.OPAQUE;if(u===vf.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===vf.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==Wi&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new nt(1,1),r.normalTexture.scale!==void 0)){let h=r.normalTexture.scale;a.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&o!==Wi&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==Wi){let h=r.emissiveFactor;a.emissive=new It().setRGB(h[0],h[1],h[2],mi)}return r.emissiveTexture!==void 0&&o!==Wi&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,Gn)),Promise.all(l).then(function(){let h=new o(a);return r.name&&(h.name=r.name),Cr(h,r),t.associations.set(h,{materials:e}),r.extensions&&eo(i,h,r),h})}createUniqueName(e){let t=Bn.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function r(a){return n[gn.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return _0(c,a,t)})}let o=[];for(let a=0,c=e.length;a<c;a++){let l=e[a],u=rE(l),h=i[u];if(h)o.push(h.promise);else{let f;l.extensions&&l.extensions[gn.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=_0(new Si,l,t),i[u]={primitive:l,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){let t=this,n=this.json,i=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){let u=o[c].material===void 0?nE(this.cache):this.getDependency("material",o[c].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){let l=c.slice(0,c.length-1),u=c[c.length-1],h=[];for(let d=0,g=u.length;d<g;d++){let y=u[d],m=o[d],p,b=l[d];if(m.mode===xs.TRIANGLES||m.mode===xs.TRIANGLE_STRIP||m.mode===xs.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new ml(y,b):new Sn(y,b),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===xs.TRIANGLE_STRIP?p.geometry=yf(p.geometry,Ol):m.mode===xs.TRIANGLE_FAN&&(p.geometry=yf(p.geometry,Ja));else if(m.mode===xs.LINES)p=new vl(y,b);else if(m.mode===xs.LINE_STRIP)p=new Xo(y,b);else if(m.mode===xs.LINE_LOOP)p=new bl(y,b);else if(m.mode===xs.POINTS)p=new Ml(y,b);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&sE(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),Cr(p,r),m.extensions&&eo(i,p,m),t.assignFinalMaterial(p),h.push(p)}for(let d=0,g=h.length;d<g;d++)t.associations.set(h[d],{meshes:e,primitives:d});if(h.length===1)return r.extensions&&eo(i,h[0],r),h[0];let f=new Us;r.extensions&&eo(i,f,r),t.associations.set(f,{meshes:e});for(let d=0,g=h.length;d<g;d++)f.add(h[d]);return f})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new di(Qr.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new br(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Cr(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let r=i.pop(),o=i,a=[],c=[];for(let l=0,u=o.length;l<u;l++){let h=o[l];if(h){a.push(h);let f=new vt;r!==null&&f.fromArray(r.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new xl(a,c)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,o=[],a=[],c=[],l=[],u=[];for(let h=0,f=i.channels.length;h<f;h++){let d=i.channels[h],g=i.samplers[d.sampler],y=d.target,m=y.node,p=i.parameters!==void 0?i.parameters[g.input]:g.input,b=i.parameters!==void 0?i.parameters[g.output]:g.output;y.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",b)),l.push(g),u.push(y))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(h){let f=h[0],d=h[1],g=h[2],y=h[3],m=h[4],p=[];for(let b=0,_=f.length;b<_;b++){let T=f[b],P=d[b],C=g[b],M=y[b],z=m[b];if(T===void 0)continue;T.updateMatrix&&T.updateMatrix();let v=n._createAnimationTracks(T,P,C,M,z);if(v)for(let R=0;R<v.length;R++)p.push(v[R])}return new Al(r,void 0,p)})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=i.weights.length;c<l;c++)a.morphTargetInfluences[c]=i.weights[c]}),o})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=i.children||[];for(let l=0,u=a.length;l<u;l++)o.push(n.getDependency("node",a[l]));let c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){let u=l[0],h=l[1],f=l[2];f!==null&&u.traverse(function(d){d.isSkinnedMesh&&d.bind(f,aE)});for(let d=0,g=h.length;d<g;d++)u.add(h[d]);return u})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],o=r.name?i.createUniqueName(r.name):"",a=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),r.camera!==void 0&&a.push(i.getDependency("camera",r.camera).then(function(l){return i._getNodeRef(i.cameraCache,r.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let u;if(r.isBone===!0?u=new Ga:l.length>1?u=new Us:l.length===1?u=l[0]:u=new Zn,u!==l[0])for(let h=0,f=l.length;h<f;h++)u.add(l[h]);if(r.name&&(u.userData.name=r.name,u.name=o),Cr(u,r),r.extensions&&eo(n,u,r),r.matrix!==void 0){let h=new vt;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);return i.associations.has(u)||i.associations.set(u,{}),i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,r=new Us;n.name&&(r.name=i.createUniqueName(n.name)),Cr(r,n),n.extensions&&eo(t,r,n);let o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(i.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let u=0,h=c.length;u<h;u++)r.add(c[u]);let l=u=>{let h=new Map;for(let[f,d]of i.associations)(f instanceof rs||f instanceof Fi)&&h.set(f,d);return u.traverse(f=>{let d=i.associations.get(f);d!=null&&h.set(f,d)}),h};return i.associations=l(r),r})}_createAnimationTracks(e,t,n,i,r){let o=[],a=e.name?e.name:e.uuid,c=[];Rr[r.path]===Rr.weights?e.traverse(function(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}):c.push(a);let l;switch(Rr[r.path]){case Rr.weights:l=Qs;break;case Rr.rotation:l=Fs;break;case Rr.position:case Rr.scale:l=er;break;default:switch(n.itemSize){case 1:l=Qs;break;case 2:case 3:default:l=er;break}break}let u=i.interpolation!==void 0?tE[i.interpolation]:Kr,h=this._getArrayFromAccessor(n);for(let f=0,d=c.length;f<d;f++){let g=new l(c[f]+"."+Rr[r.path],t.array,h,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Xf(t.constructor),i=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof Fs?Gf:Vl;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}});var M0,Gl,Yf=kt(()=>{M0=Math.pow(2,-24),Gl=Symbol("SKIP_GENERATION")});function lE(s){return s.index?s.index.count:s.attributes.position.count}function Bs(s){return lE(s)/3}function uE(s,e=ArrayBuffer){return s>65535?new Uint32Array(new e(4*s)):new Uint16Array(new e(2*s))}function S0(s,e){if(!s.index){let t=s.attributes.position.count,n=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,i=uE(t,n);s.setIndex(new Tn(i,1));for(let r=0;r<t;r++)i[r]=r}}function jf(s,e){let t=Bs(s),n=e||s.drawRange,i=n.start/3,r=(n.start+n.count)/3,o=Math.max(0,i),a=Math.min(t,r)-o;return[{offset:Math.floor(o),count:Math.floor(a)}]}function Zf(s,e){if(!s.groups||!s.groups.length)return jf(s,e);let t=[],n=new Set,i=e||s.drawRange,r=i.start/3,o=(i.start+i.count)/3;for(let c of s.groups){let l=c.start/3,u=(c.start+c.count)/3;n.add(Math.max(r,l)),n.add(Math.min(o,u))}let a=Array.from(n.values()).sort((c,l)=>c-l);for(let c=0;c<a.length-1;c++){let l=a[c],u=a[c+1];t.push({offset:Math.floor(l),count:Math.floor(u-l)})}return t}function E0(s,e){let t=Bs(s),n=Zf(s,e).sort((o,a)=>o.offset-a.offset),i=n[n.length-1];i.count=Math.min(t-i.offset,i.count);let r=0;return n.forEach(({count:o})=>r+=o),t!==r}var Qa=kt(()=>{li()});function Wl(s,e,t,n,i){let r=1/0,o=1/0,a=1/0,c=-1/0,l=-1/0,u=-1/0,h=1/0,f=1/0,d=1/0,g=-1/0,y=-1/0,m=-1/0;for(let p=e*6,b=(e+t)*6;p<b;p+=6){let _=s[p+0],T=s[p+1],P=_-T,C=_+T;P<r&&(r=P),C>c&&(c=C),_<h&&(h=_),_>g&&(g=_);let M=s[p+2],z=s[p+3],v=M-z,R=M+z;v<o&&(o=v),R>l&&(l=R),M<f&&(f=M),M>y&&(y=M);let V=s[p+4],O=s[p+5],j=V-O,B=V+O;j<a&&(a=j),B>u&&(u=B),V<d&&(d=V),V>m&&(m=V)}n[0]=r,n[1]=o,n[2]=a,n[3]=c,n[4]=l,n[5]=u,i[0]=h,i[1]=f,i[2]=d,i[3]=g,i[4]=y,i[5]=m}function T0(s,e=null,t=null,n=null){let i=s.attributes.position,r=s.index?s.index.array:null,o=Bs(s),a=i.normalized,c;e===null?(c=new Float32Array(o*6*4),t=0,n=o):(c=e,t=t||0,n=n||o);let l=i.array,u=i.offset||0,h=3;i.isInterleavedBufferAttribute&&(h=i.data.stride);let f=["getX","getY","getZ"];for(let d=t;d<t+n;d++){let g=d*3,y=d*6,m=g+0,p=g+1,b=g+2;r&&(m=r[m],p=r[p],b=r[b]),a||(m=m*h+u,p=p*h+u,b=b*h+u);for(let _=0;_<3;_++){let T,P,C;a?(T=i[f[_]](m),P=i[f[_]](p),C=i[f[_]](b)):(T=l[m+_],P=l[p+_],C=l[b+_]);let M=T;P<M&&(M=P),C<M&&(M=C);let z=T;P>z&&(z=P),C>z&&(z=C);let v=(z-M)/2,R=_*2;c[y+R+0]=M+v,c[y+R+1]=v+(Math.abs(M)+v)*M0}}return c}var w0=kt(()=>{Yf();Qa()});function Nn(s,e,t){return t.min.x=e[s],t.min.y=e[s+1],t.min.z=e[s+2],t.max.x=e[s+3],t.max.y=e[s+4],t.max.z=e[s+5],t}function Kf(s){let e=-1,t=-1/0;for(let n=0;n<3;n++){let i=s[n+3]-s[n];i>t&&(t=i,e=n)}return e}function Jf(s,e){e.set(s)}function $f(s,e,t){let n,i;for(let r=0;r<3;r++){let o=r+3;n=s[r],i=e[r],t[r]=n<i?n:i,n=s[o],i=e[o],t[o]=n>i?n:i}}function ec(s,e,t){for(let n=0;n<3;n++){let i=e[s+2*n],r=e[s+2*n+1],o=i-r,a=i+r;o<t[n]&&(t[n]=o),a>t[n+3]&&(t[n+3]=a)}}function Ko(s){let e=s[3]-s[0],t=s[4]-s[1],n=s[5]-s[2];return 2*(e*t+t*n+n*e)}var to=kt(()=>{});function C0(s,e,t,n,i,r){let o=-1,a=0;if(r===0)o=Kf(e),o!==-1&&(a=(e[o]+e[o+3])/2);else if(r===1)o=Kf(s),o!==-1&&(a=dE(t,n,i,o));else if(r===2){let c=Ko(s),l=1.25*i,u=n*6,h=(n+i)*6;for(let f=0;f<3;f++){let d=e[f],m=(e[f+3]-d)/nr;if(i<nr/4){let p=[...Pr];p.length=i;let b=0;for(let T=u;T<h;T+=6,b++){let P=p[b];P.candidate=t[T+2*f],P.count=0;let{bounds:C,leftCacheBounds:M,rightCacheBounds:z}=P;for(let v=0;v<3;v++)z[v]=1/0,z[v+3]=-1/0,M[v]=1/0,M[v+3]=-1/0,C[v]=1/0,C[v+3]=-1/0;ec(T,t,C)}p.sort(fE);let _=i;for(let T=0;T<_;T++){let P=p[T];for(;T+1<_&&p[T+1].candidate===P.candidate;)p.splice(T+1,1),_--}for(let T=u;T<h;T+=6){let P=t[T+2*f];for(let C=0;C<_;C++){let M=p[C];P>=M.candidate?ec(T,t,M.rightCacheBounds):(ec(T,t,M.leftCacheBounds),M.count++)}}for(let T=0;T<_;T++){let P=p[T],C=P.count,M=i-P.count,z=P.leftCacheBounds,v=P.rightCacheBounds,R=0;C!==0&&(R=Ko(z)/c);let V=0;M!==0&&(V=Ko(v)/c);let O=1+1.25*(R*C+V*M);O<l&&(o=f,l=O,a=P.candidate)}}else{for(let _=0;_<nr;_++){let T=Pr[_];T.count=0,T.candidate=d+m+_*m;let P=T.bounds;for(let C=0;C<3;C++)P[C]=1/0,P[C+3]=-1/0}for(let _=u;_<h;_+=6){let C=~~((t[_+2*f]-d)/m);C>=nr&&(C=nr-1);let M=Pr[C];M.count++,ec(_,t,M.bounds)}let p=Pr[nr-1];Jf(p.bounds,p.rightCacheBounds);for(let _=nr-2;_>=0;_--){let T=Pr[_],P=Pr[_+1];$f(T.bounds,P.rightCacheBounds,T.rightCacheBounds)}let b=0;for(let _=0;_<nr-1;_++){let T=Pr[_],P=T.count,C=T.bounds,z=Pr[_+1].rightCacheBounds;P!==0&&(b===0?Jf(C,Xl):$f(C,Xl,Xl)),b+=P;let v=0,R=0;b!==0&&(v=Ko(Xl)/c);let V=i-b;V!==0&&(R=Ko(z)/c);let O=1+1.25*(v*b+R*V);O<l&&(o=f,l=O,a=T.candidate)}}}}else console.warn(`MeshBVH: Invalid build strategy value ${r} used.`);return{axis:o,pos:a}}function dE(s,e,t,n){let i=0;for(let r=e,o=e+t;r<o;r++)i+=s[r*6+n*2];return i/t}var nr,fE,Pr,Xl,P0=kt(()=>{to();nr=32,fE=(s,e)=>s.candidate-e.candidate,Pr=new Array(nr).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),Xl=new Float32Array(6)});var Jo,I0=kt(()=>{Jo=class{constructor(){this.boundingData=new Float32Array(6)}}});function L0(s,e,t,n,i,r){let o=n,a=n+i-1,c=r.pos,l=r.axis*2;for(;;){for(;o<=a&&t[o*6+l]<c;)o++;for(;o<=a&&t[a*6+l]>=c;)a--;if(o<a){for(let u=0;u<3;u++){let h=e[o*3+u];e[o*3+u]=e[a*3+u],e[a*3+u]=h}for(let u=0;u<6;u++){let h=t[o*6+u];t[o*6+u]=t[a*6+u],t[a*6+u]=h}o++,a--}else return o}}var N0=kt(()=>{});function D0(s,e,t,n,i,r){let o=n,a=n+i-1,c=r.pos,l=r.axis*2;for(;;){for(;o<=a&&t[o*6+l]<c;)o++;for(;o<=a&&t[a*6+l]>=c;)a--;if(o<a){let u=s[o];s[o]=s[a],s[a]=u;for(let h=0;h<6;h++){let f=t[o*6+h];t[o*6+h]=t[a*6+h],t[a*6+h]=f}o++,a--}else return o}}var U0=kt(()=>{});function Kn(s,e){return e[s+15]===65535}function si(s,e){return e[s+6]}function ui(s,e){return e[s+14]}function Ei(s){return s+8}function Ti(s,e){return e[s+6]}function ql(s,e){return e[s+7]}var Os=kt(()=>{});function jl(s){return"count"in s?1:1+jl(s.left)+jl(s.right)}function O0(s,e,t){return F0=new Float32Array(t),tc=new Uint32Array(t),Yl=new Uint16Array(t),B0=new Uint8Array(t),Qf(s,e)}function Qf(s,e){let t=s/4,n=s/2,i="count"in e,r=e.boundingData;for(let o=0;o<6;o++)F0[t+o]=r[o];if(i)if(e.buffer){let o=e.buffer;B0.set(new Uint8Array(o),s);for(let a=s,c=s+o.byteLength;a<c;a+=32){let l=a/2;Kn(l,Yl)||(tc[a/4+6]+=t)}return s+o.byteLength}else{let o=e.offset,a=e.count;return tc[t+6]=o,Yl[n+14]=a,Yl[n+15]=65535,s+32}else{let o=e.left,a=e.right,c=e.splitAxis,l;if(l=Qf(s+32,o),l/4>pE)throw new Error("MeshBVH: Cannot store child pointer greater than 32 bits.");return tc[t+6]=l/4,l=Qf(l,a),tc[t+7]=c,l}}var F0,tc,Yl,B0,pE,k0=kt(()=>{Os();pE=Math.pow(2,32)});function mE(s,e){let t=(s.index?s.index.count:s.attributes.position.count)/3,n=t>2**16,i=n?4:2,r=e?new SharedArrayBuffer(t*i):new ArrayBuffer(t*i),o=n?new Uint32Array(r):new Uint16Array(r);for(let a=0,c=o.length;a<c;a++)o[a]=a;return o}function gE(s,e,t,n,i){let{maxDepth:r,verbose:o,maxLeafTris:a,strategy:c,onProgress:l,indirect:u}=i,h=s._indirectBuffer,f=s.geometry,d=f.index?f.index.array:null,g=u?D0:L0,y=Bs(f),m=new Float32Array(6),p=!1,b=new Jo;return Wl(e,t,n,b.boundingData,m),T(b,t,n,m),b;function _(P){l&&l(P/y)}function T(P,C,M,z=null,v=0){if(!p&&v>=r&&(p=!0,o&&(console.warn(`MeshBVH: Max depth of ${r} reached when generating BVH. Consider increasing maxDepth.`),console.warn(f))),M<=a||v>=r)return _(C+M),P.offset=C,P.count=M,P;let R=C0(P.boundingData,z,e,C,M,c);if(R.axis===-1)return _(C+M),P.offset=C,P.count=M,P;let V=g(h,d,e,C,M,R);if(V===C||V===C+M)_(C+M),P.offset=C,P.count=M;else{P.splitAxis=R.axis;let O=new Jo,j=C,B=V-C;P.left=O,Wl(e,j,B,O.boundingData,m),T(O,j,B,m,v+1);let Y=new Jo,Z=V,Ee=M-B;P.right=Y,Wl(e,Z,Ee,Y.boundingData,m),T(Y,Z,Ee,m,v+1)}return P}}function z0(s,e){let t=s.geometry;e.indirect&&(s._indirectBuffer=mE(t,e.useSharedArrayBuffer),E0(t,e.range)&&!e.verbose&&console.warn('MeshBVH: Provided geometry contains groups or a range that do not fully span the vertex contents while using the "indirect" option. BVH may incorrectly report intersections on unrendered portions of the geometry.')),s._indirectBuffer||S0(t,e);let n=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,i=T0(t),r=e.indirect?jf(t,e.range):Zf(t,e.range);s._roots=r.map(o=>{let a=gE(s,i,o.offset,o.count,e),c=jl(a),l=new n(32*c);return O0(0,a,l),l})}var H0=kt(()=>{Qa();w0();P0();I0();N0();U0();k0()});var Ki,P1,ed=kt(()=>{li();Ki=class{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(e,t){let n=1/0,i=-1/0;for(let r=0,o=e.length;r<o;r++){let c=e[r][t];n=c<n?c:n,i=c>i?c:i}this.min=n,this.max=i}setFromPoints(e,t){let n=1/0,i=-1/0;for(let r=0,o=t.length;r<o;r++){let a=t[r],c=e.dot(a);n=c<n?c:n,i=c>i?c:i}this.min=n,this.max=i}isSeparated(e){return this.min>e.max||e.min>this.max}};Ki.prototype.setFromBox=function(){let s=new w;return function(t,n){let i=n.min,r=n.max,o=1/0,a=-1/0;for(let c=0;c<=1;c++)for(let l=0;l<=1;l++)for(let u=0;u<=1;u++){s.x=i.x*c+r.x*(1-c),s.y=i.y*l+r.y*(1-l),s.z=i.z*u+r.z*(1-u);let h=t.dot(s);o=Math.min(h,o),a=Math.max(h,a)}this.min=o,this.max=a}}();P1=function(){let s=new Ki;return function(t,n){let i=t.points,r=t.satAxes,o=t.satBounds,a=n.points,c=n.satAxes,l=n.satBounds;for(let u=0;u<3;u++){let h=o[u],f=r[u];if(s.setFromPoints(f,a),h.isSeparated(s))return!1}for(let u=0;u<3;u++){let h=l[u],f=c[u];if(s.setFromPoints(f,i),h.isSeparated(s))return!1}}}()});var xE,ic,V0,td=kt(()=>{li();xE=function(){let s=new w,e=new w,t=new w;return function(i,r,o){let a=i.start,c=s,l=r.start,u=e;t.subVectors(a,l),s.subVectors(i.end,i.start),e.subVectors(r.end,r.start);let h=t.dot(u),f=u.dot(c),d=u.dot(u),g=t.dot(c),m=c.dot(c)*d-f*f,p,b;m!==0?p=(h*f-g*d)/m:p=0,b=(h+p*f)/d,o.x=p,o.y=b}}(),ic=function(){let s=new nt,e=new w,t=new w;return function(i,r,o,a){xE(i,r,s);let c=s.x,l=s.y;if(c>=0&&c<=1&&l>=0&&l<=1){i.at(c,o),r.at(l,a);return}else if(c>=0&&c<=1){l<0?r.at(0,a):r.at(1,a),i.closestPointToPoint(a,!0,o);return}else if(l>=0&&l<=1){c<0?i.at(0,o):i.at(1,o),r.closestPointToPoint(o,!0,a);return}else{let u;c<0?u=i.start:u=i.end;let h;l<0?h=r.start:h=r.end;let f=e,d=t;if(i.closestPointToPoint(h,!0,e),r.closestPointToPoint(u,!0,t),f.distanceToSquared(h)<=d.distanceToSquared(u)){o.copy(f),a.copy(h);return}else{o.copy(u),a.copy(d);return}}}}(),V0=function(){let s=new w,e=new w,t=new ts,n=new Zi;return function(r,o){let{radius:a,center:c}=r,{a:l,b:u,c:h}=o;if(n.start=l,n.end=u,n.closestPointToPoint(c,!0,s).distanceTo(c)<=a||(n.start=l,n.end=h,n.closestPointToPoint(c,!0,s).distanceTo(c)<=a)||(n.start=u,n.end=h,n.closestPointToPoint(c,!0,s).distanceTo(c)<=a))return!0;let y=o.getPlane(t);if(Math.abs(y.distanceToPoint(c))<=a){let p=y.projectPoint(c,e);if(o.containsPoint(p))return!0}return!1}}()});function nd(s){return Math.abs(s)<yE}var yE,Ri,$o=kt(()=>{li();ed();td();yE=1e-15;Ri=class extends ss{constructor(...e){super(...e),this.isExtendedTriangle=!0,this.satAxes=new Array(4).fill().map(()=>new w),this.satBounds=new Array(4).fill().map(()=>new Ki),this.points=[this.a,this.b,this.c],this.sphere=new ii,this.plane=new ts,this.needsUpdate=!0}intersectsSphere(e){return V0(e,this)}update(){let e=this.a,t=this.b,n=this.c,i=this.points,r=this.satAxes,o=this.satBounds,a=r[0],c=o[0];this.getNormal(a),c.setFromPoints(a,i);let l=r[1],u=o[1];l.subVectors(e,t),u.setFromPoints(l,i);let h=r[2],f=o[2];h.subVectors(t,n),f.setFromPoints(h,i);let d=r[3],g=o[3];d.subVectors(n,e),g.setFromPoints(d,i),this.sphere.setFromPoints(this.points),this.plane.setFromNormalAndCoplanarPoint(a,e),this.needsUpdate=!1}};Ri.prototype.closestPointToSegment=function(){let s=new w,e=new w,t=new Zi;return function(i,r=null,o=null){let{start:a,end:c}=i,l=this.points,u,h=1/0;for(let f=0;f<3;f++){let d=(f+1)%3;t.start.copy(l[f]),t.end.copy(l[d]),ic(t,i,s,e),u=s.distanceToSquared(e),u<h&&(h=u,r&&r.copy(s),o&&o.copy(e))}return this.closestPointToPoint(a,s),u=a.distanceToSquared(s),u<h&&(h=u,r&&r.copy(s),o&&o.copy(a)),this.closestPointToPoint(c,s),u=c.distanceToSquared(s),u<h&&(h=u,r&&r.copy(s),o&&o.copy(c)),Math.sqrt(h)}}();Ri.prototype.intersectsTriangle=function(){let s=new Ri,e=new Array(3),t=new Array(3),n=new Ki,i=new Ki,r=new w,o=new w,a=new w,c=new w,l=new w,u=new Zi,h=new Zi,f=new Zi,d=new w;function g(y,m,p){let b=y.points,_=0,T=-1;for(let P=0;P<3;P++){let{start:C,end:M}=u;C.copy(b[P]),M.copy(b[(P+1)%3]),u.delta(o);let z=nd(m.distanceToPoint(C));if(nd(m.normal.dot(o))&&z){p.copy(u),_=2;break}let v=m.intersectLine(u,d);if(!v&&z&&d.copy(C),(v||z)&&!nd(d.distanceTo(M))){if(_<=1)(_===1?p.start:p.end).copy(d),z&&(T=_);else if(_>=2){(T===1?p.start:p.end).copy(d),_=2;break}if(_++,_===2&&T===-1)break}}return _}return function(m,p=null,b=!1){this.needsUpdate&&this.update(),m.isExtendedTriangle?m.needsUpdate&&m.update():(s.copy(m),s.update(),m=s);let _=this.plane,T=m.plane;if(Math.abs(_.normal.dot(T.normal))>1-1e-10){let P=this.satBounds,C=this.satAxes;t[0]=m.a,t[1]=m.b,t[2]=m.c;for(let v=0;v<4;v++){let R=P[v],V=C[v];if(n.setFromPoints(V,t),R.isSeparated(n))return!1}let M=m.satBounds,z=m.satAxes;e[0]=this.a,e[1]=this.b,e[2]=this.c;for(let v=0;v<4;v++){let R=M[v],V=z[v];if(n.setFromPoints(V,e),R.isSeparated(n))return!1}for(let v=0;v<4;v++){let R=C[v];for(let V=0;V<4;V++){let O=z[V];if(r.crossVectors(R,O),n.setFromPoints(r,e),i.setFromPoints(r,t),n.isSeparated(i))return!1}}return p&&(b||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),p.start.set(0,0,0),p.end.set(0,0,0)),!0}else{let P=g(this,T,h);if(P===1&&m.containsPoint(h.end))return p&&(p.start.copy(h.end),p.end.copy(h.end)),!0;if(P!==2)return!1;let C=g(m,_,f);if(C===1&&this.containsPoint(f.end))return p&&(p.start.copy(f.end),p.end.copy(f.end)),!0;if(C!==2)return!1;if(h.delta(a),f.delta(c),a.dot(c)<0){let j=f.start;f.start=f.end,f.end=j}let M=h.start.dot(a),z=h.end.dot(a),v=f.start.dot(a),R=f.end.dot(a),V=z<v,O=M<R;return M!==R&&v!==z&&V===O?!1:(p&&(l.subVectors(h.start,f.start),l.dot(a)>0?p.start.copy(h.start):p.start.copy(f.start),l.subVectors(h.end,f.end),l.dot(a)<0?p.end.copy(h.end):p.end.copy(f.end)),!0)}}}();Ri.prototype.distanceToPoint=function(){let s=new w;return function(t){return this.closestPointToPoint(t,s),t.distanceTo(s)}}();Ri.prototype.distanceToTriangle=function(){let s=new w,e=new w,t=["a","b","c"],n=new Zi,i=new Zi;return function(o,a=null,c=null){let l=a||c?n:null;if(this.intersectsTriangle(o,l))return(a||c)&&(a&&l.getCenter(a),c&&l.getCenter(c)),0;let u=1/0;for(let h=0;h<3;h++){let f,d=t[h],g=o[d];this.closestPointToPoint(g,s),f=g.distanceToSquared(s),f<u&&(u=f,a&&a.copy(s),c&&c.copy(g));let y=this[d];o.closestPointToPoint(y,s),f=y.distanceToSquared(s),f<u&&(u=f,a&&a.copy(y),c&&c.copy(s))}for(let h=0;h<3;h++){let f=t[h],d=t[(h+1)%3];n.set(this[f],this[d]);for(let g=0;g<3;g++){let y=t[g],m=t[(g+1)%3];i.set(o[y],o[m]),ic(n,i,s,e);let p=s.distanceToSquared(e);p<u&&(u=p,a&&a.copy(s),c&&c.copy(e))}}return Math.sqrt(u)}}()});var ei,no=kt(()=>{li();ed();$o();td();ei=class{constructor(e,t,n){this.isOrientedBox=!0,this.min=new w,this.max=new w,this.matrix=new vt,this.invMatrix=new vt,this.points=new Array(8).fill().map(()=>new w),this.satAxes=new Array(3).fill().map(()=>new w),this.satBounds=new Array(3).fill().map(()=>new Ki),this.alignedSatBounds=new Array(3).fill().map(()=>new Ki),this.needsUpdate=!1,e&&this.min.copy(e),t&&this.max.copy(t),n&&this.matrix.copy(n)}set(e,t,n){this.min.copy(e),this.max.copy(t),this.matrix.copy(n),this.needsUpdate=!0}copy(e){this.min.copy(e.min),this.max.copy(e.max),this.matrix.copy(e.matrix),this.needsUpdate=!0}};ei.prototype.update=function(){return function(){let e=this.matrix,t=this.min,n=this.max,i=this.points;for(let l=0;l<=1;l++)for(let u=0;u<=1;u++)for(let h=0;h<=1;h++){let f=1*l|2*u|4*h,d=i[f];d.x=l?n.x:t.x,d.y=u?n.y:t.y,d.z=h?n.z:t.z,d.applyMatrix4(e)}let r=this.satBounds,o=this.satAxes,a=i[0];for(let l=0;l<3;l++){let u=o[l],h=r[l],f=1<<l,d=i[f];u.subVectors(a,d),h.setFromPoints(u,i)}let c=this.alignedSatBounds;c[0].setFromPointsField(i,"x"),c[1].setFromPointsField(i,"y"),c[2].setFromPointsField(i,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}}();ei.prototype.intersectsBox=function(){let s=new Ki;return function(t){this.needsUpdate&&this.update();let n=t.min,i=t.max,r=this.satBounds,o=this.satAxes,a=this.alignedSatBounds;if(s.min=n.x,s.max=i.x,a[0].isSeparated(s)||(s.min=n.y,s.max=i.y,a[1].isSeparated(s))||(s.min=n.z,s.max=i.z,a[2].isSeparated(s)))return!1;for(let c=0;c<3;c++){let l=o[c],u=r[c];if(s.setFromBox(l,t),u.isSeparated(s))return!1}return!0}}();ei.prototype.intersectsTriangle=function(){let s=new Ri,e=new Array(3),t=new Ki,n=new Ki,i=new w;return function(o){this.needsUpdate&&this.update(),o.isExtendedTriangle?o.needsUpdate&&o.update():(s.copy(o),s.update(),o=s);let a=this.satBounds,c=this.satAxes;e[0]=o.a,e[1]=o.b,e[2]=o.c;for(let f=0;f<3;f++){let d=a[f],g=c[f];if(t.setFromPoints(g,e),d.isSeparated(t))return!1}let l=o.satBounds,u=o.satAxes,h=this.points;for(let f=0;f<3;f++){let d=l[f],g=u[f];if(t.setFromPoints(g,h),d.isSeparated(t))return!1}for(let f=0;f<3;f++){let d=c[f];for(let g=0;g<4;g++){let y=u[g];if(i.crossVectors(d,y),t.setFromPoints(i,e),n.setFromPoints(i,h),t.isSeparated(n))return!1}}return!0}}();ei.prototype.closestPointToPoint=function(){return function(e,t){return this.needsUpdate&&this.update(),t.copy(e).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),t}}();ei.prototype.distanceToPoint=function(){let s=new w;return function(t){return this.closestPointToPoint(t,s),t.distanceTo(s)}}();ei.prototype.distanceToBox=function(){let s=["x","y","z"],e=new Array(12).fill().map(()=>new Zi),t=new Array(12).fill().map(()=>new Zi),n=new w,i=new w;return function(o,a=0,c=null,l=null){if(this.needsUpdate&&this.update(),this.intersectsBox(o))return(c||l)&&(o.getCenter(i),this.closestPointToPoint(i,n),o.closestPointToPoint(n,i),c&&c.copy(n),l&&l.copy(i)),0;let u=a*a,h=o.min,f=o.max,d=this.points,g=1/0;for(let m=0;m<8;m++){let p=d[m];i.copy(p).clamp(h,f);let b=p.distanceToSquared(i);if(b<g&&(g=b,c&&c.copy(p),l&&l.copy(i),b<u))return Math.sqrt(b)}let y=0;for(let m=0;m<3;m++)for(let p=0;p<=1;p++)for(let b=0;b<=1;b++){let _=(m+1)%3,T=(m+2)%3,P=p<<_|b<<T,C=1<<m|p<<_|b<<T,M=d[P],z=d[C];e[y].set(M,z);let R=s[m],V=s[_],O=s[T],j=t[y],B=j.start,Y=j.end;B[R]=h[R],B[V]=p?h[V]:f[V],B[O]=b?h[O]:f[V],Y[R]=f[R],Y[V]=p?h[V]:f[V],Y[O]=b?h[O]:f[V],y++}for(let m=0;m<=1;m++)for(let p=0;p<=1;p++)for(let b=0;b<=1;b++){i.x=m?f.x:h.x,i.y=p?f.y:h.y,i.z=b?f.z:h.z,this.closestPointToPoint(i,n);let _=i.distanceToSquared(n);if(_<g&&(g=_,c&&c.copy(n),l&&l.copy(i),_<u))return Math.sqrt(_)}for(let m=0;m<12;m++){let p=e[m];for(let b=0;b<12;b++){let _=t[b];ic(p,_,n,i);let T=n.distanceToSquared(i);if(T<g&&(g=T,c&&c.copy(n),l&&l.copy(i),T<u))return Math.sqrt(T)}}return Math.sqrt(g)}}()});var Ir,Kl=kt(()=>{Ir=class{constructor(e){this._getNewPrimitive=e,this._primitives=[]}getPrimitive(){let e=this._primitives;return e.length===0?this._getNewPrimitive():e.pop()}releasePrimitive(e){this._primitives.push(e)}}});var id,qi,Jl=kt(()=>{$o();Kl();id=class extends Ir{constructor(){super(()=>new Ri)}},qi=new id});var sd,vn,ir=kt(()=>{sd=class{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;let e=[],t=null;this.setBuffer=n=>{t&&e.push(t),t=n,this.float32Array=new Float32Array(n),this.uint16Array=new Uint16Array(n),this.uint32Array=new Uint32Array(n)},this.clearBuffer=()=>{t=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,e.length!==0&&this.setBuffer(e.pop())}}},vn=new sd});function G0(s,e,t,n,i,r){Lr=$l.getPrimitive(),ea=$l.getPrimitive(),Qo.push(Lr,ea),vn.setBuffer(s._roots[e]);let o=rd(0,s.geometry,t,n,i,r);vn.clearBuffer(),$l.releasePrimitive(Lr),$l.releasePrimitive(ea),Qo.pop(),Qo.pop();let a=Qo.length;return a>0&&(ea=Qo[a-1],Lr=Qo[a-2]),o}function rd(s,e,t,n,i=null,r=0,o=0){let{float32Array:a,uint16Array:c,uint32Array:l}=vn,u=s*2;if(Kn(u,c)){let f=si(s,l),d=ui(u,c);return Nn(s,a,Lr),n(f,d,!1,o,r+s,Lr)}else{let R=function(O){let{uint16Array:j,uint32Array:B}=vn,Y=O*2;for(;!Kn(Y,j);)O=Ei(O),Y=O*2;return si(O,B)},V=function(O){let{uint16Array:j,uint32Array:B}=vn,Y=O*2;for(;!Kn(Y,j);)O=Ti(O,B),Y=O*2;return si(O,B)+ui(Y,j)},f=Ei(s),d=Ti(s,l),g=f,y=d,m,p,b,_;if(i&&(b=Lr,_=ea,Nn(g,a,b),Nn(y,a,_),m=i(b),p=i(_),p<m)){g=d,y=f;let O=m;m=p,p=O,b=_}b||(b=Lr,Nn(g,a,b));let T=Kn(g*2,c),P=t(b,T,m,o+1,r+g),C;if(P===2){let O=R(g),B=V(g)-O;C=n(O,B,!0,o+1,r+g,b)}else C=P&&rd(g,e,t,n,i,r,o+1);if(C)return!0;_=ea,Nn(y,a,_);let M=Kn(y*2,c),z=t(_,M,p,o+1,r+y),v;if(z===2){let O=R(y),B=V(y)-O;v=n(O,B,!0,o+1,r+y,_)}else v=z&&rd(y,e,t,n,i,r,o+1);return!!v}}var Lr,ea,Qo,$l,W0=kt(()=>{li();to();Kl();Os();ir();Qo=[],$l=new Ir(()=>new on)});function X0(s,e,t={},n=0,i=1/0){let r=n*n,o=i*i,a=1/0,c=null;if(s.shapecast({boundsTraverseOrder:u=>(sc.copy(e).clamp(u.min,u.max),sc.distanceToSquared(e)),intersectsBounds:(u,h,f)=>f<a&&f<o,intersectsTriangle:(u,h)=>{u.closestPointToPoint(e,sc);let f=e.distanceToSquared(sc);return f<a&&(ad.copy(sc),a=f,c=h),f<r}}),a===1/0)return null;let l=Math.sqrt(a);return t.point?t.point.copy(ad):t.point=ad.clone(),t.distance=l,t.faceIndex=c,t}var sc,ad,q0=kt(()=>{li();sc=new w,ad=new w});function vE(s,e,t,n,i,r,o,a){let c;if(r===Ui?c=s.intersectTriangle(n,t,e,!0,i):c=s.intersectTriangle(e,t,n,r!==Mi,i),c===null)return null;let l=s.origin.distanceTo(i);return l<o||l>a?null:{distance:l,point:i.clone()}}function bE(s,e,t,n,i,r,o,a,c,l,u){ta.fromBufferAttribute(e,r),na.fromBufferAttribute(e,o),ia.fromBufferAttribute(e,a);let h=vE(s,ta,na,ia,nu,c,l,u);if(h){n&&(Ql.fromBufferAttribute(n,r),eu.fromBufferAttribute(n,o),tu.fromBufferAttribute(n,a),h.uv=ss.getInterpolation(nu,ta,na,ia,Ql,eu,tu,new nt)),i&&(Ql.fromBufferAttribute(i,r),eu.fromBufferAttribute(i,o),tu.fromBufferAttribute(i,a),h.uv1=ss.getInterpolation(nu,ta,na,ia,Ql,eu,tu,new nt)),t&&(Y0.fromBufferAttribute(t,r),j0.fromBufferAttribute(t,o),Z0.fromBufferAttribute(t,a),h.normal=ss.getInterpolation(nu,ta,na,ia,Y0,j0,Z0,new w),h.normal.dot(s.direction)>0&&h.normal.multiplyScalar(-1));let f={a:r,b:o,c:a,normal:new w,materialIndex:0};ss.getNormal(ta,na,ia,f.normal),h.face=f,h.faceIndex=r}return h}function sa(s,e,t,n,i,r,o){let a=n*3,c=a+0,l=a+1,u=a+2,h=s.index;s.index&&(c=h.getX(c),l=h.getX(l),u=h.getX(u));let{position:f,normal:d,uv:g,uv1:y}=s.attributes,m=bE(t,f,d,g,y,c,l,u,e,r,o);return m?(m.faceIndex=n,i&&i.push(m),m):null}var ta,na,ia,Ql,eu,tu,Y0,j0,Z0,nu,cd=kt(()=>{li();ta=new w,na=new w,ia=new w,Ql=new nt,eu=new nt,tu=new nt,Y0=new w,j0=new w,Z0=new w,nu=new w});function Dn(s,e,t,n){let i=s.a,r=s.b,o=s.c,a=e,c=e+1,l=e+2;t&&(a=t.getX(a),c=t.getX(c),l=t.getX(l)),i.x=n.getX(a),i.y=n.getY(a),i.z=n.getZ(a),r.x=n.getX(c),r.y=n.getY(c),r.z=n.getZ(c),o.x=n.getX(l),o.y=n.getY(l),o.z=n.getZ(l)}var Nr=kt(()=>{});function K0(s,e,t,n,i,r,o,a){let{geometry:c,_indirectBuffer:l}=s;for(let u=n,h=n+i;u<h;u++)sa(c,e,t,u,r,o,a)}function J0(s,e,t,n,i,r,o){let{geometry:a,_indirectBuffer:c}=s,l=1/0,u=null;for(let h=n,f=n+i;h<f;h++){let d;d=sa(a,e,t,h,null,r,o),d&&d.distance<l&&(u=d,l=d.distance)}return u}function $0(s,e,t,n,i,r,o){let{geometry:a}=t,{index:c}=a,l=a.attributes.position;for(let u=s,h=e+s;u<h;u++){let f;if(f=u,Dn(o,f*3,c,l),o.needsUpdate=!0,n(o,f,i,r))return!0}return!1}var iu=kt(()=>{cd();Nr()});function Q0(s,e=null){e&&Array.isArray(e)&&(e=new Set(e));let t=s.geometry,n=t.index?t.index.array:null,i=t.attributes.position,r,o,a,c,l=0,u=s._roots;for(let f=0,d=u.length;f<d;f++)r=u[f],o=new Uint32Array(r),a=new Uint16Array(r),c=new Float32Array(r),h(0,l),l+=r.byteLength;function h(f,d,g=!1){let y=f*2;if(a[y+15]===65535){let p=o[f+6],b=a[y+14],_=1/0,T=1/0,P=1/0,C=-1/0,M=-1/0,z=-1/0;for(let v=3*p,R=3*(p+b);v<R;v++){let V=n[v],O=i.getX(V),j=i.getY(V),B=i.getZ(V);O<_&&(_=O),O>C&&(C=O),j<T&&(T=j),j>M&&(M=j),B<P&&(P=B),B>z&&(z=B)}return c[f+0]!==_||c[f+1]!==T||c[f+2]!==P||c[f+3]!==C||c[f+4]!==M||c[f+5]!==z?(c[f+0]=_,c[f+1]=T,c[f+2]=P,c[f+3]=C,c[f+4]=M,c[f+5]=z,!0):!1}else{let p=f+8,b=o[f+6],_=p+d,T=b+d,P=g,C=!1,M=!1;e?P||(C=e.has(_),M=e.has(T),P=!C&&!M):(C=!0,M=!0);let z=P||C,v=P||M,R=!1;z&&(R=h(p,d,P));let V=!1;v&&(V=h(b,d,P));let O=R||V;if(O)for(let j=0;j<3;j++){let B=p+j,Y=b+j,Z=c[B],Ee=c[B+3],ae=c[Y],_e=c[Y+3];c[f+j]=Z<ae?Z:ae,c[f+j+3]=Ee>_e?Ee:_e}return O}}}var eg=kt(()=>{});function ys(s,e,t,n,i){let r,o,a,c,l,u,h=1/t.direction.x,f=1/t.direction.y,d=1/t.direction.z,g=t.origin.x,y=t.origin.y,m=t.origin.z,p=e[s],b=e[s+3],_=e[s+1],T=e[s+3+1],P=e[s+2],C=e[s+3+2];return h>=0?(r=(p-g)*h,o=(b-g)*h):(r=(b-g)*h,o=(p-g)*h),f>=0?(a=(_-y)*f,c=(T-y)*f):(a=(T-y)*f,c=(_-y)*f),r>c||a>o||((a>r||isNaN(r))&&(r=a),(c<o||isNaN(o))&&(o=c),d>=0?(l=(P-m)*d,u=(C-m)*d):(l=(C-m)*d,u=(P-m)*d),r>u||l>o)?!1:((l>r||r!==r)&&(r=l),(u<o||o!==o)&&(o=u),r<=i&&o>=n)}var rc=kt(()=>{});function tg(s,e,t,n,i,r,o,a){let{geometry:c,_indirectBuffer:l}=s;for(let u=n,h=n+i;u<h;u++){let f=l?l[u]:u;sa(c,e,t,f,r,o,a)}}function ng(s,e,t,n,i,r,o){let{geometry:a,_indirectBuffer:c}=s,l=1/0,u=null;for(let h=n,f=n+i;h<f;h++){let d;d=sa(a,e,t,c?c[h]:h,null,r,o),d&&d.distance<l&&(u=d,l=d.distance)}return u}function ig(s,e,t,n,i,r,o){let{geometry:a}=t,{index:c}=a,l=a.attributes.position;for(let u=s,h=e+s;u<h;u++){let f;if(f=t.resolveTriangleIndex(u),Dn(o,f*3,c,l),o.needsUpdate=!0,n(o,f,i,r))return!0}return!1}var su=kt(()=>{cd();Nr()});function sg(s,e,t,n,i,r,o){vn.setBuffer(s._roots[e]),ld(0,s,t,n,i,r,o),vn.clearBuffer()}function ld(s,e,t,n,i,r,o){let{float32Array:a,uint16Array:c,uint32Array:l}=vn,u=s*2;if(Kn(u,c)){let f=si(s,l),d=ui(u,c);K0(e,t,n,f,d,i,r,o)}else{let f=Ei(s);ys(f,a,n,r,o)&&ld(f,e,t,n,i,r,o);let d=Ti(s,l);ys(d,a,n,r,o)&&ld(d,e,t,n,i,r,o)}}var rg=kt(()=>{rc();Os();ir();iu()});function og(s,e,t,n,i,r){vn.setBuffer(s._roots[e]);let o=ud(0,s,t,n,i,r);return vn.clearBuffer(),o}function ud(s,e,t,n,i,r){let{float32Array:o,uint16Array:a,uint32Array:c}=vn,l=s*2;if(Kn(l,a)){let h=si(s,c),f=ui(l,a);return J0(e,t,n,h,f,i,r)}else{let h=ql(s,c),f=ME[h],g=n.direction[f]>=0,y,m;g?(y=Ei(s),m=Ti(s,c)):(y=Ti(s,c),m=Ei(s));let b=ys(y,o,n,i,r)?ud(y,e,t,n,i,r):null;if(b){let P=b.point[f];if(g?P<=o[m+h]:P>=o[m+h+3])return b}let T=ys(m,o,n,i,r)?ud(m,e,t,n,i,r):null;return b&&T?b.distance<=T.distance?b:T:b||T||null}}var ME,ag=kt(()=>{Os();ir();rc();iu();ME=["x","y","z"]});function lg(s,e,t,n){vn.setBuffer(s._roots[e]);let i=hd(0,s,t,n);return vn.clearBuffer(),i}function hd(s,e,t,n,i=null){let{float32Array:r,uint16Array:o,uint32Array:a}=vn,c=s*2;if(i===null&&(t.boundingBox||t.computeBoundingBox(),cg.set(t.boundingBox.min,t.boundingBox.max,n),i=cg),Kn(c,o)){let u=e.geometry,h=u.index,f=u.attributes.position,d=t.index,g=t.attributes.position,y=si(s,a),m=ui(c,o);if(oc.copy(n).invert(),t.boundsTree)return Nn(s,r,ou),ou.matrix.copy(oc),ou.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:b=>ou.intersectsBox(b),intersectsTriangle:b=>{b.a.applyMatrix4(n),b.b.applyMatrix4(n),b.c.applyMatrix4(n),b.needsUpdate=!0;for(let _=y*3,T=(m+y)*3;_<T;_+=3)if(Dn(oa,_,h,f),oa.needsUpdate=!0,b.intersectsTriangle(oa))return!0;return!1}});for(let p=y*3,b=(m+y)*3;p<b;p+=3){Dn(ra,p,h,f),ra.a.applyMatrix4(oc),ra.b.applyMatrix4(oc),ra.c.applyMatrix4(oc),ra.needsUpdate=!0;for(let _=0,T=d.count;_<T;_+=3)if(Dn(oa,_,d,g),oa.needsUpdate=!0,ra.intersectsTriangle(oa))return!0}}else{let u=s+8,h=a[s+6];return Nn(u,r,ru),!!(i.intersectsBox(ru)&&hd(u,e,t,n,i)||(Nn(h,r,ru),i.intersectsBox(ru)&&hd(h,e,t,n,i)))}}var ru,ra,oa,oc,cg,ou,ug=kt(()=>{li();no();$o();Nr();to();Os();ir();ru=new on,ra=new Ri,oa=new Ri,oc=new vt,cg=new ei,ou=new ei});function hg(s,e,t,n={},i={},r=0,o=1/0){e.boundingBox||e.computeBoundingBox(),fd.set(e.boundingBox.min,e.boundingBox.max,t),fd.needsUpdate=!0;let a=s.geometry,c=a.attributes.position,l=a.index,u=e.attributes.position,h=e.index,f=qi.getPrimitive(),d=qi.getPrimitive(),g=SE,y=EE,m=null,p=null;i&&(m=TE,p=wE);let b=1/0,_=null,T=null;return au.copy(t).invert(),ac.matrix.copy(au),s.shapecast({boundsTraverseOrder:P=>fd.distanceToBox(P),intersectsBounds:(P,C,M)=>M<b&&M<o?(C&&(ac.min.copy(P.min),ac.max.copy(P.max),ac.needsUpdate=!0),!0):!1,intersectsRange:(P,C)=>{if(e.boundsTree)return e.boundsTree.shapecast({boundsTraverseOrder:z=>ac.distanceToBox(z),intersectsBounds:(z,v,R)=>R<b&&R<o,intersectsRange:(z,v)=>{for(let R=z,V=z+v;R<V;R++){Dn(d,3*R,h,u),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let O=P,j=P+C;O<j;O++){Dn(f,3*O,l,c),f.needsUpdate=!0;let B=f.distanceToTriangle(d,g,m);if(B<b&&(y.copy(g),p&&p.copy(m),b=B,_=O,T=R),B<r)return!0}}}});{let M=Bs(e);for(let z=0,v=M;z<v;z++){Dn(d,3*z,h,u),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let R=P,V=P+C;R<V;R++){Dn(f,3*R,l,c),f.needsUpdate=!0;let O=f.distanceToTriangle(d,g,m);if(O<b&&(y.copy(g),p&&p.copy(m),b=O,_=R,T=z),O<r)return!0}}}}}),qi.releasePrimitive(f),qi.releasePrimitive(d),b===1/0?null:(n.point?n.point.copy(y):n.point=y.clone(),n.distance=b,n.faceIndex=_,i&&(i.point?i.point.copy(p):i.point=p.clone(),i.point.applyMatrix4(au),y.applyMatrix4(au),i.distance=y.sub(i.point).length(),i.faceIndex=T),n)}var au,fd,ac,SE,EE,TE,wE,fg=kt(()=>{li();no();Nr();Qa();Jl();au=new vt,fd=new ei,ac=new ei,SE=new w,EE=new w,TE=new w,wE=new w});function dg(s,e=null){e&&Array.isArray(e)&&(e=new Set(e));let t=s.geometry,n=t.index?t.index.array:null,i=t.attributes.position,r,o,a,c,l=0,u=s._roots;for(let f=0,d=u.length;f<d;f++)r=u[f],o=new Uint32Array(r),a=new Uint16Array(r),c=new Float32Array(r),h(0,l),l+=r.byteLength;function h(f,d,g=!1){let y=f*2;if(a[y+15]===65535){let p=o[f+6],b=a[y+14],_=1/0,T=1/0,P=1/0,C=-1/0,M=-1/0,z=-1/0;for(let v=p,R=p+b;v<R;v++){let V=3*s.resolveTriangleIndex(v);for(let O=0;O<3;O++){let j=V+O;j=n?n[j]:j;let B=i.getX(j),Y=i.getY(j),Z=i.getZ(j);B<_&&(_=B),B>C&&(C=B),Y<T&&(T=Y),Y>M&&(M=Y),Z<P&&(P=Z),Z>z&&(z=Z)}}return c[f+0]!==_||c[f+1]!==T||c[f+2]!==P||c[f+3]!==C||c[f+4]!==M||c[f+5]!==z?(c[f+0]=_,c[f+1]=T,c[f+2]=P,c[f+3]=C,c[f+4]=M,c[f+5]=z,!0):!1}else{let p=f+8,b=o[f+6],_=p+d,T=b+d,P=g,C=!1,M=!1;e?P||(C=e.has(_),M=e.has(T),P=!C&&!M):(C=!0,M=!0);let z=P||C,v=P||M,R=!1;z&&(R=h(p,d,P));let V=!1;v&&(V=h(b,d,P));let O=R||V;if(O)for(let j=0;j<3;j++){let B=p+j,Y=b+j,Z=c[B],Ee=c[B+3],ae=c[Y],_e=c[Y+3];c[f+j]=Z<ae?Z:ae,c[f+j+3]=Ee>_e?Ee:_e}return O}}}var pg=kt(()=>{});function mg(s,e,t,n,i,r,o){vn.setBuffer(s._roots[e]),dd(0,s,t,n,i,r,o),vn.clearBuffer()}function dd(s,e,t,n,i,r,o){let{float32Array:a,uint16Array:c,uint32Array:l}=vn,u=s*2;if(Kn(u,c)){let f=si(s,l),d=ui(u,c);tg(e,t,n,f,d,i,r,o)}else{let f=Ei(s);ys(f,a,n,r,o)&&dd(f,e,t,n,i,r,o);let d=Ti(s,l);ys(d,a,n,r,o)&&dd(d,e,t,n,i,r,o)}}var gg=kt(()=>{rc();Os();ir();su()});function xg(s,e,t,n,i,r){vn.setBuffer(s._roots[e]);let o=pd(0,s,t,n,i,r);return vn.clearBuffer(),o}function pd(s,e,t,n,i,r){let{float32Array:o,uint16Array:a,uint32Array:c}=vn,l=s*2;if(Kn(l,a)){let h=si(s,c),f=ui(l,a);return ng(e,t,n,h,f,i,r)}else{let h=ql(s,c),f=AE[h],g=n.direction[f]>=0,y,m;g?(y=Ei(s),m=Ti(s,c)):(y=Ti(s,c),m=Ei(s));let b=ys(y,o,n,i,r)?pd(y,e,t,n,i,r):null;if(b){let P=b.point[f];if(g?P<=o[m+h]:P>=o[m+h+3])return b}let T=ys(m,o,n,i,r)?pd(m,e,t,n,i,r):null;return b&&T?b.distance<=T.distance?b:T:b||T||null}}var AE,yg=kt(()=>{Os();ir();rc();su();AE=["x","y","z"]});function vg(s,e,t,n){vn.setBuffer(s._roots[e]);let i=md(0,s,t,n);return vn.clearBuffer(),i}function md(s,e,t,n,i=null){let{float32Array:r,uint16Array:o,uint32Array:a}=vn,c=s*2;if(i===null&&(t.boundingBox||t.computeBoundingBox(),_g.set(t.boundingBox.min,t.boundingBox.max,n),i=_g),Kn(c,o)){let u=e.geometry,h=u.index,f=u.attributes.position,d=t.index,g=t.attributes.position,y=si(s,a),m=ui(c,o);if(cc.copy(n).invert(),t.boundsTree)return Nn(s,r,lu),lu.matrix.copy(cc),lu.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:b=>lu.intersectsBox(b),intersectsTriangle:b=>{b.a.applyMatrix4(n),b.b.applyMatrix4(n),b.c.applyMatrix4(n),b.needsUpdate=!0;for(let _=y,T=m+y;_<T;_++)if(Dn(ca,3*e.resolveTriangleIndex(_),h,f),ca.needsUpdate=!0,b.intersectsTriangle(ca))return!0;return!1}});for(let p=y,b=m+y;p<b;p++){let _=e.resolveTriangleIndex(p);Dn(aa,3*_,h,f),aa.a.applyMatrix4(cc),aa.b.applyMatrix4(cc),aa.c.applyMatrix4(cc),aa.needsUpdate=!0;for(let T=0,P=d.count;T<P;T+=3)if(Dn(ca,T,d,g),ca.needsUpdate=!0,aa.intersectsTriangle(ca))return!0}}else{let u=s+8,h=a[s+6];return Nn(u,r,cu),!!(i.intersectsBox(cu)&&md(u,e,t,n,i)||(Nn(h,r,cu),i.intersectsBox(cu)&&md(h,e,t,n,i)))}}var cu,aa,ca,cc,_g,lu,bg=kt(()=>{li();no();$o();Nr();to();Os();ir();cu=new on,aa=new Ri,ca=new Ri,cc=new vt,_g=new ei,lu=new ei});function Mg(s,e,t,n={},i={},r=0,o=1/0){e.boundingBox||e.computeBoundingBox(),gd.set(e.boundingBox.min,e.boundingBox.max,t),gd.needsUpdate=!0;let a=s.geometry,c=a.attributes.position,l=a.index,u=e.attributes.position,h=e.index,f=qi.getPrimitive(),d=qi.getPrimitive(),g=RE,y=CE,m=null,p=null;i&&(m=PE,p=IE);let b=1/0,_=null,T=null;return uu.copy(t).invert(),lc.matrix.copy(uu),s.shapecast({boundsTraverseOrder:P=>gd.distanceToBox(P),intersectsBounds:(P,C,M)=>M<b&&M<o?(C&&(lc.min.copy(P.min),lc.max.copy(P.max),lc.needsUpdate=!0),!0):!1,intersectsRange:(P,C)=>{if(e.boundsTree){let M=e.boundsTree;return M.shapecast({boundsTraverseOrder:z=>lc.distanceToBox(z),intersectsBounds:(z,v,R)=>R<b&&R<o,intersectsRange:(z,v)=>{for(let R=z,V=z+v;R<V;R++){let O=M.resolveTriangleIndex(R);Dn(d,3*O,h,u),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let j=P,B=P+C;j<B;j++){let Y=s.resolveTriangleIndex(j);Dn(f,3*Y,l,c),f.needsUpdate=!0;let Z=f.distanceToTriangle(d,g,m);if(Z<b&&(y.copy(g),p&&p.copy(m),b=Z,_=j,T=R),Z<r)return!0}}}})}else{let M=Bs(e);for(let z=0,v=M;z<v;z++){Dn(d,3*z,h,u),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let R=P,V=P+C;R<V;R++){let O=s.resolveTriangleIndex(R);Dn(f,3*O,l,c),f.needsUpdate=!0;let j=f.distanceToTriangle(d,g,m);if(j<b&&(y.copy(g),p&&p.copy(m),b=j,_=R,T=z),j<r)return!0}}}}}),qi.releasePrimitive(f),qi.releasePrimitive(d),b===1/0?null:(n.point?n.point.copy(y):n.point=y.clone(),n.distance=b,n.faceIndex=_,i&&(i.point?i.point.copy(p):i.point=p.clone(),i.point.applyMatrix4(uu),y.applyMatrix4(uu),i.distance=y.sub(i.point).length(),i.faceIndex=T),n)}var uu,gd,lc,RE,CE,PE,IE,Sg=kt(()=>{li();no();Nr();Qa();Jl();uu=new vt,gd=new ei,lc=new ei,RE=new w,CE=new w,PE=new w,IE=new w});function Eg(){return typeof SharedArrayBuffer!="undefined"}var Tg=kt(()=>{});function wg(s,e,t,n){if(_d)throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");_d=!0;let i=s._roots,r=e._roots,o,a=0,c=0,l=new vt().copy(t).invert();for(let u=0,h=i.length;u<h;u++){uc.setBuffer(i[u]),c=0;let f=Dr.getPrimitive();Nn(0,uc.float32Array,f),f.applyMatrix4(l);for(let d=0,g=r.length;d<g&&(hu.setBuffer(r[d]),o=ws(0,0,t,l,n,a,c,0,0,f),hu.clearBuffer(),c+=r[d].length,!o);d++);if(Dr.releasePrimitive(f),uc.clearBuffer(),a+=i[u].length,o)break}return _d=!1,o}function ws(s,e,t,n,i,r=0,o=0,a=0,c=0,l=null,u=!1){let h,f;u?(h=hu,f=uc):(h=uc,f=hu);let d=h.float32Array,g=h.uint32Array,y=h.uint16Array,m=f.float32Array,p=f.uint32Array,b=f.uint16Array,_=s*2,T=e*2,P=Kn(_,y),C=Kn(T,b),M=!1;if(C&&P)u?M=i(si(e,p),ui(e*2,b),si(s,g),ui(s*2,y),c,o+e,a,r+s):M=i(si(s,g),ui(s*2,y),si(e,p),ui(e*2,b),a,r+s,c,o+e);else if(C){let z=Dr.getPrimitive();Nn(e,m,z),z.applyMatrix4(t);let v=Ei(s),R=Ti(s,g);Nn(v,d,la),Nn(R,d,ua);let V=z.intersectsBox(la),O=z.intersectsBox(ua);M=V&&ws(e,v,n,t,i,o,r,c,a+1,z,!u)||O&&ws(e,R,n,t,i,o,r,c,a+1,z,!u),Dr.releasePrimitive(z)}else{let z=Ei(e),v=Ti(e,p);Nn(z,m,xd),Nn(v,m,yd);let R=l.intersectsBox(xd),V=l.intersectsBox(yd);if(R&&V)M=ws(s,z,t,n,i,r,o,a,c+1,l,u)||ws(s,v,t,n,i,r,o,a,c+1,l,u);else if(R)if(P)M=ws(s,z,t,n,i,r,o,a,c+1,l,u);else{let O=Dr.getPrimitive();O.copy(xd).applyMatrix4(t);let j=Ei(s),B=Ti(s,g);Nn(j,d,la),Nn(B,d,ua);let Y=O.intersectsBox(la),Z=O.intersectsBox(ua);M=Y&&ws(z,j,n,t,i,o,r,c,a+1,O,!u)||Z&&ws(z,B,n,t,i,o,r,c,a+1,O,!u),Dr.releasePrimitive(O)}else if(V)if(P)M=ws(s,v,t,n,i,r,o,a,c+1,l,u);else{let O=Dr.getPrimitive();O.copy(yd).applyMatrix4(t);let j=Ei(s),B=Ti(s,g);Nn(j,d,la),Nn(B,d,ua);let Y=O.intersectsBox(la),Z=O.intersectsBox(ua);M=Y&&ws(v,j,n,t,i,o,r,c,a+1,O,!u)||Z&&ws(v,B,n,t,i,o,r,c,a+1,O,!u),Dr.releasePrimitive(O)}}return M}var uc,hu,Dr,la,ua,xd,yd,_d,Ag=kt(()=>{li();ir();Os();to();Kl();uc=new vn.constructor,hu=new vn.constructor,Dr=new Ir(()=>new on),la=new on,ua=new on,xd=new on,yd=new on,_d=!1});var fu,Rg,LE,du,Cg=kt(()=>{li();Yf();H0();no();to();Jl();W0();q0();iu();eg();rg();ag();ug();fg();su();pg();gg();yg();bg();Sg();Tg();Nr();Ag();fu=new ei,Rg=new on,LE={strategy:0,maxDepth:40,maxLeafTris:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null},du=class s{static serialize(e,t={}){t={cloneBuffers:!0,...t};let n=e.geometry,i=e._roots,r=e._indirectBuffer,o=n.getIndex(),a;return t.cloneBuffers?a={roots:i.map(c=>c.slice()),index:o?o.array.slice():null,indirectBuffer:r?r.slice():null}:a={roots:i,index:o?o.array:null,indirectBuffer:r},a}static deserialize(e,t,n={}){n={setIndex:!0,indirect:!!e.indirectBuffer,...n};let{index:i,roots:r,indirectBuffer:o}=e,a=new s(t,{...n,[Gl]:!0});if(a._roots=r,a._indirectBuffer=o||null,n.setIndex){let c=t.getIndex();if(c===null){let l=new Tn(e.index,1,!1);t.setIndex(l)}else c.array!==i&&(c.array.set(i),c.needsUpdate=!0)}return a}get indirect(){return!!this._indirectBuffer}constructor(e,t={}){if(e.isBufferGeometry){if(e.index&&e.index.isInterleavedBufferAttribute)throw new Error("MeshBVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw new Error("MeshBVH: Only BufferGeometries are supported.");if(t=Object.assign({...LE,[Gl]:!1},t),t.useSharedArrayBuffer&&!Eg())throw new Error("MeshBVH: SharedArrayBuffer is not available.");this.geometry=e,this._roots=null,this._indirectBuffer=null,t[Gl]||(z0(this,t),!e.boundingBox&&t.setBoundingBox&&(e.boundingBox=this.getBoundingBox(new on))),this.resolveTriangleIndex=t.indirect?n=>this._indirectBuffer[n]:n=>n}refit(e=null){return(this.indirect?dg:Q0)(this,e)}traverse(e,t=0){let n=this._roots[t],i=new Uint32Array(n),r=new Uint16Array(n);o(0);function o(a,c=0){let l=a*2,u=r[l+15]===65535;if(u){let h=i[a+6],f=r[l+14];e(c,u,new Float32Array(n,a*4,6),h,f)}else{let h=a+32/4,f=i[a+6],d=i[a+7];e(c,u,new Float32Array(n,a*4,6),d)||(o(h,c+1),o(f,c+1))}}}raycast(e,t=Gi,n=0,i=1/0){let r=this._roots,o=this.geometry,a=[],c=t.isMaterial,l=Array.isArray(t),u=o.groups,h=c?t.side:t,f=this.indirect?mg:sg;for(let d=0,g=r.length;d<g;d++){let y=l?t[u[d].materialIndex].side:h,m=a.length;if(f(this,d,y,e,a,n,i),l){let p=u[d].materialIndex;for(let b=m,_=a.length;b<_;b++)a[b].face.materialIndex=p}}return a}raycastFirst(e,t=Gi,n=0,i=1/0){let r=this._roots,o=this.geometry,a=t.isMaterial,c=Array.isArray(t),l=null,u=o.groups,h=a?t.side:t,f=this.indirect?xg:og;for(let d=0,g=r.length;d<g;d++){let y=c?t[u[d].materialIndex].side:h,m=f(this,d,y,e,n,i);m!=null&&(l==null||m.distance<l.distance)&&(l=m,c&&(m.face.materialIndex=u[d].materialIndex))}return l}intersectsGeometry(e,t){let n=!1,i=this._roots,r=this.indirect?vg:lg;for(let o=0,a=i.length;o<a&&(n=r(this,o,e,t),!n);o++);return n}shapecast(e){let t=qi.getPrimitive(),n=this.indirect?ig:$0,{boundsTraverseOrder:i,intersectsBounds:r,intersectsRange:o,intersectsTriangle:a}=e;if(o&&a){let h=o;o=(f,d,g,y,m)=>h(f,d,g,y,m)?!0:n(f,d,this,a,g,y,t)}else o||(a?o=(h,f,d,g)=>n(h,f,this,a,d,g,t):o=(h,f,d)=>d);let c=!1,l=0,u=this._roots;for(let h=0,f=u.length;h<f;h++){let d=u[h];if(c=G0(this,h,r,o,i,l),c)break;l+=d.byteLength}return qi.releasePrimitive(t),c}bvhcast(e,t,n){let{intersectsRanges:i,intersectsTriangles:r}=n,o=qi.getPrimitive(),a=this.geometry.index,c=this.geometry.attributes.position,l=this.indirect?g=>{let y=this.resolveTriangleIndex(g);Dn(o,y*3,a,c)}:g=>{Dn(o,g*3,a,c)},u=qi.getPrimitive(),h=e.geometry.index,f=e.geometry.attributes.position,d=e.indirect?g=>{let y=e.resolveTriangleIndex(g);Dn(u,y*3,h,f)}:g=>{Dn(u,g*3,h,f)};if(r){let g=(y,m,p,b,_,T,P,C)=>{for(let M=p,z=p+b;M<z;M++){d(M),u.a.applyMatrix4(t),u.b.applyMatrix4(t),u.c.applyMatrix4(t),u.needsUpdate=!0;for(let v=y,R=y+m;v<R;v++)if(l(v),o.needsUpdate=!0,r(o,u,v,M,_,T,P,C))return!0}return!1};if(i){let y=i;i=function(m,p,b,_,T,P,C,M){return y(m,p,b,_,T,P,C,M)?!0:g(m,p,b,_,T,P,C,M)}}else i=g}return wg(this,e,t,i)}intersectsBox(e,t){return fu.set(e.min,e.max,t),fu.needsUpdate=!0,this.shapecast({intersectsBounds:n=>fu.intersectsBox(n),intersectsTriangle:n=>fu.intersectsTriangle(n)})}intersectsSphere(e){return this.shapecast({intersectsBounds:t=>e.intersectsBox(t),intersectsTriangle:t=>t.intersectsSphere(e)})}closestPointToGeometry(e,t,n={},i={},r=0,o=1/0){return(this.indirect?Mg:hg)(this,e,t,n,i,r,o)}closestPointToPoint(e,t={},n=0,i=1/0){return X0(this,e,t,n,i)}getBoundingBox(e){return e.makeEmpty(),this._roots.forEach(n=>{Nn(0,new Float32Array(n),Rg),e.union(Rg)}),e}}});function vd(s,e,t){return s===null?null:(s.point.applyMatrix4(e.matrixWorld),s.distance=s.point.distanceTo(t.ray.origin),s.object=e,s)}var Pg=kt(()=>{});function Ug(s,e){this.isBatchedMesh?UE.call(this,s,e):FE.call(this,s,e)}function UE(s,e){if(this.boundsTrees){let t=this.boundsTrees,n=this._drawInfo,i=this._drawRanges,r=this.matrixWorld;Ci.material=this.material,Ci.geometry=this.geometry;let o=Ci.geometry.boundsTree,a=Ci.geometry.drawRange;Ci.geometry.boundingSphere===null&&(Ci.geometry.boundingSphere=new ii);for(let c=0,l=n.length;c<l;c++){if(!this.getVisibleAt(c))continue;let u=n[c].geometryIndex;if(Ci.geometry.boundsTree=t[u],this.getMatrixAt(c,Ci.matrixWorld).premultiply(r),!Ci.geometry.boundsTree){this.getBoundingBoxAt(u,Ci.geometry.boundingBox),this.getBoundingSphereAt(u,Ci.geometry.boundingSphere);let h=i[u];Ci.geometry.setDrawRange(h.start,h.count)}Ci.raycast(s,mu);for(let h=0,f=mu.length;h<f;h++){let d=mu[h];d.object=this,d.batchId=c,e.push(d)}mu.length=0}Ci.geometry.boundsTree=o,Ci.geometry.drawRange=a,Ci.material=null,Ci.geometry=null}else DE.call(this,s,e)}function FE(s,e){if(this.geometry.boundsTree){if(this.material===void 0)return;Ng.copy(this.matrixWorld).invert(),pu.copy(s.ray).applyMatrix4(Ng),Dg.setFromMatrixScale(this.matrixWorld),Lg.copy(pu.direction).multiply(Dg);let t=Lg.length(),n=s.near/t,i=s.far/t,r=this.geometry.boundsTree;if(s.firstHitOnly===!0){let o=vd(r.raycastFirst(pu,this.material,n,i),this,s);o&&e.push(o)}else{let o=r.raycast(pu,this.material,n,i);for(let a=0,c=o.length;a<c;a++){let l=vd(o[a],this,s);l&&e.push(l)}}}else NE.call(this,s,e)}function Fg(s={}){return this.boundsTree=new du(this,s),this.boundsTree}var Ig,Gw,pu,Lg,Ng,NE,DE,Dg,Ci,mu,Bg=kt(()=>{li();Pg();Cg();li();Ig=_l||null,Gw=parseInt(Ka)>=166,pu=new $s,Lg=new w,Ng=new vt,NE=Sn.prototype.raycast,DE=Ig!==null?Ig.prototype.raycast:null,Dg=new w,Ci=new Sn,mu=[]});var Og=kt(()=>{});var kg=kt(()=>{});var zg=kt(()=>{});var Hg,Vg=kt(()=>{Hg=`

// A stack of uint32 indices can can store the indices for
// a perfectly balanced tree with a depth up to 31. Lower stack
// depth gets higher performance.
//
// However not all trees are balanced. Best value to set this to
// is the trees max depth.
#ifndef BVH_STACK_DEPTH
#define BVH_STACK_DEPTH 60
#endif

#ifndef INFINITY
#define INFINITY 1e20
#endif

// Utilities
uvec4 uTexelFetch1D( usampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

ivec4 iTexelFetch1D( isampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 texelFetch1D( sampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 textureSampleBarycoord( sampler2D tex, vec3 barycoord, uvec3 faceIndices ) {

	return
		barycoord.x * texelFetch1D( tex, faceIndices.x ) +
		barycoord.y * texelFetch1D( tex, faceIndices.y ) +
		barycoord.z * texelFetch1D( tex, faceIndices.z );

}

void ndcToCameraRay(
	vec2 coord, mat4 cameraWorld, mat4 invProjectionMatrix,
	out vec3 rayOrigin, out vec3 rayDirection
) {

	// get camera look direction and near plane for camera clipping
	vec4 lookDirection = cameraWorld * vec4( 0.0, 0.0, - 1.0, 0.0 );
	vec4 nearVector = invProjectionMatrix * vec4( 0.0, 0.0, - 1.0, 1.0 );
	float near = abs( nearVector.z / nearVector.w );

	// get the camera direction and position from camera matrices
	vec4 origin = cameraWorld * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec4 direction = invProjectionMatrix * vec4( coord, 0.5, 1.0 );
	direction /= direction.w;
	direction = cameraWorld * direction - origin;

	// slide the origin along the ray until it sits at the near clip plane position
	origin.xyz += direction.xyz * near / dot( direction, lookDirection );

	rayOrigin = origin.xyz;
	rayDirection = direction.xyz;

}
`});var Gg=kt(()=>{});var Wg,Xg=kt(()=>{Wg=`

#ifndef TRI_INTERSECT_EPSILON
#define TRI_INTERSECT_EPSILON 1e-5
#endif

// Raycasting
bool intersectsBounds( vec3 rayOrigin, vec3 rayDirection, vec3 boundsMin, vec3 boundsMax, out float dist ) {

	// https://www.reddit.com/r/opengl/comments/8ntzz5/fast_glsl_ray_box_intersection/
	// https://tavianator.com/2011/ray_box.html
	vec3 invDir = 1.0 / rayDirection;

	// find intersection distances for each plane
	vec3 tMinPlane = invDir * ( boundsMin - rayOrigin );
	vec3 tMaxPlane = invDir * ( boundsMax - rayOrigin );

	// get the min and max distances from each intersection
	vec3 tMinHit = min( tMaxPlane, tMinPlane );
	vec3 tMaxHit = max( tMaxPlane, tMinPlane );

	// get the furthest hit distance
	vec2 t = max( tMinHit.xx, tMinHit.yz );
	float t0 = max( t.x, t.y );

	// get the minimum hit distance
	t = min( tMaxHit.xx, tMaxHit.yz );
	float t1 = min( t.x, t.y );

	// set distance to 0.0 if the ray starts inside the box
	dist = max( t0, 0.0 );

	return t1 >= dist;

}

bool intersectsTriangle(
	vec3 rayOrigin, vec3 rayDirection, vec3 a, vec3 b, vec3 c,
	out vec3 barycoord, out vec3 norm, out float dist, out float side
) {

	// https://stackoverflow.com/questions/42740765/intersection-between-line-and-triangle-in-3d
	vec3 edge1 = b - a;
	vec3 edge2 = c - a;
	norm = cross( edge1, edge2 );

	float det = - dot( rayDirection, norm );
	float invdet = 1.0 / det;

	vec3 AO = rayOrigin - a;
	vec3 DAO = cross( AO, rayDirection );

	vec4 uvt;
	uvt.x = dot( edge2, DAO ) * invdet;
	uvt.y = - dot( edge1, DAO ) * invdet;
	uvt.z = dot( AO, norm ) * invdet;
	uvt.w = 1.0 - uvt.x - uvt.y;

	// set the hit information
	barycoord = uvt.wxy; // arranged in A, B, C order
	dist = uvt.z;
	side = sign( det );
	norm = side * normalize( norm );

	// add an epsilon to avoid misses between triangles
	uvt += vec4( TRI_INTERSECT_EPSILON );

	return all( greaterThanEqual( uvt, vec4( 0.0 ) ) );

}

bool intersectTriangles(
	// geometry info and triangle range
	sampler2D positionAttr, usampler2D indexAttr, uint offset, uint count,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// outputs
	inout float minDistance, inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	bool found = false;
	vec3 localBarycoord, localNormal;
	float localDist, localSide;
	for ( uint i = offset, l = offset + count; i < l; i ++ ) {

		uvec3 indices = uTexelFetch1D( indexAttr, i ).xyz;
		vec3 a = texelFetch1D( positionAttr, indices.x ).rgb;
		vec3 b = texelFetch1D( positionAttr, indices.y ).rgb;
		vec3 c = texelFetch1D( positionAttr, indices.z ).rgb;

		if (
			intersectsTriangle( rayOrigin, rayDirection, a, b, c, localBarycoord, localNormal, localDist, localSide )
			&& localDist < minDistance
		) {

			found = true;
			minDistance = localDist;

			faceIndices = uvec4( indices.xyz, i );
			faceNormal = localNormal;

			side = localSide;
			barycoord = localBarycoord;
			dist = localDist;

		}

	}

	return found;

}

bool intersectsBVHNodeBounds( vec3 rayOrigin, vec3 rayDirection, sampler2D bvhBounds, uint currNodeIndex, out float dist ) {

	uint cni2 = currNodeIndex * 2u;
	vec3 boundsMin = texelFetch1D( bvhBounds, cni2 ).xyz;
	vec3 boundsMax = texelFetch1D( bvhBounds, cni2 + 1u ).xyz;
	return intersectsBounds( rayOrigin, rayDirection, boundsMin, boundsMax, dist );

}

// use a macro to hide the fact that we need to expand the struct into separate fields
#define	bvhIntersectFirstHit(		bvh,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)	_bvhIntersectFirstHit(		bvh.position, bvh.index, bvh.bvhBounds, bvh.bvhContents,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)

bool _bvhIntersectFirstHit(
	// bvh info
	sampler2D bvh_position, usampler2D bvh_index, sampler2D bvh_bvhBounds, usampler2D bvh_bvhContents,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// output variables split into separate variables due to output precision
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	// stack needs to be twice as long as the deepest tree we expect because
	// we push both the left and right child onto the stack every traversal
	int ptr = 0;
	uint stack[ BVH_STACK_DEPTH ];
	stack[ 0 ] = 0u;

	float triangleDistance = INFINITY;
	bool found = false;
	while ( ptr > - 1 && ptr < BVH_STACK_DEPTH ) {

		uint currNodeIndex = stack[ ptr ];
		ptr --;

		// check if we intersect the current bounds
		float boundsHitDistance;
		if (
			! intersectsBVHNodeBounds( rayOrigin, rayDirection, bvh_bvhBounds, currNodeIndex, boundsHitDistance )
			|| boundsHitDistance > triangleDistance
		) {

			continue;

		}

		uvec2 boundsInfo = uTexelFetch1D( bvh_bvhContents, currNodeIndex ).xy;
		bool isLeaf = bool( boundsInfo.x & 0xffff0000u );

		if ( isLeaf ) {

			uint count = boundsInfo.x & 0x0000ffffu;
			uint offset = boundsInfo.y;

			found = intersectTriangles(
				bvh_position, bvh_index, offset, count,
				rayOrigin, rayDirection, triangleDistance,
				faceIndices, faceNormal, barycoord, side, dist
			) || found;

		} else {

			uint leftIndex = currNodeIndex + 1u;
			uint splitAxis = boundsInfo.x & 0x0000ffffu;
			uint rightIndex = boundsInfo.y;

			bool leftToRight = rayDirection[ splitAxis ] >= 0.0;
			uint c1 = leftToRight ? leftIndex : rightIndex;
			uint c2 = leftToRight ? rightIndex : leftIndex;

			// set c2 in the stack so we traverse it later. We need to keep track of a pointer in
			// the stack while we traverse. The second pointer added is the one that will be
			// traversed first
			ptr ++;
			stack[ ptr ] = c2;

			ptr ++;
			stack[ ptr ] = c1;

		}

	}

	return found;

}
`});var qg=kt(()=>{});var Yg=kt(()=>{Vg();Gg();Xg();qg()});var sA,jg=kt(()=>{Bg();$o();no();kg();Og();zg();Yg();sA=`
	${Hg}
	${Wg}
`});var XE=Kd(()=>{var fA=Mx(Jd());li();b0();jg();Si.prototype.computeBoundsTree=Fg;Sn.prototype.raycast=Ug;var OE=.09,kE=.2,Zg={bone:15327174,muscle:11028287,nerve:15779137,vessel:14886444,vein:3107839,ligament:12831958,capsule:11120051},Kg=3524863,gu=3725690,zE=16732240,HE=16749350,VE=11824127,Jg={hip:[.62,1.12],gluteal:[.62,1.12],thigh:[.36,1],knee:[.3,.6],leg:[0,.5],foot:[-.02,.14],limb:[-.05,1.12],shoulder:[1.15,1.5],plexus:[1.2,1.53],arm:[1,1.45],elbow:[.95,1.2],forearm:[.66,1.15],wrist:[.66,.95],hand:[.64,.92],"upper limb":[.66,1.5]},bd={model:"_jk3d_trunk6.glb",planes:["coronal","axial","sagittal"]},$g={anterior:[0,0,1],posterior:[0,0,-1],lateral:[-1,0,0],medial:[1,0,0],superior:[0,1,.001],inferior:[0,-1,.001]},Md={};function Sd(s){return Md[s]||(Md[s]=new Promise((e,t)=>{fetch(s).then(n=>{if(!n.ok)throw n.status;return n.arrayBuffer()}).then(n=>new Hl().parse(n,"",i=>e(i.scene),t)).catch(t)})),Md[s]}var fc=null,GE=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]].map(s=>new w(...s));function Qg(s){return Math.abs(s.y)>.92?new w(0,0,s.y>0?-1:1):new w(0,1,0)}var Ed=class{constructor(e,t){this.cam=e,this.el=t,this.target=new w,this.autoRotate=!1,this.autoRotateSpeed=1.2,this.vx=0,this.vy=0,this.drag=null,this.ls=[],this.snapOn=!0,this.turntable=!1,this.ball=(i,r)=>{let o=t.getBoundingClientRect(),a=.38*Math.min(o.width,o.height),c=(i-o.left-o.width/2)/a,l=-(r-o.top-o.height/2)/a,u=c*c+l*l;if(u>=1)return new w(c,l,0).normalize();let h=Math.sqrt(1-u);return new w(c,l,h).normalize()},t.addEventListener("pointerdown",i=>{if(!(i.button!==0||i.shiftKey)){this.drag={t:performance.now(),x:i.clientX,y:i.clientY},this.spin=null,this.vo=null;try{t.setPointerCapture(i.pointerId)}catch{}}}),t.addEventListener("pointermove",i=>{if(!this.drag||this.multi)return;if(this.turntable){let l=performance.now(),u=Math.max(1,l-this.drag.t),h=-(i.clientX-this.drag.x)*.008;this.turn(new w(0,1,0),h),this.spin={axis:new w(0,1,0),w:h/u*16},this.drag.x=i.clientX,this.drag.t=l;return}let r=performance.now(),o=Math.max(1,r-this.drag.t),a=i.clientX-this.drag.x,c=i.clientY-(this.drag.y==null?i.clientY:this.drag.y);this.drag.x=i.clientX,this.drag.y=i.clientY,this.drag.t=r,this.orbit(a*.008,c*.008),this.vo=[a*.008/o*16,c*.008/o*16]});let n=()=>{this.drag&&performance.now()-this.drag.t>80&&(this.spin=null,this.vo=null),this.drag=null};t.addEventListener("pointerup",n),t.addEventListener("pointercancel",n)}addEventListener(e,t){e==="change"&&this.ls.push(t)}emit(){this.ls.forEach(e=>e())}orbit(e,t){let n=this.cam.position.clone().sub(this.target),i=n.length(),r=Math.atan2(n.x,n.z)-e,o=Math.asin(Math.max(-1,Math.min(1,n.y/i)));this.turntable?o=0:o=Math.max(-1.45,Math.min(1.45,o+t)),n.set(Math.sin(r)*Math.cos(o),Math.sin(o),Math.cos(r)*Math.cos(o)).multiplyScalar(i),this.cam.position.copy(this.target).add(n),this.cam.up.set(0,1,0),this.cam.lookAt(this.target),this.emit()}rotate(e,t){this.orbit(e,t)}rotateFree(e,t){if(this.turntable){this.turn(new w(0,1,0),-e);return}let n=this.cam,i=n.position.clone().sub(this.target),r=n.up.clone(),o=new w().crossVectors(r,i).normalize(),a=new gi().setFromAxisAngle(r,-e).multiply(new gi().setFromAxisAngle(o,-t));i.applyQuaternion(a),n.up.applyQuaternion(a).normalize();let c=i.clone().normalize();n.up.sub(c.multiplyScalar(n.up.dot(i.clone().normalize()))).normalize(),n.position.copy(this.target).add(i),n.lookAt(this.target),this.emit()}turn(e,t){let n=new gi().setFromAxisAngle(e,t),i=this.cam.position.clone().sub(this.target).applyQuaternion(n);this.cam.up.applyQuaternion(n).normalize(),this.cam.position.copy(this.target).add(i),this.cam.lookAt(this.target),this.emit()}level(){let e=this.cam.position.clone().sub(this.target),t=e.length(),n=new w(e.x,0,e.z);return n.lengthSq()<1e-8&&n.set(0,0,1),{p1:this.target.clone().addScaledVector(n.normalize(),t),u1:new w(0,1,0)}}roll(e){let t=this.cam.position.clone().sub(this.target).normalize();this.cam.up.applyQuaternion(new gi().setFromAxisAngle(t,e)).normalize(),this.cam.lookAt(this.target),this.emit()}update(e){let t=!1;if(!this.drag&&this.vo&&Math.hypot(this.vo[0],this.vo[1])>1e-4){let n=Math.min(1,(e||.016666666666666666)*60);this.orbit(this.vo[0]*n,this.vo[1]*n);let i=Math.pow(.86,n);this.vo[0]*=i,this.vo[1]*=i,t=!0}else if(this.autoRotate&&!this.drag){let n=2*Math.PI/60*this.autoRotateSpeed*(e||.016666666666666666),i=new gi().setFromAxisAngle(new w(0,1,0),n),r=this.cam.position.clone().sub(this.target).applyQuaternion(i);this.cam.up.applyQuaternion(i),this.cam.position.copy(this.target).add(r),this.cam.lookAt(this.target),this.emit(),t=!0}else if(this.snapOn&&!this.drag&&e){let n=this.cam.position.clone().sub(this.target),i=n.clone().normalize(),r=null,o=-1;if(GE.forEach(a=>{let c=a.dot(i);c>o&&(o=c,r=a)}),o>Math.cos(14*Math.PI/180)&&o<.99999&&Math.abs(r.y)<.5){let a=1-Math.exp(-e*3.5),c=i.clone().lerp(r,a).normalize(),l=new w(0,1,0);this.cam.position.copy(this.target).addScaledVector(c,n.length()),l.sub(c.clone().multiplyScalar(l.dot(c))).normalize(),this.cam.up.copy(l),this.cam.lookAt(this.target),this.emit(),t=!0}}t||this.cam.lookAt(this.target)}};function ex(s,e){let t=new w;String(s||"anterior").toLowerCase().split(/[\s,+-]+/).forEach(i=>{let r=Object.keys($g).find(o=>i&&o.startsWith(i.replace(/^antero/,"anterior").replace(/^postero/,"posterior")));r&&t.add(new w(...$g[r])),i==="anterolateral"&&t.add(new w(-.7,0,.7)),i==="posterolateral"&&t.add(new w(-.7,0,-.7)),i==="anteromedial"&&t.add(new w(.7,0,.7)),i==="posteromedial"&&t.add(new w(.7,0,-.7))}),t.lengthSq()<1e-6&&t.set(0,0,1);let n=String(s||"").match(/([+-]\d+)\s*$/);if(n){let i=new w(t.x,0,t.z);i.lengthSq()<1e-6&&i.set(0,0,1),i.normalize();let r=Qr.degToRad(+n[1]);t.copy(i.multiplyScalar(Math.cos(r))).setY(Math.sin(r))}return e&&(t.x=-t.x),t.normalize()}var sr=s=>String(s||"").toLowerCase().replace(/\s+/g," ").trim();function hc(s){return String(s||"").split(/[\n,;]+/).map(e=>e.trim()).filter(Boolean)}function WE(s,e){if(fc&&fc.stop(),s.innerHTML="",s.style.removeProperty("display"),/^(attach|nerve|action)$/.test(e.mode)){let g="jka-seen:"+e.mode+":"+(e.name||e.meshes),y=!1;try{y=localStorage.getItem(g)==="1"}catch{}let m=e.front||"adaptive",p=typeof e.ivl=="number"?e.ivl:typeof window.__jkaIvl=="number"?window.__jkaIvl:null;if(e.side==="back")try{localStorage.setItem(g,"1")}catch{}else if(m==="hide"||m==="adaptive"&&(p!=null?p>=1:y)){s.style.display="none";return}}let t=()=>[document.scrollingElement,document.getElementById("jk-sc")].forEach(g=>{g&&g.scrollTop&&(g.scrollTop=0)});t(),[50,200,600].forEach(g=>setTimeout(t,g)),s.classList.add("jka");let n=!1;try{n=localStorage.getItem("jka-ct")==="1"}catch{}s.classList.toggle("jka-ctpre",n);let i=s.closest(".jka-left");i&&n&&(i.style.animation="none");let r=document.createElement("div");r.className="jka-wrap",s.appendChild(r);let o=document.createElement("div");o.className="jka-msg",o.textContent="Loading model\u2026",r.appendChild(o);let a;try{a=new za({antialias:!0,alpha:!0})}catch{o.textContent="3D needs WebGL, which is off in this Anki.";return}let c=Math.min(2,window.devicePixelRatio||1),l=Math.min(c,1);a.setPixelRatio(c),a.outputColorSpace=Gn,r.appendChild(a.domElement);let u=document.createElementNS("http://www.w3.org/2000/svg","svg");u.setAttribute("class","jka-lines"),r.appendChild(u);let h=!1,f={stop(){h=!0;try{a.dispose(),a.forceContextLoss()}catch{}}};fc=f,Sd(e.model).then(g=>{if(!h)try{d(g),o.remove()}catch(y){o.textContent="3D view error: "+(y&&y.message||y)+(y&&y.stack?" \u2014 "+String(y.stack).split(`
`).slice(0,2).join(" | "):"")}}).catch(g=>{o.textContent="Could not load "+e.model+" ("+g+"). Run Tools \u2192 Janki: Set up 3D anatomy."});function d(g){let y=window.__jkaT={t0:performance.now()},m=x=>{y[x]=Math.round(performance.now()-y.t0)},p=new Mr;p.add(new Cl(16777215,4210768,1.6));let b=new Yo(16777215,1.4);p.add(b);let _=g.clone(!0);p.add(_);let T=e.mode+"|"+e.name+"|"+e.meshes,P=String(e.limb||"").toLowerCase();if(P!=="left"&&P!=="right"){let x=window.__jkaLimb;P=e.side==="back"&&x&&x.key===T?x.limb:Math.random()<.5?"left":"right"}e.side!=="back"&&(window.__jkaLimb={key:T,limb:P});let C=P==="left";C&&(_.scale.x=-1),_.updateMatrixWorld(!0);let M=[];_.traverse(x=>{if(!x.isMesh)return;let E=x.userData||{},S=E.n||x.name,L=E.l||"muscle",q=L==="vein"||L==="vessel"&&/vein/i.test(S)?Zg.vein:Zg[L]||10066329;x.material=new Sr({color:q,roughness:L==="bone"?.85:.6,metalness:0,emissive:L==="nerve"?3154944:0}),x.userData.base=q,M.push({mesh:x,name:S,key:sr(S),layer:L,box:new on().setFromObject(x)})}),function x(E){let S=performance.now();for(;E<M.length&&performance.now()-S<8;E++){let L=M[E].mesh.geometry;if(!L.boundsTree)try{L.computeBoundsTree()}catch{}}E<M.length&&!h?setTimeout(()=>x(E),0):setTimeout(()=>{zn=!0,or=!0},0)}(0);let z=x=>{let E=sr(x);return M.filter(S=>S.key===E||S.key===E+" muscle")},v=[].concat(...hc(e.meshes).map(z)),R=[].concat(...hc(e.nerve).map(z)),V=(e.peel||[]).map(x=>[].concat(...hc(x).map(z))),O=e.side==="back",j=e.mode,B=v.length&&v.every(x=>x.layer==="nerve"||x.layer==="vessel"||x.layer==="vein");B&&j==="name"&&(j="nerveid");let Y=Jg[sr(e.region)]||null,Z=new on;(v.length?v:R).forEach(x=>Z.union(x.box));let Ee=ht();m("parts");let ae=e.landmark?Ee[String(e.landmark).toLowerCase().trim()]?_e(String(e.landmark).toLowerCase().trim()):wt(e.landmark):null;function _e(x){let E=window.__jkaLMC=window.__jkaLMC||new Map,S=e.model+"|"+x+"|"+e.meshes+"|"+(C?"L":"R"),L=E.get(S);if(L){v.forEach(X=>{let xe=X.mesh.geometry.userData.jkaSubG;if(xe){let G=X.mesh.geometry;X.mesh.geometry=xe,X.mesh.userData.coarse=G,M.forEach(U=>{U.mesh.geometry===G&&(U.mesh.geometry=xe,U.mesh.userData.coarse=G)})}});let ee=new Map;if(v.forEach((X,xe)=>{let G=L.W[xe];G&&G.length===X.mesh.geometry.attributes.position.count&&ee.set(X,G)}),ee.size===L.n)return{pt:L.pt,pts:L.pts,W:ee,sphere:L.sphere,ivf:L.ivf}}let q=he(x);return q&&(E.set(S,{pt:q.pt,pts:q.pts,sphere:q.sphere,ivf:q.ivf,n:q.W.size,W:v.map(ee=>q.W.get(ee)||null)}),E.size>40&&E.delete(E.keys().next().value)),q}let Te=ae?ae.pt:null,Be=ae?ae.pts?ae.pts.slice():(()=>{let x=[];return v.forEach(E=>st(E.mesh,S=>{ae.inPatch(S)&&ae.soft(S)>.3&&x.push(S.clone())})),x})():[];try{document.documentElement.setAttribute("data-jkalm",ae?ae.pts?ae.pts.length:"old":"none")}catch{}function ht(){return{"scapula: acromion":{k:"ext",d:[-.7,.7,.1],tol:.02,reach:.04},"scapula: coracoid process":{k:"ext",d:[.1,.15,1],tol:.012,reach:.03},"scapula: spine":{k:"ridge",bin:"m",d:[0,.15,-1],b:[.45,.98],sm:[0,.86],tol:.004},"scapula: supraspinous fossa":{k:"spinefossa",up:!0},"scapula: infraspinous fossa":{k:"spinefossa",up:!1},"scapula: subscapular fossa":{k:"band",b:[.04,.84],f:[.4,0,1,.45]},"scapula: scapular notch":{k:"notch",b:[.7,1],sm:[.3,.75]},"scapula: glenoid cavity":{k:"ext",d:[-1,0,0],b:[.62,.86],f:[-1,0,0,.45],tol:.007,reach:.025},"scapula: supraglenoid tubercle":{k:"glenoidend",up:!0},"scapula: infraglenoid tubercle":{k:"glenoidend",up:!1},"scapula: medial border":{k:"ridge",bin:"y",d:[1,0,0],b:[.05,.85],tol:.003},"scapula: superior angle":{k:"ext",d:[.8,1,0],tol:.006,reach:.02},"scapula: inferior angle":{k:"ext",d:[0,-1,0],tol:.006,reach:.02},"clavicle: acromial end":{k:"band",ax:"lat",b:[0,.12]},"clavicle: shaft":{k:"band",ax:"lat",b:[.25,.75]},"clavicle: sternal end":{k:"band",ax:"lat",b:[.88,1]},"clavicle: conoid tubercle":{k:"ext",ax:"lat",d:[0,-1,-.4],b:[.12,.38],tol:.003,reach:.012},"clavicle: sternal articular surface":{k:"ext",ax:"lat",d:[1,0,0],f:[1,0,0,.2],tol:.004,reach:.02},"humerus: head":{k:"sphere",d:[1,.7,-.4],b:[.8,1],seedR:.022,tol:.003,reach:.05},"humerus: greater tubercle":{k:"ext",d:[-1,.2,.15],b:[.82,.97],tol:.01,reach:.025},"humerus: lesser tubercle":{k:"ext",d:[.25,0,1],b:[.78,.9],tol:.004,reach:.015},"humerus: intertubercular groove":{k:"spiral",b:[.72,.9],phi:[2.7,2.7],w:.22},"humerus: anatomical neck":{k:"aneck"},"humerus: surgical neck":{k:"band",b:[.76,.82]},"humerus: deltoid tuberosity":{k:"ext",d:[-1,0,.35],b:[.45,.65],tol:.003,reach:.03},"humerus: radial groove":{k:"spiral",b:[.36,.64],phi:[.1,1.5],w:.3},"humerus: capitulum":{k:"band",b:[0,.07],sm:[.1,.4],f:[0,-.5,1,.25]},"humerus: trochlea":{k:"band",b:[0,.075],sm:[.38,.78],f:[0,-1,0,-.5]},"humerus: medial epicondyle":{k:"ext",d:[1,0,0],b:[.02,.16],tol:.007,reach:.02},"humerus: lateral epicondyle":{k:"ext",d:[-1,0,0],b:[.02,.16],tol:.005,reach:.018},"humerus: medial supracondylar ridge":{k:"ridge",bin:"y",d:[1,0,0],b:[.12,.32],tol:.002},"humerus: lateral supracondylar ridge":{k:"ridge",bin:"y",d:[-1,0,0],b:[.12,.35],tol:.002},"humerus: radial fossa":{k:"cav",b:[.06,.17],f:[0,0,1,.4],sm:[0,.5],thr:.35,reach:.012},"humerus: coronoid fossa":{k:"cav",b:[.06,.17],f:[0,0,1,.4],sm:[.5,1],thr:.35,reach:.012},"humerus: olecranon fossa":{k:"cav",b:[.05,.2],f:[0,0,-1,.4],sm:[.25,.75],thr:.3,reach:.018},"humerus: groove for ulnar nerve":{k:"cav",b:[.03,.14],f:[.3,0,-1,.2],sm:[.72,1],thr:.3,reach:.012},"radius: head":{k:"band",b:[.94,1]},"radius: neck":{k:"band",b:[.87,.935]},"radius: radial tuberosity":{k:"ext",d:[.8,0,.5],b:[.76,.88],tol:.003,reach:.014},"radius: interosseous border":{k:"ridge",bin:"y",d:[1,0,0],b:[.2,.75],tol:.002},"radius: dorsal tubercle":{k:"ext",d:[0,0,-1],b:[.04,.14],tol:.0015,reach:.008},"radius: styloid process":{k:"ext",d:[-.7,-1,0],b:[0,.15],tol:.006,reach:.014},"radius: carpal articular surface":{k:"contact",o:["Scaphoid bone","Lunate bone"],dist:.004,grow:.003,b:[0,.1]},"ulna: olecranon":{k:"ext",d:[0,1,-.7],b:[.85,1],tol:.01,reach:.022},"ulna: trochlear notch":{k:"contact",o:["Humerus"],dist:.005,grow:.004,b:[.8,1]},"ulna: coronoid process":{k:"ext",d:[0,0,1],b:[.8,.95],tol:.005,reach:.012},"ulna: radial notch":{k:"contact",o:["Radius"],dist:.004,grow:.003,b:[.8,1]},"ulna: ulnar tuberosity":{k:"ext",d:[0,-.2,1],b:[.74,.84],tol:.003,reach:.012},"ulna: styloid process":{k:"ext",d:[.2,-1,-.3],b:[0,.12],tol:.004,reach:.01},"ulna: head":{k:"band",b:[.02,.1]},"trapezium: tubercle":{k:"ext",d:[0,0,1],tol:.002,reach:.008},"hamate: hook":{k:"ext",d:[0,0,1],tol:.003,reach:.01},"hand: head":{k:"band",ax:"pca",each:!0,b:[0,.2]},"hand: shaft":{k:"band",ax:"pca",each:!0,b:[.3,.72]},"hand: base":{k:"band",ax:"pca",each:!0,b:[.8,1]},"hand: distal tuberosity":{k:"band",ax:"pca",each:!0,b:[0,.25],f:[0,0,1,-.2]},"hand: sesamoids":{k:"band",ax:"pca",each:!0,b:[0,.25],f:[0,0,1,.3]},"hand: distal transverse crease":{k:"band",ax:"pca",each:!0,b:[0,.24],f:[0,0,1,.3]},"hand: proximal transverse crease":{k:"band",ax:"pca",each:!0,b:[.25,.5],f:[0,0,1,.3]},"tendon: distal":{k:"band",b:[0,.4]},"tendon: distal long":{k:"band",b:[0,.55]},"muscle: first dorsal interosseous":{k:"ext",d:[-1,0,0],tol:.014,reach:.03},"muscle: lumbricals radial":{k:"ext",d:[-1,0,0],tol:.034,reach:.06},"muscle: lumbricals ulnar":{k:"ext",d:[1,0,0],tol:.036,reach:.06},"vertebra: body":{k:"vert",part:"body"},"vertebra: arch":{k:"vert",part:"arch"},"vertebra: pedicle":{k:"vert",part:"pedicle"},"vertebra: lamina":{k:"vert",part:"lamina"},"vertebra: foramen":{k:"vert",part:"foramen"},"vertebra: superior notch":{k:"vert",part:"supnotch"},"vertebra: inferior notch":{k:"vert",part:"infnotch"},"vertebra: spinous process":{k:"vert",part:"spinous"},"vertebra: superior articular process":{k:"vert",part:"supart"},"vertebra: inferior articular process":{k:"vert",part:"infart"},"vertebra: pars interarticularis":{k:"vert",part:"pars"},"vertebra: transverse process":{k:"vert",part:"transverse"},"cervical: transverse process":{k:"vert",part:"transverse",xr:[1.4,9],zr:[-.6,1.6]},"cervical: transverse foramen":{k:"vert",part:"transforamen"},"atlas: posterior arch":{k:"vert",part:"arch",zr:[-9,-.35]},"atlas: anterior tubercle":{k:"ext",d:[0,0,1],tol:.003,reach:.01},"axis: dens":{k:"vert",part:"dens"},"thoracic: superior costal facet":{k:"vert",part:"contact",o:["Sixth rib.l","Sixth rib.r"],zr:[.2,9],tb:[.45,1]},"thoracic: inferior costal facet":{k:"vert",part:"contact",o:["Seventh rib.l","Seventh rib.r"],zr:[.2,9],tb:[0,.55]},"thoracic: transverse costal facet":{k:"vert",part:"contact",o:["Sixth rib.l","Sixth rib.r"],xr:[1.4,9],zr:[-9,.4]},"vertebra: intervertebral foramen":{k:"vert",part:"ivf"},"hip: ilium":{k:"band",b:[.5,1]},"hip: ischium":{k:"band",b:[0,.42],sa:[0,.5]},"hip: pubis":{k:"band",b:[0,.45],sa:[.5,1],sm:[.45,1]},"hip: superior pubic ramus":{k:"band",b:[.22,.45],sa:[.55,1],sm:[.45,.92]},"hip: inferior pubic ramus":{k:"band",b:[.04,.25],sm:[.6,1],sa:[.35,.85]},"hip: symphyseal surface":{k:"ext",d:[1,0,0],f:[1,0,0,.4],tol:.004,reach:.03},"hip: pectineal line":{k:"ridge",bin:"m",d:[0,1,.3],b:[.25,.48],sa:[.5,1],sm:[.5,.95],tol:.003},"hip: arcuate line":{k:"arcuate",b:[.42,.8],f:[1,.2,.3,.45],sa:[.1,.85]},"hip: obturator foramen":{k:"hole",b:[0,.45],outline:"loop"},"hip: auricular surface":{k:"contact",o:["Sacrum"],dist:.006,grow:.004},"hip: iliac fossa":{k:"band",b:[.6,.97],f:[1,.2,.3,.45]},"femur: trochanteric fossa":{k:"cav",b:[.9,.98],f:[.3,0,-1,.1],sm:[0,.5],thr:.3,reach:.015},"femur: intertrochanteric crest":{k:"ridge",bin:"y",d:[0,0,-1],b:[.83,.95],sm:[.05,.6],tol:.003},"femur: intertrochanteric line":{k:"ridge",bin:"y",d:[0,0,1],b:[.84,.95],sm:[.05,.7],tol:.003},"femur: gluteal tuberosity":{k:"ext",d:[-.6,0,-1],b:[.68,.82],tol:.003,reach:.03},"femur: popliteal surface":{k:"band",b:[.06,.22],f:[0,0,-1,.5],sm:[.2,.8]},"tibia: medial plateau":{k:"band",b:[.96,1],f:[0,1,0,.55],sm:[.5,1]},"tibia: lateral plateau":{k:"band",b:[.96,1],f:[0,1,0,.55],sm:[0,.5]},"tibia: medial condyle":{k:"band",b:[.86,.99],sm:[.52,1]},"tibia: lateral condyle":{k:"band",b:[.86,.99],sm:[0,.48]},"tibia: soleal line":{k:"spiral",b:[.6,.8],phi:[.9,-1.1],w:.2},"tibia: tibial tuberosity":{k:"ext",d:[0,0,1],b:[.8,.94],tol:.004,reach:.02},"tibia: medial malleolus":{k:"ext",d:[1,-1,0],b:[0,.1],tol:.008,reach:.02},"fibula: head":{k:"band",b:[.93,1]},"fibula: neck":{k:"band",b:[.87,.93]},"fibula: lateral malleolus":{k:"band",b:[0,.12]},"calcaneus: tuberosity":{k:"ext",d:[0,0,-1],tol:.01,reach:.025},"calcaneus: sustentaculum tali":{k:"ext",d:[1,.3,0],tol:.005,reach:.015},"hip: greater sciatic notch":{k:"ridge",bin:"y",d:[.3,0,-1],b:[.33,.58],on:/^hip bone$/i,tol:.011,outline:"arc"},"hip: lesser sciatic notch":{k:"ridge",bin:"y",d:[.3,0,-1],b:[.17,.31],on:/^hip bone$/i,tol:.009,outline:"arc"},"tibia: pes anserinus":{k:"ext",d:[.7,-.2,.6],b:[.8,.9],tol:.006,reach:.022},"muscle: obturator internus tendon":{k:"ext",d:[-1,0,0],tol:.022,reach:.045},"space: femoral triangle":{k:"band",ya:[.79,.9]},"space: adductor canal":{k:"band",ya:[.55,.72]},"space: adductor hiatus":{k:"band",ya:[.5,.56]},"cord: cervical enlargement":{k:"band",ya:[1.435,1.515]},"cord: lumbosacral enlargement":{k:"band",ya:[1.09,1.225]},"cord: conus medullaris":{k:"band",ya:[1.05,1.115]},"cauda: filum terminale":{k:"band",b:[0,.18]},"dura: dural sac":{k:"band",ya:[.85,1.07]},"temporal: mastoid":{k:"ext",each:!0,d:[0,-1,-.7],tol:.008,reach:.02},"vertebra: epidural":{k:"vert",part:"foramen",on:/^(vertebra|atlas|axis)/i},"muscle: gluteal fold":{k:"ext",d:[0,-1,-.3],tol:.012,reach:.09},"muscle: adductor part":{k:"ext",d:[-.6,.3,.6],tol:.05,reach:.25},"muscle: hamstring part":{k:"ext",d:[.7,0,-.7],tol:.03,reach:.45},"plexus: lateral cord":{k:"band",ya:[1.352,1.42]},"plexus: medial cord":{k:"band",ya:[1.352,1.42]},"tendon: proximal":{k:"band",each:!0,b:[.86,1]},"aponeurosis: palm":{k:"band",ya:[.785,.875]},"tendon: biceps long head":{k:"band",b:[.8,1]},"tendon: expansion":{k:"band",b:[0,.16]},"vessel: distal":{k:"band",b:[0,.72]},"nerve: recurrent median":{k:"ext",d:[-1,0,.6],ya:[.8,.87],tol:.006,reach:.02},"scaphoid: snuffbox":{k:"ext",d:[-1,0,-.4],tol:.004,reach:.012}}}function he(x,E){let S=Ee[x];if(!S)return null;let L=C?-1:1,q=W=>{if(W._md)return W._md;let F=W.mesh.geometry;if(F.attributes.normal||F.computeVertexNormals(),!F.userData.jkaSub&&F.index&&W.layer==="bone"){let ne=F;if(F=ne.userData.jkaSubG||Ue(ne,.0025/W.mesh.matrixWorld.getMaxScaleOnAxis()),F.userData.jkaSub=!0,!ne.userData.jkaSubG){ne.userData.jkaSubG=F;try{F.computeBoundsTree()}catch{}}W.mesh.geometry=F,W.mesh.userData.coarse=ne,M.forEach(ue=>{ue.mesh.geometry===ne&&(ue.mesh.geometry=F,ue.mesh.userData.coarse=ne)})}let me=F.attributes.position,te=F.attributes.normal,le=me.count,ze=new Float32Array(le*3),rt=new Float32Array(le*3),ft=new w,cn=new fn().getNormalMatrix(W.mesh.matrixWorld);for(let ne=0;ne<le;ne++)ft.fromBufferAttribute(me,ne).applyMatrix4(W.mesh.matrixWorld),ze[ne*3]=ft.x,ze[ne*3+1]=ft.y,ze[ne*3+2]=ft.z,ft.fromBufferAttribute(te,ne).applyMatrix3(cn).normalize(),rt[ne*3]=ft.x,rt[ne*3+1]=ft.y,rt[ne*3+2]=ft.z;let Xt=Array.from({length:le},()=>[]),Ct=F.index?F.index.array:null;if(Ct)for(let ne=0;ne<Ct.length;ne+=3)for(let ue=0;ue<3;ue++){let ge=Ct[ne+ue],ve=Ct[ne+(ue+1)%3];Xt[ge].push(ve),Xt[ve].push(ge)}let be=new Float32Array(le);for(let ne=0;ne<le;ne++){let ue=Xt[ne];if(!ue.length)continue;let ge=0,ve=0,se=0,J=0;ue.forEach(Me=>{let Se=ze[Me*3]-ze[ne*3],_t=ze[Me*3+1]-ze[ne*3+1],qe=ze[Me*3+2]-ze[ne*3+2];ge+=Se,ve+=_t,se+=qe,J+=Se*Se+_t*_t+qe*qe}),be[ne]=2*(ge*rt[ne*3]+ve*rt[ne*3+1]+se*rt[ne*3+2])/Math.max(J,1e-12)}for(let ne=0;ne<6;ne++){let ue=new Float32Array(le);for(let ge=0;ge<le;ge++){let ve=be[ge],se=1;Xt[ge].forEach(J=>{ve+=be[J],se++}),ue[ge]=ve/se}be=ue}return W._md={n:le,P:ze,N:rt,nb:Xt,K:be}},ee=E||v,X=(W,F)=>new w(W.P[F*3],W.P[F*3+1],W.P[F*3+2]),xe=(W,F,me,te)=>L*me[0]*te[F*3]+me[1]*te[F*3+1]+me[2]*te[F*3+2],G=(W,F)=>{let me=new Map;return W.forEach(te=>{let le=Math.floor(te.x/F)+","+Math.floor(te.y/F)+","+Math.floor(te.z/F);(me.get(le)||me.set(le,[]).get(le)).push(te)}),(te,le)=>{let ze=Math.ceil(le/F),rt=Math.floor(te.x/F),ft=Math.floor(te.y/F),cn=Math.floor(te.z/F);for(let Xt=-ze;Xt<=ze;Xt++)for(let Ct=-ze;Ct<=ze;Ct++)for(let be=-ze;be<=ze;be++){let ne=me.get(rt+Xt+","+(ft+Ct)+","+(cn+be));if(ne){for(let ue of ne)if(ue.distanceToSquared(te)<le*le)return!0}}return!1}},U=new Map,$=null,pe=-1/0,Ne={},Ve=S.on?ee.filter(W=>S.on.test(W.name)):ee,We=S.each?Ve.map(W=>[W]):[Ve],at=null;We.forEach(W=>{let F=W.map(q),me;if(S.ax==="lat"){let ue=1e9,ge=-1e9;F.forEach(ve=>{for(let se=0;se<ve.n;se++){let J=L*ve.P[se*3];ue=Math.min(ue,J),ge=Math.max(ge,J)}}),me=(ve,se)=>(L*ve.P[se*3]-ue)/(ge-ue)}else if(S.ax==="pca"){let ue=new w,ge=0;F.forEach(Me=>{for(let Se=0;Se<Me.n;Se++)ue.add(X(Me,Se)),ge++}),ue.multiplyScalar(1/ge);let ve=new w(0,1,0);for(let Me=0;Me<12;Me++){let Se=new w;F.forEach(_t=>{for(let qe=0;qe<_t.n;qe++){let pt=X(_t,qe).sub(ue);Se.addScaledVector(pt,pt.dot(ve))}}),ve=Se.normalize()}{let Me=M.find(_t=>_t.name==="Capitate bone"),Se=Me?new on().setFromObject(Me.mesh).getCenter(new w):null;(Se?Se.clone().sub(ue).dot(ve)<0:ve.y<0)&&ve.negate()}let se=1e9,J=-1e9;F.forEach(Me=>{for(let Se=0;Se<Me.n;Se++){let _t=X(Me,Se).sub(ue).dot(ve);se=Math.min(se,_t),J=Math.max(J,_t)}}),me=(Me,Se)=>(X(Me,Se).sub(ue).dot(ve)-se)/(J-se)}else{let ue=1e9,ge=-1e9;F.forEach(ve=>{for(let se=0;se<ve.n;se++)ue=Math.min(ue,ve.P[se*3+1]),ge=Math.max(ge,ve.P[se*3+1])}),me=(ve,se)=>(ve.P[se*3+1]-ue)/(ge-ue)}let te=(ue,ge)=>!S.b||me(ue,ge)>=S.b[0]&&me(ue,ge)<=S.b[1],le=1e9,ze=-1e9,rt=1e9,ft=-1e9;F.forEach(ue=>{for(let ge=0;ge<ue.n;ge++)if(te(ue,ge)){let ve=L*ue.P[ge*3],se=ue.P[ge*3+2];le=Math.min(le,ve),ze=Math.max(ze,ve),rt=Math.min(rt,se),ft=Math.max(ft,se)}});let cn=(ue,ge)=>te(ue,ge)&&(!S.ya||ue.P[ge*3+1]>=S.ya[0]&&ue.P[ge*3+1]<=S.ya[1])&&(!S.f||xe(ue,ge,S.f,ue.N)>=S.f[3])&&(!S.sm||(L*ue.P[ge*3]-le)/(ze-le)>=S.sm[0]&&(L*ue.P[ge*3]-le)/(ze-le)<=S.sm[1])&&(!S.sa||(ue.P[ge*3+2]-rt)/(ft-rt)>=S.sa[0]&&(ue.P[ge*3+2]-rt)/(ft-rt)<=S.sa[1]),Xt=F.map(ue=>new Float32Array(ue.n)),Ct=ue=>F.forEach((ge,ve)=>{for(let se=0;se<ge.n;se++)cn(ge,se)&&ue(ge,se,ve)}),be=ue=>{let ge=null,ve=-1/0;return Ct((se,J,Me)=>{let Se=ue(se,J);Se>ve&&(ve=Se,ge=[se,J,Me])}),[ge,ve]},ne=S.k;if(ne==="ext"||ne==="sphere"){let[ue,ge]=be((se,J)=>xe(se,J,S.d,se.P));if(!ue)return;let ve=X(ue[0],ue[1]);if(ne==="ext")Ct((se,J,Me)=>{let Se=xe(se,J,S.d,se.P);Se>=ge-S.tol&&X(se,J).distanceTo(ve)<S.reach&&(Xt[Me][J]=Math.min(1,(Se-(ge-S.tol))/(S.tol*.5)))});else{let se=[];Ct((Me,Se)=>{let _t=X(Me,Se);_t.distanceTo(ve)<S.seedR&&se.push(_t)});let J=Qe(se);for(let Me=0;Me<3;Me++)se=[],Ct((Se,_t)=>{let qe=X(Se,_t);Math.abs(qe.distanceTo(J.c)-J.r)<.003&&se.push(qe)}),se.length>20&&(J=Qe(se));at=J,Ct((Me,Se,_t)=>{let qe=X(Me,Se);Math.abs(qe.distanceTo(J.c)-J.r)<S.tol&&qe.distanceTo(ve)<S.reach&&(Xt[_t][Se]=1)})}ge>pe&&(pe=ge,$=ve)}else if(ne==="ridge"){let ue=(ve,se)=>Math.round((S.bin==="m"?L*ve.P[se*3]:S.bin==="a"?ve.P[se*3+2]:ve.P[se*3+1])/.006),ge={};Ct((ve,se)=>{let J=ue(ve,se),Me=xe(ve,se,S.d,ve.P);(ge[J]==null||Me>ge[J])&&(ge[J]=Me)}),Ct((ve,se,J)=>{let Me=1-(ge[ue(ve,se)]-xe(ve,se,S.d,ve.P))/S.tol;Me>0&&(Xt[J][se]=Math.min(1,Me*1.5))})}else if(ne==="cav"){let[ue,ge]=be((se,J)=>se.K[J]);if(!ue||ge<=0)return;let ve=X(ue[0],ue[1]);Ct((se,J,Me)=>{let Se=se.K[J];Se>=S.thr*ge&&X(se,J).distanceTo(ve)<S.reach&&(Xt[Me][J]=Math.min(1,(Se-S.thr*ge)/(.3*ge)))}),$=ve}else if(ne==="spiral"){let ue={};Ct((ge,ve)=>{let se=Math.round(ge.P[ve*3+1]/.006),J=ue[se]||(ue[se]=[0,0,0]);J[0]+=ge.P[ve*3],J[1]+=ge.P[ve*3+2],J[2]++}),Ct((ge,ve,se)=>{let J=ue[Math.round(ge.P[ve*3+1]/.006)],Me=L*(ge.P[ve*3]-J[0]/J[2]),Se=ge.P[ve*3+2]-J[1]/J[2],_t=Math.atan2(-Me,-Se),qe=(me(ge,ve)-S.b[1])/(S.b[0]-S.b[1]),pt=S.phi[0]+(S.phi[1]-S.phi[0])*qe,it=Math.abs(_t-pt);it>Math.PI&&(it=2*Math.PI-it),it<S.w&&(Xt[se][ve]=Math.min(1,(S.w-it)/(S.w*.4)))})}else if(ne==="hole"){let ge=new Set,ve=ct=>Math.floor(ct.z/.003),se=ct=>Math.floor(ct.y/.003),J=1e9,Me=-1e9,Se=1e9,_t=-1e9;Ct((ct,nn)=>{let An=X(ct,nn),qn=ve(An),ki=se(An);ge.add(qn+","+ki),J=Math.min(J,qn),Me=Math.max(Me,qn),Se=Math.min(Se,ki),_t=Math.max(_t,ki)});let qe=new Set(ge);ge.forEach(ct=>{let[nn,An]=ct.split(",").map(Number);for(let[qn,ki]of[[1,0],[-1,0],[0,1],[0,-1]])qe.add(nn+qn+","+(An+ki))});let pt=new Set,it=[];for(let ct=J-1;ct<=Me+1;ct++)it.push([ct,Se-1],[ct,_t+1]);for(let ct=Se-1;ct<=_t+1;ct++)it.push([J-1,ct],[Me+1,ct]);for(;it.length;){let[ct,nn]=it.pop(),An=ct+","+nn;ct<J-1||ct>Me+1||nn<Se-1||nn>_t+1||pt.has(An)||qe.has(An)||(pt.add(An),it.push([ct+1,nn],[ct-1,nn],[ct,nn+1],[ct,nn-1]))}let ln=new Set;for(let ct=J;ct<=Me;ct++)for(let nn=Se;nn<=_t;nn++){let An=ct+","+nn;!qe.has(An)&&!pt.has(An)&&ln.add(An)}if(!ln.size)return;Ct((ct,nn,An)=>{let qn=X(ct,nn),ki=ve(qn),us=se(qn),D=!1;for(let fe=-3;fe<=3&&!D;fe++)for(let Ae=-3;Ae<=3&&!D;Ae++)ln.has(ki+fe+","+(us+Ae))&&(D=!0);D&&(Xt[An][nn]=1)})}else if(ne==="arcuate"){let ue={},ge=(ve,se)=>Math.round(ve.P[se*3+2]/.005);Ct((ve,se)=>{let J=ve.P[se*3+1],Me=ge(ve,se);(ue[Me]==null||J<ue[Me])&&(ue[Me]=J)}),Ct((ve,se,J)=>{ve.P[se*3+1]<ue[ge(ve,se)]+.004&&(Xt[J][se]=1)})}else if(ne==="vert"){let ue={body:{zr:[.95,9]},arch:{zr:[-9,.95]},pedicle:{xr:[.8,1.7],zr:[-.3,1],tb:[.25,.85]},lamina:{xr:[0,1.3],zr:[-1.9,-.6]},spinous:{xr:[0,.7],zr:[-9,-1.4]},transverse:{xr:[1.7,9],zr:[-9,.6]},supart:{xr:[.6,2.4],zr:[-2,.2],tb:[.65,1]},infart:{xr:[.2,1.9],zr:[-2.4,-.5],tb:[0,.35]},pars:{xr:[.5,1.9],zr:[-1.8,-.2],tb:[.3,.65]},supnotch:{xr:[.7,1.9],zr:[-.5,1.1],tb:[.45,1],ny:.2},infnotch:{xr:[.7,1.9],zr:[-.5,1.1],tb:[0,.55],ny:-.2},dens:{xr:[0,.8],zr:[.45,9],tb:[.7,1]},contact:{}},ge=W.map((ve,se)=>[se,F[se].P.reduce((J,Me,Se)=>Se%3===1?J+Me:J,0)/F[se].n]).sort((ve,se)=>se[1]-ve[1]).map(ve=>ve[0]);W.forEach((ve,se)=>{let J=F[se],Me=6e-4,Se=1e9,_t=-1e9,qe=1e9,pt=-1e9,it=1e9,ln=-1e9;for(let we=0;we<J.n;we++)Se=Math.min(Se,J.P[we*3]),_t=Math.max(_t,J.P[we*3]),it=Math.min(it,J.P[we*3+1]),ln=Math.max(ln,J.P[we*3+1]),qe=Math.min(qe,J.P[we*3+2]),pt=Math.max(pt,J.P[we*3+2]);let ct=Math.ceil((_t-Se)/Me)+3,nn=Math.ceil((pt-qe)/Me)+3,An=new Uint8Array(ct*nn),qn=(we,mt)=>Math.floor((we-Se)/Me)+1+(Math.floor((mt-qe)/Me)+1)*ct,ki=ve.mesh.geometry,us=ki.index?ki.index.array:null,D=us?us.length/3:J.n/3;for(let we=0;we<D;we++){let mt=us?us[we*3]:we*3,dt=us?us[we*3+1]:we*3+1,Ot=us?us[we*3+2]:we*3+2,xt=J.P[mt*3],Lt=J.P[mt*3+2],dn=J.P[dt*3],hi=J.P[dt*3+2],Ai=J.P[Ot*3],Pt=J.P[Ot*3+2],un=Math.max(Math.hypot(dn-xt,hi-Lt),Math.hypot(Ai-xt,Pt-Lt),Math.hypot(Ai-dn,Pt-hi)),rn=Math.max(1,Math.ceil(un/(Me*.7)));for(let Pn=0;Pn<=rn;Pn++)for(let Rn=0;Rn<=rn-Pn;Rn++){let jn=Pn/rn,oi=Rn/rn,Yn=1-jn-oi;An[qn(xt*Yn+dn*jn+Ai*oi,Lt*Yn+hi*jn+Pt*oi)]=1}}let fe=new Int32Array(ct*nn).fill(-1),Ae=[0];for(fe[0]=0;Ae.length;){let we=Ae.pop(),mt=we%ct,dt=(we-mt)/ct;for(let[Ot,xt]of[[1,0],[-1,0],[0,1],[0,-1]]){let Lt=mt+Ot,dn=dt+xt;if(Lt<0||dn<0||Lt>=ct||dn>=nn)continue;let hi=Lt+dn*ct;fe[hi]===-1&&!An[hi]&&(fe[hi]=0,Ae.push(hi))}}let Oe=[];for(let we=0;we<ct*nn;we++){if(An[we]||fe[we]!==-1)continue;let mt=Oe.length+1,dt={n:0,sx:0,sz:0};fe[we]=mt;let Ot=[we];for(;Ot.length;){let xt=Ot.pop(),Lt=xt%ct,dn=(xt-Lt)/ct;dt.n++,dt.sx+=Lt,dt.sz+=dn;for(let[hi,Ai]of[[1,0],[-1,0],[0,1],[0,-1]]){let Pt=Lt+hi,un=dn+Ai,rn=Pt+un*ct;Pt>=0&&un>=0&&Pt<ct&&un<nn&&fe[rn]===-1&&!An[rn]&&(fe[rn]=mt,Ot.push(rn))}}dt.x=Se+(dt.sx/dt.n-1+.5)*Me,dt.z=qe+(dt.sz/dt.n-1+.5)*Me,dt.r=Math.sqrt(dt.n/Math.PI)*Me,Oe.push(dt)}Oe.sort((we,mt)=>mt.n-we.n);let tt=Oe[0]||{x:(Se+_t)/2,z:(qe+pt)/2,r:.008},De={x:tt.x,z:tt.z},lt=0,Ze=0,$e=0;M.filter(we=>/spinal cord|cauda equina/i.test(we.name)).forEach(we=>{let mt=q(we);for(let dt=0;dt<mt.n;dt++){let Ot=mt.P[dt*3+1];Ot>it+.3*(ln-it)&&Ot<ln-.3*(ln-it)&&(Ze+=mt.P[dt*3],$e+=mt.P[dt*3+2],lt++)}}),lt>10&&(De={x:Ze/lt,z:$e/lt});let gt=new Array(24).fill(1e9);for(let we=0;we<J.n;we++){let mt=J.P[we*3+1];if(mt<it+.2*(ln-it)||mt>ln-.2*(ln-it))continue;let dt=J.P[we*3]-De.x,Ot=J.P[we*3+2]-De.z,xt=Math.hypot(dt,Ot),Lt=Math.floor((Math.atan2(Ot,dt)+Math.PI)/(2*Math.PI)*24)%24;xt<gt[Lt]&&(gt[Lt]=xt)}let ye=gt.filter(we=>we<.03).sort((we,mt)=>we-mt),ut=ye.length?ye[Math.floor(ye.length/2)]:.008;ut=Math.max(.005,Math.min(ut,.015));let de=S.part==="ivf"?ge.indexOf(se)===0?"infnotch":"supnotch":S.part,Ge=Object.assign({},ue[de]||{},S.xr?{xr:S.xr}:{},S.zr?{zr:S.zr}:{},S.tb?{tb:S.tb}:{}),Rt=(we,mt)=>!mt||we>=mt[0]&&we<=mt[1],_n=we=>(J.P[we*3+1]-it)/(ln-it),sn=null;if(de==="contact"){let we=[];S.o.forEach(mt=>M.filter(dt=>dt.name===mt).forEach(dt=>{let Ot=q(dt);for(let xt=0;xt<Ot.n;xt++)we.push(X(Ot,xt))})),sn=G(we,.005)}for(let we=0;we<J.n;we++){let mt=Math.abs(J.P[we*3]-De.x)/ut,dt=(J.P[we*3+2]-De.z)/ut,Ot=_n(we);if(S.part==="ivf"&&mt>.8&&mt<1.7&&dt>-.3&&dt<.6){let Lt=J.P[we*3]>De.x?1:-1,dn=Ne[Lt]||(Ne[Lt]={top:-1e9,bot:1e9,xs:0,zs:0,n:0,pt:1e9,pb:-1e9});dn.pt==null&&(dn.pt=1e9,dn.pb=-1e9),de==="infnotch"?Ot>.25&&(dn.pt=Math.min(dn.pt,J.P[we*3+1])):Ot<.72&&(dn.pb=Math.max(dn.pb,J.P[we*3+1]))}let xt;if(de==="foramen"){let Lt=Math.hypot(J.P[we*3]-De.x,J.P[we*3+2]-De.z);xt=Lt<ut*1.25&&(De.x-J.P[we*3])*J.N[we*3]+(De.z-J.P[we*3+2])*J.N[we*3+2]>.3*Lt}else de==="transforamen"?xt=Oe.slice(1).some(Lt=>Lt.n>20&&Math.abs(Lt.x-De.x)>ut&&Math.hypot(J.P[we*3]-Lt.x,J.P[we*3+2]-Lt.z)<Lt.r*1.6):(xt=Rt(mt,Ge.xr)&&Rt(dt,Ge.zr)&&Rt(Ot,Ge.tb)&&(Ge.ny==null||(Ge.ny>0?J.N[we*3+1]>Ge.ny:J.N[we*3+1]<Ge.ny)),xt&&sn&&(xt=sn(X(J,we),.006)));if(xt&&cn(J,we)&&(Xt[se][we]=1,S.part==="ivf")){let Lt=J.P[we*3]>De.x?1:-1,dn=Ne[Lt]||(Ne[Lt]={top:-1e9,bot:1e9,xs:0,zs:0,n:0});de==="infnotch"?dn.top=Math.max(dn.top,J.P[we*3+1]):dn.bot=Math.min(dn.bot,J.P[we*3+1]),dn.xs+=J.P[we*3],dn.zs+=J.P[we*3+2],dn.n++}}})}else if(ne==="swell"){let ue={};Ct((qe,pt)=>{let it=Math.round(qe.P[pt*3+1]/.003),ln=qe.P[pt*3],ct=ue[it]||(ue[it]=[1e9,-1e9]);ln<ct[0]&&(ct[0]=ln),ln>ct[1]&&(ct[1]=ln)});let ge=Object.keys(ue).map(Number).sort((qe,pt)=>qe-pt);if(!ge.length)return;let ve=qe=>ue[qe][1]-ue[qe][0],se=qe=>[qe-1,qe,qe+1].filter(pt=>ue[pt]).reduce((pt,it,ln,ct)=>pt+ve(it)/ct.length,0),J=ge[0];ge.forEach(qe=>{se(qe)>se(J)&&(J=qe)});let Me=S.frac*se(J),Se=J,_t=J;for(;ue[Se-1]&&se(Se-1)>=Me;)Se--;for(;ue[_t+1]&&se(_t+1)>=Me;)_t++;Ct((qe,pt,it)=>{let ln=Math.round(qe.P[pt*3+1]/.003);ln>=Se&&ln<=_t&&(Xt[it][pt]=1)});try{document.documentElement.setAttribute("data-swell",[Se*3,_t*3,(se(J)*1e3).toFixed(1)].join(","))}catch{}}else if(ne==="band")Ct((ue,ge,ve)=>{Xt[ve][ge]=1});else if(ne==="contact"){let ue=[];S.o.forEach(se=>M.filter(J=>J.name===se).forEach(J=>{let Me=q(J);for(let Se=0;Se<Me.n;Se++)ue.push(X(Me,Se))}));let ge=G(ue,.005),ve=[];if(Ct((se,J,Me)=>{let Se=X(se,J);ge(Se,S.dist)&&(Xt[Me][J]=1,ve.push(Se))}),S.grow&&ve.length){let se=G(ve,.005);Ct((J,Me,Se)=>{!Xt[Se][Me]&&se(X(J,Me),S.grow)&&(Xt[Se][Me]=.7)})}}else if(ne==="notch"){let ue={};Ct((se,J)=>{if(se.N[J*3+1]<.2)return;let Me=Math.round(L*se.P[J*3]/.004);(ue[Me]==null||se.P[J*3+1]>ue[Me])&&(ue[Me]=se.P[J*3+1])});let ge=Object.keys(ue).map(Number).sort((se,J)=>se-J);if(ge.length<3)return;let ve=ge[1];ge.slice(1,-1).forEach(se=>{ue[se]<ue[ve]&&(ve=se)}),Ct((se,J,Me)=>{let Se=Math.round(L*se.P[J*3]/.004);Math.abs(Se-ve)<=1&&se.P[J*3+1]>ue[ve]-.006&&se.N[J*3+1]>0&&(Xt[Me][J]=1)})}else if(ne==="glenoidend"){let ue=he("scapula: glenoid cavity",W);if(!ue)return;let ge=ue.pts,se=ge.reduce((Se,_t)=>!Se||(S.up?_t.y>Se.y:_t.y<Se.y)?_t:Se,null).clone().add(new w(0,S.up?.006:-.011,0)),J=S.up?.009:.012,Me=G(ge,.005);Ct((Se,_t,qe)=>{let pt=X(Se,_t);pt.distanceTo(se)<J&&!Me(pt,.0015)&&(Xt[qe][_t]=1-pt.distanceTo(se)/J*.5)}),$=se}else if(ne==="socket"){let ue=M.filter(Me=>Me.name==="Humerus"),ge=ue.length?he("humerus: head",ue):null;if(!ge||!ge.sphere)return;let ve=ge.sphere.c,se=ge.sphere.r,J=[];if(Ct((Me,Se,_t)=>{let qe=X(Me,Se);if(qe.distanceTo(ve)<se+.015){let it=new w(Me.N[Se*3],Me.N[Se*3+1],Me.N[Se*3+2]),ln=ve.clone().sub(qe).normalize();it.dot(ln)>.55&&(J.push(qe),ne==="socket"&&(Xt[_t][Se]=1))}}),ne==="glenoidend"&&J.length){let Se=J.reduce((pt,it)=>!pt||(S.up?it.y>pt.y:it.y<pt.y)?it:pt,null).clone().add(new w(0,S.up?.006:-.011,0)),_t=S.up?.009:.012,qe=G(J,.005);Ct((pt,it,ln)=>{let ct=X(pt,it);ct.distanceTo(Se)<_t&&!qe(ct,.0015)&&(Xt[ln][it]=1-ct.distanceTo(Se)/_t*.5)}),$=Se}}else if(ne==="aneck"){let ue=he("humerus: head",W);if(!ue)return;let ge=[];W.forEach(se=>{let J=ue.W.get(se),Me=q(se);if(J)for(let Se=0;Se<Me.n;Se++)J[Se]>.35&&Me.nb[Se].some(_t=>J[_t]<=.35)&&ge.push(X(Me,Se))});let ve=G(ge,.005);Ct((se,J,Me)=>{ve(X(se,J),.0035)&&(Xt[Me][J]=1)})}else if(ne==="spinefossa"){let ue=he("scapula: spine",W);if(!ue)return;let ge=1e9,ve=-1e9;ue.pts.forEach(qe=>{ge=Math.min(ge,L*qe.x),ve=Math.max(ve,L*qe.x)});let se={};ue.pts.forEach(qe=>{if((L*qe.x-ge)/(ve-ge)<.3)return;let pt=Math.round(L*qe.x/.006);se[pt]=se[pt]==null?qe.y:Math.max(se[pt],qe.y)});let J=qe=>{let pt=Math.round(L*qe.x/.006);for(let it=0;it<20;it++){if(se[pt+it]!=null)return se[pt+it];if(se[pt-it]!=null)return se[pt-it]}return null},Me=1e9,Se=-1e9;F.forEach(qe=>{for(let pt=0;pt<qe.n;pt++){let it=L*qe.P[pt*3];Me=Math.min(Me,it),Se=Math.max(Se,it)}});let _t=new Set(ue.pts.map(qe=>qe.x.toFixed(5)+qe.y.toFixed(5)));Ct((qe,pt,it)=>{let ln=X(qe,pt),ct=J(ln);if(ct==null)return;let nn=-qe.N[pt*3+2],An=(L*ln.x-Me)/(Se-Me);_t.has(ln.x.toFixed(5)+ln.y.toFixed(5))||(S.up?ln.y>ct+.002&&nn>-.15&&An>.12:ln.y<ct-.006&&nn>.25&&An>.14)&&(Xt[it][pt]=1)})}W.forEach((ue,ge)=>{let ve=U.get(ue);U.set(ue,ve?ve.map((se,J)=>Math.max(se,Xt[ge][J])):Xt[ge])})});let k=[];if(U.forEach((W,F)=>{let me=q(F),te=new Float32Array(me.n);for(let le=0;le<me.n;le++){let ze=W[le]*2,rt=2;me.nb[le].forEach(ft=>{ze+=W[ft],rt++}),te[le]=Math.max(W[le]*.85,ze/rt),te[le]>.35&&k.push(X(me,le))}U.set(F,te)}),!k.length)return null;if(!$){let W=k.reduce((F,me)=>F.add(me),new w).multiplyScalar(1/k.length);$=k.reduce((F,me)=>!F||me.distanceToSquared(W)<F.distanceToSquared(W)?me:F,null)}return{pt:$,W:U,pts:k,sphere:at,ivf:Ne}}function Ue(x,E){let S=x.attributes.position,L=x.attributes.normal,q=[],ee=[];for(let U=0;U<S.count;U++)q.push(S.getX(U),S.getY(U),S.getZ(U)),ee.push(L.getX(U),L.getY(U),L.getZ(U));let X=Array.from(x.index.array),xe=E*E;for(let U=0;U<7;U++){let $=new Map,pe=[],Ne=0,Ve=(W,F)=>{let me=q[W*3]-q[F*3],te=q[W*3+1]-q[F*3+1],le=q[W*3+2]-q[F*3+2];return me*me+te*te+le*le},We=(W,F)=>{let me=W<F?W+"_"+F:F+"_"+W,te=$.get(me);if(te!=null)return te;te=q.length/3;for(let le=0;le<3;le++)q.push((q[W*3+le]+q[F*3+le])/2),ee.push((ee[W*3+le]+ee[F*3+le])/2);return $.set(me,te),te},at=new Set;for(let W=0;W<X.length;W+=3)for(let F=0;F<3;F++){let me=X[W+F],te=X[W+(F+1)%3];Ve(me,te)>xe&&at.add(me<te?me+"_"+te:te+"_"+me)}if(!at.size)break;let k=(W,F)=>at.has(W<F?W+"_"+F:F+"_"+W);for(let W=0;W<X.length;W+=3){let F=X[W],me=X[W+1],te=X[W+2],le=[k(F,me),k(me,te),k(te,F)],ze=le[0]+le[1]+le[2];if(!ze){pe.push(F,me,te);continue}if(Ne++,ze===3){let rt=We(F,me),ft=We(me,te),cn=We(te,F);pe.push(F,rt,cn,rt,me,ft,cn,ft,te,rt,ft,cn);continue}for(;!(ze===1?k(F,me):k(F,me)&&k(me,te));){let rt=F;F=me,me=te,te=rt}if(ze===1){let rt=We(F,me);pe.push(F,rt,te,rt,me,te)}else{let rt=We(F,me),ft=We(me,te);pe.push(F,rt,te,rt,me,ft,rt,ft,te)}}if(X=pe,!Ne)break}for(let U=0;U<ee.length;U+=3){let $=Math.hypot(ee[U],ee[U+1],ee[U+2])||1;ee[U]/=$,ee[U+1]/=$,ee[U+2]/=$}let G=new Si;return G.setAttribute("position",new pi(q,3)),G.setAttribute("normal",new pi(ee,3)),G.setIndex(q.length/3>65535?new Go(X,1):new Vo(X,1)),G}function Qe(x){let E=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],S=[0,0,0,0];x.forEach(G=>{let U=[G.x,G.y,G.z,1],$=-(G.x*G.x+G.y*G.y+G.z*G.z);for(let pe=0;pe<4;pe++){S[pe]+=U[pe]*$;for(let Ne=0;Ne<4;Ne++)E[pe][Ne]+=U[pe]*U[Ne]}});for(let G=0;G<4;G++){let U=G;for(let $=G+1;$<4;$++)Math.abs(E[$][G])>Math.abs(E[U][G])&&(U=$);[E[G],E[U]]=[E[U],E[G]],[S[G],S[U]]=[S[U],S[G]];for(let $=0;$<4;$++)if($!==G){let pe=E[$][G]/E[G][G];for(let Ne=G;Ne<4;Ne++)E[$][Ne]-=pe*E[G][Ne];S[$]-=pe*S[G]}}let L=S[0]/E[0][0],q=S[1]/E[1][1],ee=S[2]/E[2][2],X=S[3]/E[3][3],xe=new w(-L/2,-q/2,-ee/2);return{c:xe,r:Math.sqrt(Math.max(0,xe.lengthSq()-X))}}function Tt(x,E){let S=Math.max(...x.map(X=>X.y)),L=x.filter(X=>X.y>S-.06),q=Math.max(...L.map(E)),ee=Qe(L.filter(X=>E(X)>q-.03));for(let X=0;X<2;X++){let xe=x.filter(G=>Math.abs(G.distanceTo(ee.c)-ee.r)<.004);xe.length>20&&(ee=Qe(xe))}return ee}function wt(x){let E=[];if(v.forEach(W=>st(W.mesh,F=>E.push(F.clone()))),!E.length)return null;let S=C?-1:1,L=W=>S*W.x,q=E.map(W=>W.y),ee=Math.max(...q),X=Math.min(...q),xe=ee-X,G=String(x).toLowerCase(),U={},$=(W,F,me,te,le)=>{U[W]={pred:F,f:me,tol:te,reach:le||.05}},pe=(W,F,me)=>W.y>=F&&W.y<=me;if(/femur|femoral/.test(v[0].name.toLowerCase())){let W=E.filter(be=>be.y>ee-.06),F=Math.max(...W.map(L)),me=W.filter(be=>L(be)>F-.025),te=me.reduce((be,ne)=>be.add(ne),new w).multiplyScalar(1/me.length),le=Math.max(...me.map(be=>be.distanceTo(te))),ze=E.filter(be=>be.y>ee-.09).reduce((be,ne)=>!be||-L(ne)>-L(be)?ne:be,null),rt=E.filter(be=>be.y<X+.11),ft=(Math.max(...rt.map(L))+Math.min(...rt.map(L)))/2,cn=te.clone().lerp(ze,.45),Xt=Tt(E,L);$("head",be=>be.y>ee-.08,be=>-Math.abs(be.distanceTo(Xt.c)-Xt.r),.003,.06),$("neck",be=>be.y>ee-.09,be=>-be.distanceTo(cn),.012,.02),$("greater trochanter",be=>be.y>ee-.09,be=>-L(be)+be.y*.3,.012,.04),$("lesser trochanter",be=>pe(be,ee-.12,ee-.06),be=>L(be)-be.z,.008,.025);let Ct={};E.forEach(be=>{let ne=Math.round(be.y/.008);(Ct[ne]==null||be.z<Ct[ne])&&(Ct[ne]=be.z)}),$("linea aspera",be=>pe(be,X+.3*xe,X+.75*xe),be=>-(be.z-Ct[Math.round(be.y/.008)]),.003,.25),$("medial condyle",be=>pe(be,X,X+.045),be=>L(be)-.6*(be.y-X),.016,.04),$("lateral condyle",be=>pe(be,X,X+.045),be=>-L(be)-.6*(be.y-X),.016,.04),$("medial epicondyle",be=>pe(be,X+.035,X+.075),be=>L(be),.006,.025),$("lateral epicondyle",be=>pe(be,X+.035,X+.075),be=>-L(be),.006,.025),$("adductor tubercle",be=>pe(be,X+.07,X+.1),be=>L(be),.004,.018),$("intercondylar fossa",be=>pe(be,X+.005,X+.04)&&Math.abs(L(be)-ft)<.012,be=>-be.z,.012,.03),$("patellar surface",be=>pe(be,X+.025,X+.07)&&Math.abs(L(be)-ft)<.022,be=>be.z,.008,.04)}else{let W=[];M.filter(ne=>ne.name==="Femur").forEach(ne=>st(ne.mesh,ue=>W.push(ue.clone())));let F=W.length?Math.max(...W.map(ne=>ne.y)):X+.4*xe,me=W.filter(ne=>ne.y>F-.05),te=me.length?Math.max(...me.map(L)):0,le=me.filter(ne=>L(ne)>te-.025),ze=le.reduce((ne,ue)=>ne.add(ue),new w).multiplyScalar(1/Math.max(1,le.length)),rt=ze.y,ft=ze.z,cn=Math.max(...E.map(L)),Xt=E.filter(ne=>ne.y>rt+.04).reduce((ne,ue)=>!ne||ue.z+.2*ue.y>ne.z+.2*ne.y?ue:ne,null).y,Ct=Math.min(...E.filter(ne=>ne.z<ft).map(ne=>ne.y));$("iliac crest",()=>!0,ne=>ne.y,.012,.12),$("anterior superior iliac spine",ne=>ne.y>rt+.04,ne=>ne.z+.2*ne.y,.006,.02),$("asis",ne=>ne.y>rt+.04,ne=>ne.z+.2*ne.y,.006,.02),$("anterior inferior iliac spine",ne=>ne.y>rt+.01&&ne.y<rt+.035&&ne.z>ft,ne=>ne.z,.005,.018),$("posterior superior iliac spine",ne=>ne.y>rt+.03&&L(ne)>cn-.06,ne=>-ne.z,.006,.02),$("ischial tuberosity",ne=>ne.z<ft,ne=>-ne.y,.012,.035),$("ischial spine",ne=>ne.y>Ct+.025&&ne.y<rt&&ne.z<ft-.015,ne=>L(ne),.004,.015),$("pubic symphysis",()=>!0,ne=>L(ne),.005,.03),$("pubic tubercle",ne=>L(ne)>cn-.035&&L(ne)<cn-.012,ne=>ne.z+.5*ne.y,.005,.015);let be=W.length?Tt(W,L):{c:ze,r:.024};$("acetabulum",ne=>ne.distanceTo(be.c)<be.r+.02,ne=>-Math.abs(ne.distanceTo(be.c)-(be.r+.002)),.005,.06)}let Ne=Object.keys(U).find(W=>G.indexOf(W)>=0);if(!Ne)return null;let Ve=U[Ne],We=E.filter(Ve.pred);if(!We.length)return null;let at=We[0],k=Ve.f(We[0]);return We.forEach(W=>{let F=Ve.f(W);F>k&&(k=F,at=W)}),{pt:at,inPatch:W=>Ve.pred(W)&&Ve.f(W)>=k-Ve.tol&&W.distanceTo(at)<Ve.reach,soft:W=>Math.min(1,(Ve.f(W)-(k-Ve.tol))/(Ve.tol*.5))}}m("landmark");let jt=sr(e.region||"")==="canal"&&/mater|dura/i.test(e.name||"");jt?(Z.makeEmpty(),v.forEach(x=>st(x.mesh,E=>{E.y>1.17&&E.y<1.23&&Z.expandByPoint(E)})),Z.isEmpty()&&v.forEach(x=>Z.union(x.box)),Z.expandByScalar(.006)):sr(e.region||"")==="plexus"?(Z.makeEmpty(),ae&&ae.pts?ae.pts.forEach(x=>Z.expandByPoint(x)):v.forEach(x=>Z.union(x.box)),Z.min.y=Math.max(Z.min.y,1.25),Z.max.y=Math.min(Z.max.y,1.52),Z.min.y>=Z.max.y&&(Z.min.y=1.3,Z.max.y=1.42),Z.expandByScalar(.025)):Te&&(Z.makeEmpty(),ae.pts?(ae.pts.forEach(x=>Z.expandByPoint(x)),Z.expandByScalar(.025)):Z.expandByPoint(Te).expandByScalar(.03)),Y||(Y=Z.isEmpty()?Jg.limb:[Z.min.y-.12,Z.max.y+.12]);let $t=v.length&&v.every(x=>x.layer==="ligament"||x.layer==="capsule"),Gt=v.length&&v.every(x=>x.layer==="bone"),xn=!Gt&&v.length&&v.every(x=>x.layer==="bone"||x.layer==="ligament"||x.layer==="capsule"),re=new Set(hc(e.show||(Gt?"bone":$t||xn?"bone,ligament":j==="nerve"||R.length?"bone,muscle,nerve,ligament":"bone,muscle,ligament")).map(sr).map(x=>x.replace(/s$/,"").replace("artery","vessel").replace("arterie","vessel"))),Wn=x=>x.box.max.y>Y[0]&&x.box.min.y<Y[1],zt=sr(e.region||"")==="vertebra";M.forEach(x=>{x.mesh.visible=zt?v.includes(x):Wn(x)&&(re.has(x.layer)||v.includes(x)||R.includes(x))});let Dt=new on;M.forEach(x=>{x.mesh.visible&&Dt.union(x.box)}),Dt.min.y=Math.max(Dt.min.y,Y[0]),Dt.max.y=Math.min(Dt.max.y,Y[1]);let ot=(x,E,S)=>{x.mesh.material.color.setHex(E),x.mesh.material.emissive.setHex(S||0)},On=!1,Ut=(x,E)=>{let S=x.mesh.material;S.transparent!==E<1&&(S.needsUpdate=!0),S.transparent=E<1,S.opacity=E,S.depthWrite=!0,x.mesh.renderOrder=E<1?1+M.indexOf(x)/1e4:0},N=x=>x.layer==="vessel"||x.layer==="vein"?ot(x,x.layer==="vein"?5213439:16726843,x.layer==="vein"?731776:6949386):ot(x,new It(x.mesh.userData.base).lerp(new It(Kg),.6).getHex(),666684),A=[],ie=[],Ce=[],Ie=null,ke=[];if(Te){let x=L=>{let q=new It(L);v.forEach(ee=>{let X=ee.mesh.geometry,xe=X.attributes.position,G=xe.count,U=new Float32Array(G*3),$=new Float32Array(G),pe=new It(ee.mesh.userData.base),Ne=new w;for(let Ve=0;Ve<G;Ve++){Ne.fromBufferAttribute(xe,Ve).applyMatrix4(ee.mesh.matrixWorld);let We=ae.W?ae.W.get(ee)?ae.W.get(ee)[Ve]:0:ae.inPatch(Ne)?Math.max(0,Math.min(1,ae.soft(Ne))):0,at=pe.clone().lerp(q,We*.85);U[Ve*3]=at.r,U[Ve*3+1]=at.g,U[Ve*3+2]=at.b,$[Ve]=We}X.setAttribute("color",new Tn(U,3)),X.setAttribute("jkw",new Tn($,1)),ee.mesh.material.vertexColors=!0,ee.mesh.material.color.setHex(16777215),ee.mesh.material.needsUpdate=!0});try{zn=!0}catch{}},E=Ee[String(e.landmark).toLowerCase().trim()];if(E&&E.outline&&ae.pts&&ae.pts.length>12&&!(j==="find"&&!O)){let L=ae.pts,q=L.reduce((Ne,Ve)=>Ne.add(Ve),new w).multiplyScalar(1/L.length),ee=[[0,0,0],[0,0,0],[0,0,0]];L.forEach(Ne=>{let Ve=[Ne.x-q.x,Ne.y-q.y,Ne.z-q.z];for(let We=0;We<3;We++)for(let at=0;at<3;at++)ee[We][at]+=Ve[We]*Ve[at]});let X=(Ne,Ve)=>{let We=new w(.3,.8,.5);for(let at=0;at<30;at++){let k=new w(Ne[0][0]*We.x+Ne[0][1]*We.y+Ne[0][2]*We.z,Ne[1][0]*We.x+Ne[1][1]*We.y+Ne[1][2]*We.z,Ne[2][0]*We.x+Ne[2][1]*We.y+Ne[2][2]*We.z);Ve&&k.addScaledVector(Ve,-k.dot(Ve)),We=k.normalize()}return We},xe=X(ee),G=X(ee,xe),U=64,$=Array.from({length:U},()=>[]);L.forEach(Ne=>{let Ve=Ne.clone().sub(q),We=Math.atan2(Ve.dot(G),Ve.dot(xe));$[Math.floor((We+Math.PI)/(2*Math.PI)*U)%U].push(Ne)});let pe=$.map(Ne=>Ne.length?E.outline==="loop"?Ne.reduce((Ve,We)=>!Ve||We.distanceToSquared(q)<Ve.distanceToSquared(q)?We:Ve,null):Ne.reduce((Ve,We)=>Ve.add(We),new w).multiplyScalar(1/Ne.length):null);if(E.outline==="arc"){let Ne={};L.forEach(at=>{let k=Math.round(at.y/.003);(Ne[k]||(Ne[k]=[])).push(at)});let Ve=Object.keys(Ne).map(Number).sort((at,k)=>at-k);pe=[];let We=null;Ve.forEach(at=>{let k=Ne[at];if(We){let W=k.filter(F=>F.distanceTo(We)<.009);if(!W.length)return;k=W}else{let W=k.reduce((F,me)=>F.add(me),new w).multiplyScalar(1/k.length);k=k.filter(F=>F.distanceTo(W)<.008),k.length||(k=Ne[at])}We=k.reduce((W,F)=>W.add(F),new w).multiplyScalar(1/k.length),pe.push(We.clone())})}if(pe=pe.filter(Boolean),pe.length>5){let Ne=pe.map((at,k)=>{let W=pe[(k-1+pe.length)%pe.length],F=pe[(k+1)%pe.length];return E.outline==="arc"&&(k===0||k===pe.length-1)?at.clone():at.clone().multiplyScalar(.5).addScaledVector(W,.25).addScaledVector(F,.25)}),Ve=new qa(Ne,E.outline==="loop"),We=new Sn(new Tl(Ve,160,.0013,8,E.outline==="loop"),new Wi({color:4642047}));We.renderOrder=12,p.add(We)}}let S=/intervertebral foramen/.test(String(e.landmark).toLowerCase());Ie={material:{color:{setHex:L=>{S||x(L)}}},set visible(L){L&&!S&&x(3524863)}},Ie.visible=!(j==="find"&&!O),/intervertebral foramen/.test(String(e.landmark).toLowerCase())&&ae.pts&&Object.values(ae.ivf||{}).forEach(L=>{let q=L.top>-1e8?L.top:L.pt,ee=L.bot<1e8?L.bot:L.pb;if(!(L.n>4&&q>ee))return;L.top=q,L.bot=ee;let X=L.xs/L.n,xe=L.zs/L.n,G=[];v.forEach(le=>st(le.mesh,ze=>{Math.abs(ze.x-X)<.007&&G.push([ze.z,ze.y])}));let U=xe,$=(L.top+L.bot)/2,pe=0;for(let le=xe-.018;le<=xe+.003;le+=.001)for(let ze=L.bot-.006;ze<=L.top+.022;ze+=.001){let rt=1e9;for(let ft of G){let cn=ft[0]-le,Xt=ft[1]-ze,Ct=cn*cn+Xt*Xt;if(Ct<rt&&(rt=Ct),rt<pe*pe)break}rt=Math.sqrt(rt),rt>pe&&(pe=rt,U=le,$=ze)}if(pe<.002)return;let Ne=U,Ve=$,We=Math.min(pe*1.35,.013),at=Math.min(pe*.95,.009),k=[X,Ve,Ne],W=[],F=40;for(let le=0;le<F;le++){let ze=le/F*2*Math.PI;k.push(X,Ve+Math.sin(ze)*We,Ne+Math.cos(ze)*at),W.push(0,1+le,1+(le+1)%F)}let me=new Si;me.setAttribute("position",new pi(k,3)),me.setIndex(W);let te=new Sn(me,new Wi({color:3524863,transparent:!0,opacity:.65,side:Mi,depthWrite:!1}));te.renderOrder=15,p.add(te),te.visible=!(j==="find"&&!O),ke.push(te);for(let le=0;le<=8;le++){let ze=le/8*2*Math.PI;Be.push(new w(X,Ve+(le<8?Math.sin(ze)*We*.7:0),Ne+(le<8?Math.cos(ze)*at*.7:0)))}}),O&&A.push({text:e.name,pts:[Te],cls:"hl"})}if(Te)v.some(x=>x.layer!=="bone")&&(Ce=v);else if(j==="name")v.forEach(N),Ce=v,O&&A.push({text:e.name,parts:v,cls:"hl"});else if(j==="find")B&&M.forEach(x=>{x.layer==="muscle"&&Ut(x,.15),x.layer===v[0].layer&&Wn(x)&&(x.mesh.visible=!0)}),O&&(v.forEach(x=>ot(x,gu,667672)),Ce=v,A.push({text:e.name,parts:v,cls:"ok"}));else if(j==="attach")v.forEach(N),Ce=v,O&&v.some(x=>x.layer==="ligament")?A.push({text:e.name,parts:v,cls:"hl"}):O&&(M.forEach(x=>{x.layer==="muscle"&&!v.includes(x)&&(x.mesh.visible=!1)}),v.forEach(x=>Ut(x,.6)),Ke());else if(j==="nerve")v.forEach(N),Ce=v,O?(M.forEach(x=>{x.layer==="muscle"&&!v.includes(x)&&Ut(x,.12)}),v.forEach(x=>Ut(x,.55)),R.forEach(x=>{x.mesh.visible=!0,ot(x,16769354,6967808)}),R.length&&A.push({text:e.nervename||R[0].name,parts:R.filter(x=>x.name===R[0].name),cls:"nerve"}),A.push({text:e.name,parts:v,cls:"hl"})):R.forEach(x=>{x.mesh.visible=!1}),M.forEach(x=>{x.layer==="nerve"&&!R.includes(x)&&!O&&(x.mesh.visible=!1)});else if(j==="nerveid"){M.forEach(E=>{E.layer==="muscle"&&Ut(E,.18)});let x=v[0]&&(v[0].layer==="vessel"||v[0].layer==="vein")?v[0].layer:null;if(x){M.forEach(G=>{G.layer===x&&Wn(G)&&!v.includes(G)&&(G.mesh.visible=!0,Ut(G,.28))});let E=[];v.forEach(G=>st(G.mesh,U=>E.push(U.clone())));let S=.004,L=new Map,q=(G,U,$)=>G+","+U+","+$;E.forEach(G=>{let U=q(Math.floor(G.x/S),Math.floor(G.y/S),Math.floor(G.z/S));(L.get(U)||L.set(U,[]).get(U)).push(G)});let ee=new on;v.forEach(G=>ee.union(G.box)),ee.expandByScalar(.004);let X=G=>{if(!G.box.intersectsBox(ee))return!1;let U=G.mesh.geometry.attributes.position,$=new w,pe=Math.max(1,Math.floor(U.count/1500));for(let Ne=0;Ne<U.count;Ne+=pe){$.fromBufferAttribute(U,Ne).applyMatrix4(G.mesh.matrixWorld);let Ve=Math.floor($.x/S),We=Math.floor($.y/S),at=Math.floor($.z/S);for(let k=-1;k<=1;k++)for(let W=-1;W<=1;W++)for(let F=-1;F<=1;F++){let me=L.get(q(Ve+k,We+W,at+F));if(me){for(let te of me)if(te.distanceToSquared($)<.0025*.0025)return!0}}}return!1},xe=[];M.forEach(G=>{G.layer!==x||v.includes(G)||v.some(U=>U.name===G.name)||X(G)&&(G.mesh.visible=!0,Ut(G,1),ot(G,10132899,1052688),G._link=!0,xe.push(G))}),O&&xe.sort((G,U)=>U.box.getSize(new w).length()-G.box.getSize(new w).length()).slice(0,4).forEach(G=>ie.push({text:G.name,parts:[G],cls:"minor"}))}v.forEach(E=>{E.mesh.visible=!0,x?N(E):ot(E,Kg,670288)}),O&&A.push({text:e.name,parts:v,cls:"hl"})}else j==="action"&&(v.forEach(N),Ce=v);if(sr(e.region||"")==="canal"){let x=v.some(S=>/arachnoid/i.test(S.name)),E=/pia mater/i.test(e.name||"");M.forEach(S=>{if(!v.includes(S))if(S.layer==="muscle"||S.layer==="ligament"||S.layer==="capsule"&&!/dura/i.test(S.name))S.mesh.visible=!1;else if(S.layer==="bone")Ut(S,/vertebra|atlas|axis|sacrum|coccyx/i.test(S.name)?.22:.1);else if(S.name==="Spinal dura (opened)"&&(x||E))S.mesh.visible=!0,ot(S,12096874);else if(S.name==="Arachnoid mater (opened)"&&E)S.mesh.visible=!0,ot(S,13227750);else if(/dura|arachnoid/i.test(S.name)){S.mesh.visible=!1;let L=S.mesh.material;L.colorWrite=!1,L.depthWrite=!1,L.needsUpdate=!0}else S.layer==="nerve"&&/spinal cord|cauda|root of spinal|spinal ganglion|dorsal rami/i.test(S.name)&&(S.mesh.visible=!0)}),jt||v.forEach(S=>{S.mesh.visible=!0,S.mesh.renderOrder=20;let L=S.mesh.material;L.depthTest=!1,L.transparent=!0,L.opacity=1,L.needsUpdate=!0})}if(sr(e.region||"")==="plexus"){let x=/brachial plexus|musculocutaneous|axillary nerve|^radial nerve|^median nerve|^ulnar nerve|dorsal scapular|long thoracic|suprascapular nerve|pectoral nerve|subscapular nerve|thoracodorsal|medial brachial cutaneous|medial antebrachial cutaneous/i;M.forEach(E=>{E.layer==="nerve"&&x.test(E.name)?(E.mesh.visible=!0,v.includes(E)||(E.mesh.renderOrder=2)):E.layer==="muscle"&&!v.includes(E)&&Ut(E,.1)})}if(v.length&&!Te&&!(j==="find"&&!O)){let x=new Xi({vertexShader:"varying vec3 vn; varying vec3 vv; void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.); vn = normalize(normalMatrix * normal); vv = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }",fragmentShader:"varying vec3 vn; varying vec3 vv; void main(){ float r = 1. - abs(dot(normalize(vn), normalize(vv))); float a = 0.1 + 0.55 * pow(r, 2.2); gl_FragColor = vec4(0.42, 0.82, 1.0, a); }",transparent:!0,depthTest:!0,depthWrite:!1,depthFunc:lf,side:Gi});v.forEach(E=>{let S=new Sn(E.mesh.geometry,x);S.renderOrder=20,S.raycast=()=>{},E.mesh.add(S)})}if(O&&v.length&&!B&&["name","find","attach","nerve","action"].includes(j)&&(j!=="attach"&&!Te&&!v.some(x=>x.layer==="ligament"||x.layer==="capsule"||x.layer==="bone")&&Ke(!0),j!=="nerve"&&R.length)){R.forEach(E=>{E.mesh.visible=!0,ot(E,14270576,2761216)});let x=R[0].name;ie.push({text:"Nerve \xB7 "+x,parts:R.filter(E=>E.name===x),cls:"minor"})}function St(x){if(x=String(x||"").toLowerCase(),!x)return new Set;let E=new Set,S=U=>M.some($=>$.name===U&&$.layer==="bone"),L=[["Scapula",/scapul|coracoid|acromion|glenoid|supraspinous|infraspinous|subscapular fossa|inferior angle|lateral border/],["Clavicle",/clavic/],["Humerus",/humer|intertubercular|deltoid tuberosity|epicondyle|supracondylar|tubercle of the humerus/],["Radius",/radius|radial tuberosity|radial shaft|supinator crest(?!)/],["Ulna",/ulna\b|ulna |olecranon|coronoid|ulnar tuberosity|supinator crest/],["Pisiform bone",/pisiform/],["Hamate bone",/hamate/],["Trapezium bone",/trapezium/],["Trapezoid bone",/trapezoid/],["Capitate bone",/capitate/],["Scaphoid bone",/scaphoid/],["Lunate bone",/lunate/],["Triquetrum bone",/triquetrum/],["Femur",/femur|trochanter|linea aspera|femoral/],["Tibia",/tibia/],["Fibula",/fibula/],["Hip bone",/ilium|ischi|pubi|iliac|hip bone/],["Sacrum",/sacrum|sacral/],["Calcaneus",/calcane/],["Patella",/patell/]],q=U=>U.name.replace(/\.[lr]$/,"");L.forEach(([U,$])=>{$.test(x)&&M.forEach(pe=>{pe.layer==="bone"&&q(pe)===U&&E.add(pe.name)})}),[[/spinous|vertebra|transverse process|nuchal|lamina/,U=>/^(vertebra |atlas|axis)/i.test(U.name)],[/\bribs?\b|costal/,U=>/\brib\b/i.test(U.name)],[/occipit|mastoid|skull/,U=>/occipital|temporal/i.test(U.name)],[/sacrum|sacral/,U=>/^sacrum/i.test(U.name)],[/cervical/,U=>/^(vertebra c|atlas|axis)/i.test(U.name)],[/thoracic/,U=>/^vertebra t/i.test(U.name)]].forEach(([U,$])=>{U.test(x)&&M.forEach(pe=>{pe.layer==="bone"&&$(pe)&&E.add(pe.name)})}),/cervical/.test(x)&&/thoracic/.test(x)||(/cervical/.test(x)?[...E].forEach(U=>{/^vertebra [tl]/i.test(U)&&E.delete(U)}):/thoracic/.test(x)&&[...E].forEach(U=>{/^(vertebra [cl]|atlas|axis)/i.test(U)&&E.delete(U)}));let X={first:/1st|first|thumb/,second:/2nd|second|index/,third:/3rd|third/,fourth:/4th|fourth/,fifth:/5th|fifth|little/},xe=x.match(/(\d)(?:st|nd|rd|th)?\s*[–-]\s*(\d)/),G=new Set;if(Object.keys(X).forEach(U=>{X[U].test(x)&&G.add(U)}),xe&&["first","second","third","fourth","fifth"].slice(+xe[1]-1,+xe[2]).forEach(U=>G.add(U)),/metacarpal/.test(x)&&M.forEach(U=>{let $=U.name.match(/^(\w+) metacarpal bone$/i);$&&(!G.size||G.has($[1].toLowerCase()))&&E.add(U.name)}),/phalan/.test(x)){let U=["proximal","middle","distal"].filter($=>x.indexOf($)>=0);M.forEach($=>{let pe=$.name.match(/^(proximal|middle|distal) phalanx of (\w+) finger of hand$/i);pe&&(!U.length||U.includes(pe[1].toLowerCase()))&&(!G.size||G.has(pe[2].toLowerCase()))&&E.add($.name)})}return E}function Ke(x,E){let S={o:St(e.origin),i:St(e.insertion)},L=[];if(v.forEach(te=>st(te.mesh,le=>L.push(le.clone()))),!L.length)return;let q=.006,ee=new Map,X=(te,le,ze)=>te+","+le+","+ze;L.forEach(te=>{let le=X(Math.floor(te.x/q),Math.floor(te.y/q),Math.floor(te.z/q));(ee.get(le)||ee.set(le,[]).get(le)).push(te)});let xe=new on;v.forEach(te=>xe.union(te.box));let G=xe.max.y-xe.min.y,U=xe.max.y-.35*G,$=.0065,pe=L[0];L.forEach(te=>{te.y>pe.y&&(pe=te)});let Ne=L[0],Ve=-1;L.forEach(te=>{let le=te.distanceToSquared(pe);le>Ve&&(Ve=le,Ne=te)});let We=xe.min.y+.22*G,at=!1;{let te=q;M.forEach(le=>{at||le.layer!=="bone"||!le.mesh.visible||le.box.distanceToPoint(Ne)>.02||st(le.mesh,ze=>{!at&&ze.distanceTo(Ne)<.015&&(at=!0)})})}let k=E?te=>te.y<=We:te=>te.distanceTo(Ne)<(at?.03:.05)&&te.y<=We+.02,W={o:[],i:[]},F={},me=!E&&S.o.size&&S.i.size&&[...S.o].some(te=>!S.i.has(te))&&[...S.i].some(te=>!S.o.has(te));if(M.forEach(te=>{if(te.layer!=="bone"||!te.mesh.visible||!te.box.clone().expandByScalar(.01).intersectsBox(xe))return;let le=te.mesh.geometry,ze=le.attributes.position,rt=ze.count,ft=new Float32Array(rt*3),cn=new It(te.mesh.userData.base),Xt=new It(HE),Ct=new It(VE),be=new w,ne=!1,ue=[],ge=[],ve=[];for(let Me=0;Me<rt;Me++){be.fromBufferAttribute(ze,Me).applyMatrix4(te.mesh.matrixWorld);let Se=!1,_t=Math.floor(be.x/q),qe=Math.floor(be.y/q),pt=Math.floor(be.z/q);for(let ct=-1;ct<=1&&!Se;ct++)for(let nn=-1;nn<=1&&!Se;nn++)for(let An=-1;An<=1&&!Se;An++){let qn=ee.get(X(_t+ct,qe+nn,pt+An));if(qn){for(let ki of qn)if(ki.distanceToSquared(be)<$*$){Se=!0;break}}}let it=Se?k(be)?2:be.y>=U?1:0:0;if(Se&&me){let ct=S.o.has(te.name),nn=S.i.has(te.name);it=ct&&!nn?1:nn&&!ct?2:ct&&nn?it:0}let ln=it===1?Xt:it===2?Ct:cn;ft[Me*3]=ln.r,ft[Me*3+1]=ln.g,ft[Me*3+2]=ln.b,it&&(ne=!0,(it===1?W.o:W.i).push(be.clone()),ue.push(be.clone()),(it===1?ge:ve).push(be.clone()))}let se=te.name==="Hip bone"?"Hip bone":te.name.replace(/ bone$/,""),J=(Me,Se)=>{if(Se.length<6)return;let _t=Me+se;F[_t]?F[_t].pts.push(...Se):F[_t]={k:Me,text:(x?Me+" \xB7 ":"")+se,pts:Se.slice()}};J("Origin",ge),J("Insertion",ve),!x&&ne&&(le.setAttribute("color",new Tn(ft,3)),te.mesh.material.vertexColors=!0,te.mesh.material.color.setHex(16777215),te.mesh.material.needsUpdate=!0)}),!E&&(!Object.values(F).some(te=>te.k==="Insertion")||me&&!Object.values(F).some(te=>te.k==="Origin")))return M.forEach(te=>{te.layer==="bone"&&te.mesh.material.vertexColors&&(te.mesh.geometry.deleteAttribute("color"),te.mesh.material.vertexColors=!1,te.mesh.material.color.setHex(te.mesh.userData.base),te.mesh.material.needsUpdate=!0)}),Ke(x,!0);["Origin","Insertion"].forEach(te=>{let le=Object.values(F).filter(ft=>ft.k===te),ze=ft=>te==="Origin"?Math.max(...ft.pts.map(cn=>cn.y)):-Math.min(...ft.pts.map(cn=>cn.y)),rt=me?-1e9:Math.max(-1e9,...le.map(ze));le.filter(ft=>ze(ft)>=rt-.025).sort((ft,cn)=>cn.pts.length-ft.pts.length).slice(0,2).forEach(ft=>ie.push({text:ft.text,pts:ft.pts,cls:"minor"}))}),!x&&(A.push({text:e.name,parts:v,cls:"hl"}),W.o.length&&A.push({text:"Origin",pts:W.o,cls:"orig"}),W.i.length&&A.push({text:"Insertion",pts:W.i,cls:"ins"}))}function st(x,E){let S=x.geometry.attributes.position,L=new w;for(let q=0;q<S.count;q++)E(L.fromBufferAttribute(S,q).applyMatrix4(x.matrixWorld))}let At=0,Ht=j==="peel"&&V.length?document.createElement("div"):null;function Fe(x){if(At=Math.max(0,Math.min(V.length,x)),V.forEach((E,S)=>E.forEach(L=>{L.mesh.visible=S>=At&&Wn(L),ot(L,L.mesh.userData.base)})),A.length=0,O&&At<V.length){let E={};V[At].forEach(S=>{N(S);let L=S.name.replace(/ muscle$/,"");E[L]?E[L].parts.push(S):Object.keys(E).length<6&&A.push(E[L]={text:L,parts:[S],cls:"hl"})})}Ht&&(Ht.querySelector("input").value=At,Ht.querySelector("span").textContent=At?"Removed: "+At+" layer"+(At>1?"s":""):"All layers"),so(),zn=!0}Ht&&(Ht.className="jka-peel",Ht.innerHTML='<input type="range" min="0" max="'+V.length+'" step="1"><span></span>',Ht.querySelector("input").oninput=x=>Fe(+x.target.value),r.appendChild(Ht));let Pe=new di(30,1,.01,20),Le=new Ed(Pe,a.domElement);Le.enableDamping=!0,Le.dampingFactor=.12,Le.screenSpacePanning=!0,Le.enableZoom=!1,Le.enablePan=!1,Le.mouseButtons={LEFT:Gm.ROTATE,MIDDLE:null,RIGHT:null};let bt=new nt,Et=0;function et(){Pi&&(Pe.setViewOffset(Pi,Ji,-bt.x,-bt.y+Et,Pi,Ji),Pe.updateProjectionMatrix())}let Mt=a.domElement;Mt.addEventListener("contextmenu",x=>{x.preventDefault(),x.stopImmediatePropagation()},!0),s.addEventListener("contextmenu",x=>{x.target===Mt&&(x.preventDefault(),x.stopPropagation())},!0);let Qt=null;Mt.addEventListener("pointerdown",x=>{(x.button===2||x.button===1||x.button===0&&x.shiftKey)&&(x.preventDefault(),x.stopImmediatePropagation(),Qt={x:x.clientX,y:x.clientY,x0:x.clientX,y0:x.clientY,b:x.button},Mt.setPointerCapture(x.pointerId),Br(),Re=null)},!0),Mt.addEventListener("pointermove",x=>{if(!Qt)return;let E=Mt.getBoundingClientRect(),S=Pi/E.width;bt.x+=(x.clientX-Qt.x)*S,bt.y+=(x.clientY-Qt.y)*S,Qt.x=x.clientX,Qt.y=x.clientY,et(),uo(),O||yt()}),Mt.addEventListener("pointerup",x=>{Qt&&Qt.b===2&&Math.hypot(x.clientX-Qt.x0,x.clientY-Qt.y0)<5&&Su(x.clientX,x.clientY),Qt=null}),Mt.addEventListener("pointercancel",()=>{Qt=null});function kn(x,E,S){let L=Pe.position.clone().sub(Le.target),q=L.length(),ee=Math.max(an?.15:.04,Math.min(an?14:3,q*S)),X=ee/q,xe=Mt.getBoundingClientRect(),G=(x-xe.left)/xe.width*2-1,U=-(E-xe.top)/xe.height*2+1;Je.setFromCamera(new nt(G,U),Pe),Je.far=1/0;let $=Je.intersectObjects(M.filter(We=>We.mesh.visible&&We.mesh.material.opacity>.3).map(We=>We.mesh),!1)[0],pe=$?$.point.clone():Le.target.clone(),Ne=pe.clone().project(Pe);Pe.position.copy(Le.target).addScaledVector(L,X),Pe.updateMatrixWorld(),et();let Ve=pe.clone().project(Pe);bt.x+=(Ne.x-Ve.x)/2*Pi,bt.y-=(Ne.y-Ve.y)/2*Ji,et(),Le.update(),uo(),O||yt()}Mt.addEventListener("wheel",x=>{x.preventDefault(),x.stopPropagation();let E=x.deltaY*(x.deltaMode===1?33:x.deltaMode===2?400:1);x.ctrlKey&&(E*=3),kn(x.clientX,x.clientY,Math.exp(Math.max(-.6,Math.min(.6,E*.0035))))},{passive:!1});let Ft=new Map,He=null,H=0,Ye=!1,je=0,Wt=0;Mt.addEventListener("touchstart",x=>{x.touches.length===1&&(Ye=!1,je=x.touches[0].clientX,Wt=x.touches[0].clientY),x.touches.length>1&&x.cancelable&&x.preventDefault()},{passive:!1}),Mt.addEventListener("touchmove",x=>{let E=x.touches[0];E&&(Math.abs(E.clientX-je)>6||Math.abs(E.clientY-Wt)>6)&&(Ye=!0),x.cancelable&&x.preventDefault()},{passive:!1}),Mt.addEventListener("touchend",x=>{if(Ye||x.touches.length){x.stopPropagation(),x.cancelable&&x.preventDefault();return}if(j==="find"&&!O){let E=x.changedTouches[0],S=Mt.getBoundingClientRect();Je.setFromCamera(new nt((E.clientX-S.left)/S.width*2-1,-(E.clientY-S.top)/S.height*2+1),Pe),Je.far=1/0,Je.intersectObjects(M.filter(L=>L.mesh.visible&&L.mesh.material.opacity>.3).map(L=>L.mesh),!1).length&&(x.stopPropagation(),x.cancelable&&x.preventDefault())}},{passive:!1}),Mt.addEventListener("pointerdown",x=>{if(x.pointerType==="touch"){if(Ft.set(x.pointerId,[x.clientX,x.clientY]),clearTimeout(H),Ft.size===1){let E=x.clientX,S=x.clientY;H=setTimeout(()=>{let L=Ft.get(x.pointerId);L&&Ft.size===1&&Math.hypot(L[0]-E,L[1]-S)<8&&(Le.drag=null,Le.spin=null,Su(E,S))},550)}if(Ft.size===2){Le.drag=null,Le.multi=!0,Br();let[E,S]=[...Ft.values()];He={d:Math.hypot(E[0]-S[0],E[1]-S[1]),m:[(E[0]+S[0])/2,(E[1]+S[1])/2],ang:Math.atan2(S[1]-E[1],S[0]-E[0])}}}},!0),Mt.addEventListener("pointermove",x=>{if(x.pointerType!=="touch"||!Ft.has(x.pointerId)||(Ft.set(x.pointerId,[x.clientX,x.clientY]),Ft.size!==2||!He))return;x.stopImmediatePropagation();let[E,S]=[...Ft.values()],L=Math.hypot(E[0]-S[0],E[1]-S[1]),q=[(E[0]+S[0])/2,(E[1]+S[1])/2],ee=Mt.getBoundingClientRect(),X=Pi/ee.width;bt.x+=(q[0]-He.m[0])*X,bt.y+=(q[1]-He.m[1])*X,et(),L>10&&He.d>10&&kn(q[0],q[1],He.d/L);let xe=Math.atan2(S[1]-E[1],S[0]-E[0]),G=xe-He.ang;for(;G>Math.PI;)G-=2*Math.PI;for(;G<-Math.PI;)G+=2*Math.PI;He={d:L,m:q,ang:xe},uo()},!0);let Bt=x=>{x.pointerType==="touch"&&(Ft.delete(x.pointerId),clearTimeout(H),Ft.size<2&&(He=null,Ft.size||(Le.multi=!1)))};Mt.addEventListener("pointerup",Bt,!0),Mt.addEventListener("pointercancel",Bt,!0);let bn=(Z.isEmpty()?Dt:Z).getCenter(new w);(j==="find"||j==="peel")&&Dt.getCenter(bn);let yn=j==="find"||j==="peel"||Z.isEmpty()?Dt:Z,Jn=yn.getSize(new w),$n=ex(e.cam,C),an=!1,En=null,Bi=!1;function dc(){if(window.matchMedia&&(matchMedia("(hover: none)").matches||matchMedia("(max-width: 720px)").matches)){r.style.height="";return}let x=document.getElementById("jk-sc")||document.scrollingElement||document.documentElement,E=r.getBoundingClientRect(),S=E.height/Math.max(1,r.offsetHeight)||1,L=s.closest(".jka-split"),q=L&&L.querySelector(".jka-right"),ee=q&&getComputedStyle(L).display==="block",X=0;if(ee){q.style.height="auto",q.style.maxHeight="none",r.style.height="";return}let xe=(window.innerHeight||x.clientHeight)-Math.max(0,E.top)-X-8;if(xe<200)return;let G=Math.floor(xe/S)+"px";Math.abs((parseFloat(r.style.height)||0)-parseFloat(G))>4&&(r.style.height=G),q&&!ee&&(q.style.height=G,q.style.maxHeight=G)}function ks(){dc();try{let E=r.querySelector(":scope > .jka-chips");if(E&&!(window.matchMedia&&(matchMedia("(hover: none)").matches||matchMedia("(max-width: 720px)").matches))){let S=r.getBoundingClientRect(),L=S.height/Math.max(1,r.offsetHeight)||1;E.style.setProperty("top",Math.round((innerHeight/2-S.top)/L)+"px","important")}}catch{}let x=an?-10:Math.max(0,r.getBoundingClientRect().left);r.querySelectorAll(":scope > .jka-views, :scope > .jka-chips").forEach(E=>{E.style.marginLeft=-x+"px"})}window.addEventListener("resize",()=>ks());let Pi=600,Ji=400;function os(){let x=a.domElement.parentElement||r,E=x.clientWidth||600,S=(x.clientHeight||400)-(an&&x===r?48:0);Pi=E,Ji=S,a.setSize(E,S,!1),Pe.aspect=E/S,Pe.updateProjectionMatrix(),et(),ks(),u.setAttribute("viewBox","0 0 "+E+" "+S)}os();let io=Math.abs($n.x)>Math.abs($n.z)?Jn.z:Jn.x,ha=.09,pc=.2,xu=1-ha-pc-.03,yu=Math.max(.22,Math.max(Jn.y,io/Pe.aspect)/xu+.02),I=Math.tan(Qr.degToRad(15)),K=Math.min(2.5,Math.max(.15,yu/2/I+io/2)),oe=2*(K-io/2)*I;Et=(pc-ha)/2*Ji*(1-Math.abs($n.y)),et(),Le.target.copy(bn),Pe.position.copy(bn).addScaledVector($n,K),Pe.up.copy(Qg($n)),Pe.lookAt(bn);let ce=e.mode+"|"+e.name+"|"+e.meshes+"|"+(e.peel||[]).join("/"),Q=window.__jkaCam,Re=null;if(O&&Q&&Q.key===ce){Re={p0:Q.pos.clone(),t0:Le.target.clone(),p1:Pe.position.clone(),t1:Le.target.clone(),s:0,q0:(Q.pan||new nt).clone(),q1:new nt},Pe.position.copy(Q.pos).sub(Q.target).add(Le.target),Re.p0.copy(Pe.position),Q.pan&&(bt.copy(Q.pan),et()),["pointerdown","wheel"].forEach(x=>a.domElement.addEventListener(x,()=>{Re=null},!0));try{Pe.updateMatrixWorld(),Pe.updateProjectionMatrix();let x=new vr().setFromProjectionMatrix(new vt().multiplyMatrices(Pe.projectionMatrix,Pe.matrixWorldInverse)),E=new Za,S=M.filter(G=>G.mesh.visible).map(G=>G.mesh),L=new Set(v.map(G=>G.mesh)),q=0,ee=0,X=new w,xe=Te&&Be.length?Be.filter((G,U)=>U%Math.max(1,Math.floor(Be.length/16))===0):[];xe.length||v.forEach(G=>{let U=G.mesh.geometry.attributes.position,$=Math.max(1,Math.floor(U.count/12));for(let pe=0;pe<U.count;pe+=$)xe.push(X.fromBufferAttribute(U,pe).applyMatrix4(G.mesh.matrixWorld).clone())}),xe.forEach(G=>{if(q++,!x.containsPoint(G))return;let U=G.clone().sub(Pe.position),$=U.length();E.set(Pe.position,U.normalize()),E.far=$+.002;let pe=E.intersectObjects(S,!1)[0];(!pe||L.has(pe.object)||pe.distance>$-.004)&&ee++}),q&&ee/q>=.35&&(Re.p1=Re.p0.clone(),Re.keep=!0)}catch{}}let yt=()=>{window.__jkaCam={key:ce,pos:Pe.position.clone(),target:Le.target.clone(),pan:bt.clone()}};Le.minDistance=.05,Le.maxDistance=3,Le.update();let Je=new Za,Vt=[];Ce.forEach(x=>{let E=x.mesh.geometry.attributes.position,S=Math.max(1,Math.floor(E.count/24));for(let L=0;L<E.count;L+=S)Vt.push(new w().fromBufferAttribute(E,L).applyMatrix4(x.mesh.matrixWorld))});let Yt=new Set,Zt=!1;function Kt(){if(!Zt||!Vt.length||On)return;let x=new Set,E=M.filter(S=>S.mesh.visible&&!Ce.includes(S)&&!S._glass&&(S.layer==="muscle"||S.layer==="vessel")).map(S=>S.mesh);for(let S of Vt){let L=S.clone().sub(Pe.position),q=L.length();Je.set(Pe.position,L.normalize()),Je.far=q-.002;for(let ee of Je.intersectObjects(E,!1))x.add(ee.object)}M.forEach(S=>{x.has(S.mesh)!==Yt.has(S)&&(zn=!0),x.has(S.mesh)&&!Yt.has(S)?(Yt.add(S),S._a=S.mesh.material.opacity,Ut(S,.18)):!x.has(S.mesh)&&Yt.has(S)&&(Yt.delete(S),Ut(S,S._a==null?1:S._a))})}let wn=document.createElement("div");wn.className="jka-labels",r.appendChild(wn);let ri=[],Un={side:{},tg:{},pos:{}},_i=6,Fn=90,tn=2*Math.sqrt(90),fa=500;function Xn(x){x.pts||(x.pts=[],x.parts.forEach(S=>st(S.mesh,L=>x.pts.push(L.clone()))));let E=Math.max(1,Math.floor(x.pts.length/48));return x.pts.filter((S,L)=>L%E===0)}function As(x){let E=x.reduce((q,ee)=>q.add(ee),new w).multiplyScalar(1/Math.max(1,x.length)),S=x[0],L=1e9;return x.forEach(q=>{let ee=q.distanceToSquared(E);ee<L&&(L=ee,S=q)}),S||E}function so(){wn.innerHTML="",u.innerHTML="",ri=A.map(x=>{let E=document.createElement("div");E.className="jka-label "+(x.cls||""),E.textContent=x.text,wn.appendChild(E);let S=Xn(x),L=As(S);return{L:x,k:x.text,el:E,S,aT:L,a:L.clone(),hid:!1,w:0,h:0}}),or=!0;try{document.fonts&&document.fonts.ready.then(()=>{ri.forEach(x=>{x.w=0}),pa=!0})}catch{}}let $i=160,as=100,ti=null,Oi=null,da=new Wi({color:16777215});function Yi(){as=Math.max(40,Math.round($i*Ji/Math.max(1,Pi))),(!Oi||Oi.height!==as)&&(Oi&&Oi.dispose(),Oi=new ps($i,as),ti=new Uint8Array($i*as*4));let x=M.filter(S=>S.mesh.visible&&S.mesh.material.opacity<.5);x.forEach(S=>{S.mesh.visible=!1});let E=p.background;p.overrideMaterial=da,a.setRenderTarget(Oi),a.setClearColor(0,0),a.clear(),a.render(p,Pe),a.readRenderTargetPixels(Oi,0,0,$i,as,ti),a.setRenderTarget(null),p.overrideMaterial=null,p.background=E,x.forEach(S=>{S.mesh.visible=!0})}let ro=(x,E)=>{if(!ti)return!1;let S=Math.floor(x/Pi*$i),L=as-1-Math.floor(E/Ji*as);return S>=0&&L>=0&&S<$i&&L<as&&ti[(L*$i+S)*4+3]>0};function _u(){let x=M.filter(E=>E.mesh.visible&&E.mesh.material.opacity>=.5).map(E=>E.mesh);ri.forEach(E=>{let S=new Set((E.L.parts||[]).map(X=>X.mesh)),L=[];E.S.forEach(X=>{let xe=X.clone().sub(Pe.position),G=xe.length();Je.set(Pe.position,xe.normalize()),Je.far=G-.002,Je.intersectObjects(x,!1).find($=>!S.has($.object))||L.push(X)});let q=!L.length,ee=E.aT;if(!E.L.parts||q)ee=E.aT;else{let X=As(L),xe=E.S.length>1?E.S[0].distanceTo(E.S[E.S.length-1]):.05;(!L.includes(E.aT)||E.aT.distanceTo(X)>.3*Math.max(.02,xe))&&(ee=X)}(q!==E.hid||ee!==E.aT)&&(E.hid=q,E.aT=ee,pa=!0)}),Yi(),pa=!0,ri.forEach(E=>{E.w=0})}function mc(x,E,S,L){let ee=0;for(let X=1;X<=40;X++){let xe=X/40;if(ro(x+(S-x)*xe,E+(L-E)*xe)){let G=ee,U=xe;for(let $=0;$<6;$++){let pe=(G+U)/2;ro(x+(S-x)*pe,E+(L-E)*pe)?U=pe:G=pe}return[x+(S-x)*U,E+(L-E)*U]}ee=xe}return[S,L]}let Td=[];for(let x=0;x<8;x++)Td.push(new w(x&1?yn.max.x:yn.min.x,x&2?yn.max.y:yn.min.y,x&4?yn.max.z:yn.min.z));let vu=0,pa=!0,ma=null,wd=0;function tx(){let x=performance.now();if(ma&&x-wd<1e3)return ma;let E=r.getBoundingClientRect(),S=Pi/Math.max(1,E.width),L=Ji/Math.max(1,E.height);return ma=[".jka-views",".jka-chips",".jka-zoom",".jka-peel",".jka-ct",".jka-refl"].map(q=>r.querySelector(q)).filter(Boolean).map(q=>{let ee=q.getBoundingClientRect();if(q.classList.contains("jka-views")){let xe=[...q.children].map(G=>G.getBoundingClientRect()).filter(G=>G.width);xe.length&&(ee={left:Math.min(...xe.map(G=>G.left)),top:Math.min(...xe.map(G=>G.top)),right:Math.max(...xe.map(G=>G.right)),bottom:Math.max(...xe.map(G=>G.bottom))})}let X={l:(ee.left-E.left)*S,t:(ee.top-E.top)*L,r:(ee.right-E.left)*S,b:(ee.bottom-E.top)*L};return X.top=(X.t+X.b)/2<Ji/2,X}).filter(q=>q.r>q.l),wd=x,ma}function Ad(x){let E=vu?Math.min(64,x-vu):16;vu=x;let S=Pi,L=Ji,q=!1,ee=1e9,X=-1e9,xe=1e9,G=-1e9;Td.forEach(k=>{let W=k.clone().project(Pe),F=(W.x+1)/2*S,me=(1-W.y)/2*L;ee=Math.min(ee,F),X=Math.max(X,F),xe=Math.min(xe,me),G=Math.max(G,me)});let U={cx:Math.max(60,Math.min(S-60,(ee+X)/2)),cy:L/2,rx:Math.min(S*.3,Math.max(40,(X-ee)/2))},$=[[],[]],pe=1-Math.exp(-E/1e3*9);ri.forEach(k=>{k.a.distanceToSquared(k.aT)>1e-10&&(k.a.lerp(k.aT,pe),q=!0);let W=k.a.clone().project(Pe);k.x=(W.x+1)/2*S,k.y=(1-W.y)/2*L,k.w||(k.w=k.el.offsetWidth,k.h=k.el.offsetHeight);let F=k.x-U.cx,me=Un.side[k.k];k.s=me!=null&&Math.abs(F)<U.rx*.4?me:F<0?0:1,k.c=Math.abs(F),k.on=!0,$[k.s].push(k)});let Ne=k=>k.reduce((W,F)=>W+F.h+_i,0)<=L-8,Ve=(k,W)=>{for(;!Ne($[k]);){let F=$[k].slice().sort((me,te)=>me.c-te.c)[0];if(!F)break;$[k].splice($[k].indexOf(F),1),$[W].push(F),Ne($[W])?F.s=W:($[W].pop(),F.on=!1)}};Ve(0,1),Ve(1,0);let We=1-Math.exp(-E/1e3*2.5);$.forEach((k,W)=>{k.forEach(te=>{Un.side[te.k]=W}),k.sort((te,le)=>te.y-le.y),k.forEach(te=>{let le=te.y-te.h/2,ze=Un.tg[te.k];!ze||ze.s!==W?ze=Un.tg[te.k]={y:le,x:null,s:W}:ze.y+=(le-ze.y)*We,Math.abs(le-ze.y)>.5&&(q=!0),te.ly=ze.y});let F;for(F=1;F<k.length;F++)k[F].ly=Math.max(k[F].ly,k[F-1].ly+k[F-1].h+_i);for(F=k.length-1;F>=0;F--)k[F].ly=Math.min(k[F].ly,(F===k.length-1?L-4:k[F+1].ly-_i)-k[F].h);for(F=0;F<k.length;F++)k[F].ly=Math.max(k[F].ly,F?k[F-1].ly+k[F-1].h+_i:4);k.forEach(te=>{let le=W?U.cx+U.rx+36:U.cx-U.rx-36-te.w,ze=Un.tg[te.k];ze.x=ze.x==null?le:ze.x+(le-ze.x)*We,Math.abs(le-ze.x)>.5&&(q=!0);let rt=W?Math.max(ze.x,le):Math.min(ze.x,le);te.lx=Math.max(4,Math.min(S-te.w-4,rt))});let me=tx();if(me.length){let te=(le,ze)=>le.lx<ze.r+6&&le.lx+le.w>ze.l-6&&le.ly<ze.b+4&&le.ly+le.h>ze.t-4;for(F=0;F<k.length;F++)me.forEach(le=>{le.top&&te(k[F],le)&&(k[F].ly=le.b+_i)});for(F=1;F<k.length;F++)k[F].ly=Math.max(k[F].ly,k[F-1].ly+k[F-1].h+_i);for(F=k.length-1;F>=0;F--)me.forEach(le=>{!le.top&&te(k[F],le)&&(k[F].ly=le.t-_i-k[F].h)});for(F=k.length-2;F>=0;F--)k[F].ly=Math.min(k[F].ly,k[F+1].ly-_i-k[F].h)}});let at="";return ri.forEach(k=>{if(!k.on){k.el.style.opacity=0;return}k.el.style.opacity="";let W=Un.pos[k.k];if(!W)W=Un.pos[k.k]={x:k.lx,y:k.ly,vx:0,vy:0};else{let ft=E/1e3,cn=Math.max(1,Math.ceil(ft/.008)),Xt=ft/cn;for(let Ct=0;Ct<cn;Ct++){W.vx+=(Fn*(k.lx-W.x)-tn*W.vx)*Xt,W.vy+=(Fn*(k.ly-W.y)-tn*W.vy)*Xt;let be=Math.max(fa,Math.hypot(k.lx-W.x,k.ly-W.y)*3),ne=Math.hypot(W.vx,W.vy);ne>be&&(W.vx*=be/ne,W.vy*=be/ne),W.x+=W.vx*Xt,W.y+=W.vy*Xt}Math.hypot(k.lx-W.x,k.ly-W.y)<.3&&Math.hypot(W.vx,W.vy)<4?(W.x=k.lx,W.y=k.ly,W.vx=W.vy=0):q=!0}k.el.style.transform="translate("+W.x.toFixed(1)+"px,"+W.y.toFixed(1)+"px)";let F=k.s===1,me=F?W.x-3:W.x+k.w+3,te=W.y+k.h/2,le=me+(F?-12:12),ze=me.toFixed(1)+","+te.toFixed(1)+" "+le.toFixed(1)+","+te.toFixed(1)+" ",rt=k.L.cls||"";if(k.hid){let ft=mc(le,te,k.x,k.y);at+='<polyline class="'+rt+'" points="'+ze+ft[0].toFixed(1)+","+ft[1].toFixed(1)+'"/><polyline class="'+rt+' behind" points="'+ft[0].toFixed(1)+","+ft[1].toFixed(1)+" "+k.x.toFixed(1)+","+k.y.toFixed(1)+'"/>'}else at+='<polyline class="'+rt+'" points="'+ze+k.x.toFixed(1)+","+k.y.toFixed(1)+'"/>'}),u.innerHTML=at,pa=!1,q}let rr=document.createElement("div");rr.className="jka-status",r.appendChild(rr);try{window.__jkaDbg={LM:Te,lmPts:Be,cam:Pe,el:a.domElement}}catch{}if(j==="find"&&!O){let x=null;a.domElement.addEventListener("pointerdown",E=>{x=[E.clientX,E.clientY]}),a.domElement.addEventListener("pointerup",E=>{if(!x||Math.hypot(E.clientX-x[0],E.clientY-x[1])>5)return;let S=a.domElement.getBoundingClientRect();Je.setFromCamera(new nt((E.clientX-S.left)/S.width*2-1,-(E.clientY-S.top)/S.height*2+1),Pe),Je.far=1/0;let L=Je.intersectObjects(M.filter(U=>U.mesh.visible&&U.mesh.material.opacity>.5).map(U=>U.mesh),!1),q=L[0];if(Te&&q){let U=L.find($=>v.some(pe=>pe.mesh===$.object));U&&U.distance-q.distance<.04&&(q=U)}let ee=Te&&Be.some(U=>Je.ray.distanceSqToPoint(U)<.009*.009);if(!q&&!ee)return;q||(q={object:v[0].mesh,point:Te.clone(),distance:0});let X=M.find(U=>U.mesh===q.object),xe=Te?v.includes(X)&&q.point.distanceTo(Te)<.014||Be.some(U=>Je.ray.distanceSqToPoint(U)<.009*.009):v.includes(X);(window.__jkaFind=window.__jkaFind||[]).push({name:X.name,ok:xe}),xe?(ke.forEach(U=>{U.visible=!0,U.material.color.setHex(gu)}),Te&&Ie?Ie.material.color.setHex(gu):v.forEach(U=>ot(U,gu,667672)),rr.className="jka-status ok",rr.textContent="\u2713 "+e.name):(ot(X,zE,4194304),rr.className="jka-status bad",rr.textContent=Te?"\u2717 Not quite \u2014 that is on the "+X.name:"\u2717 That is "+X.name,setTimeout(()=>ot(X,X.mesh.userData.base),1100)),zn=!0}),window.__jkaFind=[]}else if(j==="find"&&O){let x=window.__jkaFind||[];if(x.length){let E=x.some(S=>S.ok);rr.className="jka-status "+(E?"ok":"bad"),rr.textContent=E?"\u2713 Found it"+(x.length>1?" (try "+(x.findIndex(S=>S.ok)+1)+")":""):"\u2717 Clicked: "+x.map(S=>S.name).slice(-3).join(", ")}}let oo=document.createElement("div");oo.className="jka-refl",r.appendChild(oo);let ao=new Set,Rd=e.mode+"|"+e.name;function bu(){if(!ao.size){oo.style.display="none";return}oo.style.display="";let x=[...new Set([...ao].map(S=>S.name.replace(/ muscle$/,"")))].reverse();oo.innerHTML="<span>Reflected: "+x.slice(0,3).join(", ")+(x.length>3?" +"+(x.length-3):"")+"</span>";let E=document.createElement("button");E.className="jka-reflb",E.textContent="Restore",E.addEventListener("pointerdown",S=>S.stopPropagation()),E.onclick=S=>{S.stopPropagation(),ao.forEach(L=>{L.mesh.visible=Wn(L)}),ao.clear(),Cd(),bu(),or=!0,zn=!0},oo.appendChild(E)}function Cd(){O||(window.__jkaRefl={key:Rd,names:[...ao].map(x=>x.name)})}function gc(x){M.filter(E=>E.name===x.name).forEach(E=>{E.mesh.visible=!1,ao.add(E)}),Cd(),bu(),or=!0,zn=!0}let Mu=0,ga=[];function nx(x,E){let S=a.domElement.getBoundingClientRect(),L=(G,U)=>(Je.setFromCamera(new nt((x+G-S.left)/S.width*2-1,-(E+U-S.top)/S.height*2+1),Pe),Je.far=1/0,Je.intersectObjects(M.filter($=>$.mesh.visible&&$.mesh.material.opacity>.05).map($=>$.mesh),!1)),q=L(0,0),ee=null,X=G=>M.find(U=>U.mesh===G.object);if(j==="nerve")for(let[G,U]of[[0,0],[4,0],[-4,0],[0,4],[0,-4],[6,6],[-6,-6],[6,-6],[-6,6]]){let $=L(G,U).map(X).find(pe=>pe&&pe.layer==="nerve");if($){ee=$;break}}if(!ee&&q.length&&(ee=X(q[0])),!ee){ga.length=0,Pd();return}let xe=ga.findIndex(G=>G.name===ee.name);xe>=0?ga.splice(xe,1):ga.push(ee),Pd()}function Pd(){for(let x=A.length-1;x>=0;x--)A[x].cls&&A[x].cls.indexOf("pick")>=0&&A.splice(x,1);ga.forEach(x=>A.push({text:x.name.replace(/ muscle$/,""),parts:M.filter(E=>E.name===x.name),cls:"minor pick"})),so(),zn=!0}function Su(x,E){let S=a.domElement.getBoundingClientRect();Je.setFromCamera(new nt((x-S.left)/S.width*2-1,-(E-S.top)/S.height*2+1),Pe),Je.far=1/0;let L=Je.intersectObjects(M.filter(ee=>ee.mesh.visible&&ee.mesh.material.opacity>.05).map(ee=>ee.mesh),!1),q=j==="find"&&!O;for(let ee of L){let X=M.find(xe=>xe.mesh===ee.object);if(X&&(q||!v.includes(X))){gc(X);return}}}{let x=null,E=0,S=[0,0];a.domElement.addEventListener("pointerdown",L=>{x=L.pointerType==="touch"?null:[L.clientX,L.clientY,L.button]},!0),a.domElement.addEventListener("pointerup",L=>{if(!x)return;let q=Math.hypot(L.clientX-x[0],L.clientY-x[1])<5,ee=x[2];if(x=null,!q||ee!==0)return;let X=performance.now();if(X-E<380&&Math.hypot(L.clientX-S[0],L.clientY-S[1])<10){E=0,clearTimeout(Mu),Su(L.clientX,L.clientY);return}if(E=X,S=[L.clientX,L.clientY],O&&!(j==="find"&&!O)){let xe=L.clientX,G=L.clientY;clearTimeout(Mu),Mu=setTimeout(()=>nx(xe,G),390)}},!0)}function ix(){if(hc(e.reflect).forEach(S=>{let L=S.startsWith("~"),q=L?S.slice(1).trim():S;z(q).forEach(ee=>{v.includes(ee)||(L?(Ut(ee,.22),ee._a=.22,ee._glass=!0):gc(ee))})}),!v.length||j==="find"&&!O||j==="peel")return;let x=new Map,E=0;Vt.forEach(S=>{let L=S.clone().sub(Pe.position),q=L.length();Je.set(Pe.position,L.normalize()),Je.far=q-.002;let ee=Je.intersectObjects(M.filter(X=>X.mesh.visible&&!v.includes(X)&&!X._glass&&X.layer==="muscle").map(X=>X.mesh),!1)[0];if(E++,ee){let X=M.find(xe=>xe.mesh===ee.object);x.set(X,(x.get(X)||0)+1)}}),x.forEach((S,L)=>{S/Math.max(1,E)>.35&&gc(L)})}O&&window.__jkaRefl&&window.__jkaRefl.key===Rd?setTimeout(()=>window.__jkaRefl.names.forEach(x=>{let E=M.find(S=>S.name===x);E&&gc(E)}),0):setTimeout(ix,30),bu();{let x=0;try{x=+(localStorage.getItem("jka-tip-refl")||0)}catch{}if(x<1){try{localStorage.setItem("jka-tip-refl",String(x+1))}catch{}let E=document.createElement("div");E.className="jka-tip",E.textContent=window.matchMedia&&matchMedia("(hover: none)").matches?"Long-press a structure to reflect it":"Right-click or double-click a structure to reflect it",r.appendChild(E),setTimeout(()=>E.classList.add("on"),600),setTimeout(()=>{E.classList.remove("on"),setTimeout(()=>E.remove(),600)},6500)}}let Eu=document.createElement("div");Eu.className="jka-zoom"+(Ht?" jka-zoom-up":""),[["+",.75],["\u2212",1/.75]].forEach(([x,E])=>{let S=document.createElement("button");S.className="jka-zb",S.textContent=x,S.addEventListener("pointerdown",L=>L.stopPropagation()),S.addEventListener("click",L=>{L.stopPropagation(),Id(E)}),Eu.appendChild(S)});function Id(x){if(wi){wi.zoom(x);return}Br();let E=Pe.position.clone().sub(Le.target),S=E.length(),L=Math.max(an?.15:.04,Math.min(an?14:3,S*x));Re={p0:Pe.position.clone(),t0:Le.target.clone(),p1:Le.target.clone().addScaledVector(E,L/S),t1:Le.target.clone(),s:0,u1:Pe.up.clone()}}r.appendChild(Eu);let xa=document.createElement("div");xa.className="jka-chips";{[["bone","Bone"],["muscle","Muscle"],["ligament","Lig."],["nerve","Nerve"],["vessel","Artery"],["vein","Vein"]].forEach(([q,ee])=>{let X=document.createElement("button"),xe=()=>M.some(G=>G.layer===q&&G.mesh.visible);X.textContent=ee,X.dataset.l=q,X.className=xe()?"jka-b on":"jka-b",X.onclick=()=>{if(q==="ligament"){let U=xe(),$=M.some(Ve=>Ve.layer==="capsule"&&Ve.mesh.visible),pe=U?!$:!0,Ne=U&&!$;M.forEach(Ve=>{Wn(Ve)&&(Ve.layer==="ligament"&&(Ve.mesh.visible=pe),Ve.layer==="capsule"&&(Ve.mesh.visible=Ne))}),X.textContent=Ne?"Lig. + capsule":"Lig.",X.className=pe?"jka-b on":"jka-b",zn=!0;return}let G=!xe();M.forEach(U=>{U.layer===q&&Wn(U)&&(U.mesh.visible=G)}),X.className=G?"jka-b on":"jka-b",zn=!0},xa.appendChild(X)});let x=document.createElement("button");x.textContent="CT",x.dataset.l="ct",x.className="jka-b";let E=!1;try{E=localStorage.getItem("jka-ct")==="1"}catch{}x.onclick=()=>{xc(!Tu)},xa.appendChild(x),E&&setTimeout(()=>xc(!0),0);let S=document.createElement("button");S.textContent="X-ray",S.dataset.l="xray",S.className="jka-b";let L=!1;try{L=localStorage.getItem("jka-rad")==="1"}catch{}S.onclick=()=>wu(!an),xa.appendChild(S),Bi=!!(L||e.xray),Bi&&setTimeout(()=>wu(!0,!!e.xray),0)}let wi=null,Tu=!1,ya=null;function xc(x){x&&an&&wu(!1),Tu=x,r.classList.toggle("jka-ctmode",x),s.classList.remove("jka-ctpre"),r.querySelectorAll("button[data-l=ct]").forEach(D=>{D.className=x?"jka-b on":"jka-b"});try{localStorage.setItem("jka-ct",x?"1":"0")}catch{}if(!x){wi&&(wi.ro.disconnect(),wi.box.remove(),wi.onEsc&&document.removeEventListener("keydown",wi.onEsc,!0),wi.mini&&(ya&&(Pe.zoom=1,bt.copy(ya.pan),Et=ya.by,ya=null,et()),r.insertBefore(a.domElement,r.firstChild),wi.mini.remove(),Object.values(wi.marks||{}).forEach(D=>p.remove(D)),os()),wn.style.display="",u.style.display="",a.domElement.style.visibility="",wi=null),zn=!0;return}if(wi)return;let E={bone:"#ededed",muscle:"#8a8a8a",nerve:"#747474",vessel:"#c6c6c6",vein:"#a4a4a4",ligament:"#b9b4a2",capsule:"#9a968a",lung:"#2b2b2b",airway:"#070707",heart:"#868686",organ:"#8e8e8e"},S={capsule:.5,muscle:1,nerve:2,vessel:2,vein:2,ligament:2.5,bone:3},L=M.filter(D=>D.layer!=="capsule"||D.mesh.visible).sort((D,fe)=>(S[D.layer]||0)-(S[fe.layer]||0)).map(D=>{let fe=D.mesh.userData.coarse||D.mesh.geometry,Ae=fe.attributes.position,Oe=Ae.count,tt=new Float32Array(Oe*3),De=new w;for(let lt=0;lt<Oe;lt++)De.fromBufferAttribute(Ae,lt).applyMatrix4(D.mesh.matrixWorld),tt[lt*3]=De.x,tt[lt*3+1]=De.y,tt[lt*3+2]=De.z;return{p:D,W:tt,I:fe.index?fe.index.array:null,n:Oe,tgt:v.includes(D)}}).reduce((D,fe)=>{let Ae=fe.p.name+"|"+fe.tgt,Oe=D.map.get(Ae);if(Oe)Oe.items.push(fe),Oe.box=Oe.box.clone().union(fe.p.box);else{let tt={p:fe.p,tgt:fe.tgt,items:[fe],box:fe.p.box.clone()};D.map.set(Ae,tt),D.list.push(tt)}return D},{map:new Map,list:[]}).list;L.slice().forEach(D=>{let fe=D.items,Ae=new on(new w(-D.box.max.x,D.box.min.y,D.box.min.z),new w(-D.box.min.x,D.box.max.y,D.box.max.z));L.push({p:D.p,tgt:!1,mirror:!0,items:fe,box:Ae})});let q=e.ctPlanes||bd.planes;Sd(e.ctContext||bd.model).then(D=>{if(h)return;D.updateMatrixWorld(!0);let fe=new Set(M.map(Ae=>Ae.name));D.traverse(Ae=>{if(!Ae.isMesh||fe.has(String((Ae.userData||{}).n||Ae.name).replace(/\.[lr]$/,"")))return;let Oe=Ae.userData||{},tt=Ae.geometry,De=tt.attributes.position,lt=De.count,Ze=new Float32Array(lt*3),$e=new w;for(let ye=0;ye<lt;ye++)$e.fromBufferAttribute(De,ye).applyMatrix4(Ae.matrixWorld),Ze[ye*3]=$e.x,Ze[ye*3+1]=$e.y,Ze[ye*3+2]=$e.z;let gt={name:Oe.n||Ae.name,layer:Oe.l||"organ",box:new on().setFromObject(Ae)};L.push({p:gt,tgt:!1,context:!0,items:[{p:gt,W:Ze,I:tt.index?tt.index.array:null,n:lt}],box:gt.box})});try{te(),me.forEach(Ae=>{Ae.baseKey=null}),qn()}catch{}}).catch(()=>{});let X={axial:{n:[0,1,0],u:[1,0,0],v:[0,0,1],step:.003,name:"Axial"},coronal:{n:[0,0,1],u:[1,0,0],v:[0,1,0],step:.003,name:"Coronal"},sagittal:{n:[C?1:-1,0,0],u:[0,0,-1],v:[0,1,0],step:.003,name:"Sagittal"}},xe=null;function G(){let fe=document.createElement("canvas");fe.width=fe.height=256;let Ae=fe.getContext("2d"),Oe=[];for(let Ze=0;Oe.length<85&&Ze<6e3;Ze++){let $e=[Math.random()*256,Math.random()*256,.7+Math.random()*.8];Oe.every(([gt,ye])=>{let ut=Math.abs($e[0]-gt),de=Math.abs($e[1]-ye);return ut=Math.min(ut,256-ut),de=Math.min(de,256-de),ut*ut+de*de>15*15})&&Oe.push($e)}let tt=Ae.createImageData(256,256);for(let Ze=0;Ze<256;Ze++)for(let $e=0;$e<256;$e++){let gt=1e9,ye=1e9,ut=1;Oe.forEach(([we,mt,dt])=>{let Ot=Math.abs($e-we),xt=Math.abs(Ze-mt);Ot=Math.min(Ot,256-Ot),xt=Math.min(xt,256-xt);let Lt=Math.sqrt(Ot*Ot+xt*xt);Lt<gt?(ye=gt,gt=Lt,ut=dt):Lt<ye&&(ye=Lt)});let de=(ye-gt)/2,Ge=1.7*ut,Rt=Math.exp(-(de*de)/(2*Ge*Ge)),_n=Math.round(88+Rt*80+(Math.random()-.5)*12),sn=(Ze*256+$e)*4;tt.data[sn]=tt.data[sn+1]=tt.data[sn+2]=_n,tt.data[sn+3]=255}Ae.putImageData(tt,0,0);let De=document.createElement("canvas");De.width=De.height=256;let lt=De.getContext("2d");lt.filter="blur(0.8px)";for(let Ze of[-256,0,256])for(let $e of[-256,0,256])lt.drawImage(fe,Ze,$e);return De}let U=document.createElement("div");U.className="jka-ct";let $=document.createElement("div");$.className="jka-ct-h",$.innerHTML="CT <span>(simulated) \xB7 scroll a pane to move its slice \xB7 click to aim the others</span>",U.appendChild($),r.appendChild(U);let pe=document.createElement("button");pe.className="jka-ctoff",pe.textContent="Disable CT",pe.addEventListener("pointerdown",D=>D.stopPropagation()),pe.onclick=D=>{D.stopPropagation(),xc(!1)},U.appendChild(pe),wn.style.display="none",u.style.display="none";let Ne=null;O?(Ne=document.createElement("div"),Ne.className="jka-mini",r.appendChild(Ne),Ne.appendChild(a.domElement),os(),zn=!0,ya={pan:bt.clone(),by:Et},bt.set(0,0),Et=0,Pe.zoom=.4,et()):a.domElement.style.visibility="hidden";let Ve=Z.isEmpty()?Dt:Z,We=Ve.getCenter(new w),at=Dt.clone();at.min.y=Math.max(at.min.y,Y[0]),at.max.y=Math.min(at.max.y,Y[1]);let k=Math.min(2,window.devicePixelRatio||1),W=D=>new w(...D),F={axial:"#ffd36b",coronal:"#7fd8ff",sagittal:"#ff8f8f"},me=["axial","coronal","sagittal"].map(D=>{let fe=document.createElement("div");fe.className="jka-ctp jka-ctp-"+D;let Ae=document.createElement("canvas");fe.appendChild(Ae);let Oe=document.createElement("button");Oe.className="jka-ctp-t",Oe.innerHTML=X[D].name+" <span>\u25BE</span>",Oe.style.color=F[D],fe.appendChild(Oe),Oe.addEventListener("pointerdown",Ze=>Ze.stopPropagation()),Oe.addEventListener("click",Ze=>{Ze.stopPropagation(),pt&&ct(Oe)});let tt=document.createElement("button");tt.className="jka-ctp-plus",tt.innerHTML='<svg viewBox="0 0 14 14" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11 L11 3"/><path d="M6.5 3 H11 V7.5"/><path d="M7.5 11 H3 V6.5"/></svg>',tt.addEventListener("pointerdown",Ze=>Ze.stopPropagation()),tt.addEventListener("click",Ze=>{Ze.stopPropagation(),nn(D,!0)}),tt.style.color=F[D],fe.appendChild(tt),U.appendChild(fe);let De=X[D],lt={k:D,el:fe,cv:Ae,g2:Ae.getContext("2d"),n:W(De.n),u:W(De.u),v:W(De.v),d:W(De.n).dot(We),half:D==="axial"?.1:.16,W:300,H:300,cu:0,cvv:0};return lt.cu=lt.u.dot(We),lt.cvv=lt.v.dot(We),lt});function te(){let D=me.find(lt=>lt.k==="coronal");if(!D||D.manual)return;let fe=1e9,Ae=-1e9,Oe=1e9,tt=-1e9;if(L.forEach(lt=>{let Ze=lt.box;for(let $e=0;$e<8;$e++){let gt=new w($e&1?Ze.max.x:Ze.min.x,$e&2?Ze.max.y:Ze.min.y,$e&4?Ze.max.z:Ze.min.z),ye=gt.dot(D.u),ut=gt.dot(D.v);fe=Math.min(fe,ye),Ae=Math.max(Ae,ye),Oe=Math.min(Oe,ut),tt=Math.max(tt,ut)}}),Ae<=fe)return;let De=(D.cv.height||D.H||1)/(D.cv.width||D.W||1);D.half=Math.max((tt-Oe)/2,(Ae-fe)/2*De)*1.04,D.cu=(fe+Ae)/2,D.cvv=(Oe+tt)/2,D.baseKey=null}te();let le={};Ne&&me.forEach(D=>{let fe=new Sn(new Jr(.34,.34),new Wi({color:F[D.k],transparent:!0,opacity:.25,side:Mi,depthWrite:!1}));fe.quaternion.setFromUnitVectors(new w(0,0,1),D.n),p.add(fe),le[D.k]=fe});function ze(D){let fe=1e9,Ae=-1e9;for(let Oe=0;Oe<8;Oe++){let tt=D.dot(new w(Oe&1?at.max.x:at.min.x,Oe&2?at.max.y:at.min.y,Oe&4?at.max.z:at.min.z));fe=Math.min(fe,tt),Ae=Math.max(Ae,tt)}return[fe,Ae]}function rt(){me.forEach(D=>{let fe=D.el.getBoundingClientRect();D.W=fe.width||300,D.H=fe.height||300,D.cv.width=Math.round(D.W*k),D.cv.height=Math.round(D.H*k)})}function ft(D){let{n:fe,u:Ae,v:Oe,g2:tt,cv:De}=D,[lt,Ze]=ze(fe);D.d=Math.max(lt,Math.min(Ze,D.d));let $e=D.H/(2*D.half)*k,gt=D.d,ye=Ge=>De.width/2+(Ge-D.cu)*$e,ut=Ge=>De.height/2-(Ge-D.cvv)*$e;D.toWorld=(Ge,Rt)=>We.clone().addScaledVector(Ae,D.cu+(Ge*k-De.width/2)/$e-Ae.dot(We)).addScaledVector(Oe,D.cvv-(Rt*k-De.height/2)/$e-Oe.dot(We)).addScaledVector(fe,gt-fe.dot(We));let de=gt.toFixed(5)+"|"+D.half+"|"+De.width+"x"+De.height+"|"+qe+"|"+D.cu.toFixed(5)+","+D.cvv.toFixed(5);if(D.baseKey!==de&&(D.baseKey=de,Se(D,$e,gt,ye,ut),D.k==="axial"&&!D.manual&&!D.fitted&&D.shapes&&D.shapes.length&&!D.fitting)){let Ge=1e9,Rt=-1e9,_n=1e9,sn=-1e9;if(D.shapes.forEach(we=>we.loops.forEach(mt=>mt.forEach(dt=>{Ge=Math.min(Ge,dt[0]),Rt=Math.max(Rt,dt[0]),_n=Math.min(_n,dt[1]),sn=Math.max(sn,dt[1])}))),Rt>Ge){let we=(Rt-Ge)/$e+.03,mt=(sn-_n)/$e+.03,dt=D.cu+((Ge+Rt)/2-De.width/2)/$e,Ot=D.cvv-((_n+sn)/2-De.height/2)/$e,xt=Math.max(mt/2,we/2*De.height/De.width)*1.08;if(Math.abs(xt-D.half)/D.half>.04||Math.abs(dt-D.cu)>.003||Math.abs(Ot-D.cvv)>.003){D.half=xt,D.cu=dt,D.cvv=Ot,D.fitting=!0,ft(D),D.fitting=!1,D.fitted=!0;return}D.fitted=!0}}tt.setTransform(1,0,0,1,0,0),tt.drawImage(D.base,0,0),_t(D,ye,ut),le[D.k]&&(le[D.k].position.copy(We.clone().addScaledVector(fe,gt-fe.dot(We))),zn=!0)}let cn=.0042,Xt=26e-5,Ct=(D,fe,Ae)=>{let Oe=D*374761393+fe*668265263+Ae*1274126177|0;return Oe=Math.imul(Oe^Oe>>>13,1274126177),((Oe^Oe>>>16)>>>0)/4294967296};function be(D,fe,Ae,Oe){let tt=Math.floor(D),De=Math.floor(fe),lt=Math.floor(Ae),Ze=D-tt,$e=fe-De,gt=Ae-lt,ye=Ze*Ze*(3-2*Ze),ut=$e*$e*(3-2*$e),de=gt*gt*(3-2*gt),Ge=(_n,sn,we)=>Ct(_n+Oe*101,sn+Oe*37,we+Oe*59),Rt=(_n,sn,we)=>_n+(sn-_n)*we;return Rt(Rt(Rt(Ge(tt,De,lt),Ge(tt+1,De,lt),ye),Rt(Ge(tt,De+1,lt),Ge(tt+1,De+1,lt),ye),ut),Rt(Rt(Ge(tt,De,lt+1),Ge(tt+1,De,lt+1),ye),Rt(Ge(tt,De+1,lt+1),Ge(tt+1,De+1,lt+1),ye),ut),de)}function ne(D,fe,Ae){let Oe=1/(cn*1.4),tt=cn*.45,De=D+(be(D*Oe,fe*Oe,Ae*Oe,1)-.5)*2*tt,lt=fe+(be(D*Oe,fe*Oe,Ae*Oe,2)-.5)*2*tt,Ze=Ae+(be(D*Oe,fe*Oe,Ae*Oe,3)-.5)*2*tt,$e=Math.floor(De/cn),gt=Math.floor(lt/cn),ye=Math.floor(Ze/cn),ut=1e9,de=1e9;for(let mt=-1;mt<=1;mt++)for(let dt=-1;dt<=1;dt++)for(let Ot=-1;Ot<=1;Ot++){let xt=$e+mt,Lt=gt+dt,dn=ye+Ot,hi=(xt+Ct(xt,Lt,dn))*cn,Ai=(Lt+Ct(Lt,dn,xt+7))*cn,Pt=(dn+Ct(dn,xt,Lt+13))*cn,un=(hi-De)*(hi-De)+(Ai-lt)*(Ai-lt)+(Pt-Ze)*(Pt-Ze);un<ut?(de=ut,ut=un):un<de&&(de=un)}let Ge=(Math.sqrt(de)-Math.sqrt(ut))/2,Rt=1/(cn*2.2),_n=be(D*Rt,fe*Rt,Ae*Rt,4),sn=Xt*(.45+1.25*_n),we=.55+.45*Math.min(1,be(D*Rt*1.7,fe*Rt*1.7,Ae*Rt*1.7,5)*1.8);return Math.exp(-(Ge*Ge)/(2*sn*sn))*we}function ue(D,fe,Ae,Oe,tt,De){let Ze=Math.ceil(tt*.5),$e=Math.ceil(De*.5),gt=document.createElement("canvas");gt.width=Ze,gt.height=$e;let ye=gt.getContext("2d");ye.setTransform(.5,0,0,.5,0,0),ye.fillStyle="#fff",Oe.forEach(mt=>{mt.S.p.layer!=="bone"||!mt.loops.length||/^(Hip bone|Sacrum|Coccyx|Vertebra)/.test(mt.S.p.name)||(ye.beginPath(),mt.loops.forEach(dt=>{ye.moveTo(dt[0][0],dt[0][1]),dt.forEach(Ot=>ye.lineTo(Ot[0],Ot[1])),ye.closePath()}),ye.fill("nonzero"))});let ut=ye.getImageData(0,0,Ze,$e),de=ye.createImageData(Ze,$e),{u:Ge,v:Rt,n:_n}=D;for(let mt=0;mt<$e;mt++)for(let dt=0;dt<Ze;dt++){let Ot=(mt*Ze+dt)*4;if(!ut.data[Ot+3])continue;let xt=D.cu+(dt/.5-tt/2)/fe,Lt=D.cvv-(mt/.5-De/2)/fe,dn=Ge.x*xt+Rt.x*Lt+_n.x*Ae,hi=Ge.y*xt+Rt.y*Lt+_n.y*Ae,Ai=Ge.z*xt+Rt.z*Lt+_n.z*Ae,Pt=Math.round(86+ne(dn,hi,Ai)*84+(Math.random()-.5)*10);de.data[Ot]=de.data[Ot+1]=de.data[Ot+2]=Pt,de.data[Ot+3]=255}ye.setTransform(1,0,0,1,0,0),ye.putImageData(de,0,0);let sn=document.createElement("canvas");sn.width=tt,sn.height=De;let we=sn.getContext("2d");return we.imageSmoothingEnabled=!0,we.filter="blur(0.6px)",we.drawImage(gt,0,0,tt,De),sn}let ge=new Map,ve=12e3;function se(D,fe){if(D.ix=D.ix||[],D.ix[fe])return D.ix[fe];let Ae=D.W,Oe=D.I,tt=Oe?Oe.length/3:D.n/3,De=.002,lt=1e9,Ze=-1e9;for(let Ge=fe;Ge<Ae.length;Ge+=3)lt=Math.min(lt,Ae[Ge]),Ze=Math.max(Ze,Ae[Ge]);let $e=Math.max(1,Math.ceil((Ze-lt)/De)+1),gt=new Int32Array($e+1),ye=new Int32Array(tt*2);for(let Ge=0;Ge<tt;Ge++){let Rt=Oe?Oe[Ge*3]:Ge*3,_n=Oe?Oe[Ge*3+1]:Ge*3+1,sn=Oe?Oe[Ge*3+2]:Ge*3+2,we=Ae[Rt*3+fe],mt=Ae[_n*3+fe],dt=Ae[sn*3+fe],Ot=Math.floor((Math.min(we,mt,dt)-lt)/De),xt=Math.floor((Math.max(we,mt,dt)-lt)/De);ye[Ge*2]=Ot,ye[Ge*2+1]=xt;for(let Lt=Ot;Lt<=xt;Lt++)gt[Lt+1]++}for(let Ge=0;Ge<$e;Ge++)gt[Ge+1]+=gt[Ge];let ut=new Int32Array(gt[$e]),de=gt.slice(0,$e);for(let Ge=0;Ge<tt;Ge++)for(let Rt=ye[Ge*2];Rt<=ye[Ge*2+1];Rt++)ut[de[Rt]++]=Ge;return D.ix[fe]={lo:lt,B:De,nb:$e,start:gt,list:ut}}let J=0;function Me(D,fe,Ae){D.id==null&&(D.id=++J);let Oe=D.id+"|"+fe+"|"+Ae.toFixed(5),tt=ge.get(Oe);if(tt)return ge.delete(Oe),ge.set(Oe,tt),tt;let De=se(D,fe),lt=[],Ze=Math.floor((Ae-De.lo)/De.B);if(Ze>=0&&Ze<De.nb){let gt=D.W,ye=D.I;for(let ut=De.start[Ze];ut<De.start[Ze+1];ut++){let de=De.list[ut],Ge=ye?ye[de*3]:de*3,Rt=ye?ye[de*3+1]:de*3+1,_n=ye?ye[de*3+2]:de*3+2,sn=gt[Ge*3+fe]-Ae,we=gt[Rt*3+fe]-Ae,mt=gt[_n*3+fe]-Ae,dt=[],Ot=(xt,Lt,dn,hi)=>{let Ai=dn/(dn-hi);dt.push(gt[xt*3]+(gt[Lt*3]-gt[xt*3])*Ai,gt[xt*3+1]+(gt[Lt*3+1]-gt[xt*3+1])*Ai,gt[xt*3+2]+(gt[Lt*3+2]-gt[xt*3+2])*Ai)};if(sn>0!=we>0&&Ot(Ge,Rt,sn,we),we>0!=mt>0&&Ot(Rt,_n,we,mt),mt>0!=sn>0&&Ot(_n,Ge,mt,sn),dt.length===6)for(let xt=0;xt<6;xt++)lt.push(dt[xt])}}let $e=new Float32Array(lt);return ge.set(Oe,$e),ge.size>ve&&ge.delete(ge.keys().next().value),$e}function Se(D,fe,Ae,Oe,tt){let De=performance.now(),lt=!D.forceFull&&D.lastSlice&&De-D.lastSlice<200;D.forceFull=!1,clearTimeout(D.fullT);let Ze=fe/1e3>1/.8;lt&&(D.fullT=setTimeout(()=>{D.forceFull=!0,D.baseKey=null,ft(D)},180));let{n:$e,u:gt,v:ye}=D;D.base||(D.base=document.createElement("canvas"));let ut=D.base;ut.width=D.cv.width,ut.height=D.cv.height;let de=ut.getContext("2d");de.setTransform(1,0,0,1,0,0),de.fillStyle="#0a0a0a",de.fillRect(0,0,ut.width,ut.height);let Ge=[],Rt=null,_n=null;L.forEach(Pt=>{if(Pt.context&&!q.includes(D.k))return;let un=Pt.box,rn=1e9,Pn=-1e9;for(let en=0;en<8;en++){let Nt=$e.x*(en&1?un.max.x:un.min.x)+$e.y*(en&2?un.max.y:un.min.y)+$e.z*(en&4?un.max.z:un.min.z);rn=Math.min(rn,Nt),Pn=Math.max(Pn,Nt)}if(rn>Ae||Pn<Ae)return;let Rn=[],jn=Pt.mirror?-1:1,oi=Math.abs($e.x)>.5?0:Math.abs($e.y)>.5?1:2,Yn=Ae*(oi===0?$e.x:oi===1?$e.y:$e.z),Qn=(en,Nt,In)=>[Oe(en*gt.x+Nt*gt.y+In*gt.z),tt(en*ye.x+Nt*ye.y+In*ye.z)];if(Pt.items.forEach(en=>{let Nt=Me(en,oi,oi===0?Yn*jn:Yn);for(let In=0;In<Nt.length;In+=6)Rn.push([Qn(Nt[In]*jn,Nt[In+1],Nt[In+2]),Qn(Nt[In+3]*jn,Nt[In+4],Nt[In+5])])}),!Rn.length)return;let Jt=en=>Math.round(en[0]*4)+","+Math.round(en[1]*4),pn=new Map;Rn.forEach((en,Nt)=>[0,1].forEach(In=>{let _s=Jt(en[In]);(pn.get(_s)||pn.set(_s,[]).get(_s)).push([Nt,In])}));let qt=new Uint8Array(Rn.length),mn=[];for(let en=0;en<Rn.length;en++){if(qt[en])continue;qt[en]=1;let Nt=[Rn[en][0],Rn[en][1]],In=Rn[en][1];for(let _s=0;_s<Rn.length;_s++){let Vs=(pn.get(Jt(In))||[]).find(([Ws])=>!qt[Ws]);if(!Vs)break;qt[Vs[0]]=1;let Gs=Rn[Vs[0]][1-Vs[1]];Nt.push(Gs),In=Gs}Nt.length>1&&mn.push(Nt)}let Hn=8*k,ni=(en,Nt)=>Math.hypot(en[0]-Nt[0],en[1]-Nt[1]),hs=en=>ni(en[0],en[en.length-1])<=Hn,Ii=mn.filter(en=>!hs(en)),vi=mn.filter(hs);for(let en=0;Ii.length&&en<400;en++){let Nt=Ii[0],In=null,_s=Hn*3;ni(Nt[0],Nt[Nt.length-1])<_s&&Nt.length>2&&(_s=ni(Nt[0],Nt[Nt.length-1]),In={self:!0});for(let Ws=1;Ws<Ii.length;Ws++){let vs=Ii[Ws];[[Nt[Nt.length-1],vs[0],0],[Nt[Nt.length-1],vs[vs.length-1],1],[Nt[0],vs[vs.length-1],2],[Nt[0],vs[0],3]].forEach(([dx,px,mx])=>{let jd=ni(dx,px);jd<_s&&(_s=jd,In={j:Ws,m:mx})})}if(!In){let Ws=0;for(let vs=1;vs<Nt.length;vs++)Ws+=ni(Nt[vs-1],Nt[vs]);Ii.shift(),Nt.length>4&&ni(Nt[0],Nt[Nt.length-1])<.18*Ws?vi.push(Nt):(Rt||(Rt=[])).push(Nt);continue}if(In.self){vi.push(Ii.shift());continue}let Vs=Ii[In.j],Gs;In.m===0?Gs=Nt.concat(Vs):In.m===1?Gs=Nt.concat(Vs.slice().reverse()):In.m===2?Gs=Vs.concat(Nt):Gs=Vs.slice().reverse().concat(Nt),Ii.splice(In.j,1),Ii[0]=Gs,hs(Gs)&&vi.push(Ii.shift())}Ge.push({S:Pt,loops:vi.filter(en=>en.length>2),lines:Rt||[]}),Rt=null});let sn=Pt=>{de.beginPath(),Pt.forEach(un=>{de.moveTo(un[0][0],un[0][1]);for(let rn=1;rn<un.length;rn++)de.lineTo(un[rn][0],un[rn][1]);de.closePath()})};de.lineJoin="round";let we="#3a3a3a",mt="#8f8f8f",dt=.012*fe,Ot=Math.max(1*k,7e-4*fe),xt=Ge.filter(Pt=>Pt.S.p.layer!=="capsule"&&Pt.S.p.layer!=="lung"&&Pt.S.p.layer!=="airway"),Lt=[];if(D.k==="axial"){let Pt=xt.map(Jt=>{let pn=1e9,qt=1e9,mn=-1e9,Hn=-1e9;return Jt.loops.forEach(ni=>ni.forEach(hs=>{pn=Math.min(pn,hs[0]),qt=Math.min(qt,hs[1]),mn=Math.max(mn,hs[0]),Hn=Math.max(Hn,hs[1])})),[pn,qt,mn,Hn]}),un=/latissimus|serratus|pectoralis|trapezius|rhomboid|levator scapulae|subclavius|intercostal|thoraco|lateral thoracic|long thoracic|vertebra|sacrum|coccyx|psoas|quadratus lumborum|iliac artery|iliac vein/i,rn=Jt=>Jt.S.context||un.test(Jt.S.p.name),Pn=Jt=>!!Jt.S.mirror,Rn=xt.map((Jt,pn)=>pn),jn=Jt=>Rn[Jt]===Jt?Jt:Rn[Jt]=jn(Rn[Jt]),oi=.006*fe;for(let Jt=0;Jt<Pt.length;Jt++)for(let pn=Jt+1;pn<Pt.length;pn++){let qt=Pt[Jt],mn=Pt[pn];qt[0]>1e8||mn[0]>1e8||Pn(xt[Jt])!==Pn(xt[pn])||rn(xt[Jt])||rn(xt[pn])||qt[0]-oi<mn[2]&&mn[0]-oi<qt[2]&&qt[1]-oi<mn[3]&&mn[1]-oi<qt[3]&&(Rn[jn(Jt)]=jn(pn))}let Yn=new Map;xt.forEach((Jt,pn)=>{if(Pt[pn][0]>1e8||rn(Jt))return;let qt=jn(pn);(Yn.get(qt)||Yn.set(qt,[]).get(qt)).push(Jt)});let Qn=(Jt,pn,qt)=>(pn[0]-Jt[0])*(qt[1]-Jt[1])-(pn[1]-Jt[1])*(qt[0]-Jt[0]);Yn.forEach(Jt=>{let pn=[];if(Jt.forEach(Hn=>Hn.loops.forEach(ni=>ni.forEach(hs=>pn.push(hs)))),pn.length<3)return;pn.sort((Hn,ni)=>Hn[0]-ni[0]||Hn[1]-ni[1]);let qt=[],mn=[];pn.forEach(Hn=>{for(;qt.length>1&&Qn(qt[qt.length-2],qt[qt.length-1],Hn)<=0;)qt.pop();qt.push(Hn)}),pn.slice().reverse().forEach(Hn=>{for(;mn.length>1&&Qn(mn[mn.length-2],mn[mn.length-1],Hn)<=0;)mn.pop();mn.push(Hn)}),Lt.push(qt.slice(0,-1).concat(mn.slice(0,-1)))})}let dn=(Pt,un)=>{de.strokeStyle=un,de.fillStyle=un,de.lineWidth=Pt,Lt.forEach(rn=>{de.beginPath(),rn.forEach((Pn,Rn)=>Rn?de.lineTo(Pn[0],Pn[1]):de.moveTo(Pn[0],Pn[1])),de.closePath(),de.fill(),de.stroke()}),xt.forEach(rn=>{sn(rn.loops),de.fill("evenodd"),de.stroke(),rn.lines.length&&(de.beginPath(),rn.lines.forEach(Pn=>{de.moveTo(Pn[0][0],Pn[0][1]),Pn.forEach(Rn=>de.lineTo(Rn[0],Rn[1]))}),de.stroke())})};de.lineJoin="round",de.lineCap="round",dn(2*(dt+Ot),mt),dn(2*dt,we);let hi=Pt=>{if(sn(Pt.loops),Pt.S.p.layer==="bone"&&!Pt.S.tgt){let un=Pt.S.p.box,rn=un.min.y,Pn=un.max.y,Rn=Math.max(1e-4,Pn-rn),jn=/^(Femur|Tibia|Fibula)$/.test(Pt.S.p.name),oi=Ii=>{if(!jn)return 0;let vi=(Ii-rn)/Rn,en=Math.min(1,Math.max(0,(vi-.16)/.12)),Nt=Math.min(1,Math.max(0,(.84-vi)/.12));return Math.min(en,Nt)},Yn=1e9,Qn=1e9,Jt=-1e9,pn=-1e9;Pt.loops.forEach(Ii=>Ii.forEach(vi=>{vi[0]<Yn&&(Yn=vi[0]),vi[0]>Jt&&(Jt=vi[0]),vi[1]<Qn&&(Qn=vi[1]),vi[1]>pn&&(pn=vi[1])})),Yn=Math.max(0,Math.floor(Yn)-2),Qn=Math.max(0,Math.floor(Qn)-2);let qt=Math.min(ut.width,Math.ceil(Jt)+2)-Yn,mn=Math.min(ut.height,Math.ceil(pn)+2)-Qn;if(qt<=0||mn<=0)return;de.save(),de.clip("nonzero"),/^(Hip bone|Sacrum|Coccyx)|vertebra|atlas|axis \(c2|\brib\b|stern|manubrium|xiphoid|costal/i.test(Pt.S.p.name)?(de.fillStyle="#c9c9c9",de.fillRect(Yn,Qn,qt,mn)):lt||!Ze?(de.fillStyle="#b4b4b4",de.fillRect(Yn,Qn,qt,mn)):(_n||(_n=ue(D,fe,Ae,Ge,ut.width,ut.height)),de.drawImage(_n,Yn,Qn,qt,mn,Yn,Qn,qt,mn));let Hn="rgba(58,58,58,",ni=ye.y;if(jn&&Math.abs(ni)>.5){let Ii=tt(rn*ni),vi=tt(Pn*ni),en=de.createLinearGradient(0,Ii,0,vi);[0,.16,.28,.5,.72,.84,1].forEach(Nt=>en.addColorStop(Nt,Hn+oi(rn+Nt*Rn).toFixed(2)+")")),de.fillStyle=en,de.fillRect(Yn,Qn,qt,mn)}else jn&&(de.fillStyle=Hn+oi(Ae).toFixed(2)+")",de.fillRect(Yn,Qn,qt,mn));let hs=Math.abs(ni)>.5?.5:oi(Ae);sn(Pt.loops),de.strokeStyle="#f4f4f4",de.lineWidth=Math.max(4*k,(.005+.009*hs)*fe),de.stroke(),de.restore();return}de.fillStyle=E[Pt.S.p.layer]||"#888",de.fill("evenodd"),Pt.S.tgt&&(de.fillStyle="rgba(95,200,255,.58)",de.fill("evenodd")),de.strokeStyle="rgba(40,40,40,.55)",de.lineWidth=.8*k,de.stroke()};Ge.forEach(hi),D.shapes=Ge,D.lastSlice=performance.now();let Ai=[];de.font="600 "+10.5*k+"px -apple-system, system-ui, sans-serif",de.textAlign="center",de.textBaseline="middle",Ge.filter(Pt=>Pt.S.p.name===qe&&Pt.loops.length).forEach(Pt=>{let un=0,rn=0,Pn=0,Rn=0;Pt.loops.forEach(qt=>{for(let mn=0;mn<qt.length;mn++){let Hn=qt[mn],ni=qt[(mn+1)%qt.length];Rn+=Hn[0]*ni[1]-ni[0]*Hn[1],un+=Hn[0],rn+=Hn[1],Pn++}});let jn=un/Pn,oi=rn/Pn,Yn=Pt.S.p.name.replace(/ muscle$/,""),Qn=de.measureText(Yn).width+6*k,Jt=14*k,pn=oi-16*k;for(let qt=0;qt<6&&Ai.some(mn=>Math.abs(mn[0]-jn)<(mn[2]+Qn)/2&&Math.abs(mn[1]-pn)<Jt);qt++)pn-=Jt;Ai.push([jn,pn,Qn]),de.strokeStyle="rgba(255,224,150,.6)",de.lineWidth=1*k,de.beginPath(),de.moveTo(jn,oi),de.lineTo(jn,pn+Jt/2-2*k),de.stroke(),de.fillStyle="rgba(0,0,0,.6)",de.fillRect(jn-Qn/2,pn-Jt/2,Qn,Jt),de.fillStyle="#ffe196",de.fillText(Yn,jn,pn+.5*k)}),de.textAlign="start",de.textBaseline="alphabetic",Ge.forEach(Pt=>{Pt.lines.length&&(de.beginPath(),Pt.lines.forEach(un=>{de.moveTo(un[0][0],un[0][1]);for(let rn=1;rn<un.length;rn++)de.lineTo(un[rn][0],un[rn][1])}),de.strokeStyle=Pt.S.p.layer==="bone"?"#f2f2f2":E[Pt.S.p.layer]||"#888",de.lineWidth=(Pt.S.p.layer==="bone"?2.5:1.5)*k,de.stroke())})}function _t(D,fe,Ae){let{u:Oe,v:tt,g2:De,cv:lt}=D;De.setLineDash([4*k,4*k]),De.lineWidth=1*k,me.forEach(Ze=>{if(Ze===D)return;De.strokeStyle=F[Ze.k],De.globalAlpha=.7,De.beginPath();let $e=Ze.n.dot(Oe),gt=Ze.n.dot(tt);if(Math.abs($e)>.5){let ye=fe(Ze.d/$e);De.moveTo(ye,0),De.lineTo(ye,lt.height)}else if(Math.abs(gt)>.5){let ye=Ae(Ze.d/gt);De.moveTo(0,ye),De.lineTo(lt.width,ye)}De.stroke(),De.globalAlpha=1}),De.setLineDash([])}let qe=null,pt=null,it=document.createElement("div");it.className="jka-ctmenu",it.style.display="none",U.appendChild(it);let ln=window.matchMedia&&(matchMedia("(hover: none)").matches||matchMedia("(max-width: 720px)").matches);[["axial","Axial"],["coronal","Coronal"],["sagittal","Sagittal"]].concat(ln?[]:[[null,"All three"]]).forEach(([D,fe])=>{let Ae=document.createElement("button");Ae.className="jka-ctmi",Ae.textContent=fe,Ae.dataset.k=D||"",Ae.addEventListener("pointerdown",Oe=>Oe.stopPropagation()),Ae.addEventListener("click",Oe=>{Oe.stopPropagation(),it.style.display="none",nn(D,!0)}),it.appendChild(Ae)});function ct(D){if(it.style.display!=="none"){it.style.display="none";return}let fe=U.getBoundingClientRect(),Ae=D.getBoundingClientRect();it.style.display="",it.style.top=Ae.bottom-fe.top+4+"px",it.style.left="auto",it.style.right="8px",it.querySelectorAll("button").forEach(Oe=>Oe.classList.toggle("on",(Oe.dataset.k||null)===pt))}U.addEventListener("pointerdown",()=>{it.style.display="none"});function nn(D,fe){pt=fe?D:pt===D?null:D,U.classList.toggle("jka-ct-solo",!!pt),me.forEach(Ae=>Ae.el.classList.toggle("jka-on",Ae.k===pt)),requestAnimationFrame(()=>{rt(),me.forEach(Ae=>{Ae.baseKey=null}),qn()})}let An=D=>{D.key==="Escape"&&pt&&wi&&(D.preventDefault(),D.stopPropagation(),nn(pt))};document.addEventListener("keydown",An,!0);let qn=()=>me.forEach(ft);try{window.__jkaCT={panes:me,drawPane:ft,src:L,slice:Se}}catch{}me.forEach(D=>{D.cv.addEventListener("wheel",ye=>{if(ye.preventDefault(),ye.stopPropagation(),ye.ctrlKey){D.manual=!0,D.half=Math.max(.03,Math.min(1,D.half*Math.exp(ye.deltaY*.01))),ft(D);return}D.d-=Math.sign(ye.deltaY)*.003,qn()},{passive:!1});let fe=!1,Ae=null,Oe=0,tt=ye=>{let ut=D.cv.getBoundingClientRect();Ae=D.toWorld(ye.clientX-ut.left,ye.clientY-ut.top),Oe||(Oe=requestAnimationFrame(()=>{if(Oe=0,!Ae)return;let de=Ae;Ae=null,me.forEach(Ge=>{Ge!==D&&(Ge.d=Ge.n.dot(de))}),qn()}))},De=null,lt=null;D.cv.addEventListener("contextmenu",ye=>ye.preventDefault()),D.cv.addEventListener("pointerdown",ye=>{if(ye.button===2||ye.button===1||ye.button===0&&ye.shiftKey){ye.preventDefault(),D.manual=!0,lt=[ye.clientX,ye.clientY],D.cv.setPointerCapture(ye.pointerId);return}ye.button===0&&(De=[ye.clientX,ye.clientY],fe=!1,D.cv.setPointerCapture(ye.pointerId))}),D.cv.addEventListener("pointermove",ye=>{if(lt){let ut=D.H/(2*D.half);D.cu-=(ye.clientX-lt[0])/ut,D.cvv+=(ye.clientY-lt[1])/ut,lt=[ye.clientX,ye.clientY],D.praf||(D.praf=requestAnimationFrame(()=>{D.praf=0,ft(D)}));return}De&&(!fe&&Math.hypot(ye.clientX-De[0],ye.clientY-De[1])>4&&(fe=!0),fe&&tt(ye))}),D.cv.addEventListener("pointerup",ye=>{if(De&&!fe){let ut=D.cv.getBoundingClientRect(),de=(ye.clientX-ut.left)*k,Ge=(ye.clientY-ut.top)*k,Rt=D.cv.getContext("2d"),_n=null;(D.shapes||[]).slice().reverse().some(sn=>sn.loops.length?(Rt.beginPath(),sn.loops.forEach(we=>{Rt.moveTo(we[0][0],we[0][1]),we.forEach(mt=>Rt.lineTo(mt[0],mt[1])),Rt.closePath()}),Rt.isPointInPath(de,Ge,sn.S.p.layer==="bone"?"nonzero":"evenodd")?(_n=sn.S.p.name,!0):!1):!1),qe=_n===qe?null:_n,qn()}De=null,fe=!1,lt=null}),D.cv.addEventListener("pointercancel",()=>{De=null,fe=!1,lt=null});let Ze=new Map,$e=null;["touchstart","touchmove","touchend","touchcancel"].forEach(ye=>D.cv.addEventListener(ye,ut=>{ut.stopPropagation(),ut.cancelable&&ut.preventDefault()},{passive:!1})),D.cv.addEventListener("pointerdown",ye=>{if(ye.pointerType==="touch"&&(Ze.set(ye.pointerId,[ye.clientX,ye.clientY]),Ze.size===2)){De=null,fe=!1;let[ut,de]=[...Ze.values()];$e={d:Math.hypot(ut[0]-de[0],ut[1]-de[1]),y:(ut[1]+de[1])/2}}},!0),D.cv.addEventListener("pointermove",ye=>{if(ye.pointerType!=="touch"||!Ze.has(ye.pointerId)||(Ze.set(ye.pointerId,[ye.clientX,ye.clientY]),Ze.size!==2||!$e))return;ye.stopImmediatePropagation();let[ut,de]=[...Ze.values()],Ge=Math.hypot(ut[0]-de[0],ut[1]-de[1]),Rt=(ut[1]+de[1])/2;Ge>10&&$e.d>10&&Math.abs(Ge-$e.d)>1&&(D.manual=!0,D.half=Math.max(.03,Math.min(1,D.half*$e.d/Ge))),D.d+=(Rt-$e.y)*4e-4,$e={d:Ge,y:Rt},D.praf||(D.praf=requestAnimationFrame(()=>{D.praf=0,qn()}))},!0);let gt=ye=>{ye.pointerType==="touch"&&(Ze.delete(ye.pointerId),Ze.size<2&&($e=null))};D.cv.addEventListener("pointerup",gt,!0),D.cv.addEventListener("pointercancel",gt,!0),D.cv.addEventListener("dblclick",ye=>{ye.preventDefault(),ln||nn(D.k)})}),["pointerdown","pointermove","pointerup"].forEach(D=>U.addEventListener(D,fe=>fe.stopPropagation()));let ki=new ResizeObserver(()=>{rt(),qn()});ki.observe(r),wi={box:U,mini:Ne,mark:null,marks:le,ro:ki,onEsc:An,zoom:D=>{me.forEach(fe=>{fe.manual=!0,fe.half=Math.max(.03,Math.min(1,fe.half*D))}),qn()},key:D=>{me[0].d+=D,qn()}},rt(),qn();let us=window.matchMedia&&(matchMedia("(hover: none)").matches||matchMedia("(max-width: 720px)").matches);(O||us)&&nn("axial",!0),ma=null}function wu(x,E){Bi=!1,x&&Tu&&xc(!1);let S=an;an=x,Le.turntable=x,r.classList.add("jka-glide"),setTimeout(()=>r.classList.remove("jka-glide"),450),r.classList.toggle("jka-radmode",x),os(),ks();let L=Math.tan(Qr.degToRad(15))/Math.tan(Qr.degToRad(3.5));if(x&&!S){Le.autoRotate=!1;let q=Le.level();Pe.fov=7,Pe.far=40,Pe.updateProjectionMatrix();let ee=Le.target.clone().add(Pe.position.clone().sub(Le.target).multiplyScalar(L)),X=Le.target.clone().add(q.p1.clone().sub(Le.target).multiplyScalar(L));Pe.position.copy(ee),Re={p0:ee,t0:Le.target.clone(),p1:X,t1:Le.target.clone(),s:0,u1:q.u1}}if(!x&&S&&(Pe.fov=30,Pe.far=20,Pe.updateProjectionMatrix(),Pe.position.copy(Le.target.clone().add(Pe.position.clone().sub(Le.target).multiplyScalar(1/L)))),r.querySelectorAll("button[data-l=xray]").forEach(q=>{q.className=x?"jka-b on":"jka-b"}),!E)try{localStorage.setItem("jka-rad",x?"1":"0")}catch{}if(x&&!En){let q=window.__jkaT||{};q.radStart=Math.round(performance.now()-(q.t0||0));let ee={bone:55,muscle:1.5,vessel:3.2,nerve:2.6},X=new Mr,xe=(k,W,F,me)=>new Xi({uniforms:{mu:{value:k},tg:{value:W?1:0},sh:{value:F||0},tx:{value:me||0},ctr:{value:new w},fl:{value:1}},vertexShader:"uniform float sh; uniform vec3 ctr; varying float vz; varying vec3 wp; void main(){ vec3 p = position - normal * sh; vec4 w = modelMatrix * vec4(p, 1.); wp = w.xyz; vec4 mv = viewMatrix * w; vec4 mc = viewMatrix * vec4(ctr, 1.); vz = mc.z - mv.z; gl_Position = projectionMatrix * mv; }",fragmentShader:"uniform float mu, tg, tx, fl; varying float vz; varying vec3 wp; float h(vec3 p){ return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); } void main(){ float s = (gl_FrontFacing ? -1. : 1.) * fl; gl_FragColor = vec4(s * vz * mu, s * vz * tg * 40., s * vz * tx, 1.); }",side:Mi,depthTest:!1,depthWrite:!1,transparent:!0,blending:Dl,blendEquation:Is,blendSrc:Fl,blendDst:Fl}),G={},U=(k,W)=>{let F=W.clone();F.uniforms.ctr.value=k.box.getCenter(new w);let me=new Sn(k.mesh.geometry,F);me.matrixAutoUpdate=!1,me.matrix.copy(k.mesh.matrixWorld),me.userData.src=k,X.add(me)};M.forEach(k=>{if(k.layer==="nerve"||k.layer==="vessel"||k.layer==="vein"||k.layer==="ligament"||k.layer==="capsule")return;let W=v.includes(k),F=k.layer+W;if(k.layer==="bone"){U(k,G.bo||(G.bo=xe(150,!1,0,0))),U(k,G.bi||(G.bi=xe(-150,!1,.006,9))),W&&!Te&&j==="name"&&U(k,G.bt||(G.bt=xe(0,!0,0,0)));return}U(k,G[F]||(G[F]=xe(ee[k.layer]||2.6,W)))});let $=(k,W,F,me)=>{let te=F.getCenter(new w);[[G.bo||(G.bo=xe(150,!1,0,0))],[G.bi||(G.bi=xe(-150,!1,.006,9))]].forEach(([le])=>{let ze=le.clone();ze.uniforms.ctr.value=te,ze.uniforms.fl.value=me?-1:1;let rt=new Sn(k,ze);rt.matrixAutoUpdate=!1,rt.matrix.copy(W),rt.userData.always=!0,X.add(rt)})},pe=new vt().makeScale(-1,1,1);M.forEach(k=>{if(k.layer!=="bone")return;let W=(k.box.min.x+k.box.max.x)/2;if(k.box.min.x<.005&&k.box.max.x>-.005)return;let F=k.box.clone().applyMatrix4(pe);$(k.mesh.geometry,pe.clone().multiply(k.mesh.matrixWorld),F,!1)}),Sd(bd.model).then(k=>{if(h)return;k.updateMatrixWorld(!0);let W=new Set(M.map(F=>F.name));k.traverse(F=>{!F.isMesh||(F.userData||{}).l!=="bone"||W.has(String(F.userData.n||F.name).replace(/\.[lr]$/,""))||$(F.geometry,F.matrixWorld,new on().setFromObject(F),!1)}),zn=!0}).catch(()=>{});let Ne=new ps(4,4,{type:Zr,depthBuffer:!1}),Ve=new Sn(new Jr(2,2),new Xi({vertexShader:"varying vec2 vu; void main(){ vu = uv; gl_Position = vec4(position.xy, 0., 1.); }",uniforms:{t:{value:Ne.texture},px:{value:new nt(1,1)}},fragmentShader:"uniform sampler2D t; uniform vec2 px; varying vec2 vu; float hh(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); } float vn(vec2 q){ vec2 i = floor(q), f = fract(q); f = f * f * (3. - 2. * f); return mix(mix(hh(i), hh(i + vec2(1, 0)), f.x), mix(hh(i + vec2(0, 1)), hh(i + vec2(1, 1)), f.x), f.y); } vec4 mn(vec4 a, vec4 b){ return min(a, b); } vec4 mx(vec4 a, vec4 b){ return max(a, b); } vec4 med5(vec4 a, vec4 b, vec4 c, vec4 d, vec4 e){  vec4 f = mx(mn(a, b), mn(c, d)); vec4 g = mn(mx(a, b), mx(c, d));  return mx(mn(f, g), mn(mx(f, g), e)) * 0. + mn(mx(mn(f, g), e), mx(f, g)); } void main(){ vec4 a = med5(texture2D(t, vu), texture2D(t, vu + vec2(px.x, 0.)), texture2D(t, vu - vec2(px.x, 0.)),  texture2D(t, vu + vec2(0., px.y)), texture2D(t, vu - vec2(0., px.y))); float n = vn(gl_FragCoord.xy / 4.) * .6 + vn(gl_FragCoord.xy / 1.7) * .4; float tb = max(a.b, 0.) * (0.7 + 0.6 * n); float g = 1. - exp(-max(a.r + tb, 0.)); float k = 1. - exp(-max(a.g, 0.)); float bl = 0.; for (int i = 0; i < 8; i++) { float an = float(i) * 0.785398; vec4 q = texture2D(t, vu + vec2(cos(an), sin(an)) * px * 4.);  bl += 1. - exp(-max(q.r + max(q.b, 0.), 0.)); } bl /= 8.; g = clamp(g + 0.9 * (g - bl), 0., 1.); vec3 c = vec3(g) * 0.92 + 0.03; c = mix(c, vec3(0.37, 0.78, 1.), clamp(k, 0., 1.) * 0.6); gl_FragColor = vec4(c, 1.); }",depthTest:!1,depthWrite:!1})),We=new Mr;We.add(Ve);let at=null;if(Te&&j==="name"){at=new Mr;let k=new Xi({vertexShader:"attribute float jkw; varying float w; void main(){ w = jkw; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }",fragmentShader:"varying float w; void main(){ if (w < 0.05) discard; gl_FragColor = vec4(0.25, 0.8, 1., clamp(w, 0., 1.) * 0.55); }",transparent:!0,depthTest:!1,depthWrite:!1,side:Mi});v.forEach(W=>{let F=W.mesh.geometry;F.attributes.jkw||F.setAttribute("jkw",new Tn(new Float32Array(F.attributes.position.count),1));let me=new Sn(F,k);me.matrixAutoUpdate=!1,me.matrix.copy(W.mesh.matrixWorld),at.add(me)})}En={rs:X,rt:Ne,ss:We,ps:at},q.radBuilt=Math.round(performance.now()-(q.t0||0))}wn.style.display=x?"none":"",u.style.display=x?"none":"",zn=!0}function sx(){{let E=window.__jkaT||{};E.radFrame==null&&(E.radFrame=Math.round(performance.now()-(E.t0||0)))}let x=a.getDrawingBufferSize(new nt);(En.rt.width!==x.x||En.rt.height!==x.y)&&(En.rt.setSize(x.x,x.y),En.ss.children[0].material.uniforms.px.value.set(1/x.x,1/x.y)),En.rs.children.forEach(E=>{if(E.userData.always){E.visible=!0;return}let S=E.userData.src;E.visible=S.layer==="bone"||Wn(S)&&S.mesh.visible}),a.setRenderTarget(En.rt),a.setClearColor(0,0),a.clear(),a.render(En.rs,Pe),a.setRenderTarget(null),a.clear(),a.render(En.ss,Nd),En.ps&&(En.ps.children.forEach((E,S)=>{let L=v[S];L&&E.geometry!==L.mesh.geometry&&(E.geometry=L.mesh.geometry)}),a.render(En.ps,Pe))}let Ld=new Mr,Nd=new br(-1,1,1,-1,0,1);Ld.add(new Sn(new Jr(2,2),new Xi({vertexShader:"varying vec2 vv; void main(){ vv = uv; gl_Position = vec4(position.xy, 0., 1.); }",fragmentShader:"varying vec2 vv; uniform float ft, fb; void main(){ float a = smoothstep(0., fb, vv.y) * smoothstep(0., ft, 1. - vv.y) * smoothstep(0., .06, vv.x) * smoothstep(0., .06, 1. - vv.x); gl_FragColor = vec4(0., 0., 0., a); }",uniforms:{ft:{value:OE},fb:{value:kE}},transparent:!0,depthTest:!1,depthWrite:!1,blending:Dl,blendEquation:Is,blendSrc:Ul,blendDst:Uo,blendSrcAlpha:Ul,blendDstAlpha:Uo}))),a.autoClear=!1;let zs=document.createElement("div");zs.className="jka-views";let Hs="http://www.w3.org/2000/svg",Au=112,cs=Au/2,yc=42,ls=document.createElementNS(Hs,"svg");ls.setAttribute("viewBox","0 0 "+Au+" "+Au),ls.setAttribute("class","jka-gizmo"),zs.appendChild(ls);let Ru=C?1:-1,Dd=[["anterior","A",[0,0,1],"#7fd8ff"],["posterior","P",[0,0,-1],"#7fd8ff"],["superior","S",[0,1,0],"#ffd36b"],["inferior","I",[0,-1,0],"#ffd36b"],["lateral","L",[Ru,0,0],"#ff8f8f"],["medial","M",[-Ru,0,0],"#ff8f8f"]].map(([x,E,S,L])=>{let q=document.createElementNS(Hs,"g");q.setAttribute("class","jka-arm"),q.dataset.k=x;let ee=document.createElementNS(Hs,"line");ee.setAttribute("stroke",L);let X=document.createElementNS(Hs,"circle");X.setAttribute("fill",L);let xe=document.createElementNS(Hs,"text");xe.textContent=E,xe.setAttribute("class","jka-gt"),xe.setAttribute("fill",L);let G=document.createElementNS(Hs,"circle");return G.setAttribute("r",11),G.setAttribute("class","jka-hit"),q.append(ee,X,xe,G),ls.appendChild(q),{k:x,v:new w(...S),g:q,ln:ee,dot:X,tx:xe,hit:G}}),Cu=document.createElementNS(Hs,"g");Cu.setAttribute("class","jka-gcube");let rx=[[[1,0,0],[1,-1,-1],[1,1,-1],[1,1,1],[1,-1,1]],[[-1,0,0],[-1,-1,-1],[-1,-1,1],[-1,1,1],[-1,1,-1]],[[0,1,0],[-1,1,-1],[-1,1,1],[1,1,1],[1,1,-1]],[[0,-1,0],[-1,-1,-1],[1,-1,-1],[1,-1,1],[-1,-1,1]],[[0,0,1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]],[[0,0,-1],[-1,-1,-1],[-1,1,-1],[1,1,-1],[1,-1,-1]]].map(x=>{let E=document.createElementNS(Hs,"polygon");return Cu.appendChild(E),{n:new w(...x[0]),c:x.slice(1).map(S=>new w(...S)),pg:E}}),_c=document.createElementNS(Hs,"polygon");_c.setAttribute("class","jka-gsec");let ox=[[0,1],[2,3],[4,5],[6,7],[0,2],[1,3],[4,6],[5,7],[0,4],[1,5],[2,6],[3,7]],Ud=[];for(let x=0;x<8;x++)Ud.push(new w(x&1?1:-1,x&2?1:-1,x&4?1:-1));let Fd=7,Bd=new gi,ax=new gi().setFromEuler(new Ho(.38,-.5,0,"YXZ")),YE=new w(0,0,1).applyQuaternion(ax),Pu=new w(.42*Ru,.5,.76).normalize(),Od=new w().crossVectors(new w(0,1,0),Pu).normalize(),cx=new w().crossVectors(Pu,Od),lx=x=>new w(x.dot(Od),x.dot(cx),x.dot(Pu)),Iu="",Ur="section";try{Ur=localStorage.getItem("jka-gizmo")==="axes"?"axes":"section"}catch{}let co=document.createElement("button");co.className="jka-gsw",co.innerHTML='<svg viewBox="0 0 18 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4.20 7.51 A5.2 5.2 0 0 1 13.80 7.51"/><path d="M6.46 6.23 L4.20 7.51 L3.50 5.00"/><path d="M14.50 5.00 L13.80 7.51 L11.54 6.23"/></svg>';let kd=()=>{co.removeAttribute("title")};if(kd(),co.addEventListener("pointerdown",x=>x.stopPropagation()),co.addEventListener("click",x=>{x.stopPropagation(),Ur=Ur==="axes"?"section":"axes",kd(),Iu="";try{localStorage.setItem("jka-gizmo",Ur)}catch{}Vd()}),zs.insertBefore(co,zs.firstChild),!(window.matchMedia&&(matchMedia("(hover: none)").matches||matchMedia("(max-width: 720px)").matches))){let x=r.querySelector(":scope > .jka-zoom");x&&(x.classList.add("jka-zoom-w"),zs.appendChild(x))}let lo=document.createElement("button");lo.className="jka-gpl";let ux='<svg viewBox="0 0 12 12" width="11" height="11"><path d="M3 1.8v8.4l7-4.2z" fill="currentColor"/></svg>',hx='<svg viewBox="0 0 12 12" width="11" height="11"><path d="M2.6 1.8h2.4v8.4H2.6zM7 1.8h2.4v8.4H7z" fill="currentColor"/></svg>',zd=null,Lu=()=>{let x=!!Le.autoRotate;if(x!==zd){zd=x,lo.innerHTML=x?hx:ux;let E=r.querySelector(":scope > .jka-mplay");E&&(E.innerHTML=lo.innerHTML)}};lo.addEventListener("pointerdown",x=>x.stopPropagation());let Hd=()=>{clearTimeout(Fr),Le.autoRotate?(Le.autoRotate=!1,Cs=!0,_a=!0):(_a=!1,Cs=!1,Re=null,Le.autoRotate=!0),Lu()};lo.addEventListener("click",x=>{x.stopPropagation(),Hd()}),zs.insertBefore(lo,zs.firstChild);let vc=document.createElement("button");vc.className="jka-mplay",["touchstart","touchend","pointerdown"].forEach(x=>vc.addEventListener(x,E=>E.stopPropagation(),{passive:!0})),vc.addEventListener("click",x=>{x.stopPropagation(),x.preventDefault(),Hd()}),r.appendChild(vc),Lu();function Vd(){let x=Pe.position.clone().sub(Le.target).normalize(),E=x.x.toFixed(3)+x.y.toFixed(3)+x.z.toFixed(3)+Ur+(Ur==="axes"?Pe.up.y.toFixed(3):"");if(E===Iu)return;Iu=E,Bd.copy(Pe.quaternion).invert();let S=Ur==="axes",L=S?U=>U.clone().applyQuaternion(Bd):lx;Dd.forEach(U=>{let $=L(U.v),pe=cs+$.x*yc,Ne=cs-$.y*yc;U.depth=$.z,U.ln.setAttribute("x1",cs+$.x*14),U.ln.setAttribute("y1",cs-$.y*14),U.ln.setAttribute("x2",cs+$.x*(yc-8)),U.ln.setAttribute("y2",cs-$.y*(yc-8)),U.dot.setAttribute("r",0),U.hit.setAttribute("cx",pe),U.hit.setAttribute("cy",Ne),U.tx.setAttribute("x",pe),U.tx.setAttribute("y",Ne+.5),U.g.style.opacity=(.45+.55*Math.max(0,U.v.dot(x))).toFixed(2)}),rx.forEach(U=>{let $=L(U.n).z;U.pg.style.display=$>.01?"":"none",U.pg.setAttribute("points",U.c.map(pe=>{let Ne=L(pe.clone().multiplyScalar(Fd));return(cs+Ne.x).toFixed(1)+","+(cs-Ne.y).toFixed(1)}).join(" ")),U.pg.style.fillOpacity=(.1+.22*$).toFixed(2)});let q=Math.abs(x.y)>.9?new w(0,0,1):new w(0,1,0),ee=new w().crossVectors(q,x).normalize(),X=new w().crossVectors(x,ee),xe=15;if(S){let U=Ud.map(Ve=>L(Ve.clone().multiplyScalar(Fd))),$=[];ox.forEach(([Ve,We])=>{let at=U[Ve],k=U[We];if(at.z>0!=k.z>0){let W=at.z/(at.z-k.z);$.push([at.x+(k.x-at.x)*W,at.y+(k.y-at.y)*W])}});let pe=$.reduce((Ve,We)=>Ve+We[0],0)/($.length||1),Ne=$.reduce((Ve,We)=>Ve+We[1],0)/($.length||1);$.sort((Ve,We)=>Math.atan2(Ve[1]-Ne,Ve[0]-pe)-Math.atan2(We[1]-Ne,We[0]-pe)),_c.setAttribute("points",$.map(Ve=>(cs+Ve[0]).toFixed(1)+","+(cs-Ve[1]).toFixed(1)).join(" "))}else _c.setAttribute("points",[[1,1],[1,-1],[-1,-1],[-1,1]].map(([U,$])=>{let pe=L(ee.clone().multiplyScalar(U*xe).addScaledVector(X,$*xe));return(cs+pe.x).toFixed(1)+","+(cs-pe.y).toFixed(1)}).join(" "));let G=Dd.slice().sort((U,$)=>U.depth-$.depth);G.filter(U=>U.depth<0).forEach(U=>ls.appendChild(U.g)),ls.appendChild(Cu),ls.appendChild(_c),G.filter(U=>U.depth>=0).forEach(U=>ls.appendChild(U.g))}let Rs=null;ls.addEventListener("pointerdown",x=>{x.stopPropagation(),x.preventDefault(),Br(),Rs={x:x.clientX,y:x.clientY,moved:!1,k:x.target.closest(".jka-arm")&&x.target.closest(".jka-arm").dataset.k},ls.setPointerCapture(x.pointerId)});let jE=new Nl;ls.addEventListener("pointermove",x=>{if(!Rs)return;let E=x.clientX-Rs.x,S=x.clientY-Rs.y;!Rs.moved&&Math.hypot(E,S)<3||(Rs.moved=!0,Rs.x=x.clientX,Rs.y=x.clientY,Re=null,Le.rotate(E*.018,S*.018),uo(),O||yt())}),ls.addEventListener("pointerup",x=>{let E=Rs;if(Rs=null,!E||E.moved||!E.k)return;let S=Pe.position.distanceTo(Le.target);Re={p0:Pe.position.clone(),t0:Le.target.clone(),p1:Le.target.clone().addScaledVector(ex(E.k,C),S),t1:Le.target.clone(),s:0}}),r.appendChild(zs);let Nu=document.createElement("div");Nu.className="jka-sect",zs.appendChild(Nu),r.appendChild(xa),setTimeout(ks,0),setTimeout(ks,300),setTimeout(ks,650),setTimeout(ks,1200);let Gd="";function fx(){let x=Pe.position.clone().sub(Le.target).normalize(),E=new w(x.x*(C?1:-1),x.y,x.z),S=E.x.toFixed(2)+E.y.toFixed(2)+E.z.toFixed(2);if(S===Gd)return;Gd=S;let L=Math.abs(E.x),q=Math.abs(E.y),ee=Math.abs(E.z),X=pe=>Math.round(pe*180/Math.PI),xe,G,U;ee>=L&&ee>=q?(xe="Coronal",G=[X(Math.atan2(E.x,ee)),E.x>=0?"L":"M"],U=[X(Math.asin(E.y)),E.y>=0?"S":"I"]):L>=q?(xe="Sagittal",G=[X(Math.atan2(E.z,L)),E.z>=0?"A":"P"],U=[X(Math.asin(E.y)),E.y>=0?"S":"I"]):(xe="Transverse",G=[X(Math.atan2(E.z,q)),E.z>=0?"A":"P"],U=[X(Math.atan2(E.x,q)),E.x>=0?"L":"M"]);let $=[G,U].filter(pe=>Math.abs(pe[0])>=5).map(pe=>Math.abs(pe[0])+"\xB0 "+pe[1]);Nu.innerHTML="<b>"+xe+"</b>"+($.length?"<span>"+$.join(" \xB7 ")+"</span>":"")}window.__jkaView={cam:Pe,ctl:Le,parts:M,target:v,d:$n,center:bn,renderer:a};let Du=!1,Uu=0,zn=!0,Wd=0,bc=!1,Xd=0,or=!0;function uo(){zn=!0,or=!0,bc||(bc=!0,a.setPixelRatio(l),os()),clearTimeout(Xd),Xd=setTimeout(()=>{bc=!1,a.setPixelRatio(c),os(),zn=!0},180)}Le.autoRotateSpeed=1.2;let Cs=!1,Fr=0,_a=!1,Mc=()=>{an||(Le.autoRotate=!0)};function Br(){Cs=!0,Le.autoRotate=!1,clearTimeout(Fr),Fr=setTimeout(()=>{Cs=!1,_a||Mc()},9e3)}["pointerdown","wheel"].forEach(x=>a.domElement.addEventListener(x,Br,!0)),a.domElement.addEventListener("pointerup",()=>{setTimeout(()=>{Cs=!1},0)},!0),setTimeout(Mc,O?700:400),Le.addEventListener("change",()=>{Cs||Re?uo():(zn=!0,or=!0),O||yt()}),O||yt(),new ResizeObserver(()=>{os(),zn=!0}).observe(r),A.push(...ie),Ht?Fe(O?1:0):so();let ji=new Set,Sc=!1,qd=x=>{if(!(!/^Arrow(Left|Right|Up|Down)$/.test(x.key)||x.metaKey||x.ctrlKey||x.altKey)){if(h||!s.isConnected){document.removeEventListener("keydown",qd,!0),document.removeEventListener("keyup",Yd,!0);return}x.preventDefault(),x.stopPropagation(),Sc=x.shiftKey,ji.has(x.key)||(ji.add(x.key),Br())}},Yd=x=>{ji.delete(x.key),x.key==="Shift"&&(Sc=!1)};f.in_key=(x,E)=>{Sc=!1,E?ji.has(x)||(ji.add(x),Br()):ji.delete(x)},f.in_zoom=x=>Id(x>0?.75:1/.75),document.addEventListener("keydown",qd,!0),document.addEventListener("keyup",Yd,!0),window.addEventListener("blur",()=>ji.clear()),function x(E){if(h||!s.isConnected){h||f.stop();return}if(requestAnimationFrame(x),Re){Re.s||(Re.s=E);let L=Math.min(1,(E-Re.s)/500),q=1-Math.pow(1-L,3);Pe.position.lerpVectors(Re.p0,Re.p1,q),Le.target.lerpVectors(Re.t0,Re.t1,q),Re.u0||(Re.u0=Pe.up.clone(),Re.u1=Re.u1||Qg(Re.p1.clone().sub(Re.t1).normalize())),Pe.up.lerpVectors(Re.u0,Re.u1,q).normalize(),Re.q0&&(bt.lerpVectors(Re.q0,Re.q1,q),et()),zn=!0,L>=1&&(Re=null)}let S=Uu?Math.min(.05,(E-Uu)/1e3):0;if(Uu=E,wi){let L=(ji.has("ArrowUp")?1:0)-(ji.has("ArrowDown")?1:0);if(L&&wi.key(L*.06*S),!wi.mini)return;Le.update(S),zn&&(zn=!1,a.clear(),a.render(p,Pe));return}if(ji.size&&!Re){let L=1.7*S,q=(ji.has("ArrowRight")?1:0)-(ji.has("ArrowLeft")?1:0),ee=(ji.has("ArrowDown")?1:0)-(ji.has("ArrowUp")?1:0);(q||ee)&&Sc?(Cs=!0,bt.x+=q*420*S,bt.y+=ee*420*S,et(),uo(),O||yt(),clearTimeout(Fr),Fr=setTimeout(()=>{Cs=!1,_a||Mc()},9e3)):(q||ee)&&(Cs=!0,Le.rotate(q*L,ee*L),clearTimeout(Fr),Fr=setTimeout(()=>{Cs=!1,_a||Mc()},9e3))}if(Re?Pe.lookAt(Le.target):Le.update(S),!(Bi&&!an)){if(!zn&&E>1500){(Du||pa)&&(Du=Ad(E));return}zn=!1,b.position.copy(Pe.position).add(new w(.3,.5,.2)),!bc&&or&&E-Wd>(Le.autoRotate?200:60)&&(Wd=E,or=!1,Kt(),_u()),an&&En?sx():(a.clear(),a.render(p,Pe),a.render(Ld,Nd)),r.classList.contains("jka-shown")||requestAnimationFrame(()=>r.classList.add("jka-shown")),Vd(),fx(),Lu(),Du=Ad(E)}}(0),setTimeout(()=>{Kt(),zn=!0},50)}return f}window.JKANAT={v:59,mount:WE,input:(s,e,t)=>{let n=fc&&fc["in_"+s];return n&&n(e,t),!!n}};(window.__jkaQ||[]).splice(0).forEach(s=>s())});XE();})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2023 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
