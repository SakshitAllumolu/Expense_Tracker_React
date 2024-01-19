// Nav.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'; // Create a separate CSS file for Nav styles if needed

const Nav = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/expense">Expenses</Link>
        </li>
        {/* Add more navigation links as needed */}
      </ul>
    </nav>
  );
};

export default Nav;
