import { get, isNull } from 'lodash';

import BaseBLI from './base';
import ImagesBLI from './images';

// Constants
import DB from '../../constants/database-constants';
import Product from '../../../model/product';

class ProductsBLI extends BaseBLI {
  constructor() {
    super();
  }

  createProduct = (product) => {
    if (this._assignProductValues(product)) {
      return this.db.insert(DB.tables.products.name);
    }

    return Promise.reject('No values updated');
  };

  updateProduct = (product) => {
    if (this._assignProductValues(product, true)) {
      const whereClause = `WHERE \`${DB.tables.products.columns.id}\`  = ${product.getId()}`;
      return this.db.update(DB.tables.products.name, whereClause);
    }

    return Promise.reject('No values updated');
  };

  // At some point add limit/offset to this function.
  getProducts = async () => {
    const productRows = await this.db.selectAll(DB.tables.products.name);
    const productIds = productRows.map((productRow) => productRow.id);
    const imagesBli = new ImagesBLI();

    const images = await imagesBli.getImagesByProductIds(productIds);

    const productObjects = [];
    for (const productRow of productRows) {
      const imagesForProduct = images.filter((image) => image.product_id === productRow.id);
      productObjects.push(this.buildProductObject(productRow, imagesForProduct));
    }

    return productObjects;
  };

  getProduct = async (productId) => {
    const whereClause = `WHERE ${DB.tables.products.columns.id} = ${productId}`;

    const productRow = await this.db.selectOne(DB.tables.products.name, whereClause);
    const productData = get(productRow, '[0]', {});

    const imagesBli = new ImagesBLI();
    const imageRows = await imagesBli.getImages(productId);

    const product = this.buildProductObject(productData, imageRows);
    return product;
  };

  deleteProduct = (productId) => {
    const whereClause = `WHERE ${DB.tables.products.columns.id} = ${productId}`;
    return this.db.delete(DB.tables.products.name, whereClause);
  };

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
  };

  _assignProductValues = (product, ignoreNull = true) => {
    this.db.clear();

    const productDatabaseMapping = DB.getProductDatabaseFieldsMapping(product);
    const fields = Object.keys(productDatabaseMapping);

    let fieldsAssigned = false;
    for (const field of fields) {
      // Ignore the primary key.
      if (field === DB.tables.products.columns.id) {
        continue;
      }

      if (ignoreNull && isNull(productDatabaseMapping[field])) {
        continue;
      }

      const productColumns = DB.tables.products.columns;
      switch (field) {
        case productColumns.type:
        case productColumns.title:
        case productColumns.description:
        case productColumns.defaultColor:
        case productColumns.etsyUrl:
          this.db.assignStr(field, productDatabaseMapping[field]);
          fieldsAssigned = true;
          break;

        case productColumns.cost:
        case productColumns.price:
        case productColumns.shippingPrice:
        case productColumns.width:
        case productColumns.length:
        case productColumns.frameWidth:
          this.db.assign(field, productDatabaseMapping[field]);
          fieldsAssigned = true;
          break;

        case productColumns.includeShippingInPrice:
          this.db.assignBoolean(field, productDatabaseMapping[field]);
          fieldsAssigned = true;
          break;
      }
    }

    return fieldsAssigned;
  };
}

export default ProductsBLI;
