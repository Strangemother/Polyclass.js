// webpack.config.js

const path = require('path');

module.exports = {
  mode: 'development'
  , entry: {
    browser: './src/browser.js'    // Browser entry point
    , module: './src/index.js'     // Node.js entry point (optional)
    , dcss: './src/dcss.js'
    , classgraph: './src/classgraph.js'
    , bundle: [
        './src/browser.js',
        './src/dcss.js',
        './src/classgraph.js'
    ]
  },
  // output: {
  //   path: path.resolve(__dirname, 'dist'),
  //   library: 'DynamicCSSStyleSheet', // Optional: set if you want to expose your package globally
  //   filename: 'classy-declarative-css.js',
  // },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[fullhash:8].js',
    sourceMapFilename: '[name].[fullhash:8].map',
    library: 'DynamicCSSStyleSheet', // Optional: set if you want to expose your package globally
    chunkFilename: '[id].[fullhash:8].js',
    libraryTarget: 'umd',         // Universal Module Definition
    clean: true
  }
};
