# Grid

Generate grid format layers using as receivers.

    grid-3

This produces css `display-grid` styled node expecting three columns. By default all columns widths are `1fr`

    grid-3
    //=> grid-template-rows-1fr-1fr-1fr

But a modifier can apply a format without altering the primary receiver and apply our own logical descriptive:

    grid-3 cols-1fr-20em-1fr
    // same as:
    display-grid grid-template-columns-1fr-20em-1fr

---

Because the forward key stepper can count, we can capture multiple modifiers and select a preference

    grid-2 cols-.5fr-1fr
    grid-3 cols-1fr-20em-1fr
    grid-4 cols-1fr-20em-20em-1fr
    grid-5 cols-.5fr-.5fr-20em-20em-1fr

    <div class="grid-2 cols-.5fr-1fr"></div>

Switching from `2` to `4`:

    - grid-2 cols-.5fr-1fr
    + grid-4 cols-1fr-20em-20em-1fr

Could become:

    grid-2
        cols-.5fr-1fr
        cols-1fr-20em-1fr
        cols-1fr-20em-20em-1fr
        cols-.5fr-.5fr-20em-20em-1fr

    <div class="grid-2
            cols-.5fr-1fr
            cols-1fr-20em-1fr
            cols-1fr-20em-20em-1fr
            cols-.5fr-.5fr-20em-20em-1fr"
        >
    </div>

Allowing a single key switch

    -   grid-2
    +   grid-4

The grid count selects the preferred modifier.