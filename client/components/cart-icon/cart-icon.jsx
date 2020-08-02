import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import useStyles from 'isomorphic-style-loader/useStyles';

import styles from './cart-icon.scss';

const CartIcon = ({ itemCount }) => {
  useStyles(styles);
  return (
    <div className={styles.CartIconContainer}>
      <Link to="/cart">
        <FontAwesomeIcon className={styles.CartIcon} icon={faShoppingCart} />
        {itemCount && itemCount > 0 ? (
          <div className={styles.CartCountContainer}>
            <div className={styles.CountNumber}>{itemCount}</div>
          </div>
        ) : null}
      </Link>
    </div>
  );
};

export default CartIcon;
