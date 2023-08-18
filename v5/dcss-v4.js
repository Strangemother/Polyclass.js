
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
