!function(){let e,t;const l=function(l,o=":root"){if(console.log("Hook",l),null==t){let s={};for(let e in l){let t=`--${e}`,o=l[e];s[t]=o}let n=e.dcss.addStylesheetRules({[o]:s});n.renderAll(),t=n[0],e.varsRoot=t}else for(let e in l){let o=`--${e}`,s=l[e];t.sheetRule.style.setProperty(o,s)}};ClassGraph.addons.varsReceiver=function(o){e=o,e.vars=l.bind(e),e.varsRoot=t}}();
//# sourceMappingURL=vars-box.js.map
