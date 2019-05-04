import axios from 'axios';

// Constants
import ACTIONS from 'constants/action-constants';

export const getProduct = (productId) => {
	return (dispatch) => {
		dispatch(getProductRequest());

		axios
			.get(`/server/products/product/${productId}`)
			.then((response) => {
				dispatch(getProductSuccess(response.data));
			})
			.catch((error) => {
				dispatch(getProductError());
			});
	};
};

/*******************/
/* Action Creators */
/*******************/

const getProductRequest = () => {
	return {
		type: ACTIONS.GET_PRODUCT_REQUEST,
		payload: {},
	};
};

const getProductSuccess = (results) => {
	return {
		type: ACTIONS.GET_PRODUCT_SUCCESS,
		payload: {
			product: results,
		},
	};
};

const getProductError = (error) => {
	return {
		type: ACTIONS.GET_PRODUCT_ERROR,
		payload: error,
	};
};
