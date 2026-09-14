import React from 'react';

/**
 * Reusable Functional Component: Badge
 * Demonstrates conditional class names and reusable tag rendering.
 */
function Badge({ text, variant = 'primary' }) {
  return (
    <span className={`badge badge-${variant}`}>
      {text}
    </span>
  );
}

export default Badge;
