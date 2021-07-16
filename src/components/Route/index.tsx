import React from 'react';
import { Route as ReactDOMRoute, Redirect } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { RouteTypes } from '../../types/routes';

const Route: React.FC<RouteTypes> = ({
  path,
  exact = false,
  isPrivate = false,
  component,
}) => {
  const { isAuthenticated } = useAuth();
  // const isAuthenticated = true;

  return isPrivate === isAuthenticated ? (
    <ReactDOMRoute path={path} exact={exact} component={component} />
  ) : (
    <ReactDOMRoute
      path={path}
      exact={exact}
      render={({ location }) => (
        <Redirect
          to={{
            pathname: isPrivate ? '/' : '/dashboard',
            state: { from: location },
          }}
        />
      )}
    />
  );
};

export default Route;
