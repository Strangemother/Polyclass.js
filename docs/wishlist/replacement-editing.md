# Replacement editing

Attempt to _replace_ a similar class with a new one, this can be bubbled to the dcss, allowing clearner editing. This is useful if the view cycles
through many styles, leaving a tail of unused styles.

    pc(node).change('margin-1.4em-1em', 'margin-1.5em-1em')
