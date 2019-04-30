var router = require('./router');

module.exports = function(app, passport) {
	app.use('/api', router);
	app.use('/server', router);
	app.use('/auth', router);
};
