(()=>{class e extends Map{wordCounter=1;getKey(e){let t=r.get(e);return null==t&&(r.set(e,this.wordCounter),t=this.wordCounter,this.wordCounter++),t}stringToBits(e,r="-"){let t=e.split(r),o=[];return t.forEach(((e,r,t)=>o.push(this.getKey(e)))),o}stringToNest(e,r={}){let t=e.split("-");var o=r;let a=o,n=t.length;return t.forEach(((e,r,t)=>{let a=this.getKey(e),s=r==n-1;null==o[a]?o[a]=o=s?null:{}:o=o[a]})),a}installPropArray(e){e.forEach(((e,r,o)=>{this.stringToNest(e,t)}))}insertBitKey(e,r=t){return this.stringToNest(e,r)}wordsToOrderedArray(){let e=new Array(this.size);return this.forEach(((r,t,o)=>e[r]=t)),e}wordsToArrayString(e=0,r=!1){return r?wordsToOrderedArray().join(" "):JSON.stringify(wordsToOrderedArray(),null,e)}wordsToObjectString(e=0,r=!1){if(!r)return JSON.stringify(Object.fromEntries(this),null,e);let t="";return this.forEach(((e,r,o)=>t+=[r,e].join(""))),t}graphToArrayListString(e=t,r=0,o=0){return JSON.stringify(this.graphToArrayListRecurse(e,r,o))}graphToArrayListRecurse(e=t,r=0,o=null){let a=[],n=Object.entries(e);for(let e of n){let t=e[1];a.push([parseInt(e[0]),null==t?o:this.graphToArrayListRecurse(t,r,o)])}return a}graphToObjectString(e=0){let r={};for(let e in t)r[parseInt(e)]=t[e];return JSON.stringify(r,null,e)}}const r=new e,t={},o=["all-petite-caps","all-scroll","all-small-caps","allow-end","alternate-reverse","arabic-indic","auto-fill","auto-fit","avoid-column","avoid-page","avoid-region","balance-all","bidi-override","border-box","break-all","break-spaces","break-word","cjk-decimal","cjk-earthly-branch","cjk-heavenly-stem","cjk-ideographic","close-quote","closest-corner","closest-side","col-resize","color-burn","color-dodge","column-reverse","common-ligatures","content-box","context-menu","crisp-edges","decimal-leading-zero","diagonal-fractions","disclosure-closed","disclosure-open","discretionary-ligatures","double-circle","e-resize","each-line","ease-in","ease-in-out","ease-out","ethiopic-numeric","ew-resize","extra-condensed","extra-expanded","farthest-corner","farthest-side","fill-box","flex-end","flex-start","flow-root","force-end","from-image","full-size-kana","full-width","hard-light","high-quality","hiragana-iroha","historical-forms","historical-ligatures","horizontal-tb","inline-block","inline-flex","inline-grid","inline-table","inter-character","inter-word","isolate-override","japanese-formal","japanese-informal","jump-both","jump-end","jump-none","jump-start","justify-all","katakana-iroha","keep-all","korean-hangul-formal","korean-hanja-formal","korean-hanja-informal","line-through","lining-nums","list-item","literal-punctuation","lower-alpha","lower-armenian","lower-greek","lower-latin","lower-roman","margin-box","match-parent","match-source","max-content","message-box","min-content","n-resize","ne-resize","nesw-resize","no-clip","no-close-quote","no-common-ligatures","no-contextual","no-discretionary-ligatures","no-drop","no-historical-ligatures","no-open-quote","no-punctuation","no-repeat","not-allowed","ns-resize","nw-resize","nwse-resize","oldstyle-nums","open-quote","padding-box","petite-caps","pre-line","pre-wrap","proportional-nums","proportional-width","repeat-x","repeat-y","row-resize","row-reverse","ruby-base","ruby-base-container","ruby-text","ruby-text-container","run-in","s-resize","sans-serif","scale-down","scroll-position","se-resize","self-end","self-start","semi-condensed","semi-expanded","sideways-lr","sideways-right","sideways-rl","simp-chinese-formal","simp-chinese-informal","slashed-zero","small-caps","small-caption","soft-light","space-around","space-between","space-evenly","spell-out","stacked-fractions","status-bar","step-end","step-start","stroke-box","sw-resize","system-ui","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row","table-row-group","tabular-nums","titling-caps","trad-chinese-formal","trad-chinese-informal","ui-monospace","ui-rounded","ui-sans-serif","ui-serif","ultra-condensed","ultra-expanded","upper-alpha","upper-armenian","upper-latin","upper-roman","vertical-lr","vertical-rl","vertical-text","view-box","w-resize","wrap-reverse","x-fast","x-high","x-loud","x-low","x-slow","x-soft","x-strong","x-weak","zoom-in","zoom-out"];const a=function(e,r,t,o){const a=e=>e.join("-"),s=t||{row:{reverse:a},other:{horse:a}};let i=r.length,l=0,u=r.length+1,c=0,p=[];for(;l<i&&c<u;){let e=r.slice(l),[t,a]=n(e,s,o);l+=a,c+=1,p.push(t)}return p},n=function(e,r,t){let o,a,n,s=r,i=0;for(;i<e.length;i++){n=e[i],o=t?t.get(n):n;let r=s[o];if(null==r)break;a=s=r}if(a){const r=e=>e.join("-");let t=a[o];return null==t&&(t=r),[t(e.slice(0,i+1)),i+1]}return[e[0],1]};ClassGraph.addons.forwardReduceValues=e=>r.installPropArray(o),ClassGraph.prototype.forwardReduceValues=a,ClassGraph.prototype.valuesGraph={microGraph:t,words:r}})();
