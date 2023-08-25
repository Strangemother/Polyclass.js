// webpack.config.js

const path = require('path');

module.exports = {
  entry: {
    browser: './src/browser.js', // Browser entry point
    module: './src/index.js'     // Node.js entry point (optional)
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: 'DynamicCSSStyleSheet', // Optional: set if you want to expose your package globally
    filename: 'classy-declarative-css.js',
    libraryTarget: 'umd'         // Universal Module Definition
  },
};
