!function(){let n;const e=function(e){var i;let l=`family=${`Material+Symbols+${(i=e.values,i.map((function(n){return n.charAt(0).toUpperCase()+n.substring(1,n.length)}))).join("+")}`}:${s({opsz:"20..48",wght:"100..700",FILL:"0..1",GRAD:"-50..200"})}`,r=[...e.values,"icon"];n.insertReceiver(r,o),Polyclass.graph.installGoogleLinks(l,null),t(e,fontSettings)},t=function(e,t){let s=e.values[0],o={},l={"font-variation-settings":`${i(t)}`,"font-size":"inherit"};o[`.material-symbols-${s}`]=l,n.dcss.addStylesheetRules(o).renderAll()},i=function(n){let e="",t=Object.keys(n);for(var i=0;i<t.length;i++){let s=t[i];e+=`'${s}' ${n[s]}${i==t.length-1?"":",\n"}`}return e},s=function(n){return`${Object.keys(n).join(",")}@${Object.values(n).join(",")}`},o=function(n){return n.values,n.origin,console.log("render icon",n),l(n)},l=function(n){const e=n.values,t=n.origin;t.classList.add(r(n)),t.innerText+=`${e.join("_")}`},r=function(n){return`material-symbols-${n.props[0]}`};ClassGraph.addons.iconReceiver=function(t){n=t,n.insertReceiver(["icon","pack"],e)}}();