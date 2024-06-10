# polyclass active switch

Enable polyclass in the view without JS, using an auto-switch in the
body or HTML. Additional config may be applied through  data-attributes.

```html
<html>
    <head>
        <script type="text/javascript" src='polyclass.js'></script>
    </head>

    <body polyclass class='background-#111 color-invert-background'>
    </body>
</html>
```

Alterntive configs:

```html
<body polyclass="pc" pc-vendorlocked=false />
<body polyclass
    data-polyclass-alias-color="c"
    data-polyclass-alias-background="bg,back" />
```
