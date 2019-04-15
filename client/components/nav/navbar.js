import React, { Component } from "react";
import { get } from "lodash";

// Components
import { Menu } from "antd";
import NavLink from "components/nav/nav-link";

// Constants
import NAV from "constants/nav-constants";

import "client/components/nav/navbar.less";

class NavBar extends Component {
  constructor(props) {
    super(props);

    const currentPage = this.getCurrentPageName();

    this.state = {
      current: currentPage,
    };
  }

  getCurrentPageName = () => {
    let currentPage = NAV.pages.home.key;

    const pathName = get(window, "location.pathname", null);
    if (pathName) {
      const pathParts = pathName.split("/").filter((str) => str);
      if (pathParts.length) {
        currentPage = get(pathParts, "[0]");
      }
    }

    return currentPage;
  };

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <div className="nav-bar">
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          <Menu.Item key={NAV.pages.home.key}>
            <NavLink
              label={NAV.pages.home.label}
              to={`/${NAV.pages.home.path}`}
              className="nav-link"
            />
          </Menu.Item>
          <Menu.Item key={NAV.pages.products.key}>
            <NavLink
              label={NAV.pages.products.label}
              to={`/${NAV.pages.products.path}`}
              className="nav-link"
            />
          </Menu.Item>
          <Menu.Item key={NAV.pages.about.key}>
            <NavLink
              label={NAV.pages.about.label}
              to={`/${NAV.pages.about.path}`}
              className="nav-link"
            />
          </Menu.Item>
          <Menu.Item key={NAV.pages.contact.key}>
            <NavLink
              label={NAV.pages.contact.label}
              to={`/${NAV.pages.contact.path}`}
              className="nav-link"
            />
          </Menu.Item>
          <Menu.Item key={NAV.pages.faq.key}>
            <NavLink
              label={NAV.pages.faq.label}
              to={`/${NAV.pages.faq.path}`}
              className="nav-link"
            />
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default NavBar;
