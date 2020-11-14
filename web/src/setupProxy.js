const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5123'
    })
  );
  app.use(
    '/ws',
    createProxyMiddleware({
      target: 'http://localhost:5123',
      ws: true,
      changeOrigin: true,
    })
  );
};
