import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import Cookie from 'js-cookie';

// Actions
import { login } from 'client/actions/auth-actions';

// Component
import LoginForm from 'client/components/login-form/login-form';
import { Redirect } from 'react-router-dom';

class LoginContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			redirectToAdmin: false,
			error: false,
			errorCode: null,
		};
	}

	handleLogin = (username, password) => {
		this.props.login(username, password)
			.then((token) => {
				Cookie.set('utoken', token, {expires: 7});
				this.setState({
					redirectToAdmin: true,
				});

				return true;
			})
			.catch((error) => {
				Cookie.remove('utoken');
				this.setState({
					error: true,
					errorCode: error.code,
				});

				return false;
			});
	}

	render = () => {

		if (this.state.redirectToAdmin) {
			return (<Redirect to='/admin' />);
		}

		return (
			<div className="container-fluid">
				<div className="text-center">
					<h1>Radical Woodworks Login</h1>
				</div>

				<LoginForm
					handleLogin={this.handleLogin}
					error={this.state.error}
					errorCode={this.state.errorCode}
				/>

			</div>
		);
	};
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

const mapActionsToProps = {
	login,
};

export default connect(
	mapStateToProps,
	mapActionsToProps,
)(LoginContainer);
