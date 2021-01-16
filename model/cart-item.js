import Model from '@models/model';
import { get } from 'lodash';
import Product from '@models/product';

class CartItem extends Model {
  constructor() {
    super();

    this.data = {
      id: null,
      cartId: null,
      productId: null,
      quantity: null,
      isDeleted: null,
      notes: null,
    };

    this.children = {
      product: null,
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

  setNotes = (notes) => {
    this.data.notes = notes;
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

  getNotes = () => {
    return this.data.notes;
  };

  /* Children Getters & Setters */
  /******************************/

  setProduct = (productModel) => {
    this.children.product = productModel;
  };

  getProduct = () => {
    return this.children.product;
  };

  /* Helper Functions           */
  /******************************/
  addQuantity = (quantity) => {
    if (this.data.quantity) {
      this.data.quantity + quantity >= 0
        ? (this.data.quantity += quantity)
        : (this.data.quantity = 0);
    } else {
      this.data.quantity = quantity > 0 ? quantity : 0;
    }
  };

  buildCartItemModel = (data, children) => {
    this.setValues(data);

    const product = get(children, 'product', null);
    if (product) {
      const productModel = new Product();
      productModel.buildProductModel(product.data, product.children);
      this.setProduct(productModel);
    }
  };
}

export default CartItem;
