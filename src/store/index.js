import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';

const createStore = (history, initialState) => {

  const store = _createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(thunk, routerMiddleware(history))
    )
  );

  if (module.hot) {
    module.hot.accept('./reducers/index', () => {
      const nextRootReducer = require('./reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default createStore;
