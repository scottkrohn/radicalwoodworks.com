import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from 'client/reducers/index.js';

export default (initialState = {}) => {
  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

  const allStoreEnhancers = composeEnhancers(applyMiddleware(thunk));
  const store = createStore(reducers, initialState, allStoreEnhancers);
  return store;
};
