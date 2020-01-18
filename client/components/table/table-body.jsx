import React from 'react';
import cx from 'classnames';

import styles from './table-body.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

const TableBody = ({ className, children }) => {
  useStyles(styles);
  return (
    <tbody className={cx(className, styles.TableBodyContainer)}>
      {Array.isArray(children) ? children.map((child) => child) : children}
    </tbody>
  );
};

export default TableBody;
