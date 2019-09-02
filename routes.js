import React from 'react';
import App from './client/app';

import HomePage from './client/containers/homepage-container';
import ProductsPage from './client/containers/products-container';
import ContactPage from './client/containers/contact-container';
import AboutPage from './client/containers/about-container';
import FaqPage from './client/containers/faq-container';
import LoginPage from './client/containers/login-container';

export default [{
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
    {
      ...AboutPage,
      path: '/about',
    },
    {
      ...FaqPage,
      path: '/faq',
    },
    {
      ...LoginPage,
      path: '/login',
    },
  ],
}];
