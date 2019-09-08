const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const webpackNodeExternals = require('webpack-node-externals');

const serverConfig = {
  // Imform webpack that we're buidling a bundle for nodeJS, rather than the browser.
  target: 'node',
  node: {
    __dirname: true,
  },
  mode: 'development',

  // Tell webpack the root file of the app
  entry: './server.js',

  // Tell webpack where to put the generated output file.
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },

  // This will exclude any modules that live inside the node_modules folder from being
  // bundled into the server bundle.js because they're unnecessary.
  externals: [webpackNodeExternals()],
  plugins: [new webpack.DefinePlugin({
    IS_CLIENT: false,
  })],

  watchOptions: {
    ignored: /client/,
  },
};

module.exports = merge(commonConfig, serverConfig);
