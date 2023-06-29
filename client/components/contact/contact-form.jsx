import React, { useEffect, useState } from 'react';

// Models
import Contact from 'model/contact';

// Validators
import RequiredValidator from '../../utils/validators/required-validator';
import MinLengthValidator from '../../utils/validators/min-length-validator';

// Components
import Form from '../form/form';
import TextInput from '../form/text-input';
import Button from '../button/button';
import Notification from '../notification/notification';
import Spinner from '../spinner/spinner';
import { Link } from 'react-router-dom';

// Styles
import cx from 'classnames';
import styles from './contact-form.scss';


const ContactForm = ({ handleSendContact, error, sending, sent }) => {
  
  const [notificationContent, setNotificationContent] = useState({});

  const handleSubmit = (getFormValues) => (event) => {
    event.preventDefault();
    const { fields, isValid } = getFormValues(true);
    if (isValid) {
      const { message, name, email, subject } = fields;
      const formattedMessage = `FROM ${name} - ${email} <br><br> ${message}`;

      const contact = new Contact();
      contact.setTo('radicalwoodworks@yahoo.com');
      contact.setSubject(subject);
      contact.setFrom(email);
      contact.setHtml(formattedMessage);

      handleSendContact(contact);
    }
  };

  useEffect(() => {
    if (error || sent) {
      if (error) {
        setNotificationContent({
          header: 'Error',
          message: 'An error occured when sending, please try again.',
          showing: true,
        });
      } else if (sent) {
        setNotificationContent({
          header: 'Message Sent',
          message: 'Message successfully sent!',
          showing: true,
        });
      }
    }
  }, [error, sent]);

  return (
    <div className="flex flex-dir-col align-items-center">
      <Spinner className="flex justify-content-center" spinning={sending}>
        {sent ? (
          <div className="flex flex-dir-col align-items-center">
            <p>Your message has been sent.</p>
            <Link to="/">Back To Home</Link>
          </div>
        ) : (
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
                validators: [
                  RequiredValidator('subject required'),
                  MinLengthValidator(
                    10,
                    'Subject must be at least 10 characters.'
                  ),
                ],
              },
              message: {
                value: '',
                validators: [RequiredValidator('message required')],
              },
            }}
          >
            {({ onChange, fieldProps, getFormValues, handleEnterKey }) => {
              return (
                <div
                  className={cx(styles.ContactForm, 'flex flex-dir-col')}
                  onKeyDown={handleEnterKey(handleSubmit)}
                >
                  <TextInput
                    className="mt-3"
                    label="E-Mail Address"
                    onChange={onChange}
                    {...fieldProps('email')}
                    tabIndex="0"
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
                  <Button
                    className={styles.SubmitButton}
                    primary
                    onClick={handleSubmit(getFormValues)}
                  >
                    Submit
                  </Button>
                </div>
              );
            }}
          </Form>
        )}
      </Spinner>

      <Notification
        content={notificationContent}
        hide={() => setNotificationContent({ showing: false })}
      />
    </div>
  );
};

export default ContactForm;
