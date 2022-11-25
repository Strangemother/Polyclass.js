var main = function(){

    var l = new LinesContext(undefined, '#container')

    window.lines = l
    l.start()



}


var newPath = function(svg, name){
    var $path = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace
    $path.id = name
    $path.setAttribute("d","M 0 0 L 10 10"); //Set path's data
    $path.style.stroke = "#000"; //Set stroke colour
    $path.style.strokeWidth = "5px"; //Set stroke width
    svg[0].appendChild($path);
    return $(`#${name}`)
}


var rand = function(){
    return Math.random().toString(32).slice(2)
}


var newSVG = function(id, parent) {
    let home = parent || 'body'
    //let $svg = $("<svg/>", )
    let $svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    $svg.id = id? id: rand()
    $svg.setAttribute('height', 0)
    $svg.setAttribute('width', 0)
    $($svg).appendTo(home)
    return $svg;
}


class SVGContext {

    constructor(svgName, containerSelector){
        console.log('New unit on', svgName, containerSelector)
        this.svgSelector = `#${svgName}`
        this.svgName = svgName
        this.containerSelector = containerSelector

    }

    start(){

        console.log('start unit')
        this.$container = document.querySelector(this.containerSelector)

        let svg = document.querySelector(this.svgSelector)
        this.$svg = svg

        if(svg == null){
            this.$svg = this.createContext()
        }

        this.applyWindowHandlers()
    }

    createContext(){
        /* Generate a new SVG using the internal names and append
        the new svg to the given container.
        If the svg exists, it's reused else a new one is created. */
        console.log('Creating new SVG', this.svgName)
        let svg = newSVG(this.svgName, this.containerSelector)
        this.$container.appendChild(svg) // $("<svg/>", {id: this.svgName})
        return svg
    }

    resetSVGsize(){
        /* Reset the svg size to 0 0*/
        this.$svg.attr("height", "0");
        this.$svg.attr("width", "0");
    }


    applyWindowHandlers(){
        /* Apply ready and resize handlers to the window and document
        to call render() upon an event. */
        console.log('Applying window handlers')
        // $(document).ready(this.render.bind(this))
        // $(window).resize(this.render.bind(this))
    }

    render(){
        //console.log('render pipes')
        this.resetSVGsize();
    }
}



var newPath = function(svg, name){
    var $path = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace
    $path.id = name
    $path.setAttribute("d","M 0 0 L 10 10"); //Set path's data
    $path.style.stroke = "#000"; //Set stroke colour
    $path.style.strokeWidth = "5px"; //Set stroke width
    svg[0].appendChild($path);
    return document.querySelector(name)
}

var rand = function(){
    return Math.random().toString(32).slice(2)
}

var newSVG = function(id, parent) {
    let home = parent || 'body'
    //let $svg = $("<svg/>", )
    let $svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    $svg.id = id? id: rand()
    $svg.setAttribute('height', 0)
    $svg.setAttribute('width', 0)
    document.querySelector(home).appendChild($svg)

    return $svg;
}

class LinesContext extends SVGContext {
    /*
    The line context acts as a simple manager for many lines on an SVG.
    It's not fundamental to the usage of the dynamic paths but helps with
    _pressing render_ on all lines.

    Provde a svg name - used as an ID and a container selector. If the svgname
    does not exist as an svg# a new onr is created.
    If the containerSelector is undefined, the newly generated svg is appended to
    the body.

    If the svg of name ID exists, it's used rather than creating, but it's still
    moved into the container (if given)

        containerSelector = '#my_container'
        svgName = 'svg1' // note - Not a jquery selector;
        context = new LinesContext(svgName, containerSelector)
        context.start()

        context.addLine({
            name: 'bob'
        })

        context.render()
     */
    constructor() {
        super(...arguments)
        this.lines = []
    }

    render(){
        super.render()
        this.renderLines(this.containerSelector, this.svgSelector)
    }

    renderLines(){
        //connectAll(this.containerSelector, this.svgSelector)
        this.adaptDrawLayer()
        for(let line of this.lines) {
            /* A line representsa tidy or class instance version of the
            user config. */
            line.render()
        }
    }

    adaptDrawLayer() {
        // check if the svg is big enough to draw the path, if not, set heigh/width
        //conf = svg, coord, padding
        //

        let lines = this.lines;
        let line = lines[0]
        if ($(this.svg).height()< $(window).height()) {
            //this.svg.attr("height", $(window).height() - 10)
        }

        let maxHeight = 0, maxWidth = 0, minTop=10000;
        for(let line of lines) {
            let coord = line.getCoord()
            if(maxHeight < coord.ay) {
                maxHeight = coord.ay
            }

            if(minTop > coord.bx) {
                minTop = coord.bx
            }

            if(minTop > coord.ax) {
                minTop = coord.ax
            }

            if(maxHeight < coord.by) {
                maxHeight = coord.by
            }

            if(maxWidth < coord.ax) {
                maxWidth = coord.ax
            }

            if(maxWidth < coord.bx) {
                maxWidth = coord.bx
            }

        }
        //this.svg.attr("width", $(window).width() - 10)
        let padding = 10//line.style.padding;
        //let height = Number(line.$svg.attr("height"))
        //let width = Number(line.$svg.attr("width"))
        //let coord = line.getCoord()

        //console.log(coord)
        //console.log(height , conf.coord.by + conf.padding )

        /*
        If the SVG is static; it should be absolute and x:y < the
        path x:y.
        The maxHeight ensure the largest X value (element cloest to the bottom)
        doesn't account for the -offset of the SVG position. Therefore
        adding the different of the most bottom (y) indexed element,
        */
        this.$svg.attr("height", maxHeight + padding + minTop);
        this.$svg.attr("width", maxWidth + padding);


    }
    addLine(config) {
        /*
            {
                name: 'name'
                start: Node
                end: Node
            }
         */
        console.log('Generating new path', config.name)
        // let $path = newPath(this.$svg, config.name)
        // let line = {
        //     $path,
        // }

        // Object.assign(line, config)
        let line = new Line(this.$svg, config)
        this.lines.push(line)
        return line
    }

}


;main();
