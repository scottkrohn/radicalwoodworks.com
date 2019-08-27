import React from 'react';
import cx from 'classNames';

import styles from './select-input.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

const SelectInput = (props) => {
  useStyles(styles);

  const { className, label, fieldName, options, onChange } = props;

  return (
    <div className={cx(styles.SelectInputContainer, className)}>
      <span className={styles.SelectInputLabel}>{label}</span>
      <select
        className={styles.SelectInput}
        value={props.value}
        onChange={onChange(fieldName)}
      >
        {options &&
          options.length &&
          options.map(({ value, label }) => {
            return (
              <option
                key={value}
                value={value}
              >
                {label}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default SelectInput;
