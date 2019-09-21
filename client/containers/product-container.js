import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';
import cx from 'classnames';

// Actions
import { getProduct } from 'client/actions/product-actions';

// Selectors
import { getProduct as getProductSelector, getLoading } from 'client/selectors/product-selectors';

// Component
import Pricing from 'client/components/product/pricing';
import ItemInfo from 'client/components/product/item-info';
import Spinner from '../components/spinner-v2/spinner-v2';
import ImageCarousel from '../components/image-carousel/image-carousel';

import styles from './product-container.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

const ProductContainer = ({ getProduct, loading, match, product, location }) => {
  useStyles(styles);
  const productId = get(match, 'params.productId');

  useEffect(() => {
    if (isEmpty(product) || product.getId() != productId) {
      getProduct(productId);
    }
  }, []);

  const productLoaded = !isEmpty(product);

  return (
    <div className={cx(styles.ProductContainer, 'container-fluid mt-1')}>
      <Spinner spinning={loading}>
        {productLoaded && parseInt(product.getId(), 10) === parseInt(productId, 10) && (
          <Fragment>
            <div className="flex">
              <ImageCarousel
                className={cx(styles.ImageCarousel, 'flex-basis-50')}
                images={product.getImages()}
              />
              <Pricing
                className="flex-basis-50"
                product={product}
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
    loading: getLoading(state),
  };
};

ProductContainer.propTypes = {
  loading: PropTypes.bool,
};

const mapActionsToProps = {
  getProduct,
};

export default {
  component: connect(
    mapStateToProps,
    mapActionsToProps
  )(ProductContainer),
  loadData: (store, pathParts) => {
    const productId = pathParts.length === 3 ? parseInt(pathParts[2], 10) : null;
    return productId !== null ? store.dispatch(getProduct(productId)) : Promise.resolve();
  },
};
