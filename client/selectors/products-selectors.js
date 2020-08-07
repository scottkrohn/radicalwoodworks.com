import { get, isEmpty } from 'lodash';
import { createSelector } from 'reselect';

import Product from 'model/product';
import Image from 'model/image';

const getProductsFromState = (state) => state.products.products;
export const getLoading = (state) => state.products.loading;

export const getProducts = createSelector(
  [getProductsFromState],
  (products) => {
    const productModels = [];

    if (!isEmpty(products) & Array.isArray(products)) {
      products.forEach((productData) => {
        const productModel = new Product();
        productModel.buildProductModel(productData.data, productData.children);
        productModels.push(productModel);
      });
    }
    return productModels;
  }
);
