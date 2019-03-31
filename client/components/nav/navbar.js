import React, { Component } from 'react';

// Components
import { Menu } from 'antd';
import NavLink from 'client/components/nav/nav-link';

// Constants
import NAV from 'client/constants/nav-constants';

class NavBar extends Component {

	constructor(props) {
		console.log(NAV);
		super(props);

		this.state = {
			current: 'home',
		};
	}

	handleClick = (e) => {
		console.log('click ', e);
		this.setState({
			current: e.key,
		});
	}

	render() {
		console.log('render');
		return (
			<Menu
				onClick={this.handleClick}
				selectedKeys={[this.state.current]}
				mode="horizontal"
			>
				<Menu.Item key="home">
					<NavLink 
						label="Home"
						to="/"
					/>
				</Menu.Item>
				<Menu.Item key="products">
					<NavLink 
						label="About"
						to="/about"
					/>
				</Menu.Item>
				<Menu.Item key="about">
					<NavLink 
						label="About"
						to="/about"
					/>
				</Menu.Item>
				<Menu.Item key="contact">
					<NavLink 
						label="Contact"
						to="/contact"
					/>
				</Menu.Item>
			</Menu>
		);
	}
};

export default NavBar;