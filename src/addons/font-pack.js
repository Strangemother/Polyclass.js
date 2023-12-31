
const fontPackReceiver = (function(){

    let cg;

    const insertReceiver = function(){
        console.log('font-pack insertReceiver')

        DynamicCSSStyleSheet.addons.fontPackReceiver = function(_cg){
            cg = _cg;
            cg.insertReceiver(['font', 'pack'], fontPackReceiver)
        }
    }


    const fontPackReceiver =  function(obj) {

        // Tokenize as a family string.
        //
        values = obj.values

        let fonts = createFontObjects(values)
        let familyStrings = createFamilyString(values, fonts)

        // let families = tokenize(values)

        // install as header <link> items
        console.info('Installing Google fonts: familyStrings:', familyStrings)
        generateGoogleLinks(familyStrings).forEach((x)=>document.head.appendChild(x))


        // Install additional css additions
        return installFontObjects(fonts)
    }

    const installFontObjects = function(fonts) {
        // // For value create a font-family;
        for(let pack of Object.values(fonts)) {
            let name = pack.first
            let replaceFunc = ($, ofs) => (ofs ? ' ' : "") //+ $.toLowerCase()
            let cleanName = toTitleCase(name.replace(/[+]/g, replaceFunc))
            console.log('Installing Font', cleanName)//, pack)
            pack.cleanName = cleanName
            pack.definition = makeDefinitions(pack)
            let installed = cg.dcss.addStylesheetRules(pack.definition);
            installed.renderAll()
        }
    }


    const toTitleCase = function(str) {
        return str.replace(/(^|\s)\S/g, function(t) { return t.toUpperCase() });
    }

    const createFamilyString = function(values, fonts) {
        fonts = fonts || createFontObjects(values)
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
        for(let token of Object.values(pack.tokens)) {
            // console.log('making on token' , token)
            let def = {
                'font-weight': token.int
                , 'font-family': `'${pack.cleanName}', sans-serif`
            }
            let selectorBits = ['font', pack.first]

            for(let key of token.keys) {
                let newDef = Object.assign({}, def)
                if(key.isItal) {
                    newDef['font-style'] = 'italic'
                }

                let selectorRange = selectorBits.concat([key.token])
                let packName = cg.asSelectorString(selectorRange)
                // console.log(packName, newDef)
                res[packName] = newDef
            }

        }
        return res
    }

    const createFontObjects = function(values) {
        // family=Roboto:wght@300
        // let familyStrings = '' //"family=Roboto:wght@300"
        let index = 0
        let fonts = {}

        let currentFont;
        let regex = /([a-zA-Z-]{0,}?)(\d+)/;
        let REGULAR = 'r' // a no definition (standard) font
        let skipEmpty = true
        let manyFont = true

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
                fonts[index] = { first: token, tokens:{} }
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

    const extendPack = function(pack) {
        let titleToken = toTitleCase(pack.first);

        let allTokens = Object.assign({}, ...Object.values(pack.tokens))
        let hasItal = allTokens.ital != undefined

        let formatStringParts = []
        if(hasItal) { formatStringParts.push('ital') }
        if(hasItal || allTokens.regu) { formatStringParts.push('wght') }

        let weightValues = new Set

        for(let key in pack.tokens) {
            let token = pack.tokens[key]
            // console.log(token)
            let ital = token.ital? 1: 0
            let int = token.int
            let a = hasItal? [ital]: []
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

        let weights = Array.from(weightValues).sort()//.join(';')
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

    const generateGoogleLinks = function(familyStrings){

        let a = getOrCreateLink('link', 'preconnect', {
            href: "https://fonts.googleapis.com"
        })

        let b = getOrCreateLink('link', 'preconnect', {
            href: "https://fonts.gstatic.com"
            , crossorigin: ''
        })

        let c = getOrCreateLink('link', "stylesheet", {
            href:`https://fonts.googleapis.com/css2?${familyStrings}&display=swap`
        })

        return [a,b,c]
    }

    let linkCache = {}

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
