const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const pathsToClean = ['dist'];
module.exports = {
    entry: './index.js',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src/')
        },
        extensions: ['.scss', '.js', '.json']
    },
    module: {
        rules: [{
            test: /\.(woff2?|svg|ttf|eot)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/'
                }
            }]
        }, {
            test: /\.(png|jpe?g|gif|ico)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images/'
                }
            }, {
                loader: 'image-webpack-loader'
            }]
        }, {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        }, {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    },
    plugins: [
        new CleanWebpackPlugin(pathsToClean),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './template.html',
            favicon: 'src/assets/favicon.ico'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ]
};
