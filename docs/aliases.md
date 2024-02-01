# Graph Aliases

Any property key can have an alias.

    // before
    background-color-var-main-bg

    // after
    bg-cl-v-main-bg

All aliases are optional and you can define may aliases for one key:

```js
const cg = generateClassGraph({
    , aliases: {
        background: ['bg', 'back']
        , border: ['bd']
        , var: ['v']
        , padding: ['pd']
        , radius: ['r']
    }
})

cg.addAlias('margin', 'mg')
cg.addAliases('color', ['cl', 'c'])
```

The alias keys work in tandem with the original:

```html
<div class="text
    background-color-#111
    border-solid-3px-green
    border-radius-.4em
    padding-.8em-1.4em
    color-#EEE
    margin-1em">Identical.</div>

<div class="text
    bg-cl-#111
    bd-solid-3px-green
    bd-r-.4em
    pd-.8em-1.4em
    cl-#EEE
    mg-1em">Identical.</div>
```

This works across all keys and the original keys are still accessible:

+ background-color-var-main-bg
  + bg-cl-v-main-bg
  + background-cl-v-main-bg
  + background-c-v-main-bg
  + ...
  + back-cl-v-main-bg
  + background-c-var-main-bg

+ color-red
  + cl-red
  + c-red
  + color-red

