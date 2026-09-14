import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <span>⚡</span> EduTech SPA
      </Link>

      <ul className="nav-links">
        <li className="nav-item">
          <NavLink to="/" end>Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/about">About Us</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/courses">Courses</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
