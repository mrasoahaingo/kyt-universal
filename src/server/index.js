import express from 'express';
import compression from 'compression';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import RouterContext from 'react-router/lib/RouterContext';
import createMemoryHistory from 'react-router/lib/createMemoryHistory';
import match from 'react-router/lib/match';
import template from './template';
import { Provider } from 'react-redux';
import createStore from '../store';
import routes from '../routes';

const clientAssets = require(KYT.ASSETS_MANIFEST); // eslint-disable-line import/no-dynamic-require
const app = express();

const store = createStore({
  counter: 1
});

// Remove annoying Express header addition.
app.disable('x-powered-by');

// Compress (gzip) assets in production.
app.use(compression());

// Setup the public directory so that we can server static assets.
app.use(express.static(path.join(process.cwd(), KYT.PUBLIC_DIR)));

// Setup server side routing.
app.get('*', (request, response) => {
  const history = createMemoryHistory(request.originalUrl);

  match({ routes, history }, (error, redirectLocation, renderProps) => {
    if (error) {
      response.status(500).send(error.message);
    } else if (redirectLocation) {
      response.redirect(302, `${redirectLocation.pathname}${redirectLocation.search}`);
    } else if (renderProps) {
      // When a React Router route is matched then we render
      // the components and assets into the template.
      response.status(200).send(template({
        root: renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        ),
        initialState: store.getState(),
        jsBundle: clientAssets.main.js,
        cssBundle: clientAssets.main.css,
      }));
    } else {
      response.status(404).send('Not found');
    }
  });
});

app.listen(parseInt(KYT.SERVER_PORT, 10));
