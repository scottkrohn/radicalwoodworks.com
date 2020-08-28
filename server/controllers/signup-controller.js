import passport from 'passport';

// Constants
import REQUEST from '../constants/request-constants';
import EXCEPTIONS from '@constants/exceptions';

export default (req, res, next) => {
  if (req.method === REQUEST.method.post) {
    passport.authenticate('local-signup', (err, user, info) => {
      console.log(info);
      if (user) {
        res.send({ username: user.username, id: user.id });
        return;
      } else if (info && info.conflict) {
        res.status(409).send(EXCEPTIONS.usernameConflict);
      } else {
        res.status(500).send(EXCEPTIONS.internalError);
      }
    })(req, res, next);
  }
};
