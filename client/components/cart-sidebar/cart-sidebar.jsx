import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './cart-sidebar.scss';
import cx from 'classnames';
import Button from '@components/button/button';
import CurrencyHelper from '@helpers/currency-helper';

const CartSidebar = ({ items, className }) => {
  useStyles(styles);

  const calculateCartTotals = () => {
    return items.reduce(
      (totals, item) => {
        const itemPrice = item.getProduct().getPrice() * item.getQuantity();
        const shippingPrice =
          item.getProduct().getShippingPrice() * item.getQuantity();

        const lineItemTotal = {
          label: item.getProduct().getTitle(),
          quantity: item.getQuantity(),
          price: itemPrice,
          productId: item.getProduct().getId(),
        };

        return {
          itemTotal: (totals.itemTotal += itemPrice),
          shippingTotal: (totals.shippingTotal += shippingPrice),
          lineItemTotals: [...totals.lineItemTotals, lineItemTotal],
        };
      },
      {
        lineItemTotals: [],
        itemTotal: 0,
        shippingTotal: 0,
      }
    );
  };

  const { lineItemTotals, itemTotal, shippingTotal } = calculateCartTotals();

  return (
    <div className={cx(styles.CartSidebarContainer, className)}>
      <h3 className={styles.Header}>Order Summary</h3>
      <hr />

      <div className={styles.Items}>
        <span className={styles.ItemsHeader}>Items</span>
        <ul className={styles.LineItemTotalList}>
          {lineItemTotals.map((total) => {
            return (
              <li key={total.productId} className={styles.LineItemTotal}>
                <div>{`${total.label} x${total.quantity}`}</div>
                <div>{CurrencyHelper.formatCurrency(total.price)}</div>
              </li>
            );
          })}
        </ul>
      </div>

      <hr />
      <div className={styles.Totals}>
        <div className={styles.SubTotal}>
          <div>Item Subtotal:</div>
          <div>{CurrencyHelper.formatCurrency(itemTotal)}</div>
        </div>
        <div className={styles.ShippingTotal}>
          <div>Shipping Total:</div>
          <div>{CurrencyHelper.formatCurrency(shippingTotal)}</div>
        </div>
      </div>
      <div className={styles.GrandTotal}>
        <div>Grand Total: </div>
        <div>{CurrencyHelper.formatCurrency(itemTotal + shippingTotal)}</div>
      </div>
      <div className={styles.CheckoutButtonContainer}>
        <Button primary className={styles.CheckoutButton}>
          Check Out
        </Button>
      </div>
    </div>
  );
};

export default CartSidebar;
