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
    "./src/dcss.js"
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
        , outputFile: './build/polyclass-only.js'
    }
    ,addons: {
        files: ADDONS
        , outputFile: './build/all-addons.js'
    }
    ,full: {
        files: POLYCLASS.concat(ADDONS)
        , outputFile: './build/polyclass-full.js'
    }
}


const groupedFileOutputs = function(){
    let res = []
    for(let obj of Object.values(groupedFiles)){
        res.push(obj.outputFile)
    }
    return res;
}

// https://rollupjs.org/command-line-interface/#configuration-files
export default [
    /*{
        input: groupedFiles.core.outputFile
        , output: [
                {
                    file: 'dist/core-cjs.js'
                    , format: 'cjs'
                }, {
                    file: 'dist/core-es.js'
                    , format: 'es'
                }, {
                    file: 'dist/core-iife.js'
                    , format: 'iife'
                }, {
                    file: 'dist/core-umd.js'
                    , format: 'umd'
                    , name: 'polybundle'
                }
            ]
    },*/
     {
      input: [
        // "./src/module.js"
        // , ...CORE
        // , ...ADDONS
        // , ...POLYCLASS

        /* Created during the `concat` phase. */
        ...groupedFileOutputs()
      ],
      output: {
        dir: 'dist/', // Output file
        // file: 'dist/polyclass-browser.js', // Output file
        // format: 'iife', // Output format
        name: 'polyclass', // Global variable name when included directly in the browser
        sourcemap: false, // Optional: generates a source map
        // inlineDynamicImports: true
      },
      plugins: [

        concat({
            groupedFiles: Object.values(groupedFiles)
        }),
        // Resolve external modules from node_modules
        resolve(),
        // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
        // commonjs(),
        // Minify the output
        terser(),
      ],
    }
]