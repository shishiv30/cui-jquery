const baseConfig = require('./webpack.base.config.js');
const { merge } = require('webpack-merge');
const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WorkboxPlugin = require('workbox-webpack-plugin');
// const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = (env) => {
	return merge(baseConfig(env), {
		mode: 'production',
		plugins: [
			// new BundleAnalyzerPlugin(),
			// new WorkboxPlugin.GenerateSW({
			// 	exclude: [/\.(?:png|jpg|jpeg|svg)$/],
			// 	clientsClaim: true,
			// 	skipWaiting: true,
			// }),
			new WorkboxPlugin.InjectManifest({
				swSrc: './src/js/sw.js',
				swDest: 'sw.js',
			}),
			//todo https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin  InjectManifest  vs webpack-pwa-manifest  https://www.youtube.com/watch?v=e-fgUJ4Qcf0
			// new WebpackPwaManifest({
			// 	name: 'jQuery CUI',
			// 	short_name: 'CUI',
			// 	description: 'UI solution base on jQuery and CUI.',
			// 	display: 'standalone',
			// 	theme_color: '#ffffff',
			// 	background_color: '#ffffff',
			// 	start_url: 'http://localhost:8080',
			// 	publicPath: 'http://localhost:8080',
			// 	icons: [
			// 		{
			// 			src: path.resolve('./src/assets/logo.png'),
			// 			sizes: [48, 96, 192],
			// 		},
			// 	],
			// }),
		],
	});
};
