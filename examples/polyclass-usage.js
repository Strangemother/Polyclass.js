/*

 */
console.log('Running index')


const autoMain = function(){
}


const pc = Polyclass({
    addons: true // default true
    , vendorLocked: false
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


pc.processOnLoad(document.body)

//// Monitor for future nodes.
//const cgObserver = pc.monitor(document.body)

v = pc.insertRules([
    ['body',
        ['background', '#333']
        , ['color', '#991111']
    ]
]);

v.renderAll()


let propInfo = { background: '#111' }

b = pc.insertRules({
    body: [
        {color: '#11AA11'}
        , propInfo
    ]
});

propInfo.background = '#000'
propInfo.color = 'red'
b[0].replace()


// pc.insertReceiver(  'demo-box', { 'font-size': '1.5em'})
pc.insertClassProps('demo-box', { 'font-size': '1.5em'})

// pc.vars({
//     "happy-octopus": "#095a1a"
// })

pc.insertReceiver(['tom','d','harry'], function(splitObj){
    console.log('harries remix', arguments)
})

pc.insertReceiver(['tom','d'], function(splitObj){
    console.log('tom-d remix', arguments)
})

;autoMain();
