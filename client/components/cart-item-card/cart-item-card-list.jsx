import React from 'react';
import CartProductCard from '@components/cart-item-card/cart-item-card';

import cx from 'classnames';
import styles from './cart-item-card-list.scss';

const CartItemCardList = ({ cartId, className, items, updateCartItem }) => {
  

  return Array.isArray(items) && items.length ? (
    <div className={cx(styles.CartItemCardListContainer, className)}>
      {items.map((item) => {
        return (
          <CartProductCard
            className={styles.CardListItem}
            key={item.getId()}
            item={item}
            updateCartItem={updateCartItem}
            cartId={cartId}
          />
        );
      })}
    </div>
  ) : null;
};

export default CartItemCardList;
