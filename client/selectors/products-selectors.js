import { get, isEmpty } from 'lodash';
import { createSelector } from 'reselect';
import Product from 'model/product'

const getProductsFromState = (state) => state.products.products;

export const getProducts = createSelector(
	[getProductsFromState],
	(products) => {
		const productObjects = [];

		if (!isEmpty(products)) {
			products.forEach((productArr) => {
				const product = new Product();
				product.setValues(productArr);
				productObjects.push(product);
			});
		}
		console.log(productObjects);
		return productObjects;
	}
);