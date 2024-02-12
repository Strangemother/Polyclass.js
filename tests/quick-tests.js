
(()=>{


const autoMain = function(){
    console.log('Running autoMain')
    styleSheetAdds()
    insertSplitTests()

    insertRuleTests()

    cg.processOnLoad(document.body)
    cg.monitor(document.body)
}


// -----------------------------------------------------------------------------


const assert = function(a, b) {
    console.assert(a, b)
    return Boolean(a) == true
}


function setDifference(a, b) {
  return new Set(Array.from(a).filter(item => !b.has(item)));
}


const assertLists = function(a, b) {
    let sa = new Set(a)
    let sb = new Set(b)
    let a_intersect_b = setDifference(sa,sb)
    let b_intersect_a = setDifference(sb, sa)
    let u = new Set([...a_intersect_b, ...b_intersect_a])
    let isSame = u.size == 0
    console.assert(isSame, `${a} does not match ${b}`)
    if(!isSame) {
        console.info('difference', u)
    }
}

//cg = generateClassGraph()
const testExample = function(str, props, values) {
    let b = cg.objectSplit(str)
    assertLists(b.props,  props)
    assertLists(b.values, values)
    return b
}


// ----------------------------------------------------------------------------


const styleSheetAdds = function(){
    let dcss = cg.dcss

    let addStylesheetRules = dcss.addStylesheetRules.bind(dcss)
    v = addStylesheetRules([
        ['body',
            ['background', '#333']
            , ['color', '#991111']
        ]
    ]);


    v = addStylesheetRules([
        ['body',
            [
                ['background', '#333']
                , ['color', '#991111']
            ]
        ]
    ]);

    v = addStylesheetRules([
        ['body',
            [
                ['background', '#333']
                , ['color', '#991111']
            ]
            , [
                ['background', '#555']
                , ['color', '#991221']
            ]
        ]
    ]);


    v = addStylesheetRules({
        body: {
            background: '#111'
            , color: '#11AA11'
        }
    });


    v = addStylesheetRules({
        body: [
            {background: '#111'}
            , {color: '#11AA11'}
        ]
    });


    let propInfo = { background: '#111' }


    b = addStylesheetRules({
        body: [
            {color: '#11AA11'}
            , propInfo
        ]
    });


    propInfo.background = '#000'
    propInfo.color = 'red'
    b[0].replace()
}


const insertSplitTests = function(){

    let a = testExample('margin-auto-1em'
                    , ['margin']
                    , ['auto', '1em']
                )

    let b = testExample('margin-block-end-5%'
                , ['margin', 'block', 'end']
                , ['5%']
                )

    let c = testExample('border-bottom-dotted-1px'
                    , ['border', 'bottom']
                    , ['dotted', '1px']
                )

    let d = testExample('gap-1em'
                    , ['gap']
                    , ['1em']
                )

    let e = testExample('color-green'
                    , ['color']
                    , ['green']
                )
    return [a,b,c,d,e]
}


const insertRuleTests = function(){
    let [a,b,c,d,e] = insertSplitTests()

    cg.insertRule(b)
    cg.insertRule(c)
    let dcss = cg.dcss
    let selectorExists = dcss.selectorExists.bind(dcss)
    ss = '.gap-1em'
    ok = assert(!selectorExists(ss), `selector (incorrectly) exists '${ss}'`)
    cg.insertRule(d)
    ok = assert(selectorExists(ss), `selector does not exist '${ss}'`)
    cg.insertRule(d)

    let ir = cg.insertRule(e)
    // cg.insertRule(a)
    // cg.insertRule(b)

    ss = cg.asSelectorString(b)
    assert(selectorExists(ss), `Selector does not exist: "${ss}"`)

    // insert a single line
    cg.insertLine('demo-box', { 'font-size': '1.5em'})
}


;autoMain();


})()