import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Route from '../components/Route';
import ScrollToTop from '../components/ScrollToTop';

import { routes } from '../constants/routes';

const Routes: React.FC = () => (
  <>
    <ScrollToTop />
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          isPrivate={route.isPrivate}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  </>
);

export default Routes;
