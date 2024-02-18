# Polyclass Instance Options



```js
const pc = Polyclass({
    // Load addons, such as the --var and font pack.
    addons: true
    // Lock the prefix as the only method of generating declarations.
    // If true, only prefixed classes will work
    // If false, both prefix and standard class-names function
    , vendorLocked: false
    // A HTML Node to process when the DOM is ready
    , processOnLoad: document.body
    // Assign a vendor prefix for poly classes
    , prefixes: ['pc','x']
    // Change names of values during inline processing
    , aliases: {
        , 'color': ['cl', 'c']
    }
    // A flag assigned when polylcass is used as an attribute.
    isInline: false
    // Assign the target HTML entity.
    // This will be immediately processed.
    target: document.body
    // If false, Polyclass will not process the target.
    // processOnLoad will still occur.
    process: true
})

pc.processOnLoad(document.body)
```