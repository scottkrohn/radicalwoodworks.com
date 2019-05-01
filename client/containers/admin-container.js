import React, { Component } from 'react';
import { connect } from 'react-redux';

class AdminContainer extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount = () => {
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
};

export default connect(
	mapStateToProps,
	mapActionsToProps,
)(AdminContainer);
