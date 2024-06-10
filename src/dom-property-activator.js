
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
    // console.log('Discovered', targets.length)
    for(let target of targets){
        let polyclassId = ensureId(target)
        let pc = new Polyclass({target, isInline:true})
        polyUnits.set(polyclassId, pc)
    }
}

autoActivator();
