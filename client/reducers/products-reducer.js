import ACTIONS from 'client/constants/action-constants';

const initialState = {};

const productsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ACTIONS.GET_PRODUCTS_REQUEST:
			return {
				loading: true,
				error: false,
				...state,
			}
		case ACTIONS.GET_PRODUCTS_SUCCESS:
			return {
				...payload,
				...state,
				loading: false,
				error: false,
			}
		case ACTIONS.GET_PRODUCTS_ERROR:
			return {
				loading: false,
				error: true,
				...state,
			}
		default:
			return state;
	}
};

export default productsReducer;
