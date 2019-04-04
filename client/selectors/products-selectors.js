import { get, isEmpty } from 'lodash';
import { createSelector } from 'reselect';

import Product from 'model/product'
import Image from 'model/image';

const getProductsFromState = (state) => state.products.products;

export const getProducts = createSelector(
	[getProductsFromState],
	(products) => {
		const productObjects = [];

		if (!isEmpty(products)) {
			products.forEach((productArr) => {
				const product = new Product();
				product.setValues(productArr.data);

				if (product.getImages()) {
					const imagesObjects = [];
					for (const imageArr of product.getImages()) {
						const image = new Image();
						image.setValues(imageArr.data);
						imagesObjects.push(image);
					}

					product.setImages(imagesObjects);
				}
				productObjects.push(product);
			});
		}
		return productObjects;
	}
);