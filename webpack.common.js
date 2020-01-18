const path = require('path');

module.exports = {
  resolve: {
    modules: [path.resolve(__dirname), 'node_modules', 'client'],
    extensions: ['.js', '.jsx'],
  },
  // Tell webpack to run babel on every file it runs thru
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', ['@babel/preset-env', { targets: { browsers: ['last 2 versions'] } }]],
          plugins: ['@babel/plugin-proposal-class-properties'],
        },
      },
      {
        test: /\.css$/,
        use: ['isomorphic-style-loader', {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
          },
        }],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'isomorphic-style-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [require('autoprefixer')],
            },
          },
          {
            loader: 'less-loader',
            options: {
              modifyVars: {},
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'isomorphic-style-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [require('autoprefixer')],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              modifyVars: {},
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.(gif|svg|jpg|png)/,
        loader: 'file-loader',
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          },
        }],
      },
    ],
  },
};
