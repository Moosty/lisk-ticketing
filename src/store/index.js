import * as reduxModule from 'redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import createReducer from './reducers';
// import persistState from 'redux-localstorage'

reduxModule.__DO_NOT_USE__ActionTypes.REPLACE = '@@redux/INIT';

const composeEnhancers =
  process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
  // , persistState() // comment out this line to disable use of local-storage
);

const store = createStore(createReducer(), enhancer);

store.asyncReducers = {};

export const injectReducer = (key, reducer) => {
  if (store.asyncReducers[key]) {
    return false;
  }
  store.asyncReducers[key] = reducer;
  store.replaceReducer(createReducer(store.asyncReducers));
  return store;
};

export default store;
