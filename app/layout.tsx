'use client';
// TODO: REMOVE USE CLIENT
import React from 'react';
import Navbar from "@components/nav/navbar";
import Footer from "@components/footer/footer";
import {Provider} from "react-redux";
import createStore from "@lib/create-store";

import 'node_modules/@fortawesome/fontawesome-svg-core/styles.css';
import 'node_modules/bootstrap/dist/css/bootstrap.min.css';
import styles from '../client/styles/app.module.scss';

const Layout = ({children}) => {
  const store = createStore();

  return (
    <Provider store={store}>
      <html>
      <head>
        <title>My App</title>
      </head>
      <body className={styles.app}>
        <Navbar/>
        {children}
        <Footer/>
      </body>
      </html>
    </Provider>
  );
}

export default Layout;