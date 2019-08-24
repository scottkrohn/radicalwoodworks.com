import React from 'react';
import App from './client/app';

import HomePage from './client/containers/homepage-container';
import ProductsPage from './client/containers/products-container';

export default [
  {
    ...App,
    routes: [
      {
        ...ProductsPage,
        path: '/products',
      },
      {
        ...HomePage,
        path: '/',
        exact: true,
      },
    ],
  },
];
