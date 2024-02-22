# Polyclass `.vars()` function

Polyclass supports an object of key values, applied to the CSS as `--var` properties.
The exposed keys can be accessed with the class key `var-*` for any CSS key:

```js
cg.vars({
    "very-red": "#88000"
})
```

Producing the constructed CSS:

```css
:root {
    --very-red: #88000;
}
```

Applied to the HTML through the property assignment `*-var-very-red`.
Here we apply `color`:

```html
<div class="color-var-very-red">
    <p>Very red text color</p>
</div>
```

