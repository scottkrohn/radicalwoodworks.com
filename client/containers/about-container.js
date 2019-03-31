
import React, { Component } from 'react';
import { connect } from 'react-redux';

class AboutContainer extends Component {

	constructor(props) {
		super(props);
	}

	render = () => {
		return (
			<div className="container">
				<div className="col-xs-12">
					I'm the about us page.
				</div>
			</div>
		);
	};
}

const mapStateToProps = (state) => state;

const mapActionsToProps = {};

export default connect(
	mapStateToProps,
	mapActionsToProps,
)(AboutContainer);
