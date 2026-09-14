import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <p><strong>Single Page Application (SPA) with React Router</strong> &bull; Practical 04</p>
      <p style={{ marginTop: '0.4rem', fontSize: '0.8rem', color: '#64748b' }}>
        Seamless Client-Side Navigation without Page Reloads &bull; &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
}

export default Footer;
