<div align="center">

# Polyclass.js

![Polyclass Logo](./docs/logo/1-300.png)

---

</div>

```jinja
<body polyclass> <!-- Activate -->
  <div class="margin-1em-20vw
              background-color-#111
              padding-2em">  <!-- Write classes -->
      <h1 class='color-#EEE'>
          Instant CSS styles, using all CSS properties!
      </h1>
  </div>
</body>
```

Polyclass is a _just-in-time_ CSS class library, built dynamically from your class-names using "Declarative CSS".

> All the boilerplate CSS is builtin with Polyclass.js


This open-source, lightweight library is tailored for dynamic CSS management, generating a graph of keys for all CSS properties. With the capability to boilerplate millions of unique class combinations through declarative naming, Polyclass offers eliminating the need for in-line styles. Whether you're working with pre-rendered content or making live DOM changes, Polyclass ensures the stylesheet is declared as needed.

+ Readable
+ Instantly plug-and-play
+ No Dependencies, and works along-side all the major libraries.
+ Real-time: Seamless compatibility with both pre-rendered content and live DOM changes.

## 🚀 In a Hurry?

Include:

```jinja
<script src="polyclass.js"></script>
```

Polyclass automatic:

```jinja
<body polyclass> <!-- Activate -->
  <h1
    class='color-#999'> <!-- Write classes -->
    Grey Title!</h1>
</body>
```

**Polyclass anything!**

```jinja
<div class="my-container some-other-primary-area
    font-pack-roboto-100-400-i400
    background-#333">

      <div class="demo-box
        gap-1em
        display-flex
        flex-direction-column">

          <div class="text
            background-color-#111
            border-solid-3px-green
            border-radius-.4em
            padding-.8em-1.4em
            color-#EEE
            font-roboto-400
            margin-1em">

              Text content.
          </div>
      </div>
</div>
```

## Bits and Bolts:

+ [Run](./running-polyclass.md)
+ [`font-pack-*` addon](./font-pack.md): Install and use fonts dynamically with `font-pack-*`
+ [CSS `var()`](./css-var.md): Utilise variables for declarative properties and values `color-var-primary-text`
+ [Polyclass `vars()` object](./vars-object.md): Use Javascript objects as CSS `--var` definitions.
+ [`vendor-*` prefix](./vendor-prefix.md): Scope Polyclass usage to a prefix such as `acme-company-background-black`
+ [Aliases](./aliases.md): Reduce typing by aliasing long words `background` => `bg` == `bg-color-*`
+ [Inserting Rules](./inserting-rules.md): Inject CSS declarations and custom class detection functions.
+ [Polyclass and CSS Anatomy](./anatomy.md): Understand a CSS Property
+ [Addons](./addons.md): Read more on the addon platform for customising Polyclass internals


## Usage

### Install

Include Polyclass as a script:

```jinja
<script src="polyclass.js"></script>
```

### Load

#### HTML `polyclass` attribute

Use the Polyclass automatic detection:

```jinja
<body polyclass>
  <h1 class='color-#999'>Grey Title!</h1>
</body>
```

#### JavaScipt `Polyclass` Instance

Run `Polyclass` somewhere in your code. It can run in the `<head>`, the `<footer>`, or installed asynchronously.

```js
const pc = Polyclass({
  processOnLoad: document.body
})
```

If the page is already loaded, run the `process()` method:

```js
const pc = Polyclass()
pc.process(document.body)
```

#### Use

And you're ready to go! Populate the html classes to see it in action:

```jinja
<div id="demo_space"
    class='foo
           padding-1em-2em
           margin-1em
           color-#333'>  <!-- That's it. Polyclass classes are ready-to-use. -->

    <p>Styled content from <strong>only</strong> CSS classes.</p>
</div>
```

#### What's Created

The styles are automatically generated:

| class | description |
| --- | --- |
| `padding-1em-2em` | Padding, top and bottom `1em`, left and right `2em` |
| `margin-1em` | Margin, all sides `1em` |
| `color-#333`| Text color, nearly black `#333` |


