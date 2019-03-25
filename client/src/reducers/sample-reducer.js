const initialState = null;

import ACTIONS from '../constants/action-constants';

function sampleReducer(state = initialState, { type, payload }) {
	switch (type) {
		case ACTIONS.SAMPLE_INFO_SUCCESS: {
			return {
				info: payload.sampleInformation.data,
				...state,
			};
		}
		default: {
			return state;
		}
	}
}

export default sampleReducer;
