import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import Button from '@material-ui/core/Button';
import NavLink from 'client/components/nav/nav-link';

import 'client/components/admin-section/admin-section.less';

class AdminSection extends Component {
    constructor(props) {
        super(props);
    }

    handleButtonClick = () => {
        if (typeof this.props.onClickHandler === 'function') {
            this.props.onClickHandler();
        }
    }

    render = () => {
        return (
            <div className="admin-section-container">
                <div className="title-container">{this.props.title}</div>
                <div className="text-container">{this.props.text}</div>
                <div className="button-container">
                    <NavLink to={this.props.buttonHref}>
                        <Button color="primary" onClick={this.handleButtonClick} variant="outlined">{this.props.buttonText}</Button>
                    </NavLink>
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
    buttonHref: PropTypes.string,
};

AdminSection.defaultProps = {
    buttonHref: '#',
};

export default AdminSection;
