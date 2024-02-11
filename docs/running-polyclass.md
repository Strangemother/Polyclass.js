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

