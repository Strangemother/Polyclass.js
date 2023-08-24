# [NAME]

[NAME] is a psuedo pre-built CSS Class library, built dynamically from structured class names

> All the boilerplate is builtin with [NAME]

This open-source, lightweight library is tailored for dynamic CSS management, generating a graph of keys for all CSS properties. With the capability to represent over a million unique class combinations, [NAME] offers eliminating the need for inline styles. Whether you're working with pre-rendered content or making live DOM changes, [NAME] ensures your designs remain fluid and dynamic.

+ Readable
+ Instantly plug-and-play
+ No Dependencies, and works along-side all the major libraries.

## Example

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

Constructed classes:

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


Without using any existing CSS sheets, [NAME] will generate all the expected CSS as a contructed stylesheet.


## Features

+ Comprehensive Graph: A detailed graph of CSS attributes, ensuring you have access to every possible style combination.
+ Dynamic Class Combinations: Generate over a million unique class combinations with both short and long flavors for each CSS declaration.
+ Real-time: Seamless compatibility with both pre-rendered content and live DOM changes.


## Getting Started

To get started with [NAME], follow these steps (It's really just include the JS and start using...)


1. Include the Main Script:

  Add the dcss-main.js script to your HTML file.

      <script src="path_to_your_directory/dcss-main.js"></script>

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


## Contributing

We welcome contributions! If you find a bug or have a feature request, please open an issue. If you'd like to contribute code, please fork the repository and submit a pull request.

## License

This project is licensed under the terms of the MIT License.

