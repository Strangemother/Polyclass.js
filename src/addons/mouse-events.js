/**
 * # Mouse Events mouse-[event]-*
 */
(function(){

    let cg;

    const insertReceiver = function(){
        console.log('mouse-event receiver')

        ClassGraph.addons.varTranslateReceiver = function(_cg){
            cg = _cg;
            cg.insertReceiver(['event'], mouseReceiver)
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
            const target = splitObj.origin
            addHandler(splitObj, target, action, others)
        } else {
            console.warn('Unknown action', action)
        }
        // return ''
    }

    const addHandler = function(splitObj, target, action, others) {
        // console.log('action', action, others, target)
        target.addEventListener(action, (e)=>actionHandler(e, action, others))
    }

    /* The generic action handler for an event.
    Farm the action to the programmed destination */
    const actionHandler = function(e, action, others) {
        let [innerAction, ...parts] = others
        console.log(e, action, others)
        console.log(innerAction, parts)
        const innerActionMap = {
            call(){
                /* Perform a functional call to the given function name.*/
            }
            , toggle() {
                /* Perform a class "toggle" in some shape. */
                console.log(parts, others, action)
                e.currentTarget.classList.toggle(parts.join('-'))
                
            }
        }

        let innerFunc = innerActionMap[innerAction]
        if(innerFunc) {
            innerFunc()
        }
    }


    ;insertReceiver();
})()
