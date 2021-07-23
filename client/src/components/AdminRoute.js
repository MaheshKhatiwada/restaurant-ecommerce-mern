import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "../common/auth";

const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <div>
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated() && isAuthenticated().role === 1 ? (
            <Component {...props} />
          ) : (
            <Redirect to="/signin" />
          )
        }
      />
    </div>
  );
};

export default AdminRoute;
