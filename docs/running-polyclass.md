# Running

There are two general methods to running polyclass, they can work independently and at the same time.

The quickest method is the no-code HTML property:

```jinja
<script src='polyclass.js'></script>

<body polyclass>
    <div class='font-size-1.5em'></div>
</body>
```

The alternative is a javascript instance:

```js
const pc = Polyclass()
```

## Auto Polyclass

Polyclass can be automatically instantiated on a target HTML entity. This may be the `body` or any other HTML object.


```jinja
<script src='polyclass.js'></script>
<body>
    <div polyclass>
        <div class='font-size-1.5em'>Polyclassed.</div>
    </div>
    <div>
        <div class='color-red'>No Detection</div>
    </div>
</body>
```

You can multiple polyclass units:


```jinja
<script src='polyclass.js'></script>
<body>
    <div polyclass>
        <div class='font-size-1.5em'>Polyclassed.</div>
    </div>
    <div>
        <div class='color-red'>No Detection</div>
    </div>
    <div polyclass>
        <div class='color-green'>Polyclassed.</div>
    </div>
</body>
```

### Pollution

Polyclass builds _global_ css selectors, as such using a CSS class-name on an entity, will affect other nodes with the same class-name

```jinja
<script src='polyclass.js'></script>
<body>
    <div polyclass>
        <div class='font-size-1.5em'>Polyclassed.</div>
    </div>
    <div>
        <div class='font-size-1.5em color-green'>
            Partial Polyclass, as <code>font-size-1.5em</code> was within a polyclass rendered entity, but `color-green` is not within a polyclass rendered HTML entity.
        </div>
    </div>
</body>
```

This can be managed with a [vendor prefix](./vendor-prefix.md)

## Polyclass Instance

An instance of Polyclass can accept a config object, here's an example:

```js
const pc = Polyclass({
    addons: true // default true
    , vendorLocked: false
    // , processOnLoad: document.body
    , prefixes: ['pc','x']
    , aliases: {
        background: ['bg', 'back']
        , border: ['bd']
        , var: ['v']
        , padding: ['pd']
        , radius: ['r']
        , 'margin': ['mg']
        , 'color': ['cl', 'c']

    }
})

pc.processOnLoad(document.body)
```

### Many Instances

Polyclass is a singleton designed to run automatically or manually. When automated Polyclass instance exist in a `Polyclass.units` class:

```jinja
<body polyclass>
    <div polyclass></div>
</body>
```

Each instance gains a unique ID:

```jinja
<body polyclass="" data-polyclass-id="c2krqoat7a">
    <div polyclass="" data-polyclass-id="31kbnkjsaog">
    </div>
</body>
```

Referenced through the singleton `Polyclass.units`

```js
// Polyclass.units
Map(1) {
    'c2krqoat7a' => PolyObject,
    '31kbnkjsaog' => PolyObject
}
```

Every view instance of Polyclass has a reference to the shared `units`. JavaScript Polyclass instances do not create a unique reference:

```js
pc1 = new Polyclass()
pc2 = new Polyclass({ target: document.body }) // will not assign a unique id.

pc1.units == pc2.units == Polyclass.units
true

// Polyclass.units does not include pc1 or pc2.
Map(1) {
    'c2krqoat7a' => PolyObject,
    '31kbnkjsaog' => PolyObject
}
```

### `new` Keyword

The `new` keyword will generate a fresh instance of Polyclass. Without the `new` keyword, a new or existing instance will return.

We can generate a new Polyclass with or without arguments:

```js
pc1 = new Polyclass  // no target.
pc2 = new Polyclass()
pc3 = new Polyclass({ target: document.body })

pc2 == pc3
false
```

Without the keyword, a Polyclass singleton is returned


```js
pc1 = Polyclass         // does nothing
pc2 = Polyclass({ target: document.body })  // getInstance
pc3 = Polyclass()       // getInstance

pc2 == pc3
true
```

We can always gain the primary Polyclass instance through the singleton special `Polyclass.instance`


```js
pc = Polyclass({ target: document.body })  // getInstance

pc == Polyclass.instance
true
```

---

This functionality allows you to generate new sub-instances of Polyclass, whilst also maintaining existing and dynamically generated Polyclass instances

```jinja
<body polyclass>
    <div polyclass></div>
</body>
```

```js
pc = new Polyclass({ target: document.body })
pc == Polyclass.instance
false
```
