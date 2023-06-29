import React from 'react';
import cx from 'classnames';

import styles from './text-input.scss';


const TextInput = ({ value = '', ...props }) => {
  
  const {
    className,
    isDirty,
    isValid,
    fieldName,
    label,
    message,
    onChange,
    onKeyDown,
    password,
    rows,
    textArea,
  } = props;
  const Input = textArea ? 'textarea' : 'input';

  const validationError = isDirty && !isValid;
  const showValidationMessage = validationError && message;

  return (
    <div className={cx(styles.TextInputContainer, className)}>
      <span className={styles.TextInputLabel}>{label}</span>
      <Input
        type={password && 'password'}
        className={cx(
          styles.TextInput,
          textArea && styles.TextArea,
          validationError && styles.Error
        )}
        onChange={onChange && onChange(fieldName)}
        value={value}
        rows={rows}
        onKeyDown={typeof onKeyDown === 'function' ? onKeyDown : null}
      />
      {showValidationMessage && (
        <span className={styles.ErrorMessage}>{message}</span>
      )}
    </div>
  );
};

export default TextInput;
