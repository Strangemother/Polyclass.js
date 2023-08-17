
class DynamicSheet {
    constructor(selector, config){
        this.selector = selector
        this.config = config || {}
    }

    writeProps(attrs){
        attrs = attrs || this.attrs()
        for(let key in attrs) {
            Object.defineProperty(this, key, {
                get() { return this[`_${key}`]; },
                set(newValue) {
                    this[`_${key}`] = newValue
                    console.log('Update', key, newValue)
                    this.updateAttr(key, newValue)
                },
                enumerable: true,
                configurable: true
            });
            this.updateAttr(key, attrs[key])
        }
    }

    get $element(){
        if(this._element == undefined) {
            this._element = $(this.selector)
        }
        return this._element
    }

    get element(){
        return this.$element[0]
    }

    generate(initProps) {

        if(this.rules != undefined) {
            // regenerate?
            return this
        }

        this.rules = addStylesheetRules([
          [this.selector, initProps]
        ]);

        this.writeProps(this.attrs())
        return this
    }

    attrs(){
        /*
        A List of attributes to assign (initially) to the object.
        All JS CSS props are usable. Any key returned is mapped as a
        getter/setter from this instance - to the dcss instance.

            this.animationPlayState = 'paused'

         */
        let r = Math.ceil(Math.random() * 10)
        return Object.assign({}, {
            "animationDuration": `${r}s`
            , "animationDirection": "normal"
            , "animationTimingFunction": "linear"
            , "animationIterationCount": "infinite"
            , "animationPlayState": "running"
            , "animationFillMode": "unset"
            , "animationDelay": "0s"
            , "animationName": "linear"
            , "offsetPath": "path()"
            , "offsetDistance": '0%'
        }, this.config)
    }

    setPath(path){
        // line.edgeDecor.red.setPath(l.pipe)
        if(typeof(path) == 'string') {
            // no edits
        }

        if(Array.isArray(path)) {
            let pathStr = path.join(' ')
            path = `path('${pathStr}')`
        }

        if(this.rules == undefined){
            this.generate(['offset-path', path])
        } else {
            this.updateAttr('offsetPath', path)
        }
    }

    updateAttr(name, value) {
        for (var i = 0; i < this.rules.length; i++) {
            this.rules[i].style[name] = value
        }
    }
}

var dynamicRuleCache = {}

var dynamicRule = function(selector, path, config) {
    let res = dynamicRuleCache[selector]

    if(dynamicRuleCache[selector] == undefined) {
        res = new DynamicSheet(selector, config)
        dynamicRuleCache[selector] = res
    }

    if(path!=undefined) {
        res.setPath(path)
    }

    return res
}

var styleEl

function addStylesheetRules(rules) {
    /*
    let v = addStylesheetRules([
        ['#ball',
            ['offset-path', 'path("M126.09375 10 V86.28 A9.951 9.950 0 0 0 136.04375 96.23 H708.3468750")']
        ]
    ]);
    */
    if(Array.isArray(rules)) {
        return addStylesheetRulesArray(rules)
    }

    return addStylesheetRulesObject(rules)
}

const insertMethod = 'adopt'


function getEnsureStyleSheet(_sheet) {
    let styleNode = _sheet || styleEl;

    if(insertMethod == 'sheet') {
        if(styleNode == undefined) {
            // Append <style> element to <head>
            styleNode = document.createElement('style');
            document.head.appendChild(styleNode);
        }

        // return styleNode
        return styleNode.sheet
    }

    if(insertMethod == 'adopt') {
        const ss = new CSSStyleSheet();
        document.adoptedStyleSheets.push(ss)
        return ss
    }
}


function addStylesheetRulesArray(rules, _sheet) {
    let styleNode = getEnsureStyleSheet(_sheet)

    let res = []
    let styleSheet = styleNode//.sheet;
    for (let i = 0; i < rules.length; i++) {
        let rule = rules[i];
        pushResponse(res, styleSheet, rule)
    }

    return res
}


const pushResponse = function (res, styleSheet, rule) {
        console.log(rule)
        let _rule = pushArrayRule(styleSheet, rule)
        res.push(_rule)
        return _rule
}


function addStylesheetRulesObject(rules, _sheet) {
    let styleNode = getEnsureStyleSheet(_sheet)

    let res = []
    let styleSheet = styleNode//.sheet;
    for(let selector in rules) {
        let rule = rules[selector]
        let entries = Object.entries(rule)
        let newRule = [selector, entries]
        console.log(newRule)
        pushResponse(res, styleSheet, newRule)
    }


    return res
}


function pushArrayRule(styleSheet, conf) {
    // If the second argument of a rule is an array of arrays,
    // correct our variables.

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

            let propStr = buildPropStr(rule, rightIndex)
            return propStr
        }

        , render(content) {
            let rules = this.conf
            let propStr = content || this.getPropStr(rules)
            let selector = rules[0];
            let _ruleIndex = insertRuleSelectorPropStr(this.styleSheet, selector, propStr)
            this.sheetRule = this.styleSheet.rules[_ruleIndex]
            this.rule = _ruleIndex
        }
        , replace(content) {
            if(!this.sheetRule) {
                return this.render(content)
            }
            let before = this.sheetRule.cssText
            let rules = this.conf
            let selector = rules[0];
            let propStr = content == undefined ? this.getPropStr(this.conf): content
            let after = `${selector} {${propStr}}`
            this.styleSheet.replace(`${before} ${after}`)
        }
    }
}


