const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
	mode: 'development',
	entry: './client/src/index.js',
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js',
	},
	resolve: {
		alias: {
			react: path.resolve(__dirname, 'node_modules', 'react')
		},
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/env', '@babel/react']
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.less$/,
				use: [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'less-loader'}],
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
					}
				}]
			}
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'client/src/index.html',
		}),
		new LiveReloadPlugin(),
	]
};
