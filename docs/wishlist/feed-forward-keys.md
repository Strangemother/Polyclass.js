# Forward Feed Keys

The vendor prefix keys can be aliased. For example if we create the _long_ vendor keys `['cherry', 'choice', 'cakes']`, we can have an alias `ccc`:

This is done through the forward feed graph, yielding a digest function to replace the keys (see thesis notes)

```js
const cg = generateClassGraph({
    , vendorLocked: false
    , prefixes: ['cherry', 'choice', 'cakes']
})
cg.addVendorAlias(cs.conf.prefixes, 'ccc')
```
