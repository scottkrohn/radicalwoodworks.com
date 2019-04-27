import React, { Component } from "react";
import { get } from "lodash";

// Components
import { Menu, Drawer } from "antd";
import NavLink from "components/nav/nav-link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

// Constants
import NAV from "constants/nav-constants";

import "client/components/nav/navbar.less";

class NavBar extends Component {
  constructor(props) {
    super(props);

    const currentPage = this.getCurrentPageName();

    this.state = {
			current: currentPage,
			drawerOpen: false,
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

	toggleHamburger = () => {
		this.setState({
			drawerOpen: !this.state.drawerOpen,
		});
	}

  render() {
    return (
      <div className="nav-bar">
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
					<Menu.Item onClick={this.toggleHamburger} key="test">
						<FontAwesomeIcon className="hamburger-button" icon={faBars} />
					</Menu.Item>
          <Menu.Item className="hide-mobile" key={NAV.pages.home.key}>
            <NavLink
              label={NAV.pages.home.label}
              to={`/${NAV.pages.home.path}`}
            />
          </Menu.Item>
          <Menu.Item className="hide-mobile" key={NAV.pages.products.key}>
            <NavLink
              label={NAV.pages.products.label}
              to={`/${NAV.pages.products.path}`}
            />
          </Menu.Item>
          <Menu.Item className="hide-mobile" key={NAV.pages.about.key}>
            <NavLink
              label={NAV.pages.about.label}
              to={`/${NAV.pages.about.path}`}
            />
          </Menu.Item>
          <Menu.Item className="hide-mobile" key={NAV.pages.contact.key}>
            <NavLink
              label={NAV.pages.contact.label}
              to={`/${NAV.pages.contact.path}`}
            />
          </Menu.Item>
          <Menu.Item className="hide-mobile" key={NAV.pages.faq.key}>
            <NavLink
              label={NAV.pages.faq.label}
              to={`/${NAV.pages.faq.path}`}
            />
          </Menu.Item>
        </Menu>

				<Drawer
          placement="top"
          closable={true}
          onClose={this.toggleHamburger}
					visible={this.state.drawerOpen}
					height={500}
        >
					<ul className="nav-dropdown-list">
						<li onClick={this.toggleHamburger}>
							<NavLink
								label={NAV.pages.home.label}
								to={`/${NAV.pages.home.path}`}
								className="hamburger-link"
							/>
						</li>
						<li onClick={this.toggleHamburger}>
            <NavLink
              label={NAV.pages.products.label}
              to={`/${NAV.pages.products.path}`}
							className="hamburger-link"
            />
						</li>
						<li onClick={this.toggleHamburger}>
							<NavLink
								label={NAV.pages.about.label}
								to={`/${NAV.pages.about.path}`}
								className="hamburger-link"
							/>
						</li>
						<li onClick={this.toggleHamburger}>
							<NavLink
								label={NAV.pages.contact.label}
								to={`/${NAV.pages.contact.path}`}
								className="hamburger-link"
							/>
						</li>
						<li onClick={this.toggleHamburger}>
							<NavLink
								label={NAV.pages.faq.label}
								to={`/${NAV.pages.faq.path}`}
								className="hamburger-link"
							/>
						</li>
					</ul>
        </Drawer>
      </div>
    );
  }
}

export default NavBar;
