# Library Flavour

A user may prefer the syntax of a given CSS library such as bootstrap rows:

_\*(note, I don't know bootstrap - this is an example)_

```
<div class="row-4">
    <div></div> <!-- 25% -->
    <div></div> <!-- 25% -->
    <div></div> <!-- 25% -->
    <!-- blank space -->
</div>
```

We can load library definitions, applying these example items as canned solutions.


```js
cg.loadFlavour("./polyclass/libstyles/bootstrap-4.js")
```

```
<div class="large-text">
    <p>Is a library class, populated with properties governed by the flavour</p>
</div>
```
