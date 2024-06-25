# Style Block

Define a styleset with a name, as the definition for a class.
Fundamentally this is the same as defining a CSS block.

```jinja2
<div names="container primary-area"
     class="padding-1rem-2rem
            background-#111">
    <div names="display-grid"
         class="gap-2em
                display-grid
                grid-auto-flow-column">
        <div class="text-align-center
                    background-teal
                    border-radius-1em"></div>
    </div>
</div>
```

Then we can use it, access all styles.

```jinja2
<div class="container primary-area">
    <div class="display-grid">
        <!-- ".container .display-grid" styles -->
        <div>
            <!-- ".container .display-grid > div" -->
        </div>
    </div>
    <div>
        <!-- No style for ".container > div" -->
    </div>
</div>
```