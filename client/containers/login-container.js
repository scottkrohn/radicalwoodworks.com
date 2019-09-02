import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Cookie from 'js-cookie';

// Actions
import { login } from 'client/actions/auth-actions';

// Component
import LoginForm from 'client/components/login-form/login-form';
import { Redirect } from 'react-router-dom';

const LoginContainer = (props) => {
  const [redirectToAdmin, setRedirectToAdmin] = useState(false);
  const [error, setError] = useState(false);
  const [errorCode, setErrorCode] = useState(null);

  useEffect(() => {
    setError(false);
  });

  const handleLogin = (username, password) => {
    props
      .login(username, password)
      .then((token) => {
        Cookie.set('utoken', token, { expires: 7 });
        setRedirectToAdmin(true);

        return true;
      })
      .catch((error) => {
        Cookie.remove('utoken');
        setErrorCode(error.code);
        setError(true);
        return false;
      });
  };

  if (redirectToAdmin) {
    return <Redirect to="/admin" />;
  }

  return (
    <div className="container-fluid">
      <div className="col-xs-12">
        <div className="text-center">
          <h1>Radical Woodworks Login</h1>
        </div>

        <LoginForm
          handleLogin={handleLogin}
          error={error}
          errorCode={errorCode}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapActionsToProps = {
  login,
};

export default {
  component: connect(
    mapStateToProps,
    mapActionsToProps
  )(LoginContainer),
};
