
//;(()=>{

var installReceiver = function() {

    let keys = new Set([
        /* Hex is a freebie, under the special term `#` hash: #000000 */
        // 'hex',
        /* Color property is slightly more complicated, with the first param
        as a forced string. */
        // 'color',

        /* Available types, each act the same way: rgb-[3 values][/A]
        If the key is a mismatch, its ignored. */
        'rgb',
        'hsl',
        'hwb',
        'lab',
        'lch',
        'oklab',
        'oklch',
    ])

    ClassGraph.addons.extendedColorValues = function(cg){
        let func = function(prop, values) {
            return forwardHotWordReduce(prop, values, keys)
        }
        cg.reducers.push(func)
    }
}


/* Return a boolean if the detected type is a valid css value of type:

    Number:     0 | 0.0
    Percent:    0%
    Opacity:    0/0
    Angle:      0turn | 0rad
*/
const isNumOrPerc = function(value) {
    return isNumber(value) || isPercent(value) || isOpacityNum(value) || isAngle(value)
}

/* Return boolean for the match of a css value with an alpha: 0/0 */
const isOpacityNum = function(value) {
    // '60%/0.8'
    let spl = value.split('/')
    if(spl.length == 2) {
        return isNumOrPerc(spl[0]) && isNumber(spl[1])
    }
    return false
}

const isAngle = function(value) {
    let types = new Set(["deg","grad","rad","turn"]);
    let extra = value.slice(parseFloat(value).toString().length, value.length)
    return types.has(extra)
}


const isPercent = function(value) {
    return value.endsWith('%') && isNumber(value.slice(0, value.length-1))
}


const isNumber = function(value) {
    if(value == undefined || value.length == 0){ return false };
    let isNum = !isNaN(Number(value))
    return isNum
}


const asThreeBitColor = function(values) {
    let ex = values.slice(4, 5)
    let alp = ''
    if(ex.length>0) {
        alp = `/${ex}`
    }
    return `${values[0]}(${values.slice(1, 4).join(' ')}${alp})`
}


/* Perform a _hot word_ detection on the values recursively. A _hot word_ may be any key.

    forwardHotWordReduce(
        ['color']
        , ['rgb', '10', '10', '10', 'eggs']
        , new Set(['rgb'])
    )

For each forward step detect a key, if found the reducer collects as many
forward properties as required, then releases after the first fail.

This method then performs this after every release, concatenating changed and
unchanged into a response list.

    rgb-200-200-200-foo

    rgb(200 200 200) foo

 */
const forwardHotWordReduce = function(props, values, keys, keyTestFunc=undefined) {
    /*
        Key pops early, and can accept a variable amount of vars.
     */

    let len = values.length
        , position = 0
        , max = values.length + 1
        , count = 0
        , response = []
        ;

    while(position < len && count < max) {
        let sliced = values.slice(position)
        let [key, usedCount] = hotWordReduce(sliced, keys, true, keyTestFunc)

        position += usedCount
        count += 1
        if(Array.isArray(key)) {
            response = response.concat(key)
        } else {
            response.push(key)
        }
    }

    return response
}

/* Perform a _hot word_ detection on the values. A _hot word_ may be any key.

    forwardHotWordReduce(
        , ['rgb', '10', '10', '10', 'eggs']
        , new Set(['rgb'])
        , true
    )

    rgb(200 200 200) // break early
    rgb(200 200 200) egg

For each forward step detect a key, if found the reducer collects as many
forward properties as required, then releases after the first fail if `breakEarly` is true.

    rgb-200-200-200-foo-hsl-20-0%-10-foo

    rgb(200 200 200) foo hsl(20 0% 10) foo

 */

const hotWordReduce = function(values, keys
                            , breakEarly=false
                            , callback=asThreeBitColor
                            , keyTestFunc=undefined) {

    var i = 0;
    let inSet = (x) => keys.has(x)
        , keyStartMatch = keyTestFunc != undefined? keyTestFunc: inSet
        , l = values.length
        , bits = []
        , kept = []
        , lost = []
        , max = 4 // can be 3 or 4
        ;

    for (;i < l; i++) {
        // console.log('---')
        let k = values[i];
        let inI = i;
        if(keyStartMatch(k)) {
            // console.log(i, 'MATCH', k)
            let j = i+1
            kept = [k]
            lost = []
            let ok = true
            while(ok && j < l) {
                let subI = j;
                let subK = values[subI];
                let isNum = isNumOrPerc(subK)
                ok = isNum && j < l && kept.length <= (max-1) // +1 for the original key
                if(isNum) {
                    // console.log('Push', subK)
                    j += 1
                    kept.push(subK)
                    ok = ok && kept.length <= max // +1 for the original key
                } else {
                    // Lost stack
                    // console.log('Lost stack on', subK)
                    // j = 1
                    lost.push(subK)
                }
                // console.log('S', subI, subK, isNum, ok)
            }

            let [a,b] = [inI, j]
            // console.log('a,b ',a, b, values.slice(a,b), kept)
            let plucked = kept.slice(a, b);
            let newEntry = callback(kept)
            if(plucked.length < 3) {
                // console.log('Failed.', bits)
                bits = bits.concat(kept)
                if(breakEarly) {
                    return [bits, j]
                }
            } else {
                // console.log('kept', kept, newEntry)
                // console.log('plucked', plucked)
                bits.push(newEntry)
                // Push back 2, as we landed on the bad node,
                // and we need step into this node, to stack it.
                //
                i = j-1
            }
        } else {
            // console.log(i, k)
            bits.push(k)

            if(breakEarly) {
                let [a,b] = [inI, kept.length]
                // console.log('a,b ',a, b, values.slice(a,b), kept)
                let plucked = kept.slice(a, b);
                let newEntry = callback(kept)
                // console.log('plucked', plucked)
                // console.log('kept', kept)
                if(kept.length < 3) {
                    // console.log('Failed.', 'kept', kept, 'plucked', plucked)
                    return [values[b], kept.length+1]
                } else {
                    // console.log('success.')
                    return [newEntry, kept.length]
                }

                return [values[0], 1]
            }
        }
    }

    // console.log('Done pop', i)
    // console.log('in', values, 'out', bits)

    let newEntry = callback(kept)
    return [newEntry, i+1]
}


