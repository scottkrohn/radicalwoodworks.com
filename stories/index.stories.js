import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import MyButton from '../@components/button/button';

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
));

storiesOf('My Button', module).add('Primary', () => {
  return (
    <MyButton variant="contained" color="primary">
      Testing Button
    </MyButton>
  );
});

storiesOf('My Button', module).add('Save', () => {
  return (
    <MyButton variant="contained" color="save">
      Testing Button
    </MyButton>
  );
});

storiesOf('My Button', module).add('Cancel', () => {
  return (
    <div style={{ display: 'flex', ['flex-direction']: 'column' }}>
      <div style={{ margin: 10 }}>
        <MyButton variant="contained" color="cancel">
          Testing Button
        </MyButton>
      </div>

      <div style={{ margin: 10 }}>
        <MyButton slim variant="contained" color="cancel">
          Testing Button
        </MyButton>
      </div>
    </div>
  );
});

storiesOf('My Button', module).add('Text Only', () => {
  return <MyButton textOnly>Testing Button</MyButton>;
});
