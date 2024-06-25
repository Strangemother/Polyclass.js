# Icon injection

Automatically integrate Google icons, and inject them within the view:

Inset:

```jinja
<div class="outlined-icon-thumb-up"></div>
```

Result:

```jinja
<div class="material-symbols-outlined">thumb-up</div>
```

## Install

Include the `google-icon-injector.js` addon. If you're using the _full_ version of Polyclass, the functionality is already installed.


## Usage

Once the addon is installed the injector is prepared with two pack installer activation classes:

```jinja
<body polyclass>
    <div class="icon-pack-outlined
                icon-pack-sharp">
    </div>
</body>
```

This is backward compatible with the existing material icons:
```jinja
<div class="background-#333 color-#DDD">

    <!-- default material icon method: works -->
    <div class="material-symbols-outlined">sunny</div>

    <!-- polylcass examples -->
    <div class="outlined-icon-thumb-up"></div>
    <div class="sharp-icon-thumb-up"></div>

    <div class="outlined-icon-check-box"></div>
    <div class="sharp-icon-check-box"></div>
</div>
```