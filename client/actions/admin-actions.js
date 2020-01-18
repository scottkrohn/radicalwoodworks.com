export const verifyLogin = () => {
  // TODO: NOTE: this function has moved to auth actions!!!
  // TODO: NOTE: this function has moved to auth actions!!!
  // TODO: NOTE: this function has moved to auth actions!!!
  // TODO: NOTE: this function has moved to auth actions!!!
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
