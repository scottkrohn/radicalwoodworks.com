import { connect } from 'react-redux';
import React, { Fragment, useEffect } from 'react';
import { selectOrder } from '@selectors/order-selectors';
import { getOrder } from '@actions/order-actions';
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
import Customer from '@models/customer';
import { addCustomerToOrder } from '@actions/checkout-actions';

const CheckoutPage = ({
  addCustomerToOrder,
  getOrder,
  history,
  loading,
  order,
}) => {
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
      const customer = new Customer();
      customer.setValues(fields);
      customer.setType('GUEST'); // TODO: Update once login accounts exist.
      addCustomerToOrder(customer, order.getId()).then((response) => {
        console.log('Added, go to paypal!');
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

  return (
    <div className="container-fluid">
      <Spinner spinning={loading} />
      <PageHeader headerText="Checkout" showButton={false} />
      <div className="flex justify-content-center">
        <div>
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
        <div>Order Totals</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    order: selectOrder(state),
    loading: getLoading(state),
  };
};

const mapActionsToProps = { addCustomerToOrder, getOrder };

export default {
  component: connect(
    mapStateToProps,
    mapActionsToProps
  )(withRouter(CheckoutPage)),
  loadData: (store) => {
    return store.dispatch(getOrder());
  },
};
