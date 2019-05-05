import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

// Components
import { Form, Input, Button, notification} from 'antd';

// Constants
import EXCEPTIONS from 'constants/exceptions';

// Styles
import 'client/components/login-form/login-form.less';

class LoginForm extends Component {
	constructor(props) {
		super(props);
	}

	componentDidUpdate = (prevProps, prevState) => {
		const loginError = get(this.props, 'error');
		if (loginError) {
			this.renderLoginError();
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.handleLogin(values.username, values.password);
			}
		});
	}

	renderLoginError = () => {
		const errorMessage = EXCEPTIONS.getMessageForErrorCode(this.props.errorCode);

		notification.error({
			message: 'Login Error',
			description: errorMessage,
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
				md: { span: 24, offset: 0 },
				lg: { span: 16, offset: 3 },
			},
		};

		return (
			<div className="login-form-container">
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
						<Button id="submit-login-form" type="primary" htmlType="submit" className="contact-submit-button">
							Submit
						</Button>
					</Form.Item>
				</Form>
			</div>
		);
	};
}

LoginForm.propTypes = {
	form: PropTypes.object,
	handleLogin: PropTypes.func,

};

export default Form.create({name: 'login_form'})(LoginForm);
