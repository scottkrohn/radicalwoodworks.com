import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

// Models
import Product from 'model/product';

// Styles
import styles from 'client/components/product/item-info.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

const ItemInfo = ({ product }) => {
  useStyles(styles);
  const renderItemDetails = () => {
    if (!product) {
      return null;
    }

    const defaultColor = product.getDefaultColor();
    const frameWidth = product.getFrameWidth();

    const length = product.getLength();
    const width = product.getWidth();
    const validDimensions = Boolean(length && width);

    const innerLength = length - frameWidth;
    const innerWidth = width - frameWidth;
    const validInnerDimensions = frameWidth && innerLength && innerWidth;

    const defaultColorUi = product.getDefaultColorUi();

    return (
      <ul className={styles.ItemDetailsList}>
        {validDimensions && <li>{`Dimensions: ${length}" x ${width}"`}</li>}
        {validInnerDimensions && <li>{`Inner Dimensions: ${innerLength}" x ${innerWidth}"`}</li>}
        {defaultColor && <li>{`Default Color: ${defaultColorUi}`}</li>}
      </ul>
    );
  };

  return (
    <div className="row">
      <div className="col-lg-9 col-md-12 text-center text-lg-left">
        <div className={styles.Description}>
          <h3 className={styles.DescriptionHeader}>Item Description</h3>
          <div dangerouslySetInnerHTML={{ __html: product.getDescription() }} />
        </div>
      </div>
      <div className="col-lg-3 col-md-12 text-center text-lg-left">
        <div className={styles.HideDesktop}>
          <hr />
        </div>
        <div className={styles.ItemDetails}>
          <h3 className={styles.ItemDetailsHeader}>Details</h3>
          {renderItemDetails()}
        </div>
      </div>
    </div>
  );
};

ItemInfo.propTypes = {
  product: PropTypes.instanceOf(Product),
};

export default ItemInfo;
