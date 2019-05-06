import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import 'client/components/admin-section/admin-section.less';

class AdminSection extends Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <div className="admin-section-container">
                <div className="title-container">{this.props.title}</div>
                <div className="text-container">{this.props.text}</div>
                <div className="button-container">
                    <Button variant="contained">{this.props.buttonText}</Button>
                </div>
            </div>
        );
    };
}

AdminSection.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    buttonText: PropTypes.string,
    onClickHandler: PropTypes.func,
};

export default AdminSection;
