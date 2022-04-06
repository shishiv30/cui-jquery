const baseConfig = require('./webpack.config.base.js');
const { merge } = require('webpack-merge');
const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const WebpackPwaManifest = require('webpack-pwa-manifest');
// const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = (env) => {
	const publicPath = env.production
		? 'https://shishiv30.github.io/cui-jquery/'
		: 'http://localhost:8080/';
	var config = baseConfig(env);
	return merge(config, {
		mode: 'production',
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].min.js',
			publicPath: publicPath,
			clean: true,
		},
		// recordsPath: path.join(__dirname, 'records.json'),
		// plugins: [new BundleAnalyzerPlugin()],
	});
};
