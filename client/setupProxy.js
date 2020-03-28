// const proxy = require('http-proxy-middleware');

// module.exports = function(app) {
//   app.use(proxy('/api', { target: 'http://localhost:3001/' }));
//   app.use(proxy('/login', { target: 'http://localhost:3001/' }));
//   app.use(proxy('/graphql', { target: 'http://localhost:3001/' }));
// };

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(createProxyMiddleware("/graphql", { target: "http://localhost:3001" }));
};