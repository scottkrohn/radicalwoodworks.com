import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withAuthValidation } from 'client/hoc/auth';
import AUTH from '@constants/auth-constants';
import cx from 'classnames';
import PageHeader from '@components/page-header/page-header';
import { getOrders } from '@actions/order-actions';
import { selectOrders } from '@selectors/order-selectors';

const AdminOrdersPage = ({ getOrders, orders }) => {
  useEffect(() => {
    getOrders();
  }, []);

  console.log(orders);

  return (
    <div className={cx('container-fluid')}>
      <PageHeader headerText="View Orders" showButton={false} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    orders: selectOrders(state),
  };
};

export default {
  component: connect(mapStateToProps, { getOrders })(
    withAuthValidation(AUTH.USER_TYPES.ADMIN)(AdminOrdersPage)
  ),
};
