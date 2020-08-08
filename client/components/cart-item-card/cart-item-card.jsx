import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './cart-item-card.scss';
import cx from 'classnames';

const CartItemCard = ({ className, item }) => {
  useStyles(styles);

  return (
    <div className={cx(className, styles.CartItemCardContainer)}>
      {item.getProduct().getTitle()}
    </div>
  );
};

export default CartItemCard;
