# CSS Tokens

+ https://tr.designtokens.org/format/

> A conversation and implementation on the concept of "CSS Tokens", the method of combining a set of css properties through a pre-definition and a name.

The other day I was sharing progress on Polyclass with a colleague, covering some aspects of which may be useful for a future project. Through the discussion they asked a simple question; "Does it do tokens?".

I was a bit stumped.  I hadn't come across the concept of "CSS Tokens" in the past and found myself quickly googling with a kurt "ooh. No.". we progressed to a mini lesson about their benefits and once home I set to research the concept.

## What is it

In its most simple form, a CSS Token is (at minimum) one key:pair for CSS. We provide a "name", of which converts to a _class-name_:

Here is an example of a pseudo definition:

Dummy JavaScript definition:

```js
definition = {
    error: {
        color: var('main-red')
        , border: solid 1px
    }
    , success: {
        color: green
        , border-color: greener
    }
}

loadMyLib(definition)
```

We implement it in HTML using css classes

```jinja
<div class='error'>
    Error!
</div>
```

---

The bonus here is a one-stop location for all css parameters the end-user should use. In big-web environments, this is key to ensure consistency - and also reuse the colours in other technical application components.


### Other Platforms

Continuing my research, I performed the usual cursory google and clicked the first three links. I then closed those pages and went down to about \~8+ ish (new Google eh?) and tried again.


### Material

The Google Material has a delicious format, using this "dotted.combined.tokens" notation.

+ https://m3.material.io/foundations/design-tokens/overview

Before I found this, I considered that idea as quite nice, and makes a lot of sense. Combining this with a nested JS dictionary or the class graph, a feature similar to this is a great foundation


### Panda CSS

Discovering Panda CSS for the first time, they have a satisfying method to building and using definitions

+ https://panda-css.com/docs/theming/layer-styles

From their docs:

```js
import { defineLayerStyles } from '@pandacss/dev'

const layerStyles = defineLayerStyles({
  container: {
    description: 'container styles',
    value: {
      bg: 'gray.50',
      border: '2px solid',
      borderColor: 'gray.500'
    }
  }
})
```

This combines the object definitions, and the sub-tooling, such as `gray.50`.
Again we see the "tokens" style with the dotted notation.

### Styled-system

This rather impressive react platform integrates tokenization with a responsive layer to actively implement tokens

+ https://github.com/styled-system/styled-system


### tokencss

The "tokencss" library presents what can be achieved with a well-considered API.
The implementation is brief and readable, implementing the "Design Tokens" methodology to a higher accuracy than some other larger frameworks.

+ https://github.com/tokencss/tokencss

### Tailwind

Tailwind is obviously the biggest whale in the CSS pond. Their super-rich everything tool can probably do everything, including "custom styles" (their implementation of Design Tokens).

+ https://tailwindcss.com/docs/adding-custom-styles

Essentially they also follow the consortium pattern of nested dictionaries and token values.

---

***Quick breakout***

A quick-shout-out to the extremely comprehensive tailwind. I've never used it (preferring to write my own CSS) but the entire library is packed with essentially everything; it seems prudent to consider this as a good option.

It even has polyclass style class-names! https://tailwindcss.com/docs/box-decoration-break (Polyclass is still loads better though because of the name mostly).

Anyhoo - back to the chat...


## Polyclass w00t!

> The next question is _Does Polyclass perform this?_; fundamentally Yes! Strictly not-quite.

Polyclass is designed to leverage the existing DOM model and allow the user to quickly apply those definitions using the `class` property, and leave other properties for other tasks. This is dynamic and immediate, allowing Polyclass to capture _any definition_ to and covert it to real CSS.

Therefore Polyclass is performing "design tokens" without the object exposed API. With Polyclass `vars()` you can bind a flat object as css variables. The `property-var-*` class-name can assign the value to any property on-the-fly. The _functional insert_ allows a developer to create their own dynamic classes.

```js
Polyclass().add(["background", "mode"], (splitObj) => {
    if(splitObj.values[0] == 'fancy') {
        Polyclass.insertRule('background-mode-fancy', {
            border: 'solid'
            , display: 'flex'
            , color: 'var(swatch.fancy)'
        })
    }
})
```
As these classes insert into a tree of possibilities, we can restore the data from a nested JS object.


---

Implementing design tokens is arbitrary, and the only limit is readability. I'm hoping nearly all of Polyclass is configurable through the loaded DOM. Allowing the library to load without pre-config onto any page.

With that, there are some "Design Tokens" cross-over components incoming for Polyclass. Some of which can be configured to act as true design-tokens. The benefit of applying tokens within the Polyclass framework allows the _standard_ functionality work with developer preferred tokens. Coupled with the `vendor` prefix, it's essentially a framework in-a-box!


### Mutators

A Polyclass mutator and mutator set will adapt the CSS declaration given a range of classes on a target. For example the `color-red` can be _mutated_ with a _shades_ mutator: `color-red shade-4`.

With Polyclass we can combine this for optional directionality:

    color-red shade-4       Lower 'red' by 4 steps
    color-red shade+10      Raise by 10 shade steps

This may or may-not work with other components given the mutator setup:

    color-red shade-4           works
    background-red shade-4      works

    border-solid shade-4        does not work


Mutators are written to focus on a property. The CSS declaration takes this into account:

```css
.background-red.shade-4 {
    color: #88000; /* red - 4 steps */
}
```

```js
Mutator('shade', [
        'color',
        'background',
    ], handler(splitObj) {
        /* Shade alongside another target*/
        if(splitObj.token == 'background') {
            let steps = splitObj.mutator.values[0] // == 4
            let color = splitObj.values[0] // 'red', first value of "background-*"
            return reshade(color, ...steps)
        }
    })
```

---

Mutators could be combined with a dotted notation, capturing values from a nested
dictionary

```js
Polyclass().load({
    primary: {
        success: {
            color: 'green';
        },
        border: 'solid 1px'
    }
})
```


```jinja
<div class='color-primary.success'>
    border solid, green text - success!
</div>
```

### Templates

Polyclass will implement a "template" method using HTML `<template>`. A user will create a template for the class, and use it as a future property-set:

```jinja
<template name='thingyverse' class="background-#333 color-#eee display-flex">
    This is a hidden template
</template>

<div class='thingyverse'>
    Inherits all the class properties.
</div>
```

#### Nested and "type" Templates

A Template can own nested templates, producing classes for children

##### Nested

```jinja
<template name='columns' class="background-#333 color-#eee display-flex">

    <template name='column'
              class="display-flex
                     flex-shink-.5
                     flex-grow-1
                     flex-basis-50%">
    </template>

    <template name='splitter'
              class="display-flex
                     height-100%
                     width-.5em
                     flex-grow-0">
    </template>

</template>
```

Accessing the classes of which only function within the expected parent:

```jinja
<div class='columns'>

    <div class='column'></div>
    <div class='splitter'></div>
    <div class='column'></div>
    <div class='column'></div>
    <div class='splitter'></div>
    <div class='column'></div>

</div>
```

##### Type Template

Define what _Type_ of node receives properties. Nested further for sub properties.

```jinja
<template>
    <p name='intro'
       class='font-size-5em
              justify-content-center
              font-family-slab-serif-500'>
       <strong class='font-weight-500 color-var-highlight-color'></strong>
    </p>
</template>
```

This allows the development of UI components to contribute directly to the source. The templates can be pre-parsed for CSS text baking, or dynamic within the view - allowing overrides and client-side customisation.