import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from 'client/components/grid/grid.less';

class Grid extends Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <div className={styles.GridContainer}>
                {this.props.children}
            </div>
        );
    };
}

Grid.propTypes = {
    children: PropTypes.oneOfType([PropTypes.bool, PropTypes.array, PropTypes.object]),
};

export default Grid;
