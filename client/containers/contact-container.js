import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import ContactForm from 'client/components/contact/contact-form';
import { Spin } from 'antd';

// Actions
import { sendContact } from 'client/actions/contact-actions';

class ContactContainer extends Component {

	constructor(props) {
		super(props);

		this.state = {
			sent: false,
			error: false,
		};
	}

	handleSendContact = (contact) => {
		this.props.sendContact(contact)
			.then((result) => {
				if (result.status === 200) {
					this.setState({
						sent: true,
						error: false,
					});
				}
			})
			.catch((err) => {
				this.setState({
					sent: false,
					error: true,
				});
			});
	}

	renderContactForm = () => {
		return (
			<ContactForm
				handleSendContact={this.handleSendContact}
				sending={this.props.contact.sending}
				sent={this.state.sent}
				error={this.state.error}
			/>
		);
	}

	render = () => {
		return (
			<Spin
				spinning={this.props.contact.sending}
				size="large"
			>
				<div className="container-fluid">
					<div className="col-xs-12">
						<div className="text-center">
							<h3>Contact Us Radical Woodworks</h3>
						</div>
					</div>

					{this.renderContactForm()}

				</div>
			</Spin>
		);
	};
}

const mapStateToProps = (state) => state;

const mapActionsToProps = {
	sendContact,
};

export default connect(
	mapStateToProps,
	mapActionsToProps,
)(ContactContainer);
