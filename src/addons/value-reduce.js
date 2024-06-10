

/* The words map lists all the unique string CSS values. Each word maps to an
 integer, used for the microGraph key.

    words = {
        'all' => 0,
        'petit' => 1,
        ...
    }
*/
;(()=>{


class Words extends Map {
    wordCounter = 1

    getKey(f) {
        let pos = words.get(f)
        if(pos == undefined) {
            words.set(f, this.wordCounter)
            pos = this.wordCounter;
            this.wordCounter++;
        }
        return pos;
    }

    /*
    Given a dash-split-string, return a return of resolved positions.
        stringToBits('all-petite')
        [0, 1]
     */
    stringToBits(s, sep='-') {
        let items = s.split(sep)
            , res = [];
        items.forEach((f, j, b)=> res.push(this.getKey(f)))
        return res
    }

    stringToNest(s, root={}) {
        // split
        let items = s.split('-')
        // flatgraph
        var place = root;
        let res = place;
        let il = items.length;
        items.forEach((f, j, b)=>{
            let pos = this.getKey(f);
            let endleaf = j == il-1
            if(place[pos] == undefined) {
                place[pos] = place = endleaf? null: {} //p: pos }
            } else {
                // if(place[pos] == null) {
                //     place[pos] = {}
                // }
                place = place[pos];
            }
        })
        return res;
    }

    installPropArray(words){
        words.forEach((e,i,a)=>{
            // let bits = stringToNest(e, microGraph)
            this.stringToNest(e, microGraph)
        })
    }

    insertBitKey(s, g=microGraph) {
        return this.stringToNest(s, g)
    }

    wordsToOrderedArray() {
        let res = new Array(this.size)
        this.forEach((index,key,a)=>res[index] = key)
        return res;
    }

    wordsToArrayString(indent=0, small=false){
        if(!small) {
            return JSON.stringify(wordsToOrderedArray(), null, indent)
        }

        return wordsToOrderedArray().join(' ')
    }

    wordsToObjectString(indent=0, small=false) {
        if(!small) {
            return JSON.stringify(Object.fromEntries(this), null, indent)
        }

        let res = ''
        this.forEach((e,i,a)=>res+=[i,e].join(''))
        return res;
    }

    graphToArrayListString(o=microGraph, indent=0, blank=0){
        return JSON.stringify(this.graphToArrayListRecurse(o, indent, blank))
    }

    graphToArrayListRecurse(o=microGraph, indent=0, blank=null){
        let res = [];
        let entries = Object.entries(o)
        for(let pair of entries){
            let d = pair[1];
            res.push([
                parseInt(pair[0])
                , d == null? blank: this.graphToArrayListRecurse(d, indent, blank)
            ])
        }
        // return JSON.stringify(res, null, indent)
        return res
    }

    graphToObjectString(indent=0){
        let res = {}
        for(let k in microGraph){
            res[parseInt(k)] = microGraph[k]
        }
        return JSON.stringify(res, null, indent)
    }
}


const words = new Words()
    , microGraph = {}
    , dashprops = [
        "all-petite-caps",
        "all-scroll",
        "all-small-caps",
        "allow-end",
        "alternate-reverse",
        "arabic-indic",
        "auto-fill",
        "auto-fit",
        "avoid-column",
        "avoid-page",
        "avoid-region",
        "balance-all",
        "bidi-override",
        "border-box",
        "break-all",
        "break-spaces",
        "break-word",
        "cjk-decimal",
        "cjk-earthly-branch",
        "cjk-heavenly-stem",
        "cjk-ideographic",
        "close-quote",
        "closest-corner",
        "closest-side",
        "col-resize",
        "color-burn",
        "color-dodge",
        "column-reverse",
        "common-ligatures",
        "content-box",
        "context-menu",
        "crisp-edges",
        "decimal-leading-zero",
        "diagonal-fractions",
        "disclosure-closed",
        "disclosure-open",
        "discretionary-ligatures",
        "double-circle",
        "e-resize",
        "each-line",
        "ease-in",
        "ease-in-out",
        "ease-out",
        "ethiopic-numeric",
        "ew-resize",
        "extra-condensed",
        "extra-expanded",
        "farthest-corner",
        "farthest-side",
        "fill-box",
        "flex-end",
        "flex-start",
        "flow-root",
        "force-end",
        "from-image",
        "full-size-kana",
        "full-width",
        "hard-light",
        "high-quality",
        "hiragana-iroha",
        "historical-forms",
        "historical-ligatures",
        "horizontal-tb",
        "inline-block",
        "inline-flex",
        "inline-grid",
        "inline-table",
        "inter-character",
        "inter-word",
        "isolate-override",
        "japanese-formal",
        "japanese-informal",
        "jump-both",
        "jump-end",
        "jump-none",
        "jump-start",
        "justify-all",
        "katakana-iroha",
        "keep-all",
        "korean-hangul-formal",
        "korean-hanja-formal",
        "korean-hanja-informal",
        "line-through",
        "lining-nums",
        "list-item",
        "literal-punctuation",
        "lower-alpha",
        "lower-armenian",
        "lower-greek",
        "lower-latin",
        "lower-roman",
        "margin-box",
        "match-parent",
        "match-source",
        "max-content",
        "message-box",
        "min-content",
        "n-resize",
        "ne-resize",
        "nesw-resize",
        "no-clip",
        "no-close-quote",
        "no-common-ligatures",
        "no-contextual",
        "no-discretionary-ligatures",
        "no-drop",
        "no-historical-ligatures",
        "no-open-quote",
        "no-punctuation",
        "no-repeat",
        "not-allowed",
        "ns-resize",
        "nw-resize",
        "nwse-resize",
        "oldstyle-nums",
        "open-quote",
        "padding-box",
        "petite-caps",
        "pre-line",
        "pre-wrap",
        "proportional-nums",
        "proportional-width",
        "repeat-x",
        "repeat-y",
        "row-resize",
        "row-reverse",
        "ruby-base",
        "ruby-base-container",
        "ruby-text",
        "ruby-text-container",
        "run-in",
        "s-resize",
        "sans-serif",
        "scale-down",
        "scroll-position",
        "se-resize",
        "self-end",
        "self-start",
        "semi-condensed",
        "semi-expanded",
        "sideways-lr",
        "sideways-right",
        "sideways-rl",
        "simp-chinese-formal",
        "simp-chinese-informal",
        "slashed-zero",
        "small-caps",
        "small-caption",
        "soft-light",
        "space-around",
        "space-between",
        "space-evenly",
        "spell-out",
        "stacked-fractions",
        "status-bar",
        "step-end",
        "step-start",
        "stroke-box",
        "sw-resize",
        "system-ui",
        "table-caption",
        "table-cell",
        "table-column",
        "table-column-group",
        "table-footer-group",
        "table-header-group",
        "table-row",
        "table-row-group",
        "tabular-nums",
        "titling-caps",
        "trad-chinese-formal",
        "trad-chinese-informal",
        "ui-monospace",
        "ui-rounded",
        "ui-sans-serif",
        "ui-serif",
        "ultra-condensed",
        "ultra-expanded",
        "upper-alpha",
        "upper-armenian",
        "upper-latin",
        "upper-roman",
        "vertical-lr",
        "vertical-rl",
        "vertical-text",
        "view-box",
        "w-resize",
        "wrap-reverse",
        "x-fast",
        "x-high",
        "x-loud",
        "x-low",
        "x-slow",
        "x-soft",
        "x-strong",
        "x-weak",
        "zoom-in",
        "zoom-out"
    ];


var installReceiver = function() {
    ClassGraph.addons.forwardReduceValues = (cg) => words.installPropArray(dashprops)
    ClassGraph.prototype.forwardReduceValues = forwardReduceValues
    ClassGraph.prototype.valuesGraph =  { microGraph, words }
}


const arrayStringMunger = function(str) {
    /* given the string, crush it futher.*/
    let dmap = {
        // '[': { active: false, current: 0, max: -1}
        // , ']': { active: false, current: 0, max: -1}
    }

    let actives = [];

    for(let c of str) {
        if(dmap[c] == undefined) {
            // new position
            dmap[c] = { active: false, current: -1, max: -1, total: 0}
        }

        if(dmap[c].active) {
            // was active. just append and continue.
            dmap[c].current += 1;
        } else {
            // Close any alive, finalise the max.
            // for(let k in dmap) {
            //     if(k == c) {
            //         // The same object doesn't turn off.
            //         continue
            //     }
            //     dmap[k].active = false
            //     dmap[k].max = Math.max(dmap[k].max, dmap[k].current)
            //     // We set current to 0 here (not -1),
            //     dmap[k].current = 0
            // }
            let cStash = dmap[c].current
            for(let o of actives) {
                o.active = false
                o.max = Math.max(o.max, o.current)
                o.current = 0
            }

            actives = [dmap[c]]
            dmap[c].active = true
            dmap[c].total += 1
            dmap[c].current = cStash + 1;
        }
    }
    for(let o of actives) {
        o.active = false
        o.max = Math.max(o.max, o.current)
        o.current = 0
    }
    return dmap
}


/*
 Return a list of `values` to replace the given `values` , used as the
 key-sets used for the css class generation.

        props = ['flex', 'direction']
        vals = ['fridge', 'row', 'reverse', 'other', 'horse', 'chicken'],

    forwardReduceValues(props, vals, microGraph, words)
    ['fridge', 'row-reverse', 'other', 'horse', 'chicken']

    insertBitKey('other-horse', microGraph);

    forwardReduceValues(props, vals, microGraph, words)
    ['fridge', 'row-reverse', 'other-horse', 'chicken']

Some values may need re-merging after the simple `.split(-)`,
such as "row-reverse" for flow-direciton. */
const forwardReduceValues = function(props, values, microGraph, translations) {

    const merge = (v)=> v.join('-');

    const _graph = microGraph || {
        'row': {
            'reverse': merge
        }
        , 'other': {
            'horse': merge
        }
    }

    let len = values.length
        , position = 0
        , max = values.length + 1
        , count = 0
        , response = []
        ;

    while(position < len && count < max) {
        /* We provide a slice from the last position until the end. */
        let sliced = values.slice(position)
        /* The sub function returns the first resolved or unresolved key.
        and an index of offset, as to how many parts the digest used. */
        let [key, usedCount] = popOneValueForward(sliced, _graph, translations)
        position += usedCount
        count += 1
        response.push(key)
    }

    return response
}


const popOneValueForward = function(values, microGraph, translations) {

    let current = microGraph
        , path = []
        , position
        , popped
        , key
        , i = 0
        ;

    for (; i < values.length; i++) {
        key = values[i]
        position = translations? translations.get(key): key
        let next = current[position]
        if(position) { path.push(key) }
        if(next == undefined) { break }
        popped = current = next
    }


    if(popped) {
        const merge = (v)=> v.join('-');
        let location = popped[position]
        if(location == undefined) { location = merge };
        let newKey = location(values.slice(0, i+1))
        return [newKey, i+1]
    }

    return [values[0], 1]
}


;installReceiver();

})()