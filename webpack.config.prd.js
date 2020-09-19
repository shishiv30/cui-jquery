const baseConfig = require('./webpack.base.config.js');
const merge = require('webpack-merge');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = merge(baseConfig, {
    entry: {
        cui: './src/doc/index.js'
    },
    devtool: 'none',
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'public/')
    },
    plugins: [
        new CleanWebpackPlugin('public'),
        new BundleAnalyzerPlugin()
    ]
});