import Database from '../../db/db';

class ProductsBLI {
	constructor() {
		this.db = new Database();
	}

	createProduct(productData, callback) {
		this.db.clear();

		// TODO: Need data validation before saving to the DB.
		this.db.assign('type', productData.type);
		this.db.assign('title', productData.title);
		this.db.assign('description', productData.description);
		this.db.assign('cost', productData.cost);
		this.db.assign('price', productData.price);
		this.db.assign('shipping_price', productData.shippingPrice);
		this.db.assignBoolean('include_shipping_in_price', productData.includeShippingInPrice);

		this.db.insert('products', (error, result, fields) => {
			console.log(result);
			console.log(error);
			if (typeof callback === 'function') {
				callback();
			}
		});
	}
};

export default ProductsBLI;