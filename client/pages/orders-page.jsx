import React from 'react';
import cx from 'classnames';
import styles from './orders-page.scss';
import useStyles from 'isomorphic-style-loader/useStyles';
import { connect } from 'react-redux';
import { withAuthValidation } from 'client/hoc/auth';
import AUTH from '@constants/auth-constants';

const OrdersPage = (props) => {
  useStyles(styles);

  return (
    <div className={cx('container-fluid', styles.OrdersPageContainer)}>
      Order's page
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default {
  component: connect(
    mapStateToProps,
    {}
  )(withAuthValidation(AUTH.USER_TYPES.CUSTOMER)(OrdersPage)),
};
