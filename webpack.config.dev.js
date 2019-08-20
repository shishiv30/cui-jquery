const baseConfig = require('./webpack.base.config.js');
const merge = require('webpack-merge');
module.exports = merge(baseConfig, {
    entry: './src/doc/index.js',
    devtool: 'source-maps'
});