;installReceiver();

// })()
/**
 * # Events event-[eventName]-[action]-[params]*
 *
 * Create event handlers for actions on an entity.
 *
 * For example on "click" event, toggle the class "border-var-generic-border"
 *
 *      "event-click-toggle-border-var-generic-border"
 *
 */
;(function(){

    let cg;

    const insertReceiver = function(){
        console.log('event receiver')

        ClassGraph.addons.eventsReceiver = function(_cg){
            cg = _cg;
            cg.insertReceiver(['event'], eventReceiver)
        }

        // ClassGraph.addons.varTranslateReceiver = function(_cg){
        //     cg = _cg;
        //     cg.insertTranslator('var', mouseReceiver)
        // }
    }

    const eventReceiver =  function(splitObj, index) {

        // console.log('running on', splitObj)
        values = splitObj.values

        let [action, ...others] = splitObj.values;
        if(document[`on${action}`] !== undefined){
            // can be null or function to be defined.
            const target = splitObj.origin
            addHandler(splitObj, target, action, others)
        } else {
            console.warn('Unknown action', action)
        }
        // return ''
    }

    const addHandler = function(splitObj, target, action, others) {
        // console.log('action', action, others, target)
        let func = (e)=>actionHandler(e, action, others)
        let dsn = `polyaction_${action}`;
        if(target.dataset[dsn] === undefined) {
            target.addEventListener(action, func)
            target.dataset[dsn] = true
        } else {
            console.log('Event already exists:', action)
        }
    }

    /* The generic action handler for an event.
    Farm the action to the programmed destination */
    const actionHandler = function(e, action, others) {
        let [innerAction, ...parts] = others
        console.log(e, action, others)
        console.log(innerAction, parts)
        const innerActionMap = {
            call(){
                /* Perform a functional call to the given function name.*/
            }
            , toggle() {
                /* Perform a class "toggle" in some shape. */
                console.log(parts, others, action)
                e.currentTarget.classList.toggle(parts.join('-'))
            }
            , setvar() {
                /* Set the variable name to the given value */
            }
        }

        let innerFunc = innerActionMap[innerAction]
        if(innerFunc) {
            innerFunc()
        }
    }

    ;insertReceiver();
})()

/**
 * # Font Pack
 * Install a "font-pack-*" receiver, allowing the automatic collection
 * of google fonts.
 *
 * + detect named fonts
 * + Install google font header
 * + create font classes
 * + Generate the assigned class
 *
 * The definition for a font mimics the font string for a google-font, for example
 *
 *      font-pack-roboto-400
 *
 * It can be extended to include multiple sizes. an `i` prefix denoted italic_:
 *
 *      font-pack-roboto-100-400-900-i300
 *
 * Multple fonts can be stacked, spaces in fonts are `+`:
 *
 *      font-pack-roboto-400-i900-roboto+mono-300-i300-400-i400
 *
 * The receiver detects the break between `i900-roboto+mono` because `rob...`
 * is not a font-weight type.
 *
 * This _defines_ the font, writing a the availble font styles
 * e.g. `font-roboto-400`
 *
 * the receiver detects the key `font-roboto-*`, others include:
 *
 * + font-robot-100
 * + font-robot-i900
 * + font-robot+mono-400
 *
 * Applied to the chosen node. This can work on the body, provide defaults for
 * all nodes:
 *
 *     <body class="font-roboto-400">
 *         <div id="demo_space" class='font-pack-roboto-400-900-i400'>
 *         </div>
 *     </body>
 *
 *
 */
