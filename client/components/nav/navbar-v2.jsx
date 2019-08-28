import React, { useState } from 'react';
import { get } from 'lodash';
import cx from 'classnames';

// Constants
import NavConstants from '../../constants/nav-constants';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

// Styles
import styles from './navbar-v2.scss';
import useStyles from 'isomorphic-style-loader/useStyles';
import classNames from 'classNames';
import Drawer from '../drawer/drawer';

const NavbarV2 = ({ location }) => {
  useStyles(styles);
  const [hamburgerMenuShowing, setHamburgerMenuShowing] = useState(false);

  const NavbarLink = ({ className, label, path, onClick }) => {
    const classes = classNames(styles.NavbarLink, className && className);

    return (
      <Link
        className={classes}
        to={path}
        onClick={onClick}
      >
        {label}
      </Link>
    );
  };

  const getCurrentPageName = () => {
    let currentPage = NavConstants.pages.home.key;

    if (location && location.pathname) {
      const pathParts = location.pathname.split('/').filter((str) => str);
      if (pathParts.length) {
        currentPage = get(pathParts, '[0]');
      }
    }

    return currentPage;
  };

  const logout = () => {
    console.log('logout');
  };

  return (
    <div className={styles.NavbarContainer}>
      <div className={styles.NavbarLinks}>
        {NavConstants.navBarLinks.mainNav.map((link) => {
          return (
            <NavbarLink
              key={link.path}
              label={link.label}
              path={link.path}
              className={getCurrentPageName() === link.value && styles.ActiveLink}
            />
          );
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
      <div className={styles.HamburgerContainer}>
        <FontAwesomeIcon
          className={styles.HamburgerIcon}
          icon={faBars}
          onClick={() => setHamburgerMenuShowing(!hamburgerMenuShowing)}
        />
      </div>

      <Drawer
        showing={hamburgerMenuShowing}
        hide={() => setHamburgerMenuShowing(false)}
      >
        {({ hide }) => {
          return (
            <div className={cx('flex', 'flex-dir-col')}>
              {NavConstants.navBarLinks.mainNav.map((link) => {
                return (
                  <NavbarLink
                    key={link.path}
                    label={link.label}
                    path={link.path}
                    onClick={() => setHamburgerMenuShowing(false)}
                    className={getCurrentPageName() === link.value && styles.ActiveLink}
                  />
                );
              })}
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
          );
        }}
      </Drawer>
    </div>
  );
};

export default NavbarV2;
