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
