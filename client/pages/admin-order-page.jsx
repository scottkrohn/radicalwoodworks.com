import React, { useEffect } from 'react';
import { getOrder } from '@actions/order-actions';
import { connect } from 'react-redux';

const AdminOrderPage = ({ getOrder, match }) => {
  useEffect(() => {
    const { orderId } = match.params;
    getOrder(orderId);
  }, []);

  return <div>Admin Order Page</div>;
};

const mapStateToProps = (state) => {
  return state;
};

export default {
  component: connect(mapStateToProps, { getOrder })(AdminOrderPage),
};
