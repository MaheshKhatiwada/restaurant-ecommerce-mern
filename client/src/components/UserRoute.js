import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "../common/auth";

const UserRoute = ({ component: Component, ...rest }) => {
  return (
    <div>
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated() && isAuthenticated().role === 0 ? (
            <Component {...props} />
          ) : (
            <Redirect to="/signin" />
          )
        }
      />
    </div>
  );
};

export default UserRoute;