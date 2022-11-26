# Pipes (v2a)

The first version works very well and proves the ability to generate live SVG's and pen lines.

This version is a refactor of the original, with tools to simplify pen drawing - for better lines.

## Improvements

+ Lines should be easier to manipulate - single entities in a clear stack
+ Trackers should be easier to add and remove
+ rewrite the 'pipe' drawing


The new _pen_ is a list of actions set within a builder class. Each unit within the list (a knuckle) is a self executing step with a shared pen.
This allows reshaping of the pen as its rendered

```js
pen = [
    startPos(100,100 as Vp)
    roundPen(from Vp, to V2)
    moveto(from V2, to (300, 300) as v3)
        moveTo(300, current+50, width*=2)
        moveTo(300, current+200)
        moveTo(300, current+50, width*=.5)
    sharpPen(from V3, to V4)
    ...
]
```

In this example a pen may render its own internal step.

The pen has a set of nodes - some _literal_, and others virtual. The knuckles may apply the position vectors into the pen context, allowing sharing and user editing

```js
class Pen {
    stash {
        start {
            100, 100
        }
        a {
            100, +100 // == 200
        }
    }
}
```

---

An L and S line may be connected with a virtual knuckle - producing LL, LS, SS



