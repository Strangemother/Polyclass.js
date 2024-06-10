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
+ a `clean()` function
+ Dynamic Css Import
+ _though_ key function
+ don't split

---

## sibling mutators

if a class is assigned with a sibling class,mutate the outbound declaration:

primary:

    font-pack-robot-100-300-400

sibling:

    font-family-default-sans-serif
    font-default-sans-serif
    default-sans-serif

Result:

    font-family-default-sans-serif font-pack-robot-100-300-400
    font-pack-robot-100-300-400 default-sans-serif

    font-here-roboto default-sans-serif


## value remap

as a value is tested, asset a simple map replacement.

The _unpack_ can be other objects.


    color-red           // classical
    color-var-primary   // vars()
    color-rebecca       // mapped
            #336699
    color-other         // re-mapped
            rebecca     ...
    color-follow         // another re-mapped
            ...
            we can return additional property values.

To allow _remapping_ of props


---

Better addon receiver.

+ Plug in before or after instansiation
+ target Polyclass, classgraph, or the other one


----

# .reshade-

A first implementation of "functions" on a value.

    color-red.reshade+1
    color-red.reshade-10

Allowing

## display: inline flow-root;display: inline flow-root;the reshade relative to a color stepping function (quantized step)

# .revalue

Convert a value to another value through a pre-map

globals

    {
        red: orange
    }

property

    {
        color: {
            red: #880000
        }

        background: {
            red: linear-gradient(red, #880000)
        }
    }

entity

    {
        p: {
            color: {
                red: 'color.red.reshade+2'
            }
        }

        strong: {
            color: {
                red: 'p.color.red.reshade-2'
            }
        }
    }

## Image

With functional values, we can implement more advanced capture and replace methods.  The `*-img*` property can be configured to redirect a _short name_ to a static path location:

    polyclass.staticPath = 'https://imghost/foo/bar?name='

Usage rebinds the inbound path:

    <div class='background-image-img-apples'></div>

result

    {
        background-image: url('https://imghost/foo/bar?name=apples');
    }


## sub-var:

    color-var-apples

    // no
    color-var-top-next

    // yes
    color-var-top.next


## var accessor $

Currently to assign a var:

    [prop]-var-[name]
    color-var-apples

with a short:

    color-v-apples

the accessor uses a special syntax:

    $color-apples

or maybe:

    color-$apples
    color-$top.next

## Magic @rules

Define any @property : value, where the property can be a "magic" rule to unpack the inner rules and apply them to the outer declaration. This allows multi-decarlation repacking.

## font-here-*

Combine `font-pack-*` and `font-*` into a single statement, binding both classes into a merged object - or as one token

    font-here-roboto-400



## polyclass active switch

Enable polyclass in the view without JS, using an auto-switch in the
body or HTML. Additional config may be applied through  data-attributes.

```html
<html>
    <head>
        <script type="text/javascript" src='polyclass.js'></script>
    </head>

    <body polyclass class='background-#111 color-invert-background'>
    </body>
</html>
```

Alterntive configs:

```html
<body polyclass="pc" pc-vendorlocked=false />
<body polyclass
    data-polyclass-alias-color="c"
    data-polyclass-alias-background="bg,back" />
```


## RuleProxy

A proxy object to edit a single rule in the view. This can change aspects
of a key, value as a class. This change will bubble to dcss

    rule = pc.addRule('.foo.bar', {color: 'red', margin: '4em 1em 2em 3em'})

    rule[margin][0].setValue('5em')


## Replacement editing

Attempt to _replace_ a similar class with a new one, this can be bubbled to the dcss, allowing clearner editing. This is useful if the view cycles
through many styles, leaving a tail of unused styles.

    pc(node).change('margin-1.4em-1em', 'margin-1.5em-1em')

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

# a `clean()` function

The `clean()` can inspect a HTML entity and its children for its applied classes and remove any unused classes within the dcss. This is useful when supplying a base sheet.


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


# Dynamic Css Import

Provide the ability to key target CSS Files using polyclasses

    <div class='collect-theme-alpha'></div>
    <!-- fetch(static/css/theme-alpha.css) -->

# _though_ key function

Apply a function to capture the usage of a key using transition through a node:

    cg.addThrough(['margin'], function(splitObj){
        console.log('margin-* was called.', arguments)
    })

    <div class='margin-10em'></div>
    <div class='margin-top-10em'></div>

    // margin-* was called
    // margin-* was called


## through key prefix populate

apply _through_ key capture to apply pre selector components to the css declaration

    cg.addThrough(['dark'], function(splitObj){
        return splitObj.prefixAppend('.dark ')
    })

    <div class='dark-margin-top-10em'></div>

    .dark .margin-top-10em,
    .dark dark-margin-top-10em {
        margin-top: 10em;
    }

This only activates if a parent has the class of dark

    <div class='margin-top-10em'>
        <div class='dark-margin-top-10em'></div>
    </div>

An issue may arise with the prefix within the class-name, as during the dark-phase the class-name must loose its prefix; pretty ugly.

## don't split

Some values should not be split, but by default the
value matches a splittable and the result is invalid:

    CSS:
        display: inline flow-root;

    Poly:
        "display-inline-flow-root"

    result:
        {
            display: inline flow-root
        }

To correct this, we apply a micro "dont" graph of chosen keys. If a value is in the graph, it's not split:

    Keep:

        display > flow > root

    Poly:
        "display-inline-flow-root"

    Result:

        {
            display: inline flow-root
        }


