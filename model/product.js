import Model from './model';
import { isNull } from 'lodash';

class Product extends Model {
  constructor() {
    super();

    this.data = {
      id: null,
      type: null,
      title: null,
      description: null,
      cost: null,
      price: null,
      shipping_price: null,
      include_shipping_in_price: null,
      etsy_url: null,
      length: null,
      width: null,
      frame_width: null,
      default_color: null,
    };

    this.children = {
      images: null,
    };
  }

  setId = (id) => {
    this.data.id = id;
  };
  setType = (type) => {
    this.data.type = type;
  };
  setTitle = (title) => {
    this.data.title = title;
  };
  setDescription = (description) => {
    this.data.description = description;
  };
  setCost = (cost) => {
    this.data.cost = this.__getNullOrFloat(cost);
  };
  setPrice = (price) => {
    this.data.price = this.__getNullOrFloat(price);
  };
  setShippingPrice = (shipping_price) => {
    this.data.shipping_price = this.__getNullOrFloat(shipping_price);
  };
  setIncludeShippingInPrice = (include_shipping_in_price) => {
    this.data.include_shipping_in_price = this.__getBoolean(include_shipping_in_price);
  };
  setEtsyUrl = (etsy_url) => {
    this.data.etsy_url = etsy_url;
  };
  setLength = (length) => {
    this.data.length = this.__getNullOrFloat(length);
  };
  setWidth = (width) => {
    this.data.width = this.__getNullOrFloat(width);
  };
  setFrameWidth = (frame_width) => {
    this.data.frame_width = this.__getNullOrFloat(frame_width);
  };
  setDefaultColor = (default_color) => {
    this.data.default_color = default_color;
  };

  getId = () => {
    return this.data.id;
  };
  getType = () => {
    return this.data.type;
  };
  getTitle = () => {
    return this.data.title;
  };
  getDescription = () => {
    return this.data.description;
  };
  getCost = () => {
    return this.data.cost;
  };
  getPrice = () => {
    return this.data.price;
  };
  getShippingPrice = () => {
    return this.data.shipping_price;
  };
  getIncludeShippingInPrice = () => {
    return this.data.include_shipping_in_price;
  };
  getEtsyUrl = () => {
    return this.data.etsy_url;
  };
  getLength = () => {
    return this.data.length;
  };
  getWidth = () => {
    return this.data.width;
  };
  getFrameWidth = () => {
    return this.data.frame_width;
  };
  getDefaultColor = () => {
    return this.data.default_color;
  };

  /* Children Getters & Setters */
  /******************************/
  setImages = (images) => {
    this.children.images = images;
  };

  getImages = () => {
    return this.children.images;
  };

  /* Derived Stuff */
  /*****************/

  getFinalPrice = () => {
    return !this.getIncludeShippingInPrice() ? this.getPrice() : this.getPrice() + this.getShippingPrice();
  }
}

export default Product;
