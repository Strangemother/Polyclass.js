/*

Install many required items as per normal imports
Switch to dev, build, dist versions without rewriting imports.
 */
document.addEventListener('DOMContentLoaded', function(){
    console.log('Loaded')
}.bind(this))

class Assets {
    setup(conf) {
        this.conf = conf
    }

    load(name) {
        let d = this.conf[name]
        return this.loadItems(d)
    }

    loadItems(items) {
        console.log('Load', items.length)
        for(let path of items) {
            let s = document.createElement('script')
            s.src = path
            document.head.appendChild(s);
        }
        console.log('Done inserts')
    }

    liveLoad(){
        let d = {}
        let a = ''
        for(let s of document.head.querySelectorAll('script[data-load]')){
            let c = JSON.parse(s.textContent.trim())
            a = s.dataset.load
            Object.assign(d, c)
        }
        let subD = d[a]
        this.loadItems(subD)
    }
}

const asl = new Assets()
/*
asl.setup({
    dev: [
        "../src/tools.js"
        , "../src/dcss.js"
        , "../src/classgraph.js"
        , "../src/addons/monitor.js"
        , "../src/addons/font-pack.js"
        , "../src/addons/var-translate.js"
        , "../src/addons/vars-box.js"
        , "../src/polyclass.js"
        , "../src/dom-property-activator.js"
    ]
    , build: [
        "../build/polyclass.full.js"
    ]
})
asl.load('dev')
*/
asl.liveLoad()