!function(){let e;const t=function(e,t){values=e.values;let[o,...l]=e.values;if(void 0!==document[`on${o}`]){const t=e.origin;n(e,t,o,l)}else console.warn("Unknown action",o)},n=function(e,t,n,l){t.addEventListener(n,(e=>o(e,n,l)))},o=function(e,t,n){let[o,...l]=n;console.log(e,t,n),console.log(o,l);let s={call(){},toggle(){console.log(l,n,t),e.currentTarget.classList.toggle(l.join("-"))}}[o];s&&s()};console.log("mouse-event receiver"),ClassGraph.addons.varTranslateReceiver=function(n){e=n,e.insertReceiver(["event"],t)}}(),function(){let e;const t=function(e){values=e.values;let t=r(values),o=l(values,t);c(o).forEach((e=>document.head.appendChild(e))),n(t)},n=function(t){for(let n of Object.values(t)){let t=n.first,l=(e,t)=>t?" ":"",r=o(t.replace(/[+]/g,l));console.log("Installing Font",r),n.cleanName=r,n.definition=s(n),e.dcss.addStylesheetRules(n.definition).renderAll()}},o=function(e){return e.replace(/(^|[\s+])\S/g,(function(e){return e.toUpperCase()}))};window.toTitleCase=o;const l=function(e,t){t=t||r(e);return Object.values(t).flatMap((e=>function(e){return`family=${e.str}`}(e))).join("&")},s=function(t){let n={};for(let o of Object.values(t.tokens)){let l={"font-weight":o.int,"font-family":`'${t.cleanName}', sans-serif`},s=["font",t.first];for(let t of o.keys){let o=Object.assign({},l);t.isItal&&(o["font-style"]="italic");let r=s.concat([t.token]);n[`${e.asSelectorString(r)}, ${e.asSelectorString(r).toLowerCase()}`]=o}}return n[e.asSelectorString(["font",t.first])]={"font-family":`'${t.cleanName}', sans-serif`},n},r=function(e){let t,n=0,o={},l=/([a-zA-Z-]{0,}?)(\d+)/;for(let s in e){let r=e[s];if(0==n){o[n]={first:r,tokens:{}},t=n,n++;continue}let[i,a]=[null,null];try{let e;[e,i,a]=r.match(l),0==i.length&&(i="r")}catch{o[n]={first:r,tokens:{}},t=n,n++;continue}let c={null:function(){return{regu:1,wasNull:1}},i:function(){return{ital:1}},r:function(){return{regu:1}}},u={int:Number(a)};if(0==u.int){console.warn("Skipping zero weighted item"),n++;continue}for(let e in i){let t=c[i[e]];Object.assign(u,t())}let f=o[t]?.tokens[a]||{};Object.assign(f,u),null==f.keys&&(f.keys=new Set),f.keys.add({isItal:u.ital,token:r}),o[t].tokens[a]=f,n++}return i(o)},i=function(e){for(let t in e){let n=e[t];0!=n.first.length&&a(n)}return e},a=function(e){let t=o(e.first),n=Object.assign({},...Object.values(e.tokens)),l=null!=n.ital,s=[];l&&s.push("ital"),(l||n.regu)&&s.push("wght");let r=new Set;for(let t in e.tokens){let n=e.tokens[t],o=n.ital?1:0,s=n.int,i=l?[o]:[];i.push(s);let a=i.join(",");if(r.add(a),null!=n.regu){let e=l?[0]:[];e.push(s);let t=e.join(",");r.add(t)}}let i=Array.from(r).sort(),a=i.join(";"),c=`${t}:${s.join(",")}@${a}`;Object.assign(e,{weights:i,formatStringParts:s,titleToken:t,str:c})},c=function(e){return[f("link","preconnect",{href:"https://fonts.googleapis.com"}),f("link","preconnect",{href:"https://fonts.gstatic.com",crossorigin:""}),f("link","stylesheet",{href:`https://fonts.googleapis.com/css2?${e}&display=swap`})]};let u={};const f=function(e,t,n){let o={rel:t,href:e};Object.assign(o,n||{});let l=JSON.stringify,s=u[l(o)];return s||(u[l(o)]=g("link",o))},g=function(e,t){if(null==t&&"string"!=typeof e&&null==(e=(t=e).localName))throw Error("createNode requires a localName within a object definition");let n=document.createElement(e);for(let e in t)n.setAttribute(e,t[e]);return n};return DynamicCSSStyleSheet.addons.fontPackReceiver=function(n){e=n,e.insertReceiver(["font","pack"],t)},t}()((()=>{let e;const t=function(e){console.log("monitorClasses",e);let t=function(e){"class"==e.attributeName&&n(e)},o=new MutationObserver((function(e){e.forEach(t)}));return o.observe(e,{attributes:!0,subtree:!0,attributeFilter:["class"],attributeOldValue:!0}),o},n=function(t){let n=t.target.classList.value,l=t.oldValue,s=n.split(" "),r=l.split(" ").map((e=>e.trim())),i=r?o(s,r):s;console.log("new",i),e.captureNew(i,void 0,t.target)},o=function(e,t){const n=new Set(e);for(const e of t)n.delete(e);return n};ClassGraph.addons.monitorClasses=function(t){e=t},ClassGraph.prototype.monitor=function(e=document.body){return t(e)}}))(),function(){let e,t;const n=function(n,o=":root"){if(console.log("Hook",n),null==t){let l={};for(let e in n){let t=`--${e}`,o=n[e];l[t]=o}let s=e.dcss.addStylesheetRules({[o]:l});s.renderAll(),t=s[0],e.varsRoot=t}else for(let e in n){let o=`--${e}`,l=n[e];t.sheetRule.style.setProperty(o,l)}};ClassGraph.addons.varsReceiver=function(o){e=o,e.vars=n.bind(e),e.varsRoot=t}}(),function(){let e;const t=function(e,t,n,o){let l=t.slice(o).slice(1),s=`var(--${l.join("-")})`;return n.push(s),[[],n,o+l.length]};console.log("var-translate insertReceiver"),ClassGraph.addons.varTranslateReceiver=function(n){e=n,e.insertTranslator("var",t)}}();