import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './cart-sidebar.scss';
import cx from 'classnames';

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
        <ul className={styles.LineItemTotalList}>
          {lineItemTotals.map((total) => {
            return (
              <li className={styles.LineItemTotal}>
                <div>{`${total.label} x${total.quantity}`}</div>
                <div>{total.price}</div>
              </li>
            );
          })}
        </ul>
      </div>

      <hr />
      <div className={styles.Totals}>
        <div className={styles.SubTotal}>
          <div>Item Subtotal:</div>
          <div>{itemTotal}</div>
        </div>
        <div className={styles.ShippingTotal}>
          <div>Shipping Total:</div>
          <div>{shippingTotal}</div>
        </div>
      </div>
      <div className={styles.GrandTotal}>
        <div>Grand Total: </div>
        <div>{itemTotal + shippingTotal}</div>
      </div>
    </div>
  );
};

export default CartSidebar;
