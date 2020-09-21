import React from 'react';

// Components
import { renderRoutes } from 'react-router-config';
import Navbar from './components/nav/navbar';
import Footer from './components/footer/footer';

// Styles
import styles from './styles/app.scss'; // Global app css
import fontAwesomeStyles from 'node_modules/@fortawesome/fontawesome-svg-core/styles.css';
import bootstrapStyles from 'node_modules/bootstrap/dist/css/bootstrap.min.css';
import useStyles from 'isomorphic-style-loader/useStyles';

// Actions
import { verifyLogin } from 'client/actions/auth-actions';
import { getCartById } from 'client/actions/cart-actions';

const App = ({ location, route }) => {
  useStyles(bootstrapStyles, fontAwesomeStyles, styles);
  return (
    <div className="app-container">
      <Navbar location={location} />
      {renderRoutes(route.routes)}
      <Footer />
    </div>
  );
};

export default {
  component: App,
  loadData: (store) => {
    const loginPromise = store.dispatch(verifyLogin());
    const cartPromise = store.dispatch(getCartById(null));
    return [cartPromise, loginPromise];
  },
};

/**
 * user account page (edit user info, view orders, etc)
 * admin orders page
 * admin order page
 * paypal ec integration
 * create promos
 *
 * copy tables to prod
 * release carts branch onto new tld to test
 *
 * FUTURE
 * Add sections/filters to products page
 * Search?
 *
 * BUGS
 * setting free shipping in admin edit product doesn't work
 *
 */
