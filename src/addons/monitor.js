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
