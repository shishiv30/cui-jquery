const baseConfig = require('./webpack.base.config.js');
const { merge } = require('webpack-merge');
const path = require('path');

module.exports = (env) => {
	var config = baseConfig(env);
	return merge(config, {
		mode: 'development',
		devtool: 'source-map',
	});
};
