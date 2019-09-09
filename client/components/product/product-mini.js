import React, { Component } from 'react';
import { get, isEmpty } from 'lodash';

// Constants
import IMAGE from 'constants/image-constants';

// Styles
import styles from 'components/product/product-mini.less';
import useStyles from 'isomorphic-style-loader/useStyles';
import { Link } from 'react-router-dom';

const ProductMini = ({ product }) => {
  useStyles(styles);
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
          <div className={styles.NoImage}>{/* TODO: Need to use a non-antd icon here to indicate no image. */}</div>
        )}
      </div>
    );
  };

  const renderPrice = () => {
    if (!product) {
      return '';
    }

    const priceString = product.getFinalPrice();
    return <div className={styles.Price}>${priceString.toFixed(2)}</div>;
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
      <Link
        to={productPageLink}
        className={styles.Link}
      >
        {renderImage()}
        {renderTitle()}
        {renderPrice()}
      </Link>
    </div>
  );
};

export default ProductMini;
