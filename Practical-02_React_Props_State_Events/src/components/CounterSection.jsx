import React, { useState } from 'react';

/**
 * Demonstrates:
 * 1. useState hook for managing numeric count and step size
 * 2. onClick event handling with increment, decrement, reset
 * 3. onChange event handling for dynamic step adjustments
 */
function CounterSection() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const handleIncrement = () => setCount(prev => prev + Number(step));
  const handleDecrement = () => setCount(prev => (prev - Number(step) >= 0 ? prev - Number(step) : 0));
  const handleReset = () => setCount(0);
  const handleDouble = () => setCount(prev => prev * 2);

  return (
    <div className="card">
      <h3 className="card-title">
        <span>🔢</span> Interactive Counter (State & Click Events)
      </h3>
      <p className="card-subtitle">
        Demonstrates React <code>useState</code>, numeric state updates, and <code>onClick</code> handlers.
      </p>

      <div className="counter-box">
        <div className="counter-display">{count}</div>
        
        <div style={{ width: '100%', maxWidth: '240px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            Step Value:
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={step}
            onChange={(e) => setStep(Math.max(1, parseInt(e.target.value) || 1))}
            className="form-input"
            style={{ marginTop: '0.25rem', textAlign: 'center' }}
          />
        </div>

        <div className="counter-controls">
          <button className="btn btn-primary" onClick={handleIncrement}>
            +{step} Increment
          </button>
          <button className="btn btn-danger" onClick={handleDecrement}>
            -{step} Decrement
          </button>
          <button className="btn btn-warning" onClick={handleDouble}>
            ✖ 2 Double
          </button>
          <button className="btn btn-outline" onClick={handleReset}>
            ↺ Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default CounterSection;
