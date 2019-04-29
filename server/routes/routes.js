var apiRoutes = require('./api-router');


module.exports = function (app) {
	app.use('/api', apiRoutes);
	app.use('/server', apiRoutes);
};
