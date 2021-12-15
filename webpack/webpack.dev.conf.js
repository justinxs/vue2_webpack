const path = require('path')
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.conf.js');
const serverConfig = require('../config/server');

module.exports = merge(baseConfig, {
    // 从 webpack v4 开始, 指定 mode 会自动地配置 process.env.NODE_ENV
    // 如果 mode 未通过配置或 CLI 赋值，CLI 将使用可能有效的 NODE_ENV 值作为 mode
    mode: 'development',
    devtool: 'cheap-source-map',
    // webpack-dev-server 和 webpack-dev-middleware 里 Watch 模式默认开启
    devServer: {
        static: {
            directory: path.resolve(__dirname, '../dist'),
            watch: true,
        },
        compress: true,
        host: serverConfig.host,
        port: serverConfig.port,
        hot: false,
        open: [`http://localhost:${serverConfig.port}`],
        client: {
            progress: true
        },
        proxy: serverConfig.proxy,
    },
});