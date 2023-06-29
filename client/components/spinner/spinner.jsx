import React from 'react';
import cx from 'classnames';

import styles from './spinner.scss';


const Spinner = ({ children, className, spinning }) => {
  
  return (
    <div
      className={cx(
        styles.SpinnerContainer,
        spinning && styles.Spinning,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Spinner;
