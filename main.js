var e,t={216:(e,t)=>{if("function"!=typeof EventSource)throw new Error("Environment doesn't support lazy compilation (requires EventSource)");var o,r=decodeURIComponent("?http%3A%2F%2Flocalhost%3A49870%2Flazy-compilation-using-".slice(1)),n=new Map,i=new Set,a=function(){o&&o.close(),n.size?(o=new EventSource(r+Array.from(n.keys()).join("@"))).onerror=function(e){i.forEach((function(t){t(new Error("Problem communicating active modules to the server: "+e.message+" "+e.filename+":"+e.lineno+":"+e.colno+" "+e.error))}))}:o=void 0};t.keepAlive=function(e){var t=e.data,o=e.onError,r=e.active,l=e.module;i.add(o);var s=n.get(t)||0;return n.set(t,s+1),0===s&&a(),r||l.hot||console.log("Hot Module Replacement is not enabled. Waiting for process restart..."),function(){i.delete(o),setTimeout((function(){var e=n.get(t);1===e?(n.delete(t),a()):n.set(t,e-1)}),1e3)}}},142:(e,t,o)=>{var r=o(216);e.exports=Promise.all([o.e(378),o.e(496)]).then(o.bind(o,472)),e.hot&&(e.hot.accept(),e.hot.accept(472,(function(){e.hot.invalidate()})),e.hot.dispose((function(e){delete e.resolveSelf,n(e)})),e.hot.data&&e.hot.data.resolveSelf&&e.hot.data.resolveSelf(e.exports));var n=r.keepAlive({data:"C:/Users/toan9/OneDrive/Desktop/LearnCS/TheOdinProject/TodoList/src/index.js",active:!0,module:e,onError:function(){}})}},o={};function r(e){var n=o[e];if(void 0!==n)return n.exports;var i=o[e]={id:e,exports:{}};return t[e].call(i.exports,i,i.exports,r),i.exports}r.m=t,r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce(((t,o)=>(r.f[o](e,t),t)),[])),r.u=e=>e+".main.js",r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e={},r.l=(t,o,n,i)=>{if(e[t])e[t].push(o);else{var a,l;if(void 0!==n)for(var s=document.getElementsByTagName("script"),u=0;u<s.length;u++){var c=s[u];if(c.getAttribute("src")==t||c.getAttribute("data-webpack")=="todolist:"+n){a=c;break}}a||(l=!0,(a=document.createElement("script")).type="module",a.charset="utf-8",a.timeout=120,r.nc&&a.setAttribute("nonce",r.nc),a.setAttribute("data-webpack","todolist:"+n),a.src=t),e[t]=[o];var d=(o,r)=>{a.onerror=a.onload=null,clearTimeout(p);var n=e[t];if(delete e[t],a.parentNode&&a.parentNode.removeChild(a),n&&n.forEach((e=>e(r))),o)return o(r)},p=setTimeout(d.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=d.bind(null,a.onerror),a.onload=d.bind(null,a.onload),l&&document.head.appendChild(a)}},r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;if("string"==typeof import.meta.url&&(e=import.meta.url),!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),r.p=e})(),(()=>{var e={179:0};r.f.j=(t,o)=>{var n=r.o(e,t)?e[t]:void 0;if(0!==n)if(n)o.push(n[2]);else{var i=new Promise(((o,r)=>n=e[t]=[o,r]));o.push(n[2]=i);var a=r.p+r.u(t),l=new Error;r.l(a,(o=>{if(r.o(e,t)&&(0!==(n=e[t])&&(e[t]=void 0),n)){var i=o&&("load"===o.type?"missing":o.type),a=o&&o.target&&o.target.src;l.message="Loading chunk "+t+" failed.\n("+i+": "+a+")",l.name="ChunkLoadError",l.type=i,l.request=a,n[1](l)}}),"chunk-"+t,t)}};var t=(t,o)=>{var n,i,[a,l,s]=o,u=0;for(n in l)r.o(l,n)&&(r.m[n]=l[n]);for(s&&s(r),t&&t(o);u<a.length;u++)i=a[u],r.o(e,i)&&e[i]&&e[i][0](),e[a[u]]=0},o=self.webpackChunktodolist=self.webpackChunktodolist||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})(),r(142);