Here's the CSS Polyclass created:

```css
.padding-1em-2em {
    padding: 1em 2em;
}

.margin-1em {
    margin: 1em;
}

.color-#333 {
    color: #333;
}
```

## Who is this for?

### Designers

Iterate on your styles until you're happy. With a **massive** base of rules there is less to _build_ as you invent.

### Developers

Don't spend time caring for your _base styles_. Use a declarative naming convension for your class names for easy to document, easy to integrate core styles, and less bytes to download.

### Vendors

Build your layout engine or style library. Enable the _vendor_ prefix and invent your own dynamic classes.


## Why?

+ **Reduce Boilerplate**
  Ideas change. Designs alter. Polyclass can help kill the junk CSS and massive boiler-sheets of _pre defined classes_.
+ **Become your own vendor!**
  Don't settle for a _forever_ locked-in eco-system, supporting enourmous stylesheets. Build out your own boilerplate, add a vendor switch and job done!
+ **Generate _Dynamic Classes_**
  Build dyanamic names to write base and generate layouts without limits, such as a column-stucture: `acme-grid-columms-4`,  `acme-grid-columms-3`, `acme-grid-columms-12`
+ **Faster page load times**
  CSS mean bytes down the pipe. Polyclass builds CSS on the fly.
+ **Dynamic CSS tooling**
  With _ALL CSS_ Properties ready to go, you can offer this tool in your buildouts; for dynamic styling of your components - without base sheets and limits.
  + CMS theming addons
  + HTML edit only environments
  + extend to make your own dynamic sheet inclusions.

## Example

If there is a CSS Property, it can be defined in Polyclass. Here's some HTML, with some `Polyclass` CSS `class` attributes:

```jinja
<div class="my-container some-other-primary-area
    font-pack-roboto-100-400-i400
    background-#333">

      <div class="demo-box
        gap-1em
        display-flex
        flex-direction-column
        ">

          <div class="text
            background-color-#111
            border-solid-3px-green
            border-radius-.4em
            padding-.8em-1.4em
            color-#EEE
            font-roboto-400
            margin-1em">

              Text content.

          </div>
      </div>
</div>
```

Once defined, the constructed classes are invented on-the-fly:

| class | property | values |
| --- | --- | --- |
| background-color-#111 |  background-color |  #111 |
| background-#333 |  background |  #333 |
| border-solid-3px-green |  border |  3px green |
| border-radius-.4em |  border |  0.4em |
| color-#EEE |  color |  #EEE |
| display-flex |  display |  flex |
| flex-direction-column |  flex |  column |
| gap-1em |  gap |  gap-1em |
| margin-1em |  margin |  1em |
| padding-.8em-1.4em |  padding | 0.8em 1.4em |
| font-pack-roboto-100-400-i400 | *\*Special case* |  Install font "Roboto", 100, 400, italic 400 |
| font-roboto-400 |  font-family, font-size |  "Roboto", 400 |

As expected each class exactly represents the `key:value` of any _declarable_ CSS Property.

---

Without using any existing CSS sheets, Polyclass will generate all the expected CSS as a constructed stylesheet.


## License

This project is licensed under the terms of the MIT License.

The MIT License offers you the freedom to use, modify, and distribute this code. While it’s not a formal requirement, taking a moment to acknowledge the original contributors reflects a deep-seated respect that is fundamental to the open-source community.


## Contributing

We sincerely welcome contributions! There is no barrier for entry and all input is valid input. If you find a bug or have a feature request, please open an issue. If you'd like to contribute code, please fork the repository and submit a pull request.

---

Open-source is as much about collaboration and mutual respect as it is about code. As a project committed to this ethos, we promise to always recognize and credit contributions with gratitude and respect.

We value the thoughtfulness and care put into each contribution, not to reduce them to mere numbers or to brush them off with a cavalier _"...that’s what open source is..."_. A project thrives on its community’s spirit and collective efforts.

