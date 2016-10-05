import React from 'react';
import { Router, browserHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { trigger } from 'redial';

import createStore from '../store';
import routes from '../routes';

const store = createStore(browserHistory, window.__INITIAL_STATE__);
const history = syncHistoryWithStore(browserHistory, store);

history.listen(location => {
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (renderProps) {
      const { components } = renderProps;
      const { dispatch } = store;
      const locals = {
        path: renderProps.location.pathname,
        query: renderProps.location.query,
        params: renderProps.params,
        dispatch
      };

      if (window.__INITIAL_STATE__) {
        delete window.__INITIAL_STATE__;
      } else {
        trigger('fetch', components, locals);
      }

      trigger('defer', components, locals);
    }
  });
});

// We need a Root component for React Hot Loading.
class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history} routes={routes}/>
      </Provider>
    );
  }
}

export default Root;
