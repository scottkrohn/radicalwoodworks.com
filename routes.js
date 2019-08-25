import React from 'react';
import App from './client/app';

import HomePage from './client/containers/homepage-container';
import ProductsPage from './client/containers/products-container';
import ContactPage from './client/containers/contact-container';

export default [
  {
    ...App,
    routes: [
      {
        ...ProductsPage,
        path: '/products',
      },
      {
        ...ContactPage,
        path: '/contact',
      },
      {
        ...HomePage,
        path: '/',
        exact: true,
      },
    ],
  },
];
