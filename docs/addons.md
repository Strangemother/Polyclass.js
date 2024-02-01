# Addons

Polyclass can run _addons_ for pre-configuring tools runtime tools within the classgraph. The anatomy of an addon is cheap.

# Receiver

A "receiver" lives within the class graph as a key to capture, such as `margin-top`. We can invent receivers to accept string arguments, in the form of a "split object".

install a function to apply it to the `DynamicCSSStyleSheet` addon stack, run when a class key is detected, such as `var` for class `"var-foo-bar"`

```js
DynamicCSSStyleSheet.addons.varTranslateReceiver = function(cg){
    cg.insertReceiver(['var'], varReceiver)
}

const varReceiver = function(obj) {
    // called when `var-foo` is applied to a HTML entity.
}
```

The receiver will active when `var-some-property` is applied to a HTML node:

```html
<div class="background-color-var-foo-bar">
</div>
```

# Translator
