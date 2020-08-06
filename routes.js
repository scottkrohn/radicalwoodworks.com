import React from 'react';
import App from './client/app';

// Main Pages
import HomePage from '@pages/home-page';
import ProductsPage from '@pages/products-page';
import ContactPage from '@pages/contact-page';
import AboutPage from '@pages/about-page';
import FaqPage from '@pages/faq-page';
import LoginPage from '@pages/login-page';
import NotFoundPage from '@pages/not-found-page';
import ProductPage from '@pages/product-page';
import CartPage from '@pages/cart-page';

// Admin Pages
import AdminPage from '@pages/admin-page';
import AdminAboutUsPage from '@pages/admin-about-us-page';
import AdminFaqPage from '@pages/admin-faq-page';
import AdminProductsPage from '@pages/admin-products-page';
import AdminProductPage from '@pages/admin-product-page';

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
