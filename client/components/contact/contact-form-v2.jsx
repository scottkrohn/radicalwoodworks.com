import React from 'react';

// Models
import Contact from 'model/contact';

// Validators
import RequiredValidator from '../../utils/validators/required-validator';
import MinLengthValidator from '../../utils/validators/min-length-validator';

// Components
import Form from '../form/form';
import TextInput from '../form/text-input';
import Button from '../button/button';

// Styles
import cx from 'classnames';
import styles from './contact-form-v2.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

const ContactForm = ({ handleSendContact }) => {
  useStyles(styles);

  const handleSubmit = (getFormValues) => () => {
    const { fields, isValid } = getFormValues(true);
    if (isValid) {
      const { message, name, email, subject } = fields;
      const formattedMessage = `FROM ${name} - ${email} <br><br> ${message}`;

      const contact = new Contact();
      contact.setTo('skrohn86@gmail.com');
      // contact.setTo('radicalwoodworks@yahoo.com');
      contact.setSubject(subject);
      contact.setFrom(email);
      contact.setHtml(formattedMessage);

      handleSendContact(contact);
    }
  };

  return (
    <div className="flex flex-dir-col align-items-center">
      <Form
        fields={{
          email: {
            value: '',
            validators: [RequiredValidator('Email address required')],
          },
          name: {
            value: '',
            validators: [RequiredValidator('Name required')],
          },
          subject: {
            value: '',
            validators: [RequiredValidator('subject required'), MinLengthValidator(10, 'Subject must be at least 10 characters.')],
          },
          message: {
            value: '',
            validators: [RequiredValidator('message required')],
          },
        }}
      >
        {({ onChange, fieldProps, getFormValues }) => {
          return (
            <div className={cx(styles.ContactForm, 'flex flex-dir-col')}>
              <div className="flex flex-dir-col">
                <TextInput
                  className="mt-3"
                  label="E-Mail Address"
                  onChange={onChange}
                  {...fieldProps('email')}
                />
                <TextInput
                  className="mt-3"
                  label="Name"
                  onChange={onChange}
                  {...fieldProps('name')}
                />
                <TextInput
                  className="mt-3"
                  label="Subject"
                  onChange={onChange}
                  {...fieldProps('subject')}
                />
                <TextInput
                  textArea
                  rows={6}
                  className="mt-3"
                  label="Message"
                  onChange={onChange}
                  {...fieldProps('message')}
                />
              </div>
              <Button
                className="mt-3"
                onClick={handleSubmit(getFormValues)}
              >
                Submit
              </Button>
            </div>
          );
        }}
      </Form>
    </div>
  );
};

export default ContactForm;
