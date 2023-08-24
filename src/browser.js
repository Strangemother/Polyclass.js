/*
An entry point for the automated browser integration.

The generateClassGraph function is a freebie to quickly generate a new
class. and is synonymous to:

    let cg = new ClassGraph(config)
    cg.generate()

The `processOnLoad` ensures the lib reads the the view nodes on `DOMContentLoaded`.
The `monitor` addon watches changes to the view and creates any missing classes.
*/

const cg = generateClassGraph({
        addons: true /* default true*/
    })


const autoMain = function(){
    console.log('Running autoMain')

    // No need to install as the addons are enabled.
    // cg.insertReceiver(['font', 'pack'], fontPackReceiver)

    // Execute when required.
    cg.processOnLoad(document.body)
    // Monitor for future nodes.
    cg.monitor(document.body)
}


;autoMain();
