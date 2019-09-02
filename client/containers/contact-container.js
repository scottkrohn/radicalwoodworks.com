import React, { useState } from 'react';
import { connect } from 'react-redux';

// Components
import ContactForm from 'client/components/contact/contact-form';
import PageHeader from 'client/components/page-header/page-header';

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
        <PageHeader
          headerText="Contact Us"
          showButton={false}
        />
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
