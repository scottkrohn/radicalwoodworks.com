import React, { useEffect, useState } from 'react';
import { every, values, mapValues } from 'lodash';

const Form = ({ children, fields }) => {
  const [formFields, setFormFields] = useState({});

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

    setFormFields({
      ...formFields,
      [fieldName]: {
        ...formFields[fieldName],
        value: newValue,
        ...validateField(fieldName, newValue),
        isDirty: true,
      },
    });
  };

  const isFormValid = () => {
    return every(values(formFields), (field) => {
      return field.isValid;
    });
  };

  const validateField = (fieldName, value) => {
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

  const validateForm = () => {
    const validatedFormFields = {};
    for (const fieldName in formFields) {
      validatedFormFields[fieldName] = {
        ...formFields[fieldName],
        ...validateField(fieldName, formFields[fieldName].value),
        isDirty: true,
      };
    }

    setFormFields(validatedFormFields);
  };

  const handleEnterKey = (handleSubmit) => (event) => {
    if (event.keyCode === 13) {
      handleSubmit(getFormValues)();
    }
  };

  const fieldProps = (fieldName) => {
    return {
      ...formFields[fieldName],
      fieldName,
    };
  };

  const getFormValues = (runValidation = true) => {
    if (runValidation) {
      validateForm();
    }

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
    handleEnterKey,
  };

  return typeof children === 'function' ? children(formData) : children;
};

export default Form;
