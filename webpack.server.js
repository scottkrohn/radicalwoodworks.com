const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
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

  resolve: {
    alias: {
      ['@actions']: path.resolve(__dirname, './client/actions'),
      ['@bli']: path.resolve(__dirname, './server/classes/bli'),
      ['@components']: path.resolve(__dirname, './client/components'),
      ['@constants']: path.resolve(__dirname, './constants'),
      ['@constants-client']: path.resolve(__dirname, './client/constants'),
      ['@constants-server']: path.resolve(__dirname, './server/constants'),
      ['@controller']: path.resolve(__dirname, './server/controllers'),
      ['@db']: path.resolve(__dirname, './server/db'),
      ['@forms']: path.resolve(__dirname, './client/components/form'),
      ['@helpers']: path.resolve(__dirname, './lib/helpers'),
      ['@models']: path.resolve(__dirname, './model'),
      ['@pages']: path.resolve(__dirname, './client/pages'),
      ['@reducers']: path.resolve(__dirname, './client/reducers'),
      ['@selectors']: path.resolve(__dirname, './client/selectors'),
      ['@validators']: path.resolve(__dirname, './client/utils/validators'),
    },
    modules: [path.resolve(__dirname), 'node_modules', 'client'],
    extensions: ['.js', '.jsx'],
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
