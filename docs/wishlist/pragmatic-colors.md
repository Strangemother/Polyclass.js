# pragmmatic color assignment

A class to capture a value from another node, and assign a color to
the target node. for example the text of an entity should be in contrast to the background, we can change the text color to white
or black when the background is swithed. Example

    "background-color-#111 color-constrast-background-color"

This could also be defined through variables somehow:

    const swatch = color.swatch()
    cg.vars({
            background: swatch.background
            , text-color: swatch.foreground
        })


## Invert property

An assignable value `invert-*` to produce a computational colour inverstion of the given next value. For example, extended to a _contrast_ key, we can apply a text color given a _background_ color:

    "color-contrast-invert-#111"

    textColor({r:17/255, g: 17/255, b: 17/255})

    {
        color: white
    }



```js
var textColor = function(bgColor) {
  var r = bgColor.r * 255,
      g = bgColor.g * 255,
      b = bgColor.b * 255;
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return (yiq >= 128) ? 'black' : 'white';
}

function standardize_color(str){
    var ctx = document.createElement("canvas").getContext("2d");
    ctx.fillStyle = str;
    return ctx.fillStyle;
}
```
