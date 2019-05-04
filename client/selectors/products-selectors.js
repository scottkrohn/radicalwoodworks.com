import { get, isEmpty } from 'lodash';
import { createSelector } from 'reselect';

import Product from 'model/product';
import Image from 'model/image';

const getProductsFromState = (state) => state.products.products;
export const getLoading = (state) => state.products.loading;

export const getProducts = createSelector(
	[getProductsFromState],
	(products) => {
		const productObjects = [];

		if (!isEmpty(products) & Array.isArray(products)) {
			products.forEach((productData) => {
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

				productObjects.push(product);
			});
		}
		return productObjects;
	}
);
