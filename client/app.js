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
 * TODO:
 * add limit/offset to orders query for admin page to limit amount of data loaded
 * admin orders page (add column sorting, filters and reload button)
 * admin order page (complete order, mark as shipped, cancel, etc)
 *
 *
 * // IDEAS
 * user account page (edit user info, view orders, etc)
 * paypal ec integration
 * create promos
 * add paypal transaction table & order table row with transaction id
 * add content for the confirmation page for messaging to buyer, and admin page to edit that content.
 *
 * // NEXT RELEASE
 * copy tables to prod
 * release carts branch onto new tld to test
 *
 * // FUTURE
 * Add sections/filters to products page
 * Search (set up elastic search)
 *
 * // BUGS
 * setting free shipping in admin edit product doesn't work
 *
 */
