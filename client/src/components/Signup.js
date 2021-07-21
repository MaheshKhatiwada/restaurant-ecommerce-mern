import React, { useState } from "react";
import { Link } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import equals from "validator/lib/equals";
import { showErrorMessage,showSuccessMessage } from "../common/message";
import { showLoading } from "../common/loading";
import { signup } from "../api/auth";
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
      errorMessage:'',
      successMessage:''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      isEmpty(username) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(confirmPassword)
    ) {
      setFormData({
        ...formData,
        errorMessage: "All fields are required.",
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMessage: "Invalid email.",
      });
    } else if (!equals(password, confirmPassword)) {
      setFormData({
        ...formData,
        errorMessage: "Password do not match.",
      });
    } else {
      //Success
      const {username,password,email}=formData;
      const data={username,password,email};
      setFormData({
        ...formData,loading:true,
      })
      try {
        const response=signup(data)
       // console.log('Axios signup success',response)
        setFormData({
          username:'',
          email:'',
          password:'',
          confirmPassword:'',
          //successMessage:response.data.successMsg,
          loading:false
        })
      } catch (error) {
        console.log('Axios signup error',error)
        setFormData({
          ...formData,
          loading:false,
         errorMessage:error.response.data.errorMsg,
        })
      }


    }
  };

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
          autoComplete="username"
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
          autoComplete="new-password"
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
          autoComplete="new-password"
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
            {successMessage&& showSuccessMessage(successMessage)}
            {errorMessage&& showErrorMessage(errorMessage)}
            {loading && <div className="text-center pb-4">{showLoading() }</div>}
          {showSignUpForm()}
        </div>
      </div>
    </div>
  );
};

export default Signup;
