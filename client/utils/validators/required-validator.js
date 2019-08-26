export default (message) => {
  return {
    message: message || 'This field is required',
    validate: (value) => {
      return !!value;
    },
  };
};
