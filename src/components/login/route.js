import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component, exact = false, path, authenticated }) => (
  <Route
    exact={exact}
    path={path}
    render={props =>
      authenticated() ? (
        React.createElement(component, props)
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )}
  />
);

export default PrivateRoute;
