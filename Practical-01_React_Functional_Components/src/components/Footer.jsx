import React from 'react';

/**
 * Functional Component: Footer
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>
        <strong>Web Technology Practicals Journal</strong> | Built with React.js & Functional Components
      </p>
      <p style={{ marginTop: '0.4rem', fontSize: '0.8rem', color: '#64748b' }}>
        Practical 1: Functional Components, JSX & Reusability &bull; &copy; {currentYear}
      </p>
    </footer>
  );
}

export default Footer;
