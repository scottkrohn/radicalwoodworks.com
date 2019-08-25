import React from 'react';

import { storiesOf } from '@storybook/react';

import Form from './form';
import TextInput from './text-input';
import SubmitButton from './submit-button';

storiesOf('Form', module)
  .add('Form', () => {
    return (
      <Form
        fieldsInit={{
          name: 'Scott Krohn',
          age: 33,
        }}
      >
        {({onChange, formFields, formValues}) => {

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
  })
  .add('TextInput - Input', () => {
    return <TextInput label="Text Input" />;
  })
  .add('TextInput - TextArea', () => {
    return (<TextInput
      textArea
      label="Text Area"
    />);
  });
