import React from 'react';
import cx from 'classnames';

// Components
import TextInput from '../form/text-input';

// Styles
import styles from './edit-product-details-v2.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

const EditProductDetails = ({ onChange, product, ...props }) => {
  useStyles(styles);

  return (
    <div className={cx(styles.EditProductDetailsContainer, 'flex flex-dir-col')}>
      <TextInput
        fieldName="title"
        onChange={onChange}
        label="Product Title"
        value={props.title}
      />
      <TextInput
        label="Etsy URL"
        fieldName="etsyUrl"
        onChange={onChange}
        value={props.etsyUrl}
      />

      <div className={cx(styles.TextInputRow, 'flex flex-dir-row justify-content-between')}>
        <TextInput
          className={styles.Input}
          label="Price"
          fieldName="price"
          onChange={onChange}
          value={props.price}
        />
        <TextInput
          className={styles.Input}
          label="Cost"
          fieldName="cost"
          onChange={onChange}
          value={props.cost}
        />
        <TextInput
          className={styles.Input}
          label="Shipping"
          fieldName="shipping"
          onChange={onChange}
          value={props.shipping}
        />
      </div>

      <div className={cx(styles.TextInputRow, 'flex flex-dir-row justify-content-between')}>
        <TextInput
          className={styles.Input}
          label="Length"
          fieldName="length"
          onChange={onChange}
          value={props.length}
        />
        <TextInput
          className={styles.Input}
          label="Width"
          fieldName="width"
          onChange={onChange}
          value={props.width}
        />
        <TextInput
          className={styles.Input}
          label="Frame Width"
          fieldName="frameWidth"
          onChange={onChange}
          value={props.frameWidth}
        />
      </div>
    </div>
  );
};

export default EditProductDetails;
