/**
 * # Mouse Events mouse-[event]-*
 */
(function(){

    let cg;

    const insertReceiver = function(){
        console.log('mouse-event receiver')

        ClassGraph.addons.varTranslateReceiver = function(_cg){
            cg = _cg;
            cg.insertReceiver(['mouse'], mouseReceiver)
        }

        // ClassGraph.addons.varTranslateReceiver = function(_cg){
        //     cg = _cg;
        //     cg.insertTranslator('var', mouseReceiver)
        // }
    }

    const mouseReceiver =  function(splitObj, index) {

        // console.log('running on', splitObj)
        values = splitObj.values
        let [action, ...others] = splitObj.values;
        if(document[`on${action}`] !== undefined){
            // can be null or function to be defined.
            console.log('action', action, splitObj.origin)
        }
        // return ''
    }



    ;insertReceiver();
})()
