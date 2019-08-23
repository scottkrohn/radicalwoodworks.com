import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Routes from '../routes';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import StyleContext from 'isomorphic-style-loader/StyleContext';

export default (req, store, context) => {
  const css = new Set();
  const insertCss = (...styles) => styles.forEach((style) => css.add(style._getCss()));

  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <StyleContext.Provider value={{ insertCss }}>
          <div>{renderRoutes(Routes)}</div>
        </StyleContext.Provider>
      </StaticRouter>
    </Provider>,
  );

  return `
    <html>
      <head>
        <style>${[...css].join('')}</style>
      </head>
      <body>
        <div id="root">${content}</div>
        <script>
          window.INITIAL_STATE = ${serialize(store.getState())}
        </script>
        <script src="bundle.js"></script>
      </body>
    </html>
  `;
};
