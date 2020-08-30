import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PageHeader from '@components/page-header/page-header';
import Form from '@forms/form';
import Button from '@components/button/button';
import TextInput from '@forms/text-input';
import RequiredValidator from '@validators/required-validator';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './signup-page.scss';
import Spinner from '@components/spinner/spinner';
import { createAccount } from '@actions/user-actions';
import {
  getLoading,
  selectUser,
  selectErrorMessage,
} from '@selectors/user-selectors';
import cx from 'classnames';
import { withRouter } from 'react-router-dom';
import { verifyLogin } from '@actions/auth-actions';

const SignupPage = ({
  createAccount,
  error,
  history,
  loading,
  user,
  verifyLogin,
}) => {
  useStyles(styles);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    verifyLogin().then(() => {
      if (user) {
        history.push('/account');
      }
    });
  }, [user]);

  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  const formInitialValues = {
    firstName: {
      value: '',
      validators: [RequiredValidator('First name is required')],
    },
    lastName: {
      value: '',
      validators: [RequiredValidator('Last name is required')],
    },
    email: {
      value: '',
      validators: [RequiredValidator('E-mail is required')],
    },
    username: {
      value: '',
      validators: [RequiredValidator('Username is required')],
    },
    password: {
      value: '',
      validators: [RequiredValidator('Password is required')],
    },
    passwordConfirm: {
      value: '',
      validators: [RequiredValidator('Password confirmation is required')],
    },
  };

  const handleSubmit = (getFormValues) => (event) => {
    event.preventDefault();
    const { isValid, fields } = getFormValues(true);

    if (
      fields.password &&
      fields.passwordConfirm &&
      fields.password !== fields.passwordConfirm
    ) {
      setErrorMessage('Error: Passwords must match.');
      return;
    }

    if (isValid) {
      createAccount(fields);
    }
  };

  const onFieldsUpdate = ({ fieldName, fields }) => {
    switch (fieldName) {
      case 'password':
      case 'passwordConfirm':
        if (
          errorMessage &&
          fields.password.value == fields.passwordConfirm.value
        ) {
          setErrorMessage();
        }

        break;
    }
  };

  return (
    <div className={cx('container-fluid', styles.SignupPageContainer)}>
      <PageHeader headerText="Account Signup" showButton={false} />
      <Spinner spinning={loading} />
      <div className={styles.FormContainer}>
        {errorMessage && (
          <div className={styles.ErrorMessage}>{errorMessage}</div>
        )}
        <Form fields={formInitialValues} onFieldsUpdate={onFieldsUpdate}>
          {({ fieldProps, getFormValues }) => {
            return (
              <React.Fragment>
                <TextInput
                  classname="mt-3"
                  label="First Name"
                  {...fieldProps('firstName')}
                />
                <TextInput
                  classname="mt-3"
                  label="Last Name"
                  {...fieldProps('lastName')}
                />
                <TextInput
                  classname="mt-3"
                  label="E-mail"
                  {...fieldProps('email')}
                />
                <TextInput
                  classname="mt-3"
                  label="Username"
                  {...fieldProps('username')}
                />
                <TextInput
                  classname="mt-3"
                  label="Password"
                  password
                  {...fieldProps('password')}
                />
                <TextInput
                  classname="mt-3"
                  label="Password"
                  password
                  {...fieldProps('passwordConfirm')}
                />
                <div></div>
                <Button
                  primary
                  className="mt-3"
                  onClick={handleSubmit(getFormValues)}
                >
                  Create Account
                </Button>
              </React.Fragment>
            );
          }}
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: getLoading(state),
    user: selectUser(state),
    error: selectErrorMessage(state),
  };
};

const mapActionsToProps = { createAccount, verifyLogin };

export default {
  component: connect(
    mapStateToProps,
    mapActionsToProps
  )(withRouter(SignupPage)),
};
