## Better string detection

The string parser is naive and will likely falter on minor edge-cases.
Rewrite this to a 'mini-graph' of sorts; allowing better forward key detection when parsing a string.

This rewrite should allow better parsing of translatable values when parsing values within a reciever.