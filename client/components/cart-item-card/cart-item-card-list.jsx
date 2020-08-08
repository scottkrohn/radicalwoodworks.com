import React from 'react';
import CartProductCard from '@components/cart-item-card/cart-item-card';
import useStyles from 'isomorphic-style-loader/useStyles';
import cx from 'classnames';
import styles from './cart-item-card-list.scss';

const CartItemCardList = ({ className, items }) => {
  useStyles(styles);

  return Array.isArray(items) && items.length ? (
    <div className={cx(styles.CartItemCardListContainer, className)}>
      {items.map((item) => {
        return (
          <CartProductCard
            className={styles.CardListItem}
            key={item.getId()}
            item={item}
          />
        );
      })}
    </div>
  ) : null;
};

export default CartItemCardList;
