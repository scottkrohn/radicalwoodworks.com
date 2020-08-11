import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';
import cx from 'classnames';

// Actions
import { getProduct } from 'client/actions/product-actions';
import { addOrUpdateCartItem, createCart } from 'client/actions/cart-actions';

// Selectors
import {
  getProduct as getProductSelector,
  getLoading,
} from 'client/selectors/product-selectors';
import {
  selectCart,
  getLoading as getCartLoading,
} from 'client/selectors/cart-selectors';

// Component
import Pricing from '@components/product/pricing';
import ItemInfo from '@components/product/item-info';
import Spinner from '@components/spinner/spinner';
import ImageCarousel from '@components/image-carousel/image-carousel';

// Styles
import styles from './product-page.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

const ProductContainer = ({
  addOrUpdateCartItem,
  cart,
  createCart,
  getProduct,
  loading,
  match,
  product,
}) => {
  useStyles(styles);
  const productId = get(match, 'params.productId');

  useEffect(() => {
    if (isEmpty(product) || product.getId() != productId) {
      getProduct(productId);
    }
  }, []);

  const handleAddToCart = (product, quantity) => {
    if (isEmpty(cart)) {
      createCart(product.getId(), quantity);
    } else {
      addOrUpdateCartItem(cart.getId(), product.getId(), quantity);
    }
  };

  const productLoaded = !isEmpty(product);

  return (
    <div className={cx(styles.ProductContainer, 'container-fluid mt-1')}>
      <Spinner spinning={loading}>
        {productLoaded &&
          parseInt(product.getId(), 10) === parseInt(productId, 10) && (
            <Fragment>
              <div className={styles.ImagePricingSection}>
                <ImageCarousel
                  className={cx(styles.ImageCarousel)}
                  images={product.getImages()}
                />
                <Pricing
                  className={styles.Pricing}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              </div>
              <hr />
              <ItemInfo product={product} />
            </Fragment>
          )}
      </Spinner>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    product: getProductSelector(state),
    loading: getLoading(state) || getCartLoading(state),
    cart: selectCart(state),
  };
};

ProductContainer.propTypes = {
  loading: PropTypes.bool,
};

const mapActionsToProps = {
  addOrUpdateCartItem,
  createCart,
  getProduct,
};

export default {
  component: connect(mapStateToProps, mapActionsToProps)(ProductContainer),
  loadData: (store, pathParts) => {
    const productId =
      pathParts.length === 3 ? parseInt(pathParts[2], 10) : null;
    return productId !== null
      ? store.dispatch(getProduct(productId))
      : Promise.resolve();
  },
};
