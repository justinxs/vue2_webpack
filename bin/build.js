const Webpack = require('webpack');
const webpackConfig = require('./webpack.prod.conf.js');

const compiler = Webpack(webpackConfig);

compiler.run({
	// Example watchOptions
	aggregateTimeout: 300,
	poll: undefined
}, (err, stats) => {
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