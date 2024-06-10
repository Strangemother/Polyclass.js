# Two way binding

In the current form, the `font-pack` does not pick-up the usage of a `font-[name]` if the named font is a node _within_ the pack node.

This is probably due to the write of the font-pack occuring _after_ the `font-[name]` was defined. As such, the `font-[name]` is unprepared somehow.


```html
<body class="font-roboto-400">
        <div class="container
                    font-pack-roboto-100-400-900-i300">
            works
        </div>
</body>
```


```html
<body class="font-pack-roboto-100-400-900-i300">
        <div class="container font-robot-400">
            Does not work
        </div>
</body>
```
