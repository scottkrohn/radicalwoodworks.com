import ProductsReducer from 'client/reducers/products-reducer';
import ProductReducer from 'client/reducers/product-reducer';
import ContentReducer from 'client/reducers/content-reducer';
import ContactReducer from 'client/reducers/contact-reducer';
import AuthReducer from 'client/reducers/auth-reducer';
import ImageUploadReducer from 'client/reducers/image-upload-reducer';
import ImagesReducer from 'client/reducers/images-reducer';

const rootReducer = {
  products: ProductsReducer,
  product: ProductReducer,
  content: ContentReducer,
  contact: ContactReducer,
  auth: AuthReducer,
  upload: ImageUploadReducer,
  images: ImagesReducer,
};

export default rootReducer;
