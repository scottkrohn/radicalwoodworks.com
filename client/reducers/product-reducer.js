
import ACTIONS from 'constants/action-constants';

const initialState = {};

const productReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ACTIONS.GET_PRODUCT_REQUEST:
			return {
				loading: true,
				error: false,
				...state,
			}
		case ACTIONS.GET_PRODUCT_SUCCESS:
			return {
				...payload,
				...state,
				loading: false,
				error: false,
			}
		case ACTIONS.GET_PRODUCT_ERROR:
			return {
				loading: false,
				error: true,
				...state,
			}
		default:
			return state;
	}
};

export default productReducer;
