# `var()` Assignment

+ https://developer.mozilla.org/en-US/docs/Web/CSS/var

The CSS `var()` function assign a _variable_ to a property. You can share the variable across multiple elements, saving a lot of repetition.

Polyclass explicity captures `property-var-name` classes and rewrites them to their proper format. You can then define your root styles through your custom (ye old standard) CSS:

```html
<div class='color-var-happy-octupus'></div>
```

Your custom styles:

```css
html {
    --happy-octopus: #095a1a;
}
```

Or using Polyclass `vars()` object:

```js
cg.vars({
    "happy-octopus": "#095a1a"
})
```

We can apply this color variable to any property with Polyclass. For example to use as the text color, the class starts with `color-*`, for a background we can use `background-color-*`

```html
<div class="color-var-happy-octopus
            background-color-white">
    <p>Green like an octopus!</p>
</div>

<div class="background-color-var-happy-octopus
            color-white">
    <p>Colour flipped like an ape!</p>
</div>
```

+ `color-var-happy-octopus`: The text `color` receives the `--happy-octopus`
+ `background-color-var-happy-octopus`: The text `color` receives the `--happy-octopus`
+ `color-white`: Assign the standard CSS property _white_ to the text: `color: white`
+ `background-color-white` Assign the standard CSS property _white_ to the background.

