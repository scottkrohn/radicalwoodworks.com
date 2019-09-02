import React from 'react';

// Components
import { renderRoutes } from 'react-router-config';
import NavbarV2 from './components/nav/navbar-v2';
import Footer from './components/footer/footer';

// Styles
import styles from './styles/app.scss'; // Global app css
import fontAwesomeStyles from 'node_modules/@fortawesome/fontawesome-svg-core/styles.css';
import bootstrapStyles from 'node_modules/bootstrap/dist/css/bootstrap.min.css';
import useStyles from 'isomorphic-style-loader/useStyles';

const App = ({ location, route }) => {
  useStyles(styles, bootstrapStyles, fontAwesomeStyles);
  return (
    <div className="app-container">
      <NavbarV2 location={location} />
      {renderRoutes(route.routes)}
      <Footer />
    </div>
  );
};

export default {
  component: App,
};

/**
 * TODO:
 * 1. Build new image carousel to replace antd.
 * 2. Fix login page. It doesn't render at all.
 * 3. Add auth support back to the nav bar. Maybe put auth into a HOC (see server-rendering project)
 *  3. Show/Hide the login/logout/admin buttons based on logged in/out status.
 *  4. Add the verifyLogin check to the server. See the server-rendering repo from the video tutorial.
 * 6. Remove the old navbar file.
 * 11. Handle loading/completed/error states for all pages that need them.
 * 13. Make the new contact page mobile frieldny.
 * 16. Push this code up to a new url on my box and see if it can even run as a server?
 * 17. Make the enter button work for forms.
 *
 */
