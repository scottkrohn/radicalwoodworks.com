import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'typeface-roboto';
import 'react-quill/dist/quill.snow.css';

// Redux Imports
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from 'reducers/root-reducer';

import thunk from 'redux-thunk';

import 'node_modules/jquery/dist/jquery.min.js';
import 'node_modules/bootstrap/dist/js/bootstrap.min.js';
import 'node_modules/bootstrap/dist/css/bootstrap.min.css';

import App from './app';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const allStoreEnhancers = composeEnhancers(applyMiddleware(thunk));

const allReducers = combineReducers(rootReducer);
const store = createStore(allReducers, {}, allStoreEnhancers);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
