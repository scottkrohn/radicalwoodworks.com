import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

// Actions
import { getSampleInformation } from '../actions/sample-actions';

class HomepageContainer extends Component {
	componentDidMount = () => {
		this.props.getSampleInformation();
	};

	render = () => {
		const repos = get(this.props, 'sample.info', []);

		return (
			<div className="container">
					<div className="col-xs-12">
						<div className="text-center">
							<h1>Radical Woodworks</h1>
							<h3>Under Construction</h3>
							<p><a href="https://www.etsy.com/shop/radicalwoodworks">Visit Our Etsy Shop</a></p>
						</div>
					</div>
			</div>
		);
	};
}

const mapStateToProps = (state) => state;

const mapActionsToProps = {
	getSampleInformation,
};

export default connect(
	mapStateToProps,
	mapActionsToProps,
)(HomepageContainer);
