import BaseBLI from '@bli/base';
import CartBLI from '@bli/cart-bli';
import EXCEPTIONS from '@constants/exceptions';
import OrderModel from '@models/order';
import CartHelper from '@helpers/cart-helper';
import ORDER from '@constants/order-constants';
import Cart from '@models/cart';
import OrderItem from '@models/order-item';
import CartItem from '@models/cart-item';
import DB from '@constants-server/database-constants';
import { get, isEmpty } from 'lodash';
import Order from '@models/order';
import CustomerBLI from '@bli/customer-bli';

class OrderBLI extends BaseBLI {
  constructor() {
    super();
  }

  getOrderByCartId = async (cartId, sid = null) => {
    let whereClause = `WHERE ${DB.tables.orders.columns.cartId} = ${cartId}`;

    if (sid) {
      whereClause += ` AND ${DB.tables.orders.columns.sid} = ${this.escape(
        sid
      )}`;
    }
    const order = await this.db.selectOne(DB.tables.orders.name, whereClause);

    console.log(order);
    return order;
  };

  getOrderByOrderId = async (orderId, sid = null) => {
    let orderWhereClause = `WHERE ${DB.tables.orders.columns.id} = ${orderId}`;

    if (sid) {
      orderWhereClause += ` AND ${DB.tables.orders.columns.sid} = ${this.escape(
        sid
      )}`;
    }

    const orderPromise = this.db.selectOne(
      DB.tables.orders.name,
      orderWhereClause
    );
    const orderItemWhereClause = `WHERE ${DB.tables.orderItems.columns.orderId} = ${orderId}`;
    const orderItemPromise = this.db.selectAll(
      DB.tables.orderItems.name,
      orderItemWhereClause
    );

    const orderRow = await orderPromise;
    const orderItemRows = await orderItemPromise;

    if (isEmpty(orderRow)) {
      throw new EXCEPTIONS.apiError(EXCEPTIONS.orderNotFound, 404);
    }

    const orderItemModels = [];
    orderItemRows.forEach((orderItemData) => {
      const orderItem = new OrderItem();
      orderItem.setValues(orderItemData);
      orderItemModels.push(orderItem);
    });

    const order = new Order();
    const orderData = get(orderRow, '[0]', null);
    order.setValues(orderData, true);
    order.setItems(orderItemModels);

    if (order.getCustomerId()) {
      const customerBli = new CustomerBLI();
      const customer = await customerBli.getCustomer(order.getCustomerId());
      order.setCustomer(customer);
    }

    return order;
  };

  createOrUpdateOrder = async (cartId, sid = null) => {
    const cartBli = new CartBLI();
    const cart = await cartBli.getCartById(cartId, true, true);

    if (!cart) {
      throw new EXCEPTIONS.apiError(EXCEPTIONS.cartNotFound, 400);
    }

    // Check if an order already exists for this cart id.
    const orderRow = await this.getOrderByCartId(cart.getId(), sid);
    const orderData = get(orderRow, '[0]', null);

    let order;
    let isUpdate = false;
    if (!isEmpty(orderData)) {
      isUpdate = true;
      order = new Order();
      order.setValues(orderData, true);
      this._updateExistingOrderForCart(order, cart);
    } else {
      order = this._buildOrderFromCart(cart);
    }

    // Save the order into the DB.
    let orderPromise = Promise.resolve(null);
    if (this._assignOrderValues(order)) {
      if (isUpdate) {
        const whereClause = `WHERE ${
          DB.tables.orders.columns.id
        } = ${order.getId()}`;
        orderPromise = this.db.update(DB.tables.orders.name, whereClause);
      } else {
        orderPromise = this.db.insert(DB.tables.orders.name);
      }
    }

    const result = await orderPromise;
    const newOrderId = get(result, 'insertId', null);

    // Save the order items into the DB.
    if (newOrderId || order.getId()) {
      order.setId(newOrderId || order.getId());
      if (isUpdate) {
        await this.clearOrderItems(order.getId());
      }

      const orderItems = [];
      cart.getItems().forEach((cartItem) => {
        orderItems.push(
          this._buildOrderItemFromCartItem(cartItem, order.getId())
        );
      });

      order.setItems(orderItems);
      await this.addItemsToOrder(orderItems);
      return order;
    } else {
      throw new Error('Unable to create or update order.');
    }
  };

  clearOrderItems = (orderId) => {
    const sql = `
      DELETE FROM
        ${DB.tables.orderItems.name}
      WHERE
        ${DB.tables.orderItems.columns.orderId} = ${orderId}
    `;

    return this.db.query(sql);
  };

  addItemsToOrder = async (orderItems) => {
    const orderItemPromises = [];

    orderItems.forEach((orderItem) => {
      if (this._assignOrderItemValues(orderItem)) {
        orderItemPromises.push(this.db.insert(DB.tables.orderItems.name));
      }
    });

    return Promise.all(orderItemPromises);
  };

