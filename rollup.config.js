import resolve from '@rollup/plugin-node-resolve'; // Helps Rollup find external modules
import commonjs from '@rollup/plugin-commonjs'; // Converts CommonJS modules to ES6
import terser from '@rollup/plugin-terser'; // Minifies the bundle

// import ClassGraph from "./src/classgraph.js"
import concat from 'rollup-plugin-concat';


const ADDONS = [
    "./src/addons/events.js"
    , "./src/addons/font-pack.js"
    , "./src/addons/monitor.js"
    , "./src/addons/vars-box.js"
    , "./src/addons/var-translate.js"
]


const CORE = [
    "./src/tools.js"
    , "./src/dcss.js"
    , "./src/classgraph.js"
]


const POLYCLASS = [
    ...CORE
    , "./src/polyclass.js"
]


const groupedFiles =  {
    core: {
        files: POLYCLASS
        // files: CORE.concat(POLYCLASS)
        , outputFile: './build/polyclass.core.js'
    }
    , addons: {
        files: ADDONS
        , outputFile: './build/addons.all.js'
    }
    , full: {
        files: POLYCLASS.concat(ADDONS)
        , outputFile: './build/polyclass.full.js'
    }
}


const groupedFileOutputs = function(){
    let res = []
    for(let obj of Object.values(groupedFiles)){
        res.push(obj.outputFile)
    }
    return res;
}


const coreConfig = {
    input: groupedFiles.core.outputFile
    , output: [
       {
            file: 'dist/core.js'
            , format: 'esm'
        }, {
            file: 'dist/core.umd.js'
            , format: 'umd'
            , name: 'polybundle'
        }
    ]
    , plugins: [
        concat({
            groupedFiles: Object.values(groupedFiles)
        })
        // Resolve external modules from node_modules
        // resolve(),
        // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
        // commonjs(),
        // Minify the output
        , terser()
    ]
}

const buildFilesConfig = {
    /* All files created during the concat stage, with the merge files
       within the `build/`.
       Create a minified `dist/` of each file discovered.
    */
    input: [
        // "./src/module.js"
        // , ...CORE
        // , ...ADDONS
        // , ...POLYCLASS

        /* Created during the `concat` phase. */
        ...groupedFileOutputs()
    ]
    , output: [{
            dir: 'dist/', // Output file
            // file: 'dist/polyclass-browser.js', // Output file
            // format: 'iife', // Output format
            name: 'polyclass', // Global variable name when included directly in the browser
            sourcemap: false, // Optional: generates a source map
            // inlineDynamicImports: true
            format: 'esm'
        }/*,{
            dir: 'dist/' // Output file
            // file: 'dist/polyclass-browser.js', // Output file
            // format: 'iife', // Output format
            , sourcemap: false // Optional: generates a source map
            // inlineDynamicImports: true
            , format: 'umd'
            , name: 'polyclass'
        }*/]
    , plugins: [
        concat({
            groupedFiles: Object.values(groupedFiles)
        }),
        // Resolve external modules from node_modules
        resolve(),
        // Minify the output
        terser(),
    ]
}

const addonsConfig = {
     /* Create a minified `dist/addon` of each file within the ADDONS list.
     */
    input: [
        // "./src/module.js"
        // , ...CORE
        ...ADDONS
        // , ...POLYCLASS
    ]
    , output: {
        dir: 'dist/addons/', // Output file
        // file: 'dist/polyclass-browser.js', // Output file
        // format: 'iife', // Output format
        name: 'polyclass', // Global variable name when included directly in the browser
        sourcemap: false, // Optional: generates a source map
        // inlineDynamicImports: true
    }
    , plugins: [
        // Minify the output
        terser()
    ]
}


// https://rollupjs.org/command-line-interface/#configuration-files
export default [
    /*coreConfig
    , */buildFilesConfig
    , addonsConfig
]