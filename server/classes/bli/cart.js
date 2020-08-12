import { get, keyBy } from 'lodash';
import BaseBLI from '@bli/base';
import Cart from '@model/cart';
import CartItem from '@model/cart-item';
import ProductBLI from '@bli/products';

import DB from '@constants-server/database-constants';
import CART from '@constants/cart-constants';
import EXCEPTIONS from '@constants/exceptions';

class CartBLI extends BaseBLI {
  constructor() {
    super();
  }

  getCartById = async (cartId, includeProducts, excludeZeroQuantity = true) => {
    const whereClause = `WHERE ${DB.tables.carts.columns.id} = ${cartId}`;

    const cartPromise = this.db.selectOne(DB.tables.carts.name, whereClause);
    const cartItemsPromise = this.getCartItemsByCartId(
      cartId,
      includeProducts,
      excludeZeroQuantity
    );

    const cartRow = await cartPromise;
    const cartItemModels = await cartItemsPromise;

    const cartData = get(cartRow, '[0]', {});
    const cartModel = new Cart();

    cartModel.setValues(cartData, true);
    cartModel.setItems(cartItemModels);

    if (this._isCartExpired(cartModel)) {
      cartModel.setIsExpired(true);
      this.markCartExpired(cartModel.getId());
    }

    if (!cartModel.getId() || cartModel.getIsExpired()) {
      return null;
    } else {
      return cartModel;
    }
  };

  getCartByCustomerId = async (cid) => {
    const whereClause = `WHERE ${DB.tables.carts.columns.customerId} = ${cid} AND ${DB.tables.carts.columns.isExpired} = 0`;
    const cartRow = await this.db.selectOne(DB.tables.carts.name, whereClause);

    const cartData = get(cartRow, '[0]', {});
    const cartModel = new Cart();
    cartModel.setValues(cartData, true);

    const cartItemModels = await this.getCartItemsByCartId(
      cartModel.getId(),
      includeProducts
    );
    cartModel.setItems(cartItemModels);

    if (this._isCartExpired(cartModel)) {
      cartModel.setIsExpired(true);
      this.markCartExpired(cartModel.getId());
    }

    if (!cartModel.getId() || cartModel.getIsExpired()) {
      return null;
    } else {
      return cartModel;
    }
  };

  clearCart = async (cartId) => {
    const cart = await this.getCartById(cartId, false);

    if (!cart) {
      throw EXCEPTIONS.apiError(EXCEPTIONS.cartNotFound, 404);
    }

    const updateSql = `
      UPDATE
        ${DB.tables.cartItems.name}
      SET
        ${DB.tables.cartItems.columns.quantity} = 0
      WHERE
        ${DB.tables.cartItems.columns.cartId} = ${cart.getId()}
    `;

    await this.db.query(updateSql);
    cart.setItems([]);
    return cart;
  };

  getCartItemsByCartId = async (
    cartId,
    includeProducts = false,
    excludeZeroQuantity = true
  ) => {
    const cartItemCols = DB.tables.cartItems.columns;
    const productCols = DB.tables.products.columns;

    let sql = `
      SELECT
        ci.*
      FROM 
        \`${DB.tables.cartItems.name}\` ci
      INNER JOIN
        \`${DB.tables.products.name}\` p
      ON
        ci.${cartItemCols.productId} = p.${productCols.id}
      AND
        ci.${cartItemCols.cartId} = ${cartId}
    `;

    if (excludeZeroQuantity) {
      sql += ` AND ci.${cartItemCols.quantity} > 0`;
    }

    const cartItemRows = await this.db.query(sql);
    const cartItemModels = cartItemRows.map((cartItemData) => {
      const cartItem = new CartItem();
      cartItem.setValues(cartItemData, true);
      return cartItem;
    });

    if (includeProducts) {
      const productBli = new ProductBLI();
      const productIds = cartItemModels.map((itemModel) =>
        itemModel.getProductId()
      );
      const products = await productBli.getProducts(productIds);
      const productsById = keyBy(products, (product) => {
        return product.getId();
      });

      cartItemModels.forEach((itemModel) => {
        const productModel = productsById[itemModel.getProductId()];
        itemModel.setProduct(productModel);
      });
    }

    return cartItemModels;
  };

  /**
   * Add a new cart to the database.
   *
   * @param {number} customerId
   * @param {array} items
   * @returns {Cart} cart
   */
  createCart = async (customerId, items) => {
    const cart = new Cart();
    cart.setCustomerId(customerId);
    cart.setCreatedTs(Date.now());
    cart.setUpdatedTs(Date.now());
    cart.setExpirationTs(Date.now() + CART.expiration48Hours);
    cart.setIsExpired(false);

    const cartPromise = this._assignCartValues(cart, true)
      ? this.db.insert(DB.tables.carts.name)
      : Promise.resolve(null);

    const result = await cartPromise;
    const id = get(result, 'insertId', null);
    if (id) {
      cart.setId(id);
      await this.addOrUpdateCartItems(cart, items);
      return cart;
    } else {
      throw new Error();
    }
  };

