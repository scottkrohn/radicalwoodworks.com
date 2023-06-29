import React, { Component } from 'react';
import { get, isEmpty } from 'lodash';

// Constants
import IMAGE from 'constants/image-constants';

import MissingImage from '@components/missing-image/missing-image';
import Button from '@components/button/button';

// Styles
import styles from 'components/product/product-mini.less';

import { Link } from 'react-router-dom';
import CurrencyHelper from '@helpers/currency-helper';

const ProductMini = ({ onAddToCart, product }) => {
  
  // For now this just grabs the first image.
  const getMainImageUrl = () => {
    if (!product) {
      return null;
    }

    const images = product.getImages();
    let image = null;
    if (!isEmpty(images)) {
      image = images.find((image) => {
        return image.getIsPrimary();
      });

      // Fallback to first image if nothing is marked primary.
      if (!image) {
        image = get(images, '[0]', null);
      }
    }

    return image ? image.getThumbUrl() : null;
  };

  const renderImage = () => {
    const imageUrl = getMainImageUrl();

    return (
      <div>
        {imageUrl ? (
          <div className={styles.ImageWrap}>
            <img
              className={styles.ProductImage}
              src={IMAGE.getFullUrl(imageUrl)}
            />
          </div>
        ) : (
          <div className={styles.NoImage}>
            <MissingImage />
          </div>
        )}
      </div>
    );
  };

  const renderPrice = () => {
    if (!product) {
      return '';
    }

    return (
      <div className={styles.Price}>
        {CurrencyHelper.formatCurrency(product.getFinalPrice())}
      </div>
    );
  };

  const renderTitle = () => {
    if (!product) {
      return '';
    }

    return <div className={styles.ProductTitle}>{product.getTitle()}</div>;
  };

  const productPageLink = `/products/product/${product.getId()}`;

  return (
    <div className={styles.ProductMiniContainer}>
      <Link to={productPageLink} className={styles.Link}>
        {renderImage()}
        {renderTitle()}
        {renderPrice()}
      </Link>
      <div className={styles.AddToCart}>
        <Button
          className={styles.AddToCartButton}
          primary
          onClick={() => onAddToCart(product, 1)}
        >
          Add To Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductMini;
