import { connect } from 'react-redux';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectOrder } from '@selectors/order-selectors';
import { clearOrder, getOrder } from '@actions/order-actions';
import { withRouter } from 'react-router-dom';
import { getLoading } from '@selectors/order-selectors';
import Spinner from '@components/spinner/spinner';
import PageHeader from '@components/page-header/page-header';
import Form from '@forms/form';
import TextInput from '@forms/text-input';
import SelectInput from '@forms/select-input';
import Button from '@components/button/button';
import RequiredValidator from '@validators/required-validator';
import STATES from '@constants/state-constants';
import Address from '@models/address';
import { addAddressToOrder, submitCheckout } from '@actions/checkout-actions';
import { selectUser } from '@selectors/user-selectors';
import OrderSidebar from '@components/order-sidebar/order-sidebar';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './checkout-page.scss';
import cx from 'classnames';

import ORDER from '@constants/order-constants';

const CheckoutPage = ({
  addAddressToOrder,
  getOrder,
  history,
  loading,
  order,
  submitCheckout,
  user,
}) => {
  // DEBUG CODE
  const [paypalCompleteTemp, setPaypalCompleteTemp] = useState(false);
  useStyles(styles);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!order) {
      getOrder().catch((error) => {
        history.push('/cart');
      });
    }
  }, []);

  const handleSubmit = (getFormValues) => (event) => {
    event.preventDefault();
    const { isValid, fields } = getFormValues(true);
    if (isValid) {
      const address = new Address();
      address.setValues(fields);
      address.setUserId(user ? user.getId() : null);
      address.setType(
        user ? ORDER.ADDRESS_TYPES.USER : ORDER.ADDRESS_TYPES.GUEST
      );

      addAddressToOrder(address, order.getId()).then((response) => {
        console.log('Added, go to paypal!');
        setPaypalCompleteTemp(true);
      });
    }
  };

  const formInitialValues = {
    firstName: {
      value: '',
      validators: [RequiredValidator('First name required')],
    },
    lastName: {
      value: '',
      validators: [RequiredValidator('Last name required')],
    },
    email: {
      value: '',
      validators: [RequiredValidator('E-mail required')],
    },
    address: {
      value: '',
      validators: [RequiredValidator('Street address required')],
    },
    addressTwo: {
      value: '',
    },
    apt: {
      value: '',
    },
    zip: {
      value: '',
      validators: [RequiredValidator('Zip code required')],
    },
    city: {
      value: '',
      validators: [RequiredValidator('City required')],
    },
    state: {
      value: '',
      validators: [RequiredValidator('State required')],
    },
  };

  const completeCheckout = () => {
    submitCheckout(order).then((response) => {
      dispatch(clearOrder());
      history.push(`/order-confirmation/${order.getId()}`);
    });
  };

  return order ? (
    <div className="container-fluid">
      <Spinner spinning={loading} />
      <PageHeader headerText="Checkout" showButton={false} />
      <div
        className={cx(
          'flex justify-content-center',
          styles.CheckoutPageContainer
        )}
      >
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
                    {...fieldProps('apt')}
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
                  <Button
                    className="mt-3"
                    primary
                    onClick={handleSubmit(getFormValues)}
                  >
                    Continue To Payment
                  </Button>
                </Fragment>
              );
            }}
          </Form>
        </div>
        <OrderSidebar className={styles.OrderSidebar} order={order} />
      </div>
      {paypalCompleteTemp && (
        <button onClick={completeCheckout}>Complete Order!</button>
      )}
    </div>
  ) : null;
};

const mapStateToProps = (state) => {
  return {
    order: selectOrder(state),
    loading: getLoading(state),
    user: selectUser(state),
  };
};

const mapActionsToProps = { addAddressToOrder, getOrder, submitCheckout };

export default {
  component: connect(
    mapStateToProps,
    mapActionsToProps
  )(withRouter(CheckoutPage)),
  loadData: (store) => {
    return store.dispatch(getOrder());
  },
};
