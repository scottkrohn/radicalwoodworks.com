import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './cart-item-card.scss';
import cx from 'classnames';
import IMAGE from '@constants-client/image-constants';
import MissingImage from '@components/missing-image/missing-image';
import { Link } from 'react-router-dom';
import CurrencyHelper from '@helpers/currency-helper';
import SelectInput from '@forms/select-input';
import PRODUCT from '@constants/product-contants';
import Modal, { ModalContent, ModalTrigger } from '@components/modal/modal';
import Button from '@components/button/button';

const CartItemCard = ({ cartId, className, item, updateCartItem }) => {
  useStyles(styles);

  const getImage = () => {
    const imageUrl = item.getProduct().getPrimaryImageUrl();

    return imageUrl ? (
      <img src={IMAGE.getFullUrl(imageUrl)} className={styles.Image} />
    ) : (
      <MissingImage className={styles.MissingImage} />
    );
  };

  const handleQuantityChange = (name) => (event) => {
    const newQuantity = event.target.value;
    const quantityDiff = newQuantity - item.getQuantity();

    if (quantityDiff !== 0) {
      updateCartItem(cartId, item.getProductId(), quantityDiff);
    }
  };

  const handleRemoveItem = () => {
    updateCartItem(cartId, item.getProductId(), -item.getQuantity());
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

        <div className={styles.ItemInfoBody}>
          <div className="flex-grow-2">
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
          </div>

          <div className="flex-grow">
            <SelectInput
              className={styles.QuantityInput}
              label="QTY"
              value={item.getQuantity()}
              onChange={handleQuantityChange}
              options={PRODUCT.quantity}
            />
            <Modal>
              <ModalTrigger>
                {({ show, hide }) => {
                  return (
                    <button className={styles.RemoveItemButton} onClick={show}>
                      Remove
                    </button>
                  );
                }}
              </ModalTrigger>
              <ModalContent>
                {({ hide }) => {
                  return (
                    <div className={'flex flex-dir-col'}>
                      Are you sure you want to remove this item from your cart?
                      <div className="mt-4 flex justify-content-evenly">
                        <Button
                          className="flex-basis-33"
                          danger
                          onClick={() => {
                            handleRemoveItem();
                            hide();
                          }}
                        >
                          Yes
                        </Button>
                        <Button className="flex-basis-33" onClick={hide}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  );
                }}
              </ModalContent>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
