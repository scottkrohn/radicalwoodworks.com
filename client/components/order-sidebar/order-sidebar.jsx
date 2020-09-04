import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './order-sidebar.scss';
import cx from 'classnames';
import CurrencyHelper from '@helpers/currency-helper';

const OrderSidebar = ({ className, order }) => {
  useStyles(styles);

  return (
    <div className={cx(styles.OrderSidebarContainer, className)}>
      <div className={styles.Subtotal}>
        <div className={styles.Header}>Item Subtotal:</div>
        <div>{CurrencyHelper.formatCurrency(order.getSubtotal())}</div>
      </div>
      <div className={styles.ShippingTotal}>
        <div className={styles.Header}>Shipping Total:</div>
        <div>{CurrencyHelper.formatCurrency(order.getShippingTotal())}</div>
      </div>
      <div className={styles.TaxTotal}>
        <div className={styles.Header}>Tax Total:</div>
        <div>{CurrencyHelper.formatCurrency(order.getTaxTotal())}</div>
      </div>
      <div className={styles.GrandTotal}>
        <div className={styles.Header}>Grand Total:</div>
        <div>{CurrencyHelper.formatCurrency(order.getGrandTotal())}</div>
      </div>
    </div>
  );
};

export default OrderSidebar;
