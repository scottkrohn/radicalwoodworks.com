import { get } from 'lodash';
import AUTH from '@constants-server/auth-constants';

const isAuthenticatedAdmin = (req) => {
  const userType = get(req, 'user.type', null);
  return (
    req.isAuthenticated &&
    req.isAuthenticated() &&
    userType === AUTH.USER_TYPES.ADMIN
  );
};

const isAuthenticatedCustomer = (req) => {
  const userType = get(req, 'user.type', null);
  return (
    req.isAuthenticated &&
    req.isAuthenticated() &&
    userType === AUTH.USER_TYPES.CUSTOMER
  );
};

export default {
  isAuthenticatedAdmin,
};