  /**
   * Adds or updated one or more items to the database for a specific cart. Checks each
   * item's product ID to validate that the product exists. A negative quantity can be used
   * to remove items from a cart. Throws an error if the product id doesn't exist for an item.
   *
   * @param {Cart} cart
   * @param {array} items
   * @returns {array} array of items added to the database
   */
  addOrUpdateCartItems = async (cart, items) => {
    const itemPromises = [];

    // Validate that products exist before adding them to cart.
    const productBli = new ProductBLI();
    const productIds = items.map((item) => item.productId);

    const productsExist = await productBli.validateProductsExist(productIds);
    if (!productsExist) {
      throw new EXCEPTIONS.apiError(EXCEPTIONS.productNotFound);
    }

    // Insert each item into the database.
    items.forEach(async (item) => {
      const existingItem = cart.getItem(item.productId);

      if (existingItem) {
        existingItem.addQuantity(item.quantity);

        if (typeof item.notes === 'string') {
          existingItem.setNotes(item.notes);
        }

        const whereClause = `WHERE ${
          DB.tables.cartItems.columns.id
        } = ${existingItem.getId()}`;

        if (this._assignItemValues(existingItem, true)) {
          itemPromises.push(
            this.db.update(DB.tables.cartItems.name, whereClause)
          );
        }
      } else {
        const itemModel = new CartItem();
        itemModel.setValues(item);
        itemModel.setIsDeleted(false);
        itemModel.setCartId(cart.getId());
        cart.addItem(itemModel);

        if (this._assignItemValues(itemModel, true)) {
          itemPromises.push(this.db.insert(DB.tables.cartItems.name));
        }
      }
    });

    // Set updated timestamp on cart
    cart.setUpdatedTs(Date.now());
    if (this._assignCartValues(cart)) {
      const whereClause = `WHERE ${
        DB.tables.carts.columns.id
      } = ${cart.getId()}`;
      this.db.update(DB.tables.carts.name, whereClause);
    }

    return Promise.all(itemPromises);
  };

  markCartExpired = (cartId) => {
    this.db.clear();
    this.db.assignBoolean(DB.tables.carts.columns.isExpired, true);
    const whereClause = `WHERE \`${DB.tables.carts.columns.id}\` = ${cartId}`;
    return this.db.update(DB.tables.carts.name, whereClause);
  };

  _isCartExpired = (cartModel) => {
    return (
      !cartModel.getIsExpired() &&
      Date.now() - cartModel.getUpdatedTs() > CART.expiration48Hours
    );
  };

  _assignItemValues = (item, ignoreNull = true) => {
    this.db.clear();

    const cartItemColumns = DB.tables.cartItems.columns;
    const cartItemDatabaseMapping = DB.getCartItemDatabaseFieldsMapping(item);

    let fieldsAssigned = false;
    for (const field in cartItemDatabaseMapping) {
      // Ignore the primary key.
      if (field === cartItemColumns.id) {
        continue;
      }

      if (ignoreNull && cartItemDatabaseMapping[field] === null) {
        continue;
      }

      switch (field) {
        case cartItemColumns.cartId:
        case cartItemColumns.productId:
        case cartItemColumns.quantity:
          this.db.assign(field, cartItemDatabaseMapping[field]);
          fieldsAssigned = true;
          break;

        case cartItemColumns.isDeleted:
          this.db.assignBoolean(field, cartItemDatabaseMapping[field]);
          fieldsAssigned = true;
          break;
        case cartItemColumns.notes:
          this.db.assignStr(field, cartItemDatabaseMapping[field]);
          break;
      }
    }

    return fieldsAssigned;
  };

  _assignCartValues = (cart, ignoreNull = true) => {
    this.db.clear();

    const cartColumns = DB.tables.carts.columns;
    const cartDatabaseMapping = DB.getCartDatabaseFieldsMapping(cart);

    let fieldsAssigned = false;
    for (const field in cartDatabaseMapping) {
      // Ignore the primary key.
      if (field === cartColumns.id) {
        continue;
      }

      if (ignoreNull && cartDatabaseMapping[field] === null) {
        continue;
      }

      switch (field) {
        case cartColumns.createdTs:
        case cartColumns.customerId:
        case cartColumns.updatedTs:
        case cartColumns.expirationTs:
          this.db.assign(field, cartDatabaseMapping[field]);
          fieldsAssigned = true;
          break;

        case cartColumns.isExpired:
          this.db.assignBoolean(field, cartDatabaseMapping[field]);
          fieldsAssigned = true;
          break;
      }
    }

    return fieldsAssigned;
  };
}

export default CartBLI;
