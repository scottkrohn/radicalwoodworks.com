import axios from 'axios';

// Constants
import ACTIONS from '../constants/action-constants';

function getSampleInformationRequest() {
	return {
		type: ACTIONS.SAMPLE_INFO_REQUEST,
		payload: {},
	};
}

function getSampleInformationSuccess(sampleInformation) {
	return {
		type: ACTIONS.SAMPLE_INFO_SUCCESS,
		payload: {
			sampleInformation,
		},
	};
}

function getSampleInformationError(error) {
	return {
		type: ACTIONS.SAMPLE_INFO_ERROR,
		payload: {
			errorInfo: error,
		},
	};
}

export function getSampleInformation(storeName) {
	return (dispatch) => {
		dispatch(getSampleInformationRequest());
		console.log('sample api calledin action file');

		axios.get(`/api/sample`)
			.then((response) => {
				dispatch(getSampleInformationSuccess(response));
			})
			.catch((error) => {
				dispatch(getSampleInformationError(error));
			});
	};
}