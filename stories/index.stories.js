import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import MyButton from '../client/components/base/button/button';

const flexColumnStyles = {
  display: 'flex',
  ['flex-direction']: 'column',
};

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));

storiesOf('My Button', module).add('Primary', () => {
  return <MyButton variant="contained" color="primary">Testing Button</MyButton>;
});

storiesOf('My Button', module).add('Save', () => {
  return <MyButton variant="contained" color="save">Testing Button</MyButton>;
});

storiesOf('My Button', module).add('Cancel', () => {
  return (
    <div style={{display: 'flex', ['flex-direction']: 'column'}}>
      <div style={{margin: 10}}>
        <MyButton variant="contained" color="cancel">Testing Button</MyButton>
      </div>

      <div style={{margin: 10}}>
        <MyButton slim variant="contained" color="cancel">Testing Button</MyButton>
      </div>
    </div>
  );
});

storiesOf('My Button', module).add('Text Only', () => {
  return <MyButton textOnly>Testing Button</MyButton>;
});