;(function(){

    let cg;

    /**
     * The _automatic_ function called at the base of this iffe to
     * install the `font-pack-*` tokens into the class graph.
     *
     * @return {undefined}
     */
    const insertReceiver = function(){
        // console.log('font-pack insertReceiver')

        /**
         * Install the dynamic sheet addon `fontPackReceiver` of which
         * is called when the dcss is prepared.
         * @param  {ClassGraph} _cg An instance of the live class graph
         * @return {undefined}
         */
        DynamicCSSStyleSheet.addons.fontPackReceiver = function(_cg){
            cg = _cg;
            cg.insertReceiver(['font', 'pack'], fontPackReceiver)
        }
        ClassGraph.prototype.generateGoogleLinks = generateGoogleLinks
        ClassGraph.prototype.installGoogleLinks = installGoogleLinks
    }

    /**
     * The handler function given to the dynamic css stylesheet, called
     * when the dcss is prepared.
     *
     * This function activates upon a `font-pack-*` a tree call, converting
     * the leaf object to a font family string.
     * Once generated a new <link> is applied to the HTML head
     *
     * @param  {object} obj  A definition generated by the class graph discovery
     * @return {undefined}
     */
    const fontPackReceiver =  function(obj) {

        // Tokenize as a family string.
        //
        const values = obj.values, origin = obj.origin;
        let fonts = createFontObjects(values, origin, obj)
        let familyStrings = createFamilyString(values, fonts, origin)

        // let families = tokenize(values)
        installGoogleLinks(familyStrings)

        // Install additional css additions
        installFontObjects(fonts, obj)
    }

    const installGoogleLinks = function(familyStrings, display) {
        // install as header <link> items
        // console.info('Installing Google fonts: familyStrings:', familyStrings)
        return generateGoogleLinks(familyStrings, display).forEach((x)=>document.head.appendChild(x))
    }

    const installFontObjects = function(fonts, splitObj) {

        // // For value create a font-family;
        for(let pack of Object.values(fonts)) {
            let name = pack.first
            let replaceFunc = ($, ofs) => (ofs ? ' ' : "") //+ $.toLowerCase()
            let cleanName = toTitleCase(name.replace(/[+]/g, replaceFunc))
            // console.log('Installing Font', cleanName)//, pack)
            pack.cleanName = cleanName
            pack.definition = makeDefinitions(pack)
            let installed = cg.dcss.addStylesheetRules(pack.definition);
            installed.renderAll()
        }
    }

    const toTitleCase = function(str) {
        /*convert a string (expected font string) to a title case version
        This also title-cases +prefix string

            foo bar     Foo Bar
            foo+bar     Foo+Bar
        */
        return str.replace(/(^|[\s+])\S/g, function(t) { return t.toUpperCase() });
    }

    // window.toTitleCase = toTitleCase

    const createFamilyString = function(values, fonts, origin) {
        fonts = fonts || createFontObjects(values, origin)
        let fs = function(e) {
            return `family=${e.str}`
        }

        return Object.values(fonts).flatMap((e)=>fs(e)).join('&')
    }

    const makeDefinitions = function(pack) {
        /*
            .roboto-i400 {
                font-family: Roboto;
                font-weight: 300;
                font-style: italic;
            }

        pack:
            cleanName:"Roboto"
            first:"roboto"
            formatStringParts:(2) ['ital', 'wght']
            str:"Roboto:ital,wght@0,100;0,400;0,900;1,300;1,400;1,700;1,900"
            titleToken:"Roboto"
            tokens:
                100:{int: 100, regu: 1}
                300:{int: 300, ital: 1}
                400:{int: 400, regu: 1, ital: 1}
                700:{int: 700, ital: 1}
                900:{int: 900, regu: 1, ital: 1}
         */
        let res = {}
        const asSelector = cg.asSelectorString.bind(cg)
        for(let token of Object.values(pack.tokens)) {
            // console.log('making on token' , token)
            let def = {
                'font-weight': token.int
                , 'font-family': `'${pack.cleanName}', ${pack.defaultFonts}`
            }
            let selectorBits = ['font', pack.first]

            for(let key of token.keys) {
                let newDef = Object.assign({}, def)
                if(key.isItal) {
                    newDef['font-style'] = 'italic'
                }

                let selectorRange = selectorBits.concat([key.token])
                let packName = asSelector(selectorRange)
                let packNameLower = asSelector(selectorRange).toLowerCase()
                // console.log(packName, newDef)
                res[`${packName}, ${packNameLower}`] = newDef
            }

        }

        // Produce a default, withouta size: "font-pack-alta-400-500-600"
        // font-alta-400, ..., font-alta
        let fontOnlyPlusName = asSelector(['font', pack.first])
        let fontOnlyDashName = asSelector(['font'].concat(pack.first.split('+')))
        let strings = new Set([
                        fontOnlyPlusName
                        , fontOnlyDashName
                        , fontOnlyPlusName.toLowerCase()
                        , fontOnlyDashName.toLowerCase()
                        ])

        res[Array.from(strings).join(', ')] = {
                'font-family': `'${pack.cleanName}', ${pack.defaultFonts}`
            }
        return res
    }

    /*
        Given a list of keys, return class-name properties with any
        matching key.

            "font-pack-roboto default-sans-serif"

            getSiblingMutators(['default'], origin)

            default: 'sans-serif
     */
    const getSiblingMutators = function(keys, origin) {
        let results = cg.filterSplit(origin, keys, true)
        // console.log('getSiblingMutators', results)
        return results
    }

    const createFontObjects = function(values, origin, splitObj) {
        // family=Roboto:wght@300
        // let familyStrings = '' //"family=Roboto:wght@300"
        let index = 0
        let fonts = {}
        let _origin = splitObj?.origin || origin;
        let currentFont;
        let regex = /([a-zA-Z-]{0,}?)(\d+)/;
        let REGULAR = 'r' // a no definition (standard) font
        /*
           skip bad tokens
         */
        let skipEmpty = true
        /*
            Enable many fonts to be applied within one class-name
            If false, the string will be classified as a bad tokenised
            string and any _additional_ bad token properties are
            considered Values.
         */
        let manyFont = true
        /*
            If true, allow the appliance of modifiers with an index
            before the primary class.
            If False, the modifier is ignored
         */
        let softIndex = true
        /*
            If true, error out if the modifier index is above the
            primary class index.
            If False, the contribution will continue and potentially
            allow the softmax to continue.
         */
        let errorSoftIndex = false
        // capture the default font from an additional class.
        let sibling = getSiblingMutators(['default'], _origin)
        let defaultFont = 'sans-serif'
        let d = sibling['default']
        if(d) {
            if(d.index <= splitObj.index) {
                // The modifier class is applied before the appliance class.
                // if softIndex = True, allow it.
                // if false, ignore it.
                let func = softIndex? 'warn': 'error'
                let s = 'font default-* modifier should be indexed after font'
                console[func](s)
                if(!softIndex) {
                    // ignore this entry
                    if(errorSoftIndex) {
                        throw new Error(s)
                    }
                } else {
                    // Apply anyway
                    defaultFont = d.values.join(' ')
                }
            } else {
                defaultFont = d.values.join(' ')
            }

        }

        for(let t in values) {

            // A token will be a name or a format type.
            // iterate forward. Test n+1; if n+1 is not a weight, break
            // else continue digesting the weights until a not weight is met.
            // This produces a object dict of { value, font, weights }
            /*
                for token in tokens:
                    if token is not value-like:
                        fonts[token] = current_font = { token, weights:[

                        ] }
                    else:
                        current_font.weights += token

             */
            let token = values[t]

            // if token is weight, stack into the previous (current) font.
            if(index == 0) {
                // the first token should be a font.
                fonts[index] = { first: token, tokens:{}, defaultFonts: defaultFont }
                currentFont = index
                index++;
                continue
            }

            let [prefix, int] = [null, null]
            try{
                // if match int, {v|r|i}int, stack, else continue.
                let _;
                [_, prefix, int] = token.match(regex);
                // console.log(prefix || REGULAR, int)
                if(prefix.length == 0) {
                    prefix = REGULAR
                }
            } catch {
                if(manyFont) {
                    // regenerate the current font and continue forward.
                    // console.log('Building font space', token)
                    fonts[index] = { first: token, tokens:{} }
                    currentFont = index
                    index++;
                    continue
                } else {

                    // bad token
                    if(token.length == 0
                        && skipEmpty == true) {
                        //skip the empties
                        index++;
                        continue
                    }
                    console.warn(`Bad token: "${token}"`)
                }
            }

            let prefixMap = {
                // Here we flag italic or regular.
                // Google fonts accept a formatter "ital,wght" and a value "0,100"
                // italic flag 1: "1,100"
                null: function(){ /* do nothing */ return { regu: 1, wasNull: 1} }
                , 'i': function(){ /* flag italic */  return { ital: 1 } }
                , 'r': function(){ /* flag regular */ return { regu: 1 } }
            }

            let weightDef = {
                int: Number(int)

            }

            if(weightDef.int == 0) {
                // The given weight is likely wrong.
                console.warn('Skipping zero weighted item')
                index++;
                continue
            }

            for(let bit in prefix) {
                let v = prefix[bit]
                let actuator = prefixMap[v]
                Object.assign(weightDef, actuator())
            }

            // console.log('weightDef', weightDef);

            let existing = fonts[currentFont]?.tokens[int] || {};

            Object.assign(existing, weightDef)
            // console.log('Adding to existing keys', token)
            if(existing.keys == undefined) {
                existing.keys = new Set
            }
            existing.keys.add({ isItal: weightDef.ital, token})
            fonts[currentFont].tokens[int] = existing;
            index++;
        }

        return stringifyTokenized(fonts);
    }

    const stringifyTokenized = function(fonts){
        // now make family strings on each type
        for(let i in fonts) {
            let pack = fonts[i]

            if(pack.first.length == 0) {
                //skip blank entries
                continue
            }

            extendPack(pack)
        }


        return fonts
    }

    /*
    Ensure the pack contains one or more tokens.

    This mutates pack.tokens if no tokens are given.
    returns a list of tokenValues, or the _tokens_ of the pack.
     */
    const ensureTokens = function(pack) {

        let tokenValues = Object.values(pack.tokens)

        if(tokenValues.length == 0) {
            pack.tokens["400"] = {
                    int: 400,
                    regu:1,
                    keys: new Set([
                            { isItal: undefined, token: "400"}
                          ])
                } // Install a default font size
        }

        return Object.values(pack.tokens)
    }

    const extendPack = function(pack) {
        let titleToken = toTitleCase(pack.first)
            , tokenValues = ensureTokens(pack)
            , allTokens = Object.assign({}, ...tokenValues)
            , hasItal = allTokens.ital != undefined
            , formatStringParts = []
            , weightValues = new Set
            ;

        if(hasItal) { formatStringParts.push('ital') }
        if(hasItal || allTokens.regu) { formatStringParts.push('wght') }


        for(let key in pack.tokens) {
            let token = pack.tokens[key]
                , ital = token.ital? 1: 0
                , int = token.int
                , a = hasItal? [ital]: []
                ;

            a.push(int)
            let weightStr = a.join(',')
            weightValues.add(weightStr)

            if(token.regu != undefined) {
                let a0 = hasItal? [0]: []
                a0.push(int)
                let regWeightStr = a0.join(',')
                weightValues.add(regWeightStr)

            }
        }

        let weights = Array.from(weightValues).sort()

        let totalWeightStr = weights.join(';')
        let formatString = formatStringParts.join(',')
        let str = `${titleToken}:${formatString}@${totalWeightStr}`

        Object.assign(pack, {
            weights
            , formatStringParts
            , titleToken
            , str
        })
    }

    const generateGoogleLinks = function(familyStrings, display='swap'){

        let a = getOrCreateLink('link', 'preconnect', {
            href: "https://fonts.googleapis.com"
        })

        let b = getOrCreateLink('link', 'preconnect', {
            href: "https://fonts.gstatic.com"
            , crossorigin: ''
        })

        let ds = display == null? '': `&display=${display}`

        let c = getOrCreateLink('link', "stylesheet", {
            href:`https://fonts.googleapis.com/css2?${familyStrings}${ds}`
        })

        return [a,b,c]
    }

    let linkCache = {}

    /*
        Create a link node

            let b = getOrCreateLink('link', 'preconnect', {
                href: "https://fonts.gstatic.com"
                , crossorigin: ''
            })

            let c = getOrCreateLink('link', "stylesheet", {
                href:`https://fonts.googleapis.com/css2?${familyStrings}&display=swap`
            })
     */
    const getOrCreateLink = function(href, rel, opts) {
        let v = {
            rel, href
        }
        Object.assign(v, opts || {})
        let conv = JSON.stringify
        let cached = linkCache[conv(v)]
        if(cached){
            return cached
        }

        return linkCache[conv(v)] = createNode('link', v)
    }

    const createNode = function(name, attrs) {
        if(attrs == undefined && typeof(name) != 'string') {
            attrs = name;
            name = attrs.localName
            if(name == undefined) {
                throw Error('createNode requires a localName within a object definition')
            }
        }

        let node = document.createElement(name)
        for(let key in attrs) {
            node.setAttribute(key, attrs[key])
        }
        return node
    }

    ;insertReceiver();

    return fontPackReceiver

})()

