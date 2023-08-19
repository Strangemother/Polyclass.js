

const cg = generateClassGraph()

const autoMain = function(){
    console.log('Running autoMain')
    cg.insertReceiver(['font', 'pack'], fontPackReceiver)
    cg.processOnLoad(document.body)
    cg.monitor(document.body)
}


;autoMain();
