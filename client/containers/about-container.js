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
					<div className="text-center">
						<h1>Radical Woodworks</h1>
						<h3>About Us Under Construction</h3>
						<p>
							<a href="https://www.etsy.com/shop/radicalwoodworks">Visit Our Etsy Shop</a>
						</p>
					</div>
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
