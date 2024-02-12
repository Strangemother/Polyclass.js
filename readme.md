<div align="center">

# Polyclass.js


![Polyclass Logo](./docs/logo/1-300.png)

A procedural just-in-time declarative stylesheet for instant well-behaved CSS styling.

![NPM Version](https://img.shields.io/npm/v/polyclass?registry_uri=https%3A%2F%2Fregistry.npmjs.com&style=flat&logo=npm)

---

</div>

```jinja
<body polyclass> <!-- Activate -->
  <div class="margin-1em-20vw
              background-color-#111
              padding-2em">  <!-- Write classes -->
      <h1 class='color-#EEE'>
          Instant CSS margin, padding, background and text color - with zero effort.
      </h1>
  </div>
</body>
```

## Table of Contents

+ [Quick Install](#usage)
+ [Example](#example)
+ Extras:
  + [Fonts](./docs/font-pack.md) Install and use fonts dynamically
  + [Vendor Prefix](./docs/vendor-prefix.md) Scope Polyclass usage to a prefix
  + [Aliases](./docs/aliases.md) Reduce typing by aliasing long word
  + [Events](./docs/events.md) Apply JavaScript event listeners using class-names
  + [Inserting Rules](./docs/inserting-rules.md) Inject CSS declarations and custom detection functions.
  + Variables
    + [CSS `var()`](./docs/css-var.md) Utilise variables for declarative properties and values
    + [Polyclass `vars()` object](./docs/vars-object.md) Use JavaScript objects as CSS vars
+ Deeper
  + [Running Instances](./docs/running-polyclass.md)
  + [Polyclass and CSS Anatomy](./docs/anatomy.md) Understand a CSS Property
  + [Addons](./docs/addons.md) Read more on the addon platform for customising Polyclass internals
+ Knowledge
  + [What is JIT](#what-is-just-in-time)
  + [What is Declarative](#what-is-declarative-css)
  + [5 Quadrillion?](./docs/class-count.md)

## Your Instant, Pluggable, Dynamic CSS Base Library

Polyclass is a _just-in-time_ CSS class library, built dynamically from your class-names using "Declarative CSS".

+ Eliminate in-line styles
+ Declare CSS on-the-fly
+ Work with any CSS measurement size and type
+ Build custom event handled class-names

```jinja
<div class='display-flex
            max-width-80vw
            font-size-1.222ch
            padding-0-10vw'>
</div>
```


## Lightweight, Quick, Vast.

It's open-source, lightweight and runtime pluggable. With only HTML class names, immediately generate CSS Declarations in a dynamic CSS stylesheet

```jinja
<header
    class='display-flex
           position-sticky
           top-1em'>
    Flexy Sticky Header!
</header>
```

+ **No opinion!** factory, forced, or predefined CSS not included!
+ Supports **any** CSS length you need, from `px` to `cqmax`
+ **All** CSS Properties are ready, even: `order-block-start-style-dotted`!
+ **Less than 15 Kilobytes** (minified) including all addons.
+ over 5 quadrillion available properties *\*([and counting](./docs/class-count.md))* 😅

Whether you're working with pre-rendered content or making live DOM changes, Polyclass ensures the stylesheet is declared as needed.

+ Instantly plug-and-play
+ No Dependencies: works along-side all the major libraries.
+ Real-time: Seamless compatibility with both pre-rendered content and live DOM changes.


## 🚀 In a Hurry?

Include from jsdelivr:

```jinja
<script src="https://cdn.jsdelivr.net/npm/polyclass@latest/dist/polyclass.full.js"></script>
```

**All Done. Let's use it.**

Apply `polyclass` to your target, such as the `body`:

```jinja
<body polyclass> <!-- Activate -->
  <h1 css='color-rebeccapurple'> <!-- Write classes -->
    Purple Title!
  </h1>
</body>
```

**Polyclass anything!**


## Usage

Polyclass is designed to be quick to initiate.


### Install

Include Polyclass from local source:

```jinja
<script src="dist/polyclass.full.js"></script>
```

[Grab from jsdelivr](https://www.jsdelivr.com/package/npm/polyclass) and apply it directly to your HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/polyclass@0.0.23/dist/polyclass.full.min.js"></script>
```

[Grab from NPM](https://www.npmjs.com/package/polyclass) and do node things:

```bash
npm install polyclass
```

### Load

To load Polyclass use the automatic attribute `polyclass`, or create a new JavaScript instance `Polyclass()`. Multiple instances of Polyclass can exist in one view


#### HTML `polyclass` attribute

Use the Polyclass automatic detection:

```jinja
<body polyclass>
  <h1 class='color-#999'>Grey Title!</h1>
</body>
```

Read more in [Running Polyclass: Auto](./docs/running-polyclass.md#auto-polyclass)


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
pc.process(document.body) // detect after load
```

Read more in [Running Polyclass: Instance](./docs/running-polyclass.md#polyclass-instance)


#### Using Classes

Once installed, populate the html classes to see it in action:

```jinja
<!-- previously imported polyclass -->
<div id="demo_space"
    class='foo
           padding-1em-2em
           margin-1em
           color-#333'>  <!-- That's it. Polyclass classes are ready-to-use. -->

    <p>Styled content from <strong>only</strong> CSS classes.</p>
</div>
```

Useful Functionality:

+ [Fonts](./docs/font-pack.md) Install and use fonts dynamically
+ [Vendor Prefix](./docs/vendor-prefix.md) Scope Polyclass usage to a prefix
+ [Aliases](./docs/aliases.md) Reduce typing by aliasing long word
+ [Events](./docs/events.md) Apply JavaScript event listeners using class-names
+ [Inserting Rules](./docs/inserting-rules.md) Inject CSS declarations and custom detection functions.
+ [CSS `var()`](./docs/css-var.md) Utilise `--vars` for declarative properties and values
+ [Polyclass `vars()` object](./docs/vars-object.md) Use JavaScript objects as CSS vars


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

.color-\#333 {
    color: #333;
}
```


## Who is this for?

### Designers

Iterate on your styles until you're happy. With a **massive** base of rules there is less to _build_ as you invent.

### Developers

Don't spend time caring for your _base styles_. Use a declarative naming convention for your class names for easy to document, easy to integrate core styles, and less bytes to download.

### Vendors

Build your layout engine or style library. Enable the _vendor_ prefix and invent your own dynamic classes.

## Why?

+ **Reduce Boilerplate**
  Ideas change. Designs alter. Polyclass can help kill the junk CSS and massive boiler-sheets of _pre defined classes_.
+ **Become your own vendor!**
  Don't settle for a _forever_ locked-in eco-system, supporting enormous stylesheets. Build out your own boilerplate, add a vendor switch and job done!
+ **Generate _Dynamic Classes_**
  Build dynamic names to write base and generate layouts without limits, such as a column-structure: `acme-grid-columms-4`,  `acme-grid-columms-3`, `acme-grid-columms-12`
+ **Faster page load times**
  CSS mean bytes down the pipe. Polyclass builds CSS on the fly.
+ **Dynamic CSS tooling**
  With _ALL CSS_ Properties ready to go, you can offer this tool in your buildouts; for dynamic styling of your components - without base sheets and limits.
  + CMS theming addons
  + HTML edit only environments
  + extend to make your own dynamic sheet inclusions.


### What is "Just-in-Time"?

> Polyclass does not have a pre-compiled list of CSS Classes. Definitions are generated through a process of detected _used_ classes, and immediately creating a corresponding CSS declaration.

Just-In-Time (JIT) compilation in Polyclass dynamically generates CSS classes as they're needed, optimizing efficiency by focusing only on the styles actively used in the document. This process ensures lean performance-oriented styling, eliminating pre-compiled CSS clutter and enhancing web application responsiveness.

```jinja
<div class='margin-5em-20vw'>
    <p>This div immediately generates the class</p>
</div>

<div class='margin-5em-20vw'>
    <p>This div reuses the previously generated class</p>
</div>
```

### What is "Declarative" CSS?


In its simplified form the term "declarative" means _what to do_, where the antonym "imperative" would be _how to do_:

| Declarative | Imperative |
| --- | --- |
| What to do | How to do |
| Expression | Statement |
| Less Variable Mutation | More Variable Mutation |

HTML is declarative, allowing the developer to perceive an object as the literal entity. For example we have a layout including a single header `h1`. The identity of the object is _"what is does"_. A `h1` will never be a `input`.

```jinja
<body>
  <div>
    <h1>This is a H1</h1>
  </div>
</body>
```

#### Declarative CSS with Polyclass

By naming a class to mirror CSS properties and their values, such as `border-color-red`, users explicitly define _what to do_ without delving into how to achieve it. This approach removes the verbosity and complexity traditionally associated with CSS, streamlining style application and changes.

| Declarative Class Name | CSS Output             |
|------------------------|------------------------|
| `margin-1em`           | `margin: 1em;`         |
| `border-color-red`     | `border-color: red;`   |
| `text-align-center`    | `text-align: center;`  |


Declarative CSS with Polyclass means direct, readable, and maintainable code, where style modifications are as simple as swapping class names, ensuring a seamless and intuitive design experience.


#### Developer Speed

A declarative method for CSS styles ensure:

+ Developers **know** how a class affects the view
  As the **class-name _is_ the declaration**, is extremely unlikely to find `color-red` representing another colour.
+ Immediate Learning
  Existing developer knowledge is an advantage, with a base library using **real hex, `hsl` or even `Q` measurements** for values.
+ Instant Integration
  Using a clean naming convention allows the developer to instantly update the view to reflect changes with no cleanup of old classes is required.

Polyclass's JIT approach exemplifies how on-demand generation of styles can streamline development workflows, offering a flexible, efficient solution for real-time CSS management.


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

