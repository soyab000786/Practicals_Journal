import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { COURSES } from '../data/coursesData';

function Courses() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Frontend', 'Backend', 'Full Stack', 'Database'];

  const filtered = COURSES.filter(course => {
    const matchCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchSearch = course.title.toLowerCase().includes(search.toLowerCase()) ||
                        course.shortDesc.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div>
      <div className="breadcrumb">
        <Link to="/">Home</Link> <span>/</span> <span>Courses Catalog</span>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Explore Technical Specializations
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
          Click on any course card to test <strong>Dynamic URL Route Parameters</strong> with <code>/courses/:courseId</code>.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="🔍 Search courses by keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: '250px',
            padding: '0.65rem 1rem',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            outline: 'none',
            fontSize: '0.95rem'
          }}
        />

        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-outline'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          <h3>No courses matched your query.</h3>
        </div>
      ) : (
        <div className="grid-2">
          {filtered.map(course => (
            <div key={course.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className="badge badge-purple">{course.category}</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  📊 {course.level}
                </span>
              </div>

              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                {course.title}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginBottom: '1.25rem', flex: 1 }}>
                {course.shortDesc}
              </p>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                <p>👨‍🏫 <strong>Instructor:</strong> {course.instructor}</p>
                <p>⏱️ <strong>Duration:</strong> {course.duration} &bull; ⭐ {course.rating} / 5.0</p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  👥 {course.enrolledStudents} learners
                </span>
                <Link to={`/courses/${course.id}`} className="btn btn-primary btn-sm">
                  View Syllabus & Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Courses;
