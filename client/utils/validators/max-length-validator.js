export default (maxLength, message) => {
  return {
    message: message || `Max field length ${maxLength}`,
    validate: (value) => {
      return value ? value.length <= maxLength : true;
    },
  };
};
