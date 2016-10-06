import 'isomorphic-fetch';

import express from 'express';
import compression from 'compression';
import path from 'path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { RouterContext, match, createMemoryHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { trigger } from 'redial';

import template from './template';
import createStore from '../store';
import routes from '../routes';

const clientAssets = require(KYT.ASSETS_MANIFEST); // eslint-disable-line import/no-dynamic-require
const app = express();

// Remove annoying Express header addition.
app.disable('x-powered-by');

// Compress (gzip) assets in production.
app.use(compression());

// Setup the public directory so that we can server static assets.
app.use(express.static(path.join(process.cwd(), KYT.PUBLIC_DIR)));

// Setup server side routing.
app.get('*', (request, response) => {

  const memoryHistory = createMemoryHistory(request.originalUrl);
  const store = createStore(memoryHistory, { counter: 1, users: [], userDetail: null });

  match({ routes, location: request.path }, (error, redirectLocation, renderProps) => {
    if (error) {
      response.status(500).send(error.message);
    } else if (redirectLocation) {
      response.redirect(302, `${redirectLocation.pathname}${redirectLocation.search}`);
    } else if (renderProps) {

      const { dispatch, getState } = store;
      const { components } = renderProps;

      const locals = {
        path: renderProps.location.pathname,
        query: renderProps.location.query,
        params: renderProps.params,
        dispatch
      };

      trigger('fetch', components, locals)
        .then(() => {

          const html = template({
            root: renderToStaticMarkup(
              <Provider store={store}>
                <RouterContext {...renderProps} />
              </Provider>
            ),
            initialState: getState(),
            jsBundle: clientAssets.main.js,
            cssBundle: clientAssets.main.css,
          });

          response.status(200).send(`<!doctype html>${html}`);

        }, () => {
          response.status(503).send('Fail on fetching data');
        })
        .catch(() => {
          response.status(500).send('Fail on fetching data');
        });

    } else {
      response.status(404).send('Not found');
    }
  });
});

app.listen(parseInt(KYT.SERVER_PORT, 10));
