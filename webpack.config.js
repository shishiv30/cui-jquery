const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const pathsToClean = ['dist', 'public'];
const autoprefixer = require('autoprefixer');
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
module.exports = function (env, argv) {
    return {
        entry: './index.js',
        output: {
            filename: '[name].client.min.js',
            path: path.resolve(__dirname, 'public/')
        },
        devtool: argv.mode === 'production' ? 'none' : 'source-maps',
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src/')
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
                use: [
                    MiniCssExtractPlugin.loader, 
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                autoprefixer
                            ]
                        }
                    },
                    'sass-loader'
                ]
            }, {
                test: /\.(html)$/,
                include: path.join(__dirname, './'),
                use: {
                    loader: 'html-loader',
                    options: {
                        interpolate: true
                    }
                }
            }, {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                        ]
                    }
                }
            }]
        },
        plugins: [
            new CleanWebpackPlugin(pathsToClean),
            new HtmlWebpackPlugin({
                filename: './index.html',
                template: './template.html',
                favicon: 'src/assets/favicon.ico',
                minify: true
            }),
            new WebpackPwaManifest({
                name: 'jQuery CUI',
                short_name: 'CUI',
                description: 'UI solution base on jQuery and CUI.',
                display: 'standalone',
                theme_color: '#ffffff',
                background_color: '#ffffff',
                'start_url': 'https://shishiv30.github.io/cui-jquery/',
                icons: [
                    {
                        src: path.resolve('src/assets/logo.png'),
                        sizes: [48, 96, 192]
                    }
                ]
            }),
            new WorkboxPlugin.GenerateSW({
                clientsClaim: true,
                skipWaiting: true
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css'
            }),
            new webpack.ProvidePlugin({
                '$': 'jquery',
                'jQuery': 'jquery'
            })
        ]
    }
};
