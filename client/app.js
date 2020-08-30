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
    // TODO: eventually get cart by customer ID if the user is logged in?
    const cartPromise = store.dispatch(getCartById(null));
    return [cartPromise, loginPromise];
  },
};

/**
 *
 *
 * on refresh set the user in the redux session (pull form utoken in app.js login promise above if logged in)
 * on refresh make sure the app knows the user is logged in (auth.loggedIn needs to be set)
 * make sure e-mail addresses are unique on sign up
 *
 * Create promos
 * Fix styling on contact and login form
 * better handle cart failures due to incorrect sid. Clear the users cookies and cart and send back to homepage?
 *
 * FUTURE
 * Add sections/filters to products page
 * Search?
 *
 * BUGS
 * setting free shipping in admin edit product doesn't work
 *
 */
