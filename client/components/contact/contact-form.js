import React, { Component } from "react";

// Styles
import "client/components/contact/contact-form.less";

// Components
import { Form, Input } from "antd";
import { Button } from "node_modules/antd/lib/index";

class ContactForm extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit clicked");
  };

  render = () => {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
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

		console.log(getFieldDecorator);
		
    return (
      <div className="contact-container">
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
                  message: "Please input your E-mail!",
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Name">
            <Input />
          </Form.Item>
          <Form.Item label="Subject">
            <Input />
          </Form.Item>
          <Form.Item label="Message">
            <Input.TextArea rows={5} />
          </Form.Item>
          <Form.Item {...submitLayout}>
            <Button type="primary" htmlType="submit" className="contact-submit-button">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  };
}

export default Form.create({ name: "contact_form" })(ContactForm);
