import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Navbar = (): React.ReactElement => (
  <div className="navbar-container">
    <a href="http://wcs.illinois.edu">
      <img src="../../assets/logo.png" alt="wcs logo" />
    </a>
    <div className="navbar">
      <Link className="navbar-element" to="/">
        Check-in
      </Link>
      <Link className="navbar-element" to="/points">
        Points
      </Link>
      <Link className="navbar-element" to="/events">
        Events
      </Link>
    </div>
  </div>
);

export default Navbar;
