import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AUTH from '@constants/auth-constants';
import { selectUser } from '@selectors/user-selectors';

export const withAuthValidation = (type = AUTH.USER_TYPES.ADMIN) => (
  WrappedComponent
) => {
  const RequireAuth = ({ auth, user, ...props }) => {
    return auth.loggedIn && user && user.getType() === type ? (
      <WrappedComponent {...props} />
    ) : (
      <Redirect to="/" />
    );
  };

  const mapStateToProps = (state) => {
    return {
      auth: state.auth,
      user: selectUser(state),
    };
  };

  return connect(mapStateToProps)(RequireAuth);
};
