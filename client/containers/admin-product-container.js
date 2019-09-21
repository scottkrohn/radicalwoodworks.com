import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, isNull, isEmpty } from 'lodash';

// Components
import EditImages from 'client/components/edit-images/edit-images';
import EditProductDetails from 'client/components/edit-product-details/edit-product-details';
import EditDescription from 'client/components/edit-description/edit-description';
import Spinner from 'client/components/spinner-v2/spinner-v2';
import PageHeader from 'client/components/page-header/page-header';
import Notification from 'client/components/notification/notification';

// Actions
import { verifyLogin } from 'client/actions/admin-actions';
import { getProduct, createProduct, updateProduct } from 'client/actions/product-actions';
import { getProducts } from 'client/actions/products-actions';
import { deleteImage, updateProductImageMapping } from 'client/actions/image-actions';

// Selectors
import { getProduct as getProductSelector, getLoading } from 'client/selectors/product-selectors';
import { getUploading } from 'client/selectors/image-upload-selector';

// Models
import Product from 'model/product';

// HOCs
import { withAuthValidation } from 'client/hoc/auth';
import { withRouter } from 'react-router-dom';

const AdminProductContainer = ({
  createProduct,
  deleteImage,
  getProduct,
  getProducts,
  history,
  match,
  product,
  productLoading,
  updateProduct,
  updateProductImageMapping,
  uploadingImage,
}) => {
  const [loading, setLoading] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [invalidFields, setInvalidFields] = useState({});
  const [notificationContent, setNotificationContent] = useState({});
  const [updatedProduct, setUpdatedProduct] = useState({
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
  });

  useEffect(() => {
    (async () => {
      const productId = get(match, 'params.productId');
      if (productId) {
        if (isEmpty(product) || product.getId() != productId) {
          await getProduct(productId);
        }
      } else {
        setCreateMode(true);
      }
    })();
  }, []);

  const onImageUpload = (image) => {
    const productId = get(match, 'params.productId');
    getProduct(productId);
    getProducts(); // Let's make sure the redux store has the most recent products
    setNotificationContent({
      header: 'Success',
      message: 'Image successfully uploaded!',
      showing: true,
    });
  };

  const handleDescriptionChange = (value) => {
    setUpdatedProduct({
      ...updatedProduct,
      description: value,
    });
  };

  const handleDeleteImage = (image) => {
    setLoading(true);
    (async () => {
      try {
        await deleteImage(image.getId());
        const productId = get(match, 'params.productId');
        await getProduct(productId);
        setNotificationContent({
          header: 'Success',
          message: 'Image successfully deleted!',
          showing: true,
        });
      } catch (error) {
        setNotificationContent({
          header: 'Error',
          message: 'An error occured when updating, please try again.',
          showing: true,
        });
      } finally {
        setLoading(false);
      }
    })();
  };

  const handleUpdateImageMapping = (image, isPrimary = null, hidden = null) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      (async () => {
        try {
          const productId = get(match, 'params.productId');
          const updateData = {
            productId,
            isPrimary,
            hidden: isPrimary ? false : hidden,
          };

          await updateProductImageMapping(image.getId(), updateData);
          await getProduct(productId);

          setNotificationContent({
            header: 'Success',
            message: 'Image updated!',
            showing: true,
          });
        } catch (error) {
          setNotificationContent({
            header: 'Error',
            message: 'An error occured when updating, please try again.',
            showing: true,
          });
          reject();
        } finally {
          setLoading(false);
          resolve();
        }
      })();
    });
  };

  const getInvalidFields = (productData) => {
    const invalidFields = {};

    const ignoredFields = [
      'description',
      'frameWidth',
      'defaultColor',
      'includeShippingInPrice',
      'type',
    ];

    for (const property in productData) {
      if (ignoredFields.includes(property)) {
        continue;
      } else if (createMode && !productData[property]) {
        invalidFields[property] = { isDirty: true, isValid: false, message: 'Required' };
      } else if (productData[property] === '') {
        invalidFields[property] = { isDirty: true, isValid: false, message: 'Required' };
      }
    }

    return invalidFields;
  };

  const handleSave = () => {
    const updatedProductObj = new Product();

    if (!createMode) {
      updatedProductObj.setId(product.getId());
    }

    const updatedProductData = updatedProduct;
    const invalidFields = getInvalidFields(updatedProductData);

    setInvalidFields(invalidFields);

    // Let's bail if there's invalid fields.
    if (!isEmpty(invalidFields)) {
      return;
    }

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

    setLoading(true);
    (async () => {
      try {
        let productId;
        if (createMode) {
          productId = await createProduct(updatedProductObj);
          getProducts(); // Let's make sure the redux store has the most recent products
          setCreateMode(false);

          // We need to inject the product ID onto the URL so code that pulls the ID from the param works.
          history.push(`/admin-product/${productId}`);
        } else {
          productId = get(match, 'params.productId');
          await updateProduct(updatedProductObj);
        }
        await getProduct(productId);

        setNotificationContent({
          header: 'Success',
          message: 'Successfully updated product!',
          showing: true,
        });
      } catch (error) {
        setNotificationContent({
          header: 'Error',
          message: 'An error occured when updating, please try again.',
          showing: true,
        });
      } finally {
        setLoading(false);
      }
    })();
  };

  const handleInputChange = (name) => (event) => {
    setUpdatedProduct({
      ...updatedProduct,
      [name]: event.target.value,
    });
  };

  const getProductInformation = () => {
    const productLoaded = !isEmpty(product);

    const origDescription = productLoaded ? product.getDescription() : '';
    const description = isNull(updatedProduct.description) ? origDescription : updatedProduct.description;

    const origTitle = productLoaded ? product.getTitle() : '';
    const title = isNull(updatedProduct.title) ? origTitle : updatedProduct.title;

    const origPrice = productLoaded ? product.getPrice() : '';
    const price = isNull(updatedProduct.price) ? origPrice : updatedProduct.price;

    const origType = productLoaded ? product.getType() : '';
    const type = isNull(updatedProduct.type) ? origType : updatedProduct.type;

    const origCost = productLoaded ? product.getCost() : '';
    const cost = isNull(updatedProduct.cost) ? origCost : updatedProduct.cost;

    const origShipping = productLoaded ? product.getShippingPrice() : '';
    const shipping = isNull(updatedProduct.shipping) ? origShipping : updatedProduct.shipping;

    const origEtsyUrl = productLoaded ? product.getEtsyUrl() : '';
    const etsyUrl = isNull(updatedProduct.etsyUrl) ? origEtsyUrl : updatedProduct.etsyUrl;

    const origLength = productLoaded ? product.getLength() : '';
    const length = isNull(updatedProduct.length) ? origLength : updatedProduct.length;

    const origWidth = productLoaded ? product.getWidth() : '';
    const width = isNull(updatedProduct.width) ? origWidth : updatedProduct.width;

    const origFrameWidth = productLoaded ? product.getFrameWidth() : '';
    const frameWidth = isNull(updatedProduct.frameWidth) ? origFrameWidth : updatedProduct.frameWidth;

    const origDefaultColor = productLoaded ? product.getDefaultColor() : '';
    const defaultColor = isNull(updatedProduct.defaultColor) ? origDefaultColor : updatedProduct.defaultColor;

    const origIncludeShippingInPrice = productLoaded ? product.getIncludeShippingInPrice() : 0;
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

  const isLoading = loading || productLoading || uploadingImage;
  const productInfo = getProductInformation();
  const productLoaded = !isEmpty(product);

  return (
    <div className="container-fluid">
      <Spinner spinning={isLoading}>
        <div className="row">
          <div className="col-12">
            <PageHeader
              headerText={createMode ? 'Create Product' : 'Edit Product'}
              buttonText="Save"
              onButtonClick={handleSave}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-lg-6">
            <EditImages
              product={product}
              onImageUpload={onImageUpload}
              onImageDelete={handleDeleteImage}
              onImageMappingUpdate={handleUpdateImageMapping}
              hideAddButton={createMode}
              missingImageMessage={createMode ? 'Create the product to add images' : ''}
            />
          </div>

          {(productLoaded || createMode) && (
            <div className="col-md-12 col-lg-6">
              <EditProductDetails
                onChange={handleInputChange}
                {...productInfo}
                invalidFields={invalidFields}
              />
            </div>
          )}
        </div>

        <hr />

        <div className="row">
          <div className="col-12">
            <EditDescription
              onChange={handleDescriptionChange}
              description={productInfo.description}
            />
          </div>
        </div>
      </Spinner>

      <Notification
        content={notificationContent}
        hide={() => setNotificationContent({ showing: false })}
      />
    </div>
  );
};

AdminProductContainer.propTypes = {
  verifyLogin: PropTypes.func,
  redirectToHome: PropTypes.func,
  getProduct: PropTypes.func,
  product: PropTypes.object,
  productLoading: PropTypes.bool,
  uploadingImage: PropTypes.bool,
  updateProduct: PropTypes.func,
  createProduct: PropTypes.func,
  deleteImage: PropTypes.func,
  updateProductImageMapping: PropTypes.func,
  createProductMode: PropTypes.bool,
  history: PropTypes.object,
  getProducts: PropTypes.func,
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
  createProduct,
  getProducts,
};

export default {
  component: connect(
    mapStateToProps,
    mapActionsToProps
  )(withAuthValidation(withRouter(AdminProductContainer))),
  loadData: (store, pathParts) => {
    const productId = pathParts.length === 2 ? parseInt(pathParts[1], 10) : null;
    return productId !== null ? store.dispatch(getProduct(productId)) : Promise.resolve();
  },
};
