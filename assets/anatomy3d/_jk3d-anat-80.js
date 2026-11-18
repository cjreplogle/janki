(()=>{var Tx=Object.create;var sp=Object.defineProperty;var wx=Object.getOwnPropertyDescriptor;var Ax=Object.getOwnPropertyNames;var Rx=Object.getPrototypeOf,Cx=Object.prototype.hasOwnProperty;var Bt=(s,e)=>()=>(s&&(e=s(s=0)),e);var rp=(s,e)=>()=>(e||s((e={exports:{}}).exports,e),e.exports);var Px=(s,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of Ax(e))!Cx.call(s,i)&&i!==t&&sp(s,i,{get:()=>e[i],enumerable:!(n=wx(e,i))||n.enumerable});return s};var Ix=(s,e,t)=>(t=s!=null?Tx(Rx(s)):{},Px(e||!s||!s.__esModule?sp(t,"default",{value:s,enumerable:!0}):t,s));var op=rp(()=>{(function(){var s=typeof console!="undefined"&&console||(globalThis.console={}),e=typeof s.log=="function"?s.log.bind(s):function(){};["error","warn","info","debug","trace","group","groupEnd","time","timeEnd","table","assert"].forEach(function(t){typeof s[t]!="function"&&(s[t]=t==="assert"?function(){}:e)})})()});function Es(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Di[s&255]+Di[s>>8&255]+Di[s>>16&255]+Di[s>>24&255]+"-"+Di[e&255]+Di[e>>8&255]+"-"+Di[e>>16&15|64]+Di[e>>24&255]+"-"+Di[t&63|128]+Di[t>>8&255]+"-"+Di[t>>16&255]+Di[t>>24&255]+Di[n&255]+Di[n>>8&255]+Di[n>>16&255]+Di[n>>24&255]).toLowerCase()}function oi(s,e,t){return Math.max(e,Math.min(t,s))}function vf(s,e){return(s%e+e)%e}function Ry(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function Cy(s,e,t){return s!==e?(t-s)/(e-s):0}function Ba(s,e,t){return(1-t)*s+t*e}function Py(s,e,t,n){return Ba(s,e,1-Math.exp(-t*n))}function Iy(s,e=1){return e-Math.abs(vf(s,e*2)-e)}function Ly(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Ny(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Dy(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Uy(s,e){return s+Math.random()*(e-s)}function Fy(s){return s*(.5-Math.random())}function By(s){s!==void 0&&(Wp=s);let e=Wp+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Oy(s){return s*Fa}function zy(s){return s*$o}function Ph(s){return(s&s-1)===0&&s!==0}function ky(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function fl(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Hy(s,e,t,n,i){let r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),u=o((e+n)/2),h=r((e-n)/2),f=o((e-n)/2),d=r((n-e)/2),g=o((n-e)/2);switch(i){case"XYX":s.set(a*u,c*h,c*f,a*l);break;case"YZY":s.set(c*f,a*u,c*h,a*l);break;case"ZXZ":s.set(c*h,c*f,a*u,a*l);break;case"XZX":s.set(a*u,c*g,c*d,a*l);break;case"YXY":s.set(c*d,a*u,c*g,a*l);break;case"ZYZ":s.set(c*g,c*d,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Ls(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Dn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}function h0(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Wa(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Vy(){let s=Wa("canvas");return s.style.display="block",s}function Oa(s){s in Xp||(Xp[s]=!0,console.warn(s))}function Xo(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function ju(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}function Zu(s){return typeof HTMLImageElement!="undefined"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&s instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&s instanceof ImageBitmap?dl.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}function Ju(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){jr.fromArray(s,r);let a=i.x*Math.abs(jr.x)+i.y*Math.abs(jr.y)+i.z*Math.abs(jr.z),c=e.dot(jr),l=t.dot(jr),u=n.dot(jr);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}function oh(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}function n_(s,e,t,n,i,r,o,a){let c;if(e.side===Bi?c=n.intersectTriangle(o,r,i,!0,a):c=n.intersectTriangle(i,r,o,e.side===Gi,a),c===null)return null;qc.copy(a),qc.applyMatrix4(s.matrixWorld);let l=t.ray.origin.distanceTo(qc);return l<t.near||l>t.far?null:{distance:l,point:qc.clone(),object:s}}function Yc(s,e,t,n,i,r,o,a,c,l){s.getVertexPosition(a,Do),s.getVertexPosition(c,Uo),s.getVertexPosition(l,Fo);let u=n_(s,e,t,n,Do,Uo,Fo,Xc);if(u){i&&(Vc.fromBufferAttribute(i,a),Gc.fromBufferAttribute(i,c),Wc.fromBufferAttribute(i,l),u.uv=Ji.getInterpolation(Xc,Do,Uo,Fo,Vc,Gc,Wc,new ot)),r&&(Vc.fromBufferAttribute(r,a),Gc.fromBufferAttribute(r,c),Wc.fromBufferAttribute(r,l),u.uv1=Ji.getInterpolation(Xc,Do,Uo,Fo,Vc,Gc,Wc,new ot),u.uv2=u.uv1),o&&(sm.fromBufferAttribute(o,a),rm.fromBufferAttribute(o,c),om.fromBufferAttribute(o,l),u.normal=Ji.getInterpolation(Xc,Do,Uo,Fo,sm,rm,om,new T),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a,b:c,c:l,normal:new T,materialIndex:0};Ji.getNormal(Do,Uo,Fo,h.normal),u.face=h}return u}function na(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Hi(s){let e={};for(let t=0;t<s.length;t++){let n=na(s[t]);for(let i in n)e[i]=n[i]}return e}function i_(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function d0(s){return s.getRenderTarget()===null?s.outputColorSpace:An.workingColorSpace}function p0(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function l_(s,e){let t=e.isWebGL2,n=new WeakMap;function i(l,u){let h=l.array,f=l.usage,d=h.byteLength,g=s.createBuffer();s.bindBuffer(u,g),s.bufferData(u,h,f),l.onUploadCallback();let y;if(h instanceof Float32Array)y=s.FLOAT;else if(h instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)y=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else y=s.UNSIGNED_SHORT;else if(h instanceof Int16Array)y=s.SHORT;else if(h instanceof Uint32Array)y=s.UNSIGNED_INT;else if(h instanceof Int32Array)y=s.INT;else if(h instanceof Int8Array)y=s.BYTE;else if(h instanceof Uint8Array)y=s.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)y=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:g,type:y,bytesPerElement:h.BYTES_PER_ELEMENT,version:l.version,size:d}}function r(l,u,h){let f=u.array,d=u._updateRange,g=u.updateRanges;if(s.bindBuffer(h,l),d.count===-1&&g.length===0&&s.bufferSubData(h,0,f),g.length!==0){for(let y=0,m=g.length;y<m;y++){let p=g[y];t?s.bufferSubData(h,p.start*f.BYTES_PER_ELEMENT,f,p.start,p.count):s.bufferSubData(h,p.start*f.BYTES_PER_ELEMENT,f.subarray(p.start,p.start+p.count))}u.clearUpdateRanges()}d.count!==-1&&(t?s.bufferSubData(h,d.offset*f.BYTES_PER_ELEMENT,f,d.offset,d.count):s.bufferSubData(h,d.offset*f.BYTES_PER_ELEMENT,f.subarray(d.offset,d.offset+d.count)),d.count=-1),u.onUploadCallback()}function o(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);let u=n.get(l);u&&(s.deleteBuffer(u.buffer),n.delete(l))}function c(l,u){if(l.isGLBufferAttribute){let f=n.get(l);(!f||f.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);let h=n.get(l);if(h===void 0)n.set(l,i(l,u));else if(h.version<l.version){if(h.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(h.buffer,l,u),h.version=l.version}}return{get:o,remove:a,update:c}}function Gb(s,e,t,n,i,r,o){let a=new It(0),c=r===!0?0:1,l,u,h=null,f=0,d=null;function g(m,p){let v=!1,_=p.isScene===!0?p.background:null;_&&_.isTexture&&(_=(p.backgroundBlurriness>0?t:e).get(_)),_===null?y(a,c):_&&_.isColor&&(y(_,1),v=!0);let E=s.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,o):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||v)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),_&&(_.isCubeTexture||_.mapping===Gl)?(u===void 0&&(u=new Rn(new qa(1,1,1),new Xi({name:"BackgroundCubeMaterial",uniforms:na(Ps.backgroundCube.uniforms),vertexShader:Ps.backgroundCube.vertexShader,fragmentShader:Ps.backgroundCube.fragmentShader,side:Bi,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,A,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),u.material.uniforms.envMap.value=_,u.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,u.material.toneMapped=An.getTransfer(_.colorSpace)!==Wn,(h!==_||f!==_.version||d!==s.toneMapping)&&(u.material.needsUpdate=!0,h=_,f=_.version,d=s.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new Rn(new oo(2,2),new Xi({name:"BackgroundMaterial",uniforms:na(Ps.background.uniforms),vertexShader:Ps.background.vertexShader,fragmentShader:Ps.background.fragmentShader,side:Gi,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,l.material.toneMapped=An.getTransfer(_.colorSpace)!==Wn,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||f!==_.version||d!==s.toneMapping)&&(l.material.needsUpdate=!0,h=_,f=_.version,d=s.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function y(m,p){m.getRGB(Zc,d0(s)),n.buffers.color.setClear(Zc.r,Zc.g,Zc.b,p,o)}return{getClearColor:function(){return a},setClearColor:function(m,p=1){a.set(m),c=p,y(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,y(a,c)},render:g}}function Wb(s,e,t,n){let i=s.getParameter(s.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||r!==null,a={},c=m(null),l=c,u=!1;function h(N,Z,B,Te,Re){let ne=!1;if(o){let be=y(Te,B,Z);l!==be&&(l=be,d(l.object)),ne=p(N,Te,B,Re),ne&&v(N,Te,B,Re)}else{let be=Z.wireframe===!0;(l.geometry!==Te.id||l.program!==B.id||l.wireframe!==be)&&(l.geometry=Te.id,l.program=B.id,l.wireframe=be,ne=!0)}Re!==null&&t.update(Re,s.ELEMENT_ARRAY_BUFFER),(ne||u)&&(u=!1,O(N,Z,B,Te),Re!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(Re).buffer))}function f(){return n.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function d(N){return n.isWebGL2?s.bindVertexArray(N):r.bindVertexArrayOES(N)}function g(N){return n.isWebGL2?s.deleteVertexArray(N):r.deleteVertexArrayOES(N)}function y(N,Z,B){let Te=B.wireframe===!0,Re=a[N.id];Re===void 0&&(Re={},a[N.id]=Re);let ne=Re[Z.id];ne===void 0&&(ne={},Re[Z.id]=ne);let be=ne[Te];return be===void 0&&(be=m(f()),ne[Te]=be),be}function m(N){let Z=[],B=[],Te=[];for(let Re=0;Re<i;Re++)Z[Re]=0,B[Re]=0,Te[Re]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:Z,enabledAttributes:B,attributeDivisors:Te,object:N,attributes:{},index:null}}function p(N,Z,B,Te){let Re=l.attributes,ne=Z.attributes,be=0,qe=B.getAttributes();for(let st in qe)if(qe[st].location>=0){let Fe=Re[st],Ge=ne[st];if(Ge===void 0&&(st==="instanceMatrix"&&N.instanceMatrix&&(Ge=N.instanceMatrix),st==="instanceColor"&&N.instanceColor&&(Ge=N.instanceColor)),Fe===void 0||Fe.attribute!==Ge||Ge&&Fe.data!==Ge.data)return!0;be++}return l.attributesNum!==be||l.index!==Te}function v(N,Z,B,Te){let Re={},ne=Z.attributes,be=0,qe=B.getAttributes();for(let st in qe)if(qe[st].location>=0){let Fe=ne[st];Fe===void 0&&(st==="instanceMatrix"&&N.instanceMatrix&&(Fe=N.instanceMatrix),st==="instanceColor"&&N.instanceColor&&(Fe=N.instanceColor));let Ge={};Ge.attribute=Fe,Fe&&Fe.data&&(Ge.data=Fe.data),Re[st]=Ge,be++}l.attributes=Re,l.attributesNum=be,l.index=Te}function _(){let N=l.newAttributes;for(let Z=0,B=N.length;Z<B;Z++)N[Z]=0}function E(N){w(N,0)}function w(N,Z){let B=l.newAttributes,Te=l.enabledAttributes,Re=l.attributeDivisors;B[N]=1,Te[N]===0&&(s.enableVertexAttribArray(N),Te[N]=1),Re[N]!==Z&&((n.isWebGL2?s:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](N,Z),Re[N]=Z)}function A(){let N=l.newAttributes,Z=l.enabledAttributes;for(let B=0,Te=Z.length;B<Te;B++)Z[B]!==N[B]&&(s.disableVertexAttribArray(B),Z[B]=0)}function R(N,Z,B,Te,Re,ne,be){be===!0?s.vertexAttribIPointer(N,Z,B,Re,ne):s.vertexAttribPointer(N,Z,B,Te,Re,ne)}function O(N,Z,B,Te){if(n.isWebGL2===!1&&(N.isInstancedMesh||Te.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;_();let Re=Te.attributes,ne=B.getAttributes(),be=Z.defaultAttributeValues;for(let qe in ne){let st=ne[qe];if(st.location>=0){let ie=Re[qe];if(ie===void 0&&(qe==="instanceMatrix"&&N.instanceMatrix&&(ie=N.instanceMatrix),qe==="instanceColor"&&N.instanceColor&&(ie=N.instanceColor)),ie!==void 0){let Fe=ie.normalized,Ge=ie.itemSize,Nt=t.get(ie);if(Nt===void 0)continue;let at=Nt.buffer,Xt=Nt.type,tn=Nt.bytesPerElement,Tt=n.isWebGL2===!0&&(Xt===s.INT||Xt===s.UNSIGNED_INT||ie.gpuType===t0);if(ie.isInterleavedBufferAttribute){let bn=ie.data,ae=bn.stride,vi=ie.offset;if(bn.isInstancedInterleavedBuffer){for(let Ht=0;Ht<st.locationSize;Ht++)w(st.location+Ht,bn.meshPerAttribute);N.isInstancedMesh!==!0&&Te._maxInstanceCount===void 0&&(Te._maxInstanceCount=bn.meshPerAttribute*bn.count)}else for(let Ht=0;Ht<st.locationSize;Ht++)E(st.location+Ht);s.bindBuffer(s.ARRAY_BUFFER,at);for(let Ht=0;Ht<st.locationSize;Ht++)R(st.location+Ht,Ge/st.locationSize,Xt,Fe,ae*tn,(vi+Ge/st.locationSize*Ht)*tn,Tt)}else{if(ie.isInstancedBufferAttribute){for(let bn=0;bn<st.locationSize;bn++)w(st.location+bn,ie.meshPerAttribute);N.isInstancedMesh!==!0&&Te._maxInstanceCount===void 0&&(Te._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let bn=0;bn<st.locationSize;bn++)E(st.location+bn);s.bindBuffer(s.ARRAY_BUFFER,at);for(let bn=0;bn<st.locationSize;bn++)R(st.location+bn,Ge/st.locationSize,Xt,Fe,Ge*tn,Ge/st.locationSize*bn*tn,Tt)}}else if(be!==void 0){let Fe=be[qe];if(Fe!==void 0)switch(Fe.length){case 2:s.vertexAttrib2fv(st.location,Fe);break;case 3:s.vertexAttrib3fv(st.location,Fe);break;case 4:s.vertexAttrib4fv(st.location,Fe);break;default:s.vertexAttrib1fv(st.location,Fe)}}}}A()}function M(){X();for(let N in a){let Z=a[N];for(let B in Z){let Te=Z[B];for(let Re in Te)g(Te[Re].object),delete Te[Re];delete Z[B]}delete a[N]}}function P(N){if(a[N.id]===void 0)return;let Z=a[N.id];for(let B in Z){let Te=Z[B];for(let Re in Te)g(Te[Re].object),delete Te[Re];delete Z[B]}delete a[N.id]}function G(N){for(let Z in a){let B=a[Z];if(B[N.id]===void 0)continue;let Te=B[N.id];for(let Re in Te)g(Te[Re].object),delete Te[Re];delete B[N.id]}}function X(){ce(),u=!0,l!==c&&(l=c,d(l.object))}function ce(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:h,reset:X,resetDefaultState:ce,dispose:M,releaseStatesOfGeometry:P,releaseStatesOfProgram:G,initAttributes:_,enableAttribute:E,disableUnusedAttributes:A}}function Xb(s,e,t,n){let i=n.isWebGL2,r;function o(u){r=u}function a(u,h){s.drawArrays(r,u,h),t.update(h,r,1)}function c(u,h,f){if(f===0)return;let d,g;if(i)d=s,g="drawArraysInstanced";else if(d=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[g](r,u,h,f),t.update(h,r,f)}function l(u,h,f){if(f===0)return;let d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<f;g++)this.render(u[g],h[g]);else{d.multiDrawArraysWEBGL(r,u,0,h,0,f);let g=0;for(let y=0;y<f;y++)g+=h[y];t.update(g,r,1)}}this.setMode=o,this.render=a,this.renderInstances=c,this.renderMultiDraw=l}function qb(s,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){let R=e.get("EXT_texture_filter_anisotropic");n=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let o=typeof WebGL2RenderingContext!="undefined"&&s.constructor.name==="WebGL2RenderingContext",a=t.precision!==void 0?t.precision:"highp",c=r(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);let l=o||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,h=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),d=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),y=s.getParameter(s.MAX_VERTEX_ATTRIBS),m=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),p=s.getParameter(s.MAX_VARYING_VECTORS),v=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),_=f>0,E=o||e.has("OES_texture_float"),w=_&&E,A=o?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:l,getMaxAnisotropy:i,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:f,maxTextureSize:d,maxCubemapSize:g,maxAttributes:y,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:v,vertexTextures:_,floatFragmentTextures:E,floatVertexTextures:w,maxSamples:A}}function Yb(s){let e=this,t=null,n=0,i=!1,r=!1,o=new rs,a=new mn,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){let d=h.length!==0||f||n!==0||i;return i=f,n=h.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,d){let g=h.clippingPlanes,y=h.clipIntersection,m=h.clipShadows,p=s.get(h);if(!i||g===null||g.length===0||r&&!m)r?u(null):l();else{let v=r?0:n,_=v*4,E=p.clippingState||null;c.value=E,E=u(g,f,_,d);for(let w=0;w!==_;++w)E[w]=t[w];p.clippingState=E,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,f,d,g){let y=h!==null?h.length:0,m=null;if(y!==0){if(m=c.value,g!==!0||m===null){let p=d+y*4,v=f.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let _=0,E=d;_!==y;++_,E+=4)o.copy(h[_]).applyMatrix4(v,a),o.normal.toArray(m,E),m[E+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,m}}function jb(s){let e=new WeakMap;function t(o,a){return a===wh?o.mapping=jo:a===Ah&&(o.mapping=Zo),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===wh||a===Ah)if(e.has(o)){let c=e.get(o).texture;return t(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new Dh(c.height/2);return l.fromEquirectangularTexture(s,o),e.set(o,l),o.addEventListener("dispose",i),t(l.texture,o.mapping)}else return null}}return o}function i(o){let a=o.target;a.removeEventListener("dispose",i);let c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}function Zb(s){let e=[],t=[],n=[],i=s,r=s-Vo+1+am.length;for(let o=0;o<r;o++){let a=Math.pow(2,i);t.push(a);let c=1/a;o>s-Vo?c=am[o-s+Vo-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),u=-l,h=1+l,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,g=6,y=3,m=2,p=1,v=new Float32Array(y*g*d),_=new Float32Array(m*g*d),E=new Float32Array(p*g*d);for(let A=0;A<d;A++){let R=A%3*2/3-1,O=A>2?0:-1,M=[R,O,0,R+2/3,O,0,R+2/3,O+1,0,R,O,0,R+2/3,O+1,0,R,O+1,0];v.set(M,y*g*A),_.set(f,m*g*A);let P=[A,A,A,A,A,A];E.set(P,p*g*A)}let w=new wi;w.setAttribute("position",new Pn(v,y)),w.setAttribute("uv",new Pn(_,m)),w.setAttribute("faceIndex",new Pn(E,p)),e.push(w),i>Vo&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function um(s,e,t){let n=new ds(s,e,t);return n.texture.mapping=Gl,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Kc(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function Kb(s,e,t){let n=new Float32Array(Qr),i=new T(0,1,0);return new Xi({name:"SphericalGaussianBlur",defines:{n:Qr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:bf(),fragmentShader:`

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
		`,blending:Mr,depthTest:!1,depthWrite:!1})}function hm(){return new Xi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:bf(),fragmentShader:`

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
		`,blending:Mr,depthTest:!1,depthWrite:!1})}function fm(){return new Xi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:bf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Mr,depthTest:!1,depthWrite:!1})}function bf(){return`

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
	`}function Jb(s){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===wh||c===Ah,u=c===jo||c===Zo;if(l||u)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let h=e.get(a);return t===null&&(t=new yl(s)),h=l?t.fromEquirectangular(a,h):t.fromCubemap(a,h),e.set(a,h),h.texture}else{if(e.has(a))return e.get(a).texture;{let h=a.image;if(l&&h&&h.height>0||u&&h&&i(h)){t===null&&(t=new yl(s));let f=l?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,f),a.addEventListener("dispose",r),f.texture}else return null}}}return a}function i(a){let c=0,l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function $b(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){let i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Qb(s,e,t,n){let i={},r=new WeakMap;function o(h){let f=h.target;f.index!==null&&e.remove(f.index);for(let g in f.attributes)e.remove(f.attributes[g]);for(let g in f.morphAttributes){let y=f.morphAttributes[g];for(let m=0,p=y.length;m<p;m++)e.remove(y[m])}f.removeEventListener("dispose",o),delete i[f.id];let d=r.get(f);d&&(e.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(h,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,t.memory.geometries++),f}function c(h){let f=h.attributes;for(let g in f)e.update(f[g],s.ARRAY_BUFFER);let d=h.morphAttributes;for(let g in d){let y=d[g];for(let m=0,p=y.length;m<p;m++)e.update(y[m],s.ARRAY_BUFFER)}}function l(h){let f=[],d=h.index,g=h.attributes.position,y=0;if(d!==null){let v=d.array;y=d.version;for(let _=0,E=v.length;_<E;_+=3){let w=v[_+0],A=v[_+1],R=v[_+2];f.push(w,A,A,R,R,w)}}else if(g!==void 0){let v=g.array;y=g.version;for(let _=0,E=v.length/3-1;_<E;_+=3){let w=_+0,A=_+1,R=_+2;f.push(w,A,A,R,R,w)}}else return;let m=new(h0(f)?ta:ea)(f,1);m.version=y;let p=r.get(h);p&&e.remove(p),r.set(h,m)}function u(h){let f=r.get(h);if(f){let d=h.index;d!==null&&f.version<d.version&&l(h)}else l(h);return r.get(h)}return{get:a,update:c,getWireframeAttribute:u}}function eM(s,e,t,n){let i=n.isWebGL2,r;function o(d){r=d}let a,c;function l(d){a=d.type,c=d.bytesPerElement}function u(d,g){s.drawElements(r,g,a,d*c),t.update(g,r,1)}function h(d,g,y){if(y===0)return;let m,p;if(i)m=s,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](r,g,a,d*c,y),t.update(g,r,y)}function f(d,g,y){if(y===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<y;p++)this.render(d[p]/c,g[p]);else{m.multiDrawElementsWEBGL(r,g,0,a,d,0,y);let p=0;for(let v=0;v<y;v++)p+=g[v];t.update(p,r,1)}}this.setMode=o,this.setIndex=l,this.render=u,this.renderInstances=h,this.renderMultiDraw=f}function tM(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function nM(s,e){return s[0]-e[0]}function iM(s,e){return Math.abs(e[1])-Math.abs(s[1])}function sM(s,e,t){let n={},i=new Float32Array(8),r=new WeakMap,o=new Bn,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function c(l,u,h){let f=l.morphTargetInfluences;if(e.isWebGL2===!0){let d=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,g=d!==void 0?d.length:0,y=r.get(u);if(y===void 0||y.count!==g){let N=function(){X.dispose(),r.delete(u),u.removeEventListener("dispose",N)};y!==void 0&&y.texture.dispose();let v=u.morphAttributes.position!==void 0,_=u.morphAttributes.normal!==void 0,E=u.morphAttributes.color!==void 0,w=u.morphAttributes.position||[],A=u.morphAttributes.normal||[],R=u.morphAttributes.color||[],O=0;v===!0&&(O=1),_===!0&&(O=2),E===!0&&(O=3);let M=u.attributes.position.count*O,P=1;M>e.maxTextureSize&&(P=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);let G=new Float32Array(M*P*4*g),X=new ml(G,M,P,g);X.type=Ns,X.needsUpdate=!0;let ce=O*4;for(let Z=0;Z<g;Z++){let B=w[Z],Te=A[Z],Re=R[Z],ne=M*P*4*Z;for(let be=0;be<B.count;be++){let qe=be*ce;v===!0&&(o.fromBufferAttribute(B,be),G[ne+qe+0]=o.x,G[ne+qe+1]=o.y,G[ne+qe+2]=o.z,G[ne+qe+3]=0),_===!0&&(o.fromBufferAttribute(Te,be),G[ne+qe+4]=o.x,G[ne+qe+5]=o.y,G[ne+qe+6]=o.z,G[ne+qe+7]=0),E===!0&&(o.fromBufferAttribute(Re,be),G[ne+qe+8]=o.x,G[ne+qe+9]=o.y,G[ne+qe+10]=o.z,G[ne+qe+11]=Re.itemSize===4?o.w:1)}}y={count:g,texture:X,size:new ot(M,P)},r.set(u,y),u.addEventListener("dispose",N)}let m=0;for(let v=0;v<f.length;v++)m+=f[v];let p=u.morphTargetsRelative?1:1-m;h.getUniforms().setValue(s,"morphTargetBaseInfluence",p),h.getUniforms().setValue(s,"morphTargetInfluences",f),h.getUniforms().setValue(s,"morphTargetsTexture",y.texture,t),h.getUniforms().setValue(s,"morphTargetsTextureSize",y.size)}else{let d=f===void 0?0:f.length,g=n[u.id];if(g===void 0||g.length!==d){g=[];for(let _=0;_<d;_++)g[_]=[_,0];n[u.id]=g}for(let _=0;_<d;_++){let E=g[_];E[0]=_,E[1]=f[_]}g.sort(iM);for(let _=0;_<8;_++)_<d&&g[_][1]?(a[_][0]=g[_][0],a[_][1]=g[_][1]):(a[_][0]=Number.MAX_SAFE_INTEGER,a[_][1]=0);a.sort(nM);let y=u.morphAttributes.position,m=u.morphAttributes.normal,p=0;for(let _=0;_<8;_++){let E=a[_],w=E[0],A=E[1];w!==Number.MAX_SAFE_INTEGER&&A?(y&&u.getAttribute("morphTarget"+_)!==y[w]&&u.setAttribute("morphTarget"+_,y[w]),m&&u.getAttribute("morphNormal"+_)!==m[w]&&u.setAttribute("morphNormal"+_,m[w]),i[_]=A,p+=A):(y&&u.hasAttribute("morphTarget"+_)===!0&&u.deleteAttribute("morphTarget"+_),m&&u.hasAttribute("morphNormal"+_)===!0&&u.deleteAttribute("morphNormal"+_),i[_]=0)}let v=u.morphTargetsRelative?1:1-p;h.getUniforms().setValue(s,"morphTargetBaseInfluence",v),h.getUniforms().setValue(s,"morphTargetInfluences",i)}}return{update:c}}function rM(s,e,t,n){let i=new WeakMap;function r(c){let l=n.render.frame,u=c.geometry,h=e.get(c,u);if(i.get(h)!==l&&(e.update(h),i.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;i.get(f)!==l&&(f.update(),i.set(f,l))}return h}function o(){i=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}function oa(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=dm[i];if(r===void 0&&(r=new Float32Array(i),dm[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function xi(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function yi(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function ql(s,e){let t=pm[e];t===void 0&&(t=new Int32Array(e),pm[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function oM(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function aM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xi(t,e))return;s.uniform2fv(this.addr,e),yi(t,e)}}function cM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(xi(t,e))return;s.uniform3fv(this.addr,e),yi(t,e)}}function lM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xi(t,e))return;s.uniform4fv(this.addr,e),yi(t,e)}}function uM(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(xi(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),yi(t,e)}else{if(xi(t,n))return;xm.set(n),s.uniformMatrix2fv(this.addr,!1,xm),yi(t,n)}}function hM(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(xi(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),yi(t,e)}else{if(xi(t,n))return;gm.set(n),s.uniformMatrix3fv(this.addr,!1,gm),yi(t,n)}}function fM(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(xi(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),yi(t,e)}else{if(xi(t,n))return;mm.set(n),s.uniformMatrix4fv(this.addr,!1,mm),yi(t,n)}}function dM(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function pM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xi(t,e))return;s.uniform2iv(this.addr,e),yi(t,e)}}function mM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(xi(t,e))return;s.uniform3iv(this.addr,e),yi(t,e)}}function gM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xi(t,e))return;s.uniform4iv(this.addr,e),yi(t,e)}}function xM(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function yM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xi(t,e))return;s.uniform2uiv(this.addr,e),yi(t,e)}}function _M(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(xi(t,e))return;s.uniform3uiv(this.addr,e),yi(t,e)}}function vM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xi(t,e))return;s.uniform4uiv(this.addr,e),yi(t,e)}}function bM(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r=this.type===s.SAMPLER_2D_SHADOW?g0:m0;t.setTexture2D(e||r,i)}function MM(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||y0,i)}function SM(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||_0,i)}function EM(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||x0,i)}function TM(s){switch(s){case 5126:return oM;case 35664:return aM;case 35665:return cM;case 35666:return lM;case 35674:return uM;case 35675:return hM;case 35676:return fM;case 5124:case 35670:return dM;case 35667:case 35671:return pM;case 35668:case 35672:return mM;case 35669:case 35673:return gM;case 5125:return xM;case 36294:return yM;case 36295:return _M;case 36296:return vM;case 35678:case 36198:case 36298:case 36306:case 35682:return bM;case 35679:case 36299:case 36307:return MM;case 35680:case 36300:case 36308:case 36293:return SM;case 36289:case 36303:case 36311:case 36292:return EM}}function wM(s,e){s.uniform1fv(this.addr,e)}function AM(s,e){let t=oa(e,this.size,2);s.uniform2fv(this.addr,t)}function RM(s,e){let t=oa(e,this.size,3);s.uniform3fv(this.addr,t)}function CM(s,e){let t=oa(e,this.size,4);s.uniform4fv(this.addr,t)}function PM(s,e){let t=oa(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function IM(s,e){let t=oa(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function LM(s,e){let t=oa(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function NM(s,e){s.uniform1iv(this.addr,e)}function DM(s,e){s.uniform2iv(this.addr,e)}function UM(s,e){s.uniform3iv(this.addr,e)}function FM(s,e){s.uniform4iv(this.addr,e)}function BM(s,e){s.uniform1uiv(this.addr,e)}function OM(s,e){s.uniform2uiv(this.addr,e)}function zM(s,e){s.uniform3uiv(this.addr,e)}function kM(s,e){s.uniform4uiv(this.addr,e)}function HM(s,e,t){let n=this.cache,i=e.length,r=ql(t,i);xi(n,r)||(s.uniform1iv(this.addr,r),yi(n,r));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||m0,r[o])}function VM(s,e,t){let n=this.cache,i=e.length,r=ql(t,i);xi(n,r)||(s.uniform1iv(this.addr,r),yi(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||y0,r[o])}function GM(s,e,t){let n=this.cache,i=e.length,r=ql(t,i);xi(n,r)||(s.uniform1iv(this.addr,r),yi(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||_0,r[o])}function WM(s,e,t){let n=this.cache,i=e.length,r=ql(t,i);xi(n,r)||(s.uniform1iv(this.addr,r),yi(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||x0,r[o])}function XM(s){switch(s){case 5126:return wM;case 35664:return AM;case 35665:return RM;case 35666:return CM;case 35674:return PM;case 35675:return IM;case 35676:return LM;case 5124:case 35670:return NM;case 35667:case 35671:return DM;case 35668:case 35672:return UM;case 35669:case 35673:return FM;case 5125:return BM;case 36294:return OM;case 36295:return zM;case 36296:return kM;case 35678:case 36198:case 36298:case 36306:case 35682:return HM;case 35679:case 36299:case 36307:return VM;case 35680:case 36300:case 36308:case 36293:return GM;case 36289:case 36303:case 36311:case 36292:return WM}}function ym(s,e){s.seq.push(e),s.map[e.id]=e}function qM(s,e,t){let n=s.name,i=n.length;for(ph.lastIndex=0;;){let r=ph.exec(n),o=ph.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){ym(t,l===void 0?new Uh(a,s,e):new Fh(a,s,e));break}else{let h=t.map[a];h===void 0&&(h=new Bh(a),ym(t,h)),t=h}}}function _m(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}function ZM(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function KM(s){let e=An.getPrimaries(An.workingColorSpace),t=An.getPrimaries(s),n;switch(e===t?n="":e===hl&&t===ul?n="LinearDisplayP3ToLinearSRGB":e===ul&&t===hl&&(n="LinearSRGBToLinearDisplayP3"),s){case mi:case Xl:return[n,"LinearTransferOETF"];case Xn:case _f:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function vm(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";let r=/ERROR: 0:(\d+)/.exec(i);if(r){let o=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+ZM(s.getShaderSource(e),o)}else return i}function JM(s,e){let t=KM(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function $M(s,e){let t;switch(e){case ny:t="Linear";break;case iy:t="Reinhard";break;case sy:t="OptimizedCineon";break;case ry:t="ACESFilmic";break;case ay:t="AgX";break;case oy:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function QM(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Go).join(`
`)}function eS(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Go).join(`
`)}function tS(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function nS(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function Go(s){return s!==""}function bm(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Mm(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}function Oh(s){return s.replace(iS,rS)}function rS(s,e){let t=pn[e];if(t===void 0){let n=sS.get(e);if(n!==void 0)t=pn[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Oh(t)}function Sm(s){return s.replace(oS,aS)}function aS(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Em(s){let e="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function cS(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Qm?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Dx?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===tr&&(e="SHADOWMAP_TYPE_VSM"),e}function lS(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case jo:case Zo:e="ENVMAP_TYPE_CUBE";break;case Gl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function uS(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Zo:e="ENVMAP_MODE_REFRACTION";break}return e}function hS(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case mf:e="ENVMAP_BLENDING_MULTIPLY";break;case ey:e="ENVMAP_BLENDING_MIX";break;case ty:e="ENVMAP_BLENDING_ADD";break}return e}function fS(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function dS(s,e,t,n){let i=s.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,c=cS(t),l=lS(t),u=uS(t),h=hS(t),f=fS(t),d=t.isWebGL2?"":QM(t),g=eS(t),y=tS(r),m=i.createProgram(),p,v,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y].filter(Go).join(`
`),p.length>0&&(p+=`
`),v=[d,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y].filter(Go).join(`
`),v.length>0&&(v+=`
`)):(p=[Em(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Go).join(`
`),v=[d,Em(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Sr?"#define TONE_MAPPING":"",t.toneMapping!==Sr?pn.tonemapping_pars_fragment:"",t.toneMapping!==Sr?$M("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",pn.colorspace_pars_fragment,JM("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Go).join(`
`)),o=Oh(o),o=bm(o,t),o=Mm(o,t),a=Oh(a),a=bm(a,t),a=Mm(a,t),o=Sm(o),a=Sm(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,v=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Gp?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Gp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);let E=_+p+o,w=_+v+a,A=_m(i,i.VERTEX_SHADER,E),R=_m(i,i.FRAGMENT_SHADER,w);i.attachShader(m,A),i.attachShader(m,R),t.index0AttributeName!==void 0?i.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m);function O(X){if(s.debug.checkShaderErrors){let ce=i.getProgramInfoLog(m).trim(),N=i.getShaderInfoLog(A).trim(),Z=i.getShaderInfoLog(R).trim(),B=!0,Te=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(B=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,m,A,R);else{let Re=vm(i,A,"vertex"),ne=vm(i,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Program Info Log: `+ce+`
`+Re+`
`+ne)}else ce!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ce):(N===""||Z==="")&&(Te=!1);Te&&(X.diagnostics={runnable:B,programLog:ce,vertexShader:{log:N,prefix:p},fragmentShader:{log:Z,prefix:v}})}i.deleteShader(A),i.deleteShader(R),M=new qo(i,m),P=nS(i,m)}let M;this.getUniforms=function(){return M===void 0&&O(this),M};let P;this.getAttributes=function(){return P===void 0&&O(this),P};let G=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return G===!1&&(G=i.getProgramParameter(m,YM)),G},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=jM++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=A,this.fragmentShader=R,this}function mS(s,e,t,n,i,r,o){let a=new Xa,c=new zh,l=[],u=i.isWebGL2,h=i.logarithmicDepthBuffer,f=i.vertexTextures,d=i.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(M){return M===0?"uv":`uv${M}`}function m(M,P,G,X,ce){let N=X.fog,Z=ce.geometry,B=M.isMeshStandardMaterial?X.environment:null,Te=(M.isMeshStandardMaterial?t:e).get(M.envMap||B),Re=Te&&Te.mapping===Gl?Te.image.height:null,ne=g[M.type];M.precision!==null&&(d=i.getMaxPrecision(M.precision),d!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",d,"instead."));let be=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,qe=be!==void 0?be.length:0,st=0;Z.morphAttributes.position!==void 0&&(st=1),Z.morphAttributes.normal!==void 0&&(st=2),Z.morphAttributes.color!==void 0&&(st=3);let ie,Fe,Ge,Nt;if(ne){let ci=Ps[ne];ie=ci.vertexShader,Fe=ci.fragmentShader}else ie=M.vertexShader,Fe=M.fragmentShader,c.update(M),Ge=c.getVertexShaderID(M),Nt=c.getFragmentShaderID(M);let at=s.getRenderTarget(),Xt=ce.isInstancedMesh===!0,tn=ce.isBatchedMesh===!0,Tt=!!M.map,bn=!!M.matcap,ae=!!Te,vi=!!M.aoMap,Ht=!!M.lightMap,Jt=!!M.bumpMap,At=!!M.normalMap,kn=!!M.displacementMap,sn=!!M.emissiveMap,D=!!M.metalnessMap,C=!!M.roughnessMap,fe=M.anisotropy>0,Ne=M.clearcoat>0,Ie=M.iridescence>0,Ye=M.sheen>0,ft=M.transmission>0,nt=fe&&!!M.anisotropyMap,et=Ne&&!!M.clearcoatMap,Ot=Ne&&!!M.clearcoatNormalMap,qt=Ne&&!!M.clearcoatRoughnessMap,Be=Ie&&!!M.iridescenceMap,wn=Ie&&!!M.iridescenceThicknessMap,cn=Ye&&!!M.sheenColorMap,jt=Ye&&!!M.sheenRoughnessMap,St=!!M.specularMap,ut=!!M.specularColorMap,Vt=!!M.specularIntensityMap,En=ft&&!!M.transmissionMap,ke=ft&&!!M.thicknessMap,Ue=!!M.gradientMap,He=!!M.alphaMap,H=M.alphaTest>0,Je=!!M.alphaHash,We=!!M.extensions,wt=!!Z.attributes.uv1,zt=!!Z.attributes.uv2,ln=!!Z.attributes.uv3,_n=Sr;return M.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(_n=s.toneMapping),{isWebGL2:u,shaderID:ne,shaderType:M.type,shaderName:M.name,vertexShader:ie,fragmentShader:Fe,defines:M.defines,customVertexShaderID:Ge,customFragmentShaderID:Nt,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:d,batching:tn,instancing:Xt,instancingColor:Xt&&ce.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:at===null?s.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:mi,map:Tt,matcap:bn,envMap:ae,envMapMode:ae&&Te.mapping,envMapCubeUVHeight:Re,aoMap:vi,lightMap:Ht,bumpMap:Jt,normalMap:At,displacementMap:f&&kn,emissiveMap:sn,normalMapObjectSpace:At&&M.normalMapType===vy,normalMapTangentSpace:At&&M.normalMapType===yf,metalnessMap:D,roughnessMap:C,anisotropy:fe,anisotropyMap:nt,clearcoat:Ne,clearcoatMap:et,clearcoatNormalMap:Ot,clearcoatRoughnessMap:qt,iridescence:Ie,iridescenceMap:Be,iridescenceThicknessMap:wn,sheen:Ye,sheenColorMap:cn,sheenRoughnessMap:jt,specularMap:St,specularColorMap:ut,specularIntensityMap:Vt,transmission:ft,transmissionMap:En,thicknessMap:ke,gradientMap:Ue,opaque:M.transparent===!1&&M.blending===Wo,alphaMap:He,alphaTest:H,alphaHash:Je,combine:M.combine,mapUv:Tt&&y(M.map.channel),aoMapUv:vi&&y(M.aoMap.channel),lightMapUv:Ht&&y(M.lightMap.channel),bumpMapUv:Jt&&y(M.bumpMap.channel),normalMapUv:At&&y(M.normalMap.channel),displacementMapUv:kn&&y(M.displacementMap.channel),emissiveMapUv:sn&&y(M.emissiveMap.channel),metalnessMapUv:D&&y(M.metalnessMap.channel),roughnessMapUv:C&&y(M.roughnessMap.channel),anisotropyMapUv:nt&&y(M.anisotropyMap.channel),clearcoatMapUv:et&&y(M.clearcoatMap.channel),clearcoatNormalMapUv:Ot&&y(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:qt&&y(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Be&&y(M.iridescenceMap.channel),iridescenceThicknessMapUv:wn&&y(M.iridescenceThicknessMap.channel),sheenColorMapUv:cn&&y(M.sheenColorMap.channel),sheenRoughnessMapUv:jt&&y(M.sheenRoughnessMap.channel),specularMapUv:St&&y(M.specularMap.channel),specularColorMapUv:ut&&y(M.specularColorMap.channel),specularIntensityMapUv:Vt&&y(M.specularIntensityMap.channel),transmissionMapUv:En&&y(M.transmissionMap.channel),thicknessMapUv:ke&&y(M.thicknessMap.channel),alphaMapUv:He&&y(M.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&(At||fe),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,vertexUv1s:wt,vertexUv2s:zt,vertexUv3s:ln,pointsUvs:ce.isPoints===!0&&!!Z.attributes.uv&&(Tt||He),fog:!!N,useFog:M.fog===!0,fogExp2:N&&N.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:ce.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:qe,morphTextureStride:st,numDirLights:P.directional.length,numPointLights:P.point.length,numSpotLights:P.spot.length,numSpotLightMaps:P.spotLightMap.length,numRectAreaLights:P.rectArea.length,numHemiLights:P.hemi.length,numDirLightShadows:P.directionalShadowMap.length,numPointLightShadows:P.pointShadowMap.length,numSpotLightShadows:P.spotShadowMap.length,numSpotLightShadowsWithMaps:P.numSpotLightShadowsWithMaps,numLightProbes:P.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:s.shadowMap.enabled&&G.length>0,shadowMapType:s.shadowMap.type,toneMapping:_n,useLegacyLights:s._useLegacyLights,decodeVideoTexture:Tt&&M.map.isVideoTexture===!0&&An.getTransfer(M.map.colorSpace)===Wn,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Ti,flipSided:M.side===Bi,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:We&&M.extensions.derivatives===!0,extensionFragDepth:We&&M.extensions.fragDepth===!0,extensionDrawBuffers:We&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:We&&M.extensions.shaderTextureLOD===!0,extensionClipCullDistance:We&&M.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function p(M){let P=[];if(M.shaderID?P.push(M.shaderID):(P.push(M.customVertexShaderID),P.push(M.customFragmentShaderID)),M.defines!==void 0)for(let G in M.defines)P.push(G),P.push(M.defines[G]);return M.isRawShaderMaterial===!1&&(v(P,M),_(P,M),P.push(s.outputColorSpace)),P.push(M.customProgramCacheKey),P.join()}function v(M,P){M.push(P.precision),M.push(P.outputColorSpace),M.push(P.envMapMode),M.push(P.envMapCubeUVHeight),M.push(P.mapUv),M.push(P.alphaMapUv),M.push(P.lightMapUv),M.push(P.aoMapUv),M.push(P.bumpMapUv),M.push(P.normalMapUv),M.push(P.displacementMapUv),M.push(P.emissiveMapUv),M.push(P.metalnessMapUv),M.push(P.roughnessMapUv),M.push(P.anisotropyMapUv),M.push(P.clearcoatMapUv),M.push(P.clearcoatNormalMapUv),M.push(P.clearcoatRoughnessMapUv),M.push(P.iridescenceMapUv),M.push(P.iridescenceThicknessMapUv),M.push(P.sheenColorMapUv),M.push(P.sheenRoughnessMapUv),M.push(P.specularMapUv),M.push(P.specularColorMapUv),M.push(P.specularIntensityMapUv),M.push(P.transmissionMapUv),M.push(P.thicknessMapUv),M.push(P.combine),M.push(P.fogExp2),M.push(P.sizeAttenuation),M.push(P.morphTargetsCount),M.push(P.morphAttributeCount),M.push(P.numDirLights),M.push(P.numPointLights),M.push(P.numSpotLights),M.push(P.numSpotLightMaps),M.push(P.numHemiLights),M.push(P.numRectAreaLights),M.push(P.numDirLightShadows),M.push(P.numPointLightShadows),M.push(P.numSpotLightShadows),M.push(P.numSpotLightShadowsWithMaps),M.push(P.numLightProbes),M.push(P.shadowMapType),M.push(P.toneMapping),M.push(P.numClippingPlanes),M.push(P.numClipIntersection),M.push(P.depthPacking)}function _(M,P){a.disableAll(),P.isWebGL2&&a.enable(0),P.supportsVertexTextures&&a.enable(1),P.instancing&&a.enable(2),P.instancingColor&&a.enable(3),P.matcap&&a.enable(4),P.envMap&&a.enable(5),P.normalMapObjectSpace&&a.enable(6),P.normalMapTangentSpace&&a.enable(7),P.clearcoat&&a.enable(8),P.iridescence&&a.enable(9),P.alphaTest&&a.enable(10),P.vertexColors&&a.enable(11),P.vertexAlphas&&a.enable(12),P.vertexUv1s&&a.enable(13),P.vertexUv2s&&a.enable(14),P.vertexUv3s&&a.enable(15),P.vertexTangents&&a.enable(16),P.anisotropy&&a.enable(17),P.alphaHash&&a.enable(18),P.batching&&a.enable(19),M.push(a.mask),a.disableAll(),P.fog&&a.enable(0),P.useFog&&a.enable(1),P.flatShading&&a.enable(2),P.logarithmicDepthBuffer&&a.enable(3),P.skinning&&a.enable(4),P.morphTargets&&a.enable(5),P.morphNormals&&a.enable(6),P.morphColors&&a.enable(7),P.premultipliedAlpha&&a.enable(8),P.shadowMapEnabled&&a.enable(9),P.useLegacyLights&&a.enable(10),P.doubleSided&&a.enable(11),P.flipSided&&a.enable(12),P.useDepthPacking&&a.enable(13),P.dithering&&a.enable(14),P.transmission&&a.enable(15),P.sheen&&a.enable(16),P.opaque&&a.enable(17),P.pointsUvs&&a.enable(18),P.decodeVideoTexture&&a.enable(19),M.push(a.mask)}function E(M){let P=g[M.type],G;if(P){let X=Ps[P];G=s_.clone(X.uniforms)}else G=M.uniforms;return G}function w(M,P){let G;for(let X=0,ce=l.length;X<ce;X++){let N=l[X];if(N.cacheKey===P){G=N,++G.usedTimes;break}}return G===void 0&&(G=new dS(s,P,M,r),l.push(G)),G}function A(M){if(--M.usedTimes===0){let P=l.indexOf(M);l[P]=l[l.length-1],l.pop(),M.destroy()}}function R(M){c.remove(M)}function O(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:E,acquireProgram:w,releaseProgram:A,releaseShaderCache:R,programs:l,dispose:O}}function gS(){let s=new WeakMap;function e(r){let o=s.get(r);return o===void 0&&(o={},s.set(r,o)),o}function t(r){s.delete(r)}function n(r,o,a){s.get(r)[o]=a}function i(){s=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function xS(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Tm(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function wm(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(h,f,d,g,y,m){let p=s[e];return p===void 0?(p={id:h.id,object:h,geometry:f,material:d,groupOrder:g,renderOrder:h.renderOrder,z:y,group:m},s[e]=p):(p.id=h.id,p.object=h,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=y,p.group=m),e++,p}function a(h,f,d,g,y,m){let p=o(h,f,d,g,y,m);d.transmission>0?n.push(p):d.transparent===!0?i.push(p):t.push(p)}function c(h,f,d,g,y,m){let p=o(h,f,d,g,y,m);d.transmission>0?n.unshift(p):d.transparent===!0?i.unshift(p):t.unshift(p)}function l(h,f){t.length>1&&t.sort(h||xS),n.length>1&&n.sort(f||Tm),i.length>1&&i.sort(f||Tm)}function u(){for(let h=e,f=s.length;h<f;h++){let d=s[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:a,unshift:c,finish:u,sort:l}}function yS(){let s=new WeakMap;function e(n,i){let r=s.get(n),o;return r===void 0?(o=new wm,s.set(n,[o])):i>=r.length?(o=new wm,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function _S(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new T,color:new It};break;case"SpotLight":t={position:new T,direction:new T,color:new It,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new T,color:new It,distance:0,decay:0};break;case"HemisphereLight":t={direction:new T,skyColor:new It,groundColor:new It};break;case"RectAreaLight":t={color:new It,position:new T,halfWidth:new T,halfHeight:new T};break}return s[e.id]=t,t}}}function vS(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}function MS(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function SS(s,e){let t=new _S,n=vS(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new T);let r=new T,o=new Et,a=new Et;function c(u,h){let f=0,d=0,g=0;for(let X=0;X<9;X++)i.probe[X].set(0,0,0);let y=0,m=0,p=0,v=0,_=0,E=0,w=0,A=0,R=0,O=0,M=0;u.sort(MS);let P=h===!0?Math.PI:1;for(let X=0,ce=u.length;X<ce;X++){let N=u[X],Z=N.color,B=N.intensity,Te=N.distance,Re=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)f+=Z.r*B*P,d+=Z.g*B*P,g+=Z.b*B*P;else if(N.isLightProbe){for(let ne=0;ne<9;ne++)i.probe[ne].addScaledVector(N.sh.coefficients[ne],B);M++}else if(N.isDirectionalLight){let ne=t.get(N);if(ne.color.copy(N.color).multiplyScalar(N.intensity*P),N.castShadow){let be=N.shadow,qe=n.get(N);qe.shadowBias=be.bias,qe.shadowNormalBias=be.normalBias,qe.shadowRadius=be.radius,qe.shadowMapSize=be.mapSize,i.directionalShadow[y]=qe,i.directionalShadowMap[y]=Re,i.directionalShadowMatrix[y]=N.shadow.matrix,E++}i.directional[y]=ne,y++}else if(N.isSpotLight){let ne=t.get(N);ne.position.setFromMatrixPosition(N.matrixWorld),ne.color.copy(Z).multiplyScalar(B*P),ne.distance=Te,ne.coneCos=Math.cos(N.angle),ne.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),ne.decay=N.decay,i.spot[p]=ne;let be=N.shadow;if(N.map&&(i.spotLightMap[R]=N.map,R++,be.updateMatrices(N),N.castShadow&&O++),i.spotLightMatrix[p]=be.matrix,N.castShadow){let qe=n.get(N);qe.shadowBias=be.bias,qe.shadowNormalBias=be.normalBias,qe.shadowRadius=be.radius,qe.shadowMapSize=be.mapSize,i.spotShadow[p]=qe,i.spotShadowMap[p]=Re,A++}p++}else if(N.isRectAreaLight){let ne=t.get(N);ne.color.copy(Z).multiplyScalar(B),ne.halfWidth.set(N.width*.5,0,0),ne.halfHeight.set(0,N.height*.5,0),i.rectArea[v]=ne,v++}else if(N.isPointLight){let ne=t.get(N);if(ne.color.copy(N.color).multiplyScalar(N.intensity*P),ne.distance=N.distance,ne.decay=N.decay,N.castShadow){let be=N.shadow,qe=n.get(N);qe.shadowBias=be.bias,qe.shadowNormalBias=be.normalBias,qe.shadowRadius=be.radius,qe.shadowMapSize=be.mapSize,qe.shadowCameraNear=be.camera.near,qe.shadowCameraFar=be.camera.far,i.pointShadow[m]=qe,i.pointShadowMap[m]=Re,i.pointShadowMatrix[m]=N.shadow.matrix,w++}i.point[m]=ne,m++}else if(N.isHemisphereLight){let ne=t.get(N);ne.skyColor.copy(N.color).multiplyScalar(B*P),ne.groundColor.copy(N.groundColor).multiplyScalar(B*P),i.hemi[_]=ne,_++}}v>0&&(e.isWebGL2?s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=tt.LTC_FLOAT_1,i.rectAreaLTC2=tt.LTC_FLOAT_2):(i.rectAreaLTC1=tt.LTC_HALF_1,i.rectAreaLTC2=tt.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=tt.LTC_FLOAT_1,i.rectAreaLTC2=tt.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=tt.LTC_HALF_1,i.rectAreaLTC2=tt.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=f,i.ambient[1]=d,i.ambient[2]=g;let G=i.hash;(G.directionalLength!==y||G.pointLength!==m||G.spotLength!==p||G.rectAreaLength!==v||G.hemiLength!==_||G.numDirectionalShadows!==E||G.numPointShadows!==w||G.numSpotShadows!==A||G.numSpotMaps!==R||G.numLightProbes!==M)&&(i.directional.length=y,i.spot.length=p,i.rectArea.length=v,i.point.length=m,i.hemi.length=_,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=A,i.spotShadowMap.length=A,i.directionalShadowMatrix.length=E,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=A+R-O,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=O,i.numLightProbes=M,G.directionalLength=y,G.pointLength=m,G.spotLength=p,G.rectAreaLength=v,G.hemiLength=_,G.numDirectionalShadows=E,G.numPointShadows=w,G.numSpotShadows=A,G.numSpotMaps=R,G.numLightProbes=M,i.version=bS++)}function l(u,h){let f=0,d=0,g=0,y=0,m=0,p=h.matrixWorldInverse;for(let v=0,_=u.length;v<_;v++){let E=u[v];if(E.isDirectionalLight){let w=i.directional[f];w.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(p),f++}else if(E.isSpotLight){let w=i.spot[g];w.position.setFromMatrixPosition(E.matrixWorld),w.position.applyMatrix4(p),w.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(p),g++}else if(E.isRectAreaLight){let w=i.rectArea[y];w.position.setFromMatrixPosition(E.matrixWorld),w.position.applyMatrix4(p),a.identity(),o.copy(E.matrixWorld),o.premultiply(p),a.extractRotation(o),w.halfWidth.set(E.width*.5,0,0),w.halfHeight.set(0,E.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),y++}else if(E.isPointLight){let w=i.point[d];w.position.setFromMatrixPosition(E.matrixWorld),w.position.applyMatrix4(p),d++}else if(E.isHemisphereLight){let w=i.hemi[m];w.direction.setFromMatrixPosition(E.matrixWorld),w.direction.transformDirection(p),m++}}}return{setup:c,setupView:l,state:i}}function Am(s,e){let t=new SS(s,e),n=[],i=[];function r(){n.length=0,i.length=0}function o(h){n.push(h)}function a(h){i.push(h)}function c(h){t.setup(n,h)}function l(h){t.setupView(n,h)}return{init:r,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function ES(s,e){let t=new WeakMap;function n(r,o=0){let a=t.get(r),c;return a===void 0?(c=new Am(s,e),t.set(r,[c])):o>=a.length?(c=new Am(s,e),a.push(c)):c=a[o],c}function i(){t=new WeakMap}return{get:n,dispose:i}}function AS(s,e,t){let n=new Ar,i=new ot,r=new ot,o=new Bn,a=new Hh({depthPacking:_y}),c=new Vh,l={},u=t.maxTextureSize,h={[Gi]:Bi,[Bi]:Gi,[Ti]:Ti},f=new Xi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ot},radius:{value:4}},vertexShader:TS,fragmentShader:wS}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let g=new wi;g.setAttribute("position",new Pn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new Rn(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Qm;let p=this.type;this.render=function(A,R,O){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;let M=s.getRenderTarget(),P=s.getActiveCubeFace(),G=s.getActiveMipmapLevel(),X=s.state;X.setBlending(Mr),X.buffers.color.setClear(1,1,1,1),X.buffers.depth.setTest(!0),X.setScissorTest(!1);let ce=p!==tr&&this.type===tr,N=p===tr&&this.type!==tr;for(let Z=0,B=A.length;Z<B;Z++){let Te=A[Z],Re=Te.shadow;if(Re===void 0){console.warn("THREE.WebGLShadowMap:",Te,"has no shadow.");continue}if(Re.autoUpdate===!1&&Re.needsUpdate===!1)continue;i.copy(Re.mapSize);let ne=Re.getFrameExtents();if(i.multiply(ne),r.copy(Re.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(r.x=Math.floor(u/ne.x),i.x=r.x*ne.x,Re.mapSize.x=r.x),i.y>u&&(r.y=Math.floor(u/ne.y),i.y=r.y*ne.y,Re.mapSize.y=r.y)),Re.map===null||ce===!0||N===!0){let qe=this.type!==tr?{minFilter:fi,magFilter:fi}:{};Re.map!==null&&Re.map.dispose(),Re.map=new ds(i.x,i.y,qe),Re.map.texture.name=Te.name+".shadowMap",Re.camera.updateProjectionMatrix()}s.setRenderTarget(Re.map),s.clear();let be=Re.getViewportCount();for(let qe=0;qe<be;qe++){let st=Re.getViewport(qe);o.set(r.x*st.x,r.y*st.y,r.x*st.z,r.y*st.w),X.viewport(o),Re.updateMatrices(Te,qe),n=Re.getFrustum(),E(R,O,Re.camera,Te,this.type)}Re.isPointLightShadow!==!0&&this.type===tr&&v(Re,O),Re.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(M,P,G)};function v(A,R){let O=e.update(y);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,d.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new ds(i.x,i.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,s.setRenderTarget(A.mapPass),s.clear(),s.renderBufferDirect(R,null,O,f,y,null),d.uniforms.shadow_pass.value=A.mapPass.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,s.setRenderTarget(A.map),s.clear(),s.renderBufferDirect(R,null,O,d,y,null)}function _(A,R,O,M){let P=null,G=O.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(G!==void 0)P=G;else if(P=O.isPointLight===!0?c:a,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){let X=P.uuid,ce=R.uuid,N=l[X];N===void 0&&(N={},l[X]=N);let Z=N[ce];Z===void 0&&(Z=P.clone(),N[ce]=Z,R.addEventListener("dispose",w)),P=Z}if(P.visible=R.visible,P.wireframe=R.wireframe,M===tr?P.side=R.shadowSide!==null?R.shadowSide:R.side:P.side=R.shadowSide!==null?R.shadowSide:h[R.side],P.alphaMap=R.alphaMap,P.alphaTest=R.alphaTest,P.map=R.map,P.clipShadows=R.clipShadows,P.clippingPlanes=R.clippingPlanes,P.clipIntersection=R.clipIntersection,P.displacementMap=R.displacementMap,P.displacementScale=R.displacementScale,P.displacementBias=R.displacementBias,P.wireframeLinewidth=R.wireframeLinewidth,P.linewidth=R.linewidth,O.isPointLight===!0&&P.isMeshDistanceMaterial===!0){let X=s.properties.get(P);X.light=O}return P}function E(A,R,O,M,P){if(A.visible===!1)return;if(A.layers.test(R.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&P===tr)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,A.matrixWorld);let ce=e.update(A),N=A.material;if(Array.isArray(N)){let Z=ce.groups;for(let B=0,Te=Z.length;B<Te;B++){let Re=Z[B],ne=N[Re.materialIndex];if(ne&&ne.visible){let be=_(A,ne,M,P);A.onBeforeShadow(s,A,R,O,ce,be,Re),s.renderBufferDirect(O,null,ce,be,A,Re),A.onAfterShadow(s,A,R,O,ce,be,Re)}}}else if(N.visible){let Z=_(A,N,M,P);A.onBeforeShadow(s,A,R,O,ce,Z,null),s.renderBufferDirect(O,null,ce,Z,A,null),A.onAfterShadow(s,A,R,O,ce,Z,null)}}let X=A.children;for(let ce=0,N=X.length;ce<N;ce++)E(X[ce],R,O,M,P)}function w(A){A.target.removeEventListener("dispose",w);for(let O in l){let M=l[O],P=A.target.uuid;P in M&&(M[P].dispose(),delete M[P])}}}function RS(s,e,t){let n=t.isWebGL2;function i(){let H=!1,Je=new Bn,We=null,wt=new Bn(0,0,0,0);return{setMask:function(zt){We!==zt&&!H&&(s.colorMask(zt,zt,zt,zt),We=zt)},setLocked:function(zt){H=zt},setClear:function(zt,ln,_n,Jn,ci){ci===!0&&(zt*=Jn,ln*=Jn,_n*=Jn),Je.set(zt,ln,_n,Jn),wt.equals(Je)===!1&&(s.clearColor(zt,ln,_n,Jn),wt.copy(Je))},reset:function(){H=!1,We=null,wt.set(-1,0,0,0)}}}function r(){let H=!1,Je=null,We=null,wt=null;return{setTest:function(zt){zt?tn(s.DEPTH_TEST):Tt(s.DEPTH_TEST)},setMask:function(zt){Je!==zt&&!H&&(s.depthMask(zt),Je=zt)},setFunc:function(zt){if(We!==zt){switch(zt){case jx:s.depthFunc(s.NEVER);break;case Zx:s.depthFunc(s.ALWAYS);break;case Kx:s.depthFunc(s.LESS);break;case al:s.depthFunc(s.LEQUAL);break;case Jx:s.depthFunc(s.EQUAL);break;case $x:s.depthFunc(s.GEQUAL);break;case pf:s.depthFunc(s.GREATER);break;case Qx:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}We=zt}},setLocked:function(zt){H=zt},setClear:function(zt){wt!==zt&&(s.clearDepth(zt),wt=zt)},reset:function(){H=!1,Je=null,We=null,wt=null}}}function o(){let H=!1,Je=null,We=null,wt=null,zt=null,ln=null,_n=null,Jn=null,ci=null;return{setTest:function(In){H||(In?tn(s.STENCIL_TEST):Tt(s.STENCIL_TEST))},setMask:function(In){Je!==In&&!H&&(s.stencilMask(In),Je=In)},setFunc:function(In,bi,ts){(We!==In||wt!==bi||zt!==ts)&&(s.stencilFunc(In,bi,ts),We=In,wt=bi,zt=ts)},setOp:function(In,bi,ts){(ln!==In||_n!==bi||Jn!==ts)&&(s.stencilOp(In,bi,ts),ln=In,_n=bi,Jn=ts)},setLocked:function(In){H=In},setClear:function(In){ci!==In&&(s.clearStencil(In),ci=In)},reset:function(){H=!1,Je=null,We=null,wt=null,zt=null,ln=null,_n=null,Jn=null,ci=null}}}let a=new i,c=new r,l=new o,u=new WeakMap,h=new WeakMap,f={},d={},g=new WeakMap,y=[],m=null,p=!1,v=null,_=null,E=null,w=null,A=null,R=null,O=null,M=new It(0,0,0),P=0,G=!1,X=null,ce=null,N=null,Z=null,B=null,Te=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Re=!1,ne=0,be=s.getParameter(s.VERSION);be.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(be)[1]),Re=ne>=1):be.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(be)[1]),Re=ne>=2);let qe=null,st={},ie=s.getParameter(s.SCISSOR_BOX),Fe=s.getParameter(s.VIEWPORT),Ge=new Bn().fromArray(ie),Nt=new Bn().fromArray(Fe);function at(H,Je,We,wt){let zt=new Uint8Array(4),ln=s.createTexture();s.bindTexture(H,ln),s.texParameteri(H,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(H,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let _n=0;_n<We;_n++)n&&(H===s.TEXTURE_3D||H===s.TEXTURE_2D_ARRAY)?s.texImage3D(Je,0,s.RGBA,1,1,wt,0,s.RGBA,s.UNSIGNED_BYTE,zt):s.texImage2D(Je+_n,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,zt);return ln}let Xt={};Xt[s.TEXTURE_2D]=at(s.TEXTURE_2D,s.TEXTURE_2D,1),Xt[s.TEXTURE_CUBE_MAP]=at(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Xt[s.TEXTURE_2D_ARRAY]=at(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Xt[s.TEXTURE_3D]=at(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),c.setClear(1),l.setClear(0),tn(s.DEPTH_TEST),c.setFunc(al),sn(!1),D(ap),tn(s.CULL_FACE),At(Mr);function tn(H){f[H]!==!0&&(s.enable(H),f[H]=!0)}function Tt(H){f[H]!==!1&&(s.disable(H),f[H]=!1)}function bn(H,Je){return d[H]!==Je?(s.bindFramebuffer(H,Je),d[H]=Je,n&&(H===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=Je),H===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=Je)),!0):!1}function ae(H,Je){let We=y,wt=!1;if(H)if(We=g.get(Je),We===void 0&&(We=[],g.set(Je,We)),H.isWebGLMultipleRenderTargets){let zt=H.texture;if(We.length!==zt.length||We[0]!==s.COLOR_ATTACHMENT0){for(let ln=0,_n=zt.length;ln<_n;ln++)We[ln]=s.COLOR_ATTACHMENT0+ln;We.length=zt.length,wt=!0}}else We[0]!==s.COLOR_ATTACHMENT0&&(We[0]=s.COLOR_ATTACHMENT0,wt=!0);else We[0]!==s.BACK&&(We[0]=s.BACK,wt=!0);wt&&(t.isWebGL2?s.drawBuffers(We):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(We))}function vi(H){return m!==H?(s.useProgram(H),m=H,!0):!1}let Ht={[Is]:s.FUNC_ADD,[Ux]:s.FUNC_SUBTRACT,[Fx]:s.FUNC_REVERSE_SUBTRACT};if(n)Ht[hp]=s.MIN,Ht[fp]=s.MAX;else{let H=e.get("EXT_blend_minmax");H!==null&&(Ht[hp]=H.MIN_EXT,Ht[fp]=H.MAX_EXT)}let Jt={[Hl]:s.ZERO,[Vl]:s.ONE,[Bx]:s.SRC_COLOR,[Yo]:s.SRC_ALPHA,[Gx]:s.SRC_ALPHA_SATURATE,[Hx]:s.DST_COLOR,[zx]:s.DST_ALPHA,[Ox]:s.ONE_MINUS_SRC_COLOR,[Th]:s.ONE_MINUS_SRC_ALPHA,[Vx]:s.ONE_MINUS_DST_COLOR,[kx]:s.ONE_MINUS_DST_ALPHA,[Wx]:s.CONSTANT_COLOR,[Xx]:s.ONE_MINUS_CONSTANT_COLOR,[qx]:s.CONSTANT_ALPHA,[Yx]:s.ONE_MINUS_CONSTANT_ALPHA};function At(H,Je,We,wt,zt,ln,_n,Jn,ci,In){if(H===Mr){p===!0&&(Tt(s.BLEND),p=!1);return}if(p===!1&&(tn(s.BLEND),p=!0),H!==kl){if(H!==v||In!==G){if((_!==Is||A!==Is)&&(s.blendEquation(s.FUNC_ADD),_=Is,A=Is),In)switch(H){case Wo:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case cp:s.blendFunc(s.ONE,s.ONE);break;case lp:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case up:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}else switch(H){case Wo:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case cp:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case lp:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case up:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}E=null,w=null,R=null,O=null,M.set(0,0,0),P=0,v=H,G=In}return}zt=zt||Je,ln=ln||We,_n=_n||wt,(Je!==_||zt!==A)&&(s.blendEquationSeparate(Ht[Je],Ht[zt]),_=Je,A=zt),(We!==E||wt!==w||ln!==R||_n!==O)&&(s.blendFuncSeparate(Jt[We],Jt[wt],Jt[ln],Jt[_n]),E=We,w=wt,R=ln,O=_n),(Jn.equals(M)===!1||ci!==P)&&(s.blendColor(Jn.r,Jn.g,Jn.b,ci),M.copy(Jn),P=ci),v=H,G=!1}function kn(H,Je){H.side===Ti?Tt(s.CULL_FACE):tn(s.CULL_FACE);let We=H.side===Bi;Je&&(We=!We),sn(We),H.blending===Wo&&H.transparent===!1?At(Mr):At(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),c.setFunc(H.depthFunc),c.setTest(H.depthTest),c.setMask(H.depthWrite),a.setMask(H.colorWrite);let wt=H.stencilWrite;l.setTest(wt),wt&&(l.setMask(H.stencilWriteMask),l.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),l.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),fe(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?tn(s.SAMPLE_ALPHA_TO_COVERAGE):Tt(s.SAMPLE_ALPHA_TO_COVERAGE)}function sn(H){X!==H&&(H?s.frontFace(s.CW):s.frontFace(s.CCW),X=H)}function D(H){H!==Lx?(tn(s.CULL_FACE),H!==ce&&(H===ap?s.cullFace(s.BACK):H===Nx?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Tt(s.CULL_FACE),ce=H}function C(H){H!==N&&(Re&&s.lineWidth(H),N=H)}function fe(H,Je,We){H?(tn(s.POLYGON_OFFSET_FILL),(Z!==Je||B!==We)&&(s.polygonOffset(Je,We),Z=Je,B=We)):Tt(s.POLYGON_OFFSET_FILL)}function Ne(H){H?tn(s.SCISSOR_TEST):Tt(s.SCISSOR_TEST)}function Ie(H){H===void 0&&(H=s.TEXTURE0+Te-1),qe!==H&&(s.activeTexture(H),qe=H)}function Ye(H,Je,We){We===void 0&&(qe===null?We=s.TEXTURE0+Te-1:We=qe);let wt=st[We];wt===void 0&&(wt={type:void 0,texture:void 0},st[We]=wt),(wt.type!==H||wt.texture!==Je)&&(qe!==We&&(s.activeTexture(We),qe=We),s.bindTexture(H,Je||Xt[H]),wt.type=H,wt.texture=Je)}function ft(){let H=st[qe];H!==void 0&&H.type!==void 0&&(s.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function nt(){try{s.compressedTexImage2D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function et(){try{s.compressedTexImage3D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Ot(){try{s.texSubImage2D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function qt(){try{s.texSubImage3D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Be(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function wn(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function cn(){try{s.texStorage2D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function jt(){try{s.texStorage3D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function St(){try{s.texImage2D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ut(){try{s.texImage3D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Vt(H){Ge.equals(H)===!1&&(s.scissor(H.x,H.y,H.z,H.w),Ge.copy(H))}function En(H){Nt.equals(H)===!1&&(s.viewport(H.x,H.y,H.z,H.w),Nt.copy(H))}function ke(H,Je){let We=h.get(Je);We===void 0&&(We=new WeakMap,h.set(Je,We));let wt=We.get(H);wt===void 0&&(wt=s.getUniformBlockIndex(Je,H.name),We.set(H,wt))}function Ue(H,Je){let wt=h.get(Je).get(H);u.get(Je)!==wt&&(s.uniformBlockBinding(Je,wt,H.__bindingPointIndex),u.set(Je,wt))}function He(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),n===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),f={},qe=null,st={},d={},g=new WeakMap,y=[],m=null,p=!1,v=null,_=null,E=null,w=null,A=null,R=null,O=null,M=new It(0,0,0),P=0,G=!1,X=null,ce=null,N=null,Z=null,B=null,Ge.set(0,0,s.canvas.width,s.canvas.height),Nt.set(0,0,s.canvas.width,s.canvas.height),a.reset(),c.reset(),l.reset()}return{buffers:{color:a,depth:c,stencil:l},enable:tn,disable:Tt,bindFramebuffer:bn,drawBuffers:ae,useProgram:vi,setBlending:At,setMaterial:kn,setFlipSided:sn,setCullFace:D,setLineWidth:C,setPolygonOffset:fe,setScissorTest:Ne,activeTexture:Ie,bindTexture:Ye,unbindTexture:ft,compressedTexImage2D:nt,compressedTexImage3D:et,texImage2D:St,texImage3D:ut,updateUBOMapping:ke,uniformBlockBinding:Ue,texStorage2D:cn,texStorage3D:jt,texSubImage2D:Ot,texSubImage3D:qt,compressedTexSubImage2D:Be,compressedTexSubImage3D:wn,scissor:Vt,viewport:En,reset:He}}function CS(s,e,t,n,i,r,o){let a=i.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap,h,f=new WeakMap,d=!1;try{d=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(D,C){return d?new OffscreenCanvas(D,C):Wa("canvas")}function y(D,C,fe,Ne){let Ie=1;if((D.width>Ne||D.height>Ne)&&(Ie=Ne/Math.max(D.width,D.height)),Ie<1||C===!0)if(typeof HTMLImageElement!="undefined"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&D instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&D instanceof ImageBitmap){let Ye=C?fl:Math.floor,ft=Ye(Ie*D.width),nt=Ye(Ie*D.height);h===void 0&&(h=g(ft,nt));let et=fe?g(ft,nt):h;return et.width=ft,et.height=nt,et.getContext("2d").drawImage(D,0,0,ft,nt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+D.width+"x"+D.height+") to ("+ft+"x"+nt+")."),et}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+D.width+"x"+D.height+")."),D;return D}function m(D){return Ph(D.width)&&Ph(D.height)}function p(D){return a?!1:D.wrapS!==os||D.wrapT!==os||D.minFilter!==fi&&D.minFilter!==Vi}function v(D,C){return D.generateMipmaps&&C&&D.minFilter!==fi&&D.minFilter!==Vi}function _(D){s.generateMipmap(D)}function E(D,C,fe,Ne,Ie=!1){if(a===!1)return C;if(D!==null){if(s[D]!==void 0)return s[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let Ye=C;if(C===s.RED&&(fe===s.FLOAT&&(Ye=s.R32F),fe===s.HALF_FLOAT&&(Ye=s.R16F),fe===s.UNSIGNED_BYTE&&(Ye=s.R8)),C===s.RED_INTEGER&&(fe===s.UNSIGNED_BYTE&&(Ye=s.R8UI),fe===s.UNSIGNED_SHORT&&(Ye=s.R16UI),fe===s.UNSIGNED_INT&&(Ye=s.R32UI),fe===s.BYTE&&(Ye=s.R8I),fe===s.SHORT&&(Ye=s.R16I),fe===s.INT&&(Ye=s.R32I)),C===s.RG&&(fe===s.FLOAT&&(Ye=s.RG32F),fe===s.HALF_FLOAT&&(Ye=s.RG16F),fe===s.UNSIGNED_BYTE&&(Ye=s.RG8)),C===s.RGBA){let ft=Ie?ll:An.getTransfer(Ne);fe===s.FLOAT&&(Ye=s.RGBA32F),fe===s.HALF_FLOAT&&(Ye=s.RGBA16F),fe===s.UNSIGNED_BYTE&&(Ye=ft===Wn?s.SRGB8_ALPHA8:s.RGBA8),fe===s.UNSIGNED_SHORT_4_4_4_4&&(Ye=s.RGBA4),fe===s.UNSIGNED_SHORT_5_5_5_1&&(Ye=s.RGB5_A1)}return(Ye===s.R16F||Ye===s.R32F||Ye===s.RG16F||Ye===s.RG32F||Ye===s.RGBA16F||Ye===s.RGBA32F)&&e.get("EXT_color_buffer_float"),Ye}function w(D,C,fe){return v(D,fe)===!0||D.isFramebufferTexture&&D.minFilter!==fi&&D.minFilter!==Vi?Math.log2(Math.max(C.width,C.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?C.mipmaps.length:1}function A(D){return D===fi||D===cl||D===Ua?s.NEAREST:s.LINEAR}function R(D){let C=D.target;C.removeEventListener("dispose",R),M(C),C.isVideoTexture&&u.delete(C)}function O(D){let C=D.target;C.removeEventListener("dispose",O),G(C)}function M(D){let C=n.get(D);if(C.__webglInit===void 0)return;let fe=D.source,Ne=f.get(fe);if(Ne){let Ie=Ne[C.__cacheKey];Ie.usedTimes--,Ie.usedTimes===0&&P(D),Object.keys(Ne).length===0&&f.delete(fe)}n.remove(D)}function P(D){let C=n.get(D);s.deleteTexture(C.__webglTexture);let fe=D.source,Ne=f.get(fe);delete Ne[C.__cacheKey],o.memory.textures--}function G(D){let C=D.texture,fe=n.get(D),Ne=n.get(C);if(Ne.__webglTexture!==void 0&&(s.deleteTexture(Ne.__webglTexture),o.memory.textures--),D.depthTexture&&D.depthTexture.dispose(),D.isWebGLCubeRenderTarget)for(let Ie=0;Ie<6;Ie++){if(Array.isArray(fe.__webglFramebuffer[Ie]))for(let Ye=0;Ye<fe.__webglFramebuffer[Ie].length;Ye++)s.deleteFramebuffer(fe.__webglFramebuffer[Ie][Ye]);else s.deleteFramebuffer(fe.__webglFramebuffer[Ie]);fe.__webglDepthbuffer&&s.deleteRenderbuffer(fe.__webglDepthbuffer[Ie])}else{if(Array.isArray(fe.__webglFramebuffer))for(let Ie=0;Ie<fe.__webglFramebuffer.length;Ie++)s.deleteFramebuffer(fe.__webglFramebuffer[Ie]);else s.deleteFramebuffer(fe.__webglFramebuffer);if(fe.__webglDepthbuffer&&s.deleteRenderbuffer(fe.__webglDepthbuffer),fe.__webglMultisampledFramebuffer&&s.deleteFramebuffer(fe.__webglMultisampledFramebuffer),fe.__webglColorRenderbuffer)for(let Ie=0;Ie<fe.__webglColorRenderbuffer.length;Ie++)fe.__webglColorRenderbuffer[Ie]&&s.deleteRenderbuffer(fe.__webglColorRenderbuffer[Ie]);fe.__webglDepthRenderbuffer&&s.deleteRenderbuffer(fe.__webglDepthRenderbuffer)}if(D.isWebGLMultipleRenderTargets)for(let Ie=0,Ye=C.length;Ie<Ye;Ie++){let ft=n.get(C[Ie]);ft.__webglTexture&&(s.deleteTexture(ft.__webglTexture),o.memory.textures--),n.remove(C[Ie])}n.remove(C),n.remove(D)}let X=0;function ce(){X=0}function N(){let D=X;return D>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+i.maxTextures),X+=1,D}function Z(D){let C=[];return C.push(D.wrapS),C.push(D.wrapT),C.push(D.wrapR||0),C.push(D.magFilter),C.push(D.minFilter),C.push(D.anisotropy),C.push(D.internalFormat),C.push(D.format),C.push(D.type),C.push(D.generateMipmaps),C.push(D.premultiplyAlpha),C.push(D.flipY),C.push(D.unpackAlignment),C.push(D.colorSpace),C.join()}function B(D,C){let fe=n.get(D);if(D.isVideoTexture&&kn(D),D.isRenderTargetTexture===!1&&D.version>0&&fe.__version!==D.version){let Ne=D.image;if(Ne===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Ne.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ge(fe,D,C);return}}t.bindTexture(s.TEXTURE_2D,fe.__webglTexture,s.TEXTURE0+C)}function Te(D,C){let fe=n.get(D);if(D.version>0&&fe.__version!==D.version){Ge(fe,D,C);return}t.bindTexture(s.TEXTURE_2D_ARRAY,fe.__webglTexture,s.TEXTURE0+C)}function Re(D,C){let fe=n.get(D);if(D.version>0&&fe.__version!==D.version){Ge(fe,D,C);return}t.bindTexture(s.TEXTURE_3D,fe.__webglTexture,s.TEXTURE0+C)}function ne(D,C){let fe=n.get(D);if(D.version>0&&fe.__version!==D.version){Nt(fe,D,C);return}t.bindTexture(s.TEXTURE_CUBE_MAP,fe.__webglTexture,s.TEXTURE0+C)}let be={[io]:s.REPEAT,[os]:s.CLAMP_TO_EDGE,[Va]:s.MIRRORED_REPEAT},qe={[fi]:s.NEAREST,[cl]:s.NEAREST_MIPMAP_NEAREST,[Ua]:s.NEAREST_MIPMAP_LINEAR,[Vi]:s.LINEAR,[gf]:s.LINEAR_MIPMAP_NEAREST,[Tr]:s.LINEAR_MIPMAP_LINEAR},st={[by]:s.NEVER,[Ay]:s.ALWAYS,[My]:s.LESS,[u0]:s.LEQUAL,[Sy]:s.EQUAL,[wy]:s.GEQUAL,[Ey]:s.GREATER,[Ty]:s.NOTEQUAL};function ie(D,C,fe){if(fe?(s.texParameteri(D,s.TEXTURE_WRAP_S,be[C.wrapS]),s.texParameteri(D,s.TEXTURE_WRAP_T,be[C.wrapT]),(D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY)&&s.texParameteri(D,s.TEXTURE_WRAP_R,be[C.wrapR]),s.texParameteri(D,s.TEXTURE_MAG_FILTER,qe[C.magFilter]),s.texParameteri(D,s.TEXTURE_MIN_FILTER,qe[C.minFilter])):(s.texParameteri(D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY)&&s.texParameteri(D,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(C.wrapS!==os||C.wrapT!==os)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(D,s.TEXTURE_MAG_FILTER,A(C.magFilter)),s.texParameteri(D,s.TEXTURE_MIN_FILTER,A(C.minFilter)),C.minFilter!==fi&&C.minFilter!==Vi&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),C.compareFunction&&(s.texParameteri(D,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(D,s.TEXTURE_COMPARE_FUNC,st[C.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){let Ne=e.get("EXT_texture_filter_anisotropic");if(C.magFilter===fi||C.minFilter!==Ua&&C.minFilter!==Tr||C.type===Ns&&e.has("OES_texture_float_linear")===!1||a===!1&&C.type===so&&e.has("OES_texture_half_float_linear")===!1)return;(C.anisotropy>1||n.get(C).__currentAnisotropy)&&(s.texParameterf(D,Ne.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,i.getMaxAnisotropy())),n.get(C).__currentAnisotropy=C.anisotropy)}}function Fe(D,C){let fe=!1;D.__webglInit===void 0&&(D.__webglInit=!0,C.addEventListener("dispose",R));let Ne=C.source,Ie=f.get(Ne);Ie===void 0&&(Ie={},f.set(Ne,Ie));let Ye=Z(C);if(Ye!==D.__cacheKey){Ie[Ye]===void 0&&(Ie[Ye]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,fe=!0),Ie[Ye].usedTimes++;let ft=Ie[D.__cacheKey];ft!==void 0&&(Ie[D.__cacheKey].usedTimes--,ft.usedTimes===0&&P(C)),D.__cacheKey=Ye,D.__webglTexture=Ie[Ye].texture}return fe}function Ge(D,C,fe){let Ne=s.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&(Ne=s.TEXTURE_2D_ARRAY),C.isData3DTexture&&(Ne=s.TEXTURE_3D);let Ie=Fe(D,C),Ye=C.source;t.bindTexture(Ne,D.__webglTexture,s.TEXTURE0+fe);let ft=n.get(Ye);if(Ye.version!==ft.__version||Ie===!0){t.activeTexture(s.TEXTURE0+fe);let nt=An.getPrimaries(An.workingColorSpace),et=C.colorSpace===fs?null:An.getPrimaries(C.colorSpace),Ot=C.colorSpace===fs||nt===et?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,C.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,C.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ot);let qt=p(C)&&m(C.image)===!1,Be=y(C.image,qt,!1,i.maxTextureSize);Be=sn(C,Be);let wn=m(Be)||a,cn=r.convert(C.format,C.colorSpace),jt=r.convert(C.type),St=E(C.internalFormat,cn,jt,C.colorSpace,C.isVideoTexture);ie(Ne,C,wn);let ut,Vt=C.mipmaps,En=a&&C.isVideoTexture!==!0&&St!==a0,ke=ft.__version===void 0||Ie===!0,Ue=w(C,Be,wn);if(C.isDepthTexture)St=s.DEPTH_COMPONENT,a?C.type===Ns?St=s.DEPTH_COMPONENT32F:C.type===vr?St=s.DEPTH_COMPONENT24:C.type===eo?St=s.DEPTH24_STENCIL8:St=s.DEPTH_COMPONENT16:C.type===Ns&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),C.format===to&&St===s.DEPTH_COMPONENT&&C.type!==xf&&C.type!==vr&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),C.type=vr,jt=r.convert(C.type)),C.format===Ko&&St===s.DEPTH_COMPONENT&&(St=s.DEPTH_STENCIL,C.type!==eo&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),C.type=eo,jt=r.convert(C.type))),ke&&(En?t.texStorage2D(s.TEXTURE_2D,1,St,Be.width,Be.height):t.texImage2D(s.TEXTURE_2D,0,St,Be.width,Be.height,0,cn,jt,null));else if(C.isDataTexture)if(Vt.length>0&&wn){En&&ke&&t.texStorage2D(s.TEXTURE_2D,Ue,St,Vt[0].width,Vt[0].height);for(let He=0,H=Vt.length;He<H;He++)ut=Vt[He],En?t.texSubImage2D(s.TEXTURE_2D,He,0,0,ut.width,ut.height,cn,jt,ut.data):t.texImage2D(s.TEXTURE_2D,He,St,ut.width,ut.height,0,cn,jt,ut.data);C.generateMipmaps=!1}else En?(ke&&t.texStorage2D(s.TEXTURE_2D,Ue,St,Be.width,Be.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,Be.width,Be.height,cn,jt,Be.data)):t.texImage2D(s.TEXTURE_2D,0,St,Be.width,Be.height,0,cn,jt,Be.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){En&&ke&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ue,St,Vt[0].width,Vt[0].height,Be.depth);for(let He=0,H=Vt.length;He<H;He++)ut=Vt[He],C.format!==as?cn!==null?En?t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,He,0,0,0,ut.width,ut.height,Be.depth,cn,ut.data,0,0):t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,He,St,ut.width,ut.height,Be.depth,0,ut.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):En?t.texSubImage3D(s.TEXTURE_2D_ARRAY,He,0,0,0,ut.width,ut.height,Be.depth,cn,jt,ut.data):t.texImage3D(s.TEXTURE_2D_ARRAY,He,St,ut.width,ut.height,Be.depth,0,cn,jt,ut.data)}else{En&&ke&&t.texStorage2D(s.TEXTURE_2D,Ue,St,Vt[0].width,Vt[0].height);for(let He=0,H=Vt.length;He<H;He++)ut=Vt[He],C.format!==as?cn!==null?En?t.compressedTexSubImage2D(s.TEXTURE_2D,He,0,0,ut.width,ut.height,cn,ut.data):t.compressedTexImage2D(s.TEXTURE_2D,He,St,ut.width,ut.height,0,ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):En?t.texSubImage2D(s.TEXTURE_2D,He,0,0,ut.width,ut.height,cn,jt,ut.data):t.texImage2D(s.TEXTURE_2D,He,St,ut.width,ut.height,0,cn,jt,ut.data)}else if(C.isDataArrayTexture)En?(ke&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ue,St,Be.width,Be.height,Be.depth),t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Be.width,Be.height,Be.depth,cn,jt,Be.data)):t.texImage3D(s.TEXTURE_2D_ARRAY,0,St,Be.width,Be.height,Be.depth,0,cn,jt,Be.data);else if(C.isData3DTexture)En?(ke&&t.texStorage3D(s.TEXTURE_3D,Ue,St,Be.width,Be.height,Be.depth),t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Be.width,Be.height,Be.depth,cn,jt,Be.data)):t.texImage3D(s.TEXTURE_3D,0,St,Be.width,Be.height,Be.depth,0,cn,jt,Be.data);else if(C.isFramebufferTexture){if(ke)if(En)t.texStorage2D(s.TEXTURE_2D,Ue,St,Be.width,Be.height);else{let He=Be.width,H=Be.height;for(let Je=0;Je<Ue;Je++)t.texImage2D(s.TEXTURE_2D,Je,St,He,H,0,cn,jt,null),He>>=1,H>>=1}}else if(Vt.length>0&&wn){En&&ke&&t.texStorage2D(s.TEXTURE_2D,Ue,St,Vt[0].width,Vt[0].height);for(let He=0,H=Vt.length;He<H;He++)ut=Vt[He],En?t.texSubImage2D(s.TEXTURE_2D,He,0,0,cn,jt,ut):t.texImage2D(s.TEXTURE_2D,He,St,cn,jt,ut);C.generateMipmaps=!1}else En?(ke&&t.texStorage2D(s.TEXTURE_2D,Ue,St,Be.width,Be.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,cn,jt,Be)):t.texImage2D(s.TEXTURE_2D,0,St,cn,jt,Be);v(C,wn)&&_(Ne),ft.__version=Ye.version,C.onUpdate&&C.onUpdate(C)}D.__version=C.version}function Nt(D,C,fe){if(C.image.length!==6)return;let Ne=Fe(D,C),Ie=C.source;t.bindTexture(s.TEXTURE_CUBE_MAP,D.__webglTexture,s.TEXTURE0+fe);let Ye=n.get(Ie);if(Ie.version!==Ye.__version||Ne===!0){t.activeTexture(s.TEXTURE0+fe);let ft=An.getPrimaries(An.workingColorSpace),nt=C.colorSpace===fs?null:An.getPrimaries(C.colorSpace),et=C.colorSpace===fs||ft===nt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,C.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,C.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,et);let Ot=C.isCompressedTexture||C.image[0].isCompressedTexture,qt=C.image[0]&&C.image[0].isDataTexture,Be=[];for(let He=0;He<6;He++)!Ot&&!qt?Be[He]=y(C.image[He],!1,!0,i.maxCubemapSize):Be[He]=qt?C.image[He].image:C.image[He],Be[He]=sn(C,Be[He]);let wn=Be[0],cn=m(wn)||a,jt=r.convert(C.format,C.colorSpace),St=r.convert(C.type),ut=E(C.internalFormat,jt,St,C.colorSpace),Vt=a&&C.isVideoTexture!==!0,En=Ye.__version===void 0||Ne===!0,ke=w(C,wn,cn);ie(s.TEXTURE_CUBE_MAP,C,cn);let Ue;if(Ot){Vt&&En&&t.texStorage2D(s.TEXTURE_CUBE_MAP,ke,ut,wn.width,wn.height);for(let He=0;He<6;He++){Ue=Be[He].mipmaps;for(let H=0;H<Ue.length;H++){let Je=Ue[H];C.format!==as?jt!==null?Vt?t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+He,H,0,0,Je.width,Je.height,jt,Je.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+He,H,ut,Je.width,Je.height,0,Je.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Vt?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+He,H,0,0,Je.width,Je.height,jt,St,Je.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+He,H,ut,Je.width,Je.height,0,jt,St,Je.data)}}}else{Ue=C.mipmaps,Vt&&En&&(Ue.length>0&&ke++,t.texStorage2D(s.TEXTURE_CUBE_MAP,ke,ut,Be[0].width,Be[0].height));for(let He=0;He<6;He++)if(qt){Vt?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+He,0,0,0,Be[He].width,Be[He].height,jt,St,Be[He].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+He,0,ut,Be[He].width,Be[He].height,0,jt,St,Be[He].data);for(let H=0;H<Ue.length;H++){let We=Ue[H].image[He].image;Vt?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+He,H+1,0,0,We.width,We.height,jt,St,We.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+He,H+1,ut,We.width,We.height,0,jt,St,We.data)}}else{Vt?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+He,0,0,0,jt,St,Be[He]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+He,0,ut,jt,St,Be[He]);for(let H=0;H<Ue.length;H++){let Je=Ue[H];Vt?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+He,H+1,0,0,jt,St,Je.image[He]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+He,H+1,ut,jt,St,Je.image[He])}}}v(C,cn)&&_(s.TEXTURE_CUBE_MAP),Ye.__version=Ie.version,C.onUpdate&&C.onUpdate(C)}D.__version=C.version}function at(D,C,fe,Ne,Ie,Ye){let ft=r.convert(fe.format,fe.colorSpace),nt=r.convert(fe.type),et=E(fe.internalFormat,ft,nt,fe.colorSpace);if(!n.get(C).__hasExternalTextures){let qt=Math.max(1,C.width>>Ye),Be=Math.max(1,C.height>>Ye);Ie===s.TEXTURE_3D||Ie===s.TEXTURE_2D_ARRAY?t.texImage3D(Ie,Ye,et,qt,Be,C.depth,0,ft,nt,null):t.texImage2D(Ie,Ye,et,qt,Be,0,ft,nt,null)}t.bindFramebuffer(s.FRAMEBUFFER,D),At(C)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Ne,Ie,n.get(fe).__webglTexture,0,Jt(C)):(Ie===s.TEXTURE_2D||Ie>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Ie<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,Ne,Ie,n.get(fe).__webglTexture,Ye),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Xt(D,C,fe){if(s.bindRenderbuffer(s.RENDERBUFFER,D),C.depthBuffer&&!C.stencilBuffer){let Ne=a===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(fe||At(C)){let Ie=C.depthTexture;Ie&&Ie.isDepthTexture&&(Ie.type===Ns?Ne=s.DEPTH_COMPONENT32F:Ie.type===vr&&(Ne=s.DEPTH_COMPONENT24));let Ye=Jt(C);At(C)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ye,Ne,C.width,C.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,Ye,Ne,C.width,C.height)}else s.renderbufferStorage(s.RENDERBUFFER,Ne,C.width,C.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,D)}else if(C.depthBuffer&&C.stencilBuffer){let Ne=Jt(C);fe&&At(C)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ne,s.DEPTH24_STENCIL8,C.width,C.height):At(C)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ne,s.DEPTH24_STENCIL8,C.width,C.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,C.width,C.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,D)}else{let Ne=C.isWebGLMultipleRenderTargets===!0?C.texture:[C.texture];for(let Ie=0;Ie<Ne.length;Ie++){let Ye=Ne[Ie],ft=r.convert(Ye.format,Ye.colorSpace),nt=r.convert(Ye.type),et=E(Ye.internalFormat,ft,nt,Ye.colorSpace),Ot=Jt(C);fe&&At(C)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ot,et,C.width,C.height):At(C)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ot,et,C.width,C.height):s.renderbufferStorage(s.RENDERBUFFER,et,C.width,C.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function tn(D,C){if(C&&C.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,D),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(C.depthTexture).__webglTexture||C.depthTexture.image.width!==C.width||C.depthTexture.image.height!==C.height)&&(C.depthTexture.image.width=C.width,C.depthTexture.image.height=C.height,C.depthTexture.needsUpdate=!0),B(C.depthTexture,0);let Ne=n.get(C.depthTexture).__webglTexture,Ie=Jt(C);if(C.depthTexture.format===to)At(C)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Ne,0,Ie):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Ne,0);else if(C.depthTexture.format===Ko)At(C)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Ne,0,Ie):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Ne,0);else throw new Error("Unknown depthTexture format")}function Tt(D){let C=n.get(D),fe=D.isWebGLCubeRenderTarget===!0;if(D.depthTexture&&!C.__autoAllocateDepthBuffer){if(fe)throw new Error("target.depthTexture not supported in Cube render targets");tn(C.__webglFramebuffer,D)}else if(fe){C.__webglDepthbuffer=[];for(let Ne=0;Ne<6;Ne++)t.bindFramebuffer(s.FRAMEBUFFER,C.__webglFramebuffer[Ne]),C.__webglDepthbuffer[Ne]=s.createRenderbuffer(),Xt(C.__webglDepthbuffer[Ne],D,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer=s.createRenderbuffer(),Xt(C.__webglDepthbuffer,D,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function bn(D,C,fe){let Ne=n.get(D);C!==void 0&&at(Ne.__webglFramebuffer,D,D.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),fe!==void 0&&Tt(D)}function ae(D){let C=D.texture,fe=n.get(D),Ne=n.get(C);D.addEventListener("dispose",O),D.isWebGLMultipleRenderTargets!==!0&&(Ne.__webglTexture===void 0&&(Ne.__webglTexture=s.createTexture()),Ne.__version=C.version,o.memory.textures++);let Ie=D.isWebGLCubeRenderTarget===!0,Ye=D.isWebGLMultipleRenderTargets===!0,ft=m(D)||a;if(Ie){fe.__webglFramebuffer=[];for(let nt=0;nt<6;nt++)if(a&&C.mipmaps&&C.mipmaps.length>0){fe.__webglFramebuffer[nt]=[];for(let et=0;et<C.mipmaps.length;et++)fe.__webglFramebuffer[nt][et]=s.createFramebuffer()}else fe.__webglFramebuffer[nt]=s.createFramebuffer()}else{if(a&&C.mipmaps&&C.mipmaps.length>0){fe.__webglFramebuffer=[];for(let nt=0;nt<C.mipmaps.length;nt++)fe.__webglFramebuffer[nt]=s.createFramebuffer()}else fe.__webglFramebuffer=s.createFramebuffer();if(Ye)if(i.drawBuffers){let nt=D.texture;for(let et=0,Ot=nt.length;et<Ot;et++){let qt=n.get(nt[et]);qt.__webglTexture===void 0&&(qt.__webglTexture=s.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&D.samples>0&&At(D)===!1){let nt=Ye?C:[C];fe.__webglMultisampledFramebuffer=s.createFramebuffer(),fe.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,fe.__webglMultisampledFramebuffer);for(let et=0;et<nt.length;et++){let Ot=nt[et];fe.__webglColorRenderbuffer[et]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,fe.__webglColorRenderbuffer[et]);let qt=r.convert(Ot.format,Ot.colorSpace),Be=r.convert(Ot.type),wn=E(Ot.internalFormat,qt,Be,Ot.colorSpace,D.isXRRenderTarget===!0),cn=Jt(D);s.renderbufferStorageMultisample(s.RENDERBUFFER,cn,wn,D.width,D.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+et,s.RENDERBUFFER,fe.__webglColorRenderbuffer[et])}s.bindRenderbuffer(s.RENDERBUFFER,null),D.depthBuffer&&(fe.__webglDepthRenderbuffer=s.createRenderbuffer(),Xt(fe.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(Ie){t.bindTexture(s.TEXTURE_CUBE_MAP,Ne.__webglTexture),ie(s.TEXTURE_CUBE_MAP,C,ft);for(let nt=0;nt<6;nt++)if(a&&C.mipmaps&&C.mipmaps.length>0)for(let et=0;et<C.mipmaps.length;et++)at(fe.__webglFramebuffer[nt][et],D,C,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,et);else at(fe.__webglFramebuffer[nt],D,C,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0);v(C,ft)&&_(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ye){let nt=D.texture;for(let et=0,Ot=nt.length;et<Ot;et++){let qt=nt[et],Be=n.get(qt);t.bindTexture(s.TEXTURE_2D,Be.__webglTexture),ie(s.TEXTURE_2D,qt,ft),at(fe.__webglFramebuffer,D,qt,s.COLOR_ATTACHMENT0+et,s.TEXTURE_2D,0),v(qt,ft)&&_(s.TEXTURE_2D)}t.unbindTexture()}else{let nt=s.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(a?nt=D.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(nt,Ne.__webglTexture),ie(nt,C,ft),a&&C.mipmaps&&C.mipmaps.length>0)for(let et=0;et<C.mipmaps.length;et++)at(fe.__webglFramebuffer[et],D,C,s.COLOR_ATTACHMENT0,nt,et);else at(fe.__webglFramebuffer,D,C,s.COLOR_ATTACHMENT0,nt,0);v(C,ft)&&_(nt),t.unbindTexture()}D.depthBuffer&&Tt(D)}function vi(D){let C=m(D)||a,fe=D.isWebGLMultipleRenderTargets===!0?D.texture:[D.texture];for(let Ne=0,Ie=fe.length;Ne<Ie;Ne++){let Ye=fe[Ne];if(v(Ye,C)){let ft=D.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,nt=n.get(Ye).__webglTexture;t.bindTexture(ft,nt),_(ft),t.unbindTexture()}}}function Ht(D){if(a&&D.samples>0&&At(D)===!1){let C=D.isWebGLMultipleRenderTargets?D.texture:[D.texture],fe=D.width,Ne=D.height,Ie=s.COLOR_BUFFER_BIT,Ye=[],ft=D.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,nt=n.get(D),et=D.isWebGLMultipleRenderTargets===!0;if(et)for(let Ot=0;Ot<C.length;Ot++)t.bindFramebuffer(s.FRAMEBUFFER,nt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ot,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,nt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ot,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,nt.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,nt.__webglFramebuffer);for(let Ot=0;Ot<C.length;Ot++){Ye.push(s.COLOR_ATTACHMENT0+Ot),D.depthBuffer&&Ye.push(ft);let qt=nt.__ignoreDepthValues!==void 0?nt.__ignoreDepthValues:!1;if(qt===!1&&(D.depthBuffer&&(Ie|=s.DEPTH_BUFFER_BIT),D.stencilBuffer&&(Ie|=s.STENCIL_BUFFER_BIT)),et&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,nt.__webglColorRenderbuffer[Ot]),qt===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[ft]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[ft])),et){let Be=n.get(C[Ot]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Be,0)}s.blitFramebuffer(0,0,fe,Ne,0,0,fe,Ne,Ie,s.NEAREST),l&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Ye)}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),et)for(let Ot=0;Ot<C.length;Ot++){t.bindFramebuffer(s.FRAMEBUFFER,nt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ot,s.RENDERBUFFER,nt.__webglColorRenderbuffer[Ot]);let qt=n.get(C[Ot]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,nt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ot,s.TEXTURE_2D,qt,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,nt.__webglMultisampledFramebuffer)}}function Jt(D){return Math.min(i.maxSamples,D.samples)}function At(D){let C=n.get(D);return a&&D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function kn(D){let C=o.render.frame;u.get(D)!==C&&(u.set(D,C),D.update())}function sn(D,C){let fe=D.colorSpace,Ne=D.format,Ie=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||D.format===Ch||fe!==mi&&fe!==fs&&(An.getTransfer(fe)===Wn?a===!1?e.has("EXT_sRGB")===!0&&Ne===as?(D.format=Ch,D.minFilter=Vi,D.generateMipmaps=!1):C=dl.sRGBToLinear(C):(Ne!==as||Ie!==Er)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",fe)),C}this.allocateTextureUnit=N,this.resetTextureUnits=ce,this.setTexture2D=B,this.setTexture2DArray=Te,this.setTexture3D=Re,this.setTextureCube=ne,this.rebindTextures=bn,this.setupRenderTarget=ae,this.updateRenderTargetMipmap=vi,this.updateMultisampleRenderTarget=Ht,this.setupDepthRenderbuffer=Tt,this.setupFrameBufferTexture=at,this.useMultisampledRTT=At}function PS(s,e,t){let n=t.isWebGL2;function i(r,o=fs){let a,c=An.getTransfer(o);if(r===Er)return s.UNSIGNED_BYTE;if(r===n0)return s.UNSIGNED_SHORT_4_4_4_4;if(r===i0)return s.UNSIGNED_SHORT_5_5_5_1;if(r===ly)return s.BYTE;if(r===uy)return s.SHORT;if(r===xf)return s.UNSIGNED_SHORT;if(r===t0)return s.INT;if(r===vr)return s.UNSIGNED_INT;if(r===Ns)return s.FLOAT;if(r===so)return n?s.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===hy)return s.ALPHA;if(r===as)return s.RGBA;if(r===fy)return s.LUMINANCE;if(r===dy)return s.LUMINANCE_ALPHA;if(r===to)return s.DEPTH_COMPONENT;if(r===Ko)return s.DEPTH_STENCIL;if(r===Ch)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===py)return s.RED;if(r===s0)return s.RED_INTEGER;if(r===my)return s.RG;if(r===r0)return s.RG_INTEGER;if(r===o0)return s.RGBA_INTEGER;if(r===Hu||r===Vu||r===Gu||r===Wu)if(c===Wn)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===Hu)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Vu)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Gu)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Wu)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===Hu)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Vu)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Gu)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Wu)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===pp||r===mp||r===gp||r===xp)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===pp)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===mp)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===gp)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===xp)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===a0)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===yp||r===_p)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(r===yp)return c===Wn?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===_p)return c===Wn?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===vp||r===bp||r===Mp||r===Sp||r===Ep||r===Tp||r===wp||r===Ap||r===Rp||r===Cp||r===Pp||r===Ip||r===Lp||r===Np)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(r===vp)return c===Wn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===bp)return c===Wn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Mp)return c===Wn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Sp)return c===Wn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Ep)return c===Wn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Tp)return c===Wn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===wp)return c===Wn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Ap)return c===Wn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Rp)return c===Wn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Cp)return c===Wn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Pp)return c===Wn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Ip)return c===Wn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Lp)return c===Wn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Np)return c===Wn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Xu||r===Dp||r===Up)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(r===Xu)return c===Wn?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Dp)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Up)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===gy||r===Fp||r===Bp||r===Op)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(r===Xu)return a.COMPRESSED_RED_RGTC1_EXT;if(r===Fp)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Bp)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Op)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===eo?n?s.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):s[r]!==void 0?s[r]:null}return{convert:i}}function LS(s,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,d0(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,v,_,E){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,E)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),y(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,v,_):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Bi&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Bi&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let v=e.get(p).envMap;if(v&&(m.envMap.value=v,m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;let _=s._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*_,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,v,_){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=_*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Bi&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function y(m,p){let v=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function NS(s,e,t,n){let i={},r={},o=[],a=t.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(v,_){let E=_.program;n.uniformBlockBinding(v,E)}function l(v,_){let E=i[v.id];E===void 0&&(g(v),E=u(v),i[v.id]=E,v.addEventListener("dispose",m));let w=_.program;n.updateUBOMapping(v,w);let A=e.render.frame;r[v.id]!==A&&(f(v),r[v.id]=A)}function u(v){let _=h();v.__bindingPointIndex=_;let E=s.createBuffer(),w=v.__size,A=v.usage;return s.bindBuffer(s.UNIFORM_BUFFER,E),s.bufferData(s.UNIFORM_BUFFER,w,A),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,_,E),E}function h(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){let _=i[v.id],E=v.uniforms,w=v.__cache;s.bindBuffer(s.UNIFORM_BUFFER,_);for(let A=0,R=E.length;A<R;A++){let O=Array.isArray(E[A])?E[A]:[E[A]];for(let M=0,P=O.length;M<P;M++){let G=O[M];if(d(G,A,M,w)===!0){let X=G.__offset,ce=Array.isArray(G.value)?G.value:[G.value],N=0;for(let Z=0;Z<ce.length;Z++){let B=ce[Z],Te=y(B);typeof B=="number"||typeof B=="boolean"?(G.__data[0]=B,s.bufferSubData(s.UNIFORM_BUFFER,X+N,G.__data)):B.isMatrix3?(G.__data[0]=B.elements[0],G.__data[1]=B.elements[1],G.__data[2]=B.elements[2],G.__data[3]=0,G.__data[4]=B.elements[3],G.__data[5]=B.elements[4],G.__data[6]=B.elements[5],G.__data[7]=0,G.__data[8]=B.elements[6],G.__data[9]=B.elements[7],G.__data[10]=B.elements[8],G.__data[11]=0):(B.toArray(G.__data,N),N+=Te.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,X,G.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function d(v,_,E,w){let A=v.value,R=_+"_"+E;if(w[R]===void 0)return typeof A=="number"||typeof A=="boolean"?w[R]=A:w[R]=A.clone(),!0;{let O=w[R];if(typeof A=="number"||typeof A=="boolean"){if(O!==A)return w[R]=A,!0}else if(O.equals(A)===!1)return O.copy(A),!0}return!1}function g(v){let _=v.uniforms,E=0,w=16;for(let R=0,O=_.length;R<O;R++){let M=Array.isArray(_[R])?_[R]:[_[R]];for(let P=0,G=M.length;P<G;P++){let X=M[P],ce=Array.isArray(X.value)?X.value:[X.value];for(let N=0,Z=ce.length;N<Z;N++){let B=ce[N],Te=y(B),Re=E%w;Re!==0&&w-Re<Te.boundary&&(E+=w-Re),X.__data=new Float32Array(Te.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=E,E+=Te.storage}}}let A=E%w;return A>0&&(E+=w-A),v.__size=E,v.__cache={},this}function y(v){let _={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(_.boundary=4,_.storage=4):v.isVector2?(_.boundary=8,_.storage=8):v.isVector3||v.isColor?(_.boundary=16,_.storage=12):v.isVector4?(_.boundary=16,_.storage=16):v.isMatrix3?(_.boundary=48,_.storage=48):v.isMatrix4?(_.boundary=64,_.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),_}function m(v){let _=v.target;_.removeEventListener("dispose",m);let E=o.indexOf(_.__bindingPointIndex);o.splice(E,1),s.deleteBuffer(i[_.id]),delete i[_.id],delete r[_.id]}function p(){for(let v in i)s.deleteBuffer(i[v]);o=[],i={},r={}}return{bind:c,update:l,dispose:p}}function BS(s,e){return s.z-e.z}function OS(s,e){return e.z-s.z}function kS(s,e,t=0){let n=e.itemSize;if(s.isInterleavedBufferAttribute||s.array.constructor!==e.array.constructor){let i=s.count;for(let r=0;r<i;r++)for(let o=0;o<n;o++)e.setComponent(r+t,o,s.getComponent(r,o))}else e.array.set(s.array,t*n);e.needsUpdate=!0}function Wm(s,e,t,n,i,r,o){let a=Yh.distanceSqToPoint(s);if(a<t){let c=new T;Yh.closestPointToPoint(s,c),c.applyMatrix4(n);let l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,object:o})}}function Mf(){let s=0,e=0,t=0,n=0;function i(r,o,a,c){s=r,e=a,t=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){i(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,u,h){let f=(o-r)/l-(a-r)/(l+u)+(a-o)/u,d=(a-o)/u-(c-o)/(u+h)+(c-a)/h;f*=u,d*=u,i(o,a,f,d)},calc:function(r){let o=r*r,a=o*r;return s+e*r+t*o+n*a}}}function Xm(s,e,t,n,i){let r=(n-e)*.5,o=(i-t)*.5,a=s*s,c=s*a;return(2*t-2*n+r+o)*c+(-3*t+3*n-2*r-o)*a+r*s+t}function HS(s,e){let t=1-s;return t*t*e}function VS(s,e){return 2*(1-s)*s*e}function GS(s,e){return s*s*e}function ka(s,e,t,n){return HS(s,e)+VS(s,t)+GS(s,n)}function WS(s,e){let t=1-s;return t*t*t*e}function XS(s,e){let t=1-s;return 3*t*t*s*e}function qS(s,e){return 3*(1-s)*s*s*e}function YS(s,e){return s*s*s*e}function Ha(s,e,t,n,i){return WS(s,e)+XS(s,t)+qS(s,n)+YS(s,i)}function rl(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function ZS(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function KS(s){function e(i,r){return s[i]-s[r]}let t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function qm(s,e,t){let n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){let a=t[r]*e;for(let c=0;c!==e;++c)i[o++]=s[a+c]}return i}function v0(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=s[i++];while(r!==void 0)}function JS(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ir;case"vector":case"vector2":case"vector3":case"vector4":return sr;case"color":return Ll;case"quaternion":return Fs;case"bool":case"boolean":return Lr;case"string":return Nr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function $S(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=JS(s.type);if(s.times===void 0){let t=[],n=[];v0(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}function Km(s,e){return s.distance-e.distance}function df(s,e,t,n){if(s.layers.test(e.layers)&&s.raycast(e,t),n===!0){let i=s.children;for(let r=0,o=i.length;r<o;r++)df(i[r],e,t,!0)}}var co,$m,Lx,ap,Nx,Qm,Dx,tr,Gi,Bi,Ti,Mr,Wo,cp,lp,up,kl,Is,Ux,Fx,hp,fp,Hl,Vl,Bx,Ox,Yo,Th,zx,kx,Hx,Vx,Gx,Wx,Xx,qx,Yx,jx,Zx,Kx,al,Jx,$x,pf,Qx,mf,ey,ty,Sr,ny,iy,sy,ry,oy,ay,dp,cy,e0,jo,Zo,wh,Ah,Gl,io,os,Va,fi,cl,Ua,Vi,gf,Tr,Er,ly,uy,xf,t0,vr,Ns,so,n0,i0,eo,hy,as,fy,dy,to,Ko,py,s0,my,r0,o0,Hu,Vu,Gu,Wu,pp,mp,gp,xp,a0,yp,_p,vp,bp,Mp,Sp,Ep,Tp,wp,Ap,Rp,Cp,Pp,Ip,Lp,Np,Xu,Dp,Up,gy,Fp,Bp,Op,Jo,ro,qu,zp,kp,Hp,xy,c0,Wl,ic,l0,no,yy,_y,yf,vy,fs,Xn,mi,_f,Xl,ll,Wn,ul,hl,Eo,Vp,by,My,Sy,u0,Ey,Ty,wy,Ay,Rh,Gp,Ch,Ds,Ga,wr,Di,Wp,Fa,$o,lo,ot,mn,Yu,Xp,qp,Yp,Cc,Gy,An,To,dl,Wy,pl,Xy,Oi,Bn,Ih,ds,ml,Lh,gi,T,Ku,jp,an,Zs,bs,Pc,wo,Ao,Ro,pr,mr,Yr,Aa,Ic,Lc,jr,qy,Ra,$u,ti,Ks,Qu,Nc,gr,eh,Dc,th,nr,Et,Co,Ms,Yy,jy,xr,Uc,is,Zp,Kp,Qo,Xa,Zy,Jp,Po,Js,Fc,Ca,Ky,Jy,$p,Qp,em,$y,Qy,Zn,Ss,$s,nh,Qs,Io,Lo,tm,ih,sh,rh,Bc,Ji,f0,yr,Oc,It,Ui,e_,$i,Wi,ri,zc,Pn,ea,ta,pi,t_,hs,ah,No,ss,Pa,Ei,wi,nm,Zr,kc,im,Do,Uo,Fo,ch,Hc,Vc,Gc,Wc,sm,rm,om,Xc,qc,Rn,qa,s_,r_,o_,Xi,gl,di,Bo,Oo,Nh,xl,Dh,lh,a_,c_,rs,Kr,jc,Ar,oo,u_,h_,f_,d_,p_,m_,g_,x_,y_,__,v_,b_,M_,S_,E_,T_,w_,A_,R_,C_,P_,I_,L_,N_,D_,U_,F_,B_,O_,z_,k_,H_,V_,G_,W_,X_,q_,Y_,j_,Z_,K_,J_,$_,Q_,ev,tv,nv,iv,sv,rv,ov,av,cv,lv,uv,hv,fv,dv,pv,mv,gv,xv,yv,_v,vv,bv,Mv,Sv,Ev,Tv,wv,Av,Rv,Cv,Pv,Iv,Lv,Nv,Dv,Uv,Fv,Bv,Ov,zv,kv,Hv,Vv,Gv,Wv,Xv,qv,Yv,jv,Zv,Kv,Jv,$v,Qv,eb,tb,nb,ib,sb,rb,ob,ab,cb,lb,ub,hb,fb,db,pb,mb,gb,xb,yb,_b,vb,bb,Mb,Sb,Eb,Tb,wb,Ab,Rb,Cb,Pb,Ib,Lb,Nb,Db,Ub,Fb,Bb,Ob,zb,kb,Hb,Vb,pn,tt,Ps,Zc,Rr,Vo,am,Qr,uh,cm,hh,fh,dh,$r,zo,lm,yl,_l,m0,g0,x0,y0,_0,dm,pm,mm,gm,xm,Uh,Fh,Bh,ph,qo,YM,jM,iS,sS,oS,pS,zh,kh,bS,Hh,Vh,TS,wS,Gh,Us,IS,za,Wh,Ya,Xh,Cr,ja,ki,Za,Rm,Cm,Pm,DS,Im,Jc,mh,Lm,gh,vl,Ka,bl,Nm,US,Ml,ao,ko,Dm,$c,Um,FS,Ia,La,Sl,qh,Ho,_r,Fm,zS,Bm,xh,Qc,Jr,Na,yh,Fi,el,El,Ja,Om,zm,km,_h,tl,ia,Hm,Vm,Tl,wl,$a,Gm,Yh,nl,il,Al,Ts,Rl,jh,sl,vh,bh,Mh,Qa,Zh,Kh,Jh,$h,Qh,Cl,ef,jS,Pl,Pr,ps,Il,Ir,tf,nf,sf,ms,Lr,Ll,ir,rf,Fs,Nr,sr,Nl,br,of,QS,rr,er,af,ec,cf,Dl,sa,Ul,Sh,Ym,jm,tc,lf,Fl,Zm,Da,Eh,uf,Bl,hf,ra,Dr,Ol,Sf,eE,Ef,tE,nE,iE,sE,rE,oE,aE,ff,Hn,u1,nc,zl,Jm,ol,Qi,_i=Bt(()=>{co="160",$m={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Lx=0,ap=1,Nx=2,Qm=1,Dx=2,tr=3,Gi=0,Bi=1,Ti=2,Mr=0,Wo=1,cp=2,lp=3,up=4,kl=5,Is=100,Ux=101,Fx=102,hp=103,fp=104,Hl=200,Vl=201,Bx=202,Ox=203,Yo=204,Th=205,zx=206,kx=207,Hx=208,Vx=209,Gx=210,Wx=211,Xx=212,qx=213,Yx=214,jx=0,Zx=1,Kx=2,al=3,Jx=4,$x=5,pf=6,Qx=7,mf=0,ey=1,ty=2,Sr=0,ny=1,iy=2,sy=3,ry=4,oy=5,ay=6,dp="attached",cy="detached",e0=300,jo=301,Zo=302,wh=303,Ah=304,Gl=306,io=1e3,os=1001,Va=1002,fi=1003,cl=1004,Ua=1005,Vi=1006,gf=1007,Tr=1008,Er=1009,ly=1010,uy=1011,xf=1012,t0=1013,vr=1014,Ns=1015,so=1016,n0=1017,i0=1018,eo=1020,hy=1021,as=1023,fy=1024,dy=1025,to=1026,Ko=1027,py=1028,s0=1029,my=1030,r0=1031,o0=1033,Hu=33776,Vu=33777,Gu=33778,Wu=33779,pp=35840,mp=35841,gp=35842,xp=35843,a0=36196,yp=37492,_p=37496,vp=37808,bp=37809,Mp=37810,Sp=37811,Ep=37812,Tp=37813,wp=37814,Ap=37815,Rp=37816,Cp=37817,Pp=37818,Ip=37819,Lp=37820,Np=37821,Xu=36492,Dp=36494,Up=36495,gy=36283,Fp=36284,Bp=36285,Op=36286,Jo=2300,ro=2301,qu=2302,zp=2400,kp=2401,Hp=2402,xy=2500,c0=0,Wl=1,ic=2,l0=3e3,no=3001,yy=3200,_y=3201,yf=0,vy=1,fs="",Xn="srgb",mi="srgb-linear",_f="display-p3",Xl="display-p3-linear",ll="linear",Wn="srgb",ul="rec709",hl="p3",Eo=7680,Vp=519,by=512,My=513,Sy=514,u0=515,Ey=516,Ty=517,wy=518,Ay=519,Rh=35044,Gp="300 es",Ch=1035,Ds=2e3,Ga=2001,wr=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let i=this._listeners[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}},Di=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Wp=1234567,Fa=Math.PI/180,$o=180/Math.PI;lo={DEG2RAD:Fa,RAD2DEG:$o,generateUUID:Es,clamp:oi,euclideanModulo:vf,mapLinear:Ry,inverseLerp:Cy,lerp:Ba,damp:Py,pingpong:Iy,smoothstep:Ly,smootherstep:Ny,randInt:Dy,randFloat:Uy,randFloatSpread:Fy,seededRandom:By,degToRad:Oy,radToDeg:zy,isPowerOfTwo:Ph,ceilPowerOfTwo:ky,floorPowerOfTwo:fl,setQuaternionFromProperEuler:Hy,normalize:Dn,denormalize:Ls},ot=class s{constructor(e=0,t=0){s.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(oi(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},mn=class s{constructor(e,t,n,i,r,o,a,c,l){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,c,l)}set(e,t,n,i,r,o,a,c,l){let u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],h=n[7],f=n[2],d=n[5],g=n[8],y=i[0],m=i[3],p=i[6],v=i[1],_=i[4],E=i[7],w=i[2],A=i[5],R=i[8];return r[0]=o*y+a*v+c*w,r[3]=o*m+a*_+c*A,r[6]=o*p+a*E+c*R,r[1]=l*y+u*v+h*w,r[4]=l*m+u*_+h*A,r[7]=l*p+u*E+h*R,r[2]=f*y+d*v+g*w,r[5]=f*m+d*_+g*A,r[8]=f*p+d*E+g*R,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-n*r*u+n*a*c+i*r*l-i*o*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=u*o-a*l,f=a*c-u*r,d=l*r-o*c,g=t*h+n*f+i*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/g;return e[0]=h*y,e[1]=(i*l-u*n)*y,e[2]=(a*n-i*o)*y,e[3]=f*y,e[4]=(u*t-i*c)*y,e[5]=(i*r-a*t)*y,e[6]=d*y,e[7]=(n*c-l*t)*y,e[8]=(o*t-n*r)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-i*l,i*c,-i*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Yu.makeScale(e,t)),this}rotate(e){return this.premultiply(Yu.makeRotation(-e)),this}translate(e,t){return this.premultiply(Yu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Yu=new mn;Xp={};qp=new mn().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Yp=new mn().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Cc={[mi]:{transfer:ll,primaries:ul,toReference:s=>s,fromReference:s=>s},[Xn]:{transfer:Wn,primaries:ul,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[Xl]:{transfer:ll,primaries:hl,toReference:s=>s.applyMatrix3(Yp),fromReference:s=>s.applyMatrix3(qp)},[_f]:{transfer:Wn,primaries:hl,toReference:s=>s.convertSRGBToLinear().applyMatrix3(Yp),fromReference:s=>s.applyMatrix3(qp).convertLinearToSRGB()}},Gy=new Set([mi,Xl]),An={enabled:!0,_workingColorSpace:mi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!Gy.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;let n=Cc[e].toReference,i=Cc[t].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return Cc[s].primaries},getTransfer:function(s){return s===fs?ll:Cc[s].transfer}};dl=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement=="undefined")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{To===void 0&&(To=Wa("canvas")),To.width=e.width,To.height=e.height;let n=To.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=To}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement!="undefined"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&e instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&e instanceof ImageBitmap){let t=Wa("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Xo(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Xo(t[n]/255)*255):t[n]=Xo(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Wy=0,pl=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Wy++}),this.uuid=Es(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Zu(i[o].image)):r.push(Zu(i[o]))}else r=Zu(i);n.url=r}return t||(e.images[this.uuid]=n),n}};Xy=0,Oi=class s extends wr{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=os,i=os,r=Vi,o=Tr,a=as,c=Er,l=s.DEFAULT_ANISOTROPY,u=fs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Xy++}),this.uuid=Es(),this.name="",this.source=new pl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ot(0,0),this.repeat=new ot(1,1),this.center=new ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new mn,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(Oa("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===no?Xn:fs),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==e0)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case io:e.x=e.x-Math.floor(e.x);break;case os:e.x=e.x<0?0:1;break;case Va:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case io:e.y=e.y-Math.floor(e.y);break;case os:e.y=e.y<0?0:1;break;case Va:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Oa("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Xn?no:l0}set encoding(e){Oa("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===no?Xn:fs}};Oi.DEFAULT_IMAGE=null;Oi.DEFAULT_MAPPING=e0;Oi.DEFAULT_ANISOTROPY=1;Bn=class s{constructor(e=0,t=0,n=0,i=1){s.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,c=e.elements,l=c[0],u=c[4],h=c[8],f=c[1],d=c[5],g=c[9],y=c[2],m=c[6],p=c[10];if(Math.abs(u-f)<.01&&Math.abs(h-y)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+y)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let _=(l+1)/2,E=(d+1)/2,w=(p+1)/2,A=(u+f)/4,R=(h+y)/4,O=(g+m)/4;return _>E&&_>w?_<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(_),i=A/n,r=R/n):E>w?E<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(E),n=A/i,r=O/i):w<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(w),n=R/r,i=O/r),this.set(n,i,r,t),this}let v=Math.sqrt((m-g)*(m-g)+(h-y)*(h-y)+(f-u)*(f-u));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(h-y)/v,this.z=(f-u)/v,this.w=Math.acos((l+d+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ih=class extends wr{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Bn(0,0,e,t),this.scissorTest=!1,this.viewport=new Bn(0,0,e,t);let i={width:e,height:t,depth:1};n.encoding!==void 0&&(Oa("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===no?Xn:fs),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Vi,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Oi(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new pl(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},ds=class extends Ih{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},ml=class extends Oi{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=fi,this.minFilter=fi,this.wrapR=os,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Lh=class extends Oi{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=fi,this.minFilter=fi,this.wrapR=os,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},gi=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let c=n[i+0],l=n[i+1],u=n[i+2],h=n[i+3],f=r[o+0],d=r[o+1],g=r[o+2],y=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=f,e[t+1]=d,e[t+2]=g,e[t+3]=y;return}if(h!==y||c!==f||l!==d||u!==g){let m=1-a,p=c*f+l*d+u*g+h*y,v=p>=0?1:-1,_=1-p*p;if(_>Number.EPSILON){let w=Math.sqrt(_),A=Math.atan2(w,p*v);m=Math.sin(m*A)/w,a=Math.sin(a*A)/w}let E=a*v;if(c=c*m+f*E,l=l*m+d*E,u=u*m+g*E,h=h*m+y*E,m===1-a){let w=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=w,l*=w,u*=w,h*=w}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,r,o){let a=n[i],c=n[i+1],l=n[i+2],u=n[i+3],h=r[o],f=r[o+1],d=r[o+2],g=r[o+3];return e[t]=a*g+u*h+c*d-l*f,e[t+1]=c*g+u*f+l*h-a*d,e[t+2]=l*g+u*d+a*f-c*h,e[t+3]=u*g-a*h-c*f-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(i/2),h=a(r/2),f=c(n/2),d=c(i/2),g=c(r/2);switch(o){case"XYZ":this._x=f*u*h+l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h-f*d*g;break;case"YXZ":this._x=f*u*h+l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h+f*d*g;break;case"ZXY":this._x=f*u*h-l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h-f*d*g;break;case"ZYX":this._x=f*u*h-l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h+f*d*g;break;case"YZX":this._x=f*u*h+l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h-f*d*g;break;case"XZY":this._x=f*u*h-l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],h=t[10],f=n+a+h;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-c)*d,this._y=(r-l)*d,this._z=(o-i)*d}else if(n>a&&n>h){let d=2*Math.sqrt(1+n-a-h);this._w=(u-c)/d,this._x=.25*d,this._y=(i+o)/d,this._z=(r+l)/d}else if(a>h){let d=2*Math.sqrt(1+a-n-h);this._w=(r-l)/d,this._x=(i+o)/d,this._y=.25*d,this._z=(c+u)/d}else{let d=2*Math.sqrt(1+h-n-a);this._w=(o-i)/d,this._x=(r+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(oi(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+o*a+i*l-r*c,this._y=i*u+o*c+r*a-n*l,this._z=r*u+o*l+n*c-i*a,this._w=o*u-n*a-i*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,r=this._z,o=this._w,a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let d=1-t;return this._w=d*o+t*this._w,this._x=d*n+t*this._x,this._y=d*i+t*this._y,this._z=d*r+t*this._z,this.normalize(),this}let l=Math.sqrt(c),u=Math.atan2(l,a),h=Math.sin((1-t)*u)/l,f=Math.sin(t*u)/l;return this._w=o*h+this._w*f,this._x=n*h+this._x*f,this._y=i*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(r),n*Math.cos(r),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},T=class s{constructor(e=0,t=0,n=0){s.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(jp.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(jp.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*i-a*n),u=2*(a*t-r*i),h=2*(r*n-o*t);return this.x=t+c*l+o*h-a*u,this.y=n+c*u+a*l-r*h,this.z=i+c*h+r*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=i*c-r*a,this.y=r*o-n*c,this.z=n*a-i*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ku.copy(this).projectOnVector(e),this.sub(Ku)}reflect(e){return this.sub(Ku.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(oi(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ku=new T,jp=new gi,an=class{constructor(e=new T(1/0,1/0,1/0),t=new T(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(bs.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(bs.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=bs.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,bs):bs.fromBufferAttribute(r,o),bs.applyMatrix4(e.matrixWorld),this.expandByPoint(bs);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Pc.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Pc.copy(n.boundingBox)),Pc.applyMatrix4(e.matrixWorld),this.union(Pc)}let i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,bs),bs.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Aa),Ic.subVectors(this.max,Aa),wo.subVectors(e.a,Aa),Ao.subVectors(e.b,Aa),Ro.subVectors(e.c,Aa),pr.subVectors(Ao,wo),mr.subVectors(Ro,Ao),Yr.subVectors(wo,Ro);let t=[0,-pr.z,pr.y,0,-mr.z,mr.y,0,-Yr.z,Yr.y,pr.z,0,-pr.x,mr.z,0,-mr.x,Yr.z,0,-Yr.x,-pr.y,pr.x,0,-mr.y,mr.x,0,-Yr.y,Yr.x,0];return!Ju(t,wo,Ao,Ro,Ic)||(t=[1,0,0,0,1,0,0,0,1],!Ju(t,wo,Ao,Ro,Ic))?!1:(Lc.crossVectors(pr,mr),t=[Lc.x,Lc.y,Lc.z],Ju(t,wo,Ao,Ro,Ic))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,bs).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(bs).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Zs[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Zs[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Zs[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Zs[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Zs[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Zs[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Zs[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Zs[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Zs),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Zs=[new T,new T,new T,new T,new T,new T,new T,new T],bs=new T,Pc=new an,wo=new T,Ao=new T,Ro=new T,pr=new T,mr=new T,Yr=new T,Aa=new T,Ic=new T,Lc=new T,jr=new T;qy=new an,Ra=new T,$u=new T,ti=class{constructor(e=new T,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):qy.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ra.subVectors(e,this.center);let t=Ra.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Ra,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):($u.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ra.copy(e.center).add($u)),this.expandByPoint(Ra.copy(e.center).sub($u))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Ks=new T,Qu=new T,Nc=new T,gr=new T,eh=new T,Dc=new T,th=new T,nr=class{constructor(e=new T,t=new T(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ks)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Ks.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ks.copy(this.origin).addScaledVector(this.direction,t),Ks.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Qu.copy(e).add(t).multiplyScalar(.5),Nc.copy(t).sub(e).normalize(),gr.copy(this.origin).sub(Qu);let r=e.distanceTo(t)*.5,o=-this.direction.dot(Nc),a=gr.dot(this.direction),c=-gr.dot(Nc),l=gr.lengthSq(),u=Math.abs(1-o*o),h,f,d,g;if(u>0)if(h=o*c-a,f=o*a-c,g=r*u,h>=0)if(f>=-g)if(f<=g){let y=1/u;h*=y,f*=y,d=h*(h+o*f+2*a)+f*(o*h+f+2*c)+l}else f=r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;else f=-r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;else f<=-g?(h=Math.max(0,-(-o*r+a)),f=h>0?-r:Math.min(Math.max(-r,-c),r),d=-h*h+f*(f+2*c)+l):f<=g?(h=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(h=Math.max(0,-(o*r+a)),f=h>0?r:Math.min(Math.max(-r,-c),r),d=-h*h+f*(f+2*c)+l);else f=o>0?-r:r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(Qu).addScaledVector(Nc,f),d}intersectSphere(e,t){Ks.subVectors(e.center,this.origin);let n=Ks.dot(this.direction),i=Ks.dot(Ks)-n*n,r=e.radius*e.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,c,l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,i=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,i=(e.min.x-f.x)*l),u>=0?(r=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),h>=0?(a=(e.min.z-f.z)*h,c=(e.max.z-f.z)*h):(a=(e.max.z-f.z)*h,c=(e.min.z-f.z)*h),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Ks)!==null}intersectTriangle(e,t,n,i,r){eh.subVectors(t,e),Dc.subVectors(n,e),th.crossVectors(eh,Dc);let o=this.direction.dot(th),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;gr.subVectors(this.origin,e);let c=a*this.direction.dot(Dc.crossVectors(gr,Dc));if(c<0)return null;let l=a*this.direction.dot(eh.cross(gr));if(l<0||c+l>o)return null;let u=-a*gr.dot(th);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Et=class s{constructor(e,t,n,i,r,o,a,c,l,u,h,f,d,g,y,m){s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,c,l,u,h,f,d,g,y,m)}set(e,t,n,i,r,o,a,c,l,u,h,f,d,g,y,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=u,p[10]=h,p[14]=f,p[3]=d,p[7]=g,p[11]=y,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/Co.setFromMatrixColumn(e,0).length(),r=1/Co.setFromMatrixColumn(e,1).length(),o=1/Co.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){let f=o*u,d=o*h,g=a*u,y=a*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=d+g*l,t[5]=f-y*l,t[9]=-a*c,t[2]=y-f*l,t[6]=g+d*l,t[10]=o*c}else if(e.order==="YXZ"){let f=c*u,d=c*h,g=l*u,y=l*h;t[0]=f+y*a,t[4]=g*a-d,t[8]=o*l,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=d*a-g,t[6]=y+f*a,t[10]=o*c}else if(e.order==="ZXY"){let f=c*u,d=c*h,g=l*u,y=l*h;t[0]=f-y*a,t[4]=-o*h,t[8]=g+d*a,t[1]=d+g*a,t[5]=o*u,t[9]=y-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let f=o*u,d=o*h,g=a*u,y=a*h;t[0]=c*u,t[4]=g*l-d,t[8]=f*l+y,t[1]=c*h,t[5]=y*l+f,t[9]=d*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let f=o*c,d=o*l,g=a*c,y=a*l;t[0]=c*u,t[4]=y-f*h,t[8]=g*h+d,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=d*h+g,t[10]=f-y*h}else if(e.order==="XZY"){let f=o*c,d=o*l,g=a*c,y=a*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=f*h+y,t[5]=o*u,t[9]=d*h-g,t[2]=g*h-d,t[6]=a*u,t[10]=y*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Yy,e,jy)}lookAt(e,t,n){let i=this.elements;return is.subVectors(e,t),is.lengthSq()===0&&(is.z=1),is.normalize(),xr.crossVectors(n,is),xr.lengthSq()===0&&(Math.abs(n.z)===1?is.x+=1e-4:is.z+=1e-4,is.normalize(),xr.crossVectors(n,is)),xr.normalize(),Uc.crossVectors(is,xr),i[0]=xr.x,i[4]=Uc.x,i[8]=is.x,i[1]=xr.y,i[5]=Uc.y,i[9]=is.y,i[2]=xr.z,i[6]=Uc.z,i[10]=is.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],h=n[5],f=n[9],d=n[13],g=n[2],y=n[6],m=n[10],p=n[14],v=n[3],_=n[7],E=n[11],w=n[15],A=i[0],R=i[4],O=i[8],M=i[12],P=i[1],G=i[5],X=i[9],ce=i[13],N=i[2],Z=i[6],B=i[10],Te=i[14],Re=i[3],ne=i[7],be=i[11],qe=i[15];return r[0]=o*A+a*P+c*N+l*Re,r[4]=o*R+a*G+c*Z+l*ne,r[8]=o*O+a*X+c*B+l*be,r[12]=o*M+a*ce+c*Te+l*qe,r[1]=u*A+h*P+f*N+d*Re,r[5]=u*R+h*G+f*Z+d*ne,r[9]=u*O+h*X+f*B+d*be,r[13]=u*M+h*ce+f*Te+d*qe,r[2]=g*A+y*P+m*N+p*Re,r[6]=g*R+y*G+m*Z+p*ne,r[10]=g*O+y*X+m*B+p*be,r[14]=g*M+y*ce+m*Te+p*qe,r[3]=v*A+_*P+E*N+w*Re,r[7]=v*R+_*G+E*Z+w*ne,r[11]=v*O+_*X+E*B+w*be,r[15]=v*M+_*ce+E*Te+w*qe,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],h=e[6],f=e[10],d=e[14],g=e[3],y=e[7],m=e[11],p=e[15];return g*(+r*c*h-i*l*h-r*a*f+n*l*f+i*a*d-n*c*d)+y*(+t*c*d-t*l*f+r*o*f-i*o*d+i*l*u-r*c*u)+m*(+t*l*h-t*a*d-r*o*h+n*o*d+r*a*u-n*l*u)+p*(-i*a*u-t*c*h+t*a*f+i*o*h-n*o*f+n*c*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=e[9],f=e[10],d=e[11],g=e[12],y=e[13],m=e[14],p=e[15],v=h*m*l-y*f*l+y*c*d-a*m*d-h*c*p+a*f*p,_=g*f*l-u*m*l-g*c*d+o*m*d+u*c*p-o*f*p,E=u*y*l-g*h*l+g*a*d-o*y*d-u*a*p+o*h*p,w=g*h*c-u*y*c-g*a*f+o*y*f+u*a*m-o*h*m,A=t*v+n*_+i*E+r*w;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let R=1/A;return e[0]=v*R,e[1]=(y*f*r-h*m*r-y*i*d+n*m*d+h*i*p-n*f*p)*R,e[2]=(a*m*r-y*c*r+y*i*l-n*m*l-a*i*p+n*c*p)*R,e[3]=(h*c*r-a*f*r-h*i*l+n*f*l+a*i*d-n*c*d)*R,e[4]=_*R,e[5]=(u*m*r-g*f*r+g*i*d-t*m*d-u*i*p+t*f*p)*R,e[6]=(g*c*r-o*m*r-g*i*l+t*m*l+o*i*p-t*c*p)*R,e[7]=(o*f*r-u*c*r+u*i*l-t*f*l-o*i*d+t*c*d)*R,e[8]=E*R,e[9]=(g*h*r-u*y*r-g*n*d+t*y*d+u*n*p-t*h*p)*R,e[10]=(o*y*r-g*a*r+g*n*l-t*y*l-o*n*p+t*a*p)*R,e[11]=(u*a*r-o*h*r-u*n*l+t*h*l+o*n*d-t*a*d)*R,e[12]=w*R,e[13]=(u*y*i-g*h*i+g*n*f-t*y*f-u*n*m+t*h*m)*R,e[14]=(g*a*i-o*y*i-g*n*c+t*y*c+o*n*m-t*a*m)*R,e[15]=(o*h*i-u*a*i+u*n*c-t*h*c-o*n*f+t*a*f)*R,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,u=r*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,u*a+n,u*c-i*o,0,l*c-i*a,u*c+i*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,u=o+o,h=a+a,f=r*l,d=r*u,g=r*h,y=o*u,m=o*h,p=a*h,v=c*l,_=c*u,E=c*h,w=n.x,A=n.y,R=n.z;return i[0]=(1-(y+p))*w,i[1]=(d+E)*w,i[2]=(g-_)*w,i[3]=0,i[4]=(d-E)*A,i[5]=(1-(f+p))*A,i[6]=(m+v)*A,i[7]=0,i[8]=(g+_)*R,i[9]=(m-v)*R,i[10]=(1-(f+y))*R,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,r=Co.set(i[0],i[1],i[2]).length(),o=Co.set(i[4],i[5],i[6]).length(),a=Co.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],Ms.copy(this);let l=1/r,u=1/o,h=1/a;return Ms.elements[0]*=l,Ms.elements[1]*=l,Ms.elements[2]*=l,Ms.elements[4]*=u,Ms.elements[5]*=u,Ms.elements[6]*=u,Ms.elements[8]*=h,Ms.elements[9]*=h,Ms.elements[10]*=h,t.setFromRotationMatrix(Ms),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o,a=Ds){let c=this.elements,l=2*r/(t-e),u=2*r/(n-i),h=(t+e)/(t-e),f=(n+i)/(n-i),d,g;if(a===Ds)d=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Ga)d=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=Ds){let c=this.elements,l=1/(t-e),u=1/(n-i),h=1/(o-r),f=(t+e)*l,d=(n+i)*u,g,y;if(a===Ds)g=(o+r)*h,y=-2*h;else if(a===Ga)g=r*h,y=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=y,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Co=new T,Ms=new Et,Yy=new T(0,0,0),jy=new T(1,1,1),xr=new T,Uc=new T,is=new T,Zp=new Et,Kp=new gi,Qo=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],o=i[4],a=i[8],c=i[1],l=i[5],u=i[9],h=i[2],f=i[6],d=i[10];switch(t){case"XYZ":this._y=Math.asin(oi(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-oi(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(oi(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-oi(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(oi(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-oi(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Zp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Zp,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Kp.setFromEuler(this),this.setFromQuaternion(Kp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Qo.DEFAULT_ORDER="XYZ";Xa=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Zy=0,Jp=new T,Po=new gi,Js=new Et,Fc=new T,Ca=new T,Ky=new T,Jy=new gi,$p=new T(1,0,0),Qp=new T(0,1,0),em=new T(0,0,1),$y={type:"added"},Qy={type:"removed"},Zn=class s extends wr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Zy++}),this.uuid=Es(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new T,t=new Qo,n=new gi,i=new T(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Et},normalMatrix:{value:new mn}}),this.matrix=new Et,this.matrixWorld=new Et,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Xa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Po.setFromAxisAngle(e,t),this.quaternion.multiply(Po),this}rotateOnWorldAxis(e,t){return Po.setFromAxisAngle(e,t),this.quaternion.premultiply(Po),this}rotateX(e){return this.rotateOnAxis($p,e)}rotateY(e){return this.rotateOnAxis(Qp,e)}rotateZ(e){return this.rotateOnAxis(em,e)}translateOnAxis(e,t){return Jp.copy(e).applyQuaternion(this.quaternion),this.position.add(Jp.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis($p,e)}translateY(e){return this.translateOnAxis(Qp,e)}translateZ(e){return this.translateOnAxis(em,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Js.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Fc.copy(e):Fc.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Ca.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Js.lookAt(Ca,Fc,this.up):Js.lookAt(Fc,Ca,this.up),this.quaternion.setFromRotationMatrix(Js),i&&(Js.extractRotation(i.matrixWorld),Po.setFromRotationMatrix(Js),this.quaternion.premultiply(Po.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent($y)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Qy)),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Js.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Js.multiply(e.parent.matrixWorld)),e.applyMatrix4(Js),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ca,e,Ky),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ca,Jy,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++){let r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){let i=this.children;for(let r=0,o=i.length;r<o;r++){let a=i[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let h=c[l];r(e.shapes,h)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];i.animations.push(r(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),u=o(e.images),h=o(e.shapes),f=o(e.skeletons),d=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){let c=[];for(let l in a){let u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};Zn.DEFAULT_UP=new T(0,1,0);Zn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Zn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;Ss=new T,$s=new T,nh=new T,Qs=new T,Io=new T,Lo=new T,tm=new T,ih=new T,sh=new T,rh=new T,Bc=!1,Ji=class s{constructor(e=new T,t=new T,n=new T){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Ss.subVectors(e,t),i.cross(Ss);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Ss.subVectors(i,t),$s.subVectors(n,t),nh.subVectors(e,t);let o=Ss.dot(Ss),a=Ss.dot($s),c=Ss.dot(nh),l=$s.dot($s),u=$s.dot(nh),h=o*l-a*a;if(h===0)return r.set(0,0,0),null;let f=1/h,d=(l*c-a*u)*f,g=(o*u-a*c)*f;return r.set(1-d-g,g,d)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Qs)===null?!1:Qs.x>=0&&Qs.y>=0&&Qs.x+Qs.y<=1}static getUV(e,t,n,i,r,o,a,c){return Bc===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Bc=!0),this.getInterpolation(e,t,n,i,r,o,a,c)}static getInterpolation(e,t,n,i,r,o,a,c){return this.getBarycoord(e,t,n,i,Qs)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Qs.x),c.addScaledVector(o,Qs.y),c.addScaledVector(a,Qs.z),c)}static isFrontFacing(e,t,n,i){return Ss.subVectors(n,t),$s.subVectors(e,t),Ss.cross($s).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ss.subVectors(this.c,this.b),$s.subVectors(this.a,this.b),Ss.cross($s).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,r){return Bc===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Bc=!0),s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,o,a;Io.subVectors(i,n),Lo.subVectors(r,n),ih.subVectors(e,n);let c=Io.dot(ih),l=Lo.dot(ih);if(c<=0&&l<=0)return t.copy(n);sh.subVectors(e,i);let u=Io.dot(sh),h=Lo.dot(sh);if(u>=0&&h<=u)return t.copy(i);let f=c*h-u*l;if(f<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(n).addScaledVector(Io,o);rh.subVectors(e,r);let d=Io.dot(rh),g=Lo.dot(rh);if(g>=0&&d<=g)return t.copy(r);let y=d*l-c*g;if(y<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(Lo,a);let m=u*g-d*h;if(m<=0&&h-u>=0&&d-g>=0)return tm.subVectors(r,i),a=(h-u)/(h-u+(d-g)),t.copy(i).addScaledVector(tm,a);let p=1/(m+y+f);return o=y*p,a=f*p,t.copy(n).addScaledVector(Io,o).addScaledVector(Lo,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},f0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},yr={h:0,s:0,l:0},Oc={h:0,s:0,l:0};It=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Xn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,An.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=An.workingColorSpace){return this.r=e,this.g=t,this.b=n,An.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=An.workingColorSpace){if(e=vf(e,1),t=oi(t,0,1),n=oi(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=oh(o,r,e+1/3),this.g=oh(o,r,e),this.b=oh(o,r,e-1/3)}return An.toWorkingColorSpace(this,i),this}setStyle(e,t=Xn){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Xn){let n=f0[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Xo(e.r),this.g=Xo(e.g),this.b=Xo(e.b),this}copyLinearToSRGB(e){return this.r=ju(e.r),this.g=ju(e.g),this.b=ju(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Xn){return An.fromWorkingColorSpace(Ui.copy(this),e),Math.round(oi(Ui.r*255,0,255))*65536+Math.round(oi(Ui.g*255,0,255))*256+Math.round(oi(Ui.b*255,0,255))}getHexString(e=Xn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=An.workingColorSpace){An.fromWorkingColorSpace(Ui.copy(this),t);let n=Ui.r,i=Ui.g,r=Ui.b,o=Math.max(n,i,r),a=Math.min(n,i,r),c,l,u=(a+o)/2;if(a===o)c=0,l=0;else{let h=o-a;switch(l=u<=.5?h/(o+a):h/(2-o-a),o){case n:c=(i-r)/h+(i<r?6:0);break;case i:c=(r-n)/h+2;break;case r:c=(n-i)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=An.workingColorSpace){return An.fromWorkingColorSpace(Ui.copy(this),t),e.r=Ui.r,e.g=Ui.g,e.b=Ui.b,e}getStyle(e=Xn){An.fromWorkingColorSpace(Ui.copy(this),e);let t=Ui.r,n=Ui.g,i=Ui.b;return e!==Xn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(yr),this.setHSL(yr.h+e,yr.s+t,yr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(yr),e.getHSL(Oc);let n=Ba(yr.h,Oc.h,t),i=Ba(yr.s,Oc.s,t),r=Ba(yr.l,Oc.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ui=new It;It.NAMES=f0;e_=0,$i=class extends wr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:e_++}),this.uuid=Es(),this.name="",this.type="Material",this.blending=Wo,this.side=Gi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Yo,this.blendDst=Th,this.blendEquation=Is,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new It(0,0,0),this.blendAlpha=0,this.depthFunc=al,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Vp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Eo,this.stencilZFail=Eo,this.stencilZPass=Eo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Wo&&(n.blending=this.blending),this.side!==Gi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Yo&&(n.blendSrc=this.blendSrc),this.blendDst!==Th&&(n.blendDst=this.blendDst),this.blendEquation!==Is&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==al&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Vp&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Eo&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Eo&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Eo&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(t){let r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Wi=class extends $i{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new It(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=mf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},ri=new T,zc=new ot,Pn=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Rh,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Ns,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)zc.fromBufferAttribute(this,t),zc.applyMatrix3(e),this.setXY(t,zc.x,zc.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ri.fromBufferAttribute(this,t),ri.applyMatrix3(e),this.setXYZ(t,ri.x,ri.y,ri.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ri.fromBufferAttribute(this,t),ri.applyMatrix4(e),this.setXYZ(t,ri.x,ri.y,ri.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ri.fromBufferAttribute(this,t),ri.applyNormalMatrix(e),this.setXYZ(t,ri.x,ri.y,ri.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ri.fromBufferAttribute(this,t),ri.transformDirection(e),this.setXYZ(t,ri.x,ri.y,ri.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ls(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Dn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ls(t,this.array)),t}setX(e,t){return this.normalized&&(t=Dn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ls(t,this.array)),t}setY(e,t){return this.normalized&&(t=Dn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ls(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Dn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ls(t,this.array)),t}setW(e,t){return this.normalized&&(t=Dn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Dn(t,this.array),n=Dn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Dn(t,this.array),n=Dn(n,this.array),i=Dn(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=Dn(t,this.array),n=Dn(n,this.array),i=Dn(i,this.array),r=Dn(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Rh&&(e.usage=this.usage),e}},ea=class extends Pn{constructor(e,t,n){super(new Uint16Array(e),t,n)}},ta=class extends Pn{constructor(e,t,n){super(new Uint32Array(e),t,n)}},pi=class extends Pn{constructor(e,t,n){super(new Float32Array(e),t,n)}},t_=0,hs=new Et,ah=new Zn,No=new T,ss=new an,Pa=new an,Ei=new T,wi=class s extends wr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:t_++}),this.uuid=Es(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(h0(e)?ta:ea)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new mn().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return hs.makeRotationFromQuaternion(e),this.applyMatrix4(hs),this}rotateX(e){return hs.makeRotationX(e),this.applyMatrix4(hs),this}rotateY(e){return hs.makeRotationY(e),this.applyMatrix4(hs),this}rotateZ(e){return hs.makeRotationZ(e),this.applyMatrix4(hs),this}translate(e,t,n){return hs.makeTranslation(e,t,n),this.applyMatrix4(hs),this}scale(e,t,n){return hs.makeScale(e,t,n),this.applyMatrix4(hs),this}lookAt(e){return ah.lookAt(e),ah.updateMatrix(),this.applyMatrix4(ah.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(No).negate(),this.translate(No.x,No.y,No.z),this}setFromPoints(e){let t=[];for(let n=0,i=e.length;n<i;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new pi(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new an);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new T(-1/0,-1/0,-1/0),new T(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];ss.setFromBufferAttribute(r),this.morphTargetsRelative?(Ei.addVectors(this.boundingBox.min,ss.min),this.boundingBox.expandByPoint(Ei),Ei.addVectors(this.boundingBox.max,ss.max),this.boundingBox.expandByPoint(Ei)):(this.boundingBox.expandByPoint(ss.min),this.boundingBox.expandByPoint(ss.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ti);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new T,1/0);return}if(e){let n=this.boundingSphere.center;if(ss.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];Pa.setFromBufferAttribute(a),this.morphTargetsRelative?(Ei.addVectors(ss.min,Pa.min),ss.expandByPoint(Ei),Ei.addVectors(ss.max,Pa.max),ss.expandByPoint(Ei)):(ss.expandByPoint(Pa.min),ss.expandByPoint(Pa.max))}ss.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)Ei.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Ei));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Ei.fromBufferAttribute(a,l),c&&(No.fromBufferAttribute(e,l),Ei.add(No)),i=Math.max(i,n.distanceToSquared(Ei))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.array,i=t.position.array,r=t.normal.array,o=t.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Pn(new Float32Array(4*a),4));let c=this.getAttribute("tangent").array,l=[],u=[];for(let P=0;P<a;P++)l[P]=new T,u[P]=new T;let h=new T,f=new T,d=new T,g=new ot,y=new ot,m=new ot,p=new T,v=new T;function _(P,G,X){h.fromArray(i,P*3),f.fromArray(i,G*3),d.fromArray(i,X*3),g.fromArray(o,P*2),y.fromArray(o,G*2),m.fromArray(o,X*2),f.sub(h),d.sub(h),y.sub(g),m.sub(g);let ce=1/(y.x*m.y-m.x*y.y);isFinite(ce)&&(p.copy(f).multiplyScalar(m.y).addScaledVector(d,-y.y).multiplyScalar(ce),v.copy(d).multiplyScalar(y.x).addScaledVector(f,-m.x).multiplyScalar(ce),l[P].add(p),l[G].add(p),l[X].add(p),u[P].add(v),u[G].add(v),u[X].add(v))}let E=this.groups;E.length===0&&(E=[{start:0,count:n.length}]);for(let P=0,G=E.length;P<G;++P){let X=E[P],ce=X.start,N=X.count;for(let Z=ce,B=ce+N;Z<B;Z+=3)_(n[Z+0],n[Z+1],n[Z+2])}let w=new T,A=new T,R=new T,O=new T;function M(P){R.fromArray(r,P*3),O.copy(R);let G=l[P];w.copy(G),w.sub(R.multiplyScalar(R.dot(G))).normalize(),A.crossVectors(O,G);let ce=A.dot(u[P])<0?-1:1;c[P*4]=w.x,c[P*4+1]=w.y,c[P*4+2]=w.z,c[P*4+3]=ce}for(let P=0,G=E.length;P<G;++P){let X=E[P],ce=X.start,N=X.count;for(let Z=ce,B=ce+N;Z<B;Z+=3)M(n[Z+0]),M(n[Z+1]),M(n[Z+2])}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Pn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let i=new T,r=new T,o=new T,a=new T,c=new T,l=new T,u=new T,h=new T;if(e)for(let f=0,d=e.count;f<d;f+=3){let g=e.getX(f+0),y=e.getX(f+1),m=e.getX(f+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,y),o.fromBufferAttribute(t,m),u.subVectors(o,r),h.subVectors(i,r),u.cross(h),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,y),l.fromBufferAttribute(n,m),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(y,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=t.count;f<d;f+=3)i.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,r),h.subVectors(i,r),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ei.fromBufferAttribute(e,t),Ei.normalize(),e.setXYZ(t,Ei.x,Ei.y,Ei.z)}toNonIndexed(){function e(a,c){let l=a.array,u=a.itemSize,h=a.normalized,f=new l.constructor(c.length*u),d=0,g=0;for(let y=0,m=c.length;y<m;y++){a.isInterleavedBufferAttribute?d=c[y]*a.data.stride+a.offset:d=c[y]*u;for(let p=0;p<u;p++)f[g++]=l[d++]}return new Pn(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let a in i){let c=i[a],l=e(c,n);t.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let u=0,h=l.length;u<h;u++){let f=l[u],d=e(f,n);c.push(d)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let h=0,f=l.length;h<f;h++){let d=l[h];u.push(d.toJSON(e.data))}u.length>0&&(i[c]=u,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let i=e.attributes;for(let l in i){let u=i[l];this.setAttribute(l,u.clone(t))}let r=e.morphAttributes;for(let l in r){let u=[],h=r[l];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,u=o.length;l<u;l++){let h=o[l];this.addGroup(h.start,h.count,h.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},nm=new Et,Zr=new nr,kc=new ti,im=new T,Do=new T,Uo=new T,Fo=new T,ch=new T,Hc=new T,Vc=new ot,Gc=new ot,Wc=new ot,sm=new T,rm=new T,om=new T,Xc=new T,qc=new T,Rn=class extends Zn{constructor(e=new wi,t=new Wi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let a=this.morphTargetInfluences;if(r&&a){Hc.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let u=a[c],h=r[c];u!==0&&(ch.fromBufferAttribute(h,e),o?Hc.addScaledVector(ch,u):Hc.addScaledVector(ch.sub(t),u))}t.add(Hc)}return t}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),kc.copy(n.boundingSphere),kc.applyMatrix4(r),Zr.copy(e.ray).recast(e.near),!(kc.containsPoint(Zr.origin)===!1&&(Zr.intersectSphere(kc,im)===null||Zr.origin.distanceToSquared(im)>(e.far-e.near)**2))&&(nm.copy(r).invert(),Zr.copy(e.ray).applyMatrix4(nm),!(n.boundingBox!==null&&Zr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Zr)))}_computeIntersections(e,t,n){let i,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,y=f.length;g<y;g++){let m=f[g],p=o[m.materialIndex],v=Math.max(m.start,d.start),_=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let E=v,w=_;E<w;E+=3){let A=a.getX(E),R=a.getX(E+1),O=a.getX(E+2);i=Yc(this,p,e,n,l,u,h,A,R,O),i&&(i.faceIndex=Math.floor(E/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let g=Math.max(0,d.start),y=Math.min(a.count,d.start+d.count);for(let m=g,p=y;m<p;m+=3){let v=a.getX(m),_=a.getX(m+1),E=a.getX(m+2);i=Yc(this,o,e,n,l,u,h,v,_,E),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,y=f.length;g<y;g++){let m=f[g],p=o[m.materialIndex],v=Math.max(m.start,d.start),_=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let E=v,w=_;E<w;E+=3){let A=E,R=E+1,O=E+2;i=Yc(this,p,e,n,l,u,h,A,R,O),i&&(i.faceIndex=Math.floor(E/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let g=Math.max(0,d.start),y=Math.min(c.count,d.start+d.count);for(let m=g,p=y;m<p;m+=3){let v=m,_=m+1,E=m+2;i=Yc(this,o,e,n,l,u,h,v,_,E),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}};qa=class s extends wi{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],u=[],h=[],f=0,d=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,i,o,2),g("x","z","y",1,-1,e,n,-t,i,o,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new pi(l,3)),this.setAttribute("normal",new pi(u,3)),this.setAttribute("uv",new pi(h,2));function g(y,m,p,v,_,E,w,A,R,O,M){let P=E/R,G=w/O,X=E/2,ce=w/2,N=A/2,Z=R+1,B=O+1,Te=0,Re=0,ne=new T;for(let be=0;be<B;be++){let qe=be*G-ce;for(let st=0;st<Z;st++){let ie=st*P-X;ne[y]=ie*v,ne[m]=qe*_,ne[p]=N,l.push(ne.x,ne.y,ne.z),ne[y]=0,ne[m]=0,ne[p]=A>0?1:-1,u.push(ne.x,ne.y,ne.z),h.push(st/R),h.push(1-be/O),Te+=1}}for(let be=0;be<O;be++)for(let qe=0;qe<R;qe++){let st=f+qe+Z*be,ie=f+qe+Z*(be+1),Fe=f+(qe+1)+Z*(be+1),Ge=f+(qe+1)+Z*be;c.push(st,ie,Ge),c.push(ie,Fe,Ge),Re+=6}a.addGroup(d,Re,M),d+=Re,f+=Te}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};s_={clone:na,merge:Hi},r_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,o_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Xi=class extends $i{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=r_,this.fragmentShader=o_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=na(e.uniforms),this.uniformsGroups=i_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},gl=class extends Zn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Et,this.projectionMatrix=new Et,this.projectionMatrixInverse=new Et,this.coordinateSystem=Ds}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},di=class extends gl{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=$o*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Fa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return $o*2*Math.atan(Math.tan(Fa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Fa*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*i/c,t-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Bo=-90,Oo=1,Nh=class extends Zn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new di(Bo,Oo,e,t);i.layers=this.layers,this.add(i);let r=new di(Bo,Oo,e,t);r.layers=this.layers,this.add(r);let o=new di(Bo,Oo,e,t);o.layers=this.layers,this.add(o);let a=new di(Bo,Oo,e,t);a.layers=this.layers,this.add(a);let c=new di(Bo,Oo,e,t);c.layers=this.layers,this.add(c);let l=new di(Bo,Oo,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,c]=t;for(let l of t)this.remove(l);if(e===Ds)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ga)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(h,f,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},xl=class extends Oi{constructor(e,t,n,i,r,o,a,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:jo,super(e,t,n,i,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Dh=class extends ds{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];t.encoding!==void 0&&(Oa("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===no?Xn:fs),this.texture=new xl(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Vi}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new qa(5,5,5),r=new Xi({name:"CubemapFromEquirect",uniforms:na(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Bi,blending:Mr});r.uniforms.tEquirect.value=t;let o=new Rn(i,r),a=t.minFilter;return t.minFilter===Tr&&(t.minFilter=Vi),new Nh(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}},lh=new T,a_=new T,c_=new mn,rs=class{constructor(e=new T(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=lh.subVectors(n,t).cross(a_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(lh),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||c_.getNormalMatrix(e),i=this.coplanarPoint(lh).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Kr=new ti,jc=new T,Ar=class{constructor(e=new rs,t=new rs,n=new rs,i=new rs,r=new rs,o=new rs){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ds){let n=this.planes,i=e.elements,r=i[0],o=i[1],a=i[2],c=i[3],l=i[4],u=i[5],h=i[6],f=i[7],d=i[8],g=i[9],y=i[10],m=i[11],p=i[12],v=i[13],_=i[14],E=i[15];if(n[0].setComponents(c-r,f-l,m-d,E-p).normalize(),n[1].setComponents(c+r,f+l,m+d,E+p).normalize(),n[2].setComponents(c+o,f+u,m+g,E+v).normalize(),n[3].setComponents(c-o,f-u,m-g,E-v).normalize(),n[4].setComponents(c-a,f-h,m-y,E-_).normalize(),t===Ds)n[5].setComponents(c+a,f+h,m+y,E+_).normalize();else if(t===Ga)n[5].setComponents(a,h,y,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Kr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Kr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Kr)}intersectsSprite(e){return Kr.center.set(0,0,0),Kr.radius=.7071067811865476,Kr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Kr)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(jc.x=i.normal.x>0?e.max.x:e.min.x,jc.y=i.normal.y>0?e.max.y:e.min.y,jc.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(jc)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};oo=class s extends wi{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(i),l=a+1,u=c+1,h=e/a,f=t/c,d=[],g=[],y=[],m=[];for(let p=0;p<u;p++){let v=p*f-o;for(let _=0;_<l;_++){let E=_*h-r;g.push(E,-v,0),y.push(0,0,1),m.push(_/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let v=0;v<a;v++){let _=v+l*p,E=v+l*(p+1),w=v+1+l*(p+1),A=v+1+l*p;d.push(_,E,A),d.push(E,w,A)}this.setIndex(d),this.setAttribute("position",new pi(g,3)),this.setAttribute("normal",new pi(y,3)),this.setAttribute("uv",new pi(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}},u_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,h_=`#ifdef USE_ALPHAHASH
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
#endif`,f_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,d_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,p_=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,m_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,g_=`#ifdef USE_AOMAP
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
#endif`,x_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,y_=`#ifdef USE_BATCHING
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
#endif`,__=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,v_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,b_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,M_=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,S_=`#ifdef USE_IRIDESCENCE
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
#endif`,E_=`#ifdef USE_BUMPMAP
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
#endif`,T_=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,w_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,A_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,R_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,C_=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,P_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,I_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,L_=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,N_=`#define PI 3.141592653589793
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
} // validated`,D_=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,U_=`vec3 transformedNormal = objectNormal;
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
#endif`,F_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,B_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,O_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,z_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,k_="gl_FragColor = linearToOutputTexel( gl_FragColor );",H_=`
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
}`,V_=`#ifdef USE_ENVMAP
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
#endif`,G_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,W_=`#ifdef USE_ENVMAP
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
#endif`,X_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,q_=`#ifdef USE_ENVMAP
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
#endif`,Y_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,j_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Z_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,K_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,J_=`#ifdef USE_GRADIENTMAP
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
}`,$_=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Q_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ev=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,tv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,nv=`uniform bool receiveShadow;
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
#endif`,iv=`#ifdef USE_ENVMAP
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
#endif`,sv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,rv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ov=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,av=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,cv=`PhysicalMaterial material;
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
#endif`,lv=`struct PhysicalMaterial {
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
}`,uv=`
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
#endif`,hv=`#if defined( RE_IndirectDiffuse )
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
#endif`,fv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,dv=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,pv=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mv=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,gv=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,xv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,yv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,_v=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,vv=`#if defined( USE_POINTS_UV )
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
#endif`,bv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Mv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Sv=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ev=`#ifdef USE_MORPHNORMALS
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
#endif`,Tv=`#ifdef USE_MORPHTARGETS
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
#endif`,wv=`#ifdef USE_MORPHTARGETS
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
#endif`,Av=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Rv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Cv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Pv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Iv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Lv=`#ifdef USE_NORMALMAP
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
#endif`,Nv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Dv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Uv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Fv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Bv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ov=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,zv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,kv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Hv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Vv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Gv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Wv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Xv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,qv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Yv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,jv=`float getShadowMask() {
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
}`,Zv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Kv=`#ifdef USE_SKINNING
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
#endif`,Jv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,$v=`#ifdef USE_SKINNING
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
#endif`,Qv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,eb=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,nb=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,ib=`#ifdef USE_TRANSMISSION
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
#endif`,sb=`#ifdef USE_TRANSMISSION
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
#endif`,rb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ob=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ab=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,cb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,lb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ub=`uniform sampler2D t2D;
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
}`,hb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fb=`#ifdef ENVMAP_TYPE_CUBE
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
}`,db=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,pb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mb=`#include <common>
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
}`,gb=`#if DEPTH_PACKING == 3200
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
}`,xb=`#define DISTANCE
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
}`,yb=`#define DISTANCE
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
}`,_b=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,vb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bb=`uniform float scale;
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
}`,Mb=`uniform vec3 diffuse;
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
}`,Sb=`#include <common>
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
}`,Eb=`uniform vec3 diffuse;
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
}`,Tb=`#define LAMBERT
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
}`,wb=`#define LAMBERT
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
}`,Ab=`#define MATCAP
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
}`,Rb=`#define MATCAP
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
}`,Cb=`#define NORMAL
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
}`,Pb=`#define NORMAL
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
}`,Ib=`#define PHONG
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
}`,Lb=`#define PHONG
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
}`,Nb=`#define STANDARD
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
}`,Db=`#define STANDARD
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
}`,Ub=`#define TOON
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
}`,Fb=`#define TOON
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
}`,Bb=`uniform float size;
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
}`,Ob=`uniform vec3 diffuse;
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
}`,zb=`#include <common>
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
}`,kb=`uniform vec3 color;
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
}`,Hb=`uniform float rotation;
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
}`,Vb=`uniform vec3 diffuse;
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
}`,pn={alphahash_fragment:u_,alphahash_pars_fragment:h_,alphamap_fragment:f_,alphamap_pars_fragment:d_,alphatest_fragment:p_,alphatest_pars_fragment:m_,aomap_fragment:g_,aomap_pars_fragment:x_,batching_pars_vertex:y_,batching_vertex:__,begin_vertex:v_,beginnormal_vertex:b_,bsdfs:M_,iridescence_fragment:S_,bumpmap_pars_fragment:E_,clipping_planes_fragment:T_,clipping_planes_pars_fragment:w_,clipping_planes_pars_vertex:A_,clipping_planes_vertex:R_,color_fragment:C_,color_pars_fragment:P_,color_pars_vertex:I_,color_vertex:L_,common:N_,cube_uv_reflection_fragment:D_,defaultnormal_vertex:U_,displacementmap_pars_vertex:F_,displacementmap_vertex:B_,emissivemap_fragment:O_,emissivemap_pars_fragment:z_,colorspace_fragment:k_,colorspace_pars_fragment:H_,envmap_fragment:V_,envmap_common_pars_fragment:G_,envmap_pars_fragment:W_,envmap_pars_vertex:X_,envmap_physical_pars_fragment:iv,envmap_vertex:q_,fog_vertex:Y_,fog_pars_vertex:j_,fog_fragment:Z_,fog_pars_fragment:K_,gradientmap_pars_fragment:J_,lightmap_fragment:$_,lightmap_pars_fragment:Q_,lights_lambert_fragment:ev,lights_lambert_pars_fragment:tv,lights_pars_begin:nv,lights_toon_fragment:sv,lights_toon_pars_fragment:rv,lights_phong_fragment:ov,lights_phong_pars_fragment:av,lights_physical_fragment:cv,lights_physical_pars_fragment:lv,lights_fragment_begin:uv,lights_fragment_maps:hv,lights_fragment_end:fv,logdepthbuf_fragment:dv,logdepthbuf_pars_fragment:pv,logdepthbuf_pars_vertex:mv,logdepthbuf_vertex:gv,map_fragment:xv,map_pars_fragment:yv,map_particle_fragment:_v,map_particle_pars_fragment:vv,metalnessmap_fragment:bv,metalnessmap_pars_fragment:Mv,morphcolor_vertex:Sv,morphnormal_vertex:Ev,morphtarget_pars_vertex:Tv,morphtarget_vertex:wv,normal_fragment_begin:Av,normal_fragment_maps:Rv,normal_pars_fragment:Cv,normal_pars_vertex:Pv,normal_vertex:Iv,normalmap_pars_fragment:Lv,clearcoat_normal_fragment_begin:Nv,clearcoat_normal_fragment_maps:Dv,clearcoat_pars_fragment:Uv,iridescence_pars_fragment:Fv,opaque_fragment:Bv,packing:Ov,premultiplied_alpha_fragment:zv,project_vertex:kv,dithering_fragment:Hv,dithering_pars_fragment:Vv,roughnessmap_fragment:Gv,roughnessmap_pars_fragment:Wv,shadowmap_pars_fragment:Xv,shadowmap_pars_vertex:qv,shadowmap_vertex:Yv,shadowmask_pars_fragment:jv,skinbase_vertex:Zv,skinning_pars_vertex:Kv,skinning_vertex:Jv,skinnormal_vertex:$v,specularmap_fragment:Qv,specularmap_pars_fragment:eb,tonemapping_fragment:tb,tonemapping_pars_fragment:nb,transmission_fragment:ib,transmission_pars_fragment:sb,uv_pars_fragment:rb,uv_pars_vertex:ob,uv_vertex:ab,worldpos_vertex:cb,background_vert:lb,background_frag:ub,backgroundCube_vert:hb,backgroundCube_frag:fb,cube_vert:db,cube_frag:pb,depth_vert:mb,depth_frag:gb,distanceRGBA_vert:xb,distanceRGBA_frag:yb,equirect_vert:_b,equirect_frag:vb,linedashed_vert:bb,linedashed_frag:Mb,meshbasic_vert:Sb,meshbasic_frag:Eb,meshlambert_vert:Tb,meshlambert_frag:wb,meshmatcap_vert:Ab,meshmatcap_frag:Rb,meshnormal_vert:Cb,meshnormal_frag:Pb,meshphong_vert:Ib,meshphong_frag:Lb,meshphysical_vert:Nb,meshphysical_frag:Db,meshtoon_vert:Ub,meshtoon_frag:Fb,points_vert:Bb,points_frag:Ob,shadow_vert:zb,shadow_frag:kb,sprite_vert:Hb,sprite_frag:Vb},tt={common:{diffuse:{value:new It(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new mn},alphaMap:{value:null},alphaMapTransform:{value:new mn},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new mn}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new mn}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new mn}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new mn},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new mn},normalScale:{value:new ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new mn},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new mn}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new mn}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new mn}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new It(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new It(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new mn},alphaTest:{value:0},uvTransform:{value:new mn}},sprite:{diffuse:{value:new It(16777215)},opacity:{value:1},center:{value:new ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new mn},alphaMap:{value:null},alphaMapTransform:{value:new mn},alphaTest:{value:0}}},Ps={basic:{uniforms:Hi([tt.common,tt.specularmap,tt.envmap,tt.aomap,tt.lightmap,tt.fog]),vertexShader:pn.meshbasic_vert,fragmentShader:pn.meshbasic_frag},lambert:{uniforms:Hi([tt.common,tt.specularmap,tt.envmap,tt.aomap,tt.lightmap,tt.emissivemap,tt.bumpmap,tt.normalmap,tt.displacementmap,tt.fog,tt.lights,{emissive:{value:new It(0)}}]),vertexShader:pn.meshlambert_vert,fragmentShader:pn.meshlambert_frag},phong:{uniforms:Hi([tt.common,tt.specularmap,tt.envmap,tt.aomap,tt.lightmap,tt.emissivemap,tt.bumpmap,tt.normalmap,tt.displacementmap,tt.fog,tt.lights,{emissive:{value:new It(0)},specular:{value:new It(1118481)},shininess:{value:30}}]),vertexShader:pn.meshphong_vert,fragmentShader:pn.meshphong_frag},standard:{uniforms:Hi([tt.common,tt.envmap,tt.aomap,tt.lightmap,tt.emissivemap,tt.bumpmap,tt.normalmap,tt.displacementmap,tt.roughnessmap,tt.metalnessmap,tt.fog,tt.lights,{emissive:{value:new It(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:pn.meshphysical_vert,fragmentShader:pn.meshphysical_frag},toon:{uniforms:Hi([tt.common,tt.aomap,tt.lightmap,tt.emissivemap,tt.bumpmap,tt.normalmap,tt.displacementmap,tt.gradientmap,tt.fog,tt.lights,{emissive:{value:new It(0)}}]),vertexShader:pn.meshtoon_vert,fragmentShader:pn.meshtoon_frag},matcap:{uniforms:Hi([tt.common,tt.bumpmap,tt.normalmap,tt.displacementmap,tt.fog,{matcap:{value:null}}]),vertexShader:pn.meshmatcap_vert,fragmentShader:pn.meshmatcap_frag},points:{uniforms:Hi([tt.points,tt.fog]),vertexShader:pn.points_vert,fragmentShader:pn.points_frag},dashed:{uniforms:Hi([tt.common,tt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:pn.linedashed_vert,fragmentShader:pn.linedashed_frag},depth:{uniforms:Hi([tt.common,tt.displacementmap]),vertexShader:pn.depth_vert,fragmentShader:pn.depth_frag},normal:{uniforms:Hi([tt.common,tt.bumpmap,tt.normalmap,tt.displacementmap,{opacity:{value:1}}]),vertexShader:pn.meshnormal_vert,fragmentShader:pn.meshnormal_frag},sprite:{uniforms:Hi([tt.sprite,tt.fog]),vertexShader:pn.sprite_vert,fragmentShader:pn.sprite_frag},background:{uniforms:{uvTransform:{value:new mn},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:pn.background_vert,fragmentShader:pn.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:pn.backgroundCube_vert,fragmentShader:pn.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:pn.cube_vert,fragmentShader:pn.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:pn.equirect_vert,fragmentShader:pn.equirect_frag},distanceRGBA:{uniforms:Hi([tt.common,tt.displacementmap,{referencePosition:{value:new T},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:pn.distanceRGBA_vert,fragmentShader:pn.distanceRGBA_frag},shadow:{uniforms:Hi([tt.lights,tt.fog,{color:{value:new It(0)},opacity:{value:1}}]),vertexShader:pn.shadow_vert,fragmentShader:pn.shadow_frag}};Ps.physical={uniforms:Hi([Ps.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new mn},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new mn},clearcoatNormalScale:{value:new ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new mn},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new mn},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new mn},sheen:{value:0},sheenColor:{value:new It(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new mn},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new mn},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new mn},transmissionSamplerSize:{value:new ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new mn},attenuationDistance:{value:0},attenuationColor:{value:new It(0)},specularColor:{value:new It(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new mn},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new mn},anisotropyVector:{value:new ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new mn}}]),vertexShader:pn.meshphysical_vert,fragmentShader:pn.meshphysical_frag};Zc={r:0,b:0,g:0};Rr=class extends gl{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,o=n+e,a=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Vo=4,am=[.125,.215,.35,.446,.526,.582],Qr=20,uh=new Rr,cm=new It,hh=null,fh=0,dh=0,$r=(1+Math.sqrt(5))/2,zo=1/$r,lm=[new T(1,1,1),new T(-1,1,1),new T(1,1,-1),new T(-1,1,-1),new T(0,$r,zo),new T(0,$r,-zo),new T(zo,0,$r),new T(-zo,0,$r),new T($r,zo,0),new T(-$r,zo,0)],yl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){hh=this._renderer.getRenderTarget(),fh=this._renderer.getActiveCubeFace(),dh=this._renderer.getActiveMipmapLevel(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=hm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(hh,fh,dh),e.scissorTest=!1,Kc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===jo||e.mapping===Zo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),hh=this._renderer.getRenderTarget(),fh=this._renderer.getActiveCubeFace(),dh=this._renderer.getActiveMipmapLevel();let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Vi,minFilter:Vi,generateMipmaps:!1,type:so,format:as,colorSpace:mi,depthBuffer:!1},i=um(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=um(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Zb(r)),this._blurMaterial=Kb(r,e,t)}return i}_compileMaterial(e){let t=new Rn(this._lodPlanes[0],e);this._renderer.compile(t,uh)}_sceneToCubeUV(e,t,n,i){let a=new di(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(cm),u.toneMapping=Sr,u.autoClear=!1;let d=new Wi({name:"PMREM.Background",side:Bi,depthWrite:!1,depthTest:!1}),g=new Rn(new qa,d),y=!1,m=e.background;m?m.isColor&&(d.color.copy(m),e.background=null,y=!0):(d.color.copy(cm),y=!0);for(let p=0;p<6;p++){let v=p%3;v===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):v===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));let _=this._cubeSize;Kc(i,v*_,p>2?_:0,_,_),u.setRenderTarget(i),y&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===jo||e.mapping===Zo;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=fm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=hm());let r=i?this._cubemapMaterial:this._equirectMaterial,o=new Rn(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let c=this._cubeSize;Kc(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,uh)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){let r=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=lm[(i-1)%lm.length];this._blur(e,i-1,i,r,o)}t.autoClear=n}_blur(e,t,n,i,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",r),this._halfBlur(o,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,h=new Rn(this._lodPlanes[i],l),f=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Qr-1),y=r/g,m=isFinite(r)?1+Math.floor(u*y):Qr;m>Qr&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Qr}`);let p=[],v=0;for(let R=0;R<Qr;++R){let O=R/y,M=Math.exp(-O*O/2);p.push(M),R===0?v+=M:R<m&&(v+=2*M)}for(let R=0;R<p.length;R++)p[R]=p[R]/v;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:_}=this;f.dTheta.value=g,f.mipInt.value=_-n;let E=this._sizeLods[i],w=3*E*(i>_-Vo?i-_+Vo:0),A=4*(this._cubeSize-E);Kc(t,w,A,3*E,2*E),c.setRenderTarget(t),c.render(h,uh)}};_l=class extends Oi{constructor(e,t,n,i,r,o,a,c,l,u){if(u=u!==void 0?u:to,u!==to&&u!==Ko)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===to&&(n=vr),n===void 0&&u===Ko&&(n=eo),super(null,i,r,o,a,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:fi,this.minFilter=c!==void 0?c:fi,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},m0=new Oi,g0=new _l(1,1);g0.compareFunction=u0;x0=new ml,y0=new Lh,_0=new xl,dm=[],pm=[],mm=new Float32Array(16),gm=new Float32Array(9),xm=new Float32Array(4);Uh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=TM(t.type)}},Fh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=XM(t.type)}},Bh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(e,t[a.id],n)}}},ph=/(\w+)(\])?(\[|\.)?/g;qo=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=e.getActiveUniform(t,i),o=e.getUniformLocation(t,r.name);qM(r,o,this)}}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){let a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let o=e[i];o.id in t&&n.push(o)}return n}};YM=37297,jM=0;iS=/^[ \t]*#include +<([\w\d./]+)>/gm;sS=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);oS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;pS=0,zh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new kh(e),t.set(e,n)),n}},kh=class{constructor(e){this.id=pS++,this.code=e,this.usedTimes=0}};bS=0;Hh=class extends $i{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=yy,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Vh=class extends $i{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},TS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,wS=`uniform sampler2D shadow_pass;
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
}`;Gh=class extends di{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},Us=class extends Zn{constructor(){super(),this.isGroup=!0,this.type="Group"}},IS={type:"move"},za=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Us,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Us,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new T,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new T),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Us,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new T,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new T),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let y of e.hand.values()){let m=t.getJointPose(y,n),p=this._getHandJoint(l,y);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(IS)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Us;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Wh=class extends wr{constructor(e,t){super();let n=this,i=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,h=null,f=null,d=null,g=null,y=t.getContextAttributes(),m=null,p=null,v=[],_=[],E=new ot,w=null,A=new di;A.layers.enable(1),A.viewport=new Bn;let R=new di;R.layers.enable(2),R.viewport=new Bn;let O=[A,R],M=new Gh;M.layers.enable(1),M.layers.enable(2);let P=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ie){let Fe=v[ie];return Fe===void 0&&(Fe=new za,v[ie]=Fe),Fe.getTargetRaySpace()},this.getControllerGrip=function(ie){let Fe=v[ie];return Fe===void 0&&(Fe=new za,v[ie]=Fe),Fe.getGripSpace()},this.getHand=function(ie){let Fe=v[ie];return Fe===void 0&&(Fe=new za,v[ie]=Fe),Fe.getHandSpace()};function X(ie){let Fe=_.indexOf(ie.inputSource);if(Fe===-1)return;let Ge=v[Fe];Ge!==void 0&&(Ge.update(ie.inputSource,ie.frame,l||o),Ge.dispatchEvent({type:ie.type,data:ie.inputSource}))}function ce(){i.removeEventListener("select",X),i.removeEventListener("selectstart",X),i.removeEventListener("selectend",X),i.removeEventListener("squeeze",X),i.removeEventListener("squeezestart",X),i.removeEventListener("squeezeend",X),i.removeEventListener("end",ce),i.removeEventListener("inputsourceschange",N);for(let ie=0;ie<v.length;ie++){let Fe=_[ie];Fe!==null&&(_[ie]=null,v[ie].disconnect(Fe))}P=null,G=null,e.setRenderTarget(m),d=null,f=null,h=null,i=null,p=null,st.stop(),n.isPresenting=!1,e.setPixelRatio(w),e.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ie){r=ie,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ie){a=ie,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(ie){l=ie},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(ie){if(i=ie,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",X),i.addEventListener("selectstart",X),i.addEventListener("selectend",X),i.addEventListener("squeeze",X),i.addEventListener("squeezestart",X),i.addEventListener("squeezeend",X),i.addEventListener("end",ce),i.addEventListener("inputsourceschange",N),y.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(E),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){let Fe={antialias:i.renderState.layers===void 0?y.antialias:!0,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(i,t,Fe),i.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),p=new ds(d.framebufferWidth,d.framebufferHeight,{format:as,type:Er,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil})}else{let Fe=null,Ge=null,Nt=null;y.depth&&(Nt=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Fe=y.stencil?Ko:to,Ge=y.stencil?eo:vr);let at={colorFormat:t.RGBA8,depthFormat:Nt,scaleFactor:r};h=new XRWebGLBinding(i,t),f=h.createProjectionLayer(at),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),p=new ds(f.textureWidth,f.textureHeight,{format:as,type:Er,depthTexture:new _l(f.textureWidth,f.textureHeight,Ge,void 0,void 0,void 0,void 0,void 0,void 0,Fe),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0});let Xt=e.properties.get(p);Xt.__ignoreDepthValues=f.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),st.setContext(i),st.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function N(ie){for(let Fe=0;Fe<ie.removed.length;Fe++){let Ge=ie.removed[Fe],Nt=_.indexOf(Ge);Nt>=0&&(_[Nt]=null,v[Nt].disconnect(Ge))}for(let Fe=0;Fe<ie.added.length;Fe++){let Ge=ie.added[Fe],Nt=_.indexOf(Ge);if(Nt===-1){for(let Xt=0;Xt<v.length;Xt++)if(Xt>=_.length){_.push(Ge),Nt=Xt;break}else if(_[Xt]===null){_[Xt]=Ge,Nt=Xt;break}if(Nt===-1)break}let at=v[Nt];at&&at.connect(Ge)}}let Z=new T,B=new T;function Te(ie,Fe,Ge){Z.setFromMatrixPosition(Fe.matrixWorld),B.setFromMatrixPosition(Ge.matrixWorld);let Nt=Z.distanceTo(B),at=Fe.projectionMatrix.elements,Xt=Ge.projectionMatrix.elements,tn=at[14]/(at[10]-1),Tt=at[14]/(at[10]+1),bn=(at[9]+1)/at[5],ae=(at[9]-1)/at[5],vi=(at[8]-1)/at[0],Ht=(Xt[8]+1)/Xt[0],Jt=tn*vi,At=tn*Ht,kn=Nt/(-vi+Ht),sn=kn*-vi;Fe.matrixWorld.decompose(ie.position,ie.quaternion,ie.scale),ie.translateX(sn),ie.translateZ(kn),ie.matrixWorld.compose(ie.position,ie.quaternion,ie.scale),ie.matrixWorldInverse.copy(ie.matrixWorld).invert();let D=tn+kn,C=Tt+kn,fe=Jt-sn,Ne=At+(Nt-sn),Ie=bn*Tt/C*D,Ye=ae*Tt/C*D;ie.projectionMatrix.makePerspective(fe,Ne,Ie,Ye,D,C),ie.projectionMatrixInverse.copy(ie.projectionMatrix).invert()}function Re(ie,Fe){Fe===null?ie.matrixWorld.copy(ie.matrix):ie.matrixWorld.multiplyMatrices(Fe.matrixWorld,ie.matrix),ie.matrixWorldInverse.copy(ie.matrixWorld).invert()}this.updateCamera=function(ie){if(i===null)return;M.near=R.near=A.near=ie.near,M.far=R.far=A.far=ie.far,(P!==M.near||G!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),P=M.near,G=M.far);let Fe=ie.parent,Ge=M.cameras;Re(M,Fe);for(let Nt=0;Nt<Ge.length;Nt++)Re(Ge[Nt],Fe);Ge.length===2?Te(M,A,R):M.projectionMatrix.copy(A.projectionMatrix),ne(ie,M,Fe)};function ne(ie,Fe,Ge){Ge===null?ie.matrix.copy(Fe.matrixWorld):(ie.matrix.copy(Ge.matrixWorld),ie.matrix.invert(),ie.matrix.multiply(Fe.matrixWorld)),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.updateMatrixWorld(!0),ie.projectionMatrix.copy(Fe.projectionMatrix),ie.projectionMatrixInverse.copy(Fe.projectionMatrixInverse),ie.isPerspectiveCamera&&(ie.fov=$o*2*Math.atan(1/ie.projectionMatrix.elements[5]),ie.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(ie){c=ie,f!==null&&(f.fixedFoveation=ie),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=ie)};let be=null;function qe(ie,Fe){if(u=Fe.getViewerPose(l||o),g=Fe,u!==null){let Ge=u.views;d!==null&&(e.setRenderTargetFramebuffer(p,d.framebuffer),e.setRenderTarget(p));let Nt=!1;Ge.length!==M.cameras.length&&(M.cameras.length=0,Nt=!0);for(let at=0;at<Ge.length;at++){let Xt=Ge[at],tn=null;if(d!==null)tn=d.getViewport(Xt);else{let bn=h.getViewSubImage(f,Xt);tn=bn.viewport,at===0&&(e.setRenderTargetTextures(p,bn.colorTexture,f.ignoreDepthValues?void 0:bn.depthStencilTexture),e.setRenderTarget(p))}let Tt=O[at];Tt===void 0&&(Tt=new di,Tt.layers.enable(at),Tt.viewport=new Bn,O[at]=Tt),Tt.matrix.fromArray(Xt.transform.matrix),Tt.matrix.decompose(Tt.position,Tt.quaternion,Tt.scale),Tt.projectionMatrix.fromArray(Xt.projectionMatrix),Tt.projectionMatrixInverse.copy(Tt.projectionMatrix).invert(),Tt.viewport.set(tn.x,tn.y,tn.width,tn.height),at===0&&(M.matrix.copy(Tt.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),Nt===!0&&M.cameras.push(Tt)}}for(let Ge=0;Ge<v.length;Ge++){let Nt=_[Ge],at=v[Ge];Nt!==null&&at!==void 0&&at.update(Nt,Fe,l||o)}be&&be(ie,Fe),Fe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Fe}),g=null}let st=new p0;st.setAnimationLoop(qe),this.setAnimationLoop=function(ie){be=ie},this.dispose=function(){}}};Ya=class{constructor(e={}){let{canvas:t=Vy(),context:n=null,depth:i=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=o;let d=new Uint32Array(4),g=new Int32Array(4),y=null,m=null,p=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Xn,this._useLegacyLights=!1,this.toneMapping=Sr,this.toneMappingExposure=1;let _=this,E=!1,w=0,A=0,R=null,O=-1,M=null,P=new Bn,G=new Bn,X=null,ce=new It(0),N=0,Z=t.width,B=t.height,Te=1,Re=null,ne=null,be=new Bn(0,0,Z,B),qe=new Bn(0,0,Z,B),st=!1,ie=new Ar,Fe=!1,Ge=!1,Nt=null,at=new Et,Xt=new ot,tn=new T,Tt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function bn(){return R===null?Te:1}let ae=n;function vi(I,K){for(let he=0;he<I.length;he++){let pe=I[he],le=t.getContext(pe,K);if(le!==null)return le}return null}try{let I={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${co}`),t.addEventListener("webglcontextlost",He,!1),t.addEventListener("webglcontextrestored",H,!1),t.addEventListener("webglcontextcreationerror",Je,!1),ae===null){let K=["webgl2","webgl","experimental-webgl"];if(_.isWebGL1Renderer===!0&&K.shift(),ae=vi(K,I),ae===null)throw vi(K)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext!="undefined"&&ae instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),ae.getShaderPrecisionFormat===void 0&&(ae.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(I){throw console.error("THREE.WebGLRenderer: "+I.message),I}let Ht,Jt,At,kn,sn,D,C,fe,Ne,Ie,Ye,ft,nt,et,Ot,qt,Be,wn,cn,jt,St,ut,Vt,En;function ke(){Ht=new $b(ae),Jt=new qb(ae,Ht,e),Ht.init(Jt),ut=new PS(ae,Ht,Jt),At=new RS(ae,Ht,Jt),kn=new tM(ae),sn=new gS,D=new CS(ae,Ht,At,sn,Jt,ut,kn),C=new jb(_),fe=new Jb(_),Ne=new l_(ae,Jt),Vt=new Wb(ae,Ht,Ne,Jt),Ie=new Qb(ae,Ne,kn,Vt),Ye=new rM(ae,Ie,Ne,kn),cn=new sM(ae,Jt,D),qt=new Yb(sn),ft=new mS(_,C,fe,Ht,Jt,Vt,qt),nt=new LS(_,sn),et=new yS,Ot=new ES(Ht,Jt),wn=new Gb(_,C,fe,At,Ye,f,c),Be=new AS(_,Ye,Jt),En=new NS(ae,kn,Jt,At),jt=new Xb(ae,Ht,kn,Jt),St=new eM(ae,Ht,kn,Jt),kn.programs=ft.programs,_.capabilities=Jt,_.extensions=Ht,_.properties=sn,_.renderLists=et,_.shadowMap=Be,_.state=At,_.info=kn}ke();let Ue=new Wh(_,ae);this.xr=Ue,this.getContext=function(){return ae},this.getContextAttributes=function(){return ae.getContextAttributes()},this.forceContextLoss=function(){let I=Ht.get("WEBGL_lose_context");I&&I.loseContext()},this.forceContextRestore=function(){let I=Ht.get("WEBGL_lose_context");I&&I.restoreContext()},this.getPixelRatio=function(){return Te},this.setPixelRatio=function(I){I!==void 0&&(Te=I,this.setSize(Z,B,!1))},this.getSize=function(I){return I.set(Z,B)},this.setSize=function(I,K,he=!0){if(Ue.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Z=I,B=K,t.width=Math.floor(I*Te),t.height=Math.floor(K*Te),he===!0&&(t.style.width=I+"px",t.style.height=K+"px"),this.setViewport(0,0,I,K)},this.getDrawingBufferSize=function(I){return I.set(Z*Te,B*Te).floor()},this.setDrawingBufferSize=function(I,K,he){Z=I,B=K,Te=he,t.width=Math.floor(I*he),t.height=Math.floor(K*he),this.setViewport(0,0,I,K)},this.getCurrentViewport=function(I){return I.copy(P)},this.getViewport=function(I){return I.copy(be)},this.setViewport=function(I,K,he,pe){I.isVector4?be.set(I.x,I.y,I.z,I.w):be.set(I,K,he,pe),At.viewport(P.copy(be).multiplyScalar(Te).floor())},this.getScissor=function(I){return I.copy(qe)},this.setScissor=function(I,K,he,pe){I.isVector4?qe.set(I.x,I.y,I.z,I.w):qe.set(I,K,he,pe),At.scissor(G.copy(qe).multiplyScalar(Te).floor())},this.getScissorTest=function(){return st},this.setScissorTest=function(I){At.setScissorTest(st=I)},this.setOpaqueSort=function(I){Re=I},this.setTransparentSort=function(I){ne=I},this.getClearColor=function(I){return I.copy(wn.getClearColor())},this.setClearColor=function(){wn.setClearColor.apply(wn,arguments)},this.getClearAlpha=function(){return wn.getClearAlpha()},this.setClearAlpha=function(){wn.setClearAlpha.apply(wn,arguments)},this.clear=function(I=!0,K=!0,he=!0){let pe=0;if(I){let le=!1;if(R!==null){let dt=R.texture.format;le=dt===o0||dt===r0||dt===s0}if(le){let dt=R.texture.type,Ct=dt===Er||dt===vr||dt===xf||dt===eo||dt===n0||dt===i0,Gt=wn.getClearColor(),Yt=wn.getClearAlpha(),un=Gt.r,$t=Gt.g,Wt=Gt.b;Ct?(d[0]=un,d[1]=$t,d[2]=Wt,d[3]=Yt,ae.clearBufferuiv(ae.COLOR,0,d)):(g[0]=un,g[1]=$t,g[2]=Wt,g[3]=Yt,ae.clearBufferiv(ae.COLOR,0,g))}else pe|=ae.COLOR_BUFFER_BIT}K&&(pe|=ae.DEPTH_BUFFER_BIT),he&&(pe|=ae.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ae.clear(pe)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",He,!1),t.removeEventListener("webglcontextrestored",H,!1),t.removeEventListener("webglcontextcreationerror",Je,!1),et.dispose(),Ot.dispose(),sn.dispose(),C.dispose(),fe.dispose(),Ye.dispose(),Vt.dispose(),En.dispose(),ft.dispose(),Ue.dispose(),Ue.removeEventListener("sessionstart",ci),Ue.removeEventListener("sessionend",In),Nt&&(Nt.dispose(),Nt=null),bi.stop()};function He(I){I.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function H(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;let I=kn.autoReset,K=Be.enabled,he=Be.autoUpdate,pe=Be.needsUpdate,le=Be.type;ke(),kn.autoReset=I,Be.enabled=K,Be.autoUpdate=he,Be.needsUpdate=pe,Be.type=le}function Je(I){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",I.statusMessage)}function We(I){let K=I.target;K.removeEventListener("dispose",We),wt(K)}function wt(I){zt(I),sn.remove(I)}function zt(I){let K=sn.get(I).programs;K!==void 0&&(K.forEach(function(he){ft.releaseProgram(he)}),I.isShaderMaterial&&ft.releaseShaderCache(I))}this.renderBufferDirect=function(I,K,he,pe,le,dt){K===null&&(K=Tt);let Ct=le.isMesh&&le.matrixWorld.determinant()<0,Gt=Mu(I,K,he,pe,le);At.setMaterial(pe,Ct);let Yt=he.index,un=1;if(pe.wireframe===!0){if(Yt=Ie.getWireframeAttribute(he),Yt===void 0)return;un=2}let $t=he.drawRange,Wt=he.attributes.position,Rt=$t.start*un,ii=($t.start+$t.count)*un;dt!==null&&(Rt=Math.max(Rt,dt.start*un),ii=Math.min(ii,(dt.start+dt.count)*un)),Yt!==null?(Rt=Math.max(Rt,0),ii=Math.min(ii,Yt.count)):Wt!=null&&(Rt=Math.max(Rt,0),ii=Math.min(ii,Wt.count));let Qt=ii-Rt;if(Qt<0||Qt===1/0)return;Vt.setup(le,pe,Gt,he,Yt);let Yi,Ln=jt;if(Yt!==null&&(Yi=Ne.get(Yt),Ln=St,Ln.setIndex(Yi)),le.isMesh)pe.wireframe===!0?(At.setLineWidth(pe.wireframeLinewidth*bn()),Ln.setMode(ae.LINES)):Ln.setMode(ae.TRIANGLES);else if(le.isLine){let hn=pe.linewidth;hn===void 0&&(hn=1),At.setLineWidth(hn*bn()),le.isLineSegments?Ln.setMode(ae.LINES):le.isLineLoop?Ln.setMode(ae.LINE_LOOP):Ln.setMode(ae.LINE_STRIP)}else le.isPoints?Ln.setMode(ae.POINTS):le.isSprite&&Ln.setMode(ae.TRIANGLES);if(le.isBatchedMesh)Ln.renderMultiDraw(le._multiDrawStarts,le._multiDrawCounts,le._multiDrawCount);else if(le.isInstancedMesh)Ln.renderInstances(Rt,Qt,le.count);else if(he.isInstancedBufferGeometry){let hn=he._maxInstanceCount!==void 0?he._maxInstanceCount:1/0,xo=Math.min(he.instanceCount,hn);Ln.renderInstances(Rt,Qt,xo)}else Ln.render(Rt,Qt)};function ln(I,K,he){I.transparent===!0&&I.side===Ti&&I.forceSinglePass===!1?(I.side=Bi,I.needsUpdate=!0,li(I,K,he),I.side=Gi,I.needsUpdate=!0,li(I,K,he),I.side=Ti):li(I,K,he)}this.compile=function(I,K,he=null){he===null&&(he=I),m=Ot.get(he),m.init(),v.push(m),he.traverseVisible(function(le){le.isLight&&le.layers.test(K.layers)&&(m.pushLight(le),le.castShadow&&m.pushShadow(le))}),I!==he&&I.traverseVisible(function(le){le.isLight&&le.layers.test(K.layers)&&(m.pushLight(le),le.castShadow&&m.pushShadow(le))}),m.setupLights(_._useLegacyLights);let pe=new Set;return I.traverse(function(le){let dt=le.material;if(dt)if(Array.isArray(dt))for(let Ct=0;Ct<dt.length;Ct++){let Gt=dt[Ct];ln(Gt,he,le),pe.add(Gt)}else ln(dt,he,le),pe.add(dt)}),v.pop(),m=null,pe},this.compileAsync=function(I,K,he=null){let pe=this.compile(I,K,he);return new Promise(le=>{function dt(){if(pe.forEach(function(Ct){sn.get(Ct).currentProgram.isReady()&&pe.delete(Ct)}),pe.size===0){le(I);return}setTimeout(dt,10)}Ht.get("KHR_parallel_shader_compile")!==null?dt():setTimeout(dt,10)})};let _n=null;function Jn(I){_n&&_n(I)}function ci(){bi.stop()}function In(){bi.start()}let bi=new p0;bi.setAnimationLoop(Jn),typeof self!="undefined"&&bi.setContext(self),this.setAnimationLoop=function(I){_n=I,Ue.setAnimationLoop(I),I===null?bi.stop():bi.start()},Ue.addEventListener("sessionstart",ci),Ue.addEventListener("sessionend",In),this.render=function(I,K){if(K!==void 0&&K.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),K.parent===null&&K.matrixWorldAutoUpdate===!0&&K.updateMatrixWorld(),Ue.enabled===!0&&Ue.isPresenting===!0&&(Ue.cameraAutoUpdate===!0&&Ue.updateCamera(K),K=Ue.getCamera()),I.isScene===!0&&I.onBeforeRender(_,I,K,R),m=Ot.get(I,v.length),m.init(),v.push(m),at.multiplyMatrices(K.projectionMatrix,K.matrixWorldInverse),ie.setFromProjectionMatrix(at),Ge=this.localClippingEnabled,Fe=qt.init(this.clippingPlanes,Ge),y=et.get(I,p.length),y.init(),p.push(y),ts(I,K,0,_.sortObjects),y.finish(),_.sortObjects===!0&&y.sort(Re,ne),this.info.render.frame++,Fe===!0&&qt.beginShadows();let he=m.state.shadowsArray;if(Be.render(he,I,K),Fe===!0&&qt.endShadows(),this.info.autoReset===!0&&this.info.reset(),wn.render(y,I),m.setupLights(_._useLegacyLights),K.isArrayCamera){let pe=K.cameras;for(let le=0,dt=pe.length;le<dt;le++){let Ct=pe[le];lr(y,I,Ct,Ct.viewport)}}else lr(y,I,K);R!==null&&(D.updateMultisampleRenderTarget(R),D.updateRenderTargetMipmap(R)),I.isScene===!0&&I.onAfterRender(_,I,K),Vt.resetDefaultState(),O=-1,M=null,v.pop(),v.length>0?m=v[v.length-1]:m=null,p.pop(),p.length>0?y=p[p.length-1]:y=null};function ts(I,K,he,pe){if(I.visible===!1)return;if(I.layers.test(K.layers)){if(I.isGroup)he=I.renderOrder;else if(I.isLOD)I.autoUpdate===!0&&I.update(K);else if(I.isLight)m.pushLight(I),I.castShadow&&m.pushShadow(I);else if(I.isSprite){if(!I.frustumCulled||ie.intersectsSprite(I)){pe&&tn.setFromMatrixPosition(I.matrixWorld).applyMatrix4(at);let Ct=Ye.update(I),Gt=I.material;Gt.visible&&y.push(I,Ct,Gt,he,tn.z,null)}}else if((I.isMesh||I.isLine||I.isPoints)&&(!I.frustumCulled||ie.intersectsObject(I))){let Ct=Ye.update(I),Gt=I.material;if(pe&&(I.boundingSphere!==void 0?(I.boundingSphere===null&&I.computeBoundingSphere(),tn.copy(I.boundingSphere.center)):(Ct.boundingSphere===null&&Ct.computeBoundingSphere(),tn.copy(Ct.boundingSphere.center)),tn.applyMatrix4(I.matrixWorld).applyMatrix4(at)),Array.isArray(Gt)){let Yt=Ct.groups;for(let un=0,$t=Yt.length;un<$t;un++){let Wt=Yt[un],Rt=Gt[Wt.materialIndex];Rt&&Rt.visible&&y.push(I,Ct,Rt,he,tn.z,Wt)}}else Gt.visible&&y.push(I,Ct,Gt,he,tn.z,null)}}let dt=I.children;for(let Ct=0,Gt=dt.length;Ct<Gt;Ct++)ts(dt[Ct],K,he,pe)}function lr(I,K,he,pe){let le=I.opaque,dt=I.transmissive,Ct=I.transparent;m.setupLightsView(he),Fe===!0&&qt.setGlobalState(_.clippingPlanes,he),dt.length>0&&zs(le,dt,K,he),pe&&At.viewport(P.copy(pe)),le.length>0&&ur(le,K,he),dt.length>0&&ur(dt,K,he),Ct.length>0&&ur(Ct,K,he),At.buffers.depth.setTest(!0),At.buffers.depth.setMask(!0),At.buffers.color.setMask(!0),At.setPolygonOffset(!1)}function zs(I,K,he,pe){if((he.isScene===!0?he.overrideMaterial:null)!==null)return;let dt=Jt.isWebGL2;Nt===null&&(Nt=new ds(1,1,{generateMipmaps:!0,type:Ht.has("EXT_color_buffer_half_float")?so:Er,minFilter:Tr,samples:dt?4:0})),_.getDrawingBufferSize(Xt),dt?Nt.setSize(Xt.x,Xt.y):Nt.setSize(fl(Xt.x),fl(Xt.y));let Ct=_.getRenderTarget();_.setRenderTarget(Nt),_.getClearColor(ce),N=_.getClearAlpha(),N<1&&_.setClearColor(16777215,.5),_.clear();let Gt=_.toneMapping;_.toneMapping=Sr,ur(I,he,pe),D.updateMultisampleRenderTarget(Nt),D.updateRenderTargetMipmap(Nt);let Yt=!1;for(let un=0,$t=K.length;un<$t;un++){let Wt=K[un],Rt=Wt.object,ii=Wt.geometry,Qt=Wt.material,Yi=Wt.group;if(Qt.side===Ti&&Rt.layers.test(pe.layers)){let Ln=Qt.side;Qt.side=Bi,Qt.needsUpdate=!0,ks(Rt,he,pe,ii,Qt,Yi),Qt.side=Ln,Qt.needsUpdate=!0,Yt=!0}}Yt===!0&&(D.updateMultisampleRenderTarget(Nt),D.updateRenderTargetMipmap(Nt)),_.setRenderTarget(Ct),_.setClearColor(ce,N),_.toneMapping=Gt}function ur(I,K,he){let pe=K.isScene===!0?K.overrideMaterial:null;for(let le=0,dt=I.length;le<dt;le++){let Ct=I[le],Gt=Ct.object,Yt=Ct.geometry,un=pe===null?Ct.material:pe,$t=Ct.group;Gt.layers.test(he.layers)&&ks(Gt,K,he,Yt,un,$t)}}function ks(I,K,he,pe,le,dt){I.onBeforeRender(_,K,he,pe,le,dt),I.modelViewMatrix.multiplyMatrices(he.matrixWorldInverse,I.matrixWorld),I.normalMatrix.getNormalMatrix(I.modelViewMatrix),le.onBeforeRender(_,K,he,pe,I,dt),le.transparent===!0&&le.side===Ti&&le.forceSinglePass===!1?(le.side=Bi,le.needsUpdate=!0,_.renderBufferDirect(he,K,pe,le,I,dt),le.side=Gi,le.needsUpdate=!0,_.renderBufferDirect(he,K,pe,le,I,dt),le.side=Ti):_.renderBufferDirect(he,K,pe,le,I,dt),I.onAfterRender(_,K,he,pe,le,dt)}function li(I,K,he){K.isScene!==!0&&(K=Tt);let pe=sn.get(I),le=m.state.lights,dt=m.state.shadowsArray,Ct=le.state.version,Gt=ft.getParameters(I,le.state,dt,K,he),Yt=ft.getProgramCacheKey(Gt),un=pe.programs;pe.environment=I.isMeshStandardMaterial?K.environment:null,pe.fog=K.fog,pe.envMap=(I.isMeshStandardMaterial?fe:C).get(I.envMap||pe.environment),un===void 0&&(I.addEventListener("dispose",We),un=new Map,pe.programs=un);let $t=un.get(Yt);if($t!==void 0){if(pe.currentProgram===$t&&pe.lightsStateVersion===Ct)return Vr(I,Gt),$t}else Gt.uniforms=ft.getUniforms(I),I.onBuild(he,Gt,_),I.onBeforeCompile(Gt,_),$t=ft.acquireProgram(Gt,Yt),un.set(Yt,$t),pe.uniforms=Gt.uniforms;let Wt=pe.uniforms;return(!I.isShaderMaterial&&!I.isRawShaderMaterial||I.clipping===!0)&&(Wt.clippingPlanes=qt.uniform),Vr(I,Gt),pe.needsLights=ns(I),pe.lightsStateVersion=Ct,pe.needsLights&&(Wt.ambientLightColor.value=le.state.ambient,Wt.lightProbe.value=le.state.probe,Wt.directionalLights.value=le.state.directional,Wt.directionalLightShadows.value=le.state.directionalShadow,Wt.spotLights.value=le.state.spot,Wt.spotLightShadows.value=le.state.spotShadow,Wt.rectAreaLights.value=le.state.rectArea,Wt.ltc_1.value=le.state.rectAreaLTC1,Wt.ltc_2.value=le.state.rectAreaLTC2,Wt.pointLights.value=le.state.point,Wt.pointLightShadows.value=le.state.pointShadow,Wt.hemisphereLights.value=le.state.hemi,Wt.directionalShadowMap.value=le.state.directionalShadowMap,Wt.directionalShadowMatrix.value=le.state.directionalShadowMatrix,Wt.spotShadowMap.value=le.state.spotShadowMap,Wt.spotLightMatrix.value=le.state.spotLightMatrix,Wt.spotLightMap.value=le.state.spotLightMap,Wt.pointShadowMap.value=le.state.pointShadowMap,Wt.pointShadowMatrix.value=le.state.pointShadowMatrix),pe.currentProgram=$t,pe.uniformsList=null,$t}function Mi(I){if(I.uniformsList===null){let K=I.currentProgram.getUniforms();I.uniformsList=qo.seqWithValue(K.seq,I.uniforms)}return I.uniformsList}function Vr(I,K){let he=sn.get(I);he.outputColorSpace=K.outputColorSpace,he.batching=K.batching,he.instancing=K.instancing,he.instancingColor=K.instancingColor,he.skinning=K.skinning,he.morphTargets=K.morphTargets,he.morphNormals=K.morphNormals,he.morphColors=K.morphColors,he.morphTargetsCount=K.morphTargetsCount,he.numClippingPlanes=K.numClippingPlanes,he.numIntersection=K.numClipIntersection,he.vertexAlphas=K.vertexAlphas,he.vertexTangents=K.vertexTangents,he.toneMapping=K.toneMapping}function Mu(I,K,he,pe,le){K.isScene!==!0&&(K=Tt),D.resetTextureUnits();let dt=K.fog,Ct=pe.isMeshStandardMaterial?K.environment:null,Gt=R===null?_.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:mi,Yt=(pe.isMeshStandardMaterial?fe:C).get(pe.envMap||Ct),un=pe.vertexColors===!0&&!!he.attributes.color&&he.attributes.color.itemSize===4,$t=!!he.attributes.tangent&&(!!pe.normalMap||pe.anisotropy>0),Wt=!!he.morphAttributes.position,Rt=!!he.morphAttributes.normal,ii=!!he.morphAttributes.color,Qt=Sr;pe.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(Qt=_.toneMapping);let Yi=he.morphAttributes.position||he.morphAttributes.normal||he.morphAttributes.color,Ln=Yi!==void 0?Yi.length:0,hn=sn.get(pe),xo=m.state.lights;if(Fe===!0&&(Ge===!0||I!==M)){let zi=I===M&&pe.id===O;qt.setState(pe,I,zi)}let Cn=!1;pe.version===hn.__version?(hn.needsLights&&hn.lightsStateVersion!==xo.state.version||hn.outputColorSpace!==Gt||le.isBatchedMesh&&hn.batching===!1||!le.isBatchedMesh&&hn.batching===!0||le.isInstancedMesh&&hn.instancing===!1||!le.isInstancedMesh&&hn.instancing===!0||le.isSkinnedMesh&&hn.skinning===!1||!le.isSkinnedMesh&&hn.skinning===!0||le.isInstancedMesh&&hn.instancingColor===!0&&le.instanceColor===null||le.isInstancedMesh&&hn.instancingColor===!1&&le.instanceColor!==null||hn.envMap!==Yt||pe.fog===!0&&hn.fog!==dt||hn.numClippingPlanes!==void 0&&(hn.numClippingPlanes!==qt.numPlanes||hn.numIntersection!==qt.numIntersection)||hn.vertexAlphas!==un||hn.vertexTangents!==$t||hn.morphTargets!==Wt||hn.morphNormals!==Rt||hn.morphColors!==ii||hn.toneMapping!==Qt||Jt.isWebGL2===!0&&hn.morphTargetsCount!==Ln)&&(Cn=!0):(Cn=!0,hn.__version=pe.version);let ji=hn.currentProgram;Cn===!0&&(ji=li(pe,K,le));let As=!1,Zi=!1,yo=!1,ui=ji.getUniforms(),Vs=hn.uniforms;if(At.useProgram(ji.program)&&(As=!0,Zi=!0,yo=!0),pe.id!==O&&(O=pe.id,Zi=!0),As||M!==I){ui.setValue(ae,"projectionMatrix",I.projectionMatrix),ui.setValue(ae,"viewMatrix",I.matrixWorldInverse);let zi=ui.map.cameraPosition;zi!==void 0&&zi.setValue(ae,tn.setFromMatrixPosition(I.matrixWorld)),Jt.logarithmicDepthBuffer&&ui.setValue(ae,"logDepthBufFC",2/(Math.log(I.far+1)/Math.LN2)),(pe.isMeshPhongMaterial||pe.isMeshToonMaterial||pe.isMeshLambertMaterial||pe.isMeshBasicMaterial||pe.isMeshStandardMaterial||pe.isShaderMaterial)&&ui.setValue(ae,"isOrthographic",I.isOrthographicCamera===!0),M!==I&&(M=I,Zi=!0,yo=!0)}if(le.isSkinnedMesh){ui.setOptional(ae,le,"bindMatrix"),ui.setOptional(ae,le,"bindMatrixInverse");let zi=le.skeleton;zi&&(Jt.floatVertexTextures?(zi.boneTexture===null&&zi.computeBoneTexture(),ui.setValue(ae,"boneTexture",zi.boneTexture,D)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}le.isBatchedMesh&&(ui.setOptional(ae,le,"batchingTexture"),ui.setValue(ae,"batchingTexture",le._matricesTexture,D));let va=he.morphAttributes;if((va.position!==void 0||va.normal!==void 0||va.color!==void 0&&Jt.isWebGL2===!0)&&cn.update(le,he,ji),(Zi||hn.receiveShadow!==le.receiveShadow)&&(hn.receiveShadow=le.receiveShadow,ui.setValue(ae,"receiveShadow",le.receiveShadow)),pe.isMeshGouraudMaterial&&pe.envMap!==null&&(Vs.envMap.value=Yt,Vs.flipEnvMap.value=Yt.isCubeTexture&&Yt.isRenderTargetTexture===!1?-1:1),Zi&&(ui.setValue(ae,"toneMappingExposure",_.toneMappingExposure),hn.needsLights&&Hs(Vs,yo),dt&&pe.fog===!0&&nt.refreshFogUniforms(Vs,dt),nt.refreshMaterialUniforms(Vs,pe,Te,B,Nt),qo.upload(ae,Mi(hn),Vs,D)),pe.isShaderMaterial&&pe.uniformsNeedUpdate===!0&&(qo.upload(ae,Mi(hn),Vs,D),pe.uniformsNeedUpdate=!1),pe.isSpriteMaterial&&ui.setValue(ae,"center",le.center),ui.setValue(ae,"modelViewMatrix",le.modelViewMatrix),ui.setValue(ae,"normalMatrix",le.normalMatrix),ui.setValue(ae,"modelMatrix",le.matrixWorld),pe.isShaderMaterial||pe.isRawShaderMaterial){let zi=pe.uniformsGroups;for(let Gr=0,Gs=zi.length;Gr<Gs;Gr++)if(Jt.isWebGL2){let ys=zi[Gr];En.update(ys,ji),En.bind(ys,ji)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return ji}function Hs(I,K){I.ambientLightColor.needsUpdate=K,I.lightProbe.needsUpdate=K,I.directionalLights.needsUpdate=K,I.directionalLightShadows.needsUpdate=K,I.pointLights.needsUpdate=K,I.pointLightShadows.needsUpdate=K,I.spotLights.needsUpdate=K,I.spotLightShadows.needsUpdate=K,I.rectAreaLights.needsUpdate=K,I.hemisphereLights.needsUpdate=K}function ns(I){return I.isMeshLambertMaterial||I.isMeshToonMaterial||I.isMeshPhongMaterial||I.isMeshStandardMaterial||I.isShadowMaterial||I.isShaderMaterial&&I.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(I,K,he){sn.get(I.texture).__webglTexture=K,sn.get(I.depthTexture).__webglTexture=he;let pe=sn.get(I);pe.__hasExternalTextures=!0,pe.__hasExternalTextures&&(pe.__autoAllocateDepthBuffer=he===void 0,pe.__autoAllocateDepthBuffer||Ht.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),pe.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(I,K){let he=sn.get(I);he.__webglFramebuffer=K,he.__useDefaultFramebuffer=K===void 0},this.setRenderTarget=function(I,K=0,he=0){R=I,w=K,A=he;let pe=!0,le=null,dt=!1,Ct=!1;if(I){let Yt=sn.get(I);Yt.__useDefaultFramebuffer!==void 0?(At.bindFramebuffer(ae.FRAMEBUFFER,null),pe=!1):Yt.__webglFramebuffer===void 0?D.setupRenderTarget(I):Yt.__hasExternalTextures&&D.rebindTextures(I,sn.get(I.texture).__webglTexture,sn.get(I.depthTexture).__webglTexture);let un=I.texture;(un.isData3DTexture||un.isDataArrayTexture||un.isCompressedArrayTexture)&&(Ct=!0);let $t=sn.get(I).__webglFramebuffer;I.isWebGLCubeRenderTarget?(Array.isArray($t[K])?le=$t[K][he]:le=$t[K],dt=!0):Jt.isWebGL2&&I.samples>0&&D.useMultisampledRTT(I)===!1?le=sn.get(I).__webglMultisampledFramebuffer:Array.isArray($t)?le=$t[he]:le=$t,P.copy(I.viewport),G.copy(I.scissor),X=I.scissorTest}else P.copy(be).multiplyScalar(Te).floor(),G.copy(qe).multiplyScalar(Te).floor(),X=st;if(At.bindFramebuffer(ae.FRAMEBUFFER,le)&&Jt.drawBuffers&&pe&&At.drawBuffers(I,le),At.viewport(P),At.scissor(G),At.setScissorTest(X),dt){let Yt=sn.get(I.texture);ae.framebufferTexture2D(ae.FRAMEBUFFER,ae.COLOR_ATTACHMENT0,ae.TEXTURE_CUBE_MAP_POSITIVE_X+K,Yt.__webglTexture,he)}else if(Ct){let Yt=sn.get(I.texture),un=K||0;ae.framebufferTextureLayer(ae.FRAMEBUFFER,ae.COLOR_ATTACHMENT0,Yt.__webglTexture,he||0,un)}O=-1},this.readRenderTargetPixels=function(I,K,he,pe,le,dt,Ct){if(!(I&&I.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Gt=sn.get(I).__webglFramebuffer;if(I.isWebGLCubeRenderTarget&&Ct!==void 0&&(Gt=Gt[Ct]),Gt){At.bindFramebuffer(ae.FRAMEBUFFER,Gt);try{let Yt=I.texture,un=Yt.format,$t=Yt.type;if(un!==as&&ut.convert(un)!==ae.getParameter(ae.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let Wt=$t===so&&(Ht.has("EXT_color_buffer_half_float")||Jt.isWebGL2&&Ht.has("EXT_color_buffer_float"));if($t!==Er&&ut.convert($t)!==ae.getParameter(ae.IMPLEMENTATION_COLOR_READ_TYPE)&&!($t===Ns&&(Jt.isWebGL2||Ht.has("OES_texture_float")||Ht.has("WEBGL_color_buffer_float")))&&!Wt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}K>=0&&K<=I.width-pe&&he>=0&&he<=I.height-le&&ae.readPixels(K,he,pe,le,ut.convert(un),ut.convert($t),dt)}finally{let Yt=R!==null?sn.get(R).__webglFramebuffer:null;At.bindFramebuffer(ae.FRAMEBUFFER,Yt)}}},this.copyFramebufferToTexture=function(I,K,he=0){let pe=Math.pow(2,-he),le=Math.floor(K.image.width*pe),dt=Math.floor(K.image.height*pe);D.setTexture2D(K,0),ae.copyTexSubImage2D(ae.TEXTURE_2D,he,0,0,I.x,I.y,le,dt),At.unbindTexture()},this.copyTextureToTexture=function(I,K,he,pe=0){let le=K.image.width,dt=K.image.height,Ct=ut.convert(he.format),Gt=ut.convert(he.type);D.setTexture2D(he,0),ae.pixelStorei(ae.UNPACK_FLIP_Y_WEBGL,he.flipY),ae.pixelStorei(ae.UNPACK_PREMULTIPLY_ALPHA_WEBGL,he.premultiplyAlpha),ae.pixelStorei(ae.UNPACK_ALIGNMENT,he.unpackAlignment),K.isDataTexture?ae.texSubImage2D(ae.TEXTURE_2D,pe,I.x,I.y,le,dt,Ct,Gt,K.image.data):K.isCompressedTexture?ae.compressedTexSubImage2D(ae.TEXTURE_2D,pe,I.x,I.y,K.mipmaps[0].width,K.mipmaps[0].height,Ct,K.mipmaps[0].data):ae.texSubImage2D(ae.TEXTURE_2D,pe,I.x,I.y,Ct,Gt,K.image),pe===0&&he.generateMipmaps&&ae.generateMipmap(ae.TEXTURE_2D),At.unbindTexture()},this.copyTextureToTexture3D=function(I,K,he,pe,le=0){if(_.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let dt=I.max.x-I.min.x+1,Ct=I.max.y-I.min.y+1,Gt=I.max.z-I.min.z+1,Yt=ut.convert(pe.format),un=ut.convert(pe.type),$t;if(pe.isData3DTexture)D.setTexture3D(pe,0),$t=ae.TEXTURE_3D;else if(pe.isDataArrayTexture||pe.isCompressedArrayTexture)D.setTexture2DArray(pe,0),$t=ae.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}ae.pixelStorei(ae.UNPACK_FLIP_Y_WEBGL,pe.flipY),ae.pixelStorei(ae.UNPACK_PREMULTIPLY_ALPHA_WEBGL,pe.premultiplyAlpha),ae.pixelStorei(ae.UNPACK_ALIGNMENT,pe.unpackAlignment);let Wt=ae.getParameter(ae.UNPACK_ROW_LENGTH),Rt=ae.getParameter(ae.UNPACK_IMAGE_HEIGHT),ii=ae.getParameter(ae.UNPACK_SKIP_PIXELS),Qt=ae.getParameter(ae.UNPACK_SKIP_ROWS),Yi=ae.getParameter(ae.UNPACK_SKIP_IMAGES),Ln=he.isCompressedTexture?he.mipmaps[le]:he.image;ae.pixelStorei(ae.UNPACK_ROW_LENGTH,Ln.width),ae.pixelStorei(ae.UNPACK_IMAGE_HEIGHT,Ln.height),ae.pixelStorei(ae.UNPACK_SKIP_PIXELS,I.min.x),ae.pixelStorei(ae.UNPACK_SKIP_ROWS,I.min.y),ae.pixelStorei(ae.UNPACK_SKIP_IMAGES,I.min.z),he.isDataTexture||he.isData3DTexture?ae.texSubImage3D($t,le,K.x,K.y,K.z,dt,Ct,Gt,Yt,un,Ln.data):he.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),ae.compressedTexSubImage3D($t,le,K.x,K.y,K.z,dt,Ct,Gt,Yt,Ln.data)):ae.texSubImage3D($t,le,K.x,K.y,K.z,dt,Ct,Gt,Yt,un,Ln),ae.pixelStorei(ae.UNPACK_ROW_LENGTH,Wt),ae.pixelStorei(ae.UNPACK_IMAGE_HEIGHT,Rt),ae.pixelStorei(ae.UNPACK_SKIP_PIXELS,ii),ae.pixelStorei(ae.UNPACK_SKIP_ROWS,Qt),ae.pixelStorei(ae.UNPACK_SKIP_IMAGES,Yi),le===0&&pe.generateMipmaps&&ae.generateMipmap($t),At.unbindTexture()},this.initTexture=function(I){I.isCubeTexture?D.setTextureCube(I,0):I.isData3DTexture?D.setTexture3D(I,0):I.isDataArrayTexture||I.isCompressedArrayTexture?D.setTexture2DArray(I,0):D.setTexture2D(I,0),At.unbindTexture()},this.resetState=function(){w=0,A=0,R=null,At.reset(),Vt.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ds}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=e===_f?"display-p3":"srgb",t.unpackColorSpace=An.workingColorSpace===Xl?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Xn?no:l0}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===no?Xn:mi}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}},Xh=class extends Ya{};Xh.prototype.isWebGL1Renderer=!0;Cr=class extends Zn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}},ja=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Rh,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Es()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Es()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Es()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},ki=new T,Za=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)ki.fromBufferAttribute(this,t),ki.applyMatrix4(e),this.setXYZ(t,ki.x,ki.y,ki.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ki.fromBufferAttribute(this,t),ki.applyNormalMatrix(e),this.setXYZ(t,ki.x,ki.y,ki.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ki.fromBufferAttribute(this,t),ki.transformDirection(e),this.setXYZ(t,ki.x,ki.y,ki.z);return this}setX(e,t){return this.normalized&&(t=Dn(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Dn(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Dn(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Dn(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ls(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ls(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ls(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ls(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Dn(t,this.array),n=Dn(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Dn(t,this.array),n=Dn(n,this.array),i=Dn(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Dn(t,this.array),n=Dn(n,this.array),i=Dn(i,this.array),r=Dn(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Pn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Rm=new T,Cm=new Bn,Pm=new Bn,DS=new T,Im=new Et,Jc=new T,mh=new ti,Lm=new Et,gh=new nr,vl=class extends Rn{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=dp,this.bindMatrix=new Et,this.bindMatrixInverse=new Et,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new an),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Jc),this.boundingBox.expandByPoint(Jc)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new ti),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Jc),this.boundingSphere.expandByPoint(Jc)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),mh.copy(this.boundingSphere),mh.applyMatrix4(i),e.ray.intersectsSphere(mh)!==!1&&(Lm.copy(i).invert(),gh.copy(e.ray).applyMatrix4(Lm),!(this.boundingBox!==null&&gh.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,gh)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Bn,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===dp?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===cy?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;Cm.fromBufferAttribute(i.attributes.skinIndex,e),Pm.fromBufferAttribute(i.attributes.skinWeight,e),Rm.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let o=Pm.getComponent(r);if(o!==0){let a=Cm.getComponent(r);Im.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(DS.copy(Rm).applyMatrix4(Im),o)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}},Ka=class extends Zn{constructor(){super(),this.isBone=!0,this.type="Bone"}},bl=class extends Oi{constructor(e=null,t=1,n=1,i,r,o,a,c,l=fi,u=fi,h,f){super(null,o,a,c,l,u,i,r,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Nm=new Et,US=new Et,Ml=class s{constructor(e=[],t=[]){this.uuid=Es(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Et)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Et;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:US;Nm.multiplyMatrices(a,t[r]),Nm.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new bl(t,e,e,as,Ns);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let r=e.bones[n],o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Ka),this.bones.push(o),this.boneInverses.push(new Et().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){let o=t[i];e.bones.push(o.uuid);let a=n[i];e.boneInverses.push(a.toArray())}return e}},ao=class extends Pn{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},ko=new Et,Dm=new Et,$c=[],Um=new an,FS=new Et,Ia=new Rn,La=new ti,Sl=class extends Rn{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ao(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,FS)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new an),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ko),Um.copy(e.boundingBox).applyMatrix4(ko),this.boundingBox.union(Um)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ti),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ko),La.copy(e.boundingSphere).applyMatrix4(ko),this.boundingSphere.union(La)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Ia.geometry=this.geometry,Ia.material=this.material,Ia.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),La.copy(this.boundingSphere),La.applyMatrix4(n),e.ray.intersectsSphere(La)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,ko),Dm.multiplyMatrices(n,ko),Ia.matrixWorld=Dm,Ia.raycast(e,$c);for(let o=0,a=$c.length;o<a;o++){let c=$c[o];c.instanceId=r,c.object=this,t.push(c)}$c.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ao(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}};qh=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t){let n=this.pool,i=this.list;this.index>=n.length&&n.push({start:-1,count:-1,z:-1});let r=n[this.index];i.push(r),this.index++,r.start=e.start,r.count=e.count,r.z=t}reset(){this.list.length=0,this.index=0}},Ho="batchId",_r=new Et,Fm=new Et,zS=new Et,Bm=new Et,xh=new Ar,Qc=new an,Jr=new ti,Na=new T,yh=new qh,Fi=new Rn,el=[];El=class extends Rn{get maxGeometryCount(){return this._maxGeometryCount}constructor(e,t,n=t*2,i){super(new wi,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._drawRanges=[],this._reservedRanges=[],this._visibility=[],this._active=[],this._bounds=[],this._maxGeometryCount=e,this._maxVertexCount=t,this._maxIndexCount=n,this._geometryInitialized=!1,this._geometryCount=0,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._visibilityChanged=!0,this._matricesTexture=null,this._initMatricesTexture()}_initMatricesTexture(){let e=Math.sqrt(this._maxGeometryCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4),n=new bl(t,e,e,as,Ns);this._matricesTexture=n}_initializeGeometry(e){let t=this.geometry,n=this._maxVertexCount,i=this._maxGeometryCount,r=this._maxIndexCount;if(this._geometryInitialized===!1){for(let a in e.attributes){let c=e.getAttribute(a),{array:l,itemSize:u,normalized:h}=c,f=new l.constructor(n*u),d=new c.constructor(f,u,h);d.setUsage(c.usage),t.setAttribute(a,d)}if(e.getIndex()!==null){let a=n>65536?new Uint32Array(r):new Uint16Array(r);t.setIndex(new Pn(a,1))}let o=i>65536?new Uint32Array(n):new Uint16Array(n);t.setAttribute(Ho,new Pn(o,1)),this._geometryInitialized=!0}}_validateGeometry(e){if(e.getAttribute(Ho))throw new Error(`BatchedMesh: Geometry cannot use attribute "${Ho}"`);let t=this.geometry;if(!!e.getIndex()!=!!t.getIndex())throw new Error('BatchedMesh: All geometries must consistently have "index".');for(let n in t.attributes){if(n===Ho)continue;if(!e.hasAttribute(n))throw new Error(`BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);let i=e.getAttribute(n),r=t.getAttribute(n);if(i.itemSize!==r.itemSize||i.normalized!==r.normalized)throw new Error("BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new an);let e=this._geometryCount,t=this.boundingBox,n=this._active;t.makeEmpty();for(let i=0;i<e;i++)n[i]!==!1&&(this.getMatrixAt(i,_r),this.getBoundingBoxAt(i,Qc).applyMatrix4(_r),t.union(Qc))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ti);let e=this._geometryCount,t=this.boundingSphere,n=this._active;t.makeEmpty();for(let i=0;i<e;i++)n[i]!==!1&&(this.getMatrixAt(i,_r),this.getBoundingSphereAt(i,Jr).applyMatrix4(_r),t.union(Jr))}addGeometry(e,t=-1,n=-1){if(this._initializeGeometry(e),this._validateGeometry(e),this._geometryCount>=this._maxGeometryCount)throw new Error("BatchedMesh: Maximum geometry count reached.");let i={vertexStart:-1,vertexCount:-1,indexStart:-1,indexCount:-1},r=null,o=this._reservedRanges,a=this._drawRanges,c=this._bounds;this._geometryCount!==0&&(r=o[o.length-1]),t===-1?i.vertexCount=e.getAttribute("position").count:i.vertexCount=t,r===null?i.vertexStart=0:i.vertexStart=r.vertexStart+r.vertexCount;let l=e.getIndex(),u=l!==null;if(u&&(n===-1?i.indexCount=l.count:i.indexCount=n,r===null?i.indexStart=0:i.indexStart=r.indexStart+r.indexCount),i.indexStart!==-1&&i.indexStart+i.indexCount>this._maxIndexCount||i.vertexStart+i.vertexCount>this._maxVertexCount)throw new Error("BatchedMesh: Reserved space request exceeds the maximum buffer size.");let h=this._visibility,f=this._active,d=this._matricesTexture,g=this._matricesTexture.image.data;h.push(!0),f.push(!0);let y=this._geometryCount;this._geometryCount++,zS.toArray(g,y*16),d.needsUpdate=!0,o.push(i),a.push({start:u?i.indexStart:i.vertexStart,count:-1}),c.push({boxInitialized:!1,box:new an,sphereInitialized:!1,sphere:new ti});let m=this.geometry.getAttribute(Ho);for(let p=0;p<i.vertexCount;p++)m.setX(i.vertexStart+p,y);return m.needsUpdate=!0,this.setGeometryAt(y,e),y}setGeometryAt(e,t){if(e>=this._geometryCount)throw new Error("BatchedMesh: Maximum geometry count reached.");this._validateGeometry(t);let n=this.geometry,i=n.getIndex()!==null,r=n.getIndex(),o=t.getIndex(),a=this._reservedRanges[e];if(i&&o.count>a.indexCount||t.attributes.position.count>a.vertexCount)throw new Error("BatchedMesh: Reserved space not large enough for provided geometry.");let c=a.vertexStart,l=a.vertexCount;for(let d in n.attributes){if(d===Ho)continue;let g=t.getAttribute(d),y=n.getAttribute(d);kS(g,y,c);let m=g.itemSize;for(let p=g.count,v=l;p<v;p++){let _=c+p;for(let E=0;E<m;E++)y.setComponent(_,E,0)}y.needsUpdate=!0}if(i){let d=a.indexStart;for(let g=0;g<o.count;g++)r.setX(d+g,c+o.getX(g));for(let g=o.count,y=a.indexCount;g<y;g++)r.setX(d+g,c);r.needsUpdate=!0}let u=this._bounds[e];t.boundingBox!==null?(u.box.copy(t.boundingBox),u.boxInitialized=!0):u.boxInitialized=!1,t.boundingSphere!==null?(u.sphere.copy(t.boundingSphere),u.sphereInitialized=!0):u.sphereInitialized=!1;let h=this._drawRanges[e],f=t.getAttribute("position");return h.count=i?o.count:f.count,this._visibilityChanged=!0,e}deleteGeometry(e){let t=this._active;return e>=t.length||t[e]===!1?this:(t[e]=!1,this._visibilityChanged=!0,this)}getBoundingBoxAt(e,t){if(this._active[e]===!1)return this;let i=this._bounds[e],r=i.box,o=this.geometry;if(i.boxInitialized===!1){r.makeEmpty();let a=o.index,c=o.attributes.position,l=this._drawRanges[e];for(let u=l.start,h=l.start+l.count;u<h;u++){let f=u;a&&(f=a.getX(f)),r.expandByPoint(Na.fromBufferAttribute(c,f))}i.boxInitialized=!0}return t.copy(r),t}getBoundingSphereAt(e,t){if(this._active[e]===!1)return this;let i=this._bounds[e],r=i.sphere,o=this.geometry;if(i.sphereInitialized===!1){r.makeEmpty(),this.getBoundingBoxAt(e,Qc),Qc.getCenter(r.center);let a=o.index,c=o.attributes.position,l=this._drawRanges[e],u=0;for(let h=l.start,f=l.start+l.count;h<f;h++){let d=h;a&&(d=a.getX(d)),Na.fromBufferAttribute(c,d),u=Math.max(u,r.center.distanceToSquared(Na))}r.radius=Math.sqrt(u),i.sphereInitialized=!0}return t.copy(r),t}setMatrixAt(e,t){let n=this._active,i=this._matricesTexture,r=this._matricesTexture.image.data,o=this._geometryCount;return e>=o||n[e]===!1?this:(t.toArray(r,e*16),i.needsUpdate=!0,this)}getMatrixAt(e,t){let n=this._active,i=this._matricesTexture.image.data,r=this._geometryCount;return e>=r||n[e]===!1?null:t.fromArray(i,e*16)}setVisibleAt(e,t){let n=this._visibility,i=this._active,r=this._geometryCount;return e>=r||i[e]===!1||n[e]===t?this:(n[e]=t,this._visibilityChanged=!0,this)}getVisibleAt(e){let t=this._visibility,n=this._active,i=this._geometryCount;return e>=i||n[e]===!1?!1:t[e]}raycast(e,t){let n=this._visibility,i=this._active,r=this._drawRanges,o=this._geometryCount,a=this.matrixWorld,c=this.geometry;Fi.material=this.material,Fi.geometry.index=c.index,Fi.geometry.attributes=c.attributes,Fi.geometry.boundingBox===null&&(Fi.geometry.boundingBox=new an),Fi.geometry.boundingSphere===null&&(Fi.geometry.boundingSphere=new ti);for(let l=0;l<o;l++){if(!n[l]||!i[l])continue;let u=r[l];Fi.geometry.setDrawRange(u.start,u.count),this.getMatrixAt(l,Fi.matrixWorld).premultiply(a),this.getBoundingBoxAt(l,Fi.geometry.boundingBox),this.getBoundingSphereAt(l,Fi.geometry.boundingSphere),Fi.raycast(e,el);for(let h=0,f=el.length;h<f;h++){let d=el[h];d.object=this,d.batchId=l,t.push(d)}el.length=0}Fi.material=null,Fi.geometry.index=null,Fi.geometry.attributes={},Fi.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._drawRanges=e._drawRanges.map(t=>({...t})),this._reservedRanges=e._reservedRanges.map(t=>({...t})),this._visibility=e._visibility.slice(),this._active=e._active.slice(),this._bounds=e._bounds.map(t=>({boxInitialized:t.boxInitialized,box:t.box.clone(),sphereInitialized:t.sphereInitialized,sphere:t.sphere.clone()})),this._maxGeometryCount=e._maxGeometryCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._geometryCount=e._geometryCount,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.slice(),this}dispose(){return this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this}onBeforeRender(e,t,n,i,r){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;let o=i.getIndex(),a=o===null?1:o.array.BYTES_PER_ELEMENT,c=this._visibility,l=this._multiDrawStarts,u=this._multiDrawCounts,h=this._drawRanges,f=this.perObjectFrustumCulled;f&&(Bm.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),xh.setFromProjectionMatrix(Bm,e.isWebGPURenderer?Ga:Ds));let d=0;if(this.sortObjects){Fm.copy(this.matrixWorld).invert(),Na.setFromMatrixPosition(n.matrixWorld).applyMatrix4(Fm);for(let m=0,p=c.length;m<p;m++)if(c[m]){this.getMatrixAt(m,_r),this.getBoundingSphereAt(m,Jr).applyMatrix4(_r);let v=!1;if(f&&(v=!xh.intersectsSphere(Jr)),!v){let _=Na.distanceTo(Jr.center);yh.push(h[m],_)}}let g=yh.list,y=this.customSort;y===null?g.sort(r.transparent?OS:BS):y.call(this,g,n);for(let m=0,p=g.length;m<p;m++){let v=g[m];l[d]=v.start*a,u[d]=v.count,d++}yh.reset()}else for(let g=0,y=c.length;g<y;g++)if(c[g]){let m=!1;if(f&&(this.getMatrixAt(g,_r),this.getBoundingSphereAt(g,Jr).applyMatrix4(_r),m=!xh.intersectsSphere(Jr)),!m){let p=h[g];l[d]=p.start*a,u[d]=p.count,d++}}this._multiDrawCount=d,this._visibilityChanged=!1}onBeforeShadow(e,t,n,i,r,o){this.onBeforeRender(e,null,i,r,o)}},Ja=class extends $i{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new It(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Om=new T,zm=new T,km=new Et,_h=new nr,tl=new ti,ia=class extends Zn{constructor(e=new wi,t=new Ja){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Om.fromBufferAttribute(t,i-1),zm.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Om.distanceTo(zm);e.setAttribute("lineDistance",new pi(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),tl.copy(n.boundingSphere),tl.applyMatrix4(i),tl.radius+=r,e.ray.intersectsSphere(tl)===!1)return;km.copy(i).invert(),_h.copy(e.ray).applyMatrix4(km);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=new T,u=new T,h=new T,f=new T,d=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){let p=Math.max(0,o.start),v=Math.min(g.count,o.start+o.count);for(let _=p,E=v-1;_<E;_+=d){let w=g.getX(_),A=g.getX(_+1);if(l.fromBufferAttribute(m,w),u.fromBufferAttribute(m,A),_h.distanceSqToSegment(l,u,f,h)>c)continue;f.applyMatrix4(this.matrixWorld);let O=e.ray.origin.distanceTo(f);O<e.near||O>e.far||t.push({distance:O,point:h.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}else{let p=Math.max(0,o.start),v=Math.min(m.count,o.start+o.count);for(let _=p,E=v-1;_<E;_+=d){if(l.fromBufferAttribute(m,_),u.fromBufferAttribute(m,_+1),_h.distanceSqToSegment(l,u,f,h)>c)continue;f.applyMatrix4(this.matrixWorld);let A=e.ray.origin.distanceTo(f);A<e.near||A>e.far||t.push({distance:A,point:h.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}},Hm=new T,Vm=new T,Tl=class extends ia{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Hm.fromBufferAttribute(t,i),Vm.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Hm.distanceTo(Vm);e.setAttribute("lineDistance",new pi(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},wl=class extends ia{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},$a=class extends $i{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new It(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Gm=new Et,Yh=new nr,nl=new ti,il=new T,Al=class extends Zn{constructor(e=new wi,t=new $a){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),nl.copy(n.boundingSphere),nl.applyMatrix4(i),nl.radius+=r,e.ray.intersectsSphere(nl)===!1)return;Gm.copy(i).invert(),Yh.copy(e.ray).applyMatrix4(Gm);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,h=n.attributes.position;if(l!==null){let f=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let g=f,y=d;g<y;g++){let m=l.getX(g);il.fromBufferAttribute(h,m),Wm(il,m,c,i,e,t,this)}}else{let f=Math.max(0,o.start),d=Math.min(h.count,o.start+o.count);for(let g=f,y=d;g<y;g++)il.fromBufferAttribute(h,g),Wm(il,g,c,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};Ts=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){let n=this.getLengths(),i=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-o,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===o)return i/(r-1);let u=n[i],f=n[i+1]-u,d=(o-u)/f;return(i+d)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);let o=this.getPoint(i),a=this.getPoint(r),c=t||(o.isVector2?new ot:new T);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){let n=new T,i=[],r=[],o=[],a=new T,c=new Et;for(let d=0;d<=e;d++){let g=d/e;i[d]=this.getTangentAt(g,new T)}r[0]=new T,o[0]=new T;let l=Number.MAX_VALUE,u=Math.abs(i[0].x),h=Math.abs(i[0].y),f=Math.abs(i[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),f<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(i[d-1],i[d]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(oi(i[d-1].dot(i[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,g))}o[d].crossVectors(i[d],r[d])}if(t===!0){let d=Math.acos(oi(r[0].dot(r[e]),-1,1));d/=e,i[0].dot(a.crossVectors(r[0],r[e]))>0&&(d=-d);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(i[g],d*g)),o[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Rl=class extends Ts{constructor(e=0,t=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t){let n=t||new ot,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);let a=this.aStartAngle+e*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*u-d*h+this.aX,l=f*h+d*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},jh=class extends Rl{constructor(e,t,n,i,r,o){super(e,t,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};sl=new T,vh=new Mf,bh=new Mf,Mh=new Mf,Qa=class extends Ts{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new T){let n=t,i=this.points,r=i.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,u;this.closed||a>0?l=i[(a-1)%r]:(sl.subVectors(i[0],i[1]).add(i[0]),l=sl);let h=i[a%r],f=i[(a+1)%r];if(this.closed||a+2<r?u=i[(a+2)%r]:(sl.subVectors(i[r-1],i[r-2]).add(i[r-1]),u=sl),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(h),d),y=Math.pow(h.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(u),d);y<1e-4&&(y=1),g<1e-4&&(g=y),m<1e-4&&(m=y),vh.initNonuniformCatmullRom(l.x,h.x,f.x,u.x,g,y,m),bh.initNonuniformCatmullRom(l.y,h.y,f.y,u.y,g,y,m),Mh.initNonuniformCatmullRom(l.z,h.z,f.z,u.z,g,y,m)}else this.curveType==="catmullrom"&&(vh.initCatmullRom(l.x,h.x,f.x,u.x,this.tension),bh.initCatmullRom(l.y,h.y,f.y,u.y,this.tension),Mh.initCatmullRom(l.z,h.z,f.z,u.z,this.tension));return n.set(vh.calc(c),bh.calc(c),Mh.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new T().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};Zh=class extends Ts{constructor(e=new ot,t=new ot,n=new ot,i=new ot){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new ot){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Ha(e,i.x,r.x,o.x,a.x),Ha(e,i.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Kh=class extends Ts{constructor(e=new T,t=new T,n=new T,i=new T){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new T){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Ha(e,i.x,r.x,o.x,a.x),Ha(e,i.y,r.y,o.y,a.y),Ha(e,i.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Jh=class extends Ts{constructor(e=new ot,t=new ot){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ot){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ot){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},$h=class extends Ts{constructor(e=new T,t=new T){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new T){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new T){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Qh=class extends Ts{constructor(e=new ot,t=new ot,n=new ot){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ot){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(ka(e,i.x,r.x,o.x),ka(e,i.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Cl=class extends Ts{constructor(e=new T,t=new T,n=new T){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new T){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(ka(e,i.x,r.x,o.x),ka(e,i.y,r.y,o.y),ka(e,i.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ef=class extends Ts{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ot){let n=t,i=this.points,r=(i.length-1)*e,o=Math.floor(r),a=r-o,c=i[o===0?o:o-1],l=i[o],u=i[o>i.length-2?i.length-1:o+1],h=i[o>i.length-3?i.length-1:o+2];return n.set(Xm(a,c.x,l.x,u.x,h.x),Xm(a,c.y,l.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new ot().fromArray(i))}return this}},jS=Object.freeze({__proto__:null,ArcCurve:jh,CatmullRomCurve3:Qa,CubicBezierCurve:Zh,CubicBezierCurve3:Kh,EllipseCurve:Rl,LineCurve:Jh,LineCurve3:$h,QuadraticBezierCurve:Qh,QuadraticBezierCurve3:Cl,SplineCurve:ef}),Pl=class s extends wi{constructor(e=new Cl(new T(-1,-1,0),new T(-1,1,0),new T(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};let o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new T,c=new T,l=new ot,u=new T,h=[],f=[],d=[],g=[];y(),this.setIndex(g),this.setAttribute("position",new pi(h,3)),this.setAttribute("normal",new pi(f,3)),this.setAttribute("uv",new pi(d,2));function y(){for(let _=0;_<t;_++)m(_);m(r===!1?t:0),v(),p()}function m(_){u=e.getPointAt(_/t,u);let E=o.normals[_],w=o.binormals[_];for(let A=0;A<=i;A++){let R=A/i*Math.PI*2,O=Math.sin(R),M=-Math.cos(R);c.x=M*E.x+O*w.x,c.y=M*E.y+O*w.y,c.z=M*E.z+O*w.z,c.normalize(),f.push(c.x,c.y,c.z),a.x=u.x+n*c.x,a.y=u.y+n*c.y,a.z=u.z+n*c.z,h.push(a.x,a.y,a.z)}}function p(){for(let _=1;_<=t;_++)for(let E=1;E<=i;E++){let w=(i+1)*(_-1)+(E-1),A=(i+1)*_+(E-1),R=(i+1)*_+E,O=(i+1)*(_-1)+E;g.push(w,A,O),g.push(A,R,O)}}function v(){for(let _=0;_<=t;_++)for(let E=0;E<=i;E++)l.x=_/t,l.y=E/i,d.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new s(new jS[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},Pr=class extends $i{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new It(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new It(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=yf,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ps=class extends Pr{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ot(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return oi(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new It(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new It(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new It(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},Il=class extends $i{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new It(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new It(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=yf,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=mf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};Ir=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},tf=class extends Ir{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:zp,endingEnd:zp}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,o=e+1,a=i[r],c=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case kp:r=e,a=2*t-n;break;case Hp:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case kp:o=e,c=2*n-t;break;case Hp:o=1,c=n+i[1]-i[0];break;default:o=e-1,c=t}let l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,d=this._weightNext,g=(n-t)/(i-t),y=g*g,m=y*g,p=-f*m+2*f*y-f*g,v=(1+f)*m+(-1.5-2*f)*y+(-.5+f)*g+1,_=(-1-d)*m+(1.5+d)*y+.5*g,E=d*m-d*y;for(let w=0;w!==a;++w)r[w]=p*o[u+w]+v*o[l+w]+_*o[c+w]+E*o[h+w];return r}},nf=class extends Ir{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(n-t)/(i-t),h=1-u;for(let f=0;f!==a;++f)r[f]=o[l+f]*h+o[c+f]*u;return r}},sf=class extends Ir{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},ms=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=rl(t,this.TimeBufferType),this.values=rl(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:rl(e.times,Array),values:rl(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new sf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new nf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new tf(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Jo:t=this.InterpolantFactoryMethodDiscrete;break;case ro:t=this.InterpolantFactoryMethodLinear;break;case qu:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Jo;case this.InterpolantFactoryMethodLinear:return ro;case this.InterpolantFactoryMethodSmooth:return qu}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(i!==void 0&&ZS(i))for(let a=0,c=i.length;a!==c;++a){let l=i[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===qu,r=e.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(i)c=!0;else{let h=a*n,f=h-n,d=h+n;for(let g=0;g!==n;++g){let y=t[h+g];if(y!==t[f+g]||y!==t[d+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let h=a*n,f=o*n;for(let d=0;d!==n;++d)t[f+d]=t[h+d]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};ms.prototype.TimeBufferType=Float32Array;ms.prototype.ValueBufferType=Float32Array;ms.prototype.DefaultInterpolation=ro;Lr=class extends ms{};Lr.prototype.ValueTypeName="bool";Lr.prototype.ValueBufferType=Array;Lr.prototype.DefaultInterpolation=Jo;Lr.prototype.InterpolantFactoryMethodLinear=void 0;Lr.prototype.InterpolantFactoryMethodSmooth=void 0;Ll=class extends ms{};Ll.prototype.ValueTypeName="color";ir=class extends ms{};ir.prototype.ValueTypeName="number";rf=class extends Ir{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(i-t),l=e*a;for(let u=l+a;l!==u;l+=4)gi.slerpFlat(r,0,o,l-a,o,l,c);return r}},Fs=class extends ms{InterpolantFactoryMethodLinear(e){return new rf(this.times,this.values,this.getValueSize(),e)}};Fs.prototype.ValueTypeName="quaternion";Fs.prototype.DefaultInterpolation=ro;Fs.prototype.InterpolantFactoryMethodSmooth=void 0;Nr=class extends ms{};Nr.prototype.ValueTypeName="string";Nr.prototype.ValueBufferType=Array;Nr.prototype.DefaultInterpolation=Jo;Nr.prototype.InterpolantFactoryMethodLinear=void 0;Nr.prototype.InterpolantFactoryMethodSmooth=void 0;sr=class extends ms{};sr.prototype.ValueTypeName="vector";Nl=class{constructor(e,t=-1,n,i=xy){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Es(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push($S(n[o]).scale(i));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(ms.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let r=t.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);let u=KS(c);c=qm(c,1,u),l=qm(l,1,u),!i&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new ir(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){let l=e[a],u=l.name.match(r);if(u&&u.length>1){let h=u[1],f=i[h];f||(i[h]=f=[]),f.push(l)}}let o=[];for(let a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(h,f,d,g,y){if(d.length!==0){let m=[],p=[];v0(d,m,p,g),m.length!==0&&y.push(new h(f,m,p))}},i=[],r=e.name||"default",o=e.fps||30,a=e.blendMode,c=e.length||-1,l=e.hierarchy||[];for(let h=0;h<l.length;h++){let f=l[h].keys;if(!(!f||f.length===0))if(f[0].morphTargets){let d={},g;for(g=0;g<f.length;g++)if(f[g].morphTargets)for(let y=0;y<f[g].morphTargets.length;y++)d[f[g].morphTargets[y]]=-1;for(let y in d){let m=[],p=[];for(let v=0;v!==f[g].morphTargets.length;++v){let _=f[g];m.push(_.time),p.push(_.morphTarget===y?1:0)}i.push(new ir(".morphTargetInfluence["+y+"]",m,p))}c=d.length*o}else{let d=".bones["+t[h].name+"]";n(sr,d+".position",f,"pos",i),n(Fs,d+".quaternion",f,"rot",i),n(sr,d+".scale",f,"scl",i)}}return i.length===0?null:new this(r,c,i,a)}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};br={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}},of=class{constructor(e,t,n){let i=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,r===!1&&i.onStart!==void 0&&i.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,i.onProgress!==void 0&&i.onProgress(u,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){let h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=l.length;h<f;h+=2){let d=l[h],g=l[h+1];if(d.global&&(d.lastIndex=0),d.test(u))return g}return null}}},QS=new of,rr=class{constructor(e){this.manager=e!==void 0?e:QS,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};rr.DEFAULT_MATERIAL_NAME="__DEFAULT";er={},af=class extends Error{constructor(e,t){super(e),this.response=t}},ec=class extends rr{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=br.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(er[e]!==void 0){er[e].push({onLoad:t,onProgress:n,onError:i});return}er[e]=[],er[e].push({onLoad:t,onProgress:n,onError:i});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream=="undefined"||l.body===void 0||l.body.getReader===void 0)return l;let u=er[e],h=l.body.getReader(),f=l.headers.get("Content-Length")||l.headers.get("X-File-Size"),d=f?parseInt(f):0,g=d!==0,y=0,m=new ReadableStream({start(p){v();function v(){h.read().then(({done:_,value:E})=>{if(_)p.close();else{y+=E.byteLength;let w=new ProgressEvent("progress",{lengthComputable:g,loaded:y,total:d});for(let A=0,R=u.length;A<R;A++){let O=u[A];O.onProgress&&O.onProgress(w)}p.enqueue(E),v()}})}}});return new Response(m)}else throw new af(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return l.json();default:if(a===void 0)return l.text();{let h=/charset="?([^;"\s]*)"?/i.exec(a),f=h&&h[1]?h[1].toLowerCase():void 0,d=new TextDecoder(f);return l.arrayBuffer().then(g=>d.decode(g))}}}).then(l=>{br.add(e,l);let u=er[e];delete er[e];for(let h=0,f=u.length;h<f;h++){let d=u[h];d.onLoad&&d.onLoad(l)}}).catch(l=>{let u=er[e];if(u===void 0)throw this.manager.itemError(e),l;delete er[e];for(let h=0,f=u.length;h<f;h++){let d=u[h];d.onError&&d.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}},cf=class extends rr{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=br.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;let a=Wa("img");function c(){u(),br.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(h){u(),i&&i(h),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}},Dl=class extends rr{constructor(e){super(e)}load(e,t,n,i){let r=new Oi,o=new cf(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}},sa=class extends Zn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new It(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}},Ul=class extends sa{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Zn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new It(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Sh=new Et,Ym=new T,jm=new T,tc=class{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ot(512,512),this.map=null,this.mapPass=null,this.matrix=new Et,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ar,this._frameExtents=new ot(1,1),this._viewportCount=1,this._viewports=[new Bn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Ym.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ym),jm.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(jm),t.updateMatrixWorld(),Sh.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Sh),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Sh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},lf=class extends tc{constructor(){super(new di(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,n=$o*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Fl=class extends sa{constructor(e,t,n=0,i=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Zn.DEFAULT_UP),this.updateMatrix(),this.target=new Zn,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new lf}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Zm=new Et,Da=new T,Eh=new T,uf=class extends tc{constructor(){super(new di(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ot(4,2),this._viewportCount=6,this._viewports=[new Bn(2,1,1,1),new Bn(0,1,1,1),new Bn(3,1,1,1),new Bn(1,1,1,1),new Bn(3,0,1,1),new Bn(1,0,1,1)],this._cubeDirections=[new T(1,0,0),new T(-1,0,0),new T(0,0,1),new T(0,0,-1),new T(0,1,0),new T(0,-1,0)],this._cubeUps=[new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,0,1),new T(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Da.setFromMatrixPosition(e.matrixWorld),n.position.copy(Da),Eh.copy(n.position),Eh.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Eh),n.updateMatrixWorld(),i.makeTranslation(-Da.x,-Da.y,-Da.z),Zm.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Zm)}},Bl=class extends sa{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new uf}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},hf=class extends tc{constructor(){super(new Rr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ra=class extends sa{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Zn.DEFAULT_UP),this.updateMatrix(),this.target=new Zn,this.shadow=new hf}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Dr=class{static decodeText(e){if(typeof TextDecoder!="undefined")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}},Ol=class extends rr{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap=="undefined"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch=="undefined"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=br.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{i&&i(l)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;let c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return br.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){i&&i(l),br.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});br.add(e,c),r.manager.itemStart(e)}},Sf="\\[\\]\\.:\\/",eE=new RegExp("["+Sf+"]","g"),Ef="[^"+Sf+"]",tE="[^"+Sf.replace("\\.","")+"]",nE=/((?:WC+[\/:])*)/.source.replace("WC",Ef),iE=/(WCOD+)?/.source.replace("WCOD",tE),sE=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ef),rE=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ef),oE=new RegExp("^"+nE+iE+sE+rE+"$"),aE=["material","materials","bones","map"],ff=class{constructor(e,t,n){let i=n||Hn.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Hn=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(eE,"")}static parseTrackName(e){let t=oE.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);aE.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[i];if(o===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Hn.Composite=ff;Hn.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Hn.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Hn.prototype.GetterByBindingType=[Hn.prototype._getValue_direct,Hn.prototype._getValue_array,Hn.prototype._getValue_arrayElement,Hn.prototype._getValue_toArray];Hn.prototype.SetterByBindingTypeAndVersioning=[[Hn.prototype._setValue_direct,Hn.prototype._setValue_direct_setNeedsUpdate,Hn.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Hn.prototype._setValue_array,Hn.prototype._setValue_array_setNeedsUpdate,Hn.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Hn.prototype._setValue_arrayElement,Hn.prototype._setValue_arrayElement_setNeedsUpdate,Hn.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Hn.prototype._setValue_fromArray,Hn.prototype._setValue_fromArray_setNeedsUpdate,Hn.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];u1=new Float32Array(1),nc=class{constructor(e,t,n=0,i=1/0){this.ray=new nr(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Xa,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return df(e,this,n,t),n.sort(Km),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)df(e[i],this,n,t);return n.sort(Km),n}};zl=class{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(oi(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}},Jm=new T,ol=new T,Qi=class{constructor(e=new T,t=new T){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){Jm.subVectors(e,this.start),ol.subVectors(this.end,this.start);let n=ol.dot(ol),r=ol.dot(Jm)/n;return t&&(r=oi(r,0,1)),r}closestPointToPoint(e,t,n){let i=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(i).add(this.start)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}};typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:co}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=co)});var Tf,b0=Bt(()=>{Tf={"Superior gluteal nerve":["Gluteus medius muscle","Gluteus minimus muscle","Tensor fasciae latae"],"Nerve to piriformis muscle":["Piriformis muscle"],"Femoral nerve":["Sartorius muscle","Rectus femoris muscle","Pectineus muscle","Iliacus muscle","Vastus lateralis muscle","Vastus medialis muscle","Vastus intermedius muscle"],"Obturator nerve":["Adductor longus","Gracilis muscle","Adductor brevis","Obturator externus","Adductor magnus"],"Sciatic nerve":["Semitendinosus muscle","Long head of biceps femoris","Short head of biceps femoris","Semimembranosus muscle","Adductor magnus"],"Deep fibular nerve":["Tibialis anterior muscle","Extensor digitorum longus","Tendon of extensor digitorum longus","Extensor hallucis longus","Fibularis tertius muscle","Extensor digitorum brevis","Extensor hallucis brevis"],"Superficial fibular nerve":["Fibularis longus muscle","Fibularis brevis muscle"],"Tibial nerve":["Medial head of gastrocnemius","Lateral head of gastrocnemius","Calcaneal tendon","Soleus muscle","Plantaris muscle","Popliteus muscle","Flexor hallucis longus","Flexor digitorum longus","Tibialis posterior muscle"],"Nerve to quadratus femoris muscle":["Inferior gemellus muscle","Quadratus femoris muscle"],"Medial plantar nerve":["Abductor hallucis","Flexor digitorum brevis","Lumbrical muscles of foot","Medial head of flexor hallucis brevis","Lateral head of flexor hallucis brevis"],"Lateral plantar nerve":["Abductor digiti minimi of foot","Quadratus plantae muscle","Lumbrical muscles of foot","Oblique head of adductor hallucis","Transverse head of adductor hallucis","Flexor digiti minimi of foot","Plantar interossei muscles","Dorsal interossei muscles of foot"],"Medial pectoral nerve":["Clavicular head of pectoralis major muscle","Sternocostal head of pectoralis major muscle","Pectoralis minor muscle"],"Lateral pectoral nerve":["Clavicular head of pectoralis major muscle","Sternocostal head of pectoralis major muscle"],"Long thoracic nerve":["Serratus anterior muscle"],"Axillary nerve":["Clavicular part of deltoid muscle","Acromial part of deltoid muscle","Scapular spinal part of deltoid muscle","Teres minor muscle"],"Suprascapular nerve":["Supraspinatus muscle","Infraspinatus muscle"],"Inferior subscapular nerve":["Teres major muscle","Subscapularis muscle"],"Superior subscapular nerve":["Subscapularis muscle"],"Musculocutaneous nerve":["Long head of biceps brachii","Short head of biceps brachii","Coracobrachialis muscle","Brachialis muscle"],"Radial nerve":["Long head of triceps brachii","Lateral head of triceps brachii","Medial head of triceps brachii","Anconeus muscle","Brachioradialis muscle","Extensor carpi radialis longus"],"Median nerve":["Superficial head of pronator teres","Deep head of pronator teres","Flexor carpi radialis","Palmaris longus muscle","Humero-ulnar head of flexor digitorum superficialis","Radial head of flexor digitorum superficialis","Opponens pollicis muscle","Abductor pollicis brevis","Superficial head of flexor pollicis brevis","Deep head of flexor pollicis brevis","Lumbrical muscles of hand"],"Ulnar nerve":["Humeral head of flexor carpi ulnaris","Ulnar head of flexor carpi ulnaris","Flexor digitorum profundus"],"Anterior interosseous nerve of forearm":["Flexor digitorum profundus","Flexor pollicis longus","Pronator quadratus"],"Deep branch of radial nerve":["Extensor carpi radialis brevis","Supinator"],"Posterior interosseous nerve of forearm":["Extensor digitorum","Extensor digiti minimi","Humeral head of extensor carpi ulnaris","Ulnar head of extensor carpi ulnaris","Extensor indicis","Abductor pollicis longus","Extensor pollicis longus","Extensor pollicis brevis"],"Deep branch of ulnar nerve":["Oblique head of adductor pollicis","Transverse head of adductor pollicis","Abductor digiti minimi of hand","Flexor digiti minimi of hand","Opponens digiti minimi muscle of hand","Dorsal interossei muscles of hand","Palmar interossei muscles","Lumbrical muscles of hand"],"Accessory nerve (XI).l":["Descending part of trapezius muscle.l","Descending part of trapezius muscle.r","Transverse part of trapezius muscle.l","Transverse part of trapezius muscle.r","Ascending part of trapezius muscle.l","Ascending part of trapezius muscle.r"],"Accessory nerve (XI).r":["Descending part of trapezius muscle.l","Descending part of trapezius muscle.r","Transverse part of trapezius muscle.l","Transverse part of trapezius muscle.r","Ascending part of trapezius muscle.l","Ascending part of trapezius muscle.r"],"Thoracodorsal nerve.l":["Latissimus dorsi muscle.l","Latissimus dorsi muscle.r"],"Thoracodorsal nerve.r":["Latissimus dorsi muscle.l","Latissimus dorsi muscle.r"],"Dorsal scapular nerve.l":["Levator scapulae.l","Levator scapulae.r","Rhomboid minor muscle.l","Rhomboid minor muscle.r","Rhomboid major muscle.l","Rhomboid major muscle.r"],"Dorsal scapular nerve.r":["Levator scapulae.l","Levator scapulae.r","Rhomboid minor muscle.l","Rhomboid minor muscle.r","Rhomboid major muscle.l","Rhomboid major muscle.r"]}});function wf(s,e){if(e===c0)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===ic||e===Wl){let t=s.getIndex();if(t===null){let o=[],a=s.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);s.setIndex(o),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}let n=t.count-2,i=[];if(e===ic)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}var M0=Bt(()=>{_i()});function uE(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}function dE(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Pr({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Gi})),s.DefaultMaterial}function uo(s,e,t){for(let n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Fr(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function pE(s,e,t){let n=!1,i=!1,r=!1;for(let l=0,u=e.length;l<u;l++){let h=e[l];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(i=!0),h.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);let o=[],a=[],c=[];for(let l=0,u=e.length;l<u;l++){let h=e[l];if(n){let f=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):s.attributes.position;o.push(f)}if(i){let f=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):s.attributes.normal;a.push(f)}if(r){let f=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):s.attributes.color;c.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){let u=l[0],h=l[1],f=l[2];return n&&(s.morphAttributes.position=u),i&&(s.morphAttributes.normal=h),r&&(s.morphAttributes.color=f),s.morphTargetsRelative=!0,s})}function mE(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function gE(s){let e,t=s.extensions&&s.extensions[vn.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Cf(t.attributes):e=s.indices+":"+Cf(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+Cf(s.targets[n]);return e}function Cf(s){let e="",t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function Qf(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function xE(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}function _E(s,e,t){let n=e.attributes,i=new an;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(i.set(new T(c[0],c[1],c[2]),new T(l[0],l[1],l[2])),a.normalized){let u=Qf(aa[a.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let a=new T,c=new T;for(let l=0,u=r.length;l<u;l++){let h=r[l];if(h.POSITION!==void 0){let f=t.json.accessors[h.POSITION],d=f.min,g=f.max;if(d!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(d[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(d[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(d[2]),Math.abs(g[2]))),f.normalized){let y=Qf(aa[f.componentType]);c.multiplyScalar(y)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}s.boundingBox=i;let o=new ti;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=o}function w0(s,e,t){let n=e.attributes,i=[];function r(o,a){return t.getDependency("accessor",o).then(function(c){s.setAttribute(a,c)})}for(let o in n){let a=$f[o]||o.toLowerCase();a in s.attributes||i.push(r(n[o],a))}if(e.indices!==void 0&&!s.index){let o=t.getDependency("accessor",e.indices).then(function(a){s.setIndex(a)});i.push(o)}return An.workingColorSpace!==mi&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${An.workingColorSpace}" not supported.`),Fr(s,e),_E(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?pE(s,e.targets,t):s})}var Yl,vn,Pf,If,Lf,Nf,Df,Uf,Ff,Bf,Of,zf,kf,Hf,Vf,Gf,Wf,Xf,qf,A0,sc,S0,Yf,jf,Zf,Kf,jl,hE,Jf,gs,aa,E0,T0,Af,$f,Ur,fE,Rf,yE,ed,R0=Bt(()=>{_i();M0();Yl=class extends rr{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Nf(t)}),this.register(function(t){return new Vf(t)}),this.register(function(t){return new Gf(t)}),this.register(function(t){return new Wf(t)}),this.register(function(t){return new Uf(t)}),this.register(function(t){return new Ff(t)}),this.register(function(t){return new Bf(t)}),this.register(function(t){return new Of(t)}),this.register(function(t){return new Lf(t)}),this.register(function(t){return new zf(t)}),this.register(function(t){return new Df(t)}),this.register(function(t){return new Hf(t)}),this.register(function(t){return new kf(t)}),this.register(function(t){return new Pf(t)}),this.register(function(t){return new Xf(t)}),this.register(function(t){return new qf(t)})}load(e,t,n,i){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let l=Dr.extractUrlBase(e);o=Dr.resolveURL(l,this.path)}else o=Dr.extractUrlBase(e);this.manager.itemStart(e);let a=function(l){i?i(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new ec(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,o,function(u){t(u),r.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r,o={},a={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===A0){try{o[vn.KHR_BINARY_GLTF]=new Yf(e)}catch(h){i&&i(h);return}r=JSON.parse(o[vn.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new ed(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let h=this.pluginCallbacks[u](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[h.name]=h,o[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){let h=r.extensionsUsed[u],f=r.extensionsRequired||[];switch(h){case vn.KHR_MATERIALS_UNLIT:o[h]=new If;break;case vn.KHR_DRACO_MESH_COMPRESSION:o[h]=new jf(r,this.dracoLoader);break;case vn.KHR_TEXTURE_TRANSFORM:o[h]=new Zf;break;case vn.KHR_MESH_QUANTIZATION:o[h]=new Kf;break;default:f.indexOf(h)>=0&&a[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}};vn={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Pf=class{constructor(e){this.parser=e,this.name=vn.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,u=new It(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],mi);let h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new ra(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Bl(u),l.distance=h;break;case"spot":l=new Fl(u),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,Fr(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}},If=class{constructor(){this.name=vn.KHR_MATERIALS_UNLIT}getMaterialType(){return Wi}extendParams(e,t,n){let i=[];e.color=new It(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],mi),e.opacity=o[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,Xn))}return Promise.all(i)}},Lf=class{constructor(e){this.parser=e,this.name=vn.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},Nf=class{constructor(e){this.parser=e,this.name=vn.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ps}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){let a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ot(a,a)}return Promise.all(r)}},Df=class{constructor(e){this.parser=e,this.name=vn.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ps}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}},Uf=class{constructor(e){this.parser=e,this.name=vn.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ps}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new It(0,0,0),t.sheenRoughness=0,t.sheen=1;let o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){let a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],mi)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Xn)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}},Ff=class{constructor(e){this.parser=e,this.name=vn.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ps}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}},Bf=class{constructor(e){this.parser=e,this.name=vn.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ps}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;let a=o.attenuationColor||[1,1,1];return t.attenuationColor=new It().setRGB(a[0],a[1],a[2],mi),Promise.all(r)}},Of=class{constructor(e){this.parser=e,this.name=vn.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ps}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},zf=class{constructor(e){this.parser=e,this.name=vn.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ps}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));let a=o.specularColorFactor||[1,1,1];return t.specularColor=new It().setRGB(a[0],a[1],a[2],mi),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Xn)),Promise.all(r)}},kf=class{constructor(e){this.parser=e,this.name=vn.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ps}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}},Hf=class{constructor(e){this.parser=e,this.name=vn.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ps}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}},Vf=class{constructor(e){this.parser=e,this.name=vn.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let r=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}},Gf=class{constructor(e){this.parser=e,this.name=vn.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=i.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Wf=class{constructor(e){this.parser=e,this.name=vn.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=i.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Xf=class{constructor(e){this.name=vn.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let c=i.byteOffset||0,l=i.byteLength||0,u=i.count,h=i.byteStride,f=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,h,f,i.mode,i.filter).then(function(d){return d.buffer}):o.ready.then(function(){let d=new ArrayBuffer(u*h);return o.decodeGltfBuffer(new Uint8Array(d),u,h,f,i.mode,i.filter),d})})}else return null}},qf=class{constructor(e){this.name=vn.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let l of i.primitives)if(l.mode!==gs.TRIANGLES&&l.mode!==gs.TRIANGLE_STRIP&&l.mode!==gs.TRIANGLE_FAN&&l.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],c={};for(let l in o)a.push(this.parser.getDependency("accessor",o[l]).then(u=>(c[l]=u,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{let u=l.pop(),h=u.isGroup?u.children:[u],f=l[0].count,d=[];for(let g of h){let y=new Et,m=new T,p=new gi,v=new T(1,1,1),_=new Sl(g.geometry,g.material,f);for(let E=0;E<f;E++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,E),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,E),c.SCALE&&v.fromBufferAttribute(c.SCALE,E),_.setMatrixAt(E,y.compose(m,p,v));for(let E in c)if(E==="_COLOR_0"){let w=c[E];_.instanceColor=new ao(w.array,w.itemSize,w.normalized)}else E!=="TRANSLATION"&&E!=="ROTATION"&&E!=="SCALE"&&g.geometry.setAttribute(E,c[E]);Zn.prototype.copy.call(_,g),this.parser.assignFinalMaterial(_),d.push(_)}return u.isGroup?(u.clear(),u.add(...d),u):d[0]}))}},A0="glTF",sc=12,S0={JSON:1313821514,BIN:5130562},Yf=class{constructor(e){this.name=vn.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,sc),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==A0)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-sc,r=new DataView(e,sc),o=0;for(;o<i;){let a=r.getUint32(o,!0);o+=4;let c=r.getUint32(o,!0);if(o+=4,c===S0.JSON){let l=new Uint8Array(e,sc+o,a);this.content=n.decode(l)}else if(c===S0.BIN){let l=sc+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},jf=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=vn.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(let u in o){let h=$f[u]||u.toLowerCase();a[h]=o[u]}for(let u in e.attributes){let h=$f[u]||u.toLowerCase();if(o[u]!==void 0){let f=n.accessors[e.attributes[u]],d=aa[f.componentType];l[h]=d.name,c[h]=f.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(h,f){i.decodeDracoFile(u,function(d){for(let g in d.attributes){let y=d.attributes[g],m=c[g];m!==void 0&&(y.normalized=m)}h(d)},a,l,mi,f)})})}},Zf=class{constructor(){this.name=vn.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},Kf=class{constructor(){this.name=vn.KHR_MESH_QUANTIZATION}},jl=class extends Ir{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,u=i-t,h=(n-t)/u,f=h*h,d=f*h,g=e*l,y=g-l,m=-2*d+3*f,p=d-f,v=1-m,_=p-f+h;for(let E=0;E!==a;E++){let w=o[y+E+a],A=o[y+E+c]*u,R=o[g+E+a],O=o[g+E]*u;r[E]=v*w+_*A+m*R+p*O}return r}},hE=new gi,Jf=class extends jl{interpolate_(e,t,n,i){let r=super.interpolate_(e,t,n,i);return hE.fromArray(r).normalize().toArray(r),r}},gs={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},aa={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},E0={9728:fi,9729:Vi,9984:cl,9985:gf,9986:Ua,9987:Tr},T0={33071:os,33648:Va,10497:io},Af={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},$f={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ur={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},fE={CUBICSPLINE:void 0,LINEAR:ro,STEP:Jo},Rf={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};yE=new Et,ed=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new uE,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,r=-1;typeof navigator!="undefined"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,r=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap=="undefined"||n||i&&r<98?this.textureLoader=new Dl(this.options.manager):this.textureLoader=new Ol(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new ec(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return uo(r,a,i),Fr(a,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){let o=t[i].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let i=0,r=e.length;i<r;i++){let o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),r=(o,a)=>{let c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(let[l,u]of o.children.entries())r(u,a.children[l])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[vn.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(r,o){n.load(Dr.resolveURL(t.uri,i.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let o=Af[i.type],a=aa[i.componentType],c=i.normalized===!0,l=new a(i.count*o);return Promise.resolve(new Pn(l,o,c))}let r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],c=Af[i.type],l=aa[i.componentType],u=l.BYTES_PER_ELEMENT,h=u*c,f=i.byteOffset||0,d=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0,y,m;if(d&&d!==h){let p=Math.floor(f/d),v="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count,_=t.cache.get(v);_||(y=new l(a,p*d,i.count*d/u),_=new ja(y,d/u),t.cache.add(v,_)),m=new Za(_,c,f%d/u,g)}else a===null?y=new l(i.count*c):y=new l(a,f,i.count*c),m=new Pn(y,c,g);if(i.sparse!==void 0){let p=Af.SCALAR,v=aa[i.sparse.indices.componentType],_=i.sparse.indices.byteOffset||0,E=i.sparse.values.byteOffset||0,w=new v(o[1],_,i.sparse.count*p),A=new l(o[2],E,i.sparse.count*c);a!==null&&(m=new Pn(m.array.slice(),m.itemSize,m.normalized));for(let R=0,O=w.length;R<O;R++){let M=w[R];if(m.setX(M,A[R*c]),c>=2&&m.setY(M,A[R*c+1]),c>=3&&m.setZ(M,A[R*c+2]),c>=4&&m.setW(M,A[R*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return m})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r],a=this.textureLoader;if(o.uri){let c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let i=this,r=this.json,o=r.textures[e],a=r.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);let f=(r.samplers||{})[o.sampler]||{};return u.magFilter=E0[f.magFilter]||Vi,u.minFilter=E0[f.minFilter]||Tr,u.wrapS=T0[f.wrapS]||io,u.wrapT=T0[f.wrapT]||io,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());let o=i.images[e],a=self.URL||self.webkitURL,c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(h){l=!0;let f=new Blob([h],{type:o.mimeType});return c=a.createObjectURL(f),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(c).then(function(h){return new Promise(function(f,d){let g=f;t.isImageBitmapLoader===!0&&(g=function(y){let m=new Oi(y);m.needsUpdate=!0,f(m)}),t.load(Dr.resolveURL(h,r.path),g,void 0,d)})}).then(function(h){return l===!0&&a.revokeObjectURL(c),h.userData.mimeType=o.mimeType||xE(o.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[vn.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[vn.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let c=r.associations.get(o);o=r.extensions[vn.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new $a,$i.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new Ja,$i.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(i||r||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Pr}loadMaterial(e){let t=this,n=this.json,i=this.extensions,r=n.materials[e],o,a={},c=r.extensions||{},l=[];if(c[vn.KHR_MATERIALS_UNLIT]){let h=i[vn.KHR_MATERIALS_UNLIT];o=h.getMaterialType(),l.push(h.extendParams(a,r,t))}else{let h=r.pbrMetallicRoughness||{};if(a.color=new It(1,1,1),a.opacity=1,Array.isArray(h.baseColorFactor)){let f=h.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],mi),a.opacity=f[3]}h.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",h.baseColorTexture,Xn)),a.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,a.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",h.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",h.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=Ti);let u=r.alphaMode||Rf.OPAQUE;if(u===Rf.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===Rf.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==Wi&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new ot(1,1),r.normalTexture.scale!==void 0)){let h=r.normalTexture.scale;a.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&o!==Wi&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==Wi){let h=r.emissiveFactor;a.emissive=new It().setRGB(h[0],h[1],h[2],mi)}return r.emissiveTexture!==void 0&&o!==Wi&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,Xn)),Promise.all(l).then(function(){let h=new o(a);return r.name&&(h.name=r.name),Fr(h,r),t.associations.set(h,{materials:e}),r.extensions&&uo(i,h,r),h})}createUniqueName(e){let t=Hn.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function r(a){return n[vn.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return w0(c,a,t)})}let o=[];for(let a=0,c=e.length;a<c;a++){let l=e[a],u=gE(l),h=i[u];if(h)o.push(h.promise);else{let f;l.extensions&&l.extensions[vn.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=w0(new wi,l,t),i[u]={primitive:l,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){let t=this,n=this.json,i=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){let u=o[c].material===void 0?dE(this.cache):this.getDependency("material",o[c].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){let l=c.slice(0,c.length-1),u=c[c.length-1],h=[];for(let d=0,g=u.length;d<g;d++){let y=u[d],m=o[d],p,v=l[d];if(m.mode===gs.TRIANGLES||m.mode===gs.TRIANGLE_STRIP||m.mode===gs.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new vl(y,v):new Rn(y,v),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===gs.TRIANGLE_STRIP?p.geometry=wf(p.geometry,Wl):m.mode===gs.TRIANGLE_FAN&&(p.geometry=wf(p.geometry,ic));else if(m.mode===gs.LINES)p=new Tl(y,v);else if(m.mode===gs.LINE_STRIP)p=new ia(y,v);else if(m.mode===gs.LINE_LOOP)p=new wl(y,v);else if(m.mode===gs.POINTS)p=new Al(y,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&mE(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),Fr(p,r),m.extensions&&uo(i,p,m),t.assignFinalMaterial(p),h.push(p)}for(let d=0,g=h.length;d<g;d++)t.associations.set(h[d],{meshes:e,primitives:d});if(h.length===1)return r.extensions&&uo(i,h[0],r),h[0];let f=new Us;r.extensions&&uo(i,f,r),t.associations.set(f,{meshes:e});for(let d=0,g=h.length;d<g;d++)f.add(h[d]);return f})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new di(lo.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Rr(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Fr(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let r=i.pop(),o=i,a=[],c=[];for(let l=0,u=o.length;l<u;l++){let h=o[l];if(h){a.push(h);let f=new Et;r!==null&&f.fromArray(r.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Ml(a,c)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,o=[],a=[],c=[],l=[],u=[];for(let h=0,f=i.channels.length;h<f;h++){let d=i.channels[h],g=i.samplers[d.sampler],y=d.target,m=y.node,p=i.parameters!==void 0?i.parameters[g.input]:g.input,v=i.parameters!==void 0?i.parameters[g.output]:g.output;y.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",v)),l.push(g),u.push(y))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(h){let f=h[0],d=h[1],g=h[2],y=h[3],m=h[4],p=[];for(let v=0,_=f.length;v<_;v++){let E=f[v],w=d[v],A=g[v],R=y[v],O=m[v];if(E===void 0)continue;E.updateMatrix&&E.updateMatrix();let M=n._createAnimationTracks(E,w,A,R,O);if(M)for(let P=0;P<M.length;P++)p.push(M[P])}return new Nl(r,void 0,p)})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=i.weights.length;c<l;c++)a.morphTargetInfluences[c]=i.weights[c]}),o})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=i.children||[];for(let l=0,u=a.length;l<u;l++)o.push(n.getDependency("node",a[l]));let c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){let u=l[0],h=l[1],f=l[2];f!==null&&u.traverse(function(d){d.isSkinnedMesh&&d.bind(f,yE)});for(let d=0,g=h.length;d<g;d++)u.add(h[d]);return u})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],o=r.name?i.createUniqueName(r.name):"",a=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),r.camera!==void 0&&a.push(i.getDependency("camera",r.camera).then(function(l){return i._getNodeRef(i.cameraCache,r.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let u;if(r.isBone===!0?u=new Ka:l.length>1?u=new Us:l.length===1?u=l[0]:u=new Zn,u!==l[0])for(let h=0,f=l.length;h<f;h++)u.add(l[h]);if(r.name&&(u.userData.name=r.name,u.name=o),Fr(u,r),r.extensions&&uo(n,u,r),r.matrix!==void 0){let h=new Et;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);return i.associations.has(u)||i.associations.set(u,{}),i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,r=new Us;n.name&&(r.name=i.createUniqueName(n.name)),Fr(r,n),n.extensions&&uo(t,r,n);let o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(i.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let u=0,h=c.length;u<h;u++)r.add(c[u]);let l=u=>{let h=new Map;for(let[f,d]of i.associations)(f instanceof $i||f instanceof Oi)&&h.set(f,d);return u.traverse(f=>{let d=i.associations.get(f);d!=null&&h.set(f,d)}),h};return i.associations=l(r),r})}_createAnimationTracks(e,t,n,i,r){let o=[],a=e.name?e.name:e.uuid,c=[];Ur[r.path]===Ur.weights?e.traverse(function(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}):c.push(a);let l;switch(Ur[r.path]){case Ur.weights:l=ir;break;case Ur.rotation:l=Fs;break;case Ur.position:case Ur.scale:l=sr;break;default:switch(n.itemSize){case 1:l=ir;break;case 2:case 3:default:l=sr;break}break}let u=i.interpolation!==void 0?fE[i.interpolation]:ro,h=this._getArrayFromAccessor(n);for(let f=0,d=c.length;f<d;f++){let g=new l(c[f]+"."+Ur[r.path],t.array,h,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Qf(t.constructor),i=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof Fs?Jf:jl;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}});var C0,Zl,td=Bt(()=>{C0=Math.pow(2,-24),Zl=Symbol("SKIP_GENERATION")});function vE(s){return s.index?s.index.count:s.attributes.position.count}function Bs(s){return vE(s)/3}function bE(s,e=ArrayBuffer){return s>65535?new Uint32Array(new e(4*s)):new Uint16Array(new e(2*s))}function P0(s,e){if(!s.index){let t=s.attributes.position.count,n=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,i=bE(t,n);s.setIndex(new Pn(i,1));for(let r=0;r<t;r++)i[r]=r}}function nd(s,e){let t=Bs(s),n=e||s.drawRange,i=n.start/3,r=(n.start+n.count)/3,o=Math.max(0,i),a=Math.min(t,r)-o;return[{offset:Math.floor(o),count:Math.floor(a)}]}function id(s,e){if(!s.groups||!s.groups.length)return nd(s,e);let t=[],n=new Set,i=e||s.drawRange,r=i.start/3,o=(i.start+i.count)/3;for(let c of s.groups){let l=c.start/3,u=(c.start+c.count)/3;n.add(Math.max(r,l)),n.add(Math.min(o,u))}let a=Array.from(n.values()).sort((c,l)=>c-l);for(let c=0;c<a.length-1;c++){let l=a[c],u=a[c+1];t.push({offset:Math.floor(l),count:Math.floor(u-l)})}return t}function I0(s,e){let t=Bs(s),n=id(s,e).sort((o,a)=>o.offset-a.offset),i=n[n.length-1];i.count=Math.min(t-i.offset,i.count);let r=0;return n.forEach(({count:o})=>r+=o),t!==r}var rc=Bt(()=>{_i()});function Kl(s,e,t,n,i){let r=1/0,o=1/0,a=1/0,c=-1/0,l=-1/0,u=-1/0,h=1/0,f=1/0,d=1/0,g=-1/0,y=-1/0,m=-1/0;for(let p=e*6,v=(e+t)*6;p<v;p+=6){let _=s[p+0],E=s[p+1],w=_-E,A=_+E;w<r&&(r=w),A>c&&(c=A),_<h&&(h=_),_>g&&(g=_);let R=s[p+2],O=s[p+3],M=R-O,P=R+O;M<o&&(o=M),P>l&&(l=P),R<f&&(f=R),R>y&&(y=R);let G=s[p+4],X=s[p+5],ce=G-X,N=G+X;ce<a&&(a=ce),N>u&&(u=N),G<d&&(d=G),G>m&&(m=G)}n[0]=r,n[1]=o,n[2]=a,n[3]=c,n[4]=l,n[5]=u,i[0]=h,i[1]=f,i[2]=d,i[3]=g,i[4]=y,i[5]=m}function L0(s,e=null,t=null,n=null){let i=s.attributes.position,r=s.index?s.index.array:null,o=Bs(s),a=i.normalized,c;e===null?(c=new Float32Array(o*6),t=0,n=o):(c=e,t=t||0,n=n||o);let l=i.array,u=i.offset||0,h=3;i.isInterleavedBufferAttribute&&(h=i.data.stride);let f=["getX","getY","getZ"];for(let d=t;d<t+n;d++){let g=d*3,y=d*6,m=g+0,p=g+1,v=g+2;r&&(m=r[m],p=r[p],v=r[v]),a||(m=m*h+u,p=p*h+u,v=v*h+u);for(let _=0;_<3;_++){let E,w,A;a?(E=i[f[_]](m),w=i[f[_]](p),A=i[f[_]](v)):(E=l[m+_],w=l[p+_],A=l[v+_]);let R=E;w<R&&(R=w),A<R&&(R=A);let O=E;w>O&&(O=w),A>O&&(O=A);let M=(O-R)/2,P=_*2;c[y+P+0]=R+M,c[y+P+1]=M+(Math.abs(R)+M)*C0}}return c}var N0=Bt(()=>{td();rc()});function On(s,e,t){return t.min.x=e[s],t.min.y=e[s+1],t.min.z=e[s+2],t.max.x=e[s+3],t.max.y=e[s+4],t.max.z=e[s+5],t}function sd(s){let e=-1,t=-1/0;for(let n=0;n<3;n++){let i=s[n+3]-s[n];i>t&&(t=i,e=n)}return e}function rd(s,e){e.set(s)}function od(s,e,t){let n,i;for(let r=0;r<3;r++){let o=r+3;n=s[r],i=e[r],t[r]=n<i?n:i,n=s[o],i=e[o],t[o]=n>i?n:i}}function oc(s,e,t){for(let n=0;n<3;n++){let i=e[s+2*n],r=e[s+2*n+1],o=i-r,a=i+r;o<t[n]&&(t[n]=o),a>t[n+3]&&(t[n+3]=a)}}function ca(s){let e=s[3]-s[0],t=s[4]-s[1],n=s[5]-s[2];return 2*(e*t+t*n+n*e)}var ho=Bt(()=>{});function F0(s,e,t,n,i,r){let o=-1,a=0;if(r===0)o=sd(e),o!==-1&&(a=(e[o]+e[o+3])/2);else if(r===1)o=sd(s),o!==-1&&(a=EE(t,n,i,o));else if(r===2){let c=ca(s),l=1.25*i,u=n*6,h=(n+i)*6;for(let f=0;f<3;f++){let d=e[f],m=(e[f+3]-d)/or;if(i<or/4){let p=[...Br];p.length=i;let v=0;for(let E=u;E<h;E+=6,v++){let w=p[v];w.candidate=t[E+2*f],w.count=0;let{bounds:A,leftCacheBounds:R,rightCacheBounds:O}=w;for(let M=0;M<3;M++)O[M]=1/0,O[M+3]=-1/0,R[M]=1/0,R[M+3]=-1/0,A[M]=1/0,A[M+3]=-1/0;oc(E,t,A)}p.sort(SE);let _=i;for(let E=0;E<_;E++){let w=p[E];for(;E+1<_&&p[E+1].candidate===w.candidate;)p.splice(E+1,1),_--}for(let E=u;E<h;E+=6){let w=t[E+2*f];for(let A=0;A<_;A++){let R=p[A];w>=R.candidate?oc(E,t,R.rightCacheBounds):(oc(E,t,R.leftCacheBounds),R.count++)}}for(let E=0;E<_;E++){let w=p[E],A=w.count,R=i-w.count,O=w.leftCacheBounds,M=w.rightCacheBounds,P=0;A!==0&&(P=ca(O)/c);let G=0;R!==0&&(G=ca(M)/c);let X=1+1.25*(P*A+G*R);X<l&&(o=f,l=X,a=w.candidate)}}else{for(let _=0;_<or;_++){let E=Br[_];E.count=0,E.candidate=d+m+_*m;let w=E.bounds;for(let A=0;A<3;A++)w[A]=1/0,w[A+3]=-1/0}for(let _=u;_<h;_+=6){let A=~~((t[_+2*f]-d)/m);A>=or&&(A=or-1);let R=Br[A];R.count++,oc(_,t,R.bounds)}let p=Br[or-1];rd(p.bounds,p.rightCacheBounds);for(let _=or-2;_>=0;_--){let E=Br[_],w=Br[_+1];od(E.bounds,w.rightCacheBounds,E.rightCacheBounds)}let v=0;for(let _=0;_<or-1;_++){let E=Br[_],w=E.count,A=E.bounds,O=Br[_+1].rightCacheBounds;w!==0&&(v===0?rd(A,Jl):od(A,Jl,Jl)),v+=w;let M=0,P=0;v!==0&&(M=ca(Jl)/c);let G=i-v;G!==0&&(P=ca(O)/c);let X=1+1.25*(M*v+P*G);X<l&&(o=f,l=X,a=E.candidate)}}}}else console.warn(`MeshBVH: Invalid build strategy value ${r} used.`);return{axis:o,pos:a}}function EE(s,e,t,n){let i=0;for(let r=e,o=e+t;r<o;r++)i+=s[r*6+n*2];return i/t}var or,SE,Br,Jl,B0=Bt(()=>{ho();or=32,SE=(s,e)=>s.candidate-e.candidate,Br=new Array(or).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),Jl=new Float32Array(6)});var la,O0=Bt(()=>{la=class{constructor(){this.boundingData=new Float32Array(6)}}});function z0(s,e,t,n,i,r){let o=n,a=n+i-1,c=r.pos,l=r.axis*2;for(;;){for(;o<=a&&t[o*6+l]<c;)o++;for(;o<=a&&t[a*6+l]>=c;)a--;if(o<a){for(let u=0;u<3;u++){let h=e[o*3+u];e[o*3+u]=e[a*3+u],e[a*3+u]=h}for(let u=0;u<6;u++){let h=t[o*6+u];t[o*6+u]=t[a*6+u],t[a*6+u]=h}o++,a--}else return o}}var k0=Bt(()=>{});function H0(s,e,t,n,i,r){let o=n,a=n+i-1,c=r.pos,l=r.axis*2;for(;;){for(;o<=a&&t[o*6+l]<c;)o++;for(;o<=a&&t[a*6+l]>=c;)a--;if(o<a){let u=s[o];s[o]=s[a],s[a]=u;for(let h=0;h<6;h++){let f=t[o*6+h];t[o*6+h]=t[a*6+h],t[a*6+h]=f}o++,a--}else return o}}var V0=Bt(()=>{});function Kn(s,e){return e[s+15]===65535}function ni(s,e){return e[s+6]}function ai(s,e){return e[s+14]}function Ai(s){return s+8}function Ri(s,e){return e[s+6]}function $l(s,e){return e[s+7]}var Os=Bt(()=>{});function eu(s){return"count"in s?1:1+eu(s.left)+eu(s.right)}function X0(s,e,t){return G0=new Float32Array(t),ac=new Uint32Array(t),Ql=new Uint16Array(t),W0=new Uint8Array(t),ad(s,e)}function ad(s,e){let t=s/4,n=s/2,i="count"in e,r=e.boundingData;for(let o=0;o<6;o++)G0[t+o]=r[o];if(i)if(e.buffer){let o=e.buffer;W0.set(new Uint8Array(o),s);for(let a=s,c=s+o.byteLength;a<c;a+=32){let l=a/2;Kn(l,Ql)||(ac[a/4+6]+=t)}return s+o.byteLength}else{let o=e.offset,a=e.count;return ac[t+6]=o,Ql[n+14]=a,Ql[n+15]=65535,s+32}else{let o=e.left,a=e.right,c=e.splitAxis,l;if(l=ad(s+32,o),l/4>TE)throw new Error("MeshBVH: Cannot store child pointer greater than 32 bits.");return ac[t+6]=l/4,l=ad(l,a),ac[t+7]=c,l}}var G0,ac,Ql,W0,TE,q0=Bt(()=>{Os();TE=Math.pow(2,32)});function wE(s,e){let t=(s.index?s.index.count:s.attributes.position.count)/3,n=t>2**16,i=n?4:2,r=e?new SharedArrayBuffer(t*i):new ArrayBuffer(t*i),o=n?new Uint32Array(r):new Uint16Array(r);for(let a=0,c=o.length;a<c;a++)o[a]=a;return o}function AE(s,e,t,n,i){let{maxDepth:r,verbose:o,maxLeafTris:a,strategy:c,onProgress:l,indirect:u}=i,h=s._indirectBuffer,f=s.geometry,d=f.index?f.index.array:null,g=u?H0:z0,y=Bs(f),m=new Float32Array(6),p=!1,v=new la;return Kl(e,t,n,v.boundingData,m),E(v,t,n,m),v;function _(w){l&&l(w/y)}function E(w,A,R,O=null,M=0){if(!p&&M>=r&&(p=!0,o&&(console.warn(`MeshBVH: Max depth of ${r} reached when generating BVH. Consider increasing maxDepth.`),console.warn(f))),R<=a||M>=r)return _(A+R),w.offset=A,w.count=R,w;let P=F0(w.boundingData,O,e,A,R,c);if(P.axis===-1)return _(A+R),w.offset=A,w.count=R,w;let G=g(h,d,e,A,R,P);if(G===A||G===A+R)_(A+R),w.offset=A,w.count=R;else{w.splitAxis=P.axis;let X=new la,ce=A,N=G-A;w.left=X,Kl(e,ce,N,X.boundingData,m),E(X,ce,N,m,M+1);let Z=new la,B=G,Te=R-N;w.right=Z,Kl(e,B,Te,Z.boundingData,m),E(Z,B,Te,m,M+1)}return w}}function Y0(s,e){let t=s.geometry;e.indirect&&(s._indirectBuffer=wE(t,e.useSharedArrayBuffer),I0(t,e.range)&&!e.verbose&&console.warn('MeshBVH: Provided geometry contains groups or a range that do not fully span the vertex contents while using the "indirect" option. BVH may incorrectly report intersections on unrendered portions of the geometry.')),s._indirectBuffer||P0(t,e);let n=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,i=L0(t),r=e.indirect?nd(t,e.range):id(t,e.range);s._roots=r.map(o=>{let a=AE(s,i,o.offset,o.count,e),c=eu(a),l=new n(32*c);return X0(0,a,l),l})}var j0=Bt(()=>{rc();N0();B0();O0();k0();V0();q0()});var es,G1,cd=Bt(()=>{_i();es=class{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(e,t){let n=1/0,i=-1/0;for(let r=0,o=e.length;r<o;r++){let c=e[r][t];n=c<n?c:n,i=c>i?c:i}this.min=n,this.max=i}setFromPoints(e,t){let n=1/0,i=-1/0;for(let r=0,o=t.length;r<o;r++){let a=t[r],c=e.dot(a);n=c<n?c:n,i=c>i?c:i}this.min=n,this.max=i}isSeparated(e){return this.min>e.max||e.min>this.max}};es.prototype.setFromBox=function(){let s=new T;return function(t,n){let i=n.min,r=n.max,o=1/0,a=-1/0;for(let c=0;c<=1;c++)for(let l=0;l<=1;l++)for(let u=0;u<=1;u++){s.x=i.x*c+r.x*(1-c),s.y=i.y*l+r.y*(1-l),s.z=i.z*u+r.z*(1-u);let h=t.dot(s);o=Math.min(h,o),a=Math.max(h,a)}this.min=o,this.max=a}}();G1=function(){let s=new es;return function(t,n){let i=t.points,r=t.satAxes,o=t.satBounds,a=n.points,c=n.satAxes,l=n.satBounds;for(let u=0;u<3;u++){let h=o[u],f=r[u];if(s.setFromPoints(f,a),h.isSeparated(s))return!1}for(let u=0;u<3;u++){let h=l[u],f=c[u];if(s.setFromPoints(f,i),h.isSeparated(s))return!1}}}()});var RE,lc,Z0,ld=Bt(()=>{_i();RE=function(){let s=new T,e=new T,t=new T;return function(i,r,o){let a=i.start,c=s,l=r.start,u=e;t.subVectors(a,l),s.subVectors(i.end,i.start),e.subVectors(r.end,r.start);let h=t.dot(u),f=u.dot(c),d=u.dot(u),g=t.dot(c),m=c.dot(c)*d-f*f,p,v;m!==0?p=(h*f-g*d)/m:p=0,v=(h+p*f)/d,o.x=p,o.y=v}}(),lc=function(){let s=new ot,e=new T,t=new T;return function(i,r,o,a){RE(i,r,s);let c=s.x,l=s.y;if(c>=0&&c<=1&&l>=0&&l<=1){i.at(c,o),r.at(l,a);return}else if(c>=0&&c<=1){l<0?r.at(0,a):r.at(1,a),i.closestPointToPoint(a,!0,o);return}else if(l>=0&&l<=1){c<0?i.at(0,o):i.at(1,o),r.closestPointToPoint(o,!0,a);return}else{let u;c<0?u=i.start:u=i.end;let h;l<0?h=r.start:h=r.end;let f=e,d=t;if(i.closestPointToPoint(h,!0,e),r.closestPointToPoint(u,!0,t),f.distanceToSquared(h)<=d.distanceToSquared(u)){o.copy(f),a.copy(h);return}else{o.copy(u),a.copy(d);return}}}}(),Z0=function(){let s=new T,e=new T,t=new rs,n=new Qi;return function(r,o){let{radius:a,center:c}=r,{a:l,b:u,c:h}=o;if(n.start=l,n.end=u,n.closestPointToPoint(c,!0,s).distanceTo(c)<=a||(n.start=l,n.end=h,n.closestPointToPoint(c,!0,s).distanceTo(c)<=a)||(n.start=u,n.end=h,n.closestPointToPoint(c,!0,s).distanceTo(c)<=a))return!0;let y=o.getPlane(t);if(Math.abs(y.distanceToPoint(c))<=a){let p=y.projectPoint(c,e);if(o.containsPoint(p))return!0}return!1}}()});function ud(s){return Math.abs(s)<CE}var CE,Ii,ua=Bt(()=>{_i();cd();ld();CE=1e-15;Ii=class extends Ji{constructor(...e){super(...e),this.isExtendedTriangle=!0,this.satAxes=new Array(4).fill().map(()=>new T),this.satBounds=new Array(4).fill().map(()=>new es),this.points=[this.a,this.b,this.c],this.sphere=new ti,this.plane=new rs,this.needsUpdate=!0}intersectsSphere(e){return Z0(e,this)}update(){let e=this.a,t=this.b,n=this.c,i=this.points,r=this.satAxes,o=this.satBounds,a=r[0],c=o[0];this.getNormal(a),c.setFromPoints(a,i);let l=r[1],u=o[1];l.subVectors(e,t),u.setFromPoints(l,i);let h=r[2],f=o[2];h.subVectors(t,n),f.setFromPoints(h,i);let d=r[3],g=o[3];d.subVectors(n,e),g.setFromPoints(d,i),this.sphere.setFromPoints(this.points),this.plane.setFromNormalAndCoplanarPoint(a,e),this.needsUpdate=!1}};Ii.prototype.closestPointToSegment=function(){let s=new T,e=new T,t=new Qi;return function(i,r=null,o=null){let{start:a,end:c}=i,l=this.points,u,h=1/0;for(let f=0;f<3;f++){let d=(f+1)%3;t.start.copy(l[f]),t.end.copy(l[d]),lc(t,i,s,e),u=s.distanceToSquared(e),u<h&&(h=u,r&&r.copy(s),o&&o.copy(e))}return this.closestPointToPoint(a,s),u=a.distanceToSquared(s),u<h&&(h=u,r&&r.copy(s),o&&o.copy(a)),this.closestPointToPoint(c,s),u=c.distanceToSquared(s),u<h&&(h=u,r&&r.copy(s),o&&o.copy(c)),Math.sqrt(h)}}();Ii.prototype.intersectsTriangle=function(){let s=new Ii,e=new Array(3),t=new Array(3),n=new es,i=new es,r=new T,o=new T,a=new T,c=new T,l=new T,u=new Qi,h=new Qi,f=new Qi,d=new T;function g(y,m,p){let v=y.points,_=0,E=-1;for(let w=0;w<3;w++){let{start:A,end:R}=u;A.copy(v[w]),R.copy(v[(w+1)%3]),u.delta(o);let O=ud(m.distanceToPoint(A));if(ud(m.normal.dot(o))&&O){p.copy(u),_=2;break}let M=m.intersectLine(u,d);if(!M&&O&&d.copy(A),(M||O)&&!ud(d.distanceTo(R))){if(_<=1)(_===1?p.start:p.end).copy(d),O&&(E=_);else if(_>=2){(E===1?p.start:p.end).copy(d),_=2;break}if(_++,_===2&&E===-1)break}}return _}return function(m,p=null,v=!1){this.needsUpdate&&this.update(),m.isExtendedTriangle?m.needsUpdate&&m.update():(s.copy(m),s.update(),m=s);let _=this.plane,E=m.plane;if(Math.abs(_.normal.dot(E.normal))>1-1e-10){let w=this.satBounds,A=this.satAxes;t[0]=m.a,t[1]=m.b,t[2]=m.c;for(let M=0;M<4;M++){let P=w[M],G=A[M];if(n.setFromPoints(G,t),P.isSeparated(n))return!1}let R=m.satBounds,O=m.satAxes;e[0]=this.a,e[1]=this.b,e[2]=this.c;for(let M=0;M<4;M++){let P=R[M],G=O[M];if(n.setFromPoints(G,e),P.isSeparated(n))return!1}for(let M=0;M<4;M++){let P=A[M];for(let G=0;G<4;G++){let X=O[G];if(r.crossVectors(P,X),n.setFromPoints(r,e),i.setFromPoints(r,t),n.isSeparated(i))return!1}}return p&&(v||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),p.start.set(0,0,0),p.end.set(0,0,0)),!0}else{let w=g(this,E,h);if(w===1&&m.containsPoint(h.end))return p&&(p.start.copy(h.end),p.end.copy(h.end)),!0;if(w!==2)return!1;let A=g(m,_,f);if(A===1&&this.containsPoint(f.end))return p&&(p.start.copy(f.end),p.end.copy(f.end)),!0;if(A!==2)return!1;if(h.delta(a),f.delta(c),a.dot(c)<0){let ce=f.start;f.start=f.end,f.end=ce}let R=h.start.dot(a),O=h.end.dot(a),M=f.start.dot(a),P=f.end.dot(a),G=O<M,X=R<P;return R!==P&&M!==O&&G===X?!1:(p&&(l.subVectors(h.start,f.start),l.dot(a)>0?p.start.copy(h.start):p.start.copy(f.start),l.subVectors(h.end,f.end),l.dot(a)<0?p.end.copy(h.end):p.end.copy(f.end)),!0)}}}();Ii.prototype.distanceToPoint=function(){let s=new T;return function(t){return this.closestPointToPoint(t,s),t.distanceTo(s)}}();Ii.prototype.distanceToTriangle=function(){let s=new T,e=new T,t=["a","b","c"],n=new Qi,i=new Qi;return function(o,a=null,c=null){let l=a||c?n:null;if(this.intersectsTriangle(o,l))return(a||c)&&(a&&l.getCenter(a),c&&l.getCenter(c)),0;let u=1/0;for(let h=0;h<3;h++){let f,d=t[h],g=o[d];this.closestPointToPoint(g,s),f=g.distanceToSquared(s),f<u&&(u=f,a&&a.copy(s),c&&c.copy(g));let y=this[d];o.closestPointToPoint(y,s),f=y.distanceToSquared(s),f<u&&(u=f,a&&a.copy(y),c&&c.copy(s))}for(let h=0;h<3;h++){let f=t[h],d=t[(h+1)%3];n.set(this[f],this[d]);for(let g=0;g<3;g++){let y=t[g],m=t[(g+1)%3];i.set(o[y],o[m]),lc(n,i,s,e);let p=s.distanceToSquared(e);p<u&&(u=p,a&&a.copy(s),c&&c.copy(e))}}return Math.sqrt(u)}}()});var Qn,fo=Bt(()=>{_i();cd();ua();ld();Qn=class{constructor(e,t,n){this.isOrientedBox=!0,this.min=new T,this.max=new T,this.matrix=new Et,this.invMatrix=new Et,this.points=new Array(8).fill().map(()=>new T),this.satAxes=new Array(3).fill().map(()=>new T),this.satBounds=new Array(3).fill().map(()=>new es),this.alignedSatBounds=new Array(3).fill().map(()=>new es),this.needsUpdate=!1,e&&this.min.copy(e),t&&this.max.copy(t),n&&this.matrix.copy(n)}set(e,t,n){this.min.copy(e),this.max.copy(t),this.matrix.copy(n),this.needsUpdate=!0}copy(e){this.min.copy(e.min),this.max.copy(e.max),this.matrix.copy(e.matrix),this.needsUpdate=!0}};Qn.prototype.update=function(){return function(){let e=this.matrix,t=this.min,n=this.max,i=this.points;for(let l=0;l<=1;l++)for(let u=0;u<=1;u++)for(let h=0;h<=1;h++){let f=1*l|2*u|4*h,d=i[f];d.x=l?n.x:t.x,d.y=u?n.y:t.y,d.z=h?n.z:t.z,d.applyMatrix4(e)}let r=this.satBounds,o=this.satAxes,a=i[0];for(let l=0;l<3;l++){let u=o[l],h=r[l],f=1<<l,d=i[f];u.subVectors(a,d),h.setFromPoints(u,i)}let c=this.alignedSatBounds;c[0].setFromPointsField(i,"x"),c[1].setFromPointsField(i,"y"),c[2].setFromPointsField(i,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}}();Qn.prototype.intersectsBox=function(){let s=new es;return function(t){this.needsUpdate&&this.update();let n=t.min,i=t.max,r=this.satBounds,o=this.satAxes,a=this.alignedSatBounds;if(s.min=n.x,s.max=i.x,a[0].isSeparated(s)||(s.min=n.y,s.max=i.y,a[1].isSeparated(s))||(s.min=n.z,s.max=i.z,a[2].isSeparated(s)))return!1;for(let c=0;c<3;c++){let l=o[c],u=r[c];if(s.setFromBox(l,t),u.isSeparated(s))return!1}return!0}}();Qn.prototype.intersectsTriangle=function(){let s=new Ii,e=new Array(3),t=new es,n=new es,i=new T;return function(o){this.needsUpdate&&this.update(),o.isExtendedTriangle?o.needsUpdate&&o.update():(s.copy(o),s.update(),o=s);let a=this.satBounds,c=this.satAxes;e[0]=o.a,e[1]=o.b,e[2]=o.c;for(let f=0;f<3;f++){let d=a[f],g=c[f];if(t.setFromPoints(g,e),d.isSeparated(t))return!1}let l=o.satBounds,u=o.satAxes,h=this.points;for(let f=0;f<3;f++){let d=l[f],g=u[f];if(t.setFromPoints(g,h),d.isSeparated(t))return!1}for(let f=0;f<3;f++){let d=c[f];for(let g=0;g<4;g++){let y=u[g];if(i.crossVectors(d,y),t.setFromPoints(i,e),n.setFromPoints(i,h),t.isSeparated(n))return!1}}return!0}}();Qn.prototype.closestPointToPoint=function(){return function(e,t){return this.needsUpdate&&this.update(),t.copy(e).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),t}}();Qn.prototype.distanceToPoint=function(){let s=new T;return function(t){return this.closestPointToPoint(t,s),t.distanceTo(s)}}();Qn.prototype.distanceToBox=function(){let s=["x","y","z"],e=new Array(12).fill().map(()=>new Qi),t=new Array(12).fill().map(()=>new Qi),n=new T,i=new T;return function(o,a=0,c=null,l=null){if(this.needsUpdate&&this.update(),this.intersectsBox(o))return(c||l)&&(o.getCenter(i),this.closestPointToPoint(i,n),o.closestPointToPoint(n,i),c&&c.copy(n),l&&l.copy(i)),0;let u=a*a,h=o.min,f=o.max,d=this.points,g=1/0;for(let m=0;m<8;m++){let p=d[m];i.copy(p).clamp(h,f);let v=p.distanceToSquared(i);if(v<g&&(g=v,c&&c.copy(p),l&&l.copy(i),v<u))return Math.sqrt(v)}let y=0;for(let m=0;m<3;m++)for(let p=0;p<=1;p++)for(let v=0;v<=1;v++){let _=(m+1)%3,E=(m+2)%3,w=p<<_|v<<E,A=1<<m|p<<_|v<<E,R=d[w],O=d[A];e[y].set(R,O);let P=s[m],G=s[_],X=s[E],ce=t[y],N=ce.start,Z=ce.end;N[P]=h[P],N[G]=p?h[G]:f[G],N[X]=v?h[X]:f[G],Z[P]=f[P],Z[G]=p?h[G]:f[G],Z[X]=v?h[X]:f[G],y++}for(let m=0;m<=1;m++)for(let p=0;p<=1;p++)for(let v=0;v<=1;v++){i.x=m?f.x:h.x,i.y=p?f.y:h.y,i.z=v?f.z:h.z,this.closestPointToPoint(i,n);let _=i.distanceToSquared(n);if(_<g&&(g=_,c&&c.copy(n),l&&l.copy(i),_<u))return Math.sqrt(_)}for(let m=0;m<12;m++){let p=e[m];for(let v=0;v<12;v++){let _=t[v];lc(p,_,n,i);let E=n.distanceToSquared(i);if(E<g&&(g=E,c&&c.copy(n),l&&l.copy(i),E<u))return Math.sqrt(E)}}return Math.sqrt(g)}}()});var Or,nu=Bt(()=>{Or=class{constructor(e){this._getNewPrimitive=e,this._primitives=[]}getPrimitive(){let e=this._primitives;return e.length===0?this._getNewPrimitive():e.pop()}releasePrimitive(e){this._primitives.push(e)}}});var hd,qi,iu=Bt(()=>{ua();nu();hd=class extends Or{constructor(){super(()=>new Ii)}},qi=new hd});var fd,Sn,ar=Bt(()=>{fd=class{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;let e=[],t=null;this.setBuffer=n=>{t&&e.push(t),t=n,this.float32Array=new Float32Array(n),this.uint16Array=new Uint16Array(n),this.uint32Array=new Uint32Array(n)},this.clearBuffer=()=>{t=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,e.length!==0&&this.setBuffer(e.pop())}}},Sn=new fd});function K0(s,e,t,n,i,r){zr=su.getPrimitive(),fa=su.getPrimitive(),ha.push(zr,fa),Sn.setBuffer(s._roots[e]);let o=dd(0,s.geometry,t,n,i,r);Sn.clearBuffer(),su.releasePrimitive(zr),su.releasePrimitive(fa),ha.pop(),ha.pop();let a=ha.length;return a>0&&(fa=ha[a-1],zr=ha[a-2]),o}function dd(s,e,t,n,i=null,r=0,o=0){let{float32Array:a,uint16Array:c,uint32Array:l}=Sn,u=s*2;if(Kn(u,c)){let f=ni(s,l),d=ai(u,c);return On(s,a,zr),n(f,d,!1,o,r+s,zr)}else{let P=function(X){let{uint16Array:ce,uint32Array:N}=Sn,Z=X*2;for(;!Kn(Z,ce);)X=Ai(X),Z=X*2;return ni(X,N)},G=function(X){let{uint16Array:ce,uint32Array:N}=Sn,Z=X*2;for(;!Kn(Z,ce);)X=Ri(X,N),Z=X*2;return ni(X,N)+ai(Z,ce)},f=Ai(s),d=Ri(s,l),g=f,y=d,m,p,v,_;if(i&&(v=zr,_=fa,On(g,a,v),On(y,a,_),m=i(v),p=i(_),p<m)){g=d,y=f;let X=m;m=p,p=X,v=_}v||(v=zr,On(g,a,v));let E=Kn(g*2,c),w=t(v,E,m,o+1,r+g),A;if(w===2){let X=P(g),N=G(g)-X;A=n(X,N,!0,o+1,r+g,v)}else A=w&&dd(g,e,t,n,i,r,o+1);if(A)return!0;_=fa,On(y,a,_);let R=Kn(y*2,c),O=t(_,R,p,o+1,r+y),M;if(O===2){let X=P(y),N=G(y)-X;M=n(X,N,!0,o+1,r+y,_)}else M=O&&dd(y,e,t,n,i,r,o+1);return!!M}}var zr,fa,ha,su,J0=Bt(()=>{_i();ho();nu();Os();ar();ha=[],su=new Or(()=>new an)});function $0(s,e,t={},n=0,i=1/0){let r=n*n,o=i*i,a=1/0,c=null;if(s.shapecast({boundsTraverseOrder:u=>(uc.copy(e).clamp(u.min,u.max),uc.distanceToSquared(e)),intersectsBounds:(u,h,f)=>f<a&&f<o,intersectsTriangle:(u,h)=>{u.closestPointToPoint(e,uc);let f=e.distanceToSquared(uc);return f<a&&(md.copy(uc),a=f,c=h),f<r}}),a===1/0)return null;let l=Math.sqrt(a);return t.point?t.point.copy(md):t.point=md.clone(),t.distance=l,t.faceIndex=c,t}var uc,md,Q0=Bt(()=>{_i();uc=new T,md=new T});function LE(s,e,t,n,i,r,o,a){let c;if(r===Bi?c=s.intersectTriangle(n,t,e,!0,i):c=s.intersectTriangle(e,t,n,r!==Ti,i),c===null)return null;let l=s.origin.distanceTo(i);return l<o||l>a?null:{distance:l,point:i.clone()}}function NE(s,e,t,n,i,r,o,a,c,l,u){po.fromBufferAttribute(e,r),mo.fromBufferAttribute(e,o),go.fromBufferAttribute(e,a);let h=LE(s,po,mo,go,hc,c,l,u);if(h){let f=new T;Ji.getBarycoord(hc,po,mo,go,f),n&&(ru.fromBufferAttribute(n,r),ou.fromBufferAttribute(n,o),au.fromBufferAttribute(n,a),h.uv=Ji.getInterpolation(hc,po,mo,go,ru,ou,au,new ot)),i&&(ru.fromBufferAttribute(i,r),ou.fromBufferAttribute(i,o),au.fromBufferAttribute(i,a),h.uv1=Ji.getInterpolation(hc,po,mo,go,ru,ou,au,new ot)),t&&(eg.fromBufferAttribute(t,r),tg.fromBufferAttribute(t,o),ng.fromBufferAttribute(t,a),h.normal=Ji.getInterpolation(hc,po,mo,go,eg,tg,ng,new T),h.normal.dot(s.direction)>0&&h.normal.multiplyScalar(-1));let d={a:r,b:o,c:a,normal:new T,materialIndex:0};Ji.getNormal(po,mo,go,d.normal),h.face=d,h.faceIndex=r,IE&&(h.barycoord=f)}return h}function da(s,e,t,n,i,r,o){let a=n*3,c=a+0,l=a+1,u=a+2,h=s.index;s.index&&(c=h.getX(c),l=h.getX(l),u=h.getX(u));let{position:f,normal:d,uv:g,uv1:y}=s.attributes,m=NE(t,f,d,g,y,c,l,u,e,r,o);return m?(m.faceIndex=n,i&&i.push(m),m):null}var IE,po,mo,go,ru,ou,au,eg,tg,ng,hc,gd=Bt(()=>{_i();IE=parseInt(co)>=169,po=new T,mo=new T,go=new T,ru=new ot,ou=new ot,au=new ot,eg=new T,tg=new T,ng=new T,hc=new T});function zn(s,e,t,n){let i=s.a,r=s.b,o=s.c,a=e,c=e+1,l=e+2;t&&(a=t.getX(a),c=t.getX(c),l=t.getX(l)),i.x=n.getX(a),i.y=n.getY(a),i.z=n.getZ(a),r.x=n.getX(c),r.y=n.getY(c),r.z=n.getZ(c),o.x=n.getX(l),o.y=n.getY(l),o.z=n.getZ(l)}var kr=Bt(()=>{});function ig(s,e,t,n,i,r,o,a){let{geometry:c,_indirectBuffer:l}=s;for(let u=n,h=n+i;u<h;u++)da(c,e,t,u,r,o,a)}function sg(s,e,t,n,i,r,o){let{geometry:a,_indirectBuffer:c}=s,l=1/0,u=null;for(let h=n,f=n+i;h<f;h++){let d;d=da(a,e,t,h,null,r,o),d&&d.distance<l&&(u=d,l=d.distance)}return u}function rg(s,e,t,n,i,r,o){let{geometry:a}=t,{index:c}=a,l=a.attributes.position;for(let u=s,h=e+s;u<h;u++){let f;if(f=u,zn(o,f*3,c,l),o.needsUpdate=!0,n(o,f,i,r))return!0}return!1}var cu=Bt(()=>{gd();kr()});function og(s,e=null){e&&Array.isArray(e)&&(e=new Set(e));let t=s.geometry,n=t.index?t.index.array:null,i=t.attributes.position,r,o,a,c,l=0,u=s._roots;for(let f=0,d=u.length;f<d;f++)r=u[f],o=new Uint32Array(r),a=new Uint16Array(r),c=new Float32Array(r),h(0,l),l+=r.byteLength;function h(f,d,g=!1){let y=f*2;if(a[y+15]===65535){let p=o[f+6],v=a[y+14],_=1/0,E=1/0,w=1/0,A=-1/0,R=-1/0,O=-1/0;for(let M=3*p,P=3*(p+v);M<P;M++){let G=n[M],X=i.getX(G),ce=i.getY(G),N=i.getZ(G);X<_&&(_=X),X>A&&(A=X),ce<E&&(E=ce),ce>R&&(R=ce),N<w&&(w=N),N>O&&(O=N)}return c[f+0]!==_||c[f+1]!==E||c[f+2]!==w||c[f+3]!==A||c[f+4]!==R||c[f+5]!==O?(c[f+0]=_,c[f+1]=E,c[f+2]=w,c[f+3]=A,c[f+4]=R,c[f+5]=O,!0):!1}else{let p=f+8,v=o[f+6],_=p+d,E=v+d,w=g,A=!1,R=!1;e?w||(A=e.has(_),R=e.has(E),w=!A&&!R):(A=!0,R=!0);let O=w||A,M=w||R,P=!1;O&&(P=h(p,d,w));let G=!1;M&&(G=h(v,d,w));let X=P||G;if(X)for(let ce=0;ce<3;ce++){let N=p+ce,Z=v+ce,B=c[N],Te=c[N+3],Re=c[Z],ne=c[Z+3];c[f+ce]=B<Re?B:Re,c[f+ce+3]=Te>ne?Te:ne}return X}}}var ag=Bt(()=>{});function xs(s,e,t,n,i){let r,o,a,c,l,u,h=1/t.direction.x,f=1/t.direction.y,d=1/t.direction.z,g=t.origin.x,y=t.origin.y,m=t.origin.z,p=e[s],v=e[s+3],_=e[s+1],E=e[s+3+1],w=e[s+2],A=e[s+3+2];return h>=0?(r=(p-g)*h,o=(v-g)*h):(r=(v-g)*h,o=(p-g)*h),f>=0?(a=(_-y)*f,c=(E-y)*f):(a=(E-y)*f,c=(_-y)*f),r>c||a>o||((a>r||isNaN(r))&&(r=a),(c<o||isNaN(o))&&(o=c),d>=0?(l=(w-m)*d,u=(A-m)*d):(l=(A-m)*d,u=(w-m)*d),r>u||l>o)?!1:((l>r||r!==r)&&(r=l),(u<o||o!==o)&&(o=u),r<=i&&o>=n)}var fc=Bt(()=>{});function cg(s,e,t,n,i,r,o,a){let{geometry:c,_indirectBuffer:l}=s;for(let u=n,h=n+i;u<h;u++){let f=l?l[u]:u;da(c,e,t,f,r,o,a)}}function lg(s,e,t,n,i,r,o){let{geometry:a,_indirectBuffer:c}=s,l=1/0,u=null;for(let h=n,f=n+i;h<f;h++){let d;d=da(a,e,t,c?c[h]:h,null,r,o),d&&d.distance<l&&(u=d,l=d.distance)}return u}function ug(s,e,t,n,i,r,o){let{geometry:a}=t,{index:c}=a,l=a.attributes.position;for(let u=s,h=e+s;u<h;u++){let f;if(f=t.resolveTriangleIndex(u),zn(o,f*3,c,l),o.needsUpdate=!0,n(o,f,i,r))return!0}return!1}var lu=Bt(()=>{gd();kr()});function hg(s,e,t,n,i,r,o){Sn.setBuffer(s._roots[e]),xd(0,s,t,n,i,r,o),Sn.clearBuffer()}function xd(s,e,t,n,i,r,o){let{float32Array:a,uint16Array:c,uint32Array:l}=Sn,u=s*2;if(Kn(u,c)){let f=ni(s,l),d=ai(u,c);ig(e,t,n,f,d,i,r,o)}else{let f=Ai(s);xs(f,a,n,r,o)&&xd(f,e,t,n,i,r,o);let d=Ri(s,l);xs(d,a,n,r,o)&&xd(d,e,t,n,i,r,o)}}var fg=Bt(()=>{fc();Os();ar();cu()});function dg(s,e,t,n,i,r){Sn.setBuffer(s._roots[e]);let o=yd(0,s,t,n,i,r);return Sn.clearBuffer(),o}function yd(s,e,t,n,i,r){let{float32Array:o,uint16Array:a,uint32Array:c}=Sn,l=s*2;if(Kn(l,a)){let h=ni(s,c),f=ai(l,a);return sg(e,t,n,h,f,i,r)}else{let h=$l(s,c),f=DE[h],g=n.direction[f]>=0,y,m;g?(y=Ai(s),m=Ri(s,c)):(y=Ri(s,c),m=Ai(s));let v=xs(y,o,n,i,r)?yd(y,e,t,n,i,r):null;if(v){let w=v.point[f];if(g?w<=o[m+h]:w>=o[m+h+3])return v}let E=xs(m,o,n,i,r)?yd(m,e,t,n,i,r):null;return v&&E?v.distance<=E.distance?v:E:v||E||null}}var DE,pg=Bt(()=>{Os();ar();fc();cu();DE=["x","y","z"]});function gg(s,e,t,n){Sn.setBuffer(s._roots[e]);let i=_d(0,s,t,n);return Sn.clearBuffer(),i}function _d(s,e,t,n,i=null){let{float32Array:r,uint16Array:o,uint32Array:a}=Sn,c=s*2;if(i===null&&(t.boundingBox||t.computeBoundingBox(),mg.set(t.boundingBox.min,t.boundingBox.max,n),i=mg),Kn(c,o)){let u=e.geometry,h=u.index,f=u.attributes.position,d=t.index,g=t.attributes.position,y=ni(s,a),m=ai(c,o);if(dc.copy(n).invert(),t.boundsTree)return On(s,r,hu),hu.matrix.copy(dc),hu.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:v=>hu.intersectsBox(v),intersectsTriangle:v=>{v.a.applyMatrix4(n),v.b.applyMatrix4(n),v.c.applyMatrix4(n),v.needsUpdate=!0;for(let _=y*3,E=(m+y)*3;_<E;_+=3)if(zn(ma,_,h,f),ma.needsUpdate=!0,v.intersectsTriangle(ma))return!0;return!1}});for(let p=y*3,v=(m+y)*3;p<v;p+=3){zn(pa,p,h,f),pa.a.applyMatrix4(dc),pa.b.applyMatrix4(dc),pa.c.applyMatrix4(dc),pa.needsUpdate=!0;for(let _=0,E=d.count;_<E;_+=3)if(zn(ma,_,d,g),ma.needsUpdate=!0,pa.intersectsTriangle(ma))return!0}}else{let u=s+8,h=a[s+6];return On(u,r,uu),!!(i.intersectsBox(uu)&&_d(u,e,t,n,i)||(On(h,r,uu),i.intersectsBox(uu)&&_d(h,e,t,n,i)))}}var uu,pa,ma,dc,mg,hu,xg=Bt(()=>{_i();fo();ua();kr();ho();Os();ar();uu=new an,pa=new Ii,ma=new Ii,dc=new Et,mg=new Qn,hu=new Qn});function yg(s,e,t,n={},i={},r=0,o=1/0){e.boundingBox||e.computeBoundingBox(),vd.set(e.boundingBox.min,e.boundingBox.max,t),vd.needsUpdate=!0;let a=s.geometry,c=a.attributes.position,l=a.index,u=e.attributes.position,h=e.index,f=qi.getPrimitive(),d=qi.getPrimitive(),g=UE,y=FE,m=null,p=null;i&&(m=BE,p=OE);let v=1/0,_=null,E=null;return fu.copy(t).invert(),pc.matrix.copy(fu),s.shapecast({boundsTraverseOrder:w=>vd.distanceToBox(w),intersectsBounds:(w,A,R)=>R<v&&R<o?(A&&(pc.min.copy(w.min),pc.max.copy(w.max),pc.needsUpdate=!0),!0):!1,intersectsRange:(w,A)=>{if(e.boundsTree)return e.boundsTree.shapecast({boundsTraverseOrder:O=>pc.distanceToBox(O),intersectsBounds:(O,M,P)=>P<v&&P<o,intersectsRange:(O,M)=>{for(let P=O,G=O+M;P<G;P++){zn(d,3*P,h,u),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let X=w,ce=w+A;X<ce;X++){zn(f,3*X,l,c),f.needsUpdate=!0;let N=f.distanceToTriangle(d,g,m);if(N<v&&(y.copy(g),p&&p.copy(m),v=N,_=X,E=P),N<r)return!0}}}});{let R=Bs(e);for(let O=0,M=R;O<M;O++){zn(d,3*O,h,u),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let P=w,G=w+A;P<G;P++){zn(f,3*P,l,c),f.needsUpdate=!0;let X=f.distanceToTriangle(d,g,m);if(X<v&&(y.copy(g),p&&p.copy(m),v=X,_=P,E=O),X<r)return!0}}}}}),qi.releasePrimitive(f),qi.releasePrimitive(d),v===1/0?null:(n.point?n.point.copy(y):n.point=y.clone(),n.distance=v,n.faceIndex=_,i&&(i.point?i.point.copy(p):i.point=p.clone(),i.point.applyMatrix4(fu),y.applyMatrix4(fu),i.distance=y.sub(i.point).length(),i.faceIndex=E),n)}var fu,vd,pc,UE,FE,BE,OE,_g=Bt(()=>{_i();fo();kr();rc();iu();fu=new Et,vd=new Qn,pc=new Qn,UE=new T,FE=new T,BE=new T,OE=new T});function vg(s,e=null){e&&Array.isArray(e)&&(e=new Set(e));let t=s.geometry,n=t.index?t.index.array:null,i=t.attributes.position,r,o,a,c,l=0,u=s._roots;for(let f=0,d=u.length;f<d;f++)r=u[f],o=new Uint32Array(r),a=new Uint16Array(r),c=new Float32Array(r),h(0,l),l+=r.byteLength;function h(f,d,g=!1){let y=f*2;if(a[y+15]===65535){let p=o[f+6],v=a[y+14],_=1/0,E=1/0,w=1/0,A=-1/0,R=-1/0,O=-1/0;for(let M=p,P=p+v;M<P;M++){let G=3*s.resolveTriangleIndex(M);for(let X=0;X<3;X++){let ce=G+X;ce=n?n[ce]:ce;let N=i.getX(ce),Z=i.getY(ce),B=i.getZ(ce);N<_&&(_=N),N>A&&(A=N),Z<E&&(E=Z),Z>R&&(R=Z),B<w&&(w=B),B>O&&(O=B)}}return c[f+0]!==_||c[f+1]!==E||c[f+2]!==w||c[f+3]!==A||c[f+4]!==R||c[f+5]!==O?(c[f+0]=_,c[f+1]=E,c[f+2]=w,c[f+3]=A,c[f+4]=R,c[f+5]=O,!0):!1}else{let p=f+8,v=o[f+6],_=p+d,E=v+d,w=g,A=!1,R=!1;e?w||(A=e.has(_),R=e.has(E),w=!A&&!R):(A=!0,R=!0);let O=w||A,M=w||R,P=!1;O&&(P=h(p,d,w));let G=!1;M&&(G=h(v,d,w));let X=P||G;if(X)for(let ce=0;ce<3;ce++){let N=p+ce,Z=v+ce,B=c[N],Te=c[N+3],Re=c[Z],ne=c[Z+3];c[f+ce]=B<Re?B:Re,c[f+ce+3]=Te>ne?Te:ne}return X}}}var bg=Bt(()=>{});function Mg(s,e,t,n,i,r,o){Sn.setBuffer(s._roots[e]),bd(0,s,t,n,i,r,o),Sn.clearBuffer()}function bd(s,e,t,n,i,r,o){let{float32Array:a,uint16Array:c,uint32Array:l}=Sn,u=s*2;if(Kn(u,c)){let f=ni(s,l),d=ai(u,c);cg(e,t,n,f,d,i,r,o)}else{let f=Ai(s);xs(f,a,n,r,o)&&bd(f,e,t,n,i,r,o);let d=Ri(s,l);xs(d,a,n,r,o)&&bd(d,e,t,n,i,r,o)}}var Sg=Bt(()=>{fc();Os();ar();lu()});function Eg(s,e,t,n,i,r){Sn.setBuffer(s._roots[e]);let o=Md(0,s,t,n,i,r);return Sn.clearBuffer(),o}function Md(s,e,t,n,i,r){let{float32Array:o,uint16Array:a,uint32Array:c}=Sn,l=s*2;if(Kn(l,a)){let h=ni(s,c),f=ai(l,a);return lg(e,t,n,h,f,i,r)}else{let h=$l(s,c),f=zE[h],g=n.direction[f]>=0,y,m;g?(y=Ai(s),m=Ri(s,c)):(y=Ri(s,c),m=Ai(s));let v=xs(y,o,n,i,r)?Md(y,e,t,n,i,r):null;if(v){let w=v.point[f];if(g?w<=o[m+h]:w>=o[m+h+3])return v}let E=xs(m,o,n,i,r)?Md(m,e,t,n,i,r):null;return v&&E?v.distance<=E.distance?v:E:v||E||null}}var zE,Tg=Bt(()=>{Os();ar();fc();lu();zE=["x","y","z"]});function Ag(s,e,t,n){Sn.setBuffer(s._roots[e]);let i=Sd(0,s,t,n);return Sn.clearBuffer(),i}function Sd(s,e,t,n,i=null){let{float32Array:r,uint16Array:o,uint32Array:a}=Sn,c=s*2;if(i===null&&(t.boundingBox||t.computeBoundingBox(),wg.set(t.boundingBox.min,t.boundingBox.max,n),i=wg),Kn(c,o)){let u=e.geometry,h=u.index,f=u.attributes.position,d=t.index,g=t.attributes.position,y=ni(s,a),m=ai(c,o);if(mc.copy(n).invert(),t.boundsTree)return On(s,r,pu),pu.matrix.copy(mc),pu.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:v=>pu.intersectsBox(v),intersectsTriangle:v=>{v.a.applyMatrix4(n),v.b.applyMatrix4(n),v.c.applyMatrix4(n),v.needsUpdate=!0;for(let _=y,E=m+y;_<E;_++)if(zn(xa,3*e.resolveTriangleIndex(_),h,f),xa.needsUpdate=!0,v.intersectsTriangle(xa))return!0;return!1}});for(let p=y,v=m+y;p<v;p++){let _=e.resolveTriangleIndex(p);zn(ga,3*_,h,f),ga.a.applyMatrix4(mc),ga.b.applyMatrix4(mc),ga.c.applyMatrix4(mc),ga.needsUpdate=!0;for(let E=0,w=d.count;E<w;E+=3)if(zn(xa,E,d,g),xa.needsUpdate=!0,ga.intersectsTriangle(xa))return!0}}else{let u=s+8,h=a[s+6];return On(u,r,du),!!(i.intersectsBox(du)&&Sd(u,e,t,n,i)||(On(h,r,du),i.intersectsBox(du)&&Sd(h,e,t,n,i)))}}var du,ga,xa,mc,wg,pu,Rg=Bt(()=>{_i();fo();ua();kr();ho();Os();ar();du=new an,ga=new Ii,xa=new Ii,mc=new Et,wg=new Qn,pu=new Qn});function Cg(s,e,t,n={},i={},r=0,o=1/0){e.boundingBox||e.computeBoundingBox(),Ed.set(e.boundingBox.min,e.boundingBox.max,t),Ed.needsUpdate=!0;let a=s.geometry,c=a.attributes.position,l=a.index,u=e.attributes.position,h=e.index,f=qi.getPrimitive(),d=qi.getPrimitive(),g=kE,y=HE,m=null,p=null;i&&(m=VE,p=GE);let v=1/0,_=null,E=null;return mu.copy(t).invert(),gc.matrix.copy(mu),s.shapecast({boundsTraverseOrder:w=>Ed.distanceToBox(w),intersectsBounds:(w,A,R)=>R<v&&R<o?(A&&(gc.min.copy(w.min),gc.max.copy(w.max),gc.needsUpdate=!0),!0):!1,intersectsRange:(w,A)=>{if(e.boundsTree){let R=e.boundsTree;return R.shapecast({boundsTraverseOrder:O=>gc.distanceToBox(O),intersectsBounds:(O,M,P)=>P<v&&P<o,intersectsRange:(O,M)=>{for(let P=O,G=O+M;P<G;P++){let X=R.resolveTriangleIndex(P);zn(d,3*X,h,u),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let ce=w,N=w+A;ce<N;ce++){let Z=s.resolveTriangleIndex(ce);zn(f,3*Z,l,c),f.needsUpdate=!0;let B=f.distanceToTriangle(d,g,m);if(B<v&&(y.copy(g),p&&p.copy(m),v=B,_=ce,E=P),B<r)return!0}}}})}else{let R=Bs(e);for(let O=0,M=R;O<M;O++){zn(d,3*O,h,u),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let P=w,G=w+A;P<G;P++){let X=s.resolveTriangleIndex(P);zn(f,3*X,l,c),f.needsUpdate=!0;let ce=f.distanceToTriangle(d,g,m);if(ce<v&&(y.copy(g),p&&p.copy(m),v=ce,_=P,E=O),ce<r)return!0}}}}}),qi.releasePrimitive(f),qi.releasePrimitive(d),v===1/0?null:(n.point?n.point.copy(y):n.point=y.clone(),n.distance=v,n.faceIndex=_,i&&(i.point?i.point.copy(p):i.point=p.clone(),i.point.applyMatrix4(mu),y.applyMatrix4(mu),i.distance=y.sub(i.point).length(),i.faceIndex=E),n)}var mu,Ed,gc,kE,HE,VE,GE,Pg=Bt(()=>{_i();fo();kr();rc();iu();mu=new Et,Ed=new Qn,gc=new Qn,kE=new T,HE=new T,VE=new T,GE=new T});function Ig(){return typeof SharedArrayBuffer!="undefined"}var Lg=Bt(()=>{});function Ng(s,e,t,n){if(Ad)throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");Ad=!0;let i=s._roots,r=e._roots,o,a=0,c=0,l=new Et().copy(t).invert();for(let u=0,h=i.length;u<h;u++){xc.setBuffer(i[u]),c=0;let f=Hr.getPrimitive();On(0,xc.float32Array,f),f.applyMatrix4(l);for(let d=0,g=r.length;d<g&&(gu.setBuffer(r[d]),o=ws(0,0,t,l,n,a,c,0,0,f),gu.clearBuffer(),c+=r[d].length,!o);d++);if(Hr.releasePrimitive(f),xc.clearBuffer(),a+=i[u].length,o)break}return Ad=!1,o}function ws(s,e,t,n,i,r=0,o=0,a=0,c=0,l=null,u=!1){let h,f;u?(h=gu,f=xc):(h=xc,f=gu);let d=h.float32Array,g=h.uint32Array,y=h.uint16Array,m=f.float32Array,p=f.uint32Array,v=f.uint16Array,_=s*2,E=e*2,w=Kn(_,y),A=Kn(E,v),R=!1;if(A&&w)u?R=i(ni(e,p),ai(e*2,v),ni(s,g),ai(s*2,y),c,o+e,a,r+s):R=i(ni(s,g),ai(s*2,y),ni(e,p),ai(e*2,v),a,r+s,c,o+e);else if(A){let O=Hr.getPrimitive();On(e,m,O),O.applyMatrix4(t);let M=Ai(s),P=Ri(s,g);On(M,d,ya),On(P,d,_a);let G=O.intersectsBox(ya),X=O.intersectsBox(_a);R=G&&ws(e,M,n,t,i,o,r,c,a+1,O,!u)||X&&ws(e,P,n,t,i,o,r,c,a+1,O,!u),Hr.releasePrimitive(O)}else{let O=Ai(e),M=Ri(e,p);On(O,m,Td),On(M,m,wd);let P=l.intersectsBox(Td),G=l.intersectsBox(wd);if(P&&G)R=ws(s,O,t,n,i,r,o,a,c+1,l,u)||ws(s,M,t,n,i,r,o,a,c+1,l,u);else if(P)if(w)R=ws(s,O,t,n,i,r,o,a,c+1,l,u);else{let X=Hr.getPrimitive();X.copy(Td).applyMatrix4(t);let ce=Ai(s),N=Ri(s,g);On(ce,d,ya),On(N,d,_a);let Z=X.intersectsBox(ya),B=X.intersectsBox(_a);R=Z&&ws(O,ce,n,t,i,o,r,c,a+1,X,!u)||B&&ws(O,N,n,t,i,o,r,c,a+1,X,!u),Hr.releasePrimitive(X)}else if(G)if(w)R=ws(s,M,t,n,i,r,o,a,c+1,l,u);else{let X=Hr.getPrimitive();X.copy(wd).applyMatrix4(t);let ce=Ai(s),N=Ri(s,g);On(ce,d,ya),On(N,d,_a);let Z=X.intersectsBox(ya),B=X.intersectsBox(_a);R=Z&&ws(M,ce,n,t,i,o,r,c,a+1,X,!u)||B&&ws(M,N,n,t,i,o,r,c,a+1,X,!u),Hr.releasePrimitive(X)}}return R}var xc,gu,Hr,ya,_a,Td,wd,Ad,Dg=Bt(()=>{_i();ar();Os();ho();nu();xc=new Sn.constructor,gu=new Sn.constructor,Hr=new Or(()=>new an),ya=new an,_a=new an,Td=new an,wd=new an,Ad=!1});var xu,Ug,WE,yu,Fg=Bt(()=>{_i();td();j0();fo();ho();iu();J0();Q0();cu();ag();fg();pg();xg();_g();lu();bg();Sg();Tg();Rg();Pg();Lg();kr();Dg();xu=new Qn,Ug=new an,WE={strategy:0,maxDepth:40,maxLeafTris:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null},yu=class s{static serialize(e,t={}){t={cloneBuffers:!0,...t};let n=e.geometry,i=e._roots,r=e._indirectBuffer,o=n.getIndex(),a;return t.cloneBuffers?a={roots:i.map(c=>c.slice()),index:o?o.array.slice():null,indirectBuffer:r?r.slice():null}:a={roots:i,index:o?o.array:null,indirectBuffer:r},a}static deserialize(e,t,n={}){n={setIndex:!0,indirect:!!e.indirectBuffer,...n};let{index:i,roots:r,indirectBuffer:o}=e,a=new s(t,{...n,[Zl]:!0});if(a._roots=r,a._indirectBuffer=o||null,n.setIndex){let c=t.getIndex();if(c===null){let l=new Pn(e.index,1,!1);t.setIndex(l)}else c.array!==i&&(c.array.set(i),c.needsUpdate=!0)}return a}get indirect(){return!!this._indirectBuffer}constructor(e,t={}){if(e.isBufferGeometry){if(e.index&&e.index.isInterleavedBufferAttribute)throw new Error("MeshBVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw new Error("MeshBVH: Only BufferGeometries are supported.");if(t=Object.assign({...WE,[Zl]:!1},t),t.useSharedArrayBuffer&&!Ig())throw new Error("MeshBVH: SharedArrayBuffer is not available.");this.geometry=e,this._roots=null,this._indirectBuffer=null,t[Zl]||(Y0(this,t),!e.boundingBox&&t.setBoundingBox&&(e.boundingBox=this.getBoundingBox(new an))),this.resolveTriangleIndex=t.indirect?n=>this._indirectBuffer[n]:n=>n}refit(e=null){return(this.indirect?vg:og)(this,e)}traverse(e,t=0){let n=this._roots[t],i=new Uint32Array(n),r=new Uint16Array(n);o(0);function o(a,c=0){let l=a*2,u=r[l+15]===65535;if(u){let h=i[a+6],f=r[l+14];e(c,u,new Float32Array(n,a*4,6),h,f)}else{let h=a+32/4,f=i[a+6],d=i[a+7];e(c,u,new Float32Array(n,a*4,6),d)||(o(h,c+1),o(f,c+1))}}}raycast(e,t=Gi,n=0,i=1/0){let r=this._roots,o=this.geometry,a=[],c=t.isMaterial,l=Array.isArray(t),u=o.groups,h=c?t.side:t,f=this.indirect?Mg:hg;for(let d=0,g=r.length;d<g;d++){let y=l?t[u[d].materialIndex].side:h,m=a.length;if(f(this,d,y,e,a,n,i),l){let p=u[d].materialIndex;for(let v=m,_=a.length;v<_;v++)a[v].face.materialIndex=p}}return a}raycastFirst(e,t=Gi,n=0,i=1/0){let r=this._roots,o=this.geometry,a=t.isMaterial,c=Array.isArray(t),l=null,u=o.groups,h=a?t.side:t,f=this.indirect?Eg:dg;for(let d=0,g=r.length;d<g;d++){let y=c?t[u[d].materialIndex].side:h,m=f(this,d,y,e,n,i);m!=null&&(l==null||m.distance<l.distance)&&(l=m,c&&(m.face.materialIndex=u[d].materialIndex))}return l}intersectsGeometry(e,t){let n=!1,i=this._roots,r=this.indirect?Ag:gg;for(let o=0,a=i.length;o<a&&(n=r(this,o,e,t),!n);o++);return n}shapecast(e){let t=qi.getPrimitive(),n=this.indirect?ug:rg,{boundsTraverseOrder:i,intersectsBounds:r,intersectsRange:o,intersectsTriangle:a}=e;if(o&&a){let h=o;o=(f,d,g,y,m)=>h(f,d,g,y,m)?!0:n(f,d,this,a,g,y,t)}else o||(a?o=(h,f,d,g)=>n(h,f,this,a,d,g,t):o=(h,f,d)=>d);let c=!1,l=0,u=this._roots;for(let h=0,f=u.length;h<f;h++){let d=u[h];if(c=K0(this,h,r,o,i,l),c)break;l+=d.byteLength}return qi.releasePrimitive(t),c}bvhcast(e,t,n){let{intersectsRanges:i,intersectsTriangles:r}=n,o=qi.getPrimitive(),a=this.geometry.index,c=this.geometry.attributes.position,l=this.indirect?g=>{let y=this.resolveTriangleIndex(g);zn(o,y*3,a,c)}:g=>{zn(o,g*3,a,c)},u=qi.getPrimitive(),h=e.geometry.index,f=e.geometry.attributes.position,d=e.indirect?g=>{let y=e.resolveTriangleIndex(g);zn(u,y*3,h,f)}:g=>{zn(u,g*3,h,f)};if(r){let g=(y,m,p,v,_,E,w,A)=>{for(let R=p,O=p+v;R<O;R++){d(R),u.a.applyMatrix4(t),u.b.applyMatrix4(t),u.c.applyMatrix4(t),u.needsUpdate=!0;for(let M=y,P=y+m;M<P;M++)if(l(M),o.needsUpdate=!0,r(o,u,M,R,_,E,w,A))return!0}return!1};if(i){let y=i;i=function(m,p,v,_,E,w,A,R){return y(m,p,v,_,E,w,A,R)?!0:g(m,p,v,_,E,w,A,R)}}else i=g}return Ng(this,e,t,i)}intersectsBox(e,t){return xu.set(e.min,e.max,t),xu.needsUpdate=!0,this.shapecast({intersectsBounds:n=>xu.intersectsBox(n),intersectsTriangle:n=>xu.intersectsTriangle(n)})}intersectsSphere(e){return this.shapecast({intersectsBounds:t=>e.intersectsBox(t),intersectsTriangle:t=>t.intersectsSphere(e)})}closestPointToGeometry(e,t,n={},i={},r=0,o=1/0){return(this.indirect?Cg:yg)(this,e,t,n,i,r,o)}closestPointToPoint(e,t={},n=0,i=1/0){return $0(this,e,t,n,i)}getBoundingBox(e){return e.makeEmpty(),this._roots.forEach(n=>{On(0,new Float32Array(n),Ug),e.union(Ug)}),e}}});function Rd(s,e,t){return s===null?null:(s.point.applyMatrix4(e.matrixWorld),s.distance=s.point.distanceTo(t.ray.origin),s.object=e,s)}var Bg=Bt(()=>{});function Hg(s,e){this.isBatchedMesh?YE.call(this,s,e):jE.call(this,s,e)}function YE(s,e){if(this.boundsTrees){let t=this.boundsTrees,n=this._drawInfo||this._instanceInfo,i=this._drawRanges||this._geometryInfo,r=this.matrixWorld;Li.material=this.material,Li.geometry=this.geometry;let o=Li.geometry.boundsTree,a=Li.geometry.drawRange;Li.geometry.boundingSphere===null&&(Li.geometry.boundingSphere=new ti);for(let c=0,l=n.length;c<l;c++){if(!this.getVisibleAt(c))continue;let u=n[c].geometryIndex;if(Li.geometry.boundsTree=t[u],this.getMatrixAt(c,Li.matrixWorld).premultiply(r),!Li.geometry.boundsTree){this.getBoundingBoxAt(u,Li.geometry.boundingBox),this.getBoundingSphereAt(u,Li.geometry.boundingSphere);let h=i[u];Li.geometry.setDrawRange(h.start,h.count)}Li.raycast(s,vu);for(let h=0,f=vu.length;h<f;h++){let d=vu[h];d.object=this,d.batchId=c,e.push(d)}vu.length=0}Li.geometry.boundsTree=o,Li.geometry.drawRange=a,Li.material=null,Li.geometry=null}else qE.call(this,s,e)}function jE(s,e){if(this.geometry.boundsTree){if(this.material===void 0)return;zg.copy(this.matrixWorld).invert(),_u.copy(s.ray).applyMatrix4(zg),kg.setFromMatrixScale(this.matrixWorld),Og.copy(_u.direction).multiply(kg);let t=Og.length(),n=s.near/t,i=s.far/t,r=this.geometry.boundsTree;if(s.firstHitOnly===!0){let o=Rd(r.raycastFirst(_u,this.material,n,i),this,s);o&&e.push(o)}else{let o=r.raycast(_u,this.material,n,i);for(let a=0,c=o.length;a<c;a++){let l=Rd(o[a],this,s);l&&e.push(l)}}}else XE.call(this,s,e)}function Vg(s={}){return this.boundsTree=new yu(this,s),this.boundsTree}var nA,_u,Og,zg,XE,qE,kg,Li,vu,Gg=Bt(()=>{_i();Bg();Fg();nA=parseInt(co)>=166,_u=new nr,Og=new T,zg=new Et,XE=Rn.prototype.raycast,qE=El.prototype.raycast,kg=new T,Li=new Rn,vu=[]});var Wg=Bt(()=>{});var Xg=Bt(()=>{});var qg=Bt(()=>{});var Yg,jg=Bt(()=>{Yg=`

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
`});var Zg=Bt(()=>{});var Kg,Jg=Bt(()=>{Kg=`

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
`});var $g=Bt(()=>{});var Qg=Bt(()=>{jg();Zg();Jg();$g()});var xA,ex=Bt(()=>{Gg();ua();fo();Xg();Wg();qg();Qg();xA=`
	${Yg}
	${Kg}
`});var i1=rp(()=>{var TA=Ix(op());_i();b0();R0();ex();wi.prototype.computeBoundsTree=Vg;Rn.prototype.raycast=Hg;var KE=.09,JE=.2,tx={bone:15327174,muscle:11028287,nerve:15779137,vessel:14886444,vein:3107839,ligament:12831958,capsule:11120051},nx=3524863,bu=3725690,$E=16732240,QE=16749350,e1=11824127,ix={hip:[.62,1.12],gluteal:[.62,1.12],thigh:[.36,1],knee:[.3,.6],leg:[0,.5],foot:[-.02,.14],limb:[-.05,1.12],shoulder:[1.15,1.5],plexus:[1.2,1.53],arm:[1,1.45],elbow:[.95,1.2],forearm:[.66,1.15],wrist:[.66,.95],hand:[.64,.92],"upper limb":[.66,1.5]},Cd={model:"_jk3d_trunk8.glb",planes:["coronal","axial","sagittal"]},sx={anterior:[0,0,1],posterior:[0,0,-1],lateral:[-1,0,0],medial:[1,0,0],superior:[0,1,.001],inferior:[0,-1,.001]},Pd={};function Id(s){return Pd[s]||(Pd[s]=new Promise((e,t)=>{fetch(s).then(n=>{if(!n.ok)throw n.status;return n.arrayBuffer()}).then(n=>new Yl().parse(n,"",i=>e(i.scene),t)).catch(t)})),Pd[s]}var _c=null,t1=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]].map(s=>new T(...s));function rx(s){return Math.abs(s.y)>.92?new T(0,0,s.y>0?-1:1):new T(0,1,0)}var Ld=class{constructor(e,t){this.cam=e,this.el=t,this.target=new T,this.autoRotate=!1,this.autoRotateSpeed=1.2,this.vx=0,this.vy=0,this.drag=null,this.ls=[],this.snapOn=!0,this.turntable=!1,this.ball=(i,r)=>{let o=t.getBoundingClientRect(),a=.38*Math.min(o.width,o.height),c=(i-o.left-o.width/2)/a,l=-(r-o.top-o.height/2)/a,u=c*c+l*l;if(u>=1)return new T(c,l,0).normalize();let h=Math.sqrt(1-u);return new T(c,l,h).normalize()},t.addEventListener("pointerdown",i=>{if(!(i.button!==0||i.shiftKey)){this.drag={t:performance.now(),x:i.clientX,y:i.clientY},this.spin=null,this.vo=null;try{t.setPointerCapture(i.pointerId)}catch{}}}),t.addEventListener("pointermove",i=>{if(!this.drag||this.multi)return;if(this.turntable){let l=performance.now(),u=Math.max(1,l-this.drag.t),h=-(i.clientX-this.drag.x)*.008;this.turn(new T(0,1,0),h),this.spin={axis:new T(0,1,0),w:h/u*16},this.drag.x=i.clientX,this.drag.t=l;return}let r=performance.now(),o=Math.max(1,r-this.drag.t),a=i.clientX-this.drag.x,c=i.clientY-(this.drag.y==null?i.clientY:this.drag.y);this.drag.x=i.clientX,this.drag.y=i.clientY,this.drag.t=r,this.orbit(a*.008,c*.008),this.vo=[a*.008/o*16,c*.008/o*16]});let n=()=>{this.drag&&performance.now()-this.drag.t>80&&(this.spin=null,this.vo=null),this.drag=null};t.addEventListener("pointerup",n),t.addEventListener("pointercancel",n)}addEventListener(e,t){e==="change"&&this.ls.push(t)}emit(){this.ls.forEach(e=>e())}orbit(e,t){let n=this.cam.position.clone().sub(this.target),i=n.length(),r=Math.atan2(n.x,n.z)-e,o=Math.asin(Math.max(-1,Math.min(1,n.y/i)));this.turntable?o=0:o=Math.max(-1.45,Math.min(1.45,o+t)),n.set(Math.sin(r)*Math.cos(o),Math.sin(o),Math.cos(r)*Math.cos(o)).multiplyScalar(i),this.cam.position.copy(this.target).add(n),this.cam.up.set(0,1,0),this.cam.lookAt(this.target),this.emit()}rotate(e,t){this.orbit(e,t)}rotateFree(e,t){if(this.turntable){this.turn(new T(0,1,0),-e);return}let n=this.cam,i=n.position.clone().sub(this.target),r=n.up.clone(),o=new T().crossVectors(r,i).normalize(),a=new gi().setFromAxisAngle(r,-e).multiply(new gi().setFromAxisAngle(o,-t));i.applyQuaternion(a),n.up.applyQuaternion(a).normalize();let c=i.clone().normalize();n.up.sub(c.multiplyScalar(n.up.dot(i.clone().normalize()))).normalize(),n.position.copy(this.target).add(i),n.lookAt(this.target),this.emit()}turn(e,t){let n=new gi().setFromAxisAngle(e,t),i=this.cam.position.clone().sub(this.target).applyQuaternion(n);this.cam.up.applyQuaternion(n).normalize(),this.cam.position.copy(this.target).add(i),this.cam.lookAt(this.target),this.emit()}level(){let e=this.cam.position.clone().sub(this.target),t=e.length(),n=new T(e.x,0,e.z);return n.lengthSq()<1e-8&&n.set(0,0,1),{p1:this.target.clone().addScaledVector(n.normalize(),t),u1:new T(0,1,0)}}roll(e){let t=this.cam.position.clone().sub(this.target).normalize();this.cam.up.applyQuaternion(new gi().setFromAxisAngle(t,e)).normalize(),this.cam.lookAt(this.target),this.emit()}update(e){let t=!1;if(!this.drag&&this.vo&&Math.hypot(this.vo[0],this.vo[1])>1e-4){let n=Math.min(1,(e||.016666666666666666)*60);this.orbit(this.vo[0]*n,this.vo[1]*n);let i=Math.pow(.86,n);this.vo[0]*=i,this.vo[1]*=i,t=!0}else if(this.autoRotate&&!this.drag){let n=2*Math.PI/60*this.autoRotateSpeed*(e||.016666666666666666),i=new gi().setFromAxisAngle(new T(0,1,0),n),r=this.cam.position.clone().sub(this.target).applyQuaternion(i);this.cam.up.applyQuaternion(i),this.cam.position.copy(this.target).add(r),this.cam.lookAt(this.target),this.emit(),t=!0}else if(this.snapOn&&!this.drag&&e){let n=this.cam.position.clone().sub(this.target),i=n.clone().normalize(),r=null,o=-1;if(t1.forEach(a=>{let c=a.dot(i);c>o&&(o=c,r=a)}),o>Math.cos(14*Math.PI/180)&&o<.99999&&Math.abs(r.y)<.5){let a=1-Math.exp(-e*3.5),c=i.clone().lerp(r,a).normalize(),l=new T(0,1,0);this.cam.position.copy(this.target).addScaledVector(c,n.length()),l.sub(c.clone().multiplyScalar(l.dot(c))).normalize(),this.cam.up.copy(l),this.cam.lookAt(this.target),this.emit(),t=!0}}t||this.cam.lookAt(this.target)}};function ox(s,e){let t=new T;String(s||"anterior").toLowerCase().split(/[\s,+-]+/).forEach(i=>{let r=Object.keys(sx).find(o=>i&&o.startsWith(i.replace(/^antero/,"anterior").replace(/^postero/,"posterior")));r&&t.add(new T(...sx[r])),i==="anterolateral"&&t.add(new T(-.7,0,.7)),i==="posterolateral"&&t.add(new T(-.7,0,-.7)),i==="anteromedial"&&t.add(new T(.7,0,.7)),i==="posteromedial"&&t.add(new T(.7,0,-.7))}),t.lengthSq()<1e-6&&t.set(0,0,1);let n=String(s||"").match(/([+-]\d+)\s*$/);if(n){let i=new T(t.x,0,t.z);i.lengthSq()<1e-6&&i.set(0,0,1),i.normalize();let r=lo.degToRad(+n[1]);t.copy(i.multiplyScalar(Math.cos(r))).setY(Math.sin(r))}return e&&(t.x=-t.x),t.normalize()}var cr=s=>String(s||"").toLowerCase().replace(/\s+/g," ").trim();function yc(s){return String(s||"").split(/[\n,;]+/).map(e=>e.trim()).filter(Boolean)}function n1(s,e){_c&&_c.stop();let t=/_lite\.glb(\?|$)/.test(String(e.model||"")),n=t?Cd.model.replace(/\.glb$/,"_lite.glb"):Cd.model;if(s.innerHTML="",s.style.removeProperty("display"),/^(attach|nerve|action)$/.test(e.mode)){let w="jka-seen:"+e.mode+":"+(e.name||e.meshes),A=!1;try{A=localStorage.getItem(w)==="1"}catch{}let R=e.front||"adaptive",O=typeof e.ivl=="number"?e.ivl:typeof window.__jkaIvl=="number"?window.__jkaIvl:null;if(e.side==="back")try{localStorage.setItem(w,"1")}catch{}else if(R==="hide"||R==="adaptive"&&(O!=null?O>=1:A)){s.style.display="none";return}}let i=()=>[document.scrollingElement,document.getElementById("jk-sc")].forEach(w=>{w&&w.scrollTop&&(w.scrollTop=0)});i(),[50,200,600].forEach(w=>setTimeout(i,w)),s.classList.add("jka");let r=!1;try{r=localStorage.getItem("jka-ct")==="1"}catch{}s.classList.toggle("jka-ctpre",r);let o=!!e.xray;try{o=o||localStorage.getItem("jka-rad")==="1"}catch{}let a=s.closest(".jka-left");a&&r?a.style.animation="none":a&&o&&(a.style.animation="jka-shrink .5s cubic-bezier(.2, .8, .2, 1) both");let c=document.createElement("div");c.className="jka-wrap",s.appendChild(c);let l=document.createElement("div");l.className="jka-msg",l.textContent="Loading model\u2026",c.appendChild(l);let u;try{let w=window.__jkaR;w&&w.getContext()&&!w.getContext().isContextLost()?(u=w,u.setRenderTarget(null),u.autoClear=!0,u.setClearColor(0,0),u.domElement.removeAttribute("style"),u.domElement.className=""):(u=new Ya({antialias:!t,alpha:!0}),window.__jkaR=u)}catch{l.textContent="3D needs WebGL, which is off in this Anki.";return}let h=[],f=u.domElement,d=EventTarget.prototype;f.addEventListener=function(w,A,R){d.addEventListener.call(f,w,A,R),h.push([w,A,R])};let g=[],y=t?1:Math.min(2,window.devicePixelRatio||1),m=Math.min(y,1);u.setPixelRatio(y),u.outputColorSpace=Xn,c.appendChild(u.domElement);let p=document.createElementNS("http://www.w3.org/2000/svg","svg");p.setAttribute("class","jka-lines"),c.appendChild(p);let v=!1,_={stop(){v=!0,h.forEach(([w,A,R])=>{try{d.removeEventListener.call(f,w,A,R)}catch{}}),h.length=0,g.forEach(w=>{try{w.dispose()}catch{}}),g.length=0}};_c=_,Id(e.model).then(w=>{if(!v)try{E(w),l.remove()}catch(A){l.textContent="3D view error: "+(A&&A.message||A)+(A&&A.stack?" \u2014 "+String(A.stack).split(`
`).slice(0,2).join(" | "):"")}}).catch(w=>{l.textContent="Could not load "+e.model+" ("+w+"). Run Tools \u2192 Janki: Set up 3D anatomy."});function E(w){let A=window.__jkaT={t0:performance.now()},R=x=>{A[x]=Math.round(performance.now()-A.t0)},O=new Cr;O.add(new Ul(16777215,4210768,1.6));let M=new ra(16777215,1.4);O.add(M);let P=w.clone(!0);O.add(P);let G=e.mode+"|"+e.name+"|"+e.meshes,X=String(e.limb||"").toLowerCase();if(X!=="left"&&X!=="right"){let x=window.__jkaLimb;X=e.side==="back"&&x&&x.key===G?x.limb:Math.random()<.5?"left":"right"}e.side!=="back"&&(window.__jkaLimb={key:G,limb:X});let ce=X==="left";ce&&(P.scale.x=-1),P.updateMatrixWorld(!0);let N=[];P.traverse(x=>{if(!x.isMesh)return;let S=x.userData||{},b=S.n||x.name,L=S.l||"muscle",Y=L==="vein"||L==="vessel"&&/vein/i.test(b)?tx.vein:tx[L]||10066329;x.material=t?new Il({color:Y,emissive:L==="nerve"?3154944:0}):new Pr({color:Y,roughness:L==="bone"?.85:.6,metalness:0,emissive:L==="nerve"?3154944:0}),x.userData.base=Y,N.push({mesh:x,name:b,key:cr(b),layer:L,box:new an().setFromObject(x)})}),function x(S){let b=performance.now();for(;S<N.length&&performance.now()-b<8;S++){let L=N[S].mesh.geometry;if(!L.boundsTree)try{L.computeBoundsTree()}catch{}}S<N.length&&!v?setTimeout(()=>x(S),0):setTimeout(()=>{Vn=!0,dr=!0},0)}(0);let Z=x=>{let S=cr(x);return N.filter(b=>b.key===S||b.key===S+" muscle")},B=[].concat(...yc(e.meshes).map(Z)),Te=[].concat(...yc(e.nerve).map(Z)),Re=(e.peel||[]).map(x=>[].concat(...yc(x).map(Z))),ne=e.side==="back",be=e.mode,qe=B.length&&B.every(x=>x.layer==="nerve"||x.layer==="vessel"||x.layer==="vein");qe&&be==="name"&&(be="nerveid");let st=ix[cr(e.region)]||null,ie=new an;(B.length?B:Te).forEach(x=>ie.union(x.box));let Fe=tn();R("parts");let Ge=e.landmark?Fe[String(e.landmark).toLowerCase().trim()]?Nt(String(e.landmark).toLowerCase().trim()):Ht(e.landmark):null;function Nt(x){let S=window.__jkaLMC=window.__jkaLMC||new Map,b=e.model+"|"+x+"|"+e.meshes+"|"+(ce?"L":"R"),L=S.get(b);if(L){B.forEach(V=>{let we=V.mesh.geometry.userData.jkaSubG;if(we){let W=V.mesh.geometry;V.mesh.geometry=we,V.mesh.userData.coarse=W,N.forEach(F=>{F.mesh.geometry===W&&(F.mesh.geometry=we,F.mesh.userData.coarse=W)})}});let ee=new Map;if(B.forEach((V,we)=>{let W=L.W[we];W&&W.length===V.mesh.geometry.attributes.position.count&&ee.set(V,W)}),ee.size===L.n)return{pt:L.pt,pts:L.pts,W:ee,sphere:L.sphere,ivf:L.ivf}}let Y=Tt(x);return Y&&(S.set(b,{pt:Y.pt,pts:Y.pts,sphere:Y.sphere,ivf:Y.ivf,n:Y.W.size,W:B.map(ee=>Y.W.get(ee)||null)}),S.size>40&&S.delete(S.keys().next().value)),Y}let at=Ge?Ge.pt:null,Xt=Ge?Ge.pts?Ge.pts.slice():(()=>{let x=[];return B.forEach(S=>St(S.mesh,b=>{Ge.inPatch(b)&&Ge.soft(b)>.3&&x.push(b.clone())})),x})():[];try{document.documentElement.setAttribute("data-jkalm",Ge?Ge.pts?Ge.pts.length:"old":"none")}catch{}function tn(){return{"scapula: acromion":{k:"ext",d:[-.7,.7,.1],tol:.02,reach:.04},"scapula: coracoid process":{k:"ext",d:[.1,.15,1],tol:.012,reach:.03},"scapula: spine":{k:"ridge",bin:"m",d:[0,.15,-1],b:[.45,.98],sm:[0,.86],tol:.005},"scapula: supraspinous fossa":{k:"spinefossa",up:!0},"scapula: infraspinous fossa":{k:"spinefossa",up:!1},"scapula: subscapular fossa":{k:"band",b:[.04,.84],f:[.4,0,1,.45]},"scapula: scapular notch":{k:"contact",o:["Suprascapular nerve"],dist:.008,grow:.004,b:[.8,1],top:.018},"scapula: glenoid cavity":{k:"ext",d:[-1,0,0],b:[.62,.86],f:[-1,0,0,.45],tol:.007,reach:.025},"scapula: supraglenoid tubercle":{k:"glenoidend",up:!0},"scapula: infraglenoid tubercle":{k:"glenoidend",up:!1},"scapula: medial border":{k:"ridge",bin:"y",d:[1,0,0],b:[.05,.85],tol:.005},"scapula: superior angle":{k:"ext",d:[.8,1,0],tol:.006,reach:.02},"scapula: inferior angle":{k:"ext",d:[0,-1,0],tol:.006,reach:.02},"clavicle: acromial end":{k:"band",ax:"lat",b:[0,.12]},"clavicle: shaft":{k:"band",ax:"lat",b:[.25,.75]},"clavicle: sternal end":{k:"band",ax:"lat",b:[.88,1]},"clavicle: conoid tubercle":{k:"ext",ax:"lat",d:[0,-1,-.4],b:[.12,.38],tol:.005,reach:.016},"clavicle: sternal articular surface":{k:"ext",ax:"lat",d:[1,0,0],f:[1,0,0,.2],tol:.004,reach:.02},"humerus: head":{k:"sphere",d:[1,.7,-.4],b:[.8,1],seedR:.022,tol:.003,reach:.05},"humerus: greater tubercle":{k:"ext",d:[-1,.2,.15],b:[.82,.97],tol:.01,reach:.025},"humerus: lesser tubercle":{k:"ext",d:[.25,0,1],b:[.78,.9],tol:.004,reach:.015},"humerus: intertubercular groove":{k:"spiral",b:[.72,.9],phi:[2.7,2.7],w:.22},"humerus: anatomical neck":{k:"capedge",ref:"humerus: head",b:[.75,1]},"humerus: surgical neck":{k:"band",b:[.76,.82]},"humerus: deltoid tuberosity":{k:"ext",d:[-1,0,.35],b:[.45,.65],tol:.003,reach:.03},"humerus: radial groove":{k:"spiral",b:[.36,.64],phi:[.1,1.5],w:.3},"humerus: capitulum":{k:"band",b:[0,.07],sm:[.1,.4],f:[0,-.5,1,.25]},"humerus: trochlea":{k:"band",b:[0,.075],sm:[.38,.78],f:[0,-1,0,-.5]},"humerus: medial epicondyle":{k:"ext",d:[1,0,0],b:[.02,.16],tol:.007,reach:.02},"humerus: lateral epicondyle":{k:"ext",d:[-1,0,0],b:[.02,.16],tol:.005,reach:.018},"humerus: medial supracondylar ridge":{k:"ridge",bin:"y",d:[1,0,0],b:[.12,.32],tol:.004},"humerus: lateral supracondylar ridge":{k:"ridge",bin:"y",d:[-1,0,0],b:[.12,.35],tol:.004},"humerus: radial fossa":{k:"above",ref:"humerus: capitulum",b:[.07,.125],f:[0,0,1,.35],w:.08},"humerus: coronoid fossa":{k:"above",ref:"humerus: trochlea",b:[.075,.14],f:[0,0,1,.35],w:.12},"humerus: olecranon fossa":{k:"cav",b:[.05,.2],f:[0,0,-1,.4],sm:[.25,.75],thr:.18,reach:.022},"humerus: groove for ulnar nerve":{k:"contact",o:["Ulnar nerve"],dist:.009,grow:.005,b:[0,.2]},"radius: head":{k:"band",b:[.94,1]},"radius: neck":{k:"band",b:[.87,.935]},"radius: radial tuberosity":{k:"ext",d:[.8,0,.5],b:[.76,.88],tol:.003,reach:.014},"radius: interosseous border":{k:"ridge",bin:"y",d:[1,0,0],b:[.2,.75],tol:.0035},"radius: dorsal tubercle":{k:"ext",d:[0,0,-1],b:[.04,.14],tol:.0015,reach:.008},"radius: styloid process":{k:"ext",d:[-.7,-1,0],b:[0,.15],tol:.006,reach:.014},"radius: carpal articular surface":{k:"contact",o:["Scaphoid bone","Lunate bone"],dist:.004,grow:.003,b:[0,.1]},"ulna: olecranon":{k:"ext",d:[0,1,-.7],b:[.85,1],tol:.01,reach:.022},"ulna: trochlear notch":{k:"contact",o:["Humerus"],dist:.005,grow:.004,b:[.8,1]},"ulna: coronoid process":{k:"ext",d:[0,0,1],b:[.8,.95],tol:.005,reach:.012},"ulna: radial notch":{k:"contact",o:["Radius"],dist:.004,grow:.003,b:[.8,1]},"ulna: ulnar tuberosity":{k:"ext",d:[0,-.2,1],b:[.74,.84],tol:.003,reach:.012},"ulna: styloid process":{k:"ext",d:[.2,-1,-.3],b:[0,.12],tol:.004,reach:.01},"ulna: head":{k:"band",b:[.02,.1]},"trapezium: tubercle":{k:"ext",d:[0,0,1],tol:.002,reach:.008},"hamate: hook":{k:"ext",d:[0,0,1],tol:.003,reach:.01},"hand: head":{k:"band",ax:"pca",each:!0,b:[0,.2]},"hand: shaft":{k:"band",ax:"pca",each:!0,b:[.3,.72]},"hand: base":{k:"band",ax:"pca",each:!0,b:[.8,1]},"hand: distal tuberosity":{k:"band",ax:"pca",each:!0,b:[0,.25],f:[0,0,1,-.2]},"hand: sesamoids":{k:"band",ax:"pca",each:!0,b:[0,.25],f:[0,0,1,.3]},"hand: distal transverse crease":{k:"band",ax:"pca",each:!0,b:[0,.24],f:[0,0,1,.3]},"hand: proximal transverse crease":{k:"band",ax:"pca",each:!0,b:[.25,.5],f:[0,0,1,.3]},"tendon: distal":{k:"band",b:[0,.4]},"tendon: distal long":{k:"band",b:[0,.55]},"muscle: first dorsal interosseous":{k:"ext",d:[-1,0,0],tol:.014,reach:.03},"muscle: lumbricals radial":{k:"ext",d:[-1,0,0],tol:.034,reach:.06},"muscle: lumbricals ulnar":{k:"ext",d:[1,0,0],tol:.036,reach:.06},"vertebra: body":{k:"vert",part:"body"},"vertebra: arch":{k:"vert",part:"arch"},"vertebra: pedicle":{k:"vert",part:"pedicle"},"vertebra: lamina":{k:"vert",part:"lamina"},"vertebra: foramen":{k:"vert",part:"foramen"},"vertebra: superior notch":{k:"vert",part:"supnotch"},"vertebra: inferior notch":{k:"vert",part:"infnotch"},"vertebra: spinous process":{k:"vert",part:"spinous"},"vertebra: superior articular process":{k:"vert",part:"supart"},"vertebra: inferior articular process":{k:"vert",part:"infart"},"vertebra: pars interarticularis":{k:"vert",part:"pars"},"vertebra: transverse process":{k:"vert",part:"transverse"},"cervical: transverse process":{k:"vert",part:"transverse",xr:[1.4,9],zr:[-.6,1.6]},"cervical: transverse foramen":{k:"vert",part:"transforamen"},"atlas: posterior arch":{k:"vert",part:"arch",zr:[-9,-.35]},"atlas: anterior tubercle":{k:"ext",d:[0,0,1],tol:.003,reach:.01},"axis: dens":{k:"vert",part:"dens"},"thoracic: superior costal facet":{k:"vert",part:"contact",o:["Sixth rib.l","Sixth rib.r"],zr:[.2,9],tb:[.45,1]},"thoracic: inferior costal facet":{k:"vert",part:"contact",o:["Seventh rib.l","Seventh rib.r"],zr:[.2,9],tb:[0,.55]},"thoracic: transverse costal facet":{k:"vert",part:"contact",o:["Sixth rib.l","Sixth rib.r"],xr:[1.4,9],zr:[-9,.4]},"vertebra: intervertebral foramen":{k:"vert",part:"ivf"},"femur: head":{k:"sphere",d:[1,.6,0],b:[.85,1],seedR:.016,tol:.003,reach:.06},neck:{k:"shell",ref:"femur: head",r0:.0015,r1:.017,b:[.82,1]},"femur: intertrochanteric line":{k:"shell",ref:"femur: head",r0:.021,r1:.029,b:[.8,.97],f:[0,0,1,.35]},"femur: intertrochanteric crest":{k:"shell",ref:"femur: head",r0:.022,r1:.031,b:[.8,.97],f:[0,0,-1,.35]},"iliac crest":{k:"crest",tol:.0065},"intercondylar fossa":{k:"cav",b:[0,.08],f:[0,-.3,-1,.1],sm:[.3,.7],thr:.25,reach:.022},"patellar surface":{k:"band",b:[.015,.09],f:[0,0,1,.45],sm:[.15,.85]},"femur: patellar surface":{k:"band",b:[.015,.09],f:[0,0,1,.45],sm:[.15,.85]},"hip: ilium":{k:"hippart",part:"ilium"},"hip: ischium":{k:"hippart",part:"ischium"},"hip: pubis":{k:"hippart",part:"pubis"},"hip: superior pubic ramus":{k:"band",b:[.22,.45],sa:[.55,1],sm:[.45,.92]},"hip: inferior pubic ramus":{k:"band",b:[.04,.25],sm:[.6,1],sa:[.35,.85]},"hip: symphyseal surface":{k:"ext",d:[1,0,0],f:[1,0,0,.4],tol:.004,reach:.03},"hip: pectineal line":{k:"brim",seg:"pecten",w:.003},"hip: arcuate line":{k:"brim",w:.0035},"hip: obturator foramen":{k:"hole",b:[0,.45],outline:"loop"},"hip: auricular surface":{k:"contact",o:["Sacrum"],dist:.006,grow:.004},"hip: iliac fossa":{k:"brim",above:!0,b:[.5,.985],f:[1,.2,.3,.35]},"femur: trochanteric fossa":{k:"cav",b:[.88,.98],f:[.5,0,-1,0],sm:[0,.5],thr:.2,reach:.02},"femur: gluteal tuberosity":{k:"ridge",bin:"y",d:[-.6,0,-1],b:[.66,.85],tol:.0022},"femur: popliteal surface":{k:"band",b:[.1,.25],f:[0,0,-1,.5],sm:[.2,.8]},"tibia: medial plateau":{k:"band",b:[.96,1],f:[0,1,0,.55],sm:[.5,1]},"tibia: lateral plateau":{k:"band",b:[.96,1],f:[0,1,0,.55],sm:[0,.5]},"tibia: medial condyle":{k:"band",b:[.86,.99],sm:[.52,1]},"tibia: lateral condyle":{k:"band",b:[.86,.99],sm:[0,.48]},"tibia: soleal line":{k:"spiral",b:[.64,.86],phi:[.9,-1.1],w:.2},"tibia: tibial tuberosity":{k:"ext",d:[0,0,1],b:[.8,.94],tol:.004,reach:.02},"tibia: medial malleolus":{k:"ext",d:[1,-1,0],b:[0,.1],tol:.008,reach:.02},"fibula: head":{k:"band",b:[.93,1]},"fibula: neck":{k:"band",b:[.87,.93]},"fibula: lateral malleolus":{k:"band",b:[0,.12]},"calcaneus: tuberosity":{k:"ext",d:[0,0,-1],tol:.01,reach:.025},"calcaneus: sustentaculum tali":{k:"ext",d:[1,.3,0],tol:.005,reach:.015},"hip: greater sciatic notch":{k:"ridge",bin:"y",d:[.3,0,-1],b:[.33,.58],on:/^hip bone$/i,tol:.011,outline:"arc"},"hip: lesser sciatic notch":{k:"ridge",bin:"y",d:[.3,0,-1],b:[.17,.31],on:/^hip bone$/i,tol:.009,outline:"arc"},"tibia: pes anserinus":{k:"ext",d:[.7,-.2,.6],b:[.8,.9],tol:.006,reach:.022},"muscle: obturator internus tendon":{k:"ext",d:[-1,0,0],tol:.022,reach:.045},"space: femoral triangle":{k:"band",ya:[.79,.9]},"space: adductor canal":{k:"band",ya:[.55,.72]},"space: adductor hiatus":{k:"band",ya:[.5,.56]},"cord: cervical enlargement":{k:"band",ya:[1.435,1.515]},"cord: lumbosacral enlargement":{k:"band",ya:[1.11,1.215]},"cord: conus medullaris":{k:"band",ya:[1.05,1.11]},"cauda: filum terminale":{k:"band",b:[0,.18]},"dura: dural sac":{k:"band",ya:[.918,1.075]},"temporal: mastoid":{k:"ext",each:!0,d:[0,-1,-.7],tol:.008,reach:.02},"vertebra: epidural":{k:"vert",part:"foramen",on:/^(vertebra|atlas|axis)/i},"muscle: gluteal fold":{k:"ext",d:[0,-1,-.3],tol:.012,reach:.09},"muscle: adductor part":{k:"ext",d:[-.6,.3,.6],tol:.05,reach:.25},"muscle: hamstring part":{k:"ext",d:[.7,0,-.7],tol:.03,reach:.45},"plexus: lateral cord":{k:"band",ya:[1.352,1.42]},"plexus: medial cord":{k:"band",ya:[1.352,1.42]},"tendon: proximal":{k:"band",each:!0,b:[.86,1]},"aponeurosis: palm":{k:"band",ya:[.785,.875]},"tendon: biceps long head":{k:"band",b:[.8,1]},"tendon: expansion":{k:"band",b:[0,.16]},"vessel: distal":{k:"band",b:[0,.72]},"nerve: recurrent median":{k:"ext",d:[-1,0,.6],ya:[.8,.87],tol:.006,reach:.02},"scaphoid: snuffbox":{k:"ext",d:[-1,0,-.4],tol:.004,reach:.012}}}function Tt(x,S){let b=Fe[x];if(!b)return null;let L=ce?-1:1,Y=z=>{if(z._md)return z._md;let k=z.mesh.geometry;if(k.attributes.normal||k.computeVertexNormals(),!k.userData.jkaSub&&k.index&&z.layer==="bone"){let re=k;if(k=re.userData.jkaSubG||bn(re,.0025/z.mesh.matrixWorld.getMaxScaleOnAxis()),k.userData.jkaSub=!0,!re.userData.jkaSubG){re.userData.jkaSubG=k;try{k.computeBoundsTree()}catch{}}z.mesh.geometry=k,z.mesh.userData.coarse=re,N.forEach(ge=>{ge.mesh.geometry===re&&(ge.mesh.geometry=k,ge.mesh.userData.coarse=re)})}let me=k.attributes.position,Q=k.attributes.normal,_e=me.count,Ze=new Float32Array(_e*3),ht=new Float32Array(_e*3),lt=new T,fn=new mn().getNormalMatrix(z.mesh.matrixWorld);for(let re=0;re<_e;re++)lt.fromBufferAttribute(me,re).applyMatrix4(z.mesh.matrixWorld),Ze[re*3]=lt.x,Ze[re*3+1]=lt.y,Ze[re*3+2]=lt.z,lt.fromBufferAttribute(Q,re).applyMatrix3(fn).normalize(),ht[re*3]=lt.x,ht[re*3+1]=lt.y,ht[re*3+2]=lt.z;let Pt=Array.from({length:_e},()=>[]),mt=k.index?k.index.array:null;if(mt)for(let re=0;re<mt.length;re+=3)for(let ge=0;ge<3;ge++){let oe=mt[re+ge],xe=mt[re+(ge+1)%3];Pt[oe].push(xe),Pt[xe].push(oe)}let Ce=new Float32Array(_e);for(let re=0;re<_e;re++){let ge=Pt[re];if(!ge.length)continue;let oe=0,xe=0,te=0,j=0;ge.forEach(se=>{let J=Ze[se*3]-Ze[re*3],De=Ze[se*3+1]-Ze[re*3+1],ve=Ze[se*3+2]-Ze[re*3+2];oe+=J,xe+=De,te+=ve,j+=J*J+De*De+ve*ve}),Ce[re]=2*(oe*ht[re*3]+xe*ht[re*3+1]+te*ht[re*3+2])/Math.max(j,1e-12)}for(let re=0;re<6;re++){let ge=new Float32Array(_e);for(let oe=0;oe<_e;oe++){let xe=Ce[oe],te=1;Pt[oe].forEach(j=>{xe+=Ce[j],te++}),ge[oe]=xe/te}Ce=ge}return z._md={n:_e,P:Ze,N:ht,nb:Pt,K:Ce}},ee=S||B,V=(z,k)=>new T(z.P[k*3],z.P[k*3+1],z.P[k*3+2]),we=(z,k,me,Q)=>L*me[0]*Q[k*3]+me[1]*Q[k*3+1]+me[2]*Q[k*3+2],W=(z,k)=>{let me=new Map;return z.forEach(Q=>{let _e=Math.floor(Q.x/k)+","+Math.floor(Q.y/k)+","+Math.floor(Q.z/k);(me.get(_e)||me.set(_e,[]).get(_e)).push(Q)}),(Q,_e)=>{let Ze=Math.ceil(_e/k),ht=Math.floor(Q.x/k),lt=Math.floor(Q.y/k),fn=Math.floor(Q.z/k);for(let Pt=-Ze;Pt<=Ze;Pt++)for(let mt=-Ze;mt<=Ze;mt++)for(let Ce=-Ze;Ce<=Ze;Ce++){let re=me.get(ht+Pt+","+(lt+mt)+","+(fn+Ce));if(re){for(let ge of re)if(ge.distanceToSquared(Q)<_e*_e)return!0}}return!1}},F=new Map,$=null,Ee=-1/0,Oe={},je=b.on?ee.filter(z=>b.on.test(z.name)):ee,$e=b.each?je.map(z=>[z]):[je],pt=null;$e.forEach(z=>{let k=z.map(Y),me;if(b.ax==="lat"){let ge=1e9,oe=-1e9;k.forEach(xe=>{for(let te=0;te<xe.n;te++){let j=L*xe.P[te*3];ge=Math.min(ge,j),oe=Math.max(oe,j)}}),me=(xe,te)=>(L*xe.P[te*3]-ge)/(oe-ge)}else if(b.ax==="pca"){let ge=new T,oe=0;k.forEach(se=>{for(let J=0;J<se.n;J++)ge.add(V(se,J)),oe++}),ge.multiplyScalar(1/oe);let xe=new T(0,1,0);for(let se=0;se<12;se++){let J=new T;k.forEach(De=>{for(let ve=0;ve<De.n;ve++){let ue=V(De,ve).sub(ge);J.addScaledVector(ue,ue.dot(xe))}}),xe=J.normalize()}{let se=N.find(De=>De.name==="Capitate bone"),J=se?new an().setFromObject(se.mesh).getCenter(new T):null;(J?J.clone().sub(ge).dot(xe)<0:xe.y<0)&&xe.negate()}let te=1e9,j=-1e9;k.forEach(se=>{for(let J=0;J<se.n;J++){let De=V(se,J).sub(ge).dot(xe);te=Math.min(te,De),j=Math.max(j,De)}}),me=(se,J)=>(V(se,J).sub(ge).dot(xe)-te)/(j-te)}else{let ge=1e9,oe=-1e9;k.forEach(xe=>{for(let te=0;te<xe.n;te++)ge=Math.min(ge,xe.P[te*3+1]),oe=Math.max(oe,xe.P[te*3+1])}),me=(xe,te)=>(xe.P[te*3+1]-ge)/(oe-ge)}let Q=(ge,oe)=>!b.b||me(ge,oe)>=b.b[0]&&me(ge,oe)<=b.b[1],_e=1e9,Ze=-1e9,ht=1e9,lt=-1e9;k.forEach(ge=>{for(let oe=0;oe<ge.n;oe++)if(Q(ge,oe)){let xe=L*ge.P[oe*3],te=ge.P[oe*3+2];_e=Math.min(_e,xe),Ze=Math.max(Ze,xe),ht=Math.min(ht,te),lt=Math.max(lt,te)}});let fn=(ge,oe)=>Q(ge,oe)&&(!b.ya||ge.P[oe*3+1]>=b.ya[0]&&ge.P[oe*3+1]<=b.ya[1])&&(!b.f||we(ge,oe,b.f,ge.N)>=b.f[3])&&(!b.sm||(L*ge.P[oe*3]-_e)/(Ze-_e)>=b.sm[0]&&(L*ge.P[oe*3]-_e)/(Ze-_e)<=b.sm[1])&&(!b.sa||(ge.P[oe*3+2]-ht)/(lt-ht)>=b.sa[0]&&(ge.P[oe*3+2]-ht)/(lt-ht)<=b.sa[1]),Pt=k.map(ge=>new Float32Array(ge.n)),mt=ge=>k.forEach((oe,xe)=>{for(let te=0;te<oe.n;te++)fn(oe,te)&&ge(oe,te,xe)}),Ce=ge=>{let oe=null,xe=-1/0;return mt((te,j,se)=>{let J=ge(te,j);J>xe&&(xe=J,oe=[te,j,se])}),[oe,xe]},re=b.k;if(re==="ext"||re==="sphere"){let[ge,oe]=Ce((te,j)=>we(te,j,b.d,te.P));if(!ge)return;let xe=V(ge[0],ge[1]);if(re==="ext")mt((te,j,se)=>{let J=we(te,j,b.d,te.P);J>=oe-b.tol&&V(te,j).distanceTo(xe)<b.reach&&(Pt[se][j]=Math.min(1,(J-(oe-b.tol))/(b.tol*.5)))});else{let te=[];mt((se,J)=>{let De=V(se,J);De.distanceTo(xe)<b.seedR&&te.push(De)});let j=ae(te);for(let se=0;se<3;se++)te=[],mt((J,De)=>{let ve=V(J,De);Math.abs(ve.distanceTo(j.c)-j.r)<.003&&te.push(ve)}),te.length>20&&(j=ae(te));pt=j,mt((se,J,De)=>{let ve=V(se,J);Math.abs(ve.distanceTo(j.c)-j.r)<b.tol&&ve.distanceTo(xe)<b.reach&&(Pt[De][J]=1)})}oe>Ee&&(Ee=oe,$=xe)}else if(re==="ridge"){let oe=(se,J)=>(b.bin==="m"?L*se.P[J*3]:b.bin==="a"?se.P[J*3+2]:se.P[J*3+1])/.003,xe={};mt((se,J)=>{let De=Math.round(oe(se,J)),ve=we(se,J,b.d,se.P);(xe[De]==null||ve>xe[De])&&(xe[De]=ve)});let te={};Object.keys(xe).map(Number).forEach(se=>{let J=[se-1,se,se+1].filter(De=>xe[De]!=null);te[se]=J.reduce((De,ve)=>De+xe[ve],0)/J.length});let j=se=>{var ue,de;let J=Math.floor(se),De=(ue=te[J])!=null?ue:te[J+1],ve=(de=te[J+1])!=null?de:te[J];return De==null?null:De+(ve-De)*(se-J)};mt((se,J,De)=>{let ve=j(oe(se,J));if(ve==null)return;let ue=1-(ve-we(se,J,b.d,se.P))/b.tol;ue>0&&(Pt[De][J]=Math.min(1,ue*1.5))})}else if(re==="cav"){let[ge,oe]=Ce((te,j)=>te.K[j]);if(!ge||oe<=0)return;let xe=V(ge[0],ge[1]);mt((te,j,se)=>{let J=te.K[j];J>=b.thr*oe&&V(te,j).distanceTo(xe)<b.reach&&(Pt[se][j]=Math.min(1,(J-b.thr*oe)/(.3*oe)))}),$=xe}else if(re==="spiral"){let ge={};mt((oe,xe)=>{let te=Math.round(oe.P[xe*3+1]/.006),j=ge[te]||(ge[te]=[0,0,0]);j[0]+=oe.P[xe*3],j[1]+=oe.P[xe*3+2],j[2]++}),mt((oe,xe,te)=>{let j=ge[Math.round(oe.P[xe*3+1]/.006)],se=L*(oe.P[xe*3]-j[0]/j[2]),J=oe.P[xe*3+2]-j[1]/j[2],De=Math.atan2(-se,-J),ve=(me(oe,xe)-b.b[1])/(b.b[0]-b.b[1]),ue=b.phi[0]+(b.phi[1]-b.phi[0])*ve,de=Math.abs(De-ue);de>Math.PI&&(de=2*Math.PI-de),de<b.w&&(Pt[te][xe]=Math.min(1,(b.w-de)/(b.w*.4)))})}else if(re==="hole"){let oe=new Set,xe=ye=>Math.floor(ye.z/.003),te=ye=>Math.floor(ye.y/.003),j=1e9,se=-1e9,J=1e9,De=-1e9;mt((ye,Xe)=>{let Mt=V(ye,Xe),Zt=xe(Mt),Tn=te(Mt);oe.add(Zt+","+Tn),j=Math.min(j,Zt),se=Math.max(se,Zt),J=Math.min(J,Tn),De=Math.max(De,Tn)});let ve=new Set(oe);oe.forEach(ye=>{let[Xe,Mt]=ye.split(",").map(Number);for(let[Zt,Tn]of[[1,0],[-1,0],[0,1],[0,-1]])ve.add(Xe+Zt+","+(Mt+Tn))});let ue=new Set,de=[];for(let ye=j-1;ye<=se+1;ye++)de.push([ye,J-1],[ye,De+1]);for(let ye=J-1;ye<=De+1;ye++)de.push([j-1,ye],[se+1,ye]);for(;de.length;){let[ye,Xe]=de.pop(),Mt=ye+","+Xe;ye<j-1||ye>se+1||Xe<J-1||Xe>De+1||ue.has(Mt)||ve.has(Mt)||(ue.add(Mt),de.push([ye+1,Xe],[ye-1,Xe],[ye,Xe+1],[ye,Xe-1]))}let Qe=new Set;for(let ye=j;ye<=se;ye++)for(let Xe=J;Xe<=De;Xe++){let Mt=ye+","+Xe;!ve.has(Mt)&&!ue.has(Mt)&&Qe.add(Mt)}if(!Qe.size)return;mt((ye,Xe,Mt)=>{let Zt=V(ye,Xe),Tn=xe(Zt),Yn=te(Zt),U=!1;for(let Me=-3;Me<=3&&!U;Me++)for(let Le=-3;Le<=3&&!U;Le++)Qe.has(Tn+Me+","+(Yn+Le))&&(U=!0);U&&(Pt[Mt][Xe]=1)})}else if(re==="arcuate"){let ge={},oe=(xe,te)=>Math.round(xe.P[te*3+2]/.005);mt((xe,te)=>{let j=xe.P[te*3+1],se=oe(xe,te);(ge[se]==null||j<ge[se])&&(ge[se]=j)}),mt((xe,te,j)=>{xe.P[te*3+1]<ge[oe(xe,te)]+.004&&(Pt[j][te]=1)})}else if(re==="vert"){let ge={body:{zr:[.95,9]},arch:{zr:[-9,.95]},pedicle:{xr:[.8,1.7],zr:[-.3,1],tb:[.25,.85]},lamina:{xr:[0,1.3],zr:[-1.9,-.6]},spinous:{xr:[0,.7],zr:[-9,-1.4]},transverse:{xr:[1.7,9],zr:[-9,.6]},supart:{xr:[.6,2.4],zr:[-2,.2],tb:[.65,1]},infart:{xr:[.2,1.9],zr:[-2.4,-.5],tb:[0,.35]},pars:{xr:[.5,1.9],zr:[-1.8,-.2],tb:[.3,.65]},supnotch:{xr:[.7,1.9],zr:[-.5,1.1],tb:[.45,1],ny:.2},infnotch:{xr:[.7,1.9],zr:[-.5,1.1],tb:[0,.55],ny:-.2},dens:{xr:[0,.8],zr:[.45,9],tb:[.7,1]},contact:{}},oe=z.map((xe,te)=>[te,k[te].P.reduce((j,se,J)=>J%3===1?j+se:j,0)/k[te].n]).sort((xe,te)=>te[1]-xe[1]).map(xe=>xe[0]);z.forEach((xe,te)=>{let j=k[te],se=6e-4,J=1e9,De=-1e9,ve=1e9,ue=-1e9,de=1e9,Qe=-1e9;for(let Pe=0;Pe<j.n;Pe++)J=Math.min(J,j.P[Pe*3]),De=Math.max(De,j.P[Pe*3]),de=Math.min(de,j.P[Pe*3+1]),Qe=Math.max(Qe,j.P[Pe*3+1]),ve=Math.min(ve,j.P[Pe*3+2]),ue=Math.max(ue,j.P[Pe*3+2]);let ye=Math.ceil((De-J)/se)+3,Xe=Math.ceil((ue-ve)/se)+3,Mt=new Uint8Array(ye*Xe),Zt=(Pe,_t)=>Math.floor((Pe-J)/se)+1+(Math.floor((_t-ve)/se)+1)*ye,Tn=xe.mesh.geometry,Yn=Tn.index?Tn.index.array:null,U=Yn?Yn.length/3:j.n/3;for(let Pe=0;Pe<U;Pe++){let _t=Yn?Yn[Pe*3]:Pe*3,yt=Yn?Yn[Pe*3+1]:Pe*3+1,kt=Yn?Yn[Pe*3+2]:Pe*3+2,bt=j.P[_t*3],Ut=j.P[_t*3+2],gn=j.P[yt*3],hi=j.P[yt*3+2],Pi=j.P[kt*3],Dt=j.P[kt*3+2],dn=Math.max(Math.hypot(gn-bt,hi-Ut),Math.hypot(Pi-bt,Dt-Ut),Math.hypot(Pi-gn,Dt-hi)),on=Math.max(1,Math.ceil(dn/(se*.7)));for(let Un=0;Un<=on;Un++)for(let Nn=0;Nn<=on-Un;Nn++){let jn=Un/on,si=Nn/on,qn=1-jn-si;Mt[Zt(bt*qn+gn*jn+Pi*si,Ut*qn+hi*jn+Dt*si)]=1}}let Me=new Int32Array(ye*Xe).fill(-1),Le=[0];for(Me[0]=0;Le.length;){let Pe=Le.pop(),_t=Pe%ye,yt=(Pe-_t)/ye;for(let[kt,bt]of[[1,0],[-1,0],[0,1],[0,-1]]){let Ut=_t+kt,gn=yt+bt;if(Ut<0||gn<0||Ut>=ye||gn>=Xe)continue;let hi=Ut+gn*ye;Me[hi]===-1&&!Mt[hi]&&(Me[hi]=0,Le.push(hi))}}let Ve=[];for(let Pe=0;Pe<ye*Xe;Pe++){if(Mt[Pe]||Me[Pe]!==-1)continue;let _t=Ve.length+1,yt={n:0,sx:0,sz:0};Me[Pe]=_t;let kt=[Pe];for(;kt.length;){let bt=kt.pop(),Ut=bt%ye,gn=(bt-Ut)/ye;yt.n++,yt.sx+=Ut,yt.sz+=gn;for(let[hi,Pi]of[[1,0],[-1,0],[0,1],[0,-1]]){let Dt=Ut+hi,dn=gn+Pi,on=Dt+dn*ye;Dt>=0&&dn>=0&&Dt<ye&&dn<Xe&&Me[on]===-1&&!Mt[on]&&(Me[on]=_t,kt.push(on))}}yt.x=J+(yt.sx/yt.n-1+.5)*se,yt.z=ve+(yt.sz/yt.n-1+.5)*se,yt.r=Math.sqrt(yt.n/Math.PI)*se,Ve.push(yt)}Ve.sort((Pe,_t)=>_t.n-Pe.n);let ct=Ve[0]||{x:(J+De)/2,z:(ve+ue)/2,r:.008},ze={x:ct.x,z:ct.z},gt=0,it=0,rt=0;N.filter(Pe=>/spinal cord|cauda equina/i.test(Pe.name)).forEach(Pe=>{let _t=Y(Pe);for(let yt=0;yt<_t.n;yt++){let kt=_t.P[yt*3+1];kt>de+.3*(Qe-de)&&kt<Qe-.3*(Qe-de)&&(it+=_t.P[yt*3],rt+=_t.P[yt*3+2],gt++)}}),gt>10&&(ze={x:it/gt,z:rt/gt});let vt=new Array(24).fill(1e9);for(let Pe=0;Pe<j.n;Pe++){let _t=j.P[Pe*3+1];if(_t<de+.2*(Qe-de)||_t>Qe-.2*(Qe-de))continue;let yt=j.P[Pe*3]-ze.x,kt=j.P[Pe*3+2]-ze.z,bt=Math.hypot(yt,kt),Ut=Math.floor((Math.atan2(kt,yt)+Math.PI)/(2*Math.PI)*24)%24;bt<vt[Ut]&&(vt[Ut]=bt)}let Ae=vt.filter(Pe=>Pe<.03).sort((Pe,_t)=>Pe-_t),xt=Ae.length?Ae[Math.floor(Ae.length/2)]:.008;xt=Math.max(.005,Math.min(xt,.015));let Se=b.part==="ivf"?oe.indexOf(te)===0?"infnotch":"supnotch":b.part,Ke=Object.assign({},ge[Se]||{},b.xr?{xr:b.xr}:{},b.zr?{zr:b.zr}:{},b.tb?{tb:b.tb}:{}),Lt=(Pe,_t)=>!_t||Pe>=_t[0]&&Pe<=_t[1],Mn=Pe=>(j.P[Pe*3+1]-de)/(Qe-de),rn=null;if(Se==="contact"){let Pe=[];b.o.forEach(_t=>N.filter(yt=>yt.name===_t).forEach(yt=>{let kt=Y(yt);for(let bt=0;bt<kt.n;bt++)Pe.push(V(kt,bt))})),rn=W(Pe,.005)}for(let Pe=0;Pe<j.n;Pe++){let _t=Math.abs(j.P[Pe*3]-ze.x)/xt,yt=(j.P[Pe*3+2]-ze.z)/xt,kt=Mn(Pe);if(b.part==="ivf"&&_t>.8&&_t<1.7&&yt>-.3&&yt<.6){let Ut=j.P[Pe*3]>ze.x?1:-1,gn=Oe[Ut]||(Oe[Ut]={top:-1e9,bot:1e9,xs:0,zs:0,n:0,pt:1e9,pb:-1e9});gn.pt==null&&(gn.pt=1e9,gn.pb=-1e9),Se==="infnotch"?kt>.25&&(gn.pt=Math.min(gn.pt,j.P[Pe*3+1])):kt<.72&&(gn.pb=Math.max(gn.pb,j.P[Pe*3+1]))}let bt;if(Se==="foramen"){let Ut=Math.hypot(j.P[Pe*3]-ze.x,j.P[Pe*3+2]-ze.z);bt=Ut<xt*1.25&&(ze.x-j.P[Pe*3])*j.N[Pe*3]+(ze.z-j.P[Pe*3+2])*j.N[Pe*3+2]>.3*Ut}else Se==="transforamen"?bt=Ve.slice(1).some(Ut=>Ut.n>20&&Math.abs(Ut.x-ze.x)>xt&&Math.hypot(j.P[Pe*3]-Ut.x,j.P[Pe*3+2]-Ut.z)<Ut.r*1.6):(bt=Lt(_t,Ke.xr)&&Lt(yt,Ke.zr)&&Lt(kt,Ke.tb)&&(Ke.ny==null||(Ke.ny>0?j.N[Pe*3+1]>Ke.ny:j.N[Pe*3+1]<Ke.ny)),bt&&rn&&(bt=rn(V(j,Pe),.006)));if(bt&&fn(j,Pe)&&(Pt[te][Pe]=1,b.part==="ivf")){let Ut=j.P[Pe*3]>ze.x?1:-1,gn=Oe[Ut]||(Oe[Ut]={top:-1e9,bot:1e9,xs:0,zs:0,n:0});Se==="infnotch"?gn.top=Math.max(gn.top,j.P[Pe*3+1]):gn.bot=Math.min(gn.bot,j.P[Pe*3+1]),gn.xs+=j.P[Pe*3],gn.zs+=j.P[Pe*3+2],gn.n++}}})}else if(re==="swell"){let ge={};mt((ve,ue)=>{let de=Math.round(ve.P[ue*3+1]/.003),Qe=ve.P[ue*3],ye=ge[de]||(ge[de]=[1e9,-1e9]);Qe<ye[0]&&(ye[0]=Qe),Qe>ye[1]&&(ye[1]=Qe)});let oe=Object.keys(ge).map(Number).sort((ve,ue)=>ve-ue);if(!oe.length)return;let xe=ve=>ge[ve][1]-ge[ve][0],te=ve=>[ve-1,ve,ve+1].filter(ue=>ge[ue]).reduce((ue,de,Qe,ye)=>ue+xe(de)/ye.length,0),j=oe[0];oe.forEach(ve=>{te(ve)>te(j)&&(j=ve)});let se=b.frac*te(j),J=j,De=j;for(;ge[J-1]&&te(J-1)>=se;)J--;for(;ge[De+1]&&te(De+1)>=se;)De++;mt((ve,ue,de)=>{let Qe=Math.round(ve.P[ue*3+1]/.003);Qe>=J&&Qe<=De&&(Pt[de][ue]=1)});try{document.documentElement.setAttribute("data-swell",[J*3,De*3,(te(j)*1e3).toFixed(1)].join(","))}catch{}}else if(re==="shell"){let ge=N.filter(j=>j.name===z[0].name),oe=Tt(b.ref,ge);if(!oe||!oe.sphere)return;let xe=oe.sphere.c,te=oe.sphere.r;mt((j,se,J)=>{let De=V(j,se).distanceTo(xe)-te;De>b.r0&&De<b.r1&&(Pt[J][se]=Math.min(1,Math.min(De-b.r0,b.r1-De)/.002+.3))})}else if(re==="above"){let ge=N.filter(ve=>ve.name===z[0].name),oe=Tt(b.ref,ge);if(!oe||!oe.pts.length)return;let xe=1e9,te=-1e9;k.forEach(ve=>{for(let ue=0;ue<ve.n;ue++){let de=L*ve.P[ue*3];xe=Math.min(xe,de),te=Math.max(te,de)}});let j=oe.pts.reduce((ve,ue)=>ve+L*ue.x,0)/oe.pts.length,se=b.w*(te-xe),J=(b.b[0]+b.b[1])/2,De=(b.b[1]-b.b[0])/2;mt((ve,ue,de)=>{let Qe=((L*ve.P[ue*3]-j)/se)**2+((me(ve,ue)-J)/De)**2;Qe<1&&(Pt[de][ue]=Math.min(1,(1-Qe)/.35))}),$=null}else if(re==="crest"){let ge=N.filter(de=>de.name==="Femur"),oe=ge.length?Tt("femur: head",ge):null;if(!oe||!oe.sphere)return;let xe=oe.sphere.c.y,te=null,j=null;if(mt((de,Qe)=>{let ye=V(de,Qe);ye.y>xe+.04&&(!te||ye.z+.2*ye.y>te.z+.2*te.y)&&(te=ye),ye.y>xe+.03&&(!j||ye.z<j.z)&&(j=ye)}),!te||!j)return;let se=.003,J={};mt((de,Qe)=>{let ye=V(de,Qe);if(ye.z>te.z+.002||ye.z<j.z-.002)return;let Xe=Math.round(ye.z/se);(J[Xe]==null||ye.y>J[Xe])&&(J[Xe]=ye.y)});let De=Object.keys(J).map(Number).sort((de,Qe)=>de-Qe);if(De.length<3)return;let ve={};De.forEach(de=>{let Qe=[de-1,de,de+1].filter(ye=>J[ye]!=null);ve[de]=Qe.reduce((ye,Xe)=>ye+J[Xe],0)/Qe.length});let ue=de=>{var Tn,Yn;let Qe=de/se,ye=Math.floor(Qe),Xe=ye+1,Mt=(Tn=ve[ye])!=null?Tn:ve[Xe],Zt=(Yn=ve[Xe])!=null?Yn:ve[ye];return Mt==null?null:Mt+(Zt-Mt)*(Qe-ye)};mt((de,Qe,ye)=>{let Xe=V(de,Qe);if(Xe.z>te.z+.002||Xe.z<j.z-.002)return;let Mt=ue(Xe.z);if(Mt==null)return;let Zt=1-(Mt-Xe.y)/b.tol;Zt>0&&(Pt[ye][Qe]=Math.min(1,Zt*1.6))}),$=te.clone().lerp(j,.5)}else if(re==="capedge"){let ge=N.filter(ue=>ue.name===z[0].name),oe=Tt(b.ref,ge);if(!oe||!oe.sphere)return;let xe=oe.sphere.c,te=oe.sphere.r,j=oe.pt.clone().sub(xe).normalize(),se=ue=>Math.acos(Math.max(-1,Math.min(1,ue.clone().sub(xe).normalize().dot(j))))*180/Math.PI,J={},De={};mt((ue,de)=>{let Qe=V(ue,de),ye=Math.round(se(Qe)/2);ye>60||(De[ye]=(De[ye]||0)+1,Math.abs(Qe.distanceTo(xe)-te)<.0018&&(J[ye]=(J[ye]||0)+1))});let ve=null;for(let ue=10;ue<=60;ue++)if(De[ue]>8&&(J[ue]||0)/De[ue]<.5){ve=ue*2;break}if(ve==null)return;mt((ue,de,Qe)=>{let ye=V(ue,de),Xe=se(ye),Mt=ye.distanceTo(xe)-te;Xe>ve-6&&Xe<ve+8&&Mt>-.004&&Mt<.009&&(Pt[Qe][de]=Math.min(1,Math.min(Xe-(ve-6),ve+7-Xe)/3+.3))}),$=xe.clone().addScaledVector(j,te*Math.cos(ve*Math.PI/180));try{document.documentElement.setAttribute("data-capedge",ve)}catch{}}else if(re==="hippart"){let ge=N.filter(te=>te.name==="Femur"),oe=ge.length?Tt("femur: head",ge):null;if(!oe||!oe.sphere)return;let xe=oe.sphere.c;mt((te,j,se)=>{let J=V(te,j),De=J.y>xe.y+.003,ve=J.z<xe.z-.002;(b.part==="ilium"?De:b.part==="ischium"?!De&&ve:!De&&!ve)&&(Pt[se][j]=1)}),$=xe.clone()}else if(re==="brim"){let ge=N.filter(ye=>ye.name==="Femur"),oe=ge.length?Tt("femur: head",ge):null,xe=Tt("hip: auricular surface",z);if(!oe||!oe.sphere||!xe)return;let te=xe.pts.reduce((ye,Xe)=>!ye||Xe.z-Xe.y>ye.z-ye.y?Xe:ye,null),j=oe.sphere.c,se=ye=>k.forEach((Xe,Mt)=>{for(let Zt=0;Zt<Xe.n;Zt++)ye(Xe,Zt,Mt)}),J=null;if(se((ye,Xe)=>{let Mt=V(ye,Xe);Mt.z>j.z&&Mt.y>j.y&&Mt.y<j.y+.03&&L*(Mt.x-j.x)>.01&&ye.N[Xe*3+1]>.3&&(!J||Mt.z+Mt.y>J.z+J.y)&&(J=Mt)}),!J)return;let De=te;if(b.seg==="pecten"){let ye=-1e9;se((Mt,Zt)=>{ye=Math.max(ye,L*Mt.P[Zt*3])});let Xe=null;if(se((Mt,Zt)=>{let Tn=V(Mt,Zt),Yn=L*Tn.x;Yn>ye-.035&&Yn<ye-.012&&(!Xe||Tn.z+.5*Tn.y>Xe.z+.5*Xe.y)&&(Xe=Tn)}),!Xe)return;De=J,J=Xe}let ve=De,ue=J.clone().sub(ve),de=ue.lengthSq(),Qe=ye=>{let Xe=Math.max(0,Math.min(1,ye.clone().sub(ve).dot(ue)/de));return{t:Xe,d:ye.distanceTo(ve.clone().addScaledVector(ue,Xe))}};if(b.above)mt((ye,Xe,Mt)=>{let Zt=V(ye,Xe),Tn=Math.max(0,Math.min(1,Zt.clone().sub(ve).dot(ue)/de)),Yn=ve.y+ue.y*Tn;Zt.y>Yn+.004&&L*ye.N[Xe*3]>.2&&(Pt[Mt][Xe]=1)});else{let ye={};mt((Xe,Mt)=>{if(b.seg!=="pecten"&&L*Xe.N[Mt*3]<.05)return;let Zt=Qe(V(Xe,Mt));if(Zt.d>.012)return;let Tn=Math.round(Zt.t*40);(ye[Tn]==null||Zt.d<ye[Tn])&&(ye[Tn]=Zt.d)}),mt((Xe,Mt,Zt)=>{if(b.seg!=="pecten"&&L*Xe.N[Mt*3]<.05)return;let Tn=Qe(V(Xe,Mt)),Yn=Math.round(Tn.t*40);ye[Yn]!=null&&Tn.d<ye[Yn]+b.w&&(Pt[Zt][Mt]=1)})}$=ve.clone().lerp(J,.5)}else if(re==="band")mt((ge,oe,xe)=>{Pt[xe][oe]=1});else if(re==="contact"){let ge=[];b.o.forEach(te=>N.filter(j=>j.name===te).forEach(j=>{let se=Y(j);for(let J=0;J<se.n;J++)ge.push(V(se,J))}));let oe=W(ge,.005),xe=[];if(mt((te,j,se)=>{let J=V(te,j);oe(J,b.dist)&&(Pt[se][j]=1,xe.push(J))}),b.top&&xe.length){let te=xe.reduce((j,se)=>se.y>j.y?se:j);xe.length=0,mt((j,se,J)=>{Pt[J][se]&&V(j,se).distanceTo(te)>b.top?Pt[J][se]=0:Pt[J][se]&&xe.push(V(j,se))}),$=te}if(b.grow&&xe.length){let te=W(xe,.005);mt((j,se,J)=>{!Pt[J][se]&&te(V(j,se),b.grow)&&(Pt[J][se]=.7)})}}else if(re==="notch"){let oe=(ue,de)=>Math.round(L*ue.P[de*3]/.003),xe={};mt((ue,de)=>{var Qe;Math.abs(ue.N[de*3+2])>.7&&(xe[Qe=oe(ue,de)]||(xe[Qe]=[])).push(ue.P[de*3+2])});let te={};Object.keys(xe).forEach(ue=>{let de=xe[ue].sort((Qe,ye)=>Qe-ye);te[ue]=de[de.length>>1]});let j=(ue,de)=>te[oe(ue,de)]!=null&&Math.abs(ue.P[de*3+2]-te[oe(ue,de)])<.008,se={};mt((ue,de)=>{if(!j(ue,de)||ue.N[de*3+1]<.3)return;let Qe=oe(ue,de);(se[Qe]==null||ue.P[de*3+1]>se[Qe])&&(se[Qe]=ue.P[de*3+1])});let J=Object.keys(se).map(Number).sort((ue,de)=>ue-de);if(J.length<5)return;let De=ue=>[ue-1,ue,ue+1].filter(de=>se[de]!=null).reduce((de,Qe,ye,Xe)=>de+se[Qe]/Xe.length,0),ve=J[2];J.slice(2,-2).forEach(ue=>{De(ue)<De(ve)&&(ve=ue)}),mt((ue,de,Qe)=>{let ye=oe(ue,de);Math.abs(ye-ve)<=2&&j(ue,de)&&ue.N[de*3+1]>.1&&ue.P[de*3+1]>se[ve]-.006&&(Pt[Qe][de]=1)});{let ue=null;mt((de,Qe)=>{oe(de,Qe)===ve&&j(de,Qe)&&(!ue||de.P[Qe*3+1]>ue.y)&&(ue=V(de,Qe))}),ue&&($=ue)}}else if(re==="glenoidend"){let ge=Tt("scapula: glenoid cavity",z);if(!ge)return;let oe=ge.pts,te=oe.reduce((J,De)=>!J||(b.up?De.y>J.y:De.y<J.y)?De:J,null).clone().add(new T(0,b.up?.006:-.011,0)),j=b.up?.009:.012,se=W(oe,.005);mt((J,De,ve)=>{let ue=V(J,De);ue.distanceTo(te)<j&&!se(ue,.0015)&&(Pt[ve][De]=1-ue.distanceTo(te)/j*.5)}),$=te}else if(re==="socket"){let ge=N.filter(se=>se.name==="Humerus"),oe=ge.length?Tt("humerus: head",ge):null;if(!oe||!oe.sphere)return;let xe=oe.sphere.c,te=oe.sphere.r,j=[];if(mt((se,J,De)=>{let ve=V(se,J);if(ve.distanceTo(xe)<te+.015){let de=new T(se.N[J*3],se.N[J*3+1],se.N[J*3+2]),Qe=xe.clone().sub(ve).normalize();de.dot(Qe)>.55&&(j.push(ve),re==="socket"&&(Pt[De][J]=1))}}),re==="glenoidend"&&j.length){let J=j.reduce((ue,de)=>!ue||(b.up?de.y>ue.y:de.y<ue.y)?de:ue,null).clone().add(new T(0,b.up?.006:-.011,0)),De=b.up?.009:.012,ve=W(j,.005);mt((ue,de,Qe)=>{let ye=V(ue,de);ye.distanceTo(J)<De&&!ve(ye,.0015)&&(Pt[Qe][de]=1-ye.distanceTo(J)/De*.5)}),$=J}}else if(re==="aneck"){let ge=Tt("humerus: head",z);if(!ge)return;let oe=[];z.forEach(te=>{let j=ge.W.get(te),se=Y(te);if(j)for(let J=0;J<se.n;J++)j[J]>.35&&se.nb[J].some(De=>j[De]<=.35)&&oe.push(V(se,J))});let xe=W(oe,.005);mt((te,j,se)=>{xe(V(te,j),.0035)&&(Pt[se][j]=1)})}else if(re==="spinefossa"){let ge=Tt("scapula: spine",z);if(!ge)return;let oe=1e9,xe=-1e9;ge.pts.forEach(ve=>{oe=Math.min(oe,L*ve.x),xe=Math.max(xe,L*ve.x)});let te={};ge.pts.forEach(ve=>{if((L*ve.x-oe)/(xe-oe)<.3)return;let ue=Math.round(L*ve.x/.006);te[ue]=te[ue]==null?ve.y:Math.max(te[ue],ve.y)});let j=ve=>{let ue=Math.round(L*ve.x/.006);for(let de=0;de<20;de++){if(te[ue+de]!=null)return te[ue+de];if(te[ue-de]!=null)return te[ue-de]}return null},se=1e9,J=-1e9;k.forEach(ve=>{for(let ue=0;ue<ve.n;ue++){let de=L*ve.P[ue*3];se=Math.min(se,de),J=Math.max(J,de)}});let De=new Set(ge.pts.map(ve=>ve.x.toFixed(5)+ve.y.toFixed(5)));mt((ve,ue,de)=>{let Qe=V(ve,ue),ye=j(Qe);if(ye==null)return;let Xe=-ve.N[ue*3+2],Mt=(L*Qe.x-se)/(J-se);De.has(Qe.x.toFixed(5)+Qe.y.toFixed(5))||(b.up?Qe.y>ye+.002&&Xe>-.15&&Mt>.12:Qe.y<ye-.006&&Xe>.25&&Mt>.14)&&(Pt[de][ue]=1)})}z.forEach((ge,oe)=>{let xe=F.get(ge);F.set(ge,xe?xe.map((te,j)=>Math.max(te,Pt[oe][j])):Pt[oe])})});let q=[];if(F.forEach((z,k)=>{let me=Y(k),Q=new Float32Array(me.n);for(let _e=0;_e<me.n;_e++){let Ze=z[_e]*2,ht=2;me.nb[_e].forEach(lt=>{Ze+=z[lt],ht++}),Q[_e]=Math.max(z[_e]*.85,Ze/ht),Q[_e]>.35&&q.push(V(me,_e))}F.set(k,Q)}),!q.length)return null;if(!$){let z=q.reduce((k,me)=>k.add(me),new T).multiplyScalar(1/q.length);$=q.reduce((k,me)=>!k||me.distanceToSquared(z)<k.distanceToSquared(z)?me:k,null)}return{pt:$,W:F,pts:q,sphere:pt,ivf:Oe}}function bn(x,S){let b=x.attributes.position,L=x.attributes.normal,Y=[],ee=[];for(let F=0;F<b.count;F++)Y.push(b.getX(F),b.getY(F),b.getZ(F)),ee.push(L.getX(F),L.getY(F),L.getZ(F));let V=Array.from(x.index.array),we=S*S;for(let F=0;F<7;F++){let $=new Map,Ee=[],Oe=0,je=(z,k)=>{let me=Y[z*3]-Y[k*3],Q=Y[z*3+1]-Y[k*3+1],_e=Y[z*3+2]-Y[k*3+2];return me*me+Q*Q+_e*_e},$e=(z,k)=>{let me=z<k?z+"_"+k:k+"_"+z,Q=$.get(me);if(Q!=null)return Q;Q=Y.length/3;for(let _e=0;_e<3;_e++)Y.push((Y[z*3+_e]+Y[k*3+_e])/2),ee.push((ee[z*3+_e]+ee[k*3+_e])/2);return $.set(me,Q),Q},pt=new Set;for(let z=0;z<V.length;z+=3)for(let k=0;k<3;k++){let me=V[z+k],Q=V[z+(k+1)%3];je(me,Q)>we&&pt.add(me<Q?me+"_"+Q:Q+"_"+me)}if(!pt.size)break;let q=(z,k)=>pt.has(z<k?z+"_"+k:k+"_"+z);for(let z=0;z<V.length;z+=3){let k=V[z],me=V[z+1],Q=V[z+2],_e=[q(k,me),q(me,Q),q(Q,k)],Ze=_e[0]+_e[1]+_e[2];if(!Ze){Ee.push(k,me,Q);continue}if(Oe++,Ze===3){let ht=$e(k,me),lt=$e(me,Q),fn=$e(Q,k);Ee.push(k,ht,fn,ht,me,lt,fn,lt,Q,ht,lt,fn);continue}for(;!(Ze===1?q(k,me):q(k,me)&&q(me,Q));){let ht=k;k=me,me=Q,Q=ht}if(Ze===1){let ht=$e(k,me);Ee.push(k,ht,Q,ht,me,Q)}else{let ht=$e(k,me),lt=$e(me,Q);Ee.push(k,ht,Q,ht,me,lt,ht,lt,Q)}}if(V=Ee,!Oe)break}for(let F=0;F<ee.length;F+=3){let $=Math.hypot(ee[F],ee[F+1],ee[F+2])||1;ee[F]/=$,ee[F+1]/=$,ee[F+2]/=$}let W=new wi;return W.setAttribute("position",new pi(Y,3)),W.setAttribute("normal",new pi(ee,3)),W.setIndex(Y.length/3>65535?new ta(V,1):new ea(V,1)),W}function ae(x){let S=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],b=[0,0,0,0];x.forEach(W=>{let F=[W.x,W.y,W.z,1],$=-(W.x*W.x+W.y*W.y+W.z*W.z);for(let Ee=0;Ee<4;Ee++){b[Ee]+=F[Ee]*$;for(let Oe=0;Oe<4;Oe++)S[Ee][Oe]+=F[Ee]*F[Oe]}});for(let W=0;W<4;W++){let F=W;for(let $=W+1;$<4;$++)Math.abs(S[$][W])>Math.abs(S[F][W])&&(F=$);[S[W],S[F]]=[S[F],S[W]],[b[W],b[F]]=[b[F],b[W]];for(let $=0;$<4;$++)if($!==W){let Ee=S[$][W]/S[W][W];for(let Oe=W;Oe<4;Oe++)S[$][Oe]-=Ee*S[W][Oe];b[$]-=Ee*b[W]}}let L=b[0]/S[0][0],Y=b[1]/S[1][1],ee=b[2]/S[2][2],V=b[3]/S[3][3],we=new T(-L/2,-Y/2,-ee/2);return{c:we,r:Math.sqrt(Math.max(0,we.lengthSq()-V))}}function vi(x,S){let b=Math.max(...x.map(V=>V.y)),L=x.filter(V=>V.y>b-.06),Y=Math.max(...L.map(S)),ee=ae(L.filter(V=>S(V)>Y-.03));for(let V=0;V<2;V++){let we=x.filter(W=>Math.abs(W.distanceTo(ee.c)-ee.r)<.004);we.length>20&&(ee=ae(we))}return ee}function Ht(x){let S=[];if(B.forEach(z=>St(z.mesh,k=>S.push(k.clone()))),!S.length)return null;let b=ce?-1:1,L=z=>b*z.x,Y=S.map(z=>z.y),ee=Math.max(...Y),V=Math.min(...Y),we=ee-V,W=String(x).toLowerCase(),F={},$=(z,k,me,Q,_e)=>{F[z]={pred:k,f:me,tol:Q,reach:_e||.05}},Ee=(z,k,me)=>z.y>=k&&z.y<=me;if(/femur|femoral/.test(B[0].name.toLowerCase())){let z=S.filter(Ce=>Ce.y>ee-.06),k=Math.max(...z.map(L)),me=z.filter(Ce=>L(Ce)>k-.025),Q=me.reduce((Ce,re)=>Ce.add(re),new T).multiplyScalar(1/me.length),_e=Math.max(...me.map(Ce=>Ce.distanceTo(Q))),Ze=S.filter(Ce=>Ce.y>ee-.09).reduce((Ce,re)=>!Ce||-L(re)>-L(Ce)?re:Ce,null),ht=S.filter(Ce=>Ce.y<V+.11),lt=(Math.max(...ht.map(L))+Math.min(...ht.map(L)))/2,fn=Q.clone().lerp(Ze,.45),Pt=vi(S,L);$("head",Ce=>Ce.y>ee-.08,Ce=>-Math.abs(Ce.distanceTo(Pt.c)-Pt.r),.003,.06),$("neck",Ce=>Ce.y>ee-.09,Ce=>-Ce.distanceTo(fn),.012,.02),$("greater trochanter",Ce=>Ce.y>ee-.09,Ce=>-L(Ce)+Ce.y*.3,.012,.04),$("lesser trochanter",Ce=>Ee(Ce,ee-.12,ee-.06),Ce=>L(Ce)-Ce.z,.008,.025);let mt={};S.forEach(Ce=>{let re=Math.round(Ce.y/.008);(mt[re]==null||Ce.z<mt[re])&&(mt[re]=Ce.z)}),$("linea aspera",Ce=>Ee(Ce,V+.3*we,V+.75*we),Ce=>-(Ce.z-mt[Math.round(Ce.y/.008)]),.003,.25),$("medial condyle",Ce=>Ee(Ce,V,V+.045),Ce=>L(Ce)-.6*(Ce.y-V),.016,.04),$("lateral condyle",Ce=>Ee(Ce,V,V+.045),Ce=>-L(Ce)-.6*(Ce.y-V),.016,.04),$("medial epicondyle",Ce=>Ee(Ce,V+.035,V+.075),Ce=>L(Ce),.006,.025),$("lateral epicondyle",Ce=>Ee(Ce,V+.035,V+.075),Ce=>-L(Ce),.006,.025),$("adductor tubercle",Ce=>Ee(Ce,V+.07,V+.1),Ce=>L(Ce),.004,.018),$("intercondylar fossa",Ce=>Ee(Ce,V+.005,V+.04)&&Math.abs(L(Ce)-lt)<.012,Ce=>-Ce.z,.012,.03),$("patellar surface",Ce=>Ee(Ce,V+.025,V+.07)&&Math.abs(L(Ce)-lt)<.022,Ce=>Ce.z,.008,.04)}else{let z=[];N.filter(re=>re.name==="Femur").forEach(re=>St(re.mesh,ge=>z.push(ge.clone())));let k=z.length?Math.max(...z.map(re=>re.y)):V+.4*we,me=z.filter(re=>re.y>k-.05),Q=me.length?Math.max(...me.map(L)):0,_e=me.filter(re=>L(re)>Q-.025),Ze=_e.reduce((re,ge)=>re.add(ge),new T).multiplyScalar(1/Math.max(1,_e.length)),ht=Ze.y,lt=Ze.z,fn=Math.max(...S.map(L)),Pt=S.filter(re=>re.y>ht+.04).reduce((re,ge)=>!re||ge.z+.2*ge.y>re.z+.2*re.y?ge:re,null).y,mt=Math.min(...S.filter(re=>re.z<lt).map(re=>re.y));$("iliac crest",()=>!0,re=>re.y,.012,.12),$("anterior superior iliac spine",re=>re.y>ht+.04,re=>re.z+.2*re.y,.006,.02),$("asis",re=>re.y>ht+.04,re=>re.z+.2*re.y,.006,.02),$("anterior inferior iliac spine",re=>re.y>ht+.01&&re.y<ht+.035&&re.z>lt,re=>re.z,.005,.018),$("posterior superior iliac spine",re=>re.y>ht+.03&&L(re)>fn-.06,re=>-re.z,.006,.02),$("ischial tuberosity",re=>re.z<lt,re=>-re.y,.012,.035),$("ischial spine",re=>re.y>mt+.025&&re.y<ht&&re.z<lt-.015,re=>L(re),.004,.015),$("pubic symphysis",()=>!0,re=>L(re),.005,.03),$("pubic tubercle",re=>L(re)>fn-.035&&L(re)<fn-.012,re=>re.z+.5*re.y,.005,.015);let Ce=z.length?vi(z,L):{c:Ze,r:.024};$("acetabulum",re=>re.distanceTo(Ce.c)<Ce.r+.02,re=>-Math.abs(re.distanceTo(Ce.c)-(Ce.r+.002)),.005,.06)}let Oe=Object.keys(F).find(z=>W.indexOf(z)>=0);if(!Oe)return null;let je=F[Oe],$e=S.filter(je.pred);if(!$e.length)return null;let pt=$e[0],q=je.f($e[0]);return $e.forEach(z=>{let k=je.f(z);k>q&&(q=k,pt=z)}),{pt,inPatch:z=>je.pred(z)&&je.f(z)>=q-je.tol&&z.distanceTo(pt)<je.reach,soft:z=>Math.min(1,(je.f(z)-(q-je.tol))/(je.tol*.5))}}R("landmark");let Jt=cr(e.region||"")==="canal"&&/mater|dura/i.test(e.name||"");Jt?(ie.makeEmpty(),B.forEach(x=>St(x.mesh,S=>{S.y>1.17&&S.y<1.23&&ie.expandByPoint(S)})),ie.isEmpty()&&B.forEach(x=>ie.union(x.box)),ie.expandByScalar(.006)):cr(e.region||"")==="plexus"?(ie.makeEmpty(),Ge&&Ge.pts?Ge.pts.forEach(x=>ie.expandByPoint(x)):B.forEach(x=>ie.union(x.box)),ie.min.y=Math.max(ie.min.y,1.25),ie.max.y=Math.min(ie.max.y,1.52),ie.min.y>=ie.max.y&&(ie.min.y=1.3,ie.max.y=1.42),ie.expandByScalar(.025)):at&&(ie.makeEmpty(),Ge.pts?(Ge.pts.forEach(x=>ie.expandByPoint(x)),ie.expandByScalar(.025)):ie.expandByPoint(at).expandByScalar(.03)),st||(st=ie.isEmpty()?ix.limb:[ie.min.y-.12,ie.max.y+.12]);let At=B.length&&B.every(x=>x.layer==="ligament"||x.layer==="capsule"),kn=B.length&&B.every(x=>x.layer==="bone"),sn=!kn&&B.length&&B.every(x=>x.layer==="bone"||x.layer==="ligament"||x.layer==="capsule"),D=new Set(yc(e.show||(kn?"bone":At||sn?"bone,ligament":be==="nerve"?"bone,muscle,nerve,ligament":"bone,muscle,ligament")).map(cr).map(x=>x.replace(/s$/,"").replace("artery","vessel").replace("arterie","vessel"))),C=x=>x.box.max.y>st[0]&&x.box.min.y<st[1],fe=cr(e.region||"")==="vertebra";N.forEach(x=>{x.mesh.visible=fe?B.includes(x):C(x)&&(D.has(x.layer)||B.includes(x)||be==="nerve"&&Te.includes(x))});let Ne=new an;N.forEach(x=>{x.mesh.visible&&Ne.union(x.box)}),Ne.min.y=Math.max(Ne.min.y,st[0]),Ne.max.y=Math.min(Ne.max.y,st[1]);let Ie=(x,S,b)=>{x.mesh.material.color.setHex(S),x.mesh.material.emissive.setHex(b||0)},Ye=!1,ft=(x,S)=>{let b=x.mesh.material;b.transparent!==S<1&&(b.needsUpdate=!0),b.transparent=S<1,b.opacity=S,b.depthWrite=!0,x.mesh.renderOrder=S<1?1+N.indexOf(x)/1e4:0},nt=x=>x.layer==="vessel"||x.layer==="vein"?Ie(x,x.layer==="vein"?5213439:16726843,x.layer==="vein"?731776:6949386):Ie(x,new It(x.mesh.userData.base).lerp(new It(nx),.6).getHex(),666684),et=[],Ot=[],qt=[],Be=null,wn=[];if(at){let x=L=>{let Y=new It(L);B.forEach(ee=>{let V=ee.mesh.geometry,we=V.attributes.position,W=we.count,F=new Float32Array(W*3),$=new Float32Array(W),Ee=new It(ee.mesh.userData.base),Oe=new T;for(let je=0;je<W;je++){Oe.fromBufferAttribute(we,je).applyMatrix4(ee.mesh.matrixWorld);let $e=Ge.W?Ge.W.get(ee)?Ge.W.get(ee)[je]:0:Ge.inPatch(Oe)?Math.max(0,Math.min(1,Ge.soft(Oe))):0,pt=Ee.clone().lerp(Y,$e*.85);F[je*3]=pt.r,F[je*3+1]=pt.g,F[je*3+2]=pt.b,$[je]=$e}V.setAttribute("color",new Pn(F,3)),V.setAttribute("jkw",new Pn($,1)),ee.mesh.material.vertexColors=!0,ee.mesh.material.color.setHex(16777215),ee.mesh.material.needsUpdate=!0});try{Vn=!0}catch{}},S=Fe[String(e.landmark).toLowerCase().trim()];if(S&&S.outline&&Ge.pts&&Ge.pts.length>12&&!(be==="find"&&!ne)){let L=Ge.pts,Y=L.reduce((Oe,je)=>Oe.add(je),new T).multiplyScalar(1/L.length),ee=[[0,0,0],[0,0,0],[0,0,0]];L.forEach(Oe=>{let je=[Oe.x-Y.x,Oe.y-Y.y,Oe.z-Y.z];for(let $e=0;$e<3;$e++)for(let pt=0;pt<3;pt++)ee[$e][pt]+=je[$e]*je[pt]});let V=(Oe,je)=>{let $e=new T(.3,.8,.5);for(let pt=0;pt<30;pt++){let q=new T(Oe[0][0]*$e.x+Oe[0][1]*$e.y+Oe[0][2]*$e.z,Oe[1][0]*$e.x+Oe[1][1]*$e.y+Oe[1][2]*$e.z,Oe[2][0]*$e.x+Oe[2][1]*$e.y+Oe[2][2]*$e.z);je&&q.addScaledVector(je,-q.dot(je)),$e=q.normalize()}return $e},we=V(ee),W=V(ee,we),F=64,$=Array.from({length:F},()=>[]);L.forEach(Oe=>{let je=Oe.clone().sub(Y),$e=Math.atan2(je.dot(W),je.dot(we));$[Math.floor(($e+Math.PI)/(2*Math.PI)*F)%F].push(Oe)});let Ee=$.map(Oe=>Oe.length?S.outline==="loop"?Oe.reduce((je,$e)=>!je||$e.distanceToSquared(Y)<je.distanceToSquared(Y)?$e:je,null):Oe.reduce((je,$e)=>je.add($e),new T).multiplyScalar(1/Oe.length):null);if(S.outline==="arc"){let Oe={};L.forEach(pt=>{let q=Math.round(pt.y/.003);(Oe[q]||(Oe[q]=[])).push(pt)});let je=Object.keys(Oe).map(Number).sort((pt,q)=>pt-q);Ee=[];let $e=null;je.forEach(pt=>{let q=Oe[pt];if($e){let z=q.filter(k=>k.distanceTo($e)<.009);if(!z.length)return;q=z}else{let z=q.reduce((k,me)=>k.add(me),new T).multiplyScalar(1/q.length);q=q.filter(k=>k.distanceTo(z)<.008),q.length||(q=Oe[pt])}$e=q.reduce((z,k)=>z.add(k),new T).multiplyScalar(1/q.length),Ee.push($e.clone())})}if(Ee=Ee.filter(Boolean),Ee.length>5){let Oe=Ee.map((pt,q)=>{let z=Ee[(q-1+Ee.length)%Ee.length],k=Ee[(q+1)%Ee.length];return S.outline==="arc"&&(q===0||q===Ee.length-1)?pt.clone():pt.clone().multiplyScalar(.5).addScaledVector(z,.25).addScaledVector(k,.25)}),je=new Qa(Oe,S.outline==="loop"),$e=new Rn(new Pl(je,160,.0013,8,S.outline==="loop"),new Wi({color:4642047}));$e.renderOrder=12,O.add($e)}}let b=/intervertebral foramen/.test(String(e.landmark).toLowerCase());Be={material:{color:{setHex:L=>{b||x(L)}}},set visible(L){L&&!b&&x(3524863)}},Be.visible=!(be==="find"&&!ne),/intervertebral foramen/.test(String(e.landmark).toLowerCase())&&Ge.pts&&Object.values(Ge.ivf||{}).forEach(L=>{let Y=L.top>-1e8?L.top:L.pt,ee=L.bot<1e8?L.bot:L.pb;if(!(L.n>4&&Y>ee))return;L.top=Y,L.bot=ee;let V=L.xs/L.n,we=L.zs/L.n,W=[];B.forEach(_e=>St(_e.mesh,Ze=>{Math.abs(Ze.x-V)<.007&&W.push([Ze.z,Ze.y])}));let F=we,$=(L.top+L.bot)/2,Ee=0;for(let _e=we-.018;_e<=we+.003;_e+=.001)for(let Ze=L.bot-.006;Ze<=L.top+.022;Ze+=.001){let ht=1e9;for(let lt of W){let fn=lt[0]-_e,Pt=lt[1]-Ze,mt=fn*fn+Pt*Pt;if(mt<ht&&(ht=mt),ht<Ee*Ee)break}ht=Math.sqrt(ht),ht>Ee&&(Ee=ht,F=_e,$=Ze)}if(Ee<.002)return;let Oe=F,je=$,$e=Math.min(Ee*1.35,.013),pt=Math.min(Ee*.95,.009),q=[V,je,Oe],z=[],k=40;for(let _e=0;_e<k;_e++){let Ze=_e/k*2*Math.PI;q.push(V,je+Math.sin(Ze)*$e,Oe+Math.cos(Ze)*pt),z.push(0,1+_e,1+(_e+1)%k)}let me=new wi;me.setAttribute("position",new pi(q,3)),me.setIndex(z);let Q=new Rn(me,new Wi({color:3524863,transparent:!0,opacity:.65,side:Ti,depthWrite:!1}));Q.renderOrder=15,O.add(Q),Q.visible=!(be==="find"&&!ne),wn.push(Q);for(let _e=0;_e<=8;_e++){let Ze=_e/8*2*Math.PI;Xt.push(new T(V,je+(_e<8?Math.sin(Ze)*$e*.7:0),Oe+(_e<8?Math.cos(Ze)*pt*.7:0)))}}),ne&&et.push({text:e.name,pts:[at],cls:"hl"})}if(at)B.some(x=>x.layer!=="bone")&&(qt=B);else if(be==="name")B.forEach(nt),qt=B,ne&&et.push({text:e.name,parts:B,cls:"hl"});else if(be==="find")qe&&N.forEach(x=>{x.layer==="muscle"&&ft(x,.15),x.layer===B[0].layer&&C(x)&&(x.mesh.visible=!0)}),ne&&(B.forEach(x=>Ie(x,bu,667672)),qt=B,et.push({text:e.name,parts:B,cls:"ok"}));else if(be==="attach")B.forEach(nt),qt=B,ne&&B.some(x=>x.layer==="ligament")?et.push({text:e.name,parts:B,cls:"hl"}):ne&&(N.forEach(x=>{x.layer==="muscle"&&!B.includes(x)&&(x.mesh.visible=!1)}),B.forEach(x=>ft(x,.6)),jt());else if(be==="nerve")B.forEach(nt),qt=B,ne?(N.forEach(x=>{x.layer==="muscle"&&!B.includes(x)&&ft(x,.12)}),B.forEach(x=>ft(x,.55)),Te.forEach(x=>{x.mesh.visible=!0,Ie(x,16769354,6967808)}),Te.length&&et.push({text:e.nervename||Te[0].name,parts:Te.filter(x=>x.name===Te[0].name),cls:"nerve"}),et.push({text:e.name,parts:B,cls:"hl"})):Te.forEach(x=>{x.mesh.visible=!1}),N.forEach(x=>{x.layer==="nerve"&&!Te.includes(x)&&!ne&&(x.mesh.visible=!1)});else if(be==="nerveid"){if(N.forEach(S=>{S.layer==="muscle"&&ft(S,.18)}),ne){let S=L=>String(L).replace(/\.[lr]$/,""),b=new Set;Object.keys(Tf).forEach(L=>{B.some(Y=>S(Y.name)===S(L))&&Tf[L].forEach(Y=>b.add(S(Y)))}),b.size&&N.forEach(L=>{L.layer==="muscle"&&L.mesh.visible&&b.has(S(L.name))&&ft(L,.6)})}let x=B[0]&&(B[0].layer==="vessel"||B[0].layer==="vein")?B[0].layer:null;if(x){N.forEach(W=>{W.layer===x&&C(W)&&!B.includes(W)&&(W.mesh.visible=!0,ft(W,.28))});let S=[];B.forEach(W=>St(W.mesh,F=>S.push(F.clone())));let b=.004,L=new Map,Y=(W,F,$)=>W+","+F+","+$;S.forEach(W=>{let F=Y(Math.floor(W.x/b),Math.floor(W.y/b),Math.floor(W.z/b));(L.get(F)||L.set(F,[]).get(F)).push(W)});let ee=new an;B.forEach(W=>ee.union(W.box)),ee.expandByScalar(.004);let V=W=>{if(!W.box.intersectsBox(ee))return!1;let F=W.mesh.geometry.attributes.position,$=new T,Ee=Math.max(1,Math.floor(F.count/1500));for(let Oe=0;Oe<F.count;Oe+=Ee){$.fromBufferAttribute(F,Oe).applyMatrix4(W.mesh.matrixWorld);let je=Math.floor($.x/b),$e=Math.floor($.y/b),pt=Math.floor($.z/b);for(let q=-1;q<=1;q++)for(let z=-1;z<=1;z++)for(let k=-1;k<=1;k++){let me=L.get(Y(je+q,$e+z,pt+k));if(me){for(let Q of me)if(Q.distanceToSquared($)<.0025*.0025)return!0}}}return!1},we=[];N.forEach(W=>{W.layer!==x||B.includes(W)||B.some(F=>F.name===W.name)||V(W)&&(W.mesh.visible=!0,ft(W,1),Ie(W,10132899,1052688),W._link=!0,we.push(W))}),ne&&we.sort((W,F)=>F.box.getSize(new T).length()-W.box.getSize(new T).length()).slice(0,4).forEach(W=>Ot.push({text:W.name,parts:[W],cls:"minor"}))}B.forEach(S=>{S.mesh.visible=!0,x?nt(S):Ie(S,nx,670288)}),ne&&et.push({text:e.name,parts:B,cls:"hl"})}else be==="action"&&(B.forEach(nt),qt=B);if(cr(e.region||"")==="canal"){let x=B.some(b=>/arachnoid/i.test(b.name)),S=/pia mater/i.test(e.name||"");N.forEach(b=>{if(!B.includes(b))if(b.layer==="muscle"||b.layer==="ligament"||b.layer==="capsule"&&!/dura/i.test(b.name))b.mesh.visible=!1;else if(b.layer==="bone")ft(b,/vertebra|atlas|axis|sacrum|coccyx/i.test(b.name)?.22:.1);else if(b.name==="Spinal dura (opened)"&&(x||S))b.mesh.visible=!0,Ie(b,12096874);else if(b.name==="Arachnoid mater (opened)"&&S)b.mesh.visible=!0,Ie(b,13227750);else if(/dura|arachnoid/i.test(b.name)){b.mesh.visible=!1;let L=b.mesh.material;L.colorWrite=!1,L.depthWrite=!1,L.needsUpdate=!0}else b.layer==="nerve"&&/spinal cord|cauda|root of spinal|spinal ganglion|dorsal rami/i.test(b.name)&&(b.mesh.visible=!0)}),Jt||B.forEach(b=>{b.mesh.visible=!0,b.mesh.renderOrder=20;let L=b.mesh.material;L.depthTest=!1,L.transparent=!0,L.opacity=1,L.needsUpdate=!0})}if(cr(e.region||"")==="plexus"){let x=/brachial plexus|musculocutaneous|axillary nerve|^radial nerve|^median nerve|^ulnar nerve|dorsal scapular|long thoracic|suprascapular nerve|pectoral nerve|subscapular nerve|thoracodorsal|medial brachial cutaneous|medial antebrachial cutaneous/i;N.forEach(S=>{S.layer==="nerve"&&x.test(S.name)?(S.mesh.visible=!0,B.includes(S)||(S.mesh.renderOrder=2)):S.layer==="muscle"&&!B.includes(S)&&ft(S,.1)})}if(B.length&&!at&&!(be==="find"&&!ne)){let x=new Xi({vertexShader:"varying vec3 vn; varying vec3 vv; void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.); vn = normalize(normalMatrix * normal); vv = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }",fragmentShader:"varying vec3 vn; varying vec3 vv; void main(){ float r = 1. - abs(dot(normalize(vn), normalize(vv))); float a = 0.1 + 0.55 * pow(r, 2.2); gl_FragColor = vec4(0.42, 0.82, 1.0, a); }",transparent:!0,depthTest:!0,depthWrite:!1,depthFunc:pf,side:Gi});B.forEach(S=>{let b=new Rn(S.mesh.geometry,x);b.renderOrder=20,b.raycast=()=>{},S.mesh.add(b)})}if(ne&&B.length&&!qe&&["name","find","attach","nerve","action"].includes(be)&&(be!=="attach"&&!at&&!B.some(x=>x.layer==="ligament"||x.layer==="capsule"||x.layer==="bone")&&jt(!0),be!=="nerve"&&be!=="attach"&&Te.length)){Te.forEach(S=>{S.mesh.visible=!0,Ie(S,14270576,2761216)});let x=Te[0].name;Ot.push({text:"Nerve \xB7 "+x,parts:Te.filter(S=>S.name===x),cls:"minor"})}function cn(x){if(x=String(x||"").toLowerCase(),!x)return new Set;let S=new Set,b=F=>N.some($=>$.name===F&&$.layer==="bone"),L=[["Scapula",/scapul|coracoid|acromion|glenoid|supraspinous|infraspinous|subscapular fossa|inferior angle|lateral border/],["Clavicle",/clavic/],["Humerus",/humer|intertubercular|deltoid tuberosity|epicondyle|supracondylar|tubercle of the humerus/],["Radius",/radius|radial tuberosity|radial shaft|supinator crest(?!)/],["Ulna",/ulna\b|ulna |olecranon|coronoid|ulnar tuberosity|supinator crest/],["Pisiform bone",/pisiform/],["Hamate bone",/hamate/],["Trapezium bone",/trapezium/],["Trapezoid bone",/trapezoid/],["Capitate bone",/capitate/],["Scaphoid bone",/scaphoid/],["Lunate bone",/lunate/],["Triquetrum bone",/triquetrum/],["Femur",/femur|trochanter|linea aspera|femoral/],["Tibia",/tibia/],["Fibula",/fibula/],["Hip bone",/ilium|ischi|pubi|iliac|hip bone/],["Sacrum",/sacrum|sacral/],["Calcaneus",/calcane/],["Patella",/patell/]],Y=F=>F.name.replace(/\.[lr]$/,"");L.forEach(([F,$])=>{$.test(x)&&N.forEach(Ee=>{Ee.layer==="bone"&&Y(Ee)===F&&S.add(Ee.name)})}),[[/spinous|vertebra|transverse process|nuchal|lamina/,F=>/^(vertebra |atlas|axis)/i.test(F.name)],[/\bribs?\b|costal/,F=>/\brib\b/i.test(F.name)],[/occipit|mastoid|skull/,F=>/occipital|temporal/i.test(F.name)],[/sacrum|sacral/,F=>/^sacrum/i.test(F.name)],[/cervical/,F=>/^(vertebra c|atlas|axis)/i.test(F.name)],[/thoracic/,F=>/^vertebra t/i.test(F.name)]].forEach(([F,$])=>{F.test(x)&&N.forEach(Ee=>{Ee.layer==="bone"&&$(Ee)&&S.add(Ee.name)})}),/cervical/.test(x)&&/thoracic/.test(x)||(/cervical/.test(x)?[...S].forEach(F=>{/^vertebra [tl]/i.test(F)&&S.delete(F)}):/thoracic/.test(x)&&[...S].forEach(F=>{/^(vertebra [cl]|atlas|axis)/i.test(F)&&S.delete(F)}));let V={first:/1st|first|thumb/,second:/2nd|second|index/,third:/3rd|third/,fourth:/4th|fourth/,fifth:/5th|fifth|little/},we=x.match(/(\d)(?:st|nd|rd|th)?\s*[–-]\s*(\d)/),W=new Set;if(Object.keys(V).forEach(F=>{V[F].test(x)&&W.add(F)}),we&&["first","second","third","fourth","fifth"].slice(+we[1]-1,+we[2]).forEach(F=>W.add(F)),/metacarpal/.test(x)&&N.forEach(F=>{let $=F.name.match(/^(\w+) metacarpal bone$/i);$&&(!W.size||W.has($[1].toLowerCase()))&&S.add(F.name)}),/phalan/.test(x)){let F=["proximal","middle","distal"].filter($=>x.indexOf($)>=0);N.forEach($=>{let Ee=$.name.match(/^(proximal|middle|distal) phalanx of (\w+) finger of hand$/i);Ee&&(!F.length||F.includes(Ee[1].toLowerCase()))&&(!W.size||W.has(Ee[2].toLowerCase()))&&S.add($.name)})}return S}function jt(x,S){let b={o:cn(e.origin),i:cn(e.insertion)},L=[];if(B.forEach(Q=>St(Q.mesh,_e=>L.push(_e.clone()))),!L.length)return;let Y=.006,ee=new Map,V=(Q,_e,Ze)=>Q+","+_e+","+Ze;L.forEach(Q=>{let _e=V(Math.floor(Q.x/Y),Math.floor(Q.y/Y),Math.floor(Q.z/Y));(ee.get(_e)||ee.set(_e,[]).get(_e)).push(Q)});let we=new an;B.forEach(Q=>we.union(Q.box));let W=we.max.y-we.min.y,F=we.max.y-.35*W,$=.0065,Ee=L[0];L.forEach(Q=>{Q.y>Ee.y&&(Ee=Q)});let Oe=L[0],je=-1;L.forEach(Q=>{let _e=Q.distanceToSquared(Ee);_e>je&&(je=_e,Oe=Q)});let $e=we.min.y+.22*W,pt=!1;{let Q=Y;N.forEach(_e=>{pt||_e.layer!=="bone"||!_e.mesh.visible||_e.box.distanceToPoint(Oe)>.02||St(_e.mesh,Ze=>{!pt&&Ze.distanceTo(Oe)<.015&&(pt=!0)})})}let q=S?Q=>Q.y<=$e:Q=>Q.distanceTo(Oe)<(pt?.03:.05)&&Q.y<=$e+.02,z={o:[],i:[]},k={},me=!S&&b.o.size&&b.i.size&&[...b.o].some(Q=>!b.i.has(Q))&&[...b.i].some(Q=>!b.o.has(Q));if(N.forEach(Q=>{if(Q.layer!=="bone"||!Q.mesh.visible||!Q.box.clone().expandByScalar(.01).intersectsBox(we))return;let _e=Q.mesh.geometry,Ze=_e.attributes.position,ht=Ze.count,lt=new Float32Array(ht*3),fn=new It(Q.mesh.userData.base),Pt=new It(QE),mt=new It(e1),Ce=new T,re=!1,ge=[],oe=[],xe=[];for(let se=0;se<ht;se++){Ce.fromBufferAttribute(Ze,se).applyMatrix4(Q.mesh.matrixWorld);let J=!1,De=Math.floor(Ce.x/Y),ve=Math.floor(Ce.y/Y),ue=Math.floor(Ce.z/Y);for(let ye=-1;ye<=1&&!J;ye++)for(let Xe=-1;Xe<=1&&!J;Xe++)for(let Mt=-1;Mt<=1&&!J;Mt++){let Zt=ee.get(V(De+ye,ve+Xe,ue+Mt));if(Zt){for(let Tn of Zt)if(Tn.distanceToSquared(Ce)<$*$){J=!0;break}}}let de=J?q(Ce)?2:Ce.y>=F?1:0:0;if(J&&me){let ye=b.o.has(Q.name),Xe=b.i.has(Q.name);de=ye&&!Xe?1:Xe&&!ye?2:ye&&Xe?de:0}let Qe=de===1?Pt:de===2?mt:fn;lt[se*3]=Qe.r,lt[se*3+1]=Qe.g,lt[se*3+2]=Qe.b,de&&(re=!0,(de===1?z.o:z.i).push(Ce.clone()),ge.push(Ce.clone()),(de===1?oe:xe).push(Ce.clone()))}let te=Q.name==="Hip bone"?"Hip bone":Q.name.replace(/ bone$/,""),j=(se,J)=>{if(J.length<6)return;let De=se+te;k[De]?k[De].pts.push(...J):k[De]={k:se,text:(x?se+" \xB7 ":"")+te,pts:J.slice()}};j("Origin",oe),j("Insertion",xe),!x&&re&&(_e.setAttribute("color",new Pn(lt,3)),Q.mesh.material.vertexColors=!0,Q.mesh.material.color.setHex(16777215),Q.mesh.material.needsUpdate=!0)}),!S&&(!Object.values(k).some(Q=>Q.k==="Insertion")||me&&!Object.values(k).some(Q=>Q.k==="Origin")))return N.forEach(Q=>{Q.layer==="bone"&&Q.mesh.material.vertexColors&&(Q.mesh.geometry.deleteAttribute("color"),Q.mesh.material.vertexColors=!1,Q.mesh.material.color.setHex(Q.mesh.userData.base),Q.mesh.material.needsUpdate=!0)}),jt(x,!0);["Origin","Insertion"].forEach(Q=>{let _e=Object.values(k).filter(lt=>lt.k===Q),Ze=lt=>Q==="Origin"?Math.max(...lt.pts.map(fn=>fn.y)):-Math.min(...lt.pts.map(fn=>fn.y)),ht=me?-1e9:Math.max(-1e9,..._e.map(Ze));_e.filter(lt=>Ze(lt)>=ht-.025).sort((lt,fn)=>fn.pts.length-lt.pts.length).slice(0,2).forEach(lt=>Ot.push({text:lt.text,pts:lt.pts,cls:"minor"}))}),!x&&(et.push({text:e.name,parts:B,cls:"hl"}),z.o.length&&et.push({text:"Origin",pts:z.o,cls:"orig"}),z.i.length&&et.push({text:"Insertion",pts:z.i,cls:"ins"}))}function St(x,S){let b=x.geometry.attributes.position,L=new T;for(let Y=0;Y<b.count;Y++)S(L.fromBufferAttribute(b,Y).applyMatrix4(x.matrixWorld))}let ut=0,Vt=be==="peel"&&Re.length?document.createElement("div"):null;function En(x){if(ut=Math.max(0,Math.min(Re.length,x)),Re.forEach((S,b)=>S.forEach(L=>{L.mesh.visible=b>=ut&&C(L),Ie(L,L.mesh.userData.base)})),et.length=0,ne&&ut<Re.length){let S={};Re[ut].forEach(b=>{nt(b);let L=b.name.replace(/ muscle$/,"");S[L]?S[L].parts.push(b):Object.keys(S).length<6&&et.push(S[L]={text:L,parts:[b],cls:"hl"})})}Vt&&(Vt.querySelector("input").value=ut,Vt.querySelector("span").textContent=ut?"Removed: "+ut+" layer"+(ut>1?"s":""):"All layers"),Gr(),Vn=!0}Vt&&(Vt.className="jka-peel",Vt.innerHTML='<input type="range" min="0" max="'+Re.length+'" step="1"><span></span>',Vt.querySelector("input").oninput=x=>En(+x.target.value),c.appendChild(Vt));let ke=new di(30,1,.01,20),Ue=new Ld(ke,u.domElement);Ue.enableDamping=!0,Ue.dampingFactor=.12,Ue.screenSpacePanning=!0,Ue.enableZoom=!1,Ue.enablePan=!1,Ue.mouseButtons={LEFT:$m.ROTATE,MIDDLE:null,RIGHT:null};let He=new ot,H=0;function Je(){ns&&(ke.setViewOffset(ns,I,-He.x,-He.y+H,ns,I),ke.updateProjectionMatrix())}let We=u.domElement;We.addEventListener("contextmenu",x=>{x.preventDefault(),x.stopImmediatePropagation()},!0),s.addEventListener("contextmenu",x=>{x.target===We&&(x.preventDefault(),x.stopPropagation())},!0);let wt=null;We.addEventListener("pointerdown",x=>{(x.button===2||x.button===1||x.button===0&&x.shiftKey)&&(x.preventDefault(),x.stopImmediatePropagation(),wt={x:x.clientX,y:x.clientY,x0:x.clientX,y0:x.clientY,b:x.button},We.setPointerCapture(x.pointerId),qr(),Rt=null)},!0),We.addEventListener("pointermove",x=>{if(!wt)return;let S=We.getBoundingClientRect(),b=ns/S.width;He.x+=(x.clientX-wt.x)*b,He.y+=(x.clientY-wt.y)*b,wt.x=x.clientX,wt.y=x.clientY,Je(),So(),ne||ii()}),We.addEventListener("pointerup",x=>{wt&&wt.b===2&&Math.hypot(x.clientX-wt.x0,x.clientY-wt.y0)<5&&wu(x.clientX,x.clientY),wt=null}),We.addEventListener("pointercancel",()=>{wt=null});function zt(x,S,b){let L=ke.position.clone().sub(Ue.target),Y=L.length(),ee=Math.max(li?.15:.04,Math.min(li?14:3,Y*b)),V=ee/Y,we=We.getBoundingClientRect(),W=(x-we.left)/we.width*2-1,F=-(S-we.top)/we.height*2+1;Qt.setFromCamera(new ot(W,F),ke),Qt.far=1/0;let $=Qt.intersectObjects(N.filter($e=>$e.mesh.visible&&$e.mesh.material.opacity>.3).map($e=>$e.mesh),!1)[0],Ee=$?$.point.clone():Ue.target.clone(),Oe=Ee.clone().project(ke);ke.position.copy(Ue.target).addScaledVector(L,V),ke.updateMatrixWorld(),Je();let je=Ee.clone().project(ke);He.x+=(Oe.x-je.x)/2*ns,He.y-=(Oe.y-je.y)/2*I,Je(),Ue.update(),So(),ne||ii()}We.addEventListener("wheel",x=>{x.preventDefault(),x.stopPropagation();let S=x.deltaY*(x.deltaMode===1?33:x.deltaMode===2?400:1);x.ctrlKey&&(S*=3),zt(x.clientX,x.clientY,Math.exp(Math.max(-.6,Math.min(.6,S*.0035))))},{passive:!1});let ln=new Map,_n=null,Jn=0,ci=!1,In=0,bi=0;We.addEventListener("touchstart",x=>{x.touches.length===1&&(ci=!1,In=x.touches[0].clientX,bi=x.touches[0].clientY),x.touches.length>1&&x.cancelable&&x.preventDefault()},{passive:!1}),We.addEventListener("touchmove",x=>{let S=x.touches[0];S&&(Math.abs(S.clientX-In)>6||Math.abs(S.clientY-bi)>6)&&(ci=!0),x.cancelable&&x.preventDefault()},{passive:!1}),We.addEventListener("touchend",x=>{if(ci||x.touches.length){x.stopPropagation(),x.cancelable&&x.preventDefault();return}if(be==="find"&&!ne){let S=x.changedTouches[0],b=We.getBoundingClientRect();Qt.setFromCamera(new ot((S.clientX-b.left)/b.width*2-1,-(S.clientY-b.top)/b.height*2+1),ke),Qt.far=1/0,Qt.intersectObjects(N.filter(L=>L.mesh.visible&&L.mesh.material.opacity>.3).map(L=>L.mesh),!1).length&&(x.stopPropagation(),x.cancelable&&x.preventDefault())}},{passive:!1}),We.addEventListener("pointerdown",x=>{if(x.pointerType==="touch"){if(ln.set(x.pointerId,[x.clientX,x.clientY]),clearTimeout(Jn),ln.size===1){let S=x.clientX,b=x.clientY;Jn=setTimeout(()=>{let L=ln.get(x.pointerId);L&&ln.size===1&&Math.hypot(L[0]-S,L[1]-b)<8&&(Ue.drag=null,Ue.spin=null,wu(S,b))},550)}if(ln.size===2){Ue.drag=null,Ue.multi=!0,qr();let[S,b]=[...ln.values()];_n={d:Math.hypot(S[0]-b[0],S[1]-b[1]),m:[(S[0]+b[0])/2,(S[1]+b[1])/2],ang:Math.atan2(b[1]-S[1],b[0]-S[0])}}}},!0),We.addEventListener("pointermove",x=>{if(x.pointerType!=="touch"||!ln.has(x.pointerId)||(ln.set(x.pointerId,[x.clientX,x.clientY]),ln.size!==2||!_n))return;x.stopImmediatePropagation();let[S,b]=[...ln.values()],L=Math.hypot(S[0]-b[0],S[1]-b[1]),Y=[(S[0]+b[0])/2,(S[1]+b[1])/2],ee=We.getBoundingClientRect(),V=ns/ee.width;He.x+=(Y[0]-_n.m[0])*V,He.y+=(Y[1]-_n.m[1])*V,Je(),L>10&&_n.d>10&&zt(Y[0],Y[1],_n.d/L);let we=Math.atan2(b[1]-S[1],b[0]-S[0]),W=we-_n.ang;for(;W>Math.PI;)W-=2*Math.PI;for(;W<-Math.PI;)W+=2*Math.PI;_n={d:L,m:Y,ang:we},So()},!0);let ts=x=>{x.pointerType==="touch"&&(ln.delete(x.pointerId),clearTimeout(Jn),ln.size<2&&(_n=null,ln.size||(Ue.multi=!1)))};We.addEventListener("pointerup",ts,!0),We.addEventListener("pointercancel",ts,!0);let lr=(ie.isEmpty()?Ne:ie).getCenter(new T);(be==="find"||be==="peel")&&Ne.getCenter(lr);let zs=be==="find"||be==="peel"||ie.isEmpty()?Ne:ie,ur=zs.getSize(new T),ks=ox(e.cam,ce),li=!1,Mi=null,Vr=!1;function Mu(){if(window.matchMedia&&(matchMedia("(hover: none)").matches||matchMedia("(max-width: 720px)").matches)){c.style.height="";return}let x=document.getElementById("jk-sc")||document.scrollingElement||document.documentElement,S=c.getBoundingClientRect(),b=S.height/Math.max(1,c.offsetHeight)||1,L=s.closest(".jka-split"),Y=L&&L.querySelector(".jka-right"),ee=Y&&getComputedStyle(L).display==="block",V=0;if(ee){Y.style.height="auto",Y.style.maxHeight="none",c.style.height="";return}let we=(window.innerHeight||x.clientHeight)-Math.max(0,S.top)-V-8;if(we<200)return;let W=Math.floor(we/b)+"px";Math.abs((parseFloat(c.style.height)||0)-parseFloat(W))>4&&(c.style.height=W),Y&&!ee&&(Y.style.height=W,Y.style.maxHeight=W)}function Hs(){Mu();try{let S=c.querySelector(":scope > .jka-chips");if(S&&!(window.matchMedia&&(matchMedia("(hover: none)").matches||matchMedia("(max-width: 720px)").matches))){let b=c.getBoundingClientRect(),L=b.height/Math.max(1,c.offsetHeight)||1;S.style.setProperty("top",Math.round((innerHeight/2-b.top)/L)+"px","important")}}catch{}let x=li?-10:Math.max(0,c.getBoundingClientRect().left);c.querySelectorAll(":scope > .jka-views, :scope > .jka-chips").forEach(S=>{S.style.marginLeft=-x+"px"})}window.addEventListener("resize",()=>Hs());let ns=600,I=400;function K(){let x=u.domElement.parentElement||c,S=x.clientWidth||600,b=(x.clientHeight||400)-(li&&x===c?48:0);ns=S,I=b,u.setSize(S,b,!1),ke.aspect=S/b,ke.updateProjectionMatrix(),Je(),Hs(),p.setAttribute("viewBox","0 0 "+S+" "+b)}K();let he=Math.abs(ks.x)>Math.abs(ks.z)?ur.z:ur.x,pe=.09,le=.2,dt=1-pe-le-.03,Ct=Math.max(.22,Math.max(ur.y,he/ke.aspect)/dt+.02),Gt=Math.tan(lo.degToRad(15)),Yt=Math.min(2.5,Math.max(.15,Ct/2/Gt+he/2)),un=2*(Yt-he/2)*Gt;H=(le-pe)/2*I*(1-Math.abs(ks.y)),Je(),Ue.target.copy(lr),ke.position.copy(lr).addScaledVector(ks,Yt),ke.up.copy(rx(ks)),ke.lookAt(lr);let $t=e.mode+"|"+e.name+"|"+e.meshes+"|"+(e.peel||[]).join("/"),Wt=window.__jkaCam,Rt=null;if(ne&&Wt&&Wt.key===$t){Rt={p0:Wt.pos.clone(),t0:Ue.target.clone(),p1:ke.position.clone(),t1:Ue.target.clone(),s:0,q0:(Wt.pan||new ot).clone(),q1:new ot},ke.position.copy(Wt.pos).sub(Wt.target).add(Ue.target),Rt.p0.copy(ke.position),Wt.pan&&(He.copy(Wt.pan),Je()),["pointerdown","wheel"].forEach(x=>u.domElement.addEventListener(x,()=>{Rt=null},!0));try{ke.updateMatrixWorld(),ke.updateProjectionMatrix();let x=new Ar().setFromProjectionMatrix(new Et().multiplyMatrices(ke.projectionMatrix,ke.matrixWorldInverse)),S=new nc,b=N.filter(W=>W.mesh.visible).map(W=>W.mesh),L=new Set(B.map(W=>W.mesh)),Y=0,ee=0,V=new T,we=at&&Xt.length?Xt.filter((W,F)=>F%Math.max(1,Math.floor(Xt.length/16))===0):[];we.length||B.forEach(W=>{let F=W.mesh.geometry.attributes.position,$=Math.max(1,Math.floor(F.count/12));for(let Ee=0;Ee<F.count;Ee+=$)we.push(V.fromBufferAttribute(F,Ee).applyMatrix4(W.mesh.matrixWorld).clone())}),we.forEach(W=>{if(Y++,!x.containsPoint(W))return;let F=W.clone().sub(ke.position),$=F.length();S.set(ke.position,F.normalize()),S.far=$+.002;let Ee=S.intersectObjects(b,!1)[0];(!Ee||L.has(Ee.object)||Ee.distance>$-.004)&&ee++}),Y&&ee/Y>=.35&&(Rt.p1=Rt.p0.clone(),Rt.keep=!0)}catch{}}let ii=()=>{window.__jkaCam={key:$t,pos:ke.position.clone(),target:Ue.target.clone(),pan:He.clone()}};Ue.minDistance=.05,Ue.maxDistance=3,Ue.update();let Qt=new nc,Yi=[];qt.forEach(x=>{let S=x.mesh.geometry.attributes.position,b=Math.max(1,Math.floor(S.count/24));for(let L=0;L<S.count;L+=b)Yi.push(new T().fromBufferAttribute(S,L).applyMatrix4(x.mesh.matrixWorld))});let Ln=new Set,hn=!1;function xo(){if(!hn||!Yi.length||Ye)return;let x=new Set,S=N.filter(b=>b.mesh.visible&&!qt.includes(b)&&!b._glass&&(b.layer==="muscle"||b.layer==="vessel")).map(b=>b.mesh);for(let b of Yi){let L=b.clone().sub(ke.position),Y=L.length();Qt.set(ke.position,L.normalize()),Qt.far=Y-.002;for(let ee of Qt.intersectObjects(S,!1))x.add(ee.object)}N.forEach(b=>{x.has(b.mesh)!==Ln.has(b)&&(Vn=!0),x.has(b.mesh)&&!Ln.has(b)?(Ln.add(b),b._a=b.mesh.material.opacity,ft(b,.18)):!x.has(b.mesh)&&Ln.has(b)&&(Ln.delete(b),ft(b,b._a==null?1:b._a))})}let Cn=document.createElement("div");Cn.className="jka-labels",c.appendChild(Cn);let ji=[],As={side:{},tg:{},pos:{}},Zi=6,yo=90,ui=2*Math.sqrt(90),Vs=500;function va(x){x.pts||(x.pts=[],x.parts.forEach(b=>St(b.mesh,L=>x.pts.push(L.clone()))));let S=Math.max(1,Math.floor(x.pts.length/48));return x.pts.filter((b,L)=>L%S===0)}function zi(x){let S=x.reduce((Y,ee)=>Y.add(ee),new T).multiplyScalar(1/Math.max(1,x.length)),b=x[0],L=1e9;return x.forEach(Y=>{let ee=Y.distanceToSquared(S);ee<L&&(L=ee,b=Y)}),b||S}function Gr(){Cn.innerHTML="",p.innerHTML="",ji=et.map(x=>{let S=document.createElement("div");S.className="jka-label "+(x.cls||""),S.textContent=x.text,Cn.appendChild(S);let b=va(x),L=zi(b);return{L:x,k:x.text,el:S,S:b,aT:L,a:L.clone(),hid:!1,w:0,h:0}}),dr=!0;try{document.fonts&&document.fonts.ready.then(()=>{ji.forEach(x=>{x.w=0}),ba=!0})}catch{}}let Gs=160,ys=100,vc=null,hr=null,ax=new Wi({color:16777215});function cx(){ys=Math.max(40,Math.round(Gs*I/Math.max(1,ns))),(!hr||hr.height!==ys)&&(hr&&hr.dispose(),hr=new ds(Gs,ys),g.push(hr),vc=new Uint8Array(Gs*ys*4));let x=N.filter(b=>b.mesh.visible&&b.mesh.material.opacity<.5);x.forEach(b=>{b.mesh.visible=!1});let S=O.background;O.overrideMaterial=ax,u.setRenderTarget(hr),u.setClearColor(0,0),u.clear(),u.render(O,ke),u.readRenderTargetPixels(hr,0,0,Gs,ys,vc),u.setRenderTarget(null),O.overrideMaterial=null,O.background=S,x.forEach(b=>{b.mesh.visible=!0})}let Nd=(x,S)=>{if(!vc)return!1;let b=Math.floor(x/ns*Gs),L=ys-1-Math.floor(S/I*ys);return b>=0&&L>=0&&b<Gs&&L<ys&&vc[(L*Gs+b)*4+3]>0};function lx(){let x=N.filter(S=>S.mesh.visible&&S.mesh.material.opacity>=.5).map(S=>S.mesh);ji.forEach(S=>{let b=new Set((S.L.parts||[]).map(V=>V.mesh)),L=[];S.S.forEach(V=>{let we=V.clone().sub(ke.position),W=we.length();Qt.set(ke.position,we.normalize()),Qt.far=W-.002,Qt.intersectObjects(x,!1).find($=>!b.has($.object))||L.push(V)});let Y=!L.length,ee=S.aT;if(!S.L.parts||Y)ee=S.aT;else{let V=zi(L),we=S.S.length>1?S.S[0].distanceTo(S.S[S.S.length-1]):.05;(!L.includes(S.aT)||S.aT.distanceTo(V)>.3*Math.max(.02,we))&&(ee=V)}(Y!==S.hid||ee!==S.aT)&&(S.hid=Y,S.aT=ee,ba=!0)}),cx(),ba=!0,ji.forEach(S=>{S.w=0})}function ux(x,S,b,L){let ee=0;for(let V=1;V<=40;V++){let we=V/40;if(Nd(x+(b-x)*we,S+(L-S)*we)){let W=ee,F=we;for(let $=0;$<6;$++){let Ee=(W+F)/2;Nd(x+(b-x)*Ee,S+(L-S)*Ee)?F=Ee:W=Ee}return[x+(b-x)*F,S+(L-S)*F]}ee=we}return[b,L]}let Dd=[];for(let x=0;x<8;x++)Dd.push(new T(x&1?zs.max.x:zs.min.x,x&2?zs.max.y:zs.min.y,x&4?zs.max.z:zs.min.z));let Su=0,ba=!0,Ma=null,Ud=0;function hx(){let x=performance.now();if(Ma&&x-Ud<1e3)return Ma;let S=c.getBoundingClientRect(),b=ns/Math.max(1,S.width),L=I/Math.max(1,S.height);return Ma=[".jka-views",".jka-chips",".jka-zoom",".jka-peel",".jka-ct",".jka-refl"].map(Y=>c.querySelector(Y)).filter(Boolean).map(Y=>{let ee=Y.getBoundingClientRect();if(Y.classList.contains("jka-views")){let we=[...Y.children].map(W=>W.getBoundingClientRect()).filter(W=>W.width);we.length&&(ee={left:Math.min(...we.map(W=>W.left)),top:Math.min(...we.map(W=>W.top)),right:Math.max(...we.map(W=>W.right)),bottom:Math.max(...we.map(W=>W.bottom))})}let V={l:(ee.left-S.left)*b,t:(ee.top-S.top)*L,r:(ee.right-S.left)*b,b:(ee.bottom-S.top)*L};return V.top=(V.t+V.b)/2<I/2,V}).filter(Y=>Y.r>Y.l),Ud=x,Ma}function Fd(x){let S=Su?Math.min(64,x-Su):16;Su=x;let b=ns,L=I,Y=!1,ee=1e9,V=-1e9,we=1e9,W=-1e9;Dd.forEach(q=>{let z=q.clone().project(ke),k=(z.x+1)/2*b,me=(1-z.y)/2*L;ee=Math.min(ee,k),V=Math.max(V,k),we=Math.min(we,me),W=Math.max(W,me)});let F={cx:Math.max(60,Math.min(b-60,(ee+V)/2)),cy:L/2,rx:Math.min(b*.3,Math.max(40,(V-ee)/2))},$=[[],[]],Ee=1-Math.exp(-S/1e3*9);ji.forEach(q=>{q.a.distanceToSquared(q.aT)>1e-10&&(q.a.lerp(q.aT,Ee),Y=!0);let z=q.a.clone().project(ke);q.x=(z.x+1)/2*b,q.y=(1-z.y)/2*L,q.w||(q.w=q.el.offsetWidth,q.h=q.el.offsetHeight);let k=q.x-F.cx,me=As.side[q.k];q.s=me!=null&&Math.abs(k)<F.rx*.4?me:k<0?0:1,q.c=Math.abs(k),q.on=!0,$[q.s].push(q)});let Oe=q=>q.reduce((z,k)=>z+k.h+Zi,0)<=L-8,je=(q,z)=>{for(;!Oe($[q]);){let k=$[q].slice().sort((me,Q)=>me.c-Q.c)[0];if(!k)break;$[q].splice($[q].indexOf(k),1),$[z].push(k),Oe($[z])?k.s=z:($[z].pop(),k.on=!1)}};je(0,1),je(1,0);let $e=1-Math.exp(-S/1e3*2.5);$.forEach((q,z)=>{q.forEach(Q=>{As.side[Q.k]=z}),q.sort((Q,_e)=>Q.y-_e.y),q.forEach(Q=>{let _e=Q.y-Q.h/2,Ze=As.tg[Q.k];!Ze||Ze.s!==z?Ze=As.tg[Q.k]={y:_e,x:null,s:z}:Ze.y+=(_e-Ze.y)*$e,Math.abs(_e-Ze.y)>.5&&(Y=!0),Q.ly=Ze.y});let k;for(k=1;k<q.length;k++)q[k].ly=Math.max(q[k].ly,q[k-1].ly+q[k-1].h+Zi);for(k=q.length-1;k>=0;k--)q[k].ly=Math.min(q[k].ly,(k===q.length-1?L-4:q[k+1].ly-Zi)-q[k].h);for(k=0;k<q.length;k++)q[k].ly=Math.max(q[k].ly,k?q[k-1].ly+q[k-1].h+Zi:4);q.forEach(Q=>{let _e=z?F.cx+F.rx+36:F.cx-F.rx-36-Q.w,Ze=As.tg[Q.k];Ze.x=Ze.x==null?_e:Ze.x+(_e-Ze.x)*$e,Math.abs(_e-Ze.x)>.5&&(Y=!0);let ht=z?Math.max(Ze.x,_e):Math.min(Ze.x,_e);Q.lx=Math.max(4,Math.min(b-Q.w-4,ht))});let me=hx();if(me.length){let Q=(_e,Ze)=>_e.lx<Ze.r+6&&_e.lx+_e.w>Ze.l-6&&_e.ly<Ze.b+4&&_e.ly+_e.h>Ze.t-4;for(k=0;k<q.length;k++)me.forEach(_e=>{_e.top&&Q(q[k],_e)&&(q[k].ly=_e.b+Zi)});for(k=1;k<q.length;k++)q[k].ly=Math.max(q[k].ly,q[k-1].ly+q[k-1].h+Zi);for(k=q.length-1;k>=0;k--)me.forEach(_e=>{!_e.top&&Q(q[k],_e)&&(q[k].ly=_e.t-Zi-q[k].h)});for(k=q.length-2;k>=0;k--)q[k].ly=Math.min(q[k].ly,q[k+1].ly-Zi-q[k].h)}});let pt="";return ji.forEach(q=>{if(!q.on){q.el.style.opacity=0;return}q.el.style.opacity="";let z=As.pos[q.k];if(!z)z=As.pos[q.k]={x:q.lx,y:q.ly,vx:0,vy:0};else{let lt=S/1e3,fn=Math.max(1,Math.ceil(lt/.008)),Pt=lt/fn;for(let mt=0;mt<fn;mt++){z.vx+=(yo*(q.lx-z.x)-ui*z.vx)*Pt,z.vy+=(yo*(q.ly-z.y)-ui*z.vy)*Pt;let Ce=Math.max(Vs,Math.hypot(q.lx-z.x,q.ly-z.y)*3),re=Math.hypot(z.vx,z.vy);re>Ce&&(z.vx*=Ce/re,z.vy*=Ce/re),z.x+=z.vx*Pt,z.y+=z.vy*Pt}Math.hypot(q.lx-z.x,q.ly-z.y)<.3&&Math.hypot(z.vx,z.vy)<4?(z.x=q.lx,z.y=q.ly,z.vx=z.vy=0):Y=!0}q.el.style.transform="translate("+z.x.toFixed(1)+"px,"+z.y.toFixed(1)+"px)";let k=q.s===1,me=k?z.x-3:z.x+q.w+3,Q=z.y+q.h/2,_e=me+(k?-12:12),Ze=me.toFixed(1)+","+Q.toFixed(1)+" "+_e.toFixed(1)+","+Q.toFixed(1)+" ",ht=q.L.cls||"";if(q.hid){let lt=ux(_e,Q,q.x,q.y);pt+='<polyline class="'+ht+'" points="'+Ze+lt[0].toFixed(1)+","+lt[1].toFixed(1)+'"/><polyline class="'+ht+' behind" points="'+lt[0].toFixed(1)+","+lt[1].toFixed(1)+" "+q.x.toFixed(1)+","+q.y.toFixed(1)+'"/>'}else pt+='<polyline class="'+ht+'" points="'+Ze+q.x.toFixed(1)+","+q.y.toFixed(1)+'"/>'}),p.innerHTML=pt,ba=!1,Y}let fr=document.createElement("div");fr.className="jka-status",c.appendChild(fr);try{window.__jkaDbg={LM:at,lmPts:Xt,cam:ke,el:u.domElement}}catch{}if(be==="find"&&!ne){let x=null;u.domElement.addEventListener("pointerdown",S=>{x=[S.clientX,S.clientY]}),u.domElement.addEventListener("pointerup",S=>{if(!x||Math.hypot(S.clientX-x[0],S.clientY-x[1])>5)return;let b=u.domElement.getBoundingClientRect();Qt.setFromCamera(new ot((S.clientX-b.left)/b.width*2-1,-(S.clientY-b.top)/b.height*2+1),ke),Qt.far=1/0;let L=Qt.intersectObjects(N.filter(F=>F.mesh.visible&&F.mesh.material.opacity>.5).map(F=>F.mesh),!1),Y=L[0];if(at&&Y){let F=L.find($=>B.some(Ee=>Ee.mesh===$.object));F&&F.distance-Y.distance<.04&&(Y=F)}let ee=at&&Xt.some(F=>Qt.ray.distanceSqToPoint(F)<.009*.009);if(!Y&&!ee)return;Y||(Y={object:B[0].mesh,point:at.clone(),distance:0});let V=N.find(F=>F.mesh===Y.object),we=at?B.includes(V)&&Y.point.distanceTo(at)<.014||Xt.some(F=>Qt.ray.distanceSqToPoint(F)<.009*.009):B.includes(V);(window.__jkaFind=window.__jkaFind||[]).push({name:V.name,ok:we}),we?(wn.forEach(F=>{F.visible=!0,F.material.color.setHex(bu)}),at&&Be?Be.material.color.setHex(bu):B.forEach(F=>Ie(F,bu,667672)),fr.className="jka-status ok",fr.textContent="\u2713 "+e.name):(Ie(V,$E,4194304),fr.className="jka-status bad",fr.textContent=at?"\u2717 Not quite \u2014 that is on the "+V.name:"\u2717 That is "+V.name,setTimeout(()=>Ie(V,V.mesh.userData.base),1100)),Vn=!0}),window.__jkaFind=[]}else if(be==="find"&&ne){let x=window.__jkaFind||[];if(x.length){let S=x.some(b=>b.ok);fr.className="jka-status "+(S?"ok":"bad"),fr.textContent=S?"\u2713 Found it"+(x.length>1?" (try "+(x.findIndex(b=>b.ok)+1)+")":""):"\u2717 Clicked: "+x.map(b=>b.name).slice(-3).join(", ")}}let _o=document.createElement("div");_o.className="jka-refl",c.appendChild(_o);let vo=new Set,Bd=e.mode+"|"+e.name;function Eu(){if(!vo.size){_o.style.display="none";return}_o.style.display="";let x=[...new Set([...vo].map(b=>b.name.replace(/ muscle$/,"")))].reverse();_o.innerHTML="<span>Reflected: "+x.slice(0,3).join(", ")+(x.length>3?" +"+(x.length-3):"")+"</span>";let S=document.createElement("button");S.className="jka-reflb",S.textContent="Restore",S.addEventListener("pointerdown",b=>b.stopPropagation()),S.onclick=b=>{b.stopPropagation(),vo.forEach(L=>{L.mesh.visible=C(L)}),vo.clear(),Od(),Eu(),dr=!0,Vn=!0},_o.appendChild(S)}function Od(){ne||(window.__jkaRefl={key:Bd,names:[...vo].map(x=>x.name)})}function bc(x){N.filter(S=>S.name===x.name).forEach(S=>{S.mesh.visible=!1,vo.add(S)}),Od(),Eu(),dr=!0,Vn=!0}let Tu=0,Sa=[];function fx(x,S){let b=u.domElement.getBoundingClientRect(),L=(W,F)=>(Qt.setFromCamera(new ot((x+W-b.left)/b.width*2-1,-(S+F-b.top)/b.height*2+1),ke),Qt.far=1/0,Qt.intersectObjects(N.filter($=>$.mesh.visible&&$.mesh.material.opacity>.05).map($=>$.mesh),!1)),Y=L(0,0),ee=null,V=W=>N.find(F=>F.mesh===W.object);if(be==="nerve")for(let[W,F]of[[0,0],[4,0],[-4,0],[0,4],[0,-4],[6,6],[-6,-6],[6,-6],[-6,6]]){let $=L(W,F).map(V).find(Ee=>Ee&&Ee.layer==="nerve");if($){ee=$;break}}if(!ee&&Y.length&&(ee=V(Y[0])),!ee){Sa.length=0,zd();return}let we=Sa.findIndex(W=>W.name===ee.name);we>=0?Sa.splice(we,1):Sa.push(ee),zd()}function zd(){for(let x=et.length-1;x>=0;x--)et[x].cls&&et[x].cls.indexOf("pick")>=0&&et.splice(x,1);Sa.forEach(x=>et.push({text:x.name.replace(/ muscle$/,""),parts:N.filter(S=>S.name===x.name),cls:"minor pick"})),Gr(),Vn=!0}function wu(x,S){let b=u.domElement.getBoundingClientRect();Qt.setFromCamera(new ot((x-b.left)/b.width*2-1,-(S-b.top)/b.height*2+1),ke),Qt.far=1/0;let L=Qt.intersectObjects(N.filter(ee=>ee.mesh.visible&&ee.mesh.material.opacity>.05).map(ee=>ee.mesh),!1),Y=be==="find"&&!ne;for(let ee of L){let V=N.find(we=>we.mesh===ee.object);if(V&&(Y||!B.includes(V))){bc(V);return}}}{let x=null,S=0,b=[0,0];u.domElement.addEventListener("pointerdown",L=>{x=L.pointerType==="touch"?null:[L.clientX,L.clientY,L.button]},!0),u.domElement.addEventListener("pointerup",L=>{if(!x)return;let Y=Math.hypot(L.clientX-x[0],L.clientY-x[1])<5,ee=x[2];if(x=null,!Y||ee!==0)return;let V=performance.now();if(V-S<380&&Math.hypot(L.clientX-b[0],L.clientY-b[1])<10){S=0,clearTimeout(Tu),wu(L.clientX,L.clientY);return}if(S=V,b=[L.clientX,L.clientY],ne&&!(be==="find"&&!ne)){let we=L.clientX,W=L.clientY;clearTimeout(Tu),Tu=setTimeout(()=>fx(we,W),390)}},!0)}function dx(){if(yc(e.reflect).forEach(b=>{let L=b.startsWith("~"),Y=L?b.slice(1).trim():b;Z(Y).forEach(ee=>{B.includes(ee)||(L?(ft(ee,.22),ee._a=.22,ee._glass=!0):bc(ee))})}),!B.length||be==="find"&&!ne||be==="peel")return;let x=new Map,S=0;Yi.forEach(b=>{let L=b.clone().sub(ke.position),Y=L.length();Qt.set(ke.position,L.normalize()),Qt.far=Y-.002;let ee=Qt.intersectObjects(N.filter(V=>V.mesh.visible&&!B.includes(V)&&!V._glass&&V.layer==="muscle").map(V=>V.mesh),!1)[0];if(S++,ee){let V=N.find(we=>we.mesh===ee.object);x.set(V,(x.get(V)||0)+1)}}),x.forEach((b,L)=>{b/Math.max(1,S)>.35&&bc(L)})}ne&&window.__jkaRefl&&window.__jkaRefl.key===Bd?setTimeout(()=>window.__jkaRefl.names.forEach(x=>{let S=N.find(b=>b.name===x);S&&bc(S)}),0):setTimeout(dx,30),Eu();{let x=0;try{x=+(localStorage.getItem("jka-tip-refl")||0)}catch{}if(x<1){try{localStorage.setItem("jka-tip-refl",String(x+1))}catch{}let S=document.createElement("div");S.className="jka-tip",S.textContent=window.matchMedia&&matchMedia("(hover: none)").matches?"Long-press a structure to reflect it":"Right-click or double-click a structure to reflect it",c.appendChild(S),setTimeout(()=>S.classList.add("on"),600),setTimeout(()=>{S.classList.remove("on"),setTimeout(()=>S.remove(),600)},6500)}}let Au=document.createElement("div");Au.className="jka-zoom"+(Vt?" jka-zoom-up":""),[["+",.75],["\u2212",1/.75]].forEach(([x,S])=>{let b=document.createElement("button");b.className="jka-zb",b.textContent=x,b.addEventListener("pointerdown",L=>L.stopPropagation()),b.addEventListener("click",L=>{L.stopPropagation(),kd(S)}),Au.appendChild(b)});function kd(x){if(Ci){Ci.zoom(x);return}qr();let S=ke.position.clone().sub(Ue.target),b=S.length(),L=Math.max(li?.15:.04,Math.min(li?14:3,b*x));Rt={p0:ke.position.clone(),t0:Ue.target.clone(),p1:Ue.target.clone().addScaledVector(S,L/b),t1:Ue.target.clone(),s:0,u1:ke.up.clone()}}c.appendChild(Au);let Ea=document.createElement("div");Ea.className="jka-chips";{[["bone","Bone"],["muscle","Muscle"],["ligament","Lig."],["nerve","Nerve"],["vessel","Artery"],["vein","Vein"]].forEach(([Y,ee])=>{let V=document.createElement("button"),we=()=>N.some(W=>W.layer===Y&&W.mesh.visible);V.textContent=ee,V.dataset.l=Y,V.className=we()?"jka-b on":"jka-b",V.onclick=()=>{if(Y==="ligament"){let F=we(),$=N.some(je=>je.layer==="capsule"&&je.mesh.visible),Ee=F?!$:!0,Oe=F&&!$;N.forEach(je=>{C(je)&&(je.layer==="ligament"&&(je.mesh.visible=Ee),je.layer==="capsule"&&(je.mesh.visible=Oe))}),V.textContent=Oe?"Lig. + capsule":"Lig.",V.className=Ee?"jka-b on":"jka-b",Vn=!0;return}let W=!we();N.forEach(F=>{F.layer===Y&&C(F)&&(F.mesh.visible=W)}),V.className=W?"jka-b on":"jka-b",Vn=!0},Ea.appendChild(V)});let x=document.createElement("button");x.textContent="CT",x.dataset.l="ct",x.className="jka-b";let S=!1;try{S=localStorage.getItem("jka-ct")==="1"}catch{}x.onclick=()=>{Mc(!Ru)},Ea.appendChild(x),S&&setTimeout(()=>Mc(!0),0);let b=document.createElement("button");b.textContent="X-ray",b.dataset.l="xray",b.className="jka-b";let L=!1;try{L=localStorage.getItem("jka-rad")==="1"}catch{}b.onclick=()=>Cu(!li),Ea.appendChild(b),Vr=!!(L||e.xray),Vr&&(ne&&window.__jkaWasRad&&c.classList.add("jka-nofade"),Promise.resolve().then(()=>Cu(!0,!!e.xray,!0)))}let Ci=null,Ru=!1,Ta=null;function Mc(x){x&&li&&Cu(!1),Ru=x,c.classList.toggle("jka-ctmode",x),s.classList.remove("jka-ctpre"),c.querySelectorAll("button[data-l=ct]").forEach(U=>{U.className=x?"jka-b on":"jka-b"});try{localStorage.setItem("jka-ct",x?"1":"0")}catch{}if(!x){Ci&&(Ci.ro.disconnect(),Ci.box.remove(),Ci.onEsc&&document.removeEventListener("keydown",Ci.onEsc,!0),Ci.mini&&(Ta&&(ke.zoom=1,He.copy(Ta.pan),H=Ta.by,Ta=null,Je()),c.insertBefore(u.domElement,c.firstChild),Ci.mini.remove(),Object.values(Ci.marks||{}).forEach(U=>O.remove(U)),K()),Cn.style.display="",p.style.display="",u.domElement.style.visibility="",Ci=null),Vn=!0;return}if(Ci)return;let S={bone:"#ededed",muscle:"#8a8a8a",nerve:"#747474",vessel:"#c6c6c6",vein:"#a4a4a4",ligament:"#b9b4a2",capsule:"#9a968a",lung:"#2b2b2b",airway:"#070707",heart:"#868686",organ:"#8e8e8e"},b={capsule:.5,muscle:1,nerve:2,vessel:2,vein:2,ligament:2.5,bone:3},L=N.filter(U=>U.layer!=="capsule"||U.mesh.visible).sort((U,Me)=>(b[U.layer]||0)-(b[Me.layer]||0)).map(U=>{let Me=U.mesh.userData.coarse||U.mesh.geometry,Le=Me.attributes.position,Ve=Le.count,ct=new Float32Array(Ve*3),ze=new T;for(let gt=0;gt<Ve;gt++)ze.fromBufferAttribute(Le,gt).applyMatrix4(U.mesh.matrixWorld),ct[gt*3]=ze.x,ct[gt*3+1]=ze.y,ct[gt*3+2]=ze.z;return{p:U,W:ct,I:Me.index?Me.index.array:null,n:Ve,tgt:B.includes(U)}}).reduce((U,Me)=>{let Le=Me.p.name+"|"+Me.tgt,Ve=U.map.get(Le);if(Ve)Ve.items.push(Me),Ve.box=Ve.box.clone().union(Me.p.box);else{let ct={p:Me.p,tgt:Me.tgt,items:[Me],box:Me.p.box.clone()};U.map.set(Le,ct),U.list.push(ct)}return U},{map:new Map,list:[]}).list;L.slice().forEach(U=>{let Me=U.items,Le=new an(new T(-U.box.max.x,U.box.min.y,U.box.min.z),new T(-U.box.min.x,U.box.max.y,U.box.max.z));L.push({p:U.p,tgt:!1,mirror:!0,items:Me,box:Le})});let Y=e.ctPlanes||Cd.planes;Id(e.ctContext||n).then(U=>{if(v)return;U.updateMatrixWorld(!0);let Me=new Set(N.map(Le=>Le.name));U.traverse(Le=>{if(!Le.isMesh||Me.has(String((Le.userData||{}).n||Le.name).replace(/\.[lr]$/,"")))return;let Ve=Le.userData||{},ct=Le.geometry,ze=ct.attributes.position,gt=ze.count,it=new Float32Array(gt*3),rt=new T;for(let Ae=0;Ae<gt;Ae++)rt.fromBufferAttribute(ze,Ae).applyMatrix4(Le.matrixWorld),it[Ae*3]=rt.x,it[Ae*3+1]=rt.y,it[Ae*3+2]=rt.z;let vt={name:Ve.n||Le.name,layer:Ve.l||"organ",box:new an().setFromObject(Le)};L.push({p:vt,tgt:!1,context:!0,items:[{p:vt,W:it,I:ct.index?ct.index.array:null,n:gt}],box:vt.box})});try{Q(),me.forEach(Le=>{Le.baseKey=null}),Zt()}catch{}}).catch(()=>{});let V={axial:{n:[0,1,0],u:[1,0,0],v:[0,0,1],step:.003,name:"Axial"},coronal:{n:[0,0,1],u:[1,0,0],v:[0,1,0],step:.003,name:"Coronal"},sagittal:{n:[ce?1:-1,0,0],u:[0,0,-1],v:[0,1,0],step:.003,name:"Sagittal"}},we=null;function W(){let Me=document.createElement("canvas");Me.width=Me.height=256;let Le=Me.getContext("2d"),Ve=[];for(let it=0;Ve.length<85&&it<6e3;it++){let rt=[Math.random()*256,Math.random()*256,.7+Math.random()*.8];Ve.every(([vt,Ae])=>{let xt=Math.abs(rt[0]-vt),Se=Math.abs(rt[1]-Ae);return xt=Math.min(xt,256-xt),Se=Math.min(Se,256-Se),xt*xt+Se*Se>15*15})&&Ve.push(rt)}let ct=Le.createImageData(256,256);for(let it=0;it<256;it++)for(let rt=0;rt<256;rt++){let vt=1e9,Ae=1e9,xt=1;Ve.forEach(([Pe,_t,yt])=>{let kt=Math.abs(rt-Pe),bt=Math.abs(it-_t);kt=Math.min(kt,256-kt),bt=Math.min(bt,256-bt);let Ut=Math.sqrt(kt*kt+bt*bt);Ut<vt?(Ae=vt,vt=Ut,xt=yt):Ut<Ae&&(Ae=Ut)});let Se=(Ae-vt)/2,Ke=1.7*xt,Lt=Math.exp(-(Se*Se)/(2*Ke*Ke)),Mn=Math.round(88+Lt*80+(Math.random()-.5)*12),rn=(it*256+rt)*4;ct.data[rn]=ct.data[rn+1]=ct.data[rn+2]=Mn,ct.data[rn+3]=255}Le.putImageData(ct,0,0);let ze=document.createElement("canvas");ze.width=ze.height=256;let gt=ze.getContext("2d");gt.filter="blur(0.8px)";for(let it of[-256,0,256])for(let rt of[-256,0,256])gt.drawImage(Me,it,rt);return ze}let F=document.createElement("div");F.className="jka-ct";let $=document.createElement("div");$.className="jka-ct-h",$.innerHTML="CT <span>(simulated) \xB7 scroll a pane to move its slice \xB7 click to aim the others</span>",F.appendChild($),c.appendChild(F);let Ee=document.createElement("button");Ee.className="jka-ctoff",Ee.textContent="Disable CT",Ee.addEventListener("pointerdown",U=>U.stopPropagation()),Ee.onclick=U=>{U.stopPropagation(),Mc(!1)},F.appendChild(Ee),Cn.style.display="none",p.style.display="none";let Oe=null;ne?(Oe=document.createElement("div"),Oe.className="jka-mini",c.appendChild(Oe),Oe.appendChild(u.domElement),K(),Vn=!0,Ta={pan:He.clone(),by:H},He.set(0,0),H=0,ke.zoom=.4,Je()):u.domElement.style.visibility="hidden";let je=ie.isEmpty()?Ne:ie,$e=je.getCenter(new T),pt=Ne.clone();pt.min.y=Math.max(pt.min.y,st[0]),pt.max.y=Math.min(pt.max.y,st[1]);let q=Math.min(2,window.devicePixelRatio||1),z=U=>new T(...U),k={axial:"#ffd36b",coronal:"#7fd8ff",sagittal:"#ff8f8f"},me=["axial","coronal","sagittal"].map(U=>{let Me=document.createElement("div");Me.className="jka-ctp jka-ctp-"+U;let Le=document.createElement("canvas");Me.appendChild(Le);let Ve=document.createElement("button");Ve.className="jka-ctp-t",Ve.innerHTML=V[U].name+" <span>\u25BE</span>",Ve.style.color=k[U],Me.appendChild(Ve),Ve.addEventListener("pointerdown",it=>it.stopPropagation()),Ve.addEventListener("click",it=>{it.stopPropagation(),ue&&ye(Ve)});let ct=document.createElement("button");ct.className="jka-ctp-plus",ct.innerHTML='<svg viewBox="0 0 14 14" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11 L11 3"/><path d="M6.5 3 H11 V7.5"/><path d="M7.5 11 H3 V6.5"/></svg>',ct.addEventListener("pointerdown",it=>it.stopPropagation()),ct.addEventListener("click",it=>{it.stopPropagation(),Xe(U,!0)}),ct.style.color=k[U],Me.appendChild(ct),F.appendChild(Me);let ze=V[U],gt={k:U,el:Me,cv:Le,g2:Le.getContext("2d"),n:z(ze.n),u:z(ze.u),v:z(ze.v),d:z(ze.n).dot($e),half:U==="axial"?.1:.16,W:300,H:300,cu:0,cvv:0};return gt.cu=gt.u.dot($e),gt.cvv=gt.v.dot($e),gt});function Q(){let U=me.find(gt=>gt.k==="coronal");if(!U||U.manual)return;let Me=1e9,Le=-1e9,Ve=1e9,ct=-1e9;if(L.forEach(gt=>{let it=gt.box;for(let rt=0;rt<8;rt++){let vt=new T(rt&1?it.max.x:it.min.x,rt&2?it.max.y:it.min.y,rt&4?it.max.z:it.min.z),Ae=vt.dot(U.u),xt=vt.dot(U.v);Me=Math.min(Me,Ae),Le=Math.max(Le,Ae),Ve=Math.min(Ve,xt),ct=Math.max(ct,xt)}}),Le<=Me)return;let ze=(U.cv.height||U.H||1)/(U.cv.width||U.W||1);U.half=Math.max((ct-Ve)/2,(Le-Me)/2*ze)*1.04,U.cu=(Me+Le)/2,U.cvv=(Ve+ct)/2,U.baseKey=null}Q();let _e={};Oe&&me.forEach(U=>{let Me=new Rn(new oo(.34,.34),new Wi({color:k[U.k],transparent:!0,opacity:.25,side:Ti,depthWrite:!1}));Me.quaternion.setFromUnitVectors(new T(0,0,1),U.n),O.add(Me),_e[U.k]=Me});function Ze(U){let Me=1e9,Le=-1e9;for(let Ve=0;Ve<8;Ve++){let ct=U.dot(new T(Ve&1?pt.max.x:pt.min.x,Ve&2?pt.max.y:pt.min.y,Ve&4?pt.max.z:pt.min.z));Me=Math.min(Me,ct),Le=Math.max(Le,ct)}return[Me,Le]}function ht(){me.forEach(U=>{let Me=U.el.getBoundingClientRect();U.W=Me.width||300,U.H=Me.height||300,U.cv.width=Math.round(U.W*q),U.cv.height=Math.round(U.H*q)})}function lt(U){let{n:Me,u:Le,v:Ve,g2:ct,cv:ze}=U,[gt,it]=Ze(Me);U.d=Math.max(gt,Math.min(it,U.d));let rt=U.H/(2*U.half)*q,vt=U.d,Ae=Ke=>ze.width/2+(Ke-U.cu)*rt,xt=Ke=>ze.height/2-(Ke-U.cvv)*rt;U.toWorld=(Ke,Lt)=>$e.clone().addScaledVector(Le,U.cu+(Ke*q-ze.width/2)/rt-Le.dot($e)).addScaledVector(Ve,U.cvv-(Lt*q-ze.height/2)/rt-Ve.dot($e)).addScaledVector(Me,vt-Me.dot($e));let Se=vt.toFixed(5)+"|"+U.half+"|"+ze.width+"x"+ze.height+"|"+ve+"|"+U.cu.toFixed(5)+","+U.cvv.toFixed(5);if(U.baseKey!==Se&&(U.baseKey=Se,J(U,rt,vt,Ae,xt),U.k==="axial"&&!U.manual&&!U.fitted&&U.shapes&&U.shapes.length&&!U.fitting)){let Ke=1e9,Lt=-1e9,Mn=1e9,rn=-1e9;if(U.shapes.forEach(Pe=>Pe.loops.forEach(_t=>_t.forEach(yt=>{Ke=Math.min(Ke,yt[0]),Lt=Math.max(Lt,yt[0]),Mn=Math.min(Mn,yt[1]),rn=Math.max(rn,yt[1])}))),Lt>Ke){let Pe=(Lt-Ke)/rt+.03,_t=(rn-Mn)/rt+.03,yt=U.cu+((Ke+Lt)/2-ze.width/2)/rt,kt=U.cvv-((Mn+rn)/2-ze.height/2)/rt,bt=Math.max(_t/2,Pe/2*ze.height/ze.width)*1.08;if(Math.abs(bt-U.half)/U.half>.04||Math.abs(yt-U.cu)>.003||Math.abs(kt-U.cvv)>.003){U.half=bt,U.cu=yt,U.cvv=kt,U.fitting=!0,lt(U),U.fitting=!1,U.fitted=!0;return}U.fitted=!0}}ct.setTransform(1,0,0,1,0,0),ct.drawImage(U.base,0,0),De(U,Ae,xt),_e[U.k]&&(_e[U.k].position.copy($e.clone().addScaledVector(Me,vt-Me.dot($e))),Vn=!0)}let fn=.0042,Pt=26e-5,mt=(U,Me,Le)=>{let Ve=U*374761393+Me*668265263+Le*1274126177|0;return Ve=Math.imul(Ve^Ve>>>13,1274126177),((Ve^Ve>>>16)>>>0)/4294967296};function Ce(U,Me,Le,Ve){let ct=Math.floor(U),ze=Math.floor(Me),gt=Math.floor(Le),it=U-ct,rt=Me-ze,vt=Le-gt,Ae=it*it*(3-2*it),xt=rt*rt*(3-2*rt),Se=vt*vt*(3-2*vt),Ke=(Mn,rn,Pe)=>mt(Mn+Ve*101,rn+Ve*37,Pe+Ve*59),Lt=(Mn,rn,Pe)=>Mn+(rn-Mn)*Pe;return Lt(Lt(Lt(Ke(ct,ze,gt),Ke(ct+1,ze,gt),Ae),Lt(Ke(ct,ze+1,gt),Ke(ct+1,ze+1,gt),Ae),xt),Lt(Lt(Ke(ct,ze,gt+1),Ke(ct+1,ze,gt+1),Ae),Lt(Ke(ct,ze+1,gt+1),Ke(ct+1,ze+1,gt+1),Ae),xt),Se)}function re(U,Me,Le){let Ve=1/(fn*1.4),ct=fn*.45,ze=U+(Ce(U*Ve,Me*Ve,Le*Ve,1)-.5)*2*ct,gt=Me+(Ce(U*Ve,Me*Ve,Le*Ve,2)-.5)*2*ct,it=Le+(Ce(U*Ve,Me*Ve,Le*Ve,3)-.5)*2*ct,rt=Math.floor(ze/fn),vt=Math.floor(gt/fn),Ae=Math.floor(it/fn),xt=1e9,Se=1e9;for(let _t=-1;_t<=1;_t++)for(let yt=-1;yt<=1;yt++)for(let kt=-1;kt<=1;kt++){let bt=rt+_t,Ut=vt+yt,gn=Ae+kt,hi=(bt+mt(bt,Ut,gn))*fn,Pi=(Ut+mt(Ut,gn,bt+7))*fn,Dt=(gn+mt(gn,bt,Ut+13))*fn,dn=(hi-ze)*(hi-ze)+(Pi-gt)*(Pi-gt)+(Dt-it)*(Dt-it);dn<xt?(Se=xt,xt=dn):dn<Se&&(Se=dn)}let Ke=(Math.sqrt(Se)-Math.sqrt(xt))/2,Lt=1/(fn*2.2),Mn=Ce(U*Lt,Me*Lt,Le*Lt,4),rn=Pt*(.45+1.25*Mn),Pe=.55+.45*Math.min(1,Ce(U*Lt*1.7,Me*Lt*1.7,Le*Lt*1.7,5)*1.8);return Math.exp(-(Ke*Ke)/(2*rn*rn))*Pe}function ge(U,Me,Le,Ve,ct,ze){let it=Math.ceil(ct*.5),rt=Math.ceil(ze*.5),vt=document.createElement("canvas");vt.width=it,vt.height=rt;let Ae=vt.getContext("2d");Ae.setTransform(.5,0,0,.5,0,0),Ae.fillStyle="#fff",Ve.forEach(_t=>{_t.S.p.layer!=="bone"||!_t.loops.length||/^(Hip bone|Sacrum|Coccyx|Vertebra)/.test(_t.S.p.name)||(Ae.beginPath(),_t.loops.forEach(yt=>{Ae.moveTo(yt[0][0],yt[0][1]),yt.forEach(kt=>Ae.lineTo(kt[0],kt[1])),Ae.closePath()}),Ae.fill("nonzero"))});let xt=Ae.getImageData(0,0,it,rt),Se=Ae.createImageData(it,rt),{u:Ke,v:Lt,n:Mn}=U;for(let _t=0;_t<rt;_t++)for(let yt=0;yt<it;yt++){let kt=(_t*it+yt)*4;if(!xt.data[kt+3])continue;let bt=U.cu+(yt/.5-ct/2)/Me,Ut=U.cvv-(_t/.5-ze/2)/Me,gn=Ke.x*bt+Lt.x*Ut+Mn.x*Le,hi=Ke.y*bt+Lt.y*Ut+Mn.y*Le,Pi=Ke.z*bt+Lt.z*Ut+Mn.z*Le,Dt=Math.round(86+re(gn,hi,Pi)*84+(Math.random()-.5)*10);Se.data[kt]=Se.data[kt+1]=Se.data[kt+2]=Dt,Se.data[kt+3]=255}Ae.setTransform(1,0,0,1,0,0),Ae.putImageData(Se,0,0);let rn=document.createElement("canvas");rn.width=ct,rn.height=ze;let Pe=rn.getContext("2d");return Pe.imageSmoothingEnabled=!0,Pe.filter="blur(0.6px)",Pe.drawImage(vt,0,0,ct,ze),rn}let oe=new Map,xe=12e3;function te(U,Me){if(U.ix=U.ix||[],U.ix[Me])return U.ix[Me];let Le=U.W,Ve=U.I,ct=Ve?Ve.length/3:U.n/3,ze=.002,gt=1e9,it=-1e9;for(let Ke=Me;Ke<Le.length;Ke+=3)gt=Math.min(gt,Le[Ke]),it=Math.max(it,Le[Ke]);let rt=Math.max(1,Math.ceil((it-gt)/ze)+1),vt=new Int32Array(rt+1),Ae=new Int32Array(ct*2);for(let Ke=0;Ke<ct;Ke++){let Lt=Ve?Ve[Ke*3]:Ke*3,Mn=Ve?Ve[Ke*3+1]:Ke*3+1,rn=Ve?Ve[Ke*3+2]:Ke*3+2,Pe=Le[Lt*3+Me],_t=Le[Mn*3+Me],yt=Le[rn*3+Me],kt=Math.floor((Math.min(Pe,_t,yt)-gt)/ze),bt=Math.floor((Math.max(Pe,_t,yt)-gt)/ze);Ae[Ke*2]=kt,Ae[Ke*2+1]=bt;for(let Ut=kt;Ut<=bt;Ut++)vt[Ut+1]++}for(let Ke=0;Ke<rt;Ke++)vt[Ke+1]+=vt[Ke];let xt=new Int32Array(vt[rt]),Se=vt.slice(0,rt);for(let Ke=0;Ke<ct;Ke++)for(let Lt=Ae[Ke*2];Lt<=Ae[Ke*2+1];Lt++)xt[Se[Lt]++]=Ke;return U.ix[Me]={lo:gt,B:ze,nb:rt,start:vt,list:xt}}let j=0;function se(U,Me,Le){U.id==null&&(U.id=++j);let Ve=U.id+"|"+Me+"|"+Le.toFixed(5),ct=oe.get(Ve);if(ct)return oe.delete(Ve),oe.set(Ve,ct),ct;let ze=te(U,Me),gt=[],it=Math.floor((Le-ze.lo)/ze.B);if(it>=0&&it<ze.nb){let vt=U.W,Ae=U.I;for(let xt=ze.start[it];xt<ze.start[it+1];xt++){let Se=ze.list[xt],Ke=Ae?Ae[Se*3]:Se*3,Lt=Ae?Ae[Se*3+1]:Se*3+1,Mn=Ae?Ae[Se*3+2]:Se*3+2,rn=vt[Ke*3+Me]-Le,Pe=vt[Lt*3+Me]-Le,_t=vt[Mn*3+Me]-Le,yt=[],kt=(bt,Ut,gn,hi)=>{let Pi=gn/(gn-hi);yt.push(vt[bt*3]+(vt[Ut*3]-vt[bt*3])*Pi,vt[bt*3+1]+(vt[Ut*3+1]-vt[bt*3+1])*Pi,vt[bt*3+2]+(vt[Ut*3+2]-vt[bt*3+2])*Pi)};if(rn>0!=Pe>0&&kt(Ke,Lt,rn,Pe),Pe>0!=_t>0&&kt(Lt,Mn,Pe,_t),_t>0!=rn>0&&kt(Mn,Ke,_t,rn),yt.length===6)for(let bt=0;bt<6;bt++)gt.push(yt[bt])}}let rt=new Float32Array(gt);return oe.set(Ve,rt),oe.size>xe&&oe.delete(oe.keys().next().value),rt}function J(U,Me,Le,Ve,ct){let ze=performance.now(),gt=!U.forceFull&&U.lastSlice&&ze-U.lastSlice<200;U.forceFull=!1,clearTimeout(U.fullT);let it=Me/1e3>1/.8;gt&&(U.fullT=setTimeout(()=>{U.forceFull=!0,U.baseKey=null,lt(U)},180));let{n:rt,u:vt,v:Ae}=U;U.base||(U.base=document.createElement("canvas"));let xt=U.base;xt.width=U.cv.width,xt.height=U.cv.height;let Se=xt.getContext("2d");Se.setTransform(1,0,0,1,0,0),Se.fillStyle="#0a0a0a",Se.fillRect(0,0,xt.width,xt.height);let Ke=[],Lt=null,Mn=null;L.forEach(Dt=>{if(Dt.context&&!Y.includes(U.k))return;let dn=Dt.box,on=1e9,Un=-1e9;for(let nn=0;nn<8;nn++){let Ft=rt.x*(nn&1?dn.max.x:dn.min.x)+rt.y*(nn&2?dn.max.y:dn.min.y)+rt.z*(nn&4?dn.max.z:dn.min.z);on=Math.min(on,Ft),Un=Math.max(Un,Ft)}if(on>Le||Un<Le)return;let Nn=[],jn=Dt.mirror?-1:1,si=Math.abs(rt.x)>.5?0:Math.abs(rt.y)>.5?1:2,qn=Le*(si===0?rt.x:si===1?rt.y:rt.z),$n=(nn,Ft,Fn)=>[Ve(nn*vt.x+Ft*vt.y+Fn*vt.z),ct(nn*Ae.x+Ft*Ae.y+Fn*Ae.z)];if(Dt.items.forEach(nn=>{let Ft=se(nn,si,si===0?qn*jn:qn);for(let Fn=0;Fn<Ft.length;Fn+=6)Nn.push([$n(Ft[Fn]*jn,Ft[Fn+1],Ft[Fn+2]),$n(Ft[Fn+3]*jn,Ft[Fn+4],Ft[Fn+5])])}),!Nn.length)return;let en=nn=>Math.round(nn[0]*4)+","+Math.round(nn[1]*4),xn=new Map;Nn.forEach((nn,Ft)=>[0,1].forEach(Fn=>{let _s=en(nn[Fn]);(xn.get(_s)||xn.set(_s,[]).get(_s)).push([Ft,Fn])}));let Kt=new Uint8Array(Nn.length),yn=[];for(let nn=0;nn<Nn.length;nn++){if(Kt[nn])continue;Kt[nn]=1;let Ft=[Nn[nn][0],Nn[nn][1]],Fn=Nn[nn][1];for(let _s=0;_s<Nn.length;_s++){let qs=(xn.get(en(Fn))||[]).find(([js])=>!Kt[js]);if(!qs)break;Kt[qs[0]]=1;let Ys=Nn[qs[0]][1-qs[1]];Ft.push(Ys),Fn=Ys}Ft.length>1&&yn.push(Ft)}let Gn=8*q,ei=(nn,Ft)=>Math.hypot(nn[0]-Ft[0],nn[1]-Ft[1]),us=nn=>ei(nn[0],nn[nn.length-1])<=Gn,Ni=yn.filter(nn=>!us(nn)),Si=yn.filter(us);for(let nn=0;Ni.length&&nn<400;nn++){let Ft=Ni[0],Fn=null,_s=Gn*3;ei(Ft[0],Ft[Ft.length-1])<_s&&Ft.length>2&&(_s=ei(Ft[0],Ft[Ft.length-1]),Fn={self:!0});for(let js=1;js<Ni.length;js++){let vs=Ni[js];[[Ft[Ft.length-1],vs[0],0],[Ft[Ft.length-1],vs[vs.length-1],1],[Ft[0],vs[vs.length-1],2],[Ft[0],vs[0],3]].forEach(([Mx,Sx,Ex])=>{let ip=ei(Mx,Sx);ip<_s&&(_s=ip,Fn={j:js,m:Ex})})}if(!Fn){let js=0;for(let vs=1;vs<Ft.length;vs++)js+=ei(Ft[vs-1],Ft[vs]);Ni.shift(),Ft.length>4&&ei(Ft[0],Ft[Ft.length-1])<.18*js?Si.push(Ft):(Lt||(Lt=[])).push(Ft);continue}if(Fn.self){Si.push(Ni.shift());continue}let qs=Ni[Fn.j],Ys;Fn.m===0?Ys=Ft.concat(qs):Fn.m===1?Ys=Ft.concat(qs.slice().reverse()):Fn.m===2?Ys=qs.concat(Ft):Ys=qs.slice().reverse().concat(Ft),Ni.splice(Fn.j,1),Ni[0]=Ys,us(Ys)&&Si.push(Ni.shift())}Ke.push({S:Dt,loops:Si.filter(nn=>nn.length>2),lines:Lt||[]}),Lt=null});let rn=Dt=>{Se.beginPath(),Dt.forEach(dn=>{Se.moveTo(dn[0][0],dn[0][1]);for(let on=1;on<dn.length;on++)Se.lineTo(dn[on][0],dn[on][1]);Se.closePath()})};Se.lineJoin="round";let Pe="#3a3a3a",_t="#8f8f8f",yt=.012*Me,kt=Math.max(1*q,7e-4*Me),bt=Ke.filter(Dt=>Dt.S.p.layer!=="capsule"&&Dt.S.p.layer!=="lung"&&Dt.S.p.layer!=="airway"),Ut=[];if(U.k==="axial"){let Dt=bt.map(en=>{let xn=1e9,Kt=1e9,yn=-1e9,Gn=-1e9;return en.loops.forEach(ei=>ei.forEach(us=>{xn=Math.min(xn,us[0]),Kt=Math.min(Kt,us[1]),yn=Math.max(yn,us[0]),Gn=Math.max(Gn,us[1])})),[xn,Kt,yn,Gn]}),dn=/latissimus|serratus|pectoralis|trapezius|rhomboid|levator scapulae|subclavius|intercostal|thoraco|lateral thoracic|long thoracic|vertebra|sacrum|coccyx|psoas|quadratus lumborum|iliac artery|iliac vein/i,on=en=>en.S.context||dn.test(en.S.p.name),Un=en=>!!en.S.mirror,Nn=bt.map((en,xn)=>xn),jn=en=>Nn[en]===en?en:Nn[en]=jn(Nn[en]),si=.006*Me;for(let en=0;en<Dt.length;en++)for(let xn=en+1;xn<Dt.length;xn++){let Kt=Dt[en],yn=Dt[xn];Kt[0]>1e8||yn[0]>1e8||Un(bt[en])!==Un(bt[xn])||on(bt[en])||on(bt[xn])||Kt[0]-si<yn[2]&&yn[0]-si<Kt[2]&&Kt[1]-si<yn[3]&&yn[1]-si<Kt[3]&&(Nn[jn(en)]=jn(xn))}let qn=new Map;bt.forEach((en,xn)=>{if(Dt[xn][0]>1e8||on(en))return;let Kt=jn(xn);(qn.get(Kt)||qn.set(Kt,[]).get(Kt)).push(en)});let $n=(en,xn,Kt)=>(xn[0]-en[0])*(Kt[1]-en[1])-(xn[1]-en[1])*(Kt[0]-en[0]);qn.forEach(en=>{let xn=[];if(en.forEach(Gn=>Gn.loops.forEach(ei=>ei.forEach(us=>xn.push(us)))),xn.length<3)return;xn.sort((Gn,ei)=>Gn[0]-ei[0]||Gn[1]-ei[1]);let Kt=[],yn=[];xn.forEach(Gn=>{for(;Kt.length>1&&$n(Kt[Kt.length-2],Kt[Kt.length-1],Gn)<=0;)Kt.pop();Kt.push(Gn)}),xn.slice().reverse().forEach(Gn=>{for(;yn.length>1&&$n(yn[yn.length-2],yn[yn.length-1],Gn)<=0;)yn.pop();yn.push(Gn)}),Ut.push(Kt.slice(0,-1).concat(yn.slice(0,-1)))})}let gn=(Dt,dn)=>{Se.strokeStyle=dn,Se.fillStyle=dn,Se.lineWidth=Dt,Ut.forEach(on=>{Se.beginPath(),on.forEach((Un,Nn)=>Nn?Se.lineTo(Un[0],Un[1]):Se.moveTo(Un[0],Un[1])),Se.closePath(),Se.fill(),Se.stroke()}),bt.forEach(on=>{rn(on.loops),Se.fill("evenodd"),Se.stroke(),on.lines.length&&(Se.beginPath(),on.lines.forEach(Un=>{Se.moveTo(Un[0][0],Un[0][1]),Un.forEach(Nn=>Se.lineTo(Nn[0],Nn[1]))}),Se.stroke())})};Se.lineJoin="round",Se.lineCap="round",gn(2*(yt+kt),_t),gn(2*yt,Pe);let hi=Dt=>{if(rn(Dt.loops),Dt.S.p.layer==="bone"&&!Dt.S.tgt){let dn=Dt.S.p.box,on=dn.min.y,Un=dn.max.y,Nn=Math.max(1e-4,Un-on),jn=/^(Femur|Tibia|Fibula)$/.test(Dt.S.p.name),si=Ni=>{if(!jn)return 0;let Si=(Ni-on)/Nn,nn=Math.min(1,Math.max(0,(Si-.16)/.12)),Ft=Math.min(1,Math.max(0,(.84-Si)/.12));return Math.min(nn,Ft)},qn=1e9,$n=1e9,en=-1e9,xn=-1e9;Dt.loops.forEach(Ni=>Ni.forEach(Si=>{Si[0]<qn&&(qn=Si[0]),Si[0]>en&&(en=Si[0]),Si[1]<$n&&($n=Si[1]),Si[1]>xn&&(xn=Si[1])})),qn=Math.max(0,Math.floor(qn)-2),$n=Math.max(0,Math.floor($n)-2);let Kt=Math.min(xt.width,Math.ceil(en)+2)-qn,yn=Math.min(xt.height,Math.ceil(xn)+2)-$n;if(Kt<=0||yn<=0)return;Se.save(),Se.clip("nonzero"),/^(Hip bone|Sacrum|Coccyx)|vertebra|atlas|axis \(c2|\brib\b|stern|manubrium|xiphoid|costal/i.test(Dt.S.p.name)?(Se.fillStyle="#c9c9c9",Se.fillRect(qn,$n,Kt,yn)):gt||!it?(Se.fillStyle="#b4b4b4",Se.fillRect(qn,$n,Kt,yn)):(Mn||(Mn=ge(U,Me,Le,Ke,xt.width,xt.height)),Se.drawImage(Mn,qn,$n,Kt,yn,qn,$n,Kt,yn));let Gn="rgba(58,58,58,",ei=Ae.y;if(jn&&Math.abs(ei)>.5){let Ni=ct(on*ei),Si=ct(Un*ei),nn=Se.createLinearGradient(0,Ni,0,Si);[0,.16,.28,.5,.72,.84,1].forEach(Ft=>nn.addColorStop(Ft,Gn+si(on+Ft*Nn).toFixed(2)+")")),Se.fillStyle=nn,Se.fillRect(qn,$n,Kt,yn)}else jn&&(Se.fillStyle=Gn+si(Le).toFixed(2)+")",Se.fillRect(qn,$n,Kt,yn));let us=Math.abs(ei)>.5?.5:si(Le);rn(Dt.loops),Se.strokeStyle="#f4f4f4",Se.lineWidth=Math.max(4*q,(.005+.009*us)*Me),Se.stroke(),Se.restore();return}Se.fillStyle=S[Dt.S.p.layer]||"#888",Se.fill("evenodd"),Dt.S.tgt&&(Se.fillStyle="rgba(95,200,255,.58)",Se.fill("evenodd")),Se.strokeStyle="rgba(40,40,40,.55)",Se.lineWidth=.8*q,Se.stroke()};Ke.forEach(hi),U.shapes=Ke,U.lastSlice=performance.now();let Pi=[];Se.font="600 "+10.5*q+"px -apple-system, system-ui, sans-serif",Se.textAlign="center",Se.textBaseline="middle",Ke.filter(Dt=>Dt.S.p.name===ve&&Dt.loops.length).forEach(Dt=>{let dn=0,on=0,Un=0,Nn=0;Dt.loops.forEach(Kt=>{for(let yn=0;yn<Kt.length;yn++){let Gn=Kt[yn],ei=Kt[(yn+1)%Kt.length];Nn+=Gn[0]*ei[1]-ei[0]*Gn[1],dn+=Gn[0],on+=Gn[1],Un++}});let jn=dn/Un,si=on/Un,qn=Dt.S.p.name.replace(/ muscle$/,""),$n=Se.measureText(qn).width+6*q,en=14*q,xn=si-16*q;for(let Kt=0;Kt<6&&Pi.some(yn=>Math.abs(yn[0]-jn)<(yn[2]+$n)/2&&Math.abs(yn[1]-xn)<en);Kt++)xn-=en;Pi.push([jn,xn,$n]),Se.strokeStyle="rgba(255,224,150,.6)",Se.lineWidth=1*q,Se.beginPath(),Se.moveTo(jn,si),Se.lineTo(jn,xn+en/2-2*q),Se.stroke(),Se.fillStyle="rgba(0,0,0,.6)",Se.fillRect(jn-$n/2,xn-en/2,$n,en),Se.fillStyle="#ffe196",Se.fillText(qn,jn,xn+.5*q)}),Se.textAlign="start",Se.textBaseline="alphabetic",Ke.forEach(Dt=>{Dt.lines.length&&(Se.beginPath(),Dt.lines.forEach(dn=>{Se.moveTo(dn[0][0],dn[0][1]);for(let on=1;on<dn.length;on++)Se.lineTo(dn[on][0],dn[on][1])}),Se.strokeStyle=Dt.S.p.layer==="bone"?"#f2f2f2":S[Dt.S.p.layer]||"#888",Se.lineWidth=(Dt.S.p.layer==="bone"?2.5:1.5)*q,Se.stroke())})}function De(U,Me,Le){let{u:Ve,v:ct,g2:ze,cv:gt}=U;ze.setLineDash([4*q,4*q]),ze.lineWidth=1*q,me.forEach(it=>{if(it===U)return;ze.strokeStyle=k[it.k],ze.globalAlpha=.7,ze.beginPath();let rt=it.n.dot(Ve),vt=it.n.dot(ct);if(Math.abs(rt)>.5){let Ae=Me(it.d/rt);ze.moveTo(Ae,0),ze.lineTo(Ae,gt.height)}else if(Math.abs(vt)>.5){let Ae=Le(it.d/vt);ze.moveTo(0,Ae),ze.lineTo(gt.width,Ae)}ze.stroke(),ze.globalAlpha=1}),ze.setLineDash([])}let ve=null,ue=null,de=document.createElement("div");de.className="jka-ctmenu",de.style.display="none",F.appendChild(de);let Qe=window.matchMedia&&(matchMedia("(hover: none)").matches||matchMedia("(max-width: 720px)").matches);[["axial","Axial"],["coronal","Coronal"],["sagittal","Sagittal"]].concat(Qe?[]:[[null,"All three"]]).forEach(([U,Me])=>{let Le=document.createElement("button");Le.className="jka-ctmi",Le.textContent=Me,Le.dataset.k=U||"",Le.addEventListener("pointerdown",Ve=>Ve.stopPropagation()),Le.addEventListener("click",Ve=>{Ve.stopPropagation(),de.style.display="none",Xe(U,!0)}),de.appendChild(Le)});function ye(U){if(de.style.display!=="none"){de.style.display="none";return}let Me=F.getBoundingClientRect(),Le=U.getBoundingClientRect();de.style.display="",de.style.top=Le.bottom-Me.top+4+"px",de.style.left="auto",de.style.right="8px",de.querySelectorAll("button").forEach(Ve=>Ve.classList.toggle("on",(Ve.dataset.k||null)===ue))}F.addEventListener("pointerdown",()=>{de.style.display="none"});function Xe(U,Me){ue=Me?U:ue===U?null:U,F.classList.toggle("jka-ct-solo",!!ue),me.forEach(Le=>Le.el.classList.toggle("jka-on",Le.k===ue)),requestAnimationFrame(()=>{ht(),me.forEach(Le=>{Le.baseKey=null}),Zt()})}let Mt=U=>{U.key==="Escape"&&ue&&Ci&&(U.preventDefault(),U.stopPropagation(),Xe(ue))};document.addEventListener("keydown",Mt,!0);let Zt=()=>me.forEach(lt);try{window.__jkaCT={panes:me,drawPane:lt,src:L,slice:J}}catch{}me.forEach(U=>{U.cv.addEventListener("wheel",Ae=>{if(Ae.preventDefault(),Ae.stopPropagation(),Ae.ctrlKey){U.manual=!0,U.half=Math.max(.03,Math.min(1,U.half*Math.exp(Ae.deltaY*.01))),lt(U);return}U.d-=Math.sign(Ae.deltaY)*.003,Zt()},{passive:!1});let Me=!1,Le=null,Ve=0,ct=Ae=>{let xt=U.cv.getBoundingClientRect();Le=U.toWorld(Ae.clientX-xt.left,Ae.clientY-xt.top),Ve||(Ve=requestAnimationFrame(()=>{if(Ve=0,!Le)return;let Se=Le;Le=null,me.forEach(Ke=>{Ke!==U&&(Ke.d=Ke.n.dot(Se))}),Zt()}))},ze=null,gt=null;U.cv.addEventListener("contextmenu",Ae=>Ae.preventDefault()),U.cv.addEventListener("pointerdown",Ae=>{if(Ae.button===2||Ae.button===1||Ae.button===0&&Ae.shiftKey){Ae.preventDefault(),U.manual=!0,gt=[Ae.clientX,Ae.clientY],U.cv.setPointerCapture(Ae.pointerId);return}Ae.button===0&&(ze=[Ae.clientX,Ae.clientY],Me=!1,U.cv.setPointerCapture(Ae.pointerId))}),U.cv.addEventListener("pointermove",Ae=>{if(gt){let xt=U.H/(2*U.half);U.cu-=(Ae.clientX-gt[0])/xt,U.cvv+=(Ae.clientY-gt[1])/xt,gt=[Ae.clientX,Ae.clientY],U.praf||(U.praf=requestAnimationFrame(()=>{U.praf=0,lt(U)}));return}ze&&(!Me&&Math.hypot(Ae.clientX-ze[0],Ae.clientY-ze[1])>4&&(Me=!0),Me&&ct(Ae))}),U.cv.addEventListener("pointerup",Ae=>{if(ze&&!Me){let xt=U.cv.getBoundingClientRect(),Se=(Ae.clientX-xt.left)*q,Ke=(Ae.clientY-xt.top)*q,Lt=U.cv.getContext("2d"),Mn=null;(U.shapes||[]).slice().reverse().some(rn=>rn.loops.length?(Lt.beginPath(),rn.loops.forEach(Pe=>{Lt.moveTo(Pe[0][0],Pe[0][1]),Pe.forEach(_t=>Lt.lineTo(_t[0],_t[1])),Lt.closePath()}),Lt.isPointInPath(Se,Ke,rn.S.p.layer==="bone"?"nonzero":"evenodd")?(Mn=rn.S.p.name,!0):!1):!1),ve=Mn===ve?null:Mn,Zt()}ze=null,Me=!1,gt=null}),U.cv.addEventListener("pointercancel",()=>{ze=null,Me=!1,gt=null});let it=new Map,rt=null;["touchstart","touchmove","touchend","touchcancel"].forEach(Ae=>U.cv.addEventListener(Ae,xt=>{xt.stopPropagation(),xt.cancelable&&xt.preventDefault()},{passive:!1})),U.cv.addEventListener("pointerdown",Ae=>{if(Ae.pointerType==="touch"&&(it.set(Ae.pointerId,[Ae.clientX,Ae.clientY]),it.size===2)){ze=null,Me=!1;let[xt,Se]=[...it.values()];rt={d:Math.hypot(xt[0]-Se[0],xt[1]-Se[1]),y:(xt[1]+Se[1])/2}}},!0),U.cv.addEventListener("pointermove",Ae=>{if(Ae.pointerType!=="touch"||!it.has(Ae.pointerId)||(it.set(Ae.pointerId,[Ae.clientX,Ae.clientY]),it.size!==2||!rt))return;Ae.stopImmediatePropagation();let[xt,Se]=[...it.values()],Ke=Math.hypot(xt[0]-Se[0],xt[1]-Se[1]),Lt=(xt[1]+Se[1])/2;Ke>10&&rt.d>10&&Math.abs(Ke-rt.d)>1&&(U.manual=!0,U.half=Math.max(.03,Math.min(1,U.half*rt.d/Ke))),U.d+=(Lt-rt.y)*4e-4,rt={d:Ke,y:Lt},U.praf||(U.praf=requestAnimationFrame(()=>{U.praf=0,Zt()}))},!0);let vt=Ae=>{Ae.pointerType==="touch"&&(it.delete(Ae.pointerId),it.size<2&&(rt=null))};U.cv.addEventListener("pointerup",vt,!0),U.cv.addEventListener("pointercancel",vt,!0),U.cv.addEventListener("dblclick",Ae=>{Ae.preventDefault(),Qe||Xe(U.k)})}),["pointerdown","pointermove","pointerup"].forEach(U=>F.addEventListener(U,Me=>Me.stopPropagation()));let Tn=new ResizeObserver(()=>{ht(),Zt()});Tn.observe(c),Ci={box:F,mini:Oe,mark:null,marks:_e,ro:Tn,onEsc:Mt,zoom:U=>{me.forEach(Me=>{Me.manual=!0,Me.half=Math.max(.03,Math.min(1,Me.half*U))}),Zt()},key:U=>{me[0].d+=U,Zt()}},ht(),Zt();let Yn=window.matchMedia&&(matchMedia("(hover: none)").matches||matchMedia("(max-width: 720px)").matches);(ne||Yn)&&Xe("axial",!0),Ma=null}function Cu(x,S,b){Vr=!1,ne||(window.__jkaWasRad=x),x&&Ru&&Mc(!1);let L=li;li=x,Ue.turntable=x,b||(c.classList.add("jka-glide"),setTimeout(()=>c.classList.remove("jka-glide"),450)),c.classList.toggle("jka-radmode",x),K(),Hs();let Y=Math.tan(lo.degToRad(15))/Math.tan(lo.degToRad(3.5));if(x&&!L){Ue.autoRotate=!1;let ee=Ue.level();ke.fov=7,ke.far=40,ke.updateProjectionMatrix();let V=Ue.target.clone().add(ke.position.clone().sub(Ue.target).multiplyScalar(Y)),we=Ue.target.clone().add(ee.p1.clone().sub(Ue.target).multiplyScalar(Y));b?(ke.position.copy(we),ee.u1&&ke.up.copy(ee.u1),ke.lookAt(Ue.target),Rt=null):(ke.position.copy(V),Rt={p0:V,t0:Ue.target.clone(),p1:we,t1:Ue.target.clone(),s:0,u1:ee.u1})}if(!x&&L&&(ke.fov=30,ke.far=20,ke.updateProjectionMatrix(),ke.position.copy(Ue.target.clone().add(ke.position.clone().sub(Ue.target).multiplyScalar(1/Y)))),c.querySelectorAll("button[data-l=xray]").forEach(ee=>{ee.className=x?"jka-b on":"jka-b"}),!S)try{localStorage.setItem("jka-rad",x?"1":"0")}catch{}if(x&&!Mi){let ee=window.__jkaT||{};ee.radStart=Math.round(performance.now()-(ee.t0||0));let V={bone:55,muscle:1.5,vessel:3.2,nerve:2.6},we=new Cr,W=(z,k,me,Q)=>new Xi({uniforms:{mu:{value:z},tg:{value:k?1:0},sh:{value:me||0},tx:{value:Q||0},ctr:{value:new T},fl:{value:1}},vertexShader:"uniform float sh; uniform vec3 ctr; varying float vz; varying vec3 wp; void main(){ vec3 p = position - normal * sh; vec4 w = modelMatrix * vec4(p, 1.); wp = w.xyz; vec4 mv = viewMatrix * w; vec4 mc = viewMatrix * vec4(ctr, 1.); vz = mc.z - mv.z; gl_Position = projectionMatrix * mv; }",fragmentShader:"uniform float mu, tg, tx, fl; varying float vz; varying vec3 wp; float h(vec3 p){ return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); } void main(){ float s = (gl_FrontFacing ? -1. : 1.) * fl; gl_FragColor = vec4(s * vz * mu, s * vz * tg * 40., s * vz * tx, 1.); }",side:Ti,depthTest:!1,depthWrite:!1,transparent:!0,blending:kl,blendEquation:Is,blendSrc:Vl,blendDst:Vl}),F={},$=(z,k)=>{let me=k.clone();me.uniforms.ctr.value=z.box.getCenter(new T);let Q=new Rn(z.mesh.geometry,me);Q.matrixAutoUpdate=!1,Q.matrix.copy(z.mesh.matrixWorld),Q.userData.src=z,we.add(Q)};N.forEach(z=>{if(z.layer==="nerve"||z.layer==="vessel"||z.layer==="vein"||z.layer==="ligament"||z.layer==="capsule")return;let k=B.includes(z),me=z.layer+k;if(z.layer==="bone"){$(z,F.bo||(F.bo=W(150,!1,0,0))),$(z,F.bi||(F.bi=W(-150,!1,.006,9))),k&&!at&&be==="name"&&$(z,F.bt||(F.bt=W(0,!0,0,0)));return}$(z,F[me]||(F[me]=W(V[z.layer]||2.6,k)))});let Ee=(z,k,me,Q)=>{let _e=me.getCenter(new T);[[F.bo||(F.bo=W(150,!1,0,0))],[F.bi||(F.bi=W(-150,!1,.006,9))]].forEach(([Ze])=>{let ht=Ze.clone();ht.uniforms.ctr.value=_e,ht.uniforms.fl.value=Q?-1:1;let lt=new Rn(z,ht);lt.matrixAutoUpdate=!1,lt.matrix.copy(k),lt.userData.always=!0,we.add(lt)})},Oe=new Et().makeScale(-1,1,1);N.forEach(z=>{if(z.layer!=="bone")return;let k=(z.box.min.x+z.box.max.x)/2;if(z.box.min.x<.005&&z.box.max.x>-.005)return;let me=z.box.clone().applyMatrix4(Oe);Ee(z.mesh.geometry,Oe.clone().multiply(z.mesh.matrixWorld),me,!1)}),Id(n).then(z=>{if(v)return;z.updateMatrixWorld(!0);let k=new Set(N.map(me=>me.name));z.traverse(me=>{!me.isMesh||(me.userData||{}).l!=="bone"||k.has(String(me.userData.n||me.name).replace(/\.[lr]$/,""))||Ee(me.geometry,me.matrixWorld,new an().setFromObject(me),!1)}),Vn=!0}).catch(()=>{});let je=new ds(4,4,{type:so,depthBuffer:!1});g.push(je);let $e=new Rn(new oo(2,2),new Xi({vertexShader:"varying vec2 vu; void main(){ vu = uv; gl_Position = vec4(position.xy, 0., 1.); }",uniforms:{t:{value:je.texture},px:{value:new ot(1,1)}},fragmentShader:"uniform sampler2D t; uniform vec2 px; varying vec2 vu; float hh(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); } float vn(vec2 q){ vec2 i = floor(q), f = fract(q); f = f * f * (3. - 2. * f); return mix(mix(hh(i), hh(i + vec2(1, 0)), f.x), mix(hh(i + vec2(0, 1)), hh(i + vec2(1, 1)), f.x), f.y); } vec4 mn(vec4 a, vec4 b){ return min(a, b); } vec4 mx(vec4 a, vec4 b){ return max(a, b); } vec4 med5(vec4 a, vec4 b, vec4 c, vec4 d, vec4 e){  vec4 f = mx(mn(a, b), mn(c, d)); vec4 g = mn(mx(a, b), mx(c, d));  return mx(mn(f, g), mn(mx(f, g), e)) * 0. + mn(mx(mn(f, g), e), mx(f, g)); } void main(){ vec4 a = med5(texture2D(t, vu), texture2D(t, vu + vec2(px.x, 0.)), texture2D(t, vu - vec2(px.x, 0.)),  texture2D(t, vu + vec2(0., px.y)), texture2D(t, vu - vec2(0., px.y))); float n = vn(gl_FragCoord.xy / 4.) * .6 + vn(gl_FragCoord.xy / 1.7) * .4; float tb = max(a.b, 0.) * (0.7 + 0.6 * n); float g = 1. - exp(-max(a.r + tb, 0.)); float k = 1. - exp(-max(a.g, 0.)); float bl = 0.; for (int i = 0; i < 8; i++) { float an = float(i) * 0.785398; vec4 q = texture2D(t, vu + vec2(cos(an), sin(an)) * px * 4.);  bl += 1. - exp(-max(q.r + max(q.b, 0.), 0.)); } bl /= 8.; g = clamp(g + 0.9 * (g - bl), 0., 1.); vec3 c = vec3(g) * 0.92 + 0.03; c = mix(c, vec3(0.37, 0.78, 1.), clamp(k, 0., 1.) * 0.6); gl_FragColor = vec4(c, 1.); }",depthTest:!1,depthWrite:!1})),pt=new Cr;pt.add($e);let q=null;if(at&&be==="name"){q=new Cr;let z=new Xi({vertexShader:"attribute float jkw; varying float w; void main(){ w = jkw; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }",fragmentShader:"varying float w; void main(){ if (w < 0.05) discard; gl_FragColor = vec4(0.25, 0.8, 1., clamp(w, 0., 1.) * 0.55); }",transparent:!0,depthTest:!1,depthWrite:!1,side:Ti});B.forEach(k=>{let me=k.mesh.geometry;me.attributes.jkw||me.setAttribute("jkw",new Pn(new Float32Array(me.attributes.position.count),1));let Q=new Rn(me,z);Q.matrixAutoUpdate=!1,Q.matrix.copy(k.mesh.matrixWorld),q.add(Q)})}Mi={rs:we,rt:je,ss:pt,ps:q},ee.radBuilt=Math.round(performance.now()-(ee.t0||0))}Cn.style.display=x?"none":"",p.style.display=x?"none":"",Vn=!0}function Hd(){{let S=window.__jkaT||{};S.radFrame==null&&(S.radFrame=Math.round(performance.now()-(S.t0||0)))}let x=u.getDrawingBufferSize(new ot);(Mi.rt.width!==x.x||Mi.rt.height!==x.y)&&(Mi.rt.setSize(x.x,x.y),Mi.ss.children[0].material.uniforms.px.value.set(1/x.x,1/x.y)),Mi.rs.children.forEach(S=>{if(S.userData.always){S.visible=!0;return}let b=S.userData.src;S.visible=b.layer==="bone"||C(b)&&b.mesh.visible}),u.setRenderTarget(Mi.rt),u.setClearColor(0,0),u.clear(),u.render(Mi.rs,ke),u.setRenderTarget(null),u.clear(),u.render(Mi.ss,Iu),Mi.ps&&(Mi.ps.children.forEach((S,b)=>{let L=B[b];L&&S.geometry!==L.mesh.geometry&&(S.geometry=L.mesh.geometry)}),u.render(Mi.ps,ke))}let Pu=new Cr,Iu=new Rr(-1,1,1,-1,0,1);Pu.add(new Rn(new oo(2,2),new Xi({vertexShader:"varying vec2 vv; void main(){ vv = uv; gl_Position = vec4(position.xy, 0., 1.); }",fragmentShader:"varying vec2 vv; uniform float ft, fb; void main(){ float a = smoothstep(0., fb, vv.y) * smoothstep(0., ft, 1. - vv.y) * smoothstep(0., .06, vv.x) * smoothstep(0., .06, 1. - vv.x); gl_FragColor = vec4(0., 0., 0., a); }",uniforms:{ft:{value:KE},fb:{value:JE}},transparent:!0,depthTest:!1,depthWrite:!1,blending:kl,blendEquation:Is,blendSrc:Hl,blendDst:Yo,blendSrcAlpha:Hl,blendDstAlpha:Yo}))),u.autoClear=!1;let Ws=document.createElement("div");Ws.className="jka-views";let Xs="http://www.w3.org/2000/svg",Lu=112,cs=Lu/2,Sc=42,ls=document.createElementNS(Xs,"svg");ls.setAttribute("viewBox","0 0 "+Lu+" "+Lu),ls.setAttribute("class","jka-gizmo"),Ws.appendChild(ls);let Nu=ce?1:-1,Vd=[["anterior","A",[0,0,1],"#7fd8ff"],["posterior","P",[0,0,-1],"#7fd8ff"],["superior","S",[0,1,0],"#ffd36b"],["inferior","I",[0,-1,0],"#ffd36b"],["lateral","L",[Nu,0,0],"#ff8f8f"],["medial","M",[-Nu,0,0],"#ff8f8f"]].map(([x,S,b,L])=>{let Y=document.createElementNS(Xs,"g");Y.setAttribute("class","jka-arm"),Y.dataset.k=x;let ee=document.createElementNS(Xs,"line");ee.setAttribute("stroke",L);let V=document.createElementNS(Xs,"circle");V.setAttribute("fill",L);let we=document.createElementNS(Xs,"text");we.textContent=S,we.setAttribute("class","jka-gt"),we.setAttribute("fill",L);let W=document.createElementNS(Xs,"circle");return W.setAttribute("r",11),W.setAttribute("class","jka-hit"),Y.append(ee,V,we,W),ls.appendChild(Y),{k:x,v:new T(...b),g:Y,ln:ee,dot:V,tx:we,hit:W}}),Du=document.createElementNS(Xs,"g");Du.setAttribute("class","jka-gcube");let px=[[[1,0,0],[1,-1,-1],[1,1,-1],[1,1,1],[1,-1,1]],[[-1,0,0],[-1,-1,-1],[-1,-1,1],[-1,1,1],[-1,1,-1]],[[0,1,0],[-1,1,-1],[-1,1,1],[1,1,1],[1,1,-1]],[[0,-1,0],[-1,-1,-1],[1,-1,-1],[1,-1,1],[-1,-1,1]],[[0,0,1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]],[[0,0,-1],[-1,-1,-1],[-1,1,-1],[1,1,-1],[1,-1,-1]]].map(x=>{let S=document.createElementNS(Xs,"polygon");return Du.appendChild(S),{n:new T(...x[0]),c:x.slice(1).map(b=>new T(...b)),pg:S}}),Ec=document.createElementNS(Xs,"polygon");Ec.setAttribute("class","jka-gsec");let mx=[[0,1],[2,3],[4,5],[6,7],[0,2],[1,3],[4,6],[5,7],[0,4],[1,5],[2,6],[3,7]],Gd=[];for(let x=0;x<8;x++)Gd.push(new T(x&1?1:-1,x&2?1:-1,x&4?1:-1));let Wd=7,Xd=new gi,gx=new gi().setFromEuler(new Qo(.38,-.5,0,"YXZ")),r1=new T(0,0,1).applyQuaternion(gx),Uu=new T(.42*Nu,.5,.76).normalize(),qd=new T().crossVectors(new T(0,1,0),Uu).normalize(),xx=new T().crossVectors(Uu,qd),yx=x=>new T(x.dot(qd),x.dot(xx),x.dot(Uu)),Fu="",Wr="section";try{Wr=localStorage.getItem("jka-gizmo")==="axes"?"axes":"section"}catch{}let bo=document.createElement("button");bo.className="jka-gsw",bo.innerHTML='<svg viewBox="0 0 18 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4.20 7.51 A5.2 5.2 0 0 1 13.80 7.51"/><path d="M6.46 6.23 L4.20 7.51 L3.50 5.00"/><path d="M14.50 5.00 L13.80 7.51 L11.54 6.23"/></svg>';let Yd=()=>{bo.removeAttribute("title")};if(Yd(),bo.addEventListener("pointerdown",x=>x.stopPropagation()),bo.addEventListener("click",x=>{x.stopPropagation(),Wr=Wr==="axes"?"section":"axes",Yd(),Fu="";try{localStorage.setItem("jka-gizmo",Wr)}catch{}Kd()}),Ws.insertBefore(bo,Ws.firstChild),!(window.matchMedia&&(matchMedia("(hover: none)").matches||matchMedia("(max-width: 720px)").matches))){let x=c.querySelector(":scope > .jka-zoom");x&&(x.classList.add("jka-zoom-w"),Ws.appendChild(x))}let Mo=document.createElement("button");Mo.className="jka-gpl";let _x='<svg viewBox="0 0 12 12" width="11" height="11"><path d="M3 1.8v8.4l7-4.2z" fill="currentColor"/></svg>',vx='<svg viewBox="0 0 12 12" width="11" height="11"><path d="M2.6 1.8h2.4v8.4H2.6zM7 1.8h2.4v8.4H7z" fill="currentColor"/></svg>',jd=null,Bu=()=>{let x=!!Ue.autoRotate;if(x!==jd){jd=x,Mo.innerHTML=x?vx:_x;let S=c.querySelector(":scope > .jka-mplay");S&&(S.innerHTML=Mo.innerHTML)}};Mo.addEventListener("pointerdown",x=>x.stopPropagation());let Zd=()=>{clearTimeout(Xr),Ue.autoRotate?(Ue.autoRotate=!1,Cs=!0,wa=!0):(wa=!1,Cs=!1,Rt=null,Ue.autoRotate=!0),Bu()};Mo.addEventListener("click",x=>{x.stopPropagation(),Zd()}),Ws.insertBefore(Mo,Ws.firstChild);let Tc=document.createElement("button");Tc.className="jka-mplay",["touchstart","touchend","pointerdown"].forEach(x=>Tc.addEventListener(x,S=>S.stopPropagation(),{passive:!0})),Tc.addEventListener("click",x=>{x.stopPropagation(),x.preventDefault(),Zd()}),c.appendChild(Tc),Bu();function Kd(){let x=ke.position.clone().sub(Ue.target).normalize(),S=x.x.toFixed(3)+x.y.toFixed(3)+x.z.toFixed(3)+Wr+(Wr==="axes"?ke.up.y.toFixed(3):"");if(S===Fu)return;Fu=S,Xd.copy(ke.quaternion).invert();let b=Wr==="axes",L=b?F=>F.clone().applyQuaternion(Xd):yx;Vd.forEach(F=>{let $=L(F.v),Ee=cs+$.x*Sc,Oe=cs-$.y*Sc;F.depth=$.z,F.ln.setAttribute("x1",cs+$.x*14),F.ln.setAttribute("y1",cs-$.y*14),F.ln.setAttribute("x2",cs+$.x*(Sc-8)),F.ln.setAttribute("y2",cs-$.y*(Sc-8)),F.dot.setAttribute("r",0),F.hit.setAttribute("cx",Ee),F.hit.setAttribute("cy",Oe),F.tx.setAttribute("x",Ee),F.tx.setAttribute("y",Oe+.5),F.g.style.opacity=(.45+.55*Math.max(0,F.v.dot(x))).toFixed(2)}),px.forEach(F=>{let $=L(F.n).z;F.pg.style.display=$>.01?"":"none",F.pg.setAttribute("points",F.c.map(Ee=>{let Oe=L(Ee.clone().multiplyScalar(Wd));return(cs+Oe.x).toFixed(1)+","+(cs-Oe.y).toFixed(1)}).join(" ")),F.pg.style.fillOpacity=(.1+.22*$).toFixed(2)});let Y=Math.abs(x.y)>.9?new T(0,0,1):new T(0,1,0),ee=new T().crossVectors(Y,x).normalize(),V=new T().crossVectors(x,ee),we=15;if(b){let F=Gd.map(je=>L(je.clone().multiplyScalar(Wd))),$=[];mx.forEach(([je,$e])=>{let pt=F[je],q=F[$e];if(pt.z>0!=q.z>0){let z=pt.z/(pt.z-q.z);$.push([pt.x+(q.x-pt.x)*z,pt.y+(q.y-pt.y)*z])}});let Ee=$.reduce((je,$e)=>je+$e[0],0)/($.length||1),Oe=$.reduce((je,$e)=>je+$e[1],0)/($.length||1);$.sort((je,$e)=>Math.atan2(je[1]-Oe,je[0]-Ee)-Math.atan2($e[1]-Oe,$e[0]-Ee)),Ec.setAttribute("points",$.map(je=>(cs+je[0]).toFixed(1)+","+(cs-je[1]).toFixed(1)).join(" "))}else Ec.setAttribute("points",[[1,1],[1,-1],[-1,-1],[-1,1]].map(([F,$])=>{let Ee=L(ee.clone().multiplyScalar(F*we).addScaledVector(V,$*we));return(cs+Ee.x).toFixed(1)+","+(cs-Ee.y).toFixed(1)}).join(" "));let W=Vd.slice().sort((F,$)=>F.depth-$.depth);W.filter(F=>F.depth<0).forEach(F=>ls.appendChild(F.g)),ls.appendChild(Du),ls.appendChild(Ec),W.filter(F=>F.depth>=0).forEach(F=>ls.appendChild(F.g))}let Rs=null;ls.addEventListener("pointerdown",x=>{x.stopPropagation(),x.preventDefault(),qr(),Rs={x:x.clientX,y:x.clientY,moved:!1,k:x.target.closest(".jka-arm")&&x.target.closest(".jka-arm").dataset.k},ls.setPointerCapture(x.pointerId)});let o1=new zl;ls.addEventListener("pointermove",x=>{if(!Rs)return;let S=x.clientX-Rs.x,b=x.clientY-Rs.y;!Rs.moved&&Math.hypot(S,b)<3||(Rs.moved=!0,Rs.x=x.clientX,Rs.y=x.clientY,Rt=null,Ue.rotate(S*.018,b*.018),So(),ne||ii())}),ls.addEventListener("pointerup",x=>{let S=Rs;if(Rs=null,!S||S.moved||!S.k)return;let b=ke.position.distanceTo(Ue.target);Rt={p0:ke.position.clone(),t0:Ue.target.clone(),p1:Ue.target.clone().addScaledVector(ox(S.k,ce),b),t1:Ue.target.clone(),s:0}}),c.appendChild(Ws);let Ou=document.createElement("div");Ou.className="jka-sect",Ws.appendChild(Ou),c.appendChild(Ea),setTimeout(Hs,0),setTimeout(Hs,300),setTimeout(Hs,650),setTimeout(Hs,1200);let Jd="";function bx(){let x=ke.position.clone().sub(Ue.target).normalize(),S=new T(x.x*(ce?1:-1),x.y,x.z),b=S.x.toFixed(2)+S.y.toFixed(2)+S.z.toFixed(2);if(b===Jd)return;Jd=b;let L=Math.abs(S.x),Y=Math.abs(S.y),ee=Math.abs(S.z),V=Ee=>Math.round(Ee*180/Math.PI),we,W,F;ee>=L&&ee>=Y?(we="Coronal",W=[V(Math.atan2(S.x,ee)),S.x>=0?"L":"M"],F=[V(Math.asin(S.y)),S.y>=0?"S":"I"]):L>=Y?(we="Sagittal",W=[V(Math.atan2(S.z,L)),S.z>=0?"A":"P"],F=[V(Math.asin(S.y)),S.y>=0?"S":"I"]):(we="Transverse",W=[V(Math.atan2(S.z,Y)),S.z>=0?"A":"P"],F=[V(Math.atan2(S.x,Y)),S.x>=0?"L":"M"]);let $=[W,F].filter(Ee=>Math.abs(Ee[0])>=5).map(Ee=>Math.abs(Ee[0])+"\xB0 "+Ee[1]);Ou.innerHTML="<b>"+we+"</b>"+($.length?"<span>"+$.join(" \xB7 ")+"</span>":"")}window.__jkaView={cam:ke,ctl:Ue,parts:N,target:B,d:ks,center:lr,renderer:u};let zu=!1,ku=0,Vn=!0,$d=0,wc=!1,Qd=0,dr=!0;function So(){Vn=!0,dr=!0,wc||(wc=!0,u.setPixelRatio(m),K()),clearTimeout(Qd),Qd=setTimeout(()=>{wc=!1,u.setPixelRatio(y),K(),Vn=!0},180)}Ue.autoRotateSpeed=1.2;let Cs=!1,Xr=0,wa=t,Ac=()=>{li||(Ue.autoRotate=!0)};function qr(){Cs=!0,Ue.autoRotate=!1,clearTimeout(Xr),Xr=setTimeout(()=>{Cs=!1,wa||Ac()},9e3)}["pointerdown","wheel"].forEach(x=>u.domElement.addEventListener(x,qr,!0)),u.domElement.addEventListener("pointerup",()=>{setTimeout(()=>{Cs=!1},0)},!0),t||setTimeout(Ac,ne?700:400),Ue.addEventListener("change",()=>{Cs||Rt?So():(Vn=!0,dr=!0),ne||ii()}),ne||ii(),new ResizeObserver(()=>{K(),Vn=!0;try{if(v)return;li&&Mi?Hd():(u.clear(),u.render(O,ke),u.render(Pu,Iu))}catch{}}).observe(c),et.push(...Ot),Vt?En(ne?1:0):Gr();let Ki=new Set,Rc=!1,ep=x=>{if(!(!/^Arrow(Left|Right|Up|Down)$/.test(x.key)||x.metaKey||x.ctrlKey||x.altKey)){if(v||!s.isConnected){document.removeEventListener("keydown",ep,!0),document.removeEventListener("keyup",tp,!0);return}x.preventDefault(),x.stopPropagation(),Rc=x.shiftKey,Ki.has(x.key)||(Ki.add(x.key),qr())}},tp=x=>{Ki.delete(x.key),x.key==="Shift"&&(Rc=!1)};_.in_key=(x,S)=>{Rc=!1,S?Ki.has(x)||(Ki.add(x),qr()):Ki.delete(x)},_.in_zoom=x=>kd(x>0?.75:1/.75),document.addEventListener("keydown",ep,!0),document.addEventListener("keyup",tp,!0),window.addEventListener("blur",()=>Ki.clear());let np=-1e9;(function x(S){if(v||!s.isConnected){v||_.stop();return}if(requestAnimationFrame(x),Rt){Rt.s||(Rt.s=S);let L=Math.min(1,(S-Rt.s)/500),Y=1-Math.pow(1-L,3);ke.position.lerpVectors(Rt.p0,Rt.p1,Y),Ue.target.lerpVectors(Rt.t0,Rt.t1,Y),Rt.u0||(Rt.u0=ke.up.clone(),Rt.u1=Rt.u1||rx(Rt.p1.clone().sub(Rt.t1).normalize())),ke.up.lerpVectors(Rt.u0,Rt.u1,Y).normalize(),Rt.q0&&(He.lerpVectors(Rt.q0,Rt.q1,Y),Je()),Vn=!0,L>=1&&(Rt=null)}let b=ku?Math.min(.05,(S-ku)/1e3):0;if(ku=S,Ci){let L=(Ki.has("ArrowUp")?1:0)-(Ki.has("ArrowDown")?1:0);if(L&&Ci.key(L*.06*b),!Ci.mini)return;Ue.update(b),Vn&&(Vn=!1,u.clear(),u.render(O,ke));return}if(Ki.size&&!Rt){let L=1.7*b,Y=(Ki.has("ArrowRight")?1:0)-(Ki.has("ArrowLeft")?1:0),ee=(Ki.has("ArrowDown")?1:0)-(Ki.has("ArrowUp")?1:0);(Y||ee)&&Rc?(Cs=!0,He.x+=Y*420*b,He.y+=ee*420*b,Je(),So(),ne||ii(),clearTimeout(Xr),Xr=setTimeout(()=>{Cs=!1,wa||Ac()},9e3)):(Y||ee)&&(Cs=!0,Ue.rotate(Y*L,ee*L),clearTimeout(Xr),Xr=setTimeout(()=>{Cs=!1,wa||Ac()},9e3))}if(Rt?ke.lookAt(Ue.target):Ue.update(b),!(Vr&&!li)){if(!Vn&&S>1500){(zu||ba)&&(zu=Fd(S));return}t&&S-np<32||(np=S,Vn=!1,M.position.copy(ke.position).add(new T(.3,.5,.2)),!wc&&dr&&S-$d>(t?400:Ue.autoRotate?200:60)&&($d=S,dr=!1,xo(),lx()),li&&Mi?Hd():(u.clear(),u.render(O,ke),u.render(Pu,Iu)),c.classList.contains("jka-shown")||requestAnimationFrame(()=>c.classList.add("jka-shown")),Kd(),bx(),Bu(),zu=Fd(S))}})(0),setTimeout(()=>{xo(),Vn=!0},50)}return _}window.JKANAT={v:80,mount:n1,input:(s,e,t)=>{let n=_c&&_c["in_"+s];return n&&n(e,t),!!n}};(window.__jkaQ||[]).splice(0).forEach(s=>s())});i1();})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2023 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
