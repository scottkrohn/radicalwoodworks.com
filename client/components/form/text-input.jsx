import React from 'react';
import cx from 'classnames';

import styles from './text-input.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

const TextInput = ({ value = '', ...props }) => {
  useStyles(styles);
  const Input = textArea ? 'textarea' : 'input';

  const { className, fieldName, label, onChange, textArea } = props;

  return (
    <div className={cx(styles.TextInputContainer, className)}>
      <span className={styles.TextInputLabel}>{label}</span>
      <Input
        className={styles.TextInput}
        onChange={onChange(fieldName)}
        value={value}
      />
    </div>
  );
};

export default TextInput;
