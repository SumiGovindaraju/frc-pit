if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let a=Promise.resolve();return i[e]||(a=new Promise(async a=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=a}else importScripts(e),a()})),a.then(()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]})},a=(a,i)=>{Promise.all(a.map(e)).then(e=>i(1===e.length?e[0]:e))},i={require:Promise.resolve(a)};self.define=(a,s,c)=>{i[a]||(i[a]=Promise.resolve().then(()=>{let i={};const r={uri:location.origin+a.slice(1)};return Promise.all(s.map(a=>{switch(a){case"exports":return i;case"module":return r;default:return e(a)}})).then(e=>{const a=c(...e);return i.default||(i.default=a),i})}))}}define("./service-worker.js",["./workbox-69b5a3b7"],(function(e){"use strict";self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.precacheAndRoute([{url:"asset-manifest.json",revision:"7928319dd826d535ccdcb975f68850cd"},{url:"index.html",revision:"d348131a0bc4fcae808e97bc4a05749e"},{url:"js/bootstrap.bundle.min.js",revision:"a454220fc07088bf1fdd19313b6bfd50"},{url:"js/jquery-3.4.0.min.js",revision:"bbcf3bf05fa6cb58a67cfd0498f00d23"},{url:"js/script.js",revision:"c9c92bcf91e7162117202c848c7878d7"},{url:"manifest.json",revision:"742284ad611c3d8c27143185d1bf12bd"},{url:"precache-manifest.305aa996a594c82af0cab223df8f50b6.js",revision:"305aa996a594c82af0cab223df8f50b6"},{url:"robots.txt",revision:"65cede53be50f1244ac01e7c366a25c8"},{url:"static/css/main.edf13c8b.chunk.css",revision:"f3dbdb303787a19016457c78e7062735"},{url:"static/js/2.bb37b33d.chunk.js",revision:"3e94ecafc868d9c01f803ccfb8327bea"},{url:"static/js/2.bb37b33d.chunk.js.LICENSE.txt",revision:"13e309cf1ce8e5cec533245287f5d802"},{url:"static/js/main.d2095fcc.chunk.js",revision:"11c10410b6dd8caf3779a0bc1362f48e"},{url:"static/js/runtime-main.9c67fec8.js",revision:"a1368d9b566a7b476a76e2b0373d68b7"},{url:"static/media/fa-brands-400.2248542e.woff",revision:"2248542e1bbbd548a157e3e6ced054fc"},{url:"static/media/fa-brands-400.3654744d.woff2",revision:"3654744dc6d6c37c9b3582b57622df5e"},{url:"static/media/fa-brands-400.748ab466.eot",revision:"748ab466bee11e0b2132916def799916"},{url:"static/media/fa-brands-400.7febe26e.ttf",revision:"7febe26eeb4dd8e3a3c614a144d399fb"},{url:"static/media/fa-brands-400.b032e14e.svg",revision:"b032e14eac87e3001396ff597e4ec15f"},{url:"static/media/fa-regular-400.33f727cc.woff2",revision:"33f727ccde4b05c0ed143c5cd78cda0c"},{url:"static/media/fa-regular-400.3929b3ef.svg",revision:"3929b3ef871fa90bbb4e77e005851e74"},{url:"static/media/fa-regular-400.54f142e0.ttf",revision:"54f142e03adc6da499c2af4f54ab76fd"},{url:"static/media/fa-regular-400.b58f468f.eot",revision:"b58f468f84168d61e0ebc1e1f423587c"},{url:"static/media/fa-regular-400.f3dd4f39.woff",revision:"f3dd4f397fbc5aaf831b6b0ba112d75c"},{url:"static/media/fa-solid-900.035a137a.eot",revision:"035a137af03db6f1af76a589da5bb865"},{url:"static/media/fa-solid-900.6661d6b3.woff",revision:"6661d6b3521b4c480ba759e4b9e480c1"},{url:"static/media/fa-solid-900.8a8c0474.woff2",revision:"8a8c0474283e0d9ef41743e5e486bf05"},{url:"static/media/fa-solid-900.9bbbee00.svg",revision:"9bbbee00f65769a64927764ef51af6d0"},{url:"static/media/fa-solid-900.b6a14bb8.ttf",revision:"b6a14bb88dbc580e45034af297c8f605"}],{})}));
//# sourceMappingURL=service-worker.js.map
