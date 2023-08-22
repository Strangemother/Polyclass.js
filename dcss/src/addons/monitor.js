(()=>{

let cg;

const insertReceiver = function(){


    ClassGraph.addons.monitorClasses = function(_cg){
        cg = _cg;
    }

    ClassGraph.prototype.monitor = function(parent=document.body) {
        monitorClasses(parent)
    }
}


const monitorClasses = function(node) {
    console.log('monitorClasses', node)
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
        if(mutation.attributeName == 'class') {
            classMutationDetection(mutation)
        }
    }

    let mutationHandler = function(mutations) {
        console.log('mutationHandler', mutations)
        mutations.forEach(eachMutation);
    }

    let observer = new MutationObserver(mutationHandler);
    // pass in the target node, as well as the observer options
    return observer.observe(node, config);
}


const classMutationDetection = function(mutation) {
    let classes = mutation.target.classList.value;
    let old = mutation.oldValue
    console.log(`old: "${mutation.oldValue}", target:`
                , mutation.target
                , `classes: "${classes}"`
            )
    let new_spl = classes.split(' ')
    let old_spl = old?.split(' ')
    let newItems = old_spl? difference(new_spl, old_spl): new_spl
    console.log('new', newItems)
    // let removedItems = difference(old_spl, new_spl)
    // console.log('removedItems', removedItems)
    cg.captureNew(newItems)
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
