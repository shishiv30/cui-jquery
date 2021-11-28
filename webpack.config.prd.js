const baseConfig = require('./webpack.base.config.js');
const { merge } = require('webpack-merge');
const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = (env) => {
	var config = baseConfig(env);
	return merge(config, {
		mode: 'production',
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
				start_url: config.output.publicPath + 'index.html',
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
				swDest: 'sw.js',
			}),
		],
	});
};
