import React, { useState } from 'react';

/**
 * Demonstrates:
 * 1. Mouse Events: onMouseEnter, onMouseLeave, onMouseMove
 * 2. Keyboard Events: onKeyDown
 * 3. Dynamic styling based on component state
 */
function InteractiveBox() {
  const [bgChoice, setBgChoice] = useState('indigo');
  const [isHovered, setIsHovered] = useState(false);
  const [lastKeyPressed, setLastKeyPressed] = useState('None');
  const [mouseCoord, setMouseCoord] = useState({ x: 0, y: 0 });

  const colorPalettes = {
    indigo: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
    emerald: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
    rose: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)',
    amber: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)'
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseCoord({
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top)
    });
  };

  return (
    <div className="card">
      <h3 className="card-title">
        <span>⚡</span> Mouse & Keyboard Events Playground
      </h3>
      <p className="card-subtitle">
        Hover, move cursor inside the canvas, and press keys to inspect synthetic event payload.
      </p>

      {/* Color theme selectors */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Palette:</span>
        {Object.keys(colorPalettes).map((color) => (
          <button
            key={color}
            onClick={() => setBgChoice(color)}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.8rem',
              textTransform: 'capitalize',
              background: bgChoice === color ? '#0f172a' : '#e2e8f0',
              color: bgChoice === color ? '#ffffff' : '#334155'
            }}
          >
            {color}
          </button>
        ))}
      </div>

      {/* Interactive canvas box */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        style={{
          background: colorPalettes[bgChoice],
          color: 'white',
          borderRadius: '12px',
          padding: '2rem 1.5rem',
          textAlign: 'center',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          transform: isHovered ? 'scale(1.02)' : 'scale(1)',
          boxShadow: isHovered ? '0 10px 25px rgba(0,0,0,0.2)' : 'none',
          cursor: 'crosshair',
          marginBottom: '1rem'
        }}
      >
        <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
          {isHovered ? '✨ Mouse is Inside Box!' : '👋 Hover Cursor Here'}
        </h4>
        <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
          Cursor Coordinates: <strong>X: {mouseCoord.x}px | Y: {mouseCoord.y}px</strong>
        </p>
      </div>

      {/* Keydown testing input */}
      <div>
        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
          Test Keyboard Event (Type any key inside input):
        </label>
        <input
          type="text"
          placeholder="Press any key here..."
          onKeyDown={(e) => setLastKeyPressed(`${e.key} (Code: ${e.code})`)}
          className="form-input"
          style={{ marginTop: '0.25rem' }}
        />
        <p style={{ marginTop: '0.4rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Last Key Detected: <strong style={{ color: 'var(--primary-dark)' }}>{lastKeyPressed}</strong>
        </p>
      </div>
    </div>
  );
}

export default InteractiveBox;
