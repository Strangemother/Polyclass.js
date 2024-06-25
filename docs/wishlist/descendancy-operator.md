# Descendancy Operator

Currently properties are assigned to their given node

    <div class="display-grid gap-2em grid-auto-flow-column">
        <div class="text-align-center border-radius-1em"></div>
    </div>

It would be nice to reduce this somehow.

    <div class="display-grid gap-2em
                grid-auto-flow-column

                *-text-align-center
                *-border-radius-1em"> <!-- Given to children. -->
        <div class="..."></div>
    </div>

becomes:

```css
\*-text-align-center > * {
    text-align: center;
}
```

The Descend key provides the nested scope selector:  > *

    polyclass > * {
        prop: value;
    }


# Notes

It would be nice to stay away from the existing CSS terminology, to ensure the conventions within Polyclass don't conflict with conventions applied through CSS.

+ sibling assignment

Descendants and siblings can differ with their appliance of classes. A descendant assigns the polyclasses to children, sibling assignment push polyclasses to immediate neighbours

## Example

The current format:

    <div class="display-grid gap-2em grid-auto-flow-column">
        <div class="text-align-center border-radius-1em"></div>
        <div class="text-align-center border-radius-1em"></div>
        <div class="text-align-center border-radius-1em"></div>
        <div class="text-align-center border-radius-1em"></div>
        <div class="text-align-center border-radius-1em"></div>
    </div>

result (placeholder `?` pending syntax choice):

    <div class="display-grid gap-2em
                grid-auto-flow-column
                ?-text-align-center
                ?-border-radius-1em">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>


# Notes

## Option `*-`

Descend using a special parent start node.

```jinja
<div class="display-grid gap-2em grid-auto-flow-column
            *-text-align-center
            *-border-radius-1em">
    <div></div>
</div>
```

Potentially this can capture the _type_ of child:

```jinja
<div class="display-grid gap-2em grid-auto-flow-column
            div-text-align-center
            div-border-radius-1em">
    <div>bordered, centered.</div>
    <p>not bordered, not centered.</p>
</div>
```

And deeper:

`div-*-text-align-center`

```css
.div-\*-text-align-center > div > * {
    text-align: center;
}
```

`*-div-text-align-center`

```css
\*-div-border-radius-1em > * > div {
    border-radius: 1em;
}
```

## Option Dash start `-`

The first option could be blank:

```jinja
<div class="display-grid gap-2em grid-auto-flow-column
            -text-align-center
            -border-radius-1em">
    <div></div>
</div>
```

descenders are named:

```jinja
<div class="display-grid gap-2em grid-auto-flow-column
            div-text-align-center
            div-border-radius-1em">
    <div></div>
</div>
```

And deeper:

```jinja
<div class="display-grid gap-2em grid-auto-flow-column
            -li-text-align-center
            -li-border-radius-1em">
    <ul> <!-- step zero -->
        <li></li> <!-- target(li) -->
    </ul>
</div>
```

