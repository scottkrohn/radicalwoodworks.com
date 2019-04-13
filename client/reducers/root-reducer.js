import ProductsReducer from 'client/reducers/products-reducer';
import ProductReducer from 'client/reducers/product-reducer';
import ContentReducer from 'client/reducers/content-reducer';

const rootReducer = {
	products: ProductsReducer,
	product: ProductReducer,
	content: ContentReducer,
};

export default rootReducer;