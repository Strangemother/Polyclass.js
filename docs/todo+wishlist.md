# Wishlist

Items I want in the lib - some in progress


+ vars() box.
+ better -var-var-var detector
+ better fonting
    + alt vendors
    + Better string detection
    + ensure two-way binding on `font-pack` and and `font-*` definition classes
+ color js swatching
    + With 'theme' packs using color math
+ dpath writeup
+ dcss writeup

+ Auto Documentation
+ vendor prefix
+ Multi-graph
+ decoupled 'auto' graph
+ Easier cooking
    + convert the 'finished' stylesheet to a file.
+ Template objects
+ actions and events
+ pragmmatic color assignment
   + Invert property
+ node type assignment
+ parent selector
+ Baking
+ Forward Feed Keys

## better fonting


### Alt Vendors

Currently only google fonts work, but other vendors can be applied with work.

### Better string detection

The string parser is naive and will likely falter on minor edge-cases.
Rewrite this to a 'mini-graph' of sorts; allowing better forward key detection when parsing a string.

This rewrite should allow better parsing of translatable values when parsing values within a reciever.

### Two way binding

In the current form, the `font-pack` does not pick-up the usage of a `font-[name]` if the named font is a node _within_ the pack node.

This is probably due to the write of the font-pack occuring _after_ the `font-[name]` was defined. As such, the `font-[name]` is unprepared somehow.


```html
<body class="font-roboto-400">
        <div class="container
                    font-pack-roboto-100-400-900-i300">
            works
        </div>
</body>
```


```html
<body class="font-pack-roboto-100-400-900-i300">
        <div class="container font-robot-400">
            Does not work
        </div>
</body>
```

## decoupled auto graph

Currently the first graph applied is the 'auto graph', read from a primary node (the `body`). All available attributes are scanned as the _potential keys_ to activate a write.

Instead, apply the graph as an 'addon' - opting for more config choices.

## Auto Documentation

With all the content within one sheet, The developer may choose to _export_ the
source and documentation. This allows CSS class based research

    vendor-background-color-var-primary
    Aliases: vn-bg-c-v-pr

    Apply the primary background color `#111111` to an entity

Currently the sheet can be generated with:

```js
cg.getCSSText()
```

## Vendor prefix

Install the entire class graph beneath a vendor prefix. Therefore all
applies class names must start with `vendor`:

    `vendor-margin-1em`

This is more useful with a better unique graphing method

## Mutli Graph

Multiple instances of the class graph should be able to run on the same view, each with unique rules and optional prefix.

## template objects

Potentially or somehow leverage additional classes, styles and definitions from 'templates'. One option is html5 `<template>`

```html
<template>
    <style type="text/css" name='foo-bar'>
        {
            border:solid prop(0);
            border-radius: 2em;
        }
    </style>
</template>
```

When this is applied, `prop(0)` is replaced with a key var:

```html
<div class='foo-bar-1em'>
</div>
```

---

Potentially binding many classes to one class:

```html
<template>
    <div name='foo-bar margin-1em-2em font-size-prop(0)'></div>
</template>
```

Applying the class would yield an active change to the classes:

```html
<template>
    <!-- result -->
    <div class='foo-bar margin-1em-2em font-size-prop(0)'></div>
</template>

<!-- applied -->
<div class='foo-bar-1em'></div>

<!-- result -->
<div class='foo-bar-1em margin-1em-2em font-size-1em'></div>
```

In this case the class `foo-bar-1em` does nothing. The `prop(0)` is replaced with the `1em` from the initial class name.

## actions and events

Perform javascript event driven actions using classes:

    "onclick-add-foo onclick-toggle-bar"
    @click
    "onclick-add-foo foo bar"
    @click
    "onclick-add-foo foo"
    @click
    "onclick-add-foo foo bar"

The event handler should be removed automatically when the monitor is enabled.

    <p class"onclick-add-foo onclick-toggle-bar"></p>
    // add onclick to p[this].onclick-add-foo
    <p class"onclick-toggle-bar"></p>
    // remove onclick to p[this].onclick-add-foo

