# _though_ key function

Apply a function to capture the usage of a key using transition through a node:

    cg.addThrough(['margin'], function(splitObj){
        console.log('margin-* was called.', arguments)
    })

    <div class='margin-10em'></div>
    <div class='margin-top-10em'></div>

    // margin-* was called
    // margin-* was called

## through key prefix populate

apply _through_ key capture to apply pre selector components to the css declaration

    cg.addThrough(['dark'], function(splitObj){
        return splitObj.prefixAppend('.dark ')
    })

    <div class='dark-margin-top-10em'></div>

    .dark .margin-top-10em,
    .dark dark-margin-top-10em {
        margin-top: 10em;
    }

This only activates if a parent has the class of dark

    <div class='margin-top-10em'>
        <div class='dark-margin-top-10em'></div>
    </div>

An issue may arise with the prefix within the class-name, as during the dark-phase the class-name must loose its prefix; pretty ugly.
