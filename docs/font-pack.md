# Font Packs

Fully install Google fonts with one CSS class. Use a font-family on a target

```html
<div polyclass>
    <div class='background-#333 color-#DDD font-size-1.2em'>
        <div
            class="font-pack-roboto-100-300-400
                   font-roboto-400">
            Roboto Font!
        </div>
    </div>
</div>
```

## Install

To _install_ the font, first head to google-fonts and pick your favourite. For now we'll install two fonts `roboto` and `roboto-mono`.

    <div class='font-pack-roboto-400-roboto+mono-300'></div>

This class name will install the roboto font for size 400 and the roboto-mono font at size 300.

## Usage

We can apply the chosen font to anything

    <div class="font-roboto-400 background-#333 color-#DDD">
        Roboto Font
    </div>
    <div class="font-roboto-mono-400 background-#333 color-#DDD">
        Roboto Mono Font
    </div>

### What does it do

1. Install the font string as typical google font includes
2. Write a receiver for the `font-*` polyclass.

## Synax

    font-pack
            [font-name]
                    [integer]
                    i [integer]


+ the `font-name` is any google font name in a lowercase, kebab-string.
+ The `integer` is any acceptable font-size, such as `100` or `400`.
+ An `i` integer is denotes _italic_, such as `i100`, `i400`

All plugged together with dashes.

    font-pack-alice-400

## Extended usage

We can install both italic and standard set fonts using an `i` prefix before a number:

    font-pack-roboto-i400+400

This can be for as many variants as required

    font-pack-roboto-100-400-900-i300-i400-i700-i900

And include multiple font names:

    font-pack-roboto-100-400-900-i300-i400-i700-i900-roboto+mono-300-i300-400-i400-i700

You can choose any font at any time using the `font-*` polyclass:

    <div class="font-roboto-100"></div>
    <div class="font-roboto-400"></div>
    <div class="font-roboto-900"></div>
    <div class="font-roboto-mono-400"></div>
    <div class="font-roboto-mono-i400"></div>