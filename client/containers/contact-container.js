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
						<h3>Contact Us Radical Woodworks</h3>
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
