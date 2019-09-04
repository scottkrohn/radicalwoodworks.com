import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { verifyLogin } from '../actions/auth-actions';

export const withAuthValidation = (WrappedComponent) => {
  const RequireAuth = (props) => {
    return props.auth.loggedIn ? <WrappedComponent {...props} /> : <Redirect to="/" />;
  };

  const mapStateToProps = (state) => {
    return {
      auth: state.auth,
    };
  };

  return connect(mapStateToProps)(RequireAuth);
};
