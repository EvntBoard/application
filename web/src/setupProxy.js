const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5123',
      logLevel: 'debug'
    })
  );
  app.use(
    '/ws',
    createProxyMiddleware({
      target: 'ws://localhost:5123',
      ws: true,
      changeOrigin: true,
      logLevel: 'debug'
    })
  );
};
