import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

// Constants
import EXCEPTIONS from 'constants/exceptions';

// Components
import Form from '../form/form';
import TextInput from '../form/text-input';
import Button from '../button/button';
import Notification from '../notification/notification';
import Spinner from '../spinner-v2/spinner-v2';

// Validators
import RequiredValidator from '../../utils/validators/required-validator';

// Styles
import styles from 'client/components/login-form/login-form.less';
import useStyles from 'isomorphic-style-loader/useStyles';

const LoginForm = ({ error, errorCode, handleLogin }) => {
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
    <div className={styles.LoginFormContainer}>
      <Spinner />
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
        {({ onChange, fieldProps, getFormValues }) => {
          return (
            <div>
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
