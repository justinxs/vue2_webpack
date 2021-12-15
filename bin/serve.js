const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack/webpack.dev.conf.js');
const themeConfig = require('../webpack/webpack.theme.conf.js');
const rm = require('rimraf');
const path = require('path');

const compiler = Webpack([webpackConfig, themeConfig]);
const devServerOptions = { ...webpackConfig.devServer };


const server = new WebpackDevServer(devServerOptions, compiler);

rm.sync(path.resolve(__dirname, '../dist'));
server.start();