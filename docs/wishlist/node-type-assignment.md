# Node Type assignment

polyclasses generates "global" classes:

    .color-red {
        color: red
    }

Type assignment would ensure classes target unique HTML node types, allowing the
same class name to adapt to an object

    h1.color-red {
        color: red; # pure red
    }

    p.color-red {
        color: #880000; # darker readable red.
    }

---

The _inline-name_ could define this property, however this may lead to confusion when cross-referencing with _css class based selectors_:

```html
<!-- global inline -->
<div class='color-red'></div>
<p class='color-red'></p>

<!-- relative inline -->
<div class='.color-red'></div>
<p class='.color-red'></p>
```

The full-stop "`.`" can be parsed by polyclass, but is not easy to read if referenced:

    # standard
    html body.dark div.color-red

    # With relative
    html body.dark div.\.color-red

