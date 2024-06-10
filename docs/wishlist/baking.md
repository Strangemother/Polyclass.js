# Baking

Polyclass runs live on the view, but it can easily be flattened into a single CSS File, and distributed in the normal method. To "bake" a graph into a file:

```js
// CSS Stylesheet as text.
cg.asString()

// Store / load
localStorage['cg'] = cg.asString()
cg.loadExisting(localStorage['cg'])
```
