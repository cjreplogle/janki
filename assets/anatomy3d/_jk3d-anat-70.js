(()=>{var Tx=Object.create;var sp=Object.defineProperty;var wx=Object.getOwnPropertyDescriptor;var Ax=Object.getOwnPropertyNames;var Rx=Object.getPrototypeOf,Cx=Object.prototype.hasOwnProperty;var Lt=(s,e)=>()=>(s&&(e=s(s=0)),e);var rp=(s,e)=>()=>(e||s((e={exports:{}}).exports,e),e.exports);var Px=(s,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of Ax(e))!Cx.call(s,i)&&i!==t&&sp(s,i,{get:()=>e[i],enumerable:!(n=wx(e,i))||n.enumerable});return s};var Ix=(s,e,t)=>(t=s!=null?Tx(Rx(s)):{},Px(e||!s||!s.__esModule?sp(t,"default",{value:s,enumerable:!0}):t,s));var op=rp(()=>{(function(){var s=typeof console!="undefined"&&console||(globalThis.console={}),e=typeof s.log=="function"?s.log.bind(s):function(){};["error","warn","info","debug","trace","group","groupEnd","time","timeEnd","table","assert"].forEach(function(t){typeof s[t]!="function"&&(s[t]=t==="assert"?function(){}:e)})})()});function Es(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Li[s&255]+Li[s>>8&255]+Li[s>>16&255]+Li[s>>24&255]+"-"+Li[e&255]+Li[e>>8&255]+"-"+Li[e>>16&15|64]+Li[e>>24&255]+"-"+Li[t&63|128]+Li[t>>8&255]+"-"+Li[t>>16&255]+Li[t>>24&255]+Li[n&255]+Li[n>>8&255]+Li[n>>16&255]+Li[n>>24&255]).toLowerCase()}function si(s,e,t){return Math.max(e,Math.min(t,s))}function vf(s,e){return(s%e+e)%e}function Ry(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function Cy(s,e,t){return s!==e?(t-s)/(e-s):0}function Ba(s,e,t){return(1-t)*s+t*e}function Py(s,e,t,n){return Ba(s,e,1-Math.exp(-t*n))}function Iy(s,e=1){return e-Math.abs(vf(s,e*2)-e)}function Ly(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Ny(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Dy(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Uy(s,e){return s+Math.random()*(e-s)}function Fy(s){return s*(.5-Math.random())}function By(s){s!==void 0&&(Wp=s);let e=Wp+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Oy(s){return s*Fa}function ky(s){return s*$o}function Ph(s){return(s&s-1)===0&&s!==0}function zy(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function fl(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Hy(s,e,t,n,i){let r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),u=o((e+n)/2),h=r((e-n)/2),f=o((e-n)/2),d=r((n-e)/2),g=o((n-e)/2);switch(i){case"XYX":s.set(a*u,c*h,c*f,a*l);break;case"YZY":s.set(c*f,a*u,c*h,a*l);break;case"ZXZ":s.set(c*h,c*f,a*u,a*l);break;case"XZX":s.set(a*u,c*g,c*d,a*l);break;case"YXY":s.set(c*d,a*u,c*g,a*l);break;case"ZYZ":s.set(c*g,c*d,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Ls(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Ln(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}function hg(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Wa(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Vy(){let s=Wa("canvas");return s.style.display="block",s}function Oa(s){s in Xp||(Xp[s]=!0,console.warn(s))}function Xo(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function ju(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}function Zu(s){return typeof HTMLImageElement!="undefined"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&s instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&s instanceof ImageBitmap?dl.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}function Ju(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){jr.fromArray(s,r);let a=i.x*Math.abs(jr.x)+i.y*Math.abs(jr.y)+i.z*Math.abs(jr.z),c=e.dot(jr),l=t.dot(jr),u=n.dot(jr);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}function oh(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}function n_(s,e,t,n,i,r,o,a){let c;if(e.side===Ui?c=n.intersectTriangle(o,r,i,!0,a):c=n.intersectTriangle(i,r,o,e.side===Vi,a),c===null)return null;qc.copy(a),qc.applyMatrix4(s.matrixWorld);let l=t.ray.origin.distanceTo(qc);return l<t.near||l>t.far?null:{distance:l,point:qc.clone(),object:s}}function Yc(s,e,t,n,i,r,o,a,c,l){s.getVertexPosition(a,Do),s.getVertexPosition(c,Uo),s.getVertexPosition(l,Fo);let u=n_(s,e,t,n,Do,Uo,Fo,Xc);if(u){i&&(Vc.fromBufferAttribute(i,a),Gc.fromBufferAttribute(i,c),Wc.fromBufferAttribute(i,l),u.uv=Ki.getInterpolation(Xc,Do,Uo,Fo,Vc,Gc,Wc,new et)),r&&(Vc.fromBufferAttribute(r,a),Gc.fromBufferAttribute(r,c),Wc.fromBufferAttribute(r,l),u.uv1=Ki.getInterpolation(Xc,Do,Uo,Fo,Vc,Gc,Wc,new et),u.uv2=u.uv1),o&&(sm.fromBufferAttribute(o,a),rm.fromBufferAttribute(o,c),om.fromBufferAttribute(o,l),u.normal=Ki.getInterpolation(Xc,Do,Uo,Fo,sm,rm,om,new T),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a,b:c,c:l,normal:new T,materialIndex:0};Ki.getNormal(Do,Uo,Fo,h.normal),u.face=h}return u}function na(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function zi(s){let e={};for(let t=0;t<s.length;t++){let n=na(s[t]);for(let i in n)e[i]=n[i]}return e}function i_(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function dg(s){return s.getRenderTarget()===null?s.outputColorSpace:En.workingColorSpace}function pg(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function l_(s,e){let t=e.isWebGL2,n=new WeakMap;function i(l,u){let h=l.array,f=l.usage,d=h.byteLength,g=s.createBuffer();s.bindBuffer(u,g),s.bufferData(u,h,f),l.onUploadCallback();let y;if(h instanceof Float32Array)y=s.FLOAT;else if(h instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)y=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else y=s.UNSIGNED_SHORT;else if(h instanceof Int16Array)y=s.SHORT;else if(h instanceof Uint32Array)y=s.UNSIGNED_INT;else if(h instanceof Int32Array)y=s.INT;else if(h instanceof Int8Array)y=s.BYTE;else if(h instanceof Uint8Array)y=s.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)y=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:g,type:y,bytesPerElement:h.BYTES_PER_ELEMENT,version:l.version,size:d}}function r(l,u,h){let f=u.array,d=u._updateRange,g=u.updateRanges;if(s.bindBuffer(h,l),d.count===-1&&g.length===0&&s.bufferSubData(h,0,f),g.length!==0){for(let y=0,m=g.length;y<m;y++){let p=g[y];t?s.bufferSubData(h,p.start*f.BYTES_PER_ELEMENT,f,p.start,p.count):s.bufferSubData(h,p.start*f.BYTES_PER_ELEMENT,f.subarray(p.start,p.start+p.count))}u.clearUpdateRanges()}d.count!==-1&&(t?s.bufferSubData(h,d.offset*f.BYTES_PER_ELEMENT,f,d.offset,d.count):s.bufferSubData(h,d.offset*f.BYTES_PER_ELEMENT,f.subarray(d.offset,d.offset+d.count)),d.count=-1),u.onUploadCallback()}function o(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);let u=n.get(l);u&&(s.deleteBuffer(u.buffer),n.delete(l))}function c(l,u){if(l.isGLBufferAttribute){let f=n.get(l);(!f||f.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);let h=n.get(l);if(h===void 0)n.set(l,i(l,u));else if(h.version<l.version){if(h.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(h.buffer,l,u),h.version=l.version}}return{get:o,remove:a,update:c}}function Gb(s,e,t,n,i,r,o){let a=new Tt(0),c=r===!0?0:1,l,u,h=null,f=0,d=null;function g(m,p){let v=!1,_=p.isScene===!0?p.background:null;_&&_.isTexture&&(_=(p.backgroundBlurriness>0?t:e).get(_)),_===null?y(a,c):_&&_.isColor&&(y(_,1),v=!0);let E=s.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,o):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||v)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),_&&(_.isCubeTexture||_.mapping===Gl)?(u===void 0&&(u=new Tn(new qa(1,1,1),new Wi({name:"BackgroundCubeMaterial",uniforms:na(Ps.backgroundCube.uniforms),vertexShader:Ps.backgroundCube.vertexShader,fragmentShader:Ps.backgroundCube.fragmentShader,side:Ui,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,A,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),u.material.uniforms.envMap.value=_,u.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,u.material.toneMapped=En.getTransfer(_.colorSpace)!==Vn,(h!==_||f!==_.version||d!==s.toneMapping)&&(u.material.needsUpdate=!0,h=_,f=_.version,d=s.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new Tn(new oo(2,2),new Wi({name:"BackgroundMaterial",uniforms:na(Ps.background.uniforms),vertexShader:Ps.background.vertexShader,fragmentShader:Ps.background.fragmentShader,side:Vi,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,l.material.toneMapped=En.getTransfer(_.colorSpace)!==Vn,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||f!==_.version||d!==s.toneMapping)&&(l.material.needsUpdate=!0,h=_,f=_.version,d=s.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function y(m,p){m.getRGB(Zc,dg(s)),n.buffers.color.setClear(Zc.r,Zc.g,Zc.b,p,o)}return{getClearColor:function(){return a},setClearColor:function(m,p=1){a.set(m),c=p,y(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,y(a,c)},render:g}}function Wb(s,e,t,n){let i=s.getParameter(s.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||r!==null,a={},c=m(null),l=c,u=!1;function h(N,j,B,ye,be){let ee=!1;if(o){let de=y(ye,B,j);l!==de&&(l=de,d(l.object)),ee=p(N,ye,B,be),ee&&v(N,ye,B,be)}else{let de=j.wireframe===!0;(l.geometry!==ye.id||l.program!==B.id||l.wireframe!==de)&&(l.geometry=ye.id,l.program=B.id,l.wireframe=de,ee=!0)}be!==null&&t.update(be,s.ELEMENT_ARRAY_BUFFER),(ee||u)&&(u=!1,O(N,j,B,ye),be!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(be).buffer))}function f(){return n.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function d(N){return n.isWebGL2?s.bindVertexArray(N):r.bindVertexArrayOES(N)}function g(N){return n.isWebGL2?s.deleteVertexArray(N):r.deleteVertexArrayOES(N)}function y(N,j,B){let ye=B.wireframe===!0,be=a[N.id];be===void 0&&(be={},a[N.id]=be);let ee=be[j.id];ee===void 0&&(ee={},be[j.id]=ee);let de=ee[ye];return de===void 0&&(de=m(f()),ee[ye]=de),de}function m(N){let j=[],B=[],ye=[];for(let be=0;be<i;be++)j[be]=0,B[be]=0,ye[be]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:j,enabledAttributes:B,attributeDivisors:ye,object:N,attributes:{},index:null}}function p(N,j,B,ye){let be=l.attributes,ee=j.attributes,de=0,ze=B.getAttributes();for(let $e in ze)if(ze[$e].location>=0){let Ie=be[$e],Oe=ee[$e];if(Oe===void 0&&($e==="instanceMatrix"&&N.instanceMatrix&&(Oe=N.instanceMatrix),$e==="instanceColor"&&N.instanceColor&&(Oe=N.instanceColor)),Ie===void 0||Ie.attribute!==Oe||Oe&&Ie.data!==Oe.data)return!0;de++}return l.attributesNum!==de||l.index!==ye}function v(N,j,B,ye){let be={},ee=j.attributes,de=0,ze=B.getAttributes();for(let $e in ze)if(ze[$e].location>=0){let Ie=ee[$e];Ie===void 0&&($e==="instanceMatrix"&&N.instanceMatrix&&(Ie=N.instanceMatrix),$e==="instanceColor"&&N.instanceColor&&(Ie=N.instanceColor));let Oe={};Oe.attribute=Ie,Ie&&Ie.data&&(Oe.data=Ie.data),be[$e]=Oe,de++}l.attributes=be,l.attributesNum=de,l.index=ye}function _(){let N=l.newAttributes;for(let j=0,B=N.length;j<B;j++)N[j]=0}function E(N){w(N,0)}function w(N,j){let B=l.newAttributes,ye=l.enabledAttributes,be=l.attributeDivisors;B[N]=1,ye[N]===0&&(s.enableVertexAttribArray(N),ye[N]=1),be[N]!==j&&((n.isWebGL2?s:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](N,j),be[N]=j)}function A(){let N=l.newAttributes,j=l.enabledAttributes;for(let B=0,ye=j.length;B<ye;B++)j[B]!==N[B]&&(s.disableVertexAttribArray(B),j[B]=0)}function R(N,j,B,ye,be,ee,de){de===!0?s.vertexAttribIPointer(N,j,B,be,ee):s.vertexAttribPointer(N,j,B,ye,be,ee)}function O(N,j,B,ye){if(n.isWebGL2===!1&&(N.isInstancedMesh||ye.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;_();let be=ye.attributes,ee=B.getAttributes(),de=j.defaultAttributeValues;for(let ze in ee){let $e=ee[ze];if($e.location>=0){let te=be[ze];if(te===void 0&&(ze==="instanceMatrix"&&N.instanceMatrix&&(te=N.instanceMatrix),ze==="instanceColor"&&N.instanceColor&&(te=N.instanceColor)),te!==void 0){let Ie=te.normalized,Oe=te.itemSize,At=t.get(te);if(At===void 0)continue;let tt=At.buffer,Ht=At.type,Jt=At.bytesPerElement,Nt=n.isWebGL2===!0&&(Ht===s.INT||Ht===s.UNSIGNED_INT||te.gpuType===tg);if(te.isInterleavedBufferAttribute){let _n=te.data,ne=_n.stride,yi=te.offset;if(_n.isInstancedInterleavedBuffer){for(let Bt=0;Bt<$e.locationSize;Bt++)w($e.location+Bt,_n.meshPerAttribute);N.isInstancedMesh!==!0&&ye._maxInstanceCount===void 0&&(ye._maxInstanceCount=_n.meshPerAttribute*_n.count)}else for(let Bt=0;Bt<$e.locationSize;Bt++)E($e.location+Bt);s.bindBuffer(s.ARRAY_BUFFER,tt);for(let Bt=0;Bt<$e.locationSize;Bt++)R($e.location+Bt,Oe/$e.locationSize,Ht,Ie,ne*Jt,(yi+Oe/$e.locationSize*Bt)*Jt,Nt)}else{if(te.isInstancedBufferAttribute){for(let _n=0;_n<$e.locationSize;_n++)w($e.location+_n,te.meshPerAttribute);N.isInstancedMesh!==!0&&ye._maxInstanceCount===void 0&&(ye._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let _n=0;_n<$e.locationSize;_n++)E($e.location+_n);s.bindBuffer(s.ARRAY_BUFFER,tt);for(let _n=0;_n<$e.locationSize;_n++)R($e.location+_n,Oe/$e.locationSize,Ht,Ie,Oe*Jt,Oe/$e.locationSize*_n*Jt,Nt)}}else if(de!==void 0){let Ie=de[ze];if(Ie!==void 0)switch(Ie.length){case 2:s.vertexAttrib2fv($e.location,Ie);break;case 3:s.vertexAttrib3fv($e.location,Ie);break;case 4:s.vertexAttrib4fv($e.location,Ie);break;default:s.vertexAttrib1fv($e.location,Ie)}}}}A()}function b(){X();for(let N in a){let j=a[N];for(let B in j){let ye=j[B];for(let be in ye)g(ye[be].object),delete ye[be];delete j[B]}delete a[N]}}function P(N){if(a[N.id]===void 0)return;let j=a[N.id];for(let B in j){let ye=j[B];for(let be in ye)g(ye[be].object),delete ye[be];delete j[B]}delete a[N.id]}function V(N){for(let j in a){let B=a[j];if(B[N.id]===void 0)continue;let ye=B[N.id];for(let be in ye)g(ye[be].object),delete ye[be];delete B[N.id]}}function X(){se(),u=!0,l!==c&&(l=c,d(l.object))}function se(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:h,reset:X,resetDefaultState:se,dispose:b,releaseStatesOfGeometry:P,releaseStatesOfProgram:V,initAttributes:_,enableAttribute:E,disableUnusedAttributes:A}}function Xb(s,e,t,n){let i=n.isWebGL2,r;function o(u){r=u}function a(u,h){s.drawArrays(r,u,h),t.update(h,r,1)}function c(u,h,f){if(f===0)return;let d,g;if(i)d=s,g="drawArraysInstanced";else if(d=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[g](r,u,h,f),t.update(h,r,f)}function l(u,h,f){if(f===0)return;let d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<f;g++)this.render(u[g],h[g]);else{d.multiDrawArraysWEBGL(r,u,0,h,0,f);let g=0;for(let y=0;y<f;y++)g+=h[y];t.update(g,r,1)}}this.setMode=o,this.render=a,this.renderInstances=c,this.renderMultiDraw=l}function qb(s,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){let R=e.get("EXT_texture_filter_anisotropic");n=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let o=typeof WebGL2RenderingContext!="undefined"&&s.constructor.name==="WebGL2RenderingContext",a=t.precision!==void 0?t.precision:"highp",c=r(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);let l=o||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,h=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),d=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),y=s.getParameter(s.MAX_VERTEX_ATTRIBS),m=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),p=s.getParameter(s.MAX_VARYING_VECTORS),v=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),_=f>0,E=o||e.has("OES_texture_float"),w=_&&E,A=o?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:l,getMaxAnisotropy:i,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:f,maxTextureSize:d,maxCubemapSize:g,maxAttributes:y,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:v,vertexTextures:_,floatFragmentTextures:E,floatVertexTextures:w,maxSamples:A}}function Yb(s){let e=this,t=null,n=0,i=!1,r=!1,o=new ss,a=new dn,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){let d=h.length!==0||f||n!==0||i;return i=f,n=h.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,d){let g=h.clippingPlanes,y=h.clipIntersection,m=h.clipShadows,p=s.get(h);if(!i||g===null||g.length===0||r&&!m)r?u(null):l();else{let v=r?0:n,_=v*4,E=p.clippingState||null;c.value=E,E=u(g,f,_,d);for(let w=0;w!==_;++w)E[w]=t[w];p.clippingState=E,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,f,d,g){let y=h!==null?h.length:0,m=null;if(y!==0){if(m=c.value,g!==!0||m===null){let p=d+y*4,v=f.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let _=0,E=d;_!==y;++_,E+=4)o.copy(h[_]).applyMatrix4(v,a),o.normal.toArray(m,E),m[E+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,m}}function jb(s){let e=new WeakMap;function t(o,a){return a===wh?o.mapping=jo:a===Ah&&(o.mapping=Zo),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===wh||a===Ah)if(e.has(o)){let c=e.get(o).texture;return t(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new Dh(c.height/2);return l.fromEquirectangularTexture(s,o),e.set(o,l),o.addEventListener("dispose",i),t(l.texture,o.mapping)}else return null}}return o}function i(o){let a=o.target;a.removeEventListener("dispose",i);let c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}function Zb(s){let e=[],t=[],n=[],i=s,r=s-Vo+1+am.length;for(let o=0;o<r;o++){let a=Math.pow(2,i);t.push(a);let c=1/a;o>s-Vo?c=am[o-s+Vo-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),u=-l,h=1+l,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,g=6,y=3,m=2,p=1,v=new Float32Array(y*g*d),_=new Float32Array(m*g*d),E=new Float32Array(p*g*d);for(let A=0;A<d;A++){let R=A%3*2/3-1,O=A>2?0:-1,b=[R,O,0,R+2/3,O,0,R+2/3,O+1,0,R,O,0,R+2/3,O+1,0,R,O+1,0];v.set(b,y*g*A),_.set(f,m*g*A);let P=[A,A,A,A,A,A];E.set(P,p*g*A)}let w=new Ei;w.setAttribute("position",new An(v,y)),w.setAttribute("uv",new An(_,m)),w.setAttribute("faceIndex",new An(E,p)),e.push(w),i>Vo&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function um(s,e,t){let n=new ds(s,e,t);return n.texture.mapping=Gl,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Kc(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function Kb(s,e,t){let n=new Float32Array(Qr),i=new T(0,1,0);return new Wi({name:"SphericalGaussianBlur",defines:{n:Qr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:bf(),fragmentShader:`

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
		`,blending:Mr,depthTest:!1,depthWrite:!1})}function hm(){return new Wi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:bf(),fragmentShader:`

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
		`,blending:Mr,depthTest:!1,depthWrite:!1})}function fm(){return new Wi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:bf(),fragmentShader:`

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
	`}function Jb(s){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===wh||c===Ah,u=c===jo||c===Zo;if(l||u)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let h=e.get(a);return t===null&&(t=new yl(s)),h=l?t.fromEquirectangular(a,h):t.fromCubemap(a,h),e.set(a,h),h.texture}else{if(e.has(a))return e.get(a).texture;{let h=a.image;if(l&&h&&h.height>0||u&&h&&i(h)){t===null&&(t=new yl(s));let f=l?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,f),a.addEventListener("dispose",r),f.texture}else return null}}}return a}function i(a){let c=0,l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function $b(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){let i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Qb(s,e,t,n){let i={},r=new WeakMap;function o(h){let f=h.target;f.index!==null&&e.remove(f.index);for(let g in f.attributes)e.remove(f.attributes[g]);for(let g in f.morphAttributes){let y=f.morphAttributes[g];for(let m=0,p=y.length;m<p;m++)e.remove(y[m])}f.removeEventListener("dispose",o),delete i[f.id];let d=r.get(f);d&&(e.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(h,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,t.memory.geometries++),f}function c(h){let f=h.attributes;for(let g in f)e.update(f[g],s.ARRAY_BUFFER);let d=h.morphAttributes;for(let g in d){let y=d[g];for(let m=0,p=y.length;m<p;m++)e.update(y[m],s.ARRAY_BUFFER)}}function l(h){let f=[],d=h.index,g=h.attributes.position,y=0;if(d!==null){let v=d.array;y=d.version;for(let _=0,E=v.length;_<E;_+=3){let w=v[_+0],A=v[_+1],R=v[_+2];f.push(w,A,A,R,R,w)}}else if(g!==void 0){let v=g.array;y=g.version;for(let _=0,E=v.length/3-1;_<E;_+=3){let w=_+0,A=_+1,R=_+2;f.push(w,A,A,R,R,w)}}else return;let m=new(hg(f)?ta:ea)(f,1);m.version=y;let p=r.get(h);p&&e.remove(p),r.set(h,m)}function u(h){let f=r.get(h);if(f){let d=h.index;d!==null&&f.version<d.version&&l(h)}else l(h);return r.get(h)}return{get:a,update:c,getWireframeAttribute:u}}function eM(s,e,t,n){let i=n.isWebGL2,r;function o(d){r=d}let a,c;function l(d){a=d.type,c=d.bytesPerElement}function u(d,g){s.drawElements(r,g,a,d*c),t.update(g,r,1)}function h(d,g,y){if(y===0)return;let m,p;if(i)m=s,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](r,g,a,d*c,y),t.update(g,r,y)}function f(d,g,y){if(y===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<y;p++)this.render(d[p]/c,g[p]);else{m.multiDrawElementsWEBGL(r,g,0,a,d,0,y);let p=0;for(let v=0;v<y;v++)p+=g[v];t.update(p,r,1)}}this.setMode=o,this.setIndex=l,this.render=u,this.renderInstances=h,this.renderMultiDraw=f}function tM(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function nM(s,e){return s[0]-e[0]}function iM(s,e){return Math.abs(e[1])-Math.abs(s[1])}function sM(s,e,t){let n={},i=new Float32Array(8),r=new WeakMap,o=new Un,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function c(l,u,h){let f=l.morphTargetInfluences;if(e.isWebGL2===!0){let d=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,g=d!==void 0?d.length:0,y=r.get(u);if(y===void 0||y.count!==g){let N=function(){X.dispose(),r.delete(u),u.removeEventListener("dispose",N)};y!==void 0&&y.texture.dispose();let v=u.morphAttributes.position!==void 0,_=u.morphAttributes.normal!==void 0,E=u.morphAttributes.color!==void 0,w=u.morphAttributes.position||[],A=u.morphAttributes.normal||[],R=u.morphAttributes.color||[],O=0;v===!0&&(O=1),_===!0&&(O=2),E===!0&&(O=3);let b=u.attributes.position.count*O,P=1;b>e.maxTextureSize&&(P=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);let V=new Float32Array(b*P*4*g),X=new ml(V,b,P,g);X.type=Ns,X.needsUpdate=!0;let se=O*4;for(let j=0;j<g;j++){let B=w[j],ye=A[j],be=R[j],ee=b*P*4*j;for(let de=0;de<B.count;de++){let ze=de*se;v===!0&&(o.fromBufferAttribute(B,de),V[ee+ze+0]=o.x,V[ee+ze+1]=o.y,V[ee+ze+2]=o.z,V[ee+ze+3]=0),_===!0&&(o.fromBufferAttribute(ye,de),V[ee+ze+4]=o.x,V[ee+ze+5]=o.y,V[ee+ze+6]=o.z,V[ee+ze+7]=0),E===!0&&(o.fromBufferAttribute(be,de),V[ee+ze+8]=o.x,V[ee+ze+9]=o.y,V[ee+ze+10]=o.z,V[ee+ze+11]=be.itemSize===4?o.w:1)}}y={count:g,texture:X,size:new et(b,P)},r.set(u,y),u.addEventListener("dispose",N)}let m=0;for(let v=0;v<f.length;v++)m+=f[v];let p=u.morphTargetsRelative?1:1-m;h.getUniforms().setValue(s,"morphTargetBaseInfluence",p),h.getUniforms().setValue(s,"morphTargetInfluences",f),h.getUniforms().setValue(s,"morphTargetsTexture",y.texture,t),h.getUniforms().setValue(s,"morphTargetsTextureSize",y.size)}else{let d=f===void 0?0:f.length,g=n[u.id];if(g===void 0||g.length!==d){g=[];for(let _=0;_<d;_++)g[_]=[_,0];n[u.id]=g}for(let _=0;_<d;_++){let E=g[_];E[0]=_,E[1]=f[_]}g.sort(iM);for(let _=0;_<8;_++)_<d&&g[_][1]?(a[_][0]=g[_][0],a[_][1]=g[_][1]):(a[_][0]=Number.MAX_SAFE_INTEGER,a[_][1]=0);a.sort(nM);let y=u.morphAttributes.position,m=u.morphAttributes.normal,p=0;for(let _=0;_<8;_++){let E=a[_],w=E[0],A=E[1];w!==Number.MAX_SAFE_INTEGER&&A?(y&&u.getAttribute("morphTarget"+_)!==y[w]&&u.setAttribute("morphTarget"+_,y[w]),m&&u.getAttribute("morphNormal"+_)!==m[w]&&u.setAttribute("morphNormal"+_,m[w]),i[_]=A,p+=A):(y&&u.hasAttribute("morphTarget"+_)===!0&&u.deleteAttribute("morphTarget"+_),m&&u.hasAttribute("morphNormal"+_)===!0&&u.deleteAttribute("morphNormal"+_),i[_]=0)}let v=u.morphTargetsRelative?1:1-p;h.getUniforms().setValue(s,"morphTargetBaseInfluence",v),h.getUniforms().setValue(s,"morphTargetInfluences",i)}}return{update:c}}function rM(s,e,t,n){let i=new WeakMap;function r(c){let l=n.render.frame,u=c.geometry,h=e.get(c,u);if(i.get(h)!==l&&(e.update(h),i.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;i.get(f)!==l&&(f.update(),i.set(f,l))}return h}function o(){i=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}function oa(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=dm[i];if(r===void 0&&(r=new Float32Array(i),dm[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function mi(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function gi(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function ql(s,e){let t=pm[e];t===void 0&&(t=new Int32Array(e),pm[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function oM(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function aM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mi(t,e))return;s.uniform2fv(this.addr,e),gi(t,e)}}function cM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(mi(t,e))return;s.uniform3fv(this.addr,e),gi(t,e)}}function lM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mi(t,e))return;s.uniform4fv(this.addr,e),gi(t,e)}}function uM(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(mi(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),gi(t,e)}else{if(mi(t,n))return;xm.set(n),s.uniformMatrix2fv(this.addr,!1,xm),gi(t,n)}}function hM(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(mi(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),gi(t,e)}else{if(mi(t,n))return;gm.set(n),s.uniformMatrix3fv(this.addr,!1,gm),gi(t,n)}}function fM(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(mi(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),gi(t,e)}else{if(mi(t,n))return;mm.set(n),s.uniformMatrix4fv(this.addr,!1,mm),gi(t,n)}}function dM(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function pM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mi(t,e))return;s.uniform2iv(this.addr,e),gi(t,e)}}function mM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mi(t,e))return;s.uniform3iv(this.addr,e),gi(t,e)}}function gM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mi(t,e))return;s.uniform4iv(this.addr,e),gi(t,e)}}function xM(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function yM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mi(t,e))return;s.uniform2uiv(this.addr,e),gi(t,e)}}function _M(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mi(t,e))return;s.uniform3uiv(this.addr,e),gi(t,e)}}function vM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mi(t,e))return;s.uniform4uiv(this.addr,e),gi(t,e)}}function bM(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r=this.type===s.SAMPLER_2D_SHADOW?gg:mg;t.setTexture2D(e||r,i)}function MM(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||yg,i)}function SM(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||_g,i)}function EM(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||xg,i)}function TM(s){switch(s){case 5126:return oM;case 35664:return aM;case 35665:return cM;case 35666:return lM;case 35674:return uM;case 35675:return hM;case 35676:return fM;case 5124:case 35670:return dM;case 35667:case 35671:return pM;case 35668:case 35672:return mM;case 35669:case 35673:return gM;case 5125:return xM;case 36294:return yM;case 36295:return _M;case 36296:return vM;case 35678:case 36198:case 36298:case 36306:case 35682:return bM;case 35679:case 36299:case 36307:return MM;case 35680:case 36300:case 36308:case 36293:return SM;case 36289:case 36303:case 36311:case 36292:return EM}}function wM(s,e){s.uniform1fv(this.addr,e)}function AM(s,e){let t=oa(e,this.size,2);s.uniform2fv(this.addr,t)}function RM(s,e){let t=oa(e,this.size,3);s.uniform3fv(this.addr,t)}function CM(s,e){let t=oa(e,this.size,4);s.uniform4fv(this.addr,t)}function PM(s,e){let t=oa(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function IM(s,e){let t=oa(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function LM(s,e){let t=oa(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function NM(s,e){s.uniform1iv(this.addr,e)}function DM(s,e){s.uniform2iv(this.addr,e)}function UM(s,e){s.uniform3iv(this.addr,e)}function FM(s,e){s.uniform4iv(this.addr,e)}function BM(s,e){s.uniform1uiv(this.addr,e)}function OM(s,e){s.uniform2uiv(this.addr,e)}function kM(s,e){s.uniform3uiv(this.addr,e)}function zM(s,e){s.uniform4uiv(this.addr,e)}function HM(s,e,t){let n=this.cache,i=e.length,r=ql(t,i);mi(n,r)||(s.uniform1iv(this.addr,r),gi(n,r));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||mg,r[o])}function VM(s,e,t){let n=this.cache,i=e.length,r=ql(t,i);mi(n,r)||(s.uniform1iv(this.addr,r),gi(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||yg,r[o])}function GM(s,e,t){let n=this.cache,i=e.length,r=ql(t,i);mi(n,r)||(s.uniform1iv(this.addr,r),gi(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||_g,r[o])}function WM(s,e,t){let n=this.cache,i=e.length,r=ql(t,i);mi(n,r)||(s.uniform1iv(this.addr,r),gi(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||xg,r[o])}function XM(s){switch(s){case 5126:return wM;case 35664:return AM;case 35665:return RM;case 35666:return CM;case 35674:return PM;case 35675:return IM;case 35676:return LM;case 5124:case 35670:return NM;case 35667:case 35671:return DM;case 35668:case 35672:return UM;case 35669:case 35673:return FM;case 5125:return BM;case 36294:return OM;case 36295:return kM;case 36296:return zM;case 35678:case 36198:case 36298:case 36306:case 35682:return HM;case 35679:case 36299:case 36307:return VM;case 35680:case 36300:case 36308:case 36293:return GM;case 36289:case 36303:case 36311:case 36292:return WM}}function ym(s,e){s.seq.push(e),s.map[e.id]=e}function qM(s,e,t){let n=s.name,i=n.length;for(ph.lastIndex=0;;){let r=ph.exec(n),o=ph.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){ym(t,l===void 0?new Uh(a,s,e):new Fh(a,s,e));break}else{let h=t.map[a];h===void 0&&(h=new Bh(a),ym(t,h)),t=h}}}function _m(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}function ZM(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function KM(s){let e=En.getPrimaries(En.workingColorSpace),t=En.getPrimaries(s),n;switch(e===t?n="":e===hl&&t===ul?n="LinearDisplayP3ToLinearSRGB":e===ul&&t===hl&&(n="LinearSRGBToLinearDisplayP3"),s){case di:case Xl:return[n,"LinearTransferOETF"];case Gn:case _f:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function vm(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";let r=/ERROR: 0:(\d+)/.exec(i);if(r){let o=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+ZM(s.getShaderSource(e),o)}else return i}function JM(s,e){let t=KM(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function $M(s,e){let t;switch(e){case ny:t="Linear";break;case iy:t="Reinhard";break;case sy:t="OptimizedCineon";break;case ry:t="ACESFilmic";break;case ay:t="AgX";break;case oy:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function QM(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Go).join(`
`)}function eS(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Go).join(`
`)}function tS(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function nS(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function Go(s){return s!==""}function bm(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Mm(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}function Oh(s){return s.replace(iS,rS)}function rS(s,e){let t=fn[e];if(t===void 0){let n=sS.get(e);if(n!==void 0)t=fn[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Oh(t)}function Sm(s){return s.replace(oS,aS)}function aS(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Em(s){let e="precision "+s.precision+` float;
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
`),v=[d,Em(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Sr?"#define TONE_MAPPING":"",t.toneMapping!==Sr?fn.tonemapping_pars_fragment:"",t.toneMapping!==Sr?$M("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",fn.colorspace_pars_fragment,JM("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Go).join(`
`)),o=Oh(o),o=bm(o,t),o=Mm(o,t),a=Oh(a),a=bm(a,t),a=Mm(a,t),o=Sm(o),a=Sm(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,v=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Gp?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Gp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);let E=_+p+o,w=_+v+a,A=_m(i,i.VERTEX_SHADER,E),R=_m(i,i.FRAGMENT_SHADER,w);i.attachShader(m,A),i.attachShader(m,R),t.index0AttributeName!==void 0?i.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m);function O(X){if(s.debug.checkShaderErrors){let se=i.getProgramInfoLog(m).trim(),N=i.getShaderInfoLog(A).trim(),j=i.getShaderInfoLog(R).trim(),B=!0,ye=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(B=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,m,A,R);else{let be=vm(i,A,"vertex"),ee=vm(i,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Program Info Log: `+se+`
`+be+`
`+ee)}else se!==""?console.warn("THREE.WebGLProgram: Program Info Log:",se):(N===""||j==="")&&(ye=!1);ye&&(X.diagnostics={runnable:B,programLog:se,vertexShader:{log:N,prefix:p},fragmentShader:{log:j,prefix:v}})}i.deleteShader(A),i.deleteShader(R),b=new qo(i,m),P=nS(i,m)}let b;this.getUniforms=function(){return b===void 0&&O(this),b};let P;this.getAttributes=function(){return P===void 0&&O(this),P};let V=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return V===!1&&(V=i.getProgramParameter(m,YM)),V},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=jM++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=A,this.fragmentShader=R,this}function mS(s,e,t,n,i,r,o){let a=new Xa,c=new kh,l=[],u=i.isWebGL2,h=i.logarithmicDepthBuffer,f=i.vertexTextures,d=i.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(b){return b===0?"uv":`uv${b}`}function m(b,P,V,X,se){let N=X.fog,j=se.geometry,B=b.isMeshStandardMaterial?X.environment:null,ye=(b.isMeshStandardMaterial?t:e).get(b.envMap||B),be=ye&&ye.mapping===Gl?ye.image.height:null,ee=g[b.type];b.precision!==null&&(d=i.getMaxPrecision(b.precision),d!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",d,"instead."));let de=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,ze=de!==void 0?de.length:0,$e=0;j.morphAttributes.position!==void 0&&($e=1),j.morphAttributes.normal!==void 0&&($e=2),j.morphAttributes.color!==void 0&&($e=3);let te,Ie,Oe,At;if(ee){let oi=Ps[ee];te=oi.vertexShader,Ie=oi.fragmentShader}else te=b.vertexShader,Ie=b.fragmentShader,c.update(b),Oe=c.getVertexShaderID(b),At=c.getFragmentShaderID(b);let tt=s.getRenderTarget(),Ht=se.isInstancedMesh===!0,Jt=se.isBatchedMesh===!0,Nt=!!b.map,_n=!!b.matcap,ne=!!ye,yi=!!b.aoMap,Bt=!!b.lightMap,Yt=!!b.bumpMap,Mt=!!b.normalMap,On=!!b.displacementMap,Qt=!!b.emissiveMap,D=!!b.metalnessMap,C=!!b.roughnessMap,ce=b.anisotropy>0,Ce=b.clearcoat>0,Ae=b.iridescence>0,He=b.sheen>0,at=b.transmission>0,Ze=ce&&!!b.anisotropyMap,Ye=Ce&&!!b.clearcoatMap,Dt=Ce&&!!b.clearcoatNormalMap,Vt=Ce&&!!b.clearcoatRoughnessMap,Le=Ae&&!!b.iridescenceMap,Sn=Ae&&!!b.iridescenceThicknessMap,rn=He&&!!b.sheenColorMap,Wt=He&&!!b.sheenRoughnessMap,_t=!!b.specularMap,rt=!!b.specularColorMap,Ot=!!b.specularIntensityMap,Mn=at&&!!b.transmissionMap,Ue=at&&!!b.thicknessMap,Pe=!!b.gradientMap,Fe=!!b.alphaMap,H=b.alphaTest>0,Xe=!!b.alphaHash,ke=!!b.extensions,bt=!!j.attributes.uv1,Ut=!!j.attributes.uv2,on=!!j.attributes.uv3,xn=Sr;return b.toneMapped&&(tt===null||tt.isXRRenderTarget===!0)&&(xn=s.toneMapping),{isWebGL2:u,shaderID:ee,shaderType:b.type,shaderName:b.name,vertexShader:te,fragmentShader:Ie,defines:b.defines,customVertexShaderID:Oe,customFragmentShaderID:At,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:d,batching:Jt,instancing:Ht,instancingColor:Ht&&se.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:tt===null?s.outputColorSpace:tt.isXRRenderTarget===!0?tt.texture.colorSpace:di,map:Nt,matcap:_n,envMap:ne,envMapMode:ne&&ye.mapping,envMapCubeUVHeight:be,aoMap:yi,lightMap:Bt,bumpMap:Yt,normalMap:Mt,displacementMap:f&&On,emissiveMap:Qt,normalMapObjectSpace:Mt&&b.normalMapType===vy,normalMapTangentSpace:Mt&&b.normalMapType===yf,metalnessMap:D,roughnessMap:C,anisotropy:ce,anisotropyMap:Ze,clearcoat:Ce,clearcoatMap:Ye,clearcoatNormalMap:Dt,clearcoatRoughnessMap:Vt,iridescence:Ae,iridescenceMap:Le,iridescenceThicknessMap:Sn,sheen:He,sheenColorMap:rn,sheenRoughnessMap:Wt,specularMap:_t,specularColorMap:rt,specularIntensityMap:Ot,transmission:at,transmissionMap:Mn,thicknessMap:Ue,gradientMap:Pe,opaque:b.transparent===!1&&b.blending===Wo,alphaMap:Fe,alphaTest:H,alphaHash:Xe,combine:b.combine,mapUv:Nt&&y(b.map.channel),aoMapUv:yi&&y(b.aoMap.channel),lightMapUv:Bt&&y(b.lightMap.channel),bumpMapUv:Yt&&y(b.bumpMap.channel),normalMapUv:Mt&&y(b.normalMap.channel),displacementMapUv:On&&y(b.displacementMap.channel),emissiveMapUv:Qt&&y(b.emissiveMap.channel),metalnessMapUv:D&&y(b.metalnessMap.channel),roughnessMapUv:C&&y(b.roughnessMap.channel),anisotropyMapUv:Ze&&y(b.anisotropyMap.channel),clearcoatMapUv:Ye&&y(b.clearcoatMap.channel),clearcoatNormalMapUv:Dt&&y(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Vt&&y(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Le&&y(b.iridescenceMap.channel),iridescenceThicknessMapUv:Sn&&y(b.iridescenceThicknessMap.channel),sheenColorMapUv:rn&&y(b.sheenColorMap.channel),sheenRoughnessMapUv:Wt&&y(b.sheenRoughnessMap.channel),specularMapUv:_t&&y(b.specularMap.channel),specularColorMapUv:rt&&y(b.specularColorMap.channel),specularIntensityMapUv:Ot&&y(b.specularIntensityMap.channel),transmissionMapUv:Mn&&y(b.transmissionMap.channel),thicknessMapUv:Ue&&y(b.thicknessMap.channel),alphaMapUv:Fe&&y(b.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(Mt||ce),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,vertexUv1s:bt,vertexUv2s:Ut,vertexUv3s:on,pointsUvs:se.isPoints===!0&&!!j.attributes.uv&&(Nt||Fe),fog:!!N,useFog:b.fog===!0,fogExp2:N&&N.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:se.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:ze,morphTextureStride:$e,numDirLights:P.directional.length,numPointLights:P.point.length,numSpotLights:P.spot.length,numSpotLightMaps:P.spotLightMap.length,numRectAreaLights:P.rectArea.length,numHemiLights:P.hemi.length,numDirLightShadows:P.directionalShadowMap.length,numPointLightShadows:P.pointShadowMap.length,numSpotLightShadows:P.spotShadowMap.length,numSpotLightShadowsWithMaps:P.numSpotLightShadowsWithMaps,numLightProbes:P.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:s.shadowMap.enabled&&V.length>0,shadowMapType:s.shadowMap.type,toneMapping:xn,useLegacyLights:s._useLegacyLights,decodeVideoTexture:Nt&&b.map.isVideoTexture===!0&&En.getTransfer(b.map.colorSpace)===Vn,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Si,flipSided:b.side===Ui,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionDerivatives:ke&&b.extensions.derivatives===!0,extensionFragDepth:ke&&b.extensions.fragDepth===!0,extensionDrawBuffers:ke&&b.extensions.drawBuffers===!0,extensionShaderTextureLOD:ke&&b.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ke&&b.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()}}function p(b){let P=[];if(b.shaderID?P.push(b.shaderID):(P.push(b.customVertexShaderID),P.push(b.customFragmentShaderID)),b.defines!==void 0)for(let V in b.defines)P.push(V),P.push(b.defines[V]);return b.isRawShaderMaterial===!1&&(v(P,b),_(P,b),P.push(s.outputColorSpace)),P.push(b.customProgramCacheKey),P.join()}function v(b,P){b.push(P.precision),b.push(P.outputColorSpace),b.push(P.envMapMode),b.push(P.envMapCubeUVHeight),b.push(P.mapUv),b.push(P.alphaMapUv),b.push(P.lightMapUv),b.push(P.aoMapUv),b.push(P.bumpMapUv),b.push(P.normalMapUv),b.push(P.displacementMapUv),b.push(P.emissiveMapUv),b.push(P.metalnessMapUv),b.push(P.roughnessMapUv),b.push(P.anisotropyMapUv),b.push(P.clearcoatMapUv),b.push(P.clearcoatNormalMapUv),b.push(P.clearcoatRoughnessMapUv),b.push(P.iridescenceMapUv),b.push(P.iridescenceThicknessMapUv),b.push(P.sheenColorMapUv),b.push(P.sheenRoughnessMapUv),b.push(P.specularMapUv),b.push(P.specularColorMapUv),b.push(P.specularIntensityMapUv),b.push(P.transmissionMapUv),b.push(P.thicknessMapUv),b.push(P.combine),b.push(P.fogExp2),b.push(P.sizeAttenuation),b.push(P.morphTargetsCount),b.push(P.morphAttributeCount),b.push(P.numDirLights),b.push(P.numPointLights),b.push(P.numSpotLights),b.push(P.numSpotLightMaps),b.push(P.numHemiLights),b.push(P.numRectAreaLights),b.push(P.numDirLightShadows),b.push(P.numPointLightShadows),b.push(P.numSpotLightShadows),b.push(P.numSpotLightShadowsWithMaps),b.push(P.numLightProbes),b.push(P.shadowMapType),b.push(P.toneMapping),b.push(P.numClippingPlanes),b.push(P.numClipIntersection),b.push(P.depthPacking)}function _(b,P){a.disableAll(),P.isWebGL2&&a.enable(0),P.supportsVertexTextures&&a.enable(1),P.instancing&&a.enable(2),P.instancingColor&&a.enable(3),P.matcap&&a.enable(4),P.envMap&&a.enable(5),P.normalMapObjectSpace&&a.enable(6),P.normalMapTangentSpace&&a.enable(7),P.clearcoat&&a.enable(8),P.iridescence&&a.enable(9),P.alphaTest&&a.enable(10),P.vertexColors&&a.enable(11),P.vertexAlphas&&a.enable(12),P.vertexUv1s&&a.enable(13),P.vertexUv2s&&a.enable(14),P.vertexUv3s&&a.enable(15),P.vertexTangents&&a.enable(16),P.anisotropy&&a.enable(17),P.alphaHash&&a.enable(18),P.batching&&a.enable(19),b.push(a.mask),a.disableAll(),P.fog&&a.enable(0),P.useFog&&a.enable(1),P.flatShading&&a.enable(2),P.logarithmicDepthBuffer&&a.enable(3),P.skinning&&a.enable(4),P.morphTargets&&a.enable(5),P.morphNormals&&a.enable(6),P.morphColors&&a.enable(7),P.premultipliedAlpha&&a.enable(8),P.shadowMapEnabled&&a.enable(9),P.useLegacyLights&&a.enable(10),P.doubleSided&&a.enable(11),P.flipSided&&a.enable(12),P.useDepthPacking&&a.enable(13),P.dithering&&a.enable(14),P.transmission&&a.enable(15),P.sheen&&a.enable(16),P.opaque&&a.enable(17),P.pointsUvs&&a.enable(18),P.decodeVideoTexture&&a.enable(19),b.push(a.mask)}function E(b){let P=g[b.type],V;if(P){let X=Ps[P];V=s_.clone(X.uniforms)}else V=b.uniforms;return V}function w(b,P){let V;for(let X=0,se=l.length;X<se;X++){let N=l[X];if(N.cacheKey===P){V=N,++V.usedTimes;break}}return V===void 0&&(V=new dS(s,P,b,r),l.push(V)),V}function A(b){if(--b.usedTimes===0){let P=l.indexOf(b);l[P]=l[l.length-1],l.pop(),b.destroy()}}function R(b){c.remove(b)}function O(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:E,acquireProgram:w,releaseProgram:A,releaseShaderCache:R,programs:l,dispose:O}}function gS(){let s=new WeakMap;function e(r){let o=s.get(r);return o===void 0&&(o={},s.set(r,o)),o}function t(r){s.delete(r)}function n(r,o,a){s.get(r)[o]=a}function i(){s=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function xS(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Tm(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function wm(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(h,f,d,g,y,m){let p=s[e];return p===void 0?(p={id:h.id,object:h,geometry:f,material:d,groupOrder:g,renderOrder:h.renderOrder,z:y,group:m},s[e]=p):(p.id=h.id,p.object=h,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=y,p.group=m),e++,p}function a(h,f,d,g,y,m){let p=o(h,f,d,g,y,m);d.transmission>0?n.push(p):d.transparent===!0?i.push(p):t.push(p)}function c(h,f,d,g,y,m){let p=o(h,f,d,g,y,m);d.transmission>0?n.unshift(p):d.transparent===!0?i.unshift(p):t.unshift(p)}function l(h,f){t.length>1&&t.sort(h||xS),n.length>1&&n.sort(f||Tm),i.length>1&&i.sort(f||Tm)}function u(){for(let h=e,f=s.length;h<f;h++){let d=s[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:a,unshift:c,finish:u,sort:l}}function yS(){let s=new WeakMap;function e(n,i){let r=s.get(n),o;return r===void 0?(o=new wm,s.set(n,[o])):i>=r.length?(o=new wm,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function _S(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new T,color:new Tt};break;case"SpotLight":t={position:new T,direction:new T,color:new Tt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new T,color:new Tt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new T,skyColor:new Tt,groundColor:new Tt};break;case"RectAreaLight":t={color:new Tt,position:new T,halfWidth:new T,halfHeight:new T};break}return s[e.id]=t,t}}}function vS(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}function MS(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function SS(s,e){let t=new _S,n=vS(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new T);let r=new T,o=new vt,a=new vt;function c(u,h){let f=0,d=0,g=0;for(let X=0;X<9;X++)i.probe[X].set(0,0,0);let y=0,m=0,p=0,v=0,_=0,E=0,w=0,A=0,R=0,O=0,b=0;u.sort(MS);let P=h===!0?Math.PI:1;for(let X=0,se=u.length;X<se;X++){let N=u[X],j=N.color,B=N.intensity,ye=N.distance,be=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)f+=j.r*B*P,d+=j.g*B*P,g+=j.b*B*P;else if(N.isLightProbe){for(let ee=0;ee<9;ee++)i.probe[ee].addScaledVector(N.sh.coefficients[ee],B);b++}else if(N.isDirectionalLight){let ee=t.get(N);if(ee.color.copy(N.color).multiplyScalar(N.intensity*P),N.castShadow){let de=N.shadow,ze=n.get(N);ze.shadowBias=de.bias,ze.shadowNormalBias=de.normalBias,ze.shadowRadius=de.radius,ze.shadowMapSize=de.mapSize,i.directionalShadow[y]=ze,i.directionalShadowMap[y]=be,i.directionalShadowMatrix[y]=N.shadow.matrix,E++}i.directional[y]=ee,y++}else if(N.isSpotLight){let ee=t.get(N);ee.position.setFromMatrixPosition(N.matrixWorld),ee.color.copy(j).multiplyScalar(B*P),ee.distance=ye,ee.coneCos=Math.cos(N.angle),ee.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),ee.decay=N.decay,i.spot[p]=ee;let de=N.shadow;if(N.map&&(i.spotLightMap[R]=N.map,R++,de.updateMatrices(N),N.castShadow&&O++),i.spotLightMatrix[p]=de.matrix,N.castShadow){let ze=n.get(N);ze.shadowBias=de.bias,ze.shadowNormalBias=de.normalBias,ze.shadowRadius=de.radius,ze.shadowMapSize=de.mapSize,i.spotShadow[p]=ze,i.spotShadowMap[p]=be,A++}p++}else if(N.isRectAreaLight){let ee=t.get(N);ee.color.copy(j).multiplyScalar(B),ee.halfWidth.set(N.width*.5,0,0),ee.halfHeight.set(0,N.height*.5,0),i.rectArea[v]=ee,v++}else if(N.isPointLight){let ee=t.get(N);if(ee.color.copy(N.color).multiplyScalar(N.intensity*P),ee.distance=N.distance,ee.decay=N.decay,N.castShadow){let de=N.shadow,ze=n.get(N);ze.shadowBias=de.bias,ze.shadowNormalBias=de.normalBias,ze.shadowRadius=de.radius,ze.shadowMapSize=de.mapSize,ze.shadowCameraNear=de.camera.near,ze.shadowCameraFar=de.camera.far,i.pointShadow[m]=ze,i.pointShadowMap[m]=be,i.pointShadowMatrix[m]=N.shadow.matrix,w++}i.point[m]=ee,m++}else if(N.isHemisphereLight){let ee=t.get(N);ee.skyColor.copy(N.color).multiplyScalar(B*P),ee.groundColor.copy(N.groundColor).multiplyScalar(B*P),i.hemi[_]=ee,_++}}v>0&&(e.isWebGL2?s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=je.LTC_FLOAT_1,i.rectAreaLTC2=je.LTC_FLOAT_2):(i.rectAreaLTC1=je.LTC_HALF_1,i.rectAreaLTC2=je.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=je.LTC_FLOAT_1,i.rectAreaLTC2=je.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=je.LTC_HALF_1,i.rectAreaLTC2=je.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=f,i.ambient[1]=d,i.ambient[2]=g;let V=i.hash;(V.directionalLength!==y||V.pointLength!==m||V.spotLength!==p||V.rectAreaLength!==v||V.hemiLength!==_||V.numDirectionalShadows!==E||V.numPointShadows!==w||V.numSpotShadows!==A||V.numSpotMaps!==R||V.numLightProbes!==b)&&(i.directional.length=y,i.spot.length=p,i.rectArea.length=v,i.point.length=m,i.hemi.length=_,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=A,i.spotShadowMap.length=A,i.directionalShadowMatrix.length=E,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=A+R-O,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=O,i.numLightProbes=b,V.directionalLength=y,V.pointLength=m,V.spotLength=p,V.rectAreaLength=v,V.hemiLength=_,V.numDirectionalShadows=E,V.numPointShadows=w,V.numSpotShadows=A,V.numSpotMaps=R,V.numLightProbes=b,i.version=bS++)}function l(u,h){let f=0,d=0,g=0,y=0,m=0,p=h.matrixWorldInverse;for(let v=0,_=u.length;v<_;v++){let E=u[v];if(E.isDirectionalLight){let w=i.directional[f];w.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(p),f++}else if(E.isSpotLight){let w=i.spot[g];w.position.setFromMatrixPosition(E.matrixWorld),w.position.applyMatrix4(p),w.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(p),g++}else if(E.isRectAreaLight){let w=i.rectArea[y];w.position.setFromMatrixPosition(E.matrixWorld),w.position.applyMatrix4(p),a.identity(),o.copy(E.matrixWorld),o.premultiply(p),a.extractRotation(o),w.halfWidth.set(E.width*.5,0,0),w.halfHeight.set(0,E.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),y++}else if(E.isPointLight){let w=i.point[d];w.position.setFromMatrixPosition(E.matrixWorld),w.position.applyMatrix4(p),d++}else if(E.isHemisphereLight){let w=i.hemi[m];w.direction.setFromMatrixPosition(E.matrixWorld),w.direction.transformDirection(p),m++}}}return{setup:c,setupView:l,state:i}}function Am(s,e){let t=new SS(s,e),n=[],i=[];function r(){n.length=0,i.length=0}function o(h){n.push(h)}function a(h){i.push(h)}function c(h){t.setup(n,h)}function l(h){t.setupView(n,h)}return{init:r,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function ES(s,e){let t=new WeakMap;function n(r,o=0){let a=t.get(r),c;return a===void 0?(c=new Am(s,e),t.set(r,[c])):o>=a.length?(c=new Am(s,e),a.push(c)):c=a[o],c}function i(){t=new WeakMap}return{get:n,dispose:i}}function AS(s,e,t){let n=new Ar,i=new et,r=new et,o=new Un,a=new Hh({depthPacking:_y}),c=new Vh,l={},u=t.maxTextureSize,h={[Vi]:Ui,[Ui]:Vi,[Si]:Si},f=new Wi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new et},radius:{value:4}},vertexShader:TS,fragmentShader:wS}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let g=new Ei;g.setAttribute("position",new An(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new Tn(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Qm;let p=this.type;this.render=function(A,R,O){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;let b=s.getRenderTarget(),P=s.getActiveCubeFace(),V=s.getActiveMipmapLevel(),X=s.state;X.setBlending(Mr),X.buffers.color.setClear(1,1,1,1),X.buffers.depth.setTest(!0),X.setScissorTest(!1);let se=p!==tr&&this.type===tr,N=p===tr&&this.type!==tr;for(let j=0,B=A.length;j<B;j++){let ye=A[j],be=ye.shadow;if(be===void 0){console.warn("THREE.WebGLShadowMap:",ye,"has no shadow.");continue}if(be.autoUpdate===!1&&be.needsUpdate===!1)continue;i.copy(be.mapSize);let ee=be.getFrameExtents();if(i.multiply(ee),r.copy(be.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(r.x=Math.floor(u/ee.x),i.x=r.x*ee.x,be.mapSize.x=r.x),i.y>u&&(r.y=Math.floor(u/ee.y),i.y=r.y*ee.y,be.mapSize.y=r.y)),be.map===null||se===!0||N===!0){let ze=this.type!==tr?{minFilter:ui,magFilter:ui}:{};be.map!==null&&be.map.dispose(),be.map=new ds(i.x,i.y,ze),be.map.texture.name=ye.name+".shadowMap",be.camera.updateProjectionMatrix()}s.setRenderTarget(be.map),s.clear();let de=be.getViewportCount();for(let ze=0;ze<de;ze++){let $e=be.getViewport(ze);o.set(r.x*$e.x,r.y*$e.y,r.x*$e.z,r.y*$e.w),X.viewport(o),be.updateMatrices(ye,ze),n=be.getFrustum(),E(R,O,be.camera,ye,this.type)}be.isPointLightShadow!==!0&&this.type===tr&&v(be,O),be.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(b,P,V)};function v(A,R){let O=e.update(y);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,d.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new ds(i.x,i.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,s.setRenderTarget(A.mapPass),s.clear(),s.renderBufferDirect(R,null,O,f,y,null),d.uniforms.shadow_pass.value=A.mapPass.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,s.setRenderTarget(A.map),s.clear(),s.renderBufferDirect(R,null,O,d,y,null)}function _(A,R,O,b){let P=null,V=O.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(V!==void 0)P=V;else if(P=O.isPointLight===!0?c:a,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){let X=P.uuid,se=R.uuid,N=l[X];N===void 0&&(N={},l[X]=N);let j=N[se];j===void 0&&(j=P.clone(),N[se]=j,R.addEventListener("dispose",w)),P=j}if(P.visible=R.visible,P.wireframe=R.wireframe,b===tr?P.side=R.shadowSide!==null?R.shadowSide:R.side:P.side=R.shadowSide!==null?R.shadowSide:h[R.side],P.alphaMap=R.alphaMap,P.alphaTest=R.alphaTest,P.map=R.map,P.clipShadows=R.clipShadows,P.clippingPlanes=R.clippingPlanes,P.clipIntersection=R.clipIntersection,P.displacementMap=R.displacementMap,P.displacementScale=R.displacementScale,P.displacementBias=R.displacementBias,P.wireframeLinewidth=R.wireframeLinewidth,P.linewidth=R.linewidth,O.isPointLight===!0&&P.isMeshDistanceMaterial===!0){let X=s.properties.get(P);X.light=O}return P}function E(A,R,O,b,P){if(A.visible===!1)return;if(A.layers.test(R.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&P===tr)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,A.matrixWorld);let se=e.update(A),N=A.material;if(Array.isArray(N)){let j=se.groups;for(let B=0,ye=j.length;B<ye;B++){let be=j[B],ee=N[be.materialIndex];if(ee&&ee.visible){let de=_(A,ee,b,P);A.onBeforeShadow(s,A,R,O,se,de,be),s.renderBufferDirect(O,null,se,de,A,be),A.onAfterShadow(s,A,R,O,se,de,be)}}}else if(N.visible){let j=_(A,N,b,P);A.onBeforeShadow(s,A,R,O,se,j,null),s.renderBufferDirect(O,null,se,j,A,null),A.onAfterShadow(s,A,R,O,se,j,null)}}let X=A.children;for(let se=0,N=X.length;se<N;se++)E(X[se],R,O,b,P)}function w(A){A.target.removeEventListener("dispose",w);for(let O in l){let b=l[O],P=A.target.uuid;P in b&&(b[P].dispose(),delete b[P])}}}function RS(s,e,t){let n=t.isWebGL2;function i(){let H=!1,Xe=new Un,ke=null,bt=new Un(0,0,0,0);return{setMask:function(Ut){ke!==Ut&&!H&&(s.colorMask(Ut,Ut,Ut,Ut),ke=Ut)},setLocked:function(Ut){H=Ut},setClear:function(Ut,on,xn,Zn,oi){oi===!0&&(Ut*=Zn,on*=Zn,xn*=Zn),Xe.set(Ut,on,xn,Zn),bt.equals(Xe)===!1&&(s.clearColor(Ut,on,xn,Zn),bt.copy(Xe))},reset:function(){H=!1,ke=null,bt.set(-1,0,0,0)}}}function r(){let H=!1,Xe=null,ke=null,bt=null;return{setTest:function(Ut){Ut?Jt(s.DEPTH_TEST):Nt(s.DEPTH_TEST)},setMask:function(Ut){Xe!==Ut&&!H&&(s.depthMask(Ut),Xe=Ut)},setFunc:function(Ut){if(ke!==Ut){switch(Ut){case jx:s.depthFunc(s.NEVER);break;case Zx:s.depthFunc(s.ALWAYS);break;case Kx:s.depthFunc(s.LESS);break;case al:s.depthFunc(s.LEQUAL);break;case Jx:s.depthFunc(s.EQUAL);break;case $x:s.depthFunc(s.GEQUAL);break;case pf:s.depthFunc(s.GREATER);break;case Qx:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ke=Ut}},setLocked:function(Ut){H=Ut},setClear:function(Ut){bt!==Ut&&(s.clearDepth(Ut),bt=Ut)},reset:function(){H=!1,Xe=null,ke=null,bt=null}}}function o(){let H=!1,Xe=null,ke=null,bt=null,Ut=null,on=null,xn=null,Zn=null,oi=null;return{setTest:function(Rn){H||(Rn?Jt(s.STENCIL_TEST):Nt(s.STENCIL_TEST))},setMask:function(Rn){Xe!==Rn&&!H&&(s.stencilMask(Rn),Xe=Rn)},setFunc:function(Rn,_i,es){(ke!==Rn||bt!==_i||Ut!==es)&&(s.stencilFunc(Rn,_i,es),ke=Rn,bt=_i,Ut=es)},setOp:function(Rn,_i,es){(on!==Rn||xn!==_i||Zn!==es)&&(s.stencilOp(Rn,_i,es),on=Rn,xn=_i,Zn=es)},setLocked:function(Rn){H=Rn},setClear:function(Rn){oi!==Rn&&(s.clearStencil(Rn),oi=Rn)},reset:function(){H=!1,Xe=null,ke=null,bt=null,Ut=null,on=null,xn=null,Zn=null,oi=null}}}let a=new i,c=new r,l=new o,u=new WeakMap,h=new WeakMap,f={},d={},g=new WeakMap,y=[],m=null,p=!1,v=null,_=null,E=null,w=null,A=null,R=null,O=null,b=new Tt(0,0,0),P=0,V=!1,X=null,se=null,N=null,j=null,B=null,ye=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),be=!1,ee=0,de=s.getParameter(s.VERSION);de.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(de)[1]),be=ee>=1):de.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(de)[1]),be=ee>=2);let ze=null,$e={},te=s.getParameter(s.SCISSOR_BOX),Ie=s.getParameter(s.VIEWPORT),Oe=new Un().fromArray(te),At=new Un().fromArray(Ie);function tt(H,Xe,ke,bt){let Ut=new Uint8Array(4),on=s.createTexture();s.bindTexture(H,on),s.texParameteri(H,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(H,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let xn=0;xn<ke;xn++)n&&(H===s.TEXTURE_3D||H===s.TEXTURE_2D_ARRAY)?s.texImage3D(Xe,0,s.RGBA,1,1,bt,0,s.RGBA,s.UNSIGNED_BYTE,Ut):s.texImage2D(Xe+xn,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Ut);return on}let Ht={};Ht[s.TEXTURE_2D]=tt(s.TEXTURE_2D,s.TEXTURE_2D,1),Ht[s.TEXTURE_CUBE_MAP]=tt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Ht[s.TEXTURE_2D_ARRAY]=tt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Ht[s.TEXTURE_3D]=tt(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),c.setClear(1),l.setClear(0),Jt(s.DEPTH_TEST),c.setFunc(al),Qt(!1),D(ap),Jt(s.CULL_FACE),Mt(Mr);function Jt(H){f[H]!==!0&&(s.enable(H),f[H]=!0)}function Nt(H){f[H]!==!1&&(s.disable(H),f[H]=!1)}function _n(H,Xe){return d[H]!==Xe?(s.bindFramebuffer(H,Xe),d[H]=Xe,n&&(H===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=Xe),H===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=Xe)),!0):!1}function ne(H,Xe){let ke=y,bt=!1;if(H)if(ke=g.get(Xe),ke===void 0&&(ke=[],g.set(Xe,ke)),H.isWebGLMultipleRenderTargets){let Ut=H.texture;if(ke.length!==Ut.length||ke[0]!==s.COLOR_ATTACHMENT0){for(let on=0,xn=Ut.length;on<xn;on++)ke[on]=s.COLOR_ATTACHMENT0+on;ke.length=Ut.length,bt=!0}}else ke[0]!==s.COLOR_ATTACHMENT0&&(ke[0]=s.COLOR_ATTACHMENT0,bt=!0);else ke[0]!==s.BACK&&(ke[0]=s.BACK,bt=!0);bt&&(t.isWebGL2?s.drawBuffers(ke):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ke))}function yi(H){return m!==H?(s.useProgram(H),m=H,!0):!1}let Bt={[Is]:s.FUNC_ADD,[Ux]:s.FUNC_SUBTRACT,[Fx]:s.FUNC_REVERSE_SUBTRACT};if(n)Bt[hp]=s.MIN,Bt[fp]=s.MAX;else{let H=e.get("EXT_blend_minmax");H!==null&&(Bt[hp]=H.MIN_EXT,Bt[fp]=H.MAX_EXT)}let Yt={[Hl]:s.ZERO,[Vl]:s.ONE,[Bx]:s.SRC_COLOR,[Yo]:s.SRC_ALPHA,[Gx]:s.SRC_ALPHA_SATURATE,[Hx]:s.DST_COLOR,[kx]:s.DST_ALPHA,[Ox]:s.ONE_MINUS_SRC_COLOR,[Th]:s.ONE_MINUS_SRC_ALPHA,[Vx]:s.ONE_MINUS_DST_COLOR,[zx]:s.ONE_MINUS_DST_ALPHA,[Wx]:s.CONSTANT_COLOR,[Xx]:s.ONE_MINUS_CONSTANT_COLOR,[qx]:s.CONSTANT_ALPHA,[Yx]:s.ONE_MINUS_CONSTANT_ALPHA};function Mt(H,Xe,ke,bt,Ut,on,xn,Zn,oi,Rn){if(H===Mr){p===!0&&(Nt(s.BLEND),p=!1);return}if(p===!1&&(Jt(s.BLEND),p=!0),H!==zl){if(H!==v||Rn!==V){if((_!==Is||A!==Is)&&(s.blendEquation(s.FUNC_ADD),_=Is,A=Is),Rn)switch(H){case Wo:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case cp:s.blendFunc(s.ONE,s.ONE);break;case lp:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case up:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}else switch(H){case Wo:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case cp:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case lp:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case up:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}E=null,w=null,R=null,O=null,b.set(0,0,0),P=0,v=H,V=Rn}return}Ut=Ut||Xe,on=on||ke,xn=xn||bt,(Xe!==_||Ut!==A)&&(s.blendEquationSeparate(Bt[Xe],Bt[Ut]),_=Xe,A=Ut),(ke!==E||bt!==w||on!==R||xn!==O)&&(s.blendFuncSeparate(Yt[ke],Yt[bt],Yt[on],Yt[xn]),E=ke,w=bt,R=on,O=xn),(Zn.equals(b)===!1||oi!==P)&&(s.blendColor(Zn.r,Zn.g,Zn.b,oi),b.copy(Zn),P=oi),v=H,V=!1}function On(H,Xe){H.side===Si?Nt(s.CULL_FACE):Jt(s.CULL_FACE);let ke=H.side===Ui;Xe&&(ke=!ke),Qt(ke),H.blending===Wo&&H.transparent===!1?Mt(Mr):Mt(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),c.setFunc(H.depthFunc),c.setTest(H.depthTest),c.setMask(H.depthWrite),a.setMask(H.colorWrite);let bt=H.stencilWrite;l.setTest(bt),bt&&(l.setMask(H.stencilWriteMask),l.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),l.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),ce(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?Jt(s.SAMPLE_ALPHA_TO_COVERAGE):Nt(s.SAMPLE_ALPHA_TO_COVERAGE)}function Qt(H){X!==H&&(H?s.frontFace(s.CW):s.frontFace(s.CCW),X=H)}function D(H){H!==Lx?(Jt(s.CULL_FACE),H!==se&&(H===ap?s.cullFace(s.BACK):H===Nx?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Nt(s.CULL_FACE),se=H}function C(H){H!==N&&(be&&s.lineWidth(H),N=H)}function ce(H,Xe,ke){H?(Jt(s.POLYGON_OFFSET_FILL),(j!==Xe||B!==ke)&&(s.polygonOffset(Xe,ke),j=Xe,B=ke)):Nt(s.POLYGON_OFFSET_FILL)}function Ce(H){H?Jt(s.SCISSOR_TEST):Nt(s.SCISSOR_TEST)}function Ae(H){H===void 0&&(H=s.TEXTURE0+ye-1),ze!==H&&(s.activeTexture(H),ze=H)}function He(H,Xe,ke){ke===void 0&&(ze===null?ke=s.TEXTURE0+ye-1:ke=ze);let bt=$e[ke];bt===void 0&&(bt={type:void 0,texture:void 0},$e[ke]=bt),(bt.type!==H||bt.texture!==Xe)&&(ze!==ke&&(s.activeTexture(ke),ze=ke),s.bindTexture(H,Xe||Ht[H]),bt.type=H,bt.texture=Xe)}function at(){let H=$e[ze];H!==void 0&&H.type!==void 0&&(s.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function Ze(){try{s.compressedTexImage2D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Ye(){try{s.compressedTexImage3D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Dt(){try{s.texSubImage2D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Vt(){try{s.texSubImage3D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Le(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Sn(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function rn(){try{s.texStorage2D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Wt(){try{s.texStorage3D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function _t(){try{s.texImage2D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function rt(){try{s.texImage3D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Ot(H){Oe.equals(H)===!1&&(s.scissor(H.x,H.y,H.z,H.w),Oe.copy(H))}function Mn(H){At.equals(H)===!1&&(s.viewport(H.x,H.y,H.z,H.w),At.copy(H))}function Ue(H,Xe){let ke=h.get(Xe);ke===void 0&&(ke=new WeakMap,h.set(Xe,ke));let bt=ke.get(H);bt===void 0&&(bt=s.getUniformBlockIndex(Xe,H.name),ke.set(H,bt))}function Pe(H,Xe){let bt=h.get(Xe).get(H);u.get(Xe)!==bt&&(s.uniformBlockBinding(Xe,bt,H.__bindingPointIndex),u.set(Xe,bt))}function Fe(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),n===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),f={},ze=null,$e={},d={},g=new WeakMap,y=[],m=null,p=!1,v=null,_=null,E=null,w=null,A=null,R=null,O=null,b=new Tt(0,0,0),P=0,V=!1,X=null,se=null,N=null,j=null,B=null,Oe.set(0,0,s.canvas.width,s.canvas.height),At.set(0,0,s.canvas.width,s.canvas.height),a.reset(),c.reset(),l.reset()}return{buffers:{color:a,depth:c,stencil:l},enable:Jt,disable:Nt,bindFramebuffer:_n,drawBuffers:ne,useProgram:yi,setBlending:Mt,setMaterial:On,setFlipSided:Qt,setCullFace:D,setLineWidth:C,setPolygonOffset:ce,setScissorTest:Ce,activeTexture:Ae,bindTexture:He,unbindTexture:at,compressedTexImage2D:Ze,compressedTexImage3D:Ye,texImage2D:_t,texImage3D:rt,updateUBOMapping:Ue,uniformBlockBinding:Pe,texStorage2D:rn,texStorage3D:Wt,texSubImage2D:Dt,texSubImage3D:Vt,compressedTexSubImage2D:Le,compressedTexSubImage3D:Sn,scissor:Ot,viewport:Mn,reset:Fe}}function CS(s,e,t,n,i,r,o){let a=i.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap,h,f=new WeakMap,d=!1;try{d=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(D,C){return d?new OffscreenCanvas(D,C):Wa("canvas")}function y(D,C,ce,Ce){let Ae=1;if((D.width>Ce||D.height>Ce)&&(Ae=Ce/Math.max(D.width,D.height)),Ae<1||C===!0)if(typeof HTMLImageElement!="undefined"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&D instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&D instanceof ImageBitmap){let He=C?fl:Math.floor,at=He(Ae*D.width),Ze=He(Ae*D.height);h===void 0&&(h=g(at,Ze));let Ye=ce?g(at,Ze):h;return Ye.width=at,Ye.height=Ze,Ye.getContext("2d").drawImage(D,0,0,at,Ze),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+D.width+"x"+D.height+") to ("+at+"x"+Ze+")."),Ye}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+D.width+"x"+D.height+")."),D;return D}function m(D){return Ph(D.width)&&Ph(D.height)}function p(D){return a?!1:D.wrapS!==rs||D.wrapT!==rs||D.minFilter!==ui&&D.minFilter!==Hi}function v(D,C){return D.generateMipmaps&&C&&D.minFilter!==ui&&D.minFilter!==Hi}function _(D){s.generateMipmap(D)}function E(D,C,ce,Ce,Ae=!1){if(a===!1)return C;if(D!==null){if(s[D]!==void 0)return s[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let He=C;if(C===s.RED&&(ce===s.FLOAT&&(He=s.R32F),ce===s.HALF_FLOAT&&(He=s.R16F),ce===s.UNSIGNED_BYTE&&(He=s.R8)),C===s.RED_INTEGER&&(ce===s.UNSIGNED_BYTE&&(He=s.R8UI),ce===s.UNSIGNED_SHORT&&(He=s.R16UI),ce===s.UNSIGNED_INT&&(He=s.R32UI),ce===s.BYTE&&(He=s.R8I),ce===s.SHORT&&(He=s.R16I),ce===s.INT&&(He=s.R32I)),C===s.RG&&(ce===s.FLOAT&&(He=s.RG32F),ce===s.HALF_FLOAT&&(He=s.RG16F),ce===s.UNSIGNED_BYTE&&(He=s.RG8)),C===s.RGBA){let at=Ae?ll:En.getTransfer(Ce);ce===s.FLOAT&&(He=s.RGBA32F),ce===s.HALF_FLOAT&&(He=s.RGBA16F),ce===s.UNSIGNED_BYTE&&(He=at===Vn?s.SRGB8_ALPHA8:s.RGBA8),ce===s.UNSIGNED_SHORT_4_4_4_4&&(He=s.RGBA4),ce===s.UNSIGNED_SHORT_5_5_5_1&&(He=s.RGB5_A1)}return(He===s.R16F||He===s.R32F||He===s.RG16F||He===s.RG32F||He===s.RGBA16F||He===s.RGBA32F)&&e.get("EXT_color_buffer_float"),He}function w(D,C,ce){return v(D,ce)===!0||D.isFramebufferTexture&&D.minFilter!==ui&&D.minFilter!==Hi?Math.log2(Math.max(C.width,C.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?C.mipmaps.length:1}function A(D){return D===ui||D===cl||D===Ua?s.NEAREST:s.LINEAR}function R(D){let C=D.target;C.removeEventListener("dispose",R),b(C),C.isVideoTexture&&u.delete(C)}function O(D){let C=D.target;C.removeEventListener("dispose",O),V(C)}function b(D){let C=n.get(D);if(C.__webglInit===void 0)return;let ce=D.source,Ce=f.get(ce);if(Ce){let Ae=Ce[C.__cacheKey];Ae.usedTimes--,Ae.usedTimes===0&&P(D),Object.keys(Ce).length===0&&f.delete(ce)}n.remove(D)}function P(D){let C=n.get(D);s.deleteTexture(C.__webglTexture);let ce=D.source,Ce=f.get(ce);delete Ce[C.__cacheKey],o.memory.textures--}function V(D){let C=D.texture,ce=n.get(D),Ce=n.get(C);if(Ce.__webglTexture!==void 0&&(s.deleteTexture(Ce.__webglTexture),o.memory.textures--),D.depthTexture&&D.depthTexture.dispose(),D.isWebGLCubeRenderTarget)for(let Ae=0;Ae<6;Ae++){if(Array.isArray(ce.__webglFramebuffer[Ae]))for(let He=0;He<ce.__webglFramebuffer[Ae].length;He++)s.deleteFramebuffer(ce.__webglFramebuffer[Ae][He]);else s.deleteFramebuffer(ce.__webglFramebuffer[Ae]);ce.__webglDepthbuffer&&s.deleteRenderbuffer(ce.__webglDepthbuffer[Ae])}else{if(Array.isArray(ce.__webglFramebuffer))for(let Ae=0;Ae<ce.__webglFramebuffer.length;Ae++)s.deleteFramebuffer(ce.__webglFramebuffer[Ae]);else s.deleteFramebuffer(ce.__webglFramebuffer);if(ce.__webglDepthbuffer&&s.deleteRenderbuffer(ce.__webglDepthbuffer),ce.__webglMultisampledFramebuffer&&s.deleteFramebuffer(ce.__webglMultisampledFramebuffer),ce.__webglColorRenderbuffer)for(let Ae=0;Ae<ce.__webglColorRenderbuffer.length;Ae++)ce.__webglColorRenderbuffer[Ae]&&s.deleteRenderbuffer(ce.__webglColorRenderbuffer[Ae]);ce.__webglDepthRenderbuffer&&s.deleteRenderbuffer(ce.__webglDepthRenderbuffer)}if(D.isWebGLMultipleRenderTargets)for(let Ae=0,He=C.length;Ae<He;Ae++){let at=n.get(C[Ae]);at.__webglTexture&&(s.deleteTexture(at.__webglTexture),o.memory.textures--),n.remove(C[Ae])}n.remove(C),n.remove(D)}let X=0;function se(){X=0}function N(){let D=X;return D>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+i.maxTextures),X+=1,D}function j(D){let C=[];return C.push(D.wrapS),C.push(D.wrapT),C.push(D.wrapR||0),C.push(D.magFilter),C.push(D.minFilter),C.push(D.anisotropy),C.push(D.internalFormat),C.push(D.format),C.push(D.type),C.push(D.generateMipmaps),C.push(D.premultiplyAlpha),C.push(D.flipY),C.push(D.unpackAlignment),C.push(D.colorSpace),C.join()}function B(D,C){let ce=n.get(D);if(D.isVideoTexture&&On(D),D.isRenderTargetTexture===!1&&D.version>0&&ce.__version!==D.version){let Ce=D.image;if(Ce===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Ce.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Oe(ce,D,C);return}}t.bindTexture(s.TEXTURE_2D,ce.__webglTexture,s.TEXTURE0+C)}function ye(D,C){let ce=n.get(D);if(D.version>0&&ce.__version!==D.version){Oe(ce,D,C);return}t.bindTexture(s.TEXTURE_2D_ARRAY,ce.__webglTexture,s.TEXTURE0+C)}function be(D,C){let ce=n.get(D);if(D.version>0&&ce.__version!==D.version){Oe(ce,D,C);return}t.bindTexture(s.TEXTURE_3D,ce.__webglTexture,s.TEXTURE0+C)}function ee(D,C){let ce=n.get(D);if(D.version>0&&ce.__version!==D.version){At(ce,D,C);return}t.bindTexture(s.TEXTURE_CUBE_MAP,ce.__webglTexture,s.TEXTURE0+C)}let de={[io]:s.REPEAT,[rs]:s.CLAMP_TO_EDGE,[Va]:s.MIRRORED_REPEAT},ze={[ui]:s.NEAREST,[cl]:s.NEAREST_MIPMAP_NEAREST,[Ua]:s.NEAREST_MIPMAP_LINEAR,[Hi]:s.LINEAR,[gf]:s.LINEAR_MIPMAP_NEAREST,[Tr]:s.LINEAR_MIPMAP_LINEAR},$e={[by]:s.NEVER,[Ay]:s.ALWAYS,[My]:s.LESS,[ug]:s.LEQUAL,[Sy]:s.EQUAL,[wy]:s.GEQUAL,[Ey]:s.GREATER,[Ty]:s.NOTEQUAL};function te(D,C,ce){if(ce?(s.texParameteri(D,s.TEXTURE_WRAP_S,de[C.wrapS]),s.texParameteri(D,s.TEXTURE_WRAP_T,de[C.wrapT]),(D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY)&&s.texParameteri(D,s.TEXTURE_WRAP_R,de[C.wrapR]),s.texParameteri(D,s.TEXTURE_MAG_FILTER,ze[C.magFilter]),s.texParameteri(D,s.TEXTURE_MIN_FILTER,ze[C.minFilter])):(s.texParameteri(D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY)&&s.texParameteri(D,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(C.wrapS!==rs||C.wrapT!==rs)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(D,s.TEXTURE_MAG_FILTER,A(C.magFilter)),s.texParameteri(D,s.TEXTURE_MIN_FILTER,A(C.minFilter)),C.minFilter!==ui&&C.minFilter!==Hi&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),C.compareFunction&&(s.texParameteri(D,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(D,s.TEXTURE_COMPARE_FUNC,$e[C.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){let Ce=e.get("EXT_texture_filter_anisotropic");if(C.magFilter===ui||C.minFilter!==Ua&&C.minFilter!==Tr||C.type===Ns&&e.has("OES_texture_float_linear")===!1||a===!1&&C.type===so&&e.has("OES_texture_half_float_linear")===!1)return;(C.anisotropy>1||n.get(C).__currentAnisotropy)&&(s.texParameterf(D,Ce.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,i.getMaxAnisotropy())),n.get(C).__currentAnisotropy=C.anisotropy)}}function Ie(D,C){let ce=!1;D.__webglInit===void 0&&(D.__webglInit=!0,C.addEventListener("dispose",R));let Ce=C.source,Ae=f.get(Ce);Ae===void 0&&(Ae={},f.set(Ce,Ae));let He=j(C);if(He!==D.__cacheKey){Ae[He]===void 0&&(Ae[He]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,ce=!0),Ae[He].usedTimes++;let at=Ae[D.__cacheKey];at!==void 0&&(Ae[D.__cacheKey].usedTimes--,at.usedTimes===0&&P(C)),D.__cacheKey=He,D.__webglTexture=Ae[He].texture}return ce}function Oe(D,C,ce){let Ce=s.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&(Ce=s.TEXTURE_2D_ARRAY),C.isData3DTexture&&(Ce=s.TEXTURE_3D);let Ae=Ie(D,C),He=C.source;t.bindTexture(Ce,D.__webglTexture,s.TEXTURE0+ce);let at=n.get(He);if(He.version!==at.__version||Ae===!0){t.activeTexture(s.TEXTURE0+ce);let Ze=En.getPrimaries(En.workingColorSpace),Ye=C.colorSpace===fs?null:En.getPrimaries(C.colorSpace),Dt=C.colorSpace===fs||Ze===Ye?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,C.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,C.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Dt);let Vt=p(C)&&m(C.image)===!1,Le=y(C.image,Vt,!1,i.maxTextureSize);Le=Qt(C,Le);let Sn=m(Le)||a,rn=r.convert(C.format,C.colorSpace),Wt=r.convert(C.type),_t=E(C.internalFormat,rn,Wt,C.colorSpace,C.isVideoTexture);te(Ce,C,Sn);let rt,Ot=C.mipmaps,Mn=a&&C.isVideoTexture!==!0&&_t!==ag,Ue=at.__version===void 0||Ae===!0,Pe=w(C,Le,Sn);if(C.isDepthTexture)_t=s.DEPTH_COMPONENT,a?C.type===Ns?_t=s.DEPTH_COMPONENT32F:C.type===vr?_t=s.DEPTH_COMPONENT24:C.type===eo?_t=s.DEPTH24_STENCIL8:_t=s.DEPTH_COMPONENT16:C.type===Ns&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),C.format===to&&_t===s.DEPTH_COMPONENT&&C.type!==xf&&C.type!==vr&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),C.type=vr,Wt=r.convert(C.type)),C.format===Ko&&_t===s.DEPTH_COMPONENT&&(_t=s.DEPTH_STENCIL,C.type!==eo&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),C.type=eo,Wt=r.convert(C.type))),Ue&&(Mn?t.texStorage2D(s.TEXTURE_2D,1,_t,Le.width,Le.height):t.texImage2D(s.TEXTURE_2D,0,_t,Le.width,Le.height,0,rn,Wt,null));else if(C.isDataTexture)if(Ot.length>0&&Sn){Mn&&Ue&&t.texStorage2D(s.TEXTURE_2D,Pe,_t,Ot[0].width,Ot[0].height);for(let Fe=0,H=Ot.length;Fe<H;Fe++)rt=Ot[Fe],Mn?t.texSubImage2D(s.TEXTURE_2D,Fe,0,0,rt.width,rt.height,rn,Wt,rt.data):t.texImage2D(s.TEXTURE_2D,Fe,_t,rt.width,rt.height,0,rn,Wt,rt.data);C.generateMipmaps=!1}else Mn?(Ue&&t.texStorage2D(s.TEXTURE_2D,Pe,_t,Le.width,Le.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,Le.width,Le.height,rn,Wt,Le.data)):t.texImage2D(s.TEXTURE_2D,0,_t,Le.width,Le.height,0,rn,Wt,Le.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){Mn&&Ue&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Pe,_t,Ot[0].width,Ot[0].height,Le.depth);for(let Fe=0,H=Ot.length;Fe<H;Fe++)rt=Ot[Fe],C.format!==os?rn!==null?Mn?t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Fe,0,0,0,rt.width,rt.height,Le.depth,rn,rt.data,0,0):t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,Fe,_t,rt.width,rt.height,Le.depth,0,rt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Mn?t.texSubImage3D(s.TEXTURE_2D_ARRAY,Fe,0,0,0,rt.width,rt.height,Le.depth,rn,Wt,rt.data):t.texImage3D(s.TEXTURE_2D_ARRAY,Fe,_t,rt.width,rt.height,Le.depth,0,rn,Wt,rt.data)}else{Mn&&Ue&&t.texStorage2D(s.TEXTURE_2D,Pe,_t,Ot[0].width,Ot[0].height);for(let Fe=0,H=Ot.length;Fe<H;Fe++)rt=Ot[Fe],C.format!==os?rn!==null?Mn?t.compressedTexSubImage2D(s.TEXTURE_2D,Fe,0,0,rt.width,rt.height,rn,rt.data):t.compressedTexImage2D(s.TEXTURE_2D,Fe,_t,rt.width,rt.height,0,rt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Mn?t.texSubImage2D(s.TEXTURE_2D,Fe,0,0,rt.width,rt.height,rn,Wt,rt.data):t.texImage2D(s.TEXTURE_2D,Fe,_t,rt.width,rt.height,0,rn,Wt,rt.data)}else if(C.isDataArrayTexture)Mn?(Ue&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Pe,_t,Le.width,Le.height,Le.depth),t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Le.width,Le.height,Le.depth,rn,Wt,Le.data)):t.texImage3D(s.TEXTURE_2D_ARRAY,0,_t,Le.width,Le.height,Le.depth,0,rn,Wt,Le.data);else if(C.isData3DTexture)Mn?(Ue&&t.texStorage3D(s.TEXTURE_3D,Pe,_t,Le.width,Le.height,Le.depth),t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Le.width,Le.height,Le.depth,rn,Wt,Le.data)):t.texImage3D(s.TEXTURE_3D,0,_t,Le.width,Le.height,Le.depth,0,rn,Wt,Le.data);else if(C.isFramebufferTexture){if(Ue)if(Mn)t.texStorage2D(s.TEXTURE_2D,Pe,_t,Le.width,Le.height);else{let Fe=Le.width,H=Le.height;for(let Xe=0;Xe<Pe;Xe++)t.texImage2D(s.TEXTURE_2D,Xe,_t,Fe,H,0,rn,Wt,null),Fe>>=1,H>>=1}}else if(Ot.length>0&&Sn){Mn&&Ue&&t.texStorage2D(s.TEXTURE_2D,Pe,_t,Ot[0].width,Ot[0].height);for(let Fe=0,H=Ot.length;Fe<H;Fe++)rt=Ot[Fe],Mn?t.texSubImage2D(s.TEXTURE_2D,Fe,0,0,rn,Wt,rt):t.texImage2D(s.TEXTURE_2D,Fe,_t,rn,Wt,rt);C.generateMipmaps=!1}else Mn?(Ue&&t.texStorage2D(s.TEXTURE_2D,Pe,_t,Le.width,Le.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,rn,Wt,Le)):t.texImage2D(s.TEXTURE_2D,0,_t,rn,Wt,Le);v(C,Sn)&&_(Ce),at.__version=He.version,C.onUpdate&&C.onUpdate(C)}D.__version=C.version}function At(D,C,ce){if(C.image.length!==6)return;let Ce=Ie(D,C),Ae=C.source;t.bindTexture(s.TEXTURE_CUBE_MAP,D.__webglTexture,s.TEXTURE0+ce);let He=n.get(Ae);if(Ae.version!==He.__version||Ce===!0){t.activeTexture(s.TEXTURE0+ce);let at=En.getPrimaries(En.workingColorSpace),Ze=C.colorSpace===fs?null:En.getPrimaries(C.colorSpace),Ye=C.colorSpace===fs||at===Ze?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,C.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,C.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ye);let Dt=C.isCompressedTexture||C.image[0].isCompressedTexture,Vt=C.image[0]&&C.image[0].isDataTexture,Le=[];for(let Fe=0;Fe<6;Fe++)!Dt&&!Vt?Le[Fe]=y(C.image[Fe],!1,!0,i.maxCubemapSize):Le[Fe]=Vt?C.image[Fe].image:C.image[Fe],Le[Fe]=Qt(C,Le[Fe]);let Sn=Le[0],rn=m(Sn)||a,Wt=r.convert(C.format,C.colorSpace),_t=r.convert(C.type),rt=E(C.internalFormat,Wt,_t,C.colorSpace),Ot=a&&C.isVideoTexture!==!0,Mn=He.__version===void 0||Ce===!0,Ue=w(C,Sn,rn);te(s.TEXTURE_CUBE_MAP,C,rn);let Pe;if(Dt){Ot&&Mn&&t.texStorage2D(s.TEXTURE_CUBE_MAP,Ue,rt,Sn.width,Sn.height);for(let Fe=0;Fe<6;Fe++){Pe=Le[Fe].mipmaps;for(let H=0;H<Pe.length;H++){let Xe=Pe[H];C.format!==os?Wt!==null?Ot?t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Fe,H,0,0,Xe.width,Xe.height,Wt,Xe.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Fe,H,rt,Xe.width,Xe.height,0,Xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ot?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Fe,H,0,0,Xe.width,Xe.height,Wt,_t,Xe.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Fe,H,rt,Xe.width,Xe.height,0,Wt,_t,Xe.data)}}}else{Pe=C.mipmaps,Ot&&Mn&&(Pe.length>0&&Ue++,t.texStorage2D(s.TEXTURE_CUBE_MAP,Ue,rt,Le[0].width,Le[0].height));for(let Fe=0;Fe<6;Fe++)if(Vt){Ot?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Fe,0,0,0,Le[Fe].width,Le[Fe].height,Wt,_t,Le[Fe].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Fe,0,rt,Le[Fe].width,Le[Fe].height,0,Wt,_t,Le[Fe].data);for(let H=0;H<Pe.length;H++){let ke=Pe[H].image[Fe].image;Ot?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Fe,H+1,0,0,ke.width,ke.height,Wt,_t,ke.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Fe,H+1,rt,ke.width,ke.height,0,Wt,_t,ke.data)}}else{Ot?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Fe,0,0,0,Wt,_t,Le[Fe]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Fe,0,rt,Wt,_t,Le[Fe]);for(let H=0;H<Pe.length;H++){let Xe=Pe[H];Ot?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Fe,H+1,0,0,Wt,_t,Xe.image[Fe]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Fe,H+1,rt,Wt,_t,Xe.image[Fe])}}}v(C,rn)&&_(s.TEXTURE_CUBE_MAP),He.__version=Ae.version,C.onUpdate&&C.onUpdate(C)}D.__version=C.version}function tt(D,C,ce,Ce,Ae,He){let at=r.convert(ce.format,ce.colorSpace),Ze=r.convert(ce.type),Ye=E(ce.internalFormat,at,Ze,ce.colorSpace);if(!n.get(C).__hasExternalTextures){let Vt=Math.max(1,C.width>>He),Le=Math.max(1,C.height>>He);Ae===s.TEXTURE_3D||Ae===s.TEXTURE_2D_ARRAY?t.texImage3D(Ae,He,Ye,Vt,Le,C.depth,0,at,Ze,null):t.texImage2D(Ae,He,Ye,Vt,Le,0,at,Ze,null)}t.bindFramebuffer(s.FRAMEBUFFER,D),Mt(C)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Ce,Ae,n.get(ce).__webglTexture,0,Yt(C)):(Ae===s.TEXTURE_2D||Ae>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Ae<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,Ce,Ae,n.get(ce).__webglTexture,He),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Ht(D,C,ce){if(s.bindRenderbuffer(s.RENDERBUFFER,D),C.depthBuffer&&!C.stencilBuffer){let Ce=a===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(ce||Mt(C)){let Ae=C.depthTexture;Ae&&Ae.isDepthTexture&&(Ae.type===Ns?Ce=s.DEPTH_COMPONENT32F:Ae.type===vr&&(Ce=s.DEPTH_COMPONENT24));let He=Yt(C);Mt(C)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,He,Ce,C.width,C.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,He,Ce,C.width,C.height)}else s.renderbufferStorage(s.RENDERBUFFER,Ce,C.width,C.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,D)}else if(C.depthBuffer&&C.stencilBuffer){let Ce=Yt(C);ce&&Mt(C)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ce,s.DEPTH24_STENCIL8,C.width,C.height):Mt(C)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ce,s.DEPTH24_STENCIL8,C.width,C.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,C.width,C.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,D)}else{let Ce=C.isWebGLMultipleRenderTargets===!0?C.texture:[C.texture];for(let Ae=0;Ae<Ce.length;Ae++){let He=Ce[Ae],at=r.convert(He.format,He.colorSpace),Ze=r.convert(He.type),Ye=E(He.internalFormat,at,Ze,He.colorSpace),Dt=Yt(C);ce&&Mt(C)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Dt,Ye,C.width,C.height):Mt(C)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Dt,Ye,C.width,C.height):s.renderbufferStorage(s.RENDERBUFFER,Ye,C.width,C.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Jt(D,C){if(C&&C.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,D),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(C.depthTexture).__webglTexture||C.depthTexture.image.width!==C.width||C.depthTexture.image.height!==C.height)&&(C.depthTexture.image.width=C.width,C.depthTexture.image.height=C.height,C.depthTexture.needsUpdate=!0),B(C.depthTexture,0);let Ce=n.get(C.depthTexture).__webglTexture,Ae=Yt(C);if(C.depthTexture.format===to)Mt(C)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Ce,0,Ae):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Ce,0);else if(C.depthTexture.format===Ko)Mt(C)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Ce,0,Ae):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Ce,0);else throw new Error("Unknown depthTexture format")}function Nt(D){let C=n.get(D),ce=D.isWebGLCubeRenderTarget===!0;if(D.depthTexture&&!C.__autoAllocateDepthBuffer){if(ce)throw new Error("target.depthTexture not supported in Cube render targets");Jt(C.__webglFramebuffer,D)}else if(ce){C.__webglDepthbuffer=[];for(let Ce=0;Ce<6;Ce++)t.bindFramebuffer(s.FRAMEBUFFER,C.__webglFramebuffer[Ce]),C.__webglDepthbuffer[Ce]=s.createRenderbuffer(),Ht(C.__webglDepthbuffer[Ce],D,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer=s.createRenderbuffer(),Ht(C.__webglDepthbuffer,D,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function _n(D,C,ce){let Ce=n.get(D);C!==void 0&&tt(Ce.__webglFramebuffer,D,D.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),ce!==void 0&&Nt(D)}function ne(D){let C=D.texture,ce=n.get(D),Ce=n.get(C);D.addEventListener("dispose",O),D.isWebGLMultipleRenderTargets!==!0&&(Ce.__webglTexture===void 0&&(Ce.__webglTexture=s.createTexture()),Ce.__version=C.version,o.memory.textures++);let Ae=D.isWebGLCubeRenderTarget===!0,He=D.isWebGLMultipleRenderTargets===!0,at=m(D)||a;if(Ae){ce.__webglFramebuffer=[];for(let Ze=0;Ze<6;Ze++)if(a&&C.mipmaps&&C.mipmaps.length>0){ce.__webglFramebuffer[Ze]=[];for(let Ye=0;Ye<C.mipmaps.length;Ye++)ce.__webglFramebuffer[Ze][Ye]=s.createFramebuffer()}else ce.__webglFramebuffer[Ze]=s.createFramebuffer()}else{if(a&&C.mipmaps&&C.mipmaps.length>0){ce.__webglFramebuffer=[];for(let Ze=0;Ze<C.mipmaps.length;Ze++)ce.__webglFramebuffer[Ze]=s.createFramebuffer()}else ce.__webglFramebuffer=s.createFramebuffer();if(He)if(i.drawBuffers){let Ze=D.texture;for(let Ye=0,Dt=Ze.length;Ye<Dt;Ye++){let Vt=n.get(Ze[Ye]);Vt.__webglTexture===void 0&&(Vt.__webglTexture=s.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&D.samples>0&&Mt(D)===!1){let Ze=He?C:[C];ce.__webglMultisampledFramebuffer=s.createFramebuffer(),ce.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,ce.__webglMultisampledFramebuffer);for(let Ye=0;Ye<Ze.length;Ye++){let Dt=Ze[Ye];ce.__webglColorRenderbuffer[Ye]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,ce.__webglColorRenderbuffer[Ye]);let Vt=r.convert(Dt.format,Dt.colorSpace),Le=r.convert(Dt.type),Sn=E(Dt.internalFormat,Vt,Le,Dt.colorSpace,D.isXRRenderTarget===!0),rn=Yt(D);s.renderbufferStorageMultisample(s.RENDERBUFFER,rn,Sn,D.width,D.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ye,s.RENDERBUFFER,ce.__webglColorRenderbuffer[Ye])}s.bindRenderbuffer(s.RENDERBUFFER,null),D.depthBuffer&&(ce.__webglDepthRenderbuffer=s.createRenderbuffer(),Ht(ce.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(Ae){t.bindTexture(s.TEXTURE_CUBE_MAP,Ce.__webglTexture),te(s.TEXTURE_CUBE_MAP,C,at);for(let Ze=0;Ze<6;Ze++)if(a&&C.mipmaps&&C.mipmaps.length>0)for(let Ye=0;Ye<C.mipmaps.length;Ye++)tt(ce.__webglFramebuffer[Ze][Ye],D,C,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Ze,Ye);else tt(ce.__webglFramebuffer[Ze],D,C,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Ze,0);v(C,at)&&_(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(He){let Ze=D.texture;for(let Ye=0,Dt=Ze.length;Ye<Dt;Ye++){let Vt=Ze[Ye],Le=n.get(Vt);t.bindTexture(s.TEXTURE_2D,Le.__webglTexture),te(s.TEXTURE_2D,Vt,at),tt(ce.__webglFramebuffer,D,Vt,s.COLOR_ATTACHMENT0+Ye,s.TEXTURE_2D,0),v(Vt,at)&&_(s.TEXTURE_2D)}t.unbindTexture()}else{let Ze=s.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(a?Ze=D.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(Ze,Ce.__webglTexture),te(Ze,C,at),a&&C.mipmaps&&C.mipmaps.length>0)for(let Ye=0;Ye<C.mipmaps.length;Ye++)tt(ce.__webglFramebuffer[Ye],D,C,s.COLOR_ATTACHMENT0,Ze,Ye);else tt(ce.__webglFramebuffer,D,C,s.COLOR_ATTACHMENT0,Ze,0);v(C,at)&&_(Ze),t.unbindTexture()}D.depthBuffer&&Nt(D)}function yi(D){let C=m(D)||a,ce=D.isWebGLMultipleRenderTargets===!0?D.texture:[D.texture];for(let Ce=0,Ae=ce.length;Ce<Ae;Ce++){let He=ce[Ce];if(v(He,C)){let at=D.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,Ze=n.get(He).__webglTexture;t.bindTexture(at,Ze),_(at),t.unbindTexture()}}}function Bt(D){if(a&&D.samples>0&&Mt(D)===!1){let C=D.isWebGLMultipleRenderTargets?D.texture:[D.texture],ce=D.width,Ce=D.height,Ae=s.COLOR_BUFFER_BIT,He=[],at=D.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ze=n.get(D),Ye=D.isWebGLMultipleRenderTargets===!0;if(Ye)for(let Dt=0;Dt<C.length;Dt++)t.bindFramebuffer(s.FRAMEBUFFER,Ze.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Dt,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Ze.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Dt,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Ze.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ze.__webglFramebuffer);for(let Dt=0;Dt<C.length;Dt++){He.push(s.COLOR_ATTACHMENT0+Dt),D.depthBuffer&&He.push(at);let Vt=Ze.__ignoreDepthValues!==void 0?Ze.__ignoreDepthValues:!1;if(Vt===!1&&(D.depthBuffer&&(Ae|=s.DEPTH_BUFFER_BIT),D.stencilBuffer&&(Ae|=s.STENCIL_BUFFER_BIT)),Ye&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ze.__webglColorRenderbuffer[Dt]),Vt===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[at]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[at])),Ye){let Le=n.get(C[Dt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Le,0)}s.blitFramebuffer(0,0,ce,Ce,0,0,ce,Ce,Ae,s.NEAREST),l&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,He)}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Ye)for(let Dt=0;Dt<C.length;Dt++){t.bindFramebuffer(s.FRAMEBUFFER,Ze.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Dt,s.RENDERBUFFER,Ze.__webglColorRenderbuffer[Dt]);let Vt=n.get(C[Dt]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Ze.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Dt,s.TEXTURE_2D,Vt,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ze.__webglMultisampledFramebuffer)}}function Yt(D){return Math.min(i.maxSamples,D.samples)}function Mt(D){let C=n.get(D);return a&&D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function On(D){let C=o.render.frame;u.get(D)!==C&&(u.set(D,C),D.update())}function Qt(D,C){let ce=D.colorSpace,Ce=D.format,Ae=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||D.format===Ch||ce!==di&&ce!==fs&&(En.getTransfer(ce)===Vn?a===!1?e.has("EXT_sRGB")===!0&&Ce===os?(D.format=Ch,D.minFilter=Hi,D.generateMipmaps=!1):C=dl.sRGBToLinear(C):(Ce!==os||Ae!==Er)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",ce)),C}this.allocateTextureUnit=N,this.resetTextureUnits=se,this.setTexture2D=B,this.setTexture2DArray=ye,this.setTexture3D=be,this.setTextureCube=ee,this.rebindTextures=_n,this.setupRenderTarget=ne,this.updateRenderTargetMipmap=yi,this.updateMultisampleRenderTarget=Bt,this.setupDepthRenderbuffer=Nt,this.setupFrameBufferTexture=tt,this.useMultisampledRTT=Mt}function PS(s,e,t){let n=t.isWebGL2;function i(r,o=fs){let a,c=En.getTransfer(o);if(r===Er)return s.UNSIGNED_BYTE;if(r===ng)return s.UNSIGNED_SHORT_4_4_4_4;if(r===ig)return s.UNSIGNED_SHORT_5_5_5_1;if(r===ly)return s.BYTE;if(r===uy)return s.SHORT;if(r===xf)return s.UNSIGNED_SHORT;if(r===tg)return s.INT;if(r===vr)return s.UNSIGNED_INT;if(r===Ns)return s.FLOAT;if(r===so)return n?s.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===hy)return s.ALPHA;if(r===os)return s.RGBA;if(r===fy)return s.LUMINANCE;if(r===dy)return s.LUMINANCE_ALPHA;if(r===to)return s.DEPTH_COMPONENT;if(r===Ko)return s.DEPTH_STENCIL;if(r===Ch)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===py)return s.RED;if(r===sg)return s.RED_INTEGER;if(r===my)return s.RG;if(r===rg)return s.RG_INTEGER;if(r===og)return s.RGBA_INTEGER;if(r===Hu||r===Vu||r===Gu||r===Wu)if(c===Vn)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===Hu)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Vu)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Gu)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Wu)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===Hu)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Vu)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Gu)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Wu)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===pp||r===mp||r===gp||r===xp)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===pp)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===mp)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===gp)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===xp)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===ag)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===yp||r===_p)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(r===yp)return c===Vn?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===_p)return c===Vn?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===vp||r===bp||r===Mp||r===Sp||r===Ep||r===Tp||r===wp||r===Ap||r===Rp||r===Cp||r===Pp||r===Ip||r===Lp||r===Np)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(r===vp)return c===Vn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===bp)return c===Vn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Mp)return c===Vn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Sp)return c===Vn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Ep)return c===Vn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Tp)return c===Vn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===wp)return c===Vn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Ap)return c===Vn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Rp)return c===Vn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Cp)return c===Vn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Pp)return c===Vn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Ip)return c===Vn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Lp)return c===Vn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Np)return c===Vn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Xu||r===Dp||r===Up)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(r===Xu)return c===Vn?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Dp)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Up)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===gy||r===Fp||r===Bp||r===Op)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(r===Xu)return a.COMPRESSED_RED_RGTC1_EXT;if(r===Fp)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Bp)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Op)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===eo?n?s.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):s[r]!==void 0?s[r]:null}return{convert:i}}function LS(s,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,dg(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,v,_,E){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,E)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),y(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,v,_):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ui&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ui&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let v=e.get(p).envMap;if(v&&(m.envMap.value=v,m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;let _=s._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*_,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,v,_){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=_*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ui&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function y(m,p){let v=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function NS(s,e,t,n){let i={},r={},o=[],a=t.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(v,_){let E=_.program;n.uniformBlockBinding(v,E)}function l(v,_){let E=i[v.id];E===void 0&&(g(v),E=u(v),i[v.id]=E,v.addEventListener("dispose",m));let w=_.program;n.updateUBOMapping(v,w);let A=e.render.frame;r[v.id]!==A&&(f(v),r[v.id]=A)}function u(v){let _=h();v.__bindingPointIndex=_;let E=s.createBuffer(),w=v.__size,A=v.usage;return s.bindBuffer(s.UNIFORM_BUFFER,E),s.bufferData(s.UNIFORM_BUFFER,w,A),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,_,E),E}function h(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){let _=i[v.id],E=v.uniforms,w=v.__cache;s.bindBuffer(s.UNIFORM_BUFFER,_);for(let A=0,R=E.length;A<R;A++){let O=Array.isArray(E[A])?E[A]:[E[A]];for(let b=0,P=O.length;b<P;b++){let V=O[b];if(d(V,A,b,w)===!0){let X=V.__offset,se=Array.isArray(V.value)?V.value:[V.value],N=0;for(let j=0;j<se.length;j++){let B=se[j],ye=y(B);typeof B=="number"||typeof B=="boolean"?(V.__data[0]=B,s.bufferSubData(s.UNIFORM_BUFFER,X+N,V.__data)):B.isMatrix3?(V.__data[0]=B.elements[0],V.__data[1]=B.elements[1],V.__data[2]=B.elements[2],V.__data[3]=0,V.__data[4]=B.elements[3],V.__data[5]=B.elements[4],V.__data[6]=B.elements[5],V.__data[7]=0,V.__data[8]=B.elements[6],V.__data[9]=B.elements[7],V.__data[10]=B.elements[8],V.__data[11]=0):(B.toArray(V.__data,N),N+=ye.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,X,V.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function d(v,_,E,w){let A=v.value,R=_+"_"+E;if(w[R]===void 0)return typeof A=="number"||typeof A=="boolean"?w[R]=A:w[R]=A.clone(),!0;{let O=w[R];if(typeof A=="number"||typeof A=="boolean"){if(O!==A)return w[R]=A,!0}else if(O.equals(A)===!1)return O.copy(A),!0}return!1}function g(v){let _=v.uniforms,E=0,w=16;for(let R=0,O=_.length;R<O;R++){let b=Array.isArray(_[R])?_[R]:[_[R]];for(let P=0,V=b.length;P<V;P++){let X=b[P],se=Array.isArray(X.value)?X.value:[X.value];for(let N=0,j=se.length;N<j;N++){let B=se[N],ye=y(B),be=E%w;be!==0&&w-be<ye.boundary&&(E+=w-be),X.__data=new Float32Array(ye.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=E,E+=ye.storage}}}let A=E%w;return A>0&&(E+=w-A),v.__size=E,v.__cache={},this}function y(v){let _={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(_.boundary=4,_.storage=4):v.isVector2?(_.boundary=8,_.storage=8):v.isVector3||v.isColor?(_.boundary=16,_.storage=12):v.isVector4?(_.boundary=16,_.storage=16):v.isMatrix3?(_.boundary=48,_.storage=48):v.isMatrix4?(_.boundary=64,_.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),_}function m(v){let _=v.target;_.removeEventListener("dispose",m);let E=o.indexOf(_.__bindingPointIndex);o.splice(E,1),s.deleteBuffer(i[_.id]),delete i[_.id],delete r[_.id]}function p(){for(let v in i)s.deleteBuffer(i[v]);o=[],i={},r={}}return{bind:c,update:l,dispose:p}}function BS(s,e){return s.z-e.z}function OS(s,e){return e.z-s.z}function zS(s,e,t=0){let n=e.itemSize;if(s.isInterleavedBufferAttribute||s.array.constructor!==e.array.constructor){let i=s.count;for(let r=0;r<i;r++)for(let o=0;o<n;o++)e.setComponent(r+t,o,s.getComponent(r,o))}else e.array.set(s.array,t*n);e.needsUpdate=!0}function Wm(s,e,t,n,i,r,o){let a=Yh.distanceSqToPoint(s);if(a<t){let c=new T;Yh.closestPointToPoint(s,c),c.applyMatrix4(n);let l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,object:o})}}function Mf(){let s=0,e=0,t=0,n=0;function i(r,o,a,c){s=r,e=a,t=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){i(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,u,h){let f=(o-r)/l-(a-r)/(l+u)+(a-o)/u,d=(a-o)/u-(c-o)/(u+h)+(c-a)/h;f*=u,d*=u,i(o,a,f,d)},calc:function(r){let o=r*r,a=o*r;return s+e*r+t*o+n*a}}}function Xm(s,e,t,n,i){let r=(n-e)*.5,o=(i-t)*.5,a=s*s,c=s*a;return(2*t-2*n+r+o)*c+(-3*t+3*n-2*r-o)*a+r*s+t}function HS(s,e){let t=1-s;return t*t*e}function VS(s,e){return 2*(1-s)*s*e}function GS(s,e){return s*s*e}function za(s,e,t,n){return HS(s,e)+VS(s,t)+GS(s,n)}function WS(s,e){let t=1-s;return t*t*t*e}function XS(s,e){let t=1-s;return 3*t*t*s*e}function qS(s,e){return 3*(1-s)*s*s*e}function YS(s,e){return s*s*s*e}function Ha(s,e,t,n,i){return WS(s,e)+XS(s,t)+qS(s,n)+YS(s,i)}function rl(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function ZS(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function KS(s){function e(i,r){return s[i]-s[r]}let t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function qm(s,e,t){let n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){let a=t[r]*e;for(let c=0;c!==e;++c)i[o++]=s[a+c]}return i}function vg(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=s[i++];while(r!==void 0)}function JS(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ir;case"vector":case"vector2":case"vector3":case"vector4":return sr;case"color":return Ll;case"quaternion":return Fs;case"bool":case"boolean":return Lr;case"string":return Nr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function $S(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=JS(s.type);if(s.times===void 0){let t=[],n=[];vg(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}function Km(s,e){return s.distance-e.distance}function df(s,e,t,n){if(s.layers.test(e.layers)&&s.raycast(e,t),n===!0){let i=s.children;for(let r=0,o=i.length;r<o;r++)df(i[r],e,t,!0)}}var co,$m,Lx,ap,Nx,Qm,Dx,tr,Vi,Ui,Si,Mr,Wo,cp,lp,up,zl,Is,Ux,Fx,hp,fp,Hl,Vl,Bx,Ox,Yo,Th,kx,zx,Hx,Vx,Gx,Wx,Xx,qx,Yx,jx,Zx,Kx,al,Jx,$x,pf,Qx,mf,ey,ty,Sr,ny,iy,sy,ry,oy,ay,dp,cy,eg,jo,Zo,wh,Ah,Gl,io,rs,Va,ui,cl,Ua,Hi,gf,Tr,Er,ly,uy,xf,tg,vr,Ns,so,ng,ig,eo,hy,os,fy,dy,to,Ko,py,sg,my,rg,og,Hu,Vu,Gu,Wu,pp,mp,gp,xp,ag,yp,_p,vp,bp,Mp,Sp,Ep,Tp,wp,Ap,Rp,Cp,Pp,Ip,Lp,Np,Xu,Dp,Up,gy,Fp,Bp,Op,Jo,ro,qu,kp,zp,Hp,xy,cg,Wl,ic,lg,no,yy,_y,yf,vy,fs,Gn,di,_f,Xl,ll,Vn,ul,hl,Eo,Vp,by,My,Sy,ug,Ey,Ty,wy,Ay,Rh,Gp,Ch,Ds,Ga,wr,Li,Wp,Fa,$o,lo,et,dn,Yu,Xp,qp,Yp,Cc,Gy,En,To,dl,Wy,pl,Xy,Fi,Un,Ih,ds,ml,Lh,pi,T,Ku,jp,sn,Zs,bs,Pc,wo,Ao,Ro,pr,mr,Yr,Aa,Ic,Lc,jr,qy,Ra,$u,Qn,Ks,Qu,Nc,gr,eh,Dc,th,nr,vt,Co,Ms,Yy,jy,xr,Uc,ns,Zp,Kp,Qo,Xa,Zy,Jp,Po,Js,Fc,Ca,Ky,Jy,$p,Qp,em,$y,Qy,Yn,Ss,$s,nh,Qs,Io,Lo,tm,ih,sh,rh,Bc,Ki,fg,yr,Oc,Tt,Ni,e_,Ji,Gi,ii,kc,An,ea,ta,fi,t_,hs,ah,No,is,Pa,Mi,Ei,nm,Zr,zc,im,Do,Uo,Fo,ch,Hc,Vc,Gc,Wc,sm,rm,om,Xc,qc,Tn,qa,s_,r_,o_,Wi,gl,hi,Bo,Oo,Nh,xl,Dh,lh,a_,c_,ss,Kr,jc,Ar,oo,u_,h_,f_,d_,p_,m_,g_,x_,y_,__,v_,b_,M_,S_,E_,T_,w_,A_,R_,C_,P_,I_,L_,N_,D_,U_,F_,B_,O_,k_,z_,H_,V_,G_,W_,X_,q_,Y_,j_,Z_,K_,J_,$_,Q_,ev,tv,nv,iv,sv,rv,ov,av,cv,lv,uv,hv,fv,dv,pv,mv,gv,xv,yv,_v,vv,bv,Mv,Sv,Ev,Tv,wv,Av,Rv,Cv,Pv,Iv,Lv,Nv,Dv,Uv,Fv,Bv,Ov,kv,zv,Hv,Vv,Gv,Wv,Xv,qv,Yv,jv,Zv,Kv,Jv,$v,Qv,eb,tb,nb,ib,sb,rb,ob,ab,cb,lb,ub,hb,fb,db,pb,mb,gb,xb,yb,_b,vb,bb,Mb,Sb,Eb,Tb,wb,Ab,Rb,Cb,Pb,Ib,Lb,Nb,Db,Ub,Fb,Bb,Ob,kb,zb,Hb,Vb,fn,je,Ps,Zc,Rr,Vo,am,Qr,uh,cm,hh,fh,dh,$r,ko,lm,yl,_l,mg,gg,xg,yg,_g,dm,pm,mm,gm,xm,Uh,Fh,Bh,ph,qo,YM,jM,iS,sS,oS,pS,kh,zh,bS,Hh,Vh,TS,wS,Gh,Us,IS,ka,Wh,Ya,Xh,Cr,ja,ki,Za,Rm,Cm,Pm,DS,Im,Jc,mh,Lm,gh,vl,Ka,bl,Nm,US,Ml,ao,zo,Dm,$c,Um,FS,Ia,La,Sl,qh,Ho,_r,Fm,kS,Bm,xh,Qc,Jr,Na,yh,Di,el,El,Ja,Om,km,zm,_h,tl,ia,Hm,Vm,Tl,wl,$a,Gm,Yh,nl,il,Al,Ts,Rl,jh,sl,vh,bh,Mh,Qa,Zh,Kh,Jh,$h,Qh,Cl,ef,jS,Pl,Pr,ps,Il,Ir,tf,nf,sf,ms,Lr,Ll,ir,rf,Fs,Nr,sr,Nl,br,of,QS,rr,er,af,ec,cf,Dl,sa,Ul,Sh,Ym,jm,tc,lf,Fl,Zm,Da,Eh,uf,Bl,hf,ra,Dr,Ol,Sf,eE,Ef,tE,nE,iE,sE,rE,oE,aE,ff,kn,u1,nc,kl,Jm,ol,$i,xi=Lt(()=>{co="160",$m={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Lx=0,ap=1,Nx=2,Qm=1,Dx=2,tr=3,Vi=0,Ui=1,Si=2,Mr=0,Wo=1,cp=2,lp=3,up=4,zl=5,Is=100,Ux=101,Fx=102,hp=103,fp=104,Hl=200,Vl=201,Bx=202,Ox=203,Yo=204,Th=205,kx=206,zx=207,Hx=208,Vx=209,Gx=210,Wx=211,Xx=212,qx=213,Yx=214,jx=0,Zx=1,Kx=2,al=3,Jx=4,$x=5,pf=6,Qx=7,mf=0,ey=1,ty=2,Sr=0,ny=1,iy=2,sy=3,ry=4,oy=5,ay=6,dp="attached",cy="detached",eg=300,jo=301,Zo=302,wh=303,Ah=304,Gl=306,io=1e3,rs=1001,Va=1002,ui=1003,cl=1004,Ua=1005,Hi=1006,gf=1007,Tr=1008,Er=1009,ly=1010,uy=1011,xf=1012,tg=1013,vr=1014,Ns=1015,so=1016,ng=1017,ig=1018,eo=1020,hy=1021,os=1023,fy=1024,dy=1025,to=1026,Ko=1027,py=1028,sg=1029,my=1030,rg=1031,og=1033,Hu=33776,Vu=33777,Gu=33778,Wu=33779,pp=35840,mp=35841,gp=35842,xp=35843,ag=36196,yp=37492,_p=37496,vp=37808,bp=37809,Mp=37810,Sp=37811,Ep=37812,Tp=37813,wp=37814,Ap=37815,Rp=37816,Cp=37817,Pp=37818,Ip=37819,Lp=37820,Np=37821,Xu=36492,Dp=36494,Up=36495,gy=36283,Fp=36284,Bp=36285,Op=36286,Jo=2300,ro=2301,qu=2302,kp=2400,zp=2401,Hp=2402,xy=2500,cg=0,Wl=1,ic=2,lg=3e3,no=3001,yy=3200,_y=3201,yf=0,vy=1,fs="",Gn="srgb",di="srgb-linear",_f="display-p3",Xl="display-p3-linear",ll="linear",Vn="srgb",ul="rec709",hl="p3",Eo=7680,Vp=519,by=512,My=513,Sy=514,ug=515,Ey=516,Ty=517,wy=518,Ay=519,Rh=35044,Gp="300 es",Ch=1035,Ds=2e3,Ga=2001,wr=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let i=this._listeners[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}},Li=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Wp=1234567,Fa=Math.PI/180,$o=180/Math.PI;lo={DEG2RAD:Fa,RAD2DEG:$o,generateUUID:Es,clamp:si,euclideanModulo:vf,mapLinear:Ry,inverseLerp:Cy,lerp:Ba,damp:Py,pingpong:Iy,smoothstep:Ly,smootherstep:Ny,randInt:Dy,randFloat:Uy,randFloatSpread:Fy,seededRandom:By,degToRad:Oy,radToDeg:ky,isPowerOfTwo:Ph,ceilPowerOfTwo:zy,floorPowerOfTwo:fl,setQuaternionFromProperEuler:Hy,normalize:Ln,denormalize:Ls},et=class s{constructor(e=0,t=0){s.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(si(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},dn=class s{constructor(e,t,n,i,r,o,a,c,l){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,c,l)}set(e,t,n,i,r,o,a,c,l){let u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],h=n[7],f=n[2],d=n[5],g=n[8],y=i[0],m=i[3],p=i[6],v=i[1],_=i[4],E=i[7],w=i[2],A=i[5],R=i[8];return r[0]=o*y+a*v+c*w,r[3]=o*m+a*_+c*A,r[6]=o*p+a*E+c*R,r[1]=l*y+u*v+h*w,r[4]=l*m+u*_+h*A,r[7]=l*p+u*E+h*R,r[2]=f*y+d*v+g*w,r[5]=f*m+d*_+g*A,r[8]=f*p+d*E+g*R,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-n*r*u+n*a*c+i*r*l-i*o*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=u*o-a*l,f=a*c-u*r,d=l*r-o*c,g=t*h+n*f+i*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/g;return e[0]=h*y,e[1]=(i*l-u*n)*y,e[2]=(a*n-i*o)*y,e[3]=f*y,e[4]=(u*t-i*c)*y,e[5]=(i*r-a*t)*y,e[6]=d*y,e[7]=(n*c-l*t)*y,e[8]=(o*t-n*r)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-i*l,i*c,-i*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Yu.makeScale(e,t)),this}rotate(e){return this.premultiply(Yu.makeRotation(-e)),this}translate(e,t){return this.premultiply(Yu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Yu=new dn;Xp={};qp=new dn().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Yp=new dn().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Cc={[di]:{transfer:ll,primaries:ul,toReference:s=>s,fromReference:s=>s},[Gn]:{transfer:Vn,primaries:ul,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[Xl]:{transfer:ll,primaries:hl,toReference:s=>s.applyMatrix3(Yp),fromReference:s=>s.applyMatrix3(qp)},[_f]:{transfer:Vn,primaries:hl,toReference:s=>s.convertSRGBToLinear().applyMatrix3(Yp),fromReference:s=>s.applyMatrix3(qp).convertLinearToSRGB()}},Gy=new Set([di,Xl]),En={enabled:!0,_workingColorSpace:di,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!Gy.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;let n=Cc[e].toReference,i=Cc[t].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return Cc[s].primaries},getTransfer:function(s){return s===fs?ll:Cc[s].transfer}};dl=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement=="undefined")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{To===void 0&&(To=Wa("canvas")),To.width=e.width,To.height=e.height;let n=To.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=To}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement!="undefined"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&e instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&e instanceof ImageBitmap){let t=Wa("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Xo(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Xo(t[n]/255)*255):t[n]=Xo(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Wy=0,pl=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Wy++}),this.uuid=Es(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Zu(i[o].image)):r.push(Zu(i[o]))}else r=Zu(i);n.url=r}return t||(e.images[this.uuid]=n),n}};Xy=0,Fi=class s extends wr{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=rs,i=rs,r=Hi,o=Tr,a=os,c=Er,l=s.DEFAULT_ANISOTROPY,u=fs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Xy++}),this.uuid=Es(),this.name="",this.source=new pl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new et(0,0),this.repeat=new et(1,1),this.center=new et(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new dn,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(Oa("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===no?Gn:fs),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==eg)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case io:e.x=e.x-Math.floor(e.x);break;case rs:e.x=e.x<0?0:1;break;case Va:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case io:e.y=e.y-Math.floor(e.y);break;case rs:e.y=e.y<0?0:1;break;case Va:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Oa("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Gn?no:lg}set encoding(e){Oa("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===no?Gn:fs}};Fi.DEFAULT_IMAGE=null;Fi.DEFAULT_MAPPING=eg;Fi.DEFAULT_ANISOTROPY=1;Un=class s{constructor(e=0,t=0,n=0,i=1){s.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,c=e.elements,l=c[0],u=c[4],h=c[8],f=c[1],d=c[5],g=c[9],y=c[2],m=c[6],p=c[10];if(Math.abs(u-f)<.01&&Math.abs(h-y)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+y)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let _=(l+1)/2,E=(d+1)/2,w=(p+1)/2,A=(u+f)/4,R=(h+y)/4,O=(g+m)/4;return _>E&&_>w?_<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(_),i=A/n,r=R/n):E>w?E<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(E),n=A/i,r=O/i):w<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(w),n=R/r,i=O/r),this.set(n,i,r,t),this}let v=Math.sqrt((m-g)*(m-g)+(h-y)*(h-y)+(f-u)*(f-u));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(h-y)/v,this.z=(f-u)/v,this.w=Math.acos((l+d+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ih=class extends wr{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Un(0,0,e,t),this.scissorTest=!1,this.viewport=new Un(0,0,e,t);let i={width:e,height:t,depth:1};n.encoding!==void 0&&(Oa("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===no?Gn:fs),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Hi,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Fi(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new pl(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},ds=class extends Ih{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},ml=class extends Fi{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=ui,this.minFilter=ui,this.wrapR=rs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Lh=class extends Fi{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=ui,this.minFilter=ui,this.wrapR=rs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},pi=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let c=n[i+0],l=n[i+1],u=n[i+2],h=n[i+3],f=r[o+0],d=r[o+1],g=r[o+2],y=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=f,e[t+1]=d,e[t+2]=g,e[t+3]=y;return}if(h!==y||c!==f||l!==d||u!==g){let m=1-a,p=c*f+l*d+u*g+h*y,v=p>=0?1:-1,_=1-p*p;if(_>Number.EPSILON){let w=Math.sqrt(_),A=Math.atan2(w,p*v);m=Math.sin(m*A)/w,a=Math.sin(a*A)/w}let E=a*v;if(c=c*m+f*E,l=l*m+d*E,u=u*m+g*E,h=h*m+y*E,m===1-a){let w=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=w,l*=w,u*=w,h*=w}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,r,o){let a=n[i],c=n[i+1],l=n[i+2],u=n[i+3],h=r[o],f=r[o+1],d=r[o+2],g=r[o+3];return e[t]=a*g+u*h+c*d-l*f,e[t+1]=c*g+u*f+l*h-a*d,e[t+2]=l*g+u*d+a*f-c*h,e[t+3]=u*g-a*h-c*f-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(i/2),h=a(r/2),f=c(n/2),d=c(i/2),g=c(r/2);switch(o){case"XYZ":this._x=f*u*h+l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h-f*d*g;break;case"YXZ":this._x=f*u*h+l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h+f*d*g;break;case"ZXY":this._x=f*u*h-l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h-f*d*g;break;case"ZYX":this._x=f*u*h-l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h+f*d*g;break;case"YZX":this._x=f*u*h+l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h-f*d*g;break;case"XZY":this._x=f*u*h-l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],h=t[10],f=n+a+h;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-c)*d,this._y=(r-l)*d,this._z=(o-i)*d}else if(n>a&&n>h){let d=2*Math.sqrt(1+n-a-h);this._w=(u-c)/d,this._x=.25*d,this._y=(i+o)/d,this._z=(r+l)/d}else if(a>h){let d=2*Math.sqrt(1+a-n-h);this._w=(r-l)/d,this._x=(i+o)/d,this._y=.25*d,this._z=(c+u)/d}else{let d=2*Math.sqrt(1+h-n-a);this._w=(o-i)/d,this._x=(r+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(si(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+o*a+i*l-r*c,this._y=i*u+o*c+r*a-n*l,this._z=r*u+o*l+n*c-i*a,this._w=o*u-n*a-i*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,r=this._z,o=this._w,a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let d=1-t;return this._w=d*o+t*this._w,this._x=d*n+t*this._x,this._y=d*i+t*this._y,this._z=d*r+t*this._z,this.normalize(),this}let l=Math.sqrt(c),u=Math.atan2(l,a),h=Math.sin((1-t)*u)/l,f=Math.sin(t*u)/l;return this._w=o*h+this._w*f,this._x=n*h+this._x*f,this._y=i*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(r),n*Math.cos(r),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},T=class s{constructor(e=0,t=0,n=0){s.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(jp.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(jp.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*i-a*n),u=2*(a*t-r*i),h=2*(r*n-o*t);return this.x=t+c*l+o*h-a*u,this.y=n+c*u+a*l-r*h,this.z=i+c*h+r*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=i*c-r*a,this.y=r*o-n*c,this.z=n*a-i*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ku.copy(this).projectOnVector(e),this.sub(Ku)}reflect(e){return this.sub(Ku.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(si(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ku=new T,jp=new pi,sn=class{constructor(e=new T(1/0,1/0,1/0),t=new T(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(bs.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(bs.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=bs.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,bs):bs.fromBufferAttribute(r,o),bs.applyMatrix4(e.matrixWorld),this.expandByPoint(bs);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Pc.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Pc.copy(n.boundingBox)),Pc.applyMatrix4(e.matrixWorld),this.union(Pc)}let i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,bs),bs.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Aa),Ic.subVectors(this.max,Aa),wo.subVectors(e.a,Aa),Ao.subVectors(e.b,Aa),Ro.subVectors(e.c,Aa),pr.subVectors(Ao,wo),mr.subVectors(Ro,Ao),Yr.subVectors(wo,Ro);let t=[0,-pr.z,pr.y,0,-mr.z,mr.y,0,-Yr.z,Yr.y,pr.z,0,-pr.x,mr.z,0,-mr.x,Yr.z,0,-Yr.x,-pr.y,pr.x,0,-mr.y,mr.x,0,-Yr.y,Yr.x,0];return!Ju(t,wo,Ao,Ro,Ic)||(t=[1,0,0,0,1,0,0,0,1],!Ju(t,wo,Ao,Ro,Ic))?!1:(Lc.crossVectors(pr,mr),t=[Lc.x,Lc.y,Lc.z],Ju(t,wo,Ao,Ro,Ic))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,bs).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(bs).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Zs[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Zs[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Zs[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Zs[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Zs[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Zs[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Zs[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Zs[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Zs),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Zs=[new T,new T,new T,new T,new T,new T,new T,new T],bs=new T,Pc=new sn,wo=new T,Ao=new T,Ro=new T,pr=new T,mr=new T,Yr=new T,Aa=new T,Ic=new T,Lc=new T,jr=new T;qy=new sn,Ra=new T,$u=new T,Qn=class{constructor(e=new T,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):qy.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ra.subVectors(e,this.center);let t=Ra.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Ra,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):($u.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ra.copy(e.center).add($u)),this.expandByPoint(Ra.copy(e.center).sub($u))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Ks=new T,Qu=new T,Nc=new T,gr=new T,eh=new T,Dc=new T,th=new T,nr=class{constructor(e=new T,t=new T(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ks)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Ks.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ks.copy(this.origin).addScaledVector(this.direction,t),Ks.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Qu.copy(e).add(t).multiplyScalar(.5),Nc.copy(t).sub(e).normalize(),gr.copy(this.origin).sub(Qu);let r=e.distanceTo(t)*.5,o=-this.direction.dot(Nc),a=gr.dot(this.direction),c=-gr.dot(Nc),l=gr.lengthSq(),u=Math.abs(1-o*o),h,f,d,g;if(u>0)if(h=o*c-a,f=o*a-c,g=r*u,h>=0)if(f>=-g)if(f<=g){let y=1/u;h*=y,f*=y,d=h*(h+o*f+2*a)+f*(o*h+f+2*c)+l}else f=r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;else f=-r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;else f<=-g?(h=Math.max(0,-(-o*r+a)),f=h>0?-r:Math.min(Math.max(-r,-c),r),d=-h*h+f*(f+2*c)+l):f<=g?(h=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(h=Math.max(0,-(o*r+a)),f=h>0?r:Math.min(Math.max(-r,-c),r),d=-h*h+f*(f+2*c)+l);else f=o>0?-r:r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(Qu).addScaledVector(Nc,f),d}intersectSphere(e,t){Ks.subVectors(e.center,this.origin);let n=Ks.dot(this.direction),i=Ks.dot(Ks)-n*n,r=e.radius*e.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,c,l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,i=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,i=(e.min.x-f.x)*l),u>=0?(r=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),h>=0?(a=(e.min.z-f.z)*h,c=(e.max.z-f.z)*h):(a=(e.max.z-f.z)*h,c=(e.min.z-f.z)*h),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Ks)!==null}intersectTriangle(e,t,n,i,r){eh.subVectors(t,e),Dc.subVectors(n,e),th.crossVectors(eh,Dc);let o=this.direction.dot(th),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;gr.subVectors(this.origin,e);let c=a*this.direction.dot(Dc.crossVectors(gr,Dc));if(c<0)return null;let l=a*this.direction.dot(eh.cross(gr));if(l<0||c+l>o)return null;let u=-a*gr.dot(th);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},vt=class s{constructor(e,t,n,i,r,o,a,c,l,u,h,f,d,g,y,m){s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,c,l,u,h,f,d,g,y,m)}set(e,t,n,i,r,o,a,c,l,u,h,f,d,g,y,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=u,p[10]=h,p[14]=f,p[3]=d,p[7]=g,p[11]=y,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/Co.setFromMatrixColumn(e,0).length(),r=1/Co.setFromMatrixColumn(e,1).length(),o=1/Co.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){let f=o*u,d=o*h,g=a*u,y=a*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=d+g*l,t[5]=f-y*l,t[9]=-a*c,t[2]=y-f*l,t[6]=g+d*l,t[10]=o*c}else if(e.order==="YXZ"){let f=c*u,d=c*h,g=l*u,y=l*h;t[0]=f+y*a,t[4]=g*a-d,t[8]=o*l,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=d*a-g,t[6]=y+f*a,t[10]=o*c}else if(e.order==="ZXY"){let f=c*u,d=c*h,g=l*u,y=l*h;t[0]=f-y*a,t[4]=-o*h,t[8]=g+d*a,t[1]=d+g*a,t[5]=o*u,t[9]=y-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let f=o*u,d=o*h,g=a*u,y=a*h;t[0]=c*u,t[4]=g*l-d,t[8]=f*l+y,t[1]=c*h,t[5]=y*l+f,t[9]=d*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let f=o*c,d=o*l,g=a*c,y=a*l;t[0]=c*u,t[4]=y-f*h,t[8]=g*h+d,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=d*h+g,t[10]=f-y*h}else if(e.order==="XZY"){let f=o*c,d=o*l,g=a*c,y=a*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=f*h+y,t[5]=o*u,t[9]=d*h-g,t[2]=g*h-d,t[6]=a*u,t[10]=y*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Yy,e,jy)}lookAt(e,t,n){let i=this.elements;return ns.subVectors(e,t),ns.lengthSq()===0&&(ns.z=1),ns.normalize(),xr.crossVectors(n,ns),xr.lengthSq()===0&&(Math.abs(n.z)===1?ns.x+=1e-4:ns.z+=1e-4,ns.normalize(),xr.crossVectors(n,ns)),xr.normalize(),Uc.crossVectors(ns,xr),i[0]=xr.x,i[4]=Uc.x,i[8]=ns.x,i[1]=xr.y,i[5]=Uc.y,i[9]=ns.y,i[2]=xr.z,i[6]=Uc.z,i[10]=ns.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],h=n[5],f=n[9],d=n[13],g=n[2],y=n[6],m=n[10],p=n[14],v=n[3],_=n[7],E=n[11],w=n[15],A=i[0],R=i[4],O=i[8],b=i[12],P=i[1],V=i[5],X=i[9],se=i[13],N=i[2],j=i[6],B=i[10],ye=i[14],be=i[3],ee=i[7],de=i[11],ze=i[15];return r[0]=o*A+a*P+c*N+l*be,r[4]=o*R+a*V+c*j+l*ee,r[8]=o*O+a*X+c*B+l*de,r[12]=o*b+a*se+c*ye+l*ze,r[1]=u*A+h*P+f*N+d*be,r[5]=u*R+h*V+f*j+d*ee,r[9]=u*O+h*X+f*B+d*de,r[13]=u*b+h*se+f*ye+d*ze,r[2]=g*A+y*P+m*N+p*be,r[6]=g*R+y*V+m*j+p*ee,r[10]=g*O+y*X+m*B+p*de,r[14]=g*b+y*se+m*ye+p*ze,r[3]=v*A+_*P+E*N+w*be,r[7]=v*R+_*V+E*j+w*ee,r[11]=v*O+_*X+E*B+w*de,r[15]=v*b+_*se+E*ye+w*ze,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],h=e[6],f=e[10],d=e[14],g=e[3],y=e[7],m=e[11],p=e[15];return g*(+r*c*h-i*l*h-r*a*f+n*l*f+i*a*d-n*c*d)+y*(+t*c*d-t*l*f+r*o*f-i*o*d+i*l*u-r*c*u)+m*(+t*l*h-t*a*d-r*o*h+n*o*d+r*a*u-n*l*u)+p*(-i*a*u-t*c*h+t*a*f+i*o*h-n*o*f+n*c*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=e[9],f=e[10],d=e[11],g=e[12],y=e[13],m=e[14],p=e[15],v=h*m*l-y*f*l+y*c*d-a*m*d-h*c*p+a*f*p,_=g*f*l-u*m*l-g*c*d+o*m*d+u*c*p-o*f*p,E=u*y*l-g*h*l+g*a*d-o*y*d-u*a*p+o*h*p,w=g*h*c-u*y*c-g*a*f+o*y*f+u*a*m-o*h*m,A=t*v+n*_+i*E+r*w;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let R=1/A;return e[0]=v*R,e[1]=(y*f*r-h*m*r-y*i*d+n*m*d+h*i*p-n*f*p)*R,e[2]=(a*m*r-y*c*r+y*i*l-n*m*l-a*i*p+n*c*p)*R,e[3]=(h*c*r-a*f*r-h*i*l+n*f*l+a*i*d-n*c*d)*R,e[4]=_*R,e[5]=(u*m*r-g*f*r+g*i*d-t*m*d-u*i*p+t*f*p)*R,e[6]=(g*c*r-o*m*r-g*i*l+t*m*l+o*i*p-t*c*p)*R,e[7]=(o*f*r-u*c*r+u*i*l-t*f*l-o*i*d+t*c*d)*R,e[8]=E*R,e[9]=(g*h*r-u*y*r-g*n*d+t*y*d+u*n*p-t*h*p)*R,e[10]=(o*y*r-g*a*r+g*n*l-t*y*l-o*n*p+t*a*p)*R,e[11]=(u*a*r-o*h*r-u*n*l+t*h*l+o*n*d-t*a*d)*R,e[12]=w*R,e[13]=(u*y*i-g*h*i+g*n*f-t*y*f-u*n*m+t*h*m)*R,e[14]=(g*a*i-o*y*i-g*n*c+t*y*c+o*n*m-t*a*m)*R,e[15]=(o*h*i-u*a*i+u*n*c-t*h*c-o*n*f+t*a*f)*R,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,u=r*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,u*a+n,u*c-i*o,0,l*c-i*a,u*c+i*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,u=o+o,h=a+a,f=r*l,d=r*u,g=r*h,y=o*u,m=o*h,p=a*h,v=c*l,_=c*u,E=c*h,w=n.x,A=n.y,R=n.z;return i[0]=(1-(y+p))*w,i[1]=(d+E)*w,i[2]=(g-_)*w,i[3]=0,i[4]=(d-E)*A,i[5]=(1-(f+p))*A,i[6]=(m+v)*A,i[7]=0,i[8]=(g+_)*R,i[9]=(m-v)*R,i[10]=(1-(f+y))*R,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,r=Co.set(i[0],i[1],i[2]).length(),o=Co.set(i[4],i[5],i[6]).length(),a=Co.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],Ms.copy(this);let l=1/r,u=1/o,h=1/a;return Ms.elements[0]*=l,Ms.elements[1]*=l,Ms.elements[2]*=l,Ms.elements[4]*=u,Ms.elements[5]*=u,Ms.elements[6]*=u,Ms.elements[8]*=h,Ms.elements[9]*=h,Ms.elements[10]*=h,t.setFromRotationMatrix(Ms),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o,a=Ds){let c=this.elements,l=2*r/(t-e),u=2*r/(n-i),h=(t+e)/(t-e),f=(n+i)/(n-i),d,g;if(a===Ds)d=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Ga)d=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=Ds){let c=this.elements,l=1/(t-e),u=1/(n-i),h=1/(o-r),f=(t+e)*l,d=(n+i)*u,g,y;if(a===Ds)g=(o+r)*h,y=-2*h;else if(a===Ga)g=r*h,y=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=y,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Co=new T,Ms=new vt,Yy=new T(0,0,0),jy=new T(1,1,1),xr=new T,Uc=new T,ns=new T,Zp=new vt,Kp=new pi,Qo=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],o=i[4],a=i[8],c=i[1],l=i[5],u=i[9],h=i[2],f=i[6],d=i[10];switch(t){case"XYZ":this._y=Math.asin(si(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-si(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(si(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-si(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(si(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-si(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Zp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Zp,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Kp.setFromEuler(this),this.setFromQuaternion(Kp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Qo.DEFAULT_ORDER="XYZ";Xa=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Zy=0,Jp=new T,Po=new pi,Js=new vt,Fc=new T,Ca=new T,Ky=new T,Jy=new pi,$p=new T(1,0,0),Qp=new T(0,1,0),em=new T(0,0,1),$y={type:"added"},Qy={type:"removed"},Yn=class s extends wr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Zy++}),this.uuid=Es(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new T,t=new Qo,n=new pi,i=new T(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new vt},normalMatrix:{value:new dn}}),this.matrix=new vt,this.matrixWorld=new vt,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Xa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Po.setFromAxisAngle(e,t),this.quaternion.multiply(Po),this}rotateOnWorldAxis(e,t){return Po.setFromAxisAngle(e,t),this.quaternion.premultiply(Po),this}rotateX(e){return this.rotateOnAxis($p,e)}rotateY(e){return this.rotateOnAxis(Qp,e)}rotateZ(e){return this.rotateOnAxis(em,e)}translateOnAxis(e,t){return Jp.copy(e).applyQuaternion(this.quaternion),this.position.add(Jp.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis($p,e)}translateY(e){return this.translateOnAxis(Qp,e)}translateZ(e){return this.translateOnAxis(em,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Js.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Fc.copy(e):Fc.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Ca.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Js.lookAt(Ca,Fc,this.up):Js.lookAt(Fc,Ca,this.up),this.quaternion.setFromRotationMatrix(Js),i&&(Js.extractRotation(i.matrixWorld),Po.setFromRotationMatrix(Js),this.quaternion.premultiply(Po.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent($y)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Qy)),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Js.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Js.multiply(e.parent.matrixWorld)),e.applyMatrix4(Js),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ca,e,Ky),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ca,Jy,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++){let r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){let i=this.children;for(let r=0,o=i.length;r<o;r++){let a=i[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let h=c[l];r(e.shapes,h)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];i.animations.push(r(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),u=o(e.images),h=o(e.shapes),f=o(e.skeletons),d=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){let c=[];for(let l in a){let u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};Yn.DEFAULT_UP=new T(0,1,0);Yn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Yn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;Ss=new T,$s=new T,nh=new T,Qs=new T,Io=new T,Lo=new T,tm=new T,ih=new T,sh=new T,rh=new T,Bc=!1,Ki=class s{constructor(e=new T,t=new T,n=new T){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Ss.subVectors(e,t),i.cross(Ss);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Ss.subVectors(i,t),$s.subVectors(n,t),nh.subVectors(e,t);let o=Ss.dot(Ss),a=Ss.dot($s),c=Ss.dot(nh),l=$s.dot($s),u=$s.dot(nh),h=o*l-a*a;if(h===0)return r.set(0,0,0),null;let f=1/h,d=(l*c-a*u)*f,g=(o*u-a*c)*f;return r.set(1-d-g,g,d)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Qs)===null?!1:Qs.x>=0&&Qs.y>=0&&Qs.x+Qs.y<=1}static getUV(e,t,n,i,r,o,a,c){return Bc===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Bc=!0),this.getInterpolation(e,t,n,i,r,o,a,c)}static getInterpolation(e,t,n,i,r,o,a,c){return this.getBarycoord(e,t,n,i,Qs)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Qs.x),c.addScaledVector(o,Qs.y),c.addScaledVector(a,Qs.z),c)}static isFrontFacing(e,t,n,i){return Ss.subVectors(n,t),$s.subVectors(e,t),Ss.cross($s).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ss.subVectors(this.c,this.b),$s.subVectors(this.a,this.b),Ss.cross($s).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,r){return Bc===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Bc=!0),s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,o,a;Io.subVectors(i,n),Lo.subVectors(r,n),ih.subVectors(e,n);let c=Io.dot(ih),l=Lo.dot(ih);if(c<=0&&l<=0)return t.copy(n);sh.subVectors(e,i);let u=Io.dot(sh),h=Lo.dot(sh);if(u>=0&&h<=u)return t.copy(i);let f=c*h-u*l;if(f<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(n).addScaledVector(Io,o);rh.subVectors(e,r);let d=Io.dot(rh),g=Lo.dot(rh);if(g>=0&&d<=g)return t.copy(r);let y=d*l-c*g;if(y<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(Lo,a);let m=u*g-d*h;if(m<=0&&h-u>=0&&d-g>=0)return tm.subVectors(r,i),a=(h-u)/(h-u+(d-g)),t.copy(i).addScaledVector(tm,a);let p=1/(m+y+f);return o=y*p,a=f*p,t.copy(n).addScaledVector(Io,o).addScaledVector(Lo,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},fg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},yr={h:0,s:0,l:0},Oc={h:0,s:0,l:0};Tt=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Gn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,En.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=En.workingColorSpace){return this.r=e,this.g=t,this.b=n,En.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=En.workingColorSpace){if(e=vf(e,1),t=si(t,0,1),n=si(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=oh(o,r,e+1/3),this.g=oh(o,r,e),this.b=oh(o,r,e-1/3)}return En.toWorkingColorSpace(this,i),this}setStyle(e,t=Gn){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Gn){let n=fg[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Xo(e.r),this.g=Xo(e.g),this.b=Xo(e.b),this}copyLinearToSRGB(e){return this.r=ju(e.r),this.g=ju(e.g),this.b=ju(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Gn){return En.fromWorkingColorSpace(Ni.copy(this),e),Math.round(si(Ni.r*255,0,255))*65536+Math.round(si(Ni.g*255,0,255))*256+Math.round(si(Ni.b*255,0,255))}getHexString(e=Gn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=En.workingColorSpace){En.fromWorkingColorSpace(Ni.copy(this),t);let n=Ni.r,i=Ni.g,r=Ni.b,o=Math.max(n,i,r),a=Math.min(n,i,r),c,l,u=(a+o)/2;if(a===o)c=0,l=0;else{let h=o-a;switch(l=u<=.5?h/(o+a):h/(2-o-a),o){case n:c=(i-r)/h+(i<r?6:0);break;case i:c=(r-n)/h+2;break;case r:c=(n-i)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=En.workingColorSpace){return En.fromWorkingColorSpace(Ni.copy(this),t),e.r=Ni.r,e.g=Ni.g,e.b=Ni.b,e}getStyle(e=Gn){En.fromWorkingColorSpace(Ni.copy(this),e);let t=Ni.r,n=Ni.g,i=Ni.b;return e!==Gn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(yr),this.setHSL(yr.h+e,yr.s+t,yr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(yr),e.getHSL(Oc);let n=Ba(yr.h,Oc.h,t),i=Ba(yr.s,Oc.s,t),r=Ba(yr.l,Oc.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ni=new Tt;Tt.NAMES=fg;e_=0,Ji=class extends wr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:e_++}),this.uuid=Es(),this.name="",this.type="Material",this.blending=Wo,this.side=Vi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Yo,this.blendDst=Th,this.blendEquation=Is,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Tt(0,0,0),this.blendAlpha=0,this.depthFunc=al,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Vp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Eo,this.stencilZFail=Eo,this.stencilZPass=Eo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Wo&&(n.blending=this.blending),this.side!==Vi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Yo&&(n.blendSrc=this.blendSrc),this.blendDst!==Th&&(n.blendDst=this.blendDst),this.blendEquation!==Is&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==al&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Vp&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Eo&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Eo&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Eo&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(t){let r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Gi=class extends Ji{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Tt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=mf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},ii=new T,kc=new et,An=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Rh,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Ns,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)kc.fromBufferAttribute(this,t),kc.applyMatrix3(e),this.setXY(t,kc.x,kc.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ii.fromBufferAttribute(this,t),ii.applyMatrix3(e),this.setXYZ(t,ii.x,ii.y,ii.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ii.fromBufferAttribute(this,t),ii.applyMatrix4(e),this.setXYZ(t,ii.x,ii.y,ii.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ii.fromBufferAttribute(this,t),ii.applyNormalMatrix(e),this.setXYZ(t,ii.x,ii.y,ii.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ii.fromBufferAttribute(this,t),ii.transformDirection(e),this.setXYZ(t,ii.x,ii.y,ii.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ls(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ln(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ls(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ln(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ls(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ln(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ls(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ln(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ls(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ln(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ln(t,this.array),n=Ln(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Ln(t,this.array),n=Ln(n,this.array),i=Ln(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=Ln(t,this.array),n=Ln(n,this.array),i=Ln(i,this.array),r=Ln(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Rh&&(e.usage=this.usage),e}},ea=class extends An{constructor(e,t,n){super(new Uint16Array(e),t,n)}},ta=class extends An{constructor(e,t,n){super(new Uint32Array(e),t,n)}},fi=class extends An{constructor(e,t,n){super(new Float32Array(e),t,n)}},t_=0,hs=new vt,ah=new Yn,No=new T,is=new sn,Pa=new sn,Mi=new T,Ei=class s extends wr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:t_++}),this.uuid=Es(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(hg(e)?ta:ea)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new dn().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return hs.makeRotationFromQuaternion(e),this.applyMatrix4(hs),this}rotateX(e){return hs.makeRotationX(e),this.applyMatrix4(hs),this}rotateY(e){return hs.makeRotationY(e),this.applyMatrix4(hs),this}rotateZ(e){return hs.makeRotationZ(e),this.applyMatrix4(hs),this}translate(e,t,n){return hs.makeTranslation(e,t,n),this.applyMatrix4(hs),this}scale(e,t,n){return hs.makeScale(e,t,n),this.applyMatrix4(hs),this}lookAt(e){return ah.lookAt(e),ah.updateMatrix(),this.applyMatrix4(ah.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(No).negate(),this.translate(No.x,No.y,No.z),this}setFromPoints(e){let t=[];for(let n=0,i=e.length;n<i;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new fi(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new sn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new T(-1/0,-1/0,-1/0),new T(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];is.setFromBufferAttribute(r),this.morphTargetsRelative?(Mi.addVectors(this.boundingBox.min,is.min),this.boundingBox.expandByPoint(Mi),Mi.addVectors(this.boundingBox.max,is.max),this.boundingBox.expandByPoint(Mi)):(this.boundingBox.expandByPoint(is.min),this.boundingBox.expandByPoint(is.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Qn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new T,1/0);return}if(e){let n=this.boundingSphere.center;if(is.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];Pa.setFromBufferAttribute(a),this.morphTargetsRelative?(Mi.addVectors(is.min,Pa.min),is.expandByPoint(Mi),Mi.addVectors(is.max,Pa.max),is.expandByPoint(Mi)):(is.expandByPoint(Pa.min),is.expandByPoint(Pa.max))}is.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)Mi.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Mi));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Mi.fromBufferAttribute(a,l),c&&(No.fromBufferAttribute(e,l),Mi.add(No)),i=Math.max(i,n.distanceToSquared(Mi))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.array,i=t.position.array,r=t.normal.array,o=t.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new An(new Float32Array(4*a),4));let c=this.getAttribute("tangent").array,l=[],u=[];for(let P=0;P<a;P++)l[P]=new T,u[P]=new T;let h=new T,f=new T,d=new T,g=new et,y=new et,m=new et,p=new T,v=new T;function _(P,V,X){h.fromArray(i,P*3),f.fromArray(i,V*3),d.fromArray(i,X*3),g.fromArray(o,P*2),y.fromArray(o,V*2),m.fromArray(o,X*2),f.sub(h),d.sub(h),y.sub(g),m.sub(g);let se=1/(y.x*m.y-m.x*y.y);isFinite(se)&&(p.copy(f).multiplyScalar(m.y).addScaledVector(d,-y.y).multiplyScalar(se),v.copy(d).multiplyScalar(y.x).addScaledVector(f,-m.x).multiplyScalar(se),l[P].add(p),l[V].add(p),l[X].add(p),u[P].add(v),u[V].add(v),u[X].add(v))}let E=this.groups;E.length===0&&(E=[{start:0,count:n.length}]);for(let P=0,V=E.length;P<V;++P){let X=E[P],se=X.start,N=X.count;for(let j=se,B=se+N;j<B;j+=3)_(n[j+0],n[j+1],n[j+2])}let w=new T,A=new T,R=new T,O=new T;function b(P){R.fromArray(r,P*3),O.copy(R);let V=l[P];w.copy(V),w.sub(R.multiplyScalar(R.dot(V))).normalize(),A.crossVectors(O,V);let se=A.dot(u[P])<0?-1:1;c[P*4]=w.x,c[P*4+1]=w.y,c[P*4+2]=w.z,c[P*4+3]=se}for(let P=0,V=E.length;P<V;++P){let X=E[P],se=X.start,N=X.count;for(let j=se,B=se+N;j<B;j+=3)b(n[j+0]),b(n[j+1]),b(n[j+2])}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new An(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let i=new T,r=new T,o=new T,a=new T,c=new T,l=new T,u=new T,h=new T;if(e)for(let f=0,d=e.count;f<d;f+=3){let g=e.getX(f+0),y=e.getX(f+1),m=e.getX(f+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,y),o.fromBufferAttribute(t,m),u.subVectors(o,r),h.subVectors(i,r),u.cross(h),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,y),l.fromBufferAttribute(n,m),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(y,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=t.count;f<d;f+=3)i.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,r),h.subVectors(i,r),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Mi.fromBufferAttribute(e,t),Mi.normalize(),e.setXYZ(t,Mi.x,Mi.y,Mi.z)}toNonIndexed(){function e(a,c){let l=a.array,u=a.itemSize,h=a.normalized,f=new l.constructor(c.length*u),d=0,g=0;for(let y=0,m=c.length;y<m;y++){a.isInterleavedBufferAttribute?d=c[y]*a.data.stride+a.offset:d=c[y]*u;for(let p=0;p<u;p++)f[g++]=l[d++]}return new An(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let a in i){let c=i[a],l=e(c,n);t.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let u=0,h=l.length;u<h;u++){let f=l[u],d=e(f,n);c.push(d)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let h=0,f=l.length;h<f;h++){let d=l[h];u.push(d.toJSON(e.data))}u.length>0&&(i[c]=u,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let i=e.attributes;for(let l in i){let u=i[l];this.setAttribute(l,u.clone(t))}let r=e.morphAttributes;for(let l in r){let u=[],h=r[l];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,u=o.length;l<u;l++){let h=o[l];this.addGroup(h.start,h.count,h.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},nm=new vt,Zr=new nr,zc=new Qn,im=new T,Do=new T,Uo=new T,Fo=new T,ch=new T,Hc=new T,Vc=new et,Gc=new et,Wc=new et,sm=new T,rm=new T,om=new T,Xc=new T,qc=new T,Tn=class extends Yn{constructor(e=new Ei,t=new Gi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let a=this.morphTargetInfluences;if(r&&a){Hc.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let u=a[c],h=r[c];u!==0&&(ch.fromBufferAttribute(h,e),o?Hc.addScaledVector(ch,u):Hc.addScaledVector(ch.sub(t),u))}t.add(Hc)}return t}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),zc.copy(n.boundingSphere),zc.applyMatrix4(r),Zr.copy(e.ray).recast(e.near),!(zc.containsPoint(Zr.origin)===!1&&(Zr.intersectSphere(zc,im)===null||Zr.origin.distanceToSquared(im)>(e.far-e.near)**2))&&(nm.copy(r).invert(),Zr.copy(e.ray).applyMatrix4(nm),!(n.boundingBox!==null&&Zr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Zr)))}_computeIntersections(e,t,n){let i,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,y=f.length;g<y;g++){let m=f[g],p=o[m.materialIndex],v=Math.max(m.start,d.start),_=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let E=v,w=_;E<w;E+=3){let A=a.getX(E),R=a.getX(E+1),O=a.getX(E+2);i=Yc(this,p,e,n,l,u,h,A,R,O),i&&(i.faceIndex=Math.floor(E/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let g=Math.max(0,d.start),y=Math.min(a.count,d.start+d.count);for(let m=g,p=y;m<p;m+=3){let v=a.getX(m),_=a.getX(m+1),E=a.getX(m+2);i=Yc(this,o,e,n,l,u,h,v,_,E),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,y=f.length;g<y;g++){let m=f[g],p=o[m.materialIndex],v=Math.max(m.start,d.start),_=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let E=v,w=_;E<w;E+=3){let A=E,R=E+1,O=E+2;i=Yc(this,p,e,n,l,u,h,A,R,O),i&&(i.faceIndex=Math.floor(E/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let g=Math.max(0,d.start),y=Math.min(c.count,d.start+d.count);for(let m=g,p=y;m<p;m+=3){let v=m,_=m+1,E=m+2;i=Yc(this,o,e,n,l,u,h,v,_,E),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}};qa=class s extends Ei{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],u=[],h=[],f=0,d=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,i,o,2),g("x","z","y",1,-1,e,n,-t,i,o,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new fi(l,3)),this.setAttribute("normal",new fi(u,3)),this.setAttribute("uv",new fi(h,2));function g(y,m,p,v,_,E,w,A,R,O,b){let P=E/R,V=w/O,X=E/2,se=w/2,N=A/2,j=R+1,B=O+1,ye=0,be=0,ee=new T;for(let de=0;de<B;de++){let ze=de*V-se;for(let $e=0;$e<j;$e++){let te=$e*P-X;ee[y]=te*v,ee[m]=ze*_,ee[p]=N,l.push(ee.x,ee.y,ee.z),ee[y]=0,ee[m]=0,ee[p]=A>0?1:-1,u.push(ee.x,ee.y,ee.z),h.push($e/R),h.push(1-de/O),ye+=1}}for(let de=0;de<O;de++)for(let ze=0;ze<R;ze++){let $e=f+ze+j*de,te=f+ze+j*(de+1),Ie=f+(ze+1)+j*(de+1),Oe=f+(ze+1)+j*de;c.push($e,te,Oe),c.push(te,Ie,Oe),be+=6}a.addGroup(d,be,b),d+=be,f+=ye}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};s_={clone:na,merge:zi},r_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,o_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Wi=class extends Ji{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=r_,this.fragmentShader=o_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=na(e.uniforms),this.uniformsGroups=i_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},gl=class extends Yn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new vt,this.projectionMatrix=new vt,this.projectionMatrixInverse=new vt,this.coordinateSystem=Ds}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},hi=class extends gl{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=$o*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Fa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return $o*2*Math.atan(Math.tan(Fa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Fa*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*i/c,t-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Bo=-90,Oo=1,Nh=class extends Yn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new hi(Bo,Oo,e,t);i.layers=this.layers,this.add(i);let r=new hi(Bo,Oo,e,t);r.layers=this.layers,this.add(r);let o=new hi(Bo,Oo,e,t);o.layers=this.layers,this.add(o);let a=new hi(Bo,Oo,e,t);a.layers=this.layers,this.add(a);let c=new hi(Bo,Oo,e,t);c.layers=this.layers,this.add(c);let l=new hi(Bo,Oo,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,c]=t;for(let l of t)this.remove(l);if(e===Ds)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ga)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(h,f,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},xl=class extends Fi{constructor(e,t,n,i,r,o,a,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:jo,super(e,t,n,i,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Dh=class extends ds{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];t.encoding!==void 0&&(Oa("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===no?Gn:fs),this.texture=new xl(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Hi}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new qa(5,5,5),r=new Wi({name:"CubemapFromEquirect",uniforms:na(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ui,blending:Mr});r.uniforms.tEquirect.value=t;let o=new Tn(i,r),a=t.minFilter;return t.minFilter===Tr&&(t.minFilter=Hi),new Nh(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}},lh=new T,a_=new T,c_=new dn,ss=class{constructor(e=new T(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=lh.subVectors(n,t).cross(a_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(lh),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||c_.getNormalMatrix(e),i=this.coplanarPoint(lh).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Kr=new Qn,jc=new T,Ar=class{constructor(e=new ss,t=new ss,n=new ss,i=new ss,r=new ss,o=new ss){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ds){let n=this.planes,i=e.elements,r=i[0],o=i[1],a=i[2],c=i[3],l=i[4],u=i[5],h=i[6],f=i[7],d=i[8],g=i[9],y=i[10],m=i[11],p=i[12],v=i[13],_=i[14],E=i[15];if(n[0].setComponents(c-r,f-l,m-d,E-p).normalize(),n[1].setComponents(c+r,f+l,m+d,E+p).normalize(),n[2].setComponents(c+o,f+u,m+g,E+v).normalize(),n[3].setComponents(c-o,f-u,m-g,E-v).normalize(),n[4].setComponents(c-a,f-h,m-y,E-_).normalize(),t===Ds)n[5].setComponents(c+a,f+h,m+y,E+_).normalize();else if(t===Ga)n[5].setComponents(a,h,y,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Kr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Kr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Kr)}intersectsSprite(e){return Kr.center.set(0,0,0),Kr.radius=.7071067811865476,Kr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Kr)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(jc.x=i.normal.x>0?e.max.x:e.min.x,jc.y=i.normal.y>0?e.max.y:e.min.y,jc.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(jc)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};oo=class s extends Ei{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(i),l=a+1,u=c+1,h=e/a,f=t/c,d=[],g=[],y=[],m=[];for(let p=0;p<u;p++){let v=p*f-o;for(let _=0;_<l;_++){let E=_*h-r;g.push(E,-v,0),y.push(0,0,1),m.push(_/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let v=0;v<a;v++){let _=v+l*p,E=v+l*(p+1),w=v+1+l*(p+1),A=v+1+l*p;d.push(_,E,A),d.push(E,w,A)}this.setIndex(d),this.setAttribute("position",new fi(g,3)),this.setAttribute("normal",new fi(y,3)),this.setAttribute("uv",new fi(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}},u_=`#ifdef USE_ALPHAHASH
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
#endif`,k_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,z_="gl_FragColor = linearToOutputTexel( gl_FragColor );",H_=`
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
}`,kv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,zv=`vec4 mvPosition = vec4( transformed, 1.0 );
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
}`,kb=`#include <common>
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
}`,zb=`uniform vec3 color;
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
}`,fn={alphahash_fragment:u_,alphahash_pars_fragment:h_,alphamap_fragment:f_,alphamap_pars_fragment:d_,alphatest_fragment:p_,alphatest_pars_fragment:m_,aomap_fragment:g_,aomap_pars_fragment:x_,batching_pars_vertex:y_,batching_vertex:__,begin_vertex:v_,beginnormal_vertex:b_,bsdfs:M_,iridescence_fragment:S_,bumpmap_pars_fragment:E_,clipping_planes_fragment:T_,clipping_planes_pars_fragment:w_,clipping_planes_pars_vertex:A_,clipping_planes_vertex:R_,color_fragment:C_,color_pars_fragment:P_,color_pars_vertex:I_,color_vertex:L_,common:N_,cube_uv_reflection_fragment:D_,defaultnormal_vertex:U_,displacementmap_pars_vertex:F_,displacementmap_vertex:B_,emissivemap_fragment:O_,emissivemap_pars_fragment:k_,colorspace_fragment:z_,colorspace_pars_fragment:H_,envmap_fragment:V_,envmap_common_pars_fragment:G_,envmap_pars_fragment:W_,envmap_pars_vertex:X_,envmap_physical_pars_fragment:iv,envmap_vertex:q_,fog_vertex:Y_,fog_pars_vertex:j_,fog_fragment:Z_,fog_pars_fragment:K_,gradientmap_pars_fragment:J_,lightmap_fragment:$_,lightmap_pars_fragment:Q_,lights_lambert_fragment:ev,lights_lambert_pars_fragment:tv,lights_pars_begin:nv,lights_toon_fragment:sv,lights_toon_pars_fragment:rv,lights_phong_fragment:ov,lights_phong_pars_fragment:av,lights_physical_fragment:cv,lights_physical_pars_fragment:lv,lights_fragment_begin:uv,lights_fragment_maps:hv,lights_fragment_end:fv,logdepthbuf_fragment:dv,logdepthbuf_pars_fragment:pv,logdepthbuf_pars_vertex:mv,logdepthbuf_vertex:gv,map_fragment:xv,map_pars_fragment:yv,map_particle_fragment:_v,map_particle_pars_fragment:vv,metalnessmap_fragment:bv,metalnessmap_pars_fragment:Mv,morphcolor_vertex:Sv,morphnormal_vertex:Ev,morphtarget_pars_vertex:Tv,morphtarget_vertex:wv,normal_fragment_begin:Av,normal_fragment_maps:Rv,normal_pars_fragment:Cv,normal_pars_vertex:Pv,normal_vertex:Iv,normalmap_pars_fragment:Lv,clearcoat_normal_fragment_begin:Nv,clearcoat_normal_fragment_maps:Dv,clearcoat_pars_fragment:Uv,iridescence_pars_fragment:Fv,opaque_fragment:Bv,packing:Ov,premultiplied_alpha_fragment:kv,project_vertex:zv,dithering_fragment:Hv,dithering_pars_fragment:Vv,roughnessmap_fragment:Gv,roughnessmap_pars_fragment:Wv,shadowmap_pars_fragment:Xv,shadowmap_pars_vertex:qv,shadowmap_vertex:Yv,shadowmask_pars_fragment:jv,skinbase_vertex:Zv,skinning_pars_vertex:Kv,skinning_vertex:Jv,skinnormal_vertex:$v,specularmap_fragment:Qv,specularmap_pars_fragment:eb,tonemapping_fragment:tb,tonemapping_pars_fragment:nb,transmission_fragment:ib,transmission_pars_fragment:sb,uv_pars_fragment:rb,uv_pars_vertex:ob,uv_vertex:ab,worldpos_vertex:cb,background_vert:lb,background_frag:ub,backgroundCube_vert:hb,backgroundCube_frag:fb,cube_vert:db,cube_frag:pb,depth_vert:mb,depth_frag:gb,distanceRGBA_vert:xb,distanceRGBA_frag:yb,equirect_vert:_b,equirect_frag:vb,linedashed_vert:bb,linedashed_frag:Mb,meshbasic_vert:Sb,meshbasic_frag:Eb,meshlambert_vert:Tb,meshlambert_frag:wb,meshmatcap_vert:Ab,meshmatcap_frag:Rb,meshnormal_vert:Cb,meshnormal_frag:Pb,meshphong_vert:Ib,meshphong_frag:Lb,meshphysical_vert:Nb,meshphysical_frag:Db,meshtoon_vert:Ub,meshtoon_frag:Fb,points_vert:Bb,points_frag:Ob,shadow_vert:kb,shadow_frag:zb,sprite_vert:Hb,sprite_frag:Vb},je={common:{diffuse:{value:new Tt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new dn},alphaMap:{value:null},alphaMapTransform:{value:new dn},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new dn}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new dn}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new dn}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new dn},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new dn},normalScale:{value:new et(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new dn},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new dn}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new dn}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new dn}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Tt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Tt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new dn},alphaTest:{value:0},uvTransform:{value:new dn}},sprite:{diffuse:{value:new Tt(16777215)},opacity:{value:1},center:{value:new et(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new dn},alphaMap:{value:null},alphaMapTransform:{value:new dn},alphaTest:{value:0}}},Ps={basic:{uniforms:zi([je.common,je.specularmap,je.envmap,je.aomap,je.lightmap,je.fog]),vertexShader:fn.meshbasic_vert,fragmentShader:fn.meshbasic_frag},lambert:{uniforms:zi([je.common,je.specularmap,je.envmap,je.aomap,je.lightmap,je.emissivemap,je.bumpmap,je.normalmap,je.displacementmap,je.fog,je.lights,{emissive:{value:new Tt(0)}}]),vertexShader:fn.meshlambert_vert,fragmentShader:fn.meshlambert_frag},phong:{uniforms:zi([je.common,je.specularmap,je.envmap,je.aomap,je.lightmap,je.emissivemap,je.bumpmap,je.normalmap,je.displacementmap,je.fog,je.lights,{emissive:{value:new Tt(0)},specular:{value:new Tt(1118481)},shininess:{value:30}}]),vertexShader:fn.meshphong_vert,fragmentShader:fn.meshphong_frag},standard:{uniforms:zi([je.common,je.envmap,je.aomap,je.lightmap,je.emissivemap,je.bumpmap,je.normalmap,je.displacementmap,je.roughnessmap,je.metalnessmap,je.fog,je.lights,{emissive:{value:new Tt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:fn.meshphysical_vert,fragmentShader:fn.meshphysical_frag},toon:{uniforms:zi([je.common,je.aomap,je.lightmap,je.emissivemap,je.bumpmap,je.normalmap,je.displacementmap,je.gradientmap,je.fog,je.lights,{emissive:{value:new Tt(0)}}]),vertexShader:fn.meshtoon_vert,fragmentShader:fn.meshtoon_frag},matcap:{uniforms:zi([je.common,je.bumpmap,je.normalmap,je.displacementmap,je.fog,{matcap:{value:null}}]),vertexShader:fn.meshmatcap_vert,fragmentShader:fn.meshmatcap_frag},points:{uniforms:zi([je.points,je.fog]),vertexShader:fn.points_vert,fragmentShader:fn.points_frag},dashed:{uniforms:zi([je.common,je.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:fn.linedashed_vert,fragmentShader:fn.linedashed_frag},depth:{uniforms:zi([je.common,je.displacementmap]),vertexShader:fn.depth_vert,fragmentShader:fn.depth_frag},normal:{uniforms:zi([je.common,je.bumpmap,je.normalmap,je.displacementmap,{opacity:{value:1}}]),vertexShader:fn.meshnormal_vert,fragmentShader:fn.meshnormal_frag},sprite:{uniforms:zi([je.sprite,je.fog]),vertexShader:fn.sprite_vert,fragmentShader:fn.sprite_frag},background:{uniforms:{uvTransform:{value:new dn},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:fn.background_vert,fragmentShader:fn.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:fn.backgroundCube_vert,fragmentShader:fn.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:fn.cube_vert,fragmentShader:fn.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:fn.equirect_vert,fragmentShader:fn.equirect_frag},distanceRGBA:{uniforms:zi([je.common,je.displacementmap,{referencePosition:{value:new T},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:fn.distanceRGBA_vert,fragmentShader:fn.distanceRGBA_frag},shadow:{uniforms:zi([je.lights,je.fog,{color:{value:new Tt(0)},opacity:{value:1}}]),vertexShader:fn.shadow_vert,fragmentShader:fn.shadow_frag}};Ps.physical={uniforms:zi([Ps.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new dn},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new dn},clearcoatNormalScale:{value:new et(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new dn},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new dn},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new dn},sheen:{value:0},sheenColor:{value:new Tt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new dn},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new dn},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new dn},transmissionSamplerSize:{value:new et},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new dn},attenuationDistance:{value:0},attenuationColor:{value:new Tt(0)},specularColor:{value:new Tt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new dn},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new dn},anisotropyVector:{value:new et},anisotropyMap:{value:null},anisotropyMapTransform:{value:new dn}}]),vertexShader:fn.meshphysical_vert,fragmentShader:fn.meshphysical_frag};Zc={r:0,b:0,g:0};Rr=class extends gl{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,o=n+e,a=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Vo=4,am=[.125,.215,.35,.446,.526,.582],Qr=20,uh=new Rr,cm=new Tt,hh=null,fh=0,dh=0,$r=(1+Math.sqrt(5))/2,ko=1/$r,lm=[new T(1,1,1),new T(-1,1,1),new T(1,1,-1),new T(-1,1,-1),new T(0,$r,ko),new T(0,$r,-ko),new T(ko,0,$r),new T(-ko,0,$r),new T($r,ko,0),new T(-$r,ko,0)],yl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){hh=this._renderer.getRenderTarget(),fh=this._renderer.getActiveCubeFace(),dh=this._renderer.getActiveMipmapLevel(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=hm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(hh,fh,dh),e.scissorTest=!1,Kc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===jo||e.mapping===Zo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),hh=this._renderer.getRenderTarget(),fh=this._renderer.getActiveCubeFace(),dh=this._renderer.getActiveMipmapLevel();let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Hi,minFilter:Hi,generateMipmaps:!1,type:so,format:os,colorSpace:di,depthBuffer:!1},i=um(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=um(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Zb(r)),this._blurMaterial=Kb(r,e,t)}return i}_compileMaterial(e){let t=new Tn(this._lodPlanes[0],e);this._renderer.compile(t,uh)}_sceneToCubeUV(e,t,n,i){let a=new hi(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(cm),u.toneMapping=Sr,u.autoClear=!1;let d=new Gi({name:"PMREM.Background",side:Ui,depthWrite:!1,depthTest:!1}),g=new Tn(new qa,d),y=!1,m=e.background;m?m.isColor&&(d.color.copy(m),e.background=null,y=!0):(d.color.copy(cm),y=!0);for(let p=0;p<6;p++){let v=p%3;v===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):v===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));let _=this._cubeSize;Kc(i,v*_,p>2?_:0,_,_),u.setRenderTarget(i),y&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===jo||e.mapping===Zo;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=fm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=hm());let r=i?this._cubemapMaterial:this._equirectMaterial,o=new Tn(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let c=this._cubeSize;Kc(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,uh)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){let r=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=lm[(i-1)%lm.length];this._blur(e,i-1,i,r,o)}t.autoClear=n}_blur(e,t,n,i,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",r),this._halfBlur(o,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,h=new Tn(this._lodPlanes[i],l),f=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Qr-1),y=r/g,m=isFinite(r)?1+Math.floor(u*y):Qr;m>Qr&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Qr}`);let p=[],v=0;for(let R=0;R<Qr;++R){let O=R/y,b=Math.exp(-O*O/2);p.push(b),R===0?v+=b:R<m&&(v+=2*b)}for(let R=0;R<p.length;R++)p[R]=p[R]/v;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:_}=this;f.dTheta.value=g,f.mipInt.value=_-n;let E=this._sizeLods[i],w=3*E*(i>_-Vo?i-_+Vo:0),A=4*(this._cubeSize-E);Kc(t,w,A,3*E,2*E),c.setRenderTarget(t),c.render(h,uh)}};_l=class extends Fi{constructor(e,t,n,i,r,o,a,c,l,u){if(u=u!==void 0?u:to,u!==to&&u!==Ko)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===to&&(n=vr),n===void 0&&u===Ko&&(n=eo),super(null,i,r,o,a,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:ui,this.minFilter=c!==void 0?c:ui,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},mg=new Fi,gg=new _l(1,1);gg.compareFunction=ug;xg=new ml,yg=new Lh,_g=new xl,dm=[],pm=[],mm=new Float32Array(16),gm=new Float32Array(9),xm=new Float32Array(4);Uh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=TM(t.type)}},Fh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=XM(t.type)}},Bh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(e,t[a.id],n)}}},ph=/(\w+)(\])?(\[|\.)?/g;qo=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=e.getActiveUniform(t,i),o=e.getUniformLocation(t,r.name);qM(r,o,this)}}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){let a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let o=e[i];o.id in t&&n.push(o)}return n}};YM=37297,jM=0;iS=/^[ \t]*#include +<([\w\d./]+)>/gm;sS=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);oS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;pS=0,kh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new zh(e),t.set(e,n)),n}},zh=class{constructor(e){this.id=pS++,this.code=e,this.usedTimes=0}};bS=0;Hh=class extends Ji{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=yy,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Vh=class extends Ji{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},TS=`void main() {
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
}`;Gh=class extends hi{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},Us=class extends Yn{constructor(){super(),this.isGroup=!0,this.type="Group"}},IS={type:"move"},ka=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Us,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Us,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new T,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new T),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Us,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new T,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new T),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let y of e.hand.values()){let m=t.getJointPose(y,n),p=this._getHandJoint(l,y);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(IS)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Us;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Wh=class extends wr{constructor(e,t){super();let n=this,i=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,h=null,f=null,d=null,g=null,y=t.getContextAttributes(),m=null,p=null,v=[],_=[],E=new et,w=null,A=new hi;A.layers.enable(1),A.viewport=new Un;let R=new hi;R.layers.enable(2),R.viewport=new Un;let O=[A,R],b=new Gh;b.layers.enable(1),b.layers.enable(2);let P=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(te){let Ie=v[te];return Ie===void 0&&(Ie=new ka,v[te]=Ie),Ie.getTargetRaySpace()},this.getControllerGrip=function(te){let Ie=v[te];return Ie===void 0&&(Ie=new ka,v[te]=Ie),Ie.getGripSpace()},this.getHand=function(te){let Ie=v[te];return Ie===void 0&&(Ie=new ka,v[te]=Ie),Ie.getHandSpace()};function X(te){let Ie=_.indexOf(te.inputSource);if(Ie===-1)return;let Oe=v[Ie];Oe!==void 0&&(Oe.update(te.inputSource,te.frame,l||o),Oe.dispatchEvent({type:te.type,data:te.inputSource}))}function se(){i.removeEventListener("select",X),i.removeEventListener("selectstart",X),i.removeEventListener("selectend",X),i.removeEventListener("squeeze",X),i.removeEventListener("squeezestart",X),i.removeEventListener("squeezeend",X),i.removeEventListener("end",se),i.removeEventListener("inputsourceschange",N);for(let te=0;te<v.length;te++){let Ie=_[te];Ie!==null&&(_[te]=null,v[te].disconnect(Ie))}P=null,V=null,e.setRenderTarget(m),d=null,f=null,h=null,i=null,p=null,$e.stop(),n.isPresenting=!1,e.setPixelRatio(w),e.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(te){r=te,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(te){a=te,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(te){l=te},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(te){if(i=te,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",X),i.addEventListener("selectstart",X),i.addEventListener("selectend",X),i.addEventListener("squeeze",X),i.addEventListener("squeezestart",X),i.addEventListener("squeezeend",X),i.addEventListener("end",se),i.addEventListener("inputsourceschange",N),y.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(E),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){let Ie={antialias:i.renderState.layers===void 0?y.antialias:!0,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(i,t,Ie),i.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),p=new ds(d.framebufferWidth,d.framebufferHeight,{format:os,type:Er,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil})}else{let Ie=null,Oe=null,At=null;y.depth&&(At=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Ie=y.stencil?Ko:to,Oe=y.stencil?eo:vr);let tt={colorFormat:t.RGBA8,depthFormat:At,scaleFactor:r};h=new XRWebGLBinding(i,t),f=h.createProjectionLayer(tt),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),p=new ds(f.textureWidth,f.textureHeight,{format:os,type:Er,depthTexture:new _l(f.textureWidth,f.textureHeight,Oe,void 0,void 0,void 0,void 0,void 0,void 0,Ie),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0});let Ht=e.properties.get(p);Ht.__ignoreDepthValues=f.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),$e.setContext(i),$e.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function N(te){for(let Ie=0;Ie<te.removed.length;Ie++){let Oe=te.removed[Ie],At=_.indexOf(Oe);At>=0&&(_[At]=null,v[At].disconnect(Oe))}for(let Ie=0;Ie<te.added.length;Ie++){let Oe=te.added[Ie],At=_.indexOf(Oe);if(At===-1){for(let Ht=0;Ht<v.length;Ht++)if(Ht>=_.length){_.push(Oe),At=Ht;break}else if(_[Ht]===null){_[Ht]=Oe,At=Ht;break}if(At===-1)break}let tt=v[At];tt&&tt.connect(Oe)}}let j=new T,B=new T;function ye(te,Ie,Oe){j.setFromMatrixPosition(Ie.matrixWorld),B.setFromMatrixPosition(Oe.matrixWorld);let At=j.distanceTo(B),tt=Ie.projectionMatrix.elements,Ht=Oe.projectionMatrix.elements,Jt=tt[14]/(tt[10]-1),Nt=tt[14]/(tt[10]+1),_n=(tt[9]+1)/tt[5],ne=(tt[9]-1)/tt[5],yi=(tt[8]-1)/tt[0],Bt=(Ht[8]+1)/Ht[0],Yt=Jt*yi,Mt=Jt*Bt,On=At/(-yi+Bt),Qt=On*-yi;Ie.matrixWorld.decompose(te.position,te.quaternion,te.scale),te.translateX(Qt),te.translateZ(On),te.matrixWorld.compose(te.position,te.quaternion,te.scale),te.matrixWorldInverse.copy(te.matrixWorld).invert();let D=Jt+On,C=Nt+On,ce=Yt-Qt,Ce=Mt+(At-Qt),Ae=_n*Nt/C*D,He=ne*Nt/C*D;te.projectionMatrix.makePerspective(ce,Ce,Ae,He,D,C),te.projectionMatrixInverse.copy(te.projectionMatrix).invert()}function be(te,Ie){Ie===null?te.matrixWorld.copy(te.matrix):te.matrixWorld.multiplyMatrices(Ie.matrixWorld,te.matrix),te.matrixWorldInverse.copy(te.matrixWorld).invert()}this.updateCamera=function(te){if(i===null)return;b.near=R.near=A.near=te.near,b.far=R.far=A.far=te.far,(P!==b.near||V!==b.far)&&(i.updateRenderState({depthNear:b.near,depthFar:b.far}),P=b.near,V=b.far);let Ie=te.parent,Oe=b.cameras;be(b,Ie);for(let At=0;At<Oe.length;At++)be(Oe[At],Ie);Oe.length===2?ye(b,A,R):b.projectionMatrix.copy(A.projectionMatrix),ee(te,b,Ie)};function ee(te,Ie,Oe){Oe===null?te.matrix.copy(Ie.matrixWorld):(te.matrix.copy(Oe.matrixWorld),te.matrix.invert(),te.matrix.multiply(Ie.matrixWorld)),te.matrix.decompose(te.position,te.quaternion,te.scale),te.updateMatrixWorld(!0),te.projectionMatrix.copy(Ie.projectionMatrix),te.projectionMatrixInverse.copy(Ie.projectionMatrixInverse),te.isPerspectiveCamera&&(te.fov=$o*2*Math.atan(1/te.projectionMatrix.elements[5]),te.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(te){c=te,f!==null&&(f.fixedFoveation=te),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=te)};let de=null;function ze(te,Ie){if(u=Ie.getViewerPose(l||o),g=Ie,u!==null){let Oe=u.views;d!==null&&(e.setRenderTargetFramebuffer(p,d.framebuffer),e.setRenderTarget(p));let At=!1;Oe.length!==b.cameras.length&&(b.cameras.length=0,At=!0);for(let tt=0;tt<Oe.length;tt++){let Ht=Oe[tt],Jt=null;if(d!==null)Jt=d.getViewport(Ht);else{let _n=h.getViewSubImage(f,Ht);Jt=_n.viewport,tt===0&&(e.setRenderTargetTextures(p,_n.colorTexture,f.ignoreDepthValues?void 0:_n.depthStencilTexture),e.setRenderTarget(p))}let Nt=O[tt];Nt===void 0&&(Nt=new hi,Nt.layers.enable(tt),Nt.viewport=new Un,O[tt]=Nt),Nt.matrix.fromArray(Ht.transform.matrix),Nt.matrix.decompose(Nt.position,Nt.quaternion,Nt.scale),Nt.projectionMatrix.fromArray(Ht.projectionMatrix),Nt.projectionMatrixInverse.copy(Nt.projectionMatrix).invert(),Nt.viewport.set(Jt.x,Jt.y,Jt.width,Jt.height),tt===0&&(b.matrix.copy(Nt.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),At===!0&&b.cameras.push(Nt)}}for(let Oe=0;Oe<v.length;Oe++){let At=_[Oe],tt=v[Oe];At!==null&&tt!==void 0&&tt.update(At,Ie,l||o)}de&&de(te,Ie),Ie.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Ie}),g=null}let $e=new pg;$e.setAnimationLoop(ze),this.setAnimationLoop=function(te){de=te},this.dispose=function(){}}};Ya=class{constructor(e={}){let{canvas:t=Vy(),context:n=null,depth:i=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=o;let d=new Uint32Array(4),g=new Int32Array(4),y=null,m=null,p=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Gn,this._useLegacyLights=!1,this.toneMapping=Sr,this.toneMappingExposure=1;let _=this,E=!1,w=0,A=0,R=null,O=-1,b=null,P=new Un,V=new Un,X=null,se=new Tt(0),N=0,j=t.width,B=t.height,ye=1,be=null,ee=null,de=new Un(0,0,j,B),ze=new Un(0,0,j,B),$e=!1,te=new Ar,Ie=!1,Oe=!1,At=null,tt=new vt,Ht=new et,Jt=new T,Nt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function _n(){return R===null?ye:1}let ne=n;function yi(I,Z){for(let ae=0;ae<I.length;ae++){let le=I[ae],re=t.getContext(le,Z);if(re!==null)return re}return null}try{let I={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${co}`),t.addEventListener("webglcontextlost",Fe,!1),t.addEventListener("webglcontextrestored",H,!1),t.addEventListener("webglcontextcreationerror",Xe,!1),ne===null){let Z=["webgl2","webgl","experimental-webgl"];if(_.isWebGL1Renderer===!0&&Z.shift(),ne=yi(Z,I),ne===null)throw yi(Z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext!="undefined"&&ne instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),ne.getShaderPrecisionFormat===void 0&&(ne.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(I){throw console.error("THREE.WebGLRenderer: "+I.message),I}let Bt,Yt,Mt,On,Qt,D,C,ce,Ce,Ae,He,at,Ze,Ye,Dt,Vt,Le,Sn,rn,Wt,_t,rt,Ot,Mn;function Ue(){Bt=new $b(ne),Yt=new qb(ne,Bt,e),Bt.init(Yt),rt=new PS(ne,Bt,Yt),Mt=new RS(ne,Bt,Yt),On=new tM(ne),Qt=new gS,D=new CS(ne,Bt,Mt,Qt,Yt,rt,On),C=new jb(_),ce=new Jb(_),Ce=new l_(ne,Yt),Ot=new Wb(ne,Bt,Ce,Yt),Ae=new Qb(ne,Ce,On,Ot),He=new rM(ne,Ae,Ce,On),rn=new sM(ne,Yt,D),Vt=new Yb(Qt),at=new mS(_,C,ce,Bt,Yt,Ot,Vt),Ze=new LS(_,Qt),Ye=new yS,Dt=new ES(Bt,Yt),Sn=new Gb(_,C,ce,Mt,He,f,c),Le=new AS(_,He,Yt),Mn=new NS(ne,On,Yt,Mt),Wt=new Xb(ne,Bt,On,Yt),_t=new eM(ne,Bt,On,Yt),On.programs=at.programs,_.capabilities=Yt,_.extensions=Bt,_.properties=Qt,_.renderLists=Ye,_.shadowMap=Le,_.state=Mt,_.info=On}Ue();let Pe=new Wh(_,ne);this.xr=Pe,this.getContext=function(){return ne},this.getContextAttributes=function(){return ne.getContextAttributes()},this.forceContextLoss=function(){let I=Bt.get("WEBGL_lose_context");I&&I.loseContext()},this.forceContextRestore=function(){let I=Bt.get("WEBGL_lose_context");I&&I.restoreContext()},this.getPixelRatio=function(){return ye},this.setPixelRatio=function(I){I!==void 0&&(ye=I,this.setSize(j,B,!1))},this.getSize=function(I){return I.set(j,B)},this.setSize=function(I,Z,ae=!0){if(Pe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}j=I,B=Z,t.width=Math.floor(I*ye),t.height=Math.floor(Z*ye),ae===!0&&(t.style.width=I+"px",t.style.height=Z+"px"),this.setViewport(0,0,I,Z)},this.getDrawingBufferSize=function(I){return I.set(j*ye,B*ye).floor()},this.setDrawingBufferSize=function(I,Z,ae){j=I,B=Z,ye=ae,t.width=Math.floor(I*ae),t.height=Math.floor(Z*ae),this.setViewport(0,0,I,Z)},this.getCurrentViewport=function(I){return I.copy(P)},this.getViewport=function(I){return I.copy(de)},this.setViewport=function(I,Z,ae,le){I.isVector4?de.set(I.x,I.y,I.z,I.w):de.set(I,Z,ae,le),Mt.viewport(P.copy(de).multiplyScalar(ye).floor())},this.getScissor=function(I){return I.copy(ze)},this.setScissor=function(I,Z,ae,le){I.isVector4?ze.set(I.x,I.y,I.z,I.w):ze.set(I,Z,ae,le),Mt.scissor(V.copy(ze).multiplyScalar(ye).floor())},this.getScissorTest=function(){return $e},this.setScissorTest=function(I){Mt.setScissorTest($e=I)},this.setOpaqueSort=function(I){be=I},this.setTransparentSort=function(I){ee=I},this.getClearColor=function(I){return I.copy(Sn.getClearColor())},this.setClearColor=function(){Sn.setClearColor.apply(Sn,arguments)},this.getClearAlpha=function(){return Sn.getClearAlpha()},this.setClearAlpha=function(){Sn.setClearAlpha.apply(Sn,arguments)},this.clear=function(I=!0,Z=!0,ae=!0){let le=0;if(I){let re=!1;if(R!==null){let ct=R.texture.format;re=ct===og||ct===rg||ct===sg}if(re){let ct=R.texture.type,Et=ct===Er||ct===vr||ct===xf||ct===eo||ct===ng||ct===ig,kt=Sn.getClearColor(),Gt=Sn.getClearAlpha(),an=kt.r,jt=kt.g,zt=kt.b;Et?(d[0]=an,d[1]=jt,d[2]=zt,d[3]=Gt,ne.clearBufferuiv(ne.COLOR,0,d)):(g[0]=an,g[1]=jt,g[2]=zt,g[3]=Gt,ne.clearBufferiv(ne.COLOR,0,g))}else le|=ne.COLOR_BUFFER_BIT}Z&&(le|=ne.DEPTH_BUFFER_BIT),ae&&(le|=ne.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ne.clear(le)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Fe,!1),t.removeEventListener("webglcontextrestored",H,!1),t.removeEventListener("webglcontextcreationerror",Xe,!1),Ye.dispose(),Dt.dispose(),Qt.dispose(),C.dispose(),ce.dispose(),He.dispose(),Ot.dispose(),Mn.dispose(),at.dispose(),Pe.dispose(),Pe.removeEventListener("sessionstart",oi),Pe.removeEventListener("sessionend",Rn),At&&(At.dispose(),At=null),_i.stop()};function Fe(I){I.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function H(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;let I=On.autoReset,Z=Le.enabled,ae=Le.autoUpdate,le=Le.needsUpdate,re=Le.type;Ue(),On.autoReset=I,Le.enabled=Z,Le.autoUpdate=ae,Le.needsUpdate=le,Le.type=re}function Xe(I){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",I.statusMessage)}function ke(I){let Z=I.target;Z.removeEventListener("dispose",ke),bt(Z)}function bt(I){Ut(I),Qt.remove(I)}function Ut(I){let Z=Qt.get(I).programs;Z!==void 0&&(Z.forEach(function(ae){at.releaseProgram(ae)}),I.isShaderMaterial&&at.releaseShaderCache(I))}this.renderBufferDirect=function(I,Z,ae,le,re,ct){Z===null&&(Z=Nt);let Et=re.isMesh&&re.matrixWorld.determinant()<0,kt=Mu(I,Z,ae,le,re);Mt.setMaterial(le,Et);let Gt=ae.index,an=1;if(le.wireframe===!0){if(Gt=Ae.getWireframeAttribute(ae),Gt===void 0)return;an=2}let jt=ae.drawRange,zt=ae.attributes.position,St=jt.start*an,ti=(jt.start+jt.count)*an;ct!==null&&(St=Math.max(St,ct.start*an),ti=Math.min(ti,(ct.start+ct.count)*an)),Gt!==null?(St=Math.max(St,0),ti=Math.min(ti,Gt.count)):zt!=null&&(St=Math.max(St,0),ti=Math.min(ti,zt.count));let Zt=ti-St;if(Zt<0||Zt===1/0)return;Ot.setup(re,le,kt,ae,Gt);let qi,Cn=Wt;if(Gt!==null&&(qi=Ce.get(Gt),Cn=_t,Cn.setIndex(qi)),re.isMesh)le.wireframe===!0?(Mt.setLineWidth(le.wireframeLinewidth*_n()),Cn.setMode(ne.LINES)):Cn.setMode(ne.TRIANGLES);else if(re.isLine){let cn=le.linewidth;cn===void 0&&(cn=1),Mt.setLineWidth(cn*_n()),re.isLineSegments?Cn.setMode(ne.LINES):re.isLineLoop?Cn.setMode(ne.LINE_LOOP):Cn.setMode(ne.LINE_STRIP)}else re.isPoints?Cn.setMode(ne.POINTS):re.isSprite&&Cn.setMode(ne.TRIANGLES);if(re.isBatchedMesh)Cn.renderMultiDraw(re._multiDrawStarts,re._multiDrawCounts,re._multiDrawCount);else if(re.isInstancedMesh)Cn.renderInstances(St,Zt,re.count);else if(ae.isInstancedBufferGeometry){let cn=ae._maxInstanceCount!==void 0?ae._maxInstanceCount:1/0,xo=Math.min(ae.instanceCount,cn);Cn.renderInstances(St,Zt,xo)}else Cn.render(St,Zt)};function on(I,Z,ae){I.transparent===!0&&I.side===Si&&I.forceSinglePass===!1?(I.side=Ui,I.needsUpdate=!0,ai(I,Z,ae),I.side=Vi,I.needsUpdate=!0,ai(I,Z,ae),I.side=Si):ai(I,Z,ae)}this.compile=function(I,Z,ae=null){ae===null&&(ae=I),m=Dt.get(ae),m.init(),v.push(m),ae.traverseVisible(function(re){re.isLight&&re.layers.test(Z.layers)&&(m.pushLight(re),re.castShadow&&m.pushShadow(re))}),I!==ae&&I.traverseVisible(function(re){re.isLight&&re.layers.test(Z.layers)&&(m.pushLight(re),re.castShadow&&m.pushShadow(re))}),m.setupLights(_._useLegacyLights);let le=new Set;return I.traverse(function(re){let ct=re.material;if(ct)if(Array.isArray(ct))for(let Et=0;Et<ct.length;Et++){let kt=ct[Et];on(kt,ae,re),le.add(kt)}else on(ct,ae,re),le.add(ct)}),v.pop(),m=null,le},this.compileAsync=function(I,Z,ae=null){let le=this.compile(I,Z,ae);return new Promise(re=>{function ct(){if(le.forEach(function(Et){Qt.get(Et).currentProgram.isReady()&&le.delete(Et)}),le.size===0){re(I);return}setTimeout(ct,10)}Bt.get("KHR_parallel_shader_compile")!==null?ct():setTimeout(ct,10)})};let xn=null;function Zn(I){xn&&xn(I)}function oi(){_i.stop()}function Rn(){_i.start()}let _i=new pg;_i.setAnimationLoop(Zn),typeof self!="undefined"&&_i.setContext(self),this.setAnimationLoop=function(I){xn=I,Pe.setAnimationLoop(I),I===null?_i.stop():_i.start()},Pe.addEventListener("sessionstart",oi),Pe.addEventListener("sessionend",Rn),this.render=function(I,Z){if(Z!==void 0&&Z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),Z.parent===null&&Z.matrixWorldAutoUpdate===!0&&Z.updateMatrixWorld(),Pe.enabled===!0&&Pe.isPresenting===!0&&(Pe.cameraAutoUpdate===!0&&Pe.updateCamera(Z),Z=Pe.getCamera()),I.isScene===!0&&I.onBeforeRender(_,I,Z,R),m=Dt.get(I,v.length),m.init(),v.push(m),tt.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse),te.setFromProjectionMatrix(tt),Oe=this.localClippingEnabled,Ie=Vt.init(this.clippingPlanes,Oe),y=Ye.get(I,p.length),y.init(),p.push(y),es(I,Z,0,_.sortObjects),y.finish(),_.sortObjects===!0&&y.sort(be,ee),this.info.render.frame++,Ie===!0&&Vt.beginShadows();let ae=m.state.shadowsArray;if(Le.render(ae,I,Z),Ie===!0&&Vt.endShadows(),this.info.autoReset===!0&&this.info.reset(),Sn.render(y,I),m.setupLights(_._useLegacyLights),Z.isArrayCamera){let le=Z.cameras;for(let re=0,ct=le.length;re<ct;re++){let Et=le[re];lr(y,I,Et,Et.viewport)}}else lr(y,I,Z);R!==null&&(D.updateMultisampleRenderTarget(R),D.updateRenderTargetMipmap(R)),I.isScene===!0&&I.onAfterRender(_,I,Z),Ot.resetDefaultState(),O=-1,b=null,v.pop(),v.length>0?m=v[v.length-1]:m=null,p.pop(),p.length>0?y=p[p.length-1]:y=null};function es(I,Z,ae,le){if(I.visible===!1)return;if(I.layers.test(Z.layers)){if(I.isGroup)ae=I.renderOrder;else if(I.isLOD)I.autoUpdate===!0&&I.update(Z);else if(I.isLight)m.pushLight(I),I.castShadow&&m.pushShadow(I);else if(I.isSprite){if(!I.frustumCulled||te.intersectsSprite(I)){le&&Jt.setFromMatrixPosition(I.matrixWorld).applyMatrix4(tt);let Et=He.update(I),kt=I.material;kt.visible&&y.push(I,Et,kt,ae,Jt.z,null)}}else if((I.isMesh||I.isLine||I.isPoints)&&(!I.frustumCulled||te.intersectsObject(I))){let Et=He.update(I),kt=I.material;if(le&&(I.boundingSphere!==void 0?(I.boundingSphere===null&&I.computeBoundingSphere(),Jt.copy(I.boundingSphere.center)):(Et.boundingSphere===null&&Et.computeBoundingSphere(),Jt.copy(Et.boundingSphere.center)),Jt.applyMatrix4(I.matrixWorld).applyMatrix4(tt)),Array.isArray(kt)){let Gt=Et.groups;for(let an=0,jt=Gt.length;an<jt;an++){let zt=Gt[an],St=kt[zt.materialIndex];St&&St.visible&&y.push(I,Et,St,ae,Jt.z,zt)}}else kt.visible&&y.push(I,Et,kt,ae,Jt.z,null)}}let ct=I.children;for(let Et=0,kt=ct.length;Et<kt;Et++)es(ct[Et],Z,ae,le)}function lr(I,Z,ae,le){let re=I.opaque,ct=I.transmissive,Et=I.transparent;m.setupLightsView(ae),Ie===!0&&Vt.setGlobalState(_.clippingPlanes,ae),ct.length>0&&ks(re,ct,Z,ae),le&&Mt.viewport(P.copy(le)),re.length>0&&ur(re,Z,ae),ct.length>0&&ur(ct,Z,ae),Et.length>0&&ur(Et,Z,ae),Mt.buffers.depth.setTest(!0),Mt.buffers.depth.setMask(!0),Mt.buffers.color.setMask(!0),Mt.setPolygonOffset(!1)}function ks(I,Z,ae,le){if((ae.isScene===!0?ae.overrideMaterial:null)!==null)return;let ct=Yt.isWebGL2;At===null&&(At=new ds(1,1,{generateMipmaps:!0,type:Bt.has("EXT_color_buffer_half_float")?so:Er,minFilter:Tr,samples:ct?4:0})),_.getDrawingBufferSize(Ht),ct?At.setSize(Ht.x,Ht.y):At.setSize(fl(Ht.x),fl(Ht.y));let Et=_.getRenderTarget();_.setRenderTarget(At),_.getClearColor(se),N=_.getClearAlpha(),N<1&&_.setClearColor(16777215,.5),_.clear();let kt=_.toneMapping;_.toneMapping=Sr,ur(I,ae,le),D.updateMultisampleRenderTarget(At),D.updateRenderTargetMipmap(At);let Gt=!1;for(let an=0,jt=Z.length;an<jt;an++){let zt=Z[an],St=zt.object,ti=zt.geometry,Zt=zt.material,qi=zt.group;if(Zt.side===Si&&St.layers.test(le.layers)){let Cn=Zt.side;Zt.side=Ui,Zt.needsUpdate=!0,zs(St,ae,le,ti,Zt,qi),Zt.side=Cn,Zt.needsUpdate=!0,Gt=!0}}Gt===!0&&(D.updateMultisampleRenderTarget(At),D.updateRenderTargetMipmap(At)),_.setRenderTarget(Et),_.setClearColor(se,N),_.toneMapping=kt}function ur(I,Z,ae){let le=Z.isScene===!0?Z.overrideMaterial:null;for(let re=0,ct=I.length;re<ct;re++){let Et=I[re],kt=Et.object,Gt=Et.geometry,an=le===null?Et.material:le,jt=Et.group;kt.layers.test(ae.layers)&&zs(kt,Z,ae,Gt,an,jt)}}function zs(I,Z,ae,le,re,ct){I.onBeforeRender(_,Z,ae,le,re,ct),I.modelViewMatrix.multiplyMatrices(ae.matrixWorldInverse,I.matrixWorld),I.normalMatrix.getNormalMatrix(I.modelViewMatrix),re.onBeforeRender(_,Z,ae,le,I,ct),re.transparent===!0&&re.side===Si&&re.forceSinglePass===!1?(re.side=Ui,re.needsUpdate=!0,_.renderBufferDirect(ae,Z,le,re,I,ct),re.side=Vi,re.needsUpdate=!0,_.renderBufferDirect(ae,Z,le,re,I,ct),re.side=Si):_.renderBufferDirect(ae,Z,le,re,I,ct),I.onAfterRender(_,Z,ae,le,re,ct)}function ai(I,Z,ae){Z.isScene!==!0&&(Z=Nt);let le=Qt.get(I),re=m.state.lights,ct=m.state.shadowsArray,Et=re.state.version,kt=at.getParameters(I,re.state,ct,Z,ae),Gt=at.getProgramCacheKey(kt),an=le.programs;le.environment=I.isMeshStandardMaterial?Z.environment:null,le.fog=Z.fog,le.envMap=(I.isMeshStandardMaterial?ce:C).get(I.envMap||le.environment),an===void 0&&(I.addEventListener("dispose",ke),an=new Map,le.programs=an);let jt=an.get(Gt);if(jt!==void 0){if(le.currentProgram===jt&&le.lightsStateVersion===Et)return Vr(I,kt),jt}else kt.uniforms=at.getUniforms(I),I.onBuild(ae,kt,_),I.onBeforeCompile(kt,_),jt=at.acquireProgram(kt,Gt),an.set(Gt,jt),le.uniforms=kt.uniforms;let zt=le.uniforms;return(!I.isShaderMaterial&&!I.isRawShaderMaterial||I.clipping===!0)&&(zt.clippingPlanes=Vt.uniform),Vr(I,kt),le.needsLights=ts(I),le.lightsStateVersion=Et,le.needsLights&&(zt.ambientLightColor.value=re.state.ambient,zt.lightProbe.value=re.state.probe,zt.directionalLights.value=re.state.directional,zt.directionalLightShadows.value=re.state.directionalShadow,zt.spotLights.value=re.state.spot,zt.spotLightShadows.value=re.state.spotShadow,zt.rectAreaLights.value=re.state.rectArea,zt.ltc_1.value=re.state.rectAreaLTC1,zt.ltc_2.value=re.state.rectAreaLTC2,zt.pointLights.value=re.state.point,zt.pointLightShadows.value=re.state.pointShadow,zt.hemisphereLights.value=re.state.hemi,zt.directionalShadowMap.value=re.state.directionalShadowMap,zt.directionalShadowMatrix.value=re.state.directionalShadowMatrix,zt.spotShadowMap.value=re.state.spotShadowMap,zt.spotLightMatrix.value=re.state.spotLightMatrix,zt.spotLightMap.value=re.state.spotLightMap,zt.pointShadowMap.value=re.state.pointShadowMap,zt.pointShadowMatrix.value=re.state.pointShadowMatrix),le.currentProgram=jt,le.uniformsList=null,jt}function vi(I){if(I.uniformsList===null){let Z=I.currentProgram.getUniforms();I.uniformsList=qo.seqWithValue(Z.seq,I.uniforms)}return I.uniformsList}function Vr(I,Z){let ae=Qt.get(I);ae.outputColorSpace=Z.outputColorSpace,ae.batching=Z.batching,ae.instancing=Z.instancing,ae.instancingColor=Z.instancingColor,ae.skinning=Z.skinning,ae.morphTargets=Z.morphTargets,ae.morphNormals=Z.morphNormals,ae.morphColors=Z.morphColors,ae.morphTargetsCount=Z.morphTargetsCount,ae.numClippingPlanes=Z.numClippingPlanes,ae.numIntersection=Z.numClipIntersection,ae.vertexAlphas=Z.vertexAlphas,ae.vertexTangents=Z.vertexTangents,ae.toneMapping=Z.toneMapping}function Mu(I,Z,ae,le,re){Z.isScene!==!0&&(Z=Nt),D.resetTextureUnits();let ct=Z.fog,Et=le.isMeshStandardMaterial?Z.environment:null,kt=R===null?_.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:di,Gt=(le.isMeshStandardMaterial?ce:C).get(le.envMap||Et),an=le.vertexColors===!0&&!!ae.attributes.color&&ae.attributes.color.itemSize===4,jt=!!ae.attributes.tangent&&(!!le.normalMap||le.anisotropy>0),zt=!!ae.morphAttributes.position,St=!!ae.morphAttributes.normal,ti=!!ae.morphAttributes.color,Zt=Sr;le.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(Zt=_.toneMapping);let qi=ae.morphAttributes.position||ae.morphAttributes.normal||ae.morphAttributes.color,Cn=qi!==void 0?qi.length:0,cn=Qt.get(le),xo=m.state.lights;if(Ie===!0&&(Oe===!0||I!==b)){let Bi=I===b&&le.id===O;Vt.setState(le,I,Bi)}let wn=!1;le.version===cn.__version?(cn.needsLights&&cn.lightsStateVersion!==xo.state.version||cn.outputColorSpace!==kt||re.isBatchedMesh&&cn.batching===!1||!re.isBatchedMesh&&cn.batching===!0||re.isInstancedMesh&&cn.instancing===!1||!re.isInstancedMesh&&cn.instancing===!0||re.isSkinnedMesh&&cn.skinning===!1||!re.isSkinnedMesh&&cn.skinning===!0||re.isInstancedMesh&&cn.instancingColor===!0&&re.instanceColor===null||re.isInstancedMesh&&cn.instancingColor===!1&&re.instanceColor!==null||cn.envMap!==Gt||le.fog===!0&&cn.fog!==ct||cn.numClippingPlanes!==void 0&&(cn.numClippingPlanes!==Vt.numPlanes||cn.numIntersection!==Vt.numIntersection)||cn.vertexAlphas!==an||cn.vertexTangents!==jt||cn.morphTargets!==zt||cn.morphNormals!==St||cn.morphColors!==ti||cn.toneMapping!==Zt||Yt.isWebGL2===!0&&cn.morphTargetsCount!==Cn)&&(wn=!0):(wn=!0,cn.__version=le.version);let Yi=cn.currentProgram;wn===!0&&(Yi=ai(le,Z,re));let As=!1,ji=!1,yo=!1,ci=Yi.getUniforms(),Vs=cn.uniforms;if(Mt.useProgram(Yi.program)&&(As=!0,ji=!0,yo=!0),le.id!==O&&(O=le.id,ji=!0),As||b!==I){ci.setValue(ne,"projectionMatrix",I.projectionMatrix),ci.setValue(ne,"viewMatrix",I.matrixWorldInverse);let Bi=ci.map.cameraPosition;Bi!==void 0&&Bi.setValue(ne,Jt.setFromMatrixPosition(I.matrixWorld)),Yt.logarithmicDepthBuffer&&ci.setValue(ne,"logDepthBufFC",2/(Math.log(I.far+1)/Math.LN2)),(le.isMeshPhongMaterial||le.isMeshToonMaterial||le.isMeshLambertMaterial||le.isMeshBasicMaterial||le.isMeshStandardMaterial||le.isShaderMaterial)&&ci.setValue(ne,"isOrthographic",I.isOrthographicCamera===!0),b!==I&&(b=I,ji=!0,yo=!0)}if(re.isSkinnedMesh){ci.setOptional(ne,re,"bindMatrix"),ci.setOptional(ne,re,"bindMatrixInverse");let Bi=re.skeleton;Bi&&(Yt.floatVertexTextures?(Bi.boneTexture===null&&Bi.computeBoneTexture(),ci.setValue(ne,"boneTexture",Bi.boneTexture,D)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}re.isBatchedMesh&&(ci.setOptional(ne,re,"batchingTexture"),ci.setValue(ne,"batchingTexture",re._matricesTexture,D));let va=ae.morphAttributes;if((va.position!==void 0||va.normal!==void 0||va.color!==void 0&&Yt.isWebGL2===!0)&&rn.update(re,ae,Yi),(ji||cn.receiveShadow!==re.receiveShadow)&&(cn.receiveShadow=re.receiveShadow,ci.setValue(ne,"receiveShadow",re.receiveShadow)),le.isMeshGouraudMaterial&&le.envMap!==null&&(Vs.envMap.value=Gt,Vs.flipEnvMap.value=Gt.isCubeTexture&&Gt.isRenderTargetTexture===!1?-1:1),ji&&(ci.setValue(ne,"toneMappingExposure",_.toneMappingExposure),cn.needsLights&&Hs(Vs,yo),ct&&le.fog===!0&&Ze.refreshFogUniforms(Vs,ct),Ze.refreshMaterialUniforms(Vs,le,ye,B,At),qo.upload(ne,vi(cn),Vs,D)),le.isShaderMaterial&&le.uniformsNeedUpdate===!0&&(qo.upload(ne,vi(cn),Vs,D),le.uniformsNeedUpdate=!1),le.isSpriteMaterial&&ci.setValue(ne,"center",re.center),ci.setValue(ne,"modelViewMatrix",re.modelViewMatrix),ci.setValue(ne,"normalMatrix",re.normalMatrix),ci.setValue(ne,"modelMatrix",re.matrixWorld),le.isShaderMaterial||le.isRawShaderMaterial){let Bi=le.uniformsGroups;for(let Gr=0,Gs=Bi.length;Gr<Gs;Gr++)if(Yt.isWebGL2){let ys=Bi[Gr];Mn.update(ys,Yi),Mn.bind(ys,Yi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Yi}function Hs(I,Z){I.ambientLightColor.needsUpdate=Z,I.lightProbe.needsUpdate=Z,I.directionalLights.needsUpdate=Z,I.directionalLightShadows.needsUpdate=Z,I.pointLights.needsUpdate=Z,I.pointLightShadows.needsUpdate=Z,I.spotLights.needsUpdate=Z,I.spotLightShadows.needsUpdate=Z,I.rectAreaLights.needsUpdate=Z,I.hemisphereLights.needsUpdate=Z}function ts(I){return I.isMeshLambertMaterial||I.isMeshToonMaterial||I.isMeshPhongMaterial||I.isMeshStandardMaterial||I.isShadowMaterial||I.isShaderMaterial&&I.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(I,Z,ae){Qt.get(I.texture).__webglTexture=Z,Qt.get(I.depthTexture).__webglTexture=ae;let le=Qt.get(I);le.__hasExternalTextures=!0,le.__hasExternalTextures&&(le.__autoAllocateDepthBuffer=ae===void 0,le.__autoAllocateDepthBuffer||Bt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),le.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(I,Z){let ae=Qt.get(I);ae.__webglFramebuffer=Z,ae.__useDefaultFramebuffer=Z===void 0},this.setRenderTarget=function(I,Z=0,ae=0){R=I,w=Z,A=ae;let le=!0,re=null,ct=!1,Et=!1;if(I){let Gt=Qt.get(I);Gt.__useDefaultFramebuffer!==void 0?(Mt.bindFramebuffer(ne.FRAMEBUFFER,null),le=!1):Gt.__webglFramebuffer===void 0?D.setupRenderTarget(I):Gt.__hasExternalTextures&&D.rebindTextures(I,Qt.get(I.texture).__webglTexture,Qt.get(I.depthTexture).__webglTexture);let an=I.texture;(an.isData3DTexture||an.isDataArrayTexture||an.isCompressedArrayTexture)&&(Et=!0);let jt=Qt.get(I).__webglFramebuffer;I.isWebGLCubeRenderTarget?(Array.isArray(jt[Z])?re=jt[Z][ae]:re=jt[Z],ct=!0):Yt.isWebGL2&&I.samples>0&&D.useMultisampledRTT(I)===!1?re=Qt.get(I).__webglMultisampledFramebuffer:Array.isArray(jt)?re=jt[ae]:re=jt,P.copy(I.viewport),V.copy(I.scissor),X=I.scissorTest}else P.copy(de).multiplyScalar(ye).floor(),V.copy(ze).multiplyScalar(ye).floor(),X=$e;if(Mt.bindFramebuffer(ne.FRAMEBUFFER,re)&&Yt.drawBuffers&&le&&Mt.drawBuffers(I,re),Mt.viewport(P),Mt.scissor(V),Mt.setScissorTest(X),ct){let Gt=Qt.get(I.texture);ne.framebufferTexture2D(ne.FRAMEBUFFER,ne.COLOR_ATTACHMENT0,ne.TEXTURE_CUBE_MAP_POSITIVE_X+Z,Gt.__webglTexture,ae)}else if(Et){let Gt=Qt.get(I.texture),an=Z||0;ne.framebufferTextureLayer(ne.FRAMEBUFFER,ne.COLOR_ATTACHMENT0,Gt.__webglTexture,ae||0,an)}O=-1},this.readRenderTargetPixels=function(I,Z,ae,le,re,ct,Et){if(!(I&&I.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let kt=Qt.get(I).__webglFramebuffer;if(I.isWebGLCubeRenderTarget&&Et!==void 0&&(kt=kt[Et]),kt){Mt.bindFramebuffer(ne.FRAMEBUFFER,kt);try{let Gt=I.texture,an=Gt.format,jt=Gt.type;if(an!==os&&rt.convert(an)!==ne.getParameter(ne.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let zt=jt===so&&(Bt.has("EXT_color_buffer_half_float")||Yt.isWebGL2&&Bt.has("EXT_color_buffer_float"));if(jt!==Er&&rt.convert(jt)!==ne.getParameter(ne.IMPLEMENTATION_COLOR_READ_TYPE)&&!(jt===Ns&&(Yt.isWebGL2||Bt.has("OES_texture_float")||Bt.has("WEBGL_color_buffer_float")))&&!zt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Z>=0&&Z<=I.width-le&&ae>=0&&ae<=I.height-re&&ne.readPixels(Z,ae,le,re,rt.convert(an),rt.convert(jt),ct)}finally{let Gt=R!==null?Qt.get(R).__webglFramebuffer:null;Mt.bindFramebuffer(ne.FRAMEBUFFER,Gt)}}},this.copyFramebufferToTexture=function(I,Z,ae=0){let le=Math.pow(2,-ae),re=Math.floor(Z.image.width*le),ct=Math.floor(Z.image.height*le);D.setTexture2D(Z,0),ne.copyTexSubImage2D(ne.TEXTURE_2D,ae,0,0,I.x,I.y,re,ct),Mt.unbindTexture()},this.copyTextureToTexture=function(I,Z,ae,le=0){let re=Z.image.width,ct=Z.image.height,Et=rt.convert(ae.format),kt=rt.convert(ae.type);D.setTexture2D(ae,0),ne.pixelStorei(ne.UNPACK_FLIP_Y_WEBGL,ae.flipY),ne.pixelStorei(ne.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ae.premultiplyAlpha),ne.pixelStorei(ne.UNPACK_ALIGNMENT,ae.unpackAlignment),Z.isDataTexture?ne.texSubImage2D(ne.TEXTURE_2D,le,I.x,I.y,re,ct,Et,kt,Z.image.data):Z.isCompressedTexture?ne.compressedTexSubImage2D(ne.TEXTURE_2D,le,I.x,I.y,Z.mipmaps[0].width,Z.mipmaps[0].height,Et,Z.mipmaps[0].data):ne.texSubImage2D(ne.TEXTURE_2D,le,I.x,I.y,Et,kt,Z.image),le===0&&ae.generateMipmaps&&ne.generateMipmap(ne.TEXTURE_2D),Mt.unbindTexture()},this.copyTextureToTexture3D=function(I,Z,ae,le,re=0){if(_.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let ct=I.max.x-I.min.x+1,Et=I.max.y-I.min.y+1,kt=I.max.z-I.min.z+1,Gt=rt.convert(le.format),an=rt.convert(le.type),jt;if(le.isData3DTexture)D.setTexture3D(le,0),jt=ne.TEXTURE_3D;else if(le.isDataArrayTexture||le.isCompressedArrayTexture)D.setTexture2DArray(le,0),jt=ne.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}ne.pixelStorei(ne.UNPACK_FLIP_Y_WEBGL,le.flipY),ne.pixelStorei(ne.UNPACK_PREMULTIPLY_ALPHA_WEBGL,le.premultiplyAlpha),ne.pixelStorei(ne.UNPACK_ALIGNMENT,le.unpackAlignment);let zt=ne.getParameter(ne.UNPACK_ROW_LENGTH),St=ne.getParameter(ne.UNPACK_IMAGE_HEIGHT),ti=ne.getParameter(ne.UNPACK_SKIP_PIXELS),Zt=ne.getParameter(ne.UNPACK_SKIP_ROWS),qi=ne.getParameter(ne.UNPACK_SKIP_IMAGES),Cn=ae.isCompressedTexture?ae.mipmaps[re]:ae.image;ne.pixelStorei(ne.UNPACK_ROW_LENGTH,Cn.width),ne.pixelStorei(ne.UNPACK_IMAGE_HEIGHT,Cn.height),ne.pixelStorei(ne.UNPACK_SKIP_PIXELS,I.min.x),ne.pixelStorei(ne.UNPACK_SKIP_ROWS,I.min.y),ne.pixelStorei(ne.UNPACK_SKIP_IMAGES,I.min.z),ae.isDataTexture||ae.isData3DTexture?ne.texSubImage3D(jt,re,Z.x,Z.y,Z.z,ct,Et,kt,Gt,an,Cn.data):ae.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),ne.compressedTexSubImage3D(jt,re,Z.x,Z.y,Z.z,ct,Et,kt,Gt,Cn.data)):ne.texSubImage3D(jt,re,Z.x,Z.y,Z.z,ct,Et,kt,Gt,an,Cn),ne.pixelStorei(ne.UNPACK_ROW_LENGTH,zt),ne.pixelStorei(ne.UNPACK_IMAGE_HEIGHT,St),ne.pixelStorei(ne.UNPACK_SKIP_PIXELS,ti),ne.pixelStorei(ne.UNPACK_SKIP_ROWS,Zt),ne.pixelStorei(ne.UNPACK_SKIP_IMAGES,qi),re===0&&le.generateMipmaps&&ne.generateMipmap(jt),Mt.unbindTexture()},this.initTexture=function(I){I.isCubeTexture?D.setTextureCube(I,0):I.isData3DTexture?D.setTexture3D(I,0):I.isDataArrayTexture||I.isCompressedArrayTexture?D.setTexture2DArray(I,0):D.setTexture2D(I,0),Mt.unbindTexture()},this.resetState=function(){w=0,A=0,R=null,Mt.reset(),Ot.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ds}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=e===_f?"display-p3":"srgb",t.unpackColorSpace=En.workingColorSpace===Xl?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Gn?no:lg}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===no?Gn:di}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}},Xh=class extends Ya{};Xh.prototype.isWebGL1Renderer=!0;Cr=class extends Yn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}},ja=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Rh,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Es()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Es()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Es()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},ki=new T,Za=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)ki.fromBufferAttribute(this,t),ki.applyMatrix4(e),this.setXYZ(t,ki.x,ki.y,ki.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ki.fromBufferAttribute(this,t),ki.applyNormalMatrix(e),this.setXYZ(t,ki.x,ki.y,ki.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ki.fromBufferAttribute(this,t),ki.transformDirection(e),this.setXYZ(t,ki.x,ki.y,ki.z);return this}setX(e,t){return this.normalized&&(t=Ln(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Ln(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Ln(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Ln(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ls(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ls(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ls(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ls(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ln(t,this.array),n=Ln(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ln(t,this.array),n=Ln(n,this.array),i=Ln(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ln(t,this.array),n=Ln(n,this.array),i=Ln(i,this.array),r=Ln(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new An(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Rm=new T,Cm=new Un,Pm=new Un,DS=new T,Im=new vt,Jc=new T,mh=new Qn,Lm=new vt,gh=new nr,vl=class extends Tn{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=dp,this.bindMatrix=new vt,this.bindMatrixInverse=new vt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new sn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Jc),this.boundingBox.expandByPoint(Jc)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Qn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Jc),this.boundingSphere.expandByPoint(Jc)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),mh.copy(this.boundingSphere),mh.applyMatrix4(i),e.ray.intersectsSphere(mh)!==!1&&(Lm.copy(i).invert(),gh.copy(e.ray).applyMatrix4(Lm),!(this.boundingBox!==null&&gh.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,gh)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Un,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===dp?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===cy?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;Cm.fromBufferAttribute(i.attributes.skinIndex,e),Pm.fromBufferAttribute(i.attributes.skinWeight,e),Rm.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let o=Pm.getComponent(r);if(o!==0){let a=Cm.getComponent(r);Im.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(DS.copy(Rm).applyMatrix4(Im),o)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}},Ka=class extends Yn{constructor(){super(),this.isBone=!0,this.type="Bone"}},bl=class extends Fi{constructor(e=null,t=1,n=1,i,r,o,a,c,l=ui,u=ui,h,f){super(null,o,a,c,l,u,i,r,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Nm=new vt,US=new vt,Ml=class s{constructor(e=[],t=[]){this.uuid=Es(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new vt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new vt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:US;Nm.multiplyMatrices(a,t[r]),Nm.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new bl(t,e,e,os,Ns);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let r=e.bones[n],o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Ka),this.bones.push(o),this.boneInverses.push(new vt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){let o=t[i];e.bones.push(o.uuid);let a=n[i];e.boneInverses.push(a.toArray())}return e}},ao=class extends An{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},zo=new vt,Dm=new vt,$c=[],Um=new sn,FS=new vt,Ia=new Tn,La=new Qn,Sl=class extends Tn{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ao(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,FS)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new sn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,zo),Um.copy(e.boundingBox).applyMatrix4(zo),this.boundingBox.union(Um)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Qn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,zo),La.copy(e.boundingSphere).applyMatrix4(zo),this.boundingSphere.union(La)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Ia.geometry=this.geometry,Ia.material=this.material,Ia.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),La.copy(this.boundingSphere),La.applyMatrix4(n),e.ray.intersectsSphere(La)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,zo),Dm.multiplyMatrices(n,zo),Ia.matrixWorld=Dm,Ia.raycast(e,$c);for(let o=0,a=$c.length;o<a;o++){let c=$c[o];c.instanceId=r,c.object=this,t.push(c)}$c.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ao(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}};qh=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t){let n=this.pool,i=this.list;this.index>=n.length&&n.push({start:-1,count:-1,z:-1});let r=n[this.index];i.push(r),this.index++,r.start=e.start,r.count=e.count,r.z=t}reset(){this.list.length=0,this.index=0}},Ho="batchId",_r=new vt,Fm=new vt,kS=new vt,Bm=new vt,xh=new Ar,Qc=new sn,Jr=new Qn,Na=new T,yh=new qh,Di=new Tn,el=[];El=class extends Tn{get maxGeometryCount(){return this._maxGeometryCount}constructor(e,t,n=t*2,i){super(new Ei,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._drawRanges=[],this._reservedRanges=[],this._visibility=[],this._active=[],this._bounds=[],this._maxGeometryCount=e,this._maxVertexCount=t,this._maxIndexCount=n,this._geometryInitialized=!1,this._geometryCount=0,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._visibilityChanged=!0,this._matricesTexture=null,this._initMatricesTexture()}_initMatricesTexture(){let e=Math.sqrt(this._maxGeometryCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4),n=new bl(t,e,e,os,Ns);this._matricesTexture=n}_initializeGeometry(e){let t=this.geometry,n=this._maxVertexCount,i=this._maxGeometryCount,r=this._maxIndexCount;if(this._geometryInitialized===!1){for(let a in e.attributes){let c=e.getAttribute(a),{array:l,itemSize:u,normalized:h}=c,f=new l.constructor(n*u),d=new c.constructor(f,u,h);d.setUsage(c.usage),t.setAttribute(a,d)}if(e.getIndex()!==null){let a=n>65536?new Uint32Array(r):new Uint16Array(r);t.setIndex(new An(a,1))}let o=i>65536?new Uint32Array(n):new Uint16Array(n);t.setAttribute(Ho,new An(o,1)),this._geometryInitialized=!0}}_validateGeometry(e){if(e.getAttribute(Ho))throw new Error(`BatchedMesh: Geometry cannot use attribute "${Ho}"`);let t=this.geometry;if(!!e.getIndex()!=!!t.getIndex())throw new Error('BatchedMesh: All geometries must consistently have "index".');for(let n in t.attributes){if(n===Ho)continue;if(!e.hasAttribute(n))throw new Error(`BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);let i=e.getAttribute(n),r=t.getAttribute(n);if(i.itemSize!==r.itemSize||i.normalized!==r.normalized)throw new Error("BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new sn);let e=this._geometryCount,t=this.boundingBox,n=this._active;t.makeEmpty();for(let i=0;i<e;i++)n[i]!==!1&&(this.getMatrixAt(i,_r),this.getBoundingBoxAt(i,Qc).applyMatrix4(_r),t.union(Qc))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Qn);let e=this._geometryCount,t=this.boundingSphere,n=this._active;t.makeEmpty();for(let i=0;i<e;i++)n[i]!==!1&&(this.getMatrixAt(i,_r),this.getBoundingSphereAt(i,Jr).applyMatrix4(_r),t.union(Jr))}addGeometry(e,t=-1,n=-1){if(this._initializeGeometry(e),this._validateGeometry(e),this._geometryCount>=this._maxGeometryCount)throw new Error("BatchedMesh: Maximum geometry count reached.");let i={vertexStart:-1,vertexCount:-1,indexStart:-1,indexCount:-1},r=null,o=this._reservedRanges,a=this._drawRanges,c=this._bounds;this._geometryCount!==0&&(r=o[o.length-1]),t===-1?i.vertexCount=e.getAttribute("position").count:i.vertexCount=t,r===null?i.vertexStart=0:i.vertexStart=r.vertexStart+r.vertexCount;let l=e.getIndex(),u=l!==null;if(u&&(n===-1?i.indexCount=l.count:i.indexCount=n,r===null?i.indexStart=0:i.indexStart=r.indexStart+r.indexCount),i.indexStart!==-1&&i.indexStart+i.indexCount>this._maxIndexCount||i.vertexStart+i.vertexCount>this._maxVertexCount)throw new Error("BatchedMesh: Reserved space request exceeds the maximum buffer size.");let h=this._visibility,f=this._active,d=this._matricesTexture,g=this._matricesTexture.image.data;h.push(!0),f.push(!0);let y=this._geometryCount;this._geometryCount++,kS.toArray(g,y*16),d.needsUpdate=!0,o.push(i),a.push({start:u?i.indexStart:i.vertexStart,count:-1}),c.push({boxInitialized:!1,box:new sn,sphereInitialized:!1,sphere:new Qn});let m=this.geometry.getAttribute(Ho);for(let p=0;p<i.vertexCount;p++)m.setX(i.vertexStart+p,y);return m.needsUpdate=!0,this.setGeometryAt(y,e),y}setGeometryAt(e,t){if(e>=this._geometryCount)throw new Error("BatchedMesh: Maximum geometry count reached.");this._validateGeometry(t);let n=this.geometry,i=n.getIndex()!==null,r=n.getIndex(),o=t.getIndex(),a=this._reservedRanges[e];if(i&&o.count>a.indexCount||t.attributes.position.count>a.vertexCount)throw new Error("BatchedMesh: Reserved space not large enough for provided geometry.");let c=a.vertexStart,l=a.vertexCount;for(let d in n.attributes){if(d===Ho)continue;let g=t.getAttribute(d),y=n.getAttribute(d);zS(g,y,c);let m=g.itemSize;for(let p=g.count,v=l;p<v;p++){let _=c+p;for(let E=0;E<m;E++)y.setComponent(_,E,0)}y.needsUpdate=!0}if(i){let d=a.indexStart;for(let g=0;g<o.count;g++)r.setX(d+g,c+o.getX(g));for(let g=o.count,y=a.indexCount;g<y;g++)r.setX(d+g,c);r.needsUpdate=!0}let u=this._bounds[e];t.boundingBox!==null?(u.box.copy(t.boundingBox),u.boxInitialized=!0):u.boxInitialized=!1,t.boundingSphere!==null?(u.sphere.copy(t.boundingSphere),u.sphereInitialized=!0):u.sphereInitialized=!1;let h=this._drawRanges[e],f=t.getAttribute("position");return h.count=i?o.count:f.count,this._visibilityChanged=!0,e}deleteGeometry(e){let t=this._active;return e>=t.length||t[e]===!1?this:(t[e]=!1,this._visibilityChanged=!0,this)}getBoundingBoxAt(e,t){if(this._active[e]===!1)return this;let i=this._bounds[e],r=i.box,o=this.geometry;if(i.boxInitialized===!1){r.makeEmpty();let a=o.index,c=o.attributes.position,l=this._drawRanges[e];for(let u=l.start,h=l.start+l.count;u<h;u++){let f=u;a&&(f=a.getX(f)),r.expandByPoint(Na.fromBufferAttribute(c,f))}i.boxInitialized=!0}return t.copy(r),t}getBoundingSphereAt(e,t){if(this._active[e]===!1)return this;let i=this._bounds[e],r=i.sphere,o=this.geometry;if(i.sphereInitialized===!1){r.makeEmpty(),this.getBoundingBoxAt(e,Qc),Qc.getCenter(r.center);let a=o.index,c=o.attributes.position,l=this._drawRanges[e],u=0;for(let h=l.start,f=l.start+l.count;h<f;h++){let d=h;a&&(d=a.getX(d)),Na.fromBufferAttribute(c,d),u=Math.max(u,r.center.distanceToSquared(Na))}r.radius=Math.sqrt(u),i.sphereInitialized=!0}return t.copy(r),t}setMatrixAt(e,t){let n=this._active,i=this._matricesTexture,r=this._matricesTexture.image.data,o=this._geometryCount;return e>=o||n[e]===!1?this:(t.toArray(r,e*16),i.needsUpdate=!0,this)}getMatrixAt(e,t){let n=this._active,i=this._matricesTexture.image.data,r=this._geometryCount;return e>=r||n[e]===!1?null:t.fromArray(i,e*16)}setVisibleAt(e,t){let n=this._visibility,i=this._active,r=this._geometryCount;return e>=r||i[e]===!1||n[e]===t?this:(n[e]=t,this._visibilityChanged=!0,this)}getVisibleAt(e){let t=this._visibility,n=this._active,i=this._geometryCount;return e>=i||n[e]===!1?!1:t[e]}raycast(e,t){let n=this._visibility,i=this._active,r=this._drawRanges,o=this._geometryCount,a=this.matrixWorld,c=this.geometry;Di.material=this.material,Di.geometry.index=c.index,Di.geometry.attributes=c.attributes,Di.geometry.boundingBox===null&&(Di.geometry.boundingBox=new sn),Di.geometry.boundingSphere===null&&(Di.geometry.boundingSphere=new Qn);for(let l=0;l<o;l++){if(!n[l]||!i[l])continue;let u=r[l];Di.geometry.setDrawRange(u.start,u.count),this.getMatrixAt(l,Di.matrixWorld).premultiply(a),this.getBoundingBoxAt(l,Di.geometry.boundingBox),this.getBoundingSphereAt(l,Di.geometry.boundingSphere),Di.raycast(e,el);for(let h=0,f=el.length;h<f;h++){let d=el[h];d.object=this,d.batchId=l,t.push(d)}el.length=0}Di.material=null,Di.geometry.index=null,Di.geometry.attributes={},Di.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._drawRanges=e._drawRanges.map(t=>({...t})),this._reservedRanges=e._reservedRanges.map(t=>({...t})),this._visibility=e._visibility.slice(),this._active=e._active.slice(),this._bounds=e._bounds.map(t=>({boxInitialized:t.boxInitialized,box:t.box.clone(),sphereInitialized:t.sphereInitialized,sphere:t.sphere.clone()})),this._maxGeometryCount=e._maxGeometryCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._geometryCount=e._geometryCount,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.slice(),this}dispose(){return this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this}onBeforeRender(e,t,n,i,r){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;let o=i.getIndex(),a=o===null?1:o.array.BYTES_PER_ELEMENT,c=this._visibility,l=this._multiDrawStarts,u=this._multiDrawCounts,h=this._drawRanges,f=this.perObjectFrustumCulled;f&&(Bm.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),xh.setFromProjectionMatrix(Bm,e.isWebGPURenderer?Ga:Ds));let d=0;if(this.sortObjects){Fm.copy(this.matrixWorld).invert(),Na.setFromMatrixPosition(n.matrixWorld).applyMatrix4(Fm);for(let m=0,p=c.length;m<p;m++)if(c[m]){this.getMatrixAt(m,_r),this.getBoundingSphereAt(m,Jr).applyMatrix4(_r);let v=!1;if(f&&(v=!xh.intersectsSphere(Jr)),!v){let _=Na.distanceTo(Jr.center);yh.push(h[m],_)}}let g=yh.list,y=this.customSort;y===null?g.sort(r.transparent?OS:BS):y.call(this,g,n);for(let m=0,p=g.length;m<p;m++){let v=g[m];l[d]=v.start*a,u[d]=v.count,d++}yh.reset()}else for(let g=0,y=c.length;g<y;g++)if(c[g]){let m=!1;if(f&&(this.getMatrixAt(g,_r),this.getBoundingSphereAt(g,Jr).applyMatrix4(_r),m=!xh.intersectsSphere(Jr)),!m){let p=h[g];l[d]=p.start*a,u[d]=p.count,d++}}this._multiDrawCount=d,this._visibilityChanged=!1}onBeforeShadow(e,t,n,i,r,o){this.onBeforeRender(e,null,i,r,o)}},Ja=class extends Ji{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Tt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Om=new T,km=new T,zm=new vt,_h=new nr,tl=new Qn,ia=class extends Yn{constructor(e=new Ei,t=new Ja){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Om.fromBufferAttribute(t,i-1),km.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Om.distanceTo(km);e.setAttribute("lineDistance",new fi(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),tl.copy(n.boundingSphere),tl.applyMatrix4(i),tl.radius+=r,e.ray.intersectsSphere(tl)===!1)return;zm.copy(i).invert(),_h.copy(e.ray).applyMatrix4(zm);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=new T,u=new T,h=new T,f=new T,d=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){let p=Math.max(0,o.start),v=Math.min(g.count,o.start+o.count);for(let _=p,E=v-1;_<E;_+=d){let w=g.getX(_),A=g.getX(_+1);if(l.fromBufferAttribute(m,w),u.fromBufferAttribute(m,A),_h.distanceSqToSegment(l,u,f,h)>c)continue;f.applyMatrix4(this.matrixWorld);let O=e.ray.origin.distanceTo(f);O<e.near||O>e.far||t.push({distance:O,point:h.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}else{let p=Math.max(0,o.start),v=Math.min(m.count,o.start+o.count);for(let _=p,E=v-1;_<E;_+=d){if(l.fromBufferAttribute(m,_),u.fromBufferAttribute(m,_+1),_h.distanceSqToSegment(l,u,f,h)>c)continue;f.applyMatrix4(this.matrixWorld);let A=e.ray.origin.distanceTo(f);A<e.near||A>e.far||t.push({distance:A,point:h.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}},Hm=new T,Vm=new T,Tl=class extends ia{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Hm.fromBufferAttribute(t,i),Vm.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Hm.distanceTo(Vm);e.setAttribute("lineDistance",new fi(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},wl=class extends ia{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},$a=class extends Ji{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Tt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Gm=new vt,Yh=new nr,nl=new Qn,il=new T,Al=class extends Yn{constructor(e=new Ei,t=new $a){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),nl.copy(n.boundingSphere),nl.applyMatrix4(i),nl.radius+=r,e.ray.intersectsSphere(nl)===!1)return;Gm.copy(i).invert(),Yh.copy(e.ray).applyMatrix4(Gm);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,h=n.attributes.position;if(l!==null){let f=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let g=f,y=d;g<y;g++){let m=l.getX(g);il.fromBufferAttribute(h,m),Wm(il,m,c,i,e,t,this)}}else{let f=Math.max(0,o.start),d=Math.min(h.count,o.start+o.count);for(let g=f,y=d;g<y;g++)il.fromBufferAttribute(h,g),Wm(il,g,c,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};Ts=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){let n=this.getLengths(),i=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-o,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===o)return i/(r-1);let u=n[i],f=n[i+1]-u,d=(o-u)/f;return(i+d)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);let o=this.getPoint(i),a=this.getPoint(r),c=t||(o.isVector2?new et:new T);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){let n=new T,i=[],r=[],o=[],a=new T,c=new vt;for(let d=0;d<=e;d++){let g=d/e;i[d]=this.getTangentAt(g,new T)}r[0]=new T,o[0]=new T;let l=Number.MAX_VALUE,u=Math.abs(i[0].x),h=Math.abs(i[0].y),f=Math.abs(i[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),f<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(i[d-1],i[d]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(si(i[d-1].dot(i[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,g))}o[d].crossVectors(i[d],r[d])}if(t===!0){let d=Math.acos(si(r[0].dot(r[e]),-1,1));d/=e,i[0].dot(a.crossVectors(r[0],r[e]))>0&&(d=-d);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(i[g],d*g)),o[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Rl=class extends Ts{constructor(e=0,t=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t){let n=t||new et,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);let a=this.aStartAngle+e*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*u-d*h+this.aX,l=f*h+d*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},jh=class extends Rl{constructor(e,t,n,i,r,o){super(e,t,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};sl=new T,vh=new Mf,bh=new Mf,Mh=new Mf,Qa=class extends Ts{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new T){let n=t,i=this.points,r=i.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,u;this.closed||a>0?l=i[(a-1)%r]:(sl.subVectors(i[0],i[1]).add(i[0]),l=sl);let h=i[a%r],f=i[(a+1)%r];if(this.closed||a+2<r?u=i[(a+2)%r]:(sl.subVectors(i[r-1],i[r-2]).add(i[r-1]),u=sl),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(h),d),y=Math.pow(h.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(u),d);y<1e-4&&(y=1),g<1e-4&&(g=y),m<1e-4&&(m=y),vh.initNonuniformCatmullRom(l.x,h.x,f.x,u.x,g,y,m),bh.initNonuniformCatmullRom(l.y,h.y,f.y,u.y,g,y,m),Mh.initNonuniformCatmullRom(l.z,h.z,f.z,u.z,g,y,m)}else this.curveType==="catmullrom"&&(vh.initCatmullRom(l.x,h.x,f.x,u.x,this.tension),bh.initCatmullRom(l.y,h.y,f.y,u.y,this.tension),Mh.initCatmullRom(l.z,h.z,f.z,u.z,this.tension));return n.set(vh.calc(c),bh.calc(c),Mh.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new T().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};Zh=class extends Ts{constructor(e=new et,t=new et,n=new et,i=new et){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new et){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Ha(e,i.x,r.x,o.x,a.x),Ha(e,i.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Kh=class extends Ts{constructor(e=new T,t=new T,n=new T,i=new T){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new T){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Ha(e,i.x,r.x,o.x,a.x),Ha(e,i.y,r.y,o.y,a.y),Ha(e,i.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Jh=class extends Ts{constructor(e=new et,t=new et){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new et){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new et){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},$h=class extends Ts{constructor(e=new T,t=new T){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new T){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new T){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Qh=class extends Ts{constructor(e=new et,t=new et,n=new et){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new et){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(za(e,i.x,r.x,o.x),za(e,i.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Cl=class extends Ts{constructor(e=new T,t=new T,n=new T){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new T){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(za(e,i.x,r.x,o.x),za(e,i.y,r.y,o.y),za(e,i.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ef=class extends Ts{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new et){let n=t,i=this.points,r=(i.length-1)*e,o=Math.floor(r),a=r-o,c=i[o===0?o:o-1],l=i[o],u=i[o>i.length-2?i.length-1:o+1],h=i[o>i.length-3?i.length-1:o+2];return n.set(Xm(a,c.x,l.x,u.x,h.x),Xm(a,c.y,l.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new et().fromArray(i))}return this}},jS=Object.freeze({__proto__:null,ArcCurve:jh,CatmullRomCurve3:Qa,CubicBezierCurve:Zh,CubicBezierCurve3:Kh,EllipseCurve:Rl,LineCurve:Jh,LineCurve3:$h,QuadraticBezierCurve:Qh,QuadraticBezierCurve3:Cl,SplineCurve:ef}),Pl=class s extends Ei{constructor(e=new Cl(new T(-1,-1,0),new T(-1,1,0),new T(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};let o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new T,c=new T,l=new et,u=new T,h=[],f=[],d=[],g=[];y(),this.setIndex(g),this.setAttribute("position",new fi(h,3)),this.setAttribute("normal",new fi(f,3)),this.setAttribute("uv",new fi(d,2));function y(){for(let _=0;_<t;_++)m(_);m(r===!1?t:0),v(),p()}function m(_){u=e.getPointAt(_/t,u);let E=o.normals[_],w=o.binormals[_];for(let A=0;A<=i;A++){let R=A/i*Math.PI*2,O=Math.sin(R),b=-Math.cos(R);c.x=b*E.x+O*w.x,c.y=b*E.y+O*w.y,c.z=b*E.z+O*w.z,c.normalize(),f.push(c.x,c.y,c.z),a.x=u.x+n*c.x,a.y=u.y+n*c.y,a.z=u.z+n*c.z,h.push(a.x,a.y,a.z)}}function p(){for(let _=1;_<=t;_++)for(let E=1;E<=i;E++){let w=(i+1)*(_-1)+(E-1),A=(i+1)*_+(E-1),R=(i+1)*_+E,O=(i+1)*(_-1)+E;g.push(w,A,O),g.push(A,R,O)}}function v(){for(let _=0;_<=t;_++)for(let E=0;E<=i;E++)l.x=_/t,l.y=E/i,d.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new s(new jS[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},Pr=class extends Ji{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Tt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Tt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=yf,this.normalScale=new et(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ps=class extends Pr{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new et(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return si(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Tt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Tt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Tt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},Il=class extends Ji{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Tt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Tt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=yf,this.normalScale=new et(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=mf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};Ir=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},tf=class extends Ir{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:kp,endingEnd:kp}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,o=e+1,a=i[r],c=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case zp:r=e,a=2*t-n;break;case Hp:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case zp:o=e,c=2*n-t;break;case Hp:o=1,c=n+i[1]-i[0];break;default:o=e-1,c=t}let l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,d=this._weightNext,g=(n-t)/(i-t),y=g*g,m=y*g,p=-f*m+2*f*y-f*g,v=(1+f)*m+(-1.5-2*f)*y+(-.5+f)*g+1,_=(-1-d)*m+(1.5+d)*y+.5*g,E=d*m-d*y;for(let w=0;w!==a;++w)r[w]=p*o[u+w]+v*o[l+w]+_*o[c+w]+E*o[h+w];return r}},nf=class extends Ir{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(n-t)/(i-t),h=1-u;for(let f=0;f!==a;++f)r[f]=o[l+f]*h+o[c+f]*u;return r}},sf=class extends Ir{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},ms=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=rl(t,this.TimeBufferType),this.values=rl(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:rl(e.times,Array),values:rl(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new sf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new nf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new tf(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Jo:t=this.InterpolantFactoryMethodDiscrete;break;case ro:t=this.InterpolantFactoryMethodLinear;break;case qu:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Jo;case this.InterpolantFactoryMethodLinear:return ro;case this.InterpolantFactoryMethodSmooth:return qu}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(i!==void 0&&ZS(i))for(let a=0,c=i.length;a!==c;++a){let l=i[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===qu,r=e.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(i)c=!0;else{let h=a*n,f=h-n,d=h+n;for(let g=0;g!==n;++g){let y=t[h+g];if(y!==t[f+g]||y!==t[d+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let h=a*n,f=o*n;for(let d=0;d!==n;++d)t[f+d]=t[h+d]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};ms.prototype.TimeBufferType=Float32Array;ms.prototype.ValueBufferType=Float32Array;ms.prototype.DefaultInterpolation=ro;Lr=class extends ms{};Lr.prototype.ValueTypeName="bool";Lr.prototype.ValueBufferType=Array;Lr.prototype.DefaultInterpolation=Jo;Lr.prototype.InterpolantFactoryMethodLinear=void 0;Lr.prototype.InterpolantFactoryMethodSmooth=void 0;Ll=class extends ms{};Ll.prototype.ValueTypeName="color";ir=class extends ms{};ir.prototype.ValueTypeName="number";rf=class extends Ir{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(i-t),l=e*a;for(let u=l+a;l!==u;l+=4)pi.slerpFlat(r,0,o,l-a,o,l,c);return r}},Fs=class extends ms{InterpolantFactoryMethodLinear(e){return new rf(this.times,this.values,this.getValueSize(),e)}};Fs.prototype.ValueTypeName="quaternion";Fs.prototype.DefaultInterpolation=ro;Fs.prototype.InterpolantFactoryMethodSmooth=void 0;Nr=class extends ms{};Nr.prototype.ValueTypeName="string";Nr.prototype.ValueBufferType=Array;Nr.prototype.DefaultInterpolation=Jo;Nr.prototype.InterpolantFactoryMethodLinear=void 0;Nr.prototype.InterpolantFactoryMethodSmooth=void 0;sr=class extends ms{};sr.prototype.ValueTypeName="vector";Nl=class{constructor(e,t=-1,n,i=xy){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Es(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push($S(n[o]).scale(i));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(ms.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let r=t.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);let u=KS(c);c=qm(c,1,u),l=qm(l,1,u),!i&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new ir(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){let l=e[a],u=l.name.match(r);if(u&&u.length>1){let h=u[1],f=i[h];f||(i[h]=f=[]),f.push(l)}}let o=[];for(let a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(h,f,d,g,y){if(d.length!==0){let m=[],p=[];vg(d,m,p,g),m.length!==0&&y.push(new h(f,m,p))}},i=[],r=e.name||"default",o=e.fps||30,a=e.blendMode,c=e.length||-1,l=e.hierarchy||[];for(let h=0;h<l.length;h++){let f=l[h].keys;if(!(!f||f.length===0))if(f[0].morphTargets){let d={},g;for(g=0;g<f.length;g++)if(f[g].morphTargets)for(let y=0;y<f[g].morphTargets.length;y++)d[f[g].morphTargets[y]]=-1;for(let y in d){let m=[],p=[];for(let v=0;v!==f[g].morphTargets.length;++v){let _=f[g];m.push(_.time),p.push(_.morphTarget===y?1:0)}i.push(new ir(".morphTargetInfluence["+y+"]",m,p))}c=d.length*o}else{let d=".bones["+t[h].name+"]";n(sr,d+".position",f,"pos",i),n(Fs,d+".quaternion",f,"rot",i),n(sr,d+".scale",f,"scl",i)}}return i.length===0?null:new this(r,c,i,a)}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};br={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}},of=class{constructor(e,t,n){let i=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,r===!1&&i.onStart!==void 0&&i.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,i.onProgress!==void 0&&i.onProgress(u,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){let h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=l.length;h<f;h+=2){let d=l[h],g=l[h+1];if(d.global&&(d.lastIndex=0),d.test(u))return g}return null}}},QS=new of,rr=class{constructor(e){this.manager=e!==void 0?e:QS,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};rr.DEFAULT_MATERIAL_NAME="__DEFAULT";er={},af=class extends Error{constructor(e,t){super(e),this.response=t}},ec=class extends rr{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=br.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(er[e]!==void 0){er[e].push({onLoad:t,onProgress:n,onError:i});return}er[e]=[],er[e].push({onLoad:t,onProgress:n,onError:i});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream=="undefined"||l.body===void 0||l.body.getReader===void 0)return l;let u=er[e],h=l.body.getReader(),f=l.headers.get("Content-Length")||l.headers.get("X-File-Size"),d=f?parseInt(f):0,g=d!==0,y=0,m=new ReadableStream({start(p){v();function v(){h.read().then(({done:_,value:E})=>{if(_)p.close();else{y+=E.byteLength;let w=new ProgressEvent("progress",{lengthComputable:g,loaded:y,total:d});for(let A=0,R=u.length;A<R;A++){let O=u[A];O.onProgress&&O.onProgress(w)}p.enqueue(E),v()}})}}});return new Response(m)}else throw new af(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return l.json();default:if(a===void 0)return l.text();{let h=/charset="?([^;"\s]*)"?/i.exec(a),f=h&&h[1]?h[1].toLowerCase():void 0,d=new TextDecoder(f);return l.arrayBuffer().then(g=>d.decode(g))}}}).then(l=>{br.add(e,l);let u=er[e];delete er[e];for(let h=0,f=u.length;h<f;h++){let d=u[h];d.onLoad&&d.onLoad(l)}}).catch(l=>{let u=er[e];if(u===void 0)throw this.manager.itemError(e),l;delete er[e];for(let h=0,f=u.length;h<f;h++){let d=u[h];d.onError&&d.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}},cf=class extends rr{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=br.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;let a=Wa("img");function c(){u(),br.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(h){u(),i&&i(h),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}},Dl=class extends rr{constructor(e){super(e)}load(e,t,n,i){let r=new Fi,o=new cf(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}},sa=class extends Yn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Tt(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}},Ul=class extends sa{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Yn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Tt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Sh=new vt,Ym=new T,jm=new T,tc=class{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new et(512,512),this.map=null,this.mapPass=null,this.matrix=new vt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ar,this._frameExtents=new et(1,1),this._viewportCount=1,this._viewports=[new Un(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Ym.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ym),jm.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(jm),t.updateMatrixWorld(),Sh.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Sh),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Sh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},lf=class extends tc{constructor(){super(new hi(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,n=$o*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Fl=class extends sa{constructor(e,t,n=0,i=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Yn.DEFAULT_UP),this.updateMatrix(),this.target=new Yn,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new lf}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Zm=new vt,Da=new T,Eh=new T,uf=class extends tc{constructor(){super(new hi(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new et(4,2),this._viewportCount=6,this._viewports=[new Un(2,1,1,1),new Un(0,1,1,1),new Un(3,1,1,1),new Un(1,1,1,1),new Un(3,0,1,1),new Un(1,0,1,1)],this._cubeDirections=[new T(1,0,0),new T(-1,0,0),new T(0,0,1),new T(0,0,-1),new T(0,1,0),new T(0,-1,0)],this._cubeUps=[new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,0,1),new T(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Da.setFromMatrixPosition(e.matrixWorld),n.position.copy(Da),Eh.copy(n.position),Eh.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Eh),n.updateMatrixWorld(),i.makeTranslation(-Da.x,-Da.y,-Da.z),Zm.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Zm)}},Bl=class extends sa{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new uf}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},hf=class extends tc{constructor(){super(new Rr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ra=class extends sa{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Yn.DEFAULT_UP),this.updateMatrix(),this.target=new Yn,this.shadow=new hf}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Dr=class{static decodeText(e){if(typeof TextDecoder!="undefined")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}},Ol=class extends rr{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap=="undefined"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch=="undefined"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=br.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{i&&i(l)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;let c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return br.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){i&&i(l),br.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});br.add(e,c),r.manager.itemStart(e)}},Sf="\\[\\]\\.:\\/",eE=new RegExp("["+Sf+"]","g"),Ef="[^"+Sf+"]",tE="[^"+Sf.replace("\\.","")+"]",nE=/((?:WC+[\/:])*)/.source.replace("WC",Ef),iE=/(WCOD+)?/.source.replace("WCOD",tE),sE=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ef),rE=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ef),oE=new RegExp("^"+nE+iE+sE+rE+"$"),aE=["material","materials","bones","map"],ff=class{constructor(e,t,n){let i=n||kn.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},kn=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(eE,"")}static parseTrackName(e){let t=oE.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);aE.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[i];if(o===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};kn.Composite=ff;kn.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};kn.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};kn.prototype.GetterByBindingType=[kn.prototype._getValue_direct,kn.prototype._getValue_array,kn.prototype._getValue_arrayElement,kn.prototype._getValue_toArray];kn.prototype.SetterByBindingTypeAndVersioning=[[kn.prototype._setValue_direct,kn.prototype._setValue_direct_setNeedsUpdate,kn.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[kn.prototype._setValue_array,kn.prototype._setValue_array_setNeedsUpdate,kn.prototype._setValue_array_setMatrixWorldNeedsUpdate],[kn.prototype._setValue_arrayElement,kn.prototype._setValue_arrayElement_setNeedsUpdate,kn.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[kn.prototype._setValue_fromArray,kn.prototype._setValue_fromArray_setNeedsUpdate,kn.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];u1=new Float32Array(1),nc=class{constructor(e,t,n=0,i=1/0){this.ray=new nr(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Xa,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return df(e,this,n,t),n.sort(Km),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)df(e[i],this,n,t);return n.sort(Km),n}};kl=class{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(si(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}},Jm=new T,ol=new T,$i=class{constructor(e=new T,t=new T){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){Jm.subVectors(e,this.start),ol.subVectors(this.end,this.start);let n=ol.dot(ol),r=ol.dot(Jm)/n;return t&&(r=si(r,0,1)),r}closestPointToPoint(e,t,n){let i=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(i).add(this.start)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}};typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:co}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=co)});var Tf,bg=Lt(()=>{Tf={"Superior gluteal nerve":["Gluteus medius muscle","Gluteus minimus muscle","Tensor fasciae latae"],"Nerve to piriformis muscle":["Piriformis muscle"],"Femoral nerve":["Sartorius muscle","Rectus femoris muscle","Pectineus muscle","Iliacus muscle","Vastus lateralis muscle","Vastus medialis muscle","Vastus intermedius muscle"],"Obturator nerve":["Adductor longus","Gracilis muscle","Adductor brevis","Obturator externus","Adductor magnus"],"Sciatic nerve":["Semitendinosus muscle","Long head of biceps femoris","Short head of biceps femoris","Semimembranosus muscle","Adductor magnus"],"Deep fibular nerve":["Tibialis anterior muscle","Extensor digitorum longus","Tendon of extensor digitorum longus","Extensor hallucis longus","Fibularis tertius muscle","Extensor digitorum brevis","Extensor hallucis brevis"],"Superficial fibular nerve":["Fibularis longus muscle","Fibularis brevis muscle"],"Tibial nerve":["Medial head of gastrocnemius","Lateral head of gastrocnemius","Calcaneal tendon","Soleus muscle","Plantaris muscle","Popliteus muscle","Flexor hallucis longus","Flexor digitorum longus","Tibialis posterior muscle"],"Nerve to quadratus femoris muscle":["Inferior gemellus muscle","Quadratus femoris muscle"],"Medial plantar nerve":["Abductor hallucis","Flexor digitorum brevis","Lumbrical muscles of foot","Medial head of flexor hallucis brevis","Lateral head of flexor hallucis brevis"],"Lateral plantar nerve":["Abductor digiti minimi of foot","Quadratus plantae muscle","Lumbrical muscles of foot","Oblique head of adductor hallucis","Transverse head of adductor hallucis","Flexor digiti minimi of foot","Plantar interossei muscles","Dorsal interossei muscles of foot"],"Medial pectoral nerve":["Clavicular head of pectoralis major muscle","Sternocostal head of pectoralis major muscle","Pectoralis minor muscle"],"Lateral pectoral nerve":["Clavicular head of pectoralis major muscle","Sternocostal head of pectoralis major muscle"],"Long thoracic nerve":["Serratus anterior muscle"],"Axillary nerve":["Clavicular part of deltoid muscle","Acromial part of deltoid muscle","Scapular spinal part of deltoid muscle","Teres minor muscle"],"Suprascapular nerve":["Supraspinatus muscle","Infraspinatus muscle"],"Inferior subscapular nerve":["Teres major muscle","Subscapularis muscle"],"Superior subscapular nerve":["Subscapularis muscle"],"Musculocutaneous nerve":["Long head of biceps brachii","Short head of biceps brachii","Coracobrachialis muscle","Brachialis muscle"],"Radial nerve":["Long head of triceps brachii","Lateral head of triceps brachii","Medial head of triceps brachii","Anconeus muscle","Brachioradialis muscle","Extensor carpi radialis longus"],"Median nerve":["Superficial head of pronator teres","Deep head of pronator teres","Flexor carpi radialis","Palmaris longus muscle","Humero-ulnar head of flexor digitorum superficialis","Radial head of flexor digitorum superficialis","Opponens pollicis muscle","Abductor pollicis brevis","Superficial head of flexor pollicis brevis","Deep head of flexor pollicis brevis","Lumbrical muscles of hand"],"Ulnar nerve":["Humeral head of flexor carpi ulnaris","Ulnar head of flexor carpi ulnaris","Flexor digitorum profundus"],"Anterior interosseous nerve of forearm":["Flexor digitorum profundus","Flexor pollicis longus","Pronator quadratus"],"Deep branch of radial nerve":["Extensor carpi radialis brevis","Supinator"],"Posterior interosseous nerve of forearm":["Extensor digitorum","Extensor digiti minimi","Humeral head of extensor carpi ulnaris","Ulnar head of extensor carpi ulnaris","Extensor indicis","Abductor pollicis longus","Extensor pollicis longus","Extensor pollicis brevis"],"Deep branch of ulnar nerve":["Oblique head of adductor pollicis","Transverse head of adductor pollicis","Abductor digiti minimi of hand","Flexor digiti minimi of hand","Opponens digiti minimi muscle of hand","Dorsal interossei muscles of hand","Palmar interossei muscles","Lumbrical muscles of hand"],"Accessory nerve (XI).l":["Descending part of trapezius muscle.l","Descending part of trapezius muscle.r","Transverse part of trapezius muscle.l","Transverse part of trapezius muscle.r","Ascending part of trapezius muscle.l","Ascending part of trapezius muscle.r"],"Accessory nerve (XI).r":["Descending part of trapezius muscle.l","Descending part of trapezius muscle.r","Transverse part of trapezius muscle.l","Transverse part of trapezius muscle.r","Ascending part of trapezius muscle.l","Ascending part of trapezius muscle.r"],"Thoracodorsal nerve.l":["Latissimus dorsi muscle.l","Latissimus dorsi muscle.r"],"Thoracodorsal nerve.r":["Latissimus dorsi muscle.l","Latissimus dorsi muscle.r"],"Dorsal scapular nerve.l":["Levator scapulae.l","Levator scapulae.r","Rhomboid minor muscle.l","Rhomboid minor muscle.r","Rhomboid major muscle.l","Rhomboid major muscle.r"],"Dorsal scapular nerve.r":["Levator scapulae.l","Levator scapulae.r","Rhomboid minor muscle.l","Rhomboid minor muscle.r","Rhomboid major muscle.l","Rhomboid major muscle.r"]}});function wf(s,e){if(e===cg)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===ic||e===Wl){let t=s.getIndex();if(t===null){let o=[],a=s.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);s.setIndex(o),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}let n=t.count-2,i=[];if(e===ic)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}var Mg=Lt(()=>{xi()});function uE(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}function dE(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Pr({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Vi})),s.DefaultMaterial}function uo(s,e,t){for(let n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Fr(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function pE(s,e,t){let n=!1,i=!1,r=!1;for(let l=0,u=e.length;l<u;l++){let h=e[l];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(i=!0),h.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);let o=[],a=[],c=[];for(let l=0,u=e.length;l<u;l++){let h=e[l];if(n){let f=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):s.attributes.position;o.push(f)}if(i){let f=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):s.attributes.normal;a.push(f)}if(r){let f=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):s.attributes.color;c.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){let u=l[0],h=l[1],f=l[2];return n&&(s.morphAttributes.position=u),i&&(s.morphAttributes.normal=h),r&&(s.morphAttributes.color=f),s.morphTargetsRelative=!0,s})}function mE(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function gE(s){let e,t=s.extensions&&s.extensions[yn.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Cf(t.attributes):e=s.indices+":"+Cf(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+Cf(s.targets[n]);return e}function Cf(s){let e="",t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function Qf(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function xE(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}function _E(s,e,t){let n=e.attributes,i=new sn;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(i.set(new T(c[0],c[1],c[2]),new T(l[0],l[1],l[2])),a.normalized){let u=Qf(aa[a.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let a=new T,c=new T;for(let l=0,u=r.length;l<u;l++){let h=r[l];if(h.POSITION!==void 0){let f=t.json.accessors[h.POSITION],d=f.min,g=f.max;if(d!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(d[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(d[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(d[2]),Math.abs(g[2]))),f.normalized){let y=Qf(aa[f.componentType]);c.multiplyScalar(y)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}s.boundingBox=i;let o=new Qn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=o}function wg(s,e,t){let n=e.attributes,i=[];function r(o,a){return t.getDependency("accessor",o).then(function(c){s.setAttribute(a,c)})}for(let o in n){let a=$f[o]||o.toLowerCase();a in s.attributes||i.push(r(n[o],a))}if(e.indices!==void 0&&!s.index){let o=t.getDependency("accessor",e.indices).then(function(a){s.setIndex(a)});i.push(o)}return En.workingColorSpace!==di&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${En.workingColorSpace}" not supported.`),Fr(s,e),_E(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?pE(s,e.targets,t):s})}var Yl,yn,Pf,If,Lf,Nf,Df,Uf,Ff,Bf,Of,kf,zf,Hf,Vf,Gf,Wf,Xf,qf,Ag,sc,Sg,Yf,jf,Zf,Kf,jl,hE,Jf,gs,aa,Eg,Tg,Af,$f,Ur,fE,Rf,yE,ed,Rg=Lt(()=>{xi();Mg();Yl=class extends rr{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Nf(t)}),this.register(function(t){return new Vf(t)}),this.register(function(t){return new Gf(t)}),this.register(function(t){return new Wf(t)}),this.register(function(t){return new Uf(t)}),this.register(function(t){return new Ff(t)}),this.register(function(t){return new Bf(t)}),this.register(function(t){return new Of(t)}),this.register(function(t){return new Lf(t)}),this.register(function(t){return new kf(t)}),this.register(function(t){return new Df(t)}),this.register(function(t){return new Hf(t)}),this.register(function(t){return new zf(t)}),this.register(function(t){return new Pf(t)}),this.register(function(t){return new Xf(t)}),this.register(function(t){return new qf(t)})}load(e,t,n,i){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let l=Dr.extractUrlBase(e);o=Dr.resolveURL(l,this.path)}else o=Dr.extractUrlBase(e);this.manager.itemStart(e);let a=function(l){i?i(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new ec(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,o,function(u){t(u),r.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r,o={},a={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Ag){try{o[yn.KHR_BINARY_GLTF]=new Yf(e)}catch(h){i&&i(h);return}r=JSON.parse(o[yn.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new ed(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let h=this.pluginCallbacks[u](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[h.name]=h,o[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){let h=r.extensionsUsed[u],f=r.extensionsRequired||[];switch(h){case yn.KHR_MATERIALS_UNLIT:o[h]=new If;break;case yn.KHR_DRACO_MESH_COMPRESSION:o[h]=new jf(r,this.dracoLoader);break;case yn.KHR_TEXTURE_TRANSFORM:o[h]=new Zf;break;case yn.KHR_MESH_QUANTIZATION:o[h]=new Kf;break;default:f.indexOf(h)>=0&&a[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}};yn={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Pf=class{constructor(e){this.parser=e,this.name=yn.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,u=new Tt(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],di);let h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new ra(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Bl(u),l.distance=h;break;case"spot":l=new Fl(u),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,Fr(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}},If=class{constructor(){this.name=yn.KHR_MATERIALS_UNLIT}getMaterialType(){return Gi}extendParams(e,t,n){let i=[];e.color=new Tt(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],di),e.opacity=o[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,Gn))}return Promise.all(i)}},Lf=class{constructor(e){this.parser=e,this.name=yn.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},Nf=class{constructor(e){this.parser=e,this.name=yn.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ps}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){let a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new et(a,a)}return Promise.all(r)}},Df=class{constructor(e){this.parser=e,this.name=yn.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ps}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}},Uf=class{constructor(e){this.parser=e,this.name=yn.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ps}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new Tt(0,0,0),t.sheenRoughness=0,t.sheen=1;let o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){let a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],di)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Gn)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}},Ff=class{constructor(e){this.parser=e,this.name=yn.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ps}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}},Bf=class{constructor(e){this.parser=e,this.name=yn.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ps}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;let a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Tt().setRGB(a[0],a[1],a[2],di),Promise.all(r)}},Of=class{constructor(e){this.parser=e,this.name=yn.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ps}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},kf=class{constructor(e){this.parser=e,this.name=yn.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ps}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));let a=o.specularColorFactor||[1,1,1];return t.specularColor=new Tt().setRGB(a[0],a[1],a[2],di),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Gn)),Promise.all(r)}},zf=class{constructor(e){this.parser=e,this.name=yn.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ps}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}},Hf=class{constructor(e){this.parser=e,this.name=yn.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ps}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}},Vf=class{constructor(e){this.parser=e,this.name=yn.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let r=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}},Gf=class{constructor(e){this.parser=e,this.name=yn.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=i.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Wf=class{constructor(e){this.parser=e,this.name=yn.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=i.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Xf=class{constructor(e){this.name=yn.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let c=i.byteOffset||0,l=i.byteLength||0,u=i.count,h=i.byteStride,f=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,h,f,i.mode,i.filter).then(function(d){return d.buffer}):o.ready.then(function(){let d=new ArrayBuffer(u*h);return o.decodeGltfBuffer(new Uint8Array(d),u,h,f,i.mode,i.filter),d})})}else return null}},qf=class{constructor(e){this.name=yn.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let l of i.primitives)if(l.mode!==gs.TRIANGLES&&l.mode!==gs.TRIANGLE_STRIP&&l.mode!==gs.TRIANGLE_FAN&&l.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],c={};for(let l in o)a.push(this.parser.getDependency("accessor",o[l]).then(u=>(c[l]=u,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{let u=l.pop(),h=u.isGroup?u.children:[u],f=l[0].count,d=[];for(let g of h){let y=new vt,m=new T,p=new pi,v=new T(1,1,1),_=new Sl(g.geometry,g.material,f);for(let E=0;E<f;E++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,E),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,E),c.SCALE&&v.fromBufferAttribute(c.SCALE,E),_.setMatrixAt(E,y.compose(m,p,v));for(let E in c)if(E==="_COLOR_0"){let w=c[E];_.instanceColor=new ao(w.array,w.itemSize,w.normalized)}else E!=="TRANSLATION"&&E!=="ROTATION"&&E!=="SCALE"&&g.geometry.setAttribute(E,c[E]);Yn.prototype.copy.call(_,g),this.parser.assignFinalMaterial(_),d.push(_)}return u.isGroup?(u.clear(),u.add(...d),u):d[0]}))}},Ag="glTF",sc=12,Sg={JSON:1313821514,BIN:5130562},Yf=class{constructor(e){this.name=yn.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,sc),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Ag)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-sc,r=new DataView(e,sc),o=0;for(;o<i;){let a=r.getUint32(o,!0);o+=4;let c=r.getUint32(o,!0);if(o+=4,c===Sg.JSON){let l=new Uint8Array(e,sc+o,a);this.content=n.decode(l)}else if(c===Sg.BIN){let l=sc+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},jf=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=yn.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(let u in o){let h=$f[u]||u.toLowerCase();a[h]=o[u]}for(let u in e.attributes){let h=$f[u]||u.toLowerCase();if(o[u]!==void 0){let f=n.accessors[e.attributes[u]],d=aa[f.componentType];l[h]=d.name,c[h]=f.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(h,f){i.decodeDracoFile(u,function(d){for(let g in d.attributes){let y=d.attributes[g],m=c[g];m!==void 0&&(y.normalized=m)}h(d)},a,l,di,f)})})}},Zf=class{constructor(){this.name=yn.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},Kf=class{constructor(){this.name=yn.KHR_MESH_QUANTIZATION}},jl=class extends Ir{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,u=i-t,h=(n-t)/u,f=h*h,d=f*h,g=e*l,y=g-l,m=-2*d+3*f,p=d-f,v=1-m,_=p-f+h;for(let E=0;E!==a;E++){let w=o[y+E+a],A=o[y+E+c]*u,R=o[g+E+a],O=o[g+E]*u;r[E]=v*w+_*A+m*R+p*O}return r}},hE=new pi,Jf=class extends jl{interpolate_(e,t,n,i){let r=super.interpolate_(e,t,n,i);return hE.fromArray(r).normalize().toArray(r),r}},gs={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},aa={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Eg={9728:ui,9729:Hi,9984:cl,9985:gf,9986:Ua,9987:Tr},Tg={33071:rs,33648:Va,10497:io},Af={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},$f={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ur={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},fE={CUBICSPLINE:void 0,LINEAR:ro,STEP:Jo},Rf={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};yE=new vt,ed=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new uE,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,r=-1;typeof navigator!="undefined"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,r=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap=="undefined"||n||i&&r<98?this.textureLoader=new Dl(this.options.manager):this.textureLoader=new Ol(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new ec(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return uo(r,a,i),Fr(a,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){let o=t[i].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let i=0,r=e.length;i<r;i++){let o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),r=(o,a)=>{let c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(let[l,u]of o.children.entries())r(u,a.children[l])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[yn.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(r,o){n.load(Dr.resolveURL(t.uri,i.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let o=Af[i.type],a=aa[i.componentType],c=i.normalized===!0,l=new a(i.count*o);return Promise.resolve(new An(l,o,c))}let r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],c=Af[i.type],l=aa[i.componentType],u=l.BYTES_PER_ELEMENT,h=u*c,f=i.byteOffset||0,d=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0,y,m;if(d&&d!==h){let p=Math.floor(f/d),v="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count,_=t.cache.get(v);_||(y=new l(a,p*d,i.count*d/u),_=new ja(y,d/u),t.cache.add(v,_)),m=new Za(_,c,f%d/u,g)}else a===null?y=new l(i.count*c):y=new l(a,f,i.count*c),m=new An(y,c,g);if(i.sparse!==void 0){let p=Af.SCALAR,v=aa[i.sparse.indices.componentType],_=i.sparse.indices.byteOffset||0,E=i.sparse.values.byteOffset||0,w=new v(o[1],_,i.sparse.count*p),A=new l(o[2],E,i.sparse.count*c);a!==null&&(m=new An(m.array.slice(),m.itemSize,m.normalized));for(let R=0,O=w.length;R<O;R++){let b=w[R];if(m.setX(b,A[R*c]),c>=2&&m.setY(b,A[R*c+1]),c>=3&&m.setZ(b,A[R*c+2]),c>=4&&m.setW(b,A[R*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return m})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r],a=this.textureLoader;if(o.uri){let c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let i=this,r=this.json,o=r.textures[e],a=r.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);let f=(r.samplers||{})[o.sampler]||{};return u.magFilter=Eg[f.magFilter]||Hi,u.minFilter=Eg[f.minFilter]||Tr,u.wrapS=Tg[f.wrapS]||io,u.wrapT=Tg[f.wrapT]||io,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());let o=i.images[e],a=self.URL||self.webkitURL,c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(h){l=!0;let f=new Blob([h],{type:o.mimeType});return c=a.createObjectURL(f),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(c).then(function(h){return new Promise(function(f,d){let g=f;t.isImageBitmapLoader===!0&&(g=function(y){let m=new Fi(y);m.needsUpdate=!0,f(m)}),t.load(Dr.resolveURL(h,r.path),g,void 0,d)})}).then(function(h){return l===!0&&a.revokeObjectURL(c),h.userData.mimeType=o.mimeType||xE(o.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[yn.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[yn.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let c=r.associations.get(o);o=r.extensions[yn.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new $a,Ji.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new Ja,Ji.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(i||r||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Pr}loadMaterial(e){let t=this,n=this.json,i=this.extensions,r=n.materials[e],o,a={},c=r.extensions||{},l=[];if(c[yn.KHR_MATERIALS_UNLIT]){let h=i[yn.KHR_MATERIALS_UNLIT];o=h.getMaterialType(),l.push(h.extendParams(a,r,t))}else{let h=r.pbrMetallicRoughness||{};if(a.color=new Tt(1,1,1),a.opacity=1,Array.isArray(h.baseColorFactor)){let f=h.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],di),a.opacity=f[3]}h.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",h.baseColorTexture,Gn)),a.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,a.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",h.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",h.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=Si);let u=r.alphaMode||Rf.OPAQUE;if(u===Rf.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===Rf.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==Gi&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new et(1,1),r.normalTexture.scale!==void 0)){let h=r.normalTexture.scale;a.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&o!==Gi&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==Gi){let h=r.emissiveFactor;a.emissive=new Tt().setRGB(h[0],h[1],h[2],di)}return r.emissiveTexture!==void 0&&o!==Gi&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,Gn)),Promise.all(l).then(function(){let h=new o(a);return r.name&&(h.name=r.name),Fr(h,r),t.associations.set(h,{materials:e}),r.extensions&&uo(i,h,r),h})}createUniqueName(e){let t=kn.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function r(a){return n[yn.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return wg(c,a,t)})}let o=[];for(let a=0,c=e.length;a<c;a++){let l=e[a],u=gE(l),h=i[u];if(h)o.push(h.promise);else{let f;l.extensions&&l.extensions[yn.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=wg(new Ei,l,t),i[u]={primitive:l,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){let t=this,n=this.json,i=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){let u=o[c].material===void 0?dE(this.cache):this.getDependency("material",o[c].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){let l=c.slice(0,c.length-1),u=c[c.length-1],h=[];for(let d=0,g=u.length;d<g;d++){let y=u[d],m=o[d],p,v=l[d];if(m.mode===gs.TRIANGLES||m.mode===gs.TRIANGLE_STRIP||m.mode===gs.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new vl(y,v):new Tn(y,v),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===gs.TRIANGLE_STRIP?p.geometry=wf(p.geometry,Wl):m.mode===gs.TRIANGLE_FAN&&(p.geometry=wf(p.geometry,ic));else if(m.mode===gs.LINES)p=new Tl(y,v);else if(m.mode===gs.LINE_STRIP)p=new ia(y,v);else if(m.mode===gs.LINE_LOOP)p=new wl(y,v);else if(m.mode===gs.POINTS)p=new Al(y,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&mE(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),Fr(p,r),m.extensions&&uo(i,p,m),t.assignFinalMaterial(p),h.push(p)}for(let d=0,g=h.length;d<g;d++)t.associations.set(h[d],{meshes:e,primitives:d});if(h.length===1)return r.extensions&&uo(i,h[0],r),h[0];let f=new Us;r.extensions&&uo(i,f,r),t.associations.set(f,{meshes:e});for(let d=0,g=h.length;d<g;d++)f.add(h[d]);return f})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new hi(lo.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Rr(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Fr(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let r=i.pop(),o=i,a=[],c=[];for(let l=0,u=o.length;l<u;l++){let h=o[l];if(h){a.push(h);let f=new vt;r!==null&&f.fromArray(r.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Ml(a,c)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,o=[],a=[],c=[],l=[],u=[];for(let h=0,f=i.channels.length;h<f;h++){let d=i.channels[h],g=i.samplers[d.sampler],y=d.target,m=y.node,p=i.parameters!==void 0?i.parameters[g.input]:g.input,v=i.parameters!==void 0?i.parameters[g.output]:g.output;y.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",v)),l.push(g),u.push(y))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(h){let f=h[0],d=h[1],g=h[2],y=h[3],m=h[4],p=[];for(let v=0,_=f.length;v<_;v++){let E=f[v],w=d[v],A=g[v],R=y[v],O=m[v];if(E===void 0)continue;E.updateMatrix&&E.updateMatrix();let b=n._createAnimationTracks(E,w,A,R,O);if(b)for(let P=0;P<b.length;P++)p.push(b[P])}return new Nl(r,void 0,p)})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=i.weights.length;c<l;c++)a.morphTargetInfluences[c]=i.weights[c]}),o})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=i.children||[];for(let l=0,u=a.length;l<u;l++)o.push(n.getDependency("node",a[l]));let c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){let u=l[0],h=l[1],f=l[2];f!==null&&u.traverse(function(d){d.isSkinnedMesh&&d.bind(f,yE)});for(let d=0,g=h.length;d<g;d++)u.add(h[d]);return u})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],o=r.name?i.createUniqueName(r.name):"",a=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),r.camera!==void 0&&a.push(i.getDependency("camera",r.camera).then(function(l){return i._getNodeRef(i.cameraCache,r.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let u;if(r.isBone===!0?u=new Ka:l.length>1?u=new Us:l.length===1?u=l[0]:u=new Yn,u!==l[0])for(let h=0,f=l.length;h<f;h++)u.add(l[h]);if(r.name&&(u.userData.name=r.name,u.name=o),Fr(u,r),r.extensions&&uo(n,u,r),r.matrix!==void 0){let h=new vt;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);return i.associations.has(u)||i.associations.set(u,{}),i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,r=new Us;n.name&&(r.name=i.createUniqueName(n.name)),Fr(r,n),n.extensions&&uo(t,r,n);let o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(i.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let u=0,h=c.length;u<h;u++)r.add(c[u]);let l=u=>{let h=new Map;for(let[f,d]of i.associations)(f instanceof Ji||f instanceof Fi)&&h.set(f,d);return u.traverse(f=>{let d=i.associations.get(f);d!=null&&h.set(f,d)}),h};return i.associations=l(r),r})}_createAnimationTracks(e,t,n,i,r){let o=[],a=e.name?e.name:e.uuid,c=[];Ur[r.path]===Ur.weights?e.traverse(function(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}):c.push(a);let l;switch(Ur[r.path]){case Ur.weights:l=ir;break;case Ur.rotation:l=Fs;break;case Ur.position:case Ur.scale:l=sr;break;default:switch(n.itemSize){case 1:l=ir;break;case 2:case 3:default:l=sr;break}break}let u=i.interpolation!==void 0?fE[i.interpolation]:ro,h=this._getArrayFromAccessor(n);for(let f=0,d=c.length;f<d;f++){let g=new l(c[f]+"."+Ur[r.path],t.array,h,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Qf(t.constructor),i=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof Fs?Jf:jl;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}});var Cg,Zl,td=Lt(()=>{Cg=Math.pow(2,-24),Zl=Symbol("SKIP_GENERATION")});function vE(s){return s.index?s.index.count:s.attributes.position.count}function Bs(s){return vE(s)/3}function bE(s,e=ArrayBuffer){return s>65535?new Uint32Array(new e(4*s)):new Uint16Array(new e(2*s))}function Pg(s,e){if(!s.index){let t=s.attributes.position.count,n=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,i=bE(t,n);s.setIndex(new An(i,1));for(let r=0;r<t;r++)i[r]=r}}function nd(s,e){let t=Bs(s),n=e||s.drawRange,i=n.start/3,r=(n.start+n.count)/3,o=Math.max(0,i),a=Math.min(t,r)-o;return[{offset:Math.floor(o),count:Math.floor(a)}]}function id(s,e){if(!s.groups||!s.groups.length)return nd(s,e);let t=[],n=new Set,i=e||s.drawRange,r=i.start/3,o=(i.start+i.count)/3;for(let c of s.groups){let l=c.start/3,u=(c.start+c.count)/3;n.add(Math.max(r,l)),n.add(Math.min(o,u))}let a=Array.from(n.values()).sort((c,l)=>c-l);for(let c=0;c<a.length-1;c++){let l=a[c],u=a[c+1];t.push({offset:Math.floor(l),count:Math.floor(u-l)})}return t}function Ig(s,e){let t=Bs(s),n=id(s,e).sort((o,a)=>o.offset-a.offset),i=n[n.length-1];i.count=Math.min(t-i.offset,i.count);let r=0;return n.forEach(({count:o})=>r+=o),t!==r}var rc=Lt(()=>{xi()});function Kl(s,e,t,n,i){let r=1/0,o=1/0,a=1/0,c=-1/0,l=-1/0,u=-1/0,h=1/0,f=1/0,d=1/0,g=-1/0,y=-1/0,m=-1/0;for(let p=e*6,v=(e+t)*6;p<v;p+=6){let _=s[p+0],E=s[p+1],w=_-E,A=_+E;w<r&&(r=w),A>c&&(c=A),_<h&&(h=_),_>g&&(g=_);let R=s[p+2],O=s[p+3],b=R-O,P=R+O;b<o&&(o=b),P>l&&(l=P),R<f&&(f=R),R>y&&(y=R);let V=s[p+4],X=s[p+5],se=V-X,N=V+X;se<a&&(a=se),N>u&&(u=N),V<d&&(d=V),V>m&&(m=V)}n[0]=r,n[1]=o,n[2]=a,n[3]=c,n[4]=l,n[5]=u,i[0]=h,i[1]=f,i[2]=d,i[3]=g,i[4]=y,i[5]=m}function Lg(s,e=null,t=null,n=null){let i=s.attributes.position,r=s.index?s.index.array:null,o=Bs(s),a=i.normalized,c;e===null?(c=new Float32Array(o*6),t=0,n=o):(c=e,t=t||0,n=n||o);let l=i.array,u=i.offset||0,h=3;i.isInterleavedBufferAttribute&&(h=i.data.stride);let f=["getX","getY","getZ"];for(let d=t;d<t+n;d++){let g=d*3,y=d*6,m=g+0,p=g+1,v=g+2;r&&(m=r[m],p=r[p],v=r[v]),a||(m=m*h+u,p=p*h+u,v=v*h+u);for(let _=0;_<3;_++){let E,w,A;a?(E=i[f[_]](m),w=i[f[_]](p),A=i[f[_]](v)):(E=l[m+_],w=l[p+_],A=l[v+_]);let R=E;w<R&&(R=w),A<R&&(R=A);let O=E;w>O&&(O=w),A>O&&(O=A);let b=(O-R)/2,P=_*2;c[y+P+0]=R+b,c[y+P+1]=b+(Math.abs(R)+b)*Cg}}return c}var Ng=Lt(()=>{td();rc()});function Fn(s,e,t){return t.min.x=e[s],t.min.y=e[s+1],t.min.z=e[s+2],t.max.x=e[s+3],t.max.y=e[s+4],t.max.z=e[s+5],t}function sd(s){let e=-1,t=-1/0;for(let n=0;n<3;n++){let i=s[n+3]-s[n];i>t&&(t=i,e=n)}return e}function rd(s,e){e.set(s)}function od(s,e,t){let n,i;for(let r=0;r<3;r++){let o=r+3;n=s[r],i=e[r],t[r]=n<i?n:i,n=s[o],i=e[o],t[o]=n>i?n:i}}function oc(s,e,t){for(let n=0;n<3;n++){let i=e[s+2*n],r=e[s+2*n+1],o=i-r,a=i+r;o<t[n]&&(t[n]=o),a>t[n+3]&&(t[n+3]=a)}}function ca(s){let e=s[3]-s[0],t=s[4]-s[1],n=s[5]-s[2];return 2*(e*t+t*n+n*e)}var ho=Lt(()=>{});function Fg(s,e,t,n,i,r){let o=-1,a=0;if(r===0)o=sd(e),o!==-1&&(a=(e[o]+e[o+3])/2);else if(r===1)o=sd(s),o!==-1&&(a=EE(t,n,i,o));else if(r===2){let c=ca(s),l=1.25*i,u=n*6,h=(n+i)*6;for(let f=0;f<3;f++){let d=e[f],m=(e[f+3]-d)/or;if(i<or/4){let p=[...Br];p.length=i;let v=0;for(let E=u;E<h;E+=6,v++){let w=p[v];w.candidate=t[E+2*f],w.count=0;let{bounds:A,leftCacheBounds:R,rightCacheBounds:O}=w;for(let b=0;b<3;b++)O[b]=1/0,O[b+3]=-1/0,R[b]=1/0,R[b+3]=-1/0,A[b]=1/0,A[b+3]=-1/0;oc(E,t,A)}p.sort(SE);let _=i;for(let E=0;E<_;E++){let w=p[E];for(;E+1<_&&p[E+1].candidate===w.candidate;)p.splice(E+1,1),_--}for(let E=u;E<h;E+=6){let w=t[E+2*f];for(let A=0;A<_;A++){let R=p[A];w>=R.candidate?oc(E,t,R.rightCacheBounds):(oc(E,t,R.leftCacheBounds),R.count++)}}for(let E=0;E<_;E++){let w=p[E],A=w.count,R=i-w.count,O=w.leftCacheBounds,b=w.rightCacheBounds,P=0;A!==0&&(P=ca(O)/c);let V=0;R!==0&&(V=ca(b)/c);let X=1+1.25*(P*A+V*R);X<l&&(o=f,l=X,a=w.candidate)}}else{for(let _=0;_<or;_++){let E=Br[_];E.count=0,E.candidate=d+m+_*m;let w=E.bounds;for(let A=0;A<3;A++)w[A]=1/0,w[A+3]=-1/0}for(let _=u;_<h;_+=6){let A=~~((t[_+2*f]-d)/m);A>=or&&(A=or-1);let R=Br[A];R.count++,oc(_,t,R.bounds)}let p=Br[or-1];rd(p.bounds,p.rightCacheBounds);for(let _=or-2;_>=0;_--){let E=Br[_],w=Br[_+1];od(E.bounds,w.rightCacheBounds,E.rightCacheBounds)}let v=0;for(let _=0;_<or-1;_++){let E=Br[_],w=E.count,A=E.bounds,O=Br[_+1].rightCacheBounds;w!==0&&(v===0?rd(A,Jl):od(A,Jl,Jl)),v+=w;let b=0,P=0;v!==0&&(b=ca(Jl)/c);let V=i-v;V!==0&&(P=ca(O)/c);let X=1+1.25*(b*v+P*V);X<l&&(o=f,l=X,a=E.candidate)}}}}else console.warn(`MeshBVH: Invalid build strategy value ${r} used.`);return{axis:o,pos:a}}function EE(s,e,t,n){let i=0;for(let r=e,o=e+t;r<o;r++)i+=s[r*6+n*2];return i/t}var or,SE,Br,Jl,Bg=Lt(()=>{ho();or=32,SE=(s,e)=>s.candidate-e.candidate,Br=new Array(or).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),Jl=new Float32Array(6)});var la,Og=Lt(()=>{la=class{constructor(){this.boundingData=new Float32Array(6)}}});function kg(s,e,t,n,i,r){let o=n,a=n+i-1,c=r.pos,l=r.axis*2;for(;;){for(;o<=a&&t[o*6+l]<c;)o++;for(;o<=a&&t[a*6+l]>=c;)a--;if(o<a){for(let u=0;u<3;u++){let h=e[o*3+u];e[o*3+u]=e[a*3+u],e[a*3+u]=h}for(let u=0;u<6;u++){let h=t[o*6+u];t[o*6+u]=t[a*6+u],t[a*6+u]=h}o++,a--}else return o}}var zg=Lt(()=>{});function Hg(s,e,t,n,i,r){let o=n,a=n+i-1,c=r.pos,l=r.axis*2;for(;;){for(;o<=a&&t[o*6+l]<c;)o++;for(;o<=a&&t[a*6+l]>=c;)a--;if(o<a){let u=s[o];s[o]=s[a],s[a]=u;for(let h=0;h<6;h++){let f=t[o*6+h];t[o*6+h]=t[a*6+h],t[a*6+h]=f}o++,a--}else return o}}var Vg=Lt(()=>{});function jn(s,e){return e[s+15]===65535}function ei(s,e){return e[s+6]}function ri(s,e){return e[s+14]}function Ti(s){return s+8}function wi(s,e){return e[s+6]}function $l(s,e){return e[s+7]}var Os=Lt(()=>{});function eu(s){return"count"in s?1:1+eu(s.left)+eu(s.right)}function Xg(s,e,t){return Gg=new Float32Array(t),ac=new Uint32Array(t),Ql=new Uint16Array(t),Wg=new Uint8Array(t),ad(s,e)}function ad(s,e){let t=s/4,n=s/2,i="count"in e,r=e.boundingData;for(let o=0;o<6;o++)Gg[t+o]=r[o];if(i)if(e.buffer){let o=e.buffer;Wg.set(new Uint8Array(o),s);for(let a=s,c=s+o.byteLength;a<c;a+=32){let l=a/2;jn(l,Ql)||(ac[a/4+6]+=t)}return s+o.byteLength}else{let o=e.offset,a=e.count;return ac[t+6]=o,Ql[n+14]=a,Ql[n+15]=65535,s+32}else{let o=e.left,a=e.right,c=e.splitAxis,l;if(l=ad(s+32,o),l/4>TE)throw new Error("MeshBVH: Cannot store child pointer greater than 32 bits.");return ac[t+6]=l/4,l=ad(l,a),ac[t+7]=c,l}}var Gg,ac,Ql,Wg,TE,qg=Lt(()=>{Os();TE=Math.pow(2,32)});function wE(s,e){let t=(s.index?s.index.count:s.attributes.position.count)/3,n=t>2**16,i=n?4:2,r=e?new SharedArrayBuffer(t*i):new ArrayBuffer(t*i),o=n?new Uint32Array(r):new Uint16Array(r);for(let a=0,c=o.length;a<c;a++)o[a]=a;return o}function AE(s,e,t,n,i){let{maxDepth:r,verbose:o,maxLeafTris:a,strategy:c,onProgress:l,indirect:u}=i,h=s._indirectBuffer,f=s.geometry,d=f.index?f.index.array:null,g=u?Hg:kg,y=Bs(f),m=new Float32Array(6),p=!1,v=new la;return Kl(e,t,n,v.boundingData,m),E(v,t,n,m),v;function _(w){l&&l(w/y)}function E(w,A,R,O=null,b=0){if(!p&&b>=r&&(p=!0,o&&(console.warn(`MeshBVH: Max depth of ${r} reached when generating BVH. Consider increasing maxDepth.`),console.warn(f))),R<=a||b>=r)return _(A+R),w.offset=A,w.count=R,w;let P=Fg(w.boundingData,O,e,A,R,c);if(P.axis===-1)return _(A+R),w.offset=A,w.count=R,w;let V=g(h,d,e,A,R,P);if(V===A||V===A+R)_(A+R),w.offset=A,w.count=R;else{w.splitAxis=P.axis;let X=new la,se=A,N=V-A;w.left=X,Kl(e,se,N,X.boundingData,m),E(X,se,N,m,b+1);let j=new la,B=V,ye=R-N;w.right=j,Kl(e,B,ye,j.boundingData,m),E(j,B,ye,m,b+1)}return w}}function Yg(s,e){let t=s.geometry;e.indirect&&(s._indirectBuffer=wE(t,e.useSharedArrayBuffer),Ig(t,e.range)&&!e.verbose&&console.warn('MeshBVH: Provided geometry contains groups or a range that do not fully span the vertex contents while using the "indirect" option. BVH may incorrectly report intersections on unrendered portions of the geometry.')),s._indirectBuffer||Pg(t,e);let n=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,i=Lg(t),r=e.indirect?nd(t,e.range):id(t,e.range);s._roots=r.map(o=>{let a=AE(s,i,o.offset,o.count,e),c=eu(a),l=new n(32*c);return Xg(0,a,l),l})}var jg=Lt(()=>{rc();Ng();Bg();Og();zg();Vg();qg()});var Qi,G1,cd=Lt(()=>{xi();Qi=class{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(e,t){let n=1/0,i=-1/0;for(let r=0,o=e.length;r<o;r++){let c=e[r][t];n=c<n?c:n,i=c>i?c:i}this.min=n,this.max=i}setFromPoints(e,t){let n=1/0,i=-1/0;for(let r=0,o=t.length;r<o;r++){let a=t[r],c=e.dot(a);n=c<n?c:n,i=c>i?c:i}this.min=n,this.max=i}isSeparated(e){return this.min>e.max||e.min>this.max}};Qi.prototype.setFromBox=function(){let s=new T;return function(t,n){let i=n.min,r=n.max,o=1/0,a=-1/0;for(let c=0;c<=1;c++)for(let l=0;l<=1;l++)for(let u=0;u<=1;u++){s.x=i.x*c+r.x*(1-c),s.y=i.y*l+r.y*(1-l),s.z=i.z*u+r.z*(1-u);let h=t.dot(s);o=Math.min(h,o),a=Math.max(h,a)}this.min=o,this.max=a}}();G1=function(){let s=new Qi;return function(t,n){let i=t.points,r=t.satAxes,o=t.satBounds,a=n.points,c=n.satAxes,l=n.satBounds;for(let u=0;u<3;u++){let h=o[u],f=r[u];if(s.setFromPoints(f,a),h.isSeparated(s))return!1}for(let u=0;u<3;u++){let h=l[u],f=c[u];if(s.setFromPoints(f,i),h.isSeparated(s))return!1}}}()});var RE,lc,Zg,ld=Lt(()=>{xi();RE=function(){let s=new T,e=new T,t=new T;return function(i,r,o){let a=i.start,c=s,l=r.start,u=e;t.subVectors(a,l),s.subVectors(i.end,i.start),e.subVectors(r.end,r.start);let h=t.dot(u),f=u.dot(c),d=u.dot(u),g=t.dot(c),m=c.dot(c)*d-f*f,p,v;m!==0?p=(h*f-g*d)/m:p=0,v=(h+p*f)/d,o.x=p,o.y=v}}(),lc=function(){let s=new et,e=new T,t=new T;return function(i,r,o,a){RE(i,r,s);let c=s.x,l=s.y;if(c>=0&&c<=1&&l>=0&&l<=1){i.at(c,o),r.at(l,a);return}else if(c>=0&&c<=1){l<0?r.at(0,a):r.at(1,a),i.closestPointToPoint(a,!0,o);return}else if(l>=0&&l<=1){c<0?i.at(0,o):i.at(1,o),r.closestPointToPoint(o,!0,a);return}else{let u;c<0?u=i.start:u=i.end;let h;l<0?h=r.start:h=r.end;let f=e,d=t;if(i.closestPointToPoint(h,!0,e),r.closestPointToPoint(u,!0,t),f.distanceToSquared(h)<=d.distanceToSquared(u)){o.copy(f),a.copy(h);return}else{o.copy(u),a.copy(d);return}}}}(),Zg=function(){let s=new T,e=new T,t=new ss,n=new $i;return function(r,o){let{radius:a,center:c}=r,{a:l,b:u,c:h}=o;if(n.start=l,n.end=u,n.closestPointToPoint(c,!0,s).distanceTo(c)<=a||(n.start=l,n.end=h,n.closestPointToPoint(c,!0,s).distanceTo(c)<=a)||(n.start=u,n.end=h,n.closestPointToPoint(c,!0,s).distanceTo(c)<=a))return!0;let y=o.getPlane(t);if(Math.abs(y.distanceToPoint(c))<=a){let p=y.projectPoint(c,e);if(o.containsPoint(p))return!0}return!1}}()});function ud(s){return Math.abs(s)<CE}var CE,Ci,ua=Lt(()=>{xi();cd();ld();CE=1e-15;Ci=class extends Ki{constructor(...e){super(...e),this.isExtendedTriangle=!0,this.satAxes=new Array(4).fill().map(()=>new T),this.satBounds=new Array(4).fill().map(()=>new Qi),this.points=[this.a,this.b,this.c],this.sphere=new Qn,this.plane=new ss,this.needsUpdate=!0}intersectsSphere(e){return Zg(e,this)}update(){let e=this.a,t=this.b,n=this.c,i=this.points,r=this.satAxes,o=this.satBounds,a=r[0],c=o[0];this.getNormal(a),c.setFromPoints(a,i);let l=r[1],u=o[1];l.subVectors(e,t),u.setFromPoints(l,i);let h=r[2],f=o[2];h.subVectors(t,n),f.setFromPoints(h,i);let d=r[3],g=o[3];d.subVectors(n,e),g.setFromPoints(d,i),this.sphere.setFromPoints(this.points),this.plane.setFromNormalAndCoplanarPoint(a,e),this.needsUpdate=!1}};Ci.prototype.closestPointToSegment=function(){let s=new T,e=new T,t=new $i;return function(i,r=null,o=null){let{start:a,end:c}=i,l=this.points,u,h=1/0;for(let f=0;f<3;f++){let d=(f+1)%3;t.start.copy(l[f]),t.end.copy(l[d]),lc(t,i,s,e),u=s.distanceToSquared(e),u<h&&(h=u,r&&r.copy(s),o&&o.copy(e))}return this.closestPointToPoint(a,s),u=a.distanceToSquared(s),u<h&&(h=u,r&&r.copy(s),o&&o.copy(a)),this.closestPointToPoint(c,s),u=c.distanceToSquared(s),u<h&&(h=u,r&&r.copy(s),o&&o.copy(c)),Math.sqrt(h)}}();Ci.prototype.intersectsTriangle=function(){let s=new Ci,e=new Array(3),t=new Array(3),n=new Qi,i=new Qi,r=new T,o=new T,a=new T,c=new T,l=new T,u=new $i,h=new $i,f=new $i,d=new T;function g(y,m,p){let v=y.points,_=0,E=-1;for(let w=0;w<3;w++){let{start:A,end:R}=u;A.copy(v[w]),R.copy(v[(w+1)%3]),u.delta(o);let O=ud(m.distanceToPoint(A));if(ud(m.normal.dot(o))&&O){p.copy(u),_=2;break}let b=m.intersectLine(u,d);if(!b&&O&&d.copy(A),(b||O)&&!ud(d.distanceTo(R))){if(_<=1)(_===1?p.start:p.end).copy(d),O&&(E=_);else if(_>=2){(E===1?p.start:p.end).copy(d),_=2;break}if(_++,_===2&&E===-1)break}}return _}return function(m,p=null,v=!1){this.needsUpdate&&this.update(),m.isExtendedTriangle?m.needsUpdate&&m.update():(s.copy(m),s.update(),m=s);let _=this.plane,E=m.plane;if(Math.abs(_.normal.dot(E.normal))>1-1e-10){let w=this.satBounds,A=this.satAxes;t[0]=m.a,t[1]=m.b,t[2]=m.c;for(let b=0;b<4;b++){let P=w[b],V=A[b];if(n.setFromPoints(V,t),P.isSeparated(n))return!1}let R=m.satBounds,O=m.satAxes;e[0]=this.a,e[1]=this.b,e[2]=this.c;for(let b=0;b<4;b++){let P=R[b],V=O[b];if(n.setFromPoints(V,e),P.isSeparated(n))return!1}for(let b=0;b<4;b++){let P=A[b];for(let V=0;V<4;V++){let X=O[V];if(r.crossVectors(P,X),n.setFromPoints(r,e),i.setFromPoints(r,t),n.isSeparated(i))return!1}}return p&&(v||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),p.start.set(0,0,0),p.end.set(0,0,0)),!0}else{let w=g(this,E,h);if(w===1&&m.containsPoint(h.end))return p&&(p.start.copy(h.end),p.end.copy(h.end)),!0;if(w!==2)return!1;let A=g(m,_,f);if(A===1&&this.containsPoint(f.end))return p&&(p.start.copy(f.end),p.end.copy(f.end)),!0;if(A!==2)return!1;if(h.delta(a),f.delta(c),a.dot(c)<0){let se=f.start;f.start=f.end,f.end=se}let R=h.start.dot(a),O=h.end.dot(a),b=f.start.dot(a),P=f.end.dot(a),V=O<b,X=R<P;return R!==P&&b!==O&&V===X?!1:(p&&(l.subVectors(h.start,f.start),l.dot(a)>0?p.start.copy(h.start):p.start.copy(f.start),l.subVectors(h.end,f.end),l.dot(a)<0?p.end.copy(h.end):p.end.copy(f.end)),!0)}}}();Ci.prototype.distanceToPoint=function(){let s=new T;return function(t){return this.closestPointToPoint(t,s),t.distanceTo(s)}}();Ci.prototype.distanceToTriangle=function(){let s=new T,e=new T,t=["a","b","c"],n=new $i,i=new $i;return function(o,a=null,c=null){let l=a||c?n:null;if(this.intersectsTriangle(o,l))return(a||c)&&(a&&l.getCenter(a),c&&l.getCenter(c)),0;let u=1/0;for(let h=0;h<3;h++){let f,d=t[h],g=o[d];this.closestPointToPoint(g,s),f=g.distanceToSquared(s),f<u&&(u=f,a&&a.copy(s),c&&c.copy(g));let y=this[d];o.closestPointToPoint(y,s),f=y.distanceToSquared(s),f<u&&(u=f,a&&a.copy(y),c&&c.copy(s))}for(let h=0;h<3;h++){let f=t[h],d=t[(h+1)%3];n.set(this[f],this[d]);for(let g=0;g<3;g++){let y=t[g],m=t[(g+1)%3];i.set(o[y],o[m]),lc(n,i,s,e);let p=s.distanceToSquared(e);p<u&&(u=p,a&&a.copy(s),c&&c.copy(e))}}return Math.sqrt(u)}}()});var Jn,fo=Lt(()=>{xi();cd();ua();ld();Jn=class{constructor(e,t,n){this.isOrientedBox=!0,this.min=new T,this.max=new T,this.matrix=new vt,this.invMatrix=new vt,this.points=new Array(8).fill().map(()=>new T),this.satAxes=new Array(3).fill().map(()=>new T),this.satBounds=new Array(3).fill().map(()=>new Qi),this.alignedSatBounds=new Array(3).fill().map(()=>new Qi),this.needsUpdate=!1,e&&this.min.copy(e),t&&this.max.copy(t),n&&this.matrix.copy(n)}set(e,t,n){this.min.copy(e),this.max.copy(t),this.matrix.copy(n),this.needsUpdate=!0}copy(e){this.min.copy(e.min),this.max.copy(e.max),this.matrix.copy(e.matrix),this.needsUpdate=!0}};Jn.prototype.update=function(){return function(){let e=this.matrix,t=this.min,n=this.max,i=this.points;for(let l=0;l<=1;l++)for(let u=0;u<=1;u++)for(let h=0;h<=1;h++){let f=1*l|2*u|4*h,d=i[f];d.x=l?n.x:t.x,d.y=u?n.y:t.y,d.z=h?n.z:t.z,d.applyMatrix4(e)}let r=this.satBounds,o=this.satAxes,a=i[0];for(let l=0;l<3;l++){let u=o[l],h=r[l],f=1<<l,d=i[f];u.subVectors(a,d),h.setFromPoints(u,i)}let c=this.alignedSatBounds;c[0].setFromPointsField(i,"x"),c[1].setFromPointsField(i,"y"),c[2].setFromPointsField(i,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}}();Jn.prototype.intersectsBox=function(){let s=new Qi;return function(t){this.needsUpdate&&this.update();let n=t.min,i=t.max,r=this.satBounds,o=this.satAxes,a=this.alignedSatBounds;if(s.min=n.x,s.max=i.x,a[0].isSeparated(s)||(s.min=n.y,s.max=i.y,a[1].isSeparated(s))||(s.min=n.z,s.max=i.z,a[2].isSeparated(s)))return!1;for(let c=0;c<3;c++){let l=o[c],u=r[c];if(s.setFromBox(l,t),u.isSeparated(s))return!1}return!0}}();Jn.prototype.intersectsTriangle=function(){let s=new Ci,e=new Array(3),t=new Qi,n=new Qi,i=new T;return function(o){this.needsUpdate&&this.update(),o.isExtendedTriangle?o.needsUpdate&&o.update():(s.copy(o),s.update(),o=s);let a=this.satBounds,c=this.satAxes;e[0]=o.a,e[1]=o.b,e[2]=o.c;for(let f=0;f<3;f++){let d=a[f],g=c[f];if(t.setFromPoints(g,e),d.isSeparated(t))return!1}let l=o.satBounds,u=o.satAxes,h=this.points;for(let f=0;f<3;f++){let d=l[f],g=u[f];if(t.setFromPoints(g,h),d.isSeparated(t))return!1}for(let f=0;f<3;f++){let d=c[f];for(let g=0;g<4;g++){let y=u[g];if(i.crossVectors(d,y),t.setFromPoints(i,e),n.setFromPoints(i,h),t.isSeparated(n))return!1}}return!0}}();Jn.prototype.closestPointToPoint=function(){return function(e,t){return this.needsUpdate&&this.update(),t.copy(e).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),t}}();Jn.prototype.distanceToPoint=function(){let s=new T;return function(t){return this.closestPointToPoint(t,s),t.distanceTo(s)}}();Jn.prototype.distanceToBox=function(){let s=["x","y","z"],e=new Array(12).fill().map(()=>new $i),t=new Array(12).fill().map(()=>new $i),n=new T,i=new T;return function(o,a=0,c=null,l=null){if(this.needsUpdate&&this.update(),this.intersectsBox(o))return(c||l)&&(o.getCenter(i),this.closestPointToPoint(i,n),o.closestPointToPoint(n,i),c&&c.copy(n),l&&l.copy(i)),0;let u=a*a,h=o.min,f=o.max,d=this.points,g=1/0;for(let m=0;m<8;m++){let p=d[m];i.copy(p).clamp(h,f);let v=p.distanceToSquared(i);if(v<g&&(g=v,c&&c.copy(p),l&&l.copy(i),v<u))return Math.sqrt(v)}let y=0;for(let m=0;m<3;m++)for(let p=0;p<=1;p++)for(let v=0;v<=1;v++){let _=(m+1)%3,E=(m+2)%3,w=p<<_|v<<E,A=1<<m|p<<_|v<<E,R=d[w],O=d[A];e[y].set(R,O);let P=s[m],V=s[_],X=s[E],se=t[y],N=se.start,j=se.end;N[P]=h[P],N[V]=p?h[V]:f[V],N[X]=v?h[X]:f[V],j[P]=f[P],j[V]=p?h[V]:f[V],j[X]=v?h[X]:f[V],y++}for(let m=0;m<=1;m++)for(let p=0;p<=1;p++)for(let v=0;v<=1;v++){i.x=m?f.x:h.x,i.y=p?f.y:h.y,i.z=v?f.z:h.z,this.closestPointToPoint(i,n);let _=i.distanceToSquared(n);if(_<g&&(g=_,c&&c.copy(n),l&&l.copy(i),_<u))return Math.sqrt(_)}for(let m=0;m<12;m++){let p=e[m];for(let v=0;v<12;v++){let _=t[v];lc(p,_,n,i);let E=n.distanceToSquared(i);if(E<g&&(g=E,c&&c.copy(n),l&&l.copy(i),E<u))return Math.sqrt(E)}}return Math.sqrt(g)}}()});var Or,nu=Lt(()=>{Or=class{constructor(e){this._getNewPrimitive=e,this._primitives=[]}getPrimitive(){let e=this._primitives;return e.length===0?this._getNewPrimitive():e.pop()}releasePrimitive(e){this._primitives.push(e)}}});var hd,Xi,iu=Lt(()=>{ua();nu();hd=class extends Or{constructor(){super(()=>new Ci)}},Xi=new hd});var fd,bn,ar=Lt(()=>{fd=class{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;let e=[],t=null;this.setBuffer=n=>{t&&e.push(t),t=n,this.float32Array=new Float32Array(n),this.uint16Array=new Uint16Array(n),this.uint32Array=new Uint32Array(n)},this.clearBuffer=()=>{t=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,e.length!==0&&this.setBuffer(e.pop())}}},bn=new fd});function Kg(s,e,t,n,i,r){kr=su.getPrimitive(),fa=su.getPrimitive(),ha.push(kr,fa),bn.setBuffer(s._roots[e]);let o=dd(0,s.geometry,t,n,i,r);bn.clearBuffer(),su.releasePrimitive(kr),su.releasePrimitive(fa),ha.pop(),ha.pop();let a=ha.length;return a>0&&(fa=ha[a-1],kr=ha[a-2]),o}function dd(s,e,t,n,i=null,r=0,o=0){let{float32Array:a,uint16Array:c,uint32Array:l}=bn,u=s*2;if(jn(u,c)){let f=ei(s,l),d=ri(u,c);return Fn(s,a,kr),n(f,d,!1,o,r+s,kr)}else{let P=function(X){let{uint16Array:se,uint32Array:N}=bn,j=X*2;for(;!jn(j,se);)X=Ti(X),j=X*2;return ei(X,N)},V=function(X){let{uint16Array:se,uint32Array:N}=bn,j=X*2;for(;!jn(j,se);)X=wi(X,N),j=X*2;return ei(X,N)+ri(j,se)},f=Ti(s),d=wi(s,l),g=f,y=d,m,p,v,_;if(i&&(v=kr,_=fa,Fn(g,a,v),Fn(y,a,_),m=i(v),p=i(_),p<m)){g=d,y=f;let X=m;m=p,p=X,v=_}v||(v=kr,Fn(g,a,v));let E=jn(g*2,c),w=t(v,E,m,o+1,r+g),A;if(w===2){let X=P(g),N=V(g)-X;A=n(X,N,!0,o+1,r+g,v)}else A=w&&dd(g,e,t,n,i,r,o+1);if(A)return!0;_=fa,Fn(y,a,_);let R=jn(y*2,c),O=t(_,R,p,o+1,r+y),b;if(O===2){let X=P(y),N=V(y)-X;b=n(X,N,!0,o+1,r+y,_)}else b=O&&dd(y,e,t,n,i,r,o+1);return!!b}}var kr,fa,ha,su,Jg=Lt(()=>{xi();ho();nu();Os();ar();ha=[],su=new Or(()=>new sn)});function $g(s,e,t={},n=0,i=1/0){let r=n*n,o=i*i,a=1/0,c=null;if(s.shapecast({boundsTraverseOrder:u=>(uc.copy(e).clamp(u.min,u.max),uc.distanceToSquared(e)),intersectsBounds:(u,h,f)=>f<a&&f<o,intersectsTriangle:(u,h)=>{u.closestPointToPoint(e,uc);let f=e.distanceToSquared(uc);return f<a&&(md.copy(uc),a=f,c=h),f<r}}),a===1/0)return null;let l=Math.sqrt(a);return t.point?t.point.copy(md):t.point=md.clone(),t.distance=l,t.faceIndex=c,t}var uc,md,Qg=Lt(()=>{xi();uc=new T,md=new T});function LE(s,e,t,n,i,r,o,a){let c;if(r===Ui?c=s.intersectTriangle(n,t,e,!0,i):c=s.intersectTriangle(e,t,n,r!==Si,i),c===null)return null;let l=s.origin.distanceTo(i);return l<o||l>a?null:{distance:l,point:i.clone()}}function NE(s,e,t,n,i,r,o,a,c,l,u){po.fromBufferAttribute(e,r),mo.fromBufferAttribute(e,o),go.fromBufferAttribute(e,a);let h=LE(s,po,mo,go,hc,c,l,u);if(h){let f=new T;Ki.getBarycoord(hc,po,mo,go,f),n&&(ru.fromBufferAttribute(n,r),ou.fromBufferAttribute(n,o),au.fromBufferAttribute(n,a),h.uv=Ki.getInterpolation(hc,po,mo,go,ru,ou,au,new et)),i&&(ru.fromBufferAttribute(i,r),ou.fromBufferAttribute(i,o),au.fromBufferAttribute(i,a),h.uv1=Ki.getInterpolation(hc,po,mo,go,ru,ou,au,new et)),t&&(e0.fromBufferAttribute(t,r),t0.fromBufferAttribute(t,o),n0.fromBufferAttribute(t,a),h.normal=Ki.getInterpolation(hc,po,mo,go,e0,t0,n0,new T),h.normal.dot(s.direction)>0&&h.normal.multiplyScalar(-1));let d={a:r,b:o,c:a,normal:new T,materialIndex:0};Ki.getNormal(po,mo,go,d.normal),h.face=d,h.faceIndex=r,IE&&(h.barycoord=f)}return h}function da(s,e,t,n,i,r,o){let a=n*3,c=a+0,l=a+1,u=a+2,h=s.index;s.index&&(c=h.getX(c),l=h.getX(l),u=h.getX(u));let{position:f,normal:d,uv:g,uv1:y}=s.attributes,m=NE(t,f,d,g,y,c,l,u,e,r,o);return m?(m.faceIndex=n,i&&i.push(m),m):null}var IE,po,mo,go,ru,ou,au,e0,t0,n0,hc,gd=Lt(()=>{xi();IE=parseInt(co)>=169,po=new T,mo=new T,go=new T,ru=new et,ou=new et,au=new et,e0=new T,t0=new T,n0=new T,hc=new T});function Bn(s,e,t,n){let i=s.a,r=s.b,o=s.c,a=e,c=e+1,l=e+2;t&&(a=t.getX(a),c=t.getX(c),l=t.getX(l)),i.x=n.getX(a),i.y=n.getY(a),i.z=n.getZ(a),r.x=n.getX(c),r.y=n.getY(c),r.z=n.getZ(c),o.x=n.getX(l),o.y=n.getY(l),o.z=n.getZ(l)}var zr=Lt(()=>{});function i0(s,e,t,n,i,r,o,a){let{geometry:c,_indirectBuffer:l}=s;for(let u=n,h=n+i;u<h;u++)da(c,e,t,u,r,o,a)}function s0(s,e,t,n,i,r,o){let{geometry:a,_indirectBuffer:c}=s,l=1/0,u=null;for(let h=n,f=n+i;h<f;h++){let d;d=da(a,e,t,h,null,r,o),d&&d.distance<l&&(u=d,l=d.distance)}return u}function r0(s,e,t,n,i,r,o){let{geometry:a}=t,{index:c}=a,l=a.attributes.position;for(let u=s,h=e+s;u<h;u++){let f;if(f=u,Bn(o,f*3,c,l),o.needsUpdate=!0,n(o,f,i,r))return!0}return!1}var cu=Lt(()=>{gd();zr()});function o0(s,e=null){e&&Array.isArray(e)&&(e=new Set(e));let t=s.geometry,n=t.index?t.index.array:null,i=t.attributes.position,r,o,a,c,l=0,u=s._roots;for(let f=0,d=u.length;f<d;f++)r=u[f],o=new Uint32Array(r),a=new Uint16Array(r),c=new Float32Array(r),h(0,l),l+=r.byteLength;function h(f,d,g=!1){let y=f*2;if(a[y+15]===65535){let p=o[f+6],v=a[y+14],_=1/0,E=1/0,w=1/0,A=-1/0,R=-1/0,O=-1/0;for(let b=3*p,P=3*(p+v);b<P;b++){let V=n[b],X=i.getX(V),se=i.getY(V),N=i.getZ(V);X<_&&(_=X),X>A&&(A=X),se<E&&(E=se),se>R&&(R=se),N<w&&(w=N),N>O&&(O=N)}return c[f+0]!==_||c[f+1]!==E||c[f+2]!==w||c[f+3]!==A||c[f+4]!==R||c[f+5]!==O?(c[f+0]=_,c[f+1]=E,c[f+2]=w,c[f+3]=A,c[f+4]=R,c[f+5]=O,!0):!1}else{let p=f+8,v=o[f+6],_=p+d,E=v+d,w=g,A=!1,R=!1;e?w||(A=e.has(_),R=e.has(E),w=!A&&!R):(A=!0,R=!0);let O=w||A,b=w||R,P=!1;O&&(P=h(p,d,w));let V=!1;b&&(V=h(v,d,w));let X=P||V;if(X)for(let se=0;se<3;se++){let N=p+se,j=v+se,B=c[N],ye=c[N+3],be=c[j],ee=c[j+3];c[f+se]=B<be?B:be,c[f+se+3]=ye>ee?ye:ee}return X}}}var a0=Lt(()=>{});function xs(s,e,t,n,i){let r,o,a,c,l,u,h=1/t.direction.x,f=1/t.direction.y,d=1/t.direction.z,g=t.origin.x,y=t.origin.y,m=t.origin.z,p=e[s],v=e[s+3],_=e[s+1],E=e[s+3+1],w=e[s+2],A=e[s+3+2];return h>=0?(r=(p-g)*h,o=(v-g)*h):(r=(v-g)*h,o=(p-g)*h),f>=0?(a=(_-y)*f,c=(E-y)*f):(a=(E-y)*f,c=(_-y)*f),r>c||a>o||((a>r||isNaN(r))&&(r=a),(c<o||isNaN(o))&&(o=c),d>=0?(l=(w-m)*d,u=(A-m)*d):(l=(A-m)*d,u=(w-m)*d),r>u||l>o)?!1:((l>r||r!==r)&&(r=l),(u<o||o!==o)&&(o=u),r<=i&&o>=n)}var fc=Lt(()=>{});function c0(s,e,t,n,i,r,o,a){let{geometry:c,_indirectBuffer:l}=s;for(let u=n,h=n+i;u<h;u++){let f=l?l[u]:u;da(c,e,t,f,r,o,a)}}function l0(s,e,t,n,i,r,o){let{geometry:a,_indirectBuffer:c}=s,l=1/0,u=null;for(let h=n,f=n+i;h<f;h++){let d;d=da(a,e,t,c?c[h]:h,null,r,o),d&&d.distance<l&&(u=d,l=d.distance)}return u}function u0(s,e,t,n,i,r,o){let{geometry:a}=t,{index:c}=a,l=a.attributes.position;for(let u=s,h=e+s;u<h;u++){let f;if(f=t.resolveTriangleIndex(u),Bn(o,f*3,c,l),o.needsUpdate=!0,n(o,f,i,r))return!0}return!1}var lu=Lt(()=>{gd();zr()});function h0(s,e,t,n,i,r,o){bn.setBuffer(s._roots[e]),xd(0,s,t,n,i,r,o),bn.clearBuffer()}function xd(s,e,t,n,i,r,o){let{float32Array:a,uint16Array:c,uint32Array:l}=bn,u=s*2;if(jn(u,c)){let f=ei(s,l),d=ri(u,c);i0(e,t,n,f,d,i,r,o)}else{let f=Ti(s);xs(f,a,n,r,o)&&xd(f,e,t,n,i,r,o);let d=wi(s,l);xs(d,a,n,r,o)&&xd(d,e,t,n,i,r,o)}}var f0=Lt(()=>{fc();Os();ar();cu()});function d0(s,e,t,n,i,r){bn.setBuffer(s._roots[e]);let o=yd(0,s,t,n,i,r);return bn.clearBuffer(),o}function yd(s,e,t,n,i,r){let{float32Array:o,uint16Array:a,uint32Array:c}=bn,l=s*2;if(jn(l,a)){let h=ei(s,c),f=ri(l,a);return s0(e,t,n,h,f,i,r)}else{let h=$l(s,c),f=DE[h],g=n.direction[f]>=0,y,m;g?(y=Ti(s),m=wi(s,c)):(y=wi(s,c),m=Ti(s));let v=xs(y,o,n,i,r)?yd(y,e,t,n,i,r):null;if(v){let w=v.point[f];if(g?w<=o[m+h]:w>=o[m+h+3])return v}let E=xs(m,o,n,i,r)?yd(m,e,t,n,i,r):null;return v&&E?v.distance<=E.distance?v:E:v||E||null}}var DE,p0=Lt(()=>{Os();ar();fc();cu();DE=["x","y","z"]});function g0(s,e,t,n){bn.setBuffer(s._roots[e]);let i=_d(0,s,t,n);return bn.clearBuffer(),i}function _d(s,e,t,n,i=null){let{float32Array:r,uint16Array:o,uint32Array:a}=bn,c=s*2;if(i===null&&(t.boundingBox||t.computeBoundingBox(),m0.set(t.boundingBox.min,t.boundingBox.max,n),i=m0),jn(c,o)){let u=e.geometry,h=u.index,f=u.attributes.position,d=t.index,g=t.attributes.position,y=ei(s,a),m=ri(c,o);if(dc.copy(n).invert(),t.boundsTree)return Fn(s,r,hu),hu.matrix.copy(dc),hu.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:v=>hu.intersectsBox(v),intersectsTriangle:v=>{v.a.applyMatrix4(n),v.b.applyMatrix4(n),v.c.applyMatrix4(n),v.needsUpdate=!0;for(let _=y*3,E=(m+y)*3;_<E;_+=3)if(Bn(ma,_,h,f),ma.needsUpdate=!0,v.intersectsTriangle(ma))return!0;return!1}});for(let p=y*3,v=(m+y)*3;p<v;p+=3){Bn(pa,p,h,f),pa.a.applyMatrix4(dc),pa.b.applyMatrix4(dc),pa.c.applyMatrix4(dc),pa.needsUpdate=!0;for(let _=0,E=d.count;_<E;_+=3)if(Bn(ma,_,d,g),ma.needsUpdate=!0,pa.intersectsTriangle(ma))return!0}}else{let u=s+8,h=a[s+6];return Fn(u,r,uu),!!(i.intersectsBox(uu)&&_d(u,e,t,n,i)||(Fn(h,r,uu),i.intersectsBox(uu)&&_d(h,e,t,n,i)))}}var uu,pa,ma,dc,m0,hu,x0=Lt(()=>{xi();fo();ua();zr();ho();Os();ar();uu=new sn,pa=new Ci,ma=new Ci,dc=new vt,m0=new Jn,hu=new Jn});function y0(s,e,t,n={},i={},r=0,o=1/0){e.boundingBox||e.computeBoundingBox(),vd.set(e.boundingBox.min,e.boundingBox.max,t),vd.needsUpdate=!0;let a=s.geometry,c=a.attributes.position,l=a.index,u=e.attributes.position,h=e.index,f=Xi.getPrimitive(),d=Xi.getPrimitive(),g=UE,y=FE,m=null,p=null;i&&(m=BE,p=OE);let v=1/0,_=null,E=null;return fu.copy(t).invert(),pc.matrix.copy(fu),s.shapecast({boundsTraverseOrder:w=>vd.distanceToBox(w),intersectsBounds:(w,A,R)=>R<v&&R<o?(A&&(pc.min.copy(w.min),pc.max.copy(w.max),pc.needsUpdate=!0),!0):!1,intersectsRange:(w,A)=>{if(e.boundsTree)return e.boundsTree.shapecast({boundsTraverseOrder:O=>pc.distanceToBox(O),intersectsBounds:(O,b,P)=>P<v&&P<o,intersectsRange:(O,b)=>{for(let P=O,V=O+b;P<V;P++){Bn(d,3*P,h,u),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let X=w,se=w+A;X<se;X++){Bn(f,3*X,l,c),f.needsUpdate=!0;let N=f.distanceToTriangle(d,g,m);if(N<v&&(y.copy(g),p&&p.copy(m),v=N,_=X,E=P),N<r)return!0}}}});{let R=Bs(e);for(let O=0,b=R;O<b;O++){Bn(d,3*O,h,u),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let P=w,V=w+A;P<V;P++){Bn(f,3*P,l,c),f.needsUpdate=!0;let X=f.distanceToTriangle(d,g,m);if(X<v&&(y.copy(g),p&&p.copy(m),v=X,_=P,E=O),X<r)return!0}}}}}),Xi.releasePrimitive(f),Xi.releasePrimitive(d),v===1/0?null:(n.point?n.point.copy(y):n.point=y.clone(),n.distance=v,n.faceIndex=_,i&&(i.point?i.point.copy(p):i.point=p.clone(),i.point.applyMatrix4(fu),y.applyMatrix4(fu),i.distance=y.sub(i.point).length(),i.faceIndex=E),n)}var fu,vd,pc,UE,FE,BE,OE,_0=Lt(()=>{xi();fo();zr();rc();iu();fu=new vt,vd=new Jn,pc=new Jn,UE=new T,FE=new T,BE=new T,OE=new T});function v0(s,e=null){e&&Array.isArray(e)&&(e=new Set(e));let t=s.geometry,n=t.index?t.index.array:null,i=t.attributes.position,r,o,a,c,l=0,u=s._roots;for(let f=0,d=u.length;f<d;f++)r=u[f],o=new Uint32Array(r),a=new Uint16Array(r),c=new Float32Array(r),h(0,l),l+=r.byteLength;function h(f,d,g=!1){let y=f*2;if(a[y+15]===65535){let p=o[f+6],v=a[y+14],_=1/0,E=1/0,w=1/0,A=-1/0,R=-1/0,O=-1/0;for(let b=p,P=p+v;b<P;b++){let V=3*s.resolveTriangleIndex(b);for(let X=0;X<3;X++){let se=V+X;se=n?n[se]:se;let N=i.getX(se),j=i.getY(se),B=i.getZ(se);N<_&&(_=N),N>A&&(A=N),j<E&&(E=j),j>R&&(R=j),B<w&&(w=B),B>O&&(O=B)}}return c[f+0]!==_||c[f+1]!==E||c[f+2]!==w||c[f+3]!==A||c[f+4]!==R||c[f+5]!==O?(c[f+0]=_,c[f+1]=E,c[f+2]=w,c[f+3]=A,c[f+4]=R,c[f+5]=O,!0):!1}else{let p=f+8,v=o[f+6],_=p+d,E=v+d,w=g,A=!1,R=!1;e?w||(A=e.has(_),R=e.has(E),w=!A&&!R):(A=!0,R=!0);let O=w||A,b=w||R,P=!1;O&&(P=h(p,d,w));let V=!1;b&&(V=h(v,d,w));let X=P||V;if(X)for(let se=0;se<3;se++){let N=p+se,j=v+se,B=c[N],ye=c[N+3],be=c[j],ee=c[j+3];c[f+se]=B<be?B:be,c[f+se+3]=ye>ee?ye:ee}return X}}}var b0=Lt(()=>{});function M0(s,e,t,n,i,r,o){bn.setBuffer(s._roots[e]),bd(0,s,t,n,i,r,o),bn.clearBuffer()}function bd(s,e,t,n,i,r,o){let{float32Array:a,uint16Array:c,uint32Array:l}=bn,u=s*2;if(jn(u,c)){let f=ei(s,l),d=ri(u,c);c0(e,t,n,f,d,i,r,o)}else{let f=Ti(s);xs(f,a,n,r,o)&&bd(f,e,t,n,i,r,o);let d=wi(s,l);xs(d,a,n,r,o)&&bd(d,e,t,n,i,r,o)}}var S0=Lt(()=>{fc();Os();ar();lu()});function E0(s,e,t,n,i,r){bn.setBuffer(s._roots[e]);let o=Md(0,s,t,n,i,r);return bn.clearBuffer(),o}function Md(s,e,t,n,i,r){let{float32Array:o,uint16Array:a,uint32Array:c}=bn,l=s*2;if(jn(l,a)){let h=ei(s,c),f=ri(l,a);return l0(e,t,n,h,f,i,r)}else{let h=$l(s,c),f=kE[h],g=n.direction[f]>=0,y,m;g?(y=Ti(s),m=wi(s,c)):(y=wi(s,c),m=Ti(s));let v=xs(y,o,n,i,r)?Md(y,e,t,n,i,r):null;if(v){let w=v.point[f];if(g?w<=o[m+h]:w>=o[m+h+3])return v}let E=xs(m,o,n,i,r)?Md(m,e,t,n,i,r):null;return v&&E?v.distance<=E.distance?v:E:v||E||null}}var kE,T0=Lt(()=>{Os();ar();fc();lu();kE=["x","y","z"]});function A0(s,e,t,n){bn.setBuffer(s._roots[e]);let i=Sd(0,s,t,n);return bn.clearBuffer(),i}function Sd(s,e,t,n,i=null){let{float32Array:r,uint16Array:o,uint32Array:a}=bn,c=s*2;if(i===null&&(t.boundingBox||t.computeBoundingBox(),w0.set(t.boundingBox.min,t.boundingBox.max,n),i=w0),jn(c,o)){let u=e.geometry,h=u.index,f=u.attributes.position,d=t.index,g=t.attributes.position,y=ei(s,a),m=ri(c,o);if(mc.copy(n).invert(),t.boundsTree)return Fn(s,r,pu),pu.matrix.copy(mc),pu.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:v=>pu.intersectsBox(v),intersectsTriangle:v=>{v.a.applyMatrix4(n),v.b.applyMatrix4(n),v.c.applyMatrix4(n),v.needsUpdate=!0;for(let _=y,E=m+y;_<E;_++)if(Bn(xa,3*e.resolveTriangleIndex(_),h,f),xa.needsUpdate=!0,v.intersectsTriangle(xa))return!0;return!1}});for(let p=y,v=m+y;p<v;p++){let _=e.resolveTriangleIndex(p);Bn(ga,3*_,h,f),ga.a.applyMatrix4(mc),ga.b.applyMatrix4(mc),ga.c.applyMatrix4(mc),ga.needsUpdate=!0;for(let E=0,w=d.count;E<w;E+=3)if(Bn(xa,E,d,g),xa.needsUpdate=!0,ga.intersectsTriangle(xa))return!0}}else{let u=s+8,h=a[s+6];return Fn(u,r,du),!!(i.intersectsBox(du)&&Sd(u,e,t,n,i)||(Fn(h,r,du),i.intersectsBox(du)&&Sd(h,e,t,n,i)))}}var du,ga,xa,mc,w0,pu,R0=Lt(()=>{xi();fo();ua();zr();ho();Os();ar();du=new sn,ga=new Ci,xa=new Ci,mc=new vt,w0=new Jn,pu=new Jn});function C0(s,e,t,n={},i={},r=0,o=1/0){e.boundingBox||e.computeBoundingBox(),Ed.set(e.boundingBox.min,e.boundingBox.max,t),Ed.needsUpdate=!0;let a=s.geometry,c=a.attributes.position,l=a.index,u=e.attributes.position,h=e.index,f=Xi.getPrimitive(),d=Xi.getPrimitive(),g=zE,y=HE,m=null,p=null;i&&(m=VE,p=GE);let v=1/0,_=null,E=null;return mu.copy(t).invert(),gc.matrix.copy(mu),s.shapecast({boundsTraverseOrder:w=>Ed.distanceToBox(w),intersectsBounds:(w,A,R)=>R<v&&R<o?(A&&(gc.min.copy(w.min),gc.max.copy(w.max),gc.needsUpdate=!0),!0):!1,intersectsRange:(w,A)=>{if(e.boundsTree){let R=e.boundsTree;return R.shapecast({boundsTraverseOrder:O=>gc.distanceToBox(O),intersectsBounds:(O,b,P)=>P<v&&P<o,intersectsRange:(O,b)=>{for(let P=O,V=O+b;P<V;P++){let X=R.resolveTriangleIndex(P);Bn(d,3*X,h,u),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let se=w,N=w+A;se<N;se++){let j=s.resolveTriangleIndex(se);Bn(f,3*j,l,c),f.needsUpdate=!0;let B=f.distanceToTriangle(d,g,m);if(B<v&&(y.copy(g),p&&p.copy(m),v=B,_=se,E=P),B<r)return!0}}}})}else{let R=Bs(e);for(let O=0,b=R;O<b;O++){Bn(d,3*O,h,u),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let P=w,V=w+A;P<V;P++){let X=s.resolveTriangleIndex(P);Bn(f,3*X,l,c),f.needsUpdate=!0;let se=f.distanceToTriangle(d,g,m);if(se<v&&(y.copy(g),p&&p.copy(m),v=se,_=P,E=O),se<r)return!0}}}}}),Xi.releasePrimitive(f),Xi.releasePrimitive(d),v===1/0?null:(n.point?n.point.copy(y):n.point=y.clone(),n.distance=v,n.faceIndex=_,i&&(i.point?i.point.copy(p):i.point=p.clone(),i.point.applyMatrix4(mu),y.applyMatrix4(mu),i.distance=y.sub(i.point).length(),i.faceIndex=E),n)}var mu,Ed,gc,zE,HE,VE,GE,P0=Lt(()=>{xi();fo();zr();rc();iu();mu=new vt,Ed=new Jn,gc=new Jn,zE=new T,HE=new T,VE=new T,GE=new T});function I0(){return typeof SharedArrayBuffer!="undefined"}var L0=Lt(()=>{});function N0(s,e,t,n){if(Ad)throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");Ad=!0;let i=s._roots,r=e._roots,o,a=0,c=0,l=new vt().copy(t).invert();for(let u=0,h=i.length;u<h;u++){xc.setBuffer(i[u]),c=0;let f=Hr.getPrimitive();Fn(0,xc.float32Array,f),f.applyMatrix4(l);for(let d=0,g=r.length;d<g&&(gu.setBuffer(r[d]),o=ws(0,0,t,l,n,a,c,0,0,f),gu.clearBuffer(),c+=r[d].length,!o);d++);if(Hr.releasePrimitive(f),xc.clearBuffer(),a+=i[u].length,o)break}return Ad=!1,o}function ws(s,e,t,n,i,r=0,o=0,a=0,c=0,l=null,u=!1){let h,f;u?(h=gu,f=xc):(h=xc,f=gu);let d=h.float32Array,g=h.uint32Array,y=h.uint16Array,m=f.float32Array,p=f.uint32Array,v=f.uint16Array,_=s*2,E=e*2,w=jn(_,y),A=jn(E,v),R=!1;if(A&&w)u?R=i(ei(e,p),ri(e*2,v),ei(s,g),ri(s*2,y),c,o+e,a,r+s):R=i(ei(s,g),ri(s*2,y),ei(e,p),ri(e*2,v),a,r+s,c,o+e);else if(A){let O=Hr.getPrimitive();Fn(e,m,O),O.applyMatrix4(t);let b=Ti(s),P=wi(s,g);Fn(b,d,ya),Fn(P,d,_a);let V=O.intersectsBox(ya),X=O.intersectsBox(_a);R=V&&ws(e,b,n,t,i,o,r,c,a+1,O,!u)||X&&ws(e,P,n,t,i,o,r,c,a+1,O,!u),Hr.releasePrimitive(O)}else{let O=Ti(e),b=wi(e,p);Fn(O,m,Td),Fn(b,m,wd);let P=l.intersectsBox(Td),V=l.intersectsBox(wd);if(P&&V)R=ws(s,O,t,n,i,r,o,a,c+1,l,u)||ws(s,b,t,n,i,r,o,a,c+1,l,u);else if(P)if(w)R=ws(s,O,t,n,i,r,o,a,c+1,l,u);else{let X=Hr.getPrimitive();X.copy(Td).applyMatrix4(t);let se=Ti(s),N=wi(s,g);Fn(se,d,ya),Fn(N,d,_a);let j=X.intersectsBox(ya),B=X.intersectsBox(_a);R=j&&ws(O,se,n,t,i,o,r,c,a+1,X,!u)||B&&ws(O,N,n,t,i,o,r,c,a+1,X,!u),Hr.releasePrimitive(X)}else if(V)if(w)R=ws(s,b,t,n,i,r,o,a,c+1,l,u);else{let X=Hr.getPrimitive();X.copy(wd).applyMatrix4(t);let se=Ti(s),N=wi(s,g);Fn(se,d,ya),Fn(N,d,_a);let j=X.intersectsBox(ya),B=X.intersectsBox(_a);R=j&&ws(b,se,n,t,i,o,r,c,a+1,X,!u)||B&&ws(b,N,n,t,i,o,r,c,a+1,X,!u),Hr.releasePrimitive(X)}}return R}var xc,gu,Hr,ya,_a,Td,wd,Ad,D0=Lt(()=>{xi();ar();Os();ho();nu();xc=new bn.constructor,gu=new bn.constructor,Hr=new Or(()=>new sn),ya=new sn,_a=new sn,Td=new sn,wd=new sn,Ad=!1});var xu,U0,WE,yu,F0=Lt(()=>{xi();td();jg();fo();ho();iu();Jg();Qg();cu();a0();f0();p0();x0();_0();lu();b0();S0();T0();R0();P0();L0();zr();D0();xu=new Jn,U0=new sn,WE={strategy:0,maxDepth:40,maxLeafTris:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null},yu=class s{static serialize(e,t={}){t={cloneBuffers:!0,...t};let n=e.geometry,i=e._roots,r=e._indirectBuffer,o=n.getIndex(),a;return t.cloneBuffers?a={roots:i.map(c=>c.slice()),index:o?o.array.slice():null,indirectBuffer:r?r.slice():null}:a={roots:i,index:o?o.array:null,indirectBuffer:r},a}static deserialize(e,t,n={}){n={setIndex:!0,indirect:!!e.indirectBuffer,...n};let{index:i,roots:r,indirectBuffer:o}=e,a=new s(t,{...n,[Zl]:!0});if(a._roots=r,a._indirectBuffer=o||null,n.setIndex){let c=t.getIndex();if(c===null){let l=new An(e.index,1,!1);t.setIndex(l)}else c.array!==i&&(c.array.set(i),c.needsUpdate=!0)}return a}get indirect(){return!!this._indirectBuffer}constructor(e,t={}){if(e.isBufferGeometry){if(e.index&&e.index.isInterleavedBufferAttribute)throw new Error("MeshBVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw new Error("MeshBVH: Only BufferGeometries are supported.");if(t=Object.assign({...WE,[Zl]:!1},t),t.useSharedArrayBuffer&&!I0())throw new Error("MeshBVH: SharedArrayBuffer is not available.");this.geometry=e,this._roots=null,this._indirectBuffer=null,t[Zl]||(Yg(this,t),!e.boundingBox&&t.setBoundingBox&&(e.boundingBox=this.getBoundingBox(new sn))),this.resolveTriangleIndex=t.indirect?n=>this._indirectBuffer[n]:n=>n}refit(e=null){return(this.indirect?v0:o0)(this,e)}traverse(e,t=0){let n=this._roots[t],i=new Uint32Array(n),r=new Uint16Array(n);o(0);function o(a,c=0){let l=a*2,u=r[l+15]===65535;if(u){let h=i[a+6],f=r[l+14];e(c,u,new Float32Array(n,a*4,6),h,f)}else{let h=a+32/4,f=i[a+6],d=i[a+7];e(c,u,new Float32Array(n,a*4,6),d)||(o(h,c+1),o(f,c+1))}}}raycast(e,t=Vi,n=0,i=1/0){let r=this._roots,o=this.geometry,a=[],c=t.isMaterial,l=Array.isArray(t),u=o.groups,h=c?t.side:t,f=this.indirect?M0:h0;for(let d=0,g=r.length;d<g;d++){let y=l?t[u[d].materialIndex].side:h,m=a.length;if(f(this,d,y,e,a,n,i),l){let p=u[d].materialIndex;for(let v=m,_=a.length;v<_;v++)a[v].face.materialIndex=p}}return a}raycastFirst(e,t=Vi,n=0,i=1/0){let r=this._roots,o=this.geometry,a=t.isMaterial,c=Array.isArray(t),l=null,u=o.groups,h=a?t.side:t,f=this.indirect?E0:d0;for(let d=0,g=r.length;d<g;d++){let y=c?t[u[d].materialIndex].side:h,m=f(this,d,y,e,n,i);m!=null&&(l==null||m.distance<l.distance)&&(l=m,c&&(m.face.materialIndex=u[d].materialIndex))}return l}intersectsGeometry(e,t){let n=!1,i=this._roots,r=this.indirect?A0:g0;for(let o=0,a=i.length;o<a&&(n=r(this,o,e,t),!n);o++);return n}shapecast(e){let t=Xi.getPrimitive(),n=this.indirect?u0:r0,{boundsTraverseOrder:i,intersectsBounds:r,intersectsRange:o,intersectsTriangle:a}=e;if(o&&a){let h=o;o=(f,d,g,y,m)=>h(f,d,g,y,m)?!0:n(f,d,this,a,g,y,t)}else o||(a?o=(h,f,d,g)=>n(h,f,this,a,d,g,t):o=(h,f,d)=>d);let c=!1,l=0,u=this._roots;for(let h=0,f=u.length;h<f;h++){let d=u[h];if(c=Kg(this,h,r,o,i,l),c)break;l+=d.byteLength}return Xi.releasePrimitive(t),c}bvhcast(e,t,n){let{intersectsRanges:i,intersectsTriangles:r}=n,o=Xi.getPrimitive(),a=this.geometry.index,c=this.geometry.attributes.position,l=this.indirect?g=>{let y=this.resolveTriangleIndex(g);Bn(o,y*3,a,c)}:g=>{Bn(o,g*3,a,c)},u=Xi.getPrimitive(),h=e.geometry.index,f=e.geometry.attributes.position,d=e.indirect?g=>{let y=e.resolveTriangleIndex(g);Bn(u,y*3,h,f)}:g=>{Bn(u,g*3,h,f)};if(r){let g=(y,m,p,v,_,E,w,A)=>{for(let R=p,O=p+v;R<O;R++){d(R),u.a.applyMatrix4(t),u.b.applyMatrix4(t),u.c.applyMatrix4(t),u.needsUpdate=!0;for(let b=y,P=y+m;b<P;b++)if(l(b),o.needsUpdate=!0,r(o,u,b,R,_,E,w,A))return!0}return!1};if(i){let y=i;i=function(m,p,v,_,E,w,A,R){return y(m,p,v,_,E,w,A,R)?!0:g(m,p,v,_,E,w,A,R)}}else i=g}return N0(this,e,t,i)}intersectsBox(e,t){return xu.set(e.min,e.max,t),xu.needsUpdate=!0,this.shapecast({intersectsBounds:n=>xu.intersectsBox(n),intersectsTriangle:n=>xu.intersectsTriangle(n)})}intersectsSphere(e){return this.shapecast({intersectsBounds:t=>e.intersectsBox(t),intersectsTriangle:t=>t.intersectsSphere(e)})}closestPointToGeometry(e,t,n={},i={},r=0,o=1/0){return(this.indirect?C0:y0)(this,e,t,n,i,r,o)}closestPointToPoint(e,t={},n=0,i=1/0){return $g(this,e,t,n,i)}getBoundingBox(e){return e.makeEmpty(),this._roots.forEach(n=>{Fn(0,new Float32Array(n),U0),e.union(U0)}),e}}});function Rd(s,e,t){return s===null?null:(s.point.applyMatrix4(e.matrixWorld),s.distance=s.point.distanceTo(t.ray.origin),s.object=e,s)}var B0=Lt(()=>{});function H0(s,e){this.isBatchedMesh?YE.call(this,s,e):jE.call(this,s,e)}function YE(s,e){if(this.boundsTrees){let t=this.boundsTrees,n=this._drawInfo||this._instanceInfo,i=this._drawRanges||this._geometryInfo,r=this.matrixWorld;Pi.material=this.material,Pi.geometry=this.geometry;let o=Pi.geometry.boundsTree,a=Pi.geometry.drawRange;Pi.geometry.boundingSphere===null&&(Pi.geometry.boundingSphere=new Qn);for(let c=0,l=n.length;c<l;c++){if(!this.getVisibleAt(c))continue;let u=n[c].geometryIndex;if(Pi.geometry.boundsTree=t[u],this.getMatrixAt(c,Pi.matrixWorld).premultiply(r),!Pi.geometry.boundsTree){this.getBoundingBoxAt(u,Pi.geometry.boundingBox),this.getBoundingSphereAt(u,Pi.geometry.boundingSphere);let h=i[u];Pi.geometry.setDrawRange(h.start,h.count)}Pi.raycast(s,vu);for(let h=0,f=vu.length;h<f;h++){let d=vu[h];d.object=this,d.batchId=c,e.push(d)}vu.length=0}Pi.geometry.boundsTree=o,Pi.geometry.drawRange=a,Pi.material=null,Pi.geometry=null}else qE.call(this,s,e)}function jE(s,e){if(this.geometry.boundsTree){if(this.material===void 0)return;k0.copy(this.matrixWorld).invert(),_u.copy(s.ray).applyMatrix4(k0),z0.setFromMatrixScale(this.matrixWorld),O0.copy(_u.direction).multiply(z0);let t=O0.length(),n=s.near/t,i=s.far/t,r=this.geometry.boundsTree;if(s.firstHitOnly===!0){let o=Rd(r.raycastFirst(_u,this.material,n,i),this,s);o&&e.push(o)}else{let o=r.raycast(_u,this.material,n,i);for(let a=0,c=o.length;a<c;a++){let l=Rd(o[a],this,s);l&&e.push(l)}}}else XE.call(this,s,e)}function V0(s={}){return this.boundsTree=new yu(this,s),this.boundsTree}var nA,_u,O0,k0,XE,qE,z0,Pi,vu,G0=Lt(()=>{xi();B0();F0();nA=parseInt(co)>=166,_u=new nr,O0=new T,k0=new vt,XE=Tn.prototype.raycast,qE=El.prototype.raycast,z0=new T,Pi=new Tn,vu=[]});var W0=Lt(()=>{});var X0=Lt(()=>{});var q0=Lt(()=>{});var Y0,j0=Lt(()=>{Y0=`

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
`});var Z0=Lt(()=>{});var K0,J0=Lt(()=>{K0=`

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
`});var $0=Lt(()=>{});var Q0=Lt(()=>{j0();Z0();J0();$0()});var xA,ex=Lt(()=>{G0();ua();fo();X0();W0();q0();Q0();xA=`
	${Y0}
	${K0}
`});var i1=rp(()=>{var TA=Ix(op());xi();bg();Rg();ex();Ei.prototype.computeBoundsTree=V0;Tn.prototype.raycast=H0;var KE=.09,JE=.2,tx={bone:15327174,muscle:11028287,nerve:15779137,vessel:14886444,vein:3107839,ligament:12831958,capsule:11120051},nx=3524863,bu=3725690,$E=16732240,QE=16749350,e1=11824127,ix={hip:[.62,1.12],gluteal:[.62,1.12],thigh:[.36,1],knee:[.3,.6],leg:[0,.5],foot:[-.02,.14],limb:[-.05,1.12],shoulder:[1.15,1.5],plexus:[1.2,1.53],arm:[1,1.45],elbow:[.95,1.2],forearm:[.66,1.15],wrist:[.66,.95],hand:[.64,.92],"upper limb":[.66,1.5]},Cd={model:"_jk3d_trunk7.glb",planes:["coronal","axial","sagittal"]},sx={anterior:[0,0,1],posterior:[0,0,-1],lateral:[-1,0,0],medial:[1,0,0],superior:[0,1,.001],inferior:[0,-1,.001]},Pd={};function Id(s){return Pd[s]||(Pd[s]=new Promise((e,t)=>{fetch(s).then(n=>{if(!n.ok)throw n.status;return n.arrayBuffer()}).then(n=>new Yl().parse(n,"",i=>e(i.scene),t)).catch(t)})),Pd[s]}var _c=null,t1=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]].map(s=>new T(...s));function rx(s){return Math.abs(s.y)>.92?new T(0,0,s.y>0?-1:1):new T(0,1,0)}var Ld=class{constructor(e,t){this.cam=e,this.el=t,this.target=new T,this.autoRotate=!1,this.autoRotateSpeed=1.2,this.vx=0,this.vy=0,this.drag=null,this.ls=[],this.snapOn=!0,this.turntable=!1,this.ball=(i,r)=>{let o=t.getBoundingClientRect(),a=.38*Math.min(o.width,o.height),c=(i-o.left-o.width/2)/a,l=-(r-o.top-o.height/2)/a,u=c*c+l*l;if(u>=1)return new T(c,l,0).normalize();let h=Math.sqrt(1-u);return new T(c,l,h).normalize()},t.addEventListener("pointerdown",i=>{if(!(i.button!==0||i.shiftKey)){this.drag={t:performance.now(),x:i.clientX,y:i.clientY},this.spin=null,this.vo=null;try{t.setPointerCapture(i.pointerId)}catch{}}}),t.addEventListener("pointermove",i=>{if(!this.drag||this.multi)return;if(this.turntable){let l=performance.now(),u=Math.max(1,l-this.drag.t),h=-(i.clientX-this.drag.x)*.008;this.turn(new T(0,1,0),h),this.spin={axis:new T(0,1,0),w:h/u*16},this.drag.x=i.clientX,this.drag.t=l;return}let r=performance.now(),o=Math.max(1,r-this.drag.t),a=i.clientX-this.drag.x,c=i.clientY-(this.drag.y==null?i.clientY:this.drag.y);this.drag.x=i.clientX,this.drag.y=i.clientY,this.drag.t=r,this.orbit(a*.008,c*.008),this.vo=[a*.008/o*16,c*.008/o*16]});let n=()=>{this.drag&&performance.now()-this.drag.t>80&&(this.spin=null,this.vo=null),this.drag=null};t.addEventListener("pointerup",n),t.addEventListener("pointercancel",n)}addEventListener(e,t){e==="change"&&this.ls.push(t)}emit(){this.ls.forEach(e=>e())}orbit(e,t){let n=this.cam.position.clone().sub(this.target),i=n.length(),r=Math.atan2(n.x,n.z)-e,o=Math.asin(Math.max(-1,Math.min(1,n.y/i)));this.turntable?o=0:o=Math.max(-1.45,Math.min(1.45,o+t)),n.set(Math.sin(r)*Math.cos(o),Math.sin(o),Math.cos(r)*Math.cos(o)).multiplyScalar(i),this.cam.position.copy(this.target).add(n),this.cam.up.set(0,1,0),this.cam.lookAt(this.target),this.emit()}rotate(e,t){this.orbit(e,t)}rotateFree(e,t){if(this.turntable){this.turn(new T(0,1,0),-e);return}let n=this.cam,i=n.position.clone().sub(this.target),r=n.up.clone(),o=new T().crossVectors(r,i).normalize(),a=new pi().setFromAxisAngle(r,-e).multiply(new pi().setFromAxisAngle(o,-t));i.applyQuaternion(a),n.up.applyQuaternion(a).normalize();let c=i.clone().normalize();n.up.sub(c.multiplyScalar(n.up.dot(i.clone().normalize()))).normalize(),n.position.copy(this.target).add(i),n.lookAt(this.target),this.emit()}turn(e,t){let n=new pi().setFromAxisAngle(e,t),i=this.cam.position.clone().sub(this.target).applyQuaternion(n);this.cam.up.applyQuaternion(n).normalize(),this.cam.position.copy(this.target).add(i),this.cam.lookAt(this.target),this.emit()}level(){let e=this.cam.position.clone().sub(this.target),t=e.length(),n=new T(e.x,0,e.z);return n.lengthSq()<1e-8&&n.set(0,0,1),{p1:this.target.clone().addScaledVector(n.normalize(),t),u1:new T(0,1,0)}}roll(e){let t=this.cam.position.clone().sub(this.target).normalize();this.cam.up.applyQuaternion(new pi().setFromAxisAngle(t,e)).normalize(),this.cam.lookAt(this.target),this.emit()}update(e){let t=!1;if(!this.drag&&this.vo&&Math.hypot(this.vo[0],this.vo[1])>1e-4){let n=Math.min(1,(e||.016666666666666666)*60);this.orbit(this.vo[0]*n,this.vo[1]*n);let i=Math.pow(.86,n);this.vo[0]*=i,this.vo[1]*=i,t=!0}else if(this.autoRotate&&!this.drag){let n=2*Math.PI/60*this.autoRotateSpeed*(e||.016666666666666666),i=new pi().setFromAxisAngle(new T(0,1,0),n),r=this.cam.position.clone().sub(this.target).applyQuaternion(i);this.cam.up.applyQuaternion(i),this.cam.position.copy(this.target).add(r),this.cam.lookAt(this.target),this.emit(),t=!0}else if(this.snapOn&&!this.drag&&e){let n=this.cam.position.clone().sub(this.target),i=n.clone().normalize(),r=null,o=-1;if(t1.forEach(a=>{let c=a.dot(i);c>o&&(o=c,r=a)}),o>Math.cos(14*Math.PI/180)&&o<.99999&&Math.abs(r.y)<.5){let a=1-Math.exp(-e*3.5),c=i.clone().lerp(r,a).normalize(),l=new T(0,1,0);this.cam.position.copy(this.target).addScaledVector(c,n.length()),l.sub(c.clone().multiplyScalar(l.dot(c))).normalize(),this.cam.up.copy(l),this.cam.lookAt(this.target),this.emit(),t=!0}}t||this.cam.lookAt(this.target)}};function ox(s,e){let t=new T;String(s||"anterior").toLowerCase().split(/[\s,+-]+/).forEach(i=>{let r=Object.keys(sx).find(o=>i&&o.startsWith(i.replace(/^antero/,"anterior").replace(/^postero/,"posterior")));r&&t.add(new T(...sx[r])),i==="anterolateral"&&t.add(new T(-.7,0,.7)),i==="posterolateral"&&t.add(new T(-.7,0,-.7)),i==="anteromedial"&&t.add(new T(.7,0,.7)),i==="posteromedial"&&t.add(new T(.7,0,-.7))}),t.lengthSq()<1e-6&&t.set(0,0,1);let n=String(s||"").match(/([+-]\d+)\s*$/);if(n){let i=new T(t.x,0,t.z);i.lengthSq()<1e-6&&i.set(0,0,1),i.normalize();let r=lo.degToRad(+n[1]);t.copy(i.multiplyScalar(Math.cos(r))).setY(Math.sin(r))}return e&&(t.x=-t.x),t.normalize()}var cr=s=>String(s||"").toLowerCase().replace(/\s+/g," ").trim();function yc(s){return String(s||"").split(/[\n,;]+/).map(e=>e.trim()).filter(Boolean)}function n1(s,e){_c&&_c.stop();let t=/_lite\.glb(\?|$)/.test(String(e.model||"")),n=t?Cd.model.replace(/\.glb$/,"_lite.glb"):Cd.model;if(s.innerHTML="",s.style.removeProperty("display"),/^(attach|nerve|action)$/.test(e.mode)){let w="jka-seen:"+e.mode+":"+(e.name||e.meshes),A=!1;try{A=localStorage.getItem(w)==="1"}catch{}let R=e.front||"adaptive",O=typeof e.ivl=="number"?e.ivl:typeof window.__jkaIvl=="number"?window.__jkaIvl:null;if(e.side==="back")try{localStorage.setItem(w,"1")}catch{}else if(R==="hide"||R==="adaptive"&&(O!=null?O>=1:A)){s.style.display="none";return}}let i=()=>[document.scrollingElement,document.getElementById("jk-sc")].forEach(w=>{w&&w.scrollTop&&(w.scrollTop=0)});i(),[50,200,600].forEach(w=>setTimeout(i,w)),s.classList.add("jka");let r=!1;try{r=localStorage.getItem("jka-ct")==="1"}catch{}s.classList.toggle("jka-ctpre",r);let o=!!e.xray;try{o=o||localStorage.getItem("jka-rad")==="1"}catch{}let a=s.closest(".jka-left");a&&r?a.style.animation="none":a&&o&&(a.style.animation="jka-shrink .5s cubic-bezier(.2, .8, .2, 1) both");let c=document.createElement("div");c.className="jka-wrap",s.appendChild(c);let l=document.createElement("div");l.className="jka-msg",l.textContent="Loading model\u2026",c.appendChild(l);let u;try{let w=window.__jkaR;w&&w.getContext()&&!w.getContext().isContextLost()?(u=w,u.setRenderTarget(null),u.autoClear=!0,u.setClearColor(0,0),u.domElement.removeAttribute("style"),u.domElement.className=""):(u=new Ya({antialias:!t,alpha:!0}),window.__jkaR=u)}catch{l.textContent="3D needs WebGL, which is off in this Anki.";return}let h=[],f=u.domElement,d=EventTarget.prototype;f.addEventListener=function(w,A,R){d.addEventListener.call(f,w,A,R),h.push([w,A,R])};let g=[],y=t?1:Math.min(2,window.devicePixelRatio||1),m=Math.min(y,1);u.setPixelRatio(y),u.outputColorSpace=Gn,c.appendChild(u.domElement);let p=document.createElementNS("http://www.w3.org/2000/svg","svg");p.setAttribute("class","jka-lines"),c.appendChild(p);let v=!1,_={stop(){v=!0,h.forEach(([w,A,R])=>{try{d.removeEventListener.call(f,w,A,R)}catch{}}),h.length=0,g.forEach(w=>{try{w.dispose()}catch{}}),g.length=0}};_c=_,Id(e.model).then(w=>{if(!v)try{E(w),l.remove()}catch(A){l.textContent="3D view error: "+(A&&A.message||A)+(A&&A.stack?" \u2014 "+String(A.stack).split(`
`).slice(0,2).join(" | "):"")}}).catch(w=>{l.textContent="Could not load "+e.model+" ("+w+"). Run Tools \u2192 Janki: Set up 3D anatomy."});function E(w){let A=window.__jkaT={t0:performance.now()},R=x=>{A[x]=Math.round(performance.now()-A.t0)},O=new Cr;O.add(new Ul(16777215,4210768,1.6));let b=new ra(16777215,1.4);O.add(b);let P=w.clone(!0);O.add(P);let V=e.mode+"|"+e.name+"|"+e.meshes,X=String(e.limb||"").toLowerCase();if(X!=="left"&&X!=="right"){let x=window.__jkaLimb;X=e.side==="back"&&x&&x.key===V?x.limb:Math.random()<.5?"left":"right"}e.side!=="back"&&(window.__jkaLimb={key:V,limb:X});let se=X==="left";se&&(P.scale.x=-1),P.updateMatrixWorld(!0);let N=[];P.traverse(x=>{if(!x.isMesh)return;let S=x.userData||{},M=S.n||x.name,L=S.l||"muscle",Y=L==="vein"||L==="vessel"&&/vein/i.test(M)?tx.vein:tx[L]||10066329;x.material=t?new Il({color:Y,emissive:L==="nerve"?3154944:0}):new Pr({color:Y,roughness:L==="bone"?.85:.6,metalness:0,emissive:L==="nerve"?3154944:0}),x.userData.base=Y,N.push({mesh:x,name:M,key:cr(M),layer:L,box:new sn().setFromObject(x)})}),function x(S){let M=performance.now();for(;S<N.length&&performance.now()-M<8;S++){let L=N[S].mesh.geometry;if(!L.boundsTree)try{L.computeBoundsTree()}catch{}}S<N.length&&!v?setTimeout(()=>x(S),0):setTimeout(()=>{zn=!0,dr=!0},0)}(0);let j=x=>{let S=cr(x);return N.filter(M=>M.key===S||M.key===S+" muscle")},B=[].concat(...yc(e.meshes).map(j)),ye=[].concat(...yc(e.nerve).map(j)),be=(e.peel||[]).map(x=>[].concat(...yc(x).map(j))),ee=e.side==="back",de=e.mode,ze=B.length&&B.every(x=>x.layer==="nerve"||x.layer==="vessel"||x.layer==="vein");ze&&de==="name"&&(de="nerveid");let $e=ix[cr(e.region)]||null,te=new sn;(B.length?B:ye).forEach(x=>te.union(x.box));let Ie=Jt();R("parts");let Oe=e.landmark?Ie[String(e.landmark).toLowerCase().trim()]?At(String(e.landmark).toLowerCase().trim()):Bt(e.landmark):null;function At(x){let S=window.__jkaLMC=window.__jkaLMC||new Map,M=e.model+"|"+x+"|"+e.meshes+"|"+(se?"L":"R"),L=S.get(M);if(L){B.forEach(W=>{let _e=W.mesh.geometry.userData.jkaSubG;if(_e){let G=W.mesh.geometry;W.mesh.geometry=_e,W.mesh.userData.coarse=G,N.forEach(F=>{F.mesh.geometry===G&&(F.mesh.geometry=_e,F.mesh.userData.coarse=G)})}});let J=new Map;if(B.forEach((W,_e)=>{let G=L.W[_e];G&&G.length===W.mesh.geometry.attributes.position.count&&J.set(W,G)}),J.size===L.n)return{pt:L.pt,pts:L.pts,W:J,sphere:L.sphere,ivf:L.ivf}}let Y=Nt(x);return Y&&(S.set(M,{pt:Y.pt,pts:Y.pts,sphere:Y.sphere,ivf:Y.ivf,n:Y.W.size,W:B.map(J=>Y.W.get(J)||null)}),S.size>40&&S.delete(S.keys().next().value)),Y}let tt=Oe?Oe.pt:null,Ht=Oe?Oe.pts?Oe.pts.slice():(()=>{let x=[];return B.forEach(S=>_t(S.mesh,M=>{Oe.inPatch(M)&&Oe.soft(M)>.3&&x.push(M.clone())})),x})():[];try{document.documentElement.setAttribute("data-jkalm",Oe?Oe.pts?Oe.pts.length:"old":"none")}catch{}function Jt(){return{"scapula: acromion":{k:"ext",d:[-.7,.7,.1],tol:.02,reach:.04},"scapula: coracoid process":{k:"ext",d:[.1,.15,1],tol:.012,reach:.03},"scapula: spine":{k:"ridge",bin:"m",d:[0,.15,-1],b:[.45,.98],sm:[0,.86],tol:.004},"scapula: supraspinous fossa":{k:"spinefossa",up:!0},"scapula: infraspinous fossa":{k:"spinefossa",up:!1},"scapula: subscapular fossa":{k:"band",b:[.04,.84],f:[.4,0,1,.45]},"scapula: scapular notch":{k:"notch",b:[.7,1],sm:[.3,.75]},"scapula: glenoid cavity":{k:"ext",d:[-1,0,0],b:[.62,.86],f:[-1,0,0,.45],tol:.007,reach:.025},"scapula: supraglenoid tubercle":{k:"glenoidend",up:!0},"scapula: infraglenoid tubercle":{k:"glenoidend",up:!1},"scapula: medial border":{k:"ridge",bin:"y",d:[1,0,0],b:[.05,.85],tol:.003},"scapula: superior angle":{k:"ext",d:[.8,1,0],tol:.006,reach:.02},"scapula: inferior angle":{k:"ext",d:[0,-1,0],tol:.006,reach:.02},"clavicle: acromial end":{k:"band",ax:"lat",b:[0,.12]},"clavicle: shaft":{k:"band",ax:"lat",b:[.25,.75]},"clavicle: sternal end":{k:"band",ax:"lat",b:[.88,1]},"clavicle: conoid tubercle":{k:"ext",ax:"lat",d:[0,-1,-.4],b:[.12,.38],tol:.003,reach:.012},"clavicle: sternal articular surface":{k:"ext",ax:"lat",d:[1,0,0],f:[1,0,0,.2],tol:.004,reach:.02},"humerus: head":{k:"sphere",d:[1,.7,-.4],b:[.8,1],seedR:.022,tol:.003,reach:.05},"humerus: greater tubercle":{k:"ext",d:[-1,.2,.15],b:[.82,.97],tol:.01,reach:.025},"humerus: lesser tubercle":{k:"ext",d:[.25,0,1],b:[.78,.9],tol:.004,reach:.015},"humerus: intertubercular groove":{k:"spiral",b:[.72,.9],phi:[2.7,2.7],w:.22},"humerus: anatomical neck":{k:"aneck"},"humerus: surgical neck":{k:"band",b:[.76,.82]},"humerus: deltoid tuberosity":{k:"ext",d:[-1,0,.35],b:[.45,.65],tol:.003,reach:.03},"humerus: radial groove":{k:"spiral",b:[.36,.64],phi:[.1,1.5],w:.3},"humerus: capitulum":{k:"band",b:[0,.07],sm:[.1,.4],f:[0,-.5,1,.25]},"humerus: trochlea":{k:"band",b:[0,.075],sm:[.38,.78],f:[0,-1,0,-.5]},"humerus: medial epicondyle":{k:"ext",d:[1,0,0],b:[.02,.16],tol:.007,reach:.02},"humerus: lateral epicondyle":{k:"ext",d:[-1,0,0],b:[.02,.16],tol:.005,reach:.018},"humerus: medial supracondylar ridge":{k:"ridge",bin:"y",d:[1,0,0],b:[.12,.32],tol:.002},"humerus: lateral supracondylar ridge":{k:"ridge",bin:"y",d:[-1,0,0],b:[.12,.35],tol:.002},"humerus: radial fossa":{k:"cav",b:[.06,.17],f:[0,0,1,.4],sm:[0,.5],thr:.35,reach:.012},"humerus: coronoid fossa":{k:"cav",b:[.06,.17],f:[0,0,1,.4],sm:[.5,1],thr:.35,reach:.012},"humerus: olecranon fossa":{k:"cav",b:[.05,.2],f:[0,0,-1,.4],sm:[.25,.75],thr:.3,reach:.018},"humerus: groove for ulnar nerve":{k:"cav",b:[.03,.14],f:[.3,0,-1,.2],sm:[.72,1],thr:.3,reach:.012},"radius: head":{k:"band",b:[.94,1]},"radius: neck":{k:"band",b:[.87,.935]},"radius: radial tuberosity":{k:"ext",d:[.8,0,.5],b:[.76,.88],tol:.003,reach:.014},"radius: interosseous border":{k:"ridge",bin:"y",d:[1,0,0],b:[.2,.75],tol:.002},"radius: dorsal tubercle":{k:"ext",d:[0,0,-1],b:[.04,.14],tol:.0015,reach:.008},"radius: styloid process":{k:"ext",d:[-.7,-1,0],b:[0,.15],tol:.006,reach:.014},"radius: carpal articular surface":{k:"contact",o:["Scaphoid bone","Lunate bone"],dist:.004,grow:.003,b:[0,.1]},"ulna: olecranon":{k:"ext",d:[0,1,-.7],b:[.85,1],tol:.01,reach:.022},"ulna: trochlear notch":{k:"contact",o:["Humerus"],dist:.005,grow:.004,b:[.8,1]},"ulna: coronoid process":{k:"ext",d:[0,0,1],b:[.8,.95],tol:.005,reach:.012},"ulna: radial notch":{k:"contact",o:["Radius"],dist:.004,grow:.003,b:[.8,1]},"ulna: ulnar tuberosity":{k:"ext",d:[0,-.2,1],b:[.74,.84],tol:.003,reach:.012},"ulna: styloid process":{k:"ext",d:[.2,-1,-.3],b:[0,.12],tol:.004,reach:.01},"ulna: head":{k:"band",b:[.02,.1]},"trapezium: tubercle":{k:"ext",d:[0,0,1],tol:.002,reach:.008},"hamate: hook":{k:"ext",d:[0,0,1],tol:.003,reach:.01},"hand: head":{k:"band",ax:"pca",each:!0,b:[0,.2]},"hand: shaft":{k:"band",ax:"pca",each:!0,b:[.3,.72]},"hand: base":{k:"band",ax:"pca",each:!0,b:[.8,1]},"hand: distal tuberosity":{k:"band",ax:"pca",each:!0,b:[0,.25],f:[0,0,1,-.2]},"hand: sesamoids":{k:"band",ax:"pca",each:!0,b:[0,.25],f:[0,0,1,.3]},"hand: distal transverse crease":{k:"band",ax:"pca",each:!0,b:[0,.24],f:[0,0,1,.3]},"hand: proximal transverse crease":{k:"band",ax:"pca",each:!0,b:[.25,.5],f:[0,0,1,.3]},"tendon: distal":{k:"band",b:[0,.4]},"tendon: distal long":{k:"band",b:[0,.55]},"muscle: first dorsal interosseous":{k:"ext",d:[-1,0,0],tol:.014,reach:.03},"muscle: lumbricals radial":{k:"ext",d:[-1,0,0],tol:.034,reach:.06},"muscle: lumbricals ulnar":{k:"ext",d:[1,0,0],tol:.036,reach:.06},"vertebra: body":{k:"vert",part:"body"},"vertebra: arch":{k:"vert",part:"arch"},"vertebra: pedicle":{k:"vert",part:"pedicle"},"vertebra: lamina":{k:"vert",part:"lamina"},"vertebra: foramen":{k:"vert",part:"foramen"},"vertebra: superior notch":{k:"vert",part:"supnotch"},"vertebra: inferior notch":{k:"vert",part:"infnotch"},"vertebra: spinous process":{k:"vert",part:"spinous"},"vertebra: superior articular process":{k:"vert",part:"supart"},"vertebra: inferior articular process":{k:"vert",part:"infart"},"vertebra: pars interarticularis":{k:"vert",part:"pars"},"vertebra: transverse process":{k:"vert",part:"transverse"},"cervical: transverse process":{k:"vert",part:"transverse",xr:[1.4,9],zr:[-.6,1.6]},"cervical: transverse foramen":{k:"vert",part:"transforamen"},"atlas: posterior arch":{k:"vert",part:"arch",zr:[-9,-.35]},"atlas: anterior tubercle":{k:"ext",d:[0,0,1],tol:.003,reach:.01},"axis: dens":{k:"vert",part:"dens"},"thoracic: superior costal facet":{k:"vert",part:"contact",o:["Sixth rib.l","Sixth rib.r"],zr:[.2,9],tb:[.45,1]},"thoracic: inferior costal facet":{k:"vert",part:"contact",o:["Seventh rib.l","Seventh rib.r"],zr:[.2,9],tb:[0,.55]},"thoracic: transverse costal facet":{k:"vert",part:"contact",o:["Sixth rib.l","Sixth rib.r"],xr:[1.4,9],zr:[-9,.4]},"vertebra: intervertebral foramen":{k:"vert",part:"ivf"},"hip: ilium":{k:"band",b:[.5,1]},"hip: ischium":{k:"band",b:[0,.42],sa:[0,.5]},"hip: pubis":{k:"band",b:[0,.45],sa:[.5,1],sm:[.45,1]},"hip: superior pubic ramus":{k:"band",b:[.22,.45],sa:[.55,1],sm:[.45,.92]},"hip: inferior pubic ramus":{k:"band",b:[.04,.25],sm:[.6,1],sa:[.35,.85]},"hip: symphyseal surface":{k:"ext",d:[1,0,0],f:[1,0,0,.4],tol:.004,reach:.03},"hip: pectineal line":{k:"ridge",bin:"m",d:[0,1,.3],b:[.25,.48],sa:[.5,1],sm:[.5,.95],tol:.003},"hip: arcuate line":{k:"arcuate",b:[.42,.8],f:[1,.2,.3,.45],sa:[.1,.85]},"hip: obturator foramen":{k:"hole",b:[0,.45],outline:"loop"},"hip: auricular surface":{k:"contact",o:["Sacrum"],dist:.006,grow:.004},"hip: iliac fossa":{k:"band",b:[.6,.97],f:[1,.2,.3,.45]},"femur: trochanteric fossa":{k:"cav",b:[.9,.98],f:[.3,0,-1,.1],sm:[0,.5],thr:.3,reach:.015},"femur: intertrochanteric crest":{k:"ridge",bin:"y",d:[0,0,-1],b:[.83,.95],sm:[.05,.6],tol:.003},"femur: intertrochanteric line":{k:"ridge",bin:"y",d:[0,0,1],b:[.84,.95],sm:[.05,.7],tol:.003},"femur: gluteal tuberosity":{k:"ext",d:[-.6,0,-1],b:[.68,.82],tol:.003,reach:.03},"femur: popliteal surface":{k:"band",b:[.06,.22],f:[0,0,-1,.5],sm:[.2,.8]},"tibia: medial plateau":{k:"band",b:[.96,1],f:[0,1,0,.55],sm:[.5,1]},"tibia: lateral plateau":{k:"band",b:[.96,1],f:[0,1,0,.55],sm:[0,.5]},"tibia: medial condyle":{k:"band",b:[.86,.99],sm:[.52,1]},"tibia: lateral condyle":{k:"band",b:[.86,.99],sm:[0,.48]},"tibia: soleal line":{k:"spiral",b:[.6,.8],phi:[.9,-1.1],w:.2},"tibia: tibial tuberosity":{k:"ext",d:[0,0,1],b:[.8,.94],tol:.004,reach:.02},"tibia: medial malleolus":{k:"ext",d:[1,-1,0],b:[0,.1],tol:.008,reach:.02},"fibula: head":{k:"band",b:[.93,1]},"fibula: neck":{k:"band",b:[.87,.93]},"fibula: lateral malleolus":{k:"band",b:[0,.12]},"calcaneus: tuberosity":{k:"ext",d:[0,0,-1],tol:.01,reach:.025},"calcaneus: sustentaculum tali":{k:"ext",d:[1,.3,0],tol:.005,reach:.015},"hip: greater sciatic notch":{k:"ridge",bin:"y",d:[.3,0,-1],b:[.33,.58],on:/^hip bone$/i,tol:.011,outline:"arc"},"hip: lesser sciatic notch":{k:"ridge",bin:"y",d:[.3,0,-1],b:[.17,.31],on:/^hip bone$/i,tol:.009,outline:"arc"},"tibia: pes anserinus":{k:"ext",d:[.7,-.2,.6],b:[.8,.9],tol:.006,reach:.022},"muscle: obturator internus tendon":{k:"ext",d:[-1,0,0],tol:.022,reach:.045},"space: femoral triangle":{k:"band",ya:[.79,.9]},"space: adductor canal":{k:"band",ya:[.55,.72]},"space: adductor hiatus":{k:"band",ya:[.5,.56]},"cord: cervical enlargement":{k:"band",ya:[1.435,1.515]},"cord: lumbosacral enlargement":{k:"band",ya:[1.09,1.225]},"cord: conus medullaris":{k:"band",ya:[1.05,1.115]},"cauda: filum terminale":{k:"band",b:[0,.18]},"dura: dural sac":{k:"band",ya:[.85,1.07]},"temporal: mastoid":{k:"ext",each:!0,d:[0,-1,-.7],tol:.008,reach:.02},"vertebra: epidural":{k:"vert",part:"foramen",on:/^(vertebra|atlas|axis)/i},"muscle: gluteal fold":{k:"ext",d:[0,-1,-.3],tol:.012,reach:.09},"muscle: adductor part":{k:"ext",d:[-.6,.3,.6],tol:.05,reach:.25},"muscle: hamstring part":{k:"ext",d:[.7,0,-.7],tol:.03,reach:.45},"plexus: lateral cord":{k:"band",ya:[1.352,1.42]},"plexus: medial cord":{k:"band",ya:[1.352,1.42]},"tendon: proximal":{k:"band",each:!0,b:[.86,1]},"aponeurosis: palm":{k:"band",ya:[.785,.875]},"tendon: biceps long head":{k:"band",b:[.8,1]},"tendon: expansion":{k:"band",b:[0,.16]},"vessel: distal":{k:"band",b:[0,.72]},"nerve: recurrent median":{k:"ext",d:[-1,0,.6],ya:[.8,.87],tol:.006,reach:.02},"scaphoid: snuffbox":{k:"ext",d:[-1,0,-.4],tol:.004,reach:.012}}}function Nt(x,S){let M=Ie[x];if(!M)return null;let L=se?-1:1,Y=k=>{if(k._md)return k._md;let z=k.mesh.geometry;if(z.attributes.normal||z.computeVertexNormals(),!z.userData.jkaSub&&z.index&&k.layer==="bone"){let ie=z;if(z=ie.userData.jkaSubG||_n(ie,.0025/k.mesh.matrixWorld.getMaxScaleOnAxis()),z.userData.jkaSub=!0,!ie.userData.jkaSubG){ie.userData.jkaSubG=z;try{z.computeBoundsTree()}catch{}}k.mesh.geometry=z,k.mesh.userData.coarse=ie,N.forEach(fe=>{fe.mesh.geometry===ie&&(fe.mesh.geometry=z,fe.mesh.userData.coarse=ie)})}let ue=z.attributes.position,K=z.attributes.normal,he=ue.count,Ge=new Float32Array(he*3),ot=new Float32Array(he*3),it=new T,ln=new dn().getNormalMatrix(k.mesh.matrixWorld);for(let ie=0;ie<he;ie++)it.fromBufferAttribute(ue,ie).applyMatrix4(k.mesh.matrixWorld),Ge[ie*3]=it.x,Ge[ie*3+1]=it.y,Ge[ie*3+2]=it.z,it.fromBufferAttribute(K,ie).applyMatrix3(ln).normalize(),ot[ie*3]=it.x,ot[ie*3+1]=it.y,ot[ie*3+2]=it.z;let Xt=Array.from({length:he},()=>[]),Rt=z.index?z.index.array:null;if(Rt)for(let ie=0;ie<Rt.length;ie+=3)for(let fe=0;fe<3;fe++){let xe=Rt[ie+fe],Me=Rt[ie+(fe+1)%3];Xt[xe].push(Me),Xt[Me].push(xe)}let Se=new Float32Array(he);for(let ie=0;ie<he;ie++){let fe=Xt[ie];if(!fe.length)continue;let xe=0,Me=0,oe=0,$=0;fe.forEach(Ee=>{let Te=Ge[Ee*3]-Ge[ie*3],yt=Ge[Ee*3+1]-Ge[ie*3+1],Ke=Ge[Ee*3+2]-Ge[ie*3+2];xe+=Te,Me+=yt,oe+=Ke,$+=Te*Te+yt*yt+Ke*Ke}),Se[ie]=2*(xe*ot[ie*3]+Me*ot[ie*3+1]+oe*ot[ie*3+2])/Math.max($,1e-12)}for(let ie=0;ie<6;ie++){let fe=new Float32Array(he);for(let xe=0;xe<he;xe++){let Me=Se[xe],oe=1;Xt[xe].forEach($=>{Me+=Se[$],oe++}),fe[xe]=Me/oe}Se=fe}return k._md={n:he,P:Ge,N:ot,nb:Xt,K:Se}},J=S||B,W=(k,z)=>new T(k.P[z*3],k.P[z*3+1],k.P[z*3+2]),_e=(k,z,ue,K)=>L*ue[0]*K[z*3]+ue[1]*K[z*3+1]+ue[2]*K[z*3+2],G=(k,z)=>{let ue=new Map;return k.forEach(K=>{let he=Math.floor(K.x/z)+","+Math.floor(K.y/z)+","+Math.floor(K.z/z);(ue.get(he)||ue.set(he,[]).get(he)).push(K)}),(K,he)=>{let Ge=Math.ceil(he/z),ot=Math.floor(K.x/z),it=Math.floor(K.y/z),ln=Math.floor(K.z/z);for(let Xt=-Ge;Xt<=Ge;Xt++)for(let Rt=-Ge;Rt<=Ge;Rt++)for(let Se=-Ge;Se<=Ge;Se++){let ie=ue.get(ot+Xt+","+(it+Rt)+","+(ln+Se));if(ie){for(let fe of ie)if(fe.distanceToSquared(K)<he*he)return!0}}return!1}},F=new Map,Q=null,ge=-1/0,Ne={},Ve=M.on?J.filter(k=>M.on.test(k.name)):J,qe=M.each?Ve.map(k=>[k]):[Ve],lt=null;qe.forEach(k=>{let z=k.map(Y),ue;if(M.ax==="lat"){let fe=1e9,xe=-1e9;z.forEach(Me=>{for(let oe=0;oe<Me.n;oe++){let $=L*Me.P[oe*3];fe=Math.min(fe,$),xe=Math.max(xe,$)}}),ue=(Me,oe)=>(L*Me.P[oe*3]-fe)/(xe-fe)}else if(M.ax==="pca"){let fe=new T,xe=0;z.forEach(Ee=>{for(let Te=0;Te<Ee.n;Te++)fe.add(W(Ee,Te)),xe++}),fe.multiplyScalar(1/xe);let Me=new T(0,1,0);for(let Ee=0;Ee<12;Ee++){let Te=new T;z.forEach(yt=>{for(let Ke=0;Ke<yt.n;Ke++){let pt=W(yt,Ke).sub(fe);Te.addScaledVector(pt,pt.dot(Me))}}),Me=Te.normalize()}{let Ee=N.find(yt=>yt.name==="Capitate bone"),Te=Ee?new sn().setFromObject(Ee.mesh).getCenter(new T):null;(Te?Te.clone().sub(fe).dot(Me)<0:Me.y<0)&&Me.negate()}let oe=1e9,$=-1e9;z.forEach(Ee=>{for(let Te=0;Te<Ee.n;Te++){let yt=W(Ee,Te).sub(fe).dot(Me);oe=Math.min(oe,yt),$=Math.max($,yt)}}),ue=(Ee,Te)=>(W(Ee,Te).sub(fe).dot(Me)-oe)/($-oe)}else{let fe=1e9,xe=-1e9;z.forEach(Me=>{for(let oe=0;oe<Me.n;oe++)fe=Math.min(fe,Me.P[oe*3+1]),xe=Math.max(xe,Me.P[oe*3+1])}),ue=(Me,oe)=>(Me.P[oe*3+1]-fe)/(xe-fe)}let K=(fe,xe)=>!M.b||ue(fe,xe)>=M.b[0]&&ue(fe,xe)<=M.b[1],he=1e9,Ge=-1e9,ot=1e9,it=-1e9;z.forEach(fe=>{for(let xe=0;xe<fe.n;xe++)if(K(fe,xe)){let Me=L*fe.P[xe*3],oe=fe.P[xe*3+2];he=Math.min(he,Me),Ge=Math.max(Ge,Me),ot=Math.min(ot,oe),it=Math.max(it,oe)}});let ln=(fe,xe)=>K(fe,xe)&&(!M.ya||fe.P[xe*3+1]>=M.ya[0]&&fe.P[xe*3+1]<=M.ya[1])&&(!M.f||_e(fe,xe,M.f,fe.N)>=M.f[3])&&(!M.sm||(L*fe.P[xe*3]-he)/(Ge-he)>=M.sm[0]&&(L*fe.P[xe*3]-he)/(Ge-he)<=M.sm[1])&&(!M.sa||(fe.P[xe*3+2]-ot)/(it-ot)>=M.sa[0]&&(fe.P[xe*3+2]-ot)/(it-ot)<=M.sa[1]),Xt=z.map(fe=>new Float32Array(fe.n)),Rt=fe=>z.forEach((xe,Me)=>{for(let oe=0;oe<xe.n;oe++)ln(xe,oe)&&fe(xe,oe,Me)}),Se=fe=>{let xe=null,Me=-1/0;return Rt((oe,$,Ee)=>{let Te=fe(oe,$);Te>Me&&(Me=Te,xe=[oe,$,Ee])}),[xe,Me]},ie=M.k;if(ie==="ext"||ie==="sphere"){let[fe,xe]=Se((oe,$)=>_e(oe,$,M.d,oe.P));if(!fe)return;let Me=W(fe[0],fe[1]);if(ie==="ext")Rt((oe,$,Ee)=>{let Te=_e(oe,$,M.d,oe.P);Te>=xe-M.tol&&W(oe,$).distanceTo(Me)<M.reach&&(Xt[Ee][$]=Math.min(1,(Te-(xe-M.tol))/(M.tol*.5)))});else{let oe=[];Rt((Ee,Te)=>{let yt=W(Ee,Te);yt.distanceTo(Me)<M.seedR&&oe.push(yt)});let $=ne(oe);for(let Ee=0;Ee<3;Ee++)oe=[],Rt((Te,yt)=>{let Ke=W(Te,yt);Math.abs(Ke.distanceTo($.c)-$.r)<.003&&oe.push(Ke)}),oe.length>20&&($=ne(oe));lt=$,Rt((Ee,Te,yt)=>{let Ke=W(Ee,Te);Math.abs(Ke.distanceTo($.c)-$.r)<M.tol&&Ke.distanceTo(Me)<M.reach&&(Xt[yt][Te]=1)})}xe>ge&&(ge=xe,Q=Me)}else if(ie==="ridge"){let fe=(Me,oe)=>Math.round((M.bin==="m"?L*Me.P[oe*3]:M.bin==="a"?Me.P[oe*3+2]:Me.P[oe*3+1])/.006),xe={};Rt((Me,oe)=>{let $=fe(Me,oe),Ee=_e(Me,oe,M.d,Me.P);(xe[$]==null||Ee>xe[$])&&(xe[$]=Ee)}),Rt((Me,oe,$)=>{let Ee=1-(xe[fe(Me,oe)]-_e(Me,oe,M.d,Me.P))/M.tol;Ee>0&&(Xt[$][oe]=Math.min(1,Ee*1.5))})}else if(ie==="cav"){let[fe,xe]=Se((oe,$)=>oe.K[$]);if(!fe||xe<=0)return;let Me=W(fe[0],fe[1]);Rt((oe,$,Ee)=>{let Te=oe.K[$];Te>=M.thr*xe&&W(oe,$).distanceTo(Me)<M.reach&&(Xt[Ee][$]=Math.min(1,(Te-M.thr*xe)/(.3*xe)))}),Q=Me}else if(ie==="spiral"){let fe={};Rt((xe,Me)=>{let oe=Math.round(xe.P[Me*3+1]/.006),$=fe[oe]||(fe[oe]=[0,0,0]);$[0]+=xe.P[Me*3],$[1]+=xe.P[Me*3+2],$[2]++}),Rt((xe,Me,oe)=>{let $=fe[Math.round(xe.P[Me*3+1]/.006)],Ee=L*(xe.P[Me*3]-$[0]/$[2]),Te=xe.P[Me*3+2]-$[1]/$[2],yt=Math.atan2(-Ee,-Te),Ke=(ue(xe,Me)-M.b[1])/(M.b[0]-M.b[1]),pt=M.phi[0]+(M.phi[1]-M.phi[0])*Ke,st=Math.abs(yt-pt);st>Math.PI&&(st=2*Math.PI-st),st<M.w&&(Xt[oe][Me]=Math.min(1,(M.w-st)/(M.w*.4)))})}else if(ie==="hole"){let xe=new Set,Me=ut=>Math.floor(ut.z/.003),oe=ut=>Math.floor(ut.y/.003),$=1e9,Ee=-1e9,Te=1e9,yt=-1e9;Rt((ut,en)=>{let Pn=W(ut,en),Wn=Me(Pn),Oi=oe(Pn);xe.add(Wn+","+Oi),$=Math.min($,Wn),Ee=Math.max(Ee,Wn),Te=Math.min(Te,Oi),yt=Math.max(yt,Oi)});let Ke=new Set(xe);xe.forEach(ut=>{let[en,Pn]=ut.split(",").map(Number);for(let[Wn,Oi]of[[1,0],[-1,0],[0,1],[0,-1]])Ke.add(en+Wn+","+(Pn+Oi))});let pt=new Set,st=[];for(let ut=$-1;ut<=Ee+1;ut++)st.push([ut,Te-1],[ut,yt+1]);for(let ut=Te-1;ut<=yt+1;ut++)st.push([$-1,ut],[Ee+1,ut]);for(;st.length;){let[ut,en]=st.pop(),Pn=ut+","+en;ut<$-1||ut>Ee+1||en<Te-1||en>yt+1||pt.has(Pn)||Ke.has(Pn)||(pt.add(Pn),st.push([ut+1,en],[ut-1,en],[ut,en+1],[ut,en-1]))}let un=new Set;for(let ut=$;ut<=Ee;ut++)for(let en=Te;en<=yt;en++){let Pn=ut+","+en;!Ke.has(Pn)&&!pt.has(Pn)&&un.add(Pn)}if(!un.size)return;Rt((ut,en,Pn)=>{let Wn=W(ut,en),Oi=Me(Wn),ls=oe(Wn),U=!1;for(let pe=-3;pe<=3&&!U;pe++)for(let Re=-3;Re<=3&&!U;Re++)un.has(Oi+pe+","+(ls+Re))&&(U=!0);U&&(Xt[Pn][en]=1)})}else if(ie==="arcuate"){let fe={},xe=(Me,oe)=>Math.round(Me.P[oe*3+2]/.005);Rt((Me,oe)=>{let $=Me.P[oe*3+1],Ee=xe(Me,oe);(fe[Ee]==null||$<fe[Ee])&&(fe[Ee]=$)}),Rt((Me,oe,$)=>{Me.P[oe*3+1]<fe[xe(Me,oe)]+.004&&(Xt[$][oe]=1)})}else if(ie==="vert"){let fe={body:{zr:[.95,9]},arch:{zr:[-9,.95]},pedicle:{xr:[.8,1.7],zr:[-.3,1],tb:[.25,.85]},lamina:{xr:[0,1.3],zr:[-1.9,-.6]},spinous:{xr:[0,.7],zr:[-9,-1.4]},transverse:{xr:[1.7,9],zr:[-9,.6]},supart:{xr:[.6,2.4],zr:[-2,.2],tb:[.65,1]},infart:{xr:[.2,1.9],zr:[-2.4,-.5],tb:[0,.35]},pars:{xr:[.5,1.9],zr:[-1.8,-.2],tb:[.3,.65]},supnotch:{xr:[.7,1.9],zr:[-.5,1.1],tb:[.45,1],ny:.2},infnotch:{xr:[.7,1.9],zr:[-.5,1.1],tb:[0,.55],ny:-.2},dens:{xr:[0,.8],zr:[.45,9],tb:[.7,1]},contact:{}},xe=k.map((Me,oe)=>[oe,z[oe].P.reduce(($,Ee,Te)=>Te%3===1?$+Ee:$,0)/z[oe].n]).sort((Me,oe)=>oe[1]-Me[1]).map(Me=>Me[0]);k.forEach((Me,oe)=>{let $=z[oe],Ee=6e-4,Te=1e9,yt=-1e9,Ke=1e9,pt=-1e9,st=1e9,un=-1e9;for(let we=0;we<$.n;we++)Te=Math.min(Te,$.P[we*3]),yt=Math.max(yt,$.P[we*3]),st=Math.min(st,$.P[we*3+1]),un=Math.max(un,$.P[we*3+1]),Ke=Math.min(Ke,$.P[we*3+2]),pt=Math.max(pt,$.P[we*3+2]);let ut=Math.ceil((yt-Te)/Ee)+3,en=Math.ceil((pt-Ke)/Ee)+3,Pn=new Uint8Array(ut*en),Wn=(we,mt)=>Math.floor((we-Te)/Ee)+1+(Math.floor((mt-Ke)/Ee)+1)*ut,Oi=Me.mesh.geometry,ls=Oi.index?Oi.index.array:null,U=ls?ls.length/3:$.n/3;for(let we=0;we<U;we++){let mt=ls?ls[we*3]:we*3,dt=ls?ls[we*3+1]:we*3+1,Ft=ls?ls[we*3+2]:we*3+2,xt=$.P[mt*3],Pt=$.P[mt*3+2],pn=$.P[dt*3],li=$.P[dt*3+2],Ri=$.P[Ft*3],Ct=$.P[Ft*3+2],hn=Math.max(Math.hypot(pn-xt,li-Pt),Math.hypot(Ri-xt,Ct-Pt),Math.hypot(Ri-pn,Ct-li)),nn=Math.max(1,Math.ceil(hn/(Ee*.7)));for(let Nn=0;Nn<=nn;Nn++)for(let In=0;In<=nn-Nn;In++){let qn=Nn/nn,ni=In/nn,Xn=1-qn-ni;Pn[Wn(xt*Xn+pn*qn+Ri*ni,Pt*Xn+li*qn+Ct*ni)]=1}}let pe=new Int32Array(ut*en).fill(-1),Re=[0];for(pe[0]=0;Re.length;){let we=Re.pop(),mt=we%ut,dt=(we-mt)/ut;for(let[Ft,xt]of[[1,0],[-1,0],[0,1],[0,-1]]){let Pt=mt+Ft,pn=dt+xt;if(Pt<0||pn<0||Pt>=ut||pn>=en)continue;let li=Pt+pn*ut;pe[li]===-1&&!Pn[li]&&(pe[li]=0,Re.push(li))}}let Be=[];for(let we=0;we<ut*en;we++){if(Pn[we]||pe[we]!==-1)continue;let mt=Be.length+1,dt={n:0,sx:0,sz:0};pe[we]=mt;let Ft=[we];for(;Ft.length;){let xt=Ft.pop(),Pt=xt%ut,pn=(xt-Pt)/ut;dt.n++,dt.sx+=Pt,dt.sz+=pn;for(let[li,Ri]of[[1,0],[-1,0],[0,1],[0,-1]]){let Ct=Pt+li,hn=pn+Ri,nn=Ct+hn*ut;Ct>=0&&hn>=0&&Ct<ut&&hn<en&&pe[nn]===-1&&!Pn[nn]&&(pe[nn]=mt,Ft.push(nn))}}dt.x=Te+(dt.sx/dt.n-1+.5)*Ee,dt.z=Ke+(dt.sz/dt.n-1+.5)*Ee,dt.r=Math.sqrt(dt.n/Math.PI)*Ee,Be.push(dt)}Be.sort((we,mt)=>mt.n-we.n);let nt=Be[0]||{x:(Te+yt)/2,z:(Ke+pt)/2,r:.008},De={x:nt.x,z:nt.z},ht=0,Je=0,Qe=0;N.filter(we=>/spinal cord|cauda equina/i.test(we.name)).forEach(we=>{let mt=Y(we);for(let dt=0;dt<mt.n;dt++){let Ft=mt.P[dt*3+1];Ft>st+.3*(un-st)&&Ft<un-.3*(un-st)&&(Je+=mt.P[dt*3],Qe+=mt.P[dt*3+2],ht++)}}),ht>10&&(De={x:Je/ht,z:Qe/ht});let gt=new Array(24).fill(1e9);for(let we=0;we<$.n;we++){let mt=$.P[we*3+1];if(mt<st+.2*(un-st)||mt>un-.2*(un-st))continue;let dt=$.P[we*3]-De.x,Ft=$.P[we*3+2]-De.z,xt=Math.hypot(dt,Ft),Pt=Math.floor((Math.atan2(Ft,dt)+Math.PI)/(2*Math.PI)*24)%24;xt<gt[Pt]&&(gt[Pt]=xt)}let ve=gt.filter(we=>we<.03).sort((we,mt)=>we-mt),ft=ve.length?ve[Math.floor(ve.length/2)]:.008;ft=Math.max(.005,Math.min(ft,.015));let me=M.part==="ivf"?xe.indexOf(oe)===0?"infnotch":"supnotch":M.part,We=Object.assign({},fe[me]||{},M.xr?{xr:M.xr}:{},M.zr?{zr:M.zr}:{},M.tb?{tb:M.tb}:{}),wt=(we,mt)=>!mt||we>=mt[0]&&we<=mt[1],vn=we=>($.P[we*3+1]-st)/(un-st),tn=null;if(me==="contact"){let we=[];M.o.forEach(mt=>N.filter(dt=>dt.name===mt).forEach(dt=>{let Ft=Y(dt);for(let xt=0;xt<Ft.n;xt++)we.push(W(Ft,xt))})),tn=G(we,.005)}for(let we=0;we<$.n;we++){let mt=Math.abs($.P[we*3]-De.x)/ft,dt=($.P[we*3+2]-De.z)/ft,Ft=vn(we);if(M.part==="ivf"&&mt>.8&&mt<1.7&&dt>-.3&&dt<.6){let Pt=$.P[we*3]>De.x?1:-1,pn=Ne[Pt]||(Ne[Pt]={top:-1e9,bot:1e9,xs:0,zs:0,n:0,pt:1e9,pb:-1e9});pn.pt==null&&(pn.pt=1e9,pn.pb=-1e9),me==="infnotch"?Ft>.25&&(pn.pt=Math.min(pn.pt,$.P[we*3+1])):Ft<.72&&(pn.pb=Math.max(pn.pb,$.P[we*3+1]))}let xt;if(me==="foramen"){let Pt=Math.hypot($.P[we*3]-De.x,$.P[we*3+2]-De.z);xt=Pt<ft*1.25&&(De.x-$.P[we*3])*$.N[we*3]+(De.z-$.P[we*3+2])*$.N[we*3+2]>.3*Pt}else me==="transforamen"?xt=Be.slice(1).some(Pt=>Pt.n>20&&Math.abs(Pt.x-De.x)>ft&&Math.hypot($.P[we*3]-Pt.x,$.P[we*3+2]-Pt.z)<Pt.r*1.6):(xt=wt(mt,We.xr)&&wt(dt,We.zr)&&wt(Ft,We.tb)&&(We.ny==null||(We.ny>0?$.N[we*3+1]>We.ny:$.N[we*3+1]<We.ny)),xt&&tn&&(xt=tn(W($,we),.006)));if(xt&&ln($,we)&&(Xt[oe][we]=1,M.part==="ivf")){let Pt=$.P[we*3]>De.x?1:-1,pn=Ne[Pt]||(Ne[Pt]={top:-1e9,bot:1e9,xs:0,zs:0,n:0});me==="infnotch"?pn.top=Math.max(pn.top,$.P[we*3+1]):pn.bot=Math.min(pn.bot,$.P[we*3+1]),pn.xs+=$.P[we*3],pn.zs+=$.P[we*3+2],pn.n++}}})}else if(ie==="swell"){let fe={};Rt((Ke,pt)=>{let st=Math.round(Ke.P[pt*3+1]/.003),un=Ke.P[pt*3],ut=fe[st]||(fe[st]=[1e9,-1e9]);un<ut[0]&&(ut[0]=un),un>ut[1]&&(ut[1]=un)});let xe=Object.keys(fe).map(Number).sort((Ke,pt)=>Ke-pt);if(!xe.length)return;let Me=Ke=>fe[Ke][1]-fe[Ke][0],oe=Ke=>[Ke-1,Ke,Ke+1].filter(pt=>fe[pt]).reduce((pt,st,un,ut)=>pt+Me(st)/ut.length,0),$=xe[0];xe.forEach(Ke=>{oe(Ke)>oe($)&&($=Ke)});let Ee=M.frac*oe($),Te=$,yt=$;for(;fe[Te-1]&&oe(Te-1)>=Ee;)Te--;for(;fe[yt+1]&&oe(yt+1)>=Ee;)yt++;Rt((Ke,pt,st)=>{let un=Math.round(Ke.P[pt*3+1]/.003);un>=Te&&un<=yt&&(Xt[st][pt]=1)});try{document.documentElement.setAttribute("data-swell",[Te*3,yt*3,(oe($)*1e3).toFixed(1)].join(","))}catch{}}else if(ie==="band")Rt((fe,xe,Me)=>{Xt[Me][xe]=1});else if(ie==="contact"){let fe=[];M.o.forEach(oe=>N.filter($=>$.name===oe).forEach($=>{let Ee=Y($);for(let Te=0;Te<Ee.n;Te++)fe.push(W(Ee,Te))}));let xe=G(fe,.005),Me=[];if(Rt((oe,$,Ee)=>{let Te=W(oe,$);xe(Te,M.dist)&&(Xt[Ee][$]=1,Me.push(Te))}),M.grow&&Me.length){let oe=G(Me,.005);Rt(($,Ee,Te)=>{!Xt[Te][Ee]&&oe(W($,Ee),M.grow)&&(Xt[Te][Ee]=.7)})}}else if(ie==="notch"){let fe={};Rt((oe,$)=>{if(oe.N[$*3+1]<.2)return;let Ee=Math.round(L*oe.P[$*3]/.004);(fe[Ee]==null||oe.P[$*3+1]>fe[Ee])&&(fe[Ee]=oe.P[$*3+1])});let xe=Object.keys(fe).map(Number).sort((oe,$)=>oe-$);if(xe.length<3)return;let Me=xe[1];xe.slice(1,-1).forEach(oe=>{fe[oe]<fe[Me]&&(Me=oe)}),Rt((oe,$,Ee)=>{let Te=Math.round(L*oe.P[$*3]/.004);Math.abs(Te-Me)<=1&&oe.P[$*3+1]>fe[Me]-.006&&oe.N[$*3+1]>0&&(Xt[Ee][$]=1)})}else if(ie==="glenoidend"){let fe=Nt("scapula: glenoid cavity",k);if(!fe)return;let xe=fe.pts,oe=xe.reduce((Te,yt)=>!Te||(M.up?yt.y>Te.y:yt.y<Te.y)?yt:Te,null).clone().add(new T(0,M.up?.006:-.011,0)),$=M.up?.009:.012,Ee=G(xe,.005);Rt((Te,yt,Ke)=>{let pt=W(Te,yt);pt.distanceTo(oe)<$&&!Ee(pt,.0015)&&(Xt[Ke][yt]=1-pt.distanceTo(oe)/$*.5)}),Q=oe}else if(ie==="socket"){let fe=N.filter(Ee=>Ee.name==="Humerus"),xe=fe.length?Nt("humerus: head",fe):null;if(!xe||!xe.sphere)return;let Me=xe.sphere.c,oe=xe.sphere.r,$=[];if(Rt((Ee,Te,yt)=>{let Ke=W(Ee,Te);if(Ke.distanceTo(Me)<oe+.015){let st=new T(Ee.N[Te*3],Ee.N[Te*3+1],Ee.N[Te*3+2]),un=Me.clone().sub(Ke).normalize();st.dot(un)>.55&&($.push(Ke),ie==="socket"&&(Xt[yt][Te]=1))}}),ie==="glenoidend"&&$.length){let Te=$.reduce((pt,st)=>!pt||(M.up?st.y>pt.y:st.y<pt.y)?st:pt,null).clone().add(new T(0,M.up?.006:-.011,0)),yt=M.up?.009:.012,Ke=G($,.005);Rt((pt,st,un)=>{let ut=W(pt,st);ut.distanceTo(Te)<yt&&!Ke(ut,.0015)&&(Xt[un][st]=1-ut.distanceTo(Te)/yt*.5)}),Q=Te}}else if(ie==="aneck"){let fe=Nt("humerus: head",k);if(!fe)return;let xe=[];k.forEach(oe=>{let $=fe.W.get(oe),Ee=Y(oe);if($)for(let Te=0;Te<Ee.n;Te++)$[Te]>.35&&Ee.nb[Te].some(yt=>$[yt]<=.35)&&xe.push(W(Ee,Te))});let Me=G(xe,.005);Rt((oe,$,Ee)=>{Me(W(oe,$),.0035)&&(Xt[Ee][$]=1)})}else if(ie==="spinefossa"){let fe=Nt("scapula: spine",k);if(!fe)return;let xe=1e9,Me=-1e9;fe.pts.forEach(Ke=>{xe=Math.min(xe,L*Ke.x),Me=Math.max(Me,L*Ke.x)});let oe={};fe.pts.forEach(Ke=>{if((L*Ke.x-xe)/(Me-xe)<.3)return;let pt=Math.round(L*Ke.x/.006);oe[pt]=oe[pt]==null?Ke.y:Math.max(oe[pt],Ke.y)});let $=Ke=>{let pt=Math.round(L*Ke.x/.006);for(let st=0;st<20;st++){if(oe[pt+st]!=null)return oe[pt+st];if(oe[pt-st]!=null)return oe[pt-st]}return null},Ee=1e9,Te=-1e9;z.forEach(Ke=>{for(let pt=0;pt<Ke.n;pt++){let st=L*Ke.P[pt*3];Ee=Math.min(Ee,st),Te=Math.max(Te,st)}});let yt=new Set(fe.pts.map(Ke=>Ke.x.toFixed(5)+Ke.y.toFixed(5)));Rt((Ke,pt,st)=>{let un=W(Ke,pt),ut=$(un);if(ut==null)return;let en=-Ke.N[pt*3+2],Pn=(L*un.x-Ee)/(Te-Ee);yt.has(un.x.toFixed(5)+un.y.toFixed(5))||(M.up?un.y>ut+.002&&en>-.15&&Pn>.12:un.y<ut-.006&&en>.25&&Pn>.14)&&(Xt[st][pt]=1)})}k.forEach((fe,xe)=>{let Me=F.get(fe);F.set(fe,Me?Me.map((oe,$)=>Math.max(oe,Xt[xe][$])):Xt[xe])})});let q=[];if(F.forEach((k,z)=>{let ue=Y(z),K=new Float32Array(ue.n);for(let he=0;he<ue.n;he++){let Ge=k[he]*2,ot=2;ue.nb[he].forEach(it=>{Ge+=k[it],ot++}),K[he]=Math.max(k[he]*.85,Ge/ot),K[he]>.35&&q.push(W(ue,he))}F.set(z,K)}),!q.length)return null;if(!Q){let k=q.reduce((z,ue)=>z.add(ue),new T).multiplyScalar(1/q.length);Q=q.reduce((z,ue)=>!z||ue.distanceToSquared(k)<z.distanceToSquared(k)?ue:z,null)}return{pt:Q,W:F,pts:q,sphere:lt,ivf:Ne}}function _n(x,S){let M=x.attributes.position,L=x.attributes.normal,Y=[],J=[];for(let F=0;F<M.count;F++)Y.push(M.getX(F),M.getY(F),M.getZ(F)),J.push(L.getX(F),L.getY(F),L.getZ(F));let W=Array.from(x.index.array),_e=S*S;for(let F=0;F<7;F++){let Q=new Map,ge=[],Ne=0,Ve=(k,z)=>{let ue=Y[k*3]-Y[z*3],K=Y[k*3+1]-Y[z*3+1],he=Y[k*3+2]-Y[z*3+2];return ue*ue+K*K+he*he},qe=(k,z)=>{let ue=k<z?k+"_"+z:z+"_"+k,K=Q.get(ue);if(K!=null)return K;K=Y.length/3;for(let he=0;he<3;he++)Y.push((Y[k*3+he]+Y[z*3+he])/2),J.push((J[k*3+he]+J[z*3+he])/2);return Q.set(ue,K),K},lt=new Set;for(let k=0;k<W.length;k+=3)for(let z=0;z<3;z++){let ue=W[k+z],K=W[k+(z+1)%3];Ve(ue,K)>_e&&lt.add(ue<K?ue+"_"+K:K+"_"+ue)}if(!lt.size)break;let q=(k,z)=>lt.has(k<z?k+"_"+z:z+"_"+k);for(let k=0;k<W.length;k+=3){let z=W[k],ue=W[k+1],K=W[k+2],he=[q(z,ue),q(ue,K),q(K,z)],Ge=he[0]+he[1]+he[2];if(!Ge){ge.push(z,ue,K);continue}if(Ne++,Ge===3){let ot=qe(z,ue),it=qe(ue,K),ln=qe(K,z);ge.push(z,ot,ln,ot,ue,it,ln,it,K,ot,it,ln);continue}for(;!(Ge===1?q(z,ue):q(z,ue)&&q(ue,K));){let ot=z;z=ue,ue=K,K=ot}if(Ge===1){let ot=qe(z,ue);ge.push(z,ot,K,ot,ue,K)}else{let ot=qe(z,ue),it=qe(ue,K);ge.push(z,ot,K,ot,ue,it,ot,it,K)}}if(W=ge,!Ne)break}for(let F=0;F<J.length;F+=3){let Q=Math.hypot(J[F],J[F+1],J[F+2])||1;J[F]/=Q,J[F+1]/=Q,J[F+2]/=Q}let G=new Ei;return G.setAttribute("position",new fi(Y,3)),G.setAttribute("normal",new fi(J,3)),G.setIndex(Y.length/3>65535?new ta(W,1):new ea(W,1)),G}function ne(x){let S=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],M=[0,0,0,0];x.forEach(G=>{let F=[G.x,G.y,G.z,1],Q=-(G.x*G.x+G.y*G.y+G.z*G.z);for(let ge=0;ge<4;ge++){M[ge]+=F[ge]*Q;for(let Ne=0;Ne<4;Ne++)S[ge][Ne]+=F[ge]*F[Ne]}});for(let G=0;G<4;G++){let F=G;for(let Q=G+1;Q<4;Q++)Math.abs(S[Q][G])>Math.abs(S[F][G])&&(F=Q);[S[G],S[F]]=[S[F],S[G]],[M[G],M[F]]=[M[F],M[G]];for(let Q=0;Q<4;Q++)if(Q!==G){let ge=S[Q][G]/S[G][G];for(let Ne=G;Ne<4;Ne++)S[Q][Ne]-=ge*S[G][Ne];M[Q]-=ge*M[G]}}let L=M[0]/S[0][0],Y=M[1]/S[1][1],J=M[2]/S[2][2],W=M[3]/S[3][3],_e=new T(-L/2,-Y/2,-J/2);return{c:_e,r:Math.sqrt(Math.max(0,_e.lengthSq()-W))}}function yi(x,S){let M=Math.max(...x.map(W=>W.y)),L=x.filter(W=>W.y>M-.06),Y=Math.max(...L.map(S)),J=ne(L.filter(W=>S(W)>Y-.03));for(let W=0;W<2;W++){let _e=x.filter(G=>Math.abs(G.distanceTo(J.c)-J.r)<.004);_e.length>20&&(J=ne(_e))}return J}function Bt(x){let S=[];if(B.forEach(k=>_t(k.mesh,z=>S.push(z.clone()))),!S.length)return null;let M=se?-1:1,L=k=>M*k.x,Y=S.map(k=>k.y),J=Math.max(...Y),W=Math.min(...Y),_e=J-W,G=String(x).toLowerCase(),F={},Q=(k,z,ue,K,he)=>{F[k]={pred:z,f:ue,tol:K,reach:he||.05}},ge=(k,z,ue)=>k.y>=z&&k.y<=ue;if(/femur|femoral/.test(B[0].name.toLowerCase())){let k=S.filter(Se=>Se.y>J-.06),z=Math.max(...k.map(L)),ue=k.filter(Se=>L(Se)>z-.025),K=ue.reduce((Se,ie)=>Se.add(ie),new T).multiplyScalar(1/ue.length),he=Math.max(...ue.map(Se=>Se.distanceTo(K))),Ge=S.filter(Se=>Se.y>J-.09).reduce((Se,ie)=>!Se||-L(ie)>-L(Se)?ie:Se,null),ot=S.filter(Se=>Se.y<W+.11),it=(Math.max(...ot.map(L))+Math.min(...ot.map(L)))/2,ln=K.clone().lerp(Ge,.45),Xt=yi(S,L);Q("head",Se=>Se.y>J-.08,Se=>-Math.abs(Se.distanceTo(Xt.c)-Xt.r),.003,.06),Q("neck",Se=>Se.y>J-.09,Se=>-Se.distanceTo(ln),.012,.02),Q("greater trochanter",Se=>Se.y>J-.09,Se=>-L(Se)+Se.y*.3,.012,.04),Q("lesser trochanter",Se=>ge(Se,J-.12,J-.06),Se=>L(Se)-Se.z,.008,.025);let Rt={};S.forEach(Se=>{let ie=Math.round(Se.y/.008);(Rt[ie]==null||Se.z<Rt[ie])&&(Rt[ie]=Se.z)}),Q("linea aspera",Se=>ge(Se,W+.3*_e,W+.75*_e),Se=>-(Se.z-Rt[Math.round(Se.y/.008)]),.003,.25),Q("medial condyle",Se=>ge(Se,W,W+.045),Se=>L(Se)-.6*(Se.y-W),.016,.04),Q("lateral condyle",Se=>ge(Se,W,W+.045),Se=>-L(Se)-.6*(Se.y-W),.016,.04),Q("medial epicondyle",Se=>ge(Se,W+.035,W+.075),Se=>L(Se),.006,.025),Q("lateral epicondyle",Se=>ge(Se,W+.035,W+.075),Se=>-L(Se),.006,.025),Q("adductor tubercle",Se=>ge(Se,W+.07,W+.1),Se=>L(Se),.004,.018),Q("intercondylar fossa",Se=>ge(Se,W+.005,W+.04)&&Math.abs(L(Se)-it)<.012,Se=>-Se.z,.012,.03),Q("patellar surface",Se=>ge(Se,W+.025,W+.07)&&Math.abs(L(Se)-it)<.022,Se=>Se.z,.008,.04)}else{let k=[];N.filter(ie=>ie.name==="Femur").forEach(ie=>_t(ie.mesh,fe=>k.push(fe.clone())));let z=k.length?Math.max(...k.map(ie=>ie.y)):W+.4*_e,ue=k.filter(ie=>ie.y>z-.05),K=ue.length?Math.max(...ue.map(L)):0,he=ue.filter(ie=>L(ie)>K-.025),Ge=he.reduce((ie,fe)=>ie.add(fe),new T).multiplyScalar(1/Math.max(1,he.length)),ot=Ge.y,it=Ge.z,ln=Math.max(...S.map(L)),Xt=S.filter(ie=>ie.y>ot+.04).reduce((ie,fe)=>!ie||fe.z+.2*fe.y>ie.z+.2*ie.y?fe:ie,null).y,Rt=Math.min(...S.filter(ie=>ie.z<it).map(ie=>ie.y));Q("iliac crest",()=>!0,ie=>ie.y,.012,.12),Q("anterior superior iliac spine",ie=>ie.y>ot+.04,ie=>ie.z+.2*ie.y,.006,.02),Q("asis",ie=>ie.y>ot+.04,ie=>ie.z+.2*ie.y,.006,.02),Q("anterior inferior iliac spine",ie=>ie.y>ot+.01&&ie.y<ot+.035&&ie.z>it,ie=>ie.z,.005,.018),Q("posterior superior iliac spine",ie=>ie.y>ot+.03&&L(ie)>ln-.06,ie=>-ie.z,.006,.02),Q("ischial tuberosity",ie=>ie.z<it,ie=>-ie.y,.012,.035),Q("ischial spine",ie=>ie.y>Rt+.025&&ie.y<ot&&ie.z<it-.015,ie=>L(ie),.004,.015),Q("pubic symphysis",()=>!0,ie=>L(ie),.005,.03),Q("pubic tubercle",ie=>L(ie)>ln-.035&&L(ie)<ln-.012,ie=>ie.z+.5*ie.y,.005,.015);let Se=k.length?yi(k,L):{c:Ge,r:.024};Q("acetabulum",ie=>ie.distanceTo(Se.c)<Se.r+.02,ie=>-Math.abs(ie.distanceTo(Se.c)-(Se.r+.002)),.005,.06)}let Ne=Object.keys(F).find(k=>G.indexOf(k)>=0);if(!Ne)return null;let Ve=F[Ne],qe=S.filter(Ve.pred);if(!qe.length)return null;let lt=qe[0],q=Ve.f(qe[0]);return qe.forEach(k=>{let z=Ve.f(k);z>q&&(q=z,lt=k)}),{pt:lt,inPatch:k=>Ve.pred(k)&&Ve.f(k)>=q-Ve.tol&&k.distanceTo(lt)<Ve.reach,soft:k=>Math.min(1,(Ve.f(k)-(q-Ve.tol))/(Ve.tol*.5))}}R("landmark");let Yt=cr(e.region||"")==="canal"&&/mater|dura/i.test(e.name||"");Yt?(te.makeEmpty(),B.forEach(x=>_t(x.mesh,S=>{S.y>1.17&&S.y<1.23&&te.expandByPoint(S)})),te.isEmpty()&&B.forEach(x=>te.union(x.box)),te.expandByScalar(.006)):cr(e.region||"")==="plexus"?(te.makeEmpty(),Oe&&Oe.pts?Oe.pts.forEach(x=>te.expandByPoint(x)):B.forEach(x=>te.union(x.box)),te.min.y=Math.max(te.min.y,1.25),te.max.y=Math.min(te.max.y,1.52),te.min.y>=te.max.y&&(te.min.y=1.3,te.max.y=1.42),te.expandByScalar(.025)):tt&&(te.makeEmpty(),Oe.pts?(Oe.pts.forEach(x=>te.expandByPoint(x)),te.expandByScalar(.025)):te.expandByPoint(tt).expandByScalar(.03)),$e||($e=te.isEmpty()?ix.limb:[te.min.y-.12,te.max.y+.12]);let Mt=B.length&&B.every(x=>x.layer==="ligament"||x.layer==="capsule"),On=B.length&&B.every(x=>x.layer==="bone"),Qt=!On&&B.length&&B.every(x=>x.layer==="bone"||x.layer==="ligament"||x.layer==="capsule"),D=new Set(yc(e.show||(On?"bone":Mt||Qt?"bone,ligament":de==="nerve"?"bone,muscle,nerve,ligament":"bone,muscle,ligament")).map(cr).map(x=>x.replace(/s$/,"").replace("artery","vessel").replace("arterie","vessel"))),C=x=>x.box.max.y>$e[0]&&x.box.min.y<$e[1],ce=cr(e.region||"")==="vertebra";N.forEach(x=>{x.mesh.visible=ce?B.includes(x):C(x)&&(D.has(x.layer)||B.includes(x)||de==="nerve"&&ye.includes(x))});let Ce=new sn;N.forEach(x=>{x.mesh.visible&&Ce.union(x.box)}),Ce.min.y=Math.max(Ce.min.y,$e[0]),Ce.max.y=Math.min(Ce.max.y,$e[1]);let Ae=(x,S,M)=>{x.mesh.material.color.setHex(S),x.mesh.material.emissive.setHex(M||0)},He=!1,at=(x,S)=>{let M=x.mesh.material;M.transparent!==S<1&&(M.needsUpdate=!0),M.transparent=S<1,M.opacity=S,M.depthWrite=!0,x.mesh.renderOrder=S<1?1+N.indexOf(x)/1e4:0},Ze=x=>x.layer==="vessel"||x.layer==="vein"?Ae(x,x.layer==="vein"?5213439:16726843,x.layer==="vein"?731776:6949386):Ae(x,new Tt(x.mesh.userData.base).lerp(new Tt(nx),.6).getHex(),666684),Ye=[],Dt=[],Vt=[],Le=null,Sn=[];if(tt){let x=L=>{let Y=new Tt(L);B.forEach(J=>{let W=J.mesh.geometry,_e=W.attributes.position,G=_e.count,F=new Float32Array(G*3),Q=new Float32Array(G),ge=new Tt(J.mesh.userData.base),Ne=new T;for(let Ve=0;Ve<G;Ve++){Ne.fromBufferAttribute(_e,Ve).applyMatrix4(J.mesh.matrixWorld);let qe=Oe.W?Oe.W.get(J)?Oe.W.get(J)[Ve]:0:Oe.inPatch(Ne)?Math.max(0,Math.min(1,Oe.soft(Ne))):0,lt=ge.clone().lerp(Y,qe*.85);F[Ve*3]=lt.r,F[Ve*3+1]=lt.g,F[Ve*3+2]=lt.b,Q[Ve]=qe}W.setAttribute("color",new An(F,3)),W.setAttribute("jkw",new An(Q,1)),J.mesh.material.vertexColors=!0,J.mesh.material.color.setHex(16777215),J.mesh.material.needsUpdate=!0});try{zn=!0}catch{}},S=Ie[String(e.landmark).toLowerCase().trim()];if(S&&S.outline&&Oe.pts&&Oe.pts.length>12&&!(de==="find"&&!ee)){let L=Oe.pts,Y=L.reduce((Ne,Ve)=>Ne.add(Ve),new T).multiplyScalar(1/L.length),J=[[0,0,0],[0,0,0],[0,0,0]];L.forEach(Ne=>{let Ve=[Ne.x-Y.x,Ne.y-Y.y,Ne.z-Y.z];for(let qe=0;qe<3;qe++)for(let lt=0;lt<3;lt++)J[qe][lt]+=Ve[qe]*Ve[lt]});let W=(Ne,Ve)=>{let qe=new T(.3,.8,.5);for(let lt=0;lt<30;lt++){let q=new T(Ne[0][0]*qe.x+Ne[0][1]*qe.y+Ne[0][2]*qe.z,Ne[1][0]*qe.x+Ne[1][1]*qe.y+Ne[1][2]*qe.z,Ne[2][0]*qe.x+Ne[2][1]*qe.y+Ne[2][2]*qe.z);Ve&&q.addScaledVector(Ve,-q.dot(Ve)),qe=q.normalize()}return qe},_e=W(J),G=W(J,_e),F=64,Q=Array.from({length:F},()=>[]);L.forEach(Ne=>{let Ve=Ne.clone().sub(Y),qe=Math.atan2(Ve.dot(G),Ve.dot(_e));Q[Math.floor((qe+Math.PI)/(2*Math.PI)*F)%F].push(Ne)});let ge=Q.map(Ne=>Ne.length?S.outline==="loop"?Ne.reduce((Ve,qe)=>!Ve||qe.distanceToSquared(Y)<Ve.distanceToSquared(Y)?qe:Ve,null):Ne.reduce((Ve,qe)=>Ve.add(qe),new T).multiplyScalar(1/Ne.length):null);if(S.outline==="arc"){let Ne={};L.forEach(lt=>{let q=Math.round(lt.y/.003);(Ne[q]||(Ne[q]=[])).push(lt)});let Ve=Object.keys(Ne).map(Number).sort((lt,q)=>lt-q);ge=[];let qe=null;Ve.forEach(lt=>{let q=Ne[lt];if(qe){let k=q.filter(z=>z.distanceTo(qe)<.009);if(!k.length)return;q=k}else{let k=q.reduce((z,ue)=>z.add(ue),new T).multiplyScalar(1/q.length);q=q.filter(z=>z.distanceTo(k)<.008),q.length||(q=Ne[lt])}qe=q.reduce((k,z)=>k.add(z),new T).multiplyScalar(1/q.length),ge.push(qe.clone())})}if(ge=ge.filter(Boolean),ge.length>5){let Ne=ge.map((lt,q)=>{let k=ge[(q-1+ge.length)%ge.length],z=ge[(q+1)%ge.length];return S.outline==="arc"&&(q===0||q===ge.length-1)?lt.clone():lt.clone().multiplyScalar(.5).addScaledVector(k,.25).addScaledVector(z,.25)}),Ve=new Qa(Ne,S.outline==="loop"),qe=new Tn(new Pl(Ve,160,.0013,8,S.outline==="loop"),new Gi({color:4642047}));qe.renderOrder=12,O.add(qe)}}let M=/intervertebral foramen/.test(String(e.landmark).toLowerCase());Le={material:{color:{setHex:L=>{M||x(L)}}},set visible(L){L&&!M&&x(3524863)}},Le.visible=!(de==="find"&&!ee),/intervertebral foramen/.test(String(e.landmark).toLowerCase())&&Oe.pts&&Object.values(Oe.ivf||{}).forEach(L=>{let Y=L.top>-1e8?L.top:L.pt,J=L.bot<1e8?L.bot:L.pb;if(!(L.n>4&&Y>J))return;L.top=Y,L.bot=J;let W=L.xs/L.n,_e=L.zs/L.n,G=[];B.forEach(he=>_t(he.mesh,Ge=>{Math.abs(Ge.x-W)<.007&&G.push([Ge.z,Ge.y])}));let F=_e,Q=(L.top+L.bot)/2,ge=0;for(let he=_e-.018;he<=_e+.003;he+=.001)for(let Ge=L.bot-.006;Ge<=L.top+.022;Ge+=.001){let ot=1e9;for(let it of G){let ln=it[0]-he,Xt=it[1]-Ge,Rt=ln*ln+Xt*Xt;if(Rt<ot&&(ot=Rt),ot<ge*ge)break}ot=Math.sqrt(ot),ot>ge&&(ge=ot,F=he,Q=Ge)}if(ge<.002)return;let Ne=F,Ve=Q,qe=Math.min(ge*1.35,.013),lt=Math.min(ge*.95,.009),q=[W,Ve,Ne],k=[],z=40;for(let he=0;he<z;he++){let Ge=he/z*2*Math.PI;q.push(W,Ve+Math.sin(Ge)*qe,Ne+Math.cos(Ge)*lt),k.push(0,1+he,1+(he+1)%z)}let ue=new Ei;ue.setAttribute("position",new fi(q,3)),ue.setIndex(k);let K=new Tn(ue,new Gi({color:3524863,transparent:!0,opacity:.65,side:Si,depthWrite:!1}));K.renderOrder=15,O.add(K),K.visible=!(de==="find"&&!ee),Sn.push(K);for(let he=0;he<=8;he++){let Ge=he/8*2*Math.PI;Ht.push(new T(W,Ve+(he<8?Math.sin(Ge)*qe*.7:0),Ne+(he<8?Math.cos(Ge)*lt*.7:0)))}}),ee&&Ye.push({text:e.name,pts:[tt],cls:"hl"})}if(tt)B.some(x=>x.layer!=="bone")&&(Vt=B);else if(de==="name")B.forEach(Ze),Vt=B,ee&&Ye.push({text:e.name,parts:B,cls:"hl"});else if(de==="find")ze&&N.forEach(x=>{x.layer==="muscle"&&at(x,.15),x.layer===B[0].layer&&C(x)&&(x.mesh.visible=!0)}),ee&&(B.forEach(x=>Ae(x,bu,667672)),Vt=B,Ye.push({text:e.name,parts:B,cls:"ok"}));else if(de==="attach")B.forEach(Ze),Vt=B,ee&&B.some(x=>x.layer==="ligament")?Ye.push({text:e.name,parts:B,cls:"hl"}):ee&&(N.forEach(x=>{x.layer==="muscle"&&!B.includes(x)&&(x.mesh.visible=!1)}),B.forEach(x=>at(x,.6)),Wt());else if(de==="nerve")B.forEach(Ze),Vt=B,ee?(N.forEach(x=>{x.layer==="muscle"&&!B.includes(x)&&at(x,.12)}),B.forEach(x=>at(x,.55)),ye.forEach(x=>{x.mesh.visible=!0,Ae(x,16769354,6967808)}),ye.length&&Ye.push({text:e.nervename||ye[0].name,parts:ye.filter(x=>x.name===ye[0].name),cls:"nerve"}),Ye.push({text:e.name,parts:B,cls:"hl"})):ye.forEach(x=>{x.mesh.visible=!1}),N.forEach(x=>{x.layer==="nerve"&&!ye.includes(x)&&!ee&&(x.mesh.visible=!1)});else if(de==="nerveid"){if(N.forEach(S=>{S.layer==="muscle"&&at(S,.18)}),ee){let S=L=>String(L).replace(/\.[lr]$/,""),M=new Set;Object.keys(Tf).forEach(L=>{B.some(Y=>S(Y.name)===S(L))&&Tf[L].forEach(Y=>M.add(S(Y)))}),M.size&&N.forEach(L=>{L.layer==="muscle"&&L.mesh.visible&&M.has(S(L.name))&&at(L,.6)})}let x=B[0]&&(B[0].layer==="vessel"||B[0].layer==="vein")?B[0].layer:null;if(x){N.forEach(G=>{G.layer===x&&C(G)&&!B.includes(G)&&(G.mesh.visible=!0,at(G,.28))});let S=[];B.forEach(G=>_t(G.mesh,F=>S.push(F.clone())));let M=.004,L=new Map,Y=(G,F,Q)=>G+","+F+","+Q;S.forEach(G=>{let F=Y(Math.floor(G.x/M),Math.floor(G.y/M),Math.floor(G.z/M));(L.get(F)||L.set(F,[]).get(F)).push(G)});let J=new sn;B.forEach(G=>J.union(G.box)),J.expandByScalar(.004);let W=G=>{if(!G.box.intersectsBox(J))return!1;let F=G.mesh.geometry.attributes.position,Q=new T,ge=Math.max(1,Math.floor(F.count/1500));for(let Ne=0;Ne<F.count;Ne+=ge){Q.fromBufferAttribute(F,Ne).applyMatrix4(G.mesh.matrixWorld);let Ve=Math.floor(Q.x/M),qe=Math.floor(Q.y/M),lt=Math.floor(Q.z/M);for(let q=-1;q<=1;q++)for(let k=-1;k<=1;k++)for(let z=-1;z<=1;z++){let ue=L.get(Y(Ve+q,qe+k,lt+z));if(ue){for(let K of ue)if(K.distanceToSquared(Q)<.0025*.0025)return!0}}}return!1},_e=[];N.forEach(G=>{G.layer!==x||B.includes(G)||B.some(F=>F.name===G.name)||W(G)&&(G.mesh.visible=!0,at(G,1),Ae(G,10132899,1052688),G._link=!0,_e.push(G))}),ee&&_e.sort((G,F)=>F.box.getSize(new T).length()-G.box.getSize(new T).length()).slice(0,4).forEach(G=>Dt.push({text:G.name,parts:[G],cls:"minor"}))}B.forEach(S=>{S.mesh.visible=!0,x?Ze(S):Ae(S,nx,670288)}),ee&&Ye.push({text:e.name,parts:B,cls:"hl"})}else de==="action"&&(B.forEach(Ze),Vt=B);if(cr(e.region||"")==="canal"){let x=B.some(M=>/arachnoid/i.test(M.name)),S=/pia mater/i.test(e.name||"");N.forEach(M=>{if(!B.includes(M))if(M.layer==="muscle"||M.layer==="ligament"||M.layer==="capsule"&&!/dura/i.test(M.name))M.mesh.visible=!1;else if(M.layer==="bone")at(M,/vertebra|atlas|axis|sacrum|coccyx/i.test(M.name)?.22:.1);else if(M.name==="Spinal dura (opened)"&&(x||S))M.mesh.visible=!0,Ae(M,12096874);else if(M.name==="Arachnoid mater (opened)"&&S)M.mesh.visible=!0,Ae(M,13227750);else if(/dura|arachnoid/i.test(M.name)){M.mesh.visible=!1;let L=M.mesh.material;L.colorWrite=!1,L.depthWrite=!1,L.needsUpdate=!0}else M.layer==="nerve"&&/spinal cord|cauda|root of spinal|spinal ganglion|dorsal rami/i.test(M.name)&&(M.mesh.visible=!0)}),Yt||B.forEach(M=>{M.mesh.visible=!0,M.mesh.renderOrder=20;let L=M.mesh.material;L.depthTest=!1,L.transparent=!0,L.opacity=1,L.needsUpdate=!0})}if(cr(e.region||"")==="plexus"){let x=/brachial plexus|musculocutaneous|axillary nerve|^radial nerve|^median nerve|^ulnar nerve|dorsal scapular|long thoracic|suprascapular nerve|pectoral nerve|subscapular nerve|thoracodorsal|medial brachial cutaneous|medial antebrachial cutaneous/i;N.forEach(S=>{S.layer==="nerve"&&x.test(S.name)?(S.mesh.visible=!0,B.includes(S)||(S.mesh.renderOrder=2)):S.layer==="muscle"&&!B.includes(S)&&at(S,.1)})}if(B.length&&!tt&&!(de==="find"&&!ee)){let x=new Wi({vertexShader:"varying vec3 vn; varying vec3 vv; void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.); vn = normalize(normalMatrix * normal); vv = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }",fragmentShader:"varying vec3 vn; varying vec3 vv; void main(){ float r = 1. - abs(dot(normalize(vn), normalize(vv))); float a = 0.1 + 0.55 * pow(r, 2.2); gl_FragColor = vec4(0.42, 0.82, 1.0, a); }",transparent:!0,depthTest:!0,depthWrite:!1,depthFunc:pf,side:Vi});B.forEach(S=>{let M=new Tn(S.mesh.geometry,x);M.renderOrder=20,M.raycast=()=>{},S.mesh.add(M)})}if(ee&&B.length&&!ze&&["name","find","attach","nerve","action"].includes(de)&&(de!=="attach"&&!tt&&!B.some(x=>x.layer==="ligament"||x.layer==="capsule"||x.layer==="bone")&&Wt(!0),de!=="nerve"&&de!=="attach"&&ye.length)){ye.forEach(S=>{S.mesh.visible=!0,Ae(S,14270576,2761216)});let x=ye[0].name;Dt.push({text:"Nerve \xB7 "+x,parts:ye.filter(S=>S.name===x),cls:"minor"})}function rn(x){if(x=String(x||"").toLowerCase(),!x)return new Set;let S=new Set,M=F=>N.some(Q=>Q.name===F&&Q.layer==="bone"),L=[["Scapula",/scapul|coracoid|acromion|glenoid|supraspinous|infraspinous|subscapular fossa|inferior angle|lateral border/],["Clavicle",/clavic/],["Humerus",/humer|intertubercular|deltoid tuberosity|epicondyle|supracondylar|tubercle of the humerus/],["Radius",/radius|radial tuberosity|radial shaft|supinator crest(?!)/],["Ulna",/ulna\b|ulna |olecranon|coronoid|ulnar tuberosity|supinator crest/],["Pisiform bone",/pisiform/],["Hamate bone",/hamate/],["Trapezium bone",/trapezium/],["Trapezoid bone",/trapezoid/],["Capitate bone",/capitate/],["Scaphoid bone",/scaphoid/],["Lunate bone",/lunate/],["Triquetrum bone",/triquetrum/],["Femur",/femur|trochanter|linea aspera|femoral/],["Tibia",/tibia/],["Fibula",/fibula/],["Hip bone",/ilium|ischi|pubi|iliac|hip bone/],["Sacrum",/sacrum|sacral/],["Calcaneus",/calcane/],["Patella",/patell/]],Y=F=>F.name.replace(/\.[lr]$/,"");L.forEach(([F,Q])=>{Q.test(x)&&N.forEach(ge=>{ge.layer==="bone"&&Y(ge)===F&&S.add(ge.name)})}),[[/spinous|vertebra|transverse process|nuchal|lamina/,F=>/^(vertebra |atlas|axis)/i.test(F.name)],[/\bribs?\b|costal/,F=>/\brib\b/i.test(F.name)],[/occipit|mastoid|skull/,F=>/occipital|temporal/i.test(F.name)],[/sacrum|sacral/,F=>/^sacrum/i.test(F.name)],[/cervical/,F=>/^(vertebra c|atlas|axis)/i.test(F.name)],[/thoracic/,F=>/^vertebra t/i.test(F.name)]].forEach(([F,Q])=>{F.test(x)&&N.forEach(ge=>{ge.layer==="bone"&&Q(ge)&&S.add(ge.name)})}),/cervical/.test(x)&&/thoracic/.test(x)||(/cervical/.test(x)?[...S].forEach(F=>{/^vertebra [tl]/i.test(F)&&S.delete(F)}):/thoracic/.test(x)&&[...S].forEach(F=>{/^(vertebra [cl]|atlas|axis)/i.test(F)&&S.delete(F)}));let W={first:/1st|first|thumb/,second:/2nd|second|index/,third:/3rd|third/,fourth:/4th|fourth/,fifth:/5th|fifth|little/},_e=x.match(/(\d)(?:st|nd|rd|th)?\s*[–-]\s*(\d)/),G=new Set;if(Object.keys(W).forEach(F=>{W[F].test(x)&&G.add(F)}),_e&&["first","second","third","fourth","fifth"].slice(+_e[1]-1,+_e[2]).forEach(F=>G.add(F)),/metacarpal/.test(x)&&N.forEach(F=>{let Q=F.name.match(/^(\w+) metacarpal bone$/i);Q&&(!G.size||G.has(Q[1].toLowerCase()))&&S.add(F.name)}),/phalan/.test(x)){let F=["proximal","middle","distal"].filter(Q=>x.indexOf(Q)>=0);N.forEach(Q=>{let ge=Q.name.match(/^(proximal|middle|distal) phalanx of (\w+) finger of hand$/i);ge&&(!F.length||F.includes(ge[1].toLowerCase()))&&(!G.size||G.has(ge[2].toLowerCase()))&&S.add(Q.name)})}return S}function Wt(x,S){let M={o:rn(e.origin),i:rn(e.insertion)},L=[];if(B.forEach(K=>_t(K.mesh,he=>L.push(he.clone()))),!L.length)return;let Y=.006,J=new Map,W=(K,he,Ge)=>K+","+he+","+Ge;L.forEach(K=>{let he=W(Math.floor(K.x/Y),Math.floor(K.y/Y),Math.floor(K.z/Y));(J.get(he)||J.set(he,[]).get(he)).push(K)});let _e=new sn;B.forEach(K=>_e.union(K.box));let G=_e.max.y-_e.min.y,F=_e.max.y-.35*G,Q=.0065,ge=L[0];L.forEach(K=>{K.y>ge.y&&(ge=K)});let Ne=L[0],Ve=-1;L.forEach(K=>{let he=K.distanceToSquared(ge);he>Ve&&(Ve=he,Ne=K)});let qe=_e.min.y+.22*G,lt=!1;{let K=Y;N.forEach(he=>{lt||he.layer!=="bone"||!he.mesh.visible||he.box.distanceToPoint(Ne)>.02||_t(he.mesh,Ge=>{!lt&&Ge.distanceTo(Ne)<.015&&(lt=!0)})})}let q=S?K=>K.y<=qe:K=>K.distanceTo(Ne)<(lt?.03:.05)&&K.y<=qe+.02,k={o:[],i:[]},z={},ue=!S&&M.o.size&&M.i.size&&[...M.o].some(K=>!M.i.has(K))&&[...M.i].some(K=>!M.o.has(K));if(N.forEach(K=>{if(K.layer!=="bone"||!K.mesh.visible||!K.box.clone().expandByScalar(.01).intersectsBox(_e))return;let he=K.mesh.geometry,Ge=he.attributes.position,ot=Ge.count,it=new Float32Array(ot*3),ln=new Tt(K.mesh.userData.base),Xt=new Tt(QE),Rt=new Tt(e1),Se=new T,ie=!1,fe=[],xe=[],Me=[];for(let Ee=0;Ee<ot;Ee++){Se.fromBufferAttribute(Ge,Ee).applyMatrix4(K.mesh.matrixWorld);let Te=!1,yt=Math.floor(Se.x/Y),Ke=Math.floor(Se.y/Y),pt=Math.floor(Se.z/Y);for(let ut=-1;ut<=1&&!Te;ut++)for(let en=-1;en<=1&&!Te;en++)for(let Pn=-1;Pn<=1&&!Te;Pn++){let Wn=J.get(W(yt+ut,Ke+en,pt+Pn));if(Wn){for(let Oi of Wn)if(Oi.distanceToSquared(Se)<Q*Q){Te=!0;break}}}let st=Te?q(Se)?2:Se.y>=F?1:0:0;if(Te&&ue){let ut=M.o.has(K.name),en=M.i.has(K.name);st=ut&&!en?1:en&&!ut?2:ut&&en?st:0}let un=st===1?Xt:st===2?Rt:ln;it[Ee*3]=un.r,it[Ee*3+1]=un.g,it[Ee*3+2]=un.b,st&&(ie=!0,(st===1?k.o:k.i).push(Se.clone()),fe.push(Se.clone()),(st===1?xe:Me).push(Se.clone()))}let oe=K.name==="Hip bone"?"Hip bone":K.name.replace(/ bone$/,""),$=(Ee,Te)=>{if(Te.length<6)return;let yt=Ee+oe;z[yt]?z[yt].pts.push(...Te):z[yt]={k:Ee,text:(x?Ee+" \xB7 ":"")+oe,pts:Te.slice()}};$("Origin",xe),$("Insertion",Me),!x&&ie&&(he.setAttribute("color",new An(it,3)),K.mesh.material.vertexColors=!0,K.mesh.material.color.setHex(16777215),K.mesh.material.needsUpdate=!0)}),!S&&(!Object.values(z).some(K=>K.k==="Insertion")||ue&&!Object.values(z).some(K=>K.k==="Origin")))return N.forEach(K=>{K.layer==="bone"&&K.mesh.material.vertexColors&&(K.mesh.geometry.deleteAttribute("color"),K.mesh.material.vertexColors=!1,K.mesh.material.color.setHex(K.mesh.userData.base),K.mesh.material.needsUpdate=!0)}),Wt(x,!0);["Origin","Insertion"].forEach(K=>{let he=Object.values(z).filter(it=>it.k===K),Ge=it=>K==="Origin"?Math.max(...it.pts.map(ln=>ln.y)):-Math.min(...it.pts.map(ln=>ln.y)),ot=ue?-1e9:Math.max(-1e9,...he.map(Ge));he.filter(it=>Ge(it)>=ot-.025).sort((it,ln)=>ln.pts.length-it.pts.length).slice(0,2).forEach(it=>Dt.push({text:it.text,pts:it.pts,cls:"minor"}))}),!x&&(Ye.push({text:e.name,parts:B,cls:"hl"}),k.o.length&&Ye.push({text:"Origin",pts:k.o,cls:"orig"}),k.i.length&&Ye.push({text:"Insertion",pts:k.i,cls:"ins"}))}function _t(x,S){let M=x.geometry.attributes.position,L=new T;for(let Y=0;Y<M.count;Y++)S(L.fromBufferAttribute(M,Y).applyMatrix4(x.matrixWorld))}let rt=0,Ot=de==="peel"&&be.length?document.createElement("div"):null;function Mn(x){if(rt=Math.max(0,Math.min(be.length,x)),be.forEach((S,M)=>S.forEach(L=>{L.mesh.visible=M>=rt&&C(L),Ae(L,L.mesh.userData.base)})),Ye.length=0,ee&&rt<be.length){let S={};be[rt].forEach(M=>{Ze(M);let L=M.name.replace(/ muscle$/,"");S[L]?S[L].parts.push(M):Object.keys(S).length<6&&Ye.push(S[L]={text:L,parts:[M],cls:"hl"})})}Ot&&(Ot.querySelector("input").value=rt,Ot.querySelector("span").textContent=rt?"Removed: "+rt+" layer"+(rt>1?"s":""):"All layers"),Gr(),zn=!0}Ot&&(Ot.className="jka-peel",Ot.innerHTML='<input type="range" min="0" max="'+be.length+'" step="1"><span></span>',Ot.querySelector("input").oninput=x=>Mn(+x.target.value),c.appendChild(Ot));let Ue=new hi(30,1,.01,20),Pe=new Ld(Ue,u.domElement);Pe.enableDamping=!0,Pe.dampingFactor=.12,Pe.screenSpacePanning=!0,Pe.enableZoom=!1,Pe.enablePan=!1,Pe.mouseButtons={LEFT:$m.ROTATE,MIDDLE:null,RIGHT:null};let Fe=new et,H=0;function Xe(){ts&&(Ue.setViewOffset(ts,I,-Fe.x,-Fe.y+H,ts,I),Ue.updateProjectionMatrix())}let ke=u.domElement;ke.addEventListener("contextmenu",x=>{x.preventDefault(),x.stopImmediatePropagation()},!0),s.addEventListener("contextmenu",x=>{x.target===ke&&(x.preventDefault(),x.stopPropagation())},!0);let bt=null;ke.addEventListener("pointerdown",x=>{(x.button===2||x.button===1||x.button===0&&x.shiftKey)&&(x.preventDefault(),x.stopImmediatePropagation(),bt={x:x.clientX,y:x.clientY,x0:x.clientX,y0:x.clientY,b:x.button},ke.setPointerCapture(x.pointerId),qr(),St=null)},!0),ke.addEventListener("pointermove",x=>{if(!bt)return;let S=ke.getBoundingClientRect(),M=ts/S.width;Fe.x+=(x.clientX-bt.x)*M,Fe.y+=(x.clientY-bt.y)*M,bt.x=x.clientX,bt.y=x.clientY,Xe(),So(),ee||ti()}),ke.addEventListener("pointerup",x=>{bt&&bt.b===2&&Math.hypot(x.clientX-bt.x0,x.clientY-bt.y0)<5&&wu(x.clientX,x.clientY),bt=null}),ke.addEventListener("pointercancel",()=>{bt=null});function Ut(x,S,M){let L=Ue.position.clone().sub(Pe.target),Y=L.length(),J=Math.max(ai?.15:.04,Math.min(ai?14:3,Y*M)),W=J/Y,_e=ke.getBoundingClientRect(),G=(x-_e.left)/_e.width*2-1,F=-(S-_e.top)/_e.height*2+1;Zt.setFromCamera(new et(G,F),Ue),Zt.far=1/0;let Q=Zt.intersectObjects(N.filter(qe=>qe.mesh.visible&&qe.mesh.material.opacity>.3).map(qe=>qe.mesh),!1)[0],ge=Q?Q.point.clone():Pe.target.clone(),Ne=ge.clone().project(Ue);Ue.position.copy(Pe.target).addScaledVector(L,W),Ue.updateMatrixWorld(),Xe();let Ve=ge.clone().project(Ue);Fe.x+=(Ne.x-Ve.x)/2*ts,Fe.y-=(Ne.y-Ve.y)/2*I,Xe(),Pe.update(),So(),ee||ti()}ke.addEventListener("wheel",x=>{x.preventDefault(),x.stopPropagation();let S=x.deltaY*(x.deltaMode===1?33:x.deltaMode===2?400:1);x.ctrlKey&&(S*=3),Ut(x.clientX,x.clientY,Math.exp(Math.max(-.6,Math.min(.6,S*.0035))))},{passive:!1});let on=new Map,xn=null,Zn=0,oi=!1,Rn=0,_i=0;ke.addEventListener("touchstart",x=>{x.touches.length===1&&(oi=!1,Rn=x.touches[0].clientX,_i=x.touches[0].clientY),x.touches.length>1&&x.cancelable&&x.preventDefault()},{passive:!1}),ke.addEventListener("touchmove",x=>{let S=x.touches[0];S&&(Math.abs(S.clientX-Rn)>6||Math.abs(S.clientY-_i)>6)&&(oi=!0),x.cancelable&&x.preventDefault()},{passive:!1}),ke.addEventListener("touchend",x=>{if(oi||x.touches.length){x.stopPropagation(),x.cancelable&&x.preventDefault();return}if(de==="find"&&!ee){let S=x.changedTouches[0],M=ke.getBoundingClientRect();Zt.setFromCamera(new et((S.clientX-M.left)/M.width*2-1,-(S.clientY-M.top)/M.height*2+1),Ue),Zt.far=1/0,Zt.intersectObjects(N.filter(L=>L.mesh.visible&&L.mesh.material.opacity>.3).map(L=>L.mesh),!1).length&&(x.stopPropagation(),x.cancelable&&x.preventDefault())}},{passive:!1}),ke.addEventListener("pointerdown",x=>{if(x.pointerType==="touch"){if(on.set(x.pointerId,[x.clientX,x.clientY]),clearTimeout(Zn),on.size===1){let S=x.clientX,M=x.clientY;Zn=setTimeout(()=>{let L=on.get(x.pointerId);L&&on.size===1&&Math.hypot(L[0]-S,L[1]-M)<8&&(Pe.drag=null,Pe.spin=null,wu(S,M))},550)}if(on.size===2){Pe.drag=null,Pe.multi=!0,qr();let[S,M]=[...on.values()];xn={d:Math.hypot(S[0]-M[0],S[1]-M[1]),m:[(S[0]+M[0])/2,(S[1]+M[1])/2],ang:Math.atan2(M[1]-S[1],M[0]-S[0])}}}},!0),ke.addEventListener("pointermove",x=>{if(x.pointerType!=="touch"||!on.has(x.pointerId)||(on.set(x.pointerId,[x.clientX,x.clientY]),on.size!==2||!xn))return;x.stopImmediatePropagation();let[S,M]=[...on.values()],L=Math.hypot(S[0]-M[0],S[1]-M[1]),Y=[(S[0]+M[0])/2,(S[1]+M[1])/2],J=ke.getBoundingClientRect(),W=ts/J.width;Fe.x+=(Y[0]-xn.m[0])*W,Fe.y+=(Y[1]-xn.m[1])*W,Xe(),L>10&&xn.d>10&&Ut(Y[0],Y[1],xn.d/L);let _e=Math.atan2(M[1]-S[1],M[0]-S[0]),G=_e-xn.ang;for(;G>Math.PI;)G-=2*Math.PI;for(;G<-Math.PI;)G+=2*Math.PI;xn={d:L,m:Y,ang:_e},So()},!0);let es=x=>{x.pointerType==="touch"&&(on.delete(x.pointerId),clearTimeout(Zn),on.size<2&&(xn=null,on.size||(Pe.multi=!1)))};ke.addEventListener("pointerup",es,!0),ke.addEventListener("pointercancel",es,!0);let lr=(te.isEmpty()?Ce:te).getCenter(new T);(de==="find"||de==="peel")&&Ce.getCenter(lr);let ks=de==="find"||de==="peel"||te.isEmpty()?Ce:te,ur=ks.getSize(new T),zs=ox(e.cam,se),ai=!1,vi=null,Vr=!1;function Mu(){if(window.matchMedia&&(matchMedia("(hover: none)").matches||matchMedia("(max-width: 720px)").matches)){c.style.height="";return}let x=document.getElementById("jk-sc")||document.scrollingElement||document.documentElement,S=c.getBoundingClientRect(),M=S.height/Math.max(1,c.offsetHeight)||1,L=s.closest(".jka-split"),Y=L&&L.querySelector(".jka-right"),J=Y&&getComputedStyle(L).display==="block",W=0;if(J){Y.style.height="auto",Y.style.maxHeight="none",c.style.height="";return}let _e=(window.innerHeight||x.clientHeight)-Math.max(0,S.top)-W-8;if(_e<200)return;let G=Math.floor(_e/M)+"px";Math.abs((parseFloat(c.style.height)||0)-parseFloat(G))>4&&(c.style.height=G),Y&&!J&&(Y.style.height=G,Y.style.maxHeight=G)}function Hs(){Mu();try{let S=c.querySelector(":scope > .jka-chips");if(S&&!(window.matchMedia&&(matchMedia("(hover: none)").matches||matchMedia("(max-width: 720px)").matches))){let M=c.getBoundingClientRect(),L=M.height/Math.max(1,c.offsetHeight)||1;S.style.setProperty("top",Math.round((innerHeight/2-M.top)/L)+"px","important")}}catch{}let x=ai?-10:Math.max(0,c.getBoundingClientRect().left);c.querySelectorAll(":scope > .jka-views, :scope > .jka-chips").forEach(S=>{S.style.marginLeft=-x+"px"})}window.addEventListener("resize",()=>Hs());let ts=600,I=400;function Z(){let x=u.domElement.parentElement||c,S=x.clientWidth||600,M=(x.clientHeight||400)-(ai&&x===c?48:0);ts=S,I=M,u.setSize(S,M,!1),Ue.aspect=S/M,Ue.updateProjectionMatrix(),Xe(),Hs(),p.setAttribute("viewBox","0 0 "+S+" "+M)}Z();let ae=Math.abs(zs.x)>Math.abs(zs.z)?ur.z:ur.x,le=.09,re=.2,ct=1-le-re-.03,Et=Math.max(.22,Math.max(ur.y,ae/Ue.aspect)/ct+.02),kt=Math.tan(lo.degToRad(15)),Gt=Math.min(2.5,Math.max(.15,Et/2/kt+ae/2)),an=2*(Gt-ae/2)*kt;H=(re-le)/2*I*(1-Math.abs(zs.y)),Xe(),Pe.target.copy(lr),Ue.position.copy(lr).addScaledVector(zs,Gt),Ue.up.copy(rx(zs)),Ue.lookAt(lr);let jt=e.mode+"|"+e.name+"|"+e.meshes+"|"+(e.peel||[]).join("/"),zt=window.__jkaCam,St=null;if(ee&&zt&&zt.key===jt){St={p0:zt.pos.clone(),t0:Pe.target.clone(),p1:Ue.position.clone(),t1:Pe.target.clone(),s:0,q0:(zt.pan||new et).clone(),q1:new et},Ue.position.copy(zt.pos).sub(zt.target).add(Pe.target),St.p0.copy(Ue.position),zt.pan&&(Fe.copy(zt.pan),Xe()),["pointerdown","wheel"].forEach(x=>u.domElement.addEventListener(x,()=>{St=null},!0));try{Ue.updateMatrixWorld(),Ue.updateProjectionMatrix();let x=new Ar().setFromProjectionMatrix(new vt().multiplyMatrices(Ue.projectionMatrix,Ue.matrixWorldInverse)),S=new nc,M=N.filter(G=>G.mesh.visible).map(G=>G.mesh),L=new Set(B.map(G=>G.mesh)),Y=0,J=0,W=new T,_e=tt&&Ht.length?Ht.filter((G,F)=>F%Math.max(1,Math.floor(Ht.length/16))===0):[];_e.length||B.forEach(G=>{let F=G.mesh.geometry.attributes.position,Q=Math.max(1,Math.floor(F.count/12));for(let ge=0;ge<F.count;ge+=Q)_e.push(W.fromBufferAttribute(F,ge).applyMatrix4(G.mesh.matrixWorld).clone())}),_e.forEach(G=>{if(Y++,!x.containsPoint(G))return;let F=G.clone().sub(Ue.position),Q=F.length();S.set(Ue.position,F.normalize()),S.far=Q+.002;let ge=S.intersectObjects(M,!1)[0];(!ge||L.has(ge.object)||ge.distance>Q-.004)&&J++}),Y&&J/Y>=.35&&(St.p1=St.p0.clone(),St.keep=!0)}catch{}}let ti=()=>{window.__jkaCam={key:jt,pos:Ue.position.clone(),target:Pe.target.clone(),pan:Fe.clone()}};Pe.minDistance=.05,Pe.maxDistance=3,Pe.update();let Zt=new nc,qi=[];Vt.forEach(x=>{let S=x.mesh.geometry.attributes.position,M=Math.max(1,Math.floor(S.count/24));for(let L=0;L<S.count;L+=M)qi.push(new T().fromBufferAttribute(S,L).applyMatrix4(x.mesh.matrixWorld))});let Cn=new Set,cn=!1;function xo(){if(!cn||!qi.length||He)return;let x=new Set,S=N.filter(M=>M.mesh.visible&&!Vt.includes(M)&&!M._glass&&(M.layer==="muscle"||M.layer==="vessel")).map(M=>M.mesh);for(let M of qi){let L=M.clone().sub(Ue.position),Y=L.length();Zt.set(Ue.position,L.normalize()),Zt.far=Y-.002;for(let J of Zt.intersectObjects(S,!1))x.add(J.object)}N.forEach(M=>{x.has(M.mesh)!==Cn.has(M)&&(zn=!0),x.has(M.mesh)&&!Cn.has(M)?(Cn.add(M),M._a=M.mesh.material.opacity,at(M,.18)):!x.has(M.mesh)&&Cn.has(M)&&(Cn.delete(M),at(M,M._a==null?1:M._a))})}let wn=document.createElement("div");wn.className="jka-labels",c.appendChild(wn);let Yi=[],As={side:{},tg:{},pos:{}},ji=6,yo=90,ci=2*Math.sqrt(90),Vs=500;function va(x){x.pts||(x.pts=[],x.parts.forEach(M=>_t(M.mesh,L=>x.pts.push(L.clone()))));let S=Math.max(1,Math.floor(x.pts.length/48));return x.pts.filter((M,L)=>L%S===0)}function Bi(x){let S=x.reduce((Y,J)=>Y.add(J),new T).multiplyScalar(1/Math.max(1,x.length)),M=x[0],L=1e9;return x.forEach(Y=>{let J=Y.distanceToSquared(S);J<L&&(L=J,M=Y)}),M||S}function Gr(){wn.innerHTML="",p.innerHTML="",Yi=Ye.map(x=>{let S=document.createElement("div");S.className="jka-label "+(x.cls||""),S.textContent=x.text,wn.appendChild(S);let M=va(x),L=Bi(M);return{L:x,k:x.text,el:S,S:M,aT:L,a:L.clone(),hid:!1,w:0,h:0}}),dr=!0;try{document.fonts&&document.fonts.ready.then(()=>{Yi.forEach(x=>{x.w=0}),ba=!0})}catch{}}let Gs=160,ys=100,vc=null,hr=null,ax=new Gi({color:16777215});function cx(){ys=Math.max(40,Math.round(Gs*I/Math.max(1,ts))),(!hr||hr.height!==ys)&&(hr&&hr.dispose(),hr=new ds(Gs,ys),g.push(hr),vc=new Uint8Array(Gs*ys*4));let x=N.filter(M=>M.mesh.visible&&M.mesh.material.opacity<.5);x.forEach(M=>{M.mesh.visible=!1});let S=O.background;O.overrideMaterial=ax,u.setRenderTarget(hr),u.setClearColor(0,0),u.clear(),u.render(O,Ue),u.readRenderTargetPixels(hr,0,0,Gs,ys,vc),u.setRenderTarget(null),O.overrideMaterial=null,O.background=S,x.forEach(M=>{M.mesh.visible=!0})}let Nd=(x,S)=>{if(!vc)return!1;let M=Math.floor(x/ts*Gs),L=ys-1-Math.floor(S/I*ys);return M>=0&&L>=0&&M<Gs&&L<ys&&vc[(L*Gs+M)*4+3]>0};function lx(){let x=N.filter(S=>S.mesh.visible&&S.mesh.material.opacity>=.5).map(S=>S.mesh);Yi.forEach(S=>{let M=new Set((S.L.parts||[]).map(W=>W.mesh)),L=[];S.S.forEach(W=>{let _e=W.clone().sub(Ue.position),G=_e.length();Zt.set(Ue.position,_e.normalize()),Zt.far=G-.002,Zt.intersectObjects(x,!1).find(Q=>!M.has(Q.object))||L.push(W)});let Y=!L.length,J=S.aT;if(!S.L.parts||Y)J=S.aT;else{let W=Bi(L),_e=S.S.length>1?S.S[0].distanceTo(S.S[S.S.length-1]):.05;(!L.includes(S.aT)||S.aT.distanceTo(W)>.3*Math.max(.02,_e))&&(J=W)}(Y!==S.hid||J!==S.aT)&&(S.hid=Y,S.aT=J,ba=!0)}),cx(),ba=!0,Yi.forEach(S=>{S.w=0})}function ux(x,S,M,L){let J=0;for(let W=1;W<=40;W++){let _e=W/40;if(Nd(x+(M-x)*_e,S+(L-S)*_e)){let G=J,F=_e;for(let Q=0;Q<6;Q++){let ge=(G+F)/2;Nd(x+(M-x)*ge,S+(L-S)*ge)?F=ge:G=ge}return[x+(M-x)*F,S+(L-S)*F]}J=_e}return[M,L]}let Dd=[];for(let x=0;x<8;x++)Dd.push(new T(x&1?ks.max.x:ks.min.x,x&2?ks.max.y:ks.min.y,x&4?ks.max.z:ks.min.z));let Su=0,ba=!0,Ma=null,Ud=0;function hx(){let x=performance.now();if(Ma&&x-Ud<1e3)return Ma;let S=c.getBoundingClientRect(),M=ts/Math.max(1,S.width),L=I/Math.max(1,S.height);return Ma=[".jka-views",".jka-chips",".jka-zoom",".jka-peel",".jka-ct",".jka-refl"].map(Y=>c.querySelector(Y)).filter(Boolean).map(Y=>{let J=Y.getBoundingClientRect();if(Y.classList.contains("jka-views")){let _e=[...Y.children].map(G=>G.getBoundingClientRect()).filter(G=>G.width);_e.length&&(J={left:Math.min(..._e.map(G=>G.left)),top:Math.min(..._e.map(G=>G.top)),right:Math.max(..._e.map(G=>G.right)),bottom:Math.max(..._e.map(G=>G.bottom))})}let W={l:(J.left-S.left)*M,t:(J.top-S.top)*L,r:(J.right-S.left)*M,b:(J.bottom-S.top)*L};return W.top=(W.t+W.b)/2<I/2,W}).filter(Y=>Y.r>Y.l),Ud=x,Ma}function Fd(x){let S=Su?Math.min(64,x-Su):16;Su=x;let M=ts,L=I,Y=!1,J=1e9,W=-1e9,_e=1e9,G=-1e9;Dd.forEach(q=>{let k=q.clone().project(Ue),z=(k.x+1)/2*M,ue=(1-k.y)/2*L;J=Math.min(J,z),W=Math.max(W,z),_e=Math.min(_e,ue),G=Math.max(G,ue)});let F={cx:Math.max(60,Math.min(M-60,(J+W)/2)),cy:L/2,rx:Math.min(M*.3,Math.max(40,(W-J)/2))},Q=[[],[]],ge=1-Math.exp(-S/1e3*9);Yi.forEach(q=>{q.a.distanceToSquared(q.aT)>1e-10&&(q.a.lerp(q.aT,ge),Y=!0);let k=q.a.clone().project(Ue);q.x=(k.x+1)/2*M,q.y=(1-k.y)/2*L,q.w||(q.w=q.el.offsetWidth,q.h=q.el.offsetHeight);let z=q.x-F.cx,ue=As.side[q.k];q.s=ue!=null&&Math.abs(z)<F.rx*.4?ue:z<0?0:1,q.c=Math.abs(z),q.on=!0,Q[q.s].push(q)});let Ne=q=>q.reduce((k,z)=>k+z.h+ji,0)<=L-8,Ve=(q,k)=>{for(;!Ne(Q[q]);){let z=Q[q].slice().sort((ue,K)=>ue.c-K.c)[0];if(!z)break;Q[q].splice(Q[q].indexOf(z),1),Q[k].push(z),Ne(Q[k])?z.s=k:(Q[k].pop(),z.on=!1)}};Ve(0,1),Ve(1,0);let qe=1-Math.exp(-S/1e3*2.5);Q.forEach((q,k)=>{q.forEach(K=>{As.side[K.k]=k}),q.sort((K,he)=>K.y-he.y),q.forEach(K=>{let he=K.y-K.h/2,Ge=As.tg[K.k];!Ge||Ge.s!==k?Ge=As.tg[K.k]={y:he,x:null,s:k}:Ge.y+=(he-Ge.y)*qe,Math.abs(he-Ge.y)>.5&&(Y=!0),K.ly=Ge.y});let z;for(z=1;z<q.length;z++)q[z].ly=Math.max(q[z].ly,q[z-1].ly+q[z-1].h+ji);for(z=q.length-1;z>=0;z--)q[z].ly=Math.min(q[z].ly,(z===q.length-1?L-4:q[z+1].ly-ji)-q[z].h);for(z=0;z<q.length;z++)q[z].ly=Math.max(q[z].ly,z?q[z-1].ly+q[z-1].h+ji:4);q.forEach(K=>{let he=k?F.cx+F.rx+36:F.cx-F.rx-36-K.w,Ge=As.tg[K.k];Ge.x=Ge.x==null?he:Ge.x+(he-Ge.x)*qe,Math.abs(he-Ge.x)>.5&&(Y=!0);let ot=k?Math.max(Ge.x,he):Math.min(Ge.x,he);K.lx=Math.max(4,Math.min(M-K.w-4,ot))});let ue=hx();if(ue.length){let K=(he,Ge)=>he.lx<Ge.r+6&&he.lx+he.w>Ge.l-6&&he.ly<Ge.b+4&&he.ly+he.h>Ge.t-4;for(z=0;z<q.length;z++)ue.forEach(he=>{he.top&&K(q[z],he)&&(q[z].ly=he.b+ji)});for(z=1;z<q.length;z++)q[z].ly=Math.max(q[z].ly,q[z-1].ly+q[z-1].h+ji);for(z=q.length-1;z>=0;z--)ue.forEach(he=>{!he.top&&K(q[z],he)&&(q[z].ly=he.t-ji-q[z].h)});for(z=q.length-2;z>=0;z--)q[z].ly=Math.min(q[z].ly,q[z+1].ly-ji-q[z].h)}});let lt="";return Yi.forEach(q=>{if(!q.on){q.el.style.opacity=0;return}q.el.style.opacity="";let k=As.pos[q.k];if(!k)k=As.pos[q.k]={x:q.lx,y:q.ly,vx:0,vy:0};else{let it=S/1e3,ln=Math.max(1,Math.ceil(it/.008)),Xt=it/ln;for(let Rt=0;Rt<ln;Rt++){k.vx+=(yo*(q.lx-k.x)-ci*k.vx)*Xt,k.vy+=(yo*(q.ly-k.y)-ci*k.vy)*Xt;let Se=Math.max(Vs,Math.hypot(q.lx-k.x,q.ly-k.y)*3),ie=Math.hypot(k.vx,k.vy);ie>Se&&(k.vx*=Se/ie,k.vy*=Se/ie),k.x+=k.vx*Xt,k.y+=k.vy*Xt}Math.hypot(q.lx-k.x,q.ly-k.y)<.3&&Math.hypot(k.vx,k.vy)<4?(k.x=q.lx,k.y=q.ly,k.vx=k.vy=0):Y=!0}q.el.style.transform="translate("+k.x.toFixed(1)+"px,"+k.y.toFixed(1)+"px)";let z=q.s===1,ue=z?k.x-3:k.x+q.w+3,K=k.y+q.h/2,he=ue+(z?-12:12),Ge=ue.toFixed(1)+","+K.toFixed(1)+" "+he.toFixed(1)+","+K.toFixed(1)+" ",ot=q.L.cls||"";if(q.hid){let it=ux(he,K,q.x,q.y);lt+='<polyline class="'+ot+'" points="'+Ge+it[0].toFixed(1)+","+it[1].toFixed(1)+'"/><polyline class="'+ot+' behind" points="'+it[0].toFixed(1)+","+it[1].toFixed(1)+" "+q.x.toFixed(1)+","+q.y.toFixed(1)+'"/>'}else lt+='<polyline class="'+ot+'" points="'+Ge+q.x.toFixed(1)+","+q.y.toFixed(1)+'"/>'}),p.innerHTML=lt,ba=!1,Y}let fr=document.createElement("div");fr.className="jka-status",c.appendChild(fr);try{window.__jkaDbg={LM:tt,lmPts:Ht,cam:Ue,el:u.domElement}}catch{}if(de==="find"&&!ee){let x=null;u.domElement.addEventListener("pointerdown",S=>{x=[S.clientX,S.clientY]}),u.domElement.addEventListener("pointerup",S=>{if(!x||Math.hypot(S.clientX-x[0],S.clientY-x[1])>5)return;let M=u.domElement.getBoundingClientRect();Zt.setFromCamera(new et((S.clientX-M.left)/M.width*2-1,-(S.clientY-M.top)/M.height*2+1),Ue),Zt.far=1/0;let L=Zt.intersectObjects(N.filter(F=>F.mesh.visible&&F.mesh.material.opacity>.5).map(F=>F.mesh),!1),Y=L[0];if(tt&&Y){let F=L.find(Q=>B.some(ge=>ge.mesh===Q.object));F&&F.distance-Y.distance<.04&&(Y=F)}let J=tt&&Ht.some(F=>Zt.ray.distanceSqToPoint(F)<.009*.009);if(!Y&&!J)return;Y||(Y={object:B[0].mesh,point:tt.clone(),distance:0});let W=N.find(F=>F.mesh===Y.object),_e=tt?B.includes(W)&&Y.point.distanceTo(tt)<.014||Ht.some(F=>Zt.ray.distanceSqToPoint(F)<.009*.009):B.includes(W);(window.__jkaFind=window.__jkaFind||[]).push({name:W.name,ok:_e}),_e?(Sn.forEach(F=>{F.visible=!0,F.material.color.setHex(bu)}),tt&&Le?Le.material.color.setHex(bu):B.forEach(F=>Ae(F,bu,667672)),fr.className="jka-status ok",fr.textContent="\u2713 "+e.name):(Ae(W,$E,4194304),fr.className="jka-status bad",fr.textContent=tt?"\u2717 Not quite \u2014 that is on the "+W.name:"\u2717 That is "+W.name,setTimeout(()=>Ae(W,W.mesh.userData.base),1100)),zn=!0}),window.__jkaFind=[]}else if(de==="find"&&ee){let x=window.__jkaFind||[];if(x.length){let S=x.some(M=>M.ok);fr.className="jka-status "+(S?"ok":"bad"),fr.textContent=S?"\u2713 Found it"+(x.length>1?" (try "+(x.findIndex(M=>M.ok)+1)+")":""):"\u2717 Clicked: "+x.map(M=>M.name).slice(-3).join(", ")}}let _o=document.createElement("div");_o.className="jka-refl",c.appendChild(_o);let vo=new Set,Bd=e.mode+"|"+e.name;function Eu(){if(!vo.size){_o.style.display="none";return}_o.style.display="";let x=[...new Set([...vo].map(M=>M.name.replace(/ muscle$/,"")))].reverse();_o.innerHTML="<span>Reflected: "+x.slice(0,3).join(", ")+(x.length>3?" +"+(x.length-3):"")+"</span>";let S=document.createElement("button");S.className="jka-reflb",S.textContent="Restore",S.addEventListener("pointerdown",M=>M.stopPropagation()),S.onclick=M=>{M.stopPropagation(),vo.forEach(L=>{L.mesh.visible=C(L)}),vo.clear(),Od(),Eu(),dr=!0,zn=!0},_o.appendChild(S)}function Od(){ee||(window.__jkaRefl={key:Bd,names:[...vo].map(x=>x.name)})}function bc(x){N.filter(S=>S.name===x.name).forEach(S=>{S.mesh.visible=!1,vo.add(S)}),Od(),Eu(),dr=!0,zn=!0}let Tu=0,Sa=[];function fx(x,S){let M=u.domElement.getBoundingClientRect(),L=(G,F)=>(Zt.setFromCamera(new et((x+G-M.left)/M.width*2-1,-(S+F-M.top)/M.height*2+1),Ue),Zt.far=1/0,Zt.intersectObjects(N.filter(Q=>Q.mesh.visible&&Q.mesh.material.opacity>.05).map(Q=>Q.mesh),!1)),Y=L(0,0),J=null,W=G=>N.find(F=>F.mesh===G.object);if(de==="nerve")for(let[G,F]of[[0,0],[4,0],[-4,0],[0,4],[0,-4],[6,6],[-6,-6],[6,-6],[-6,6]]){let Q=L(G,F).map(W).find(ge=>ge&&ge.layer==="nerve");if(Q){J=Q;break}}if(!J&&Y.length&&(J=W(Y[0])),!J){Sa.length=0,kd();return}let _e=Sa.findIndex(G=>G.name===J.name);_e>=0?Sa.splice(_e,1):Sa.push(J),kd()}function kd(){for(let x=Ye.length-1;x>=0;x--)Ye[x].cls&&Ye[x].cls.indexOf("pick")>=0&&Ye.splice(x,1);Sa.forEach(x=>Ye.push({text:x.name.replace(/ muscle$/,""),parts:N.filter(S=>S.name===x.name),cls:"minor pick"})),Gr(),zn=!0}function wu(x,S){let M=u.domElement.getBoundingClientRect();Zt.setFromCamera(new et((x-M.left)/M.width*2-1,-(S-M.top)/M.height*2+1),Ue),Zt.far=1/0;let L=Zt.intersectObjects(N.filter(J=>J.mesh.visible&&J.mesh.material.opacity>.05).map(J=>J.mesh),!1),Y=de==="find"&&!ee;for(let J of L){let W=N.find(_e=>_e.mesh===J.object);if(W&&(Y||!B.includes(W))){bc(W);return}}}{let x=null,S=0,M=[0,0];u.domElement.addEventListener("pointerdown",L=>{x=L.pointerType==="touch"?null:[L.clientX,L.clientY,L.button]},!0),u.domElement.addEventListener("pointerup",L=>{if(!x)return;let Y=Math.hypot(L.clientX-x[0],L.clientY-x[1])<5,J=x[2];if(x=null,!Y||J!==0)return;let W=performance.now();if(W-S<380&&Math.hypot(L.clientX-M[0],L.clientY-M[1])<10){S=0,clearTimeout(Tu),wu(L.clientX,L.clientY);return}if(S=W,M=[L.clientX,L.clientY],ee&&!(de==="find"&&!ee)){let _e=L.clientX,G=L.clientY;clearTimeout(Tu),Tu=setTimeout(()=>fx(_e,G),390)}},!0)}function dx(){if(yc(e.reflect).forEach(M=>{let L=M.startsWith("~"),Y=L?M.slice(1).trim():M;j(Y).forEach(J=>{B.includes(J)||(L?(at(J,.22),J._a=.22,J._glass=!0):bc(J))})}),!B.length||de==="find"&&!ee||de==="peel")return;let x=new Map,S=0;qi.forEach(M=>{let L=M.clone().sub(Ue.position),Y=L.length();Zt.set(Ue.position,L.normalize()),Zt.far=Y-.002;let J=Zt.intersectObjects(N.filter(W=>W.mesh.visible&&!B.includes(W)&&!W._glass&&W.layer==="muscle").map(W=>W.mesh),!1)[0];if(S++,J){let W=N.find(_e=>_e.mesh===J.object);x.set(W,(x.get(W)||0)+1)}}),x.forEach((M,L)=>{M/Math.max(1,S)>.35&&bc(L)})}ee&&window.__jkaRefl&&window.__jkaRefl.key===Bd?setTimeout(()=>window.__jkaRefl.names.forEach(x=>{let S=N.find(M=>M.name===x);S&&bc(S)}),0):setTimeout(dx,30),Eu();{let x=0;try{x=+(localStorage.getItem("jka-tip-refl")||0)}catch{}if(x<1){try{localStorage.setItem("jka-tip-refl",String(x+1))}catch{}let S=document.createElement("div");S.className="jka-tip",S.textContent=window.matchMedia&&matchMedia("(hover: none)").matches?"Long-press a structure to reflect it":"Right-click or double-click a structure to reflect it",c.appendChild(S),setTimeout(()=>S.classList.add("on"),600),setTimeout(()=>{S.classList.remove("on"),setTimeout(()=>S.remove(),600)},6500)}}let Au=document.createElement("div");Au.className="jka-zoom"+(Ot?" jka-zoom-up":""),[["+",.75],["\u2212",1/.75]].forEach(([x,S])=>{let M=document.createElement("button");M.className="jka-zb",M.textContent=x,M.addEventListener("pointerdown",L=>L.stopPropagation()),M.addEventListener("click",L=>{L.stopPropagation(),zd(S)}),Au.appendChild(M)});function zd(x){if(Ai){Ai.zoom(x);return}qr();let S=Ue.position.clone().sub(Pe.target),M=S.length(),L=Math.max(ai?.15:.04,Math.min(ai?14:3,M*x));St={p0:Ue.position.clone(),t0:Pe.target.clone(),p1:Pe.target.clone().addScaledVector(S,L/M),t1:Pe.target.clone(),s:0,u1:Ue.up.clone()}}c.appendChild(Au);let Ea=document.createElement("div");Ea.className="jka-chips";{[["bone","Bone"],["muscle","Muscle"],["ligament","Lig."],["nerve","Nerve"],["vessel","Artery"],["vein","Vein"]].forEach(([Y,J])=>{let W=document.createElement("button"),_e=()=>N.some(G=>G.layer===Y&&G.mesh.visible);W.textContent=J,W.dataset.l=Y,W.className=_e()?"jka-b on":"jka-b",W.onclick=()=>{if(Y==="ligament"){let F=_e(),Q=N.some(Ve=>Ve.layer==="capsule"&&Ve.mesh.visible),ge=F?!Q:!0,Ne=F&&!Q;N.forEach(Ve=>{C(Ve)&&(Ve.layer==="ligament"&&(Ve.mesh.visible=ge),Ve.layer==="capsule"&&(Ve.mesh.visible=Ne))}),W.textContent=Ne?"Lig. + capsule":"Lig.",W.className=ge?"jka-b on":"jka-b",zn=!0;return}let G=!_e();N.forEach(F=>{F.layer===Y&&C(F)&&(F.mesh.visible=G)}),W.className=G?"jka-b on":"jka-b",zn=!0},Ea.appendChild(W)});let x=document.createElement("button");x.textContent="CT",x.dataset.l="ct",x.className="jka-b";let S=!1;try{S=localStorage.getItem("jka-ct")==="1"}catch{}x.onclick=()=>{Mc(!Ru)},Ea.appendChild(x),S&&setTimeout(()=>Mc(!0),0);let M=document.createElement("button");M.textContent="X-ray",M.dataset.l="xray",M.className="jka-b";let L=!1;try{L=localStorage.getItem("jka-rad")==="1"}catch{}M.onclick=()=>Cu(!ai),Ea.appendChild(M),Vr=!!(L||e.xray),Vr&&(ee&&window.__jkaWasRad&&c.classList.add("jka-nofade"),Promise.resolve().then(()=>Cu(!0,!!e.xray,!0)))}let Ai=null,Ru=!1,Ta=null;function Mc(x){x&&ai&&Cu(!1),Ru=x,c.classList.toggle("jka-ctmode",x),s.classList.remove("jka-ctpre"),c.querySelectorAll("button[data-l=ct]").forEach(U=>{U.className=x?"jka-b on":"jka-b"});try{localStorage.setItem("jka-ct",x?"1":"0")}catch{}if(!x){Ai&&(Ai.ro.disconnect(),Ai.box.remove(),Ai.onEsc&&document.removeEventListener("keydown",Ai.onEsc,!0),Ai.mini&&(Ta&&(Ue.zoom=1,Fe.copy(Ta.pan),H=Ta.by,Ta=null,Xe()),c.insertBefore(u.domElement,c.firstChild),Ai.mini.remove(),Object.values(Ai.marks||{}).forEach(U=>O.remove(U)),Z()),wn.style.display="",p.style.display="",u.domElement.style.visibility="",Ai=null),zn=!0;return}if(Ai)return;let S={bone:"#ededed",muscle:"#8a8a8a",nerve:"#747474",vessel:"#c6c6c6",vein:"#a4a4a4",ligament:"#b9b4a2",capsule:"#9a968a",lung:"#2b2b2b",airway:"#070707",heart:"#868686",organ:"#8e8e8e"},M={capsule:.5,muscle:1,nerve:2,vessel:2,vein:2,ligament:2.5,bone:3},L=N.filter(U=>U.layer!=="capsule"||U.mesh.visible).sort((U,pe)=>(M[U.layer]||0)-(M[pe.layer]||0)).map(U=>{let pe=U.mesh.userData.coarse||U.mesh.geometry,Re=pe.attributes.position,Be=Re.count,nt=new Float32Array(Be*3),De=new T;for(let ht=0;ht<Be;ht++)De.fromBufferAttribute(Re,ht).applyMatrix4(U.mesh.matrixWorld),nt[ht*3]=De.x,nt[ht*3+1]=De.y,nt[ht*3+2]=De.z;return{p:U,W:nt,I:pe.index?pe.index.array:null,n:Be,tgt:B.includes(U)}}).reduce((U,pe)=>{let Re=pe.p.name+"|"+pe.tgt,Be=U.map.get(Re);if(Be)Be.items.push(pe),Be.box=Be.box.clone().union(pe.p.box);else{let nt={p:pe.p,tgt:pe.tgt,items:[pe],box:pe.p.box.clone()};U.map.set(Re,nt),U.list.push(nt)}return U},{map:new Map,list:[]}).list;L.slice().forEach(U=>{let pe=U.items,Re=new sn(new T(-U.box.max.x,U.box.min.y,U.box.min.z),new T(-U.box.min.x,U.box.max.y,U.box.max.z));L.push({p:U.p,tgt:!1,mirror:!0,items:pe,box:Re})});let Y=e.ctPlanes||Cd.planes;Id(e.ctContext||n).then(U=>{if(v)return;U.updateMatrixWorld(!0);let pe=new Set(N.map(Re=>Re.name));U.traverse(Re=>{if(!Re.isMesh||pe.has(String((Re.userData||{}).n||Re.name).replace(/\.[lr]$/,"")))return;let Be=Re.userData||{},nt=Re.geometry,De=nt.attributes.position,ht=De.count,Je=new Float32Array(ht*3),Qe=new T;for(let ve=0;ve<ht;ve++)Qe.fromBufferAttribute(De,ve).applyMatrix4(Re.matrixWorld),Je[ve*3]=Qe.x,Je[ve*3+1]=Qe.y,Je[ve*3+2]=Qe.z;let gt={name:Be.n||Re.name,layer:Be.l||"organ",box:new sn().setFromObject(Re)};L.push({p:gt,tgt:!1,context:!0,items:[{p:gt,W:Je,I:nt.index?nt.index.array:null,n:ht}],box:gt.box})});try{K(),ue.forEach(Re=>{Re.baseKey=null}),Wn()}catch{}}).catch(()=>{});let W={axial:{n:[0,1,0],u:[1,0,0],v:[0,0,1],step:.003,name:"Axial"},coronal:{n:[0,0,1],u:[1,0,0],v:[0,1,0],step:.003,name:"Coronal"},sagittal:{n:[se?1:-1,0,0],u:[0,0,-1],v:[0,1,0],step:.003,name:"Sagittal"}},_e=null;function G(){let pe=document.createElement("canvas");pe.width=pe.height=256;let Re=pe.getContext("2d"),Be=[];for(let Je=0;Be.length<85&&Je<6e3;Je++){let Qe=[Math.random()*256,Math.random()*256,.7+Math.random()*.8];Be.every(([gt,ve])=>{let ft=Math.abs(Qe[0]-gt),me=Math.abs(Qe[1]-ve);return ft=Math.min(ft,256-ft),me=Math.min(me,256-me),ft*ft+me*me>15*15})&&Be.push(Qe)}let nt=Re.createImageData(256,256);for(let Je=0;Je<256;Je++)for(let Qe=0;Qe<256;Qe++){let gt=1e9,ve=1e9,ft=1;Be.forEach(([we,mt,dt])=>{let Ft=Math.abs(Qe-we),xt=Math.abs(Je-mt);Ft=Math.min(Ft,256-Ft),xt=Math.min(xt,256-xt);let Pt=Math.sqrt(Ft*Ft+xt*xt);Pt<gt?(ve=gt,gt=Pt,ft=dt):Pt<ve&&(ve=Pt)});let me=(ve-gt)/2,We=1.7*ft,wt=Math.exp(-(me*me)/(2*We*We)),vn=Math.round(88+wt*80+(Math.random()-.5)*12),tn=(Je*256+Qe)*4;nt.data[tn]=nt.data[tn+1]=nt.data[tn+2]=vn,nt.data[tn+3]=255}Re.putImageData(nt,0,0);let De=document.createElement("canvas");De.width=De.height=256;let ht=De.getContext("2d");ht.filter="blur(0.8px)";for(let Je of[-256,0,256])for(let Qe of[-256,0,256])ht.drawImage(pe,Je,Qe);return De}let F=document.createElement("div");F.className="jka-ct";let Q=document.createElement("div");Q.className="jka-ct-h",Q.innerHTML="CT <span>(simulated) \xB7 scroll a pane to move its slice \xB7 click to aim the others</span>",F.appendChild(Q),c.appendChild(F);let ge=document.createElement("button");ge.className="jka-ctoff",ge.textContent="Disable CT",ge.addEventListener("pointerdown",U=>U.stopPropagation()),ge.onclick=U=>{U.stopPropagation(),Mc(!1)},F.appendChild(ge),wn.style.display="none",p.style.display="none";let Ne=null;ee?(Ne=document.createElement("div"),Ne.className="jka-mini",c.appendChild(Ne),Ne.appendChild(u.domElement),Z(),zn=!0,Ta={pan:Fe.clone(),by:H},Fe.set(0,0),H=0,Ue.zoom=.4,Xe()):u.domElement.style.visibility="hidden";let Ve=te.isEmpty()?Ce:te,qe=Ve.getCenter(new T),lt=Ce.clone();lt.min.y=Math.max(lt.min.y,$e[0]),lt.max.y=Math.min(lt.max.y,$e[1]);let q=Math.min(2,window.devicePixelRatio||1),k=U=>new T(...U),z={axial:"#ffd36b",coronal:"#7fd8ff",sagittal:"#ff8f8f"},ue=["axial","coronal","sagittal"].map(U=>{let pe=document.createElement("div");pe.className="jka-ctp jka-ctp-"+U;let Re=document.createElement("canvas");pe.appendChild(Re);let Be=document.createElement("button");Be.className="jka-ctp-t",Be.innerHTML=W[U].name+" <span>\u25BE</span>",Be.style.color=z[U],pe.appendChild(Be),Be.addEventListener("pointerdown",Je=>Je.stopPropagation()),Be.addEventListener("click",Je=>{Je.stopPropagation(),pt&&ut(Be)});let nt=document.createElement("button");nt.className="jka-ctp-plus",nt.innerHTML='<svg viewBox="0 0 14 14" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11 L11 3"/><path d="M6.5 3 H11 V7.5"/><path d="M7.5 11 H3 V6.5"/></svg>',nt.addEventListener("pointerdown",Je=>Je.stopPropagation()),nt.addEventListener("click",Je=>{Je.stopPropagation(),en(U,!0)}),nt.style.color=z[U],pe.appendChild(nt),F.appendChild(pe);let De=W[U],ht={k:U,el:pe,cv:Re,g2:Re.getContext("2d"),n:k(De.n),u:k(De.u),v:k(De.v),d:k(De.n).dot(qe),half:U==="axial"?.1:.16,W:300,H:300,cu:0,cvv:0};return ht.cu=ht.u.dot(qe),ht.cvv=ht.v.dot(qe),ht});function K(){let U=ue.find(ht=>ht.k==="coronal");if(!U||U.manual)return;let pe=1e9,Re=-1e9,Be=1e9,nt=-1e9;if(L.forEach(ht=>{let Je=ht.box;for(let Qe=0;Qe<8;Qe++){let gt=new T(Qe&1?Je.max.x:Je.min.x,Qe&2?Je.max.y:Je.min.y,Qe&4?Je.max.z:Je.min.z),ve=gt.dot(U.u),ft=gt.dot(U.v);pe=Math.min(pe,ve),Re=Math.max(Re,ve),Be=Math.min(Be,ft),nt=Math.max(nt,ft)}}),Re<=pe)return;let De=(U.cv.height||U.H||1)/(U.cv.width||U.W||1);U.half=Math.max((nt-Be)/2,(Re-pe)/2*De)*1.04,U.cu=(pe+Re)/2,U.cvv=(Be+nt)/2,U.baseKey=null}K();let he={};Ne&&ue.forEach(U=>{let pe=new Tn(new oo(.34,.34),new Gi({color:z[U.k],transparent:!0,opacity:.25,side:Si,depthWrite:!1}));pe.quaternion.setFromUnitVectors(new T(0,0,1),U.n),O.add(pe),he[U.k]=pe});function Ge(U){let pe=1e9,Re=-1e9;for(let Be=0;Be<8;Be++){let nt=U.dot(new T(Be&1?lt.max.x:lt.min.x,Be&2?lt.max.y:lt.min.y,Be&4?lt.max.z:lt.min.z));pe=Math.min(pe,nt),Re=Math.max(Re,nt)}return[pe,Re]}function ot(){ue.forEach(U=>{let pe=U.el.getBoundingClientRect();U.W=pe.width||300,U.H=pe.height||300,U.cv.width=Math.round(U.W*q),U.cv.height=Math.round(U.H*q)})}function it(U){let{n:pe,u:Re,v:Be,g2:nt,cv:De}=U,[ht,Je]=Ge(pe);U.d=Math.max(ht,Math.min(Je,U.d));let Qe=U.H/(2*U.half)*q,gt=U.d,ve=We=>De.width/2+(We-U.cu)*Qe,ft=We=>De.height/2-(We-U.cvv)*Qe;U.toWorld=(We,wt)=>qe.clone().addScaledVector(Re,U.cu+(We*q-De.width/2)/Qe-Re.dot(qe)).addScaledVector(Be,U.cvv-(wt*q-De.height/2)/Qe-Be.dot(qe)).addScaledVector(pe,gt-pe.dot(qe));let me=gt.toFixed(5)+"|"+U.half+"|"+De.width+"x"+De.height+"|"+Ke+"|"+U.cu.toFixed(5)+","+U.cvv.toFixed(5);if(U.baseKey!==me&&(U.baseKey=me,Te(U,Qe,gt,ve,ft),U.k==="axial"&&!U.manual&&!U.fitted&&U.shapes&&U.shapes.length&&!U.fitting)){let We=1e9,wt=-1e9,vn=1e9,tn=-1e9;if(U.shapes.forEach(we=>we.loops.forEach(mt=>mt.forEach(dt=>{We=Math.min(We,dt[0]),wt=Math.max(wt,dt[0]),vn=Math.min(vn,dt[1]),tn=Math.max(tn,dt[1])}))),wt>We){let we=(wt-We)/Qe+.03,mt=(tn-vn)/Qe+.03,dt=U.cu+((We+wt)/2-De.width/2)/Qe,Ft=U.cvv-((vn+tn)/2-De.height/2)/Qe,xt=Math.max(mt/2,we/2*De.height/De.width)*1.08;if(Math.abs(xt-U.half)/U.half>.04||Math.abs(dt-U.cu)>.003||Math.abs(Ft-U.cvv)>.003){U.half=xt,U.cu=dt,U.cvv=Ft,U.fitting=!0,it(U),U.fitting=!1,U.fitted=!0;return}U.fitted=!0}}nt.setTransform(1,0,0,1,0,0),nt.drawImage(U.base,0,0),yt(U,ve,ft),he[U.k]&&(he[U.k].position.copy(qe.clone().addScaledVector(pe,gt-pe.dot(qe))),zn=!0)}let ln=.0042,Xt=26e-5,Rt=(U,pe,Re)=>{let Be=U*374761393+pe*668265263+Re*1274126177|0;return Be=Math.imul(Be^Be>>>13,1274126177),((Be^Be>>>16)>>>0)/4294967296};function Se(U,pe,Re,Be){let nt=Math.floor(U),De=Math.floor(pe),ht=Math.floor(Re),Je=U-nt,Qe=pe-De,gt=Re-ht,ve=Je*Je*(3-2*Je),ft=Qe*Qe*(3-2*Qe),me=gt*gt*(3-2*gt),We=(vn,tn,we)=>Rt(vn+Be*101,tn+Be*37,we+Be*59),wt=(vn,tn,we)=>vn+(tn-vn)*we;return wt(wt(wt(We(nt,De,ht),We(nt+1,De,ht),ve),wt(We(nt,De+1,ht),We(nt+1,De+1,ht),ve),ft),wt(wt(We(nt,De,ht+1),We(nt+1,De,ht+1),ve),wt(We(nt,De+1,ht+1),We(nt+1,De+1,ht+1),ve),ft),me)}function ie(U,pe,Re){let Be=1/(ln*1.4),nt=ln*.45,De=U+(Se(U*Be,pe*Be,Re*Be,1)-.5)*2*nt,ht=pe+(Se(U*Be,pe*Be,Re*Be,2)-.5)*2*nt,Je=Re+(Se(U*Be,pe*Be,Re*Be,3)-.5)*2*nt,Qe=Math.floor(De/ln),gt=Math.floor(ht/ln),ve=Math.floor(Je/ln),ft=1e9,me=1e9;for(let mt=-1;mt<=1;mt++)for(let dt=-1;dt<=1;dt++)for(let Ft=-1;Ft<=1;Ft++){let xt=Qe+mt,Pt=gt+dt,pn=ve+Ft,li=(xt+Rt(xt,Pt,pn))*ln,Ri=(Pt+Rt(Pt,pn,xt+7))*ln,Ct=(pn+Rt(pn,xt,Pt+13))*ln,hn=(li-De)*(li-De)+(Ri-ht)*(Ri-ht)+(Ct-Je)*(Ct-Je);hn<ft?(me=ft,ft=hn):hn<me&&(me=hn)}let We=(Math.sqrt(me)-Math.sqrt(ft))/2,wt=1/(ln*2.2),vn=Se(U*wt,pe*wt,Re*wt,4),tn=Xt*(.45+1.25*vn),we=.55+.45*Math.min(1,Se(U*wt*1.7,pe*wt*1.7,Re*wt*1.7,5)*1.8);return Math.exp(-(We*We)/(2*tn*tn))*we}function fe(U,pe,Re,Be,nt,De){let Je=Math.ceil(nt*.5),Qe=Math.ceil(De*.5),gt=document.createElement("canvas");gt.width=Je,gt.height=Qe;let ve=gt.getContext("2d");ve.setTransform(.5,0,0,.5,0,0),ve.fillStyle="#fff",Be.forEach(mt=>{mt.S.p.layer!=="bone"||!mt.loops.length||/^(Hip bone|Sacrum|Coccyx|Vertebra)/.test(mt.S.p.name)||(ve.beginPath(),mt.loops.forEach(dt=>{ve.moveTo(dt[0][0],dt[0][1]),dt.forEach(Ft=>ve.lineTo(Ft[0],Ft[1])),ve.closePath()}),ve.fill("nonzero"))});let ft=ve.getImageData(0,0,Je,Qe),me=ve.createImageData(Je,Qe),{u:We,v:wt,n:vn}=U;for(let mt=0;mt<Qe;mt++)for(let dt=0;dt<Je;dt++){let Ft=(mt*Je+dt)*4;if(!ft.data[Ft+3])continue;let xt=U.cu+(dt/.5-nt/2)/pe,Pt=U.cvv-(mt/.5-De/2)/pe,pn=We.x*xt+wt.x*Pt+vn.x*Re,li=We.y*xt+wt.y*Pt+vn.y*Re,Ri=We.z*xt+wt.z*Pt+vn.z*Re,Ct=Math.round(86+ie(pn,li,Ri)*84+(Math.random()-.5)*10);me.data[Ft]=me.data[Ft+1]=me.data[Ft+2]=Ct,me.data[Ft+3]=255}ve.setTransform(1,0,0,1,0,0),ve.putImageData(me,0,0);let tn=document.createElement("canvas");tn.width=nt,tn.height=De;let we=tn.getContext("2d");return we.imageSmoothingEnabled=!0,we.filter="blur(0.6px)",we.drawImage(gt,0,0,nt,De),tn}let xe=new Map,Me=12e3;function oe(U,pe){if(U.ix=U.ix||[],U.ix[pe])return U.ix[pe];let Re=U.W,Be=U.I,nt=Be?Be.length/3:U.n/3,De=.002,ht=1e9,Je=-1e9;for(let We=pe;We<Re.length;We+=3)ht=Math.min(ht,Re[We]),Je=Math.max(Je,Re[We]);let Qe=Math.max(1,Math.ceil((Je-ht)/De)+1),gt=new Int32Array(Qe+1),ve=new Int32Array(nt*2);for(let We=0;We<nt;We++){let wt=Be?Be[We*3]:We*3,vn=Be?Be[We*3+1]:We*3+1,tn=Be?Be[We*3+2]:We*3+2,we=Re[wt*3+pe],mt=Re[vn*3+pe],dt=Re[tn*3+pe],Ft=Math.floor((Math.min(we,mt,dt)-ht)/De),xt=Math.floor((Math.max(we,mt,dt)-ht)/De);ve[We*2]=Ft,ve[We*2+1]=xt;for(let Pt=Ft;Pt<=xt;Pt++)gt[Pt+1]++}for(let We=0;We<Qe;We++)gt[We+1]+=gt[We];let ft=new Int32Array(gt[Qe]),me=gt.slice(0,Qe);for(let We=0;We<nt;We++)for(let wt=ve[We*2];wt<=ve[We*2+1];wt++)ft[me[wt]++]=We;return U.ix[pe]={lo:ht,B:De,nb:Qe,start:gt,list:ft}}let $=0;function Ee(U,pe,Re){U.id==null&&(U.id=++$);let Be=U.id+"|"+pe+"|"+Re.toFixed(5),nt=xe.get(Be);if(nt)return xe.delete(Be),xe.set(Be,nt),nt;let De=oe(U,pe),ht=[],Je=Math.floor((Re-De.lo)/De.B);if(Je>=0&&Je<De.nb){let gt=U.W,ve=U.I;for(let ft=De.start[Je];ft<De.start[Je+1];ft++){let me=De.list[ft],We=ve?ve[me*3]:me*3,wt=ve?ve[me*3+1]:me*3+1,vn=ve?ve[me*3+2]:me*3+2,tn=gt[We*3+pe]-Re,we=gt[wt*3+pe]-Re,mt=gt[vn*3+pe]-Re,dt=[],Ft=(xt,Pt,pn,li)=>{let Ri=pn/(pn-li);dt.push(gt[xt*3]+(gt[Pt*3]-gt[xt*3])*Ri,gt[xt*3+1]+(gt[Pt*3+1]-gt[xt*3+1])*Ri,gt[xt*3+2]+(gt[Pt*3+2]-gt[xt*3+2])*Ri)};if(tn>0!=we>0&&Ft(We,wt,tn,we),we>0!=mt>0&&Ft(wt,vn,we,mt),mt>0!=tn>0&&Ft(vn,We,mt,tn),dt.length===6)for(let xt=0;xt<6;xt++)ht.push(dt[xt])}}let Qe=new Float32Array(ht);return xe.set(Be,Qe),xe.size>Me&&xe.delete(xe.keys().next().value),Qe}function Te(U,pe,Re,Be,nt){let De=performance.now(),ht=!U.forceFull&&U.lastSlice&&De-U.lastSlice<200;U.forceFull=!1,clearTimeout(U.fullT);let Je=pe/1e3>1/.8;ht&&(U.fullT=setTimeout(()=>{U.forceFull=!0,U.baseKey=null,it(U)},180));let{n:Qe,u:gt,v:ve}=U;U.base||(U.base=document.createElement("canvas"));let ft=U.base;ft.width=U.cv.width,ft.height=U.cv.height;let me=ft.getContext("2d");me.setTransform(1,0,0,1,0,0),me.fillStyle="#0a0a0a",me.fillRect(0,0,ft.width,ft.height);let We=[],wt=null,vn=null;L.forEach(Ct=>{if(Ct.context&&!Y.includes(U.k))return;let hn=Ct.box,nn=1e9,Nn=-1e9;for(let $t=0;$t<8;$t++){let It=Qe.x*($t&1?hn.max.x:hn.min.x)+Qe.y*($t&2?hn.max.y:hn.min.y)+Qe.z*($t&4?hn.max.z:hn.min.z);nn=Math.min(nn,It),Nn=Math.max(Nn,It)}if(nn>Re||Nn<Re)return;let In=[],qn=Ct.mirror?-1:1,ni=Math.abs(Qe.x)>.5?0:Math.abs(Qe.y)>.5?1:2,Xn=Re*(ni===0?Qe.x:ni===1?Qe.y:Qe.z),Kn=($t,It,Dn)=>[Be($t*gt.x+It*gt.y+Dn*gt.z),nt($t*ve.x+It*ve.y+Dn*ve.z)];if(Ct.items.forEach($t=>{let It=Ee($t,ni,ni===0?Xn*qn:Xn);for(let Dn=0;Dn<It.length;Dn+=6)In.push([Kn(It[Dn]*qn,It[Dn+1],It[Dn+2]),Kn(It[Dn+3]*qn,It[Dn+4],It[Dn+5])])}),!In.length)return;let Kt=$t=>Math.round($t[0]*4)+","+Math.round($t[1]*4),mn=new Map;In.forEach(($t,It)=>[0,1].forEach(Dn=>{let _s=Kt($t[Dn]);(mn.get(_s)||mn.set(_s,[]).get(_s)).push([It,Dn])}));let qt=new Uint8Array(In.length),gn=[];for(let $t=0;$t<In.length;$t++){if(qt[$t])continue;qt[$t]=1;let It=[In[$t][0],In[$t][1]],Dn=In[$t][1];for(let _s=0;_s<In.length;_s++){let qs=(mn.get(Kt(Dn))||[]).find(([js])=>!qt[js]);if(!qs)break;qt[qs[0]]=1;let Ys=In[qs[0]][1-qs[1]];It.push(Ys),Dn=Ys}It.length>1&&gn.push(It)}let Hn=8*q,$n=($t,It)=>Math.hypot($t[0]-It[0],$t[1]-It[1]),us=$t=>$n($t[0],$t[$t.length-1])<=Hn,Ii=gn.filter($t=>!us($t)),bi=gn.filter(us);for(let $t=0;Ii.length&&$t<400;$t++){let It=Ii[0],Dn=null,_s=Hn*3;$n(It[0],It[It.length-1])<_s&&It.length>2&&(_s=$n(It[0],It[It.length-1]),Dn={self:!0});for(let js=1;js<Ii.length;js++){let vs=Ii[js];[[It[It.length-1],vs[0],0],[It[It.length-1],vs[vs.length-1],1],[It[0],vs[vs.length-1],2],[It[0],vs[0],3]].forEach(([Mx,Sx,Ex])=>{let ip=$n(Mx,Sx);ip<_s&&(_s=ip,Dn={j:js,m:Ex})})}if(!Dn){let js=0;for(let vs=1;vs<It.length;vs++)js+=$n(It[vs-1],It[vs]);Ii.shift(),It.length>4&&$n(It[0],It[It.length-1])<.18*js?bi.push(It):(wt||(wt=[])).push(It);continue}if(Dn.self){bi.push(Ii.shift());continue}let qs=Ii[Dn.j],Ys;Dn.m===0?Ys=It.concat(qs):Dn.m===1?Ys=It.concat(qs.slice().reverse()):Dn.m===2?Ys=qs.concat(It):Ys=qs.slice().reverse().concat(It),Ii.splice(Dn.j,1),Ii[0]=Ys,us(Ys)&&bi.push(Ii.shift())}We.push({S:Ct,loops:bi.filter($t=>$t.length>2),lines:wt||[]}),wt=null});let tn=Ct=>{me.beginPath(),Ct.forEach(hn=>{me.moveTo(hn[0][0],hn[0][1]);for(let nn=1;nn<hn.length;nn++)me.lineTo(hn[nn][0],hn[nn][1]);me.closePath()})};me.lineJoin="round";let we="#3a3a3a",mt="#8f8f8f",dt=.012*pe,Ft=Math.max(1*q,7e-4*pe),xt=We.filter(Ct=>Ct.S.p.layer!=="capsule"&&Ct.S.p.layer!=="lung"&&Ct.S.p.layer!=="airway"),Pt=[];if(U.k==="axial"){let Ct=xt.map(Kt=>{let mn=1e9,qt=1e9,gn=-1e9,Hn=-1e9;return Kt.loops.forEach($n=>$n.forEach(us=>{mn=Math.min(mn,us[0]),qt=Math.min(qt,us[1]),gn=Math.max(gn,us[0]),Hn=Math.max(Hn,us[1])})),[mn,qt,gn,Hn]}),hn=/latissimus|serratus|pectoralis|trapezius|rhomboid|levator scapulae|subclavius|intercostal|thoraco|lateral thoracic|long thoracic|vertebra|sacrum|coccyx|psoas|quadratus lumborum|iliac artery|iliac vein/i,nn=Kt=>Kt.S.context||hn.test(Kt.S.p.name),Nn=Kt=>!!Kt.S.mirror,In=xt.map((Kt,mn)=>mn),qn=Kt=>In[Kt]===Kt?Kt:In[Kt]=qn(In[Kt]),ni=.006*pe;for(let Kt=0;Kt<Ct.length;Kt++)for(let mn=Kt+1;mn<Ct.length;mn++){let qt=Ct[Kt],gn=Ct[mn];qt[0]>1e8||gn[0]>1e8||Nn(xt[Kt])!==Nn(xt[mn])||nn(xt[Kt])||nn(xt[mn])||qt[0]-ni<gn[2]&&gn[0]-ni<qt[2]&&qt[1]-ni<gn[3]&&gn[1]-ni<qt[3]&&(In[qn(Kt)]=qn(mn))}let Xn=new Map;xt.forEach((Kt,mn)=>{if(Ct[mn][0]>1e8||nn(Kt))return;let qt=qn(mn);(Xn.get(qt)||Xn.set(qt,[]).get(qt)).push(Kt)});let Kn=(Kt,mn,qt)=>(mn[0]-Kt[0])*(qt[1]-Kt[1])-(mn[1]-Kt[1])*(qt[0]-Kt[0]);Xn.forEach(Kt=>{let mn=[];if(Kt.forEach(Hn=>Hn.loops.forEach($n=>$n.forEach(us=>mn.push(us)))),mn.length<3)return;mn.sort((Hn,$n)=>Hn[0]-$n[0]||Hn[1]-$n[1]);let qt=[],gn=[];mn.forEach(Hn=>{for(;qt.length>1&&Kn(qt[qt.length-2],qt[qt.length-1],Hn)<=0;)qt.pop();qt.push(Hn)}),mn.slice().reverse().forEach(Hn=>{for(;gn.length>1&&Kn(gn[gn.length-2],gn[gn.length-1],Hn)<=0;)gn.pop();gn.push(Hn)}),Pt.push(qt.slice(0,-1).concat(gn.slice(0,-1)))})}let pn=(Ct,hn)=>{me.strokeStyle=hn,me.fillStyle=hn,me.lineWidth=Ct,Pt.forEach(nn=>{me.beginPath(),nn.forEach((Nn,In)=>In?me.lineTo(Nn[0],Nn[1]):me.moveTo(Nn[0],Nn[1])),me.closePath(),me.fill(),me.stroke()}),xt.forEach(nn=>{tn(nn.loops),me.fill("evenodd"),me.stroke(),nn.lines.length&&(me.beginPath(),nn.lines.forEach(Nn=>{me.moveTo(Nn[0][0],Nn[0][1]),Nn.forEach(In=>me.lineTo(In[0],In[1]))}),me.stroke())})};me.lineJoin="round",me.lineCap="round",pn(2*(dt+Ft),mt),pn(2*dt,we);let li=Ct=>{if(tn(Ct.loops),Ct.S.p.layer==="bone"&&!Ct.S.tgt){let hn=Ct.S.p.box,nn=hn.min.y,Nn=hn.max.y,In=Math.max(1e-4,Nn-nn),qn=/^(Femur|Tibia|Fibula)$/.test(Ct.S.p.name),ni=Ii=>{if(!qn)return 0;let bi=(Ii-nn)/In,$t=Math.min(1,Math.max(0,(bi-.16)/.12)),It=Math.min(1,Math.max(0,(.84-bi)/.12));return Math.min($t,It)},Xn=1e9,Kn=1e9,Kt=-1e9,mn=-1e9;Ct.loops.forEach(Ii=>Ii.forEach(bi=>{bi[0]<Xn&&(Xn=bi[0]),bi[0]>Kt&&(Kt=bi[0]),bi[1]<Kn&&(Kn=bi[1]),bi[1]>mn&&(mn=bi[1])})),Xn=Math.max(0,Math.floor(Xn)-2),Kn=Math.max(0,Math.floor(Kn)-2);let qt=Math.min(ft.width,Math.ceil(Kt)+2)-Xn,gn=Math.min(ft.height,Math.ceil(mn)+2)-Kn;if(qt<=0||gn<=0)return;me.save(),me.clip("nonzero"),/^(Hip bone|Sacrum|Coccyx)|vertebra|atlas|axis \(c2|\brib\b|stern|manubrium|xiphoid|costal/i.test(Ct.S.p.name)?(me.fillStyle="#c9c9c9",me.fillRect(Xn,Kn,qt,gn)):ht||!Je?(me.fillStyle="#b4b4b4",me.fillRect(Xn,Kn,qt,gn)):(vn||(vn=fe(U,pe,Re,We,ft.width,ft.height)),me.drawImage(vn,Xn,Kn,qt,gn,Xn,Kn,qt,gn));let Hn="rgba(58,58,58,",$n=ve.y;if(qn&&Math.abs($n)>.5){let Ii=nt(nn*$n),bi=nt(Nn*$n),$t=me.createLinearGradient(0,Ii,0,bi);[0,.16,.28,.5,.72,.84,1].forEach(It=>$t.addColorStop(It,Hn+ni(nn+It*In).toFixed(2)+")")),me.fillStyle=$t,me.fillRect(Xn,Kn,qt,gn)}else qn&&(me.fillStyle=Hn+ni(Re).toFixed(2)+")",me.fillRect(Xn,Kn,qt,gn));let us=Math.abs($n)>.5?.5:ni(Re);tn(Ct.loops),me.strokeStyle="#f4f4f4",me.lineWidth=Math.max(4*q,(.005+.009*us)*pe),me.stroke(),me.restore();return}me.fillStyle=S[Ct.S.p.layer]||"#888",me.fill("evenodd"),Ct.S.tgt&&(me.fillStyle="rgba(95,200,255,.58)",me.fill("evenodd")),me.strokeStyle="rgba(40,40,40,.55)",me.lineWidth=.8*q,me.stroke()};We.forEach(li),U.shapes=We,U.lastSlice=performance.now();let Ri=[];me.font="600 "+10.5*q+"px -apple-system, system-ui, sans-serif",me.textAlign="center",me.textBaseline="middle",We.filter(Ct=>Ct.S.p.name===Ke&&Ct.loops.length).forEach(Ct=>{let hn=0,nn=0,Nn=0,In=0;Ct.loops.forEach(qt=>{for(let gn=0;gn<qt.length;gn++){let Hn=qt[gn],$n=qt[(gn+1)%qt.length];In+=Hn[0]*$n[1]-$n[0]*Hn[1],hn+=Hn[0],nn+=Hn[1],Nn++}});let qn=hn/Nn,ni=nn/Nn,Xn=Ct.S.p.name.replace(/ muscle$/,""),Kn=me.measureText(Xn).width+6*q,Kt=14*q,mn=ni-16*q;for(let qt=0;qt<6&&Ri.some(gn=>Math.abs(gn[0]-qn)<(gn[2]+Kn)/2&&Math.abs(gn[1]-mn)<Kt);qt++)mn-=Kt;Ri.push([qn,mn,Kn]),me.strokeStyle="rgba(255,224,150,.6)",me.lineWidth=1*q,me.beginPath(),me.moveTo(qn,ni),me.lineTo(qn,mn+Kt/2-2*q),me.stroke(),me.fillStyle="rgba(0,0,0,.6)",me.fillRect(qn-Kn/2,mn-Kt/2,Kn,Kt),me.fillStyle="#ffe196",me.fillText(Xn,qn,mn+.5*q)}),me.textAlign="start",me.textBaseline="alphabetic",We.forEach(Ct=>{Ct.lines.length&&(me.beginPath(),Ct.lines.forEach(hn=>{me.moveTo(hn[0][0],hn[0][1]);for(let nn=1;nn<hn.length;nn++)me.lineTo(hn[nn][0],hn[nn][1])}),me.strokeStyle=Ct.S.p.layer==="bone"?"#f2f2f2":S[Ct.S.p.layer]||"#888",me.lineWidth=(Ct.S.p.layer==="bone"?2.5:1.5)*q,me.stroke())})}function yt(U,pe,Re){let{u:Be,v:nt,g2:De,cv:ht}=U;De.setLineDash([4*q,4*q]),De.lineWidth=1*q,ue.forEach(Je=>{if(Je===U)return;De.strokeStyle=z[Je.k],De.globalAlpha=.7,De.beginPath();let Qe=Je.n.dot(Be),gt=Je.n.dot(nt);if(Math.abs(Qe)>.5){let ve=pe(Je.d/Qe);De.moveTo(ve,0),De.lineTo(ve,ht.height)}else if(Math.abs(gt)>.5){let ve=Re(Je.d/gt);De.moveTo(0,ve),De.lineTo(ht.width,ve)}De.stroke(),De.globalAlpha=1}),De.setLineDash([])}let Ke=null,pt=null,st=document.createElement("div");st.className="jka-ctmenu",st.style.display="none",F.appendChild(st);let un=window.matchMedia&&(matchMedia("(hover: none)").matches||matchMedia("(max-width: 720px)").matches);[["axial","Axial"],["coronal","Coronal"],["sagittal","Sagittal"]].concat(un?[]:[[null,"All three"]]).forEach(([U,pe])=>{let Re=document.createElement("button");Re.className="jka-ctmi",Re.textContent=pe,Re.dataset.k=U||"",Re.addEventListener("pointerdown",Be=>Be.stopPropagation()),Re.addEventListener("click",Be=>{Be.stopPropagation(),st.style.display="none",en(U,!0)}),st.appendChild(Re)});function ut(U){if(st.style.display!=="none"){st.style.display="none";return}let pe=F.getBoundingClientRect(),Re=U.getBoundingClientRect();st.style.display="",st.style.top=Re.bottom-pe.top+4+"px",st.style.left="auto",st.style.right="8px",st.querySelectorAll("button").forEach(Be=>Be.classList.toggle("on",(Be.dataset.k||null)===pt))}F.addEventListener("pointerdown",()=>{st.style.display="none"});function en(U,pe){pt=pe?U:pt===U?null:U,F.classList.toggle("jka-ct-solo",!!pt),ue.forEach(Re=>Re.el.classList.toggle("jka-on",Re.k===pt)),requestAnimationFrame(()=>{ot(),ue.forEach(Re=>{Re.baseKey=null}),Wn()})}let Pn=U=>{U.key==="Escape"&&pt&&Ai&&(U.preventDefault(),U.stopPropagation(),en(pt))};document.addEventListener("keydown",Pn,!0);let Wn=()=>ue.forEach(it);try{window.__jkaCT={panes:ue,drawPane:it,src:L,slice:Te}}catch{}ue.forEach(U=>{U.cv.addEventListener("wheel",ve=>{if(ve.preventDefault(),ve.stopPropagation(),ve.ctrlKey){U.manual=!0,U.half=Math.max(.03,Math.min(1,U.half*Math.exp(ve.deltaY*.01))),it(U);return}U.d-=Math.sign(ve.deltaY)*.003,Wn()},{passive:!1});let pe=!1,Re=null,Be=0,nt=ve=>{let ft=U.cv.getBoundingClientRect();Re=U.toWorld(ve.clientX-ft.left,ve.clientY-ft.top),Be||(Be=requestAnimationFrame(()=>{if(Be=0,!Re)return;let me=Re;Re=null,ue.forEach(We=>{We!==U&&(We.d=We.n.dot(me))}),Wn()}))},De=null,ht=null;U.cv.addEventListener("contextmenu",ve=>ve.preventDefault()),U.cv.addEventListener("pointerdown",ve=>{if(ve.button===2||ve.button===1||ve.button===0&&ve.shiftKey){ve.preventDefault(),U.manual=!0,ht=[ve.clientX,ve.clientY],U.cv.setPointerCapture(ve.pointerId);return}ve.button===0&&(De=[ve.clientX,ve.clientY],pe=!1,U.cv.setPointerCapture(ve.pointerId))}),U.cv.addEventListener("pointermove",ve=>{if(ht){let ft=U.H/(2*U.half);U.cu-=(ve.clientX-ht[0])/ft,U.cvv+=(ve.clientY-ht[1])/ft,ht=[ve.clientX,ve.clientY],U.praf||(U.praf=requestAnimationFrame(()=>{U.praf=0,it(U)}));return}De&&(!pe&&Math.hypot(ve.clientX-De[0],ve.clientY-De[1])>4&&(pe=!0),pe&&nt(ve))}),U.cv.addEventListener("pointerup",ve=>{if(De&&!pe){let ft=U.cv.getBoundingClientRect(),me=(ve.clientX-ft.left)*q,We=(ve.clientY-ft.top)*q,wt=U.cv.getContext("2d"),vn=null;(U.shapes||[]).slice().reverse().some(tn=>tn.loops.length?(wt.beginPath(),tn.loops.forEach(we=>{wt.moveTo(we[0][0],we[0][1]),we.forEach(mt=>wt.lineTo(mt[0],mt[1])),wt.closePath()}),wt.isPointInPath(me,We,tn.S.p.layer==="bone"?"nonzero":"evenodd")?(vn=tn.S.p.name,!0):!1):!1),Ke=vn===Ke?null:vn,Wn()}De=null,pe=!1,ht=null}),U.cv.addEventListener("pointercancel",()=>{De=null,pe=!1,ht=null});let Je=new Map,Qe=null;["touchstart","touchmove","touchend","touchcancel"].forEach(ve=>U.cv.addEventListener(ve,ft=>{ft.stopPropagation(),ft.cancelable&&ft.preventDefault()},{passive:!1})),U.cv.addEventListener("pointerdown",ve=>{if(ve.pointerType==="touch"&&(Je.set(ve.pointerId,[ve.clientX,ve.clientY]),Je.size===2)){De=null,pe=!1;let[ft,me]=[...Je.values()];Qe={d:Math.hypot(ft[0]-me[0],ft[1]-me[1]),y:(ft[1]+me[1])/2}}},!0),U.cv.addEventListener("pointermove",ve=>{if(ve.pointerType!=="touch"||!Je.has(ve.pointerId)||(Je.set(ve.pointerId,[ve.clientX,ve.clientY]),Je.size!==2||!Qe))return;ve.stopImmediatePropagation();let[ft,me]=[...Je.values()],We=Math.hypot(ft[0]-me[0],ft[1]-me[1]),wt=(ft[1]+me[1])/2;We>10&&Qe.d>10&&Math.abs(We-Qe.d)>1&&(U.manual=!0,U.half=Math.max(.03,Math.min(1,U.half*Qe.d/We))),U.d+=(wt-Qe.y)*4e-4,Qe={d:We,y:wt},U.praf||(U.praf=requestAnimationFrame(()=>{U.praf=0,Wn()}))},!0);let gt=ve=>{ve.pointerType==="touch"&&(Je.delete(ve.pointerId),Je.size<2&&(Qe=null))};U.cv.addEventListener("pointerup",gt,!0),U.cv.addEventListener("pointercancel",gt,!0),U.cv.addEventListener("dblclick",ve=>{ve.preventDefault(),un||en(U.k)})}),["pointerdown","pointermove","pointerup"].forEach(U=>F.addEventListener(U,pe=>pe.stopPropagation()));let Oi=new ResizeObserver(()=>{ot(),Wn()});Oi.observe(c),Ai={box:F,mini:Ne,mark:null,marks:he,ro:Oi,onEsc:Pn,zoom:U=>{ue.forEach(pe=>{pe.manual=!0,pe.half=Math.max(.03,Math.min(1,pe.half*U))}),Wn()},key:U=>{ue[0].d+=U,Wn()}},ot(),Wn();let ls=window.matchMedia&&(matchMedia("(hover: none)").matches||matchMedia("(max-width: 720px)").matches);(ee||ls)&&en("axial",!0),Ma=null}function Cu(x,S,M){Vr=!1,ee||(window.__jkaWasRad=x),x&&Ru&&Mc(!1);let L=ai;ai=x,Pe.turntable=x,M||(c.classList.add("jka-glide"),setTimeout(()=>c.classList.remove("jka-glide"),450)),c.classList.toggle("jka-radmode",x),Z(),Hs();let Y=Math.tan(lo.degToRad(15))/Math.tan(lo.degToRad(3.5));if(x&&!L){Pe.autoRotate=!1;let J=Pe.level();Ue.fov=7,Ue.far=40,Ue.updateProjectionMatrix();let W=Pe.target.clone().add(Ue.position.clone().sub(Pe.target).multiplyScalar(Y)),_e=Pe.target.clone().add(J.p1.clone().sub(Pe.target).multiplyScalar(Y));M?(Ue.position.copy(_e),J.u1&&Ue.up.copy(J.u1),Ue.lookAt(Pe.target),St=null):(Ue.position.copy(W),St={p0:W,t0:Pe.target.clone(),p1:_e,t1:Pe.target.clone(),s:0,u1:J.u1})}if(!x&&L&&(Ue.fov=30,Ue.far=20,Ue.updateProjectionMatrix(),Ue.position.copy(Pe.target.clone().add(Ue.position.clone().sub(Pe.target).multiplyScalar(1/Y)))),c.querySelectorAll("button[data-l=xray]").forEach(J=>{J.className=x?"jka-b on":"jka-b"}),!S)try{localStorage.setItem("jka-rad",x?"1":"0")}catch{}if(x&&!vi){let J=window.__jkaT||{};J.radStart=Math.round(performance.now()-(J.t0||0));let W={bone:55,muscle:1.5,vessel:3.2,nerve:2.6},_e=new Cr,G=(k,z,ue,K)=>new Wi({uniforms:{mu:{value:k},tg:{value:z?1:0},sh:{value:ue||0},tx:{value:K||0},ctr:{value:new T},fl:{value:1}},vertexShader:"uniform float sh; uniform vec3 ctr; varying float vz; varying vec3 wp; void main(){ vec3 p = position - normal * sh; vec4 w = modelMatrix * vec4(p, 1.); wp = w.xyz; vec4 mv = viewMatrix * w; vec4 mc = viewMatrix * vec4(ctr, 1.); vz = mc.z - mv.z; gl_Position = projectionMatrix * mv; }",fragmentShader:"uniform float mu, tg, tx, fl; varying float vz; varying vec3 wp; float h(vec3 p){ return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); } void main(){ float s = (gl_FrontFacing ? -1. : 1.) * fl; gl_FragColor = vec4(s * vz * mu, s * vz * tg * 40., s * vz * tx, 1.); }",side:Si,depthTest:!1,depthWrite:!1,transparent:!0,blending:zl,blendEquation:Is,blendSrc:Vl,blendDst:Vl}),F={},Q=(k,z)=>{let ue=z.clone();ue.uniforms.ctr.value=k.box.getCenter(new T);let K=new Tn(k.mesh.geometry,ue);K.matrixAutoUpdate=!1,K.matrix.copy(k.mesh.matrixWorld),K.userData.src=k,_e.add(K)};N.forEach(k=>{if(k.layer==="nerve"||k.layer==="vessel"||k.layer==="vein"||k.layer==="ligament"||k.layer==="capsule")return;let z=B.includes(k),ue=k.layer+z;if(k.layer==="bone"){Q(k,F.bo||(F.bo=G(150,!1,0,0))),Q(k,F.bi||(F.bi=G(-150,!1,.006,9))),z&&!tt&&de==="name"&&Q(k,F.bt||(F.bt=G(0,!0,0,0)));return}Q(k,F[ue]||(F[ue]=G(W[k.layer]||2.6,z)))});let ge=(k,z,ue,K)=>{let he=ue.getCenter(new T);[[F.bo||(F.bo=G(150,!1,0,0))],[F.bi||(F.bi=G(-150,!1,.006,9))]].forEach(([Ge])=>{let ot=Ge.clone();ot.uniforms.ctr.value=he,ot.uniforms.fl.value=K?-1:1;let it=new Tn(k,ot);it.matrixAutoUpdate=!1,it.matrix.copy(z),it.userData.always=!0,_e.add(it)})},Ne=new vt().makeScale(-1,1,1);N.forEach(k=>{if(k.layer!=="bone")return;let z=(k.box.min.x+k.box.max.x)/2;if(k.box.min.x<.005&&k.box.max.x>-.005)return;let ue=k.box.clone().applyMatrix4(Ne);ge(k.mesh.geometry,Ne.clone().multiply(k.mesh.matrixWorld),ue,!1)}),Id(n).then(k=>{if(v)return;k.updateMatrixWorld(!0);let z=new Set(N.map(ue=>ue.name));k.traverse(ue=>{!ue.isMesh||(ue.userData||{}).l!=="bone"||z.has(String(ue.userData.n||ue.name).replace(/\.[lr]$/,""))||ge(ue.geometry,ue.matrixWorld,new sn().setFromObject(ue),!1)}),zn=!0}).catch(()=>{});let Ve=new ds(4,4,{type:so,depthBuffer:!1});g.push(Ve);let qe=new Tn(new oo(2,2),new Wi({vertexShader:"varying vec2 vu; void main(){ vu = uv; gl_Position = vec4(position.xy, 0., 1.); }",uniforms:{t:{value:Ve.texture},px:{value:new et(1,1)}},fragmentShader:"uniform sampler2D t; uniform vec2 px; varying vec2 vu; float hh(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); } float vn(vec2 q){ vec2 i = floor(q), f = fract(q); f = f * f * (3. - 2. * f); return mix(mix(hh(i), hh(i + vec2(1, 0)), f.x), mix(hh(i + vec2(0, 1)), hh(i + vec2(1, 1)), f.x), f.y); } vec4 mn(vec4 a, vec4 b){ return min(a, b); } vec4 mx(vec4 a, vec4 b){ return max(a, b); } vec4 med5(vec4 a, vec4 b, vec4 c, vec4 d, vec4 e){  vec4 f = mx(mn(a, b), mn(c, d)); vec4 g = mn(mx(a, b), mx(c, d));  return mx(mn(f, g), mn(mx(f, g), e)) * 0. + mn(mx(mn(f, g), e), mx(f, g)); } void main(){ vec4 a = med5(texture2D(t, vu), texture2D(t, vu + vec2(px.x, 0.)), texture2D(t, vu - vec2(px.x, 0.)),  texture2D(t, vu + vec2(0., px.y)), texture2D(t, vu - vec2(0., px.y))); float n = vn(gl_FragCoord.xy / 4.) * .6 + vn(gl_FragCoord.xy / 1.7) * .4; float tb = max(a.b, 0.) * (0.7 + 0.6 * n); float g = 1. - exp(-max(a.r + tb, 0.)); float k = 1. - exp(-max(a.g, 0.)); float bl = 0.; for (int i = 0; i < 8; i++) { float an = float(i) * 0.785398; vec4 q = texture2D(t, vu + vec2(cos(an), sin(an)) * px * 4.);  bl += 1. - exp(-max(q.r + max(q.b, 0.), 0.)); } bl /= 8.; g = clamp(g + 0.9 * (g - bl), 0., 1.); vec3 c = vec3(g) * 0.92 + 0.03; c = mix(c, vec3(0.37, 0.78, 1.), clamp(k, 0., 1.) * 0.6); gl_FragColor = vec4(c, 1.); }",depthTest:!1,depthWrite:!1})),lt=new Cr;lt.add(qe);let q=null;if(tt&&de==="name"){q=new Cr;let k=new Wi({vertexShader:"attribute float jkw; varying float w; void main(){ w = jkw; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }",fragmentShader:"varying float w; void main(){ if (w < 0.05) discard; gl_FragColor = vec4(0.25, 0.8, 1., clamp(w, 0., 1.) * 0.55); }",transparent:!0,depthTest:!1,depthWrite:!1,side:Si});B.forEach(z=>{let ue=z.mesh.geometry;ue.attributes.jkw||ue.setAttribute("jkw",new An(new Float32Array(ue.attributes.position.count),1));let K=new Tn(ue,k);K.matrixAutoUpdate=!1,K.matrix.copy(z.mesh.matrixWorld),q.add(K)})}vi={rs:_e,rt:Ve,ss:lt,ps:q},J.radBuilt=Math.round(performance.now()-(J.t0||0))}wn.style.display=x?"none":"",p.style.display=x?"none":"",zn=!0}function Hd(){{let S=window.__jkaT||{};S.radFrame==null&&(S.radFrame=Math.round(performance.now()-(S.t0||0)))}let x=u.getDrawingBufferSize(new et);(vi.rt.width!==x.x||vi.rt.height!==x.y)&&(vi.rt.setSize(x.x,x.y),vi.ss.children[0].material.uniforms.px.value.set(1/x.x,1/x.y)),vi.rs.children.forEach(S=>{if(S.userData.always){S.visible=!0;return}let M=S.userData.src;S.visible=M.layer==="bone"||C(M)&&M.mesh.visible}),u.setRenderTarget(vi.rt),u.setClearColor(0,0),u.clear(),u.render(vi.rs,Ue),u.setRenderTarget(null),u.clear(),u.render(vi.ss,Iu),vi.ps&&(vi.ps.children.forEach((S,M)=>{let L=B[M];L&&S.geometry!==L.mesh.geometry&&(S.geometry=L.mesh.geometry)}),u.render(vi.ps,Ue))}let Pu=new Cr,Iu=new Rr(-1,1,1,-1,0,1);Pu.add(new Tn(new oo(2,2),new Wi({vertexShader:"varying vec2 vv; void main(){ vv = uv; gl_Position = vec4(position.xy, 0., 1.); }",fragmentShader:"varying vec2 vv; uniform float ft, fb; void main(){ float a = smoothstep(0., fb, vv.y) * smoothstep(0., ft, 1. - vv.y) * smoothstep(0., .06, vv.x) * smoothstep(0., .06, 1. - vv.x); gl_FragColor = vec4(0., 0., 0., a); }",uniforms:{ft:{value:KE},fb:{value:JE}},transparent:!0,depthTest:!1,depthWrite:!1,blending:zl,blendEquation:Is,blendSrc:Hl,blendDst:Yo,blendSrcAlpha:Hl,blendDstAlpha:Yo}))),u.autoClear=!1;let Ws=document.createElement("div");Ws.className="jka-views";let Xs="http://www.w3.org/2000/svg",Lu=112,as=Lu/2,Sc=42,cs=document.createElementNS(Xs,"svg");cs.setAttribute("viewBox","0 0 "+Lu+" "+Lu),cs.setAttribute("class","jka-gizmo"),Ws.appendChild(cs);let Nu=se?1:-1,Vd=[["anterior","A",[0,0,1],"#7fd8ff"],["posterior","P",[0,0,-1],"#7fd8ff"],["superior","S",[0,1,0],"#ffd36b"],["inferior","I",[0,-1,0],"#ffd36b"],["lateral","L",[Nu,0,0],"#ff8f8f"],["medial","M",[-Nu,0,0],"#ff8f8f"]].map(([x,S,M,L])=>{let Y=document.createElementNS(Xs,"g");Y.setAttribute("class","jka-arm"),Y.dataset.k=x;let J=document.createElementNS(Xs,"line");J.setAttribute("stroke",L);let W=document.createElementNS(Xs,"circle");W.setAttribute("fill",L);let _e=document.createElementNS(Xs,"text");_e.textContent=S,_e.setAttribute("class","jka-gt"),_e.setAttribute("fill",L);let G=document.createElementNS(Xs,"circle");return G.setAttribute("r",11),G.setAttribute("class","jka-hit"),Y.append(J,W,_e,G),cs.appendChild(Y),{k:x,v:new T(...M),g:Y,ln:J,dot:W,tx:_e,hit:G}}),Du=document.createElementNS(Xs,"g");Du.setAttribute("class","jka-gcube");let px=[[[1,0,0],[1,-1,-1],[1,1,-1],[1,1,1],[1,-1,1]],[[-1,0,0],[-1,-1,-1],[-1,-1,1],[-1,1,1],[-1,1,-1]],[[0,1,0],[-1,1,-1],[-1,1,1],[1,1,1],[1,1,-1]],[[0,-1,0],[-1,-1,-1],[1,-1,-1],[1,-1,1],[-1,-1,1]],[[0,0,1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]],[[0,0,-1],[-1,-1,-1],[-1,1,-1],[1,1,-1],[1,-1,-1]]].map(x=>{let S=document.createElementNS(Xs,"polygon");return Du.appendChild(S),{n:new T(...x[0]),c:x.slice(1).map(M=>new T(...M)),pg:S}}),Ec=document.createElementNS(Xs,"polygon");Ec.setAttribute("class","jka-gsec");let mx=[[0,1],[2,3],[4,5],[6,7],[0,2],[1,3],[4,6],[5,7],[0,4],[1,5],[2,6],[3,7]],Gd=[];for(let x=0;x<8;x++)Gd.push(new T(x&1?1:-1,x&2?1:-1,x&4?1:-1));let Wd=7,Xd=new pi,gx=new pi().setFromEuler(new Qo(.38,-.5,0,"YXZ")),r1=new T(0,0,1).applyQuaternion(gx),Uu=new T(.42*Nu,.5,.76).normalize(),qd=new T().crossVectors(new T(0,1,0),Uu).normalize(),xx=new T().crossVectors(Uu,qd),yx=x=>new T(x.dot(qd),x.dot(xx),x.dot(Uu)),Fu="",Wr="section";try{Wr=localStorage.getItem("jka-gizmo")==="axes"?"axes":"section"}catch{}let bo=document.createElement("button");bo.className="jka-gsw",bo.innerHTML='<svg viewBox="0 0 18 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4.20 7.51 A5.2 5.2 0 0 1 13.80 7.51"/><path d="M6.46 6.23 L4.20 7.51 L3.50 5.00"/><path d="M14.50 5.00 L13.80 7.51 L11.54 6.23"/></svg>';let Yd=()=>{bo.removeAttribute("title")};if(Yd(),bo.addEventListener("pointerdown",x=>x.stopPropagation()),bo.addEventListener("click",x=>{x.stopPropagation(),Wr=Wr==="axes"?"section":"axes",Yd(),Fu="";try{localStorage.setItem("jka-gizmo",Wr)}catch{}Kd()}),Ws.insertBefore(bo,Ws.firstChild),!(window.matchMedia&&(matchMedia("(hover: none)").matches||matchMedia("(max-width: 720px)").matches))){let x=c.querySelector(":scope > .jka-zoom");x&&(x.classList.add("jka-zoom-w"),Ws.appendChild(x))}let Mo=document.createElement("button");Mo.className="jka-gpl";let _x='<svg viewBox="0 0 12 12" width="11" height="11"><path d="M3 1.8v8.4l7-4.2z" fill="currentColor"/></svg>',vx='<svg viewBox="0 0 12 12" width="11" height="11"><path d="M2.6 1.8h2.4v8.4H2.6zM7 1.8h2.4v8.4H7z" fill="currentColor"/></svg>',jd=null,Bu=()=>{let x=!!Pe.autoRotate;if(x!==jd){jd=x,Mo.innerHTML=x?vx:_x;let S=c.querySelector(":scope > .jka-mplay");S&&(S.innerHTML=Mo.innerHTML)}};Mo.addEventListener("pointerdown",x=>x.stopPropagation());let Zd=()=>{clearTimeout(Xr),Pe.autoRotate?(Pe.autoRotate=!1,Cs=!0,wa=!0):(wa=!1,Cs=!1,St=null,Pe.autoRotate=!0),Bu()};Mo.addEventListener("click",x=>{x.stopPropagation(),Zd()}),Ws.insertBefore(Mo,Ws.firstChild);let Tc=document.createElement("button");Tc.className="jka-mplay",["touchstart","touchend","pointerdown"].forEach(x=>Tc.addEventListener(x,S=>S.stopPropagation(),{passive:!0})),Tc.addEventListener("click",x=>{x.stopPropagation(),x.preventDefault(),Zd()}),c.appendChild(Tc),Bu();function Kd(){let x=Ue.position.clone().sub(Pe.target).normalize(),S=x.x.toFixed(3)+x.y.toFixed(3)+x.z.toFixed(3)+Wr+(Wr==="axes"?Ue.up.y.toFixed(3):"");if(S===Fu)return;Fu=S,Xd.copy(Ue.quaternion).invert();let M=Wr==="axes",L=M?F=>F.clone().applyQuaternion(Xd):yx;Vd.forEach(F=>{let Q=L(F.v),ge=as+Q.x*Sc,Ne=as-Q.y*Sc;F.depth=Q.z,F.ln.setAttribute("x1",as+Q.x*14),F.ln.setAttribute("y1",as-Q.y*14),F.ln.setAttribute("x2",as+Q.x*(Sc-8)),F.ln.setAttribute("y2",as-Q.y*(Sc-8)),F.dot.setAttribute("r",0),F.hit.setAttribute("cx",ge),F.hit.setAttribute("cy",Ne),F.tx.setAttribute("x",ge),F.tx.setAttribute("y",Ne+.5),F.g.style.opacity=(.45+.55*Math.max(0,F.v.dot(x))).toFixed(2)}),px.forEach(F=>{let Q=L(F.n).z;F.pg.style.display=Q>.01?"":"none",F.pg.setAttribute("points",F.c.map(ge=>{let Ne=L(ge.clone().multiplyScalar(Wd));return(as+Ne.x).toFixed(1)+","+(as-Ne.y).toFixed(1)}).join(" ")),F.pg.style.fillOpacity=(.1+.22*Q).toFixed(2)});let Y=Math.abs(x.y)>.9?new T(0,0,1):new T(0,1,0),J=new T().crossVectors(Y,x).normalize(),W=new T().crossVectors(x,J),_e=15;if(M){let F=Gd.map(Ve=>L(Ve.clone().multiplyScalar(Wd))),Q=[];mx.forEach(([Ve,qe])=>{let lt=F[Ve],q=F[qe];if(lt.z>0!=q.z>0){let k=lt.z/(lt.z-q.z);Q.push([lt.x+(q.x-lt.x)*k,lt.y+(q.y-lt.y)*k])}});let ge=Q.reduce((Ve,qe)=>Ve+qe[0],0)/(Q.length||1),Ne=Q.reduce((Ve,qe)=>Ve+qe[1],0)/(Q.length||1);Q.sort((Ve,qe)=>Math.atan2(Ve[1]-Ne,Ve[0]-ge)-Math.atan2(qe[1]-Ne,qe[0]-ge)),Ec.setAttribute("points",Q.map(Ve=>(as+Ve[0]).toFixed(1)+","+(as-Ve[1]).toFixed(1)).join(" "))}else Ec.setAttribute("points",[[1,1],[1,-1],[-1,-1],[-1,1]].map(([F,Q])=>{let ge=L(J.clone().multiplyScalar(F*_e).addScaledVector(W,Q*_e));return(as+ge.x).toFixed(1)+","+(as-ge.y).toFixed(1)}).join(" "));let G=Vd.slice().sort((F,Q)=>F.depth-Q.depth);G.filter(F=>F.depth<0).forEach(F=>cs.appendChild(F.g)),cs.appendChild(Du),cs.appendChild(Ec),G.filter(F=>F.depth>=0).forEach(F=>cs.appendChild(F.g))}let Rs=null;cs.addEventListener("pointerdown",x=>{x.stopPropagation(),x.preventDefault(),qr(),Rs={x:x.clientX,y:x.clientY,moved:!1,k:x.target.closest(".jka-arm")&&x.target.closest(".jka-arm").dataset.k},cs.setPointerCapture(x.pointerId)});let o1=new kl;cs.addEventListener("pointermove",x=>{if(!Rs)return;let S=x.clientX-Rs.x,M=x.clientY-Rs.y;!Rs.moved&&Math.hypot(S,M)<3||(Rs.moved=!0,Rs.x=x.clientX,Rs.y=x.clientY,St=null,Pe.rotate(S*.018,M*.018),So(),ee||ti())}),cs.addEventListener("pointerup",x=>{let S=Rs;if(Rs=null,!S||S.moved||!S.k)return;let M=Ue.position.distanceTo(Pe.target);St={p0:Ue.position.clone(),t0:Pe.target.clone(),p1:Pe.target.clone().addScaledVector(ox(S.k,se),M),t1:Pe.target.clone(),s:0}}),c.appendChild(Ws);let Ou=document.createElement("div");Ou.className="jka-sect",Ws.appendChild(Ou),c.appendChild(Ea),setTimeout(Hs,0),setTimeout(Hs,300),setTimeout(Hs,650),setTimeout(Hs,1200);let Jd="";function bx(){let x=Ue.position.clone().sub(Pe.target).normalize(),S=new T(x.x*(se?1:-1),x.y,x.z),M=S.x.toFixed(2)+S.y.toFixed(2)+S.z.toFixed(2);if(M===Jd)return;Jd=M;let L=Math.abs(S.x),Y=Math.abs(S.y),J=Math.abs(S.z),W=ge=>Math.round(ge*180/Math.PI),_e,G,F;J>=L&&J>=Y?(_e="Coronal",G=[W(Math.atan2(S.x,J)),S.x>=0?"L":"M"],F=[W(Math.asin(S.y)),S.y>=0?"S":"I"]):L>=Y?(_e="Sagittal",G=[W(Math.atan2(S.z,L)),S.z>=0?"A":"P"],F=[W(Math.asin(S.y)),S.y>=0?"S":"I"]):(_e="Transverse",G=[W(Math.atan2(S.z,Y)),S.z>=0?"A":"P"],F=[W(Math.atan2(S.x,Y)),S.x>=0?"L":"M"]);let Q=[G,F].filter(ge=>Math.abs(ge[0])>=5).map(ge=>Math.abs(ge[0])+"\xB0 "+ge[1]);Ou.innerHTML="<b>"+_e+"</b>"+(Q.length?"<span>"+Q.join(" \xB7 ")+"</span>":"")}window.__jkaView={cam:Ue,ctl:Pe,parts:N,target:B,d:zs,center:lr,renderer:u};let ku=!1,zu=0,zn=!0,$d=0,wc=!1,Qd=0,dr=!0;function So(){zn=!0,dr=!0,wc||(wc=!0,u.setPixelRatio(m),Z()),clearTimeout(Qd),Qd=setTimeout(()=>{wc=!1,u.setPixelRatio(y),Z(),zn=!0},180)}Pe.autoRotateSpeed=1.2;let Cs=!1,Xr=0,wa=t,Ac=()=>{ai||(Pe.autoRotate=!0)};function qr(){Cs=!0,Pe.autoRotate=!1,clearTimeout(Xr),Xr=setTimeout(()=>{Cs=!1,wa||Ac()},9e3)}["pointerdown","wheel"].forEach(x=>u.domElement.addEventListener(x,qr,!0)),u.domElement.addEventListener("pointerup",()=>{setTimeout(()=>{Cs=!1},0)},!0),t||setTimeout(Ac,ee?700:400),Pe.addEventListener("change",()=>{Cs||St?So():(zn=!0,dr=!0),ee||ti()}),ee||ti(),new ResizeObserver(()=>{Z(),zn=!0;try{if(v)return;ai&&vi?Hd():(u.clear(),u.render(O,Ue),u.render(Pu,Iu))}catch{}}).observe(c),Ye.push(...Dt),Ot?Mn(ee?1:0):Gr();let Zi=new Set,Rc=!1,ep=x=>{if(!(!/^Arrow(Left|Right|Up|Down)$/.test(x.key)||x.metaKey||x.ctrlKey||x.altKey)){if(v||!s.isConnected){document.removeEventListener("keydown",ep,!0),document.removeEventListener("keyup",tp,!0);return}x.preventDefault(),x.stopPropagation(),Rc=x.shiftKey,Zi.has(x.key)||(Zi.add(x.key),qr())}},tp=x=>{Zi.delete(x.key),x.key==="Shift"&&(Rc=!1)};_.in_key=(x,S)=>{Rc=!1,S?Zi.has(x)||(Zi.add(x),qr()):Zi.delete(x)},_.in_zoom=x=>zd(x>0?.75:1/.75),document.addEventListener("keydown",ep,!0),document.addEventListener("keyup",tp,!0),window.addEventListener("blur",()=>Zi.clear());let np=-1e9;(function x(S){if(v||!s.isConnected){v||_.stop();return}if(requestAnimationFrame(x),St){St.s||(St.s=S);let L=Math.min(1,(S-St.s)/500),Y=1-Math.pow(1-L,3);Ue.position.lerpVectors(St.p0,St.p1,Y),Pe.target.lerpVectors(St.t0,St.t1,Y),St.u0||(St.u0=Ue.up.clone(),St.u1=St.u1||rx(St.p1.clone().sub(St.t1).normalize())),Ue.up.lerpVectors(St.u0,St.u1,Y).normalize(),St.q0&&(Fe.lerpVectors(St.q0,St.q1,Y),Xe()),zn=!0,L>=1&&(St=null)}let M=zu?Math.min(.05,(S-zu)/1e3):0;if(zu=S,Ai){let L=(Zi.has("ArrowUp")?1:0)-(Zi.has("ArrowDown")?1:0);if(L&&Ai.key(L*.06*M),!Ai.mini)return;Pe.update(M),zn&&(zn=!1,u.clear(),u.render(O,Ue));return}if(Zi.size&&!St){let L=1.7*M,Y=(Zi.has("ArrowRight")?1:0)-(Zi.has("ArrowLeft")?1:0),J=(Zi.has("ArrowDown")?1:0)-(Zi.has("ArrowUp")?1:0);(Y||J)&&Rc?(Cs=!0,Fe.x+=Y*420*M,Fe.y+=J*420*M,Xe(),So(),ee||ti(),clearTimeout(Xr),Xr=setTimeout(()=>{Cs=!1,wa||Ac()},9e3)):(Y||J)&&(Cs=!0,Pe.rotate(Y*L,J*L),clearTimeout(Xr),Xr=setTimeout(()=>{Cs=!1,wa||Ac()},9e3))}if(St?Ue.lookAt(Pe.target):Pe.update(M),!(Vr&&!ai)){if(!zn&&S>1500){(ku||ba)&&(ku=Fd(S));return}t&&S-np<32||(np=S,zn=!1,b.position.copy(Ue.position).add(new T(.3,.5,.2)),!wc&&dr&&S-$d>(t?400:Pe.autoRotate?200:60)&&($d=S,dr=!1,xo(),lx()),ai&&vi?Hd():(u.clear(),u.render(O,Ue),u.render(Pu,Iu)),c.classList.contains("jka-shown")||requestAnimationFrame(()=>c.classList.add("jka-shown")),Kd(),bx(),Bu(),ku=Fd(S))}})(0),setTimeout(()=>{xo(),zn=!0},50)}return _}window.JKANAT={v:70,mount:n1,input:(s,e,t)=>{let n=_c&&_c["in_"+s];return n&&n(e,t),!!n}};(window.__jkaQ||[]).splice(0).forEach(s=>s())});i1();})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2023 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
