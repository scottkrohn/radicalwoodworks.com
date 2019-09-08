import React from 'react';
import PropTypes from 'prop-types';

import styles from 'client/components/grid/grid.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

const Grid = ({ children }) => {
  useStyles(styles);
  return <div className={styles.GridContainer}>{children}</div>;
};

Grid.propTypes = {
  children: PropTypes.oneOfType([PropTypes.bool, PropTypes.array, PropTypes.object]),
};

export default Grid;
