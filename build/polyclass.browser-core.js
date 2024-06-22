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
        let r = {
            props, values, str,
            node: currentNode,
            index,
            valid: currentNode && (values.length > 0) || false
        }

        // this.translateValue(r)
        return r
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
    captureNew(items, oldItems, origin) {
        let cg = this;
        // console.log('Capture new', items, oldItems)
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
        let spl2 = this.objectSplit(name, undefined, undefined, index)
        if(spl2.valid) {
            // console.log('Inserting', spl2)
            spl2.origin = entity
            this.insertRule(spl2)
        }
        // console.log(spl2)
        // this.isBranch(spl2)
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



/*
    Upon document load, process and *[polyclass] entity. Similar to process()
*/
const autoActivator = function(watch=document){

    watch.addEventListener('DOMContentLoaded', function(){
        onDomLoaded()
    }.bind(this))
};

const getOrCreateId = function(target) {
    return target.dataset.polyclassId || Math.random().toString(32).slice(2)
}

const ensureId = function(target) {
    return target.dataset.polyclassId = getOrCreateId(target)
}

/* Execute when the DOMContentLoaded event executes on the original _watched_
item.
This discovers any polyclass Attributes. and loads a Polyclass instance
into the units.
*/
const onDomLoaded = function() {
    const targets = document.querySelectorAll('*[polyclass]');
    console.log('Discovered', targets.length)
    for(let target of targets){
        let polyclassId = ensureId(target)
        let pc = new Polyclass({target, isInline:true})
        polyUnits.set(polyclassId, pc)
    }
}

autoActivator();

/**
 * Polyclass.js
 *
 * This file serves as a convenience tool for the class graph
 * and dynamic graph.
 */


// ;(()=>{

class PolyObject {

    // constructor() {
    constructor([config]=[]) {
        this.units = polyUnits
        console.log('me:', config)
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
        console.log('load', config)
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
                this._graph.monitor(config.target)
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
    console.log('new', arguments)
    return polyclassProxy.newInstance.apply(polyclassProxy, arguments)
};

const polyUnits = new Map()


const polyclassProxy = {
    /* The handler for the main polyclass instance.

    Written as a class for nicer definitions.
    */
    safeSpace: {
        units: polyUnits
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
        console.log('new instance', Array.from(arguments))
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

