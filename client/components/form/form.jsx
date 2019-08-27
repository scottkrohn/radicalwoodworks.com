import React, { useEffect, useState } from 'react';
import { every, values, mapValues } from 'lodash';

// TODO: run validate on all fields before submitting to highlight the invalid fields

const Form = ({ children, fields }) => {
  const [formFields, setFormFields] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setFormFields(setupFieldInitialValues());
  }, [fields]);

  const setupFieldInitialValues = () => {
    return mapValues(fields, (field) => {
      return {
        ...field,
        isDirty: false,
        isValid: !field.validators, // If there's no validators then it's always valid.
      };
    });
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

  const isFormValid = () => {
    return every(values(formFields), (field) => {
      return field.isValid;
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

  const getFormValues = () => {
    return {
      fields: mapValues(formFields, (formField) => {
        return formField.value;
      }),
      isValid: isFormValid(),
    };
  };

  const formData = {
    onChange,
    fieldProps,
    getFormValues,
  };

  return typeof children === 'function' ? children(formData) : children;
};

export default Form;
