import BaseBLI from './base';

// Constants
import DB from '../../constants/database-constants';

class ProductsBLI extends BaseBLI {
	constructor() {
		super();
	}

	createProduct(productData, callback) {
		this.db.clear();

		// TODO: Need data validation before saving to the DB.
		this.db.assign(DB.tables.products.columns.type, productData.getType());
		this.db.assign(DB.tables.products.columns.title, productData.getTitle());
		this.db.assign(DB.tables.products.columns.description, productData.getDescription());
		this.db.assign(DB.tables.products.columns.cost, productData.getCost());
		this.db.assign(DB.tables.products.columns.price, productData.getPrice());
		this.db.assign(DB.tables.products.columns.shippingPrice, productData.getShippingPrice());
		this.db.assignBoolean(DB.tables.products.columns.includeShippingInPrice, productData.getIncludeShippingInPrice());

		this.db.insert(DB.tables.products.name, (error, result, fields) => {
			if (typeof callback === 'function') {
				callback(error, result, fields);
			}
		});
	}

	getProducts(callback) {
		this.db.selectAll(DB.tables.products.name, null, (error, result, fields) => {
			if (typeof callback === 'function') {
				callback(error, result, fields);
			}
		});
	}
};

export default ProductsBLI;