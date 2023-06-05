import React from 'react'
import './Login.css';
import Hero from '../../assets/HeroImg1.svg'

const Login = () => {
  return (
    <React.Fragment>
      <div className="App-body">
        <img src={Hero} alt="Collab-logo" />
        <p>Login to access the full dashboard</p>
        <form>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email"></input>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password"></input>
          <button>OK</button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Login;