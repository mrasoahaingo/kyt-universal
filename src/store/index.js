import { createStore as _createStore } from 'redux';
import reducers from './reducers/index';

const createStore = (initialState) => {
  const store = _createStore(reducers, initialState);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default createStore;
