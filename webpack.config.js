// webpack.config.js
import path
// const path = require('path');

module.exports = {
  mode: 'production'
  , devtool: false
  , entry: {
    browser: './src/polyclass-browser.js'
    , classgraph: './src/classgraph.js'
    , dcss: './src/dcss.js'
    , module: './src/module.js'

    , 'addon/font-pack': './src/addons/font-pack.js'
    , 'addon/monitor': './src/addons/monitor.js'

    , 'bundle/esm': [
        './src/classgraph.js'
        , './src/dcss.js'
        , './src/module.js'
    ]
    , 'bundle/browser': [
        './src/classgraph.js'
        , './src/dcss.js'
        , './src/module.js'
        , './src/browser.js'
    ]
    , 'bundle/all': [
        './src/classgraph.js'
        , './src/dcss.js'
        , './src/module.js'
        , './src/addons/font-pack.js'
        , './src/addons/monitor.js'
        , './src/browser.js'
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
