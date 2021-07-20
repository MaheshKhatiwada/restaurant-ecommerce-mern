import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    successMessage: false,
    errorMessage: false,
    loading: false,
  });
  const {
    username,
    email,
    password,
    confirmPassword,
    successMessage,
    errorMessage,
    loading,
  } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit=(e)=>{
      e.preventDefault();
      console.log(formData)
  }
  const showSignUpForm = () => (
    <form className="signup-form" onSubmit={handleSubmit}>
      {/* username */}
      <div className="form-group input-group p-2">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-user py-1"></i>
          </span>
        </div>
        <input
          type="text"
          name="username"
          value={username}
          className="form-control"
          placeholder="Username"
          onChange={handleChange}
        />
      </div>
      {/* email*/}
      <div className="form-group input-group p-2 ">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-envelope py-1"></i>
          </span>
        </div>
        <input
          type="email "
          name="email"
          value={email}
          className="form-control"
          placeholder="Email Address"
          onChange={handleChange}
        />
      </div>
      {/* password*/}
      <div className="form-group input-group p-2">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-lock py-1"></i>
          </span>
        </div>
        <input
          type="password"
          name="password"
          value={password}
          className="form-control"
          placeholder="Create Password"
          onChange={handleChange}
        />
      </div>
      {/* Confirm Password*/}
      <div className="form-group input-group p-2">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-lock py-1"></i>
          </span>
        </div>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          className="form-control"
          placeholder="Confirm password"
          onChange={handleChange}
        />
      </div>
      {/* signup button */}
      <div className="form-group p-2">
        <button type="submit" className="btn btn-primary w-100">
          Signup
        </button>
      </div>
      {/* already have an account  */}
      <p className="text-center text-white">
        Have an account? <Link to="/signin">Log In</Link>
      </p>
    </form>
  );
  return (
    <div className="signup-container">
      <div className="row  px-5 vh-100">
        <div className="col-md-5 mx-auto align-self-center">
          {showSignUpForm()}
        </div>
      </div>
    </div>
  );
};

export default Signup;
