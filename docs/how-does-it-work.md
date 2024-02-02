# How Polyclass Works

Under the hood Polyclass provides two core features, the "Dynamic CSS StyleSheet" and the "ClassGraph". Polyclass detects html classes (such as `margin-top-var-apples`)  in the view, and attempts to resolve the class through the graph of valid possibilities using `ClassGraph`. Upon discovering a valid css key (such as `margin-top`) Polyclass defines a new stylesheet declaration with the translated property (in this case `var-appes`) using `DynamicCSSStylesheet`.

The result immediately affects the view, thanks to the CSS Engine.
