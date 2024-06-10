# actions and events

Perform javascript event driven actions using classes:

    "onclick-add-foo onclick-toggle-bar"
    @click
    "onclick-add-foo foo bar"
    @click
    "onclick-add-foo foo"
    @click
    "onclick-add-foo foo bar"

The event handler should be removed automatically when the monitor is enabled.

    <p class"onclick-add-foo onclick-toggle-bar"></p>
    // add onclick to p[this].onclick-add-foo
    <p class"onclick-toggle-bar"></p>
    // remove onclick to p[this].onclick-add-foo

Other events may require multiple events

    "onhover-add-foo"
    // add mouseover
    // add mouseenter
    // add mouseleave
    // add mousefocus
    // add mousefocuswithin
