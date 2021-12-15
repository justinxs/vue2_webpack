module.exports = {
    host: '0.0.0.0',
    port: 9000,
    inspectPort: 9001,
    analyzerPort: 9002,
    proxy: {
        '/api': {
            target: 'http://localhost:8114',
            pathRewrite: { '^/api': '/api' },
        },
    },
}