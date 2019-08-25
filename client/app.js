import React from 'react';

// Components
import {renderRoutes} from 'react-router-config';
import NavbarV2 from './components/nav/navbar-v2';
import Footer from './components/footer/footer';

// Styles
import styles from './app.less'; // Global app css
import bootstrapStyles from'node_modules/bootstrap/dist/css/bootstrap.min.css';
import useStyles from 'isomorphic-style-loader/useStyles';

const App = ({location, route}) => {
  useStyles(styles, bootstrapStyles);
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
 * 2. Build new icon class class to replace antd.
 * 3. Add auth support back to the nav bar. Maybe put auth into a HOC (see server-rendering project)
 * 4. Build a drawer component to replace antd.
 * 5. Build a spinner component to replace antd.
 * 6. Remove the old navbar file.
 * 7. Build new text input component.
 * 8. Build new Button component.
 * 9. Build new form component.
 * 10. Build notification component to replace antd.
 * 
 */
