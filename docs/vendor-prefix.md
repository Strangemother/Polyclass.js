# Vendor Prefix

Define 'vendor' keys for the start of a class string, to activate polyclass handling. This allows you to create define your own _subclass_ without affecting the class graph:

    // no prefix
    margin-top-solid-2px-red

    // with "acme" prefix
    acme-margin-top-solid-2px-red


To install a vendor prefix, we can define it in the instance config:

```js
const cg = generateClassGraph({
    , vendorLocked: true
    , prefix: 'acme'
})
```

## Vendor Locking

You can apply the _vendor_ as the only valid start key for a class with `vendorLocked=true`.

```js
const cg = generateClassGraph({
    , vendorLocked: true
    , prefix: 'acme'
})
```

```html
<div class="acme-border-solid-2px-#222">
    works with acme-
</div>

<div class="border-solid-2px-#222">
    generic does not work
</div>
```

Disabling the `vendorLocked` allows both _generic_ and _vendor_ assignments to act the same.


```js
const cg = generateClassGraph({
    , vendorLocked: false
    , prefix: 'acme'
})
```

```html
<div class="acme-border-solid-2px-#222">
    works with acme-
</div>

<div class="border-solid-2px-#222">
    also works with generic
</div>
```

