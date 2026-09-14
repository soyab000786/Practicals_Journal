import React from 'react';
import { Link } from 'react-router-dom';
import { COURSES } from '../data/coursesData';

function Home() {
  const featuredCourses = COURSES.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <span className="badge badge-purple" style={{ marginBottom: '1rem' }}>
          Practical 04 Demonstration
        </span>
        <h1 className="hero-title">Single Page Application with React Router</h1>
        <p className="hero-subtitle">
          Experience instant client-side transitions, deep dynamic linking, active navigation styling, 
          and breadcrumb path tracking without full-page reloads.
        </p>
        <div className="hero-buttons">
          <Link to="/courses" className="btn btn-primary">
            Explore All Courses →
          </Link>
          <Link to="/about" className="btn btn-outline">
            About This Practical
          </Link>
        </div>
      </section>

      {/* Highlights Grid */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.5rem', textAlign: 'center' }}>
          ✨ React Router Architecture Highlights
        </h2>

        <div className="grid-3">
          <div className="card">
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🚀</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Client-Side Routing</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Transitions between views happen dynamically in browser memory without sending full document requests to the server.
            </p>
          </div>

          <div className="card">
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🔗</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Dynamic URL Parameters</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Routes like <code>/courses/:courseId</code> extract URL slug variables via the <code>useParams()</code> hook.
            </p>
          </div>

          <div className="card">
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🛡️</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Catch-All 404 Pages</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Unmatched route paths are automatically caught by the wildcard <code>path="*"</code> fallback handler.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Featured Specializations</h2>
          <Link to="/courses" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>
            View All Courses &rarr;
          </Link>
        </div>

        <div className="grid-3">
          {featuredCourses.map(course => (
            <div key={course.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span className="badge badge-purple">{course.category}</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>⭐ {course.rating}</span>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>{course.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem', flex: 1 }}>
                {course.shortDesc}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>⏱️ {course.duration}</span>
                <Link to={`/courses/${course.id}`} className="btn btn-primary btn-sm">
                  View Details &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
