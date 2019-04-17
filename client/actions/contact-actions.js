import axios from 'axios';

// Constants
import ACTIONS from 'constants/action-constants';

export const sendContact = (contact) => {
	return (dispatch) => {
		console.log('doing contact action');
		dispatch(sendContentRequest());

		axios.post(`/server/contact/send`, {
			contact: contact.getValues(),
		}).then((response) => {
				console.log(response);
			})
			.catch((err) => {

			});
	}
}


/*******************/
/* Action Creators */
/*******************/

const sendContentRequest = () => {
    return {
        type: ACTIONS.SEND_CONTACT_REQUEST,
        payload: {},
    };
}

const sendContentSuccess = (results) => {
    return {
        type:ACTIONS.SEND_CONTACT_SUCCESS,
        payload: {
            content: results,
        },
    };
}

const sendContentError = (error) => {
    return {
        type: ACTIONS.SEND_CONTACT_ERROR,
        payload: error,
    };
}