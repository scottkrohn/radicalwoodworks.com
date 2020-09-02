import { find, get } from 'lodash';
import Model from '@models/model';
import CartItem from '@models/cart-item';

class Cart extends Model {
  constructor() {
    super();

    this.data = {
      id: null,
      createdTs: null,
      updatedTs: null,
      expirationTs: null,
      userId: null,
      isExpired: null,
      sid: null,
    };

    this.children = {
      items: null,
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

  setExpirationTs = (expirationTs) => {
    this.data.expirationTs = expirationTs;
  };

  setUserId = (userId) => {
    this.data.userId = userId;
  };

  setIsExpired = (isExpired) => {
    this.data.isExpired = isExpired;
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

  getExpirationTs = () => {
    return this.data.expirationTs;
  };

  getUserId = () => {
    return this.data.userId;
  };

  getIsExpired = () => {
    return this.data.isExpired;
  };

  getSid = () => {
    return this.data.sid;
  };

  /* Children Getters & Setters */
  /******************************/
  setItems = (items) => {
    this.children.items = items;
  };

  getItems = () => {
    return this.children.items;
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

  buildCartModel = (data, children) => {
    this.setValues(data);

    const items = get(children, 'items', []);

    items.forEach((item) => {
      const itemModel = new CartItem();
      itemModel.buildCartItemModel(item.data, item.children);
      this.addItem(itemModel);
    });
  };
}

export default Cart;
