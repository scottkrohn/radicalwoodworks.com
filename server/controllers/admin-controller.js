import REQUEST from '../constants/request-constants';
import EXCEPTIONS from '../../constants/exceptions';
import AuthHelper from '@helpers/auth-helper';

export default (req, res, next) => {
  if (AuthHelper.isAuthenticatedAdmin(req)) {
    res.send();
  } else {
    res.status(401).send(EXCEPTIONS.unauthorized);
  }
};
