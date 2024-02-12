import resolve from '@rollup/plugin-node-resolve'; // Helps Rollup find external modules
import commonjs from '@rollup/plugin-commonjs'; // Converts CommonJS modules to ES6
import terser from '@rollup/plugin-terser'; // Minifies the bundle

import ClassGraph from "./src/classgraph.js"
import concat from 'rollup-plugin-concat';

const addons = [
    "./src/addons/monitor.js"
    , "./src/addons/font-pack.js"
    , "./src/addons/mouse-events.js"
    , "./src/addons/var-translate.js"
    , "./src/addons/vars-box.js"
]

const core = [
    "./src/dcss.js"
    , "./src/classgraph.js"
]

const polyclass = [
    "./src/polyclass.js"
]

const groupedFiles =  [
    {
        files: core.concat(polyclass)
        , outputFile: './build/polyclass-only.js'
    }
    ,{
        files: addons
        , outputFile: './build/all-addons.js'
    }
    ,{
        files: core.concat(polyclass).concat(addons)
        , outputFile: './build/polyclass-full.js'
    }
]

const groupedFileOutputs = function(){
    let res = []
    for(let obj of groupedFiles){
        res.push(obj.outputFile)
    }
    return res;
}

export default {
  input: [          // Specify the entry point
    // "./src/module.js"
    // , ...core
    // , ...addons
    // , ...polyclass

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
        groupedFiles,
    }),
    // Resolve external modules from node_modules
    resolve(),
    // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
    // commonjs(),
    // Minify the output
    terser(),
  ],
};
