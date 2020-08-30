import REQUEST from '../constants/request-constants';
import EXCEPTIONS from '../../constants/exceptions';
import AuthHelper from '@helpers/auth-helper';
import User from '@models/user';

export default (req, res, next) => {
  if (
    AuthHelper.isAuthenticatedAdmin(req) ||
    AuthHelper.isAuthenticatedCustomer(req)
  ) {
    const user = new User();
    user.setValues(req.user, true);
    res.send(user);
  } else {
    res.status(401).send(EXCEPTIONS.unauthorized);
  }
};
