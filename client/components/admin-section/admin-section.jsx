import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import Button from '@components/button/button';
import Link from 'next/link';

// Styles
import styles from '@components/admin-section/admin-section.scss';


const AdminSection = ({
  onClickHandler,
  title,
  text,
  buttonHref,
  buttonText,
}) => {
  

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
        <Link href={buttonHref}>
          <Button primary onClick={handleButtonClick}>
            {buttonText}
          </Button>
        </Link>
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
