// rollup.config.js

export default {
  input: 'src/polyclass-browser.js', // Browser entry point
  output: {
    file: 'dist/polyclass-browser.js',
    format: 'umd',          // Universal Module Definition
    name: 'polyclass' // Optional: set if you want to expose your package globally
  }
};
