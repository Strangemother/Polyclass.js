
var styleEl
const insertMethod = 'adopt'


const addStylesheetRules = function(rules, _sheet) {
    /*
    let v = addStylesheetRules([
        ['#ball',
            ['offset-path', 'path("M126.09375 10 V86.28 A9.951 9.950 0 0 0 136.04375 96.23 H708.3468750")']
        ]
    ]);
    */
    if(Array.isArray(rules)) {
        return addStylesheetRulesArray(rules, _sheet)
    }

    return addStylesheetRulesObject(rules, _sheet)
}


const getEnsureStyleSheet = function(_sheet) {
    let styleNode = _sheet || styleEl;

    if(styleNode != undefined) {
        return styleNode
    }

    if(insertMethod == 'sheet') {
            // Append <style> element to <head>
            styleNode = document.createElement('style');
            document.head.appendChild(styleNode);

        // return styleNode
        v = styleNode.sheet
    }

    if(insertMethod == 'adopt') {
        const ss = new CSSStyleSheet();
        ss.title = 'dcss-sheet'
        document.adoptedStyleSheets.push(ss)
        v = ss
    }
    if(styleEl == undefined) {
        styleEl = v
    }
    return v
}


class RenderArray extends Array {
    renderAll() {
        for(let node of this) {
            node.render()
        }
    }
}


const addStylesheetRulesArray = function(rules, _sheet) {
    let styleNode = getEnsureStyleSheet(_sheet)

    let res = new RenderArray()
    let styleSheet = styleNode//.sheet;
    for (let i = 0; i < rules.length; i++) {
        let rule = rules[i];
        pushResponse(res, styleSheet, rule)
    }

    return res
}


const pushResponse = function (res, styleSheet, rule) {
        // console.log(rule)
        let _rule = pushArrayRule(styleSheet, rule)
        res.push(_rule)
        return _rule
}


const getSheet = function(_sheet) {
    return getEnsureStyleSheet(_sheet)
}


const addStylesheetRulesObject = function(rules, _sheet) {
    let styleNode = getEnsureStyleSheet(_sheet)

    let res = new RenderArray()
    let styleSheet = styleNode//.sheet;

    for(let selector in rules) {
        let rule = rules[selector]
        let entries = Object.entries(rule)
        let newRule = [selector, entries]
        console.log(newRule,newRule)
        pushResponse(res, styleSheet, newRule)
    }

    return res
}


const selectorExists = function(selector, _sheet){
    let sheet = getEnsureStyleSheet(_sheet)

    for(let rule of sheet.cssRules) {
        if(selector == rule.selectorText) {
            return true
        }
    }
    return false
}


const getRuleBySelector = function(selector, _sheet){
    let sheet = getEnsureStyleSheet(_sheet)

    for(let rule of sheet.cssRules) {
        if(selector == rule.selectorText) {
            return selector
        }
    }
    return undefined
}


const pushArrayRule = function(styleSheet, conf) {
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


const buildPropStr = function(rule, j=1) {

    // console.log('Reading rule', rule)
    let propStr = '';

    for (let ruleLength = rule.length; j < ruleLength; j++) {
        let prop = rule[j]
        // console.log('prop', prop)
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


const insertRuleSelectorPropStr = function(styleSheet, selector, propStr) {
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
