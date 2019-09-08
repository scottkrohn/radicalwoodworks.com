import express from 'express';
import session from 'express-session';
import routes from './server/routes/routes';
import passport from 'passport';
import passportConfig from './server/lib/passport';
import serverRenderer from './lib/server-renderer';
import { getConfig } from './lib/protected';
import { matchRoutes } from 'react-router-config';
import createStore from './lib/create-store';
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
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Setup Passport
passportConfig(passport);

// Include dev/prod independant routes.
routes(app);

app.use('/public', express.static('public'));
app.get('*', (req, res) => {
  const store = createStore({}, req);

  const loadDataPromises = matchRoutes(Routes, req.path)
    .map(({ route }) => {
      return route.loadData ? route.loadData(store, req.path) : null;
    })
    .map((promise) => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
    });

  Promise.all(loadDataPromises).then(() => {
    const context = {};
    const content = serverRenderer(req, store, context);

    if (context.notFound) {
      res.status(404);
    }

    res.send(content);
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running and listening on port ${port}`);
});
