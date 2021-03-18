const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://park-reservation.herokuapp.com',
      changeOrigin: true,
    })
  );
};