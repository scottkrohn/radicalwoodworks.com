import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './cart-sidebar.scss';
import cx from 'classnames';
import Button from '@components/button/button';
import CurrencyHelper from '@helpers/currency-helper';
import Modal, { ModalContent, ModalTrigger } from '@components/modal/modal';

const CartSidebar = ({ items, cartId, className, clearCart }) => {
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
      <div className={styles.CartSidebarBox}>
        <h3 className={styles.Header}>Order Summary</h3>
        <hr />
        <div className={styles.Items}>
          <div className="flex justify-content-between align-items-center">
            <div className={styles.ItemsHeader}>Items</div>
            <Modal>
              <ModalTrigger>
                {({ show, hide }) => {
                  return (
                    <button className={styles.ClearButton} onClick={show}>
                      Empty Cart
                    </button>
                  );
                }}
              </ModalTrigger>
              <ModalContent>
                {({ hide }) => {
                  return (
                    <div className={'flex flex-dir-col'}>
                      Are you sure you want to remove all items from your cart?
                      <div className="mt-4 flex justify-content-evenly">
                        <Button
                          className="flex-basis-33"
                          danger
                          onClick={() => {
                            clearCart(cartId);
                          }}
                        >
                          Yes
                        </Button>
                        <Button className="flex-basis-33" onClick={hide}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  );
                }}
              </ModalContent>
            </Modal>
          </div>
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
    </div>
  );
};

export default CartSidebar;
