const baseConfig = require('./webpack.base.config.js');
const {merge} = require('webpack-merge');
const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = merge(baseConfig, {
    mode: 'production',
    plugins: [
        // new BundleAnalyzerPlugin(),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        }),
        new WebpackPwaManifest({
            name: 'jQuery CUI',
            short_name: 'CUI',
            description: 'UI solution base on jQuery and CUI.',
            display: 'standalone',
            theme_color: '#ffffff',
            background_color: '#ffffff',
            'start_url': baseConfig.output.publicPath,
            icons: [
                {
                    src: path.resolve('./src/assets/logo.png'),
                    sizes: [48, 96, 192]
                }
            ]
        }),
    ]
});