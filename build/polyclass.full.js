const kebabCase = function(str, sep='-') {
    let replaceFunc =  ($, ofs) => (ofs ? sep : "") + $.toLowerCase()
    return str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, replaceFunc)
}


const colorPrebits = function() {
    /*
        hex     1
        rgba    4
        rgb     3   3/1
        hsl     3   3/1
        hwb     3   3/1
        lab     3   3/1
        lch     3   3/1
        oklab   3   3/1
        oklch   3   3/1
        color   4   4/1
     */
}


var textColor = function(bgColor) {
  var r = bgColor.r * 255,
      g = bgColor.g * 255,
      b = bgColor.b * 255;
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return (yiq >= 128) ? 'black' : 'white';
}


function standardize_color(str){
    var ctx = document.createElement("canvas").getContext("2d");
    ctx.fillStyle = str;
    return ctx.fillStyle;
}

const covertColorEntity = document.createElement("span")
function convertColor(v) {
    let st = covertColorEntity.style
    let b4 = st.color
    st.color = v
    f = st.getPropertyValue('color')
    console.log(f, f!=b4)
    return f
}

function hexAny(str) {
    return standardize_color(str)
}

function rgbAny(str) {
    return hexToRgb(hexAny(str).slice(1))
}

function hexToRgb(hex) {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return [r,g,b];//.join(',');
}

function rgbAnyString(str) {
    let rgb = (a,b,c) => `rgb(${a},${b},${c})`
    return rgb.apply(this, rgbAny(str))
}

function hexToRgbStr(hex) {
    return hexToRgb(hex.slice(1)).join(',');
}


