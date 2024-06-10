# RuleProxy

A proxy object to edit a single rule in the view. This can change aspects
of a key, value as a class. This change will bubble to dcss

    rule = pc.addRule('.foo.bar', {color: 'red', margin: '4em 1em 2em 3em'})

    rule[margin][0].setValue('5em')
