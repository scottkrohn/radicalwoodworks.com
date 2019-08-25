import React, { useEffect, useState } from 'react';

const Form = ({ children, fieldsInit }) => {
  const [fields, setFields] = useState({});

  useEffect(() => {
    setFields(fieldsInit);
  }, [fieldsInit]);

  const onChange = (fieldName) => (event) => {
    setFields({
      ...fields,
      [fieldName]: event.target.value,
    });
  };

  const formFields = (fieldName) => {
    return {
      value: fields[fieldName],
      fieldName: fieldName,
    };
  };

  const formFuncs = {
    onChange,
    formFields,
    formValues: fields,
  };

  return typeof children === 'function' ? children(formFuncs) : children;
};

export default Form;
