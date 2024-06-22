
// let r = forwardReduceValues(
//         [],
//         ['wibble', 'rgb', '10', '20', '200', 'derek'],
//         // ['fridge', 'row', 'reverse', 'other', 'horse', 'chicken'],

// )

let trys = [
    [
        ["wibble", "hsl", "150", "30%", "60%", "eggs"],
        ["wibble", "hsl(150 30% 60%)", "eggs"],
    ],
    [
        ["wibble", "hsl", "150", "30%", "60%"],
        ["wibble", "hsl(150 30% 60%)"],
    ],
    [
        ["hsl", "150", "30%", "60%"],
        ["hsl(150 30% 60%)"],
    ],
    [
        ["hsl", "150", "30%", "60%", "eggs"],
        ["hsl(150 30% 60%)", "eggs"],
    ],
    [
        ["hsl", "150", "30%", "60%/0.8", "eggs"],
        ["hsl(150 30% 60%/0.8)", "eggs"],
    ],

    [
        ["hsl", "150", "30%", "60%", "0.8", "eggs"],
        ["hsl(150 30% 60%/0.8)", "eggs"],
    ],
    [
        ["hsl", "150", "30%", "60%", "0.8", "100", "200"],
        ["hsl(150 30% 60%/0.8)", "100", "200"],
    ],
    [
        ["100", "hsl", "150", "30%", "60%", "0.8", "100", "200"],
        ["100", "hsl(150 30% 60%/0.8)", "100", "200"],
    ],
    // [
    //     ["hsl", "0.15turn", "90%", "50%", "eggs"],
    //     ["hsl(0.15turn 90% 50%)", "eggs"],
    // ],
    [
        ["hsl", "hsl", "150", "30%", "60%", 'hsl'],
        ["hsl", "hsl(150 30% 60%)", 'hsl'],
    ],
    [
        ["hsl", "hsl", "150", "30%", "60%", ".5", 'hsl'],
        ["hsl", "hsl(150 30% 60%/.5)", 'hsl'],
    ],
    [
        ["hsl", "hsl", "150", "30%", "60%", 'hsl', 'hsl'],
        ["hsl", "hsl(150 30% 60%)", 'hsl', 'hsl'],
    ],
    [
        ["hwb", "12", "50%", "0%", "eggs"],
        ["hwb(12 50% 0%)", "eggs"],
    ],
    [
        ["hwb", "194", "0%", "0%/0.5", "eggs"],
        ["hwb(194 0% 0%/0.5)", "eggs"],
    ],
    [
        ["hwb", "194", "0%", "0%", "0.5", "eggs"],
        ["hwb(194 0% 0%/0.5)", "eggs"],
    ],
    [
        ["lab", "50%", "40", "59.5", "eggs"],
        ["lab(50% 40 59.5)", "eggs"],
    ],
    [
        ["lab", "50%", "40", "59.5", "0.5", "eggs"],
        ["lab(50% 40 59.5/0.5)", "eggs"],
    ],
    [
        ["lab", "50%", "40", "59.5/0.5", "eggs"],
        ["lab(50% 40 59.5/0.5)", "eggs"],
    ],
    [
        ["lch", "52.2%", "72.2", "50", "eggs"],
        ["lch(52.2% 72.2 50)", "eggs"],
    ],
    [
        ["lch", "52.2%", "72.2", "50/0.5", "eggs"],
        ["lch(52.2% 72.2 50/0.5)", "eggs"],
    ],
    [
        ["lch", "52.2%", "72.2", "50", "0.5", "eggs"],
        ["lch(52.2% 72.2 50/0.5)", "eggs"],
    ],
    [
        ["oklab", "59%", "0.1", "0.1", "eggs"],
        ["oklab(59% 0.1 0.1)", "eggs"],
    ],
    [
        ["oklab", "59%", "0.1", "0.1/0.5", "eggs"],
        ["oklab(59% 0.1 0.1/0.5)", "eggs"],
    ],
    [
        ["oklab", "59%", "0.1", "0.1", "0.5", "eggs"],
        ["oklab(59% 0.1 0.1/0.5)", "eggs"],
    ],
    [
        ["oklch", "60%", "0.15", "50", "eggs"],
        ["oklch(60% 0.15 50)", "eggs"],
    ],
    [
        ['oklch', '60%', '0.15', '50', 'eggs', 'rgb', '10','100', '200'],
        ['oklch(60% 0.15 50)', 'eggs', 'rgb(10 100 200)'],
    ],
    [
        ['oklch', '60%', '0.15', '50', 'eggs',
         'rgb', '10','100', '200', 'horse'],
        ['oklch(60% 0.15 50)', 'eggs', 'rgb(10 100 200)', 'horse'],
    ],
    [
        ['oklch', '60%', '0.15', '50', 'eggs',
         'rgb', '10','100', '200', 'hsl', 'horse'],
        ['oklch(60% 0.15 50)', 'eggs', 'rgb(10 100 200)', 'hsl', 'horse'],
    ]
]

for(let [b, exp] of trys) {
    let r = forwardReduceValues([], b)
    let match = arrayMatch(r, exp)
    let f = 'log'
    if(!match) { f = 'error' }
    console[f]('==', match, "Given:", b, "Result:", r, "Expected:", exp)
    // console.log(popOneValueForward(b))

}

// let r = popOneValueForward(
//         ['wibble', 'rgb', '10', '20', '200', 'derek'],
//         // ['fridge', 'row', 'reverse', 'other', 'horse', 'chicken'],
// )

// let result = ['wibble', 'rgb(10 20 200)', 'derek'];

// console.log(r)

