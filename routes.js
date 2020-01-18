import React from 'react';
import App from './client/app';

// Main Pages
import HomePage from './client/containers/homepage-container';
import ProductsPage from './client/containers/products-container';
import ContactPage from './client/containers/contact-container';
import AboutPage from './client/containers/about-container';
import FaqPage from './client/containers/faq-container';
import LoginPage from './client/containers/login-container';
import NotFoundPage from './client/containers/not-found-container';
import ProductPage from './client/containers/product-container';

// Admin Pages
import AdminPage from './client/containers/admin-container';
import AdminAboutUsPage from './client/containers/admin-about-us-container';
import AdminFaqPage from './client/containers/admin-faq-container';
import AdminProductsPage from './client/containers/admin-products-container';
import AdminProductPage from './client/containers/admin-product-container';

export default [{
  ...App,
  routes: [
    {
      ...ProductPage,
      path: '/products/product/:productId',
    },
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
    {
      ...AdminPage,
      path: '/admin',
    },
    {
      ...AdminAboutUsPage,
      path: '/admin-about',
    },
    {
      ...AdminFaqPage,
      path: '/admin-faq',
    },
    {
      ...AdminProductsPage,
      path: '/admin-products',
    },
    {
      ...AdminProductPage,
      path: '/admin-product/:productId?',
    },
    { ...NotFoundPage },
  ],
}];
