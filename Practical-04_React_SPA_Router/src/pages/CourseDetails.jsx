import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { COURSES } from '../data/coursesData';

function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const course = COURSES.find(c => c.id === courseId);

  if (!course) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#ef4444' }}>Course Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          No course found with URL slug: <code>{courseId}</code>
        </p>
        <Link to="/courses" className="btn btn-primary">
          ← Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb">
        <Link to="/">Home</Link> <span>/</span> <Link to="/courses">Courses</Link> <span>/</span> <span>{course.title}</span>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Course Header Banner */}
        <div className="card" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', color: 'white', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <span className="badge badge-purple" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
              {course.category}
            </span>
            <span className="badge badge-amber">
              {course.level}
            </span>
          </div>

          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '0.75rem', lineHeight: 1.2 }}>
            {course.title}
          </h1>
          
          <p style={{ fontSize: '1.1rem', color: '#c7d2fe', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            {course.fullDesc}
          </p>

          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', fontSize: '0.95rem', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '1.25rem' }}>
            <div>👨‍🏫 <strong>Instructor:</strong> {course.instructor}</div>
            <div>⏱️ <strong>Duration:</strong> {course.duration}</div>
            <div>⭐ <strong>Rating:</strong> {course.rating} / 5.0</div>
            <div>👥 <strong>Enrolled:</strong> {course.enrolledStudents} students</div>
          </div>
        </div>

        {/* Dynamic Route Info Box */}
        <div style={{
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '12px',
          padding: '1.25rem',
          marginBottom: '2rem',
          fontSize: '0.9rem',
          color: '#166534'
        }}>
          💡 <strong>Dynamic Parameter Inspection:</strong> This page received URL parameter <code>useParams().courseId = "{courseId}"</code>.
        </div>

        {/* Course Modules */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem' }}>📖 Course Curriculum & Modules</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {course.modules.map((mod, index) => (
              <li key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                background: '#f8fafc',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                fontSize: '0.95rem'
              }}>
                <span style={{
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  fontWeight: 700,
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.85rem'
                }}>
                  {index + 1}
                </span>
                <span>{mod}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Prerequisites & Action */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem' }}>Prerequisites</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {course.prerequisites.map(p => (
              <span key={p} className="badge badge-blue">{p}</span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
            <button
              className="btn btn-primary"
              onClick={() => alert(`🎉 You have registered for: ${course.title}`)}
            >
              🚀 Enroll in this Specialization
            </button>
            <button
              className="btn btn-outline"
              onClick={() => navigate('/courses')}
            >
              ← Back to Catalog (useNavigate)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
