# Pipes 5

Version 5 provides the same interface - with three core (more simple)
components

## pipes

A reset on the same idea for pipes. The fundamental principle is _just lines_,
where a line connects two ends. The library focuses on this simple procedure

highlights:

A Pipe is a to anchor locations, with 'inner nodes' such as hidden connectors and corners.

+ markers
    + static
    + motion
        + timed
        + event
+ grouping
+ anchours
+ z-index
+ styles
+ line length (math addition of all lengths)
+ square / round edges
    + round edge config
+ hidden nodes

## layout

A demoing layout tool, to show simple boxes in flexy positions. This is ideal
for showing small step images, and abstract box designs (such as an example div layout)

The key is using generally css alone.

## css timer

To perform 'animations' by css stepping. Marking notes to _activate_ on a css or
attribute flip.

In essence this is simple timer machine with handy functions to add/remove css
classes from target nodes.

Functions such as `onClass(node, "foo").removeAll('step-1').after(2000).addAll('step-2')`