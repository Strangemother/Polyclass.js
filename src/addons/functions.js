;(function(){

    let cg;
    let rootDeclaration = {};
    let definition = undefined
    let rootRule;

    const insertReceiver = function(){

        ClassGraph.addons.functionsReceiver = function(_cg){
            cg = _cg;
            cg.keyValueFunctions.set('forceGreen', forceHook)
            cg.keyValueFunctions.set('force', forceHook)
            cg.keyValueFunctions.set('raise', raiseHook)
        }
    }

    const forceHook = function(value, token, index, splitObj) {
        // console.log('Force green hook', token, splitObj)
        let res = token.value.slice(0, token.match.start)
        // console.log(res)
        // return res

        return token.args.length > 0? token.args[0]: 'green'
    }

    const raiseHook = function(value, token, index, splitObj) {
        console.log('raise hook', token, splitObj)
        let res = token.value.slice(0, token.match.start)
        console.log(res)
        // return res
    }

    const functionsHook = function(d) {

        // target = document.querySelector(target)
        console.log('functions', d)
    }


    ;insertReceiver();
})()
