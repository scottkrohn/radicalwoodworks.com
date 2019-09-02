import React from 'react';
import cx from 'classnames';

import styles from './spinner-v2.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

const Spinner = ({ children, className, spinning }) => {
  useStyles(styles);
  return <div className={cx(styles.SpinnerContainer, spinning && styles.Spinning, className)}>{children}</div>;
};

export default Spinner;
