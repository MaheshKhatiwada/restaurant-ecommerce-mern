import React from "react";
import { Link,withRouter} from "react-router-dom";
import { isAuthenticated } from "../common/auth";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Restaurant
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ms-auto ml-auto mb-2 mb-lg-0">
            {!isAuthenticated() && (
              <React.Fragment>
                <li className="nav-item">
                  <Link to="/" className="nav-link " aria-current="page">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signin" className="nav-link " aria-current="page">
                    Signin
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">
                    Signup
                  </Link>
                </li>
              </React.Fragment>
            )}
            {isAuthenticated() &&isAuthenticated().role===0&& (
              <React.Fragment>
                <li className="nav-item">
                  <Link to="/dashboard/user" className="nav-link " aria-current="page">
                    Dashboard
                  </Link>
                </li>
              </React.Fragment>
            )}
            {isAuthenticated() &&isAuthenticated().role===1&&(
              <React.Fragment>
                <li className="nav-item">
                  <Link to="/dashboard/admin" className="nav-link " aria-current="page">
                    Dashboard
                  </Link>
                </li>
              </React.Fragment>
            )}
            {isAuthenticated() && (
              <React.Fragment>
                <li className="nav-item">
                  <Link to="/" className="nav-link " aria-current="page">
                    Logout
                  </Link>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Header);