;(function(){

    let cg;
    let rootDeclaration = {};
    let definition = undefined
    let rootRule;

    const insertReceiver = function(){

        ClassGraph.addons.functionsReceiver = function(_cg){
            cg = _cg;
            cg.keyValueFunctions.set('forceGreen', forceHook)
            cg.keyValueFunctions.set('force', forceHook)
            cg.keyValueFunctions.set('raise', raiseHook)
        }
    }

    const forceHook = function(value, token, index, splitObj) {
        // console.log('Force green hook', token, splitObj)
        let res = token.value.slice(0, token.match.start)
        // console.log(res)
        // return res

        return token.args.length > 0? token.args[0]: 'green'
    }

    const raiseHook = function(value, token, index, splitObj) {
        console.log('raise hook', token, splitObj)
        let res = token.value.slice(0, token.match.start)
        console.log(res)
        // return res
    }

    const functionsHook = function(d) {

        // target = document.querySelector(target)
        console.log('functions', d)
    }


    ;insertReceiver();
})()

class PolyclassIcons {

}

;(function(){

    let cg;
    const insertReceiver = function(){

        ClassGraph.addons.iconReceiver = function(_cg){
            cg = _cg;

            // Capture a single key
            // cg.insertTranslator('var', variableDigest2)
            cg.insertReceiver(['icon', 'pack'], iconPackReceiver)
            // cg.insertReceiver(['icon'], iconReceiver)
        }
    }

    const titleCase = (words) => words.map(function(word) {
            return word.charAt(0).toUpperCase() + word.substring(1, word.length);
        });

    const iconPackReceiver =  function(obj) {

        let key = titleCase(obj.values).join('+')
        let family = `Material+Symbols+${key}`
        let defaultFontSettings = {
            FILL: 1,
            wght: 500,
            GRAD: 200,
            opsz: 48
        }
        /* Options for the _variable font_ These don't change.*/
        let opts=  {
            opsz: "20..48",
            wght: "100..700",
            FILL: "0..1",
            GRAD: "-50..200",
        }
        let familyString = toGoogleFontParamsStr(opts)
        let fontStr = `family=${family}:${familyString}`

        let receiverBits = [...obj.values, 'icon']

        /* Install a new class, capturing: `[variant]-icon-*`
        The variant is the _style_ of icon, such as "outlined" or "sharp". */
        cg.insertReceiver(receiverBits, iconReceiver)


        /*Leverage the font installer, using the fonter and  the name given.*/
        Polyclass.graph.installGoogleLinks(fontStr, null)

        /* Install the css class rule object */
        installSheetRules(obj, fontSettings)

        // let opts = `opsz,wght,FILL,GRAD
        //             @20..48,100..700,0..1,-50..200`
        //
        // let example = `https://fonts.googleapis.com/css2?
        //         family=Material+Symbols+Outlined:
        //         opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200`
        //
    }

    const installSheetRules = function(obj, fontSettings){
         /*.material-symbols-sharp  {
                font-variation-settings:
                    'FILL' 0,
                    'wght' 500,
                    'GRAD' 200,
                    'opsz' 48;
                font-size: inherit;
            }*/
        let key = obj.values[0]
        let rules = {}

        let fontSettingsStr = toObjectParamStr(fontSettings)
        let conf = {
                'font-variation-settings': `${fontSettingsStr}`,
                'font-size': 'inherit',
            }

        rules[`.material-symbols-${key}`] = conf
        let items = cg.dcss.addStylesheetRules(rules)

        items.renderAll()
    }

    const toObjectParamStr = function(obj) {
        /*Given an object, convert it to a string, compatible with an object-like
        CSS String:

            {
                FILL: 1,
                wght: 500,
                GRAD: 200,
                opsz: 48
            }

        Return a multiline string, with the properties string wrapped:

            'FILL' 1,
            'wght' 500,
            'GRAD' 200,
            'opsz' 48
        */
        let fontSettingsStr = '';
        let fKeys = Object.keys(obj)
        for (var i = 0; i < fKeys.length; i++) {
            let k = fKeys[i]
            let v = obj[k]
            let last = i == fKeys.length-1
            let end = last? '': ',\n'
            fontSettingsStr += `'${k}' ${v}${end}`
        }
        return fontSettingsStr

    }

    const toGoogleFontParamsStr = function(obj) {
        /* Given an object, convert to a string compatible with the google font
            in =  {
                opsz: "20..48",
                wght: "100..,700",
                FILL: "0..1",
                GRAD: "-50..200",
            }

            out = `opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200`
        */
        let k = Object.keys(obj).join(',')
        let v = Object.values(obj).join(',')
        return `${k}@${v}`
    }

    const iconReceiver =  function(obj) {

        // Tokenize as a family string.
        //
        const values = obj.values, origin = obj.origin;
        console.log('render icon', obj)

        return contentInjection(obj)
    }

    const contentInjection = function(obj) {
        const values = obj.values, origin = obj.origin;
        origin.classList.add(getInjectClass(obj))
        origin.innerText += `${values.join('_')}`
    }

    const getInjectClass = function(obj) {
        let k = obj.props[0]
        return `material-symbols-${k}`
    }

    ;insertReceiver();
})()

