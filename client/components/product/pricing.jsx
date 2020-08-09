import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from '@components/product/pricing.scss';
import useStyles from 'isomorphic-style-loader/useStyles';
import Product from 'model/product';
import Button from '@components/button/button';
import SelectInput from '@forms/select-input';

import CurrencyHelper from '@helpers/currency-helper';
import IMAGE from 'client/constants/image-constants';
import PRODUCT from '@constants/product-contants';

const Pricing = ({ className, onAddToCart, product }) => {
  const [quantity, setQuantity] = useState(1);
  useStyles(styles);
  const getPriceValue = () => {
    const priceValue = product.getFinalPrice();
    return CurrencyHelper.formatCurrency(priceValue);
  };

  const getShippingValue = () => {
    const shippingValue = product.getShippingPrice();
    const includeShipping = product.getIncludeShippingInPrice();
    return shippingValue > 0 && !includeShipping
      ? CurrencyHelper.formatCurrency(shippingValue)
      : 'Free!';
  };

  const getEtsyButton = () => {
    const etsyUrl =
      product.getEtsyUrl() || 'https://www.etsy.com/shop/radicalwoodworks/';
    const etsyLogo = IMAGE.getFullUrl(IMAGE.imagePaths.etsyLogo);

    return (
      <a
        href={etsyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.AddToCartLink}
      >
        <span className={styles.EtsyLabel}>Buy on</span>
        <img src={etsyLogo} className={styles.EtsyImage} />
      </a>
    );
  };

  const handleQuantityChange = (name) => (event) => {
    setQuantity(parseInt(event.target.value));
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
        <Button
          className={styles.AddToCartButton}
          primary
          onClick={() => onAddToCart(product, quantity)}
        >
          Add To Cart
        </Button>
        <SelectInput
          className={styles.QuantityInput}
          label="QTY"
          value={quantity}
          onChange={handleQuantityChange}
          options={PRODUCT.quantity}
        />
      </div>
      <div className={styles.OrHeader}>- OR -</div>
      <div className={styles.EtsyButton}>
        <span>{getEtsyButton()}</span>
      </div>
    </div>
  );
};

Pricing.propTypes = {
  product: PropTypes.instanceOf(Product),
  onAddToCart: PropTypes.func,
};

export default Pricing;
