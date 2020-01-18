import React, { Fragment } from 'react';
import cx from 'classnames';

import styles from './table-head.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

const TableHead = ({ className, children }) => {
  useStyles(styles);

  return (
    <thead className={cx(className, styles.TableHeadContainer)}>
      {Array.isArray(children)
        ? children.map((child, index) => {
          return React.cloneElement(child, { type: 'head', key: index });
        })
        : React.cloneElement(children, { head: true })}
    </thead>
  );
};

export default TableHead;