;(function(){

    let cg;
    const insertReceiver = function(){

        ClassGraph.addons.iconReceiver = function(_cg){
            cg = _cg;

            // Capture a single key
            // cg.insertTranslator('var', variableDigest2)
            cg.insertReceiver(['icon', 'pack'], iconPackReceiver)
            // cg.insertReceiver(['icon'], iconReceiver)
        }
    }

    const titleCase = (words) => words.map(function(word) {
            return word.charAt(0).toUpperCase() + word.substring(1, word.length);
        });

    const iconPackReceiver =  function(obj) {
        console.log('Install the font', obj)
        let key = titleCase(obj.values).join('+')
        let family = `Material+Symbols+${key}`
        let fontSettings = {
            FILL: 1,
            wght: 500,
            GRAD: 200,
            opsz: 48
        }
        /* Options for the _variable font_ These don't change.*/
        let opts=  {
            opsz: "20..48",
            wght: "100..700",
            FILL: "0..1",
            GRAD: "-50..200",
        }
        let familyString = toGoogleFontParamsStr(opts)
        let fontStr = `family=${family}:${familyString}`

        let receiverBits = [...obj.values, 'icon']

        /* Install a new class, capturing: `[variant]-icon-*`
        The variant is the _style_ of icon, such as "outlined" or "sharp". */
        cg.insertReceiver(receiverBits, iconReceiver)


        /*Leverage the font installer, using the fonter and  the name given.*/
        Polyclass.graph.installGoogleLinks(fontStr, null)

        /* Install the css class rule object */
        installSheetRules(obj, fontSettings)

        // let opts = `opsz,wght,FILL,GRAD
        //             @20..48,100..700,0..1,-50..200`
        //
        // let example = `https://fonts.googleapis.com/css2?
        //         family=Material+Symbols+Outlined:
        //         opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200`
        //
    }

    const installSheetRules = function(obj, fontSettings){
        /*.material-symbols-sharp  {
                font-variation-settings:
                    'FILL' 0,
                    'wght' 500,
                    'GRAD' 200,
                    'opsz' 48;
                font-size: inherit;
            }*/
        let key = obj.values[0]
        let rules = {}

        let fontSettingsStr = toObjectParamStr(fontSettings)
        let conf = {
                'font-variation-settings': `${fontSettingsStr}`,
                'font-size': 'inherit',
            }

        rules[`.material-symbols-${key}`] = conf
        let items = cg.dcss.addStylesheetRules(rules)

        items.renderAll()
    }

    const toObjectParamStr = function(obj) {
        /*Given an object, convert it to a string, compatible with an object-like
        CSS String:

            {
                FILL: 1,
                wght: 500,
                GRAD: 200,
                opsz: 48
            }

        Return a multiline string, with the properties string wrapped:

            'FILL' 1,
            'wght' 500,
            'GRAD' 200,
            'opsz' 48
        */
        let fontSettingsStr = '';
        let fKeys = Object.keys(obj)
        for (var i = 0; i < fKeys.length; i++) {
            let k = fKeys[i]
            let v = obj[k]
            let last = i == fKeys.length-1
            let end = last? '': ',\n'
            fontSettingsStr += `'${k}' ${v}${end}`
        }
        return fontSettingsStr

    }

    const toGoogleFontParamsStr = function(obj) {
        /* Given an object, convert to a string compatible with the google font
            in =  {
                opsz: "20..48",
                wght: "100..,700",
                FILL: "0..1",
                GRAD: "-50..200",
            }

            out = `opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200`
        */
        let k = Object.keys(obj).join(',')
        let v = Object.values(obj).join(',')
        return `${k}@${v}`
    }

    const iconReceiver =  function(obj) {

        // Tokenize as a family string.
        //
        const values = obj.values, origin = obj.origin;
        console.log('render icon', obj)

        return contentInjection(obj)
    }

    const contentInjection = function(obj) {
        const values = obj.values, origin = obj.origin;
        origin.classList.add(getInjectClass(obj))
        origin.innerText += `${values.join('_')}`
    }

    const getInjectClass = function(obj) {
        let k = obj.props[0]
        return `material-symbols-${k}`
    }

    ;insertReceiver();
})()

