import passport from 'passport';
import jwt from 'jsonwebtoken';
import { getConfig } from '../../lib/protected';
import User from '@models/user';

// Constants
import REQUEST from '../constants/request-constants';
import EXCEPTIONS from '@constants/exceptions';

export default (req, res, next) => {
  if (req.method === REQUEST.method.post) {
    passport.authenticate('local-signup', (err, user, info) => {
      if (user) {
        req.login(user, () => {
          delete user.password;

          const token = jwt.sign(user, getConfig('jwtSecret'));
          res.cookie('utoken', token);
          const userModel = new User();
          userModel.setValues(user);
          res.send(userModel);
        });
        return;
      } else if (info && info.conflict) {
        res.status(409).send(info.conflict);
      } else {
        res.status(500).send(EXCEPTIONS.internalError);
      }
    })(req, res, next);
  }
};
