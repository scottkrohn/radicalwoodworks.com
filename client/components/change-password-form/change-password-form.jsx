import React, { Fragment, useState } from 'react';
import styles from './change-password-form.scss';
import useStyles from 'isomorphic-style-loader/useStyles';
import Form from '@forms/form';
import TextInput from '@forms/text-input';
import RequiredValidator from '@validators/required-validator';
import Button from '@components/button/button';
import EXCEPTIONS from '@constants/exceptions';
import cx from 'classnames';

const ChangePasswordForm = ({ className, onCancel, onSubmit }) => {
  useStyles(styles);
  const [errorMessage, setErrorMessage] = useState(null);

  const formInitialValues = {
    currentPassword: {
      value: '',
      validators: [RequiredValidator('This field is required')],
    },
    newPassword: {
      value: '',
      validators: [RequiredValidator('This field is required')],
    },
    passwordConfirm: {
      value: '',
      validators: [RequiredValidator('This field is required')],
    },
  };

  const handleSubmit = (getFormValues) => (event) => {
    event.preventDefault();
    const { fields, isValid } = getFormValues(true);

    if (
      fields.newPassword &&
      fields.passwordConfirm &&
      fields.newPassword !== fields.passwordConfirm
    ) {
      setErrorMessage('Passwords must match.');
      return;
    }

    if (isValid) {
      onSubmit(fields).catch((error) => {
        if (error.code === EXCEPTIONS.unauthorized.code) {
          setErrorMessage('Incorrect current password.');
        }
      });
    }
  };

  const onFieldsUpdate = ({ fieldName, fields }) => {
    switch (fieldName) {
      case 'newPassword':
      case 'passwordConfirm':
        if (
          errorMessage &&
          fields.newPassword.value == fields.passwordConfirm.value
        ) {
          setErrorMessage();
        }

        break;
    }
  };

  return (
    <div className={cx(styles.ChangePasswordFormContainer, className)}>
      {errorMessage && (
        <div className={styles.ErrorMessage}>{`Error: ${errorMessage}`}</div>
      )}
      <Form fields={formInitialValues} onFieldsUpdate={onFieldsUpdate}>
        {({ fieldProps, getFormValues }) => {
          return (
            <Fragment>
              <TextInput
                label="Current Password"
                className="mt-3"
                password
                {...fieldProps('currentPassword')}
              />
              <TextInput
                label="New Password"
                className="mt-3"
                password
                {...fieldProps('newPassword')}
              />
              <TextInput
                label="Confirm New Password"
                className="mt-3"
                password
                {...fieldProps('passwordConfirm')}
              />
              <div className="flex justify-content-evenly">
                <Button primary onClick={handleSubmit(getFormValues)}>
                  Save New Password
                </Button>
                <Button danger onClick={onCancel}>
                  Cancel
                </Button>
              </div>
            </Fragment>
          );
        }}
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
