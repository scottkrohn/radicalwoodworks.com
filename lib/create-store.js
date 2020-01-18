import axios from 'axios';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from 'client/reducers/index.js';

export default (initialState = {}, req) => {
  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

  const axiosInstance = axios.create({
    baseURL: IS_CLIENT ? '' : 'http://localhost:3003',
    headers: req ? { cookie: req.get('cookie') || '' } : '',
  });

  const allStoreEnhancers = composeEnhancers(applyMiddleware(thunk.withExtraArgument(axiosInstance)));

  const store = createStore(reducers, initialState, allStoreEnhancers);
  return store;
};
