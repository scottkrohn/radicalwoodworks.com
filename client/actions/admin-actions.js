import axios from 'axios';

export const verifyLogin = () => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.get('/admin/verify')
                .then((response) => {
                    resolve();
                })
                .catch((error) => {
                    reject();
                });
        });
    };
};