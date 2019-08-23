import React from 'react';
import App from './client/app';
import HomePage from './client/containers/homepage-container';

export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        path: '/',
        exact: true,
      },
    ],
  },
];
