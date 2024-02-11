# Font Packs

Fully install Google fonts with one CSS class. Use a font-family on a target

```jinja
<div polyclass>
    <div class='background-#333 color-#DDD font-size-1.2em'>
        <div
            class="font-pack-roboto-100-300-400
                   font-roboto-400"> <!-- Create fonts, use font (400) -->
            Roboto Font!
        </div>
    </div>
</div>
```

## Install

To _install_ the font, first head to google-fonts and pick your favourite. For now we'll install two fonts `roboto` and `roboto-mono`.

```jinja
<!-- Installs two fonts, and their respective sizes -->
<div class='font-pack-roboto-400-roboto+mono-300'></div>
```

This class name will install the roboto font for size 400 and the roboto-mono font at size 300.

### Steps

1. Head to Google Fonts
2. Pick your font. Polyclass needs the `Request+Name` of the font
3. Use this `Request+Name` as the font name

the `Request+Name` is the title of the font within the font request. The _friendly_ name typically matches the request name, but not always:

| Friendly Name | Request Name |
| --- | --- |
| Roboto | Roboto |
| Roboto Sans | Roboto+Sans |
| Noto Sans Japanese | Noto+Sans+JP |
| Noto Sans HK | Noto+Sans+HK |
| Noto Sans Traditional Chinese | Noto+Sans+TC |
| IBM Plex Sans Arabic | IBM+Plex+Sans+Arabic |


## Usage

We can apply the chosen font to anything

```jinja
<div class="font-roboto-400
            background-#333
            color-#DDD">    <!-- use roboto 400 -->
    Roboto Font
</div>

<div class="font-roboto-mono-300
            background-#333
            color-#DDD">    <!-- use roboto mono 300 -->
    Roboto Mono Font
</div>
```

What does it do:

1. Install the font string as typical google font includes
2. Write a receiver for the `font-*` polyclass.


## Synax

1. `font-pack-*` installs a font
2. `font-*` uses an installed font

```
font-pack
    [font-name]
        [integer]
        i [integer]
```


```
font-
    [font-name]
        [integer] | i [integer]
```


+ the `font-name` is any google font name in a lowercase, kebab-string.
+ The `integer` is any acceptable font-size, such as `100` or `400`.
+ An `i` integer is denotes _italic_, such as `i100`, `i400`

All plugged together with dashes.

```jinja
font-pack-alice-400     <!-- collect -->
font-alice-400          <!-- use -->
```

### Multi Word Names

Install a multi word name using a plus (`+`) between string parts: `rubik+glitch+pop`:

Collect:
```jinja
font-pack-rubik+glitch+pop-400
```

Use:
```jinja
font-rubik+glitch+pop-400
```

### Multi Font Pack

Request many fonts within one request:

```jinja
font-pack-protest+strike-400-redacted+script-300-400-alata-400
```

|  Font Name | Sizes |
| --- | --- |
| Protest Strike | `400` |
| Redacted Script | `300`, `400` |
| Alata | `400` |


Each font can be accessed with their individual names:

```jinja
<div class="font-protest+strike"></div>
<div class="font-protest+strike-400"></div>

<div class="font-reducated-script"></div>
<div class="font-reducated-script-300"></div>
<div class="font-reducated-script-400"></div>

<div class="font-alata"></div>
<div class="font-alata-400"></div>
```


### Fonts With Acronyms

Install a font with short acronyms (They may need to be upper-case; `IBM`, not `ibm`):

```jinja
font-pack-IBM+plex+sans+arabic-200-400-700
font-pack-M+PLUS+Rounded+1c-100-300-400
```

Using the font name within the class is **always lowercase** for access:

```jinja
<div class="font-ibm+plex+sans+arabic-400
            text-align-right">
    <p>لكل شخص الحق  ...</p>
</div>
<div class="font-m+plus+rounded+1c">
    M PLUS Rounded 1c
</div>
```


### Italic Font Variant

We can install both italic and standard set fonts using an `i` prefix before a number:

    font-pack-roboto-i400+400

This can be for as many variants as required

    font-pack-roboto-100-400-900-i300-i400-i700-i900

And include multiple font names:

    font-pack-roboto-100-400-900-i300-i400-i700-i900-roboto+mono-300-i300-400-i400-i700

You can choose any font at any time using the `font-*` polyclass:

```jinja
<div class="font-roboto-100"></div>
<div class="font-roboto-400"></div>
<div class="font-roboto-900"></div>
<div class="font-roboto-mono-400"></div>

<div class="font-roboto-mono-i400"></div>
```
