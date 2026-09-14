import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function NotFound() {
  const location = useLocation();

  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <div style={{ fontSize: '4.5rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>
        404
      </div>
      <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '1rem 0 0.5rem' }}>
        Page Not Found
      </h2>
      <p style={{ color: 'var(--text-muted)', maxWidth: '450px', margin: '0 auto 1.75rem', fontSize: '0.95rem' }}>
        The route <code>{location.pathname}</code> does not exist on this Single Page Application.
      </p>
      <Link to="/" className="btn btn-primary">
        🏠 Return to Home
      </Link>
    </div>
  );
}

export default NotFound;
