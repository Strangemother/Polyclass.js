# Modifiers

We can define "sibling class-names" to _modify_ a declaration as it's detected by polyclass. The `modifier` applys additional property values, such as _defaults_:

    // The font-pack default modifier
    "font-pack-roboto default-sans-serif"

In the exmple of a font-pack modifier `default`, adapts the `font-pack-*` declaration to install a default font. The `default-*` modifier will only work in-relation to a `font-pack`, it does not create a new declaration, and is applied statically (it applies to the Value and doesn't change.)

## Knowledge

For developers it's important to know when to implement a modifier.

+ Don't exist in the primary tree
+ Are unique to features

Modifiers are generally expected to edit declaration content of which aren't usually exposed by the main graph, specific to an item for example, the _default font_ of a font-family declaration is not a unique CSS selector, and therefore cannot be tree manipulated.


