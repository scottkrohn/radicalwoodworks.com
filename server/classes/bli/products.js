import { get } from 'lodash';

import BaseBLI from './base';
import ImagesBLI from './images';

// Constants
import DB from '../../constants/database-constants';
import Product from '../../../model/product';

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

	// TODO: Add a limit/offset to this function?
	getProducts = async () => {
		const productRows = await this.db.selectAll(DB.tables.products.name);
		const productIds = productRows.map((productRow) => (productRow.id));
		const imagesBli = new ImagesBLI();

		const images = await imagesBli.getImagesByProductIds(productIds);
		
		const productObjects = [];
		for (const productRow of productRows) {
			const imagesForProduct = images.filter((image) => (image.product_id === productRow.id));
			productObjects.push(this.buildProductObject(productRow, imagesForProduct));
		}

		return productObjects;
	}

	getProduct = async (productId) => {
		const whereClause = `WHERE ${DB.tables.products.columns.id} = ${productId}`;

		const productRow = await this.db.selectOne(DB.tables.products.name, whereClause);
		const productData = get(productRow, '[0]', {});

		const imagesBli = new ImagesBLI();
		const imageRows = await imagesBli.getImages(productId);

		const product = this.buildProductObject(productData, imageRows);
		return product;
	}

	deleteProduct = (productId) => {
		const whereClause = `WHERE ${DB.tables.products.columns.id} = ${productId}`;
		return this.db.delete(DB.tables.products.name, whereClause);
	}

	buildProductObject = (productData, images) => {
		const product = new Product();
		product.setValues(productData);

		const imagesBli = new ImagesBLI();
		const imageObjects = [];
		if (Array.isArray(images)) {
			images.forEach((image) => {
				const imageObj = imagesBli.buildImageObject(image);
				imageObjects.push(imageObj);
			});
		}

		product.setImages(imageObjects);
		return product;
	}
};

export default ProductsBLI;