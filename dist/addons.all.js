!function(){let e;const t=function(e,t){values=e.values;let[r,...o]=e.values;if(void 0!==document[`on${r}`]){const t=e.origin;n(e,t,r,o)}else console.warn("Unknown action",r)},n=function(e,t,n,o){let l=e=>r(e,n,o),s=`polyaction_${n}`;void 0===t.dataset[s]?(t.addEventListener(n,l),t.dataset[s]=!0):console.log("Event already exists:",n)},r=function(e,t,n){let[r,...o]=n;console.log(e,t,n),console.log(r,o);let l={call(){},toggle(){console.log(o,n,t),e.currentTarget.classList.toggle(o.join("-"))},setvar(){}}[r];l&&l()};console.log("event receiver"),ClassGraph.addons.eventsReceiver=function(n){e=n,e.insertReceiver(["event"],t)}}(),function(){let e;const t=function(e){const t=e.values,o=e.origin;let s=i(t,o,e),a=l(t,s,o);n(a),r(s)},n=function(e,t){return u(e,t).forEach((e=>document.head.appendChild(e)))},r=function(t,n){for(let n of Object.values(t)){let t=n.first,r=(e,t)=>t?" ":"",l=o(t.replace(/[+]/g,r));n.cleanName=l,n.definition=s(n),e.dcss.addStylesheetRules(n.definition).renderAll()}},o=function(e){return e.replace(/(^|[\s+])\S/g,(function(e){return e.toUpperCase()}))},l=function(e,t,n){t=t||i(e,n);return Object.values(t).flatMap((e=>function(e){return`family=${e.str}`}(e))).join("&")},s=function(t){let n={};const r=e.asSelectorString.bind(e);for(let e of Object.values(t.tokens)){let o={"font-weight":e.int,"font-family":`'${t.cleanName}', ${t.defaultFonts}`},l=["font",t.first];for(let t of e.keys){let e=Object.assign({},o);t.isItal&&(e["font-style"]="italic");let s=l.concat([t.token]);n[`${r(s)}, ${r(s).toLowerCase()}`]=e}}let o=r(["font",t.first]),l=r(["font"].concat(t.first.split("+"))),s=new Set([o,l,o.toLowerCase(),l.toLowerCase()]);return n[Array.from(s).join(", ")]={"font-family":`'${t.cleanName}', ${t.defaultFonts}`},n},i=function(t,n,r){let o,l=0,s={},i=/([a-zA-Z-]{0,}?)(\d+)/,c=function(t,n){return e.filterSplit(n,t,!0)}(["default"],r?.origin||n),u="sans-serif",f=c.default;if(f)if(f.index<=r.index){let e="font default-* modifier should be indexed after font";console["warn"](e),u=f.values.join(" ")}else u=f.values.join(" ");for(let e in t){let n=t[e];if(0==l){s[l]={first:n,tokens:{},defaultFonts:u},o=l,l++;continue}let[r,a]=[null,null];try{let e;[e,r,a]=n.match(i),0==r.length&&(r="r")}catch{s[l]={first:n,tokens:{}},o=l,l++;continue}let c={null:function(){return{regu:1,wasNull:1}},i:function(){return{ital:1}},r:function(){return{regu:1}}},f={int:Number(a)};if(0==f.int){console.warn("Skipping zero weighted item"),l++;continue}for(let e in r){let t=c[r[e]];Object.assign(f,t())}let d=s[o]?.tokens[a]||{};Object.assign(d,f),null==d.keys&&(d.keys=new Set),d.keys.add({isItal:f.ital,token:n}),s[o].tokens[a]=d,l++}return a(s)},a=function(e){for(let t in e){let n=e[t];0!=n.first.length&&c(n)}return e},c=function(e){let t=o(e.first),n=function(e){return 0==Object.values(e.tokens).length&&(e.tokens[400]={int:400,regu:1,keys:new Set([{isItal:void 0,token:"400"}])}),Object.values(e.tokens)}(e),r=Object.assign({},...n),l=null!=r.ital,s=[],i=new Set;l&&s.push("ital"),(l||r.regu)&&s.push("wght");for(let t in e.tokens){let n=e.tokens[t],r=n.ital?1:0,o=n.int,s=l?[r]:[];s.push(o);let a=s.join(",");if(i.add(a),null!=n.regu){let e=l?[0]:[];e.push(o);let t=e.join(",");i.add(t)}}let a=Array.from(i).sort(),c=a.join(";"),u=`${t}:${s.join(",")}@${c}`;Object.assign(e,{weights:a,formatStringParts:s,titleToken:t,str:u})},u=function(e,t="swap"){return[d("link","preconnect",{href:"https://fonts.googleapis.com"}),d("link","preconnect",{href:"https://fonts.gstatic.com",crossorigin:""}),d("link","stylesheet",{href:`https://fonts.googleapis.com/css2?${e}${null==t?"":`&display=${t}`}`})]};let f={};const d=function(e,t,n){let r={rel:t,href:e};Object.assign(r,n||{});let o=JSON.stringify,l=f[o(r)];return l||(f[o(r)]=p("link",r))},p=function(e,t){if(null==t&&"string"!=typeof e&&null==(e=(t=e).localName))throw Error("createNode requires a localName within a object definition");let n=document.createElement(e);for(let e in t)n.setAttribute(e,t[e]);return n};DynamicCSSStyleSheet.addons.fontPackReceiver=function(n){e=n,e.insertReceiver(["font","pack"],t)},ClassGraph.prototype.generateGoogleLinks=u,ClassGraph.prototype.installGoogleLinks=n}(),(()=>{let e;const t=function(e){let t=function(e){"class"==e.attributeName&&n(e)},r=new MutationObserver((function(e){e.forEach(t)}));return r.observe(e,{attributes:!0,subtree:!0,attributeFilter:["class"],attributeOldValue:!0}),r},n=function(t){let n=t.target.classList.value,o=t.oldValue,l=n.split(/(?!\(.*)\s(?![^(]*?\))/g),s=null==o?[]:o.split(" ").map((e=>e.trim())),i=s?r(l,s):l;console.log("new",i),e.captureChanges(i,s,t.target)},r=function(e,t){const n=new Set(e);for(const e of t)n.delete(e);return n};ClassGraph.addons.monitorClasses=function(t){e=t},ClassGraph.prototype.monitor=function(e=document.body){return t(e)}})(),function(){let e,t;const n=function(n,r=":root"){if(console.log("Hook",n),null==t){let o={};for(let e in n){let t=`--${e}`,r=n[e];o[t]=r}let l=e.dcss.addStylesheetRules({[r]:o});l.renderAll(),t=l[0],e.varsRoot=t}else for(let e in n){let r=`--${e}`,o=n[e];t.sheetRule.style.setProperty(r,o)}};ClassGraph.addons.varsReceiver=function(r){e=r,e.vars=n.bind(e),e.varsRoot=t}}(),function(){let e;const t=function(e,t,n,r){let o=t.slice(r).slice(1),l=`var(--${o.join("-")})`;return n.push(l),[[],n,r+o.length]};ClassGraph.addons.varTranslateReceiver=function(n){e=n,e.insertTranslator("var",t)}}(),(()=>{class e extends Map{wordCounter=1;getKey(e){let n=t.get(e);return null==n&&(t.set(e,this.wordCounter),n=this.wordCounter,this.wordCounter++),n}stringToBits(e,t="-"){let n=e.split(t),r=[];return n.forEach(((e,t,n)=>r.push(this.getKey(e)))),r}stringToNest(e,t={}){let n=e.split("-");var r=t;let o=r,l=n.length;return n.forEach(((e,t,n)=>{let o=this.getKey(e),s=t==l-1;null==r[o]?r[o]=r=s?null:{}:r=r[o]})),o}installPropArray(e){e.forEach(((e,t,r)=>{this.stringToNest(e,n)}))}insertBitKey(e,t=n){return this.stringToNest(e,t)}wordsToOrderedArray(){let e=new Array(this.size);return this.forEach(((t,n,r)=>e[t]=n)),e}wordsToArrayString(e=0,t=!1){return t?this.wordsToOrderedArray().join(" "):JSON.stringify(this.wordsToOrderedArray(),null,e)}wordsToObjectString(e=0,t=!1){if(!t)return JSON.stringify(Object.fromEntries(this),null,e);let n="";return this.forEach(((e,t,r)=>n+=[t,e].join(""))),n}graphToArrayListString(e=n,t=0,r=0){return JSON.stringify(this.graphToArrayListRecurse(e,t,r))}graphToArrayListRecurse(e=n,t=0,r=null){let o=[],l=Object.entries(e);for(let e of l){let n=e[1];o.push([parseInt(e[0]),null==n?r:this.graphToArrayListRecurse(n,t,r)])}return o}graphToObjectString(e=0){let t={};for(let e in n)t[parseInt(e)]=n[e];return JSON.stringify(t,null,e)}}const t=new e,n={},r=["all-petite-caps","all-scroll","all-small-caps","allow-end","alternate-reverse","arabic-indic","auto-fill","auto-fit","avoid-column","avoid-page","avoid-region","balance-all","bidi-override","border-box","break-all","break-spaces","break-word","cjk-decimal","cjk-earthly-branch","cjk-heavenly-stem","cjk-ideographic","close-quote","closest-corner","closest-side","col-resize","color-burn","color-dodge","column-reverse","common-ligatures","content-box","context-menu","crisp-edges","decimal-leading-zero","diagonal-fractions","disclosure-closed","disclosure-open","discretionary-ligatures","double-circle","e-resize","each-line","ease-in","ease-in-out","ease-out","ethiopic-numeric","ew-resize","extra-condensed","extra-expanded","farthest-corner","farthest-side","fill-box","flex-end","flex-start","flow-root","force-end","from-image","full-size-kana","full-width","hard-light","high-quality","hiragana-iroha","historical-forms","historical-ligatures","horizontal-tb","inline-block","inline-flex","inline-grid","inline-table","inter-character","inter-word","isolate-override","japanese-formal","japanese-informal","jump-both","jump-end","jump-none","jump-start","justify-all","katakana-iroha","keep-all","korean-hangul-formal","korean-hanja-formal","korean-hanja-informal","line-through","lining-nums","list-item","literal-punctuation","lower-alpha","lower-armenian","lower-greek","lower-latin","lower-roman","margin-box","match-parent","match-source","max-content","message-box","min-content","n-resize","ne-resize","nesw-resize","no-clip","no-close-quote","no-common-ligatures","no-contextual","no-discretionary-ligatures","no-drop","no-historical-ligatures","no-open-quote","no-punctuation","no-repeat","not-allowed","ns-resize","nw-resize","nwse-resize","oldstyle-nums","open-quote","padding-box","petite-caps","pre-line","pre-wrap","proportional-nums","proportional-width","repeat-x","repeat-y","row-resize","row-reverse","ruby-base","ruby-base-container","ruby-text","ruby-text-container","run-in","s-resize","sans-serif","scale-down","scroll-position","se-resize","self-end","self-start","semi-condensed","semi-expanded","sideways-lr","sideways-right","sideways-rl","simp-chinese-formal","simp-chinese-informal","slashed-zero","small-caps","small-caption","soft-light","space-around","space-between","space-evenly","spell-out","stacked-fractions","status-bar","step-end","step-start","stroke-box","sw-resize","system-ui","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row","table-row-group","tabular-nums","titling-caps","trad-chinese-formal","trad-chinese-informal","ui-monospace","ui-rounded","ui-sans-serif","ui-serif","ultra-condensed","ultra-expanded","upper-alpha","upper-armenian","upper-latin","upper-roman","vertical-lr","vertical-rl","vertical-text","view-box","w-resize","wrap-reverse","x-fast","x-high","x-loud","x-low","x-slow","x-soft","x-strong","x-weak","zoom-in","zoom-out"];const o=function(e,t,n,r){const o=n||{row:{reverse:e=>e.join("-")}};let s=t.length,i=0,a=t.length+1,c=0,u=[];for(;i<s&&c<a;){let e=t.slice(i),[n,s]=l(e,o,r);i+=s,c+=1,u.push(n)}return u},l=function(e,t,n){let r,o,l,s=t,i=0;for(;i<e.length;i++){l=e[i],r=n?n.get(l):l;let t=s[r];if(null==t)break;o=s=t}if(o){const t=e=>e.join("-");let n=o[r];return null==n&&(n=t),[n(e.slice(0,i+1)),i+1]}return[e[0],1]};ClassGraph.addons.forwardReduceValues=function(e){return e.reducers.push((function(e,r){return o(e,r,n,t)})),t.installPropArray(r)},ClassGraph.prototype.valuesGraph={microGraph:n,words:t}})();
