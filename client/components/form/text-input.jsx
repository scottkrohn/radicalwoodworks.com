import React from 'react';
import cx from 'classnames';

import styles from './text-input.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

const TextInput = ({ value = '', ...props }) => {
  useStyles(styles);
  const { className, isDirty, isValid, fieldName, label, onChange, rows, textArea, validator } = props;
  const Input = textArea ? 'textarea' : 'input';

  const showValidationError = isDirty && !isValid && validator && validator.message;

  return (
    <div className={cx(styles.TextInputContainer, className)}>
      <span className={styles.TextInputLabel}>{label}</span>
      <Input
        className={cx(styles.TextInput, textArea && styles.TextArea, isValid === false && styles.Error)}
        onChange={onChange(fieldName)}
        value={value}
        rows={rows}
      />
      {showValidationError && <span className={styles.ErrorMessage}>{validator.message}</span>}
    </div>
  );
};

export default TextInput;
