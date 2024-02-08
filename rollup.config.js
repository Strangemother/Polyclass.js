import resolve from '@rollup/plugin-node-resolve'; // Helps Rollup find external modules
import commonjs from '@rollup/plugin-commonjs'; // Converts CommonJS modules to ES6
import terser from '@rollup/plugin-terser'; // Minifies the bundle


export default {
  input: [          // Specify the entry point
    "./src/dcss.js",
    "./src/classgraph.js",
    "./src/addons/monitor.js",
    "./src/addons/font-pack.js",
    "./src/addons/var-translate.js",
    "./src/addons/vars-box.js",
    "./src/polyclass.js",
  ],
  output: {
    file: 'dist/polyclass-browser.js', // Output file
    // format: 'iife', // Output format
    name: 'polyclass', // Global variable name when included directly in the browser
    sourcemap: true // Optional: generates a source map
    // inlineDynamicImports: true
  },
  plugins: [
    resolve(), // Resolve external modules from node_modules
    commonjs(), // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
    terser(), // Minify the output
  ],
};
