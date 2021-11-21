const baseConfig = require('./webpack.base.config.js');
const { merge } = require('webpack-merge');
module.exports = (env) => {
	var config = baseConfig(env);
	return merge(config, {
		mode: 'development',
		devtool: 'source-map',
		watch: false,
		devServer: {
			static: './dist',
		},
	});
};
