import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Cookie from 'js-cookie';
import AUTH from '@constants/auth-constants';

// Actions
import { login } from 'client/actions/auth-actions';

// Component
import LoginForm from '@components/login-form/login-form';
import PageHeader from '@components/page-header/page-header';
import { withRouter } from 'react-router-dom';
import { selectUser } from '@selectors/user-selectors';
import { verifyLogin } from '@actions/auth-actions';

const LoginContainer = ({ auth, history, login, user, verifyLogin }) => {
  const [error, setError] = useState(false);
  const [errorCode, setErrorCode] = useState(null);

  useEffect(() => {
    setError(false);
  }, []);

  useEffect(() => {
    if (user) {
      history.push(
        user.getType() === AUTH.USER_TYPES.ADMIN ? '/admin' : '/account'
      );
    }
  }, [user]);

  const handleLogin = (username, password) => {
    login(username, password)
      .then((token) => {
        Cookie.set('utoken', token, { expires: 7 });
      })
      .catch((error) => {
        Cookie.remove('utoken');
        setErrorCode(error.code);
        setError(true);
        return false;
      });
  };

  return (
    <div className="container-fluid">
      <div className="col-xs-12">
        <PageHeader headerText="Radical Woodworks Login" showButton={false} />

        <LoginForm
          handleLogin={handleLogin}
          error={error}
          errorCode={errorCode}
          sending={auth.sending}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    user: selectUser(state),
  };
};

const mapActionsToProps = {
  login,
  verifyLogin,
};

export default {
  component: connect(
    mapStateToProps,
    mapActionsToProps
  )(withRouter(LoginContainer)),
};
