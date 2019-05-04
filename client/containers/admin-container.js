import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import { verifyLogin } from 'client/actions/admin-actions';

// HOC
import { withValidation } from 'client/hoc/auth';
class AdminContainer extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount = () => {
		this.props.verifyLogin()
			.catch((error) => {
				this.props.redirectToHome();
			});
	};

	render = () => {
		return (
			<div className="container-fluid">
				<div className="text-center">
					<h1>Radical Woodworks Admin Panel</h1>
				</div>
			</div>
		);
	};
}

const mapStateToProps = (state) => {
	return state;
};

const mapActionsToProps = {
	verifyLogin,
};

export default connect(
	mapStateToProps,
	mapActionsToProps,
)(withValidation(AdminContainer));
