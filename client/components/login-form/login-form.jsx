import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// Constants
import EXCEPTIONS from 'constants/exceptions';

// Components
import Form from '../form/form';
import TextInput from '../form/text-input';
import Button from '../button/button';
import Spinner from '../spinner/spinner';

// Validators
import RequiredValidator from '../../utils/validators/required-validator';

// Styles
import styles from 'client/components/login-form/login-form.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

const LoginForm = ({ error, errorCode, handleLogin, sending }) => {
  useStyles(styles);
  useEffect(() => {
    if (error) {
      renderLoginError();
    }
  });

  const renderLoginError = () => {
    const errorMessage = EXCEPTIONS.getMessageForErrorCode(errorCode);
  };

  const handleLoginClick = (getFormValues) => () => {
    const { fields, isValid } = getFormValues(true);
    if (isValid) {
      const { username, password } = fields;
      handleLogin(username, password);
    }
  };

  return (
    <div className={cx(styles.LoginFormContainer, 'flex flex-dir-col align-items-center')}>
      <Spinner spinning={sending} />
      {error && (
        <div className={styles.LoginError}>
          {errorCode === 1000 ? (
            <div>Invalid username/password</div>
          ) : (
            <div>An unknown error occured, please try again</div>
          )}
        </div>
      )}
      <Form
        fields={{
          username: {
            value: '',
            validators: [RequiredValidator('Username is required')],
          },
          password: {
            value: '',
            validators: [RequiredValidator('Password is required')],
          },
        }}
      >
        {({ onChange, fieldProps, getFormValues, handleEnterKey }) => {
          return (
            <div
              className={styles.LoginFormFields}
              onKeyDown={handleEnterKey(handleLoginClick)}
            >
              <TextInput
                className="mt-3"
                label="Username"
                onChange={onChange}
                {...fieldProps('username')}
              />
              <TextInput
                className="mt-3"
                label="Password"
                onChange={onChange}
                password
                {...fieldProps('password')}
              />
              <Button
                className="mt-4"
                primary
                onClick={handleLoginClick(getFormValues)}
              >
                Login
              </Button>
            </div>
          );
        }}
      </Form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func,
};

export default LoginForm;
