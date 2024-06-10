# don't split

Some values should not be split, but by default the
value matches a splittable and the result is invalid:

    CSS:
        display: inline flow-root;

    Poly:
        "display-inline-flow-root"

    result:
        {
            display: inline flow-root
        }

To correct this, we apply a micro "dont" graph of chosen keys. If a value is in the graph, it's not split:

    Keep:

        display > flow > root

    Poly:
        "display-inline-flow-root"

    Result:

        {
            display: inline flow-root
        }


