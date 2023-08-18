
class ClassGraph {

    generate(node){
        /*
            The graph generatoe produces a depth of allows
            css defintitions. Upon discovery a node may 'release' or continue.
            If the _next_ node is a tree node, continue - if it's a value node, release

         */
        node = node || document.body
        let items = Object.entries(node.style)
        for(let [name, value] of items) {
            this.addCamelString(name)
        }
    }

    addCamelString(name) {
        // convert to kebab-case, then push into the graph
        let kebab = kebabCase(name)
        // console.log(name, kebab)
        let keys = kebab.split('-')
        this.addTree(keys)
    }

    addTree(keys) {

        let graphNode = this.getRoot();
        let nodesWord = this.nodeWord()
        let position = []
        for(let key of keys) {
            position.push(key)
            if(!graphNode[nodesWord]) {
                // Make new nodes when required.
                graphNode[nodesWord] = {}
            }
            let newNode = graphNode[nodesWord][key]
            if(newNode == undefined) {
                // Create the new tree point.
                // console.log('Making new node', key)
                newNode = graphNode[nodesWord][key] = {
                    // nodes: {}
                    key
                    , position
                    // meta: { key }
                }
            }
            graphNode = newNode
        }
        graphNode.leaf = true
        return graphNode
    }

    nodeWord() {
        return 'n'
    }

    getRoot(){
        if(!this.graph) {
            this.graph = {
                [this.nodeWord()]: {}
                , meta: { key: 'root', isRoot: true }
                , key: 'root'
            }
        }
        return this.graph
    }

    /*
        When testing a key, we walk the grapg until a leaf.
        If the next step is a node, continue.
        If the leafs' next step is not a node, parse the values.
        reject leaf-only definitions.
     */
    objectSplit(str, sep='-', safe=true) {
        /* Parse a potential new css class. */
        // console.log('split on', str, sep)
        let keys = str.split(sep)
        // console.log('split', str, keys)
        let nodeWord = this.nodeWord()
        let node = this.getRoot()
        let currentNode;
        // c1 rather than c (count).
        // As all references require the count+1
        // - but "c" is usually a 0 index counter
        let c1 = 0;
        let l = keys.length
        for(let k of keys) {
            // loop until a leaf, where the _next_ key is not a value node.
            currentNode = node[nodeWord][k]
            c1 += 1
            let isLastNode = (l == c1)

            if(currentNode == undefined) {
                if(safe) {
                    break
                }
                continue
            }

            if(currentNode.leaf === true) {
                // if the next node is invalid, the next keys are values.
                let nextKey = keys[c1]
                let currentGraph = currentNode[nodeWord]
                if( (currentGraph && currentGraph[nextKey]) == undefined ) {
                    break
                }
            }

            node = currentNode

        }

        // grab the next keys
        let props = keys.slice(0, c1)
        let values = keys.slice(c1)
        return {
            props, values, str,
            node: currentNode,
            valid: currentNode && (values.length > 0) || false
        }
    }

    insertLine(selectorStatement, props) {
        let spl = this.objectSplit(selectorStatement)
        return this.insertRule(spl, props)
    }

    insertRule(splitObj, props=undefined) {
        let valueKey = splitObj.props.join('-')
        // let clean = this.escapeStr(splitObj.str)
        // let propStr = `.${clean}`
        let propStr = this.asSelectorString(splitObj)
        let valueVal = splitObj.values.join(' ')
        let d = {[valueKey]: valueVal}

        if(props) {
            Object.assign(d, props)
        }
        let exists = selectorExists(propStr)

        if(exists) {
            console.warn('Selector already exists', propStr)
            return getRuleBySelector(propStr)
        }
        // console.log('Inserting rule', propStr)
        let renderArray = addStylesheetRules({
            [propStr]: d
        });

        renderArray.renderAll()

        return renderArray
    }

    insertReceiver(keys, handler) {
        /*Insert a function into the graph, to accept the tokens
            insertRecevier('font-pack', handlerFunc(...tokens){
                console.log('Install', tokens)
            })

            > 'font-pack-roboto'
            'Install roboto'
        */

        let leaf = this.addTree(keys)
        leaf.handler = handler

        return leaf
    }

    asSelectorString(entity) {
        let clean;
        // array
        if(Array.isArray(entity)) {
            // prop bits
            let a = entity.join('-')
            clean = this.escapeStr(a)
        }

        // string,
        if(typeof(entity) == 'string') {
            // is str
            clean = this.escapeStr(entity)
        }

        // object
        if(entity.props) {
            // is splitObj
            let a = entity.props.join('-')
            clean = this.escapeStr(a)
        }

        if(entity.str) {
            // splitobject before props.
            clean = this.escapeStr(entity.str)
        }

        let propStr = `.${clean}`
        return propStr

    }

    escapeStr(str) {
        return str.replace(/[<>*%#()=.@?\/]/g, "\\$&")

    }

    captureNew(items, oldItems) {
        console.log('Capture new', items, oldItems)
        for(let str of items) {

            let b = cg.objectSplit(str)
            let n = b.node.handler
            // debugger
            let func = n? n.bind(b): cg.insertRule.bind(cg)
            let res = func(b)
            console.log(str, res)
        }
    }

    processOnLoad(node, watch=document) {
        watch.addEventListener('DOMContentLoaded', function(){
            this.process(node)
        }.bind(this))
    }

    process(parent=document.body) {
        let classes = this.getAllClasses(parent)
        for(let name of classes) {
            this.safeInsertLine(name)
        }
    }

    safeInsertLine(name) {
        let spl2 = this.objectSplit(name)
        if(spl2.valid) {
            console.log('Inserting', spl2)
            this.insertRule(spl2)
        }
        // console.log(spl2)
        // this.isBranch(spl2)
    }

    getAllClasses(parent=document.body) {
        // console.log('Process.')
        let allClasses = new Set()
        parent.querySelectorAll('*').forEach(function(node) {
            // Do whatever you want with the node object.
            node.classList.forEach(x=>allClasses.add(x))
        });

        // then test in the tree.
        // console.log(allClasses)
        return allClasses
    }

    monitor(parent=document.body) {
        monitorClasses(parent)
    }

    addClass(entity, ...tokens) {
        let nodes = this.asNodes(entity)
        for(let node of nodes) {
            node.classList.add(...tokens)
        }
    }

    removeClass(entity, ...tokens) {
        let nodes = this.asNodes(entity)
        for(let node of nodes) {
            node.classList.remove(...tokens)
        }
    }

    asNodes(entity) {
        let nodes = [entity]
        if(typeof(entity) == 'string') {
            nodes = document.querySelectorAll(entity)
        }
        return nodes
    }
}

const kebabCase = function(str, sep='-') {
    let replaceFunc =  ($, ofs) => (ofs ? sep : "") + $.toLowerCase()
    return str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, replaceFunc)
}


const generateClassGraph = function(){
    let cg = new ClassGraph()
    cg.generate()
    return cg
}


const cg = generateClassGraph()
