import React from 'react';
import cx from 'classnames';

import styles from './table.scss';


const Table = ({ className, children }) => {
  
  return <table className={cx(className, styles.TableContainer)}>{children}</table>;
};

export default Table;
