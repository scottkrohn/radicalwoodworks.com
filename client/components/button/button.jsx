import React from 'react';
import cx from 'classnames';

import styles from './button.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

const Button = ({ className, children, onClick }) => {
  useStyles(styles);

  return (
    <div className={cx(styles.ButtonContainer, className)}>
      <button
        className={styles.Button}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
