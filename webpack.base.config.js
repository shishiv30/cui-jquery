const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
	const publicPath = env.deploy
		? 'https://shishiv30.github.io/jquery-cui/'
		: 'http://localhost:8080/';
	return {
		entry: {
			cui: './src/pagedoc/index.js',
		},
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'dist'),
			clean: true,
			publicPath: publicPath,
		},
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
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: './src/pagedoc/index.ejs',
				favicon: './src/assets/logo.png',
			}),
			new HtmlWebpackPlugin({
				filename: 'about.html',
				template: './src/pageabout/index.ejs',
				favicon: './src/assets/logo.png',
			}),
			new MiniCssExtractPlugin({
				filename: '[name].min.css',
				chunkFilename: '[id].css',
			}),
			new webpack.ProvidePlugin({
				'window.jQuery': 'jquery',
				$: 'jquery',
				jQuery: 'jquery',
			}),
		],
	};
};
