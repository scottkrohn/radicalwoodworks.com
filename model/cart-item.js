import Model from '@model/model';

class CartItem extends Model {
  constructor() {
    super();

    this.data = {
      id: null,
      cartId: null,
      productId: null,
      quantity: null,
      isDeleted: null,
    };
  }

  setId = (id) => {
    this.data.id = id;
  };

  setCartId = (cartId) => {
    this.data.cartId = cartId;
  };

  setProductId = (productId) => {
    this.data.productId = productId;
  };

  setQuantity = (quantity) => {
    this.data.quantity = quantity;
  };

  setIsDeleted = (isDeleted) => {
    this.data.isDeleted = isDeleted;
  };

  getId = () => {
    return this.data.id;
  };

  getCartId = () => {
    return this.data.cartId;
  };

  getProductId = () => {
    return this.data.productId;
  };

  getQuantity = () => {
    return this.data.quantity;
  };

  getIsDeleted = () => {
    return this.data.isDeleted;
  };

  addQuantity = (quantity) => {
    if (this.data.quantity) {
      this.data.quantity + quantity >= 0 ? (this.data.quantity += quantity) : (this.data.quantity = 0);
    } else {
      this.data.quantity = quantity > 0 ? quantity : 0;
    }
  };
}

export default CartItem;
