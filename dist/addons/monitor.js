(()=>{let t;const e=function(t){console.log("monitorClasses",t);let e=function(t){"class"==t.attributeName&&o(t)},n=new MutationObserver((function(t){t.forEach(e)}));return n.observe(t,{attributes:!0,subtree:!0,attributeFilter:["class"],attributeOldValue:!0}),n},o=function(e){let o=e.target.classList.value,s=e.oldValue,r=o.split(" "),a=s.split(" ").map((t=>t.trim())),l=a?n(r,a):r;console.log("new",l),t.captureNew(l,void 0,e.target)},n=function(t,e){const o=new Set(t);for(const t of e)o.delete(t);return o};ClassGraph.addons.monitorClasses=function(e){t=e},ClassGraph.prototype.monitor=function(t=document.body){return e(t)}})();