/**
 * # Monitor
 *
 * Monitor the HTML tree for dynamically inserted classes.
 * This ensures any class applied to a node _after_ first render
 * is discovered. It works through a mutation observer for the
 * attribute "class". This is useful for dynamic processing of HTML pages
 *
 * If the view is a SPA or all the possible classes are _used_ on
 * the view, this isn't required.
 */
;(()=>{

let cg;

/*
 Called at the root of this IIFE to install the functions on the classgraph.
 */
const insertReceiver = function(){

    ClassGraph.addons.monitorClasses = function(_cg){
        cg = _cg;
    }

    ClassGraph.prototype.monitor = function(parent=document.body) {
        return monitorClasses(parent)
    }

    return {
        init(polyObj) {
            console.log('init polyObj')
        }
    }
}


const monitorClasses = function(node) {
    /*

    Note: If Chrome mutation observer fails to detect a change
    (But this function is called.), restart the tab, window or browser.
     */

    // console.log('monitorClasses', node)
    // configuration of the observer:
    let config = {
            attributes: true
            , subtree: true
            // , childList:true
            , attributeFilter: ['class']
            // , characterData: true
            , attributeOldValue: true
            // , characterDataOldValue: true
        };

    let eachMutation = function(mutation) {
        // console.log('eachMutation', mutation)
        if(mutation.attributeName == 'class') {
            classMutationDetection(mutation)
        }
    }

    let mutationHandler = function(mutations) {
        // console.log('mutationHandler', mutations)
        mutations.forEach(eachMutation);
    }

    let observer = new MutationObserver(mutationHandler);
    // pass in the target node, as well as the observer options
    observer.observe(node, config);

    return observer
}


const classMutationDetection = function(mutation) {
    let classes = mutation.target.classList.value;
    let old = mutation.oldValue
    // console.log(`old: "${mutation.oldValue}", target:`
    //             , mutation.target
    //             , `classes: "${classes}"`
    //         )
    let new_spl = classes.split(/(?!\(.*)\s(?![^(]*?\))/g); //split(' ')
    let old_spl = old == null ? []: old.split(' ').map((v)=>v.trim())
    let newItems = old_spl? difference(new_spl, old_spl): new_spl
    console.log('new', newItems)
    // let removedItems = difference(old_spl, new_spl)
    // console.log('removedItems', removedItems)
    cg.captureChanges(newItems, old_spl, mutation.target)
}


const difference = function(setA, setB) {
    const _difference = new Set(setA);
    for (const elem of setB) {
        _difference.delete(elem);
    }
    return _difference;
}

;insertReceiver();

})()

/*
Convert discovered nodes and bind them to a selector. The assigned classes
are the declarations assigned to the css class.

The discovery may descend children, allowing for depth setup.

    <dcss-setup
        selector='.card'
        class='background-color-#111
            border-solid-3px-green
            border-radius-.4em
            padding-.8em-1.4em
            color-#EEE
            margin-1em'>

            <dcss-setup
                selector='.single-page'
                sub-selector='.page'
                class='color-#EECCDD
                padding-1em
                border-solid-3px-#00cc00'
                >
            </dcss-setup>

        </dcss-setup>


Notably this may be easier as real CSS.
 */


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
            return JSON.stringify(this.wordsToOrderedArray(), null, indent)
        }

        return this.wordsToOrderedArray().join(' ')
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

