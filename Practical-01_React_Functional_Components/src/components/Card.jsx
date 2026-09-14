import React from 'react';
import Badge from './Badge';
import Button from './Button';

/**
 * Reusable Functional Component: Feature Card
 * Demonstrates component nesting and JSX reusability
 */
function Card({ icon, title, description, category, actionLabel = "Learn More", onAction }) {
  return (
    <div className="custom-card">
      <div className="card-icon" style={{ background: '#eef2ff' }}>
        {icon}
      </div>
      <div style={{ marginBottom: '0.5rem' }}>
        <Badge text={category} variant="primary" />
      </div>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
      <div className="card-footer">
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      </div>
    </div>
  );
}

export default Card;
