# How Polyclass Works

Polyclass is a CSS _fundamentally_ a string detection tool, generating a graph of all CSS properties as _keys_. With the capability to boilerplate quadrillions of unique class combinations through declarative naming, Polyclass offers eliminating the need for in-line styles. Whether you're working with pre-rendered content or making live DOM changes, Polyclass ensures the stylesheet is declared as needed.

---

Under the hood Polyclass provides two core features, the "Dynamic CSS StyleSheet" and the "ClassGraph". Polyclass detects HTML classes (such as `margin-top-var-apples`) in the DOM and attempts to resolve the class-names through the graph of valid possibilities using `ClassGraph`. Upon discovering a valid css key (such as `margin-top`) Polyclass defines a new stylesheet declaration with the translated property (in this case `var-appes`) using `DynamicCSSStylesheet`.

The result immediately affects the view, thanks to the amazing CSS Engine.


