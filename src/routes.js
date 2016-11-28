import React from 'react';
import App from './containers/App';
import { Route, IndexRoute } from 'react-router';
import Home from './containers/Home';
/* eslint arrow-body-style: 0 */
/* eslint react/jsx-no-bind: 0 */
export function prefetchRoutes() {
  require.ensure([
    './containers/HomeSlickRemix',
    './containers/HomeCube'], () => {});
}

export default (
  <Route path = "/" component = {App}>
    <IndexRoute component = {Home} />
    <Route path = "slickshot" getComponent={(location, cb) =>
      require.ensure(['./containers/HomeSlickRemix'], (require) => {
        cb(null, require('./containers/HomeSlickRemix').default);
      })
    }
    />
    <Route path = "cube" getComponent={(location, cb) =>
      require.ensure(['./containers/HomeCube'], (require) => {
        cb(null, require('./containers/HomeCube').default);
      })
    }
    />
  </Route>
);
