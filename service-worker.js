if(!self.define){const i=i=>{"require"!==i&&(i+=".js");let e=Promise.resolve();return s[i]||(e=new Promise((async e=>{if("document"in self){const s=document.createElement("script");s.src=i,document.head.appendChild(s),s.onload=e}else importScripts(i),e()}))),e.then((()=>{if(!s[i])throw new Error(`Module ${i} didn’t register its module`);return s[i]}))},e=(e,s)=>{Promise.all(e.map(i)).then((i=>s(1===i.length?i[0]:i)))},s={require:Promise.resolve(e)};self.define=(e,t,o)=>{s[e]||(s[e]=Promise.resolve().then((()=>{let s={};const r={uri:location.origin+e.slice(1)};return Promise.all(t.map((e=>{switch(e){case"exports":return s;case"module":return r;default:return i(e)}}))).then((i=>{const e=o(...i);return s.default||(s.default=e),s}))})))}}define("./service-worker.js",["./workbox-0d6c8d95"],(function(i){"use strict";self.skipWaiting(),i.clientsClaim(),i.precacheAndRoute([{url:"https://shishiv30.github.io/jquery-cui/./index.html",revision:"8c7efd541ecfb92b394313ad8bd8e7ae"},{url:"https://shishiv30.github.io/jquery-cui/cui.js",revision:"3e0cc2dcec300de45b481aea09952e0d"},{url:"https://shishiv30.github.io/jquery-cui/cui.js.LICENSE.txt",revision:"ed89ee06b517c0e35cd0d5efd8d7a903"},{url:"https://shishiv30.github.io/jquery-cui/cui.min.css",revision:"a11333f6540345ed584e8876d9925134"},{url:"https://shishiv30.github.io/jquery-cui/favicon.ico",revision:"5b98a7c9d81ba110a84c1eb1db6d95fc"},{url:"https://shishiv30.github.io/jquery-cui/font.Roboto-Regular.woff2",revision:"ece6673e477b4d7aca12f04dace5ed60"},{url:"https://shishiv30.github.io/jquery-cui/font.Roboto-light.woff2",revision:"c0cc9c92fb877993ea6d421c31d33e09"},{url:"https://shishiv30.github.io/jquery-cui/font.Roboto-thin.woff2",revision:"9a8a1f8c8f9860224f449c21a3bd76d4"},{url:"https://shishiv30.github.io/jquery-cui/font.fonticon.ttf",revision:"a01e22e7da17e7d3c8421ed3d2848515"},{url:"https://shishiv30.github.io/jquery-cui/font.fonticon.woff",revision:"5f094e019313c37ee6c98dce1c12aa33"},{url:"https://shishiv30.github.io/jquery-cui/img.download-1.jpg",revision:"99e2f0ce178499bf0730bd8e78eea5fa"},{url:"https://shishiv30.github.io/jquery-cui/img.download-2.jpg",revision:"9cc138818f84948163325acd724fa4bf"},{url:"https://shishiv30.github.io/jquery-cui/img.download-3.jpg",revision:"be4610f4c710de45dfd144cd90ca73f4"},{url:"https://shishiv30.github.io/jquery-cui/img.fonticon.svg",revision:"bbfedd0f78cd77c67d47240195d249f6"},{url:"https://shishiv30.github.io/jquery-cui/img.noimg.jpg",revision:"5b9874a3128779da0844dc50e3fb06ea"},{url:"https://shishiv30.github.io/jquery-cui/img.typograph.png",revision:"04abc188508827424fdfb2f12a3ab65e"}],{})}));
