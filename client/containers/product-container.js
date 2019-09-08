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
import ImageCarousel from '../components/image-carousel-v2/image-carousel';

import styles from './product-container.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

const ProductContainer = ({ getProduct, loading, match, product }) => {
  useStyles(styles);
  const productId = get(match, 'params.productId');

  useEffect(() => {
    getProduct(productId);
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
};

// TODO: How to get url params on server render data load?
