import React, { Component } from 'react';
import { get } from 'lodash';

// Components
import { Menu } from 'antd';
import NavLink from 'components/nav/nav-link';

// Constants
import NAV from 'constants/nav-constants';

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

		const pathName = get(window, 'location.pathname', null);
		if (pathName) {
			const pathParts = pathName.split('/').filter((str) => (str));
			if (pathParts.length) {
				currentPage = get(pathParts, '[0]');
			}
		}

		return currentPage;
	}

	handleClick = (e) => {
		this.setState({
			current: e.key,
		});
	}

	render() {
		return (
			<Menu
				onClick={this.handleClick}
				selectedKeys={[this.state.current]}
				mode="horizontal"
			>
				<Menu.Item key={NAV.pages.home.key}>
					<NavLink 
						label={NAV.pages.home.label}
						to={`/${NAV.pages.home.path}`}
					/>
				</Menu.Item>
				<Menu.Item key={NAV.pages.products.key}>
					<NavLink 
						label={NAV.pages.products.label}
						to={`/${NAV.pages.products.path}`}
					/>
				</Menu.Item>
				<Menu.Item key={NAV.pages.about.key}>
					<NavLink 
						label={NAV.pages.about.label}
						to={`/${NAV.pages.about.path}`}
					/>
				</Menu.Item>
				<Menu.Item key={NAV.pages.contact.key}>
					<NavLink 
						label={NAV.pages.contact.label}
						to={`/${NAV.pages.contact.path}`}
					/>
				</Menu.Item>
			</Menu>
		);
	}
};

export default NavBar;