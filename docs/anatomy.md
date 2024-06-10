# Anatomy of Polyclass

A breakdown of certain elements within the Polyclass library. Firstly the terminology of a CSS declaration:

```css
selector {  /* declaration block */
   property-key: value;
}
```

Polyclass generates class styles selectors `.selector` given the params within the class name.

```jinja2
<div class="class-name-and-params"></div>
```

The properties and values populate after a known CSS property:

```jinja2
<div class="background-color-red color-white">
    red background, white text.
</div>
```

Polyclass understand all valid properties, and parses parameters as values. Some minor pre-processing is applied to the property and value, allowing dynamic edits:

```css
:root {
   --primary-bg: #333;
}
```


```jinja2
<div class="background-color-var-primary-bg">
    Background color is the <code>primary-bg</code> CSS variable value.
</div>
```