import BaseBLI from './base';

// Constants
import DB from '../../constants/database-constants';

class ImagesBLI extends BaseBLI {
	constructor() {
		super();
	}

	createImage = (image) => {
		this.db.clear();
		this.db.assign(DB.tables.images.columns.thumbUrl, image.getThumbUrl());
		this.db.assign(DB.tables.images.columns.mainUrl, image.getMainUrl());

		return this.db.insert(DB.tables.images.name);
	}

	addProductImageMap = (productId, imageId) => {
		this.db.clear();
		this.db.assign(DB.tables.productImageMap.columns.productId, productId);
		this.db.assign(DB.tables.productImageMap.columns.imageId, imageId);
		this.db.assign(DB.tables.productImageMap.columns.hidden, true);

		this.db.insert(DB.tables.productImageMap.name);
	}

	getImage = (imageId) => {
		const whereClause = `WHERE ${DB.tables.images.columns.id} = ${imageId}`;
		return this.db.selectOne(DB.tables.images.name, whereClause);
	}

	getImages = (productId) => {
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

		return this.db.query(sql);
	}
}

export default ImagesBLI;
