var router = require('./router');

<<<<<<< HEAD
module.exports = function(app, passport) {
	app.use('/api', router);
	app.use('/server', router);
	app.use('/auth', router);
};
=======

module.exports = function (app) {
	app.use('/api', apiRoutes);
	app.use('/server', apiRoutes);
};
>>>>>>> 57ecf903d27d19fd6d9e2e0873bc1f546237ccc1
