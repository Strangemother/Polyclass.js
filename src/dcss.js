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