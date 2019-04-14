import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import path from 'path';
import routes from './server/routes/routes';
import webpackConfig from './webpack.config.js';

const app = express();
const env = app.get('env');

// Include dev/prod independant routes.
routes(app);


// TODO: MOVE TO CONFIG FOR PASSWORDS
// import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
// 	service: 'gmail',
// 	host: 'smtp.gmail.com',
// 	auth: {
// 	}
// });

// const mailOptions = {
// 	from: 'krohndesigns@gmail.com', // sender address
// 	to: 'skrohn86@gmail.com', // list of receivers
// 	subject: 'Subject of your email', // Subject line
// 	html: '<p>Your html here</p>'// plain text body
//   };

//   transporter.sendMail(mailOptions, function (err, info) {
// 	if(err)
// 	  console.log(err)
// 	else
// 	  console.log(info);
//  });

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
