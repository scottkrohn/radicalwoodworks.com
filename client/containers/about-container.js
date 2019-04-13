import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import { getAllContent } from 'client/actions/content-actions';

class AboutContainer extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount = () => {
		this.props.getAllContent('ABOUT');
		console.log(this.props.content);
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

const mapActionsToProps = {
	getAllContent: getAllContent,
};

export default connect(
	mapStateToProps,
	mapActionsToProps,
)(AboutContainer);
