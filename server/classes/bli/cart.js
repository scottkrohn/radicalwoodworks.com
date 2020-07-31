import { get } from 'lodash';
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

  getCartById = async (cartId) => {
    const whereClause = `WHERE ${DB.tables.carts.columns.id} = ${cartId}`;

    const cartPromise = this.db.selectOne(DB.tables.carts.name, whereClause);
    const cartItemsPromise = this.getCartItemsByCartId(cartId);

    const cartRow = await cartPromise;
    const cartItemModels = await cartItemsPromise;

    const cartData = get(cartRow, '[0]', {});
    const cartModel = new Cart();

    cartModel.setValues(cartData, true);
    cartModel.setItems(cartItemModels);

    if (!cartModel.getIsExpired() && Date.now() - cartModel.getUpdatedTs() > CART.expiration48Hours) {
      cartModel.setIsExpired(true);
      this.markCartExpired(cartModel.getId());
    }

    if (!cartModel.getId() || cartModel.getIsExpired()) {
      return null;
    } else {
      return cartModel;
    }
  };

  getCartItemsByCartId = async (cartId) => {
    const cartItemCols = DB.tables.cartItems.columns;
    const productCols = DB.tables.products.columns;

    const sql = `
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

    const cartItemRows = await this.db.query(sql);
    const cartItemModels = cartItemRows.map((cartItemData) => {
      const cartItem = new CartItem();
      cartItem.setValues(cartItemData, true);
      return cartItem;
    });

    return cartItemModels;
  };

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
   *
   * @param {Cart} cart
   * @param {*} items
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

    items.forEach(async (item) => {
      const existingItem = cart.getItem(item.productId);

      if (existingItem) {
        existingItem.addQuantity(item.quantity);
        const whereClause = `WHERE ${DB.tables.cartItems.columns.id} = ${existingItem.getId()}`;

        if (this._assignItemValues(existingItem, true)) {
          itemPromises.push(this.db.update(DB.tables.cartItems.name, whereClause));
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

    const result = await Promise.all(itemPromises);
    return result;
  };

  markCartExpired = (cartId) => {
    this.db.clear();
    this.db.assignBoolean(DB.tables.carts.columns.isExpired, true);
    const whereClause = `WHERE \`${DB.tables.carts.columns.id}\` = ${cartId}`;
    return this.db.update(DB.tables.carts.name, whereClause);
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
