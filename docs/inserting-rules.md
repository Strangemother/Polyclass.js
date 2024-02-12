# Inserts

You can insert class delcarations using javascript. Very useful when producing dynamic sheets.

Inserting class-like selector names and an CSS delcaration:

```js
pc.insertClassProps('demo-box', { 'font-size': '1.5em'})
```

Resulting in the available CSS class:

```css
.demo-box {
    font-size: 1.5em;
}
```

## Insert Rules

a _rule_ is similar to an `insertClassProps`, however allows a different syntax when creating declarations

```js
v = pc.insertRules([
    ['body',
        ['background', '#333']
        , ['color', '#991111']
    ]
]);

v.renderAll()
```

If you supply _something editable_, changes to the original reference will alter Polyclass delcarations:

```js
let propInfo = { background: '#111' }

b = pc.insertRules({
    body: [
        {color: '#11AA11'}
        , propInfo
    ]
});

propInfo.background = '#000'
propInfo.color = 'red'
b[0].replace()
```

## Inserting "Active" Rules

Create JavaScript functional handlers to detect when a class is created. The receiver can do interesting things, such as download and install fonts:

```js
pc.insertReceiver(['font','pack'], function(splitObj){
    console.log('font-pack receiver', arguments)
})
```

Anything _after_ your discovery selector within your class-name becomes a property:

```html
<div polyclass>
    <div class="font-pack-roboto-100 font-roboto-400">
        the "Fontpack" function handles special strings formatted similar to the google font string.
    </div>
</div>
```

