var router = require('./router');

module.exports = function(app) {
  app.use('/api', router);
  app.use('/server', router);
  app.use('/auth', router);
  app.use('/admin', router);
};
