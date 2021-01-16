import Model from '@models/model';
import { get } from 'lodash';
import OrderItem from '@models/order-item';
import Address from './address';

class Order extends Model {
  constructor() {
    super();

    this.data = {
      id: null,
      createdTs: null,
      updatedTs: null,
      userId: null,
      promoCode: null,
      promoDiscount: null,
      subtotal: null,
      shippingTotal: null,
      taxTotal: null,
      grandTotal: null,
      cartId: null,
      status: null,
      fulfillmentStatus: null,
      addressId: null,
      trackingNumber: null,
      trackingProvider: null,
      sid: null,
    };

    this.children = {
      items: null,
      address: null,
    };
  }

  setId = (id) => {
    this.data.id = id;
  };

  setCreatedTs = (createdTs) => {
    this.data.createdTs = createdTs;
  };

  setUpdatedTs = (updatedTs) => {
    this.data.updatedTs = updatedTs;
  };

  setUserId = (userId) => {
    this.data.userId = userId;
  };

  setPromoCode = (promoCode) => {
    this.data.promoCode = promoCode;
  };

  setPromoDiscount = (promoDiscount) => {
    this.data.promoDiscount = promoDiscount;
  };

  setSubtotal = (subtotal) => {
    this.data.subtotal = subtotal;
  };

  setShippingTotal = (shippingTotal) => {
    this.data.shippingTotal = shippingTotal;
  };

  setTaxTotal = (taxTotal) => {
    this.data.taxTotal = taxTotal;
  };

  setGrandTotal = (grandTotal) => {
    this.data.grandTotal = grandTotal;
  };

  setCartId = (cartId) => {
    this.data.cartId = cartId;
  };

  setStatus = (status) => {
    this.data.status = status;
  };

  setFulfillmentStatus = (fulfillmentStatus) => {
    this.data.fulfillmentStatus = fulfillmentStatus;
  };

  setAddressId = (addressId) => {
    this.data.addressId = addressId;
  };

  setTrackingNumber = (trackingNumber) => {
    this.data.trackingNumber = trackingNumber;
  };

  setTrackingProvider = (trackingProvider) => {
    this.data.trackingProvider = trackingProvider;
  };

  setSid = (sid) => {
    this.data.sid = sid;
  };

  getId = () => {
    return this.data.id;
  };

  getCreatedTs = () => {
    return this.data.createdTs;
  };

  getUpdatedTs = () => {
    return this.data.updatedTs;
  };

  getAddressId = () => {
    return this.data.addressId;
  };

  getPromoCode = () => {
    return this.data.promoCode;
  };

  getPromoDiscount = () => {
    return this.data.promoDiscount;
  };

  getSubtotal = () => {
    return this.data.subtotal;
  };

  getShippingTotal = () => {
    return this.data.shippingTotal;
  };

  getTaxTotal = () => {
    return this.data.taxTotal;
  };

  getGrandTotal = () => {
    return this.data.grandTotal;
  };

  getCartId = () => {
    return this.data.cartId;
  };

  getStatus = () => {
    return this.data.status;
  };

  getFulfillmentStatus = () => {
    return this.data.fulfillmentStatus;
  };

  getAddressId = () => {
    return this.data.addressId;
  };

  getTrackingNumber = () => {
    return this.data.trackingNumber;
  };

  getTrackingProvider = () => {
    return this.data.trackingProvider;
  };

  getSid = () => {
    return this.data.sid;
  };

  getUserId = () => {
    return this.data.userId;
  };

  /* Children Getters & Setters */
  /******************************/

  setItems = (items) => {
    this.children.items = items;
  };

  setAddress = (address) => {
    this.children.address = address;
  };

  getItems = () => {
    return this.children.items;
  };

  getAddress = () => {
    return this.children.address;
  };

  addItem = (item) => {
    if (Array.isArray(this.children.items)) {
      this.children.items.push(item);
    } else {
      this.children.items = [item];
    }
  };

  getItem = (productId) => {
    return find(
      this.children.items,
      (item) => item.getProductId() === productId
    );
  };

  buildOrderModel = (data, children) => {
    this.setValues(data);

    const items = get(children, 'items', []);
    items &&
      items.forEach((item) => {
        const itemModel = new OrderItem();
        itemModel.buildOrderItemModel(item.data, item.children);
        this.addItem(itemModel);
      });

    const address = get(children, 'address', {});
    if (address) {
      const addressModel = new Address();
      addressModel.buildAddressModel(address.data, address.children);
      this.setAddress(addressModel);
    }
  };
}

export default Order;
