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
import { Link, withRouter } from 'react-router-dom';
import { createOrUpdateOrder } from '@actions/order-actions';
import { getLoading as getOrderLoading } from '@selectors/order-selectors';

const CartPage = ({
  addOrUpdateCartItem,
  cart,
  clearCart,
  createOrUpdateOrder,
  getCartById,
  history,
  loading,
}) => {
  const [cartLoaded, setCartLoaded] = useState(false);
  const items = isEmpty(cart) ? [] : cart.getItems();
  useStyles(styles);

  useEffect(() => {
    const cartId = cart ? cart.getId() : null;
    getCartById(cartId, true).then(() => setCartLoaded(true));
  }, []);

  const handleCheckout = () => {
    createOrUpdateOrder(cart.getId()).then(() => {
      history.push('/checkout');
    });
  };

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
                cart={cart}
                className={styles.CartSidebar}
                clearCart={clearCart}
                handleCheckout={handleCheckout}
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
  return {
    cart: selectCart(state),
    loading: getLoading(state) || getOrderLoading(state),
  };
};

const mapActionsToProps = {
  addOrUpdateCartItem,
  clearCart,
  createOrUpdateOrder,
  getCartById,
};

export default {
  component: connect(mapStateToProps, mapActionsToProps)(withRouter(CartPage)),
};
