const baseConfig = require('./webpack.base.config.js');
const merge = require('webpack-merge');
const path = require('path');
module.exports = merge(baseConfig, {
    entry: './src/doc/index.js',
    devtool: 'source-maps',
    output: {
        filename: '[name].client.min.js',
        path: path.resolve(__dirname, './public/')
    }
});