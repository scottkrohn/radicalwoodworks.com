import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './cart-item-card.scss';
import cx from 'classnames';
import IMAGE from '@constants-client/image-constants';
import MissingImage from '@components/missing-image/missing-image';
import { Link } from 'react-router-dom';
import CurrencyHelper from '@helpers/currency-helper';

const CartItemCard = ({ className, item }) => {
  useStyles(styles);

  const getImage = () => {
    const imageUrl = item.getProduct().getPrimaryImageUrl();

    return imageUrl ? (
      <img src={IMAGE.getFullUrl(imageUrl)} className={styles.Image} />
    ) : (
      <MissingImage className={styles.MissingImage} />
    );
  };

  const product = item.getProduct();
  const isFreeShipping = product.getIncludeShippingInPrice();
  const productPageLink = `/products/product/${product.getId()}`;

  return (
    <div className={cx(className, styles.CartItemCardContainer)}>
      <div className={styles.ImageContainer}>
        <Link to={productPageLink}>{getImage()}</Link>
      </div>
      <div className={styles.ItemInfo}>
        <div className={styles.ItemTitle}>{product.getTitle()}</div>

        <div className={styles.InfoInfoBody}>
          <div className={styles.Price}>
            Price:
            <span className={styles.PriceAmount}>
              {` ${CurrencyHelper.formatCurrency(product.getPrice())}`}
            </span>
          </div>

          <div className={styles.Shipping}>
            Shipping:
            <span
              className={cx({
                [styles.ShippingAmount]: true,
                [styles.FreeShipping]: isFreeShipping,
              })}
            >
              {product.getIncludeShippingInPrice()
                ? ' Free!'
                : ` ${CurrencyHelper.formatCurrency(
                    product.getShippingPrice()
                  )}`}
            </span>
          </div>

          {/* // TODO: Shipping */}
          {/* // TODO: Quantity */}
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
