import React, { useState } from 'react';
import { get } from 'lodash';
import cx from 'classnames';
import Cookie from 'js-cookie';
import { connect } from 'react-redux';

// Constants
import NavConstants from '../../constants/nav-constants';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

// Styles
import styles from './navbar.scss';
import useStyles from 'isomorphic-style-loader/useStyles';
import Drawer from '../drawer/drawer';

// Actions
import { logout } from 'client/actions/auth-actions';

const Navbar = ({ auth, logout, location }) => {
  useStyles(styles);
  const [hamburgerMenuShowing, setHamburgerMenuShowing] = useState(false);
  const isLoggedIn = auth.loggedIn;

  const NavbarLink = ({ className, label, path, onClick }) => {
    const classes = cx(styles.NavbarLink, className && className);

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

  const handleLogout = () => {
    Cookie.remove('utoken');
    this.props.logout();
  };

  const hideHamburgerMenu = () => {
    hamburgerMenuShowing && setHamburgerMenuShowing(false);
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
        {isLoggedIn ? (
          <NavbarLink
            label={NavConstants.navBarLinks.accountNav.logout.label}
            path={NavConstants.navBarLinks.accountNav.logout.path}
            onClick={logout}
          />
        ) : (
          <NavbarLink
            label={NavConstants.navBarLinks.accountNav.login.label}
            path={NavConstants.navBarLinks.accountNav.login.path}
          />
        )}
        {isLoggedIn && (
          <NavbarLink
            label={NavConstants.navBarLinks.accountNav.admin.label}
            path={NavConstants.navBarLinks.accountNav.admin.path}
          />
        )}
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
        hide={hideHamburgerMenu}
        className={styles.Drawer}
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
                    onClick={hideHamburgerMenu}
                    className={getCurrentPageName() === link.value && styles.ActiveLink}
                  />
                );
              })}
              {isLoggedIn ? (
                <NavbarLink
                  label={NavConstants.navBarLinks.accountNav.logout.label}
                  path={NavConstants.navBarLinks.accountNav.logout.path}
                  onClick={handleLogout}
                />
              ) : (
                <NavbarLink
                  label={NavConstants.navBarLinks.accountNav.login.label}
                  path={NavConstants.navBarLinks.accountNav.login.path}
                />
              )}
              {isLoggedIn && (
                <NavbarLink
                  label={NavConstants.navBarLinks.accountNav.admin.label}
                  path={NavConstants.navBarLinks.accountNav.admin.path}
                />
              )}
            </div>
          );
        }}
      </Drawer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapActionsToProps = {
  logout,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Navbar);
