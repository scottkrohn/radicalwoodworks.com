import router from './router';

export default function (app) {
  app.use('/api', router);
  app.use('/auth', router);
  app.use('/admin', router);
}
