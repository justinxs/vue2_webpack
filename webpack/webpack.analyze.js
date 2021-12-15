const { merge } = require('webpack-merge');
const prodConfig = require('./webpack.prod.conf.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const serverConfig = require('../config/server');

module.exports = merge(prodConfig, {
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerHost: serverConfig.host,
            analyzerPort: serverConfig.analyzerPort
        })
    ],
});