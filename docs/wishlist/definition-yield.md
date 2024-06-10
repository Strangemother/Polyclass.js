# Definition Yield

In some cases we may yield the incorrect node:

    cg.addTree(['tom','d','harry'], function(splitObj){
        console.log('harries remix', arguments)
    })

    cg.addTree(['tom','d'], function(splitObj){
        console.log('tom-d remix', arguments)
    })


    tom-d-harry-1em     works
    tom-d-harry-foo     works
    tom-d-harry         yields harries with no args
    tom-d-1em           works.

In this case it would be better for key `tom-d-harry` to fail, and `tom-d` to receive `harry`

    tom-d-harry[-1em]   works A
    tom-d-harry[]       fail-over
    tom-d[-harry]       works B
