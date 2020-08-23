import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import routes from './server/routes/routes';
import passport from 'passport';
import passportConfig from './server/lib/passport';
import serverRenderer from './lib/server-renderer';
import { getConfig } from './lib/protected';
import { matchRoutes } from 'react-router-config';
import createStore from './lib/create-store';
import requestLogger from './lib/request-logger';
import Routes from './routes';
import 'babel-polyfill';

const app = express();
const env = app.get('env');
var bodyParser = require('body-parser');

// Apply Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: getConfig('passportSecret'),
    resave: true,
    saveUninitialized: true,
    key: 'sessid',
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

// Setup Passport
passportConfig(passport);

// Set up API routes.
routes(app);

app.use(requestLogger);
app.use('/public', express.static('public'));
app.get('*', (req, res) => {
  const store = createStore({}, req);

  const serverRenderPromises = [];
  matchRoutes(Routes, req.path).forEach(({ route }) => {
    const pathParts = req.path.split('/').filter((part) => part);
    const loadDataPromise = route.loadData
      ? route.loadData(store, pathParts)
      : null;

    if (loadDataPromise) {
      const promiseArray = Array().concat(loadDataPromise); // Force to be an array
      promiseArray.forEach((promise) => {
        serverRenderPromises.push(
          new Promise((resolve, reject) => {
            promise.then(resolve).catch(resolve);
          })
        );
      });
    }
  });

  Promise.all(serverRenderPromises).then((data) => {
    const context = {};
    const content = serverRenderer(req, store, context);

    if (context.notFound) {
      res.status(404);
    }

    res.send(content);
  });
});

const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`Server running and listening on port ${port}`);
});
