import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, isNull, isEmpty } from 'lodash';

// Components
import EditImages from 'client/components/edit-images/edit-images';
import EditProductDetails from 'client/components/edit-product-details/edit-product-details';
import EditDescription from 'client/components/edit-description/edit-description';
import Spinner from 'client/components/spinner/spinner';
import Snackbar from '@material-ui/core/Snackbar';
import Button from 'client/components/base/button/button';

// Actions
import { verifyLogin } from 'client/actions/admin-actions';
import { getProduct } from 'client/actions/product-actions';

// Selectors
import { getProduct as getProductSelector, getLoading } from 'client/selectors/product-selectors';
import { getUploading } from 'client/selectors/image-upload-selector';

// HOCs
import { withValidation } from 'client/hoc/auth';

class AdminProductContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNotification: false,
      notificationMessage: '',

      updatedProduct: {
        description: null,
        title: null,
        price: null,
        shipping: null,
        includeShippingInPrice: null,
        length: null,
        width: null,
        defaultColor: null,
        frameWidth: null,
        etsyUrl: null,
        cost: null,
        type: null,
      },
    };
  }

  componentDidMount = () => {
    (async () => {
      try {
        await this.props.verifyLogin();
      } catch (error) {
        this.props.redirectToHome();
      }

      const productId = get(this.props, 'match.params.productId');
      await this.props.getProduct(productId);
    })();
  };

  onImageUpload = (image) => {
    const productId = get(this.props, 'match.params.productId');
    this.props.getProduct(productId);
    this.handleShowNotification('Image successfully uploaded!');
  };

  handleShowNotification = (message) => {
    this.setState({
      showNotification: true,
      notificationMessage: message,
    });
  };

  handleHideNotification = () => {
    this.setState({
      showNotification: false,
    });
  };

  handleDescriptionChange = (value) => {
    this.setState({
      updatedProduct: {
        ...this.state.updatedProduct,
        description: value,
      },
    });
  };

  handleSave = () => {
    console.log('Saving: ', this.state.updatedProduct);
  };

  handleInputChange = (name) => (event) => {
    this.setState({
      updatedProduct: {
        ...this.state.updatedProduct,
        [name]: event.target.value,
      },
    });
  };

  getProductInformation = () => {
    const updatedProduct = this.state.updatedProduct;
    const productLoaded = !isEmpty(this.props.product);

    const origDescription = productLoaded ? this.props.product.getDescription() : '';
    const description = isNull(updatedProduct.description) ? origDescription : updatedProduct.description;

    const origTitle = productLoaded ? this.props.product.getTitle() : '';
    const title = isNull(updatedProduct.title) ? origTitle : updatedProduct.title;

    const origPrice = productLoaded ? this.props.product.getPrice() : '';
    const price = isNull(updatedProduct.price) ? origPrice : updatedProduct.price;

    const origType = productLoaded ? this.props.product.getType() : '';
    const type = isNull(updatedProduct.type) ? origType : updatedProduct.type;

    const origCost = productLoaded ? this.props.product.getCost() : '';
    const cost = isNull(updatedProduct.cost) ? origCost : updatedProduct.cost;

    const origShipping = productLoaded ? this.props.product.getShippingPrice() : '';
    const shipping = isNull(updatedProduct.shipping) ? origShipping : updatedProduct.shipping;

    const origEtsyUrl = productLoaded ? this.props.product.getEtsyUrl() : '';
    const etsyUrl = isNull(updatedProduct.etsyUrl) ? origEtsyUrl : updatedProduct.etsyUrl;

    const origLength = productLoaded ? this.props.product.getLength() : '';
    const length = isNull(updatedProduct.length) ? origLength : updatedProduct.length;

    const origWidth = productLoaded ? this.props.product.getWidth() : '';
    const width = isNull(updatedProduct.width) ? origWidth : updatedProduct.width;

    const origFrameWidth = productLoaded ? this.props.product.getFrameWidth() : '';
    const frameWidth = isNull(updatedProduct.frameWidth) ? origFrameWidth : updatedProduct.frameWidth;

    const origDefaultColor = productLoaded ? this.props.product.getDefaultColor() : '';
    const defaultColor = isNull(updatedProduct.defaultColor) ? origDefaultColor: updatedProduct.defaultColor;

    const origIncludeShippingInPrice = productLoaded ? this.props.product.getIncludeShippingInPrice() : '';
    const includeShippingInPrice = isNull(updatedProduct.includeShippingInPrice)
      ? origIncludeShippingInPrice
      : updatedProduct.includeShippingInPrice;

    return {
      description,
      title,
      price,
      type,
      cost,
      shipping,
      etsyUrl,
      length,
      width,
      frameWidth,
      includeShippingInPrice,
      defaultColor,
    };
  };

  render = () => {
    const loading = this.props.productLoading || this.props.uploadingImage;

    const productInfo = this.getProductInformation();
    const productLoaded = !isEmpty(this.props.product);

    return (
      <div className="container-fluid">
        <Spinner spinning={loading}>
          <div className="row">
            <div className="col-12 text-center">
              <h3>Edit Product</h3>
            </div>
            <div className="offset-lg-10 col-md-12 col-lg-2 mb-4">
              <Button
                onClick={this.handleSave} variant="contained"
                color="save" fullWidth
              >
                Save
              </Button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-lg-6">
              <EditImages product={this.props.product} onImageUpload={this.onImageUpload} />
            </div>

            {productLoaded && (
              <div className="col-md-12 col-lg-6">
                <EditProductDetails onChange={this.handleInputChange} {...productInfo} />
              </div>
            )}
          </div>

          <hr />

          <div className="row">
            <div className="col-12">
              <EditDescription onChange={this.handleDescriptionChange} description={productInfo.description} />
            </div>
          </div>

          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={this.state.showNotification}
            autoHideDuration={3000}
            onClose={this.handleHideNotification}
            message={<span>{this.state.notificationMessage}</span>}
          />
        </Spinner>
      </div>
    );
  };
}

AdminProductContainer.propTypes = {
  verifyLogin: PropTypes.func,
  redirectToHome: PropTypes.func,
  getProduct: PropTypes.func,
  product: PropTypes.object,
  productLoading: PropTypes.bool,
  uploadingImage: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    product: getProductSelector(state),
    productLoading: getLoading(state),
    uploadingImage: getUploading(state),
  };
};

const mapActionsToProps = {
  verifyLogin,
  getProduct,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withValidation(AdminProductContainer));
