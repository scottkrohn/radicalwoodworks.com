import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isNull } from 'lodash';

// Components
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

// Styles
import styles from 'client/components/edit-product-details/edit-product-details.less';

// Constants
import PRODUCTS from 'constants/product-contants';

class EditProductDetails extends PureComponent {
  constructor(props) {
    super(props);
  }

  renderDropdownOptions = (options) => {
    const menuOptions = [];
    if (Array.isArray(options)) {
      options.forEach((option) => {
        menuOptions.push(
          <MenuItem
            key={option.value} value={option.value}
          >
            <span className={styles.MenuOption}>{option.label}</span>
          </MenuItem>
        );
      });
    }

    return menuOptions;
  };

  render = () => {
    return (
      <div className={styles.EditProductDetailsContainer}>
        <div className={styles.SectionHeader}>Product Info</div>
        <TextField
          id="title"
          className={styles.Input}
          label="Title"
          value={this.props.title || ''}
          onChange={this.props.onChange('title')}
          variant="outlined"
          error={this.props.invalidFields.includes('title')}
          required
        />

        <TextField
          id="etsyUrl"
          className={styles.Input}
          label="Etsy URL"
          value={this.props.etsyUrl || ''}
          onChange={this.props.onChange('etsyUrl')}
          variant="outlined"
          error={this.props.invalidFields.includes('etsyUrl')}
          required
        />

        <div className={styles.Row}>
          <FormControl className={styles.Select}>
            <InputLabel htmlFor="select-type">Product Type</InputLabel>
            <Select
              value={this.props.type || ''}
              onChange={this.props.onChange('type')}
              inputProps={{
                name: 'type',
                id: 'type-select',
              }}
              error={this.props.invalidFields.includes('type')}
              required
            >
              {this.renderDropdownOptions(PRODUCTS.types)}
            </Select>
          </FormControl>

          <FormControl className={styles.Select}>
            <InputLabel htmlFor="select-defaultColor">Default Color</InputLabel>
            <Select
              value={this.props.defaultColor || ''}
              onChange={this.props.onChange('defaultColor')}
              inputProps={{
                name: 'defaultColor',
                id: 'type-defaultColor',
              }}
              error={this.props.invalidFields.includes('defaultColor')}
              required
            >
              {this.renderDropdownOptions(PRODUCTS.chalkboards.stains)}
            </Select>
          </FormControl>

          <FormControl className={styles.Select}>
            <InputLabel htmlFor="select-includeShippingInPrice">Include Shipping</InputLabel>
            <Select
              value={!isNull(this.props.includeShippingInPrice) ? this.props.includeShippingInPrice : ''}
              onChange={this.props.onChange('includeShippingInPrice')}
              inputProps={{
                name: 'includeShippingInPrice',
                id: 'type-includeShippingInPrice',
              }}
              error={this.props.invalidFields.includes('includeShippingInPrice')}
              required
            >
              {this.renderDropdownOptions(PRODUCTS.includeShippingInPrice)}
            </Select>
          </FormControl>
        </div>

        <div className={styles.SectionHeader}>Pricing</div>
        <div className={styles.Row}>
          <TextField
            id="price"
            className={styles.Input}
            label="Price"
            type="number"
            value={this.props.price ? parseFloat(this.props.price) : ''}
            onChange={this.props.onChange('price')}
            variant="outlined"
            error={this.props.invalidFields.includes('price')}
            required
          />
          <TextField
            id="cost"
            className={styles.Input}
            label="Cost"
            type="number"
            value={this.props.cost ? parseFloat(this.props.cost) : ''}
            onChange={this.props.onChange('cost')}
            variant="outlined"
            error={this.props.invalidFields.includes('cost')}
            required
          />
          <TextField
            id="shipping"
            className={styles.Input}
            label="Shipping"
            type="number"
            value={this.props.shipping ? parseFloat(this.props.shipping) : ''}
            onChange={this.props.onChange('shipping')}
            variant="outlined"
            error={this.props.invalidFields.includes('shipping')}
            required
          />
        </div>

        <div className={styles.SectionHeader}>Dimensions</div>
        <div className={styles.Row}>
          <TextField
            id="length"
            className={styles.Input}
            label="Length"
            type="number"
            value={this.props.length || ''}
            onChange={this.props.onChange('length')}
            variant="outlined"
            error={this.props.invalidFields.includes('length')}
            required
          />
          <TextField
            id="width"
            className={styles.Input}
            label="Width"
            type="number"
            value={this.props.width || ''}
            onChange={this.props.onChange('width')}
            variant="outlined"
            error={this.props.invalidFields.includes('width')}
            required
          />
          <TextField
            id="frameWidth"
            className={styles.Input}
            label="Frame Width"
            type="number"
            value={this.props.frameWidth || ''}
            onChange={this.props.onChange('frameWidth')}
            variant="outlined"
          />
        </div>
      </div>
    );
  };
}

EditProductDetails.propTypes = {
  onChange: PropTypes.func,
  title: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  shipping: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  cost: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  includeShippingInPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  length: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  frameWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  defaultColor: PropTypes.string,
  etsyUrl: PropTypes.string,
  type: PropTypes.string,
  invalidFields: PropTypes.array,
};

export default EditProductDetails;
