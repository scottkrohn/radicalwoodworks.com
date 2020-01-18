import React from 'react';

// Components
import SocialIcons from 'client/components/social-icons/social-icons';
// Styles
import styles from 'client/components/footer/footer.less';
import useStyles from 'isomorphic-style-loader/useStyles';

const handleBackToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const Footer = () => {
  useStyles(styles);
  return (
    <div className={styles.FooterContainer}>
      <SocialIcons />
      <div
        onClick={handleBackToTop}
        className={styles.BackToTop}
      ></div>
      <div className={styles.Copyright}>{new Date().getFullYear()} Radical Woodworks</div>
    </div>
  );
};

export default Footer;
