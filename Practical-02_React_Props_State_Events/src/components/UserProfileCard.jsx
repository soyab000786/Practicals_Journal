import React, { useState } from 'react';

/**
 * Demonstrates:
 * 1. Object state management in React
 * 2. Controlled form input handling with event target name & value
 * 3. Passing updated state values as Props to display sub-components
 */
function UserProfileCard() {
  const [profile, setProfile] = useState({
    name: 'Rahul Sharma',
    role: 'Full Stack Developer',
    experience: '3 Years',
    location: 'Mumbai, India',
    isAvailable: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="card">
      <h3 className="card-title">
        <span>👤</span> Live User Profile (Object State & Change Events)
      </h3>
      <p className="card-subtitle">
        Update the inputs below to see immediate two-way state reflection in the profile card.
      </p>

      {/* Form Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Name:</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Role:</label>
          <input
            type="text"
            name="role"
            value={profile.role}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Experience:</label>
          <input
            type="text"
            name="experience"
            value={profile.experience}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Location:</label>
          <input
            type="text"
            name="location"
            value={profile.location}
            onChange={handleChange}
            className="form-input"
          />
        </div>
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600 }}>
          <input
            type="checkbox"
            name="isAvailable"
            checked={profile.isAvailable}
            onChange={handleChange}
            className="task-checkbox"
          />
          Available for Freelance / Hire
        </label>
      </div>

      {/* Live Preview Card */}
      <div className="user-preview">
        <div className="user-avatar">
          {profile.name ? profile.name.charAt(0).toUpperCase() : '?'}
        </div>
        <div>
          <h4 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{profile.name || 'Anonymous'}</h4>
          <p style={{ color: 'var(--primary-dark)', fontWeight: 600, fontSize: '0.9rem' }}>{profile.role || 'No Role'}</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            📍 {profile.location} &bull; ⏳ {profile.experience}
          </p>
          <span style={{
            display: 'inline-block',
            marginTop: '0.35rem',
            padding: '0.2rem 0.6rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 700,
            background: profile.isAvailable ? '#dcfce7' : '#fee2e2',
            color: profile.isAvailable ? '#15803d' : '#b91c1c'
          }}>
            {profile.isAvailable ? '● Available' : '○ Unavailable'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default UserProfileCard;