/*
1. all the items have string in position
2. the we create the flat array list
each position is a word from the string list

    "all-petite-caps",
    "all-scroll",
    "all-small-caps",

as a string:

    "  all petite caps scroll small ..."

Becomes:
    [1, [
            [2, [
                    [3, null]
                ]
            ],
            [4, null],
            [5, [
                    [3,null]
                ]
            ]
        ]
    ]

---

When loaded, we can re-ask for the prop:

    w.stringToBits("all-petite-caps")
    [1,2,3]

The last key

    w.stringToBits("zoom")
    [211]
    w.stringToBits("zoom-out")
    [211, 66]
---


    "all-petite-caps",
    "all-scroll",
    "all-small-caps",
    "allow-end",
    "alternate-reverse",

    "all petite caps scroll small allow end alternate reverse",
    "0-1-2",
    "0-3",
    "0-4-5",
    "6-7",
    "8-9",

    "all petite caps scroll small allow end alternate reverse",
    "0-1-2 0-3 0-4-5 6-7 8-9"

    "all petite caps scroll small allow end alternate reverse",
    "0 1 2,0 3,0 4 5,6 7,8 9"

    // radix each key through 32 bits, allowing ~1000 positions as 2bits
    // not really helpful under 100 keys, but then saves 1 char per position (up to 1k)
    // .. With 255~ keys thats 150~ chars saved.
    // In a 32bit radix, the first 31 positions are single chars.
---

*/

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
    ClassGraph.addons.forwardReduceValues = function(cg){
        let func = function(prop, values) {
            return forwardReduceValues(prop, values, microGraph, words)
        }
        cg.reducers.push(func)
        let res = words.installPropArray(dashprops)
        return res;
    }
    // install one of many
    // ClassGraph.prototype.forwardReduceValues = forwardReduceValues
    ClassGraph.prototype.valuesGraph =  { microGraph, words }
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
/**
 * # var-* Translate
 *
 * https://developer.mozilla.org/en-US/docs/Web/CSS/var
 *
 * Discover and rewrite class names values with `var-*` to the CSS function
 * `var(*)`. e.g.
 *
 *     "border-top-var-primary-edges"
 *
 *      {
 *          "border-top": var(--primary-edges)
 *      }
 */
