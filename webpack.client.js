const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const clientConfig = {
  mode: 'development',

  // Tell webpack the root file of the app
  entry: './client/index.js',

  // Tell webpack where to put the generated output file.
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },

  plugins: [
    new webpack.DefinePlugin({
      IS_CLIENT: true,
    })
  ],
};

module.exports = merge(commonConfig, clientConfig);