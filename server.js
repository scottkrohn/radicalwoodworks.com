import express from "express";
import session from "express-session";
import webpack from "webpack";
import webpackMiddleware from "webpack-dev-middleware";
import path from "path";
import routes from "./server/routes/routes";
import webpackConfig from "./webpack.config.js";
import passport from "passport";
import passportConfig from './server/config/passport';
import { getConfig } from './server/config/protected';

const app = express();
const env = app.get("env");
var bodyParser = require("body-parser");

// Apply Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
	secret: getConfig('passportSecret'),
	resave: true,
	saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// Setup Passport
passportConfig(passport);

// Include dev/prod independant routes.
routes(app, passport);

if (env === "production") {
  // Serve static output from webpack for production.
  app.use(express.static(path.join(__dirname, "build")));

  app.get("*", function(req, res) {
    res.sendFile(path.resolve(__dirname + "/build/index.html"));
  });
} else {
  // Serve react code with webpack for development.
  app.use(webpackMiddleware(webpack(webpackConfig)));

  app.get("*", function(req, res) {
    res.sendFile(path.resolve(__dirname + "/build/index.html"));
  });
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running and listening on port ${port}`);
});
