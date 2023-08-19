
class RenderArray extends Array {
    renderAll() {
        for(let node of this) {
            node.render()
        }
    }
}

class DynamicCSSStyleSheet {

    styleEl = undefined
    insertMethod = 'adopt'

    constructor(cg) {
        this.installAddons(cg, this.constructor.addons)
    }

    installAddons(cg, addons){
        for(let key in addons) {
            let addon = addons[key]
            addon(cg)
        }
    }

    addStylesheetRules(rules, _sheet) {
        /*
        let v = addStylesheetRules([
            ['#ball',
                ['offset-path', 'path("M126.09375 10 V86.28 A9.951 9.950 0 0 0 136.04375 96.23 H708.3468750")']
            ]
        ]);
        */
        if(Array.isArray(rules)) {
            return this.addStylesheetRulesArray(rules, _sheet)
        }

        return this.addStylesheetRulesObject(rules, _sheet)
    }

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

    pushResponse(res, styleSheet, rule) {
        // console.log(rule)
        let _rule = this.pushArrayRule(styleSheet, rule)
        res.push(_rule)
        return _rule
    }

    getSheet(_sheet) {
        return this.getEnsureStyleSheet(_sheet)
    }

    addStylesheetRulesObject(rules, _sheet) {
        let styleNode = this.getEnsureStyleSheet(_sheet)

        let res = new RenderArray()
        let styleSheet = styleNode//.sheet;

        for(let selector in rules) {
            let rule = rules[selector]
            let entries = Object.entries(rule)
            let newRule = [selector, entries]
            // console.log(newRule,newRule)
            this.pushResponse(res, styleSheet, newRule)
        }

        return res
    }

    selectorExists(selector, _sheet){
        let sheet = this.getEnsureStyleSheet(_sheet)

        for(let rule of sheet.cssRules) {
            if(selector == rule.selectorText) {
                return true
            }
        }
        return false
    }

    getRuleBySelector(selector, _sheet){
        let sheet = this.getEnsureStyleSheet(_sheet)

        for(let rule of sheet.cssRules) {
            if(selector == rule.selectorText) {
                return selector
            }
        }
        return undefined
    }

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
                let propStr = content || this.getPropStr(rules)
                let selector = rules[0];
                let _ruleIndex = _this.insertRuleSelectorPropStr(this.styleSheet, selector, propStr)
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

    stringEntry(name, value, isImportant=false) {
        let importantStr = isImportant ? ' !important' : '';
        return `${name}: ${value}${importantStr};\n`
    }

    isLiteralObject(a) {
        return (!!a) && (a.constructor === Object);
    }

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

DynamicCSSStyleSheet.addons = {}