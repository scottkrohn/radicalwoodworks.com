import Model from './model';
import ImageModel from '@models/image';
import { get, isEmpty } from 'lodash';

// Constants
import PRODUCTS from '../constants/product-contants';

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
    this.data.include_shipping_in_price = this.__getBoolean(
      include_shipping_in_price
    );
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

  addImage = (image) => {
    if (Array.isArray(this.children.images)) {
      this.children.images.push(image);
    } else {
      this.children.images = [image];
    }
  };

  /* Derived Data*/
  /*****************/

  getFormattedPrice = () => {
    return isNaN(this.getPrice())
      ? this.getPrice()
      : this.getPrice().toFixed(2);
  };

  getFormattedShippingPrice = () => {
    return isNaN(this.getShippingPrice())
      ? this.getShippingPrice()
      : this.getShippingPrice().toFixed(2);
  };

  getFormattedFinalPrice = () => {
    return isNaN(this.getFinalPrice())
      ? this.getFinalPrice()
      : this.getFinalPrice().toFixed(2);
  };

  getFinalPrice = () => {
    return !this.getIncludeShippingInPrice()
      ? this.getPrice()
      : this.getPrice() + this.getShippingPrice();
  };

  getDefaultColorUi = () => {
    return PRODUCTS.getLabelForValue(
      PRODUCTS.chalkboards.stains,
      this.getDefaultColor()
    );
  };

  getPrimaryImageUrl = () => {
    const images = this.getImages();
    if (isEmpty(images)) {
      return null;
    }

    const primaryImage = images.find((image) => image.getIsPrimary());

    // Return either the primary image if it exists, or the first image if no primary is set.
    if (primaryImage) {
      return primaryImage.getThumbUrl();
    } else if (!isEmpty(images[0])) {
      return images[0].getThumbUrl();
    }
  };

  buildProductModel = (data, children) => {
    this.setValues(data);

    const images = get(children, 'images', []);
    images.forEach((image) => {
      const imageModel = new ImageModel();
      imageModel.setValues(image.data);
      this.addImage(imageModel);
    });
  };
}

export default Product;
