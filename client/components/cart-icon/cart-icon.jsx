import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import styles from './cart-icon.module.scss';

const CartIcon = ({ itemCount }) => {

  return (
    <div className={styles.CartIconContainer}>
      <Link href="/cart">
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
