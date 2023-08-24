// rollup.config.js

export default {
  input: 'src/browser.js', // Browser entry point
  output: {
    file: 'dist/browser.js',
    format: 'umd',          // Universal Module Definition
    name: 'DynamicCSSStyleSheet' // Optional: set if you want to expose your package globally
  }
};
