import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';

// Actions
import { getProduct } from 'client/actions/product-actions';

// Selectors
import { getProduct as getProductSelector, getLoading } from 'client/selectors/product-selectors';

// Component
import ImagePricingSection from 'client/components/product/image-pricing-section';
import ItemInfo from 'client/components/product/item-info';

import ImageCarousel from '../components/image-carousel-v2/image-carousel';

class ProductContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    const productId = get(this.props, 'match.params.productId');
    this.props.getProduct(productId);
  };

  render = () => {
    const product = get(this.props, 'product', null);
    const productLoaded = !isEmpty(product);

    if (product && product.getImages) {
      console.log(JSON.stringify(product.getImages()));
    }

    return (
      <div className="container-fluid">
        HELLO
        {/* {productLoaded && <ImagePricingSection product={product} />} */}
        {productLoaded && <ImageCarousel images={product.getImages()} />}
        <hr />
        {productLoaded && <ItemInfo product={product} />}
      </div>
    );
  };
}

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
