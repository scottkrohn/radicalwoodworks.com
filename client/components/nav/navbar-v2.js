import React from 'react';
import { get } from 'lodash';

// Constants
import NavConstants from '../../constants/nav-constants';

// Styles
import styles from './navbar-v2.scss';
import useStyles from 'isomorphic-style-loader/useStyles';
import classNames from 'classNames';

const NavbarV2 = ({location}) => {
  useStyles(styles);

  const NavbarLink = ({ className, label, path, onClick }) => {
    const classes = classNames(styles.NavbarLink, className && className);

    return (
      <a
        className={classes} href={path}
        onClick={onClick}
      >
        {label}
      </a>
    );
  };

  const getCurrentPageName = () => {
    let currentPage = NavConstants.pages.home.key;

    if (location &&location.pathname) {
      const pathParts = location.pathname.split('/').filter((str) => str);
      if (pathParts.length) {
        currentPage = get(pathParts, '[0]');
      }
    }

    return currentPage;
  };

  const logout = () => {
    console.log('logout');
  }

  return (
    <div className={styles.NavbarContainer}>
      <div className={styles.NavbarLinks}>
        {NavConstants.navBarLinks.mainNav.map((link) => {
          return <NavbarLink
            key={link.path} label={link.label}
            path={link.path}
            className={getCurrentPageName() === link.value && styles.ActiveLink}
          />;
        })}
      </div>
      <div className={styles.NavbarLinks}>
        <NavbarLink
          label={NavConstants.navBarLinks.accountNav.login.label}
          path={NavConstants.navBarLinks.accountNav.login.path}
        />
        {/* TODO: Conditionally show admin/logout buttons */}
        <NavbarLink
          label={NavConstants.navBarLinks.accountNav.admin.label}
          path={NavConstants.navBarLinks.accountNav.admin.path}
        />
        <NavbarLink
          label={NavConstants.navBarLinks.accountNav.logout.label}
          path={NavConstants.navBarLinks.accountNav.logout.path}
          onClick={logout}
        />
      </div>
    </div>
  );
};

export default NavbarV2;
