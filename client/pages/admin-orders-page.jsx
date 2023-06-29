import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withAuthValidation } from 'client/hoc/auth';
import queryString from 'query-string';
import AUTH from '@constants/auth-constants';
import cx from 'classnames';
import PageHeader from '@components/page-header/page-header';
import { getOrders, getOrderCount } from '@actions/orders-actions';
import { getLoading, selectOrders } from '@selectors/orders-selectors';
import { isEmpty } from 'lodash';
import OrdersTable from '@components/orders-table/orders-table';
import Spinner from '@components/spinner/spinner';
import SelectInput from '@components/form/select-input';
import styles from './admin-orders-page.scss';


const AdminOrdersPage = ({
  history,
  limitUsed,
  loading,
  getOrders,
  getOrderCount,
  offsetUsed,
  orders,
  sortUsed,
  totalOrders,
}) => {
  
  const query = queryString.parse(history.location.search);
  const [totalPages, setTotalPages] = useState(null);
  const [sortType, setSortType] = useState('placedTs');

  useEffect(() => {
    const { page, rows } = isEmpty(query) ? { page: 1, rows: 10 } : query;
    if (isEmpty(history.location.query)) {
      history.push({ search: `page=${page}&rows=${rows}` });
    }

    getOrderCount();
  }, []);

  useEffect(() => {
    const { page, rows } = query;
    const offset = (page - 1) * rows;
    const limitOrOffsetChanged =
      offset !== offsetUsed || parseInt(rows) !== limitUsed;
    const sortChanged = sortType !== sortUsed;

    if ((sortChanged || limitOrOffsetChanged) && page && rows) {
      getOrders(offset, rows, sortType);
    }
  }, [history.location.search, sortType]);

  useEffect(() => {
    const { rows } = query;
    setTotalPages(Math.ceil(totalOrders / parseInt(rows)));
  }, [totalOrders, history.location.search]);

  const onOrderRowClick = (order) => () => {
    history.push(`/admin-order/${order.getId()}`);
  };

  const updateQueryParams = (page, rowCount) => {
    history.push({ search: `page=${page}&rows=${rowCount}` });
  };

  const handlePageChange = (direction) => () => {
    const currentPage = parseInt(query.page);
    if (direction === 'prev' && currentPage > 1) {
      updateQueryParams(currentPage - 1, query.rows);
    }

    if (direction === 'next' && currentPage < totalPages) {
      updateQueryParams(currentPage + 1, query.rows);
    }
  };

  const handleRowCountChange = () => (event) => {
    updateQueryParams(1, parseInt(event.target.value));
  };

  const handleOrderSortChange = () => (event) => {
    setSortType(event.target.value);
  };

  return (
    <div className={cx('container-fluid', styles.AdminOrdersPageContainer)}>
      <Spinner spinning={loading} />
      <PageHeader headerText="View Orders" showButton={false} />
      {query.rows && query.page ? (
        <div className={styles.OrderControls}>
          <SelectInput
            className={styles.OrdersPerPageSelect}
            label="Sort Orders By"
            value={sortType}
            onChange={handleOrderSortChange}
            options={[
              { label: 'Placed Date', value: 'placedTs' },
              { label: 'Order Status', value: 'status' },
              { label: 'Shipping Status', value: 'fulfillmentStatus' },
            ]}
          />
          <SelectInput
            className={styles.OrdersPerPageSelect}
            label="Orders Per Page"
            value={parseInt(query.rows)}
            onChange={handleRowCountChange}
            options={[
              { label: '10', value: 10 },
              { label: '25', value: 25 },
              { label: '100', value: 100 },
            ]}
          />
          <button
            className={styles.PrevPageButton}
            onClick={handlePageChange('prev')}
          >
            Prev Page
          </button>
          <button
            className={styles.NextPageButton}
            onClick={handlePageChange('next')}
          >
            Next Page
          </button>
          {query.page && totalPages ? (
            <div
              className={styles.PageIndicator}
            >{`Page: ${query.page}/${totalPages}`}</div>
          ) : null}
        </div>
      ) : null}
      {orders && <OrdersTable orders={orders} onRowClick={onOrderRowClick} />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: getLoading(state),
    orders: selectOrders(state),
    totalOrders: state.orders?.ordersCount?.count,
    limitUsed: parseInt(state?.orders?.limit),
    offsetUsed: parseInt(state?.orders?.offset),
    sortUsed: state?.orders?.sortCol,
  };
};

export default {
  component: connect(mapStateToProps, { getOrders, getOrderCount })(
    withAuthValidation(AUTH.USER_TYPES.ADMIN)(AdminOrdersPage)
  ),
  loadData: (store, pathParts, query) => {
    const { page, rows } = query;
    const offset = (page - 1) * rows;
    return store.dispatch(getOrders(offset, rows, 'placedTs'));
  },
};
