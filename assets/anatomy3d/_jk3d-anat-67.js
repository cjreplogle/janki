(()=>{var bx=Object.create;var Jd=Object.defineProperty;var Mx=Object.getOwnPropertyDescriptor;var Ex=Object.getOwnPropertyNames;var Sx=Object.getPrototypeOf,Tx=Object.prototype.hasOwnProperty;var Ft=(s,e)=>()=>(s&&(e=s(s=0)),e);var $d=(s,e)=>()=>(e||s((e={exports:{}}).exports,e),e.exports);var wx=(s,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of Ex(e))!Tx.call(s,i)&&i!==t&&Jd(s,i,{get:()=>e[i],enumerable:!(n=Mx(e,i))||n.enumerable});return s};var Ax=(s,e,t)=>(t=s!=null?bx(Sx(s)):{},wx(e||!s||!s.__esModule?Jd(t,"default",{value:s,enumerable:!0}):t,s));var Qd=$d(()=>{(function(){var s=typeof console!="undefined"&&console||(globalThis.console={}),e=typeof s.log=="function"?s.log.bind(s):function(){};["error","warn","info","debug","trace","group","groupEnd","time","timeEnd","table","assert"].forEach(function(t){typeof s[t]!="function"&&(s[t]=t==="assert"?function(){}:e)})})()});function Ts(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ui[s&255]+Ui[s>>8&255]+Ui[s>>16&255]+Ui[s>>24&255]+"-"+Ui[e&255]+Ui[e>>8&255]+"-"+Ui[e>>16&15|64]+Ui[e>>24&255]+"-"+Ui[t&63|128]+Ui[t>>8&255]+"-"+Ui[t>>16&255]+Ui[t>>24&255]+Ui[n&255]+Ui[n>>8&255]+Ui[n>>16&255]+Ui[n>>24&255]).toLowerCase()}function ri(s,e,t){return Math.max(e,Math.min(t,s))}function mf(s,e){return(s%e+e)%e}function Sy(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function Ty(s,e,t){return s!==e?(t-s)/(e-s):0}function Ua(s,e,t){return(1-t)*s+t*e}function wy(s,e,t,n){return Ua(s,e,1-Math.exp(-t*n))}function Ay(s,e=1){return e-Math.abs(mf(s,e*2)-e)}function Ry(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Cy(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Py(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Iy(s,e){return s+Math.random()*(e-s)}function Ly(s){return s*(.5-Math.random())}function Ny(s){s!==void 0&&(Bp=s);let e=Bp+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Dy(s){return s*Da}function Uy(s){return s*qo}function Ah(s){return(s&s-1)===0&&s!==0}function Fy(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function ul(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function By(s,e,t,n,i){let r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),u=o((e+n)/2),h=r((e-n)/2),f=o((e-n)/2),d=r((n-e)/2),g=o((n-e)/2);switch(i){case"XYX":s.set(a*u,c*h,c*f,a*l);break;case"YZY":s.set(c*f,a*u,c*h,a*l);break;case"ZXZ":s.set(c*h,c*f,a*u,a*l);break;case"XZX":s.set(a*u,c*g,c*d,a*l);break;case"YXY":s.set(c*d,a*u,c*g,a*l);break;case"ZYZ":s.set(c*g,c*d,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Us(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Pn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}function o0(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Va(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Oy(){let s=Va("canvas");return s.style.display="block",s}function Fa(s){s in Op||(Op[s]=!0,console.warn(s))}function ko(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Xu(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}function qu(s){return typeof HTMLImageElement!="undefined"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&s instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&s instanceof ImageBitmap?hl.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}function ju(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){qr.fromArray(s,r);let a=i.x*Math.abs(qr.x)+i.y*Math.abs(qr.y)+i.z*Math.abs(qr.z),c=e.dot(qr),l=t.dot(qr),u=n.dot(qr);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}function ih(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}function $y(s,e,t,n,i,r,o,a){let c;if(e.side===Oi?c=n.intersectTriangle(o,r,i,!0,a):c=n.intersectTriangle(i,r,o,e.side===Wi,a),c===null)return null;Wc.copy(a),Wc.applyMatrix4(s.matrixWorld);let l=t.ray.origin.distanceTo(Wc);return l<t.near||l>t.far?null:{distance:l,point:Wc.clone(),object:s}}function Xc(s,e,t,n,i,r,o,a,c,l){s.getVertexPosition(a,Ro),s.getVertexPosition(c,Co),s.getVertexPosition(l,Po);let u=$y(s,e,t,n,Ro,Co,Po,Gc);if(u){i&&(zc.fromBufferAttribute(i,a),Hc.fromBufferAttribute(i,c),Vc.fromBufferAttribute(i,l),u.uv=is.getInterpolation(Gc,Ro,Co,Po,zc,Hc,Vc,new tt)),r&&(zc.fromBufferAttribute(r,a),Hc.fromBufferAttribute(r,c),Vc.fromBufferAttribute(r,l),u.uv1=is.getInterpolation(Gc,Ro,Co,Po,zc,Hc,Vc,new tt),u.uv2=u.uv1),o&&(Jp.fromBufferAttribute(o,a),$p.fromBufferAttribute(o,c),Qp.fromBufferAttribute(o,l),u.normal=is.getInterpolation(Gc,Ro,Co,Po,Jp,$p,Qp,new T),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a,b:c,c:l,normal:new T,materialIndex:0};is.getNormal(Ro,Co,Po,h.normal),u.face=h}return u}function Ko(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Vi(s){let e={};for(let t=0;t<s.length;t++){let n=Ko(s[t]);for(let i in n)e[i]=n[i]}return e}function Qy(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function c0(s){return s.getRenderTarget()===null?s.outputColorSpace:bn.workingColorSpace}function l0(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function r_(s,e){let t=e.isWebGL2,n=new WeakMap;function i(l,u){let h=l.array,f=l.usage,d=h.byteLength,g=s.createBuffer();s.bindBuffer(u,g),s.bufferData(u,h,f),l.onUploadCallback();let _;if(h instanceof Float32Array)_=s.FLOAT;else if(h instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)_=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=s.UNSIGNED_SHORT;else if(h instanceof Int16Array)_=s.SHORT;else if(h instanceof Uint32Array)_=s.UNSIGNED_INT;else if(h instanceof Int32Array)_=s.INT;else if(h instanceof Int8Array)_=s.BYTE;else if(h instanceof Uint8Array)_=s.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)_=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:g,type:_,bytesPerElement:h.BYTES_PER_ELEMENT,version:l.version,size:d}}function r(l,u,h){let f=u.array,d=u._updateRange,g=u.updateRanges;if(s.bindBuffer(h,l),d.count===-1&&g.length===0&&s.bufferSubData(h,0,f),g.length!==0){for(let _=0,m=g.length;_<m;_++){let p=g[_];t?s.bufferSubData(h,p.start*f.BYTES_PER_ELEMENT,f,p.start,p.count):s.bufferSubData(h,p.start*f.BYTES_PER_ELEMENT,f.subarray(p.start,p.start+p.count))}u.clearUpdateRanges()}d.count!==-1&&(t?s.bufferSubData(h,d.offset*f.BYTES_PER_ELEMENT,f,d.offset,d.count):s.bufferSubData(h,d.offset*f.BYTES_PER_ELEMENT,f.subarray(d.offset,d.offset+d.count)),d.count=-1),u.onUploadCallback()}function o(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);let u=n.get(l);u&&(s.deleteBuffer(u.buffer),n.delete(l))}function c(l,u){if(l.isGLBufferAttribute){let f=n.get(l);(!f||f.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);let h=n.get(l);if(h===void 0)n.set(l,i(l,u));else if(h.version<l.version){if(h.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(h.buffer,l,u),h.version=l.version}}return{get:o,remove:a,update:c}}function kb(s,e,t,n,i,r,o){let a=new Pt(0),c=r===!0?0:1,l,u,h=null,f=0,d=null;function g(m,p){let v=!1,x=p.isScene===!0?p.background:null;x&&x.isTexture&&(x=(p.backgroundBlurriness>0?t:e).get(x)),x===null?_(a,c):x&&x.isColor&&(_(x,1),v=!0);let b=s.xr.getEnvironmentBlendMode();b==="additive"?n.buffers.color.setClear(0,0,0,1,o):b==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||v)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),x&&(x.isCubeTexture||x.mapping===zl)?(u===void 0&&(u=new Mn(new Wa(1,1,1),new qi({name:"BackgroundCubeMaterial",uniforms:Ko(Ns.backgroundCube.uniforms),vertexShader:Ns.backgroundCube.vertexShader,fragmentShader:Ns.backgroundCube.fragmentShader,side:Oi,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(P,w,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),u.material.uniforms.envMap.value=x,u.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,u.material.toneMapped=bn.getTransfer(x.colorSpace)!==Hn,(h!==x||f!==x.version||d!==s.toneMapping)&&(u.material.needsUpdate=!0,h=x,f=x.version,d=s.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new Mn(new so(2,2),new qi({name:"BackgroundMaterial",uniforms:Ko(Ns.background.uniforms),vertexShader:Ns.background.vertexShader,fragmentShader:Ns.background.fragmentShader,side:Wi,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,l.material.toneMapped=bn.getTransfer(x.colorSpace)!==Hn,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||f!==x.version||d!==s.toneMapping)&&(l.material.needsUpdate=!0,h=x,f=x.version,d=s.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function _(m,p){m.getRGB(Yc,c0(s)),n.buffers.color.setClear(Yc.r,Yc.g,Yc.b,p,o)}return{getClearColor:function(){return a},setClearColor:function(m,p=1){a.set(m),c=p,_(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,_(a,c)},render:g}}function zb(s,e,t,n){let i=s.getParameter(s.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||r!==null,a={},c=m(null),l=c,u=!1;function h(I,X,ce,ne,ie){let ye=!1;if(o){let Pe=_(ne,ce,X);l!==Pe&&(l=Pe,d(l.object)),ye=p(I,ne,ce,ie),ye&&v(I,ne,ce,ie)}else{let Pe=X.wireframe===!0;(l.geometry!==ne.id||l.program!==ce.id||l.wireframe!==Pe)&&(l.geometry=ne.id,l.program=ce.id,l.wireframe=Pe,ye=!0)}ie!==null&&t.update(ie,s.ELEMENT_ARRAY_BUFFER),(ye||u)&&(u=!1,H(I,X,ce,ne),ie!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(ie).buffer))}function f(){return n.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function d(I){return n.isWebGL2?s.bindVertexArray(I):r.bindVertexArrayOES(I)}function g(I){return n.isWebGL2?s.deleteVertexArray(I):r.deleteVertexArrayOES(I)}function _(I,X,ce){let ne=ce.wireframe===!0,ie=a[I.id];ie===void 0&&(ie={},a[I.id]=ie);let ye=ie[X.id];ye===void 0&&(ye={},ie[X.id]=ye);let Pe=ye[ne];return Pe===void 0&&(Pe=m(f()),ye[ne]=Pe),Pe}function m(I){let X=[],ce=[],ne=[];for(let ie=0;ie<i;ie++)X[ie]=0,ce[ie]=0,ne[ie]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:X,enabledAttributes:ce,attributeDivisors:ne,object:I,attributes:{},index:null}}function p(I,X,ce,ne){let ie=l.attributes,ye=X.attributes,Pe=0,_e=ce.getAttributes();for(let st in _e)if(_e[st].location>=0){let Ne=ie[st],Ge=ye[st];if(Ge===void 0&&(st==="instanceMatrix"&&I.instanceMatrix&&(Ge=I.instanceMatrix),st==="instanceColor"&&I.instanceColor&&(Ge=I.instanceColor)),Ne===void 0||Ne.attribute!==Ge||Ge&&Ne.data!==Ge.data)return!0;Pe++}return l.attributesNum!==Pe||l.index!==ne}function v(I,X,ce,ne){let ie={},ye=X.attributes,Pe=0,_e=ce.getAttributes();for(let st in _e)if(_e[st].location>=0){let Ne=ye[st];Ne===void 0&&(st==="instanceMatrix"&&I.instanceMatrix&&(Ne=I.instanceMatrix),st==="instanceColor"&&I.instanceColor&&(Ne=I.instanceColor));let Ge={};Ge.attribute=Ne,Ne&&Ne.data&&(Ge.data=Ne.data),ie[st]=Ge,Pe++}l.attributes=ie,l.attributesNum=Pe,l.index=ne}function x(){let I=l.newAttributes;for(let X=0,ce=I.length;X<ce;X++)I[X]=0}function b(I){P(I,0)}function P(I,X){let ce=l.newAttributes,ne=l.enabledAttributes,ie=l.attributeDivisors;ce[I]=1,ne[I]===0&&(s.enableVertexAttribArray(I),ne[I]=1),ie[I]!==X&&((n.isWebGL2?s:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](I,X),ie[I]=X)}function w(){let I=l.newAttributes,X=l.enabledAttributes;for(let ce=0,ne=X.length;ce<ne;ce++)X[ce]!==I[ce]&&(s.disableVertexAttribArray(ce),X[ce]=0)}function C(I,X,ce,ne,ie,ye,Pe){Pe===!0?s.vertexAttribIPointer(I,X,ce,ie,ye):s.vertexAttribPointer(I,X,ce,ne,ie,ye)}function H(I,X,ce,ne){if(n.isWebGL2===!1&&(I.isInstancedMesh||ne.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();let ie=ne.attributes,ye=ce.getAttributes(),Pe=X.defaultAttributeValues;for(let _e in ye){let st=ye[_e];if(st.location>=0){let ee=ie[_e];if(ee===void 0&&(_e==="instanceMatrix"&&I.instanceMatrix&&(ee=I.instanceMatrix),_e==="instanceColor"&&I.instanceColor&&(ee=I.instanceColor)),ee!==void 0){let Ne=ee.normalized,Ge=ee.itemSize,vt=t.get(ee);if(vt===void 0)continue;let wt=vt.buffer,Xt=vt.type,Qt=vt.bytesPerElement,Bt=n.isWebGL2===!0&&(Xt===s.INT||Xt===s.UNSIGNED_INT||ee.gpuType===Zm);if(ee.isInterleavedBufferAttribute){let gn=ee.data,re=gn.stride,xi=ee.offset;if(gn.isInstancedInterleavedBuffer){for(let Ot=0;Ot<st.locationSize;Ot++)P(st.location+Ot,gn.meshPerAttribute);I.isInstancedMesh!==!0&&ne._maxInstanceCount===void 0&&(ne._maxInstanceCount=gn.meshPerAttribute*gn.count)}else for(let Ot=0;Ot<st.locationSize;Ot++)b(st.location+Ot);s.bindBuffer(s.ARRAY_BUFFER,wt);for(let Ot=0;Ot<st.locationSize;Ot++)C(st.location+Ot,Ge/st.locationSize,Xt,Ne,re*Qt,(xi+Ge/st.locationSize*Ot)*Qt,Bt)}else{if(ee.isInstancedBufferAttribute){for(let gn=0;gn<st.locationSize;gn++)P(st.location+gn,ee.meshPerAttribute);I.isInstancedMesh!==!0&&ne._maxInstanceCount===void 0&&(ne._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let gn=0;gn<st.locationSize;gn++)b(st.location+gn);s.bindBuffer(s.ARRAY_BUFFER,wt);for(let gn=0;gn<st.locationSize;gn++)C(st.location+gn,Ge/st.locationSize,Xt,Ne,Ge*Qt,Ge/st.locationSize*gn*Qt,Bt)}}else if(Pe!==void 0){let Ne=Pe[_e];if(Ne!==void 0)switch(Ne.length){case 2:s.vertexAttrib2fv(st.location,Ne);break;case 3:s.vertexAttrib3fv(st.location,Ne);break;case 4:s.vertexAttrib4fv(st.location,Ne);break;default:s.vertexAttrib1fv(st.location,Ne)}}}}w()}function M(){F();for(let I in a){let X=a[I];for(let ce in X){let ne=X[ce];for(let ie in ne)g(ne[ie].object),delete ne[ie];delete X[ce]}delete a[I]}}function R(I){if(a[I.id]===void 0)return;let X=a[I.id];for(let ce in X){let ne=X[ce];for(let ie in ne)g(ne[ie].object),delete ne[ie];delete X[ce]}delete a[I.id]}function V(I){for(let X in a){let ce=a[X];if(ce[I.id]===void 0)continue;let ne=ce[I.id];for(let ie in ne)g(ne[ie].object),delete ne[ie];delete ce[I.id]}}function F(){le(),u=!0,l!==c&&(l=c,d(l.object))}function le(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:h,reset:F,resetDefaultState:le,dispose:M,releaseStatesOfGeometry:R,releaseStatesOfProgram:V,initAttributes:x,enableAttribute:b,disableUnusedAttributes:w}}function Hb(s,e,t,n){let i=n.isWebGL2,r;function o(u){r=u}function a(u,h){s.drawArrays(r,u,h),t.update(h,r,1)}function c(u,h,f){if(f===0)return;let d,g;if(i)d=s,g="drawArraysInstanced";else if(d=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[g](r,u,h,f),t.update(h,r,f)}function l(u,h,f){if(f===0)return;let d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<f;g++)this.render(u[g],h[g]);else{d.multiDrawArraysWEBGL(r,u,0,h,0,f);let g=0;for(let _=0;_<f;_++)g+=h[_];t.update(g,r,1)}}this.setMode=o,this.render=a,this.renderInstances=c,this.renderMultiDraw=l}function Vb(s,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){let C=e.get("EXT_texture_filter_anisotropic");n=s.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(C){if(C==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let o=typeof WebGL2RenderingContext!="undefined"&&s.constructor.name==="WebGL2RenderingContext",a=t.precision!==void 0?t.precision:"highp",c=r(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);let l=o||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,h=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),d=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),_=s.getParameter(s.MAX_VERTEX_ATTRIBS),m=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),p=s.getParameter(s.MAX_VARYING_VECTORS),v=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),x=f>0,b=o||e.has("OES_texture_float"),P=x&&b,w=o?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:l,getMaxAnisotropy:i,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:f,maxTextureSize:d,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:v,vertexTextures:x,floatFragmentTextures:b,floatVertexTextures:P,maxSamples:w}}function Gb(s){let e=this,t=null,n=0,i=!1,r=!1,o=new es,a=new hn,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){let d=h.length!==0||f||n!==0||i;return i=f,n=h.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,d){let g=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,p=s.get(h);if(!i||g===null||g.length===0||r&&!m)r?u(null):l();else{let v=r?0:n,x=v*4,b=p.clippingState||null;c.value=b,b=u(g,f,x,d);for(let P=0;P!==x;++P)b[P]=t[P];p.clippingState=b,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,f,d,g){let _=h!==null?h.length:0,m=null;if(_!==0){if(m=c.value,g!==!0||m===null){let p=d+_*4,v=f.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,b=d;x!==_;++x,b+=4)o.copy(h[x]).applyMatrix4(v,a),o.normal.toArray(m,b),m[b+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function Wb(s){let e=new WeakMap;function t(o,a){return a===Eh?o.mapping=Vo:a===Sh&&(o.mapping=Go),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Eh||a===Sh)if(e.has(o)){let c=e.get(o).texture;return t(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new Ih(c.height/2);return l.fromEquirectangularTexture(s,o),e.set(o,l),o.addEventListener("dispose",i),t(l.texture,o.mapping)}else return null}}return o}function i(o){let a=o.target;a.removeEventListener("dispose",i);let c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}function Xb(s){let e=[],t=[],n=[],i=s,r=s-Fo+1+em.length;for(let o=0;o<r;o++){let a=Math.pow(2,i);t.push(a);let c=1/a;o>s-Fo?c=em[o-s+Fo-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),u=-l,h=1+l,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,g=6,_=3,m=2,p=1,v=new Float32Array(_*g*d),x=new Float32Array(m*g*d),b=new Float32Array(p*g*d);for(let w=0;w<d;w++){let C=w%3*2/3-1,H=w>2?0:-1,M=[C,H,0,C+2/3,H,0,C+2/3,H+1,0,C,H,0,C+2/3,H+1,0,C,H+1,0];v.set(M,_*g*w),x.set(f,m*g*w);let R=[w,w,w,w,w,w];b.set(R,p*g*w)}let P=new wi;P.setAttribute("position",new wn(v,_)),P.setAttribute("uv",new wn(x,m)),P.setAttribute("faceIndex",new wn(b,p)),e.push(P),i>Fo&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function im(s,e,t){let n=new ds(s,e,t);return n.texture.mapping=zl,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function jc(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function qb(s,e,t){let n=new Float32Array(Jr),i=new T(0,1,0);return new qi({name:"SphericalGaussianBlur",defines:{n:Jr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:gf(),fragmentShader:`

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
		`,blending:br,depthTest:!1,depthWrite:!1})}function sm(){return new qi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:gf(),fragmentShader:`

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
		`,blending:br,depthTest:!1,depthWrite:!1})}function rm(){return new qi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:gf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:br,depthTest:!1,depthWrite:!1})}function gf(){return`

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
	`}function Yb(s){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===Eh||c===Sh,u=c===Vo||c===Go;if(l||u)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let h=e.get(a);return t===null&&(t=new gl(s)),h=l?t.fromEquirectangular(a,h):t.fromCubemap(a,h),e.set(a,h),h.texture}else{if(e.has(a))return e.get(a).texture;{let h=a.image;if(l&&h&&h.height>0||u&&h&&i(h)){t===null&&(t=new gl(s));let f=l?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,f),a.addEventListener("dispose",r),f.texture}else return null}}}return a}function i(a){let c=0,l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function jb(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){let i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Zb(s,e,t,n){let i={},r=new WeakMap;function o(h){let f=h.target;f.index!==null&&e.remove(f.index);for(let g in f.attributes)e.remove(f.attributes[g]);for(let g in f.morphAttributes){let _=f.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)e.remove(_[m])}f.removeEventListener("dispose",o),delete i[f.id];let d=r.get(f);d&&(e.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(h,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,t.memory.geometries++),f}function c(h){let f=h.attributes;for(let g in f)e.update(f[g],s.ARRAY_BUFFER);let d=h.morphAttributes;for(let g in d){let _=d[g];for(let m=0,p=_.length;m<p;m++)e.update(_[m],s.ARRAY_BUFFER)}}function l(h){let f=[],d=h.index,g=h.attributes.position,_=0;if(d!==null){let v=d.array;_=d.version;for(let x=0,b=v.length;x<b;x+=3){let P=v[x+0],w=v[x+1],C=v[x+2];f.push(P,w,w,C,C,P)}}else if(g!==void 0){let v=g.array;_=g.version;for(let x=0,b=v.length/3-1;x<b;x+=3){let P=x+0,w=x+1,C=x+2;f.push(P,w,w,C,C,P)}}else return;let m=new(o0(f)?Zo:jo)(f,1);m.version=_;let p=r.get(h);p&&e.remove(p),r.set(h,m)}function u(h){let f=r.get(h);if(f){let d=h.index;d!==null&&f.version<d.version&&l(h)}else l(h);return r.get(h)}return{get:a,update:c,getWireframeAttribute:u}}function Kb(s,e,t,n){let i=n.isWebGL2,r;function o(d){r=d}let a,c;function l(d){a=d.type,c=d.bytesPerElement}function u(d,g){s.drawElements(r,g,a,d*c),t.update(g,r,1)}function h(d,g,_){if(_===0)return;let m,p;if(i)m=s,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](r,g,a,d*c,_),t.update(g,r,_)}function f(d,g,_){if(_===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<_;p++)this.render(d[p]/c,g[p]);else{m.multiDrawElementsWEBGL(r,g,0,a,d,0,_);let p=0;for(let v=0;v<_;v++)p+=g[v];t.update(p,r,1)}}this.setMode=o,this.setIndex=l,this.render=u,this.renderInstances=h,this.renderMultiDraw=f}function Jb(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function $b(s,e){return s[0]-e[0]}function Qb(s,e){return Math.abs(e[1])-Math.abs(s[1])}function eM(s,e,t){let n={},i=new Float32Array(8),r=new WeakMap,o=new Nn,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function c(l,u,h){let f=l.morphTargetInfluences;if(e.isWebGL2===!0){let d=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,g=d!==void 0?d.length:0,_=r.get(u);if(_===void 0||_.count!==g){let I=function(){F.dispose(),r.delete(u),u.removeEventListener("dispose",I)};_!==void 0&&_.texture.dispose();let v=u.morphAttributes.position!==void 0,x=u.morphAttributes.normal!==void 0,b=u.morphAttributes.color!==void 0,P=u.morphAttributes.position||[],w=u.morphAttributes.normal||[],C=u.morphAttributes.color||[],H=0;v===!0&&(H=1),x===!0&&(H=2),b===!0&&(H=3);let M=u.attributes.position.count*H,R=1;M>e.maxTextureSize&&(R=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);let V=new Float32Array(M*R*4*g),F=new dl(V,M,R,g);F.type=Fs,F.needsUpdate=!0;let le=H*4;for(let X=0;X<g;X++){let ce=P[X],ne=w[X],ie=C[X],ye=M*R*4*X;for(let Pe=0;Pe<ce.count;Pe++){let _e=Pe*le;v===!0&&(o.fromBufferAttribute(ce,Pe),V[ye+_e+0]=o.x,V[ye+_e+1]=o.y,V[ye+_e+2]=o.z,V[ye+_e+3]=0),x===!0&&(o.fromBufferAttribute(ne,Pe),V[ye+_e+4]=o.x,V[ye+_e+5]=o.y,V[ye+_e+6]=o.z,V[ye+_e+7]=0),b===!0&&(o.fromBufferAttribute(ie,Pe),V[ye+_e+8]=o.x,V[ye+_e+9]=o.y,V[ye+_e+10]=o.z,V[ye+_e+11]=ie.itemSize===4?o.w:1)}}_={count:g,texture:F,size:new tt(M,R)},r.set(u,_),u.addEventListener("dispose",I)}let m=0;for(let v=0;v<f.length;v++)m+=f[v];let p=u.morphTargetsRelative?1:1-m;h.getUniforms().setValue(s,"morphTargetBaseInfluence",p),h.getUniforms().setValue(s,"morphTargetInfluences",f),h.getUniforms().setValue(s,"morphTargetsTexture",_.texture,t),h.getUniforms().setValue(s,"morphTargetsTextureSize",_.size)}else{let d=f===void 0?0:f.length,g=n[u.id];if(g===void 0||g.length!==d){g=[];for(let x=0;x<d;x++)g[x]=[x,0];n[u.id]=g}for(let x=0;x<d;x++){let b=g[x];b[0]=x,b[1]=f[x]}g.sort(Qb);for(let x=0;x<8;x++)x<d&&g[x][1]?(a[x][0]=g[x][0],a[x][1]=g[x][1]):(a[x][0]=Number.MAX_SAFE_INTEGER,a[x][1]=0);a.sort($b);let _=u.morphAttributes.position,m=u.morphAttributes.normal,p=0;for(let x=0;x<8;x++){let b=a[x],P=b[0],w=b[1];P!==Number.MAX_SAFE_INTEGER&&w?(_&&u.getAttribute("morphTarget"+x)!==_[P]&&u.setAttribute("morphTarget"+x,_[P]),m&&u.getAttribute("morphNormal"+x)!==m[P]&&u.setAttribute("morphNormal"+x,m[P]),i[x]=w,p+=w):(_&&u.hasAttribute("morphTarget"+x)===!0&&u.deleteAttribute("morphTarget"+x),m&&u.hasAttribute("morphNormal"+x)===!0&&u.deleteAttribute("morphNormal"+x),i[x]=0)}let v=u.morphTargetsRelative?1:1-p;h.getUniforms().setValue(s,"morphTargetBaseInfluence",v),h.getUniforms().setValue(s,"morphTargetInfluences",i)}}return{update:c}}function tM(s,e,t,n){let i=new WeakMap;function r(c){let l=n.render.frame,u=c.geometry,h=e.get(c,u);if(i.get(h)!==l&&(e.update(h),i.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;i.get(f)!==l&&(f.update(),i.set(f,l))}return h}function o(){i=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}function ea(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=om[i];if(r===void 0&&(r=new Float32Array(i),om[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function mi(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function gi(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Gl(s,e){let t=am[e];t===void 0&&(t=new Int32Array(e),am[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function nM(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function iM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mi(t,e))return;s.uniform2fv(this.addr,e),gi(t,e)}}function sM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(mi(t,e))return;s.uniform3fv(this.addr,e),gi(t,e)}}function rM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mi(t,e))return;s.uniform4fv(this.addr,e),gi(t,e)}}function oM(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(mi(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),gi(t,e)}else{if(mi(t,n))return;um.set(n),s.uniformMatrix2fv(this.addr,!1,um),gi(t,n)}}function aM(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(mi(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),gi(t,e)}else{if(mi(t,n))return;lm.set(n),s.uniformMatrix3fv(this.addr,!1,lm),gi(t,n)}}function cM(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(mi(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),gi(t,e)}else{if(mi(t,n))return;cm.set(n),s.uniformMatrix4fv(this.addr,!1,cm),gi(t,n)}}function lM(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function uM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mi(t,e))return;s.uniform2iv(this.addr,e),gi(t,e)}}function hM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mi(t,e))return;s.uniform3iv(this.addr,e),gi(t,e)}}function fM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mi(t,e))return;s.uniform4iv(this.addr,e),gi(t,e)}}function dM(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function pM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mi(t,e))return;s.uniform2uiv(this.addr,e),gi(t,e)}}function mM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mi(t,e))return;s.uniform3uiv(this.addr,e),gi(t,e)}}function gM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mi(t,e))return;s.uniform4uiv(this.addr,e),gi(t,e)}}function xM(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r=this.type===s.SAMPLER_2D_SHADOW?h0:u0;t.setTexture2D(e||r,i)}function yM(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||d0,i)}function _M(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||p0,i)}function vM(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||f0,i)}function bM(s){switch(s){case 5126:return nM;case 35664:return iM;case 35665:return sM;case 35666:return rM;case 35674:return oM;case 35675:return aM;case 35676:return cM;case 5124:case 35670:return lM;case 35667:case 35671:return uM;case 35668:case 35672:return hM;case 35669:case 35673:return fM;case 5125:return dM;case 36294:return pM;case 36295:return mM;case 36296:return gM;case 35678:case 36198:case 36298:case 36306:case 35682:return xM;case 35679:case 36299:case 36307:return yM;case 35680:case 36300:case 36308:case 36293:return _M;case 36289:case 36303:case 36311:case 36292:return vM}}function MM(s,e){s.uniform1fv(this.addr,e)}function EM(s,e){let t=ea(e,this.size,2);s.uniform2fv(this.addr,t)}function SM(s,e){let t=ea(e,this.size,3);s.uniform3fv(this.addr,t)}function TM(s,e){let t=ea(e,this.size,4);s.uniform4fv(this.addr,t)}function wM(s,e){let t=ea(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function AM(s,e){let t=ea(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function RM(s,e){let t=ea(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function CM(s,e){s.uniform1iv(this.addr,e)}function PM(s,e){s.uniform2iv(this.addr,e)}function IM(s,e){s.uniform3iv(this.addr,e)}function LM(s,e){s.uniform4iv(this.addr,e)}function NM(s,e){s.uniform1uiv(this.addr,e)}function DM(s,e){s.uniform2uiv(this.addr,e)}function UM(s,e){s.uniform3uiv(this.addr,e)}function FM(s,e){s.uniform4uiv(this.addr,e)}function BM(s,e,t){let n=this.cache,i=e.length,r=Gl(t,i);mi(n,r)||(s.uniform1iv(this.addr,r),gi(n,r));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||u0,r[o])}function OM(s,e,t){let n=this.cache,i=e.length,r=Gl(t,i);mi(n,r)||(s.uniform1iv(this.addr,r),gi(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||d0,r[o])}function kM(s,e,t){let n=this.cache,i=e.length,r=Gl(t,i);mi(n,r)||(s.uniform1iv(this.addr,r),gi(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||p0,r[o])}function zM(s,e,t){let n=this.cache,i=e.length,r=Gl(t,i);mi(n,r)||(s.uniform1iv(this.addr,r),gi(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||f0,r[o])}function HM(s){switch(s){case 5126:return MM;case 35664:return EM;case 35665:return SM;case 35666:return TM;case 35674:return wM;case 35675:return AM;case 35676:return RM;case 5124:case 35670:return CM;case 35667:case 35671:return PM;case 35668:case 35672:return IM;case 35669:case 35673:return LM;case 5125:return NM;case 36294:return DM;case 36295:return UM;case 36296:return FM;case 35678:case 36198:case 36298:case 36306:case 35682:return BM;case 35679:case 36299:case 36307:return OM;case 35680:case 36300:case 36308:case 36293:return kM;case 36289:case 36303:case 36311:case 36292:return zM}}function hm(s,e){s.seq.push(e),s.map[e.id]=e}function VM(s,e,t){let n=s.name,i=n.length;for(hh.lastIndex=0;;){let r=hh.exec(n),o=hh.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){hm(t,l===void 0?new Lh(a,s,e):new Nh(a,s,e));break}else{let h=t.map[a];h===void 0&&(h=new Dh(a),hm(t,h)),t=h}}}function fm(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}function XM(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function qM(s){let e=bn.getPrimaries(bn.workingColorSpace),t=bn.getPrimaries(s),n;switch(e===t?n="":e===ll&&t===cl?n="LinearDisplayP3ToLinearSRGB":e===cl&&t===ll&&(n="LinearSRGBToLinearDisplayP3"),s){case di:case Vl:return[n,"LinearTransferOETF"];case Vn:case pf:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function dm(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";let r=/ERROR: 0:(\d+)/.exec(i);if(r){let o=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+XM(s.getShaderSource(e),o)}else return i}function YM(s,e){let t=qM(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function jM(s,e){let t;switch(e){case $x:t="Linear";break;case Qx:t="Reinhard";break;case ey:t="OptimizedCineon";break;case ty:t="ACESFilmic";break;case iy:t="AgX";break;case ny:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function ZM(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Bo).join(`
`)}function KM(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Bo).join(`
`)}function JM(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function $M(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function Bo(s){return s!==""}function pm(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function mm(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}function Uh(s){return s.replace(QM,tE)}function tE(s,e){let t=un[e];if(t===void 0){let n=eE.get(e);if(n!==void 0)t=un[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Uh(t)}function gm(s){return s.replace(nE,iE)}function iE(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function xm(s){let e="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function sE(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===qm?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Px?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===tr&&(e="SHADOWMAP_TYPE_VSM"),e}function rE(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Vo:case Go:e="ENVMAP_TYPE_CUBE";break;case zl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function oE(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Go:e="ENVMAP_MODE_REFRACTION";break}return e}function aE(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Ym:e="ENVMAP_BLENDING_MULTIPLY";break;case Kx:e="ENVMAP_BLENDING_MIX";break;case Jx:e="ENVMAP_BLENDING_ADD";break}return e}function cE(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function lE(s,e,t,n){let i=s.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,c=sE(t),l=rE(t),u=oE(t),h=aE(t),f=cE(t),d=t.isWebGL2?"":ZM(t),g=KM(t),_=JM(r),m=i.createProgram(),p,v,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Bo).join(`
`),p.length>0&&(p+=`
`),v=[d,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Bo).join(`
`),v.length>0&&(v+=`
`)):(p=[xm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Bo).join(`
`),v=[d,xm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Mr?"#define TONE_MAPPING":"",t.toneMapping!==Mr?un.tonemapping_pars_fragment:"",t.toneMapping!==Mr?jM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",un.colorspace_pars_fragment,YM("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Bo).join(`
`)),o=Uh(o),o=pm(o,t),o=mm(o,t),a=Uh(a),a=pm(a,t),a=mm(a,t),o=gm(o),a=gm(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,v=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Fp?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Fp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);let b=x+p+o,P=x+v+a,w=fm(i,i.VERTEX_SHADER,b),C=fm(i,i.FRAGMENT_SHADER,P);i.attachShader(m,w),i.attachShader(m,C),t.index0AttributeName!==void 0?i.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m);function H(F){if(s.debug.checkShaderErrors){let le=i.getProgramInfoLog(m).trim(),I=i.getShaderInfoLog(w).trim(),X=i.getShaderInfoLog(C).trim(),ce=!0,ne=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(ce=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,m,w,C);else{let ie=dm(i,w,"vertex"),ye=dm(i,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Program Info Log: `+le+`
`+ie+`
`+ye)}else le!==""?console.warn("THREE.WebGLProgram: Program Info Log:",le):(I===""||X==="")&&(ne=!1);ne&&(F.diagnostics={runnable:ce,programLog:le,vertexShader:{log:I,prefix:p},fragmentShader:{log:X,prefix:v}})}i.deleteShader(w),i.deleteShader(C),M=new zo(i,m),R=$M(i,m)}let M;this.getUniforms=function(){return M===void 0&&H(this),M};let R;this.getAttributes=function(){return R===void 0&&H(this),R};let V=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return V===!1&&(V=i.getProgramParameter(m,GM)),V},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=WM++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=w,this.fragmentShader=C,this}function hE(s,e,t,n,i,r,o){let a=new Ga,c=new Fh,l=[],u=i.isWebGL2,h=i.logarithmicDepthBuffer,f=i.vertexTextures,d=i.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return M===0?"uv":`uv${M}`}function m(M,R,V,F,le){let I=F.fog,X=le.geometry,ce=M.isMeshStandardMaterial?F.environment:null,ne=(M.isMeshStandardMaterial?t:e).get(M.envMap||ce),ie=ne&&ne.mapping===zl?ne.image.height:null,ye=g[M.type];M.precision!==null&&(d=i.getMaxPrecision(M.precision),d!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",d,"instead."));let Pe=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,_e=Pe!==void 0?Pe.length:0,st=0;X.morphAttributes.position!==void 0&&(st=1),X.morphAttributes.normal!==void 0&&(st=2),X.morphAttributes.color!==void 0&&(st=3);let ee,Ne,Ge,vt;if(ye){let yi=Ns[ye];ee=yi.vertexShader,Ne=yi.fragmentShader}else ee=M.vertexShader,Ne=M.fragmentShader,c.update(M),Ge=c.getVertexShaderID(M),vt=c.getFragmentShaderID(M);let wt=s.getRenderTarget(),Xt=le.isInstancedMesh===!0,Qt=le.isBatchedMesh===!0,Bt=!!M.map,gn=!!M.matcap,re=!!ne,xi=!!M.aoMap,Ot=!!M.lightMap,Kt=!!M.bumpMap,St=!!M.normalMap,On=!!M.displacementMap,zt=!!M.emissiveMap,D=!!M.metalnessMap,A=!!M.roughnessMap,Q=M.anisotropy>0,Be=M.clearcoat>0,Re=M.iridescence>0,Ue=M.sheen>0,$e=M.transmission>0,Ze=Q&&!!M.anisotropyMap,rt=Be&&!!M.clearcoatMap,Nt=Be&&!!M.clearcoatNormalMap,en=Be&&!!M.clearcoatRoughnessMap,De=Re&&!!M.iridescenceMap,vn=Re&&!!M.iridescenceThicknessMap,qt=Ue&&!!M.sheenColorMap,Dt=Ue&&!!M.sheenRoughnessMap,yt=!!M.specularMap,mt=!!M.specularColorMap,Me=!!M.specularIntensityMap,Oe=$e&&!!M.transmissionMap,fn=$e&&!!M.thicknessMap,Jt=!!M.gradientMap,ke=!!M.alphaMap,O=M.alphaTest>0,We=!!M.alphaHash,Ke=!!M.extensions,Mt=!!X.attributes.uv1,Et=!!X.attributes.uv2,En=!!X.attributes.uv3,Sn=Mr;return M.toneMapped&&(wt===null||wt.isXRRenderTarget===!0)&&(Sn=s.toneMapping),{isWebGL2:u,shaderID:ye,shaderType:M.type,shaderName:M.name,vertexShader:ee,fragmentShader:Ne,defines:M.defines,customVertexShaderID:Ge,customFragmentShaderID:vt,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:d,batching:Qt,instancing:Xt,instancingColor:Xt&&le.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:wt===null?s.outputColorSpace:wt.isXRRenderTarget===!0?wt.texture.colorSpace:di,map:Bt,matcap:gn,envMap:re,envMapMode:re&&ne.mapping,envMapCubeUVHeight:ie,aoMap:xi,lightMap:Ot,bumpMap:Kt,normalMap:St,displacementMap:f&&On,emissiveMap:zt,normalMapObjectSpace:St&&M.normalMapType===gy,normalMapTangentSpace:St&&M.normalMapType===s0,metalnessMap:D,roughnessMap:A,anisotropy:Q,anisotropyMap:Ze,clearcoat:Be,clearcoatMap:rt,clearcoatNormalMap:Nt,clearcoatRoughnessMap:en,iridescence:Re,iridescenceMap:De,iridescenceThicknessMap:vn,sheen:Ue,sheenColorMap:qt,sheenRoughnessMap:Dt,specularMap:yt,specularColorMap:mt,specularIntensityMap:Me,transmission:$e,transmissionMap:Oe,thicknessMap:fn,gradientMap:Jt,opaque:M.transparent===!1&&M.blending===Oo,alphaMap:ke,alphaTest:O,alphaHash:We,combine:M.combine,mapUv:Bt&&_(M.map.channel),aoMapUv:xi&&_(M.aoMap.channel),lightMapUv:Ot&&_(M.lightMap.channel),bumpMapUv:Kt&&_(M.bumpMap.channel),normalMapUv:St&&_(M.normalMap.channel),displacementMapUv:On&&_(M.displacementMap.channel),emissiveMapUv:zt&&_(M.emissiveMap.channel),metalnessMapUv:D&&_(M.metalnessMap.channel),roughnessMapUv:A&&_(M.roughnessMap.channel),anisotropyMapUv:Ze&&_(M.anisotropyMap.channel),clearcoatMapUv:rt&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:Nt&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:en&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:De&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:vn&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:qt&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:Dt&&_(M.sheenRoughnessMap.channel),specularMapUv:yt&&_(M.specularMap.channel),specularColorMapUv:mt&&_(M.specularColorMap.channel),specularIntensityMapUv:Me&&_(M.specularIntensityMap.channel),transmissionMapUv:Oe&&_(M.transmissionMap.channel),thicknessMapUv:fn&&_(M.thicknessMap.channel),alphaMapUv:ke&&_(M.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(St||Q),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,vertexUv1s:Mt,vertexUv2s:Et,vertexUv3s:En,pointsUvs:le.isPoints===!0&&!!X.attributes.uv&&(Bt||ke),fog:!!I,useFog:M.fog===!0,fogExp2:I&&I.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:le.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:_e,morphTextureStride:st,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:s.shadowMap.enabled&&V.length>0,shadowMapType:s.shadowMap.type,toneMapping:Sn,useLegacyLights:s._useLegacyLights,decodeVideoTexture:Bt&&M.map.isVideoTexture===!0&&bn.getTransfer(M.map.colorSpace)===Hn,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Ti,flipSided:M.side===Oi,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:Ke&&M.extensions.derivatives===!0,extensionFragDepth:Ke&&M.extensions.fragDepth===!0,extensionDrawBuffers:Ke&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:Ke&&M.extensions.shaderTextureLOD===!0,extensionClipCullDistance:Ke&&M.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function p(M){let R=[];if(M.shaderID?R.push(M.shaderID):(R.push(M.customVertexShaderID),R.push(M.customFragmentShaderID)),M.defines!==void 0)for(let V in M.defines)R.push(V),R.push(M.defines[V]);return M.isRawShaderMaterial===!1&&(v(R,M),x(R,M),R.push(s.outputColorSpace)),R.push(M.customProgramCacheKey),R.join()}function v(M,R){M.push(R.precision),M.push(R.outputColorSpace),M.push(R.envMapMode),M.push(R.envMapCubeUVHeight),M.push(R.mapUv),M.push(R.alphaMapUv),M.push(R.lightMapUv),M.push(R.aoMapUv),M.push(R.bumpMapUv),M.push(R.normalMapUv),M.push(R.displacementMapUv),M.push(R.emissiveMapUv),M.push(R.metalnessMapUv),M.push(R.roughnessMapUv),M.push(R.anisotropyMapUv),M.push(R.clearcoatMapUv),M.push(R.clearcoatNormalMapUv),M.push(R.clearcoatRoughnessMapUv),M.push(R.iridescenceMapUv),M.push(R.iridescenceThicknessMapUv),M.push(R.sheenColorMapUv),M.push(R.sheenRoughnessMapUv),M.push(R.specularMapUv),M.push(R.specularColorMapUv),M.push(R.specularIntensityMapUv),M.push(R.transmissionMapUv),M.push(R.thicknessMapUv),M.push(R.combine),M.push(R.fogExp2),M.push(R.sizeAttenuation),M.push(R.morphTargetsCount),M.push(R.morphAttributeCount),M.push(R.numDirLights),M.push(R.numPointLights),M.push(R.numSpotLights),M.push(R.numSpotLightMaps),M.push(R.numHemiLights),M.push(R.numRectAreaLights),M.push(R.numDirLightShadows),M.push(R.numPointLightShadows),M.push(R.numSpotLightShadows),M.push(R.numSpotLightShadowsWithMaps),M.push(R.numLightProbes),M.push(R.shadowMapType),M.push(R.toneMapping),M.push(R.numClippingPlanes),M.push(R.numClipIntersection),M.push(R.depthPacking)}function x(M,R){a.disableAll(),R.isWebGL2&&a.enable(0),R.supportsVertexTextures&&a.enable(1),R.instancing&&a.enable(2),R.instancingColor&&a.enable(3),R.matcap&&a.enable(4),R.envMap&&a.enable(5),R.normalMapObjectSpace&&a.enable(6),R.normalMapTangentSpace&&a.enable(7),R.clearcoat&&a.enable(8),R.iridescence&&a.enable(9),R.alphaTest&&a.enable(10),R.vertexColors&&a.enable(11),R.vertexAlphas&&a.enable(12),R.vertexUv1s&&a.enable(13),R.vertexUv2s&&a.enable(14),R.vertexUv3s&&a.enable(15),R.vertexTangents&&a.enable(16),R.anisotropy&&a.enable(17),R.alphaHash&&a.enable(18),R.batching&&a.enable(19),M.push(a.mask),a.disableAll(),R.fog&&a.enable(0),R.useFog&&a.enable(1),R.flatShading&&a.enable(2),R.logarithmicDepthBuffer&&a.enable(3),R.skinning&&a.enable(4),R.morphTargets&&a.enable(5),R.morphNormals&&a.enable(6),R.morphColors&&a.enable(7),R.premultipliedAlpha&&a.enable(8),R.shadowMapEnabled&&a.enable(9),R.useLegacyLights&&a.enable(10),R.doubleSided&&a.enable(11),R.flipSided&&a.enable(12),R.useDepthPacking&&a.enable(13),R.dithering&&a.enable(14),R.transmission&&a.enable(15),R.sheen&&a.enable(16),R.opaque&&a.enable(17),R.pointsUvs&&a.enable(18),R.decodeVideoTexture&&a.enable(19),M.push(a.mask)}function b(M){let R=g[M.type],V;if(R){let F=Ns[R];V=e_.clone(F.uniforms)}else V=M.uniforms;return V}function P(M,R){let V;for(let F=0,le=l.length;F<le;F++){let I=l[F];if(I.cacheKey===R){V=I,++V.usedTimes;break}}return V===void 0&&(V=new lE(s,R,M,r),l.push(V)),V}function w(M){if(--M.usedTimes===0){let R=l.indexOf(M);l[R]=l[l.length-1],l.pop(),M.destroy()}}function C(M){c.remove(M)}function H(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:b,acquireProgram:P,releaseProgram:w,releaseShaderCache:C,programs:l,dispose:H}}function fE(){let s=new WeakMap;function e(r){let o=s.get(r);return o===void 0&&(o={},s.set(r,o)),o}function t(r){s.delete(r)}function n(r,o,a){s.get(r)[o]=a}function i(){s=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function dE(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function ym(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function _m(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(h,f,d,g,_,m){let p=s[e];return p===void 0?(p={id:h.id,object:h,geometry:f,material:d,groupOrder:g,renderOrder:h.renderOrder,z:_,group:m},s[e]=p):(p.id=h.id,p.object=h,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=_,p.group=m),e++,p}function a(h,f,d,g,_,m){let p=o(h,f,d,g,_,m);d.transmission>0?n.push(p):d.transparent===!0?i.push(p):t.push(p)}function c(h,f,d,g,_,m){let p=o(h,f,d,g,_,m);d.transmission>0?n.unshift(p):d.transparent===!0?i.unshift(p):t.unshift(p)}function l(h,f){t.length>1&&t.sort(h||dE),n.length>1&&n.sort(f||ym),i.length>1&&i.sort(f||ym)}function u(){for(let h=e,f=s.length;h<f;h++){let d=s[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:a,unshift:c,finish:u,sort:l}}function pE(){let s=new WeakMap;function e(n,i){let r=s.get(n),o;return r===void 0?(o=new _m,s.set(n,[o])):i>=r.length?(o=new _m,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function mE(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new T,color:new Pt};break;case"SpotLight":t={position:new T,direction:new T,color:new Pt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new T,color:new Pt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new T,skyColor:new Pt,groundColor:new Pt};break;case"RectAreaLight":t={color:new Pt,position:new T,halfWidth:new T,halfHeight:new T};break}return s[e.id]=t,t}}}function gE(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new tt};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new tt};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new tt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}function yE(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function _E(s,e){let t=new mE,n=gE(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new T);let r=new T,o=new bt,a=new bt;function c(u,h){let f=0,d=0,g=0;for(let F=0;F<9;F++)i.probe[F].set(0,0,0);let _=0,m=0,p=0,v=0,x=0,b=0,P=0,w=0,C=0,H=0,M=0;u.sort(yE);let R=h===!0?Math.PI:1;for(let F=0,le=u.length;F<le;F++){let I=u[F],X=I.color,ce=I.intensity,ne=I.distance,ie=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)f+=X.r*ce*R,d+=X.g*ce*R,g+=X.b*ce*R;else if(I.isLightProbe){for(let ye=0;ye<9;ye++)i.probe[ye].addScaledVector(I.sh.coefficients[ye],ce);M++}else if(I.isDirectionalLight){let ye=t.get(I);if(ye.color.copy(I.color).multiplyScalar(I.intensity*R),I.castShadow){let Pe=I.shadow,_e=n.get(I);_e.shadowBias=Pe.bias,_e.shadowNormalBias=Pe.normalBias,_e.shadowRadius=Pe.radius,_e.shadowMapSize=Pe.mapSize,i.directionalShadow[_]=_e,i.directionalShadowMap[_]=ie,i.directionalShadowMatrix[_]=I.shadow.matrix,b++}i.directional[_]=ye,_++}else if(I.isSpotLight){let ye=t.get(I);ye.position.setFromMatrixPosition(I.matrixWorld),ye.color.copy(X).multiplyScalar(ce*R),ye.distance=ne,ye.coneCos=Math.cos(I.angle),ye.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),ye.decay=I.decay,i.spot[p]=ye;let Pe=I.shadow;if(I.map&&(i.spotLightMap[C]=I.map,C++,Pe.updateMatrices(I),I.castShadow&&H++),i.spotLightMatrix[p]=Pe.matrix,I.castShadow){let _e=n.get(I);_e.shadowBias=Pe.bias,_e.shadowNormalBias=Pe.normalBias,_e.shadowRadius=Pe.radius,_e.shadowMapSize=Pe.mapSize,i.spotShadow[p]=_e,i.spotShadowMap[p]=ie,w++}p++}else if(I.isRectAreaLight){let ye=t.get(I);ye.color.copy(X).multiplyScalar(ce),ye.halfWidth.set(I.width*.5,0,0),ye.halfHeight.set(0,I.height*.5,0),i.rectArea[v]=ye,v++}else if(I.isPointLight){let ye=t.get(I);if(ye.color.copy(I.color).multiplyScalar(I.intensity*R),ye.distance=I.distance,ye.decay=I.decay,I.castShadow){let Pe=I.shadow,_e=n.get(I);_e.shadowBias=Pe.bias,_e.shadowNormalBias=Pe.normalBias,_e.shadowRadius=Pe.radius,_e.shadowMapSize=Pe.mapSize,_e.shadowCameraNear=Pe.camera.near,_e.shadowCameraFar=Pe.camera.far,i.pointShadow[m]=_e,i.pointShadowMap[m]=ie,i.pointShadowMatrix[m]=I.shadow.matrix,P++}i.point[m]=ye,m++}else if(I.isHemisphereLight){let ye=t.get(I);ye.skyColor.copy(I.color).multiplyScalar(ce*R),ye.groundColor.copy(I.groundColor).multiplyScalar(ce*R),i.hemi[x]=ye,x++}}v>0&&(e.isWebGL2?s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Ye.LTC_FLOAT_1,i.rectAreaLTC2=Ye.LTC_FLOAT_2):(i.rectAreaLTC1=Ye.LTC_HALF_1,i.rectAreaLTC2=Ye.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Ye.LTC_FLOAT_1,i.rectAreaLTC2=Ye.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=Ye.LTC_HALF_1,i.rectAreaLTC2=Ye.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=f,i.ambient[1]=d,i.ambient[2]=g;let V=i.hash;(V.directionalLength!==_||V.pointLength!==m||V.spotLength!==p||V.rectAreaLength!==v||V.hemiLength!==x||V.numDirectionalShadows!==b||V.numPointShadows!==P||V.numSpotShadows!==w||V.numSpotMaps!==C||V.numLightProbes!==M)&&(i.directional.length=_,i.spot.length=p,i.rectArea.length=v,i.point.length=m,i.hemi.length=x,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.pointShadow.length=P,i.pointShadowMap.length=P,i.spotShadow.length=w,i.spotShadowMap.length=w,i.directionalShadowMatrix.length=b,i.pointShadowMatrix.length=P,i.spotLightMatrix.length=w+C-H,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=H,i.numLightProbes=M,V.directionalLength=_,V.pointLength=m,V.spotLength=p,V.rectAreaLength=v,V.hemiLength=x,V.numDirectionalShadows=b,V.numPointShadows=P,V.numSpotShadows=w,V.numSpotMaps=C,V.numLightProbes=M,i.version=xE++)}function l(u,h){let f=0,d=0,g=0,_=0,m=0,p=h.matrixWorldInverse;for(let v=0,x=u.length;v<x;v++){let b=u[v];if(b.isDirectionalLight){let P=i.directional[f];P.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),P.direction.sub(r),P.direction.transformDirection(p),f++}else if(b.isSpotLight){let P=i.spot[g];P.position.setFromMatrixPosition(b.matrixWorld),P.position.applyMatrix4(p),P.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),P.direction.sub(r),P.direction.transformDirection(p),g++}else if(b.isRectAreaLight){let P=i.rectArea[_];P.position.setFromMatrixPosition(b.matrixWorld),P.position.applyMatrix4(p),a.identity(),o.copy(b.matrixWorld),o.premultiply(p),a.extractRotation(o),P.halfWidth.set(b.width*.5,0,0),P.halfHeight.set(0,b.height*.5,0),P.halfWidth.applyMatrix4(a),P.halfHeight.applyMatrix4(a),_++}else if(b.isPointLight){let P=i.point[d];P.position.setFromMatrixPosition(b.matrixWorld),P.position.applyMatrix4(p),d++}else if(b.isHemisphereLight){let P=i.hemi[m];P.direction.setFromMatrixPosition(b.matrixWorld),P.direction.transformDirection(p),m++}}}return{setup:c,setupView:l,state:i}}function vm(s,e){let t=new _E(s,e),n=[],i=[];function r(){n.length=0,i.length=0}function o(h){n.push(h)}function a(h){i.push(h)}function c(h){t.setup(n,h)}function l(h){t.setupView(n,h)}return{init:r,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function vE(s,e){let t=new WeakMap;function n(r,o=0){let a=t.get(r),c;return a===void 0?(c=new vm(s,e),t.set(r,[c])):o>=a.length?(c=new vm(s,e),a.push(c)):c=a[o],c}function i(){t=new WeakMap}return{get:n,dispose:i}}function EE(s,e,t){let n=new wr,i=new tt,r=new tt,o=new Nn,a=new Oh({depthPacking:my}),c=new kh,l={},u=t.maxTextureSize,h={[Wi]:Oi,[Oi]:Wi,[Ti]:Ti},f=new qi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new tt},radius:{value:4}},vertexShader:bE,fragmentShader:ME}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let g=new wi;g.setAttribute("position",new wn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Mn(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=qm;let p=this.type;this.render=function(w,C,H){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;let M=s.getRenderTarget(),R=s.getActiveCubeFace(),V=s.getActiveMipmapLevel(),F=s.state;F.setBlending(br),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let le=p!==tr&&this.type===tr,I=p===tr&&this.type!==tr;for(let X=0,ce=w.length;X<ce;X++){let ne=w[X],ie=ne.shadow;if(ie===void 0){console.warn("THREE.WebGLShadowMap:",ne,"has no shadow.");continue}if(ie.autoUpdate===!1&&ie.needsUpdate===!1)continue;i.copy(ie.mapSize);let ye=ie.getFrameExtents();if(i.multiply(ye),r.copy(ie.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(r.x=Math.floor(u/ye.x),i.x=r.x*ye.x,ie.mapSize.x=r.x),i.y>u&&(r.y=Math.floor(u/ye.y),i.y=r.y*ye.y,ie.mapSize.y=r.y)),ie.map===null||le===!0||I===!0){let _e=this.type!==tr?{minFilter:ui,magFilter:ui}:{};ie.map!==null&&ie.map.dispose(),ie.map=new ds(i.x,i.y,_e),ie.map.texture.name=ne.name+".shadowMap",ie.camera.updateProjectionMatrix()}s.setRenderTarget(ie.map),s.clear();let Pe=ie.getViewportCount();for(let _e=0;_e<Pe;_e++){let st=ie.getViewport(_e);o.set(r.x*st.x,r.y*st.y,r.x*st.z,r.y*st.w),F.viewport(o),ie.updateMatrices(ne,_e),n=ie.getFrustum(),b(C,H,ie.camera,ne,this.type)}ie.isPointLightShadow!==!0&&this.type===tr&&v(ie,H),ie.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(M,R,V)};function v(w,C){let H=e.update(_);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new ds(i.x,i.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,s.setRenderTarget(w.mapPass),s.clear(),s.renderBufferDirect(C,null,H,f,_,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,s.setRenderTarget(w.map),s.clear(),s.renderBufferDirect(C,null,H,d,_,null)}function x(w,C,H,M){let R=null,V=H.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(V!==void 0)R=V;else if(R=H.isPointLight===!0?c:a,s.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){let F=R.uuid,le=C.uuid,I=l[F];I===void 0&&(I={},l[F]=I);let X=I[le];X===void 0&&(X=R.clone(),I[le]=X,C.addEventListener("dispose",P)),R=X}if(R.visible=C.visible,R.wireframe=C.wireframe,M===tr?R.side=C.shadowSide!==null?C.shadowSide:C.side:R.side=C.shadowSide!==null?C.shadowSide:h[C.side],R.alphaMap=C.alphaMap,R.alphaTest=C.alphaTest,R.map=C.map,R.clipShadows=C.clipShadows,R.clippingPlanes=C.clippingPlanes,R.clipIntersection=C.clipIntersection,R.displacementMap=C.displacementMap,R.displacementScale=C.displacementScale,R.displacementBias=C.displacementBias,R.wireframeLinewidth=C.wireframeLinewidth,R.linewidth=C.linewidth,H.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let F=s.properties.get(R);F.light=H}return R}function b(w,C,H,M,R){if(w.visible===!1)return;if(w.layers.test(C.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&R===tr)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,w.matrixWorld);let le=e.update(w),I=w.material;if(Array.isArray(I)){let X=le.groups;for(let ce=0,ne=X.length;ce<ne;ce++){let ie=X[ce],ye=I[ie.materialIndex];if(ye&&ye.visible){let Pe=x(w,ye,M,R);w.onBeforeShadow(s,w,C,H,le,Pe,ie),s.renderBufferDirect(H,null,le,Pe,w,ie),w.onAfterShadow(s,w,C,H,le,Pe,ie)}}}else if(I.visible){let X=x(w,I,M,R);w.onBeforeShadow(s,w,C,H,le,X,null),s.renderBufferDirect(H,null,le,X,w,null),w.onAfterShadow(s,w,C,H,le,X,null)}}let F=w.children;for(let le=0,I=F.length;le<I;le++)b(F[le],C,H,M,R)}function P(w){w.target.removeEventListener("dispose",P);for(let H in l){let M=l[H],R=w.target.uuid;R in M&&(M[R].dispose(),delete M[R])}}}function SE(s,e,t){let n=t.isWebGL2;function i(){let O=!1,We=new Nn,Ke=null,Mt=new Nn(0,0,0,0);return{setMask:function(Et){Ke!==Et&&!O&&(s.colorMask(Et,Et,Et,Et),Ke=Et)},setLocked:function(Et){O=Et},setClear:function(Et,En,Sn,Jn,yi){yi===!0&&(Et*=Jn,En*=Jn,Sn*=Jn),We.set(Et,En,Sn,Jn),Mt.equals(We)===!1&&(s.clearColor(Et,En,Sn,Jn),Mt.copy(We))},reset:function(){O=!1,Ke=null,Mt.set(-1,0,0,0)}}}function r(){let O=!1,We=null,Ke=null,Mt=null;return{setTest:function(Et){Et?Qt(s.DEPTH_TEST):Bt(s.DEPTH_TEST)},setMask:function(Et){We!==Et&&!O&&(s.depthMask(Et),We=Et)},setFunc:function(Et){if(Ke!==Et){switch(Et){case Wx:s.depthFunc(s.NEVER);break;case Xx:s.depthFunc(s.ALWAYS);break;case qx:s.depthFunc(s.LESS);break;case rl:s.depthFunc(s.LEQUAL);break;case Yx:s.depthFunc(s.EQUAL);break;case jx:s.depthFunc(s.GEQUAL);break;case hf:s.depthFunc(s.GREATER);break;case Zx:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Ke=Et}},setLocked:function(Et){O=Et},setClear:function(Et){Mt!==Et&&(s.clearDepth(Et),Mt=Et)},reset:function(){O=!1,We=null,Ke=null,Mt=null}}}function o(){let O=!1,We=null,Ke=null,Mt=null,Et=null,En=null,Sn=null,Jn=null,yi=null;return{setTest:function(An){O||(An?Qt(s.STENCIL_TEST):Bt(s.STENCIL_TEST))},setMask:function(An){We!==An&&!O&&(s.stencilMask(An),We=An)},setFunc:function(An,$n,_i){(Ke!==An||Mt!==$n||Et!==_i)&&(s.stencilFunc(An,$n,_i),Ke=An,Mt=$n,Et=_i)},setOp:function(An,$n,_i){(En!==An||Sn!==$n||Jn!==_i)&&(s.stencilOp(An,$n,_i),En=An,Sn=$n,Jn=_i)},setLocked:function(An){O=An},setClear:function(An){yi!==An&&(s.clearStencil(An),yi=An)},reset:function(){O=!1,We=null,Ke=null,Mt=null,Et=null,En=null,Sn=null,Jn=null,yi=null}}}let a=new i,c=new r,l=new o,u=new WeakMap,h=new WeakMap,f={},d={},g=new WeakMap,_=[],m=null,p=!1,v=null,x=null,b=null,P=null,w=null,C=null,H=null,M=new Pt(0,0,0),R=0,V=!1,F=null,le=null,I=null,X=null,ce=null,ne=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),ie=!1,ye=0,Pe=s.getParameter(s.VERSION);Pe.indexOf("WebGL")!==-1?(ye=parseFloat(/^WebGL (\d)/.exec(Pe)[1]),ie=ye>=1):Pe.indexOf("OpenGL ES")!==-1&&(ye=parseFloat(/^OpenGL ES (\d)/.exec(Pe)[1]),ie=ye>=2);let _e=null,st={},ee=s.getParameter(s.SCISSOR_BOX),Ne=s.getParameter(s.VIEWPORT),Ge=new Nn().fromArray(ee),vt=new Nn().fromArray(Ne);function wt(O,We,Ke,Mt){let Et=new Uint8Array(4),En=s.createTexture();s.bindTexture(O,En),s.texParameteri(O,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(O,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Sn=0;Sn<Ke;Sn++)n&&(O===s.TEXTURE_3D||O===s.TEXTURE_2D_ARRAY)?s.texImage3D(We,0,s.RGBA,1,1,Mt,0,s.RGBA,s.UNSIGNED_BYTE,Et):s.texImage2D(We+Sn,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Et);return En}let Xt={};Xt[s.TEXTURE_2D]=wt(s.TEXTURE_2D,s.TEXTURE_2D,1),Xt[s.TEXTURE_CUBE_MAP]=wt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Xt[s.TEXTURE_2D_ARRAY]=wt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Xt[s.TEXTURE_3D]=wt(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),c.setClear(1),l.setClear(0),Qt(s.DEPTH_TEST),c.setFunc(rl),zt(!1),D(ep),Qt(s.CULL_FACE),St(br);function Qt(O){f[O]!==!0&&(s.enable(O),f[O]=!0)}function Bt(O){f[O]!==!1&&(s.disable(O),f[O]=!1)}function gn(O,We){return d[O]!==We?(s.bindFramebuffer(O,We),d[O]=We,n&&(O===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=We),O===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=We)),!0):!1}function re(O,We){let Ke=_,Mt=!1;if(O)if(Ke=g.get(We),Ke===void 0&&(Ke=[],g.set(We,Ke)),O.isWebGLMultipleRenderTargets){let Et=O.texture;if(Ke.length!==Et.length||Ke[0]!==s.COLOR_ATTACHMENT0){for(let En=0,Sn=Et.length;En<Sn;En++)Ke[En]=s.COLOR_ATTACHMENT0+En;Ke.length=Et.length,Mt=!0}}else Ke[0]!==s.COLOR_ATTACHMENT0&&(Ke[0]=s.COLOR_ATTACHMENT0,Mt=!0);else Ke[0]!==s.BACK&&(Ke[0]=s.BACK,Mt=!0);Mt&&(t.isWebGL2?s.drawBuffers(Ke):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(Ke))}function xi(O){return m!==O?(s.useProgram(O),m=O,!0):!1}let Ot={[Ds]:s.FUNC_ADD,[Ix]:s.FUNC_SUBTRACT,[Lx]:s.FUNC_REVERSE_SUBTRACT};if(n)Ot[sp]=s.MIN,Ot[rp]=s.MAX;else{let O=e.get("EXT_blend_minmax");O!==null&&(Ot[sp]=O.MIN_EXT,Ot[rp]=O.MAX_EXT)}let Kt={[Ol]:s.ZERO,[kl]:s.ONE,[Nx]:s.SRC_COLOR,[Ho]:s.SRC_ALPHA,[kx]:s.SRC_ALPHA_SATURATE,[Bx]:s.DST_COLOR,[Ux]:s.DST_ALPHA,[Dx]:s.ONE_MINUS_SRC_COLOR,[Mh]:s.ONE_MINUS_SRC_ALPHA,[Ox]:s.ONE_MINUS_DST_COLOR,[Fx]:s.ONE_MINUS_DST_ALPHA,[zx]:s.CONSTANT_COLOR,[Hx]:s.ONE_MINUS_CONSTANT_COLOR,[Vx]:s.CONSTANT_ALPHA,[Gx]:s.ONE_MINUS_CONSTANT_ALPHA};function St(O,We,Ke,Mt,Et,En,Sn,Jn,yi,An){if(O===br){p===!0&&(Bt(s.BLEND),p=!1);return}if(p===!1&&(Qt(s.BLEND),p=!0),O!==Bl){if(O!==v||An!==V){if((x!==Ds||w!==Ds)&&(s.blendEquation(s.FUNC_ADD),x=Ds,w=Ds),An)switch(O){case Oo:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case tp:s.blendFunc(s.ONE,s.ONE);break;case np:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case ip:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case Oo:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case tp:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case np:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case ip:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}b=null,P=null,C=null,H=null,M.set(0,0,0),R=0,v=O,V=An}return}Et=Et||We,En=En||Ke,Sn=Sn||Mt,(We!==x||Et!==w)&&(s.blendEquationSeparate(Ot[We],Ot[Et]),x=We,w=Et),(Ke!==b||Mt!==P||En!==C||Sn!==H)&&(s.blendFuncSeparate(Kt[Ke],Kt[Mt],Kt[En],Kt[Sn]),b=Ke,P=Mt,C=En,H=Sn),(Jn.equals(M)===!1||yi!==R)&&(s.blendColor(Jn.r,Jn.g,Jn.b,yi),M.copy(Jn),R=yi),v=O,V=!1}function On(O,We){O.side===Ti?Bt(s.CULL_FACE):Qt(s.CULL_FACE);let Ke=O.side===Oi;We&&(Ke=!Ke),zt(Ke),O.blending===Oo&&O.transparent===!1?St(br):St(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),c.setFunc(O.depthFunc),c.setTest(O.depthTest),c.setMask(O.depthWrite),a.setMask(O.colorWrite);let Mt=O.stencilWrite;l.setTest(Mt),Mt&&(l.setMask(O.stencilWriteMask),l.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),l.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Q(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?Qt(s.SAMPLE_ALPHA_TO_COVERAGE):Bt(s.SAMPLE_ALPHA_TO_COVERAGE)}function zt(O){F!==O&&(O?s.frontFace(s.CW):s.frontFace(s.CCW),F=O)}function D(O){O!==Rx?(Qt(s.CULL_FACE),O!==le&&(O===ep?s.cullFace(s.BACK):O===Cx?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Bt(s.CULL_FACE),le=O}function A(O){O!==I&&(ie&&s.lineWidth(O),I=O)}function Q(O,We,Ke){O?(Qt(s.POLYGON_OFFSET_FILL),(X!==We||ce!==Ke)&&(s.polygonOffset(We,Ke),X=We,ce=Ke)):Bt(s.POLYGON_OFFSET_FILL)}function Be(O){O?Qt(s.SCISSOR_TEST):Bt(s.SCISSOR_TEST)}function Re(O){O===void 0&&(O=s.TEXTURE0+ne-1),_e!==O&&(s.activeTexture(O),_e=O)}function Ue(O,We,Ke){Ke===void 0&&(_e===null?Ke=s.TEXTURE0+ne-1:Ke=_e);let Mt=st[Ke];Mt===void 0&&(Mt={type:void 0,texture:void 0},st[Ke]=Mt),(Mt.type!==O||Mt.texture!==We)&&(_e!==Ke&&(s.activeTexture(Ke),_e=Ke),s.bindTexture(O,We||Xt[O]),Mt.type=O,Mt.texture=We)}function $e(){let O=st[_e];O!==void 0&&O.type!==void 0&&(s.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function Ze(){try{s.compressedTexImage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function rt(){try{s.compressedTexImage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Nt(){try{s.texSubImage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function en(){try{s.texSubImage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function De(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function vn(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function qt(){try{s.texStorage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Dt(){try{s.texStorage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function yt(){try{s.texImage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function mt(){try{s.texImage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Me(O){Ge.equals(O)===!1&&(s.scissor(O.x,O.y,O.z,O.w),Ge.copy(O))}function Oe(O){vt.equals(O)===!1&&(s.viewport(O.x,O.y,O.z,O.w),vt.copy(O))}function fn(O,We){let Ke=h.get(We);Ke===void 0&&(Ke=new WeakMap,h.set(We,Ke));let Mt=Ke.get(O);Mt===void 0&&(Mt=s.getUniformBlockIndex(We,O.name),Ke.set(O,Mt))}function Jt(O,We){let Mt=h.get(We).get(O);u.get(We)!==Mt&&(s.uniformBlockBinding(We,Mt,O.__bindingPointIndex),u.set(We,Mt))}function ke(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),n===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),f={},_e=null,st={},d={},g=new WeakMap,_=[],m=null,p=!1,v=null,x=null,b=null,P=null,w=null,C=null,H=null,M=new Pt(0,0,0),R=0,V=!1,F=null,le=null,I=null,X=null,ce=null,Ge.set(0,0,s.canvas.width,s.canvas.height),vt.set(0,0,s.canvas.width,s.canvas.height),a.reset(),c.reset(),l.reset()}return{buffers:{color:a,depth:c,stencil:l},enable:Qt,disable:Bt,bindFramebuffer:gn,drawBuffers:re,useProgram:xi,setBlending:St,setMaterial:On,setFlipSided:zt,setCullFace:D,setLineWidth:A,setPolygonOffset:Q,setScissorTest:Be,activeTexture:Re,bindTexture:Ue,unbindTexture:$e,compressedTexImage2D:Ze,compressedTexImage3D:rt,texImage2D:yt,texImage3D:mt,updateUBOMapping:fn,uniformBlockBinding:Jt,texStorage2D:qt,texStorage3D:Dt,texSubImage2D:Nt,texSubImage3D:en,compressedTexSubImage2D:De,compressedTexSubImage3D:vn,scissor:Me,viewport:Oe,reset:ke}}function TE(s,e,t,n,i,r,o){let a=i.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap,h,f=new WeakMap,d=!1;try{d=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(D,A){return d?new OffscreenCanvas(D,A):Va("canvas")}function _(D,A,Q,Be){let Re=1;if((D.width>Be||D.height>Be)&&(Re=Be/Math.max(D.width,D.height)),Re<1||A===!0)if(typeof HTMLImageElement!="undefined"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&D instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&D instanceof ImageBitmap){let Ue=A?ul:Math.floor,$e=Ue(Re*D.width),Ze=Ue(Re*D.height);h===void 0&&(h=g($e,Ze));let rt=Q?g($e,Ze):h;return rt.width=$e,rt.height=Ze,rt.getContext("2d").drawImage(D,0,0,$e,Ze),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+D.width+"x"+D.height+") to ("+$e+"x"+Ze+")."),rt}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+D.width+"x"+D.height+")."),D;return D}function m(D){return Ah(D.width)&&Ah(D.height)}function p(D){return a?!1:D.wrapS!==ts||D.wrapT!==ts||D.minFilter!==ui&&D.minFilter!==Gi}function v(D,A){return D.generateMipmaps&&A&&D.minFilter!==ui&&D.minFilter!==Gi}function x(D){s.generateMipmap(D)}function b(D,A,Q,Be,Re=!1){if(a===!1)return A;if(D!==null){if(s[D]!==void 0)return s[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let Ue=A;if(A===s.RED&&(Q===s.FLOAT&&(Ue=s.R32F),Q===s.HALF_FLOAT&&(Ue=s.R16F),Q===s.UNSIGNED_BYTE&&(Ue=s.R8)),A===s.RED_INTEGER&&(Q===s.UNSIGNED_BYTE&&(Ue=s.R8UI),Q===s.UNSIGNED_SHORT&&(Ue=s.R16UI),Q===s.UNSIGNED_INT&&(Ue=s.R32UI),Q===s.BYTE&&(Ue=s.R8I),Q===s.SHORT&&(Ue=s.R16I),Q===s.INT&&(Ue=s.R32I)),A===s.RG&&(Q===s.FLOAT&&(Ue=s.RG32F),Q===s.HALF_FLOAT&&(Ue=s.RG16F),Q===s.UNSIGNED_BYTE&&(Ue=s.RG8)),A===s.RGBA){let $e=Re?al:bn.getTransfer(Be);Q===s.FLOAT&&(Ue=s.RGBA32F),Q===s.HALF_FLOAT&&(Ue=s.RGBA16F),Q===s.UNSIGNED_BYTE&&(Ue=$e===Hn?s.SRGB8_ALPHA8:s.RGBA8),Q===s.UNSIGNED_SHORT_4_4_4_4&&(Ue=s.RGBA4),Q===s.UNSIGNED_SHORT_5_5_5_1&&(Ue=s.RGB5_A1)}return(Ue===s.R16F||Ue===s.R32F||Ue===s.RG16F||Ue===s.RG32F||Ue===s.RGBA16F||Ue===s.RGBA32F)&&e.get("EXT_color_buffer_float"),Ue}function P(D,A,Q){return v(D,Q)===!0||D.isFramebufferTexture&&D.minFilter!==ui&&D.minFilter!==Gi?Math.log2(Math.max(A.width,A.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?A.mipmaps.length:1}function w(D){return D===ui||D===ol||D===Na?s.NEAREST:s.LINEAR}function C(D){let A=D.target;A.removeEventListener("dispose",C),M(A),A.isVideoTexture&&u.delete(A)}function H(D){let A=D.target;A.removeEventListener("dispose",H),V(A)}function M(D){let A=n.get(D);if(A.__webglInit===void 0)return;let Q=D.source,Be=f.get(Q);if(Be){let Re=Be[A.__cacheKey];Re.usedTimes--,Re.usedTimes===0&&R(D),Object.keys(Be).length===0&&f.delete(Q)}n.remove(D)}function R(D){let A=n.get(D);s.deleteTexture(A.__webglTexture);let Q=D.source,Be=f.get(Q);delete Be[A.__cacheKey],o.memory.textures--}function V(D){let A=D.texture,Q=n.get(D),Be=n.get(A);if(Be.__webglTexture!==void 0&&(s.deleteTexture(Be.__webglTexture),o.memory.textures--),D.depthTexture&&D.depthTexture.dispose(),D.isWebGLCubeRenderTarget)for(let Re=0;Re<6;Re++){if(Array.isArray(Q.__webglFramebuffer[Re]))for(let Ue=0;Ue<Q.__webglFramebuffer[Re].length;Ue++)s.deleteFramebuffer(Q.__webglFramebuffer[Re][Ue]);else s.deleteFramebuffer(Q.__webglFramebuffer[Re]);Q.__webglDepthbuffer&&s.deleteRenderbuffer(Q.__webglDepthbuffer[Re])}else{if(Array.isArray(Q.__webglFramebuffer))for(let Re=0;Re<Q.__webglFramebuffer.length;Re++)s.deleteFramebuffer(Q.__webglFramebuffer[Re]);else s.deleteFramebuffer(Q.__webglFramebuffer);if(Q.__webglDepthbuffer&&s.deleteRenderbuffer(Q.__webglDepthbuffer),Q.__webglMultisampledFramebuffer&&s.deleteFramebuffer(Q.__webglMultisampledFramebuffer),Q.__webglColorRenderbuffer)for(let Re=0;Re<Q.__webglColorRenderbuffer.length;Re++)Q.__webglColorRenderbuffer[Re]&&s.deleteRenderbuffer(Q.__webglColorRenderbuffer[Re]);Q.__webglDepthRenderbuffer&&s.deleteRenderbuffer(Q.__webglDepthRenderbuffer)}if(D.isWebGLMultipleRenderTargets)for(let Re=0,Ue=A.length;Re<Ue;Re++){let $e=n.get(A[Re]);$e.__webglTexture&&(s.deleteTexture($e.__webglTexture),o.memory.textures--),n.remove(A[Re])}n.remove(A),n.remove(D)}let F=0;function le(){F=0}function I(){let D=F;return D>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+i.maxTextures),F+=1,D}function X(D){let A=[];return A.push(D.wrapS),A.push(D.wrapT),A.push(D.wrapR||0),A.push(D.magFilter),A.push(D.minFilter),A.push(D.anisotropy),A.push(D.internalFormat),A.push(D.format),A.push(D.type),A.push(D.generateMipmaps),A.push(D.premultiplyAlpha),A.push(D.flipY),A.push(D.unpackAlignment),A.push(D.colorSpace),A.join()}function ce(D,A){let Q=n.get(D);if(D.isVideoTexture&&On(D),D.isRenderTargetTexture===!1&&D.version>0&&Q.__version!==D.version){let Be=D.image;if(Be===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Be.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ge(Q,D,A);return}}t.bindTexture(s.TEXTURE_2D,Q.__webglTexture,s.TEXTURE0+A)}function ne(D,A){let Q=n.get(D);if(D.version>0&&Q.__version!==D.version){Ge(Q,D,A);return}t.bindTexture(s.TEXTURE_2D_ARRAY,Q.__webglTexture,s.TEXTURE0+A)}function ie(D,A){let Q=n.get(D);if(D.version>0&&Q.__version!==D.version){Ge(Q,D,A);return}t.bindTexture(s.TEXTURE_3D,Q.__webglTexture,s.TEXTURE0+A)}function ye(D,A){let Q=n.get(D);if(D.version>0&&Q.__version!==D.version){vt(Q,D,A);return}t.bindTexture(s.TEXTURE_CUBE_MAP,Q.__webglTexture,s.TEXTURE0+A)}let Pe={[to]:s.REPEAT,[ts]:s.CLAMP_TO_EDGE,[za]:s.MIRRORED_REPEAT},_e={[ui]:s.NEAREST,[ol]:s.NEAREST_MIPMAP_NEAREST,[Na]:s.NEAREST_MIPMAP_LINEAR,[Gi]:s.LINEAR,[ff]:s.LINEAR_MIPMAP_NEAREST,[Sr]:s.LINEAR_MIPMAP_LINEAR},st={[xy]:s.NEVER,[Ey]:s.ALWAYS,[yy]:s.LESS,[r0]:s.LEQUAL,[_y]:s.EQUAL,[My]:s.GEQUAL,[vy]:s.GREATER,[by]:s.NOTEQUAL};function ee(D,A,Q){if(Q?(s.texParameteri(D,s.TEXTURE_WRAP_S,Pe[A.wrapS]),s.texParameteri(D,s.TEXTURE_WRAP_T,Pe[A.wrapT]),(D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY)&&s.texParameteri(D,s.TEXTURE_WRAP_R,Pe[A.wrapR]),s.texParameteri(D,s.TEXTURE_MAG_FILTER,_e[A.magFilter]),s.texParameteri(D,s.TEXTURE_MIN_FILTER,_e[A.minFilter])):(s.texParameteri(D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY)&&s.texParameteri(D,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(A.wrapS!==ts||A.wrapT!==ts)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(D,s.TEXTURE_MAG_FILTER,w(A.magFilter)),s.texParameteri(D,s.TEXTURE_MIN_FILTER,w(A.minFilter)),A.minFilter!==ui&&A.minFilter!==Gi&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),A.compareFunction&&(s.texParameteri(D,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(D,s.TEXTURE_COMPARE_FUNC,st[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){let Be=e.get("EXT_texture_filter_anisotropic");if(A.magFilter===ui||A.minFilter!==Na&&A.minFilter!==Sr||A.type===Fs&&e.has("OES_texture_float_linear")===!1||a===!1&&A.type===no&&e.has("OES_texture_half_float_linear")===!1)return;(A.anisotropy>1||n.get(A).__currentAnisotropy)&&(s.texParameterf(D,Be.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,i.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy)}}function Ne(D,A){let Q=!1;D.__webglInit===void 0&&(D.__webglInit=!0,A.addEventListener("dispose",C));let Be=A.source,Re=f.get(Be);Re===void 0&&(Re={},f.set(Be,Re));let Ue=X(A);if(Ue!==D.__cacheKey){Re[Ue]===void 0&&(Re[Ue]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,Q=!0),Re[Ue].usedTimes++;let $e=Re[D.__cacheKey];$e!==void 0&&(Re[D.__cacheKey].usedTimes--,$e.usedTimes===0&&R(A)),D.__cacheKey=Ue,D.__webglTexture=Re[Ue].texture}return Q}function Ge(D,A,Q){let Be=s.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(Be=s.TEXTURE_2D_ARRAY),A.isData3DTexture&&(Be=s.TEXTURE_3D);let Re=Ne(D,A),Ue=A.source;t.bindTexture(Be,D.__webglTexture,s.TEXTURE0+Q);let $e=n.get(Ue);if(Ue.version!==$e.__version||Re===!0){t.activeTexture(s.TEXTURE0+Q);let Ze=bn.getPrimaries(bn.workingColorSpace),rt=A.colorSpace===fs?null:bn.getPrimaries(A.colorSpace),Nt=A.colorSpace===fs||Ze===rt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,A.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,A.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Nt);let en=p(A)&&m(A.image)===!1,De=_(A.image,en,!1,i.maxTextureSize);De=zt(A,De);let vn=m(De)||a,qt=r.convert(A.format,A.colorSpace),Dt=r.convert(A.type),yt=b(A.internalFormat,qt,Dt,A.colorSpace,A.isVideoTexture);ee(Be,A,vn);let mt,Me=A.mipmaps,Oe=a&&A.isVideoTexture!==!0&&yt!==t0,fn=$e.__version===void 0||Re===!0,Jt=P(A,De,vn);if(A.isDepthTexture)yt=s.DEPTH_COMPONENT,a?A.type===Fs?yt=s.DEPTH_COMPONENT32F:A.type===_r?yt=s.DEPTH_COMPONENT24:A.type===$r?yt=s.DEPTH24_STENCIL8:yt=s.DEPTH_COMPONENT16:A.type===Fs&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),A.format===Qr&&yt===s.DEPTH_COMPONENT&&A.type!==df&&A.type!==_r&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),A.type=_r,Dt=r.convert(A.type)),A.format===Wo&&yt===s.DEPTH_COMPONENT&&(yt=s.DEPTH_STENCIL,A.type!==$r&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),A.type=$r,Dt=r.convert(A.type))),fn&&(Oe?t.texStorage2D(s.TEXTURE_2D,1,yt,De.width,De.height):t.texImage2D(s.TEXTURE_2D,0,yt,De.width,De.height,0,qt,Dt,null));else if(A.isDataTexture)if(Me.length>0&&vn){Oe&&fn&&t.texStorage2D(s.TEXTURE_2D,Jt,yt,Me[0].width,Me[0].height);for(let ke=0,O=Me.length;ke<O;ke++)mt=Me[ke],Oe?t.texSubImage2D(s.TEXTURE_2D,ke,0,0,mt.width,mt.height,qt,Dt,mt.data):t.texImage2D(s.TEXTURE_2D,ke,yt,mt.width,mt.height,0,qt,Dt,mt.data);A.generateMipmaps=!1}else Oe?(fn&&t.texStorage2D(s.TEXTURE_2D,Jt,yt,De.width,De.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,De.width,De.height,qt,Dt,De.data)):t.texImage2D(s.TEXTURE_2D,0,yt,De.width,De.height,0,qt,Dt,De.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){Oe&&fn&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Jt,yt,Me[0].width,Me[0].height,De.depth);for(let ke=0,O=Me.length;ke<O;ke++)mt=Me[ke],A.format!==ns?qt!==null?Oe?t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ke,0,0,0,mt.width,mt.height,De.depth,qt,mt.data,0,0):t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ke,yt,mt.width,mt.height,De.depth,0,mt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Oe?t.texSubImage3D(s.TEXTURE_2D_ARRAY,ke,0,0,0,mt.width,mt.height,De.depth,qt,Dt,mt.data):t.texImage3D(s.TEXTURE_2D_ARRAY,ke,yt,mt.width,mt.height,De.depth,0,qt,Dt,mt.data)}else{Oe&&fn&&t.texStorage2D(s.TEXTURE_2D,Jt,yt,Me[0].width,Me[0].height);for(let ke=0,O=Me.length;ke<O;ke++)mt=Me[ke],A.format!==ns?qt!==null?Oe?t.compressedTexSubImage2D(s.TEXTURE_2D,ke,0,0,mt.width,mt.height,qt,mt.data):t.compressedTexImage2D(s.TEXTURE_2D,ke,yt,mt.width,mt.height,0,mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Oe?t.texSubImage2D(s.TEXTURE_2D,ke,0,0,mt.width,mt.height,qt,Dt,mt.data):t.texImage2D(s.TEXTURE_2D,ke,yt,mt.width,mt.height,0,qt,Dt,mt.data)}else if(A.isDataArrayTexture)Oe?(fn&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Jt,yt,De.width,De.height,De.depth),t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,De.width,De.height,De.depth,qt,Dt,De.data)):t.texImage3D(s.TEXTURE_2D_ARRAY,0,yt,De.width,De.height,De.depth,0,qt,Dt,De.data);else if(A.isData3DTexture)Oe?(fn&&t.texStorage3D(s.TEXTURE_3D,Jt,yt,De.width,De.height,De.depth),t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,De.width,De.height,De.depth,qt,Dt,De.data)):t.texImage3D(s.TEXTURE_3D,0,yt,De.width,De.height,De.depth,0,qt,Dt,De.data);else if(A.isFramebufferTexture){if(fn)if(Oe)t.texStorage2D(s.TEXTURE_2D,Jt,yt,De.width,De.height);else{let ke=De.width,O=De.height;for(let We=0;We<Jt;We++)t.texImage2D(s.TEXTURE_2D,We,yt,ke,O,0,qt,Dt,null),ke>>=1,O>>=1}}else if(Me.length>0&&vn){Oe&&fn&&t.texStorage2D(s.TEXTURE_2D,Jt,yt,Me[0].width,Me[0].height);for(let ke=0,O=Me.length;ke<O;ke++)mt=Me[ke],Oe?t.texSubImage2D(s.TEXTURE_2D,ke,0,0,qt,Dt,mt):t.texImage2D(s.TEXTURE_2D,ke,yt,qt,Dt,mt);A.generateMipmaps=!1}else Oe?(fn&&t.texStorage2D(s.TEXTURE_2D,Jt,yt,De.width,De.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,qt,Dt,De)):t.texImage2D(s.TEXTURE_2D,0,yt,qt,Dt,De);v(A,vn)&&x(Be),$e.__version=Ue.version,A.onUpdate&&A.onUpdate(A)}D.__version=A.version}function vt(D,A,Q){if(A.image.length!==6)return;let Be=Ne(D,A),Re=A.source;t.bindTexture(s.TEXTURE_CUBE_MAP,D.__webglTexture,s.TEXTURE0+Q);let Ue=n.get(Re);if(Re.version!==Ue.__version||Be===!0){t.activeTexture(s.TEXTURE0+Q);let $e=bn.getPrimaries(bn.workingColorSpace),Ze=A.colorSpace===fs?null:bn.getPrimaries(A.colorSpace),rt=A.colorSpace===fs||$e===Ze?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,A.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,A.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,rt);let Nt=A.isCompressedTexture||A.image[0].isCompressedTexture,en=A.image[0]&&A.image[0].isDataTexture,De=[];for(let ke=0;ke<6;ke++)!Nt&&!en?De[ke]=_(A.image[ke],!1,!0,i.maxCubemapSize):De[ke]=en?A.image[ke].image:A.image[ke],De[ke]=zt(A,De[ke]);let vn=De[0],qt=m(vn)||a,Dt=r.convert(A.format,A.colorSpace),yt=r.convert(A.type),mt=b(A.internalFormat,Dt,yt,A.colorSpace),Me=a&&A.isVideoTexture!==!0,Oe=Ue.__version===void 0||Be===!0,fn=P(A,vn,qt);ee(s.TEXTURE_CUBE_MAP,A,qt);let Jt;if(Nt){Me&&Oe&&t.texStorage2D(s.TEXTURE_CUBE_MAP,fn,mt,vn.width,vn.height);for(let ke=0;ke<6;ke++){Jt=De[ke].mipmaps;for(let O=0;O<Jt.length;O++){let We=Jt[O];A.format!==ns?Dt!==null?Me?t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ke,O,0,0,We.width,We.height,Dt,We.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ke,O,mt,We.width,We.height,0,We.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Me?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ke,O,0,0,We.width,We.height,Dt,yt,We.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ke,O,mt,We.width,We.height,0,Dt,yt,We.data)}}}else{Jt=A.mipmaps,Me&&Oe&&(Jt.length>0&&fn++,t.texStorage2D(s.TEXTURE_CUBE_MAP,fn,mt,De[0].width,De[0].height));for(let ke=0;ke<6;ke++)if(en){Me?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ke,0,0,0,De[ke].width,De[ke].height,Dt,yt,De[ke].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ke,0,mt,De[ke].width,De[ke].height,0,Dt,yt,De[ke].data);for(let O=0;O<Jt.length;O++){let Ke=Jt[O].image[ke].image;Me?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ke,O+1,0,0,Ke.width,Ke.height,Dt,yt,Ke.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ke,O+1,mt,Ke.width,Ke.height,0,Dt,yt,Ke.data)}}else{Me?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ke,0,0,0,Dt,yt,De[ke]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ke,0,mt,Dt,yt,De[ke]);for(let O=0;O<Jt.length;O++){let We=Jt[O];Me?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ke,O+1,0,0,Dt,yt,We.image[ke]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ke,O+1,mt,Dt,yt,We.image[ke])}}}v(A,qt)&&x(s.TEXTURE_CUBE_MAP),Ue.__version=Re.version,A.onUpdate&&A.onUpdate(A)}D.__version=A.version}function wt(D,A,Q,Be,Re,Ue){let $e=r.convert(Q.format,Q.colorSpace),Ze=r.convert(Q.type),rt=b(Q.internalFormat,$e,Ze,Q.colorSpace);if(!n.get(A).__hasExternalTextures){let en=Math.max(1,A.width>>Ue),De=Math.max(1,A.height>>Ue);Re===s.TEXTURE_3D||Re===s.TEXTURE_2D_ARRAY?t.texImage3D(Re,Ue,rt,en,De,A.depth,0,$e,Ze,null):t.texImage2D(Re,Ue,rt,en,De,0,$e,Ze,null)}t.bindFramebuffer(s.FRAMEBUFFER,D),St(A)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Be,Re,n.get(Q).__webglTexture,0,Kt(A)):(Re===s.TEXTURE_2D||Re>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Re<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,Be,Re,n.get(Q).__webglTexture,Ue),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Xt(D,A,Q){if(s.bindRenderbuffer(s.RENDERBUFFER,D),A.depthBuffer&&!A.stencilBuffer){let Be=a===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(Q||St(A)){let Re=A.depthTexture;Re&&Re.isDepthTexture&&(Re.type===Fs?Be=s.DEPTH_COMPONENT32F:Re.type===_r&&(Be=s.DEPTH_COMPONENT24));let Ue=Kt(A);St(A)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ue,Be,A.width,A.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,Ue,Be,A.width,A.height)}else s.renderbufferStorage(s.RENDERBUFFER,Be,A.width,A.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,D)}else if(A.depthBuffer&&A.stencilBuffer){let Be=Kt(A);Q&&St(A)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Be,s.DEPTH24_STENCIL8,A.width,A.height):St(A)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Be,s.DEPTH24_STENCIL8,A.width,A.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,A.width,A.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,D)}else{let Be=A.isWebGLMultipleRenderTargets===!0?A.texture:[A.texture];for(let Re=0;Re<Be.length;Re++){let Ue=Be[Re],$e=r.convert(Ue.format,Ue.colorSpace),Ze=r.convert(Ue.type),rt=b(Ue.internalFormat,$e,Ze,Ue.colorSpace),Nt=Kt(A);Q&&St(A)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Nt,rt,A.width,A.height):St(A)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Nt,rt,A.width,A.height):s.renderbufferStorage(s.RENDERBUFFER,rt,A.width,A.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Qt(D,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,D),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(A.depthTexture).__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),ce(A.depthTexture,0);let Be=n.get(A.depthTexture).__webglTexture,Re=Kt(A);if(A.depthTexture.format===Qr)St(A)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Be,0,Re):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Be,0);else if(A.depthTexture.format===Wo)St(A)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Be,0,Re):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Be,0);else throw new Error("Unknown depthTexture format")}function Bt(D){let A=n.get(D),Q=D.isWebGLCubeRenderTarget===!0;if(D.depthTexture&&!A.__autoAllocateDepthBuffer){if(Q)throw new Error("target.depthTexture not supported in Cube render targets");Qt(A.__webglFramebuffer,D)}else if(Q){A.__webglDepthbuffer=[];for(let Be=0;Be<6;Be++)t.bindFramebuffer(s.FRAMEBUFFER,A.__webglFramebuffer[Be]),A.__webglDepthbuffer[Be]=s.createRenderbuffer(),Xt(A.__webglDepthbuffer[Be],D,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer=s.createRenderbuffer(),Xt(A.__webglDepthbuffer,D,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function gn(D,A,Q){let Be=n.get(D);A!==void 0&&wt(Be.__webglFramebuffer,D,D.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),Q!==void 0&&Bt(D)}function re(D){let A=D.texture,Q=n.get(D),Be=n.get(A);D.addEventListener("dispose",H),D.isWebGLMultipleRenderTargets!==!0&&(Be.__webglTexture===void 0&&(Be.__webglTexture=s.createTexture()),Be.__version=A.version,o.memory.textures++);let Re=D.isWebGLCubeRenderTarget===!0,Ue=D.isWebGLMultipleRenderTargets===!0,$e=m(D)||a;if(Re){Q.__webglFramebuffer=[];for(let Ze=0;Ze<6;Ze++)if(a&&A.mipmaps&&A.mipmaps.length>0){Q.__webglFramebuffer[Ze]=[];for(let rt=0;rt<A.mipmaps.length;rt++)Q.__webglFramebuffer[Ze][rt]=s.createFramebuffer()}else Q.__webglFramebuffer[Ze]=s.createFramebuffer()}else{if(a&&A.mipmaps&&A.mipmaps.length>0){Q.__webglFramebuffer=[];for(let Ze=0;Ze<A.mipmaps.length;Ze++)Q.__webglFramebuffer[Ze]=s.createFramebuffer()}else Q.__webglFramebuffer=s.createFramebuffer();if(Ue)if(i.drawBuffers){let Ze=D.texture;for(let rt=0,Nt=Ze.length;rt<Nt;rt++){let en=n.get(Ze[rt]);en.__webglTexture===void 0&&(en.__webglTexture=s.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&D.samples>0&&St(D)===!1){let Ze=Ue?A:[A];Q.__webglMultisampledFramebuffer=s.createFramebuffer(),Q.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,Q.__webglMultisampledFramebuffer);for(let rt=0;rt<Ze.length;rt++){let Nt=Ze[rt];Q.__webglColorRenderbuffer[rt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,Q.__webglColorRenderbuffer[rt]);let en=r.convert(Nt.format,Nt.colorSpace),De=r.convert(Nt.type),vn=b(Nt.internalFormat,en,De,Nt.colorSpace,D.isXRRenderTarget===!0),qt=Kt(D);s.renderbufferStorageMultisample(s.RENDERBUFFER,qt,vn,D.width,D.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+rt,s.RENDERBUFFER,Q.__webglColorRenderbuffer[rt])}s.bindRenderbuffer(s.RENDERBUFFER,null),D.depthBuffer&&(Q.__webglDepthRenderbuffer=s.createRenderbuffer(),Xt(Q.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(Re){t.bindTexture(s.TEXTURE_CUBE_MAP,Be.__webglTexture),ee(s.TEXTURE_CUBE_MAP,A,$e);for(let Ze=0;Ze<6;Ze++)if(a&&A.mipmaps&&A.mipmaps.length>0)for(let rt=0;rt<A.mipmaps.length;rt++)wt(Q.__webglFramebuffer[Ze][rt],D,A,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Ze,rt);else wt(Q.__webglFramebuffer[Ze],D,A,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Ze,0);v(A,$e)&&x(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ue){let Ze=D.texture;for(let rt=0,Nt=Ze.length;rt<Nt;rt++){let en=Ze[rt],De=n.get(en);t.bindTexture(s.TEXTURE_2D,De.__webglTexture),ee(s.TEXTURE_2D,en,$e),wt(Q.__webglFramebuffer,D,en,s.COLOR_ATTACHMENT0+rt,s.TEXTURE_2D,0),v(en,$e)&&x(s.TEXTURE_2D)}t.unbindTexture()}else{let Ze=s.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(a?Ze=D.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(Ze,Be.__webglTexture),ee(Ze,A,$e),a&&A.mipmaps&&A.mipmaps.length>0)for(let rt=0;rt<A.mipmaps.length;rt++)wt(Q.__webglFramebuffer[rt],D,A,s.COLOR_ATTACHMENT0,Ze,rt);else wt(Q.__webglFramebuffer,D,A,s.COLOR_ATTACHMENT0,Ze,0);v(A,$e)&&x(Ze),t.unbindTexture()}D.depthBuffer&&Bt(D)}function xi(D){let A=m(D)||a,Q=D.isWebGLMultipleRenderTargets===!0?D.texture:[D.texture];for(let Be=0,Re=Q.length;Be<Re;Be++){let Ue=Q[Be];if(v(Ue,A)){let $e=D.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,Ze=n.get(Ue).__webglTexture;t.bindTexture($e,Ze),x($e),t.unbindTexture()}}}function Ot(D){if(a&&D.samples>0&&St(D)===!1){let A=D.isWebGLMultipleRenderTargets?D.texture:[D.texture],Q=D.width,Be=D.height,Re=s.COLOR_BUFFER_BIT,Ue=[],$e=D.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ze=n.get(D),rt=D.isWebGLMultipleRenderTargets===!0;if(rt)for(let Nt=0;Nt<A.length;Nt++)t.bindFramebuffer(s.FRAMEBUFFER,Ze.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Nt,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Ze.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Nt,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Ze.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ze.__webglFramebuffer);for(let Nt=0;Nt<A.length;Nt++){Ue.push(s.COLOR_ATTACHMENT0+Nt),D.depthBuffer&&Ue.push($e);let en=Ze.__ignoreDepthValues!==void 0?Ze.__ignoreDepthValues:!1;if(en===!1&&(D.depthBuffer&&(Re|=s.DEPTH_BUFFER_BIT),D.stencilBuffer&&(Re|=s.STENCIL_BUFFER_BIT)),rt&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ze.__webglColorRenderbuffer[Nt]),en===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[$e]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[$e])),rt){let De=n.get(A[Nt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,De,0)}s.blitFramebuffer(0,0,Q,Be,0,0,Q,Be,Re,s.NEAREST),l&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Ue)}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),rt)for(let Nt=0;Nt<A.length;Nt++){t.bindFramebuffer(s.FRAMEBUFFER,Ze.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Nt,s.RENDERBUFFER,Ze.__webglColorRenderbuffer[Nt]);let en=n.get(A[Nt]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Ze.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Nt,s.TEXTURE_2D,en,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ze.__webglMultisampledFramebuffer)}}function Kt(D){return Math.min(i.maxSamples,D.samples)}function St(D){let A=n.get(D);return a&&D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function On(D){let A=o.render.frame;u.get(D)!==A&&(u.set(D,A),D.update())}function zt(D,A){let Q=D.colorSpace,Be=D.format,Re=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||D.format===wh||Q!==di&&Q!==fs&&(bn.getTransfer(Q)===Hn?a===!1?e.has("EXT_sRGB")===!0&&Be===ns?(D.format=wh,D.minFilter=Gi,D.generateMipmaps=!1):A=hl.sRGBToLinear(A):(Be!==ns||Re!==Er)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Q)),A}this.allocateTextureUnit=I,this.resetTextureUnits=le,this.setTexture2D=ce,this.setTexture2DArray=ne,this.setTexture3D=ie,this.setTextureCube=ye,this.rebindTextures=gn,this.setupRenderTarget=re,this.updateRenderTargetMipmap=xi,this.updateMultisampleRenderTarget=Ot,this.setupDepthRenderbuffer=Bt,this.setupFrameBufferTexture=wt,this.useMultisampledRTT=St}function wE(s,e,t){let n=t.isWebGL2;function i(r,o=fs){let a,c=bn.getTransfer(o);if(r===Er)return s.UNSIGNED_BYTE;if(r===Km)return s.UNSIGNED_SHORT_4_4_4_4;if(r===Jm)return s.UNSIGNED_SHORT_5_5_5_1;if(r===ry)return s.BYTE;if(r===oy)return s.SHORT;if(r===df)return s.UNSIGNED_SHORT;if(r===Zm)return s.INT;if(r===_r)return s.UNSIGNED_INT;if(r===Fs)return s.FLOAT;if(r===no)return n?s.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===ay)return s.ALPHA;if(r===ns)return s.RGBA;if(r===cy)return s.LUMINANCE;if(r===ly)return s.LUMINANCE_ALPHA;if(r===Qr)return s.DEPTH_COMPONENT;if(r===Wo)return s.DEPTH_STENCIL;if(r===wh)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===uy)return s.RED;if(r===$m)return s.RED_INTEGER;if(r===hy)return s.RG;if(r===Qm)return s.RG_INTEGER;if(r===e0)return s.RGBA_INTEGER;if(r===Ou||r===ku||r===zu||r===Hu)if(c===Hn)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===Ou)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===ku)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===zu)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Hu)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===Ou)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===ku)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===zu)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Hu)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===ap||r===cp||r===lp||r===up)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===ap)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===cp)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===lp)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===up)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===t0)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===hp||r===fp)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(r===hp)return c===Hn?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===fp)return c===Hn?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===dp||r===pp||r===mp||r===gp||r===xp||r===yp||r===_p||r===vp||r===bp||r===Mp||r===Ep||r===Sp||r===Tp||r===wp)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(r===dp)return c===Hn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===pp)return c===Hn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===mp)return c===Hn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===gp)return c===Hn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===xp)return c===Hn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===yp)return c===Hn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===_p)return c===Hn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===vp)return c===Hn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===bp)return c===Hn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Mp)return c===Hn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Ep)return c===Hn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Sp)return c===Hn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Tp)return c===Hn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===wp)return c===Hn?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Vu||r===Ap||r===Rp)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(r===Vu)return c===Hn?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Ap)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Rp)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===fy||r===Cp||r===Pp||r===Ip)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(r===Vu)return a.COMPRESSED_RED_RGTC1_EXT;if(r===Cp)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Pp)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Ip)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===$r?n?s.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):s[r]!==void 0?s[r]:null}return{convert:i}}function RE(s,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,c0(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,v,x,b){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),h(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,b)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,v,x):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Oi&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Oi&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let v=e.get(p).envMap;if(v&&(m.envMap.value=v,m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;let x=s._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*x,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,v,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=x*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Oi&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){let v=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function CE(s,e,t,n){let i={},r={},o=[],a=t.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(v,x){let b=x.program;n.uniformBlockBinding(v,b)}function l(v,x){let b=i[v.id];b===void 0&&(g(v),b=u(v),i[v.id]=b,v.addEventListener("dispose",m));let P=x.program;n.updateUBOMapping(v,P);let w=e.render.frame;r[v.id]!==w&&(f(v),r[v.id]=w)}function u(v){let x=h();v.__bindingPointIndex=x;let b=s.createBuffer(),P=v.__size,w=v.usage;return s.bindBuffer(s.UNIFORM_BUFFER,b),s.bufferData(s.UNIFORM_BUFFER,P,w),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,x,b),b}function h(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){let x=i[v.id],b=v.uniforms,P=v.__cache;s.bindBuffer(s.UNIFORM_BUFFER,x);for(let w=0,C=b.length;w<C;w++){let H=Array.isArray(b[w])?b[w]:[b[w]];for(let M=0,R=H.length;M<R;M++){let V=H[M];if(d(V,w,M,P)===!0){let F=V.__offset,le=Array.isArray(V.value)?V.value:[V.value],I=0;for(let X=0;X<le.length;X++){let ce=le[X],ne=_(ce);typeof ce=="number"||typeof ce=="boolean"?(V.__data[0]=ce,s.bufferSubData(s.UNIFORM_BUFFER,F+I,V.__data)):ce.isMatrix3?(V.__data[0]=ce.elements[0],V.__data[1]=ce.elements[1],V.__data[2]=ce.elements[2],V.__data[3]=0,V.__data[4]=ce.elements[3],V.__data[5]=ce.elements[4],V.__data[6]=ce.elements[5],V.__data[7]=0,V.__data[8]=ce.elements[6],V.__data[9]=ce.elements[7],V.__data[10]=ce.elements[8],V.__data[11]=0):(ce.toArray(V.__data,I),I+=ne.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,F,V.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function d(v,x,b,P){let w=v.value,C=x+"_"+b;if(P[C]===void 0)return typeof w=="number"||typeof w=="boolean"?P[C]=w:P[C]=w.clone(),!0;{let H=P[C];if(typeof w=="number"||typeof w=="boolean"){if(H!==w)return P[C]=w,!0}else if(H.equals(w)===!1)return H.copy(w),!0}return!1}function g(v){let x=v.uniforms,b=0,P=16;for(let C=0,H=x.length;C<H;C++){let M=Array.isArray(x[C])?x[C]:[x[C]];for(let R=0,V=M.length;R<V;R++){let F=M[R],le=Array.isArray(F.value)?F.value:[F.value];for(let I=0,X=le.length;I<X;I++){let ce=le[I],ne=_(ce),ie=b%P;ie!==0&&P-ie<ne.boundary&&(b+=P-ie),F.__data=new Float32Array(ne.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=b,b+=ne.storage}}}let w=b%P;return w>0&&(b+=P-w),v.__size=b,v.__cache={},this}function _(v){let x={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(x.boundary=4,x.storage=4):v.isVector2?(x.boundary=8,x.storage=8):v.isVector3||v.isColor?(x.boundary=16,x.storage=12):v.isVector4?(x.boundary=16,x.storage=16):v.isMatrix3?(x.boundary=48,x.storage=48):v.isMatrix4?(x.boundary=64,x.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),x}function m(v){let x=v.target;x.removeEventListener("dispose",m);let b=o.indexOf(x.__bindingPointIndex);o.splice(b,1),s.deleteBuffer(i[x.id]),delete i[x.id],delete r[x.id]}function p(){for(let v in i)s.deleteBuffer(i[v]);o=[],i={},r={}}return{bind:c,update:l,dispose:p}}function NE(s,e){return s.z-e.z}function DE(s,e){return e.z-s.z}function FE(s,e,t=0){let n=e.itemSize;if(s.isInterleavedBufferAttribute||s.array.constructor!==e.array.constructor){let i=s.count;for(let r=0;r<i;r++)for(let o=0;o<n;o++)e.setComponent(r+t,o,s.getComponent(r,o))}else e.array.set(s.array,t*n);e.needsUpdate=!0}function Bm(s,e,t,n,i,r,o){let a=Wh.distanceSqToPoint(s);if(a<t){let c=new T;Wh.closestPointToPoint(s,c),c.applyMatrix4(n);let l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,object:o})}}function xf(){let s=0,e=0,t=0,n=0;function i(r,o,a,c){s=r,e=a,t=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){i(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,u,h){let f=(o-r)/l-(a-r)/(l+u)+(a-o)/u,d=(a-o)/u-(c-o)/(u+h)+(c-a)/h;f*=u,d*=u,i(o,a,f,d)},calc:function(r){let o=r*r,a=o*r;return s+e*r+t*o+n*a}}}function Om(s,e,t,n,i){let r=(n-e)*.5,o=(i-t)*.5,a=s*s,c=s*a;return(2*t-2*n+r+o)*c+(-3*t+3*n-2*r-o)*a+r*s+t}function BE(s,e){let t=1-s;return t*t*e}function OE(s,e){return 2*(1-s)*s*e}function kE(s,e){return s*s*e}function Oa(s,e,t,n){return BE(s,e)+OE(s,t)+kE(s,n)}function zE(s,e){let t=1-s;return t*t*t*e}function HE(s,e){let t=1-s;return 3*t*t*s*e}function VE(s,e){return 3*(1-s)*s*s*e}function GE(s,e){return s*s*s*e}function ka(s,e,t,n,i){return zE(s,e)+HE(s,t)+VE(s,n)+GE(s,i)}function il(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function XE(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function qE(s){function e(i,r){return s[i]-s[r]}let t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function km(s,e,t){let n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){let a=t[r]*e;for(let c=0;c!==e;++c)i[o++]=s[a+c]}return i}function m0(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=s[i++];while(r!==void 0)}function YE(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ir;case"vector":case"vector2":case"vector3":case"vector4":return sr;case"color":return Cl;case"quaternion":return ks;case"bool":case"boolean":return Ir;case"string":return Lr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function jE(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=YE(s.type);if(s.times===void 0){let t=[],n=[];m0(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}function Gm(s,e){return s.distance-e.distance}function uf(s,e,t,n){if(s.layers.test(e.layers)&&s.raycast(e,t),n===!0){let i=s.children;for(let r=0,o=i.length;r<o;r++)uf(i[r],e,t,!0)}}var tc,Xm,Rx,ep,Cx,qm,Px,tr,Wi,Oi,Ti,br,Oo,tp,np,ip,Bl,Ds,Ix,Lx,sp,rp,Ol,kl,Nx,Dx,Ho,Mh,Ux,Fx,Bx,Ox,kx,zx,Hx,Vx,Gx,Wx,Xx,qx,rl,Yx,jx,hf,Zx,Ym,Kx,Jx,Mr,$x,Qx,ey,ty,ny,iy,op,sy,jm,Vo,Go,Eh,Sh,zl,to,ts,za,ui,ol,Na,Gi,ff,Sr,Er,ry,oy,df,Zm,_r,Fs,no,Km,Jm,$r,ay,ns,cy,ly,Qr,Wo,uy,$m,hy,Qm,e0,Ou,ku,zu,Hu,ap,cp,lp,up,t0,hp,fp,dp,pp,mp,gp,xp,yp,_p,vp,bp,Mp,Ep,Sp,Tp,wp,Vu,Ap,Rp,fy,Cp,Pp,Ip,Xo,io,Gu,Lp,Np,Dp,dy,n0,Hl,nc,i0,eo,py,my,s0,gy,fs,Vn,di,pf,Vl,al,Hn,cl,ll,yo,Up,xy,yy,_y,r0,vy,by,My,Ey,Th,Fp,wh,Bs,Ha,Tr,Ui,Bp,Da,qo,oo,tt,hn,Wu,Op,kp,zp,Ac,ky,bn,_o,hl,zy,fl,Hy,ki,Nn,Rh,ds,dl,Ch,pi,T,Yu,Hp,on,Zs,Ms,Rc,vo,bo,Mo,dr,pr,Xr,Ta,Cc,Pc,qr,Vy,wa,Zu,ei,Ks,Ku,Ic,mr,Ju,Lc,$u,nr,bt,Eo,Es,Gy,Wy,gr,Nc,$i,Vp,Gp,Yo,Ga,Xy,Wp,So,Js,Dc,Aa,qy,Yy,Xp,qp,Yp,jy,Zy,Yn,Ss,$s,Qu,Qs,To,wo,jp,eh,th,nh,Uc,is,a0,xr,Fc,Pt,Fi,Ky,ss,Xi,si,Bc,wn,jo,Zo,fi,Jy,hs,sh,Ao,Qi,Ra,Si,wi,Zp,Yr,Oc,Kp,Ro,Co,Po,rh,kc,zc,Hc,Vc,Jp,$p,Qp,Gc,Wc,Mn,Wa,e_,t_,n_,qi,pl,hi,Io,Lo,Ph,ml,Ih,oh,i_,s_,es,jr,qc,wr,so,o_,a_,c_,l_,u_,h_,f_,d_,p_,m_,g_,x_,y_,__,v_,b_,M_,E_,S_,T_,w_,A_,R_,C_,P_,I_,L_,N_,D_,U_,F_,B_,O_,k_,z_,H_,V_,G_,W_,X_,q_,Y_,j_,Z_,K_,J_,$_,Q_,ev,tv,nv,iv,sv,rv,ov,av,cv,lv,uv,hv,fv,dv,pv,mv,gv,xv,yv,_v,vv,bv,Mv,Ev,Sv,Tv,wv,Av,Rv,Cv,Pv,Iv,Lv,Nv,Dv,Uv,Fv,Bv,Ov,kv,zv,Hv,Vv,Gv,Wv,Xv,qv,Yv,jv,Zv,Kv,Jv,$v,Qv,eb,tb,nb,ib,sb,rb,ob,ab,cb,lb,ub,hb,fb,db,pb,mb,gb,xb,yb,_b,vb,bb,Mb,Eb,Sb,Tb,wb,Ab,Rb,Cb,Pb,Ib,Lb,Nb,Db,Ub,Fb,Bb,Ob,un,Ye,Ns,Yc,Ar,Fo,em,Jr,ah,tm,ch,lh,uh,Kr,No,nm,gl,xl,u0,h0,f0,d0,p0,om,am,cm,lm,um,Lh,Nh,Dh,hh,zo,GM,WM,QM,eE,nE,uE,Fh,Bh,xE,Oh,kh,bE,ME,zh,Os,AE,Ba,Hh,Xa,Vh,Rr,qa,Hi,Ya,bm,Mm,Em,PE,Sm,Zc,fh,Tm,dh,yl,ja,_l,wm,IE,vl,ro,Do,Am,Kc,Rm,LE,Ca,Pa,bl,Gh,Uo,yr,Cm,UE,Pm,ph,Jc,Zr,Ia,mh,Bi,$c,Ml,Za,Im,Lm,Nm,gh,Qc,Jo,Dm,Um,El,Sl,Ka,Fm,Wh,el,tl,Tl,ws,wl,Xh,nl,xh,yh,_h,Ja,qh,Yh,jh,Zh,Kh,Al,Jh,WE,Rl,Cr,ps,Pr,$h,Qh,ef,ms,Ir,Cl,ir,tf,ks,Lr,sr,Pl,vr,nf,ZE,rr,er,sf,$a,rf,Il,$o,Ll,vh,zm,Hm,Qa,of,Nl,Vm,La,bh,af,Dl,cf,Qo,Nr,Ul,yf,KE,_f,JE,$E,QE,eS,tS,nS,iS,lf,Bn,i1,ec,Fl,Wm,sl,Zi,oi=Ft(()=>{tc="160",Xm={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Rx=0,ep=1,Cx=2,qm=1,Px=2,tr=3,Wi=0,Oi=1,Ti=2,br=0,Oo=1,tp=2,np=3,ip=4,Bl=5,Ds=100,Ix=101,Lx=102,sp=103,rp=104,Ol=200,kl=201,Nx=202,Dx=203,Ho=204,Mh=205,Ux=206,Fx=207,Bx=208,Ox=209,kx=210,zx=211,Hx=212,Vx=213,Gx=214,Wx=0,Xx=1,qx=2,rl=3,Yx=4,jx=5,hf=6,Zx=7,Ym=0,Kx=1,Jx=2,Mr=0,$x=1,Qx=2,ey=3,ty=4,ny=5,iy=6,op="attached",sy="detached",jm=300,Vo=301,Go=302,Eh=303,Sh=304,zl=306,to=1e3,ts=1001,za=1002,ui=1003,ol=1004,Na=1005,Gi=1006,ff=1007,Sr=1008,Er=1009,ry=1010,oy=1011,df=1012,Zm=1013,_r=1014,Fs=1015,no=1016,Km=1017,Jm=1018,$r=1020,ay=1021,ns=1023,cy=1024,ly=1025,Qr=1026,Wo=1027,uy=1028,$m=1029,hy=1030,Qm=1031,e0=1033,Ou=33776,ku=33777,zu=33778,Hu=33779,ap=35840,cp=35841,lp=35842,up=35843,t0=36196,hp=37492,fp=37496,dp=37808,pp=37809,mp=37810,gp=37811,xp=37812,yp=37813,_p=37814,vp=37815,bp=37816,Mp=37817,Ep=37818,Sp=37819,Tp=37820,wp=37821,Vu=36492,Ap=36494,Rp=36495,fy=36283,Cp=36284,Pp=36285,Ip=36286,Xo=2300,io=2301,Gu=2302,Lp=2400,Np=2401,Dp=2402,dy=2500,n0=0,Hl=1,nc=2,i0=3e3,eo=3001,py=3200,my=3201,s0=0,gy=1,fs="",Vn="srgb",di="srgb-linear",pf="display-p3",Vl="display-p3-linear",al="linear",Hn="srgb",cl="rec709",ll="p3",yo=7680,Up=519,xy=512,yy=513,_y=514,r0=515,vy=516,by=517,My=518,Ey=519,Th=35044,Fp="300 es",wh=1035,Bs=2e3,Ha=2001,Tr=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let i=this._listeners[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}},Ui=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Bp=1234567,Da=Math.PI/180,qo=180/Math.PI;oo={DEG2RAD:Da,RAD2DEG:qo,generateUUID:Ts,clamp:ri,euclideanModulo:mf,mapLinear:Sy,inverseLerp:Ty,lerp:Ua,damp:wy,pingpong:Ay,smoothstep:Ry,smootherstep:Cy,randInt:Py,randFloat:Iy,randFloatSpread:Ly,seededRandom:Ny,degToRad:Dy,radToDeg:Uy,isPowerOfTwo:Ah,ceilPowerOfTwo:Fy,floorPowerOfTwo:ul,setQuaternionFromProperEuler:By,normalize:Pn,denormalize:Us},tt=class s{constructor(e=0,t=0){s.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ri(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},hn=class s{constructor(e,t,n,i,r,o,a,c,l){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,c,l)}set(e,t,n,i,r,o,a,c,l){let u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],h=n[7],f=n[2],d=n[5],g=n[8],_=i[0],m=i[3],p=i[6],v=i[1],x=i[4],b=i[7],P=i[2],w=i[5],C=i[8];return r[0]=o*_+a*v+c*P,r[3]=o*m+a*x+c*w,r[6]=o*p+a*b+c*C,r[1]=l*_+u*v+h*P,r[4]=l*m+u*x+h*w,r[7]=l*p+u*b+h*C,r[2]=f*_+d*v+g*P,r[5]=f*m+d*x+g*w,r[8]=f*p+d*b+g*C,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-n*r*u+n*a*c+i*r*l-i*o*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=u*o-a*l,f=a*c-u*r,d=l*r-o*c,g=t*h+n*f+i*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return e[0]=h*_,e[1]=(i*l-u*n)*_,e[2]=(a*n-i*o)*_,e[3]=f*_,e[4]=(u*t-i*c)*_,e[5]=(i*r-a*t)*_,e[6]=d*_,e[7]=(n*c-l*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-i*l,i*c,-i*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Wu.makeScale(e,t)),this}rotate(e){return this.premultiply(Wu.makeRotation(-e)),this}translate(e,t){return this.premultiply(Wu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Wu=new hn;Op={};kp=new hn().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),zp=new hn().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ac={[di]:{transfer:al,primaries:cl,toReference:s=>s,fromReference:s=>s},[Vn]:{transfer:Hn,primaries:cl,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[Vl]:{transfer:al,primaries:ll,toReference:s=>s.applyMatrix3(zp),fromReference:s=>s.applyMatrix3(kp)},[pf]:{transfer:Hn,primaries:ll,toReference:s=>s.convertSRGBToLinear().applyMatrix3(zp),fromReference:s=>s.applyMatrix3(kp).convertLinearToSRGB()}},ky=new Set([di,Vl]),bn={enabled:!0,_workingColorSpace:di,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!ky.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;let n=Ac[e].toReference,i=Ac[t].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return Ac[s].primaries},getTransfer:function(s){return s===fs?al:Ac[s].transfer}};hl=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement=="undefined")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{_o===void 0&&(_o=Va("canvas")),_o.width=e.width,_o.height=e.height;let n=_o.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=_o}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement!="undefined"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&e instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&e instanceof ImageBitmap){let t=Va("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=ko(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ko(t[n]/255)*255):t[n]=ko(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},zy=0,fl=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:zy++}),this.uuid=Ts(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(qu(i[o].image)):r.push(qu(i[o]))}else r=qu(i);n.url=r}return t||(e.images[this.uuid]=n),n}};Hy=0,ki=class s extends Tr{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=ts,i=ts,r=Gi,o=Sr,a=ns,c=Er,l=s.DEFAULT_ANISOTROPY,u=fs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Hy++}),this.uuid=Ts(),this.name="",this.source=new fl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new tt(0,0),this.repeat=new tt(1,1),this.center=new tt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new hn,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(Fa("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===eo?Vn:fs),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==jm)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case to:e.x=e.x-Math.floor(e.x);break;case ts:e.x=e.x<0?0:1;break;case za:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case to:e.y=e.y-Math.floor(e.y);break;case ts:e.y=e.y<0?0:1;break;case za:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Fa("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Vn?eo:i0}set encoding(e){Fa("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===eo?Vn:fs}};ki.DEFAULT_IMAGE=null;ki.DEFAULT_MAPPING=jm;ki.DEFAULT_ANISOTROPY=1;Nn=class s{constructor(e=0,t=0,n=0,i=1){s.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,c=e.elements,l=c[0],u=c[4],h=c[8],f=c[1],d=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(u-f)<.01&&Math.abs(h-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let x=(l+1)/2,b=(d+1)/2,P=(p+1)/2,w=(u+f)/4,C=(h+_)/4,H=(g+m)/4;return x>b&&x>P?x<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(x),i=w/n,r=C/n):b>P?b<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(b),n=w/i,r=H/i):P<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(P),n=C/r,i=H/r),this.set(n,i,r,t),this}let v=Math.sqrt((m-g)*(m-g)+(h-_)*(h-_)+(f-u)*(f-u));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(h-_)/v,this.z=(f-u)/v,this.w=Math.acos((l+d+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Rh=class extends Tr{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Nn(0,0,e,t),this.scissorTest=!1,this.viewport=new Nn(0,0,e,t);let i={width:e,height:t,depth:1};n.encoding!==void 0&&(Fa("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===eo?Vn:fs),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Gi,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new ki(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new fl(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},ds=class extends Rh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},dl=class extends ki{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=ui,this.minFilter=ui,this.wrapR=ts,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Ch=class extends ki{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=ui,this.minFilter=ui,this.wrapR=ts,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},pi=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let c=n[i+0],l=n[i+1],u=n[i+2],h=n[i+3],f=r[o+0],d=r[o+1],g=r[o+2],_=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=f,e[t+1]=d,e[t+2]=g,e[t+3]=_;return}if(h!==_||c!==f||l!==d||u!==g){let m=1-a,p=c*f+l*d+u*g+h*_,v=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){let P=Math.sqrt(x),w=Math.atan2(P,p*v);m=Math.sin(m*w)/P,a=Math.sin(a*w)/P}let b=a*v;if(c=c*m+f*b,l=l*m+d*b,u=u*m+g*b,h=h*m+_*b,m===1-a){let P=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=P,l*=P,u*=P,h*=P}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,r,o){let a=n[i],c=n[i+1],l=n[i+2],u=n[i+3],h=r[o],f=r[o+1],d=r[o+2],g=r[o+3];return e[t]=a*g+u*h+c*d-l*f,e[t+1]=c*g+u*f+l*h-a*d,e[t+2]=l*g+u*d+a*f-c*h,e[t+3]=u*g-a*h-c*f-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(i/2),h=a(r/2),f=c(n/2),d=c(i/2),g=c(r/2);switch(o){case"XYZ":this._x=f*u*h+l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h-f*d*g;break;case"YXZ":this._x=f*u*h+l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h+f*d*g;break;case"ZXY":this._x=f*u*h-l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h-f*d*g;break;case"ZYX":this._x=f*u*h-l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h+f*d*g;break;case"YZX":this._x=f*u*h+l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h-f*d*g;break;case"XZY":this._x=f*u*h-l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],h=t[10],f=n+a+h;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-c)*d,this._y=(r-l)*d,this._z=(o-i)*d}else if(n>a&&n>h){let d=2*Math.sqrt(1+n-a-h);this._w=(u-c)/d,this._x=.25*d,this._y=(i+o)/d,this._z=(r+l)/d}else if(a>h){let d=2*Math.sqrt(1+a-n-h);this._w=(r-l)/d,this._x=(i+o)/d,this._y=.25*d,this._z=(c+u)/d}else{let d=2*Math.sqrt(1+h-n-a);this._w=(o-i)/d,this._x=(r+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ri(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+o*a+i*l-r*c,this._y=i*u+o*c+r*a-n*l,this._z=r*u+o*l+n*c-i*a,this._w=o*u-n*a-i*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,r=this._z,o=this._w,a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let d=1-t;return this._w=d*o+t*this._w,this._x=d*n+t*this._x,this._y=d*i+t*this._y,this._z=d*r+t*this._z,this.normalize(),this}let l=Math.sqrt(c),u=Math.atan2(l,a),h=Math.sin((1-t)*u)/l,f=Math.sin(t*u)/l;return this._w=o*h+this._w*f,this._x=n*h+this._x*f,this._y=i*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(r),n*Math.cos(r),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},T=class s{constructor(e=0,t=0,n=0){s.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Hp.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Hp.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*i-a*n),u=2*(a*t-r*i),h=2*(r*n-o*t);return this.x=t+c*l+o*h-a*u,this.y=n+c*u+a*l-r*h,this.z=i+c*h+r*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=i*c-r*a,this.y=r*o-n*c,this.z=n*a-i*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Yu.copy(this).projectOnVector(e),this.sub(Yu)}reflect(e){return this.sub(Yu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ri(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Yu=new T,Hp=new pi,on=class{constructor(e=new T(1/0,1/0,1/0),t=new T(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ms.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ms.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Ms.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Ms):Ms.fromBufferAttribute(r,o),Ms.applyMatrix4(e.matrixWorld),this.expandByPoint(Ms);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Rc.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Rc.copy(n.boundingBox)),Rc.applyMatrix4(e.matrixWorld),this.union(Rc)}let i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Ms),Ms.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ta),Cc.subVectors(this.max,Ta),vo.subVectors(e.a,Ta),bo.subVectors(e.b,Ta),Mo.subVectors(e.c,Ta),dr.subVectors(bo,vo),pr.subVectors(Mo,bo),Xr.subVectors(vo,Mo);let t=[0,-dr.z,dr.y,0,-pr.z,pr.y,0,-Xr.z,Xr.y,dr.z,0,-dr.x,pr.z,0,-pr.x,Xr.z,0,-Xr.x,-dr.y,dr.x,0,-pr.y,pr.x,0,-Xr.y,Xr.x,0];return!ju(t,vo,bo,Mo,Cc)||(t=[1,0,0,0,1,0,0,0,1],!ju(t,vo,bo,Mo,Cc))?!1:(Pc.crossVectors(dr,pr),t=[Pc.x,Pc.y,Pc.z],ju(t,vo,bo,Mo,Cc))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ms).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ms).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Zs[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Zs[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Zs[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Zs[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Zs[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Zs[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Zs[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Zs[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Zs),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Zs=[new T,new T,new T,new T,new T,new T,new T,new T],Ms=new T,Rc=new on,vo=new T,bo=new T,Mo=new T,dr=new T,pr=new T,Xr=new T,Ta=new T,Cc=new T,Pc=new T,qr=new T;Vy=new on,wa=new T,Zu=new T,ei=class{constructor(e=new T,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Vy.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;wa.subVectors(e,this.center);let t=wa.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(wa,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Zu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(wa.copy(e.center).add(Zu)),this.expandByPoint(wa.copy(e.center).sub(Zu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Ks=new T,Ku=new T,Ic=new T,mr=new T,Ju=new T,Lc=new T,$u=new T,nr=class{constructor(e=new T,t=new T(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ks)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Ks.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ks.copy(this.origin).addScaledVector(this.direction,t),Ks.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Ku.copy(e).add(t).multiplyScalar(.5),Ic.copy(t).sub(e).normalize(),mr.copy(this.origin).sub(Ku);let r=e.distanceTo(t)*.5,o=-this.direction.dot(Ic),a=mr.dot(this.direction),c=-mr.dot(Ic),l=mr.lengthSq(),u=Math.abs(1-o*o),h,f,d,g;if(u>0)if(h=o*c-a,f=o*a-c,g=r*u,h>=0)if(f>=-g)if(f<=g){let _=1/u;h*=_,f*=_,d=h*(h+o*f+2*a)+f*(o*h+f+2*c)+l}else f=r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;else f=-r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;else f<=-g?(h=Math.max(0,-(-o*r+a)),f=h>0?-r:Math.min(Math.max(-r,-c),r),d=-h*h+f*(f+2*c)+l):f<=g?(h=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(h=Math.max(0,-(o*r+a)),f=h>0?r:Math.min(Math.max(-r,-c),r),d=-h*h+f*(f+2*c)+l);else f=o>0?-r:r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(Ku).addScaledVector(Ic,f),d}intersectSphere(e,t){Ks.subVectors(e.center,this.origin);let n=Ks.dot(this.direction),i=Ks.dot(Ks)-n*n,r=e.radius*e.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,c,l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,i=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,i=(e.min.x-f.x)*l),u>=0?(r=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),h>=0?(a=(e.min.z-f.z)*h,c=(e.max.z-f.z)*h):(a=(e.max.z-f.z)*h,c=(e.min.z-f.z)*h),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Ks)!==null}intersectTriangle(e,t,n,i,r){Ju.subVectors(t,e),Lc.subVectors(n,e),$u.crossVectors(Ju,Lc);let o=this.direction.dot($u),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;mr.subVectors(this.origin,e);let c=a*this.direction.dot(Lc.crossVectors(mr,Lc));if(c<0)return null;let l=a*this.direction.dot(Ju.cross(mr));if(l<0||c+l>o)return null;let u=-a*mr.dot($u);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},bt=class s{constructor(e,t,n,i,r,o,a,c,l,u,h,f,d,g,_,m){s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,c,l,u,h,f,d,g,_,m)}set(e,t,n,i,r,o,a,c,l,u,h,f,d,g,_,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=u,p[10]=h,p[14]=f,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/Eo.setFromMatrixColumn(e,0).length(),r=1/Eo.setFromMatrixColumn(e,1).length(),o=1/Eo.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){let f=o*u,d=o*h,g=a*u,_=a*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=d+g*l,t[5]=f-_*l,t[9]=-a*c,t[2]=_-f*l,t[6]=g+d*l,t[10]=o*c}else if(e.order==="YXZ"){let f=c*u,d=c*h,g=l*u,_=l*h;t[0]=f+_*a,t[4]=g*a-d,t[8]=o*l,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=d*a-g,t[6]=_+f*a,t[10]=o*c}else if(e.order==="ZXY"){let f=c*u,d=c*h,g=l*u,_=l*h;t[0]=f-_*a,t[4]=-o*h,t[8]=g+d*a,t[1]=d+g*a,t[5]=o*u,t[9]=_-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let f=o*u,d=o*h,g=a*u,_=a*h;t[0]=c*u,t[4]=g*l-d,t[8]=f*l+_,t[1]=c*h,t[5]=_*l+f,t[9]=d*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let f=o*c,d=o*l,g=a*c,_=a*l;t[0]=c*u,t[4]=_-f*h,t[8]=g*h+d,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=d*h+g,t[10]=f-_*h}else if(e.order==="XZY"){let f=o*c,d=o*l,g=a*c,_=a*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=f*h+_,t[5]=o*u,t[9]=d*h-g,t[2]=g*h-d,t[6]=a*u,t[10]=_*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Gy,e,Wy)}lookAt(e,t,n){let i=this.elements;return $i.subVectors(e,t),$i.lengthSq()===0&&($i.z=1),$i.normalize(),gr.crossVectors(n,$i),gr.lengthSq()===0&&(Math.abs(n.z)===1?$i.x+=1e-4:$i.z+=1e-4,$i.normalize(),gr.crossVectors(n,$i)),gr.normalize(),Nc.crossVectors($i,gr),i[0]=gr.x,i[4]=Nc.x,i[8]=$i.x,i[1]=gr.y,i[5]=Nc.y,i[9]=$i.y,i[2]=gr.z,i[6]=Nc.z,i[10]=$i.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],h=n[5],f=n[9],d=n[13],g=n[2],_=n[6],m=n[10],p=n[14],v=n[3],x=n[7],b=n[11],P=n[15],w=i[0],C=i[4],H=i[8],M=i[12],R=i[1],V=i[5],F=i[9],le=i[13],I=i[2],X=i[6],ce=i[10],ne=i[14],ie=i[3],ye=i[7],Pe=i[11],_e=i[15];return r[0]=o*w+a*R+c*I+l*ie,r[4]=o*C+a*V+c*X+l*ye,r[8]=o*H+a*F+c*ce+l*Pe,r[12]=o*M+a*le+c*ne+l*_e,r[1]=u*w+h*R+f*I+d*ie,r[5]=u*C+h*V+f*X+d*ye,r[9]=u*H+h*F+f*ce+d*Pe,r[13]=u*M+h*le+f*ne+d*_e,r[2]=g*w+_*R+m*I+p*ie,r[6]=g*C+_*V+m*X+p*ye,r[10]=g*H+_*F+m*ce+p*Pe,r[14]=g*M+_*le+m*ne+p*_e,r[3]=v*w+x*R+b*I+P*ie,r[7]=v*C+x*V+b*X+P*ye,r[11]=v*H+x*F+b*ce+P*Pe,r[15]=v*M+x*le+b*ne+P*_e,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],h=e[6],f=e[10],d=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*c*h-i*l*h-r*a*f+n*l*f+i*a*d-n*c*d)+_*(+t*c*d-t*l*f+r*o*f-i*o*d+i*l*u-r*c*u)+m*(+t*l*h-t*a*d-r*o*h+n*o*d+r*a*u-n*l*u)+p*(-i*a*u-t*c*h+t*a*f+i*o*h-n*o*f+n*c*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],h=e[9],f=e[10],d=e[11],g=e[12],_=e[13],m=e[14],p=e[15],v=h*m*l-_*f*l+_*c*d-a*m*d-h*c*p+a*f*p,x=g*f*l-u*m*l-g*c*d+o*m*d+u*c*p-o*f*p,b=u*_*l-g*h*l+g*a*d-o*_*d-u*a*p+o*h*p,P=g*h*c-u*_*c-g*a*f+o*_*f+u*a*m-o*h*m,w=t*v+n*x+i*b+r*P;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let C=1/w;return e[0]=v*C,e[1]=(_*f*r-h*m*r-_*i*d+n*m*d+h*i*p-n*f*p)*C,e[2]=(a*m*r-_*c*r+_*i*l-n*m*l-a*i*p+n*c*p)*C,e[3]=(h*c*r-a*f*r-h*i*l+n*f*l+a*i*d-n*c*d)*C,e[4]=x*C,e[5]=(u*m*r-g*f*r+g*i*d-t*m*d-u*i*p+t*f*p)*C,e[6]=(g*c*r-o*m*r-g*i*l+t*m*l+o*i*p-t*c*p)*C,e[7]=(o*f*r-u*c*r+u*i*l-t*f*l-o*i*d+t*c*d)*C,e[8]=b*C,e[9]=(g*h*r-u*_*r-g*n*d+t*_*d+u*n*p-t*h*p)*C,e[10]=(o*_*r-g*a*r+g*n*l-t*_*l-o*n*p+t*a*p)*C,e[11]=(u*a*r-o*h*r-u*n*l+t*h*l+o*n*d-t*a*d)*C,e[12]=P*C,e[13]=(u*_*i-g*h*i+g*n*f-t*_*f-u*n*m+t*h*m)*C,e[14]=(g*a*i-o*_*i-g*n*c+t*_*c+o*n*m-t*a*m)*C,e[15]=(o*h*i-u*a*i+u*n*c-t*h*c-o*n*f+t*a*f)*C,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,u=r*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,u*a+n,u*c-i*o,0,l*c-i*a,u*c+i*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,u=o+o,h=a+a,f=r*l,d=r*u,g=r*h,_=o*u,m=o*h,p=a*h,v=c*l,x=c*u,b=c*h,P=n.x,w=n.y,C=n.z;return i[0]=(1-(_+p))*P,i[1]=(d+b)*P,i[2]=(g-x)*P,i[3]=0,i[4]=(d-b)*w,i[5]=(1-(f+p))*w,i[6]=(m+v)*w,i[7]=0,i[8]=(g+x)*C,i[9]=(m-v)*C,i[10]=(1-(f+_))*C,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,r=Eo.set(i[0],i[1],i[2]).length(),o=Eo.set(i[4],i[5],i[6]).length(),a=Eo.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],Es.copy(this);let l=1/r,u=1/o,h=1/a;return Es.elements[0]*=l,Es.elements[1]*=l,Es.elements[2]*=l,Es.elements[4]*=u,Es.elements[5]*=u,Es.elements[6]*=u,Es.elements[8]*=h,Es.elements[9]*=h,Es.elements[10]*=h,t.setFromRotationMatrix(Es),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o,a=Bs){let c=this.elements,l=2*r/(t-e),u=2*r/(n-i),h=(t+e)/(t-e),f=(n+i)/(n-i),d,g;if(a===Bs)d=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Ha)d=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=Bs){let c=this.elements,l=1/(t-e),u=1/(n-i),h=1/(o-r),f=(t+e)*l,d=(n+i)*u,g,_;if(a===Bs)g=(o+r)*h,_=-2*h;else if(a===Ha)g=r*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Eo=new T,Es=new bt,Gy=new T(0,0,0),Wy=new T(1,1,1),gr=new T,Nc=new T,$i=new T,Vp=new bt,Gp=new pi,Yo=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],o=i[4],a=i[8],c=i[1],l=i[5],u=i[9],h=i[2],f=i[6],d=i[10];switch(t){case"XYZ":this._y=Math.asin(ri(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ri(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(ri(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ri(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(ri(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-ri(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Vp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Vp,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Gp.setFromEuler(this),this.setFromQuaternion(Gp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Yo.DEFAULT_ORDER="XYZ";Ga=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Xy=0,Wp=new T,So=new pi,Js=new bt,Dc=new T,Aa=new T,qy=new T,Yy=new pi,Xp=new T(1,0,0),qp=new T(0,1,0),Yp=new T(0,0,1),jy={type:"added"},Zy={type:"removed"},Yn=class s extends Tr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Xy++}),this.uuid=Ts(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new T,t=new Yo,n=new pi,i=new T(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new bt},normalMatrix:{value:new hn}}),this.matrix=new bt,this.matrixWorld=new bt,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ga,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return So.setFromAxisAngle(e,t),this.quaternion.multiply(So),this}rotateOnWorldAxis(e,t){return So.setFromAxisAngle(e,t),this.quaternion.premultiply(So),this}rotateX(e){return this.rotateOnAxis(Xp,e)}rotateY(e){return this.rotateOnAxis(qp,e)}rotateZ(e){return this.rotateOnAxis(Yp,e)}translateOnAxis(e,t){return Wp.copy(e).applyQuaternion(this.quaternion),this.position.add(Wp.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Xp,e)}translateY(e){return this.translateOnAxis(qp,e)}translateZ(e){return this.translateOnAxis(Yp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Js.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Dc.copy(e):Dc.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Aa.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Js.lookAt(Aa,Dc,this.up):Js.lookAt(Dc,Aa,this.up),this.quaternion.setFromRotationMatrix(Js),i&&(Js.extractRotation(i.matrixWorld),So.setFromRotationMatrix(Js),this.quaternion.premultiply(So.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(jy)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Zy)),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Js.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Js.multiply(e.parent.matrixWorld)),e.applyMatrix4(Js),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Aa,e,qy),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Aa,Yy,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++){let r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){let i=this.children;for(let r=0,o=i.length;r<o;r++){let a=i[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let h=c[l];r(e.shapes,h)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];i.animations.push(r(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),u=o(e.images),h=o(e.shapes),f=o(e.skeletons),d=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){let c=[];for(let l in a){let u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};Yn.DEFAULT_UP=new T(0,1,0);Yn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Yn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;Ss=new T,$s=new T,Qu=new T,Qs=new T,To=new T,wo=new T,jp=new T,eh=new T,th=new T,nh=new T,Uc=!1,is=class s{constructor(e=new T,t=new T,n=new T){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Ss.subVectors(e,t),i.cross(Ss);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Ss.subVectors(i,t),$s.subVectors(n,t),Qu.subVectors(e,t);let o=Ss.dot(Ss),a=Ss.dot($s),c=Ss.dot(Qu),l=$s.dot($s),u=$s.dot(Qu),h=o*l-a*a;if(h===0)return r.set(0,0,0),null;let f=1/h,d=(l*c-a*u)*f,g=(o*u-a*c)*f;return r.set(1-d-g,g,d)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Qs)===null?!1:Qs.x>=0&&Qs.y>=0&&Qs.x+Qs.y<=1}static getUV(e,t,n,i,r,o,a,c){return Uc===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Uc=!0),this.getInterpolation(e,t,n,i,r,o,a,c)}static getInterpolation(e,t,n,i,r,o,a,c){return this.getBarycoord(e,t,n,i,Qs)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Qs.x),c.addScaledVector(o,Qs.y),c.addScaledVector(a,Qs.z),c)}static isFrontFacing(e,t,n,i){return Ss.subVectors(n,t),$s.subVectors(e,t),Ss.cross($s).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ss.subVectors(this.c,this.b),$s.subVectors(this.a,this.b),Ss.cross($s).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,r){return Uc===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Uc=!0),s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,o,a;To.subVectors(i,n),wo.subVectors(r,n),eh.subVectors(e,n);let c=To.dot(eh),l=wo.dot(eh);if(c<=0&&l<=0)return t.copy(n);th.subVectors(e,i);let u=To.dot(th),h=wo.dot(th);if(u>=0&&h<=u)return t.copy(i);let f=c*h-u*l;if(f<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(n).addScaledVector(To,o);nh.subVectors(e,r);let d=To.dot(nh),g=wo.dot(nh);if(g>=0&&d<=g)return t.copy(r);let _=d*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(wo,a);let m=u*g-d*h;if(m<=0&&h-u>=0&&d-g>=0)return jp.subVectors(r,i),a=(h-u)/(h-u+(d-g)),t.copy(i).addScaledVector(jp,a);let p=1/(m+_+f);return o=_*p,a=f*p,t.copy(n).addScaledVector(To,o).addScaledVector(wo,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},a0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},xr={h:0,s:0,l:0},Fc={h:0,s:0,l:0};Pt=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Vn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,bn.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=bn.workingColorSpace){return this.r=e,this.g=t,this.b=n,bn.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=bn.workingColorSpace){if(e=mf(e,1),t=ri(t,0,1),n=ri(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=ih(o,r,e+1/3),this.g=ih(o,r,e),this.b=ih(o,r,e-1/3)}return bn.toWorkingColorSpace(this,i),this}setStyle(e,t=Vn){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Vn){let n=a0[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ko(e.r),this.g=ko(e.g),this.b=ko(e.b),this}copyLinearToSRGB(e){return this.r=Xu(e.r),this.g=Xu(e.g),this.b=Xu(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Vn){return bn.fromWorkingColorSpace(Fi.copy(this),e),Math.round(ri(Fi.r*255,0,255))*65536+Math.round(ri(Fi.g*255,0,255))*256+Math.round(ri(Fi.b*255,0,255))}getHexString(e=Vn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=bn.workingColorSpace){bn.fromWorkingColorSpace(Fi.copy(this),t);let n=Fi.r,i=Fi.g,r=Fi.b,o=Math.max(n,i,r),a=Math.min(n,i,r),c,l,u=(a+o)/2;if(a===o)c=0,l=0;else{let h=o-a;switch(l=u<=.5?h/(o+a):h/(2-o-a),o){case n:c=(i-r)/h+(i<r?6:0);break;case i:c=(r-n)/h+2;break;case r:c=(n-i)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=bn.workingColorSpace){return bn.fromWorkingColorSpace(Fi.copy(this),t),e.r=Fi.r,e.g=Fi.g,e.b=Fi.b,e}getStyle(e=Vn){bn.fromWorkingColorSpace(Fi.copy(this),e);let t=Fi.r,n=Fi.g,i=Fi.b;return e!==Vn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(xr),this.setHSL(xr.h+e,xr.s+t,xr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(xr),e.getHSL(Fc);let n=Ua(xr.h,Fc.h,t),i=Ua(xr.s,Fc.s,t),r=Ua(xr.l,Fc.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Fi=new Pt;Pt.NAMES=a0;Ky=0,ss=class extends Tr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ky++}),this.uuid=Ts(),this.name="",this.type="Material",this.blending=Oo,this.side=Wi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ho,this.blendDst=Mh,this.blendEquation=Ds,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Pt(0,0,0),this.blendAlpha=0,this.depthFunc=rl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Up,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=yo,this.stencilZFail=yo,this.stencilZPass=yo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Oo&&(n.blending=this.blending),this.side!==Wi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ho&&(n.blendSrc=this.blendSrc),this.blendDst!==Mh&&(n.blendDst=this.blendDst),this.blendEquation!==Ds&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==rl&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Up&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==yo&&(n.stencilFail=this.stencilFail),this.stencilZFail!==yo&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==yo&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(t){let r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Xi=class extends ss{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Pt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ym,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},si=new T,Bc=new tt,wn=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Th,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Fs,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Bc.fromBufferAttribute(this,t),Bc.applyMatrix3(e),this.setXY(t,Bc.x,Bc.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)si.fromBufferAttribute(this,t),si.applyMatrix3(e),this.setXYZ(t,si.x,si.y,si.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)si.fromBufferAttribute(this,t),si.applyMatrix4(e),this.setXYZ(t,si.x,si.y,si.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)si.fromBufferAttribute(this,t),si.applyNormalMatrix(e),this.setXYZ(t,si.x,si.y,si.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)si.fromBufferAttribute(this,t),si.transformDirection(e),this.setXYZ(t,si.x,si.y,si.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Us(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Pn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Us(t,this.array)),t}setX(e,t){return this.normalized&&(t=Pn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Us(t,this.array)),t}setY(e,t){return this.normalized&&(t=Pn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Us(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Pn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Us(t,this.array)),t}setW(e,t){return this.normalized&&(t=Pn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Pn(t,this.array),n=Pn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Pn(t,this.array),n=Pn(n,this.array),i=Pn(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=Pn(t,this.array),n=Pn(n,this.array),i=Pn(i,this.array),r=Pn(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Th&&(e.usage=this.usage),e}},jo=class extends wn{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Zo=class extends wn{constructor(e,t,n){super(new Uint32Array(e),t,n)}},fi=class extends wn{constructor(e,t,n){super(new Float32Array(e),t,n)}},Jy=0,hs=new bt,sh=new Yn,Ao=new T,Qi=new on,Ra=new on,Si=new T,wi=class s extends Tr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Jy++}),this.uuid=Ts(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(o0(e)?Zo:jo)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new hn().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return hs.makeRotationFromQuaternion(e),this.applyMatrix4(hs),this}rotateX(e){return hs.makeRotationX(e),this.applyMatrix4(hs),this}rotateY(e){return hs.makeRotationY(e),this.applyMatrix4(hs),this}rotateZ(e){return hs.makeRotationZ(e),this.applyMatrix4(hs),this}translate(e,t,n){return hs.makeTranslation(e,t,n),this.applyMatrix4(hs),this}scale(e,t,n){return hs.makeScale(e,t,n),this.applyMatrix4(hs),this}lookAt(e){return sh.lookAt(e),sh.updateMatrix(),this.applyMatrix4(sh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ao).negate(),this.translate(Ao.x,Ao.y,Ao.z),this}setFromPoints(e){let t=[];for(let n=0,i=e.length;n<i;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new fi(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new on);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new T(-1/0,-1/0,-1/0),new T(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];Qi.setFromBufferAttribute(r),this.morphTargetsRelative?(Si.addVectors(this.boundingBox.min,Qi.min),this.boundingBox.expandByPoint(Si),Si.addVectors(this.boundingBox.max,Qi.max),this.boundingBox.expandByPoint(Si)):(this.boundingBox.expandByPoint(Qi.min),this.boundingBox.expandByPoint(Qi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ei);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new T,1/0);return}if(e){let n=this.boundingSphere.center;if(Qi.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];Ra.setFromBufferAttribute(a),this.morphTargetsRelative?(Si.addVectors(Qi.min,Ra.min),Qi.expandByPoint(Si),Si.addVectors(Qi.max,Ra.max),Qi.expandByPoint(Si)):(Qi.expandByPoint(Ra.min),Qi.expandByPoint(Ra.max))}Qi.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)Si.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Si));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Si.fromBufferAttribute(a,l),c&&(Ao.fromBufferAttribute(e,l),Si.add(Ao)),i=Math.max(i,n.distanceToSquared(Si))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.array,i=t.position.array,r=t.normal.array,o=t.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new wn(new Float32Array(4*a),4));let c=this.getAttribute("tangent").array,l=[],u=[];for(let R=0;R<a;R++)l[R]=new T,u[R]=new T;let h=new T,f=new T,d=new T,g=new tt,_=new tt,m=new tt,p=new T,v=new T;function x(R,V,F){h.fromArray(i,R*3),f.fromArray(i,V*3),d.fromArray(i,F*3),g.fromArray(o,R*2),_.fromArray(o,V*2),m.fromArray(o,F*2),f.sub(h),d.sub(h),_.sub(g),m.sub(g);let le=1/(_.x*m.y-m.x*_.y);isFinite(le)&&(p.copy(f).multiplyScalar(m.y).addScaledVector(d,-_.y).multiplyScalar(le),v.copy(d).multiplyScalar(_.x).addScaledVector(f,-m.x).multiplyScalar(le),l[R].add(p),l[V].add(p),l[F].add(p),u[R].add(v),u[V].add(v),u[F].add(v))}let b=this.groups;b.length===0&&(b=[{start:0,count:n.length}]);for(let R=0,V=b.length;R<V;++R){let F=b[R],le=F.start,I=F.count;for(let X=le,ce=le+I;X<ce;X+=3)x(n[X+0],n[X+1],n[X+2])}let P=new T,w=new T,C=new T,H=new T;function M(R){C.fromArray(r,R*3),H.copy(C);let V=l[R];P.copy(V),P.sub(C.multiplyScalar(C.dot(V))).normalize(),w.crossVectors(H,V);let le=w.dot(u[R])<0?-1:1;c[R*4]=P.x,c[R*4+1]=P.y,c[R*4+2]=P.z,c[R*4+3]=le}for(let R=0,V=b.length;R<V;++R){let F=b[R],le=F.start,I=F.count;for(let X=le,ce=le+I;X<ce;X+=3)M(n[X+0]),M(n[X+1]),M(n[X+2])}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new wn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let i=new T,r=new T,o=new T,a=new T,c=new T,l=new T,u=new T,h=new T;if(e)for(let f=0,d=e.count;f<d;f+=3){let g=e.getX(f+0),_=e.getX(f+1),m=e.getX(f+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),u.subVectors(o,r),h.subVectors(i,r),u.cross(h),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=t.count;f<d;f+=3)i.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,r),h.subVectors(i,r),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Si.fromBufferAttribute(e,t),Si.normalize(),e.setXYZ(t,Si.x,Si.y,Si.z)}toNonIndexed(){function e(a,c){let l=a.array,u=a.itemSize,h=a.normalized,f=new l.constructor(c.length*u),d=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?d=c[_]*a.data.stride+a.offset:d=c[_]*u;for(let p=0;p<u;p++)f[g++]=l[d++]}return new wn(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let a in i){let c=i[a],l=e(c,n);t.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let u=0,h=l.length;u<h;u++){let f=l[u],d=e(f,n);c.push(d)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let h=0,f=l.length;h<f;h++){let d=l[h];u.push(d.toJSON(e.data))}u.length>0&&(i[c]=u,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let i=e.attributes;for(let l in i){let u=i[l];this.setAttribute(l,u.clone(t))}let r=e.morphAttributes;for(let l in r){let u=[],h=r[l];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,u=o.length;l<u;l++){let h=o[l];this.addGroup(h.start,h.count,h.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Zp=new bt,Yr=new nr,Oc=new ei,Kp=new T,Ro=new T,Co=new T,Po=new T,rh=new T,kc=new T,zc=new tt,Hc=new tt,Vc=new tt,Jp=new T,$p=new T,Qp=new T,Gc=new T,Wc=new T,Mn=class extends Yn{constructor(e=new wi,t=new Xi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let a=this.morphTargetInfluences;if(r&&a){kc.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let u=a[c],h=r[c];u!==0&&(rh.fromBufferAttribute(h,e),o?kc.addScaledVector(rh,u):kc.addScaledVector(rh.sub(t),u))}t.add(kc)}return t}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Oc.copy(n.boundingSphere),Oc.applyMatrix4(r),Yr.copy(e.ray).recast(e.near),!(Oc.containsPoint(Yr.origin)===!1&&(Yr.intersectSphere(Oc,Kp)===null||Yr.origin.distanceToSquared(Kp)>(e.far-e.near)**2))&&(Zp.copy(r).invert(),Yr.copy(e.ray).applyMatrix4(Zp),!(n.boundingBox!==null&&Yr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Yr)))}_computeIntersections(e,t,n){let i,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){let m=f[g],p=o[m.materialIndex],v=Math.max(m.start,d.start),x=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let b=v,P=x;b<P;b+=3){let w=a.getX(b),C=a.getX(b+1),H=a.getX(b+2);i=Xc(this,p,e,n,l,u,h,w,C,H),i&&(i.faceIndex=Math.floor(b/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){let v=a.getX(m),x=a.getX(m+1),b=a.getX(m+2);i=Xc(this,o,e,n,l,u,h,v,x,b),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){let m=f[g],p=o[m.materialIndex],v=Math.max(m.start,d.start),x=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let b=v,P=x;b<P;b+=3){let w=b,C=b+1,H=b+2;i=Xc(this,p,e,n,l,u,h,w,C,H),i&&(i.faceIndex=Math.floor(b/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{let g=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){let v=m,x=m+1,b=m+2;i=Xc(this,o,e,n,l,u,h,v,x,b),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}};Wa=class s extends wi{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],u=[],h=[],f=0,d=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,i,o,2),g("x","z","y",1,-1,e,n,-t,i,o,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new fi(l,3)),this.setAttribute("normal",new fi(u,3)),this.setAttribute("uv",new fi(h,2));function g(_,m,p,v,x,b,P,w,C,H,M){let R=b/C,V=P/H,F=b/2,le=P/2,I=w/2,X=C+1,ce=H+1,ne=0,ie=0,ye=new T;for(let Pe=0;Pe<ce;Pe++){let _e=Pe*V-le;for(let st=0;st<X;st++){let ee=st*R-F;ye[_]=ee*v,ye[m]=_e*x,ye[p]=I,l.push(ye.x,ye.y,ye.z),ye[_]=0,ye[m]=0,ye[p]=w>0?1:-1,u.push(ye.x,ye.y,ye.z),h.push(st/C),h.push(1-Pe/H),ne+=1}}for(let Pe=0;Pe<H;Pe++)for(let _e=0;_e<C;_e++){let st=f+_e+X*Pe,ee=f+_e+X*(Pe+1),Ne=f+(_e+1)+X*(Pe+1),Ge=f+(_e+1)+X*Pe;c.push(st,ee,Ge),c.push(ee,Ne,Ge),ie+=6}a.addGroup(d,ie,M),d+=ie,f+=ne}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};e_={clone:Ko,merge:Vi},t_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,n_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,qi=class extends ss{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=t_,this.fragmentShader=n_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ko(e.uniforms),this.uniformsGroups=Qy(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},pl=class extends Yn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new bt,this.projectionMatrix=new bt,this.projectionMatrixInverse=new bt,this.coordinateSystem=Bs}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},hi=class extends pl{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=qo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Da*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return qo*2*Math.atan(Math.tan(Da*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Da*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*i/c,t-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Io=-90,Lo=1,Ph=class extends Yn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new hi(Io,Lo,e,t);i.layers=this.layers,this.add(i);let r=new hi(Io,Lo,e,t);r.layers=this.layers,this.add(r);let o=new hi(Io,Lo,e,t);o.layers=this.layers,this.add(o);let a=new hi(Io,Lo,e,t);a.layers=this.layers,this.add(a);let c=new hi(Io,Lo,e,t);c.layers=this.layers,this.add(c);let l=new hi(Io,Lo,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,c]=t;for(let l of t)this.remove(l);if(e===Bs)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ha)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(h,f,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},ml=class extends ki{constructor(e,t,n,i,r,o,a,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:Vo,super(e,t,n,i,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Ih=class extends ds{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];t.encoding!==void 0&&(Fa("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===eo?Vn:fs),this.texture=new ml(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Gi}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Wa(5,5,5),r=new qi({name:"CubemapFromEquirect",uniforms:Ko(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Oi,blending:br});r.uniforms.tEquirect.value=t;let o=new Mn(i,r),a=t.minFilter;return t.minFilter===Sr&&(t.minFilter=Gi),new Ph(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}},oh=new T,i_=new T,s_=new hn,es=class{constructor(e=new T(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=oh.subVectors(n,t).cross(i_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(oh),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||s_.getNormalMatrix(e),i=this.coplanarPoint(oh).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},jr=new ei,qc=new T,wr=class{constructor(e=new es,t=new es,n=new es,i=new es,r=new es,o=new es){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Bs){let n=this.planes,i=e.elements,r=i[0],o=i[1],a=i[2],c=i[3],l=i[4],u=i[5],h=i[6],f=i[7],d=i[8],g=i[9],_=i[10],m=i[11],p=i[12],v=i[13],x=i[14],b=i[15];if(n[0].setComponents(c-r,f-l,m-d,b-p).normalize(),n[1].setComponents(c+r,f+l,m+d,b+p).normalize(),n[2].setComponents(c+o,f+u,m+g,b+v).normalize(),n[3].setComponents(c-o,f-u,m-g,b-v).normalize(),n[4].setComponents(c-a,f-h,m-_,b-x).normalize(),t===Bs)n[5].setComponents(c+a,f+h,m+_,b+x).normalize();else if(t===Ha)n[5].setComponents(a,h,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),jr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),jr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(jr)}intersectsSprite(e){return jr.center.set(0,0,0),jr.radius=.7071067811865476,jr.applyMatrix4(e.matrixWorld),this.intersectsSphere(jr)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(qc.x=i.normal.x>0?e.max.x:e.min.x,qc.y=i.normal.y>0?e.max.y:e.min.y,qc.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(qc)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};so=class s extends wi{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(i),l=a+1,u=c+1,h=e/a,f=t/c,d=[],g=[],_=[],m=[];for(let p=0;p<u;p++){let v=p*f-o;for(let x=0;x<l;x++){let b=x*h-r;g.push(b,-v,0),_.push(0,0,1),m.push(x/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let v=0;v<a;v++){let x=v+l*p,b=v+l*(p+1),P=v+1+l*(p+1),w=v+1+l*p;d.push(x,b,w),d.push(b,P,w)}this.setIndex(d),this.setAttribute("position",new fi(g,3)),this.setAttribute("normal",new fi(_,3)),this.setAttribute("uv",new fi(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}},o_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,a_=`#ifdef USE_ALPHAHASH
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
#endif`,c_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,l_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,u_=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,h_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,f_=`#ifdef USE_AOMAP
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
#endif`,d_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,p_=`#ifdef USE_BATCHING
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
#endif`,m_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,g_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,x_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,y_=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,__=`#ifdef USE_IRIDESCENCE
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
#endif`,v_=`#ifdef USE_BUMPMAP
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
#endif`,b_=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,M_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,E_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,S_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,T_=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,w_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,A_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,R_=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,C_=`#define PI 3.141592653589793
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
} // validated`,P_=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,I_=`vec3 transformedNormal = objectNormal;
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
#endif`,L_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,N_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,D_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,U_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,F_="gl_FragColor = linearToOutputTexel( gl_FragColor );",B_=`
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
}`,O_=`#ifdef USE_ENVMAP
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
#endif`,k_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,z_=`#ifdef USE_ENVMAP
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
#endif`,H_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,V_=`#ifdef USE_ENVMAP
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
#endif`,G_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,W_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,X_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,q_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Y_=`#ifdef USE_GRADIENTMAP
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
}`,j_=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Z_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,K_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,J_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$_=`uniform bool receiveShadow;
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
#endif`,Q_=`#ifdef USE_ENVMAP
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
#endif`,ev=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,tv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,nv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,iv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,sv=`PhysicalMaterial material;
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
#endif`,rv=`struct PhysicalMaterial {
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
}`,ov=`
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
#endif`,av=`#if defined( RE_IndirectDiffuse )
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
#endif`,cv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lv=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,uv=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,hv=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,fv=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,dv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,pv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,mv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,gv=`#if defined( USE_POINTS_UV )
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
#endif`,xv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,yv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,_v=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,vv=`#ifdef USE_MORPHNORMALS
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
#endif`,bv=`#ifdef USE_MORPHTARGETS
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
#endif`,Mv=`#ifdef USE_MORPHTARGETS
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
#endif`,Ev=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Sv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Tv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Av=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Rv=`#ifdef USE_NORMALMAP
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
#endif`,Cv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Pv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Iv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Lv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Nv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Dv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Uv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Fv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Bv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ov=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,kv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,zv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Hv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Vv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Gv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Wv=`float getShadowMask() {
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
}`,Xv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,qv=`#ifdef USE_SKINNING
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
#endif`,Yv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,jv=`#ifdef USE_SKINNING
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
#endif`,Zv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Kv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Jv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,$v=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Qv=`#ifdef USE_TRANSMISSION
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
#endif`,eb=`#ifdef USE_TRANSMISSION
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
#endif`,tb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,nb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ib=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,rb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ob=`uniform sampler2D t2D;
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
}`,ab=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cb=`#ifdef ENVMAP_TYPE_CUBE
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
}`,lb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ub=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hb=`#include <common>
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
}`,fb=`#if DEPTH_PACKING == 3200
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
}`,db=`#define DISTANCE
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
}`,pb=`#define DISTANCE
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
}`,mb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,gb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xb=`uniform float scale;
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
}`,yb=`uniform vec3 diffuse;
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
}`,_b=`#include <common>
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
}`,vb=`uniform vec3 diffuse;
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
}`,bb=`#define LAMBERT
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
}`,Mb=`#define LAMBERT
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
}`,Eb=`#define MATCAP
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
}`,Sb=`#define MATCAP
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
}`,Tb=`#define NORMAL
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
}`,wb=`#define NORMAL
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
}`,Ab=`#define PHONG
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
}`,Rb=`#define PHONG
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
}`,Cb=`#define STANDARD
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
}`,Pb=`#define STANDARD
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
}`,Ib=`#define TOON
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
}`,Lb=`#define TOON
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
}`,Nb=`uniform float size;
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
}`,Db=`uniform vec3 diffuse;
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
}`,Ub=`#include <common>
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
}`,Fb=`uniform vec3 color;
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
}`,Bb=`uniform float rotation;
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
}`,Ob=`uniform vec3 diffuse;
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
}`,un={alphahash_fragment:o_,alphahash_pars_fragment:a_,alphamap_fragment:c_,alphamap_pars_fragment:l_,alphatest_fragment:u_,alphatest_pars_fragment:h_,aomap_fragment:f_,aomap_pars_fragment:d_,batching_pars_vertex:p_,batching_vertex:m_,begin_vertex:g_,beginnormal_vertex:x_,bsdfs:y_,iridescence_fragment:__,bumpmap_pars_fragment:v_,clipping_planes_fragment:b_,clipping_planes_pars_fragment:M_,clipping_planes_pars_vertex:E_,clipping_planes_vertex:S_,color_fragment:T_,color_pars_fragment:w_,color_pars_vertex:A_,color_vertex:R_,common:C_,cube_uv_reflection_fragment:P_,defaultnormal_vertex:I_,displacementmap_pars_vertex:L_,displacementmap_vertex:N_,emissivemap_fragment:D_,emissivemap_pars_fragment:U_,colorspace_fragment:F_,colorspace_pars_fragment:B_,envmap_fragment:O_,envmap_common_pars_fragment:k_,envmap_pars_fragment:z_,envmap_pars_vertex:H_,envmap_physical_pars_fragment:Q_,envmap_vertex:V_,fog_vertex:G_,fog_pars_vertex:W_,fog_fragment:X_,fog_pars_fragment:q_,gradientmap_pars_fragment:Y_,lightmap_fragment:j_,lightmap_pars_fragment:Z_,lights_lambert_fragment:K_,lights_lambert_pars_fragment:J_,lights_pars_begin:$_,lights_toon_fragment:ev,lights_toon_pars_fragment:tv,lights_phong_fragment:nv,lights_phong_pars_fragment:iv,lights_physical_fragment:sv,lights_physical_pars_fragment:rv,lights_fragment_begin:ov,lights_fragment_maps:av,lights_fragment_end:cv,logdepthbuf_fragment:lv,logdepthbuf_pars_fragment:uv,logdepthbuf_pars_vertex:hv,logdepthbuf_vertex:fv,map_fragment:dv,map_pars_fragment:pv,map_particle_fragment:mv,map_particle_pars_fragment:gv,metalnessmap_fragment:xv,metalnessmap_pars_fragment:yv,morphcolor_vertex:_v,morphnormal_vertex:vv,morphtarget_pars_vertex:bv,morphtarget_vertex:Mv,normal_fragment_begin:Ev,normal_fragment_maps:Sv,normal_pars_fragment:Tv,normal_pars_vertex:wv,normal_vertex:Av,normalmap_pars_fragment:Rv,clearcoat_normal_fragment_begin:Cv,clearcoat_normal_fragment_maps:Pv,clearcoat_pars_fragment:Iv,iridescence_pars_fragment:Lv,opaque_fragment:Nv,packing:Dv,premultiplied_alpha_fragment:Uv,project_vertex:Fv,dithering_fragment:Bv,dithering_pars_fragment:Ov,roughnessmap_fragment:kv,roughnessmap_pars_fragment:zv,shadowmap_pars_fragment:Hv,shadowmap_pars_vertex:Vv,shadowmap_vertex:Gv,shadowmask_pars_fragment:Wv,skinbase_vertex:Xv,skinning_pars_vertex:qv,skinning_vertex:Yv,skinnormal_vertex:jv,specularmap_fragment:Zv,specularmap_pars_fragment:Kv,tonemapping_fragment:Jv,tonemapping_pars_fragment:$v,transmission_fragment:Qv,transmission_pars_fragment:eb,uv_pars_fragment:tb,uv_pars_vertex:nb,uv_vertex:ib,worldpos_vertex:sb,background_vert:rb,background_frag:ob,backgroundCube_vert:ab,backgroundCube_frag:cb,cube_vert:lb,cube_frag:ub,depth_vert:hb,depth_frag:fb,distanceRGBA_vert:db,distanceRGBA_frag:pb,equirect_vert:mb,equirect_frag:gb,linedashed_vert:xb,linedashed_frag:yb,meshbasic_vert:_b,meshbasic_frag:vb,meshlambert_vert:bb,meshlambert_frag:Mb,meshmatcap_vert:Eb,meshmatcap_frag:Sb,meshnormal_vert:Tb,meshnormal_frag:wb,meshphong_vert:Ab,meshphong_frag:Rb,meshphysical_vert:Cb,meshphysical_frag:Pb,meshtoon_vert:Ib,meshtoon_frag:Lb,points_vert:Nb,points_frag:Db,shadow_vert:Ub,shadow_frag:Fb,sprite_vert:Bb,sprite_frag:Ob},Ye={common:{diffuse:{value:new Pt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new hn},alphaMap:{value:null},alphaMapTransform:{value:new hn},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new hn}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new hn}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new hn}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new hn},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new hn},normalScale:{value:new tt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new hn},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new hn}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new hn}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new hn}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Pt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Pt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new hn},alphaTest:{value:0},uvTransform:{value:new hn}},sprite:{diffuse:{value:new Pt(16777215)},opacity:{value:1},center:{value:new tt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new hn},alphaMap:{value:null},alphaMapTransform:{value:new hn},alphaTest:{value:0}}},Ns={basic:{uniforms:Vi([Ye.common,Ye.specularmap,Ye.envmap,Ye.aomap,Ye.lightmap,Ye.fog]),vertexShader:un.meshbasic_vert,fragmentShader:un.meshbasic_frag},lambert:{uniforms:Vi([Ye.common,Ye.specularmap,Ye.envmap,Ye.aomap,Ye.lightmap,Ye.emissivemap,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.fog,Ye.lights,{emissive:{value:new Pt(0)}}]),vertexShader:un.meshlambert_vert,fragmentShader:un.meshlambert_frag},phong:{uniforms:Vi([Ye.common,Ye.specularmap,Ye.envmap,Ye.aomap,Ye.lightmap,Ye.emissivemap,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.fog,Ye.lights,{emissive:{value:new Pt(0)},specular:{value:new Pt(1118481)},shininess:{value:30}}]),vertexShader:un.meshphong_vert,fragmentShader:un.meshphong_frag},standard:{uniforms:Vi([Ye.common,Ye.envmap,Ye.aomap,Ye.lightmap,Ye.emissivemap,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.roughnessmap,Ye.metalnessmap,Ye.fog,Ye.lights,{emissive:{value:new Pt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:un.meshphysical_vert,fragmentShader:un.meshphysical_frag},toon:{uniforms:Vi([Ye.common,Ye.aomap,Ye.lightmap,Ye.emissivemap,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.gradientmap,Ye.fog,Ye.lights,{emissive:{value:new Pt(0)}}]),vertexShader:un.meshtoon_vert,fragmentShader:un.meshtoon_frag},matcap:{uniforms:Vi([Ye.common,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,Ye.fog,{matcap:{value:null}}]),vertexShader:un.meshmatcap_vert,fragmentShader:un.meshmatcap_frag},points:{uniforms:Vi([Ye.points,Ye.fog]),vertexShader:un.points_vert,fragmentShader:un.points_frag},dashed:{uniforms:Vi([Ye.common,Ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:un.linedashed_vert,fragmentShader:un.linedashed_frag},depth:{uniforms:Vi([Ye.common,Ye.displacementmap]),vertexShader:un.depth_vert,fragmentShader:un.depth_frag},normal:{uniforms:Vi([Ye.common,Ye.bumpmap,Ye.normalmap,Ye.displacementmap,{opacity:{value:1}}]),vertexShader:un.meshnormal_vert,fragmentShader:un.meshnormal_frag},sprite:{uniforms:Vi([Ye.sprite,Ye.fog]),vertexShader:un.sprite_vert,fragmentShader:un.sprite_frag},background:{uniforms:{uvTransform:{value:new hn},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:un.background_vert,fragmentShader:un.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:un.backgroundCube_vert,fragmentShader:un.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:un.cube_vert,fragmentShader:un.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:un.equirect_vert,fragmentShader:un.equirect_frag},distanceRGBA:{uniforms:Vi([Ye.common,Ye.displacementmap,{referencePosition:{value:new T},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:un.distanceRGBA_vert,fragmentShader:un.distanceRGBA_frag},shadow:{uniforms:Vi([Ye.lights,Ye.fog,{color:{value:new Pt(0)},opacity:{value:1}}]),vertexShader:un.shadow_vert,fragmentShader:un.shadow_frag}};Ns.physical={uniforms:Vi([Ns.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new hn},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new hn},clearcoatNormalScale:{value:new tt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new hn},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new hn},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new hn},sheen:{value:0},sheenColor:{value:new Pt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new hn},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new hn},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new hn},transmissionSamplerSize:{value:new tt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new hn},attenuationDistance:{value:0},attenuationColor:{value:new Pt(0)},specularColor:{value:new Pt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new hn},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new hn},anisotropyVector:{value:new tt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new hn}}]),vertexShader:un.meshphysical_vert,fragmentShader:un.meshphysical_frag};Yc={r:0,b:0,g:0};Ar=class extends pl{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,o=n+e,a=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Fo=4,em=[.125,.215,.35,.446,.526,.582],Jr=20,ah=new Ar,tm=new Pt,ch=null,lh=0,uh=0,Kr=(1+Math.sqrt(5))/2,No=1/Kr,nm=[new T(1,1,1),new T(-1,1,1),new T(1,1,-1),new T(-1,1,-1),new T(0,Kr,No),new T(0,Kr,-No),new T(No,0,Kr),new T(-No,0,Kr),new T(Kr,No,0),new T(-Kr,No,0)],gl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){ch=this._renderer.getRenderTarget(),lh=this._renderer.getActiveCubeFace(),uh=this._renderer.getActiveMipmapLevel(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=rm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=sm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ch,lh,uh),e.scissorTest=!1,jc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Vo||e.mapping===Go?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ch=this._renderer.getRenderTarget(),lh=this._renderer.getActiveCubeFace(),uh=this._renderer.getActiveMipmapLevel();let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Gi,minFilter:Gi,generateMipmaps:!1,type:no,format:ns,colorSpace:di,depthBuffer:!1},i=im(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=im(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Xb(r)),this._blurMaterial=qb(r,e,t)}return i}_compileMaterial(e){let t=new Mn(this._lodPlanes[0],e);this._renderer.compile(t,ah)}_sceneToCubeUV(e,t,n,i){let a=new hi(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(tm),u.toneMapping=Mr,u.autoClear=!1;let d=new Xi({name:"PMREM.Background",side:Oi,depthWrite:!1,depthTest:!1}),g=new Mn(new Wa,d),_=!1,m=e.background;m?m.isColor&&(d.color.copy(m),e.background=null,_=!0):(d.color.copy(tm),_=!0);for(let p=0;p<6;p++){let v=p%3;v===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):v===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));let x=this._cubeSize;jc(i,v*x,p>2?x:0,x,x),u.setRenderTarget(i),_&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===Vo||e.mapping===Go;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=rm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=sm());let r=i?this._cubemapMaterial:this._equirectMaterial,o=new Mn(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let c=this._cubeSize;jc(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,ah)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){let r=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=nm[(i-1)%nm.length];this._blur(e,i-1,i,r,o)}t.autoClear=n}_blur(e,t,n,i,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",r),this._halfBlur(o,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,h=new Mn(this._lodPlanes[i],l),f=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Jr-1),_=r/g,m=isFinite(r)?1+Math.floor(u*_):Jr;m>Jr&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Jr}`);let p=[],v=0;for(let C=0;C<Jr;++C){let H=C/_,M=Math.exp(-H*H/2);p.push(M),C===0?v+=M:C<m&&(v+=2*M)}for(let C=0;C<p.length;C++)p[C]=p[C]/v;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:x}=this;f.dTheta.value=g,f.mipInt.value=x-n;let b=this._sizeLods[i],P=3*b*(i>x-Fo?i-x+Fo:0),w=4*(this._cubeSize-b);jc(t,P,w,3*b,2*b),c.setRenderTarget(t),c.render(h,ah)}};xl=class extends ki{constructor(e,t,n,i,r,o,a,c,l,u){if(u=u!==void 0?u:Qr,u!==Qr&&u!==Wo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Qr&&(n=_r),n===void 0&&u===Wo&&(n=$r),super(null,i,r,o,a,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:ui,this.minFilter=c!==void 0?c:ui,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},u0=new ki,h0=new xl(1,1);h0.compareFunction=r0;f0=new dl,d0=new Ch,p0=new ml,om=[],am=[],cm=new Float32Array(16),lm=new Float32Array(9),um=new Float32Array(4);Lh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=bM(t.type)}},Nh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=HM(t.type)}},Dh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(e,t[a.id],n)}}},hh=/(\w+)(\])?(\[|\.)?/g;zo=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=e.getActiveUniform(t,i),o=e.getUniformLocation(t,r.name);VM(r,o,this)}}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){let a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let o=e[i];o.id in t&&n.push(o)}return n}};GM=37297,WM=0;QM=/^[ \t]*#include +<([\w\d./]+)>/gm;eE=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);nE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;uE=0,Fh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Bh(e),t.set(e,n)),n}},Bh=class{constructor(e){this.id=uE++,this.code=e,this.usedTimes=0}};xE=0;Oh=class extends ss{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=py,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},kh=class extends ss{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},bE=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ME=`uniform sampler2D shadow_pass;
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
}`;zh=class extends hi{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},Os=class extends Yn{constructor(){super(),this.isGroup=!0,this.type="Group"}},AE={type:"move"},Ba=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Os,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Os,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new T,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new T),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Os,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new T,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new T),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let _ of e.hand.values()){let m=t.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(AE)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Os;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Hh=class extends Tr{constructor(e,t){super();let n=this,i=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,h=null,f=null,d=null,g=null,_=t.getContextAttributes(),m=null,p=null,v=[],x=[],b=new tt,P=null,w=new hi;w.layers.enable(1),w.viewport=new Nn;let C=new hi;C.layers.enable(2),C.viewport=new Nn;let H=[w,C],M=new zh;M.layers.enable(1),M.layers.enable(2);let R=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ee){let Ne=v[ee];return Ne===void 0&&(Ne=new Ba,v[ee]=Ne),Ne.getTargetRaySpace()},this.getControllerGrip=function(ee){let Ne=v[ee];return Ne===void 0&&(Ne=new Ba,v[ee]=Ne),Ne.getGripSpace()},this.getHand=function(ee){let Ne=v[ee];return Ne===void 0&&(Ne=new Ba,v[ee]=Ne),Ne.getHandSpace()};function F(ee){let Ne=x.indexOf(ee.inputSource);if(Ne===-1)return;let Ge=v[Ne];Ge!==void 0&&(Ge.update(ee.inputSource,ee.frame,l||o),Ge.dispatchEvent({type:ee.type,data:ee.inputSource}))}function le(){i.removeEventListener("select",F),i.removeEventListener("selectstart",F),i.removeEventListener("selectend",F),i.removeEventListener("squeeze",F),i.removeEventListener("squeezestart",F),i.removeEventListener("squeezeend",F),i.removeEventListener("end",le),i.removeEventListener("inputsourceschange",I);for(let ee=0;ee<v.length;ee++){let Ne=x[ee];Ne!==null&&(x[ee]=null,v[ee].disconnect(Ne))}R=null,V=null,e.setRenderTarget(m),d=null,f=null,h=null,i=null,p=null,st.stop(),n.isPresenting=!1,e.setPixelRatio(P),e.setSize(b.width,b.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ee){r=ee,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ee){a=ee,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(ee){l=ee},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(ee){if(i=ee,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",F),i.addEventListener("selectstart",F),i.addEventListener("selectend",F),i.addEventListener("squeeze",F),i.addEventListener("squeezestart",F),i.addEventListener("squeezeend",F),i.addEventListener("end",le),i.addEventListener("inputsourceschange",I),_.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(b),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){let Ne={antialias:i.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(i,t,Ne),i.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),p=new ds(d.framebufferWidth,d.framebufferHeight,{format:ns,type:Er,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let Ne=null,Ge=null,vt=null;_.depth&&(vt=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Ne=_.stencil?Wo:Qr,Ge=_.stencil?$r:_r);let wt={colorFormat:t.RGBA8,depthFormat:vt,scaleFactor:r};h=new XRWebGLBinding(i,t),f=h.createProjectionLayer(wt),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),p=new ds(f.textureWidth,f.textureHeight,{format:ns,type:Er,depthTexture:new xl(f.textureWidth,f.textureHeight,Ge,void 0,void 0,void 0,void 0,void 0,void 0,Ne),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});let Xt=e.properties.get(p);Xt.__ignoreDepthValues=f.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),st.setContext(i),st.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function I(ee){for(let Ne=0;Ne<ee.removed.length;Ne++){let Ge=ee.removed[Ne],vt=x.indexOf(Ge);vt>=0&&(x[vt]=null,v[vt].disconnect(Ge))}for(let Ne=0;Ne<ee.added.length;Ne++){let Ge=ee.added[Ne],vt=x.indexOf(Ge);if(vt===-1){for(let Xt=0;Xt<v.length;Xt++)if(Xt>=x.length){x.push(Ge),vt=Xt;break}else if(x[Xt]===null){x[Xt]=Ge,vt=Xt;break}if(vt===-1)break}let wt=v[vt];wt&&wt.connect(Ge)}}let X=new T,ce=new T;function ne(ee,Ne,Ge){X.setFromMatrixPosition(Ne.matrixWorld),ce.setFromMatrixPosition(Ge.matrixWorld);let vt=X.distanceTo(ce),wt=Ne.projectionMatrix.elements,Xt=Ge.projectionMatrix.elements,Qt=wt[14]/(wt[10]-1),Bt=wt[14]/(wt[10]+1),gn=(wt[9]+1)/wt[5],re=(wt[9]-1)/wt[5],xi=(wt[8]-1)/wt[0],Ot=(Xt[8]+1)/Xt[0],Kt=Qt*xi,St=Qt*Ot,On=vt/(-xi+Ot),zt=On*-xi;Ne.matrixWorld.decompose(ee.position,ee.quaternion,ee.scale),ee.translateX(zt),ee.translateZ(On),ee.matrixWorld.compose(ee.position,ee.quaternion,ee.scale),ee.matrixWorldInverse.copy(ee.matrixWorld).invert();let D=Qt+On,A=Bt+On,Q=Kt-zt,Be=St+(vt-zt),Re=gn*Bt/A*D,Ue=re*Bt/A*D;ee.projectionMatrix.makePerspective(Q,Be,Re,Ue,D,A),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert()}function ie(ee,Ne){Ne===null?ee.matrixWorld.copy(ee.matrix):ee.matrixWorld.multiplyMatrices(Ne.matrixWorld,ee.matrix),ee.matrixWorldInverse.copy(ee.matrixWorld).invert()}this.updateCamera=function(ee){if(i===null)return;M.near=C.near=w.near=ee.near,M.far=C.far=w.far=ee.far,(R!==M.near||V!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),R=M.near,V=M.far);let Ne=ee.parent,Ge=M.cameras;ie(M,Ne);for(let vt=0;vt<Ge.length;vt++)ie(Ge[vt],Ne);Ge.length===2?ne(M,w,C):M.projectionMatrix.copy(w.projectionMatrix),ye(ee,M,Ne)};function ye(ee,Ne,Ge){Ge===null?ee.matrix.copy(Ne.matrixWorld):(ee.matrix.copy(Ge.matrixWorld),ee.matrix.invert(),ee.matrix.multiply(Ne.matrixWorld)),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.updateMatrixWorld(!0),ee.projectionMatrix.copy(Ne.projectionMatrix),ee.projectionMatrixInverse.copy(Ne.projectionMatrixInverse),ee.isPerspectiveCamera&&(ee.fov=qo*2*Math.atan(1/ee.projectionMatrix.elements[5]),ee.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(ee){c=ee,f!==null&&(f.fixedFoveation=ee),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=ee)};let Pe=null;function _e(ee,Ne){if(u=Ne.getViewerPose(l||o),g=Ne,u!==null){let Ge=u.views;d!==null&&(e.setRenderTargetFramebuffer(p,d.framebuffer),e.setRenderTarget(p));let vt=!1;Ge.length!==M.cameras.length&&(M.cameras.length=0,vt=!0);for(let wt=0;wt<Ge.length;wt++){let Xt=Ge[wt],Qt=null;if(d!==null)Qt=d.getViewport(Xt);else{let gn=h.getViewSubImage(f,Xt);Qt=gn.viewport,wt===0&&(e.setRenderTargetTextures(p,gn.colorTexture,f.ignoreDepthValues?void 0:gn.depthStencilTexture),e.setRenderTarget(p))}let Bt=H[wt];Bt===void 0&&(Bt=new hi,Bt.layers.enable(wt),Bt.viewport=new Nn,H[wt]=Bt),Bt.matrix.fromArray(Xt.transform.matrix),Bt.matrix.decompose(Bt.position,Bt.quaternion,Bt.scale),Bt.projectionMatrix.fromArray(Xt.projectionMatrix),Bt.projectionMatrixInverse.copy(Bt.projectionMatrix).invert(),Bt.viewport.set(Qt.x,Qt.y,Qt.width,Qt.height),wt===0&&(M.matrix.copy(Bt.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),vt===!0&&M.cameras.push(Bt)}}for(let Ge=0;Ge<v.length;Ge++){let vt=x[Ge],wt=v[Ge];vt!==null&&wt!==void 0&&wt.update(vt,Ne,l||o)}Pe&&Pe(ee,Ne),Ne.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Ne}),g=null}let st=new l0;st.setAnimationLoop(_e),this.setAnimationLoop=function(ee){Pe=ee},this.dispose=function(){}}};Xa=class{constructor(e={}){let{canvas:t=Oy(),context:n=null,depth:i=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=o;let d=new Uint32Array(4),g=new Int32Array(4),_=null,m=null,p=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Vn,this._useLegacyLights=!1,this.toneMapping=Mr,this.toneMappingExposure=1;let x=this,b=!1,P=0,w=0,C=null,H=-1,M=null,R=new Nn,V=new Nn,F=null,le=new Pt(0),I=0,X=t.width,ce=t.height,ne=1,ie=null,ye=null,Pe=new Nn(0,0,X,ce),_e=new Nn(0,0,X,ce),st=!1,ee=new wr,Ne=!1,Ge=!1,vt=null,wt=new bt,Xt=new tt,Qt=new T,Bt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function gn(){return C===null?ne:1}let re=n;function xi(L,j){for(let ae=0;ae<L.length;ae++){let ue=L[ae],oe=t.getContext(ue,j);if(oe!==null)return oe}return null}try{let L={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${tc}`),t.addEventListener("webglcontextlost",ke,!1),t.addEventListener("webglcontextrestored",O,!1),t.addEventListener("webglcontextcreationerror",We,!1),re===null){let j=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&j.shift(),re=xi(j,L),re===null)throw xi(j)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext!="undefined"&&re instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),re.getShaderPrecisionFormat===void 0&&(re.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(L){throw console.error("THREE.WebGLRenderer: "+L.message),L}let Ot,Kt,St,On,zt,D,A,Q,Be,Re,Ue,$e,Ze,rt,Nt,en,De,vn,qt,Dt,yt,mt,Me,Oe;function fn(){Ot=new jb(re),Kt=new Vb(re,Ot,e),Ot.init(Kt),mt=new wE(re,Ot,Kt),St=new SE(re,Ot,Kt),On=new Jb(re),zt=new fE,D=new TE(re,Ot,St,zt,Kt,mt,On),A=new Wb(x),Q=new Yb(x),Be=new r_(re,Kt),Me=new zb(re,Ot,Be,Kt),Re=new Zb(re,Be,On,Me),Ue=new tM(re,Re,Be,On),qt=new eM(re,Kt,D),en=new Gb(zt),$e=new hE(x,A,Q,Ot,Kt,Me,en),Ze=new RE(x,zt),rt=new pE,Nt=new vE(Ot,Kt),vn=new kb(x,A,Q,St,Ue,f,c),De=new EE(x,Ue,Kt),Oe=new CE(re,On,Kt,St),Dt=new Hb(re,Ot,On,Kt),yt=new Kb(re,Ot,On,Kt),On.programs=$e.programs,x.capabilities=Kt,x.extensions=Ot,x.properties=zt,x.renderLists=rt,x.shadowMap=De,x.state=St,x.info=On}fn();let Jt=new Hh(x,re);this.xr=Jt,this.getContext=function(){return re},this.getContextAttributes=function(){return re.getContextAttributes()},this.forceContextLoss=function(){let L=Ot.get("WEBGL_lose_context");L&&L.loseContext()},this.forceContextRestore=function(){let L=Ot.get("WEBGL_lose_context");L&&L.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(L){L!==void 0&&(ne=L,this.setSize(X,ce,!1))},this.getSize=function(L){return L.set(X,ce)},this.setSize=function(L,j,ae=!0){if(Jt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=L,ce=j,t.width=Math.floor(L*ne),t.height=Math.floor(j*ne),ae===!0&&(t.style.width=L+"px",t.style.height=j+"px"),this.setViewport(0,0,L,j)},this.getDrawingBufferSize=function(L){return L.set(X*ne,ce*ne).floor()},this.setDrawingBufferSize=function(L,j,ae){X=L,ce=j,ne=ae,t.width=Math.floor(L*ae),t.height=Math.floor(j*ae),this.setViewport(0,0,L,j)},this.getCurrentViewport=function(L){return L.copy(R)},this.getViewport=function(L){return L.copy(Pe)},this.setViewport=function(L,j,ae,ue){L.isVector4?Pe.set(L.x,L.y,L.z,L.w):Pe.set(L,j,ae,ue),St.viewport(R.copy(Pe).multiplyScalar(ne).floor())},this.getScissor=function(L){return L.copy(_e)},this.setScissor=function(L,j,ae,ue){L.isVector4?_e.set(L.x,L.y,L.z,L.w):_e.set(L,j,ae,ue),St.scissor(V.copy(_e).multiplyScalar(ne).floor())},this.getScissorTest=function(){return st},this.setScissorTest=function(L){St.setScissorTest(st=L)},this.setOpaqueSort=function(L){ie=L},this.setTransparentSort=function(L){ye=L},this.getClearColor=function(L){return L.copy(vn.getClearColor())},this.setClearColor=function(){vn.setClearColor.apply(vn,arguments)},this.getClearAlpha=function(){return vn.getClearAlpha()},this.setClearAlpha=function(){vn.setClearAlpha.apply(vn,arguments)},this.clear=function(L=!0,j=!0,ae=!0){let ue=0;if(L){let oe=!1;if(C!==null){let ot=C.texture.format;oe=ot===e0||ot===Qm||ot===$m}if(oe){let ot=C.texture.type,Tt=ot===Er||ot===_r||ot===df||ot===$r||ot===Km||ot===Jm,kt=vn.getClearColor(),Ht=vn.getClearAlpha(),Vt=kt.r,qe=kt.g,Gt=kt.b;Tt?(d[0]=Vt,d[1]=qe,d[2]=Gt,d[3]=Ht,re.clearBufferuiv(re.COLOR,0,d)):(g[0]=Vt,g[1]=qe,g[2]=Gt,g[3]=Ht,re.clearBufferiv(re.COLOR,0,g))}else ue|=re.COLOR_BUFFER_BIT}j&&(ue|=re.DEPTH_BUFFER_BIT),ae&&(ue|=re.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),re.clear(ue)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ke,!1),t.removeEventListener("webglcontextrestored",O,!1),t.removeEventListener("webglcontextcreationerror",We,!1),rt.dispose(),Nt.dispose(),zt.dispose(),A.dispose(),Q.dispose(),Ue.dispose(),Me.dispose(),Oe.dispose(),$e.dispose(),Jt.dispose(),Jt.removeEventListener("sessionstart",yi),Jt.removeEventListener("sessionend",An),vt&&(vt.dispose(),vt=null),$n.stop()};function ke(L){L.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function O(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;let L=On.autoReset,j=De.enabled,ae=De.autoUpdate,ue=De.needsUpdate,oe=De.type;fn(),On.autoReset=L,De.enabled=j,De.autoUpdate=ae,De.needsUpdate=ue,De.type=oe}function We(L){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",L.statusMessage)}function Ke(L){let j=L.target;j.removeEventListener("dispose",Ke),Mt(j)}function Mt(L){Et(L),zt.remove(L)}function Et(L){let j=zt.get(L).programs;j!==void 0&&(j.forEach(function(ae){$e.releaseProgram(ae)}),L.isShaderMaterial&&$e.releaseShaderCache(L))}this.renderBufferDirect=function(L,j,ae,ue,oe,ot){j===null&&(j=Bt);let Tt=oe.isMesh&&oe.matrixWorld.determinant()<0,kt=Ji(L,j,ae,ue,oe);St.setMaterial(ue,Tt);let Ht=ae.index,Vt=1;if(ue.wireframe===!0){if(Ht=Re.getWireframeAttribute(ae),Ht===void 0)return;Vt=2}let qe=ae.drawRange,Gt=ae.attributes.position,Wt=qe.start*Vt,bi=(qe.start+qe.count)*Vt;ot!==null&&(Wt=Math.max(Wt,ot.start*Vt),bi=Math.min(bi,(ot.start+ot.count)*Vt)),Ht!==null?(Wt=Math.max(Wt,0),bi=Math.min(bi,Ht.count)):Gt!=null&&(Wt=Math.max(Wt,0),bi=Math.min(bi,Gt.count));let Gn=bi-Wt;if(Gn<0||Gn===1/0)return;Me.setup(oe,ue,kt,ae,Ht);let ys,Fn=Dt;if(Ht!==null&&(ys=Be.get(Ht),Fn=yt,Fn.setIndex(ys)),oe.isMesh)ue.wireframe===!0?(St.setLineWidth(ue.wireframeLinewidth*gn()),Fn.setMode(re.LINES)):Fn.setMode(re.TRIANGLES);else if(oe.isLine){let jt=ue.linewidth;jt===void 0&&(jt=1),St.setLineWidth(jt*gn()),oe.isLineSegments?Fn.setMode(re.LINES):oe.isLineLoop?Fn.setMode(re.LINE_LOOP):Fn.setMode(re.LINE_STRIP)}else oe.isPoints?Fn.setMode(re.POINTS):oe.isSprite&&Fn.setMode(re.TRIANGLES);if(oe.isBatchedMesh)Fn.renderMultiDraw(oe._multiDrawStarts,oe._multiDrawCounts,oe._multiDrawCount);else if(oe.isInstancedMesh)Fn.renderInstances(Wt,Gn,oe.count);else if(ae.isInstancedBufferGeometry){let jt=ae._maxInstanceCount!==void 0?ae._maxInstanceCount:1/0,Cs=Math.min(ae.instanceCount,jt);Fn.renderInstances(Wt,Gn,Cs)}else Fn.render(Wt,Gn)};function En(L,j,ae){L.transparent===!0&&L.side===Ti&&L.forceSinglePass===!1?(L.side=Oi,L.needsUpdate=!0,Vs(L,j,ae),L.side=Wi,L.needsUpdate=!0,Vs(L,j,ae),L.side=Ti):Vs(L,j,ae)}this.compile=function(L,j,ae=null){ae===null&&(ae=L),m=Nt.get(ae),m.init(),v.push(m),ae.traverseVisible(function(oe){oe.isLight&&oe.layers.test(j.layers)&&(m.pushLight(oe),oe.castShadow&&m.pushShadow(oe))}),L!==ae&&L.traverseVisible(function(oe){oe.isLight&&oe.layers.test(j.layers)&&(m.pushLight(oe),oe.castShadow&&m.pushShadow(oe))}),m.setupLights(x._useLegacyLights);let ue=new Set;return L.traverse(function(oe){let ot=oe.material;if(ot)if(Array.isArray(ot))for(let Tt=0;Tt<ot.length;Tt++){let kt=ot[Tt];En(kt,ae,oe),ue.add(kt)}else En(ot,ae,oe),ue.add(ot)}),v.pop(),m=null,ue},this.compileAsync=function(L,j,ae=null){let ue=this.compile(L,j,ae);return new Promise(oe=>{function ot(){if(ue.forEach(function(Tt){zt.get(Tt).currentProgram.isReady()&&ue.delete(Tt)}),ue.size===0){oe(L);return}setTimeout(ot,10)}Ot.get("KHR_parallel_shader_compile")!==null?ot():setTimeout(ot,10)})};let Sn=null;function Jn(L){Sn&&Sn(L)}function yi(){$n.stop()}function An(){$n.start()}let $n=new l0;$n.setAnimationLoop(Jn),typeof self!="undefined"&&$n.setContext(self),this.setAnimationLoop=function(L){Sn=L,Jt.setAnimationLoop(L),L===null?$n.stop():$n.start()},Jt.addEventListener("sessionstart",yi),Jt.addEventListener("sessionend",An),this.render=function(L,j){if(j!==void 0&&j.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),j.parent===null&&j.matrixWorldAutoUpdate===!0&&j.updateMatrixWorld(),Jt.enabled===!0&&Jt.isPresenting===!0&&(Jt.cameraAutoUpdate===!0&&Jt.updateCamera(j),j=Jt.getCamera()),L.isScene===!0&&L.onBeforeRender(x,L,j,C),m=Nt.get(L,v.length),m.init(),v.push(m),wt.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),ee.setFromProjectionMatrix(wt),Ge=this.localClippingEnabled,Ne=en.init(this.clippingPlanes,Ge),_=rt.get(L,p.length),_.init(),p.push(_),_i(L,j,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(ie,ye),this.info.render.frame++,Ne===!0&&en.beginShadows();let ae=m.state.shadowsArray;if(De.render(ae,L,j),Ne===!0&&en.endShadows(),this.info.autoReset===!0&&this.info.reset(),vn.render(_,L),m.setupLights(x._useLegacyLights),j.isArrayCamera){let ue=j.cameras;for(let oe=0,ot=ue.length;oe<ot;oe++){let Tt=ue[oe];uo(_,L,Tt,Tt.viewport)}}else uo(_,L,j);C!==null&&(D.updateMultisampleRenderTarget(C),D.updateRenderTargetMipmap(C)),L.isScene===!0&&L.onAfterRender(x,L,j),Me.resetDefaultState(),H=-1,M=null,v.pop(),v.length>0?m=v[v.length-1]:m=null,p.pop(),p.length>0?_=p[p.length-1]:_=null};function _i(L,j,ae,ue){if(L.visible===!1)return;if(L.layers.test(j.layers)){if(L.isGroup)ae=L.renderOrder;else if(L.isLOD)L.autoUpdate===!0&&L.update(j);else if(L.isLight)m.pushLight(L),L.castShadow&&m.pushShadow(L);else if(L.isSprite){if(!L.frustumCulled||ee.intersectsSprite(L)){ue&&Qt.setFromMatrixPosition(L.matrixWorld).applyMatrix4(wt);let Tt=Ue.update(L),kt=L.material;kt.visible&&_.push(L,Tt,kt,ae,Qt.z,null)}}else if((L.isMesh||L.isLine||L.isPoints)&&(!L.frustumCulled||ee.intersectsObject(L))){let Tt=Ue.update(L),kt=L.material;if(ue&&(L.boundingSphere!==void 0?(L.boundingSphere===null&&L.computeBoundingSphere(),Qt.copy(L.boundingSphere.center)):(Tt.boundingSphere===null&&Tt.computeBoundingSphere(),Qt.copy(Tt.boundingSphere.center)),Qt.applyMatrix4(L.matrixWorld).applyMatrix4(wt)),Array.isArray(kt)){let Ht=Tt.groups;for(let Vt=0,qe=Ht.length;Vt<qe;Vt++){let Gt=Ht[Vt],Wt=kt[Gt.materialIndex];Wt&&Wt.visible&&_.push(L,Tt,Wt,ae,Qt.z,Gt)}}else kt.visible&&_.push(L,Tt,kt,ae,Qt.z,null)}}let ot=L.children;for(let Tt=0,kt=ot.length;Tt<kt;Tt++)_i(ot[Tt],j,ae,ue)}function uo(L,j,ae,ue){let oe=L.opaque,ot=L.transmissive,Tt=L.transparent;m.setupLightsView(ae),Ne===!0&&en.setGlobalState(x.clippingPlanes,ae),ot.length>0&&lr(oe,ot,j,ae),ue&&St.viewport(R.copy(ue)),oe.length>0&&ci(oe,j,ae),ot.length>0&&ci(ot,j,ae),Tt.length>0&&ci(Tt,j,ae),St.buffers.depth.setTest(!0),St.buffers.depth.setMask(!0),St.buffers.color.setMask(!0),St.setPolygonOffset(!1)}function lr(L,j,ae,ue){if((ae.isScene===!0?ae.overrideMaterial:null)!==null)return;let ot=Kt.isWebGL2;vt===null&&(vt=new ds(1,1,{generateMipmaps:!0,type:Ot.has("EXT_color_buffer_half_float")?no:Er,minFilter:Sr,samples:ot?4:0})),x.getDrawingBufferSize(Xt),ot?vt.setSize(Xt.x,Xt.y):vt.setSize(ul(Xt.x),ul(Xt.y));let Tt=x.getRenderTarget();x.setRenderTarget(vt),x.getClearColor(le),I=x.getClearAlpha(),I<1&&x.setClearColor(16777215,.5),x.clear();let kt=x.toneMapping;x.toneMapping=Mr,ci(L,ae,ue),D.updateMultisampleRenderTarget(vt),D.updateRenderTargetMipmap(vt);let Ht=!1;for(let Vt=0,qe=j.length;Vt<qe;Vt++){let Gt=j[Vt],Wt=Gt.object,bi=Gt.geometry,Gn=Gt.material,ys=Gt.group;if(Gn.side===Ti&&Wt.layers.test(ue.layers)){let Fn=Gn.side;Gn.side=Oi,Gn.needsUpdate=!0,vi(Wt,ae,ue,bi,Gn,ys),Gn.side=Fn,Gn.needsUpdate=!0,Ht=!0}}Ht===!0&&(D.updateMultisampleRenderTarget(vt),D.updateRenderTargetMipmap(vt)),x.setRenderTarget(Tt),x.setClearColor(le,I),x.toneMapping=kt}function ci(L,j,ae){let ue=j.isScene===!0?j.overrideMaterial:null;for(let oe=0,ot=L.length;oe<ot;oe++){let Tt=L[oe],kt=Tt.object,Ht=Tt.geometry,Vt=ue===null?Tt.material:ue,qe=Tt.group;kt.layers.test(ae.layers)&&vi(kt,j,ae,Ht,Vt,qe)}}function vi(L,j,ae,ue,oe,ot){L.onBeforeRender(x,j,ae,ue,oe,ot),L.modelViewMatrix.multiplyMatrices(ae.matrixWorldInverse,L.matrixWorld),L.normalMatrix.getNormalMatrix(L.modelViewMatrix),oe.onBeforeRender(x,j,ae,ue,L,ot),oe.transparent===!0&&oe.side===Ti&&oe.forceSinglePass===!1?(oe.side=Oi,oe.needsUpdate=!0,x.renderBufferDirect(ae,j,ue,oe,L,ot),oe.side=Wi,oe.needsUpdate=!0,x.renderBufferDirect(ae,j,ue,oe,L,ot),oe.side=Ti):x.renderBufferDirect(ae,j,ue,oe,L,ot),L.onAfterRender(x,j,ae,ue,oe,ot)}function Vs(L,j,ae){j.isScene!==!0&&(j=Bt);let ue=zt.get(L),oe=m.state.lights,ot=m.state.shadowsArray,Tt=oe.state.version,kt=$e.getParameters(L,oe.state,ot,j,ae),Ht=$e.getProgramCacheKey(kt),Vt=ue.programs;ue.environment=L.isMeshStandardMaterial?j.environment:null,ue.fog=j.fog,ue.envMap=(L.isMeshStandardMaterial?Q:A).get(L.envMap||ue.environment),Vt===void 0&&(L.addEventListener("dispose",Ke),Vt=new Map,ue.programs=Vt);let qe=Vt.get(Ht);if(qe!==void 0){if(ue.currentProgram===qe&&ue.lightsStateVersion===Tt)return Rs(L,kt),qe}else kt.uniforms=$e.getUniforms(L),L.onBuild(ae,kt,x),L.onBeforeCompile(kt,x),qe=$e.acquireProgram(kt,Ht),Vt.set(Ht,qe),ue.uniforms=kt.uniforms;let Gt=ue.uniforms;return(!L.isShaderMaterial&&!L.isRawShaderMaterial||L.clipping===!0)&&(Gt.clippingPlanes=en.uniform),Rs(L,kt),ue.needsLights=Gs(L),ue.lightsStateVersion=Tt,ue.needsLights&&(Gt.ambientLightColor.value=oe.state.ambient,Gt.lightProbe.value=oe.state.probe,Gt.directionalLights.value=oe.state.directional,Gt.directionalLightShadows.value=oe.state.directionalShadow,Gt.spotLights.value=oe.state.spot,Gt.spotLightShadows.value=oe.state.spotShadow,Gt.rectAreaLights.value=oe.state.rectArea,Gt.ltc_1.value=oe.state.rectAreaLTC1,Gt.ltc_2.value=oe.state.rectAreaLTC2,Gt.pointLights.value=oe.state.point,Gt.pointLightShadows.value=oe.state.pointShadow,Gt.hemisphereLights.value=oe.state.hemi,Gt.directionalShadowMap.value=oe.state.directionalShadowMap,Gt.directionalShadowMatrix.value=oe.state.directionalShadowMatrix,Gt.spotShadowMap.value=oe.state.spotShadowMap,Gt.spotLightMatrix.value=oe.state.spotLightMatrix,Gt.spotLightMap.value=oe.state.spotLightMap,Gt.pointShadowMap.value=oe.state.pointShadowMap,Gt.pointShadowMatrix.value=oe.state.pointShadowMatrix),ue.currentProgram=qe,ue.uniformsList=null,qe}function yc(L){if(L.uniformsList===null){let j=L.currentProgram.getUniforms();L.uniformsList=zo.seqWithValue(j.seq,L.uniforms)}return L.uniformsList}function Rs(L,j){let ae=zt.get(L);ae.outputColorSpace=j.outputColorSpace,ae.batching=j.batching,ae.instancing=j.instancing,ae.instancingColor=j.instancingColor,ae.skinning=j.skinning,ae.morphTargets=j.morphTargets,ae.morphNormals=j.morphNormals,ae.morphColors=j.morphColors,ae.morphTargetsCount=j.morphTargetsCount,ae.numClippingPlanes=j.numClippingPlanes,ae.numIntersection=j.numClipIntersection,ae.vertexAlphas=j.vertexAlphas,ae.vertexTangents=j.vertexTangents,ae.toneMapping=j.toneMapping}function Ji(L,j,ae,ue,oe){j.isScene!==!0&&(j=Bt),D.resetTextureUnits();let ot=j.fog,Tt=ue.isMeshStandardMaterial?j.environment:null,kt=C===null?x.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:di,Ht=(ue.isMeshStandardMaterial?Q:A).get(ue.envMap||Tt),Vt=ue.vertexColors===!0&&!!ae.attributes.color&&ae.attributes.color.itemSize===4,qe=!!ae.attributes.tangent&&(!!ue.normalMap||ue.anisotropy>0),Gt=!!ae.morphAttributes.position,Wt=!!ae.morphAttributes.normal,bi=!!ae.morphAttributes.color,Gn=Mr;ue.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(Gn=x.toneMapping);let ys=ae.morphAttributes.position||ae.morphAttributes.normal||ae.morphAttributes.color,Fn=ys!==void 0?ys.length:0,jt=zt.get(ue),Cs=m.state.lights;if(Ne===!0&&(Ge===!0||L!==M)){let ni=L===M&&ue.id===H;en.setState(ue,L,ni)}let Tn=!1;ue.version===jt.__version?(jt.needsLights&&jt.lightsStateVersion!==Cs.state.version||jt.outputColorSpace!==kt||oe.isBatchedMesh&&jt.batching===!1||!oe.isBatchedMesh&&jt.batching===!0||oe.isInstancedMesh&&jt.instancing===!1||!oe.isInstancedMesh&&jt.instancing===!0||oe.isSkinnedMesh&&jt.skinning===!1||!oe.isSkinnedMesh&&jt.skinning===!0||oe.isInstancedMesh&&jt.instancingColor===!0&&oe.instanceColor===null||oe.isInstancedMesh&&jt.instancingColor===!1&&oe.instanceColor!==null||jt.envMap!==Ht||ue.fog===!0&&jt.fog!==ot||jt.numClippingPlanes!==void 0&&(jt.numClippingPlanes!==en.numPlanes||jt.numIntersection!==en.numIntersection)||jt.vertexAlphas!==Vt||jt.vertexTangents!==qe||jt.morphTargets!==Gt||jt.morphNormals!==Wt||jt.morphColors!==bi||jt.toneMapping!==Gn||Kt.isWebGL2===!0&&jt.morphTargetsCount!==Fn)&&(Tn=!0):(Tn=!0,jt.__version=ue.version);let Ni=jt.currentProgram;Tn===!0&&(Ni=Vs(ue,j,oe));let xa=!1,ur=!1,ya=!1,Mi=Ni.getUniforms(),Ps=jt.uniforms;if(St.useProgram(Ni.program)&&(xa=!0,ur=!0,ya=!0),ue.id!==H&&(H=ue.id,ur=!0),xa||M!==L){Mi.setValue(re,"projectionMatrix",L.projectionMatrix),Mi.setValue(re,"viewMatrix",L.matrixWorldInverse);let ni=Mi.map.cameraPosition;ni!==void 0&&ni.setValue(re,Qt.setFromMatrixPosition(L.matrixWorld)),Kt.logarithmicDepthBuffer&&Mi.setValue(re,"logDepthBufFC",2/(Math.log(L.far+1)/Math.LN2)),(ue.isMeshPhongMaterial||ue.isMeshToonMaterial||ue.isMeshLambertMaterial||ue.isMeshBasicMaterial||ue.isMeshStandardMaterial||ue.isShaderMaterial)&&Mi.setValue(re,"isOrthographic",L.isOrthographicCamera===!0),M!==L&&(M=L,ur=!0,ya=!0)}if(oe.isSkinnedMesh){Mi.setOptional(re,oe,"bindMatrix"),Mi.setOptional(re,oe,"bindMatrixInverse");let ni=oe.skeleton;ni&&(Kt.floatVertexTextures?(ni.boneTexture===null&&ni.computeBoneTexture(),Mi.setValue(re,"boneTexture",ni.boneTexture,D)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}oe.isBatchedMesh&&(Mi.setOptional(re,oe,"batchingTexture"),Mi.setValue(re,"batchingTexture",oe._matricesTexture,D));let Hr=ae.morphAttributes;if((Hr.position!==void 0||Hr.normal!==void 0||Hr.color!==void 0&&Kt.isWebGL2===!0)&&qt.update(oe,ae,Ni),(ur||jt.receiveShadow!==oe.receiveShadow)&&(jt.receiveShadow=oe.receiveShadow,Mi.setValue(re,"receiveShadow",oe.receiveShadow)),ue.isMeshGouraudMaterial&&ue.envMap!==null&&(Ps.envMap.value=Ht,Ps.flipEnvMap.value=Ht.isCubeTexture&&Ht.isRenderTargetTexture===!1?-1:1),ur&&(Mi.setValue(re,"toneMappingExposure",x.toneMappingExposure),jt.needsLights&&rs(Ps,ya),ot&&ue.fog===!0&&Ze.refreshFogUniforms(Ps,ot),Ze.refreshMaterialUniforms(Ps,ue,ne,ce,vt),zo.upload(re,yc(jt),Ps,D)),ue.isShaderMaterial&&ue.uniformsNeedUpdate===!0&&(zo.upload(re,yc(jt),Ps,D),ue.uniformsNeedUpdate=!1),ue.isSpriteMaterial&&Mi.setValue(re,"center",oe.center),Mi.setValue(re,"modelViewMatrix",oe.modelViewMatrix),Mi.setValue(re,"normalMatrix",oe.normalMatrix),Mi.setValue(re,"modelMatrix",oe.matrixWorld),ue.isShaderMaterial||ue.isRawShaderMaterial){let ni=ue.uniformsGroups;for(let os=0,ho=ni.length;os<ho;os++)if(Kt.isWebGL2){let _s=ni[os];Oe.update(_s,Ni),Oe.bind(_s,Ni)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Ni}function rs(L,j){L.ambientLightColor.needsUpdate=j,L.lightProbe.needsUpdate=j,L.directionalLights.needsUpdate=j,L.directionalLightShadows.needsUpdate=j,L.pointLights.needsUpdate=j,L.pointLightShadows.needsUpdate=j,L.spotLights.needsUpdate=j,L.spotLightShadows.needsUpdate=j,L.rectAreaLights.needsUpdate=j,L.hemisphereLights.needsUpdate=j}function Gs(L){return L.isMeshLambertMaterial||L.isMeshToonMaterial||L.isMeshPhongMaterial||L.isMeshStandardMaterial||L.isShadowMaterial||L.isShaderMaterial&&L.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(L,j,ae){zt.get(L.texture).__webglTexture=j,zt.get(L.depthTexture).__webglTexture=ae;let ue=zt.get(L);ue.__hasExternalTextures=!0,ue.__hasExternalTextures&&(ue.__autoAllocateDepthBuffer=ae===void 0,ue.__autoAllocateDepthBuffer||Ot.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ue.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(L,j){let ae=zt.get(L);ae.__webglFramebuffer=j,ae.__useDefaultFramebuffer=j===void 0},this.setRenderTarget=function(L,j=0,ae=0){C=L,P=j,w=ae;let ue=!0,oe=null,ot=!1,Tt=!1;if(L){let Ht=zt.get(L);Ht.__useDefaultFramebuffer!==void 0?(St.bindFramebuffer(re.FRAMEBUFFER,null),ue=!1):Ht.__webglFramebuffer===void 0?D.setupRenderTarget(L):Ht.__hasExternalTextures&&D.rebindTextures(L,zt.get(L.texture).__webglTexture,zt.get(L.depthTexture).__webglTexture);let Vt=L.texture;(Vt.isData3DTexture||Vt.isDataArrayTexture||Vt.isCompressedArrayTexture)&&(Tt=!0);let qe=zt.get(L).__webglFramebuffer;L.isWebGLCubeRenderTarget?(Array.isArray(qe[j])?oe=qe[j][ae]:oe=qe[j],ot=!0):Kt.isWebGL2&&L.samples>0&&D.useMultisampledRTT(L)===!1?oe=zt.get(L).__webglMultisampledFramebuffer:Array.isArray(qe)?oe=qe[ae]:oe=qe,R.copy(L.viewport),V.copy(L.scissor),F=L.scissorTest}else R.copy(Pe).multiplyScalar(ne).floor(),V.copy(_e).multiplyScalar(ne).floor(),F=st;if(St.bindFramebuffer(re.FRAMEBUFFER,oe)&&Kt.drawBuffers&&ue&&St.drawBuffers(L,oe),St.viewport(R),St.scissor(V),St.setScissorTest(F),ot){let Ht=zt.get(L.texture);re.framebufferTexture2D(re.FRAMEBUFFER,re.COLOR_ATTACHMENT0,re.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ht.__webglTexture,ae)}else if(Tt){let Ht=zt.get(L.texture),Vt=j||0;re.framebufferTextureLayer(re.FRAMEBUFFER,re.COLOR_ATTACHMENT0,Ht.__webglTexture,ae||0,Vt)}H=-1},this.readRenderTargetPixels=function(L,j,ae,ue,oe,ot,Tt){if(!(L&&L.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let kt=zt.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&Tt!==void 0&&(kt=kt[Tt]),kt){St.bindFramebuffer(re.FRAMEBUFFER,kt);try{let Ht=L.texture,Vt=Ht.format,qe=Ht.type;if(Vt!==ns&&mt.convert(Vt)!==re.getParameter(re.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let Gt=qe===no&&(Ot.has("EXT_color_buffer_half_float")||Kt.isWebGL2&&Ot.has("EXT_color_buffer_float"));if(qe!==Er&&mt.convert(qe)!==re.getParameter(re.IMPLEMENTATION_COLOR_READ_TYPE)&&!(qe===Fs&&(Kt.isWebGL2||Ot.has("OES_texture_float")||Ot.has("WEBGL_color_buffer_float")))&&!Gt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}j>=0&&j<=L.width-ue&&ae>=0&&ae<=L.height-oe&&re.readPixels(j,ae,ue,oe,mt.convert(Vt),mt.convert(qe),ot)}finally{let Ht=C!==null?zt.get(C).__webglFramebuffer:null;St.bindFramebuffer(re.FRAMEBUFFER,Ht)}}},this.copyFramebufferToTexture=function(L,j,ae=0){let ue=Math.pow(2,-ae),oe=Math.floor(j.image.width*ue),ot=Math.floor(j.image.height*ue);D.setTexture2D(j,0),re.copyTexSubImage2D(re.TEXTURE_2D,ae,0,0,L.x,L.y,oe,ot),St.unbindTexture()},this.copyTextureToTexture=function(L,j,ae,ue=0){let oe=j.image.width,ot=j.image.height,Tt=mt.convert(ae.format),kt=mt.convert(ae.type);D.setTexture2D(ae,0),re.pixelStorei(re.UNPACK_FLIP_Y_WEBGL,ae.flipY),re.pixelStorei(re.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ae.premultiplyAlpha),re.pixelStorei(re.UNPACK_ALIGNMENT,ae.unpackAlignment),j.isDataTexture?re.texSubImage2D(re.TEXTURE_2D,ue,L.x,L.y,oe,ot,Tt,kt,j.image.data):j.isCompressedTexture?re.compressedTexSubImage2D(re.TEXTURE_2D,ue,L.x,L.y,j.mipmaps[0].width,j.mipmaps[0].height,Tt,j.mipmaps[0].data):re.texSubImage2D(re.TEXTURE_2D,ue,L.x,L.y,Tt,kt,j.image),ue===0&&ae.generateMipmaps&&re.generateMipmap(re.TEXTURE_2D),St.unbindTexture()},this.copyTextureToTexture3D=function(L,j,ae,ue,oe=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let ot=L.max.x-L.min.x+1,Tt=L.max.y-L.min.y+1,kt=L.max.z-L.min.z+1,Ht=mt.convert(ue.format),Vt=mt.convert(ue.type),qe;if(ue.isData3DTexture)D.setTexture3D(ue,0),qe=re.TEXTURE_3D;else if(ue.isDataArrayTexture||ue.isCompressedArrayTexture)D.setTexture2DArray(ue,0),qe=re.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}re.pixelStorei(re.UNPACK_FLIP_Y_WEBGL,ue.flipY),re.pixelStorei(re.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ue.premultiplyAlpha),re.pixelStorei(re.UNPACK_ALIGNMENT,ue.unpackAlignment);let Gt=re.getParameter(re.UNPACK_ROW_LENGTH),Wt=re.getParameter(re.UNPACK_IMAGE_HEIGHT),bi=re.getParameter(re.UNPACK_SKIP_PIXELS),Gn=re.getParameter(re.UNPACK_SKIP_ROWS),ys=re.getParameter(re.UNPACK_SKIP_IMAGES),Fn=ae.isCompressedTexture?ae.mipmaps[oe]:ae.image;re.pixelStorei(re.UNPACK_ROW_LENGTH,Fn.width),re.pixelStorei(re.UNPACK_IMAGE_HEIGHT,Fn.height),re.pixelStorei(re.UNPACK_SKIP_PIXELS,L.min.x),re.pixelStorei(re.UNPACK_SKIP_ROWS,L.min.y),re.pixelStorei(re.UNPACK_SKIP_IMAGES,L.min.z),ae.isDataTexture||ae.isData3DTexture?re.texSubImage3D(qe,oe,j.x,j.y,j.z,ot,Tt,kt,Ht,Vt,Fn.data):ae.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),re.compressedTexSubImage3D(qe,oe,j.x,j.y,j.z,ot,Tt,kt,Ht,Fn.data)):re.texSubImage3D(qe,oe,j.x,j.y,j.z,ot,Tt,kt,Ht,Vt,Fn),re.pixelStorei(re.UNPACK_ROW_LENGTH,Gt),re.pixelStorei(re.UNPACK_IMAGE_HEIGHT,Wt),re.pixelStorei(re.UNPACK_SKIP_PIXELS,bi),re.pixelStorei(re.UNPACK_SKIP_ROWS,Gn),re.pixelStorei(re.UNPACK_SKIP_IMAGES,ys),oe===0&&ue.generateMipmaps&&re.generateMipmap(qe),St.unbindTexture()},this.initTexture=function(L){L.isCubeTexture?D.setTextureCube(L,0):L.isData3DTexture?D.setTexture3D(L,0):L.isDataArrayTexture||L.isCompressedArrayTexture?D.setTexture2DArray(L,0):D.setTexture2D(L,0),St.unbindTexture()},this.resetState=function(){P=0,w=0,C=null,St.reset(),Me.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Bs}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=e===pf?"display-p3":"srgb",t.unpackColorSpace=bn.workingColorSpace===Vl?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Vn?eo:i0}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===eo?Vn:di}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}},Vh=class extends Xa{};Vh.prototype.isWebGL1Renderer=!0;Rr=class extends Yn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}},qa=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Th,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Ts()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ts()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ts()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Hi=new T,Ya=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Hi.fromBufferAttribute(this,t),Hi.applyMatrix4(e),this.setXYZ(t,Hi.x,Hi.y,Hi.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Hi.fromBufferAttribute(this,t),Hi.applyNormalMatrix(e),this.setXYZ(t,Hi.x,Hi.y,Hi.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Hi.fromBufferAttribute(this,t),Hi.transformDirection(e),this.setXYZ(t,Hi.x,Hi.y,Hi.z);return this}setX(e,t){return this.normalized&&(t=Pn(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Pn(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Pn(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Pn(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Us(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Us(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Us(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Us(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pn(t,this.array),n=Pn(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pn(t,this.array),n=Pn(n,this.array),i=Pn(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pn(t,this.array),n=Pn(n,this.array),i=Pn(i,this.array),r=Pn(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new wn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},bm=new T,Mm=new Nn,Em=new Nn,PE=new T,Sm=new bt,Zc=new T,fh=new ei,Tm=new bt,dh=new nr,yl=class extends Mn{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=op,this.bindMatrix=new bt,this.bindMatrixInverse=new bt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new on),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Zc),this.boundingBox.expandByPoint(Zc)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new ei),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Zc),this.boundingSphere.expandByPoint(Zc)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),fh.copy(this.boundingSphere),fh.applyMatrix4(i),e.ray.intersectsSphere(fh)!==!1&&(Tm.copy(i).invert(),dh.copy(e.ray).applyMatrix4(Tm),!(this.boundingBox!==null&&dh.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,dh)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Nn,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===op?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===sy?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;Mm.fromBufferAttribute(i.attributes.skinIndex,e),Em.fromBufferAttribute(i.attributes.skinWeight,e),bm.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let o=Em.getComponent(r);if(o!==0){let a=Mm.getComponent(r);Sm.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(PE.copy(bm).applyMatrix4(Sm),o)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}},ja=class extends Yn{constructor(){super(),this.isBone=!0,this.type="Bone"}},_l=class extends ki{constructor(e=null,t=1,n=1,i,r,o,a,c,l=ui,u=ui,h,f){super(null,o,a,c,l,u,i,r,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},wm=new bt,IE=new bt,vl=class s{constructor(e=[],t=[]){this.uuid=Ts(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new bt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new bt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:IE;wm.multiplyMatrices(a,t[r]),wm.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new _l(t,e,e,ns,Fs);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let r=e.bones[n],o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new ja),this.bones.push(o),this.boneInverses.push(new bt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){let o=t[i];e.bones.push(o.uuid);let a=n[i];e.boneInverses.push(a.toArray())}return e}},ro=class extends wn{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Do=new bt,Am=new bt,Kc=[],Rm=new on,LE=new bt,Ca=new Mn,Pa=new ei,bl=class extends Mn{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ro(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,LE)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new on),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Do),Rm.copy(e.boundingBox).applyMatrix4(Do),this.boundingBox.union(Rm)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ei),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Do),Pa.copy(e.boundingSphere).applyMatrix4(Do),this.boundingSphere.union(Pa)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Ca.geometry=this.geometry,Ca.material=this.material,Ca.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Pa.copy(this.boundingSphere),Pa.applyMatrix4(n),e.ray.intersectsSphere(Pa)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Do),Am.multiplyMatrices(n,Do),Ca.matrixWorld=Am,Ca.raycast(e,Kc);for(let o=0,a=Kc.length;o<a;o++){let c=Kc[o];c.instanceId=r,c.object=this,t.push(c)}Kc.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ro(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}};Gh=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t){let n=this.pool,i=this.list;this.index>=n.length&&n.push({start:-1,count:-1,z:-1});let r=n[this.index];i.push(r),this.index++,r.start=e.start,r.count=e.count,r.z=t}reset(){this.list.length=0,this.index=0}},Uo="batchId",yr=new bt,Cm=new bt,UE=new bt,Pm=new bt,ph=new wr,Jc=new on,Zr=new ei,Ia=new T,mh=new Gh,Bi=new Mn,$c=[];Ml=class extends Mn{get maxGeometryCount(){return this._maxGeometryCount}constructor(e,t,n=t*2,i){super(new wi,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._drawRanges=[],this._reservedRanges=[],this._visibility=[],this._active=[],this._bounds=[],this._maxGeometryCount=e,this._maxVertexCount=t,this._maxIndexCount=n,this._geometryInitialized=!1,this._geometryCount=0,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._visibilityChanged=!0,this._matricesTexture=null,this._initMatricesTexture()}_initMatricesTexture(){let e=Math.sqrt(this._maxGeometryCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4),n=new _l(t,e,e,ns,Fs);this._matricesTexture=n}_initializeGeometry(e){let t=this.geometry,n=this._maxVertexCount,i=this._maxGeometryCount,r=this._maxIndexCount;if(this._geometryInitialized===!1){for(let a in e.attributes){let c=e.getAttribute(a),{array:l,itemSize:u,normalized:h}=c,f=new l.constructor(n*u),d=new c.constructor(f,u,h);d.setUsage(c.usage),t.setAttribute(a,d)}if(e.getIndex()!==null){let a=n>65536?new Uint32Array(r):new Uint16Array(r);t.setIndex(new wn(a,1))}let o=i>65536?new Uint32Array(n):new Uint16Array(n);t.setAttribute(Uo,new wn(o,1)),this._geometryInitialized=!0}}_validateGeometry(e){if(e.getAttribute(Uo))throw new Error(`BatchedMesh: Geometry cannot use attribute "${Uo}"`);let t=this.geometry;if(!!e.getIndex()!=!!t.getIndex())throw new Error('BatchedMesh: All geometries must consistently have "index".');for(let n in t.attributes){if(n===Uo)continue;if(!e.hasAttribute(n))throw new Error(`BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);let i=e.getAttribute(n),r=t.getAttribute(n);if(i.itemSize!==r.itemSize||i.normalized!==r.normalized)throw new Error("BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new on);let e=this._geometryCount,t=this.boundingBox,n=this._active;t.makeEmpty();for(let i=0;i<e;i++)n[i]!==!1&&(this.getMatrixAt(i,yr),this.getBoundingBoxAt(i,Jc).applyMatrix4(yr),t.union(Jc))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ei);let e=this._geometryCount,t=this.boundingSphere,n=this._active;t.makeEmpty();for(let i=0;i<e;i++)n[i]!==!1&&(this.getMatrixAt(i,yr),this.getBoundingSphereAt(i,Zr).applyMatrix4(yr),t.union(Zr))}addGeometry(e,t=-1,n=-1){if(this._initializeGeometry(e),this._validateGeometry(e),this._geometryCount>=this._maxGeometryCount)throw new Error("BatchedMesh: Maximum geometry count reached.");let i={vertexStart:-1,vertexCount:-1,indexStart:-1,indexCount:-1},r=null,o=this._reservedRanges,a=this._drawRanges,c=this._bounds;this._geometryCount!==0&&(r=o[o.length-1]),t===-1?i.vertexCount=e.getAttribute("position").count:i.vertexCount=t,r===null?i.vertexStart=0:i.vertexStart=r.vertexStart+r.vertexCount;let l=e.getIndex(),u=l!==null;if(u&&(n===-1?i.indexCount=l.count:i.indexCount=n,r===null?i.indexStart=0:i.indexStart=r.indexStart+r.indexCount),i.indexStart!==-1&&i.indexStart+i.indexCount>this._maxIndexCount||i.vertexStart+i.vertexCount>this._maxVertexCount)throw new Error("BatchedMesh: Reserved space request exceeds the maximum buffer size.");let h=this._visibility,f=this._active,d=this._matricesTexture,g=this._matricesTexture.image.data;h.push(!0),f.push(!0);let _=this._geometryCount;this._geometryCount++,UE.toArray(g,_*16),d.needsUpdate=!0,o.push(i),a.push({start:u?i.indexStart:i.vertexStart,count:-1}),c.push({boxInitialized:!1,box:new on,sphereInitialized:!1,sphere:new ei});let m=this.geometry.getAttribute(Uo);for(let p=0;p<i.vertexCount;p++)m.setX(i.vertexStart+p,_);return m.needsUpdate=!0,this.setGeometryAt(_,e),_}setGeometryAt(e,t){if(e>=this._geometryCount)throw new Error("BatchedMesh: Maximum geometry count reached.");this._validateGeometry(t);let n=this.geometry,i=n.getIndex()!==null,r=n.getIndex(),o=t.getIndex(),a=this._reservedRanges[e];if(i&&o.count>a.indexCount||t.attributes.position.count>a.vertexCount)throw new Error("BatchedMesh: Reserved space not large enough for provided geometry.");let c=a.vertexStart,l=a.vertexCount;for(let d in n.attributes){if(d===Uo)continue;let g=t.getAttribute(d),_=n.getAttribute(d);FE(g,_,c);let m=g.itemSize;for(let p=g.count,v=l;p<v;p++){let x=c+p;for(let b=0;b<m;b++)_.setComponent(x,b,0)}_.needsUpdate=!0}if(i){let d=a.indexStart;for(let g=0;g<o.count;g++)r.setX(d+g,c+o.getX(g));for(let g=o.count,_=a.indexCount;g<_;g++)r.setX(d+g,c);r.needsUpdate=!0}let u=this._bounds[e];t.boundingBox!==null?(u.box.copy(t.boundingBox),u.boxInitialized=!0):u.boxInitialized=!1,t.boundingSphere!==null?(u.sphere.copy(t.boundingSphere),u.sphereInitialized=!0):u.sphereInitialized=!1;let h=this._drawRanges[e],f=t.getAttribute("position");return h.count=i?o.count:f.count,this._visibilityChanged=!0,e}deleteGeometry(e){let t=this._active;return e>=t.length||t[e]===!1?this:(t[e]=!1,this._visibilityChanged=!0,this)}getBoundingBoxAt(e,t){if(this._active[e]===!1)return this;let i=this._bounds[e],r=i.box,o=this.geometry;if(i.boxInitialized===!1){r.makeEmpty();let a=o.index,c=o.attributes.position,l=this._drawRanges[e];for(let u=l.start,h=l.start+l.count;u<h;u++){let f=u;a&&(f=a.getX(f)),r.expandByPoint(Ia.fromBufferAttribute(c,f))}i.boxInitialized=!0}return t.copy(r),t}getBoundingSphereAt(e,t){if(this._active[e]===!1)return this;let i=this._bounds[e],r=i.sphere,o=this.geometry;if(i.sphereInitialized===!1){r.makeEmpty(),this.getBoundingBoxAt(e,Jc),Jc.getCenter(r.center);let a=o.index,c=o.attributes.position,l=this._drawRanges[e],u=0;for(let h=l.start,f=l.start+l.count;h<f;h++){let d=h;a&&(d=a.getX(d)),Ia.fromBufferAttribute(c,d),u=Math.max(u,r.center.distanceToSquared(Ia))}r.radius=Math.sqrt(u),i.sphereInitialized=!0}return t.copy(r),t}setMatrixAt(e,t){let n=this._active,i=this._matricesTexture,r=this._matricesTexture.image.data,o=this._geometryCount;return e>=o||n[e]===!1?this:(t.toArray(r,e*16),i.needsUpdate=!0,this)}getMatrixAt(e,t){let n=this._active,i=this._matricesTexture.image.data,r=this._geometryCount;return e>=r||n[e]===!1?null:t.fromArray(i,e*16)}setVisibleAt(e,t){let n=this._visibility,i=this._active,r=this._geometryCount;return e>=r||i[e]===!1||n[e]===t?this:(n[e]=t,this._visibilityChanged=!0,this)}getVisibleAt(e){let t=this._visibility,n=this._active,i=this._geometryCount;return e>=i||n[e]===!1?!1:t[e]}raycast(e,t){let n=this._visibility,i=this._active,r=this._drawRanges,o=this._geometryCount,a=this.matrixWorld,c=this.geometry;Bi.material=this.material,Bi.geometry.index=c.index,Bi.geometry.attributes=c.attributes,Bi.geometry.boundingBox===null&&(Bi.geometry.boundingBox=new on),Bi.geometry.boundingSphere===null&&(Bi.geometry.boundingSphere=new ei);for(let l=0;l<o;l++){if(!n[l]||!i[l])continue;let u=r[l];Bi.geometry.setDrawRange(u.start,u.count),this.getMatrixAt(l,Bi.matrixWorld).premultiply(a),this.getBoundingBoxAt(l,Bi.geometry.boundingBox),this.getBoundingSphereAt(l,Bi.geometry.boundingSphere),Bi.raycast(e,$c);for(let h=0,f=$c.length;h<f;h++){let d=$c[h];d.object=this,d.batchId=l,t.push(d)}$c.length=0}Bi.material=null,Bi.geometry.index=null,Bi.geometry.attributes={},Bi.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._drawRanges=e._drawRanges.map(t=>({...t})),this._reservedRanges=e._reservedRanges.map(t=>({...t})),this._visibility=e._visibility.slice(),this._active=e._active.slice(),this._bounds=e._bounds.map(t=>({boxInitialized:t.boxInitialized,box:t.box.clone(),sphereInitialized:t.sphereInitialized,sphere:t.sphere.clone()})),this._maxGeometryCount=e._maxGeometryCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._geometryCount=e._geometryCount,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.slice(),this}dispose(){return this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this}onBeforeRender(e,t,n,i,r){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;let o=i.getIndex(),a=o===null?1:o.array.BYTES_PER_ELEMENT,c=this._visibility,l=this._multiDrawStarts,u=this._multiDrawCounts,h=this._drawRanges,f=this.perObjectFrustumCulled;f&&(Pm.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),ph.setFromProjectionMatrix(Pm,e.isWebGPURenderer?Ha:Bs));let d=0;if(this.sortObjects){Cm.copy(this.matrixWorld).invert(),Ia.setFromMatrixPosition(n.matrixWorld).applyMatrix4(Cm);for(let m=0,p=c.length;m<p;m++)if(c[m]){this.getMatrixAt(m,yr),this.getBoundingSphereAt(m,Zr).applyMatrix4(yr);let v=!1;if(f&&(v=!ph.intersectsSphere(Zr)),!v){let x=Ia.distanceTo(Zr.center);mh.push(h[m],x)}}let g=mh.list,_=this.customSort;_===null?g.sort(r.transparent?DE:NE):_.call(this,g,n);for(let m=0,p=g.length;m<p;m++){let v=g[m];l[d]=v.start*a,u[d]=v.count,d++}mh.reset()}else for(let g=0,_=c.length;g<_;g++)if(c[g]){let m=!1;if(f&&(this.getMatrixAt(g,yr),this.getBoundingSphereAt(g,Zr).applyMatrix4(yr),m=!ph.intersectsSphere(Zr)),!m){let p=h[g];l[d]=p.start*a,u[d]=p.count,d++}}this._multiDrawCount=d,this._visibilityChanged=!1}onBeforeShadow(e,t,n,i,r,o){this.onBeforeRender(e,null,i,r,o)}},Za=class extends ss{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Pt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Im=new T,Lm=new T,Nm=new bt,gh=new nr,Qc=new ei,Jo=class extends Yn{constructor(e=new wi,t=new Za){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Im.fromBufferAttribute(t,i-1),Lm.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Im.distanceTo(Lm);e.setAttribute("lineDistance",new fi(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Qc.copy(n.boundingSphere),Qc.applyMatrix4(i),Qc.radius+=r,e.ray.intersectsSphere(Qc)===!1)return;Nm.copy(i).invert(),gh.copy(e.ray).applyMatrix4(Nm);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=new T,u=new T,h=new T,f=new T,d=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){let p=Math.max(0,o.start),v=Math.min(g.count,o.start+o.count);for(let x=p,b=v-1;x<b;x+=d){let P=g.getX(x),w=g.getX(x+1);if(l.fromBufferAttribute(m,P),u.fromBufferAttribute(m,w),gh.distanceSqToSegment(l,u,f,h)>c)continue;f.applyMatrix4(this.matrixWorld);let H=e.ray.origin.distanceTo(f);H<e.near||H>e.far||t.push({distance:H,point:h.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{let p=Math.max(0,o.start),v=Math.min(m.count,o.start+o.count);for(let x=p,b=v-1;x<b;x+=d){if(l.fromBufferAttribute(m,x),u.fromBufferAttribute(m,x+1),gh.distanceSqToSegment(l,u,f,h)>c)continue;f.applyMatrix4(this.matrixWorld);let w=e.ray.origin.distanceTo(f);w<e.near||w>e.far||t.push({distance:w,point:h.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}},Dm=new T,Um=new T,El=class extends Jo{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Dm.fromBufferAttribute(t,i),Um.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Dm.distanceTo(Um);e.setAttribute("lineDistance",new fi(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Sl=class extends Jo{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Ka=class extends ss{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Pt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Fm=new bt,Wh=new nr,el=new ei,tl=new T,Tl=class extends Yn{constructor(e=new wi,t=new Ka){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),el.copy(n.boundingSphere),el.applyMatrix4(i),el.radius+=r,e.ray.intersectsSphere(el)===!1)return;Fm.copy(i).invert(),Wh.copy(e.ray).applyMatrix4(Fm);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,h=n.attributes.position;if(l!==null){let f=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let g=f,_=d;g<_;g++){let m=l.getX(g);tl.fromBufferAttribute(h,m),Bm(tl,m,c,i,e,t,this)}}else{let f=Math.max(0,o.start),d=Math.min(h.count,o.start+o.count);for(let g=f,_=d;g<_;g++)tl.fromBufferAttribute(h,g),Bm(tl,g,c,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};ws=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){let n=this.getLengths(),i=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-o,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===o)return i/(r-1);let u=n[i],f=n[i+1]-u,d=(o-u)/f;return(i+d)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);let o=this.getPoint(i),a=this.getPoint(r),c=t||(o.isVector2?new tt:new T);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){let n=new T,i=[],r=[],o=[],a=new T,c=new bt;for(let d=0;d<=e;d++){let g=d/e;i[d]=this.getTangentAt(g,new T)}r[0]=new T,o[0]=new T;let l=Number.MAX_VALUE,u=Math.abs(i[0].x),h=Math.abs(i[0].y),f=Math.abs(i[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),f<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(i[d-1],i[d]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(ri(i[d-1].dot(i[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,g))}o[d].crossVectors(i[d],r[d])}if(t===!0){let d=Math.acos(ri(r[0].dot(r[e]),-1,1));d/=e,i[0].dot(a.crossVectors(r[0],r[e]))>0&&(d=-d);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(i[g],d*g)),o[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},wl=class extends ws{constructor(e=0,t=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t){let n=t||new tt,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);let a=this.aStartAngle+e*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*u-d*h+this.aX,l=f*h+d*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Xh=class extends wl{constructor(e,t,n,i,r,o){super(e,t,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};nl=new T,xh=new xf,yh=new xf,_h=new xf,Ja=class extends ws{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new T){let n=t,i=this.points,r=i.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,u;this.closed||a>0?l=i[(a-1)%r]:(nl.subVectors(i[0],i[1]).add(i[0]),l=nl);let h=i[a%r],f=i[(a+1)%r];if(this.closed||a+2<r?u=i[(a+2)%r]:(nl.subVectors(i[r-1],i[r-2]).add(i[r-1]),u=nl),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(h),d),_=Math.pow(h.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(u),d);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),xh.initNonuniformCatmullRom(l.x,h.x,f.x,u.x,g,_,m),yh.initNonuniformCatmullRom(l.y,h.y,f.y,u.y,g,_,m),_h.initNonuniformCatmullRom(l.z,h.z,f.z,u.z,g,_,m)}else this.curveType==="catmullrom"&&(xh.initCatmullRom(l.x,h.x,f.x,u.x,this.tension),yh.initCatmullRom(l.y,h.y,f.y,u.y,this.tension),_h.initCatmullRom(l.z,h.z,f.z,u.z,this.tension));return n.set(xh.calc(c),yh.calc(c),_h.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new T().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};qh=class extends ws{constructor(e=new tt,t=new tt,n=new tt,i=new tt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new tt){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(ka(e,i.x,r.x,o.x,a.x),ka(e,i.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Yh=class extends ws{constructor(e=new T,t=new T,n=new T,i=new T){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new T){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(ka(e,i.x,r.x,o.x,a.x),ka(e,i.y,r.y,o.y,a.y),ka(e,i.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},jh=class extends ws{constructor(e=new tt,t=new tt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new tt){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new tt){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Zh=class extends ws{constructor(e=new T,t=new T){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new T){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new T){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Kh=class extends ws{constructor(e=new tt,t=new tt,n=new tt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new tt){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(Oa(e,i.x,r.x,o.x),Oa(e,i.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Al=class extends ws{constructor(e=new T,t=new T,n=new T){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new T){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(Oa(e,i.x,r.x,o.x),Oa(e,i.y,r.y,o.y),Oa(e,i.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Jh=class extends ws{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new tt){let n=t,i=this.points,r=(i.length-1)*e,o=Math.floor(r),a=r-o,c=i[o===0?o:o-1],l=i[o],u=i[o>i.length-2?i.length-1:o+1],h=i[o>i.length-3?i.length-1:o+2];return n.set(Om(a,c.x,l.x,u.x,h.x),Om(a,c.y,l.y,u.y,h.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new tt().fromArray(i))}return this}},WE=Object.freeze({__proto__:null,ArcCurve:Xh,CatmullRomCurve3:Ja,CubicBezierCurve:qh,CubicBezierCurve3:Yh,EllipseCurve:wl,LineCurve:jh,LineCurve3:Zh,QuadraticBezierCurve:Kh,QuadraticBezierCurve3:Al,SplineCurve:Jh}),Rl=class s extends wi{constructor(e=new Al(new T(-1,-1,0),new T(-1,1,0),new T(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};let o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new T,c=new T,l=new tt,u=new T,h=[],f=[],d=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new fi(h,3)),this.setAttribute("normal",new fi(f,3)),this.setAttribute("uv",new fi(d,2));function _(){for(let x=0;x<t;x++)m(x);m(r===!1?t:0),v(),p()}function m(x){u=e.getPointAt(x/t,u);let b=o.normals[x],P=o.binormals[x];for(let w=0;w<=i;w++){let C=w/i*Math.PI*2,H=Math.sin(C),M=-Math.cos(C);c.x=M*b.x+H*P.x,c.y=M*b.y+H*P.y,c.z=M*b.z+H*P.z,c.normalize(),f.push(c.x,c.y,c.z),a.x=u.x+n*c.x,a.y=u.y+n*c.y,a.z=u.z+n*c.z,h.push(a.x,a.y,a.z)}}function p(){for(let x=1;x<=t;x++)for(let b=1;b<=i;b++){let P=(i+1)*(x-1)+(b-1),w=(i+1)*x+(b-1),C=(i+1)*x+b,H=(i+1)*(x-1)+b;g.push(P,w,H),g.push(w,C,H)}}function v(){for(let x=0;x<=t;x++)for(let b=0;b<=i;b++)l.x=x/t,l.y=b/i,d.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new s(new WE[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},Cr=class extends ss{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Pt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Pt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=s0,this.normalScale=new tt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ps=class extends Cr{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new tt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ri(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Pt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Pt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Pt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};Pr=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},$h=class extends Pr{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Lp,endingEnd:Lp}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,o=e+1,a=i[r],c=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Np:r=e,a=2*t-n;break;case Dp:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Np:o=e,c=2*n-t;break;case Dp:o=1,c=n+i[1]-i[0];break;default:o=e-1,c=t}let l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,d=this._weightNext,g=(n-t)/(i-t),_=g*g,m=_*g,p=-f*m+2*f*_-f*g,v=(1+f)*m+(-1.5-2*f)*_+(-.5+f)*g+1,x=(-1-d)*m+(1.5+d)*_+.5*g,b=d*m-d*_;for(let P=0;P!==a;++P)r[P]=p*o[u+P]+v*o[l+P]+x*o[c+P]+b*o[h+P];return r}},Qh=class extends Pr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(n-t)/(i-t),h=1-u;for(let f=0;f!==a;++f)r[f]=o[l+f]*h+o[c+f]*u;return r}},ef=class extends Pr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},ms=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=il(t,this.TimeBufferType),this.values=il(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:il(e.times,Array),values:il(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new ef(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Qh(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new $h(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Xo:t=this.InterpolantFactoryMethodDiscrete;break;case io:t=this.InterpolantFactoryMethodLinear;break;case Gu:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Xo;case this.InterpolantFactoryMethodLinear:return io;case this.InterpolantFactoryMethodSmooth:return Gu}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(i!==void 0&&XE(i))for(let a=0,c=i.length;a!==c;++a){let l=i[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Gu,r=e.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(i)c=!0;else{let h=a*n,f=h-n,d=h+n;for(let g=0;g!==n;++g){let _=t[h+g];if(_!==t[f+g]||_!==t[d+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let h=a*n,f=o*n;for(let d=0;d!==n;++d)t[f+d]=t[h+d]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};ms.prototype.TimeBufferType=Float32Array;ms.prototype.ValueBufferType=Float32Array;ms.prototype.DefaultInterpolation=io;Ir=class extends ms{};Ir.prototype.ValueTypeName="bool";Ir.prototype.ValueBufferType=Array;Ir.prototype.DefaultInterpolation=Xo;Ir.prototype.InterpolantFactoryMethodLinear=void 0;Ir.prototype.InterpolantFactoryMethodSmooth=void 0;Cl=class extends ms{};Cl.prototype.ValueTypeName="color";ir=class extends ms{};ir.prototype.ValueTypeName="number";tf=class extends Pr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(i-t),l=e*a;for(let u=l+a;l!==u;l+=4)pi.slerpFlat(r,0,o,l-a,o,l,c);return r}},ks=class extends ms{InterpolantFactoryMethodLinear(e){return new tf(this.times,this.values,this.getValueSize(),e)}};ks.prototype.ValueTypeName="quaternion";ks.prototype.DefaultInterpolation=io;ks.prototype.InterpolantFactoryMethodSmooth=void 0;Lr=class extends ms{};Lr.prototype.ValueTypeName="string";Lr.prototype.ValueBufferType=Array;Lr.prototype.DefaultInterpolation=Xo;Lr.prototype.InterpolantFactoryMethodLinear=void 0;Lr.prototype.InterpolantFactoryMethodSmooth=void 0;sr=class extends ms{};sr.prototype.ValueTypeName="vector";Pl=class{constructor(e,t=-1,n,i=dy){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Ts(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(jE(n[o]).scale(i));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(ms.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let r=t.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);let u=qE(c);c=km(c,1,u),l=km(l,1,u),!i&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new ir(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){let l=e[a],u=l.name.match(r);if(u&&u.length>1){let h=u[1],f=i[h];f||(i[h]=f=[]),f.push(l)}}let o=[];for(let a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(h,f,d,g,_){if(d.length!==0){let m=[],p=[];m0(d,m,p,g),m.length!==0&&_.push(new h(f,m,p))}},i=[],r=e.name||"default",o=e.fps||30,a=e.blendMode,c=e.length||-1,l=e.hierarchy||[];for(let h=0;h<l.length;h++){let f=l[h].keys;if(!(!f||f.length===0))if(f[0].morphTargets){let d={},g;for(g=0;g<f.length;g++)if(f[g].morphTargets)for(let _=0;_<f[g].morphTargets.length;_++)d[f[g].morphTargets[_]]=-1;for(let _ in d){let m=[],p=[];for(let v=0;v!==f[g].morphTargets.length;++v){let x=f[g];m.push(x.time),p.push(x.morphTarget===_?1:0)}i.push(new ir(".morphTargetInfluence["+_+"]",m,p))}c=d.length*o}else{let d=".bones["+t[h].name+"]";n(sr,d+".position",f,"pos",i),n(ks,d+".quaternion",f,"rot",i),n(sr,d+".scale",f,"scl",i)}}return i.length===0?null:new this(r,c,i,a)}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};vr={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}},nf=class{constructor(e,t,n){let i=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,r===!1&&i.onStart!==void 0&&i.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,i.onProgress!==void 0&&i.onProgress(u,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){let h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=l.length;h<f;h+=2){let d=l[h],g=l[h+1];if(d.global&&(d.lastIndex=0),d.test(u))return g}return null}}},ZE=new nf,rr=class{constructor(e){this.manager=e!==void 0?e:ZE,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};rr.DEFAULT_MATERIAL_NAME="__DEFAULT";er={},sf=class extends Error{constructor(e,t){super(e),this.response=t}},$a=class extends rr{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=vr.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(er[e]!==void 0){er[e].push({onLoad:t,onProgress:n,onError:i});return}er[e]=[],er[e].push({onLoad:t,onProgress:n,onError:i});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream=="undefined"||l.body===void 0||l.body.getReader===void 0)return l;let u=er[e],h=l.body.getReader(),f=l.headers.get("Content-Length")||l.headers.get("X-File-Size"),d=f?parseInt(f):0,g=d!==0,_=0,m=new ReadableStream({start(p){v();function v(){h.read().then(({done:x,value:b})=>{if(x)p.close();else{_+=b.byteLength;let P=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:d});for(let w=0,C=u.length;w<C;w++){let H=u[w];H.onProgress&&H.onProgress(P)}p.enqueue(b),v()}})}}});return new Response(m)}else throw new sf(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return l.json();default:if(a===void 0)return l.text();{let h=/charset="?([^;"\s]*)"?/i.exec(a),f=h&&h[1]?h[1].toLowerCase():void 0,d=new TextDecoder(f);return l.arrayBuffer().then(g=>d.decode(g))}}}).then(l=>{vr.add(e,l);let u=er[e];delete er[e];for(let h=0,f=u.length;h<f;h++){let d=u[h];d.onLoad&&d.onLoad(l)}}).catch(l=>{let u=er[e];if(u===void 0)throw this.manager.itemError(e),l;delete er[e];for(let h=0,f=u.length;h<f;h++){let d=u[h];d.onError&&d.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}},rf=class extends rr{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=vr.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;let a=Va("img");function c(){u(),vr.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(h){u(),i&&i(h),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}},Il=class extends rr{constructor(e){super(e)}load(e,t,n,i){let r=new ki,o=new rf(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}},$o=class extends Yn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Pt(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}},Ll=class extends $o{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Yn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Pt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},vh=new bt,zm=new T,Hm=new T,Qa=class{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new tt(512,512),this.map=null,this.mapPass=null,this.matrix=new bt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new wr,this._frameExtents=new tt(1,1),this._viewportCount=1,this._viewports=[new Nn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;zm.setFromMatrixPosition(e.matrixWorld),t.position.copy(zm),Hm.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Hm),t.updateMatrixWorld(),vh.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(vh),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(vh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},of=class extends Qa{constructor(){super(new hi(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,n=qo*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Nl=class extends $o{constructor(e,t,n=0,i=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Yn.DEFAULT_UP),this.updateMatrix(),this.target=new Yn,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new of}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Vm=new bt,La=new T,bh=new T,af=class extends Qa{constructor(){super(new hi(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new tt(4,2),this._viewportCount=6,this._viewports=[new Nn(2,1,1,1),new Nn(0,1,1,1),new Nn(3,1,1,1),new Nn(1,1,1,1),new Nn(3,0,1,1),new Nn(1,0,1,1)],this._cubeDirections=[new T(1,0,0),new T(-1,0,0),new T(0,0,1),new T(0,0,-1),new T(0,1,0),new T(0,-1,0)],this._cubeUps=[new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,0,1),new T(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),La.setFromMatrixPosition(e.matrixWorld),n.position.copy(La),bh.copy(n.position),bh.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(bh),n.updateMatrixWorld(),i.makeTranslation(-La.x,-La.y,-La.z),Vm.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Vm)}},Dl=class extends $o{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new af}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},cf=class extends Qa{constructor(){super(new Ar(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Qo=class extends $o{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Yn.DEFAULT_UP),this.updateMatrix(),this.target=new Yn,this.shadow=new cf}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Nr=class{static decodeText(e){if(typeof TextDecoder!="undefined")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}},Ul=class extends rr{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap=="undefined"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch=="undefined"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=vr.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{i&&i(l)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;let c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return vr.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){i&&i(l),vr.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});vr.add(e,c),r.manager.itemStart(e)}},yf="\\[\\]\\.:\\/",KE=new RegExp("["+yf+"]","g"),_f="[^"+yf+"]",JE="[^"+yf.replace("\\.","")+"]",$E=/((?:WC+[\/:])*)/.source.replace("WC",_f),QE=/(WCOD+)?/.source.replace("WCOD",JE),eS=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",_f),tS=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",_f),nS=new RegExp("^"+$E+QE+eS+tS+"$"),iS=["material","materials","bones","map"],lf=class{constructor(e,t,n){let i=n||Bn.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Bn=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(KE,"")}static parseTrackName(e){let t=nS.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);iS.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[i];if(o===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Bn.Composite=lf;Bn.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Bn.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Bn.prototype.GetterByBindingType=[Bn.prototype._getValue_direct,Bn.prototype._getValue_array,Bn.prototype._getValue_arrayElement,Bn.prototype._getValue_toArray];Bn.prototype.SetterByBindingTypeAndVersioning=[[Bn.prototype._setValue_direct,Bn.prototype._setValue_direct_setNeedsUpdate,Bn.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Bn.prototype._setValue_array,Bn.prototype._setValue_array_setNeedsUpdate,Bn.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Bn.prototype._setValue_arrayElement,Bn.prototype._setValue_arrayElement_setNeedsUpdate,Bn.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Bn.prototype._setValue_fromArray,Bn.prototype._setValue_fromArray_setNeedsUpdate,Bn.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];i1=new Float32Array(1),ec=class{constructor(e,t,n=0,i=1/0){this.ray=new nr(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Ga,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return uf(e,this,n,t),n.sort(Gm),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)uf(e[i],this,n,t);return n.sort(Gm),n}};Fl=class{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(ri(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}},Wm=new T,sl=new T,Zi=class{constructor(e=new T,t=new T){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){Wm.subVectors(e,this.start),sl.subVectors(this.end,this.start);let n=sl.dot(sl),r=sl.dot(Wm)/n;return t&&(r=ri(r,0,1)),r}closestPointToPoint(e,t,n){let i=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(i).add(this.start)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}};typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:tc}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=tc)});function vf(s,e){if(e===n0)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===nc||e===Hl){let t=s.getIndex();if(t===null){let o=[],a=s.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);s.setIndex(o),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}let n=t.count-2,i=[];if(e===nc)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}var x0=Ft(()=>{oi()});function sS(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}function aS(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Cr({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Wi})),s.DefaultMaterial}function ao(s,e,t){for(let n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Ur(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function cS(s,e,t){let n=!1,i=!1,r=!1;for(let l=0,u=e.length;l<u;l++){let h=e[l];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(i=!0),h.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);let o=[],a=[],c=[];for(let l=0,u=e.length;l<u;l++){let h=e[l];if(n){let f=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):s.attributes.position;o.push(f)}if(i){let f=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):s.attributes.normal;a.push(f)}if(r){let f=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):s.attributes.color;c.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){let u=l[0],h=l[1],f=l[2];return n&&(s.morphAttributes.position=u),i&&(s.morphAttributes.normal=h),r&&(s.morphAttributes.color=f),s.morphTargetsRelative=!0,s})}function lS(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function uS(s){let e,t=s.extensions&&s.extensions[xn.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Ef(t.attributes):e=s.indices+":"+Ef(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+Ef(s.targets[n]);return e}function Ef(s){let e="",t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function Yf(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function hS(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}function dS(s,e,t){let n=e.attributes,i=new on;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(i.set(new T(c[0],c[1],c[2]),new T(l[0],l[1],l[2])),a.normalized){let u=Yf(ta[a.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let a=new T,c=new T;for(let l=0,u=r.length;l<u;l++){let h=r[l];if(h.POSITION!==void 0){let f=t.json.accessors[h.POSITION],d=f.min,g=f.max;if(d!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(d[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(d[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(d[2]),Math.abs(g[2]))),f.normalized){let _=Yf(ta[f.componentType]);c.multiplyScalar(_)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}s.boundingBox=i;let o=new ei;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=o}function b0(s,e,t){let n=e.attributes,i=[];function r(o,a){return t.getDependency("accessor",o).then(function(c){s.setAttribute(a,c)})}for(let o in n){let a=qf[o]||o.toLowerCase();a in s.attributes||i.push(r(n[o],a))}if(e.indices!==void 0&&!s.index){let o=t.getDependency("accessor",e.indices).then(function(a){s.setIndex(a)});i.push(o)}return bn.workingColorSpace!==di&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${bn.workingColorSpace}" not supported.`),Ur(s,e),dS(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?cS(s,e.targets,t):s})}var Wl,xn,Sf,Tf,wf,Af,Rf,Cf,Pf,If,Lf,Nf,Df,Uf,Ff,Bf,Of,kf,zf,M0,ic,y0,Hf,Vf,Gf,Wf,Xl,rS,Xf,gs,ta,_0,v0,bf,qf,Dr,oS,Mf,fS,jf,E0=Ft(()=>{oi();x0();Wl=class extends rr{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Af(t)}),this.register(function(t){return new Ff(t)}),this.register(function(t){return new Bf(t)}),this.register(function(t){return new Of(t)}),this.register(function(t){return new Cf(t)}),this.register(function(t){return new Pf(t)}),this.register(function(t){return new If(t)}),this.register(function(t){return new Lf(t)}),this.register(function(t){return new wf(t)}),this.register(function(t){return new Nf(t)}),this.register(function(t){return new Rf(t)}),this.register(function(t){return new Uf(t)}),this.register(function(t){return new Df(t)}),this.register(function(t){return new Sf(t)}),this.register(function(t){return new kf(t)}),this.register(function(t){return new zf(t)})}load(e,t,n,i){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let l=Nr.extractUrlBase(e);o=Nr.resolveURL(l,this.path)}else o=Nr.extractUrlBase(e);this.manager.itemStart(e);let a=function(l){i?i(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new $a(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,o,function(u){t(u),r.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r,o={},a={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===M0){try{o[xn.KHR_BINARY_GLTF]=new Hf(e)}catch(h){i&&i(h);return}r=JSON.parse(o[xn.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new jf(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let h=this.pluginCallbacks[u](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[h.name]=h,o[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){let h=r.extensionsUsed[u],f=r.extensionsRequired||[];switch(h){case xn.KHR_MATERIALS_UNLIT:o[h]=new Tf;break;case xn.KHR_DRACO_MESH_COMPRESSION:o[h]=new Vf(r,this.dracoLoader);break;case xn.KHR_TEXTURE_TRANSFORM:o[h]=new Gf;break;case xn.KHR_MESH_QUANTIZATION:o[h]=new Wf;break;default:f.indexOf(h)>=0&&a[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}};xn={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Sf=class{constructor(e){this.parser=e,this.name=xn.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,u=new Pt(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],di);let h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Qo(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Dl(u),l.distance=h;break;case"spot":l=new Nl(u),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,Ur(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}},Tf=class{constructor(){this.name=xn.KHR_MATERIALS_UNLIT}getMaterialType(){return Xi}extendParams(e,t,n){let i=[];e.color=new Pt(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],di),e.opacity=o[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,Vn))}return Promise.all(i)}},wf=class{constructor(e){this.parser=e,this.name=xn.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},Af=class{constructor(e){this.parser=e,this.name=xn.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ps}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){let a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new tt(a,a)}return Promise.all(r)}},Rf=class{constructor(e){this.parser=e,this.name=xn.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ps}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}},Cf=class{constructor(e){this.parser=e,this.name=xn.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ps}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new Pt(0,0,0),t.sheenRoughness=0,t.sheen=1;let o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){let a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],di)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Vn)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}},Pf=class{constructor(e){this.parser=e,this.name=xn.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ps}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}},If=class{constructor(e){this.parser=e,this.name=xn.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ps}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;let a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Pt().setRGB(a[0],a[1],a[2],di),Promise.all(r)}},Lf=class{constructor(e){this.parser=e,this.name=xn.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ps}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},Nf=class{constructor(e){this.parser=e,this.name=xn.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ps}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));let a=o.specularColorFactor||[1,1,1];return t.specularColor=new Pt().setRGB(a[0],a[1],a[2],di),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Vn)),Promise.all(r)}},Df=class{constructor(e){this.parser=e,this.name=xn.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ps}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}},Uf=class{constructor(e){this.parser=e,this.name=xn.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:ps}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}},Ff=class{constructor(e){this.parser=e,this.name=xn.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let r=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}},Bf=class{constructor(e){this.parser=e,this.name=xn.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=i.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Of=class{constructor(e){this.parser=e,this.name=xn.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=i.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},kf=class{constructor(e){this.name=xn.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let c=i.byteOffset||0,l=i.byteLength||0,u=i.count,h=i.byteStride,f=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,h,f,i.mode,i.filter).then(function(d){return d.buffer}):o.ready.then(function(){let d=new ArrayBuffer(u*h);return o.decodeGltfBuffer(new Uint8Array(d),u,h,f,i.mode,i.filter),d})})}else return null}},zf=class{constructor(e){this.name=xn.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let l of i.primitives)if(l.mode!==gs.TRIANGLES&&l.mode!==gs.TRIANGLE_STRIP&&l.mode!==gs.TRIANGLE_FAN&&l.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],c={};for(let l in o)a.push(this.parser.getDependency("accessor",o[l]).then(u=>(c[l]=u,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{let u=l.pop(),h=u.isGroup?u.children:[u],f=l[0].count,d=[];for(let g of h){let _=new bt,m=new T,p=new pi,v=new T(1,1,1),x=new bl(g.geometry,g.material,f);for(let b=0;b<f;b++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,b),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,b),c.SCALE&&v.fromBufferAttribute(c.SCALE,b),x.setMatrixAt(b,_.compose(m,p,v));for(let b in c)if(b==="_COLOR_0"){let P=c[b];x.instanceColor=new ro(P.array,P.itemSize,P.normalized)}else b!=="TRANSLATION"&&b!=="ROTATION"&&b!=="SCALE"&&g.geometry.setAttribute(b,c[b]);Yn.prototype.copy.call(x,g),this.parser.assignFinalMaterial(x),d.push(x)}return u.isGroup?(u.clear(),u.add(...d),u):d[0]}))}},M0="glTF",ic=12,y0={JSON:1313821514,BIN:5130562},Hf=class{constructor(e){this.name=xn.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,ic),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==M0)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-ic,r=new DataView(e,ic),o=0;for(;o<i;){let a=r.getUint32(o,!0);o+=4;let c=r.getUint32(o,!0);if(o+=4,c===y0.JSON){let l=new Uint8Array(e,ic+o,a);this.content=n.decode(l)}else if(c===y0.BIN){let l=ic+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Vf=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=xn.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(let u in o){let h=qf[u]||u.toLowerCase();a[h]=o[u]}for(let u in e.attributes){let h=qf[u]||u.toLowerCase();if(o[u]!==void 0){let f=n.accessors[e.attributes[u]],d=ta[f.componentType];l[h]=d.name,c[h]=f.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(h,f){i.decodeDracoFile(u,function(d){for(let g in d.attributes){let _=d.attributes[g],m=c[g];m!==void 0&&(_.normalized=m)}h(d)},a,l,di,f)})})}},Gf=class{constructor(){this.name=xn.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},Wf=class{constructor(){this.name=xn.KHR_MESH_QUANTIZATION}},Xl=class extends Pr{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,u=i-t,h=(n-t)/u,f=h*h,d=f*h,g=e*l,_=g-l,m=-2*d+3*f,p=d-f,v=1-m,x=p-f+h;for(let b=0;b!==a;b++){let P=o[_+b+a],w=o[_+b+c]*u,C=o[g+b+a],H=o[g+b]*u;r[b]=v*P+x*w+m*C+p*H}return r}},rS=new pi,Xf=class extends Xl{interpolate_(e,t,n,i){let r=super.interpolate_(e,t,n,i);return rS.fromArray(r).normalize().toArray(r),r}},gs={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},ta={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},_0={9728:ui,9729:Gi,9984:ol,9985:ff,9986:Na,9987:Sr},v0={33071:ts,33648:za,10497:to},bf={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},qf={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Dr={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},oS={CUBICSPLINE:void 0,LINEAR:io,STEP:Xo},Mf={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};fS=new bt,jf=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new sS,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,r=-1;typeof navigator!="undefined"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,r=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap=="undefined"||n||i&&r<98?this.textureLoader=new Il(this.options.manager):this.textureLoader=new Ul(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new $a(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return ao(r,a,i),Ur(a,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){let o=t[i].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let i=0,r=e.length;i<r;i++){let o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),r=(o,a)=>{let c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(let[l,u]of o.children.entries())r(u,a.children[l])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[xn.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(r,o){n.load(Nr.resolveURL(t.uri,i.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let o=bf[i.type],a=ta[i.componentType],c=i.normalized===!0,l=new a(i.count*o);return Promise.resolve(new wn(l,o,c))}let r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],c=bf[i.type],l=ta[i.componentType],u=l.BYTES_PER_ELEMENT,h=u*c,f=i.byteOffset||0,d=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0,_,m;if(d&&d!==h){let p=Math.floor(f/d),v="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count,x=t.cache.get(v);x||(_=new l(a,p*d,i.count*d/u),x=new qa(_,d/u),t.cache.add(v,x)),m=new Ya(x,c,f%d/u,g)}else a===null?_=new l(i.count*c):_=new l(a,f,i.count*c),m=new wn(_,c,g);if(i.sparse!==void 0){let p=bf.SCALAR,v=ta[i.sparse.indices.componentType],x=i.sparse.indices.byteOffset||0,b=i.sparse.values.byteOffset||0,P=new v(o[1],x,i.sparse.count*p),w=new l(o[2],b,i.sparse.count*c);a!==null&&(m=new wn(m.array.slice(),m.itemSize,m.normalized));for(let C=0,H=P.length;C<H;C++){let M=P[C];if(m.setX(M,w[C*c]),c>=2&&m.setY(M,w[C*c+1]),c>=3&&m.setZ(M,w[C*c+2]),c>=4&&m.setW(M,w[C*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return m})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r],a=this.textureLoader;if(o.uri){let c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let i=this,r=this.json,o=r.textures[e],a=r.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);let f=(r.samplers||{})[o.sampler]||{};return u.magFilter=_0[f.magFilter]||Gi,u.minFilter=_0[f.minFilter]||Sr,u.wrapS=v0[f.wrapS]||to,u.wrapT=v0[f.wrapT]||to,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());let o=i.images[e],a=self.URL||self.webkitURL,c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(h){l=!0;let f=new Blob([h],{type:o.mimeType});return c=a.createObjectURL(f),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(c).then(function(h){return new Promise(function(f,d){let g=f;t.isImageBitmapLoader===!0&&(g=function(_){let m=new ki(_);m.needsUpdate=!0,f(m)}),t.load(Nr.resolveURL(h,r.path),g,void 0,d)})}).then(function(h){return l===!0&&a.revokeObjectURL(c),h.userData.mimeType=o.mimeType||hS(o.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[xn.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[xn.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let c=r.associations.get(o);o=r.extensions[xn.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new Ka,ss.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new Za,ss.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(i||r||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Cr}loadMaterial(e){let t=this,n=this.json,i=this.extensions,r=n.materials[e],o,a={},c=r.extensions||{},l=[];if(c[xn.KHR_MATERIALS_UNLIT]){let h=i[xn.KHR_MATERIALS_UNLIT];o=h.getMaterialType(),l.push(h.extendParams(a,r,t))}else{let h=r.pbrMetallicRoughness||{};if(a.color=new Pt(1,1,1),a.opacity=1,Array.isArray(h.baseColorFactor)){let f=h.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],di),a.opacity=f[3]}h.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",h.baseColorTexture,Vn)),a.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,a.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",h.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",h.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=Ti);let u=r.alphaMode||Mf.OPAQUE;if(u===Mf.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===Mf.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==Xi&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new tt(1,1),r.normalTexture.scale!==void 0)){let h=r.normalTexture.scale;a.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&o!==Xi&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==Xi){let h=r.emissiveFactor;a.emissive=new Pt().setRGB(h[0],h[1],h[2],di)}return r.emissiveTexture!==void 0&&o!==Xi&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,Vn)),Promise.all(l).then(function(){let h=new o(a);return r.name&&(h.name=r.name),Ur(h,r),t.associations.set(h,{materials:e}),r.extensions&&ao(i,h,r),h})}createUniqueName(e){let t=Bn.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function r(a){return n[xn.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return b0(c,a,t)})}let o=[];for(let a=0,c=e.length;a<c;a++){let l=e[a],u=uS(l),h=i[u];if(h)o.push(h.promise);else{let f;l.extensions&&l.extensions[xn.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=b0(new wi,l,t),i[u]={primitive:l,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){let t=this,n=this.json,i=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){let u=o[c].material===void 0?aS(this.cache):this.getDependency("material",o[c].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){let l=c.slice(0,c.length-1),u=c[c.length-1],h=[];for(let d=0,g=u.length;d<g;d++){let _=u[d],m=o[d],p,v=l[d];if(m.mode===gs.TRIANGLES||m.mode===gs.TRIANGLE_STRIP||m.mode===gs.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new yl(_,v):new Mn(_,v),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===gs.TRIANGLE_STRIP?p.geometry=vf(p.geometry,Hl):m.mode===gs.TRIANGLE_FAN&&(p.geometry=vf(p.geometry,nc));else if(m.mode===gs.LINES)p=new El(_,v);else if(m.mode===gs.LINE_STRIP)p=new Jo(_,v);else if(m.mode===gs.LINE_LOOP)p=new Sl(_,v);else if(m.mode===gs.POINTS)p=new Tl(_,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&lS(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),Ur(p,r),m.extensions&&ao(i,p,m),t.assignFinalMaterial(p),h.push(p)}for(let d=0,g=h.length;d<g;d++)t.associations.set(h[d],{meshes:e,primitives:d});if(h.length===1)return r.extensions&&ao(i,h[0],r),h[0];let f=new Os;r.extensions&&ao(i,f,r),t.associations.set(f,{meshes:e});for(let d=0,g=h.length;d<g;d++)f.add(h[d]);return f})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new hi(oo.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Ar(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Ur(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let r=i.pop(),o=i,a=[],c=[];for(let l=0,u=o.length;l<u;l++){let h=o[l];if(h){a.push(h);let f=new bt;r!==null&&f.fromArray(r.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new vl(a,c)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,o=[],a=[],c=[],l=[],u=[];for(let h=0,f=i.channels.length;h<f;h++){let d=i.channels[h],g=i.samplers[d.sampler],_=d.target,m=_.node,p=i.parameters!==void 0?i.parameters[g.input]:g.input,v=i.parameters!==void 0?i.parameters[g.output]:g.output;_.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",v)),l.push(g),u.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(h){let f=h[0],d=h[1],g=h[2],_=h[3],m=h[4],p=[];for(let v=0,x=f.length;v<x;v++){let b=f[v],P=d[v],w=g[v],C=_[v],H=m[v];if(b===void 0)continue;b.updateMatrix&&b.updateMatrix();let M=n._createAnimationTracks(b,P,w,C,H);if(M)for(let R=0;R<M.length;R++)p.push(M[R])}return new Pl(r,void 0,p)})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=i.weights.length;c<l;c++)a.morphTargetInfluences[c]=i.weights[c]}),o})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=i.children||[];for(let l=0,u=a.length;l<u;l++)o.push(n.getDependency("node",a[l]));let c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){let u=l[0],h=l[1],f=l[2];f!==null&&u.traverse(function(d){d.isSkinnedMesh&&d.bind(f,fS)});for(let d=0,g=h.length;d<g;d++)u.add(h[d]);return u})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],o=r.name?i.createUniqueName(r.name):"",a=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),r.camera!==void 0&&a.push(i.getDependency("camera",r.camera).then(function(l){return i._getNodeRef(i.cameraCache,r.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let u;if(r.isBone===!0?u=new ja:l.length>1?u=new Os:l.length===1?u=l[0]:u=new Yn,u!==l[0])for(let h=0,f=l.length;h<f;h++)u.add(l[h]);if(r.name&&(u.userData.name=r.name,u.name=o),Ur(u,r),r.extensions&&ao(n,u,r),r.matrix!==void 0){let h=new bt;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);return i.associations.has(u)||i.associations.set(u,{}),i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,r=new Os;n.name&&(r.name=i.createUniqueName(n.name)),Ur(r,n),n.extensions&&ao(t,r,n);let o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(i.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let u=0,h=c.length;u<h;u++)r.add(c[u]);let l=u=>{let h=new Map;for(let[f,d]of i.associations)(f instanceof ss||f instanceof ki)&&h.set(f,d);return u.traverse(f=>{let d=i.associations.get(f);d!=null&&h.set(f,d)}),h};return i.associations=l(r),r})}_createAnimationTracks(e,t,n,i,r){let o=[],a=e.name?e.name:e.uuid,c=[];Dr[r.path]===Dr.weights?e.traverse(function(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}):c.push(a);let l;switch(Dr[r.path]){case Dr.weights:l=ir;break;case Dr.rotation:l=ks;break;case Dr.position:case Dr.scale:l=sr;break;default:switch(n.itemSize){case 1:l=ir;break;case 2:case 3:default:l=sr;break}break}let u=i.interpolation!==void 0?oS[i.interpolation]:io,h=this._getArrayFromAccessor(n);for(let f=0,d=c.length;f<d;f++){let g=new l(c[f]+"."+Dr[r.path],t.array,h,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Yf(t.constructor),i=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof ks?Xf:Xl;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}});var S0,ql,Zf=Ft(()=>{S0=Math.pow(2,-24),ql=Symbol("SKIP_GENERATION")});function pS(s){return s.index?s.index.count:s.attributes.position.count}function zs(s){return pS(s)/3}function mS(s,e=ArrayBuffer){return s>65535?new Uint32Array(new e(4*s)):new Uint16Array(new e(2*s))}function T0(s,e){if(!s.index){let t=s.attributes.position.count,n=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,i=mS(t,n);s.setIndex(new wn(i,1));for(let r=0;r<t;r++)i[r]=r}}function Kf(s,e){let t=zs(s),n=e||s.drawRange,i=n.start/3,r=(n.start+n.count)/3,o=Math.max(0,i),a=Math.min(t,r)-o;return[{offset:Math.floor(o),count:Math.floor(a)}]}function Jf(s,e){if(!s.groups||!s.groups.length)return Kf(s,e);let t=[],n=new Set,i=e||s.drawRange,r=i.start/3,o=(i.start+i.count)/3;for(let c of s.groups){let l=c.start/3,u=(c.start+c.count)/3;n.add(Math.max(r,l)),n.add(Math.min(o,u))}let a=Array.from(n.values()).sort((c,l)=>c-l);for(let c=0;c<a.length-1;c++){let l=a[c],u=a[c+1];t.push({offset:Math.floor(l),count:Math.floor(u-l)})}return t}function w0(s,e){let t=zs(s),n=Jf(s,e).sort((o,a)=>o.offset-a.offset),i=n[n.length-1];i.count=Math.min(t-i.offset,i.count);let r=0;return n.forEach(({count:o})=>r+=o),t!==r}var sc=Ft(()=>{oi()});function Yl(s,e,t,n,i){let r=1/0,o=1/0,a=1/0,c=-1/0,l=-1/0,u=-1/0,h=1/0,f=1/0,d=1/0,g=-1/0,_=-1/0,m=-1/0;for(let p=e*6,v=(e+t)*6;p<v;p+=6){let x=s[p+0],b=s[p+1],P=x-b,w=x+b;P<r&&(r=P),w>c&&(c=w),x<h&&(h=x),x>g&&(g=x);let C=s[p+2],H=s[p+3],M=C-H,R=C+H;M<o&&(o=M),R>l&&(l=R),C<f&&(f=C),C>_&&(_=C);let V=s[p+4],F=s[p+5],le=V-F,I=V+F;le<a&&(a=le),I>u&&(u=I),V<d&&(d=V),V>m&&(m=V)}n[0]=r,n[1]=o,n[2]=a,n[3]=c,n[4]=l,n[5]=u,i[0]=h,i[1]=f,i[2]=d,i[3]=g,i[4]=_,i[5]=m}function A0(s,e=null,t=null,n=null){let i=s.attributes.position,r=s.index?s.index.array:null,o=zs(s),a=i.normalized,c;e===null?(c=new Float32Array(o*6*4),t=0,n=o):(c=e,t=t||0,n=n||o);let l=i.array,u=i.offset||0,h=3;i.isInterleavedBufferAttribute&&(h=i.data.stride);let f=["getX","getY","getZ"];for(let d=t;d<t+n;d++){let g=d*3,_=d*6,m=g+0,p=g+1,v=g+2;r&&(m=r[m],p=r[p],v=r[v]),a||(m=m*h+u,p=p*h+u,v=v*h+u);for(let x=0;x<3;x++){let b,P,w;a?(b=i[f[x]](m),P=i[f[x]](p),w=i[f[x]](v)):(b=l[m+x],P=l[p+x],w=l[v+x]);let C=b;P<C&&(C=P),w<C&&(C=w);let H=b;P>H&&(H=P),w>H&&(H=w);let M=(H-C)/2,R=x*2;c[_+R+0]=C+M,c[_+R+1]=M+(Math.abs(C)+M)*S0}}return c}var R0=Ft(()=>{Zf();sc()});function Dn(s,e,t){return t.min.x=e[s],t.min.y=e[s+1],t.min.z=e[s+2],t.max.x=e[s+3],t.max.y=e[s+4],t.max.z=e[s+5],t}function $f(s){let e=-1,t=-1/0;for(let n=0;n<3;n++){let i=s[n+3]-s[n];i>t&&(t=i,e=n)}return e}function Qf(s,e){e.set(s)}function ed(s,e,t){let n,i;for(let r=0;r<3;r++){let o=r+3;n=s[r],i=e[r],t[r]=n<i?n:i,n=s[o],i=e[o],t[o]=n>i?n:i}}function rc(s,e,t){for(let n=0;n<3;n++){let i=e[s+2*n],r=e[s+2*n+1],o=i-r,a=i+r;o<t[n]&&(t[n]=o),a>t[n+3]&&(t[n+3]=a)}}function na(s){let e=s[3]-s[0],t=s[4]-s[1],n=s[5]-s[2];return 2*(e*t+t*n+n*e)}var co=Ft(()=>{});function I0(s,e,t,n,i,r){let o=-1,a=0;if(r===0)o=$f(e),o!==-1&&(a=(e[o]+e[o+3])/2);else if(r===1)o=$f(s),o!==-1&&(a=yS(t,n,i,o));else if(r===2){let c=na(s),l=1.25*i,u=n*6,h=(n+i)*6;for(let f=0;f<3;f++){let d=e[f],m=(e[f+3]-d)/or;if(i<or/4){let p=[...Fr];p.length=i;let v=0;for(let b=u;b<h;b+=6,v++){let P=p[v];P.candidate=t[b+2*f],P.count=0;let{bounds:w,leftCacheBounds:C,rightCacheBounds:H}=P;for(let M=0;M<3;M++)H[M]=1/0,H[M+3]=-1/0,C[M]=1/0,C[M+3]=-1/0,w[M]=1/0,w[M+3]=-1/0;rc(b,t,w)}p.sort(xS);let x=i;for(let b=0;b<x;b++){let P=p[b];for(;b+1<x&&p[b+1].candidate===P.candidate;)p.splice(b+1,1),x--}for(let b=u;b<h;b+=6){let P=t[b+2*f];for(let w=0;w<x;w++){let C=p[w];P>=C.candidate?rc(b,t,C.rightCacheBounds):(rc(b,t,C.leftCacheBounds),C.count++)}}for(let b=0;b<x;b++){let P=p[b],w=P.count,C=i-P.count,H=P.leftCacheBounds,M=P.rightCacheBounds,R=0;w!==0&&(R=na(H)/c);let V=0;C!==0&&(V=na(M)/c);let F=1+1.25*(R*w+V*C);F<l&&(o=f,l=F,a=P.candidate)}}else{for(let x=0;x<or;x++){let b=Fr[x];b.count=0,b.candidate=d+m+x*m;let P=b.bounds;for(let w=0;w<3;w++)P[w]=1/0,P[w+3]=-1/0}for(let x=u;x<h;x+=6){let w=~~((t[x+2*f]-d)/m);w>=or&&(w=or-1);let C=Fr[w];C.count++,rc(x,t,C.bounds)}let p=Fr[or-1];Qf(p.bounds,p.rightCacheBounds);for(let x=or-2;x>=0;x--){let b=Fr[x],P=Fr[x+1];ed(b.bounds,P.rightCacheBounds,b.rightCacheBounds)}let v=0;for(let x=0;x<or-1;x++){let b=Fr[x],P=b.count,w=b.bounds,H=Fr[x+1].rightCacheBounds;P!==0&&(v===0?Qf(w,jl):ed(w,jl,jl)),v+=P;let M=0,R=0;v!==0&&(M=na(jl)/c);let V=i-v;V!==0&&(R=na(H)/c);let F=1+1.25*(M*v+R*V);F<l&&(o=f,l=F,a=b.candidate)}}}}else console.warn(`MeshBVH: Invalid build strategy value ${r} used.`);return{axis:o,pos:a}}function yS(s,e,t,n){let i=0;for(let r=e,o=e+t;r<o;r++)i+=s[r*6+n*2];return i/t}var or,xS,Fr,jl,L0=Ft(()=>{co();or=32,xS=(s,e)=>s.candidate-e.candidate,Fr=new Array(or).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),jl=new Float32Array(6)});var ia,N0=Ft(()=>{ia=class{constructor(){this.boundingData=new Float32Array(6)}}});function D0(s,e,t,n,i,r){let o=n,a=n+i-1,c=r.pos,l=r.axis*2;for(;;){for(;o<=a&&t[o*6+l]<c;)o++;for(;o<=a&&t[a*6+l]>=c;)a--;if(o<a){for(let u=0;u<3;u++){let h=e[o*3+u];e[o*3+u]=e[a*3+u],e[a*3+u]=h}for(let u=0;u<6;u++){let h=t[o*6+u];t[o*6+u]=t[a*6+u],t[a*6+u]=h}o++,a--}else return o}}var U0=Ft(()=>{});function F0(s,e,t,n,i,r){let o=n,a=n+i-1,c=r.pos,l=r.axis*2;for(;;){for(;o<=a&&t[o*6+l]<c;)o++;for(;o<=a&&t[a*6+l]>=c;)a--;if(o<a){let u=s[o];s[o]=s[a],s[a]=u;for(let h=0;h<6;h++){let f=t[o*6+h];t[o*6+h]=t[a*6+h],t[a*6+h]=f}o++,a--}else return o}}var B0=Ft(()=>{});function jn(s,e){return e[s+15]===65535}function ti(s,e){return e[s+6]}function ai(s,e){return e[s+14]}function Ai(s){return s+8}function Ri(s,e){return e[s+6]}function Zl(s,e){return e[s+7]}var Hs=Ft(()=>{});function Jl(s){return"count"in s?1:1+Jl(s.left)+Jl(s.right)}function z0(s,e,t){return O0=new Float32Array(t),oc=new Uint32Array(t),Kl=new Uint16Array(t),k0=new Uint8Array(t),td(s,e)}function td(s,e){let t=s/4,n=s/2,i="count"in e,r=e.boundingData;for(let o=0;o<6;o++)O0[t+o]=r[o];if(i)if(e.buffer){let o=e.buffer;k0.set(new Uint8Array(o),s);for(let a=s,c=s+o.byteLength;a<c;a+=32){let l=a/2;jn(l,Kl)||(oc[a/4+6]+=t)}return s+o.byteLength}else{let o=e.offset,a=e.count;return oc[t+6]=o,Kl[n+14]=a,Kl[n+15]=65535,s+32}else{let o=e.left,a=e.right,c=e.splitAxis,l;if(l=td(s+32,o),l/4>_S)throw new Error("MeshBVH: Cannot store child pointer greater than 32 bits.");return oc[t+6]=l/4,l=td(l,a),oc[t+7]=c,l}}var O0,oc,Kl,k0,_S,H0=Ft(()=>{Hs();_S=Math.pow(2,32)});function vS(s,e){let t=(s.index?s.index.count:s.attributes.position.count)/3,n=t>2**16,i=n?4:2,r=e?new SharedArrayBuffer(t*i):new ArrayBuffer(t*i),o=n?new Uint32Array(r):new Uint16Array(r);for(let a=0,c=o.length;a<c;a++)o[a]=a;return o}function bS(s,e,t,n,i){let{maxDepth:r,verbose:o,maxLeafTris:a,strategy:c,onProgress:l,indirect:u}=i,h=s._indirectBuffer,f=s.geometry,d=f.index?f.index.array:null,g=u?F0:D0,_=zs(f),m=new Float32Array(6),p=!1,v=new ia;return Yl(e,t,n,v.boundingData,m),b(v,t,n,m),v;function x(P){l&&l(P/_)}function b(P,w,C,H=null,M=0){if(!p&&M>=r&&(p=!0,o&&(console.warn(`MeshBVH: Max depth of ${r} reached when generating BVH. Consider increasing maxDepth.`),console.warn(f))),C<=a||M>=r)return x(w+C),P.offset=w,P.count=C,P;let R=I0(P.boundingData,H,e,w,C,c);if(R.axis===-1)return x(w+C),P.offset=w,P.count=C,P;let V=g(h,d,e,w,C,R);if(V===w||V===w+C)x(w+C),P.offset=w,P.count=C;else{P.splitAxis=R.axis;let F=new ia,le=w,I=V-w;P.left=F,Yl(e,le,I,F.boundingData,m),b(F,le,I,m,M+1);let X=new ia,ce=V,ne=C-I;P.right=X,Yl(e,ce,ne,X.boundingData,m),b(X,ce,ne,m,M+1)}return P}}function V0(s,e){let t=s.geometry;e.indirect&&(s._indirectBuffer=vS(t,e.useSharedArrayBuffer),w0(t,e.range)&&!e.verbose&&console.warn('MeshBVH: Provided geometry contains groups or a range that do not fully span the vertex contents while using the "indirect" option. BVH may incorrectly report intersections on unrendered portions of the geometry.')),s._indirectBuffer||T0(t,e);let n=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,i=A0(t),r=e.indirect?Kf(t,e.range):Jf(t,e.range);s._roots=r.map(o=>{let a=bS(s,i,o.offset,o.count,e),c=Jl(a),l=new n(32*c);return z0(0,a,l),l})}var G0=Ft(()=>{sc();R0();L0();N0();U0();B0();H0()});var Ki,U1,nd=Ft(()=>{oi();Ki=class{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(e,t){let n=1/0,i=-1/0;for(let r=0,o=e.length;r<o;r++){let c=e[r][t];n=c<n?c:n,i=c>i?c:i}this.min=n,this.max=i}setFromPoints(e,t){let n=1/0,i=-1/0;for(let r=0,o=t.length;r<o;r++){let a=t[r],c=e.dot(a);n=c<n?c:n,i=c>i?c:i}this.min=n,this.max=i}isSeparated(e){return this.min>e.max||e.min>this.max}};Ki.prototype.setFromBox=function(){let s=new T;return function(t,n){let i=n.min,r=n.max,o=1/0,a=-1/0;for(let c=0;c<=1;c++)for(let l=0;l<=1;l++)for(let u=0;u<=1;u++){s.x=i.x*c+r.x*(1-c),s.y=i.y*l+r.y*(1-l),s.z=i.z*u+r.z*(1-u);let h=t.dot(s);o=Math.min(h,o),a=Math.max(h,a)}this.min=o,this.max=a}}();U1=function(){let s=new Ki;return function(t,n){let i=t.points,r=t.satAxes,o=t.satBounds,a=n.points,c=n.satAxes,l=n.satBounds;for(let u=0;u<3;u++){let h=o[u],f=r[u];if(s.setFromPoints(f,a),h.isSeparated(s))return!1}for(let u=0;u<3;u++){let h=l[u],f=c[u];if(s.setFromPoints(f,i),h.isSeparated(s))return!1}}}()});var MS,cc,W0,id=Ft(()=>{oi();MS=function(){let s=new T,e=new T,t=new T;return function(i,r,o){let a=i.start,c=s,l=r.start,u=e;t.subVectors(a,l),s.subVectors(i.end,i.start),e.subVectors(r.end,r.start);let h=t.dot(u),f=u.dot(c),d=u.dot(u),g=t.dot(c),m=c.dot(c)*d-f*f,p,v;m!==0?p=(h*f-g*d)/m:p=0,v=(h+p*f)/d,o.x=p,o.y=v}}(),cc=function(){let s=new tt,e=new T,t=new T;return function(i,r,o,a){MS(i,r,s);let c=s.x,l=s.y;if(c>=0&&c<=1&&l>=0&&l<=1){i.at(c,o),r.at(l,a);return}else if(c>=0&&c<=1){l<0?r.at(0,a):r.at(1,a),i.closestPointToPoint(a,!0,o);return}else if(l>=0&&l<=1){c<0?i.at(0,o):i.at(1,o),r.closestPointToPoint(o,!0,a);return}else{let u;c<0?u=i.start:u=i.end;let h;l<0?h=r.start:h=r.end;let f=e,d=t;if(i.closestPointToPoint(h,!0,e),r.closestPointToPoint(u,!0,t),f.distanceToSquared(h)<=d.distanceToSquared(u)){o.copy(f),a.copy(h);return}else{o.copy(u),a.copy(d);return}}}}(),W0=function(){let s=new T,e=new T,t=new es,n=new Zi;return function(r,o){let{radius:a,center:c}=r,{a:l,b:u,c:h}=o;if(n.start=l,n.end=u,n.closestPointToPoint(c,!0,s).distanceTo(c)<=a||(n.start=l,n.end=h,n.closestPointToPoint(c,!0,s).distanceTo(c)<=a)||(n.start=u,n.end=h,n.closestPointToPoint(c,!0,s).distanceTo(c)<=a))return!0;let _=o.getPlane(t);if(Math.abs(_.distanceToPoint(c))<=a){let p=_.projectPoint(c,e);if(o.containsPoint(p))return!0}return!1}}()});function sd(s){return Math.abs(s)<ES}var ES,Ii,sa=Ft(()=>{oi();nd();id();ES=1e-15;Ii=class extends is{constructor(...e){super(...e),this.isExtendedTriangle=!0,this.satAxes=new Array(4).fill().map(()=>new T),this.satBounds=new Array(4).fill().map(()=>new Ki),this.points=[this.a,this.b,this.c],this.sphere=new ei,this.plane=new es,this.needsUpdate=!0}intersectsSphere(e){return W0(e,this)}update(){let e=this.a,t=this.b,n=this.c,i=this.points,r=this.satAxes,o=this.satBounds,a=r[0],c=o[0];this.getNormal(a),c.setFromPoints(a,i);let l=r[1],u=o[1];l.subVectors(e,t),u.setFromPoints(l,i);let h=r[2],f=o[2];h.subVectors(t,n),f.setFromPoints(h,i);let d=r[3],g=o[3];d.subVectors(n,e),g.setFromPoints(d,i),this.sphere.setFromPoints(this.points),this.plane.setFromNormalAndCoplanarPoint(a,e),this.needsUpdate=!1}};Ii.prototype.closestPointToSegment=function(){let s=new T,e=new T,t=new Zi;return function(i,r=null,o=null){let{start:a,end:c}=i,l=this.points,u,h=1/0;for(let f=0;f<3;f++){let d=(f+1)%3;t.start.copy(l[f]),t.end.copy(l[d]),cc(t,i,s,e),u=s.distanceToSquared(e),u<h&&(h=u,r&&r.copy(s),o&&o.copy(e))}return this.closestPointToPoint(a,s),u=a.distanceToSquared(s),u<h&&(h=u,r&&r.copy(s),o&&o.copy(a)),this.closestPointToPoint(c,s),u=c.distanceToSquared(s),u<h&&(h=u,r&&r.copy(s),o&&o.copy(c)),Math.sqrt(h)}}();Ii.prototype.intersectsTriangle=function(){let s=new Ii,e=new Array(3),t=new Array(3),n=new Ki,i=new Ki,r=new T,o=new T,a=new T,c=new T,l=new T,u=new Zi,h=new Zi,f=new Zi,d=new T;function g(_,m,p){let v=_.points,x=0,b=-1;for(let P=0;P<3;P++){let{start:w,end:C}=u;w.copy(v[P]),C.copy(v[(P+1)%3]),u.delta(o);let H=sd(m.distanceToPoint(w));if(sd(m.normal.dot(o))&&H){p.copy(u),x=2;break}let M=m.intersectLine(u,d);if(!M&&H&&d.copy(w),(M||H)&&!sd(d.distanceTo(C))){if(x<=1)(x===1?p.start:p.end).copy(d),H&&(b=x);else if(x>=2){(b===1?p.start:p.end).copy(d),x=2;break}if(x++,x===2&&b===-1)break}}return x}return function(m,p=null,v=!1){this.needsUpdate&&this.update(),m.isExtendedTriangle?m.needsUpdate&&m.update():(s.copy(m),s.update(),m=s);let x=this.plane,b=m.plane;if(Math.abs(x.normal.dot(b.normal))>1-1e-10){let P=this.satBounds,w=this.satAxes;t[0]=m.a,t[1]=m.b,t[2]=m.c;for(let M=0;M<4;M++){let R=P[M],V=w[M];if(n.setFromPoints(V,t),R.isSeparated(n))return!1}let C=m.satBounds,H=m.satAxes;e[0]=this.a,e[1]=this.b,e[2]=this.c;for(let M=0;M<4;M++){let R=C[M],V=H[M];if(n.setFromPoints(V,e),R.isSeparated(n))return!1}for(let M=0;M<4;M++){let R=w[M];for(let V=0;V<4;V++){let F=H[V];if(r.crossVectors(R,F),n.setFromPoints(r,e),i.setFromPoints(r,t),n.isSeparated(i))return!1}}return p&&(v||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),p.start.set(0,0,0),p.end.set(0,0,0)),!0}else{let P=g(this,b,h);if(P===1&&m.containsPoint(h.end))return p&&(p.start.copy(h.end),p.end.copy(h.end)),!0;if(P!==2)return!1;let w=g(m,x,f);if(w===1&&this.containsPoint(f.end))return p&&(p.start.copy(f.end),p.end.copy(f.end)),!0;if(w!==2)return!1;if(h.delta(a),f.delta(c),a.dot(c)<0){let le=f.start;f.start=f.end,f.end=le}let C=h.start.dot(a),H=h.end.dot(a),M=f.start.dot(a),R=f.end.dot(a),V=H<M,F=C<R;return C!==R&&M!==H&&V===F?!1:(p&&(l.subVectors(h.start,f.start),l.dot(a)>0?p.start.copy(h.start):p.start.copy(f.start),l.subVectors(h.end,f.end),l.dot(a)<0?p.end.copy(h.end):p.end.copy(f.end)),!0)}}}();Ii.prototype.distanceToPoint=function(){let s=new T;return function(t){return this.closestPointToPoint(t,s),t.distanceTo(s)}}();Ii.prototype.distanceToTriangle=function(){let s=new T,e=new T,t=["a","b","c"],n=new Zi,i=new Zi;return function(o,a=null,c=null){let l=a||c?n:null;if(this.intersectsTriangle(o,l))return(a||c)&&(a&&l.getCenter(a),c&&l.getCenter(c)),0;let u=1/0;for(let h=0;h<3;h++){let f,d=t[h],g=o[d];this.closestPointToPoint(g,s),f=g.distanceToSquared(s),f<u&&(u=f,a&&a.copy(s),c&&c.copy(g));let _=this[d];o.closestPointToPoint(_,s),f=_.distanceToSquared(s),f<u&&(u=f,a&&a.copy(_),c&&c.copy(s))}for(let h=0;h<3;h++){let f=t[h],d=t[(h+1)%3];n.set(this[f],this[d]);for(let g=0;g<3;g++){let _=t[g],m=t[(g+1)%3];i.set(o[_],o[m]),cc(n,i,s,e);let p=s.distanceToSquared(e);p<u&&(u=p,a&&a.copy(s),c&&c.copy(e))}}return Math.sqrt(u)}}()});var Kn,lo=Ft(()=>{oi();nd();sa();id();Kn=class{constructor(e,t,n){this.isOrientedBox=!0,this.min=new T,this.max=new T,this.matrix=new bt,this.invMatrix=new bt,this.points=new Array(8).fill().map(()=>new T),this.satAxes=new Array(3).fill().map(()=>new T),this.satBounds=new Array(3).fill().map(()=>new Ki),this.alignedSatBounds=new Array(3).fill().map(()=>new Ki),this.needsUpdate=!1,e&&this.min.copy(e),t&&this.max.copy(t),n&&this.matrix.copy(n)}set(e,t,n){this.min.copy(e),this.max.copy(t),this.matrix.copy(n),this.needsUpdate=!0}copy(e){this.min.copy(e.min),this.max.copy(e.max),this.matrix.copy(e.matrix),this.needsUpdate=!0}};Kn.prototype.update=function(){return function(){let e=this.matrix,t=this.min,n=this.max,i=this.points;for(let l=0;l<=1;l++)for(let u=0;u<=1;u++)for(let h=0;h<=1;h++){let f=1*l|2*u|4*h,d=i[f];d.x=l?n.x:t.x,d.y=u?n.y:t.y,d.z=h?n.z:t.z,d.applyMatrix4(e)}let r=this.satBounds,o=this.satAxes,a=i[0];for(let l=0;l<3;l++){let u=o[l],h=r[l],f=1<<l,d=i[f];u.subVectors(a,d),h.setFromPoints(u,i)}let c=this.alignedSatBounds;c[0].setFromPointsField(i,"x"),c[1].setFromPointsField(i,"y"),c[2].setFromPointsField(i,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}}();Kn.prototype.intersectsBox=function(){let s=new Ki;return function(t){this.needsUpdate&&this.update();let n=t.min,i=t.max,r=this.satBounds,o=this.satAxes,a=this.alignedSatBounds;if(s.min=n.x,s.max=i.x,a[0].isSeparated(s)||(s.min=n.y,s.max=i.y,a[1].isSeparated(s))||(s.min=n.z,s.max=i.z,a[2].isSeparated(s)))return!1;for(let c=0;c<3;c++){let l=o[c],u=r[c];if(s.setFromBox(l,t),u.isSeparated(s))return!1}return!0}}();Kn.prototype.intersectsTriangle=function(){let s=new Ii,e=new Array(3),t=new Ki,n=new Ki,i=new T;return function(o){this.needsUpdate&&this.update(),o.isExtendedTriangle?o.needsUpdate&&o.update():(s.copy(o),s.update(),o=s);let a=this.satBounds,c=this.satAxes;e[0]=o.a,e[1]=o.b,e[2]=o.c;for(let f=0;f<3;f++){let d=a[f],g=c[f];if(t.setFromPoints(g,e),d.isSeparated(t))return!1}let l=o.satBounds,u=o.satAxes,h=this.points;for(let f=0;f<3;f++){let d=l[f],g=u[f];if(t.setFromPoints(g,h),d.isSeparated(t))return!1}for(let f=0;f<3;f++){let d=c[f];for(let g=0;g<4;g++){let _=u[g];if(i.crossVectors(d,_),t.setFromPoints(i,e),n.setFromPoints(i,h),t.isSeparated(n))return!1}}return!0}}();Kn.prototype.closestPointToPoint=function(){return function(e,t){return this.needsUpdate&&this.update(),t.copy(e).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),t}}();Kn.prototype.distanceToPoint=function(){let s=new T;return function(t){return this.closestPointToPoint(t,s),t.distanceTo(s)}}();Kn.prototype.distanceToBox=function(){let s=["x","y","z"],e=new Array(12).fill().map(()=>new Zi),t=new Array(12).fill().map(()=>new Zi),n=new T,i=new T;return function(o,a=0,c=null,l=null){if(this.needsUpdate&&this.update(),this.intersectsBox(o))return(c||l)&&(o.getCenter(i),this.closestPointToPoint(i,n),o.closestPointToPoint(n,i),c&&c.copy(n),l&&l.copy(i)),0;let u=a*a,h=o.min,f=o.max,d=this.points,g=1/0;for(let m=0;m<8;m++){let p=d[m];i.copy(p).clamp(h,f);let v=p.distanceToSquared(i);if(v<g&&(g=v,c&&c.copy(p),l&&l.copy(i),v<u))return Math.sqrt(v)}let _=0;for(let m=0;m<3;m++)for(let p=0;p<=1;p++)for(let v=0;v<=1;v++){let x=(m+1)%3,b=(m+2)%3,P=p<<x|v<<b,w=1<<m|p<<x|v<<b,C=d[P],H=d[w];e[_].set(C,H);let R=s[m],V=s[x],F=s[b],le=t[_],I=le.start,X=le.end;I[R]=h[R],I[V]=p?h[V]:f[V],I[F]=v?h[F]:f[V],X[R]=f[R],X[V]=p?h[V]:f[V],X[F]=v?h[F]:f[V],_++}for(let m=0;m<=1;m++)for(let p=0;p<=1;p++)for(let v=0;v<=1;v++){i.x=m?f.x:h.x,i.y=p?f.y:h.y,i.z=v?f.z:h.z,this.closestPointToPoint(i,n);let x=i.distanceToSquared(n);if(x<g&&(g=x,c&&c.copy(n),l&&l.copy(i),x<u))return Math.sqrt(x)}for(let m=0;m<12;m++){let p=e[m];for(let v=0;v<12;v++){let x=t[v];cc(p,x,n,i);let b=n.distanceToSquared(i);if(b<g&&(g=b,c&&c.copy(n),l&&l.copy(i),b<u))return Math.sqrt(b)}}return Math.sqrt(g)}}()});var Br,Ql=Ft(()=>{Br=class{constructor(e){this._getNewPrimitive=e,this._primitives=[]}getPrimitive(){let e=this._primitives;return e.length===0?this._getNewPrimitive():e.pop()}releasePrimitive(e){this._primitives.push(e)}}});var rd,Yi,eu=Ft(()=>{sa();Ql();rd=class extends Br{constructor(){super(()=>new Ii)}},Yi=new rd});var od,_n,ar=Ft(()=>{od=class{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;let e=[],t=null;this.setBuffer=n=>{t&&e.push(t),t=n,this.float32Array=new Float32Array(n),this.uint16Array=new Uint16Array(n),this.uint32Array=new Uint32Array(n)},this.clearBuffer=()=>{t=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,e.length!==0&&this.setBuffer(e.pop())}}},_n=new od});function X0(s,e,t,n,i,r){Or=tu.getPrimitive(),oa=tu.getPrimitive(),ra.push(Or,oa),_n.setBuffer(s._roots[e]);let o=ad(0,s.geometry,t,n,i,r);_n.clearBuffer(),tu.releasePrimitive(Or),tu.releasePrimitive(oa),ra.pop(),ra.pop();let a=ra.length;return a>0&&(oa=ra[a-1],Or=ra[a-2]),o}function ad(s,e,t,n,i=null,r=0,o=0){let{float32Array:a,uint16Array:c,uint32Array:l}=_n,u=s*2;if(jn(u,c)){let f=ti(s,l),d=ai(u,c);return Dn(s,a,Or),n(f,d,!1,o,r+s,Or)}else{let R=function(F){let{uint16Array:le,uint32Array:I}=_n,X=F*2;for(;!jn(X,le);)F=Ai(F),X=F*2;return ti(F,I)},V=function(F){let{uint16Array:le,uint32Array:I}=_n,X=F*2;for(;!jn(X,le);)F=Ri(F,I),X=F*2;return ti(F,I)+ai(X,le)},f=Ai(s),d=Ri(s,l),g=f,_=d,m,p,v,x;if(i&&(v=Or,x=oa,Dn(g,a,v),Dn(_,a,x),m=i(v),p=i(x),p<m)){g=d,_=f;let F=m;m=p,p=F,v=x}v||(v=Or,Dn(g,a,v));let b=jn(g*2,c),P=t(v,b,m,o+1,r+g),w;if(P===2){let F=R(g),I=V(g)-F;w=n(F,I,!0,o+1,r+g,v)}else w=P&&ad(g,e,t,n,i,r,o+1);if(w)return!0;x=oa,Dn(_,a,x);let C=jn(_*2,c),H=t(x,C,p,o+1,r+_),M;if(H===2){let F=R(_),I=V(_)-F;M=n(F,I,!0,o+1,r+_,x)}else M=H&&ad(_,e,t,n,i,r,o+1);return!!M}}var Or,oa,ra,tu,q0=Ft(()=>{oi();co();Ql();Hs();ar();ra=[],tu=new Br(()=>new on)});function Y0(s,e,t={},n=0,i=1/0){let r=n*n,o=i*i,a=1/0,c=null;if(s.shapecast({boundsTraverseOrder:u=>(lc.copy(e).clamp(u.min,u.max),lc.distanceToSquared(e)),intersectsBounds:(u,h,f)=>f<a&&f<o,intersectsTriangle:(u,h)=>{u.closestPointToPoint(e,lc);let f=e.distanceToSquared(lc);return f<a&&(ld.copy(lc),a=f,c=h),f<r}}),a===1/0)return null;let l=Math.sqrt(a);return t.point?t.point.copy(ld):t.point=ld.clone(),t.distance=l,t.faceIndex=c,t}var lc,ld,j0=Ft(()=>{oi();lc=new T,ld=new T});function TS(s,e,t,n,i,r,o,a){let c;if(r===Oi?c=s.intersectTriangle(n,t,e,!0,i):c=s.intersectTriangle(e,t,n,r!==Ti,i),c===null)return null;let l=s.origin.distanceTo(i);return l<o||l>a?null:{distance:l,point:i.clone()}}function wS(s,e,t,n,i,r,o,a,c,l,u){aa.fromBufferAttribute(e,r),ca.fromBufferAttribute(e,o),la.fromBufferAttribute(e,a);let h=TS(s,aa,ca,la,ru,c,l,u);if(h){n&&(nu.fromBufferAttribute(n,r),iu.fromBufferAttribute(n,o),su.fromBufferAttribute(n,a),h.uv=is.getInterpolation(ru,aa,ca,la,nu,iu,su,new tt)),i&&(nu.fromBufferAttribute(i,r),iu.fromBufferAttribute(i,o),su.fromBufferAttribute(i,a),h.uv1=is.getInterpolation(ru,aa,ca,la,nu,iu,su,new tt)),t&&(Z0.fromBufferAttribute(t,r),K0.fromBufferAttribute(t,o),J0.fromBufferAttribute(t,a),h.normal=is.getInterpolation(ru,aa,ca,la,Z0,K0,J0,new T),h.normal.dot(s.direction)>0&&h.normal.multiplyScalar(-1));let f={a:r,b:o,c:a,normal:new T,materialIndex:0};is.getNormal(aa,ca,la,f.normal),h.face=f,h.faceIndex=r}return h}function ua(s,e,t,n,i,r,o){let a=n*3,c=a+0,l=a+1,u=a+2,h=s.index;s.index&&(c=h.getX(c),l=h.getX(l),u=h.getX(u));let{position:f,normal:d,uv:g,uv1:_}=s.attributes,m=wS(t,f,d,g,_,c,l,u,e,r,o);return m?(m.faceIndex=n,i&&i.push(m),m):null}var aa,ca,la,nu,iu,su,Z0,K0,J0,ru,ud=Ft(()=>{oi();aa=new T,ca=new T,la=new T,nu=new tt,iu=new tt,su=new tt,Z0=new T,K0=new T,J0=new T,ru=new T});function Un(s,e,t,n){let i=s.a,r=s.b,o=s.c,a=e,c=e+1,l=e+2;t&&(a=t.getX(a),c=t.getX(c),l=t.getX(l)),i.x=n.getX(a),i.y=n.getY(a),i.z=n.getZ(a),r.x=n.getX(c),r.y=n.getY(c),r.z=n.getZ(c),o.x=n.getX(l),o.y=n.getY(l),o.z=n.getZ(l)}var kr=Ft(()=>{});function $0(s,e,t,n,i,r,o,a){let{geometry:c,_indirectBuffer:l}=s;for(let u=n,h=n+i;u<h;u++)ua(c,e,t,u,r,o,a)}function Q0(s,e,t,n,i,r,o){let{geometry:a,_indirectBuffer:c}=s,l=1/0,u=null;for(let h=n,f=n+i;h<f;h++){let d;d=ua(a,e,t,h,null,r,o),d&&d.distance<l&&(u=d,l=d.distance)}return u}function eg(s,e,t,n,i,r,o){let{geometry:a}=t,{index:c}=a,l=a.attributes.position;for(let u=s,h=e+s;u<h;u++){let f;if(f=u,Un(o,f*3,c,l),o.needsUpdate=!0,n(o,f,i,r))return!0}return!1}var ou=Ft(()=>{ud();kr()});function tg(s,e=null){e&&Array.isArray(e)&&(e=new Set(e));let t=s.geometry,n=t.index?t.index.array:null,i=t.attributes.position,r,o,a,c,l=0,u=s._roots;for(let f=0,d=u.length;f<d;f++)r=u[f],o=new Uint32Array(r),a=new Uint16Array(r),c=new Float32Array(r),h(0,l),l+=r.byteLength;function h(f,d,g=!1){let _=f*2;if(a[_+15]===65535){let p=o[f+6],v=a[_+14],x=1/0,b=1/0,P=1/0,w=-1/0,C=-1/0,H=-1/0;for(let M=3*p,R=3*(p+v);M<R;M++){let V=n[M],F=i.getX(V),le=i.getY(V),I=i.getZ(V);F<x&&(x=F),F>w&&(w=F),le<b&&(b=le),le>C&&(C=le),I<P&&(P=I),I>H&&(H=I)}return c[f+0]!==x||c[f+1]!==b||c[f+2]!==P||c[f+3]!==w||c[f+4]!==C||c[f+5]!==H?(c[f+0]=x,c[f+1]=b,c[f+2]=P,c[f+3]=w,c[f+4]=C,c[f+5]=H,!0):!1}else{let p=f+8,v=o[f+6],x=p+d,b=v+d,P=g,w=!1,C=!1;e?P||(w=e.has(x),C=e.has(b),P=!w&&!C):(w=!0,C=!0);let H=P||w,M=P||C,R=!1;H&&(R=h(p,d,P));let V=!1;M&&(V=h(v,d,P));let F=R||V;if(F)for(let le=0;le<3;le++){let I=p+le,X=v+le,ce=c[I],ne=c[I+3],ie=c[X],ye=c[X+3];c[f+le]=ce<ie?ce:ie,c[f+le+3]=ne>ye?ne:ye}return F}}}var ng=Ft(()=>{});function xs(s,e,t,n,i){let r,o,a,c,l,u,h=1/t.direction.x,f=1/t.direction.y,d=1/t.direction.z,g=t.origin.x,_=t.origin.y,m=t.origin.z,p=e[s],v=e[s+3],x=e[s+1],b=e[s+3+1],P=e[s+2],w=e[s+3+2];return h>=0?(r=(p-g)*h,o=(v-g)*h):(r=(v-g)*h,o=(p-g)*h),f>=0?(a=(x-_)*f,c=(b-_)*f):(a=(b-_)*f,c=(x-_)*f),r>c||a>o||((a>r||isNaN(r))&&(r=a),(c<o||isNaN(o))&&(o=c),d>=0?(l=(P-m)*d,u=(w-m)*d):(l=(w-m)*d,u=(P-m)*d),r>u||l>o)?!1:((l>r||r!==r)&&(r=l),(u<o||o!==o)&&(o=u),r<=i&&o>=n)}var uc=Ft(()=>{});function ig(s,e,t,n,i,r,o,a){let{geometry:c,_indirectBuffer:l}=s;for(let u=n,h=n+i;u<h;u++){let f=l?l[u]:u;ua(c,e,t,f,r,o,a)}}function sg(s,e,t,n,i,r,o){let{geometry:a,_indirectBuffer:c}=s,l=1/0,u=null;for(let h=n,f=n+i;h<f;h++){let d;d=ua(a,e,t,c?c[h]:h,null,r,o),d&&d.distance<l&&(u=d,l=d.distance)}return u}function rg(s,e,t,n,i,r,o){let{geometry:a}=t,{index:c}=a,l=a.attributes.position;for(let u=s,h=e+s;u<h;u++){let f;if(f=t.resolveTriangleIndex(u),Un(o,f*3,c,l),o.needsUpdate=!0,n(o,f,i,r))return!0}return!1}var au=Ft(()=>{ud();kr()});function og(s,e,t,n,i,r,o){_n.setBuffer(s._roots[e]),hd(0,s,t,n,i,r,o),_n.clearBuffer()}function hd(s,e,t,n,i,r,o){let{float32Array:a,uint16Array:c,uint32Array:l}=_n,u=s*2;if(jn(u,c)){let f=ti(s,l),d=ai(u,c);$0(e,t,n,f,d,i,r,o)}else{let f=Ai(s);xs(f,a,n,r,o)&&hd(f,e,t,n,i,r,o);let d=Ri(s,l);xs(d,a,n,r,o)&&hd(d,e,t,n,i,r,o)}}var ag=Ft(()=>{uc();Hs();ar();ou()});function cg(s,e,t,n,i,r){_n.setBuffer(s._roots[e]);let o=fd(0,s,t,n,i,r);return _n.clearBuffer(),o}function fd(s,e,t,n,i,r){let{float32Array:o,uint16Array:a,uint32Array:c}=_n,l=s*2;if(jn(l,a)){let h=ti(s,c),f=ai(l,a);return Q0(e,t,n,h,f,i,r)}else{let h=Zl(s,c),f=AS[h],g=n.direction[f]>=0,_,m;g?(_=Ai(s),m=Ri(s,c)):(_=Ri(s,c),m=Ai(s));let v=xs(_,o,n,i,r)?fd(_,e,t,n,i,r):null;if(v){let P=v.point[f];if(g?P<=o[m+h]:P>=o[m+h+3])return v}let b=xs(m,o,n,i,r)?fd(m,e,t,n,i,r):null;return v&&b?v.distance<=b.distance?v:b:v||b||null}}var AS,lg=Ft(()=>{Hs();ar();uc();ou();AS=["x","y","z"]});function hg(s,e,t,n){_n.setBuffer(s._roots[e]);let i=dd(0,s,t,n);return _n.clearBuffer(),i}function dd(s,e,t,n,i=null){let{float32Array:r,uint16Array:o,uint32Array:a}=_n,c=s*2;if(i===null&&(t.boundingBox||t.computeBoundingBox(),ug.set(t.boundingBox.min,t.boundingBox.max,n),i=ug),jn(c,o)){let u=e.geometry,h=u.index,f=u.attributes.position,d=t.index,g=t.attributes.position,_=ti(s,a),m=ai(c,o);if(hc.copy(n).invert(),t.boundsTree)return Dn(s,r,lu),lu.matrix.copy(hc),lu.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:v=>lu.intersectsBox(v),intersectsTriangle:v=>{v.a.applyMatrix4(n),v.b.applyMatrix4(n),v.c.applyMatrix4(n),v.needsUpdate=!0;for(let x=_*3,b=(m+_)*3;x<b;x+=3)if(Un(fa,x,h,f),fa.needsUpdate=!0,v.intersectsTriangle(fa))return!0;return!1}});for(let p=_*3,v=(m+_)*3;p<v;p+=3){Un(ha,p,h,f),ha.a.applyMatrix4(hc),ha.b.applyMatrix4(hc),ha.c.applyMatrix4(hc),ha.needsUpdate=!0;for(let x=0,b=d.count;x<b;x+=3)if(Un(fa,x,d,g),fa.needsUpdate=!0,ha.intersectsTriangle(fa))return!0}}else{let u=s+8,h=a[s+6];return Dn(u,r,cu),!!(i.intersectsBox(cu)&&dd(u,e,t,n,i)||(Dn(h,r,cu),i.intersectsBox(cu)&&dd(h,e,t,n,i)))}}var cu,ha,fa,hc,ug,lu,fg=Ft(()=>{oi();lo();sa();kr();co();Hs();ar();cu=new on,ha=new Ii,fa=new Ii,hc=new bt,ug=new Kn,lu=new Kn});function dg(s,e,t,n={},i={},r=0,o=1/0){e.boundingBox||e.computeBoundingBox(),pd.set(e.boundingBox.min,e.boundingBox.max,t),pd.needsUpdate=!0;let a=s.geometry,c=a.attributes.position,l=a.index,u=e.attributes.position,h=e.index,f=Yi.getPrimitive(),d=Yi.getPrimitive(),g=RS,_=CS,m=null,p=null;i&&(m=PS,p=IS);let v=1/0,x=null,b=null;return uu.copy(t).invert(),fc.matrix.copy(uu),s.shapecast({boundsTraverseOrder:P=>pd.distanceToBox(P),intersectsBounds:(P,w,C)=>C<v&&C<o?(w&&(fc.min.copy(P.min),fc.max.copy(P.max),fc.needsUpdate=!0),!0):!1,intersectsRange:(P,w)=>{if(e.boundsTree)return e.boundsTree.shapecast({boundsTraverseOrder:H=>fc.distanceToBox(H),intersectsBounds:(H,M,R)=>R<v&&R<o,intersectsRange:(H,M)=>{for(let R=H,V=H+M;R<V;R++){Un(d,3*R,h,u),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let F=P,le=P+w;F<le;F++){Un(f,3*F,l,c),f.needsUpdate=!0;let I=f.distanceToTriangle(d,g,m);if(I<v&&(_.copy(g),p&&p.copy(m),v=I,x=F,b=R),I<r)return!0}}}});{let C=zs(e);for(let H=0,M=C;H<M;H++){Un(d,3*H,h,u),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let R=P,V=P+w;R<V;R++){Un(f,3*R,l,c),f.needsUpdate=!0;let F=f.distanceToTriangle(d,g,m);if(F<v&&(_.copy(g),p&&p.copy(m),v=F,x=R,b=H),F<r)return!0}}}}}),Yi.releasePrimitive(f),Yi.releasePrimitive(d),v===1/0?null:(n.point?n.point.copy(_):n.point=_.clone(),n.distance=v,n.faceIndex=x,i&&(i.point?i.point.copy(p):i.point=p.clone(),i.point.applyMatrix4(uu),_.applyMatrix4(uu),i.distance=_.sub(i.point).length(),i.faceIndex=b),n)}var uu,pd,fc,RS,CS,PS,IS,pg=Ft(()=>{oi();lo();kr();sc();eu();uu=new bt,pd=new Kn,fc=new Kn,RS=new T,CS=new T,PS=new T,IS=new T});function mg(s,e=null){e&&Array.isArray(e)&&(e=new Set(e));let t=s.geometry,n=t.index?t.index.array:null,i=t.attributes.position,r,o,a,c,l=0,u=s._roots;for(let f=0,d=u.length;f<d;f++)r=u[f],o=new Uint32Array(r),a=new Uint16Array(r),c=new Float32Array(r),h(0,l),l+=r.byteLength;function h(f,d,g=!1){let _=f*2;if(a[_+15]===65535){let p=o[f+6],v=a[_+14],x=1/0,b=1/0,P=1/0,w=-1/0,C=-1/0,H=-1/0;for(let M=p,R=p+v;M<R;M++){let V=3*s.resolveTriangleIndex(M);for(let F=0;F<3;F++){let le=V+F;le=n?n[le]:le;let I=i.getX(le),X=i.getY(le),ce=i.getZ(le);I<x&&(x=I),I>w&&(w=I),X<b&&(b=X),X>C&&(C=X),ce<P&&(P=ce),ce>H&&(H=ce)}}return c[f+0]!==x||c[f+1]!==b||c[f+2]!==P||c[f+3]!==w||c[f+4]!==C||c[f+5]!==H?(c[f+0]=x,c[f+1]=b,c[f+2]=P,c[f+3]=w,c[f+4]=C,c[f+5]=H,!0):!1}else{let p=f+8,v=o[f+6],x=p+d,b=v+d,P=g,w=!1,C=!1;e?P||(w=e.has(x),C=e.has(b),P=!w&&!C):(w=!0,C=!0);let H=P||w,M=P||C,R=!1;H&&(R=h(p,d,P));let V=!1;M&&(V=h(v,d,P));let F=R||V;if(F)for(let le=0;le<3;le++){let I=p+le,X=v+le,ce=c[I],ne=c[I+3],ie=c[X],ye=c[X+3];c[f+le]=ce<ie?ce:ie,c[f+le+3]=ne>ye?ne:ye}return F}}}var gg=Ft(()=>{});function xg(s,e,t,n,i,r,o){_n.setBuffer(s._roots[e]),md(0,s,t,n,i,r,o),_n.clearBuffer()}function md(s,e,t,n,i,r,o){let{float32Array:a,uint16Array:c,uint32Array:l}=_n,u=s*2;if(jn(u,c)){let f=ti(s,l),d=ai(u,c);ig(e,t,n,f,d,i,r,o)}else{let f=Ai(s);xs(f,a,n,r,o)&&md(f,e,t,n,i,r,o);let d=Ri(s,l);xs(d,a,n,r,o)&&md(d,e,t,n,i,r,o)}}var yg=Ft(()=>{uc();Hs();ar();au()});function _g(s,e,t,n,i,r){_n.setBuffer(s._roots[e]);let o=gd(0,s,t,n,i,r);return _n.clearBuffer(),o}function gd(s,e,t,n,i,r){let{float32Array:o,uint16Array:a,uint32Array:c}=_n,l=s*2;if(jn(l,a)){let h=ti(s,c),f=ai(l,a);return sg(e,t,n,h,f,i,r)}else{let h=Zl(s,c),f=LS[h],g=n.direction[f]>=0,_,m;g?(_=Ai(s),m=Ri(s,c)):(_=Ri(s,c),m=Ai(s));let v=xs(_,o,n,i,r)?gd(_,e,t,n,i,r):null;if(v){let P=v.point[f];if(g?P<=o[m+h]:P>=o[m+h+3])return v}let b=xs(m,o,n,i,r)?gd(m,e,t,n,i,r):null;return v&&b?v.distance<=b.distance?v:b:v||b||null}}var LS,vg=Ft(()=>{Hs();ar();uc();au();LS=["x","y","z"]});function Mg(s,e,t,n){_n.setBuffer(s._roots[e]);let i=xd(0,s,t,n);return _n.clearBuffer(),i}function xd(s,e,t,n,i=null){let{float32Array:r,uint16Array:o,uint32Array:a}=_n,c=s*2;if(i===null&&(t.boundingBox||t.computeBoundingBox(),bg.set(t.boundingBox.min,t.boundingBox.max,n),i=bg),jn(c,o)){let u=e.geometry,h=u.index,f=u.attributes.position,d=t.index,g=t.attributes.position,_=ti(s,a),m=ai(c,o);if(dc.copy(n).invert(),t.boundsTree)return Dn(s,r,fu),fu.matrix.copy(dc),fu.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:v=>fu.intersectsBox(v),intersectsTriangle:v=>{v.a.applyMatrix4(n),v.b.applyMatrix4(n),v.c.applyMatrix4(n),v.needsUpdate=!0;for(let x=_,b=m+_;x<b;x++)if(Un(pa,3*e.resolveTriangleIndex(x),h,f),pa.needsUpdate=!0,v.intersectsTriangle(pa))return!0;return!1}});for(let p=_,v=m+_;p<v;p++){let x=e.resolveTriangleIndex(p);Un(da,3*x,h,f),da.a.applyMatrix4(dc),da.b.applyMatrix4(dc),da.c.applyMatrix4(dc),da.needsUpdate=!0;for(let b=0,P=d.count;b<P;b+=3)if(Un(pa,b,d,g),pa.needsUpdate=!0,da.intersectsTriangle(pa))return!0}}else{let u=s+8,h=a[s+6];return Dn(u,r,hu),!!(i.intersectsBox(hu)&&xd(u,e,t,n,i)||(Dn(h,r,hu),i.intersectsBox(hu)&&xd(h,e,t,n,i)))}}var hu,da,pa,dc,bg,fu,Eg=Ft(()=>{oi();lo();sa();kr();co();Hs();ar();hu=new on,da=new Ii,pa=new Ii,dc=new bt,bg=new Kn,fu=new Kn});function Sg(s,e,t,n={},i={},r=0,o=1/0){e.boundingBox||e.computeBoundingBox(),yd.set(e.boundingBox.min,e.boundingBox.max,t),yd.needsUpdate=!0;let a=s.geometry,c=a.attributes.position,l=a.index,u=e.attributes.position,h=e.index,f=Yi.getPrimitive(),d=Yi.getPrimitive(),g=NS,_=DS,m=null,p=null;i&&(m=US,p=FS);let v=1/0,x=null,b=null;return du.copy(t).invert(),pc.matrix.copy(du),s.shapecast({boundsTraverseOrder:P=>yd.distanceToBox(P),intersectsBounds:(P,w,C)=>C<v&&C<o?(w&&(pc.min.copy(P.min),pc.max.copy(P.max),pc.needsUpdate=!0),!0):!1,intersectsRange:(P,w)=>{if(e.boundsTree){let C=e.boundsTree;return C.shapecast({boundsTraverseOrder:H=>pc.distanceToBox(H),intersectsBounds:(H,M,R)=>R<v&&R<o,intersectsRange:(H,M)=>{for(let R=H,V=H+M;R<V;R++){let F=C.resolveTriangleIndex(R);Un(d,3*F,h,u),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let le=P,I=P+w;le<I;le++){let X=s.resolveTriangleIndex(le);Un(f,3*X,l,c),f.needsUpdate=!0;let ce=f.distanceToTriangle(d,g,m);if(ce<v&&(_.copy(g),p&&p.copy(m),v=ce,x=le,b=R),ce<r)return!0}}}})}else{let C=zs(e);for(let H=0,M=C;H<M;H++){Un(d,3*H,h,u),d.a.applyMatrix4(t),d.b.applyMatrix4(t),d.c.applyMatrix4(t),d.needsUpdate=!0;for(let R=P,V=P+w;R<V;R++){let F=s.resolveTriangleIndex(R);Un(f,3*F,l,c),f.needsUpdate=!0;let le=f.distanceToTriangle(d,g,m);if(le<v&&(_.copy(g),p&&p.copy(m),v=le,x=R,b=H),le<r)return!0}}}}}),Yi.releasePrimitive(f),Yi.releasePrimitive(d),v===1/0?null:(n.point?n.point.copy(_):n.point=_.clone(),n.distance=v,n.faceIndex=x,i&&(i.point?i.point.copy(p):i.point=p.clone(),i.point.applyMatrix4(du),_.applyMatrix4(du),i.distance=_.sub(i.point).length(),i.faceIndex=b),n)}var du,yd,pc,NS,DS,US,FS,Tg=Ft(()=>{oi();lo();kr();sc();eu();du=new bt,yd=new Kn,pc=new Kn,NS=new T,DS=new T,US=new T,FS=new T});function wg(){return typeof SharedArrayBuffer!="undefined"}var Ag=Ft(()=>{});function Rg(s,e,t,n){if(bd)throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");bd=!0;let i=s._roots,r=e._roots,o,a=0,c=0,l=new bt().copy(t).invert();for(let u=0,h=i.length;u<h;u++){mc.setBuffer(i[u]),c=0;let f=zr.getPrimitive();Dn(0,mc.float32Array,f),f.applyMatrix4(l);for(let d=0,g=r.length;d<g&&(pu.setBuffer(r[d]),o=As(0,0,t,l,n,a,c,0,0,f),pu.clearBuffer(),c+=r[d].length,!o);d++);if(zr.releasePrimitive(f),mc.clearBuffer(),a+=i[u].length,o)break}return bd=!1,o}function As(s,e,t,n,i,r=0,o=0,a=0,c=0,l=null,u=!1){let h,f;u?(h=pu,f=mc):(h=mc,f=pu);let d=h.float32Array,g=h.uint32Array,_=h.uint16Array,m=f.float32Array,p=f.uint32Array,v=f.uint16Array,x=s*2,b=e*2,P=jn(x,_),w=jn(b,v),C=!1;if(w&&P)u?C=i(ti(e,p),ai(e*2,v),ti(s,g),ai(s*2,_),c,o+e,a,r+s):C=i(ti(s,g),ai(s*2,_),ti(e,p),ai(e*2,v),a,r+s,c,o+e);else if(w){let H=zr.getPrimitive();Dn(e,m,H),H.applyMatrix4(t);let M=Ai(s),R=Ri(s,g);Dn(M,d,ma),Dn(R,d,ga);let V=H.intersectsBox(ma),F=H.intersectsBox(ga);C=V&&As(e,M,n,t,i,o,r,c,a+1,H,!u)||F&&As(e,R,n,t,i,o,r,c,a+1,H,!u),zr.releasePrimitive(H)}else{let H=Ai(e),M=Ri(e,p);Dn(H,m,_d),Dn(M,m,vd);let R=l.intersectsBox(_d),V=l.intersectsBox(vd);if(R&&V)C=As(s,H,t,n,i,r,o,a,c+1,l,u)||As(s,M,t,n,i,r,o,a,c+1,l,u);else if(R)if(P)C=As(s,H,t,n,i,r,o,a,c+1,l,u);else{let F=zr.getPrimitive();F.copy(_d).applyMatrix4(t);let le=Ai(s),I=Ri(s,g);Dn(le,d,ma),Dn(I,d,ga);let X=F.intersectsBox(ma),ce=F.intersectsBox(ga);C=X&&As(H,le,n,t,i,o,r,c,a+1,F,!u)||ce&&As(H,I,n,t,i,o,r,c,a+1,F,!u),zr.releasePrimitive(F)}else if(V)if(P)C=As(s,M,t,n,i,r,o,a,c+1,l,u);else{let F=zr.getPrimitive();F.copy(vd).applyMatrix4(t);let le=Ai(s),I=Ri(s,g);Dn(le,d,ma),Dn(I,d,ga);let X=F.intersectsBox(ma),ce=F.intersectsBox(ga);C=X&&As(M,le,n,t,i,o,r,c,a+1,F,!u)||ce&&As(M,I,n,t,i,o,r,c,a+1,F,!u),zr.releasePrimitive(F)}}return C}var mc,pu,zr,ma,ga,_d,vd,bd,Cg=Ft(()=>{oi();ar();Hs();co();Ql();mc=new _n.constructor,pu=new _n.constructor,zr=new Br(()=>new on),ma=new on,ga=new on,_d=new on,vd=new on,bd=!1});var mu,Pg,BS,gu,Ig=Ft(()=>{oi();Zf();G0();lo();co();eu();q0();j0();ou();ng();ag();lg();fg();pg();au();gg();yg();vg();Eg();Tg();Ag();kr();Cg();mu=new Kn,Pg=new on,BS={strategy:0,maxDepth:40,maxLeafTris:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null},gu=class s{static serialize(e,t={}){t={cloneBuffers:!0,...t};let n=e.geometry,i=e._roots,r=e._indirectBuffer,o=n.getIndex(),a;return t.cloneBuffers?a={roots:i.map(c=>c.slice()),index:o?o.array.slice():null,indirectBuffer:r?r.slice():null}:a={roots:i,index:o?o.array:null,indirectBuffer:r},a}static deserialize(e,t,n={}){n={setIndex:!0,indirect:!!e.indirectBuffer,...n};let{index:i,roots:r,indirectBuffer:o}=e,a=new s(t,{...n,[ql]:!0});if(a._roots=r,a._indirectBuffer=o||null,n.setIndex){let c=t.getIndex();if(c===null){let l=new wn(e.index,1,!1);t.setIndex(l)}else c.array!==i&&(c.array.set(i),c.needsUpdate=!0)}return a}get indirect(){return!!this._indirectBuffer}constructor(e,t={}){if(e.isBufferGeometry){if(e.index&&e.index.isInterleavedBufferAttribute)throw new Error("MeshBVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw new Error("MeshBVH: Only BufferGeometries are supported.");if(t=Object.assign({...BS,[ql]:!1},t),t.useSharedArrayBuffer&&!wg())throw new Error("MeshBVH: SharedArrayBuffer is not available.");this.geometry=e,this._roots=null,this._indirectBuffer=null,t[ql]||(V0(this,t),!e.boundingBox&&t.setBoundingBox&&(e.boundingBox=this.getBoundingBox(new on))),this.resolveTriangleIndex=t.indirect?n=>this._indirectBuffer[n]:n=>n}refit(e=null){return(this.indirect?mg:tg)(this,e)}traverse(e,t=0){let n=this._roots[t],i=new Uint32Array(n),r=new Uint16Array(n);o(0);function o(a,c=0){let l=a*2,u=r[l+15]===65535;if(u){let h=i[a+6],f=r[l+14];e(c,u,new Float32Array(n,a*4,6),h,f)}else{let h=a+32/4,f=i[a+6],d=i[a+7];e(c,u,new Float32Array(n,a*4,6),d)||(o(h,c+1),o(f,c+1))}}}raycast(e,t=Wi,n=0,i=1/0){let r=this._roots,o=this.geometry,a=[],c=t.isMaterial,l=Array.isArray(t),u=o.groups,h=c?t.side:t,f=this.indirect?xg:og;for(let d=0,g=r.length;d<g;d++){let _=l?t[u[d].materialIndex].side:h,m=a.length;if(f(this,d,_,e,a,n,i),l){let p=u[d].materialIndex;for(let v=m,x=a.length;v<x;v++)a[v].face.materialIndex=p}}return a}raycastFirst(e,t=Wi,n=0,i=1/0){let r=this._roots,o=this.geometry,a=t.isMaterial,c=Array.isArray(t),l=null,u=o.groups,h=a?t.side:t,f=this.indirect?_g:cg;for(let d=0,g=r.length;d<g;d++){let _=c?t[u[d].materialIndex].side:h,m=f(this,d,_,e,n,i);m!=null&&(l==null||m.distance<l.distance)&&(l=m,c&&(m.face.materialIndex=u[d].materialIndex))}return l}intersectsGeometry(e,t){let n=!1,i=this._roots,r=this.indirect?Mg:hg;for(let o=0,a=i.length;o<a&&(n=r(this,o,e,t),!n);o++);return n}shapecast(e){let t=Yi.getPrimitive(),n=this.indirect?rg:eg,{boundsTraverseOrder:i,intersectsBounds:r,intersectsRange:o,intersectsTriangle:a}=e;if(o&&a){let h=o;o=(f,d,g,_,m)=>h(f,d,g,_,m)?!0:n(f,d,this,a,g,_,t)}else o||(a?o=(h,f,d,g)=>n(h,f,this,a,d,g,t):o=(h,f,d)=>d);let c=!1,l=0,u=this._roots;for(let h=0,f=u.length;h<f;h++){let d=u[h];if(c=X0(this,h,r,o,i,l),c)break;l+=d.byteLength}return Yi.releasePrimitive(t),c}bvhcast(e,t,n){let{intersectsRanges:i,intersectsTriangles:r}=n,o=Yi.getPrimitive(),a=this.geometry.index,c=this.geometry.attributes.position,l=this.indirect?g=>{let _=this.resolveTriangleIndex(g);Un(o,_*3,a,c)}:g=>{Un(o,g*3,a,c)},u=Yi.getPrimitive(),h=e.geometry.index,f=e.geometry.attributes.position,d=e.indirect?g=>{let _=e.resolveTriangleIndex(g);Un(u,_*3,h,f)}:g=>{Un(u,g*3,h,f)};if(r){let g=(_,m,p,v,x,b,P,w)=>{for(let C=p,H=p+v;C<H;C++){d(C),u.a.applyMatrix4(t),u.b.applyMatrix4(t),u.c.applyMatrix4(t),u.needsUpdate=!0;for(let M=_,R=_+m;M<R;M++)if(l(M),o.needsUpdate=!0,r(o,u,M,C,x,b,P,w))return!0}return!1};if(i){let _=i;i=function(m,p,v,x,b,P,w,C){return _(m,p,v,x,b,P,w,C)?!0:g(m,p,v,x,b,P,w,C)}}else i=g}return Rg(this,e,t,i)}intersectsBox(e,t){return mu.set(e.min,e.max,t),mu.needsUpdate=!0,this.shapecast({intersectsBounds:n=>mu.intersectsBox(n),intersectsTriangle:n=>mu.intersectsTriangle(n)})}intersectsSphere(e){return this.shapecast({intersectsBounds:t=>e.intersectsBox(t),intersectsTriangle:t=>t.intersectsSphere(e)})}closestPointToGeometry(e,t,n={},i={},r=0,o=1/0){return(this.indirect?Sg:dg)(this,e,t,n,i,r,o)}closestPointToPoint(e,t={},n=0,i=1/0){return Y0(this,e,t,n,i)}getBoundingBox(e){return e.makeEmpty(),this._roots.forEach(n=>{Dn(0,new Float32Array(n),Pg),e.union(Pg)}),e}}});function Md(s,e,t){return s===null?null:(s.point.applyMatrix4(e.matrixWorld),s.distance=s.point.distanceTo(t.ray.origin),s.object=e,s)}var Lg=Ft(()=>{});function Bg(s,e){this.isBatchedMesh?zS.call(this,s,e):HS.call(this,s,e)}function zS(s,e){if(this.boundsTrees){let t=this.boundsTrees,n=this._drawInfo,i=this._drawRanges,r=this.matrixWorld;Li.material=this.material,Li.geometry=this.geometry;let o=Li.geometry.boundsTree,a=Li.geometry.drawRange;Li.geometry.boundingSphere===null&&(Li.geometry.boundingSphere=new ei);for(let c=0,l=n.length;c<l;c++){if(!this.getVisibleAt(c))continue;let u=n[c].geometryIndex;if(Li.geometry.boundsTree=t[u],this.getMatrixAt(c,Li.matrixWorld).premultiply(r),!Li.geometry.boundsTree){this.getBoundingBoxAt(u,Li.geometry.boundingBox),this.getBoundingSphereAt(u,Li.geometry.boundingSphere);let h=i[u];Li.geometry.setDrawRange(h.start,h.count)}Li.raycast(s,yu);for(let h=0,f=yu.length;h<f;h++){let d=yu[h];d.object=this,d.batchId=c,e.push(d)}yu.length=0}Li.geometry.boundsTree=o,Li.geometry.drawRange=a,Li.material=null,Li.geometry=null}else kS.call(this,s,e)}function HS(s,e){if(this.geometry.boundsTree){if(this.material===void 0)return;Ug.copy(this.matrixWorld).invert(),xu.copy(s.ray).applyMatrix4(Ug),Fg.setFromMatrixScale(this.matrixWorld),Dg.copy(xu.direction).multiply(Fg);let t=Dg.length(),n=s.near/t,i=s.far/t,r=this.geometry.boundsTree;if(s.firstHitOnly===!0){let o=Md(r.raycastFirst(xu,this.material,n,i),this,s);o&&e.push(o)}else{let o=r.raycast(xu,this.material,n,i);for(let a=0,c=o.length;a<c;a++){let l=Md(o[a],this,s);l&&e.push(l)}}}else OS.call(this,s,e)}function Og(s={}){return this.boundsTree=new gu(this,s),this.boundsTree}var Ng,jw,xu,Dg,Ug,OS,kS,Fg,Li,yu,kg=Ft(()=>{oi();Lg();Ig();oi();Ng=Ml||null,jw=parseInt(tc)>=166,xu=new nr,Dg=new T,Ug=new bt,OS=Mn.prototype.raycast,kS=Ng!==null?Ng.prototype.raycast:null,Fg=new T,Li=new Mn,yu=[]});var zg=Ft(()=>{});var Hg=Ft(()=>{});var Vg=Ft(()=>{});var Gg,Wg=Ft(()=>{Gg=`

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
`});var Xg=Ft(()=>{});var qg,Yg=Ft(()=>{qg=`

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
`});var jg=Ft(()=>{});var Zg=Ft(()=>{Wg();Xg();Yg();jg()});var lA,Kg=Ft(()=>{kg();sa();lo();Hg();zg();Vg();Zg();lA=`
	${Gg}
	${qg}
`});var KS=$d(()=>{var xA=Ax(Qd());oi();E0();Kg();wi.prototype.computeBoundsTree=Og;Mn.prototype.raycast=Bg;var GS=.09,WS=.2,Jg={bone:15327174,muscle:11028287,nerve:15779137,vessel:14886444,vein:3107839,ligament:12831958,capsule:11120051},$g=3524863,_u=3725690,XS=16732240,qS=16749350,YS=11824127,Qg={hip:[.62,1.12],gluteal:[.62,1.12],thigh:[.36,1],knee:[.3,.6],leg:[0,.5],foot:[-.02,.14],limb:[-.05,1.12],shoulder:[1.15,1.5],plexus:[1.2,1.53],arm:[1,1.45],elbow:[.95,1.2],forearm:[.66,1.15],wrist:[.66,.95],hand:[.64,.92],"upper limb":[.66,1.5]},Ed={model:"_jk3d_trunk7.glb",planes:["coronal","axial","sagittal"]},ex={anterior:[0,0,1],posterior:[0,0,-1],lateral:[-1,0,0],medial:[1,0,0],superior:[0,1,.001],inferior:[0,-1,.001]},Sd={};function Td(s){return Sd[s]||(Sd[s]=new Promise((e,t)=>{fetch(s).then(n=>{if(!n.ok)throw n.status;return n.arrayBuffer()}).then(n=>new Wl().parse(n,"",i=>e(i.scene),t)).catch(t)})),Sd[s]}var xc=null,jS=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]].map(s=>new T(...s));function tx(s){return Math.abs(s.y)>.92?new T(0,0,s.y>0?-1:1):new T(0,1,0)}var wd=class{constructor(e,t){this.cam=e,this.el=t,this.target=new T,this.autoRotate=!1,this.autoRotateSpeed=1.2,this.vx=0,this.vy=0,this.drag=null,this.ls=[],this.snapOn=!0,this.turntable=!1,this.ball=(i,r)=>{let o=t.getBoundingClientRect(),a=.38*Math.min(o.width,o.height),c=(i-o.left-o.width/2)/a,l=-(r-o.top-o.height/2)/a,u=c*c+l*l;if(u>=1)return new T(c,l,0).normalize();let h=Math.sqrt(1-u);return new T(c,l,h).normalize()},t.addEventListener("pointerdown",i=>{if(!(i.button!==0||i.shiftKey)){this.drag={t:performance.now(),x:i.clientX,y:i.clientY},this.spin=null,this.vo=null;try{t.setPointerCapture(i.pointerId)}catch{}}}),t.addEventListener("pointermove",i=>{if(!this.drag||this.multi)return;if(this.turntable){let l=performance.now(),u=Math.max(1,l-this.drag.t),h=-(i.clientX-this.drag.x)*.008;this.turn(new T(0,1,0),h),this.spin={axis:new T(0,1,0),w:h/u*16},this.drag.x=i.clientX,this.drag.t=l;return}let r=performance.now(),o=Math.max(1,r-this.drag.t),a=i.clientX-this.drag.x,c=i.clientY-(this.drag.y==null?i.clientY:this.drag.y);this.drag.x=i.clientX,this.drag.y=i.clientY,this.drag.t=r,this.orbit(a*.008,c*.008),this.vo=[a*.008/o*16,c*.008/o*16]});let n=()=>{this.drag&&performance.now()-this.drag.t>80&&(this.spin=null,this.vo=null),this.drag=null};t.addEventListener("pointerup",n),t.addEventListener("pointercancel",n)}addEventListener(e,t){e==="change"&&this.ls.push(t)}emit(){this.ls.forEach(e=>e())}orbit(e,t){let n=this.cam.position.clone().sub(this.target),i=n.length(),r=Math.atan2(n.x,n.z)-e,o=Math.asin(Math.max(-1,Math.min(1,n.y/i)));this.turntable?o=0:o=Math.max(-1.45,Math.min(1.45,o+t)),n.set(Math.sin(r)*Math.cos(o),Math.sin(o),Math.cos(r)*Math.cos(o)).multiplyScalar(i),this.cam.position.copy(this.target).add(n),this.cam.up.set(0,1,0),this.cam.lookAt(this.target),this.emit()}rotate(e,t){this.orbit(e,t)}rotateFree(e,t){if(this.turntable){this.turn(new T(0,1,0),-e);return}let n=this.cam,i=n.position.clone().sub(this.target),r=n.up.clone(),o=new T().crossVectors(r,i).normalize(),a=new pi().setFromAxisAngle(r,-e).multiply(new pi().setFromAxisAngle(o,-t));i.applyQuaternion(a),n.up.applyQuaternion(a).normalize();let c=i.clone().normalize();n.up.sub(c.multiplyScalar(n.up.dot(i.clone().normalize()))).normalize(),n.position.copy(this.target).add(i),n.lookAt(this.target),this.emit()}turn(e,t){let n=new pi().setFromAxisAngle(e,t),i=this.cam.position.clone().sub(this.target).applyQuaternion(n);this.cam.up.applyQuaternion(n).normalize(),this.cam.position.copy(this.target).add(i),this.cam.lookAt(this.target),this.emit()}level(){let e=this.cam.position.clone().sub(this.target),t=e.length(),n=new T(e.x,0,e.z);return n.lengthSq()<1e-8&&n.set(0,0,1),{p1:this.target.clone().addScaledVector(n.normalize(),t),u1:new T(0,1,0)}}roll(e){let t=this.cam.position.clone().sub(this.target).normalize();this.cam.up.applyQuaternion(new pi().setFromAxisAngle(t,e)).normalize(),this.cam.lookAt(this.target),this.emit()}update(e){let t=!1;if(!this.drag&&this.vo&&Math.hypot(this.vo[0],this.vo[1])>1e-4){let n=Math.min(1,(e||.016666666666666666)*60);this.orbit(this.vo[0]*n,this.vo[1]*n);let i=Math.pow(.86,n);this.vo[0]*=i,this.vo[1]*=i,t=!0}else if(this.autoRotate&&!this.drag){let n=2*Math.PI/60*this.autoRotateSpeed*(e||.016666666666666666),i=new pi().setFromAxisAngle(new T(0,1,0),n),r=this.cam.position.clone().sub(this.target).applyQuaternion(i);this.cam.up.applyQuaternion(i),this.cam.position.copy(this.target).add(r),this.cam.lookAt(this.target),this.emit(),t=!0}else if(this.snapOn&&!this.drag&&e){let n=this.cam.position.clone().sub(this.target),i=n.clone().normalize(),r=null,o=-1;if(jS.forEach(a=>{let c=a.dot(i);c>o&&(o=c,r=a)}),o>Math.cos(14*Math.PI/180)&&o<.99999&&Math.abs(r.y)<.5){let a=1-Math.exp(-e*3.5),c=i.clone().lerp(r,a).normalize(),l=new T(0,1,0);this.cam.position.copy(this.target).addScaledVector(c,n.length()),l.sub(c.clone().multiplyScalar(l.dot(c))).normalize(),this.cam.up.copy(l),this.cam.lookAt(this.target),this.emit(),t=!0}}t||this.cam.lookAt(this.target)}};function nx(s,e){let t=new T;String(s||"anterior").toLowerCase().split(/[\s,+-]+/).forEach(i=>{let r=Object.keys(ex).find(o=>i&&o.startsWith(i.replace(/^antero/,"anterior").replace(/^postero/,"posterior")));r&&t.add(new T(...ex[r])),i==="anterolateral"&&t.add(new T(-.7,0,.7)),i==="posterolateral"&&t.add(new T(-.7,0,-.7)),i==="anteromedial"&&t.add(new T(.7,0,.7)),i==="posteromedial"&&t.add(new T(.7,0,-.7))}),t.lengthSq()<1e-6&&t.set(0,0,1);let n=String(s||"").match(/([+-]\d+)\s*$/);if(n){let i=new T(t.x,0,t.z);i.lengthSq()<1e-6&&i.set(0,0,1),i.normalize();let r=oo.degToRad(+n[1]);t.copy(i.multiplyScalar(Math.cos(r))).setY(Math.sin(r))}return e&&(t.x=-t.x),t.normalize()}var cr=s=>String(s||"").toLowerCase().replace(/\s+/g," ").trim();function gc(s){return String(s||"").split(/[\n,;]+/).map(e=>e.trim()).filter(Boolean)}function ZS(s,e){if(xc&&xc.stop(),s.innerHTML="",s.style.removeProperty("display"),/^(attach|nerve|action)$/.test(e.mode)){let x="jka-seen:"+e.mode+":"+(e.name||e.meshes),b=!1;try{b=localStorage.getItem(x)==="1"}catch{}let P=e.front||"adaptive",w=typeof e.ivl=="number"?e.ivl:typeof window.__jkaIvl=="number"?window.__jkaIvl:null;if(e.side==="back")try{localStorage.setItem(x,"1")}catch{}else if(P==="hide"||P==="adaptive"&&(w!=null?w>=1:b)){s.style.display="none";return}}let t=()=>[document.scrollingElement,document.getElementById("jk-sc")].forEach(x=>{x&&x.scrollTop&&(x.scrollTop=0)});t(),[50,200,600].forEach(x=>setTimeout(t,x)),s.classList.add("jka");let n=!1;try{n=localStorage.getItem("jka-ct")==="1"}catch{}s.classList.toggle("jka-ctpre",n);let i=!!e.xray;try{i=i||localStorage.getItem("jka-rad")==="1"}catch{}let r=s.closest(".jka-left");r&&n?r.style.animation="none":r&&i&&(r.style.animation="jka-shrink .5s cubic-bezier(.2, .8, .2, 1) both");let o=document.createElement("div");o.className="jka-wrap",s.appendChild(o);let a=document.createElement("div");a.className="jka-msg",a.textContent="Loading model\u2026",o.appendChild(a);let c;try{let x=window.__jkaR;x&&x.getContext()&&!x.getContext().isContextLost()?(c=x,c.setRenderTarget(null),c.autoClear=!0,c.setClearColor(0,0),c.domElement.removeAttribute("style"),c.domElement.className=""):(c=new Xa({antialias:!0,alpha:!0}),window.__jkaR=c)}catch{a.textContent="3D needs WebGL, which is off in this Anki.";return}let l=[],u=c.domElement,h=EventTarget.prototype;u.addEventListener=function(x,b,P){h.addEventListener.call(u,x,b,P),l.push([x,b,P])};let f=[],d=Math.min(2,window.devicePixelRatio||1),g=Math.min(d,1);c.setPixelRatio(d),c.outputColorSpace=Vn,o.appendChild(c.domElement);let _=document.createElementNS("http://www.w3.org/2000/svg","svg");_.setAttribute("class","jka-lines"),o.appendChild(_);let m=!1,p={stop(){m=!0,l.forEach(([x,b,P])=>{try{h.removeEventListener.call(u,x,b,P)}catch{}}),l.length=0,f.forEach(x=>{try{x.dispose()}catch{}}),f.length=0}};xc=p,Td(e.model).then(x=>{if(!m)try{v(x),a.remove()}catch(b){a.textContent="3D view error: "+(b&&b.message||b)+(b&&b.stack?" \u2014 "+String(b.stack).split(`
`).slice(0,2).join(" | "):"")}}).catch(x=>{a.textContent="Could not load "+e.model+" ("+x+"). Run Tools \u2192 Janki: Set up 3D anatomy."});function v(x){let b=window.__jkaT={t0:performance.now()},P=y=>{b[y]=Math.round(performance.now()-b.t0)},w=new Rr;w.add(new Ll(16777215,4210768,1.6));let C=new Qo(16777215,1.4);w.add(C);let H=x.clone(!0);w.add(H);let M=e.mode+"|"+e.name+"|"+e.meshes,R=String(e.limb||"").toLowerCase();if(R!=="left"&&R!=="right"){let y=window.__jkaLimb;R=e.side==="back"&&y&&y.key===M?y.limb:Math.random()<.5?"left":"right"}e.side!=="back"&&(window.__jkaLimb={key:M,limb:R});let V=R==="left";V&&(H.scale.x=-1),H.updateMatrixWorld(!0);let F=[];H.traverse(y=>{if(!y.isMesh)return;let S=y.userData||{},E=S.n||y.name,N=S.l||"muscle",Y=N==="vein"||N==="vessel"&&/vein/i.test(E)?Jg.vein:Jg[N]||10066329;y.material=new Cr({color:Y,roughness:N==="bone"?.85:.6,metalness:0,emissive:N==="nerve"?3154944:0}),y.userData.base=Y,F.push({mesh:y,name:E,key:cr(E),layer:N,box:new on().setFromObject(y)})}),function y(S){let E=performance.now();for(;S<F.length&&performance.now()-E<8;S++){let N=F[S].mesh.geometry;if(!N.boundsTree)try{N.computeBoundsTree()}catch{}}S<F.length&&!m?setTimeout(()=>y(S),0):setTimeout(()=>{kn=!0,fr=!0},0)}(0);let le=y=>{let S=cr(y);return F.filter(E=>E.key===S||E.key===S+" muscle")},I=[].concat(...gc(e.meshes).map(le)),X=[].concat(...gc(e.nerve).map(le)),ce=(e.peel||[]).map(y=>[].concat(...gc(y).map(le))),ne=e.side==="back",ie=e.mode,ye=I.length&&I.every(y=>y.layer==="nerve"||y.layer==="vessel"||y.layer==="vein");ye&&ie==="name"&&(ie="nerveid");let Pe=Qg[cr(e.region)]||null,_e=new on;(I.length?I:X).forEach(y=>_e.union(y.box));let st=wt();P("parts");let ee=e.landmark?st[String(e.landmark).toLowerCase().trim()]?Ne(String(e.landmark).toLowerCase().trim()):re(e.landmark):null;function Ne(y){let S=window.__jkaLMC=window.__jkaLMC||new Map,E=e.model+"|"+y+"|"+e.meshes+"|"+(V?"L":"R"),N=S.get(E);if(N){I.forEach(W=>{let ve=W.mesh.geometry.userData.jkaSubG;if(ve){let G=W.mesh.geometry;W.mesh.geometry=ve,W.mesh.userData.coarse=G,F.forEach(B=>{B.mesh.geometry===G&&(B.mesh.geometry=ve,B.mesh.userData.coarse=G)})}});let K=new Map;if(I.forEach((W,ve)=>{let G=N.W[ve];G&&G.length===W.mesh.geometry.attributes.position.count&&K.set(W,G)}),K.size===N.n)return{pt:N.pt,pts:N.pts,W:K,sphere:N.sphere,ivf:N.ivf}}let Y=Xt(y);return Y&&(S.set(E,{pt:Y.pt,pts:Y.pts,sphere:Y.sphere,ivf:Y.ivf,n:Y.W.size,W:I.map(K=>Y.W.get(K)||null)}),S.size>40&&S.delete(S.keys().next().value)),Y}let Ge=ee?ee.pt:null,vt=ee?ee.pts?ee.pts.slice():(()=>{let y=[];return I.forEach(S=>qt(S.mesh,E=>{ee.inPatch(E)&&ee.soft(E)>.3&&y.push(E.clone())})),y})():[];try{document.documentElement.setAttribute("data-jkalm",ee?ee.pts?ee.pts.length:"old":"none")}catch{}function wt(){return{"scapula: acromion":{k:"ext",d:[-.7,.7,.1],tol:.02,reach:.04},"scapula: coracoid process":{k:"ext",d:[.1,.15,1],tol:.012,reach:.03},"scapula: spine":{k:"ridge",bin:"m",d:[0,.15,-1],b:[.45,.98],sm:[0,.86],tol:.004},"scapula: supraspinous fossa":{k:"spinefossa",up:!0},"scapula: infraspinous fossa":{k:"spinefossa",up:!1},"scapula: subscapular fossa":{k:"band",b:[.04,.84],f:[.4,0,1,.45]},"scapula: scapular notch":{k:"notch",b:[.7,1],sm:[.3,.75]},"scapula: glenoid cavity":{k:"ext",d:[-1,0,0],b:[.62,.86],f:[-1,0,0,.45],tol:.007,reach:.025},"scapula: supraglenoid tubercle":{k:"glenoidend",up:!0},"scapula: infraglenoid tubercle":{k:"glenoidend",up:!1},"scapula: medial border":{k:"ridge",bin:"y",d:[1,0,0],b:[.05,.85],tol:.003},"scapula: superior angle":{k:"ext",d:[.8,1,0],tol:.006,reach:.02},"scapula: inferior angle":{k:"ext",d:[0,-1,0],tol:.006,reach:.02},"clavicle: acromial end":{k:"band",ax:"lat",b:[0,.12]},"clavicle: shaft":{k:"band",ax:"lat",b:[.25,.75]},"clavicle: sternal end":{k:"band",ax:"lat",b:[.88,1]},"clavicle: conoid tubercle":{k:"ext",ax:"lat",d:[0,-1,-.4],b:[.12,.38],tol:.003,reach:.012},"clavicle: sternal articular surface":{k:"ext",ax:"lat",d:[1,0,0],f:[1,0,0,.2],tol:.004,reach:.02},"humerus: head":{k:"sphere",d:[1,.7,-.4],b:[.8,1],seedR:.022,tol:.003,reach:.05},"humerus: greater tubercle":{k:"ext",d:[-1,.2,.15],b:[.82,.97],tol:.01,reach:.025},"humerus: lesser tubercle":{k:"ext",d:[.25,0,1],b:[.78,.9],tol:.004,reach:.015},"humerus: intertubercular groove":{k:"spiral",b:[.72,.9],phi:[2.7,2.7],w:.22},"humerus: anatomical neck":{k:"aneck"},"humerus: surgical neck":{k:"band",b:[.76,.82]},"humerus: deltoid tuberosity":{k:"ext",d:[-1,0,.35],b:[.45,.65],tol:.003,reach:.03},"humerus: radial groove":{k:"spiral",b:[.36,.64],phi:[.1,1.5],w:.3},"humerus: capitulum":{k:"band",b:[0,.07],sm:[.1,.4],f:[0,-.5,1,.25]},"humerus: trochlea":{k:"band",b:[0,.075],sm:[.38,.78],f:[0,-1,0,-.5]},"humerus: medial epicondyle":{k:"ext",d:[1,0,0],b:[.02,.16],tol:.007,reach:.02},"humerus: lateral epicondyle":{k:"ext",d:[-1,0,0],b:[.02,.16],tol:.005,reach:.018},"humerus: medial supracondylar ridge":{k:"ridge",bin:"y",d:[1,0,0],b:[.12,.32],tol:.002},"humerus: lateral supracondylar ridge":{k:"ridge",bin:"y",d:[-1,0,0],b:[.12,.35],tol:.002},"humerus: radial fossa":{k:"cav",b:[.06,.17],f:[0,0,1,.4],sm:[0,.5],thr:.35,reach:.012},"humerus: coronoid fossa":{k:"cav",b:[.06,.17],f:[0,0,1,.4],sm:[.5,1],thr:.35,reach:.012},"humerus: olecranon fossa":{k:"cav",b:[.05,.2],f:[0,0,-1,.4],sm:[.25,.75],thr:.3,reach:.018},"humerus: groove for ulnar nerve":{k:"cav",b:[.03,.14],f:[.3,0,-1,.2],sm:[.72,1],thr:.3,reach:.012},"radius: head":{k:"band",b:[.94,1]},"radius: neck":{k:"band",b:[.87,.935]},"radius: radial tuberosity":{k:"ext",d:[.8,0,.5],b:[.76,.88],tol:.003,reach:.014},"radius: interosseous border":{k:"ridge",bin:"y",d:[1,0,0],b:[.2,.75],tol:.002},"radius: dorsal tubercle":{k:"ext",d:[0,0,-1],b:[.04,.14],tol:.0015,reach:.008},"radius: styloid process":{k:"ext",d:[-.7,-1,0],b:[0,.15],tol:.006,reach:.014},"radius: carpal articular surface":{k:"contact",o:["Scaphoid bone","Lunate bone"],dist:.004,grow:.003,b:[0,.1]},"ulna: olecranon":{k:"ext",d:[0,1,-.7],b:[.85,1],tol:.01,reach:.022},"ulna: trochlear notch":{k:"contact",o:["Humerus"],dist:.005,grow:.004,b:[.8,1]},"ulna: coronoid process":{k:"ext",d:[0,0,1],b:[.8,.95],tol:.005,reach:.012},"ulna: radial notch":{k:"contact",o:["Radius"],dist:.004,grow:.003,b:[.8,1]},"ulna: ulnar tuberosity":{k:"ext",d:[0,-.2,1],b:[.74,.84],tol:.003,reach:.012},"ulna: styloid process":{k:"ext",d:[.2,-1,-.3],b:[0,.12],tol:.004,reach:.01},"ulna: head":{k:"band",b:[.02,.1]},"trapezium: tubercle":{k:"ext",d:[0,0,1],tol:.002,reach:.008},"hamate: hook":{k:"ext",d:[0,0,1],tol:.003,reach:.01},"hand: head":{k:"band",ax:"pca",each:!0,b:[0,.2]},"hand: shaft":{k:"band",ax:"pca",each:!0,b:[.3,.72]},"hand: base":{k:"band",ax:"pca",each:!0,b:[.8,1]},"hand: distal tuberosity":{k:"band",ax:"pca",each:!0,b:[0,.25],f:[0,0,1,-.2]},"hand: sesamoids":{k:"band",ax:"pca",each:!0,b:[0,.25],f:[0,0,1,.3]},"hand: distal transverse crease":{k:"band",ax:"pca",each:!0,b:[0,.24],f:[0,0,1,.3]},"hand: proximal transverse crease":{k:"band",ax:"pca",each:!0,b:[.25,.5],f:[0,0,1,.3]},"tendon: distal":{k:"band",b:[0,.4]},"tendon: distal long":{k:"band",b:[0,.55]},"muscle: first dorsal interosseous":{k:"ext",d:[-1,0,0],tol:.014,reach:.03},"muscle: lumbricals radial":{k:"ext",d:[-1,0,0],tol:.034,reach:.06},"muscle: lumbricals ulnar":{k:"ext",d:[1,0,0],tol:.036,reach:.06},"vertebra: body":{k:"vert",part:"body"},"vertebra: arch":{k:"vert",part:"arch"},"vertebra: pedicle":{k:"vert",part:"pedicle"},"vertebra: lamina":{k:"vert",part:"lamina"},"vertebra: foramen":{k:"vert",part:"foramen"},"vertebra: superior notch":{k:"vert",part:"supnotch"},"vertebra: inferior notch":{k:"vert",part:"infnotch"},"vertebra: spinous process":{k:"vert",part:"spinous"},"vertebra: superior articular process":{k:"vert",part:"supart"},"vertebra: inferior articular process":{k:"vert",part:"infart"},"vertebra: pars interarticularis":{k:"vert",part:"pars"},"vertebra: transverse process":{k:"vert",part:"transverse"},"cervical: transverse process":{k:"vert",part:"transverse",xr:[1.4,9],zr:[-.6,1.6]},"cervical: transverse foramen":{k:"vert",part:"transforamen"},"atlas: posterior arch":{k:"vert",part:"arch",zr:[-9,-.35]},"atlas: anterior tubercle":{k:"ext",d:[0,0,1],tol:.003,reach:.01},"axis: dens":{k:"vert",part:"dens"},"thoracic: superior costal facet":{k:"vert",part:"contact",o:["Sixth rib.l","Sixth rib.r"],zr:[.2,9],tb:[.45,1]},"thoracic: inferior costal facet":{k:"vert",part:"contact",o:["Seventh rib.l","Seventh rib.r"],zr:[.2,9],tb:[0,.55]},"thoracic: transverse costal facet":{k:"vert",part:"contact",o:["Sixth rib.l","Sixth rib.r"],xr:[1.4,9],zr:[-9,.4]},"vertebra: intervertebral foramen":{k:"vert",part:"ivf"},"hip: ilium":{k:"band",b:[.5,1]},"hip: ischium":{k:"band",b:[0,.42],sa:[0,.5]},"hip: pubis":{k:"band",b:[0,.45],sa:[.5,1],sm:[.45,1]},"hip: superior pubic ramus":{k:"band",b:[.22,.45],sa:[.55,1],sm:[.45,.92]},"hip: inferior pubic ramus":{k:"band",b:[.04,.25],sm:[.6,1],sa:[.35,.85]},"hip: symphyseal surface":{k:"ext",d:[1,0,0],f:[1,0,0,.4],tol:.004,reach:.03},"hip: pectineal line":{k:"ridge",bin:"m",d:[0,1,.3],b:[.25,.48],sa:[.5,1],sm:[.5,.95],tol:.003},"hip: arcuate line":{k:"arcuate",b:[.42,.8],f:[1,.2,.3,.45],sa:[.1,.85]},"hip: obturator foramen":{k:"hole",b:[0,.45],outline:"loop"},"hip: auricular surface":{k:"contact",o:["Sacrum"],dist:.006,grow:.004},"hip: iliac fossa":{k:"band",b:[.6,.97],f:[1,.2,.3,.45]},"femur: trochanteric fossa":{k:"cav",b:[.9,.98],f:[.3,0,-1,.1],sm:[0,.5],thr:.3,reach:.015},"femur: intertrochanteric crest":{k:"ridge",bin:"y",d:[0,0,-1],b:[.83,.95],sm:[.05,.6],tol:.003},"femur: intertrochanteric line":{k:"ridge",bin:"y",d:[0,0,1],b:[.84,.95],sm:[.05,.7],tol:.003},"femur: gluteal tuberosity":{k:"ext",d:[-.6,0,-1],b:[.68,.82],tol:.003,reach:.03},"femur: popliteal surface":{k:"band",b:[.06,.22],f:[0,0,-1,.5],sm:[.2,.8]},"tibia: medial plateau":{k:"band",b:[.96,1],f:[0,1,0,.55],sm:[.5,1]},"tibia: lateral plateau":{k:"band",b:[.96,1],f:[0,1,0,.55],sm:[0,.5]},"tibia: medial condyle":{k:"band",b:[.86,.99],sm:[.52,1]},"tibia: lateral condyle":{k:"band",b:[.86,.99],sm:[0,.48]},"tibia: soleal line":{k:"spiral",b:[.6,.8],phi:[.9,-1.1],w:.2},"tibia: tibial tuberosity":{k:"ext",d:[0,0,1],b:[.8,.94],tol:.004,reach:.02},"tibia: medial malleolus":{k:"ext",d:[1,-1,0],b:[0,.1],tol:.008,reach:.02},"fibula: head":{k:"band",b:[.93,1]},"fibula: neck":{k:"band",b:[.87,.93]},"fibula: lateral malleolus":{k:"band",b:[0,.12]},"calcaneus: tuberosity":{k:"ext",d:[0,0,-1],tol:.01,reach:.025},"calcaneus: sustentaculum tali":{k:"ext",d:[1,.3,0],tol:.005,reach:.015},"hip: greater sciatic notch":{k:"ridge",bin:"y",d:[.3,0,-1],b:[.33,.58],on:/^hip bone$/i,tol:.011,outline:"arc"},"hip: lesser sciatic notch":{k:"ridge",bin:"y",d:[.3,0,-1],b:[.17,.31],on:/^hip bone$/i,tol:.009,outline:"arc"},"tibia: pes anserinus":{k:"ext",d:[.7,-.2,.6],b:[.8,.9],tol:.006,reach:.022},"muscle: obturator internus tendon":{k:"ext",d:[-1,0,0],tol:.022,reach:.045},"space: femoral triangle":{k:"band",ya:[.79,.9]},"space: adductor canal":{k:"band",ya:[.55,.72]},"space: adductor hiatus":{k:"band",ya:[.5,.56]},"cord: cervical enlargement":{k:"band",ya:[1.435,1.515]},"cord: lumbosacral enlargement":{k:"band",ya:[1.09,1.225]},"cord: conus medullaris":{k:"band",ya:[1.05,1.115]},"cauda: filum terminale":{k:"band",b:[0,.18]},"dura: dural sac":{k:"band",ya:[.85,1.07]},"temporal: mastoid":{k:"ext",each:!0,d:[0,-1,-.7],tol:.008,reach:.02},"vertebra: epidural":{k:"vert",part:"foramen",on:/^(vertebra|atlas|axis)/i},"muscle: gluteal fold":{k:"ext",d:[0,-1,-.3],tol:.012,reach:.09},"muscle: adductor part":{k:"ext",d:[-.6,.3,.6],tol:.05,reach:.25},"muscle: hamstring part":{k:"ext",d:[.7,0,-.7],tol:.03,reach:.45},"plexus: lateral cord":{k:"band",ya:[1.352,1.42]},"plexus: medial cord":{k:"band",ya:[1.352,1.42]},"tendon: proximal":{k:"band",each:!0,b:[.86,1]},"aponeurosis: palm":{k:"band",ya:[.785,.875]},"tendon: biceps long head":{k:"band",b:[.8,1]},"tendon: expansion":{k:"band",b:[0,.16]},"vessel: distal":{k:"band",b:[0,.72]},"nerve: recurrent median":{k:"ext",d:[-1,0,.6],ya:[.8,.87],tol:.006,reach:.02},"scaphoid: snuffbox":{k:"ext",d:[-1,0,-.4],tol:.004,reach:.012}}}function Xt(y,S){let E=st[y];if(!E)return null;let N=V?-1:1,Y=k=>{if(k._md)return k._md;let z=k.mesh.geometry;if(z.attributes.normal||z.computeVertexNormals(),!z.userData.jkaSub&&z.index&&k.layer==="bone"){let te=z;if(z=te.userData.jkaSubG||Qt(te,.0025/k.mesh.matrixWorld.getMaxScaleOnAxis()),z.userData.jkaSub=!0,!te.userData.jkaSubG){te.userData.jkaSubG=z;try{z.computeBoundsTree()}catch{}}k.mesh.geometry=z,k.mesh.userData.coarse=te,F.forEach(de=>{de.mesh.geometry===te&&(de.mesh.geometry=z,de.mesh.userData.coarse=te)})}let he=z.attributes.position,Z=z.attributes.normal,fe=he.count,He=new Float32Array(fe*3),at=new Float32Array(fe*3),nt=new T,an=new hn().getNormalMatrix(k.mesh.matrixWorld);for(let te=0;te<fe;te++)nt.fromBufferAttribute(he,te).applyMatrix4(k.mesh.matrixWorld),He[te*3]=nt.x,He[te*3+1]=nt.y,He[te*3+2]=nt.z,nt.fromBufferAttribute(Z,te).applyMatrix3(an).normalize(),at[te*3]=nt.x,at[te*3+1]=nt.y,at[te*3+2]=nt.z;let Yt=Array.from({length:fe},()=>[]),Rt=z.index?z.index.array:null;if(Rt)for(let te=0;te<Rt.length;te+=3)for(let de=0;de<3;de++){let xe=Rt[te+de],Ee=Rt[te+(de+1)%3];Yt[xe].push(Ee),Yt[Ee].push(xe)}let Se=new Float32Array(fe);for(let te=0;te<fe;te++){let de=Yt[te];if(!de.length)continue;let xe=0,Ee=0,se=0,J=0;de.forEach(Te=>{let we=He[Te*3]-He[te*3],_t=He[Te*3+1]-He[te*3+1],je=He[Te*3+2]-He[te*3+2];xe+=we,Ee+=_t,se+=je,J+=we*we+_t*_t+je*je}),Se[te]=2*(xe*at[te*3]+Ee*at[te*3+1]+se*at[te*3+2])/Math.max(J,1e-12)}for(let te=0;te<6;te++){let de=new Float32Array(fe);for(let xe=0;xe<fe;xe++){let Ee=Se[xe],se=1;Yt[xe].forEach(J=>{Ee+=Se[J],se++}),de[xe]=Ee/se}Se=de}return k._md={n:fe,P:He,N:at,nb:Yt,K:Se}},K=S||I,W=(k,z)=>new T(k.P[z*3],k.P[z*3+1],k.P[z*3+2]),ve=(k,z,he,Z)=>N*he[0]*Z[z*3]+he[1]*Z[z*3+1]+he[2]*Z[z*3+2],G=(k,z)=>{let he=new Map;return k.forEach(Z=>{let fe=Math.floor(Z.x/z)+","+Math.floor(Z.y/z)+","+Math.floor(Z.z/z);(he.get(fe)||he.set(fe,[]).get(fe)).push(Z)}),(Z,fe)=>{let He=Math.ceil(fe/z),at=Math.floor(Z.x/z),nt=Math.floor(Z.y/z),an=Math.floor(Z.z/z);for(let Yt=-He;Yt<=He;Yt++)for(let Rt=-He;Rt<=He;Rt++)for(let Se=-He;Se<=He;Se++){let te=he.get(at+Yt+","+(nt+Rt)+","+(an+Se));if(te){for(let de of te)if(de.distanceToSquared(Z)<fe*fe)return!0}}return!1}},B=new Map,$=null,ge=-1/0,Ie={},ze=E.on?K.filter(k=>E.on.test(k.name)):K,Xe=E.each?ze.map(k=>[k]):[ze],ct=null;Xe.forEach(k=>{let z=k.map(Y),he;if(E.ax==="lat"){let de=1e9,xe=-1e9;z.forEach(Ee=>{for(let se=0;se<Ee.n;se++){let J=N*Ee.P[se*3];de=Math.min(de,J),xe=Math.max(xe,J)}}),he=(Ee,se)=>(N*Ee.P[se*3]-de)/(xe-de)}else if(E.ax==="pca"){let de=new T,xe=0;z.forEach(Te=>{for(let we=0;we<Te.n;we++)de.add(W(Te,we)),xe++}),de.multiplyScalar(1/xe);let Ee=new T(0,1,0);for(let Te=0;Te<12;Te++){let we=new T;z.forEach(_t=>{for(let je=0;je<_t.n;je++){let dt=W(_t,je).sub(de);we.addScaledVector(dt,dt.dot(Ee))}}),Ee=we.normalize()}{let Te=F.find(_t=>_t.name==="Capitate bone"),we=Te?new on().setFromObject(Te.mesh).getCenter(new T):null;(we?we.clone().sub(de).dot(Ee)<0:Ee.y<0)&&Ee.negate()}let se=1e9,J=-1e9;z.forEach(Te=>{for(let we=0;we<Te.n;we++){let _t=W(Te,we).sub(de).dot(Ee);se=Math.min(se,_t),J=Math.max(J,_t)}}),he=(Te,we)=>(W(Te,we).sub(de).dot(Ee)-se)/(J-se)}else{let de=1e9,xe=-1e9;z.forEach(Ee=>{for(let se=0;se<Ee.n;se++)de=Math.min(de,Ee.P[se*3+1]),xe=Math.max(xe,Ee.P[se*3+1])}),he=(Ee,se)=>(Ee.P[se*3+1]-de)/(xe-de)}let Z=(de,xe)=>!E.b||he(de,xe)>=E.b[0]&&he(de,xe)<=E.b[1],fe=1e9,He=-1e9,at=1e9,nt=-1e9;z.forEach(de=>{for(let xe=0;xe<de.n;xe++)if(Z(de,xe)){let Ee=N*de.P[xe*3],se=de.P[xe*3+2];fe=Math.min(fe,Ee),He=Math.max(He,Ee),at=Math.min(at,se),nt=Math.max(nt,se)}});let an=(de,xe)=>Z(de,xe)&&(!E.ya||de.P[xe*3+1]>=E.ya[0]&&de.P[xe*3+1]<=E.ya[1])&&(!E.f||ve(de,xe,E.f,de.N)>=E.f[3])&&(!E.sm||(N*de.P[xe*3]-fe)/(He-fe)>=E.sm[0]&&(N*de.P[xe*3]-fe)/(He-fe)<=E.sm[1])&&(!E.sa||(de.P[xe*3+2]-at)/(nt-at)>=E.sa[0]&&(de.P[xe*3+2]-at)/(nt-at)<=E.sa[1]),Yt=z.map(de=>new Float32Array(de.n)),Rt=de=>z.forEach((xe,Ee)=>{for(let se=0;se<xe.n;se++)an(xe,se)&&de(xe,se,Ee)}),Se=de=>{let xe=null,Ee=-1/0;return Rt((se,J,Te)=>{let we=de(se,J);we>Ee&&(Ee=we,xe=[se,J,Te])}),[xe,Ee]},te=E.k;if(te==="ext"||te==="sphere"){let[de,xe]=Se((se,J)=>ve(se,J,E.d,se.P));if(!de)return;let Ee=W(de[0],de[1]);if(te==="ext")Rt((se,J,Te)=>{let we=ve(se,J,E.d,se.P);we>=xe-E.tol&&W(se,J).distanceTo(Ee)<E.reach&&(Yt[Te][J]=Math.min(1,(we-(xe-E.tol))/(E.tol*.5)))});else{let se=[];Rt((Te,we)=>{let _t=W(Te,we);_t.distanceTo(Ee)<E.seedR&&se.push(_t)});let J=Bt(se);for(let Te=0;Te<3;Te++)se=[],Rt((we,_t)=>{let je=W(we,_t);Math.abs(je.distanceTo(J.c)-J.r)<.003&&se.push(je)}),se.length>20&&(J=Bt(se));ct=J,Rt((Te,we,_t)=>{let je=W(Te,we);Math.abs(je.distanceTo(J.c)-J.r)<E.tol&&je.distanceTo(Ee)<E.reach&&(Yt[_t][we]=1)})}xe>ge&&(ge=xe,$=Ee)}else if(te==="ridge"){let de=(Ee,se)=>Math.round((E.bin==="m"?N*Ee.P[se*3]:E.bin==="a"?Ee.P[se*3+2]:Ee.P[se*3+1])/.006),xe={};Rt((Ee,se)=>{let J=de(Ee,se),Te=ve(Ee,se,E.d,Ee.P);(xe[J]==null||Te>xe[J])&&(xe[J]=Te)}),Rt((Ee,se,J)=>{let Te=1-(xe[de(Ee,se)]-ve(Ee,se,E.d,Ee.P))/E.tol;Te>0&&(Yt[J][se]=Math.min(1,Te*1.5))})}else if(te==="cav"){let[de,xe]=Se((se,J)=>se.K[J]);if(!de||xe<=0)return;let Ee=W(de[0],de[1]);Rt((se,J,Te)=>{let we=se.K[J];we>=E.thr*xe&&W(se,J).distanceTo(Ee)<E.reach&&(Yt[Te][J]=Math.min(1,(we-E.thr*xe)/(.3*xe)))}),$=Ee}else if(te==="spiral"){let de={};Rt((xe,Ee)=>{let se=Math.round(xe.P[Ee*3+1]/.006),J=de[se]||(de[se]=[0,0,0]);J[0]+=xe.P[Ee*3],J[1]+=xe.P[Ee*3+2],J[2]++}),Rt((xe,Ee,se)=>{let J=de[Math.round(xe.P[Ee*3+1]/.006)],Te=N*(xe.P[Ee*3]-J[0]/J[2]),we=xe.P[Ee*3+2]-J[1]/J[2],_t=Math.atan2(-Te,-we),je=(he(xe,Ee)-E.b[1])/(E.b[0]-E.b[1]),dt=E.phi[0]+(E.phi[1]-E.phi[0])*je,it=Math.abs(_t-dt);it>Math.PI&&(it=2*Math.PI-it),it<E.w&&(Yt[se][Ee]=Math.min(1,(E.w-it)/(E.w*.4)))})}else if(te==="hole"){let xe=new Set,Ee=lt=>Math.floor(lt.z/.003),se=lt=>Math.floor(lt.y/.003),J=1e9,Te=-1e9,we=1e9,_t=-1e9;Rt((lt,nn)=>{let Rn=W(lt,nn),Wn=Ee(Rn),zi=se(Rn);xe.add(Wn+","+zi),J=Math.min(J,Wn),Te=Math.max(Te,Wn),we=Math.min(we,zi),_t=Math.max(_t,zi)});let je=new Set(xe);xe.forEach(lt=>{let[nn,Rn]=lt.split(",").map(Number);for(let[Wn,zi]of[[1,0],[-1,0],[0,1],[0,-1]])je.add(nn+Wn+","+(Rn+zi))});let dt=new Set,it=[];for(let lt=J-1;lt<=Te+1;lt++)it.push([lt,we-1],[lt,_t+1]);for(let lt=we-1;lt<=_t+1;lt++)it.push([J-1,lt],[Te+1,lt]);for(;it.length;){let[lt,nn]=it.pop(),Rn=lt+","+nn;lt<J-1||lt>Te+1||nn<we-1||nn>_t+1||dt.has(Rn)||je.has(Rn)||(dt.add(Rn),it.push([lt+1,nn],[lt-1,nn],[lt,nn+1],[lt,nn-1]))}let cn=new Set;for(let lt=J;lt<=Te;lt++)for(let nn=we;nn<=_t;nn++){let Rn=lt+","+nn;!je.has(Rn)&&!dt.has(Rn)&&cn.add(Rn)}if(!cn.size)return;Rt((lt,nn,Rn)=>{let Wn=W(lt,nn),zi=Ee(Wn),ls=se(Wn),U=!1;for(let pe=-3;pe<=3&&!U;pe++)for(let Ce=-3;Ce<=3&&!U;Ce++)cn.has(zi+pe+","+(ls+Ce))&&(U=!0);U&&(Yt[Rn][nn]=1)})}else if(te==="arcuate"){let de={},xe=(Ee,se)=>Math.round(Ee.P[se*3+2]/.005);Rt((Ee,se)=>{let J=Ee.P[se*3+1],Te=xe(Ee,se);(de[Te]==null||J<de[Te])&&(de[Te]=J)}),Rt((Ee,se,J)=>{Ee.P[se*3+1]<de[xe(Ee,se)]+.004&&(Yt[J][se]=1)})}else if(te==="vert"){let de={body:{zr:[.95,9]},arch:{zr:[-9,.95]},pedicle:{xr:[.8,1.7],zr:[-.3,1],tb:[.25,.85]},lamina:{xr:[0,1.3],zr:[-1.9,-.6]},spinous:{xr:[0,.7],zr:[-9,-1.4]},transverse:{xr:[1.7,9],zr:[-9,.6]},supart:{xr:[.6,2.4],zr:[-2,.2],tb:[.65,1]},infart:{xr:[.2,1.9],zr:[-2.4,-.5],tb:[0,.35]},pars:{xr:[.5,1.9],zr:[-1.8,-.2],tb:[.3,.65]},supnotch:{xr:[.7,1.9],zr:[-.5,1.1],tb:[.45,1],ny:.2},infnotch:{xr:[.7,1.9],zr:[-.5,1.1],tb:[0,.55],ny:-.2},dens:{xr:[0,.8],zr:[.45,9],tb:[.7,1]},contact:{}},xe=k.map((Ee,se)=>[se,z[se].P.reduce((J,Te,we)=>we%3===1?J+Te:J,0)/z[se].n]).sort((Ee,se)=>se[1]-Ee[1]).map(Ee=>Ee[0]);k.forEach((Ee,se)=>{let J=z[se],Te=6e-4,we=1e9,_t=-1e9,je=1e9,dt=-1e9,it=1e9,cn=-1e9;for(let Ae=0;Ae<J.n;Ae++)we=Math.min(we,J.P[Ae*3]),_t=Math.max(_t,J.P[Ae*3]),it=Math.min(it,J.P[Ae*3+1]),cn=Math.max(cn,J.P[Ae*3+1]),je=Math.min(je,J.P[Ae*3+2]),dt=Math.max(dt,J.P[Ae*3+2]);let lt=Math.ceil((_t-we)/Te)+3,nn=Math.ceil((dt-je)/Te)+3,Rn=new Uint8Array(lt*nn),Wn=(Ae,pt)=>Math.floor((Ae-we)/Te)+1+(Math.floor((pt-je)/Te)+1)*lt,zi=Ee.mesh.geometry,ls=zi.index?zi.index.array:null,U=ls?ls.length/3:J.n/3;for(let Ae=0;Ae<U;Ae++){let pt=ls?ls[Ae*3]:Ae*3,ft=ls?ls[Ae*3+1]:Ae*3+1,Ut=ls?ls[Ae*3+2]:Ae*3+2,xt=J.P[pt*3],It=J.P[pt*3+2],dn=J.P[ft*3],li=J.P[ft*3+2],Pi=J.P[Ut*3],Ct=J.P[Ut*3+2],ln=Math.max(Math.hypot(dn-xt,li-It),Math.hypot(Pi-xt,Ct-It),Math.hypot(Pi-dn,Ct-li)),rn=Math.max(1,Math.ceil(ln/(Te*.7)));for(let In=0;In<=rn;In++)for(let Cn=0;Cn<=rn-In;Cn++){let qn=In/rn,ii=Cn/rn,Xn=1-qn-ii;Rn[Wn(xt*Xn+dn*qn+Pi*ii,It*Xn+li*qn+Ct*ii)]=1}}let pe=new Int32Array(lt*nn).fill(-1),Ce=[0];for(pe[0]=0;Ce.length;){let Ae=Ce.pop(),pt=Ae%lt,ft=(Ae-pt)/lt;for(let[Ut,xt]of[[1,0],[-1,0],[0,1],[0,-1]]){let It=pt+Ut,dn=ft+xt;if(It<0||dn<0||It>=lt||dn>=nn)continue;let li=It+dn*lt;pe[li]===-1&&!Rn[li]&&(pe[li]=0,Ce.push(li))}}let Fe=[];for(let Ae=0;Ae<lt*nn;Ae++){if(Rn[Ae]||pe[Ae]!==-1)continue;let pt=Fe.length+1,ft={n:0,sx:0,sz:0};pe[Ae]=pt;let Ut=[Ae];for(;Ut.length;){let xt=Ut.pop(),It=xt%lt,dn=(xt-It)/lt;ft.n++,ft.sx+=It,ft.sz+=dn;for(let[li,Pi]of[[1,0],[-1,0],[0,1],[0,-1]]){let Ct=It+li,ln=dn+Pi,rn=Ct+ln*lt;Ct>=0&&ln>=0&&Ct<lt&&ln<nn&&pe[rn]===-1&&!Rn[rn]&&(pe[rn]=pt,Ut.push(rn))}}ft.x=we+(ft.sx/ft.n-1+.5)*Te,ft.z=je+(ft.sz/ft.n-1+.5)*Te,ft.r=Math.sqrt(ft.n/Math.PI)*Te,Fe.push(ft)}Fe.sort((Ae,pt)=>pt.n-Ae.n);let et=Fe[0]||{x:(we+_t)/2,z:(je+dt)/2,r:.008},Le={x:et.x,z:et.z},ut=0,Je=0,Qe=0;F.filter(Ae=>/spinal cord|cauda equina/i.test(Ae.name)).forEach(Ae=>{let pt=Y(Ae);for(let ft=0;ft<pt.n;ft++){let Ut=pt.P[ft*3+1];Ut>it+.3*(cn-it)&&Ut<cn-.3*(cn-it)&&(Je+=pt.P[ft*3],Qe+=pt.P[ft*3+2],ut++)}}),ut>10&&(Le={x:Je/ut,z:Qe/ut});let gt=new Array(24).fill(1e9);for(let Ae=0;Ae<J.n;Ae++){let pt=J.P[Ae*3+1];if(pt<it+.2*(cn-it)||pt>cn-.2*(cn-it))continue;let ft=J.P[Ae*3]-Le.x,Ut=J.P[Ae*3+2]-Le.z,xt=Math.hypot(ft,Ut),It=Math.floor((Math.atan2(Ut,ft)+Math.PI)/(2*Math.PI)*24)%24;xt<gt[It]&&(gt[It]=xt)}let be=gt.filter(Ae=>Ae<.03).sort((Ae,pt)=>Ae-pt),ht=be.length?be[Math.floor(be.length/2)]:.008;ht=Math.max(.005,Math.min(ht,.015));let me=E.part==="ivf"?xe.indexOf(se)===0?"infnotch":"supnotch":E.part,Ve=Object.assign({},de[me]||{},E.xr?{xr:E.xr}:{},E.zr?{zr:E.zr}:{},E.tb?{tb:E.tb}:{}),At=(Ae,pt)=>!pt||Ae>=pt[0]&&Ae<=pt[1],yn=Ae=>(J.P[Ae*3+1]-it)/(cn-it),sn=null;if(me==="contact"){let Ae=[];E.o.forEach(pt=>F.filter(ft=>ft.name===pt).forEach(ft=>{let Ut=Y(ft);for(let xt=0;xt<Ut.n;xt++)Ae.push(W(Ut,xt))})),sn=G(Ae,.005)}for(let Ae=0;Ae<J.n;Ae++){let pt=Math.abs(J.P[Ae*3]-Le.x)/ht,ft=(J.P[Ae*3+2]-Le.z)/ht,Ut=yn(Ae);if(E.part==="ivf"&&pt>.8&&pt<1.7&&ft>-.3&&ft<.6){let It=J.P[Ae*3]>Le.x?1:-1,dn=Ie[It]||(Ie[It]={top:-1e9,bot:1e9,xs:0,zs:0,n:0,pt:1e9,pb:-1e9});dn.pt==null&&(dn.pt=1e9,dn.pb=-1e9),me==="infnotch"?Ut>.25&&(dn.pt=Math.min(dn.pt,J.P[Ae*3+1])):Ut<.72&&(dn.pb=Math.max(dn.pb,J.P[Ae*3+1]))}let xt;if(me==="foramen"){let It=Math.hypot(J.P[Ae*3]-Le.x,J.P[Ae*3+2]-Le.z);xt=It<ht*1.25&&(Le.x-J.P[Ae*3])*J.N[Ae*3]+(Le.z-J.P[Ae*3+2])*J.N[Ae*3+2]>.3*It}else me==="transforamen"?xt=Fe.slice(1).some(It=>It.n>20&&Math.abs(It.x-Le.x)>ht&&Math.hypot(J.P[Ae*3]-It.x,J.P[Ae*3+2]-It.z)<It.r*1.6):(xt=At(pt,Ve.xr)&&At(ft,Ve.zr)&&At(Ut,Ve.tb)&&(Ve.ny==null||(Ve.ny>0?J.N[Ae*3+1]>Ve.ny:J.N[Ae*3+1]<Ve.ny)),xt&&sn&&(xt=sn(W(J,Ae),.006)));if(xt&&an(J,Ae)&&(Yt[se][Ae]=1,E.part==="ivf")){let It=J.P[Ae*3]>Le.x?1:-1,dn=Ie[It]||(Ie[It]={top:-1e9,bot:1e9,xs:0,zs:0,n:0});me==="infnotch"?dn.top=Math.max(dn.top,J.P[Ae*3+1]):dn.bot=Math.min(dn.bot,J.P[Ae*3+1]),dn.xs+=J.P[Ae*3],dn.zs+=J.P[Ae*3+2],dn.n++}}})}else if(te==="swell"){let de={};Rt((je,dt)=>{let it=Math.round(je.P[dt*3+1]/.003),cn=je.P[dt*3],lt=de[it]||(de[it]=[1e9,-1e9]);cn<lt[0]&&(lt[0]=cn),cn>lt[1]&&(lt[1]=cn)});let xe=Object.keys(de).map(Number).sort((je,dt)=>je-dt);if(!xe.length)return;let Ee=je=>de[je][1]-de[je][0],se=je=>[je-1,je,je+1].filter(dt=>de[dt]).reduce((dt,it,cn,lt)=>dt+Ee(it)/lt.length,0),J=xe[0];xe.forEach(je=>{se(je)>se(J)&&(J=je)});let Te=E.frac*se(J),we=J,_t=J;for(;de[we-1]&&se(we-1)>=Te;)we--;for(;de[_t+1]&&se(_t+1)>=Te;)_t++;Rt((je,dt,it)=>{let cn=Math.round(je.P[dt*3+1]/.003);cn>=we&&cn<=_t&&(Yt[it][dt]=1)});try{document.documentElement.setAttribute("data-swell",[we*3,_t*3,(se(J)*1e3).toFixed(1)].join(","))}catch{}}else if(te==="band")Rt((de,xe,Ee)=>{Yt[Ee][xe]=1});else if(te==="contact"){let de=[];E.o.forEach(se=>F.filter(J=>J.name===se).forEach(J=>{let Te=Y(J);for(let we=0;we<Te.n;we++)de.push(W(Te,we))}));let xe=G(de,.005),Ee=[];if(Rt((se,J,Te)=>{let we=W(se,J);xe(we,E.dist)&&(Yt[Te][J]=1,Ee.push(we))}),E.grow&&Ee.length){let se=G(Ee,.005);Rt((J,Te,we)=>{!Yt[we][Te]&&se(W(J,Te),E.grow)&&(Yt[we][Te]=.7)})}}else if(te==="notch"){let de={};Rt((se,J)=>{if(se.N[J*3+1]<.2)return;let Te=Math.round(N*se.P[J*3]/.004);(de[Te]==null||se.P[J*3+1]>de[Te])&&(de[Te]=se.P[J*3+1])});let xe=Object.keys(de).map(Number).sort((se,J)=>se-J);if(xe.length<3)return;let Ee=xe[1];xe.slice(1,-1).forEach(se=>{de[se]<de[Ee]&&(Ee=se)}),Rt((se,J,Te)=>{let we=Math.round(N*se.P[J*3]/.004);Math.abs(we-Ee)<=1&&se.P[J*3+1]>de[Ee]-.006&&se.N[J*3+1]>0&&(Yt[Te][J]=1)})}else if(te==="glenoidend"){let de=Xt("scapula: glenoid cavity",k);if(!de)return;let xe=de.pts,se=xe.reduce((we,_t)=>!we||(E.up?_t.y>we.y:_t.y<we.y)?_t:we,null).clone().add(new T(0,E.up?.006:-.011,0)),J=E.up?.009:.012,Te=G(xe,.005);Rt((we,_t,je)=>{let dt=W(we,_t);dt.distanceTo(se)<J&&!Te(dt,.0015)&&(Yt[je][_t]=1-dt.distanceTo(se)/J*.5)}),$=se}else if(te==="socket"){let de=F.filter(Te=>Te.name==="Humerus"),xe=de.length?Xt("humerus: head",de):null;if(!xe||!xe.sphere)return;let Ee=xe.sphere.c,se=xe.sphere.r,J=[];if(Rt((Te,we,_t)=>{let je=W(Te,we);if(je.distanceTo(Ee)<se+.015){let it=new T(Te.N[we*3],Te.N[we*3+1],Te.N[we*3+2]),cn=Ee.clone().sub(je).normalize();it.dot(cn)>.55&&(J.push(je),te==="socket"&&(Yt[_t][we]=1))}}),te==="glenoidend"&&J.length){let we=J.reduce((dt,it)=>!dt||(E.up?it.y>dt.y:it.y<dt.y)?it:dt,null).clone().add(new T(0,E.up?.006:-.011,0)),_t=E.up?.009:.012,je=G(J,.005);Rt((dt,it,cn)=>{let lt=W(dt,it);lt.distanceTo(we)<_t&&!je(lt,.0015)&&(Yt[cn][it]=1-lt.distanceTo(we)/_t*.5)}),$=we}}else if(te==="aneck"){let de=Xt("humerus: head",k);if(!de)return;let xe=[];k.forEach(se=>{let J=de.W.get(se),Te=Y(se);if(J)for(let we=0;we<Te.n;we++)J[we]>.35&&Te.nb[we].some(_t=>J[_t]<=.35)&&xe.push(W(Te,we))});let Ee=G(xe,.005);Rt((se,J,Te)=>{Ee(W(se,J),.0035)&&(Yt[Te][J]=1)})}else if(te==="spinefossa"){let de=Xt("scapula: spine",k);if(!de)return;let xe=1e9,Ee=-1e9;de.pts.forEach(je=>{xe=Math.min(xe,N*je.x),Ee=Math.max(Ee,N*je.x)});let se={};de.pts.forEach(je=>{if((N*je.x-xe)/(Ee-xe)<.3)return;let dt=Math.round(N*je.x/.006);se[dt]=se[dt]==null?je.y:Math.max(se[dt],je.y)});let J=je=>{let dt=Math.round(N*je.x/.006);for(let it=0;it<20;it++){if(se[dt+it]!=null)return se[dt+it];if(se[dt-it]!=null)return se[dt-it]}return null},Te=1e9,we=-1e9;z.forEach(je=>{for(let dt=0;dt<je.n;dt++){let it=N*je.P[dt*3];Te=Math.min(Te,it),we=Math.max(we,it)}});let _t=new Set(de.pts.map(je=>je.x.toFixed(5)+je.y.toFixed(5)));Rt((je,dt,it)=>{let cn=W(je,dt),lt=J(cn);if(lt==null)return;let nn=-je.N[dt*3+2],Rn=(N*cn.x-Te)/(we-Te);_t.has(cn.x.toFixed(5)+cn.y.toFixed(5))||(E.up?cn.y>lt+.002&&nn>-.15&&Rn>.12:cn.y<lt-.006&&nn>.25&&Rn>.14)&&(Yt[it][dt]=1)})}k.forEach((de,xe)=>{let Ee=B.get(de);B.set(de,Ee?Ee.map((se,J)=>Math.max(se,Yt[xe][J])):Yt[xe])})});let q=[];if(B.forEach((k,z)=>{let he=Y(z),Z=new Float32Array(he.n);for(let fe=0;fe<he.n;fe++){let He=k[fe]*2,at=2;he.nb[fe].forEach(nt=>{He+=k[nt],at++}),Z[fe]=Math.max(k[fe]*.85,He/at),Z[fe]>.35&&q.push(W(he,fe))}B.set(z,Z)}),!q.length)return null;if(!$){let k=q.reduce((z,he)=>z.add(he),new T).multiplyScalar(1/q.length);$=q.reduce((z,he)=>!z||he.distanceToSquared(k)<z.distanceToSquared(k)?he:z,null)}return{pt:$,W:B,pts:q,sphere:ct,ivf:Ie}}function Qt(y,S){let E=y.attributes.position,N=y.attributes.normal,Y=[],K=[];for(let B=0;B<E.count;B++)Y.push(E.getX(B),E.getY(B),E.getZ(B)),K.push(N.getX(B),N.getY(B),N.getZ(B));let W=Array.from(y.index.array),ve=S*S;for(let B=0;B<7;B++){let $=new Map,ge=[],Ie=0,ze=(k,z)=>{let he=Y[k*3]-Y[z*3],Z=Y[k*3+1]-Y[z*3+1],fe=Y[k*3+2]-Y[z*3+2];return he*he+Z*Z+fe*fe},Xe=(k,z)=>{let he=k<z?k+"_"+z:z+"_"+k,Z=$.get(he);if(Z!=null)return Z;Z=Y.length/3;for(let fe=0;fe<3;fe++)Y.push((Y[k*3+fe]+Y[z*3+fe])/2),K.push((K[k*3+fe]+K[z*3+fe])/2);return $.set(he,Z),Z},ct=new Set;for(let k=0;k<W.length;k+=3)for(let z=0;z<3;z++){let he=W[k+z],Z=W[k+(z+1)%3];ze(he,Z)>ve&&ct.add(he<Z?he+"_"+Z:Z+"_"+he)}if(!ct.size)break;let q=(k,z)=>ct.has(k<z?k+"_"+z:z+"_"+k);for(let k=0;k<W.length;k+=3){let z=W[k],he=W[k+1],Z=W[k+2],fe=[q(z,he),q(he,Z),q(Z,z)],He=fe[0]+fe[1]+fe[2];if(!He){ge.push(z,he,Z);continue}if(Ie++,He===3){let at=Xe(z,he),nt=Xe(he,Z),an=Xe(Z,z);ge.push(z,at,an,at,he,nt,an,nt,Z,at,nt,an);continue}for(;!(He===1?q(z,he):q(z,he)&&q(he,Z));){let at=z;z=he,he=Z,Z=at}if(He===1){let at=Xe(z,he);ge.push(z,at,Z,at,he,Z)}else{let at=Xe(z,he),nt=Xe(he,Z);ge.push(z,at,Z,at,he,nt,at,nt,Z)}}if(W=ge,!Ie)break}for(let B=0;B<K.length;B+=3){let $=Math.hypot(K[B],K[B+1],K[B+2])||1;K[B]/=$,K[B+1]/=$,K[B+2]/=$}let G=new wi;return G.setAttribute("position",new fi(Y,3)),G.setAttribute("normal",new fi(K,3)),G.setIndex(Y.length/3>65535?new Zo(W,1):new jo(W,1)),G}function Bt(y){let S=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],E=[0,0,0,0];y.forEach(G=>{let B=[G.x,G.y,G.z,1],$=-(G.x*G.x+G.y*G.y+G.z*G.z);for(let ge=0;ge<4;ge++){E[ge]+=B[ge]*$;for(let Ie=0;Ie<4;Ie++)S[ge][Ie]+=B[ge]*B[Ie]}});for(let G=0;G<4;G++){let B=G;for(let $=G+1;$<4;$++)Math.abs(S[$][G])>Math.abs(S[B][G])&&(B=$);[S[G],S[B]]=[S[B],S[G]],[E[G],E[B]]=[E[B],E[G]];for(let $=0;$<4;$++)if($!==G){let ge=S[$][G]/S[G][G];for(let Ie=G;Ie<4;Ie++)S[$][Ie]-=ge*S[G][Ie];E[$]-=ge*E[G]}}let N=E[0]/S[0][0],Y=E[1]/S[1][1],K=E[2]/S[2][2],W=E[3]/S[3][3],ve=new T(-N/2,-Y/2,-K/2);return{c:ve,r:Math.sqrt(Math.max(0,ve.lengthSq()-W))}}function gn(y,S){let E=Math.max(...y.map(W=>W.y)),N=y.filter(W=>W.y>E-.06),Y=Math.max(...N.map(S)),K=Bt(N.filter(W=>S(W)>Y-.03));for(let W=0;W<2;W++){let ve=y.filter(G=>Math.abs(G.distanceTo(K.c)-K.r)<.004);ve.length>20&&(K=Bt(ve))}return K}function re(y){let S=[];if(I.forEach(k=>qt(k.mesh,z=>S.push(z.clone()))),!S.length)return null;let E=V?-1:1,N=k=>E*k.x,Y=S.map(k=>k.y),K=Math.max(...Y),W=Math.min(...Y),ve=K-W,G=String(y).toLowerCase(),B={},$=(k,z,he,Z,fe)=>{B[k]={pred:z,f:he,tol:Z,reach:fe||.05}},ge=(k,z,he)=>k.y>=z&&k.y<=he;if(/femur|femoral/.test(I[0].name.toLowerCase())){let k=S.filter(Se=>Se.y>K-.06),z=Math.max(...k.map(N)),he=k.filter(Se=>N(Se)>z-.025),Z=he.reduce((Se,te)=>Se.add(te),new T).multiplyScalar(1/he.length),fe=Math.max(...he.map(Se=>Se.distanceTo(Z))),He=S.filter(Se=>Se.y>K-.09).reduce((Se,te)=>!Se||-N(te)>-N(Se)?te:Se,null),at=S.filter(Se=>Se.y<W+.11),nt=(Math.max(...at.map(N))+Math.min(...at.map(N)))/2,an=Z.clone().lerp(He,.45),Yt=gn(S,N);$("head",Se=>Se.y>K-.08,Se=>-Math.abs(Se.distanceTo(Yt.c)-Yt.r),.003,.06),$("neck",Se=>Se.y>K-.09,Se=>-Se.distanceTo(an),.012,.02),$("greater trochanter",Se=>Se.y>K-.09,Se=>-N(Se)+Se.y*.3,.012,.04),$("lesser trochanter",Se=>ge(Se,K-.12,K-.06),Se=>N(Se)-Se.z,.008,.025);let Rt={};S.forEach(Se=>{let te=Math.round(Se.y/.008);(Rt[te]==null||Se.z<Rt[te])&&(Rt[te]=Se.z)}),$("linea aspera",Se=>ge(Se,W+.3*ve,W+.75*ve),Se=>-(Se.z-Rt[Math.round(Se.y/.008)]),.003,.25),$("medial condyle",Se=>ge(Se,W,W+.045),Se=>N(Se)-.6*(Se.y-W),.016,.04),$("lateral condyle",Se=>ge(Se,W,W+.045),Se=>-N(Se)-.6*(Se.y-W),.016,.04),$("medial epicondyle",Se=>ge(Se,W+.035,W+.075),Se=>N(Se),.006,.025),$("lateral epicondyle",Se=>ge(Se,W+.035,W+.075),Se=>-N(Se),.006,.025),$("adductor tubercle",Se=>ge(Se,W+.07,W+.1),Se=>N(Se),.004,.018),$("intercondylar fossa",Se=>ge(Se,W+.005,W+.04)&&Math.abs(N(Se)-nt)<.012,Se=>-Se.z,.012,.03),$("patellar surface",Se=>ge(Se,W+.025,W+.07)&&Math.abs(N(Se)-nt)<.022,Se=>Se.z,.008,.04)}else{let k=[];F.filter(te=>te.name==="Femur").forEach(te=>qt(te.mesh,de=>k.push(de.clone())));let z=k.length?Math.max(...k.map(te=>te.y)):W+.4*ve,he=k.filter(te=>te.y>z-.05),Z=he.length?Math.max(...he.map(N)):0,fe=he.filter(te=>N(te)>Z-.025),He=fe.reduce((te,de)=>te.add(de),new T).multiplyScalar(1/Math.max(1,fe.length)),at=He.y,nt=He.z,an=Math.max(...S.map(N)),Yt=S.filter(te=>te.y>at+.04).reduce((te,de)=>!te||de.z+.2*de.y>te.z+.2*te.y?de:te,null).y,Rt=Math.min(...S.filter(te=>te.z<nt).map(te=>te.y));$("iliac crest",()=>!0,te=>te.y,.012,.12),$("anterior superior iliac spine",te=>te.y>at+.04,te=>te.z+.2*te.y,.006,.02),$("asis",te=>te.y>at+.04,te=>te.z+.2*te.y,.006,.02),$("anterior inferior iliac spine",te=>te.y>at+.01&&te.y<at+.035&&te.z>nt,te=>te.z,.005,.018),$("posterior superior iliac spine",te=>te.y>at+.03&&N(te)>an-.06,te=>-te.z,.006,.02),$("ischial tuberosity",te=>te.z<nt,te=>-te.y,.012,.035),$("ischial spine",te=>te.y>Rt+.025&&te.y<at&&te.z<nt-.015,te=>N(te),.004,.015),$("pubic symphysis",()=>!0,te=>N(te),.005,.03),$("pubic tubercle",te=>N(te)>an-.035&&N(te)<an-.012,te=>te.z+.5*te.y,.005,.015);let Se=k.length?gn(k,N):{c:He,r:.024};$("acetabulum",te=>te.distanceTo(Se.c)<Se.r+.02,te=>-Math.abs(te.distanceTo(Se.c)-(Se.r+.002)),.005,.06)}let Ie=Object.keys(B).find(k=>G.indexOf(k)>=0);if(!Ie)return null;let ze=B[Ie],Xe=S.filter(ze.pred);if(!Xe.length)return null;let ct=Xe[0],q=ze.f(Xe[0]);return Xe.forEach(k=>{let z=ze.f(k);z>q&&(q=z,ct=k)}),{pt:ct,inPatch:k=>ze.pred(k)&&ze.f(k)>=q-ze.tol&&k.distanceTo(ct)<ze.reach,soft:k=>Math.min(1,(ze.f(k)-(q-ze.tol))/(ze.tol*.5))}}P("landmark");let xi=cr(e.region||"")==="canal"&&/mater|dura/i.test(e.name||"");xi?(_e.makeEmpty(),I.forEach(y=>qt(y.mesh,S=>{S.y>1.17&&S.y<1.23&&_e.expandByPoint(S)})),_e.isEmpty()&&I.forEach(y=>_e.union(y.box)),_e.expandByScalar(.006)):cr(e.region||"")==="plexus"?(_e.makeEmpty(),ee&&ee.pts?ee.pts.forEach(y=>_e.expandByPoint(y)):I.forEach(y=>_e.union(y.box)),_e.min.y=Math.max(_e.min.y,1.25),_e.max.y=Math.min(_e.max.y,1.52),_e.min.y>=_e.max.y&&(_e.min.y=1.3,_e.max.y=1.42),_e.expandByScalar(.025)):Ge&&(_e.makeEmpty(),ee.pts?(ee.pts.forEach(y=>_e.expandByPoint(y)),_e.expandByScalar(.025)):_e.expandByPoint(Ge).expandByScalar(.03)),Pe||(Pe=_e.isEmpty()?Qg.limb:[_e.min.y-.12,_e.max.y+.12]);let Ot=I.length&&I.every(y=>y.layer==="ligament"||y.layer==="capsule"),Kt=I.length&&I.every(y=>y.layer==="bone"),St=!Kt&&I.length&&I.every(y=>y.layer==="bone"||y.layer==="ligament"||y.layer==="capsule"),On=new Set(gc(e.show||(Kt?"bone":Ot||St?"bone,ligament":ie==="nerve"?"bone,muscle,nerve,ligament":"bone,muscle,ligament")).map(cr).map(y=>y.replace(/s$/,"").replace("artery","vessel").replace("arterie","vessel"))),zt=y=>y.box.max.y>Pe[0]&&y.box.min.y<Pe[1],D=cr(e.region||"")==="vertebra";F.forEach(y=>{y.mesh.visible=D?I.includes(y):zt(y)&&(On.has(y.layer)||I.includes(y)||ie==="nerve"&&X.includes(y))});let A=new on;F.forEach(y=>{y.mesh.visible&&A.union(y.box)}),A.min.y=Math.max(A.min.y,Pe[0]),A.max.y=Math.min(A.max.y,Pe[1]);let Q=(y,S,E)=>{y.mesh.material.color.setHex(S),y.mesh.material.emissive.setHex(E||0)},Be=!1,Re=(y,S)=>{let E=y.mesh.material;E.transparent!==S<1&&(E.needsUpdate=!0),E.transparent=S<1,E.opacity=S,E.depthWrite=!0,y.mesh.renderOrder=S<1?1+F.indexOf(y)/1e4:0},Ue=y=>y.layer==="vessel"||y.layer==="vein"?Q(y,y.layer==="vein"?5213439:16726843,y.layer==="vein"?731776:6949386):Q(y,new Pt(y.mesh.userData.base).lerp(new Pt($g),.6).getHex(),666684),$e=[],Ze=[],rt=[],Nt=null,en=[];if(Ge){let y=N=>{let Y=new Pt(N);I.forEach(K=>{let W=K.mesh.geometry,ve=W.attributes.position,G=ve.count,B=new Float32Array(G*3),$=new Float32Array(G),ge=new Pt(K.mesh.userData.base),Ie=new T;for(let ze=0;ze<G;ze++){Ie.fromBufferAttribute(ve,ze).applyMatrix4(K.mesh.matrixWorld);let Xe=ee.W?ee.W.get(K)?ee.W.get(K)[ze]:0:ee.inPatch(Ie)?Math.max(0,Math.min(1,ee.soft(Ie))):0,ct=ge.clone().lerp(Y,Xe*.85);B[ze*3]=ct.r,B[ze*3+1]=ct.g,B[ze*3+2]=ct.b,$[ze]=Xe}W.setAttribute("color",new wn(B,3)),W.setAttribute("jkw",new wn($,1)),K.mesh.material.vertexColors=!0,K.mesh.material.color.setHex(16777215),K.mesh.material.needsUpdate=!0});try{kn=!0}catch{}},S=st[String(e.landmark).toLowerCase().trim()];if(S&&S.outline&&ee.pts&&ee.pts.length>12&&!(ie==="find"&&!ne)){let N=ee.pts,Y=N.reduce((Ie,ze)=>Ie.add(ze),new T).multiplyScalar(1/N.length),K=[[0,0,0],[0,0,0],[0,0,0]];N.forEach(Ie=>{let ze=[Ie.x-Y.x,Ie.y-Y.y,Ie.z-Y.z];for(let Xe=0;Xe<3;Xe++)for(let ct=0;ct<3;ct++)K[Xe][ct]+=ze[Xe]*ze[ct]});let W=(Ie,ze)=>{let Xe=new T(.3,.8,.5);for(let ct=0;ct<30;ct++){let q=new T(Ie[0][0]*Xe.x+Ie[0][1]*Xe.y+Ie[0][2]*Xe.z,Ie[1][0]*Xe.x+Ie[1][1]*Xe.y+Ie[1][2]*Xe.z,Ie[2][0]*Xe.x+Ie[2][1]*Xe.y+Ie[2][2]*Xe.z);ze&&q.addScaledVector(ze,-q.dot(ze)),Xe=q.normalize()}return Xe},ve=W(K),G=W(K,ve),B=64,$=Array.from({length:B},()=>[]);N.forEach(Ie=>{let ze=Ie.clone().sub(Y),Xe=Math.atan2(ze.dot(G),ze.dot(ve));$[Math.floor((Xe+Math.PI)/(2*Math.PI)*B)%B].push(Ie)});let ge=$.map(Ie=>Ie.length?S.outline==="loop"?Ie.reduce((ze,Xe)=>!ze||Xe.distanceToSquared(Y)<ze.distanceToSquared(Y)?Xe:ze,null):Ie.reduce((ze,Xe)=>ze.add(Xe),new T).multiplyScalar(1/Ie.length):null);if(S.outline==="arc"){let Ie={};N.forEach(ct=>{let q=Math.round(ct.y/.003);(Ie[q]||(Ie[q]=[])).push(ct)});let ze=Object.keys(Ie).map(Number).sort((ct,q)=>ct-q);ge=[];let Xe=null;ze.forEach(ct=>{let q=Ie[ct];if(Xe){let k=q.filter(z=>z.distanceTo(Xe)<.009);if(!k.length)return;q=k}else{let k=q.reduce((z,he)=>z.add(he),new T).multiplyScalar(1/q.length);q=q.filter(z=>z.distanceTo(k)<.008),q.length||(q=Ie[ct])}Xe=q.reduce((k,z)=>k.add(z),new T).multiplyScalar(1/q.length),ge.push(Xe.clone())})}if(ge=ge.filter(Boolean),ge.length>5){let Ie=ge.map((ct,q)=>{let k=ge[(q-1+ge.length)%ge.length],z=ge[(q+1)%ge.length];return S.outline==="arc"&&(q===0||q===ge.length-1)?ct.clone():ct.clone().multiplyScalar(.5).addScaledVector(k,.25).addScaledVector(z,.25)}),ze=new Ja(Ie,S.outline==="loop"),Xe=new Mn(new Rl(ze,160,.0013,8,S.outline==="loop"),new Xi({color:4642047}));Xe.renderOrder=12,w.add(Xe)}}let E=/intervertebral foramen/.test(String(e.landmark).toLowerCase());Nt={material:{color:{setHex:N=>{E||y(N)}}},set visible(N){N&&!E&&y(3524863)}},Nt.visible=!(ie==="find"&&!ne),/intervertebral foramen/.test(String(e.landmark).toLowerCase())&&ee.pts&&Object.values(ee.ivf||{}).forEach(N=>{let Y=N.top>-1e8?N.top:N.pt,K=N.bot<1e8?N.bot:N.pb;if(!(N.n>4&&Y>K))return;N.top=Y,N.bot=K;let W=N.xs/N.n,ve=N.zs/N.n,G=[];I.forEach(fe=>qt(fe.mesh,He=>{Math.abs(He.x-W)<.007&&G.push([He.z,He.y])}));let B=ve,$=(N.top+N.bot)/2,ge=0;for(let fe=ve-.018;fe<=ve+.003;fe+=.001)for(let He=N.bot-.006;He<=N.top+.022;He+=.001){let at=1e9;for(let nt of G){let an=nt[0]-fe,Yt=nt[1]-He,Rt=an*an+Yt*Yt;if(Rt<at&&(at=Rt),at<ge*ge)break}at=Math.sqrt(at),at>ge&&(ge=at,B=fe,$=He)}if(ge<.002)return;let Ie=B,ze=$,Xe=Math.min(ge*1.35,.013),ct=Math.min(ge*.95,.009),q=[W,ze,Ie],k=[],z=40;for(let fe=0;fe<z;fe++){let He=fe/z*2*Math.PI;q.push(W,ze+Math.sin(He)*Xe,Ie+Math.cos(He)*ct),k.push(0,1+fe,1+(fe+1)%z)}let he=new wi;he.setAttribute("position",new fi(q,3)),he.setIndex(k);let Z=new Mn(he,new Xi({color:3524863,transparent:!0,opacity:.65,side:Ti,depthWrite:!1}));Z.renderOrder=15,w.add(Z),Z.visible=!(ie==="find"&&!ne),en.push(Z);for(let fe=0;fe<=8;fe++){let He=fe/8*2*Math.PI;vt.push(new T(W,ze+(fe<8?Math.sin(He)*Xe*.7:0),Ie+(fe<8?Math.cos(He)*ct*.7:0)))}}),ne&&$e.push({text:e.name,pts:[Ge],cls:"hl"})}if(Ge)I.some(y=>y.layer!=="bone")&&(rt=I);else if(ie==="name")I.forEach(Ue),rt=I,ne&&$e.push({text:e.name,parts:I,cls:"hl"});else if(ie==="find")ye&&F.forEach(y=>{y.layer==="muscle"&&Re(y,.15),y.layer===I[0].layer&&zt(y)&&(y.mesh.visible=!0)}),ne&&(I.forEach(y=>Q(y,_u,667672)),rt=I,$e.push({text:e.name,parts:I,cls:"ok"}));else if(ie==="attach")I.forEach(Ue),rt=I,ne&&I.some(y=>y.layer==="ligament")?$e.push({text:e.name,parts:I,cls:"hl"}):ne&&(F.forEach(y=>{y.layer==="muscle"&&!I.includes(y)&&(y.mesh.visible=!1)}),I.forEach(y=>Re(y,.6)),vn());else if(ie==="nerve")I.forEach(Ue),rt=I,ne?(F.forEach(y=>{y.layer==="muscle"&&!I.includes(y)&&Re(y,.12)}),I.forEach(y=>Re(y,.55)),X.forEach(y=>{y.mesh.visible=!0,Q(y,16769354,6967808)}),X.length&&$e.push({text:e.nervename||X[0].name,parts:X.filter(y=>y.name===X[0].name),cls:"nerve"}),$e.push({text:e.name,parts:I,cls:"hl"})):X.forEach(y=>{y.mesh.visible=!1}),F.forEach(y=>{y.layer==="nerve"&&!X.includes(y)&&!ne&&(y.mesh.visible=!1)});else if(ie==="nerveid"){F.forEach(S=>{S.layer==="muscle"&&Re(S,.18)});let y=I[0]&&(I[0].layer==="vessel"||I[0].layer==="vein")?I[0].layer:null;if(y){F.forEach(G=>{G.layer===y&&zt(G)&&!I.includes(G)&&(G.mesh.visible=!0,Re(G,.28))});let S=[];I.forEach(G=>qt(G.mesh,B=>S.push(B.clone())));let E=.004,N=new Map,Y=(G,B,$)=>G+","+B+","+$;S.forEach(G=>{let B=Y(Math.floor(G.x/E),Math.floor(G.y/E),Math.floor(G.z/E));(N.get(B)||N.set(B,[]).get(B)).push(G)});let K=new on;I.forEach(G=>K.union(G.box)),K.expandByScalar(.004);let W=G=>{if(!G.box.intersectsBox(K))return!1;let B=G.mesh.geometry.attributes.position,$=new T,ge=Math.max(1,Math.floor(B.count/1500));for(let Ie=0;Ie<B.count;Ie+=ge){$.fromBufferAttribute(B,Ie).applyMatrix4(G.mesh.matrixWorld);let ze=Math.floor($.x/E),Xe=Math.floor($.y/E),ct=Math.floor($.z/E);for(let q=-1;q<=1;q++)for(let k=-1;k<=1;k++)for(let z=-1;z<=1;z++){let he=N.get(Y(ze+q,Xe+k,ct+z));if(he){for(let Z of he)if(Z.distanceToSquared($)<.0025*.0025)return!0}}}return!1},ve=[];F.forEach(G=>{G.layer!==y||I.includes(G)||I.some(B=>B.name===G.name)||W(G)&&(G.mesh.visible=!0,Re(G,1),Q(G,10132899,1052688),G._link=!0,ve.push(G))}),ne&&ve.sort((G,B)=>B.box.getSize(new T).length()-G.box.getSize(new T).length()).slice(0,4).forEach(G=>Ze.push({text:G.name,parts:[G],cls:"minor"}))}I.forEach(S=>{S.mesh.visible=!0,y?Ue(S):Q(S,$g,670288)}),ne&&$e.push({text:e.name,parts:I,cls:"hl"})}else ie==="action"&&(I.forEach(Ue),rt=I);if(cr(e.region||"")==="canal"){let y=I.some(E=>/arachnoid/i.test(E.name)),S=/pia mater/i.test(e.name||"");F.forEach(E=>{if(!I.includes(E))if(E.layer==="muscle"||E.layer==="ligament"||E.layer==="capsule"&&!/dura/i.test(E.name))E.mesh.visible=!1;else if(E.layer==="bone")Re(E,/vertebra|atlas|axis|sacrum|coccyx/i.test(E.name)?.22:.1);else if(E.name==="Spinal dura (opened)"&&(y||S))E.mesh.visible=!0,Q(E,12096874);else if(E.name==="Arachnoid mater (opened)"&&S)E.mesh.visible=!0,Q(E,13227750);else if(/dura|arachnoid/i.test(E.name)){E.mesh.visible=!1;let N=E.mesh.material;N.colorWrite=!1,N.depthWrite=!1,N.needsUpdate=!0}else E.layer==="nerve"&&/spinal cord|cauda|root of spinal|spinal ganglion|dorsal rami/i.test(E.name)&&(E.mesh.visible=!0)}),xi||I.forEach(E=>{E.mesh.visible=!0,E.mesh.renderOrder=20;let N=E.mesh.material;N.depthTest=!1,N.transparent=!0,N.opacity=1,N.needsUpdate=!0})}if(cr(e.region||"")==="plexus"){let y=/brachial plexus|musculocutaneous|axillary nerve|^radial nerve|^median nerve|^ulnar nerve|dorsal scapular|long thoracic|suprascapular nerve|pectoral nerve|subscapular nerve|thoracodorsal|medial brachial cutaneous|medial antebrachial cutaneous/i;F.forEach(S=>{S.layer==="nerve"&&y.test(S.name)?(S.mesh.visible=!0,I.includes(S)||(S.mesh.renderOrder=2)):S.layer==="muscle"&&!I.includes(S)&&Re(S,.1)})}if(I.length&&!Ge&&!(ie==="find"&&!ne)){let y=new qi({vertexShader:"varying vec3 vn; varying vec3 vv; void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.); vn = normalize(normalMatrix * normal); vv = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }",fragmentShader:"varying vec3 vn; varying vec3 vv; void main(){ float r = 1. - abs(dot(normalize(vn), normalize(vv))); float a = 0.1 + 0.55 * pow(r, 2.2); gl_FragColor = vec4(0.42, 0.82, 1.0, a); }",transparent:!0,depthTest:!0,depthWrite:!1,depthFunc:hf,side:Wi});I.forEach(S=>{let E=new Mn(S.mesh.geometry,y);E.renderOrder=20,E.raycast=()=>{},S.mesh.add(E)})}if(ne&&I.length&&!ye&&["name","find","attach","nerve","action"].includes(ie)&&(ie!=="attach"&&!Ge&&!I.some(y=>y.layer==="ligament"||y.layer==="capsule"||y.layer==="bone")&&vn(!0),ie!=="nerve"&&ie!=="attach"&&X.length)){X.forEach(S=>{S.mesh.visible=!0,Q(S,14270576,2761216)});let y=X[0].name;Ze.push({text:"Nerve \xB7 "+y,parts:X.filter(S=>S.name===y),cls:"minor"})}function De(y){if(y=String(y||"").toLowerCase(),!y)return new Set;let S=new Set,E=B=>F.some($=>$.name===B&&$.layer==="bone"),N=[["Scapula",/scapul|coracoid|acromion|glenoid|supraspinous|infraspinous|subscapular fossa|inferior angle|lateral border/],["Clavicle",/clavic/],["Humerus",/humer|intertubercular|deltoid tuberosity|epicondyle|supracondylar|tubercle of the humerus/],["Radius",/radius|radial tuberosity|radial shaft|supinator crest(?!)/],["Ulna",/ulna\b|ulna |olecranon|coronoid|ulnar tuberosity|supinator crest/],["Pisiform bone",/pisiform/],["Hamate bone",/hamate/],["Trapezium bone",/trapezium/],["Trapezoid bone",/trapezoid/],["Capitate bone",/capitate/],["Scaphoid bone",/scaphoid/],["Lunate bone",/lunate/],["Triquetrum bone",/triquetrum/],["Femur",/femur|trochanter|linea aspera|femoral/],["Tibia",/tibia/],["Fibula",/fibula/],["Hip bone",/ilium|ischi|pubi|iliac|hip bone/],["Sacrum",/sacrum|sacral/],["Calcaneus",/calcane/],["Patella",/patell/]],Y=B=>B.name.replace(/\.[lr]$/,"");N.forEach(([B,$])=>{$.test(y)&&F.forEach(ge=>{ge.layer==="bone"&&Y(ge)===B&&S.add(ge.name)})}),[[/spinous|vertebra|transverse process|nuchal|lamina/,B=>/^(vertebra |atlas|axis)/i.test(B.name)],[/\bribs?\b|costal/,B=>/\brib\b/i.test(B.name)],[/occipit|mastoid|skull/,B=>/occipital|temporal/i.test(B.name)],[/sacrum|sacral/,B=>/^sacrum/i.test(B.name)],[/cervical/,B=>/^(vertebra c|atlas|axis)/i.test(B.name)],[/thoracic/,B=>/^vertebra t/i.test(B.name)]].forEach(([B,$])=>{B.test(y)&&F.forEach(ge=>{ge.layer==="bone"&&$(ge)&&S.add(ge.name)})}),/cervical/.test(y)&&/thoracic/.test(y)||(/cervical/.test(y)?[...S].forEach(B=>{/^vertebra [tl]/i.test(B)&&S.delete(B)}):/thoracic/.test(y)&&[...S].forEach(B=>{/^(vertebra [cl]|atlas|axis)/i.test(B)&&S.delete(B)}));let W={first:/1st|first|thumb/,second:/2nd|second|index/,third:/3rd|third/,fourth:/4th|fourth/,fifth:/5th|fifth|little/},ve=y.match(/(\d)(?:st|nd|rd|th)?\s*[–-]\s*(\d)/),G=new Set;if(Object.keys(W).forEach(B=>{W[B].test(y)&&G.add(B)}),ve&&["first","second","third","fourth","fifth"].slice(+ve[1]-1,+ve[2]).forEach(B=>G.add(B)),/metacarpal/.test(y)&&F.forEach(B=>{let $=B.name.match(/^(\w+) metacarpal bone$/i);$&&(!G.size||G.has($[1].toLowerCase()))&&S.add(B.name)}),/phalan/.test(y)){let B=["proximal","middle","distal"].filter($=>y.indexOf($)>=0);F.forEach($=>{let ge=$.name.match(/^(proximal|middle|distal) phalanx of (\w+) finger of hand$/i);ge&&(!B.length||B.includes(ge[1].toLowerCase()))&&(!G.size||G.has(ge[2].toLowerCase()))&&S.add($.name)})}return S}function vn(y,S){let E={o:De(e.origin),i:De(e.insertion)},N=[];if(I.forEach(Z=>qt(Z.mesh,fe=>N.push(fe.clone()))),!N.length)return;let Y=.006,K=new Map,W=(Z,fe,He)=>Z+","+fe+","+He;N.forEach(Z=>{let fe=W(Math.floor(Z.x/Y),Math.floor(Z.y/Y),Math.floor(Z.z/Y));(K.get(fe)||K.set(fe,[]).get(fe)).push(Z)});let ve=new on;I.forEach(Z=>ve.union(Z.box));let G=ve.max.y-ve.min.y,B=ve.max.y-.35*G,$=.0065,ge=N[0];N.forEach(Z=>{Z.y>ge.y&&(ge=Z)});let Ie=N[0],ze=-1;N.forEach(Z=>{let fe=Z.distanceToSquared(ge);fe>ze&&(ze=fe,Ie=Z)});let Xe=ve.min.y+.22*G,ct=!1;{let Z=Y;F.forEach(fe=>{ct||fe.layer!=="bone"||!fe.mesh.visible||fe.box.distanceToPoint(Ie)>.02||qt(fe.mesh,He=>{!ct&&He.distanceTo(Ie)<.015&&(ct=!0)})})}let q=S?Z=>Z.y<=Xe:Z=>Z.distanceTo(Ie)<(ct?.03:.05)&&Z.y<=Xe+.02,k={o:[],i:[]},z={},he=!S&&E.o.size&&E.i.size&&[...E.o].some(Z=>!E.i.has(Z))&&[...E.i].some(Z=>!E.o.has(Z));if(F.forEach(Z=>{if(Z.layer!=="bone"||!Z.mesh.visible||!Z.box.clone().expandByScalar(.01).intersectsBox(ve))return;let fe=Z.mesh.geometry,He=fe.attributes.position,at=He.count,nt=new Float32Array(at*3),an=new Pt(Z.mesh.userData.base),Yt=new Pt(qS),Rt=new Pt(YS),Se=new T,te=!1,de=[],xe=[],Ee=[];for(let Te=0;Te<at;Te++){Se.fromBufferAttribute(He,Te).applyMatrix4(Z.mesh.matrixWorld);let we=!1,_t=Math.floor(Se.x/Y),je=Math.floor(Se.y/Y),dt=Math.floor(Se.z/Y);for(let lt=-1;lt<=1&&!we;lt++)for(let nn=-1;nn<=1&&!we;nn++)for(let Rn=-1;Rn<=1&&!we;Rn++){let Wn=K.get(W(_t+lt,je+nn,dt+Rn));if(Wn){for(let zi of Wn)if(zi.distanceToSquared(Se)<$*$){we=!0;break}}}let it=we?q(Se)?2:Se.y>=B?1:0:0;if(we&&he){let lt=E.o.has(Z.name),nn=E.i.has(Z.name);it=lt&&!nn?1:nn&&!lt?2:lt&&nn?it:0}let cn=it===1?Yt:it===2?Rt:an;nt[Te*3]=cn.r,nt[Te*3+1]=cn.g,nt[Te*3+2]=cn.b,it&&(te=!0,(it===1?k.o:k.i).push(Se.clone()),de.push(Se.clone()),(it===1?xe:Ee).push(Se.clone()))}let se=Z.name==="Hip bone"?"Hip bone":Z.name.replace(/ bone$/,""),J=(Te,we)=>{if(we.length<6)return;let _t=Te+se;z[_t]?z[_t].pts.push(...we):z[_t]={k:Te,text:(y?Te+" \xB7 ":"")+se,pts:we.slice()}};J("Origin",xe),J("Insertion",Ee),!y&&te&&(fe.setAttribute("color",new wn(nt,3)),Z.mesh.material.vertexColors=!0,Z.mesh.material.color.setHex(16777215),Z.mesh.material.needsUpdate=!0)}),!S&&(!Object.values(z).some(Z=>Z.k==="Insertion")||he&&!Object.values(z).some(Z=>Z.k==="Origin")))return F.forEach(Z=>{Z.layer==="bone"&&Z.mesh.material.vertexColors&&(Z.mesh.geometry.deleteAttribute("color"),Z.mesh.material.vertexColors=!1,Z.mesh.material.color.setHex(Z.mesh.userData.base),Z.mesh.material.needsUpdate=!0)}),vn(y,!0);["Origin","Insertion"].forEach(Z=>{let fe=Object.values(z).filter(nt=>nt.k===Z),He=nt=>Z==="Origin"?Math.max(...nt.pts.map(an=>an.y)):-Math.min(...nt.pts.map(an=>an.y)),at=he?-1e9:Math.max(-1e9,...fe.map(He));fe.filter(nt=>He(nt)>=at-.025).sort((nt,an)=>an.pts.length-nt.pts.length).slice(0,2).forEach(nt=>Ze.push({text:nt.text,pts:nt.pts,cls:"minor"}))}),!y&&($e.push({text:e.name,parts:I,cls:"hl"}),k.o.length&&$e.push({text:"Origin",pts:k.o,cls:"orig"}),k.i.length&&$e.push({text:"Insertion",pts:k.i,cls:"ins"}))}function qt(y,S){let E=y.geometry.attributes.position,N=new T;for(let Y=0;Y<E.count;Y++)S(N.fromBufferAttribute(E,Y).applyMatrix4(y.matrixWorld))}let Dt=0,yt=ie==="peel"&&ce.length?document.createElement("div"):null;function mt(y){if(Dt=Math.max(0,Math.min(ce.length,y)),ce.forEach((S,E)=>S.forEach(N=>{N.mesh.visible=E>=Dt&&zt(N),Q(N,N.mesh.userData.base)})),$e.length=0,ne&&Dt<ce.length){let S={};ce[Dt].forEach(E=>{Ue(E);let N=E.name.replace(/ muscle$/,"");S[N]?S[N].parts.push(E):Object.keys(S).length<6&&$e.push(S[N]={text:N,parts:[E],cls:"hl"})})}yt&&(yt.querySelector("input").value=Dt,yt.querySelector("span").textContent=Dt?"Removed: "+Dt+" layer"+(Dt>1?"s":""):"All layers"),Hr(),kn=!0}yt&&(yt.className="jka-peel",yt.innerHTML='<input type="range" min="0" max="'+ce.length+'" step="1"><span></span>',yt.querySelector("input").oninput=y=>mt(+y.target.value),o.appendChild(yt));let Me=new hi(30,1,.01,20),Oe=new wd(Me,c.domElement);Oe.enableDamping=!0,Oe.dampingFactor=.12,Oe.screenSpacePanning=!0,Oe.enableZoom=!1,Oe.enablePan=!1,Oe.mouseButtons={LEFT:Xm.ROTATE,MIDDLE:null,RIGHT:null};let fn=new tt,Jt=0;function ke(){Ji&&(Me.setViewOffset(Ji,rs,-fn.x,-fn.y+Jt,Ji,rs),Me.updateProjectionMatrix())}let O=c.domElement;O.addEventListener("contextmenu",y=>{y.preventDefault(),y.stopImmediatePropagation()},!0),s.addEventListener("contextmenu",y=>{y.target===O&&(y.preventDefault(),y.stopPropagation())},!0);let We=null;O.addEventListener("pointerdown",y=>{(y.button===2||y.button===1||y.button===0&&y.shiftKey)&&(y.preventDefault(),y.stopImmediatePropagation(),We={x:y.clientX,y:y.clientY,x0:y.clientX,y0:y.clientY,b:y.button},O.setPointerCapture(y.pointerId),Wr(),qe=null)},!0),O.addEventListener("pointermove",y=>{if(!We)return;let S=O.getBoundingClientRect(),E=Ji/S.width;fn.x+=(y.clientX-We.x)*E,fn.y+=(y.clientY-We.y)*E,We.x=y.clientX,We.y=y.clientY,ke(),xo(),ne||Gt()}),O.addEventListener("pointerup",y=>{We&&We.b===2&&Math.hypot(y.clientX-We.x0,y.clientY-We.y0)<5&&Eu(y.clientX,y.clientY),We=null}),O.addEventListener("pointercancel",()=>{We=null});function Ke(y,S,E){let N=Me.position.clone().sub(Oe.target),Y=N.length(),K=Math.max(ci?.15:.04,Math.min(ci?14:3,Y*E)),W=K/Y,ve=O.getBoundingClientRect(),G=(y-ve.left)/ve.width*2-1,B=-(S-ve.top)/ve.height*2+1;Wt.setFromCamera(new tt(G,B),Me),Wt.far=1/0;let $=Wt.intersectObjects(F.filter(Xe=>Xe.mesh.visible&&Xe.mesh.material.opacity>.3).map(Xe=>Xe.mesh),!1)[0],ge=$?$.point.clone():Oe.target.clone(),Ie=ge.clone().project(Me);Me.position.copy(Oe.target).addScaledVector(N,W),Me.updateMatrixWorld(),ke();let ze=ge.clone().project(Me);fn.x+=(Ie.x-ze.x)/2*Ji,fn.y-=(Ie.y-ze.y)/2*rs,ke(),Oe.update(),xo(),ne||Gt()}O.addEventListener("wheel",y=>{y.preventDefault(),y.stopPropagation();let S=y.deltaY*(y.deltaMode===1?33:y.deltaMode===2?400:1);y.ctrlKey&&(S*=3),Ke(y.clientX,y.clientY,Math.exp(Math.max(-.6,Math.min(.6,S*.0035))))},{passive:!1});let Mt=new Map,Et=null,En=0,Sn=!1,Jn=0,yi=0;O.addEventListener("touchstart",y=>{y.touches.length===1&&(Sn=!1,Jn=y.touches[0].clientX,yi=y.touches[0].clientY),y.touches.length>1&&y.cancelable&&y.preventDefault()},{passive:!1}),O.addEventListener("touchmove",y=>{let S=y.touches[0];S&&(Math.abs(S.clientX-Jn)>6||Math.abs(S.clientY-yi)>6)&&(Sn=!0),y.cancelable&&y.preventDefault()},{passive:!1}),O.addEventListener("touchend",y=>{if(Sn||y.touches.length){y.stopPropagation(),y.cancelable&&y.preventDefault();return}if(ie==="find"&&!ne){let S=y.changedTouches[0],E=O.getBoundingClientRect();Wt.setFromCamera(new tt((S.clientX-E.left)/E.width*2-1,-(S.clientY-E.top)/E.height*2+1),Me),Wt.far=1/0,Wt.intersectObjects(F.filter(N=>N.mesh.visible&&N.mesh.material.opacity>.3).map(N=>N.mesh),!1).length&&(y.stopPropagation(),y.cancelable&&y.preventDefault())}},{passive:!1}),O.addEventListener("pointerdown",y=>{if(y.pointerType==="touch"){if(Mt.set(y.pointerId,[y.clientX,y.clientY]),clearTimeout(En),Mt.size===1){let S=y.clientX,E=y.clientY;En=setTimeout(()=>{let N=Mt.get(y.pointerId);N&&Mt.size===1&&Math.hypot(N[0]-S,N[1]-E)<8&&(Oe.drag=null,Oe.spin=null,Eu(S,E))},550)}if(Mt.size===2){Oe.drag=null,Oe.multi=!0,Wr();let[S,E]=[...Mt.values()];Et={d:Math.hypot(S[0]-E[0],S[1]-E[1]),m:[(S[0]+E[0])/2,(S[1]+E[1])/2],ang:Math.atan2(E[1]-S[1],E[0]-S[0])}}}},!0),O.addEventListener("pointermove",y=>{if(y.pointerType!=="touch"||!Mt.has(y.pointerId)||(Mt.set(y.pointerId,[y.clientX,y.clientY]),Mt.size!==2||!Et))return;y.stopImmediatePropagation();let[S,E]=[...Mt.values()],N=Math.hypot(S[0]-E[0],S[1]-E[1]),Y=[(S[0]+E[0])/2,(S[1]+E[1])/2],K=O.getBoundingClientRect(),W=Ji/K.width;fn.x+=(Y[0]-Et.m[0])*W,fn.y+=(Y[1]-Et.m[1])*W,ke(),N>10&&Et.d>10&&Ke(Y[0],Y[1],Et.d/N);let ve=Math.atan2(E[1]-S[1],E[0]-S[0]),G=ve-Et.ang;for(;G>Math.PI;)G-=2*Math.PI;for(;G<-Math.PI;)G+=2*Math.PI;Et={d:N,m:Y,ang:ve},xo()},!0);let An=y=>{y.pointerType==="touch"&&(Mt.delete(y.pointerId),clearTimeout(En),Mt.size<2&&(Et=null,Mt.size||(Oe.multi=!1)))};O.addEventListener("pointerup",An,!0),O.addEventListener("pointercancel",An,!0);let $n=(_e.isEmpty()?A:_e).getCenter(new T);(ie==="find"||ie==="peel")&&A.getCenter($n);let _i=ie==="find"||ie==="peel"||_e.isEmpty()?A:_e,uo=_i.getSize(new T),lr=nx(e.cam,V),ci=!1,vi=null,Vs=!1;function yc(){if(window.matchMedia&&(matchMedia("(hover: none)").matches||matchMedia("(max-width: 720px)").matches)){o.style.height="";return}let y=document.getElementById("jk-sc")||document.scrollingElement||document.documentElement,S=o.getBoundingClientRect(),E=S.height/Math.max(1,o.offsetHeight)||1,N=s.closest(".jka-split"),Y=N&&N.querySelector(".jka-right"),K=Y&&getComputedStyle(N).display==="block",W=0;if(K){Y.style.height="auto",Y.style.maxHeight="none",o.style.height="";return}let ve=(window.innerHeight||y.clientHeight)-Math.max(0,S.top)-W-8;if(ve<200)return;let G=Math.floor(ve/E)+"px";Math.abs((parseFloat(o.style.height)||0)-parseFloat(G))>4&&(o.style.height=G),Y&&!K&&(Y.style.height=G,Y.style.maxHeight=G)}function Rs(){yc();try{let S=o.querySelector(":scope > .jka-chips");if(S&&!(window.matchMedia&&(matchMedia("(hover: none)").matches||matchMedia("(max-width: 720px)").matches))){let E=o.getBoundingClientRect(),N=E.height/Math.max(1,o.offsetHeight)||1;S.style.setProperty("top",Math.round((innerHeight/2-E.top)/N)+"px","important")}}catch{}let y=ci?-10:Math.max(0,o.getBoundingClientRect().left);o.querySelectorAll(":scope > .jka-views, :scope > .jka-chips").forEach(S=>{S.style.marginLeft=-y+"px"})}window.addEventListener("resize",()=>Rs());let Ji=600,rs=400;function Gs(){let y=c.domElement.parentElement||o,S=y.clientWidth||600,E=(y.clientHeight||400)-(ci&&y===o?48:0);Ji=S,rs=E,c.setSize(S,E,!1),Me.aspect=S/E,Me.updateProjectionMatrix(),ke(),Rs(),_.setAttribute("viewBox","0 0 "+S+" "+E)}Gs();let L=Math.abs(lr.x)>Math.abs(lr.z)?uo.z:uo.x,j=.09,ae=.2,ue=1-j-ae-.03,oe=Math.max(.22,Math.max(uo.y,L/Me.aspect)/ue+.02),ot=Math.tan(oo.degToRad(15)),Tt=Math.min(2.5,Math.max(.15,oe/2/ot+L/2)),kt=2*(Tt-L/2)*ot;Jt=(ae-j)/2*rs*(1-Math.abs(lr.y)),ke(),Oe.target.copy($n),Me.position.copy($n).addScaledVector(lr,Tt),Me.up.copy(tx(lr)),Me.lookAt($n);let Ht=e.mode+"|"+e.name+"|"+e.meshes+"|"+(e.peel||[]).join("/"),Vt=window.__jkaCam,qe=null;if(ne&&Vt&&Vt.key===Ht){qe={p0:Vt.pos.clone(),t0:Oe.target.clone(),p1:Me.position.clone(),t1:Oe.target.clone(),s:0,q0:(Vt.pan||new tt).clone(),q1:new tt},Me.position.copy(Vt.pos).sub(Vt.target).add(Oe.target),qe.p0.copy(Me.position),Vt.pan&&(fn.copy(Vt.pan),ke()),["pointerdown","wheel"].forEach(y=>c.domElement.addEventListener(y,()=>{qe=null},!0));try{Me.updateMatrixWorld(),Me.updateProjectionMatrix();let y=new wr().setFromProjectionMatrix(new bt().multiplyMatrices(Me.projectionMatrix,Me.matrixWorldInverse)),S=new ec,E=F.filter(G=>G.mesh.visible).map(G=>G.mesh),N=new Set(I.map(G=>G.mesh)),Y=0,K=0,W=new T,ve=Ge&&vt.length?vt.filter((G,B)=>B%Math.max(1,Math.floor(vt.length/16))===0):[];ve.length||I.forEach(G=>{let B=G.mesh.geometry.attributes.position,$=Math.max(1,Math.floor(B.count/12));for(let ge=0;ge<B.count;ge+=$)ve.push(W.fromBufferAttribute(B,ge).applyMatrix4(G.mesh.matrixWorld).clone())}),ve.forEach(G=>{if(Y++,!y.containsPoint(G))return;let B=G.clone().sub(Me.position),$=B.length();S.set(Me.position,B.normalize()),S.far=$+.002;let ge=S.intersectObjects(E,!1)[0];(!ge||N.has(ge.object)||ge.distance>$-.004)&&K++}),Y&&K/Y>=.35&&(qe.p1=qe.p0.clone(),qe.keep=!0)}catch{}}let Gt=()=>{window.__jkaCam={key:Ht,pos:Me.position.clone(),target:Oe.target.clone(),pan:fn.clone()}};Oe.minDistance=.05,Oe.maxDistance=3,Oe.update();let Wt=new ec,bi=[];rt.forEach(y=>{let S=y.mesh.geometry.attributes.position,E=Math.max(1,Math.floor(S.count/24));for(let N=0;N<S.count;N+=E)bi.push(new T().fromBufferAttribute(S,N).applyMatrix4(y.mesh.matrixWorld))});let Gn=new Set,ys=!1;function Fn(){if(!ys||!bi.length||Be)return;let y=new Set,S=F.filter(E=>E.mesh.visible&&!rt.includes(E)&&!E._glass&&(E.layer==="muscle"||E.layer==="vessel")).map(E=>E.mesh);for(let E of bi){let N=E.clone().sub(Me.position),Y=N.length();Wt.set(Me.position,N.normalize()),Wt.far=Y-.002;for(let K of Wt.intersectObjects(S,!1))y.add(K.object)}F.forEach(E=>{y.has(E.mesh)!==Gn.has(E)&&(kn=!0),y.has(E.mesh)&&!Gn.has(E)?(Gn.add(E),E._a=E.mesh.material.opacity,Re(E,.18)):!y.has(E.mesh)&&Gn.has(E)&&(Gn.delete(E),Re(E,E._a==null?1:E._a))})}let jt=document.createElement("div");jt.className="jka-labels",o.appendChild(jt);let Cs=[],Tn={side:{},tg:{},pos:{}},Ni=6,xa=90,ur=2*Math.sqrt(90),ya=500;function Mi(y){y.pts||(y.pts=[],y.parts.forEach(E=>qt(E.mesh,N=>y.pts.push(N.clone()))));let S=Math.max(1,Math.floor(y.pts.length/48));return y.pts.filter((E,N)=>N%S===0)}function Ps(y){let S=y.reduce((Y,K)=>Y.add(K),new T).multiplyScalar(1/Math.max(1,y.length)),E=y[0],N=1e9;return y.forEach(Y=>{let K=Y.distanceToSquared(S);K<N&&(N=K,E=Y)}),E||S}function Hr(){jt.innerHTML="",_.innerHTML="",Cs=$e.map(y=>{let S=document.createElement("div");S.className="jka-label "+(y.cls||""),S.textContent=y.text,jt.appendChild(S);let E=Mi(y),N=Ps(E);return{L:y,k:y.text,el:S,S:E,aT:N,a:N.clone(),hid:!1,w:0,h:0}}),fr=!0;try{document.fonts&&document.fonts.ready.then(()=>{Cs.forEach(y=>{y.w=0}),_a=!0})}catch{}}let ni=160,os=100,ho=null,_s=null,ix=new Xi({color:16777215});function sx(){os=Math.max(40,Math.round(ni*rs/Math.max(1,Ji))),(!_s||_s.height!==os)&&(_s&&_s.dispose(),_s=new ds(ni,os),f.push(_s),ho=new Uint8Array(ni*os*4));let y=F.filter(E=>E.mesh.visible&&E.mesh.material.opacity<.5);y.forEach(E=>{E.mesh.visible=!1});let S=w.background;w.overrideMaterial=ix,c.setRenderTarget(_s),c.setClearColor(0,0),c.clear(),c.render(w,Me),c.readRenderTargetPixels(_s,0,0,ni,os,ho),c.setRenderTarget(null),w.overrideMaterial=null,w.background=S,y.forEach(E=>{E.mesh.visible=!0})}let Ad=(y,S)=>{if(!ho)return!1;let E=Math.floor(y/Ji*ni),N=os-1-Math.floor(S/rs*os);return E>=0&&N>=0&&E<ni&&N<os&&ho[(N*ni+E)*4+3]>0};function rx(){let y=F.filter(S=>S.mesh.visible&&S.mesh.material.opacity>=.5).map(S=>S.mesh);Cs.forEach(S=>{let E=new Set((S.L.parts||[]).map(W=>W.mesh)),N=[];S.S.forEach(W=>{let ve=W.clone().sub(Me.position),G=ve.length();Wt.set(Me.position,ve.normalize()),Wt.far=G-.002,Wt.intersectObjects(y,!1).find($=>!E.has($.object))||N.push(W)});let Y=!N.length,K=S.aT;if(!S.L.parts||Y)K=S.aT;else{let W=Ps(N),ve=S.S.length>1?S.S[0].distanceTo(S.S[S.S.length-1]):.05;(!N.includes(S.aT)||S.aT.distanceTo(W)>.3*Math.max(.02,ve))&&(K=W)}(Y!==S.hid||K!==S.aT)&&(S.hid=Y,S.aT=K,_a=!0)}),sx(),_a=!0,Cs.forEach(S=>{S.w=0})}function ox(y,S,E,N){let K=0;for(let W=1;W<=40;W++){let ve=W/40;if(Ad(y+(E-y)*ve,S+(N-S)*ve)){let G=K,B=ve;for(let $=0;$<6;$++){let ge=(G+B)/2;Ad(y+(E-y)*ge,S+(N-S)*ge)?B=ge:G=ge}return[y+(E-y)*B,S+(N-S)*B]}K=ve}return[E,N]}let Rd=[];for(let y=0;y<8;y++)Rd.push(new T(y&1?_i.max.x:_i.min.x,y&2?_i.max.y:_i.min.y,y&4?_i.max.z:_i.min.z));let vu=0,_a=!0,va=null,Cd=0;function ax(){let y=performance.now();if(va&&y-Cd<1e3)return va;let S=o.getBoundingClientRect(),E=Ji/Math.max(1,S.width),N=rs/Math.max(1,S.height);return va=[".jka-views",".jka-chips",".jka-zoom",".jka-peel",".jka-ct",".jka-refl"].map(Y=>o.querySelector(Y)).filter(Boolean).map(Y=>{let K=Y.getBoundingClientRect();if(Y.classList.contains("jka-views")){let ve=[...Y.children].map(G=>G.getBoundingClientRect()).filter(G=>G.width);ve.length&&(K={left:Math.min(...ve.map(G=>G.left)),top:Math.min(...ve.map(G=>G.top)),right:Math.max(...ve.map(G=>G.right)),bottom:Math.max(...ve.map(G=>G.bottom))})}let W={l:(K.left-S.left)*E,t:(K.top-S.top)*N,r:(K.right-S.left)*E,b:(K.bottom-S.top)*N};return W.top=(W.t+W.b)/2<rs/2,W}).filter(Y=>Y.r>Y.l),Cd=y,va}function Pd(y){let S=vu?Math.min(64,y-vu):16;vu=y;let E=Ji,N=rs,Y=!1,K=1e9,W=-1e9,ve=1e9,G=-1e9;Rd.forEach(q=>{let k=q.clone().project(Me),z=(k.x+1)/2*E,he=(1-k.y)/2*N;K=Math.min(K,z),W=Math.max(W,z),ve=Math.min(ve,he),G=Math.max(G,he)});let B={cx:Math.max(60,Math.min(E-60,(K+W)/2)),cy:N/2,rx:Math.min(E*.3,Math.max(40,(W-K)/2))},$=[[],[]],ge=1-Math.exp(-S/1e3*9);Cs.forEach(q=>{q.a.distanceToSquared(q.aT)>1e-10&&(q.a.lerp(q.aT,ge),Y=!0);let k=q.a.clone().project(Me);q.x=(k.x+1)/2*E,q.y=(1-k.y)/2*N,q.w||(q.w=q.el.offsetWidth,q.h=q.el.offsetHeight);let z=q.x-B.cx,he=Tn.side[q.k];q.s=he!=null&&Math.abs(z)<B.rx*.4?he:z<0?0:1,q.c=Math.abs(z),q.on=!0,$[q.s].push(q)});let Ie=q=>q.reduce((k,z)=>k+z.h+Ni,0)<=N-8,ze=(q,k)=>{for(;!Ie($[q]);){let z=$[q].slice().sort((he,Z)=>he.c-Z.c)[0];if(!z)break;$[q].splice($[q].indexOf(z),1),$[k].push(z),Ie($[k])?z.s=k:($[k].pop(),z.on=!1)}};ze(0,1),ze(1,0);let Xe=1-Math.exp(-S/1e3*2.5);$.forEach((q,k)=>{q.forEach(Z=>{Tn.side[Z.k]=k}),q.sort((Z,fe)=>Z.y-fe.y),q.forEach(Z=>{let fe=Z.y-Z.h/2,He=Tn.tg[Z.k];!He||He.s!==k?He=Tn.tg[Z.k]={y:fe,x:null,s:k}:He.y+=(fe-He.y)*Xe,Math.abs(fe-He.y)>.5&&(Y=!0),Z.ly=He.y});let z;for(z=1;z<q.length;z++)q[z].ly=Math.max(q[z].ly,q[z-1].ly+q[z-1].h+Ni);for(z=q.length-1;z>=0;z--)q[z].ly=Math.min(q[z].ly,(z===q.length-1?N-4:q[z+1].ly-Ni)-q[z].h);for(z=0;z<q.length;z++)q[z].ly=Math.max(q[z].ly,z?q[z-1].ly+q[z-1].h+Ni:4);q.forEach(Z=>{let fe=k?B.cx+B.rx+36:B.cx-B.rx-36-Z.w,He=Tn.tg[Z.k];He.x=He.x==null?fe:He.x+(fe-He.x)*Xe,Math.abs(fe-He.x)>.5&&(Y=!0);let at=k?Math.max(He.x,fe):Math.min(He.x,fe);Z.lx=Math.max(4,Math.min(E-Z.w-4,at))});let he=ax();if(he.length){let Z=(fe,He)=>fe.lx<He.r+6&&fe.lx+fe.w>He.l-6&&fe.ly<He.b+4&&fe.ly+fe.h>He.t-4;for(z=0;z<q.length;z++)he.forEach(fe=>{fe.top&&Z(q[z],fe)&&(q[z].ly=fe.b+Ni)});for(z=1;z<q.length;z++)q[z].ly=Math.max(q[z].ly,q[z-1].ly+q[z-1].h+Ni);for(z=q.length-1;z>=0;z--)he.forEach(fe=>{!fe.top&&Z(q[z],fe)&&(q[z].ly=fe.t-Ni-q[z].h)});for(z=q.length-2;z>=0;z--)q[z].ly=Math.min(q[z].ly,q[z+1].ly-Ni-q[z].h)}});let ct="";return Cs.forEach(q=>{if(!q.on){q.el.style.opacity=0;return}q.el.style.opacity="";let k=Tn.pos[q.k];if(!k)k=Tn.pos[q.k]={x:q.lx,y:q.ly,vx:0,vy:0};else{let nt=S/1e3,an=Math.max(1,Math.ceil(nt/.008)),Yt=nt/an;for(let Rt=0;Rt<an;Rt++){k.vx+=(xa*(q.lx-k.x)-ur*k.vx)*Yt,k.vy+=(xa*(q.ly-k.y)-ur*k.vy)*Yt;let Se=Math.max(ya,Math.hypot(q.lx-k.x,q.ly-k.y)*3),te=Math.hypot(k.vx,k.vy);te>Se&&(k.vx*=Se/te,k.vy*=Se/te),k.x+=k.vx*Yt,k.y+=k.vy*Yt}Math.hypot(q.lx-k.x,q.ly-k.y)<.3&&Math.hypot(k.vx,k.vy)<4?(k.x=q.lx,k.y=q.ly,k.vx=k.vy=0):Y=!0}q.el.style.transform="translate("+k.x.toFixed(1)+"px,"+k.y.toFixed(1)+"px)";let z=q.s===1,he=z?k.x-3:k.x+q.w+3,Z=k.y+q.h/2,fe=he+(z?-12:12),He=he.toFixed(1)+","+Z.toFixed(1)+" "+fe.toFixed(1)+","+Z.toFixed(1)+" ",at=q.L.cls||"";if(q.hid){let nt=ox(fe,Z,q.x,q.y);ct+='<polyline class="'+at+'" points="'+He+nt[0].toFixed(1)+","+nt[1].toFixed(1)+'"/><polyline class="'+at+' behind" points="'+nt[0].toFixed(1)+","+nt[1].toFixed(1)+" "+q.x.toFixed(1)+","+q.y.toFixed(1)+'"/>'}else ct+='<polyline class="'+at+'" points="'+He+q.x.toFixed(1)+","+q.y.toFixed(1)+'"/>'}),_.innerHTML=ct,_a=!1,Y}let hr=document.createElement("div");hr.className="jka-status",o.appendChild(hr);try{window.__jkaDbg={LM:Ge,lmPts:vt,cam:Me,el:c.domElement}}catch{}if(ie==="find"&&!ne){let y=null;c.domElement.addEventListener("pointerdown",S=>{y=[S.clientX,S.clientY]}),c.domElement.addEventListener("pointerup",S=>{if(!y||Math.hypot(S.clientX-y[0],S.clientY-y[1])>5)return;let E=c.domElement.getBoundingClientRect();Wt.setFromCamera(new tt((S.clientX-E.left)/E.width*2-1,-(S.clientY-E.top)/E.height*2+1),Me),Wt.far=1/0;let N=Wt.intersectObjects(F.filter(B=>B.mesh.visible&&B.mesh.material.opacity>.5).map(B=>B.mesh),!1),Y=N[0];if(Ge&&Y){let B=N.find($=>I.some(ge=>ge.mesh===$.object));B&&B.distance-Y.distance<.04&&(Y=B)}let K=Ge&&vt.some(B=>Wt.ray.distanceSqToPoint(B)<.009*.009);if(!Y&&!K)return;Y||(Y={object:I[0].mesh,point:Ge.clone(),distance:0});let W=F.find(B=>B.mesh===Y.object),ve=Ge?I.includes(W)&&Y.point.distanceTo(Ge)<.014||vt.some(B=>Wt.ray.distanceSqToPoint(B)<.009*.009):I.includes(W);(window.__jkaFind=window.__jkaFind||[]).push({name:W.name,ok:ve}),ve?(en.forEach(B=>{B.visible=!0,B.material.color.setHex(_u)}),Ge&&Nt?Nt.material.color.setHex(_u):I.forEach(B=>Q(B,_u,667672)),hr.className="jka-status ok",hr.textContent="\u2713 "+e.name):(Q(W,XS,4194304),hr.className="jka-status bad",hr.textContent=Ge?"\u2717 Not quite \u2014 that is on the "+W.name:"\u2717 That is "+W.name,setTimeout(()=>Q(W,W.mesh.userData.base),1100)),kn=!0}),window.__jkaFind=[]}else if(ie==="find"&&ne){let y=window.__jkaFind||[];if(y.length){let S=y.some(E=>E.ok);hr.className="jka-status "+(S?"ok":"bad"),hr.textContent=S?"\u2713 Found it"+(y.length>1?" (try "+(y.findIndex(E=>E.ok)+1)+")":""):"\u2717 Clicked: "+y.map(E=>E.name).slice(-3).join(", ")}}let fo=document.createElement("div");fo.className="jka-refl",o.appendChild(fo);let po=new Set,Id=e.mode+"|"+e.name;function bu(){if(!po.size){fo.style.display="none";return}fo.style.display="";let y=[...new Set([...po].map(E=>E.name.replace(/ muscle$/,"")))].reverse();fo.innerHTML="<span>Reflected: "+y.slice(0,3).join(", ")+(y.length>3?" +"+(y.length-3):"")+"</span>";let S=document.createElement("button");S.className="jka-reflb",S.textContent="Restore",S.addEventListener("pointerdown",E=>E.stopPropagation()),S.onclick=E=>{E.stopPropagation(),po.forEach(N=>{N.mesh.visible=zt(N)}),po.clear(),Ld(),bu(),fr=!0,kn=!0},fo.appendChild(S)}function Ld(){ne||(window.__jkaRefl={key:Id,names:[...po].map(y=>y.name)})}function _c(y){F.filter(S=>S.name===y.name).forEach(S=>{S.mesh.visible=!1,po.add(S)}),Ld(),bu(),fr=!0,kn=!0}let Mu=0,ba=[];function cx(y,S){let E=c.domElement.getBoundingClientRect(),N=(G,B)=>(Wt.setFromCamera(new tt((y+G-E.left)/E.width*2-1,-(S+B-E.top)/E.height*2+1),Me),Wt.far=1/0,Wt.intersectObjects(F.filter($=>$.mesh.visible&&$.mesh.material.opacity>.05).map($=>$.mesh),!1)),Y=N(0,0),K=null,W=G=>F.find(B=>B.mesh===G.object);if(ie==="nerve")for(let[G,B]of[[0,0],[4,0],[-4,0],[0,4],[0,-4],[6,6],[-6,-6],[6,-6],[-6,6]]){let $=N(G,B).map(W).find(ge=>ge&&ge.layer==="nerve");if($){K=$;break}}if(!K&&Y.length&&(K=W(Y[0])),!K){ba.length=0,Nd();return}let ve=ba.findIndex(G=>G.name===K.name);ve>=0?ba.splice(ve,1):ba.push(K),Nd()}function Nd(){for(let y=$e.length-1;y>=0;y--)$e[y].cls&&$e[y].cls.indexOf("pick")>=0&&$e.splice(y,1);ba.forEach(y=>$e.push({text:y.name.replace(/ muscle$/,""),parts:F.filter(S=>S.name===y.name),cls:"minor pick"})),Hr(),kn=!0}function Eu(y,S){let E=c.domElement.getBoundingClientRect();Wt.setFromCamera(new tt((y-E.left)/E.width*2-1,-(S-E.top)/E.height*2+1),Me),Wt.far=1/0;let N=Wt.intersectObjects(F.filter(K=>K.mesh.visible&&K.mesh.material.opacity>.05).map(K=>K.mesh),!1),Y=ie==="find"&&!ne;for(let K of N){let W=F.find(ve=>ve.mesh===K.object);if(W&&(Y||!I.includes(W))){_c(W);return}}}{let y=null,S=0,E=[0,0];c.domElement.addEventListener("pointerdown",N=>{y=N.pointerType==="touch"?null:[N.clientX,N.clientY,N.button]},!0),c.domElement.addEventListener("pointerup",N=>{if(!y)return;let Y=Math.hypot(N.clientX-y[0],N.clientY-y[1])<5,K=y[2];if(y=null,!Y||K!==0)return;let W=performance.now();if(W-S<380&&Math.hypot(N.clientX-E[0],N.clientY-E[1])<10){S=0,clearTimeout(Mu),Eu(N.clientX,N.clientY);return}if(S=W,E=[N.clientX,N.clientY],ne&&!(ie==="find"&&!ne)){let ve=N.clientX,G=N.clientY;clearTimeout(Mu),Mu=setTimeout(()=>cx(ve,G),390)}},!0)}function lx(){if(gc(e.reflect).forEach(E=>{let N=E.startsWith("~"),Y=N?E.slice(1).trim():E;le(Y).forEach(K=>{I.includes(K)||(N?(Re(K,.22),K._a=.22,K._glass=!0):_c(K))})}),!I.length||ie==="find"&&!ne||ie==="peel")return;let y=new Map,S=0;bi.forEach(E=>{let N=E.clone().sub(Me.position),Y=N.length();Wt.set(Me.position,N.normalize()),Wt.far=Y-.002;let K=Wt.intersectObjects(F.filter(W=>W.mesh.visible&&!I.includes(W)&&!W._glass&&W.layer==="muscle").map(W=>W.mesh),!1)[0];if(S++,K){let W=F.find(ve=>ve.mesh===K.object);y.set(W,(y.get(W)||0)+1)}}),y.forEach((E,N)=>{E/Math.max(1,S)>.35&&_c(N)})}ne&&window.__jkaRefl&&window.__jkaRefl.key===Id?setTimeout(()=>window.__jkaRefl.names.forEach(y=>{let S=F.find(E=>E.name===y);S&&_c(S)}),0):setTimeout(lx,30),bu();{let y=0;try{y=+(localStorage.getItem("jka-tip-refl")||0)}catch{}if(y<1){try{localStorage.setItem("jka-tip-refl",String(y+1))}catch{}let S=document.createElement("div");S.className="jka-tip",S.textContent=window.matchMedia&&matchMedia("(hover: none)").matches?"Long-press a structure to reflect it":"Right-click or double-click a structure to reflect it",o.appendChild(S),setTimeout(()=>S.classList.add("on"),600),setTimeout(()=>{S.classList.remove("on"),setTimeout(()=>S.remove(),600)},6500)}}let Su=document.createElement("div");Su.className="jka-zoom"+(yt?" jka-zoom-up":""),[["+",.75],["\u2212",1/.75]].forEach(([y,S])=>{let E=document.createElement("button");E.className="jka-zb",E.textContent=y,E.addEventListener("pointerdown",N=>N.stopPropagation()),E.addEventListener("click",N=>{N.stopPropagation(),Dd(S)}),Su.appendChild(E)});function Dd(y){if(Ci){Ci.zoom(y);return}Wr();let S=Me.position.clone().sub(Oe.target),E=S.length(),N=Math.max(ci?.15:.04,Math.min(ci?14:3,E*y));qe={p0:Me.position.clone(),t0:Oe.target.clone(),p1:Oe.target.clone().addScaledVector(S,N/E),t1:Oe.target.clone(),s:0,u1:Me.up.clone()}}o.appendChild(Su);let Ma=document.createElement("div");Ma.className="jka-chips";{[["bone","Bone"],["muscle","Muscle"],["ligament","Lig."],["nerve","Nerve"],["vessel","Artery"],["vein","Vein"]].forEach(([Y,K])=>{let W=document.createElement("button"),ve=()=>F.some(G=>G.layer===Y&&G.mesh.visible);W.textContent=K,W.dataset.l=Y,W.className=ve()?"jka-b on":"jka-b",W.onclick=()=>{if(Y==="ligament"){let B=ve(),$=F.some(ze=>ze.layer==="capsule"&&ze.mesh.visible),ge=B?!$:!0,Ie=B&&!$;F.forEach(ze=>{zt(ze)&&(ze.layer==="ligament"&&(ze.mesh.visible=ge),ze.layer==="capsule"&&(ze.mesh.visible=Ie))}),W.textContent=Ie?"Lig. + capsule":"Lig.",W.className=ge?"jka-b on":"jka-b",kn=!0;return}let G=!ve();F.forEach(B=>{B.layer===Y&&zt(B)&&(B.mesh.visible=G)}),W.className=G?"jka-b on":"jka-b",kn=!0},Ma.appendChild(W)});let y=document.createElement("button");y.textContent="CT",y.dataset.l="ct",y.className="jka-b";let S=!1;try{S=localStorage.getItem("jka-ct")==="1"}catch{}y.onclick=()=>{vc(!Tu)},Ma.appendChild(y),S&&setTimeout(()=>vc(!0),0);let E=document.createElement("button");E.textContent="X-ray",E.dataset.l="xray",E.className="jka-b";let N=!1;try{N=localStorage.getItem("jka-rad")==="1"}catch{}E.onclick=()=>wu(!ci),Ma.appendChild(E),Vs=!!(N||e.xray),Vs&&(ne&&window.__jkaWasRad&&o.classList.add("jka-nofade"),Promise.resolve().then(()=>wu(!0,!!e.xray,!0)))}let Ci=null,Tu=!1,Ea=null;function vc(y){y&&ci&&wu(!1),Tu=y,o.classList.toggle("jka-ctmode",y),s.classList.remove("jka-ctpre"),o.querySelectorAll("button[data-l=ct]").forEach(U=>{U.className=y?"jka-b on":"jka-b"});try{localStorage.setItem("jka-ct",y?"1":"0")}catch{}if(!y){Ci&&(Ci.ro.disconnect(),Ci.box.remove(),Ci.onEsc&&document.removeEventListener("keydown",Ci.onEsc,!0),Ci.mini&&(Ea&&(Me.zoom=1,fn.copy(Ea.pan),Jt=Ea.by,Ea=null,ke()),o.insertBefore(c.domElement,o.firstChild),Ci.mini.remove(),Object.values(Ci.marks||{}).forEach(U=>w.remove(U)),Gs()),jt.style.display="",_.style.display="",c.domElement.style.visibility="",Ci=null),kn=!0;return}if(Ci)return;let S={bone:"#ededed",muscle:"#8a8a8a",nerve:"#747474",vessel:"#c6c6c6",vein:"#a4a4a4",ligament:"#b9b4a2",capsule:"#9a968a",lung:"#2b2b2b",airway:"#070707",heart:"#868686",organ:"#8e8e8e"},E={capsule:.5,muscle:1,nerve:2,vessel:2,vein:2,ligament:2.5,bone:3},N=F.filter(U=>U.layer!=="capsule"||U.mesh.visible).sort((U,pe)=>(E[U.layer]||0)-(E[pe.layer]||0)).map(U=>{let pe=U.mesh.userData.coarse||U.mesh.geometry,Ce=pe.attributes.position,Fe=Ce.count,et=new Float32Array(Fe*3),Le=new T;for(let ut=0;ut<Fe;ut++)Le.fromBufferAttribute(Ce,ut).applyMatrix4(U.mesh.matrixWorld),et[ut*3]=Le.x,et[ut*3+1]=Le.y,et[ut*3+2]=Le.z;return{p:U,W:et,I:pe.index?pe.index.array:null,n:Fe,tgt:I.includes(U)}}).reduce((U,pe)=>{let Ce=pe.p.name+"|"+pe.tgt,Fe=U.map.get(Ce);if(Fe)Fe.items.push(pe),Fe.box=Fe.box.clone().union(pe.p.box);else{let et={p:pe.p,tgt:pe.tgt,items:[pe],box:pe.p.box.clone()};U.map.set(Ce,et),U.list.push(et)}return U},{map:new Map,list:[]}).list;N.slice().forEach(U=>{let pe=U.items,Ce=new on(new T(-U.box.max.x,U.box.min.y,U.box.min.z),new T(-U.box.min.x,U.box.max.y,U.box.max.z));N.push({p:U.p,tgt:!1,mirror:!0,items:pe,box:Ce})});let Y=e.ctPlanes||Ed.planes;Td(e.ctContext||Ed.model).then(U=>{if(m)return;U.updateMatrixWorld(!0);let pe=new Set(F.map(Ce=>Ce.name));U.traverse(Ce=>{if(!Ce.isMesh||pe.has(String((Ce.userData||{}).n||Ce.name).replace(/\.[lr]$/,"")))return;let Fe=Ce.userData||{},et=Ce.geometry,Le=et.attributes.position,ut=Le.count,Je=new Float32Array(ut*3),Qe=new T;for(let be=0;be<ut;be++)Qe.fromBufferAttribute(Le,be).applyMatrix4(Ce.matrixWorld),Je[be*3]=Qe.x,Je[be*3+1]=Qe.y,Je[be*3+2]=Qe.z;let gt={name:Fe.n||Ce.name,layer:Fe.l||"organ",box:new on().setFromObject(Ce)};N.push({p:gt,tgt:!1,context:!0,items:[{p:gt,W:Je,I:et.index?et.index.array:null,n:ut}],box:gt.box})});try{Z(),he.forEach(Ce=>{Ce.baseKey=null}),Wn()}catch{}}).catch(()=>{});let W={axial:{n:[0,1,0],u:[1,0,0],v:[0,0,1],step:.003,name:"Axial"},coronal:{n:[0,0,1],u:[1,0,0],v:[0,1,0],step:.003,name:"Coronal"},sagittal:{n:[V?1:-1,0,0],u:[0,0,-1],v:[0,1,0],step:.003,name:"Sagittal"}},ve=null;function G(){let pe=document.createElement("canvas");pe.width=pe.height=256;let Ce=pe.getContext("2d"),Fe=[];for(let Je=0;Fe.length<85&&Je<6e3;Je++){let Qe=[Math.random()*256,Math.random()*256,.7+Math.random()*.8];Fe.every(([gt,be])=>{let ht=Math.abs(Qe[0]-gt),me=Math.abs(Qe[1]-be);return ht=Math.min(ht,256-ht),me=Math.min(me,256-me),ht*ht+me*me>15*15})&&Fe.push(Qe)}let et=Ce.createImageData(256,256);for(let Je=0;Je<256;Je++)for(let Qe=0;Qe<256;Qe++){let gt=1e9,be=1e9,ht=1;Fe.forEach(([Ae,pt,ft])=>{let Ut=Math.abs(Qe-Ae),xt=Math.abs(Je-pt);Ut=Math.min(Ut,256-Ut),xt=Math.min(xt,256-xt);let It=Math.sqrt(Ut*Ut+xt*xt);It<gt?(be=gt,gt=It,ht=ft):It<be&&(be=It)});let me=(be-gt)/2,Ve=1.7*ht,At=Math.exp(-(me*me)/(2*Ve*Ve)),yn=Math.round(88+At*80+(Math.random()-.5)*12),sn=(Je*256+Qe)*4;et.data[sn]=et.data[sn+1]=et.data[sn+2]=yn,et.data[sn+3]=255}Ce.putImageData(et,0,0);let Le=document.createElement("canvas");Le.width=Le.height=256;let ut=Le.getContext("2d");ut.filter="blur(0.8px)";for(let Je of[-256,0,256])for(let Qe of[-256,0,256])ut.drawImage(pe,Je,Qe);return Le}let B=document.createElement("div");B.className="jka-ct";let $=document.createElement("div");$.className="jka-ct-h",$.innerHTML="CT <span>(simulated) \xB7 scroll a pane to move its slice \xB7 click to aim the others</span>",B.appendChild($),o.appendChild(B);let ge=document.createElement("button");ge.className="jka-ctoff",ge.textContent="Disable CT",ge.addEventListener("pointerdown",U=>U.stopPropagation()),ge.onclick=U=>{U.stopPropagation(),vc(!1)},B.appendChild(ge),jt.style.display="none",_.style.display="none";let Ie=null;ne?(Ie=document.createElement("div"),Ie.className="jka-mini",o.appendChild(Ie),Ie.appendChild(c.domElement),Gs(),kn=!0,Ea={pan:fn.clone(),by:Jt},fn.set(0,0),Jt=0,Me.zoom=.4,ke()):c.domElement.style.visibility="hidden";let ze=_e.isEmpty()?A:_e,Xe=ze.getCenter(new T),ct=A.clone();ct.min.y=Math.max(ct.min.y,Pe[0]),ct.max.y=Math.min(ct.max.y,Pe[1]);let q=Math.min(2,window.devicePixelRatio||1),k=U=>new T(...U),z={axial:"#ffd36b",coronal:"#7fd8ff",sagittal:"#ff8f8f"},he=["axial","coronal","sagittal"].map(U=>{let pe=document.createElement("div");pe.className="jka-ctp jka-ctp-"+U;let Ce=document.createElement("canvas");pe.appendChild(Ce);let Fe=document.createElement("button");Fe.className="jka-ctp-t",Fe.innerHTML=W[U].name+" <span>\u25BE</span>",Fe.style.color=z[U],pe.appendChild(Fe),Fe.addEventListener("pointerdown",Je=>Je.stopPropagation()),Fe.addEventListener("click",Je=>{Je.stopPropagation(),dt&&lt(Fe)});let et=document.createElement("button");et.className="jka-ctp-plus",et.innerHTML='<svg viewBox="0 0 14 14" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11 L11 3"/><path d="M6.5 3 H11 V7.5"/><path d="M7.5 11 H3 V6.5"/></svg>',et.addEventListener("pointerdown",Je=>Je.stopPropagation()),et.addEventListener("click",Je=>{Je.stopPropagation(),nn(U,!0)}),et.style.color=z[U],pe.appendChild(et),B.appendChild(pe);let Le=W[U],ut={k:U,el:pe,cv:Ce,g2:Ce.getContext("2d"),n:k(Le.n),u:k(Le.u),v:k(Le.v),d:k(Le.n).dot(Xe),half:U==="axial"?.1:.16,W:300,H:300,cu:0,cvv:0};return ut.cu=ut.u.dot(Xe),ut.cvv=ut.v.dot(Xe),ut});function Z(){let U=he.find(ut=>ut.k==="coronal");if(!U||U.manual)return;let pe=1e9,Ce=-1e9,Fe=1e9,et=-1e9;if(N.forEach(ut=>{let Je=ut.box;for(let Qe=0;Qe<8;Qe++){let gt=new T(Qe&1?Je.max.x:Je.min.x,Qe&2?Je.max.y:Je.min.y,Qe&4?Je.max.z:Je.min.z),be=gt.dot(U.u),ht=gt.dot(U.v);pe=Math.min(pe,be),Ce=Math.max(Ce,be),Fe=Math.min(Fe,ht),et=Math.max(et,ht)}}),Ce<=pe)return;let Le=(U.cv.height||U.H||1)/(U.cv.width||U.W||1);U.half=Math.max((et-Fe)/2,(Ce-pe)/2*Le)*1.04,U.cu=(pe+Ce)/2,U.cvv=(Fe+et)/2,U.baseKey=null}Z();let fe={};Ie&&he.forEach(U=>{let pe=new Mn(new so(.34,.34),new Xi({color:z[U.k],transparent:!0,opacity:.25,side:Ti,depthWrite:!1}));pe.quaternion.setFromUnitVectors(new T(0,0,1),U.n),w.add(pe),fe[U.k]=pe});function He(U){let pe=1e9,Ce=-1e9;for(let Fe=0;Fe<8;Fe++){let et=U.dot(new T(Fe&1?ct.max.x:ct.min.x,Fe&2?ct.max.y:ct.min.y,Fe&4?ct.max.z:ct.min.z));pe=Math.min(pe,et),Ce=Math.max(Ce,et)}return[pe,Ce]}function at(){he.forEach(U=>{let pe=U.el.getBoundingClientRect();U.W=pe.width||300,U.H=pe.height||300,U.cv.width=Math.round(U.W*q),U.cv.height=Math.round(U.H*q)})}function nt(U){let{n:pe,u:Ce,v:Fe,g2:et,cv:Le}=U,[ut,Je]=He(pe);U.d=Math.max(ut,Math.min(Je,U.d));let Qe=U.H/(2*U.half)*q,gt=U.d,be=Ve=>Le.width/2+(Ve-U.cu)*Qe,ht=Ve=>Le.height/2-(Ve-U.cvv)*Qe;U.toWorld=(Ve,At)=>Xe.clone().addScaledVector(Ce,U.cu+(Ve*q-Le.width/2)/Qe-Ce.dot(Xe)).addScaledVector(Fe,U.cvv-(At*q-Le.height/2)/Qe-Fe.dot(Xe)).addScaledVector(pe,gt-pe.dot(Xe));let me=gt.toFixed(5)+"|"+U.half+"|"+Le.width+"x"+Le.height+"|"+je+"|"+U.cu.toFixed(5)+","+U.cvv.toFixed(5);if(U.baseKey!==me&&(U.baseKey=me,we(U,Qe,gt,be,ht),U.k==="axial"&&!U.manual&&!U.fitted&&U.shapes&&U.shapes.length&&!U.fitting)){let Ve=1e9,At=-1e9,yn=1e9,sn=-1e9;if(U.shapes.forEach(Ae=>Ae.loops.forEach(pt=>pt.forEach(ft=>{Ve=Math.min(Ve,ft[0]),At=Math.max(At,ft[0]),yn=Math.min(yn,ft[1]),sn=Math.max(sn,ft[1])}))),At>Ve){let Ae=(At-Ve)/Qe+.03,pt=(sn-yn)/Qe+.03,ft=U.cu+((Ve+At)/2-Le.width/2)/Qe,Ut=U.cvv-((yn+sn)/2-Le.height/2)/Qe,xt=Math.max(pt/2,Ae/2*Le.height/Le.width)*1.08;if(Math.abs(xt-U.half)/U.half>.04||Math.abs(ft-U.cu)>.003||Math.abs(Ut-U.cvv)>.003){U.half=xt,U.cu=ft,U.cvv=Ut,U.fitting=!0,nt(U),U.fitting=!1,U.fitted=!0;return}U.fitted=!0}}et.setTransform(1,0,0,1,0,0),et.drawImage(U.base,0,0),_t(U,be,ht),fe[U.k]&&(fe[U.k].position.copy(Xe.clone().addScaledVector(pe,gt-pe.dot(Xe))),kn=!0)}let an=.0042,Yt=26e-5,Rt=(U,pe,Ce)=>{let Fe=U*374761393+pe*668265263+Ce*1274126177|0;return Fe=Math.imul(Fe^Fe>>>13,1274126177),((Fe^Fe>>>16)>>>0)/4294967296};function Se(U,pe,Ce,Fe){let et=Math.floor(U),Le=Math.floor(pe),ut=Math.floor(Ce),Je=U-et,Qe=pe-Le,gt=Ce-ut,be=Je*Je*(3-2*Je),ht=Qe*Qe*(3-2*Qe),me=gt*gt*(3-2*gt),Ve=(yn,sn,Ae)=>Rt(yn+Fe*101,sn+Fe*37,Ae+Fe*59),At=(yn,sn,Ae)=>yn+(sn-yn)*Ae;return At(At(At(Ve(et,Le,ut),Ve(et+1,Le,ut),be),At(Ve(et,Le+1,ut),Ve(et+1,Le+1,ut),be),ht),At(At(Ve(et,Le,ut+1),Ve(et+1,Le,ut+1),be),At(Ve(et,Le+1,ut+1),Ve(et+1,Le+1,ut+1),be),ht),me)}function te(U,pe,Ce){let Fe=1/(an*1.4),et=an*.45,Le=U+(Se(U*Fe,pe*Fe,Ce*Fe,1)-.5)*2*et,ut=pe+(Se(U*Fe,pe*Fe,Ce*Fe,2)-.5)*2*et,Je=Ce+(Se(U*Fe,pe*Fe,Ce*Fe,3)-.5)*2*et,Qe=Math.floor(Le/an),gt=Math.floor(ut/an),be=Math.floor(Je/an),ht=1e9,me=1e9;for(let pt=-1;pt<=1;pt++)for(let ft=-1;ft<=1;ft++)for(let Ut=-1;Ut<=1;Ut++){let xt=Qe+pt,It=gt+ft,dn=be+Ut,li=(xt+Rt(xt,It,dn))*an,Pi=(It+Rt(It,dn,xt+7))*an,Ct=(dn+Rt(dn,xt,It+13))*an,ln=(li-Le)*(li-Le)+(Pi-ut)*(Pi-ut)+(Ct-Je)*(Ct-Je);ln<ht?(me=ht,ht=ln):ln<me&&(me=ln)}let Ve=(Math.sqrt(me)-Math.sqrt(ht))/2,At=1/(an*2.2),yn=Se(U*At,pe*At,Ce*At,4),sn=Yt*(.45+1.25*yn),Ae=.55+.45*Math.min(1,Se(U*At*1.7,pe*At*1.7,Ce*At*1.7,5)*1.8);return Math.exp(-(Ve*Ve)/(2*sn*sn))*Ae}function de(U,pe,Ce,Fe,et,Le){let Je=Math.ceil(et*.5),Qe=Math.ceil(Le*.5),gt=document.createElement("canvas");gt.width=Je,gt.height=Qe;let be=gt.getContext("2d");be.setTransform(.5,0,0,.5,0,0),be.fillStyle="#fff",Fe.forEach(pt=>{pt.S.p.layer!=="bone"||!pt.loops.length||/^(Hip bone|Sacrum|Coccyx|Vertebra)/.test(pt.S.p.name)||(be.beginPath(),pt.loops.forEach(ft=>{be.moveTo(ft[0][0],ft[0][1]),ft.forEach(Ut=>be.lineTo(Ut[0],Ut[1])),be.closePath()}),be.fill("nonzero"))});let ht=be.getImageData(0,0,Je,Qe),me=be.createImageData(Je,Qe),{u:Ve,v:At,n:yn}=U;for(let pt=0;pt<Qe;pt++)for(let ft=0;ft<Je;ft++){let Ut=(pt*Je+ft)*4;if(!ht.data[Ut+3])continue;let xt=U.cu+(ft/.5-et/2)/pe,It=U.cvv-(pt/.5-Le/2)/pe,dn=Ve.x*xt+At.x*It+yn.x*Ce,li=Ve.y*xt+At.y*It+yn.y*Ce,Pi=Ve.z*xt+At.z*It+yn.z*Ce,Ct=Math.round(86+te(dn,li,Pi)*84+(Math.random()-.5)*10);me.data[Ut]=me.data[Ut+1]=me.data[Ut+2]=Ct,me.data[Ut+3]=255}be.setTransform(1,0,0,1,0,0),be.putImageData(me,0,0);let sn=document.createElement("canvas");sn.width=et,sn.height=Le;let Ae=sn.getContext("2d");return Ae.imageSmoothingEnabled=!0,Ae.filter="blur(0.6px)",Ae.drawImage(gt,0,0,et,Le),sn}let xe=new Map,Ee=12e3;function se(U,pe){if(U.ix=U.ix||[],U.ix[pe])return U.ix[pe];let Ce=U.W,Fe=U.I,et=Fe?Fe.length/3:U.n/3,Le=.002,ut=1e9,Je=-1e9;for(let Ve=pe;Ve<Ce.length;Ve+=3)ut=Math.min(ut,Ce[Ve]),Je=Math.max(Je,Ce[Ve]);let Qe=Math.max(1,Math.ceil((Je-ut)/Le)+1),gt=new Int32Array(Qe+1),be=new Int32Array(et*2);for(let Ve=0;Ve<et;Ve++){let At=Fe?Fe[Ve*3]:Ve*3,yn=Fe?Fe[Ve*3+1]:Ve*3+1,sn=Fe?Fe[Ve*3+2]:Ve*3+2,Ae=Ce[At*3+pe],pt=Ce[yn*3+pe],ft=Ce[sn*3+pe],Ut=Math.floor((Math.min(Ae,pt,ft)-ut)/Le),xt=Math.floor((Math.max(Ae,pt,ft)-ut)/Le);be[Ve*2]=Ut,be[Ve*2+1]=xt;for(let It=Ut;It<=xt;It++)gt[It+1]++}for(let Ve=0;Ve<Qe;Ve++)gt[Ve+1]+=gt[Ve];let ht=new Int32Array(gt[Qe]),me=gt.slice(0,Qe);for(let Ve=0;Ve<et;Ve++)for(let At=be[Ve*2];At<=be[Ve*2+1];At++)ht[me[At]++]=Ve;return U.ix[pe]={lo:ut,B:Le,nb:Qe,start:gt,list:ht}}let J=0;function Te(U,pe,Ce){U.id==null&&(U.id=++J);let Fe=U.id+"|"+pe+"|"+Ce.toFixed(5),et=xe.get(Fe);if(et)return xe.delete(Fe),xe.set(Fe,et),et;let Le=se(U,pe),ut=[],Je=Math.floor((Ce-Le.lo)/Le.B);if(Je>=0&&Je<Le.nb){let gt=U.W,be=U.I;for(let ht=Le.start[Je];ht<Le.start[Je+1];ht++){let me=Le.list[ht],Ve=be?be[me*3]:me*3,At=be?be[me*3+1]:me*3+1,yn=be?be[me*3+2]:me*3+2,sn=gt[Ve*3+pe]-Ce,Ae=gt[At*3+pe]-Ce,pt=gt[yn*3+pe]-Ce,ft=[],Ut=(xt,It,dn,li)=>{let Pi=dn/(dn-li);ft.push(gt[xt*3]+(gt[It*3]-gt[xt*3])*Pi,gt[xt*3+1]+(gt[It*3+1]-gt[xt*3+1])*Pi,gt[xt*3+2]+(gt[It*3+2]-gt[xt*3+2])*Pi)};if(sn>0!=Ae>0&&Ut(Ve,At,sn,Ae),Ae>0!=pt>0&&Ut(At,yn,Ae,pt),pt>0!=sn>0&&Ut(yn,Ve,pt,sn),ft.length===6)for(let xt=0;xt<6;xt++)ut.push(ft[xt])}}let Qe=new Float32Array(ut);return xe.set(Fe,Qe),xe.size>Ee&&xe.delete(xe.keys().next().value),Qe}function we(U,pe,Ce,Fe,et){let Le=performance.now(),ut=!U.forceFull&&U.lastSlice&&Le-U.lastSlice<200;U.forceFull=!1,clearTimeout(U.fullT);let Je=pe/1e3>1/.8;ut&&(U.fullT=setTimeout(()=>{U.forceFull=!0,U.baseKey=null,nt(U)},180));let{n:Qe,u:gt,v:be}=U;U.base||(U.base=document.createElement("canvas"));let ht=U.base;ht.width=U.cv.width,ht.height=U.cv.height;let me=ht.getContext("2d");me.setTransform(1,0,0,1,0,0),me.fillStyle="#0a0a0a",me.fillRect(0,0,ht.width,ht.height);let Ve=[],At=null,yn=null;N.forEach(Ct=>{if(Ct.context&&!Y.includes(U.k))return;let ln=Ct.box,rn=1e9,In=-1e9;for(let tn=0;tn<8;tn++){let Lt=Qe.x*(tn&1?ln.max.x:ln.min.x)+Qe.y*(tn&2?ln.max.y:ln.min.y)+Qe.z*(tn&4?ln.max.z:ln.min.z);rn=Math.min(rn,Lt),In=Math.max(In,Lt)}if(rn>Ce||In<Ce)return;let Cn=[],qn=Ct.mirror?-1:1,ii=Math.abs(Qe.x)>.5?0:Math.abs(Qe.y)>.5?1:2,Xn=Ce*(ii===0?Qe.x:ii===1?Qe.y:Qe.z),Zn=(tn,Lt,Ln)=>[Fe(tn*gt.x+Lt*gt.y+Ln*gt.z),et(tn*be.x+Lt*be.y+Ln*be.z)];if(Ct.items.forEach(tn=>{let Lt=Te(tn,ii,ii===0?Xn*qn:Xn);for(let Ln=0;Ln<Lt.length;Ln+=6)Cn.push([Zn(Lt[Ln]*qn,Lt[Ln+1],Lt[Ln+2]),Zn(Lt[Ln+3]*qn,Lt[Ln+4],Lt[Ln+5])])}),!Cn.length)return;let $t=tn=>Math.round(tn[0]*4)+","+Math.round(tn[1]*4),pn=new Map;Cn.forEach((tn,Lt)=>[0,1].forEach(Ln=>{let vs=$t(tn[Ln]);(pn.get(vs)||pn.set(vs,[]).get(vs)).push([Lt,Ln])}));let Zt=new Uint8Array(Cn.length),mn=[];for(let tn=0;tn<Cn.length;tn++){if(Zt[tn])continue;Zt[tn]=1;let Lt=[Cn[tn][0],Cn[tn][1]],Ln=Cn[tn][1];for(let vs=0;vs<Cn.length;vs++){let qs=(pn.get($t(Ln))||[]).find(([js])=>!Zt[js]);if(!qs)break;Zt[qs[0]]=1;let Ys=Cn[qs[0]][1-qs[1]];Lt.push(Ys),Ln=Ys}Lt.length>1&&mn.push(Lt)}let zn=8*q,Qn=(tn,Lt)=>Math.hypot(tn[0]-Lt[0],tn[1]-Lt[1]),us=tn=>Qn(tn[0],tn[tn.length-1])<=zn,Di=mn.filter(tn=>!us(tn)),Ei=mn.filter(us);for(let tn=0;Di.length&&tn<400;tn++){let Lt=Di[0],Ln=null,vs=zn*3;Qn(Lt[0],Lt[Lt.length-1])<vs&&Lt.length>2&&(vs=Qn(Lt[0],Lt[Lt.length-1]),Ln={self:!0});for(let js=1;js<Di.length;js++){let bs=Di[js];[[Lt[Lt.length-1],bs[0],0],[Lt[Lt.length-1],bs[bs.length-1],1],[Lt[0],bs[bs.length-1],2],[Lt[0],bs[0],3]].forEach(([yx,_x,vx])=>{let Kd=Qn(yx,_x);Kd<vs&&(vs=Kd,Ln={j:js,m:vx})})}if(!Ln){let js=0;for(let bs=1;bs<Lt.length;bs++)js+=Qn(Lt[bs-1],Lt[bs]);Di.shift(),Lt.length>4&&Qn(Lt[0],Lt[Lt.length-1])<.18*js?Ei.push(Lt):(At||(At=[])).push(Lt);continue}if(Ln.self){Ei.push(Di.shift());continue}let qs=Di[Ln.j],Ys;Ln.m===0?Ys=Lt.concat(qs):Ln.m===1?Ys=Lt.concat(qs.slice().reverse()):Ln.m===2?Ys=qs.concat(Lt):Ys=qs.slice().reverse().concat(Lt),Di.splice(Ln.j,1),Di[0]=Ys,us(Ys)&&Ei.push(Di.shift())}Ve.push({S:Ct,loops:Ei.filter(tn=>tn.length>2),lines:At||[]}),At=null});let sn=Ct=>{me.beginPath(),Ct.forEach(ln=>{me.moveTo(ln[0][0],ln[0][1]);for(let rn=1;rn<ln.length;rn++)me.lineTo(ln[rn][0],ln[rn][1]);me.closePath()})};me.lineJoin="round";let Ae="#3a3a3a",pt="#8f8f8f",ft=.012*pe,Ut=Math.max(1*q,7e-4*pe),xt=Ve.filter(Ct=>Ct.S.p.layer!=="capsule"&&Ct.S.p.layer!=="lung"&&Ct.S.p.layer!=="airway"),It=[];if(U.k==="axial"){let Ct=xt.map($t=>{let pn=1e9,Zt=1e9,mn=-1e9,zn=-1e9;return $t.loops.forEach(Qn=>Qn.forEach(us=>{pn=Math.min(pn,us[0]),Zt=Math.min(Zt,us[1]),mn=Math.max(mn,us[0]),zn=Math.max(zn,us[1])})),[pn,Zt,mn,zn]}),ln=/latissimus|serratus|pectoralis|trapezius|rhomboid|levator scapulae|subclavius|intercostal|thoraco|lateral thoracic|long thoracic|vertebra|sacrum|coccyx|psoas|quadratus lumborum|iliac artery|iliac vein/i,rn=$t=>$t.S.context||ln.test($t.S.p.name),In=$t=>!!$t.S.mirror,Cn=xt.map(($t,pn)=>pn),qn=$t=>Cn[$t]===$t?$t:Cn[$t]=qn(Cn[$t]),ii=.006*pe;for(let $t=0;$t<Ct.length;$t++)for(let pn=$t+1;pn<Ct.length;pn++){let Zt=Ct[$t],mn=Ct[pn];Zt[0]>1e8||mn[0]>1e8||In(xt[$t])!==In(xt[pn])||rn(xt[$t])||rn(xt[pn])||Zt[0]-ii<mn[2]&&mn[0]-ii<Zt[2]&&Zt[1]-ii<mn[3]&&mn[1]-ii<Zt[3]&&(Cn[qn($t)]=qn(pn))}let Xn=new Map;xt.forEach(($t,pn)=>{if(Ct[pn][0]>1e8||rn($t))return;let Zt=qn(pn);(Xn.get(Zt)||Xn.set(Zt,[]).get(Zt)).push($t)});let Zn=($t,pn,Zt)=>(pn[0]-$t[0])*(Zt[1]-$t[1])-(pn[1]-$t[1])*(Zt[0]-$t[0]);Xn.forEach($t=>{let pn=[];if($t.forEach(zn=>zn.loops.forEach(Qn=>Qn.forEach(us=>pn.push(us)))),pn.length<3)return;pn.sort((zn,Qn)=>zn[0]-Qn[0]||zn[1]-Qn[1]);let Zt=[],mn=[];pn.forEach(zn=>{for(;Zt.length>1&&Zn(Zt[Zt.length-2],Zt[Zt.length-1],zn)<=0;)Zt.pop();Zt.push(zn)}),pn.slice().reverse().forEach(zn=>{for(;mn.length>1&&Zn(mn[mn.length-2],mn[mn.length-1],zn)<=0;)mn.pop();mn.push(zn)}),It.push(Zt.slice(0,-1).concat(mn.slice(0,-1)))})}let dn=(Ct,ln)=>{me.strokeStyle=ln,me.fillStyle=ln,me.lineWidth=Ct,It.forEach(rn=>{me.beginPath(),rn.forEach((In,Cn)=>Cn?me.lineTo(In[0],In[1]):me.moveTo(In[0],In[1])),me.closePath(),me.fill(),me.stroke()}),xt.forEach(rn=>{sn(rn.loops),me.fill("evenodd"),me.stroke(),rn.lines.length&&(me.beginPath(),rn.lines.forEach(In=>{me.moveTo(In[0][0],In[0][1]),In.forEach(Cn=>me.lineTo(Cn[0],Cn[1]))}),me.stroke())})};me.lineJoin="round",me.lineCap="round",dn(2*(ft+Ut),pt),dn(2*ft,Ae);let li=Ct=>{if(sn(Ct.loops),Ct.S.p.layer==="bone"&&!Ct.S.tgt){let ln=Ct.S.p.box,rn=ln.min.y,In=ln.max.y,Cn=Math.max(1e-4,In-rn),qn=/^(Femur|Tibia|Fibula)$/.test(Ct.S.p.name),ii=Di=>{if(!qn)return 0;let Ei=(Di-rn)/Cn,tn=Math.min(1,Math.max(0,(Ei-.16)/.12)),Lt=Math.min(1,Math.max(0,(.84-Ei)/.12));return Math.min(tn,Lt)},Xn=1e9,Zn=1e9,$t=-1e9,pn=-1e9;Ct.loops.forEach(Di=>Di.forEach(Ei=>{Ei[0]<Xn&&(Xn=Ei[0]),Ei[0]>$t&&($t=Ei[0]),Ei[1]<Zn&&(Zn=Ei[1]),Ei[1]>pn&&(pn=Ei[1])})),Xn=Math.max(0,Math.floor(Xn)-2),Zn=Math.max(0,Math.floor(Zn)-2);let Zt=Math.min(ht.width,Math.ceil($t)+2)-Xn,mn=Math.min(ht.height,Math.ceil(pn)+2)-Zn;if(Zt<=0||mn<=0)return;me.save(),me.clip("nonzero"),/^(Hip bone|Sacrum|Coccyx)|vertebra|atlas|axis \(c2|\brib\b|stern|manubrium|xiphoid|costal/i.test(Ct.S.p.name)?(me.fillStyle="#c9c9c9",me.fillRect(Xn,Zn,Zt,mn)):ut||!Je?(me.fillStyle="#b4b4b4",me.fillRect(Xn,Zn,Zt,mn)):(yn||(yn=de(U,pe,Ce,Ve,ht.width,ht.height)),me.drawImage(yn,Xn,Zn,Zt,mn,Xn,Zn,Zt,mn));let zn="rgba(58,58,58,",Qn=be.y;if(qn&&Math.abs(Qn)>.5){let Di=et(rn*Qn),Ei=et(In*Qn),tn=me.createLinearGradient(0,Di,0,Ei);[0,.16,.28,.5,.72,.84,1].forEach(Lt=>tn.addColorStop(Lt,zn+ii(rn+Lt*Cn).toFixed(2)+")")),me.fillStyle=tn,me.fillRect(Xn,Zn,Zt,mn)}else qn&&(me.fillStyle=zn+ii(Ce).toFixed(2)+")",me.fillRect(Xn,Zn,Zt,mn));let us=Math.abs(Qn)>.5?.5:ii(Ce);sn(Ct.loops),me.strokeStyle="#f4f4f4",me.lineWidth=Math.max(4*q,(.005+.009*us)*pe),me.stroke(),me.restore();return}me.fillStyle=S[Ct.S.p.layer]||"#888",me.fill("evenodd"),Ct.S.tgt&&(me.fillStyle="rgba(95,200,255,.58)",me.fill("evenodd")),me.strokeStyle="rgba(40,40,40,.55)",me.lineWidth=.8*q,me.stroke()};Ve.forEach(li),U.shapes=Ve,U.lastSlice=performance.now();let Pi=[];me.font="600 "+10.5*q+"px -apple-system, system-ui, sans-serif",me.textAlign="center",me.textBaseline="middle",Ve.filter(Ct=>Ct.S.p.name===je&&Ct.loops.length).forEach(Ct=>{let ln=0,rn=0,In=0,Cn=0;Ct.loops.forEach(Zt=>{for(let mn=0;mn<Zt.length;mn++){let zn=Zt[mn],Qn=Zt[(mn+1)%Zt.length];Cn+=zn[0]*Qn[1]-Qn[0]*zn[1],ln+=zn[0],rn+=zn[1],In++}});let qn=ln/In,ii=rn/In,Xn=Ct.S.p.name.replace(/ muscle$/,""),Zn=me.measureText(Xn).width+6*q,$t=14*q,pn=ii-16*q;for(let Zt=0;Zt<6&&Pi.some(mn=>Math.abs(mn[0]-qn)<(mn[2]+Zn)/2&&Math.abs(mn[1]-pn)<$t);Zt++)pn-=$t;Pi.push([qn,pn,Zn]),me.strokeStyle="rgba(255,224,150,.6)",me.lineWidth=1*q,me.beginPath(),me.moveTo(qn,ii),me.lineTo(qn,pn+$t/2-2*q),me.stroke(),me.fillStyle="rgba(0,0,0,.6)",me.fillRect(qn-Zn/2,pn-$t/2,Zn,$t),me.fillStyle="#ffe196",me.fillText(Xn,qn,pn+.5*q)}),me.textAlign="start",me.textBaseline="alphabetic",Ve.forEach(Ct=>{Ct.lines.length&&(me.beginPath(),Ct.lines.forEach(ln=>{me.moveTo(ln[0][0],ln[0][1]);for(let rn=1;rn<ln.length;rn++)me.lineTo(ln[rn][0],ln[rn][1])}),me.strokeStyle=Ct.S.p.layer==="bone"?"#f2f2f2":S[Ct.S.p.layer]||"#888",me.lineWidth=(Ct.S.p.layer==="bone"?2.5:1.5)*q,me.stroke())})}function _t(U,pe,Ce){let{u:Fe,v:et,g2:Le,cv:ut}=U;Le.setLineDash([4*q,4*q]),Le.lineWidth=1*q,he.forEach(Je=>{if(Je===U)return;Le.strokeStyle=z[Je.k],Le.globalAlpha=.7,Le.beginPath();let Qe=Je.n.dot(Fe),gt=Je.n.dot(et);if(Math.abs(Qe)>.5){let be=pe(Je.d/Qe);Le.moveTo(be,0),Le.lineTo(be,ut.height)}else if(Math.abs(gt)>.5){let be=Ce(Je.d/gt);Le.moveTo(0,be),Le.lineTo(ut.width,be)}Le.stroke(),Le.globalAlpha=1}),Le.setLineDash([])}let je=null,dt=null,it=document.createElement("div");it.className="jka-ctmenu",it.style.display="none",B.appendChild(it);let cn=window.matchMedia&&(matchMedia("(hover: none)").matches||matchMedia("(max-width: 720px)").matches);[["axial","Axial"],["coronal","Coronal"],["sagittal","Sagittal"]].concat(cn?[]:[[null,"All three"]]).forEach(([U,pe])=>{let Ce=document.createElement("button");Ce.className="jka-ctmi",Ce.textContent=pe,Ce.dataset.k=U||"",Ce.addEventListener("pointerdown",Fe=>Fe.stopPropagation()),Ce.addEventListener("click",Fe=>{Fe.stopPropagation(),it.style.display="none",nn(U,!0)}),it.appendChild(Ce)});function lt(U){if(it.style.display!=="none"){it.style.display="none";return}let pe=B.getBoundingClientRect(),Ce=U.getBoundingClientRect();it.style.display="",it.style.top=Ce.bottom-pe.top+4+"px",it.style.left="auto",it.style.right="8px",it.querySelectorAll("button").forEach(Fe=>Fe.classList.toggle("on",(Fe.dataset.k||null)===dt))}B.addEventListener("pointerdown",()=>{it.style.display="none"});function nn(U,pe){dt=pe?U:dt===U?null:U,B.classList.toggle("jka-ct-solo",!!dt),he.forEach(Ce=>Ce.el.classList.toggle("jka-on",Ce.k===dt)),requestAnimationFrame(()=>{at(),he.forEach(Ce=>{Ce.baseKey=null}),Wn()})}let Rn=U=>{U.key==="Escape"&&dt&&Ci&&(U.preventDefault(),U.stopPropagation(),nn(dt))};document.addEventListener("keydown",Rn,!0);let Wn=()=>he.forEach(nt);try{window.__jkaCT={panes:he,drawPane:nt,src:N,slice:we}}catch{}he.forEach(U=>{U.cv.addEventListener("wheel",be=>{if(be.preventDefault(),be.stopPropagation(),be.ctrlKey){U.manual=!0,U.half=Math.max(.03,Math.min(1,U.half*Math.exp(be.deltaY*.01))),nt(U);return}U.d-=Math.sign(be.deltaY)*.003,Wn()},{passive:!1});let pe=!1,Ce=null,Fe=0,et=be=>{let ht=U.cv.getBoundingClientRect();Ce=U.toWorld(be.clientX-ht.left,be.clientY-ht.top),Fe||(Fe=requestAnimationFrame(()=>{if(Fe=0,!Ce)return;let me=Ce;Ce=null,he.forEach(Ve=>{Ve!==U&&(Ve.d=Ve.n.dot(me))}),Wn()}))},Le=null,ut=null;U.cv.addEventListener("contextmenu",be=>be.preventDefault()),U.cv.addEventListener("pointerdown",be=>{if(be.button===2||be.button===1||be.button===0&&be.shiftKey){be.preventDefault(),U.manual=!0,ut=[be.clientX,be.clientY],U.cv.setPointerCapture(be.pointerId);return}be.button===0&&(Le=[be.clientX,be.clientY],pe=!1,U.cv.setPointerCapture(be.pointerId))}),U.cv.addEventListener("pointermove",be=>{if(ut){let ht=U.H/(2*U.half);U.cu-=(be.clientX-ut[0])/ht,U.cvv+=(be.clientY-ut[1])/ht,ut=[be.clientX,be.clientY],U.praf||(U.praf=requestAnimationFrame(()=>{U.praf=0,nt(U)}));return}Le&&(!pe&&Math.hypot(be.clientX-Le[0],be.clientY-Le[1])>4&&(pe=!0),pe&&et(be))}),U.cv.addEventListener("pointerup",be=>{if(Le&&!pe){let ht=U.cv.getBoundingClientRect(),me=(be.clientX-ht.left)*q,Ve=(be.clientY-ht.top)*q,At=U.cv.getContext("2d"),yn=null;(U.shapes||[]).slice().reverse().some(sn=>sn.loops.length?(At.beginPath(),sn.loops.forEach(Ae=>{At.moveTo(Ae[0][0],Ae[0][1]),Ae.forEach(pt=>At.lineTo(pt[0],pt[1])),At.closePath()}),At.isPointInPath(me,Ve,sn.S.p.layer==="bone"?"nonzero":"evenodd")?(yn=sn.S.p.name,!0):!1):!1),je=yn===je?null:yn,Wn()}Le=null,pe=!1,ut=null}),U.cv.addEventListener("pointercancel",()=>{Le=null,pe=!1,ut=null});let Je=new Map,Qe=null;["touchstart","touchmove","touchend","touchcancel"].forEach(be=>U.cv.addEventListener(be,ht=>{ht.stopPropagation(),ht.cancelable&&ht.preventDefault()},{passive:!1})),U.cv.addEventListener("pointerdown",be=>{if(be.pointerType==="touch"&&(Je.set(be.pointerId,[be.clientX,be.clientY]),Je.size===2)){Le=null,pe=!1;let[ht,me]=[...Je.values()];Qe={d:Math.hypot(ht[0]-me[0],ht[1]-me[1]),y:(ht[1]+me[1])/2}}},!0),U.cv.addEventListener("pointermove",be=>{if(be.pointerType!=="touch"||!Je.has(be.pointerId)||(Je.set(be.pointerId,[be.clientX,be.clientY]),Je.size!==2||!Qe))return;be.stopImmediatePropagation();let[ht,me]=[...Je.values()],Ve=Math.hypot(ht[0]-me[0],ht[1]-me[1]),At=(ht[1]+me[1])/2;Ve>10&&Qe.d>10&&Math.abs(Ve-Qe.d)>1&&(U.manual=!0,U.half=Math.max(.03,Math.min(1,U.half*Qe.d/Ve))),U.d+=(At-Qe.y)*4e-4,Qe={d:Ve,y:At},U.praf||(U.praf=requestAnimationFrame(()=>{U.praf=0,Wn()}))},!0);let gt=be=>{be.pointerType==="touch"&&(Je.delete(be.pointerId),Je.size<2&&(Qe=null))};U.cv.addEventListener("pointerup",gt,!0),U.cv.addEventListener("pointercancel",gt,!0),U.cv.addEventListener("dblclick",be=>{be.preventDefault(),cn||nn(U.k)})}),["pointerdown","pointermove","pointerup"].forEach(U=>B.addEventListener(U,pe=>pe.stopPropagation()));let zi=new ResizeObserver(()=>{at(),Wn()});zi.observe(o),Ci={box:B,mini:Ie,mark:null,marks:fe,ro:zi,onEsc:Rn,zoom:U=>{he.forEach(pe=>{pe.manual=!0,pe.half=Math.max(.03,Math.min(1,pe.half*U))}),Wn()},key:U=>{he[0].d+=U,Wn()}},at(),Wn();let ls=window.matchMedia&&(matchMedia("(hover: none)").matches||matchMedia("(max-width: 720px)").matches);(ne||ls)&&nn("axial",!0),va=null}function wu(y,S,E){Vs=!1,ne||(window.__jkaWasRad=y),y&&Tu&&vc(!1);let N=ci;ci=y,Oe.turntable=y,E||(o.classList.add("jka-glide"),setTimeout(()=>o.classList.remove("jka-glide"),450)),o.classList.toggle("jka-radmode",y),Gs(),Rs();let Y=Math.tan(oo.degToRad(15))/Math.tan(oo.degToRad(3.5));if(y&&!N){Oe.autoRotate=!1;let K=Oe.level();Me.fov=7,Me.far=40,Me.updateProjectionMatrix();let W=Oe.target.clone().add(Me.position.clone().sub(Oe.target).multiplyScalar(Y)),ve=Oe.target.clone().add(K.p1.clone().sub(Oe.target).multiplyScalar(Y));E?(Me.position.copy(ve),K.u1&&Me.up.copy(K.u1),Me.lookAt(Oe.target),qe=null):(Me.position.copy(W),qe={p0:W,t0:Oe.target.clone(),p1:ve,t1:Oe.target.clone(),s:0,u1:K.u1})}if(!y&&N&&(Me.fov=30,Me.far=20,Me.updateProjectionMatrix(),Me.position.copy(Oe.target.clone().add(Me.position.clone().sub(Oe.target).multiplyScalar(1/Y)))),o.querySelectorAll("button[data-l=xray]").forEach(K=>{K.className=y?"jka-b on":"jka-b"}),!S)try{localStorage.setItem("jka-rad",y?"1":"0")}catch{}if(y&&!vi){let K=window.__jkaT||{};K.radStart=Math.round(performance.now()-(K.t0||0));let W={bone:55,muscle:1.5,vessel:3.2,nerve:2.6},ve=new Rr,G=(k,z,he,Z)=>new qi({uniforms:{mu:{value:k},tg:{value:z?1:0},sh:{value:he||0},tx:{value:Z||0},ctr:{value:new T},fl:{value:1}},vertexShader:"uniform float sh; uniform vec3 ctr; varying float vz; varying vec3 wp; void main(){ vec3 p = position - normal * sh; vec4 w = modelMatrix * vec4(p, 1.); wp = w.xyz; vec4 mv = viewMatrix * w; vec4 mc = viewMatrix * vec4(ctr, 1.); vz = mc.z - mv.z; gl_Position = projectionMatrix * mv; }",fragmentShader:"uniform float mu, tg, tx, fl; varying float vz; varying vec3 wp; float h(vec3 p){ return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); } void main(){ float s = (gl_FrontFacing ? -1. : 1.) * fl; gl_FragColor = vec4(s * vz * mu, s * vz * tg * 40., s * vz * tx, 1.); }",side:Ti,depthTest:!1,depthWrite:!1,transparent:!0,blending:Bl,blendEquation:Ds,blendSrc:kl,blendDst:kl}),B={},$=(k,z)=>{let he=z.clone();he.uniforms.ctr.value=k.box.getCenter(new T);let Z=new Mn(k.mesh.geometry,he);Z.matrixAutoUpdate=!1,Z.matrix.copy(k.mesh.matrixWorld),Z.userData.src=k,ve.add(Z)};F.forEach(k=>{if(k.layer==="nerve"||k.layer==="vessel"||k.layer==="vein"||k.layer==="ligament"||k.layer==="capsule")return;let z=I.includes(k),he=k.layer+z;if(k.layer==="bone"){$(k,B.bo||(B.bo=G(150,!1,0,0))),$(k,B.bi||(B.bi=G(-150,!1,.006,9))),z&&!Ge&&ie==="name"&&$(k,B.bt||(B.bt=G(0,!0,0,0)));return}$(k,B[he]||(B[he]=G(W[k.layer]||2.6,z)))});let ge=(k,z,he,Z)=>{let fe=he.getCenter(new T);[[B.bo||(B.bo=G(150,!1,0,0))],[B.bi||(B.bi=G(-150,!1,.006,9))]].forEach(([He])=>{let at=He.clone();at.uniforms.ctr.value=fe,at.uniforms.fl.value=Z?-1:1;let nt=new Mn(k,at);nt.matrixAutoUpdate=!1,nt.matrix.copy(z),nt.userData.always=!0,ve.add(nt)})},Ie=new bt().makeScale(-1,1,1);F.forEach(k=>{if(k.layer!=="bone")return;let z=(k.box.min.x+k.box.max.x)/2;if(k.box.min.x<.005&&k.box.max.x>-.005)return;let he=k.box.clone().applyMatrix4(Ie);ge(k.mesh.geometry,Ie.clone().multiply(k.mesh.matrixWorld),he,!1)}),Td(Ed.model).then(k=>{if(m)return;k.updateMatrixWorld(!0);let z=new Set(F.map(he=>he.name));k.traverse(he=>{!he.isMesh||(he.userData||{}).l!=="bone"||z.has(String(he.userData.n||he.name).replace(/\.[lr]$/,""))||ge(he.geometry,he.matrixWorld,new on().setFromObject(he),!1)}),kn=!0}).catch(()=>{});let ze=new ds(4,4,{type:no,depthBuffer:!1});f.push(ze);let Xe=new Mn(new so(2,2),new qi({vertexShader:"varying vec2 vu; void main(){ vu = uv; gl_Position = vec4(position.xy, 0., 1.); }",uniforms:{t:{value:ze.texture},px:{value:new tt(1,1)}},fragmentShader:"uniform sampler2D t; uniform vec2 px; varying vec2 vu; float hh(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); } float vn(vec2 q){ vec2 i = floor(q), f = fract(q); f = f * f * (3. - 2. * f); return mix(mix(hh(i), hh(i + vec2(1, 0)), f.x), mix(hh(i + vec2(0, 1)), hh(i + vec2(1, 1)), f.x), f.y); } vec4 mn(vec4 a, vec4 b){ return min(a, b); } vec4 mx(vec4 a, vec4 b){ return max(a, b); } vec4 med5(vec4 a, vec4 b, vec4 c, vec4 d, vec4 e){  vec4 f = mx(mn(a, b), mn(c, d)); vec4 g = mn(mx(a, b), mx(c, d));  return mx(mn(f, g), mn(mx(f, g), e)) * 0. + mn(mx(mn(f, g), e), mx(f, g)); } void main(){ vec4 a = med5(texture2D(t, vu), texture2D(t, vu + vec2(px.x, 0.)), texture2D(t, vu - vec2(px.x, 0.)),  texture2D(t, vu + vec2(0., px.y)), texture2D(t, vu - vec2(0., px.y))); float n = vn(gl_FragCoord.xy / 4.) * .6 + vn(gl_FragCoord.xy / 1.7) * .4; float tb = max(a.b, 0.) * (0.7 + 0.6 * n); float g = 1. - exp(-max(a.r + tb, 0.)); float k = 1. - exp(-max(a.g, 0.)); float bl = 0.; for (int i = 0; i < 8; i++) { float an = float(i) * 0.785398; vec4 q = texture2D(t, vu + vec2(cos(an), sin(an)) * px * 4.);  bl += 1. - exp(-max(q.r + max(q.b, 0.), 0.)); } bl /= 8.; g = clamp(g + 0.9 * (g - bl), 0., 1.); vec3 c = vec3(g) * 0.92 + 0.03; c = mix(c, vec3(0.37, 0.78, 1.), clamp(k, 0., 1.) * 0.6); gl_FragColor = vec4(c, 1.); }",depthTest:!1,depthWrite:!1})),ct=new Rr;ct.add(Xe);let q=null;if(Ge&&ie==="name"){q=new Rr;let k=new qi({vertexShader:"attribute float jkw; varying float w; void main(){ w = jkw; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }",fragmentShader:"varying float w; void main(){ if (w < 0.05) discard; gl_FragColor = vec4(0.25, 0.8, 1., clamp(w, 0., 1.) * 0.55); }",transparent:!0,depthTest:!1,depthWrite:!1,side:Ti});I.forEach(z=>{let he=z.mesh.geometry;he.attributes.jkw||he.setAttribute("jkw",new wn(new Float32Array(he.attributes.position.count),1));let Z=new Mn(he,k);Z.matrixAutoUpdate=!1,Z.matrix.copy(z.mesh.matrixWorld),q.add(Z)})}vi={rs:ve,rt:ze,ss:ct,ps:q},K.radBuilt=Math.round(performance.now()-(K.t0||0))}jt.style.display=y?"none":"",_.style.display=y?"none":"",kn=!0}function Ud(){{let S=window.__jkaT||{};S.radFrame==null&&(S.radFrame=Math.round(performance.now()-(S.t0||0)))}let y=c.getDrawingBufferSize(new tt);(vi.rt.width!==y.x||vi.rt.height!==y.y)&&(vi.rt.setSize(y.x,y.y),vi.ss.children[0].material.uniforms.px.value.set(1/y.x,1/y.y)),vi.rs.children.forEach(S=>{if(S.userData.always){S.visible=!0;return}let E=S.userData.src;S.visible=E.layer==="bone"||zt(E)&&E.mesh.visible}),c.setRenderTarget(vi.rt),c.setClearColor(0,0),c.clear(),c.render(vi.rs,Me),c.setRenderTarget(null),c.clear(),c.render(vi.ss,Ru),vi.ps&&(vi.ps.children.forEach((S,E)=>{let N=I[E];N&&S.geometry!==N.mesh.geometry&&(S.geometry=N.mesh.geometry)}),c.render(vi.ps,Me))}let Au=new Rr,Ru=new Ar(-1,1,1,-1,0,1);Au.add(new Mn(new so(2,2),new qi({vertexShader:"varying vec2 vv; void main(){ vv = uv; gl_Position = vec4(position.xy, 0., 1.); }",fragmentShader:"varying vec2 vv; uniform float ft, fb; void main(){ float a = smoothstep(0., fb, vv.y) * smoothstep(0., ft, 1. - vv.y) * smoothstep(0., .06, vv.x) * smoothstep(0., .06, 1. - vv.x); gl_FragColor = vec4(0., 0., 0., a); }",uniforms:{ft:{value:GS},fb:{value:WS}},transparent:!0,depthTest:!1,depthWrite:!1,blending:Bl,blendEquation:Ds,blendSrc:Ol,blendDst:Ho,blendSrcAlpha:Ol,blendDstAlpha:Ho}))),c.autoClear=!1;let Ws=document.createElement("div");Ws.className="jka-views";let Xs="http://www.w3.org/2000/svg",Cu=112,as=Cu/2,bc=42,cs=document.createElementNS(Xs,"svg");cs.setAttribute("viewBox","0 0 "+Cu+" "+Cu),cs.setAttribute("class","jka-gizmo"),Ws.appendChild(cs);let Pu=V?1:-1,Fd=[["anterior","A",[0,0,1],"#7fd8ff"],["posterior","P",[0,0,-1],"#7fd8ff"],["superior","S",[0,1,0],"#ffd36b"],["inferior","I",[0,-1,0],"#ffd36b"],["lateral","L",[Pu,0,0],"#ff8f8f"],["medial","M",[-Pu,0,0],"#ff8f8f"]].map(([y,S,E,N])=>{let Y=document.createElementNS(Xs,"g");Y.setAttribute("class","jka-arm"),Y.dataset.k=y;let K=document.createElementNS(Xs,"line");K.setAttribute("stroke",N);let W=document.createElementNS(Xs,"circle");W.setAttribute("fill",N);let ve=document.createElementNS(Xs,"text");ve.textContent=S,ve.setAttribute("class","jka-gt"),ve.setAttribute("fill",N);let G=document.createElementNS(Xs,"circle");return G.setAttribute("r",11),G.setAttribute("class","jka-hit"),Y.append(K,W,ve,G),cs.appendChild(Y),{k:y,v:new T(...E),g:Y,ln:K,dot:W,tx:ve,hit:G}}),Iu=document.createElementNS(Xs,"g");Iu.setAttribute("class","jka-gcube");let ux=[[[1,0,0],[1,-1,-1],[1,1,-1],[1,1,1],[1,-1,1]],[[-1,0,0],[-1,-1,-1],[-1,-1,1],[-1,1,1],[-1,1,-1]],[[0,1,0],[-1,1,-1],[-1,1,1],[1,1,1],[1,1,-1]],[[0,-1,0],[-1,-1,-1],[1,-1,-1],[1,-1,1],[-1,-1,1]],[[0,0,1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]],[[0,0,-1],[-1,-1,-1],[-1,1,-1],[1,1,-1],[1,-1,-1]]].map(y=>{let S=document.createElementNS(Xs,"polygon");return Iu.appendChild(S),{n:new T(...y[0]),c:y.slice(1).map(E=>new T(...E)),pg:S}}),Mc=document.createElementNS(Xs,"polygon");Mc.setAttribute("class","jka-gsec");let hx=[[0,1],[2,3],[4,5],[6,7],[0,2],[1,3],[4,6],[5,7],[0,4],[1,5],[2,6],[3,7]],Bd=[];for(let y=0;y<8;y++)Bd.push(new T(y&1?1:-1,y&2?1:-1,y&4?1:-1));let Od=7,kd=new pi,fx=new pi().setFromEuler(new Yo(.38,-.5,0,"YXZ")),$S=new T(0,0,1).applyQuaternion(fx),Lu=new T(.42*Pu,.5,.76).normalize(),zd=new T().crossVectors(new T(0,1,0),Lu).normalize(),dx=new T().crossVectors(Lu,zd),px=y=>new T(y.dot(zd),y.dot(dx),y.dot(Lu)),Nu="",Vr="section";try{Vr=localStorage.getItem("jka-gizmo")==="axes"?"axes":"section"}catch{}let mo=document.createElement("button");mo.className="jka-gsw",mo.innerHTML='<svg viewBox="0 0 18 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4.20 7.51 A5.2 5.2 0 0 1 13.80 7.51"/><path d="M6.46 6.23 L4.20 7.51 L3.50 5.00"/><path d="M14.50 5.00 L13.80 7.51 L11.54 6.23"/></svg>';let Hd=()=>{mo.removeAttribute("title")};if(Hd(),mo.addEventListener("pointerdown",y=>y.stopPropagation()),mo.addEventListener("click",y=>{y.stopPropagation(),Vr=Vr==="axes"?"section":"axes",Hd(),Nu="";try{localStorage.setItem("jka-gizmo",Vr)}catch{}Wd()}),Ws.insertBefore(mo,Ws.firstChild),!(window.matchMedia&&(matchMedia("(hover: none)").matches||matchMedia("(max-width: 720px)").matches))){let y=o.querySelector(":scope > .jka-zoom");y&&(y.classList.add("jka-zoom-w"),Ws.appendChild(y))}let go=document.createElement("button");go.className="jka-gpl";let mx='<svg viewBox="0 0 12 12" width="11" height="11"><path d="M3 1.8v8.4l7-4.2z" fill="currentColor"/></svg>',gx='<svg viewBox="0 0 12 12" width="11" height="11"><path d="M2.6 1.8h2.4v8.4H2.6zM7 1.8h2.4v8.4H7z" fill="currentColor"/></svg>',Vd=null,Du=()=>{let y=!!Oe.autoRotate;if(y!==Vd){Vd=y,go.innerHTML=y?gx:mx;let S=o.querySelector(":scope > .jka-mplay");S&&(S.innerHTML=go.innerHTML)}};go.addEventListener("pointerdown",y=>y.stopPropagation());let Gd=()=>{clearTimeout(Gr),Oe.autoRotate?(Oe.autoRotate=!1,Ls=!0,Sa=!0):(Sa=!1,Ls=!1,qe=null,Oe.autoRotate=!0),Du()};go.addEventListener("click",y=>{y.stopPropagation(),Gd()}),Ws.insertBefore(go,Ws.firstChild);let Ec=document.createElement("button");Ec.className="jka-mplay",["touchstart","touchend","pointerdown"].forEach(y=>Ec.addEventListener(y,S=>S.stopPropagation(),{passive:!0})),Ec.addEventListener("click",y=>{y.stopPropagation(),y.preventDefault(),Gd()}),o.appendChild(Ec),Du();function Wd(){let y=Me.position.clone().sub(Oe.target).normalize(),S=y.x.toFixed(3)+y.y.toFixed(3)+y.z.toFixed(3)+Vr+(Vr==="axes"?Me.up.y.toFixed(3):"");if(S===Nu)return;Nu=S,kd.copy(Me.quaternion).invert();let E=Vr==="axes",N=E?B=>B.clone().applyQuaternion(kd):px;Fd.forEach(B=>{let $=N(B.v),ge=as+$.x*bc,Ie=as-$.y*bc;B.depth=$.z,B.ln.setAttribute("x1",as+$.x*14),B.ln.setAttribute("y1",as-$.y*14),B.ln.setAttribute("x2",as+$.x*(bc-8)),B.ln.setAttribute("y2",as-$.y*(bc-8)),B.dot.setAttribute("r",0),B.hit.setAttribute("cx",ge),B.hit.setAttribute("cy",Ie),B.tx.setAttribute("x",ge),B.tx.setAttribute("y",Ie+.5),B.g.style.opacity=(.45+.55*Math.max(0,B.v.dot(y))).toFixed(2)}),ux.forEach(B=>{let $=N(B.n).z;B.pg.style.display=$>.01?"":"none",B.pg.setAttribute("points",B.c.map(ge=>{let Ie=N(ge.clone().multiplyScalar(Od));return(as+Ie.x).toFixed(1)+","+(as-Ie.y).toFixed(1)}).join(" ")),B.pg.style.fillOpacity=(.1+.22*$).toFixed(2)});let Y=Math.abs(y.y)>.9?new T(0,0,1):new T(0,1,0),K=new T().crossVectors(Y,y).normalize(),W=new T().crossVectors(y,K),ve=15;if(E){let B=Bd.map(ze=>N(ze.clone().multiplyScalar(Od))),$=[];hx.forEach(([ze,Xe])=>{let ct=B[ze],q=B[Xe];if(ct.z>0!=q.z>0){let k=ct.z/(ct.z-q.z);$.push([ct.x+(q.x-ct.x)*k,ct.y+(q.y-ct.y)*k])}});let ge=$.reduce((ze,Xe)=>ze+Xe[0],0)/($.length||1),Ie=$.reduce((ze,Xe)=>ze+Xe[1],0)/($.length||1);$.sort((ze,Xe)=>Math.atan2(ze[1]-Ie,ze[0]-ge)-Math.atan2(Xe[1]-Ie,Xe[0]-ge)),Mc.setAttribute("points",$.map(ze=>(as+ze[0]).toFixed(1)+","+(as-ze[1]).toFixed(1)).join(" "))}else Mc.setAttribute("points",[[1,1],[1,-1],[-1,-1],[-1,1]].map(([B,$])=>{let ge=N(K.clone().multiplyScalar(B*ve).addScaledVector(W,$*ve));return(as+ge.x).toFixed(1)+","+(as-ge.y).toFixed(1)}).join(" "));let G=Fd.slice().sort((B,$)=>B.depth-$.depth);G.filter(B=>B.depth<0).forEach(B=>cs.appendChild(B.g)),cs.appendChild(Iu),cs.appendChild(Mc),G.filter(B=>B.depth>=0).forEach(B=>cs.appendChild(B.g))}let Is=null;cs.addEventListener("pointerdown",y=>{y.stopPropagation(),y.preventDefault(),Wr(),Is={x:y.clientX,y:y.clientY,moved:!1,k:y.target.closest(".jka-arm")&&y.target.closest(".jka-arm").dataset.k},cs.setPointerCapture(y.pointerId)});let QS=new Fl;cs.addEventListener("pointermove",y=>{if(!Is)return;let S=y.clientX-Is.x,E=y.clientY-Is.y;!Is.moved&&Math.hypot(S,E)<3||(Is.moved=!0,Is.x=y.clientX,Is.y=y.clientY,qe=null,Oe.rotate(S*.018,E*.018),xo(),ne||Gt())}),cs.addEventListener("pointerup",y=>{let S=Is;if(Is=null,!S||S.moved||!S.k)return;let E=Me.position.distanceTo(Oe.target);qe={p0:Me.position.clone(),t0:Oe.target.clone(),p1:Oe.target.clone().addScaledVector(nx(S.k,V),E),t1:Oe.target.clone(),s:0}}),o.appendChild(Ws);let Uu=document.createElement("div");Uu.className="jka-sect",Ws.appendChild(Uu),o.appendChild(Ma),setTimeout(Rs,0),setTimeout(Rs,300),setTimeout(Rs,650),setTimeout(Rs,1200);let Xd="";function xx(){let y=Me.position.clone().sub(Oe.target).normalize(),S=new T(y.x*(V?1:-1),y.y,y.z),E=S.x.toFixed(2)+S.y.toFixed(2)+S.z.toFixed(2);if(E===Xd)return;Xd=E;let N=Math.abs(S.x),Y=Math.abs(S.y),K=Math.abs(S.z),W=ge=>Math.round(ge*180/Math.PI),ve,G,B;K>=N&&K>=Y?(ve="Coronal",G=[W(Math.atan2(S.x,K)),S.x>=0?"L":"M"],B=[W(Math.asin(S.y)),S.y>=0?"S":"I"]):N>=Y?(ve="Sagittal",G=[W(Math.atan2(S.z,N)),S.z>=0?"A":"P"],B=[W(Math.asin(S.y)),S.y>=0?"S":"I"]):(ve="Transverse",G=[W(Math.atan2(S.z,Y)),S.z>=0?"A":"P"],B=[W(Math.atan2(S.x,Y)),S.x>=0?"L":"M"]);let $=[G,B].filter(ge=>Math.abs(ge[0])>=5).map(ge=>Math.abs(ge[0])+"\xB0 "+ge[1]);Uu.innerHTML="<b>"+ve+"</b>"+($.length?"<span>"+$.join(" \xB7 ")+"</span>":"")}window.__jkaView={cam:Me,ctl:Oe,parts:F,target:I,d:lr,center:$n,renderer:c};let Fu=!1,Bu=0,kn=!0,qd=0,Sc=!1,Yd=0,fr=!0;function xo(){kn=!0,fr=!0,Sc||(Sc=!0,c.setPixelRatio(g),Gs()),clearTimeout(Yd),Yd=setTimeout(()=>{Sc=!1,c.setPixelRatio(d),Gs(),kn=!0},180)}Oe.autoRotateSpeed=1.2;let Ls=!1,Gr=0,Sa=!1,Tc=()=>{ci||(Oe.autoRotate=!0)};function Wr(){Ls=!0,Oe.autoRotate=!1,clearTimeout(Gr),Gr=setTimeout(()=>{Ls=!1,Sa||Tc()},9e3)}["pointerdown","wheel"].forEach(y=>c.domElement.addEventListener(y,Wr,!0)),c.domElement.addEventListener("pointerup",()=>{setTimeout(()=>{Ls=!1},0)},!0),setTimeout(Tc,ne?700:400),Oe.addEventListener("change",()=>{Ls||qe?xo():(kn=!0,fr=!0),ne||Gt()}),ne||Gt(),new ResizeObserver(()=>{Gs(),kn=!0;try{if(m)return;ci&&vi?Ud():(c.clear(),c.render(w,Me),c.render(Au,Ru))}catch{}}).observe(o),$e.push(...Ze),yt?mt(ne?1:0):Hr();let ji=new Set,wc=!1,jd=y=>{if(!(!/^Arrow(Left|Right|Up|Down)$/.test(y.key)||y.metaKey||y.ctrlKey||y.altKey)){if(m||!s.isConnected){document.removeEventListener("keydown",jd,!0),document.removeEventListener("keyup",Zd,!0);return}y.preventDefault(),y.stopPropagation(),wc=y.shiftKey,ji.has(y.key)||(ji.add(y.key),Wr())}},Zd=y=>{ji.delete(y.key),y.key==="Shift"&&(wc=!1)};p.in_key=(y,S)=>{wc=!1,S?ji.has(y)||(ji.add(y),Wr()):ji.delete(y)},p.in_zoom=y=>Dd(y>0?.75:1/.75),document.addEventListener("keydown",jd,!0),document.addEventListener("keyup",Zd,!0),window.addEventListener("blur",()=>ji.clear()),function y(S){if(m||!s.isConnected){m||p.stop();return}if(requestAnimationFrame(y),qe){qe.s||(qe.s=S);let N=Math.min(1,(S-qe.s)/500),Y=1-Math.pow(1-N,3);Me.position.lerpVectors(qe.p0,qe.p1,Y),Oe.target.lerpVectors(qe.t0,qe.t1,Y),qe.u0||(qe.u0=Me.up.clone(),qe.u1=qe.u1||tx(qe.p1.clone().sub(qe.t1).normalize())),Me.up.lerpVectors(qe.u0,qe.u1,Y).normalize(),qe.q0&&(fn.lerpVectors(qe.q0,qe.q1,Y),ke()),kn=!0,N>=1&&(qe=null)}let E=Bu?Math.min(.05,(S-Bu)/1e3):0;if(Bu=S,Ci){let N=(ji.has("ArrowUp")?1:0)-(ji.has("ArrowDown")?1:0);if(N&&Ci.key(N*.06*E),!Ci.mini)return;Oe.update(E),kn&&(kn=!1,c.clear(),c.render(w,Me));return}if(ji.size&&!qe){let N=1.7*E,Y=(ji.has("ArrowRight")?1:0)-(ji.has("ArrowLeft")?1:0),K=(ji.has("ArrowDown")?1:0)-(ji.has("ArrowUp")?1:0);(Y||K)&&wc?(Ls=!0,fn.x+=Y*420*E,fn.y+=K*420*E,ke(),xo(),ne||Gt(),clearTimeout(Gr),Gr=setTimeout(()=>{Ls=!1,Sa||Tc()},9e3)):(Y||K)&&(Ls=!0,Oe.rotate(Y*N,K*N),clearTimeout(Gr),Gr=setTimeout(()=>{Ls=!1,Sa||Tc()},9e3))}if(qe?Me.lookAt(Oe.target):Oe.update(E),!(Vs&&!ci)){if(!kn&&S>1500){(Fu||_a)&&(Fu=Pd(S));return}kn=!1,C.position.copy(Me.position).add(new T(.3,.5,.2)),!Sc&&fr&&S-qd>(Oe.autoRotate?200:60)&&(qd=S,fr=!1,Fn(),rx()),ci&&vi?Ud():(c.clear(),c.render(w,Me),c.render(Au,Ru)),o.classList.contains("jka-shown")||requestAnimationFrame(()=>o.classList.add("jka-shown")),Wd(),xx(),Du(),Fu=Pd(S)}}(0),setTimeout(()=>{Fn(),kn=!0},50)}return p}window.JKANAT={v:67,mount:ZS,input:(s,e,t)=>{let n=xc&&xc["in_"+s];return n&&n(e,t),!!n}};(window.__jkaQ||[]).splice(0).forEach(s=>s())});KS();})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2023 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
