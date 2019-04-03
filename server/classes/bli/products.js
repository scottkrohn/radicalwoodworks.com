import BaseBLI from './base';

// Constants
import DB from '../../constants/database-constants';

class ProductsBLI extends BaseBLI {
	constructor() {
		super();
	}

	createProduct = (productData) => {
		this.db.clear();

		this.db.assign(DB.tables.products.columns.type, productData.getType());
		this.db.assign(DB.tables.products.columns.title, productData.getTitle());
		this.db.assign(DB.tables.products.columns.description, productData.getDescription());
		this.db.assign(DB.tables.products.columns.cost, productData.getCost());
		this.db.assign(DB.tables.products.columns.price, productData.getPrice());
		this.db.assign(DB.tables.products.columns.shippingPrice, productData.getShippingPrice());
		this.db.assignBoolean(DB.tables.products.columns.includeShippingInPrice, productData.getIncludeShippingInPrice());

		return this.db.insert(DB.tables.products.name);
	}

	getProducts = () => {
		return this.db.selectAll(DB.tables.products.name);
	}

	getProduct = (productId) => {
		const whereClause = `WHERE ${DB.tables.products.columns.id} = ${productId}`;


		return this.db.selectOne(DB.tables.products.name, whereClause);
	}

	deleteProduct = (productId) => {
		const whereClause = `WHERE ${DB.tables.products.columns.id} = ${productId}`;
		return this.db.delete(DB.tables.products.name, whereClause);
	}
};

export default ProductsBLI;