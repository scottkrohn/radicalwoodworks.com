import React from 'react';
import cx from 'classnames';

import styles from './table.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

const Table = ({ className, children }) => {
  useStyles(styles);
  return <table className={cx(className, styles.TableContainer)}>{children}</table>;
};

export default Table;
