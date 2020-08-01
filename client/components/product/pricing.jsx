import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from 'client/components/product/pricing.scss';
import useStyles from 'isomorphic-style-loader/useStyles';
import Product from 'model/product';

// Constants
import IMAGE from 'client/constants/image-constants';

const Pricing = ({ className, onAddToCart, product }) => {
  useStyles(styles);
  const getPriceValue = () => {
    const priceValue = product.getFinalPrice();
    return `$${priceValue.toFixed(2)}`;
  };

  const getShippingValue = () => {
    const shippingValue = product.getShippingPrice();
    const includeShipping = product.getIncludeShippingInPrice();
    return shippingValue > 0 && !includeShipping ? `$${shippingValue.toFixed(2)}` : 'Free!';
  };

  const getEtsyButton = () => {
    const etsyUrl = product.getEtsyUrl() || 'https://www.etsy.com/shop/radicalwoodworks/';
    const etsyLogo = IMAGE.getFullUrl(IMAGE.imagePaths.etsyLogo);

    return (
      <a href={etsyUrl} target="_blank" rel="noopener noreferrer" className={styles.AddToCartLink}>
        <span className={styles.AddToCartLabel}>Buy on</span>
        <img src={etsyLogo} className={styles.AddToCartImage} />
      </a>
    );
  };

  return (
    <div className={cx(styles.PricingContainer, className)}>
      <div className={styles.Title}>
        <span>{product.getTitle()}</span>
      </div>
      <div className={styles.Price}>
        <span className={styles.PriceLabel}>Price: </span>
        <span className={styles.PriceValue}>{getPriceValue()}</span>
      </div>
      <div className={styles.Shipping}>
        <span className={styles.ShippingLabel}>Shipping: </span>
        <span className={styles.ShippingValue}>{getShippingValue()}</span>
      </div>
      <div className={styles.AddToCart}>
        <span>{getEtsyButton()}</span>
      </div>

      <div>
        <button onClick={() => onAddToCart(product)}>Add To Cart</button>
      </div>
    </div>
  );
};

Pricing.propTypes = {
  product: PropTypes.instanceOf(Product),
  onAddToCart: PropTypes.func,
};

export default Pricing;
