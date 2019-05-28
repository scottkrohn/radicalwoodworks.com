import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cloneDeep, get, isNull, isEmpty } from 'lodash';

// Components
import EditImages from 'client/components/edit-images/edit-images';
import EditProductDetails from 'client/components/edit-product-details/edit-product-details';
import EditDescription from 'client/components/edit-description/edit-description';
import Spinner from 'client/components/spinner/spinner';
import Snackbar from '@material-ui/core/Snackbar';
import PageHeader from 'client/components/page-header/page-header';

// Actions
import { verifyLogin } from 'client/actions/admin-actions';
import { getProduct, updateProduct } from 'client/actions/product-actions';
import { deleteImage, updateProductImageMapping } from 'client/actions/image-actions';

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
      loading: false,

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

  handleDeleteImage = (image) => {
    this.setState({
      loading: true,
    }, () => {
      (async () => {
        try {
          await this.props.deleteImage(image.getId());
          const productId = get(this.props, 'match.params.productId');
          await this.props.getProduct(productId);
          this.handleShowNotification('Image successfully deleted!');
        } catch (error) {
          this.handleShowNotification('There was an error deleting the image.');
        } finally {
          this.setState({
            loading: false,
          });
        }
      })();
    });
  };

  handleUpdateImageMapping = (image, isPrimary = null, hidden = null) => {

    return new Promise((resolve, reject) => {
      this.setState({
        loading: true,
      }, () => {
        (async () => {
          try {
            const productId = get(this.props, 'match.params.productId');
            const updateData = {
              productId,
              isPrimary,
              hidden: isPrimary ? false : hidden,
            };

            await this.props.updateProductImageMapping(image.getId(), updateData);
            await this.props.getProduct(productId);
            this.handleShowNotification('Image successfully updated!');
          } catch (error) {
            this.handleShowNotification('There was an error updating the image. Please try again.');
            reject();
          } finally {
            this.setState({
              loading: false,
            });
            resolve();
          }
        })();
      });
    });
  };

  handleSave = () => {
    const updatedProductObj = cloneDeep(this.props.product);
    const updatedProductData = get(this.state, 'updatedProduct', {});

    updatedProductObj.setShippingPrice(updatedProductData.shipping);
    updatedProductObj.setPrice(updatedProductData.price);
    updatedProductObj.setCost(updatedProductData.cost);

    updatedProductObj.setDescription(updatedProductData.description);
    updatedProductObj.setTitle(updatedProductData.title);
    updatedProductObj.setIncludeShippingInPrice(updatedProductData.includeShippingInPrice);

    updatedProductObj.setLength(updatedProductData.length);
    updatedProductObj.setWidth(updatedProductData.width);
    updatedProductObj.setDefaultColor(updatedProductData.defaultColor);

    updatedProductObj.setFrameWidth(updatedProductData.frameWidth);
    updatedProductObj.setEtsyUrl(updatedProductData.etsyUrl);
    updatedProductObj.setType(updatedProductData.type);

    this.setState(
      {
        loading: true,
      },
      () => {
        (async () => {
          try {
            await this.props.updateProduct(updatedProductObj);

            const productId = get(this.props, 'match.params.productId');
            await this.props.getProduct(productId);
            this.handleShowNotification('Product successfully updated!');
          } catch (error) {
            this.handleShowNotification('There was an error updating this product. Please try again.');
          } finally {
            this.setState({
              loading: false,
            });
          }
        })();
      }
    );
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
    const defaultColor = isNull(updatedProduct.defaultColor) ? origDefaultColor : updatedProduct.defaultColor;

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
    const loading = this.state.loading || this.props.productLoading || this.props.uploadingImage;

    const productInfo = this.getProductInformation();
    const productLoaded = !isEmpty(this.props.product);

    return (
      <div className="container-fluid">
        <Spinner spinning={loading}>
          <div className="row">
            <div className="col-12">
              <PageHeader
                headerText="Edit Product" buttonText="Save"
                onButtonClick={this.handleSave}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-lg-6">
              <EditImages
                product={this.props.product}
                onImageUpload={this.onImageUpload}
                onImageDelete={this.handleDeleteImage}
                onImageMappingUpdate={this.handleUpdateImageMapping}
              />
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
            variant="error"
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
  updateProduct: PropTypes.func,
  deleteImage: PropTypes.func,
  updateProductImageMapping: PropTypes.func,
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
  updateProduct,
  deleteImage,
  updateProductImageMapping,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withValidation(AdminProductContainer));
