# [NAME]

Ever struggled with managing dynamic CSS attributes efficiently? [NAME] is here to help.

This open-source, lightweight library is tailored for dynamic CSS management, generating a graph of keys for all CSS properties. With the capability to represent over a million unique class combinations, [NAME] offers eliminating the need for inline styles. Whether you're working with pre-rendered content or making live DOM changes, [NAME] ensures your designs remain fluid and dynamic.


## Features

+ Comprehensive Graph: A detailed graph of CSS attributes, ensuring you have access to every possible style combination.
+ Dynamic Class Combinations: Generate over a million unique class combinations with both short and long flavors for each CSS declaration.
+ Real-time Adaptability: Seamless compatibility with both pre-rendered content and live DOM changes.


## Getting Started

To get started with classy-declarative-css.js, follow these steps:

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

> Probably wrong; it's GPT Generated for now.

+ CSS Properties: There are around 500 distinct CSS properties. However, many of these properties can be broken down into sub-properties. For instance, margin can be broken down into margin-top, margin-right, margin-bottom, and margin-left.
+ Measurement Types: Common measurement types in CSS include px, %, em, rem, vh, vw, vmin, vmax, cm, mm, in, pt, and pc. That's 13 different measurement types.
+ Colors: There are 16,777,216 possible RGB colors. However, in most practical scenarios, a subset of these colors is used. If we consider named colors, hex values, rgba, hsla, etc., we can conservatively estimate about 1,000 commonly used colors.
    + All web-safe colors
    + All hex values
+ Short vs. Long Flavor: Each property can be represented in its short form (like margin) or its long form (like margin-top, margin-right, etc.). This effectively doubles the number of properties.

Given this:

+ Total properties (considering short and long flavors): 500 x 2 = 1,000
+ Total combinations for each property: 1,000 (colors for color properties) + 13 (measurement types for others) = 1,013

So, the total number of possible classes would be: 1,000 properties x 1,013 combinations = 1,013,000

This is a rough estimate, and the actual number might be higher or lower based on specific constraints and the exact number of properties and values considered.


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

