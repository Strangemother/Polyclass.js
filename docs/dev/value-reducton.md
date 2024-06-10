# Value Reduction

Some css _value_ properties contain dashes (`-`):

```jinja2
<!-- Polyclass string -->
<div class="cursor-no-drop
            flex-direction-row-reverse
            ">
        </div>
```

```css
/* Produced css */

.cursor-no-drop {
    cursor: no-drop;
}

.flex-direction-row-reverse {
    flex-direction: row-reverse;
}
```

In both cases Polyclass splits the given properties as expected.

## How does it work

# Issue

In some cases the forward stepper merges the incorrect key through a false-positive:

```js
g.objectSplit('display-inline-flow-root');
props = ['display']
values = ['inline-flow', 'root']
```

This is incorrect, and should be:

```js
g.objectSplit('display-inline-flow-root');
props = ['display']
values = ['inline', 'flow-root']  // Split change here.
```

This occurs because the word list contains an `inline-*` reference, but `inline-flow` is not a valid key.

Alternatively (and likely quicker), we provide micro-graphs per property. This ensures a property can only resolve their own special keys:

```js
g.objectSplit('display-inline-flow-root');
// Load in "display-inline" micro-graph
props = ['display']
values = ['inline', 'flow', 'root']
microGraph = g.valuesGraph[props]
g.forwardReduceValues(props, values, microGraph, translations=g.words)
```

Functionally it can already do this, as we simply supply a large graph of all loaded keys, so the change involves splitting the paths to groups relative to their parent assignment.

```js
microGraph = {
    'display': [
        "flow-root",
        // ...
    ]
}
```

Proposed props for display:

    /* precomposed values */
    display: block;
    display: inline;
    display: inline-block;
    display: flex;
    display: inline-flex;
    display: grid;
    display: inline-grid;
    display: flow-root;
    display: revert-layer;


## However

This still leads to the `inline[-*]` but not `inline-flow` issue, as loading this path list will yield the old error.

Therefore we could change the the forward stepper to account for this, by detecting _good paths_ and omitting bad key combinations.

This means in the next form the map should test if a combination is valid as its stepping forward:

    display:    inline;
    display:    inline-block;
    display:    flow-root;

    polyclass: "display-inline-flow-root"
    props:      [display]
    values:     ...

                1. inline               valid
                2. inline-flow          invalid
                    a. pop "inline"     .
                3. flow                 invalid
                3. flow-root            valid
                    a. pop "flow-root"  .

This is similar to the existing version, but the popping will occur in a look-ahead manner rather than the current _forward step with no look-ahead_

