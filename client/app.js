import React from 'react';

// Components
import {renderRoutes} from 'react-router-config';
import NavbarV2 from './components/nav/navbar-v2';
import Footer from './components/footer/footer';

// Styles
import styles from './app.less'; // Global app css
import bootstrapStyles from'node_modules/bootstrap/dist/css/bootstrap.min.css';
import useStyles from 'isomorphic-style-loader/useStyles';

const App = ({route}) => {
  useStyles(styles, bootstrapStyles);
  return (
    <div className="app-container">
      <NavbarV2 />
      {renderRoutes(route.routes)}
      <Footer />
    </div>
  );
};

export default {
  component: App,
};
