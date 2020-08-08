import { isEmpty } from 'lodash';
import React, { useEffect, useState, Fragment } from 'react';
import { getCartById } from '@actions/cart-actions';
import { connect } from 'react-redux';
import { selectCart } from '@selectors/cart-selectors';
import PageHeader from '@components/page-header/page-header';
import CartItemCardList from '@components/cart-item-card/cart-item-card-list';
import CartSidebar from '@components/cart-sidebar/cart-sidebar';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './cart-page.scss';
import cx from 'classnames';
import Spinner from '@components/spinner/spinner';

const CartPage = ({ cart, getCartById }) => {
  const [cartLoaded, setCartLoaded] = useState(false);
  const items = isEmpty(cart) ? [] : cart.getItems();
  useStyles(styles);

  useEffect(() => {
    const cartId = cart ? cart.getId() : null;
    getCartById(cartId, true).then(() => setCartLoaded(true));
  }, []);

  return (
    <div className={cx(styles.CartPageContainer, 'container-fluid')}>
      <Spinner spinning={!cartLoaded} />
      <PageHeader headerText="Cart" showButton={false} />
      {cartLoaded && (
        <Fragment>
          {Array.isArray(items) && items.length ? (
            <div className={styles.CartPageBody}>
              <CartItemCardList className={styles.CartCards} items={items} />
              <CartSidebar items={items} className={styles.CartSidebar} />
            </div>
          ) : (
            <div>Cart be empty, yo!</div>
          )}
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { cart: selectCart(state) };
};

const mapActionsToProps = {
  getCartById,
};

export default {
  component: connect(mapStateToProps, mapActionsToProps)(CartPage),
};
