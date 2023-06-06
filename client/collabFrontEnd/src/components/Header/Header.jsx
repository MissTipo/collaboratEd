import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Header.css';
import Button from '../Button/Button';

function Header() {
  const handleClick = () => {
    alert('Login button clicked');
  };
  const [showCenter, setShowCenter] = useState(false);
  const toogleCenter = () => {
    setShowCenter(!showCenter);
  }
  return (
    <header>
      <div className="left">
        <h1>CollaboratEd</h1>
      </div>
      <div className={`center ${showCenter ? 'show' : ''}` }>
        <nav>
          <ul>
            <li>How it works</li>
            <li>Community</li>
            <li>Dashboard</li>
          </ul>
        </nav>
      </div>
      <div className="right">
        <Link to="/login"><Button text="Login" onClick={handleClick} /></Link>
        <Button text="Sign up" onClick={() => alert('Sign up button clicked')} ></Button>
      </div>
      <div className="hamburger" onClick={toogleCenter}>
        <FaBars />
      </div>
    </header>
  );
}

export default Header;

