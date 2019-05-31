import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Cookie from 'js-cookie';
import { connect } from 'react-redux';
import classnames from 'classnames';

// Components
import { Menu, Drawer } from 'antd';
import NavLink from 'components/nav/nav-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

// Actions
import { logout } from 'client/actions/auth-actions';
import { verifyLogin } from 'client/actions/admin-actions';

// Constants
import NAV from 'constants/nav-constants';

// Styles
import styles from 'client/components/nav/navbar.less';

class NavBar extends Component {
  constructor(props) {
    super(props);

    const currentPage = this.getCurrentPageName();

    this.state = {
      current: currentPage,
      drawerOpen: false,
    };
  }

  componentDidMount = () => {
    this.props.verifyLogin().catch(() => {
      this.logout();
    });
  };

  getCurrentPageName = () => {
    let currentPage = NAV.pages.home.key;

    const pathName = get(window, 'location.pathname', null);
    if (pathName) {
      const pathParts = pathName.split('/').filter((str) => str);
      if (pathParts.length) {
        currentPage = get(pathParts, '[0]');
      }
    }

    return currentPage;
  };

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  };

  logout = () => {
    Cookie.remove('utoken');
    this.props.logout();
  };

  toggleHamburger = () => {
    this.setState({
      drawerOpen: !this.state.drawerOpen,
    });
  };

  render() {
    const isLoggedIn = !!Cookie.get('utoken') || this.props.auth.loggedIn;

    return (
      <div className={styles.NavBar}>
        <Menu
          onClick={this.handleClick} selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          <Menu.Item
            className={styles.HideDesktop} onClick={this.toggleHamburger}
            key="test"
          >
            <FontAwesomeIcon className={styles.HamburgerButton} icon={faBars} />
          </Menu.Item>
          <Menu.Item className={styles.HideMobile} key={NAV.pages.home.key}>
            <NavLink label={NAV.pages.home.label} to={`/${NAV.pages.home.path}`} />
          </Menu.Item>
          <Menu.Item className={styles.HideMobile} key={NAV.pages.products.key}>
            <NavLink label={NAV.pages.products.label} to={`/${NAV.pages.products.path}`} />
          </Menu.Item>
          <Menu.Item className={styles.HideMobile} key={NAV.pages.about.key}>
            <NavLink label={NAV.pages.about.label} to={`/${NAV.pages.about.path}`} />
          </Menu.Item>
          <Menu.Item className={styles.HideMobile} key={NAV.pages.contact.key}>
            <NavLink label={NAV.pages.contact.label} to={`/${NAV.pages.contact.path}`} />
          </Menu.Item>
          <Menu.Item className={styles.HideMobile} key={NAV.pages.faq.key}>
            <NavLink label={NAV.pages.faq.label} to={`/${NAV.pages.faq.path}`} />
          </Menu.Item>
          {isLoggedIn ? (
            <Menu.Item className={classnames(styles.HideMobile, styles.RightLink)} key={NAV.pages.admin.key}>
              <NavLink label={NAV.pages.admin.label} to={`/${NAV.pages.admin.path}`} />
            </Menu.Item>
          ) : (
            <Menu.Item className={classnames(styles.HideMobile, styles.RightLink)} key={NAV.pages.login.key}>
              <NavLink label={NAV.pages.login.label} to={`/${NAV.pages.login.path}`} />
            </Menu.Item>
          )}
          {isLoggedIn && (
            <Menu.Item className={classnames(styles.HideMobile, styles.RightLink)} key={NAV.pages.logout.key}>
              <NavLink
                label={NAV.pages.logout.label} to={`/${NAV.pages.logout.path}`}
                onClick={this.logout}
              />
            </Menu.Item>
          )}
        </Menu>

        <Drawer
          placement="top"
          closable={true}
          onClose={this.toggleHamburger}
          visible={this.state.drawerOpen}
          height={isLoggedIn ? 700 : 600}
        >
          <ul className={styles.NavDropdownList}>
            <li onClick={this.toggleHamburger}>
              <NavLink
                label={NAV.pages.home.label} to={`/${NAV.pages.home.path}`}
                className={styles.HamburgerLink}
              />
            </li>
            <li onClick={this.toggleHamburger}>
              <NavLink
                label={NAV.pages.products.label}
                to={`/${NAV.pages.products.path}`}
                className={styles.HamburgerLink}
              />
            </li>
            <li onClick={this.toggleHamburger}>
              <NavLink
                label={NAV.pages.about.label} to={`/${NAV.pages.about.path}`}
                className={styles.HamburgerLink}
              />
            </li>
            <li onClick={this.toggleHamburger}>
              <NavLink
                label={NAV.pages.contact.label}
                to={`/${NAV.pages.contact.path}`}
                className={styles.HamburgerLink}
              />
            </li>
            <li onClick={this.toggleHamburger}>
              <NavLink
                label={NAV.pages.faq.label} to={`/${NAV.pages.faq.path}`}
                className={styles.HamburgerLink}
              />
            </li>
            {isLoggedIn ? (
              <li onClick={this.toggleHamburger}>
                <NavLink
                  label={NAV.pages.admin.label}
                  to={`/${NAV.pages.admin.path}`}
                  className={styles.HamburgerLink}
                />
              </li>
            ) : (
              <li onClick={this.toggleHamburger}>
                <NavLink
                  label={NAV.pages.login.label}
                  to={`/${NAV.pages.login.path}`}
                  className={styles.HamburgerLink}
                />
              </li>
            )}
            {isLoggedIn && (
              <li onClick={this.toggleHamburger}>
                <NavLink
                  label={NAV.pages.logout.label}
                  to={`/${NAV.pages.logout.path}`}
                  onClick={this.logout}
                  className={styles.HamburgerLink}
                />
              </li>
            )}
          </ul>
        </Drawer>
      </div>
    );
  }
}

NavBar.propTypes = {
  logout: PropTypes.func,
  verifyLogin: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapActionsToProps = {
  logout,
  verifyLogin,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(NavBar);
