import React, { useState } from 'react';
import { connect } from 'react-redux';

// Components
import ContactForm from 'client/components/contact/contact-form-v2';

// Actions
import { sendContact } from 'client/actions/contact-actions';

const ContactContainer = ({ contact, sendContact }) => {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const handleSendContact = (contact) => {
    sendContact(contact)
      .then((result) => {
        if (result.status === 200) {
          setSent(true);
          setError(false);
        }
      })
      .catch((err) => {
        setSent(false);
        setError(true);
      });
  };

  return (
    <div className="container-fluid">
      <div className="col-xs-12">
        <div className="text-center">
          <h3>Contact Us Radical Woodworks</h3>
        </div>
      </div>

      <ContactForm
        handleSendContact={handleSendContact}
        sending={contact.sending}
        sent={sent}
        error={error}
      />
    </div>
  );
};

const mapStateToProps = (state) => state;

const mapActionsToProps = {
  sendContact,
};

export default {
  component: connect(
    mapStateToProps,
    mapActionsToProps
  )(ContactContainer),
};
