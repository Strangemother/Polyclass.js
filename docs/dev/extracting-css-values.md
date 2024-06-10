# CSS Values.

Dynamically collect all possible CSS Values to parse a micro graph:

+ https://www.w3.org/TR/css-2023/#values

Run this inline to produce the array.

```js

function downloadString(text, fileType, fileName) {
    var blob = new Blob([text], { type: fileType });

    var a = document.createElement('a');
    a.download = fileName;
    a.href = URL.createObjectURL(blob);
    a.dataset.downloadurl = [fileType, a.download, a.href].join(':');
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function() { URL.revokeObjectURL(a.href); }, 1500);
}

let dashprops = []
    , props = []
    , ignored = []
    , children
    ;
children = Array.from(
    document
        .querySelector('h3#values').nextElementSibling
            .querySelector('ul.index').children
);

children.forEach((e,i,a)=>{
    let t = e.innerText.split('\n')[0];

    if(/[^a-z-]/i.test(t)) {
        ignored.push(t);
        return
    }

    if(t.indexOf('-')>-1){
        dashprops.push(t);
        return
    }

    props.push(t);
});

dashprops.sort()
props.sort()
ignored.sort()

downloadString(
    JSON.stringify({
            dashprops
            , props
            , ignored
        }, null, 4)
    , 'text/plain'
    , 'props.json'
)
```

