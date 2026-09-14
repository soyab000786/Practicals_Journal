import React from 'react';
import Badge from './Badge';
import Button from './Button';

/**
 * Reusable Course Card component
 */
function CourseCard({ courseCode, title, instructor, duration, level, rating, onEnroll }) {
  const badgeVariant = level === 'Beginner' ? 'success' : level === 'Intermediate' ? 'info' : 'warning';

  return (
    <div className="custom-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)' }}>
          {courseCode}
        </span>
        <Badge text={level} variant={badgeVariant} />
      </div>
      
      <h3 className="card-title">{title}</h3>
      
      <div style={{ margin: '0.75rem 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
        <p>👨‍🏫 <strong>Instructor:</strong> {instructor}</p>
        <p>⏱️ <strong>Duration:</strong> {duration}</p>
        <p>⭐ <strong>Rating:</strong> {rating} / 5.0</p>
      </div>

      <div className="card-footer">
        <Button variant="success" size="sm" onClick={() => onEnroll(title)}>
          Enroll Now
        </Button>
        <Button variant="secondary" size="sm" onClick={() => alert(`Syllabus for ${title}`)}>
          View Syllabus
        </Button>
      </div>
    </div>
  );
}

export default CourseCard;
