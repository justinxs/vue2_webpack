const Webpack = require('webpack');
const webpackConfig = require('../webpack/webpack.prod.conf.js');
const themeConfig = require('../webpack/webpack.theme.conf.js');

const compiler = Webpack([webpackConfig, themeConfig]);

compiler.run((err, stats) => {
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