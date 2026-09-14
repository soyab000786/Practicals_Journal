import React from 'react';

/**
 * Reusable Functional Component: Button
 * Reusable across different variants, sizes and click events.
 */
function Button({ children, variant = 'primary', size = 'md', onClick, icon }) {
  const sizeClass = size === 'sm' ? 'btn-sm' : '';
  const variantClass = `btn-${variant}`;

  return (
    <button className={`btn ${variantClass} ${sizeClass}`} onClick={onClick}>
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
}

export default Button;
