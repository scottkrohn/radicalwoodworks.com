import { isEmpty } from 'lodash';
import React, { useEffect, useState, Fragment } from 'react';
import {
  clearCart,
  getCartById,
  addOrUpdateCartItem,
} from '@actions/cart-actions';
import { connect } from 'react-redux';
import { getLoading, selectCart } from '@selectors/cart-selectors';
import PageHeader from '@components/page-header/page-header';
import CartItemCardList from '@components/cart-item-card/cart-item-card-list';
import CartSidebar from '@components/cart-sidebar/cart-sidebar';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './cart-page.scss';
import cx from 'classnames';
import Spinner from '@components/spinner/spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadTear } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const CartPage = ({
  addOrUpdateCartItem,
  cart,
  clearCart,
  getCartById,
  loading,
}) => {
  const [cartLoaded, setCartLoaded] = useState(false);
  const items = isEmpty(cart) ? [] : cart.getItems();
  useStyles(styles);

  useEffect(() => {
    const cartId = cart ? cart.getId() : null;
    getCartById(cartId, true).then(() => setCartLoaded(true));
  }, []);

  return (
    <div className={cx(styles.CartPageContainer, 'container-fluid')}>
      <Spinner spinning={loading} />
      <PageHeader headerText="Cart" showButton={false} />
      {cartLoaded && (
        <Fragment>
          {Array.isArray(items) && items.length ? (
            <div className={styles.CartPageBody}>
              <CartItemCardList
                className={styles.CartCards}
                items={items}
                updateCartItem={addOrUpdateCartItem}
                cartId={cart.getId()}
              />
              <CartSidebar
                items={items}
                className={styles.CartSidebar}
                clearCart={clearCart}
                cartId={cart.getId()}
              />
            </div>
          ) : (
            <div className={styles.EmptyCart}>
              <h4>
                Your cart is empty
                <FontAwesomeIcon className={styles.SadFace} icon={faSadTear} />
              </h4>
              <p className={styles.GoToProducts}>
                Head over the <Link to="/products">products</Link> page and add
                something awesome to your cart!
              </p>
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { cart: selectCart(state), loading: getLoading(state) };
};

const mapActionsToProps = {
  addOrUpdateCartItem,
  clearCart,
  getCartById,
};

export default {
  component: connect(mapStateToProps, mapActionsToProps)(CartPage),
};
