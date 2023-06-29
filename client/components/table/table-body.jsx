import React from 'react';
import cx from 'classnames';

import styles from './table-body.scss';


const TableBody = ({ className, children }) => {
  
  return (
    <tbody className={cx(className, styles.TableBodyContainer)}>
      {Array.isArray(children) ? children.map((child) => child) : children}
    </tbody>
  );
};

export default TableBody;
