import axios from 'axios';

// Constants
import ACTIONS from 'client/constants/action-constants';

export function getProducts() {
	return (dispatch) => {
		dispatch(getProductsRequest());

		axios.get(`/server/products`)
			.then((response) => {

				dispatch(getProductsSuccess(response.data));
			})
			.catch ((error) => {
				dispatch(getProductsError());
			})
	};
};

/*******************/
/* Action Creators */
/*******************/

function getProductsRequest() {
	return {
		type: ACTIONS.GET_PRODUCTS_REQUEST,
		payload: {},
	};
}

function getProductsSuccess(results) {
	return {
		type: ACTIONS.GET_PRODUCTS_SUCCESS,
		payload: {
			products: results,
		},
	};
}

function getProductsError(error) {
	return {
		type: ACTIONS.GET_PRODUCTS_ERROR,
		payload: {
			error,
		},
	};
}