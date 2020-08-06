import React from 'react';
import App from './client/app';

// Main Pages
import HomePage from './client/containers/home-page';
import ProductsPage from './client/containers/products-page';
import ContactPage from './client/containers/contact-page';
import AboutPage from './client/containers/about-page';
import FaqPage from './client/containers/faq-page';
import LoginPage from './client/containers/login-page';
import NotFoundPage from './client/containers/not-found-page';
import ProductPage from './client/containers/product-page';
import CartPage from './client/containers/cart-page';

// Admin Pages
import AdminPage from './client/containers/admin-page';
import AdminAboutUsPage from './client/containers/admin-about-us-page';
import AdminFaqPage from './client/containers/admin-faq-page';
import AdminProductsPage from './client/containers/admin-products-page';
import AdminProductPage from './client/containers/admin-product-page';

export default [
  {
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
      {
        ...CartPage,
        path: '/cart',
      },
      { ...NotFoundPage },
    ],
  },
];
