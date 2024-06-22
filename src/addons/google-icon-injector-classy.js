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
