import axios from 'axios';
import qs from 'qs';
import { get } from 'lodash';

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

        return new Promise((resolve, reject) => {
            axios.post('/auth/login', qs.stringify(postBody), config)
                .then((response) => {
                    const token = get(response, 'data.token');
                    dispatch(loginSuccess(token));
                    resolve(token);
                })
                .catch((error) => {
                    const errorCode = get(error, 'response.data.code');
                    dispatch(loginError(errorCode));
                    reject({code: errorCode});
                });
        });
    };
};

export const logout = () => {
    return (dispatch) => {
        dispatch(logoutRequest());

        return new Promise((resolve, reject) => {
            axios.put('/auth/logout', {})
                .then((response) => {
                    dispatch(logoutSuccess());
                    resolve();
                })
                .catch((error) => {
                    const errorCode = get(error, 'response.data.code');
                    dispatch(logoutError(errorCode));
                    reject({code: errorCode});
                });
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

const loginSuccess = (token) => {
    return {
        type: ACTIONS.SEND_LOGIN_SUCCESS,
        payload: {
            token,
        },
    };
};
const loginError = (errorCode) => {
    return {
        type: ACTIONS.SEND_LOGIN_ERROR,
        payload: {
            errorCode,
        },
    };
};

const logoutRequest = () => {
    return {
        type: ACTIONS.SEND_LOGOUT_REQUEST,
        payload: {},
    };
};

const logoutSuccess = () => {
    return {
        type: ACTIONS.SEND_LOGOUT_SUCCESS,
        payload: {},
    };
};
const logoutError = (errorCode) => {
    return {
        type: ACTIONS.SEND_LOGOUT_ERROR,
        payload: {
            errorCode,
        },
    };
};
