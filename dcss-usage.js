/*

 */
console.log('Running index')


const autoMain = function(){
}


const cg = generateClassGraph({
    addons: true // default true
    , vendorLocked: false
    // , prefixes: ['pc','x']
    , aliases: {
        background: ['bg', 'back']
        , border: ['bd']
        , var: ['v']
        , padding: ['pd']
        , radius: ['r']
    }
})


const pc = Polyclass({
    addons: true // default true
    , vendorLocked: true
    , processOnLoad: document.body
    , prefixes: ['pc','x']
    , aliases: {
        background: ['bg', 'back']
        , border: ['bd']
        , var: ['v']
        , padding: ['pd']
        , radius: ['r']
        , 'margin': ['mg']
        , 'color': ['cl', 'c']

    }
})


cg.processOnLoad(document.body)
// Monitor for future nodes.
const cgObserver = cg.monitor(document.body)

cg.addAlias('margin', 'mg')
cg.addAliases('color', ['cl', 'c'])

v = cg.dcss.addStylesheetRules([
    ['body',
        ['background', '#333']
        , ['color', '#991111']
    ]
]);

v.renderAll()


let propInfo = { background: '#111' }

b = cg.dcss.addStylesheetRules({
    body: [
        {color: '#11AA11'}
        , propInfo
    ]
});

propInfo.background = '#000'
propInfo.color = 'red'
b[0].replace()


cg.insertLine('demo-box', { 'font-size': '1.5em'})

cg.vars({
    "happy-octopus": "#095a1a"
})

cg.addTree(['tom','d','harry'], function(splitObj){
    console.log('harries remix', arguments)
})

cg.addTree(['tom','d'], function(splitObj){
    console.log('tom-d remix', arguments)
})

;autoMain();
