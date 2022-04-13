const koa = require('koa');
const app = new koa();
const LoggerService = require('./logger.service');
const path = require('path');
const fs = require('fs');
const Router = require('koa-router');
const _ = new Router();
const { createProxyMiddleware } = require('http-proxy-middleware');
const k2c = require('koa2-connect');
const serverConfig = require('../config/server');


async function start() {
	const { port, host, proxy } = serverConfig;
	
	const loggerService = new LoggerService();
	// 初始化日志服务
	loggerService.init();

	// 允许代理字符串
	app.proxy = true;

    Object.keys(proxy).forEach(proxyPath => {
        const proxyObj = proxy[proxyPath];
        _.all(new RegExp(proxyPath + '.*'), async (ctx, next) => {
            return await k2c(createProxyMiddleware({
                target: proxyObj.target,
                changeOrigin: true,
                pathRewrite: proxyObj.pathRewrite,
                logLevel: 'debug',
                logProvider: () => {
                    return {
                        log: loggerService.logger.log.bind(loggerService.logger),
                        debug: loggerService.logger.debug.bind(loggerService.logger),
                        info: loggerService.logger.info.bind(loggerService.logger),
                        warn: loggerService.logger.warn.bind(loggerService.logger),
                        error: loggerService.logger.error.bind(loggerService.logger)
                    };
                }
            }))(ctx, next);
        })
    });

	// 静态资源转发
	_.get(/.*\.(js|css|png|jpg|jpeg|gif|webp|ico|xml|xsl|txt|mp3|zip|htc|swf|json|svga|heic|ttf|woff|flv)/, async (ctx, next) => {
		let lastPoint = ctx.path.lastIndexOf('.');
		let resPath = path.resolve(__dirname, `../dist/${ctx.path}`);
		ctx.type = ctx.path.substr(lastPoint + 1);
		if(fs.existsSync(resPath)) {
			return ctx.body = fs.createReadStream(resPath);
		} else {
			ctx.resError = 1;
			ctx.status = 404;
			return ctx.body = '';
		}
	});

	_.get(/.*/, async (ctx, next) => {
		let resPath = path.resolve(__dirname, `../dist/index.html`);
		ctx.type = 'html';
		return ctx.body = fs.createReadStream(resPath);
	})

	app
	.use(_.routes())
	.use(_.allowedMethods());

	console.info(`http://localhost:${port}`);
	app.listen(port, host);
}

start();