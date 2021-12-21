const Webpack = require('webpack');
const webpackConfig = require('../webpack/webpack.dev.conf.js');
const themeConfig = require('../webpack/webpack.theme.conf.js');
const rm = require('rimraf');
const path = require('path');
const nodemon = require('nodemon');
const serverConfig = require('../config/server');
const loadESMoudle = require('./loadESMoudle');

const compiler = Webpack([webpackConfig, themeConfig]);
let serverStart = false;

loadESMoudle(['chalk', 'ora']).then(([chalk, ora]) => {
    const spinner = ora('building...').start();

    rm.sync(path.resolve(__dirname, '../dist'));
    compiler.watch({
        aggregateTimeout: 300,
        poll: undefined
    }, (err, stats) => {
        spinner.stop();
        if (!serverStart) {
            nodemon(`-e js,scss,vue --watch src --watch server --watch config --ignore node_modules/**node_modules --inspect=${serverConfig.inspectPort} ./server/index.js`);
            serverStart = true;
        }

        if (err) {
            console.error(chalk.red(err.stack || err));
            if (err.details) {
                console.log(chalk.red(err.details));
            }
        } else {
            process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: true, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
                chunks: false,
                chunkModules: false,
                cachedAssets: false,
                entrypoints: false
            }) + '\n\n');

            // 删除无关的themes js
            rm.sync(path.resolve(__dirname, '../dist/themes/js'));

            console.log(chalk.cyan('  Build complete.\n'))
        }

        const info = stats.toJson();

        if (stats.hasErrors()) {
            console.error(info.errors);
        }

        if (stats.hasWarnings()) {
            console.warn(info.warnings);
        }
    });
});

nodemon.on('start', function () {
	console.log('App has started');
}).on('quit', function () {
	console.log('App has quit');
	process.exit();
}).on('restart', function (files) {
	console.log('App restarted due to: ', files);
});