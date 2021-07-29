import React, { useState,useEffect } from "react";
import { Link ,useHistory} from "react-router-dom";
import { showErrorMessage } from "../common/message";
import { showLoading } from "../common/loading";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import { signin } from "../api/auth";
import "../css/signin.css";
import { isAuthenticated, setAuthentication } from "../common/auth";

const Signin = () => {
  let history=useHistory();
  useEffect(()=>{
    if(isAuthenticated()&& isAuthenticated().role===1){
      history.push('/dashboard/admin')
  }else if(isAuthenticated()&& isAuthenticated().role===0){
    history.push('/dashboard/user')
  }
  },[history ])

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    errorMessage: false,
    loading: false,
  });
  const {
    email,
    password,
    errorMessage,
    loading,
  } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      errorMessage: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
        isEmpty(email) ||
        isEmpty(password)
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
      } else {
        //Success
        const {  password, email } = formData;
        const data = {  password, email };
        setFormData({
          ...formData,
          loading: true,
        });

        signin(data)
          .then(response=>{
              setAuthentication(response.data.token,response.data.user)
              if(isAuthenticated()&& isAuthenticated().role===1){
                  history.push('/dashboard/admin')
              }else{
                history.push('/dashboard/user')
              }

          })
          .catch(error=>{
            console.log('Sigin error',error)
            setFormData({
              ...formData,
              loading:false,
              errorMessage:error.response.data.errorMsg,
            })
          })

  }}

  const showSignInForm = () => (
    <form className="signin-form" onSubmit={handleSubmit} noValidate>
      {/* email*/}
      <div className="form-group input-group p-2 ">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-envelope py-1"></i>
          </span>
        </div>
        <input
          type="email"
          name="email"
          value={email}
          className="form-control"
          placeholder="Email Address"
          onChange={handleChange}
          autoComplete="username"
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
          placeholder="Password"
          onChange={handleChange}
          autoComplete="current-password"
        />
      </div>
      {/* signin button */}
      <div className="form-group p-2">
        <button type="submit" className="btn btn-primary w-100">
          Signin
        </button>
      </div>
      {/* already have an account  */}
      <p className="text-center text-white">
        Already have an account? <Link to="/signup">Register Here</Link>
      </p>
    </form>
  );
  return (
    <div className="signin-container">
      <div className="row  px-5 vh-100">
        <div className="col-md-5 mx-auto align-self-center">
          {errorMessage && showErrorMessage(errorMessage)}
          {loading && <div className="text-center pb-4">{showLoading()}</div>}
          {showSignInForm()}
        </div>
      </div>
    </div>
  );
};
export default Signin;