  addCustomerIdToOrder = async (orderId, customerId) => {
    const sql = `
      UPDATE
        ${DB.tables.orders.name}
      SET
        ${DB.tables.orders.columns.customerId} = ${parseInt(customerId)}
      WHERE
        ${DB.tables.orders.columns.id} = ${parseInt(orderId)}
    `;

    return this.db.query(sql);
  };

  /**
   * @param {Cart} cart
   */
  _buildOrderFromCart = (cart) => {
    const cartHelper = new CartHelper();
    const order = new OrderModel();

    const {
      itemTotal,
      shippingTotal,
      taxTotal,
    } = cartHelper.calculateCartTotals(cart);

    order.setCreatedTs(Date.now());
    order.setUpdatedTs(Date.now());
    order.setCustomerId(cart.getCustomerId());
    order.setSubtotal(itemTotal);
    order.setTaxTotal(taxTotal);
    order.setShippingTotal(shippingTotal);
    order.setGrandTotal(itemTotal + taxTotal + shippingTotal);
    order.setStatus(ORDER.STATUS.ABANDONED);
    order.setCartId(cart.getId());
    order.setSid(cart.getSid());

    return order;
  };

  _updateExistingOrderForCart = (order, cart) => {
    const cartHelper = new CartHelper();

    const {
      itemTotal,
      shippingTotal,
      taxTotal,
    } = cartHelper.calculateCartTotals(cart);

    order.setUpdatedTs(Date.now());
    order.setSubtotal(itemTotal);
    order.setTaxTotal(taxTotal);
    order.setShippingTotal(shippingTotal);
    order.setGrandTotal(itemTotal + taxTotal + shippingTotal);
  };

  /**
   * @param {CartItem} cartItem
   */
  _buildOrderItemFromCartItem = (cartItem, orderId) => {
    const orderItem = new OrderItem();
    orderItem.setQuantity(cartItem.getQuantity());
    orderItem.setProductId(cartItem.getProductId());
    orderItem.setNotes(cartItem.getNotes());
    orderItem.setOrderId(orderId);

    const product = cartItem.getProduct();
    orderItem.setShippingPrice(product.getShippingPrice());
    orderItem.setItemPrice(product.getPrice());

    return orderItem;
  };

  _assignOrderValues = (order, ignoreNull = true) => {
    this.db.clear();

    const orderColumns = DB.tables.orders.columns;
    const orderDatabaseMapping = DB.getOrderDatabaseFieldsMapping(order);

    let fieldsAssigned = false;
    for (const field in orderDatabaseMapping) {
      // Ignore the primary key.
      if (field === orderColumns.id) {
        continue;
      }

      const value = orderDatabaseMapping[field];
      if (ignoreNull && value === null) {
        continue;
      }

      switch (field) {
        case orderColumns.promoCode:
        case orderColumns.status:
        case orderColumns.fulfillmentStatus:
        case orderColumns.trackingProvider:
        case orderColumns.trackingProvider:
        case orderColumns.sid:
          this.db.assignStr(field, value);
          fieldsAssigned = true;
          break;

        case orderColumns.createdTs:
        case orderColumns.updatedTs:
        case orderColumns.customerId:
        case orderColumns.promoDiscount:
        case orderColumns.subtotal:
        case orderColumns.shippingTotal:
        case orderColumns.taxTotal:
        case orderColumns.grandTotal:
        case orderColumns.cartId:
        case orderColumns.addressId:
          this.db.assign(field, value);
          fieldsAssigned = true;
          break;
      }
    }

    return fieldsAssigned;
  };

  /**
   *
   * @param {OrderItem} orderItem
   * @param {Boolean} ignoreNull
   */
  _assignOrderItemValues = (orderItem, ignoreNull = true) => {
    this.db.clear();

    const orderItemColumns = DB.tables.orderItems.columns;
    const orderItemDatabaseMapping = DB.getOrderItemDatabaseFieldsMapping(
      orderItem
    );

    let fieldsAssigned = false;
    for (const field in orderItemDatabaseMapping) {
      // Ignore the primary key.
      if (field === orderItemColumns.id) {
        continue;
      }

      const value = orderItemDatabaseMapping[field];
      if (ignoreNull && value === null) {
        continue;
      }

      switch (field) {
        case orderItemColumns.notes:
          this.db.assignStr(field, value);
          fieldsAssigned = true;
          break;

        case orderItemColumns.shippingPrice:
        case orderItemColumns.itemPrice:
        case orderItemColumns.productId:
        case orderItemColumns.quantity:
        case orderItemColumns.orderId:
          this.db.assign(field, value);
          fieldsAssigned = true;
          break;
      }
    }
    return fieldsAssigned;
  };
}

export default OrderBLI;
