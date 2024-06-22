
//;(()=>{

var installReceiver = function() {
    ClassGraph.addons.forwardColorValues = function(cg){
        let func = function(prop, values) {
            return forwardReduceValues(prop, values)
        }
        cg.reducers.push(func)
    }
}


const forwardReduceValues = function(props, values) {
    /*
        Key pops early, and can accept a variable amount of vars.
     */
    const merge = (v)=> v.join('-');

    let len = values.length
        , position = 0
        , max = values.length + 1
        , count = 0
        , response = []
        ;

    while(position < len && count < max) {
        let sliced = values.slice(position)
        let [key, usedCount] = popOneValueForward(sliced, true)

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

const isNumOrPerc = function(value) {
    // if(isNumber(value)) {
    //     return true
    // }
    return isNumber(value) || isPercent(value) || isOpacityNum(value) || isAngle(value)
}

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

const popOneValueForward = function(values, breakEarly=false) {

    let items = new Set([
        // 'hex',
        // 'rgba',
        // 'color',
        'rgb',
        'hsl',
        'hwb',
        'lab',
        'lch',
        'oklab',
        'oklch',
    ])

    let keyStartMatch = (x) => items.has(x)
    let l = values.length
    var i = 0;
    let bits = [];
    let kept = []
    let lost = []
    let max = 4; // can be 3 or 4

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
            let newEntry = asThreeBitColor(kept)
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
                let newEntry = asThreeBitColor(kept)
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

    let newEntry = asThreeBitColor(kept)
    return [newEntry, i+1]
}

const asThreeBitColor = function(values) {
    let ex = values.slice(4, 5)
    let alp = ''
    if(ex.length>0) {
        alp = `/${ex}`
    }
    return `${values[0]}(${values.slice(1, 4).join(' ')}${alp})`
}


;installReceiver();

// })()