;(function(){

    let cg;

    /**
     * The _automatic_ function called at the base of this iffe to
     * install the `font-pack-*` tokens into the class graph.
     *
     * @return {undefined}
     */
    const insertReceiver = function(){
        // console.log('var-translate insertReceiver')
        // DynamicCSSStyleSheet.addons.varTranslateReceiver = function(_cg){
            // cg = _cg;
            // cg.insertReceiver(['var'], varReceiver)
        // }

        ClassGraph.addons.varTranslateReceiver = function(_cg){
            cg = _cg;
            cg.insertTranslator('var', variableDigest2)
            // cg.insertTranslator('var', variableDigest)
        }
    }

    /**
     * The handler function given to the dynamic css stylesheet, called
     * when the dcss is prepared.
     *
     * @param  {object} obj  A definition generated by the class graph discovery
     * @return {undefined}
     */
    const variableDigest =  function(splitObj, index) {
        /*
            Convert the value keys to a var representation.
                `var-name-switch` -> [var, name, switch]
            to
                `var(--name-switch)`
         */

        /*
            This is pretty dumb, and should improve to a forward stepping
            solution, detecting possible names

            Issue is a var can be anything `var(--1em)`.
            Therefore forward feed on _possibles_ is sticky. This is valid:

                {
                    margin: var(--1em) var(--orange)
                }

            Therefore break on `var`

                "margin-var-1em-var-orange"

            However `var(--var)` is valid:
                {
                    --var: 1em
                    --var-orange: orange;
                }


            Meaning:
                "margin-var-1em-var-var-orange"

            Therefore break on var, unless [var]+1 == var,
                as then its break on var, dont break on next var,
                yielding `var-orange`.`

            However also allowed: "margin-var-1em-var-var-var"

                {
                    --var-var:
                }

            So then possibly, two dashes between `var var``

                margin-var-key--var-var-var-var--var-var-key

                {
                    margin: var(key) var(var-var-var) var(var-key)
                }

            Allowing the strange but valid:
                {
                    --var-key: 1em;
                    --var-var-var-var: 2em;
                    --var-var-key: 1em solid;
                }

         */
        // console.log('running on', splitObj)
        // Tokenize as a family string.
        values = splitObj.values
        let keys = splitObj.values.slice(index)
        let k1 = keys.slice(1)
        let word = `var(--${k1.join("-")})`
        // console.log(keys, word)
        return word
        // [inStack, outStack, currentIndex] =
        // digestFunc(splitObj, inStack, outStack, currentIndex)
    }


    const variableDigest2 =  function(splitObj, inStack, outStack, currentIndex) {
        /*
            Convert the value keys to a var representation.
                `var-name-switch` -> [var, name, switch]
            to
                `var(--name-switch)`
         */

        let keys = inStack.slice(currentIndex)
        let k1 = keys.slice(1)
        let word = `var(--${k1.join("-")})`

        outStack.push(word)
        // return [inStack, outStack, currentIndex]
        return [[], outStack, currentIndex + k1.length]
    }



    ;insertReceiver();
})()

/*

vars box. To assign key variables as accessible CSS varialbes through a js
definition. The definition is bound to DCSS, so edits to the vars manipulates
the view automatically.

    vars({
        primary: "#880000" # company red
        , secondary: "#111" # dark
        , accent: "red"
    })

In the node, we access the vars reciever

    <div class="background-color-var-secondary
                color-primary">
        <p>An elk called Elk lives here.</p>
    </div>

Manipulating the var propagates to the view:

    vars.primary = "#EEE" # off white

---

## Secondary App

    `swatch()`
    and colors.js

    Assign "colors" to a swatch of colors, each color is a function from the
    colors.js module and can assign math relations to swatches.
    Chaning a swatch (such as its base color), can manipulate the other
    colours according to the chosen swatch type, e.g. "Diachromic".

 */

;(function(){

    let cg;
    let rootDeclaration = {};
    let definition = undefined
    let rootRule;

    /**
     * The _automatic_ function called at the base of this iffe to
     * install the `font-pack-*` tokens into the class graph.
     *
     * @return {undefined}
     */
    const insertReceiver = function(){
        // DynamicCSSStyleSheet.addons.varTranslateReceiver = function(_cg){
            // cg = _cg;
            // cg.insertReceiver(['var'], varReceiver)
        // }

        ClassGraph.addons.varsReceiver = function(_cg){
            cg = _cg;
            cg.vars = varsHook.bind(cg)
            // cg.varsRootDelaration = rootDeclaration
            cg.varsRoot = rootRule
            // cg.insertTranslator('var', variableDigest)
        }
    }


    const varsHook = function(d, target=':root') {
        /** vars() function bound to the classgraph. _this_ is the classgraph
         instance `cg.vars = varsHook.bind(cg)`

         each key is a var, value is the param

            {
                apples: green
                , foo: 10
                , bar: 1em
                , baz: #444
            }

        Each var is installed on the target node:

            :root {
                --apples: green
                ...
                --baz: #444
            }

        if an existing "vars" object exists, it's updated.

        */
        // target = document.querySelector(target)
        console.log('Hook', d)

        if(rootRule == undefined) {
            let rootDeclaration = {};

            for(let key in d) {
                let prop = `--${key}`
                let value = d[key]
                rootDeclaration[prop] = value;
            }

            let rules = cg.dcss.addStylesheetRules({
                    [target]: rootDeclaration
                });

            rules.renderAll()
            rootRule = rules[0]
            cg.varsRoot = rootRule
        } else {

            // rootRule
            // let pr = rootRule.getPropStr([target,Object.entries(definition)])
            // rootRule.sheetRule.cssText = `${target} { ${pr} }`
            // rootRule.replace(`${target} { ${pr} }`)

            for(let key in d) {
                let prop = `--${key}`
                let value = d[key]
                rootRule.sheetRule.style.setProperty(prop, value)
            }
            // rootRule.render()
            // console.log(rootRule)
            // window.varsRule = rootRule
        }
    }

    ;insertReceiver();
})()

