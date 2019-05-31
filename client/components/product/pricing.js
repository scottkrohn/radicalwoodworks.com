import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from 'client/components/product/pricing.less';
import Product from 'model/product';

// Constants
import IMAGE from 'client/constants/image-constants';

class Pricing extends Component {
  constructor(props) {
    super(props);
  }

  getPriceValue = () => {
    const priceValue = this.props.product.getFinalPrice();
    return `$${priceValue.toFixed(2)}`;
  };

  getShippingValue = () => {
    const shippingValue = this.props.product.getShippingPrice();
    const includeShipping = this.props.product.getIncludeShippingInPrice();
    return (shippingValue > 0 && !includeShipping) ? `$${shippingValue.toFixed(2)}` : 'Free!';
  };

  getAddToCartButton = () => {
    const etsyUrl = this.props.product.getEtsyUrl() || 'https://www.etsy.com/shop/radicalwoodworks/';
    const addToCartButton = IMAGE.getFullUrl(IMAGE.imagePaths.etsyLogo);

    return (
      <a
        href={etsyUrl} target="_blank"
        rel="noopener noreferrer"
      >
        <span className={styles.AddToCartLabel}>Buy on</span>
        <img src={addToCartButton} className={styles.AddToCartImage} />
      </a>
    );
  };

  render = () => {
    return (
      <div className={styles.PricingContainer}>
        <div className={styles.Title}>
          <span>{this.props.product.getTitle()}</span>
        </div>
        <div className={styles.Price}>
          <span className={styles.PriceLabel}>Price: </span>
          <span className={styles.PriceValue}>{this.getPriceValue()}</span>
        </div>
        <div className={styles.Shipping}>
          <span className={styles.ShippingLabel}>Shipping: </span>
          <span className={styles.ShippingValue}>{this.getShippingValue()}</span>
        </div>
        <div className={styles.AddToCart}>
          <span>{this.getAddToCartButton()}</span>
        </div>
      </div>
    );
  };
}

Pricing.propTypes = {
  product: PropTypes.instanceOf(Product),
};

export default Pricing;
