/*
Convert discovered nodes and bind them to a selector. The assigned classes
are the declarations assigned to the css class.

The discovery may descend children, allowing for depth setup.

    <dcss-setup
        selector='.card'
        class='background-color-#111
            border-solid-3px-green
            border-radius-.4em
            padding-.8em-1.4em
            color-#EEE
            margin-1em'>

            <dcss-setup
                selector='.single-page'
                sub-selector='.page'
                class='color-#EECCDD
                padding-1em
                border-solid-3px-#00cc00'
                >
            </dcss-setup>

        </dcss-setup>


Notably this may be easier as real CSS.
 */