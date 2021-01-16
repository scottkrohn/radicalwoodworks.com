import Model from '@models/model';
import { get } from 'lodash';
import Product from '@models/product';

class OrderItem extends Model {
  constructor() {
    super();

    this.data = {
      id: null,
      shippingPrice: null,
      itemPrice: null,
      quantity: null,
      notes: null,
      productId: null,
      orderId: null,
    };

    this.children = {
      product: null,
    };
  }

  setId = (id) => {
    this.data.id = id;
  };

  setShippingPrice = (shippingPrice) => {
    this.data.shippingPrice = shippingPrice;
  };

  setItemPrice = (itemPrice) => {
    this.data.itemPrice = itemPrice;
  };

  setQuantity = (quantity) => {
    this.data.quantity = quantity;
  };

  setNotes = (notes) => {
    this.data.notes = notes;
  };

  setProductId = (productId) => {
    this.data.productId = productId;
  };

  setOrderId = (orderId) => {
    this.data.orderId = orderId;
  };

  getId = () => {
    return this.data.id;
  };

  getShippingPrice = () => {
    return this.data.shippingPrice;
  };

  getItemPrice = () => {
    return this.data.itemPrice;
  };

  getQuantity = () => {
    return this.data.quantity;
  };

  getNotes = () => {
    return this.data.notes;
  };

  getProductId = () => {
    return this.data.productId;
  };

  getOrderId = () => {
    return this.data.orderId;
  };

  /* Children Getters & Setters */
  /******************************/

  setProduct = (productModel) => {
    this.children.product = productModel;
  };

  getProduct = () => {
    return this.children.product;
  };

  buildOrderItemModel = (data, children) => {
    this.setValues(data);

    const product = get(children, 'product', null);
    if (product) {
      const productModel = new Product();
      productModel.buildProductModel(product.data, product.children);
      this.setProduct(productModel);
    }
  };
}

export default OrderItem;
