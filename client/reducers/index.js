import { combineReducers } from 'redux';
import ProductsReducer from '@reducers/products-reducer';
import ProductReducer from '@reducers/product-reducer';
import ContentReducer from '@reducers/content-reducer';
import ContactReducer from '@reducers/contact-reducer';
import AuthReducer from '@reducers/auth-reducer';
import ImageUploadReducer from '@reducers/image-upload-reducer';
import ImagesReducer from '@reducers/images-reducer';
import CartReducer from '@reducers/cart-reducer';
import OrderReducer from '@reducers/order-reducer';

const reducers = {
  cart: CartReducer,
  products: ProductsReducer,
  product: ProductReducer,
  content: ContentReducer,
  contact: ContactReducer,
  auth: AuthReducer,
  upload: ImageUploadReducer,
  images: ImagesReducer,
  order: OrderReducer,
};

export default combineReducers(reducers);
