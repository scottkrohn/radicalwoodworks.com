import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import path from 'path';
import routes from './server/routes/routes';

// TODO: Should prd/dev have different config files?
import webpackConfig from './webpack.config.js';

const app = express();
const env = app.get('env');

// Include dev/prod independant routes.
routes(app);

if (env === 'production') {
	// Serve static output from webpack for production.
	app.use(express.static(path.join(__dirname, 'build')));

	app.get('*', function(req, res) {
		res.sendFile(path.resolve(__dirname + '/build/index.html'));
	});
} else {
	// Serve react code with webpack for development.
	app.use(webpackMiddleware(webpack(webpackConfig)));

	app.get('*', function(req, res) {
		res.sendFile(path.resolve(__dirname + '/build/index.html'));
	});
}

const port = (process.env.PORT || 3000);

app.listen(port, () => {
	console.log(`Server running and listening on port ${port}`);
});
