import ProductsReducer from 'client/reducers/products-reducer';
import ProductReducer from 'client/reducers/product-reducer';

const rootReducer = {
	products: ProductsReducer,
	product: ProductReducer,
};

export default rootReducer;