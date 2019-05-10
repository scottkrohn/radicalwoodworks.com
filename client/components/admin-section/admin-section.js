import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import Button from '@material-ui/core/Button';
import NavLink from 'client/components/nav/nav-link';

// Styles
import 'client/components/admin-section/admin-section.less';
import styles from 'client/components/admin-section/admin-section.less';
import { withStyles } from '@material-ui/core/styles';

const styles1 = {
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
};

class AdminSection extends Component {
    constructor(props) {
        super(props);
    }

    handleButtonClick = () => {
        if (typeof this.props.onClickHandler === 'function') {
            this.props.onClickHandler();
        }
    };

    render = () => {
        console.log(styles1);
        const { classes } = this.props;
        return (
            <div className={styles.AdminSectionContainer}>
                <div className={styles.TitleContainer}>{this.props.title}</div>
                <div className={styles.TextContainer}>{this.props.text}</div>
                <div className={styles.ButtonContainer}>
                    <NavLink to={this.props.buttonHref}>
                        <Button className={classes.root} onClick={this.handleButtonClick} variant="contained">
                            {this.props.buttonText}
                        </Button>
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

export default withStyles(styles1)(AdminSection);
