const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.imgbb.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/1', // Optional: Modify the request path if needed
      },
      headers: {
        'Access-Control-Allow-Origin': '*', // Optional: Set specific origin instead of '*'
      },
    })
  );
};
