

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
z=b[0]
monitorClasses(document.body)

cg = generateClassGraph()
a = cg.objectSplit('margin-auto-1em')
b = cg.objectSplit('margin-block-end-5%')

console.log(a, b)