;(()=>{


var round = Math.round
    , asInt = parseInt
    , rgb = (a,b,c) => `rgb(${a},${b},${c})`
    ;

// https://github.com/PimpTrizkit/PJs/wiki/
// 12.-Shade,-Blend-and-Convert-a-Web-Color-(pSBC.js)#--version-2-universal-b--
//

let getDefaultHex = function(val, defaultLow="#000000", defaultHigh="#FFFFFF") {
    if(val){ return val }

    if(p_lt_0) { return defaultLow }
    return defaultHigh
}

let getDefault = function(val) {
    return getDefaultHex(val, rgb(0,0,0), rgb(255,255,255))
}

let shift = function(v, c, and) {
    let r = v >> c
    return and ? r & and: r
}

let shiftRoundNegFlip = function(t, shiftVal, and, val)  {
    let innerVal = shift(t, shiftVal, and)
    return roundNegFlip(innerVal, val)
}

let convert = (t, val) => {
    return roundNegFlip(asInt(t), val)
}

let roundNegFlip = function(a, b) {
    return round(negFlip(a - b)) + b
}

let negFlip = function(val){
    return val * neg
}

var neg
    , p_lt_0
    ;

function shadeBlend(p,c0,c1) {
    /*
        var color1 = "#FF343B";
        var color2 = "#343BFF";
        var color3 = "rgb(234,47,120)";
        var color4 = "rgb(120,99,248)";
        var shadedcolor1 = shadeBlend(0.75,color1);
        var shadedcolor3 = shadeBlend(-0.5,color3);
        var blendedcolor1 = shadeBlend(0.333,color1,color2);
        var blendedcolor34 = shadeBlend(-0.8,color3,color4); // Same as using 0.8

     */
    p_lt_0 = p < 0;
    neg = p_lt_0? p * -1: p

    if(c0.length > 7){
        return rbgConvert(p, c0, c1)
    }

    return hexConvert(p, c0, c1)
}

function shiftShift(f, t, shiftVal, andHex) {
        // , R1 = shift(f, 16, 0)
        // , roundR = shiftRoundNegFlip(t, 16, 0, R1)

        let G1 = shift(f, shiftVal, andHex)
        return shiftRoundNegFlip(t, shiftVal, andHex, G1)
}


function hexConvert(p, c0, c1) {

    var f = asInt(c0.slice(1), 16)
        , cv = getDefaultHex(c1).slice(1)
        , t = asInt(cv, 16)
        , roundR = shiftShift(f, t, 16, 0)
        , roundG = shiftShift(f, t, 8, 0x00FF)
        , roundB = shiftShift(f, t, 0, 0x0000FF)
        ;
        // , R1 = shift(f, 16, 0)
        // , G1 = shift(f, 8, 0x00FF)
        // , B1 = shift(f, 0, 0x0000FF)
        // , roundR = shiftRoundNegFlip(t, 16, 0, R1)
        // , roundG = shiftRoundNegFlip(t, 8, 0x00FF, G1)
        // , roundB = shiftRoundNegFlip(t, 0, 0x0000FF, B1)
        // ;)

    let val = 0x1000000 + roundR
              * 0x10000 + roundG
                * 0x100 + roundB
                ;

    let v = val.toString(16).slice(1)
    return `#${v}`

}

function rbgConvert(p, c0, c1) {
    let f = c0.split(",")
        , tSplit = getDefault(c1)
        , t = tSplit.split(",")
        , R = asInt(f[0].slice(4))
        , G = asInt(f[1])
        , B = asInt(f[2])
        , r = convert(t[0].slice(4), R)
        , g = convert(t[1], G)
        , b = convert(t[2], B)
        ;
    return rgb(r,g,b)
}



function origShadeBlend(p,c0,c1) {
    var n=p<0?p*-1:p,u=Math.round,w=parseInt;
    if(c0.length>7){
        var f=c0.split(","),t=(c1?c1:p<0?"rgb(0,0,0)":"rgb(255,255,255)").split(","),R=w(f[0].slice(4)),G=w(f[1]),B=w(f[2]);
        return "rgb("+(u((w(t[0].slice(4))-R)*n)+R)+","+(u((w(t[1])-G)*n)+G)+","+(u((w(t[2])-B)*n)+B)+")"
    }else{
        var f=w(c0.slice(1),16),t=w((c1?c1:p<0?"#000000":"#FFFFFF").slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF;
        return "#"+(0x1000000+(u(((t>>16)-R1)*n)+R1)*0x10000+(u(((t>>8&0x00FF)-G1)*n)+G1)*0x100+(u(((t&0x0000FF)-B1)*n)+B1)).toString(16).slice(1)
    }
}


var color1 = "#FF343B";
var color2 = "#343BFF";
var color3 = "rgb(234,47,120)";
var color4 = "rgb(120,99,248)";
blendedcolor = shadeBlend(-0.8,color3,color4); // Same as using 0.8
blendedcolor2 = origShadeBlend(-0.8,color3,color4); // Same as using 0.8

if(blendedcolor != blendedcolor2) {
    console.error('Fault', blendedcolor, blendedcolor2)
}
console.log(blendedcolor, blendedcolor2)


blendedcolor = shadeBlend(-0.8,color1,color2); // Same as using 0.8
blendedcolor2 = origShadeBlend(-0.8,color1,color2); // Same as using 0.8


if(blendedcolor != blendedcolor2) {
    console.error('Fault', blendedcolor, blendedcolor2)
}


console.log(blendedcolor, blendedcolor2)

})();

/**
 * A DynamicCSSStyleSheet allows the developer to manipulate the
 * CSS Style objects within the sheet, rather than switching classes
 * or using JS.
 *
 * When installed the stylesheet acts behaves like a standard stylesheet
 * We can add, update, and remove active style definitions, immediately
 * affecting the view.
 *
 * This is very useful for complex or dynamic CSS definitions, such as
 * a `path()` or font packages. We can couple view changes with style attributes
 * without a middle-man
 */
class RenderArray extends Array {
    renderAll() {
        for(let node of this) {
            node.render()
        }
    }
}


class DynamicCSSStyleSheet {

    /**
     * Represents the style element.
     * @type {undefined}
     */
    styleEl = undefined

    /**
     * Represents the method of inserting the stylesheet.
     * @type {string}
     */
    insertMethod = 'adopt'

    /**
     * Initializes the class and installs the addons.
     * @param {Object} cg - Class graph.
     */
    constructor(cg) {
        this.installAddons(cg, this.constructor.addons)
    }

    /**
     * Installs the addons for the class.
     * @param {Object} cg - Class graph.
     * @param {Object} addons - Addons to be installed.
     */
    installAddons(cg, addons){
        for(let key in addons) {
            let addon = addons[key]
            addon(cg)
        }
    }

    /**
     * Adds stylesheet rules either from an array or an object.
     * @param {Array|Object} rules - Rules to be added.
     * @param {Object} _sheet - The stylesheet.
     */
    addStylesheetRules(rules, _sheet) {
        /*
        let v = addStylesheetRules([
            ['#ball',
                ['offset-path', 'path("M126.09375 10
                                        V86.28 A9.951 9.950 0 0 0 136.04375 96.23
                                        H708.3468750")']
            ]
        ]);
        */
        if(Array.isArray(rules)) {
            return this.addStylesheetRulesArray(rules, _sheet)
        }

        return this.addStylesheetRulesObject(rules, _sheet)
    }

    /**
     * Ensures the stylesheet is available and returns it.
     * @param {Object} _sheet - The stylesheet.
     * @returns {Object} - The ensured stylesheet.
     */
    getEnsureStyleSheet(_sheet) {
        let styleNode = _sheet || this.styleEl;
        let v
        if(styleNode != undefined) {
            return styleNode
        }

        if(this.insertMethod == 'sheet') {
                // Append <style> element to <head>
                styleNode = document.createElement('style');
                document.head.appendChild(styleNode);

            // return styleNode
            v = styleNode.sheet
        }

        if(this.insertMethod == 'adopt') {
            const ss = new CSSStyleSheet();
            // ss.title = 'dcss-sheet'
            document.adoptedStyleSheets.push(ss)
            v = ss
        }
        if(this.styleEl == undefined) {
            this.styleEl = v
        }
        return v
    }

    /**
     * Adds stylesheet rules from an array.
     * @param {Array} rules - Array of rules.
     * @param {Object} _sheet - The stylesheet.
     * @returns {RenderArray} - An array of rendered rules.
     */
    addStylesheetRulesArray(rules, _sheet) {
        let styleNode = this.getEnsureStyleSheet(_sheet)

        let res = new RenderArray()
        let styleSheet = styleNode//.sheet;
        for (let i = 0; i < rules.length; i++) {
            let rule = rules[i];
            this.pushResponse(res, styleSheet, rule)
        }

        return res
    }

    /**
     * Pushes the response for the rule.
     * @param {RenderArray} res - Result array.
     * @param {Object} styleSheet - The stylesheet.
     * @param {Array} rule - The rule to be pushed.
     * @returns {Object} - The pushed rule.
     */
    pushResponse(res, styleSheet, rule) {
        // console.log(rule)
        let _rule = this.pushArrayRule(styleSheet, rule)
        res.push(_rule)
        return _rule
    }

    /**
     * Returns the ensured stylesheet.
     * @param {Object} _sheet - The stylesheet.
     * @returns {Object} - The ensured stylesheet.
     */
    getSheet(_sheet) {
        return this.getEnsureStyleSheet(_sheet)
    }

    /**
     * Adds stylesheet rules from an object.
     * @param {Object} rules - Object of rules.
     * @param {Object} _sheet - The stylesheet.
     * @returns {RenderArray} - An array of rendered rules.
     */
    addStylesheetRulesObject(rules, _sheet) {
        let styleNode = this.getEnsureStyleSheet(_sheet)

        let res = new RenderArray()
        let styleSheet = styleNode//.sheet;

        for(let selector in rules) {
            let rule = rules[selector]
            let entries = Object.entries(rule)
            let newRule = [selector, entries]
            // console.log(newRule)
            this.pushResponse(res, styleSheet, newRule)
        }

        return res
    }

    /**
     * Checks if a selector exists in the stylesheet.
     * @param {string} selector - Selector to check.
     * @param {Object} _sheet - The stylesheet.
     * @returns {boolean} - True if selector exists, otherwise false.
     */
    selectorExists(selector, _sheet){
        let sheet = this.getEnsureStyleSheet(_sheet)

        for(let rule of sheet.cssRules) {
            if(selector == rule.selectorText) {
                return true
            }
        }
        return false
    }

    /**
     * Retrieves a rule by its selector.
     * @param {string} selector - Selector to retrieve.
     * @param {Object} _sheet - The stylesheet.
     * @returns {string|undefined} - The rule if found, otherwise undefined.
     */
    getRuleBySelector(selector, _sheet){
        let sheet = this.getEnsureStyleSheet(_sheet)

        for(let rule of sheet.cssRules) {
            if(selector == rule.selectorText) {
                return selector
            }
        }
        return undefined
    }

    removeRuleBySelector(selector, _sheet) {
        let sheet = this.getEnsureStyleSheet(_sheet)
        let index = this._getIndexBySelector(selector, sheet)
        sheet.removeRule(index)
    }

    _getIndexBySelector(selector, sheet)  {
        let c = 0 
        for(let rule of sheet.cssRules) {
            if(selector == rule.selectorText) {
                return c 
            }
            c++;
        }
    }
    /**
     * Pushes an array rule to the stylesheet.
     * @param {Object} styleSheet - The stylesheet.
     * @param {Array} conf - Configuration for the rule.
     * @returns {Object} - The pushed rule.
     */
    pushArrayRule(styleSheet, conf) {
        // If the second argument of a rule is an array of arrays,
        // correct our variables.
        let _this = this
        return {
            conf
            , styleSheet
            , getPropStr(rules) {
                rules = rules == undefined ? this.conf: rules
                let rightIndex = 1
                let rule = rules

                if (Array.isArray(rules[1][0])) {
                    rule = rule[1]
                    rightIndex = 0
                }

                let propStr = _this.buildPropStr(rule, rightIndex)
                return propStr
            }

            , render(content) {
                let rules = this.conf
                    , propStr = content || this.getPropStr(rules)
                    , selector = rules[0]
                    , _ruleIndex = _this.insertRuleSelectorPropStr(this.styleSheet, selector, propStr)
                    ;
                this.sheetRule = this.styleSheet.rules[_ruleIndex]
                this.rule = _ruleIndex
            }
            , replace(content) {
                if(!this.sheetRule) {
                    return this.render(content)
                }
                let before = this.sheetRule.cssText
                    , rules = this.conf
                    , selector = rules[0]
                    , propStr = content == undefined ? this.getPropStr(this.conf): content
                    , after = `${selector} {${propStr}}`
                    ;
                this.styleSheet.replace(`${before} ${after}`)
            }
        }
    }

    /**
     * Builds a property string from a rule.
     * @param {Array} rule - The rule.
     * @param {number} j - Index (default is 1).
     * @returns {string} - The property string.
     */
    buildPropStr(rule, j=1) {

        // console.log('Reading rule', rule)
        let propStr = '';

        for (let ruleLength = rule.length; j < ruleLength; j++) {
            let prop = rule[j]
            // console.log('prop', prop)
            let name = prop[0]
            let value = prop[1]

            if(this.isLiteralObject(value)) {
                /*[{background: '#111'}
                    , {color: '#11AA11'} ]*/
                for(let key in value) {
                    let subVal = value[key]
                    propStr += this.stringEntry(key, subVal, value.important)
                    // propStr += `${key}: ${subVal}${importantStr};\n`
                }

                continue
            }

            propStr += this.stringEntry(name, value, prop[2] != undefined)

        }

        return propStr;
    }

    /**
     * Returns a string entry for a property.
     * @param {string} name - Property name.
     * @param {string} value - Property value.
     * @param {boolean} isImportant - Flag to indicate if the property is important (default is false).
     * @returns {string} - The string entry.
     */
    stringEntry(name, value, isImportant=false) {
        let importantStr = isImportant ? ' !important' : '';
        return `${name}: ${value}${importantStr};\n`
    }

    /**
     * Checks if a value is a literal object.
     * @param {*} a - Value to check.
     * @returns {boolean} - True if value is a literal object, otherwise false.
     */
    isLiteralObject(a) {
        return (!!a) && (a.constructor === Object);
    }

    /**
     * Inserts a rule into the stylesheet using a selector and property string.
     * @param {Object} styleSheet - The stylesheet.
     * @param {string} selector - Selector for the rule.
     * @param {string} propStr - Property string for the rule.
     * @returns {number} - The index of the inserted rule.
     */
    insertRuleSelectorPropStr(styleSheet, selector, propStr) {
        // Insert CSS Rule

        let ruleStr = `${selector} {${propStr}}`
        // console.log(ruleStr)
        let _ruleIndex = styleSheet.insertRule(
                        ruleStr,
                        styleSheet.cssRules.length
                    );
        // console.log(_ruleIndex)
        return _ruleIndex
    }
}


/**
 * Represents the addons for the class.
 * @type {Object}
 */
;DynamicCSSStyleSheet.addons = {};


// export {
//     DynamicCSSStyleSheet,
//     RenderArray
// }
/* Class Graph
The primary functionality to read and adapt class strings.

Functionally it's just a string splitter, using the built-in CSS attributes
to generate a graph of possible values.

    const cg = generateClassGraph()
 */

const generateClassGraph = function(config={}){
    let cg = new ClassGraph(config)
    cg.generate()
    return cg
}


const clog = function(...s) {
    console.log(`%c ${s.join(' ')} `, 'background: #111; color: #99DDAA');
}


const arrayMatch = (a,b) => {
    return a.every((e,i)=>b[i]==e)
}


class ClassGraph {

    sep = '-'
    escapeRegex = /[<>*% #():=.@+?\/]/g
    dcss = new DynamicCSSStyleSheet(this)

    constructor(conf) {
        this.conf = conf || {}

        /*
            A simple key -> function dictionary to capture special (simple)
            keys during the translate value phase.
            for example detect `var` in "color-var-foo"
         */
        this.translateMap = {
            // 'var': this.variableDigest,
        }

        if(this.conf.addons !== false) {
            this.installAddons(this.getPreAddons())
        }

        this.vendorLocked = conf?.vendorLocked == undefined? false: conf.vendorLocked
        this.sep = conf?.sep || this.sep
        this.aliasMap = {}
        this.parentSelector = conf?.parentSelector
        this.processAliases(this.conf?.aliases)
    }

    insertTranslator(key, func) {
        this.translateMap[key] = func
    }

    getPreAddons(){
        return this.constructor.addons
    }

    installAddons(addons){
        for(let key in addons) {
            let addon = addons[key]
            addon(this)
        }
    }

    /*
        The graph generator produces a depth of allowed
        css defintitions. Upon discovery a node may 'release' or continue.
        If the _next_ node is a tree node, continue - if it's a value node, release
     */
    generate(node){
        //node = node || document.body
        let items = Object.entries(node?.style || {})
        for(let [name, value] of items) {
            this.addCamelString(name)
        }
    }

    addCamelString(name) {
        // convert to kebab-case, then push into the graph
        // From ./tools.js
        let kebab = kebabCase(name)
        // console.log(name, kebab)
        let keys = kebab.split('-')
        this.addTree(keys)
    }

    /*
        Insert a leaf into a tree, marking it as a valid position.

            cg.addTree(['derek', 'eric', 'fred'])

        return the leaf:

            {
                "key": "harry",
                "position": [
                    "tom",
                    "dick",
                    "harry"
                ],
                "leaf": true
            }

        This essentially marks this as a valid leaf in the graph.
        When a new object is requested by its key, this is used
        as a test for the property split:

            "tom-dick-harry-10rem"

            ["tom-dick-harry", "10rem"]

     */
    addTree(keys, func) {

        let graphNode = this.getRoot();
        let nodesWord = this.nodeWord()
        let position = []
        for(let key of keys) {
            position.push(key)
            if(!graphNode[nodesWord]) {
                // Make new nodes when required.
                graphNode[nodesWord] = {}
            }
            let newNode = graphNode[nodesWord][key]
            if(newNode == undefined) {
                // Create the new tree point.
                // console.log('Making new node', key)
                newNode = graphNode[nodesWord][key] = {
                    // nodes: {}
                    key
                    , position
                    // meta: { key }
                }
            }
            graphNode = newNode
        }
        graphNode.leaf = true
        if(func!=undefined) {
            graphNode.handler = func
        }
        return graphNode
    }

    nodeWord() {
        return 'n'
    }

    getRoot(){
        if(!this.graph) {
            this.graph = this.generateRootGraph()
        }
        return this.graph
    }

    generateRootGraph() {
        return {
            [this.nodeWord()]: {}
            , meta: { key: 'root', isRoot: true }
            , key: 'root'
        }
    }

    processAliases(aliases) {
        for(let key in aliases) {
            this.addAliases(key, aliases[key])
        }
    }

    getPrefixes(){
        let c = this.conf
        if(c.prefixes){
            return c.prefixes
        }

        if(c.prefix){
            return [c.prefix]
        }
        return []
    }

    isVendorPrefixMatch(keys, prefixes) {
        prefixes = prefixes == undefined? this.getPrefixes(): prefixes;

        for (var i = 0; i < prefixes.length; i++) {
            let prefix = prefixes[i]
            if(keys[i] == prefix) {
                //pass
            } else {
                //fail
                return false
            }

        }
        return true
    }

    /*Given a list of keys, convert any _literal_ aliases to their true
     key.
     Return a new list. The new list length may differ from the given list.
    */
    aliasConvert(rawKeys) {

        let prefixes = this.conf.prefixes


        let r = []
        for(let rk of rawKeys) {
            // If alias, replace
            r.push(this.aliasMap[rk] || rk)
        }

        return r
    }

    addAliases(key, aliases) {
        for(let a of aliases) {
            this.addAlias(key, a)
        }
    }

    /*Insert a key value alias "bg" == "background" */
    addAlias(key, alias) {
        this.aliasMap[alias] = key
    }

    /* Split a string into its constituents; the CSS key and value

            cg.objectSplit('margin-top-10em')

            {
                "props": [
                    "margin",
                    "top"
                ],
                "values": [
                    "10em"
                ],
                "str": "margin-top-10em",
                "node": {
                    "key": "top",
                    "position": [
                        "margin",
                        "top"
                    ],
                    "leaf": true
                },
                "valid": true
            }

        When testing a key, we walk the graph until a leaf.
        If the next step is a node, continue.
        If the leafs' next step is not a node, parse the values.
        reject leaf-only definitions.
     */
    objectSplit(str, sep=this.sep, safe=true, index=-1) {
        /* Parse a potential new css class. */

        let rawKeys = typeof(str) == 'string'? str.split(sep): str
            , nodeWord = this.nodeWord()
            , node = this.getRoot()
            , currentNode
            // c1 rather than c (count).
            // As all references require the count+1
            // - but "c" is usually a 0 index counter
            , c1 = 0
            , keys = this.aliasConvert(rawKeys)
            , l = keys.length
            ;

        if(this.isVendorPrefixMatch(keys)) {
            // console.log('Vendor Match!')
            //
            // Slice away the vendor.
            keys = keys.slice(this.getPrefixes().length)
        } else {
            // console.log('does not match vendor', keys)
            if(this.vendorLocked) {
                // nully obj.
                return {
                    props:undefined,
                    values:undefined,
                    str,
                    index,
                    node: currentNode,
                    valid: false
                }
            }
        }

        for(let k of keys) {
            // loop until a leaf, where the _next_ key is not a value node.
            currentNode = node[nodeWord][k]
            c1 += 1
            let isLastNode = (l == c1)

            if(currentNode == undefined) {
                if(safe) { break };
                continue
            }

            if(currentNode.leaf === true) {
                // if the next node is invalid, the next keys are values.
                let nextKey = keys[c1]
                let currentGraph = currentNode[nodeWord]
                if( (currentGraph && currentGraph[nextKey]) == undefined ) {
                    break
                }
            }

            node = currentNode
        }

        // grab the next keys
        let props = keys.slice(0, c1)
        let values = keys.slice(c1)

        let vg = this.valuesGraph || {}
        // Reshape any values, correcting for over-splitting
        values = this.forwardReduceValues(
                     props
                    , values
                    , vg.microGraph
                    , vg.words
                )

        let r = {
            props, values, str,
            node: currentNode,
            index,
            valid: currentNode && (values.length > 0) || false
        }

        // this.translateValue(r)
        return r
    }

    forwardReduceValues(props, values, graph, words) {
        return values
    }

    minorCapture(str, sep=this.sep, safe=true) {
        /* Parse a potential new css class. */

        let rawKeys = typeof(str) == 'string'? str.split(sep): str
            // The forward keys to iterate such as [foo, bar],
            // early converted through the aliasing.
            // Will change later due to vendor prefix.
            , keys = this.aliasConvert(rawKeys)
            , l = keys.length
            // The key 'word' used to hold the nested object
            // within a node.
            , nodeWord = this.nodeWord()
            // The _current_ position starts at the root base
            // of the tree - rewritten during iteration to match
            // the _currentnode_
            , node = this.getRoot()
            // The iterative current state node, usually matching `node` unless
            // an error occurs.
            , currentNode
            // c1 rather than c (count).
            // As all references require the count+1
            // - but "c" is usually a 0 index counter
            , c1 = 0
            ;

        if(this.isVendorPrefixMatch(keys)) {
            // Slice away the vendor.
            keys = keys.slice(this.getPrefixes().length)
        } else {
            // console.log('does not match vendor', keys)
            if(this.vendorLocked) {
                // nully obj.
                return {
                    props:undefined,
                    values:undefined,
                    str,
                    node: currentNode,
                    valid: false
                }
            }
        }

        for(let k of keys) {
            // loop until a leaf, where the _next_ key is not a value node.
            currentNode = node[nodeWord][k]
            c1 += 1
            let isLastNode = (l == c1)

            if(currentNode == undefined) {
                if(safe) { break };
                continue
            }

            if(currentNode.leaf === true) {
                // if the next node is invalid, the next keys are values.
                let nextKey = keys[c1]
                let currentGraph = currentNode[nodeWord]
                if( (currentGraph && currentGraph[nextKey]) == undefined ) {
                    break
                }
            }

            node = currentNode
        }

        // grab the next keys
        let props = keys.slice(0, c1)
        let values = keys.slice(c1)
        let r = {
            props, values, str,
            node: currentNode,
            valid: currentNode && (values.length > 0) || false
        }

        // this.translateValue(r)
        return r
    }

    /* Split and translate the values through any complex rules.

        Usually the `translateValue` occurs during the insert phase (late stage)
        Therefore isn't seen in the split object.
     */
    objectSplitTranslateValue(str, sep=this.sep, safe=true) {
        let splitObj = this.objectSplit(str, sep, safe)
        return this.translateValue(splitObj)
    }

    /* Insert a string as a "statement" in one line,

        res = cg.insertLine('alpha-red', {color: 'red'})
        res.renderAll()

        Creates:

            .alpha-red {
                color: red
            }

        render must be called on each returned rule. `renderAll`
        is a special function on the returned array, calling `render` on
        each sub item.

        The function converts the statement into a splitobject,
        and applies it to the stylesheet through `insertRule`

        returns the result from insertRule, an Array of Rules.
    */
    insertLine(selectorStatement, props) {
        let spl = this.objectSplit(selectorStatement)
        return this.insertRule(spl, props)
    }

    translateValue(splitObj) {
        /*
        return the cleaned values for the css declaration

            hex     6   3   2   1
            rgba    4
            rgb     3   3/1
            hsl     3   3/1
            hwb     3   3/1
            lab     3   3/1
            lch     3   3/1
            oklab   3   3/1
            oklch   3   3/1
            color   4   3/1

            // sRGB color space: hsl(), hwb(), rgb();
            // CIELAB color space: lab(), lch();
            // Oklab color space: oklab(), oklch();
            // Other color spaces: color().
                color(colorspace c1 c2 c3[ / A])

                    colorspace
                        srgb, srgb-linear, display-p3, a98-rgb,
                        prophoto-rgb, rec2020, xyz,
                        xyz-d50, and xyz-d65.

                    c1, c2, c3
                        <number> between 0 and 1,
                        a <percentage> or the keyword none,
                        which provide the component values in the
                        color space.

                    A Optional
                        An <alpha-value> or the keyword none,
                        where the number 1 corresponds to 100%
                        (full opacity).



            // Named colors
            rebeccapurple
            aliceblue

            // RGB Hexadecimal
            #f09
            #ff0099

            color(display-p3 0 1 0)

            // RGB (Red, Green, Blue)
            rgb(255 0 153)
            rgb(255 0 153 / 80%)

            // HSL (Hue, Saturation, Lightness)
            hsl(150 30% 60%)
            hsl(150 30% 60% / 0.8)
            hsl(0.15turn 90% 50%)

            // HWB (Hue, Whiteness, Blackness)
            hwb(12 50% 0%)
            hwb(194 0% 0% / 0.5)

            // LAB (Lightness, A-axis, B-axis)
            lab(50% 40 59.5)
            lab(50% 40 59.5 / 0.5)

            // LCH (Lightness, Chroma, Hue)
            lch(52.2% 72.2 50)
            lch(52.2% 72.2 50 / 0.5)

            // Oklab (Lightness, A-axis, B-axis)
            oklab(59% 0.1 0.1)
            oklab(59% 0.1 0.1 / 0.5)

            // Oklch (Lightness, Chroma, Hue)
            oklch(60% 0.15 50)
            oklch(60% 0.15 50 / 0.5)
        */
        let vals = splitObj.values
        let valueVal = vals?.join(' ')
        // console.log('translateValue', valueVal)

        let outStack = this.forwardDigestKeys(splitObj, vals)

        // console.log('Stacked', outStack.join(' '))
        // console.log('value  ', valueVal)

        return outStack.join(' ')
    }

    /* Walk forward through a list of values, until the walk is exausted.
        The loop is goverened by each discovered function, A receiver function
        must return `[inStack, outStack, currentIndex]`, for the next function
        to receive.

            const receiver =  function(splitObj, inStack, outStack, currentIndex) {
                return [inStack, outStack, currentIndex]
            }

        Digest any keys from `inStack`,
        Add any values to `outStack` to push results to the final results.
        currentIndex defines where (within the vals) the forward processor is -
        at the time of functional entry.

        The function returns the index for the next iteration, when the
        inStack.slice(currentIndex) to digest the _ongoing_ keys.

        returning an index _past_ the length of the `inStack` will end the loop.
     */
    forwardDigestKeys(splitObj, vals) {
        let iterating = true;
        let inStack = (vals || []);
        let maxIndex = 100;
        let currentIndex = 0
        let outStack = []

        /* Discover any "special" keys to digest the value processing,
        such as "vars-*" */

        while (iterating) {
            // Each function return a _result_ (appended or untouched),
            // and the next keys. Next keys > 0 == iterating

            let currentValKey = inStack[currentIndex]
            let digestFunc = this.translateMap[currentValKey]
            if(digestFunc){
                // console.log('digesting', inStack);
                [inStack, outStack, currentIndex] = digestFunc(splitObj,
                                            inStack, outStack, currentIndex)
                // console.log('Results.', inStack, outStack, currentIndex)
            } else {
                outStack.push(this.beforeOutStack(inStack[currentIndex], currentIndex, splitObj))
            }

            currentIndex += 1
            if(currentIndex >= inStack.length || currentIndex > maxIndex) {
                // Instack exausted.
                iterating = false;
            }
        }

        // for (var i = 0; i < (vals || []).length; i++) {
        //     let k = vals[i]
        //     let digest = this.translateMap[k]
        //     if(digest){
        //         // return digest.bind(this)(splitObj, i)
        //         console.log('Ignoring digest', digest.name)
        //     }
        // }

        return outStack//.join(' ')
        // return valueVal

    }

    /*
    A map of all functions to perform single item value checking before the
    value is pushed into the outbound stack.

    These functions execute on every input value
     */
    keyValueFunctions = new Map()
    beforeOutStack(inStackValue, currentIndex, splitObj) {
        // console.log('Pushing', inStackValue, splitObj)
        let callList = this.getKeyFunctionMatch(inStackValue)
        let res = this.collapseFunctions(callList, splitObj)
        return res == undefined? inStackValue: res;
        // return (res && res?.handler(res, splitObj)) || inStackValue
    }

    /*
        Receive a call list generated by the key function matching tool
        to reduce the chained functions to a single value.

            let s = "red.functionName.anotherFunction"
            let callList = this.getKeyFunctionMatch(s)
            let resultString = this.collapseFunctions(callList, splitObj)

        The splitObj is not utilised during the collapse (only given
        to the handler function.)

        Note; the calllist iterates in reverse as the _last_ item in the calllist tree is
        the first (from left) function split

        The iterator collapses upward, giving the _previous result_ to the next.
     */
    collapseFunctions(callList, splitObj) {

        // run backward, passing the _last_ value resolved to the previous function
        // "color-red.raise.forceGreen"
        // color: forceGreen(raise(red))
        let result = undefined;
        for (var i = callList.length - 1; i >= 0; i--) {
            let item = callList[i]
            let value = result == undefined? item.remainder: result
            let handler = item.handler
            // If the handler is missing at this point, the developer
            // assigned an unknown function.
            // Capture and default to the _previous_ result,
            // this essentially _skips_ unknown functional calls.
            // However an Error may be better.
            result = handler && handler(value, item, i, splitObj) || result
        }
        return result

    }

    getKeyFunctionMatch(fullString) {
        /* iterate backward, tokensizing dicovered functions
        until the resource is exausted.*/
        let backLoop = fullString != undefined;
        let lastVal = fullString
        let res = []
        while(backLoop) {
            let item = this.getKeyFunctionMatchOnce(lastVal)
            if(item.success == false) {
                // console.log('breakout on', item.match.name)
                // console.log('breakout on', item)
                //break
            }

            backLoop = item.match.start > -1
            if(backLoop) {
                /* Parsing errors yield "partial" keys if success is false.
                If this occurs on the very last item,
                the indexed iterator yields a poor value to push into a
                _non_ function.*/
                lastVal = item.remainder
                res.push(item)
            }

        }

        // take one from the end and
        // reloop:
        //      color-red.raise.forceGreen
        //                      forceGreen  red.raise -> 'Green'
        //                raise 'Green' -> `shadeUp(color)` -> lighterGreen
        //           lighterGreen


        // the preceding function should accept the value of
        // the last return.
        // the last return should provide a _new_ string for back-slicing.

        return res
    }

    getKeyFunctionMatchOnce(fullString, keyDelimiter='.', argumentDelimiter=':') {

        let start = fullString.lastIndexOf(keyDelimiter)
        let end = fullString.length
        let bits = fullString.slice(start+1, end).split(argumentDelimiter)
        let name = bits[0]
        let args = bits.slice(1)

        let handler = this.keyValueFunctions.get(name)

        let res = {
            // The input string
            value: fullString
            // The result from the split of the discovered functio
            , remainder: fullString.slice(0, start)
            // The mapped function and any discovered argments
            , handler, args
            // The object denoting the position of the match.
            , match: {
                start
                , end
                , name
            }
        }

        res.success = handler != undefined

        return res
    }

    /*
        Use minimal processing to capture any classes with starting with the
        given keys.

        return a list of matching keys
     */
    filterClasses(origin, keys, asDict=false) {
        let classList = origin.classList
            , res = asDict? {}: []
            , push = (k, e, i) => res.push([i,e])
            ;
        if(asDict) {
            push = (k, e, i) => res[k] = [i, e]
        }

        classList.forEach(function(e, i, a){
            let first = e.split('-')[0]
            if(keys.indexOf(first) > -1) {
                push(first, e, i)
                // res.push(e)
                // res[first] = e
            }
        })

        return res
    }

    /* Perform a filterClasses and process each entry as as a split.*/
    filterSplit(origin, keys, asDict=false) {
        let classes = this.filterClasses(origin, keys, asDict)
        if(asDict) {
            let res = {}, index =0
            for(let k in classes) {
                let e = classes[k]; // [index, value]
                res[k] = this.objectSplit(e[1], undefined, undefined, e[0])
            }
            return res
        }

        let res = []
        classes.forEach((e)=>{
            res.push(this.objectSplit(e))
        })
        return res
    }

    removeRule(splitObj, props=undefined, withParentSelector=true) {
        let valueKey = splitObj?.props?.join('-')
        let propStr = this.asSelectorString(splitObj, withParentSelector)
        let exists = this.dcss.selectorExists(propStr)
        if(!exists) {
            // Prop doesn't exist.
            return
        }

        let res = this.dcss.removeRuleBySelector(propStr)
    }

    /*Given a special splitobject using `objectSplit()`, convert to a css
      style and insert into the dynamic stylesheet.

      1. geneate a selector string
      2. Check existing; return early if it exists
      3. Convert the splitobject values to a propery dictionary
      4. Assign any user overrides + use split node hander if exists
      5. Insert into the stylesheet + renderAll
     */
    insertRule(splitObj, props=undefined, withParentSelector=true) {
        let valueKey = splitObj?.props?.join('-')
        // The class selector e.g. ".margin-top-\special"
        let propStr = this.asSelectorString(splitObj, withParentSelector)

        let exists = this.dcss.selectorExists(propStr)
        if(exists) {
            // Prop created. Return the original.
            return this.dcss.getRuleBySelector(propStr)
        }

        let valueVal = this.translateValue(splitObj)

        // The style object applied to the prop string:
        // .propSt { declarations }
        let declarations = {[valueKey]: valueVal}

        if(props) {
            // Apply any user enforced object overrides.
            Object.assign(declarations, props)
        }


        let handlerRes = {
            insert:true
        }

        let handlerFunc = splitObj.node?.handler?.bind(splitObj)
        if(handlerFunc) {
            // executing the handler and replace the handlerRes if required.
            if(typeof(handlerFunc) == 'function') {
                let potentialRes = handlerFunc(splitObj)
                if(potentialRes !== undefined) {
                    handlerRes = potentialRes
                }
            }
        }


        if(handlerRes.insert !== false) {
            let renderArray = this.dcss.addStylesheetRules({
                [propStr]: declarations
            });

            renderArray.renderAll()
            return renderArray
        }
    }

    /*Insert a function into the graph, to accept the tokens
        insertRecevier('font-pack', handlerFunc(...tokens){
            console.log('Install', tokens)
        })

        > 'font-pack-roboto'
        'Install roboto'
    */
    insertReceiver(keys, handler) {

        let leaf = this.addTree(keys)
        leaf.handler = handler

        return leaf
    }

    /* Convert the given `entity` to a CSS Selector string. The entity may be:
        + array: of strings
        + string
        + object: with `props`: array of strings
        + object: with `str` as string

            this.asString('margin-top-.5em', withParentSelector=false)
            ".margin-top-\\.5em"

            this.asString('margin-top-.5em', withParentSelector=true)
            ".acme-labs .margin-top-\\.5em"

        If a parent selector exists, this is applied as a prefix to the selector
        Return a string, CSS selector escaped
    */

    asSelectorString(entity, withParentSelector=true) {
        let clean;
        // array
        if(Array.isArray(entity)) {
            // prop bits
            let a = entity.join('-')
            clean = this.escapeStr(a)
        }

        // string,
        if(typeof(entity) == 'string') {
            // is str
            clean = this.escapeStr(entity)
        }

        // object
        if(entity.props) {
            // is splitObj
            let a = entity.props.join('-')
            clean = this.escapeStr(a)
        }

        if(entity.str) {
            // splitobject before props.
            clean = this.escapeStr(entity.str)
        }

        let propStr = `.${clean}`

        if(withParentSelector) {
            return this.prependParent(propStr, entity)
        }

        return propStr
    }

    /*
        Given a finished selector and the original entity generating the
        selector, return a string to replace the given cleanString.

            prependParent('.foo', {})
            '.acme-labs .foo'
     */
    prependParent(cleanString, originalEntity) {
        if(this.parentSelector != undefined) {
            let v = this.parentSelector
            return `${v}${cleanString}`
        }

        return cleanString
    }

    escapeStr(str) {
        return str.replace(this.escapeRegex, "\\$&")
    }

    isProperty(parts, sep=this.sep) {
        /* Given a CSS Attribute, return a bool to denote if it exists
        within the graph.
        Useful for _testing_ keys for validity

            > isAttribute('margin-bottom')
            true
        */
        let res = this.objectSplit(parts)
        return res.values.length == 0
    }

    isDeclaration(parts, sep=this.sep) {
        let res = this.objectSplit(parts)
        return res.values.length > 0 &&  res.props.length > 0
    }

    getCSSText() {
        let strRes = ''
        let lineEnd = '\n'
        let sheet = this.dcss.getSheet()
        // debugger
        for(let rule of sheet.rules) {
            strRes += `${rule.cssText};${lineEnd}`
        }

        return strRes
    }

    /*
    Called by the monitor upon a `class` mutation, with the
    list of _new_ classes applied to the entity

        cg.captureNew(['margin-solid-1px'])

    Any detected rule of which does not exist, is created and
    applied to the class graph.
     */
    captureChanges(items, oldItems, origin) {
        let cg = this;
        // console.log('Capture new', items, oldItems)
        this.discoverInsert(items, origin)
        this.discoverRemove(oldItems, origin)
    }

    discoverInsert(items, origin) {
        let cg = this;
        for(let str of items) {
            if(str.length == 0) {
                continue
            }
            let splitObj = cg.objectSplit(str)
            splitObj.origin = origin
            let n = splitObj.node?.handler
            // debugger
            let func = n? n.bind(splitObj): cg.insertRule.bind(cg)
            let res = func(splitObj)
            // console.log(str, res)
        }

    }

    discoverRemove(oldItems, origin) {
        let cg = this;
        for(let str of oldItems) {
            if(str.length == 0) {
                continue
            }
            let splitObj = cg.objectSplit(str)
            splitObj.origin = origin
            let n = splitObj.node?.unhandler
            let func = n?.bind(splitObj) //: cg.removeRule.bind(cg)
            let res = func && func(splitObj)
        }

    }

    processOnLoad(node, watch=document) {
        /* Process the given node using `process(node)`,
        when the `DOMContentLoaded` event emits from the `watch` object.

        By default `watch` is the document.

            cg.processOnLoad(body)

         */
        if(this.domContentLoaded == true) {
            return this.process(node)
        }

        (watch || node).addEventListener('DOMContentLoaded', function(){
            this.process(node)
            this.domContentLoaded = true
        }.bind(this))
    }

    process(parent=document.body) {
        let classes = this.getAllClasses(parent, true)
        // for(let name of classes) {
        //     debugger
        //     this.safeInsertLine(name)
        // }
        classes.forEach((vals, key)=> this.safeInsertMany(key, vals))
    }

    safeInsertMany(entity, classes) {
        let index = 0
        for(let name of classes) {
            this.safeInsertLine(name, entity, index++)
        }
    }

    safeInsertLine(name, entity, index=-1) {
                     // objectSplit(str, sep, index=-1)
        let spl2 = this.objectSplit(name, undefined, undefined, index)
        if(spl2.valid) {
            spl2.origin = entity
            this.insertRule(spl2)
        }
        return spl2
    }

    getAllClasses(parent=document.body, deep=false, includeParent=true) {
        // console.log('Process.')

        let stackClasses = function(node) {
            // Do whatever you want with the node object.
            node.classList.forEach(x=>allClasses.add(x))
        }

        let allClasses = new Set()

        if(deep) {
            /* Remap the outbound unit to a Map rather than a Set
            each map key is the entry node for the classes.

            Rewrite the stacking function to use a Map */

            allClasses = new Map()
            stackClasses = function(node) {
                allClasses.set(node, new Set(node.classList)) // .forEach(x=>allClasses.add(x))
            }
        }

        ;includeParent && stackClasses(parent);

        parent.querySelectorAll('*').forEach(stackClasses);

        return allClasses
    }

    addClass(entity, ...tokens) {
        let nodes = this.asNodes(entity)
        for(let node of nodes) {
            for(let token of tokens) {
                for(let t of token.split(' '))
                node.classList.add(t)
            }
        }
    }

    removeClass(entity, ...tokens) {
        let nodes = this.asNodes(entity)
        for(let node of nodes) {
            node.classList.remove(...tokens)
        }
    }

    asNodes(entity) {
        let nodes = [entity]
        if(typeof(entity) == 'string') {
            nodes = document.querySelectorAll(entity)
        }
        return nodes
    }
}


;ClassGraph.addons = {};

// export {
//     ClassGraph
// }


/**
 * Polyclass.js
 *
 * This file serves as a convenience tool for the class graph
 * and dynamic graph.
 */


// ;(()=>{

class PolyObject {
    constructor([config]=[]) {
        this.units = polyUnits
        // console.log('me:', config)
        let cg = new ClassGraph(config)
        cg.generate(config?.target)
        this._graph = cg

        const _htmlNode = this?.HTMLElement || function(){}
        // PolyWrapped or {} classical
        let func = (config instanceof _htmlNode)? this.hotLoad: this.loadConfig
        func.bind(this)(config)
    }

    hotLoad(node) {
        console.log('Hotload')
        return this.loadConfig({
            target: node
            , process: false
            // , isInline: true
        })
    }

    loadConfig(config) {
        // console.log('load', config)
        if(config?.processOnLoad) {
            this.processOnLoad(config.processOnLoad)
        }

        if(config?.target && config?.process != false) {
            this.process(config.target)
        }

        if(config?.isInline) {
            // test for active attributes
            const attrValue = this.getParsedAttrValue('monitor', config.target)
            if(attrValue !== false) {
                this._graph?.monitor && this._graph.monitor(config.target)
            }
        }

        this.innerProxyHandler = {
            reference: this
            , get(target, property, receiver) {
                /* polyclass.attribute or polyclass.method() was called.

                handle the property target on the classgraph (the read object)
                 */
                let realTarget = this.reference;

                if(property in realTarget) {

                    if(realTarget[property].bind) {
                        return realTarget[property].bind(realTarget)
                    }
                    return realTarget[property]
                };
            }

            , apply(target, thisArg, argsList){
                /* Called as a function, wrapping an entity as scope

                    Polyclass(argsList)
                    new Polyclass(argsList)
                 */
                console.log('innerProxyHandler apply...', argsList)
                // get singleton
            }
        }

        this.innerHead = function(entity){
            /* inner head accepts a thing to manpulate*/

        }

        this.proxy = new Proxy(this.innerHead, this.innerProxyHandler)
    }

    /* Return the current poly graph of keys. */
    get graph() {
        return this._graph
    }

    /*
        Return the graph CSS dynamic Stylesheet instance.
    */
    get sheet() {
        return this._graph.dcss
    }

    /*
        Return the given configuration for this Polyclass instance.
        return object
    */
    get config() {
        return this._graph.conf
    }

    getParsedAttrValue(name, target, _default=undefined) {
        target = target || this._graph.conf.target;
        const attrs = target.attributes
        const attrv = attrs.getNamedItem(name);
        if(attrv === null) {
            return _default
        }

        let val = attrv.value
        if(val.length == 0) { return _default }

        const attrValue = JSON.parse(val)
        return attrValue;
    }

    /*
    Return the instance from the units, matching the entity.
    if the entity is undefined, return the polyobject for _this_ target.
     */
    getInstance(entity) {
        if(entity === undefined) { entity = this.target }
        let id = entity?.dataset?.polyclassId || entity
        return polyUnits.get(id)
    }

    processOnLoad(){
        return this._graph.processOnLoad.apply(this._graph, arguments)
    }

    process(){
        return this._graph.process.apply(this._graph, arguments)
    }

    /* insert a class selector into the graph

        pc.addTree(['tom','d','harry'], function(splitObj){})
    */
    add(keys, callback) {
        return this._graph.addTree.apply(this._graph, arguments)
    }

    /*Insert a deinfition with an undeclared classname directly to the tree

        pc.insertReceiver(['tom','d','harry'], function(splitObj){})

     */
    insertReceiver(classWord, definition) {
        return this._graph.addTree.apply(this._graph, arguments)
    }

    /* apply a class word and properties into the tree. This becomes an active
    css declaration:

        pc.insertClassProps('demo-box', { 'font-size': '1.5em'})

        .demo-box {
            font-size: 1.5em;
        }
     */
    insertClassProps(classWord, props) {
        return this._graph.insertLine.apply(this._graph, arguments)
    }

    /* Insert a complex definition of rules directly to the sheet.
       Returns an array of changes with a `result.renderAll()` method to perform
       `render()` on each returned rule.

        v = pc.insertRules([
            ['body',
                ['background', '#333']
                , ['color', '#991111']
            ]
        ]);

        v.renderall()

       Alternatively if the rule is manipulated before its used, the result can
       _replace_ the existing rendered styles:

           b = pc.insertRules({
               body: [
                   {color: '#11AA11'}
                   , propInfo
               ]
           });

           propInfo.background = '#000'
           propInfo.color = 'red'
           b[0].replace()
     */
    insertRules(complexDefinition) {
        return this._graph.dcss.addStylesheetRules.apply(this._graph.dcss, arguments)
    }

    asString() {
        return this._graph.getCSSText()
    }
}


/*
    This function is the Polyclass proxy target for `Polyclass()`.
    This function executes the `newInstance` function on the primary
    proxt, If called with `new Polyclass`
*/
const polyclassHead = function(){
    // console.log('new', arguments)
    return polyclassProxy.newInstance.apply(polyclassProxy, arguments)
};

const polyUnits = new Map()


const polyclassProxy = {
    /* The handler for the main polyclass instance.

    Written as a class for nicer definitions.
    */
    safeSpace: {
        units: polyUnits
        , addons: []
    }

    , get(target, property, receiver) {
        /* polyclass.attribute or polyclass.method() was called.

        handle the property target on the PolyObject instance (the read object)
         */
        let realTarget = this.getInstance();

        if(property in realTarget) {
            let val = realTarget[property];

            if(val && val.bind) {
                return val.bind(realTarget)
            }
            return val
        };
        // console.warn(`No property ${property} on receiver`, realTarget)

        return this.safeSpace[property]
    }

    , newInstance() {
        // console.log('new instance', Array.from(arguments))
        let r = new PolyObject(Array.from(arguments))
        return r
        // return r.proxy
    }

    , getInstance(){
        if(this._instance)  {
            return this._instance
        }
        this._instance = this.newInstance.apply(this, arguments)
        this.safeSpace['instance'] = this._instance
        return this._instance
    }

    , apply(target, thisArg, argsList){
        /* Called as a function, wrapping an entity as scope

            Polyclass(argsList)
            new Polyclass(argsList)
         */
        console.log('Polyclass apply...', target, thisArg, argsList)
         if(argsList[0] instanceof HTMLElement) {
            console.log('Wrapped', )
            return this.newInstance.apply(this, argsList)
         }
        // get singleton
        return this.getInstance.apply(this, argsList)
    }
}


const Polyclass = new Proxy(polyclassHead, polyclassProxy)
// window.polyUnits = polyUnits


// })();


// Export the modules or components that should be accessible to users
export {
  DynamicCSSStyleSheet, RenderArray, ClassGraph, Polyclass
};
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

        // install as header <link> items
        // console.info('Installing Google fonts: familyStrings:', familyStrings)
        generateGoogleLinks(familyStrings).forEach((x)=>document.head.appendChild(x))

        // Install additional css additions
        installFontObjects(fonts, obj)
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
