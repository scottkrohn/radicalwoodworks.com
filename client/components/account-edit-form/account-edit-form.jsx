import React, { Fragment } from 'react';
import styles from './account-edit-form.scss';
import useStyles from 'isomorphic-style-loader/useStyles';
import Form from '@forms/form';
import TextInput from '@forms/text-input';
import SelectInput from '@forms/select-input';
import STATES from '@constants/state-constants';
import Button from '@components/button/button';
import RequiredValidator from '@validators/required-validator';
import cx from 'classnames';

const AccountEditForm = ({ user, onCancel, onSubmit }) => {
  useStyles(styles);

  const handleSubmit = (getFormValues) => (event) => {
    event.preventDefault();
    const { fields, isValid } = getFormValues(true);
    if (isValid) {
      onSubmit({ id: user.getId(), ...fields });
    }
  };

  const formInitialValues = {
    firstName: {
      value: user.getFirstName(),
      validators: [RequiredValidator('First name required')],
    },
    lastName: {
      value: user.getLastName() || '',
      validators: [RequiredValidator('Last name required')],
    },
    email: {
      value: user.getEmail() || '',
      validators: [RequiredValidator('E-mail required')],
    },
    address: {
      value: user.getAddress() || '',
      validators: [RequiredValidator('Street address required')],
    },
    addressTwo: {
      value: user.getAddressTwo() || '',
    },
    aptSuite: {
      value: user.getAptSuite() || '',
    },
    zip: {
      value: user.getZip() || '',
      validators: [RequiredValidator('Zip code required')],
    },
    city: {
      value: user.getCity() || '',
      validators: [RequiredValidator('City required')],
    },
    state: {
      value: user.getState() || '',
      validators: [RequiredValidator('State required')],
    },
  };
  return (
    <div className={styles.AccountEditFormContainer}>
      <div className={styles.Form}>
        <Form fields={formInitialValues}>
          {({ fieldProps, getFormValues }) => {
            return (
              <Fragment>
                <div className="flex justify-content-between">
                  <TextInput
                    className="mt-3 flex-basis-49"
                    label="First Name"
                    {...fieldProps('firstName')}
                  />
                  <TextInput
                    className="mt-3 flex-basis-49"
                    label="Last Name"
                    {...fieldProps('lastName')}
                  />
                </div>
                <TextInput
                  className="mt-3"
                  label="E-Mail Address"
                  {...fieldProps('email')}
                />
                <TextInput
                  className="mt-3"
                  label="Street Address"
                  {...fieldProps('address')}
                />
                <TextInput
                  className="mt-3"
                  label="Street Address - Line 2"
                  {...fieldProps('addressTwo')}
                />
                <TextInput
                  className="mt-3"
                  label="Apt / Suite / Other"
                  {...fieldProps('aptSuite')}
                />
                <div className="flex justify-content-between">
                  <TextInput
                    className="mt-3 flex-basis-32"
                    label="City"
                    {...fieldProps('city')}
                  />
                  <SelectInput
                    className="mt-3 flex-basis-32"
                    label="State"
                    options={STATES.states}
                    {...fieldProps('state')}
                  />
                  <TextInput
                    className="mt-3 flex-basis-32"
                    label="Zip Code"
                    {...fieldProps('zip')}
                  />
                </div>
                <div className="flex justify-content-evenly">
                  <Button
                    className={cx('mt-3', styles.Button)}
                    primary
                    onClick={handleSubmit(getFormValues)}
                  >
                    Save Account Info
                  </Button>
                  <Button
                    className={cx('mt-3', styles.Button)}
                    danger
                    onClick={onCancel}
                  >
                    Cancel
                  </Button>
                </div>
              </Fragment>
            );
          }}
        </Form>
      </div>
    </div>
  );
};

export default AccountEditForm;
