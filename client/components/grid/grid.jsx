import React from 'react';
import PropTypes from 'prop-types';

import styles from '@components/grid/grid.scss';


const Grid = ({ children }) => {
  
  return <div className={styles.GridContainer}>{children}</div>;
};

Grid.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
    PropTypes.object,
  ]),
};

export default Grid;
