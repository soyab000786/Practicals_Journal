import React from 'react';

function StatsOverview({ students }) {
  const totalStudents = students.length;
  const cseCount = students.filter(s => s.department === 'Computer Engineering').length;
  const itCount = students.filter(s => s.department === 'Information Technology').length;
  const aiCount = students.filter(s => s.department === 'AI & Data Science').length;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon" style={{ background: '#ecfdf5', color: '#059669' }}>🎓</div>
        <div>
          <div className="stat-number">{totalStudents}</div>
          <div className="stat-label">Total Enrolled Students</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>💻</div>
        <div>
          <div className="stat-number">{cseCount}</div>
          <div className="stat-label">Computer Engg</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon" style={{ background: '#f5f3ff', color: '#7c3aed' }}>🌐</div>
        <div>
          <div className="stat-number">{itCount}</div>
          <div className="stat-label">Information Tech</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon" style={{ background: '#fffbeb', color: '#d97706' }}>🤖</div>
        <div>
          <div className="stat-number">{aiCount}</div>
          <div className="stat-label">AI & Data Science</div>
        </div>
      </div>
    </div>
  );
}

export default StatsOverview;
