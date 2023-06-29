import React, { Fragment } from 'react';
import cx from 'classnames';

import styles from './table-head.scss';


const TableHead = ({ className, children }) => {
  

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
