import React from 'react';
import cx from 'classnames';

// Components
import TextInput from '../form/text-input';
import SelectInput from '../form/select-input';

// Constants
import PRODUCTS from 'constants/product-contants';

// Styles
import styles from './edit-product-details.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

const EditProductDetails = ({ onChange, invalidFields, ...props }) => {
  useStyles(styles);

  return (
    <div className={cx(styles.EditProductDetailsContainer, 'flex flex-dir-col')}>
      <TextInput
        className="mt-2"
        fieldName="title"
        onChange={onChange}
        label="Product Title"
        value={props.title}
        {...invalidFields['title']}
      />
      <TextInput
        className="mt-2"
        label="Etsy URL"
        fieldName="etsyUrl"
        onChange={onChange}
        value={props.etsyUrl}
        {...invalidFields['etsyUrl']}
      />

      <div className={cx(styles.TextInputRow, 'mt-3 flex flex-dir-row justify-content-between')}>
        <SelectInput
          className={styles.Input}
          fieldName="type"
          label="Product Type"
          value={props.type || PRODUCTS.types[0].value}
          onChange={onChange}
          options={PRODUCTS.types}
        />
        <SelectInput
          className={styles.Input}
          fieldName="defaultColor"
          label="Default Color"
          value={props.defaultColor || PRODUCTS.chalkboards.stains[0].value}
          onChange={onChange}
          options={PRODUCTS.chalkboards.stains}
        />
        <SelectInput
          className={styles.Input}
          fieldName="includeShippingInPrice"
          label="Include Shipping"
          value={props.includeShippingInPrice || PRODUCTS.includeShippingInPrice[0].value}
          onChange={onChange}
          options={PRODUCTS.includeShippingInPrice}
        />
      </div>

      <h5 className="mt-4">Pricing</h5>
      <div className={cx(styles.TextInputRow, 'flex flex-dir-row justify-content-between')}>
        <TextInput
          className={styles.Input}
          label="Price"
          fieldName="price"
          onChange={onChange}
          value={props.price}
          {...invalidFields['price']}
        />
        <TextInput
          className={styles.Input}
          label="Cost"
          fieldName="cost"
          onChange={onChange}
          value={props.cost}
          {...invalidFields['cost']}
        />
        <TextInput
          className={styles.Input}
          label="Shipping"
          fieldName="shipping"
          onChange={onChange}
          value={props.shipping}
          {...invalidFields['shipping']}
        />
      </div>

      <h5 className="mt-4">Dimensions</h5>
      <div className={cx(styles.TextInputRow, 'flex flex-dir-row justify-content-between')}>
        <TextInput
          className={styles.Input}
          label="Length"
          fieldName="length"
          onChange={onChange}
          value={props.length}
          {...invalidFields['length']}
        />
        <TextInput
          className={styles.Input}
          label="Width"
          fieldName="width"
          onChange={onChange}
          value={props.width}
          {...invalidFields['width']}
        />
        <TextInput
          className={styles.Input}
          label="Frame Width"
          fieldName="frameWidth"
          onChange={onChange}
          value={props.frameWidth}
          {...invalidFields['frameWidth']}
        />
      </div>
    </div>
  );
};

export default EditProductDetails;
