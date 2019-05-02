import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import { Form, Input, Button } from 'antd';

class LoginForm extends Component {
	constructor(props) {
		super(props);
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.handleLogin(values.username, values.password);
			}
		});
	}

	render = () => {
		const { getFieldDecorator } = this.props.form;

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

		const Label = (props) => {
			return (
				<span className="form-label">{props.label}</span>
			);
		};

		const submitLayout = {
			wrapperCol: {
				xs: { span: 24, offset: 0 },
				sm: { span: 16, offset: 3 },
			},
		};

		return (
			<Form {...formItemLayout} onSubmit={this.handleSubmit}>
				<Form.Item label={<Label label="Username" />}>
					{getFieldDecorator('username', {
						rules: [
							{
								required: true,
								message: 'Username is required',
							},
						],
					})(<Input size="large" />)}
				</Form.Item>
				<Form.Item label={<Label label="Password" />}>
					{getFieldDecorator('password', {
						rules: [
							{
								required: true,
								message: 'Password is required',
							},
						],
					})(<Input size="large" type="password"/>)}
				</Form.Item>
				<Form.Item {...submitLayout}>
					<Button type="primary" htmlType="submit" className="contact-submit-button">
						Submit
					</Button>
				</Form.Item>
			</Form>
		);
	};
}

LoginForm.propTypes = {
	form: PropTypes.object,
	handleLogin: PropTypes.func,

};

export default Form.create({name: 'login_form'})(LoginForm);
