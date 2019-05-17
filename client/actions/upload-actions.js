import axios from 'axios';

// Constants
import ACTIONS from 'constants/action-constants';
import { Route53Resolver } from 'node_modules/aws-sdk/index';

export const uploadImage = (file) => {
    return (dispatch) => {
        dispatch(uploadProductRequest());

        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('image', file);

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            };

            axios({
                url: '/server/image/upload',
                method: 'post',
                config,
                data: formData,
            }).then((result) => {
                console.log(result);
                resolve(result.data);
            })
            .catch((error) => {
                // TODO: something with the error
            });
        });
    };
};

/*******************/
/* Action Creators */
/*******************/

const uploadProductRequest = () => {
    return {
        type: ACTIONS.UPLOAD_IMAGE_REQUEST,
        payload: {},
    };
};

const uploadProductSuccess = () => {
    return {
        type: ACTIONS.UPLOAD_IMAGE_SUCCESS,
        payload: {},
    };
};

const uploadProductError = () => {
    return {
        type: ACTIONS.UPLOAD_IMAGE_ERROR,
        payload: {},
    };
};