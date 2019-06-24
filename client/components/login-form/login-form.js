import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

// Components
import { Form, Input, Button, notification } from 'antd';

// Constants
import EXCEPTIONS from 'constants/exceptions';

// Styles
import styles from 'client/components/login-form/login-form.less';

const LoginForm = (props) => {
  useEffect(() => {
    const loginError = get(props, 'error');
    if (loginError) {
      renderLoginError();
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        props.handleLogin(values.username, values.password);
      }
    });
  };

  const renderLoginError = () => {
    const errorMessage = EXCEPTIONS.getMessageForErrorCode(props.errorCode);

    notification.error({
      message: 'Login Error',
      description: errorMessage,
    });
  };

  const { getFieldDecorator } = props.form;

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
    return <span className={styles.FormLabel}>{props.label}</span>;
  };

  const submitLayout = {
    wrapperCol: {
      md: { span: 24, offset: 0 },
      lg: { span: 16, offset: 3 },
    },
  };

  return (
    <div className={styles.LoginFormContainer}>
      <Form {...formItemLayout} onSubmit={handleSubmit}>
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
          })(<Input size="large" type="password" />)}
        </Form.Item>
        <Form.Item {...submitLayout}>
          <Button
            id="submit-login-form" type="primary"
            htmlType="submit" className={styles.LoginSubmitButton}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

LoginForm.propTypes = {
  form: PropTypes.object,
  handleLogin: PropTypes.func,
};

export default Form.create({ name: 'login_form' })(LoginForm);
