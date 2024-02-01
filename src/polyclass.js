/**
 * Polyclass.js
 *
 * This file serves as a convenience tool for the class graph
 * and dynamic graph.
 */
;(()=>{


const polyclassHead = function(){
    console.log('new', arguments)
    return polyclassProxy.newInstance.apply(polyclassProxy, arguments)
};


class PolyObject {

    // constructor() {
    constructor([config]=[]) {
        console.log('me:', config)
        let cg = new ClassGraph(config)
        cg.generate()
        this._graph = cg
        if(config?.processOnLoad) {
            this.processOnLoad(config.processOnLoad)
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



    processOnLoad(){
        return this._graph.processOnLoad.apply(this._graph, arguments)
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
        return this._graph.asCSSText()
    }
}

const polyclassProxy = {
    /* The handler for the main polyclass instance.

    Written as a class for nicer definitions.
    */

    get(target, property, receiver) {
        /* polyclass.attribute or polyclass.method() was called.

        handle the property target on the classgraph (the read object)
         */
        let realTarget = this.getInstance();

        if(property in realTarget) {

            if(realTarget[property].bind) {
                return realTarget[property].bind(realTarget)
            }
            return realTarget[property]
        };
    }

    , newInstance() {
        console.log('new instance', Array.from(arguments))
        let r = new PolyObject(Array.from(arguments))
        return r.proxy
    }

    , getInstance(){
        if(this._instance)  {
            return this._instance
        }
        this._instance = this.newInstance.apply(this, arguments)
        return this._instance
    }

    , apply(target, thisArg, argsList){
        /* Called as a function, wrapping an entity as scope

            Polyclass(argsList)
            new Polyclass(argsList)
         */
        console.log('Polyclass apply...', argsList)
        // get singleton
        return this.getInstance.apply(this, argsList)
    }
}

window.Polyclass = new Proxy(polyclassHead, polyclassProxy)

})();