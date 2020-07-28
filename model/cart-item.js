import Model from '@model/model';

class CartItem extends Model {
  constructor() {
    super();

    this.data = {
      id: null,
      cart_id: null,
      product_id: null,
      quantity: null,
      is_deleted: null,
    };
  }

  setId = (id) => {
    this.data.id = id;
  };

  setCartId = (cartId) => {
    this.data.cart_id = cartId;
  };

  setProductId = (productId) => {
    this.data.product_id = productId;
  };

  setQuantity = (quantity) => {
    this.data.quantity = quantity;
  };

  setIsDeleted = (is_deleted) => {
    this.data.is_deleted = is_deleted;
  };

  getId = () => {
    return this.data.id;
  };

  getCartId = () => {
    return this.data.cart_id;
  };

  getProductId = () => {
    return this.data.product_id;
  };

  getQuantity = () => {
    return this.data.quantity;
  };

  getIsDeleted = () => {
    return this.data.isDeleted;
  };
}

export default CartItem;
