import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import Button from 'client/components/button/button';
import NavLink from 'client/components/nav/nav-link';

// Styles
import styles from 'client/components/admin-section/admin-section.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

const AdminSection = ({ onClickHandler, title, text, buttonHref, buttonText }) => {
  useStyles(styles);

  const handleButtonClick = () => {
    if (typeof onClickHandler === 'function') {
      onClickHandler();
    }
  };

  return (
    <div className={styles.AdminSectionContainer}>
      <div className={styles.TitleContainer}>{title}</div>
      <div className={styles.TextContainer}>{text}</div>
      <div className={styles.ButtonContainer}>
        <NavLink to={buttonHref}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleButtonClick}
          >
            {buttonText}
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

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
