# Extended Colors

A default Polyclass setup allowed for _web name_ and _hex_ colors. The extended colors addon provides a variety of other CSS Color types, such as "hsl":

```jinja
<body polyclass>
    <p class="color-hsl-150-30%-60%/0.8">
      Fancy Green.
    </p>
</body>
```

Other examples:

    border-solid-1px-red // before
    border-solid-1px-rgb-255-0-0 // after rgb

    // -- other examples -- //
    color-rgb-200-20-20
    color-hsl-150-30%-60%/0.8
    color-hwb-194-0%-0%/0.5


## Install

Include the `color-values.js` addon. If you're using the _full_ version of Polyclass, the functionality is already installed.


## Usage

The following color types are available:

+ `rgb` RGB (Red, Green, Blue)
+ `hsl` HSL (Hue, Saturation, Lightness)
+ `hwb` HWB (Hue, Whiteness, Blackness)
+ `lab` LAB (Lightness, A-axis, B-axis)
+ `lch` LCH (Lightness, Chroma, Hue)
+ `oklab` Oklab (Lightness, A-axis, B-axis)
+ `oklch` Oklch (Lightness, Chroma, Hue)

They all permit the same input format:

    name-<number>-<number>-<number>[/A]
    name-<number>-<number>-<number>-<number>

Such as:

    hsl-150-30%-60%             hsl(150 30% 60%)
    hsl-150-30%-60%/0.8         hsl(150 30% 60% / 0.8)
    hwb-194-0%-0%               hwb(194 0% 0%)
    hwb-194-0%-0%/0.5           hwb(194 0% 0% / 0.5)
    hsl-0.3turn-60%-45%/0.7     hsl(0.3turn 60% 45% / 0.7)


The color value will work within any CSS property atttribute:


```jinja
<body polyclass>
    <p class="color-white
              background-hsl-0.3turn-60%-45%/0.7
              border-solid-hsl-150-30%-60%-2px">
      Border, colour, background.
    </p>
</body>
```

## Examples

Named colors

    rebeccapurple
    aliceblue

RGB Hexadecimal

    #f09
    #ff0099

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


# Limitations

+ Defined `color-space` is not available:

        /* not possible */
        color(display-p3 0.7 0.5 0)
        color(from hsl(0 100% 50%) srgb r g b)
        color(from hsl(0 100% 50%) srgb calc(r - 0.4) calc(g + 0.1) calc(b + 0.6) / calc(alpha - 0.1))
        color(from hsl(0 100% 50%) xyz calc(x - 0.3) calc(y + 0.3) calc(z + 0.3) / calc(alpha - 0.1))
        color(xyz-d65 0.112426 0.512648 0.319317 / 0.9)
        color(srgb 0.6 0.1 0.6 / 0.9)

    + https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color

+ Currently only 3 or 4 _bit_ colour types will work

        hsl-150-30%-60%             hsl(150 30% 60%)
        hsl-0.3turn-60%-45%/0.7      hsl(0.3turn 60% 45% / 0.7)

+ Relative formats will not format correct:

        /* Relative CSS colors */
        /* HSL hue change */
        hsl(from red 240deg s l)
        /* HWB alpha channel change */
        hwb(from green h w b / 0.5)
        /* LCH lightness change */
        lch(from blue calc(l + 20) c h)

        /* light-dark */
        light-dark(white, black)
        light-dark(rgb(255 255 255), rgb(0 0 0))

+ Cannot interpolate:

        /* not available as a polyclass */
        color-mix(in oklch, oklch(none 0.2 10), oklch(60% none 30))
        color-mix(in oklch, oklch(60% 0.2 10), oklch(60% 0.2 30))

+ System colors will work, but are naturally process and may fail in complex cases:

        /* ok */
        border-2px-ButtonBorder-solid

        border: 2px ButtonBorder solid

