import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookie from 'js-cookie';

// Actions
import { login } from 'client/actions/auth-actions';

// Selectors

// Component

class LoginContainer extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount = () => {
		this.props.login('skrohn86', 'Refinnej77!')
			.then((token) => {
				Cookie.set('utoken', token);
			})
			.catch((error) => {
				Cookie.remove('utoken');
			});
	};

	render = () => {

		return (
			<div>
				Login Page.
			</div>
		);
	};
}

const mapStateToProps = (state) => {
	return state;
};

const mapActionsToProps = {
	login,
};

export default connect(
	mapStateToProps,
	mapActionsToProps,
)(LoginContainer);
