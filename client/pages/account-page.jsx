import React from 'react';
import { withAuthValidation } from 'client/hoc/auth';
import AUTH from '@constants/auth-constants';

const UserPage = () => {
  return <div className="container-fluid">User Page!</div>;
};

export default {
  component: withAuthValidation(AUTH.USER_TYPES.CUSTOMER)(UserPage),
};
