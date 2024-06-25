/*

This rollup performs all the build tasks required for all versions.
To execute, run the npm build command

    npm run build

The results deploy to `build/` and `dist/` folders.

+ Each addon builds into a minified `dist/addons/name.js` (see addonsConfig)

## How does it work

The rollup tools expects configurations of assets. They're exported at the base
of this file. Each object contains an `input`str, `output`[] and `plugins`

    export default [{
        input: "path.js"
        output: [
            {file: 'dist/output.js', format: 'esm'},
            {file: 'dist/output.js', format: 'umd', name: 'polything'},
        ]
        , plugins: []
    }]


Each stage does the following:

+ Use the created "merge" files within the `build/`
+ Create a minified `dist/` of each file discovered

*/
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
    , "./src/addons/value-reduce.js"
]


const CORE = [
    "./src/tools.js"
    , "./src/dcss.js"
    , "./src/classgraph.js"
]


const POLYCLASS = [
    ...CORE
    , "./src/polyclass.js"
    , "./src/export-statements.js"
]


const POLYCLASS_BROWSER = [
    ...CORE
    , "./src/dom-property-activator.js"
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

    // The browser requires the DOM loader and no ESM export.
    , browser: {
        files: POLYCLASS_BROWSER
        , outputFile: './build/polyclass.browser-core.js'
    }

    , browserFull: {
        files: POLYCLASS_BROWSER.concat(ADDONS)
        , outputFile: './build/polyclass.browser-full.js'
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
            file: 'dist/core/esm/polyclass-core.js'
            , format: 'esm'
        }, {
            file: 'dist/core/umd/polyclass-core.js'
            , format: 'umd'
            , name: 'polybundle'
        }, {
            file: 'dist/core/cjs/polyclass-core.cjs'
            , format: 'cjs'
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
        // terser()
    ]
}

const coreConfigMin = {
    input: groupedFiles.core.outputFile
    , output: [
       {
            file: 'dist/core/esm/polyclass-core.min.js'
            , format: 'esm'
        }, {
            file: 'dist/core/umd/polyclass-core.min.js'
            , format: 'umd'
            , name: 'polybundle'
        }, {
            file: 'dist/core/cjs/polyclass-core.min.cjs'
            , format: 'cjs'
            , name: 'polybundle'
        }

    ]
    , plugins: [
        // concat({
        //     groupedFiles: Object.values(groupedFiles)
        // })
        // Resolve external modules from node_modules
        // resolve(),
        // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
        // commonjs(),
        // Minify the output
        terser()
    ]
}


const coreConfigBrowser = {
    input: groupedFiles.browser.outputFile
    , output: [
       {
            file: 'dist/browser/esm/polyclass-core.js'
            , format: 'esm'
        }, {
            file: 'dist/browser/umd/polyclass-core.js'
            , format: 'umd'
            , name: 'polybundle'
        }, {
            file: 'dist/browser/cjs/polyclass-core.cjs'
            , format: 'cjs'
            , name: 'polybundle'
        }

    ]
    , plugins: [
        // concat({
        //     groupedFiles: Object.values(groupedFiles)
        // })
        // Resolve external modules from node_modules
        // resolve(),
        // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
        // commonjs(),
        // Minify the output
        // terser()
    ]
}

const coreConfigBrowserMin = {
    input: groupedFiles.browser.outputFile
    , output: [
       {
            file: 'dist/browser/esm/polyclass-core.min.js'
            , format: 'esm'
        }, {
            file: 'dist/browser/umd/polyclass-core.min.js'
            , format: 'umd'
            , name: 'polybundle'
        }, {
            file: 'dist/browser/cjs/polyclass-core.min.cjs'
            , format: 'cjs'
            , name: 'polybundle'
        }

    ]
    , plugins: [
        // concat({
        //     groupedFiles: Object.values(groupedFiles)
        // })
        // Resolve external modules from node_modules
        // resolve(),
        // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
        // commonjs(),
        // Minify the output
        terser()
    ]
}


/* All files created during the concat stage, with the merge files
   within the `build/`.
   Create a minified `dist/` of each file discovered.
*/

const buildFilesConfig = {
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
            name: 'polyclass', // Global variable name when included directly in the browser
            sourcemap: false, // Optional: generates a source map
            format: 'esm'
        }]
    , plugins: [
        // concat({
        //     groupedFiles: Object.values(groupedFiles)
        // }),
        // Resolve external modules from node_modules
        resolve(),
        // Minify the output
        terser(),
    ]
}

// "output.format" - Valid values are "amd", "cjs", "system", "es", "iife" or "umd".
const polyclassFullConfig = {
    input: groupedFiles.full.outputFile
    , output: [
       {
            file: 'dist/full/esm/polyclass-full.js'
            , format: 'esm'
        }, {
            file: 'dist/full/umd/polyclass-full.js'
            , format: 'umd'
            , name: 'polybundle'
        }, {
            file: 'dist/full/cjs/polyclass-full.cjs'
            , format: 'cjs'
            , name: 'polybundle'
        }
    ]
    , plugins: [
        // Resolve external modules from node_modules
        // resolve(),
        // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
        // commonjs(),
        // Minify the output
        // , terser()
    ]
}

const polyclassFullConfigMin = {
    input: groupedFiles.full.outputFile
    , output: [
       {
            file: 'dist/full/esm/polyclass-full.min.js'
            , format: 'esm'
        }, {
            file: 'dist/full/umd/polyclass-full.min.js'
            , format: 'umd'
            , name: 'polybundle'
        }, {
            file: 'dist/full/cjs/polyclass-full.min.cjs'
            , format: 'cjs'
            , name: 'polybundle'
        }
    ]
    , plugins: [
        // Resolve external modules from node_modules
        // resolve(),
        // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
        // commonjs(),
        // Minify the output
        terser()
    ]
}

 /* Create a minified `dist/addon` of each file within the ADDONS list.
 */
const addonsConfig = {
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
    coreConfig
    , coreConfigMin
    , coreConfigBrowser
    , coreConfigBrowserMin
    , buildFilesConfig
    , polyclassFullConfig
    , polyclassFullConfigMin
    , addonsConfig
]