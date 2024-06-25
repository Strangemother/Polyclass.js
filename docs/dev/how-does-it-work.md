# How Polyclass Works

Polyclass is a CSS _fundamentally_ a string detection tool, generating a graph of all CSS properties as _keys_. With the capability to boilerplate quadrillions of unique class combinations through declarative naming, Polyclass offers eliminating the need for in-line styles. Whether you're working with pre-rendered content or making live DOM changes, Polyclass ensures the stylesheet is declared as needed.

---

Under the hood Polyclass provides two core features, the "Dynamic CSS StyleSheet" and the "ClassGraph". Polyclass detects HTML classes (such as `margin-top-var-apples`) in the DOM and attempts to resolve the class-names through the graph of valid possibilities using `ClassGraph`. Upon discovering a valid css key (such as `margin-top`) Polyclass defines a new stylesheet declaration with the translated property (in this case `var-appes`) using `DynamicCSSStylesheet`.

The result immediately affects the view, thanks to the amazing CSS Engine.


<div align="center">

# There is no Polyclass Opinion

You're not implementing _"Polyclass"_ terminology, conventions, or practices.

</div>


Polyclass out-the-box does not provide:

+ A framework of built "components"
+ A set list of supported _things_
+ A skinning/theme or _reset_ features

Under the hood there are no bound rules, or abstracted UI widgets, or even a set definition of available properties...

---

In fact we would consider Polyclass as an extension to the existing CSS engine, utilising all the existing properties to build CSS classes you need. As it sounds this comes with some huge benefits, and one glaring issue. The advantages are easy!

+ **Quick, Small, Efficient**
    As _no properties_ are pre-defined, the entire library is only \~15KB (minified). Using a graph of available CSS properties (grabbed from the document), it has a low static memory (roughly \~200 objects.)
+ **Transferable Knowledge**
    The properties in Polyclass mirror _real_ CSS properties. If you already know CSS, you know Polyclass.
    Once you're comfortable with Polyclass, move directly to CSS
**Expressive**
    Fed up of `px` locked solutions? Polyclass implements all 36 measurement types, allowing modern UI development (I'm partial to a `rem`, but I'm intrigued by `ch`)

Issues:

+ **Docs?**
    How do I prepare myself for attempting to document **all** possible Polyclass names.it's generally a case of documenting what "margin", then "padding" is etc... However I don't know _all CSS properties_, and if challenged it would become years of just documenting CSS.


---

# Glossary

+ `class-name`
  The class-name is a just a HTML class but written for Polyclass to include the property, and value of a CSS declaration.

    class-name
    border-solid-1px
    text-align-center

  When reading this, we can assume the class-name, is the extended parameter string of which Polyclass can process

+ Declaration
  A CSS Declaration is the body of content containing the property-value pairs.
  When writing a declaration to the dynamic stylesheet it becomes _declared_, and becomes part of the active rendering.

+ Alias
  A pseudo name of a key within the tree. Translated before acessing the tree.

    "background-red" // no alias
    "bg-red"

  An alias performs a literal change to the keys before use.

+ Tree
  All Polyclass _possible_ keys are generated in a nested dictionary. This _tree_ is inspected to perform class-name splits.

+ Sibling
  A class-name associated with another class-name, for the purposes of overloading a primary class with a modifier or other paired problems

+ Modifer
  A special class-name to adapt the declaration of a class-name during creation. The Modifier isn't generally applied to the tree, and instead discovered as a sibling when required.

    "primary-class-name modifier-class"

  In general cases it's preferred to apply a modifier _after_ the primary.

+ Primary [class-name]
  Refering to a class-name may include a sibling and other associated classes. The _primary_ defines the first, or target class-name declaration.

    primary     sibling|modifier
    "font-pack-roboto default-times-new-roman"

+ Function
  A function resides upon a Value until its _collapsed_ into a final value when declared. A function modifies the end-state value to perform computation changes to a value during runtime:

    class-name.function:arg[:...]
    "color-red.reshade:1"