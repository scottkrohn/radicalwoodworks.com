import { get, isEmpty } from 'lodash';
import { createSelector } from 'reselect';

import Product from 'model/product';

const getProductFromState = (state) => state.product.product;
export const getLoading = (state) => state.product.loading;

export const getProduct = createSelector(
  [getProductFromState],
  (productData) => {
    if (isEmpty(productData)) {
      return {};
    }

    const productModel = new Product();
    productModel.buildProductModel(productData.data, productData.children);

    return productModel;
  }
);
