# Definition Merge

Merge multiple definitions into one using classes. This is useful when producing a single css declaration for multiple value types and templates of merging definitions

    margin-top-1em padding-bottom-2em font-size-1.2em

    {
        margin-top: 1em;
        padding-bottom: 2em;
        font-size: 1.2em;
    }

Applying this with a custom selector can reduce the amount of config for one object:


    v = cg.dcss.addMergeRule('.my-custom-padded', [
        "margin-top-1em",
        "padding-bottom-2em",
        "font-size-1.2em",
    ]);

    .my-custom-padded {
        ...
    }

Similar to the existing:


    v = cg.dcss.addStylesheetRules([
        ['body',
            ['background', '#333']
            , ['color', '#991111']
        ]
    ]);
