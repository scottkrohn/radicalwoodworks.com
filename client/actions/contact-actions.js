import axios from 'axios';

// Constants
import ACTIONS from 'constants/action-constants';

export const sendContact = (contact) => {
    return (dispatch) => {
        dispatch(sendContactRequest());

        return new Promise((resolve, reject) => {
            axios.post('/server/contact/send', {
                contact: contact.getValues(),
            }).then((response) => {
                if (response.status === 200) {
                    dispatch(sendContactSuccess(response));
                    resolve(response);
                } else {
                    throw response;
                }

            })
                .catch((err) => {
                    dispatch(sendContactError(err));
                    reject(err);
                });
        });
    };
};


/*******************/
/* Action Creators */
/*******************/

const sendContactRequest = () => {
    return {
        type: ACTIONS.SEND_CONTACT_REQUEST,
        payload: {},
    };
};

const sendContactSuccess = (results) => {
    return {
        type: ACTIONS.SEND_CONTACT_SUCCESS,
        payload: {
            content: results,
        },
    };
};

const sendContactError = (error) => {
    return {
        type: ACTIONS.SEND_CONTACT_ERROR,
        payload: error,
    };
};
