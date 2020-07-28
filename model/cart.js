import Model from '@model/model';

class Cart extends Model {
  constructor() {
    super();

    this.data = {
      id: null,
      created_ts: null,
      updated_ts: null,
      expiration_ts: null,
      customer_id: null,
      is_expired: null,
    };

    this.children = {
      items: null,
    };
  }

  setId = (id) => {
    this.data.id = id;
  };

  setCreatedTs = (createdTs) => {
    this.data.created_ts = createdTs;
  };

  setUpdatedTs = (updatedTs) => {
    this.data.updated_ts = updatedTs;
  };

  setExpirationTs = (expirationTs) => {
    this.data.expiration_ts = expirationTs;
  };

  setCustomerId = (customerId) => {
    this.data.customer_id = customerId;
  };

  setIsExpired = (isExpired) => {
    this.data.is_expired = isExpired;
  };

  getId = () => {
    return this.data.id;
  };

  getCreatedTs = () => {
    return this.data.created_ts;
  };

  getUpdatedTs = () => {
    return this.data.updated_ts;
  };

  getExpirationTs = () => {
    return this.data.expiration_ts;
  };

  getCustomerId = () => {
    return this.data.customer_id;
  };

  getIsExpired = () => {
    return this.data.is_expired;
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
}

export default Cart;
