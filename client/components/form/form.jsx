import React, { useEffect, useState } from 'react';
import { mapValues } from 'lodash';

// TODO: handle invalid data on submit: ie a 'isValid' for entire form
// TODO: run validate on all fields before submitting to highlight the invalid fields
// TODO: Handle multiple validators

const Form = ({ children, fields }) => {
  const [formFields, setFormFields] = useState({});

  useEffect(() => {
    setFormFields(setupFieldInitialValues());
  }, [fields]);

  const setupFieldInitialValues = () => {
    return mapValues(fields, (field) => ({
      ...field,
      isDirty: false,
    }));
  };

  const onChange = (fieldName) => (event) => {
    const newValue = event.target.value;
    runValidate(fieldName, newValue);

    setFormFields({
      ...formFields,
      [fieldName]: {
        ...formFields[fieldName],
        value: newValue,
        ...runValidate(fieldName, newValue),
        isDirty: true,
      },
    });
  };

  const runValidate = (fieldName, value) => {
    const validators = formFields[fieldName].validators;
    if (validators && validators.length) {
      for (const validator of validators) {
        if (!validator.validate(value)) {
          return {
            isValid: false,
            message: validator.message,
          };
        }
      }
    }

    // If no validator was provided then it's always valid.
    return {
      isValid: true,
    };
  };

  const fieldProps = (fieldName) => {
    return {
      ...formFields[fieldName],
      fieldName,
    };
  };

  const formData = {
    onChange,
    fieldProps,
    formValues: formFields,
  };

  return typeof children === 'function' ? children(formData) : children;
};

export default Form;
