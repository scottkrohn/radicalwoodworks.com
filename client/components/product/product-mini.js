import React, { Component } from 'react';
import { get, isEmpty } from 'lodash';
import { Icon } from 'antd';

// Constants
import IMAGE from 'constants/image-constants';

// Styles
import styles from 'components/product/product-mini.less';
import NavLink from 'client/components/nav/nav-link';

class Product extends Component {
  constructor(props) {
    super(props);
  }

  // For now this just grabs the first image.
  getMainImageUrl = () => {
    const product = get(this.props, 'product');

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

  renderImage = () => {
    const imageUrl = this.getMainImageUrl();

    return (
      <div>
        {imageUrl ? (
          <div className={styles.ImageWrap}>
            <img className={styles.ProductImage} src={IMAGE.getFullUrl(imageUrl)} />
          </div>
        ) : (
          <div className={styles.NoImage}>
            <Icon className={styles.NoImageIcon} type="picture" />
          </div>
        )}
      </div>
    );
  };

  renderPrice = () => {
    const product = get(this.props, 'product');

    if (!product) {
      return '';
    }

    const priceString = product.getFinalPrice();
    return <div className={styles.Price}>${priceString}</div>;
  };

  renderTitle = () => {
    const product = get(this.props, 'product');

    if (!product) {
      return '';
    }

    return <div className={styles.ProductTitle}>{product.getTitle()}</div>;
  };

  render = () => {
    const product = get(this.props, 'product');
    const productPageLink = `/products/product/${product.getId()}`;

    return (
      <div className={styles.ProductMiniContainer}>
        <NavLink to={productPageLink} className={styles.ProductContent}>
          {this.renderImage()}
          {this.renderTitle()}
          {this.renderPrice()}
        </NavLink>
      </div>
    );
  };
}

export default Product;
