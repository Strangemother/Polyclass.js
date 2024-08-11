document.createElement("span"),(()=>{var e=Math.round,t=parseInt,n=(e,t,n)=>`rgb(${e},${t},${n})`;let r=function(e,t="#000000",n="#FFFFFF"){return e||(h?t:n)},s=function(e){return r(e,n(0,0,0),n(255,255,255))},l=function(e,t,n){let r=e>>t;return n?r&n:r},i=function(e,t,n,r){let s=l(e,t,n);return a(s,r)},o=(e,n)=>a(t(e),n),a=function(t,n){return e(c(t-n))+n},c=function(e){return e*u};var u,h;function d(e,l,i){return u=(h=e<0)?-1*e:e,l.length>7?function(e,r,l){let i=r.split(","),a=s(l),c=a.split(","),u=t(i[0].slice(4)),h=t(i[1]),d=t(i[2]),f=o(c[0].slice(4),u),p=o(c[1],h),g=o(c[2],d);return n(f,p,g)}(0,l,i):function(e,n,s){var l=t(n.slice(1),16),i=r(s).slice(1),o=t(i,16),a=f(l,o,16,0),c=f(l,o,8,255),u=f(l,o,0,255);return`#${(16777216+65536*a+256*c+u).toString(16).slice(1)}`}(0,l,i)}function f(e,t,n,r){let s=l(e,n,r);return i(t,n,r,s)}function p(e,t,n){var r=e<0?-1*e:e,s=Math.round,l=parseInt;if(t.length>7){var i=t.split(","),o=(n||(e<0?"rgb(0,0,0)":"rgb(255,255,255)")).split(","),a=l(i[0].slice(4)),c=l(i[1]),u=l(i[2]);return"rgb("+(s((l(o[0].slice(4))-a)*r)+a)+","+(s((l(o[1])-c)*r)+c)+","+(s((l(o[2])-u)*r)+u)+")"}var h=(i=l(t.slice(1),16))>>16,d=i>>8&255,f=255&i;return"#"+(16777216+65536*(s((((o=l((n||(e<0?"#000000":"#FFFFFF")).slice(1),16))>>16)-h)*r)+h)+256*(s(((o>>8&255)-d)*r)+d)+(s(((255&o)-f)*r)+f)).toString(16).slice(1)}var g="#FF343B",y="#343BFF",b="rgb(234,47,120)",v="rgb(120,99,248)";blendedcolor=d(-.8,b,v),blendedcolor2=p(-.8,b,v),blendedcolor!=blendedcolor2&&console.error("Fault",blendedcolor,blendedcolor2),console.log(blendedcolor,blendedcolor2),blendedcolor=d(-.8,g,y),blendedcolor2=p(-.8,g,y),blendedcolor!=blendedcolor2&&console.error("Fault",blendedcolor,blendedcolor2),console.log(blendedcolor,blendedcolor2)})();class e extends Array{renderAll(){for(let e of this)e.render()}}class t{styleEl=void 0;insertMethod="adopt";constructor(e){this.installAddons(e,this.constructor.addons)}installAddons(e,t){for(let n in t){(0,t[n])(e)}}addStylesheetRules(e,t){return Array.isArray(e)?this.addStylesheetRulesArray(e,t):this.addStylesheetRulesObject(e,t)}getEnsureStyleSheet(e){let t,n=e||this.styleEl;if(null!=n)return n;if("sheet"==this.insertMethod&&(n=document.createElement("style"),document.head.appendChild(n),t=n.sheet),"adopt"==this.insertMethod){const e=new CSSStyleSheet;document.adoptedStyleSheets.push(e),t=e}return null==this.styleEl&&(this.styleEl=t),t}addStylesheetRulesArray(t,n){let r=this.getEnsureStyleSheet(n),s=new e,l=r;for(let e=0;e<t.length;e++){let n=t[e];this.pushResponse(s,l,n)}return s}pushResponse(e,t,n){let r=this.pushArrayRule(t,n);return e.push(r),r}getSheet(e){return this.getEnsureStyleSheet(e)}addStylesheetRulesObject(t,n){let r=this.getEnsureStyleSheet(n),s=new e,l=r;for(let e in t){let n=t[e],r=[e,Object.entries(n)];this.pushResponse(s,l,r)}return s}selectorExists(e,t){let n=this.getEnsureStyleSheet(t);for(let t of n.cssRules)if(e==t.selectorText)return!0;return!1}getRuleBySelector(e,t){let n=this.getEnsureStyleSheet(t);for(let t of n.cssRules)if(e==t.selectorText)return e}removeRuleBySelector(e,t){let n=this.getEnsureStyleSheet(t),r=this._getIndexBySelector(e,n);n.removeRule(r)}_getIndexBySelector(e,t){let n=0;for(let r of t.cssRules){if(e==r.selectorText)return n;n++}}pushArrayRule(e,t){let n=this;return{conf:t,styleSheet:e,getPropStr(e){let t=1,r=e=null==e?this.conf:e;return Array.isArray(e[1][0])&&(r=r[1],t=0),n.buildPropStr(r,t)},render(e){let t=this.conf,r=e||this.getPropStr(t),s=t[0],l=n.insertRuleSelectorPropStr(this.styleSheet,s,r);this.sheetRule=this.styleSheet.rules[l],this.rule=l},replace(e){if(!this.sheetRule)return this.render(e);let t=this.sheetRule.cssText,n=`${this.conf[0]} {${null==e?this.getPropStr(this.conf):e}}`;this.styleSheet.replace(`${t} ${n}`)}}}buildPropStr(e,t=1){let n="";for(let r=e.length;t<r;t++){let r=e[t],s=r[0],l=r[1];if(this.isLiteralObject(l))for(let e in l){let t=l[e];n+=this.stringEntry(e,t,l.important)}else n+=this.stringEntry(s,l,null!=r[2])}return n}stringEntry(e,t,n=!1){return`${e}: ${t}${n?" !important":""};\n`}isLiteralObject(e){return!!e&&e.constructor===Object}insertRuleSelectorPropStr(e,t,n){let r=`${t} {${n}}`;return e.insertRule(r,e.cssRules.length)}}t.addons={};class n{sep="-";escapeRegex=/[<>*% #():=.@+?\/]/g;dcss=new t(this);constructor(e){this.conf=e||{},this.announce("wake"),this.translateMap={},this.reducers=[],!1!==this.conf.addons&&this.installAddons(this.getPreAddons()),this.vendorLocked=null!=e?.vendorLocked&&e.vendorLocked,this.sep=e?.sep||this.sep,this.aliasMap={},this.parentSelector=e?.parentSelector,this.processAliases(this.conf?.aliases),this.announce("ready")}announce(e){let t=new CustomEvent(`classgraph-${e}`,{detail:{entity:this}});dispatchEvent(t)}insertTranslator(e,t){this.translateMap[e]=t}getPreAddons(){return this.constructor.addons}installAddons(e){for(let t in e){(0,e[t])(this)}}generate(e){let t=Object.entries(e?.style||{});for(let[e,n]of t)this.addCamelString(e)}addCamelString(e){let t=function(e,t="-"){return e.replace(/[A-Z]+(?![a-z])|[A-Z]/g,((e,n)=>(n?t:"")+e.toLowerCase()))}(e).split("-");this.addTree(t)}addTree(e,t){let n=this.getRoot(),r=this.nodeWord(),s=[];for(let t of e){s.push(t),n[r]||(n[r]={});let e=n[r][t];null==e&&(e=n[r][t]={key:t,position:s}),n=e}return n.leaf=!0,null!=t&&(n.handler=t),n}nodeWord(){return"n"}getRoot(){return this.graph||(this.graph=this.generateRootGraph()),this.graph}generateRootGraph(){return{[this.nodeWord()]:{},meta:{key:"root",isRoot:!0},key:"root"}}processAliases(e){for(let t in e)this.addAliases(t,e[t])}getPrefixes(){let e=this.conf;return e.prefixes?e.prefixes:e.prefix?[e.prefix]:[]}isVendorPrefixMatch(e,t){t=null==t?this.getPrefixes():t;for(var n=0;n<t.length;n++){let r=t[n];if(e[n]!=r)return!1}return!0}aliasConvert(e){this.conf.prefixes;let t=[];for(let n of e)t.push(this.aliasMap[n]||n);return t}addAliases(e,t){for(let n of t)this.addAlias(e,n)}addAlias(e,t){this.aliasMap[t]=e}objectSplit(e,t=this.sep,n=!0,r=-1){let s,l="string"==typeof e?e.split(t):e,i=this.nodeWord(),o=this.getRoot(),a=0,c=this.aliasConvert(l);if(c.length,this.isVendorPrefixMatch(c))c=c.slice(this.getPrefixes().length);else if(this.vendorLocked)return{props:void 0,values:void 0,str:e,index:r,node:s,valid:!1};for(let e of c)if(s=o[i][e],a+=1,null!=s){if(!0===s.leaf){let e=c[a],t=s[i];if(null==(t&&t[e]))break}o=s}else if(n)break;let u=c.slice(0,a),h=c.slice(a);return this.valuesGraph,h=this.forwardReduceValues(u,h),{props:u,values:h,str:e,node:s,index:r,valid:s&&h.length>0||!1}}forwardReduceValues(e,t,n,r){let s=e,l=t;for(let e of this.reducers){l=e(s,l)}return l}minorCapture(e,t=this.sep,n=!0){let r="string"==typeof e?e.split(t):e,s=this.aliasConvert(r);s.length;let l,i=this.nodeWord(),o=this.getRoot(),a=0;if(this.isVendorPrefixMatch(s))s=s.slice(this.getPrefixes().length);else if(this.vendorLocked)return{props:void 0,values:void 0,str:e,node:l,valid:!1};for(let e of s)if(l=o[i][e],a+=1,null!=l){if(!0===l.leaf){let e=s[a],t=l[i];if(null==(t&&t[e]))break}o=l}else if(n)break;let c=s.slice(0,a),u=s.slice(a);return{props:c,values:u,str:e,node:l,valid:l&&u.length>0||!1}}objectSplitTranslateValue(e,t=this.sep,n=!0){let r=this.objectSplit(e,t,n);return this.translateValue(r)}insertLine(e,t){let n=this.objectSplit(e);return this.insertRule(n,t)}translateValue(e){let t=e.values;return t?.join(" "),this.forwardDigestKeys(e,t).join(" ")}forwardDigestKeys(e,t){let n=!0,r=t||[],s=0,l=[];for(;n;){let t=r[s],i=this.translateMap[t];i?[r,l,s]=i(e,r,l,s):l.push(this.beforeOutStack(r[s],s,e)),s+=1,(s>=r.length||s>100)&&(n=!1)}return l}keyValueFunctions=new Map;beforeOutStack(e,t,n){let r=this.getKeyFunctionMatch(e),s=this.collapseFunctions(r,n);return null==s?e:s}collapseFunctions(e,t){let n;for(var r=e.length-1;r>=0;r--){let s=e[r],l=null==n?s.remainder:n,i=s.handler;n=i&&i(l,s,r,t)||n}return n}getKeyFunctionMatch(e){let t=null!=e,n=e,r=[];for(;t;){let e=this.getKeyFunctionMatchOnce(n);e.success,t=e.match.start>-1,t&&(n=e.remainder,r.push(e))}return r}getKeyFunctionMatchOnce(e,t=".",n=":"){let r=e.lastIndexOf(t),s=e.length,l=e.slice(r+1,s).split(n),i=l[0],o=l.slice(1),a=this.keyValueFunctions.get(i),c={value:e,remainder:e.slice(0,r),handler:a,args:o,match:{start:r,end:s,name:i}};return c.success=null!=a,c}filterClasses(e,t,n=!1){let r=e.classList,s=n?{}:[],l=(e,t,n)=>s.push([n,t]);return n&&(l=(e,t,n)=>s[e]=[n,t]),r.forEach((function(e,n,r){let s=e.split("-")[0];t.indexOf(s)>-1&&l(s,e,n)})),s}filterSplit(e,t,n=!1){let r=this.filterClasses(e,t,n);if(n){let e={};for(let t in r){let n=r[t];e[t]=this.objectSplit(n[1],void 0,void 0,n[0])}return e}let s=[];return r.forEach((e=>{s.push(this.objectSplit(e))})),s}removeRule(e,t=void 0,n=!0){e?.props?.join("-");let r=this.asSelectorString(e,n);this.dcss.selectorExists(r)&&this.dcss.removeRuleBySelector(r)}insertRule(e,t=void 0,n=!0){let r=e?.props?.join("-"),s=this.asSelectorString(e,n);if(this.dcss.selectorExists(s))return this.dcss.getRuleBySelector(s);let l={[r]:this.translateValue(e)};t&&Object.assign(l,t);let i={insert:!0},o=e.node?.handler?.bind(e);if(o&&"function"==typeof o){let t=o(e);void 0!==t&&(i=t)}if(!1!==i.insert){let e=this.dcss.addStylesheetRules({[s]:l});return e.renderAll(),e}}insertReceiver(e,t){let n=this.addTree(e);return n.handler=t,n}asSelectorString(e,t=!0){let n;if(Array.isArray(e)){let t=e.join("-");n=this.escapeStr(t)}if("string"==typeof e&&(n=this.escapeStr(e)),e.props){let t=e.props.join("-");n=this.escapeStr(t)}e.str&&(n=this.escapeStr(e.str));let r=`.${n}`;return t?this.prependParent(r,e):r}prependParent(e,t){if(null!=this.parentSelector){return`${this.parentSelector}${e}`}return e}escapeStr(e){return e.replace(this.escapeRegex,"\\$&")}isProperty(e,t=this.sep){return 0==this.objectSplit(e).values.length}isDeclaration(e,t=this.sep){let n=this.objectSplit(e);return n.values.length>0&&n.props.length>0}getCSSText(){let e="",t=this.dcss.getSheet();for(let n of t.rules)e+=`${n.cssText};\n`;return e}captureChanges(e,t,n){this.discoverInsert(e,n),this.discoverRemove(t,n)}discoverInsert(e,t){let n=this;for(let r of e){if(0==r.length)continue;let e=n.objectSplit(r);e.origin=t;let s=e.node?.handler;(s?s.bind(e):n.insertRule.bind(n))(e)}}discoverRemove(e,t){let n=this;for(let r of e){if(0==r.length)continue;let e=n.objectSplit(r);e.origin=t;let s=e.node?.unhandler,l=s?.bind(e);l&&l(e)}}processOnLoad(e,t=document){if(1==this.domContentLoaded)return this.process(e);(t||e).addEventListener("DOMContentLoaded",function(){this.process(e),this.domContentLoaded=!0}.bind(this))}process(e=document.body){this.getAllClasses(e,!0).forEach(((e,t)=>this.safeInsertMany(t,e)))}safeInsertMany(e,t){let n=0;for(let r of t)this.safeInsertLine(r,e,n++)}safeInsertLine(e,t,n=-1){let r=this.objectSplit(e,void 0,void 0,n);return r.valid&&(r.origin=t,this.insertRule(r)),r}getAllClasses(e=document.body,t=!1,n=!0){let r=function(e){e.classList.forEach((e=>s.add(e)))},s=new Set;return t&&(s=new Map,r=function(e){s.set(e,new Set(e.classList))}),n&&r(e),e.querySelectorAll("*").forEach(r),s}addClass(e,...t){let n=this.asNodes(e);for(let e of n)for(let n of t)for(let t of n.split(" "))e.classList.add(t)}removeClass(e,...t){let n=this.asNodes(e);for(let e of n)e.classList.remove(...t)}asNodes(e){let t=[e];return"string"==typeof e&&(t=document.querySelectorAll(e)),t}}n.addons={};const r=function(e){return e.dataset.polyclassId=function(e){return e.dataset.polyclassId||Math.random().toString(32).slice(2)}(e)},s=function(){const e=document.querySelectorAll("*[polyclass]");for(let t of e){let e=r(t),n=new a({target:t,isInline:!0});i.set(e,n)}};!function(e=document){["complete","interactive"].indexOf(document.readyState)>-1&&s(),e.addEventListener("DOMContentLoaded",function(){s()}.bind(this))}();class l{constructor([e]=[]){this.units=i;let t=new n(e);t.generate(e?.target),this._graph=t;(e instanceof(this?.HTMLElement||function(){})?this.hotLoad:this.loadConfig).bind(this)(e)}hotLoad(e){return console.log("Hotload"),this.loadConfig({target:e,process:!1})}loadConfig(e){if(e?.processOnLoad&&this.processOnLoad(e.processOnLoad),e?.target&&0!=e?.process&&this.process(e.target),e?.isInline){!1!==this.getParsedAttrValue("monitor",e.target)&&this._graph?.monitor&&this._graph.monitor(e.target)}this.innerProxyHandler={reference:this,get(e,t,n){let r=this.reference;if(t in r)return r[t].bind?r[t].bind(r):r[t]},apply(e,t,n){console.log("innerProxyHandler apply...",n)}},this.innerHead=function(e){},this.proxy=new Proxy(this.innerHead,this.innerProxyHandler)}get graph(){return this._graph}get sheet(){return this._graph.dcss}get config(){return this._graph.conf}getParsedAttrValue(e,t,n=void 0){const r=(t=t||this._graph.conf.target).attributes.getNamedItem(e);if(null===r)return n;let s=r.value;if(0==s.length)return n;return JSON.parse(s)}getInstance(e){void 0===e&&(e=this.target);let t=e?.dataset?.polyclassId||e;return i.get(t)}processOnLoad(){return this._graph.processOnLoad.apply(this._graph,arguments)}process(){return this._graph.process.apply(this._graph,arguments)}add(e,t){return this._graph.addTree.apply(this._graph,arguments)}insertReceiver(e,t){return this._graph.addTree.apply(this._graph,arguments)}insertClassProps(e,t){return this._graph.insertLine.apply(this._graph,arguments)}insertRules(e){return this._graph.dcss.addStylesheetRules.apply(this._graph.dcss,arguments)}asString(){return this._graph.getCSSText()}}const i=new Map,o={safeSpace:{units:i,addons:[]},get(e,t,n){let r=this.getInstance();if(t in r){let e=r[t];return e&&e.bind?e.bind(r):e}return this.safeSpace[t]},newInstance(){return new l(Array.from(arguments))},getInstance(){return this._instance||(this._instance=this.newInstance.apply(this,arguments),this.safeSpace.instance=this._instance),this._instance},apply(e,t,n){return console.log("Polyclass apply...",e,t,n),n[0]instanceof HTMLElement?(console.log("Wrapped"),this.newInstance.apply(this,n)):this.getInstance.apply(this,n)}},a=new Proxy((function(){return o.newInstance.apply(o,arguments)}),o);const c=function(e){return f(e)||d(e)||u(e)||h(e)},u=function(e){let t=e.split("/");return 2==t.length&&(c(t[0])&&f(t[1]))},h=function(e){let t=new Set(["deg","grad","rad","turn"]),n=e.slice(parseFloat(e).toString().length,e.length);return t.has(n)},d=function(e){return e.endsWith("%")&&f(e.slice(0,e.length-1))},f=function(e){if(null==e||0==e.length)return!1;return!isNaN(Number(e))},p=function(e){let t=e.slice(4,5),n="";return t.length>0&&(n=`/${t}`),`${e[0]}(${e.slice(1,4).join(" ")}${n})`},g=function(e,t,n,r=void 0){let s=t.length,l=0,i=t.length+1,o=0,a=[];for(;l<s&&o<i;){let e=t.slice(l),[s,i]=y(e,n,!0,r);l+=i,o+=1,Array.isArray(s)?a=a.concat(s):a.push(s)}return a},y=function(e,t,n=!1,r=p,s=void 0){var l=0;let i=null!=s?s:e=>t.has(e),o=e.length,a=[],u=[],h=[];for(;l<o;l++){let t=e[l],s=l;if(i(t)){let i=l+1;u=[t],h=[];let d=!0;for(;d&&i<o;){let t=e[i],n=c(t);d=n&&i<o&&u.length<=3,n?(i+=1,u.push(t),d=d&&u.length<=4):h.push(t)}let[f,p]=[s,i],g=u.slice(f,p),y=r(u);if(g.length<3){if(a=a.concat(u),n)return[a,i]}else a.push(y),l=i-1}else if(a.push(t),n){let[t,n]=[s,u.length];u.slice(t,n);let l=r(u);return u.length<3?[e[n],u.length+1]:[l,u.length]}}return[r(u),l+1]};!function(){let e=new Set(["rgb","hsl","hwb","lab","lch","oklab","oklch"]);n.addons.extendedColorValues=function(t){t.reducers.push((function(t,n){return g(t,n,e)}))}}(),function(){let e;const t=function(e,t){values=e.values;let[n,...s]=e.values;if(void 0!==document[`on${n}`]){const t=e.origin;r(e,t,n,s)}else console.warn("Unknown action",n)},r=function(e,t,n,r){let l=e=>s(e,n,r),i=`polyaction_${n}`;void 0===t.dataset[i]?(t.addEventListener(n,l),t.dataset[i]=!0):console.log("Event already exists:",n)},s=function(e,t,n){let[r,...s]=n;console.log(e,t,n),console.log(r,s);let l={call(){},toggle(){console.log(s,n,t),e.currentTarget.classList.toggle(s.join("-"))},setvar(){}}[r];l&&l()};console.log("event receiver"),n.addons.eventsReceiver=function(n){e=n,e.insertReceiver(["event"],t)}}(),function(){let e;const r=function(e){const t=e.values,n=e.origin;let r=c(t,n,e),i=o(t,r,n);s(i),l(r)},s=function(e,t){return d(e,t).forEach((e=>document.head.appendChild(e)))},l=function(t,n){for(let n of Object.values(t)){let t=n.first,r=(e,t)=>t?" ":"",s=i(t.replace(/[+]/g,r));n.cleanName=s,n.definition=a(n),e.dcss.addStylesheetRules(n.definition).renderAll()}},i=function(e){return e.replace(/(^|[\s+])\S/g,(function(e){return e.toUpperCase()}))},o=function(e,t,n){t=t||c(e,n);return Object.values(t).flatMap((e=>function(e){return`family=${e.str}`}(e))).join("&")},a=function(t){let n={};const r=e.asSelectorString.bind(e);for(let e of Object.values(t.tokens)){let s={"font-weight":e.int,"font-family":`'${t.cleanName}', ${t.defaultFonts}`},l=["font",t.first];for(let t of e.keys){let e=Object.assign({},s);t.isItal&&(e["font-style"]="italic");let i=l.concat([t.token]);n[`${r(i)}, ${r(i).toLowerCase()}`]=e}}let s=r(["font",t.first]),l=r(["font"].concat(t.first.split("+"))),i=new Set([s,l,s.toLowerCase(),l.toLowerCase()]);return n[Array.from(i).join(", ")]={"font-family":`'${t.cleanName}', ${t.defaultFonts}`},n},c=function(t,n,r){let s,l=0,i={},o=/([a-zA-Z-]{0,}?)(\d+)/,a=function(t,n){return e.filterSplit(n,t,!0)}(["default"],r?.origin||n),c="sans-serif",h=a.default;if(h)if(h.index<=r.index){let e="font default-* modifier should be indexed after font";console["warn"](e),c=h.values.join(" ")}else c=h.values.join(" ");for(let e in t){let n=t[e];if(0==l){i[l]={first:n,tokens:{},defaultFonts:c},s=l,l++;continue}let[r,a]=[null,null];try{let e;[e,r,a]=n.match(o),0==r.length&&(r="r")}catch{i[l]={first:n,tokens:{}},s=l,l++;continue}let u={null:function(){return{regu:1,wasNull:1}},i:function(){return{ital:1}},r:function(){return{regu:1}}},h={int:Number(a)};if(0==h.int){console.warn("Skipping zero weighted item"),l++;continue}for(let e in r){let t=u[r[e]];Object.assign(h,t())}let d=i[s]?.tokens[a]||{};Object.assign(d,h),null==d.keys&&(d.keys=new Set),d.keys.add({isItal:h.ital,token:n}),i[s].tokens[a]=d,l++}return u(i)},u=function(e){for(let t in e){let n=e[t];0!=n.first.length&&h(n)}return e},h=function(e){let t=i(e.first),n=function(e){return 0==Object.values(e.tokens).length&&(e.tokens[400]={int:400,regu:1,keys:new Set([{isItal:void 0,token:"400"}])}),Object.values(e.tokens)}(e),r=Object.assign({},...n),s=null!=r.ital,l=[],o=new Set;s&&l.push("ital"),(s||r.regu)&&l.push("wght");for(let t in e.tokens){let n=e.tokens[t],r=n.ital?1:0,l=n.int,i=s?[r]:[];i.push(l);let a=i.join(",");if(o.add(a),null!=n.regu){let e=s?[0]:[];e.push(l);let t=e.join(",");o.add(t)}}let a=Array.from(o).sort(),c=a.join(";"),u=`${t}:${l.join(",")}@${c}`;Object.assign(e,{weights:a,formatStringParts:l,titleToken:t,str:u})},d=function(e,t="swap"){return[p("link","preconnect",{href:"https://fonts.googleapis.com"}),p("link","preconnect",{href:"https://fonts.gstatic.com",crossorigin:""}),p("link","stylesheet",{href:`https://fonts.googleapis.com/css2?${e}${null==t?"":`&display=${t}`}`})]};let f={};const p=function(e,t,n){let r={rel:t,href:e};Object.assign(r,n||{});let s=JSON.stringify,l=f[s(r)];return l||(f[s(r)]=g("link",r))},g=function(e,t){if(null==t&&"string"!=typeof e&&null==(e=(t=e).localName))throw Error("createNode requires a localName within a object definition");let n=document.createElement(e);for(let e in t)n.setAttribute(e,t[e]);return n};t.addons.fontPackReceiver=function(t){e=t,e.insertReceiver(["font","pack"],r)},n.prototype.generateGoogleLinks=d,n.prototype.installGoogleLinks=s}(),function(){let e;const t=function(e,t,n,r){return t.value.slice(0,t.match.start),t.args.length>0?t.args[0]:"green"},r=function(e,t,n,r){console.log("raise hook",t,r);let s=t.value.slice(0,t.match.start);console.log(s)};n.addons.functionsReceiver=function(n){e=n,e.keyValueFunctions.set("forceGreen",t),e.keyValueFunctions.set("force",t),e.keyValueFunctions.set("raise",r)}}(),function(){let e;const t=function(t){var n;let s=`family=${`Material+Symbols+${(n=t.values,n.map((function(e){return e.charAt(0).toUpperCase()+e.substring(1,e.length)}))).join("+")}`}:${l({opsz:"20..48",wght:"100..700",FILL:"0..1",GRAD:"-50..200"})}`,o=[...t.values,"icon"];e.insertReceiver(o,i),a.graph.installGoogleLinks(s,null),r(t,fontSettings)},r=function(t,n){let r=t.values[0],l={},i={"font-variation-settings":`${s(n)}`,"font-size":"inherit"};l[`.material-symbols-${r}`]=i,e.dcss.addStylesheetRules(l).renderAll()},s=function(e){let t="",n=Object.keys(e);for(var r=0;r<n.length;r++){let s=n[r];t+=`'${s}' ${e[s]}${r==n.length-1?"":",\n"}`}return t},l=function(e){return`${Object.keys(e).join(",")}@${Object.values(e).join(",")}`},i=function(e){return e.values,e.origin,console.log("render icon",e),o(e)},o=function(e){const t=e.values,n=e.origin;n.classList.add(c(e)),n.innerText+=`${t.join("_")}`},c=function(e){return`material-symbols-${e.props[0]}`};n.addons.iconReceiver=function(n){e=n,e.insertReceiver(["icon","pack"],t)}}(),function(){let e;const t=function(t){var n;console.log("Install the font",t);let s=`family=${`Material+Symbols+${(n=t.values,n.map((function(e){return e.charAt(0).toUpperCase()+e.substring(1,e.length)}))).join("+")}`}:${l({opsz:"20..48",wght:"100..700",FILL:"0..1",GRAD:"-50..200"})}`,o=[...t.values,"icon"];e.insertReceiver(o,i),a.graph.installGoogleLinks(s,null),r(t,{FILL:1,wght:500,GRAD:200,opsz:48})},r=function(t,n){let r=t.values[0],l={},i={"font-variation-settings":`${s(n)}`,"font-size":"inherit"};l[`.material-symbols-${r}`]=i,e.dcss.addStylesheetRules(l).renderAll()},s=function(e){let t="",n=Object.keys(e);for(var r=0;r<n.length;r++){let s=n[r];t+=`'${s}' ${e[s]}${r==n.length-1?"":",\n"}`}return t},l=function(e){return`${Object.keys(e).join(",")}@${Object.values(e).join(",")}`},i=function(e){return e.values,e.origin,console.log("render icon",e),o(e)},o=function(e){const t=e.values,n=e.origin;n.classList.add(c(e)),n.innerText+=`${t.join("_")}`},c=function(e){return`material-symbols-${e.props[0]}`};n.addons.iconReceiver=function(n){e=n,e.insertReceiver(["icon","pack"],t)}}(),(()=>{let e;const t=function(e){let t=function(e){"class"==e.attributeName&&r(e)},n=new MutationObserver((function(e){e.forEach(t)}));return n.observe(e,{attributes:!0,subtree:!0,attributeFilter:["class"],attributeOldValue:!0}),n},r=function(t){let n=t.target.classList.value,r=t.oldValue,l=n.split(/(?!\(.*)\s(?![^(]*?\))/g),i=null==r?[]:r.split(" ").map((e=>e.trim())),o=i?s(l,i):l;console.log("new",o),e.captureChanges(o,i,t.target)},s=function(e,t){const n=new Set(e);for(const e of t)n.delete(e);return n};n.addons.monitorClasses=function(t){e=t},n.prototype.monitor=function(e=document.body){return t(e)}})(),(()=>{class e extends Map{wordCounter=1;getKey(e){let n=t.get(e);return null==n&&(t.set(e,this.wordCounter),n=this.wordCounter,this.wordCounter++),n}stringToBits(e,t="-"){let n=e.split(t),r=[];return n.forEach(((e,t,n)=>r.push(this.getKey(e)))),r}stringToNest(e,t={}){let n=e.split("-");var r=t;let s=r,l=n.length;return n.forEach(((e,t,n)=>{let s=this.getKey(e),i=t==l-1;null==r[s]?r[s]=r=i?null:{}:r=r[s]})),s}installPropArray(e){e.forEach(((e,t,n)=>{this.stringToNest(e,r)}))}insertBitKey(e,t=r){return this.stringToNest(e,t)}wordsToOrderedArray(){let e=new Array(this.size);return this.forEach(((t,n,r)=>e[t]=n)),e}wordsToArrayString(e=0,t=!1){return t?this.wordsToOrderedArray().join(" "):JSON.stringify(this.wordsToOrderedArray(),null,e)}wordsToObjectString(e=0,t=!1){if(!t)return JSON.stringify(Object.fromEntries(this),null,e);let n="";return this.forEach(((e,t,r)=>n+=[t,e].join(""))),n}graphToArrayListString(e=r,t=0,n=0){return JSON.stringify(this.graphToArrayListRecurse(e,t,n))}graphToArrayListRecurse(e=r,t=0,n=null){let s=[],l=Object.entries(e);for(let e of l){let r=e[1];s.push([parseInt(e[0]),null==r?n:this.graphToArrayListRecurse(r,t,n)])}return s}graphToObjectString(e=0){let t={};for(let e in r)t[parseInt(e)]=r[e];return JSON.stringify(t,null,e)}}const t=new e,r={},s=["all-petite-caps","all-scroll","all-small-caps","allow-end","alternate-reverse","arabic-indic","auto-fill","auto-fit","avoid-column","avoid-page","avoid-region","balance-all","bidi-override","border-box","break-all","break-spaces","break-word","cjk-decimal","cjk-earthly-branch","cjk-heavenly-stem","cjk-ideographic","close-quote","closest-corner","closest-side","col-resize","color-burn","color-dodge","column-reverse","common-ligatures","content-box","context-menu","crisp-edges","decimal-leading-zero","diagonal-fractions","disclosure-closed","disclosure-open","discretionary-ligatures","double-circle","e-resize","each-line","ease-in","ease-in-out","ease-out","ethiopic-numeric","ew-resize","extra-condensed","extra-expanded","farthest-corner","farthest-side","fill-box","flex-end","flex-start","flow-root","force-end","from-image","full-size-kana","full-width","hard-light","high-quality","hiragana-iroha","historical-forms","historical-ligatures","horizontal-tb","inline-block","inline-flex","inline-grid","inline-table","inter-character","inter-word","isolate-override","japanese-formal","japanese-informal","jump-both","jump-end","jump-none","jump-start","justify-all","katakana-iroha","keep-all","korean-hangul-formal","korean-hanja-formal","korean-hanja-informal","line-through","lining-nums","list-item","literal-punctuation","lower-alpha","lower-armenian","lower-greek","lower-latin","lower-roman","margin-box","match-parent","match-source","max-content","message-box","min-content","n-resize","ne-resize","nesw-resize","no-clip","no-close-quote","no-common-ligatures","no-contextual","no-discretionary-ligatures","no-drop","no-historical-ligatures","no-open-quote","no-punctuation","no-repeat","not-allowed","ns-resize","nw-resize","nwse-resize","oldstyle-nums","open-quote","padding-box","petite-caps","pre-line","pre-wrap","proportional-nums","proportional-width","repeat-x","repeat-y","row-resize","row-reverse","ruby-base","ruby-base-container","ruby-text","ruby-text-container","run-in","s-resize","sans-serif","scale-down","scroll-position","se-resize","self-end","self-start","semi-condensed","semi-expanded","sideways-lr","sideways-right","sideways-rl","simp-chinese-formal","simp-chinese-informal","slashed-zero","small-caps","small-caption","soft-light","space-around","space-between","space-evenly","spell-out","stacked-fractions","status-bar","step-end","step-start","stroke-box","sw-resize","system-ui","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row","table-row-group","tabular-nums","titling-caps","trad-chinese-formal","trad-chinese-informal","ui-monospace","ui-rounded","ui-sans-serif","ui-serif","ultra-condensed","ultra-expanded","upper-alpha","upper-armenian","upper-latin","upper-roman","vertical-lr","vertical-rl","vertical-text","view-box","w-resize","wrap-reverse","x-fast","x-high","x-loud","x-low","x-slow","x-soft","x-strong","x-weak","zoom-in","zoom-out"];const l=function(e,t,n,r){const s=n||{row:{reverse:e=>e.join("-")}};let l=t.length,o=0,a=t.length+1,c=0,u=[];for(;o<l&&c<a;){let e=t.slice(o),[n,l]=i(e,s,r);o+=l,c+=1,u.push(n)}return u},i=function(e,t,n){let r,s,l,i=t,o=0;for(;o<e.length;o++){l=e[o],r=n?n.get(l):l;let t=i[r];if(null==t)break;s=i=t}if(s){const t=e=>e.join("-");let n=s[r];return null==n&&(n=t),[n(e.slice(0,o+1)),o+1]}return[e[0],1]};n.addons.forwardReduceValues=function(e){return e.reducers.push((function(e,n){return l(e,n,r,t)})),t.installPropArray(s)},n.prototype.valuesGraph={microGraph:r,words:t}})(),function(){let e;const t=function(e,t,n,r){let s=t.slice(r).slice(1),l=`var(--${s.join("-")})`;return n.push(l),[[],n,r+s.length]};n.addons.varTranslateReceiver=function(n){e=n,e.insertTranslator("var",t)}}(),function(){let e,t;const r=function(n,r=":root"){if(console.log("Hook",n),null==t){let s={};for(let e in n){let t=`--${e}`,r=n[e];s[t]=r}let l=e.dcss.addStylesheetRules({[r]:s});l.renderAll(),t=l[0],e.varsRoot=t}else for(let e in n){let r=`--${e}`,s=n[e];t.sheetRule.style.setProperty(r,s)}};n.addons.varsReceiver=function(n){e=n,e.vars=r.bind(e),e.varsRoot=t}}();
