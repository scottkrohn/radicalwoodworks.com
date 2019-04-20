import React, { Component } from "react";

// Styles
import "client/components/contact/contact-form.less";

// Components
import { Form, Input } from "antd";
import { Button } from "node_modules/antd/lib/index";

// Models
import Contact from 'model/contact';
import contactContainer from "client/containers/contact-container";

class ContactForm extends Component {
  constructor(props) {
		super(props);
  }

  handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.sendMessage(values);
			}
		})
	};

	sendMessage = (values) => {
		const message = `FROM ${values.name} - ${values.email} <br><br> ${values.message}`;

		const contact = new Contact();
		contact.setTo('radicalwoodworks@yahoo.com');
		contact.setSubject(values.subject);
		contact.setFrom(values.email);
		contact.setHtml(message);

		this.props.handleSendContact(contact);
	}

	renderContactForm = () => {
    const formItemLayout = {
      labelCol: {
        md: { span: 24 },
        lg: { span: 3 },
      },
      wrapperCol: {
        md: { span: 24 },
        lg: { span: 16 },
      },
      layout: "vertical",
      labelAlign: "left",
    };

    const submitLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 3 },
      },
    };

    const { getFieldDecorator } = this.props.form;

    return (
			<Form {...formItemLayout} onSubmit={this.handleSubmit}>
				<Form.Item label="E-Mail">
					{getFieldDecorator("email", {
						rules: [
							{
								type: "email",
								message: "The input is not valid E-mail!",
							},
							{
								required: true,
								message: "Please input your E-mail",
							},
						],
					})(<Input />)}
				</Form.Item>
				<Form.Item label="Name">
					{getFieldDecorator("name", {
						rules: [
							{
								required: true,
								message: "Please input your name.",
							},
						],
					})(<Input />)}
				</Form.Item>
				<Form.Item label="Subject">
					{getFieldDecorator("subject", {
						rules: [
							{
								required: true,
								message: "Please input a subject.",
							},
						],
					})(<Input />)}
				</Form.Item>
				<Form.Item label="Message">
					{getFieldDecorator("message", {
						rules: [
							{
								required: true,
								message: "Please input a message.",
							},
						],
					})(<Input.TextArea rows={5} />)}
				</Form.Item>
				<Form.Item {...submitLayout}>
					<Button type="primary" htmlType="submit" className="contact-submit-button">
						Submit
					</Button>
				</Form.Item>
			</Form>
    );
	}

	renderSuccess = () => {
		return (
			<div>
				<h3>Message sent!</h3>
			</div>
		);
	}

	renderError = () => {
		return (
			<div>
				<h3>An error occured, please try again later.</h3>
			</div>
		);
	}

	renderCurrentView = () => {
		let currentView = this.renderContactForm();

		if (this.props.error) {
			currentView = this.renderError();
		} else if (this.props.sent) {
			currentView = this.renderSuccess();
		}

		return currentView;
	}

  render = () => {
		return (
			<div className="contact-container">
				{this.renderCurrentView()}
			</div>
		);
  };
}

export default Form.create({ name: "contact_form" })(ContactForm);
