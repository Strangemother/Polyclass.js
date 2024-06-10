# template objects

Potentially or somehow leverage additional classes, styles and definitions from 'templates'. One option is html5 `<template>`

```html
<template>
    <style type="text/css" name='foo-bar'>
        {
            border:solid prop(0);
            border-radius: 2em;
        }
    </style>
</template>
```

When this is applied, `prop(0)` is replaced with a key var:

```html
<div class='foo-bar-1em'>
</div>
```

---

Potentially binding many classes to one class:

```html
<template>
    <div name='foo-bar margin-1em-2em font-size-prop(0)'></div>
</template>
```

Applying the class would yield an active change to the classes:

```html
<template>
    <!-- result -->
    <div class='foo-bar margin-1em-2em font-size-prop(0)'></div>
</template>

<!-- applied -->
<div class='foo-bar-1em'></div>

<!-- result -->
<div class='foo-bar-1em margin-1em-2em font-size-1em'></div>
```

In this case the class `foo-bar-1em` does nothing. The `prop(0)` is replaced with the `1em` from the initial class name.
