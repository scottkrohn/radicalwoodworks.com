import BaseBLI from "./base";

// Constants
import DB from '../../constants/database-constants';

class ImagesBLI extends BaseBLI {
	constructor() {
		super();
	}

	createImage(image, callback) {
		this.db.clear();
		this.db.assign(DB.tables.images.columns.thumbUrl, image.getThumbUrl());
		this.db.assign(DB.tables.images.columns.mainUrl, image.getMainUrl());

		this.db.insert(DB.tables.images.name, (error, result, fields) => {
			if (typeof callback === 'function') {
				callback(error, result, fields);
			}
		});
	}

	addProductImageMap(productId, imageId, callback) {
		this.db.clear();
		this.db.assign(DB.tables.productImageMap.columns.productId, productId);
		this.db.assign(DB.tables.productImageMap.columns.imageId, imageId);
		this.db.assign(DB.tables.productImageMap.columns.hidden, true);

		this.db.insert(DB.tables.productImageMap.name, (error, result, fields) => {
			if (typeof callback === 'function') {
				callback(error, result, fields);
			}
		});
	}

	getImage(imageId, callback) {
		const whereClause = `WHERE ${DB.tables.images.columns.id} = ${imageId}`;
		this.db.selectOne(DB.tables.images.name, whereClause, (error, result, fields) => {
			callback(error, result, fields);
		});
	}

	getImages(productId, callback) {
		const sql = `
			SELECT
				*
			FROM
				\`${DB.tables.images.name}\` i
			INNER JOIN
				\`${DB.tables.productImageMap.name}\` map
			ON
				map.image_id = i.id
			AND
				map.product_id = ${productId}
		`;

		this.db.query(sql, null, (error, result, fields) => {
			callback(error, result, fields);
		});
	}
};

export default ImagesBLI;