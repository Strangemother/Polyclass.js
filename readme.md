# Polyclass.js

Polyclass is a _just in time_ pre-built CSS Class library, built dynamically from a graph of structured CSS property names to produce a "Declarive CSS Stylsheet".

> All the boilerplate css is builtin with Polyclass.js

This open-source, lightweight library is tailored for dynamic CSS management, generating a graph of keys for all CSS properties. With the capability to boilerplate millions of unique class combinations through decarative naming, Polyclass offers eliminating the need for inline styles. Whether you're working with pre-rendered content or making live DOM changes, Polyclass ensures the stylesheet is delcared as needed.

+ Readable
+ Instantly plug-and-play
+ No Dependencies, and works along-side all the major libraries.


## Why?

+ Reduce Boilerplate
  When designing a website, ideas change and designs alter. This can lead to junk CSS, or massive boiler-sheets of _pre defined classes_.

  Polyclass reduces this, allowing you to bypass defining all your basic stles, and opt for a delarative CSS naming convention

+ Faster page load times
  CSS mean bytes down the pipe. Polyclass builds CSS on the fly.

+ Dynamic CSS tooling

  With _ALL CSS_ Properties ready to go, you can offer this tool in your buildouts; for dynamic styling of your components - without base sheets and limits.

  + CMS theming addons
  + HTML edit only environments
  + extend to make your own dynamic sheet inclusions.

## Example

If there is a CSS Property, it can be defined in Polyclass.


Here's some HTML, with some `Polyclass` CSS `class` attributes:

```html
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

Once defined, the constructed classes are invented:

    background-color-#111
    background-#333
    border-solid-3px-green
    border-radius-.4em
    color-#EEE
    display-flex
    flex-direction-column
    gap-1em
    margin-1em
    padding-.8em-1.4em

    font-pack-roboto-100-400-i400
    font-roboto-400

As expected each class exactly represents the `key:value` of any _declarable_ CSS Property.


Without using any existing CSS sheets, Polyclass will generate all the expected CSS as a contructed stylesheet.


## Features

+ Comprehensive Graph: A detailed graph of CSS attributes, ensuring you have access to every possible style combination.
+ Dynamic Class Combinations: Generate over a million unique class combinations with both short and long flavors for each CSS declaration.
+ Real-time: Seamless compatibility with both pre-rendered content and live DOM changes.


## Getting Started

To get started with Polyclass, follow these steps:

TLDR;

1. Include the library
2. Write class names

---

1. Include the Main Script:

  Add the `polyclass.js` script to your HTML file.

      <script src="path_to_your_directory/polyclass.min.js"></script>

2. Include Add-ons (Optional):

  If you wish to use additional features, you can include the respective add-on scripts. For instance, to use the font-pack and monitor add-ons, include them as follows:

      <script src="path_to_your_directory/addons/font-pack.js"></script>
      <script src="path_to_your_directory/addons/monitor.js"></script>

3. Write Your Declarative CSS:

  In your HTML, you can now start using the declarative CSS syntax provided by the library. For example:

      <div class="my-label
                padding-1em
                margin-.4em-1em
                background-#333
                color-white"
            >Hello World!</div>


## Current Class Count

Current class count is still increasing; Not including the `font-pack` addon.

There are roughly 139 top level attributes (`margin`, `border` etc..)

+ Every sub attribute is a key (about 209 in total)
+ Every size type,
  + absolute (about 7; `cm`, `px`, `Q` etc..)
  + relative (about 20, `em`, `vw` `svh` etc)
+ Every color (16M hex short and long formats, all the websafe colours)


## Info

For more advanced usage, you can explore the various modules and functionalities provided by the library:

+ Font Pack Add-on: Enhance your typography with the `font-pack.js` add-on. This allows you to easily integrate various font styles and weights into your project.
+ Monitor Add-on: With the `monitor.js` add-on, you can keep track of changes and updates to your declarative CSS in real-time.
+ Class Graph: The `classgraph.js` module provides a way to visualize and understand the relationships between different CSS classes in your project.
+ Core DCSS: The core functionality of the library can be found in `dcss.js`. This is where the magic happens, allowing you to write declarative CSS with ease.


## Usage

Once Polyclass is installed, it's ready to go. By default no configuration is required.

As a recap to installing:

  <script src="path_to_your_directory/polyclass.min.js"></script>

Then write some CSS classes to style:

```html
<div class="margin-1rem">
This has a margin of 1 real EM.
</div>
```

The CSS class `margin-1rem` will instantly generate into the dynamic stylesheet:

```css
.margin-1em {
  margin: 1rem
}
```

This works with essentially any class attribute:

```html
<body class='background-#111'>
  <div class="border-top-solid-1px border-radius-.4em color-green">
    This has a border with round edges.
  </div>
</body>
```


## License

This project is licensed under the terms of the MIT License.

The MIT License offers you the freedom to use, modify, and distribute this code. While it’s not a formal requirement, taking a moment to acknowledge the original contributors reflects a deep-seated respect that is fundamental to the open-source community.

## Contributing

We sincerely welcome contributions! There is no barrier for entry and all input is valid input. If you find a bug or have a feature request, please open an issue. If you'd like to contribute code, please fork the repository and submit a pull request.

---

Open-source is as much about collaboration and mutual respect as it is about code. As a project committed to this ethos, we promise to always recognize and credit contributions with gratitude and respect.

We value the thoughtfulness and care put into each contribution, not to reduce them to mere numbers or to brush them off with a cavalier _"...that’s what open source is..."_. A project thrives on its community’s spirit and collective efforts.

