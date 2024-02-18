/*

var color1 = "#FF343B";
var color2 = "#343BFF";
var color3 = "rgb(234,47,120)";
var color4 = "rgb(120,99,248)";
(new ColorBlender).blend(-0.8,color1,color2);
(new ColorBlender).blend(-0.8,color3,color4);
new ColorBlender(-0.8,color3).blend(undefined, undefined, color4)

 */

var round = Math.round
    , asInt = parseInt
    , rgb = (a,b,c) => `rgb(${a},${b},${c})`
    ;

// https://github.com/PimpTrizkit/PJs/wiki/
// 12.-Shade,-Blend-and-Convert-a-Web-Color-(pSBC.js)#--version-2-universal-b--
//

let shift = function(v, c, and) {
    let r = v >> c
    return and ? r & and: r
}

class Tools {

    getDefaultHex(val, defaultLow="#000000", defaultHigh="#FFFFFF") {
        if(val){ return val }

        if(this.p_lt_0) { return defaultLow }
        return defaultHigh
    }

    getDefaultRBG(val) {
        return this.getDefaultHex(val, rgb(0,0,0), rgb(255,255,255))
    }

    asIntRoundNegFlip(t, val) {
        return this.roundNegFlip(asInt(t), asInt(val))
    }

    roundNegFlip(a, b) {
        return round(this.negFlip(a - b)) + b
    }

    negFlip(val){
        return val * this.neg
    }

    shiftRoundNegFlip(t, shiftVal, and, val)  {
        let innerVal = shift(t, shiftVal, and)
        return this.roundNegFlip(innerVal, val)
    }

    shiftShiftRoundNegFlip(f, t, shiftVal, andHex) {
            // , R1 = shift(f, 16, 0)
            // , roundR = shiftRoundNegFlip(t, 16, 0, R1)
            let G1 = shift(f, shiftVal, andHex)
            return this.shiftRoundNegFlip(t, shiftVal, andHex, G1)
    }

}

class ColorBlender extends Tools {

    neg = undefined
    p_lt_0 = undefined
    p = undefined
    c0 = undefined
    c1 = undefined

    constructor(p, c0, c1) {
        super()
        this.p = p
        this.c0 = c0
        this.c1 = c1
    }

    blend(p,c0,c1) {
        p = (p == undefined)? this.p: p
        c0 = (c0 == undefined)? this.c0: c0
        c1 = (c1 == undefined)? this.c1: c1

        this.p_lt_0 = p < 0;
        this.neg = this.p_lt_0? p * -1: p;

        let func = (c0.length > 7)? 'rbgBlend': 'hexBlend';
        return this[func](p, c0, c1)
    }

    rbgBlend(p, c0, c1, splitDelim=',') {
        let colorA = c0.split(splitDelim)
            , colorB = this.getDefaultRBG(c1).split(splitDelim)
            , clean = this.asIntRoundNegFlip.bind(this)
            , r = clean(colorB[0].slice(4), colorA[0].slice(4))
            , g = clean(colorB[1], colorA[1])
            , b = clean(colorB[2], colorA[2])
            ;
        return rgb(r,g,b)
    }

    hexBlend(p, c0, c1) {

        let colorA = asInt(c0.slice(1), 16)
            , colorB = asInt(this.getDefaultHex(c1).slice(1), 16)
            , shiftClean = this.shiftShiftRoundNegFlip.bind(this)
            , roundR = shiftClean(colorA, colorB, 16, 0)
            , roundG = shiftClean(colorA, colorB, 8, 0x00FF)
            , roundB = shiftClean(colorA, colorB, 0, 0x0000FF)
            , val = 0x1000000 + roundR
                    * 0x10000 + roundG
                      * 0x100 + roundB
            ;
        let v = val.toString(16).slice(1)
        return `#${v}`
    }

}

