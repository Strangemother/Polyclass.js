
//;(()=>{

var installReceiver = function() {

    let keys = new Set([
        /* Hex is a freebie, under the special term `#` hash: #000000 */
        // 'hex',
        /* Color property is slightly more complicated, with the first param
        as a forced string. */
        // 'color',

        /* Available types, each act the same way: rgb-[3 values][/A]
        If the key is a mismatch, its ignored. */
        'rgb',
        'hsl',
        'hwb',
        'lab',
        'lch',
        'oklab',
        'oklch',
    ])

    ClassGraph.addons.extendedColorValues = function(cg){
        let func = function(prop, values) {
            return forwardHotWordReduce(prop, values, keys)
        }
        cg.reducers.push(func)
    }
}


/* Return a boolean if the detected type is a valid css value of type:

    Number:     0 | 0.0
    Percent:    0%
    Opacity:    0/0
    Angle:      0turn | 0rad
*/
const isNumOrPerc = function(value) {
    return isNumber(value) || isPercent(value) || isOpacityNum(value) || isAngle(value)
}

/* Return boolean for the match of a css value with an alpha: 0/0 */
const isOpacityNum = function(value) {
    // '60%/0.8'
    let spl = value.split('/')
    if(spl.length == 2) {
        return isNumOrPerc(spl[0]) && isNumber(spl[1])
    }
    return false
}

const isAngle = function(value) {
    let types = new Set(["deg","grad","rad","turn"]);
    let extra = value.slice(parseFloat(value).toString().length, value.length)
    return types.has(extra)
}


const isPercent = function(value) {
    return value.endsWith('%') && isNumber(value.slice(0, value.length-1))
}


const isNumber = function(value) {
    if(value == undefined || value.length == 0){ return false };
    let isNum = !isNaN(Number(value))
    return isNum
}


const asThreeBitColor = function(values) {
    let ex = values.slice(4, 5)
    let alp = ''
    if(ex.length>0) {
        alp = `/${ex}`
    }
    return `${values[0]}(${values.slice(1, 4).join(' ')}${alp})`
}


/* Perform a _hot word_ detection on the values recursively. A _hot word_ may be any key.

    forwardHotWordReduce(
        ['color']
        , ['rgb', '10', '10', '10', 'eggs']
        , new Set(['rgb'])
    )

For each forward step detect a key, if found the reducer collects as many
forward properties as required, then releases after the first fail.

This method then performs this after every release, concatenating changed and
unchanged into a response list.

    rgb-200-200-200-foo

    rgb(200 200 200) foo

 */
const forwardHotWordReduce = function(props, values, keys, keyTestFunc=undefined) {
    /*
        Key pops early, and can accept a variable amount of vars.
     */

    let len = values.length
        , position = 0
        , max = values.length + 1
        , count = 0
        , response = []
        ;

    while(position < len && count < max) {
        let sliced = values.slice(position)
        let [key, usedCount] = hotWordReduce(sliced, keys, true, keyTestFunc)

        position += usedCount
        count += 1
        if(Array.isArray(key)) {
            response = response.concat(key)
        } else {
            response.push(key)
        }
    }

    return response
}

/* Perform a _hot word_ detection on the values. A _hot word_ may be any key.

    forwardHotWordReduce(
        , ['rgb', '10', '10', '10', 'eggs']
        , new Set(['rgb'])
        , true
    )

    rgb(200 200 200) // break early
    rgb(200 200 200) egg

For each forward step detect a key, if found the reducer collects as many
forward properties as required, then releases after the first fail if `breakEarly` is true.

    rgb-200-200-200-foo-hsl-20-0%-10-foo

    rgb(200 200 200) foo hsl(20 0% 10) foo

 */

const hotWordReduce = function(values, keys
                            , breakEarly=false
                            , callback=asThreeBitColor
                            , keyTestFunc=undefined) {

    var i = 0;
    let inSet = (x) => keys.has(x)
        , keyStartMatch = keyTestFunc != undefined? keyTestFunc: inSet
        , l = values.length
        , bits = []
        , kept = []
        , lost = []
        , max = 4 // can be 3 or 4
        ;

    for (;i < l; i++) {
        // console.log('---')
        let k = values[i];
        let inI = i;
        if(keyStartMatch(k)) {
            // console.log(i, 'MATCH', k)
            let j = i+1
            kept = [k]
            lost = []
            let ok = true
            while(ok && j < l) {
                let subI = j;
                let subK = values[subI];
                let isNum = isNumOrPerc(subK)
                ok = isNum && j < l && kept.length <= (max-1) // +1 for the original key
                if(isNum) {
                    // console.log('Push', subK)
                    j += 1
                    kept.push(subK)
                    ok = ok && kept.length <= max // +1 for the original key
                } else {
                    // Lost stack
                    // console.log('Lost stack on', subK)
                    // j = 1
                    lost.push(subK)
                }
                // console.log('S', subI, subK, isNum, ok)
            }

            let [a,b] = [inI, j]
            // console.log('a,b ',a, b, values.slice(a,b), kept)
            let plucked = kept.slice(a, b);
            let newEntry = callback(kept)
            if(plucked.length < 3) {
                // console.log('Failed.', bits)
                bits = bits.concat(kept)
                if(breakEarly) {
                    return [bits, j]
                }
            } else {
                // console.log('kept', kept, newEntry)
                // console.log('plucked', plucked)
                bits.push(newEntry)
                // Push back 2, as we landed on the bad node,
                // and we need step into this node, to stack it.
                //
                i = j-1
            }
        } else {
            // console.log(i, k)
            bits.push(k)

            if(breakEarly) {
                let [a,b] = [inI, kept.length]
                // console.log('a,b ',a, b, values.slice(a,b), kept)
                let plucked = kept.slice(a, b);
                let newEntry = callback(kept)
                // console.log('plucked', plucked)
                // console.log('kept', kept)
                if(kept.length < 3) {
                    // console.log('Failed.', 'kept', kept, 'plucked', plucked)
                    return [values[b], kept.length+1]
                } else {
                    // console.log('success.')
                    return [newEntry, kept.length]
                }

                return [values[0], 1]
            }
        }
    }

    // console.log('Done pop', i)
    // console.log('in', values, 'out', bits)

    let newEntry = callback(kept)
    return [newEntry, i+1]
}


;installReceiver();

// })()