import axios from 'axios';
import qs from 'qs';

import ACTIONS from 'constants/action-constants';

export const login = (username, password) => {
	return (dispatch) => {
		dispatch(loginRequest());

		const postBody = {
			username,
			password,
		};

		const config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		};

		console.log(qs.stringify(postBody));

		axios.post('/auth/login', qs.stringify(postBody), config).then((result) => {
			console.log(result);
		});
	};
};

/*******************/
/* Action Creators */
/*******************/

const loginRequest = () => {
	return {
		type: ACTIONS.SEND_LOGIN_REQUEST,
		payload: {},
	};
};

const loginSuccess = () => {
	return {
		type: ACTIONS.SEND_LOGIN_SUCCESS,
		payload: {},
	};
};
const loginError = (error) => {
	return {
		type: ACTIONS.SEND_LOGIN_ERROR,
		payload: {
			error,
		},
	};
};
