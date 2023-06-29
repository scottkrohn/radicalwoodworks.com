'use client';
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
import Link from 'next/link';
import CartIcon from '../cart-icon/cart-icon';

// Styles
import styles from './navbar.scss';
import Drawer from '../drawer/drawer';

// Actions
import { logout } from 'client/actions/auth-actions';
import { getCartById } from 'client/actions/cart-actions';

// Selectors
import { selectItemCount } from '@selectors/cart-selectors';
import { selectIsAdmin, selectUser } from '@selectors/user-selectors';

const Navbar = ({ auth, itemCount, isAdmin, logout, location, user }) => {
  const [hamburgerMenuShowing, setHamburgerMenuShowing] = useState(false);
  const isLoggedIn = auth.loggedIn;

  const NavbarLink = ({ className, label, path, onClick }) => {
    const classes = cx(styles.NavbarLink, className && className);

    return (
      <Link className={classes} to={path} onClick={onClick}>
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
    logout();
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
              className={
                getCurrentPageName() === link.value && styles.ActiveLink
              }
            />
          );
        })}
      </div>
      <div className={styles.NavbarLinks}>
        <div className={styles.CartContainer}>
          <CartIcon itemCount={itemCount} />
        </div>
        {isLoggedIn && isAdmin && (
          <NavbarLink
            label={NavConstants.navBarLinks.accountNav.admin.label}
            path={NavConstants.navBarLinks.accountNav.admin.path}
          />
        )}
        {isLoggedIn && !isAdmin && (
          <NavbarLink
            label={NavConstants.navBarLinks.accountNav.account.label}
            path={NavConstants.navBarLinks.accountNav.account.path}
          />
        )}
        {isLoggedIn ? (
          <NavbarLink
            label={NavConstants.navBarLinks.accountNav.logout.label}
            path={NavConstants.navBarLinks.accountNav.logout.path}
            onClick={handleLogout}
          />
        ) : (
          <React.Fragment>
            <NavbarLink
              label={NavConstants.navBarLinks.accountNav.signup.label}
              path={NavConstants.navBarLinks.accountNav.signup.path}
            />
            <NavbarLink
              label={NavConstants.navBarLinks.accountNav.login.label}
              path={NavConstants.navBarLinks.accountNav.login.path}
            />
          </React.Fragment>
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
                    className={
                      getCurrentPageName() === link.value && styles.ActiveLink
                    }
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
    itemCount: selectItemCount(state),
    user: selectUser(state),
    isAdmin: selectIsAdmin(state),
  };
};

const mapActionsToProps = {
  logout,
  getCartById,
};

export default connect(mapStateToProps, mapActionsToProps)(Navbar);