Other events may require multiple events

    "onhover-add-foo"
    // add mouseover
    // add mouseenter
    // add mouseleave
    // add mousefocus
    // add mousefocuswithin


## pragmmatic color assignment

A class to capture a value from another node, and assign a color to
the target node. for example the text of an entity should be in contrast to the background, we can change the text color to white
or black when the background is swithed. Example

    "background-color-#111 color-constrast-background-color"

This could also be defined through variables somehow:

    const swatch = color.swatch()
    cg.vars({
            background: swatch.background
            , text-color: swatch.foreground
        })


### Invert property

An assignable value `invert-*` to produce a computational colour inverstion of the given next value. For example, extended to a _contrast_ key, we can apply a text color given a _background_ color:

    "color-contrast-invert-#111"

    textColor({r:17/255, g: 17/255, b: 17/255})

    {
        color: white
    }



```js
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
```

## parent selector

Assign a parent CSS selector to all built classes

    parentSelector: ".acme"
    Selector "margin-top-1em"

CSS:

    .acme .margin-top-1em {
        margin-top: 1em;
    }

## Node Type assignment

polyclasses generates "global" classes:

    .color-red {
        color: red
    }

Type assignment would ensure classes target unique HTML node types, allowing the
same class name to adapt to an object

    h1.color-red {
        color: red; # pure red
    }

    p.color-red {
        color: #880000; # darker readable red.
    }

---

The _inline-name_ could define this property, however this may lead to confusion when cross-referencing with _css class based selectors_:

```html
<!-- global inline -->
<div class='color-red'></div>
<p class='color-red'></p>

<!-- relative inline -->
<div class='.color-red'></div>
<p class='.color-red'></p>
```

The full-stop "`.`" can be parsed by polyclass, but is not easy to read if referenced:

    # standard
    html body.dark div.color-red

    # With relative
    html body.dark div.\.color-red


## Baking

Polyclass runs live on the view, but it can easily be flattened into a single CSS File, and distributed in the normal method. To "bake" a graph into a file:

```js
// CSS Stylesheet as text.
cg.asString()

// Store / load
localStorage['cg'] = cg.asString()
cg.loadExisting(localStorage['cg'])
```


## Forward Feed Keys

The vendor prefix keys can be aliased. For example if we create the _long_ vendor keys `['cherry', 'choice', 'cakes']`, we can have an alias `ccc`:

This is done through the forward feed graph, yielding a digest function to replace the keys (see thesis notes)

```js
const cg = generateClassGraph({
    , vendorLocked: false
    , prefixes: ['cherry', 'choice', 'cakes']
})
cg.addVendorAlias(cs.conf.prefixes, 'ccc')
```


## Definition Merge

Merge multiple definitions into one using classes. This is useful when producing a single css declaration for multiple value types and templates of merging definitions

    margin-top-1em padding-bottom-2em font-size-1.2em

    {
        margin-top: 1em;
        padding-bottom: 2em;
        font-size: 1.2em;
    }

Applying this with a custom selector can reduce the amount of config for one object:


    v = cg.dcss.addMergeRule('.my-custom-padded', [
        "margin-top-1em",
        "padding-bottom-2em",
        "font-size-1.2em",
    ]);

    .my-custom-padded {
        ...
    }

Similar to the existing:


    v = cg.dcss.addStylesheetRules([
        ['body',
            ['background', '#333']
            , ['color', '#991111']
        ]
    ]);

## Definition Yield

In some cases we may yield the incorrect node:

    cg.addTree(['tom','d','harry'], function(splitObj){
        console.log('harries remix', arguments)
    })

    cg.addTree(['tom','d'], function(splitObj){
        console.log('tom-d remix', arguments)
    })


    tom-d-harry-1em     works
    tom-d-harry-foo     works
    tom-d-harry         yields harries with no args
    tom-d-1em           works.

In this case it would be better for key `tom-d-harry` to fail, and `tom-d` to receive `harry`

    tom-d-harry[-1em]   works A
    tom-d-harry[]       fail-over
    tom-d[-harry]       works B


## type tests

    isColor     check #000 red
    isSize      check 1em 4ch