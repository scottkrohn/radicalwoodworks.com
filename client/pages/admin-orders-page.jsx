import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withAuthValidation } from 'client/hoc/auth';
import AUTH from '@constants/auth-constants';
import cx from 'classnames';
import PageHeader from '@components/page-header/page-header';
import { getOrders } from '@actions/orders-actions';
import { getLoading, selectOrders } from '@selectors/orders-selectors';
import { isEmpty } from 'lodash';
import OrdersTable from '@components/orders-table/orders-table';
import Spinner from '@components/spinner/spinner';

// TODO: Add spinner when loading data.
// TODO: Add styles

const AdminOrdersPage = ({ loading, getOrders, orders }) => {
  useEffect(() => {
    if (isEmpty(orders)) {
      getOrders();
    }
  }, []);

  return (
    <div className={cx('container-fluid')}>
      <Spinner spinning={loading} />
      <PageHeader headerText="View Orders" showButton={false} />
      {orders && <OrdersTable orders={orders} />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: getLoading(state),
    orders: selectOrders(state),
  };
};

export default {
  component: connect(mapStateToProps, { getOrders })(
    withAuthValidation(AUTH.USER_TYPES.ADMIN)(AdminOrdersPage)
  ),
  loadData: (store) => store.dispatch(getOrders()),
};
