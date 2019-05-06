import React, { Component } from 'react';
import PropTypes from 'prop-types';

import 'client/components/grid/grid.less';

class Grid extends Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <div className="grid-container">
                {this.props.children}
            </div>
        );
    };
}

Grid.propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Grid;
