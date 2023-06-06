import React from 'react';
import { FiUser, FiLock } from 'react-icons/fi';
import './Login.css';

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
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
