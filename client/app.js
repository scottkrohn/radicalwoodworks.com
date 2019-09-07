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
  useStyles(styles, bootstrapStyles, fontAwesomeStyles);
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
 * 1. Build new image carousel to replace antd.
 * 2. Make admin page server render. Update to use the new buttons.
 * 3. Make the product page server render.
 * 4. Remove the nav-link.js file in favor of using the Link component from react-router-dom.
 * 11. Handle loading/completed/error states for all pages that need them.
 * 13. Make the new contact page mobile friendly.
 * 16. Push this code up to a new url on my box and see if it can even run as a server?
 * 18. Create new table component to replace material ui
 *
 * Image Carousel TODO:
 *
 * 1. Add options menu like on the old carousel.
 * 2. Support the 'showHidden' prop.
 * 4. Add gallary beneath the image.
 * 5. Make it clickable/scrollable with touch input.
 *
 * Product Page TODO:
 * TODO: How to get url params on server render data load for product page.
 */
