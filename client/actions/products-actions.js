import axios from 'axios';

// Constants
import ACTIONS from 'constants/action-constants';

export const getProducts = () => {
	return (dispatch) => {
		dispatch(getProductsRequest());

		axios.get(`/server/products`)
			.then((response) => {
				dispatch(getProductsSuccess(response.data));
			})
			.catch ((error) => {
				dispatch(getProductsError());
			});
	};
};

/*******************/
/* Action Creators */
/*******************/

const getProductsRequest = () => {
	return {
		type: ACTIONS.GET_PRODUCTS_REQUEST,
		payload: {},
	};
}

const getProductsSuccess = (results) => {
	return {
		type: ACTIONS.GET_PRODUCTS_SUCCESS,
		payload: {
			products: results,
		},
	};
}

const getProductsError = (error) => {
	return {
		type: ACTIONS.GET_PRODUCTS_ERROR,
		payload: {
			error,
		},
	};
}