import React from 'react';

/**
 * Functional Component: Header
 * Demonstrates Functional component syntax, JSX and props usage.
 */
function Header({ title, subtitle, practicalNo }) {
  return (
    <header className="header">
      {practicalNo && <span className="header-badge">{practicalNo}</span>}
      <h1 className="header-title">{title}</h1>
      <p className="header-subtitle">{subtitle}</p>
    </header>
  );
}

export default Header;
