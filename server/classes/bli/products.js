import Database from '../../db/db';

import DB from '../../constants/database-constants';

class ProductsBLI {
	constructor() {
		this.db = new Database();
	}

	createProduct(productData, callback) {
		this.db.clear();

		// TODO: Need data validation before saving to the DB.
		this.db.assign(DB.tables.products.columns.type, productData.type);
		this.db.assign(DB.tables.products.columns.title, productData.title);
		this.db.assign(DB.tables.products.columns.description, productData.description);
		this.db.assign(DB.tables.products.columns.cost, productData.cost);
		this.db.assign(DB.tables.products.columns.price, productData.price);
		this.db.assign(DB.tables.products.columns.shippingPrice, productData.shippingPrice);
		this.db.assignBoolean(DB.tables.products.columns.includeShippingInPrice, productData.includeShippingInPrice);

		this.db.insert('products', (error, result, fields) => {
			if (typeof callback === 'function') {
				callback(error, result, fields);
			}
		});
	}

	getProducts(callback) {
		this.db.selectAll(DB.tables.products.name, null, (error, result, fields) => {
				callback(error, result, fields);
		});
	}
};

export default ProductsBLI;