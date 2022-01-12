const baseConfig = require('./webpack.base.config.js');
const { merge } = require('webpack-merge');
const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = (env) => {
	const publicPath = env.deploy
		? 'https://shishiv30.github.io/jquery-cui/'
		: 'http://localhost:8080/';
	var config = baseConfig(env);
	return merge(config, {
		mode: 'production',
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].js',
			publicPath: publicPath,
			clean: true,
		},
		recordsPath: path.join(__dirname, 'records.json'),
		plugins: [
			// new BundleAnalyzerPlugin(),
			// new WorkboxPlugin.GenerateSW({
			// 	exclude: [/\.(?:png|jpg|jpeg|svg)$/],
			// 	clientsClaim: true,
			// 	skipWaiting: true,
			// }),
			//todo https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin  InjectManifest  vs webpack-pwa-manifest  https://www.youtube.com/watch?v=e-fgUJ4Qcf0
			new WebpackPwaManifest({
				name: 'CUI',
				short_name: 'CUI framework',
				description: 'UI solution base on jQuery and CUI.',
				display: 'standalone',
				theme_color: '#ffffff',
				background_color: '#ffffff',
				start_url: publicPath + 'index.html',
				icons: [
					{
						src: path.resolve('./src/assets/logo.png'),
						sizes: [48, 96, 192, 256, 384, 512],
						purpose: 'any maskable',
					},
				],
			}),
			new WorkboxPlugin.InjectManifest({
				swSrc: './src/js/sw.js',
			}),
		],
	});
};
