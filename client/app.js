import React from 'react';

// Components
// import Router from './router';
// import NavBar from './components/nav/navbar';
// import Footer from './components/footer/footer';

// Styles
import styles from './app.less'; // Global app css
import useStyles from 'isomorphic-style-loader/useStyles';

const App = () => {
  useStyles(styles);
  return (
    <div className="app-container">
      I'm the server rendered app.
      {/* <NavBar />
        <Router />
        <Footer /> */}
    </div>
  );
};

export default {
  component: App,
};
