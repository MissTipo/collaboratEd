import React from "react";
import { FiUser, FiLock } from "react-icons/fi";
import "./Login.css";
import request from "request";
// import { request } from "../../utils/request";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    // Call to API to log in user

    // fetch("http://0.0.0.0:5050/api/login", {
    //   method: "GET",
    //   body: JSON.stringify({
    //     username: e.target.username.value,
    //     password: e.target.password.value,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => {
    //     if (res.status === 200) {
    //       // displY BODY
    //       console.log(res.body);

    //       // Redirect to dashboard
    //       window.location.href = "/dashboard";
    //     } else {
    //       // Display error message
    //       console.log("Error logging in");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // request("/login", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     username: e.target.username.value,
    //     password: e.target.password.value,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => {
    //     if (res.status === 200) {
    //       // Redirect to dashboard
    //       window.location.href = "/dashboard";
    //     } else {
    //       // Display error message
    //       console.log("Error logging in");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // Handle login logic here
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">CollaboratEd Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">
              <FiUser className="form-icon" />
              Username
            </label>
            <input type="text" id="username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              <FiLock className="form-icon" />
              Password
            </label>
            <input type="password" id="password" />
          </div>
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