function buildPropStr(rule, j=1) {

    console.log('Reading rule', rule)
    let propStr = '';

    for (let ruleLength = rule.length; j < ruleLength; j++) {
        let prop = rule[j]
        console.log('prop', prop)
        let name = prop[0]
        let value = prop[1]

        if(isLiteralObject(value)) {
            /*[{background: '#111'}
                , {color: '#11AA11'} ]*/
            for(let key in value) {
                let subVal = value[key]
                propStr += stringEntry(key, subVal, value.important)
                // propStr += `${key}: ${subVal}${importantStr};\n`
            }

            continue
        }

        propStr += stringEntry(name, value, prop[2] != undefined)

    }

    return propStr;

}

const stringEntry = function(name, value, isImportant=false) {
    let importantStr = isImportant ? ' !important' : '';
    return `${name}: ${value}${importantStr};\n`
}

const isLiteralObject = function(a) {
    return (!!a) && (a.constructor === Object);
};



function insertRuleSelectorPropStr(styleSheet, selector, propStr) {
    // Insert CSS Rule
    let ruleStr = `${selector} {${propStr}}`
    console.log(ruleStr)
    let _ruleIndex = styleSheet.insertRule(
                    ruleStr,
                    styleSheet.cssRules.length
                );
    console.log(_ruleIndex)
    return _ruleIndex
}


const classMutationDetection = function(mutation) {
    let classes = mutation.target.classList.value;
    let old = mutation.oldValue
    console.log(`old: "${mutation.oldValue}", target:`, mutation.target, `classes: "${classes}"`)
    let new_spl = classes.split(' ')
    let old_spl = old.split(' ')
    let newItems = difference(new_spl, old_spl)
    console.log('new', newItems)
    // let removedItems = difference(old_spl, new_spl)
    // console.log('removedItems', removedItems)
}


function difference(setA, setB) {
  const _difference = new Set(setA);
  for (const elem of setB) {
    _difference.delete(elem);
  }
  return _difference;
}


const monitorClasses = function(node) {

    // create an observer instance
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {

            if(mutation.attributeName == 'class') {
                classMutationDetection(mutation)
            }
        });
    });

    // configuration of the observer:
    var config = { attributes: true
                    , subtree: true
                    // , childList:true
                    , attributeFilter: ['class']
                    // , characterData: true
                    , attributeOldValue: true
                    // , characterDataOldValue: true
                };

    // pass in the target node, as well as the observer options
    observer.observe(node, config);
}

class ClassGraph {

    generate(node){
        /*
            The graph generatoe produces a depth of allows
            css defintitions. Upon discovery a node may 'release' or continue.
            If the _next_ node is a tree node, continue - if it's a value node, release

         */
        node = node || document.body
        let items = Object.entries(node.style)
        for(let [name, value] of items) {
            this.addCamelString(name)
        }
    }

    addCamelString(name) {
        // convert to kebab-case, then push into the graph
        let kebab = kebabCase(name)
        // console.log(name, kebab)
        let keys = kebab.split('-')
        this.addTree(keys)
    }

    addTree(keys) {

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
    }

    nodeWord() {
        return 'n'
    }

    getRoot(){
        if(!this.graph) {
            this.graph = {
                [this.nodeWord()]: {}
                , meta: { key: 'root', isRoot: true }
                , key: 'root'
            }
        }
        return this.graph
    }

    /*
        When testing a key, we walk the grapg until a leaf.
        If the next step is a node, continue.
        If the leafs' next step is not a node, parse the values.
        reject leaf-only definitions.
     */
    objectSplit(str, sep='-') {
        /* Parse a potential new css class. */
        let keys = str.split(sep)
        console.log('split', str, keys)
        let nodeWord = this.nodeWord()
        let node = this.getRoot()
        let currentNode;
        // c1 rather than c (count).
        // As all references require the count+1
        // - but "c" is usually a 0 index counter
        let c1 = 0;
        let l = keys.length
        for(let k of keys) {
            // loop until a leaf, where the _next_ key is not a value node.
            currentNode = node[nodeWord][k]
            c1 += 1
            let isLastNode = (l == c1)

            if(currentNode == undefined) {
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
        console.log(currentNode)

        // grab the next keys
        let props = keys.slice(0, c1)
        let values = keys.slice(c1)
        console.log(props, values)
        return {
            props, values,
            node: currentNode
        }
    }


}

const kebabCase = function(str, sep='-') {
    let replaceFunc =  ($, ofs) => (ofs ? sep : "") + $.toLowerCase()
    return str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, replaceFunc)
}

const generateClassGraph = function(){
    cg = new ClassGraph()
    cg.generate()
    return cg
}