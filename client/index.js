import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import createStore from '../lib/create-store';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import { renderRoutes } from 'react-router-config';
import Routes from '../routes';
import 'typeface-roboto';
import 'babel-polyfill';
import 'node_modules/@fortawesome/fontawesome-svg-core/styles.css';
import 'node_modules/bootstrap/dist/css/bootstrap.min.css';

// Redux Imports
import { Provider } from 'react-redux';

import 'node_modules/jquery/dist/jquery.min.js';
import 'node_modules/bootstrap/dist/js/bootstrap.min.js';

const store = createStore(window.INITIAL_STATE);

const insertCss = (...styles) => {
  const removeCss = styles.map((style) => style._insertCss());
  return () => removeCss.forEach((dispose) => dispose());
};

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <StyleContext.Provider value={{ insertCss }}>
        <div>{renderRoutes(Routes)}</div>
      </StyleContext.Provider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
