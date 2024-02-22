
const templateCache = new Map()

const getTemplateNode = function(name) {
    if(templateCache.has(name)){
        return templateCache.get(name)
    }
    return document.querySelectorAll(`template[data-name="${name}"]`)[0]
}


const getCacheTemplateNode = function(name) {
    let n = getTemplateNode(name)
    if(!templateCache.has(name)) {
        templateCache.set(name, n)
    }
    return n
}

const cutTemplateNode = function(name) {
    n = getTemplateNode(name)

    n && n.remove()
    return n
}

const cutCacheTemplateNode = function(name) {
    let n = cutTemplateNode(name)
    templateCache.set(name, n)
    return n
}

const getLazyTemplate = function(name) {
    let t = cutCacheTemplateNode(name)
    if(!t) {
        throw new Error(`could not cut template "${name}"`)
    }
    var message = t && t.innerHTML
    return function(obj) {

        let params = Object.assign({
            }, obj)
        let keys = Array.from(Object.keys(params))
        let values = Array.from(Object.values(params))
        let ff = new Function(...keys, ['return `', message ,'`;'].join(''))
        return ff.bind(this)(...values)
    }
}


class ClassUnit extends HTMLElement {
    connectedCallback() {
        const text = getLazyTemplate(this.localName).bind({})
        let inner = text({scope:this, egg: 2})
        const shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = inner
    }
}


const testName = function(name) {
    return (name != undefined)
            && (name.indexOf('-') > -1)
}

class Template {
    name = 'polyclass-template'

    constructor(name, element) {
        this.name = name
        this.element = element
    }

    static define(name, element) {
        if(!testName(name)) {
            throw Error('Custom element name must be a string with a hypen')
        }
        return customElements.define(name, element);
    }

    init(name=this.name) {
        this.definition = this.constructor.define(name, this.getElement())
        return this
    }

    getElement() {
        return this.element
    }


    ensure(el){
        el = el || document.createElement(this.name);
        if(!(el instanceof this.getElement())) {
            // customElements.define(this.name, SpiderMan);
            this.init(this.name)
            customElements.upgrade(el);
        }
    }
}


class Hello extends Template {
    name = 'show-hello'
    element = ClassUnit
}

let h = (new Hello).init()



// <show-hello name="John"></show-hello>