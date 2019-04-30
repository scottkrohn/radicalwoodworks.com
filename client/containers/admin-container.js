
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import { login } from 'client/actions/auth-actions';

// Selectors

// Component

class ProductContainer extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount = () => {
		this.props.login('skrohn86', 'Refinnej77!');
	};

	render = () => {

		return (
			<div>
				Admin Page.
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
)(ProductContainer);
