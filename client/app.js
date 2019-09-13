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
  loadData: (store) => store.dispatch(verifyLogin()),
};

/**
 * High Level TODO:
 * 1. Push this code up to a new url on my box and see if it can even run as a server?
 * 2. Create new table component to replace material ui
 * 3. Create a modal component (only use for it for now is showing a larger version of the product image.)
 * 4. Make admin Edit Products page work.
 * 4. Make admin Edit Product page work.
 *
 * Image Carousel TODO:
 *
 * 1. Add options menu like on the old carousel.
 * 2. Support the 'showHidden' prop.
 * 4. Add gallary beneath the image.
 * 5. Make it clickable/scrollable with touch input.
 *
 * Mobile/General
 * 1. Make every page mobile friendly.
 * 2. Handle loading/completed/error states for all pages that need them.
 *
 * Remove
 * 1. Old Carousel
 * 2. Old Spinner
 */
