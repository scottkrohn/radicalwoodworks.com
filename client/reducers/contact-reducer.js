import ACTIONS from 'constants/action-constants';

const initialState = {
	sending: false,
	error: false,
};

const contactReducer = (state = initialState, { type, payload }) => {
	switch (type) {
	case ACTIONS.SEND_CONTACT_REQUEST:
		return {
			...state,
			sending: true,
			error: false,
		};
	case ACTIONS.SEND_CONTACT_SUCCESS:
		return {
			...state,
			sending: false,
			error: false,
		};
	case ACTIONS.SEND_CONTACT_ERROR:
		return {
			...state,
			sending: false,
			error: true,
		};
	default:
		return state;
	}
};

export default contactReducer;
