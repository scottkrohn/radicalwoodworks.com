import React from 'react';

// Constants
import NavConstants from '../../constants/nav-constants';

// Styles
import styles from './navbar-v2.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

const NavbarV2 = () => {
  useStyles(styles);

  const NavBarLink = ({ label, path, onClick }) => {
    return (
      <a
        className={styles.NavbarLink} href={path}
        onClick={onClick}
      >
        {label}
      </a>
    );
  };

  const logout = () => {
    console.log('logout');
  }

  return (
    <div className={styles.NavbarContainer}>
      <div className={styles.NavbarLinks}>
        {NavConstants.navBarLinks.mainNav.map((link) => {
          return <NavBarLink
            key={link.path} label={link.label}
            path={link.path}
          />;
        })}
      </div>
      <div className={styles.NavbarLinks}>
        <NavBarLink
          label={NavConstants.navBarLinks.accountNav.login.label}
          path={NavConstants.navBarLinks.accountNav.login.path}
        />
        {/* TODO: Conditionally show admin/logout buttons */}
        <NavBarLink
          label={NavConstants.navBarLinks.accountNav.admin.label}
          path={NavConstants.navBarLinks.accountNav.admin.path}
        />
        <NavBarLink
          label={NavConstants.navBarLinks.accountNav.logout.label}
          path={NavConstants.navBarLinks.accountNav.logout.path}
          onClick={logout}
        />
      </div>
    </div>
  );
};

export default NavbarV2;
