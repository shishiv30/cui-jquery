if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let i=Promise.resolve();return c[e]||(i=new Promise((async i=>{if("document"in self){const c=document.createElement("script");c.src=e,document.head.appendChild(c),c.onload=i}else importScripts(e),i()}))),i.then((()=>{if(!c[e])throw new Error(`Module ${e} didn’t register its module`);return c[e]}))},i=(i,c)=>{Promise.all(i.map(e)).then((e=>c(1===e.length?e[0]:e)))},c={require:Promise.resolve(i)};self.define=(i,t,s)=>{c[i]||(c[i]=Promise.resolve().then((()=>{let c={};const r={uri:location.origin+i.slice(1)};return Promise.all(t.map((i=>{switch(i){case"exports":return c;case"module":return r;default:return e(i)}}))).then((e=>{const i=s(...e);return c.default||(c.default=i),c}))})))}}define("./service-worker.js",["./workbox-0d6c8d95"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"https://github.com/shishiv30/jquery-cui/./index.html",revision:"1b2dd767dba495c2075a6c8fd68aeaff"},{url:"https://github.com/shishiv30/jquery-cui/cui.js",revision:"3e0cc2dcec300de45b481aea09952e0d"},{url:"https://github.com/shishiv30/jquery-cui/cui.js.LICENSE.txt",revision:"ed89ee06b517c0e35cd0d5efd8d7a903"},{url:"https://github.com/shishiv30/jquery-cui/cui.min.css",revision:"50c241accd062566c484a39e3c809dfe"},{url:"https://github.com/shishiv30/jquery-cui/favicon.ico",revision:"5b98a7c9d81ba110a84c1eb1db6d95fc"},{url:"https://github.com/shishiv30/jquery-cui/font.Roboto-Regular.woff2",revision:"ece6673e477b4d7aca12f04dace5ed60"},{url:"https://github.com/shishiv30/jquery-cui/font.Roboto-light.woff2",revision:"c0cc9c92fb877993ea6d421c31d33e09"},{url:"https://github.com/shishiv30/jquery-cui/font.Roboto-thin.woff2",revision:"9a8a1f8c8f9860224f449c21a3bd76d4"},{url:"https://github.com/shishiv30/jquery-cui/font.fonticon.ttf",revision:"a01e22e7da17e7d3c8421ed3d2848515"},{url:"https://github.com/shishiv30/jquery-cui/font.fonticon.woff",revision:"5f094e019313c37ee6c98dce1c12aa33"}],{})}));
