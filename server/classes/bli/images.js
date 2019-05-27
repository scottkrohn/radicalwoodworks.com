import BaseBLI from './base';
import { get, isNull } from 'lodash';

// Models
import Image from '../../../model/image';

// Constants
import DB from '../../constants/database-constants';

class ImagesBLI extends BaseBLI {
  constructor() {
    super();
  }

  createImageWithMapping = (url, isPrimary, productId) => {
    const filename = this.getImagePathFromUrl(url);

    const imageData = {
      thumb_url: filename,
      main_url: filename,
      is_primary: isPrimary,
    };

    const image = this.buildImageObject(imageData);

    return (async () => {
      try {
        const createImageResult = await this.createImage(image);
        const imageId = get(createImageResult, 'insertId', null);

        if (!imageId) {
          throw new Error('Error creating image: ', image);
        }

        image.setId(imageId);
        await this.addProductImageMap(productId, image);
        return image;
      } catch (error) {
        throw new Error(error);
      }
    })();
  };

  createImage = (image) => {
    this.db.clear();
    this.db.assignStr(DB.tables.images.columns.thumbUrl, image.getThumbUrl());
    this.db.assignStr(DB.tables.images.columns.mainUrl, image.getMainUrl());

    return this.db.insert(DB.tables.images.name);
  };

  addProductImageMap = (productId, image) => {
    this.db.clear();
    this.db.assign(DB.tables.productImageMap.columns.productId, productId);
    this.db.assign(DB.tables.productImageMap.columns.imageId, image.getId());
    this.db.assignBoolean(DB.tables.productImageMap.columns.hidden, image.getHidden());
    this.db.assignBoolean(DB.tables.productImageMap.columns.isPrimary, image.getIsPrimary());

    this.db.insert(DB.tables.productImageMap.name);
  };

  updateProductImageMapping = (productId, imageId, isPrimary, hidden) => {
    console.log('isPrimary: ', isPrimary);
    console.log('hidden: ', hidden);
    return (async () => {
      try {
        // If we're updating the primary image we need to clear the current primary image.
        if (isPrimary) {
          const clearPrimarySql = `
            UPDATE
              ${DB.tables.productImageMap.name}
            SET
              ${DB.tables.productImageMap.columns.isPrimary} = false
            WHERE
              ${DB.tables.productImageMap.columns.productId} = ${productId}
          `;
          await this.db.query(clearPrimarySql);
        }

        // Set new primary image.
        this.db.clear();
        let valueUpdated = false;
        if (!isNull(isPrimary)) {
          this.db.assign(DB.tables.productImageMap.columns.isPrimary, isPrimary);
          valueUpdated = true;
        }

        if (!isNull(hidden)) {
          this.db.assign(DB.tables.productImageMap.columns.hidden, hidden);
          valueUpdated = true;
        }

        if (valueUpdated) {
          const setPrimaryWhereClause = `
            WHERE
              ${DB.tables.productImageMap.columns.productId} = ${productId}
            AND
              ${DB.tables.productImageMap.columns.imageId} = ${imageId}
          `;
          await this.db.update(DB.tables.productImageMap.name, setPrimaryWhereClause);
        }
      } catch (error) {
        throw new Error('Error occured while upating product image mapping');
      }
    })();
  };

  deleteImage = (imageId) => {
    return (async () => {
      try {
        const whereClause = `WHERE ${DB.tables.images.columns.id} = ${imageId}`;
        const deleteImagePromise = this.db.delete(DB.tables.images.name, whereClause);
        const deleteMappingPromise = this.deleteProductImageMap(imageId);

        await deleteImagePromise;
        await deleteMappingPromise;
      } catch (error) {
        throw new Error('Error occured while deleting image: ', error);
      }
    })();
  };

  deleteProductImageMap = (imageId) => {
    const whereClause = `WHERE ${DB.tables.productImageMap.columns.imageId} = ${imageId}`;
    return this.db.delete(DB.tables.productImageMap.name, whereClause);
  };

  getImage = (imageId) => {
    const whereClause = `WHERE ${DB.tables.images.columns.id} = ${imageId}`;
    return this.db.selectOne(DB.tables.images.name, whereClause);
  };

  getImagesByProductIds = (productIds) => {
    const productIdsString = productIds.join(',');
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
				map.product_id in (${productIdsString})
		`;

    return this.db.query(sql);
  };

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
  };

  buildImageObject = (imageData) => {
    const image = new Image();
    image.setValues(imageData);
    return image;
  };

  getImagePathFromUrl = (url) => {
    const filename = url.substring(url.lastIndexOf('/') + 1);
    return filename;
  };
}

export default ImagesBLI;
