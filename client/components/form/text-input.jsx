import React from 'react';
import cx from 'classnames';

import styles from './text-input.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

const TextInput = ({ value = '', ...props }) => {
  useStyles(styles);
  const { className, fieldName, label, onChange, rows, textArea } = props;
  const Input = textArea ? 'textarea' : 'input';

  return (
    <div className={cx(styles.TextInputContainer, className)}>
      <span className={styles.TextInputLabel}>{label}</span>
      <Input
        className={cx(styles.TextInput, textArea && styles.TextArea)}
        onChange={onChange(fieldName)}
        value={value}
        rows={rows}
      />
    </div>
  );
};

export default TextInput;
