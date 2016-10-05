import React from 'react';
import Router from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory';
import { Provider } from 'react-redux';
import createStore from '../store';
import routes from '../routes';

const store = createStore(window.__INITIAL_STATE__);

// We need a Root component for React Hot Loading.
const Root = () => {
  return (
    <Provider store={store}>
      <Router history={browserHistory} routes={routes}/>
    </Provider>
  );
}

export default Root;
