export default (minLength, message) => {
  return {
    message: message || `Max field length ${maxLength}`,
    validate: (value) => {
      return value ? value.length >= minLength : true;
    },
  };
};
