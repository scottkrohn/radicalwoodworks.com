import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import ContactForm from 'client/components/contact/contact-form';

class ContactContainer extends Component {

	constructor(props) {
		super(props);
	}

	render = () => {
		return (
			<div className="container">
				<div className="col-xs-12">
					<div className="text-center">
						<h1>Radical Woodworks</h1>
						<h3>Contact Us Under Construction</h3>
						<p>
							<a href="https://www.etsy.com/shop/radicalwoodworks">Visit Our Etsy Shop</a>
						</p>
					</div>
				</div>
				<ContactForm />
			</div>
		);
	};
}

const mapStateToProps = (state) => state;

const mapActionsToProps = {};

export default connect(
	mapStateToProps,
	mapActionsToProps,
)(ContactContainer);
