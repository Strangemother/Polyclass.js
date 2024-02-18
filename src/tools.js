const kebabCase = function(str, sep='-') {
    let replaceFunc =  ($, ofs) => (ofs ? sep : "") + $.toLowerCase()
    return str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, replaceFunc)
}


const colorPrebits = function() {
    /*
        hex     1
        rgba    4
        rgb     3   3/1
        hsl     3   3/1
        hwb     3   3/1
        lab     3   3/1
        lch     3   3/1
        oklab   3   3/1
        oklch   3   3/1
        color   4   4/1
     */
}


var textColor = function(bgColor) {
  var r = bgColor.r * 255,
      g = bgColor.g * 255,
      b = bgColor.b * 255;
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return (yiq >= 128) ? 'black' : 'white';
}

function standardize_color(str){
    var ctx = document.createElement("canvas").getContext("2d");
    ctx.fillStyle = str;
    return ctx.fillStyle;
}


;(()=>{


var round = Math.round
    , asInt = parseInt
    , rgb = (a,b,c) => `rgb(${a},${b},${c})`
    ;

// https://github.com/PimpTrizkit/PJs/wiki/
// 12.-Shade,-Blend-and-Convert-a-Web-Color-(pSBC.js)#--version-2-universal-b--
//

let getDefaultHex = function(val, defaultLow="#000000", defaultHigh="#FFFFFF") {
    if(val){ return val }

    if(p_lt_0) { return defaultLow }
    return defaultHigh
}

let getDefault = function(val) {
    return getDefaultHex(val, rgb(0,0,0), rgb(255,255,255))
}

let shift = function(v, c, and) {
    let r = v >> c
    return and ? r & and: r
}

let shiftRoundNegFlip = function(t, shiftVal, and, val)  {
    let innerVal = shift(t, shiftVal, and)
    return roundNegFlip(innerVal, val)
}

let convert = (t, val) => {
    return roundNegFlip(asInt(t), val)
}

let roundNegFlip = function(a, b) {
    return round(negFlip(a - b)) + b
}

let negFlip = function(val){
    return val * neg
}

var neg
    , p_lt_0
    ;

function shadeBlend(p,c0,c1) {
    /*
        var color1 = "#FF343B";
        var color2 = "#343BFF";
        var color3 = "rgb(234,47,120)";
        var color4 = "rgb(120,99,248)";
        var shadedcolor1 = shadeBlend(0.75,color1);
        var shadedcolor3 = shadeBlend(-0.5,color3);
        var blendedcolor1 = shadeBlend(0.333,color1,color2);
        var blendedcolor34 = shadeBlend(-0.8,color3,color4); // Same as using 0.8

     */
    p_lt_0 = p < 0;
    neg = p_lt_0? p * -1: p

    if(c0.length > 7){
        return rbgConvert(p, c0, c1)
    }

    return hexConvert(p, c0, c1)
}

function shiftShift(f, t, shiftVal, andHex) {
        // , R1 = shift(f, 16, 0)
        // , roundR = shiftRoundNegFlip(t, 16, 0, R1)

        let G1 = shift(f, shiftVal, andHex)
        return shiftRoundNegFlip(t, shiftVal, andHex, G1)
}

function hexConvert(p, c0, c1) {

    var f = asInt(c0.slice(1), 16)
        , cv = getDefaultHex(c1).slice(1)
        , t = asInt(cv, 16)
        , roundR = shiftShift(f, t, 16, 0)
        , roundG = shiftShift(f, t, 8, 0x00FF)
        , roundB = shiftShift(f, t, 0, 0x0000FF)
        ;
        // , R1 = shift(f, 16, 0)
        // , G1 = shift(f, 8, 0x00FF)
        // , B1 = shift(f, 0, 0x0000FF)
        // , roundR = shiftRoundNegFlip(t, 16, 0, R1)
        // , roundG = shiftRoundNegFlip(t, 8, 0x00FF, G1)
        // , roundB = shiftRoundNegFlip(t, 0, 0x0000FF, B1)
        // ;)

    let val = 0x1000000 + roundR
              * 0x10000 + roundG
                * 0x100 + roundB
                ;

    let v = val.toString(16).slice(1)
    return `#${v}`

}

function rbgConvert(p, c0, c1) {
    let f = c0.split(",")
        , tSplit = getDefault(c1)
        , t = tSplit.split(",")
        , R = asInt(f[0].slice(4))
        , G = asInt(f[1])
        , B = asInt(f[2])
        , r = convert(t[0].slice(4), R)
        , g = convert(t[1], G)
        , b = convert(t[2], B)
        ;
    return rgb(r,g,b)
}



function origShadeBlend(p,c0,c1) {
    var n=p<0?p*-1:p,u=Math.round,w=parseInt;
    if(c0.length>7){
        var f=c0.split(","),t=(c1?c1:p<0?"rgb(0,0,0)":"rgb(255,255,255)").split(","),R=w(f[0].slice(4)),G=w(f[1]),B=w(f[2]);
        return "rgb("+(u((w(t[0].slice(4))-R)*n)+R)+","+(u((w(t[1])-G)*n)+G)+","+(u((w(t[2])-B)*n)+B)+")"
    }else{
        var f=w(c0.slice(1),16),t=w((c1?c1:p<0?"#000000":"#FFFFFF").slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF;
        return "#"+(0x1000000+(u(((t>>16)-R1)*n)+R1)*0x10000+(u(((t>>8&0x00FF)-G1)*n)+G1)*0x100+(u(((t&0x0000FF)-B1)*n)+B1)).toString(16).slice(1)
    }
}


var color1 = "#FF343B";
var color2 = "#343BFF";
var color3 = "rgb(234,47,120)";
var color4 = "rgb(120,99,248)";
blendedcolor = shadeBlend(-0.8,color3,color4); // Same as using 0.8
blendedcolor2 = origShadeBlend(-0.8,color3,color4); // Same as using 0.8

if(blendedcolor != blendedcolor2) {
    console.error('Fault', blendedcolor, blendedcolor2)
}
console.log(blendedcolor, blendedcolor2)


blendedcolor = shadeBlend(-0.8,color1,color2); // Same as using 0.8
blendedcolor2 = origShadeBlend(-0.8,color1,color2); // Same as using 0.8


if(blendedcolor != blendedcolor2) {
    console.error('Fault', blendedcolor, blendedcolor2)
}


console.log(blendedcolor, blendedcolor2)

})();
