(()=>{let t;const e=function(t){let e=function(t){"class"==t.attributeName&&n(t)},o=new MutationObserver((function(t){t.forEach(e)}));return o.observe(t,{attributes:!0,subtree:!0,attributeFilter:["class"],attributeOldValue:!0}),o},n=function(e){let n=e.target.classList.value,s=e.oldValue,r=n.split(/(?!\(.*)\s(?![^(]*?\))/g),a=null==s?[]:s.split(" ").map((t=>t.trim())),l=a?o(r,a):r;console.log("new",l),t.captureChanges(l,a,e.target)},o=function(t,e){const n=new Set(t);for(const t of e)n.delete(t);return n};ClassGraph.addons.monitorClasses=function(e){t=e},ClassGraph.prototype.monitor=function(t=document.body){return e(t)}})();
