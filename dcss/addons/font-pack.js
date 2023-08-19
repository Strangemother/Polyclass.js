
const fontPackReceiver = (function(){

    let cg;

    const insertReceiver = function(){

        DynamicCSSStyleSheet.addons.fontPackReceiver = function(_cg){
            cg = _cg;
            cg.insertReceiver(['font', 'pack'], fontPackReceiver)
        }
    }


    let fontPackReceiver =  function(obj) {
        /* links required:

            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">

            <link href="https://fonts.googleapis.com/css2?
                family=Roboto+Condensed:ital,wght@0,400;0,700;1,700
                &family=Roboto:wght@300&display=swap" rel="stylesheet">
            <link rel="preconnect" href="https://fonts.googleapis.com">

                family=Barriecito
                family=Roboto:wght@300
                family=Roboto+Condensed:ital,wght@0,300;
                                                    1,300
                family=Roboto+Condensed:ital,wght@0,300;
                                                    0,400;
                                                    1,300;
                                                    1,400
                family=Roboto+Condensed:ital,wght@0,300;
                                                    0,400;
                                                    0,700;
                                                    1,300;
                                                    1,400;
                                                    1,700

                family=Montserrat:ital,wght@0,100;
                                            0,200;
                                            0,300;
                                            0,400;
                                            0,500;
                                            0,600;
                                            0,700;
                                            0,800;
                                            0,900;
                                            1,100;
                                            1,200;
                                            1,300;
                                            1,400;
                                            1,500;
                                            1,600;
                                            1,700;
                                            1,800;
                                            1,900
                family=Roboto+Condensed:ital,wght@0,300;
                                                  0,400;
                                                  0,700;
                                                  1,300;
                                                  1,400;
                                                  1,700
                family=Roboto+Condensed:ital,wght@0,300;
                                                  0,400;
                                                  0,700;
                                                  1,300;
                                                  1,400;
                                                  1,700
                family=Roboto:wght@300

                family=Montserrat:wght@100;
                                       200;
                                       300;
                                       400;
                                       500;
                                       600;
                                       700;
                                       800;
                                       900

            # font exo-2 regulat italic
                family=Exo+2:ital@1

            # font exo-2 all italic
                family=Exo+2:ital,wght@1,300;
                                       1,400;
                                       1,500;
                                       1,600;
                                       1,700;
                                       1,800;
                                       1,900

        CSS Required:

            font-family: 'Roboto', sans-serif;
         */

        // Tokenize as a family string.
        //
        values = obj.values
        let familyStrings = '' //"family=Roboto:wght@300"


        let toTitleCase = function(str) {
            return str.replace(/(^|\s)\S/g, function(t) { return t.toUpperCase() });
        }

        for(let token of values) {
            let amp = familyStrings.length == 0? '':'&';
            let titleToken = toTitleCase(token);
            familyStrings += `${amp}family=${titleToken}`
        }
        console.log('String', familyStrings)

        // install as header <link> items
        //
        generateGoogleLinks(familyStrings).forEach((x)=>document.head.appendChild(x))


        // Install additional css additions
        // // For value create a font-family;
        let classes = { }

        for(let name of values) {

            let replaceFunc =  ($, ofs) => (ofs ? ' ' : "") //+ $.toLowerCase()
            let cleanName = toTitleCase(name.replace(/[+]/g, replaceFunc))
            let attr = 'font-family'
            let className = cg.asSelectorString([attr, name])

            // The name is the origin 'font-pack', plus the given font name `font-name-Roboto`
            let packName = cg.asSelectorString(obj.props.concat(name))
            classes[packName] = [
                    {[attr]: `'${cleanName}', sans-serif`}
                ]
            classes[className] = classes[packName]


            console.log('Classes', classes)
            let installed = cg.dcss.addStylesheetRules(classes);
            installed.renderAll()
            classes = {}
        }
        console.log(obj)
        // let installed = addStylesheetRulesObject(classes);

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
