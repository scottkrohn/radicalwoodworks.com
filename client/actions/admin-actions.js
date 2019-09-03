export const verifyLogin = () => {
  return (dispatch, getState, axios) => {
    return new Promise((resolve, reject) => {
      axios
        .get('/admin/verify')
        .then((response) => {
          resolve();
        })
        .catch((error) => {
          reject();
        });
    });
  };
};
