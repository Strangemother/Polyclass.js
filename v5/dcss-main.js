

const cg = generateClassGraph({
        addons: true /* default true*/
    })

const autoMain = function(){
    console.log('Running autoMain')

    // No need to install as the addons are enabled.
    // cg.insertReceiver(['font', 'pack'], fontPackReceiver)

    cg.processOnLoad(document.body)
    cg.monitor(document.body)
}


;autoMain();
