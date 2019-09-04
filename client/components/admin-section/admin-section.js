import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import Button from 'client/components/base/button/button';
import NavLink from 'client/components/nav/nav-link';

// Styles
import 'client/components/admin-section/admin-section.less';
import styles from 'client/components/admin-section/admin-section.less';

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
    return (
      <div className={styles.AdminSectionContainer}>
        <div className={styles.TitleContainer}>{this.props.title}</div>
        <div className={styles.TextContainer}>{this.props.text}</div>
        <div className={styles.ButtonContainer}>
          <NavLink to={this.props.buttonHref}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleButtonClick}
            >
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

export default AdminSection;
