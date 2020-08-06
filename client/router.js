import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import Cookie from 'js-cookie';
import PropTypes from 'prop-types';

// Containers
import HomepageContainer from '@reducers/containers/home-page';
import ProductsContainer from '@reducers/containers/products-page';
import AboutContainer from 'client/containers/about-page';
import ContactContainer from '@reducers/containers/contact-page';
import ProductContainer from '@reducers/containers/product-page';
import FaqContainer from '@reducers/containers/faq-page';
import LoginContainer from '@reducers/containers/login-page';

// Protected Containers
import AdminContainer from '@reducers/containers/admin-page';
import AdminAboutUsContainer from '@reducers/containers/admin-about-us-page';
import AdminFaqContainer from '@reducers/containers/admin-faq-page';
import AdminProductsContainer from '@reducers/containers/admin-products-page';
import AdminProductContainer from '@reducers/containers/admin-product-page';

// 404 Container
import NotFoundContainer from '@reducers/containers/not-found-page';

const Router = () => (
  <Switch>
    <Route exact path="/" component={HomepageContainer} />
    <Route exact path="/about" component={AboutContainer} />
    <Route exact path="/contact" component={ContactContainer} />
    <Route exact path="/faq" component={FaqContainer} />
    <Route exact path="/login" component={LoginContainer} />
    <Route exact path="/products" component={ProductsContainer} />
    <Route
      exact
      path="/products/product/:productId"
      component={ProductContainer}
    />

    {/* Protected Routes */}
    <ProtectedRoute exact path="/admin" component={AdminContainer} />
    <ProtectedRoute
      exact
      path="/admin-about"
      component={AdminAboutUsContainer}
    />
    <ProtectedRoute exact path="/admin-faq" component={AdminFaqContainer} />
    <ProtectedRoute
      exact
      path="/admin-products"
      component={AdminProductsContainer}
    />
    <ProtectedRoute
      path="/admin-product/:productId?"
      component={AdminProductContainer}
    />

    {/* 404 Route */}
    <Route component={NotFoundContainer} />
  </Switch>
);

const ProtectedRoute = ({ component: Component, ...args }) => {
  return (
    <Route
      {...args}
      render={(props) => {
        const isLoggedIn = !!Cookie.get('utoken');
        return isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.func,
};

export default Router;
