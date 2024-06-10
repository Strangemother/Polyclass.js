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
