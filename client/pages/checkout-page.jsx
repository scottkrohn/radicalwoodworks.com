import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { selectOrder } from '@selectors/order-selectors';
import { getOrder } from '@actions/order-actions';
import { withRouter } from 'react-router-dom';
import { getLoading } from '@selectors/order-selectors';
import Spinner from '@components/spinner/spinner';

const CheckoutPage = ({ getOrder, history, loading, order }) => {
  useEffect(() => {
    if (!order) {
      getOrder().catch((error) => {
        history.push('/cart');
      });
    }
  }, []);

  return (
    <div className="container-fluid">
      <Spinner spinning={loading} />
      Checkout page!
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    order: selectOrder(state),
    loading: getLoading(state),
  };
};

const mapActionsToProps = { getOrder };

export default {
  component: connect(
    mapStateToProps,
    mapActionsToProps
  )(withRouter(CheckoutPage)),
  loadData: (store) => {
    return store.dispatch(getOrder());
  },
};
