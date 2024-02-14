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

