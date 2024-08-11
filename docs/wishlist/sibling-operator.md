# Sibling Operator
https://developer.mozilla.org/en-US/docs/Web/CSS/Next-sibling_combinator
Currently properties are assigned to their given node

    <div class="display-grid gap-2em grid-auto-flow-column">
        <div class="text-align-center border-radius-1em"></div>
    </div>

It would be nice to reduce this, to assigning the same properties to neighbours

    <div class="display-grid gap-2em
                grid-auto-flow-column">

        <div class="?-text-align-center
                    ?-border-radius-1em">   <!-- Given to neighbour. -->
        </div>
        <div class="..."></div>             <!-- target -->
    </div>

becomes:

```css
parent div.?-text-align-center {
    text-align: center;
}
```

## Example

The current format:

```jinja
<div class="display-grid gap-2em grid-auto-flow-column">
    <div class="text-align-center border-radius-1em"></div>
    <div class="text-align-center border-radius-1em"></div>
    <div class="text-align-center border-radius-1em"></div>
    <div class="text-align-center border-radius-1em"></div>
    <div class="text-align-center border-radius-1em"></div>
</div>
```

result (placeholder `?` pending syntax choice):

```jinja
<div class="display-grid gap-2em grid-auto-flow-column">

    <div class="?-text-align-center
                ?-border-radius-1em"></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</div>
```

