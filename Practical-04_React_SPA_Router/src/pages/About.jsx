import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div>
      <div className="breadcrumb">
        <Link to="/">Home</Link> <span>/</span> <span>About Us</span>
      </div>

      <div style={{ maxWidth: '850px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '1rem', color: '#1e1b4b' }}>
          About Our Single Page Application
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
          This project illustrates the core mechanics of modern client-side routing in single-page applications. 
          By utilizing the HTML5 History API (via React Router), our application provides an instant, desktop-app like 
          user experience with instantaneous page switches.
        </p>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>
            🎯 Core Concepts Covered in Practical 04:
          </h3>
          <ul style={{ paddingLeft: '1.5rem', lineHeight: 2, color: 'var(--text-main)', fontSize: '0.95rem' }}>
            <li><strong>BrowserRouter:</strong> Wraps the root application and syncs the UI with the browser address bar.</li>
            <li><strong>Routes & Route:</strong> Declaratively maps URL path patterns to specific page components.</li>
            <li><strong>Link & NavLink:</strong> Custom navigation components that intercept browser clicks and avoid page refreshes.</li>
            <li><strong>useParams Hook:</strong> Reads dynamic URL parameters (e.g., <code>:courseId</code>) directly into components.</li>
            <li><strong>useNavigate Hook:</strong> Programmatically triggers navigation from handlers and button callbacks.</li>
            <li><strong>Wildcard Route (`*`):</strong> Seamlessly handles 404 errors when visitors input unknown URLs.</li>
          </ul>
        </div>

        <div className="grid-2">
          <div className="card">
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>⚡ Zero Page Reloads</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              All navigation happens without white flashes or waiting for the server to render full HTML documents.
            </p>
          </div>

          <div className="card">
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>🔖 Bookmarkable URLs</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Every view has a unique address bar URL that can be directly bookmarked, refreshed, or shared.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
