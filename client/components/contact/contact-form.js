import React, { Component } from 'react';

// Styles
import 'client/components/contact/contact-form.less';

// Components
import { Form, Input, Button } from 'antd';

// Models
import Contact from 'model/contact';

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
	    });
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
	        layout: 'vertical',
	        labelAlign: 'left',
	    };

	    const submitLayout = {
	        wrapperCol: {
	            md: { span: 24, offset: 0 },
	            lg: { span: 16, offset: 3 },
	        },
	    };

	    const { getFieldDecorator } = this.props.form;
	    const Label = (props) => {
	        return (
	            <span className="form-label">{props.label}</span>
	        );
	    };

	    return (
	        <div className="contact-form-container">
	            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
	                <Form.Item label={<Label label="E-Mail" />}>
	                    {getFieldDecorator('email', {
	                        rules: [
	                            {
	                                type: 'email',
	                                message: 'The input is not valid E-mail!',
	                            },
	                            {
	                                required: true,
	                                message: 'Please input your E-mail',
	                            },
	                        ],
	                    })(<Input size="large" />)}
	                </Form.Item>
	                <Form.Item label={<Label label="Name" />}>
	                    {getFieldDecorator('name', {
	                        rules: [
	                            {
	                                required: true,
	                                message: 'Please input your name.',
	                            },
	                        ],
	                    })(<Input size="large" />)}
	                </Form.Item>
	                <Form.Item label={<Label label="Subject" />}>
	                    {getFieldDecorator('subject', {
	                        rules: [
	                            {
	                                required: true,
	                                message: 'Please input a subject.',
	                            },
	                        ],
	                    })(<Input size="large" />)}
	                </Form.Item>
	                <Form.Item label={<Label label="Message" />}>
	                    {getFieldDecorator('message', {
	                        rules: [
	                            {
	                                required: true,
	                                message: 'Please input a message.',
	                            },
	                        ],
	                    })(<Input.TextArea rows={8} />)}
	                </Form.Item>
	                <Form.Item {...submitLayout}>
	                    <Button id="submit-contact-form" type="primary" htmlType="submit" className="contact-submit-button">
							Submit
	                    </Button>
	                </Form.Item>
	            </Form>
	        </div>
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

export default Form.create({ name: 'contact_form' })(ContactForm);
