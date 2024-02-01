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

const varsReceiver = (function(){

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
