!function(){let t;const e=function(t,e){values=t.values;let[o,...l]=t.values;if(void 0!==document[`on${o}`]){const e=t.origin;n(t,e,o,l)}else console.warn("Unknown action",o)},n=function(t,e,n,l){let s=t=>o(t,n,l),i=`polyaction_${n}`;void 0===e.dataset[i]?(e.addEventListener(n,s),e.dataset[i]=!0):console.log("Event already exists:",n)},o=function(t,e,n){let[o,...l]=n;console.log(t,e,n),console.log(o,l);let s={call(){},toggle(){console.log(l,n,e),t.currentTarget.classList.toggle(l.join("-"))},setvar(){}}[o];s&&s()};console.log("event receiver"),ClassGraph.addons.eventsReceiver=function(n){t=n,t.insertReceiver(["event"],e)}}(),function(){let t;const e=function(t){const e=t.values,o=t.origin;let s=i(e,o,t),r=l(e,s,o);c(r).forEach((t=>document.head.appendChild(t))),n(s)},n=function(e,n){for(let n of Object.values(e)){let e=n.first,l=(t,e)=>e?" ":"",i=o(e.replace(/[+]/g,l));console.log("Installing Font",i),n.cleanName=i,n.definition=s(n),t.dcss.addStylesheetRules(n.definition).renderAll()}},o=function(t){return t.replace(/(^|[\s+])\S/g,(function(t){return t.toUpperCase()}))},l=function(t,e,n){e=e||i(t,n);return Object.values(e).flatMap((t=>function(t){return`family=${t.str}`}(t))).join("&")},s=function(e){let n={};const o=t.asSelectorString.bind(t);for(let t of Object.values(e.tokens)){let l={"font-weight":t.int,"font-family":`'${e.cleanName}', ${e.defaultFonts}`},s=["font",e.first];for(let e of t.keys){let t=Object.assign({},l);e.isItal&&(t["font-style"]="italic");let i=s.concat([e.token]);n[`${o(i)}, ${o(i).toLowerCase()}`]=t}}let l=o(["font",e.first]),s=o(["font"].concat(e.first.split("+"))),i=new Set([l,s,l.toLowerCase(),s.toLowerCase()]);return n[Array.from(i).join(", ")]={"font-family":`'${e.cleanName}', ${e.defaultFonts}`},n},i=function(e,n,o){let l,s=0,i={},a=/([a-zA-Z-]{0,}?)(\d+)/,c=function(e,n){let o=t.filterSplit(n,e,!0);return console.log("getSiblingMutators",o),o}(["default"],o?.origin||n),u="sans-serif",f=c.default;if(f)if(f.index<=o.index){let t="font default-* modifier should be indexed after font";console["warn"](t),u=f.values.join(" ")}else u=f.values.join(" ");for(let t in e){let n=e[t];if(0==s){i[s]={first:n,tokens:{},defaultFonts:u},l=s,s++;continue}let[o,r]=[null,null];try{let t;[t,o,r]=n.match(a),0==o.length&&(o="r")}catch{i[s]={first:n,tokens:{}},l=s,s++;continue}let c={null:function(){return{regu:1,wasNull:1}},i:function(){return{ital:1}},r:function(){return{regu:1}}},f={int:Number(r)};if(0==f.int){console.warn("Skipping zero weighted item"),s++;continue}for(let t in o){let e=c[o[t]];Object.assign(f,e())}let d=i[l]?.tokens[r]||{};Object.assign(d,f),null==d.keys&&(d.keys=new Set),d.keys.add({isItal:f.ital,token:n}),i[l].tokens[r]=d,s++}return r(i)},r=function(t){for(let e in t){let n=t[e];0!=n.first.length&&a(n)}return t},a=function(t){let e=o(t.first),n=function(t){return 0==Object.values(t.tokens).length&&(t.tokens[400]={int:400,regu:1,keys:new Set([{isItal:void 0,token:"400"}])}),Object.values(t.tokens)}(t),l=Object.assign({},...n),s=null!=l.ital,i=[],r=new Set;s&&i.push("ital"),(s||l.regu)&&i.push("wght");for(let e in t.tokens){let n=t.tokens[e],o=n.ital?1:0,l=n.int,i=s?[o]:[];i.push(l);let a=i.join(",");if(r.add(a),null!=n.regu){let t=s?[0]:[];t.push(l);let e=t.join(",");r.add(e)}}let a=Array.from(r).sort(),c=a.join(";"),u=`${e}:${i.join(",")}@${c}`;Object.assign(t,{weights:a,formatStringParts:i,titleToken:e,str:u})},c=function(t){return[f("link","preconnect",{href:"https://fonts.googleapis.com"}),f("link","preconnect",{href:"https://fonts.gstatic.com",crossorigin:""}),f("link","stylesheet",{href:`https://fonts.googleapis.com/css2?${t}&display=swap`})]};let u={};const f=function(t,e,n){let o={rel:e,href:t};Object.assign(o,n||{});let l=JSON.stringify,s=u[l(o)];return s||(u[l(o)]=d("link",o))},d=function(t,e){if(null==e&&"string"!=typeof t&&null==(t=(e=t).localName))throw Error("createNode requires a localName within a object definition");let n=document.createElement(t);for(let t in e)n.setAttribute(t,e[t]);return n};DynamicCSSStyleSheet.addons.fontPackReceiver=function(n){t=n,t.insertReceiver(["font","pack"],e)}}(),(()=>{let t;const e=function(t){console.log("monitorClasses",t);let e=function(t){"class"==t.attributeName&&n(t)},o=new MutationObserver((function(t){t.forEach(e)}));return o.observe(t,{attributes:!0,subtree:!0,attributeFilter:["class"],attributeOldValue:!0}),o},n=function(e){let n=e.target.classList.value,l=e.oldValue,s=n.split(/(?!\(.*)\s(?![^(]*?\))/g),i=null==l?[]:l.split(" ").map((t=>t.trim())),r=i?o(s,i):s;console.log("new",r),t.captureChanges(r,i,e.target)},o=function(t,e){const n=new Set(t);for(const t of e)n.delete(t);return n};ClassGraph.addons.monitorClasses=function(e){t=e},ClassGraph.prototype.monitor=function(t=document.body){return e(t)}})(),function(){let t,e;const n=function(n,o=":root"){if(console.log("Hook",n),null==e){let l={};for(let t in n){let e=`--${t}`,o=n[t];l[e]=o}let s=t.dcss.addStylesheetRules({[o]:l});s.renderAll(),e=s[0],t.varsRoot=e}else for(let t in n){let o=`--${t}`,l=n[t];e.sheetRule.style.setProperty(o,l)}};ClassGraph.addons.varsReceiver=function(o){t=o,t.vars=n.bind(t),t.varsRoot=e}}(),function(){let t;const e=function(t,e,n,o){let l=e.slice(o).slice(1),s=`var(--${l.join("-")})`;return n.push(s),[[],n,o+l.length]};console.log("var-translate insertReceiver"),ClassGraph.addons.varTranslateReceiver=function(n){t=n,t.insertTranslator("var",e)}}();
