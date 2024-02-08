# Attempting to Count!

Whilst documenting Polyclass, I initially attempting to gather the total possible combinations of class-names. This would include all the targetable CSS properties, and any sane property/value. As a fair count it shouldn't include _absolutely every truly possible CSS property and value_, as there are many a developer shouldn't write using Polyclass:

```css
.linear-bg {
    background: linear-gradient(...) /* not Polyclass pleasant.*/
}
```

As such we count all the properties of which are clear and easy. This is still a fair amount including numbers, sizes, counts, and property unique values (e.g. `flex-direction: column`), but doesn't include special CSS properties, such as function calls or grid templates.


## Running Total


    margin      2,696,728,989,522,418
    padding     2,696,728,989,522,418
    color               4,294,967,444+

`137` properties to go.

## Count a Margin

Starting with a well-known CSS property, the `margin` has 4 possible values and variations between

    margin: length
    margin: length length
    margin: length length length
    margin: length length length length

There are sub properties for each box edge: `margin-top`, `margin-bottom`, `margin-left`, `margin-right`. From MDN:

> The margin-top property is specified as the keyword `auto`, or a `<length>`, or a `<percentage>`. Its value can be positive, zero, or negative.

Also these 5 _global_ properties

+ `inherit`
+ `initial`
+ `revert`
+ `revert-layer`
+ `unset`

The other fields `bottom` ... `right` are the same:

    margin-top: auto
    margin-top: [global]
    margin-top: length
    margin-top: percentage

## Length

+ https://drafts.csswg.org/css-values/#lengths

+ 6: `cap`, `ch`, `em`, `ex`, `ic`, `lh`
+ 6: `rcap`, `rch`, `rem`, `rex`, `ric`, `rlh`
+ 3: `sv`, `lv`, `dv`
+ 6: `vh`, `vw`, `vmin`, `vmax`, `vb`, `vi`
+ 6: `cqw`, `cqh`, `cqi`, `cqb`, `cqmin`, `cqmax`
+ 8: `px`, `cm`, `mm`, `Q`, `in`, `pc`, `pt`, `lvh`
+ `== 35` possible length types
---

Each `length` and `percentage` can be whole or decimal numbers:

+ `10%`
+ `5.5em`
+ `5cm`

To make it _sane_, we can say any value can be up to one half unit, such as `0.5`, `1`, `1.5`, `2` or `2.0`. Between `0` and perhaps `100`?

We can say a nice round `200` possible values we can count per length `5.5em`, `16Q`.
`35` length types, and a percent type is `36*200` possible value types.

We can append 5 globals and a special `auto` word. making `(36*200)+6` total _length_ items.

the `margin` has a combination of `4`, `3`, `2`, `1`.

    margin: length length length length
    ...

Which could be any combination of the possible values:

    margin: 20px 5.5rem 4Q 10vw

For this one:

```py
a = (36*200)+6
quad = a * a * a * a
triple = a * a * a
duple = a * a
single = a

possible_lengths = quad + triple + duple + single
```

Wait that's `2,696,728,989,493,554` _sane_ combinations?

> two quadrillion six hundred ninety-six trillion seven hundred twenty-eight billion nine hundred eighty-nine million four hundred ninety-three thousand five hundred fifty-four

---

Okay I checked with a better maths person. It's correct :|

If we account for the 4 additional sub-properties, with `7206` available length types each, that's `28,864` total `margin-*` possible values.

---

In total for `margin` and `margin-*` we have:

    2,696,728,989,493,554 +
                   28,864 =
    2,696,728,989,522,418


## Padding

Fortunately `padding` is identical in syntax as `margin`. Therefore we can reuse the number `2,696,728,989,522,418` possible combinations.

## Color

+ https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#formal_syntax

The text color, or simple `color` in CSS accepts a range of _types_ however there is a _sane_ set of polyclass values, and other values we probably wouldn't want apply as class names.

For now let's cover the base types:

+ https://developer.mozilla.org/en-US/docs/Web/CSS/color

```
color: currentcolor;
/* Global values */
color: inherit;
color: initial;
color: revert;
color: revert-layer;
color: unset;

/* <named-color> values */
color: red;
color: orange;
color: tan;
color: rebeccapurple;

/* <hex-color> values */
color: #090;
color: #009900;
color: #090a;
color: #009900aa;

```

### Hex

Hex is a quick count. Generally we count 6 char hex `#663399`. I mostly use 3 char, but 8 char is the max possible.

    16 ** 3
    4,096
    16 ** 4
    65,536
    16 ** 6
    16,777,216
    16 ** 8
    4,294,967,296

We won't cheat and pick the the one type 8 char totalling `4,294,967,296` (4 billion) hex numbers.

---

Polyclass _does_ allow more expressive colours:

    color-#333
    color-red
    color-rgb(10,10,10)


However we'll ignore the functional, and only count hex types and `named` colors. There are 148 named colors (some colours are duplicate, however we _can_ name them in polyclass default set, therefore we count it.)

    4,294,967,296 +
              148 =
    4,294,967,444
