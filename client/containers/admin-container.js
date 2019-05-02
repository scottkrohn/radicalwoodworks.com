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
};

export default connect(
	mapStateToProps,
	mapActionsToProps,
)(AdminContainer);
