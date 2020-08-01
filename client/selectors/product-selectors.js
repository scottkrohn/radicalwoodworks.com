import { get, isEmpty } from 'lodash';
import { createSelector } from 'reselect';

import Product from 'model/product';
import Image from 'model/image';

const getProductFromState = (state) => state.product.product;
export const getLoading = (state) => state.product.loading;

export const getProduct = createSelector([getProductFromState], (productData) => {
  let productObject = {};

  if (!isEmpty(productData)) {
    const product = new Product();
    product.setValues(productData.data);

    // If the product has images then set them.
    const images = get(productData, 'children.images');
    if (images) {
      const imageObjects = [];
      for (const image of images) {
        const imageObj = new Image();
        imageObj.setValues(image.data);
        imageObjects.push(imageObj);
      }

      product.setImages(imageObjects);
    }

    productObject = product;
  }

  return productObject;
});
