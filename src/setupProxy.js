const proxy = require('http-proxy-middleware');

// to proxy all api call to server in dev
// this will useful in dev mode
// but on production we can proxy servers

module.exports = app => {
  app.use(
    proxy('/api', {
      target: 'http://localhost:3001/',
      pathRewrite: {
        '^/api': '/'
      }
    })
  );
};
