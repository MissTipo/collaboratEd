import React from 'react';
import { FaBars } from 'react-icons/fa';
import './Header.css';

function Header() {
  return (
    <header>
      <div className="left">
        <h1>CollaboratED</h1>
      </div>
      <div className="center">
        <nav>
          <ul>
            <li>How it works</li>
            <li>Community</li>
            <li>Dashboard</li>
          </ul>
        </nav>
      </div>
      <div className="right">
        <button>Login</button>
        <button>Signup</button>
      </div>
      <div className="hamburger">
        <FaBars />
      </div>
    </header>
  );
}

export default Header;

