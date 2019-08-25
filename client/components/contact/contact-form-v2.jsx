import React from 'react';

import Form from '../form/form';
import TextInput from '../form/text-input';
import SubmitButton from '../form/submit-button';

const ContactForm = (props) => {
  return (
    <Form
      fieldsInit={{
        name: 'Scott Krohn',
        age: 33,
      }}
    >
      {({ onChange, formFields, formValues }) => {
        const handleSubmit = (formValues) => () => {
          console.log('handleSubmit called');
          console.log('formValues: ', formValues);
        };

        return (
          <div className="row">
            <TextInput
              className="col-md-6"
              label="Name"
              onChange={onChange}
              {...formFields('name')}
            />
            <TextInput
              className="col-md-6"
              label="Age"
              onChange={onChange}
              {...formFields('age')}
            />
            <SubmitButton onClick={handleSubmit(formValues)}>Submit</SubmitButton>
          </div>
        );
      }}
    </Form>
  );
};

export default ContactForm;
