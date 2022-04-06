const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
	return {
		entry: { cui: './src/index.js' },
		module: {
			rules: [
				{
					test: /\.(woff2?|ttf|eot)$/i,
					type: 'asset/resource',
					generator: {
						filename: 'font.[name][ext]',
					},
				},
				{
					test: /\.(svg|png|jpe?g|gif|ico|webp)$/i,
					type: 'asset/resource',
					generator: {
						filename: 'img.[name][ext]',
					},
				},
				{
					test: /\.scss$/i,
					use: [
						MiniCssExtractPlugin.loader,
						'css-loader',
						'sass-loader',
					],
				},
				{
					test: /\.m?js$/i,
					include: path.resolve(__dirname, 'src'),
					loader: 'babel-loader',
				},
				{
					test: /\.html$/i,
					loader: 'html-loader',
					options: {
						sources: {
							list: [
								'...',
								{
									tag: 'img',
									attribute: 'data-src',
									type: 'src',
								},
							],
						},
					},
				},
			],
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: '[name].min.css',
				chunkFilename: '[id].css',
			}),
			new HtmlWebpackPlugin({
				name: 'doc',
				filename: 'index.html',
				template: './src/index.html',
			}),
		],
	};
};
