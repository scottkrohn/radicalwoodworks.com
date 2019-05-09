import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NotFoundContainer extends Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <div className="container-fluid">
                <div className="row">
                    <h3>Uh oh, you're not supposed to be here. You should probably go back home.</h3>
                </div>
            </div>
        );
    }
}

export default NotFoundContainer;