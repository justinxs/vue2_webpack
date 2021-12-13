const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.dev.conf.js');

const compiler = Webpack(webpackConfig);
const devServerOptions = { ...webpackConfig.devServer, open: true };
const server = new WebpackDevServer(devServerOptions, compiler);

let isServerStart = false;
compiler.watch({
	// Example watchOptions
	aggregateTimeout: 300,
	poll: undefined
}, (err, stats) => {
	if (!isServerStart) {
		server.startCallback(() => {
            console.log('Successfully started server on http://localhost:' + devServerOptions.port);
        });
		isServerStart = true;
	}

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