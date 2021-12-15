const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack/webpack.dev.conf.js');
const themeConfig = require('../webpack/webpack.theme.conf.js');

const compiler = Webpack([webpackConfig, themeConfig]);
const devServerOptions = { ...webpackConfig.devServer };
const server = new WebpackDevServer(devServerOptions, compiler);

compiler.run((err, stats) => {
	server.startCallback(() => {
        console.log('Successfully started server on http://localhost:' + devServerOptions.port);
    });

	if (err) {
        console.error(err.stack || err);
        if (err.details) {
            console.error(err.details);
        }
        return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
        console.error(info.errors);
    }

    if (stats.hasWarnings()) {
        console.warn(info.warnings);
    }


});