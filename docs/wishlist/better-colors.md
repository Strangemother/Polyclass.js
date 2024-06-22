# Colors

Currently colours may be named or hex (any literal value).
This should be altered to accept all colour types.


return the cleaned values for the css declaration

    word    count       chars
    hex     1           6   3   2   1
    rgba    4
    rgb     3   3/1
    hsl     3   3/1
    hwb     3   3/1
    lab     3   3/1
    lch     3   3/1
    oklab   3   3/1
    oklch   3   3/1
    color   4   3/1

## General Types

| color space | functions |
| --- | --- |
| sRGB | hsl(), hwb(), rgb() |
| CIELAB | lab(), lch() |
| Oklab | oklab(), oklch() |
| Other | color() |

```js
color(colorspace c1 c2 c3[ / A])
```

colorspace

+ srgb, srgb-linear, display-p3, a98-rgb,
+ prophoto-rgb, rec2020, xyz,
+ xyz-d50, and xyz-d65.

c1, c2, c3

+ `<number>` between 0 and 1,
+ a `<percentage>` or the keyword none,
+ which provide the component values in the color space.

A Optional

+ An `<alpha-value>` or the keyword none,
+ where the number 1 corresponds to 100%
+ (full opacity).


## Examples

Named colors

    rebeccapurple
    aliceblue

RGB Hexadecimal

    #f09
    #ff0099

    color(display-p3 0 1 0)

RGB (Red, Green, Blue)

    rgb(255 0 153)
    rgb(255 0 153 / 80%)

HSL (Hue, Saturation, Lightness)

    hsl(150 30% 60%)
    hsl(150 30% 60% / 0.8)
    hsl(0.15turn 90% 50%)

HWB (Hue, Whiteness, Blackness)

    hwb(12 50% 0%)
    hwb(194 0% 0% / 0.5)

LAB (Lightness, A-axis, B-axis)

    lab(50% 40 59.5)
    lab(50% 40 59.5 / 0.5)

LCH (Lightness, Chroma, Hue)

    lch(52.2% 72.2 50)
    lch(52.2% 72.2 50 / 0.5)

Oklab (Lightness, A-axis, B-axis)

    oklab(59% 0.1 0.1)
    oklab(59% 0.1 0.1 / 0.5)

Oklch (Lightness, Chroma, Hue)

    oklch(60% 0.15 50)
    oklch(60% 0.15 50 / 0.5)

## Examples

Named colors

    rebeccapurple
    aliceblue

RGB Hexadecimal

    #f09
    #ff0099

    // color(display-p3 0 1 0)

RGB (Red, Green, Blue)

    rgb-255-0-153
    rgb-255-0-153/80%
    rgb-255-0-153-80%

HSL (Hue, Saturation, Lightness)

    hsl-150-30%-60%
    hsl-150-30%-60%/0.8
    hsl-150-30%-60%-0.8
    hsl-0.15turn-90%-50%

HWB (Hue, Whiteness, Blackness)

    hwb-12-50%-0%
    hwb-194-0%-0%/0.5
    hwb-194-0%-0%-0.5

LAB (Lightness, A-axis, B-axis)

    lab-50%-40-59.5
    lab-50%-40-59.5-0.5
    lab-50%-40-59.5/0.5

LCH (Lightness, Chroma, Hue)

    lch-52.2%-72.2-50
    lch-52.2%-72.2-50/0.5
    lch-52.2%-72.2-50-0.5

Oklab (Lightness, A-axis, B-axis)

    oklab-59%-0.1-0.1
    oklab-59%-0.1-0.1/0.5
    oklab-59%-0.1-0.1-0.5

Oklch (Lightness, Chroma, Hue)

    oklch-60%-0.15-50
    oklch-60%-0.15-50/0.5
    oklch-60%-0.15-50-0.5
