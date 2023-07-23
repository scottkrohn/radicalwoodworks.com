import React from 'react';
import cx from 'classnames';

import styles from './select-input.module.scss';


const SelectInput = (props) => {
  

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
