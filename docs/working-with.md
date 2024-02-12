# Working With Polyclass

<div align="center">

## There is no Polyclass Opinion

You're not implementing _"Polyclass"_ terminology, conventions, or practices. Read more in [how it works](./how-does-it-work.md)

</div>

---

The secret to `Polyclass`; there is no Polyclass.

Polyclass doesn't have a _given_ list of personally (by me) curated class-names. Polyclass does not have an opinion and seeks to provide natural CSS through the class-names.

## How does it work?

Under the hood Polyclass is a fancy string detector, with the ability to test a string for _"CSS-like"_ definitions. For us as end-users we can fundamentally build any CSS declaration using class-names.

The anatomy of a Polyclass name:

1. The target property
2. Values (in order), split by dashes `-`

With that we have the entire library at our hands. Like this:

```jinja
<body class="justify-content-center display-flex">
    <main class="max-width-80vw"></main>
</body>
```

# Properties

To get started, we can colour some text. The CSS property for text color is `color`, and any general color:

```jinja
<p class='color-green'>Green Text</p>
```

This will also work with other color values such as a hex color `#00FF00` (that's green)

```jinja
<p class='color-#00ff00'>Green Text</p>
```

We can change the size of the font with the CSS property `font-size`:

```jinja
<p class='color-#00ff00 font-size-1.4em'>Green Text</p>
```

# Values

Our HTML Entity has a font size of `1.4em`. This can be any CSS _length_ value:


```jinja
<p class='font-size-1.4em'>EM _ephemeral_? units</p>
<p class='font-size-1.2rem'>REM relative ephemeral units</p>
<p class='font-size-2ch'>CH characters</p>
<p class='font-size-24px'>PX pixels</p>
<p class='font-size-1in'>IN inches</p>
```

For all properties, we can assign the expected values. For example, let's add some `margin` and `padding` to our entity:

Let's focus on `padding`:

```jinja
<p class='color-#00ff00 font-size-1.4em padding-1rem-2rem'>Green Text</p>
```

The CSS property `padding` may accept between 1 and 4 values. We use the 2 value variant:


    property    top/bottom  left/right
    padding     1rem        2rem

We use `rem` to use the _original_ `em` measurement, because `font-size-1.4em` naturally resizes the `em` size within the entity.

We can add `margin`:


```jinja
<p class='color-#00ff00
          font-size-1.4em
          padding-1rem-2rem
          margin-2rem'>
    Green Text
</p>
```

new-lines are arbitrary and help with readability.


Here we use the 1 value variant of the `margin` - resulting in `margin-2rem` I chose `REM` again to ensure the margin and padding are consistent.

---

Let's make it easier to look at. Because it's 2024, a nice dark background:

```jinja
<div class="background-#111">
    <p class='color-#00ff00
              font-size-1.4em
              padding-1rem-2rem
              margin-2rem
              background-#333'>
        Green Text
    </p>
</div>
```

Because the CSS engine accepts _3 char_ hex `#333`, Polyclass can use the same with `background-#111` (nearly black) and `background-#333` (lesser nearly black).

---

Let's make the `<p>` prettier in general with rounded edges using the CSS property `border-radius`:


```jinja
<div class="background-#111">
    <p class='color-#00ff00
              font-size-1.4em
              padding-1rem-2rem
              margin-2rem
              background-#333
              border-radius-.4rem'>
        Green Text
    </p>
</div>
```

Notice I can use the _short form float_, omitting the zero `0`: `border-radius-.4rem`


## Fonts

> Install fonts immediately, read more in (font-packs)[./font-pack.md]

We should install a font, and apply it to this view. Luckily Polyclass has this built-in, and only requires a class-name.

First we can _collect_ our font, in this case, I'm using "Roboto". The CSS property for a font can get complex, so we don't use it directly.

Instead we can use a Polyclass property `font-pack`, of which will do all the heavy-lifting:

```jinja
<div class="background-#111
            font-pack-roboto-400"> <!-- collect and install in the view -->

    <p class='color-#00ff00
              font-size-1.4em
              padding-1rem-2rem
              margin-2rem
              background-#333
              border-radius-.4rem
              font-roboto'>      <!-- Use the font "roboto" -->
        Green Text
    </p>
</div>
```

The `font-pack-roboto-400` installs "Roboto" with the preferred _weight_ `400` (that's the _standard_ weight). To use it we apply `font-roboto` on our target.

The `font-pack-*` and `font-*` classes can exist on the same node:

```jinja
<div class="background-#111
            font-pack-roboto-400
            font-roboto"> <!-- collect, install, and use - in the view -->
        Roboto Fonted!
</div>
```