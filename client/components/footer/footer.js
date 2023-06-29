'use client';
import React from 'react';

// Components
import SocialIcons from '@components/social-icons/social-icons';
// Styles
import styles from '@components/footer/footer.scss';

const handleBackToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const Footer = () => {

  return (
    <div className={styles.FooterContainer}>
      <SocialIcons />
      <div onClick={handleBackToTop} className={styles.BackToTop}></div>
      <div className={styles.Copyright}>
        {new Date().getFullYear()} Radical Woodworks
      </div>
    </div>
  );
};

export default Footer;
