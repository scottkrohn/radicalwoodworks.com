import ACTIONS from 'constants/action-constants';

const initialState = {
	token: null,
};

const authReducer = (state = initialState, { type, payload }) => {
	switch (type) {
	case ACTIONS.SEND_LOGIN_REQUEST:
		return {
			...state,
			sending: true,
			error: false,
		};
	case ACTIONS.SEND_LOGIN_ERROR:
		return {
			...state,
			...payload,
			sending: true,
			error: false,
		};
	case ACTIONS.SEND_LOGIN_SUCCESS:
		return {
			...state,
			...payload,
			sending: false,
			error: false,
		};
	default: 
		return state;
	}
};

export default authReducer;
