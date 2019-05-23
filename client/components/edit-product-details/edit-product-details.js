import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Components
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

// Styles
import styles from 'client/components/edit-product-details/edit-product-details.less';

class EditPricingTitle extends PureComponent {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <div className={styles.EditProductDetailsContainer}>
        <div className={styles.SectionHeader}>Product Info</div>
        <TextField
          id="title"
          className={styles.Input}
          label="Title"
          value={this.props.title}
          onChange={this.props.onChange('title')}
          variant="outlined"
        />

        <TextField
          id="etsyUrl"
          className={styles.Input}
          label="Etsy URL"
          value={this.props.etsyUrl}
          onChange={this.props.onChange('etsyUrl')}
          variant="outlined"
        />

        <div className={styles.Row}>
          <FormControl className={styles.Select}>
            <InputLabel htmlFor="select-type">Product Type</InputLabel>
            <Select
              value={this.props.type}
              onChange={this.props.onChange('type')}
              inputProps={{
                name: 'type',
                id: 'type-select',
              }}
            >
              <MenuItem value="SCONCE">Sconce</MenuItem>
              <MenuItem value="CHALKBOARD">Chalkboard</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={styles.Select}>
            <InputLabel htmlFor="select-defaultColor">Default Color</InputLabel>
            <Select
              value={this.props.defaultColor}
              onChange={this.props.onChange('defaultColor')}
              inputProps={{
                name: 'defaultColor',
                id: 'type-defaultColor',
              }}
            >
              <MenuItem value={'EBONY'}>Ebony</MenuItem>
              <MenuItem value={'CHERRY'}>Cherry</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={styles.Select}>
            <InputLabel htmlFor="select-includeShippingInPrice">Include Shipping In Price</InputLabel>
            <Select
              value={this.props.includeShippingInPrice}
              onChange={this.props.onChange('includeShippingInPrice')}
              inputProps={{
                name: 'includeShippingInPrice',
                id: 'type-includeShippingInPrice',
              }}
            >
              <MenuItem value={1}>Yes</MenuItem>
              <MenuItem value={0}>No</MenuItem>
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
            value={parseFloat(this.props.price)}
            onChange={this.props.onChange('price')}
            variant="outlined"
          />
          <TextField
            id="cost"
            className={styles.Input}
            label="Cost"
            type="number"
            value={parseFloat(this.props.cost)}
            onChange={this.props.onChange('cost')}
            variant="outlined"
          />
          <TextField
            id="shipping"
            className={styles.Input}
            label="Shipping"
            type="number"
            value={parseFloat(this.props.shipping)}
            onChange={this.props.onChange('shipping')}
            variant="outlined"
          />
        </div>

        <div className={styles.SectionHeader}>Dimensions</div>
        <div className={styles.Row}>
          <TextField
            id="length"
            className={styles.Input}
            label="Length"
            type="number"
            value={this.props.length}
            onChange={this.props.onChange('length')}
            variant="outlined"
          />
          <TextField
            id="width"
            className={styles.Input}
            label="Width"
            type="number"
            value={this.props.width}
            onChange={this.props.onChange('width')}
            variant="outlined"
          />
          <TextField
            id="frameWidth"
            className={styles.Input}
            label="Frame Width"
            type="number"
            value={this.props.frameWidth}
            onChange={this.props.onChange('frameWidth')}
            variant="outlined"
          />
        </div>
      </div>
    );
  };
}

EditPricingTitle.propTypes = {
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
};

export default EditPricingTitle;
